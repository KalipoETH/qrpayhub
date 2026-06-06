import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-qris',
    question: 'What is QRIS?',
    answer:
      "QRIS (Quick Response Code Indonesian Standard) is Indonesia's national QR payment standard, launched on January 1, 2020 by Bank Indonesia. It unifies all QR payment codes from different providers (GoPay, OVO, Dana, LinkAja, ShopeePay) into one single standard, so merchants only need one QR code for all apps.",
  },
  {
    id: 'who-developed-qris',
    question: 'Who developed QRIS?',
    answer:
      'QRIS was developed by Bank Indonesia (BI), the country\'s central bank, together with the Indonesian Payment System Association (ASPI). It is based on the international EMV QR standard.',
  },
  {
    id: 'when-was-qris-launched',
    question: 'When was QRIS launched?',
    answer:
      "QRIS was officially launched on August 17, 2019 (Indonesia's Independence Day) and became mandatory for all payment providers on January 1, 2020.",
  },
  {
    id: 'which-apps-support-qris',
    question: 'Which apps support QRIS?',
    answer:
      'All major Indonesian payment apps support QRIS: GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri, BRI, BNI, CIMB Niaga, Permata, and 50+ other banks and e-wallets.',
  },
  {
    id: 'what-is-nmid',
    question: 'What is an NMID?',
    answer:
      'NMID (National Merchant ID) is the unique identifier assigned to every registered QRIS merchant by Bank Indonesia. It is a required component of the QRIS QR code and identifies the merchant in the payment network.',
  },
  {
    id: 'merchant-types',
    question: 'What are the four merchant types in QRIS?',
    answer:
      'QRIS classifies merchants into four categories: Usaha Mikro (micro businesses, annual revenue under Rp 300 million), Usaha Kecil (small businesses, Rp 300M–2.5B), Usaha Menengah (medium businesses, Rp 2.5B–50B), and Usaha Besar (large businesses, above Rp 50B). The category affects MDR fees.',
  },
  {
    id: 'mdr-fees',
    question: 'What is the MDR fee for QRIS?',
    answer:
      'MDR (Merchant Discount Rate) for QRIS: 0% for government and education institutions, 0.3% for micro merchants, 0.7% for small and medium merchants, and 0.7% for large merchants. These rates are regulated by Bank Indonesia.',
  },
  {
    id: 'free-for-consumers',
    question: 'Is QRIS free for consumers?',
    answer:
      'Yes, QRIS payments are completely free for consumers (buyers). Only merchants pay the MDR fee on received payments.',
  },
  {
    id: 'transaction-limit',
    question: 'What is the QRIS transaction limit?',
    answer:
      'The standard QRIS limit is Rp 10,000,000 (10 million rupiah) per transaction for regular users. Premium users with verified accounts can have higher limits up to Rp 20,000,000.',
  },
  {
    id: 'international-payments',
    question: 'Can QRIS be used for international payments?',
    answer:
      'Yes! Indonesia has cross-border QRIS connections with Thailand (PromptPay), Malaysia (DuitNow), Singapore (PayNow), Philippines (QR Ph), Vietnam (VietQR), India (UPI), and Japan. This allows tourists to pay at Indonesian merchants using their home country payment apps.',
  },
  {
    id: 'static-vs-dynamic',
    question: 'What is the difference between static and dynamic QRIS?',
    answer:
      'Static QRIS has no preset amount – the payer enters the amount. Dynamic QRIS includes a specific amount, used for e-commerce and invoices. Static codes are printed on stickers; dynamic codes are generated per transaction.',
  },
  {
    id: 'how-to-register',
    question: 'How do I register as a QRIS merchant?',
    answer:
      'Register through any Bank Indonesia-licensed PJSP (Payment Service Provider) such as GoPay, OVO, Dana, or your bank. You will receive an NMID and a QRIS sticker for your business.',
  },
  {
    id: 'is-qris-secure',
    question: 'Is QRIS secure?',
    answer:
      "Yes. QRIS uses CRC16 checksum validation to prevent tampering. All transactions are processed through Bank Indonesia's national switching infrastructure (BI-FAST). Payments require the payer's PIN or biometric authentication.",
  },
  {
    id: 'qris-tuntas',
    question: 'What does "QRIS Tuntas" mean?',
    answer:
      '"QRIS Tuntas" (QRIS Complete) is Bank Indonesia\'s initiative to expand QRIS acceptance to all types of payments including donations, toll roads, parking, and vending machines.',
  },
  {
    id: 'offline-use',
    question: 'Can QRIS be used without internet?',
    answer:
      'QRIS requires internet for the payment transaction itself. However, the QR code display does not require internet – merchants can show printed QRIS stickers offline.',
  },
  {
    id: 'aid-in-qris',
    question: 'What is the AID used in QRIS QR codes?',
    answer:
      'The Acquirer Identifier in QRIS QR codes is "ID.CO.QRIS.WWW" placed in EMV tag ID 26, identifying it as an Indonesian QRIS payment. This differentiates it from other EMV-based payment standards like PIX or PromptPay.',
  },
  {
    id: 'how-many-merchants',
    question: 'How many QRIS merchants are there in Indonesia?',
    answer:
      'As of 2025, there are over 30 million registered QRIS merchants in Indonesia, making it one of the largest QR payment merchant networks in the world.',
  },
  {
    id: 'individual-app-qr-codes',
    question: 'What happened to individual app QR codes after QRIS?',
    answer:
      'Before QRIS, each payment app had its own QR code. After QRIS became mandatory in 2020, all apps unified to the QRIS standard. Merchants replaced multiple QR stickers with one single QRIS code.',
  },
  {
    id: 'api-for-qris',
    question: 'Is there an API for QRIS generation?',
    answer:
      'qrpayhub.com will offer a REST API for QRIS generation as part of the API plan (coming soon).',
  },
  {
    id: 'qris-logo',
    question: 'What is the QRIS logo and why must it be displayed?',
    answer:
      'The QRIS logo is a mandatory visual element on all QRIS merchant codes. It consists of the letters "QRIS" with Bank Indonesia branding. Displaying the logo is required by Bank Indonesia regulation for all QRIS merchants.',
  },
  {
    id: 'foreign-tourists',
    question: 'Can foreign tourists use QRIS in Indonesia?',
    answer:
      'Yes, tourists from Thailand, Malaysia, Singapore, Philippines, Vietnam, India, and Japan can pay at QRIS merchants using their home payment apps (PromptPay, DuitNow, PayNow, etc.) through cross-border QR payment linkages.',
  },
  {
    id: 'merchant-criteria',
    question: 'What is Merchant Criteria in QRIS?',
    answer:
      'Merchant Criteria defines the merchant size and is encoded in the QRIS payload: "A" for micro and small merchants, "B" for medium, "C" for large. This affects the MDR rate charged to the merchant.',
  },
  {
    id: 'payment-speed',
    question: 'How long does a QRIS payment take?',
    answer:
      "QRIS payments complete in seconds, 24/7/365. The transaction goes through Bank Indonesia's national switching infrastructure and settles to the merchant's account in real time.",
  },
  {
    id: 'payment-flow',
    question: 'What is the QRIS payment flow?',
    answer:
      '1) Payer opens any QRIS-enabled app, 2) scans merchant\'s QRIS code, 3) confirms amount (or views preset amount), 4) enters PIN or uses biometrics, 5) payment completes in seconds, 6) both parties receive confirmation.',
  },
  {
    id: 'bi-fast',
    question: 'What is BI-FAST and how does it relate to QRIS?',
    answer:
      "BI-FAST is Bank Indonesia's national fast payment infrastructure, launched December 2021. QRIS runs on top of BI-FAST for real-time settlement. BI-FAST also supports non-QR transfers. Together they form Indonesia's modern payment infrastructure.",
  },
];
