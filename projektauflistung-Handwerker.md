Screen: Handwerker – Alle zugeordneten Projekte
Ziel des Screens
Der Handwerksbetrieb sieht alle ihm zugewiesenen Projekte und kann:
Projekte schnell überblicken
ohne Umwege annehmen oder ablehnen (Schnellprüfung)
alle relevanten Meta-Infos direkt in der Projektkarte sehen
bei Annahme → ins Projekt springen
bei Ablehnung → begründet ablehnen (optional später)
👉 Fokus: Effizienz, Klarheit, keine Klick-Orgie
🧠 UX-Logik (wichtig fürs Verständnis)
Projektstatus (sichtbar als Badge)
🟡 Anfrage offen
🟢 Angenommen
🔴 Abgelehnt
🔵 In Bearbeitung (optional später)
Aktionen (nur wenn sinnvoll)
Status	Aktionen
Anfrage offen	Annehmen / Ablehnen / Projekt ansehen
Angenommen	Projekt öffnen
Abgelehnt	Details ansehen (read-only)
🧩 Aufbau des Screens (von oben nach unten)
1️⃣ Header
links: Firmenlogo
Mitte: „Willkommen, [Firmenname]“
Subtitle:
„Hier findest du alle dir zugeordneten Projekte.“
rechts: Avatar / Profil
2️⃣ Quick-Navigation (Tabs / Cards)
Zwei große Buttons (wie bei dir schon angelegt):
🟢 Alle Projekte
⚪ Aktive Projekte
➡️ „Alle Projekte“ ist dieser Screen
3️⃣ Hinweisbox (Vertrauen & Klarheit)
Neutral & beruhigend:
Hinweis
Dies sind Projektanfragen von Kunden.
Preise basieren auf ersten Angaben und können sich nach fachlicher Prüfung vor Ort ändern.
4️⃣ Projektliste (Cards – das Herzstück)
🔹 Projektkarte – Struktur
A) Card-Header
Projekttitel (z. B. Privatgarten)
rechts: Projektstatus-Badge
kleine Meta-Info:
Projektnummer (z. B. #001)
B) Projektbild
großes Bild (16:9)
leicht abgerundete Ecken
Bild dient nur zur Orientierung, nicht als Entscheidungszwang
C) Meta-Informationen (klar & scanbar)
Projektinfos (als Chips / kleine Labels):
Projekttyp: Terrasse, Rollrasen, Zaun, Gartenweg, Brunnen …
Gartentyp: Privatgarten / Gewerbegarten
Region / PLZ (optional, aber extrem wichtig für Handwerker)
Fläche (falls vorhanden)
Zeitrahmen (z. B. „gewünscht: innerhalb 4 Wochen“)
👉 Alles sichtbar, ohne Projekt zu öffnen
D) Preisblock (zentral!)
Label: „Geschätzter Preis“
Highlight-Box:
4.800 € – 6.200 €
(optional darunter klein:)
Endpreis nach Vor-Ort-Prüfung
E) Schnellaktionen (CTA-Zone)
Wenn Status = Anfrage offen:
🟢 Annehmen
🔴 Ablehnen
⚪ Projekt ansehen
Wenn Status = angenommen:
🔵 Projekt öffnen
Buttons:
groß genug für mobile
klare Farbsemantik (grün = ja, rot = nein)
🎨 Design-Prinzipien (modern & handwerker-tauglich)
Große Cards
klare Farben
Preise immer hervorgehoben
keine versteckten Infos
Mobile First
wenig Text, viel Struktur
🧩 Figma-Umsetzung (sauber & skalierbar)
Frame
iPhone 14 – 390×844
Vertical Auto Layout
Padding 16
Gap 12
Background #F6F6F7
Komponenten (zwingend!)
HB/ProjectCard
HB/ProjectHeader
HB/MetaChips
HB/PriceRange
HB/ActionBar
HB/StatusBadge
HB/InfoBox
(HB = Handwerker Board)