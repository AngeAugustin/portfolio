import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServiceDetailView } from "@/components/sections/service-detail-view";
import { routing } from "@/i18n/routing";
import { services, siteConfig, type ServiceSlug } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Service" };
  }

  const messages = (await import(`../../../../../messages/${locale}.json`)).default;
  const detail = messages.serviceDetails[slug as ServiceSlug] as {
    title: string;
    summary: string;
  };

  return {
    title: detail.title,
    description: detail.summary,
    openGraph: {
      title: `${detail.title} | ${siteConfig.name}`,
      description: detail.summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  setRequestLocale(locale);
  await getTranslations("services.detail");

  return <ServiceDetailView slug={service.slug} />;
}
