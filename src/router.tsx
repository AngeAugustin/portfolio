import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { LocaleLayout } from "@/layouts/locale-layout";
import { routing } from "@/i18n/routing";
import { HomePage } from "@/pages/home-page";
import { AboutPage } from "@/pages/about-page";
import { ProjectsPage } from "@/pages/projects-page";
import { ProjectDetailPage } from "@/pages/project-detail-page";
import { ServicesPage } from "@/pages/services-page";
import { ServiceDetailPage } from "@/pages/service-detail-page";
import { BlogPage } from "@/pages/blog-page";
import { BlogDetailPage } from "@/pages/blog-detail-page";
import { ContactPage } from "@/pages/contact-page";
import { NotFoundPage } from "@/pages/not-found-page";

function LegacyRedirect({ hash }: { hash?: string }) {
  const { locale = routing.defaultLocale } = useParams<{ locale: string }>();
  const base = `/${locale}/about`;
  return <Navigate to={hash ? `${base}${hash}` : base} replace />;
}

function HomeLegacyRedirect({ hash }: { hash?: string }) {
  const { locale = routing.defaultLocale } = useParams<{ locale: string }>();
  const base = `/${locale}`;
  return <Navigate to={hash ? `${base}${hash}` : base} replace />;
}

export function AppRoutes() {
  const defaultLocale = routing.defaultLocale;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />

      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="skills" element={<LegacyRedirect hash="#skills" />} />
        <Route path="journey" element={<HomeLegacyRedirect hash="#journey" />} />
        <Route path="experience" element={<LegacyRedirect hash="#experience" />} />
        <Route path="resume" element={<LegacyRedirect hash="#resume" />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
    </Routes>
  );
}
