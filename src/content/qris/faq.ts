import type { LocalizedContent, FAQContent } from '../types'

export const qrisFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'QRIS FAQ',
    description:
      "25 questions answered — from NMID and merchant types to cross-border payments, MDR fees and the EMV QR format.",
    items: [
      {
        question: 'What is QRIS?',
        answer:
          "QRIS (Quick Response Code Indonesian Standard) is Indonesia's national QR payment standard, launched on January 1, 2020 by Bank Indonesia. It unifies all QR payment codes from different providers (GoPay, OVO, Dana, LinkAja, ShopeePay) into one single standard, so merchants only need one QR code for all apps.",
      },
      {
        question: 'Who developed QRIS?',
        answer:
          "QRIS was developed by Bank Indonesia (BI), the country's central bank, together with the Indonesian Payment System Association (ASPI). It is based on the international EMV QR standard.",
      },
      {
        question: 'When was QRIS launched?',
        answer:
          "QRIS was officially launched on August 17, 2019 (Indonesia's Independence Day) and became mandatory for all payment providers on January 1, 2020.",
      },
      {
        question: 'Which apps support QRIS?',
        answer:
          'All major Indonesian payment apps support QRIS: GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri, BRI, BNI, CIMB Niaga, Permata, and 50+ other banks and e-wallets.',
      },
      {
        question: 'What is an NMID?',
        answer:
          'NMID (National Merchant ID) is the unique identifier assigned to every registered QRIS merchant by Bank Indonesia. It is a required component of the QRIS QR code and identifies the merchant in the payment network.',
      },
      {
        question: 'What are the four QRIS merchant categories?',
        answer:
          'QRIS classifies merchants into four categories: Usaha Mikro (micro businesses, annual revenue under Rp 300 million), Usaha Kecil (small businesses, Rp 300M–2.5B), Usaha Menengah (medium businesses, Rp 2.5B–50B), and Usaha Besar (large businesses, above Rp 50B). The category affects MDR fees.',
      },
      {
        question: 'What is the MDR fee for QRIS?',
        answer:
          'MDR (Merchant Discount Rate) for QRIS: 0% for government and education institutions, 0.3% for micro merchants, 0.7% for small and medium merchants, and 0.7% for large merchants. These rates are regulated by Bank Indonesia.',
      },
      {
        question: 'Is QRIS free for consumers?',
        answer:
          'Yes, QRIS payments are completely free for consumers (buyers). Only merchants pay the MDR fee on received payments.',
      },
      {
        question: 'What is the QRIS transaction limit?',
        answer:
          'The standard QRIS limit is Rp 10,000,000 (10 million rupiah) per transaction for regular users. Premium users with verified accounts can have higher limits up to Rp 20,000,000.',
      },
      {
        question: 'Can QRIS be used for international payments?',
        answer:
          'Yes! Indonesia has cross-border QRIS connections with Thailand (PromptPay), Malaysia (DuitNow), Singapore (PayNow), Philippines (QR Ph), Vietnam (VietQR), India (UPI), and Japan. This allows tourists to pay at Indonesian merchants using their home country payment apps.',
      },
      {
        question: 'What is the difference between static and dynamic QRIS?',
        answer:
          'Static QRIS has no preset amount – the payer enters the amount. Dynamic QRIS includes a specific amount, used for e-commerce and invoices. Static codes are printed on stickers; dynamic codes are generated per transaction.',
      },
      {
        question: 'How do I register as a QRIS merchant?',
        answer:
          'Register through any Bank Indonesia-licensed PJSP (Payment Service Provider) such as GoPay, OVO, Dana, or your bank. You will receive an NMID and a QRIS sticker for your business.',
      },
      {
        question: 'Is QRIS secure?',
        answer:
          "Yes. QRIS uses CRC16 checksum validation to prevent tampering. All transactions are processed through Bank Indonesia's national switching infrastructure (BI-FAST). Payments require the payer's PIN or biometric authentication.",
      },
      {
        question: 'What does "QRIS Tuntas" mean?',
        answer:
          '"QRIS Tuntas" (QRIS Complete) is Bank Indonesia\'s initiative to expand QRIS acceptance to all types of payments including donations, toll roads, parking, and vending machines.',
      },
      {
        question: 'Can QRIS be used without internet?',
        answer:
          'QRIS requires internet for the payment transaction itself. However, the QR code display does not require internet – merchants can show printed QRIS stickers offline.',
      },
      {
        question: 'What is the AID used in QRIS QR codes?',
        answer:
          'The Application Identifier in QRIS QR codes is "ID.CO.QRIS.WWW" placed in EMV tag ID 26, identifying it as an Indonesian QRIS payment. This differentiates it from other EMV-based payment standards like PIX or PromptPay.',
      },
      {
        question: 'How many QRIS merchants are there in Indonesia?',
        answer:
          'As of 2025, there are over 30 million registered QRIS merchants in Indonesia, making it one of the largest QR payment merchant networks in the world.',
      },
      {
        question: 'What happened to individual app QR codes after QRIS?',
        answer:
          'Before QRIS, each payment app had its own QR code. After QRIS became mandatory in 2020, all apps unified to the QRIS standard. Merchants replaced multiple QR stickers with one single QRIS code.',
      },
      {
        question: 'Is there an API for QRIS generation?',
        answer:
          'qrpayhub.com will offer a REST API for QRIS generation as part of the API plan (coming soon).',
      },
      {
        question: 'What is the QRIS logo and why must it be displayed?',
        answer:
          'The QRIS logo is a mandatory visual element on all QRIS merchant codes. It consists of the letters "QRIS" with Bank Indonesia branding. Displaying the logo is required by Bank Indonesia regulation for all QRIS merchants.',
      },
      {
        question: 'Can foreign tourists use QRIS in Indonesia?',
        answer:
          'Yes, tourists from Thailand, Malaysia, Singapore, Philippines, Vietnam, India, and Japan can pay at QRIS merchants using their home payment apps (PromptPay, DuitNow, PayNow, etc.) through cross-border QR payment linkages.',
      },
      {
        question: 'What is Merchant Criteria in QRIS?',
        answer:
          'Merchant Criteria defines the merchant size and is encoded in the QRIS payload: "A" for micro and small merchants, "B" for medium, "C" for large. This affects the MDR rate charged to the merchant.',
      },
      {
        question: 'How long does a QRIS payment take?',
        answer:
          "QRIS payments complete in seconds, 24/7/365. The transaction goes through Bank Indonesia's national switching infrastructure and settles to the merchant's account in real time.",
      },
      {
        question: 'What is the QRIS payment flow?',
        answer:
          "1) Payer opens any QRIS-enabled app, 2) scans merchant's QRIS code, 3) confirms amount (or views preset amount), 4) enters PIN or uses biometrics, 5) payment completes in seconds, 6) both parties receive confirmation.",
      },
      {
        question: 'What is BI-FAST and how does it relate to QRIS?',
        answer:
          "BI-FAST is Bank Indonesia's national fast payment infrastructure, launched December 2021. QRIS runs on top of BI-FAST for real-time settlement. BI-FAST also supports non-QR transfers. Together they form Indonesia's modern payment infrastructure.",
      },
    ],
  },
  de: {
    title: 'QRIS FAQ',
    description:
      '25 Fragen beantwortet – von NMID und Händlerkategorien über grenzüberschreitende Zahlungen, MDR-Gebühren bis zum EMV QR-Format.',
    items: [
      {
        question: 'Was ist QRIS?',
        answer:
          'QRIS (Quick Response Code Indonesian Standard) ist Indonesiens nationaler QR-Zahlungsstandard, der am 1. Januar 2020 von Bank Indonesia eingeführt wurde. Er vereint alle QR-Zahlungscodes verschiedener Anbieter (GoPay, OVO, Dana, LinkAja, ShopeePay) in einem einzigen Standard, sodass Händler nur einen QR-Code für alle Apps benötigen.',
      },
      {
        question: 'Wer hat QRIS entwickelt?',
        answer:
          'QRIS wurde von Bank Indonesia (BI), der Zentralbank des Landes, zusammen mit der Indonesian Payment System Association (ASPI) entwickelt. Es basiert auf dem internationalen EMV QR-Standard.',
      },
      {
        question: 'Wann wurde QRIS eingeführt?',
        answer:
          'QRIS wurde offiziell am 17. August 2019 (Indonesiens Unabhängigkeitstag) eingeführt und wurde ab dem 1. Januar 2020 für alle Zahlungsanbieter verpflichtend.',
      },
      {
        question: 'Welche Apps unterstützen QRIS?',
        answer:
          'Alle großen indonesischen Zahlungs-Apps unterstützen QRIS: GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri, BRI, BNI, CIMB Niaga, Permata und 50+ weitere Banken und E-Wallets.',
      },
      {
        question: 'Was ist eine NMID?',
        answer:
          'NMID (National Merchant ID) ist die eindeutige Kennung, die Bank Indonesia jedem registrierten QRIS-Händler zuweist. Sie ist ein erforderlicher Bestandteil des QRIS QR-Codes und identifiziert den Händler im Zahlungsnetzwerk.',
      },
      {
        question: 'Was sind die vier QRIS-Händlerkategorien?',
        answer:
          'QRIS klassifiziert Händler in vier Kategorien: Usaha Mikro (Kleinstunternehmen, Jahresumsatz unter Rp 300 Millionen), Usaha Kecil (Kleinunternehmen, Rp 300M–2,5B), Usaha Menengah (Mittelständler, Rp 2,5B–50B) und Usaha Besar (Großunternehmen, über Rp 50B). Die Kategorie beeinflusst die MDR-Gebühren.',
      },
      {
        question: 'Wie hoch ist die MDR-Gebühr bei QRIS?',
        answer:
          'MDR (Merchant Discount Rate) bei QRIS: 0% für staatliche und Bildungseinrichtungen, 0,3% für Kleinstunternehmen, 0,7% für kleine und mittlere Händler sowie 0,7% für Großhändler. Diese Sätze werden von Bank Indonesia reguliert.',
      },
      {
        question: 'Ist QRIS für Verbraucher kostenlos?',
        answer:
          'Ja, QRIS-Zahlungen sind für Verbraucher (Käufer) vollständig kostenlos. Nur Händler zahlen die MDR-Gebühr auf empfangene Zahlungen.',
      },
      {
        question: 'Was ist das QRIS-Transaktionslimit?',
        answer:
          'Das Standardlimit bei QRIS beträgt Rp 10.000.000 (10 Millionen Rupiah) pro Transaktion für normale Nutzer. Premium-Nutzer mit verifizierten Konten können höhere Limits bis zu Rp 20.000.000 haben.',
      },
      {
        question: 'Kann QRIS für internationale Zahlungen genutzt werden?',
        answer:
          'Ja! Indonesien hat grenzüberschreitende QRIS-Verbindungen zu Thailand (PromptPay), Malaysia (DuitNow), Singapur (PayNow), Philippinen (QR Ph), Vietnam (VietQR), Indien (UPI) und Japan. Dies ermöglicht es Touristen, bei indonesischen Händlern mit den Zahlungs-Apps ihres Heimatlandes zu bezahlen.',
      },
      {
        question: 'Was ist der Unterschied zwischen statischem und dynamischem QRIS?',
        answer:
          'Statisches QRIS hat keinen voreingestellten Betrag – der Zahlende gibt den Betrag ein. Dynamisches QRIS enthält einen bestimmten Betrag, wird für E-Commerce und Rechnungen verwendet. Statische Codes werden auf Aufklebern gedruckt; dynamische Codes werden pro Transaktion generiert.',
      },
      {
        question: 'Wie registriere ich mich als QRIS-Händler?',
        answer:
          'Registrieren Sie sich bei einem von Bank Indonesia lizenzierten PJSP (Payment Service Provider) wie GoPay, OVO, Dana oder Ihrer Bank. Sie erhalten eine NMID und einen QRIS-Aufkleber für Ihr Unternehmen.',
      },
      {
        question: 'Ist QRIS sicher?',
        answer:
          'Ja. QRIS verwendet CRC16-Prüfsummenvalidierung zur Verhinderung von Manipulation. Alle Transaktionen werden über Bank Indonesias nationale Switching-Infrastruktur (BI-FAST) verarbeitet. Zahlungen erfordern die PIN oder biometrische Authentifizierung des Zahlenden.',
      },
      {
        question: 'Was bedeutet „QRIS Tuntas"?',
        answer:
          '„QRIS Tuntas" (QRIS Vollständig) ist Bank Indonesias Initiative zur Ausweitung der QRIS-Akzeptanz auf alle Zahlungsarten, einschließlich Spenden, Mautstraßen, Parkplätze und Automaten.',
      },
      {
        question: 'Kann QRIS ohne Internet genutzt werden?',
        answer:
          'QRIS benötigt Internet für die Zahlungstransaktion selbst. Die Anzeige des QR-Codes erfordert jedoch kein Internet – Händler können gedruckte QRIS-Aufkleber offline zeigen.',
      },
      {
        question: 'Welche AID wird in QRIS QR-Codes verwendet?',
        answer:
          'Der Application Identifier in QRIS QR-Codes lautet „ID.CO.QRIS.WWW" und befindet sich in EMV-Tag ID 26. Er identifiziert den Code als indonesische QRIS-Zahlung und unterscheidet ihn von anderen EMV-basierten Standards wie PIX oder PromptPay.',
      },
      {
        question: 'Wie viele QRIS-Händler gibt es in Indonesien?',
        answer:
          'Stand 2025 gibt es über 30 Millionen registrierte QRIS-Händler in Indonesien, was es zu einem der größten QR-Zahlungs-Händlernetzwerke der Welt macht.',
      },
      {
        question: 'Was geschah mit den einzelnen App-QR-Codes nach QRIS?',
        answer:
          'Vor QRIS hatte jede Zahlungs-App ihren eigenen QR-Code. Nachdem QRIS 2020 verpflichtend wurde, vereinheitlichten alle Apps auf den QRIS-Standard. Händler ersetzten mehrere QR-Aufkleber durch einen einzigen QRIS-Code.',
      },
      {
        question: 'Gibt es eine API für die QRIS-Generierung?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die QRIS-Generierung anbieten.',
      },
      {
        question: 'Was ist das QRIS-Logo und warum muss es angezeigt werden?',
        answer:
          'Das QRIS-Logo ist ein obligatorisches visuelles Element auf allen QRIS-Händlercodes. Es besteht aus den Buchstaben „QRIS" mit Bank Indonesia-Branding. Die Anzeige des Logos ist von Bank Indonesia für alle QRIS-Händler vorgeschrieben.',
      },
      {
        question: 'Können ausländische Touristen QRIS in Indonesien nutzen?',
        answer:
          'Ja, Touristen aus Thailand, Malaysia, Singapur, Philippinen, Vietnam, Indien und Japan können bei QRIS-Händlern mit ihren Heimat-Zahlungs-Apps (PromptPay, DuitNow, PayNow usw.) über grenzüberschreitende QR-Zahlungsverbindungen bezahlen.',
      },
      {
        question: 'Was ist das Merchant Criteria in QRIS?',
        answer:
          'Merchant Criteria definiert die Händlergröße und ist im QRIS-Payload kodiert: „A" für Kleinst- und Kleinunternehmen, „B" für mittlere, „C" für große. Dies beeinflusst den MDR-Satz, der dem Händler berechnet wird.',
      },
      {
        question: 'Wie lange dauert eine QRIS-Zahlung?',
        answer:
          'QRIS-Zahlungen werden in Sekunden abgeschlossen, 24/7/365. Die Transaktion läuft über Bank Indonesias nationale Switching-Infrastruktur und wird in Echtzeit auf dem Händlerkonto gutgeschrieben.',
      },
      {
        question: 'Wie läuft eine QRIS-Zahlung ab?',
        answer:
          '1) Zahlender öffnet eine beliebige QRIS-fähige App, 2) scannt den QRIS-Code des Händlers, 3) bestätigt den Betrag (oder sieht voreingestellten Betrag), 4) gibt PIN ein oder verwendet Biometrie, 5) Zahlung wird in Sekunden abgeschlossen, 6) beide Parteien erhalten Bestätigung.',
      },
      {
        question: 'Was ist BI-FAST und wie hängt es mit QRIS zusammen?',
        answer:
          'BI-FAST ist Bank Indonesias nationale Schnellzahlungsinfrastruktur, die im Dezember 2021 eingeführt wurde. QRIS läuft auf BI-FAST für die Echtzeit-Abwicklung. BI-FAST unterstützt auch Nicht-QR-Überweisungen. Zusammen bilden sie Indonesiens moderne Zahlungsinfrastruktur.',
      },
    ],
  },
}
