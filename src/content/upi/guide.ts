import type { LocalizedContent, GuideContent } from '../types'

export const upiGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How UPI Works – Complete Guide to India's Payment System",
    description:
      "Everything about India's Unified Payments Interface: UPI IDs, QR format, apps and global expansion.",
    sections: [
      {
        id: 'what-is-upi',
        heading: 'What is UPI?',
        content:
          "UPI — the Unified Payments Interface — is India's national real-time payment system, developed and operated by the National Payments Corporation of India (NPCI) under the oversight of the Reserve Bank of India (RBI). Launched in April 2016, UPI has grown into the world's largest instant payment network by transaction volume, processing over 10 billion transactions per month as of 2026. It allows any two bank account holders to transfer money instantly, 24/7 including holidays, at zero cost to consumers, using a simple Virtual Payment Address (VPA) in the format username@bankhandle.",
      },
      {
        id: 'how-it-works',
        heading: 'How UPI Works – Step by Step',
        content:
          'A merchant displays a UPI QR code (static for any amount, or dynamic with a fixed amount). The customer opens any UPI app — PhonePe, Google Pay, Paytm, BHIM — scans the code, reviews the pre-filled payment details, and enters their UPI PIN to authorize. The NPCI infrastructure processes the transfer in real time and both parties receive instant confirmation. Funds move directly between bank accounts with no intermediary wallet involved.',
      },
      {
        id: 'upi-ids',
        heading: 'Understanding UPI IDs (Virtual Payment Address)',
        content:
          'A UPI ID (Virtual Payment Address / VPA) is the human-readable address of a bank account in the UPI system. The format is always username@bankhandle — for example john@okicici or 9876543210@paytm. The username can be a mobile number, name or custom string. The bank handle identifies the bank or payment app. One person can have multiple UPI IDs linked to different apps — all pointing to the same bank account. The UPI ID completely replaces the need to share account numbers and IFSC codes.',
      },
      {
        id: 'payload-format',
        heading: 'The UPI QR Payload Format',
        content:
          "A UPI QR code encodes a standard deep link using the upi://pay URI scheme, defined by the NPCI UPI Deep Link specification. Required parameters are pa (payee UPI ID) and pn (payee name). Optional parameters include am (amount in INR), cu (currency, always INR), tn (transaction note, max 50 chars), mc (4-digit Merchant Category Code) and tr (transaction reference). Example: upi://pay?pa=merchant@okhdfc&pn=Raj%20Stores&am=150.00&cu=INR&tn=Invoice%20001",
      },
      {
        id: 'static-vs-dynamic',
        heading: 'Static vs Dynamic QR Codes',
        content:
          'Static UPI QR codes contain only the payee UPI ID and name with no preset amount. The payer enters the amount manually — ideal for shops, restaurants and general use. The code can be printed once and used indefinitely. Dynamic QR codes include a specific amount and transaction reference, generated per transaction. They are ideal for invoices, e-commerce checkouts and POS terminals where automatic reconciliation is required.',
      },
      {
        id: 'apps-ecosystem',
        heading: 'The UPI App Ecosystem',
        content:
          "All UPI apps are fully interoperable — a payment from PhonePe lands instantly in an account linked to BHIM, Paytm or any banking app. There is no lock-in to any specific app. As of 2025, PhonePe leads with ~48% market share, followed by Google Pay (~37%), Paytm (~8%), BHIM (~3%) and Amazon Pay (~2%). Every major Indian bank also has its own UPI-enabled mobile banking app. All use the same NPCI infrastructure and accept QR codes from any source.",
      },
      {
        id: 'global-expansion',
        heading: "UPI's Global Expansion",
        content:
          "UPI is no longer limited to India. NPCI International has extended UPI acceptance to countries with large Indian diaspora communities: Singapore (linked to PayNow), UAE, Bahrain, France, UK, Mauritius, Nepal, Bhutan and more. Indian travellers can pay at Singapore merchants accepting PayNow QR codes using their UPI app — the transaction is settled in SGD from the Indian bank account in INR. The G20 mandate to interlink fast payment systems globally will further expand UPI's reach.",
      },
      {
        id: 'security',
        heading: 'Security & Privacy',
        content:
          "The UPI PIN is entered by the payer in their own banking app and is never encoded in the QR code or transmitted to the merchant. No charge can occur without the payer actively entering their PIN or biometric. A UPI QR contains only the UPI ID and name — no bank account details, no IFSC, no sensitive data. QRPayHub generates UPI QR codes entirely client-side: no payment data is sent to our servers. Failed transactions are automatically refunded within 24–48 hours per RBI guidelines.",
      },
    ],
  },
  de: {
    title: 'Wie UPI funktioniert – Vollständiger Guide zum indischen Zahlungssystem',
    description:
      'Alles über Indiens Unified Payments Interface: UPI-IDs, QR-Format, Apps und globale Expansion.',
    sections: [
      {
        id: 'what-is-upi',
        heading: 'Was ist UPI?',
        content:
          'UPI – das Unified Payments Interface – ist Indiens nationales Echtzeit-Zahlungssystem, das von der National Payments Corporation of India (NPCI) unter Aufsicht der Reserve Bank of India (RBI) entwickelt und betrieben wird. Seit dem Start im April 2016 ist UPI zum weltweit grössten Sofortzahlungsnetzwerk nach Transaktionsvolumen gewachsen und verarbeitet ab 2026 über 10 Milliarden Transaktionen pro Monat. Es ermöglicht beliebigen Bankkontoinhabern, rund um die Uhr – auch an Feiertagen – kostenlos Geld zu überweisen, und zwar über eine einfache virtuelle Zahlungsadresse (VPA) im Format nutzername@bankhandle.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie UPI funktioniert – Schritt für Schritt',
        content:
          'Ein Händler zeigt einen UPI QR-Code an (statisch für beliebige Beträge oder dynamisch mit festem Betrag). Der Kunde öffnet eine beliebige UPI-App – PhonePe, Google Pay, Paytm, BHIM – scannt den Code, prüft die vorausgefüllten Zahlungsdaten und gibt seine UPI-PIN zur Autorisierung ein. Die NPCI-Infrastruktur verarbeitet die Überweisung in Echtzeit; beide Parteien erhalten sofort eine Bestätigung. Das Geld wird direkt zwischen Bankkonten übertragen – ohne Zwischenspeicher in einer Wallet.',
      },
      {
        id: 'upi-ids',
        heading: 'UPI-IDs verstehen (Virtual Payment Address)',
        content:
          'Eine UPI-ID (Virtual Payment Address / VPA) ist die lesbare Adresse eines Bankkontos im UPI-System. Das Format lautet immer nutzername@bankhandle – zum Beispiel john@okicici oder 9876543210@paytm. Der Nutzername kann eine Mobilnummer, ein Name oder eine selbst gewählte Zeichenfolge sein. Der Bank-Handle identifiziert die Bank oder die Zahlungs-App. Eine Person kann mehrere UPI-IDs haben, die auf verschiedene Apps, aber dasselbe Bankkonto verweisen. Die UPI-ID ersetzt vollständig die Notwendigkeit, Kontonummern und IFSC-Codes weiterzugeben.',
      },
      {
        id: 'payload-format',
        heading: 'Das UPI QR Payload-Format',
        content:
          'Ein UPI QR-Code kodiert einen Standard-Deeplink nach dem URI-Schema upi://pay, das in der NPCI UPI Deep Link Spezifikation definiert ist. Pflichtparameter sind pa (Empfänger-UPI-ID) und pn (Empfängername). Optionale Parameter sind am (Betrag in INR), cu (Währung, immer INR), tn (Transaktionsnotiz, max. 50 Zeichen), mc (4-stelliger Händlerkategoriecode) und tr (Transaktionsreferenz). Beispiel: upi://pay?pa=merchant@okhdfc&pn=Raj%20Stores&am=150.00&cu=INR&tn=Invoice%20001',
      },
      {
        id: 'static-vs-dynamic',
        heading: 'Statische vs. dynamische QR-Codes',
        content:
          'Statische UPI QR-Codes enthalten nur die Empfänger-UPI-ID und den Namen ohne voreingestellten Betrag. Der Zahlende gibt den Betrag manuell ein – ideal für Geschäfte, Restaurants und den allgemeinen Gebrauch. Der Code kann einmal gedruckt und unbegrenzt verwendet werden. Dynamische QR-Codes enthalten einen festgelegten Betrag und eine Transaktionsreferenz und werden pro Transaktion generiert. Sie eignen sich für Rechnungen, E-Commerce-Checkouts und Kassensysteme, bei denen eine automatische Abstimmung erforderlich ist.',
      },
      {
        id: 'apps-ecosystem',
        heading: 'Das UPI App-Ökosystem',
        content:
          'Alle UPI-Apps sind vollständig interoperabel – eine Zahlung von PhonePe landet sofort auf einem Konto, das mit BHIM, Paytm oder einer beliebigen Banking-App verknüpft ist. Es gibt keine Bindung an eine bestimmte App. Stand 2025 führt PhonePe mit ca. 48 % Marktanteil, gefolgt von Google Pay (ca. 37 %), Paytm (ca. 8 %), BHIM (ca. 3 %) und Amazon Pay (ca. 2 %). Jede grosse indische Bank verfügt zudem über eine eigene UPI-fähige Mobile-Banking-App. Alle nutzen dieselbe NPCI-Infrastruktur und akzeptieren QR-Codes von beliebigen Quellen.',
      },
      {
        id: 'global-expansion',
        heading: 'Globale Expansion von UPI',
        content:
          'UPI ist nicht mehr auf Indien beschränkt. NPCI International hat die UPI-Akzeptanz auf Länder mit grosser indischer Diaspora ausgeweitet: Singapur (über PayNow), VAE, Bahrain, Frankreich, Vereinigtes Königreich, Mauritius, Nepal, Bhutan und weitere. Indische Reisende können bei Händlern in Singapur, die PayNow QR-Codes akzeptieren, mit ihrer UPI-App bezahlen – die Transaktion wird in SGD vom indischen Bankkonto in INR abgewickelt. Das G20-Mandat zur globalen Vernetzung von Schnellzahlungssystemen wird die Reichweite von UPI weiter ausbauen.',
      },
      {
        id: 'security',
        heading: 'Sicherheit & Datenschutz',
        content:
          'Die UPI-PIN wird vom Zahlenden in seiner eigenen Banking-App eingegeben und ist niemals im QR-Code codiert oder wird an den Händler übermittelt. Eine Belastung kann nur erfolgen, wenn der Zahlende aktiv seine PIN oder Biometrie eingibt. Ein UPI QR enthält nur die UPI-ID und den Namen – keine Bankdaten, keinen IFSC-Code, keine sensiblen Informationen. QRPayHub generiert UPI QR-Codes vollständig clientseitig: Es werden keine Zahlungsdaten an unsere Server gesendet. Fehlgeschlagene Transaktionen werden gemäss RBI-Richtlinien innerhalb von 24–48 Stunden automatisch zurückgebucht.',
      },
    ],
  },
}
