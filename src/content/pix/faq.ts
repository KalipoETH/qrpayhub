import type { LocalizedContent, FAQContent } from '../types'

export const pixFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'PIX FAQ',
    description:
      '25 questions answered — from PIX keys and QR code format to transaction limits, CRC16 checksum and fraud protection.',
    items: [
      {
        question: 'What is PIX?',
        answer:
          "PIX is Brazil's instant payment system created by the Banco Central do Brasil (BCB). Launched in November 2020, it allows transfers and payments 24/7/365 in seconds, completely free for individuals. PIX is one of the fastest adopted payment systems in history.",
      },
      {
        question: 'What is a PIX key?',
        answer:
          'A PIX key (Chave PIX) is an identifier linked to your bank account. There are four types: CPF/CNPJ (tax registration number), phone number, email address, or a random key (chave aleatória – a UUID). You register keys in your banking app and share them instead of your account number.',
      },
      {
        question: 'How many PIX keys can I have?',
        answer:
          'Individuals (CPF) can register up to 5 PIX keys per bank account. Legal entities (CNPJ) can register up to 20 keys. You can have keys at multiple banks simultaneously.',
      },
      {
        question: 'Is PIX free?',
        answer:
          'PIX is free for individuals (pessoas físicas) for all transaction types. Businesses (pessoas jurídicas) may pay a small fee for receiving payments, depending on their bank.',
      },
      {
        question: 'What is the PIX transaction limit?',
        answer:
          'There is no fixed national PIX limit – each bank sets its own daily limits. Typical daytime limits are R$10,000–R$20,000 per transaction. Night limits (between 8pm and 6am) are lower (typically R$1,000) for security reasons.',
      },
      {
        question: 'What is a PIX QR Code?',
        answer:
          'A PIX QR Code encodes payment data in the EMV QR standard defined by Banco Central do Brasil. Static QR codes contain only the PIX key (amount entered by payer). Dynamic QR codes include a specific amount, reference and expiration – used for e-commerce and invoices.',
      },
      {
        question: 'What is the difference between static and dynamic PIX QR?',
        answer:
          'Static PIX QR contains the PIX key without a preset amount. Dynamic PIX QR (gerado via API) includes amount, transaction ID and expiration time. Dynamic QR is used for e-commerce checkouts and is generated fresh for each transaction.',
      },
      {
        question: 'Which apps support PIX?',
        answer:
          'All Brazilian banks with more than 500,000 active accounts are legally required to offer PIX. This includes Nubank, Itaú, Bradesco, Banco do Brasil, Caixa Econômica Federal, Santander, BTG, Inter, C6 Bank, PicPay, Mercado Pago and 700+ others.',
      },
      {
        question: 'What is a CPF and why is it used as a PIX key?',
        answer:
          "CPF (Cadastro de Pessoas Físicas) is Brazil's individual taxpayer registration number – an 11-digit number issued by the Receita Federal. Because every Brazilian adult has one, it's a natural identifier for PIX keys.",
      },
      {
        question: 'What is a CNPJ PIX key?',
        answer:
          "CNPJ (Cadastro Nacional da Pessoa Jurídica) is Brazil's 14-digit business registration number. Companies use their CNPJ as a PIX key to receive business payments – it's the equivalent of CPF but for legal entities.",
      },
      {
        question: 'How does CRC16 work in PIX QR codes?',
        answer:
          'PIX QR codes use CRC16-CCITT (polynomial 0x1021, initial value 0xFFFF) as a checksum to verify data integrity. The last 4 characters of every PIX payload are the CRC16 checksum in uppercase hexadecimal. Any modification to the payload invalidates the checksum.',
      },
      {
        question: 'What is the EMV QR format used by PIX?',
        answer:
          "PIX uses the EMV Merchant Presented QR Code specification (MPM), an international standard also used by Thailand's PromptPay, India's BharatQR and others. Data is encoded as TLV (Tag-Length-Value) fields with numeric 2-digit IDs.",
      },
      {
        question: 'Is PIX available outside Brazil?',
        answer:
          'PIX is currently a domestic Brazilian payment system. However, the Banco Central do Brasil has announced plans for international PIX connections, starting with partnerships with other Latin American central banks.',
      },
      {
        question: 'Can I receive PIX without a smartphone?',
        answer:
          'Yes. PIX can be received through internet banking on a computer. Some banks also offer basic PIX via SMS or USSD for feature phones.',
      },
      {
        question: 'What is Pix Cobrança?',
        answer:
          "Pix Cobrança is the official Brazilian term for PIX billing/invoicing. It uses dynamic PIX QR codes generated via the bank's API, allowing businesses to create payment requests with specific amounts, due dates and late fees.",
      },
      {
        question: 'How fast is PIX?',
        answer:
          'PIX transfers complete in seconds – typically under 10 seconds, 24 hours a day, 7 days a week, 365 days a year including holidays. This makes it significantly faster than TED (which has cut-off times) or DOC (which settles next day).',
      },
      {
        question: 'What replaced PIX in Brazil? (or what did PIX replace?)',
        answer:
          'PIX replaced TED (Transferência Eletrônica Disponível) and DOC (Documento de Ordem de Crédito) as the primary transfer methods in Brazil. Both TED and DOC had business-hours restrictions and fees, while PIX is free and instant 24/7.',
      },
      {
        question: 'What is the merchant name limit in PIX QR?',
        answer:
          "The merchant name in a PIX QR code is limited to 25 characters (uppercase). This name appears on the payer's screen when scanning. Choose a recognizable short version of your business name.",
      },
      {
        question: 'Can I cancel a PIX payment after sending?',
        answer:
          'In general, PIX payments cannot be reversed by the sender once confirmed. However, PIX Devolução allows the recipient to initiate a refund. In fraud cases, banks can request a special reversal through the Mecanismo Especial de Devolução (MED).',
      },
      {
        question: 'What is a chave aleatória (random PIX key)?',
        answer:
          'A random key (chave aleatória) is a UUID randomly generated by your bank – for example: 123e4567-e89b-12d3-a456-426614174000. It is useful when you do not want to share personal information (like CPF or phone number) as your PIX key.',
      },
      {
        question: 'Is PIX secure?',
        answer:
          'Yes. PIX uses the same security infrastructure as Brazilian internet banking (SPB – Sistema de Pagamentos Brasileiro). Payments require authentication in your banking app. The QR code itself contains no sensitive banking credentials.',
      },
      {
        question: 'What is the PIX night limit?',
        answer:
          'Between 8pm and 6am, Brazilian banks apply lower PIX limits (typically R$1,000 per transaction) for security. Users can request higher night limits through their banking app with a waiting period of up to 24 hours.',
      },
      {
        question: 'How does PIX compare to international wire transfers?',
        answer:
          'PIX is designed for domestic Brazilian transfers only. International wire transfers require SWIFT/SEPA. However, some fintechs allow PIX as a funding source for international transfers. PIX is instant and free; SWIFT takes 1–5 business days and has fees.',
      },
      {
        question: 'Is there an API for PIX QR generation?',
        answer:
          "qrpayhub.com will offer a REST API for PIX QR generation (coming soon). For full Pix Cobrança (dynamic billing), businesses need to integrate directly with their bank's PIX API.",
      },
      {
        question: 'How is PIX regulated?',
        answer:
          'PIX is regulated and operated by the Banco Central do Brasil (BCB). All financial institutions with 500,000+ active accounts are required to offer PIX. The BCB maintains the DICT (Diretório de Identificadores de Contas Transacionais) which maps PIX keys to bank accounts.',
      },
    ],
  },
  de: {
    title: 'PIX FAQ',
    description:
      '25 Fragen beantwortet – von PIX-Schlüsseln und QR-Format über Transaktionslimits und CRC16-Prüfsumme bis zum Betrugsschutz.',
    items: [
      {
        question: 'Was ist PIX?',
        answer:
          'PIX ist Brasiliens Sofortzahlungssystem, das vom Banco Central do Brasil (BCB) entwickelt wurde. Im November 2020 gestartet, ermöglicht es Überweisungen und Zahlungen 24/7/365 in Sekunden, vollständig kostenlos für Privatpersonen. PIX ist eines der am schnellsten adoptierten Zahlungssysteme in der Geschichte.',
      },
      {
        question: 'Was ist ein PIX-Schlüssel?',
        answer:
          'Ein PIX-Schlüssel (Chave PIX) ist eine Kennung, die mit Ihrem Bankkonto verknüpft ist. Es gibt vier Typen: CPF/CNPJ (Steuernummer), Telefonnummer, E-Mail-Adresse oder ein Zufallsschlüssel (Chave Aleatória – eine UUID). Sie registrieren Schlüssel in Ihrer Banking-App und teilen diese statt Ihrer Kontonummer.',
      },
      {
        question: 'Wie viele PIX-Schlüssel kann ich haben?',
        answer:
          'Privatpersonen (CPF) können bis zu 5 PIX-Schlüssel pro Bankkonto registrieren. Juristische Personen (CNPJ) können bis zu 20 Schlüssel registrieren. Sie können Schlüssel bei mehreren Banken gleichzeitig haben.',
      },
      {
        question: 'Ist PIX kostenlos?',
        answer:
          'PIX ist für Privatpersonen (pessoas físicas) bei allen Transaktionsarten kostenlos. Unternehmen (pessoas jurídicas) zahlen je nach Bank möglicherweise eine geringe Gebühr für den Empfang von Zahlungen.',
      },
      {
        question: 'Was ist das PIX-Transaktionslimit?',
        answer:
          'Es gibt kein festes nationales PIX-Limit – jede Bank legt ihre eigenen Tageslimits fest. Typische Tageslimits liegen bei R$10.000–R$20.000 pro Transaktion. Nachtlimits (zwischen 20:00 und 06:00 Uhr) sind aus Sicherheitsgründen niedriger (typischerweise R$1.000).',
      },
      {
        question: 'Was ist ein PIX QR-Code?',
        answer:
          'Ein PIX QR-Code kodiert Zahlungsdaten im EMV QR-Standard, der vom Banco Central do Brasil definiert wurde. Statische QR-Codes enthalten nur den PIX-Schlüssel (Betrag wird vom Zahlenden eingegeben). Dynamische QR-Codes enthalten einen bestimmten Betrag, eine Referenz und ein Ablaufdatum – verwendet für E-Commerce und Rechnungen.',
      },
      {
        question: 'Was ist der Unterschied zwischen statischem und dynamischem PIX QR?',
        answer:
          'Statischer PIX QR enthält den PIX-Schlüssel ohne voreingestellten Betrag. Dynamischer PIX QR (gerado via API) enthält Betrag, Transaktions-ID und Ablaufzeit. Dynamischer QR wird für E-Commerce-Checkouts verwendet und wird für jede Transaktion neu generiert.',
      },
      {
        question: 'Welche Apps unterstützen PIX?',
        answer:
          'Alle brasilianischen Banken mit mehr als 500.000 aktiven Konten sind gesetzlich zur Teilnahme an PIX verpflichtet. Dazu gehören Nubank, Itaú, Bradesco, Banco do Brasil, Caixa Econômica Federal, Santander, BTG, Inter, C6 Bank, PicPay, Mercado Pago und 700+ weitere.',
      },
      {
        question: 'Was ist eine CPF und warum wird sie als PIX-Schlüssel verwendet?',
        answer:
          'CPF (Cadastro de Pessoas Físicas) ist Brasiliens individuelle Steuernummer – eine 11-stellige Nummer der Receita Federal. Da jeder brasilianische Erwachsene eine hat, ist sie eine natürliche Kennung für PIX-Schlüssel.',
      },
      {
        question: 'Was ist ein CNPJ PIX-Schlüssel?',
        answer:
          'CNPJ (Cadastro Nacional da Pessoa Jurídica) ist Brasiliens 14-stellige Unternehmensregistrierungsnummer. Unternehmen verwenden ihre CNPJ als PIX-Schlüssel für den Empfang von Geschäftszahlungen – sie ist das Äquivalent zur CPF für juristische Personen.',
      },
      {
        question: 'Wie funktioniert CRC16 in PIX QR-Codes?',
        answer:
          'PIX QR-Codes verwenden CRC16-CCITT (Polynom 0x1021, Startwert 0xFFFF) als Prüfsumme zur Verifizierung der Datenintegrität. Die letzten 4 Zeichen jedes PIX-Payloads sind die CRC16-Prüfsumme in Großbuchstaben-Hexadezimal. Jede Änderung am Payload macht die Prüfsumme ungültig.',
      },
      {
        question: 'Was ist das EMV QR-Format von PIX?',
        answer:
          "PIX verwendet die EMV Merchant Presented QR Code Spezifikation (MPM), einen internationalen Standard, der auch von Thailands PromptPay, Indiens BharatQR und anderen verwendet wird. Daten werden als TLV-Felder (Tag-Länge-Wert) mit numerischen 2-stelligen IDs kodiert.",
      },
      {
        question: 'Ist PIX außerhalb Brasiliens verfügbar?',
        answer:
          'PIX ist derzeit ein inländisches brasilianisches Zahlungssystem. Der Banco Central do Brasil hat jedoch Pläne für internationale PIX-Verbindungen angekündigt, beginnend mit Partnerschaften mit anderen lateinamerikanischen Zentralbanken.',
      },
      {
        question: 'Kann ich PIX ohne Smartphone empfangen?',
        answer:
          'Ja. PIX kann über Internet-Banking am Computer empfangen werden. Einige Banken bieten auch grundlegendes PIX per SMS oder USSD für einfache Mobiltelefone an.',
      },
      {
        question: 'Was ist Pix Cobrança?',
        answer:
          'Pix Cobrança ist der offizielle brasilianische Begriff für PIX-Rechnungsstellung. Es verwendet dynamische PIX QR-Codes, die über die API der Bank generiert werden, und ermöglicht Unternehmen, Zahlungsanforderungen mit bestimmten Beträgen, Fälligkeitsdaten und Verzugszinsen zu erstellen.',
      },
      {
        question: 'Wie schnell ist PIX?',
        answer:
          'PIX-Überweisungen werden in Sekunden abgeschlossen – typischerweise unter 10 Sekunden, 24 Stunden am Tag, 7 Tage die Woche, 365 Tage im Jahr einschließlich Feiertagen. Das ist deutlich schneller als TED (mit Einreichungszeiten) oder DOC (Gutschrift am nächsten Tag).',
      },
      {
        question: 'Was hat PIX in Brasilien ersetzt?',
        answer:
          'PIX hat TED (Transferência Eletrônica Disponível) und DOC (Documento de Ordem de Crédito) als primäre Überweisungsmethoden in Brasilien ersetzt. Sowohl TED als auch DOC hatten Geschäftszeitbeschränkungen und Gebühren, während PIX kostenlos und rund um die Uhr sofort ist.',
      },
      {
        question: 'Was ist das Limit für den Händlernamen im PIX QR?',
        answer:
          'Der Händlername in einem PIX QR-Code ist auf 25 Zeichen begrenzt (Großbuchstaben). Dieser Name wird dem Zahlenden beim Scannen auf dem Bildschirm angezeigt. Wählen Sie eine erkennbare Kurzfassung Ihres Unternehmensnamens.',
      },
      {
        question: 'Kann ich eine PIX-Zahlung nach dem Senden stornieren?',
        answer:
          'Im Allgemeinen können PIX-Zahlungen vom Absender nach der Bestätigung nicht rückgängig gemacht werden. PIX Devolução erlaubt es jedoch dem Empfänger, eine Rückerstattung einzuleiten. In Betrugsfällen können Banken eine Sonderrückbuchung über den Mecanismo Especial de Devolução (MED) beantragen.',
      },
      {
        question: 'Was ist eine Chave Aleatória (zufälliger PIX-Schlüssel)?',
        answer:
          'Ein Zufallsschlüssel (Chave Aleatória) ist eine von Ihrer Bank zufällig generierte UUID – zum Beispiel: 123e4567-e89b-12d3-a456-426614174000. Er ist nützlich, wenn Sie keine persönlichen Informationen (wie CPF oder Telefonnummer) als PIX-Schlüssel teilen möchten.',
      },
      {
        question: 'Ist PIX sicher?',
        answer:
          'Ja. PIX verwendet dieselbe Sicherheitsinfrastruktur wie das brasilianische Internet-Banking (SPB – Sistema de Pagamentos Brasileiro). Zahlungen erfordern eine Authentifizierung in Ihrer Banking-App. Der QR-Code selbst enthält keine sensiblen Bankzugangsdaten.',
      },
      {
        question: 'Was ist das PIX-Nachtlimit?',
        answer:
          'Zwischen 20:00 und 06:00 Uhr wenden brasilianische Banken aus Sicherheitsgründen niedrigere PIX-Limits an (typischerweise R$1.000 pro Transaktion). Nutzer können über ihre Banking-App mit einer Wartezeit von bis zu 24 Stunden höhere Nachtlimits beantragen.',
      },
      {
        question: 'Wie unterscheidet sich PIX von internationalen Überweisungen?',
        answer:
          'PIX ist nur für inländische brasilianische Überweisungen konzipiert. Internationale Überweisungen erfordern SWIFT/SEPA. Einige Fintechs erlauben jedoch PIX als Finanzierungsquelle für internationale Transfers. PIX ist sofort und kostenlos; SWIFT dauert 1–5 Werktage und hat Gebühren.',
      },
      {
        question: 'Gibt es eine API für die PIX QR-Generierung?',
        answer:
          'qrpayhub.com wird eine REST-API für die PIX QR-Generierung anbieten (demnächst verfügbar). Für vollständiges Pix Cobrança (dynamische Rechnungsstellung) müssen Unternehmen direkt mit der PIX-API ihrer Bank integrieren.',
      },
      {
        question: 'Wie wird PIX reguliert?',
        answer:
          'PIX wird vom Banco Central do Brasil (BCB) reguliert und betrieben. Alle Finanzinstitute mit 500.000+ aktiven Konten sind zur Teilnahme an PIX verpflichtet. Der BCB pflegt das DICT (Diretório de Identificadores de Contas Transacionais), das PIX-Schlüssel auf Bankkonten abbildet.',
      },
    ],
  },
}
