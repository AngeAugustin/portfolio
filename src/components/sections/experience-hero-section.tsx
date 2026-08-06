"use client";

import { useTranslations } from "@/i18n/context";
import { ExperienceHeroVisual } from "@/components/motion/experience-hero-visual";
import { SplitPageHero } from "@/components/shared/split-page-hero";

export function ExperienceHeroSection() {
  const t = useTranslations("experience");

  return (
    <SplitPageHero
      badge={t("label")}
      titleLine1={t("hero.titleLine1")}
      titleLine2={t("hero.titleLine2")}
      subtitle={t("hero.subtitle")}
      tags={[t("hero.tags.lead"), t("hero.tags.fullstack"), t("hero.tags.ai")]}
      visual={<ExperienceHeroVisual />}
    />
  );
}
