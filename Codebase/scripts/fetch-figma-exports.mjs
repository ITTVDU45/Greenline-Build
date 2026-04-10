/**
 * Logo + Profilbild für `/projekt-auswahl` → public/app-assets/
 *
 * Standard-Nodes (GreenLine-Build, laut Design):
 * - Logo:     node-id=377-817  → 377:817
 * - Profil:   node-id=377-818  → 377:818
 *
 * Überschreiben: FIGMA_FRAME60_LOGO_NODE_ID / FIGMA_FRAME60_AVATAR_NODE_ID in .env.local
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toFigmaApiNodeId } from './figma-resolve-frame60-nodes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'public', 'app-assets');

/** @see https://www.figma.com/design/5chhaCONWAzGuiTeptCpEu/… node-id=377-817 */
const DEFAULT_LOGO_NODE_ID = '377:817';
/** @see https://www.figma.com/design/5chhaCONWAzGuiTeptCpEu/… node-id=377-818 */
const DEFAULT_AVATAR_NODE_ID = '377:818';

const OUT_LOGO = 'flow-header-logo-frame60.png';
const OUT_AVATAR = 'flow-header-avatar-frame60.png';
const PNG_SCALE = 2;

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

function resolveNodeId(envValue, fallbackId) {
  if (envValue === undefined || envValue === null) return fallbackId;
  const t = String(envValue).trim();
  if (t === '') return fallbackId;
  return t.replace(/-/g, ':');
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
    throw new Error(`Kein PNG-Export für Node ${apiId} (Rechte, oder Node nicht rasterisierbar).`);
  }
  const dest = path.join(outputDir, destFileName);
  await downloadToFile(exportUrl, dest);
  console.log(`Figma → ${path.relative(repoRoot, dest)} (${apiId}, png@${PNG_SCALE}x)`);
}

async function main() {
  loadEnvFile(path.join(repoRoot, '.env.local'));
  loadEnvFile(path.join(repoRoot, '.env'));

  const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
  const fileKey = (process.env.FIGMA_FILE_KEY || '5chhaCONWAzGuiTeptCpEu').trim();

  if (!token) {
    console.error(
      [
        'FIGMA_ACCESS_TOKEN fehlt.',
        'Figma → Settings → Account → Personal access tokens; in .env.local eintragen.',
        'Dann: npm run figma:pull',
      ].join('\n')
    );
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const logoId = resolveNodeId(process.env.FIGMA_FRAME60_LOGO_NODE_ID, DEFAULT_LOGO_NODE_ID);
  const avatarId = resolveNodeId(process.env.FIGMA_FRAME60_AVATAR_NODE_ID, DEFAULT_AVATAR_NODE_ID);

  const logoFromEnv = Boolean(process.env.FIGMA_FRAME60_LOGO_NODE_ID?.trim());
  const avatarFromEnv = Boolean(process.env.FIGMA_FRAME60_AVATAR_NODE_ID?.trim());
  console.log(
    `Logo:    ${logoId}${logoFromEnv ? ' (.env)' : ' (Standard 377:817)'}`
  );
  console.log(
    `Profil:  ${avatarId}${avatarFromEnv ? ' (.env)' : ' (Standard 377:818)'}`
  );

  await exportPng(fileKey, token, logoId, OUT_LOGO);
  await exportPng(fileKey, token, avatarId, OUT_AVATAR);

  console.log('figma:pull abgeschlossen.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
