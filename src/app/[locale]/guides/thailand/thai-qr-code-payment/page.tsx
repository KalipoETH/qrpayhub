import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Thai QR Code Payment – How QR Payments Work in Thailand 2026';
const TITLE_DE = 'Thai QR-Code-Zahlung – Wie QR-Zahlungen in Thailand funktionieren 2026';
const DESC_EN =
  "Thailand's QR payment system explained. PromptPay Thai QR codes work with 50+ apps. Learn the technical details and how to generate or scan Thai QR codes.";
const DESC_DE =
  'Das thailändische QR-Zahlungssystem erklärt. PromptPay Thai-QR-Codes funktionieren mit über 50 Apps. Lerne die technischen Details und wie man Thai-QR-Codes erstellt oder scannt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['thai qr code payment', 'thai qr standard', 'emv qr thailand', 'promptpay technical', 'thailand qr payment logo'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/thai-qr-code-payment'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/thai-qr-code-payment', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const QR_TYPES = [
  { type: 'Static QR', typeDe: 'Statischer QR', useEn: 'Merchant display', useDe: 'Anzeige beim Händler', amountEn: 'No preset', amountDe: 'Kein Festbetrag', reusable: true },
  { type: 'Dynamic QR', typeDe: 'Dynamischer QR', useEn: 'Specific invoice', useDe: 'Bestimmte Rechnung', amountEn: 'Preset', amountDe: 'Festbetrag', reusable: false },
  { type: 'Personal QR', typeDe: 'Persönlicher QR', useEn: 'P2P transfer', useDe: 'P2P-Überweisung', amountEn: 'No preset', amountDe: 'Kein Festbetrag', reusable: true },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/thailand/thai-qr-code-payment' },
};

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Thai QR Code',
  description: 'Generate a spec-compliant Thai PromptPay QR code',
  step: [
    { '@type': 'HowToStep', text: 'Open the PromptPay QR generator' },
    { '@type': 'HowToStep', text: 'Enter your phone number or national ID' },
    { '@type': 'HowToStep', text: 'Optionally enter a fixed amount for a dynamic QR' },
    { '@type': 'HowToStep', text: 'Download or display the generated QR code' },
  ],
};

export default function ThaiQrCodePaymentPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-thai-qr-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-thai-qr-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
          { label: 'Thailand', href: '/guides/thailand' },
          { label: locale === 'de' ? 'Thai QR-Code-Zahlung' : 'Thai QR Code Payment' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Thai QR-Code-Zahlung' : 'Thai QR Code Payment'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de' ? 'Wie QR-basierte Zahlungen in Thailand funktionieren' : 'How QR-based payments work in Thailand'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* System overview */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? "Thailands QR-Zahlungssystem" : "Thailand's QR Payment System"}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            {locale === 'de' ? (
              <>
                <p>
                  Die Bank of Thailand und die thailändische Bankenvereinigung schufen PromptPay 2017 als nationale
                  QR-Zahlungsinfrastruktur. Sie basiert auf dem <strong>EMV-QR-Standard</strong> – demselben
                  Grundformat, das auch PIX (Brasilien) und QRIS (Indonesien) verwenden.
                </p>
                <p>
                  Der entscheidende Vorteil: <strong>Ein einziger QR-Code funktioniert mit allen thailändischen
                  Banking-Apps.</strong> Ob ein Kunde KBank, SCB, Bangkok Bank oder eine der über 30 teilnehmenden
                  Banken nutzt – derselbe gedruckte Aufkleber am Verkaufstresen funktioniert für jeden.
                </p>
                <p>Über 55 Millionen registrierte Nutzer verwenden das System täglich für private Transfers und Zahlungen.</p>
              </>
            ) : (
              <>
                <p>
                  The Bank of Thailand and the Thai Bankers&apos; Association created PromptPay in 2017 as the
                  country&apos;s national QR payment infrastructure. It is based on the <strong>EMV QR standard</strong> —
                  the same underlying format used by PIX (Brazil) and QRIS (Indonesia).
                </p>
                <p>
                  The key advantage: <strong>one QR code works with every Thai banking app.</strong> Whether a
                  customer uses KBank, SCB, Bangkok Bank or any of the 30+ participating banks, the same printed
                  sticker at the counter works for all of them.
                </p>
                <p>Over 55 million registered users rely on the system daily for personal transfers and payments.</p>
              </>
            )}
          </div>
        </section>

        {/* Technical standard */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Der Thai-QR-Zahlungsstandard (technisch)' : 'The Thai QR Payment Standard (Technical)'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Für technisch interessierte Leser: PromptPay folgt dem EMV Merchant Presented QR (MPM) Standard.'
              : 'For more tech-savvy readers: PromptPay follows the EMV Merchant Presented QR (MPM) standard.'}
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
            <li><strong>{locale === 'de' ? 'Standard' : 'Standard'}:</strong> EMV Merchant Presented QR (MPM)</li>
            <li><strong>AID:</strong> <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">A000000677010111</code></li>
            <li><strong>{locale === 'de' ? 'Währungscode' : 'Currency code'}:</strong> 764 (THB)</li>
            <li>CRC16-CCITT {locale === 'de' ? 'Prüfsumme' : 'checksum'}</li>
            <li>{locale === 'de' ? 'Telefonnummer-Normalisierung' : 'Phone normalization'}: 0812345678 → 0066812345678</li>
          </ul>
          <pre className="bg-slate-900 text-blue-300 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`000201
010211
2937
0016A000000677010111
0113006812345678
52040000
5303764
5802TH
5903N/A
6007Bangkok
6304XXXX`}
          </pre>
        </section>

        {/* Logo */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Das Thai-QR-Logo – worauf zu achten ist' : 'Thai QR Payment Logo – What to Look For'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Touristen sollten nach folgenden Merkmalen am Verkaufstresen suchen:'
              : 'Tourists should look for the following features at the merchant counter:'}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2"><span>🔴⚪</span><span>{locale === 'de' ? 'Rot-weißes Logo' : 'Red and white logo'}</span></li>
            <li className="flex gap-2"><span>🔤</span><span>{locale === 'de' ? 'Text: "Thai QR Payment"' : 'Text: "Thai QR Payment"'}</span></li>
            <li className="flex gap-2"><span>🏷️</span><span>{locale === 'de' ? 'Zeigt zusätzlich das PromptPay-Logo' : 'Also shows the PromptPay logo'}</span></li>
            <li className="flex gap-2"><span>📍</span><span>{locale === 'de' ? 'Auf Aufklebern am Verkaufstresen zu finden' : 'Found on stickers at merchant counters'}</span></li>
          </ul>
        </section>

        {/* QR types table */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'QR-Code-Typen in Thailand' : 'QR Code Types in Thailand'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Typ', 'Anwendungsfall', 'Betrag', 'Wiederverwendbar']
                    : ['Type', 'Use Case', 'Amount', 'Reusable']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {QR_TYPES.map((row) => (
                  <tr key={row.type} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-blue-700">{locale === 'de' ? row.typeDe : row.type}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.useDe : row.useEn}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.amountDe : row.amountEn}</td>
                    <td className="px-4 py-3 text-slate-600">{row.reusable ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Erstelle einen Thai-QR-Code' : 'Generate a Thai QR Code'}
          </p>
          <Link
            href="/promptpay/generator"
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
              icon="📖"
              name={locale === 'de' ? 'Wie man PromptPay benutzt' : 'How to Use PromptPay'}
              url="/guides/thailand/how-to-use-promptpay"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'Thai QR scannen' : 'Scan Thai QR Code Guide'}
              url="/guides/thailand/scan-thai-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
