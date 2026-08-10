import { useLocale } from "@/i18n/context";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: "en" | "fr") => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border bg-secondary/50 p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchLocale(lang)}
          className={cn(
            "rounded-full px-3 py-1.5 uppercase tracking-wider transition-all",
            locale === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
