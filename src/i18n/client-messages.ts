import type { IntlMessages } from "./messages";

/** Namespaces required by layout client components (navbar, theme, etc.). */
export const LAYOUT_MESSAGE_NAMESPACES = ["nav", "footer", "common"] as const;

export function pickMessages(
  messages: IntlMessages,
  namespaces: readonly string[]
): IntlMessages {
  return Object.fromEntries(
    namespaces
      .filter((namespace) => namespace in messages)
      .map((namespace) => [namespace, messages[namespace]])
  );
}

export function pickLayoutMessages(messages: IntlMessages) {
  return pickMessages(messages, LAYOUT_MESSAGE_NAMESPACES);
}

export const HOME_MESSAGE_NAMESPACES = [
  "hero",
  "techStack",
  "featured",
  "projectItems",
  "experience",
  "experienceItems",
  "services",
  "serviceDetails",
  "testimonials",
  "testimonialsItems",
  "cta",
  "contact",
] as const;

export const ABOUT_MESSAGE_NAMESPACES = [
  "about",
  "experience",
  "experienceItems",
  "education",
  "educationItems",
  "skills",
  "skillGroups",
] as const;

export const CONTACT_MESSAGE_NAMESPACES = ["contact"] as const;

export const PROJECTS_MESSAGE_NAMESPACES = ["projects", "projectItems"] as const;

export const SERVICES_MESSAGE_NAMESPACES = ["services", "serviceDetails"] as const;

export const SERVICE_DETAIL_MESSAGE_NAMESPACES = [
  "services",
  "serviceDetails",
  "common",
] as const;

export const BLOG_MESSAGE_NAMESPACES = ["blog"] as const;

export const BLOG_DETAIL_MESSAGE_NAMESPACES = ["blog", "common", "contact"] as const;

export const PROJECT_DETAIL_MESSAGE_NAMESPACES = ["projectItems", "common"] as const;
