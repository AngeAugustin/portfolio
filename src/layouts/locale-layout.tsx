import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { IntlProvider } from "@/i18n/context";
import { loadMessages } from "@/i18n/messages";
import { isLocale, routing, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { siteConfig } from "@/lib/site";
import { useDocumentLang, usePageMeta } from "@/lib/page-meta";

export function LocaleLayout() {
  const { locale: localeParam } = useParams<{ locale: string }>();

  if (!localeParam || !isLocale(localeParam)) {
    return <Navigate to={`/${routing.defaultLocale}`} replace />;
  }

  return <LocaleShell locale={localeParam} />;
}

function LocaleShell({ locale }: { locale: Locale }) {
  const [messages, setMessages] = useState<Awaited<ReturnType<typeof loadMessages>> | null>(
    null
  );

  useEffect(() => {
    let active = true;
    loadMessages(locale).then((loaded) => {
      if (active) setMessages(loaded);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  useDocumentLang(locale);

  const meta = messages?.meta as { title: string; description: string } | undefined;

  usePageMeta({
    title: meta?.title,
    description: meta?.description,
    ogTitle: meta?.title,
    ogDescription: meta?.description,
  });

  if (!messages) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-pulse rounded-full bg-primary/20" />
      </div>
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              jobTitle: siteConfig.title,
              url: siteConfig.url,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cotonou",
                addressCountry: "BJ",
              },
              sameAs: Object.values(siteConfig.social),
            }),
          }}
        />
        <Navbar />
        <main className="overflow-x-clip">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </ThemeProvider>
    </IntlProvider>
  );
}
