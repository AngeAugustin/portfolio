import { LocaleFlag } from "@/components/LocaleFlag";
import { useLocale } from "@/i18n/context";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LABELS = {
  fr: "Français",
  en: "English",
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: "en" | "fr") => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border bg-secondary/50 p-0.5"
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchLocale(lang)}
          aria-label={LABELS[lang]}
          aria-pressed={locale === lang}
          title={LABELS[lang]}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1.5 transition-all",
            locale === lang
              ? "bg-primary shadow-sm"
              : "opacity-60 hover:opacity-100"
          )}
        >
          <LocaleFlag locale={lang} />
        </button>
      ))}
    </div>
  );
}
