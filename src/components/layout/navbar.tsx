"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
      >
        <div className="editorial-container flex items-center justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex w-fit flex-col gap-1.5"
            aria-label={siteConfig.name}
          >
            <span className="font-display text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
              {siteConfig.brand}
            </span>
            <Image
              src={siteConfig.brandUnderline}
              alt=""
              width={220}
              height={8}
              className="h-1 w-full rounded-sm object-cover object-center opacity-90 transition-opacity group-hover:opacity-100 sm:h-1.5"
              aria-hidden
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
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
      </motion.header>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <div className="flex h-full flex-col gap-2 px-6 pt-28 pb-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-semibold tracking-tight text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </motion.div>
    </>
  );
}
