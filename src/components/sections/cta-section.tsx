"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="section-padding">
      <div className="editorial-container">
        <ScrollReveal>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary via-background to-accent px-8 py-16 text-center md:px-16 md:py-24"
            whileInView={{ opacity: 1 }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full glow-orb blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full glow-orb blur-3xl opacity-50" />

            <h2 className="relative z-10 font-display text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
            <div className="relative z-10 mt-10">
              <Magnetic>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    {t("button")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
