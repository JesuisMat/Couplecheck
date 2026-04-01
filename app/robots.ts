import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://couplecheck.app') || 'https://couplecheck.app';

export default function robots(): MetadataRoute.Robots {
  const privateRoutes = ['/api/', '/fr/result/', '/en/result/', '/fr/checkout/', '/en/checkout/'];

  return {
    rules: [
      // AI crawlers — autorisés sur les pages publiques
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'Googlebot-Extended'],
        allow: '/',
        disallow: privateRoutes,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: privateRoutes,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
