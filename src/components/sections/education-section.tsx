"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EducationItem = {
  degree: string;
  school: string;
  period: string;
  description: string;
  status: "completed" | "ongoing";
  highlight?: string;
};

export function EducationSection() {
  const t = useTranslations("education");
  const tRoot = useTranslations();
  const items = tRoot.raw("educationItems") as EducationItem[];

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
            {items.map((item) => (
              <ScrollReveal key={`${item.degree}-${item.period}`}>
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
