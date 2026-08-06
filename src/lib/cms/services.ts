import type { Locale } from "@/i18n/routing";
import { strapiFetch, withLocale } from "./client";
import { asStringArray } from "./media";
import type { CmsService, StrapiListResponse } from "./types";

type StrapiService = {
  slug?: string;
  title?: string;
  summary?: string;
  tagline?: string | null;
  overview?: string | null;
  order?: number | null;
  tags?: unknown;
  deliverables?: unknown;
  approach?: unknown;
  stack?: unknown;
  idealFor?: unknown;
};

function mapService(entry: StrapiService): CmsService | null {
  if (!entry.slug || !entry.title) return null;

  return {
    slug: entry.slug,
    title: entry.title,
    summary: entry.summary ?? "",
    tagline: entry.tagline ?? "",
    overview: entry.overview ?? "",
    order: entry.order ?? 0,
    tags: asStringArray(entry.tags),
    deliverables: asStringArray(entry.deliverables),
    approach: asStringArray(entry.approach),
    stack: asStringArray(entry.stack),
    idealFor: asStringArray(entry.idealFor),
  };
}

export async function fetchServices(locale: Locale): Promise<CmsService[]> {
  const path = withLocale("/api/services", locale, "populate=*&sort=order:asc");
  const response = await strapiFetch<StrapiListResponse<StrapiService>>(path);
  return (response.data ?? [])
    .map(mapService)
    .filter((s): s is CmsService => s !== null);
}

export async function fetchServiceBySlug(
  slug: string,
  locale: Locale
): Promise<CmsService | null> {
  const path = withLocale(
    "/api/services",
    locale,
    `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  const response = await strapiFetch<StrapiListResponse<StrapiService>>(path);
  const entry = response.data?.[0];
  return entry ? mapService(entry) : null;
}
