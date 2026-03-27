Projektfreischaltung Screen – UX/UI Roadmap
🎯 Ziel des Screens
Nach Auswahl des Fachbetriebs soll der Kunde:
Verstehen, was genau freigeschaltet wird
Den Mehrwert klar erkennen
Den Preis akzeptieren
Mit einem Klick verbindlich freischalten
Der Screen ist kein Info-Screen – er ist ein Vertrauens- & Abschluss-Screen.
1️⃣ Layout-Struktur (Above the Fold, kein Scroll)
Mobile Frame 380px Breite
Fullscreen Hero mit Hintergrundbild (leicht blurred / dark overlay)
🧱 SECTION 1 — Header Bereich
Titel:
Projektfreischaltung
Font:
24–28px
Bold
zentriert
Subline:
„Jetzt exklusiv an geprüften Fachbetrieb weiterleiten.“
14–16px
leicht grau / 85% opacity
zentriert
Spacing großzügig (Premium Gefühl)
🧾 SECTION 2 — Projekt-Zusammenfassung Card
Weißer Glass/Card Look
Radius: 16
Shadow sehr subtil
Diese Card orientiert sich an deiner Preisübersicht.
Inhalt:
1. Visualisierung
kleines Thumbnail links
rechts:
„Visualisierung“
ca. 30.000 – 35.000 €
Divider
2. Investitionsrahmen
Icon (Chart)
„Investitionsrahmen“
ca. 30.000 – 35.000 €
Divider
3. Auswahl Fachbetrieb
Icon (User)
„Auswahl Fachbetrieb“
Name: „Gartenbau Meyer“
rechts grüner Check
👉 Ziel: Der Kunde sieht nochmal:
„Ja, das ist mein Projekt.“
Psychologischer Effekt: Reconfirmation
💳 SECTION 3 — Freischaltungs-Paket Card
Zweite große Card mit Fokus auf Preis.
Titel:
Projektfreischaltung – 49 €
Die „49 €“ in Grün (#1F7A4D) und größer.
Inhalt (Benefit Liste)
Mit grünen Check-Icons:
✓ Weiterleitung an geprüften Fachbetrieb
✓ Investitionsprüfung & Budgetbestätigung
✓ Exklusive Kontaktfreigabe
✓ Keine Massenanfragen
Untertext:
„Die Gebühr wird bei Beauftragung angerechnet.“
Sehr wichtig:
👉 Das nimmt Preisangst.
🟢 SECTION 4 — CTA
Großer Button (60px Höhe)
Text:
Projekt für 49 € freischalten
Grün (#1F7A4D)
Radius 18
Subtle Shadow
White Text
Bold
👉 Der Button ist der visuelle Anker.
🔁 Secondary Actions
Unterhalb:
„Zurück | Erst einmal absenden“
13px
Grauton
„absenden“ unterstrichen
🎨 Designprinzipien
Minimalistisch
Keine unnötigen Elemente.
Viel Weißraum
Premium-Effekt.
Klarer Kontrast
Grün nur für:
Preis
Checks
CTA
Keine Ablenkung
Kein Menü.
Kein Scroll.
Keine sekundären Angebote.
🧠 Psychologische Struktur
Reconfirmation des Projekts
Sicherheit durch „geprüft“
Exklusivität
Kleine Einmalgebühr
Anrechnung auf Beauftragung
Großer grüner Button
Das ist Conversion-Optimierung.
📐 Komponentenstruktur (für spätere Figma Umsetzung)
Frame
│
├── Background Image
├── Dark Overlay
│
├── Header
│ ├── Title
│ └── Subtitle
│
├── Card_ProjektSummary
│ ├── Row_Visualisierung
│ ├── Divider
│ ├── Row_Investition
│ ├── Divider
│ └── Row_Fachbetrieb
│
├── Card_Freischaltung
│ ├── Title + Preis
│ ├── Benefit_List
│ └── Hinweistext
│
├── Button_Primary
└── Secondary Links
📊 Optional (Fortgeschritten)
Du könntest später ergänzen:
Trust Badge („Geprüfte Betriebe seit 2014“)
Mini-FAQ ausklappbar
Zahlungsarten Logos
Aber nicht im ersten MVP.
🚀 Nutzerfluss danach
Button klick →
Payment Sheet / Stripe Checkout →
Erfolgs-Screen →
Status: „Projekt freigegeben“