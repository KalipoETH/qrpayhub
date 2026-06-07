import type { LocalizedContent, GuideContent } from '../types'

export const qrisGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How QRIS Works – Complete Guide to Indonesia's QR Payment",
    description:
      "Everything about Indonesia's national QR payment standard: NMID, merchant categories, EMV payload, cross-border ASEAN payments and supported apps.",
    sections: [
      {
        id: 'what-is-qris',
        heading: 'What is QRIS?',
        content:
          "QRIS — Quick Response Code Indonesian Standard — is Indonesia's national QR payment standard, developed by Bank Indonesia (BI) together with the Indonesian Payment System Association (ASPI). Officially launched on August 17, 2019 (Indonesia's Independence Day) and made mandatory for all payment providers on January 1, 2020, QRIS is built on the international EMV Merchant Presented Mode (MPM) specification — the same technical foundation used by PromptPay in Thailand and PayNow in Singapore. Before QRIS, Indonesian merchants had to display multiple QR code stickers at their counters — one for each payment app. A GoPay user couldn't scan an OVO QR code, and a Dana user couldn't pay at a LinkAja merchant. QRIS solved this fragmentation by creating a single, unified QR standard that all Indonesian payment apps must support. Today, Indonesia has over 30 million QRIS merchants — from street food stalls (warung) and motorbike taxi drivers to government offices and shopping malls — making it one of the world's largest QR payment networks by merchant count. More than 100 million Indonesians actively use QRIS-enabled payment apps. The QRIS Application Identifier (AID) is ID.CO.QRIS.WWW, embedded in EMV tag ID 26 of the QR payload. Every transaction is routed through BI-FAST, Bank Indonesia's national fast payment infrastructure, enabling real-time, 24/7 settlement.",
      },
      {
        id: 'revolution',
        heading: 'The QRIS Revolution: One Code for All Apps',
        content:
          "The transformation QRIS brought to Indonesian commerce cannot be overstated. Before January 2020, a street vendor accepting digital payments would need to maintain separate registrations with GoPay, OVO, Dana, LinkAja, and ShopeePay — and display five different QR stickers. QRIS replaced all of this with a single code. The Bank Indonesia mandate was clear: from January 1, 2020, any payment provider operating in Indonesia must adopt QRIS. Non-compliant providers faced the risk of losing their operating licenses. The result was immediate and sweeping — within months, Indonesia's entire digital payment landscape unified under a single QR standard.",
      },
      {
        id: 'how-it-works',
        heading: 'How QRIS Works – Step by Step',
        content:
          "The merchant displays their QRIS code — static codes are printed on stickers for fixed placement, dynamic codes with a preset amount are generated per transaction. The customer opens any QRIS-enabled app (GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, or any of the 50+ participating apps), scans the QR code, and the merchant name and amount appear automatically from the EMV payload. For static QR codes, the customer enters the payment amount manually. The customer authenticates with PIN or biometrics — no sensitive credentials are ever stored in the QR code. Bank Indonesia's BI-FAST infrastructure routes and settles the payment in real time, 24/7/365 including public holidays. Both parties receive instant confirmation notifications.",
      },
      {
        id: 'merchant-categories',
        heading: 'QRIS Merchant Categories & MDR',
        content:
          "Bank Indonesia classifies all QRIS merchants into four tiers based on annual revenue. The category is encoded in the QRIS payload as the Merchant Criteria field and directly determines the MDR (Merchant Discount Rate) charged on each received payment. Usaha Mikro (Micro) with revenue under Rp 300 million per year pays 0.3% MDR. Usaha Kecil (Small) with revenue Rp 300M–2.5B and Usaha Menengah (Medium) with Rp 2.5B–50B both pay 0.7% MDR. Usaha Besar (Large) above Rp 50 billion also pays 0.7%. Government institutions and education facilities pay 0% MDR. These rates are regulated by Bank Indonesia to ensure accessibility for all business sizes.",
      },
      {
        id: 'payload-emv',
        heading: 'The QRIS EMV Payload',
        content:
          "A QRIS QR code encodes a sequence of TLV (Tag-Length-Value) fields as a plain ASCII string. Each field starts with a two-digit tag ID, followed by a two-digit length value, followed by the data content. The payload is defined by the EMV Merchant Presented Mode specification and extended with QRIS-specific fields by Bank Indonesia. Tag ID 26 is the heart of QRIS — it contains the Application Identifier ID.CO.QRIS.WWW (sub-tag 00) and the merchant's National Merchant ID / NMID (sub-tag 01). The final tag 63 contains the CRC16-CCITT checksum of the entire payload (including the literal text '6304'), expressed as a 4-character uppercase hex string. The transaction currency is always Indonesian Rupiah (IDR, ISO 4217 code 360).",
      },
      {
        id: 'cross-border',
        heading: 'QRIS Cross-Border Payments',
        content:
          "Bank Indonesia has been actively expanding QRIS beyond Indonesia's borders through bilateral QR payment linkages with ASEAN neighbors and beyond. Under these linkages, tourists from connected countries can pay at Indonesian QRIS merchants using their home country's payment apps — no cash or currency exchange required. Indonesia has established connections with Thailand (PromptPay, since 2021), Malaysia (DuitNow, since 2022), Singapore (PayNow, since 2022), Philippines (QR Ph, since 2023), Vietnam (VietQR, since 2023), India (UPI, since 2023), and Japan (since 2024). The ASEAN cross-border QR payment initiative is part of a broader G20-aligned effort to interlink national fast payment systems globally.",
      },
      {
        id: 'supported-apps',
        heading: 'Supported Apps & Banks',
        content:
          "All QRIS-enabled apps are fully interoperable. A customer with GoPay can scan the same QRIS code as a customer with BCA Mobile — the routing and settlement happen transparently through Bank Indonesia's infrastructure. As of 2025, over 50 payment service providers participate in the QRIS ecosystem, including GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri Livin', BRI Mobile, BNI Mobile, CIMB Niaga, Permata, Jenius, Allo Bank, and Bank Jago. Beyond consumer e-wallets, every major Indonesian state bank and private bank has integrated QRIS into their mobile banking apps.",
      },
      {
        id: 'for-merchants',
        heading: 'QRIS for Merchants – Getting Started',
        content:
          "Registering as a QRIS merchant is straightforward. You do not register directly with Bank Indonesia — instead, you apply through any Bank Indonesia-licensed Payment Service Provider (PJSP). Common routes include registration via your bank app (BCA, Mandiri, BRI, BNI, CIMB), via GoPay/Gojek, via OVO, or via Dana. Upon successful registration, you receive a National Merchant ID (NMID) — a unique identifier assigned by Bank Indonesia — and a printed QRIS sticker with your QR code. The NMID is encoded in your QRIS payload and is required for Bank Indonesia compliance. For developers and businesses who need to generate QRIS QR codes programmatically, qrpayhub.com provides a free browser-based QRIS generator.",
      },
    ],
  },
  de: {
    title: 'Wie QRIS funktioniert – Vollständiger Guide zum indonesischen QR-Zahlungssystem',
    description:
      'Alles über Indonesiens nationalen QR-Zahlungsstandard: NMID, Händlerkategorien, EMV-Payload, grenzüberschreitende ASEAN-Zahlungen und unterstützte Apps.',
    sections: [
      {
        id: 'what-is-qris',
        heading: 'Was ist QRIS?',
        content:
          'QRIS — Quick Response Code Indonesian Standard — ist Indonesiens nationaler QR-Zahlungsstandard, entwickelt von Bank Indonesia (BI) zusammen mit der Indonesian Payment System Association (ASPI). Offiziell am 17. August 2019 (Indonesiens Unabhängigkeitstag) eingeführt und ab dem 1. Januar 2020 für alle Zahlungsanbieter verpflichtend, basiert QRIS auf der internationalen EMV Merchant Presented Mode (MPM)-Spezifikation — derselben technischen Grundlage wie PromptPay in Thailand und PayNow in Singapur. Vor QRIS mussten indonesische Händler mehrere QR-Code-Aufkleber an ihren Kassen anbringen — einen für jede Zahlungs-App. GoPay-Nutzer konnten keinen OVO QR-Code scannen, Dana-Nutzer konnten nicht bei LinkAja-Händlern bezahlen. QRIS löste diese Fragmentierung durch einen einheitlichen QR-Standard, den alle indonesischen Zahlungs-Apps unterstützen müssen. Heute gibt es über 30 Millionen QRIS-Händler in Indonesien — von Straßenimbissbuden (Warung) und Motorradtaxi-Fahrern bis zu Behörden und Einkaufszentren. Über 100 Millionen Indonesier nutzen QRIS-fähige Zahlungs-Apps aktiv. Der QRIS Application Identifier (AID) lautet ID.CO.QRIS.WWW und ist in EMV-Tag ID 26 des QR-Payloads eingebettet. Jede Transaktion wird über BI-FAST, Bank Indonesias nationale Schnellzahlungsinfrastruktur, in Echtzeit rund um die Uhr abgewickelt.',
      },
      {
        id: 'revolution',
        heading: 'Die QRIS-Revolution: Ein Code für alle Apps',
        content:
          'Die Transformation, die QRIS dem indonesischen Handel gebracht hat, kann nicht überbetont werden. Vor Januar 2020 musste ein Straßenhändler, der digitale Zahlungen akzeptiert, separate Registrierungen bei GoPay, OVO, Dana, LinkAja und ShopeePay verwalten — und fünf verschiedene QR-Aufkleber anzeigen. QRIS ersetzte all das durch einen einzigen Code. Das Mandat von Bank Indonesia war klar: Ab dem 1. Januar 2020 musste jeder Zahlungsanbieter in Indonesien QRIS übernehmen. Nicht-konforme Anbieter riskierten den Verlust ihrer Betriebslizenzen. Das Ergebnis war unmittelbar und umfassend — innerhalb weniger Monate vereinheitlichte sich Indonesiens gesamte digitale Zahlungslandschaft unter einem einzigen QR-Standard.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie QRIS funktioniert – Schritt für Schritt',
        content:
          'Der Händler zeigt seinen QRIS-Code — statische Codes werden auf Aufklebern gedruckt, dynamische Codes mit einem voreingestellten Betrag werden pro Transaktion generiert. Der Kunde öffnet eine beliebige QRIS-fähige App (GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile oder eine der 50+ teilnehmenden Apps), scannt den QR-Code, und Händlername sowie Betrag erscheinen automatisch aus dem EMV-Payload. Bei statischen QR-Codes gibt der Kunde den Zahlungsbetrag manuell ein. Der Kunde authentifiziert sich mit PIN oder Biometrie — keine sensiblen Zugangsdaten werden jemals im QR-Code gespeichert. Bank Indonesias BI-FAST-Infrastruktur leitet und wickelt die Zahlung in Echtzeit ab, 24/7/365 einschließlich Feiertagen. Beide Parteien erhalten sofortige Bestätigungsbenachrichtigungen.',
      },
      {
        id: 'merchant-categories',
        heading: 'Händlerkategorien (Usaha Mikro/Kecil/Menengah/Besar)',
        content:
          'Bank Indonesia klassifiziert alle QRIS-Händler in vier Stufen basierend auf dem Jahresumsatz. Die Kategorie ist im QRIS-Payload als Merchant Criteria-Feld kodiert und bestimmt direkt den MDR (Merchant Discount Rate), der auf jede empfangene Zahlung erhoben wird. Usaha Mikro (Kleinstunternehmen) mit einem Umsatz unter Rp 300 Millionen pro Jahr zahlt 0,3% MDR. Usaha Kecil (Kleinunternehmen) mit Rp 300M–2,5B und Usaha Menengah (Mittelständler) mit Rp 2,5B–50B zahlen beide 0,7% MDR. Usaha Besar (Großunternehmen) über Rp 50 Milliarden zahlt ebenfalls 0,7%. Staatliche Einrichtungen und Bildungseinrichtungen zahlen 0% MDR. Diese Sätze werden von Bank Indonesia reguliert, um die Zugänglichkeit für alle Unternehmensgrößen zu gewährleisten.',
      },
      {
        id: 'payload-emv',
        heading: 'Der QRIS EMV-Payload',
        content:
          'Ein QRIS QR-Code kodiert eine Folge von TLV (Tag-Länge-Wert)-Feldern als einfache ASCII-Zeichenkette. Jedes Feld beginnt mit einer zweistelligen Tag-ID, gefolgt von einem zweistelligen Längenwert und dem Dateninhalt. Der Payload ist durch die EMV Merchant Presented Mode-Spezifikation definiert und von Bank Indonesia mit QRIS-spezifischen Feldern erweitert. Tag ID 26 ist das Herzstück von QRIS — er enthält den Application Identifier ID.CO.QRIS.WWW (Sub-Tag 00) und die National Merchant ID / NMID des Händlers (Sub-Tag 01). Das letzte Tag 63 enthält die CRC16-CCITT-Prüfsumme des gesamten Payloads (einschließlich des wörtlichen Textes „6304"), ausgedrückt als 4-stellige Großbuchstaben-Hex-Zeichenkette. Die Transaktionswährung ist immer Indonesische Rupiah (IDR, ISO 4217 Code 360).',
      },
      {
        id: 'cross-border',
        heading: 'Grenzüberschreitende Zahlungen',
        content:
          'Bank Indonesia hat QRIS aktiv über Indonesiens Grenzen hinaus durch bilaterale QR-Zahlungsverbindungen mit ASEAN-Nachbarn und darüber hinaus ausgebaut. Im Rahmen dieser Verbindungen können Touristen aus verbundenen Ländern bei indonesischen QRIS-Händlern mit den Zahlungs-Apps ihres Heimatlandes bezahlen — ohne Bargeld oder Währungsumtausch. Indonesien hat Verbindungen zu Thailand (PromptPay, seit 2021), Malaysia (DuitNow, seit 2022), Singapur (PayNow, seit 2022), Philippinen (QR Ph, seit 2023), Vietnam (VietQR, seit 2023), Indien (UPI, seit 2023) und Japan (seit 2024) aufgebaut. Die ASEAN-Grenzüberschreitung ist Teil einer breiteren G20-Initiative zur Vernetzung nationaler Schnellzahlungssysteme.',
      },
      {
        id: 'supported-apps',
        heading: 'Unterstützte Apps & Banken',
        content:
          "Alle QRIS-fähigen Apps sind vollständig interoperabel. Ein Kunde mit GoPay kann denselben QRIS-Code scannen wie ein Kunde mit BCA Mobile — Routing und Abwicklung erfolgen transparent über Bank Indonesias Infrastruktur. Stand 2025 nehmen über 50 Zahlungsdienstleister am QRIS-Ökosystem teil, darunter GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri Livin', BRI Mobile, BNI Mobile, CIMB Niaga, Permata, Jenius, Allo Bank und Bank Jago. Neben Verbraucher-E-Wallets hat jede große indonesische Staatsbank und Privatbank QRIS in ihre Mobile-Banking-Apps integriert.",
      },
      {
        id: 'for-merchants',
        heading: 'QRIS für Händler',
        content:
          'Die Registrierung als QRIS-Händler ist unkompliziert. Sie registrieren sich nicht direkt bei Bank Indonesia — stattdessen beantragen Sie die Registrierung über einen von Bank Indonesia lizenzierten Payment Service Provider (PJSP). Übliche Wege sind die Registrierung über Ihre Banking-App (BCA, Mandiri, BRI, BNI, CIMB), über GoPay/Gojek, über OVO oder über Dana. Nach erfolgreicher Registrierung erhalten Sie eine National Merchant ID (NMID) — eine einmalige Kennung, die von Bank Indonesia vergeben wird — sowie einen gedruckten QRIS-Aufkleber mit Ihrem QR-Code. Die NMID ist in Ihrem QRIS-Payload kodiert und für die Bank Indonesia-Compliance erforderlich. Für Entwickler und Unternehmen, die QRIS QR-Codes programmatisch generieren müssen, bietet qrpayhub.com einen kostenlosen Browser-basierten QRIS-Generator.',
      },
    ],
  },
}
