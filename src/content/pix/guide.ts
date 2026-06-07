import type { LocalizedContent, GuideContent } from '../types'

export const pixGuideContent: LocalizedContent<GuideContent> = {
  en: {
    title: "How PIX Works – Complete Guide to Brazil's Payment System",
    description:
      "Everything about Brazil's instant payment system: PIX keys, EMV QR payload, CRC16 checksum, supported banks and real-world usage.",
    sections: [
      {
        id: 'what-is-pix',
        heading: 'What is PIX?',
        content:
          "PIX is Brazil's national instant payment system, created and regulated by the Banco Central do Brasil (BCB). Launched on November 16, 2020, PIX achieved the fastest mass adoption of any payment system in history — reaching 100 million users in just 5 months and surpassing credit cards in transaction volume within its first year. PIX operates 24 hours a day, 7 days a week, 365 days a year — including weekends and public holidays. Transfers complete in under 10 seconds. For consumers, PIX is completely free. Over 700 financial institutions are legally required by the BCB to participate. As of 2026, PIX processes more than 3 billion transactions per month, making it one of the most active real-time payment networks on the planet. Unlike traditional bank transfers (TED/DOC) that required account numbers, branch codes, and could take hours or days, PIX is built around the Chave PIX (PIX key) — a simple identifier linked to a bank account.",
      },
      {
        id: 'how-it-works',
        heading: 'How PIX Works – Step by Step',
        content:
          'The recipient shares their PIX key (CPF, CNPJ, phone, email or random UUID) or displays a PIX QR code. The payer opens any Brazilian banking app, enters or scans the PIX key, confirms the amount and recipient name on screen, authenticates with biometric or PIN inside the app, and the transfer completes in seconds. Both parties receive instant push notifications and transaction receipts.',
      },
      {
        id: 'pix-keys',
        heading: 'PIX Keys Explained',
        content:
          "A Chave PIX (PIX key) is an alias registered in the BCB's DICT (Diretório de Identificadores de Contas Transacionais) that maps to a specific bank account. Instead of sharing branch and account numbers, you share your PIX key. Individuals can register up to 5 keys per bank account; companies up to 20. The random key (chave aleatória) is the privacy-preserving option — a UUID that reveals nothing about your identity, ideal for sharing publicly on social media or printed materials.",
      },
      {
        id: 'payload-emv',
        heading: 'The PIX QR Payload – EMV Format',
        content:
          'PIX QR codes follow the EMV Merchant Presented QR Code (MPM) specification — the same international standard used by Thailand\'s PromptPay and India\'s BharatQR. The BCB adapted this standard for Brazil via the Manual de Padrões para Iniciação do Pix. The payload is a continuous string of TLV (Tag-Length-Value) fields. Each field begins with a 2-digit tag ID, followed by a 2-digit length, then the value. Fields are concatenated without separators.',
      },
      {
        id: 'crc16',
        heading: 'CRC16 – The Integrity Check',
        content:
          'Every PIX QR payload ends with a CRC16-CCITT checksum — the last 4 characters of the string, always in uppercase hexadecimal (e.g. 6304ABCD). The "6304" prefix is the tag (63) and length (04) of the checksum field; the 4 hex characters that follow are the computed CRC value. The algorithm uses polynomial 0x1021 and initial value 0xFFFF. Any modification to the merchant name, PIX key or amount changes the checksum and causes banking apps to reject the payment.',
      },
      {
        id: 'supported-banks',
        heading: 'Supported Banks & Apps',
        content:
          'The BCB mandates that every Brazilian financial institution with 500,000 or more active accounts must offer PIX. As of 2026, this covers 700+ institutions. PIX is fully interoperable — a payment from any one of these apps lands instantly in any other. Beyond the major names, every regional cooperative bank, state bank, digital bank and licensed fintech in Brazil is part of the PIX ecosystem.',
      },
      {
        id: 'pix-vs-traditional',
        heading: 'PIX vs Traditional Brazilian Transfers',
        content:
          'Before PIX, Brazil had two primary electronic transfer methods: TED for same-day transfers during business hours, and DOC for next-day settlement. Both were fee-based and had operating-hours restrictions. PIX replaced both as the default everyday payment method. Boleto Bancário, while still used for scheduled billing, is increasingly being replaced by Pix Cobrança — dynamic PIX QR with a due date and late fee — which offers instant settlement.',
      },
      {
        id: 'security',
        heading: 'Security & Regulation',
        content:
          "PIX is regulated and operated by the Banco Central do Brasil, which sets technical standards, security requirements and participation rules. All PIX transactions flow through the BCB's SPI (Sistema de Pagamentos Instantâneos). Key security features: night limits (20:00–06:00) reduce fraud risk; sharing a PIX QR is safe as it contains only the PIX key and name — no bank account details; MED (Mecanismo Especial de Devolução) allows reversal of confirmed fraud; DICT maps every PIX key to a bank account centrally.",
      },
    ],
  },
  de: {
    title: 'Wie PIX funktioniert – Vollständiger Guide zum brasilianischen Zahlungssystem',
    description:
      'Alles über Brasiliens Sofortzahlungssystem: PIX-Schlüssel, EMV QR-Payload, CRC16-Prüfsumme, unterstützte Banken und Praxisbeispiele.',
    sections: [
      {
        id: 'what-is-pix',
        heading: 'Was ist PIX?',
        content:
          'PIX ist Brasiliens nationales Sofortzahlungssystem, das vom Banco Central do Brasil (BCB) geschaffen und reguliert wird. Gestartet am 16. November 2020 erreichte PIX die schnellste Massenadoption eines Zahlungssystems in der Geschichte – 100 Millionen Nutzer in nur 5 Monaten und mehr Transaktionsvolumen als Kreditkarten bereits im ersten Jahr. PIX läuft rund um die Uhr, 7 Tage die Woche, 365 Tage im Jahr – auch an Wochenenden und Feiertagen. Überweisungen dauern unter 10 Sekunden. Für Verbraucher ist PIX vollständig kostenlos. Über 700 Finanzinstitute sind vom BCB zur Teilnahme verpflichtet. Stand 2026 verarbeitet PIX über 3 Milliarden Transaktionen pro Monat und ist damit eines der aktivsten Echtzeit-Zahlungsnetzwerke der Welt. Anders als traditionelle Banküberweisungen (TED/DOC), die Kontonummern und Bankleitzahlen erforderten und Stunden oder Tage dauern konnten, basiert PIX auf der Chave PIX (PIX-Schlüssel) – einer einfachen Kennung, die mit einem Bankkonto verknüpft ist.',
      },
      {
        id: 'how-it-works',
        heading: 'Wie PIX funktioniert – Schritt für Schritt',
        content:
          'Der Empfänger teilt seinen PIX-Schlüssel (CPF, CNPJ, Telefon, E-Mail oder Zufalls-UUID) oder zeigt einen PIX QR-Code. Der Zahlende öffnet eine beliebige brasilianische Banking-App, gibt den PIX-Schlüssel ein oder scannt ihn, bestätigt Betrag und Empfängername auf dem Bildschirm, authentifiziert sich per Biometrie oder PIN in der App, und die Überweisung wird in Sekunden abgeschlossen. Beide Parteien erhalten sofortige Push-Benachrichtigungen und Transaktionsbelege.',
      },
      {
        id: 'pix-keys',
        heading: 'PIX-Schlüssel erklärt',
        content:
          'Eine Chave PIX (PIX-Schlüssel) ist ein Alias, der im DICT des BCB (Diretório de Identificadores de Contas Transacionais) registriert ist und auf ein bestimmtes Bankkonto verweist. Anstatt Filial- und Kontonummern weiterzugeben, teilen Sie Ihren PIX-Schlüssel. Privatpersonen können bis zu 5 Schlüssel pro Bankkonto registrieren; Unternehmen bis zu 20. Der Zufallsschlüssel (Chave Aleatória) ist die datenschutzfreundliche Option – eine UUID, die nichts über Ihre Identität verrät, ideal für die öffentliche Weitergabe in sozialen Medien oder auf gedruckten Materialien.',
      },
      {
        id: 'payload-emv',
        heading: 'Der PIX QR Payload – EMV-Format',
        content:
          'PIX QR-Codes folgen der EMV Merchant Presented QR Code (MPM)-Spezifikation – demselben internationalen Standard, der von Thailands PromptPay und Indiens BharatQR verwendet wird. Der BCB hat diesen Standard für Brasilien über das Manual de Padrões para Iniciação do Pix angepasst. Der Payload ist eine zusammenhängende Zeichenkette aus TLV-Feldern (Tag-Länge-Wert). Jedes Feld beginnt mit einer 2-stelligen Tag-ID, gefolgt von einer 2-stelligen Länge und dann dem Wert. Die Felder werden ohne Trennzeichen aneinandergereiht.',
      },
      {
        id: 'crc16',
        heading: 'CRC16 – Die Integritätsprüfung',
        content:
          'Jeder PIX QR-Payload endet mit einer CRC16-CCITT-Prüfsumme – den letzten 4 Zeichen der Zeichenkette, immer in Großbuchstaben-Hexadezimal (z. B. 6304ABCD). Das Präfix „6304" ist das Tag (63) und die Länge (04) des Prüfsummenfeldes; die 4 folgenden Hexzeichen sind der berechnete CRC-Wert. Der Algorithmus verwendet das Polynom 0x1021 und den Startwert 0xFFFF. Jede Änderung am Händlernamen, PIX-Schlüssel oder Betrag ändert die Prüfsumme und veranlasst Banking-Apps, die Zahlung abzulehnen.',
      },
      {
        id: 'supported-banks',
        heading: 'Unterstützte Banken & Apps',
        content:
          'Der BCB schreibt vor, dass jedes brasilianische Finanzinstitut mit 500.000 oder mehr aktiven Konten PIX anbieten muss. Stand 2026 umfasst dies 700+ Institute. PIX ist vollständig interoperabel – eine Zahlung von einer dieser Apps landet sofort in jeder anderen. Neben den großen Namen gehören alle regionalen Genossenschaftsbanken, staatlichen Banken, Digitalbanken und zugelassenen Fintechs in Brasilien zum PIX-Ökosystem.',
      },
      {
        id: 'pix-vs-traditional',
        heading: 'PIX vs. traditionelle brasilianische Überweisungen',
        content:
          'Vor PIX hatte Brasilien zwei primäre elektronische Überweisungsmethoden: TED für taggleiche Überweisungen während der Geschäftszeiten und DOC für die Abwicklung am nächsten Tag. Beide waren gebührenpflichtig und hatten Betriebszeitbeschränkungen. PIX hat beide als Standard-Zahlungsmethode abgelöst. Boleto Bancário wird zwar noch für geplante Rechnungsstellungen genutzt, wird aber zunehmend durch Pix Cobrança ersetzt – dynamischer PIX QR mit Fälligkeitsdatum und Verzugszinsen – der eine sofortige Abwicklung bietet.',
      },
      {
        id: 'security',
        heading: 'Sicherheit & Regulierung',
        content:
          'PIX wird vom Banco Central do Brasil reguliert und betrieben, der technische Standards, Sicherheitsanforderungen und Teilnahmeregeln festlegt. Alle PIX-Transaktionen laufen über das SPI des BCB (Sistema de Pagamentos Instantâneos). Wichtige Sicherheitsmerkmale: Nachtlimits (20:00–06:00) reduzieren das Betrugsrisiko; das Teilen eines PIX QR ist sicher, da er nur den PIX-Schlüssel und den Namen enthält – keine Bankdaten; MED (Mecanismo Especial de Devolução) ermöglicht die Rückbuchung bei bestätigtem Betrug; DICT bildet jeden PIX-Schlüssel zentral auf ein Bankkonto ab.',
      },
    ],
  },
}
