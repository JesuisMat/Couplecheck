import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {},
  async redirects() {
    return [
      // Redirige la racine vers /fr (locale par défaut)
      // Supprimé quand la landing plateforme / sera indexée en SEO
      {
        source: "/",
        destination: "/fr/quiz",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
