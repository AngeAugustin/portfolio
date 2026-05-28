import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { AboutHeroSection } from "@/components/sections/about-hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AboutResumeSection } from "@/components/sections/about-resume-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <AboutHeroSection />
      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </ScrollReveal>
      </div>
      <ExperienceSection showLink={false} />
      <EducationSection />
      <SkillsSection showLink={false} />
      <AboutResumeSection />
    </>
  );
}
