const BASE_URL = 'https://www.qrpayhub.com';

const LOCALES = [
  'en', 'de', 'fr', 'es', 'pt', 'hi', 'id', 'th', 'vi', 'tl', 'ar', 'it', 'nl', 'pl',
] as const;

type PageDef = {
  path: string;
  priority: number;
  changeFreq: string;
};

const PAGES: PageDef[] = [
  // Homepage
  { path: '',                      priority: 1.0, changeFreq: 'daily' },

  // GiroCode (Phase 1 – live)
  { path: '/girocode',             priority: 0.8, changeFreq: 'weekly' },
  { path: '/girocode/generator',   priority: 0.9, changeFreq: 'weekly' },
  { path: '/girocode/guide',       priority: 0.7, changeFreq: 'monthly' },
  { path: '/girocode/faq',         priority: 0.7, changeFreq: 'monthly' },

  // Swiss QR (Phase 1 – live)
  { path: '/swiss-qr',             priority: 0.8, changeFreq: 'weekly' },
  { path: '/swiss-qr/generator',   priority: 0.9, changeFreq: 'weekly' },
  { path: '/swiss-qr/guide',       priority: 0.7, changeFreq: 'monthly' },
  { path: '/swiss-qr/faq',         priority: 0.7, changeFreq: 'monthly' },

  // UPI (Phase 1 – live)
  { path: '/upi',                  priority: 0.8, changeFreq: 'weekly' },
  { path: '/upi/generator',        priority: 0.9, changeFreq: 'weekly' },
  { path: '/upi/guide',            priority: 0.7, changeFreq: 'monthly' },
  { path: '/upi/faq',              priority: 0.7, changeFreq: 'monthly' },

  // PIX (Phase 1 – live)
  { path: '/pix',                  priority: 0.8, changeFreq: 'weekly' },
  { path: '/pix/generator',        priority: 0.9, changeFreq: 'weekly' },
  { path: '/pix/guide',            priority: 0.7, changeFreq: 'monthly' },
  { path: '/pix/faq',              priority: 0.7, changeFreq: 'monthly' },

  // PromptPay (Phase 1 – live)
  { path: '/promptpay',            priority: 0.8, changeFreq: 'weekly' },
  { path: '/promptpay/generator',  priority: 0.9, changeFreq: 'weekly' },
  { path: '/promptpay/guide',      priority: 0.7, changeFreq: 'monthly' },
  { path: '/promptpay/faq',        priority: 0.7, changeFreq: 'monthly' },
];

export async function GET() {
  const lastmod = new Date().toISOString();
  const urlEntries: string[] = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const loc      = `${BASE_URL}/${locale}${page.path}`;
      const xdefault = `${BASE_URL}/en${page.path}`;

      const langLinks = [
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xdefault}"/>`,
        ...LOCALES.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${page.path}"/>`,
        ),
      ].join('\n');

      urlEntries.push(
        [
          '  <url>',
          `    <loc>${loc}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>${page.changeFreq}</changefreq>`,
          `    <priority>${page.priority.toFixed(1)}</priority>`,
          langLinks,
          '  </url>',
        ].join('\n'),
      );
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntries.join('\n'),
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
