import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-girocode',
    question: 'What is a GiroCode?',
    answer:
      'A GiroCode (also called EPC QR Code) is a standardized QR code for SEPA bank transfers. It encodes payment details — recipient name, IBAN, amount, and reference — so that banking apps can pre-fill a transfer form automatically when the code is scanned. It was developed by the European Payments Council (EPC) and is defined in specification EPC069-12.',
  },
  {
    id: 'is-free',
    question: 'Is GiroCode free to use?',
    answer:
      'Yes, generating and scanning GiroCodes is completely free. The EPC standard is open and royalty-free. QRPayHub generates GiroCodes entirely in your browser — no account, no subscription, no fees.',
  },
  {
    id: 'which-countries',
    question: 'Which countries support GiroCode?',
    answer:
      'All 36 SEPA member countries support GiroCode: the 27 EU member states plus Switzerland, Norway, Iceland, Liechtenstein, the United Kingdom, Monaco, San Marino, Vatican City, and Andorra. Any bank in these countries that supports SEPA Credit Transfers also supports GiroCode.',
  },
  {
    id: 'which-app',
    question: 'Do I need a special app to scan a GiroCode?',
    answer:
      'No special app is needed. Most modern banking apps support scanning GiroCodes directly. In Germany, all major banks — Deutsche Bank, Sparkasse, Volksbank, ING, DKB, N26, Commerzbank, Comdirect and others — support it. Simply open your banking app, tap "Transfer" or "Scan QR code", and point the camera at the GiroCode.',
  },
  {
    id: 'logo-in-qr',
    question: 'Can I include a logo in my GiroCode?',
    answer:
      'The EPC standard does not officially support embedded logos. Some third-party generators allow adding logos by using a higher error correction level (Level Q or H), which reserves part of the code for the logo. However, this is not part of the official specification and may cause compatibility issues with some banking apps. For professional use, we recommend sticking to the standard format.',
  },
  {
    id: 'max-amount',
    question: 'What is the maximum amount for a GiroCode?',
    answer:
      'The EPC standard supports amounts up to 999,999,999.99 EUR (just under one billion euros). The amount must be expressed as a decimal number with a dot separator — for example EUR12345.67. The amount field is optional; if omitted, the payer can enter any amount manually.',
  },
  {
    id: 'bic-required',
    question: 'Is the BIC required?',
    answer:
      'Since version 002 of the standard (2016), the BIC is optional for SEPA transfers. Most modern banking apps can look up the bank from the IBAN alone. Version 001 required the BIC; version 002 does not. QRPayHub generates version 002 by default, making the BIC optional.',
  },
  {
    id: 'girocode-vs-swiss',
    question: 'What is the difference between GiroCode and Swiss QR Code?',
    answer:
      'Swiss QR Code is a separate national standard used exclusively in Switzerland and Liechtenstein, defined by SIX Group. It has a different payload structure, includes a mandatory Swiss-specific "coding line", and requires a QR-IBAN (a special IBAN variant). GiroCode follows the EPC standard and works across all 36 SEPA countries. The two formats are not interchangeable.',
  },
  {
    id: 'international-transfers',
    question: 'Can I use GiroCode for international transfers outside SEPA?',
    answer:
      'No. GiroCode is exclusively for SEPA Credit Transfers within the SEPA zone. It cannot be used for transfers to non-SEPA countries (e.g. the United States, Japan or Australia). For international transfers outside SEPA, you would need a different payment format such as SWIFT.',
  },
  {
    id: 'invalid-iban',
    question: 'What happens if the IBAN is invalid?',
    answer:
      'A good QR scanner or banking app will validate the IBAN automatically and show an error if it is invalid. QRPayHub validates IBANs using the official Mod-97 checksum algorithm before generating any QR code — you will see an error message immediately if the IBAN is incorrect.',
  },
  {
    id: 'security',
    question: 'Is GiroCode secure?',
    answer:
      'GiroCode itself is a data format, not a security mechanism. The security of the actual bank transfer is provided by your banking app and your bank. The payer always sees and must confirm all payment details before the transfer is executed. One risk to be aware of: a malicious actor could print a fake GiroCode on a real invoice and change the IBAN. Always verify payment details before confirming a transfer.',
  },
  {
    id: 'privacy',
    question: 'Does QRPayHub store my IBAN or payment data?',
    answer:
      "No. QRPayHub generates GiroCodes entirely in your browser (client-side). Your IBAN, recipient name, amount and reference never leave your device. No data is sent to our servers. You can verify this by checking your browser's network requests.",
  },
  {
    id: 'qr-size',
    question: 'What size should the GiroCode be on a printed invoice?',
    answer:
      'The minimum recommended size is 2 cm × 2 cm. For better reliability, especially if the code will be printed at lower quality, 3 cm × 3 cm is preferable. Always include at least 2 mm of white quiet zone on all four sides. Do not use JPEG for printing — use PNG or vector format (SVG/PDF) to avoid compression artifacts.',
  },
  {
    id: 'how-many-lines',
    question: 'How many characters can the payment reference contain?',
    answer:
      'The unstructured payment reference (line 11 of the payload) can contain up to 140 characters. For structured references (line 10, using the ISO 11649 creditor reference format), the maximum is also 35 characters. You can use one or the other, but not both simultaneously.',
  },
  {
    id: 'error-correction',
    question: 'Which error correction level does GiroCode use?',
    answer:
      'The EPC specification recommends error correction level M (medium, ~15% recovery capacity). This is a good balance between QR code density and scan reliability. QRPayHub uses level M by default.',
  },
  {
    id: 'version-difference',
    question: 'What is the difference between GiroCode version 001 and 002?',
    answer:
      'Version 001 required the BIC (bank identifier code) of the beneficiary bank. Version 002, introduced in 2016, made the BIC optional — since all SEPA banks can now be identified from the IBAN alone. Version 002 is recommended for all new implementations. QRPayHub generates version 002 by default.',
  },
  {
    id: 'offline',
    question: 'Does GiroCode work offline?',
    answer:
      'The generation of GiroCodes works offline — the QR code is created entirely in your browser. The scanning side (your banking app) typically requires an internet connection to validate the IBAN and submit the transfer, but the scanning and pre-filling of the form can work without a connection.',
  },
  {
    id: 'api',
    question: 'Is there an API for generating GiroCodes programmatically?',
    answer:
      'A QRPayHub API is planned for a future release. In the meantime, you can generate GiroCodes programmatically using any QR code library (such as qrcode for Node.js or Python) by constructing the payload manually following the EPC069-12 specification. The payload is plain text and trivial to generate in any programming language.',
  },
  {
    id: 'invoice-software',
    question: 'Which invoice software supports GiroCode generation?',
    answer:
      'Many European invoicing platforms support GiroCode natively, including Lexware, sevDesk, FastBill, Debitoor, and Billomat. In Germany, the DATEV ecosystem also supports GiroCode. Microsoft Word and LibreOffice do not have built-in support, but you can generate a GiroCode here and embed it as an image.',
  },
  {
    id: 'multiple-currencies',
    question: 'Can GiroCode be used with currencies other than EUR?',
    answer:
      'Technically, the EPC specification allows other SEPA currencies (e.g. CHF for Swiss transfers within Switzerland). However, in practice, GiroCode is almost exclusively used for EUR transfers. The Swiss QR Code standard is the preferred format for CHF transfers in Switzerland.',
  },
];
