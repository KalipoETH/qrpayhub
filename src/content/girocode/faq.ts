import type { LocalizedContent, FAQContent } from '../types'

export const girocodeFAQContent: LocalizedContent<FAQContent> = {
  en: {
    title: 'GiroCode FAQ',
    description: 'Everything you need to know about GiroCode — from basics to technical details.',
    items: [
      {
        question: 'What is a GiroCode?',
        answer:
          'A GiroCode (also called EPC QR Code) is a standardized QR code for SEPA bank transfers. It encodes payment details — recipient name, IBAN, amount, and reference — so that banking apps can pre-fill a transfer form automatically when the code is scanned. It was developed by the European Payments Council (EPC) and is defined in specification EPC069-12.',
      },
      {
        question: 'Is GiroCode free to use?',
        answer:
          'Yes, generating and scanning GiroCodes is completely free. The EPC standard is open and royalty-free. QRPayHub generates GiroCodes entirely in your browser — no account, no subscription, no fees.',
      },
      {
        question: 'Which countries support GiroCode?',
        answer:
          'All 36 SEPA member countries support GiroCode: the 27 EU member states plus Switzerland, Norway, Iceland, Liechtenstein, the United Kingdom, Monaco, San Marino, Vatican City, and Andorra. Any bank in these countries that supports SEPA Credit Transfers also supports GiroCode.',
      },
      {
        question: 'Do I need a special app to scan a GiroCode?',
        answer:
          'No special app is needed. Most modern banking apps support scanning GiroCodes directly. In Germany, all major banks — Deutsche Bank, Sparkasse, Volksbank, ING, DKB, N26, Commerzbank, Comdirect and others — support it. Simply open your banking app, tap "Transfer" or "Scan QR code", and point the camera at the GiroCode.',
      },
      {
        question: 'Can I include a logo in my GiroCode?',
        answer:
          'The EPC standard does not officially support embedded logos. Some third-party generators allow adding logos by using a higher error correction level (Level Q or H), which reserves part of the code for the logo. However, this is not part of the official specification and may cause compatibility issues with some banking apps. For professional use, we recommend sticking to the standard format. girocodegenerator.com supports logo upload directly in the invoice PDF generator.',
      },
      {
        question: 'What is the maximum amount for a GiroCode?',
        answer:
          'The EPC standard supports amounts up to 999,999,999.99 EUR (just under one billion euros). The amount must be expressed as a decimal number with a dot separator — for example EUR12345.67. The amount field is optional; if omitted, the payer can enter any amount manually.',
      },
      {
        question: 'Is the BIC required?',
        answer:
          'Since version 002 of the standard (2016), the BIC is optional for SEPA transfers. Most modern banking apps can look up the bank from the IBAN alone. Version 001 required the BIC; version 002 does not. QRPayHub generates version 002 by default, making the BIC optional.',
      },
      {
        question: 'What is the difference between GiroCode and Swiss QR Code?',
        answer:
          'Swiss QR Code is a separate national standard used exclusively in Switzerland and Liechtenstein, defined by SIX Group. It has a different payload structure, includes a mandatory Swiss-specific "coding line", and requires a QR-IBAN (a special IBAN variant). GiroCode follows the EPC standard and works across all 36 SEPA countries. The two formats are not interchangeable.',
      },
      {
        question: 'Can I use GiroCode for international transfers outside SEPA?',
        answer:
          'No. GiroCode is exclusively for SEPA Credit Transfers within the SEPA zone. It cannot be used for transfers to non-SEPA countries (e.g. the United States, Japan or Australia). For international transfers outside SEPA, you would need a different payment format such as SWIFT.',
      },
      {
        question: 'What happens if the IBAN is invalid?',
        answer:
          'A good QR scanner or banking app will validate the IBAN automatically and show an error if it is invalid. QRPayHub validates IBANs using the official Mod-97 checksum algorithm before generating any QR code — you will see an error message immediately if the IBAN is incorrect.',
      },
      {
        question: 'Is GiroCode secure?',
        answer:
          'GiroCode itself is a data format, not a security mechanism. The security of the actual bank transfer is provided by your banking app and your bank. The payer always sees and must confirm all payment details before the transfer is executed. One risk to be aware of: a malicious actor could print a fake GiroCode on a real invoice and change the IBAN. Always verify payment details before confirming a transfer.',
      },
      {
        question: 'Does QRPayHub store my IBAN or payment data?',
        answer:
          "No. QRPayHub generates GiroCodes entirely in your browser (client-side). Your IBAN, recipient name, amount and reference never leave your device. No data is sent to our servers. You can verify this by checking your browser's network requests.",
      },
      {
        question: 'What size should the GiroCode be on a printed invoice?',
        answer:
          'The minimum recommended size is 2 cm × 2 cm. For better reliability, especially if the code will be printed at lower quality, 3 cm × 3 cm is preferable. Always include at least 2 mm of white quiet zone on all four sides. Do not use JPEG for printing — use PNG or vector format (SVG/PDF) to avoid compression artifacts.',
      },
      {
        question: 'How many characters can the payment reference contain?',
        answer:
          'The unstructured payment reference (line 11 of the payload) can contain up to 140 characters. For structured references (line 10, using the ISO 11649 creditor reference format), the maximum is also 35 characters. You can use one or the other, but not both simultaneously.',
      },
      {
        question: 'Which error correction level does GiroCode use?',
        answer:
          'The EPC specification recommends error correction level M (medium, ~15% recovery capacity). This is a good balance between QR code density and scan reliability. QRPayHub uses level M by default.',
      },
      {
        question: 'What is the difference between GiroCode version 001 and 002?',
        answer:
          'Version 001 required the BIC (bank identifier code) of the beneficiary bank. Version 002, introduced in 2016, made the BIC optional — since all SEPA banks can now be identified from the IBAN alone. Version 002 is recommended for all new implementations. QRPayHub generates version 002 by default.',
      },
      {
        question: 'Does GiroCode work offline?',
        answer:
          'The generation of GiroCodes works offline — the QR code is created entirely in your browser. The scanning side (your banking app) typically requires an internet connection to validate the IBAN and submit the transfer, but the scanning and pre-filling of the form can work without a connection.',
      },
      {
        question: 'Is there an API for generating GiroCodes programmatically?',
        answer:
          'A QRPayHub API is planned for a future release. In the meantime, you can generate GiroCodes programmatically using any QR code library (such as qrcode for Node.js or Python) by constructing the payload manually following the EPC069-12 specification. The payload is plain text and trivial to generate in any programming language.',
      },
      {
        question: 'Which invoice software supports GiroCode generation?',
        answer:
          'Many European invoicing platforms support GiroCode natively, including Lexware, sevDesk, FastBill, Debitoor, and Billomat. In Germany, the DATEV ecosystem also supports GiroCode. Microsoft Word and LibreOffice do not have built-in support, but you can generate a GiroCode here and embed it as an image.',
      },
      {
        question: 'Can GiroCode be used with currencies other than EUR?',
        answer:
          'Technically, the EPC specification allows other SEPA currencies (e.g. CHF for Swiss transfers within Switzerland). However, in practice, GiroCode is almost exclusively used for EUR transfers. The Swiss QR Code standard is the preferred format for CHF transfers in Switzerland.',
      },
      {
        question: 'Can I create a full invoice with a GiroCode embedded?',
        answer:
          'Yes! For a complete invoice PDF with an embedded GiroCode, check out girocodegenerator.com – a free tool specifically designed for freelancers and small businesses that generates professional invoices with GiroCode QR codes included.',
      },
      {
        question: 'What is the difference between qrpayhub.com and girocodegenerator.com?',
        answer:
          'qrpayhub.com covers all global QR payment standards (UPI, PIX, Swiss QR, PromptPay and more). girocodegenerator.com is a specialized tool focused exclusively on GiroCode/EPC for SEPA payments – it also offers invoice PDF generation with embedded GiroCode, which qrpayhub.com does not yet support.',
      },
      {
        question: 'Which tool should I use for my SEPA invoices?',
        answer:
          'If you only need GiroCode for European SEPA invoices and want a full invoice PDF, girocodegenerator.com is the better choice. If you need QR payment codes for multiple countries or standards, use qrpayhub.com.',
      },
      {
        question: 'Is GiroCode mandatory on invoices in Germany?',
        answer:
          'No, GiroCode is not legally mandatory on invoices in Germany. However, it is strongly recommended as it significantly reduces payment errors and speeds up the transfer process for your clients.',
      },
      {
        question: 'How do I add a GiroCode to my invoice in Word or Excel?',
        answer:
          'Generate the GiroCode QR code here, download it as PNG, and insert it into your Word or Excel document. For a fully automated invoice with embedded GiroCode, use girocodegenerator.com which handles the entire process in one step.',
      },
      {
        question: 'Can I use GiroCode for recurring payments?',
        answer:
          'GiroCode is designed for single credit transfers (SCT). For recurring payments, SEPA Direct Debit (SDD) is more appropriate. However, you can generate a new GiroCode for each invoice.',
      },
      {
        question: 'What is the difference between GiroCode and SEPA Instant?',
        answer:
          'GiroCode is a QR code format that encodes payment data for easy scanning. SEPA Instant is a transfer speed standard (funds arrive within 10 seconds). They are complementary – a GiroCode can initiate a SEPA Instant transfer if the bank supports it.',
      },
      {
        question: 'Does GiroCode work with online banking?',
        answer:
          'Most online banking portals in SEPA countries support uploading or scanning a GiroCode. However, the scan feature is more commonly available in mobile banking apps.',
      },
      {
        question: 'Can I generate GiroCodes in bulk for multiple invoices?',
        answer:
          'qrpayhub.com currently supports single code generation. For bulk generation, the Pro plan (coming soon) will support CSV upload. girocodegenerator.com also focuses on single invoice generation.',
      },
      {
        question: 'Is there an API for GiroCode generation?',
        answer:
          'qrpayhub.com will offer a REST API for GiroCode and all other payment standards as part of the API plan (coming soon). This allows you to integrate QR code generation directly into your invoicing software or ERP system.',
      },
    ],
  },
  de: {
    title: 'GiroCode FAQ',
    description: 'Häufig gestellte Fragen zum GiroCode – von den Grundlagen bis zu technischen Details.',
    items: [
      {
        question: 'Was ist ein GiroCode?',
        answer:
          'Ein GiroCode (auch EPC QR-Code genannt) ist ein standardisierter QR-Code für SEPA-Überweisungen. Er kodiert Zahlungsdaten – Empfängername, IBAN, Betrag und Verwendungszweck – sodass Banking-Apps das Überweisungsformular beim Scannen automatisch ausfüllen können. Er wurde vom European Payments Council (EPC) entwickelt und ist in der Spezifikation EPC069-12 definiert.',
      },
      {
        question: 'Ist die Nutzung von GiroCode kostenlos?',
        answer:
          'Ja, das Erstellen und Scannen von GiroCodes ist vollständig kostenlos. Der EPC-Standard ist offen und lizenzgebührenfrei. QRPayHub generiert GiroCodes vollständig in Ihrem Browser – ohne Konto, Abo oder Gebühren.',
      },
      {
        question: 'In welchen Ländern wird GiroCode unterstützt?',
        answer:
          'Alle 36 SEPA-Mitgliedsländer unterstützen GiroCode: die 27 EU-Mitgliedstaaten sowie die Schweiz, Norwegen, Island, Liechtenstein, das Vereinigte Königreich, Monaco, San Marino, Vatikanstadt und Andorra. Jede Bank in diesen Ländern, die SEPA-Überweisungen unterstützt, unterstützt auch GiroCode.',
      },
      {
        question: 'Benötige ich eine spezielle App zum Scannen eines GiroCodes?',
        answer:
          'Nein, eine spezielle App ist nicht notwendig. Die meisten modernen Banking-Apps unterstützen das Scannen von GiroCodes direkt. In Deutschland unterstützen alle großen Banken – Deutsche Bank, Sparkasse, Volksbank, ING, DKB, N26, Commerzbank, Comdirect und andere – GiroCode. Öffnen Sie einfach Ihre Banking-App, tippen Sie auf „Überweisung" oder „QR-Code scannen" und halten Sie die Kamera an den GiroCode.',
      },
      {
        question: 'Kann ich ein Logo in meinen GiroCode einbetten?',
        answer:
          'Der EPC-Standard unterstützt keine eingebetteten Logos. Einige Drittanbieter-Generatoren erlauben das Hinzufügen von Logos durch einen höheren Fehlerkorrekturlevel (Stufe Q oder H), der einen Teil des Codes für das Logo reserviert. Dies ist jedoch nicht Teil der offiziellen Spezifikation und kann bei einigen Banking-Apps zu Kompatibilitätsproblemen führen. Für den professionellen Einsatz empfehlen wir das Standardformat. girocodegenerator.com unterstützt den Logo-Upload direkt im Rechnungs-PDF-Generator.',
      },
      {
        question: 'Was ist der maximale Betrag für einen GiroCode?',
        answer:
          'Der EPC-Standard unterstützt Beträge bis zu 999.999.999,99 EUR (knapp eine Milliarde Euro). Der Betrag muss als Dezimalzahl mit Punkt als Trennzeichen angegeben werden – zum Beispiel EUR12345.67. Das Betragsfeld ist optional; wird es weggelassen, kann der Zahlende einen beliebigen Betrag manuell eingeben.',
      },
      {
        question: 'Ist die BIC-Angabe erforderlich?',
        answer:
          'Seit Version 002 des Standards (2016) ist die BIC für SEPA-Überweisungen optional. Die meisten modernen Banking-Apps können die Bank allein aus der IBAN ermitteln. Version 001 erforderte die BIC; Version 002 nicht mehr. QRPayHub generiert standardmäßig Version 002, die BIC ist daher optional.',
      },
      {
        question: 'Was ist der Unterschied zwischen GiroCode und Swiss QR Code?',
        answer:
          'Der Swiss QR Code ist ein separater nationaler Standard, der ausschließlich in der Schweiz und Liechtenstein verwendet wird und vom SIX Group definiert wurde. Er hat eine andere Payload-Struktur, enthält eine obligatorische schweizspezifische „Codierzeile" und erfordert eine QR-IBAN (eine spezielle IBAN-Variante). GiroCode folgt dem EPC-Standard und funktioniert in allen 36 SEPA-Ländern. Die beiden Formate sind nicht austauschbar.',
      },
      {
        question: 'Kann ich GiroCode für internationale Überweisungen außerhalb des SEPA-Raums nutzen?',
        answer:
          'Nein. GiroCode ist ausschließlich für SEPA-Überweisungen innerhalb des SEPA-Raums gedacht. Er kann nicht für Überweisungen in Nicht-SEPA-Länder (z. B. USA, Japan oder Australien) verwendet werden. Für internationale Überweisungen außerhalb des SEPA-Raums wird ein anderes Zahlungsformat wie SWIFT benötigt.',
      },
      {
        question: 'Was passiert, wenn die IBAN ungültig ist?',
        answer:
          'Ein guter QR-Scanner oder eine Banking-App validiert die IBAN automatisch und zeigt einen Fehler an, wenn sie ungültig ist. QRPayHub prüft IBANs mit dem offiziellen Mod-97-Prüfsummenalgorithmus, bevor ein QR-Code generiert wird – bei einer fehlerhaften IBAN erhalten Sie sofort eine Fehlermeldung.',
      },
      {
        question: 'Ist GiroCode sicher?',
        answer:
          'GiroCode selbst ist ein Datenformat, kein Sicherheitsmechanismus. Die Sicherheit der eigentlichen Überweisung wird durch Ihre Banking-App und Ihre Bank gewährleistet. Der Zahlende sieht immer alle Zahlungsdetails und muss diese bestätigen, bevor die Überweisung ausgeführt wird. Ein zu beachtendes Risiko: Ein böswilliger Akteur könnte einen gefälschten GiroCode auf einer echten Rechnung anbringen und die IBAN ändern. Überprüfen Sie daher stets die Zahlungsdetails, bevor Sie eine Überweisung bestätigen.',
      },
      {
        question: 'Speichert QRPayHub meine IBAN oder Zahlungsdaten?',
        answer:
          'Nein. QRPayHub generiert GiroCodes vollständig in Ihrem Browser (clientseitig). Ihre IBAN, der Empfängername, der Betrag und der Verwendungszweck verlassen Ihr Gerät nicht. Es werden keine Daten an unsere Server gesendet. Sie können dies überprüfen, indem Sie die Netzwerkanfragen Ihres Browsers kontrollieren.',
      },
      {
        question: 'Wie groß sollte der GiroCode auf einer gedruckten Rechnung sein?',
        answer:
          'Die empfohlene Mindestgröße beträgt 2 cm × 2 cm. Für bessere Zuverlässigkeit, insbesondere bei niedrigerer Druckqualität, sind 3 cm × 3 cm vorzuziehen. Halten Sie auf allen vier Seiten mindestens 2 mm weißen Rand (Ruhezone) ein. Verwenden Sie für den Druck kein JPEG – nutzen Sie PNG oder ein Vektorformat (SVG/PDF), um Kompressionsartefakte zu vermeiden.',
      },
      {
        question: 'Wie viele Zeichen kann der Verwendungszweck enthalten?',
        answer:
          'Der unstrukturierte Verwendungszweck (Zeile 11 des Payloads) kann bis zu 140 Zeichen enthalten. Bei strukturierten Referenzen (Zeile 10, nach dem ISO-11649-Gläubiger-Referenzformat) beträgt das Maximum 35 Zeichen. Es kann jeweils nur eine der beiden Varianten verwendet werden, nicht beide gleichzeitig.',
      },
      {
        question: 'Welchen Fehlerkorrekturlevel verwendet GiroCode?',
        answer:
          'Die EPC-Spezifikation empfiehlt den Fehlerkorrekturlevel M (mittlere Stufe, ca. 15 % Wiederherstellungskapazität). Dies ist ein guter Kompromiss zwischen QR-Code-Dichte und Scanzuverlässigkeit. QRPayHub verwendet standardmäßig Level M.',
      },
      {
        question: 'Was ist der Unterschied zwischen GiroCode Version 001 und 002?',
        answer:
          'Version 001 erforderte die BIC (Bankidentifikationscode) der begünstigten Bank. Version 002, eingeführt 2016, machte die BIC optional – da alle SEPA-Banken nun allein anhand der IBAN identifiziert werden können. Version 002 wird für alle neuen Implementierungen empfohlen. QRPayHub generiert standardmäßig Version 002.',
      },
      {
        question: 'Funktioniert GiroCode offline?',
        answer:
          'Die Generierung von GiroCodes funktioniert offline – der QR-Code wird vollständig in Ihrem Browser erstellt. Die Scan-Seite (Ihre Banking-App) benötigt in der Regel eine Internetverbindung, um die IBAN zu validieren und die Überweisung einzureichen, aber das Scannen und automatische Ausfüllen des Formulars kann auch ohne Verbindung funktionieren.',
      },
      {
        question: 'Gibt es eine API zur programmatischen Generierung von GiroCodes?',
        answer:
          'Eine QRPayHub-API ist für eine zukünftige Version geplant. In der Zwischenzeit können Sie GiroCodes programmatisch mit jeder QR-Code-Bibliothek (z. B. qrcode für Node.js oder Python) erstellen, indem Sie den Payload manuell nach der EPC069-12-Spezifikation zusammenstellen. Der Payload ist Klartext und lässt sich in jeder Programmiersprache problemlos generieren.',
      },
      {
        question: 'Welche Rechnungssoftware unterstützt die GiroCode-Generierung?',
        answer:
          'Viele europäische Rechnungsplattformen unterstützen GiroCode nativ, darunter Lexware, sevDesk, FastBill, Debitoor und Billomat. In Deutschland unterstützt auch das DATEV-Ökosystem GiroCode. Microsoft Word und LibreOffice haben keine integrierte Unterstützung, aber Sie können hier einen GiroCode generieren und als Bild einfügen.',
      },
      {
        question: 'Kann GiroCode auch mit anderen Währungen als EUR verwendet werden?',
        answer:
          'Technisch gesehen erlaubt die EPC-Spezifikation andere SEPA-Währungen (z. B. CHF für Schweizer Überweisungen innerhalb der Schweiz). In der Praxis wird GiroCode jedoch fast ausschließlich für EUR-Überweisungen genutzt. Der Swiss QR Code Standard ist das bevorzugte Format für CHF-Überweisungen in der Schweiz.',
      },
      {
        question: 'Kann ich eine vollständige Rechnung mit eingebettetem GiroCode erstellen?',
        answer:
          'Ja! Für ein vollständiges Rechnungs-PDF mit eingebettetem GiroCode empfehlen wir girocodegenerator.com – ein kostenloses Tool, das speziell für Freiberufler und Kleinunternehmen entwickelt wurde und professionelle Rechnungen mit GiroCode QR-Codes erstellt.',
      },
      {
        question: 'Was ist der Unterschied zwischen qrpayhub.com und girocodegenerator.com?',
        answer:
          'qrpayhub.com deckt alle globalen QR-Zahlungsstandards ab (UPI, PIX, Swiss QR, PromptPay und mehr). girocodegenerator.com ist ein spezialisiertes Tool, das sich ausschließlich auf GiroCode/EPC für SEPA-Zahlungen konzentriert – es bietet außerdem die PDF-Rechnungserstellung mit eingebettetem GiroCode, die qrpayhub.com noch nicht unterstützt.',
      },
      {
        question: 'Welches Tool sollte ich für meine SEPA-Rechnungen verwenden?',
        answer:
          'Wenn Sie GiroCode nur für europäische SEPA-Rechnungen benötigen und ein vollständiges Rechnungs-PDF wünschen, ist girocodegenerator.com die bessere Wahl. Wenn Sie QR-Zahlungscodes für mehrere Länder oder Standards benötigen, nutzen Sie qrpayhub.com.',
      },
      {
        question: 'Ist GiroCode auf Rechnungen in Deutschland Pflicht?',
        answer:
          'Nein, GiroCode ist auf Rechnungen in Deutschland nicht gesetzlich vorgeschrieben. Er wird jedoch ausdrücklich empfohlen, da er Zahlungsfehler deutlich reduziert und den Überweisungsprozess für Ihre Kunden beschleunigt.',
      },
      {
        question: 'Wie füge ich einen GiroCode in Word oder Excel in meine Rechnung ein?',
        answer:
          'Generieren Sie den GiroCode QR-Code hier, laden Sie ihn als PNG herunter und fügen Sie ihn in Ihr Word- oder Excel-Dokument ein. Für eine vollständig automatisierte Rechnung mit eingebettetem GiroCode nutzen Sie girocodegenerator.com, das den gesamten Prozess in einem Schritt erledigt.',
      },
      {
        question: 'Kann ich GiroCode für Dauerzahlungen verwenden?',
        answer:
          'GiroCode ist für einzelne Überweisungen (SCT) konzipiert. Für Dauerzahlungen ist SEPA-Lastschrift (SDD) besser geeignet. Sie können jedoch für jede Rechnung einen neuen GiroCode generieren.',
      },
      {
        question: 'Was ist der Unterschied zwischen GiroCode und SEPA Instant?',
        answer:
          'GiroCode ist ein QR-Code-Format, das Zahlungsdaten für einfaches Scannen kodiert. SEPA Instant ist ein Standard für die Überweisungsgeschwindigkeit (Gutschrift innerhalb von 10 Sekunden). Beide ergänzen sich – ein GiroCode kann eine SEPA-Instant-Überweisung auslösen, wenn die Bank dies unterstützt.',
      },
      {
        question: 'Funktioniert GiroCode auch im Online-Banking?',
        answer:
          'Die meisten Online-Banking-Portale in SEPA-Ländern unterstützen das Hochladen oder Scannen eines GiroCodes. Die Scan-Funktion ist jedoch häufiger in mobilen Banking-Apps verfügbar.',
      },
      {
        question: 'Kann ich GiroCodes für mehrere Rechnungen in großer Stückzahl generieren?',
        answer:
          'qrpayhub.com unterstützt derzeit die Einzelcode-Generierung. Für die Massenverarbeitung wird der Pro-Plan (demnächst verfügbar) einen CSV-Upload unterstützen. Auch girocodegenerator.com fokussiert sich auf die Einzelrechnungsgenerierung.',
      },
      {
        question: 'Gibt es eine API für die GiroCode-Generierung?',
        answer:
          'qrpayhub.com wird im Rahmen des API-Plans (demnächst verfügbar) eine REST-API für GiroCode und alle anderen Zahlungsstandards anbieten. Damit können Sie die QR-Code-Generierung direkt in Ihre Rechnungssoftware oder Ihr ERP-System integrieren.',
      },
    ],
  },
}
