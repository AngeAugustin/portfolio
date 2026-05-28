"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";
import { TerminalCard } from "@/components/motion/terminal-card";

const TERMINAL_LINES = ["line1", "line2", "line3"] as const;
const STAT_KEYS = ["years", "projects", "stack", "focus"] as const;

export function HomeHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("hero.visual");
  const terminalLines = TERMINAL_LINES.map((key) => t(`terminal.${key}`));

  return (
    <HeroVisualShell className={className}>
      <div className="relative w-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">
            <Sparkles className="size-3" strokeWidth={1.5} />
            {t("label")}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-400/90">
            <motion.span
              className="size-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {t("status")}
          </span>
        </div>

        <TerminalCard lines={terminalLines} />

        <div className="mt-4 grid grid-cols-2 gap-2">
          {STAT_KEYS.map((key, index) => (
            <motion.div
              key={key}
              className="rounded-xl border border-border/60 bg-card/40 px-3 py-2.5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, borderColor: "color-mix(in oklab, var(--glow) 25%, var(--border))" }}
            >
              <p className="font-display text-lg font-bold leading-none md:text-xl">
                {t(`stats.${key}.value`)}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground md:text-[10px]">
                {t(`stats.${key}.label`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-4 flex flex-wrap gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        >
          {(t.raw("tags") as string[]).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-glow/15 bg-glow/5 px-2.5 py-0.5 text-[10px] font-medium text-glow/90"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </HeroVisualShell>
  );
}
