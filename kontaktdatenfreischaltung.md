🎯 Ziel der Umstellung
Bisher:
Projekt wird freigeschaltet → beide sehen Checkliste → Plattform bleibt zentraler Kommunikationsort.
Neu:
Nach Zahlung → Kontaktdaten werden freigeschaltet → Handwerksbetrieb übernimmt direkte Kontaktaufnahme.
Das verändert:
Verantwortlichkeit
Erwartungshaltung
UX-Logik
Vertrauensmechanik
Wir brauchen also einen klaren Übergabe-Screen.
🧭 ROADMAP – Neuer Screen
„Kontaktdaten freigeschaltet“
Position im Flow:
Projekt annehmen → Zahlung bestätigen → Kontaktdaten freigeschaltet → Checkliste + Projektbearbeitung
1️⃣ Ziel des Screens
Der Screen muss drei Dinge leisten:
Bestätigung: Zahlung erfolgreich
Übergabe: Kontaktdaten sind jetzt sichtbar
Verantwortung: Handwerksbetrieb muss aktiv Kontakt aufnehmen
2️⃣ Screen-Name
„Kontaktdaten freigeschaltet“
Alternative:
„Projekt erfolgreich aktiviert“
Ich empfehle klar:
➡ Kontaktdaten freigeschaltet
Das ist konkret und eindeutig.
3️⃣ Screen-Aufbau (Mobile 380x812)
🔹 Bereich 1 – Header (Greenbuild Stil)
Dunkelgrüner Header.
Titel:
Kontaktdaten freigeschaltet
Subline:
Du kannst den Kunden jetzt direkt kontaktieren.
Optional:
Zurück-Button links.
🔹 Bereich 2 – Erfolgs-Status
Card mit grünem Check Icon.
Titel:
Projekt erfolgreich aktiviert
Text:
Die Projektgebühr wurde bestätigt.
Die Kontaktdaten des Kunden sind nun für dich sichtbar.
Wirkung:
Sicherheit + Professionalität.
🔹 Bereich 3 – Kunden-Kontaktdaten (Hauptbereich)
Große zentrale Card.
Oben:
Kundenprofil
Inhalt:
Name:
Max Mustermann
Telefon:
+49 171 1234567
E-Mail:
max.mustermann@email.de
Adresse:
Musterstraße 12
50733 Köln
Optional:
Projektstart:
Innerhalb 0–1 Monat
Wichtig:
Telefon und E-Mail leicht hervorgehoben (leicht grüner Tint oder Bold).
Optional:
Klickbare Icons neben:
📞 Anrufen
✉ E-Mail senden
📍 Route öffnen
🔹 Bereich 4 – Handlungsaufforderung
Unterhalb der Kontaktdaten:
Titel:
Nächster Schritt
Text:
Bitte nimm innerhalb von 24 Stunden Kontakt mit dem Kunden auf, um einen Vor-Ort-Termin zu vereinbaren.
Optional kleiner Hinweis:
Eine schnelle Rückmeldung erhöht deine Abschlusswahrscheinlichkeit.
Psychologisch extrem wichtig.
🔹 Bereich 5 – Status-Tracking
Kleine Box:
Kontaktaufnahme:
☐ Noch nicht erfolgt
☐ Kunde kontaktiert
(Später kann das klickbar werden.)
🔹 Bereich 6 – CTA
Primary Button:
„Kontaktaufnahme bestätigen“
Secondary:
„Projekt später bearbeiten“
4️⃣ Neue Prozess-Logik (Backend & UX)
Vorher:
Freischalten → Plattform moderiert
Neu:
Zahlung → Kontaktfreigabe → Verantwortung beim Betrieb
Das bedeutet:
Nach Zahlung passiert automatisch:
Projektstatus = „Kontaktdaten freigeschaltet“
Kunde bekommt Info:
„Ein Handwerksbetrieb wird dich in Kürze kontaktieren.“
Handwerker bekommt Info:
„Kontaktiere den Kunden innerhalb von 24 Stunden.“
5️⃣ Optional – Conversion Booster
Du kannst zusätzlich einbauen:
⭐ Erinnerung:
Wenn keine Kontaktbestätigung nach 24h → Push Reminder
⭐ Performance-Tracking:
„Reaktionszeit wirkt sich auf deine Sichtbarkeit aus“
Das erhöht Qualität.
6️⃣ Was mit der Checkliste passiert?
Die Checkliste bleibt bestehen, aber:
Nicht mehr im Fokus des Freischalt-Screens.
Neue Reihenfolge:
Projekt aktiviert
↓
Kontaktdaten
↓
Kontaktaufnahme
↓
Vor-Ort-Termin
↓
Checkliste beginnt
7️⃣ Psychologische Wirkung
Der Screen muss vermitteln:
Professionalität
Vertrauen
Klare Verantwortung
Keine Plattform-Abhängigkeit
Direkter Geschäftsprozess
8️⃣ UI-Design Hinweise (Greenbuild-Stil)
Viel Weißraum
Große ruhige Cards
Radius 18–20px
Keine aggressive Warnfarbe
Grüner CTA
Dezent graue Divider
Soft Shadows
9️⃣ Strategische Empfehlung
Ich würde zusätzlich oben eine kleine Info-Leiste einbauen:
„Direkte Kommunikation außerhalb der Plattform.“
Das klärt Erwartungshaltung.

