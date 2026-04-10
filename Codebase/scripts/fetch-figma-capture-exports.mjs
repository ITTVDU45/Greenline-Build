/**
 * Frame 59 → capture-frame59-ar.png + capture-frame59-upload.png
 * Defaults (GreenLine-Build):
 *   AR-Karte „AR-Scan starten“: node-id=25-90
 *   Foto-Karte Icon: node-id=130-72
 *   AR-Karte grüne Kachel mit Haken: Gruppe node-id=21-15 (enthält 21:13 + 21:11).
 *   Hinweis: Node 21:11 allein liefert oft ein leeres PNG (Bild-/Mask-Layer).
 * Überschreiben: FIGMA_CAPTURE_AR_NODE_ID, FIGMA_CAPTURE_UPLOAD_NODE_ID, FIGMA_CAPTURE_CHECK_NODE_ID
 *
 * Hinweis: Export über Figma REST Images API (FIGMA_ACCESS_TOKEN).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toFigmaApiNodeId } from './figma-resolve-frame60-nodes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'public', 'app-assets');

const OUT_AR = 'capture-frame59-ar.png';
const OUT_UPLOAD = 'capture-frame59-upload.png';
const OUT_AR_CHECK = 'capture-frame59-ar-check.png';
const PNG_SCALE = 2;

/** @see node-id=25-90 — Illustration in der AR-Karte */
const DEFAULT_CAPTURE_AR_NODE_ID = '25:90';

/** @see node-id=130-72 — Cloud-Icon in der Foto-Karte */
const DEFAULT_CAPTURE_UPLOAD_NODE_ID = '130:72';

/** @see node-id=21-15 — Group 1: grüner Kreis + „checked 4“ (21:11) */
const DEFAULT_CAPTURE_CHECK_NODE_ID = '21:15';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

async function figmaGetImages({ fileKey, token, nodeIds, format, scale }) {
  const url = new URL(`https://api.figma.com/v1/images/${fileKey}`);
  url.searchParams.set('ids', nodeIds.map(toFigmaApiNodeId).join(','));
  url.searchParams.set('format', format);
  if (format === 'png' && scale) url.searchParams.set('scale', String(scale));

  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.err || data?.message || res.statusText;
    throw new Error(`Figma Images API ${res.status}: ${msg}`);
  }
  if (data.err) throw new Error(String(data.err));
  return data.images ?? {};
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
}

async function exportPng(fileKey, token, nodeId, destFileName) {
  const apiId = toFigmaApiNodeId(nodeId);
  const images = await figmaGetImages({
    fileKey,
    token,
    nodeIds: [nodeId],
    format: 'png',
    scale: PNG_SCALE,
  });
  const exportUrl = images[apiId];
  if (!exportUrl) {
    throw new Error(`Kein PNG für Node ${apiId}`);
  }
  const dest = path.join(outputDir, destFileName);
  await downloadToFile(exportUrl, dest);
  console.log(`Figma → ${path.relative(repoRoot, dest)} (${apiId})`);
}

async function main() {
  loadEnvFile(path.join(repoRoot, '.env.local'));
  loadEnvFile(path.join(repoRoot, '.env'));

  const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
  const fileKey = (process.env.FIGMA_FILE_KEY || '5chhaCONWAzGuiTeptCpEu').trim();

  if (!token) {
    console.error('FIGMA_ACCESS_TOKEN fehlt. Dann: npm run figma:inspect-capture für IDs, figma:pull-capture zum Export.');
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const arId =
    process.env.FIGMA_CAPTURE_AR_NODE_ID?.trim().replace(/-/g, ':') || DEFAULT_CAPTURE_AR_NODE_ID;
  const uploadId =
    process.env.FIGMA_CAPTURE_UPLOAD_NODE_ID?.trim().replace(/-/g, ':') ||
    DEFAULT_CAPTURE_UPLOAD_NODE_ID;
  const checkId =
    process.env.FIGMA_CAPTURE_CHECK_NODE_ID?.trim().replace(/-/g, ':') ||
    DEFAULT_CAPTURE_CHECK_NODE_ID;

  console.log(`AR-Bild: ${arId}`);
  console.log(`Upload-Icon: ${uploadId}`);
  console.log(`AR-Check: ${checkId}`);
  await exportPng(fileKey, token, arId, OUT_AR);
  await exportPng(fileKey, token, uploadId, OUT_UPLOAD);
  await exportPng(fileKey, token, checkId, OUT_AR_CHECK);
  console.log('figma:pull-capture abgeschlossen.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
