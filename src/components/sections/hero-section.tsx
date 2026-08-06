import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { lazy, Suspense } from "react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { blurReveal, fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const HomeHeroVisual = lazy(() =>
  import("@/components/motion/home-hero-visual").then((mod) => ({
    default: mod.HomeHeroVisual,
  }))
);

const TRUST_KEYS = ["available", "stack", "remote"] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="hero-atmosphere pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-pattern opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,#000_20%,transparent_75%)]"
      />
      <GradientOrb
        className="left-1/2 top-8 -translate-x-1/2 opacity-70"
        size="720px"
      />
      <GradientOrb
        className="-left-28 bottom-0 opacity-45"
        size="420px"
        delay={2}
      />
      <GradientOrb
        className="-right-24 bottom-16 opacity-40"
        size="380px"
        delay={3.5}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <div className="editorial-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-glow" />
            {t("badge")}
          </motion.p>

          <motion.h1
            variants={blurReveal}
            className="mt-6 font-display text-[clamp(2.125rem,5.8vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t("title")} </span>
            <span className="text-gradient">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="group gap-2">
                <Link href="/projects">
                  {t("ctaPrimary")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button asChild size="lg" variant="outline" className="group gap-2">
                <Link href="/about">
                  {t("ctaSecondary")}
                  <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.ul
            variants={staggerItem}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {TRUST_KEYS.map((key) => (
              <li
                key={key}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Check className="size-3.5 text-glow" strokeWidth={2.5} />
                {t(`trust.${key}`)}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mt-10 w-full max-w-4xl md:mt-12"
        >
          <Suspense fallback={null}>
            <HomeHeroVisual />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
