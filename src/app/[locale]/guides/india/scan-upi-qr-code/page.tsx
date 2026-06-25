import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Scan a UPI QR Code in India 2026 – Step-by-Step Guide';
const TITLE_DE = 'Wie man einen UPI-QR-Code in Indien scannt 2026 – Schritt-für-Schritt-Guide';
const DESC_EN =
  'Learn how to scan UPI QR codes in India with PhonePe, Google Pay or Paytm. Step-by-step guide with troubleshooting for tourists and residents.';
const DESC_DE =
  'Lerne, wie du UPI-QR-Codes in Indien mit PhonePe, Google Pay, Paytm oder jeder UPI-App scannst. Schritt-für-Schritt-Guide mit Tipps zur Fehlerbehebung.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['scan upi qr code', 'phonepe scan', 'google pay scan india', 'paytm scan', 'upi qr troubleshooting'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/scan-upi-qr-code'),
    openGraph: buildOpenGraph(locale, '/guides/india/scan-upi-qr-code', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const PHONEPE_STEPS_EN = [
  'Open the PhonePe app',
  'Tap the blue "Scan" button (home screen)',
  'Allow camera access',
  "Point at the merchant's UPI QR code",
   'The app reads the QR code (1–2 seconds)',
  'Verify: merchant name shown',
  'Amount shown or enter manually',
  'Tap "Pay"',
  'Enter your 6-digit UPI PIN',
  '✅ "Payment Successful" confirmation',
];
const PHONEPE_STEPS_DE = [
  'Öffne die PhonePe-App',
  'Tippe auf den blauen "Scan"-Button (Startbildschirm)',
  'Erlaube den Kamerazugriff',
  'Richte die Kamera auf den UPI-QR-Code des Händlers',
  'Die App liest den QR-Code (1–2 Sekunden)',
  'Prüfe: Händlername wird angezeigt',
  'Betrag wird angezeigt oder manuell eingeben',
  'Tippe auf "Pay"',
  'Gib deine 6-stellige UPI-PIN ein',
  '✅ Bestätigung "Payment Successful"',
];

const GPAY_STEPS_EN = [
  'Open Google Pay',
  'Tap "Scan any QR code"',
  "Point at the merchant's UPI QR code",
  'Verify the merchant name and amount',
  'Tap "Pay"',
  'Enter your UPI PIN',
  '✅ Payment complete!',
];
const GPAY_STEPS_DE = [
  'Öffne Google Pay',
  'Tippe auf "QR-Code scannen"',
  'Richte die Kamera auf den UPI-QR-Code des Händlers',
  'Prüfe Händlername und Betrag',
  'Tippe auf "Pay"',
  'Gib deine UPI-PIN ein',
  '✅ Zahlung abgeschlossen!',
];

const PAYTM_STEPS_EN = [
  'Open Paytm',
  'Tap "Scan & Pay"',
  "Point at the merchant's UPI QR code",
  'Verify the merchant name and amount',
  'Tap "Pay"',
  'Enter your UPI PIN',
  '✅ Payment complete!',
];
const PAYTM_STEPS_DE = [
  'Öffne Paytm',
  'Tippe auf "Scan & Pay"',
  'Richte die Kamera auf den UPI-QR-Code des Händlers',
  'Prüfe Händlername und Betrag',
  'Tippe auf "Pay"',
  'Gib deine UPI-PIN ein',
  '✅ Zahlung abgeschlossen!',
];

const TROUBLESHOOT = [
  { en: ['"App not installed"', 'Download it from the Play/App Store'], de: ['"App not installed"', 'Aus dem Play/App Store herunterladen'] },
  { en: ['QR not scanning', 'Better lighting, clean the lens'], de: ['QR scannt nicht', 'Bessere Beleuchtung, Linse reinigen'] },
  { en: ['"Invalid QR code"', "Not a UPI QR – different system", ], de: ['"Invalid QR code"', 'Kein UPI-QR – anderes System'] },
  { en: ['"Payment failed"', 'Refunded automatically in 24h'], de: ['"Payment failed"', 'Wird automatisch innerhalb von 24h zurückerstattet'] },
  { en: ['Wrong amount', 'Always verify before entering the PIN'], de: ['Falscher Betrag', 'Immer vor PIN-Eingabe prüfen'] },
  { en: ['"Daily limit exceeded"', 'Use a different payment method'], de: ['"Daily limit exceeded"', 'Andere Zahlungsmethode nutzen'] },
];

const ALL_STEPS = [...PHONEPE_STEPS_EN, ...GPAY_STEPS_EN, ...PAYTM_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function ScanUpiQrCodePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-scan-upi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
          { label: 'India', href: '/guides/india' },
          { label: locale === 'de' ? 'UPI-QR scannen' : 'Scan UPI QR Code' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man einen UPI-QR-Code scannt' : 'How to Scan a UPI QR Code'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de' ? 'Bezahle bei jedem indischen Händler in Sekunden' : 'Pay at any Indian merchant in seconds'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Compatibility check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Vor dem Start' : 'Before You Start'}
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
              <span className="text-green-600">✅</span>
              <span className="text-sm text-slate-700">{locale === 'de' ? 'G20-Touristen: PhonePe / Paytm' : 'G20 tourists: PhonePe / Paytm'}</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
              <span className="text-green-600">✅</span>
              <span className="text-sm text-slate-700">{locale === 'de' ? 'Indische Einwohner: jede UPI-App' : 'Indian residents: any UPI app'}</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
              <span className="text-green-600">✅</span>
              <span className="text-sm text-slate-700">{locale === 'de' ? 'NRIs: Bank-UPI-App' : 'NRIs: Bank UPI app'}</span>
            </div>
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
              <span className="text-red-500">❌</span>
              <span className="text-sm text-red-700">
                {locale === 'de'
                  ? 'Nicht-G20-Touristen → Stattdessen Wise-Karte verwenden'
                  : 'Non-G20 tourists → Use Wise card instead'}
              </span>
            </div>
          </div>
        </section>

        {/* PhonePe */}
        <section className="space-y-4 scroll-mt-20" id="phonepe">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt mit PhonePe' : 'Step-by-Step with PhonePe'}
          </h2>
          <StepList steps={locale === 'de' ? PHONEPE_STEPS_DE : PHONEPE_STEPS_EN} />
        </section>

        {/* Google Pay */}
        <section className="space-y-4 scroll-mt-20" id="google-pay">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt mit Google Pay' : 'Step-by-Step with Google Pay'}
          </h2>
          <StepList steps={locale === 'de' ? GPAY_STEPS_DE : GPAY_STEPS_EN} />
        </section>

        {/* Paytm */}
        <section className="space-y-4 scroll-mt-20" id="paytm">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt mit Paytm' : 'Step-by-Step with Paytm'}
          </h2>
          <StepList steps={locale === 'de' ? PAYTM_STEPS_DE : PAYTM_STEPS_EN} />
        </section>

        {/* Identify */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Einen gültigen UPI-QR-Code erkennen' : 'Identify a Valid UPI QR Code'}
          </h2>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Zeigt das BHIM-UPI-Logo oder das App-Logo' : 'Shows the BHIM UPI logo or app logo'}</li>
            <li>• {locale === 'de' ? 'Hat die Anweisung "Scan & Pay"' : 'Has a "Scan & Pay" instruction'}</li>
            <li>• {locale === 'de' ? 'Zeigt den Händlernamen' : 'Shows the merchant name'}</li>
            <li>• {locale === 'de' ? 'Kann die UPI-ID anzeigen (xyz@bankname)' : 'May show the UPI ID (xyz@bankname)'}</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI-QR-Fehlerbehebung' : 'UPI QR Troubleshooting'}
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
                {TROUBLESHOOT.map((row) => {
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

        {/* After payment */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Nach erfolgreicher Zahlung' : 'After Successful Payment'}
          </h2>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Mache einen Screenshot der Bestätigung' : 'Screenshot the confirmation'}</li>
            <li>• {locale === 'de' ? 'Der Händler erhält einen sofortigen Benachrichtigungston' : 'The merchant gets an instant notification sound'}</li>
            <li>• {locale === 'de' ? 'Prüfe den UPI-App-Verlauf zur Bestätigung' : 'Check your UPI app history to confirm'}</li>
            <li>• {locale === 'de' ? 'In der Regel keine Papierquittung' : 'No paper receipt typically'}</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides/india"
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 text-blue-800 hover:bg-blue-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? '← Zurück zum Indien-Guide' : '← Back to India Guide'}
            </Link>
            <Link
              href="/upi/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: '#1A56DB' }}
            >
              {locale === 'de' ? 'UPI Generator →' : 'UPI Generator →'}
            </Link>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indien' : 'Related in India'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📊"
              name={locale === 'de' ? 'UPI-Apps im Vergleich' : 'UPI Apps Comparison'}
              url="/guides/india/upi-apps-comparison"
              description={locale === 'de' ? 'PhonePe vs Google Pay vs Paytm' : 'PhonePe vs Google Pay vs Paytm'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'UPI Touristen-Guide' : 'UPI Tourist Guide'}
              url="/guides/india/upi-tourist-guide"
              description={locale === 'de' ? 'Können Touristen UPI nutzen?' : 'Can tourists use UPI?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
