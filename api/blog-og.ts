type VercelRequest = {
  query: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  send: (body: string) => void;
};

const SITE_NAME = "Augustin FACHEHOUN";
const DEFAULT_SITE_URL = "https://www.augustinfachehoun.pro";
const OG_IMAGE_PATH = "/og.svg";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toAbsoluteUrl(siteUrl: string, path: string) {
  if (/^https?:\/\//i.test(path) || path.startsWith("//")) {
    return path.startsWith("//") ? `https:${path}` : path;
  }
  const base = stripTrailingSlash(siteUrl);
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function asQueryValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const locale = asQueryValue(req.query.locale) === "en" ? "en" : "fr";
  const slug = asQueryValue(req.query.slug).trim();
  const siteUrl = stripTrailingSlash(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const cmsUrl = stripTrailingSlash(process.env.VITE_STRAPI_URL || "");

  let title = SITE_NAME;
  let description =
    locale === "en"
      ? "Article from Augustin FACHEHOUN's portfolio."
      : "Article du portfolio d'Augustin FACHEHOUN.";
  let image = OG_IMAGE_PATH;

  if (slug && cmsUrl) {
    try {
      const apiUrl =
        `${cmsUrl}/api/articles?locale=${encodeURIComponent(locale)}` +
        `&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const payload = (await response.json()) as {
          data?: Array<{
            title?: string;
            excerpt?: string;
            imageUrl?: string | null;
            cover?: { url?: string } | null;
          }>;
        };
        const entry = payload.data?.[0];
        if (entry) {
          if (entry.title) title = entry.title;
          if (entry.excerpt) description = entry.excerpt;
          const cover = entry.imageUrl || entry.cover?.url;
          if (cover) image = cover;
        }
      }
    } catch {
      // Keep fallbacks when CMS is unreachable.
    }
  }

  const pagePath = `/${locale}/blog/${encodeURIComponent(slug)}`;
  const pageUrl = toAbsoluteUrl(siteUrl, pagePath);
  const ogImage = toAbsoluteUrl(siteUrl, image);
  const fullTitle = `${title} | ${SITE_NAME}`;

  const html = `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeAttr(fullTitle)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeAttr(fullTitle)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${escapeAttr(pageUrl)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:alt" content="${escapeAttr(title)}" />
    <meta property="og:locale" content="${locale === "fr" ? "fr_FR" : "en_US"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(fullTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
    <link rel="canonical" href="${escapeAttr(pageUrl)}" />
  </head>
  <body>
    <p><a href="${escapeAttr(pageUrl)}">${escapeAttr(fullTitle)}</a></p>
  </body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
  res.status(200).send(html);
}
