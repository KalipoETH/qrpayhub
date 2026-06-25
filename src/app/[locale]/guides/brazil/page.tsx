import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Paying in Brazil as a Tourist 2026 – PIX Payment Complete Guide';
const TITLE_DE = 'In Brasilien bezahlen als Tourist 2026 – Der komplette PIX-Zahlungsguide';
const DESC_EN =
  'Complete guide to PIX payments in Brazil. 150 million users, instant 24/7 transfers. How tourists can pay with PIX and which apps work without a Brazilian account.';
const DESC_DE =
  'Der komplette Guide für PIX-Zahlungen in Brasilien. 150 Millionen Nutzer, sofortige 24/7-Überweisungen. Wie Touristen mit PIX bezahlen können und welche Apps ohne brasilianisches Konto funktionieren.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: [
      'brazil payment tourist',
      'pix tourist',
      'paying in brazil',
      'brazil cashless travel',
      'pix for foreigners',
      'mercado pago brazil tourist',
      'pix cpf',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil'),
    openGraph: buildOpenGraph(locale, '/guides/brazil', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://qrpayhub.com/en/guides' },
      { '@type': 'ListItem', position: 3, name: 'Brazil', item: 'https://qrpayhub.com/en/guides/brazil' },
    ],
  },
};

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

const SUB_PAGES: SubPage[] = [
  { icon: '📖', title: 'How to Use PIX',       description: 'Step-by-step: scan, pay and send with PIX',              href: '/guides/brazil/how-to-use-pix' },
  { icon: '🌍', title: 'PIX Tourist Guide',    description: 'Can foreigners use PIX? Mercado Pago solution',          href: '/guides/brazil/pix-tourist-guide' },
  { icon: '📱', title: 'PIX QR Code Explained', description: 'How the PIX QR format technically works',               href: '/guides/brazil/pix-qr-code-explained' },
  { icon: '🤳', title: 'PIX for Foreigners',   description: 'Long-term visitors: how to get full PIX access',         href: '/guides/brazil/pix-for-foreigners' },
  { icon: '✈️', title: 'Cashless Travel Brazil', description: 'Going cash-free across Rio, São Paulo and beyond',     href: '/guides/brazil/cashless-travel-brazil' },
  { icon: '📷', title: 'Scan PIX QR Code',     description: 'Scan a PIX code with Nubank, Itaú or Mercado Pago',     href: '/guides/brazil/scan-pix-qr-code' },
  { icon: '🔑', title: 'PIX Keys Explained',   description: 'CPF, CNPJ, phone, email and random keys explained',     href: '/guides/brazil/pix-keys-explained' },
];

const SUB_PAGES_DE: SubPage[] = [
  { ...SUB_PAGES[0], title: 'Wie man PIX benutzt',          description: 'Schritt für Schritt: scannen, bezahlen und senden mit PIX' },
  { ...SUB_PAGES[1], title: 'PIX Touristen-Guide',          description: 'Können Ausländer PIX nutzen? Die Mercado-Pago-Lösung' },
  { ...SUB_PAGES[2], title: 'PIX-QR-Code erklärt',          description: 'Wie das PIX-QR-Format technisch funktioniert' },
  { ...SUB_PAGES[3], title: 'PIX für Ausländer',            description: 'Langzeitbesucher: So bekommst du vollen PIX-Zugang' },
  { ...SUB_PAGES[4], title: 'Bargeldlos reisen',            description: 'Bargeldlos durch Rio, São Paulo und mehr' },
  { ...SUB_PAGES[5], title: 'PIX-QR scannen',               description: 'Einen PIX-Code mit Nubank, Itaú oder Mercado Pago scannen' },
  { ...SUB_PAGES[6], title: 'PIX-Schlüssel erklärt',        description: 'CPF, CNPJ, Telefon, E-Mail und Zufallsschlüssel erklärt' },
];

const QUICK_FACTS = (locale: 'en' | 'de') => [
  { icon: '💳', value: 'PIX',                   label: locale === 'de' ? 'Hauptsystem' : 'Main System' },
  { icon: '📱', value: 'Nubank · Itaú · MP',    label: locale === 'de' ? 'Top-Apps' : 'Top Apps' },
  { icon: '🌍', value: locale === 'de' ? 'Nur Inland' : 'Domestic only', label: locale === 'de' ? 'Grenzüberschreitend' : 'Cross-border' },
  { icon: '💰', value: 'R$ BRL',                label: locale === 'de' ? 'Währung' : 'Currency' },
];

