"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  Server,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurReveal, staggerContainer, staggerItem } from "@/lib/animations";
import { services, type ServiceSlug } from "@/lib/site";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  fullstack: Code2,
  "ai-integration": Brain,
  "api-backend": Server,
  "data-engineering": Database,
} as const;

type ServiceDetail = {
  title: string;
  summary: string;
  tagline: string;
  overview: string;
  tags: string[];
  deliverables: string[];
  approach: string[];
  stack: string[];
  idealFor: string[];
};

interface ServiceDetailViewProps {
  slug: ServiceSlug;
}

export function ServiceDetailView({ slug }: ServiceDetailViewProps) {
  const t = useTranslations("services.detail");
  const tRoot = useTranslations();
  const detail = tRoot.raw(`serviceDetails.${slug}`) as ServiceDetail;
  const Icon = SERVICE_ICONS[slug];
  const index = services.findIndex((service) => service.slug === slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <GradientOrb className="-left-24 top-0 opacity-50" size="420px" />
        <GradientOrb className="-right-32 bottom-0 opacity-40" size="380px" delay={2.5} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

        <div className="editorial-container relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={staggerItem}>
              <Button asChild variant="ghost" className="mb-8 gap-2 px-0 hover:bg-transparent">
                <Link href="/services">
                  <ArrowLeft className="size-4" />
                  {t("back")}
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 text-glow md:size-16">
                <Icon className="size-7 md:size-8" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">
                  {t("serviceLabel")} 0{index + 1}
                </p>
                <motion.h1
                  variants={blurReveal}
                  className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
                >
                  {detail.title}
                </motion.h1>
              </div>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {detail.tagline}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-2">
              {detail.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {detail.overview}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal>
            <div className="glass h-full rounded-3xl border border-border/80 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold">{t("deliverables")}</h2>
              <ul className="mt-6 space-y-4">
                {detail.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-glow" strokeWidth={1.5} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass h-full rounded-3xl border border-border/80 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold">{t("approach")}</h2>
              <ol className="mt-6 space-y-4">
                {detail.approach.map((item, stepIndex) => (
                  <li key={item} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-glow/20 bg-glow/5 font-display text-sm font-bold text-glow">
                      {stepIndex + 1}
                    </span>
                    <span className="pt-1 leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-10" delay={0.15}>
          <div className="rounded-3xl border border-border/80 bg-secondary/20 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">{t("stack")}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {detail.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.2}>
          <div className="rounded-3xl border border-border/80 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">{t("idealFor")}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail.idealFor.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/60 bg-card/40 px-4 py-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 md:mt-20" delay={0.25}>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-12 text-center text-forest-foreground md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{t("ctaTitle")}</h2>
              <p className="mx-auto mt-4 max-w-xl text-forest-foreground/75">{t("ctaSubtitle")}</p>
              <Button asChild className="mt-8 gap-2" size="lg">
                <Link href="/contact">
                  {t("ctaButton")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            {services
              .filter((service) => service.slug !== slug)
              .map((service) => {
                const other = tRoot.raw(`serviceDetails.${service.slug}`) as Pick<
                  ServiceDetail,
                  "title"
                >;
                const OtherIcon = SERVICE_ICONS[service.slug];

                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-2.5 text-sm transition-colors hover:border-glow/30 hover:bg-card"
                    )}
                  >
                    <OtherIcon className="size-4 text-glow" strokeWidth={1.5} />
                    <span className="font-medium">{other.title}</span>
                  </Link>
                );
              })}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
