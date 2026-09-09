"use client";

import { Brain, Code2, Database, Server, type LucideIcon } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { useServices } from "@/lib/cms";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  fullstack: Code2,
  "ai-integration": Brain,
  "api-backend": Server,
  "data-engineering": Database,
};

function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_ICONS[slug] ?? Code2;
}

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("services");
  const { data: services, loading } = useServices();
  const displayedServices = compact ? services : services.slice(0, 3);

  return (
    <section className="relative overflow-x-clip px-5 py-20 sm:px-8 md:py-24 lg:px-12">
      {/* Soft mint wash - mirrors DBDump Why section (no tiled grid) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#f7fbf8] dark:bg-[color-mix(in_oklab,var(--glow)_12%,var(--background))]" />
        <div className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-glow/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {!compact ? (
          <ScrollReveal className="relative mb-12">
            <SectionWatermark text={t("label")} />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-glow">
                {t("label")}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-pretty text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-pretty text-lg text-muted-foreground">
              {t("cardsIntro")}
            </p>
          </ScrollReveal>
        )}

        {loading && displayedServices.length === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(compact ? [0, 1, 2, 3] : [0, 1, 2]).map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedServices.map((service, index) => {
              const Icon = getServiceIcon(service.slug);

              return (
                <ScrollReveal key={service.slug} delay={index * 0.07}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 text-[#102c27] shadow-sm transition-colors duration-300 hover:border-glow/50 dark:bg-card dark:text-card-foreground"
                  >
                    <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#102c27] dark:text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#102c27]/70 dark:text-muted-foreground">
                      {service.summary}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {!compact && (
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-medium text-glow transition-colors hover:text-foreground"
            >
              {t("viewAll")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
