"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Badge } from "@/components/ui/badge";
import { blurReveal, slideFromRight, staggerContainer, staggerItem } from "@/lib/animations";

interface SplitPageHeroProps {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  tags: string[];
  visual: ReactNode;
}

export function SplitPageHero({
  badge,
  titleLine1,
  titleLine2,
  subtitle,
  tags,
  visual,
}: SplitPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <GradientOrb className="-left-24 top-0 opacity-50" size="420px" />
      <GradientOrb className="-right-32 bottom-0 opacity-40" size="380px" delay={2.5} />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="editorial-container relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(320px,0.95fr)] lg:gap-10 xl:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={staggerItem}>
              <Badge variant="glow" className="mb-5 text-[11px]">
                {badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={blurReveal}
              className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight"
            >
              <span className="block text-foreground">{titleLine1}</span>
              <span className="mt-1 block text-gradient">{titleLine2}</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {subtitle}
            </motion.p>

            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
