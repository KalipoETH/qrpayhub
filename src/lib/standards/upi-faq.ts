import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-upi',
    question: 'What is UPI?',
    answer:
      "UPI (Unified Payments Interface) is India's real-time payment system developed by the National Payments Corporation of India (NPCI). Launched in 2016, it allows instant bank transfers using a simple UPI ID (Virtual Payment Address) instead of bank account numbers.",
  },
  {
    id: 'what-is-upi-id',
    question: 'What is a UPI ID?',
    answer:
      'A UPI ID (also called Virtual Payment Address or VPA) is a unique identifier linked to your bank account, formatted as "username@bankhandle" (e.g. john@okicici, 9876543210@paytm). It replaces the need to share your account number and IFSC code.',
  },
  {
    id: 'which-apps',
    question: 'Which apps support UPI payments?',
    answer:
      'All major Indian payment apps support UPI: PhonePe, Google Pay (GPay), Paytm, BHIM (official NPCI app), Amazon Pay, WhatsApp Pay, Mobikwik, and virtually all Indian banking apps.',
  },
  {
    id: 'upi-outside-india',
    question: 'Is UPI available outside India?',
    answer:
      'UPI is expanding internationally. As of 2024–2026, UPI is accepted in Singapore, UAE, Bahrain, France, UK, Mauritius, Nepal, Bhutan and several other countries through partnerships with local payment networks.',
  },
  {
    id: 'transaction-limit',
    question: 'What is the UPI transaction limit?',
    answer:
      'The standard UPI limit is ₹1,00,000 (1 Lakh) per transaction. Some banks allow higher limits for specific categories like capital markets (₹2 Lakhs) or tax payments (₹5 Lakhs).',
  },
  {
    id: 'what-is-bhim',
    question: 'What is BHIM UPI?',
    answer:
      'BHIM (Bharat Interface for Money) is the official UPI app developed by NPCI. It works with all UPI-enabled bank accounts and is available in 20+ Indian languages.',
  },
  {
    id: 'how-upi-qr-works',
    question: 'How does UPI QR code work?',
    answer:
      'A UPI QR code encodes a UPI deep link (upi://pay?pa=...&pn=...) containing the payee\'s UPI ID and name. When scanned with any UPI app, the payment details are pre-filled and the user only needs to enter their PIN to confirm.',
  },
  {
    id: 'is-free',
    question: 'Is UPI free to use?',
    answer:
      'Yes, UPI transactions are free for consumers. Merchants may pay a small MDR (Merchant Discount Rate) for certain transaction types, but person-to-person transfers are always free.',
  },
  {
    id: 'upi-vs-neft',
    question: 'What is the difference between UPI and NEFT/RTGS?',
    answer:
      'UPI transfers are instant (within seconds), available 24/7/365, and free. NEFT processes in batches with cut-off times. RTGS is for high-value transactions above ₹2 Lakhs. UPI has largely replaced NEFT/RTGS for everyday payments.',
  },
  {
    id: 'transaction-volume',
    question: 'How many UPI transactions happen per month?',
    answer:
      'As of 2026, UPI processes over 10 billion transactions per month, making it the world\'s largest real-time payment network by volume. India accounts for approximately 46% of all real-time payment transactions globally.',
  },
  {
    id: 'upi-lite',
    question: 'What is UPI Lite?',
    answer:
      'UPI Lite is a feature for small-value transactions (up to ₹500) that works without an internet connection and does not require a PIN, making payments faster and available in low-connectivity areas.',
  },
  {
    id: 'international-transfers',
    question: 'Can I use UPI for international transfers?',
    answer:
      'UPI supports cross-border payments in participating countries. You can send money to Singapore (via PayNow), UAE (via AECB), and other partner countries. The sender needs a UPI-enabled Indian bank account.',
  },
  {
    id: 'merchant-category-code',
    question: 'What is the merchant category code (MCC) in UPI?',
    answer:
      "The Merchant Category Code (MCC) is a 4-digit code that classifies the type of business. It's optional for basic UPI QR codes but required for merchant integrations to qualify for category-specific transaction limits and GST reporting.",
  },
  {
    id: 'safe-to-share',
    question: 'Is it safe to share my UPI QR code publicly?',
    answer:
      'Yes, sharing your UPI QR code is safe. It only contains your UPI ID and name – no passwords, PINs, or sensitive bank details. The payer still needs to authenticate with their own PIN to complete any payment.',
  },
  {
    id: 'static-vs-dynamic',
    question: 'What is the difference between static and dynamic UPI QR?',
    answer:
      'A static QR code has a fixed UPI ID without a preset amount – suitable for shops and general use. A dynamic QR code includes a specific amount and transaction reference, ideal for invoices and e-commerce checkouts.',
  },
  {
    id: 'amount-optional',
    question: 'Can I generate a UPI QR code without an amount?',
    answer:
      'Yes, leaving the amount field empty creates a static UPI QR where the payer enters the amount manually. This is the most common format for merchant QR codes displayed at shops.',
  },
  {
    id: 'bank-handles',
    question: 'What is @okicici, @ybl, @paytm in UPI IDs?',
    answer:
      'These are bank handles that identify which bank or payment app the UPI ID belongs to: @okicici = ICICI Bank via third-party, @ybl = PhonePe (Yes Bank), @paytm = Paytm Payments Bank, @oksbi = State Bank of India via Google Pay.',
  },
  {
    id: 'offline',
    question: 'Does UPI QR work offline?',
    answer:
      'Standard UPI QR requires internet for the payment. UPI Lite (for amounts up to ₹500) works offline for the payer. Generating the QR code itself requires no internet.',
  },
  {
    id: 'failed-payment',
    question: 'What happens if a UPI payment fails?',
    answer:
      'Failed UPI payments are automatically refunded to the sender\'s account within 24–48 hours. If the refund does not arrive, the NPCI helpline (18001201740) handles disputes.',
  },
  {
    id: 'api',
    question: 'Is there an API for generating UPI QR codes?',
    answer:
      'qrpayhub.com will offer a REST API for UPI QR generation as part of the API plan (coming soon), allowing integration into e-commerce platforms, billing software and POS systems.',
  },
  {
    id: 'what-is-npci',
    question: 'What is the full form of NPCI?',
    answer:
      'NPCI stands for National Payments Corporation of India. It is the umbrella organization that operates UPI, RuPay, IMPS, FASTag, NACH and other retail payment systems in India.',
  },
  {
    id: 'foreigners-upi',
    question: 'Can foreigners use UPI in India?',
    answer:
      'Yes, since 2023 international visitors to India can use UPI by linking their foreign phone numbers to participating international cards. G20 country nationals can open UPI accounts with supported banks.',
  },
  {
    id: 'upi-mandate',
    question: 'What is a UPI mandate?',
    answer:
      'A UPI mandate (AutoPay) allows recurring payments to be set up with a one-time authorization. Used for subscriptions, EMIs, utility bills and SIPs, with amounts debited automatically on scheduled dates.',
  },
  {
    id: 'upi-vs-wallet',
    question: 'How is UPI different from mobile wallets like Paytm Wallet?',
    answer:
      'UPI transfers money directly between bank accounts in real time. Mobile wallets store money in a separate wallet that needs to be loaded first. UPI is faster, has higher limits and is regulated by the Reserve Bank of India.',
  },
  {
    id: 'why-so-popular',
    question: 'Why does India have so many UPI transactions?',
    answer:
      "India's UPI success comes from: zero transaction fees for consumers, interoperability across all banks and apps, government backing (demonetization in 2016 accelerated adoption), smartphone penetration, and the simple UPI ID concept that removed barriers to digital payments.",
  },
];
