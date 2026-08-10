import { Navigate, useParams } from "react-router-dom";
import { usePageMeta } from "@/lib/page-meta";
import { PageIntl } from "@/components/layout/page-intl";
import { PROJECT_DETAIL_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";
import { siteConfig } from "@/lib/site";
import { useProject } from "@/lib/cms";
import { useLocale } from "@/i18n/context";

const ProjectDetailView = lazySection(
  () => import("@/components/sections/project-detail-view"),
  "ProjectDetailView"
);

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { data: project, loading } = useProject(slug);

  usePageMeta({
    title: project ? `${project.title} | ${siteConfig.name}` : undefined,
    description: project?.description,
    ogTitle: project ? `${project.title} | ${siteConfig.name}` : undefined,
    ogDescription: project?.description,
  });

  if (loading) {
    return (
      <div className="editorial-container flex min-h-[50vh] items-center justify-center pt-32">
        <div className="size-8 animate-pulse rounded-full bg-secondary" />
      </div>
    );
  }

  if (!project) {
    return <Navigate to={`/${locale}/projects`} replace />;
  }

  return (
    <PageIntl namespaces={PROJECT_DETAIL_MESSAGE_NAMESPACES}>
      <ProjectDetailView project={project} />
    </PageIntl>
  );
}
