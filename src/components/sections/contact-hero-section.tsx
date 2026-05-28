"use client";

import { useTranslations } from "next-intl";
import { ContactHeroVisual } from "@/components/motion/contact-hero-visual";
import { SplitPageHero } from "@/components/shared/split-page-hero";

export function ContactHeroSection() {
  const t = useTranslations("contact");

  return (
    <SplitPageHero
      badge={t("label")}
      titleLine1={t("hero.titleLine1")}
      titleLine2={t("hero.titleLine2")}
      subtitle={t("hero.subtitle")}
      tags={[t("hero.tags.remote"), t("hero.tags.collaboration"), t("hero.tags.worldwide")]}
      visual={<ContactHeroVisual />}
    />
  );
}
