"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";
import { projects, type ProjectCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

const CATEGORY_KEYS: ProjectCategory[] = [
  "ai",
  "api",
  "web",
  "saas",
  "dashboard",
  "automation",
];

const CYCLE_MS = 2200;
const ORBIT_RADIUS = 108;

function getCategoryCount(category: ProjectCategory) {
  return projects.filter((p) => p.category === category).length;
}

export function ProjectsHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("projects.hero");
  const tCategories = useTranslations("projects.categories");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CATEGORY_KEYS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const activeCategory = CATEGORY_KEYS[activeIndex];

  return (
    <HeroVisualShell className={className}>
      <div className="w-full">
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">
          {t("spectrumLabel")}
        </p>

        <div className="relative mx-auto aspect-square w-full max-w-[300px]">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-glow/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />

          <svg
            aria-hidden
            viewBox="0 0 240 240"
            className="absolute inset-0 size-full"
          >
            {CATEGORY_KEYS.map((key, i) => {
              const angle = (i / CATEGORY_KEYS.length) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const x = 120 + Math.cos(rad) * ORBIT_RADIUS;
              const y = 120 + Math.sin(rad) * ORBIT_RADIUS;
              const isActive = i === activeIndex;

              return (
                <motion.line
                  key={key}
                  x1="120"
                  y1="120"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={isActive ? 1.5 : 0.75}
                  className={isActive ? "text-glow/60" : "text-glow/15"}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.35 }}
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <motion.div
              className="flex size-20 flex-col items-center justify-center rounded-2xl border border-glow/30 bg-gradient-to-br from-glow/10 via-card to-card shadow-lg shadow-glow/10 md:size-24"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FolderOpen className="size-6 text-glow md:size-7" strokeWidth={1.5} />
              <span className="mt-1 font-display text-2xl font-bold text-gradient md:text-3xl">
                {projects.length}
              </span>
            </motion.div>
            <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("count", { count: projects.length })}
            </p>
          </div>

          {CATEGORY_KEYS.map((key, i) => {
            const angle = (i / CATEGORY_KEYS.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * ORBIT_RADIUS;
            const y = Math.sin(rad) * ORBIT_RADIUS;
            const isActive = i === activeIndex;
            const count = getCategoryCount(key);

            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border px-2.5 py-2 transition-colors",
                  isActive
                    ? "glass z-10 min-w-[72px] border-glow/30 shadow-md shadow-glow/10"
                    : "min-w-[64px] border-border/50 bg-card/50 hover:border-glow/20"
                )}
                style={{ x, y }}
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "text-[9px] font-semibold uppercase tracking-wider",
                    isActive ? "text-glow" : "text-muted-foreground"
                  )}
                >
                  {tCategories(key)}
                </span>
                <span className="mt-0.5 font-display text-sm font-bold">{count}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          className="mt-6 rounded-xl border border-glow/15 bg-glow/5 px-4 py-3 text-center"
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-wider text-glow">
            {tCategories(activeCategory)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("spectrumHint", { count: getCategoryCount(activeCategory) })}
          </p>
          {projects.find((p) => p.category === activeCategory) && (
            <Link
              href={`/projects/${projects.find((p) => p.category === activeCategory)!.slug}`}
              className="mt-2 inline-block text-[11px] font-medium text-glow hover:underline"
            >
              {t("exploreCategory")}
            </Link>
          )}
        </motion.div>
      </div>
    </HeroVisualShell>
  );
}
