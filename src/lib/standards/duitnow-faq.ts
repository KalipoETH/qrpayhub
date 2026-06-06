import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-duitnow',
    question: 'What is DuitNow?',
    answer:
      'DuitNow is Malaysia\'s national instant payment system, launched in 2018 by PayNet (Payments Network Malaysia). It allows instant bank transfers using a proxy identifier (phone number, IC number, or business registration) instead of a bank account number, available 24/7.',
  },
  {
    id: 'who-developed-duitnow',
    question: 'Who developed DuitNow?',
    answer:
      'DuitNow was developed by PayNet (Payments Network Malaysia), a joint initiative of Bank Negara Malaysia (BNM) and 11 major Malaysian banks. PayNet operates Malaysia\'s core financial market infrastructure.',
  },
  {
    id: 'duitnow-id-types',
    question: 'What types of DuitNow IDs exist?',
    answer:
      'There are five DuitNow proxy types: mobile number (Malaysian format 01X-XXXXXXXX), MyKad IC number (12-digit Malaysian ID), passport number (for non-citizens), business registration number (ROC/ROB), and "Others" for special identifiers.',
  },
  {
    id: 'which-banks-support',
    question: 'Which banks support DuitNow?',
    answer:
      "All major Malaysian banks support DuitNow: Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, Affin Bank, Alliance Bank, Bank Islam, Bank Muamalat, BSN, and all other licensed Malaysian banks. E-wallets including Touch 'n Go, Boost, and GrabPay also support DuitNow.",
  },
  {
    id: 'is-duitnow-free',
    question: 'Is DuitNow free to use?',
    answer:
      'Yes, DuitNow transfers are free for individuals for amounts up to RM 5,000 per transaction. Some banks may charge a small fee for business accounts or amounts above the threshold.',
  },
  {
    id: 'transaction-limit',
    question: 'What is the DuitNow transaction limit?',
    answer:
      'The standard DuitNow limit is RM 50,000 per transaction for regular users. Business accounts may have higher limits depending on the bank.',
  },
  {
    id: 'duitnow-vs-duitnow-qr',
    question: 'What is the difference between DuitNow and DuitNow QR?',
    answer:
      'DuitNow is the transfer service (proxy-based transfers). DuitNow QR is the QR code payment standard for merchant payments, based on the EMV QR standard. Both are part of the DuitNow ecosystem operated by PayNet.',
  },
  {
    id: 'mykad-ic-number',
    question: 'What is a MyKad IC number?',
    answer:
      "MyKad is Malaysia's national identity card. The IC number is a 12-digit number in the format YYMMDD-PB-###G, where YY=birth year, MM=month, DD=day, PB=state and country code, ###=sequence, G=gender. It can be used as a DuitNow proxy.",
  },
  {
    id: 'foreigners-duitnow',
    question: 'Can foreigners use DuitNow in Malaysia?',
    answer:
      'Foreign nationals with Malaysian bank accounts can register DuitNow with their passport number. Tourists from Singapore can pay at DuitNow QR merchants through the PayNow-DuitNow linkage.',
  },
  {
    id: 'cross-border',
    question: 'What is the DuitNow cross-border connection?',
    answer:
      'Malaysia has bilateral QR payment linkages with Singapore (PayNow), Thailand (PromptPay), Indonesia (QRIS), and Philippines (QR Ph) through ASEAN-wide QR interoperability initiatives.',
  },
  {
    id: 'duitnow-aid',
    question: 'What is the AID for DuitNow QR?',
    answer:
      'The DuitNow QR AID (Application Identifier) is "A000000693010011", placed in EMV tag ID 26 of the QR payload. This uniquely identifies the code as a DuitNow payment.',
  },
  {
    id: 'how-to-register',
    question: 'How do I register for DuitNow?',
    answer:
      "Register through your Malaysian bank's mobile app or internet banking portal. Link your phone number or IC number to your bank account. Most Malaysian banks support DuitNow registration in under 2 minutes.",
  },
  {
    id: 'touch-n-go',
    question: "What is Touch 'n Go eWallet's role in DuitNow?",
    answer:
      "Touch 'n Go (TnG) eWallet supports DuitNow QR for merchant payments. Users can scan DuitNow QR codes with the TnG app. TnG is Malaysia's most popular e-wallet with over 18 million users.",
  },
  {
    id: 'bill-payments',
    question: 'Can I use DuitNow for bill payments?',
    answer:
      'Yes, DuitNow supports bill payments through the JomPAY system. Many Malaysian utility companies, telecoms, and government services accept DuitNow payments.',
  },
  {
    id: 'currency',
    question: 'What currency does DuitNow support?',
    answer:
      'DuitNow primarily supports Malaysian Ringgit (MYR). Cross-border transactions with Singapore use SGD-to-MYR conversion at the prevailing exchange rate.',
  },
  {
    id: 'duitnow-vs-jompay',
    question: 'Is DuitNow QR the same as JomPAY?',
    answer:
      'No. JomPAY is a bill payment standard using biller codes. DuitNow QR is for point-of-sale and person-to-person payments using QR codes. Both are operated by PayNet but serve different use cases.',
  },
  {
    id: 'security',
    question: 'How secure is DuitNow?',
    answer:
      'DuitNow uses bank-grade security. QR codes are validated with CRC16 checksum. Payments require authentication through your banking app (PIN, password, or biometrics). The QR code itself contains no sensitive banking credentials.',
  },
  {
    id: 'paynet-role',
    question: "What is PayNet's role in DuitNow?",
    answer:
      'PayNet (Payments Network Malaysia) operates the DuitNow switching infrastructure. All Malaysian banks connect through PayNet to process DuitNow transactions in real time, similar to how NPCI operates UPI in India.',
  },
  {
    id: 'without-bank-account',
    question: 'Can I receive DuitNow payments without a bank account?',
    answer:
      "No. DuitNow requires a Malaysian bank account or licensed e-wallet to receive payments. However, Touch 'n Go and Boost e-wallets count as valid DuitNow recipients.",
  },
  {
    id: 'autodebit',
    question: 'What is the DuitNow AutoDebit?',
    answer:
      'DuitNow AutoDebit allows recurring automatic payments with a one-time mandate authorization. It replaces the older Direct Debit system in Malaysia, offering faster setup and better consumer protection.',
  },
  {
    id: 'duitnow-vs-gopay',
    question: 'How does DuitNow compare to GoPay (Indonesia)?',
    answer:
      'Both are national instant payment systems. DuitNow operates across all Malaysian banks (interoperable), while GoPay is an app-specific wallet (though QRIS unifies them at the QR level). DuitNow transfers are bank-to-bank; GoPay transfers can be wallet-to-wallet.',
  },
  {
    id: 'mobile-normalization',
    question: 'What is the DuitNow proxy normalization for mobile?',
    answer:
      'Malaysian mobile numbers are normalized in DuitNow QR codes: "0123456789" becomes "60123456789" (replace leading 0 with country code 60). "+60123456789" stays "+60123456789" or "60123456789" depending on the parser.',
  },
  {
    id: 'api-for-duitnow',
    question: 'Is there an API for DuitNow QR generation?',
    answer:
      'qrpayhub.com will offer a REST API for DuitNow QR generation as part of the API plan (coming soon).',
  },
  {
    id: 'ibg-replacement',
    question: 'What happened to IBG (Interbank GIRO) after DuitNow?',
    answer:
      'IBG (Interbank GIRO) was the older Malaysian interbank transfer system with batch processing and fees. DuitNow replaced IBG as the primary transfer method, offering instant settlement and no fees for basic transfers.',
  },
  {
    id: 'businesses',
    question: 'Can businesses use DuitNow QR for merchant payments?',
    answer:
      'Yes. Businesses register as DuitNow QR merchants through their bank or payment provider. Merchant fees (MDR) are negotiated with the acquiring bank. Most small merchants pay 0% to 0.5% MDR.',
  },
];
