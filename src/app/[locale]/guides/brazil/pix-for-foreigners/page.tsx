import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PIX for Foreigners & Expats in Brazil 2026 – Complete Guide';
const TITLE_DE = 'PIX für Ausländer und Expats in Brasilien 2026 – Kompletter Guide';
const DESC_EN =
  'Foreigners and expats in Brazil can get full PIX access with a CPF number and Brazilian bank account. Which banks are expat-friendly and how to register.';
const DESC_DE =
  'Ausländer und Expats in Brasilien können mit einer CPF-Nummer und einem brasilianischen Bankkonto vollen PIX-Zugang erhalten. Welche Banken ausländerfreundlich sind und wie man sich registriert.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['pix foreigners', 'pix expat brazil', 'cpf foreigner brazil', 'nubank foreigner', 'open bank account brazil foreigner'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/pix-for-foreigners'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/pix-for-foreigners', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const USER_TYPES = (locale: 'en' | 'de') => [
  {
    icon: '🏖️',
    title: locale === 'de' ? 'Tourist (Kurzbesuch)' : 'Tourist (Short Visit)',
    lines: [
      locale === 'de' ? '→ Mercado Pago mit ausländischer Karte' : '→ Mercado Pago with foreign card',
      locale === 'de' ? '→ Kein CPF nötig' : '→ No CPF needed',
    ],
    link:  { label: locale === 'de' ? 'PIX Touristen-Guide →' : 'PIX Tourist Guide →', href: '/guides/brazil/pix-tourist-guide' },
  },
  {
    icon: '🏢',
    title: locale === 'de' ? 'Expat / Langzeitbesucher (3+ Monate)' : 'Expat / Long-term (3+ months)',
    lines: [
      locale === 'de' ? '→ Voller PIX-Zugang via CPF + brasilianische Bank' : '→ Full PIX via CPF + Brazilian bank',
      locale === 'de' ? '→ Bestes Nutzererlebnis' : '→ Best experience',
    ],
    link: null,
  },
  {
    icon: '🌏',
    title: locale === 'de' ? 'Daueraufenthalt / Permanent' : 'Long-term Resident / Permanent',
    lines: [
      locale === 'de' ? '→ Voller Zugang wie brasilianische Staatsbürger' : '→ Full access like Brazilian citizens',
      locale === 'de' ? '→ Alle Funktionen freigeschaltet' : '→ All features unlocked',
    ],
    link: null,
  },
];

const CPF_METHODS = (locale: 'en' | 'de') => [
  {
    num: 1,
    title: locale === 'de' ? 'Online (cpf.receita.fazenda.gov.br)' : 'Online (cpf.receita.fazenda.gov.br)',
    lines: [
      locale === 'de' ? 'Für die meisten Ausländer am einfachsten' : 'Easiest for most foreigners',
      locale === 'de' ? 'Bearbeitungszeit: 1–10 Werktage' : 'Takes 1–10 business days',
    ],
  },
  {
    num: 2,
    title: locale === 'de' ? 'Brasilianisches Konsulat im Ausland' : 'Brazilian consulate abroad',
    lines: [
      locale === 'de' ? 'Vor der Einreise nach Brasilien beantragen' : 'Before arriving in Brazil',
      locale === 'de' ? 'Beste Option für vorausschauende Planung' : 'Best option for planning ahead',
    ],
  },
  {
    num: 3,
    title: locale === 'de' ? 'Receita-Federal-Büro in Brasilien' : 'Receita Federal office in Brazil',
    lines: [
      locale === 'de' ? 'Persönlich vor Ort' : 'In person',
      locale === 'de' ? 'In manchen Fällen sofortige Ausstellung' : 'Immediate in some cases',
    ],
  },
];

const BANK_REQUIREMENTS = (locale: 'en' | 'de') => ({
  headers: locale === 'de'
    ? ['Voraussetzung', 'Tourist', 'Expat', 'Bewohner']
    : ['Requirement', 'Tourist', 'Expat', 'Resident'],
  rows: [
    { req: 'CPF',                                              t: '✅', e: '✅', r: '✅' },
    { req: locale === 'de' ? 'Reisepass' : 'Passport',        t: '✅', e: '✅', r: '✅' },
    { req: locale === 'de' ? 'Brasilianische Adresse' : 'Brazilian address', t: '⚠️', e: '✅', r: '✅' },
    { req: locale === 'de' ? 'Einkommensnachweis' : 'Proof of income',       t: '❌', e: '⚠️', r: '⚠️' },
  ],
});

