import { Menu, X } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isNavLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "nav-enter fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
      >
        <div className="editorial-container flex items-center justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex w-fit items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <OptimizedImage
              src="/images/drapeau.png"
              alt=""
              width={40}
              height={32}
              priority
              className="h-7 w-auto shrink-0 object-contain transition-transform group-hover:scale-105 sm:h-8"
            />
            <span className="font-display text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
              {siteConfig.brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.slice(0, 7).map((link) => {
              const isActive = isNavLinkActive(link.href, pathname);

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-accent hover:text-foreground",
                    isActive
                      ? "text-foreground underline decoration-glow decoration-2 underline-offset-4"
                      : "text-muted-foreground"
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </div>

          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col gap-2 px-6 pt-28 pb-8">
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link.href, pathname);

            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-display text-3xl font-semibold tracking-tight transition-colors",
                  isActive
                    ? "text-foreground underline decoration-glow decoration-2 underline-offset-8"
                    : "text-foreground/70"
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
          <div className="mt-auto flex flex-col gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
