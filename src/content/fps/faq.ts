import type { LocalizedContent, FAQContent } from '../types'

export const fpsFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'FPS FAQ',
    description:
      '25 questions answered — from HKD/CNY dual currency and PayMe to AlipayHK, FPS ID and the EMV QR format.',
    items: [
      {
        question: 'What is FPS?',
        answer:
          "FPS (Faster Payment System) is Hong Kong's real-time interbank payment infrastructure, launched on September 30, 2018 by the Hong Kong Monetary Authority (HKMA). It supports instant 24/7 transfers in both HKD and CNY using mobile numbers, email addresses, or FPS IDs as proxies.",
      },
      {
        question: 'Who operates FPS?',
        answer:
          'FPS is operated by HKICL (Hong Kong Interbank Clearing Limited), a company jointly owned by HKMA and the Hong Kong Association of Banks. HKMA oversees the system as the regulatory authority.',
      },
      {
        question: 'What proxy types does FPS support?',
        answer:
          'FPS supports three proxy types: mobile number (Hong Kong format, 8 digits starting with 5, 6, 7, or 9), email address, and FPS ID (a unique 7-9 digit identifier assigned by your bank when registering for FPS).',
      },
      {
        question: 'Which currencies does FPS support?',
        answer:
          'FPS uniquely supports both HKD (Hong Kong Dollar) and CNY (Chinese Yuan/Renminbi). This dual-currency support makes FPS particularly useful for cross-border payments between Hong Kong and Mainland China.',
      },
      {
        question: 'Which banks and apps support FPS?',
        answer:
          'All licensed banks in Hong Kong support FPS, including: HSBC HK, Hang Seng Bank, Bank of China HK, Standard Chartered HK, DBS HK, Citibank HK, OCBC HK, as well as e-wallets AlipayHK, WeChat Pay HK, and PayMe by HSBC.',
      },
      {
        question: 'Is FPS free?',
        answer:
          'Most banks offer free FPS transfers for basic amounts. Some banks may charge for large transfers or business accounts. Consumers should check with their specific bank for fee schedules.',
      },
      {
        question: 'What is the FPS transaction limit?',
        answer:
          'FPS limits vary by bank. Standard consumer limits are typically HK$1,000,000 per transaction. Business accounts may have higher limits. Daily aggregate limits also apply.',
      },
      {
        question: 'What is PayMe and how does it use FPS?',
        answer:
          "PayMe is HSBC Hong Kong's peer-to-peer payment app, similar to Venmo. It uses FPS infrastructure for transfers between users and supports FPS QR code payments at merchants.",
      },
      {
        question: 'Can Mainland Chinese tourists use FPS in Hong Kong?',
        answer:
          'Yes, through cross-border payment arrangements. AlipayHK and WeChat Pay HK support scanning FPS QR codes. Mainland Chinese visitors can use their Alipay or WeChat Pay apps at merchants displaying FPS QR codes in many cases.',
      },
      {
        question: 'What is an FPS ID?',
        answer:
          'An FPS ID is a unique 7-9 digit numeric identifier assigned by your Hong Kong bank when you register for FPS. It serves as an alternative proxy to your phone number or email, providing an additional layer of privacy.',
      },
      {
        question: 'How does FPS support CNY transactions?',
        answer:
          "FPS can process CNY transactions directly within Hong Kong. This is used for cross-border payments with Mainland China and for CNY-denominated business transactions in Hong Kong. The HKMA and People's Bank of China collaborate on CNY settlement infrastructure.",
      },
      {
        question: 'What is the AID for FPS QR codes?',
        answer:
          'The FPS Application Identifier is "hk.edu.hkma.fps", placed in EMV tag ID 26. This uniquely identifies the QR code as a Hong Kong FPS payment.',
      },
      {
        question: 'How is an FPS mobile number formatted in QR codes?',
        answer:
          'Hong Kong mobile numbers are normalized to international format in FPS QR codes: +852XXXXXXXX (country code 852 followed by 8-digit number). Example: 91234567 becomes +85291234567.',
      },
      {
        question: "What is AlipayHK's relationship with FPS?",
        answer:
          "AlipayHK (Alipay Hong Kong) is a separate app from Mainland China's Alipay, operated by Ant Group for Hong Kong. It supports FPS transfers and QR payments, making it interoperable with all FPS-enabled banks in Hong Kong.",
      },
      {
        question: 'Is FPS connected to any cross-border payment systems?',
        answer:
          "FPS has cross-border connections with Mainland China's payment systems through the Hong Kong-Mainland China QR payment linkage. This allows eligible users to make cross-border QR payments between Hong Kong and Mainland China.",
      },
      {
        question: 'What happened to cheques after FPS launched?',
        answer:
          'FPS has significantly reduced cheque usage in Hong Kong. The HKMA has been encouraging the transition to electronic payments. Many businesses and consumers have switched from cheques to FPS for everyday payments.',
      },
      {
        question: 'Can businesses use FPS QR for merchant payments?',
        answer:
          'Yes. Hong Kong merchants register for FPS QR through their acquiring bank or payment provider. The unified QR code approach (similar to SGQR) means merchants can display one QR code that works with all FPS-enabled apps.',
      },
      {
        question: 'What is the FPS QR code structure?',
        answer:
          "FPS QR codes follow the EMV Merchant Presented QR standard. They contain the merchant's FPS proxy (phone, email, or FPS ID) in tag ID 26, with optional amount and reference fields. CRC16-CCITT ensures data integrity.",
      },
      {
        question: 'How long does an FPS transfer take?',
        answer:
          'FPS transfers typically complete within seconds, 24 hours a day, 7 days a week, 365 days a year. This makes it significantly faster than traditional CHATS transfers which operate during business hours only.',
      },
      {
        question: 'Is there an API for FPS QR generation?',
        answer:
          'qrpayhub.com will offer a REST API for FPS QR generation as part of the API plan (coming soon).',
      },
      {
        question: 'What is CHATS and how does it relate to FPS?',
        answer:
          "CHATS (Clearing House Automated Transfer System) is Hong Kong's high-value interbank transfer system, primarily for large business transactions. FPS is designed for retail payments and small-value transfers, complementing CHATS rather than replacing it.",
      },
      {
        question: 'What is the WeChat Pay HK connection to FPS?',
        answer:
          'WeChat Pay HK (separate from Mainland WeChat Pay) is integrated with FPS, allowing users to make and receive FPS payments through the WeChat Pay HK app. Merchants with FPS QR codes can receive payments from WeChat Pay HK users.',
      },
      {
        question: 'Can I use FPS for international transfers outside Hong Kong?',
        answer:
          'FPS is designed for Hong Kong domestic payments and cross-border payments with Mainland China. For international SWIFT transfers, separate arrangements are needed. Some banks offer FPS-initiated international transfers as a value-added service.',
      },
      {
        question: 'How do I register for FPS?',
        answer:
          "Register through your Hong Kong bank's mobile app or internet banking. Link your phone number, email, or use the assigned FPS ID. Most HK banks support FPS registration in minutes through their apps.",
      },
      {
        question: 'How does FPS dual-currency (HKD/CNY) work technically?',
        answer:
          'The FPS QR code specifies the currency using EMV tag ID 53: "344" for HKD and "156" for CNY. The payer\'s app displays the correct currency, and settlement occurs in the specified currency through HKMA\'s designated CNY settlement bank.',
      },
    ],
  },
  de: {
    title: 'FPS FAQ',
    description:
      '25 Fragen beantwortet – von HKD/CNY Dual-Währung und PayMe bis AlipayHK, FPS ID und dem EMV QR-Format.',
    items: [
      {
        question: 'Was ist FPS?',
        answer:
          'FPS (Faster Payment System) ist Hongkongs Echtzeit-Interbanken-Zahlungsinfrastruktur, gestartet am 30. September 2018 von der Hong Kong Monetary Authority (HKMA). Es unterstützt sofortige 24/7-Überweisungen in HKD und CNY über Mobiltelefonnummern, E-Mail-Adressen oder FPS IDs als Proxys.',
      },
      {
        question: 'Wer betreibt FPS?',
        answer:
          'FPS wird von HKICL (Hong Kong Interbank Clearing Limited) betrieben, einem Unternehmen, das gemeinsam von HKMA und der Hong Kong Association of Banks gehalten wird. HKMA überwacht das System als Regulierungsbehörde.',
      },
      {
        question: 'Welche Proxy-Typen unterstützt FPS?',
        answer:
          'FPS unterstützt drei Proxy-Typen: Mobiltelefonnummer (Hongkonger Format, 8 Stellen beginnend mit 5, 6, 7 oder 9), E-Mail-Adresse und FPS ID (eine eindeutige 7–9-stellige Kennung, die von Ihrer Bank bei der FPS-Registrierung vergeben wird).',
      },
      {
        question: 'Welche Währungen unterstützt FPS?',
        answer:
          'FPS unterstützt einzigartig sowohl HKD (Hongkong-Dollar) als auch CNY (Chinesischer Yuan/Renminbi). Diese Dual-Währungsunterstützung macht FPS besonders nützlich für grenzüberschreitende Zahlungen zwischen Hongkong und Festlandchina.',
      },
      {
        question: 'Welche Banken und Apps unterstützen FPS?',
        answer:
          'Alle lizenzierten Banken in Hongkong unterstützen FPS, darunter: HSBC HK, Hang Seng Bank, Bank of China HK, Standard Chartered HK, DBS HK, Citibank HK, OCBC HK sowie die E-Wallets AlipayHK, WeChat Pay HK und PayMe by HSBC.',
      },
      {
        question: 'Ist FPS kostenlos?',
        answer:
          'Die meisten Banken bieten kostenlose FPS-Überweisungen für Basisbeträge an. Einige Banken können Gebühren für große Überweisungen oder Geschäftskonten erheben. Verbraucher sollten die Gebührenordnung ihrer jeweiligen Bank prüfen.',
      },
      {
        question: 'Was ist das FPS-Transaktionslimit?',
        answer:
          'FPS-Limits variieren je nach Bank. Standardlimits für Verbraucher sind typischerweise HK$1.000.000 pro Transaktion. Geschäftskonten können höhere Limits haben. Auch tägliche Gesamtlimits gelten.',
      },
      {
        question: 'Was ist PayMe und wie nutzt es FPS?',
        answer:
          'PayMe ist HSBCs Peer-to-Peer-Zahlungs-App für Hongkong, ähnlich wie Venmo. Es nutzt die FPS-Infrastruktur für Überweisungen zwischen Nutzern und unterstützt FPS QR-Code-Zahlungen bei Händlern.',
      },
      {
        question: 'Können Festlandchinesen FPS in Hongkong nutzen?',
        answer:
          'Ja, über grenzüberschreitende Zahlungsvereinbarungen. AlipayHK und WeChat Pay HK unterstützen das Scannen von FPS QR-Codes. Festlandchinesische Besucher können in vielen Fällen ihre Alipay- oder WeChat Pay-Apps bei Händlern verwenden, die FPS QR-Codes anzeigen.',
      },
      {
        question: 'Was ist eine FPS ID?',
        answer:
          'Eine FPS ID ist eine eindeutige 7–9-stellige numerische Kennung, die von Ihrer Hongkonger Bank bei der FPS-Registrierung vergeben wird. Sie dient als alternativer Proxy zu Ihrer Telefonnummer oder E-Mail und bietet eine zusätzliche Datenschutzebene.',
      },
      {
        question: 'Wie unterstützt FPS CNY-Transaktionen?',
        answer:
          'FPS kann CNY-Transaktionen direkt in Hongkong verarbeiten. Dies wird für grenzüberschreitende Zahlungen mit Festlandchina und CNY-denominierte Geschäftstransaktionen in Hongkong genutzt. HKMA und die Volksbank von China arbeiten bei der CNY-Abwicklungsinfrastruktur zusammen.',
      },
      {
        question: 'Was ist die AID für FPS QR-Codes?',
        answer:
          'Der FPS Application Identifier ist „hk.edu.hkma.fps", platziert in EMV-Tag-ID 26. Dieser identifiziert den QR-Code eindeutig als Hongkonger FPS-Zahlung.',
      },
      {
        question: 'Wie wird eine FPS-Mobiltelefonnummer in QR-Codes formatiert?',
        answer:
          'Hongkonger Mobiltelefonnummern werden in FPS QR-Codes ins internationale Format normalisiert: +852XXXXXXXX (Landesvorwahl 852, gefolgt von 8-stelliger Nummer). Beispiel: 91234567 wird zu +85291234567.',
      },
      {
        question: 'Was ist AlipayHKs Verhältnis zu FPS?',
        answer:
          'AlipayHK (Alipay Hongkong) ist eine separate App von Festlandchinas Alipay, betrieben von Ant Group für Hongkong. Es unterstützt FPS-Überweisungen und QR-Zahlungen und ist damit interoperabel mit allen FPS-fähigen Banken in Hongkong.',
      },
      {
        question: 'Ist FPS mit grenzüberschreitenden Zahlungssystemen verbunden?',
        answer:
          'FPS hat grenzüberschreitende Verbindungen zu den Zahlungssystemen Festlandchinas über die Hongkong-Festlandchina QR-Zahlungsverbindung. Dies ermöglicht berechtigten Nutzern grenzüberschreitende QR-Zahlungen zwischen Hongkong und Festlandchina.',
      },
      {
        question: 'Was geschah mit Schecks nach dem Start von FPS?',
        answer:
          'FPS hat die Schecknutzung in Hongkong erheblich reduziert. Die HKMA hat den Übergang zu elektronischen Zahlungen gefördert. Viele Unternehmen und Verbraucher haben von Schecks zu FPS für alltägliche Zahlungen gewechselt.',
      },
      {
        question: 'Können Unternehmen FPS QR für Händlerzahlungen nutzen?',
        answer:
          'Ja. Hongkonger Händler registrieren sich für FPS QR über ihre Acquirerbank oder ihren Zahlungsanbieter. Der einheitliche QR-Code-Ansatz (ähnlich wie SGQR) bedeutet, dass Händler einen QR-Code anzeigen können, der mit allen FPS-fähigen Apps funktioniert.',
      },
      {
        question: 'Was ist die Struktur des FPS QR-Codes?',
        answer:
          'FPS QR-Codes folgen dem EMV Merchant Presented QR-Standard. Sie enthalten den FPS-Proxy des Händlers (Telefon, E-Mail oder FPS ID) in Tag-ID 26, mit optionalen Betrags- und Referenzfeldern. CRC16-CCITT gewährleistet Datenintegrität.',
      },
      {
        question: 'Wie lange dauert eine FPS-Überweisung?',
        answer:
          'FPS-Überweisungen werden typischerweise innerhalb von Sekunden abgeschlossen, 24 Stunden täglich, 7 Tage die Woche, 365 Tage im Jahr. Dies macht es deutlich schneller als traditionelle CHATS-Überweisungen, die nur während der Geschäftszeiten verfügbar sind.',
      },
      {
        question: 'Gibt es eine API zur FPS QR-Generierung?',
        answer:
          'qrpayhub.com wird eine REST-API zur FPS QR-Generierung als Teil des API-Plans anbieten (demnächst verfügbar).',
      },
      {
        question: 'Was ist CHATS und wie verhält es sich zu FPS?',
        answer:
          'CHATS (Clearing House Automated Transfer System) ist Hongkongs Hochwerttransfer-System für Interbanken, hauptsächlich für große Unternehmenstransaktionen. FPS ist für Einzelhandels- und Kleinwertüberweisungen konzipiert und ergänzt CHATS anstatt es zu ersetzen.',
      },
      {
        question: 'Was ist WeChat Pay HKs Verbindung zu FPS?',
        answer:
          'WeChat Pay HK (getrennt von Festlandchinas WeChat Pay) ist in FPS integriert und ermöglicht Nutzern FPS-Zahlungen über die WeChat Pay HK-App. Händler mit FPS QR-Codes können Zahlungen von WeChat Pay HK-Nutzern empfangen.',
      },
      {
        question: 'Kann ich FPS für internationale Überweisungen außerhalb Hongkongs nutzen?',
        answer:
          'FPS ist für Hongkonger Inlandszahlungen und grenzüberschreitende Zahlungen mit Festlandchina konzipiert. Für internationale SWIFT-Überweisungen sind separate Vereinbarungen erforderlich. Einige Banken bieten FPS-initiierte internationale Überweisungen als Mehrwertdienst an.',
      },
      {
        question: 'Wie registriere ich mich für FPS?',
        answer:
          'Registrieren Sie sich über die mobile App oder das Internet-Banking Ihrer Hongkonger Bank. Verknüpfen Sie Ihre Telefonnummer, E-Mail oder nutzen Sie die zugewiesene FPS ID. Die meisten HK-Banken unterstützen die FPS-Registrierung in Minuten über ihre Apps.',
      },
      {
        question: 'Wie funktioniert FPS Dual-Währung (HKD/CNY) technisch?',
        answer:
          'Der FPS QR-Code spezifiziert die Währung über EMV-Tag-ID 53: „344" für HKD und „156" für CNY. Die App des Zahlenden zeigt die richtige Währung an, und die Abwicklung erfolgt in der angegebenen Währung über HKMAs designierte CNY-Abwicklungsbank.',
      },
    ],
  },
}
