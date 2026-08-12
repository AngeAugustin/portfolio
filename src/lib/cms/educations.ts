import type { Locale } from "@/i18n/routing";
import { strapiFetch, withLocale } from "./client";
import type { CmsEducation, StrapiListResponse } from "./types";

type StrapiEducation = {
  key?: string;
  degree?: string;
  school?: string;
  period?: string;
  description?: string;
  status?: string;
  highlight?: string | null;
  order?: number | null;
};

function mapEducationStatus(value: unknown): "completed" | "ongoing" {
  return value === "ongoing" ? "ongoing" : "completed";
}

function mapEducation(entry: StrapiEducation): CmsEducation | null {
  if (!entry.key || !entry.degree || !entry.school) return null;

  return {
    key: entry.key,
    degree: entry.degree,
    school: entry.school,
    period: entry.period ?? "",
    description: entry.description ?? "",
    status: mapEducationStatus(entry.status),
    highlight: entry.highlight ?? undefined,
    order: entry.order ?? 0,
  };
}

export async function fetchEducations(locale: Locale): Promise<CmsEducation[]> {
  const path = withLocale("/api/educations", locale, "sort=order:asc");
  const response = await strapiFetch<StrapiListResponse<StrapiEducation>>(path);
  return (response.data ?? [])
    .map(mapEducation)
    .filter((item): item is CmsEducation => item !== null);
}
