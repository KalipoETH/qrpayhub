import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Use PromptPay in Thailand 2026 – Step-by-Step Guide';
const TITLE_DE = 'Wie man PromptPay in Thailand benutzt 2026 – Schritt-für-Schritt-Anleitung';
const DESC_EN =
  'Step-by-step guide to using PromptPay in Thailand. Learn how to send money, receive payments and scan QR codes with Thai banking apps.';
const DESC_DE =
  'Schritt-für-Schritt-Anleitung zur Nutzung von PromptPay in Thailand. Lerne, wie du Geld sendest, Zahlungen empfängst und QR-Codes mit thailändischen Banking-Apps scannst.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['how to use promptpay', 'promptpay tutorial', 'send money thailand', 'scan promptpay qr', 'promptpay guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/how-to-use-promptpay'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/how-to-use-promptpay', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const SEND_STEPS_EN = [
  'Open your Thai banking app',
  'Tap "Transfer" or "โอนเงิน"',
  'Select "PromptPay" as transfer type',
  "Enter recipient's phone number or national ID",
  'Enter amount in Thai Baht',
  'Review recipient name (bank shows it automatically)',
  'Confirm with PIN or biometric',
  'Transfer complete – instant!',
];
const SEND_STEPS_DE = [
  'Öffne deine thailändische Banking-App',
  'Tippe auf "Transfer" oder "โอนเงิน"',
  'Wähle "PromptPay" als Überweisungsart',
  'Gib die Telefonnummer oder nationale ID des Empfängers ein',
  'Gib den Betrag in Thai Baht ein',
  'Prüfe den angezeigten Namen des Empfängers (wird automatisch angezeigt)',
  'Bestätige mit PIN oder Biometrie',
  'Überweisung abgeschlossen – sofort!',
];

const SCAN_STEPS_EN = [
  'Look for the PromptPay / Thai QR Payment sticker',
  'Open your banking app',
  'Tap "Scan QR" or "สแกน QR"',
  'Point camera at the QR code',
  'Amount shown (or enter manually)',
  'Confirm merchant name',
  'Enter PIN / use fingerprint',
  'Done! Merchant receives notification',
];
const SCAN_STEPS_DE = [
  'Suche nach dem PromptPay- oder "Thai QR Payment"-Aufkleber',
  'Öffne deine Banking-App',
  'Tippe auf "QR scannen" oder "สแกน QR"',
  'Richte die Kamera auf den QR-Code',
  'Betrag wird angezeigt (oder manuell eingeben)',
  'Bestätige den Händlernamen',
  'PIN eingeben / Fingerabdruck nutzen',
  'Fertig! Der Händler erhält eine Benachrichtigung',
];

const RECEIVE_STEPS_EN = [
  'Open banking app',
  'Tap "Receive" or "รับเงิน"',
  'Your personal PromptPay QR appears',
  'Let the sender scan it',
  'Money arrives instantly',
];
const RECEIVE_STEPS_DE = [
  'Öffne die Banking-App',
  'Tippe auf "Empfangen" oder "รับเงิน"',
  'Dein persönlicher PromptPay-QR-Code erscheint',
  'Lass den Absender ihn scannen',
  'Das Geld kommt sofort an',
];

const PROBLEMS = [
  { en: ['"PromptPay not found"', "Recipient hasn't registered"], de: ['"PromptPay nicht gefunden"', 'Empfänger hat sich nicht registriert'] },
  { en: ['Wrong recipient shown', 'Double-check the phone number'], de: ['Falscher Empfänger angezeigt', 'Telefonnummer noch einmal prüfen'] },
  { en: ['Transfer limit reached', 'Contact your bank to increase it'], de: ['Überweisungslimit erreicht', 'Kontaktiere deine Bank zur Erhöhung'] },
  { en: ["App won't scan QR", 'Clean the camera lens, use better lighting'], de: ['App scannt QR nicht', 'Kameralinse reinigen, bessere Beleuchtung nutzen'] },
];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: [...SEND_STEPS_EN, ...SCAN_STEPS_EN, ...RECEIVE_STEPS_EN].map((text) => ({
    '@type': 'HowToStep',
    text,
  })),
};

const JSON_LD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                  item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'Guides',                 item: 'https://qrpayhub.com/en/guides' },
    { '@type': 'ListItem', position: 3, name: 'Thailand',               item: 'https://qrpayhub.com/en/guides/thailand' },
    { '@type': 'ListItem', position: 4, name: 'How to Use PromptPay',   item: 'https://qrpayhub.com/en/guides/thailand/how-to-use-promptpay' },
  ],
};

