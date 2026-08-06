import type { Locale } from "./routing";

export type IntlMessages = Record<string, unknown>;

const messageLoaders: Record<Locale, () => Promise<{ default: IntlMessages }>> = {
  en: () => import("../../messages/en.json"),
  fr: () => import("../../messages/fr.json"),
};

const cache = new Map<Locale, IntlMessages>();

export async function loadMessages(locale: Locale): Promise<IntlMessages> {
  // Always re-import in dev so JSON edits (e.g. new keys) are picked up on HMR.
  if (import.meta.env.DEV) {
    const messages = (await messageLoaders[locale]()).default;
    cache.set(locale, messages);
    return messages;
  }

  const existing = cache.get(locale);
  if (existing) return existing;

  const messages = (await messageLoaders[locale]()).default;
  cache.set(locale, messages);
  return messages;
}
