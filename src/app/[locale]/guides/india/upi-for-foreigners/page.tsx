import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'UPI for Foreigners & Expats in India 2026 – Registration Guide';
const TITLE_DE = 'UPI für Ausländer & Expats in Indien 2026 – Der Registrierungsguide';
const DESC_EN =
  'Foreigners and expats in India can get full UPI access with an NRO bank account. Which banks are expat-friendly and how to register step by step.';
const DESC_DE =
  'Ausländer und Expats in Indien können mit einem NRO-Bankkonto vollen UPI-Zugang erhalten. Welche Banken expat-freundlich sind und wie die Registrierung Schritt für Schritt funktioniert.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['upi for foreigners', 'upi expat india', 'nro account upi', 'hdfc foreigner account', 'icici expat', 'nri upi guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/upi-for-foreigners'),
    openGraph: buildOpenGraph(locale, '/guides/india/upi-for-foreigners', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const USER_TYPES = [
  {
    icon: '🏖️',
    roleEn: 'Tourist',
    roleDe: 'Tourist',
    subEn: 'Short visit (days to weeks)',
    subDe: 'Kurzbesuch (Tage bis Wochen)',
    solutionEn: 'Tourist UPI (G20) or Wise card',
    solutionDe: 'Touristen-UPI (G20) oder Wise-Karte',
    linkHref: '/guides/india/upi-tourist-guide' as `/${string}`,
    linkEn: 'See Tourist Guide →',
    linkDe: 'Touristen-Guide →',
  },
  {
    icon: '🏢',
    roleEn: 'Expat / Long-term resident',
    roleDe: 'Expat / Langzeitbewohner',
    subEn: 'Working or studying in India',
    subDe: 'Arbeiten oder studieren in Indien',
    solutionEn: 'Full UPI via NRO bank account',
    solutionDe: 'Volles UPI über NRO-Bankkonto',
    linkHref: null,
    linkEn: null,
    linkDe: null,
  },
  {
    icon: '🌏',
    roleEn: 'NRI (Non-Resident Indian)',
    roleDe: 'NRI (Non-Resident Indian)',
    subEn: 'Indian citizen living abroad',
    subDe: 'Indischer Staatsbürger im Ausland',
    solutionEn: 'NRE/NRO account + UPI',
    solutionDe: 'NRE/NRO-Konto + UPI',
    linkHref: null,
    linkEn: null,
    linkDe: null,
  },
];

const REQUIREMENTS_TABLE = [
  { featureEn: 'Valid passport',        featureDe: 'Gültiger Reisepass',        tourist: '✅',           expat: '✅',        nri: '✅' },
  { featureEn: 'Indian visa',           featureDe: 'Indisches Visum',           tourist: '❌',           expat: '✅',        nri: '❌' },
  { featureEn: 'Indian SIM',            featureDe: 'Indische SIM-Karte',        tourist: '❌',           expat: '✅',        nri: '✅' },
  { featureEn: 'Indian bank account',   featureDe: 'Indisches Bankkonto',       tourist: '❌',           expat: '✅ NRO',    nri: '✅ NRE/NRO' },
  { featureEn: 'Max per transaction',   featureDe: 'Max. pro Transaktion',      tourist: '₹10,000',      expat: '₹1,00,000', nri: '₹1,00,000' },
];

const EXPAT_STEPS_EN = [
  'Get an Indian SIM card (Airtel, Jio, or Vi — available at airport)',
  'Open an NRO bank account (HDFC or ICICI recommended for expats)',
  'Download your preferred UPI app (PhonePe, Google Pay, or Paytm)',
  'Link your NRO bank account to the UPI app',
  'Set your 6-digit UPI PIN',
  '✅ Full UPI access unlocked — up to ₹1,00,000 per transaction!',
];
const EXPAT_STEPS_DE = [
  'Besorge dir eine indische SIM-Karte (Airtel, Jio oder Vi — am Flughafen erhältlich)',
  'Eröffne ein NRO-Bankkonto (HDFC oder ICICI für Expats empfohlen)',
  'Lade deine bevorzugte UPI-App herunter (PhonePe, Google Pay oder Paytm)',
  'Verknüpfe dein NRO-Bankkonto mit der UPI-App',
  'Lege deine 6-stellige UPI-PIN fest',
  '✅ Voller UPI-Zugang freigeschaltet — bis zu ₹1.00.000 pro Transaktion!',
];

const BANKS = [
  {
    icon: '🏦',
    name: 'HDFC Bank',
    handle: '@hdfcbank',
    detailsEn: ['Foreigners: ✅ With valid visa', 'English service: ✅ Excellent', 'App: HDFC MobileBanking'],
    detailsDe: ['Ausländer: ✅ Mit gültigem Visum', 'Englischer Service: ✅ Exzellent', 'App: HDFC MobileBanking'],
    bestEn: 'Professionals, IT expats',
    bestDe: 'Fachleute, IT-Expats',
  },
  {
    icon: '🏦',
    name: 'ICICI Bank',
    handle: '@okicici',
    detailsEn: ['Foreigners: ✅', 'English service: ✅ Good', 'App: iMobile Pay'],
    detailsDe: ['Ausländer: ✅', 'Englischer Service: ✅ Gut', 'App: iMobile Pay'],
    bestEn: 'Tech-savvy expats',
    bestDe: 'Technikaffine Expats',
  },
  {
    icon: '🏦',
    name: 'SBI (State Bank of India)',
    handle: '@oksbi',
    detailsEn: ['Foreigners: ✅ Most branches', 'Widest ATM network in India', 'App: YONO SBI'],
    detailsDe: ['Ausländer: ✅ Meiste Filialen', 'Breitestes Geldautomaten-Netz Indiens', 'App: YONO SBI'],
    bestEn: 'Long-term residents',
    bestDe: 'Langzeitbewohner',
  },
  {
    icon: '🏦',
    name: 'Axis Bank',
    handle: '@axl',
    detailsEn: ['Foreigners: ✅', 'English service: ✅ Good', 'App: Axis Mobile'],
    detailsDe: ['Ausländer: ✅', 'Englischer Service: ✅ Gut', 'App: Axis Mobile'],
    bestEn: 'Digital-first expats',
    bestDe: 'Digital-affine Expats',
  },
];

const TIPS_EN = [
  'Get a Jio SIM at the airport — cheapest and fastest to activate',
  'Open an HDFC account online before arrival if possible',
  'Link Aadhaar to your bank account if you have one (increases limits)',
  'Enable international transactions on your home debit card as backup',
  'Keep a Wise card as emergency backup — best exchange rates for INR',
];
const TIPS_DE = [
  'Hole dir eine Jio-SIM am Flughafen — günstigste und schnellste Aktivierung',
  'Eröffne ein HDFC-Konto wenn möglich online vor der Einreise',
  'Verknüpfe Aadhaar mit deinem Bankkonto (erhöht Limits)',
  'Aktiviere internationale Transaktionen auf deiner heimischen Debitkarte als Backup',
  'Behalte eine Wise-Karte als Notfall-Backup — bester INR-Kurs',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india/upi-for-foreigners' },
};

export default function UpiForForeignersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-upi-foreigners" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
            style={{ backgroundColor: '#FF6B00' }}
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
          { label: locale === 'de' ? 'UPI für Ausländer' : 'UPI for Foreigners' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'UPI für Ausländer und Expats in Indien' : 'UPI for Foreigners and Expats in India'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Lebst du in Indien? So bekommst du vollen UPI-Zugang'
            : "Living in India? Here's how to get full UPI access"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Three Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Drei Arten ausländischer Nutzer' : 'Three Types of Foreign Users'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {USER_TYPES.map((t) => (
              <div key={t.roleEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="text-3xl">{t.icon}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{locale === 'de' ? t.roleDe : t.roleEn}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{locale === 'de' ? t.subDe : t.subEn}</p>
                </div>
                <p className="text-xs text-slate-700 font-medium bg-slate-50 rounded-lg px-3 py-2">
                  → {locale === 'de' ? t.solutionDe : t.solutionEn}
                </p>
                {t.linkHref && (
                  <Link
                    href={t.linkHref}
                    className="text-xs text-blue-700 font-medium hover:underline"
                  >
                    {locale === 'de' ? t.linkDe : t.linkEn}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Requirements table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Anforderungen im Vergleich' : 'Requirements Comparison'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Anforderung', 'Tourist', 'Expat', 'NRI']
                    : ['Requirement', 'Tourist', 'Expat', 'NRI']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {REQUIREMENTS_TABLE.map((row) => (
                  <tr key={row.featureEn} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.featureDe : row.featureEn}</td>
                    <td className="px-4 py-3 text-slate-600">{row.tourist}</td>
                    <td className="px-4 py-3 text-slate-600">{row.expat}</td>
                    <td className="px-4 py-3 text-slate-600">{row.nri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Expat steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'So registrieren sich Expats für UPI' : 'How Expats Register for UPI'}
          </h2>
          <StepList steps={locale === 'de' ? EXPAT_STEPS_DE : EXPAT_STEPS_EN} />
        </section>

        {/* Expat-friendly banks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Ausländerfreundliche Banken in Indien' : 'Expat-Friendly Banks in India'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BANKS.map((bank) => (
              <div key={bank.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{bank.icon}</span>
                    <h3 className="font-semibold text-slate-900 text-sm">{bank.name}</h3>
                  </div>
                  <code className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{bank.handle}</code>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {(locale === 'de' ? bank.detailsDe : bank.detailsEn).map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 border-t border-slate-100 pt-2">
                  <span className="font-semibold text-slate-600">{locale === 'de' ? 'Am besten für:' : 'Best for:'}</span>{' '}
                  {locale === 'de' ? bank.bestDe : bank.bestEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* NRI section */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'UPI-Guide für NRIs' : 'NRI UPI Guide'}
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
            {locale === 'de' ? (
              <>
                <p>
                  NRIs (Personen indischer Herkunft, die im Ausland leben) können UPI über ein
                  <strong> NRE/NRO-Konto</strong> nutzen. Das Besondere: UPI funktioniert auch mit einer
                  internationalen SIM-Karte für OTP-Empfang.
                </p>
                <ul className="text-sm space-y-1.5">
                  <li>• <strong>IDFC First Bank</strong> und <strong>Yes Bank</strong> sind bei NRIs besonders beliebt</li>
                  <li>• UPI-Handle wird mit der indischen Nummer verknüpft</li>
                  <li>• Senden und Empfangen in INR möglich</li>
                  <li>• Einige Banken erlauben Überweisungen ins Ausland über NRE-Konto</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  NRIs (people of Indian origin living abroad) can use UPI via an
                  <strong> NRE/NRO account</strong>. Uniquely, UPI also works with an international SIM
                  for OTP reception.
                </p>
                <ul className="text-sm space-y-1.5">
                  <li>• <strong>IDFC First Bank</strong> and <strong>Yes Bank</strong> are particularly popular among NRIs</li>
                  <li>• UPI handle is linked to the registered Indian phone number</li>
                  <li>• Can send and receive in INR</li>
                  <li>• Some banks allow international transfers via NRE account</li>
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Practical tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Praktische Expat-Tipps' : 'Practical Expat Tips'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? TIPS_DE : TIPS_EN).map((tip) => (
              <li key={tip} className="flex gap-3 text-sm text-slate-700 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                <span className="text-orange-500 font-bold flex-shrink-0">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Empfängst du Zahlungen als Expat oder Händler?' : 'Receiving payments as an expat or merchant?'}
          </p>
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'UPI-QR-Code erstellen →' : 'Generate UPI QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indien' : 'Related in India'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'UPI Touristen-Guide' : 'UPI Tourist Guide'}
              url="/guides/india/upi-tourist-guide"
              description={locale === 'de' ? 'Für Kurzzeitbesucher ohne indisches Bankkonto' : 'For short-term visitors without an Indian bank account'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man UPI benutzt' : 'How to Use UPI'}
              url="/guides/india/how-to-use-upi"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
