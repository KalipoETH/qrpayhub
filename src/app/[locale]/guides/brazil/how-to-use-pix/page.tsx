import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Use PIX in Brazil 2026 – Complete Step-by-Step Guide';
const TITLE_DE = 'Wie man PIX in Brasilien benutzt 2026 – Komplette Schritt-für-Schritt-Anleitung';
const DESC_EN =
  'Step-by-step guide to PIX in Brazil. Send money, pay merchants and scan QR codes with Nubank, Itaú, Mercado Pago or any Brazilian banking app.';
const DESC_DE =
  'Schritt-für-Schritt-Anleitung zu PIX in Brasilien. Geld senden, Händler bezahlen und QR-Codes mit Nubank, Itaú, Mercado Pago oder jeder brasilianischen Banking-App scannen.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['how to use pix', 'pix tutorial', 'nubank pix', 'scan pix qr', 'pix key', 'pix transfer'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/how-to-use-pix'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/how-to-use-pix', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const SCAN_STEPS_EN = [
  '👀 Look for a PIX QR code at the merchant',
  '📱 Open any Brazilian banking app (Nubank, Itaú, Mercado Pago, PicPay)',
  '💚 Tap "PIX" → "Pagar" (Pay)',
  '📷 Select "QR Code"',
  '🔲 Point your camera at the merchant QR code',
  '👤 Verify merchant name and amount',
  '✔️ Confirm payment',
  '🔐 Authenticate (biometric or PIN)',
  '✅ Instant confirmation!',
];
const SCAN_STEPS_DE = [
  '👀 Suche nach einem PIX-QR-Code beim Händler',
  '📱 Öffne eine brasilianische Banking-App (Nubank, Itaú, Mercado Pago, PicPay)',
  '💚 Tippe auf "PIX" → "Pagar" (Bezahlen)',
  '📷 Wähle "QR Code"',
  '🔲 Richte die Kamera auf den Händler-QR-Code',
  '👤 Händlername und Betrag prüfen',
  '✔️ Zahlung bestätigen',
  '🔐 Authentifizieren (Biometrie oder PIN)',
  '✅ Sofortige Bestätigung!',
];

const KEY_STEPS_EN = [
  'Open your banking app',
  'Tap "PIX" → "Transferir" (Transfer)',
  "Enter the recipient's PIX key (CPF, CNPJ, phone, email or random key)",
  'Bank shows recipient name automatically',
  'Enter the amount',
  'Add a description (optional)',
  'Confirm and authenticate',
  '✅ Money arrives instantly!',
];
const KEY_STEPS_DE = [
  'Öffne deine Banking-App',
  'Tippe auf "PIX" → "Transferir" (Überweisung)',
  'PIX-Schlüssel des Empfängers eingeben (CPF, CNPJ, Telefon, E-Mail oder Zufallsschlüssel)',
  'Die App zeigt automatisch den Empfängernamen',
  'Betrag eingeben',
  'Beschreibung hinzufügen (optional)',
  'Bestätigen und authentifizieren',
  '✅ Geld kommt sofort an!',
];

const COBRAR_STEPS_EN = [
  'Open your banking app',
  'Tap "PIX" → "Cobrar" (Charge)',
  'Enter the amount',
  'Generate QR code',
  'Show or share the QR with the payer',
  '✅ Receive instant payment notification',
];
const COBRAR_STEPS_DE = [
  'Öffne deine Banking-App',
  'Tippe auf "PIX" → "Cobrar" (Anfordern)',
  'Betrag eingeben',
  'QR-Code generieren',
  'QR dem Zahler zeigen oder teilen',
  '✅ Sofortige Zahlungsbenachrichtigung erhalten',
];

const PIX_KEYS_TABLE = [
  { key: 'CPF',    format: '11 digits',  example: '123.456.789-09',          bestFor: 'Individuals',  bestForDe: 'Privatpersonen' },
  { key: 'CNPJ',   format: '14 digits',  example: '12.345.678/0001-90',       bestFor: 'Businesses',   bestForDe: 'Unternehmen' },
  { key: 'Phone',  format: '+55 + number', example: '+5511987654321',          bestFor: 'Easy sharing', bestForDe: 'Einfaches Teilen' },
  { key: 'Email',  format: 'Standard',   example: 'name@email.com',           bestFor: 'Digital users', bestForDe: 'Digitale Nutzer' },
  { key: 'Random', format: 'UUID',       example: '123e4567-e89b-12d3-a456-…', bestFor: 'Privacy',      bestForDe: 'Datenschutz' },
];

