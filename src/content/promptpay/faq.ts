import type { LocalizedContent, FAQContent } from '../types'

export const promptpayFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'PromptPay FAQ',
    description:
      '25 questions answered — from PromptPay keys and QR format to ASEAN cross-border payments, transaction limits and phone number normalization.',
    items: [
      {
        question: 'What is PromptPay?',
        answer:
          "PromptPay is Thailand's national instant payment system, launched in 2017 by the Bank of Thailand and the Thai Bankers Association. It allows instant bank transfers using a phone number or national ID instead of a bank account number, available 24/7 at no cost.",
      },
      {
        question: 'Who developed PromptPay?',
        answer:
          "PromptPay was developed by the Bank of Thailand (BOT) together with the Thai Bankers Association (TBA) and the National ITMX company. It is part of Thailand's National e-Payment initiative.",
      },
      {
        question: 'What types of PromptPay keys exist?',
        answer:
          'There are three main key types: phone number (starting with 06, 08 or 09), National ID (13-digit Thai citizen ID), and Tax ID (13-digit juristic entity ID). Some e-wallets also use an e-wallet ID format.',
      },
      {
        question: 'How do I register for PromptPay?',
        answer:
          'Register through your Thai banking app or at any bank branch. Link your phone number or national ID to your bank account. Most Thai banks support registration via mobile app in minutes.',
      },
      {
        question: 'Which Thai banks support PromptPay?',
        answer:
          'All major Thai banks support PromptPay: Bangkok Bank (BBL), Kasikorn Bank (KBank), SCB, Krungthai Bank (KTB), TMBThanachart (ttb), Bank of Ayudhya (Krungsri), CIMB Thai, UOB Thailand, GSB, BAAC and all other licensed Thai banks.',
      },
      {
        question: 'Is PromptPay free?',
        answer:
          'Yes, PromptPay transfers are free for amounts up to ฿5,000 per transaction. For amounts above ฿5,000, banks may charge a small fee (typically ฿1–฿10). Person-to-person transfers via QR are generally free.',
      },
      {
        question: 'What is the PromptPay transaction limit?',
        answer:
          'PromptPay limits vary by bank. Typical limits are ฿700,000 per transaction for regular transfers. Some banks set lower default limits with options to increase via the app.',
      },
      {
        question: 'How does PromptPay QR code work?',
        answer:
          "A PromptPay QR code uses the EMV QR standard. It encodes the recipient's PromptPay key (phone or national ID) and optionally a preset amount. When scanned with any Thai banking app, payment details are pre-filled for instant confirmation.",
      },
      {
        question: 'Is PromptPay the same as QR Code Thailand?',
        answer:
          'PromptPay QR is the payment infrastructure, while "Thai QR Payment" or "QR Code Thailand" refers to the standardized QR format. They use the same EMV-based standard. The logo "Thai QR Payment" appears on merchant QR codes.',
      },
      {
        question: 'Can tourists use PromptPay in Thailand?',
        answer:
          'Tourists cannot directly use PromptPay without a Thai bank account. However, merchants displaying PromptPay QR codes can receive payments. Some payment services allow foreign cards to pay via PromptPay-connected terminals.',
      },
      {
        question: 'What is the phone number format for PromptPay?',
        answer:
          'Thai mobile numbers use 10 digits starting with 06, 08 or 09. In PromptPay QR codes, phone numbers are normalized to "0066XXXXXXXXX" format (replacing leading 0 with 0066). Example: 0812345678 becomes 0066812345678.',
      },
      {
        question: 'What is the technical format of PromptPay QR?',
        answer:
          'PromptPay uses EMV Merchant Presented QR (MPM) format, identical to PIX and BharatQR. The merchant account tag (ID 29) contains the PromptPay AID "A000000677010111" and the normalized recipient key. CRC16-CCITT ensures data integrity.',
      },
      {
        question: 'Does PromptPay work with WeChat Pay or Alipay?',
        answer:
          'Yes, Thailand has cross-border QR payment agreements with China. WeChat Pay and Alipay users can scan Thai merchant QR codes for payments in THB, settled via PromptPay infrastructure.',
      },
      {
        question: 'What happened to bank transfer fees after PromptPay?',
        answer:
          'Since 2018, the Bank of Thailand mandated free interbank transfers via PromptPay for amounts up to ฿5,000, and in 2019 extended this to all amounts. This effectively eliminated interbank transfer fees in Thailand.',
      },
      {
        question: 'Can I have multiple PromptPay registrations?',
        answer:
          'Yes, you can register the same key (phone or national ID) at multiple banks. However, you can only designate one bank as the primary destination for each key.',
      },
      {
        question: 'Is PromptPay QR safe to display publicly?',
        answer:
          'Yes. The QR code only contains your phone number or national ID in normalized format – no bank account details, passwords or PINs. The payer still authenticates with their own banking credentials.',
      },
      {
        question: 'What is ITMX and its role in PromptPay?',
        answer:
          'ITMX (Interbank Transaction Management and Exchange) is the national payment infrastructure company that operates the PromptPay switching network. All Thai banks connect through ITMX to process PromptPay transactions.',
      },
      {
        question: 'How does PromptPay compare to credit card payments?',
        answer:
          'PromptPay transfers money directly between bank accounts at no cost. Credit cards involve merchant fees (1.5–3%), processing delays and chargeback risks. For domestic Thai payments, PromptPay is faster, cheaper and more widely accepted.',
      },
      {
        question: 'Can businesses use PromptPay for payroll?',
        answer:
          'Yes, many Thai businesses use PromptPay for payroll disbursements. The bulk payment feature allows multiple transfers in a single batch, reducing administrative costs.',
      },
      {
        question: 'What is the Thai QR Payment standard?',
        answer:
          "Thai QR Payment is the standardized EMV-based QR code format adopted by all Thai banks in 2017. It ensures interoperability – any Thai banking app can scan any merchant's QR code regardless of which bank issued it.",
      },
      {
        question: 'Is PromptPay connected to any international payment networks?',
        answer:
          'Yes, Thailand has QR payment linkages with Singapore (PayNow), Malaysia (DuitNow), Indonesia (QRIS), Vietnam (VietQR), Cambodia and Japan. This allows cross-border QR payments across ASEAN using local currencies.',
      },
      {
        question: 'What is a static vs dynamic PromptPay QR?',
        answer:
          'Static QR (no amount): reusable, displayed at merchant counters, payer enters amount. Dynamic QR (with amount): generated per transaction, used for specific invoices or e-commerce checkouts.',
      },
      {
        question: 'How is PromptPay different from UPI (India)?',
        answer:
          "Both use similar concepts (key-based transfers, QR codes, instant settlement) but are separate national systems. UPI uses bank handles (@okicici), PromptPay uses phone/ID. UPI processes 10B+ monthly transactions vs PromptPay's ~1B. Thailand and India are exploring cross-border linkage.",
      },
      {
        question: 'Can I generate a PromptPay QR without an amount?',
        answer:
          'Yes, leaving the amount empty creates a static PromptPay QR where the payer enters the amount. Setting Point of Initiation to "11" indicates no amount, "12" indicates a fixed amount.',
      },
      {
        question: 'Is there an API for PromptPay QR generation?',
        answer:
          "qrpayhub.com will offer a REST API for PromptPay QR generation as part of the API plan (coming soon). For production merchant integrations, banks provide their own PromptPay merchant APIs.",
      },
    ],
  },
  de: {
    title: 'PromptPay FAQ',
    description:
      '25 Fragen beantwortet – von PromptPay-Schlüsseln und QR-Format über ASEAN-Grenzübertrittszahlungen, Transaktionslimits und Telefonnummer-Normalisierung.',
    items: [
      {
        question: 'Was ist PromptPay?',
        answer:
          'PromptPay ist Thailands nationales Sofortzahlungssystem, 2017 von der Bank of Thailand und der Thai Bankers Association gestartet. Es ermöglicht sofortige Banküberweisungen über eine Telefonnummer oder nationale Ausweis-ID statt einer Bankkontonummer, rund um die Uhr und kostenlos.',
      },
      {
        question: 'Wer hat PromptPay entwickelt?',
        answer:
          'PromptPay wurde von der Bank of Thailand (BOT) zusammen mit der Thai Bankers Association (TBA) und dem nationalen ITMX-Unternehmen entwickelt. Es ist Teil von Thailands nationalem e-Payment-Initiative.',
      },
      {
        question: 'Welche PromptPay-Schlüsseltypen gibt es?',
        answer:
          'Es gibt drei Hauptschlüsseltypen: Telefonnummer (beginnend mit 06, 08 oder 09), nationale Ausweis-ID (13-stellige thailändische Bürger-ID) und Steuer-ID (13-stellige juristische Personen-ID). Einige E-Wallets verwenden auch ein E-Wallet-ID-Format.',
      },
      {
        question: 'Wie registriere ich mich für PromptPay?',
        answer:
          'Registrieren Sie sich über Ihre thailändische Banking-App oder in einer Bankfiliale. Verknüpfen Sie Ihre Telefonnummer oder nationale Ausweis-ID mit Ihrem Bankkonto. Die meisten thailändischen Banken unterstützen die Registrierung über die Mobile-App innerhalb von Minuten.',
      },
      {
        question: 'Welche thailändischen Banken unterstützen PromptPay?',
        answer:
          'Alle großen thailändischen Banken unterstützen PromptPay: Bangkok Bank (BBL), Kasikorn Bank (KBank), SCB, Krungthai Bank (KTB), TMBThanachart (ttb), Bank of Ayudhya (Krungsri), CIMB Thai, UOB Thailand, GSB, BAAC und alle anderen zugelassenen thailändischen Banken.',
      },
      {
        question: 'Ist PromptPay kostenlos?',
        answer:
          'Ja, PromptPay-Überweisungen sind für Beträge bis zu ฿5.000 pro Transaktion kostenlos. Für Beträge über ฿5.000 können Banken eine geringe Gebühr berechnen (typischerweise ฿1–฿10). Überweisungen zwischen Privatpersonen via QR sind im Allgemeinen kostenlos.',
      },
      {
        question: 'Was ist das PromptPay-Transaktionslimit?',
        answer:
          'PromptPay-Limits variieren je nach Bank. Typische Limits liegen bei ฿700.000 pro Transaktion für normale Überweisungen. Einige Banken setzen niedrigere Standardlimits mit Optionen zur Erhöhung über die App.',
      },
      {
        question: 'Wie funktioniert ein PromptPay QR-Code?',
        answer:
          'Ein PromptPay QR-Code verwendet den EMV QR-Standard. Er kodiert den PromptPay-Schlüssel des Empfängers (Telefon oder nationale Ausweis-ID) und optional einen voreingestellten Betrag. Beim Scannen mit einer beliebigen thailändischen Banking-App werden Zahlungsdetails zur sofortigen Bestätigung vorausgefüllt.',
      },
      {
        question: 'Ist PromptPay dasselbe wie QR Code Thailand?',
        answer:
          'PromptPay QR ist die Zahlungsinfrastruktur, während „Thai QR Payment" oder „QR Code Thailand" sich auf das standardisierte QR-Format bezieht. Sie verwenden denselben EMV-basierten Standard. Das Logo „Thai QR Payment" erscheint auf Händler-QR-Codes.',
      },
      {
        question: 'Können Touristen PromptPay in Thailand nutzen?',
        answer:
          'Touristen können PromptPay nicht direkt ohne ein thailändisches Bankkonto nutzen. Händler, die PromptPay QR-Codes anzeigen, können jedoch Zahlungen empfangen. Einige Zahlungsdienste ermöglichen es, ausländische Karten über PromptPay-verbundene Terminals zu bezahlen.',
      },
      {
        question: 'Was ist das Telefonnummernformat für PromptPay?',
        answer:
          'Thailändische Mobiltelefonnummern haben 10 Stellen und beginnen mit 06, 08 oder 09. In PromptPay QR-Codes werden Telefonnummern in das Format „0066XXXXXXXXX" normalisiert (die führende 0 wird durch 0066 ersetzt). Beispiel: 0812345678 wird zu 0066812345678.',
      },
      {
        question: 'Was ist das technische Format des PromptPay QR?',
        answer:
          'PromptPay verwendet das EMV Merchant Presented QR (MPM)-Format, identisch mit PIX und BharatQR. Der Händlerkonto-Tag (ID 29) enthält die PromptPay AID „A000000677010111" und den normalisierten Empfängerschlüssel. CRC16-CCITT gewährleistet die Datenintegrität.',
      },
      {
        question: 'Funktioniert PromptPay mit WeChat Pay oder Alipay?',
        answer:
          'Ja, Thailand hat grenzüberschreitende QR-Zahlungsabkommen mit China. WeChat Pay- und Alipay-Nutzer können thailändische Händler-QR-Codes für Zahlungen in THB scannen, die über die PromptPay-Infrastruktur abgewickelt werden.',
      },
      {
        question: 'Was geschah mit den Banküberweisungsgebühren nach PromptPay?',
        answer:
          'Seit 2018 hat die Bank of Thailand kostenlose Interbanküberweisungen über PromptPay für Beträge bis ฿5.000 vorgeschrieben, und 2019 wurde dies auf alle Beträge ausgeweitet. Dies hat die Interbanküberweisungsgebühren in Thailand effektiv abgeschafft.',
      },
      {
        question: 'Kann ich mehrere PromptPay-Registrierungen haben?',
        answer:
          'Ja, Sie können denselben Schlüssel (Telefon oder nationale Ausweis-ID) bei mehreren Banken registrieren. Sie können jedoch jeweils nur eine Bank als primäres Ziel für jeden Schlüssel festlegen.',
      },
      {
        question: 'Ist es sicher, PromptPay QR öffentlich anzuzeigen?',
        answer:
          'Ja. Der QR-Code enthält nur Ihre Telefonnummer oder nationale Ausweis-ID im normalisierten Format – keine Bankdaten, Passwörter oder PINs. Der Zahlende authentifiziert sich trotzdem mit seinen eigenen Banking-Zugangsdaten.',
      },
      {
        question: 'Was ist ITMX und welche Rolle spielt es bei PromptPay?',
        answer:
          'ITMX (Interbank Transaction Management and Exchange) ist das nationale Zahlungsinfrastruktur-Unternehmen, das das PromptPay-Switching-Netzwerk betreibt. Alle thailändischen Banken verbinden sich über ITMX, um PromptPay-Transaktionen zu verarbeiten.',
      },
      {
        question: 'Wie verhält sich PromptPay im Vergleich zu Kreditkartenzahlungen?',
        answer:
          'PromptPay überweist Geld direkt und kostenlos zwischen Bankkonten. Kreditkarten beinhalten Händlergebühren (1,5–3 %), Verarbeitungsverzögerungen und Rückbuchungsrisiken. Für inländische thailändische Zahlungen ist PromptPay schneller, günstiger und weiter verbreitet.',
      },
      {
        question: 'Können Unternehmen PromptPay für die Gehaltsabrechnung nutzen?',
        answer:
          'Ja, viele thailändische Unternehmen nutzen PromptPay für Gehaltszahlungen. Die Sammelzahlungsfunktion ermöglicht mehrere Überweisungen in einem einzigen Batch, was Verwaltungskosten reduziert.',
      },
      {
        question: 'Was ist der Thai QR Payment-Standard?',
        answer:
          'Thai QR Payment ist das standardisierte EMV-basierte QR-Code-Format, das 2017 von allen thailändischen Banken übernommen wurde. Es gewährleistet Interoperabilität – jede thailändische Banking-App kann den QR-Code eines beliebigen Händlers scannen, unabhängig davon, welche Bank ihn ausgestellt hat.',
      },
      {
        question: 'Ist PromptPay mit internationalen Zahlungsnetzwerken verbunden?',
        answer:
          'Ja, Thailand hat QR-Zahlungsverbindungen mit Singapur (PayNow), Malaysia (DuitNow), Indonesien (QRIS), Vietnam (VietQR), Kambodscha und Japan. Dies ermöglicht grenzüberschreitende QR-Zahlungen im gesamten ASEAN-Raum in lokalen Währungen.',
      },
      {
        question: 'Was ist ein statischer vs. dynamischer PromptPay QR?',
        answer:
          'Statischer QR (ohne Betrag): wiederverwendbar, an Händlertheken ausgestellt, Zahlender gibt Betrag ein. Dynamischer QR (mit Betrag): pro Transaktion generiert, für spezifische Rechnungen oder E-Commerce-Checkouts verwendet.',
      },
      {
        question: 'Wie unterscheidet sich PromptPay von UPI (Indien)?',
        answer:
          'Beide verwenden ähnliche Konzepte (schlüsselbasierte Überweisungen, QR-Codes, Sofortabwicklung), sind aber separate nationale Systeme. UPI verwendet Bank-Handles (@okicici), PromptPay verwendet Telefon/ID. UPI verarbeitet 10 Mrd.+ monatliche Transaktionen gegenüber PromptPays ~1 Mrd. Thailand und Indien erkunden eine grenzüberschreitende Verbindung.',
      },
      {
        question: 'Kann ich einen PromptPay QR ohne Betrag generieren?',
        answer:
          'Ja, ein leeres Betragsfeld erstellt einen statischen PromptPay QR, bei dem der Zahlende den Betrag eingibt. Das Setzen von Point of Initiation auf „11" zeigt keinen Betrag an, „12" zeigt einen festen Betrag an.',
      },
      {
        question: 'Gibt es eine API für die PromptPay QR-Generierung?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die PromptPay QR-Generierung anbieten. Für Produktions-Händlerintegration stellen Banken ihre eigenen PromptPay-Händler-APIs bereit.',
      },
    ],
  },
}
