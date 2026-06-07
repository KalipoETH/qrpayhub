import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-vietqr',
    question: 'What is VietQR?',
    answer:
      "VietQR is Vietnam's national bank transfer QR code standard, developed by NAPAS (National Payment Corporation of Vietnam) and launched in March 2022. It allows customers to make instant bank transfers by scanning a QR code that contains bank account details, eliminating the need to manually enter account numbers.",
  },
  {
    id: 'who-developed-vietqr',
    question: 'Who developed VietQR?',
    answer:
      'VietQR was developed by NAPAS (Công ty Cổ phần Thanh toán Quốc gia Việt Nam), Vietnam\'s national payment corporation supervised by the State Bank of Vietnam (SBV). NAPAS operates Vietnam\'s interbank switching infrastructure.',
  },
  {
    id: 'what-is-bank-bin',
    question: "What is a Bank BIN in VietQR?",
    answer:
      'BIN (Bank Identification Number) is a 6-digit code that identifies the bank in VietQR. For example: 970436 = Vietcombank, 970418 = BIDV, 970405 = Agribank. The BIN is the first 6 digits of the VietQR payload\'s merchant account field.',
  },
  {
    id: 'which-banks-support-vietqr',
    question: 'Which banks support VietQR?',
    answer:
      'Over 50 Vietnamese banks support VietQR, including all major banks: Vietcombank, BIDV, Agribank, Vietinbank, Techcombank, MB Bank, VPBank, TPBank, Sacombank, ACB, and all other NAPAS-member banks.',
  },
  {
    id: 'account-name-uppercase',
    question: 'Why must Vietnamese account names be in UPPERCASE without accents?',
    answer:
      'Vietnamese bank systems use ASCII character sets that don\'t support Vietnamese diacritical marks (tones and accents). Account names must be entered in UPPERCASE without accents (e.g., "NGUYEN VAN A" not "Nguyễn Văn A") to ensure compatibility across all banking systems.',
  },
  {
    id: 'vietqr-transaction-limit',
    question: 'What is the VietQR transaction limit?',
    answer:
      'VietQR limits vary by bank. Standard limits are typically 500 million VND per transaction for individual accounts. The State Bank of Vietnam sets maximum thresholds that individual banks must not exceed.',
  },
  {
    id: 'is-vietqr-free',
    question: 'Is VietQR free?',
    answer:
      'Interbank VietQR transfers may incur small fees depending on the bank and account type. Same-bank transfers are typically free. The State Bank of Vietnam has been pushing for free interbank transfers as part of digital payment promotion.',
  },
  {
    id: 'apps-support-vietqr',
    question: 'What apps support VietQR scanning?',
    answer:
      'All major Vietnamese banking apps support VietQR: Vietcombank VCB-Mobile, BIDV Smart Banking, Agribank E-Mobile, Techcombank Mobile, MB Bank, VNPay, MoMo, ZaloPay, and most other Vietnamese banking and e-wallet apps.',
  },
  {
    id: 'vietqr-vs-vnpay',
    question: 'What is the difference between VietQR and VNPay QR?',
    answer:
      'VietQR is the national bank-transfer standard (direct bank-to-bank). VNPay is a payment gateway that processes transactions through participating banks. VNPay QR may redirect through the VNPay network, while VietQR transfers go directly between bank accounts via NAPAS.',
  },
  {
    id: 'vietqr-payload-technical',
    question: 'How does the VietQR payload work technically?',
    answer:
      'VietQR uses EMV QR format with NAPAS AID "A000000727" in tag ID 38 (not ID 26 like other standards). The payload contains the bank BIN (tag 01) and account number (tag 02) within the merchant account field, plus CRC16 checksum.',
  },
  {
    id: 'what-is-napas',
    question: 'What is NAPAS and its role in VietQR?',
    answer:
      "NAPAS (National Payment Corporation of Vietnam) operates Vietnam's interbank switching network. All VietQR transactions are routed through NAPAS infrastructure for real-time settlement. NAPAS is equivalent to India's NPCI or Malaysia's PayNet.",
  },
  {
    id: 'vietqr-merchant-payments',
    question: 'Can VietQR be used for merchant payments?',
    answer:
      "Yes. Merchants register for VietQR through their bank. Customers scan the merchant's VietQR code and the transfer goes directly to the merchant's bank account. This is increasingly common at Vietnamese restaurants, shops, and markets.",
  },
  {
    id: 'quick-amount-feature',
    question: 'What is the quick amount feature in VietQR?',
    answer:
      'Vietnamese payment apps often show preset amount buttons (50,000đ, 100,000đ, 200,000đ, 500,000đ) when scanning VietQR, as these are common transaction amounts. The sender can also enter a custom amount.',
  },
  {
    id: 'vietqr-cross-border',
    question: 'Does VietQR support cross-border payments?',
    answer:
      'Vietnam is developing cross-border QR payment linkages with ASEAN countries. PromptPay (Thailand) and VietQR have announced bilateral connectivity, and Vietnam participates in the ASEAN regional QR interoperability initiative.',
  },
  {
    id: 'before-vietqr',
    question: 'What replaced bank account number entry after VietQR?',
    answer:
      'Before VietQR, customers had to manually enter the beneficiary\'s bank name, account number, and name for each transfer – a process prone to errors. VietQR encodes all this information in a single QR code, eliminating manual entry and reducing transfer errors significantly.',
  },
  {
    id: 'vietqr-logo-requirement',
    question: 'Is there a VietQR logo requirement?',
    answer:
      'Yes, officially registered VietQR merchants should display the VietQR logo on their QR code materials. The logo helps customers identify valid VietQR codes from other QR codes.',
  },
  {
    id: 'vietqr-currency',
    question: 'What currency does VietQR use?',
    answer:
      'VietQR uses Vietnamese Dong (VND), currency code 704 in the EMV payload. VND has no subdivisions (no cents), so all amounts are whole numbers.',
  },
  {
    id: 'vietqr-transaction-volume',
    question: 'How many VietQR transactions happen per month?',
    answer:
      'As of 2025–2026, Vietnamese banks process hundreds of millions of VietQR transactions monthly. The adoption accelerated significantly after the State Bank of Vietnam promoted cashless payments.',
  },
  {
    id: 'vietqr-without-amount',
    question: 'Can I generate a VietQR without an amount?',
    answer:
      'Yes. Leaving the amount empty creates a static VietQR where the sender enters the amount. This is common for personal payment QR codes shared via social media or displayed at small merchants.',
  },
  {
    id: 'vietqr-api',
    question: 'Is there an API for VietQR generation?',
    answer:
      'qrpayhub.com will offer a REST API for VietQR generation as part of the API plan (coming soon).',
  },
  {
    id: 'img-vietqr-io',
    question: 'What is the img.vietqr.io service?',
    answer:
      'img.vietqr.io is an official VietQR image generation service provided by NAPAS partners. It generates QR code images with bank branding. qrpayhub.com generates the underlying EMV payload directly without external services.',
  },
  {
    id: 'find-bank-bin',
    question: "How do I find my bank's BIN for VietQR?",
    answer:
      "Your bank's BIN is a fixed 6-digit code: Vietcombank=970436, BIDV=970418, Agribank=970405, Vietinbank=970415, Techcombank=970407. Full BIN lists are published by NAPAS and available through Vietnamese banking associations.",
  },
  {
    id: 'zalopay-vietqr',
    question: "What is ZaloPay's relationship with VietQR?",
    answer:
      'ZaloPay is a popular Vietnamese e-wallet by VNG Corporation. It supports VietQR scanning for bank transfers. ZaloPay users can send money to any VietQR-enabled bank account directly from the ZaloPay app.',
  },
  {
    id: 'momo-vietqr',
    question: "What is MoMo's relationship with VietQR?",
    answer:
      "MoMo is Vietnam's largest e-wallet with over 31 million users. MoMo supports VietQR for bank account transfers. Users can scan VietQR codes to transfer from their MoMo wallet or linked bank account.",
  },
  {
    id: 'vietqr-digital-economy',
    question: "Why is VietQR important for Vietnam's digital economy?",
    answer:
      "VietQR plays a crucial role in Vietnam's cashless payment push. The State Bank of Vietnam targets 80% of transactions to be cashless by 2025. VietQR, by simplifying bank transfers for both consumers and merchants, is a key enabler of this goal.",
  },
];
