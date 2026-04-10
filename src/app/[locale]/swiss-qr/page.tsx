import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';

export const metadata: Metadata = {
  title: 'Swiss QR Code – Die neue Schweizer Zahlungsstandard | QRPayHub',
  description:
    'Alles über den Swiss QR Code (QR-Rechnung): Was er ist, wie er funktioniert und wie man ihn kostenlos generiert. Unterstützt CHF und EUR.',
  keywords: ['swiss qr code', 'qr rechnung', 'swiss qr bill', 'schweizer qr code', 'six group'],
};

const QUICK_FACTS = [
  { icon: '👥', value: '9 Mio.', label: 'Active Users' },
  { icon: '🏦', value: 'All', label: 'Swiss Banks' },
  { icon: '💱', value: 'CHF + EUR', label: 'Currencies' },
  { icon: '📅', value: 'Since 2020', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'Generator',
    description: 'Create Swiss QR Codes instantly — free, no registration required',
    href: '/swiss-qr/generator',
  },
  {
    icon: '📖',
    title: 'Guide',
    description: 'Complete guide: history, Zahlteil, reference types and technical structure',
    href: '/swiss-qr/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: '25 questions about Swiss QR Code answered',
    href: '/swiss-qr/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Swiss QR Code – Die neue Schweizer Zahlungsstandard',
  description:
    'Alles über den Swiss QR Code: Was er ist, wie er funktioniert und wie man ihn kostenlos generiert.',
  url: 'https://qrpayhub.com/en/swiss-qr',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Swiss QR Code', item: 'https://qrpayhub.com/en/swiss-qr' },
    ],
  },
};

export default function SwissQRHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-swiss-qr-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200">
          🇨🇭 Schweizer Zahlungsstandard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Swiss QR Code – Die neue Schweizer Zahlungsstandard
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          Der offizielle Schweizer Standard für QR-Zahlungen — Nachfolger des orangen
          Einzahlungsscheins, unterstützt von allen Schweizer Banken.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/swiss-qr/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Swiss QR Code generieren →
          </Link>
          <a
            href="#what-is-swiss-qr"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors"
          >
            Mehr erfahren ↓
          </a>
        </div>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_FACTS.map(({ icon, value, label }) => (
          <div
            key={label}
            className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── What is Swiss QR Code ─────────────────────────────────────────── */}
      <section id="what-is-swiss-qr" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Was ist der Swiss QR Code?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            Der <strong>Swiss QR Code</strong> — offiziell auch als <strong>QR-Rechnung</strong>{' '}
            bezeichnet — ist der neue Schweizer Standard für den bargeldlosen Zahlungsverkehr.
            Er wurde von der <strong>SIX Group</strong>, dem zentralen Infrastrukturanbieter des
            Schweizer Finanzplatzes, entwickelt und am 30. Juni 2020 offiziell eingeführt.
          </p>
          <p>
            Der Swiss QR Code ist der direkte Nachfolger des traditionsreichen orangen und
            roten Einzahlungsscheins, der jahrzehntelang das Schweizer Rechnungswesen dominiert
            hat. Seit dem <strong>1. Oktober 2022</strong> sind die alten Einzahlungsscheine
            nicht mehr gültig — der Swiss QR Code ist seitdem der einzig akzeptierte Standard
            für QR-basierte Zahlungen in der Schweiz.
          </p>
          <p>
            Technisch gesehen enthält der Swiss QR Code alle für eine Zahlung notwendigen
            Informationen in einem standardisierten QR-Code-Payload: IBAN des Empfängers,
            Name und Adresse des Zahlungsempfängers, Betrag, Währung, Referenznummer und
            optionale Mitteilungen. Wenn ein Zahler seinen Banken-App über den Swiss QR Code
            scannt, werden alle Felder automatisch ausgefüllt — kein manuelles Eintippen,
            keine Tippfehler.
          </p>
          <p>
            <strong>Wer verwendet den Swiss QR Code?</strong> Der Standard ist in der ganzen
            Schweiz und in Liechtenstein verbreitet und deckt eine breite Palette von
            Anwendungsfällen ab:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>KMU und Freiberufler</strong> drucken den Swiss QR Code auf ihre Rechnungen,
              damit Kunden sofort und fehlerfrei bezahlen können.
            </li>
            <li>
              <strong>Grossunternehmen</strong> integrieren den Swiss QR Code in ihre
              ERP-Systeme und PDF-Rechnungen für automatisierte Zahlungsabwicklung.
            </li>
            <li>
              <strong>Vereine und Organisationen</strong> nutzen QR-Rechnungen für
              Mitgliederbeiträge, Spendenaufrufe und Eventtickets.
            </li>
            <li>
              <strong>Alle Schweizer Banken</strong> — von UBS und Credit Suisse über Postfinance
              bis zu Kantonalbanken und Neobanken wie Neon und Yuh — unterstützen den Standard
              vollständig in ihren Mobile-Banking-Apps.
            </li>
          </ul>
          <p>
            Der Swiss QR Code basiert auf dem ISO-Standard und unterstützt zwei Währungen:
            <strong> CHF</strong> (Schweizer Franken) und <strong>EUR</strong> (Euro). Er
            kennt drei Referenztypen: die <strong>QR-Referenz (QRR)</strong> mit 27 Ziffern
            und Modulo-10-Prüfziffer, die <strong>Creditor Reference (SCOR)</strong> nach
            ISO 11649, sowie <strong>keine Referenz (NON)</strong> für einfache Überweisungen.
          </p>
          <p>
            Für offizielle Rechnungen schreibt die SIX-Spezifikation vor, dass der QR-Code
            auf einem standardisierten <strong>Zahlteil</strong> (A4-Format) platziert wird,
            der den Abschluss jeder Rechnung bildet. Der Zahlteil enthält neben dem QR-Code
            auch lesbare Zahlungsinformationen und eine Empfangsquittung.
          </p>
          <p>
            Mit dem Swiss QR Code Generator von QRPayHub können Sie Swiss QR Codes kostenlos
            und ohne Registrierung erstellen — ideal für einfache Zahlungen, Tests und die
            schnelle Rechnungsstellung.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Swiss QR Code Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
