"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import { tools } from "@/lib/site";

export function TechStackSection() {
  const t = useTranslations("techStack");
  const duplicated = [...tools, ...tools];

  return (
    <section className="section-padding overflow-hidden border-y border-border/60 bg-secondary/20">
      <div className="editorial-container mb-12">
        <SectionHeader label={t("label")} title={t("title")} align="center" className="mb-0" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max items-center gap-5 md:gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
          }}
        >
          {duplicated.map((tool, i) => (
            <div
              key={`${tool.src}-${i}`}
              className="glass flex h-20 w-28 shrink-0 items-center justify-center rounded-2xl px-5 py-4 md:h-24 md:w-36"
              title={tool.name}
            >
              <Image
                src={tool.src}
                alt={tool.name}
                width={96}
                height={56}
                className="h-10 w-auto max-w-[80px] object-contain md:h-12 md:max-w-[96px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
