"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { scaleIn } from "@/lib/animations";

interface HeroVisualShellProps {
  children: ReactNode;
  className?: string;
}

export function HeroVisualShell({ children, className }: HeroVisualShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 24 });

  const layerX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const layerY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  function updateGlowPosition(clientX: number, clientY: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.setProperty("--mouse-x", `${x}%`);
    glowRef.current.style.setProperty("--mouse-y", `${y}%`);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    updateGlowPosition(e.clientX, e.clientY);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
    glowRef.current?.style.setProperty("--mouse-x", "50%");
    glowRef.current?.style.setProperty("--mouse-y", "50%");
  }

  return (
    <motion.div
      ref={containerRef}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className={cn("relative mx-auto w-full max-w-[520px] lg:max-w-none", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="relative w-full">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/30 shadow-2xl shadow-glow/8 backdrop-blur-sm md:rounded-[2.5rem]">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70 [--mouse-x:50%] [--mouse-y:50%]"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at var(--mouse-x) var(--mouse-y), color-mix(in oklab, var(--glow) 22%, transparent), transparent 65%)",
            }}
          />

          <div className="relative p-5 md:p-7">
            <motion.div style={{ x: layerX, y: layerY }}>{children}</motion.div>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/4 size-28 rounded-full glow-orb blur-3xl"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -left-4 size-36 rounded-full glow-orb blur-3xl opacity-40"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </motion.div>
  );
}
