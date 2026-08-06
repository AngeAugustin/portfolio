"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Rocket, Search } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { cn } from "@/lib/utils";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";

const STEPS = [
  { key: "discover" as const, icon: Search },
  { key: "design" as const, icon: Layers },
  { key: "build" as const, icon: Code2 },
  { key: "launch" as const, icon: Rocket },
] as const;

const STEP_INTERVAL_MS = 2400;

export function ServicesHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("services.hero");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, STEP_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <HeroVisualShell className={className}>
      <div className="w-full">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">
          {t("processLabel")}
        </p>

        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute bottom-3 left-[18px] top-3 w-px origin-top bg-border/80"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-3 left-[18px] top-3 w-px origin-top bg-gradient-to-b from-glow via-glow/50 to-transparent"
            animate={{ scaleY: (activeIndex + 1) / STEPS.length }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col gap-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={step.key}
                  className={cn(
                    "relative flex items-center gap-4 rounded-xl border px-3.5 py-3 transition-colors md:px-4 md:py-3.5",
                    isActive
                      ? "glass border-glow/25 shadow-md shadow-glow/10"
                      : "border-transparent bg-transparent"
                  )}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.55 }}
                  whileHover={{ x: 4 }}
                >
                  <span
                    className={cn(
                      "relative z-10 ml-0.5 size-3 shrink-0 rounded-full border-2 border-background",
                      isActive ? "bg-glow" : "bg-muted-foreground/30"
                    )}
                    aria-hidden
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-glow"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </span>

                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg border md:size-11",
                      isActive
                        ? "border-glow/30 bg-glow/10"
                        : "border-border/60 bg-card/40"
                    )}
                  >
                    <Icon
                      className={cn("size-4 md:size-[18px]", isActive ? "text-glow" : "text-muted-foreground")}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "font-display text-sm font-bold md:text-base",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {t(`steps.${step.key}.title`)}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </HeroVisualShell>
  );
}
