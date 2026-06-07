import type { LocalizedContent, GuideContent } from '../types'

export const promptpayGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: 'How PromptPay Works – Complete Guide to Thai Payments',
    description:
      "Everything about Thailand's instant payment system: PromptPay keys, EMV QR payload, phone normalization, ASEAN cross-border network and supported banks.",
    sections: [
      {
        id: 'what-is-promptpay',
        heading: 'What is PromptPay?',
        content:
          "PromptPay (พร้อมเพย์) is Thailand's national instant payment system, jointly developed by the Bank of Thailand (BOT) and the Thai Bankers' Association (TBA). Launched in January 2017 as part of the government's National e-Payment Master Plan, PromptPay changed how Thais send and receive money — replacing slow inter-bank transfers with a system that settles in under five seconds, around the clock, every day of the year. The core innovation is the PromptPay ID — an alias linked to a bank account. Instead of sharing a bank account number and branch code, a recipient registers their Thai mobile phone number (starting with 06, 08 or 09) or their 13-digit National ID. Businesses register using a Tax ID. The ITMX switching network routes the payment to the correct bank account automatically. All Thai banks are required by the Bank of Thailand to participate; PromptPay is free for consumers.",
      },
      {
        id: 'how-it-works',
        heading: 'How PromptPay Works – Step by Step',
        content:
          'The recipient shares their phone number, National ID or a PromptPay QR code. The payer opens any Thai banking app (all 30+ participating banks are fully interoperable), scans the QR or enters the PromptPay key, confirms the recipient name displayed on screen, authenticates with biometric or PIN inside the app, and the transfer completes within five seconds. Both parties receive instant push notifications.',
      },
      {
        id: 'keys',
        heading: 'PromptPay Keys – Phone vs National ID',
        content:
          "A PromptPay key is an alias registered in the ITMX NPCI (National Payment Central Infrastructure) directory that maps to a specific bank account. Individuals typically use their phone number (easiest to share) or National ID (most stable). Companies use their Tax ID. E-wallet accounts use an E-Wallet ID format. Each key type has different formatting rules — phone numbers are normalized to the 0066XXXXXXXXX format in the QR payload.",
      },
      {
        id: 'payload-emv',
        heading: 'The PromptPay QR Payload – EMV Format',
        content:
          "PromptPay QR codes follow the EMV Merchant Presented QR Code (MPM) specification — the same international standard used by Brazil's PIX and India's BharatQR. Thailand's version uses merchant account tag 29 (vs. tag 26 for PIX) and the PromptPay AID A000000677010111. The payload is a continuous TLV (Tag-Length-Value) string. A CRC16-CCITT checksum at the end (tag 63) guarantees data integrity.",
      },
      {
        id: 'phone-normalization',
        heading: 'Phone Number Normalization',
        content:
          'PromptPay QR codes do not embed the raw Thai phone number — they use a normalized international format. The rule: start with a local Thai number (e.g. 0812345678), remove the leading 0, then prepend the country code prefix 0066. Result: 0066812345678. If the input already starts with +66, replace the + with 00. National IDs and Tax IDs (13 digits) are used as-is without transformation.',
      },
      {
        id: 'asean-network',
        heading: "PromptPay's ASEAN Cross-Border Network",
        content:
          'PromptPay is no longer purely domestic. Thailand has established bilateral QR payment linkages with seven countries — Singapore (PayNow), Malaysia (DuitNow), Indonesia (QRIS), Vietnam (VietQR), Cambodia (Bakong), Japan (JCB QR) and China (WeChat/Alipay). These linkages allow citizens to send and receive money across borders by scanning a local QR code, with automatic currency conversion at interbank rates and no international wire transfer fees. The framework is championed by the BIS and ASEAN central banks as a model for regional payment interoperability.',
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks',
        content:
          'All Thai banks authorized by the Bank of Thailand are required to offer PromptPay. This includes every commercial bank, savings bank and specialized financial institution with significant retail operations. Full interoperability is guaranteed by the ITMX network — a payment sent from any participating bank app arrives in any other participating bank account within seconds. There is no need for both parties to use the same bank or app.',
      },
      {
        id: 'impact',
        heading: "PromptPay's Impact on Thailand",
        content:
          "PromptPay has transformed Thailand's payment landscape: 55M+ registered users, ~1 billion transactions per month, 30+ participating banks, and connections to 7 ASEAN countries. The Bank of Thailand eliminated all interbank transfer fees for PromptPay in 2019. During the COVID-19 pandemic, the Thai government distributed welfare payments directly via National ID-linked PromptPay accounts. Thailand jumped from primarily cash-based to one of the most digitally-transacting populations in Southeast Asia, driven almost entirely by PromptPay adoption.",
      },
    ],
  },
  de: {
    title: 'Wie PromptPay funktioniert – Vollständiger Guide zum thailändischen Zahlungssystem',
    description:
      'Alles über Thailands Sofortzahlungssystem: PromptPay-Schlüssel, EMV QR-Payload, Telefonnummer-Normalisierung, ASEAN-Netzwerk und unterstützte Banken.',
    sections: [
      {
        id: 'what-is-promptpay',
        heading: 'Was ist PromptPay?',
        content:
          'PromptPay (พร้อมเพย์) ist Thailands nationales Sofortzahlungssystem, das gemeinsam von der Bank of Thailand (BOT) und der Thai Bankers\' Association (TBA) entwickelt wurde. Im Januar 2017 als Teil des staatlichen National e-Payment Master Plan gestartet, veränderte PromptPay die Art, wie Thais Geld senden und empfangen – langsame Interbanküberweisungen wurden durch ein System ersetzt, das in unter fünf Sekunden abrechnet, rund um die Uhr und an jedem Tag des Jahres. Die Kerninnovation ist die PromptPay-ID – ein Alias, der mit einem Bankkonto verknüpft ist. Anstatt eine Kontonummer und Bankleitzahl weiterzugeben, registriert der Empfänger seine thailändische Mobiltelefonnummer (beginnend mit 06, 08 oder 09) oder seine 13-stellige nationale Ausweisnummer. Unternehmen registrieren sich mit einer Steuernummer. Das ITMX-Switching-Netzwerk leitet die Zahlung automatisch an das korrekte Bankkonto weiter. Alle thailändischen Banken sind von der Bank of Thailand zur Teilnahme verpflichtet; PromptPay ist für Verbraucher kostenlos.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie PromptPay funktioniert – Schritt für Schritt',
        content:
          'Der Empfänger teilt seine Telefonnummer, nationale Ausweisnummer oder einen PromptPay QR-Code. Der Zahlende öffnet eine beliebige thailändische Banking-App (alle 30+ teilnehmenden Banken sind vollständig interoperabel), scannt den QR oder gibt den PromptPay-Schlüssel ein, bestätigt den angezeigten Empfängernamen, authentifiziert sich per Biometrie oder PIN in der App, und die Überweisung wird innerhalb von fünf Sekunden abgeschlossen. Beide Parteien erhalten sofortige Push-Benachrichtigungen.',
      },
      {
        id: 'keys',
        heading: 'PromptPay-Schlüssel: Telefon vs. Personalausweis',
        content:
          'Ein PromptPay-Schlüssel ist ein Alias, der im ITMX NPCI-Verzeichnis (National Payment Central Infrastructure) registriert ist und auf ein bestimmtes Bankkonto verweist. Privatpersonen verwenden typischerweise ihre Telefonnummer (am einfachsten weiterzugeben) oder nationale Ausweisnummer (stabilste Option). Unternehmen verwenden ihre Steuernummer. E-Wallet-Konten verwenden ein E-Wallet-ID-Format. Jeder Schlüsseltyp hat unterschiedliche Formatierungsregeln – Telefonnummern werden im QR-Payload in das Format 0066XXXXXXXXX normalisiert.',
      },
      {
        id: 'payload-emv',
        heading: 'Der PromptPay QR Payload – EMV-Format',
        content:
          'PromptPay QR-Codes folgen der EMV Merchant Presented QR Code (MPM)-Spezifikation – demselben internationalen Standard, der von Brasiliens PIX und Indiens BharatQR verwendet wird. Thailands Version verwendet den Händlerkonto-Tag 29 (im Vergleich zu Tag 26 bei PIX) und die PromptPay AID A000000677010111. Der Payload ist eine zusammenhängende TLV-Zeichenkette (Tag-Länge-Wert). Eine CRC16-CCITT-Prüfsumme am Ende (Tag 63) garantiert die Datenintegrität.',
      },
      {
        id: 'phone-normalization',
        heading: 'Telefonnummer-Normalisierung',
        content:
          'PromptPay QR-Codes speichern nicht die rohe thailändische Telefonnummer – sie verwenden ein normalisiertes internationales Format. Die Regel: Beginnen Sie mit einer lokalen thailändischen Nummer (z. B. 0812345678), entfernen Sie die führende 0, dann stellen Sie den Ländervorwahl-Präfix 0066 voran. Ergebnis: 0066812345678. Beginnt die Eingabe bereits mit +66, ersetzen Sie das + durch 00. Nationale Ausweisnummern und Steuernummern (13 Stellen) werden unverändert ohne Transformation verwendet.',
      },
      {
        id: 'asean-network',
        heading: 'Das ASEAN-Zahlungsnetzwerk',
        content:
          'PromptPay ist nicht mehr rein inländisch. Thailand hat bilaterale QR-Zahlungsverbindungen mit sieben Ländern aufgebaut – Singapur (PayNow), Malaysia (DuitNow), Indonesien (QRIS), Vietnam (VietQR), Kambodscha (Bakong), Japan (JCB QR) und China (WeChat/Alipay). Diese Verbindungen ermöglichen es Bürgern, grenzüberschreitend Geld zu senden und zu empfangen, indem sie einen lokalen QR-Code scannen – mit automatischer Währungsumrechnung zu Interbankenkursen und ohne Auslandsüberweisungsgebühren. Das Rahmenwerk wird von der BIS und den ASEAN-Zentralbanken als Modell für regionale Zahlungsinteroperabilität gefördert.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken',
        content:
          'Alle von der Bank of Thailand zugelassenen thailändischen Banken sind verpflichtet, PromptPay anzubieten. Dazu gehören alle Geschäftsbanken, Sparkassen und spezialisierten Finanzinstitute mit bedeutenden Privatkundengeschäften. Volle Interoperabilität wird durch das ITMX-Netzwerk gewährleistet – eine Zahlung, die von einer beliebigen teilnehmenden Banking-App gesendet wird, kommt innerhalb von Sekunden auf einem anderen teilnehmenden Bankkonto an. Es ist nicht notwendig, dass beide Parteien dieselbe Bank oder App nutzen.',
      },
      {
        id: 'impact',
        heading: "PromptPays Bedeutung für Thailand",
        content:
          'PromptPay hat Thailands Zahlungslandschaft transformiert: 55 Millionen+ registrierte Nutzer, rund 1 Milliarde Transaktionen pro Monat, 30+ teilnehmende Banken und Verbindungen zu 7 ASEAN-Ländern. Die Bank of Thailand hat 2019 alle Interbanküberweisungsgebühren für PromptPay abgeschafft. Während der COVID-19-Pandemie verteilte die thailändische Regierung Sozialleistungen direkt über mit nationaler Ausweis-ID verknüpfte PromptPay-Konten. Thailand entwickelte sich von einem überwiegend bargeldbasierten Land zu einer der digital aktivsten Bevölkerungen in Südostasien – fast ausschließlich durch die PromptPay-Adoption.',
      },
    ],
  },
}
