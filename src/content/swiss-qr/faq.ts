import type { LocalizedContent, FAQContent } from '../types'

export const swissQrFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'Swiss QR Code FAQ',
    description:
      '25 questions answered — from the basics to Zahlteil, reference types and technical details.',
    items: [
      {
        question: 'What is Swiss QR Code?',
        answer:
          "Swiss QR Code (QR-Rechnung) is Switzerland's standardized payment QR code that replaced the old orange and red Einzahlungsscheine. It was introduced by SIX Group and became mandatory for all Swiss banks on September 30, 2022.",
      },
      {
        question: 'When did Swiss QR Code become mandatory?',
        answer:
          'Swiss QR Code became mandatory for all Swiss banks on September 30, 2022. The old orange and red payment slips were discontinued on June 30, 2020.',
      },
      {
        question: 'What is the difference between QRR, SCOR and NON?',
        answer:
          'These are the three reference types in Swiss QR Code: QRR (QR-Referenz) is a 27-digit number used for mass payments, SCOR (Creditor Reference) follows ISO 11649 for international use, and NON means no reference is used for simple transfers.',
      },
      {
        question: 'Can I use Swiss QR Code with EUR instead of CHF?',
        answer:
          'Yes, Swiss QR Code supports both CHF and EUR transactions, making it useful for cross-border payments between Switzerland and the eurozone.',
      },
      {
        question: 'What is the Zahlteil?',
        answer:
          'The Zahlteil is the standardized payment slip that accompanies every Swiss QR Code invoice. It occupies the lower third of an A4 page and contains the QR code on the right and a smaller receipt section (Empfangsschein) on the left.',
      },
      {
        question: 'Is Swiss QR Code the same as GiroCode?',
        answer:
          'No. Swiss QR Code is used exclusively in Switzerland and Liechtenstein, while GiroCode is the SEPA standard for 36 European countries. They have different payload structures and are not interchangeable.',
      },
      {
        question: 'Which Swiss banks support Swiss QR Code?',
        answer:
          'All Swiss banks are legally required to support Swiss QR Code since September 2022, including UBS, PostFinance, Raiffeisen, all Kantonalbanken, Migros Bank, Cler, and Valiant.',
      },
      {
        question: 'What is the Swiss Cross in the QR code center?',
        answer:
          'The Swiss Cross (white cross on red background) must appear in the center of every Swiss QR Code. It identifies it as a Swiss payment QR code and distinguishes it from standard QR codes. No logos or other images may replace it.',
      },
      {
        question: 'Do I need the BIC for Swiss QR Code?',
        answer:
          'No, BIC is not required for Swiss QR Code. The IBAN alone is sufficient to identify the recipient bank in Switzerland.',
      },
      {
        question: 'What IBAN format does Swiss QR Code require?',
        answer:
          'Swiss QR Code requires a Swiss IBAN starting with CH or a Liechtenstein IBAN starting with LI, both exactly 21 characters long.',
      },
      {
        question: 'Can I generate a Swiss QR Code without an amount?',
        answer:
          'Yes, the amount is optional in Swiss QR Code. Leaving it blank creates an open invoice where the payer enters the amount manually.',
      },
      {
        question: 'What is the minimum size for a Swiss QR Code?',
        answer:
          'The Swiss QR Code must be at least 46mm × 46mm on printed documents. A quiet zone of at least 5mm must surround the code.',
      },
      {
        question: 'Can I add my company logo to a Swiss QR Code?',
        answer:
          'No. Swiss QR Code specifications strictly require only the Swiss Cross in the center. Unlike GiroCode, no logos are permitted.',
      },
      {
        question: 'What is the difference between Swiss QR Code and a normal QR code?',
        answer:
          'Swiss QR Code uses a specific EMV-based payload format defined by SIX Group, contains structured payment data (IBAN, amount, reference), and always has the Swiss Cross in the center. A normal QR code has no standardized payment structure.',
      },
      {
        question: 'How do I scan a Swiss QR Code?',
        answer:
          'Open your Swiss banking app and use the QR scan feature. All major Swiss banking apps (PostFinance, UBS, Raiffeisen, BEKB etc.) support Swiss QR Code scanning directly.',
      },
      {
        question: 'Is Swiss QR Code secure?',
        answer:
          "Yes. Swiss QR Code is processed entirely on the device – no payment data is sent to external servers when generating. The actual payment is authorized through your bank's secure authentication process.",
      },
      {
        question: 'Can I use Swiss QR Code for international payments outside Switzerland?',
        answer:
          'Swiss QR Code is designed for payments to Swiss (CH) and Liechtenstein (LI) IBANs only. For international SEPA payments, use GiroCode instead.',
      },
      {
        question: 'What happens if my Swiss QR Code is damaged or partially obscured?',
        answer:
          'Swiss QR Code uses error correction level M, which allows up to 15% of the code to be damaged or obscured while still being readable. Always ensure the Swiss Cross area is clean and undamaged.',
      },
      {
        question: 'How many characters can the payment message contain?',
        answer:
          'The additional message (Mitteilung) in Swiss QR Code can contain up to 140 characters. The reference field supports up to 27 digits for QRR or up to 25 characters for SCOR references.',
      },
      {
        question: 'Can businesses send Swiss QR Code invoices by email?',
        answer:
          'Yes, Swiss QR Code invoices can be sent digitally as PDF. The QR code is scannable from both printed and digital formats on screen.',
      },
      {
        question: 'What is the Empfangsschein?',
        answer:
          'The Empfangsschein is the small receipt section on the left side of the Zahlteil. It contains the same payment information in human-readable form and is meant to be kept by the recipient as confirmation.',
      },
      {
        question: 'Is there an API for generating Swiss QR Codes?',
        answer:
          'qrpayhub.com will offer a REST API for Swiss QR Code generation as part of the API plan (coming soon), allowing integration into invoicing software, ERPs and accounting systems.',
      },
      {
        question: 'What font and size must be used in the Zahlteil?',
        answer:
          'The Zahlteil requires Liberation Sans (or a metrically equivalent font) at a minimum of 8pt for regular text and 11pt for headings. Only black text on white background is permitted.',
      },
      {
        question: 'Can I use Swiss QR Code on a digital invoice without printing?',
        answer:
          'Yes. Many Swiss businesses send PDF invoices containing the Zahlteil section digitally. Banking apps can scan the QR code directly from a phone or computer screen.',
      },
      {
        question: 'What replaced the orange Einzahlungsschein?',
        answer:
          'The Swiss QR Code (QR-Rechnung) with its Zahlteil replaced both the orange Einzahlungsschein (ESR, with reference) and the red Einzahlungsschein (ES, without reference) on June 30, 2020.',
      },
    ],
  },
  de: {
    title: 'Swiss QR Code FAQ',
    description:
      '25 Fragen beantwortet – von den Grundlagen bis zu Zahlteil, Referenztypen und technischen Details.',
    items: [
      {
        question: 'Was ist Swiss QR Code?',
        answer:
          'Der Swiss QR Code (QR-Rechnung) ist der standardisierte Schweizer Zahlungs-QR-Code, der die alten orangen und roten Einzahlungsscheine abgelöst hat. Er wurde von der SIX Group eingeführt und wurde am 30. September 2022 für alle Schweizer Banken obligatorisch.',
      },
      {
        question: 'Wann wurde Swiss QR Code obligatorisch?',
        answer:
          'Der Swiss QR Code wurde am 30. September 2022 für alle Schweizer Banken obligatorisch. Die alten orangen und roten Einzahlungsscheine wurden am 30. Juni 2020 eingestellt.',
      },
      {
        question: 'Was ist der Unterschied zwischen QRR, SCOR und NON?',
        answer:
          'Dies sind die drei Referenztypen im Swiss QR Code: QRR (QR-Referenz) ist eine 27-stellige Zahl für die Massenverarbeitung von Zahlungen, SCOR (Creditor Reference) folgt dem ISO-Standard 11649 für den internationalen Einsatz, und NON bedeutet, dass keine Referenz für einfache Überweisungen verwendet wird.',
      },
      {
        question: 'Kann ich Swiss QR Code mit EUR statt CHF verwenden?',
        answer:
          'Ja, Swiss QR Code unterstützt sowohl CHF- als auch EUR-Transaktionen, was ihn auch für grenzüberschreitende Zahlungen zwischen der Schweiz und der Eurozone nützlich macht.',
      },
      {
        question: 'Was ist der Zahlteil?',
        answer:
          'Der Zahlteil ist der standardisierte Zahlungsschein, der jeder Swiss QR Code Rechnung beiliegt. Er nimmt das untere Drittel einer A4-Seite ein und enthält den QR-Code auf der rechten und den Empfangsschein auf der linken Seite.',
      },
      {
        question: 'Ist Swiss QR Code dasselbe wie GiroCode?',
        answer:
          'Nein. Swiss QR Code wird ausschliesslich in der Schweiz und Liechtenstein verwendet, während GiroCode der SEPA-Standard für 36 europäische Länder ist. Die beiden Formate haben unterschiedliche Payload-Strukturen und sind nicht austauschbar.',
      },
      {
        question: 'Welche Schweizer Banken unterstützen Swiss QR Code?',
        answer:
          'Alle Schweizer Banken sind seit September 2022 gesetzlich zur Unterstützung des Swiss QR Codes verpflichtet, darunter UBS, PostFinance, Raiffeisen, alle Kantonalbanken, Migros Bank, Cler und Valiant.',
      },
      {
        question: 'Was ist das Schweizer Kreuz im Zentrum des QR-Codes?',
        answer:
          'Das Schweizer Kreuz (weisses Kreuz auf rotem Hintergrund) muss im Zentrum jedes Swiss QR Codes erscheinen. Es kennzeichnet ihn als Schweizer Zahlungs-QR-Code und unterscheidet ihn von herkömmlichen QR-Codes. Es darf durch keine Logos oder andere Bilder ersetzt werden.',
      },
      {
        question: 'Benötige ich die BIC für den Swiss QR Code?',
        answer:
          'Nein, die BIC ist für den Swiss QR Code nicht erforderlich. Die IBAN allein reicht aus, um die Empfängerbank in der Schweiz zu identifizieren.',
      },
      {
        question: 'Welches IBAN-Format erfordert Swiss QR Code?',
        answer:
          'Der Swiss QR Code erfordert eine Schweizer IBAN, die mit CH beginnt, oder eine Liechtensteiner IBAN, die mit LI beginnt – beide genau 21 Zeichen lang.',
      },
      {
        question: 'Kann ich einen Swiss QR Code ohne Betrag erstellen?',
        answer:
          'Ja, der Betrag ist im Swiss QR Code optional. Wird er weggelassen, entsteht eine offene Rechnung, bei der der Zahlende den Betrag manuell eingibt.',
      },
      {
        question: 'Was ist die Mindestgrösse für einen Swiss QR Code?',
        answer:
          'Der Swiss QR Code muss auf gedruckten Dokumenten mindestens 46 mm × 46 mm gross sein. Eine Ruhezone von mindestens 5 mm muss den Code umgeben.',
      },
      {
        question: 'Kann ich mein Firmenlogo zum Swiss QR Code hinzufügen?',
        answer:
          'Nein. Die Swiss QR Code Spezifikationen schreiben ausschliesslich das Schweizer Kreuz im Zentrum vor. Im Gegensatz zum GiroCode sind keine Logos erlaubt.',
      },
      {
        question: 'Was ist der Unterschied zwischen Swiss QR Code und einem normalen QR-Code?',
        answer:
          'Der Swiss QR Code verwendet ein spezifisches, von der SIX Group definiertes EMV-basiertes Payload-Format, enthält strukturierte Zahlungsdaten (IBAN, Betrag, Referenz) und trägt immer das Schweizer Kreuz im Zentrum. Ein normaler QR-Code hat keine standardisierte Zahlungsstruktur.',
      },
      {
        question: 'Wie scanne ich einen Swiss QR Code?',
        answer:
          'Öffnen Sie Ihre Schweizer Banking-App und verwenden Sie die QR-Scan-Funktion. Alle grossen Schweizer Banking-Apps (PostFinance, UBS, Raiffeisen, BEKB usw.) unterstützen das direkte Scannen von Swiss QR Codes.',
      },
      {
        question: 'Ist Swiss QR Code sicher?',
        answer:
          'Ja. Swiss QR Code wird vollständig auf dem Gerät verarbeitet – beim Erstellen werden keine Zahlungsdaten an externe Server gesendet. Die eigentliche Zahlung wird über den sicheren Authentifizierungsprozess Ihrer Bank autorisiert.',
      },
      {
        question: 'Kann ich Swiss QR Code für internationale Zahlungen ausserhalb der Schweiz verwenden?',
        answer:
          'Der Swiss QR Code ist ausschliesslich für Zahlungen an Schweizer (CH) und Liechtensteiner (LI) IBANs vorgesehen. Für internationale SEPA-Zahlungen verwenden Sie stattdessen GiroCode.',
      },
      {
        question: 'Was passiert, wenn mein Swiss QR Code beschädigt oder teilweise verdeckt ist?',
        answer:
          'Der Swiss QR Code verwendet den Fehlerkorrekturlevel M, der es ermöglicht, bis zu 15 % des Codes zu beschädigen oder zu verdecken, ohne die Lesbarkeit zu beeinträchtigen. Achten Sie stets darauf, dass der Bereich des Schweizer Kreuzes sauber und unbeschädigt ist.',
      },
      {
        question: 'Wie viele Zeichen kann die Zahlungsmitteilung enthalten?',
        answer:
          'Die zusätzliche Mitteilung im Swiss QR Code kann bis zu 140 Zeichen enthalten. Das Referenzfeld unterstützt bis zu 27 Ziffern für QRR oder bis zu 25 Zeichen für SCOR-Referenzen.',
      },
      {
        question: 'Können Unternehmen Swiss QR Code Rechnungen per E-Mail versenden?',
        answer:
          'Ja, Swiss QR Code Rechnungen können digital als PDF versendet werden. Der QR-Code ist sowohl auf gedruckten als auch auf digitalen Formaten auf dem Bildschirm scanbar.',
      },
      {
        question: 'Was ist der Empfangsschein?',
        answer:
          'Der Empfangsschein ist der kleine Belegbereich auf der linken Seite des Zahlteils. Er enthält dieselben Zahlungsinformationen in lesbarer Form und dient dem Empfänger als Zahlungsbestätigung.',
      },
      {
        question: 'Gibt es eine API zur Generierung von Swiss QR Codes?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die Swiss QR Code Generierung anbieten, die eine Integration in Rechnungssoftware, ERPs und Buchhaltungssysteme ermöglicht.',
      },
      {
        question: 'Welche Schriftart und Schriftgrösse muss im Zahlteil verwendet werden?',
        answer:
          'Der Zahlteil erfordert Liberation Sans (oder eine metrisch gleichwertige Schriftart) mit mindestens 8 pt für normalen Text und 11 pt für Überschriften. Nur schwarzer Text auf weissem Hintergrund ist zulässig.',
      },
      {
        question: 'Kann ich Swiss QR Code auf einer digitalen Rechnung ohne Ausdruck verwenden?',
        answer:
          'Ja. Viele Schweizer Unternehmen versenden PDF-Rechnungen mit dem Zahlteil digital. Banking-Apps können den QR-Code direkt vom Telefon- oder Computerbildschirm scannen.',
      },
      {
        question: 'Was hat den orangen Einzahlungsschein ersetzt?',
        answer:
          'Der Swiss QR Code (QR-Rechnung) mit seinem Zahlteil hat sowohl den orangen Einzahlungsschein (ESR, mit Referenz) als auch den roten Einzahlungsschein (ES, ohne Referenz) am 30. Juni 2020 abgelöst.',
      },
    ],
  },
}
