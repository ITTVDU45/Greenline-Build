import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const outputDir = path.resolve('public', 'app-assets');

const blobHashes = {
  terraceKeramikCard: '3ffb4f51a90d667067a583239b12964ad325555f',
  terraceNatursteinCard: '19f4148ae98cd85528f4b894c4e37e9814a964ce',
  terraceWoodScene: '4b16c3bf48dbc12e858bf5ed888be6101e68ce90',
  terraceStoneScene: '4304b215c1f3d32d1c5836277d3551d8b8a9bf3d',
  terraceGravelScene: '1821870eceaad23a3aa15a38976e9cc6b1d7aeac',
  terraceWoodCard: '6cd779cc8675c4fa27b531f5ea833cd883d07580',
  terraceKeramikScene: '3d69fade866e9d265c263963ff33ebbbf649bff9',
  materialHolzCard: 'eafeb117be5c1c800d4ba4566bdc60f35e1b5709',
  materialKeramikCard: '1220359331584fba8bb4363c35091386c9acb499',
  materialKiesCard: '2b09eb4726de92587a4dea74016c2505eed4e557',
  materialNatursteinCard: '42a8406680642dd28814deb417f9a9c6be8e750e',
  materialSurpriseCard: '6f52ff83449378829edae0ff6cc3c60c0a468b22',
};

const fileSpecs = {
  'terrace-stone-scene.png': { type: 'blob', hash: blobHashes.terraceStoneScene },
  'terrace-gravel-scene.png': { type: 'blob', hash: blobHashes.terraceGravelScene },
  'terrace-wood-scene.png': { type: 'blob', hash: blobHashes.terraceWoodScene },
  'terrace-keramik-scene.png': { type: 'blob', hash: blobHashes.terraceKeramikScene },
  'terrace-naturstein-card.png': { type: 'blob', hash: blobHashes.terraceNatursteinCard },
  'material-holz-card.png': { type: 'blob', hash: blobHashes.materialHolzCard },
  'material-keramik-card.png': { type: 'blob', hash: blobHashes.materialKeramikCard },
  'material-kies-card.png': { type: 'blob', hash: blobHashes.materialKiesCard },
  'material-naturstein-card.png': { type: 'blob', hash: blobHashes.materialNatursteinCard },
  'material-surprise-card.png': { type: 'blob', hash: blobHashes.materialSurpriseCard },
  'analysis-avatar.svg': { type: 'svg', markup: avatarSvg('KI Analyse') },
  'profile-avatar.svg': { type: 'svg', markup: avatarSvg('Profil') },
  'greenline-team-avatar.svg': { type: 'svg', markup: avatarSvg('GLB Team') },
  'handwerker-rebo-garden.svg': {
    type: 'svg',
    markup: avatarSvg('RG', '#295d42', '#9fd26f'),
  },
  'handwerker-mueller-sohn.svg': {
    type: 'svg',
    markup: avatarSvg('MS', '#214b74', '#d7e26d'),
  },
  'handwerker-rebo-gala.svg': {
    type: 'svg',
    markup: avatarSvg('GA', '#3a5d33', '#f2c94c'),
  },
  'brain-icon.svg': {
    type: 'svg',
    markup: iconSvg('KI Upgrade', '◎', 'Visualisierung & Beratung'),
  },
  'chatbot-card.svg': {
    type: 'svg',
    markup: iconSvg('GreenLine AI', '✦', 'Schnelle Antworten im MVP'),
  },
  'payment-strip.svg': { type: 'svg', markup: stripSvg() },
  'brand-logo.svg': { type: 'svg', markup: logoSvg('primary') },
  'brand-logo-alt.svg': { type: 'svg', markup: logoSvg('alt') },
  'split-transfer.svg': {
    type: 'svg',
    markup: iconSvg('Vorher / Nachher', '→', 'Transformation im Vergleich'),
  },
  'capture-ar.svg': {
    type: 'svg',
    markup: iconSvg('AR Scan', '▣', 'Flaeche digital erfassen'),
  },
  'selection-check.svg': {
    type: 'svg',
    markup: iconSvg('Ausgewaehlt', '✓', 'Bereit fuer den naechsten Schritt'),
  },
  'capture-upload.svg': {
    type: 'svg',
    markup: iconSvg('Upload', '⇪', 'Foto oder Scan hochladen'),
  },
};

