import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-fps',
    question: 'What is FPS?',
    answer:
      "FPS (Faster Payment System) is Hong Kong's real-time interbank payment infrastructure, launched on September 30, 2018 by the Hong Kong Monetary Authority (HKMA). It supports instant 24/7 transfers in both HKD and CNY using mobile numbers, email addresses, or FPS IDs as proxies.",
  },
  {
    id: 'who-operates-fps',
    question: 'Who operates FPS?',
    answer:
      'FPS is operated by HKICL (Hong Kong Interbank Clearing Limited), a company jointly owned by HKMA and the Hong Kong Association of Banks. HKMA oversees the system as the regulatory authority.',
  },
  {
    id: 'proxy-types',
    question: 'What proxy types does FPS support?',
    answer:
      'FPS supports three proxy types: mobile number (Hong Kong format, 8 digits starting with 5, 6, 7, or 9), email address, and FPS ID (a unique 7-9 digit identifier assigned by your bank when registering for FPS).',
  },
  {
    id: 'currencies',
    question: 'Which currencies does FPS support?',
    answer:
      'FPS uniquely supports both HKD (Hong Kong Dollar) and CNY (Chinese Yuan/Renminbi). This dual-currency support makes FPS particularly useful for cross-border payments between Hong Kong and Mainland China.',
  },
  {
    id: 'which-banks',
    question: 'Which banks and apps support FPS?',
    answer:
      'All licensed banks in Hong Kong support FPS, including: HSBC HK, Hang Seng Bank, Bank of China HK, Standard Chartered HK, DBS HK, Citibank HK, OCBC HK, as well as e-wallets AlipayHK, WeChat Pay HK, and PayMe by HSBC.',
  },
  {
    id: 'is-fps-free',
    question: 'Is FPS free?',
    answer:
      "Most banks offer free FPS transfers for basic amounts. Some banks may charge for large transfers or business accounts. Consumers should check with their specific bank for fee schedules.",
  },
  {
    id: 'transaction-limit',
    question: 'What is the FPS transaction limit?',
    answer:
      'FPS limits vary by bank. Standard consumer limits are typically HK$1,000,000 per transaction. Business accounts may have higher limits. Daily aggregate limits also apply.',
  },
  {
    id: 'payme',
    question: 'What is PayMe and how does it use FPS?',
    answer:
      "PayMe is HSBC Hong Kong's peer-to-peer payment app, similar to Venmo. It uses FPS infrastructure for transfers between users and supports FPS QR code payments at merchants.",
  },
  {
    id: 'mainland-tourists',
    question: 'Can Mainland Chinese tourists use FPS in Hong Kong?',
    answer:
      'Yes, through cross-border payment arrangements. AlipayHK and WeChat Pay HK support scanning FPS QR codes. Mainland Chinese visitors can use their Alipay or WeChat Pay apps at merchants displaying FPS QR codes in many cases.',
  },
  {
    id: 'fps-id',
    question: 'What is an FPS ID?',
    answer:
      'An FPS ID is a unique 7-9 digit numeric identifier assigned by your Hong Kong bank when you register for FPS. It serves as an alternative proxy to your phone number or email, providing an additional layer of privacy.',
  },
  {
    id: 'cny-support',
    question: 'How does FPS support CNY transactions?',
    answer:
      "FPS can process CNY transactions directly within Hong Kong. This is used for cross-border payments with Mainland China and for CNY-denominated business transactions in Hong Kong. The HKMA and People's Bank of China collaborate on CNY settlement infrastructure.",
  },
  {
    id: 'fps-aid',
    question: 'What is the AID for FPS QR codes?',
    answer:
      'The FPS Application Identifier is "hk.edu.hkma.fps", placed in EMV tag ID 26. This uniquely identifies the QR code as a Hong Kong FPS payment.',
  },
  {
    id: 'mobile-format',
    question: 'How is an FPS mobile number formatted in QR codes?',
    answer:
      'Hong Kong mobile numbers are normalized to international format in FPS QR codes: +852XXXXXXXX (country code 852 followed by 8-digit number). Example: 91234567 becomes +85291234567.',
  },
  {
    id: 'alipayhk',
    question: "What is AlipayHK's relationship with FPS?",
    answer:
      "AlipayHK (Alipay Hong Kong) is a separate app from Mainland China's Alipay, operated by Ant Group for Hong Kong. It supports FPS transfers and QR payments, making it interoperable with all FPS-enabled banks in Hong Kong.",
  },
  {
    id: 'cross-border',
    question: 'Is FPS connected to any cross-border payment systems?',
    answer:
      "FPS has cross-border connections with Mainland China's payment systems through the Hong Kong-Mainland China QR payment linkage. This allows eligible users to make cross-border QR payments between Hong Kong and Mainland China.",
  },
  {
    id: 'cheques',
    question: 'What happened to cheques after FPS launched?',
    answer:
      "FPS has significantly reduced cheque usage in Hong Kong. The HKMA has been encouraging the transition to electronic payments. Many businesses and consumers have switched from cheques to FPS for everyday payments.",
  },
  {
    id: 'merchant-payments',
    question: 'Can businesses use FPS QR for merchant payments?',
    answer:
      'Yes. Hong Kong merchants register for FPS QR through their acquiring bank or payment provider. The unified QR code approach (similar to SGQR) means merchants can display one QR code that works with all FPS-enabled apps.',
  },
  {
    id: 'qr-structure',
    question: 'What is the FPS QR code structure?',
    answer:
      "FPS QR codes follow the EMV Merchant Presented QR standard. They contain the merchant's FPS proxy (phone, email, or FPS ID) in tag ID 26, with optional amount and reference fields. CRC16-CCITT ensures data integrity.",
  },
  {
    id: 'transfer-speed',
    question: 'How long does an FPS transfer take?',
    answer:
      'FPS transfers typically complete within seconds, 24 hours a day, 7 days a week, 365 days a year. This makes it significantly faster than traditional CHATS transfers which operate during business hours only.',
  },
  {
    id: 'api',
    question: 'Is there an API for FPS QR generation?',
    answer:
      'qrpayhub.com will offer a REST API for FPS QR generation as part of the API plan (coming soon).',
  },
  {
    id: 'chats',
    question: 'What is CHATS and how does it relate to FPS?',
    answer:
      "CHATS (Clearing House Automated Transfer System) is Hong Kong's high-value interbank transfer system, primarily for large business transactions. FPS is designed for retail payments and small-value transfers, complementing CHATS rather than replacing it.",
  },
  {
    id: 'wechat-pay-hk',
    question: 'What is the WeChat Pay HK connection to FPS?',
    answer:
      'WeChat Pay HK (separate from Mainland WeChat Pay) is integrated with FPS, allowing users to make and receive FPS payments through the WeChat Pay HK app. Merchants with FPS QR codes can receive payments from WeChat Pay HK users.',
  },
  {
    id: 'international',
    question: 'Can I use FPS for international transfers outside Hong Kong?',
    answer:
      'FPS is designed for Hong Kong domestic payments and cross-border payments with Mainland China. For international SWIFT transfers, separate arrangements are needed. Some banks offer FPS-initiated international transfers as a value-added service.',
  },
  {
    id: 'how-to-register',
    question: 'How do I register for FPS?',
    answer:
      "Register through your Hong Kong bank's mobile app or internet banking. Link your phone number, email, or use the assigned FPS ID. Most HK banks support FPS registration in minutes through their apps.",
  },
  {
    id: 'dual-currency-technical',
    question: 'How does FPS dual-currency (HKD/CNY) work technically?',
    answer:
      'The FPS QR code specifies the currency using EMV tag ID 53: "344" for HKD and "156" for CNY. The payer\'s app displays the correct currency, and settlement occurs in the specified currency through HKMA\'s designated CNY settlement bank.',
  },
];
