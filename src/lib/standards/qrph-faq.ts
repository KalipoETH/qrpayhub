import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-qrph',
    question: 'What is QR Ph?',
    answer:
      'QR Ph is the Philippines\' national QR code standard for financial transactions, developed by BSP (Bangko Sentral ng Pilipinas) and launched in 2021–2022. It is built on the EMV QR standard and uses the InstaPay network for real-time interbank transfers, available 24/7.',
  },
  {
    id: 'who-developed-qrph',
    question: 'Who developed QR Ph?',
    answer:
      "QR Ph was developed by the Bangko Sentral ng Pilipinas (BSP), the Philippines' central bank, as part of the national Digital Payments Transformation Roadmap (2020–2023). It standardizes QR payments across all BSP-supervised financial institutions.",
  },
  {
    id: 'what-is-instapay',
    question: 'What is InstaPay?',
    answer:
      "InstaPay is the Philippines' real-time low-value electronic fund transfer service, operated by BancNet and supervised by BSP. QR Ph uses InstaPay as its underlying transfer network. InstaPay allows transfers up to ₱50,000 per transaction, available 24/7, 365 days a year.",
  },
  {
    id: 'proxy-types',
    question: 'What proxy types does QR Ph support?',
    answer:
      'QR Ph supports three proxy types: mobile number (Philippine format, 09XX-XXX-XXXX), bank account number (10–16 digits), and email address. The MSISDN (mobile), ACCT (account), and EMAIL proxy types are encoded in the EMV payload.',
  },
  {
    id: 'apps-support-qrph',
    question: 'Which apps support QR Ph?',
    answer:
      'All major Philippine payment apps support QR Ph: GCash, Maya (formerly PayMaya), BDO Online Banking, BPI Mobile, UnionBank Online, Metrobank Mobile, Landbank Mobile, RCBC DiskarTech, and all other BSP-supervised financial institutions.',
  },
  {
    id: 'gcash-role',
    question: "What is GCash's role in Philippine payments?",
    answer:
      "GCash is the Philippines' largest digital wallet with over 94 million registered users. It supports QR Ph for bank transfers and merchant payments. GCash-to-GCash transfers are instant and free, while GCash-to-bank transfers use the InstaPay/QR Ph network.",
  },
  {
    id: 'what-is-maya',
    question: 'What is Maya (PayMaya)?',
    answer:
      'Maya (formerly PayMaya) is the Philippines\' second largest digital financial platform with over 50 million users. It offers a digital wallet, virtual and physical cards, and supports QR Ph. Maya is operated by PayMaya Philippines, a subsidiary of PLDT.',
  },
  {
    id: 'qrph-transaction-limit',
    question: 'What is the QR Ph transaction limit?',
    answer:
      'QR Ph via InstaPay allows up to ₱50,000 per transaction. For higher amounts, PESONet (which settles in batches) can be used. BSP is working on increasing InstaPay limits as adoption grows.',
  },
  {
    id: 'qrph-free',
    question: 'Is QR Ph free for consumers?',
    answer:
      'Most banks and e-wallets offer free QR Ph transfers for basic transactions. Some may charge for interbank transfers above certain amounts. BSP has been pushing for free or low-cost digital payments as part of financial inclusion goals.',
  },
  {
    id: 'philippine-mobile-format',
    question: 'What is the Philippine mobile number format?',
    answer:
      'Philippine mobile numbers are 11 digits starting with 09 (e.g., 09171234567). In QR Ph, they are normalized to international format: +639171234567 (replace leading 0 with +63). Valid prefixes include 0905–0907, 0908–0919, 0920–0930, and many more assigned to Globe, Smart, and DITO networks.',
  },
  {
    id: 'qrph-aid',
    question: 'What is the AID for QR Ph?',
    answer:
      'The QR Ph Application Identifier is "PH.INSTAPAY.ME", placed in EMV tag ID 26. This identifies the QR code as a Philippine InstaPay payment.',
  },
  {
    id: 'what-is-pesonet',
    question: 'What is PESONet?',
    answer:
      "PESONet is the Philippines' batch electronic fund transfer service for larger amounts, also supervised by BSP. While QR Ph/InstaPay handles real-time low-value payments, PESONet handles higher-value batch transfers. Together they form the Philippines' electronic payment infrastructure.",
  },
  {
    id: 'foreign-tourists-qrph',
    question: 'Can foreign tourists use QR Ph in the Philippines?',
    answer:
      'Foreign nationals with Philippine bank accounts or e-wallets can use QR Ph. Cross-border QR payment linkages between the Philippines and other ASEAN countries are being developed through the ASEAN regional interoperability framework.',
  },
  {
    id: 'bancnet-role',
    question: "What is BancNet's role in QR Ph?",
    answer:
      "BancNet is the Philippines' interbank network operator, operating the InstaPay and PESONet infrastructure. All QR Ph transactions are routed through BancNet's switching system for real-time settlement.",
  },
  {
    id: 'qrph-financial-inclusion',
    question: 'How does QR Ph help financial inclusion?',
    answer:
      "The Philippines has one of the largest unbanked populations in Southeast Asia. QR Ph and e-wallets like GCash allow Filipinos without traditional bank accounts to participate in digital payments, supporting BSP's goal of 50% digital payment transaction volume by 2023.",
  },
  {
    id: 'gcash-qr-vs-qrph',
    question: 'What is the difference between GCash QR and QR Ph?',
    answer:
      'GCash QR (within the GCash app) works for GCash-to-GCash payments. QR Ph is the interoperable standard that works across all banks and e-wallets. GCash supports scanning QR Ph codes for interbank transfers, making the two standards complementary.',
  },
  {
    id: 'qrph-currency',
    question: 'What currency does QR Ph use?',
    answer:
      'QR Ph uses Philippine Peso (PHP), currency code 608 in the EMV payload. Amounts include 2 decimal places.',
  },
  {
    id: 'qrph-api',
    question: 'Is there an API for QR Ph generation?',
    answer:
      'qrpayhub.com will offer a REST API for QR Ph generation as part of the API plan (coming soon).',
  },
  {
    id: 'before-qrph',
    question: 'What happened before QR Ph standardization?',
    answer:
      'Before QR Ph, different banks and e-wallets had their own QR formats. Merchants needed multiple QR codes for different apps. QR Ph unified these under one standard, simplifying the merchant experience and increasing interoperability.',
  },
  {
    id: 'qrph-transaction-volume',
    question: 'How many QR Ph transactions happen monthly?',
    answer:
      'Philippine digital payment volumes have grown significantly since QR Ph launch. BSP reports hundreds of millions of monthly InstaPay transactions, with QR-based transactions representing a growing share.',
  },
  {
    id: 'purpose-field',
    question: 'What is the purpose field in QR Ph?',
    answer:
      'The purpose field (up to 35 characters) allows the payer or merchant to specify the reason for payment (e.g., "Grocery payment", "Rent", "Service fee"). It is optional but helps with transaction reconciliation.',
  },
  {
    id: 'qrph-bill-payments',
    question: 'Can QR Ph be used for bill payments?',
    answer:
      'Yes, many Philippine billers (utilities, telecoms, government agencies) accept QR Ph payments through their banking apps. The reference ID field is used to identify the account or bill being paid.',
  },
  {
    id: 'rcbc-diskartech',
    question: "What is RCBC DiskarTech's role?",
    answer:
      "DiskarTech is RCBC's (Rizal Commercial Banking Corporation) all-in-one app targeting unbanked Filipinos. It supports QR Ph payments and InstaPay transfers, contributing to BSP's financial inclusion goals.",
  },
  {
    id: 'unionbank-qrph',
    question: 'What is the UnionBank experience with QR Ph?',
    answer:
      'UnionBank of the Philippines was one of the early adopters of digital payments and QR Ph. Their app supports scanning QR Ph codes and generating personal QR codes for receiving payments, serving both retail and corporate customers.',
  },
  {
    id: 'qrph-security',
    question: 'How secure is QR Ph?',
    answer:
      'QR Ph uses CRC16 checksum validation and EMV standard encoding. Transactions are processed through BSP-supervised financial institutions with bank-grade authentication. The QR code contains no sensitive banking credentials.',
  },
];
