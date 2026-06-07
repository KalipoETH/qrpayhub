import type { LocalizedContent, GuideContent } from '../types'

export const swissQrGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'Swiss QR Code (QR-Rechnung) – Complete Guide',
    description:
      'Complete guide to Swiss QR Code: history, Zahlteil, reference types, payload structure, supported banks and best practices.',
    sections: [
      {
        id: 'what-is-swiss-qr',
        heading: 'What is Swiss QR Code?',
        content:
          'Swiss QR Code — officially known as the QR-Rechnung (QR invoice) — is Switzerland\'s national standard for electronic payments. Developed by SIX Group as the direct successor to the orange ESR and red ES payment slips, it encodes all IBAN, amount, reference and address data into a scannable QR code with the mandatory Swiss Cross in the center. Since September 30, 2022, every Swiss bank is legally required to support it. It works exclusively with Swiss (CH) and Liechtenstein (LI) IBANs, and supports both CHF and EUR.',
      },
      {
        id: 'history',
        heading: 'History: From Einzahlungsschein to QR-Rechnung',
        content:
          'Switzerland used two paper-based payment slips for decades: the orange ESR (Einzahlungsschein mit Referenz) with a 27-digit reference for automated processing, and the red ES (Einzahlungsschein) for simple transfers. In 2018, SIX Group announced the QR-Rechnung as their official replacement. On June 30, 2020, both old formats were discontinued. After a transition phase, Swiss QR Code became legally mandatory for all Swiss banks on September 30, 2022.',
      },
      {
        id: 'reference-types',
        heading: 'The Three Reference Types Explained',
        content:
          'Every Swiss QR Code must specify one of three reference types. QRR (QR-Referenz) is a 27-digit number with a Modulo-10 check digit — the same principle as the former ESR, ideal for mass invoice processing. SCOR (Creditor Reference) follows ISO 11649 with an RF prefix and two check digits, designed for international compatibility. NON means no reference is used, suitable for simple personal transfers where only an additional message (Mitteilung) is provided.',
      },
      {
        id: 'payload-structure',
        heading: 'The Swiss QR Payload – Technical Structure',
        content:
          'The Swiss QR Code payload is plain UTF-8 text with each field on its own line, strictly defined by the SIX Group specification. It begins with the header "SPC" (Swiss Payments Code), version "0200", and coding type "1" for UTF-8. The payload includes the creditor IBAN (CH or LI, 21 characters), creditor address, amount (optional), currency (CHF or EUR), optional debtor address, reference type and reference, an optional Mitteilung, and ends with the trailer "EPD" (End Payment Data).',
      },
      {
        id: 'zahlteil',
        heading: 'The Zahlteil – Switzerland\'s Payment Slip',
        content:
          'For official Swiss invoices, the Swiss QR Code must be embedded in the standardized Zahlteil, which occupies the lower third of an A4 page. The Zahlteil is divided into two parts by a vertical dashed line: the Empfangsschein (receipt section, ~62 mm wide) on the left and the Zahlteil with the QR code (~148 mm wide) on the right. The QR code must be at least 46 mm × 46 mm with a 5 mm quiet zone, and the mandatory Swiss Cross (7 mm × 7 mm) must appear in the center.',
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks',
        content:
          'Since September 30, 2022, all Swiss banks are legally required to support Swiss QR Code — without exception. This includes all universal banks (UBS, Credit Suisse/UBS), PostFinance, all 24 cantonal banks, all Raiffeisen cooperatives, Migros Bank, Cler, Valiant, Hypothekarbank Lenzburg, and neobanks such as Neon and Yuh. All major Swiss banking apps support scanning Swiss QR Codes directly from the transfer screen.',
      },
      {
        id: 'swiss-qr-vs-girocode',
        heading: 'Swiss QR vs GiroCode – Differences',
        content:
          'Swiss QR Code and GiroCode are both payment QR standards but are not interchangeable. Swiss QR Code is used exclusively in Switzerland and Liechtenstein (CH/LI IBANs only), was standardized by SIX Group, and requires the mandatory Zahlteil with Swiss Cross for invoices. GiroCode is the SEPA standard for all 36 European member countries, developed by the European Payments Council. Use Swiss QR for CH/LI recipients; use GiroCode for all other SEPA payments.',
      },
      {
        id: 'best-practices',
        heading: 'Best Practices',
        content:
          'Minimum QR code size: 46 mm × 46 mm on printed documents. Quiet zone: at least 5 mm of white space on all four sides. The Swiss Cross in the center is mandatory — never replace it with a logo. Font: Liberation Sans or metrically equivalent, minimum 8 pt for body text and 11 pt for headings. Print quality: minimum 300 DPI; avoid JPEG — use PNG or SVG. Always test with at least two Swiss banking apps before mass distribution.',
      },
    ],
  },
  de: {
    title: 'Swiss QR Code (QR-Rechnung) – Vollständiger Guide',
    description:
      'Alles über den Swiss QR Code: Geschichte, Zahlteil, Referenztypen, Payload-Aufbau, unterstützte Banken und Best Practices.',
    sections: [
      {
        id: 'what-is-swiss-qr',
        heading: 'Was ist Swiss QR Code?',
        content:
          'Der Swiss QR Code – offiziell bekannt als QR-Rechnung – ist der schweizerische Nationalstandard für elektronische Zahlungen. Er wurde von der SIX Group als direkter Nachfolger des orangen Einzahlungsscheins (ESR) und des roten Einzahlungsscheins (ES) entwickelt und kodiert alle Daten für eine IBAN-Zahlung – Betrag, Referenz und Adresse – in einen scanbaren QR-Code mit dem obligatorischen Schweizer Kreuz im Zentrum. Seit dem 30. September 2022 ist jede Schweizer Bank gesetzlich zur Unterstützung verpflichtet. Er funktioniert ausschliesslich mit Schweizer (CH) und Liechtensteiner (LI) IBANs und unterstützt CHF sowie EUR.',
      },
      {
        id: 'history',
        heading: 'Geschichte: Vom Einzahlungsschein zur QR-Rechnung',
        content:
          'Die Schweiz nutzte jahrzehntelang zwei papierbasierte Zahlungsscheine: den orangen ESR (Einzahlungsschein mit Referenz) mit einer 27-stelligen Referenznummer für die automatisierte Verarbeitung und den roten ES (Einzahlungsschein) für einfache Überweisungen. Im Jahr 2018 kündigte die SIX Group die QR-Rechnung als offiziellen Nachfolger an. Am 30. Juni 2020 wurden beide Altformate eingestellt. Nach einer Übergangsphase wurde der Swiss QR Code am 30. September 2022 für alle Schweizer Banken gesetzlich verbindlich.',
      },
      {
        id: 'reference-types',
        heading: 'Die drei Referenztypen erklärt',
        content:
          'Jeder Swiss QR Code muss einen von drei Referenztypen angeben. QRR (QR-Referenz) ist eine 27-stellige Zahl mit einer Modulo-10-Prüfziffer – dasselbe Prinzip wie beim früheren ESR, ideal für die Massenverarbeitung von Rechnungen. SCOR (Creditor Reference) folgt dem internationalen Standard ISO 11649 mit dem Präfix RF und zwei Prüfziffern und ist für die internationale Kompatibilität ausgelegt. NON bedeutet, dass keine Referenz verwendet wird – geeignet für einfache Privatüberweisungen, bei denen nur eine Mitteilung angegeben wird.',
      },
      {
        id: 'payload-structure',
        heading: 'Der Swiss QR Payload – Technischer Aufbau',
        content:
          'Der Swiss QR Code Payload ist einfacher UTF-8-Text, bei dem jedes Feld in einer eigenen Zeile steht und streng nach der SIX-Group-Spezifikation aufgebaut ist. Er beginnt mit dem Header „SPC" (Swiss Payments Code), Version „0200" und Kodierungstyp „1" für UTF-8. Der Payload enthält die Gläubiger-IBAN (CH oder LI, 21 Zeichen), Gläubigeradresse, optionalen Betrag, Währung (CHF oder EUR), optionale Schuldneradresse, Referenztyp und Referenz, eine optionale Mitteilung sowie den Abschluss-Trailer „EPD" (End Payment Data).',
      },
      {
        id: 'zahlteil',
        heading: 'Der Zahlteil – Schweizer Zahlungsschein',
        content:
          'Für offizielle Schweizer Rechnungen muss der Swiss QR Code in den standardisierten Zahlteil eingebettet werden, der das untere Drittel einer A4-Seite einnimmt. Der Zahlteil ist durch eine vertikale Trennlinie in zwei Teile gegliedert: den Empfangsschein (Belegbereich, ca. 62 mm breit) auf der linken Seite und den Zahlteil mit dem QR-Code (ca. 148 mm breit) auf der rechten Seite. Der QR-Code muss mindestens 46 mm × 46 mm gross sein, eine Ruhezone von 5 mm aufweisen und das obligatorische Schweizer Kreuz (7 mm × 7 mm) im Zentrum enthalten.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken',
        content:
          'Seit dem 30. September 2022 sind ausnahmslos alle Schweizer Banken gesetzlich zur Unterstützung des Swiss QR Codes verpflichtet. Dazu gehören alle Universalbanken (UBS, Credit Suisse/UBS), PostFinance, alle 24 Kantonalbanken, alle Raiffeisen-Genossenschaften, Migros Bank, Cler, Valiant, Hypothekarbank Lenzburg sowie Neobanken wie Neon und Yuh. Alle grossen Schweizer Banking-Apps unterstützen das Scannen von Swiss QR Codes direkt aus dem Überweisungsmenü.',
      },
      {
        id: 'swiss-qr-vs-girocode',
        heading: 'Swiss QR vs GiroCode – Unterschiede',
        content:
          'Swiss QR Code und GiroCode sind beides Zahlungs-QR-Standards, jedoch nicht austauschbar. Der Swiss QR Code wird ausschliesslich in der Schweiz und Liechtenstein (nur CH/LI-IBANs) eingesetzt, wurde von der SIX Group standardisiert und erfordert für Rechnungen den obligatorischen Zahlteil mit Schweizer Kreuz. GiroCode ist der SEPA-Standard für alle 36 europäischen Mitgliedsländer und wurde vom European Payments Council entwickelt. Verwenden Sie Swiss QR für Empfänger mit CH/LI-IBAN und GiroCode für alle anderen SEPA-Zahlungen.',
      },
      {
        id: 'best-practices',
        heading: 'Best Practices',
        content:
          'Mindestgrösse des QR-Codes: 46 mm × 46 mm auf gedruckten Dokumenten. Ruhezone: mindestens 5 mm Weissraum auf allen vier Seiten. Das Schweizer Kreuz im Zentrum ist obligatorisch – es darf nie durch ein Logo ersetzt werden. Schriftart: Liberation Sans oder eine metrisch gleichwertige Schrift, mindestens 8 pt für Fliesstext und 11 pt für Überschriften. Druckqualität: mindestens 300 DPI; kein JPEG – PNG oder SVG verwenden. Immer mit mindestens zwei Schweizer Banking-Apps testen, bevor der Code in grösserem Umfang verwendet wird.',
      },
    ],
  },
}
