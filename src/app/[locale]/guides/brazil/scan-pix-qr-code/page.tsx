import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Scan a PIX QR Code in Brazil 2026 – Step-by-Step';
const TITLE_DE = 'Wie man einen PIX QR-Code in Brasilien scannt 2026 – Schritt für Schritt';
const DESC_EN =
  'Learn how to scan PIX QR codes in Brazil with Nubank, Itaú, Mercado Pago or any Brazilian banking app. Step-by-step guide with troubleshooting.';
const DESC_DE =
  'Lerne, wie du PIX-QR-Codes in Brasilien mit Nubank, Itaú, Mercado Pago oder einer anderen brasilianischen Banking-App scannst. Schritt-für-Schritt mit Fehlerbehebung.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['scan pix qr code', 'nubank pix scan', 'mercado pago scan', 'pix qr code how to', 'pix payment scan'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/scan-pix-qr-code'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/scan-pix-qr-code', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const COMPAT = (locale: 'en' | 'de') => [
  { ok: true,  label: locale === 'de' ? 'CPF-Inhaber → Jede brasilianische Banking-App' : 'CPF holders → Any Brazilian banking app' },
  { ok: true,  label: locale === 'de' ? 'Touristen → Mercado-Pago-App' : 'Tourists → Mercado Pago app' },
  { ok: true,  label: locale === 'de' ? 'Expats → Nubank / Itaú / beliebige Bank' : 'Expats → Nubank / Itaú / any bank' },
  { ok: false, label: locale === 'de' ? 'Ohne CPF/Mercado Pago → Karte verwenden' : 'Without CPF/Mercado Pago → Use card instead' },
];

const NUBANK_STEPS_EN = [
  'Open Nubank app',
  'Tap "Área PIX" on the home screen',
  'Select "Pagar" (Pay)',
  'Tap "Escanear QR Code"',
  'Point your camera at the PIX QR code',
  'App reads QR instantly',
  'Verify: merchant name + amount',
  'Tap "Continuar"',
  'Confirm with biometric or PIN',
  '✅ "Transferência realizada!" confirmation',
];
const NUBANK_STEPS_DE = [
  'Nubank-App öffnen',
  '"Área PIX" auf dem Startbildschirm antippen',
  '"Pagar" (Bezahlen) auswählen',
  '"Escanear QR Code" antippen',
  'Kamera auf den PIX-QR-Code richten',
  'App liest QR sofort',
  'Prüfen: Händlername + Betrag',
  '"Continuar" antippen',
  'Mit Biometrie oder PIN bestätigen',
  '✅ Bestätigung "Transferência realizada!"',
];

const MP_STEPS_EN = [
  'Open Mercado Pago app',
  'Tap camera icon / "Escanear" on home screen',
  'Scan PIX or Mercado Pago QR code',
  'Review merchant name + amount',
  'Tap "Pagar"',
  'Confirm with PIN or biometric',
  '✅ Instant confirmation!',
];
const MP_STEPS_DE = [
  'Mercado-Pago-App öffnen',
  'Kamera-Symbol / "Escanear" auf dem Startbildschirm antippen',
  'PIX- oder Mercado-Pago-QR-Code scannen',
  'Händlername + Betrag prüfen',
  '"Pagar" antippen',
  'Mit PIN oder Biometrie bestätigen',
  '✅ Sofortige Bestätigung!',
];

const ITAU_STEPS_EN = [
  'Open Itaú app',
  'Tap "PIX"',
  'Select "Pagar com QR Code"',
  'Scan merchant QR code',
  'Verify details and confirm',
  '✅ Done!',
];
const ITAU_STEPS_DE = [
  'Itaú-App öffnen',
  '"PIX" antippen',
  '"Pagar com QR Code" auswählen',
  'Händler-QR-Code scannen',
  'Details prüfen und bestätigen',
  '✅ Fertig!',
];

