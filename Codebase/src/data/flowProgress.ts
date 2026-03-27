import { getCurrentFeatureIndex, getSelectedFeatures } from './customerFlow';

function normalizePath(pathname: string): string {
  return pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

/**
 * Anzahl gewählter Elemente (mindestens 1).
 * Pro Element: Material + Extras = 2 Seiten im variablen Block.
 */
export function getTotalFlowPages(): number {
  const n = Math.max(1, getSelectedFeatures().length);
  /** 4 Fixseiten + 2n Material/Extras + 8 Fixseiten (Zusammenfassung … Freischaltung) */
  return 12 + 2 * n;
}

/**
 * Aktuelle Seitennummer im Flow (1 … getTotalFlowPages()).
 * Bei mehreren Elementen: Material/Extras laufen hoch (5,6 → 7,8 → …).
 */
export function getFlowProgressPage(pathname: string): number | null {
  const path = normalizePath(pathname);
  const n = Math.max(1, getSelectedFeatures().length);
  const rawIdx = getCurrentFeatureIndex();
  const idx = Math.min(Math.max(0, rawIdx), n - 1);

  if (path === '/gestaltung-material') {
    return 5 + 2 * idx;
  }
  if (path === '/gestaltung-extras') {
    return 6 + 2 * idx;
  }

  const head: Record<string, number> = {
    '/projekt-auswahl': 1,
    '/flaeche-erfassen': 2,
    '/analyse': 3,
    '/feature-auswahl': 4,
  };

  const tail: Record<string, number> = {
    '/auswahl-zusammenfassung': 5 + 2 * n,
    '/paket-auswahl': 6 + 2 * n,
    '/visualisierung-vorschau': 7 + 2 * n,
    '/qualitaetsstufe': 8 + 2 * n,
    '/termin-datum': 9 + 2 * n,
    '/termin-buchung': 9 + 2 * n,
    '/termin-uhrzeit': 10 + 2 * n,
    '/investitionsuebersicht': 11 + 2 * n,
    '/projektfreischaltung': 12 + 2 * n,
  };

  return tail[path] ?? head[path] ?? null;
}

export function getFlowProgressPercentForPath(pathname: string): number | null {
  const page = getFlowProgressPage(pathname);
  if (page === null) return null;
  const total = getTotalFlowPages();
  if (total <= 0) return null;
  return Math.min(100, Math.round((page / total) * 100));
}
