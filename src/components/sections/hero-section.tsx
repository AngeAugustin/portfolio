"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { HomeHeroVisual } from "@/components/motion/home-hero-visual";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blurReveal, slideFromRight, staggerContainer, staggerItem } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100dvh] overflow-x-hidden pt-24 pb-16 md:pb-20">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <GradientOrb className="-left-32 top-1/4" size="500px" />
      <GradientOrb className="-right-24 bottom-1/4" size="450px" delay={2} />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <div className="editorial-container relative z-10 flex min-h-[calc(100dvh-6rem)] items-center py-8 lg:py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_minmax(300px,0.9fr)] lg:gap-10 xl:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={staggerItem}>
              <Badge variant="glow" className="mb-6 text-[11px]">
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              variants={blurReveal}
              className="font-display text-[clamp(2.125rem,5.5vw,4.75rem)] font-bold leading-[1] tracking-tight"
            >
              <span className="block text-foreground">{t("title")}</span>
              <span className="block text-gradient">{t("titleAccent")}</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild className="group gap-2">
                  <Link href="/projects">
                    {t("ctaPrimary")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild variant="outline">
                  <Link href="/contact">{t("ctaSecondary")}</Link>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none"
          >
            <HomeHeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
