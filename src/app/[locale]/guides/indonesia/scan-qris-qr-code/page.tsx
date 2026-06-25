import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Scan a QRIS QR Code – Step-by-Step Guide 2026';
const TITLE_DE = 'Wie man einen QRIS-QR-Code scannt – Schritt-für-Schritt-Guide 2026';
const DESC_EN =
  'Learn how to scan QRIS payment codes with your banking app. Works with PayNow, DuitNow, PromptPay, UPI and GoPay/OVO. Step-by-step with screenshots.';
const DESC_DE =
  'Lerne, wie du QRIS-Zahlungscodes mit deiner Banking-App scannst. Funktioniert mit PayNow, DuitNow, PromptPay, UPI und GoPay/OVO. Schritt für Schritt erklärt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['scan qris qr code', 'paynow scan indonesia', 'duitnow scan indonesia', 'upi scan indonesia', 'gopay scan'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/scan-qris-qr-code'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/scan-qris-qr-code', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

const COMPAT = [
  { flag: 'sg', en: 'Use PayNow / GrabPay', de: 'Nutze PayNow / GrabPay' },
  { flag: 'my', en: 'Use DuitNow / Touch n Go', de: 'Nutze DuitNow / Touch n Go' },
  { flag: 'th', en: 'Use PromptPay banking apps', de: 'Nutze PromptPay-Banking-Apps' },
  { flag: 'in', en: 'Use PhonePe / Google Pay / Paytm', de: 'Nutze PhonePe / Google Pay / Paytm' },
  { flag: 'jp', en: 'Use a JCB QR compatible app', de: 'Nutze eine JCB-QR-kompatible App' },
  { flag: 'cn', en: 'Use Alipay / WeChat Pay', de: 'Nutze Alipay / WeChat Pay' },
];

const GOPAY_STEPS_EN = [
  'Open GoPay (or OVO/Dana)',
  'Tap "Bayar" (Pay) or "Scan"',
  'Allow camera access if prompted',
  "Point your camera at the merchant's QRIS code",
  'Wait for the app to recognize the code (1–2 seconds)',
  'Review: merchant name and amount shown',
  'Confirm the amount is correct (IDR)',
  'Tap "Bayar" / "Confirm"',
  'Authenticate: PIN or fingerprint',
  '✅ Payment complete! Keep a screenshot as receipt',
];
const GOPAY_STEPS_DE = [
  'Öffne GoPay (oder OVO/Dana)',
  'Tippe auf "Bayar" (Bezahlen) oder "Scan"',
  'Erlaube den Kamerazugriff, falls gefragt',
  'Richte die Kamera auf den QRIS-Code des Händlers',
  'Warte, bis die App den Code erkennt (1–2 Sekunden)',
  'Prüfe: Händlername und Betrag werden angezeigt',
  'Bestätige, dass der Betrag korrekt ist (IDR)',
  'Tippe auf "Bayar" / "Bestätigen"',
  'Authentifiziere dich: PIN oder Fingerabdruck',
  '✅ Zahlung abgeschlossen! Behalte einen Screenshot als Quittung',
];

const PAYNOW_STEPS_EN = [
  'Open your Singapore banking app (DBS, OCBC, UOB, GrabPay)',
  'Tap "Scan" or "Pay"',
  "Point your camera at the merchant's QRIS code",
  'Confirm the merchant name and amount in SGD-converted IDR',
  'Authenticate with PIN or fingerprint',
  '✅ Payment complete!',
];
const PAYNOW_STEPS_DE = [
  'Öffne deine Singapur-Banking-App (DBS, OCBC, UOB, GrabPay)',
  'Tippe auf "Scan" oder "Pay"',
  'Richte die Kamera auf den QRIS-Code des Händlers',
  'Bestätige Händlername und Betrag in SGD-umgerechnetem IDR',
  'Authentifiziere dich mit PIN oder Fingerabdruck',
  '✅ Zahlung abgeschlossen!',
];

const UPI_STEPS_EN = [
  'Open PhonePe, Google Pay or Paytm',
  'Tap "Scan QR"',
  "Point your camera at the merchant's QRIS code",
  'Confirm the merchant name and amount in INR-converted IDR',
  'Enter your UPI PIN',
  '✅ Payment complete!',
];
const UPI_STEPS_DE = [
  'Öffne PhonePe, Google Pay oder Paytm',
  'Tippe auf "QR scannen"',
  'Richte die Kamera auf den QRIS-Code des Händlers',
  'Bestätige Händlername und Betrag in INR-umgerechnetem IDR',
  'Gib deine UPI-PIN ein',
  '✅ Zahlung abgeschlossen!',
];

