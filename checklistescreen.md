Unten ist ein **ausführliches Screen-Dokument** (UX + Komponenten + States) **und** ein **TypeScript-Script (Figma-MCP)**, das dir den Screen als Frame bei **x=19000, y=65** im gleichen Look wie deine bisherigen Screens baut.

Zusätzlich habe ich einen optionalen Hinweis zur **Preislogik (Basispreis × Fläche × Multiplikator)** aufgenommen, falls du im Detail-Screen irgendwo “Preisgrundlage / Paket” erklären willst. 

---

## 1) Screen-Dokument: „Projekt-Details (Kunde) – Auftrag bestätigt“

### Ziel des Screens

Der Kunde sieht **alle Projekt-Details** nach der verbindlichen Buchung (Status: *Beauftragt*).
Im Fokus steht eine **Aufgaben-Checkliste**, die der Handwerker Schritt für Schritt abarbeitet. Sobald der Handwerker Aufgaben als erledigt markiert, sieht der Kunde sie **automatisch abgehakt** (read-only).

### Position & Layout

* **Frame-Position:** x=19000, y=65
* **Mobile Frame:** 380px Breite (wie deine anderen Screens)
* **Design:** modern, clean, abgerundete Cards, Grün-Akzent, dezente Borders, leichte Off-White Flächen
* **Scroll:** Ja (Content kann lang werden)

---

## 2) Informationsarchitektur (Was ist auf dem Screen?)

### A) Header (sticky)

**Inhalt**

* Zurück-Button: „← Zurück“
* Titel: „Projekt Details“
* Subtitle: „Privatgarten #001“
* Status Pill rechts: **„Beauftragt“** (grün)
  Optional: kleiner „Letztes Update: Heute 16:40“

**UX**

* Header bleibt beim Scrollen oben (optional – wenn du’s in Figma nur visuell darstellst, reicht normal).

---

### B) Hero-Card „Auftrag bestätigt“

**Inhalt**

* Icon/Badge: ✅
* Headline: „Auftrag bestätigt“
* Subtext: „Der Handwerker startet die Umsetzung. Du siehst den Fortschritt live.“
* Mini-Infos (2 Zeilen):

  * **Handwerker:** Simply garden · ⭐ 4,8/5,0
  * **Termin:** Di, 4. März 2026 · 12:00–12:45

---

### C) Fortschritt (Progress Card)

**Inhalt**

* Titel: „Fortschritt“
* Progress-Bar (z. B. 45%)
* „5 von 11 Aufgaben erledigt“
* Optional: „Nächster Schritt: Untergrund vorbereiten“

**Regel**

* Prozent = doneTasks / totalTasks.

---

### D) Hauptbereich: Aufgaben-Checkliste (Kundenansicht)

**Struktur**

* Aufgaben gruppiert nach Kategorien (z. B. Terrasse / Rollrasen / Brunnen / Gartenhaus)
* Jede Kategorie als Card:

  * Kategorie-Titel
  * Liste von Aufgaben-Rows (Checkbox + Titel + optional Subtext + Status)
  * Statusanzeige rechts:

    * „Offen“
    * „In Arbeit“
    * „Erledigt“

**Wichtig**

* Kunde kann **nicht** abhaken (read-only).
* Visuelles Feedback:

  * **Erledigt:** Checkbox grün + Text leicht gedimmt + durchgestrichen (optional)
  * **In Arbeit:** kleines „⏳“ oder „In Arbeit“ Tag
  * **Offen:** neutrales Grau

**Beispiel-Aufgaben (du kannst sie dynamisch aus deinem Angebot / Leistungsplan nehmen)**

* *Terrasse*

  * Untergrund begradigen
  * Schottertragschicht einbauen
  * Natursteinplatten verlegen
* *Rollrasen*

  * Alte Grasnarbe abtragen
  * Boden planieren
  * Rollrasen verlegen
