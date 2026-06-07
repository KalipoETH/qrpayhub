import type { LocalizedContent, FAQContent } from '../types'

export const qrPhFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'QR Ph FAQ',
    description:
      '25 questions answered — from BSP and InstaPay to GCash, Maya, proxy types and financial inclusion in the Philippines.',
    items: [
      {
        question: 'What is QR Ph?',
        answer:
          "QR Ph is the Philippines' national QR code standard for financial transactions, developed by BSP (Bangko Sentral ng Pilipinas) and launched in 2021–2022. It is built on the EMV QR standard and uses the InstaPay network for real-time interbank transfers, available 24/7.",
      },
      {
        question: 'Who developed QR Ph?',
        answer:
          "QR Ph was developed by the Bangko Sentral ng Pilipinas (BSP), the Philippines' central bank, as part of the national Digital Payments Transformation Roadmap (2020–2023). It standardizes QR payments across all BSP-supervised financial institutions.",
      },
      {
        question: 'What is InstaPay?',
        answer:
          "InstaPay is the Philippines' real-time low-value electronic fund transfer service, operated by BancNet and supervised by BSP. QR Ph uses InstaPay as its underlying transfer network. InstaPay allows transfers up to ₱50,000 per transaction, available 24/7, 365 days a year.",
      },
      {
        question: 'What proxy types does QR Ph support?',
        answer:
          'QR Ph supports three proxy types: mobile number (Philippine format, 09XX-XXX-XXXX), bank account number (10–16 digits), and email address. The MSISDN (mobile), ACCT (account), and EMAIL proxy types are encoded in the EMV payload.',
      },
      {
        question: 'Which apps support QR Ph?',
        answer:
          'All major Philippine payment apps support QR Ph: GCash, Maya (formerly PayMaya), BDO Online Banking, BPI Mobile, UnionBank Online, Metrobank Mobile, Landbank Mobile, RCBC DiskarTech, and all other BSP-supervised financial institutions.',
      },
      {
        question: "What is GCash's role in Philippine payments?",
        answer:
          "GCash is the Philippines' largest digital wallet with over 94 million registered users. It supports QR Ph for bank transfers and merchant payments. GCash-to-GCash transfers are instant and free, while GCash-to-bank transfers use the InstaPay/QR Ph network.",
      },
      {
        question: 'What is Maya (PayMaya)?',
        answer:
          "Maya (formerly PayMaya) is the Philippines' second largest digital financial platform with over 50 million users. It offers a digital wallet, virtual and physical cards, and supports QR Ph. Maya is operated by PayMaya Philippines, a subsidiary of PLDT.",
      },
      {
        question: 'What is the QR Ph transaction limit?',
        answer:
          'QR Ph via InstaPay allows up to ₱50,000 per transaction. For higher amounts, PESONet (which settles in batches) can be used. BSP is working on increasing InstaPay limits as adoption grows.',
      },
      {
        question: 'Is QR Ph free for consumers?',
        answer:
          'Most banks and e-wallets offer free QR Ph transfers for basic transactions. Some may charge for interbank transfers above certain amounts. BSP has been pushing for free or low-cost digital payments as part of financial inclusion goals.',
      },
      {
        question: 'What is the Philippine mobile number format?',
        answer:
          'Philippine mobile numbers are 11 digits starting with 09 (e.g., 09171234567). In QR Ph, they are normalized to international format: +639171234567 (replace leading 0 with +63). Valid prefixes include 0905–0907, 0908–0919, 0920–0930, and many more assigned to Globe, Smart, and DITO networks.',
      },
      {
        question: 'What is the AID for QR Ph?',
        answer:
          'The QR Ph Application Identifier is "PH.INSTAPAY.ME", placed in EMV tag ID 26. This identifies the QR code as a Philippine InstaPay payment.',
      },
      {
        question: 'What is PESONet?',
        answer:
          "PESONet is the Philippines' batch electronic fund transfer service for larger amounts, also supervised by BSP. While QR Ph/InstaPay handles real-time low-value payments, PESONet handles higher-value batch transfers. Together they form the Philippines' electronic payment infrastructure.",
      },
      {
        question: 'Can foreign tourists use QR Ph in the Philippines?',
        answer:
          'Foreign nationals with Philippine bank accounts or e-wallets can use QR Ph. Cross-border QR payment linkages between the Philippines and other ASEAN countries are being developed through the ASEAN regional interoperability framework.',
      },
      {
        question: "What is BancNet's role in QR Ph?",
        answer:
          "BancNet is the Philippines' interbank network operator, operating the InstaPay and PESONet infrastructure. All QR Ph transactions are routed through BancNet's switching system for real-time settlement.",
      },
      {
        question: 'How does QR Ph help financial inclusion?',
        answer:
          "The Philippines has one of the largest unbanked populations in Southeast Asia. QR Ph and e-wallets like GCash allow Filipinos without traditional bank accounts to participate in digital payments, supporting BSP's goal of 50% digital payment transaction volume by 2023.",
      },
      {
        question: 'What is the difference between GCash QR and QR Ph?',
        answer:
          'GCash QR (within the GCash app) works for GCash-to-GCash payments. QR Ph is the interoperable standard that works across all banks and e-wallets. GCash supports scanning QR Ph codes for interbank transfers, making the two standards complementary.',
      },
      {
        question: 'What currency does QR Ph use?',
        answer:
          'QR Ph uses Philippine Peso (PHP), currency code 608 in the EMV payload. Amounts include 2 decimal places.',
      },
      {
        question: 'Is there an API for QR Ph generation?',
        answer:
          'qrpayhub.com will offer a REST API for QR Ph generation as part of the API plan (coming soon).',
      },
      {
        question: 'What happened before QR Ph standardization?',
        answer:
          'Before QR Ph, different banks and e-wallets had their own QR formats. Merchants needed multiple QR codes for different apps. QR Ph unified these under one standard, simplifying the merchant experience and increasing interoperability.',
      },
      {
        question: 'How many QR Ph transactions happen monthly?',
        answer:
          'Philippine digital payment volumes have grown significantly since QR Ph launch. BSP reports hundreds of millions of monthly InstaPay transactions, with QR-based transactions representing a growing share.',
      },
      {
        question: 'What is the purpose field in QR Ph?',
        answer:
          'The purpose field (up to 35 characters) allows the payer or merchant to specify the reason for payment (e.g., "Grocery payment", "Rent", "Service fee"). It is optional but helps with transaction reconciliation.',
      },
      {
        question: 'Can QR Ph be used for bill payments?',
        answer:
          'Yes, many Philippine billers (utilities, telecoms, government agencies) accept QR Ph payments through their banking apps. The reference ID field is used to identify the account or bill being paid.',
      },
      {
        question: "What is RCBC DiskarTech's role?",
        answer:
          "DiskarTech is RCBC's (Rizal Commercial Banking Corporation) all-in-one app targeting unbanked Filipinos. It supports QR Ph payments and InstaPay transfers, contributing to BSP's financial inclusion goals.",
      },
      {
        question: 'What is the UnionBank experience with QR Ph?',
        answer:
          'UnionBank of the Philippines was one of the early adopters of digital payments and QR Ph. Their app supports scanning QR Ph codes and generating personal QR codes for receiving payments, serving both retail and corporate customers.',
      },
      {
        question: 'How secure is QR Ph?',
        answer:
          'QR Ph uses CRC16 checksum validation and EMV standard encoding. Transactions are processed through BSP-supervised financial institutions with bank-grade authentication. The QR code contains no sensitive banking credentials.',
      },
    ],
  },
  de: {
    title: 'QR Ph FAQ',
    description:
      '25 Fragen beantwortet – von BSP und InstaPay bis GCash, Maya, Proxy-Typen und finanzieller Inklusion auf den Philippinen.',
    items: [
      {
        question: 'Was ist QR Ph?',
        answer:
          'QR Ph ist der nationale QR-Code-Standard der Philippinen für Finanztransaktionen, entwickelt von BSP (Bangko Sentral ng Pilipinas) und 2021–2022 gestartet. Es basiert auf dem EMV QR-Standard und nutzt das InstaPay-Netzwerk für Echtzeit-Interbanken-Überweisungen, 24/7 verfügbar.',
      },
      {
        question: 'Wer hat QR Ph entwickelt?',
        answer:
          'QR Ph wurde von der Bangko Sentral ng Pilipinas (BSP), der Zentralbank der Philippinen, als Teil des nationalen Digital Payments Transformation Roadmap (2020–2023) entwickelt. Es standardisiert QR-Zahlungen bei allen von BSP beaufsichtigten Finanzinstituten.',
      },
      {
        question: 'Was ist InstaPay?',
        answer:
          'InstaPay ist der Echtzeit-Kleintransfer-Dienst der Philippinen, betrieben von BancNet und beaufsichtigt von BSP. QR Ph nutzt InstaPay als zugrunde liegendes Überweisungsnetzwerk. InstaPay ermöglicht Überweisungen bis zu ₱50.000 pro Transaktion, 24/7, 365 Tage im Jahr.',
      },
      {
        question: 'Welche Proxy-Typen unterstützt QR Ph?',
        answer:
          'QR Ph unterstützt drei Proxy-Typen: Mobiltelefonnummer (philippinisches Format, 09XX-XXX-XXXX), Bankkontonummer (10–16 Stellen) und E-Mail-Adresse. Die Proxy-Typen MSISDN (Mobil), ACCT (Konto) und EMAIL werden im EMV-Payload kodiert.',
      },
      {
        question: 'Welche Apps unterstützen QR Ph?',
        answer:
          'Alle wichtigen philippinischen Zahlungs-Apps unterstützen QR Ph: GCash, Maya (früher PayMaya), BDO Online Banking, BPI Mobile, UnionBank Online, Metrobank Mobile, Landbank Mobile, RCBC DiskarTech und alle anderen von BSP beaufsichtigten Finanzinstitute.',
      },
      {
        question: 'Welche Rolle spielt GCash bei philippinischen Zahlungen?',
        answer:
          'GCash ist die größte digitale Wallet der Philippinen mit über 94 Millionen registrierten Nutzern. Es unterstützt QR Ph für Banküberweisungen und Händlerzahlungen. GCash-zu-GCash-Überweisungen sind sofort und kostenlos, während GCash-zu-Bank-Überweisungen das InstaPay/QR Ph-Netzwerk nutzen.',
      },
      {
        question: 'Was ist Maya (PayMaya)?',
        answer:
          'Maya (früher PayMaya) ist die zweitgrößte digitale Finanzplattform der Philippinen mit über 50 Millionen Nutzern. Sie bietet eine digitale Wallet, virtuelle und physische Karten und unterstützt QR Ph. Maya wird von PayMaya Philippines, einer PLDT-Tochter, betrieben.',
      },
      {
        question: 'Was ist das QR Ph-Transaktionslimit?',
        answer:
          'QR Ph über InstaPay erlaubt bis zu ₱50.000 pro Transaktion. Für höhere Beträge kann PESONet (das in Stapeln abwickelt) verwendet werden. BSP arbeitet daran, InstaPay-Limits zu erhöhen, da die Adoption wächst.',
      },
      {
        question: 'Ist QR Ph für Verbraucher kostenlos?',
        answer:
          'Die meisten Banken und E-Wallets bieten kostenlose QR Ph-Überweisungen für Basistransaktionen an. Einige können Gebühren für Interbanken-Überweisungen über bestimmten Beträgen erheben. BSP setzt sich für kostenlose oder kostengünstige digitale Zahlungen als Teil der Ziele zur finanziellen Inklusion ein.',
      },
      {
        question: 'Was ist das philippinische Mobiltelefonnummernformat?',
        answer:
          'Philippinische Mobiltelefonnummern haben 11 Stellen, beginnend mit 09 (z.B. 09171234567). In QR Ph werden sie ins internationale Format normalisiert: +639171234567 (führende 0 durch +63 ersetzen). Gültige Präfixe umfassen 0905–0907, 0908–0919, 0920–0930 und viele weitere für Globe, Smart und DITO-Netze.',
      },
      {
        question: 'Was ist die AID für QR Ph?',
        answer:
          'Der QR Ph Application Identifier ist „PH.INSTAPAY.ME", platziert in EMV-Tag-ID 26. Dieser identifiziert den QR-Code als philippinische InstaPay-Zahlung.',
      },
      {
        question: 'Was ist PESONet?',
        answer:
          'PESONet ist der Stapel-Überweisungsdienst der Philippinen für größere Beträge, ebenfalls unter BSP-Aufsicht. Während QR Ph/InstaPay Echtzeit-Kleinstzahlungen abwickelt, verarbeitet PESONet höherwertige Stapelüberweisungen. Zusammen bilden sie die elektronische Zahlungsinfrastruktur der Philippinen.',
      },
      {
        question: 'Können ausländische Touristen QR Ph auf den Philippinen nutzen?',
        answer:
          'Ausländische Staatsangehörige mit philippinischen Bankkonten oder E-Wallets können QR Ph nutzen. Grenzüberschreitende QR-Zahlungsverbindungen zwischen den Philippinen und anderen ASEAN-Ländern werden über das regionale ASEAN-Interoperabilitätsframework entwickelt.',
      },
      {
        question: 'Welche Rolle spielt BancNet bei QR Ph?',
        answer:
          'BancNet ist der philippinische Interbanken-Netzwerkbetreiber, der die InstaPay- und PESONet-Infrastruktur betreibt. Alle QR Ph-Transaktionen werden über BancNets Vermittlungssystem für Echtzeit-Abwicklung geroutet.',
      },
      {
        question: 'Wie hilft QR Ph bei der finanziellen Inklusion?',
        answer:
          'Die Philippinen haben eine der größten unbankierten Bevölkerungsgruppen in Südostasien. QR Ph und E-Wallets wie GCash ermöglichen Filipinos ohne traditionelle Bankkonten die Teilnahme am digitalen Zahlungsverkehr und unterstützen BSPs Ziel, 50% digitales Zahlungsvolumen bis 2023 zu erreichen.',
      },
      {
        question: 'Was ist der Unterschied zwischen GCash QR und QR Ph?',
        answer:
          'GCash QR (innerhalb der GCash-App) funktioniert für GCash-zu-GCash-Zahlungen. QR Ph ist der interoperable Standard, der über alle Banken und E-Wallets hinweg funktioniert. GCash unterstützt das Scannen von QR Ph-Codes für Interbanken-Überweisungen, wodurch die beiden Standards komplementär sind.',
      },
      {
        question: 'Welche Währung verwendet QR Ph?',
        answer:
          'QR Ph verwendet Philippinischen Peso (PHP), Währungscode 608 im EMV-Payload. Beträge enthalten 2 Dezimalstellen.',
      },
      {
        question: 'Gibt es eine API zur QR Ph-Generierung?',
        answer:
          'qrpayhub.com wird eine REST-API zur QR Ph-Generierung als Teil des API-Plans anbieten (demnächst verfügbar).',
      },
      {
        question: 'Was geschah vor der QR Ph-Standardisierung?',
        answer:
          'Vor QR Ph hatten verschiedene Banken und E-Wallets eigene QR-Formate. Händler benötigten mehrere QR-Codes für verschiedene Apps. QR Ph vereinheitlichte diese unter einem Standard, vereinfachte die Händlererfahrung und erhöhte die Interoperabilität.',
      },
      {
        question: 'Wie viele QR Ph-Transaktionen finden monatlich statt?',
        answer:
          'Das philippinische digitale Zahlungsvolumen ist seit dem QR Ph-Start erheblich gewachsen. BSP berichtet von Hunderten von Millionen monatlicher InstaPay-Transaktionen, wobei QR-basierte Transaktionen einen wachsenden Anteil darstellen.',
      },
      {
        question: 'Was ist das Verwendungszweck-Feld in QR Ph?',
        answer:
          'Das Verwendungszweck-Feld (bis zu 35 Zeichen) ermöglicht dem Zahler oder Händler, den Grund für die Zahlung anzugeben (z.B. „Lebensmitteleinkauf", „Miete", „Servicegebühr"). Es ist optional, hilft aber bei der Transaktionsabstimmung.',
      },
      {
        question: 'Kann QR Ph für Rechnungszahlungen verwendet werden?',
        answer:
          'Ja, viele philippinische Rechnungssteller (Versorgungsunternehmen, Telekommunikation, Behörden) akzeptieren QR Ph-Zahlungen über ihre Banking-Apps. Das Referenz-ID-Feld wird zur Identifizierung des Kontos oder der zu zahlenden Rechnung verwendet.',
      },
      {
        question: 'Welche Rolle spielt RCBC DiskarTech?',
        answer:
          'DiskarTech ist RCBCs (Rizal Commercial Banking Corporation) All-in-One-App für unbankierte Filipinos. Sie unterstützt QR Ph-Zahlungen und InstaPay-Überweisungen und trägt zu BSPs Zielen der finanziellen Inklusion bei.',
      },
      {
        question: 'Was ist die UnionBank-Erfahrung mit QR Ph?',
        answer:
          'UnionBank der Philippinen war einer der frühen Anwender digitaler Zahlungen und QR Ph. Ihre App unterstützt das Scannen von QR Ph-Codes und die Generierung persönlicher QR-Codes für den Zahlungsempfang, sowohl für Einzel- als auch Unternehmenskunden.',
      },
      {
        question: 'Wie sicher ist QR Ph?',
        answer:
          'QR Ph verwendet CRC16-Prüfsummenvalidierung und EMV-Standardkodierung. Transaktionen werden über von BSP beaufsichtigte Finanzinstitute mit banküblicher Authentifizierung verarbeitet. Der QR-Code enthält keine sensiblen Bankdaten.',
      },
    ],
  },
}
