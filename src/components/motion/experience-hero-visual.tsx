"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";

const ROLE_CHANGE_MS = 2800;

export function ExperienceHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("experience.hero");
  const roles = t.raw("roles") as string[];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, ROLE_CHANGE_MS);
    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <HeroVisualShell className={className}>
      <div className="flex w-full flex-col items-center py-4 md:py-6">
        <div className="relative flex size-56 items-center justify-center md:size-64">
          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              aria-hidden
              className="absolute rounded-full border border-glow/25"
              style={{
                width: 112 + ring * 44,
                height: 112 + ring * 44,
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.12, 0.35],
              }}
              transition={{
                duration: 4 + ring,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.6,
              }}
            />
          ))}

          <motion.span
            aria-hidden
            className="absolute size-40 rounded-full border border-dashed border-glow/30 md:size-48"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-glow">
              {t("roleLabel")}
            </p>

            <div className="flex h-[4.5rem] items-center justify-center md:h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[activeIndex]}
                  className="font-display text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl"
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {roles[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex gap-1.5">
              {roles.map((role, i) => (
                <motion.span
                  key={role}
                  className="h-1 rounded-full bg-glow/30"
                  animate={{
                    width: i === activeIndex ? 20 : 6,
                    backgroundColor:
                      i === activeIndex
                        ? "color-mix(in oklab, var(--glow) 100%, transparent)"
                        : "color-mix(in oklab, var(--glow) 25%, transparent)",
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                />
              ))}
            </div>
          </div>

          {roles.map((role, i) => {
            const angle = (i / roles.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const radius = 118;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.span
                key={`dot-${role}`}
                className="absolute size-2 rounded-full bg-glow"
                style={{ left: "50%", top: "50%", x, y, marginLeft: -4, marginTop: -4 }}
                animate={{
                  opacity: i === activeIndex ? 1 : 0.25,
                  scale: i === activeIndex ? [1, 1.4, 1] : 1,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 2, repeat: i === activeIndex ? Infinity : 0 },
                }}
                aria-hidden
              />
            );
          })}
        </div>

        <motion.p
          className="mt-6 max-w-[260px] text-center text-xs leading-relaxed text-muted-foreground md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t("roleCaption")}
        </motion.p>
      </div>
    </HeroVisualShell>
  );
}
