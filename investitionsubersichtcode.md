/**
 * Investitionsübersicht (Kunde)
 * Position: x=20000, y=950
 *
 * Zweck:
 * - Screen nach Vorher/Nachher + Projektinfos
 * - Zeigt Basispreis (ohne Vorarbeiten), erklärt Berechnung & Hinweis zur finalen Kalkulation nach Vor-Ort-Termin
 *
 * Design:
 * - Mobile 380x812
 * - Hero-Card für Basispreis
 * - Optional: Erfahrungslevel (Multiplikator) als horizontale Cards
 * - Hinweisbox (neutral, nicht warnend)
 * - Trust-Checks
 * - Sticky CTA "Vor-Ort-Termin vereinbaren"
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'jmvpmjo3';
const FRAME_X = 20000;
const FRAME_Y = 950;

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

function eur(value: number) {
  return `${value.toLocaleString('de-DE')} €`;
}

type Level = {
  key: 'basic' | 'standard' | 'profi' | 'experte';
  title: string;
  years: string;
  mult: number;
};

async function main() {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js'],
  });
  const client = new Client({ name: 'investitionsuebersicht-kunde', version: '1.0.0' }, { capabilities: {} });

  // Mock (an euer Modell angelehnt)
  const mock = {
    flaecheM2: 30,
    basispreisProM2: 60,
    basispreisOhneVorarbeiten: 1800, // 30*60 (ohne Mult)
    selectedLevel: 'standard' as Level['key'],
  };

  const levels: Level[] = [
    { key: 'basic', title: 'Basic', years: '0–3 Jahre', mult: 0.85 },
    { key: 'standard', title: 'Standard', years: '3–10 Jahre', mult: 1.0 },
    { key: 'profi', title: 'Profi', years: '10–20 Jahre', mult: 1.2 },
    { key: 'experte', title: 'Experte', years: '20+ Jahre', mult: 1.35 },
  ];

  const endpreis = (lvl: Level) =>
    Math.round(mock.flaecheM2 * mock.basispreisProM2 * lvl.mult);

  try {
    await client.connect(transport);
    console.log('\n🔗 Verbinde...');
    await sleep(1800);

    const jr = await client.callTool({ name: 'join_channel', arguments: { channel: CHANNEL } });
    const jt = jr?.content?.[0]?.text || '';
    console.log('📡 Join:', jt);
    if (jt.includes('Error')) { console.error('❌ Join fehlgeschlagen'); return; }
    await sleep(1200);
    console.log('✅ Verbunden!\n');

    const fR = await client.callTool({
      name: 'create_frame',
      arguments: {
        x: FRAME_X,
        y: FRAME_Y,
        width: W,
        height: H,
        name: 'Investitionsübersicht (Kunde)',
      },
    });
    await sleep(60);
    const pid = await xFrame(fR);

    const bx = pid ? 0 : FRAME_X;
    const by = pid ? 0 : FRAME_Y;

    let y = by;

    // Background
    const bgId = await R(client, bx, by, W, H, 'INV_BG', pid);
    if (bgId) await F(client, bgId, offWhite);

    // Header
    const headerH = 132;
    const headerId = await R(client, bx, y, W, headerH, 'INV_Header', pid);
    if (headerId) await F(client, headerId, darkGreen);

    const backId = await T(client, bx + P, y + 18, '← Zurück', 13, 'INV_Back', pid, 600);
    if (backId) await F(client, backId, white);

    const hTitle = await T(client, bx + P, y + 50, 'Investitionsübersicht', 28, 'INV_Title', pid, 700);
    if (hTitle) await F(client, hTitle, white);

    const hSub = await T(
      client,
      bx + P,
      y + 92,
      'Erste transparente Kosteneinschätzung auf Basis deiner Angaben.',
      13,
      'INV_Subline',
      pid,
      500
    );
    if (hSub) await F(client, hSub, { ...white, a: 0.9 });

    y += headerH + 18;

    /**
     * HERO: Basispreis Card
     */
    const heroH = 222;

    // shadow
    const heroShadow = await R(client, bx + P, y + 4, cW, heroH, 'INV_Hero_Shadow', pid);
    if (heroShadow) { await F(client, heroShadow, shadowSoft); await CR(client, heroShadow, 20); }

    // card
    const heroId = await R(client, bx + P, y, cW, heroH, 'INV_Hero_Card', pid);
    if (heroId) {
      await F(client, heroId, { ...white, a: 0.98 });
      await S(client, heroId, border, 1);
      await CR(client, heroId, 20);
    }

    const hx = bx + P + 18;
    let hy = y + 18;

    const heroLabel = await T(client, hx, hy, 'Basispreis (ohne Vorarbeiten)', 12, 'INV_Hero_Label', pid, 600);
    if (heroLabel) await F(client, heroLabel, textMid);

    hy += 20;

    const heroPrice = await T(client, hx, hy, eur(mock.basispreisOhneVorarbeiten), 40, 'INV_Hero_Price', pid, 800);
    if (heroPrice) await F(client, heroPrice, green);

    hy += 48;

    const heroCalc = await T(
      client,
      hx,
      hy,
      `${mock.flaecheM2} m² × ${mock.basispreisProM2} € × Erfahrungsfaktor`,
      13,
      'INV_Hero_Calc',
      pid,
      500
    );
    if (heroCalc) await F(client, heroCalc, textLight);

    hy += 26;

    const heroDesc = await T(
      client,
      hx,
      hy,
      'Dieser Basispreis ergibt sich aus der Projektfläche und einem festen Quadratmeterpreis. Je nach Erfahrungslevel des Handwerksbetriebs wird ein transparenter Multiplikator angewendet.',
      13,
      'INV_Hero_Desc',
      pid,
      500
    );
    if (heroDesc) await F(client, heroDesc, textDark);

    y += heroH + 22;

    /**
     * Erfahrungslevel (horizontal)
     * Hinweis: echter Horizontal-Scroll ist im MCP meist nicht nötig – wir legen 2–3 Cards sichtbar nebeneinander.
     */
    const secTitle = await T(client, bx + P, y, 'Erfahrungslevel & Endpreis', 16, 'INV_Level_Title', pid, 700);
    if (secTitle) await F(client, secTitle, textDark);

    y += 24;

    const cardW = 170;
    const cardH = 92;
    const gap = 12;

    for (let i = 0; i < levels.length; i++) {
      const lvl = levels[i];
      const x = bx + P + i * (cardW + gap);

      // we keep them on canvas even if they overflow (wirkt wie horizontal scroll)
      const isActive = lvl.key === mock.selectedLevel;

      const lvlShadow = await R(client, x, y + 3, cardW, cardH, `INV_Level_${lvl.key}_Shadow`, pid);
      if (lvlShadow) { await F(client, lvlShadow, { r: 0, g: 0, b: 0, a: 0.06 }); await CR(client, lvlShadow, 16); }

      const lvlCard = await R(client, x, y, cardW, cardH, `INV_Level_${lvl.key}_Card`, pid);
      if (lvlCard) {
        await F(client, lvlCard, isActive ? { ...lightGreen, a: 0.55 } : { ...white, a: 0.98 });
        await S(client, lvlCard, isActive ? green : border, isActive ? 1.5 : 1);
        await CR(client, lvlCard, 16);
      }

      const tx = x + 14;
      let ty = y + 12;

      const t1 = await T(client, tx, ty, lvl.title, 14, `INV_Level_${lvl.key}_Title`, pid, 700);
      if (t1) await F(client, t1, textDark);

      ty += 18;

      const t2 = await T(client, tx, ty, `${lvl.years} • ×${lvl.mult}`, 12, `INV_Level_${lvl.key}_Meta`, pid, 500);
      if (t2) await F(client, t2, textMid);

      ty += 22;

      const t3 = await T(client, tx, ty, eur(endpreis(lvl)), 16, `INV_Level_${lvl.key}_Price`, pid, 800);
      if (t3) await F(client, t3, green);
    }

    y += cardH + 24;

    // Divider
    const div = await R(client, bx + P, y, cW, 1, 'INV_Divider_1', pid);
    if (div) await F(client, div, divider);
    y += 18;

    /**
     * Hinweisbox (neutral)
     */
    const hintH = 150;

    const hintShadow = await R(client, bx + P, y + 4, cW, hintH, 'INV_Hint_Shadow', pid);
    if (hintShadow) { await F(client, hintShadow, shadowSoft); await CR(client, hintShadow, 18); }

    const hint = await R(client, bx + P, y, cW, hintH, 'INV_Hint_Box', pid);
    if (hint) {
      await F(client, hint, { ...white, a: 0.98 });
      await S(client, hint, border, 1);
      await CR(client, hint, 18);
    }

    const hx2 = bx + P + 18;
    let hy2 = y + 16;

    const hintTitle = await T(client, hx2, hy2, 'Wichtiger Hinweis', 15, 'INV_Hint_Title', pid, 800);
    if (hintTitle) await F(client, hintTitle, darkGreen);

    hy2 += 26;

    const hintText = await T(
      client,
      hx2,
      hy2,
      'Diese Kalkulation dient als erste Orientierung. Vorarbeiten, Bodenbeschaffenheit, Zugangssituation oder Sonderwünsche werden beim Vor-Ort-Termin geprüft. Die finale Kalkulation erfolgt gemeinsam mit dem Handwerksunternehmen nach Besichtigung.',
      13,
      'INV_Hint_Text',
      pid,
      500
    );
    if (hintText) await F(client, hintText, textDark);

    y += hintH + 18;

    /**
     * Trust Checks
     */
    const trust1 = await T(client, bx + P, y, '✔ Transparent berechnet', 13, 'INV_Trust_1', pid, 600);
    if (trust1) await F(client, trust1, textMid);
    y += 20;

    const trust2 = await T(client, bx + P, y, '✔ Keine versteckten Kosten', 13, 'INV_Trust_2', pid, 600);
    if (trust2) await F(client, trust2, textMid);
    y += 20;

    const trust3 = await T(client, bx + P, y, '✔ Finale Abstimmung vor Beauftragung', 13, 'INV_Trust_3', pid, 600);
    if (trust3) await F(client, trust3, textMid);

    /**
     * Sticky CTA (unten)
     */
    const ctaH = 60;
    const ctaY = by + H - ctaH - 28;

    // CTA Shadow
    const ctaShadow = await R(client, bx + P, ctaY + 4, cW, ctaH, 'INV_CTA_Shadow', pid);
    if (ctaShadow) { await F(client, ctaShadow, { r: 0, g: 0, b: 0, a: 0.12 }); await CR(client, ctaShadow, 18); }

    const cta = await R(client, bx + P, ctaY, cW, ctaH, 'INV_CTA_Primary', pid);
    if (cta) { await F(client, cta, green); await CR(client, cta, 18); }

    const ctaText = await T(client, bx + P + 22, ctaY + 18, 'Vor-Ort-Termin vereinbaren', 16, 'INV_CTA_Text', pid, 800);
    if (ctaText) await F(client, ctaText, white);

    // Secondary link (optional, über CTA)
    const secLink = await T(client, bx + W / 2 - 70, ctaY - 22, 'Erfahrungslevel ändern', 13, 'INV_Secondary_Level', pid, 600);
    if (secLink) await F(client, secLink, textMid);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SCREEN ERSTELLT: Investitionsübersicht (Kunde)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📍 x=' + FRAME_X + ', y=' + FRAME_Y);
    console.log('📏 380x812 | "Investitionsübersicht"\n');
  } catch (e: any) {
    console.error('\n❌', e?.message || e);
  } finally {
    await client.close();
  }
}

main();