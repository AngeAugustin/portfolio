import { Navigate, useParams } from "react-router-dom";
import { usePageMeta } from "@/lib/page-meta";
import { PageIntl } from "@/components/layout/page-intl";
import { SERVICE_DETAIL_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";
import { siteConfig } from "@/lib/site";
import { useService } from "@/lib/cms";
import { useLocale } from "@/i18n/context";

const ServiceDetailView = lazySection(
  () => import("@/components/sections/service-detail-view"),
  "ServiceDetailView"
);

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { data: service, loading } = useService(slug);

  usePageMeta({
    title: service ? `${service.title} | ${siteConfig.name}` : undefined,
    description: service?.summary,
    ogTitle: service ? `${service.title} | ${siteConfig.name}` : undefined,
    ogDescription: service?.summary,
  });

  if (loading) {
    return (
      <div className="editorial-container flex min-h-[50vh] items-center justify-center pt-32">
        <div className="size-8 animate-pulse rounded-full bg-secondary" />
      </div>
    );
  }

  if (!service) {
    return <Navigate to={`/${locale}/services`} replace />;
  }

  return (
    <PageIntl namespaces={SERVICE_DETAIL_MESSAGE_NAMESPACES}>
      <ServiceDetailView service={service} />
    </PageIntl>
  );
}
