/**
 * Handwerker /handwerker-anfrage-detail — Aktueller Zustand + KI-Varianten (Figma 66-423, 66-386, …)
 * Variante 2: Standard 66-387 (wenn in Figma nur 66-386 genannt war, per FIGMA_HW_INQUIRY_VARIANT2_NODE_ID anpassen)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toFigmaApiNodeId } from './figma-resolve-frame60-nodes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'public', 'app-assets');
const PNG_SCALE = 2;

const SPECS = [
  ['FIGMA_HW_INQUIRY_CURRENT_NODE_ID', '66:423', 'hw-frame66-inquiry-current.png'],
  ['FIGMA_HW_INQUIRY_VARIANT1_NODE_ID', '66:386', 'hw-frame66-inquiry-variant1.png'],
  ['FIGMA_HW_INQUIRY_VARIANT2_NODE_ID', '66:387', 'hw-frame66-inquiry-variant2.png'],
];

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
    console.error('FIGMA_ACCESS_TOKEN fehlt (.env.local).');
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  for (const [envKey, defaultId, fileName] of SPECS) {
    const nodeId = process.env[envKey]?.trim().replace(/-/g, ':') || defaultId;
    await exportPng(fileKey, token, nodeId, fileName);
  }

  console.log('figma:pull-handwerker-inquiry-detail abgeschlossen.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
