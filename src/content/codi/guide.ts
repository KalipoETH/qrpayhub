import type { LocalizedContent, GuideContent } from '../types'

export const codiGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How CoDi Works – Complete Guide to Mexico's Digital Payment System",
    description:
      "Everything about CoDi (Cobro Digital): Mexico's QR payment system by Banxico. CLABE validation, SPEI infrastructure, BXC:// protocol, required fields and DiMo.",
    sections: [
      {
        id: 'what-is-codi',
        heading: 'What is CoDi?',
        content:
          'CoDi (Cobro Digital — "Digital Collection") is Mexico\'s national digital payment system, developed and operated by Banxico (Banco de México), the country\'s central bank. Launched in September 2019, CoDi enables merchants and individuals to receive payments via QR code or NFC, settled instantly through the SPEI interbank network — free of charge, 24 hours a day. Unlike most QR payment standards that are voluntary, CoDi was mandated by Banxico: all banks participating in SPEI are required to offer CoDi functionality to their customers. This means CoDi coverage spans every regulated bank in Mexico — BBVA México, Santander, Banorte, HSBC, Citibanamex, and 40+ others. CoDi differs from other QR payment systems in one important way: an amount is always required. CoDi initiates a specific SPEI transfer for a fixed amount — it is a "payment request" rather than an open QR that the payer fills in.',
      },
      {
        id: 'how-it-works',
        heading: 'How CoDi Works – Step by Step',
        content:
          'The merchant generates a CoDi QR code by entering the CLABE (18-digit bank account) or registered phone number, the exact amount (required), a concept description, and a numeric reference. The QR encodes a BXC://SPEI payload. The QR can be shown on a phone screen, printed, or embedded in an invoice or website. CoDi also supports NFC for contactless payment. The customer opens their bank app — any SPEI-participant bank app supports CoDi. The app reads the BXC://SPEI payload, extracting the recipient\'s CLABE or phone, amount, concept, and reference. The customer confirms the payment using NIP or biometrics. Banxico\'s SPEI infrastructure processes the transfer in under 30 seconds, 24/7/365. The merchant\'s bank sends an instant credit notification with the numeric reference for automatic reconciliation.',
      },
      {
        id: 'clabe',
        heading: "CLABE – Mexico's Bank Account Standard",
        content:
          "CLABE (Clave Bancaria Estandarizada) is Mexico's 18-digit standardised bank account number, mandatory for all SPEI transfers. Every Mexican bank account has a unique CLABE. Structure: Digits 1–3 identify the bank, digits 4–6 identify the city/plaza, digits 7–17 are the account number (11 digits), and digit 18 is a check digit. CLABE check digit algorithm: Multiply each of the first 17 digits by the repeating weight sequence 3, 7, 1, sum all products, take the result modulo 10, subtract from 10, and take modulo 10 again. Major CLABE bank codes: 002/012 = BBVA México, 014 = Santander MX, 021 = HSBC México, 072 = Banorte, 058 = Banregio, 646 = STP (fintech/SPEI direct), 006 = Bancomext. qrpayhub.com validates CLABEs automatically and displays the detected bank name.",
      },
      {
        id: 'payload-format',
        heading: 'The CoDi QR Payload Format',
        content:
          'CoDi QR codes use the BXC:// protocol (Banxico) — a proprietary URL scheme designed specifically for CoDi. The payload structure encodes SPEI transfer parameters as a pipe-delimited string: BXC://SPEI?data=SPEI|[version]|[type]|[clabe_or_phone]|[amount]|[concept]|[reference]|[name]. Fields: Protocol (BXC://SPEI, required), version (always 1, required), type (03=CLABE or 10=phone number, required), recipient CLABE (18 digits) or phone (10 digits), amount in MXN (required — always), concepto/concept (1–35 chars URL-encoded, required), referencia/reference (1–7 digit number, required), name (beneficiary name URL-encoded, optional). All text fields must be URL-encoded for the QR payload.',
      },
      {
        id: 'required-fields',
        heading: 'Required Fields – Why Amount is Mandatory',
        content:
          "CoDi's requirement for a fixed amount is a deliberate design decision by Banxico. CoDi is a payment collection system (Cobro = Collection), not just a payment routing mechanism. The workflow assumes the merchant has calculated the exact amount and encoded it in the QR — the customer simply scans and confirms. This contrasts with standards like VietQR or PromptPay, which support open-amount QR codes where the payer enters the amount. CoDi's mandatory amount reduces errors and disputes in retail transactions. The Referencia Numérica (1–7 digits) is also required and appears in the SPEI transfer record for both sender and recipient. The Concepto (1–35 characters) describes the payment purpose and also appears in the SPEI record. Common values: 'Pago factura 001', 'Servicio mensual marzo', 'Anticipo pedido 123'.",
      },
      {
        id: 'codi-vs-dimo',
        heading: "CoDi vs DiMo – Mexico's Two Systems",
        content:
          "In 2023, Banxico launched DiMo (Dinero Móvil) as a complementary instant payment system. DiMo uses phone numbers as proxies for bank account transfers — similar to how India's UPI uses UPI IDs or Brazil's PIX uses CPF/phone. CoDi and DiMo serve different use cases and coexist. CoDi: launched 2019, uses CLABE or phone as identifier, has QR code (BXC:// format) and NFC support, amount is required, best for merchant QR payments, similar to PromptPay/VietQR. DiMo: launched 2023, uses phone number proxy, no QR code (phone-number based), flexible amount, best for P2P transfers, similar to PIX/UPI. Both systems settle through SPEI infrastructure.",
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks',
        content:
          'All SPEI-participant banks in Mexico are obligated to support CoDi. As of 2025, this includes over 50 commercial banks, development banks, and fintech institutions licensed to operate in Mexico. Major banks with CoDi support: BBVA México (BBVA México App), Santander MX (Santander México), Banorte (Banorte Móvil), HSBC México (HSBC México App), Citibanamex (Citibanamex Móvil), Scotiabank MX (Scotia en Línea), Inbursa (Inbursa Móvil), BanBajío (BanBajío Móvil). Digital wallets/fintech: Mercado Pago MX (Mercado Pago), Spin by OXXO (Spin App). Coverage represents 99%+ of Mexican bank accounts.',
      },
      {
        id: 'digital-payment-evolution',
        heading: "Mexico's Digital Payment Evolution",
        content:
          "Mexico's digital payment journey began with SPEI in 2004 — one of Latin America's first real-time interbank systems. For over a decade, SPEI was a business and high-value payment tool. CoDi in 2019 brought SPEI to everyday retail by wrapping it in a QR code interface. CoDi adoption has been slower than comparable systems in Brazil (PIX) or India (UPI), constrained by the requirement for a SPEI-enrolled bank account and competition from Mercado Pago's own QR payment system. DiMo's launch in 2023 addressed key limitations by enabling phone-number-based transfers without needing to know the recipient's CLABE. Together, CoDi (QR merchant payments) and DiMo (P2P transfers) form a complete instant payment system comparable to Brazil's PIX. For businesses operating in Mexico, CoDi offers zero-fee payment acceptance with universal bank coverage — no card terminal, no payment gateway fees.",
      },
    ],
  },
  de: {
    title: 'Wie CoDi funktioniert – Vollständiger Guide zu Mexikos digitalem Zahlungssystem',
    description:
      'Alles über CoDi (Cobro Digital): Mexikos QR-Zahlungssystem von Banxico. CLABE-Validierung, SPEI-Infrastruktur, BXC://-Protokoll, Pflichtfelder und DiMo.',
    sections: [
      {
        id: 'what-is-codi',
        heading: 'Was ist CoDi?',
        content:
          'CoDi (Cobro Digital – „Digitales Inkasso") ist Mexikos nationales digitales Zahlungssystem, entwickelt und betrieben von Banxico (Banco de México), der mexikanischen Zentralbank. Im September 2019 gestartet, ermöglicht CoDi Händlern und Privatpersonen, Zahlungen per QR-Code oder NFC zu empfangen, die sofort über das SPEI-Interbanken-Netzwerk abgewickelt werden – kostenlos, 24 Stunden täglich. Im Gegensatz zu den meisten freiwilligen QR-Zahlungsstandards hat Banxico CoDi vorgeschrieben: Alle am SPEI teilnehmenden Banken sind verpflichtet, ihren Kunden CoDi-Funktionalität anzubieten. Das bedeutet, CoDi deckt jede regulierte Bank in Mexiko ab – BBVA México, Santander, Banorte, HSBC, Citibanamex und über 40 weitere. CoDi unterscheidet sich von anderen QR-Zahlungssystemen in einem wichtigen Punkt: Ein Betrag ist immer erforderlich. CoDi initiiert eine spezifische SPEI-Überweisung für einen festen Betrag – es ist eine „Zahlungsanforderung" und kein offener QR, den der Zahler ausfüllt.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie CoDi funktioniert – Schritt für Schritt',
        content:
          'Der Händler generiert einen CoDi QR-Code durch Eingabe der CLABE (18-stellige Bankkontonummer) oder der registrierten Telefonnummer, des genauen Betrags (Pflicht), einer Konzeptbeschreibung und einer Referenznummer. Der QR kodiert einen BXC://SPEI-Payload. Der QR kann auf einem Telefonbildschirm angezeigt, gedruckt oder in eine Rechnung oder Website eingebettet werden. CoDi unterstützt auch NFC für kontaktlose Zahlung. Der Kunde öffnet seine Banking-App – jede SPEI-Teilnehmer-Banking-App unterstützt CoDi. Die App liest den BXC://SPEI-Payload und extrahiert CLABE oder Telefon des Empfängers, Betrag, Konzept und Referenz. Der Kunde bestätigt die Zahlung per NIP oder Biometrie. Banxicos SPEI-Infrastruktur verarbeitet die Überweisung in unter 30 Sekunden, 24/7/365. Die Bank des Händlers sendet eine sofortige Gutschriftsbenachrichtigung mit der Referenznummer zur automatischen Abstimmung.',
      },
      {
        id: 'clabe',
        heading: 'CLABE – Mexikos Bankkontonummer-Standard',
        content:
          'CLABE (Clave Bancaria Estandarizada) ist Mexikos 18-stellige standardisierte Bankkontonummer, obligatorisch für alle SPEI-Überweisungen. Jedes mexikanische Bankkonto hat eine eindeutige CLABE. Aufbau: Stellen 1–3 identifizieren die Bank, Stellen 4–6 die Stadt/Plaza, Stellen 7–17 sind die Kontonummer (11 Stellen), und Stelle 18 ist eine Prüfziffer. CLABE-Prüfziffer-Algorithmus: Jede der ersten 17 Stellen wird mit der sich wiederholenden Gewichtsfolge 3, 7, 1 multipliziert, alle Produkte werden addiert, das Ergebnis wird modulo 10 genommen, von 10 subtrahiert und erneut modulo 10 genommen. Wichtige CLABE-Bankcodes: 002/012 = BBVA México, 014 = Santander MX, 021 = HSBC México, 072 = Banorte, 058 = Banregio, 646 = STP (Fintech/SPEI direkt), 006 = Bancomext. qrpayhub.com validiert CLABEs automatisch und zeigt den erkannten Banknamen an.',
      },
      {
        id: 'payload-format',
        heading: 'Das CoDi QR Payload-Format',
        content:
          'CoDi QR-Codes verwenden das BXC://-Protokoll (Banxico) – ein proprietäres URL-Schema, das speziell für CoDi entwickelt wurde. Die Payload-Struktur kodiert SPEI-Überweisungsparameter als pipe-getrennte Zeichenkette: BXC://SPEI?data=SPEI|[Version]|[Typ]|[CLABE_oder_Telefon]|[Betrag]|[Konzept]|[Referenz]|[Name]. Felder: Protokoll (BXC://SPEI, Pflicht), Version (immer 1, Pflicht), Typ (03=CLABE oder 10=Telefonnummer, Pflicht), Empfänger CLABE (18 Stellen) oder Telefon (10 Stellen), Betrag in MXN (Pflicht – immer), Concepto/Konzept (1–35 Zeichen URL-kodiert, Pflicht), Referencia/Referenz (1–7-stellige Zahl, Pflicht), Name (Begünstigtenname URL-kodiert, optional). Alle Textfelder müssen für den QR-Payload URL-kodiert werden.',
      },
      {
        id: 'required-fields',
        heading: 'Pflichtfelder – Warum der Betrag immer angegeben werden muss',
        content:
          'CoDis Anforderung eines festen Betrags ist eine bewusste Designentscheidung von Banxico. CoDi ist ein Zahlungsinkasso-System (Cobro = Inkasso), nicht nur ein Zahlungsrouting-Mechanismus. Der Workflow setzt voraus, dass der Händler den genauen Betrag berechnet und im QR kodiert hat – der Kunde scannt und bestätigt einfach. Dies steht im Gegensatz zu Standards wie VietQR oder PromptPay, die offene QR-Codes unterstützen, bei denen der Zahler den Betrag eingibt. CoDis obligatorischer Betrag reduziert Fehler und Streitigkeiten bei Einzelhandelstransaktionen. Die Referencia Numérica (1–7 Stellen) ist ebenfalls Pflicht und erscheint im SPEI-Überweisungsdatensatz für Sender und Empfänger. Das Concepto (1–35 Zeichen) beschreibt den Zahlungszweck. Übliche Werte: „Pago factura 001", „Servicio mensual marzo", „Anticipo pedido 123".',
      },
      {
        id: 'codi-vs-dimo',
        heading: 'CoDi vs. DiMo – Mexikos zwei Systeme',
        content:
          '2023 startete Banxico DiMo (Dinero Móvil) als ergänzendes Sofortzahlungssystem. DiMo verwendet Telefonnummern als Proxys für Bankkontoüberweisungen – ähnlich wie Indiens UPI UPI-IDs oder Brasiliens PIX CPF/Telefon verwendet. CoDi und DiMo dienen unterschiedlichen Anwendungsfällen und koexistieren. CoDi: gestartet 2019, verwendet CLABE oder Telefon als Kennung, QR-Code (BXC://-Format) und NFC-Unterstützung, Betrag ist Pflicht, am besten für Händler-QR-Zahlungen, ähnlich wie PromptPay/VietQR. DiMo: gestartet 2023, verwendet Telefonnummer-Proxy, kein QR-Code (telefonnummernbasiert), flexibler Betrag, am besten für P2P-Überweisungen, ähnlich wie PIX/UPI. Beide Systeme wickeln über die SPEI-Infrastruktur ab.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken',
        content:
          'Alle SPEI-Teilnehmerbanken in Mexiko sind verpflichtet, CoDi zu unterstützen. Stand 2025 umfasst dies über 50 Geschäftsbanken, Entwicklungsbanken und in Mexiko lizenzierte Fintech-Institutionen. Wichtige Banken mit CoDi-Unterstützung: BBVA México (BBVA México App), Santander MX (Santander México), Banorte (Banorte Móvil), HSBC México (HSBC México App), Citibanamex (Citibanamex Móvil), Scotiabank MX (Scotia en Línea), Inbursa (Inbursa Móvil), BanBajío (BanBajío Móvil). Digitale Wallets/Fintech: Mercado Pago MX (Mercado Pago), Spin by OXXO (Spin App). Die Abdeckung entspricht 99%+ der mexikanischen Bankkonten.',
      },
      {
        id: 'digital-payment-evolution',
        heading: 'Mexikos digitale Zahlungsevolution',
        content:
          'Mexikos digitale Zahlungsreise begann mit SPEI im Jahr 2004 – eines der ersten Echtzeit-Interbanken-Systeme Lateinamerikas. Über ein Jahrzehnt lang war SPEI ein Geschäfts- und Hochwertzahlungsinstrument. CoDi brachte SPEI 2019 in den Einzelhandelsalltag, indem es in eine QR-Code-Oberfläche verpackt wurde. CoDis Adoption verlief langsamer als bei vergleichbaren Systemen in Brasilien (PIX) oder Indien (UPI), beschränkt durch die Anforderung eines SPEI-registrierten Bankkontos und den Wettbewerb durch Mercado Pagos eigenes QR-Zahlungssystem. DiMos Start 2023 behob wichtige Einschränkungen, indem es telefonnummernbasierte Überweisungen ohne Kenntnis der Empfänger-CLABE ermöglichte. Zusammen bilden CoDi (QR-Händlerzahlungen) und DiMo (P2P-Überweisungen) ein vollständiges Sofortzahlungssystem, vergleichbar mit Brasiliens PIX. Für Unternehmen in Mexiko bietet CoDi gebührenfreie Zahlungsannahme mit universeller Bankabdeckung – kein Kartenterminal, keine Zahlungsgateway-Gebühren.',
      },
    ],
  },
}
