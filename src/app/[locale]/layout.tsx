import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';
import 'flag-icons/css/flag-icons.min.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'QRPayHub – The Global QR Payment Code Hub',
  description: 'Generate QR payment codes for any country in seconds.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'QRPayHub',
  url: 'https://www.qrpayhub.com',
  description: 'The Global QR Payment Code Hub – Generate QR payment codes for any country',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.qrpayhub.com/en?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QRPayHub',
  url: 'https://www.qrpayhub.com',
  logo: 'https://www.qrpayhub.com/logo.png',
  description:
    'QRPayHub is the world\'s most comprehensive QR payment code generator, supporting 12+ payment standards across 50+ countries.',
  foundingDate: '2026',
  founder: {
    '@type': 'Person',
    name: 'Kaleb Jahnke',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'jahnke.kaleb@gmail.com',
    contactType: 'customer service',
  },
  sameAs: ['https://github.com/KalipoETH/qrpayhub'],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-slate-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
