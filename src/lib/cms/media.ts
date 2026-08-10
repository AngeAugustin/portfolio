import { getStrapiUrl } from "./config";
import type { StrapiMedia } from "./types";

export function mediaUrl(media: StrapiMedia | string | undefined | null, fallback = ""): string {
  if (!media) return fallback;
  if (typeof media === "string") {
    if (media.startsWith("http") || media.startsWith("/")) return media;
    return `${getStrapiUrl()}${media.startsWith("/") ? media : `/${media}`}`;
  }

  const raw = media.url ?? media.formats?.medium?.url ?? media.formats?.small?.url;
  if (!raw) return fallback;
  if (raw.startsWith("http")) return raw;
  return `${getStrapiUrl()}${raw.startsWith("/") ? raw : `/${raw}`}`;
}

export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => (typeof item === "string" ? asStringArray(item) : []))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed) as unknown;
      return asStringArray(parsed);
    } catch {
      return trimmed
        .split(/[\n,;|]+/)
        .map((part) => part.trim())
        .filter(Boolean);
    }
  }
  return [];
}
