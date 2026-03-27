1) Frame / Layout
Frame Position: x=19000, y=65
Frame Size: w=380 (iPhone-Style), h≈820–900 (sodass Chat scrollt)
Padding: 20 innen (wie vorher)
Farben/Style wie bisher:
DarkGreen Header (ähnlich Projekt-Details)
Primary Green für Buttons/Highlights
White Cards, OffWhite Flächen, Border hellgrau
Corner Radius: 14–18 bei Cards, 16 bei Buttons
2) Header (fixed)
Oben wie beim Projekt-Details Screen:
Links: „← Zurück“
Titel: „Chat“ (groß, bold)
Subtitle: „Projekt: Privatgarten #001“
Rechts: kleines Profilbild/Avatar vom Handwerker (rund)
Optional Badge im Header rechts unter Titel: „Beauftragt“ (kleines Pill-Badge)
3) Kontext-Card (kompakt, direkt unter Header)
Eine kleine Card, damit der Kunde immer weiß, mit wem er schreibt:
Title: „Handwerker: Simpy garden – 4,8/5“
Subline: „Termin: Di, 04. März 2026 · 12:00–12:45“
Mini-Info rechts als Pill: „Antwortzeit: ~ 30 Min“
Unterhalb mini „Statuspunkt“: 🟢 Online oder 🟡 Antwortet später (nur UI)
Card-Design: White, Border, Radius 16.
4) Chat-Verlauf (scroll area)
Darunter ein großer Scrollbereich mit Messages.
Message Styles
Kunden-Nachrichten (rechts):
Bubble: hellgrün oder leicht getönt, Radius 16
Text: dunkel
Timestamp klein (z.B. 10:12) rechts unten in der Bubble oder darunter + muted
Handwerker-Nachrichten (links):
Bubble: weiß mit Border / offwhite
Optional kleiner Avatar-Punkt links oben (dezent)
Timestamp klein
Inhalt (Beispiel-Conversation)
Mindestens 8–10 Messages, gemischt:
Handwerker: Begrüßung + „Ich habe 3/8 Aufgaben erledigt“
Kunde: Rückfrage zu Termin / Material / „Kannst du mir sagen, ob…“
Handwerker: Antwort + Hinweis auf Update in der Checkliste
System/Info Message (zentriert, grau): „Heute“ oder „Gestern“ Divider
Optional: „Anhang“-Message (kleine Card in Bubble) z.B. „Foto_Brunnenanschluss.jpg“
Typing Indicator
Am Ende des Verlaufs (optional, dezent):
„Simpy garden tippt…“ mit drei Punkten (kleine Pills)
5) Quick Actions (dezent, über dem Input)
Eine schmale Zeile mit 2–3 Chips (horizontal scroll möglich):
„📌 Aufgabenstatus ansehen“ (öffnet Projekt-Details / Checkliste)
„📎 Foto senden“
„⚠️ Problem melden“ (führt zu Support-Flow)
Chips: offwhite, Border, Radius 999, Text 12–13.
6) Input Bar (fixed bottom)
Unten sticky Input-Bar im modernen Stil:
Eingabefeld: „Nachricht schreiben…“ (rounded, Border, weiß)
Links im Feld: „+“ oder „📎“ Attachment Icon
Rechts: Send Button (kreisrund oder pill), Primary Green, Icon „➤“
Unterhalb mini Hinweistext (muted, 10–11):
„Bitte keine sensiblen Daten senden. Bei Notfällen: Problem melden.“
7) Zustände (als kleine Notizen im Screen oder Komponenten-Varianten)
Lege 3 State-Varianten im Screen an (als kleine Labels/Notizen am Rand oder als zweite Mini-Gruppe rechts daneben):
Normal: Send aktiv, keine Fehler
Leerer Text: Send disabled (grau)
Upload läuft: kleine Progress-Anzeige in der Input-Bar oder in der Message Bubble
8) UX Details
Chat-Bereich soll scrollbar implizieren (Messages gehen über die Höhe)
Abstände sauber: 10–12px zwischen Bubbles, 16px zwischen Sektionen
Alles im gleichen visuellen System wie „Projekt Details“: Cards, Badges, progressartige Elemente, dezente Borders
9) Naming (für spätere Dev-Übergabe)
Benenne Layer sinnvoll:
CH_Header, CH_ContextCard, CH_Messages, CH_Message_In_01, CH_Message_Out_01, CH_QuickActions, CH_InputBar, CH_SendBtn etc.


