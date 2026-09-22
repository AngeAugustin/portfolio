import type { Locale } from "@/i18n/routing";
import { strapiFetch, withLocale } from "./client";
import { sanitizeText } from "./text";
import type { CmsExperience, StrapiListResponse } from "./types";

type StrapiExperience = {
  key?: string;
  role?: string;
  company?: string;
  location?: string | null;
  period?: string;
  description?: string;
  order?: number | null;
};

function mapExperience(entry: StrapiExperience): CmsExperience | null {
  if (!entry.key || !entry.role || !entry.company) return null;

  return {
    key: entry.key,
    role: sanitizeText(entry.role),
    company: sanitizeText(entry.company),
    location: entry.location ? sanitizeText(entry.location) : undefined,
    period: sanitizeText(entry.period ?? ""),
    description: sanitizeText(entry.description ?? ""),
    order: entry.order ?? 0,
  };
}

export async function fetchExperiences(locale: Locale): Promise<CmsExperience[]> {
  const path = withLocale("/api/experiences", locale, "sort=order:asc");
  const response = await strapiFetch<StrapiListResponse<StrapiExperience>>(path);
  return (response.data ?? [])
    .map(mapExperience)
    .filter((item): item is CmsExperience => item !== null);
}
