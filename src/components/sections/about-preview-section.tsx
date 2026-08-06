"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function AboutPreviewSection() {
  const t = useTranslations("about");

  return (
    <section className="section-padding bg-secondary/30">
      <div className="editorial-container">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <SectionHeader label={t("label")} title={t("title")} className="mb-0 lg:mb-0" />

          <ScrollReveal>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <Button asChild variant="outline" className="mt-2 w-fit gap-2">
                <Link href="/about">
                  {t("cta")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {["FullStack", "AI Systems", "Data Pipelines"].map((item, i) => (
              <motion.div
                key={item}
                className="glass rounded-2xl p-8"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="font-display text-5xl font-bold text-glow/30">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{item}</h3>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
