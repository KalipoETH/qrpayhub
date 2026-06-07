import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-codi',
    question: 'What is CoDi?',
    answer:
      'CoDi (Cobro Digital) is Mexico\'s digital payment system developed by Banxico (Banco de México). Launched in September 2019, it uses QR codes and NFC to initiate SPEI transfers, allowing businesses to collect digital payments 24/7 without fees.',
  },
  {
    id: 'who-developed-codi',
    question: 'Who developed CoDi?',
    answer:
      "CoDi was developed and is operated by Banxico (Banco de México), Mexico's central bank. It was created as part of Banxico's strategy to increase financial inclusion and reduce cash usage in Mexico.",
  },
  {
    id: 'spei-and-codi',
    question: 'What is SPEI and how does it relate to CoDi?',
    answer:
      "SPEI (Sistema de Pagos Electrónicos Interbancarios) is Mexico's interbank electronic payment system, operated by Banxico since 2004. CoDi uses SPEI as its settlement infrastructure. When a CoDi QR is scanned, it initiates a SPEI transfer from the payer's account to the recipient.",
  },
  {
    id: 'what-is-clabe',
    question: 'What is a CLABE?',
    answer:
      'CLABE (Clave Bancaria Estandarizada) is Mexico\'s 18-digit standardized bank account number used for SPEI transfers. The first 3 digits identify the bank, digits 4–6 identify the city, digits 7–17 are the account number, and digit 18 is a check digit calculated using a weighted algorithm.',
  },
  {
    id: 'clabe-validation',
    question: 'How do I validate a CLABE?',
    answer:
      'CLABE validation uses weighted digits: multiply each of the first 17 digits by weights (3,7,1 repeating), sum the results modulo 10, subtract from 10 and take modulo 10 – this gives the 18th check digit. qrpayhub.com validates CLABEs automatically using this algorithm.',
  },
  {
    id: 'is-codi-free',
    question: 'Is CoDi free?',
    answer:
      'Yes, CoDi transactions are free for both payers and recipients. Banxico mandated zero fees for CoDi as part of its financial inclusion strategy.',
  },
  {
    id: 'amount-required-codi',
    question: 'Why is an amount required for CoDi?',
    answer:
      'Unlike other QR payment standards, CoDi always requires a payment amount to be encoded in the QR code. This is because CoDi initiates a specific SPEI transfer rather than a general payment request that the payer fills in.',
  },
  {
    id: 'referencia-numerica',
    question: 'What is a Referencia Numérica in CoDi?',
    answer:
      'The Referencia Numérica is a 1–7 digit numeric reference required for all SPEI/CoDi transfers. It serves as the payment reference for reconciliation. Businesses typically use invoice numbers or order numbers as the reference.',
  },
  {
    id: 'mexican-banks-codi',
    question: 'Which Mexican banks support CoDi?',
    answer:
      'All banks participating in SPEI support CoDi, including: BBVA México, Santander MX, Banorte, HSBC México, Citibanamex, Scotiabank MX, Inbursa, BanBajío, and all other SPEI-participant banks. This covers over 99% of Mexican bank accounts.',
  },
  {
    id: 'banxico-role',
    question: "What is Banxico's role in Mexican payments?",
    answer:
      'Banxico (Banco de México) is Mexico\'s central bank and operates SPEI, the national interbank payment system. Banxico created CoDi to add QR-based payment functionality to SPEI, and mandates that all SPEI-participant banks offer CoDi to their customers.',
  },
  {
    id: 'codi-transaction-limit',
    question: 'What is the CoDi transaction limit?',
    answer:
      'CoDi/SPEI limits vary by bank. Standard retail limits are typically MXN 8,000 per transaction for basic accounts. Premium accounts and business accounts can have limits up to MXN 500,000 or more per transaction.',
  },
  {
    id: 'codi-without-smartphone',
    question: 'Can CoDi be used without a smartphone?',
    answer:
      'CoDi primarily uses QR codes (smartphone-based). However, CoDi also supports NFC (Near Field Communication) as an alternative payment method, allowing payments without scanning a QR code on devices that support NFC.',
  },
  {
    id: 'concepto-field',
    question: 'What is the Concepto field in CoDi?',
    answer:
      'The Concepto (concept/description) is a required 1–35 character text field describing the purpose of the payment (e.g., "Pago factura 001", "Servicio mensual"). It appears in the payer\'s SPEI transfer record.',
  },
  {
    id: 'dimo-vs-codi',
    question: 'What replaced CoDi payments in everyday use?',
    answer:
      'While CoDi remains the official Banxico standard, DiMo (Dinero Móvil) was launched by Banxico in 2023 as a complementary system allowing transfers using phone numbers as proxies, similar to PIX in Brazil. CoDi and DiMo coexist in Mexico\'s payment ecosystem.',
  },
  {
    id: 'what-is-dimo',
    question: 'What is DiMo and how does it relate to CoDi?',
    answer:
      'DiMo (Dinero Móvil) is Banxico\'s newer mobile payment system launched in 2023, allowing transfers using phone numbers linked to bank accounts – similar to PIX or UPI. DiMo complements CoDi: CoDi handles QR merchant payments, DiMo handles person-to-person transfers via phone number.',
  },
  {
    id: 'spei-247',
    question: 'Is SPEI available 24/7?',
    answer:
      'Yes, SPEI operates 24/7/365 since 2014, making CoDi payments available at any time. Before 2014, SPEI had operating hours; extended hours were added to support digital payment growth.',
  },
  {
    id: 'bxc-protocol',
    question: 'What is the BXC protocol in CoDi QR codes?',
    answer:
      'CoDi QR codes use the "BXC://" protocol (Banxico) followed by payment details. The format "BXC://SPEI?data=..." encodes the SPEI transfer parameters in URL-encoded format within the QR code.',
  },
  {
    id: 'tourists-codi',
    question: 'Can tourists use CoDi in Mexico?',
    answer:
      'CoDi requires a Mexican bank account enrolled in SPEI. Foreign tourists cannot use CoDi directly. However, Mercado Pago México and other fintech wallets allow foreign cards to be used for payments at merchants, processing through different infrastructure.',
  },
  {
    id: 'codi-adoption-rate',
    question: 'What is the adoption rate of CoDi in Mexico?',
    answer:
      'CoDi adoption has been slower than anticipated. As of 2025, approximately 40 million Mexicans have CoDi-enabled accounts, but transaction volumes remain lower than targets. DiMo and Mercado Pago QR have captured significant market share in digital payments.',
  },
  {
    id: 'mercado-pago-codi',
    question: 'How does Mercado Pago QR relate to CoDi?',
    answer:
      'Mercado Pago is Latin America\'s largest fintech, with its own QR payment system widely used in Mexico. Mercado Pago QR is separate from CoDi but serves similar use cases. Many Mexican merchants accept both Mercado Pago QR and CoDi.',
  },
  {
    id: 'codi-api',
    question: 'Is there an API for CoDi QR generation?',
    answer:
      'qrpayhub.com will offer a REST API for CoDi QR generation as part of the API plan (coming soon).',
  },
  {
    id: 'clabe-bank-codes',
    question: 'What is the CLABE bank code for major Mexican banks?',
    answer:
      'First 3 digits of CLABE identify the bank: 002/012 = BBVA México, 014 = Santander, 021 = HSBC, 072 = Banorte, 006 = Bancomext, 058 = Banregio, 646 = STP (fintech).',
  },
  {
    id: 'codi-government-payments',
    question: 'Can CoDi be used for government payments?',
    answer:
      'Yes, several Mexican government agencies accept CoDi. Banxico actively promotes CoDi for government collections (taxes, fees, services) to reduce cash handling costs.',
  },
  {
    id: 'codi-future',
    question: 'What is the future of CoDi?',
    answer:
      "Banxico continues to develop CoDi alongside DiMo. Future plans include cross-border QR payment linkages with other Latin American countries, particularly as Brazil's PIX has shown the potential for instant payment systems in the region.",
  },
  {
    id: 'codi-security',
    question: 'How secure is CoDi?',
    answer:
      "CoDi transactions are processed through Banxico's SPEI infrastructure, which has operated since 2004 with high security standards. The QR code contains only the transfer details — no banking credentials are encoded. All transactions are authenticated by the payer's bank app using biometrics or PIN.",
  },
];
