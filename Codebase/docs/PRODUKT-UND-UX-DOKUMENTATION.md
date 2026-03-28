# GreenLine Build – Produkt-, UI-, UX- und Flow-Dokumentation

Diese Dokumentation beschreibt das **Produktkonzept**, die **Nutzerführung**, die **Seitenlogik** und die **Gestaltungsprinzipien** der Anwendung im Ordner `Codebase/`. Sie richtet sich an Kundinnen und Kunden, Designerinnen und Designer, Entwicklungsteams sowie Stakeholder – **ohne** Programmierdetailtiefe.

**Technische Referenz** (Stack, Build, Browser-Speicher, Routenliste): siehe [KUNDEN-HANDBUCH.md](./KUNDEN-HANDBUCH.md).

---

## 1. Projektüberblick

### Kurzbeschreibung des Produkts

GreenLine Build ist eine **digitale Begleitung** für Menschen, die ihren Garten oder ihre Außenfläche planen und umsetzen möchten. Die Anwendung führt von der ersten Orientierung über **Flächenerfassung**, **Auswahl von Gartenelementen** (Terrasse, Rasen, Gartenhaus, Brunnen, Wege) und **Material- sowie Zusatzoptionen** bis zu einer **transparenten Investitionsübersicht**, **KI-gestützten Visualisierungen** und der **Vereinbarung eines Vor-Ort-Termins** mit einem **geprüften Fachbetrieb**. Parallel dazu sind **Ansichten für Handwerksbetriebe** vorgesehen: Übersichten über Anfragen und Projekte, Annahme mit Freischaltung von Kontaktdaten, interne Vorarbeiten und Austausch mit dem Kunden.

### Ziel des Produkts

Das Produkt soll **Komplexität reduzieren**: Statt vieler lose Gespräche und unklarer Preisbilder erhalten Nutzerinnen und Nutzer einen **strukturierten Pfad**, nachvollziehbare Zwischenstände und klare Erwartungen dazu, was vor Ort noch abgestimmt wird. Für Betriebe soll die Plattform **qualifizierte Anfragen** bündeln und **Status, Umfang und Preisrahmen** auf einen Blick erfassbar machen.

### Welche Probleme werden gelöst?

- **Unsicherheit vor dem Start:** Nutzer wissen oft nicht, welche Informationen ein Betrieb braucht; der Flow sammelt sie schrittweise.
- **Fehlende Transparenz:** Investitionsübersicht und Hinweise zu Vorarbeiten machen deutlich, dass Preise zunächst Schätzungen sind und sich nach fachlicher Prüfung verfeinern.
- **Bruch zwischen Inspiration und Umsetzung:** KI-Visualisierungen und Paketwahl verbinden emotionales „So könnte es aussehen“ mit konkreten nächsten Schritten.
- **Koordination:** Terminwahl, Chat-Stellen und Projekt-Detailansichten unterstützen Abstimmung zwischen Kundin, Plattform und Handwerker.

### Zielgruppen

| Zielgruppe | Rolle in der App |
|------------|------------------|
| **Endkundin / Endkunde** | Konfiguriert das Projekt, sieht Preisrahmen und Visualisierungen, wählt Qualität und Betrieb, bucht Termin, verfolgt Fortschritt. |
| **Handwerksbetrieb** | Sieht Anfragen und Projekte, kann annehmen (mit Freischaltungsgebühr), erhält Kontaktdaten, plant Vorarbeiten, kommuniziert mit dem Kunden. |
| **Plattform / GreenLine Build (konzeptionell)** | Vermittelt, erklärt, visualisiert; Chat mit GreenLine Build vor dem Termin beim Betrieb (im Prototyp als Dialog dargestellt). |
| **Administration** | In diesem Prototyp **nicht** als eigene Oberfläche ausgeprägt; konzeptionell für Freigaben, Betriebsprüfung und Stammdaten vorgesehen. |

### Mehrwert der Plattform

Für **Nutzer:** weniger Überforderung, klare Reihenfolge, sichtbarer Fortschritt, emotionaler Anker durch Bilder, verbindliche Einordnung durch Hinweiskarten („Vor-Ort-Termin“, „Fachbetrieb“).

Für **Betriebe:** strukturierte Anfragen, geschätzte Preisspannen, Status und Tags, spätere direkte Kundenkommunikation nach Freischaltung.

---

## 2. Produktlogik und Grundidee

### Zentrale Idee

Das Produkt behandelt Gartengestaltung wie ein **konfigurierbares Vorhaben**: Zuerst wird der **Kontext** geklärt (Projektart, Fläche, Analyse), dann der **Wunschumfang** (Elemente, Materialien, Extras), dann **Zusammenfassung und Commitment** (Paket, Visualisierung), anschließend **Matching** (Qualitätsstufe, konkreter Betrieb) und **Terminierung**, bevor **Investition und Freigabe** die Brücke zum Markt schlagen.

### Wie der Nutzer geführt wird

Die Führung erfolgt über **lineare Hauptpfade** mit **Fortschrittsanzeige** („Seite X von Y“ und Balken), **Hinweiskarten** (Erklärung, warum etwas nur Orientierung ist), **primären und sekundären Aktionen** (Weiter / Zurück, Später entscheiden) und **visuellen Ankern** (Hero-Bilder, Karten mit Thumbnails, Kalender, Zeitslots). Nach der Konfiguration mehrerer Elemente wiederholen sich **Material- und Extras-Schritte pro Element** – die Logik ist immer dieselbe, nur der Inhalt wechselt; das reduziert kognitive Last.

### Verbindung der Bausteine