/**
 * Kontaktdaten freigeschaltet (Handwerker)
 * Position: x=20000, y=900
 *
 * Flow:
 * Projekt annehmen -> Zahlung -> Kontaktdaten freigeschaltet
 * Handwerksbetrieb muss den Kunden eigenständig kontaktieren.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'jmvpmjo3';
const FRAME_X = 20000;
const FRAME_Y = 900;

const W = 380;
const H = 812;
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

const darkGreen = hex('#1a3c34');
const green = hex('#1F7A4D');
const lightGreen = hex('#e8f5e9');

const white = { r: 1, g: 1, b: 1 };
const offWhite = hex('#F7F7F7');

const border = hex('#E8E8E8');
const divider = { r: 0.88, g: 0.88, b: 0.88 };

const textDark = hex('#1f2937');
const textMid = hex('#4b5563');
const textLight = hex('#6b7280');

const shadowSoft = { r: 0, g: 0, b: 0, a: 0.07 };

async function R(c: any, x: number, y: number, w: number, h: number, n: string, p?: string | null) {
  const r = await c.callTool({
    name: 'create_rectangle',
    arguments: { x, y, width: w, height: h, name: n, ...(p ? { parentId: p } : {}) },
  });
  await sleep(14);
  return xId(r);
}
async function T(
  c: any,
  x: number,
  y: number,
  t: string,
  s: number,
  n: string,
  p?: string | null,
  fw?: number
) {
  const r = await c.callTool({
    name: 'create_text',
    arguments: {
      x,
      y,
      text: t,
      fontSize: s,
      name: n,
      ...(p ? { parentId: p } : {}),
      ...(fw ? { fontWeight: fw } : {}),
    },
  });
  await sleep(10);
  return xId(r);
}
async function F(c: any, id: string, col: { r: number; g: number; b: number; a?: number }) {
  await c.callTool({ name: 'set_fill_color', arguments: { nodeId: id, r: col.r, g: col.g, b: col.b, a: col.a ?? 1 } });
}
async function S(c: any, id: string, col: { r: number; g: number; b: number; a?: number }, w = 1) {
  await c.callTool({ name: 'set_stroke_color', arguments: { nodeId: id, r: col.r, g: col.g, b: col.b, a: col.a ?? 1, width: w } });
}
async function CR(c: any, id: string, r: number) {
  await c.callTool({ name: 'set_corner_radius', arguments: { nodeId: id, radius: r } });
}

async function main() {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js'],
  });

  const client = new Client({ name: 'hw-kontaktdaten-freigeschaltet', version: '1.0.0' }, { capabilities: {} });

  const mock = {
    name: 'Max',
    nachname: 'Mustermann',
    telefon: '+49 171 1234567',
    email: 'max.mustermann@email.de',
    adresse1: 'Musterstraße 12',
    adresse2: '50733 Köln',
    hinweis: 'Bitte nimm innerhalb von 24 Stunden Kontakt auf, um den Vor-Ort-Termin zu vereinbaren.',
  };

  try {
    await client.connect(transport);
    console.log('\n🔗 Verbinde...');
    await sleep(2000);

    const jr = await client.callTool({ name: 'join_channel', arguments: { channel: CHANNEL } });
    const jt = jr?.content?.[0]?.text || '';
    console.log('📡 Join:', jt);
    if (jt.includes('Error')) { console.error('❌ Join fehlgeschlagen'); return; }

    await sleep(1400);
    console.log('✅ Verbunden!\n');

    const fR = await client.callTool({
      name: 'create_frame',
      arguments: {
        x: FRAME_X,
        y: FRAME_Y,
        width: W,
        height: H,
        name: 'Kontaktdaten freigeschaltet (Handwerker)',
      },
    });

    await sleep(60);
    const pid = await xFrame(fR);

    const bx = pid ? 0 : FRAME_X;
    const by = pid ? 0 : FRAME_Y;
    let y = by;

    // Background
    const bgId = await R(client, bx, by, W, H, 'HWK_BG', pid);
    if (bgId) await F(client, bgId, offWhite);

    // Header
    const headerH = 146;
    const headerId = await R(client, bx, y, W, headerH, 'HWK_Header', pid);
    if (headerId) await F(client, headerId, darkGreen);

    const backId = await T(client, bx + P, y + 18, '← Zurück', 13, 'HWK_Back', pid, 600);
    if (backId) await F(client, backId, white);

    const title1 = await T(client, bx + P, y + 52, 'Kontaktdaten', 30, 'HWK_Title_1', pid, 800);
    if (title1) await F(client, title1, white);
    const title2 = await T(client, bx + P, y + 88, 'freigeschaltet', 30, 'HWK_Title_2', pid, 800);
    if (title2) await F(client, title2, white);

    const sub = await T(client, bx + P, y + 124, 'Du kannst den Kunden jetzt direkt kontaktieren.', 13, 'HWK_Sub', pid, 500);
    if (sub) await F(client, sub, { ...white, a: 0.9 });

    y += headerH + 18;

    /**
     * Success Card
     */
    const successH = 92;

    const sShadow = await R(client, bx + P, y + 4, cW, successH, 'HWK_Success_Shadow', pid);
    if (sShadow) { await F(client, sShadow, shadowSoft); await CR(client, sShadow, 16); }

    const sCard = await R(client, bx + P, y, cW, successH, 'HWK_Success_Card', pid);
    if (sCard) { await F(client, sCard, { ...white, a: 0.98 }); await S(client, sCard, border, 1); await CR(client, sCard, 16); }

    const iconWrap = await R(client, bx + P + 16, y + 18, 44, 44, 'HWK_Success_IconWrap', pid);
    if (iconWrap) { await F(client, iconWrap, lightGreen); await CR(client, iconWrap, 22); }
    const icon = await T(client, bx + P + 29, y + 29, '✓', 20, 'HWK_Success_Icon', pid, 900);
    if (icon) await F(client, icon, green);

    const sTitle = await T(client, bx + P + 72, y + 22, 'Projekt erfolgreich aktiviert', 15, 'HWK_Success_Title', pid, 800);
    if (sTitle) await F(client, sTitle, textDark);
    const sText = await T(
      client,
      bx + P + 72,
      y + 44,
      'Zahlung bestätigt. Kontaktdaten sind jetzt sichtbar.',
      12,
      'HWK_Success_Text',
      pid,
      500
    );
    if (sText) await F(client, sText, textMid);

    y += successH + 18;

    /**
     * Kontakt Card
     */
    const contactH = 238;

    const cShadow = await R(client, bx + P, y + 4, cW, contactH, 'HWK_Contact_Shadow', pid);
    if (cShadow) { await F(client, cShadow, shadowSoft); await CR(client, cShadow, 18); }

    const cCard = await R(client, bx + P, y, cW, contactH, 'HWK_Contact_Card', pid);
    if (cCard) { await F(client, cCard, { ...white, a: 0.98 }); await S(client, cCard, border, 1); await CR(client, cCard, 18); }

    const cTitle = await T(client, bx + P + 16, y + 16, 'Kundenprofil', 14, 'HWK_Contact_Title', pid, 800);
    if (cTitle) await F(client, cTitle, textDark);

    let cy = y + 48;
    const cx = bx + P + 16;

    // Name
    const nLabel = await T(client, cx, cy, 'Name', 12, 'HWK_Name_Label', pid, 500);
    if (nLabel) await F(client, nLabel, textMid);
    const nValue = await T(client, cx, cy + 18, `${mock.name} ${mock.nachname}`, 15, 'HWK_Name_Value', pid, 800);
    if (nValue) await F(client, nValue, textDark);

    cy += 54;
    const d1 = await R(client, bx + P, cy, cW, 1, 'HWK_Div_1', pid);
    if (d1) await F(client, d1, divider);
    cy += 14;

    // Telefon
    const tLabel = await T(client, cx, cy, 'Telefon', 12, 'HWK_Tel_Label', pid, 500);
    if (tLabel) await F(client, tLabel, textMid);
    const tValue = await T(client, cx, cy + 18, mock.telefon, 15, 'HWK_Tel_Value', pid, 900);
    if (tValue) await F(client, tValue, green);

    cy += 54;
    const d2 = await R(client, bx + P, cy, cW, 1, 'HWK_Div_2', pid);
    if (d2) await F(client, d2, divider);
    cy += 14;

    // Email
    const eLabel = await T(client, cx, cy, 'E-Mail', 12, 'HWK_Email_Label', pid, 500);
    if (eLabel) await F(client, eLabel, textMid);
    const eValue = await T(client, cx, cy + 18, mock.email, 14, 'HWK_Email_Value', pid, 900);
    if (eValue) await F(client, eValue, green);

    cy += 54;
    const d3 = await R(client, bx + P, cy, cW, 1, 'HWK_Div_3', pid);
    if (d3) await F(client, d3, divider);
    cy += 14;

    // Adresse
    const aLabel = await T(client, cx, cy, 'Adresse', 12, 'HWK_Adr_Label', pid, 500);
    if (aLabel) await F(client, aLabel, textMid);
    const aValue1 = await T(client, cx, cy + 18, mock.adresse1, 14, 'HWK_Adr_Value_1', pid, 800);
    if (aValue1) await F(client, aValue1, textDark);
    const aValue2 = await T(client, cx, cy + 38, mock.adresse2, 14, 'HWK_Adr_Value_2', pid, 800);
    if (aValue2) await F(client, aValue2, textDark);

    y += contactH + 18;

    /**
     * Next step card
     */
    const nextH = 110;

    const nShadow = await R(client, bx + P, y + 4, cW, nextH, 'HWK_Next_Shadow', pid);
    if (nShadow) { await F(client, nShadow, shadowSoft); await CR(client, nShadow, 18); }

    const nCard = await R(client, bx + P, y, cW, nextH, 'HWK_Next_Card', pid);
    if (nCard) { await F(client, nCard, { ...white, a: 0.98 }); await S(client, nCard, border, 1); await CR(client, nCard, 18); }

    const nextTitle = await T(client, bx + P + 16, y + 16, 'Nächster Schritt', 14, 'HWK_Next_Title', pid, 800);
    if (nextTitle) await F(client, nextTitle, textDark);

    const nextText = await T(client, bx + P + 16, y + 40, mock.hinweis, 13, 'HWK_Next_Text', pid, 500);
    if (nextText) await F(client, nextText, textMid);

    y += nextH + 18;

    /**
     * Status tracking (mini)
     */
    const statusH = 72;

    const stShadow = await R(client, bx + P, y + 4, cW, statusH, 'HWK_Status_Shadow', pid);
    if (stShadow) { await F(client, stShadow, shadowSoft); await CR(client, stShadow, 16); }

    const stCard = await R(client, bx + P, y, cW, statusH, 'HWK_Status_Card', pid);
    if (stCard) { await F(client, stCard, { ...white, a: 0.98 }); await S(client, stCard, border, 1); await CR(client, stCard, 16); }

    const stTitle = await T(client, bx + P + 16, y + 14, 'Kontaktaufnahme', 13, 'HWK_Status_Title', pid, 800);
    if (stTitle) await F(client, stTitle, textDark);

    const box1 = await R(client, bx + P + 16, y + 38, 16, 16, 'HWK_Box_1', pid);
    if (box1) { await F(client, box1, white); await S(client, box1, border, 1); await CR(client, box1, 4); }
    const st1 = await T(client, bx + P + 38, y + 36, 'Noch nicht erfolgt', 12, 'HWK_Status_1', pid, 500);
    if (st1) await F(client, st1, textMid);

    const box2 = await R(client, bx + P + 190, y + 38, 16, 16, 'HWK_Box_2', pid);
    if (box2) { await F(client, box2, white); await S(client, box2, border, 1); await CR(client, box2, 4); }
    const st2 = await T(client, bx + P + 212, y + 36, 'Kunde kontaktiert', 12, 'HWK_Status_2', pid, 500);
    if (st2) await F(client, st2, textMid);

    /**
     * Sticky CTA unten
     */
    const ctaH = 60;
    const ctaY = by + H - ctaH - 28;

    const ctaShadow = await R(client, bx + P, ctaY + 4, cW, ctaH, 'HWK_CTA_Shadow', pid);
    if (ctaShadow) { await F(client, ctaShadow, { r: 0, g: 0, b: 0, a: 0.12 }); await CR(client, ctaShadow, 18); }

    const cta = await R(client, bx + P, ctaY, cW, ctaH, 'HWK_CTA_Primary', pid);
    if (cta) { await F(client, cta, green); await CR(client, cta, 18); }

    const ctaText = await T(client, bx + P + 44, ctaY + 18, 'Kontaktaufnahme bestätigen', 16, 'HWK_CTA_Text', pid, 900);
    if (ctaText) await F(client, ctaText, white);

    // Secondary link
    const sec = await T(client, bx + W / 2 - 72, ctaY - 22, 'Projekt später bearbeiten', 13, 'HWK_Secondary', pid, 600);
    if (sec) await F(client, sec, textMid);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 HANDWERKER SCREEN ERSTELLT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📍 x=' + FRAME_X + ', y=' + FRAME_Y);
    console.log('📏 380x812 | "Kontaktdaten freigeschaltet"\n');
  } catch (e: any) {
    console.error('\n❌', e?.message || e);
  } finally {
    await client.close();
  }
}

main();