import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/girocode-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'GiroCode FAQ – All Questions Answered | QRPayHub',
    description:
      'Frequently asked questions about GiroCode: how it works, which banks support it, security and technical details.',
    keywords: ['girocode faq', 'epc qr code questions', 'girocode help', 'sepa qr faq'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/girocode/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'GiroCode', item: 'https://qrpayhub.com/en/girocode' },
    { '@type': 'ListItem', position: 3, name: 'FAQ', item: 'https://qrpayhub.com/en/girocode/faq' },
  ],
};

export default function GiroCodeFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-faq-breadcrumb"
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
          { label: 'Home', href: '/' },
          { label: 'GiroCode', href: '/girocode' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          GiroCode FAQ
        </h1>
        <p className="text-lg text-slate-500">
          Everything you need to know about GiroCode — from basics to technical details.
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-blue-900">Still have questions?</p>
          <p className="text-sm text-blue-700 mt-0.5">
            Or ready to generate your first GiroCode?
          </p>
        </div>
        <Link
          href="/girocode/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Open Generator →
        </Link>
      </div>

      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🧾"
            name="GiroCode Generator"
            url="https://www.girocodegenerator.com"
            description="Specialized GiroCode tool for freelancers and small businesses. Generate professional invoice PDFs with embedded GiroCode QR codes – free, no registration required."
            badge="Free"
            visitLabel="Visit Tool →"
          />
          <RelatedToolCard
            icon="⚡"
            name="QRPayHub Generator"
            url="/girocode/generator"
            description="Quick GiroCode generation without invoice PDF. Also supports 15+ other payment standards worldwide."
            badge="Free"
            visitLabel="Visit Tool →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
