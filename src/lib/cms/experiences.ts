import type { Locale } from "@/i18n/routing";
import { strapiFetch, withLocale } from "./client";
import type { CmsExperience, StrapiListResponse } from "./types";

type StrapiExperience = {
  key?: string;
  role?: string;
  company?: string;
  period?: string;
  description?: string;
  order?: number | null;
};

function mapExperience(entry: StrapiExperience): CmsExperience | null {
  if (!entry.key || !entry.role || !entry.company) return null;

  return {
    key: entry.key,
    role: entry.role,
    company: entry.company,
    period: entry.period ?? "",
    description: entry.description ?? "",
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
