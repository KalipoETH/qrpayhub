import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/pix-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "PIX FAQ – 25 Questions About Brazil's Payment System | QRPayHub",
    description:
      'Everything about PIX: PIX keys, QR code format, transaction limits, CRC16 checksum and how to receive payments.',
    keywords: [
      'pix faq',
      'pix questions',
      'pix qr code help',
      'chave pix explained',
      'banco central brasil pix guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/pix/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'PIX QR',  item: 'https://qrpayhub.com/en/pix' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',     item: 'https://qrpayhub.com/en/pix/faq' },
  ],
};

export default function PIXFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-pix-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-pix-faq-breadcrumb"
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
          { label: 'PIX QR', href: '/pix' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          PIX FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from PIX keys and QR code format to transaction limits,
          CRC16 checksum and fraud protection.
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-emerald-900">Still have questions?</p>
          <p className="text-sm text-emerald-700 mt-0.5">
            Or ready to generate your first PIX QR Code?
          </p>
        </div>
        <Link
          href="/pix/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Open Generator →
        </Link>
      </div>

      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🇧🇷"
            name="PIX QR Generator"
            url="/pix/generator"
            description="Generate PIX QR codes instantly — works with all Brazilian banking apps including Nubank, Itaú, Bradesco and 700+ others. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="📖"
            name="PIX Technical Guide"
            url="/pix/guide"
            description="Deep dive into the PIX EMV payload format, CRC16 checksum, key types, BCB regulation and how the payment system works under the hood."
            badge="Guide"
            visitLabel="Read Guide →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
