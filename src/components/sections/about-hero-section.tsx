"use client";

import { useTranslations } from "next-intl";
import { AboutHeroVisual } from "@/components/motion/about-hero-visual";
import { SplitPageHero } from "@/components/shared/split-page-hero";

export function AboutHeroSection() {
  const t = useTranslations("about");

  return (
    <SplitPageHero
      badge={t("label")}
      titleLine1={t("hero.titleLine1")}
      titleLine2={t("hero.titleLine2")}
      subtitle={t("hero.subtitle")}
      tags={[t("hero.tags.fullstack"), t("hero.tags.ai"), t("hero.tags.data")]}
      visual={<AboutHeroVisual />}
    />
  );
}
