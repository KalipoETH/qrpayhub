import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Use UPI in India 2026 – Complete Step-by-Step Guide';
const TITLE_DE = 'Wie man UPI in Indien benutzt 2026 – Komplette Schritt-für-Schritt-Anleitung';
const DESC_EN =
  'Step-by-step guide to using UPI in India. Send money, pay merchants, scan QR codes with PhonePe, Google Pay or Paytm. All UPI methods explained.';
const DESC_DE =
  'Schritt-für-Schritt-Anleitung zur Nutzung von UPI in Indien. Geld senden, Händler bezahlen, QR-Codes mit PhonePe, Google Pay oder Paytm scannen. Alle UPI-Methoden erklärt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['how to use upi', 'upi tutorial', 'phonepe tutorial', 'upi id format', 'upi pin', 'scan upi qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/how-to-use-upi'),
    openGraph: buildOpenGraph(locale, '/guides/india/how-to-use-upi', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const SCAN_STEPS_EN = [
  '👀 Look for the UPI QR code at the merchant (PhonePe/GPay/Paytm sticker)',
  '📱 Open any UPI app (PhonePe, Google Pay, Paytm, BHIM)',
  '🔲 Tap "Scan & Pay"',
  '📷 Point your camera at the QR code',
  '💰 Verify the amount (preset or enter manually)',
  '👤 Confirm the merchant name',
  '🔐 Enter your UPI PIN (6-digit)',
  '✅ Transfer complete in seconds!',
];
const SCAN_STEPS_DE = [
  '👀 Suche nach dem UPI-QR-Code beim Händler (PhonePe/GPay/Paytm-Aufkleber)',
  '📱 Öffne eine UPI-App (PhonePe, Google Pay, Paytm, BHIM)',
  '🔲 Tippe auf "Scan & Pay"',
  '📷 Richte die Kamera auf den QR-Code',
  '💰 Prüfe den Betrag (voreingestellt oder manuell eingeben)',
  '👤 Bestätige den Händlernamen',
  '🔐 Gib deine UPI-PIN ein (6-stellig)',
  '✅ Übertragung in Sekunden abgeschlossen!',
];

const UPI_ID_STEPS_EN = [
  'Open your UPI app',
  'Tap "Transfer" or "Send Money"',
  "Enter the recipient's UPI ID (e.g., name@okicici)",
  'Verify the name shown',
  'Enter the amount',
  'Enter your UPI PIN',
  'Done!',
];
const UPI_ID_STEPS_DE = [
  'Öffne deine UPI-App',
  'Tippe auf "Transfer" oder "Send Money"',
  'Gib die UPI-ID des Empfängers ein (z. B. name@okicici)',
  'Prüfe den angezeigten Namen',
  'Gib den Betrag ein',
  'Gib deine UPI-PIN ein',
  'Fertig!',
];

const UPI_ID_TABLE = [
  { id: 'name@okicici', bank: 'ICICI via third-party' },
  { id: 'number@paytm', bank: 'Paytm Payments Bank' },
  { id: 'name@ybl', bank: 'PhonePe (Yes Bank)' },
  { id: 'name@oksbi', bank: 'Google Pay (SBI)' },
  { id: 'name@upi', bank: 'BHIM' },
  { id: 'name@axl', bank: 'Axis Bank' },
  { id: 'name@hdfcbank', bank: 'HDFC Bank' },
  { id: 'name@ibl', bank: 'IndusInd Bank' },
];

const PROBLEMS = [
  { en: ['"Invalid UPI ID"', 'Check spelling, use the correct handle'], de: ['"Invalid UPI ID"', 'Schreibweise prüfen, richtiges Handle nutzen'] },
  { en: ['"Transaction failed"', 'Usually refunded within 24h'], de: ['"Transaction failed"', 'Wird meist innerhalb von 24h zurückerstattet'] },
  { en: ['"Limit exceeded"', '₹1 Lakh per transaction max'], de: ['"Limit exceeded"', 'Maximal ₹1 Lakh pro Transaktion'] },
  { en: ['"Bank server down"', 'Try again or use a different app'], de: ['"Bank server down"', 'Erneut versuchen oder andere App nutzen'] },
  { en: ['PIN forgotten', 'Reset it in your banking app'], de: ['PIN vergessen', 'In der Banking-App zurücksetzen'] },
];

const ALL_STEPS = [...SCAN_STEPS_EN, ...UPI_ID_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function HowToUseUpiPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-howto-upi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
          { label: 'India', href: '/guides/india' },
          { label: locale === 'de' ? 'UPI benutzen' : 'How to Use UPI' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man UPI in Indien benutzt' : 'How to Use UPI in India'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? "Indiens beliebteste Zahlungsmethode – einfach erklärt"
            : "India's most popular payment method – explained simply"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Method 1 */}
        <section className="space-y-4 scroll-mt-20" id="scan-qr">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 1: Händler-QR-Code scannen' : 'Method 1: Scan Merchant QR Code'}
          </h2>
          <StepList steps={locale === 'de' ? SCAN_STEPS_DE : SCAN_STEPS_EN} />
        </section>

        {/* Method 2 */}
        <section className="space-y-4 scroll-mt-20" id="upi-id">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 2: Über UPI-ID bezahlen' : 'Method 2: Pay via UPI ID'}
          </h2>
          <StepList steps={locale === 'de' ? UPI_ID_STEPS_DE : UPI_ID_STEPS_EN} />
        </section>

        {/* Method 3 */}
        <section className="space-y-3 scroll-mt-20" id="phone-number">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 3: Über Telefonnummer bezahlen' : 'Method 3: Pay via Phone Number'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Registrierte UPI-Nutzer können statt einer UPI-ID auch direkt die Telefonnummer des Empfängers eingeben — die App löst sie automatisch zur richtigen UPI-ID auf, sofern der Empfänger seine Nummer registriert hat.'
              : "Registered UPI users can enter the recipient's phone number directly instead of a UPI ID — the app automatically resolves it to the correct UPI ID, provided the recipient has registered their number."}
          </p>
        </section>

        {/* Method 4 */}
        <section className="space-y-3 scroll-mt-20" id="collect">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 4: Geld anfordern (Collect)' : 'Method 4: Collect (Request Money)'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Händler und Freelancer können eine Zahlungsanfrage ("Collect Request") an die UPI-ID eines Kunden senden. Der Kunde erhält eine Benachrichtigung und muss die Zahlung nur noch mit seiner PIN bestätigen — praktisch für Rechnungen und wiederkehrende Zahlungen.'
              : 'Merchants and freelancers can send a "Collect Request" to a customer\'s UPI ID. The customer receives a notification and only needs to confirm the payment with their PIN — useful for invoices and recurring payments.'}
          </p>
        </section>

        {/* UPI PIN */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI-PIN – was du wissen musst' : 'UPI PIN – What You Need to Know'}
          </h2>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Die UPI-PIN ist NICHT deine Banking-PIN' : 'UPI PIN is NOT your banking PIN'}</li>
            <li>• {locale === 'de' ? 'Wird separat in jeder UPI-App festgelegt' : 'Set separately in each UPI app'}</li>
            <li>• {locale === 'de' ? '6 Stellen (bei manchen Banken 4)' : '6 digits (or 4 for some banks)'}</li>
            <li>• {locale === 'de' ? 'Bei jeder Transaktion erforderlich' : 'Required for every transaction'}</li>
            <li>• {locale === 'de' ? 'Niemals mit jemandem teilen' : 'Never share with anyone'}</li>
          </ul>
        </section>

        {/* UPI ID format */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI-ID-Format erklärt' : 'UPI ID Format Explained'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de' ? ['UPI-ID', 'Bank/Anbieter'] : ['UPI ID', 'Bank/Provider']).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {UPI_ID_TABLE.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-blue-700 text-xs">{row.id}</td>
                    <td className="px-4 py-3 text-slate-600">{row.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Problems */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Häufige UPI-Probleme' : 'Common UPI Problems'}
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
            {locale === 'de' ? 'Bereit, deinen UPI-QR-Code zu erstellen?' : 'Ready to generate your UPI QR code?'}
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
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indien' : 'Related in India'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'UPI Touristen-Guide' : 'UPI Tourist Guide'}
              url="/guides/india/upi-tourist-guide"
              description={locale === 'de' ? 'Können Touristen UPI nutzen?' : 'Can tourists use UPI?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'UPI-QR scannen' : 'Scan UPI QR Code'}
              url="/guides/india/scan-upi-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📊"
              name={locale === 'de' ? 'UPI-Apps im Vergleich' : 'UPI Apps Comparison'}
              url="/guides/india/upi-apps-comparison"
              description={locale === 'de' ? 'PhonePe vs Google Pay vs Paytm' : 'PhonePe vs Google Pay vs Paytm'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
