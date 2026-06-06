import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/duitnow-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "DuitNow FAQ – 25 Questions About Malaysian Payments | QRPayHub",
    description:
      "Everything about DuitNow: how it works, DuitNow ID types, transaction limits, ASEAN cross-border payments and the EMV QR code format.",
    keywords: ['duitnow faq', 'duitnow questions', 'paynet duitnow faq', 'duitnow qr guide', 'malaysia instant payment faq'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',       item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'DuitNow QR', item: 'https://qrpayhub.com/en/duitnow' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',        item: 'https://qrpayhub.com/en/duitnow/faq' },
  ],
};

export default function DuitNowFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-duitnow-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-duitnow-faq-breadcrumb"
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
          { label: 'Home',       href: '/' },
          { label: 'DuitNow QR', href: '/duitnow' },
          { label: 'FAQ' },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          DuitNow FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from DuitNow ID types and transaction limits to ASEAN cross-border payments and QR format.
        </p>
      </header>

      <Accordion items={FAQ_ITEMS} />

      <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: '#fff5f5', borderWidth: 1, borderStyle: 'solid', borderColor: '#fecaca' }}>
        <div>
          <p className="font-semibold" style={{ color: '#7f1d1d' }}>Still have questions?</p>
          <p className="text-sm mt-0.5" style={{ color: '#991b1b' }}>
            Or ready to generate your first DuitNow QR Code?
          </p>
        </div>
        <Link
          href="/duitnow/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#CC0001' }}
        >
          Open Generator →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="⚡"
            name="DuitNow Generator"
            url="/duitnow/generator"
            description="Generate DuitNow QR codes instantly — works with Maybank, CIMB, Touch 'n Go, Boost and all DuitNow-enabled apps. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="🇮🇩"
            name="QRIS Generator"
            url="/qris/generator"
            description="Generate QRIS QR codes for Indonesian payments — works with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS apps."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