* *Brunnen*

  * Erdarbeiten
  * Technikanschluss vorbereiten
* *Allgemein*

  * Baustelle einrichten
  * Abnahme & Übergabe

---

### E) Updates / Benachrichtigungen (klein, dezent)

**Card „Updates“**

* Letzte 2–3 Ereignisse:

  * „✅ Untergrund begradigt (heute 14:10)“
  * „⏳ Rollrasen – Boden planieren gestartet“
* Button: „Alle Updates ansehen“ (führt später zu Timeline)

---

### F) Projektinfos (zusammenklappbar)

**Accordion / Cards**

* Adresse & Standort
* Zeitlicher Rahmen (Start / Dringlichkeit)
* Materialauswahl (kurz)
* Extras (kurz)
* Dokumente (z. B. Angebot PDF, Checkliste, Fotos vom Vor-Ort-Termin)

  * „Angebot ansehen“
  * „Vorher/Nachher Bilder“

---

### G) CTA-Bereich (Bottom)

Zwei Buttons:

1. **„Chat mit Handwerker“** (Primary / grün)
2. **„Problem melden“** (Secondary / weiß)

---

## 3) Status- & Datenmodell (für deine Logik)

### Task-Status

* `open` → grau
* `in_progress` → gelb/neutraler Tag
* `done` → grün + check

### Daten (Minimal)

```ts
type TaskStatus = "open" | "in_progress" | "done";

type Task = {
  id: string;
  title: string;
  subtitle?: string;
  status: TaskStatus;
};

type TaskGroup = {
  id: string;
  title: string; // "Terrasse", "Rollrasen", ...
  tasks: Task[];
};

type ProjectDetail = {
  projectId: string;
  title: string; // "Privatgarten #001"
  status: "beauftragt" | "vor_ort_termin" | "angebot_offen" | "fertig";
  handwerker: { name: string; rating: number };
  appointment: { dateLabel: string; timeLabel: string };
  groups: TaskGroup[];
  updates: { text: string; ts: string }[];
};
```

---

## 4) Optional: Preis-/Paket-Erklärung (wenn du’s im Detail zeigen willst)

Falls du im Detail-Screen eine kleine Info „Wie setzt sich der Preis zusammen?“ einbauen willst:

* **Formel:** `Gesamtpreis = Fläche × Basispreis × Erfahrungs-Faktor` 
* Mini-Tabelle/Tooltip: Standard/Komfort/Vollprofi → Multiplikator (nur wenn du’s hier erklären möchtest, sonst weglassen).

---

# 5) Cursor / Figma-MCP TypeScript Script (Frame baut den Screen)

> Du kannst das Script 1:1 wie dein anderes ausführen. Es ist im selben Stil (Farben, Radii, Cards).
> Es erzeugt den Screen „Projekt Details – Beauftragt“ bei **x=19000, y=65**.

