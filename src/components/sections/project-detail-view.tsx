"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ProjectImage } from "@/components/shared/project-image";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurReveal, staggerContainer, staggerItem } from "@/lib/animations";
import { useProjects, type CmsProject } from "@/lib/cms";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<CmsProject["category"], string> = {
  web: "text-foreground border-border bg-accent/60",
  ai: "text-glow border-glow/30 bg-glow/10",
  api: "text-glow border-forest/30 bg-forest/10",
  dashboard: "text-glow border-glow/30 bg-glow/10",
  saas: "text-foreground border-border bg-accent/60",
  automation: "text-glow border-forest/30 bg-forest/10",
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function ProjectBody({
  project,
  comingSoon,
}: {
  project: CmsProject;
  comingSoon: string;
}) {
  const content = project.caseStudy?.trim();

  if (!content) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {project.description}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground/80 md:text-base">
          {comingSoon}
        </p>
      </div>
    );
  }

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  if (looksLikeHtml) {
    return (
      <div
        className="article-prose mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg [&_a]:text-glow [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_mark]:rounded-sm [&_mark]:bg-amber-200/70 [&_mark]:px-0.5 [&_mark]:text-foreground [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-relaxed [&_strong]:text-foreground [&_u]:underline [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const hasHeadings = blocks.some((block) => /^##\s+/.test(block));

  if (hasHeadings) {
    const sections: { heading?: string; paragraphs: string[] }[] = [];
    let current: { heading?: string; paragraphs: string[] } = { paragraphs: [] };

    for (const block of blocks) {
      if (/^##\s+/.test(block)) {
        if (current.heading || current.paragraphs.length > 0) {
          sections.push(current);
        }
        current = {
          heading: block.replace(/^##\s+/, "").trim(),
          paragraphs: [],
        };
      } else {
        current.paragraphs.push(block);
      }
    }
    if (current.heading || current.paragraphs.length > 0) {
      sections.push(current);
    }

    return (
      <div className="mx-auto max-w-3xl space-y-12">
        {sections.map((section) => (
          <section key={section.heading || section.paragraphs[0]?.slice(0, 48)}>
            {section.heading ? (
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {section.heading}
              </h2>
            ) : null}
            <div
              className={cn(
                "space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg",
                section.heading && "mt-5"
              )}
            >
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
      {blocks.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{stripHtml(paragraph)}</p>
      ))}
    </div>
  );
}

interface ProjectDetailViewProps {
  project: CmsProject;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const t = useTranslations("projects");
  const tDetail = useTranslations("projects.detail");
  const { data: projects } = useProjects();

  const related = [
    ...projects.filter(
      (item) => item.slug !== project.slug && item.category === project.category
    ),
    ...projects.filter(
      (item) => item.slug !== project.slug && item.category !== project.category
    ),
  ].slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_25%_15%,#000_15%,transparent_70%)]"
        />
        <GradientOrb className="-left-24 top-8 opacity-55" size="480px" />
        <GradientOrb className="right-0 top-1/4 opacity-40" size="420px" delay={2.5} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

        <div className="editorial-container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          <SectionWatermark
            text={tDetail("watermark")}
            bleed="none"
            className="top-[12%] -translate-y-0 text-[clamp(4.5rem,18vw,11rem)] text-foreground/[0.045]"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={staggerItem}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
                {tDetail("back")}
              </Link>
            </motion.div>

            <div className="mt-8 max-w-3xl">
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap items-center gap-2"
              >
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    CATEGORY_STYLES[project.category]
                  )}
                >
                  {t(`categories.${project.category}`)}
                </Badge>
                <time className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {project.year}
                </time>
              </motion.div>

              <motion.h1
                variants={blurReveal}
                className="mt-5 font-display text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-balance"
              >
                {project.title}
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {project.description}
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
              >
                <Magnetic>
                  <Button asChild size="lg" className="group gap-2">
                    <Link href="/contact">
                      {tDetail("ctaPrimary")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button asChild size="lg" variant="outline" className="group gap-2">
                    <Link href="/projects">
                      {tDetail("ctaSecondary")}
                      <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
                {project.liveUrl ? (
                  <Magnetic strength={0.2}>
                    <Button asChild size="lg" variant="outline" className="group gap-2">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        {tDetail("liveDemo")}
                        <ExternalLink className="size-4 opacity-70" />
                      </a>
                    </Button>
                  </Magnetic>
                ) : null}
                {project.repoUrl ? (
                  <Magnetic strength={0.2}>
                    <Button asChild size="lg" variant="outline" className="group gap-2">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        {tDetail("viewCode")}
                        <Github className="size-4 opacity-70" />
                      </a>
                    </Button>
                  </Magnetic>
                ) : null}
              </motion.div>
            </div>

            <motion.div
              variants={staggerItem}
              className="relative mt-12 overflow-hidden rounded-2xl border border-border/80 bg-muted/30 shadow-[0_28px_90px_-36px_rgba(16,44,39,0.45)] sm:rounded-3xl md:mt-14"
            >
              <div className="relative aspect-[16/9] w-full">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>
          <ProjectBody project={project} comingSoon={tDetail("comingSoon")} />
        </ScrollReveal>

        {project.stack.length > 0 ? (
          <ScrollReveal className="mx-auto mt-12 max-w-3xl md:mt-16" delay={0.05}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
              {tDetail("stackLabel")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-border/80 bg-card/60 px-3 py-1.5 text-xs font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal className="mt-16 md:mt-20" delay={0.1}>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-12 text-center text-forest-foreground md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {tDetail("ctaTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-forest-foreground/75">
                {tDetail("ctaSubtitle")}
              </p>
              <Button asChild className="mt-8 gap-2" size="lg" variant="secondary">
                <Link href="/contact">
                  {tDetail("ctaButton")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {related.length > 0 ? (
          <ScrollReveal className="mt-16 md:mt-20" delay={0.15}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
                  {tDetail("relatedLabel")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {tDetail("relatedTitle")}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-glow/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
                    <ProjectImage
                      src={item.image}
                      alt={item.title}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        CATEGORY_STYLES[item.category]
                      )}
                    >
                      {t(`categories.${item.category}`)}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-glow">
                      {tDetail("viewProject")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </>
  );
}
