import { assets } from './screens';

export type HandwerkerId = 'rebo-garden' | 'mueller-sohn' | 'rebo-gala';

export interface HandwerkerOption {
  id: HandwerkerId;
  /** Anzeige auf Karte & Profil */
  name: string;
  /** Zeile „Betrieb: …“ */
  betriebLabel: string;
  rating: string;
  badge: string;
  experience: string;
  specialization: string;
  skills: string[];
  image: string;
}

const STORAGE_KEY = 'glb-selected-handwerker-id';

export const handwerkerOptions: HandwerkerOption[] = [
  {
    id: 'rebo-garden',
    name: 'Rebo Garden',
    betriebLabel: 'Rebo Garden',
    rating: '4,8 / 5,0',
    badge: 'Geprüft',
    experience: '3 Jahre Erfahrung',
    specialization: 'Spezialisierung:',
    skills: ['Terrasse', 'Rollrasen', 'Zaun & Schutz'],
    image: assets.handwerkerReboGarden,
  },
  {
    id: 'mueller-sohn',
    name: 'Müller & Sohn',
    betriebLabel: 'Müller & Sohn',
    rating: '4,6 / 5,0',
    badge: 'Geprüft',
    experience: '6 Jahre Erfahrung',
    specialization: 'Spezialisierung:',
    skills: ['Pflasterarbeit', 'Gartenpflege', 'Rollrasen'],
    image: assets.handwerkerMuellerSohn,
  },
  {
    id: 'rebo-gala',
    name: 'Rebo Gala',
    betriebLabel: 'Rebo Gala',
    rating: '4,9 / 5,0',
    badge: 'Geprüft',
    experience: '9 Jahre Erfahrung',
    specialization: 'Spezialisierung:',
    skills: ['Bepflanzung', 'Brunnen', 'Pflegekonzept'],
    image: assets.handwerkerReboGala,
  },
];

export function getHandwerkerById(id: HandwerkerId): HandwerkerOption {
  const found = handwerkerOptions.find((h) => h.id === id);
  return found ?? handwerkerOptions[0];
}

export function loadSelectedHandwerkerId(): HandwerkerId {
  if (typeof window === 'undefined') return 'rebo-garden';
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === 'rebo-garden' || raw === 'mueller-sohn' || raw === 'rebo-gala') return raw;
  return 'rebo-garden';
}

export function saveSelectedHandwerkerId(id: HandwerkerId) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, id);
}

const QUALITY_KEY = 'glb-selected-quality-index';

export function loadQualityIndex(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(QUALITY_KEY);
  const n = Number(raw);
  if (n === 0 || n === 1 || n === 2) return n;
  return 0;
}

export function saveQualityIndex(index: number) {
  if (typeof window === 'undefined') return;
  if (index < 0 || index > 2) return;
  window.localStorage.setItem(QUALITY_KEY, String(index));
}
