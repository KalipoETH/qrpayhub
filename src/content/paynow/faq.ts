import type { LocalizedContent, FAQContent } from '../types'

export const paynowFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'PayNow FAQ',
    description:
      '25 questions answered — from proxy types and SGQR to cross-border payments with Malaysia, Thailand and India.',
    items: [
      {
        question: 'What is PayNow?',
        answer:
          "PayNow is Singapore's peer-to-peer funds transfer service launched in July 2017 by the Association of Banks in Singapore (ABS) and the Monetary Authority of Singapore (MAS). It allows instant transfers using a mobile number, NRIC/FIN, or UEN instead of bank account numbers, available 24/7 at no cost.",
      },
      {
        question: 'Who developed PayNow?',
        answer:
          "PayNow was developed by the Association of Banks in Singapore (ABS) and overseen by the Monetary Authority of Singapore (MAS). It was built on top of Singapore's existing FAST (Fast and Secure Transfers) infrastructure.",
      },
      {
        question: 'What proxy types does PayNow support?',
        answer:
          'PayNow supports three proxy types: mobile number (Singapore +65 format, starting with 8 or 9), NRIC/FIN (9-character Singapore identity number starting with S, T, F, or G), and UEN (Unique Entity Number for businesses, 9–10 characters ending with a letter).',
      },
      {
        question: 'Which banks support PayNow in Singapore?',
        answer:
          "All major Singapore banks support PayNow: DBS/POSB, OCBC, UOB, Standard Chartered, Citibank, HSBC Singapore, Maybank SG, Bank of China SG, ICBC Singapore, and all other MAS-licensed banks. E-wallets including GrabPay and Singtel Dash also support PayNow.",
      },
      {
        question: 'Is PayNow free?',
        answer:
          "Yes, PayNow transfers are completely free for individuals. There are no transaction fees for person-to-person transfers. Businesses may incur fees depending on their bank's pricing.",
      },
      {
        question: 'What is the PayNow transaction limit?',
        answer:
          "PayNow limits vary by bank. Typical limits are S$200,000 per transaction for individual accounts. Business accounts (via UEN) may have higher limits. Daily aggregate limits also apply per bank.",
      },
      {
        question: 'What is the difference between PayNow and FAST?',
        answer:
          "FAST (Fast and Secure Transfers) is Singapore's underlying interbank infrastructure for real-time transfers using account numbers. PayNow is built on top of FAST and adds proxy-based transfers (mobile/NRIC/UEN) so users don't need to share bank account details.",
      },
      {
        question: 'What is SGQR?',
        answer:
          "SGQR (Singapore QR) is the unified QR code standard for merchant payments in Singapore, launched in September 2018. It consolidates multiple payment QR codes (PayNow, Nets, GrabPay, etc.) into one single QR label. PayNow QR is the most widely used component of SGQR.",
      },
      {
        question: 'What is a UEN and how is it used in PayNow?',
        answer:
          "UEN (Unique Entity Number) is Singapore's business identifier, assigned by ACRA (Accounting and Corporate Regulatory Authority). Businesses use their UEN as a PayNow proxy to receive payments, making it easy for customers to pay without entering bank details.",
      },
      {
        question: 'What is the NRIC/FIN format?',
        answer:
          'Singapore NRIC/FIN numbers are 9 characters: one letter (S for Singapore citizens born before 2000, T for those born from 2000, F or G for foreigners), followed by 7 digits, followed by one check letter. Example: S1234567D.',
      },
      {
        question: 'Can foreigners use PayNow in Singapore?',
        answer:
          'Foreign nationals with Singapore bank accounts or FIN numbers can register for PayNow. Tourists from Malaysia, Thailand, Indonesia, and India can pay at PayNow QR merchants through cross-border QR linkages.',
      },
      {
        question: "What is PayNow's cross-border network?",
        answer:
          "Singapore's PayNow is linked with Malaysia (DuitNow, since 2021), Thailand (PromptPay, since 2021), India (UPI, since 2021), Indonesia (QRIS, since 2023), Philippines (QR Ph, since 2023), and is expanding to more countries. This allows cross-border QR payments between ASEAN nations.",
      },
      {
        question: 'What is the "editable amount" feature in PayNow QR?',
        answer:
          'PayNow QR codes can include an "editable" flag (ID 03 in the EMV payload). When set to "1", the payer can modify the preset amount before confirming. When "0", the amount is fixed. This is useful for invoices with variable service charges.',
      },
      {
        question: 'What is the PayNow expiry date feature?',
        answer:
          'PayNow QR codes can include an optional expiry date (ID 04 in the EMV payload, format YYYYMMDD). After the expiry date, the QR code is no longer valid. This is useful for time-limited payment requests or event tickets.',
      },
      {
        question: 'Is PayNow QR the same as PayNow transfer?',
        answer:
          'PayNow QR is used for merchant payments (point-of-sale). PayNow transfer (via banking app) is for peer-to-peer transfers. Both use the same underlying PayNow infrastructure but serve different use cases.',
      },
      {
        question: 'What is the AID for PayNow QR?',
        answer:
          'The PayNow Application Identifier is "SG.PAYNOW", placed in EMV tag ID 26. This uniquely identifies the QR code as a Singapore PayNow payment.',
      },
      {
        question: 'How does PayNow compare to PayLah!?',
        answer:
          "PayLah! is DBS Bank's proprietary digital wallet app that uses PayNow infrastructure. PayLah! is a DBS-specific application; PayNow is the interoperable network that works across all Singapore banks. PayLah! users can send and receive PayNow transfers.",
      },
      {
        question: 'Can PayNow QR be used for recurring payments?',
        answer:
          "Standard PayNow QR is for one-time payments. For recurring payments, Singapore's GIRO or direct debit systems are more appropriate. However, businesses can generate fresh PayNow QR codes for each billing cycle.",
      },
      {
        question: "What is GrabPay's relationship with PayNow?",
        answer:
          "GrabPay supports PayNow QR scanning – users can pay at PayNow QR merchants using GrabPay wallet. GrabPay is also part of the SGQR ecosystem. Cross-app interoperability is a core feature of Singapore's payment infrastructure.",
      },
      {
        question: 'Is there an API for PayNow QR generation?',
        answer:
          'qrpayhub.com will offer a REST API for PayNow QR generation as part of the API plan (coming soon), enabling integration into Singapore e-commerce platforms and POS systems.',
      },
      {
        question: "What is Singtel Dash's role in PayNow?",
        answer:
          "Singtel Dash is Singapore's mobile wallet operated by Singtel. It supports PayNow transfers and QR payments, making it interoperable with all PayNow-enabled banks and merchants.",
      },
      {
        question: 'How many PayNow users are there?',
        answer:
          'Singapore has approximately 4 million registered PayNow users out of a population of 5.9 million, representing very high adoption. Monthly PayNow transaction volumes exceed S$10 billion.',
      },
      {
        question: 'What replaced cheques in Singapore after PayNow?',
        answer:
          'PayNow, together with FAST and PayNow Corporate, has largely replaced cheques for everyday payments in Singapore. The Singapore government announced plans to phase out cheques by 2025 for most business use cases.',
      },
      {
        question: 'Can I receive PayNow without a Singapore bank account?',
        answer:
          'No. PayNow requires a Singapore bank account or MAS-licensed e-wallet (like GrabPay or Singtel Dash) to receive payments. All recipients must be registered with a Singapore financial institution.',
      },
      {
        question: 'What is the PayNow Corporate service?',
        answer:
          'PayNow Corporate extends PayNow to businesses via UEN. It allows companies to receive payments from individuals and other businesses instantly. Large corporations use PayNow Corporate for customer collections and disbursements.',
      },
    ],
  },
  de: {
    title: 'PayNow FAQ',
    description:
      '25 Fragen beantwortet – von Proxy-Typen und SGQR über grenzüberschreitende Zahlungen mit Malaysia, Thailand und Indien bis zum EMV QR-Format.',
    items: [
      {
        question: 'Was ist PayNow?',
        answer:
          'PayNow ist Singapurs Peer-to-Peer-Überweisungsdienst, der im Juli 2017 von der Association of Banks in Singapore (ABS) und der Monetary Authority of Singapore (MAS) eingeführt wurde. Es ermöglicht sofortige Überweisungen über eine Mobiltelefonnummer, NRIC/FIN oder UEN statt Bankkontonummern, rund um die Uhr kostenlos.',
      },
      {
        question: 'Wer hat PayNow entwickelt?',
        answer:
          'PayNow wurde von der Association of Banks in Singapore (ABS) entwickelt und von der Monetary Authority of Singapore (MAS) überwacht. Es wurde auf Singapurs bestehender FAST (Fast and Secure Transfers)-Infrastruktur aufgebaut.',
      },
      {
        question: 'Welche Proxy-Typen unterstützt PayNow?',
        answer:
          'PayNow unterstützt drei Proxy-Typen: Mobiltelefonnummer (Singapur +65-Format, beginnend mit 8 oder 9), NRIC/FIN (9-stellige Singapur-Ausweisnummer beginnend mit S, T, F oder G) und UEN (Unique Entity Number für Unternehmen, 9–10 Zeichen, endend mit einem Buchstaben).',
      },
      {
        question: 'Welche Banken unterstützen PayNow in Singapur?',
        answer:
          'Alle großen singapurischen Banken unterstützen PayNow: DBS/POSB, OCBC, UOB, Standard Chartered, Citibank, HSBC Singapur, Maybank SG, Bank of China SG, ICBC Singapur und alle anderen von MAS lizenzierten Banken. E-Wallets wie GrabPay und Singtel Dash unterstützen PayNow ebenfalls.',
      },
      {
        question: 'Ist PayNow kostenlos?',
        answer:
          'Ja, PayNow-Überweisungen sind für Privatpersonen vollständig kostenlos. Es gibt keine Transaktionsgebühren für Peer-to-Peer-Überweisungen. Für Unternehmen können je nach Bankpreisgestaltung Gebühren anfallen.',
      },
      {
        question: 'Was ist das PayNow-Transaktionslimit?',
        answer:
          'PayNow-Limits variieren je nach Bank. Typische Limits liegen bei 200.000 SGD pro Transaktion für Privatkonten. Geschäftskonten (über UEN) können höhere Limits haben. Tägliche Gesamtlimits gelten ebenfalls je nach Bank.',
      },
      {
        question: 'Was ist der Unterschied zwischen PayNow und FAST?',
        answer:
          'FAST (Fast and Secure Transfers) ist Singapurs zugrundeliegende Interbank-Infrastruktur für Echtzeit-Überweisungen mit Kontonummern. PayNow ist auf FAST aufgebaut und fügt proxy-basierte Überweisungen (Mobil/NRIC/UEN) hinzu, sodass Nutzer keine Bankdaten teilen müssen.',
      },
      {
        question: 'Was ist SGQR?',
        answer:
          'SGQR (Singapore QR) ist der einheitliche QR-Code-Standard für Händlerzahlungen in Singapur, eingeführt im September 2018. Er konsolidiert mehrere Zahlungs-QR-Codes (PayNow, Nets, GrabPay usw.) in einem einzigen QR-Label. PayNow QR ist die am weitesten verbreitete Komponente von SGQR.',
      },
      {
        question: 'Was ist eine UEN und wie wird sie bei PayNow verwendet?',
        answer:
          'UEN (Unique Entity Number) ist Singapurs Unternehmenskennzeichner, vergeben von ACRA (Accounting and Corporate Regulatory Authority). Unternehmen verwenden ihre UEN als PayNow-Proxy, um Zahlungen zu empfangen, sodass Kunden ohne Bankdaten zahlen können.',
      },
      {
        question: 'Was ist das NRIC/FIN-Format?',
        answer:
          'Singapurische NRIC/FIN-Nummern haben 9 Zeichen: einen Buchstaben (S für vor 2000 geborene Staatsbürger, T für ab 2000 Geborene, F oder G für Ausländer), gefolgt von 7 Ziffern und einem Prüfbuchstaben. Beispiel: S1234567D.',
      },
      {
        question: 'Können Ausländer PayNow in Singapur nutzen?',
        answer:
          'Ausländische Staatsangehörige mit singapurischen Bankkonten oder FIN-Nummern können sich für PayNow registrieren. Touristen aus Malaysia, Thailand, Indonesien und Indien können bei PayNow QR-Händlern über grenzüberschreitende QR-Verbindungen bezahlen.',
      },
      {
        question: 'Was ist das grenzüberschreitende PayNow-Netzwerk?',
        answer:
          'Singapurs PayNow ist verbunden mit Malaysia (DuitNow, seit 2021), Thailand (PromptPay, seit 2021), Indien (UPI, seit 2021), Indonesien (QRIS, seit 2023), Philippinen (QR Ph, seit 2023) und wird auf weitere Länder ausgeweitet. Dies ermöglicht grenzüberschreitende QR-Zahlungen zwischen ASEAN-Nationen.',
      },
      {
        question: 'Was ist das "editierbare Betrags"-Feature bei PayNow QR?',
        answer:
          'PayNow QR-Codes können ein „editierbares" Flag enthalten (ID 03 im EMV-Payload). Wenn auf „1" gesetzt, kann der Zahlende den voreingestellten Betrag vor der Bestätigung ändern. Bei „0" ist der Betrag fest. Nützlich für Rechnungen mit variablen Servicegebühren.',
      },
      {
        question: 'Was ist das PayNow-Ablaufdatum-Feature?',
        answer:
          'PayNow QR-Codes können ein optionales Ablaufdatum enthalten (ID 04 im EMV-Payload, Format JJJJMMTT). Nach dem Ablaufdatum ist der QR-Code nicht mehr gültig. Nützlich für zeitlich begrenzte Zahlungsanforderungen oder Veranstaltungstickets.',
      },
      {
        question: 'Ist PayNow QR dasselbe wie eine PayNow-Überweisung?',
        answer:
          'PayNow QR wird für Händlerzahlungen (Point-of-Sale) verwendet. PayNow-Überweisung (über Banking-App) ist für Peer-to-Peer-Überweisungen. Beide nutzen dieselbe PayNow-Infrastruktur, dienen aber unterschiedlichen Zwecken.',
      },
      {
        question: 'Was ist die AID für PayNow QR?',
        answer:
          'Der PayNow Application Identifier lautet „SG.PAYNOW" und befindet sich in EMV-Tag ID 26. Dieser identifiziert den QR-Code eindeutig als singapurische PayNow-Zahlung.',
      },
      {
        question: 'Wie verhält sich PayNow im Vergleich zu PayLah!?',
        answer:
          'PayLah! ist DBS Banks proprietäre digitale Wallet-App, die die PayNow-Infrastruktur nutzt. PayLah! ist eine DBS-spezifische Anwendung; PayNow ist das interoperable Netzwerk, das über alle singapurischen Banken funktioniert. PayLah!-Nutzer können PayNow-Überweisungen senden und empfangen.',
      },
      {
        question: 'Kann PayNow QR für wiederkehrende Zahlungen verwendet werden?',
        answer:
          'Standard-PayNow QR ist für Einmalzahlungen. Für wiederkehrende Zahlungen sind Singapurs GIRO- oder Lastschriftverfahren besser geeignet. Unternehmen können jedoch für jeden Abrechnungszeitraum neue PayNow QR-Codes generieren.',
      },
      {
        question: 'Wie verhält sich GrabPay im Zusammenhang mit PayNow?',
        answer:
          'GrabPay unterstützt PayNow QR-Scanning – Nutzer können bei PayNow QR-Händlern mit dem GrabPay-Wallet bezahlen. GrabPay ist auch Teil des SGQR-Ökosystems. App-übergreifende Interoperabilität ist ein Kernmerkmal der singapurischen Zahlungsinfrastruktur.',
      },
      {
        question: 'Gibt es eine API für die PayNow QR-Generierung?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die PayNow QR-Generierung anbieten, die die Integration in singapurische E-Commerce-Plattformen und POS-Systeme ermöglicht.',
      },
      {
        question: 'Welche Rolle spielt Singtel Dash bei PayNow?',
        answer:
          'Singtel Dash ist Singapurs mobiles Wallet, betrieben von Singtel. Es unterstützt PayNow-Überweisungen und QR-Zahlungen und ist damit mit allen PayNow-fähigen Banken und Händlern interoperabel.',
      },
      {
        question: 'Wie viele PayNow-Nutzer gibt es?',
        answer:
          'Singapur hat rund 4 Millionen registrierte PayNow-Nutzer bei einer Bevölkerung von 5,9 Millionen, was einer sehr hohen Verbreitung entspricht. Das monatliche PayNow-Transaktionsvolumen übersteigt 10 Milliarden SGD.',
      },
      {
        question: 'Was hat Schecks in Singapur nach PayNow ersetzt?',
        answer:
          'PayNow hat zusammen mit FAST und PayNow Corporate Schecks für alltägliche Zahlungen in Singapur weitgehend ersetzt. Die singapurische Regierung kündigte Pläne an, Schecks bis 2025 für die meisten Geschäftsanwendungen auslaufen zu lassen.',
      },
      {
        question: 'Kann ich PayNow ohne ein singapurisches Bankkonto empfangen?',
        answer:
          'Nein. PayNow erfordert ein singapurisches Bankkonto oder ein von MAS lizenziertes E-Wallet (wie GrabPay oder Singtel Dash), um Zahlungen zu empfangen. Alle Empfänger müssen bei einem singapurischen Finanzinstitut registriert sein.',
      },
      {
        question: 'Was ist der PayNow Corporate-Dienst?',
        answer:
          'PayNow Corporate erweitert PayNow auf Unternehmen über UEN. Es ermöglicht Unternehmen, sofort Zahlungen von Einzelpersonen und anderen Unternehmen zu empfangen. Große Konzerne nutzen PayNow Corporate für Kundeninkasso und Auszahlungen.',
      },
    ],
  },
}
