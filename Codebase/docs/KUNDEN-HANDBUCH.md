# GreenLine Build – Handbuch für Kunden (Codebase)

Dieses Dokument beschreibt **Design-Grundlagen**, den **Entwicklungs-Workflow** und den **Betrieb** der React/Vite-Anwendung im Ordner `Codebase/`. Es richtet sich an technische Ansprechpartner, die die Oberfläche pflegen oder weiterentwickeln.

**Produkt-, UI-, UX- und Flow-Dokumentation** (stakeholder-tauglich, wenig Code): [PRODUKT-UND-UX-DOKUMENTATION.md](./PRODUKT-UND-UX-DOKUMENTATION.md).

---

## 1. Technischer Überblick

| Aspekt | Umsetzung |
|--------|-----------|
| Framework | React 18, TypeScript |
| Routing | `react-router-dom` (Browser-Router) |
| Build | Vite 6 |
| Styling | Zentrale Datei `src/styles.css`, CSS-Variablen als Design-Tokens |

Einstiegspunkte: `src/main.tsx` (Mount), `src/App.tsx` (Routen).

---

## 2. Design & Tokens

Globale Farben und Abstände stehen in `src/styles.css` unter `:root` (Präfix `--glb-`, z. B. `--glb-dark`, `--glb-navy`, `--glb-surface`, `--glb-border`).

**Rollenauswahl (`/`)** und **Marketing-Landing (`/landing`):** Der **Seitenhintergrund** bleibt dunkel (`body` / `:root`, z. B. `#1f1f1f`); die **Device-Shell** ist bei beiden **weiß** mit Schatten (`.device-shell.role-select-screen` bzw. `.device-shell.landing-screen`). Die Landingpage nutzt kein Vollflächen-Foto mehr als Shell-Hintergrund. Benefit-Karten sind **opak weiß** mit Rand und Schatten; Aktionsbereich und Link „Anmelden“ nutzen **dunkle Schrift**.

Anpassungen am Look: zuerst `:root`-Variablen prüfen, dann sektionsspezifische Klassen (z. B. `.landing-screen`, `.benefit-card`, `.landing-vorher-nachher`).

---

## 3. Workflow Figma → Code

1. **Design** in Figma als Referenz für Layout, Typo und Abstände.
2. **Assets (Quelle Figma → Repo):** Exportierte Medien liegen unter `public/app-assets/` und werden in `src/data/assetFiles.json` referenziert (Pfade über `getMinioAssetUrl` in `screens.ts`). **Projektauswahl `/projekt-auswahl`:** Personal Access Token in `.env.local` (`FIGMA_ACCESS_TOKEN`, Vorlage `env.example`). **`npm run figma:pull`** exportiert Logo und Profil aus den Figma-Nodes **`377:817`** (Logo) und **`377:818`** (Profil, Standard aus dem GreenLine-Build-File) nach **`flow-header-logo-frame60.png`** / **`flow-header-avatar-frame60.png`** (PNG @2x). Optional überschreiben: **`FIGMA_FRAME60_LOGO_NODE_ID`** / **`FIGMA_FRAME60_AVATAR_NODE_ID`**. **`npm run figma:inspect-frame60`** listet weiterhin alle Knoten unter Frame `419:279` zur Orientierung.
3. **Generierte Platzhalter:** `npm run prepare:assets` erzeugt u. a. programmatische SVGs (`scripts/export-public-assets.mjs`); diese Figma-Header-PNGs werden davon **nicht** überschrieben.
4. **Umsetzung:** Neue Screens als Seiten-Komponente unter `src/pages/`; Route in `App.tsx` ergänzen.
5. **Styles:** Wiederkehrende Muster in `styles.css` bündeln; Duplikate vermeiden.

Eine 1:1-Pixel-Übereinstimmung mit jedem Breakpoint ist nicht zwingend; die App ist primär für die **Mobile-Shell** (`DeviceShell`) ausgelegt.

---

## 4. Routen (Auszug)

Die vollständige Liste steht in `src/App.tsx`. Wichtige Einstiege:

- `/` – Rollenauswahl (Kundensicht / Handwerkersicht)
- `/landing` – Marketing-Landing (ehemals Startseite)
- `/login` – Anmeldung (Demo); „Zurück“ logisch nach `/landing`
- `/handwerker-login` – Handwerker: Login (Demo, Figma Frame 30) → „Anmelden“ führt zu **Projekt annehmen**
- `/handwerker-projekt-annehmen` – Handwerker: Projekt annehmen (Figma Frame 66, 451:314) → CTA führt zu `/handwerker-anfrage-detail` (Frame 67, zwei KI-Vorschläge)
- `/handwerker-anfrage-detail` – Handwerker: Anfrage-Detail (Figma 451:320 / Frame 67); „Annehmen“ → `/kontaktdaten-freischaltung`
- `/kontaktdaten-freischaltung` – Kontaktdaten freigeschaltet (Figma 451:328 / Frame 68)
- `/projekt-auswahl` – Projekttyp
- Weitere Schritte: z. B. `/feature-auswahl`, `/gestaltung-material`, `/investitionsuebersicht`, `/dashboard-aktualisiert`, Termin- und Handwerker-Routen

Redirects (`Navigate`) verweisen alte Pfade auf aktuelle Ziele.

---

## 5. Datenhaltung im Browser

Es gibt **kein Backend** in dieser Codebase-Variante; Zustände werden über **`localStorage`** geführt.

Zentrale Dokumentation der Flow-Keys: `src/data/projectFlowSnapshot.ts` – Konstante `FLOW_STORAGE_KEYS` und `glb-active-project-id` für das aktive Projekt. Snapshots pro Projekt: `glb-project-flow-<projectId>`.

**Zurücksetzen für Tests:** Entwicklertools → Application → Local Storage → Einträge mit Präfix `glb-` löschen (oder site-spezifisch leeren).

---

## 6. Betrieb

```bash
cd Codebase
npm install
npm run dev      # Entwicklung, üblicherweise http://localhost:5173
npm run build    # Typecheck + Produktionsbundle nach dist/
npm run preview  # Lokaler Preview des Builds
```

Deployment: statisches Hosting des `dist/`-Ordners (z. B. Vercel, Netlify, S3+CloudFront). `base` in `vite.config` nur anpassen, wenn die App unter einem Unterpfad läuft.

---

## 7. Checkliste bei UI-Änderungen

- Build ohne Fehler: `npm run build`
- Neue Route: `App.tsx` + ggf. Links in bestehenden Seiten
- Geänderte Storage-Keys: `projectFlowSnapshot.ts` und alle Schreib-/Lesestellen synchron halten
- Landing / Rollenauswahl: Shell-Styles `.device-shell.landing-screen` bzw. `.device-shell.role-select-screen` in `styles.css`, nicht den gesamten `body` aufhellen

---

*Stand: gemäß Codebase-Struktur im Repository. Bei Abweichungen im Kunden-Branch diese Datei bitte mitziehen.*
