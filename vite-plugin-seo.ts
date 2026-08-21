import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  DEFAULT_SITE_URL,
  JOB_TITLE,
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
  breadcrumbs: { name: string; path: string }[];
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

function collectRoutes(messages: Record<Locale, Messages>): RouteRecord[] {
  const routes: RouteRecord[] = [];

  for (const locale of ["fr", "en"] as const) {
    const bundle = messages[locale];
    const homeName = nestedString(bundle, "nav.home");

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
        slugs: objectKeys((bundle.blog as { posts?: unknown } | undefined)?.posts),
        parentKey: "blog",
        parentPath: "/blog",
        titlePath: (slug) => `blog.posts.${slug}.title`,
        descriptionPath: (slug) => `blog.posts.${slug}.excerpt`,
        urlPath: (slug) => `/blog/${slug}`,
      },
    ];

    for (const collection of collections) {
      const parentLabel = nestedString(bundle, `nav.${collection.parentKey}`);
      for (const slug of collection.slugs) {
        const itemPath = localePath(locale, collection.urlPath(slug));
        const title = nestedString(bundle, collection.titlePath(slug));
        if (!title) continue;
        routes.push({
          locale,
          path: itemPath,
          title: `${title} | ${SITE_NAME}`,
          description: nestedString(bundle, collection.descriptionPath(slug)),
          changefreq: "monthly",
          priority: 0.7,
          pageType: collection.parentKey === "services" ? "website" : "article",
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
  const canonical = toAbsoluteUrl(siteUrl, route.path);
  const frUrl = toAbsoluteUrl(siteUrl, route.path.replace(/^\/en\b/, "/fr"));
  const enUrl = toAbsoluteUrl(siteUrl, route.path.replace(/^\/fr\b/, "/en"));
  const ogImage = toAbsoluteUrl(siteUrl, OG_IMAGE_PATH);
  const jsonLd = buildGraphJsonLd({
    siteUrl,
    canonical,
    locale: route.locale,
    title: route.title,
    description: route.description,
    name: SITE_NAME,
    jobTitle: JOB_TITLE[route.locale],
    email,
    sameAs,
    location: "Cotonou, Benin",
    image: ogImage,
    pageType: route.pageType,
    breadcrumbs: route.breadcrumbs,
  });

  return `<!--seo:start-->
    <title>${escapeAttr(route.title)}</title>
    <meta name="description" content="${escapeAttr(route.description)}" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="fr" href="${frUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${frUrl}" />
    <meta property="og:type" content="${route.pageType === "article" ? "article" : "website"}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeAttr(route.title)}" />
    <meta property="og:description" content="${escapeAttr(route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${SITE_NAME}" />
    <meta property="og:locale" content="${route.locale === "fr" ? "fr_FR" : "en_US"}" />
    <meta property="og:locale:alternate" content="${route.locale === "fr" ? "en_US" : "fr_FR"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
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
  const grouped = new Map<string, RouteRecord[]>();
  for (const route of routes) {
    const key = route.path.replace(/^\/(fr|en)/, "");
    const list = grouped.get(key) ?? [];
    list.push(route);
    grouped.set(key, list);
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [...grouped.values()].map((pair) => {
    const fr = pair.find((item) => item.locale === "fr") ?? pair[0];
    const en = pair.find((item) => item.locale === "en") ?? pair[0];
    const frLoc = toAbsoluteUrl(siteUrl, fr.path);
    const enLoc = toAbsoluteUrl(siteUrl, en.path);
    return `  <url>
    <loc>${frLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${fr.changefreq}</changefreq>
    <priority>${fr.priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${frLoc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${frLoc}" />
  </url>
  <url>
    <loc>${enLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${en.changefreq}</changefreq>
    <priority>${en.priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${frLoc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${frLoc}" />
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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

export function seoPlugin(siteUrlFromEnv?: string): Plugin {
  let outDir = "dist";
  let root = process.cwd();

  return {
    name: "portfolio-seo",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const siteUrl = stripTrailingSlash(siteUrlFromEnv || DEFAULT_SITE_URL);
      const messages = {
        fr: JSON.parse(fs.readFileSync(path.join(root, "messages/fr.json"), "utf8")) as Messages,
        en: JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf8")) as Messages,
      };
      const routes = collectRoutes(messages);
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
