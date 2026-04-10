/**
 * Heuristik: AR-Karten-Illustration + Upload-Cloud unter Frame 59 (419:277)
 */

import { flattenVisible } from './figma-resolve-frame60-nodes.mjs';

function area(n) {
  const b = n.absoluteBoundingBox;
  if (!b?.width || !b?.height) return 0;
  return Math.abs(b.width * b.height);
}

function scoreArIllustration({ n }) {
  const name = (n.name || '').toLowerCase();
  let s = 0;
  if (n.type === 'TEXT') return -500;
  if (/plus|\+|foto.*hinzu|add.*photo|kreis|circle.*button|upload.*icon|cloud/.test(name)) {
    const b = n.absoluteBoundingBox;
    if (b && b.width <= 140 && b.height <= 140) return -400;
  }
  if (
    /ar.?scan|arscan|scan start|illustration|smartphone|phone|mockup|garten.*grid|grid|baum|tree|miniatur|grafik/.test(
      name
    )
  ) {
    s += 100;
  }
  if (/scan|ar\b|visual|bild|image|photo/.test(name)) s += 40;
  if (['FRAME', 'GROUP', 'RECTANGLE', 'COMPONENT', 'INSTANCE'].includes(n.type)) s += 15;
  const b = n.absoluteBoundingBox;
  if (b && b.width >= 70 && b.height >= 70 && b.width <= 400) s += 25;
  return s;
}

function scoreUploadIcon({ n }) {
  const name = (n.name || '').toLowerCase();
  let s = 0;
  if (/cloud|upload|hochladen|foto.*hinzu|add.*photo|pill|button.*upload/.test(name)) s += 90;
  if (/icon|vector|union|subtract/.test(name) && /cloud|upload|arrow/.test(name)) s += 40;
  if (['VECTOR', 'BOOLEAN_OPERATION', 'FRAME', 'GROUP', 'COMPONENT', 'INSTANCE'].includes(n.type)) {
    s += 10;
  }
  const b = n.absoluteBoundingBox;
  if (b && b.width >= 16 && b.width <= 120 && b.height >= 16 && b.height <= 120) s += 20;
  return s;
}

function pickBest(flat, scorer) {
  const ranked = flat
    .map((e) => ({ e, s: scorer(e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => {
      if (b.s !== a.s) return b.s - a.s;
      return area(b.e.n) - area(a.e.n);
    });
  const best = ranked[0]?.e.n;
  return best ? { id: best.id, name: best.name, type: best.type } : null;
}

/** @param {any} rootDoc */
export function resolveCaptureFrame59ArAndUpload(rootDoc, log) {
  const flat = flattenVisible(rootDoc);
  const ar = pickBest(flat, scoreArIllustration);
  const upload = pickBest(flat, scoreUploadIcon);
  if (log) {
    if (ar) log(`Heuristik AR-Bild: "${ar.name}" (${ar.type}, ${ar.id})`);
    else log('Heuristik: kein AR-Bild-Kandidat');
    if (upload) log(`Heuristik Upload-Icon: "${upload.name}" (${upload.type}, ${upload.id})`);
    else log('Heuristik: kein Upload-Icon-Kandidat');
  }
  return { arIllustration: ar, uploadIcon: upload };
}
