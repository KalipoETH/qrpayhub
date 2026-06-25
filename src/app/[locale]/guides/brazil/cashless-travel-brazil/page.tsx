import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Cashless Travel in Brazil 2026 – Digital Payment Guide for Tourists';
const TITLE_DE = 'Bargeldlos reisen in Brasilien 2026 – Digitaler Zahlungsguide für Touristen';
const DESC_EN =
  'Travel Brazil cashlessly. PIX, Mercado Pago and Wise card work in most cities. City-by-city cashless guide for Rio, São Paulo and more.';
const DESC_DE =
  'Brasilien bargeldlos bereisen. PIX, Mercado Pago und die Wise-Karte funktionieren in den meisten Städten. Städteweiser Bargeldlos-Guide für Rio, São Paulo und mehr.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['cashless brazil', 'cashless rio de janeiro', 'cashless sao paulo', 'brazil travel payment', 'pix tourist brazil', 'wise card brazil'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/cashless-travel-brazil'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/cashless-travel-brazil', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const CASHLESS_METERS = (locale: 'en' | 'de') => [
  { city: 'São Paulo',                    pct: 88 },
  { city: locale === 'de' ? 'Rio de Janeiro (Touristen)' : 'Rio de Janeiro (tourist)', pct: 78 },
  { city: 'Florianópolis',                pct: 72 },
  { city: 'Curitiba',                     pct: 75 },
  { city: locale === 'de' ? 'Salvador (Touristenbereiche)' : 'Salvador tourist areas', pct: 65 },
  { city: locale === 'de' ? 'Kleinstädte' : 'Small towns',  pct: 40 },
  { city: locale === 'de' ? 'Ländliche Gebiete' : 'Rural areas', pct: 20 },
];

const PAYMENT_METHODS = (locale: 'en' | 'de') => [
  {
    rank: '🥇', name: `PIX (${locale === 'de' ? 'mit CPF/Mercado Pago' : 'if you have CPF/Mercado Pago'})`,
    stars: 5,
    points: [
      locale === 'de' ? 'Kostenlos, sofortig, 700+ Banken' : 'Free, instant, 700+ banks',
    ],
  },
  {
    rank: '🥈', name: `Mercado Pago (${locale === 'de' ? 'Touristen' : 'tourists'})`,
    stars: 5,
    points: [
      locale === 'de' ? 'Funktioniert mit ausländischer Karte' : 'Works with foreign card',
      locale === 'de' ? 'Millionen Händler akzeptieren es' : 'Accepted at millions of merchants',
    ],
  },
  {
    rank: '🥉', name: 'Wise Card',
    stars: 4,
    points: [
      locale === 'de' ? 'Bester Wechselkurs (BRL)' : 'Best exchange rate (BRL)',
    ],
  },
  {
    rank: '💳', name: locale === 'de' ? 'Internationale Visa/Mastercard' : 'International Visa/Mastercard',
    stars: 3,
    points: [
      locale === 'de' ? 'Hotels, Einkaufszentren' : 'Hotels, shopping malls',
      locale === 'de' ? '~3–5% Auslandsgebühr' : '~3–5% foreign fee',
    ],
  },
  {
    rank: '🏧', name: locale === 'de' ? 'Geldautomat (Bargeld BRL)' : 'ATM (Cash BRL)',
    stars: 2,
    points: [
      locale === 'de' ? 'In Städten verfügbar' : 'Available in cities',
      locale === 'de' ? 'Hohe Gebühren (R$30–60)' : 'High fees (R$30–60)',
    ],
  },
];

const APPS = (locale: 'en' | 'de') => [
  { name: 'Mercado Pago', desc: locale === 'de' ? 'PIX + Zahlungen' : 'PIX + payments', must: true },
  { name: '99 / Uber',    desc: locale === 'de' ? 'Transport' : 'Transport',              must: true },
  { name: 'iFood',        desc: locale === 'de' ? 'Essenslieferung' : 'Food delivery',    must: true },
  { name: 'Wise',         desc: locale === 'de' ? 'Karte + Wechsel' : 'Card + exchange',  must: true },
  { name: 'Google Maps',  desc: locale === 'de' ? 'Navigation' : 'Navigate',              must: true },
  { name: 'WhatsApp',     desc: locale === 'de' ? 'Alle nutzen es' : 'Everyone uses it',  must: true },
];

