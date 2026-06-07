import type { LocalizedContent, GuideContent } from '../types'

export const duitnowGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How DuitNow Works – Complete Guide to Malaysian Payments",
    description:
      "Everything about Malaysia's instant payment system: DuitNow IDs, EMV QR format, phone normalization, ASEAN cross-border connections and supported banks.",
    sections: [
      {
        id: 'what-is-duitnow',
        heading: 'What is DuitNow?',
        content:
          "DuitNow is Malaysia's national instant payment system, developed and operated by PayNet (Payments Network Malaysia) — a joint venture owned by Bank Negara Malaysia (BNM) and eleven major Malaysian financial institutions. Launched in 2018, DuitNow replaced the older, slower Interbank GIRO (IBG) system and unified all Malaysian banks under a single real-time payment infrastructure. The name 'DuitNow' combines the Malay word for money (duit) with 'Now' — reflecting its core promise of instant transfers. Unlike traditional bank transfers that require knowing a recipient's account number and bank routing code, DuitNow allows payments using a simple proxy identifier: a mobile phone number, MyKad IC number, passport number, or business registration number. DuitNow has grown into the backbone of Malaysian digital payments. As of 2025, it connects over 30 million registered users across all licensed Malaysian banks and major e-wallets. Payments process in seconds, available 24 hours a day, 7 days a week — including public holidays. DuitNow is free for personal transfers up to RM 5,000. DuitNow QR — the QR code payment component of the DuitNow ecosystem — is based on the EMV Merchant Presented Mode (MPM) standard, the same technical foundation used by QRIS (Indonesia), PromptPay (Thailand), and PayNow (Singapore). The DuitNow QR Application Identifier (AID) is A000000693010011, embedded in EMV tag ID 26 of every DuitNow QR code.",
      },
      {
        id: 'how-it-works',
        heading: 'How DuitNow Works – Step by Step',
        content:
          "The merchant displays their DuitNow QR code — static codes are printed and displayed at the counter for open-amount payments, dynamic codes with a preset amount are generated per transaction for e-commerce or invoices. The customer opens any DuitNow-enabled app (Maybank2u, CIMB Clicks, RHB Now, Hong Leong Connect, Touch 'n Go eWallet, Boost, GrabPay Malaysia — all fully interoperable through PayNet's switching infrastructure). The customer scans the QR code; merchant name, DuitNow proxy type, and amount (if embedded) are parsed from the EMV payload. Authentication is done through the banking app (PIN, password, or biometrics — no sensitive credentials stored in the QR). PayNet's national switching infrastructure settles the transaction instantly, 24/7 including weekends. Both parties receive instant confirmation notifications.",
      },
      {
        id: 'id-types',
        heading: 'DuitNow ID Types Explained',
        content:
          "DuitNow uses proxy identifiers — human-readable addresses that map to bank accounts in PayNet's registry. Instead of sharing your account number, you share your DuitNow proxy. Mobile Number (tag 01) uses the Malaysian format 60123456789 and is the most common for personal P2P payments. MyKad IC Number (tag 02) uses the YYMMDD-PB-###G format for Malaysian citizens and permanent residents. Passport Number (tag 03) is used by foreign nationals with Malaysian bank accounts. Business Registration / ROC / ROB (tag 04) is used by incorporated companies and registered businesses. Others (tag 05) covers government agencies and special-purpose entities. The proxy type is encoded in EMV tag ID 26 of the DuitNow QR payload.",
      },
      {
        id: 'payload-emv',
        heading: 'The DuitNow QR Payload – EMV Format',
        content:
          "A DuitNow QR code encodes a sequence of TLV (Tag-Length-Value) fields as a single ASCII string. The format follows the EMV Merchant Presented Mode (MPM) specification, with the DuitNow-specific Application Identifier (AID) A000000693010011 embedded in tag ID 26. Tag 26 is the critical DuitNow identifier: sub-tag 00 contains the AID, followed by the proxy type sub-tag (01 = mobile) and the normalized proxy value. Tag 63 contains the CRC16-CCITT checksum (4-digit hex). The transaction currency is Malaysian Ringgit (MYR, ISO 4217 code 458). Country code is MY (ISO 3166-1 alpha-2). Point of Initiation 11 = static, 12 = dynamic with preset amount.",
      },
      {
        id: 'phone-normalization',
        heading: 'Phone Number Normalization',
        content:
          "Malaysian mobile numbers must be normalized to the international format before being embedded in a DuitNow QR payload. The rule is straightforward: remove the leading zero and prepend country code 60. Input 0123456789 becomes 60123456789. Input +60123456789 becomes 60123456789 (remove the plus sign). Input 60123456789 stays 60123456789 (already normalized). MyKad IC numbers (12 digits) and business registration numbers are used as-is without transformation.",
      },
      {
        id: 'asean-network',
        heading: 'The ASEAN Network',
        content:
          "PayNet has established bilateral QR payment linkages with several ASEAN neighbors, enabling Malaysians to pay abroad and foreign visitors to pay at Malaysian merchants — all without cash or currency exchange. The infrastructure converts between currencies at the prevailing real-time exchange rate. The Malaysia-Singapore PayNow-DuitNow linkage (since 2021) is the most mature and heavily used corridor, reflecting the strong trade and tourism ties between both countries. Additional connections include Thailand (PromptPay, since 2022), Indonesia (QRIS, since 2022), and the Philippines (QR Ph, since 2023). Singapore residents can scan a DuitNow QR code in Malaysia using their PayNow app, paying in SGD while the merchant receives MYR — all settled in seconds.",
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks & E-Wallets',
        content:
          "All licensed Malaysian banks and major e-wallets participate in the DuitNow ecosystem. Every app is fully interoperable — a payment from Maybank2u arrives instantly in a Boost e-wallet, and vice versa. PayNet operates the central switching infrastructure that connects all participants. Major banks include Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, Affin Bank, Alliance Bank, Bank Islam, Bank Muamalat, and BSN. E-wallets include Touch 'n Go (Malaysia's most popular, 18M+ users), Boost, GrabPay, and ShopeePay MY.",
      },
      {
        id: 'duitnow-vs-ibg',
        heading: 'DuitNow vs. IBG – What Changed?',
        content:
          "Before DuitNow, Malaysian interbank transfers relied on IBG (Interbank GIRO) — a batch processing system that was slow, limited to business hours, and charged fees. DuitNow replaced IBG as the primary interbank transfer method, delivering a dramatically better user experience. IBG processed in batches (next business day); DuitNow settles in real time in seconds. IBG was only available during business hours; DuitNow runs 24/7/365. IBG charged RM 0.10–RM 2.00 per transaction; DuitNow is free up to RM 5,000. IBG required bank account number and routing code; DuitNow uses phone, IC, or business registration as proxy. The transition was phased in over several years, with IBG officially discontinued for most use cases by 2023.",
      },
    ],
  },
  de: {
    title: 'Wie DuitNow funktioniert – Vollständiger Guide zum malaysischen Zahlungssystem',
    description:
      'Alles über Malaysias Sofortzahlungssystem: DuitNow-ID-Typen, EMV QR-Format, Telefonnummer-Normalisierung, ASEAN-Netzwerk und unterstützte Banken.',
    sections: [
      {
        id: 'what-is-duitnow',
        heading: 'Was ist DuitNow?',
        content:
          'DuitNow ist Malaysias nationales Sofortzahlungssystem, entwickelt und betrieben von PayNet (Payments Network Malaysia) — einem Joint Venture, das Bank Negara Malaysia (BNM) und elf großen malaysischen Finanzinstituten gehört. 2018 eingeführt, ersetzte DuitNow das ältere, langsamere Interbank GIRO (IBG)-System und vereinte alle malaysischen Banken unter einer einzigen Echtzeit-Zahlungsinfrastruktur. Der Name „DuitNow" kombiniert das malaiische Wort für Geld (duit) mit „Now" — was das Kernversprechen sofortiger Überweisungen widerspiegelt. Anders als herkömmliche Banküberweisungen, die die Kenntnis der Kontonummer und Bankleitzahl des Empfängers erfordern, ermöglicht DuitNow Zahlungen mit einer einfachen Proxy-ID: einer Mobiltelefonnummer, MyKad-Ausweisnummer, Passnummer oder Unternehmensregistrierungsnummer. DuitNow hat sich zum Rückgrat des malaysischen digitalen Zahlungsverkehrs entwickelt. Stand 2025 verbindet es über 30 Millionen registrierte Nutzer bei allen lizenzierten malaysischen Banken und wichtigen E-Wallets. Zahlungen werden in Sekunden verarbeitet, rund um die Uhr, sieben Tage die Woche — einschließlich Feiertagen. DuitNow ist für persönliche Überweisungen bis zu RM 5.000 kostenlos. DuitNow QR — die QR-Code-Zahlungskomponente des DuitNow-Ökosystems — basiert auf dem EMV Merchant Presented Mode (MPM)-Standard, derselben technischen Grundlage wie QRIS (Indonesien), PromptPay (Thailand) und PayNow (Singapur). Der DuitNow QR Application Identifier (AID) lautet A000000693010011, eingebettet in EMV-Tag ID 26 jedes DuitNow QR-Codes.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie DuitNow funktioniert – Schritt für Schritt',
        content:
          'Der Händler zeigt seinen DuitNow QR-Code — statische Codes werden gedruckt und an der Kasse für Zahlungen ohne voreingestellten Betrag angezeigt, dynamische Codes mit einem voreingestellten Betrag werden pro Transaktion für E-Commerce oder Rechnungen generiert. Der Kunde öffnet eine beliebige DuitNow-fähige App (Maybank2u, CIMB Clicks, RHB Now, Hong Leong Connect, Touch \'n Go eWallet, Boost, GrabPay Malaysia — alle vollständig interoperabel über PayNets Switching-Infrastruktur). Der Kunde scannt den QR-Code; Händlername, DuitNow-Proxy-Typ und Betrag (falls eingebettet) werden aus dem EMV-Payload ausgelesen. Die Authentifizierung erfolgt über die Banking-App (PIN, Passwort oder Biometrie — keine sensiblen Zugangsdaten im QR). PayNets nationale Switching-Infrastruktur wickelt die Transaktion sofort ab, 24/7 einschließlich Wochenenden. Beide Parteien erhalten sofortige Bestätigungsbenachrichtigungen.',
      },
      {
        id: 'id-types',
        heading: 'DuitNow-ID-Typen erklärt',
        content:
          'DuitNow verwendet Proxy-IDs — menschenlesbare Adressen, die in PayNets Register auf Bankkonten verweisen. Anstatt Ihre Kontonummer zu teilen, teilen Sie Ihren DuitNow-Proxy. Mobiltelefonnummer (Tag 01) verwendet das malaysische Format 60123456789 und ist die häufigste Option für persönliche P2P-Zahlungen. MyKad-Ausweisnummer (Tag 02) verwendet das Format TTMMJJ-BL-###G für malaysische Staatsbürger und Daueraufenthaltsberechtigte. Passnummer (Tag 03) wird von ausländischen Staatsangehörigen mit malaysischen Bankkonten verwendet. Unternehmensregistrierung / ROC / ROB (Tag 04) wird von eingetragenen Unternehmen und registrierten Geschäftsbetrieben verwendet. Sonstige (Tag 05) umfassen Behörden und Einrichtungen mit besonderem Zweck. Der Proxy-Typ ist in EMV-Tag ID 26 des DuitNow QR-Payloads kodiert.',
      },
      {
        id: 'payload-emv',
        heading: 'Der DuitNow QR Payload – EMV-Format',
        content:
          'Ein DuitNow QR-Code kodiert eine Folge von TLV (Tag-Länge-Wert)-Feldern als einzelne ASCII-Zeichenkette. Das Format folgt der EMV Merchant Presented Mode (MPM)-Spezifikation, mit dem DuitNow-spezifischen Application Identifier (AID) A000000693010011, eingebettet in Tag ID 26. Tag 26 ist der kritische DuitNow-Identifier: Sub-Tag 00 enthält die AID, gefolgt vom Proxy-Typ-Sub-Tag (01 = Mobil) und dem normalisierten Proxy-Wert. Tag 63 enthält die CRC16-CCITT-Prüfsumme (4-stelliges Hex). Die Transaktionswährung ist Malaysischer Ringgit (MYR, ISO 4217 Code 458). Der Ländercode ist MY (ISO 3166-1 alpha-2). Point of Initiation 11 = statisch, 12 = dynamisch mit voreingestelltem Betrag.',
      },
      {
        id: 'phone-normalization',
        heading: 'Telefonnummer-Normalisierung',
        content:
          'Malaysische Mobiltelefonnummern müssen vor der Einbettung in einen DuitNow QR-Payload in das internationale Format normalisiert werden. Die Regel ist unkompliziert: Führende Null entfernen und Ländervorwahl 60 voranstellen. Die Eingabe 0123456789 wird zu 60123456789. Die Eingabe +60123456789 wird zu 60123456789 (Plus-Zeichen entfernen). Die Eingabe 60123456789 bleibt 60123456789 (bereits normalisiert). MyKad-Ausweisnummern (12 Stellen) und Unternehmensregistrierungsnummern werden unverändert ohne Transformation verwendet.',
      },
      {
        id: 'asean-network',
        heading: 'Das ASEAN-Netzwerk',
        content:
          'PayNet hat bilaterale QR-Zahlungsverbindungen mit mehreren ASEAN-Nachbarn aufgebaut, die es Malaysianern ermöglichen, im Ausland zu bezahlen, und ausländischen Besuchern, bei malaysischen Händlern zu zahlen — alles ohne Bargeld oder Währungsumtausch. Die Infrastruktur rechnet zwischen Währungen zum jeweils aktuellen Echtzeit-Wechselkurs um. Die Malaysia-Singapur PayNow-DuitNow-Verbindung (seit 2021) ist der ausgereifteste und am häufigsten genutzte Korridor, der die starken Handels- und Tourismusbeziehungen beider Länder widerspiegelt. Weitere Verbindungen umfassen Thailand (PromptPay, seit 2022), Indonesien (QRIS, seit 2022) und die Philippinen (QR Ph, seit 2023). Singapurische Einwohner können einen DuitNow QR-Code in Malaysia mit ihrer PayNow-App scannen, in SGD zahlen, während der Händler MYR erhält — alles in Sekunden abgewickelt.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken & E-Wallets',
        content:
          'Alle lizenzierten malaysischen Banken und wichtigen E-Wallets nehmen am DuitNow-Ökosystem teil. Jede App ist vollständig interoperabel — eine Zahlung von Maybank2u kommt sofort in einem Boost-E-Wallet an, und umgekehrt. PayNet betreibt die zentrale Switching-Infrastruktur, die alle Teilnehmer verbindet. Zu den wichtigsten Banken zählen Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, Affin Bank, Alliance Bank, Bank Islam, Bank Muamalat und BSN. E-Wallets umfassen Touch \'n Go (Malaysias beliebtestes, 18M+ Nutzer), Boost, GrabPay und ShopeePay MY.',
      },
      {
        id: 'duitnow-vs-ibg',
        heading: 'DuitNow vs. IBG – Was hat sich verändert?',
        content:
          'Vor DuitNow stützten sich malaysische Interbanküberweisungen auf IBG (Interbank GIRO) — ein Batch-Verarbeitungssystem, das langsam, auf Geschäftszeiten beschränkt und kostenpflichtig war. DuitNow ersetzte IBG als primäre Interbank-Überweisungsmethode und lieferte ein erheblich besseres Nutzererlebnis. IBG verarbeitete in Batches (nächster Werktag); DuitNow wickelt in Echtzeit in Sekunden ab. IBG war nur während der Geschäftszeiten verfügbar; DuitNow läuft 24/7/365. IBG berechnete RM 0,10–RM 2,00 pro Transaktion; DuitNow ist bis zu RM 5.000 kostenlos. IBG benötigte Bankkontonummer und Bankleitzahl; DuitNow verwendet Telefon, Ausweis oder Unternehmensregistrierung als Proxy. Die Umstellung erfolgte schrittweise über mehrere Jahre, wobei IBG bis 2023 für die meisten Anwendungsfälle offiziell eingestellt wurde.',
      },
    ],
  },
}
