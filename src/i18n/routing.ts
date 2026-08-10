export const routing = {
  locales: ["fr", "en"] as const,
  defaultLocale: "fr" as const,
  localePrefix: "always" as const,
};

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}
