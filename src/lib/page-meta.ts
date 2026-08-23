import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslations } from "@/i18n/context";
import { isLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import {
  DEFAULT_SITE_URL,
  INDEXABLE_LOCALE,
  INDEX_ROBOTS,
  JOB_TITLE,
  NOINDEX_ROBOTS,
  OG_IMAGE_PATH,
  STATIC_PAGES,
  buildGraphJsonLd,
  localePath,
  stripTrailingSlash,
  swapLocalePath,
  toAbsoluteUrl,
  type SeoPageKey,
} from "@/lib/seo-config";

export type PageMetaOptions = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  ogType?: "website" | "article" | "profile";
  image?: string;
  breadcrumbs?: { name: string; path: string }[];
};

function getSiteUrl() {
  return stripTrailingSlash(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
}

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(selector: string, attrs: Record<string, string>) {
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
}

function upsertJsonLd(data: unknown) {
  let script = document.getElementById("jsonld-graph") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "jsonld-graph";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
}

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  robots = INDEX_ROBOTS,
  ogType = "website",
  image,
  breadcrumbs,
}: PageMetaOptions) {
  const location = useLocation();
  const { locale: localeParam } = useParams<{ locale: string }>();
  const locale: Locale = isLocale(localeParam ?? "") ? (localeParam as Locale) : "fr";
  const breadcrumbKey = JSON.stringify(breadcrumbs ?? []);

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const indexable = locale === INDEXABLE_LOCALE;
    const pageUrl = toAbsoluteUrl(siteUrl, location.pathname);
    const frCanonical = toAbsoluteUrl(siteUrl, swapLocalePath(location.pathname, "fr"));
    const canonical = indexable ? frCanonical : pageUrl;
    const resolvedTitle = title || `${siteConfig.name} — ${JOB_TITLE[locale]}`;
    const resolvedDescription = description || siteConfig.description;
    const ogImage = toAbsoluteUrl(siteUrl, image || OG_IMAGE_PATH);
    const resolvedRobots =
      indexable && !robots.includes("noindex") ? robots : NOINDEX_ROBOTS;

    document.title = resolvedTitle;
    upsertMeta("description", resolvedDescription);
    upsertMeta("robots", resolvedRobots);
    upsertMeta("author", siteConfig.name);
    upsertMeta("og:type", ogType === "article" ? "article" : "website", "property");
    upsertMeta("og:site_name", siteConfig.name, "property");
    upsertMeta("og:title", ogTitle || resolvedTitle, "property");
    upsertMeta("og:description", ogDescription || resolvedDescription, "property");
    upsertMeta("og:url", pageUrl, "property");
    upsertMeta("og:image", ogImage, "property");
    upsertMeta("og:image:alt", siteConfig.name, "property");
    upsertMeta("og:locale", locale === "fr" ? "fr_FR" : "en_US", "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", ogTitle || resolvedTitle);
    upsertMeta("twitter:description", ogDescription || resolvedDescription);
    upsertMeta("twitter:image", ogImage);

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertLink('link[rel="alternate"][hreflang="fr"]', {
      rel: "alternate",
      hreflang: "fr",
      href: frCanonical,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: frCanonical,
    });
    document.querySelector('link[rel="alternate"][hreflang="en"]')?.remove();
    document.querySelector('meta[property="og:locale:alternate"]')?.remove();

    upsertJsonLd(
      buildGraphJsonLd({
        siteUrl,
        canonical,
        locale: "fr",
        title: resolvedTitle,
        description: resolvedDescription,
        name: siteConfig.name,
        jobTitle: JOB_TITLE[locale],
        email: siteConfig.email,
        sameAs: Object.values(siteConfig.social),
        location: siteConfig.location,
        image: ogImage,
        pageType: ogType === "article" ? "article" : ogType === "profile" ? "profile" : "website",
        breadcrumbs: JSON.parse(breadcrumbKey).length
          ? JSON.parse(breadcrumbKey)
          : undefined,
      })
    );
  }, [
    breadcrumbKey,
    description,
    image,
    locale,
    location.pathname,
    ogDescription,
    ogTitle,
    ogType,
    robots,
    title,
  ]);
}

export function useSeoPage(page: SeoPageKey) {
  const t = useTranslations("seo");
  const tNav = useTranslations("nav");
  const { locale: localeParam } = useParams<{ locale: string }>();
  const locale: Locale = isLocale(localeParam ?? "") ? (localeParam as Locale) : "fr";

  const breadcrumbs = useMemo(
    () =>
      page === "home"
        ? undefined
        : [
            { name: tNav("home"), path: localePath(locale, "") },
            {
              name: tNav(page),
              path: localePath(
                locale,
                STATIC_PAGES.find((item) => item.key === page)?.path ?? ""
              ),
            },
          ],
    [locale, page, tNav]
  );

  usePageMeta({
    title: t(`pages.${page}.title`),
    description: t(`pages.${page}.description`),
    ogType: page === "home" ? "profile" : "website",
    breadcrumbs,
  });
}

export function useDocumentLang(locale: string) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}
