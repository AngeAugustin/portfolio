"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { blurReveal } from "@/lib/animations";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-20 md:pt-40 md:pb-28">
      <GradientOrb className="right-0 top-0 opacity-60" size="400px" />
      <div className="editorial-container relative">
        <motion.p
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-glow"
        >
          {label}
        </motion.p>
        <motion.h1
          variants={blurReveal}
          initial="hidden"
          animate="visible"
          className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