- **Anfrage / Konfiguration:** Projekttyp und Features legen fest, welche Fragen und Optionen relevant sind.
- **Preisermittlung (im Prototyp):** Die Investitionsübersicht addiert **positionsweise Demo-Beträge** je gewähltem Element; Qualitätsstufe und Stundenspannen sind **parallel** erklärt, ohne dieselbe Formel wie in einem späteren Zielmodell zu erzwingen (siehe Abschnitt 9).
- **Projektübersicht (Dashboard):** Gespeicherte Projekte mit Status; Einstieg in den Flow pro Projekt.
- **Handwerkeransicht:** Spiegelung aus Betriebssicht – Karten mit Status, Preisrahmen, Element-Tags; Detail- und Annahme-Flows.

### Automatisierung, Klarheit, Einfachheit, visuelle Führung

**Automatisierung** zeigt sich als „Analyse“, Kalenderlogik, gespeicherte Auswahl und Fortschrittsberechnung (konzeptionell ausbaubar zu echter KI/Backend-Anbindung). **Klarheit** entsteht durch wiederkehrende Muster (gleiche Fußzeilen-Buttons, gleiche Card-Typen). **Einfachheit** durch Begrenzung der Entscheidungen pro Screen (z. B. ein Kalendermonat, eine Qualitätswahl, klare Paket-Zweiwege). **Visuelle Führung** durch Grün/Navy als Markenfarben, Hervorhebung des empfohlenen Pakets und Statusfarben bei Handwerker-Karten.

---

## 3. Analyse des User Flows

### Einstieg und Startpunkt

**Rollenauswahl (`/`):** Zwei Karten – **Kundensicht** (Link zu `/landing`) und **Handwerkersicht** (Link zu `/handwerker-login`). **Ziel:** Klare Trennung der Demo-Perspektiven. **UX:** Farbakzente (Grün / Navy) orientieren sich an der Markenlogik.

**Marketing-Landing (`/landing`):** Der Nutzer sieht Marke, Nutzenversprechen, Vorher/Nachher-Visualisierung, drei Nutzenkarten und den Einstieg „Projekt starten“ sowie „Anmelden“. Dezenter Link **„← Zurück“** zur Rollenauswahl (`/`). **Ziel:** Vertrauen und nächster Schritt für die Kundenreise. **UX:** Emotionaler Hook, dann Login.

**Login (`/login`):** Demonstrationsmaskenfelder; „Anmelden“ führt in den Konfigurationsflow (`/projekt-auswahl`). „Registrieren“ führt zurück zur Rollenauswahl (`/`). **Zurück** im Flow logisch nach `/landing`. **Hinweis:** Echte Authentifizierung ist im Prototyp nicht umgesetzt.

**Handwerker-Login (`/handwerker-login`):** Gleiche Bildschirmstruktur wie Kunden-Login (Figma Frame 30); „Anmelden“ führt zu **Projekt annehmen** (`/handwerker-projekt-annehmen`, Figma Frame 66 / 451:314). „Zur Rollenauswahl“ führt nach `/`.

**Dashboard (`/dashboard-aktualisiert`):** Persönliche Begrüßung, Hinweis zu einem gestarteten Projekt, Liste **aktueller Projekte** mit Status und Ort. Klick auf ein Projekt **lädt den gespeicherten Flow** für dieses Projekt und navigiert zu `/projekt-auswahl`. **Ziel:** Wiederkehrer und Mehrprojekt-Szenario. **UX:** Wiederaufnehmen ohne Konfiguration zu verlieren (technisch über Browser-Speicher, siehe Handbuch).

### Kernflow (Kundin) – mit Fortschrittslogik

Die App berechnet die **Seitenzahl** dynamisch: Pro gewähltem Gartenelement kommen **zwei Seiten** (Material, Extras) hinzu. Im Folgenden die **inhaltliche** Reihenfolge; die **Nummerierung „Seite X/Y“** passt sich automatisch an.

1. **Projekttyp (`/projekt-auswahl`)**  
   **Ziel:** Rahmen setzen (Privat-, Gewerbe-, Hotelgarten, Schrebergarten, Terrasse/Dachterrasse, Balkon).  
   **Inhalt:** Karten mit Bild, Titel, Kurzbeschreibung; Hinweis, dass die Wahl die weiteren Fragen steuert.  
   **Entscheidung:** Eine Projektart.  
   **Übergang:** Weiter → Fläche erfassen.  
   **UX:** Große, bildliche Karten erleichtern schnelle Zuordnung ohne Fachjargon.

2. **Fläche erfassen (`/flaeche-erfassen`)**  
   **Ziel:** Datengrundlage für Realismus der Planung.  
   **Inhalt:** Foto-Upload-Bereich (UI), empfohlener **AR-Scan** mit Zeitangabe.  
   **Entscheidung:** Fotos und/oder Scan (im Prototyp nicht technisch durchgespielt).  
   **Übergang:** Weiter → Analyse.  
   **UX:** Empfehlungs-Badge lenkt zur vermeintlich besten Methode.

3. **Analyse (`/analyse`)**  
   **Ziel:** Vertrauen in „System hat mitgedacht“.  
   **Inhalt:** Hero-Bild, Fläche (Demo: 85 m²), indikative Mengen, Hinweis dass Preise **später** kommen.  
   **Entscheidung:** Akzeptanz der Plausibilität.  
   **Übergang:** Weiter → Feature-Auswahl.  
   **UX:** Trennung Technik (hier) vs. Preis (später) vermeidet Früh-Überforderung.

