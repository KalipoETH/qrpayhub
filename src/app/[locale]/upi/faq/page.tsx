import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/upi-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "UPI FAQ – 25 Questions About India's Payment System | QRPayHub",
    description:
      'Everything about UPI: how it works, UPI IDs, transaction limits, international expansion and QR code format.',
    keywords: ['upi faq', 'upi questions', 'unified payments interface help', 'upi qr faq', 'npci upi guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/upi/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'UPI QR', item: 'https://qrpayhub.com/en/upi' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/upi/faq' },
  ],
};

export default function UPIFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-upi-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-upi-faq-breadcrumb"
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

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home',   href: '/' },
          { label: 'UPI QR', href: '/upi' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          UPI FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from UPI IDs and transaction limits to global expansion and QR format.
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-orange-900">Still have questions?</p>
          <p className="text-sm text-orange-700 mt-0.5">
            Or ready to generate your first UPI QR Code?
          </p>
        </div>
        <Link
          href="/upi/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Open Generator →
        </Link>
      </div>

      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="⚡"
            name="UPI QR Generator"
            url="/upi/generator"
            description="Generate UPI QR codes instantly — works with PhonePe, Google Pay, Paytm, BHIM and all UPI apps. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="🇨🇭"
            name="Swiss QR Code Generator"
            url="/swiss-qr/generator"
            description="Generate Swiss QR Codes (QR-Rechnung) for invoices and payments in Switzerland and Liechtenstein."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
