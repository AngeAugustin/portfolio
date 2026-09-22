import type { Locale } from "@/i18n/routing";
import type { ProjectCategory } from "@/lib/site";
import { strapiFetch, withLocale } from "./client";
import { asStringArray, mediaUrl } from "./media";
import { sanitizeOptionalText, sanitizeText } from "./text";
import type { CmsProject, StrapiListResponse, StrapiMedia } from "./types";

type StrapiProject = {
  slug?: string;
  title?: string;
  description?: string;
  caseStudy?: string | null;
  category?: ProjectCategory;
  featured?: boolean;
  year?: string;
  stack?: unknown;
  imageUrl?: string | null;
  cover?: StrapiMedia;
  liveUrl?: string | null;
  repoUrl?: string | null;
};

const PROJECT_CATEGORIES: ProjectCategory[] = [
  "web",
  "ai",
  "api",
  "dashboard",
  "saas",
  "automation",
];

function mapProject(entry: StrapiProject): CmsProject | null {
  if (!entry.slug || !entry.title) return null;

  const category = PROJECT_CATEGORIES.includes(entry.category as ProjectCategory)
    ? (entry.category as ProjectCategory)
    : "web";

  return {
    slug: entry.slug,
    title: sanitizeText(entry.title),
    description: sanitizeText(entry.description ?? ""),
    caseStudy: sanitizeOptionalText(entry.caseStudy),
    category,
    featured: Boolean(entry.featured),
    year: entry.year ?? "",
    stack: asStringArray(entry.stack).map(sanitizeText),
    image: mediaUrl(
      entry.cover,
      entry.imageUrl || "/images/projects/insight-saas.svg"
    ),
    liveUrl: entry.liveUrl ?? undefined,
    repoUrl: entry.repoUrl ?? undefined,
  };
}

export async function fetchProjects(locale: Locale): Promise<CmsProject[]> {
  const path = withLocale("/api/projects", locale, "populate=*&sort=year:desc");
  const response = await strapiFetch<StrapiListResponse<StrapiProject>>(path);
  return (response.data ?? []).map(mapProject).filter((p): p is CmsProject => p !== null);
}

export async function fetchProjectBySlug(
  slug: string,
  locale: Locale
): Promise<CmsProject | null> {
  const path = withLocale(
    "/api/projects",
    locale,
    `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  const response = await strapiFetch<StrapiListResponse<StrapiProject>>(path);
  const entry = response.data?.[0];
  return entry ? mapProject(entry) : null;
}
