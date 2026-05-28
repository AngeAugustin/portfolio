"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  size?: string;
  delay?: number;
}

export function GradientOrb({ className, size = "600px", delay = 0 }: GradientOrbProps) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full glow-orb blur-3xl", className)}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