4. **Feature-Auswahl (`/feature-auswahl`)**  
   **Ziel:** Umfang wählen.  
   **Inhalt:** Ausgangsbild, Hinweis zu Vorarbeiten, Liste Terrasse / Rollrasen / Gartenhaus / Brunnen / Gartenweg – **Mehrfachauswahl**, mindestens eines bleibt aktiv.  
   **Entscheidung:** Welche Bausteine das Projekt hat.  
   **Übergang:** Weiter → Material des **ersten** Elements.  
   **UX:** Mehrfachauswahl spiegelt reale kombinierte Projekte; Mindestauswahl verhindert leeren Zustand.

5. **Schleife: Material (`/gestaltung-material`) und Extras (`/gestaltung-extras`)**  
   **Ziel:** Pro Element Größe/Maße, Material und optionale Zusatzleistungen festhalten.  
   **Material:** Eingabefeld für Maßzahl, Raster aus Materialkarten, Option „Egal, überrasche mich“.  
   **Extras:** Multi-Select, teils reich illustrierte Karten mit Kurzcopy.  
   **Navigation:** Nach Extras entweder **nächstes Element** (wieder Material) oder, wenn alle durch, **Zusammenfassung**.  
   **UX:** Wiederholung pro Element trainiert das Muster; Hinweise verweisen durchgängig auf den Vor-Ort-Termin als Feinjustierung.

6. **Auswahl-Zusammenfassung (`/auswahl-zusammenfassung`)**  
   **Ziel:** Review vor kostenpflichtigen oder bindenderen Schritten.  
   **Inhalt:** Tags für Elemente, Materialien mit Maßen, Extras; **statische Projektbeschreibung** (Prototyp); Bestätigungskarte.  
   **Entscheidung:** Passt alles?  
   **Übergang:** Weiter → Paketwahl.  
   **UX:** Transparenz und Commitment; reduktiert spätere Reklamationen („Ich wusste nicht …“).

7. **Paketpreise (`/paket-auswahl`)**  
   **Ziel:** Monetäres Commitment auf Plattform-Ebene.  
   **Inhalt:** Zwei Pakete – **Projekt realisieren** (59 €, empfohlen) vs. **Nur Visualisierung** (29 €); Nutzenlisten; Zahlungsmethoden-Band.  
   **Entscheidung:** Tiefe der Leistung.  
   **Übergang:** Beide führen (im Prototyp) zu Visualisierung – konzeptionell unterschiedliche Leistung nach Zahlung denkbar.  
   **UX:** Empfehlung erhöht Anteil Vollpaket; klare Preisanker.

8. **Visualisierung (`/visualisierung-vorschau`)**  
   **Ziel:** Emotionale Bestätigung und Feinschliff.  
   **Inhalt:** Vorher-Bild, zwei KI-Varianten (Lightbox), Checklisten „Was berücksichtigt wurde“ / „Was vor Ort geklärt wird“, Chat-Einstieg zu GreenLine Build.  
   **Entscheidung:** Variante ansehen, ggf. Rückweg zur Auswahl, Chat nutzen.  
   **Übergang:** Zur Qualitätsauswahl.  
   **UX:** Erwartungsmanagement (vor Ort wird es präzise); Chat als Sicherheitsventil vor Termin beim Betrieb.

9. **Qualitätsstufe & Handwerker (`/qualitaetsstufe`)**  
   **Ziel:** Passende Leistungs- und Preisbandbreite sowie konkreter Betrieb für den Termin.  
   **Inhalt:** Drei Stufen (Standard / Komfort / Vollprofi) mit Stundenspannen; drei Betriebskarten mit Bewertung, Erfahrung, Skills.  
   **Entscheidung:** Stufe + Betrieb.  
   **Übergang:** Termine.  
   **UX:** Qualität zuerst, dann konkreter Mensch/Betrieb – klassisches „Segment → Auswahl“-Muster.

10. **Termin Datum (`/termin-datum`, Alias `/termin-buchung`)**  
    **Ziel:** Tag wählen.  
    **Inhalt:** Zusammenfassung Qualität/Betrieb, Profilkarte, Kalender (März 2026, gesperrte Tage grau).  
    **Übergang:** Weiter → Uhrzeit.

11. **Termin Uhrzeit (`/termin-uhrzeit`)**  
    **Ziel:** Slot wählen.  
    **Inhalt:** Gewähltes Datum, Raster mit deaktivierten Slots.  
    **Übergang:** Weiter → Investitionsübersicht.  
    **UX:** Termin **vor** finaler Investitionsansicht spiegelt „Erst Termin sichern, dann Kosten noch einmal im Kontext sehen“ – oder umgekehrt Argumentation: Kosten sind bereits bekannt, Termin ist nächster konkreter Schritt; beides ist vertretbar und sollte in einer Live-Version mit Business-Regeln abgestimmt werden.

12. **Investitionsübersicht (`/investitionsuebersicht`)**  
    **Ziel:** Zahlen transparent machen.  
    **Inhalt:** Hero-Visualisierung, Liste gewählter Elemente mit Einzelbeträgen und Summe („Basispreis“ im Screen), Hinweis zu Vorarbeiten.  
    **Übergang:** Projektfreischaltung oder Dashboard (Später).

13. **Projektfreischaltung (`/projektfreischaltung`)**  
    **Ziel:** Expliziter Schritt vor Weitergabe an Betriebe.  
    **Inhalt:** Erklärung was passiert, Statuskarte, Hinweis dass keine „neuen“ Funktionen starten, sondern Stand übergeben wird.  
    **Übergang:** Freigabe → Dashboard.

### Nachgelagerte und parallele Pfade (Kunde)

