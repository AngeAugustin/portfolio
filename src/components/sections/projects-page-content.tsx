"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectImage } from "@/components/shared/project-image";
import { projects, type ProjectCategory } from "@/lib/site";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

const categories: (ProjectCategory | "all")[] = [
  "all",
  "web",
  "ai",
  "api",
  "dashboard",
  "saas",
  "automation",
];

export function ProjectsPageContent() {
  const t = useTranslations("projects");
  const tProjects = useTranslations("projectItems");
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="editorial-container pb-24">
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {cat === "all" ? t("filterAll") : t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <motion.article
            key={project.slug}
            variants={staggerItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <ProjectImage
                  src={project.image}
                  alt={tProjects(`${project.slug}.title`)}
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {project.year}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold">
                  {tProjects(`${project.slug}.title`)}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {tProjects(`${project.slug}.description`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("caseStudy")} <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
