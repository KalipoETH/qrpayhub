import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-promptpay',
    question: 'What is PromptPay?',
    answer:
      "PromptPay is Thailand's national instant payment system, launched in 2017 by the Bank of Thailand and the Thai Bankers Association. It allows instant bank transfers using a phone number or national ID instead of a bank account number, available 24/7 at no cost.",
  },
  {
    id: 'who-developed-promptpay',
    question: 'Who developed PromptPay?',
    answer:
      "PromptPay was developed by the Bank of Thailand (BOT) together with the Thai Bankers Association (TBA) and the National ITMX company. It is part of Thailand's National e-Payment initiative.",
  },
  {
    id: 'key-types',
    question: 'What types of PromptPay keys exist?',
    answer:
      'There are three main key types: phone number (starting with 06, 08 or 09), National ID (13-digit Thai citizen ID), and Tax ID (13-digit juristic entity ID). Some e-wallets also use an e-wallet ID format.',
  },
  {
    id: 'how-to-register',
    question: 'How do I register for PromptPay?',
    answer:
      'Register through your Thai banking app or at any bank branch. Link your phone number or national ID to your bank account. Most Thai banks support registration via mobile app in minutes.',
  },
  {
    id: 'which-banks',
    question: 'Which Thai banks support PromptPay?',
    answer:
      'All major Thai banks support PromptPay: Bangkok Bank (BBL), Kasikorn Bank (KBank), SCB, Krungthai Bank (KTB), TMBThanachart (ttb), Bank of Ayudhya (Krungsri), CIMB Thai, UOB Thailand, GSB, BAAC and all other licensed Thai banks.',
  },
  {
    id: 'is-free',
    question: 'Is PromptPay free?',
    answer:
      'Yes, PromptPay transfers are free for amounts up to ฿5,000 per transaction. For amounts above ฿5,000, banks may charge a small fee (typically ฿1–฿10). Person-to-person transfers via QR are generally free.',
  },
  {
    id: 'transaction-limit',
    question: 'What is the PromptPay transaction limit?',
    answer:
      'PromptPay limits vary by bank. Typical limits are ฿700,000 per transaction for regular transfers. Some banks set lower default limits with options to increase via the app.',
  },
  {
    id: 'how-qr-works',
    question: 'How does PromptPay QR code work?',
    answer:
      "A PromptPay QR code uses the EMV QR standard. It encodes the recipient's PromptPay key (phone or national ID) and optionally a preset amount. When scanned with any Thai banking app, payment details are pre-filled for instant confirmation.",
  },
  {
    id: 'thai-qr-payment',
    question: 'Is PromptPay the same as QR Code Thailand?',
    answer:
      'PromptPay QR is the payment infrastructure, while "Thai QR Payment" or "QR Code Thailand" refers to the standardized QR format. They use the same EMV-based standard. The logo "Thai QR Payment" appears on merchant QR codes.',
  },
  {
    id: 'tourists',
    question: 'Can tourists use PromptPay in Thailand?',
    answer:
      'Tourists cannot directly use PromptPay without a Thai bank account. However, merchants displaying PromptPay QR codes can receive payments. Some payment services allow foreign cards to pay via PromptPay-connected terminals.',
  },
  {
    id: 'phone-number-format',
    question: 'What is the phone number format for PromptPay?',
    answer:
      'Thai mobile numbers use 10 digits starting with 06, 08 or 09. In PromptPay QR codes, phone numbers are normalized to "0066XXXXXXXXX" format (replacing leading 0 with 0066). Example: 0812345678 becomes 0066812345678.',
  },
  {
    id: 'technical-format',
    question: 'What is the technical format of PromptPay QR?',
    answer:
      'PromptPay uses EMV Merchant Presented QR (MPM) format, identical to PIX and BharatQR. The merchant account tag (ID 29) contains the PromptPay AID "A000000677010111" and the normalized recipient key. CRC16-CCITT ensures data integrity.',
  },
  {
    id: 'wechat-alipay',
    question: 'Does PromptPay work with WeChat Pay or Alipay?',
    answer:
      'Yes, Thailand has cross-border QR payment agreements with China. WeChat Pay and Alipay users can scan Thai merchant QR codes for payments in THB, settled via PromptPay infrastructure.',
  },
  {
    id: 'transfer-fees',
    question: 'What happened to bank transfer fees after PromptPay?',
    answer:
      'Since 2018, the Bank of Thailand mandated free interbank transfers via PromptPay for amounts up to ฿5,000, and in 2019 extended this to all amounts. This effectively eliminated interbank transfer fees in Thailand.',
  },
  {
    id: 'multiple-registrations',
    question: 'Can I have multiple PromptPay registrations?',
    answer:
      'Yes, you can register the same key (phone or national ID) at multiple banks. However, you can only designate one bank as the primary destination for each key.',
  },
  {
    id: 'safe-to-share',
    question: 'Is PromptPay QR safe to display publicly?',
    answer:
      'Yes. The QR code only contains your phone number or national ID in normalized format – no bank account details, passwords or PINs. The payer still authenticates with their own banking credentials.',
  },
  {
    id: 'what-is-itmx',
    question: 'What is ITMX and its role in PromptPay?',
    answer:
      'ITMX (Interbank Transaction Management and Exchange) is the national payment infrastructure company that operates the PromptPay switching network. All Thai banks connect through ITMX to process PromptPay transactions.',
  },
  {
    id: 'vs-credit-card',
    question: 'How does PromptPay compare to credit card payments?',
    answer:
      'PromptPay transfers money directly between bank accounts at no cost. Credit cards involve merchant fees (1.5–3%), processing delays and chargeback risks. For domestic Thai payments, PromptPay is faster, cheaper and more widely accepted.',
  },
  {
    id: 'payroll',
    question: 'Can businesses use PromptPay for payroll?',
    answer:
      'Yes, many Thai businesses use PromptPay for payroll disbursements. The bulk payment feature allows multiple transfers in a single batch, reducing administrative costs.',
  },
  {
    id: 'thai-qr-standard',
    question: 'What is the Thai QR Payment standard?',
    answer:
      'Thai QR Payment is the standardized EMV-based QR code format adopted by all Thai banks in 2017. It ensures interoperability – any Thai banking app can scan any merchant\'s QR code regardless of which bank issued it.',
  },
  {
    id: 'asean-network',
    question: 'Is PromptPay connected to any international payment networks?',
    answer:
      'Yes, Thailand has QR payment linkages with Singapore (PayNow), Malaysia (DuitNow), Indonesia (QRIS), Vietnam (VietQR), Cambodia and Japan. This allows cross-border QR payments across ASEAN using local currencies.',
  },
  {
    id: 'static-vs-dynamic',
    question: 'What is a static vs dynamic PromptPay QR?',
    answer:
      'Static QR (no amount): reusable, displayed at merchant counters, payer enters amount. Dynamic QR (with amount): generated per transaction, used for specific invoices or e-commerce checkouts.',
  },
  {
    id: 'vs-upi',
    question: 'How is PromptPay different from UPI (India)?',
    answer:
      'Both use similar concepts (key-based transfers, QR codes, instant settlement) but are separate national systems. UPI uses bank handles (@okicici), PromptPay uses phone/ID. UPI processes 10B+ monthly transactions vs PromptPay\'s ~1B. Thailand and India are exploring cross-border linkage.',
  },
  {
    id: 'qr-without-amount',
    question: 'Can I generate a PromptPay QR without an amount?',
    answer:
      'Yes, leaving the amount empty creates a static PromptPay QR where the payer enters the amount. Setting Point of Initiation to "11" indicates no amount, "12" indicates a fixed amount.',
  },
  {
    id: 'api',
    question: 'Is there an API for PromptPay QR generation?',
    answer:
      "qrpayhub.com will offer a REST API for PromptPay QR generation as part of the API plan (coming soon). For production merchant integrations, banks provide their own PromptPay merchant APIs.",
  },
];
