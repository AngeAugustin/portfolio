import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePageMeta } from "@/lib/page-meta";
import { PageIntl } from "@/components/layout/page-intl";
import { BLOG_DETAIL_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";
import { siteConfig } from "@/lib/site";
import { localePath } from "@/lib/seo-config";
import { trackArticleView, useArticle } from "@/lib/cms";
import { useLocale, useTranslations } from "@/i18n/context";

const BlogDetailView = lazySection(
  () => import("@/components/sections/blog-detail-view"),
  "BlogDetailView"
);

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const { data: article, loading, fromCms } = useArticle(slug);

  useEffect(() => {
    if (!article || !fromCms || loading) return;
    void trackArticleView(article.slug, locale);
  }, [article, fromCms, loading, locale]);

  usePageMeta({
    title: article ? `${article.title} | ${siteConfig.name}` : undefined,
    description: article?.excerpt,
    ogTitle: article ? `${article.title} | ${siteConfig.name}` : undefined,
    ogDescription: article?.excerpt,
    ogType: "article",
    image: article?.image,
    breadcrumbs: article
      ? [
          { name: tNav("home"), path: localePath(locale, "") },
          { name: tNav("blog"), path: localePath(locale, "/blog") },
          {
            name: article.title,
            path: localePath(locale, `/blog/${article.slug}`),
          },
        ]
      : undefined,
  });

  if (loading) {
    return (
      <div className="editorial-container flex min-h-[50vh] items-center justify-center pt-32">
        <div className="size-8 animate-pulse rounded-full bg-secondary" />
      </div>
    );
  }

  if (!article) {
    return <Navigate to={`/${locale}/blog`} replace />;
  }

  return (
    <PageIntl namespaces={BLOG_DETAIL_MESSAGE_NAMESPACES}>
      <BlogDetailView article={article} />
    </PageIntl>
  );
}