const TROUBLESHOOT = [
  { en: ['"QRIS tidak valid"', 'QR code damaged, ask for a new code'], de: ['"QRIS tidak valid"', 'QR-Code beschädigt, neuen Code anfordern'] },
  { en: ["Camera won't focus", 'Move closer, ensure good lighting'], de: ['Kamera fokussiert nicht', 'Näher heran, für gute Beleuchtung sorgen'] },
  { en: ['"Merchant not found"', 'Cross-border not enabled at this merchant'], de: ['"Merchant not found"', 'Grenzüberschreitend ist bei diesem Händler nicht aktiviert'] },
  { en: ['Amount not shown', 'Static QR – enter the amount manually'], de: ['Betrag nicht angezeigt', 'Statischer QR – Betrag manuell eingeben'] },
  { en: ['App crashes', 'Update your banking or wallet app'], de: ['App stürzt ab', 'Banking- oder Wallet-App aktualisieren'] },
];

const ALL_STEPS = [...GOPAY_STEPS_EN, ...PAYNOW_STEPS_EN, ...UPI_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function ScanQrisQrCodePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-scan-qris" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
            className="flex-shrink-0 w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {i + 1}
          </div>
          <p className="text-sm text-slate-700 pt-0.5">{text}</p>
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
          { label: 'Indonesia', href: '/guides/indonesia' },
          { label: locale === 'de' ? 'QRIS scannen' : 'Scan QRIS' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man einen QRIS-QR-Code scannt' : 'How to Scan a QRIS QR Code'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de' ? 'Bezahle bei indonesischen Händlern in Sekunden' : 'Pay at Indonesian merchants in seconds'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Compatibility check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Vor dem Start – Kompatibilitätscheck' : 'Before You Start – Compatibility Check'}
          </h2>
          <p className="text-slate-600 text-[15px]">
            {locale === 'de' ? '"Aus welchem Land kommst du?"' : '"Which country are you from?"'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPAT.map(({ flag, en, de }) => (
              <div key={flag} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span className="text-green-600">✅</span>
                <Flag code={flag} />
                <span className="text-sm text-slate-700">{locale === 'de' ? de : en}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span>⚙️</span>
            <span className="text-sm text-slate-600">
              {locale === 'de'
                ? 'Andere Länder → GoPay oder OVO mit internationaler Karte nutzen'
                : 'Other countries → use GoPay or OVO with an international card'}
            </span>
          </div>
        </section>

        {/* GoPay / OVO */}
        <section className="space-y-4 scroll-mt-20" id="gopay">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Scannen mit GoPay / OVO' : 'Step-by-Step: Scanning with GoPay / OVO'}
          </h2>
          <StepList steps={locale === 'de' ? GOPAY_STEPS_DE : GOPAY_STEPS_EN} />
        </section>

        {/* PayNow */}
        <section className="space-y-4 scroll-mt-20" id="paynow">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Scannen mit PayNow (Singapur)' : 'Step-by-Step: Scanning with PayNow (Singapore)'}
          </h2>
          <StepList steps={locale === 'de' ? PAYNOW_STEPS_DE : PAYNOW_STEPS_EN} />
        </section>

        {/* UPI */}
        <section className="space-y-4 scroll-mt-20" id="upi">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Scannen mit UPI (Indien)' : 'Step-by-Step: Scanning with UPI (India)'}
          </h2>
          <StepList steps={locale === 'de' ? UPI_STEPS_DE : UPI_STEPS_EN} />
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Was tun, wenn der QR-Code nicht scannt?' : "What if the QR Code Doesn't Scan?"}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de' ? ['Problem', 'Lösung'] : ['Problem', 'Fix']).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TROUBLESHOOT.map((row) => {
                  const [problem, fix] = locale === 'de' ? row.de : row.en;
                  return (
                    <tr key={problem} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{problem}</td>
                      <td className="px-4 py-3 text-slate-600">{fix}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recognition */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'QRIS-Code-Erkennung' : 'QRIS Code Recognition'}
          </h2>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Suche nach dem offiziellen QRIS-Logo (rot)' : 'Look for the official QRIS logo (red)'}</li>
            <li>• {locale === 'de' ? 'Text "QRIS" steht meist über oder unter dem Code' : 'The text "QRIS" usually appears above or below the code'}</li>
            <li>• {locale === 'de' ? 'Immer am Verkaufstresen oder auf einem Aufkleber' : 'Always at the merchant counter / on a sticker'}</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides/indonesia"
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 text-blue-800 hover:bg-blue-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? '← Zurück zum Indonesien-Guide' : '← Back to Indonesia Guide'}
            </Link>
            <Link
              href="/qris/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: '#1A56DB' }}
            >
              {locale === 'de' ? 'QRIS Generator →' : 'QRIS Generator →'}
            </Link>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indonesien' : 'Related in Indonesia'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📱"
              name={locale === 'de' ? 'Indonesien QR-Zahlung' : 'Indonesia QR Code Payment'}
              url="/guides/indonesia/indonesia-qr-code-payment"
              description={locale === 'de' ? 'Wie der QRIS-Standard technisch funktioniert' : 'How the QRIS standard works technically'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'QRIS Tourist Guide'}
              url="/guides/indonesia/qris-tourist-guide"
              description={locale === 'de' ? 'Können Touristen QRIS nutzen?' : 'Can tourists use QRIS?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
