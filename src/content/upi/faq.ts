import type { LocalizedContent, FAQContent } from '../types'

export const upiFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'UPI FAQ',
    description:
      '25 questions answered — from UPI IDs and transaction limits to global expansion and QR format.',
    items: [
      {
        question: 'What is UPI?',
        answer:
          "UPI (Unified Payments Interface) is India's real-time payment system developed by the National Payments Corporation of India (NPCI). Launched in 2016, it allows instant bank transfers using a simple UPI ID (Virtual Payment Address) instead of bank account numbers.",
      },
      {
        question: 'What is a UPI ID?',
        answer:
          'A UPI ID (also called Virtual Payment Address or VPA) is a unique identifier linked to your bank account, formatted as "username@bankhandle" (e.g. john@okicici, 9876543210@paytm). It replaces the need to share your account number and IFSC code.',
      },
      {
        question: 'Which apps support UPI payments?',
        answer:
          'All major Indian payment apps support UPI: PhonePe, Google Pay (GPay), Paytm, BHIM (official NPCI app), Amazon Pay, WhatsApp Pay, Mobikwik, and virtually all Indian banking apps.',
      },
      {
        question: 'Is UPI available outside India?',
        answer:
          'UPI is expanding internationally. As of 2024–2026, UPI is accepted in Singapore, UAE, Bahrain, France, UK, Mauritius, Nepal, Bhutan and several other countries through partnerships with local payment networks.',
      },
      {
        question: 'What is the UPI transaction limit?',
        answer:
          'The standard UPI limit is ₹1,00,000 (1 Lakh) per transaction. Some banks allow higher limits for specific categories like capital markets (₹2 Lakhs) or tax payments (₹5 Lakhs).',
      },
      {
        question: 'What is BHIM UPI?',
        answer:
          'BHIM (Bharat Interface for Money) is the official UPI app developed by NPCI. It works with all UPI-enabled bank accounts and is available in 20+ Indian languages.',
      },
      {
        question: 'How does UPI QR code work?',
        answer:
          "A UPI QR code encodes a UPI deep link (upi://pay?pa=...&pn=...) containing the payee's UPI ID and name. When scanned with any UPI app, the payment details are pre-filled and the user only needs to enter their PIN to confirm.",
      },
      {
        question: 'Is UPI free to use?',
        answer:
          'Yes, UPI transactions are free for consumers. Merchants may pay a small MDR (Merchant Discount Rate) for certain transaction types, but person-to-person transfers are always free.',
      },
      {
        question: 'What is the difference between UPI and NEFT/RTGS?',
        answer:
          'UPI transfers are instant (within seconds), available 24/7/365, and free. NEFT processes in batches with cut-off times. RTGS is for high-value transactions above ₹2 Lakhs. UPI has largely replaced NEFT/RTGS for everyday payments.',
      },
      {
        question: 'How many UPI transactions happen per month?',
        answer:
          "As of 2026, UPI processes over 10 billion transactions per month, making it the world's largest real-time payment network by volume. India accounts for approximately 46% of all real-time payment transactions globally.",
      },
      {
        question: 'What is UPI Lite?',
        answer:
          'UPI Lite is a feature for small-value transactions (up to ₹500) that works without an internet connection and does not require a PIN, making payments faster and available in low-connectivity areas.',
      },
      {
        question: 'Can I use UPI for international transfers?',
        answer:
          'UPI supports cross-border payments in participating countries. You can send money to Singapore (via PayNow), UAE (via AECB), and other partner countries. The sender needs a UPI-enabled Indian bank account.',
      },
      {
        question: 'What is the merchant category code (MCC) in UPI?',
        answer:
          "The Merchant Category Code (MCC) is a 4-digit code that classifies the type of business. It's optional for basic UPI QR codes but required for merchant integrations to qualify for category-specific transaction limits and GST reporting.",
      },
      {
        question: 'Is it safe to share my UPI QR code publicly?',
        answer:
          'Yes, sharing your UPI QR code is safe. It only contains your UPI ID and name – no passwords, PINs, or sensitive bank details. The payer still needs to authenticate with their own PIN to complete any payment.',
      },
      {
        question: 'What is the difference between static and dynamic UPI QR?',
        answer:
          'A static QR code has a fixed UPI ID without a preset amount – suitable for shops and general use. A dynamic QR code includes a specific amount and transaction reference, ideal for invoices and e-commerce checkouts.',
      },
      {
        question: 'Can I generate a UPI QR code without an amount?',
        answer:
          'Yes, leaving the amount field empty creates a static UPI QR where the payer enters the amount manually. This is the most common format for merchant QR codes displayed at shops.',
      },
      {
        question: 'What is @okicici, @ybl, @paytm in UPI IDs?',
        answer:
          'These are bank handles that identify which bank or payment app the UPI ID belongs to: @okicici = ICICI Bank via third-party, @ybl = PhonePe (Yes Bank), @paytm = Paytm Payments Bank, @oksbi = State Bank of India via Google Pay.',
      },
      {
        question: 'Does UPI QR work offline?',
        answer:
          'Standard UPI QR requires internet for the payment. UPI Lite (for amounts up to ₹500) works offline for the payer. Generating the QR code itself requires no internet.',
      },
      {
        question: 'What happens if a UPI payment fails?',
        answer:
          "Failed UPI payments are automatically refunded to the sender's account within 24–48 hours. If the refund does not arrive, the NPCI helpline (18001201740) handles disputes.",
      },
      {
        question: 'Is there an API for generating UPI QR codes?',
        answer:
          'qrpayhub.com will offer a REST API for UPI QR generation as part of the API plan (coming soon), allowing integration into e-commerce platforms, billing software and POS systems.',
      },
      {
        question: 'What is the full form of NPCI?',
        answer:
          'NPCI stands for National Payments Corporation of India. It is the umbrella organization that operates UPI, RuPay, IMPS, FASTag, NACH and other retail payment systems in India.',
      },
      {
        question: 'Can foreigners use UPI in India?',
        answer:
          'Yes, since 2023 international visitors to India can use UPI by linking their foreign phone numbers to participating international cards. G20 country nationals can open UPI accounts with supported banks.',
      },
      {
        question: 'What is a UPI mandate?',
        answer:
          'A UPI mandate (AutoPay) allows recurring payments to be set up with a one-time authorization. Used for subscriptions, EMIs, utility bills and SIPs, with amounts debited automatically on scheduled dates.',
      },
      {
        question: 'How is UPI different from mobile wallets like Paytm Wallet?',
        answer:
          'UPI transfers money directly between bank accounts in real time. Mobile wallets store money in a separate wallet that needs to be loaded first. UPI is faster, has higher limits and is regulated by the Reserve Bank of India.',
      },
      {
        question: 'Why does India have so many UPI transactions?',
        answer:
          "India's UPI success comes from: zero transaction fees for consumers, interoperability across all banks and apps, government backing (demonetization in 2016 accelerated adoption), smartphone penetration, and the simple UPI ID concept that removed barriers to digital payments.",
      },
    ],
  },
  de: {
    title: 'UPI FAQ',
    description:
      '25 Fragen beantwortet – von UPI-IDs und Transaktionslimits bis zu globaler Expansion und QR-Format.',
    items: [
      {
        question: 'Was ist UPI?',
        answer:
          'UPI (Unified Payments Interface) ist Indiens Echtzeit-Zahlungssystem, das von der National Payments Corporation of India (NPCI) entwickelt wurde. Seit dem Start 2016 ermöglicht es sofortige Banküberweisungen über eine einfache UPI-ID (Virtual Payment Address) anstelle von Kontonummern.',
      },
      {
        question: 'Was ist eine UPI-ID?',
        answer:
          'Eine UPI-ID (auch Virtual Payment Address oder VPA genannt) ist eine eindeutige Kennung, die mit Ihrem Bankkonto verknüpft ist, im Format „nutzername@bankhandle" (z. B. john@okicici, 9876543210@paytm). Sie ersetzt die Notwendigkeit, Ihre Kontonummer und den IFSC-Code weiterzugeben.',
      },
      {
        question: 'Welche Apps unterstützen UPI-Zahlungen?',
        answer:
          'Alle grossen indischen Zahlungs-Apps unterstützen UPI: PhonePe, Google Pay (GPay), Paytm, BHIM (offizielle NPCI-App), Amazon Pay, WhatsApp Pay, Mobikwik und praktisch alle indischen Banking-Apps.',
      },
      {
        question: 'Ist UPI ausserhalb Indiens verfügbar?',
        answer:
          'UPI expandiert international. Stand 2024–2026 wird UPI in Singapur, VAE, Bahrain, Frankreich, Vereinigtes Königreich, Mauritius, Nepal, Bhutan und mehreren anderen Ländern über Partnerschaften mit lokalen Zahlungsnetzwerken akzeptiert.',
      },
      {
        question: 'Was ist das UPI-Transaktionslimit?',
        answer:
          'Das Standard-UPI-Limit beträgt ₹1,00,000 (1 Lakh) pro Transaktion. Einige Banken erlauben höhere Limits für bestimmte Kategorien wie Kapitalmärkte (₹2 Lakh) oder Steuerzahlungen (₹5 Lakh).',
      },
      {
        question: 'Was ist BHIM UPI?',
        answer:
          'BHIM (Bharat Interface for Money) ist die offizielle UPI-App von NPCI. Sie funktioniert mit allen UPI-fähigen Bankkonten und ist in mehr als 20 indischen Sprachen verfügbar.',
      },
      {
        question: 'Wie funktioniert ein UPI QR-Code?',
        answer:
          'Ein UPI QR-Code kodiert einen UPI-Deeplink (upi://pay?pa=...&pn=...) mit der UPI-ID und dem Namen des Empfängers. Beim Scannen mit einer beliebigen UPI-App werden die Zahlungsdaten automatisch ausgefüllt; der Nutzer muss nur noch seine PIN eingeben.',
      },
      {
        question: 'Ist UPI kostenlos?',
        answer:
          'Ja, UPI-Transaktionen sind für Verbraucher kostenlos. Händler zahlen möglicherweise eine geringe MDR (Merchant Discount Rate) für bestimmte Transaktionsarten, aber Überweisungen zwischen Privatpersonen sind immer kostenlos.',
      },
      {
        question: 'Was ist der Unterschied zwischen UPI und NEFT/RTGS?',
        answer:
          'UPI-Überweisungen erfolgen sofort (innerhalb von Sekunden), sind rund um die Uhr an 365 Tagen verfügbar und kostenlos. NEFT verarbeitet in Batches mit festgelegten Zeiten. RTGS ist für hochwertige Transaktionen über ₹2 Lakh vorgesehen. UPI hat NEFT/RTGS für alltägliche Zahlungen weitgehend abgelöst.',
      },
      {
        question: 'Wie viele UPI-Transaktionen finden pro Monat statt?',
        answer:
          'Stand 2026 verarbeitet UPI über 10 Milliarden Transaktionen pro Monat und ist damit das weltweit grösste Echtzeit-Zahlungsnetzwerk nach Volumen. Indien ist für ca. 46 % aller weltweiten Echtzeit-Zahlungstransaktionen verantwortlich.',
      },
      {
        question: 'Was ist UPI Lite?',
        answer:
          'UPI Lite ist eine Funktion für Kleinbetragstransaktionen (bis zu ₹500), die ohne Internetverbindung und ohne PIN funktioniert und so Zahlungen schneller und auch in Gebieten mit schlechter Konnektivität ermöglicht.',
      },
      {
        question: 'Kann ich UPI für internationale Überweisungen nutzen?',
        answer:
          'UPI unterstützt grenzüberschreitende Zahlungen in Partnerländern. Sie können Geld nach Singapur (über PayNow), in die VAE (über AECB) und andere Partnerländer senden. Der Absender benötigt ein UPI-fähiges indisches Bankkonto.',
      },
      {
        question: 'Was ist der Händlerkategoriecode (MCC) bei UPI?',
        answer:
          'Der Merchant Category Code (MCC) ist ein 4-stelliger Code, der die Art des Unternehmens klassifiziert. Er ist für einfache UPI QR-Codes optional, wird aber für Händlerintegration benötigt, um kategoriespezifische Transaktionslimits und GST-Reporting zu qualifizieren.',
      },
      {
        question: 'Ist es sicher, meinen UPI QR-Code öffentlich zu teilen?',
        answer:
          'Ja, das Teilen Ihres UPI QR-Codes ist sicher. Er enthält nur Ihre UPI-ID und Ihren Namen – keine Passwörter, PINs oder sensiblen Bankdaten. Der Zahlende muss sich trotzdem mit seiner eigenen PIN authentifizieren, um eine Zahlung abzuschliessen.',
      },
      {
        question: 'Was ist der Unterschied zwischen statischem und dynamischem UPI QR?',
        answer:
          'Ein statischer QR-Code enthält eine feste UPI-ID ohne voreingestellten Betrag – geeignet für Geschäfte und den allgemeinen Gebrauch. Ein dynamischer QR-Code enthält einen bestimmten Betrag und eine Transaktionsreferenz, ideal für Rechnungen und E-Commerce-Checkouts.',
      },
      {
        question: 'Kann ich einen UPI QR-Code ohne Betrag erstellen?',
        answer:
          'Ja, ein leeres Betragsfeld erstellt einen statischen UPI QR-Code, bei dem der Zahlende den Betrag manuell eingibt. Dies ist das gebräuchlichste Format für Händler-QR-Codes in Geschäften.',
      },
      {
        question: 'Was bedeutet @okicici, @ybl, @paytm in UPI-IDs?',
        answer:
          'Dies sind Bank-Handles, die angeben, zu welcher Bank oder Zahlungs-App die UPI-ID gehört: @okicici = ICICI Bank über Drittanbieter, @ybl = PhonePe (Yes Bank), @paytm = Paytm Payments Bank, @oksbi = State Bank of India über Google Pay.',
      },
      {
        question: 'Funktioniert UPI QR offline?',
        answer:
          'Standard-UPI-QR benötigt für die Zahlung eine Internetverbindung. UPI Lite (für Beträge bis ₹500) funktioniert auch ohne Internet. Das Erstellen des QR-Codes selbst erfordert keine Internetverbindung.',
      },
      {
        question: 'Was passiert, wenn eine UPI-Zahlung fehlschlägt?',
        answer:
          'Fehlgeschlagene UPI-Zahlungen werden innerhalb von 24–48 Stunden automatisch auf das Konto des Absenders zurückgebucht. Falls die Rückbuchung ausbleibt, übernimmt die NPCI-Hotline (18001201740) die Bearbeitung.',
      },
      {
        question: 'Gibt es eine API zur Generierung von UPI QR-Codes?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für die UPI QR-Generierung anbieten, die eine Integration in E-Commerce-Plattformen, Abrechnungssoftware und Kassensysteme ermöglicht.',
      },
      {
        question: 'Wofür steht NPCI?',
        answer:
          'NPCI steht für National Payments Corporation of India. Es ist die Dachorganisation, die UPI, RuPay, IMPS, FASTag, NACH und andere Retail-Zahlungssysteme in Indien betreibt.',
      },
      {
        question: 'Können Ausländer UPI in Indien nutzen?',
        answer:
          'Ja, seit 2023 können internationale Besucher in Indien UPI nutzen, indem sie ihre ausländischen Telefonnummern mit teilnehmenden internationalen Karten verknüpfen. Staatsangehörige der G20-Länder können UPI-Konten bei unterstützten Banken eröffnen.',
      },
      {
        question: 'Was ist ein UPI-Mandat?',
        answer:
          'Ein UPI-Mandat (AutoPay) ermöglicht die Einrichtung wiederkehrender Zahlungen mit einer einmaligen Autorisierung. Es wird für Abonnements, EMIs, Rechnungen und SIPs verwendet, wobei Beträge automatisch zu geplanten Terminen abgebucht werden.',
      },
      {
        question: 'Wie unterscheidet sich UPI von mobilen Wallets wie dem Paytm Wallet?',
        answer:
          'UPI überweist Geld in Echtzeit direkt zwischen Bankkonten. Mobile Wallets speichern Geld in einem separaten Wallet, das zunächst aufgeladen werden muss. UPI ist schneller, hat höhere Limits und wird von der Reserve Bank of India reguliert.',
      },
      {
        question: 'Warum gibt es in Indien so viele UPI-Transaktionen?',
        answer:
          'Indiens UPI-Erfolg beruht auf: null Transaktionsgebühren für Verbraucher, Interoperabilität über alle Banken und Apps, staatlicher Unterstützung (die Bargeldabschaffung 2016 beschleunigte die Akzeptanz), zunehmender Smartphone-Verbreitung und dem einfachen UPI-ID-Konzept, das die Hürden für digitale Zahlungen abgebaut hat.',
      },
    ],
  },
}
