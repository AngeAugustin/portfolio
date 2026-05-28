"use client";

import { motion } from "framer-motion";

interface TerminalCardProps {
  lines: string[];
}

export function TerminalCard({ lines }: TerminalCardProps) {
  return (
    <motion.div
      className="glass w-full rounded-2xl border-glow/15 p-4 shadow-lg shadow-glow/5 md:p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-glow/80" />
      </div>
      <div className="space-y-1.5 font-mono text-[11px] leading-relaxed md:text-xs">
        {lines.map((line, i) => (
          <motion.p
            key={`${line}-${i}`}
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
          >
            <span className="text-glow/80">{">"}</span> {line}
            {i === lines.length - 1 && (
              <motion.span
                className="ml-0.5 inline-block h-3.5 w-[2px] bg-glow align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
