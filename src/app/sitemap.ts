import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://qrpayhub.com';
const LOCALES = routing.locales;

type SitemapEntry = MetadataRoute.Sitemap[number];

type PageDef = {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry['changeFrequency'];
};

const PAGES: PageDef[] = [
  // Homepage
  { path: '',                      priority: 1.0, changeFrequency: 'daily' },

  // GiroCode cluster (Phase 1 – fully live)
  { path: '/girocode',             priority: 0.8, changeFrequency: 'weekly' },
  { path: '/girocode/generator',   priority: 0.9, changeFrequency: 'weekly' },
  { path: '/girocode/guide',       priority: 0.7, changeFrequency: 'monthly' },
  { path: '/girocode/faq',         priority: 0.7, changeFrequency: 'monthly' },

  // Swiss QR (Phase 1 – live)
  { path: '/swiss-qr',             priority: 0.8, changeFrequency: 'weekly' },
  { path: '/swiss-qr/generator',   priority: 0.9, changeFrequency: 'weekly' },

  // UPI (Phase 1 – live)
  { path: '/upi',                  priority: 0.8, changeFrequency: 'weekly' },
  { path: '/upi/generator',        priority: 0.9, changeFrequency: 'weekly' },

  // PIX (Phase 1 – live)
  { path: '/pix',                  priority: 0.8, changeFrequency: 'weekly' },
  { path: '/pix/generator',        priority: 0.9, changeFrequency: 'weekly' },

  // PromptPay (Phase 1)
  { path: '/promptpay',            priority: 0.8, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${page.path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
