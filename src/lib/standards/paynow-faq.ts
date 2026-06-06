import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-paynow',
    question: 'What is PayNow?',
    answer:
      "PayNow is Singapore's peer-to-peer funds transfer service launched in July 2017 by the Association of Banks in Singapore (ABS) and the Monetary Authority of Singapore (MAS). It allows instant transfers using a mobile number, NRIC/FIN, or UEN instead of bank account numbers, available 24/7 at no cost.",
  },
  {
    id: 'who-developed-paynow',
    question: 'Who developed PayNow?',
    answer:
      "PayNow was developed by the Association of Banks in Singapore (ABS) and overseen by the Monetary Authority of Singapore (MAS). It was built on top of Singapore's existing FAST (Fast and Secure Transfers) infrastructure.",
  },
  {
    id: 'proxy-types',
    question: 'What proxy types does PayNow support?',
    answer:
      'PayNow supports three proxy types: mobile number (Singapore +65 format, starting with 8 or 9), NRIC/FIN (9-character Singapore identity number starting with S, T, F, or G), and UEN (Unique Entity Number for businesses, 9-10 characters ending with a letter).',
  },
  {
    id: 'which-banks',
    question: 'Which banks support PayNow in Singapore?',
    answer:
      "All major Singapore banks support PayNow: DBS/POSB, OCBC, UOB, Standard Chartered, Citibank, HSBC Singapore, Maybank SG, Bank of China SG, ICBC Singapore, and all other MAS-licensed banks. E-wallets including GrabPay and Singtel Dash also support PayNow.",
  },
  {
    id: 'is-paynow-free',
    question: 'Is PayNow free?',
    answer:
      "Yes, PayNow transfers are completely free for individuals. There are no transaction fees for person-to-person transfers. Businesses may incur fees depending on their bank's pricing.",
  },
  {
    id: 'transaction-limit',
    question: 'What is the PayNow transaction limit?',
    answer:
      "PayNow limits vary by bank. Typical limits are S$200,000 per transaction for individual accounts. Business accounts (via UEN) may have higher limits. Daily aggregate limits also apply per bank.",
  },
  {
    id: 'paynow-vs-fast',
    question: 'What is the difference between PayNow and FAST?',
    answer:
      "FAST (Fast and Secure Transfers) is Singapore's underlying interbank infrastructure for real-time transfers using account numbers. PayNow is built on top of FAST and adds proxy-based transfers (mobile/NRIC/UEN) so users don't need to share bank account details.",
  },
  {
    id: 'what-is-sgqr',
    question: 'What is SGQR?',
    answer:
      "SGQR (Singapore QR) is the unified QR code standard for merchant payments in Singapore, launched in September 2018. It consolidates multiple payment QR codes (PayNow, Nets, GrabPay, etc.) into one single QR label. PayNow QR is the most widely used component of SGQR.",
  },
  {
    id: 'what-is-uen',
    question: 'What is a UEN and how is it used in PayNow?',
    answer:
      "UEN (Unique Entity Number) is Singapore's business identifier, assigned by ACRA (Accounting and Corporate Regulatory Authority). Businesses use their UEN as a PayNow proxy to receive payments, making it easy for customers to pay without entering bank details.",
  },
  {
    id: 'nric-fin-format',
    question: 'What is the NRIC/FIN format?',
    answer:
      'Singapore NRIC/FIN numbers are 9 characters: one letter (S for Singapore citizens born before 2000, T for those born from 2000, F or G for foreigners), followed by 7 digits, followed by one check letter. Example: S1234567D.',
  },
  {
    id: 'foreigners',
    question: 'Can foreigners use PayNow in Singapore?',
    answer:
      'Foreign nationals with Singapore bank accounts or FIN numbers can register for PayNow. Tourists from Malaysia, Thailand, Indonesia, and India can pay at PayNow QR merchants through cross-border QR linkages.',
  },
  {
    id: 'cross-border',
    question: "What is PayNow's cross-border network?",
    answer:
      "Singapore's PayNow is linked with Malaysia (DuitNow, since 2021), Thailand (PromptPay, since 2021), India (UPI, since 2021), Indonesia (QRIS, since 2023), Philippines (QR Ph, since 2023), and is expanding to more countries. This allows cross-border QR payments between ASEAN nations.",
  },
  {
    id: 'editable-amount',
    question: 'What is the "editable amount" feature in PayNow QR?',
    answer:
      'PayNow QR codes can include an "editable" flag (ID 03 in the EMV payload). When set to "1", the payer can modify the preset amount before confirming. When "0", the amount is fixed. This is useful for invoices with variable service charges.',
  },
  {
    id: 'expiry-date',
    question: 'What is the PayNow expiry date feature?',
    answer:
      'PayNow QR codes can include an optional expiry date (ID 04 in the EMV payload, format YYYYMMDD). After the expiry date, the QR code is no longer valid. This is useful for time-limited payment requests or event tickets.',
  },
  {
    id: 'qr-vs-transfer',
    question: 'Is PayNow QR the same as PayNow transfer?',
    answer:
      'PayNow QR is used for merchant payments (point-of-sale). PayNow transfer (via banking app) is for peer-to-peer transfers. Both use the same underlying PayNow infrastructure but serve different use cases. The QR code method is typically used for retail transactions.',
  },
  {
    id: 'paynow-aid',
    question: 'What is the AID for PayNow QR?',
    answer:
      'The PayNow Application Identifier is "SG.PAYNOW", placed in EMV tag ID 26. This uniquely identifies the QR code as a Singapore PayNow payment.',
  },
  {
    id: 'paynow-vs-paylah',
    question: 'How does PayNow compare to PayLah!?',
    answer:
      "PayLah! is DBS Bank's proprietary digital wallet app that uses PayNow infrastructure. PayLah! is a DBS-specific application; PayNow is the interoperable network that works across all Singapore banks. PayLah! users can send and receive PayNow transfers.",
  },
  {
    id: 'recurring-payments',
    question: 'Can PayNow QR be used for recurring payments?',
    answer:
      "Standard PayNow QR is for one-time payments. For recurring payments, Singapore's GIRO or direct debit systems are more appropriate. However, businesses can generate fresh PayNow QR codes for each billing cycle.",
  },
  {
    id: 'grabpay',
    question: "What is GrabPay's relationship with PayNow?",
    answer:
      "GrabPay supports PayNow QR scanning – users can pay at PayNow QR merchants using GrabPay wallet. GrabPay is also part of the SGQR ecosystem. Cross-app interoperability is a core feature of Singapore's payment infrastructure.",
  },
  {
    id: 'api',
    question: 'Is there an API for PayNow QR generation?',
    answer:
      'qrpayhub.com will offer a REST API for PayNow QR generation as part of the API plan (coming soon), enabling integration into Singapore e-commerce platforms and POS systems.',
  },
  {
    id: 'singtel-dash',
    question: "What is Singtel Dash's role in PayNow?",
    answer:
      "Singtel Dash is Singapore's mobile wallet operated by Singtel. It supports PayNow transfers and QR payments, making it interoperable with all PayNow-enabled banks and merchants.",
  },
  {
    id: 'user-count',
    question: 'How many PayNow users are there?',
    answer:
      'Singapore has approximately 4 million registered PayNow users out of a population of 5.9 million, representing very high adoption. Monthly PayNow transaction volumes exceed S$10 billion.',
  },
  {
    id: 'replaced-cheques',
    question: 'What replaced cheques in Singapore after PayNow?',
    answer:
      'PayNow, together with FAST and PayNow Corporate, has largely replaced cheques for everyday payments in Singapore. The Singapore government announced plans to phase out cheques by 2025 for most business use cases.',
  },
  {
    id: 'without-bank-account',
    question: 'Can I receive PayNow without a Singapore bank account?',
    answer:
      'No. PayNow requires a Singapore bank account or MAS-licensed e-wallet (like GrabPay or Singtel Dash) to receive payments. All recipients must be registered with a Singapore financial institution.',
  },
  {
    id: 'paynow-corporate',
    question: 'What is the PayNow Corporate service?',
    answer:
      'PayNow Corporate extends PayNow to businesses via UEN. It allows companies to receive payments from individuals and other businesses instantly. Large corporations use PayNow Corporate for customer collections and disbursements.',
  },
];
