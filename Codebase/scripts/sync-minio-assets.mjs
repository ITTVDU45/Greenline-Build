import { spawnSync } from 'node:child_process';
import { Client } from 'minio';
import assetCatalog from '../src/data/assetCatalog.json' with { type: 'json' };

const requiredEnvVars = [
  'MINIO_ENDPOINT',
  'MINIO_PORT',
  'MINIO_USE_SSL',
  'MINIO_PATH_STYLE',
  'MINIO_BUCKET',
  'MINIO_ACCESS_KEY',
  'MINIO_SECRET_KEY',
  'MINIO_PUBLIC_URL',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const client = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  pathStyle: process.env.MINIO_PATH_STYLE === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY?.replace(/^"(.*)"$/, '$1'),
  secretKey: process.env.MINIO_SECRET_KEY?.replace(/^"(.*)"$/, '$1'),
  region: process.env.MINIO_REGION,
});

const bucket = process.env.MINIO_BUCKET;
const assetPrefix = 'app-assets';
const publicBaseUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT.replace(
  /\/+$/,
  ''
 )}`;
const publicBucketBaseUrl =
  process.env.MINIO_PATH_STYLE === 'true' ? `${publicBaseUrl}/${bucket}` : publicBaseUrl;

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

function svgBuffer(markup) {
  return Buffer.from(markup, 'utf8');
}

function avatarSvg(label, accentA = '#2f7d57', accentB = '#f2c94c') {
  return svgBuffer(`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`);
}

function iconSvg(title, symbol, subtitle = '') {
  return svgBuffer(`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`);
}

function logoSvg(variant = 'primary') {
  const bg = variant === 'alt' ? '#163426' : '#f5f9f2';
  const fg = variant === 'alt' ? '#f5f9f2' : '#163426';
  const accent = '#9fd26f';
  return svgBuffer(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240" role="img" aria-label="GreenLine Build">
  <rect width="760" height="240" rx="36" fill="${bg}"/>
  <path d="M84 154c24-60 58-90 102-90 33 0 56 14 76 40l-30 22c-12-14-27-22-45-22-27 0-50 19-65 50-15 31-28 46-54 56l-16-28c16-8 24-14 32-28Z" fill="${accent}"/>
  <text x="170" y="118" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="${fg}">GreenLine</text>
  <text x="170" y="172" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="${fg}">Build</text>
</svg>`);
}

function stripSvg() {
  return svgBuffer(`<?xml version="1.0" encoding="UTF-8"?>
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
</svg>`);
}

function resolvePhotoBlobHash(assetKey) {
  if (assetKey === 'landingBefore') return blobHashes.terraceGravelScene;
  if (
    assetKey === 'landingAfter' ||
    assetKey === 'analysisHero' ||
    assetKey === 'investmentOverviewHero' ||
    assetKey === 'visualVariant1'
  ) {
    return blobHashes.terraceStoneScene;
  }
  if (assetKey === 'visualVorher' || assetKey === 'hwInquiryCurrentGarden') {
    return blobHashes.terraceGravelScene;
  }
  if (assetKey === 'visualVariant2' || assetKey === 'hwInquiryVariantB') {
    return blobHashes.terraceKeramikScene;
  }
  if (assetKey === 'hwInquiryVariantA' || assetKey === 'featureHeroAusgang') {
    return blobHashes.terraceStoneScene;
  }
  if (assetKey === 'packageSelectionHero' || assetKey === 'hwAcceptGardenBg') {
    return blobHashes.terraceKeramikScene;
  }
  if (assetKey === 'hwAcceptProjectThumb') return blobHashes.terraceNatursteinCard;
  if (assetKey.startsWith('projectType')) return blobHashes.terraceStoneScene;
  if (assetKey.startsWith('featureThumbTerrasse')) return blobHashes.terraceWoodScene;
  if (assetKey.startsWith('featureThumbRollrasen')) return blobHashes.terraceKeramikScene;
  if (assetKey.startsWith('featureThumbGartenhaus')) return blobHashes.terraceStoneScene;
  if (assetKey.startsWith('featureThumbBrunnen')) return blobHashes.terraceNatursteinCard;
  if (assetKey.startsWith('featureThumbGartenweg')) return blobHashes.terraceGravelScene;
  if (assetKey === 'materialTerrasseHolz') return blobHashes.materialHolzCard;
  if (assetKey === 'materialTerrasseKeramik') return blobHashes.materialKeramikCard;
  if (assetKey === 'materialTerrasseKies') return blobHashes.materialKiesCard;
  if (assetKey === 'materialTerrasseNaturstein') return blobHashes.materialNatursteinCard;
  if (assetKey === 'materialTerrasseSurprise') return blobHashes.materialSurpriseCard;
  if (assetKey === 'materialRollrasenNaturrasen') return blobHashes.terraceKeramikScene;
  if (assetKey === 'materialRollrasenHydrorasen') return blobHashes.terraceStoneScene;
  if (assetKey === 'materialRollrasenKunstrasen') return blobHashes.terraceWoodScene;
  if (assetKey === 'materialRollrasenSurprise') return blobHashes.materialSurpriseCard;
  if (assetKey === 'materialGartenhausHolz') return blobHashes.materialHolzCard;
  if (assetKey === 'materialGartenhausMetall') return blobHashes.materialNatursteinCard;
  if (assetKey === 'materialGartenhausWpc') return blobHashes.materialKeramikCard;
  if (assetKey === 'materialGartenhausSurprise') return blobHashes.materialSurpriseCard;
  if (assetKey === 'materialBrunnenNaturstein') return blobHashes.materialNatursteinCard;
  if (assetKey === 'materialBrunnenBeton') return blobHashes.materialKeramikCard;
  if (assetKey === 'materialBrunnenMetall') return blobHashes.materialHolzCard;
  if (assetKey === 'materialBrunnenKunststoff') return blobHashes.materialKiesCard;
  if (assetKey === 'materialBrunnenSurprise') return blobHashes.materialSurpriseCard;
  if (assetKey === 'materialGartenwegBeton') return blobHashes.materialKeramikCard;
  if (assetKey === 'materialGartenwegPflaster') return blobHashes.materialNatursteinCard;
  if (assetKey === 'materialGartenwegKies') return blobHashes.materialKiesCard;
  if (assetKey === 'materialGartenwegSurprise') return blobHashes.materialSurpriseCard;
  if (assetKey.startsWith('extraTerrasse')) return blobHashes.terraceWoodScene;
  if (assetKey.startsWith('extraRollrasen')) return blobHashes.terraceKeramikScene;
  if (assetKey.startsWith('extraGartenhaus')) return blobHashes.terraceStoneScene;
  if (assetKey.startsWith('extraBrunnen')) return blobHashes.terraceNatursteinCard;
  if (assetKey.startsWith('extraGartenweg')) return blobHashes.terraceGravelScene;
  return blobHashes.terraceStoneScene;
}

