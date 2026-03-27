export type FeatureKey =
  | 'terrasse'
  | 'rollrasen'
  | 'gartenhaus'
  | 'brunnen'
  | 'gartenweg';

const SELECTED_FEATURE_KEY = 'glb-selected-feature';
const SELECTED_FEATURES_KEY = 'glb-selected-features';
const CURRENT_FEATURE_INDEX_KEY = 'glb-current-feature-index';
const FEATURE_DETAILS_KEY = 'glb-feature-details';

export const featureConfigs: Record<
  FeatureKey,
  {
    title: string;
    sizeLabel: string;
    sizeValue: string;
    measureLabel: string;
    materials: string[];
    extras: string[];
    summaryMaterial: string;
    summaryExtras: string[];
  }
> = {
  terrasse: {
    title: 'Terrasse gestalten',
    sizeLabel: 'Größe der Terrasse',
    sizeValue: '20',
    measureLabel: 'Quadratmeter',
    materials: ['Holz', 'Naturstein', 'Kies', 'Keramik'],
    extras: ['Beleuchtung', 'Stufen / Höhenunterschiede', 'Überdachung', 'Feuerstelle'],
    summaryMaterial: 'Holz',
    summaryExtras: ['Beleuchtung', 'Überdachung'],
  },
  rollrasen: {
    title: 'Rollrasen gestalten',
    sizeLabel: 'Größe der Rasenfläche',
    sizeValue: '20',
    measureLabel: 'Quadratmeter',
    materials: ['Naturrasen', 'Hydrorasen', 'Kunstrasen'],
    extras: ['Pflegekonzept', 'Automatische Bewässerung', 'Saisonale Bepflanzung'],
    summaryMaterial: 'Rollrasen',
    summaryExtras: ['Pflegekonzept', 'Saisonale Bepflanzung'],
  },
  gartenhaus: {
    title: 'Gartenhaus gestalten',
    sizeLabel: 'Größe oder des Gartenhauses',
    sizeValue: '20',
    measureLabel: 'Quadratmeter',
    materials: ['Holz-Gartenhaus', 'Metall-Gartenhaus', 'WPC-Gartenhaus'],
    extras: [
      'Stromanschluss',
      'Regenrinne / Entwässerung',
      'Überdachung / Vordach',
      'Beleuchtung',
    ],
    summaryMaterial: 'Holz',
    summaryExtras: ['Stromanschluss', 'Beleuchtung'],
  },
  brunnen: {
    title: 'Brunnen gestalten',
    sizeLabel: 'Größe des Brunnens',
    sizeValue: '100',
    measureLabel: 'Zentimeter',
    materials: ['Naturstein Brunnen', 'Beton Brunnen', 'Metall Brunnen', 'Kunststoff Brunnen'],
    extras: ['Beleuchtung', 'Wasserspiel / Geräusch', 'Stromanschluss', 'Filter / Technik'],
    summaryMaterial: 'Beton',
    summaryExtras: ['Beleuchtung', 'Stromanschluss'],
  },
  gartenweg: {
    title: 'Gartenwege gestalten',
    sizeLabel: 'Gartenwege / Pflasterflächen',
    sizeValue: '20',
    measureLabel: 'Quadratmeter',
    materials: ['Beton Gartenweg', 'Pflaster Gartenweg', 'Kies Gartenweg'],
    extras: ['Beleuchtung', 'Stufen / Höhenunterschiede', 'Einfassung / Randsteine'],
    summaryMaterial: 'Pflaster',
    summaryExtras: ['Beleuchtung', 'Einfassung / Randsteine'],
  },
};

export const featureOrder: Array<{ key: FeatureKey; title: string; subtitle: string }> = [
  {
    key: 'terrasse',
    title: 'Terrasse',
    subtitle:
      'Edelbeeten • Fläche nivellieren • Einfassung verlegen • Unterbau vorbereiten • Frostschutzschicht',
  },
  {
    key: 'rollrasen',
    title: 'Rollrasen',
    subtitle: 'Boden auflockern • Boden verbessern • verdichten • Bewässerungsanlagen',
  },
  {
    key: 'gartenhaus',
    title: 'Gartenhaus',
    subtitle: 'Fundament erstellen • Frosttiefe beachten • Verdichtung • Strom / Wasser',
  },
  {
    key: 'brunnen',
    title: 'Brunnen',
    subtitle: 'Schachttiefe • Bohrung setzen • Anschlussleitung',
  },
  {
    key: 'gartenweg',
    title: 'Gartenweg',
    subtitle: 'Unterbau • Pflaster legen • Entwässerung • Rand absichern',
  },
];

