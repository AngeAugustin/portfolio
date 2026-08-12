"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { useEducations } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function EducationSection() {
  const t = useTranslations("education");
  const { data: items, loading } = useEducations();

  return (
    <section
      id="education"
      className="scroll-mt-28 border-t border-border/60 pb-24 pt-16 md:pt-20"
    >
      <div className="editorial-container">
        <SectionHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

          <div className="flex flex-col gap-12">
            {loading && items.length === 0
              ? [0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="relative grid animate-pulse gap-6 md:grid-cols-[1fr_2fr] md:gap-12 md:pl-20"
                  >
                    <div className="space-y-3">
                      <div className="h-4 w-24 rounded bg-secondary/70" />
                      <div className="h-7 w-56 rounded bg-secondary/70" />
                      <div className="h-4 w-40 rounded bg-secondary/60" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-secondary/60" />
                      <div className="h-4 w-full rounded bg-secondary/60" />
                      <div className="h-4 w-3/4 rounded bg-secondary/60" />
                    </div>
                  </div>
                ))
              : items.map((item) => (
                  <ScrollReveal key={item.key}>
                    <motion.div
                      className="relative grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12 md:pl-20"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <span
                        className={cn(
                          "absolute left-2 top-2 hidden size-3 rounded-full border-2 border-background md:left-6 md:block",
                          item.status === "ongoing"
                            ? "bg-amber-400/90"
                            : "bg-glow"
                        )}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-glow">{item.period}</p>
                          {item.status === "ongoing" && (
                            <Badge variant="glow" className="text-[10px]">
                              {t("upcoming")}
                            </Badge>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">
                          {item.degree}
                        </h3>
                        <p className="mt-1 text-muted-foreground">{item.school}</p>
                        {item.highlight && (
                          <p className="mt-2 text-sm font-medium text-glow">{item.highlight}</p>
                        )}
                      </div>
                      <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