/**
 * Chat mit Handwerker (Kunde) – Projekt Chat UI
 * Position: x=19420, y=65  (rechts neben "Projekt Details" platziert, damit nichts überlappt)
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'jmvpmjo3';
const FRAME_X = 19420;
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

// Mock Daten
const projectTitle = 'Privatgarten #001';
const statusLabel = 'Beauftragt';
const handwerker = 'Simply garden · 4,8/5,0';
const appointment = 'Di, 4. März 2026 · 12:00–12:45';
const responseTime = 'Antwortzeit: ~ 30 Min';

type Msg = { who: 'customer' | 'craft'; text: string; time: string; kind?: 'text' | 'system' | 'file' };
const messages: Msg[] = [
  { who: 'craft', text: 'Hi Max 👋 Ich bin heute ab 12:00 bei dir. Ich halte die Checkliste live aktuell.', time: '10:08' },
  { who: 'customer', text: 'Perfekt! Muss ich noch etwas vorbereiten?', time: '10:10' },
  { who: 'craft', text: 'Wenn du kannst: Zugang zur Steckdose + Wasseranschluss. Rest klären wir vor Ort.', time: '10:12' },
  { who: 'customer', text: 'Alles klar. Kannst du bitte besonders auf Privatsphäre achten (Hecke)?', time: '10:13' },
  { who: 'craft', text: 'Ja, mache ich 👍 Ich schlage dir nach dem Vor-Ort-Termin Optionen vor.', time: '10:14' },
  { who: 'craft', text: '📎 Foto_Brunnenanschluss.jpg', time: '10:16', kind: 'file' },
  { who: 'customer', text: 'Danke! Sieht gut aus. Wie lange dauert die Schottertragschicht ungefähr?', time: '10:18' },
  { who: 'craft', text: 'Je nach Untergrund 2–3 Stunden. Ich melde mich mit Update, sobald gestartet.', time: '10:20' },
];

async function main() {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js']
  });

  const client = new Client({ name: 'chat-kunde-handwerker', version: '1.0.0' }, { capabilities: {} });

  try {
    await client.connect(transport);
    await sleep(1200);

    const jr = await client.callTool({ name: 'join_channel', arguments: { channel: CHANNEL } });
    const jt = jr?.content?.[0]?.text || '';
    if (jt.includes('Error')) return;

    await sleep(800);

    // Frame height
    const totalH = 980;

    const fR = await client.callTool({
      name: 'create_frame',
      arguments: { x: FRAME_X, y: FRAME_Y, width: W, height: totalH, name: 'Chat (Kunde) – Handwerker' }
    });
    await sleep(60);
    const pid = await xFrame(fR);

    const bx = pid ? P : FRAME_X + P;
    let y = pid ? 0 : FRAME_Y;

    // ── HEADER
    const hH = 92;
    const hId = await R(client, bx - P, y, W, hH, 'CH_Header', pid);
    if (hId) { await F(client, hId, darkGreen); }

    await T(client, bx, y + 16, '← Zurück', 13, 'CH_Back', pid);
    await T(client, bx, y + 42, 'Chat', 22, 'CH_Title', pid, 700);
    await T(client, bx, y + 68, `Projekt: ${projectTitle}`, 12, 'CH_Sub', pid);

    // Status pill im Header
    const pillW = 92, pillH = 26;
    const pillId = await R(client, bx + cW - pillW, y + 56, pillW, pillH, 'CH_StatusPill', pid);
    if (pillId) { await F(client, pillId, lightGreen); await CR(client, pillId, 12); }
    await T(client, bx + cW - pillW + 14, y + 62, statusLabel, 12, 'CH_StatusText', pid, 700);

    y += hH + 14;

    // ── Kontext-Card
    const ctxH = 96;
    const ctxId = await R(client, bx, y, cW, ctxH, 'CH_ContextCard', pid);
    if (ctxId) { await F(client, ctxId, white); await S(client, ctxId, border); await CR(client, ctxId, 16); }

    // Avatar (Placeholder-Kreis)
    const avId = await R(client, bx + 16, y + 16, 44, 44, 'CH_Avatar', pid);
    if (avId) { await F(client, avId, offWhite); await S(client, avId, border); await CR(client, avId, 22); }
    await T(client, bx + 29, y + 29, '👷', 18, 'CH_AvatarIcon', pid, 700);

    await T(client, bx + 72, y + 16, `Handwerker: ${handwerker}`, 12, 'CH_CtxTitle', pid, 700);
    await T(client, bx + 72, y + 36, `Termin: ${appointment}`, 11, 'CH_CtxSub1', pid);
    await T(client, bx + 72, y + 54, responseTime, 11, 'CH_CtxSub2', pid);

    // Online pill
    const onW = 66, onH = 22;
    const onId = await R(client, bx + cW - onW - 16, y + 16, onW, onH, 'CH_OnlinePill', pid);
    if (onId) { await F(client, onId, lightGreen); await CR(client, onId, 11); await S(client, onId, border); }
    await T(client, bx + cW - onW - 4, y + 20, '🟢 Online', 10, 'CH_OnlineText', pid, 700);

    y += ctxH + 12;

    // ── Quick Actions (Chips)
    const chipsH = 44;
    const chipsId = await R(client, bx, y, cW, chipsH, 'CH_ChipsRow', pid);
    if (chipsId) { await F(client, chipsId, white); await S(client, chipsId, border); await CR(client, chipsId, 16); }

    const chipGap = 8;
    const chipH = 28;
    const chipY = y + 8;
    let cx = bx + 10;

    const chipData = [
      { label: '📌 Aufgabenstatus', w: 128 },
      { label: '📎 Foto senden', w: 96 },
      { label: '⚠️ Problem melden', w: 120 },
    ];

    for (let i = 0; i < chipData.length; i++) {
      const ch = chipData[i];
      const chipId = await R(client, cx, chipY, ch.w, chipH, `CH_Chip_${i}`, pid);
      if (chipId) { await F(client, chipId, offWhite); await S(client, chipId, border); await CR(client, chipId, 999); }
      await T(client, cx + 12, chipY + 7, ch.label, 11, `CH_ChipText_${i}`, pid, 700);
      cx += ch.w + chipGap;
    }

    y += chipsH + 12;

    // ── Divider "Heute"
    const divH = 24;
    const todayId = await R(client, bx, y, cW, divH, 'CH_TodayRow', pid);
    if (todayId) { await F(client, todayId, white); }
    const l1 = await R(client, bx, y + 12, 120, 1, 'CH_TodayLineL', pid);
    const l2 = await R(client, bx + cW - 120, y + 12, 120, 1, 'CH_TodayLineR', pid);
    if (l1) await F(client, l1, divider);
    if (l2) await F(client, l2, divider);
    await T(client, bx + cW / 2 - 18, y + 4, 'Heute', 11, 'CH_TodayText', pid, 700);

    y += divH + 10;

    // ── Chat Area (Messages)
    // Reserviere Platz für Input-Bar am Ende
    const inputH = 86;
    const chatBottom = totalH - inputH - 16;

    // Background für Chat (optional sehr dezent)
    const chatBgId = await R(client, bx - P, y - 6, W, chatBottom - (y - 6), 'CH_ChatBG', pid);
    if (chatBgId) { await F(client, chatBgId, white); }

    const bubblePadX = 12;
    const bubbleMaxW = Math.floor(cW * 0.78);

    // Simple bubble sizing (manuell)
    function bubbleHeight(text: string, kind?: string) {
      if (kind === 'file') return 66;
      const len = text.length;
      const lines = Math.min(4, Math.max(1, Math.ceil(len / 32)));
      return 18 + lines * 16 + 18; // padding + lines + time space
    }

    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      const isOut = m.who === 'customer';
      const bw = m.kind === 'file' ? Math.min(bubbleMaxW, 250) : Math.min(bubbleMaxW, 270);
      const bh = bubbleHeight(m.text, m.kind);

      const bx0 = isOut ? (bx + cW - bw) : bx;
      const by0 = y;

      // Bubble rect
      const bId = await R(client, bx0, by0, bw, bh, `CH_Bubble_${i}`, pid);
      if (bId) {
        if (isOut) {
          await F(client, bId, lightGreen); // customer bubble tinted
        } else {
          await F(client, bId, white);
          await S(client, bId, border);
        }
        await CR(client, bId, 16);
      }

      // File card inside bubble
      if (m.kind === 'file') {
        await T(client, bx0 + bubblePadX, by0 + 12, '📎 Foto_Brunnenanschluss.jpg', 12, `CH_FileTitle_${i}`, pid, 700);
        const miniId = await R(client, bx0 + bubblePadX, by0 + 34, bw - bubblePadX * 2, 18, `CH_FileMini_${i}`, pid);
        if (miniId) { await F(client, miniId, offWhite); await CR(client, miniId, 8); }
        await T(client, bx0 + bubblePadX + 8, by0 + 37, 'Zum Öffnen tippen', 10, `CH_FileHint_${i}`, pid);
      } else {
        // Text
        await T(client, bx0 + bubblePadX, by0 + 12, m.text, 12, `CH_Text_${i}`, pid);
      }

      // Timestamp
      await T(client, bx0 + bw - 44, by0 + bh - 18, m.time, 10, `CH_Time_${i}`, pid);

      // gap
      y += bh + 10;

      // break if exceeds area (in real UI scroll)
      if (y > chatBottom - 80) break;
    }

    // Typing indicator (optional)
    const typingH = 28;
    if (y + typingH < chatBottom - 10) {
      const tId = await R(client, bx, y, 140, typingH, 'CH_Typing', pid);
      if (tId) { await F(client, offWhite as any); await S(client, tId, border); await CR(client, tId, 999); }
      // Some MCP servers require nodeId color set; safer:
      if (tId) { await F(client, tId, offWhite); await S(client, tId, border); await CR(client, tId, 999); }
      await T(client, bx + 12, y + 7, 'Simpy garden tippt…', 11, 'CH_TypingText', pid, 700);
      y += typingH + 8;
    }

    // ── Input Bar (fixed bottom)
    const inputY = totalH - inputH;
    const ibId = await R(client, bx - P, inputY, W, inputH, 'CH_InputBar', pid);
    if (ibId) { await F(client, ibId, white); await S(client, ibId, border); }

    // Top divider
    const topDiv = await R(client, bx - P, inputY, W, 1, 'CH_InputTopDiv', pid);
    if (topDiv) await F(client, topDiv, divider);

    // Input field
    const fieldH = 44;
    const fieldY = inputY + 14;
    const fieldW = cW - 58; // leave space for send button
    const fieldId = await R(client, bx, fieldY, fieldW, fieldH, 'CH_Field', pid);
    if (fieldId) { await F(client, fieldId, white); await S(client, fieldId, border); await CR(client, fieldId, 16); }

    // Attachment icon
    const plusId = await R(client, bx + 10, fieldY + 10, 24, 24, 'CH_Attach', pid);
    if (plusId) { await F(client, plusId, offWhite); await S(client, plusId, border); await CR(client, plusId, 8); }
    await T(client, bx + 16, fieldY + 13, '+', 14, 'CH_AttachPlus', pid, 700);

    // Placeholder
    await T(client, bx + 44, fieldY + 14, 'Nachricht schreiben…', 12, 'CH_Placeholder', pid);

    // Send button
    const sendId = await R(client, bx + fieldW + 10, fieldY, 48, 44, 'CH_SendBtn', pid);
    if (sendId) { await F(client, sendId, green); await CR(client, sendId, 16); }
    await T(client, bx + fieldW + 26, fieldY + 12, '➤', 16, 'CH_SendIcon', pid, 700);

    // Bottom hint
    await T(client, bx, inputY + 62, 'Bitte keine sensiblen Daten senden. Bei Notfällen: Problem melden.', 10, 'CH_Hint', pid);

    console.log('✅ Chat Screen erstellt: Chat (Kunde) – Handwerker');

  } catch (e: any) {
    console.error('❌', e?.message || e);
  } finally {
    await client.close();
  }
}

main();