function buildGeneratedAsset(assetKey) {
  if (assetKey === 'brandLogo' || assetKey === 'hwContactBrandLogo') {
    return { buffer: logoSvg('primary'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'brandLogoAlt') {
    return { buffer: logoSvg('alt'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'analysisAvatar') {
    return { buffer: avatarSvg('KI Analyse'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'profileAvatar') {
    return { buffer: avatarSvg('Profil'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'hwCraftHeaderAvatar') {
    return { buffer: avatarSvg('GLB Team'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'handwerkerReboGarden') {
    return { buffer: avatarSvg('RG', '#295d42', '#9fd26f'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'handwerkerMuellerSohn') {
    return { buffer: avatarSvg('MS', '#214b74', '#d7e26d'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'handwerkerReboGala') {
    return { buffer: avatarSvg('GA', '#3a5d33', '#f2c94c'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'brainIcon') {
    return { buffer: iconSvg('KI Upgrade', '◎', 'Visualisierung & Beratung'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'chatbotCard') {
    return { buffer: iconSvg('GreenLine AI', '✦', 'Schnelle Antworten im MVP'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'checkoutStrip' || assetKey === 'packagePaymentMethodsStrip') {
    return { buffer: stripSvg(), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'splitTransfer') {
    return { buffer: iconSvg('Vorher / Nachher', '→', 'Transformation im Vergleich'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'captureArIllustration') {
    return { buffer: iconSvg('AR Scan', '▣', 'Flaeche digital erfassen'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'captureArCheckmark' || assetKey === 'featureSelectionCheck') {
    return { buffer: iconSvg('Ausgewaehlt', '✓', 'Bereit fuer den naechsten Schritt'), contentType: 'image/svg+xml' };
  }
  if (assetKey === 'captureCloudUpload') {
    return { buffer: iconSvg('Upload', '⇪', 'Foto oder Scan hochladen'), contentType: 'image/svg+xml' };
  }
  return null;
}

function buildAssetPayload(assetKey) {
  const generated = buildGeneratedAsset(assetKey);
  if (generated) return generated;

  const hash = resolvePhotoBlobHash(assetKey);
  return {
    buffer: readGitBlob(hash),
    contentType: 'image/png',
  };
}

async function ensureBucketExists() {
  const exists = await client.bucketExists(bucket);
  if (!exists) {
    await client.makeBucket(bucket, process.env.MINIO_REGION);
  }
}

async function ensurePublicReadPolicy() {
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadForAppAssets',
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucket}/${assetPrefix}/*`],
      },
    ],
  };

  await client.setBucketPolicy(bucket, JSON.stringify(policy));
}

async function syncAsset(assetKey) {
  const { buffer, contentType } = buildAssetPayload(assetKey);
  const objectName = `${assetPrefix}/${assetKey}`;

  await client.putObject(bucket, objectName, buffer, buffer.length, {
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=31536000, immutable',
  });

  return `${publicBucketBaseUrl}/${objectName}`;
}

async function main() {
  await ensureBucketExists();
  await ensurePublicReadPolicy();

  const assetKeys = assetCatalog;
  for (const assetKey of assetKeys) {
    const publicUrl = await syncAsset(assetKey);
    console.log(`Uploaded ${assetKey} -> ${publicUrl}`);
  }

  console.log(`Synced ${assetKeys.length} assets to ${bucket}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
