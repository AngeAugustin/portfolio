import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/skills",
        destination: "/:locale/about#skills",
        permanent: true,
      },
      {
        source: "/:locale/journey",
        destination: "/:locale#journey",
        permanent: true,
      },
      {
        source: "/:locale/experience",
        destination: "/:locale/about#experience",
        permanent: true,
      },
      {
        source: "/:locale/resume",
        destination: "/:locale/about#resume",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