const WHERE_ACCEPTED = [
  { icon: '🏪', en: 'Supermarkets (Pão de Açúcar, Carrefour, Extra)', de: 'Supermärkte (Pão de Açúcar, Carrefour, Extra)' },
  { icon: '🍖', en: 'Restaurants and churrascarias', de: 'Restaurants und Churrascarias' },
  { icon: '🚕', en: 'Taxis and rideshare (99, Uber)', de: 'Taxis und Rideshare (99, Uber)' },
  { icon: '🏨', en: 'Hotels and pousadas', de: 'Hotels und Pousadas' },
  { icon: '🛍️', en: 'Shopping malls', de: 'Einkaufszentren' },
  { icon: '⛱️', en: 'Beaches and beach kiosks', de: 'Strände und Strandkioske' },
  { icon: '🎉', en: 'Events and festivals', de: 'Veranstaltungen und Festivals' },
  { icon: '💊', en: 'Pharmacies (Droga Raia, Ultrafarma)', de: 'Apotheken (Droga Raia, Ultrafarma)' },
];

export default function BrazilGuideHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-brazil-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const facts = QUICK_FACTS(locale);
  const subPages = locale === 'de' ? SUB_PAGES_DE : SUB_PAGES;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border" style={{ backgroundColor: '#f0fdf4', color: '#00B894', borderColor: '#bbf7d0' }}>
          <Flag code="br" /> {locale === 'de' ? 'Aktualisiert Juni 2026' : 'Updated June 2026'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {locale === 'de' ? 'In Brasilien bezahlen als Tourist' : 'Paying in Brazil as a Tourist'}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'PIX – Brasiliens Zahlungsrevolution'
            : 'PIX – Brazil\'s instant payment revolution'}
        </p>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {facts.map(({ icon, value, label }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-lg font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── Reality Check Banner ─────────────────────────────────────────── */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <p className="text-xl font-bold text-amber-800">
          ⚠️ {locale === 'de' ? 'PIX erfordert eine brasilianische CPF-Nummer für vollen Zugang' : 'PIX requires a Brazilian CPF number for full access'}
        </p>
        <p className="text-amber-700 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Standard-PIX erfordert eine brasilianische Steuernummer (CPF). Touristen können jedoch Mercado Pago mit einem ausländischen Konto nutzen. Hier erfährst du genau, was für Besucher funktioniert.'
            : 'Standard PIX requires a Brazilian tax number (CPF). However, tourists can use Mercado Pago with a foreign account. Here\'s exactly what works for visitors.'}
        </p>
      </section>

      {/* ── In This Guide ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'In diesem Guide' : 'In This Guide'}
        </h2>
        <SubPageGrid pages={subPages} />
      </section>

      {/* ── PIX Revolution ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'PIX – Brasiliens Zahlungsrevolution' : "PIX – Brazil's Payment Revolution"}
        </h2>
        <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
          {locale === 'de' ? (
            <>
              <p>
                Der <strong>Banco Central do Brasil</strong> führte PIX am 16. November 2020 ein. Das
                System erzielte die <strong>schnellste Massenadoption</strong> eines Zahlungssystems
                weltweit — in nur 5 Monaten 100 Millionen Nutzer und mehr Transaktionsvolumen als
                Kreditkarten im ersten Jahr.
              </p>
              <p>
                Heute verarbeitet PIX über <strong>3 Milliarden Transaktionen pro Monat</strong>.
                Mehr als <strong>150 Millionen Nutzer</strong> sind registriert, und über
                <strong> 700 Banken und Fintechs</strong> sind am Netzwerk beteiligt. PIX ist rund
                um die Uhr verfügbar — 24/7/365, komplett kostenlos für Privatpersonen.
              </p>
              <p>
                PIX hat TED und DOC für alltägliche Überweisungen ersetzt und funktioniert für
                P2P-Zahlungen, Händlerzahlungen und sogar Regierungszahlungen. Überweisungen
                werden in unter 10 Sekunden abgewickelt — auch an Wochenenden und Feiertagen.
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Banco Central do Brasil</strong> launched PIX on November 16, 2020.
                It achieved the <strong>fastest mass adoption</strong> of any payment system
                globally — reaching 100 million users in just 5 months and surpassing credit
                cards in transaction volume within its first year.
              </p>
              <p>
                Today PIX processes over <strong>3 billion transactions per month</strong>.
                More than <strong>150 million users</strong> are registered, and over
                <strong> 700 banks and fintechs</strong> participate in the network. PIX is
                available 24/7/365, completely free for individuals.
              </p>
              <p>
                PIX has replaced TED and DOC for everyday transfers and works for P2P, merchant
                and government payments. Transfers settle in under 10 seconds — including weekends
                and bank holidays.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── Can Tourists Use PIX? ────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Können Touristen PIX nutzen?' : 'Can Tourists Use PIX?'}
        </h2>
        <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
          {locale === 'de' ? (
            <>
              <p>
                <strong>Standard-PIX</strong> erfordert eine brasilianische CPF-Steuernummer und
                ein brasilianisches Bankkonto. Für Touristen gibt es jedoch eine praktische
                Alternative:
              </p>
              <p>
                <strong>Mercado Pago</strong> — Lateinamerikas größtes Fintech — ermöglicht
                ausländischen Nutzern die Registrierung:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Registrierung mit Reisepass und ausländischer E-Mail-Adresse</li>
                <li>Internationale Visa/Mastercard verknüpfen</li>
                <li>Bei Millionen brasilianischer Händler bezahlen</li>
                <li>App auch auf Englisch verfügbar</li>
              </ul>
              <p>
                <strong>Langzeitbesucher:</strong> Wer länger als 2 Monate bleibt, kann eine
                CPF bei der Receita Federal beantragen und erhält damit vollen PIX-Zugang.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Standard PIX</strong> requires a Brazilian CPF tax number and a Brazilian
                bank account. However, there is a practical solution for tourists:
              </p>
              <p>
                <strong>Mercado Pago</strong> — Latin America's largest fintech — accepts foreign
                users:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Register with passport and foreign email address</li>
                <li>Link international Visa/Mastercard</li>
                <li>Pay at millions of Brazilian merchants</li>
                <li>App available in English</li>
              </ul>
              <p>
                <strong>Long-term visitors:</strong> Those staying 2+ months can get a CPF at the
                Receita Federal, which unlocks full PIX access.
              </p>
            </>
          )}
        </div>
        <p className="text-sm">
          <Link href="/guides/brazil/pix-tourist-guide" className="text-blue-700 font-medium hover:underline">
            {locale === 'de' ? 'Vollständigen Touristen-Guide lesen →' : 'Read the full tourist guide →'}
          </Link>
        </p>
      </section>

      {/* ── Where Accepted ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Wo PIX akzeptiert wird' : 'Where PIX is Accepted'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHERE_ACCEPTED.map(({ icon, en, de }) => (
            <div key={en} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <span className="text-sm text-slate-700 font-medium">{locale === 'de' ? de : en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Generator CTA ────────────────────────────────────────────────── */}
      <section className="rounded-2xl p-6 sm:p-8 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
          {locale === 'de'
            ? 'Bist du Händler oder empfängst Zahlungen in Brasilien?'
            : 'Are you a merchant or receiving payments in Brazil?'}
        </p>
        <Link
          href="/pix/generator"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
          style={{ backgroundColor: '#00B894' }}
        >
          {locale === 'de' ? 'PIX-QR-Code erstellen →' : 'Generate your PIX QR code →'}
        </Link>
      </section>

      {/* ── Related Guides ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Weitere Reiseguides' : 'Related Guides'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { flag: 'th', name: locale === 'de' ? 'Bezahlen in Thailand 🇹🇭' : 'Paying in Thailand 🇹🇭', href: '/guides/thailand' },
            { flag: 'id', name: locale === 'de' ? 'Bezahlen in Indonesien 🇮🇩' : 'Paying in Indonesia 🇮🇩', href: '/guides/indonesia' },
            { flag: 'in', name: locale === 'de' ? 'Bezahlen in Indien 🇮🇳' : 'Paying in India 🇮🇳', href: '/guides/india' },
          ].map(({ flag, name, href }) => (
            <Link
              key={flag}
              href={href as `/${string}`}
              className="relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
            >
              <Flag code={flag} className="text-2xl flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700">{name}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
