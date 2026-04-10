/**
 * Listet Kinder von einem Figma-Node (z. B. Frame 60) – hilft, Logo- und Avatar-Node-IDs zu finden.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

function walk(node, depth = 0, out = []) {
  if (!node || depth > 12) return out;
  const id = node.id;
  const name = node.name || '';
  const type = node.type || '';
  out.push({ id, name, type });
  if (node.children && Array.isArray(node.children)) {
    for (const c of node.children) walk(c, depth + 1, out);
  }
  return out;
}

loadEnvFile(path.join(repoRoot, '.env.local'));
loadEnvFile(path.join(repoRoot, '.env'));

const token = process.env.FIGMA_ACCESS_TOKEN?.trim();
const fileKey = (process.env.FIGMA_FILE_KEY || '5chhaCONWAzGuiTeptCpEu').trim();
const frameNodeId = process.argv[2] || '419:279';

if (!token) {
  console.error('FIGMA_ACCESS_TOKEN fehlt in .env.local');
  process.exit(1);
}

const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(frameNodeId)}&depth=8`;
const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
const data = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(data?.err || data?.message || res.statusText);
  process.exit(1);
}

const doc = data.nodes?.[frameNodeId]?.document;
if (!doc) {
  console.error('Node nicht gefunden:', frameNodeId);
  process.exit(1);
}

const flat = walk(doc);
for (const n of flat) {
  console.log(`${n.id}\t${n.type}\t${n.name}`);
}
