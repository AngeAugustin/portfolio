"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Layers, Users } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurReveal, slideFromRight, staggerContainer, staggerItem } from "@/lib/animations";

const AUDIENCE_KEYS = ["web", "ai", "data"] as const;

export function ProjectsHeroSection() {
  const t = useTranslations("projects");

  return (
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
          text={t("hero.watermark")}
          bleed="none"
          className="top-[18%] -translate-y-0 text-[clamp(4.5rem,18vw,11rem)] text-foreground/[0.045]"
        />

        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            {t("hero.back")}
          </Link>
        </motion.div>

        <div className="relative z-10 mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <Badge variant="glow" className="text-[11px]">
                {t("title")}
              </Badge>
            </motion.div>

            <motion.h1
              variants={blurReveal}
              className="mt-5 font-display text-[clamp(2.25rem,5.2vw,3.85rem)] font-extrabold leading-[1.05] tracking-tight text-balance"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
            >
              <Magnetic>
                <Button asChild size="lg" className="group gap-2">
                  <Link href="/contact">
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="outline" className="group gap-2">
                  <Link href="/services">
                    {t("hero.ctaSecondary")}
                    <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.aside
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/95 p-7 shadow-[0_24px_60px_-32px_rgba(16,44,39,0.4)] backdrop-blur-sm md:p-8">
              <div
                className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#5aa892] to-[#1f4f45] text-primary-foreground shadow-lg"
                aria-hidden
              >
                <Layers className="size-7" strokeWidth={1.75} />
              </div>

              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {t("hero.promiseLabel")}
              </p>

              <p className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-foreground">
                {t("hero.promise")}
              </p>

              <div className="mt-6 border-t border-border/60 pt-5">
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                  <Users className="size-4 text-glow" strokeWidth={1.75} />
                  {t("hero.forWhom")}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {AUDIENCE_KEYS.map((key) => (
                    <span
                      key={key}
                      className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {t(`hero.audience.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