const CITIES = (locale: 'en' | 'de') => [
  {
    name: 'São Paulo',
    items: locale === 'de' ? [
      'Metro: Bilhete-Único-Karte',
      'Uber/99: Karte + PIX',
      'Avenida Paulista: Alle Zahlungsmethoden',
      'Mercadão (Markthalle): PIX + Karten',
      'Restaurants: PIX sehr verbreitet',
      'Nachtleben (Vila Madalena): Mix',
      'Einkaufszentren: Alle Methoden',
    ] : [
      'Metro: Bilhete Único card',
      'Uber/99: Card + PIX',
      'Paulista Ave: All payment methods',
      'Mercadão (central market): PIX + cards',
      'Restaurants: PIX very common',
      'Nightlife (Vila Madalena): Mix',
      'Shopping malls: All methods',
    ],
  },
  {
    name: 'Rio de Janeiro',
    items: locale === 'de' ? [
      'Metro: RioCard oder kontaktlos',
      'Uber/99: Karte + PIX',
      'Ipanema/Copacabana Restaurants: PIX + Karten',
      'Strandverkäufer: Bargeld oder PIX',
      'Santa Teresa: Mix',
      'Zuckerhut/Christusstatue: Karten + PIX',
    ] : [
      'Metro: RioCard or contactless',
      'Uber/99: Card + PIX',
      'Ipanema/Copacabana restaurants: PIX + cards',
      'Beach vendors: Cash or PIX',
      'Santa Teresa: Mix',
      'Sugarloaf/Christ the Redeemer: Cards + PIX',
    ],
  },
  {
    name: 'Florianópolis',
    items: locale === 'de' ? [
      'Touristenrestaurants: PIX + Karten',
      'Strandkioske: PIX wächst',
      'Centro: PIX überall',
      'Lagoa da Conceição Bars: Mix',
    ] : [
      'Tourist restaurants: PIX + cards',
      'Beach kiosks: Growing PIX',
      'Centro: PIX everywhere',
      'Lagoa da Conceição bars: Mix',
    ],
  },
  {
    name: 'Salvador (Bahia)',
    items: locale === 'de' ? [
      'Historisches Zentrum (Pelourinho): Mix',
      'Restaurants: PIX + Karten',
      'Taxis: Verhandeln + PIX',
    ] : [
      'Historic center (Pelourinho): Mix',
      'Restaurants: PIX + cards',
      'Taxis: Negotiate + PIX',
    ],
  },
  {
    name: locale === 'de' ? 'Fortaleza / Nordosten' : 'Fortaleza / Northeast',
    items: locale === 'de' ? [
      'Touristengebiete: PIX wächst',
      'Strände: Mix aus PIX + Bargeld',
      'Märkte: Bargeld bevorzugen (beim Verhandeln)',
    ] : [
      'Tourist areas: PIX growing',
      'Beaches: Mix of PIX + cash',
      'Markets: Prefer cash for negotiating',
    ],
  },
];

const SAFETY_TIPS = (locale: 'en' | 'de') => [
  locale === 'de' ? 'Handy in weniger sicheren Gegenden nicht sichtbar benutzen' : "Don't use your phone visibly in less safe areas",
  locale === 'de' ? 'PIX-Offline-Modus verwenden, wenn möglich' : 'Use PIX offline mode when possible',
  locale === 'de' ? 'Bargeld auf mehrere Orte aufteilen' : 'Split cash into multiple locations',
  locale === 'de' ? 'Uber statt Straßentaxis bevorzugen' : 'Prefer Uber over street taxis',
  locale === 'de' ? 'Nachtlimit bei PIX schützt dich (max. R$1.000)' : 'Night limit on PIX protects you (R$1,000 max)',
  locale === 'de' ? 'Alle PIX-Bestätigungen screenshotten' : 'Screenshot all PIX confirmations',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil/cashless-travel-brazil' },
};

