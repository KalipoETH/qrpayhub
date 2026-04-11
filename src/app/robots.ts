import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/' },
    sitemap: 'https://www.qrpayhub.com/sitemap.xml',
  };
}
