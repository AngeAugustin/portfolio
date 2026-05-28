import { setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/sections/contact-section";
import { ContactHeroSection } from "@/components/sections/contact-hero-section";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHeroSection />
      <ContactSection compact />
    </>
  );
}
