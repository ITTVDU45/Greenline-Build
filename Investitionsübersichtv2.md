Das ist eine sehr solide Basis! Du hast die Struktur, die Hierarchie und die Figma-MCP-Logik schon hervorragend aufgebaut.

Beim Abgleich deines Codes mit dem Screenshot sind mir jedoch ein paar Details aufgefallen, die noch nicht zu 100 % mit dem Bild übereinstimmen, sowie ein kleiner Fehler im Code (`lightGreen` war nicht definiert).

Hier sind die Anpassungen, die ich vorgenommen habe, damit es **exakt** wie auf deinem Screenshot aussieht:

1. **Hintergrund & Karten-Rahmen:** Der Screenshot zeigt einen komplett weißen Hintergrund für die gesamte App (`#FFFFFF`). Die "Ausgewählte Elemente"-Liste hat keinen Rahmen (Card-Border), sondern liegt flach auf dem Hintergrund. Ich habe die `INV_List_Card` entfernt und den App-Hintergrund auf Weiß gesetzt.
2. **Häkchen (Checkmarks):** Im Bild sind das ausgefüllte, grüne Kreise mit einem weißen "✓". In deinem Code war ein hellgrüner Kreis mit grünem Haken angedacht (und `lightGreen` fehlte in der Farb-Definition).
3. **Basispreis-Trenner:** Im Screenshot ist der "Basispreis" oben **und** unten durch eine feine Linie abgetrennt. Das habe ich ergänzt.
4. **Ausrichtung (X-Koordinaten):** Ich habe die X-Koordinaten für die Preise, das "=" und die Einheiten leicht angepasst, damit sie in sauberen Spalten stehen.

Hier ist der bereinigte, angepasste und direkt lauffähige TypeScript-Code:

