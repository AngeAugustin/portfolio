"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

export function StaggerGroup({
  children,
  className,
  once = true,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
