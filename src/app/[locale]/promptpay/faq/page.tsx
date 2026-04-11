import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/promptpay-faq';

export const metadata: Metadata = {
  title: "PromptPay FAQ – 25 Questions About Thai Payments | QRPayHub",
  description:
    'Everything about PromptPay: keys, QR format, ASEAN connections, transaction limits and how to receive payments in Thailand.',
  keywords: [
    'promptpay faq',
    'promptpay questions',
    'thai qr payment help',
    'promptpay key types',
    'bank of thailand promptpay guide',
  ],
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
    { '@type': 'ListItem', position: 2, name: 'PromptPay QR',  item: 'https://qrpayhub.com/en/promptpay' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',           item: 'https://qrpayhub.com/en/promptpay/faq' },
  ],
};

export default function PromptPayFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-promptpay-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-promptpay-faq-breadcrumb"
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
          { label: 'PromptPay QR', href: '/promptpay' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          PromptPay FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from PromptPay keys and QR format to ASEAN cross-border
          payments, transaction limits and phone number normalization.
        </p>
      </header>

      {/* Accordion */}
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-blue-900">Still have questions?</p>
          <p className="text-sm text-blue-700 mt-0.5">
            Or ready to generate your first PromptPay QR Code?
          </p>
        </div>
        <Link
          href="/promptpay/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: '#1A56DB' }}
        >
          Open Generator →
        </Link>
      </div>

      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="🇹🇭"
            name="PromptPay QR Generator"
            url="/promptpay/generator"
            description="Generate PromptPay QR codes instantly — works with all Thai banking apps including KBank, SCB, Bangkok Bank and 30+ others. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="📖"
            name="PromptPay Technical Guide"
            url="/promptpay/guide"
            description="Deep dive into the PromptPay EMV payload format, phone number normalization, ASEAN cross-border connections and how the payment system works."
            badge="Guide"
            visitLabel="Read Guide →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
