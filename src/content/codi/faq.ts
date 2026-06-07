import type { LocalizedContent, FAQContent } from '../types'

export const codiFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'CoDi FAQ',
    description:
      '25 questions answered — from SPEI and CLABE to Banxico, DiMo, transaction limits and the BXC:// protocol.',
    items: [
      {
        question: 'What is CoDi?',
        answer:
          "CoDi (Cobro Digital) is Mexico's digital payment system developed by Banxico (Banco de México). Launched in September 2019, it uses QR codes and NFC to initiate SPEI transfers, allowing businesses to collect digital payments 24/7 without fees.",
      },
      {
        question: 'Who developed CoDi?',
        answer:
          "CoDi was developed and is operated by Banxico (Banco de México), Mexico's central bank. It was created as part of Banxico's strategy to increase financial inclusion and reduce cash usage in Mexico.",
      },
      {
        question: 'What is SPEI and how does it relate to CoDi?',
        answer:
          "SPEI (Sistema de Pagos Electrónicos Interbancarios) is Mexico's interbank electronic payment system, operated by Banxico since 2004. CoDi uses SPEI as its settlement infrastructure. When a CoDi QR is scanned, it initiates a SPEI transfer from the payer's account to the recipient.",
      },
      {
        question: 'What is a CLABE?',
        answer:
          "CLABE (Clave Bancaria Estandarizada) is Mexico's 18-digit standardized bank account number used for SPEI transfers. The first 3 digits identify the bank, digits 4–6 identify the city, digits 7–17 are the account number, and digit 18 is a check digit calculated using a weighted algorithm.",
      },
      {
        question: 'How do I validate a CLABE?',
        answer:
          'CLABE validation uses weighted digits: multiply each of the first 17 digits by weights (3,7,1 repeating), sum the results modulo 10, subtract from 10 and take modulo 10 – this gives the 18th check digit. qrpayhub.com validates CLABEs automatically using this algorithm.',
      },
      {
        question: 'Is CoDi free?',
        answer:
          'Yes, CoDi transactions are free for both payers and recipients. Banxico mandated zero fees for CoDi as part of its financial inclusion strategy.',
      },
      {
        question: 'Why is an amount required for CoDi?',
        answer:
          'Unlike other QR payment standards, CoDi always requires a payment amount to be encoded in the QR code. This is because CoDi initiates a specific SPEI transfer rather than a general payment request that the payer fills in.',
      },
      {
        question: 'What is a Referencia Numérica in CoDi?',
        answer:
          'The Referencia Numérica is a 1–7 digit numeric reference required for all SPEI/CoDi transfers. It serves as the payment reference for reconciliation. Businesses typically use invoice numbers or order numbers as the reference.',
      },
      {
        question: 'Which Mexican banks support CoDi?',
        answer:
          'All banks participating in SPEI support CoDi, including: BBVA México, Santander MX, Banorte, HSBC México, Citibanamex, Scotiabank MX, Inbursa, BanBajío, and all other SPEI-participant banks. This covers over 99% of Mexican bank accounts.',
      },
      {
        question: "What is Banxico's role in Mexican payments?",
        answer:
          "Banxico (Banco de México) is Mexico's central bank and operates SPEI, the national interbank payment system. Banxico created CoDi to add QR-based payment functionality to SPEI, and mandates that all SPEI-participant banks offer CoDi to their customers.",
      },
      {
        question: 'What is the CoDi transaction limit?',
        answer:
          'CoDi/SPEI limits vary by bank. Standard retail limits are typically MXN 8,000 per transaction for basic accounts. Premium accounts and business accounts can have limits up to MXN 500,000 or more per transaction.',
      },
      {
        question: 'Can CoDi be used without a smartphone?',
        answer:
          'CoDi primarily uses QR codes (smartphone-based). However, CoDi also supports NFC (Near Field Communication) as an alternative payment method, allowing payments without scanning a QR code on devices that support NFC.',
      },
      {
        question: 'What is the Concepto field in CoDi?',
        answer:
          "The Concepto (concept/description) is a required 1–35 character text field describing the purpose of the payment (e.g., 'Pago factura 001', 'Servicio mensual'). It appears in the payer's SPEI transfer record.",
      },
      {
        question: 'What replaced CoDi payments in everyday use?',
        answer:
          "While CoDi remains the official Banxico standard, DiMo (Dinero Móvil) was launched by Banxico in 2023 as a complementary system allowing transfers using phone numbers as proxies, similar to PIX in Brazil. CoDi and DiMo coexist in Mexico's payment ecosystem.",
      },
      {
        question: 'What is DiMo and how does it relate to CoDi?',
        answer:
          "DiMo (Dinero Móvil) is Banxico's newer mobile payment system launched in 2023, allowing transfers using phone numbers linked to bank accounts – similar to PIX or UPI. DiMo complements CoDi: CoDi handles QR merchant payments, DiMo handles person-to-person transfers via phone number.",
      },
      {
        question: 'Is SPEI available 24/7?',
        answer:
          'Yes, SPEI operates 24/7/365 since 2014, making CoDi payments available at any time. Before 2014, SPEI had operating hours; extended hours were added to support digital payment growth.',
      },
      {
        question: 'What is the BXC protocol in CoDi QR codes?',
        answer:
          'CoDi QR codes use the "BXC://" protocol (Banxico) followed by payment details. The format "BXC://SPEI?data=..." encodes the SPEI transfer parameters in pipe-delimited format within the QR code.',
      },
      {
        question: 'Can tourists use CoDi in Mexico?',
        answer:
          'CoDi requires a Mexican bank account enrolled in SPEI. Foreign tourists cannot use CoDi directly. However, Mercado Pago México and other fintech wallets allow foreign cards to be used for payments at merchants, processing through different infrastructure.',
      },
      {
        question: 'What is the adoption rate of CoDi in Mexico?',
        answer:
          'CoDi adoption has been slower than anticipated. As of 2025, approximately 40 million Mexicans have CoDi-enabled accounts, but transaction volumes remain lower than targets. DiMo and Mercado Pago QR have captured significant market share in digital payments.',
      },
      {
        question: 'How does Mercado Pago QR relate to CoDi?',
        answer:
          "Mercado Pago is Latin America's largest fintech, with its own QR payment system widely used in Mexico. Mercado Pago QR is separate from CoDi but serves similar use cases. Many Mexican merchants accept both Mercado Pago QR and CoDi.",
      },
      {
        question: 'Is there an API for CoDi QR generation?',
        answer:
          'qrpayhub.com will offer a REST API for CoDi QR generation as part of the API plan (coming soon).',
      },
      {
        question: 'What is the CLABE bank code for major Mexican banks?',
        answer:
          'First 3 digits of CLABE identify the bank: 002/012 = BBVA México, 014 = Santander, 021 = HSBC, 072 = Banorte, 006 = Bancomext, 058 = Banregio, 646 = STP (fintech).',
      },
      {
        question: 'Can CoDi be used for government payments?',
        answer:
          'Yes, several Mexican government agencies accept CoDi. Banxico actively promotes CoDi for government collections (taxes, fees, services) to reduce cash handling costs.',
      },
      {
        question: 'What is the future of CoDi?',
        answer:
          "Banxico continues to develop CoDi alongside DiMo. Future plans include cross-border QR payment linkages with other Latin American countries, particularly as Brazil's PIX has shown the potential for instant payment systems in the region.",
      },
      {
        question: 'How secure is CoDi?',
        answer:
          "CoDi transactions are processed through Banxico's SPEI infrastructure, which has operated since 2004 with high security standards. The QR code contains only the transfer details — no banking credentials are encoded. All transactions are authenticated by the payer's bank app using biometrics or PIN.",
      },
    ],
  },
  de: {
    title: 'CoDi FAQ',
    description:
      '25 Fragen beantwortet – von SPEI und CLABE bis Banxico, DiMo, Transaktionslimits und dem BXC://-Protokoll.',
    items: [
      {
        question: 'Was ist CoDi?',
        answer:
          'CoDi (Cobro Digital) ist Mexikos digitales Zahlungssystem, entwickelt von Banxico (Banco de México). Im September 2019 gestartet, nutzt es QR-Codes und NFC, um SPEI-Überweisungen zu initiieren, damit Unternehmen digitale Zahlungen 24/7 ohne Gebühren einziehen können.',
      },
      {
        question: 'Wer hat CoDi entwickelt?',
        answer:
          'CoDi wurde entwickelt und wird von Banxico (Banco de México), der mexikanischen Zentralbank, betrieben. Es wurde als Teil von Banxicos Strategie zur Förderung der finanziellen Inklusion und Reduzierung der Bargeldnutzung in Mexiko geschaffen.',
      },
      {
        question: 'Was ist SPEI und wie verhält es sich zu CoDi?',
        answer:
          'SPEI (Sistema de Pagos Electrónicos Interbancarios) ist Mexikos Interbanken-Zahlungssystem, seit 2004 von Banxico betrieben. CoDi verwendet SPEI als Abwicklungsinfrastruktur. Wenn ein CoDi QR gescannt wird, initiiert es eine SPEI-Überweisung vom Konto des Zahlenden zum Empfänger.',
      },
      {
        question: 'Was ist eine CLABE?',
        answer:
          'CLABE (Clave Bancaria Estandarizada) ist Mexikos 18-stellige standardisierte Bankkontonummer für SPEI-Überweisungen. Die ersten 3 Stellen identifizieren die Bank, Stellen 4–6 die Stadt, Stellen 7–17 sind die Kontonummer, und Stelle 18 ist eine mit einem gewichteten Algorithmus berechnete Prüfziffer.',
      },
      {
        question: 'Wie validiere ich eine CLABE?',
        answer:
          'CLABE-Validierung verwendet gewichtete Stellen: Jede der ersten 17 Stellen wird mit den Gewichten (3,7,1 wiederholt) multipliziert, die Ergebnisse werden summiert, modulo 10 genommen, von 10 subtrahiert und erneut modulo 10 genommen – dies ergibt die 18. Prüfziffer. qrpayhub.com validiert CLABEs automatisch.',
      },
      {
        question: 'Ist CoDi kostenlos?',
        answer:
          'Ja, CoDi-Transaktionen sind für Zahler und Empfänger kostenlos. Banxico hat im Rahmen seiner Strategie zur finanziellen Inklusion null Gebühren für CoDi vorgeschrieben.',
      },
      {
        question: 'Warum ist für CoDi immer ein Betrag erforderlich?',
        answer:
          'Im Gegensatz zu anderen QR-Zahlungsstandards erfordert CoDi immer einen Zahlungsbetrag im QR-Code. Dies liegt daran, dass CoDi eine spezifische SPEI-Überweisung und keine allgemeine Zahlungsanforderung initiiert, die der Zahler ausfüllt.',
      },
      {
        question: 'Was ist eine Referencia Numérica in CoDi?',
        answer:
          'Die Referencia Numérica ist eine 1–7-stellige numerische Referenz, die für alle SPEI/CoDi-Überweisungen erforderlich ist. Sie dient als Zahlungsreferenz für die Abstimmung. Unternehmen verwenden typischerweise Rechnungsnummern oder Bestellnummern als Referenz.',
      },
      {
        question: 'Welche mexikanischen Banken unterstützen CoDi?',
        answer:
          'Alle am SPEI teilnehmenden Banken unterstützen CoDi, darunter: BBVA México, Santander MX, Banorte, HSBC México, Citibanamex, Scotiabank MX, Inbursa, BanBajío und alle anderen SPEI-Teilnehmerbanken. Dies deckt über 99% der mexikanischen Bankkonten ab.',
      },
      {
        question: 'Welche Rolle spielt Banxico bei mexikanischen Zahlungen?',
        answer:
          'Banxico (Banco de México) ist Mexikos Zentralbank und betreibt SPEI, das nationale Interbanken-Zahlungssystem. Banxico schuf CoDi, um SPEI QR-basierte Zahlungsfunktionalität hinzuzufügen, und schreibt vor, dass alle SPEI-Teilnehmerbanken CoDi ihren Kunden anbieten.',
      },
      {
        question: 'Was ist das CoDi-Transaktionslimit?',
        answer:
          'CoDi/SPEI-Limits variieren je nach Bank. Standard-Einzelhandelslimits sind typischerweise MXN 8.000 pro Transaktion für Basiskonten. Premium- und Geschäftskonten können Limits bis zu MXN 500.000 oder mehr pro Transaktion haben.',
      },
      {
        question: 'Kann CoDi ohne Smartphone genutzt werden?',
        answer:
          'CoDi verwendet hauptsächlich QR-Codes (Smartphone-basiert). CoDi unterstützt jedoch auch NFC (Near Field Communication) als alternative Zahlungsmethode, die kontaktlose Zahlungen auf NFC-fähigen Geräten ohne QR-Code-Scan ermöglicht.',
      },
      {
        question: 'Was ist das Concepto-Feld in CoDi?',
        answer:
          'Das Concepto (Konzept/Beschreibung) ist ein erforderliches 1–35-Zeichen-Textfeld, das den Zahlungszweck beschreibt (z.B. „Pago factura 001", „Servicio mensual"). Es erscheint im SPEI-Überweisungsdatensatz des Zahlenden.',
      },
      {
        question: 'Was ersetzte CoDi-Zahlungen im Alltag?',
        answer:
          'Während CoDi der offizielle Banxico-Standard bleibt, startete Banxico 2023 DiMo (Dinero Móvil) als ergänzendes System, das Überweisungen über Telefonnummern als Proxys ermöglicht, ähnlich wie PIX in Brasilien. CoDi und DiMo koexistieren in Mexikos Zahlungsökosystem.',
      },
      {
        question: 'Was ist DiMo und wie verhält es sich zu CoDi?',
        answer:
          'DiMo (Dinero Móvil) ist Banxicos neueres mobiles Zahlungssystem, gestartet 2023, das Überweisungen über mit Bankkonten verknüpfte Telefonnummern ermöglicht – ähnlich wie PIX oder UPI. DiMo ergänzt CoDi: CoDi wickelt QR-Händlerzahlungen ab, DiMo Peer-to-Peer-Überweisungen per Telefonnummer.',
      },
      {
        question: 'Ist SPEI 24/7 verfügbar?',
        answer:
          'Ja, SPEI läuft seit 2014 24/7/365, sodass CoDi-Zahlungen jederzeit verfügbar sind. Vor 2014 hatte SPEI Betriebszeiten; erweiterte Zeiten wurden zur Unterstützung des Wachstums digitaler Zahlungen hinzugefügt.',
      },
      {
        question: 'Was ist das BXC-Protokoll in CoDi QR-Codes?',
        answer:
          'CoDi QR-Codes verwenden das „BXC://"-Protokoll (Banxico) gefolgt von Zahlungsdetails. Das Format „BXC://SPEI?data=..." kodiert die SPEI-Überweisungsparameter im Pipe-getrennten Format innerhalb des QR-Codes.',
      },
      {
        question: 'Können Touristen CoDi in Mexiko nutzen?',
        answer:
          'CoDi erfordert ein in SPEI registriertes mexikanisches Bankkonto. Ausländische Touristen können CoDi nicht direkt nutzen. Jedoch ermöglichen Mercado Pago México und andere Fintech-Wallets die Verwendung ausländischer Karten für Zahlungen bei Händlern über eine andere Infrastruktur.',
      },
      {
        question: 'Wie hoch ist die CoDi-Adoption in Mexiko?',
        answer:
          'CoDi-Adoption verlief langsamer als erwartet. Stand 2025 haben etwa 40 Millionen Mexikaner CoDi-fähige Konten, aber das Transaktionsvolumen bleibt unter den Zielen. DiMo und Mercado Pago QR haben erhebliche Marktanteile im digitalen Zahlungsverkehr gewonnen.',
      },
      {
        question: 'Wie verhält sich Mercado Pago QR zu CoDi?',
        answer:
          'Mercado Pago ist Lateinamerikas größtes Fintech mit einem eigenen, in Mexiko weit verbreiteten QR-Zahlungssystem. Mercado Pago QR ist von CoDi getrennt, bedient aber ähnliche Anwendungsfälle. Viele mexikanische Händler akzeptieren sowohl Mercado Pago QR als auch CoDi.',
      },
      {
        question: 'Gibt es eine API zur CoDi QR-Generierung?',
        answer:
          'qrpayhub.com wird eine REST-API zur CoDi QR-Generierung als Teil des API-Plans anbieten (demnächst verfügbar).',
      },
      {
        question: 'Was ist der CLABE-Bankcode für wichtige mexikanische Banken?',
        answer:
          'Die ersten 3 Stellen der CLABE identifizieren die Bank: 002/012 = BBVA México, 014 = Santander, 021 = HSBC, 072 = Banorte, 006 = Bancomext, 058 = Banregio, 646 = STP (Fintech).',
      },
      {
        question: 'Kann CoDi für Behördenzahlungen genutzt werden?',
        answer:
          'Ja, mehrere mexikanische Behörden akzeptieren CoDi. Banxico fördert CoDi aktiv für staatliche Inkasso-Transaktionen (Steuern, Gebühren, Dienstleistungen), um Bargeldhandhabungskosten zu reduzieren.',
      },
      {
        question: 'Was ist die Zukunft von CoDi?',
        answer:
          'Banxico entwickelt CoDi zusammen mit DiMo weiter. Zukunftspläne umfassen grenzüberschreitende QR-Zahlungsverbindungen mit anderen lateinamerikanischen Ländern, insbesondere da Brasiliens PIX das Potenzial von Sofortzahlungssystemen in der Region gezeigt hat.',
      },
      {
        question: 'Wie sicher ist CoDi?',
        answer:
          'CoDi-Transaktionen werden über Banxicos SPEI-Infrastruktur verarbeitet, die seit 2004 mit hohen Sicherheitsstandards betrieben wird. Der QR-Code enthält nur die Überweisungsdetails – keine Bankdaten werden kodiert. Alle Transaktionen werden von der Banking-App des Zahlenden per Biometrie oder PIN authentifiziert.',
      },
    ],
  },
}
