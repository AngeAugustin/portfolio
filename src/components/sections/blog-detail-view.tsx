"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blurReveal, staggerContainer, staggerItem } from "@/lib/animations";
import { useArticles, type CmsArticle } from "@/lib/cms";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
  CmsArticle["category"],
  string
> = {
  ai: "text-glow border-glow/30 bg-glow/10",
  data: "text-glow border-forest/30 bg-forest/10",
  frontend: "text-foreground border-border bg-accent/60",
};

function formatDate(date: string, locale: string) {
  const [year, month] = date.split("-");
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function ArticleBody({ article }: { article: CmsArticle }) {
  if (article.content) {
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(article.content);
    if (looksLikeHtml) {
      return (
        <div
          className="article-prose mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg [&_a]:text-glow [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      );
    }

    return (
      <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
        {article.content
          .split(/\n\n+/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
      </div>
    );
  }

  if (article.sections && article.sections.length > 0) {
    return (
      <div className="mx-auto max-w-3xl space-y-12">
        {article.sections.map((section) => (
          <section key={section.heading || section.paragraphs[0]}>
            {section.heading ? (
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {section.heading}
              </h2>
            ) : null}
            <div className={cn("space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg", section.heading && "mt-5")}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
      {stripHtml(article.excerpt)}
    </p>
  );
}

interface BlogDetailViewProps {
  article: CmsArticle;
}

export function BlogDetailView({ article }: BlogDetailViewProps) {
  const t = useTranslations("blog");
  const tDetail = useTranslations("blog.detail");
  const locale = useLocale();
  const { data: articles } = useArticles();
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_25%_15%,#000_15%,transparent_70%)]"
        />
        <GradientOrb className="-left-24 top-8 opacity-55" size="480px" />
        <GradientOrb className="right-0 top-1/4 opacity-40" size="420px" delay={2.5} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

        <div className="editorial-container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          <SectionWatermark
            text={tDetail("watermark")}
            className="top-[12%] -translate-y-0 text-[clamp(4.5rem,18vw,11rem)] text-foreground/[0.045]"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={staggerItem}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
                {tDetail("back")}
              </Link>
            </motion.div>

            <div className="mt-8 max-w-3xl">
              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    CATEGORY_STYLES[article.category]
                  )}
                >
                  {t(`categories.${article.category}`)}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {t("minRead", { minutes: article.readMinutes })}
                </span>
                <time className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {formatDate(article.date, locale)}
                </time>
              </motion.div>

              <motion.h1
                variants={blurReveal}
                className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-balance"
              >
                {article.title}
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {article.excerpt}
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
              >
                <Magnetic>
                  <Button asChild size="lg" className="group gap-2">
                    <Link href="/contact">
                      {tDetail("ctaPrimary")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button asChild size="lg" variant="outline" className="group gap-2">
                    <Link href="/blog">
                      {tDetail("ctaSecondary")}
                      <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              variants={staggerItem}
              className="relative mt-12 overflow-hidden rounded-2xl border border-border/80 bg-muted/30 shadow-[0_28px_90px_-36px_rgba(16,44,39,0.45)] sm:rounded-3xl md:mt-14"
            >
              <div className="relative aspect-[16/9] w-full">
                <OptimizedImage
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="editorial-container section-padding pt-0">
        <ScrollReveal>
          <ArticleBody article={article} />
        </ScrollReveal>

        <ScrollReveal className="mt-16 md:mt-20" delay={0.1}>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-8 py-12 text-center text-forest-foreground md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {tDetail("ctaTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-forest-foreground/75">
                {tDetail("ctaSubtitle")}
              </p>
              <Button asChild className="mt-8 gap-2" size="lg" variant="secondary">
                <Link href="/contact">
                  {tDetail("ctaButton")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {related.length > 0 ? (
          <ScrollReveal className="mt-16 md:mt-20" delay={0.15}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
                  {tDetail("relatedLabel")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {tDetail("relatedTitle")}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-glow/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        CATEGORY_STYLES[post.category]
                      )}
                    >
                      {t(`categories.${post.category}`)}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-glow">
                      {t("readArticle")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </>
  );
}
