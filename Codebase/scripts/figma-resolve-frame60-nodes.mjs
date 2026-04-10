/**
 * Ermittelt Logo- und Profil-Node in Frame 60 ohne Raterei:
 * 1) Explizite IDs aus Env
 * 2) Layout: oberer Bereich des Screens, vertikal getrennt links (Logo) / rechts (rundes Profil)
 * 3) Namens-Heuristik (Fallback)
 */

function toFigmaApiNodeId(id) {
  return String(id).replace(/-/g, ':');
}

function flattenVisible(node, depth = 0, acc = []) {
  if (!node || node.visible === false) return acc;
  acc.push({ n: node, depth });
  for (const c of node.children || []) flattenVisible(c, depth + 1, acc);
  return acc;
}

function area(n) {
  const b = n.absoluteBoundingBox;
  if (!b || !b.width || !b.height) return Infinity;
  return Math.abs(b.width * b.height);
}

function scoreLogo(entry) {
  const { n } = entry;
  const name = (n.name || '').toLowerCase();
  let s = 0;
  if (n.type === 'TEXT') return -999;
  if (name === 'logo') s += 150;
  else if (/\blogo\b/.test(name)) s += 110;
  else if (/greenline|wordmark|marken|markenlogo|marke|brand|glb\b/.test(name)) s += 85;
  else if (/icon.*logo|logo.*icon/.test(name)) s += 70;
  if (['FRAME', 'GROUP', 'COMPONENT', 'INSTANCE', 'BOOLEAN_OPERATION', 'VECTOR'].includes(n.type)) {
    s += 12;
  }
  const b = n.absoluteBoundingBox;
  if (b && b.width >= 72 && b.width <= 420 && b.height >= 24 && b.height <= 140) s += 18;
  return s;
}

function scoreAvatar(entry) {
  const { n } = entry;
  const name = (n.name || '').toLowerCase();
  let s = 0;
  if (/avatar|profil|profile|user|foto|bild|portrait/.test(name)) s += 100;
  if (n.type === 'ELLIPSE') s += 75;
  if (n.type === 'FRAME' && /ellipse|circle|round|rund/i.test(name)) s += 45;
  if (n.type === 'RECTANGLE' && n.cornerRadius && n.cornerRadius >= 20) s += 40;
  const b = n.absoluteBoundingBox;
  if (b) {
    const w = b.width;
    const h = b.height;
    if (w >= 36 && w <= 140 && h >= 36 && h <= 140) {
      s += 35;
      if (Math.abs(w - h) < 8) s += 25;
    }
  }
  return s;
}

function pickByName(flat, scorer, label) {
  const scored = flat
    .map((e) => ({ e, s: scorer(e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => {
      if (b.s !== a.s) return b.s - a.s;
      return area(a.e.n) - area(b.e.n);
    });
  if (!scored.length) return null;
  const best = scored[0].e.n;
  return { id: best.id, name: best.name, type: best.type, source: `name:${label}` };
}

/** @param {any} rootDoc Figma document node of Frame 60 */
export function resolveFrame60LogoAndAvatar(rootDoc, log) {
  const rootBox = rootDoc.absoluteBoundingBox;
  const flat = flattenVisible(rootDoc);

  if (!rootBox) {
    const logo = pickByName(flat, scoreLogo, 'Logo');
    const avatar = pickByName(flat, scoreAvatar, 'Profil');
    return { logo, avatar };
  }

  const headerBandY = rootBox.y + rootBox.height * 0.28;

  const headerEntries = flat.filter(({ n }) => {
    if (n.type === 'TEXT' || n.visible === false) return false;
    const b = n.absoluteBoundingBox;
    if (!b) return false;
    const cy = b.y + b.height / 2;
    return cy <= headerBandY && b.height <= 140 && b.height >= 18;
  });

  const midX = rootBox.x + rootBox.width * 0.5;

  const logoCandidates = headerEntries
    .filter(({ n }) => {
      const nn = (n.name || '').toLowerCase();
      if (
        /\bback\b|chevron|arrow|pfeil|close|schlie|menu|hamburger|status|uhr|time|battery|wifi|signal/i.test(nn)
      ) {
        return false;
      }
      const b = n.absoluteBoundingBox;
      if (b.x + b.width > midX + 55) return false;
      return b.width >= 64 && b.width <= 420 && b.height >= 22 && b.height <= 120;
    })
    .sort((a, b) => {
      const ax = a.n.absoluteBoundingBox.x;
      const bx = b.n.absoluteBoundingBox.x;
      if (ax !== bx) return ax - bx;
      return area(a.n) - area(b.n);
    });

  const avatarCandidates = headerEntries
    .filter(({ n }) => {
      const b = n.absoluteBoundingBox;
      if (b.x + b.width < midX - 30) return false;
      const w = b.width;
      const h = b.height;
      if (w < 44 || h < 44 || w > 140 || h > 140) return false;
      return Math.abs(w - h) <= 14 || n.type === 'ELLIPSE';
    })
    .sort((a, b) => b.n.absoluteBoundingBox.x - a.n.absoluteBoundingBox.x);

  let logoPick = null;
  if (logoCandidates.length) {
    const n = logoCandidates[0].n;
    logoPick = {
      id: n.id,
      name: n.name,
      type: n.type,
      source: 'layout:left-header',
    };
  }

  let avatarPick = null;
  if (avatarCandidates.length) {
    const n = avatarCandidates[0].n;
    avatarPick = {
      id: n.id,
      name: n.name,
      type: n.type,
      source: 'layout:right-header',
    };
  }

  if (logoPick && avatarPick) {
    if (log) {
      log(`Layout Logo: "${logoPick.name}" (${logoPick.type}, ${logoPick.id})`);
      log(`Layout Profil: "${avatarPick.name}" (${avatarPick.type}, ${avatarPick.id})`);
    }
    return { logo: logoPick, avatar: avatarPick };
  }

  if (log) {
    if (!logoPick) log('Layout: kein Logo-Kandidat – Fallback Namens-Heuristik');
    if (!avatarPick) log('Layout: kein Profil-Kandidat – Fallback Namens-Heuristik');
  }

  const logoName = logoPick || pickByName(flat, scoreLogo, 'Logo');
  const avatarName = avatarPick || pickByName(flat, scoreAvatar, 'Profil');

  if (log && logoName && !logoPick) {
    log(`Heuristik Logo: "${logoName.name}" (${logoName.type}, ${logoName.id})`);
  }
  if (log && avatarName && !avatarPick) {
    log(`Heuristik Profil: "${avatarName.name}" (${avatarName.type}, ${avatarName.id})`);
  }

  return { logo: logoName, avatar: avatarName };
}

export { toFigmaApiNodeId, flattenVisible };
