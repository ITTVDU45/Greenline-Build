/**
 * Zeigt alle Knoten unter Frame 60 + Layout-/Heuristik-Vorschlag (ohne Download).
 * Hilft, FIGMA_FRAME60_LOGO_NODE_ID / AVATAR_NODE_ID exakt zu setzen.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveFrame60LogoAndAvatar, toFigmaApiNodeId, flattenVisible } from './figma-resolve-frame60-nodes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

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

async function figmaGetNodeDocument(fileKey, token, nodeId) {
  const id = toFigmaApiNodeId(nodeId);
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(id)}&depth=25`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(data?.err || data?.message || res.statusText);
    process.exit(1);
  }
  return data.nodes?.[id]?.document;
}

loadEnvFile(path.join(repoRoot, '.env.local'));
loadEnvFile(path.join(repoRoot, '.env'));

const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
const fileKey = (process.env.FIGMA_FILE_KEY || '5chhaCONWAzGuiTeptCpEu').trim();
const rootId = (process.env.FIGMA_FRAME60_ROOT_ID || '419:279').trim();

if (!token) {
  console.error('FIGMA_ACCESS_TOKEN fehlt in .env.local');
  process.exit(1);
}

const doc = await figmaGetNodeDocument(fileKey, token, rootId);
if (!doc) {
  console.error('Frame nicht gefunden:', rootId);
  process.exit(1);
}

console.log('--- Knoten unter Frame 60 (id, type, name) ---');
const flat = flattenVisible(doc);
for (const { n } of flat) {
  console.log(`${n.id}\t${n.type}\t${n.name}`);
}

console.log('\n--- Vorschlag (zum Kopieren in .env.local, falls exakt passend) ---');
const { logo, avatar } = resolveFrame60LogoAndAvatar(doc, (m) => console.log(`[resolver] ${m}`));
if (logo?.id) {
  const dash = logo.id.replace(/:/g, '-');
  console.log(`FIGMA_FRAME60_LOGO_NODE_ID=${dash}`);
}
if (avatar?.id) {
  const dash = avatar.id.replace(/:/g, '-');
  console.log(`FIGMA_FRAME60_AVATAR_NODE_ID=${dash}`);
}
