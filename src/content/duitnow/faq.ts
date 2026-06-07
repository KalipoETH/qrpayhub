import type { LocalizedContent, FAQContent } from '../types'

export const duitnowFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'DuitNow FAQ',
    description:
      '25 questions answered — from DuitNow ID types and transaction limits to ASEAN cross-border payments and the EMV QR code format.',
    items: [
      {
        question: 'What is DuitNow?',
        answer:
          "DuitNow is Malaysia's national instant payment system, launched in 2018 by PayNet (Payments Network Malaysia). It allows instant bank transfers using a proxy identifier (phone number, IC number, or business registration) instead of a bank account number, available 24/7.",
      },
      {
        question: 'Who developed DuitNow?',
        answer:
          "DuitNow was developed by PayNet (Payments Network Malaysia), a joint initiative of Bank Negara Malaysia (BNM) and 11 major Malaysian banks. PayNet operates Malaysia's core financial market infrastructure.",
      },
      {
        question: 'What types of DuitNow IDs exist?',
        answer:
          'There are five DuitNow proxy types: mobile number (Malaysian format 01X-XXXXXXXX), MyKad IC number (12-digit Malaysian ID), passport number (for non-citizens), business registration number (ROC/ROB), and "Others" for special identifiers.',
      },
      {
        question: 'Which banks support DuitNow?',
        answer:
          "All major Malaysian banks support DuitNow: Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, Affin Bank, Alliance Bank, Bank Islam, Bank Muamalat, BSN, and all other licensed Malaysian banks. E-wallets including Touch 'n Go, Boost, and GrabPay also support DuitNow.",
      },
      {
        question: 'Is DuitNow free to use?',
        answer:
          'Yes, DuitNow transfers are free for individuals for amounts up to RM 5,000 per transaction. Some banks may charge a small fee for business accounts or amounts above the threshold.',
      },
      {
        question: 'What is the DuitNow transaction limit?',
        answer:
          'The standard DuitNow limit is RM 50,000 per transaction for regular users. Business accounts may have higher limits depending on the bank.',
      },
      {
        question: 'What is the difference between DuitNow and DuitNow QR?',
        answer:
          'DuitNow is the transfer service (proxy-based transfers). DuitNow QR is the QR code payment standard for merchant payments, based on the EMV QR standard. Both are part of the DuitNow ecosystem operated by PayNet.',
      },
      {
        question: 'What is a MyKad IC number?',
        answer:
          "MyKad is Malaysia's national identity card. The IC number is a 12-digit number in the format YYMMDD-PB-###G, where YY=birth year, MM=month, DD=day, PB=state and country code, ###=sequence, G=gender. It can be used as a DuitNow proxy.",
      },
      {
        question: 'Can foreigners use DuitNow in Malaysia?',
        answer:
          'Foreign nationals with Malaysian bank accounts can register DuitNow with their passport number. Tourists from Singapore can pay at DuitNow QR merchants through the PayNow-DuitNow linkage.',
      },
      {
        question: 'What is the DuitNow cross-border connection?',
        answer:
          'Malaysia has bilateral QR payment linkages with Singapore (PayNow), Thailand (PromptPay), Indonesia (QRIS), and Philippines (QR Ph) through ASEAN-wide QR interoperability initiatives.',
      },
      {
        question: 'What is the AID for DuitNow QR?',
        answer:
          'The DuitNow QR AID (Application Identifier) is "A000000693010011", placed in EMV tag ID 26 of the QR payload. This uniquely identifies the code as a DuitNow payment.',
      },
      {
        question: 'How do I register for DuitNow?',
        answer:
          "Register through your Malaysian bank's mobile app or internet banking portal. Link your phone number or IC number to your bank account. Most Malaysian banks support DuitNow registration in under 2 minutes.",
      },
      {
        question: "What is Touch 'n Go eWallet's role in DuitNow?",
        answer:
          "Touch 'n Go (TnG) eWallet supports DuitNow QR for merchant payments. Users can scan DuitNow QR codes with the TnG app. TnG is Malaysia's most popular e-wallet with over 18 million users.",
      },
      {
        question: 'Can I use DuitNow for bill payments?',
        answer:
          'Yes, DuitNow supports bill payments through the JomPAY system. Many Malaysian utility companies, telecoms, and government services accept DuitNow payments.',
      },
      {
        question: 'What currency does DuitNow support?',
        answer:
          'DuitNow primarily supports Malaysian Ringgit (MYR). Cross-border transactions with Singapore use SGD-to-MYR conversion at the prevailing exchange rate.',
      },
      {
        question: 'Is DuitNow QR the same as JomPAY?',
        answer:
          'No. JomPAY is a bill payment standard using biller codes. DuitNow QR is for point-of-sale and person-to-person payments using QR codes. Both are operated by PayNet but serve different use cases.',
      },
      {
        question: 'How secure is DuitNow?',
        answer:
          'DuitNow uses bank-grade security. QR codes are validated with CRC16 checksum. Payments require authentication through your banking app (PIN, password, or biometrics). The QR code itself contains no sensitive banking credentials.',
      },
      {
        question: "What is PayNet's role in DuitNow?",
        answer:
          'PayNet (Payments Network Malaysia) operates the DuitNow switching infrastructure. All Malaysian banks connect through PayNet to process DuitNow transactions in real time, similar to how NPCI operates UPI in India.',
      },
      {
        question: 'Can I receive DuitNow payments without a bank account?',
        answer:
          "No. DuitNow requires a Malaysian bank account or licensed e-wallet to receive payments. However, Touch 'n Go and Boost e-wallets count as valid DuitNow recipients.",
      },
      {
        question: 'What is DuitNow AutoDebit?',
        answer:
          'DuitNow AutoDebit allows recurring automatic payments with a one-time mandate authorization. It replaces the older Direct Debit system in Malaysia, offering faster setup and better consumer protection.',
      },
      {
        question: 'How does DuitNow compare to GoPay (Indonesia)?',
        answer:
          'Both are national instant payment systems. DuitNow operates across all Malaysian banks (interoperable), while GoPay is an app-specific wallet (though QRIS unifies them at the QR level). DuitNow transfers are bank-to-bank; GoPay transfers can be wallet-to-wallet.',
      },
      {
        question: 'What is the DuitNow proxy normalization for mobile numbers?',
        answer:
          'Malaysian mobile numbers are normalized in DuitNow QR codes: "0123456789" becomes "60123456789" (replace leading 0 with country code 60). "+60123456789" stays "60123456789" (remove the plus sign).',
      },
      {
        question: 'Is there an API for DuitNow QR generation?',
        answer:
          'qrpayhub.com will offer a REST API for DuitNow QR generation as part of the API plan (coming soon).',
      },
      {
        question: 'What happened to IBG (Interbank GIRO) after DuitNow?',
        answer:
          'IBG (Interbank GIRO) was the older Malaysian interbank transfer system with batch processing and fees. DuitNow replaced IBG as the primary transfer method, offering instant settlement and no fees for basic transfers.',
      },
      {
        question: 'Can businesses use DuitNow QR for merchant payments?',
        answer:
          'Yes. Businesses register as DuitNow QR merchants through their bank or payment provider. Merchant fees (MDR) are negotiated with the acquiring bank. Most small merchants pay 0% to 0.5% MDR.',
      },
    ],
  },
  de: {
    title: 'DuitNow FAQ',
    description:
      '25 Fragen beantwortet – von DuitNow-ID-Typen und Transaktionslimits über ASEAN-Grenzübertrittszahlungen bis zum EMV QR-Format.',
    items: [
      {
        question: 'Was ist DuitNow?',
        answer:
          'DuitNow ist Malaysias nationales Sofortzahlungssystem, das 2018 von PayNet (Payments Network Malaysia) eingeführt wurde. Es ermöglicht sofortige Banküberweisungen über eine Proxy-ID (Telefonnummer, Ausweisnummer oder Unternehmensregistrierung) statt einer Bankkontonummer, rund um die Uhr verfügbar.',
      },
      {
        question: 'Wer hat DuitNow entwickelt?',
        answer:
          'DuitNow wurde von PayNet (Payments Network Malaysia) entwickelt, einer gemeinsamen Initiative von Bank Negara Malaysia (BNM) und 11 großen malaysischen Banken. PayNet betreibt die wichtigste Finanzmarktinfrastruktur Malaysias.',
      },
      {
        question: 'Welche DuitNow-ID-Typen gibt es?',
        answer:
          'Es gibt fünf DuitNow-Proxy-Typen: Mobiltelefonnummer (malaysisches Format 01X-XXXXXXXX), MyKad-Ausweisnummer (12-stellige malaysische ID), Passnummer (für Nicht-Staatsbürger), Unternehmensregistrierungsnummer (ROC/ROB) und „Sonstige" für besondere Kennungen.',
      },
      {
        question: 'Welche Banken unterstützen DuitNow?',
        answer:
          "Alle großen malaysischen Banken unterstützen DuitNow: Maybank, CIMB, Public Bank, RHB, Hong Leong, AmBank, Affin Bank, Alliance Bank, Bank Islam, Bank Muamalat, BSN und alle anderen lizenzierten malaysischen Banken. E-Wallets wie Touch 'n Go, Boost und GrabPay unterstützen ebenfalls DuitNow.",
      },
      {
        question: 'Ist DuitNow kostenlos?',
        answer:
          'Ja, DuitNow-Überweisungen sind für Privatpersonen bis zu RM 5.000 pro Transaktion kostenlos. Einige Banken erheben möglicherweise eine geringe Gebühr für Geschäftskonten oder Beträge über dem Schwellenwert.',
      },
      {
        question: 'Was ist das DuitNow-Transaktionslimit?',
        answer:
          'Das Standard-DuitNow-Limit beträgt RM 50.000 pro Transaktion für normale Nutzer. Geschäftskonten können je nach Bank höhere Limits haben.',
      },
      {
        question: 'Was ist der Unterschied zwischen DuitNow und DuitNow QR?',
        answer:
          'DuitNow ist der Überweisungsservice (proxy-basierte Überweisungen). DuitNow QR ist der QR-Code-Zahlungsstandard für Händlerzahlungen, basierend auf dem EMV QR-Standard. Beide sind Teil des von PayNet betriebenen DuitNow-Ökosystems.',
      },
      {
        question: 'Was ist eine MyKad-Ausweisnummer?',
        answer:
          'MyKad ist Malaysias nationaler Personalausweis. Die Ausweisnummer ist eine 12-stellige Nummer im Format TTMMJJ-BL-###G, wobei TT=Geburtsjahr, MM=Monat, JJ=Tag, BL=Bundesstaat- und Ländercode, ###=Sequenz, G=Geschlecht. Sie kann als DuitNow-Proxy verwendet werden.',
      },
      {
        question: 'Können Ausländer DuitNow in Malaysia nutzen?',
        answer:
          'Ausländische Staatsangehörige mit malaysischen Bankkonten können DuitNow mit ihrer Passnummer registrieren. Touristen aus Singapur können über die PayNow-DuitNow-Verbindung bei DuitNow QR-Händlern bezahlen.',
      },
      {
        question: 'Was ist die grenzüberschreitende DuitNow-Verbindung?',
        answer:
          'Malaysia hat bilaterale QR-Zahlungsverbindungen mit Singapur (PayNow), Thailand (PromptPay), Indonesien (QRIS) und den Philippinen (QR Ph) im Rahmen ASEAN-weiter QR-Interoperabilitätsinitiativen.',
      },
      {
        question: 'Was ist die AID für DuitNow QR?',
        answer:
          'Der DuitNow QR AID (Application Identifier) lautet „A000000693010011" und befindet sich in EMV-Tag ID 26 des QR-Payloads. Dieser identifiziert den Code eindeutig als DuitNow-Zahlung.',
      },
      {
        question: 'Wie registriere ich mich für DuitNow?',
        answer:
          'Registrieren Sie sich über die Mobile-App oder das Internet-Banking-Portal Ihrer malaysischen Bank. Verknüpfen Sie Ihre Telefonnummer oder Ausweisnummer mit Ihrem Bankkonto. Die meisten malaysischen Banken unterstützen die DuitNow-Registrierung in unter 2 Minuten.',
      },
      {
        question: "Welche Rolle spielt Touch 'n Go eWallet bei DuitNow?",
        answer:
          "Touch 'n Go (TnG) eWallet unterstützt DuitNow QR für Händlerzahlungen. Nutzer können DuitNow QR-Codes mit der TnG-App scannen. TnG ist Malaysias beliebtestes E-Wallet mit über 18 Millionen Nutzern.",
      },
      {
        question: 'Kann ich DuitNow für Rechnungszahlungen nutzen?',
        answer:
          'Ja, DuitNow unterstützt Rechnungszahlungen über das JomPAY-System. Viele malaysische Versorgungsunternehmen, Telekommunikationsanbieter und Behörden akzeptieren DuitNow-Zahlungen.',
      },
      {
        question: 'Welche Währung unterstützt DuitNow?',
        answer:
          'DuitNow unterstützt primär Malaysischen Ringgit (MYR). Grenzüberschreitende Transaktionen mit Singapur verwenden die SGD-zu-MYR-Umrechnung zum aktuellen Wechselkurs.',
      },
      {
        question: 'Ist DuitNow QR dasselbe wie JomPAY?',
        answer:
          'Nein. JomPAY ist ein Rechnungszahlungsstandard mit Rechnungsstellercodes. DuitNow QR ist für Point-of-Sale- und Peer-to-Peer-Zahlungen per QR-Code. Beide werden von PayNet betrieben, dienen aber unterschiedlichen Anwendungsfällen.',
      },
      {
        question: 'Wie sicher ist DuitNow?',
        answer:
          'DuitNow verwendet banktaugliche Sicherheit. QR-Codes werden mit CRC16-Prüfsumme validiert. Zahlungen erfordern Authentifizierung über Ihre Banking-App (PIN, Passwort oder Biometrie). Der QR-Code selbst enthält keine sensiblen Bankzugangsdaten.',
      },
      {
        question: 'Was ist die Rolle von PayNet bei DuitNow?',
        answer:
          'PayNet (Payments Network Malaysia) betreibt die DuitNow-Switching-Infrastruktur. Alle malaysischen Banken verbinden sich über PayNet, um DuitNow-Transaktionen in Echtzeit zu verarbeiten, ähnlich wie NPCI UPI in Indien betreibt.',
      },
      {
        question: 'Kann ich DuitNow-Zahlungen ohne Bankkonto empfangen?',
        answer:
          "Nein. DuitNow erfordert ein malaysisches Bankkonto oder ein lizenziertes E-Wallet zum Empfang von Zahlungen. Touch 'n Go und Boost E-Wallets gelten jedoch als gültige DuitNow-Empfänger.",
      },
      {
        question: 'Was ist DuitNow AutoDebit?',
        answer:
          'DuitNow AutoDebit ermöglicht wiederkehrende automatische Zahlungen mit einer einmaligen Mandatsautorisierung. Es ersetzt das ältere Lastschriftverfahren in Malaysia und bietet schnellere Einrichtung und besseren Verbraucherschutz.',
      },
      {
        question: 'Wie verhält sich DuitNow im Vergleich zu GoPay (Indonesien)?',
        answer:
          'Beide sind nationale Sofortzahlungssysteme. DuitNow operiert über alle malaysischen Banken (interoperabel), während GoPay ein app-spezifisches Wallet ist (obwohl QRIS sie auf QR-Ebene vereinheitlicht). DuitNow-Überweisungen sind bank-zu-bank; GoPay-Überweisungen können wallet-zu-wallet sein.',
      },
      {
        question: 'Was ist die DuitNow-Proxy-Normalisierung für Mobilnummern?',
        answer:
          'Malaysische Mobiltelefonnummern werden in DuitNow QR-Codes normalisiert: „0123456789" wird zu „60123456789" (führende 0 durch Ländervorwahl 60 ersetzen). „+60123456789" wird zu „60123456789" (Plus-Zeichen entfernen).',
      },
      {
        question: 'Gibt es eine API für die DuitNow QR-Generierung?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die DuitNow QR-Generierung anbieten.',
      },
      {
        question: 'Was geschah mit IBG (Interbank GIRO) nach DuitNow?',
        answer:
          'IBG (Interbank GIRO) war das ältere malaysische Interbank-Überweisungssystem mit Batch-Verarbeitung und Gebühren. DuitNow ersetzte IBG als primäre Überweisungsmethode und bietet sofortige Abwicklung ohne Gebühren für grundlegende Überweisungen.',
      },
      {
        question: 'Können Unternehmen DuitNow QR für Händlerzahlungen nutzen?',
        answer:
          'Ja. Unternehmen registrieren sich als DuitNow QR-Händler über ihre Bank oder ihren Zahlungsanbieter. Händlergebühren (MDR) werden mit der Acquiring-Bank verhandelt. Die meisten Kleinhändler zahlen 0% bis 0,5% MDR.',
      },
    ],
  },
}
