import type { LocalizedContent, GuideContent } from '../types'

export const vietqrGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'How VietQR Works – Complete Guide to Vietnam Bank Transfer QR',
    description:
      "Everything about Vietnam's national bank transfer QR standard by NAPAS: Bank BINs, EMV payload format (Tag ID 38!), account name rules and supported apps.",
    sections: [
      {
        id: 'what-is-vietqr',
        heading: 'What is VietQR?',
        content:
          'VietQR is Vietnam\'s national QR code standard for instant interbank bank transfers, developed by NAPAS (National Payment Corporation of Vietnam) in cooperation with the State Bank of Vietnam (SBV). Officially launched in March 2022, VietQR enables any Vietnamese bank customer to make and receive transfers by scanning a single standardised QR code — no manual account entry required. Before VietQR, transferring money to another bank required entering the recipient\'s bank name, account number, and branch details separately. VietQR encodes all of this in one QR code: the bank BIN identifies the receiving bank, and the account number identifies the recipient. VietQR is built on the EMV Merchant Presented Mode (MPM) specification with one important difference: NAPAS uses field ID 38 (instead of the more common ID 26) for the merchant account information. Over 50 Vietnamese banks support VietQR, including the Big Four state-owned banks and all major private banks.',
      },
      {
        id: 'how-it-works',
        heading: 'How VietQR Works – Step by Step',
        content:
          'The recipient generates a VietQR code by entering their bank BIN (or selecting their bank), account number, account name in UPPERCASE, and optionally a pre-filled amount and description. The sender opens any Vietnamese banking app or e-wallet (MoMo, ZaloPay, VNPay) — all support VietQR scanning across NAPAS-member banks. The app reads the EMV payload, extracts the bank BIN and account number. The transfer form is pre-filled automatically with the recipient\'s bank and account details. The sender authenticates with PIN, fingerprint or face ID. NAPAS routes the interbank transfer in real time — funds arrive within seconds, 24/7, including weekends. Both parties receive instant credit notifications.',
      },
      {
        id: 'bank-bin-system',
        heading: 'Bank BIN System – Finding Your Bank\'s Code',
        content:
          'A BIN (Bank Identification Number) is a 6-digit code uniquely assigned by NAPAS to each member bank. It is the primary routing identifier in VietQR — the recipient\'s bank app looks up the BIN to determine which institution to route the transfer to, without needing bilateral agreements between every pair of banks. The BIN is encoded in tag 01 within the NAPAS merchant account field (field ID 38) of the EMV payload. Major Vietnamese bank BINs: Vietcombank (970436), BIDV (970418), Agribank (970405), Vietinbank (970415), Techcombank (970407), MB Bank (970422), VPBank (970432), TPBank (970423), Sacombank (970403), ACB (970416), HDBank (970437).',
      },
      {
        id: 'payload-emv',
        heading: 'The VietQR EMV Payload (Tag ID 38 – not ID 26!)',
        content:
          'VietQR is built on the EMV QR Code Merchant Presented Mode specification, but with a critical distinction: NAPAS uses field ID 38 for the merchant account information, whereas most other standards (PromptPay, PayNow, DuitNow) use ID 26. Any VietQR parser must look for the NAPAS AID A000000727 in tag 38, not tag 26. Within tag 38: sub-tag 00 holds the NAPAS Application ID (A000000727), sub-tag 01 holds the Bank BIN (6 digits), sub-tag 02 holds the account number. Tag 53 contains 704 (VND currency code). VND amounts are whole numbers — no decimals, as VND has no subdivisions.',
      },
      {
        id: 'account-name-rules',
        heading: 'Account Name Rules: UPPERCASE Without Accents',
        content:
          'This is one of the most important aspects of VietQR. The EMV standard encodes the merchant name field in plain ASCII — a character set that does not support Vietnamese diacritical marks (tone marks and special letters like ắ, ệ, ổ, ương, đ, ơ, ư, etc.). Bank systems throughout Vietnam use ASCII-compatible account databases. Account names are therefore stored and transmitted as UPPERCASE Latin characters without any Vietnamese accents. Rule: Convert all Vietnamese characters to their unaccented Latin equivalents and use UPPERCASE. For example: Đ → D, ắ → A, ệ → E, ổ → O, ư → U, ơ → O, ă → A. Tones (sắc, huyền, hỏi, ngã, nặng) are dropped entirely. Example: "Nguyễn Văn An" → "NGUYEN VAN AN".',
      },
      {
        id: 'supported-apps',
        heading: 'Supported Apps',
        content:
          'All NAPAS-member banks are required to support VietQR in their mobile banking apps. As of 2025, this covers over 50 banks. Major e-wallets have also integrated VietQR scanning. Banking apps: Vietcombank VCB-Mobile, BIDV Smart Banking, Agribank E-Mobile, Techcombank Mobile, MB Bank, VPBank NEO. E-Wallets: MoMo (31M+ users), ZaloPay (VNG), ShopeePay VN. Payment Apps: VNPay. All NAPAS-member bank apps are fully interoperable — scanning a VietQR with any supported app routes the transfer correctly to the destination bank account.',
      },
      {
        id: 'for-merchants',
        heading: 'VietQR for Merchants',
        content:
          'Vietnamese merchants — from street food stalls to large retailers — increasingly use VietQR as their primary payment method. Printed VietQR codes are displayed at counters, tables, and storefronts. Customers scan and pay directly to the merchant\'s bank account, with no card terminal or payment hardware required. Static QR (no amount): A single printed QR code used repeatedly. Customers enter the amount themselves. Ideal for small shops and street vendors. Dynamic QR (with amount): Generated per transaction with the exact amount embedded. Reduces input errors and supports automatic reconciliation. Used by restaurants, online stores, and businesses needing precise payment matching. Merchants register for VietQR through their bank\'s merchant onboarding process.',
      },
      {
        id: 'cashless-vision',
        heading: "Vietnam's Vision for Cashless Payments",
        content:
          "The State Bank of Vietnam (SBV) has set ambitious national targets: at least 80% of adults with a bank account by 2025, and cashless payments representing the majority of retail transactions. VietQR is central to this strategy. Vietnam's QR payment adoption has been remarkably fast — within two years of launch, VietQR was supported by all major banks and processed hundreds of millions of transactions monthly. Vietnam is also integrating into the ASEAN regional QR interoperability framework. Cross-border QR payment linkages with Thailand (PromptPay) have been announced. The e-wallet ecosystem — led by MoMo (31M+ users), ZaloPay (VNG), and VNPay — has amplified VietQR adoption. For businesses operating in or with Vietnam, adopting VietQR is no longer optional — it is increasingly the expected payment method for B2C and B2B transactions.",
      },
    ],
  },
  de: {
    title: 'Wie VietQR funktioniert – Vollständiger Guide zum vietnamesischen Bank-Transfer-QR',
    description:
      'Alles über Vietnams nationalen Banküberweisung-QR-Standard von NAPAS: Bank-BINs, EMV-Payload-Format (Tag ID 38!), Kontonamen-Regeln und unterstützte Apps.',
    sections: [
      {
        id: 'what-is-vietqr',
        heading: 'Was ist VietQR?',
        content:
          'VietQR ist Vietnams nationaler QR-Code-Standard für sofortige Interbanken-Überweisungen, entwickelt von NAPAS (National Payment Corporation of Vietnam) in Zusammenarbeit mit der State Bank of Vietnam (SBV). Offiziell im März 2022 gestartet, ermöglicht VietQR jedem vietnamesischen Bankkunden, Überweisungen durch Scannen eines einzigen standardisierten QR-Codes durchzuführen und zu empfangen – ohne manuelle Kontonummereingabe. Vor VietQR erforderte eine Überweisung an eine andere Bank die separate Eingabe von Bankname, Kontonummer und Filiale. VietQR kodiert alles in einem QR-Code: Der Bank-BIN identifiziert die Empfängerbank, die Kontonummer den Empfänger. VietQR basiert auf dem EMV Merchant Presented Mode (MPM)-Standard mit einem wichtigen Unterschied: NAPAS verwendet Feld-ID 38 (statt der üblicheren ID 26) für die Händlerkonoinformationen. Über 50 vietnamesische Banken unterstützen VietQR, darunter die vier großen staatseigenen Banken und alle wichtigen Privatbanken.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie VietQR funktioniert – Schritt für Schritt',
        content:
          'Der Empfänger generiert einen VietQR-Code durch Eingabe des Bank-BINs (oder Auswahl der Bank), der Kontonummer, des Kontonamens in GROSSBUCHSTABEN und optional eines vorausgefüllten Betrags und einer Beschreibung. Der Sender öffnet eine beliebige vietnamesische Banking-App oder E-Wallet (MoMo, ZaloPay, VNPay) – alle unterstützen VietQR-Scanning bei NAPAS-Mitgliedsbanken. Die App liest den EMV-Payload, extrahiert Bank-BIN und Kontonummer. Das Überweisungsformular wird automatisch mit den Bank- und Kontodaten des Empfängers ausgefüllt. Der Sender authentifiziert sich per PIN, Fingerabdruck oder Gesichtserkennung. NAPAS leitet die Interbanken-Überweisung in Echtzeit weiter – Gelder kommen innerhalb von Sekunden an, 24/7, auch an Wochenenden. Beide Parteien erhalten sofortige Gutschriftsbenachrichtigungen.',
      },
      {
        id: 'bank-bin-system',
        heading: 'Das Bank-BIN-System',
        content:
          'Ein BIN (Bank Identification Number) ist ein 6-stelliger Code, der von NAPAS jedem Mitgliedsinstitut eindeutig zugewiesen wird. Er ist der primäre Routing-Identifier in VietQR – die Banking-App des Empfängers sucht den BIN, um zu bestimmen, an welches Institut die Überweisung weiterzuleiten ist, ohne bilaterale Vereinbarungen zwischen jedem Bankenpaar zu benötigen. Der BIN wird in Sub-Tag 01 des NAPAS-Händlerkonto-Felds (Feld-ID 38) des EMV-Payloads kodiert. Wichtige vietnamesische Bank-BINs: Vietcombank (970436), BIDV (970418), Agribank (970405), Vietinbank (970415), Techcombank (970407), MB Bank (970422), VPBank (970432), TPBank (970423), Sacombank (970403), ACB (970416), HDBank (970437).',
      },
      {
        id: 'payload-emv',
        heading: 'Der VietQR EMV-Payload (Tag ID 38 – nicht ID 26!)',
        content:
          'VietQR basiert auf der EMV QR Code Merchant Presented Mode-Spezifikation, mit einem entscheidenden Unterschied: NAPAS verwendet Feld-ID 38 für die Händlerkonoinformationen, während die meisten anderen Standards (PromptPay, PayNow, DuitNow) ID 26 verwenden. Jeder VietQR-Parser muss nach der NAPAS-AID A000000727 in Tag 38 suchen, nicht in Tag 26. Innerhalb von Tag 38: Sub-Tag 00 enthält die NAPAS-Anwendungs-ID (A000000727), Sub-Tag 01 den Bank-BIN (6 Stellen), Sub-Tag 02 die Kontonummer. Tag 53 enthält 704 (VND-Währungscode). VND-Beträge sind ganze Zahlen – keine Dezimalstellen, da VND keine Untereinheiten hat.',
      },
      {
        id: 'account-name-rules',
        heading: 'Kontonamen-Regeln: GROSSBUCHSTABEN ohne Akzente',
        content:
          'Dies ist einer der wichtigsten Aspekte von VietQR. Der EMV-Standard kodiert das Händlernamen-Feld in reinem ASCII – einem Zeichensatz, der vietnamesische diakritische Zeichen (Tonzeichen und Sonderbuchstaben wie ắ, ệ, ổ, ương, đ, ơ, ư usw.) nicht unterstützt. Banksysteme in ganz Vietnam verwenden ASCII-kompatible Kontodatenbanken. Kontonamen werden daher als GROSSBUCHSTABEN-Latein ohne vietnamesische Akzente gespeichert und übertragen. Regel: Alle vietnamesischen Zeichen in ihre akzentfreien lateinischen Entsprechungen umwandeln und GROSSBUCHSTABEN verwenden. Beispiel: Đ → D, ắ → A, ệ → E, ổ → O, ư → U, ơ → O, ă → A. Töne (sắc, huyền, hỏi, ngã, nặng) werden vollständig weggelassen. Beispiel: "Nguyễn Văn An" → "NGUYEN VAN AN".',
      },
      {
        id: 'supported-apps',
        heading: 'Unterstützte Apps',
        content:
          'Alle NAPAS-Mitgliedsbanken sind verpflichtet, VietQR in ihren mobilen Banking-Apps zu unterstützen. Stand 2025 umfasst dies über 50 Banken. Große E-Wallets haben ebenfalls VietQR-Scanning integriert. Banking-Apps: Vietcombank VCB-Mobile, BIDV Smart Banking, Agribank E-Mobile, Techcombank Mobile, MB Bank, VPBank NEO. E-Wallets: MoMo (31M+ Nutzer), ZaloPay (VNG), ShopeePay VN. Payment-Apps: VNPay. Alle NAPAS-Mitgliedsbank-Apps sind vollständig interoperabel – das Scannen eines VietQR mit einer beliebigen unterstützten App leitet die Überweisung korrekt zum Zielbankkonto weiter.',
      },
      {
        id: 'for-merchants',
        heading: 'VietQR für Händler',
        content:
          'Vietnamesische Händler – von Straßenimbissen bis zu großen Einzelhändlern – nutzen VietQR zunehmend als primäre Zahlungsmethode. Gedruckte VietQR-Codes werden an Kassen, Tischen und Schaufenstern angezeigt. Kunden scannen und zahlen direkt auf das Bankkonto des Händlers – ohne Kartenterminal oder Zahlungshardware. Statischer QR (ohne Betrag): Ein einziger gedruckter QR-Code, der wiederholt verwendet wird. Kunden geben den Betrag selbst ein. Ideal für kleine Läden und Straßenverkäufer. Dynamischer QR (mit Betrag): Pro Transaktion mit dem genauen Betrag generiert. Reduziert Eingabefehler und unterstützt automatische Abstimmung. Für Restaurants, Online-Shops und Unternehmen, die präzises Zahlungs-Matching benötigen. Händler registrieren sich für VietQR über den Händler-Onboarding-Prozess ihrer Bank.',
      },
      {
        id: 'cashless-vision',
        heading: 'Vietnams Vision für bargeldlosen Zahlungsverkehr',
        content:
          'Die State Bank of Vietnam (SBV) hat ehrgeizige nationale Ziele gesetzt: mindestens 80% der Erwachsenen mit einem Bankkonto bis 2025 und bargeldlose Zahlungen als Mehrheit der Einzelhandelstransaktionen. VietQR ist zentral für diese Strategie. Vietnams QR-Zahlungsadoption verlief bemerkenswert schnell – innerhalb von zwei Jahren nach dem Start wurde VietQR von allen großen Banken unterstützt und verarbeitete Hunderte von Millionen Transaktionen monatlich. Vietnam integriert sich auch in das regionale ASEAN-QR-Interoperabilitätsrahmen. Grenzüberschreitende QR-Zahlungsverbindungen mit Thailand (PromptPay) wurden angekündigt. Das E-Wallet-Ökosystem – angeführt von MoMo (31M+ Nutzer), ZaloPay (VNG) und VNPay – hat die VietQR-Adoption verstärkt. Für Unternehmen, die in oder mit Vietnam tätig sind, ist die Einführung von VietQR nicht mehr optional – es ist zunehmend die erwartete Zahlungsmethode für B2C- und B2B-Transaktionen.',
      },
    ],
  },
}