export type FeatureDetail = {
  material: string;
  extras: string[];
  size: string;
};

export function getSelectedFeature(): FeatureKey {
  if (typeof window === 'undefined') return 'terrasse';
  const stored = window.localStorage.getItem(SELECTED_FEATURE_KEY) as FeatureKey | null;
  return stored && stored in featureConfigs ? stored : 'terrasse';
}

export function setSelectedFeature(feature: FeatureKey) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SELECTED_FEATURE_KEY, feature);
}

export function getSelectedFeatures(): FeatureKey[] {
  if (typeof window === 'undefined') return ['terrasse'];
  const stored = window.localStorage.getItem(SELECTED_FEATURES_KEY);
  if (!stored) return [getSelectedFeature()];
  try {
    const parsed = JSON.parse(stored) as FeatureKey[];
    const cleaned = parsed.filter((item) => item in featureConfigs);
    return cleaned.length ? cleaned : [getSelectedFeature()];
  } catch {
    return [getSelectedFeature()];
  }
}

export function setSelectedFeatures(features: FeatureKey[]) {
  if (typeof window === 'undefined') return;
  const cleaned = features.filter(
    (item, index) => item in featureConfigs && features.indexOf(item) === index,
  ) as FeatureKey[];
  const next: FeatureKey[] = cleaned.length ? cleaned : ['terrasse'];
  window.localStorage.setItem(SELECTED_FEATURES_KEY, JSON.stringify(next));
  window.localStorage.setItem(CURRENT_FEATURE_INDEX_KEY, '0');
  setSelectedFeature(next[0]);
}

export function getCurrentFeatureIndex(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(CURRENT_FEATURE_INDEX_KEY);
  const parsed = Number(raw ?? '0');
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function setCurrentFeatureIndex(index: number) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CURRENT_FEATURE_INDEX_KEY, String(Math.max(0, index)));
}

export function getCurrentFeature(): FeatureKey {
  const features = getSelectedFeatures();
  const index = Math.min(getCurrentFeatureIndex(), features.length - 1);
  return features[index] ?? 'terrasse';
}

export function getFeatureDetails(): Record<FeatureKey, FeatureDetail> {
  const defaults = Object.fromEntries(
    Object.entries(featureConfigs).map(([key, config]) => [
      key,
      { material: config.summaryMaterial, extras: [...config.summaryExtras], size: config.sizeValue },
    ]),
  ) as Record<FeatureKey, FeatureDetail>;

  if (typeof window === 'undefined') return defaults;

  const stored = window.localStorage.getItem(FEATURE_DETAILS_KEY);
  if (!stored) return defaults;

  try {
    const parsed = JSON.parse(stored) as Partial<Record<FeatureKey, FeatureDetail>>;
    for (const key of Object.keys(defaults) as FeatureKey[]) {
      if (parsed[key]) {
        defaults[key] = {
          material: parsed[key]?.material || defaults[key].material,
          extras:
            parsed[key]?.extras?.filter((item) => typeof item === 'string') || defaults[key].extras,
          size: parsed[key]?.size || defaults[key].size,
        };
      }
    }
    return defaults;
  } catch {
    return defaults;
  }
}

export function updateFeatureDetail(feature: FeatureKey, detail: Partial<FeatureDetail>) {
  if (typeof window === 'undefined') return;
  const current = getFeatureDetails();
  current[feature] = {
    material: detail.material ?? current[feature].material,
    extras: detail.extras ?? current[feature].extras,
    size: detail.size ?? current[feature].size,
  };
  window.localStorage.setItem(FEATURE_DETAILS_KEY, JSON.stringify(current));
}