- **Projekt Details (`/projekt-details`):** Fortschritt und Checklisten (nur Anzeige im Prototyp).  
- **Chat mit GreenLine Build (`/chat-kunde-handwerker`):** Abstimmung vor dem Betrieb-Termin.  
- **Terminbestätigung (`/termin-bestaetigung`):** Handwerker-seitig konzipierter Screen zur Bestätigung eines Kundenvorschlags (im Routing erreichbar; Kontext „Handwerker“).

### Handwerker-Flow (über Routen erreichbar)

- **Anfrage-Detail (`/handwerker-anfrage-detail`, Figma 451:320 / Frame 67):** Lange Übersicht zu Projekt #001 (Ist-Zustand, KI-Varianten, Checklisten, Basispreis-Band, Schnellaktionen). **„Annehmen“** führt zu **Kontaktdaten freigeschaltet** (`/kontaktdaten-freischaltung`, Frame 68 / 451:328). Erreichbar aus **Dashboard** („Projekt starten“), **Anfragen** („Projekt ansehen“) oder nach **Projekt annehmen** (Haupt-CTA).  
- **Dashboard (`/handwerker-dashboard`):** Einstieg mit Highlight-Karte.  
- **Projekte (`/handwerker-projekte`)** und **Anfragen (`/handwerker-anfragen`):** Listen mit Karten; „Projekt ansehen“ verweist auf die Anfrage-Detailroute.  
- **Projekt annehmen (`/handwerker-projekt-annehmen`):** Kostenübersicht (Figma Frame 66, 451:314), Freischaltungsgebühr 2 % – **direkt nach Handwerker-Login**; Haupt-CTA führt zur **Projektübersicht mit zwei KI-Bildern** (`/handwerker-anfrage-detail`, Frame 67).  
- **Kontaktdaten (`/kontaktdaten-freischaltung`, Figma 451:328 / Frame 68):** Screen **„KONTAKTDATEN FREIGESCHALTET“** (Typo per CSS in Großbuchstaben), Kundenprofil, Terminvorschlag, nächste Schritte – Einstieg über **„Annehmen“** auf dem Anfrage-Detail.  
- **Vorarbeiten (`/vorarbeiten`):** Interne Einschätzung mit Positionen und Notizfeld.  
- **Handwerker Projekt Details (`/handwerker-projekt-details`):** Bearbeitbare Checkliste (Prototyp), Updates, Chat mit Kunde.  
- **Chat Handwerker–Kunde (`/chat-handwerker-kunde`):** Logistik und Abstimmung auf der Baustelle.

**Hinweis zu Weiterleitungen:** Einige URLs (z. B. `/preisspanne`, `/home`) leiten auf aktuelle Ziele um – in Schulungen sollte die **kanonische** Route genutzt werden (siehe technisches Handbuch).

---

## 4. Detaillierte Seiten-Dokumentation

Die folgenden Abschnitte folgen dem **Routing der Codebase**. Wo Inhalte statisch oder demonstrativ sind, ist das für das Verständnis des **Konzepts** dennoch relevant.

### Rollenauswahl (`/`)

**Zweck:** Wahl zwischen Kunden- und Handwerker-Demo-Pfad. **Layout:** Zwei große Karten mit Kurzcopy und „Weiter“. **UX/UI:** Weiße Device-Shell, kontrastierender Außenraum.

### Marketing-Landing (`/landing`)

**Zweck:** Markenauftritt und Einstieg für die Kundenreise. **Layout:** Kopfbereich mit Marke und Claim, Split-Vorher/Nachher, drei Nutzenkarten, Primärbutton „Projekt starten“, Link „Anmelden“. **Primäre Aktion:** Projekt starten → Login-Pfad. **Sekundär:** Anmelden. **UX/UI:** Wie zuvor beschrieben – Vertrauen und Lesbarkeit. **Potenzial:** Echte Testimonials oder Referenzen könnten Conversion stärken.

### Login (`/login`)

**Zweck:** Übergang in die geschlossene Journey. **Layout:** Zentrierte Login-Karte mit Logo. **Aktionen:** Anmelden (Link), Passwort vergessen (ohne Funktion), Registrieren → Rollenauswahl (`/`). **UX:** Prototyp mit statischen Feldwerten – für Demos geeignet, für Produktivbetrieb zu ersetzen.

### Dashboard Kunde (`/dashboard-aktualisiert`)

**Zweck:** Projektübersicht und Neustart. **Layout:** Top-Bar mit Marke/Avatar, Begrüßung, zwei Navigationsbuttons („Garten erstellen“ leitet über Redirect auf Projekttyp), Projektliste als Karten mit **Status** (gestartet, Termin akzeptiert, angefragt) und Ort. **Entscheidung:** Welches Projekt fortsetzen. **UX:** Statusfarben unterstützen Scanbarkeit. **Potenzial:** Filter oder Sortierung bei vielen Projekten.

### Projekttyp (`/projekt-auswahl`)

**Zweck:** Kontext für alle folgenden Inhalte. **Elemente:** Fortschritt, Hinweis, sechs Typ-Karten, Fußzeile Zurück/Weiter. **UX:** Eindeutige Auswahl, persistiert für das aktive Projekt.

### Fläche erfassen (`/flaeche-erfassen`)

**Zweck:** Medien und Messung. **Elemente:** Liste gewünschter Fotoarten, Upload-UI, AR-Karte mit „Empfohlen“. **UX:** Erklärt den Mehrwert der Daten für realistische Visualisierung.

### Analyse (`/analyse`)

**Zweck:** Technische Plausibilisierung. **Elemente:** Badge „erfolgreich analysiert“, Fläche, Methode, Mengen, Hinweis-Karte. **UX:** Zurückhaltung bei absoluten Zusagen – die Werte sind ausdrücklich nur **indikativ** bis zur Prüfung vor Ort. **Tippfehler im UI:** Überschrift enthält „Gatenfläche“ – inhaltlich ist „Gartenfläche“ gemeint (Korrektur bei Produktivierung).

