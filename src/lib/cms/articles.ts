import type { Locale } from "@/i18n/routing";
import type { BlogCategory } from "@/lib/site";
import { strapiFetch, withLocale } from "./client";
import { mediaUrl } from "./media";
import type { CmsArticle, StrapiListResponse, StrapiMedia } from "./types";

type StrapiArticle = {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string | null;
  category?: BlogCategory;
  featured?: boolean;
  readMinutes?: number | null;
  date?: string | null;
  cover?: StrapiMedia;
  imageUrl?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

const BLOG_CATEGORIES: BlogCategory[] = ["ai", "data", "frontend"];

function toYearMonth(iso?: string | null): string {
  if (!iso) {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }
  return iso.slice(0, 7);
}

function mapArticle(entry: StrapiArticle): CmsArticle | null {
  if (!entry.slug || !entry.title) return null;

  const category = BLOG_CATEGORIES.includes(entry.category as BlogCategory)
    ? (entry.category as BlogCategory)
    : "frontend";

  return {
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt ?? "",
    content: entry.content ?? undefined,
    category,
    featured: Boolean(entry.featured),
    readMinutes: entry.readMinutes ?? 5,
    date:
      entry.date?.trim() ||
      toYearMonth(entry.publishedAt ?? entry.createdAt),
    image: mediaUrl(
      entry.cover ?? (entry.imageUrl ? { url: entry.imageUrl } : null),
      "/images/blog/rag-pipelines.svg"
    ),
  };
}

export async function fetchArticles(locale: Locale): Promise<CmsArticle[]> {
  const path = withLocale(
    "/api/articles",
    locale,
    "populate=*&sort=publishedAt:desc"
  );
  const response = await strapiFetch<StrapiListResponse<StrapiArticle>>(path);
  return (response.data ?? [])
    .map(mapArticle)
    .filter((a): a is CmsArticle => a !== null);
}

export async function fetchArticleBySlug(
  slug: string,
  locale: Locale
): Promise<CmsArticle | null> {
  const path = withLocale(
    "/api/articles",
    locale,
    `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  const response = await strapiFetch<StrapiListResponse<StrapiArticle>>(path);
  const entry = response.data?.[0];
  return entry ? mapArticle(entry) : null;
}
