import { BlogHeroSection } from "@/components/sections/blog-hero-section";
import { PageIntl } from "@/components/layout/page-intl";
import { BLOG_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";

const BlogPageContent = lazySection(
  () => import("@/components/sections/blog-page-content"),
  "BlogPageContent"
);

export function BlogPage() {
  return (
    <PageIntl namespaces={BLOG_MESSAGE_NAMESPACES}>
      <BlogHeroSection />
      <BlogPageContent />
    </PageIntl>
  );
}
