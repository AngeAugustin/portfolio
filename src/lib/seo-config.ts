export const INDEXABLE_LOCALE = "fr" as const;
export const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, follow";
export const SITE_NAME = "Augustin FACHEHOUN";
export const OG_IMAGE_PATH = "/og.svg";

export const JOB_TITLE = {
  fr: "Développeur FullStack & IA",
  en: "FullStack & AI Developer",
} as const;

export const STATIC_PAGES = [
  { path: "", key: "home", changefreq: "weekly", priority: 1.0 },
  { path: "/about", key: "about", changefreq: "monthly", priority: 0.9 },
  { path: "/projects", key: "projects", changefreq: "weekly", priority: 0.9 },
  { path: "/services", key: "services", changefreq: "monthly", priority: 0.9 },
  { path: "/blog", key: "blog", changefreq: "weekly", priority: 0.9 },
  { path: "/contact", key: "contact", changefreq: "monthly", priority: 0.9 },
] as const;

export type SeoPageKey = (typeof STATIC_PAGES)[number]["key"];

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type JsonLdInput = {
  siteUrl: string;
  canonical: string;
  locale: "fr" | "en";
  title: string;
  description: string;
  name: string;
  jobTitle: string;
  email: string;
  sameAs: string[];
  location: string;
  image?: string;
  pageType?: "website" | "profile" | "article";
  breadcrumbs?: BreadcrumbItem[];
};

export function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export function toAbsoluteUrl(siteUrl: string, path: string) {
  const base = stripTrailingSlash(siteUrl);
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(locale: string, path: string) {
  const suffix = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function swapLocalePath(pathname: string, nextLocale: "fr" | "en") {
  const parts = pathname.split("/");
  if (parts[1] === "fr" || parts[1] === "en") {
    parts[1] = nextLocale;
    const next = parts.join("/");
    return next || `/${nextLocale}`;
  }
  return localePath(nextLocale, pathname);
}

export function buildGraphJsonLd(input: JsonLdInput) {
  const { siteUrl, canonical, locale, title, description } = input;
  const websiteId = `${siteUrl}/#website`;
  const personId = `${siteUrl}/#person`;
  const pageId = `${canonical}#webpage`;

  const isHome = /\/(fr|en)\/?$/.test(canonical) || canonical === siteUrl;
  const pageType =
    input.pageType === "article"
      ? "Article"
      : isHome || input.pageType === "profile"
        ? ["WebPage", "ProfilePage"]
        : "WebPage";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: input.name,
      url: siteUrl,
      inLanguage: ["fr"],
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: input.name,
      jobTitle: input.jobTitle,
      url: toAbsoluteUrl(siteUrl, localePath("fr", "")),
      email: input.email,
      image: input.image,
      knowsLanguage: ["fr", "en"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cotonou",
        addressCountry: "BJ",
      },
      sameAs: input.sameAs,
    },
    {
      "@type": pageType,
      "@id": pageId,
      url: canonical,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      primaryImageOfPage: input.image,
      ...(input.breadcrumbs?.length
        ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } }
        : {}),
    },
  ];

  if (input.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: input.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: toAbsoluteUrl(siteUrl, item.path),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
