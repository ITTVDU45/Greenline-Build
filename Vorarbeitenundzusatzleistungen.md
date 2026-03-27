1) Ziel & Screen-Logik
Screen-Name: „Vorarbeiten & Zusatzleistungen (intern)“
Kontext: Auftrag hat stattgefunden → Handwerker war vor Ort → jetzt werden tatsächliche Vorarbeiten + Kundenwünsche dokumentiert → daraus ergibt sich Preis-Update.
Wichtig:
Bereich „Empfohlene Vorarbeiten“ (meist Standard/üblich) = vordefinierte Checkliste + Preise pro Position
Bereich „Zusatzarbeiten“ (optional) = freie Positionen (mit Preisfeld + Notiz + ggf. Range)
Ein dynamischer Preisblock (Zwischensummen, neue Gesamtsumme, Delta zum ursprünglichen Angebot)
CTA: „Für Kundenangebot freigeben“ + sekundär „Als Entwurf speichern“
Kennzeichnung „Intern – nicht sichtbar für Kunden“ (Badge)
2) Aufbau des Screens (modern, klar, mobil)
Header (Sticky)
Back-Arrow
Titel: GreenLine Build
rechts: Avatar/Profil
darunter: Badge „Intern – nicht sichtbar für Kunden“
Projekt-Intro
H1: „Projekt: Garten Müller – Vorarbeiten & Zusatzleistungen“
Subtitle: „Interne Einschätzung nach Besichtigung“
Optional rechts/klein: Datum + Status „Besichtigt“
Section A: Empfohlene Vorarbeiten (Standard)
Card-Gruppe pro Gewerk / Bereich (z. B. Terrasse, Rollrasen, Pflaster, Beet, Zaun)
Card-Header: Titel links („Terrasse“), Summe rechts („540 €“), Chevron (Details)
Darunter 3–6 Checkbox-Items mit:
Checkbox + Label
Preis rechts (fix oder editierbar)
Am Ende: „Zwischensumme Terrasse: 540 €“
Modernes UI-Detail:
Checkbox-Reihe als „List item“ mit 44–52px Höhe
Preis rechts monospace oder semibold für bessere Lesbarkeit
Divider zwischen Items sehr hell
Section B: Mögliche Zusatzarbeiten (optional)
Erklärungstext: „Nur bei Bedarf oder nach Rücksprache…“
Liste mit freien Positionen:
Checkbox links
Titel (z. B. „Mehr-Aushub wegen Bodenbeschaffenheit“)
optional: „Preis von ___ bis ___“ (Range) ODER „Preis: ___“
+ Position hinzufügen (Button/Link)
Notizfeld: „Notiz (intern) …“
Footer (Sticky)
Preisübersicht als kompakter Block:
„Zwischensumme Standard“
„Zwischensumme Zusatz“
„Neue Gesamtsumme“
optional: „Differenz zum Angebot: +___ €“
CTA Primary (vollbreit): Für Kundenangebot freigeben
Secondary (outline): Als Entwurf speichern
3) Datenfelder (damit’s später entwickelbar ist)
Je Position:
id
category (Terrasse/Rollrasen/…)
title
selected (bool)
pricingType = fixed | range | manual
price (number) oder minPrice/maxPrice
note optional
requiresApproval optional (wenn Zusatzarbeit „nur nach Rücksprache“)
Auf Screen-Level:
projectId
visitDate
internalNote
Summenfelder (computed)
4) Figma-Umsetzung (sauber & komponentenbasiert)
Frame & Grid
Frame: iPhone 13/14 (390×844) oder (375×812)
Layout: Auto Layout (Vertical), Padding 16, Gap 12
Design Tokens (Minimal-Set)
Colors:
Background: #F6F6F7 (sehr hell)
Card: #FFFFFF
Divider: #EAEAEE
Text Primary: #111827
Text Secondary: #6B7280
Badge Background: #F2F2F2
Primary Button: dunkles Grün/Blau (Brand)
Type:
H1 20–22 / Semibold
Section Title 16–18 / Semibold
Body 14–15 / Regular
Meta 12–13 / Regular
Radius:
Cards: 12–16
Buttons: 12–14
Komponenten (bitte wirklich als Components anlegen)
Badge / Chip (intern)
SectionHeader (Titel + optional Beschreibung)
WorkCard (Kategorie + Summe + Chevron)
CheckboxRow (Checkbox + Label + Preis)
AddonRow (Checkbox + Label + Preisfeld oder Range)
NoteField (TextArea)
StickyFooterSummary (Summen + Buttons)
