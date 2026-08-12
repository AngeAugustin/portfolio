import type { IntlMessages } from "@/i18n/messages";
import {
  blogPosts,
  projects,
  services,
  type BlogPostSlug,
  type ServiceSlug,
} from "@/lib/site";
import type { CmsArticle, CmsEducation, CmsExperience, CmsProject, CmsService } from "./types";

type LocalizedCopy = Record<string, string | undefined>;

function getCopy(
  messages: IntlMessages,
  namespace: string,
  slug: string
): LocalizedCopy {
  const root = messages[namespace];
  if (!root || typeof root !== "object") return {};
  const entry = (root as Record<string, unknown>)[slug];
  if (!entry || typeof entry !== "object") return {};
  return entry as LocalizedCopy;
}

export function projectFallbacks(messages: IntlMessages): CmsProject[] {
  return projects.map((project) => {
    const copy = getCopy(messages, "projectItems", project.slug);
    return {
      slug: project.slug,
      title: copy.title ?? project.slug,
      description: copy.description ?? "",
      category: project.category,
      featured: project.featured,
      year: project.year,
      stack: [...project.stack],
      image: project.image,
    };
  });
}

export function serviceFallbacks(messages: IntlMessages): CmsService[] {
  return services.map((service, index) => {
    const copy = getCopy(messages, "serviceDetails", service.slug) as Record<
      string,
      unknown
    >;

    const asList = (value: unknown): string[] =>
      Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

    return {
      slug: service.slug,
      title: typeof copy.title === "string" ? copy.title : service.slug,
      summary: typeof copy.summary === "string" ? copy.summary : "",
      tagline: typeof copy.tagline === "string" ? copy.tagline : "",
      overview: typeof copy.overview === "string" ? copy.overview : "",
      order: index,
      tags: asList(copy.tags),
      deliverables: asList(copy.deliverables),
      approach: asList(copy.approach),
      stack: asList(copy.stack),
      idealFor: asList(copy.idealFor),
    };
  });
}

export function articleFallbacks(messages: IntlMessages): CmsArticle[] {
  const postsRoot = (messages.blog as { posts?: Record<string, LocalizedCopy> } | undefined)
    ?.posts;

  return blogPosts.map((post) => {
    const copy = (postsRoot?.[post.slug as BlogPostSlug] ?? {}) as Record<string, unknown>;

    const sectionsRaw = copy.sections;
    const sections = Array.isArray(sectionsRaw)
      ? sectionsRaw
          .map((section) => {
            if (!section || typeof section !== "object") return null;
            const entry = section as Record<string, unknown>;
            const heading = typeof entry.heading === "string" ? entry.heading : "";
            const paragraphs = Array.isArray(entry.paragraphs)
              ? entry.paragraphs.filter((p): p is string => typeof p === "string")
              : [];
            if (!heading && paragraphs.length === 0) return null;
            return { heading, paragraphs };
          })
          .filter((section): section is { heading: string; paragraphs: string[] } => section !== null)
      : undefined;

    return {
      slug: post.slug,
      title: typeof copy.title === "string" ? copy.title : post.slug,
      excerpt: typeof copy.excerpt === "string" ? copy.excerpt : "",
      content: typeof copy.content === "string" ? copy.content : undefined,
      sections,
      category: post.category,
      featured: post.featured,
      readMinutes: post.readMinutes,
      date: post.date,
      image: post.image,
    };
  });
}

export function isKnownServiceSlug(slug: string): slug is ServiceSlug {
  return services.some((service) => service.slug === slug);
}

type ExperienceFallbackItem = {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
};

type EducationFallbackItem = {
  degree: string;
  school: string;
  period: string;
  description: string;
  status: "completed" | "ongoing";
  highlight?: string;
};

export function experienceFallbacks(messages: IntlMessages): CmsExperience[] {
  const items = messages.experienceItems;
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => {
    const entry = item as ExperienceFallbackItem;
    return {
      key: `${entry.company}-${index}`,
      role: entry.role ?? "",
      company: entry.company ?? "",
      location: entry.location,
      period: entry.period ?? "",
      description: entry.description ?? "",
      order: index,
    };
  });
}

export function educationFallbacks(messages: IntlMessages): CmsEducation[] {
  const items = messages.educationItems;
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => {
    const entry = item as EducationFallbackItem;
    return {
      key: `${entry.degree}-${index}`,
      degree: entry.degree ?? "",
      school: entry.school ?? "",
      period: entry.period ?? "",
      description: entry.description ?? "",
      status: entry.status === "ongoing" ? "ongoing" : "completed",
      highlight: entry.highlight,
      order: index,
    };
  });
}
