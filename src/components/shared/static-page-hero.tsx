interface StaticPageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

/** Lightweight server hero - no Framer Motion (faster dev compiles & navigation). */
export function StaticPageHero({ label, title, subtitle }: StaticPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="editorial-container relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-glow">
          {label}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
