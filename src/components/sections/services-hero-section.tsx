"use client";

import { useTranslations } from "next-intl";
import { ServicesHeroVisual } from "@/components/motion/services-hero-visual";
import { SplitPageHero } from "@/components/shared/split-page-hero";

export function ServicesHeroSection() {
  const t = useTranslations("services");

  return (
    <SplitPageHero
      badge={t("label")}
      titleLine1={t("hero.titleLine1")}
      titleLine2={t("hero.titleLine2")}
      subtitle={t("hero.subtitle")}
      tags={[t("hero.tags.product"), t("hero.tags.ai"), t("hero.tags.data")]}
      visual={<ServicesHeroVisual />}
    />
  );
}
