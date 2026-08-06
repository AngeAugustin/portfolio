import { Navigate, useParams } from "react-router-dom";
import { usePageMeta } from "@/lib/page-meta";
import { useTranslations, useLocale } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { ProjectImage } from "@/components/shared/project-image";
import { siteConfig } from "@/lib/site";
import { useProject, type CmsProject } from "@/lib/cms";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageIntl } from "@/components/layout/page-intl";
import { PROJECT_DETAIL_MESSAGE_NAMESPACES } from "@/i18n/client-messages";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { data: project, loading } = useProject(slug);

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
      <ProjectDetailContent project={project} />
    </PageIntl>
  );
}

function ProjectDetailContent({ project }: { project: CmsProject }) {
  const tCommon = useTranslations("common");
  const locale = useLocale();

  usePageMeta({
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description,
  });

  return (
    <>
      <PageHero
        label={project.category}
        title={project.title}
        subtitle={project.description}
      />
      <div className="editorial-container pb-24">
        <Button asChild variant="ghost" className="mb-8 gap-2">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            {tCommon("back")}
          </Link>
        </Button>

        <div className="relative mb-12 aspect-video overflow-hidden rounded-3xl border border-border">
          <ProjectImage
            src={project.image}
            alt={project.title}
            priority
            sizes="100vw"
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.caseStudy?.replace(/<[^>]+>/g, "") || project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          {!project.caseStudy && (
            <p className="mt-12 text-muted-foreground">
              {locale === "fr"
                ? "Étude de cas détaillée — architecture, défis techniques et résultats à venir."
                : "Detailed case study — architecture, technical challenges, and outcomes coming soon."}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
