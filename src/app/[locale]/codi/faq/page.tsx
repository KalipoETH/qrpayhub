import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/codi-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'CoDi FAQ – 25 Questions About Mexican Payments | QRPayHub',
    description:
      'Everything about CoDi: how SPEI works, CLABE validation, required fields, CoDi vs DiMo, transaction limits and Banxico\'s role in Mexican digital payments.',
    keywords: [
      'codi faq',
      'codi questions',
      'cobro digital help',
      'clabe validation',
      'spei codi guide',
      'banxico digital payments',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'CoDi', item: 'https://qrpayhub.com/en/codi' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',  item: 'https://qrpayhub.com/en/codi/faq' },
  ],
};

export default function CoDiFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-codi-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-codi-faq-breadcrumb"
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
          { label: 'Home', href: '/' },
          { label: 'CoDi', href: '/codi' },
          { label: 'FAQ' },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          CoDi FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from CLABE validation and SPEI to DiMo, Mercado Pago and Mexico&apos;s digital payment evolution.
        </p>
      </header>

      <Accordion items={FAQ_ITEMS} />

      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
      >
        <div>
          <p className="font-semibold" style={{ color: '#14532d' }}>Still have questions?</p>
          <p className="text-sm mt-0.5" style={{ color: '#166534' }}>
            Or ready to generate your first CoDi QR Code?
          </p>
        </div>
        <Link
          href="/codi/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#006847' }}
        >
          Open Generator →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🇲🇽"
            name="CoDi QR Generator"
            url="/codi/generator"
            description="Generate CoDi QR codes instantly — works with all Mexican banks via SPEI. Free, CLABE validation included."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="🇧🇷"
            name="PIX QR Generator"
            url="/pix/generator"
            description="Generate PIX QR codes for Brazilian instant payments — the most used payment system in Latin America."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
