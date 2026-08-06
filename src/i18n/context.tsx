import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import IntlMessageFormat from "intl-messageformat";
import type { Locale } from "./routing";
import type { IntlMessages } from "./messages";

type IntlContextValue = {
  locale: Locale;
  messages: IntlMessages;
};

const IntlContext = createContext<IntlContextValue | null>(null);

function getNestedValue(obj: unknown, path: string): string {
  const raw = getNestedRaw(obj, path);
  return typeof raw === "string" ? raw : path;
}

function getNestedRaw(obj: unknown, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

type TranslateValues = Record<string, string | number | Date>;

export type TranslateFn = ((key: string, values?: TranslateValues) => string) & {
  raw: (key: string) => unknown;
};

export function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: IntlMessages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

export function useIntlContext() {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error("useIntlContext must be used within IntlProvider");
  }
  return context;
}

export function useLocale(): Locale {
  return useIntlContext().locale;
}

export function useMessages(): IntlMessages {
  return useIntlContext().messages;
}

export function useTranslations(namespace?: string): TranslateFn {
  const { locale, messages } = useIntlContext();
  const scope = namespace ? getNestedRaw(messages, namespace) : messages;

  const translate = useCallback(
    ((key: string, values?: TranslateValues) => {
      const message = getNestedValue(scope, key);

      if (!values) return message;

      try {
        return new IntlMessageFormat(message, locale).format(values) as string;
      } catch {
        return message;
      }
    }) as TranslateFn,
    [locale, scope]
  );

  translate.raw = (key: string) => getNestedRaw(scope, key);

  return translate;
}
