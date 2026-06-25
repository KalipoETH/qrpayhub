import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'India QR Code Payment – How UPI QR Works 2026';
const TITLE_DE = 'Indien QR-Code-Zahlung – Wie UPI-QR funktioniert 2026';
const DESC_EN =
  "India's UPI QR system processes 10+ billion monthly transactions. Learn how UPI QR codes work, the URL format and where to use them in India.";
const DESC_DE =
  'Indiens UPI-QR-Zahlungssystem verarbeitet über 10 Milliarden Transaktionen monatlich. Lerne, wie UPI-QR-Codes funktionieren, das technische Format und wo du sie nutzt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['upi qr explained', 'upi deep link', 'upi qr format', 'upi vs emv', 'static dynamic upi qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/india-qr-code-payment'),
    openGraph: buildOpenGraph(locale, '/guides/india/india-qr-code-payment', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const STATS = [
  { icon: '🔄', value: '10B+', en: 'Monthly transactions', de: 'Monatliche Transaktionen' },
  { icon: '🏦', value: '500+', en: 'Banks on network', de: 'Banken im Netzwerk' },
  { icon: '👥', value: '350M+', en: 'Active users', de: 'Aktive Nutzer' },
  { icon: '💰', value: '₹1 Lakh', en: 'Max per transaction', de: 'Maximal pro Transaktion' },
  { icon: '🌍', value: '46%', en: 'Of global real-time payments', de: 'Aller globalen Echtzeitzahlungen' },
  { icon: '✅', value: '0%', en: 'Fee for consumers', de: 'Gebühr für Verbraucher' },
];

const URL_PARAMS = [
  { param: 'pa', example: 'merchant@okhdfc', required: true },
  { param: 'pn', example: 'Raj Stores', required: true },
  { param: 'am', example: '150.00', required: false },
  { param: 'cu', example: 'INR', required: false },
  { param: 'tn', example: 'Invoice001', required: false },
  { param: 'mc', example: '5411', required: false },
  { param: 'tr', example: 'TXN001', required: false },
];

const UPI_VS_EMV = [
  { feature: 'Format', featureDe: 'Format', upi: 'URL (upi://pay?)', emv: 'TLV binary' },
  { feature: 'Standard', featureDe: 'Standard', upi: 'NPCI proprietary', emv: 'EMV international' },
  { feature: 'CRC check', featureDe: 'CRC-Prüfung', upi: '❌', emv: '✅' },
  { feature: 'Cross-border', featureDe: 'Grenzüberschreitend', upi: 'Via API', emv: 'Native' },
  { feature: 'Adoption', featureDe: 'Verbreitung', upi: 'India', emv: 'Global' },
];

const STATIC_DYNAMIC = [
  { feature: 'Amount', featureDe: 'Betrag', static: 'Not set', staticDe: 'Nicht festgelegt', dynamic: 'Pre-filled', dynamicDe: 'Vorausgefüllt' },
  { feature: 'Reference', featureDe: 'Referenz', static: 'Not set', staticDe: 'Nicht festgelegt', dynamic: 'Included', dynamicDe: 'Enthalten' },
  { feature: 'Use case', featureDe: 'Anwendungsfall', static: 'Shops, stalls', staticDe: 'Geschäfte, Stände', dynamic: 'Invoices, checkout', dynamicDe: 'Rechnungen, Checkout' },
  { feature: 'Reusable', featureDe: 'Wiederverwendbar', static: '✅', staticDe: '✅', dynamic: '❌ one-time', dynamicDe: '❌ einmalig' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india/india-qr-code-payment' },
};

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a UPI QR Code',
  description: 'Generate a UPI QR code using the upi://pay URL scheme',
  step: [
    { '@type': 'HowToStep', text: 'Obtain your UPI ID (e.g. merchant@okhdfc)' },
    { '@type': 'HowToStep', text: 'Build the URL: upi://pay?pa=<UPI_ID>&pn=<Name>&am=<Amount>&cu=INR' },
    { '@type': 'HowToStep', text: 'Encode the URL into a QR code' },
    { '@type': 'HowToStep', text: 'Display the QR code for customers to scan' },
    { '@type': 'HowToStep', text: 'Customer scans with any UPI app and enters their PIN to pay' },
  ],
};

export default function IndiaQrCodePaymentPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-india-qr-payment" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-india-qr-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'India', href: '/guides/india' },
          { label: locale === 'de' ? 'QR-Zahlung' : 'QR Code Payment' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Indien QR-Code-Zahlung' : 'India QR Code Payment'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'UPI-QR: Antrieb des größten Echtzeit-Zahlungsnetzwerks der Welt'
            : "UPI QR: powering the world's largest real-time payment network"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI in Zahlen' : 'UPI By The Numbers'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map(({ icon, value, en, de }) => (
              <div key={en} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-lg font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{locale === 'de' ? de : en}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie UPI-QR technisch funktioniert' : 'How UPI QR Works Technically'}
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
            <li><strong>{locale === 'de' ? 'Format' : 'Format'}:</strong> UPI Deep Link (<code className="font-mono bg-slate-100 px-1 rounded text-xs">upi://pay?...</code>)</li>
            <li><strong>{locale === 'de' ? 'Parameter' : 'Parameters'}:</strong> pa ({locale === 'de' ? 'Zahlungsadresse' : 'payee address'}), pn ({locale === 'de' ? 'Name' : 'name'}), am ({locale === 'de' ? 'Betrag' : 'amount'}), cu ({locale === 'de' ? 'Währung' : 'currency'}), tn ({locale === 'de' ? 'Notiz' : 'note'})</li>
            <li>{locale === 'de' ? 'Kein EMV-Format – UPI verwendet sein eigenes URL-Schema' : 'No EMV format – UPI uses its own URL scheme'}</li>
          </ul>
          <pre className="bg-slate-900 text-blue-300 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`upi://pay?pa=merchant@okhdfc&pn=Shop&am=100&cu=INR`}
          </pre>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Parameter', 'Beispiel', 'Erforderlich']
                    : ['Parameter', 'Example', 'Required']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {URL_PARAMS.map((row) => (
                  <tr key={row.param} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-blue-700">{row.param}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{row.example}</td>
                    <td className="px-4 py-3 text-slate-600">{row.required ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UPI vs EMV */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI vs. EMV-QR-Standards' : 'UPI vs EMV QR Standards'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Funktion', 'UPI-QR', 'EMV-QR (PIX/QRIS)']
                    : ['Feature', 'UPI QR', 'EMV QR (PIX/QRIS)']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UPI_VS_EMV.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.featureDe : row.feature}</td>
                    <td className="px-4 py-3 text-slate-600">{row.upi}</td>
                    <td className="px-4 py-3 text-slate-600">{row.emv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Static vs Dynamic */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Statischer vs. dynamischer UPI-QR' : 'Static vs Dynamic UPI QR'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['', 'Statisch', 'Dynamisch']
                    : ['', 'Static', 'Dynamic']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STATIC_DYNAMIC.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.featureDe : row.feature}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.staticDe : row.static}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.dynamicDe : row.dynamic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Logos */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI-QR-Logos in Indien' : 'UPI QR Logos in India'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de' ? 'Worauf zu achten ist:' : 'What to look for:'}
          </p>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'BHIM-UPI-Logo (blau)' : 'BHIM UPI logo (blue)'}</li>
            <li>• {locale === 'de' ? 'PhonePe-Logo (violett)' : 'PhonePe logo (purple)'}</li>
            <li>• {locale === 'de' ? 'Google-Pay-Logo' : 'Google Pay logo'}</li>
            <li>• {locale === 'de' ? 'Paytm-Logo' : 'Paytm logo'}</li>
            <li>• {locale === 'de' ? '"Scan & Pay"-Text in Hindi/Englisch' : '"Scan & Pay" text in Hindi/English'}</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Erstelle einen UPI-QR-Code' : 'Generate a UPI QR Code'}
          </p>
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Verwandte Guides' : 'Related'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'UPI-QR scannen' : 'How to Scan UPI QR Code'}
              url="/guides/india/scan-upi-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📊"
              name={locale === 'de' ? 'UPI-Apps im Vergleich' : 'UPI Apps Comparison'}
              url="/guides/india/upi-apps-comparison"
              description={locale === 'de' ? 'PhonePe vs Google Pay vs Paytm vs BHIM' : 'PhonePe vs Google Pay vs Paytm vs BHIM'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
