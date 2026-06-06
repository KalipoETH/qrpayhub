import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Impressum | QRPayHub',
    robots: { index: false, follow: false },
  };
}

export default function ImpressumPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const isDE = locale === 'de';

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: isDE ? 'Impressum' : 'Legal Notice' },
          ]}
        />

        <div className="mt-8">
          {isDE ? <ContentDE /> : <ContentEN />}
        </div>
      </div>
    </div>
  );
}

function ContentDE() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Impressum</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Angaben gemäß § 5 TMG
        </h2>
        <address className="not-italic text-slate-700 leading-relaxed">
          Kaleb Jahnke<br />
          Koppelstraße 6A<br />
          27711 Osterholz-Scharmbeck<br />
          Deutschland
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Kontakt</h2>
        <p className="text-slate-700">
          E-Mail:{' '}
          <a
            href="mailto:jahnke.kaleb@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            jahnke.kaleb@gmail.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <address className="not-italic text-slate-700 leading-relaxed">
          Kaleb Jahnke<br />
          Koppelstraße 6A<br />
          27711 Osterholz-Scharmbeck<br />
          Deutschland
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Haftungsausschluss
        </h2>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Haftung für Inhalte
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen.
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Haftung für Links
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich.
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Urheberrecht
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </section>
    </article>
  );
}

function ContentEN() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Legal Notice</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Operator</h2>
        <address className="not-italic text-slate-700 leading-relaxed">
          Kaleb Jahnke<br />
          Koppelstraße 6A<br />
          27711 Osterholz-Scharmbeck<br />
          Germany
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact</h2>
        <p className="text-slate-700">
          Email:{' '}
          <a
            href="mailto:jahnke.kaleb@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            jahnke.kaleb@gmail.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Legal Framework
        </h2>
        <p className="text-slate-700 leading-relaxed">
          This website is operated by a private individual under German law
          (Telemediengesetz – TMG). The operator is responsible for the content
          of this website in accordance with § 55 Abs. 2 RStV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Disclaimer
        </h2>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Liability for Content
          </h3>
          <p className="text-slate-700 leading-relaxed">
            The contents of this website have been created with the utmost care.
            However, we cannot guarantee the accuracy, completeness or
            up-to-dateness of the content.
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Liability for Links
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Our website contains links to external third-party websites over
            whose content we have no control. The respective provider or
            operator of the linked pages is always responsible for their
            content.
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Copyright
          </h3>
          <p className="text-slate-700 leading-relaxed">
            The content and works created by the site operator on these pages
            are subject to German copyright law. Any reproduction, editing,
            distribution or any form of use beyond the limits of copyright
            requires the written consent of the respective author or creator.
          </p>
        </div>
      </section>
    </article>
  );
}
