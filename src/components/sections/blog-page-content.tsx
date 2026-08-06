"use client";

import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { useTranslations, useLocale } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useArticles, type CmsArticle } from "@/lib/cms";
import type { BlogCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

const categories: (BlogCategory | "all")[] = ["all", "ai", "data", "frontend"];

const CATEGORY_STYLES: Record<
  BlogCategory,
  { accent: string; bar: string }
> = {
  ai: {
    accent: "text-glow border-glow/30 bg-glow/10",
    bar: "bg-glow",
  },
  data: {
    accent: "text-glow border-forest/30 bg-forest/10",
    bar: "bg-forest",
  },
  frontend: {
    accent: "text-foreground border-border bg-accent/60",
    bar: "bg-primary/70",
  },
};

function formatDate(date: string, locale: string) {
  const [year, month] = date.split("-");
  const formatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  return formatter.format(new Date(Number(year), Number(month) - 1));
}

function BlogCoverImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary/40", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-forest/10 to-transparent" />
    </div>
  );
}

function FeaturedPostCard({ post }: { post: CmsArticle }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const styles = CATEGORY_STYLES[post.category];

  return (
    <ScrollReveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-[2rem] border border-border/60 bg-card"
      >
        <article>
          <div className="grid md:grid-cols-2">
            <BlogCoverImage
              src={post.image}
              alt={post.title}
              priority
              className="aspect-[16/10] md:aspect-auto md:min-h-[420px]"
            />

            <div className="relative flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]",
                      styles.accent
                    )}
                  >
                    {t("featured")}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                      styles.accent
                    )}
                  >
                    {t(`categories.${post.category}`)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {t("minRead", { minutes: post.readMinutes })}
                  </span>
                </div>

                <time className="mt-6 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {formatDate(post.date, locale)}
                </time>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {post.title}
                </h2>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-glow">
                <span>{t("readArticle")}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          <div className={cn("absolute bottom-0 left-0 h-1 w-full", styles.bar)} />
        </article>
      </Link>
    </ScrollReveal>
  );
}

function PostCard({ post, index }: { post: CmsArticle; index: number }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const styles = CATEGORY_STYLES[post.category];

  return (
    <ScrollReveal delay={index * 0.08}>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-glow/30 hover:shadow-[0_20px_50px_-24px] hover:shadow-glow/30"
      >
        <article className="flex h-full flex-col">
          <BlogCoverImage src={post.image} alt={post.title} className="aspect-[16/10] w-full" />

          <div className="flex flex-1 flex-col p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                  styles.accent
                )}
              >
                {t(`categories.${post.category}`)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {t("minRead", { minutes: post.readMinutes })}
              </span>
            </div>

            <time className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {formatDate(post.date, locale)}
            </time>

            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {post.title}
            </h3>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/60 pt-5">
              <span className="text-xs text-muted-foreground">
                {formatDate(post.date, locale)}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                {t("readArticle")}
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>

          <div className={cn("absolute top-0 left-0 h-1 w-full", styles.bar)} />
        </article>
      </Link>
    </ScrollReveal>
  );
}

export function BlogPageContent() {
  const t = useTranslations("blog");
  const { data: articles, loading } = useArticles();
  const [filter, setFilter] = useState<BlogCategory | "all">("all");

  const featured = articles.find((post) => post.featured) ?? articles[0];
  const rest = featured ? articles.filter((post) => post.slug !== featured.slug) : [];
  const filteredRest =
    filter === "all" ? rest : rest.filter((post) => post.category === filter);

  return (
    <div className="editorial-container section-padding pt-0">
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              filter === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card/60 text-muted-foreground hover:border-glow/30 hover:text-foreground"
            )}
          >
            {cat === "all" ? t("filterAll") : t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {loading && articles.length === 0 ? (
        <div className="space-y-8">
          <div className="h-[320px] animate-pulse rounded-[2rem] bg-secondary/60" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-64 animate-pulse rounded-2xl bg-secondary/60" />
            <div className="h-64 animate-pulse rounded-2xl bg-secondary/60" />
            <div className="h-64 animate-pulse rounded-2xl bg-secondary/60" />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {featured && (filter === "all" || featured.category === filter) && (
            <FeaturedPostCard post={featured} />
          )}

          {filteredRest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRest.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