const BANKS = (locale: 'en' | 'de') => [
  {
    icon: '🏦',
    name: 'Nubank',
    tag: locale === 'de' ? 'Digital' : 'Digital',
    tagColor: '#00B894',
    ok: locale === 'de' ? '✅ Mit CPF' : '✅ With CPF',
    points: [
      locale === 'de' ? '100% digital, keine Filiale nötig' : '100% digital, no branches needed',
      locale === 'de' ? 'Englischer Support verfügbar' : 'English support available',
      locale === 'de' ? 'Keine monatlichen Gebühren' : 'No monthly fees',
    ],
    bestFor: locale === 'de' ? 'Die meisten Ausländer' : 'Most foreigners',
  },
  {
    icon: '🏦',
    name: 'Banco do Brasil',
    tag: locale === 'de' ? 'Filialnetz' : 'Branches',
    tagColor: '#f59e0b',
    ok: '✅',
    points: [
      locale === 'de' ? 'Breitestes Filialnetz' : 'Widest branch network',
      locale === 'de' ? 'Gut für nicht-digitale Nutzer' : 'Good for non-digital users',
    ],
    bestFor: locale === 'de' ? 'Ländliche Gebiete' : 'Rural areas',
  },
  {
    icon: '🏦',
    name: 'Itaú',
    tag: locale === 'de' ? 'Premium' : 'Premium',
    tagColor: '#f97316',
    ok: locale === 'de' ? '✅ Mit CPF' : '✅ With CPF',
    points: [
      locale === 'de' ? 'Premium-Service' : 'Premium service',
      locale === 'de' ? 'Guter englischer Support' : 'Good English support',
    ],
    bestFor: locale === 'de' ? 'Berufstätige' : 'Professionals',
  },
  {
    icon: '🏦',
    name: 'Caixa Econômica Federal',
    tag: locale === 'de' ? 'Staatlich' : 'Government',
    tagColor: '#6366f1',
    ok: '✅',
    points: [
      locale === 'de' ? 'Staatliche Bank' : 'Government bank',
      locale === 'de' ? 'Breites Geldautomatennetz' : 'Wide ATM network',
    ],
    bestFor: locale === 'de' ? 'Behördenangelegenheiten' : 'Government interactions',
  },
];

const PIX_KEY_STEPS = (locale: 'en' | 'de') => [
  locale === 'de' ? 'Banking-App öffnen' : 'Open your banking app',
  locale === 'de' ? 'Zu PIX → "Minhas Chaves" gehen' : 'Go to PIX → "Minhas Chaves"',
  locale === 'de' ? 'Bis zu 5 Schlüssel pro Konto registrieren: CPF, brasilianische Telefonnummer, E-Mail-Adresse, Zufallsschlüssel (UUID)' : 'Register up to 5 keys per account: CPF, Brazilian phone number, email address, random key (UUID)',
  locale === 'de' ? 'Per SMS/E-Mail bestätigen' : 'Confirm via SMS/email',
  locale === 'de' ? 'Schlüssel innerhalb von Minuten aktiv!' : 'Keys active within minutes!',
];

const TIPS = (locale: 'en' | 'de') => [
  locale === 'de' ? 'CPF vor Kontoeröffnung beantragen' : 'Get CPF before opening bank account',
  locale === 'de' ? 'Nubank ist am einfachsten für digitale Nomaden' : 'Nubank is easiest for digital nomads',
  locale === 'de' ? 'Alle 4 PIX-Schlüsseltypen registrieren' : 'Register all 4 PIX key types',
  locale === 'de' ? 'PIX-Tageslimit in der App erhöhen (24h Wartezeit)' : 'Enable PIX limits increase for daytime (24h wait)',
  locale === 'de' ? 'Mercado Pago als Backup behalten' : 'Keep Mercado Pago as a backup',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil/pix-for-foreigners' },
};

