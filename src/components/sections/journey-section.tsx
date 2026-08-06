"use client";

import { motion } from "framer-motion";
import { Database, Brain, Code2 } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const icons = [Code2, Brain, Database];

type JourneyItem = { phase: string; title: string; description: string };

export function JourneySection({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("journey");
  const tRoot = useTranslations();
  const items = tRoot.raw("journeyItems") as JourneyItem[];

  return (
    <section
      id="journey"
      className={
        compact
          ? "relative scroll-mt-28 overflow-hidden pb-24"
          : "section-padding relative scroll-mt-28 overflow-hidden"
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-glow/5 via-transparent to-primary/5" />

      <div className="editorial-container relative">
        {!compact && (
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <ScrollReveal key={item.phase} delay={i * 0.1}>
                <motion.div
                  className="glass h-full rounded-3xl p-8 md:p-10"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <span className="mt-6 block font-display text-4xl font-bold text-glow/25">
                    {item.phase}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
