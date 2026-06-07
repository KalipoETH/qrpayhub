import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/vietqr-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'VietQR FAQ – 25 Questions About Vietnamese Payments | QRPayHub',
    description:
      'Everything about VietQR: how it works, Bank BINs, account name rules, supported apps, transaction limits and Vietnam\'s cashless payment vision.',
    keywords: [
      'vietqr faq',
      'vietqr questions',
      'vietnam qr payment help',
      'napas bank bin',
      'vietqr guide',
      'vietnamese banking qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/faq'),
  };
}

const JSON_LD_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

const JSON_LD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'VietQR', item: 'https://qrpayhub.com/en/vietqr' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/vietqr/faq' },
  ],
};

export default function VietQRFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-vietqr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-vietqr-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Breadcrumb
        items={[
          { label: 'Home',   href: '/' },
          { label: 'VietQR', href: '/vietqr' },
          { label: 'FAQ' },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          VietQR FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from Bank BINs and account name rules to MoMo, ZaloPay and Vietnam&apos;s cashless payment vision.
        </p>
      </header>

      <Accordion items={FAQ_ITEMS} />

      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: '#fff5f5', border: '1px solid #fca5a5' }}
      >
        <div>
          <p className="font-semibold" style={{ color: '#9b1c1c' }}>Still have questions?</p>
          <p className="text-sm mt-0.5" style={{ color: '#b91c1c' }}>
            Or ready to generate your first VietQR Code?
          </p>
        </div>
        <Link
          href="/vietqr/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#DA251D' }}
        >
          Open Generator →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🇻🇳"
            name="VietQR Generator"
            url="/vietqr/generator"
            description="Generate VietQR codes instantly — works with all Vietnamese banks and e-wallets including MoMo and ZaloPay. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="🇮🇩"
            name="QRIS Generator"
            url="/qris/generator"
            description="Generate QRIS QR codes for Indonesian payments — compatible with GoPay, OVO, Dana and all QRIS apps."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