```typescript
/**
 * Investitionsübersicht (Kunde) – Screenshot Layout
 * Position: x=20000, y=1700
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const CHANNEL = 'jmvpmjo3';
const FRAME_X = 20000;
const FRAME_Y = 1700;

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

// Farben exakt an Screenshot angepasst
const green = hex('#1F7A4D');
const white = { r: 1, g: 1, b: 1 };
const bg = hex('#FFFFFF'); // Kompletter Screen ist weiß
const border = hex('#E8E8E8');
const divider = hex('#EDEDED');

const textDark = hex('#1f2937');
const textMid = hex('#4b5563');

const hintBg = hex('#F4F5F7'); // Etwas weicheres Grau für die Hinweisbox
const shadowSoft = { r: 0, g: 0, b: 0, a: 0.06 };

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
    arguments: { x, y, text: t, fontSize: s, name: n, ...(p ? { parentId: p } : {}), ...(fw ? { fontWeight: fw } : {}) },
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

function eur1(n: number) {
  return `${Math.round(n).toLocaleString('de-DE')} €`;
}

type Item = {
  title: string;
  qtyLabel: string;
  unitLabel: string;
  total: number;
};

async function main() {
  const transport = new StdioClientTransport({
    command: 'bun',
    args: ['/Users/tolgahanvardar/Desktop/greenlinebuild figma/cursor-talk-to-figma-mcp/dist/server.js'],
  });
  const client = new Client({ name: 'investitionsuebersicht-screenshot', version: '1.0.0' }, { capabilities: {} });

  const items: Item[] = [
    { title: 'Terrasse',   qtyLabel: '45 m²',         unitLabel: '180 € / m²', total: 8100 },
    { title: 'Rollrasen',  qtyLabel: '120 m²',        unitLabel: '25 € / m²',  total: 3000 },
    { title: 'Gartenhaus', qtyLabel: '12 m²',         unitLabel: 'Pauschal',   total: 2500 },
    { title: 'Brunnen',    qtyLabel: '1,50 × 2,00 m', unitLabel: 'Pauschal',   total: 1000 },
  ];
  const basispreis = items.reduce((a, b) => a + b.total, 0);

  try {
    await client.connect(transport);
    await sleep(1800);

    const jr = await client.callTool({ name: 'join_channel', arguments: { channel: CHANNEL } });
    const jt = jr?.content?.[0]?.text || '';
    if (jt.includes('Error')) { console.error('❌ Join fehlgeschlagen'); return; }
    await sleep(900);

    const fR = await client.callTool({
      name: 'create_frame',
      arguments: { x: FRAME_X, y: FRAME_Y, width: W, height: H, name: 'Investitionsübersicht (Screenshot)' },
    });
    await sleep(60);

    const pid = await xFrame(fR);
    const bx = pid ? 0 : FRAME_X;
    const by = pid ? 0 : FRAME_Y;

    // Background (Weiß)
    const bgId = await R(client, bx, by, W, H, 'INV_BG', pid);
    if (bgId) await F(client, bgId, bg);

    let y = by;

    /** 1) Top Bar */
    const topH = 74;
    const title = await T(client, bx + W / 2 - 92, y + 40, 'Investitionsübersicht', 18, 'INV_Title', pid, 700);
    if (title) await F(client, title, textDark);

    const topDiv = await R(client, bx + P, y + topH, cW, 1, 'INV_Top_Divider', pid);
    if (topDiv) await F(client, topDiv, divider);

    y += topH + 20;

    /** 2) Hero Image Card */
    const heroH = 200;
    const hero = await R(client, bx + P, y, cW, heroH, 'INV_Hero_Image', pid);
    if (hero) {
      await F(client, hero, { r: 0.82, g: 0.86, b: 0.84 });
      await CR(client, hero, 12);
      await S(client, hero, border, 1);
    }

    const overlayH = 36;
    const overlay = await R(client, bx + P + 10, y + heroH - overlayH - 10, cW - 20, overlayH, 'INV_Hero_Overlay', pid);
    if (overlay) {
      await F(client, overlay, { r: 0, g: 0, b: 0, a: 0.45 });
      await CR(client, overlay, 8);
    }
    const overlayText = await T(
      client, bx + P + 24, y + heroH - overlayH - 10 + 10,
      'Visualisierung basierend auf deinen Angaben.', 12, 'INV_Hero_OverlayText', pid, 500
    );
    if (overlayText) await F(client, overlayText, white);

    y += heroH + 30;

    /** 3) Section: Ausgewählte Elemente */
    const sectionTitle = await T(client, bx + P, y, 'Ausgewählte Elemente', 18, 'INV_Section_Title', pid, 700);
    if (sectionTitle) await F(client, sectionTitle, textDark);
    y += 30;

    let ly = y;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];

      // Solid Green Check Circle
      const cc = await R(client, bx + P, ly, 22, 22, `INV_Check_${i}`, pid);
      if (cc) { await F(client, cc, green); await CR(client, cc, 11); }
      
      // White checkmark
      const ct = await T(client, bx + P + 5, ly + 2, '✓', 14, `INV_CheckIcon_${i}`, pid, 800);
      if (ct) await F(client, ct, white);

      // Left label
      const leftText = await T(client, bx + P + 34, ly + 2, `${it.title} – ${it.qtyLabel}`, 15, `INV_ItemLeft_${i}`, pid, 400);
      if (leftText) await F(client, leftText, textDark);

      // Unit (Aligned Right-ish)
      const unit = await T(client, bx + P + 175, ly + 3, it.unitLabel, 14, `INV_Unit_${i}`, pid, 400);
      if (unit) await F(client, unit, textMid);

      // Equals symbol
      const eq = await T(client, bx + P + 245, ly + 3, '=', 14, `INV_Eq_${i}`, pid, 400);
      if (eq) await F(client, eq, textMid);

      // Total (Green, Bold)
      const total = await T(client, bx + P + 265, ly + 2, eur1(it.total), 16, `INV_Total_${i}`, pid, 700);
      if (total) await F(client, total, green);

      ly += 36;
    }

    y = ly + 10;

    /** 4) Basispreis */
    const baseDivTop = await R(client, bx + P, y, cW, 1, 'INV_Base_DivTop', pid);
    if (baseDivTop) await F(client, baseDivTop, divider);
    
    y += 16;
    const baseLabel = await T(client, bx + P, y + 4, 'Basispreis', 16, 'INV_Base_Label', pid, 700);
    if (baseLabel) await F(client, baseLabel, textDark);

    const baseValue = await T(client, bx + P + 245, y, eur1(basispreis), 20, 'INV_Base_Value', pid, 800);
    if (baseValue) await F(client, baseValue, green);
    y += 36;

    const baseDivBottom = await R(client, bx + P, y, cW, 1, 'INV_Base_DivBottom', pid);
    if (baseDivBottom) await F(client, baseDivBottom, divider);

    y += 30;

    /** 5) Hinweis */
    const hintTitle = await T(client, bx + P, y, 'Hinweis', 16, 'INV_Hint_Title', pid, 700);
    if (hintTitle) await F(client, hintTitle, textDark);
    y += 20;

    const hintH = 120;
    const hint = await R(client, bx + P, y, cW, hintH, 'INV_Hint_Box', pid);
    if (hint) {
      await F(client, hint, hintBg);
      await CR(client, hint, 12);
    }

    const hintText =
      'Diese Kalkulation dient als erste Orientierung.\n' +
      'Vorarbeiten, Bodenbeschaffenheit, Zugangssituation oder\n' +
      'Sonderwünsche werden beim Vor-Ort-Termin geprüft.\n' +
      'Die Kalkulation erfolgt gemeinsam mit dem\n' +
      'Handwerksunternehmen.';

    const ht = await T(client, bx + P + 16, y + 16, hintText, 13, 'INV_Hint_Text', pid, 400);
    if (ht) await F(client, ht, textDark);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SCREEN ERSTELLT: Investitionsübersicht (Angepasst)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (e: any) {
    console.error('\n❌', e?.message || e);
  } finally {
    await client.close();
  }
}

main();

```
