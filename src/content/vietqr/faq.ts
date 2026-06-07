import type { LocalizedContent, FAQContent } from '../types'

export const vietqrFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'VietQR FAQ',
    description:
      '25 questions answered — from Bank BINs and NAPAS to MoMo, ZaloPay, account name rules and the VND currency.',
    items: [
      {
        question: 'What is VietQR?',
        answer:
          "VietQR is Vietnam's national bank transfer QR code standard, developed by NAPAS (National Payment Corporation of Vietnam) and launched in March 2022. It allows customers to make instant bank transfers by scanning a QR code that contains bank account details, eliminating the need to manually enter account numbers.",
      },
      {
        question: 'Who developed VietQR?',
        answer:
          "VietQR was developed by NAPAS (Công ty Cổ phần Thanh toán Quốc gia Việt Nam), Vietnam's national payment corporation supervised by the State Bank of Vietnam (SBV). NAPAS operates Vietnam's interbank switching infrastructure.",
      },
      {
        question: 'What is a Bank BIN in VietQR?',
        answer:
          "BIN (Bank Identification Number) is a 6-digit code that identifies the bank in VietQR. For example: 970436 = Vietcombank, 970418 = BIDV, 970405 = Agribank. The BIN is the first 6 digits of the VietQR payload's merchant account field.",
      },
      {
        question: 'Which banks support VietQR?',
        answer:
          'Over 50 Vietnamese banks support VietQR, including all major banks: Vietcombank, BIDV, Agribank, Vietinbank, Techcombank, MB Bank, VPBank, TPBank, Sacombank, ACB, and all other NAPAS-member banks.',
      },
      {
        question: 'Why must Vietnamese account names be in UPPERCASE without accents?',
        answer:
          'Vietnamese bank systems use ASCII character sets that don\'t support Vietnamese diacritical marks (tones and accents). Account names must be entered in UPPERCASE without accents (e.g., "NGUYEN VAN A" not "Nguyễn Văn A") to ensure compatibility across all banking systems.',
      },
      {
        question: 'What is the VietQR transaction limit?',
        answer:
          'VietQR limits vary by bank. Standard limits are typically 500 million VND per transaction for individual accounts. The State Bank of Vietnam sets maximum thresholds that individual banks must not exceed.',
      },
      {
        question: 'Is VietQR free?',
        answer:
          'Interbank VietQR transfers may incur small fees depending on the bank and account type. Same-bank transfers are typically free. The State Bank of Vietnam has been pushing for free interbank transfers as part of digital payment promotion.',
      },
      {
        question: 'What apps support VietQR scanning?',
        answer:
          'All major Vietnamese banking apps support VietQR: Vietcombank VCB-Mobile, BIDV Smart Banking, Agribank E-Mobile, Techcombank Mobile, MB Bank, VNPay, MoMo, ZaloPay, and most other Vietnamese banking and e-wallet apps.',
      },
      {
        question: 'What is the difference between VietQR and VNPay QR?',
        answer:
          'VietQR is the national bank-transfer standard (direct bank-to-bank). VNPay is a payment gateway that processes transactions through participating banks. VNPay QR may redirect through the VNPay network, while VietQR transfers go directly between bank accounts via NAPAS.',
      },
      {
        question: 'How does the VietQR payload work technically?',
        answer:
          'VietQR uses EMV QR format with NAPAS AID "A000000727" in tag ID 38 (not ID 26 like other standards). The payload contains the bank BIN (tag 01) and account number (tag 02) within the merchant account field, plus CRC16 checksum.',
      },
      {
        question: 'What is NAPAS and its role in VietQR?',
        answer:
          "NAPAS (National Payment Corporation of Vietnam) operates Vietnam's interbank switching network. All VietQR transactions are routed through NAPAS infrastructure for real-time settlement. NAPAS is equivalent to India's NPCI or Malaysia's PayNet.",
      },
      {
        question: 'Can VietQR be used for merchant payments?',
        answer:
          "Yes. Merchants register for VietQR through their bank. Customers scan the merchant's VietQR code and the transfer goes directly to the merchant's bank account. This is increasingly common at Vietnamese restaurants, shops, and markets.",
      },
      {
        question: 'What is the quick amount feature in VietQR?',
        answer:
          'Vietnamese payment apps often show preset amount buttons (50,000đ, 100,000đ, 200,000đ, 500,000đ) when scanning VietQR, as these are common transaction amounts. The sender can also enter a custom amount.',
      },
      {
        question: 'Does VietQR support cross-border payments?',
        answer:
          'Vietnam is developing cross-border QR payment linkages with ASEAN countries. PromptPay (Thailand) and VietQR have announced bilateral connectivity, and Vietnam participates in the ASEAN regional QR interoperability initiative.',
      },
      {
        question: 'What replaced bank account number entry after VietQR?',
        answer:
          'Before VietQR, customers had to manually enter the beneficiary\'s bank name, account number, and name for each transfer — a process prone to errors. VietQR encodes all this information in a single QR code, eliminating manual entry and reducing transfer errors significantly.',
      },
      {
        question: 'Is there a VietQR logo requirement?',
        answer:
          'Yes, officially registered VietQR merchants should display the VietQR logo on their QR code materials. The logo helps customers identify valid VietQR codes from other QR codes.',
      },
      {
        question: 'What currency does VietQR use?',
        answer:
          'VietQR uses Vietnamese Dong (VND), currency code 704 in the EMV payload. VND has no subdivisions (no cents), so all amounts are whole numbers.',
      },
      {
        question: 'How many VietQR transactions happen per month?',
        answer:
          'As of 2025–2026, Vietnamese banks process hundreds of millions of VietQR transactions monthly. The adoption accelerated significantly after the State Bank of Vietnam promoted cashless payments.',
      },
      {
        question: 'Can I generate a VietQR without an amount?',
        answer:
          'Yes. Leaving the amount empty creates a static VietQR where the sender enters the amount. This is common for personal payment QR codes shared via social media or displayed at small merchants.',
      },
      {
        question: 'Is there an API for VietQR generation?',
        answer:
          'qrpayhub.com will offer a REST API for VietQR generation as part of the API plan (coming soon).',
      },
      {
        question: 'What is the img.vietqr.io service?',
        answer:
          'img.vietqr.io is an official VietQR image generation service provided by NAPAS partners. It generates QR code images with bank branding. qrpayhub.com generates the underlying EMV payload directly without external services.',
      },
      {
        question: "How do I find my bank's BIN for VietQR?",
        answer:
          "Your bank's BIN is a fixed 6-digit code: Vietcombank=970436, BIDV=970418, Agribank=970405, Vietinbank=970415, Techcombank=970407. Full BIN lists are published by NAPAS and available through Vietnamese banking associations.",
      },
      {
        question: "What is ZaloPay's relationship with VietQR?",
        answer:
          'ZaloPay is a popular Vietnamese e-wallet by VNG Corporation. It supports VietQR scanning for bank transfers. ZaloPay users can send money to any VietQR-enabled bank account directly from the ZaloPay app.',
      },
      {
        question: "What is MoMo's relationship with VietQR?",
        answer:
          "MoMo is Vietnam's largest e-wallet with over 31 million users. MoMo supports VietQR for bank account transfers. Users can scan VietQR codes to transfer from their MoMo wallet or linked bank account.",
      },
      {
        question: "Why is VietQR important for Vietnam's digital economy?",
        answer:
          "VietQR plays a crucial role in Vietnam's cashless payment push. The State Bank of Vietnam targets 80% of transactions to be cashless by 2025. VietQR, by simplifying bank transfers for both consumers and merchants, is a key enabler of this goal.",
      },
    ],
  },
  de: {
    title: 'VietQR FAQ',
    description:
      '25 Fragen beantwortet – von Bank-BINs und NAPAS bis MoMo, ZaloPay, Kontonamen-Regeln und der VND-Währung.',
    items: [
      {
        question: 'Was ist VietQR?',
        answer:
          'VietQR ist Vietnams nationaler QR-Code-Standard für Banküberweisungen, entwickelt von NAPAS (National Payment Corporation of Vietnam) und im März 2022 gestartet. Es ermöglicht Kunden, sofortige Banküberweisungen durch Scannen eines QR-Codes mit Bankkontodetails durchzuführen, ohne Kontonummern manuell eingeben zu müssen.',
      },
      {
        question: 'Wer hat VietQR entwickelt?',
        answer:
          'VietQR wurde von NAPAS (Công ty Cổ phần Thanh toán Quốc gia Việt Nam), Vietnams nationalem Zahlungsunternehmen unter Aufsicht der State Bank of Vietnam (SBV), entwickelt. NAPAS betreibt Vietnams Interbanken-Vermittlungsinfrastruktur.',
      },
      {
        question: 'Was ist ein Bank-BIN in VietQR?',
        answer:
          'BIN (Bank Identification Number) ist ein 6-stelliger Code, der die Bank in VietQR identifiziert. Beispiele: 970436 = Vietcombank, 970418 = BIDV, 970405 = Agribank. Der BIN ist die ersten 6 Stellen des Händlerkonto-Felds im VietQR-Payload.',
      },
      {
        question: 'Welche Banken unterstützen VietQR?',
        answer:
          'Über 50 vietnamesische Banken unterstützen VietQR, darunter alle großen Banken: Vietcombank, BIDV, Agribank, Vietinbank, Techcombank, MB Bank, VPBank, TPBank, Sacombank, ACB und alle anderen NAPAS-Mitgliedsbanken.',
      },
      {
        question: 'Warum müssen vietnamesische Kontonamen in GROSSBUCHSTABEN ohne Akzente sein?',
        answer:
          'Vietnamesische Banksysteme verwenden ASCII-Zeichensätze, die vietnamesische diakritische Zeichen (Töne und Akzente) nicht unterstützen. Kontonamen müssen in GROSSBUCHSTABEN ohne Akzente eingegeben werden (z.B. „NGUYEN VAN A" statt „Nguyễn Văn A"), um Kompatibilität über alle Banksysteme sicherzustellen.',
      },
      {
        question: 'Was ist das VietQR-Transaktionslimit?',
        answer:
          'VietQR-Limits variieren je nach Bank. Standardlimits sind typischerweise 500 Millionen VND pro Transaktion für Privatkonten. Die State Bank of Vietnam legt Höchstgrenzen fest, die einzelne Banken nicht überschreiten dürfen.',
      },
      {
        question: 'Ist VietQR kostenlos?',
        answer:
          'Interbanken-VietQR-Überweisungen können je nach Bank und Kontotyp kleine Gebühren verursachen. Gleiche-Bank-Überweisungen sind typischerweise kostenlos. Die State Bank of Vietnam setzt sich für kostenlose Interbanken-Überweisungen als Teil der Förderung digitaler Zahlungen ein.',
      },
      {
        question: 'Welche Apps unterstützen VietQR-Scanning?',
        answer:
          'Alle wichtigen vietnamesischen Banking-Apps unterstützen VietQR: Vietcombank VCB-Mobile, BIDV Smart Banking, Agribank E-Mobile, Techcombank Mobile, MB Bank, VNPay, MoMo, ZaloPay und die meisten anderen vietnamesischen Banking- und E-Wallet-Apps.',
      },
      {
        question: 'Was ist der Unterschied zwischen VietQR und VNPay QR?',
        answer:
          'VietQR ist der nationale Banküberweisung-Standard (direkt Bank-zu-Bank). VNPay ist ein Zahlungsgateway, das Transaktionen über teilnehmende Banken verarbeitet. VNPay QR kann über das VNPay-Netzwerk umleiten, während VietQR-Überweisungen direkt zwischen Bankkonten über NAPAS laufen.',
      },
      {
        question: 'Wie funktioniert der VietQR-Payload technisch?',
        answer:
          'VietQR verwendet das EMV QR-Format mit NAPAS-AID „A000000727" in Tag-ID 38 (nicht ID 26 wie andere Standards). Der Payload enthält den Bank-BIN (Tag 01) und die Kontonummer (Tag 02) im Händlerkonto-Feld, plus CRC16-Prüfsumme.',
      },
      {
        question: 'Was ist NAPAS und welche Rolle spielt es bei VietQR?',
        answer:
          'NAPAS (National Payment Corporation of Vietnam) betreibt Vietnams Interbanken-Vermittlungsnetzwerk. Alle VietQR-Transaktionen werden über die NAPAS-Infrastruktur für Echtzeit-Abwicklung geroutet. NAPAS entspricht Indiens NPCI oder Malaysias PayNet.',
      },
      {
        question: 'Kann VietQR für Händlerzahlungen verwendet werden?',
        answer:
          'Ja. Händler registrieren sich für VietQR über ihre Bank. Kunden scannen den VietQR-Code des Händlers und die Überweisung geht direkt auf das Bankkonto des Händlers. Dies ist zunehmend üblich in vietnamesischen Restaurants, Läden und Märkten.',
      },
      {
        question: 'Was ist die Schnellbetragsfunktion in VietQR?',
        answer:
          'Vietnamesische Zahlungs-Apps zeigen beim Scannen von VietQR oft voreingestellte Betragsschaltflächen (50.000đ, 100.000đ, 200.000đ, 500.000đ), da dies häufige Transaktionsbeträge sind. Der Sender kann auch einen benutzerdefinierten Betrag eingeben.',
      },
      {
        question: 'Unterstützt VietQR grenzüberschreitende Zahlungen?',
        answer:
          'Vietnam entwickelt grenzüberschreitende QR-Zahlungsverbindungen mit ASEAN-Ländern. PromptPay (Thailand) und VietQR haben bilaterale Konnektivität angekündigt, und Vietnam nimmt an der regionalen ASEAN-QR-Interoperabilitätsinitiative teil.',
      },
      {
        question: 'Was ersetzte die manuelle Bankkontonummereingabe nach VietQR?',
        answer:
          'Vor VietQR mussten Kunden für jede Überweisung manuell den Banknamen, die Kontonummer und den Namen des Begünstigten eingeben – ein fehleranfälliger Prozess. VietQR kodiert alle diese Informationen in einem einzigen QR-Code, eliminiert die manuelle Eingabe und reduziert Überweisungsfehler erheblich.',
      },
      {
        question: 'Gibt es eine VietQR-Logo-Anforderung?',
        answer:
          'Ja, offiziell registrierte VietQR-Händler sollten das VietQR-Logo auf ihren QR-Code-Materialien anzeigen. Das Logo hilft Kunden, gültige VietQR-Codes von anderen QR-Codes zu unterscheiden.',
      },
      {
        question: 'Welche Währung verwendet VietQR?',
        answer:
          'VietQR verwendet Vietnamesischer Dong (VND), Währungscode 704 im EMV-Payload. VND hat keine Untereinheiten (keine Cents), daher sind alle Beträge ganze Zahlen.',
      },
      {
        question: 'Wie viele VietQR-Transaktionen finden monatlich statt?',
        answer:
          'Stand 2025–2026 verarbeiten vietnamesische Banken Hunderte von Millionen VietQR-Transaktionen monatlich. Die Adoption beschleunigte sich erheblich, nachdem die State Bank of Vietnam bargeldlose Zahlungen förderte.',
      },
      {
        question: 'Kann ich einen VietQR ohne Betrag generieren?',
        answer:
          'Ja. Ein leerer Betrag erstellt einen statischen VietQR, bei dem der Sender den Betrag eingibt. Dies ist üblich für persönliche Zahlungs-QR-Codes, die über soziale Medien geteilt oder bei kleinen Händlern angezeigt werden.',
      },
      {
        question: 'Gibt es eine API zur VietQR-Generierung?',
        answer:
          'qrpayhub.com wird eine REST-API zur VietQR-Generierung als Teil des API-Plans anbieten (demnächst verfügbar).',
      },
      {
        question: 'Was ist der img.vietqr.io-Dienst?',
        answer:
          'img.vietqr.io ist ein offizieller VietQR-Bildgenerierungsdienst von NAPAS-Partnern. Er generiert QR-Code-Bilder mit Bankmarkenzeichen. qrpayhub.com generiert den zugrunde liegenden EMV-Payload direkt ohne externe Dienste.',
      },
      {
        question: 'Wie finde ich den BIN meiner Bank für VietQR?',
        answer:
          'Der BIN Ihrer Bank ist ein fester 6-stelliger Code: Vietcombank=970436, BIDV=970418, Agribank=970405, Vietinbank=970415, Techcombank=970407. Vollständige BIN-Listen werden von NAPAS veröffentlicht und sind über vietnamesische Bankenverbände verfügbar.',
      },
      {
        question: 'Was ist ZaloPays Verhältnis zu VietQR?',
        answer:
          'ZaloPay ist eine beliebte vietnamesische E-Wallet von VNG Corporation. Sie unterstützt VietQR-Scanning für Banküberweisungen. ZaloPay-Nutzer können Geld direkt aus der ZaloPay-App an jedes VietQR-fähige Bankkonto senden.',
      },
      {
        question: 'Was ist MoMos Verhältnis zu VietQR?',
        answer:
          'MoMo ist Vietnams größte E-Wallet mit über 31 Millionen Nutzern. MoMo unterstützt VietQR für Bankkontoüberweisungen. Nutzer können VietQR-Codes scannen, um von ihrer MoMo-Wallet oder ihrem verknüpften Bankkonto zu überweisen.',
      },
      {
        question: 'Warum ist VietQR wichtig für Vietnams digitale Wirtschaft?',
        answer:
          'VietQR spielt eine entscheidende Rolle bei Vietnams bargeldlosem Zahlungs-Push. Die State Bank of Vietnam zielt darauf ab, dass 80% der Transaktionen bis 2025 bargeldlos sind. VietQR, indem es Banküberweisungen für Verbraucher und Händler vereinfacht, ist ein Schlüsselermöglicher dieses Ziels.',
      },
    ],
  },
}
