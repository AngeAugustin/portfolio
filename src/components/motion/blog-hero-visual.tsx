"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";
import { useArticles } from "@/lib/cms";
import type { BlogCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

const DRAFT_TOPICS: BlogCategory[] = ["ai", "data", "frontend"];
const CYCLE_MS = 3200;

export function BlogHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("blog.hero");
  const tCategories = useTranslations("blog.categories");
  const { data: articles } = useArticles();
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);

  const avgRead =
    articles.length > 0
      ? Math.round(
          articles.reduce((sum, post) => sum + post.readMinutes, 0) / articles.length
        )
      : 0;

  const activeTopic = DRAFT_TOPICS[activeIndex];
  const draftText = t(`visual.drafts.${activeTopic}`);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DRAFT_TOPICS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setTypedLength(0);
    const interval = window.setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= draftText.length) return prev;
        return prev + 1;
      });
    }, 28);
    return () => window.clearInterval(interval);
  }, [draftText, activeTopic]);

  const displayed = draftText.slice(0, typedLength);

  return (
    <HeroVisualShell className={className}>
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">
            {t("visual.label")}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-glow/25 bg-glow/10 px-2.5 py-1 text-[10px] font-medium text-glow">
            <span className="size-1.5 animate-pulse rounded-full bg-glow" />
            {t("visual.status")}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-[#0d1117] shadow-inner">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="size-2.5 rounded-full bg-[#ffd93d]" />
            <span className="size-2.5 rounded-full bg-[#6bcb77]" />
            <span className="ml-2 font-mono text-[10px] text-white/40">{t("visual.fileName")}</span>
          </div>

          <div className="space-y-3 p-4 font-mono text-[11px] leading-relaxed md:p-5 md:text-xs">
            <p className="text-white/30">
              <span className="text-glow/70">#</span> {tCategories(activeTopic)}
            </p>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeTopic}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[3.25rem] text-white/85"
              >
                <span className="text-glow/60">{">"}</span> {displayed}
                <motion.span
                  className="ml-0.5 inline-block h-4 w-0.5 bg-glow"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              </motion.p>
            </AnimatePresence>

            <div className="space-y-1.5 border-t border-white/10 pt-3">
              {DRAFT_TOPICS.map((topic, index) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
                    index === activeIndex
                      ? "bg-glow/10 text-glow"
                      : "text-white/35 hover:bg-white/5 hover:text-white/55"
                  )}
                >
                  <FileText className="size-3 shrink-0" />
                  <span className="truncate">{t(`visual.drafts.${topic}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { label: t("visual.stats.articles"), value: String(articles.length) },
            { label: t("visual.stats.topics"), value: String(DRAFT_TOPICS.length) },
            { label: t("visual.stats.avgRead"), value: `${avgRead}m` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 text-center backdrop-blur-sm"
            >
              <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </HeroVisualShell>
  );
}
