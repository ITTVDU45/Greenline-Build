import { projectTypeThumbs } from './screens';

export type ProjectTypeTitle = keyof typeof projectTypeThumbs;

const STORAGE_KEY = 'glb-selected-project-type';

const DEFAULT: ProjectTypeTitle = 'Privatgarten';

const VALID = new Set<string>(Object.keys(projectTypeThumbs));

export function loadProjectType(): ProjectTypeTitle {
  if (typeof window === 'undefined') return DEFAULT;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw && VALID.has(raw)) return raw as ProjectTypeTitle;
  return DEFAULT;
}

export function saveProjectType(title: ProjectTypeTitle): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, title);
}
