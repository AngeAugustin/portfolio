import { lazySection } from "@/lib/lazy-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PageIntl } from "@/components/layout/page-intl";
import { HOME_MESSAGE_NAMESPACES } from "@/i18n/client-messages";

const TechStackSection = lazySection(
  () => import("@/components/sections/tech-stack-section"),
  "TechStackSection"
);
const ServicesSection = lazySection(
  () => import("@/components/sections/services-section"),
  "ServicesSection"
);
const FeaturedProjectsSection = lazySection(
  () => import("@/components/sections/featured-projects-section"),
  "FeaturedProjectsSection"
);
const ExperienceSection = lazySection(
  () => import("@/components/sections/experience-section"),
  "ExperienceSection"
);
const TestimonialsSection = lazySection(
  () => import("@/components/sections/testimonials-section"),
  "TestimonialsSection"
);
const CtaSection = lazySection(
  () => import("@/components/sections/cta-section"),
  "CtaSection"
);
const ContactSection = lazySection(
  () => import("@/components/sections/contact-section"),
  "ContactSection"
);

/**
 * Homepage flow aligned with dbdump.cc:
 * Hero → tools strip → value props → proof → journey → trust → CTA → contact
 */
export function HomePage() {
  return (
    <PageIntl namespaces={HOME_MESSAGE_NAMESPACES}>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Engines / tools strip */}
      <TechStackSection />

      {/* 3. Why — value props */}
      <ServicesSection />

      {/* 4. Proof of work */}
      <FeaturedProjectsSection />

      {/* 5. How the journey works */}
      <ExperienceSection />

      {/* 6. Social proof */}
      <TestimonialsSection />

      {/* 7. Closing CTA */}
      <CtaSection />

      {/* 8. Conversion */}
      <ContactSection />
    </PageIntl>
  );
}
