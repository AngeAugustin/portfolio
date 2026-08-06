"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";
import { siteConfig } from "@/lib/site";

export function ContactHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("contact.hero");

  const items = [
    { icon: Mail, label: t("emailLabel"), value: siteConfig.email },
    { icon: MapPin, label: t("locationLabel"), value: siteConfig.location },
    { icon: Clock, label: t("responseLabel"), value: t("responseTime") },
  ] as const;

  return (
    <HeroVisualShell className={className}>
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">
            {t("visualLabel")}
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

        <motion.div
          className="glass rounded-2xl border-glow/15 p-4 shadow-lg shadow-glow/5 md:p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
        >
          <div className="space-y-3">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 px-3.5 py-3"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-glow/20 bg-glow/10 text-glow">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 break-all text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            className="mt-4 rounded-xl border border-glow/10 bg-glow/5 px-3 py-2.5 text-center text-[11px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {t("hint")}
          </motion.p>
        </motion.div>
      </div>
    </HeroVisualShell>
  );
}
