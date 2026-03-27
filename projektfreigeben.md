1) Zweck & Trigger (Flow-Logik)
Trigger: Handwerker klickt in “Anfragen/Projekt-Feed” auf ein Projekt → sieht Details, aber Kontaktdaten sind gesperrt.
Ziel: Handwerker soll Projekt annehmen und damit Kontaktfreigabe kaufen (Gebühr = 2% vom Basispreis).
Nach Zahlung: Kontaktdaten werden angezeigt + Projektstatus wechselt (z. B. “Angenommen / Kontakt freigegeben”).
2) Screen-Struktur (Layout wie Referenz)
A) Hintergrund / Hero
Full-screen Hintergrundbild (unscharf / leicht abgedunkelt), passend zu deinen bisherigen Screens (grün + clean).
Oben zentriert: Titel + Subtext.
Titel: „Projekt annehmen & Kontaktdaten freischalten“
Subtext: Kurz erklären: „Nach Annahme erhältst du die Kontaktdaten und kannst den Kunden direkt kontaktieren.“
B) Glas-/Card-Container (wie Referenz: “Frosted Glass”)
Zentrale große Card mit:
Mini-Visualisierung / Vorschaubild (links)
Rechts daneben Basispreis (ohne Vorarbeiten) groß als Zahl
Darunter mehrere Info-Zeilen mit Icons (wie Referenzbild)
3) Inhalte in der Card (Datenpunkte)
Pflichtfelder (für Klarheit)
Basispreis (ohne Vorarbeiten): z. B. 15.600 €
Gewählte Elemente (kompakt): „Terrasse, Pflaster, Pflanzung“
Projektstart (aus Nutzerangaben): „Sofort / 0–1 Monat / 1–3 Monate“
Region (PLZ + Stadt)
Match-Hinweis: „Dieses Projekt entspricht deinem Profil“ (Trust)
Monetarisierungsblock (unten in Card, sehr klar)
Projektvermittlung: 2%
Dynamische Berechnung:
fee = basispreis * 0.02
Anzeige groß: „= 312 €“
Hinweistext klein: „Die Gebühr wird bei Annahme des Projekts berechnet.“
4) CTA / Buttons (Conversion)
Primary CTA (unten als großer Button)
Label: „Projekt annehmen & Kontaktdaten freischalten“
Stil: Wie deine grünen Buttons (Radius 16, Schatten, leicht glossy optional)
Secondary
Link/Button: „Zurück“ (neutral, unterhalb oder links im Header)
5) Zustände (sehr wichtig für spätere Logik)
State 1: “Nicht freigeschaltet”
Kontaktdaten werden nicht angezeigt
CTA aktiv
Preisblock sichtbar
State 2: “Zahlung läuft”
Button disabled + Loading („Wird freigeschaltet…“)
State 3: “Freigeschaltet”
Neue Card oder Section: „Kontaktdaten“
Name, Telefon, E-Mail, Adresse (optional)
Zusätzlich:
CTA: „Chat starten“ / „Anrufen“
Projektstatus: „Angenommen“
6) UI-Details im Stil deiner Screens
Gleiche Farben:
DarkGreen Header #1a3c34
Primary Green #1F7A4D
LightGreen #e8f5e9
Cards: weiß/offwhite + border #e8e8e8
Abstände: 16/20 px consistent
„Glas-Effekt“ (Figma):
halbtransparentes Weiß + leichter Blur Look (optisch nachbauen über Opacity + Soft Shadow)
7) Datenmodell (für Cursor / später API)
Du brauchst im Screen diese Variablen:
projectId
basispreis
elements[]
startWindow
plz, city
feePercent = 0.02
feeAmount = round(basispreis * feePercent)
isUnlocked (boolean)
customerContact (nur wenn isUnlocked)
8) Next Step (was du danach bauen wirst)
Nach diesem Screen folgt:
Kontakt-Ansicht (Handwerker) (Telefon/E-Mail + Chat)
Optional: Ablauf-Status (angenommen → Termin → Angebot → beauftragt)