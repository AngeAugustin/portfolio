"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Link } from "@/i18n/navigation";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export function ExperienceSection({
  compact = false,
  showLink = true,
}: {
  compact?: boolean;
  showLink?: boolean;
}) {
  const t = useTranslations("experience");
  const tRoot = useTranslations();
  const items = tRoot.raw("experienceItems") as ExperienceItem[];

  return (
    <section
      id="experience"
      className={
        compact
          ? "scroll-mt-28 border-t border-border/60 pb-24 pt-16 md:pt-20"
          : "section-padding scroll-mt-28 border-t border-border/60"
      }
    >
      <div className="editorial-container">
        {!compact && (
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="center"
          />
        )}

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

          <div className="flex flex-col gap-12">
            {items.map((item) => (
              <ScrollReveal key={item.company}>
                <motion.div
                  className="relative grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12 md:pl-20"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <span className="absolute left-2 top-2 hidden size-3 rounded-full border-2 border-background bg-glow md:left-6 md:block" />
                  <div>
                    <p className="text-sm font-medium text-glow">{item.period}</p>
                    <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {!compact && showLink && (
          <div className="mt-12 text-center">
            <Link
              href="/about#experience"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("label")} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