const PROBLEMS = [
  { en: ['"Chave não encontrada"',  'PIX key not registered by recipient'],         de: ['"Chave não encontrada"', 'PIX-Schlüssel nicht beim Empfänger registriert'] },
  { en: ['Transfer limit reached',  'Night limit (R$1,000) applies 8pm–6am'],       de: ['Überweisungslimit erreicht', 'Nachtlimit (R$1.000) gilt 20–6 Uhr'] },
  { en: ['Wrong recipient shown',   'Double-check the PIX key before confirming'],  de: ['Falscher Empfänger angezeigt', 'PIX-Schlüssel vor Bestätigung prüfen'] },
  { en: ['CRC error in QR',         'QR code is damaged or incorrectly generated'], de: ['CRC-Fehler im QR', 'QR-Code beschädigt oder falsch generiert'] },
  { en: ['"PIX indisponível"',      'Rare outage — try again in a few minutes'],    de: ['"PIX indisponível"', 'Seltener Ausfall — in wenigen Minuten erneut versuchen'] },
];

const ALL_STEPS = [...SCAN_STEPS_EN, ...KEY_STEPS_EN, ...COBRAR_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

export default function HowToUsePixPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-howto-pix" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
            style={{ backgroundColor: '#00B894' }}
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
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'PIX benutzen' : 'How to Use PIX' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man PIX in Brasilien benutzt' : 'How to Use PIX in Brazil'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Brasiliens schnellste Zahlungsmethode – einfach erklärt'
            : "Brazil's fastest payment method – explained step by step"}
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
        <section className="space-y-4 scroll-mt-20" id="pix-key">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 2: Per PIX-Schlüssel bezahlen' : 'Method 2: Pay via PIX Key'}
          </h2>
          <StepList steps={locale === 'de' ? KEY_STEPS_DE : KEY_STEPS_EN} />
        </section>

        {/* Method 3 */}
        <section className="space-y-4 scroll-mt-20" id="cobrar">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 3: Geld anfordern (Cobrança)' : 'Method 3: Request Money (Cobrança)'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Händler und Freelancer können einen QR-Code mit einem vorausgefüllten Betrag generieren. Der Zahler scannt den Code und bestätigt die Zahlung sofort.'
              : 'Merchants and freelancers can generate a QR code with a pre-filled amount. The payer scans it and confirms the payment instantly.'}
          </p>
          <StepList steps={locale === 'de' ? COBRAR_STEPS_DE : COBRAR_STEPS_EN} />
        </section>

        {/* PIX Keys Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Schlüsseltypen erklärt' : 'PIX Key Types Explained'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['PIX-Schlüssel', 'Format', 'Beispiel', 'Am besten für']
                    : ['PIX Key', 'Format', 'Example', 'Best For']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PIX_KEYS_TABLE.map((row) => (
                  <tr key={row.key} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.key}</td>
                    <td className="px-4 py-3 text-slate-600">{row.format}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-700">{row.example}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.bestForDe : row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Night Limits */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Nachtlimits' : 'PIX Night Limits'}
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-amber-800">
              🌙 {locale === 'de' ? 'PIX hat reduzierte Limits in der Nacht' : 'PIX has reduced limits at night'}
            </p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• {locale === 'de' ? 'Zeitraum: 20:00–06:00 Uhr' : 'Between 8pm–6am'}</li>
              <li>• {locale === 'de' ? 'Max. pro Transaktion: R$1.000' : 'Max per transaction: R$1,000'}</li>
              <li>• {locale === 'de' ? 'Sicherheitsmaßnahme gegen Betrug' : 'Security measure against fraud'}</li>
              <li>• {locale === 'de' ? 'Limit kann in der Banking-App erhöht werden' : 'Limit can be increased in your banking app'}</li>
              <li>• {locale === 'de' ? 'Erhöhung erfordert 24h Wartezeit' : 'Requires 24h waiting period after requesting increase'}</li>
            </ul>
          </div>
        </section>

        {/* Common Problems */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Häufige PIX-Probleme' : 'Common PIX Problems'}
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
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de' ? 'Bereit, deinen PIX-QR-Code zu erstellen?' : 'Ready to generate your PIX QR code?'}
          </p>
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#00B894' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Brasilien' : 'Related in Brazil'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="🌍"
              name={locale === 'de' ? 'PIX Touristen-Guide' : 'PIX Tourist Guide'}
              url="/guides/brazil/pix-tourist-guide"
              description={locale === 'de' ? 'Können Touristen PIX nutzen?' : 'Can tourists use PIX?'}
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
            <RelatedToolCard
              icon="🇧🇷"
              name={locale === 'de' ? 'Brasilien Hub' : 'Brazil Hub'}
              url="/guides/brazil"
              description={locale === 'de' ? 'Alles über Bezahlen in Brasilien' : 'Everything about paying in Brazil'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
