"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectImage } from "@/components/shared/project-image";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { staggerItem } from "@/lib/animations";
import { useProjects } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const t = useTranslations("featured");
  const { data: projects, loading } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section-padding border-t border-border/60 bg-card">
      <div className="editorial-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        {loading && featured.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-12 md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "min-h-[220px] animate-pulse rounded-3xl bg-secondary/60",
                  i === 0 ? "md:col-span-7 md:row-span-2 md:min-h-[520px]" : "md:col-span-5"
                )}
              />
            ))}
          </div>
        ) : (
          <StaggerGroup className="grid gap-4 md:grid-cols-12 md:gap-5">
            {featured.map((project, index) => {
              const isLarge = index === 0;

              return (
                <motion.article
                  key={project.slug}
                  variants={staggerItem}
                  className={cn(
                    "group relative min-h-[300px] overflow-hidden rounded-3xl border border-border bg-card md:min-h-[360px]",
                    isLarge ? "md:col-span-7 md:row-span-2 md:min-h-[520px]" : "md:col-span-5",
                    index === 1 && "md:col-span-5",
                    index === 2 && "md:col-span-5",
                    index === 3 && "md:col-span-7"
                  )}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative block h-full min-h-[inherit]"
                  >
                    <div className="absolute inset-0">
                      <ProjectImage
                        src={project.image}
                        alt={project.title}
                        className="transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/35 to-forest/5" />
                    </div>

                    <div className="relative flex min-h-[inherit] flex-col justify-end p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4 text-forest-foreground">
                        <div>
                          <p className="text-xs uppercase tracking-widest opacity-70">
                            {project.year} · {project.category}
                          </p>
                          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                            {project.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm opacity-80">
                            {project.description}
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
        )}

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
