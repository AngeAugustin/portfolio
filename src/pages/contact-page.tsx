import { ContactHeroSection } from "@/components/sections/contact-hero-section";
import { PageIntl } from "@/components/layout/page-intl";
import { CONTACT_MESSAGE_NAMESPACES } from "@/i18n/client-messages";
import { lazySection } from "@/lib/lazy-section";

const ContactSection = lazySection(
  () => import("@/components/sections/contact-section"),
  "ContactSection"
);

export function ContactPage() {
  return (
    <PageIntl namespaces={CONTACT_MESSAGE_NAMESPACES}>
      <ContactHeroSection />
      <ContactSection compact />
    </PageIntl>
  );
}