### Feature-Auswahl (`/feature-auswahl`)

**Zweck:** Scope-Definition. **Elemente:** Hero Ausgangszustand, Hinweis zu Vorarbeiten, fünf Feature-Karten mit Kurzbeschreibung der Leistungsinhalte, Mehrfachauswahl. **UX:** Subtitles erklären, was alles zu einem Element gehört – reduziert Nachfragen.

### Gestaltung Material (`/gestaltung-material`)

**Zweck:** Pro aktuellem Feature Maß und Material. **Elemente:** Hinweis (variantenreich nach Feature), Größenfeld, Materialraster inkl. „Überrasch mich“. **Navigation:** Zurück springt bei mehreren Features zum Extras des vorherigen oder zur Feature-Auswahl. **UX:** Flexible Nutzer (Überraschung) und kontrollierte Nutzer (konkretes Material) werden abgeholt.

### Gestaltung Extras (`/gestaltung-extras`)

**Zweck:** Zusatzleistungen pro Feature. **Elemente:** Multi-Select-Karten, teils mit Bild und erklärendem Text. **UX:** Klare Trennung: hier Wunsch, vor Ort Machbarkeit.

### Auswahl-Zusammenfassung (`/auswahl-zusammenfassung`)

**Zweck:** Review. **Elemente:** Drei Blöcke (Elemente, Materialien, Extras), Textblock Projektbeschreibung (aktuell generisch), Bestätigungskarte. **UX:** Letzte Kontrolle vor Paket und Zahlung. **Potenzial:** Freitext „Eigene Notizen“ würde echte Kundenbedürfnisse abbilden (konzeptionell naheliegend).

### Paketpreise (`/paket-auswahl`)

**Zweck:** Commercial Commitment. **Elemente:** Hero, zwei Paketkarten, Zahlungsicons, CTAs. **UX:** Visuelle Hierarchie auf Vollpaket. **Potenzial:** Unterschiedliche Ziele nach Paketwahl (nur Visualisierung vs. Vermittlung) im Routing verankern.

### Visualisierung (`/visualisierung-vorschau`)

**Zweck:** Emotion + Iteration. **Elemente:** Vorher, zwei Varianten, Lightbox, Info-Karten, Chat-CTA. **UX:** Escape schließt Lightbox – angenehme Detail-Interaktion.

### Qualitätsstufe (`/qualitaetsstufe`)

**Zweck:** Segmentierung und Betriebswahl. **Elemente:** Drei Qualitäts-Buttons, drei Provider-Cards mit Skills und Erfahrung. **UX:** Zwei getrennte Entscheidungen nacheinander auf einer Seite – könnte bei Nutzertests aufgeteilt werden.

### Termin Datum / Uhrzeit (`/termin-datum`, `/termin-buchung`, `/termin-uhrzeit`)

**Zweck:** Konkrete Planung. **Elemente:** Kalender, Slots, Profil des Betriebs, Rücknavigation. **UX:** Deaktivierte Tage/Slots kommunizieren Verfügbarkeit klar.

### Investitionsübersicht (`/investitionsuebersicht`)

**Zweck:** Preistransparenz. **Elemente:** Bild, detaillierte Zeilen, Summe, Hinweis zu Handwerker-Konditionen und Vorarbeiten. **UX:** „Basispreis“ als Summenlabel – im Abgleich mit Abschnitt 9 klar als **Demo-Logik** verstehen.

### Projektfreischaltung (`/projektfreischaltung`)

**Zweck:** Psychologischer und prozessualer Schritt vor Datenweitergabe. **Elemente:** Erklärung, Status, Später/Freigabe.

### Handwerker-Seiten (Übersicht)

Siehe Abschnitt 8 für Tiefe. Kurz: **Anfrage-Detail** (scrollbare Kunden-Übersicht), **Dashboard** (Highlight), **Projekte** und **Anfragen** (Listen), **Annehmen** (Gebühr), **Kontaktfreischaltung**, **Vorarbeiten** (intern), **Projektdetails** (Checkliste, Chat), **Chats** (zwei Richtungen), **Terminbestätigung** (Vorschlag des Kunden).

### Kunden-Projektdetails (`/projekt-details`)

**Zweck:** Transparenz während Umsetzung. **Elemente:** Fortschrittsbalken, gruppierte Aufgaben mit Status (Erledigt/In Arbeit/Offen). **UX:** Kunde sieht, was passiert – Vertrauen. **Potenzial:** Push-Benachrichtigungen konzeptionell ergänzbar.

---

## 5. Analyse der Auswahlmöglichkeiten

### Projekttypen

Sechs Optionen von Privatgarten bis Balkon. **Relevanz:** Steuert Erwartung und spätere Inhalte (konzeptionell). **Darstellung:** Große Karten mit Bild und Text. **Komplexität:** Eine Auswahl pro Durchlauf.

### Gartenelemente (Features)

Fünf Bausteine, Mehrfachwahl. **Relevanz:** Bestimmt Schleifenlänge und Investitionszeilen. **Darstellung:** Liste mit Thumbnail, Titel, Arbeitspaket-Beschreibung. **Überforderung:** Mindestens ein Element bleibt aktiv.

### Materialien und „Überrasch mich“

Pro Feature eine Liste definierter Materialien plus Überraschungsoption. **Relevanz:** Beeinflusst spätere Kommunikation und kann Einfluss auf Preis haben (im Zielsystem). **Darstellung:** Kartenraster mit Check-Markierung.

### Extras