const CHECKLIST = (locale: 'en' | 'de') => [
  locale === 'de' ? 'Zeigt PIX-Logo (blau/türkis) oder Mercado-Pago-Logo' : 'Shows PIX logo (blue/teal) or Mercado Pago logo',
  locale === 'de' ? 'Zeigt Händler- oder Personenname' : 'Shows merchant or person name',
  locale === 'de' ? 'Zeigt Betrag (dynamisch) oder "offener Betrag" (statisch)' : 'Shows amount (dynamic) or "open amount" (static)',
  locale === 'de' ? 'Auf Telefonbildschirm oder gedrucktem Aufkleber angezeigt' : 'Often displayed on phone screen or printed sticker',
  locale === 'de' ? 'Enthält CRC16-Prüfsumme (für Nutzer unsichtbar)' : 'Contains CRC16 checksum (invisible to user)',
];

const PROBLEMS = (locale: 'en' | 'de') => [
  { p: '"Chave PIX não encontrada"',    s: locale === 'de' ? 'Empfänger nicht registriert' : 'Recipient not registered' },
  { p: locale === 'de' ? 'QR wird nicht gescannt' : 'QR not scanning', s: locale === 'de' ? 'Objektiv reinigen, bessere Beleuchtung' : 'Clean lens, better lighting' },
  { p: '"QR Code inválido"',            s: locale === 'de' ? 'Beschädigt oder falsches Format' : 'Damaged or wrong format' },
  { p: '"Limite atingido"',             s: locale === 'de' ? 'Nachtlimit (R$1.000) aktiv' : 'Night limit (R$1,000) active' },
  { p: locale === 'de' ? 'Falscher Händlername' : 'Wrong merchant name', s: locale === 'de' ? 'Stopp – möglicherweise Betrug' : 'Stop – may be fraud' },
  { p: '"PIX indisponível"',            s: locale === 'de' ? 'Seltener Ausfall, erneut versuchen' : 'Rare outage, try again' },
  { p: locale === 'de' ? 'Betrag scheint falsch' : 'Amount seems wrong', s: locale === 'de' ? 'Vor Bestätigung prüfen' : 'Verify before confirming' },
];

const AFTER_PAYMENT = (locale: 'en' | 'de') => [
  locale === 'de' ? '"Comprovante"-Bildschirm (Quittung) screenshotten' : 'Screenshot the "Comprovante" (receipt) screen',
  locale === 'de' ? 'Händler erhält sofortige Tonbenachrichtigung' : 'Merchant gets instant sound notification',
  locale === 'de' ? 'Beide Parteien erhalten Push-Benachrichtigung' : 'Both parties receive push notification',
  locale === 'de' ? 'Comprovante zeigt: Datum, Betrag, CPF (maskiert), Händlername, Transaktions-ID' : 'Comprovante shows: date, amount, CPF (masked), merchant name, transaction ID',
  locale === 'de' ? '90 Tage aufbewahren (Verbraucherschutz)' : 'Save for 90 days (consumer protection)',
];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: NUBANK_STEPS_EN.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function ScanPixQrCodePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-scan-pix" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
      <PageContent locale={locale} />
    </>
  );
}

