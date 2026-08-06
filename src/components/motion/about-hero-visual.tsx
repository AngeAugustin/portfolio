"use client";

import { useTranslations } from "@/i18n/context";
import { HeroVisualShell } from "@/components/motion/hero-visual-shell";
import { TerminalCard } from "@/components/motion/terminal-card";

const TERMINAL_LINES = ["line1", "line2", "line3"] as const;

export function AboutHeroVisual({ className }: { className?: string }) {
  const t = useTranslations("about.hero");
  const terminalLines = TERMINAL_LINES.map((key) => t(`terminal.${key}`));

  return (
    <HeroVisualShell className={className}>
      <TerminalCard lines={terminalLines} />
    </HeroVisualShell>
  );
}
