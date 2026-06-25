import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'How to Use QRIS in Indonesia 2026 – Complete Step-by-Step Guide';
const TITLE_DE = 'Wie man QRIS in Indonesien benutzt 2026 – Komplette Schritt-für-Schritt-Anleitung';
const DESC_EN =
  'Step-by-step guide to using QRIS in Indonesia. Learn how to pay at merchants, receive payments and use GoPay, OVO or Dana for QRIS transactions.';
const DESC_DE =
  'Schritt-für-Schritt-Anleitung zur Nutzung von QRIS in Indonesien. Lerne, wie du bei Händlern bezahlst, Zahlungen empfängst und GoPay, OVO oder Dana für QRIS-Transaktionen nutzt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['how to use qris', 'qris tutorial', 'gopay tutorial', 'ovo tutorial', 'scan qris qr', 'qris guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/how-to-use-qris'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/how-to-use-qris', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const MERCHANT_STEPS_EN = [
  '👀 Look for the QRIS sticker at the merchant',
  '📱 Open any QRIS-enabled app (GoPay, OVO, Dana, your bank app)',
  '🔲 Tap "Scan QR" or "Bayar" (Pay)',
  "📷 Scan the merchant's QRIS code",
  '💰 Check the amount (preset or enter manually)',
  '👤 Confirm merchant name',
  '🔐 Enter PIN or use fingerprint',
  '✅ Done! Instant confirmation',
];
const MERCHANT_STEPS_DE = [
  '👀 Suche nach dem QRIS-Aufkleber beim Händler',
  '📱 Öffne eine QRIS-fähige App (GoPay, OVO, Dana, deine Banking-App)',
  '🔲 Tippe auf "QR scannen" oder "Bayar" (Bezahlen)',
  '📷 Scanne den QRIS-Code des Händlers',
  '💰 Prüfe den Betrag (voreingestellt oder manuell eingeben)',
  '👤 Bestätige den Händlernamen',
  '🔐 Gib die PIN ein oder nutze den Fingerabdruck',
  '✅ Fertig! Sofortige Bestätigung',
];

const RECEIVE_STEPS_EN = [
  'Open your banking app',
  'Tap "Terima" (Receive) or "My QR"',
  'Your personal QRIS appears',
  'Let the payer scan your code',
  'Enter the amount if not preset',
  'Receive an instant notification',
];
const RECEIVE_STEPS_DE = [
  'Öffne deine Banking-App',
  'Tippe auf "Terima" (Empfangen) oder "My QR"',
  'Dein persönlicher QRIS-Code erscheint',
  'Lass den Zahlenden deinen Code scannen',
  'Gib den Betrag ein, falls nicht voreingestellt',
  'Erhalte eine sofortige Benachrichtigung',
];

const CROSSBORDER_STEPS_EN = [
  'Open YOUR home country banking app',
  'Use the scan/pay function',
  'Scan the Indonesian QRIS merchant code',
  'Amount shown in IDR + your currency equivalent',
  'Confirm and pay',
  'Done!',
];
const CROSSBORDER_STEPS_DE = [
  'Öffne DEINE heimische Banking-App',
  'Nutze die Scan/Bezahlen-Funktion',
  'Scanne den indonesischen QRIS-Händlercode',
  'Der Betrag wird in IDR + deiner Heimatwährung angezeigt',
  'Bestätigen und bezahlen',
  'Fertig!',
];

const APP_COMPARISON = [
  { app: 'GoPay', topupEn: 'Bank transfer, minimart', topupDe: 'Banküberweisung, Minimarkt', foreigners: '⚠️', common: 5 },
  { app: 'OVO', topupEn: 'Bank, credit card', topupDe: 'Bank, Kreditkarte', foreigners: '⚠️', common: 4 },
  { app: 'Dana', topupEn: 'Bank transfer', topupDe: 'Banküberweisung', foreigners: '⚠️', common: 4 },
  { app: 'LinkAja', topupEn: 'Bank transfer', topupDe: 'Banküberweisung', foreigners: '❌', common: 3 },
  { app: 'ShopeePay', topupEn: 'Shopee wallet', topupDe: 'Shopee-Wallet', foreigners: '⚠️', common: 4 },
  { app: 'BCA Mobile', topupEn: 'BCA account', topupDe: 'BCA-Konto', foreigners: '❌', common: 5 },
];

const PROBLEMS = [
  { en: ['"QRIS tidak valid"', 'QR code damaged, ask for a new code'], de: ['"QRIS tidak valid"', 'QR-Code beschädigt, neuen Code anfordern'] },
  { en: ["App won't open camera", 'Check camera permissions'], de: ['App öffnet Kamera nicht', 'Kameraberechtigungen prüfen'] },
  { en: ['Wrong amount charged', 'Check before confirming'], de: ['Falscher Betrag berechnet', 'Vor dem Bestätigen prüfen'] },
  { en: ["Cross-border not working", 'Not all merchants are enabled'], de: ['Grenzüberschreitend funktioniert nicht', 'Nicht alle Händler sind aktiviert'] },
  { en: ['Daily limit reached', 'Contact your bank'], de: ['Tageslimit erreicht', 'Kontaktiere deine Bank'] },
];

