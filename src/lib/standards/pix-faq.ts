import type { AccordionItem } from '@/components/ui/Accordion';

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'what-is-pix',
    question: 'What is PIX?',
    answer:
      "PIX is Brazil's instant payment system created by the Banco Central do Brasil (BCB). Launched in November 2020, it allows transfers and payments 24/7/365 in seconds, completely free for individuals. PIX is one of the fastest adopted payment systems in history.",
  },
  {
    id: 'what-is-pix-key',
    question: 'What is a PIX key?',
    answer:
      'A PIX key (Chave PIX) is an identifier linked to your bank account. There are four types: CPF/CNPJ (tax registration number), phone number, email address, or a random key (chave aleatória – a UUID). You register keys in your banking app and share them instead of your account number.',
  },
  {
    id: 'how-many-pix-keys',
    question: 'How many PIX keys can I have?',
    answer:
      'Individuals (CPF) can register up to 5 PIX keys per bank account. Legal entities (CNPJ) can register up to 20 keys. You can have keys at multiple banks simultaneously.',
  },
  {
    id: 'is-pix-free',
    question: 'Is PIX free?',
    answer:
      'PIX is free for individuals (pessoas físicas) for all transaction types. Businesses (pessoas jurídicas) may pay a small fee for receiving payments, depending on their bank.',
  },
  {
    id: 'pix-transaction-limit',
    question: 'What is the PIX transaction limit?',
    answer:
      'There is no fixed national PIX limit – each bank sets its own daily limits. Typical daytime limits are R$10,000–R$20,000 per transaction. Night limits (between 8pm and 6am) are lower (typically R$1,000) for security reasons.',
  },
  {
    id: 'what-is-pix-qr',
    question: 'What is a PIX QR Code?',
    answer:
      'A PIX QR Code encodes payment data in the EMV QR standard defined by Banco Central do Brasil. Static QR codes contain only the PIX key (amount entered by payer). Dynamic QR codes include a specific amount, reference and expiration – used for e-commerce and invoices.',
  },
  {
    id: 'static-vs-dynamic',
    question: 'What is the difference between static and dynamic PIX QR?',
    answer:
      'Static PIX QR contains the PIX key without a preset amount. Dynamic PIX QR (gerado via API) includes amount, transaction ID and expiration time. Dynamic QR is used for e-commerce checkouts and is generated fresh for each transaction.',
  },
  {
    id: 'which-apps-support-pix',
    question: 'Which apps support PIX?',
    answer:
      'All Brazilian banks with more than 500,000 active accounts are legally required to offer PIX. This includes Nubank, Itaú, Bradesco, Banco do Brasil, Caixa Econômica Federal, Santander, BTG, Inter, C6 Bank, PicPay, Mercado Pago and 700+ others.',
  },
  {
    id: 'what-is-cpf',
    question: 'What is a CPF and why is it used as a PIX key?',
    answer:
      "CPF (Cadastro de Pessoas Físicas) is Brazil's individual taxpayer registration number – an 11-digit number issued by the Receita Federal. Because every Brazilian adult has one, it's a natural identifier for PIX keys.",
  },
  {
    id: 'what-is-cnpj-key',
    question: 'What is a CNPJ PIX key?',
    answer:
      "CNPJ (Cadastro Nacional da Pessoa Jurídica) is Brazil's 14-digit business registration number. Companies use their CNPJ as a PIX key to receive business payments – it's the equivalent of CPF but for legal entities.",
  },
  {
    id: 'how-crc16-works',
    question: 'How does CRC16 work in PIX QR codes?',
    answer:
      'PIX QR codes use CRC16-CCITT (polynomial 0x1021, initial value 0xFFFF) as a checksum to verify data integrity. The last 4 characters of every PIX payload are the CRC16 checksum in uppercase hexadecimal. Any modification to the payload invalidates the checksum.',
  },
  {
    id: 'emv-format',
    question: 'What is the EMV QR format used by PIX?',
    answer:
      "PIX uses the EMV Merchant Presented QR Code specification (MPM), an international standard also used by Thailand's PromptPay, India's BharatQR and others. Data is encoded as TLV (Tag-Length-Value) fields with numeric 2-digit IDs.",
  },
  {
    id: 'pix-outside-brazil',
    question: 'Is PIX available outside Brazil?',
    answer:
      'PIX is currently a domestic Brazilian payment system. However, the Banco Central do Brasil has announced plans for international PIX connections, starting with partnerships with other Latin American central banks.',
  },
  {
    id: 'pix-without-smartphone',
    question: 'Can I receive PIX without a smartphone?',
    answer:
      'Yes. PIX can be received through internet banking on a computer. Some banks also offer basic PIX via SMS or USSD for feature phones.',
  },
  {
    id: 'what-is-pix-cobranca',
    question: 'What is Pix Cobrança?',
    answer:
      "Pix Cobrança is the official Brazilian term for PIX billing/invoicing. It uses dynamic PIX QR codes generated via the bank's API, allowing businesses to create payment requests with specific amounts, due dates and late fees.",
  },
  {
    id: 'how-fast-is-pix',
    question: 'How fast is PIX?',
    answer:
      'PIX transfers complete in seconds – typically under 10 seconds, 24 hours a day, 7 days a week, 365 days a year including holidays. This makes it significantly faster than TED (which has cut-off times) or DOC (which settles next day).',
  },
  {
    id: 'what-pix-replaced',
    question: 'What replaced PIX in Brazil? (or what did PIX replace?)',
    answer:
      'PIX replaced TED (Transferência Eletrônica Disponível) and DOC (Documento de Ordem de Crédito) as the primary transfer methods in Brazil. Both TED and DOC had business-hours restrictions and fees, while PIX is free and instant 24/7.',
  },
  {
    id: 'merchant-name-limit',
    question: 'What is the merchant name limit in PIX QR?',
    answer:
      "The merchant name in a PIX QR code is limited to 25 characters (uppercase). This name appears on the payer's screen when scanning. Choose a recognizable short version of your business name.",
  },
  {
    id: 'cancel-pix-payment',
    question: 'Can I cancel a PIX payment after sending?',
    answer:
      'In general, PIX payments cannot be reversed by the sender once confirmed. However, PIX Devolução allows the recipient to initiate a refund. In fraud cases, banks can request a special reversal through the Mecanismo Especial de Devolução (MED).',
  },
  {
    id: 'random-pix-key',
    question: 'What is a chave aleatória (random PIX key)?',
    answer:
      'A random key (chave aleatória) is a UUID randomly generated by your bank – for example: 123e4567-e89b-12d3-a456-426614174000. It is useful when you do not want to share personal information (like CPF or phone number) as your PIX key.',
  },
  {
    id: 'is-pix-secure',
    question: 'Is PIX secure?',
    answer:
      'Yes. PIX uses the same security infrastructure as Brazilian internet banking (SPB – Sistema de Pagamentos Brasileiro). Payments require authentication in your banking app. The QR code itself contains no sensitive banking credentials.',
  },
  {
    id: 'pix-night-limit',
    question: 'What is the PIX night limit?',
    answer:
      'Between 8pm and 6am, Brazilian banks apply lower PIX limits (typically R$1,000 per transaction) for security. Users can request higher night limits through their banking app with a waiting period of up to 24 hours.',
  },
  {
    id: 'pix-vs-swift',
    question: 'How does PIX compare to international wire transfers?',
    answer:
      'PIX is designed for domestic Brazilian transfers only. International wire transfers require SWIFT/SEPA. However, some fintechs allow PIX as a funding source for international transfers. PIX is instant and free; SWIFT takes 1–5 business days and has fees.',
  },
  {
    id: 'pix-api',
    question: 'Is there an API for PIX QR generation?',
    answer:
      'qrpayhub.com will offer a REST API for PIX QR generation (coming soon). For full Pix Cobrança (dynamic billing), businesses need to integrate directly with their bank\'s PIX API.',
  },
  {
    id: 'pix-regulation',
    question: 'How is PIX regulated?',
    answer:
      'PIX is regulated and operated by the Banco Central do Brasil (BCB). All financial institutions with 500,000+ active accounts are required to offer PIX. The BCB maintains the DICT (Diretório de Identificadores de Contas Transacionais) which maps PIX keys to bank accounts.',
  },
];
