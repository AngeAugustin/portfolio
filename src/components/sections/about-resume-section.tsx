"use client";

import { Download, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function AboutResumeSection() {
  const t = useTranslations("about.resume");
  const locale = useLocale();
  const resumeUrl =
    siteConfig.resumeFiles[locale as keyof typeof siteConfig.resumeFiles] ??
    siteConfig.resumeFiles.en;
  const fileName = resumeUrl.split("/").pop() ?? "resume.pdf";

  return (
    <section id="resume" className="scroll-mt-28 border-t border-border/60 pb-24 pt-16 md:pt-20">
      <div className="editorial-container">
        <SectionHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <ScrollReveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border/80 bg-card/40 p-8 text-center backdrop-blur-sm md:p-10">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 text-glow">
              <FileText className="size-7" strokeWidth={1.5} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t("hint")}</p>
            <Button asChild className="mt-8 gap-2">
              <a href={resumeUrl} download={fileName}>
                <Download className="size-4" />
                {t("download")}
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
