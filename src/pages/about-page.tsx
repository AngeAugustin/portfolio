import { useTranslations } from "@/i18n/context";
import { AboutHeroSection } from "@/components/sections/about-hero-section";
import { PageIntl } from "@/components/layout/page-intl";
import { PageSeo } from "@/components/seo/page-seo";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ABOUT_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";

const ExperienceSection = lazySection(
  () => import("@/components/sections/experience-section"),
  "ExperienceSection"
);
const EducationSection = lazySection(
  () => import("@/components/sections/education-section"),
  "EducationSection"
);
const SkillsSection = lazySection(
  () => import("@/components/sections/skills-section"),
  "SkillsSection"
);
const AboutResumeSection = lazySection(
  () => import("@/components/sections/about-resume-section"),
  "AboutResumeSection"
);

export function AboutPage() {
  const t = useTranslations("about");

  return (
    <PageIntl namespaces={ABOUT_MESSAGE_NAMESPACES}>
      <PageSeo page="about" />
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
    </PageIntl>
  );
}
