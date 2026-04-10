import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/swiss-qr-faq';

export const metadata: Metadata = {
  title: 'Swiss QR Code FAQ – 25 Questions Answered | QRPayHub',
  description:
    'Frequently asked questions about Swiss QR Code: Zahlteil, reference types QRR/SCOR/NON, supported banks, technical specifications and best practices.',
  keywords: ['swiss qr code faq', 'qr rechnung fragen', 'zahlteil erklärung', 'qrr scor non', 'swiss qr hilfe'],
};

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
    { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'Swiss QR Code', item: 'https://qrpayhub.com/en/swiss-qr' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',           item: 'https://qrpayhub.com/en/swiss-qr/faq' },
  ],
};

export default function SwissQRFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-swiss-qr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-swiss-qr-faq-breadcrumb"
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
          { label: 'Home',          href: '/' },
          { label: 'Swiss QR Code', href: '/swiss-qr' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Swiss QR Code FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from the basics to Zahlteil, reference types and technical details.
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-red-900">Still have questions?</p>
          <p className="text-sm text-red-700 mt-0.5">
            Or ready to generate your first Swiss QR Code?
          </p>
        </div>
        <Link
          href="/swiss-qr/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
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
            description="For SEPA GiroCode invoices across all 36 SEPA countries. Generate professional invoice PDFs with embedded GiroCode – free, no registration required."
            badge="Free"
            visitLabel="Visit Tool →"
          />
          <RelatedToolCard
            icon="⚡"
            name="QRPayHub GiroCode Generator"
            url="/girocode/generator"
            description="Also generate GiroCodes for European SEPA payments – alongside Swiss QR and 15+ other global payment standards."
            badge="Free"
            visitLabel="Visit Tool →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