```ts
/**
 * Projekt Details (Kunde) – Auftrag bestätigt + Checkliste
 * Position: x=19000, y=65
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'jmvpmjo3';
const FRAME_X = 19000;
const FRAME_Y = 65;

const W = 380;
const P = 20;
const cW = W - P * 2;

function hex(h: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return r
    ? { r: parseInt(r[1], 16) / 255, g: parseInt(r[2], 16) / 255, b: parseInt(r[3], 16) / 255 }
    : { r: 0, g: 0, b: 0 };
}
async function sleep(ms: number) { await new Promise(r => setTimeout(r, ms)); }
async function xId(res: any): Promise<string | null> {
  try { const m = res?.content?.[0]?.text?.match(/"id":"([^"]+)"/); return m ? m[1] : null; } catch { return null; }
}
async function xFrame(res: any): Promise<string | null> {
  try {
    const t = res?.content?.[0]?.text;
    const m = t?.match(/ID: (\d+:\d+)/) || t?.match(/"id"\s*:\s*"([^"]+)"/);
    return m ? m[1] : null;
  } catch { return null; }
}

// Colors (wie deine Screens)
const darkGreen = hex('#1a3c34');
const green = hex('#1F7A4D');
const lightGreen = hex('#e8f5e9');
const white = { r: 1, g: 1, b: 1 };
const offWhite = { r: 0.97, g: 0.97, b: 0.97 };
const border = { r: 0.91, g: 0.91, b: 0.91 };
const divider = { r: 0.85, g: 0.85, b: 0.85 };
const muted = { r: 0.50, g: 0.50, b: 0.50 };

// helpers
async function R(c: any, x: number, y: number, w: number, h: number, n: string, p?: string) {
  const r = await c.callTool({ name: 'create_rectangle', arguments: { x, y, width: w, height: h, name: n, parentId: p } });
  await sleep(20);
  return xId(r);
}
async function T(c: any, x: number, y: number, t: string, s: number, n: string, p?: string, fw?: number) {
  await c.callTool({ name: 'create_text', arguments: { x, y, text: t, fontSize: s, name: n, parentId: p, fontWeight: fw } });
  await sleep(12);
}
async function F(c: any, id: string, col: any) {
  await c.callTool({ name: 'set_fill_color', arguments: { nodeId: id, r: col.r, g: col.g, b: col.b, a: 1 } });
}
async function S(c: any, id: string, col: any, w = 1) {
  await c.callTool({ name: 'set_stroke_color', arguments: { nodeId: id, r: col.r, g: col.g, b: col.b, a: 1, width: w } });
}
async function CR(c: any, id: string, r: number) {
  await c.callTool({ name: 'set_corner_radius', arguments: { nodeId: id, radius: r } });
}

// Mock Daten (du ersetzt später durch echte)
const projectTitle = 'Privatgarten #001';
const statusLabel = 'Beauftragt';
const handwerker = 'Simply garden · 4,8/5,0';
const appointment = 'Di, 4. März 2026 · 12:00–12:45';

const groups = [
  {
    title: 'Terrasse',
    tasks: [
      { t: 'Untergrund begradigen', s: 'done' },
      { t: 'Schottertragschicht einbauen', s: 'in_progress' },
      { t: 'Natursteinplatten verlegen', s: 'open' },
    ]
  },
  {
    title: 'Rollrasen',
    tasks: [
      { t: 'Alte Grasnarbe abtragen', s: 'done' },
      { t: 'Boden auflockern & planieren', s: 'done' },
      { t: 'Rollrasen verlegen', s: 'open' },
    ]
  },
  {
    title: 'Brunnen',
    tasks: [
      { t: 'Erdarbeiten', s: 'open' },
      { t: 'Technikanschluss vorbereiten', s: 'open' },
    ]
  },
];

function calcProgress() {
  const all = groups.flatMap(g => g.tasks);
  const total = all.length;
  const done = all.filter(x => x.s === 'done').length;
  const pct = Math.round((done / Math.max(total, 1)) * 100);
  return { total, done, pct };
}

async function main() {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js']
  });

  const client = new Client({ name: 'projekt-details-kunde', version: '1.0.0' }, { capabilities: {} });

  try {
    await client.connect(transport);
    await sleep(1200);

    const jr = await client.callTool({ name: 'join_channel', arguments: { channel: CHANNEL } });
    const jt = jr?.content?.[0]?.text || '';
    if (jt.includes('Error')) return;

    await sleep(800);

    // Frame height grob (scroll)
    const totalH = 1500;

    const fR = await client.callTool({
      name: 'create_frame',
      arguments: { x: FRAME_X, y: FRAME_Y, width: W, height: totalH, name: 'Projekt Details (Kunde) – Beauftragt' }
    });
    await sleep(60);
    const pid = await xFrame(fR);

    const bx = pid ? P : FRAME_X + P;
    let y = pid ? 0 : FRAME_Y;

    // ── HEADER
    const hH = 92;
    const hId = await R(client, bx - P, y, W, hH, 'PD_Header', pid);
    if (hId) { await F(client, hId, darkGreen); }
    await T(client, bx, y + 16, '← Zurück', 13, 'PD_Back', pid);
    await T(client, bx, y + 42, 'Projekt Details', 22, 'PD_Title', pid, 700);
    await T(client, bx, y + 68, `Projekt: ${projectTitle}`, 12, 'PD_Sub', pid);

    // Status pill
    const pillW = 92, pillH = 26;
    const pillId = await R(client, bx + cW - pillW, y + 56, pillW, pillH, 'PD_StatusPill', pid);
    if (pillId) { await F(client, pillId, lightGreen); await CR(client, pillId, 12); }
    await T(client, bx + cW - pillW + 14, y + 62, statusLabel, 12, 'PD_StatusText', pid, 700);

    y += hH + 18;

    // ── CARD: Auftrag bestätigt
    const heroH = 132;
    const heroId = await R(client, bx, y, cW, heroH, 'PD_Hero', pid);
    if (heroId) { await F(client, heroId, white); await S(client, heroId, border); await CR(client, heroId, 16); }
    await T(client, bx + 16, y + 16, '✅ Auftrag bestätigt', 16, 'PD_HeroTitle', pid, 700);
    await T(client, bx + 16, y + 40, 'Der Handwerker startet die Umsetzung.', 12, 'PD_HeroLine1', pid);
    await T(client, bx + 16, y + 58, 'Du siehst den Fortschritt live in der Checkliste.', 12, 'PD_HeroLine2', pid);
    await T(client, bx + 16, y + 86, `Handwerker: ${handwerker}`, 11, 'PD_HeroHW', pid);
    await T(client, bx + 16, y + 104, `Termin: ${appointment}`, 11, 'PD_HeroAppt', pid);
    y += heroH + 14;

    // ── CARD: Fortschritt
    const { total, done, pct } = calcProgress();
    const progH = 110;
    const progId = await R(client, bx, y, cW, progH, 'PD_Progress', pid);
    if (progId) { await F(client, progId, white); await S(client, progId, border); await CR(client, progId, 16); }
    await T(client, bx + 16, y + 14, 'Fortschritt', 14, 'PD_ProgTitle', pid, 700);
    await T(client, bx + 16, y + 36, `${done} von ${total} Aufgaben erledigt`, 12, 'PD_ProgSub', pid);

    // progress bar bg
    const barX = bx + 16;
    const barY = y + 64;
    const barW = cW - 32;
    const barH = 12;
    const bgId = await R(client, barX, barY, barW, barH, 'PD_BarBG', pid);
    if (bgId) { await F(client, bgId, offWhite); await CR(client, bgId, 10); }
    const fgId = await R(client, barX, barY, Math.max(10, Math.round(barW * (pct / 100))), barH, 'PD_BarFG', pid);
    if (fgId) { await F(client, fgId, green); await CR(client, fgId, 10); }

    await T(client, bx + cW - 54, y + 34, `${pct}%`, 12, 'PD_ProgPct', pid, 700);
    y += progH + 18;

    // ── SECTION: Checkliste Header
    await T(client, bx, y, 'Aufgaben-Checkliste', 16, 'PD_ListTitle', pid, 700);
    await T(client, bx, y + 20, 'Wird vom Handwerker aktualisiert (nur Anzeige).', 11, 'PD_ListHint', pid);
    y += 44;

    // ── GROUP CARDS
    for (let gi = 0; gi < groups.length; gi++) {
      const g = groups[gi];

      const rows = g.tasks.length;
      const rowH = 44;
      const cardH = 52 + rows * rowH + 14;

      const gId = await R(client, bx, y, cW, cardH, `PD_Group_${gi}`, pid);
      if (gId) { await F(client, gId, white); await S(client, gId, border); await CR(client, gId, 16); }

      await T(client, bx + 16, y + 14, g.title, 14, `PD_GroupTitle_${gi}`, pid, 700);

      // divider
      const dvId = await R(client, bx + 16, y + 40, cW - 32, 1, `PD_GroupDiv_${gi}`, pid);
      if (dvId) { await F(client, dvId, divider); }

      let ry = y + 52;
      for (let ti = 0; ti < g.tasks.length; ti++) {
        const task = g.tasks[ti];

        // checkbox “pill”
        const cbId = await R(client, bx + 16, ry + 10, 22, 22, `PD_CB_${gi}_${ti}`, pid);
        if (cbId) {
          if (task.s === 'done') await F(client, cbId, lightGreen);
          else await F(client, cbId, offWhite);
          await S(client, cbId, border);
          await CR(client, cbId, 6);
        }

        // check mark text
        if (task.s === 'done') {
          await T(client, bx + 22, ry + 12, '✓', 14, `PD_CBMark_${gi}_${ti}`, pid, 700);
        } else if (task.s === 'in_progress') {
          await T(client, bx + 22, ry + 12, '⏳', 12, `PD_CBMark_${gi}_${ti}`, pid, 700);
        }

        // task title
        const titleX = bx + 48;
        await T(client, titleX, ry + 12, task.t, 12, `PD_Task_${gi}_${ti}`, pid);

        // status tag right
        const tagW = 76, tagH = 22;
        const tagX = bx + cW - tagW - 16;
        const tagY = ry + 11;
        const tagId = await R(client, tagX, tagY, tagW, tagH, `PD_Tag_${gi}_${ti}`, pid);
        if (tagId) {
          if (task.s === 'done') await F(client, tagId, lightGreen);
          else await F(client, tagId, offWhite);
          await CR(client, tagId, 10);
          await S(client, tagId, border);
        }
        const tagText = task.s === 'done' ? 'Erledigt' : task.s === 'in_progress' ? 'In Arbeit' : 'Offen';
        await T(client, tagX + 12, tagY + 5, tagText, 10, `PD_TagText_${gi}_${ti}`, pid, 700);

        ry += rowH;
      }

      y += cardH + 12;
    }

    y += 8;

    // ── Updates Card (kurz)
    const upH = 110;
    const upId = await R(client, bx, y, cW, upH, 'PD_Updates', pid);
    if (upId) { await F(client, upId, white); await S(client, upId, border); await CR(client, upId, 16); }
    await T(client, bx + 16, y + 14, 'Updates', 14, 'PD_UpTitle', pid, 700);
    await T(client, bx + 16, y + 40, '✅ Untergrund begradigt (heute 14:10)', 11, 'PD_Up1', pid);
    await T(client, bx + 16, y + 58, '⏳ Schottertragschicht gestartet', 11, 'PD_Up2', pid);
    await T(client, bx + 16, y + 76, '→ Alle Updates ansehen', 11, 'PD_UpCTA', pid, 700);
    y += upH + 16;

    // ── Bottom CTAs
    const ctaH = 54;
    const chatId = await R(client, bx, y, cW, ctaH, 'PD_CTA_Chat', pid);
    if (chatId) { await F(client, chatId, green); await CR(client, chatId, 16); }
    await T(client, bx + cW / 2 - 86, y + 17, '💬  Chat mit Handwerker', 14, 'PD_CTA_ChatText', pid, 700);
    y += ctaH + 12;

    const secId = await R(client, bx, y, cW, 48, 'PD_CTA_Issue', pid);
    if (secId) { await F(client, secId, white); await S(client, secId, border); await CR(client, secId, 14); }
    await T(client, bx + cW / 2 - 54, y + 14, 'Problem melden', 14, 'PD_CTA_IssueText', pid);

  } catch (e: any) {
    console.error('❌', e?.message || e);
  } finally {
    await client.close();
  }
}

main();
```
