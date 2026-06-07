import type { LocalizedContent, GuideContent } from '../types'

export const qrPhGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'How QR Ph Works – Complete Guide to Philippines Payment Standard',
    description:
      "Everything about the Philippines' national QR payment standard by BSP: proxy types, InstaPay network, GCash, Maya, EMV payload and financial inclusion.",
    sections: [
      {
        id: 'what-is-qrph',
        heading: 'What is QR Ph?',
        content:
          "QR Ph is the Philippines' national QR code standard for financial transactions, developed and mandated by the Bangko Sentral ng Pilipinas (BSP) — the country's central bank. Launched in 2021–2022 as part of the Digital Payments Transformation Roadmap (2020–2023), QR Ph unified a fragmented payments landscape where each bank and e-wallet operated its own proprietary QR format. Under QR Ph, any consumer with a mobile banking or e-wallet app can scan a single QR code and pay instantly, regardless of which institution issued their account. The standard is built on the EMV QR Code Merchant Presented Mode (MPM) specification and uses the BSP Application ID PH.INSTAPAY.ME in EMV tag 26 for real-time interbank settlement via InstaPay. QR Ph supports three proxy types: mobile number (MSISDN), bank account number (ACCT), and email address (EMAIL).",
      },
      {
        id: 'how-it-works',
        heading: 'How QR Ph Works – Step by Step',
        content:
          'The payee generates a QR Ph code by selecting proxy type (mobile/account/email), entering the proxy value, payee name, and optionally an amount and purpose. The QR encodes these as an EMV payload with the PH.INSTAPAY.ME AID. The payer opens any QR Ph-enabled app (GCash, Maya, BDO, BPI, Metrobank, Landbank, UnionBank or any other BSP-supervised institution — full interoperability across the InstaPay network). The app reads the EMV payload and extracts the proxy type and value. Payment details are pre-filled for review. The payer authenticates using PIN, fingerprint, or face ID. The transaction is processed through BancNet\'s InstaPay network in real time — funds arrive within seconds, 24/7/365. Both payer and payee receive instant transaction notifications. The ₱50,000 per-transaction limit applies; larger amounts require PESONet.',
      },
      {
        id: 'proxy-types',
        heading: 'Proxy Types: Mobile, Account, Email',
        content:
          "A proxy is an alias that represents a bank account or e-wallet in the QR Ph system. Instead of sharing a full account number and bank details, the payee registers a proxy — typically their mobile number — that the BSP registry maps to their financial account. Philippine mobile number normalisation: Philippine mobile numbers (11 digits starting with 09) must be normalized to international format for QR Ph. Replace the leading 0 with +63. Example: 09171234567 → +639171234567. Proxy types: MSISDN (Mobile) — used by GCash, Maya, all mobile-linked accounts. ACCT (Account) — used by BDO, BPI, Metrobank, Landbank, UnionBank. EMAIL — used by banks supporting email-as-proxy registration.",
      },
      {
        id: 'payload-emv',
        heading: 'The QR Ph EMV Payload',
        content:
          'QR Ph is based on the EMV QR Code Merchant Presented Mode specification. The BSP Application ID PH.INSTAPAY.ME is stored in tag 26 › tag 00. The proxy type and value follow in tag 01 and tag 02 respectively. All payloads end with a CRC16-CCITT checksum in tag 63. Tag 53 contains 608 (PHP currency code). Amounts include 2 decimal places. Tag 58 is PH (country code). Tag 59 is the payee name (max 25 chars). Tag 60 is the city. The additional data field (tag 62) may include a purpose description of up to 35 characters. Point of Initiation 11 = static, 12 = dynamic.',
      },
      {
        id: 'gcash-maya',
        heading: 'GCash & Maya – The Dominant Apps',
        content:
          "The Philippine digital payment ecosystem is dominated by two super-apps: GCash (by Globe Telecom) and Maya (formerly PayMaya, by PLDT). GCash has over 94 million registered users — roughly 85% of the Philippine adult population. A GCash account is linked to a mobile number (MSISDN proxy) and can scan any QR Ph code. GCash-to-GCash transfers are instant and free within the GCash network; transfers to other banks use the QR Ph / InstaPay rail. Maya (formerly PayMaya) has 50+ million users and offers a broader financial services suite including virtual and physical Visa/Mastercard debit cards, savings accounts (Maya Bank), and crypto features. Important distinction: 'GCash QR' within the GCash app works for GCash-to-GCash merchant payments. QR Ph is the interoperable standard that works across all banks and e-wallets.",
      },
      {
        id: 'instapay-vs-pesonet',
        heading: 'InstaPay vs PESONet',
        content:
          'The Philippines operates two electronic fund transfer systems supervised by BSP. QR Ph uses InstaPay for real-time transfers. For larger amounts or batch processing, PESONet is the alternative. InstaPay (QR Ph): transfer speed real-time (seconds), max ₱50,000 per transaction, available 24/7/365, used for QR Ph and small transfers, gross real-time settlement, operated by BancNet. PESONet: same-day batch settlement (1–3 hours), higher amounts with no fixed cap, available on business days with cutoff times, used for payroll and large B2B transfers, net batch settlement, also operated by BancNet.',
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks & Wallets',
        content:
          'All BSP-supervised financial institutions are required to support QR Ph. This includes commercial banks, rural banks, thrift banks, cooperative banks, and e-money issuers (EMIs). As of 2025, this covers hundreds of institutions across the Philippines. Major participants: GCash (94M+ users, e-wallet), Maya/PayMaya (50M+ users, e-wallet), BDO Unibank (14M+ users, bank), BPI Mobile (8M+ users, bank), UnionBank (5M+ users, bank), Metrobank (4M+ users, bank), Landbank (3M+ users, bank), RCBC DiskarTech (3M+ users, app/bank).',
      },
      {
        id: 'financial-inclusion',
        heading: 'Financial Inclusion in the Philippines',
        content:
          "The Philippines has one of the largest unbanked populations in Southeast Asia — historically, over 70% of adults lacked a formal bank account. QR Ph and the broader digital payments ecosystem are central to BSP's strategy to change this. BSP's Digital Payments Transformation Roadmap targets 50% of retail payment transactions to be digital by 2023 and 70% of Filipino adults to have transaction accounts. The combination of smartphone penetration (among the highest in Southeast Asia), GCash's near-universal adoption, and mandatory BSP compliance for all financial institutions has driven rapid progress. Sari-sari (convenience) stores, market vendors, and jeepney (public transport) operators across the archipelago now display QR Ph codes. QR Ph also supports the overseas Filipino worker (OFW) remittance corridor — the Philippines receives approximately $37B annually in remittances.",
      },
    ],
  },
  de: {
    title: 'Wie QR Ph funktioniert – Vollständiger Guide zum philippinischen Zahlungsstandard',
    description:
      "Alles über den nationalen QR-Zahlungsstandard der Philippinen von BSP: Proxy-Typen, InstaPay-Netzwerk, GCash, Maya, EMV-Payload und finanzielle Inklusion.",
    sections: [
      {
        id: 'what-is-qrph',
        heading: 'Was ist QR Ph?',
        content:
          'QR Ph ist der nationale QR-Code-Standard der Philippinen für Finanztransaktionen, entwickelt und vorgeschrieben von der Bangko Sentral ng Pilipinas (BSP) – der Zentralbank des Landes. Gestartet 2021–2022 als Teil des Digital Payments Transformation Roadmap (2020–2023), vereinheitlichte QR Ph eine fragmentierte Zahlungslandschaft, in der jede Bank und E-Wallet ein eigenes proprietäres QR-Format betrieb. Mit QR Ph kann jeder Verbraucher mit einer mobilen Banking- oder E-Wallet-App einen einzigen QR-Code scannen und sofort bezahlen, unabhängig davon, welches Institut sein Konto ausgestellt hat. Der Standard basiert auf der EMV QR Code Merchant Presented Mode (MPM)-Spezifikation und verwendet die BSP-Anwendungs-ID PH.INSTAPAY.ME in EMV-Tag 26 für die Echtzeit-Interbanken-Abwicklung über InstaPay. QR Ph unterstützt drei Proxy-Typen: Mobiltelefonnummer (MSISDN), Bankkontonummer (ACCT) und E-Mail-Adresse (EMAIL).',
      },
      {
        id: 'how-it-works',
        heading: 'Wie QR Ph funktioniert – Schritt für Schritt',
        content:
          'Der Zahlungsempfänger generiert einen QR Ph-Code durch Auswahl des Proxy-Typs (Mobil/Konto/E-Mail), Eingabe des Proxy-Wertes, des Empfängernamens und optional eines Betrags und Verwendungszwecks. Der Zahler öffnet eine beliebige QR Ph-fähige App (GCash, Maya, BDO, BPI, Metrobank, Landbank, UnionBank oder ein anderes BSP-beaufsichtigtes Institut – vollständige Interoperabilität im InstaPay-Netzwerk). Die App liest den EMV-Payload und extrahiert Proxy-Typ und -Wert. Zahlungsdetails werden zur Überprüfung vorab ausgefüllt. Der Zahler authentifiziert sich per PIN, Fingerabdruck oder Gesichtserkennung. Die Transaktion wird in Echtzeit über BancNets InstaPay-Netzwerk verarbeitet – Gelder kommen innerhalb von Sekunden an, 24/7/365. Beide Parteien erhalten sofortige Transaktionsbenachrichtigungen. Das Limit von ₱50.000 pro Transaktion gilt; größere Beträge erfordern PESONet.',
      },
      {
        id: 'proxy-types',
        heading: 'Proxy-Typen: Mobil, Konto, E-Mail',
        content:
          'Ein Proxy ist ein Alias, der ein Bankkonto oder eine E-Wallet im QR Ph-System repräsentiert. Anstatt vollständige Kontonummer und Bankdetails zu teilen, registriert der Empfänger einen Proxy – typischerweise seine Mobiltelefonnummer –, den das BSP-Register auf sein Finanzkonto abbildet. Philippinische Mobiltelefonnummer-Normalisierung: Philippinische Mobiltelefonnummern (11 Stellen, beginnend mit 09) müssen für QR Ph in das internationale Format normalisiert werden. Die führende 0 wird durch +63 ersetzt. Beispiel: 09171234567 → +639171234567. Proxy-Typen: MSISDN (Mobil) – verwendet von GCash, Maya und allen mobilverknüpften Konten. ACCT (Konto) – verwendet von BDO, BPI, Metrobank, Landbank, UnionBank. EMAIL – verwendet von Banken, die E-Mail-als-Proxy-Registrierung unterstützen.',
      },
      {
        id: 'payload-emv',
        heading: 'Der QR Ph EMV-Payload',
        content:
          'QR Ph basiert auf der EMV QR Code Merchant Presented Mode-Spezifikation. Die BSP-Anwendungs-ID PH.INSTAPAY.ME wird in Tag 26 › Tag 00 gespeichert. Proxy-Typ und -Wert folgen in Tag 01 bzw. Tag 02. Alle Payloads enden mit einer CRC16-CCITT-Prüfsumme in Tag 63. Tag 53 enthält 608 (PHP-Währungscode). Beträge enthalten 2 Dezimalstellen. Tag 58 ist PH (Ländercode). Tag 59 ist der Empfängername (max. 25 Zeichen). Tag 60 ist die Stadt. Das zusätzliche Datenfeld (Tag 62) kann eine Zweckbeschreibung von bis zu 35 Zeichen enthalten. Point of Initiation 11 = statisch, 12 = dynamisch.',
      },
      {
        id: 'gcash-maya',
        heading: 'GCash & Maya – Die dominierenden Apps',
        content:
          'Das philippinische digitale Zahlungsökosystem wird von zwei Super-Apps dominiert: GCash (von Globe Telecom) und Maya (früher PayMaya, von PLDT). GCash hat über 94 Millionen registrierte Nutzer – etwa 85% der philippinischen erwachsenen Bevölkerung. Ein GCash-Konto ist mit einer Mobiltelefonnummer (MSISDN-Proxy) verknüpft und kann jeden QR Ph-Code scannen. GCash-zu-GCash-Überweisungen sind sofort und kostenlos innerhalb des GCash-Netzwerks; Überweisungen an andere Banken nutzen die QR Ph/InstaPay-Infrastruktur. Maya (früher PayMaya) hat über 50 Millionen Nutzer und bietet ein breiteres Finanzdienstleistungsangebot, darunter virtuelle und physische Visa/Mastercard-Debitkarten, Sparkonten (Maya Bank) und Krypto-Funktionen. Wichtiger Unterschied: "GCash QR" innerhalb der GCash-App funktioniert für GCash-zu-GCash-Händlerzahlungen. QR Ph ist der interoperable Standard, der über alle Banken und E-Wallets hinweg funktioniert.',
      },
      {
        id: 'instapay-vs-pesonet',
        heading: 'InstaPay vs. PESONet',
        content:
          'Die Philippinen betreiben zwei elektronische Geldtransfersysteme unter BSP-Aufsicht. QR Ph nutzt InstaPay für Echtzeit-Überweisungen. Für größere Beträge oder Stapelverarbeitung ist PESONet die Alternative. InstaPay (QR Ph): Echtzeit-Überweisung (Sekunden), max. ₱50.000 pro Transaktion, 24/7/365 verfügbar, für QR Ph und kleine Überweisungen, Brutto-Echtzeit-Abwicklung, betrieben von BancNet. PESONet: Gleichtages-Stapelabwicklung (1–3 Stunden), höhere Beträge ohne festes Limit, an Werktagen mit Einsendeschluss verfügbar, für Gehaltsabrechnungen und große B2B-Überweisungen, Netto-Stapelabwicklung, ebenfalls von BancNet betrieben.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken & Wallets',
        content:
          'Alle von BSP beaufsichtigten Finanzinstitute sind verpflichtet, QR Ph zu unterstützen. Dazu gehören Geschäftsbanken, Landbanken, Sparbanken, Genossenschaftsbanken und E-Geld-Emittenten (EMIs). Stand 2025 umfasst dies Hunderte von Instituten auf den Philippinen. Wichtige Teilnehmer: GCash (94M+ Nutzer, E-Wallet), Maya/PayMaya (50M+ Nutzer, E-Wallet), BDO Unibank (14M+ Nutzer, Bank), BPI Mobile (8M+ Nutzer, Bank), UnionBank (5M+ Nutzer, Bank), Metrobank (4M+ Nutzer, Bank), Landbank (3M+ Nutzer, Bank), RCBC DiskarTech (3M+ Nutzer, App/Bank).',
      },
      {
        id: 'financial-inclusion',
        heading: 'Finanzielle Inklusion auf den Philippinen',
        content:
          'Die Philippinen haben eine der größten unbankierten Bevölkerungsgruppen in Südostasien – historisch gesehen hatten über 70% der Erwachsenen kein formelles Bankkonto. QR Ph und das breitere digitale Zahlungsökosystem sind zentral für BSPs Strategie, dies zu ändern. BSPs Digital Payments Transformation Roadmap zielt darauf ab, dass 50% der Einzelhandels-Zahlungstransaktionen bis 2023 digital sind und 70% der philippinischen Erwachsenen Transaktionskonten haben. Die Kombination aus Smartphone-Verbreitung (eine der höchsten in Südostasien), GCashs nahezu universeller Adoption und obligatorischer BSP-Compliance für alle Finanzinstitute hat rasante Fortschritte vorangetrieben. Sari-sari-Läden (Tante-Emma-Läden), Marktverkäufer und Jeepney-Betreiber im gesamten Archipel zeigen jetzt QR Ph-Codes. QR Ph unterstützt auch den Überweisungskorridor für Auslandsphilippiner (OFW) – die Philippinen erhalten jährlich etwa 37 Milliarden USD an Überweisungen.',
      },
    ],
  },
}