function StepList({ steps, color = '#00B894' }: { steps: string[]; color?: string }) {
  return (
    <ol className="space-y-3">
      {steps.map((text, i) => (
        <li key={i} className="flex gap-4">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: color }}
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
  const compat   = COMPAT(locale);
  const checklist = CHECKLIST(locale);
  const problems  = PROBLEMS(locale);
  const after     = AFTER_PAYMENT(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'PIX-QR scannen' : 'Scan PIX QR Code' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man einen PIX QR-Code scannt' : 'How to Scan a PIX QR Code'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Bei jedem brasilianischen Händler sofort bezahlen'
            : 'Pay at any Brazilian merchant instantly'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Compatibility check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Kompatibilitätsprüfung' : 'Compatibility Check'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compat.map(({ ok, label }) => (
              <div key={label} className={`flex items-center gap-3 rounded-xl p-3 border ${ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span className="text-lg flex-shrink-0">{ok ? '✅' : '❌'}</span>
                <span className={`text-sm font-medium ${ok ? 'text-green-800' : 'text-red-800'}`}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nubank steps */}
        <section className="space-y-4 scroll-mt-20" id="nubank">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Nubank' : 'Step-by-Step: Nubank'}
          </h2>
          <StepList steps={locale === 'de' ? NUBANK_STEPS_DE : NUBANK_STEPS_EN} />
        </section>

        {/* Mercado Pago steps */}
        <section className="space-y-4 scroll-mt-20" id="mercadopago">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Mercado Pago (für Touristen)' : 'Step-by-Step: Mercado Pago (for tourists)'}
          </h2>
          <StepList steps={locale === 'de' ? MP_STEPS_DE : MP_STEPS_EN} color="#f59e0b" />
        </section>

        {/* Itaú steps */}
        <section className="space-y-4 scroll-mt-20" id="itau">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Schritt für Schritt: Itaú' : 'Step-by-Step: Itaú'}
          </h2>
          <StepList steps={locale === 'de' ? ITAU_STEPS_DE : ITAU_STEPS_EN} color="#f97316" />
        </section>

        {/* Identify valid QR */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Gültigen PIX-QR erkennen' : 'Identify a Valid PIX QR Code'}
          </h2>
          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span style={{ color: '#00B894' }} className="font-bold text-lg leading-none">✓</span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Fehlerbehebung' : 'Troubleshooting'}
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
                {problems.map(({ p, s }) => (
                  <tr key={p} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{p}</td>
                    <td className="px-4 py-3 text-slate-600">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* After successful payment */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Nach erfolgreicher Zahlung' : 'After Successful Payment'}
          </h2>
          <ul className="space-y-2">
            {after.map((item) => (
              <li key={item} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm text-sm text-slate-700">
                <span style={{ color: '#00B894' }} className="text-lg leading-none">✅</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Fraud warning */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
          <p className="font-bold text-amber-800 text-lg">
            ⚠️ {locale === 'de' ? 'Niemals einen QR-Code aus unbekannter Quelle scannen' : 'Never scan a QR code from an unknown source'}
          </p>
          <div className="text-sm text-amber-700 space-y-1">
            <p className="font-semibold">{locale === 'de' ? 'Häufige Betrugsmaschen:' : 'Common scams:'}</p>
            <ul className="space-y-1">
              {(locale === 'de' ? [
                'Gefälschte QR-Codes, die über echte geklebt wurden',
                'WhatsApp-Nachrichten mit QR-Codes, die "Rückerstattungen" verlangen',
                '"Test"-Zahlungen, die real sind',
              ] : [
                'Fake QR codes placed over real ones',
                "WhatsApp messages with QR codes asking for 'refunds'",
                "'Test' payments that are actually real",
              ]).map((s) => <li key={s}>• {s}</li>)}
            </ul>
            <p className="font-semibold pt-1">
              {locale === 'de'
                ? 'Immer den Händlernamen vor der Bestätigung prüfen!'
                : 'Always verify merchant name before confirming!'}
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de' ? 'Bereit, deinen PIX-QR-Code zu erstellen?' : 'Ready to generate your PIX QR code?'}
          </p>
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#00B894' }}
          >
            {locale === 'de' ? 'PIX-QR-Code erstellen →' : 'Generate PIX QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Brasilien' : 'Related in Brazil'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man PIX benutzt' : 'How to Use PIX'}
              url="/guides/brazil/how-to-use-pix"
              description={locale === 'de' ? 'Alle drei PIX-Zahlungsmethoden' : 'All three PIX payment methods'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🔑"
              name={locale === 'de' ? 'PIX-Schlüssel erklärt' : 'PIX Keys Explained'}
              url="/guides/brazil/pix-keys-explained"
              description={locale === 'de' ? 'CPF, CNPJ, Telefon, E-Mail, Zufallsschlüssel' : 'CPF, CNPJ, phone, email, random key'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