function readGitBlob(hash) {
  const result = spawnSync('git', ['cat-file', 'blob', hash], {
    cwd: process.cwd(),
    encoding: null,
    maxBuffer: 20 * 1024 * 1024,
  });

  if (result.status !== 0 || !result.stdout) {
    throw new Error(`Unable to read git blob ${hash}: ${result.stderr?.toString() ?? 'unknown error'}`);
  }

  return result.stdout;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function avatarSvg(label, accentA = '#2f7d57', accentB = '#f2c94c') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentA}"/>
      <stop offset="100%" stop-color="${accentB}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" rx="160" fill="url(#bg)"/>
  <circle cx="160" cy="120" r="56" fill="#ffffff" opacity="0.92"/>
  <path d="M76 264c18-52 60-78 84-78s66 26 84 78" fill="#ffffff" opacity="0.92"/>
  <text x="160" y="294" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#173c2b">${escapeXml(
    label
  )}</text>
</svg>`;
}

function iconSvg(title, symbol, subtitle = '') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2f7d57"/>
      <stop offset="100%" stop-color="#9fd26f"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" rx="40" fill="#f5f9f2"/>
  <circle cx="160" cy="126" r="78" fill="url(#g)" opacity="0.14"/>
  <text x="160" y="150" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="92" fill="#22543d">${escapeXml(
    symbol
  )}</text>
  <text x="160" y="226" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#153729">${escapeXml(
    title
  )}</text>
  <text x="160" y="258" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#517364">${escapeXml(
    subtitle
  )}</text>
</svg>`;
}

function logoSvg(variant = 'primary') {
  const bg = variant === 'alt' ? '#163426' : '#f5f9f2';
  const fg = variant === 'alt' ? '#f5f9f2' : '#163426';
  const accent = '#9fd26f';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240" role="img" aria-label="GreenLine Build">
  <rect width="760" height="240" rx="36" fill="${bg}"/>
  <path d="M84 154c24-60 58-90 102-90 33 0 56 14 76 40l-30 22c-12-14-27-22-45-22-27 0-50 19-65 50-15 31-28 46-54 56l-16-28c16-8 24-14 32-28Z" fill="${accent}"/>
  <text x="170" y="118" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="${fg}">GreenLine</text>
  <text x="170" y="172" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="${fg}">Build</text>
</svg>`;
}

function stripSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 140" role="img" aria-label="Zahlungsmethoden">
  <rect width="760" height="140" rx="28" fill="#ffffff"/>
  <rect x="28" y="28" width="164" height="84" rx="18" fill="#173c2b"/>
  <rect x="208" y="28" width="164" height="84" rx="18" fill="#2f7d57"/>
  <rect x="388" y="28" width="164" height="84" rx="18" fill="#9fd26f"/>
  <rect x="568" y="28" width="164" height="84" rx="18" fill="#f2c94c"/>
  <text x="110" y="79" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#f7faf7">VISA</text>
  <text x="290" y="79" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#f7faf7">MASTERCARD</text>
  <text x="470" y="79" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#173c2b">PayPal</text>
  <text x="650" y="79" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#173c2b">SEPA</text>
</svg>`;
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [fileName, spec] of Object.entries(fileSpecs)) {
  const targetPath = path.join(outputDir, fileName);
  if (spec.type === 'blob') {
    fs.writeFileSync(targetPath, readGitBlob(spec.hash));
  } else {
    fs.writeFileSync(targetPath, spec.markup, 'utf8');
  }
  console.log(`wrote ${targetPath}`);
}