export default function CashlessTravelBrazilPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-cashless-brazil" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {'⭐'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const meters  = CASHLESS_METERS(locale);
  const methods = PAYMENT_METHODS(locale);
  const apps    = APPS(locale);
  const cities  = CITIES(locale);
  const safety  = SAFETY_TIPS(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel Brazil' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Bargeldlos reisen in Brasilien' : 'Cashless Travel in Brazil'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Dein 2026-Guide für bargeldloses Reisen in Brasilien'
            : 'Your 2026 guide to going cash-free in Brazil'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Is Brazil cashless? */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie bargeldlos ist Brasilien? (Reality Check)' : 'Is Brazil Cashless? (Reality Check)'}
          </h2>
          <p className="text-slate-600 text-[15px]">
            {locale === 'de'
              ? 'Brasilien wurde schneller bargeldlos als fast jedes andere Land. PIX hat 2020 die Zahlungswelt über Nacht verändert.'
              : 'Brazil went cashless faster than almost any country. PIX in 2020 transformed payments overnight.'}
          </p>
          <div className="space-y-3">
            {meters.map(({ city, pct }) => (
              <div key={city} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{city}</span>
                  <span className="font-bold" style={{ color: pct >= 70 ? '#00B894' : pct >= 50 ? '#f59e0b' : '#ef4444' }}>{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 70 ? '#00B894' : pct >= 50 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best payment methods */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Beste Zahlungsmethoden im Ranking' : 'Best Payment Methods Ranked'}
          </h2>
          <div className="space-y-3">
            {methods.map((m) => (
              <div key={m.name} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{m.rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-slate-900 text-sm">{m.name}</p>
                    <Stars count={m.stars} />
                  </div>
                  <ul className="text-xs text-slate-500 mt-0.5 space-y-0.5">
                    {m.points.map((p) => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apps to download */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Apps vor Brasilien herunterladen' : 'Apps to Download Before Brazil'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {apps.map(({ name, desc }) => (
              <div key={name} className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex items-center gap-2">
                <span className="text-green-500 font-bold text-sm">☑</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{name}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            📱 {locale === 'de'
              ? 'WhatsApp ist in Brasilien unverzichtbar. Alle Restaurants, Geschäfte und Dienstleister kommunizieren über WhatsApp.'
              : 'WhatsApp is essential in Brazil. All businesses, restaurants and services communicate via WhatsApp.'}
          </div>
        </section>

        {/* City-by-city guide */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Stadt-für-Stadt-Guide' : 'City-by-City Guide'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cities.map((c) => (
              <div key={c.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{c.name}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {c.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Safety tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Sicherheitstipps für Brasilien' : 'Safety Tips for Brazil'}
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm font-medium text-amber-800 mb-2">
            {locale === 'de'
              ? 'Brasilien erfordert erhöhtes Zahlungsbewusstsein:'
              : 'Brazil requires extra payment awareness:'}
          </div>
          <ul className="space-y-2">
            {safety.map((tip) => (
              <li key={tip} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span className="text-amber-500 font-bold">⚠</span>
                <span className="text-sm text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Boleto */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Boleto – Was Touristen wissen sollten' : 'Boleto – What Tourists Should Know'}
          </h2>
          <div className="text-slate-600 text-[15px] space-y-2">
            <p>
              {locale === 'de'
                ? 'Ein Boleto ist ein brasilianischer Zahlungsbeleg — ähnlich einer Rechnung. Du bekommst ihn häufig beim Online-Shopping oder bei der Registrierung für Dienstleistungen.'
                : 'A boleto is a Brazilian payment slip — like an invoice. You will encounter it often with online shopping or service registrations.'}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>{locale === 'de' ? 'Bezahlbar in jedem Lotérica-Laden, bei Banken oder per App' : 'Can be paid at any Lotérica, bank or via banking app'}</li>
              <li>{locale === 'de' ? 'Gültig in der Regel 1–3 Tage' : 'Typically valid for 1–3 days'}</li>
              <li>{locale === 'de' ? 'Mercado Pago kann Boletos bezahlen' : 'Mercado Pago can pay boletos'}</li>
            </ul>
          </div>
        </section>

        {/* ATM Tips */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Geldautomat-Tipps für Brasilien' : 'ATM Tips for Brazil'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? [
              'Am besten: Banco-do-Brasil-, Itaú-, Bradesco-Automaten',
              'Gebühr: R$30–60 für ausländische Karten',
              'Limit: Normalerweise R$1.000–2.000 pro Abhebung',
              'IMMER BRL wählen — DCC ablehnen',
              'Sicherheit: Automaten innerhalb von Banken/Malls benutzen',
            ] : [
              'Best: Banco do Brasil, Itaú, Bradesco ATMs',
              'Fee: R$30–60 for foreign cards',
              'Limit: Usually R$1,000–2,000 per withdrawal',
              'ALWAYS choose BRL — decline DCC',
              'Safety: Use ATMs inside banks or shopping malls',
            ]).map((tip) => (
              <li key={tip} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm text-sm text-slate-700">
                <span className="text-blue-500">🏧</span> {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de' ? 'PIX-QR-Code für Brasilien erstellen' : 'Generate your PIX QR code for Brazil'}
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
              icon="🌍"
              name={locale === 'de' ? 'PIX Touristen-Guide' : 'PIX Tourist Guide'}
              url="/guides/brazil/pix-tourist-guide"
              description={locale === 'de' ? 'Mercado-Pago-Lösung für Kurzbesucher' : 'Mercado Pago solution for short-stay visitors'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🤳"
              name={locale === 'de' ? 'PIX für Ausländer' : 'PIX for Foreigners'}
              url="/guides/brazil/pix-for-foreigners"
              description={locale === 'de' ? 'Expats: voller PIX-Zugang' : 'Expats: full PIX access'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
