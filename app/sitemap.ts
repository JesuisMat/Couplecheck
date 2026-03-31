import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://couplecheck.app') || 'https://couplecheck.app';

const locales = ['fr', 'en'] as const;

const staticPages: Array<{ path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '',          priority: 1.0, changeFreq: 'weekly'  },
  { path: '/quiz',     priority: 0.9, changeFreq: 'monthly' },
  { path: '/privacy',  priority: 0.3, changeFreq: 'yearly'  },
  { path: '/cgv',      priority: 0.3, changeFreq: 'yearly'  },
  { path: '/legal',    priority: 0.3, changeFreq: 'yearly'  },
  { path: '/contact',  priority: 0.4, changeFreq: 'yearly'  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
      });
    }
  }

  return entries;
}
