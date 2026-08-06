export const routing = {
  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const,
  localePrefix: "always" as const,
};

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}
