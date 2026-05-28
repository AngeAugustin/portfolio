import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects, services, siteConfig } from "@/lib/site";

const paths = [
  "",
  "/about",
  "/projects",
  "/services",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`])
          ),
        },
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${base}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const service of services) {
      entries.push({
        url: `${base}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return entries;
}
