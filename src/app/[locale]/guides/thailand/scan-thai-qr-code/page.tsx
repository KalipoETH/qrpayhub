import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Scan a Thai QR Code – Step-by-Step Guide 2026';
const TITLE_DE = 'Wie man einen Thai-QR-Code scannt – Schritt-für-Schritt-Guide 2026';
const DESC_EN =
  'Learn how to scan Thai QR payment codes with your banking app. Works with PayNow, DuitNow, UPI, QRIS and more. Step-by-step with screenshots.';
const DESC_DE =
  'Lerne, wie du thailändische QR-Zahlungscodes mit deiner Banking-App scannst. Funktioniert mit PayNow, DuitNow, UPI, QRIS und mehr. Schritt für Schritt erklärt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['scan thai qr code', 'paynow scan thailand', 'duitnow scan thailand', 'upi scan thailand', 'qris scan thailand'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/scan-thai-qr-code'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/scan-thai-qr-code', title, description),
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
  { flag: 'sg', en: 'Use PayNow / GrabPay', de: 'Nutze PayNow / GrabPay', ok: true },
  { flag: 'my', en: 'Use DuitNow / Touch n Go', de: 'Nutze DuitNow / Touch n Go', ok: true },
  { flag: 'in', en: 'Use PhonePe / Google Pay / Paytm', de: 'Nutze PhonePe / Google Pay / Paytm', ok: true },
  { flag: 'id', en: 'Use GoPay / OVO / Dana', de: 'Nutze GoPay / OVO / Dana', ok: true },
  { flag: 'jp', en: 'Use a JCB QR compatible app', de: 'Nutze eine JCB-QR-kompatible App', ok: true },
  { flag: 'cn', en: 'Use Alipay / WeChat Pay', de: 'Nutze Alipay / WeChat Pay', ok: true },
];

const PAYNOW_STEPS_EN = [
  'Open your Singapore banking app (DBS, OCBC, UOB, GrabPay)',
  'Tap the "Scan" or "Pay" button (usually on the home screen)',
  'Allow camera access if prompted',
  "Point your camera at the Thai merchant's QR code",
  'Wait for the app to recognize the code (1–2 seconds)',
  'Review: merchant name and amount shown',
  'Confirm the amount is correct (Thai Baht)',
  'Tap "Pay" or "Confirm"',
  'Authenticate: PIN or fingerprint',
  '✅ Payment complete! Keep a screenshot as receipt',
];
const PAYNOW_STEPS_DE = [
  'Öffne deine Singapur-Banking-App (DBS, OCBC, UOB, GrabPay)',
  'Tippe auf "Scan" oder "Pay" (meist auf dem Startbildschirm)',
  'Erlaube den Kamerazugriff, falls gefragt',
  'Richte die Kamera auf den QR-Code des thailändischen Händlers',
  'Warte, bis die App den Code erkennt (1–2 Sekunden)',
  'Prüfe: Händlername und Betrag werden angezeigt',
  'Bestätige, dass der Betrag korrekt ist (Thai Baht)',
  'Tippe auf "Pay" oder "Bestätigen"',
  'Authentifiziere dich: PIN oder Fingerabdruck',
  '✅ Zahlung abgeschlossen! Behalte einen Screenshot als Quittung',
];

const UPI_STEPS_EN = [
  'Open PhonePe, Google Pay or Paytm',
  'Tap "Scan QR"',
  "Point your camera at the merchant's QR code",
  'Confirm the merchant name and amount in INR-converted THB',
  'Enter your UPI PIN',
  '✅ Payment complete!',
];
const UPI_STEPS_DE = [
  'Öffne PhonePe, Google Pay oder Paytm',
  'Tippe auf "QR scannen"',
  'Richte die Kamera auf den QR-Code des Händlers',
  'Bestätige den Händlernamen und Betrag in INR-umgerechnetem THB',
  'Gib deine UPI-PIN ein',
  '✅ Zahlung abgeschlossen!',
];

const QRIS_STEPS_EN = [
  'Open GoPay, OVO or Dana',
  'Tap "Scan"',
  "Point your camera at the merchant's QR code",
  'Confirm the merchant name and amount in IDR-converted THB',
  'Authenticate with PIN or biometric',
  '✅ Payment complete!',
];
const QRIS_STEPS_DE = [
  'Öffne GoPay, OVO oder Dana',
  'Tippe auf "Scan"',
  'Richte die Kamera auf den QR-Code des Händlers',
  'Bestätige den Händlernamen und Betrag in IDR-umgerechnetem THB',
  'Authentifiziere dich mit PIN oder Biometrie',
  '✅ Zahlung abgeschlossen!',
];

