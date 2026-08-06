"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Testimonial = { quote: string; author: string; role: string };

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const tRoot = useTranslations();
  const items = tRoot.raw("testimonialsItems") as Testimonial[];

  return (
    <section className="section-padding border-t border-border/60 bg-card">
      <div className="editorial-container">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={item.author} delay={i * 0.08}>
              <motion.blockquote
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-8"
                whileHover={{ y: -6 }}
              >
                <Quote className="size-8 text-glow/40" />
                <p className="mt-6 flex-1 text-lg leading-relaxed text-foreground/90">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-8 border-t border-border pt-6">
                  <cite className="not-italic">
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </cite>
                </footer>
              </motion.blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
