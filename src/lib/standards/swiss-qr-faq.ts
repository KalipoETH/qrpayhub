import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-swiss-qr',
    question: 'What is Swiss QR Code?',
    answer:
      'Swiss QR Code (QR-Rechnung) is Switzerland\'s standardized payment QR code that replaced the old orange and red Einzahlungsscheine. It was introduced by SIX Group and became mandatory for all Swiss banks on September 30, 2022.',
  },
  {
    id: 'when-mandatory',
    question: 'When did Swiss QR Code become mandatory?',
    answer:
      'Swiss QR Code became mandatory for all Swiss banks on September 30, 2022. The old orange and red payment slips were discontinued on June 30, 2020.',
  },
  {
    id: 'reference-types',
    question: 'What is the difference between QRR, SCOR and NON?',
    answer:
      'These are the three reference types in Swiss QR Code: QRR (QR-Referenz) is a 27-digit number used for mass payments, SCOR (Creditor Reference) follows ISO 11649 for international use, and NON means no reference is used for simple transfers.',
  },
  {
    id: 'eur-support',
    question: 'Can I use Swiss QR Code with EUR instead of CHF?',
    answer:
      'Yes, Swiss QR Code supports both CHF and EUR transactions, making it useful for cross-border payments between Switzerland and the eurozone.',
  },
  {
    id: 'what-is-zahlteil',
    question: 'What is the Zahlteil?',
    answer:
      'The Zahlteil is the standardized payment slip that accompanies every Swiss QR Code invoice. It occupies the lower third of an A4 page and contains the QR code on the right and a smaller receipt section (Empfangsschein) on the left.',
  },
  {
    id: 'swiss-qr-vs-girocode',
    question: 'Is Swiss QR Code the same as GiroCode?',
    answer:
      'No. Swiss QR Code is used exclusively in Switzerland and Liechtenstein, while GiroCode is the SEPA standard for 36 European countries. They have different payload structures and are not interchangeable.',
  },
  {
    id: 'which-banks',
    question: 'Which Swiss banks support Swiss QR Code?',
    answer:
      'All Swiss banks are legally required to support Swiss QR Code since September 2022, including UBS, PostFinance, Raiffeisen, all Kantonalbanken, Migros Bank, Cler, and Valiant.',
  },
  {
    id: 'swiss-cross',
    question: 'What is the Swiss Cross in the QR code center?',
    answer:
      'The Swiss Cross (white cross on red background) must appear in the center of every Swiss QR Code. It identifies it as a Swiss payment QR code and distinguishes it from standard QR codes. No logos or other images may replace it.',
  },
  {
    id: 'bic-required',
    question: 'Do I need the BIC for Swiss QR Code?',
    answer:
      'No, BIC is not required for Swiss QR Code. The IBAN alone is sufficient to identify the recipient bank in Switzerland.',
  },
  {
    id: 'iban-format',
    question: 'What IBAN format does Swiss QR Code require?',
    answer:
      'Swiss QR Code requires a Swiss IBAN starting with CH or a Liechtenstein IBAN starting with LI, both exactly 21 characters long.',
  },
  {
    id: 'amount-optional',
    question: 'Can I generate a Swiss QR Code without an amount?',
    answer:
      'Yes, the amount is optional in Swiss QR Code. Leaving it blank creates an open invoice where the payer enters the amount manually.',
  },
  {
    id: 'minimum-size',
    question: 'What is the minimum size for a Swiss QR Code?',
    answer:
      'The Swiss QR Code must be at least 46mm × 46mm on printed documents. A quiet zone of at least 5mm must surround the code.',
  },
  {
    id: 'logo-in-qr',
    question: 'Can I add my company logo to a Swiss QR Code?',
    answer:
      'No. Swiss QR Code specifications strictly require only the Swiss Cross in the center. Unlike GiroCode, no logos are permitted.',
  },
  {
    id: 'vs-normal-qr',
    question: 'What is the difference between Swiss QR Code and a normal QR code?',
    answer:
      'Swiss QR Code uses a specific EMV-based payload format defined by SIX Group, contains structured payment data (IBAN, amount, reference), and always has the Swiss Cross in the center. A normal QR code has no standardized payment structure.',
  },
  {
    id: 'how-to-scan',
    question: 'How do I scan a Swiss QR Code?',
    answer:
      'Open your Swiss banking app and use the QR scan feature. All major Swiss banking apps (PostFinance, UBS, Raiffeisen, BEKB etc.) support Swiss QR Code scanning directly.',
  },
  {
    id: 'security',
    question: 'Is Swiss QR Code secure?',
    answer:
      'Yes. Swiss QR Code is processed entirely on the device – no payment data is sent to external servers when generating. The actual payment is authorized through your bank\'s secure authentication process.',
  },
  {
    id: 'international-payments',
    question: 'Can I use Swiss QR Code for international payments outside Switzerland?',
    answer:
      'Swiss QR Code is designed for payments to Swiss (CH) and Liechtenstein (LI) IBANs only. For international SEPA payments, use GiroCode instead.',
  },
  {
    id: 'damaged-code',
    question: 'What happens if my Swiss QR Code is damaged or partially obscured?',
    answer:
      'Swiss QR Code uses error correction level M, which allows up to 15% of the code to be damaged or obscured while still being readable. Always ensure the Swiss Cross area is clean and undamaged.',
  },
  {
    id: 'message-length',
    question: 'How many characters can the payment message contain?',
    answer:
      'The additional message (Mitteilung) in Swiss QR Code can contain up to 140 characters. The reference field supports up to 27 digits for QRR or up to 25 characters for SCOR references.',
  },
  {
    id: 'email-invoices',
    question: 'Can businesses send Swiss QR Code invoices by email?',
    answer:
      'Yes, Swiss QR Code invoices can be sent digitally as PDF. The QR code is scannable from both printed and digital formats on screen.',
  },
  {
    id: 'what-is-empfangsschein',
    question: 'What is the Empfangsschein?',
    answer:
      'The Empfangsschein is the small receipt section on the left side of the Zahlteil. It contains the same payment information in human-readable form and is meant to be kept by the recipient as confirmation.',
  },
  {
    id: 'api-generation',
    question: 'Is there an API for generating Swiss QR Codes?',
    answer:
      'qrpayhub.com will offer a REST API for Swiss QR Code generation as part of the API plan (coming soon), allowing integration into invoicing software, ERPs and accounting systems.',
  },
  {
    id: 'font-requirements',
    question: 'What font and size must be used in the Zahlteil?',
    answer:
      'The Zahlteil requires Liberation Sans (or a metrically equivalent font) at a minimum of 8pt for regular text and 11pt for headings. Only black text on white background is permitted.',
  },
  {
    id: 'digital-invoice',
    question: 'Can I use Swiss QR Code on a digital invoice without printing?',
    answer:
      'Yes. Many Swiss businesses send PDF invoices containing the Zahlteil section digitally. Banking apps can scan the QR code directly from a phone or computer screen.',
  },
  {
    id: 'replaced-orange-slip',
    question: 'What replaced the orange Einzahlungsschein?',
    answer:
      'The Swiss QR Code (QR-Rechnung) with its Zahlteil replaced both the orange Einzahlungsschein (ESR, with reference) and the red Einzahlungsschein (ES, without reference) on June 30, 2020.',
  },
];
