"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import type { CmsService } from "@/lib/cms";
import { cn } from "@/lib/utils";

interface ServiceDetailHeroVisualProps {
  service: CmsService;
  icon: LucideIcon;
  className?: string;
}

export function ServiceDetailHeroVisual({
  service,
  icon: Icon,
  className,
}: ServiceDetailHeroVisualProps) {
  const t = useTranslations("services.detail");
  const previewDeliverables = service.deliverables.slice(0, 3);
  const stats = [
    {
      label: t("visual.statDeliverables"),
      value: String(service.deliverables.length).padStart(2, "0"),
      hint: t("visual.statDeliverablesHint"),
    },
    {
      label: t("visual.statSteps"),
      value: String(service.approach.length).padStart(2, "0"),
      hint: t("visual.statStepsHint"),
    },
    {
      label: t("visual.statStack"),
      value: String(service.stack.length).padStart(2, "0"),
      hint: t("visual.statStackHint"),
    },
  ] as const;

  return (
    <motion.div
      className={cn("relative mx-auto w-full", className)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -bottom-10 top-1/3 rounded-[50%] bg-glow/12 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-muted/40 shadow-[0_28px_90px_-36px_rgba(16,44,39,0.45)] sm:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center font-mono text-[10px] text-muted-foreground sm:text-[11px]">
            {t("visual.path", { slug: service.slug })}
          </p>
          <span className="hidden size-8 sm:block" aria-hidden />
        </div>

        <div className="bg-card/80 p-4 backdrop-blur-sm sm:p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("visual.eyebrow")}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#5aa892] to-[#1f4f45] text-primary-foreground shadow-md">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                  {service.title}
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <motion.span
                className="size-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {t("visual.status")}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.08, duration: 0.45 }}
                className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3.5"
              >
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.hint}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t("deliverables")}
            </p>
            <ul className="mt-3 space-y-2">
              {previewDeliverables.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + index * 0.08, duration: 0.4 }}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-glow" />
                  <span className="leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