export default function PixForForeignersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-pix-foreigners" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const userTypes    = USER_TYPES(locale);
  const cpfMethods   = CPF_METHODS(locale);
  const bankReqs     = BANK_REQUIREMENTS(locale);
  const banks        = BANKS(locale);
  const pixKeySteps  = PIX_KEY_STEPS(locale);
  const tips         = TIPS(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'PIX für Ausländer' : 'PIX for Foreigners' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PIX für Ausländer und Expats in Brasilien' : 'PIX for Foreigners and Expats in Brazil'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Leben in Brasilien? So bekommst du vollen PIX-Zugang'
            : "Living in Brazil? Here's how to get full PIX access"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Three user types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Drei Arten ausländischer Nutzer' : 'Three Types of Foreign Users'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {userTypes.map((ut) => (
              <div key={ut.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="text-3xl">{ut.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm">{ut.title}</h3>
                <ul className="text-xs text-slate-600 space-y-1">
                  {ut.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
                {ut.link && (
                  <Link href={ut.link.href as `/${string}`} className="text-xs font-medium text-blue-700 hover:underline">
                    {ut.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Getting CPF */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'CPF als Ausländer beantragen' : 'Getting CPF as a Foreigner'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            <p>
              {locale === 'de'
                ? 'Die CPF (Cadastro de Pessoas Físicas) ist Brasiliens individuelle Steuernummer. Jeder Ausländer kann sie beantragen — sie ist die Voraussetzung für ein brasilianisches Bankkonto und PIX.'
                : "The CPF (Cadastro de Pessoas Físicas) is Brazil's individual taxpayer number. Every foreigner can apply — it is the prerequisite for a Brazilian bank account and PIX."}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1 text-sm">
              <p className="font-semibold text-slate-800">{locale === 'de' ? 'Voraussetzungen' : 'Requirements'}</p>
              <ul className="text-slate-600 space-y-0.5">
                <li>• {locale === 'de' ? 'Gültiger Reisepass' : 'Valid passport'}</li>
                <li>• {locale === 'de' ? 'Brasilianischer Einreisestempel oder Visum' : 'Brazilian entry stamp (or visa)'}</li>
                <li>• {locale === 'de' ? 'Adressnachweis (optional für Basisregistrierung)' : 'Proof of address (optional for basic registration)'}</li>
                <li>• {locale === 'de' ? 'Kosten: Kostenlos' : 'Cost: Free'}</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            {cpfMethods.map((m) => (
              <div key={m.num} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#00B894' }}
                >
                  {m.num}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-slate-800">{m.title}</p>
                  <ul className="text-xs text-slate-500 mt-0.5 space-y-0.5">
                    {m.lines.map((l) => <li key={l}>— {l}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opening Brazilian bank account */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Brasilianisches Bankkonto eröffnen' : 'Opening a Brazilian Bank Account'}
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {bankReqs.headers.map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bankReqs.rows.map((row) => (
                  <tr key={row.req} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.req}</td>
                    <td className="px-4 py-3 text-center">{row.t}</td>
                    <td className="px-4 py-3 text-center">{row.e}</td>
                    <td className="px-4 py-3 text-center">{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {banks.map((bank) => (
              <div key={bank.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{bank.icon} {bank.name}</p>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: bank.tagColor }}
                  >
                    {bank.tag}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  {locale === 'de' ? 'Ausländer: ' : 'Foreigners: '}{bank.ok}
                </p>
                <ul className="text-xs text-slate-600 space-y-0.5">
                  {bank.points.map((p) => <li key={p}>• {p}</li>)}
                </ul>
                <p className="text-xs text-slate-400">
                  {locale === 'de' ? 'Am besten für: ' : 'Best for: '}<span className="font-medium text-slate-600">{bank.bestFor}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Registering PIX keys */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Schlüssel registrieren' : 'Registering PIX Keys'}
          </h2>
          <ol className="space-y-3">
            {pixKeySteps.map((text, i) => (
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
        </section>

        {/* Practical tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Praktische Tipps für Expats' : 'Practical Tips for Expats'}
          </h2>
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span style={{ color: '#00B894' }} className="font-bold text-lg leading-none">✓</span>
                <span className="text-sm text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de' ? 'PIX-QR-Code für dein brasilianisches Konto erstellen' : 'Generate a PIX QR code for your Brazilian account'}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="🌍"
              name={locale === 'de' ? 'PIX Touristen-Guide' : 'PIX Tourist Guide'}
              url="/guides/brazil/pix-tourist-guide"
              description={locale === 'de' ? 'Kurzbesucher: Mercado-Pago-Lösung' : 'Short-stay visitors: Mercado Pago solution'}
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
              icon="✈️"
              name={locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel Brazil'}
              url="/guides/brazil/cashless-travel-brazil"
              description={locale === 'de' ? 'Städteguide: Rio, SP, Florianópolis' : 'City guide: Rio, SP, Florianópolis'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
