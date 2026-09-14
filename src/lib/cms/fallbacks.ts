import type { IntlMessages } from "@/i18n/messages";
import { projects, services, type ServiceSlug } from "@/lib/site";
import type { CmsEducation, CmsExperience, CmsProject, CmsService } from "./types";

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
