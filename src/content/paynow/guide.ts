import type { LocalizedContent, GuideContent } from '../types'

export const paynowGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How PayNow Works – Complete Guide to Singapore Payments",
    description:
      "Everything about Singapore's instant payment system: proxy types, EMV QR format, editable amount, expiry date, SGQR and the ASEAN cross-border network.",
    sections: [
      {
        id: 'what-is-paynow',
        heading: 'What is PayNow?',
        content:
          "PayNow is Singapore's national instant payment system, launched in July 2017 by the Association of Banks in Singapore (ABS) under oversight of the Monetary Authority of Singapore (MAS). Built on top of Singapore's FAST (Fast And Secure Transfers) infrastructure, PayNow allows any two Singapore bank account holders to transfer money in seconds using a simple proxy identifier — no account numbers required. The central innovation of PayNow is its proxy registry: instead of requiring the recipient's bank account number and routing code, the sender simply enters a mobile number, NRIC/FIN, or UEN. The system looks up the linked bank account and routes the payment in real time. PayNow has achieved remarkable adoption — with approximately 4 million registered users in a country of 5.9 million residents. Monthly transaction volumes exceed S$10 billion. The system operates 24/7/365 with zero transaction fees for personal transfers. PayNow QR codes are encoded using the EMV Merchant Presented Mode (MPM) standard with Application Identifier (AID) SG.PAYNOW in EMV tag ID 26. The currency is always Singapore Dollar (SGD, code 702). Two unique features distinguish PayNow QR: the editable amount flag and the expiry date field, both encoded as sub-tags within tag 26.",
      },
      {
        id: 'how-it-works',
        heading: 'How PayNow Works – Step by Step',
        content:
          "The merchant displays their PayNow QR code — static QR codes (open amount) are printed or shown at the counter, dynamic codes with preset amounts are generated per transaction for e-commerce and invoices. Both types can include an expiry date. The customer opens any PayNow-enabled app (DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay, Singtel Dash, or any Singapore bank app — all fully interoperable through the ABS/MAS PayNow network). The app scanner parses the EMV payload and extracts the AID (SG.PAYNOW), proxy type, proxy value, amount, and any editable or expiry flags. If a dynamic QR was scanned, the amount is pre-filled; if the editable flag is set, the customer can modify it. Authentication (PIN, biometrics, or transaction password) happens entirely within the customer's own banking app. Singapore's FAST infrastructure processes the interbank transfer in near real-time — settlement is final and irrevocable. Both parties receive instant confirmation notifications.",
      },
      {
        id: 'proxy-types',
        heading: 'PayNow Proxy Types Explained',
        content:
          "PayNow identifies payment recipients through proxy identifiers — human-readable addresses that map to bank accounts in the ABS PayNow registry. Mobile Number (tag 0) uses the Singapore +65 format (e.g. 91234567 → +6591234567) and is most common for P2P transfers. NRIC/FIN (tag 1) uses the 9-character Singapore identity number format [S/T/F/G]XXXXXXXZ for citizens, PRs and long-term pass holders. UEN (Unique Entity Number, tag 2) uses a 9–10 character format ending with a letter for companies, charities, and government agencies. The proxy type is encoded as sub-tag 01 within EMV tag 26 of the PayNow QR payload.",
      },
      {
        id: 'payload-emv',
        heading: 'The PayNow QR Payload – EMV Format',
        content:
          "A PayNow QR code encodes a sequence of TLV (Tag-Length-Value) fields as a single ASCII string following the EMV MPM specification. The Application Identifier SG.PAYNOW is placed in sub-tag 00 of EMV tag 26. Sub-tag 01 encodes the proxy type (0=mobile, 1=NRIC/FIN, 2=UEN), sub-tag 02 contains the proxy value, sub-tag 03 contains the editable flag (0=fixed, 1=editable), and sub-tag 04 contains the optional expiry date in YYYYMMDD format. The transaction currency is SGD (ISO 4217 code 702). Country code is SG. Point of Initiation 11 = static, 12 = dynamic. Tag 63 holds the 4-character CRC16-CCITT hex checksum.",
      },
      {
        id: 'editable-expiry',
        heading: 'Editable Amount & Expiry Date',
        content:
          "PayNow QR introduces two features not present in most other EMV QR standards: the editable amount flag (sub-tag 03) and the expiry date (sub-tag 04). The editable flag '0' means the amount is fixed — the payer cannot modify the preset value, useful for exact-amount invoices. Flag '1' means editable — the payer can change the amount before confirming, useful for shared bills or tips. The expiry date is encoded in YYYYMMDD format (e.g. 20261231 = December 31, 2026). After the expiry date, the QR code is no longer valid — the payer's app will show an error. Useful for event payments, time-limited offers, or invoices with due dates.",
      },
      {
        id: 'cross-border',
        heading: 'Global Network',
        content:
          "MAS has been at the forefront of ASEAN cross-border payment integration. Singapore's PayNow was the first payment system in the world to establish a bilateral real-time cross-border link — with Thailand's PromptPay in April 2021. The network has since expanded to Malaysia (DuitNow, since 2021), India (UPI, since 2021), Indonesia (QRIS, since 2023), and the Philippines (QR Ph, since 2023). These linkages allow, for example, a Malaysian tourist in Singapore to scan a PayNow QR code with their Maybank or CIMB app — paying in MYR while the Singapore merchant receives SGD. Currency conversion happens automatically through the linked central banks' FX infrastructure. No cash, no currency exchange, no fees beyond the prevailing exchange rate.",
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks & Wallets',
        content:
          "All MAS-licensed banks and major e-wallets participate in PayNow. Every app is fully interoperable — a payment from DBS PayLah! arrives instantly in a Singtel Dash wallet. The ABS manages the PayNow proxy registry that connects all participants. Major banks include DBS/POSB (PayLah!), OCBC (Pay Anyone), UOB (Mighty), Standard Chartered, Citibank SG, HSBC Singapore, Maybank SG, Bank of China SG, and ICBC Singapore. E-wallets include GrabPay and Singtel Dash.",
      },
      {
        id: 'sgqr',
        heading: "SGQR – Singapore's Unified QR Standard",
        content:
          "SGQR (Singapore QR) was launched in September 2018 to solve the problem of multiple QR code stickers from different payment providers cluttering merchant counters. SGQR consolidates up to 27 different payment schemes into a single, standardised QR label. Under SGQR, a merchant displays one QR code that simultaneously encodes PayNow, Nets, GrabPay, and other supported payment schemes. The customer's app reads the entire SGQR payload and automatically activates the appropriate payment scheme. SGQR is a superset of PayNow QR: a valid SGQR code always contains a PayNow payload, but a standalone PayNow QR code is not necessarily a full SGQR code. For basic merchant use, a pure PayNow QR code (as generated by qrpayhub.com) is sufficient and accepted by all PayNow-enabled apps.",
      },
    ],
  },
  de: {
    title: 'Wie PayNow funktioniert – Vollständiger Guide zum singapurischen Zahlungssystem',
    description:
      'Alles über Singapurs Sofortzahlungssystem: Proxy-Typen, EMV QR-Format, editierbarer Betrag, Ablaufdatum, SGQR und das globale Netzwerk.',
    sections: [
      {
        id: 'what-is-paynow',
        heading: 'Was ist PayNow?',
        content:
          'PayNow ist Singapurs nationales Sofortzahlungssystem, das im Juli 2017 von der Association of Banks in Singapore (ABS) unter Aufsicht der Monetary Authority of Singapore (MAS) eingeführt wurde. Aufgebaut auf Singapurs FAST (Fast And Secure Transfers)-Infrastruktur ermöglicht PayNow zwei Singapur-Bankkontoinhabern, Geld in Sekunden mit einem einfachen Proxy-Identifier zu überweisen — ohne Kontonummern. Die zentrale Innovation von PayNow ist sein Proxy-Register: Anstatt die Bankkontonummer und Bankleitzahl des Empfängers zu benötigen, gibt der Absender einfach eine Mobiltelefonnummer, NRIC/FIN oder UEN ein. Das System sucht das verknüpfte Bankkonto und leitet die Zahlung in Echtzeit weiter. PayNow hat eine bemerkenswerte Verbreitung erreicht — mit rund 4 Millionen registrierten Nutzern in einem Land mit 5,9 Millionen Einwohnern. Das monatliche Transaktionsvolumen übersteigt 10 Milliarden SGD. Das System läuft 24/7/365 ohne Transaktionsgebühren für persönliche Überweisungen. PayNow QR-Codes werden mit dem EMV Merchant Presented Mode (MPM)-Standard mit Application Identifier (AID) SG.PAYNOW in EMV-Tag ID 26 kodiert. Die Währung ist immer Singapur-Dollar (SGD, Code 702). Zwei einzigartige Merkmale unterscheiden PayNow QR: das editierbare Betrags-Flag und das Ablaufdatum-Feld, beide als Sub-Tags in Tag 26 kodiert.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie PayNow funktioniert – Schritt für Schritt',
        content:
          'Der Händler zeigt seinen PayNow QR-Code — statische QR-Codes (offener Betrag) werden gedruckt oder an der Kasse angezeigt, dynamische Codes mit voreingestellten Beträgen werden pro Transaktion für E-Commerce und Rechnungen generiert. Beide Typen können ein Ablaufdatum enthalten. Der Kunde öffnet eine beliebige PayNow-fähige App (DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay, Singtel Dash oder eine beliebige singapurische Banking-App — alle vollständig interoperabel über das ABS/MAS PayNow-Netzwerk). Der App-Scanner analysiert den EMV-Payload und extrahiert AID (SG.PAYNOW), Proxy-Typ, Proxy-Wert, Betrag und alle editierbaren oder Ablauf-Flags. Wenn ein dynamischer QR gescannt wurde, ist der Betrag vorausgefüllt; wenn das editierbare Flag gesetzt ist, kann der Kunde es ändern. Authentifizierung (PIN, Biometrie oder Transaktionspasswort) erfolgt vollständig in der Banking-App des Kunden. Singapurs FAST-Infrastruktur verarbeitet die Interbank-Überweisung in nahezu Echtzeit — die Abwicklung ist endgültig und unwiderruflich. Beide Parteien erhalten sofortige Bestätigungsbenachrichtigungen.',
      },
      {
        id: 'proxy-types',
        heading: 'PayNow Proxy-Typen erklärt',
        content:
          'PayNow identifiziert Zahlungsempfänger durch Proxy-IDs — menschenlesbare Adressen, die in PayNets ABS-Register auf Bankkonten verweisen. Mobiltelefonnummer (Tag 0) verwendet das Singapur +65-Format (z.B. 91234567 → +6591234567) und ist am häufigsten für P2P-Überweisungen. NRIC/FIN (Tag 1) verwendet das 9-stellige Singapur-Ausweisnummernformat [S/T/F/G]XXXXXXXZ für Staatsbürger, Daueraufenthaltsberechtigte und Langzeit-Pass-Inhaber. UEN (Unique Entity Number, Tag 2) verwendet ein 9–10-stelliges Format, das mit einem Buchstaben endet, für Unternehmen, Wohltätigkeitsorganisationen und Behörden. Der Proxy-Typ ist als Sub-Tag 01 in EMV-Tag 26 des PayNow QR-Payloads kodiert.',
      },
      {
        id: 'payload-emv',
        heading: 'Der PayNow QR Payload – EMV-Format',
        content:
          'Ein PayNow QR-Code kodiert eine Folge von TLV (Tag-Länge-Wert)-Feldern als einzelne ASCII-Zeichenkette gemäß der EMV MPM-Spezifikation. Der Application Identifier SG.PAYNOW befindet sich in Sub-Tag 00 von EMV-Tag 26. Sub-Tag 01 kodiert den Proxy-Typ (0=Mobil, 1=NRIC/FIN, 2=UEN), Sub-Tag 02 enthält den Proxy-Wert, Sub-Tag 03 enthält das editierbare Flag (0=fest, 1=editierbar), und Sub-Tag 04 enthält das optionale Ablaufdatum im Format JJJJMMTT. Die Transaktionswährung ist SGD (ISO 4217 Code 702). Ländercode ist SG. Point of Initiation 11 = statisch, 12 = dynamisch. Tag 63 enthält die 4-stellige CRC16-CCITT Hex-Prüfsumme.',
      },
      {
        id: 'editable-expiry',
        heading: 'Editierbarer Betrag & Ablaufdatum',
        content:
          'PayNow QR führt zwei Merkmale ein, die in den meisten anderen EMV QR-Standards nicht vorhanden sind: das editierbare Betrags-Flag (Sub-Tag 03) und das Ablaufdatum (Sub-Tag 04). Das editierbare Flag „0" bedeutet, der Betrag ist fest — der Zahlende kann den voreingestellten Wert nicht ändern, nützlich für Rechnungen mit exakten Beträgen. Flag „1" bedeutet editierbar — der Zahlende kann den Betrag vor der Bestätigung ändern, nützlich für geteilte Rechnungen oder Trinkgelder. Das Ablaufdatum wird im Format JJJJMMTT kodiert (z.B. 20261231 = 31. Dezember 2026). Nach dem Ablaufdatum ist der QR-Code nicht mehr gültig — die App des Zahlenden zeigt einen Fehler. Nützlich für Veranstaltungszahlungen, zeitlich begrenzte Angebote oder Rechnungen mit Fälligkeitsdaten.',
      },
      {
        id: 'cross-border',
        heading: 'Globales Netzwerk',
        content:
          'MAS war an der Spitze der ASEAN-grenzüberschreitenden Zahlungsintegration. Singapurs PayNow war das erste Zahlungssystem der Welt, das eine bilaterale Echtzeit-Grenzüberschreitung einrichtete — mit Thailands PromptPay im April 2021. Das Netzwerk hat sich seitdem auf Malaysia (DuitNow, seit 2021), Indien (UPI, seit 2021), Indonesien (QRIS, seit 2023) und die Philippinen (QR Ph, seit 2023) ausgeweitet. Diese Verbindungen ermöglichen es beispielsweise einem malaysischen Touristen in Singapur, einen PayNow QR-Code mit seiner Maybank- oder CIMB-App zu scannen — in MYR zu zahlen, während der singapurische Händler SGD erhält. Die Währungsumrechnung erfolgt automatisch über die FX-Infrastruktur der verbundenen Zentralbanken. Kein Bargeld, kein Währungsumtausch, keine Gebühren über den aktuellen Wechselkurs hinaus.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken & Wallets',
        content:
          'Alle von MAS lizenzierten Banken und wichtigen E-Wallets nehmen an PayNow teil. Jede App ist vollständig interoperabel — eine Zahlung von DBS PayLah! kommt sofort in einem Singtel Dash-Wallet an. Die ABS verwaltet das PayNow-Proxy-Register, das alle Teilnehmer verbindet. Zu den wichtigsten Banken zählen DBS/POSB (PayLah!), OCBC (Pay Anyone), UOB (Mighty), Standard Chartered, Citibank SG, HSBC Singapur, Maybank SG, Bank of China SG und ICBC Singapur. E-Wallets umfassen GrabPay und Singtel Dash.',
      },
      {
        id: 'sgqr',
        heading: 'SGQR – Singapurs einheitlicher QR-Standard',
        content:
          'SGQR (Singapore QR) wurde im September 2018 eingeführt, um das Problem mehrerer QR-Code-Aufkleber verschiedener Zahlungsanbieter an Händlerkassen zu lösen. SGQR konsolidiert bis zu 27 verschiedene Zahlungssysteme in einem einzigen standardisierten QR-Label. Unter SGQR zeigt ein Händler einen QR-Code, der gleichzeitig PayNow, Nets, GrabPay und andere unterstützte Zahlungssysteme kodiert. Die App des Kunden liest den gesamten SGQR-Payload und aktiviert automatisch das entsprechende Zahlungssystem. SGQR ist eine Obermenge von PayNow QR: Ein gültiger SGQR-Code enthält immer einen PayNow-Payload, aber ein eigenständiger PayNow QR-Code ist nicht unbedingt ein vollständiger SGQR-Code. Für den grundlegenden Händlergebrauch ist ein reiner PayNow QR-Code (wie von qrpayhub.com generiert) ausreichend und wird von allen PayNow-fähigen Apps akzeptiert.',
      },
    ],
  },
}
