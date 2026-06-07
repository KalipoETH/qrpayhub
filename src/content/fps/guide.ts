import type { LocalizedContent, GuideContent } from '../types'

export const fpsGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'How FPS Works – Complete Guide to Hong Kong Faster Payment System',
    description:
      "Everything about Hong Kong's Faster Payment System: proxy types, dual HKD/CNY currency, EMV QR format, supported banks and cross-border payments.",
    sections: [
      {
        id: 'what-is-fps',
        heading: 'What is FPS?',
        content:
          "FPS (Faster Payment System) is Hong Kong's real-time interbank payment infrastructure, operated by HKICL (Hong Kong Interbank Clearing Limited) under regulation by the Hong Kong Monetary Authority (HKMA). Launched on September 30, 2018, FPS enables individuals and businesses to transfer money instantly using a mobile phone number, email address, or FPS ID — without needing to know the recipient's bank account number. Transfers settle within seconds, 24 hours a day, 365 days a year. FPS has a feature that sets it apart from every other major instant payment system in the world: native dual-currency support. A single FPS infrastructure processes payments in both Hong Kong Dollar (HKD) and Chinese Yuan Renminbi (CNY). As of 2025, FPS connects over 7 million registered accounts across all licensed Hong Kong banks and major e-wallets. FPS QR codes are built on the EMV Merchant Presented Mode (MPM) standard with Application Identifier (AID) hk.edu.hkma.fps in EMV tag ID 26.",
      },
      {
        id: 'how-it-works',
        heading: 'How FPS Works – Step by Step',
        content:
          'The merchant displays an FPS QR code — static QR codes (open amount) are printed at the counter, dynamic codes with pre-encoded amounts are generated per transaction. The customer opens any FPS-enabled app (HSBC HK, Hang Seng, Bank of China HK, PayMe, AlipayHK, WeChat Pay HK, Tap & Go — all interoperable through HKICL). For merchants accepting both currencies, the app may prompt currency selection. The app reads the EMV payload, extracts the AID (hk.edu.hkma.fps), proxy type and value. Authentication (PIN, biometrics) is completed in the customer\'s banking app. HKICL\'s FPS infrastructure processes and settles the payment within seconds. Both payer and merchant receive immediate confirmation.',
      },
      {
        id: 'proxy-types',
        heading: 'FPS Proxy Types',
        content:
          'FPS uses proxy identifiers registered in HKICL\'s central registry to route payments without exposing bank account numbers. Mobile Number (tag 2) uses Hong Kong format +852XXXXXXXX (8 digits starting with 5, 6, 7, or 9) and is most common for P2P transfers. Email Address (tag 3) can be any valid email and is preferred by business and privacy-conscious users. FPS ID (tag 4) is a unique 7–9 digit numeric identifier assigned by the bank at FPS registration — providing an extra layer of privacy. The proxy type is encoded in tag 26 of the FPS QR payload.',
      },
      {
        id: 'dual-currency',
        heading: 'Dual Currency: HKD and CNY',
        content:
          "FPS's dual-currency capability is its most distinctive technical feature. No other ASEAN-region fast payment system natively processes two currencies within a single infrastructure. HKD (currency code 344) is used for local Hong Kong payments, retail, and consumer transfers. CNY (currency code 156) is used for cross-border payments with mainland China and CNY-denominated business transactions. When generating an FPS QR code in CNY, the payer's app must have a CNY-enabled bank account registered with FPS. Settlement occurs through HKMA's designated CNY settlement bank. For most retail use cases involving Hong Kong residents, HKD (code 344) is the correct choice.",
      },
      {
        id: 'payload-emv',
        heading: 'The FPS QR Payload – EMV Format',
        content:
          'An FPS QR code is a TLV (Tag-Length-Value) ASCII string following the EMV MPM specification. The AID hk.edu.hkma.fps is placed in sub-tag 00 of EMV tag 26. Sub-tag 02 holds the normalized mobile number in international format. Tag 53 contains 344 (HKD) or 156 (CNY). Tag 63 has the CRC16-CCITT checksum (4-char hex). Point of Initiation 11 = static, 12 = dynamic. Tag 52 holds the Merchant Category Code (0000 for general). Tag 58 is the country code (HK). Tag 59 is the merchant name (max 25 chars). Tag 60 is the merchant city.',
      },
      {
        id: 'phone-normalization',
        heading: 'Mobile Number Format',
        content:
          'Hong Kong mobile numbers must be normalized to international format before embedding in an FPS QR payload. The rule: prefix with +852 (Hong Kong country code). Hong Kong numbers are always 8 digits and begin with 5, 6, 7, or 9. Example: 91234567 → +85291234567. Numbers already in +852 format pass through unchanged. Numbers starting with 852 (without the +) receive the + prefix. Email addresses and FPS IDs are used as-is without normalization. FPS IDs are purely numeric 7–9 digit strings assigned by the bank at registration time.',
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks & E-Wallets',
        content:
          'All licensed Hong Kong banks and major e-wallets participate in FPS. Every app is fully interoperable — a transfer from HSBC arrives instantly in an AlipayHK account, and vice versa. HKICL operates the central switching infrastructure that connects all participants. Major banks include HSBC HK, Hang Seng Bank, Bank of China HK, Standard Chartered HK, DBS HK, Citibank HK, OCBC HK, and ICBC (Asia). Major e-wallets include PayMe by HSBC, AlipayHK, WeChat Pay HK, and Tap & Go (HKT).',
      },
      {
        id: 'fps-vs-chats',
        heading: 'FPS vs CHATS – When to Use Which',
        content:
          "Hong Kong's payment infrastructure has two main interbank clearing systems: FPS for retail and everyday transfers, and CHATS (Clearing House Automated Transfer System) for high-value corporate transactions. FPS is designed for retail payments: real-time settlement (seconds), available 24/7, free for most consumers, up to HK$1,000,000 per transaction, using phone/email/FPS ID as identifier, with native QR code support in HKD and CNY. CHATS handles large corporate transactions: same-day or next-day settlement, business hours only, fee per transaction, no fixed upper limit, using bank account + sort code, no QR code support, multi-currency (HKD, USD, EUR). For everyday consumer and small-business payments, FPS is the clear choice.",
      },
    ],
  },
  de: {
    title: 'Wie FPS funktioniert – Vollständiger Guide zum Hongkonger Faster Payment System',
    description:
      'Alles über Hongkongs Faster Payment System: Proxy-Typen, duale HKD/CNY-Währung, EMV QR-Format, unterstützte Banken und grenzüberschreitende Zahlungen.',
    sections: [
      {
        id: 'what-is-fps',
        heading: 'Was ist FPS?',
        content:
          'FPS (Faster Payment System) ist Hongkongs Echtzeit-Interbanken-Zahlungsinfrastruktur, betrieben von HKICL (Hong Kong Interbank Clearing Limited) unter der Aufsicht der Hong Kong Monetary Authority (HKMA). Am 30. September 2018 gestartet, ermöglicht FPS Privatpersonen und Unternehmen, Geld in Sekunden zu überweisen – per Mobiltelefonnummer, E-Mail-Adresse oder FPS ID, ohne die Bankkontonummer des Empfängers zu kennen. Abwicklung erfolgt innerhalb von Sekunden, 24 Stunden täglich, 365 Tage im Jahr. FPS besitzt ein Merkmal, das es von allen anderen großen Sofortzahlungssystemen der Welt unterscheidet: native Dual-Währungsunterstützung. Eine einzige FPS-Infrastruktur verarbeitet Zahlungen in Hong Kong Dollar (HKD) und Chinesischem Yuan Renminbi (CNY). Stand 2025 verbindet FPS über 7 Millionen registrierte Konten. FPS QR-Codes basieren auf dem EMV Merchant Presented Mode (MPM)-Standard mit Application Identifier (AID) hk.edu.hkma.fps in EMV-Tag ID 26.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie FPS funktioniert – Schritt für Schritt',
        content:
          'Der Händler zeigt einen FPS QR-Code – statische QR-Codes (offener Betrag) werden an der Kasse ausgedruckt, dynamische Codes mit vorab kodierten Beträgen werden pro Transaktion generiert. Der Kunde öffnet eine beliebige FPS-fähige App (HSBC HK, Hang Seng, Bank of China HK, PayMe, AlipayHK, WeChat Pay HK, Tap & Go – alle interoperabel über HKICL). Bei Händlern, die beide Währungen akzeptieren, kann die App zur Währungsauswahl auffordern. Die App liest den EMV-Payload, extrahiert die AID (hk.edu.hkma.fps), Proxy-Typ und -Wert. Authentifizierung (PIN, Biometrie) erfolgt in der Banking-App des Kunden. HKICLs FPS-Infrastruktur verarbeitet und wickelt die Zahlung innerhalb von Sekunden ab. Beide Parteien erhalten sofortige Bestätigung.',
      },
      {
        id: 'proxy-types',
        heading: 'FPS Proxy-Typen',
        content:
          'FPS verwendet Proxy-IDs, die im zentralen Register von HKICL hinterlegt sind, um Zahlungen ohne Offenlegung von Bankkontonummern weiterzuleiten. Mobiltelefonnummer (Tag 2) im Hongkonger Format +852XXXXXXXX (8 Stellen, beginnend mit 5, 6, 7 oder 9) – am häufigsten für P2P-Überweisungen. E-Mail-Adresse (Tag 3) – bevorzugt von Unternehmen und datenschutzbewussten Nutzern. FPS ID (Tag 4) ist eine eindeutige 7–9-stellige Nummer, die von der Bank bei der FPS-Registrierung vergeben wird – eine zusätzliche Datenschutzschicht. Der Proxy-Typ wird in Tag 26 des FPS QR-Payloads kodiert.',
      },
      {
        id: 'dual-currency',
        heading: 'Dual-Währung: HKD und CNY',
        content:
          'FPS\'s Dual-Währungsfähigkeit ist sein markantestes technisches Merkmal. Kein anderes Sofortzahlungssystem im ASEAN-Raum verarbeitet nativ zwei Währungen innerhalb einer einzigen Infrastruktur. HKD (Währungscode 344) wird für lokale HK-Zahlungen, Einzelhandel und Verbraucherüberweisungen verwendet. CNY (Währungscode 156) dient grenzüberschreitenden Zahlungen mit Festlandchina und CNY-Geschäftstransaktionen. Für CND-Zahlungen muss die App des Zahlenden ein CNY-fähiges Bankkonto bei FPS registriert haben. Die Abwicklung erfolgt über HKMAs designierte CNY-Abwicklungsbank. Für die meisten Einzelhandelstransaktionen mit Hongkonger Einwohnern ist HKD (Code 344) die richtige Wahl.',
      },
      {
        id: 'payload-emv',
        heading: 'Der FPS QR Payload – EMV-Format',
        content:
          'Ein FPS QR-Code ist eine TLV (Tag-Länge-Wert)-ASCII-Zeichenkette gemäß der EMV MPM-Spezifikation. Die AID hk.edu.hkma.fps befindet sich in Sub-Tag 00 von EMV-Tag 26. Sub-Tag 02 enthält die normalisierte Mobiltelefonnummer im internationalen Format. Tag 53 enthält 344 (HKD) oder 156 (CNY). Tag 63 enthält die CRC16-CCITT-Prüfsumme (4-stelliger Hex). Point of Initiation 11 = statisch, 12 = dynamisch. Tag 52 enthält den Merchant Category Code (0000 für allgemein). Tag 58 ist der Ländercode (HK). Tag 59 ist der Händlername (max. 25 Zeichen). Tag 60 ist die Händlerstadt.',
      },
      {
        id: 'phone-normalization',
        heading: 'Telefonnummer-Normalisierung',
        content:
          'Hongkonger Mobiltelefonnummern müssen vor der Einbettung in einen FPS QR-Payload in das internationale Format normalisiert werden. Regel: Vorwahl +852 (Hongkonger Landesvorwahl) voranstellen. Hongkonger Nummern sind immer 8 Stellen und beginnen mit 5, 6, 7 oder 9. Beispiel: 91234567 → +85291234567. Bereits im Format +852 vorliegende Nummern werden unverändert übernommen. Nummern, die mit 852 beginnen (ohne +), erhalten das +-Präfix. E-Mail-Adressen und FPS IDs werden ohne Normalisierung direkt verwendet. FPS IDs sind rein numerische 7–9-stellige Zeichenfolgen, die von der Bank bei der Registrierung vergeben werden.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken & Wallets',
        content:
          'Alle lizenzierten Hongkonger Banken und wichtigen E-Wallets nehmen an FPS teil. Jede App ist vollständig interoperabel – eine Überweisung von HSBC kommt sofort auf einem AlipayHK-Konto an und umgekehrt. HKICL betreibt die zentrale Vermittlungsinfrastruktur, die alle Teilnehmer verbindet. Zu den wichtigsten Banken gehören HSBC HK, Hang Seng Bank, Bank of China HK, Standard Chartered HK, DBS HK, Citibank HK, OCBC HK und ICBC (Asia). Wichtige E-Wallets sind PayMe by HSBC, AlipayHK, WeChat Pay HK und Tap & Go (HKT).',
      },
      {
        id: 'fps-vs-chats',
        heading: 'FPS vs. CHATS – Wann welches nutzen?',
        content:
          'Hongkongs Zahlungsinfrastruktur verfügt über zwei Interbanken-Clearingsysteme: FPS für Einzelhandels- und Alltagsüberweisungen sowie CHATS (Clearing House Automated Transfer System) für hochwertige Unternehmenstransaktionen. FPS eignet sich für den Einzelhandel: Echtzeit-Abwicklung (Sekunden), 24/7 verfügbar, kostenlos für die meisten Verbraucher, bis zu HK$1.000.000 pro Transaktion, Telefon/E-Mail/FPS ID als Kennung, nativer QR-Code in HKD und CNY. CHATS verarbeitet große Unternehmenstransaktionen: Abwicklung am selben oder nächsten Tag, nur während Geschäftszeiten, Gebühr pro Transaktion, kein festes Limit, Bankkonto + Bankleitzahl als Kennung, kein QR-Code, Mehrwährung (HKD, USD, EUR). Für alltägliche Verbraucher- und Kleinunternehmenszahlungen ist FPS die klare Wahl.',
      },
    ],
  },
}
