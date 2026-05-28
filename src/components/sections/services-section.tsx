"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, Database, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { staggerItem } from "@/lib/animations";
import { services, type ServiceSlug } from "@/lib/site";

type ServiceCard = {
  title: string;
  summary: string;
};

const SERVICE_ICONS = {
  fullstack: Code2,
  "ai-integration": Brain,
  "api-backend": Server,
  "data-engineering": Database,
} as const;

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("services");
  const tRoot = useTranslations();

  return (
    <section
      className={
        compact
          ? "pb-24 pt-16 md:pb-32 md:pt-24"
          : "section-padding bg-forest text-forest-foreground"
      }
    >
      <div className="editorial-container">
        {!compact ? (
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
            className="[&_h2]:text-forest-foreground [&_p]:text-forest-foreground/70 [&_span]:border-forest-foreground/20 [&_span]:text-forest-foreground"
          />
        ) : (
          <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-forest-foreground/70 md:mb-14 md:text-lg">
            {t("cardsIntro")}
          </p>
        )}

        <StaggerGroup className="mx-auto grid max-w-5xl auto-rows-fr gap-5 sm:grid-cols-2 sm:gap-6">
          {services.map((service, index) => {
            const item = tRoot.raw(`serviceDetails.${service.slug}`) as ServiceCard;
            const Icon = SERVICE_ICONS[service.slug as ServiceSlug];

            return (
              <motion.div key={service.slug} variants={staggerItem} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-forest-foreground/10 bg-forest-foreground/5 p-6 backdrop-blur-sm transition-all hover:border-forest-foreground/20 hover:shadow-xl hover:shadow-black/10 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-forest-foreground/15 bg-forest-foreground/10 text-glow transition-colors group-hover:border-glow/30 group-hover:bg-glow/10">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-3xl font-bold leading-none text-forest-foreground/15 transition-colors group-hover:text-forest-foreground/25">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold md:text-2xl">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-foreground/75 md:text-base">
                    {item.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-glow">
                    {t("learnMore")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </StaggerGroup>

        {!compact && (
          <div className="mt-12 text-center">
            <Link href="/services" className="text-sm font-medium text-glow hover:underline">
              {t("label")} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
