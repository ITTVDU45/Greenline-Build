import type { ProjectTypeTitle } from './projectTypeSelection';
import { saveProjectType } from './projectTypeSelection';

export type { ProjectTypeTitle } from './projectTypeSelection';
import { setSelectedFeature, setSelectedFeatures } from './customerFlow';

const ACTIVE_PROJECT_KEY = 'glb-active-project-id';

/** Alle localStorage-Keys, die zum Kunden-Flow gehören (pro Projekt gespeichert). */
export const FLOW_STORAGE_KEYS = [
  'glb-selected-project-type',
  'glb-selected-feature',
  'glb-selected-features',
  'glb-current-feature-index',
  'glb-feature-details',
  'glb-selected-handwerker-id',
  'glb-selected-quality-index',
  'appointment-selection',
] as const;

function snapshotKey(projectId: string): string {
  return `glb-project-flow-${projectId}`;
}

export function getActiveProjectId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACTIVE_PROJECT_KEY);
}

export function setActiveProjectId(projectId: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACTIVE_PROJECT_KEY, projectId);
}

export function hasSnapshot(projectId: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(snapshotKey(projectId)) !== null;
}

export function readFlowStateFromStorage(): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof window === 'undefined') return out;
  for (const key of FLOW_STORAGE_KEYS) {
    const v = window.localStorage.getItem(key);
    if (v !== null) out[key] = v;
  }
  return out;
}

export function applyFlowSnapshot(data: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  for (const key of FLOW_STORAGE_KEYS) {
    if (data[key] !== undefined) window.localStorage.setItem(key, data[key]);
    else window.localStorage.removeItem(key);
  }
}

export function saveSnapshotForProject(projectId: string): void {
  if (typeof window === 'undefined') return;
  const payload = readFlowStateFromStorage();
  window.localStorage.setItem(snapshotKey(projectId), JSON.stringify(payload));
}

export function loadSnapshotForProject(projectId: string): boolean {
  if (typeof window === 'undefined') return false;
  const raw = window.localStorage.getItem(snapshotKey(projectId));
  if (!raw) return false;
  try {
    const data = JSON.parse(raw) as Record<string, string>;
    applyFlowSnapshot(data);
    return true;
  } catch {
    return false;
  }
}

const FLOW_ROUTE_PREFIXES = [
  '/projekt-auswahl',
  '/flaeche-erfassen',
  '/analyse',
  '/feature-auswahl',
  '/gestaltung-material',
  '/gestaltung-extras',
  '/auswahl-zusammenfassung',
  '/paket-auswahl',
  '/visualisierung-vorschau',
  '/qualitaetsstufe',
  '/termin-datum',
  '/termin-buchung',
  '/termin-uhrzeit',
  '/investitionsuebersicht',
  '/projektfreischaltung',
  '/vorarbeiten',
  '/termin-bestaetigung',
  '/projekt-details',
  '/kontaktdaten-freischaltung',
  '/chat-kunde-handwerker',
];

function isFlowRoute(pathname: string): boolean {
  const p = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return FLOW_ROUTE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

/**
 * Beim Wechsel der Route: aktuellen Zustand unter der aktiven Projekt-ID sichern.
 * Beim ersten Betreten des Flows ohne aktive ID: Projekt 001 anlegen.
 */
export function persistFlowStateForActiveProject(pathname: string): void {
  if (typeof window === 'undefined') return;
  let id = getActiveProjectId();
  if (!id && isFlowRoute(pathname)) {
    id = '001';
    setActiveProjectId('001');
    if (!hasSnapshot('001')) {
      saveSnapshotForProject('001');
      return;
    }
  }
  if (id) saveSnapshotForProject(id);
}

/** Einmalig: bestehenden Single-Session-Zustand als Snapshot für Projekt 001 übernehmen. */
export function migrateLegacySnapshot001(): void {
  if (typeof window === 'undefined') return;
  if (hasSnapshot('001')) return;
  saveSnapshotForProject('001');
  if (!getActiveProjectId()) setActiveProjectId('001');
}

export function initializeProjectDefaults(projectType: ProjectTypeTitle): void {
  if (typeof window === 'undefined') return;
  saveProjectType(projectType);
  setSelectedFeatures(['terrasse']);
  setSelectedFeature('terrasse');
  window.localStorage.removeItem('glb-feature-details');
  window.localStorage.setItem('glb-selected-handwerker-id', 'rebo-garden');
  window.localStorage.setItem('glb-selected-quality-index', '0');
  window.localStorage.setItem(
    'appointment-selection',
    JSON.stringify({ date: '2026-03-01', time: '10:00' }),
  );
}

/**
 * Vorherigen Projektstand sichern, gewähltes Projekt aktivieren, gespeicherten Stand laden
 * oder Defaults setzen.
 */
export function switchToProject(projectId: string, projectType: ProjectTypeTitle): void {
  if (typeof window === 'undefined') return;
  const prev = getActiveProjectId();
  if (prev && prev !== projectId) saveSnapshotForProject(prev);
  setActiveProjectId(projectId);
  const loaded = loadSnapshotForProject(projectId);
  if (!loaded) initializeProjectDefaults(projectType);
}
