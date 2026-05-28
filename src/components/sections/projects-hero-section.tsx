"use client";

import { useTranslations } from "next-intl";
import { ProjectsHeroVisual } from "@/components/motion/projects-hero-visual";
import { SplitPageHero } from "@/components/shared/split-page-hero";

export function ProjectsHeroSection() {
  const t = useTranslations("projects");

  return (
    <SplitPageHero
      badge={t("title")}
      titleLine1={t("hero.titleLine1")}
      titleLine2={t("hero.titleLine2")}
      subtitle={t("hero.subtitle")}
      tags={[t("hero.tags.web"), t("hero.tags.ai"), t("hero.tags.data")]}
      visual={<ProjectsHeroVisual />}
    />
  );
}
