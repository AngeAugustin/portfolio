import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PageIntl } from "@/components/layout/page-intl";
import { PageSeo } from "@/components/seo/page-seo";
import { SERVICES_MESSAGE_NAMESPACES } from "@/i18n/client-messages";

export function ServicesPage() {
  return (
    <PageIntl namespaces={SERVICES_MESSAGE_NAMESPACES}>
      <PageSeo page="services" />
      <ServicesHeroSection />
      <ServicesSection compact />
    </PageIntl>
  );
}
