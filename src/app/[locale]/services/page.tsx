import { setRequestLocale } from "next-intl/server";
import { ServicesSection } from "@/components/sections/services-section";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";

type Props = { params: Promise<{ locale: string }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHeroSection />
      <div className="bg-forest text-forest-foreground">
        <ServicesSection compact />
      </div>
    </>
  );
}
