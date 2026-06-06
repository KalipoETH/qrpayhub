import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const removedLocales = ['fr', 'es', 'pt', 'hi', 'id', 'th', 'vi', 'tl', 'ar', 'it', 'nl', 'pl'];
    const paths = [
      '', '/girocode', '/girocode/generator', '/girocode/guide', '/girocode/faq',
      '/swiss-qr', '/swiss-qr/generator', '/swiss-qr/guide', '/swiss-qr/faq',
      '/upi', '/upi/generator', '/upi/guide', '/upi/faq',
      '/pix', '/pix/generator', '/pix/guide', '/pix/faq',
      '/promptpay', '/promptpay/generator', '/promptpay/guide', '/promptpay/faq',
      '/qris', '/qris/generator',
      '/fps', '/fps/generator',
      '/vietqr', '/vietqr/generator',
      '/duitnow', '/duitnow/generator',
      '/paynow', '/paynow/generator',
      '/contact', '/impressum', '/datenschutz',
    ];

    const redirects = [];
    for (const locale of removedLocales) {
      for (const path of paths) {
        redirects.push({
          source: `/${locale}${path}`,
          destination: `/en${path}`,
          permanent: true,
        });
      }
    }
    return redirects;
  },
};

export default withNextIntl(nextConfig);