Feature-spezifische Listen, Multi-Select; visuell aufwendiger bei Terrasse, Rasen, Gartenhaus, Brunnen, Weg. **Relevanz:** Leistungstiefe und Aufwand. **Komplexität:** Klare Beschriftung „Multi-Select“ und Erklärertexte.

### Pakete

Zwei Optionen mit festen Demo-Preisen. **Relevanz:** Geschäftsmodell der Plattform.

### Qualitätsstufe

Drei Stufen mit **Stundenspannen** (kein direkter m²-Multiplikator im UI). **Relevanz:** Erwartung an Betriebssegment und Kostenbandbreite.

### Handwerker

Drei Betriebe mit Ratings, Erfahrung, Skills. **Relevanz:** Persönliche Bindung vor Termin.

### Termin

Kalendertag + Zeitslot. **Relevanz:** Koordination.

### Interne Vorarbeiten (Handwerker)

Checkboxen auf Positionsebene, optionale Zusätze, Notiz. **Relevanz:** Nachkalkulation und Angebot.

### Was beeinflusst Preis, Umfang, Folgeschritte?

- **Direkt im Prototyp sichtbar:** Anzahl und Art der Features → Investitionszeilen; Paketpreis; Freischaltungsgebühr-Prozent auf Demo-Basispreis beim Handwerker.  
- **Konzeptionell / Zielbild:** Fläche × Basispreis × Erfahrungsfaktor (Abschnitt 9).  
- **Qualitätsstufe:** Steuert angezeigte Stundenspanne und Texte; Kopplung an Endpreisformel im Prototyp **nicht** mathematisch ausprogrammiert.

---

## 6. Designanalyse

### Designsprache

**Ruhige Markenfarben:** Dunkelgrün für Vertrauen und Naturbezug, Navy für Seriosität, Gelbakzente für wichtige UI-Elemente (Login, Highlights). **Hintergründe:** Dunkler Außenrahmen, helle „Phone“-Fläche für Content – fokussiert den Blick.

### Modernität und Professionalität

Kartenlayout, klare Typografie, viel Weißraum innerhalb des Flows, konsistente Pill-Buttons und Status-Badges entsprechen einem **zeitgemäßen Service-Marketplace- oder Configurator-Stil**.

### Lesbarkeit und Hierarchie

Überschriften (`AppHeader`) liefern immer **Titel + Untertitel**. Primäre Aktionen sind durchgehend **grüne Pills**, sekundäre **Outline** oder Textlinks – erlernbares Muster.

### Cards und Gruppierung

Fast jeder inhaltliche Block ist eine **Card** (info, hint, summary, hw-project). Das schafft scanbare Einheiten und funktioniert gut auf schmalen Viewports.

### Farbwirkung und Vertrauen

Grün assoziiert Nachhaltigkeit und Garten; **„Geprüft“**-Badges und Sterne unterstütigen Vertrauen in Betriebe. Hinweiskarten mit Icon/Überschrift wirken wie **freundliche Compliance-Hinweise**, nicht wie Fehler.

### Mobile / responsive Denkweise

Die `DeviceShell` simuliert eine **mobile Erste**-Erfahrung; Abstände und Touch-Ziele sind darauf ausgelegt. Desktop-Nutzer sehen den gleichen schmalen Frame – konzeptionell PWA oder nativer Shell-Wrapper denkbar.

### Orientierung

Fortschrittsbalken, wiederkehrende Fußzeilen und klare Back-Links (`BackTextButton` auf Detailseiten) geben **räumliche Sicherheit** in der Journey.

---

## 7. UI/UX-Analyse

### Intuition des Flows

Der Pfad folgt einer **natürlichen Erzählung:** „Was?“ (Projekttyp) → „Wo/wie groß?“ (Erfassung, Analyse) → „Was genau?“ (Features, Details) → „Stimmt das?“ (Summary) → „Was kostet die Plattform?“ (Paket) → „Wie sieht es aus?“ (KI) → „Wer und wann?“ (Qualität, Betrieb, Termin) → „Was kostet die Sache?“ (Investition) → „Freigabe“.

### Information zum richtigen Zeitpunkt

Preisdetails kommen **nach** Konfiguration und Paket; technische Mengen **nach** Erfassung; Vor-Ort-Hinweise **durchgängig** dort, wo Nutzer sonst zu festen Entscheidungen neigen würden.

### Reibungsreduktion

Mehrfachauswahl ohne Neustart, gespeicherte Zwischenstände (technisch), „Später“-Optionen an kritischen Stellen (Investition, Freischaltung).

### Transparenz

Investitionszeilen, Hinweise zu Vorarbeiten, Status in Dashboard und Projekt-Details.

### Entscheidungshilfe

Empfohlene Pakete, empfohlener AR-Scan, Qualitätsstufen mit erklärendem Subtext, Handwerker mit Skills.

### Übersicht, Status, Nachvollziehbarkeit

Gut für den **Kernflow** durch Progress-Komponente; Handwerker-**Filter** sind im Prototyp **nur als Beschriftungen** vorhanden – das ist eine **UX-Lücke** zwischen Versprechen (Filterleiste) und Funktion (siehe Optimierungspotenziale).

### Filter und Detailseiten

Die **Idee** der Filter ist nachvollziehbar (Status, Typ, Preis, Sortierung); die **Ausführung** muss für Produktreife nachgerüstet werden. Die Trennung **Liste → Karte → Detail/Annahme** ist stimmig und skalierbar.

---

## 8. Analyse der Handwerkeransicht

### Übersicht der Einstiege