export default function HowToUsePromptPayPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-howto-promptpay" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
      <Script id="json-ld-howto-promptpay-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }} />
      <PageContent locale={locale} />
    </>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((text, i) => (
        <li key={i} className="flex gap-4">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {i + 1}
          </div>
          <p className="text-sm text-slate-700 pt-1">{text}</p>
        </li>
      ))}
    </ol>
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
          { label: locale === 'de' ? 'PromptPay benutzen' : 'How to Use PromptPay' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man PromptPay benutzt' : 'How to Use PromptPay'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? "Thailands offizielles Echtzeit-Zahlungssystem – Schritt für Schritt erklärt"
            : "Thailand's official instant payment system – explained step by step"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* What is PromptPay */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Was ist PromptPay?' : 'What is PromptPay?'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de' ? (
              <>
                PromptPay (พร้อมเพย์) ist Thailands nationale Infrastruktur für Echtzeit-Überweisungen, betrieben von
                der Bank of Thailand und der thailändischen Bankenvereinigung. Statt Kontonummern zu teilen, registrieren
                Nutzer eine Telefonnummer oder nationale ID und verknüpfen sie mit ihrem Bankkonto. Wer mehr über das
                technische EMV-Format und die ASEAN-Verbindungen erfahren möchte, findet das im{' '}
                <Link href="/promptpay" className="text-blue-700 font-medium hover:underline">vollständigen PromptPay-Guide</Link>.
              </>
            ) : (
              <>
                PromptPay (พร้อมเพย์) is Thailand&apos;s national instant payment infrastructure, run by the Bank of
                Thailand and the Thai Bankers&apos; Association. Instead of sharing account numbers, users register a
                phone number or National ID and link it to their bank account. For the technical EMV format and ASEAN
                connections, see the{' '}
                <Link href="/promptpay" className="text-blue-700 font-medium hover:underline">full PromptPay guide</Link>.
              </>
            )}
          </p>
        </section>

        {/* Send money */}
        <section className="space-y-4 scroll-mt-20" id="send-money">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie man Geld mit PromptPay sendet' : 'How to Send Money with PromptPay'}
          </h2>
          <StepList steps={locale === 'de' ? SEND_STEPS_DE : SEND_STEPS_EN} />
        </section>

        {/* Pay at merchant */}
        <section className="space-y-4 scroll-mt-20" id="pay-merchant">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie man bei einem Händler bezahlt (QR scannen)' : 'How to Pay at a Merchant (Scan QR)'}
          </h2>
          <StepList steps={locale === 'de' ? SCAN_STEPS_DE : SCAN_STEPS_EN} />
        </section>

        {/* Receive payments */}
        <section className="space-y-4 scroll-mt-20" id="receive-payments">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie man Zahlungen empfängt (eigenen QR zeigen)' : 'How to Receive Payments (Show Your QR)'}
          </h2>
          <StepList steps={locale === 'de' ? RECEIVE_STEPS_DE : RECEIVE_STEPS_EN} />
        </section>

        {/* Phone vs National ID */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PromptPay: Telefonnummer vs. nationale ID' : 'PromptPay Phone Numbers vs National ID'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['', 'Telefonnummer', 'Nationale ID']
                    : ['', 'Phone Number', 'National ID']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: locale === 'de' ? 'Privatsphäre' : 'Privacy', a: locale === 'de' ? 'Geringer' : 'Lower', b: locale === 'de' ? 'Höher' : 'Higher' },
                  { label: locale === 'de' ? 'Einfaches Teilen' : 'Ease of sharing', a: locale === 'de' ? 'Einfach' : 'Easy', b: locale === 'de' ? 'Sicherer' : 'More secure' },
                  { label: locale === 'de' ? 'Wer nutzt es' : 'Who uses it', a: locale === 'de' ? 'Die meisten Nutzer' : 'Most people', b: locale === 'de' ? 'Datenschutzbewusste' : 'Privacy-focused' },
                  { label: locale === 'de' ? 'Touristen nutzbar' : 'Tourist can use', a: locale === 'de' ? '❌ (braucht TH-Nummer)' : '❌ (needs TH number)', b: locale === 'de' ? '❌ (braucht TH-ID)' : '❌ (needs TH ID)' },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.label}</td>
                    <td className="px-4 py-3 text-slate-600">{row.a}</td>
                    <td className="px-4 py-3 text-slate-600">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Problems & solutions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Häufige PromptPay-Probleme & Lösungen' : 'Common PromptPay Problems & Solutions'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de' ? ['Problem', 'Lösung'] : ['Problem', 'Solution']).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROBLEMS.map((row) => {
                  const [problem, solution] = locale === 'de' ? row.de : row.en;
                  return (
                    <tr key={problem} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{problem}</td>
                      <td className="px-4 py-3 text-slate-600">{solution}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bereit, deinen PromptPay QR-Code zu erstellen?' : 'Ready to generate your PromptPay QR Code?'}
          </p>
          <Link
            href="/promptpay/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        {/* Related */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {locale === 'de' ? 'Mehr zu Thailand' : 'Related in Thailand'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="📱"
              name={locale === 'de' ? 'Thai QR-Code-Zahlung' : 'Thai QR Code Payment'}
              url="/guides/thailand/thai-qr-code-payment"
              description={locale === 'de' ? 'Wie der Thai-QR-Standard technisch funktioniert' : 'How the Thai QR payment standard works technically'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🌍"
              name={locale === 'de' ? 'PromptPay für Ausländer' : 'PromptPay for Foreigners'}
              url="/guides/thailand/promptpay-for-foreigners"
              description={locale === 'de' ? 'Wie Expats PromptPay registrieren können' : 'How expats can register PromptPay'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'Thai QR scannen' : 'How to Scan Thai QR Code'}
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
