"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectImage } from "@/components/shared/project-image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { staggerItem } from "@/lib/animations";
import { projects } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const t = useTranslations("featured");
  const tProjects = useTranslations("projectItems");
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="editorial-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <StaggerGroup className="grid gap-4 md:grid-cols-12 md:gap-5">
          {featured.map((project, index) => {
            const isLarge = index === 0;
            const title = tProjects(`${project.slug}.title`);
            const description = tProjects(`${project.slug}.description`);

            return (
              <motion.article
                key={project.slug}
                variants={staggerItem}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-border bg-card",
                  isLarge ? "md:col-span-7 md:row-span-2" : "md:col-span-5",
                  index === 1 && "md:col-span-5",
                  index === 2 && "md:col-span-5",
                  index === 3 && "md:col-span-7"
                )}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex h-full min-h-[280px] flex-col md:min-h-[320px]"
                >
                  <div className="relative flex-1 overflow-hidden">
                    <ProjectImage
                      src={project.image}
                      alt={title}
                      className="transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-forest-foreground md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-70">
                          {project.year} · {project.category}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                          {title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm opacity-80">
                          {description}
                        </p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </StaggerGroup>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("viewAll")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