- **`/handwerker-dashboard`:** Persönlicher Einstieg mit einer **Highlight-Karte** (z. B. neu beauftragtes Projekt), geschätztem Gesamtpreis und Element-Tags. **Zweck:** Sofortiger Überblick und Motivation zum Handeln.  
- **`/handwerker-projekte`:** Liste zugeordneter **Projektanfragen** mit Status (offen/angenommen), **AI-Vorschau-Platzhalter**, Tags, Preisspanne, Aktionsbuttons (Annehmen, Ablehnen, Ansehen). **Zweck:** Operative Bearbeitung eingehender Arbeit.  
- **`/handwerker-anfragen`:** Ähnliche **Kartenliste**, ergänzt um eine **Filterleiste** mit den Schlagworten Status, Projekttyp, Preis, Neueste zuerst. **Ist-Stand Prototyp:** Die Filter sind **nicht interaktiv**; sie kommunizieren das **geplante** Sortier- und Filterverhalten. **UX-Begründung (Zielbild):** Schnelle Eingrenzung bei vielen Anfragen, z. B. nur offene oder nach Budget sortiert.

### Card-Inhalte und ihre Funktion

Jede Karte bündelt **Titel** (Projektart/Name), **Projektnummer**, **Status-Badge**, **visuellen Anker** (Platzhalter für KI-Visualisierung), **Tag-Leiste** für gewählte Elemente, **geschätzten Preis** als Spanne und **Aktionen**. **Warum sinnvoll:** Handwerker entscheiden in Sekunden – Status und Preis sind die stärksten Sortier- und Priorisierungsmerkmale; Tags liefern fachlichen Kontext ohne die Detailseite öffnen zu müssen.

### Status und Preis

Status **„Anfrage offen“** vs. **„Angenommen“** (und im Dashboard **„Beauftragt“**) erlaubt **Pipeline-Denken**. Die **Preisspanne** bleibt bewusst unscharf, weil der Prototyp reale Unsicherheit bis zur Besichtigung abbildet.

### Detailseite und Annahme

- **`/handwerker-projekt-annehmen`:** Zeigt Basispreis ohne Vorarbeiten, Elemente, Zeitfenster, Region, **Freischaltungsgebühr 2 %** mit Demo-Betrag und erklärt den Ablauf nach Annahme. **Funktion:** Risiko- und Kostenbewusstsein vor Commitment.  
- **`/kontaktdaten-freischaltung`:** **Kontaktdaten freigeschaltet** (Frame 68), vollständige **Kundenstammdaten** (Demo), Handlungsaufforderung 24h. **Funktion:** Übergang nach Anfrage-Detail („Annehmen“). **Zurück** per Router-State zur vorherigen Seite (Standard: Projekt annehmen bei direkter URL).  
- **`/handwerker-projekt-details`:** Fortschritt in Prozent, **bearbeitbare** Aufgaben (Prototyp), Update-Feed, Link zum Chat. **Funktion:** Operatives Tagesgeschäft.  
- **`/vorarbeiten`:** **Interne** Kalkulation von Standard- und Zusatzpositionen mit Zwischensummen. **Funktion:** Trennung zwischen kundensichtbarem Preis und interner Feinplanung.

### Chat und Terminbestätigung

- Chat **Handwerker–Kunde** fokussiert **Logistik und Baustelle**.  
- **`/termin-bestaetigung`:** Kundenvorschlag mit Nachricht; Aktionen Bestätigen / Alternative / Ablehnen – klares **Entscheidungsdreieck**.

---

## 9. Preislogik und Kalkulationsmodell

### Zielmodell (produktstrategische Vorgabe)

Für **Kommunikation und spätere Implementierung** eignet sich ein einfaches, skalierbares Modell:

**Gesamtpreis = Fläche × Basispreis pro Fläche × Erfahrungs-Faktor**

- Der **Basispreis pro Fläche** (z. B. €/m²) beschreibt die **fachliche Leistung** für eine definierte Standardqualität.  
- Der **Erfahrungs-Faktor** passt den Preis an die **Qualifikation und Erfahrung** des ausführenden Betriebs an – nicht durch undurchsichtige Zuschläge, sondern durch **einen** Multiplikator.  
- Der **Endpreis** ändert sich **nur** über diesen Faktor, solange Fläche und Basispreis feststehen – das ist für Nutzer leicht erklärbar und in einer App als **drei sichtbare Größen** darstellbar (Fläche, Basis, Stufe).

#### Erfahrungsstufen (Zielmodell)

| Stufe | Erfahrung | Faktor |
|-------|-----------|--------|
| Basic | 0–3 Jahre | 0,85 |
| Standard | 3–10 Jahre | 1,00 |
| Profi | 10–20 Jahre | 1,20 |
| Experte | 20+ Jahre | 1,35 |

**Begründung:** Höhere Erfahrung korreliert typischerweise mit schnellerer Fehlervermeidung, besserer Planung und Qualität; der Multiplikator **standardisiert** diese Wertschätzung. Für **Nutzer** bleibt nachvollziehbar, warum ein „Profi“ mehr kostet; für **Betriebe** ist die Einordnung fairer als reine Preisunterbietung.

#### Beispielrechnung

Angenommen: **Fläche 30 m²**, **Basispreis 60 €/m²**.

Zwischenergebnis ohne Faktor: 30 × 60 € = **1.800 €** (entspricht der **Standard-Stufe** mit Faktor 1,00).

| Stufe | Rechnung | Ergebnis |
|-------|----------|----------|
| Basic | 1.800 € × 0,85 | **1.530 €** |
| Standard | 1.800 € × 1,00 | **1.800 €** |
| Profi | 1.800 € × 1,20 | **2.160 €** |
| Experte | 1.800 € × 1,35 | **2.430 €** |

