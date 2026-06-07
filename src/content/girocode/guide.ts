import type { LocalizedContent, GuideContent } from '../types'

export const girocodeGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'GiroCode / EPC QR Code – Complete Guide',
    description:
      'Everything about GiroCode: what it is, how it works, which banks support it and how to generate one for free.',
    sections: [
      {
        id: 'what-is-girocode',
        heading: 'What is GiroCode?',
        content:
          'GiroCode (also called EPC QR Code) is the European standard for QR payment codes, developed by the European Payments Council (EPC) in 2016. It encodes SEPA payment data into a scannable QR code, allowing bank customers to initiate transfers by simply scanning with their banking app – no manual data entry required. The standard (EPC069-12) became mandatory for German banks in 2019.',
      },
      {
        id: 'how-it-works',
        heading: 'How Does GiroCode Work?',
        content:
          'When you scan a GiroCode with your banking app, all payment details are automatically filled in: recipient IBAN, name, amount, and reference. You only need to confirm the transfer with your banking PIN or biometric authentication.',
      },
      {
        id: 'payload-structure',
        heading: 'The GiroCode Payload – Technical Structure',
        content:
          'A GiroCode consists of 11 lines of plain text encoded as a QR code. The payload follows the EPC069-12 standard and contains: Service Tag (BCD), Version (002), Encoding (1 = UTF-8), Function (SCT = SEPA Credit Transfer), BIC (optional since 2016), Recipient name, IBAN, Amount (EUR), and Payment reference.',
      },
      {
        id: 'supported-banks',
        heading: 'Which Banks Support GiroCode?',
        content:
          'All SEPA-compliant banks in the 36 SEPA member countries are required to support GiroCode scanning. In Germany this includes: Deutsche Bank, Commerzbank, Sparkasse, Volksbank/Raiffeisenbank, ING, DKB, N26, Comdirect, Postbank, Targobank and all others.',
      },
      {
        id: 'on-invoices',
        heading: 'GiroCode on Invoices – Best Practices',
        content:
          'Place the GiroCode in the bottom right corner of your invoice. Minimum size: 2cm × 2cm. White border: at least 2mm on all sides. Never compress or distort the QR code. Test the code with your banking app before sending to clients.',
      },
      {
        id: 'common-mistakes',
        heading: 'Common Mistakes',
        content:
          'The most frequent GiroCode errors: IBAN with spaces (spaces are automatically removed), amount with comma instead of period (always use period: 150.00 not 150,00), recipient name longer than 70 characters (shorten it), wrong version (use version 002 for best compatibility).',
      },
      {
        id: 'sepa-countries',
        heading: 'SEPA Countries',
        content:
          'GiroCode works in all 36 SEPA member countries: Germany, Austria, France, Italy, Spain, Netherlands, Belgium, Portugal, Finland, Ireland, Greece, Slovakia, Slovenia, Estonia, Latvia, Lithuania, Luxembourg, Malta, Cyprus, Croatia, Hungary, Romania, Bulgaria, Czech Republic, Denmark, Sweden, Norway, Iceland, Liechtenstein, Switzerland, United Kingdom, Monaco, San Marino, Vatican, Andorra.',
      },
      {
        id: 'technical-spec',
        heading: 'Technical Specification',
        content:
          'Standard: EPC069-12 v2.1 | QR Error Correction: M (15%) | Encoding: UTF-8 | Max payload size: 331 bytes | Amount format: EUR followed by decimal amount (EUR150.00) | Reference: structured or unstructured, max 140 characters.',
      },
    ],
  },
  de: {
    title: 'GiroCode / EPC QR-Code – Vollständiger Guide',
    description:
      'Alles über GiroCode: Was er ist, wie er funktioniert, welche Banken ihn unterstützen und wie man ihn kostenlos erstellt.',
    sections: [
      {
        id: 'what-is-girocode',
        heading: 'Was ist ein GiroCode?',
        content:
          'Der GiroCode (auch EPC QR-Code genannt) ist der europäische Standard für QR-Zahlungscodes, entwickelt vom European Payments Council (EPC) im Jahr 2016. Er kodiert SEPA-Zahlungsdaten in einen scanbaren QR-Code und ermöglicht es Bankkunden, Überweisungen einfach durch Scannen mit der Banking-App auszulösen – ohne manuelle Dateneingabe. Der Standard (EPC069-12) wurde 2019 für deutsche Banken verpflichtend.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie funktioniert ein GiroCode?',
        content:
          'Wenn Sie einen GiroCode mit Ihrer Banking-App scannen, werden alle Zahlungsdaten automatisch ausgefüllt: Empfänger-IBAN, Name, Betrag und Verwendungszweck. Sie müssen die Überweisung nur noch mit Ihrer Banking-PIN oder biometrischer Authentifizierung bestätigen.',
      },
      {
        id: 'payload-structure',
        heading: 'Der GiroCode-Payload – Technischer Aufbau',
        content:
          'Ein GiroCode besteht aus 11 Zeilen Klartext, die als QR-Code kodiert werden. Der Payload folgt dem Standard EPC069-12 und enthält: Service Tag (BCD), Version (002), Zeichenkodierung (1 = UTF-8), Funktion (SCT = SEPA Credit Transfer), BIC (seit 2016 optional), Empfängername, IBAN, Betrag (EUR) und Verwendungszweck.',
      },
      {
        id: 'supported-banks',
        heading: 'Welche Banken unterstützen GiroCode?',
        content:
          'Alle SEPA-konformen Banken in den 36 SEPA-Mitgliedsländern sind verpflichtet, GiroCode zu unterstützen. In Deutschland gehören dazu: Deutsche Bank, Commerzbank, Sparkasse, Volksbank/Raiffeisenbank, ING, DKB, N26, Comdirect, Postbank, Targobank und alle weiteren deutschen Banken.',
      },
      {
        id: 'on-invoices',
        heading: 'GiroCode auf Rechnungen – Best Practices',
        content:
          'Platzieren Sie den GiroCode unten rechts auf Ihrer Rechnung. Mindestgröße: 2 cm × 2 cm. Weißer Rand: mindestens 2 mm auf allen Seiten. Den QR-Code niemals stauchen oder verzerren. Testen Sie den Code mit Ihrer Banking-App, bevor Sie ihn an Kunden versenden.',
      },
      {
        id: 'common-mistakes',
        heading: 'Häufige Fehler',
        content:
          'Die häufigsten GiroCode-Fehler: IBAN mit Leerzeichen (Leerzeichen werden automatisch entfernt), Betrag mit Komma statt Punkt (immer Punkt verwenden: 150.00 statt 150,00), Empfängername länger als 70 Zeichen (kürzen), falsche Version (Version 002 für beste Kompatibilität verwenden).',
      },
      {
        id: 'sepa-countries',
        heading: 'SEPA-Länder',
        content:
          'GiroCode funktioniert in allen 36 SEPA-Mitgliedsländern: Deutschland, Österreich, Frankreich, Italien, Spanien, Niederlande, Belgien, Portugal, Finnland, Irland, Griechenland, Slowakei, Slowenien, Estland, Lettland, Litauen, Luxemburg, Malta, Zypern, Kroatien, Ungarn, Rumänien, Bulgarien, Tschechien, Dänemark, Schweden, Norwegen, Island, Liechtenstein, Schweiz, Vereinigtes Königreich, Monaco, San Marino, Vatikan, Andorra.',
      },
      {
        id: 'technical-spec',
        heading: 'Technische Spezifikation',
        content:
          'Standard: EPC069-12 v2.1 | QR Fehlerkorrektur: M (15 %) | Zeichenkodierung: UTF-8 | Maximale Payload-Größe: 331 Byte | Betragsformat: EUR gefolgt vom Dezimalbetrag (EUR150.00) | Verwendungszweck: strukturiert oder unstrukturiert, max. 140 Zeichen.',
      },
    ],
  },
}
