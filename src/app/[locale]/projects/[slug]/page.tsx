import { ProjectImage } from "@/components/shared/project-image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/site";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("projectItems");
  const tCommon = await getTranslations("common");
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);

  return (
    <>
      <PageHero label={project.category} title={title} subtitle={description} />
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
            alt={title}
            priority
            sizes="100vw"
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="mt-12 text-muted-foreground">
            {locale === "fr"
              ? "Étude de cas détaillée — architecture, défis techniques et résultats à venir."
              : "Detailed case study — architecture, technical challenges, and outcomes coming soon."}
          </p>
        </div>
      </div>
    </>
  );
}