const TROUBLESHOOT = [
  { en: ["Camera won't focus", 'Move closer, ensure good lighting'], de: ['Kamera fokussiert nicht', 'Näher heran, für gute Beleuchtung sorgen'] },
  { en: ['"Invalid QR" error', 'QR might be damaged, ask the merchant'], de: ['Fehler "Invalid QR"', 'QR könnte beschädigt sein, Händler fragen'] },
  { en: ['"Merchant not found"', 'Cross-border not enabled at this merchant'], de: ['"Merchant not found"', 'Grenzüberschreitend ist bei diesem Händler nicht aktiviert'] },
  { en: ['Amount not shown', 'Static QR – enter the amount manually'], de: ['Betrag nicht angezeigt', 'Statischer QR – Betrag manuell eingeben'] },
  { en: ['App crashes', 'Update your banking app'], de: ['App stürzt ab', 'Banking-App aktualisieren'] },
];

const ALL_STEPS = [...PAYNOW_STEPS_EN, ...UPI_STEPS_EN, ...QRIS_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function ScanThaiQrCodePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-scan-thai-qr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
          { label: 'Thailand', href: '/guides/thailand' },
          { label: locale === 'de' ? 'Thai QR scannen' : 'Scan Thai QR Code' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man einen Thai-QR-Code scannt' : 'How to Scan a Thai QR Code'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de' ? 'Bezahle bei thailändischen Händlern in Sekunden' : 'Pay at Thai merchants in seconds'}
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
              {locale === 'de' ? 'Andere Länder → siehe Optionen für westliche Touristen' : 'Other countries → see Western tourist options'}
            </span>
          </div>
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

        {/* QRIS */}
        <section className="space-y-4 scroll-mt-20" id="qris">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Scannen mit QRIS (Indonesien)' : 'Step-by-Step: Scanning with QRIS (Indonesia)'}
          </h2>
          <StepList steps={locale === 'de' ? QRIS_STEPS_DE : QRIS_STEPS_EN} />
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
            {locale === 'de' ? 'Thai-QR-Code-Erkennung' : 'Thai QR Code Recognition'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'So erkennst du einen gültigen thailändischen Zahlungs-QR:'
              : 'How to identify a valid Thai payment QR:'}
          </p>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Suche nach dem "Thai QR Payment"-Logo (rot/weiß)' : 'Look for the Thai QR Payment logo (red/white)'}</li>
            <li>• {locale === 'de' ? 'Oder das PromptPay-Logo' : 'Or the PromptPay logo'}</li>
            <li>• {locale === 'de' ? 'Immer am Verkaufstresen oder auf einem Aufkleber' : 'Always at the merchant counter / on a sticker'}</li>
          </ul>
        </section>

        {/* After payment */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Nach der Zahlung' : 'After Payment'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de' ? 'Was zu erwarten ist:' : 'What to expect:'}
          </p>
          <ul className="text-sm text-slate-700 space-y-1.5">
            <li>• {locale === 'de' ? 'Sofortige Push-Benachrichtigung auf deinem Telefon' : 'Instant notification on your phone'}</li>
            <li>• {locale === 'de' ? 'Der Händler erhält ein Bestätigungssignal' : 'The merchant gets a confirmation beep/notification'}</li>
            <li>• {locale === 'de' ? 'Mache einen Screenshot der Erfolgsmeldung (keine Papierquittung)' : 'Screenshot the success screen (no paper receipt)'}</li>
            <li>• {locale === 'de' ? 'Der Betrag wird in deiner Heimatwährung auf deinem Kontoauszug angezeigt' : 'Amount shown in your home currency on your statement'}</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides/thailand"
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 text-blue-800 hover:bg-blue-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? '← Zurück zum Thailand-Guide' : '← Back to Thailand Guide'}
            </Link>
            <Link
              href="/promptpay/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: '#1A56DB' }}
            >
              {locale === 'de' ? 'PromptPay Generator →' : 'PromptPay Generator →'}
            </Link>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Thailand' : 'Related in Thailand'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📱"
              name={locale === 'de' ? 'Thai QR-Code-Zahlung' : 'Thai QR Code Payment'}
              url="/guides/thailand/thai-qr-code-payment"
              description={locale === 'de' ? 'Wie der Thai-QR-Standard technisch funktioniert' : 'How the Thai QR payment standard works technically'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'PromptPay Tourist Guide'}
              url="/guides/thailand/promptpay-tourist-guide"
              description={locale === 'de' ? 'Können Touristen PromptPay nutzen?' : 'Can tourists use PromptPay?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
