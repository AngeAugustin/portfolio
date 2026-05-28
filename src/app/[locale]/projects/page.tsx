import { setRequestLocale } from "next-intl/server";
import { ProjectsHeroSection } from "@/components/sections/projects-hero-section";
import { ProjectsPageContent } from "@/components/sections/projects-page-content";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHeroSection />
      <ProjectsPageContent />
    </>
  );
}
