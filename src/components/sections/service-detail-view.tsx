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
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { ServiceDetailHeroVisual } from "@/components/motion/service-detail-hero-visual";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurReveal, staggerContainer, staggerItem } from "@/lib/animations";
import { useServices, type CmsService } from "@/lib/cms";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  fullstack: Code2,
  "ai-integration": Brain,
  "api-backend": Server,
  "data-engineering": Database,
};

function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_ICONS[slug] ?? Code2;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

interface ServiceDetailViewProps {
  service: CmsService;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const t = useTranslations("services.detail");
  const { data: services } = useServices();
  const Icon = getServiceIcon(service.slug);
  const index = Math.max(
    0,
    services.findIndex((item) => item.slug === service.slug)
  );
  const overview = stripHtml(service.overview) || service.summary;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_25%_15%,#000_15%,transparent_70%)]"
        />
        <GradientOrb className="-left-24 top-8 opacity-55" size="480px" />
        <GradientOrb className="right-0 top-1/4 opacity-40" size="420px" delay={2.5} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

        <div className="editorial-container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          <SectionWatermark
            text={t("watermark")}
            className="top-[12%] -translate-y-0 text-[clamp(4.5rem,18vw,11rem)] text-foreground/[0.045]"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={staggerItem}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
                {t("back")}
              </Link>
            </motion.div>

            <div className="mt-8 max-w-3xl">
              <motion.div variants={staggerItem}>
                <Badge variant="glow" className="text-[11px]">
                  {t("serviceLabel")} 0{index + 1}
                </Badge>
              </motion.div>

              <motion.h1
                variants={blurReveal}
                className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-balance"
              >
                {service.title}
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {service.tagline || service.summary}
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
              >
                <Magnetic>
                  <Button asChild size="lg" className="group gap-2">
                    <Link href="/contact">
                      {t("ctaPrimary")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button asChild size="lg" variant="outline" className="group gap-2">
                    <Link href="/services">
                      {t("ctaSecondary")}
                      <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div variants={staggerItem} className="mt-12 md:mt-14">
              <ServiceDetailHeroVisual service={service} icon={Icon} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {overview}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal>
            <div className="glass h-full rounded-3xl border border-border/80 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold">{t("deliverables")}</h2>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((item) => (
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
                {service.approach.map((item, stepIndex) => (
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
              {service.stack.map((tech) => (
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
              {service.idealFor.map((item) => (
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
              .filter((item) => item.slug !== service.slug)
              .map((item) => {
                const OtherIcon = getServiceIcon(item.slug);

                return (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-2.5 text-sm transition-colors hover:border-glow/30 hover:bg-card"
                    )}
                  >
                    <OtherIcon className="size-4 text-glow" strokeWidth={1.5} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
