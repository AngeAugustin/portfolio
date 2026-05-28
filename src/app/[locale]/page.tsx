import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