const ALL_STEPS = [...MERCHANT_STEPS_EN, ...RECEIVE_STEPS_EN, ...CROSSBORDER_STEPS_EN];

const JSON_LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: TITLE_EN,
  description: DESC_EN,
  step: ALL_STEPS.map((text) => ({ '@type': 'HowToStep', text })),
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function HowToUseQrisPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-howto-qris" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_HOWTO) }} />
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
          { label: 'Indonesia', href: '/guides/indonesia' },
          { label: locale === 'de' ? 'QRIS benutzen' : 'How to Use QRIS' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Wie man QRIS in Indonesien benutzt' : 'How to Use QRIS in Indonesia'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Ein QR-Code, über 50 Apps – so funktioniert es'
            : 'One QR code, 50+ apps – here&apos;s how it works'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* What is QRIS */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Was ist QRIS?' : 'What is QRIS?'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de' ? (
              <>
                QRIS (Quick Response Code Indonesian Standard) ist Indonesiens nationaler
                QR-Zahlungsstandard, eingeführt von Bank Indonesia. Statt eigener QR-Codes pro App
                funktioniert ein einziger Code mit GoPay, OVO, Dana und über 50 weiteren Apps. Mehr
                Hintergrund findest du im{' '}
                <Link href="/qris" className="text-blue-700 font-medium hover:underline">vollständigen QRIS-Guide</Link>.
              </>
            ) : (
              <>
                QRIS (Quick Response Code Indonesian Standard) is Indonesia&apos;s national QR
                payment standard, introduced by Bank Indonesia. Instead of separate QR codes per
                app, a single code works with GoPay, OVO, Dana and 50+ other apps. For more
                background, see the{' '}
                <Link href="/qris" className="text-blue-700 font-medium hover:underline">full QRIS guide</Link>.
              </>
            )}
          </p>
        </section>

        {/* Method 1 */}
        <section className="space-y-4 scroll-mt-20" id="pay-merchant">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 1: Bei einem Händler bezahlen (deren QR scannen)' : "Method 1: Pay at Merchant (Scan Their QR)"}
          </h2>
          <StepList steps={locale === 'de' ? MERCHANT_STEPS_DE : MERCHANT_STEPS_EN} />
        </section>

        {/* Method 2 */}
        <section className="space-y-4 scroll-mt-20" id="receive-payment">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 2: Deinen QR zeigen (Zahlung empfangen)' : 'Method 2: Show Your QR (Receive Payment)'}
          </h2>
          <StepList steps={locale === 'de' ? RECEIVE_STEPS_DE : RECEIVE_STEPS_EN} />
        </section>

        {/* Method 3 */}
        <section className="space-y-4 scroll-mt-20" id="cross-border">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Methode 3: Grenzüberschreitend (für Touristen)' : 'Method 3: Cross-Border (Tourist Scanning)'}
          </h2>
          <p className="text-sm text-slate-500">
            {locale === 'de' ? 'Für Touristen aus SG/MY/TH/IN:' : 'For tourists from SG/MY/TH/IN:'}
          </p>
          <StepList steps={locale === 'de' ? CROSSBORDER_STEPS_DE : CROSSBORDER_STEPS_EN} />
        </section>

        {/* App comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'QRIS-App-Vergleich' : 'QRIS App Comparison Table'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['App', 'Aufladen', 'Ausländer', 'Verbreitung']
                    : ['App', 'Top-up method', 'Foreigners', 'Most common']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {APP_COMPARISON.map((row) => (
                  <tr key={row.app} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-blue-700">{row.app}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.topupDe : row.topupEn}</td>
                    <td className="px-4 py-3 text-slate-600">{row.foreigners}</td>
                    <td className="px-4 py-3"><Stars count={row.common} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Problems */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Häufige QRIS-Probleme & Lösungen' : 'Common QRIS Problems & Solutions'}
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
            {locale === 'de' ? 'Bereit, deinen QRIS-Code zu erstellen?' : 'Ready to generate your QRIS code?'}
          </p>
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {locale === 'de' ? 'Mehr zu Indonesien' : 'Related in Indonesia'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'QRIS Tourist Guide'}
              url="/guides/indonesia/qris-tourist-guide"
              description={locale === 'de' ? 'Können Touristen QRIS nutzen?' : 'Can tourists use QRIS?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'QRIS scannen' : 'How to Scan QRIS'}
              url="/guides/indonesia/scan-qris-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🌍"
              name={locale === 'de' ? 'QRIS für Ausländer' : 'QRIS for Foreigners'}
              url="/guides/indonesia/qris-for-foreigners"
              description={locale === 'de' ? 'Wie Expats vollen QRIS-Zugang erhalten' : 'How expats get full QRIS access'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
