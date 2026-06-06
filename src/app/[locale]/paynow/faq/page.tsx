import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FAQ_ITEMS } from '@/lib/standards/paynow-faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "PayNow FAQ – 25 Questions About Singapore Payments | QRPayHub",
    description:
      "Everything about PayNow: proxy types, transaction limits, SGQR, cross-border links to DuitNow and PromptPay, and the EMV QR code format.",
    keywords: ['paynow faq', 'paynow questions', 'singapore payment faq', 'sgqr faq', 'paynow guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'PayNow', item: 'https://qrpayhub.com/en/paynow' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/paynow/faq' },
  ],
};

export default function PayNowFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-paynow-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_FAQ) }}
      />
      <Script
        id="json-ld-paynow-faq-breadcrumb"
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
          { label: 'PayNow', href: '/paynow' },
          { label: 'FAQ' },
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          PayNow FAQ
        </h1>
        <p className="text-lg text-slate-500">
          25 questions answered — from proxy types and SGQR to cross-border payments with Malaysia, Thailand and India.
        </p>
      </header>

      <Accordion items={FAQ_ITEMS} />

      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-red-900">Still have questions?</p>
          <p className="text-sm text-red-700 mt-0.5">Or ready to generate your first PayNow QR Code?</p>
        </div>
        <Link
          href="/paynow/generator"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Open Generator →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RelatedToolCard
            icon="⚡"
            name="PayNow Generator"
            url="/paynow/generator"
            description="Generate PayNow QR codes instantly — works with DBS, OCBC, UOB, GrabPay, Singtel Dash and all Singapore payment apps. Free, no registration."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
          <RelatedToolCard
            icon="🇲🇾"
            name="DuitNow Generator"
            url="/duitnow/generator"
            description="Generate DuitNow QR codes for Malaysian payments — connected to PayNow via ASEAN cross-border linkage."
            badge="Free"
            visitLabel="Open Generator →"
            external={false}
          />
        </div>
      </section>
    </div>
  );
}
