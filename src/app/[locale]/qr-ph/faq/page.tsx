import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/qrph-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'QR Ph FAQ – 25 Questions About Philippine Payments | QRPayHub',
    description:
      'Everything about QR Ph: how InstaPay works, proxy types, GCash vs QR Ph, transaction limits, BSP standards and financial inclusion in the Philippines.',
    keywords: [
      'qr ph faq',
      'qr ph questions',
      'instapay qr help',
      'gcash qr ph',
      'philippine payment faq',
      'bsp qr code guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'QR Ph', item: 'https://qrpayhub.com/en/qr-ph' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',   item: 'https://qrpayhub.com/en/qr-ph/faq' },
  ],
};

export default function QRPhFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-qrph-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-qrph-faq-breadcrumb"
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
          { label: 'Home',  href: '/' },
          { label: 'QR Ph', href: '/qr-ph' },
          { label: 'FAQ' },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          QR Ph FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from InstaPay and proxy types to GCash, Maya and financial inclusion in the Philippines.
        </p>
      </header>

      <Accordion items={FAQ_ITEMS} />

      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
      >
        <div>
          <p className="font-semibold" style={{ color: '#1e3a5f' }}>Still have questions?</p>
          <p className="text-sm mt-0.5" style={{ color: '#1e40af' }}>
            Or ready to generate your first QR Ph Code?
          </p>
        </div>
        <Link
          href="/qr-ph/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#0038A8' }}
        >
          Open Generator →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🇵🇭"
            name="QR Ph Generator"
            url="/qr-ph/generator"
            description="Generate QR Ph codes instantly — works with GCash, Maya, BDO, BPI and all InstaPay apps. Free, no registration."
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
