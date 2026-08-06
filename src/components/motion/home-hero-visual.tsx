"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { cn } from "@/lib/utils";

const CONNECTION_KEYS = ["fullstack", "ai", "data", "local"] as const;

export function HomeHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("hero.visual");

  return (
    <motion.div
      className={cn("relative mx-auto w-full", className)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-12 top-1/4 rounded-[50%] bg-glow/12 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_28px_90px_-32px_rgba(16,44,39,0.4)] sm:rounded-3xl">
        <div className="grid grid-cols-[132px_1fr] sm:grid-cols-[180px_1fr]">
          <aside className="border-r border-border/70 bg-muted/35 p-3 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t("sidebarLabel")}
            </p>
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-1.5">
              {CONNECTION_KEYS.map((key, index) => {
                const active = key === "fullstack";
                return (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.07, duration: 0.4 }}
                    className={cn(
                      "rounded-lg px-2 py-1.5 text-[11px] sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm",
                      active
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/70"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          active ? "bg-glow" : "bg-border"
                        )}
                      />
                      <span className="truncate">{t(`connections.${key}`)}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0 p-3.5 sm:p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <p className="font-display text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                  {t("activeTitle")}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                  {t("activeMeta")}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:py-1 sm:text-[11px] dark:text-emerald-400">
                <motion.span
                  className="size-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {t("status")}
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-border/70 bg-background/80 p-3 sm:mt-5 sm:rounded-2xl sm:p-5">
              <div className="flex items-center justify-between gap-3 text-[10px] text-muted-foreground sm:text-xs">
                <span>{t("progressLabel")}</span>
                <span className="font-medium text-foreground">{t("progressValue")}</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted sm:mt-3">
                <motion.div
                  className="h-full rounded-full bg-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 0.7, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="mt-4 space-y-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground sm:mt-5 sm:space-y-2 sm:text-xs">
                {(["line1", "line2", "line3"] as const).map((key, i) => (
                  <motion.p
                    key={key}
                    className="truncate"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.12, duration: 0.4 }}
                  >
                    <span className="text-glow/80">{">"}</span> {t(`terminal.${key}`)}
                    {i === 2 && (
                      <motion.span
                        className="ml-0.5 inline-block h-3 w-[2px] bg-glow align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.p>
                ))}
              </div>
            </div>

            <p className="mt-3 truncate text-[10px] text-muted-foreground sm:mt-4 sm:text-xs md:text-sm">
              {t("caption")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
