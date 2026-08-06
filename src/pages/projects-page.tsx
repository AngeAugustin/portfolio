import { ProjectsHeroSection } from "@/components/sections/projects-hero-section";
import { PageIntl } from "@/components/layout/page-intl";
import { PROJECTS_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";

const ProjectsPageContent = lazySection(
  () => import("@/components/sections/projects-page-content"),
  "ProjectsPageContent"
);

export function ProjectsPage() {
  return (
    <PageIntl namespaces={PROJECTS_MESSAGE_NAMESPACES}>
      <ProjectsHeroSection />
      <ProjectsPageContent />
    </PageIntl>
  );
}
