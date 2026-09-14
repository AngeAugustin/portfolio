import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  DEFAULT_SITE_URL,
  INDEX_ROBOTS,
  JOB_TITLE,
  NOINDEX_ROBOTS,
  OG_IMAGE_PATH,
  SITE_NAME,
  STATIC_PAGES,
  buildGraphJsonLd,
  localePath,
  stripTrailingSlash,
  toAbsoluteUrl,
  type SeoPageKey,
} from "./src/lib/seo-config";

type Locale = "fr" | "en";
type Messages = Record<string, unknown>;

type RouteRecord = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  changefreq: string;
  priority: number;
  pageType: "website" | "profile" | "article";
  image?: string;
  imageAlt?: string;
  breadcrumbs: { name: string; path: string }[];
};

type CmsArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
};

function nestedString(source: unknown, keyPath: string) {
  const keys = keyPath.split(".");
  let current: unknown = source;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : "";
}

function objectKeys(source: unknown) {
  if (!source || typeof source !== "object") return [];
  return Object.keys(source);
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function resolveCoverImage(entry: Record<string, unknown>): string | undefined {
  const imageUrl = typeof entry.imageUrl === "string" ? entry.imageUrl : undefined;
  const cover = entry.cover;
  const coverUrl =
    cover && typeof cover === "object" && typeof (cover as { url?: unknown }).url === "string"
      ? (cover as { url: string }).url
      : undefined;
  return imageUrl || coverUrl || undefined;
}

async function fetchCmsArticles(cmsUrl: string, locale: Locale): Promise<CmsArticleMeta[]> {
  if (!cmsUrl) return [];

  try {
    const response = await fetch(
      `${cmsUrl}/api/articles?locale=${encodeURIComponent(locale)}&populate=*`
    );
    if (!response.ok) return [];

    const payload = (await response.json()) as {
      data?: Record<string, unknown>[];
    };

    return (payload.data ?? [])
      .flatMap((entry) => {
        const slug = typeof entry.slug === "string" ? entry.slug : "";
        const title = typeof entry.title === "string" ? entry.title : "";
        if (!slug || !title) return [];
        const image = resolveCoverImage(entry);
        const meta: CmsArticleMeta = {
          slug,
          title,
          excerpt: typeof entry.excerpt === "string" ? entry.excerpt : "",
          ...(image ? { image } : {}),
        };
        return [meta];
      });
  } catch {
    return [];
  }
}

function collectRoutes(
  messages: Record<Locale, Messages>,
  cmsArticles: Record<Locale, CmsArticleMeta[]>
): RouteRecord[] {
  const routes: RouteRecord[] = [];

  for (const locale of ["fr", "en"] as const) {
    const bundle = messages[locale];
    const homeName = nestedString(bundle, "nav.home");
    const cmsBySlug = new Map(cmsArticles[locale].map((article) => [article.slug, article]));

    for (const page of STATIC_PAGES) {
      const pagePath = localePath(locale, page.path);
      routes.push({
        locale,
        path: pagePath,
        title: nestedString(bundle, `seo.pages.${page.key}.title`),
        description: nestedString(bundle, `seo.pages.${page.key}.description`),
        changefreq: page.changefreq,
        priority: page.priority,
        pageType: page.key === "home" ? "profile" : "website",
        breadcrumbs:
          page.key === "home"
            ? []
            : [
                { name: homeName, path: localePath(locale, "") },
                {
                  name: nestedString(bundle, `nav.${page.key}`),
                  path: pagePath,
                },
              ],
      });
    }

    const collections: {
      slugs: string[];
      parentKey: SeoPageKey;
      parentPath: string;
      titlePath: (slug: string) => string;
      descriptionPath: (slug: string) => string;
      urlPath: (slug: string) => string;
      imageForSlug?: (slug: string) => string | undefined;
    }[] = [
      {
        slugs: objectKeys(bundle.projectItems),
        parentKey: "projects",
        parentPath: "/projects",
        titlePath: (slug) => `projectItems.${slug}.title`,
        descriptionPath: (slug) => `projectItems.${slug}.description`,
        urlPath: (slug) => `/projects/${slug}`,
      },
      {
        slugs: objectKeys(bundle.serviceDetails),
        parentKey: "services",
        parentPath: "/services",
        titlePath: (slug) => `serviceDetails.${slug}.title`,
        descriptionPath: (slug) => `serviceDetails.${slug}.summary`,
        urlPath: (slug) => `/services/${slug}`,
      },
      {
        slugs: cmsArticles[locale].map((article) => article.slug),
        parentKey: "blog",
        parentPath: "/blog",
        titlePath: (slug) => `blog.posts.${slug}.title`,
        descriptionPath: (slug) => `blog.posts.${slug}.excerpt`,
        urlPath: (slug) => `/blog/${slug}`,
        imageForSlug: (slug) => cmsBySlug.get(slug)?.image,
      },
    ];

    for (const collection of collections) {
      const parentLabel = nestedString(bundle, `nav.${collection.parentKey}`);
      for (const slug of collection.slugs) {
        const itemPath = localePath(locale, collection.urlPath(slug));
        const cmsArticle =
          collection.parentKey === "blog" ? cmsBySlug.get(slug) : undefined;
        const title =
          nestedString(bundle, collection.titlePath(slug)) || cmsArticle?.title || "";
        if (!title) continue;
        const description =
          nestedString(bundle, collection.descriptionPath(slug)) ||
          cmsArticle?.excerpt ||
          "";
        routes.push({
          locale,
          path: itemPath,
          title: `${title} | ${SITE_NAME}`,
          description,
          changefreq: "monthly",
          priority: 0.7,
          pageType: collection.parentKey === "services" ? "website" : "article",
          image: collection.imageForSlug?.(slug),
          imageAlt: title,
          breadcrumbs: [
            { name: homeName, path: localePath(locale, "") },
            { name: parentLabel, path: localePath(locale, collection.parentPath) },
            { name: title, path: itemPath },
          ],
        });
      }
    }
  }

  return routes;
}

function buildHead(route: RouteRecord, siteUrl: string, email: string, sameAs: string[]) {
  const indexable = route.locale === "fr";
  const pageUrl = toAbsoluteUrl(siteUrl, route.path);
  const frCanonical = toAbsoluteUrl(siteUrl, route.path.replace(/^\/en\b/, "/fr"));
  const canonical = indexable ? frCanonical : pageUrl;
  const ogImage = toAbsoluteUrl(siteUrl, route.image || OG_IMAGE_PATH);
  const imageAlt = route.imageAlt || SITE_NAME;
  const jsonLd = buildGraphJsonLd({
    siteUrl,
    canonical,
    locale: "fr",
    title: route.title,
    description: route.description,
    name: SITE_NAME,
    jobTitle: JOB_TITLE.fr,
    email,
    sameAs,
    location: "Cotonou, Benin",
    image: ogImage,
    pageType: route.pageType,
    breadcrumbs: indexable
      ? route.breadcrumbs
      : route.breadcrumbs.map((item) => ({
          ...item,
          path: item.path.replace(/^\/en\b/, "/fr"),
        })),
  });

  return `<!--seo:start-->
    <title>${escapeAttr(route.title)}</title>
    <meta name="description" content="${escapeAttr(route.description)}" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="robots" content="${indexable ? INDEX_ROBOTS : NOINDEX_ROBOTS}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="fr" href="${frCanonical}" />
    <link rel="alternate" hreflang="x-default" href="${frCanonical}" />
    <meta property="og:type" content="${route.pageType === "article" ? "article" : "website"}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeAttr(route.title)}" />
    <meta property="og:description" content="${escapeAttr(route.description)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:alt" content="${escapeAttr(imageAlt)}" />
    <meta property="og:locale" content="${route.locale === "fr" ? "fr_FR" : "en_US"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
    <script type="application/ld+json" id="jsonld-graph">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
    <!--seo:end-->`;
}

function buildNoscript(messages: Record<Locale, Messages>) {
  const links = (["fr", "en"] as const)
    .flatMap((locale) =>
      STATIC_PAGES.map((page) => {
        const href = localePath(locale, page.path);
        const label = `${nestedString(messages[locale], `nav.${page.key}`)} (${locale.toUpperCase()})`;
        return `<a href="${href}">${escapeAttr(label)}</a>`;
      })
    )
    .join(" ");

  return `<noscript><nav aria-label="Sitemap">${links}</nav></noscript>`;
}

function buildSitemap(routes: RouteRecord[], siteUrl: string) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter((route) => route.locale === "fr")
    .map((route) => {
      const loc = toAbsoluteUrl(siteUrl, route.path);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function injectSeo(html: string, head: string, lang: string, noscript: string) {
  let next = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  if (next.includes("<!--seo:start-->") && next.includes("<!--seo:end-->")) {
    next = next.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head);
  } else {
    next = next.replace("</head>", `    ${head}\n  </head>`);
  }
  if (!next.includes("<noscript>")) {
    next = next.replace("</body>", `    ${noscript}\n  </body>`);
  }
  return next;
}

export function seoPlugin(options?: { siteUrl?: string; cmsUrl?: string }): Plugin {
  const siteUrlFromEnv = typeof options === "string" ? options : options?.siteUrl;
  const cmsUrlFromEnv = typeof options === "string" ? undefined : options?.cmsUrl;
  let outDir = "dist";
  let root = process.cwd();

  return {
    name: "portfolio-seo",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async writeBundle() {
      const siteUrl = stripTrailingSlash(siteUrlFromEnv || DEFAULT_SITE_URL);
      const cmsUrl = stripTrailingSlash(cmsUrlFromEnv || "");
      const messages = {
        fr: JSON.parse(fs.readFileSync(path.join(root, "messages/fr.json"), "utf8")) as Messages,
        en: JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf8")) as Messages,
      };
      const cmsArticles = {
        fr: await fetchCmsArticles(cmsUrl, "fr"),
        en: await fetchCmsArticles(cmsUrl, "en"),
      };
      const routes = collectRoutes(messages, cmsArticles);
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const template = fs.readFileSync(indexPath, "utf8");
      const noscript = buildNoscript(messages);
      const email = "me@augustinfachehoun.pro";
      const sameAs = [
        "https://github.com/AngeAugustin",
        "https://www.linkedin.com/in/augustinfachehoun/",
        "https://wa.me/22954053660",
      ];

      for (const route of routes) {
        const head = buildHead(route, siteUrl, email, sameAs);
        const html = injectSeo(template, head, route.locale, noscript);
        const filePath = path.join(outDir, route.path.replace(/^\//, ""), "index.html");
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, html);
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(routes, siteUrl));
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
      );
    },
  };
}