**Warum app-tauglich:** Wenige Parameter, keine verschachtelte Formel, gut als **Slider oder vier Karten** umsetzbar. **Warum verständlich:** Nutzer sehen Fläche und Basispreis als „Material der Rechnung“, den Faktor als „wer führt aus“.

### Abgleich mit dem aktuellen Prototyp (Codebase)

Die **Investitionsübersicht** arbeitet mit **festen Demo-Beträgen je Feature** (Terrasse, Rollrasen, Gartenhaus, Brunnen, Gartenweg) und summiert diese zur angezeigten **Basispreis**-Zeile. Es gibt **keine** direkte Berechnung „Fläche × m²-Preis × Faktor“ im Frontend.

Die **Qualitätsauswahl** nutzt die Stufen **Standard, Komfort, Vollprofi** mit **Stundenspannen** (49–59 €/h usw.) – das ist **inhaltlich verwandt** mit Segmentierung nach Betriebsniveau, entspricht aber **nicht** den vier benannten Erfahrungsstufen und Faktoren des Zielmodells.

**Konsequenz für Stakeholder:** Das Zielmodell in diesem Abschnitt beschreibt die **gewünschte** erklärbare Preislogik für Go-to-Market und Schulung. Der Prototyp demonstriert **UI und Transparenz** (Aufschlüsselung, Hinweise), sollte aber bei einer Produktionsfreigabe **entweder** auf die Formel umgestellt **oder** bewusst als getrennte Ebene („Plattformpaket“, „Handwerker-Stundensatz“, „Positionskalkulation“) erklärt werden, damit keine widersprüchlichen Erwartungen entstehen.

---

## 10. Stärken des Konzepts

- **Modulare Produktlogik:** Projekttyp → Elemente → Material/Extras pro Element skaliert auf kleine und große Vorhaben.  
- **Durchgängige Transparenz:** Hinweise zu Vor-Ort-Termin, indikative Mengen, aufgeschlüsselte Investitionszeilen.  
- **Emotionale und rationale Ebene:** KI-Visualisierung und Pakete (emotion), Zahlen und Checklisten (ration).  
- **Zwei Perspektiven:** Kunde und Handwerker sind inhaltlich aufeinander abgestimmt (Freigabe, Kontakt, Details).  
- **Skalierbarkeit:** Weitere Features, echte Filter, Backend-Preise lassen sich in die bestehende Schalenarchitektur einsetzen.  
- **Verständliche Preiszukunft:** Das Zielmodell mit einem Multiplikator ist kommunikationsstark (Abschnitt 9).

---

## 11. Optimierungspotenziale

- **UX:** Handwerker-Filter funktional machen; Qualitätsstufe und Ziel-Preisformel inhaltlich vereinheitlichen.  
- **UI:** Tippfehler in der Analyse-Überschrift korrigieren; Platzhalter „AI-Vorschau“ durch echte Inhalte oder klare Demo-Kennzeichnung ersetzen.  
- **Content:** Projektbeschreibung in der Zusammenfassung durch **Nutzer-Eingabe** oder KI-Vorschlag ersetzen.  
- **Struktur:** Paket „Nur Visualisierung“ und „Projekt realisieren“ auf **unterschiedliche Folgeflows** mappen, falls geschäftlich nötig.  
- **Entscheidungsführung:** Sehr lange Journeys bei vielen Features durch **Zusammenfassungs-Sidebar** oder „X von Y Elementen“ ergänzen (über die globale Seitenzahl hinaus).  
- **Statuskommunikation:** Synchronisation Dashboard ↔ Handwerker ↔ Push – aktuell nicht als Live-System dargestellt.  
- **Onboarding:** Kurze Erklärung beim ersten Besuch („So läuft’s in 30 Sekunden“).  
- **Preisverständlichkeit:** Einheitliches Glossar: „Basispreis“, „Investition“, „Freischaltungsgebühr“, „geschätzte Spanne“.

---

## 12. Abschlussfazit

GreenLine Build adressiert eine **komplexe Dienstleistung** mit einer **aufgeräumten, mobilen Journey**, die Nutzer schrittweise von der Idee zur **konkreten Termin- und Investitionsentscheidung** führt. Die **visuelle und strukturelle Konsistenz** (Cards, Fortschritt, Hinweise) unterstützt Vertrauen und Orientierung. Die **Handwerker-Perspektive** ist bereits als **eigenständiger Strang** angelegt – von der Anfragenübersicht bis zur Kontaktfreischaltung und den Projekt-Details – und zeigt, wie die Plattform **beide Marktseiten** bedienen kann.

Das **stärkste konzeptionelle Asset** ist die Kombination aus **emotionaler Visualisierung** und **rationaler Transparenz**, ergänzt um ein **klar erklärbares Ziel-Preismodell** (Fläche × Basis × Erfahrung). Der vorliegende **Prototyp** liefert dafür die **richtige UI-Hülle**; für den Produktbetrieb empfiehlt sich die **Angleichung** von Qualitätsstufen, Demo-Zahlen und Ziel-Formel sowie die **Aktivierung** angekündigter Interaktionen (Filter, Eingaben, Backend).

In Summe ist das Produkt **modern, funktional erklärbar und für Nutzer wie Betriebe attraktiv**, weil es **Komplexität bündelt**, ohne den Eindruck zu erwecken, letzte Wahrheiten ersetze der Bildschirm – der **Vor-Ort-Termin** bleibt bewusst der Ort der fachlichen Wahrheit, was langfristig **Vertrauen und rechtliche Klarheit** stützt.

---

*Dokument bezogen auf den Stand der Codebase im Repository. Abweichungen in kundenspezifischen Forks bitte hier ergänzen.*
