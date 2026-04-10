import type { FeatureKey } from './customerFlow';
import { getMinioAssetUrl, minioAssetCatalog } from './minioAssets';

export const assets = Object.freeze(
  Object.fromEntries(minioAssetCatalog.map((assetKey) => [assetKey, getMinioAssetUrl(assetKey)]))
) as Record<(typeof minioAssetCatalog)[number], string>;

export type TerrasseExtraCardCopy = {
  image: string;
  lead: string;
  sub: string;
};

/** Texte & Medien pro Extra (Schluessel = Eintrag in `featureConfigs.terrasse.extras`) */
export const terrasseExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraTerrasseBeleuchtung,
    lead: 'Atmosphaerische und funktionale Lichtloesungen fuer die Terrasse.',
    sub: 'Spots · Stufen-/Wegebeleuchtung · Wand-/Akzentlicht',
  },
  'Stufen / Hoehenunterschiede': {
    image: assets.extraTerrasseStufen,
    lead: 'Sichere und saubere Loesungen fuer Niveauwechsel im Terrassenbereich.',
    sub: 'Stufen · Podeste · Ausgleich von Gefaelle',
  },
  Ueberdachung: {
    image: assets.extraTerrasseUberdachung,
    lead: 'Schutz vor Sonne und Wetter - fuer mehr Komfort und Nutzungszeit.',
    sub: 'Pergola · Terrassendach · Markise',
  },
  Feuerstelle: {
    image: assets.extraTerrasseFeuerstelle,
    lead: 'Gemuetlicher Treffpunkt mit Waerme - passend zur Umgebung geplant.',
    sub: 'Feuerschale · Aussenkamin · Gas-/Bioethanol-Optionen',
  },
};

/** Texte & Medien pro Extra (Schluessel = Eintrag in `featureConfigs.rollrasen.extras`) */
export const rollrasenExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Pflegekonzept: {
    image: assets.extraRollrasenPflegekonzept,
    lead: 'Abgestimmte Pflege fuer einen dauerhaft gesunden und belastbaren Rasen.',
    sub: 'Maehintervalle · Duengung · Pflegeempfehlungen',
  },
  'Automatische Bewaesserung': {
    image: assets.extraRollrasenBewaesserung,
    lead: 'Effiziente und gleichmaessige Wasserversorgung des Rollrasens.',
    sub: 'Sprinklersysteme · Zeitschalt- / Sensorsteuerung',
  },
  'Saisonale Bepflanzung': {
    image: assets.extraRollrasenBepflanzung,
    lead: 'Ergaenzende Pflanzkonzepte passend zur Jahreszeit und Umgebung.',
    sub: 'Stauden · Zierpflanzen · Akzentbepflanzung',
  },
};

/** Texte & Medien pro Extra (Schluessel = Eintrag in `featureConfigs.gartenhaus.extras`) */
export const gartenhausExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Stromanschluss: {
    image: assets.extraGartenhausStromanschluss,
    lead: 'Elektrische Anbindung fuer Licht, Steckdosen und Geraete im Gartenhaus.',
    sub: 'Innen-/Aussensteckdosen · Beleuchtung · Geraeteanschluesse',
  },
  'Regenrinne / Entwaesserung': {
    image: assets.extraGartenhausRegenrinne,
    lead: 'Kontrollierte Ableitung von Regenwasser zum Schutz der Bausubstanz.',
    sub: 'Regenrinne · Fallrohr · Anschluss an Versickerung',
  },
  'Ueberdachung / Vordach': {
    image: assets.extraGartenhausUeberdachung,
    lead: 'Zusaetzlicher Schutz vor Witterung im Eingangs- oder Terrassenbereich.',
    sub: 'Vordach · Ueberstand · Erweiterter Wetterschutz',
  },
  Beleuchtung: {
    image: assets.extraGartenhausBeleuchtung,
    lead: 'Funktionale und stimmungsvolle Lichtloesungen fuer Innen- und Aussenbereiche.',
    sub: 'Innenbeleuchtung · Aussenleuchten · Akzentlicht',
  },
};

/** Texte & Medien pro Extra (Schluessel = Eintrag in `featureConfigs.brunnen.extras`) */
export const brunnenExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraBrunnenBeleuchtung,
    lead: 'Gezielte Lichtakzente zur Inszenierung des Brunnens bei Tag und Nacht.',
    sub: 'Unterwasserleuchten · Spots · Akzentbeleuchtung',
  },
  'Wasserspiel / Geraeusch': {
    image: assets.extraBrunnenWasserspiel,
    lead: 'Art und Intensitaet des Wasserlaufs zur gewuenschten Atmosphaere.',
    sub: 'Ruhiges Plaetschern · Belebtes Wasserspiel · Geraeuschintensitaet waehlbar',
  },
  Stromanschluss: {
    image: assets.extraBrunnenStromanschluss,
    lead: 'Elektrische Versorgung fuer Pumpe, Beleuchtung und Steuerung.',
    sub: 'Anschlussart · Kabelfuehrung · Absicherung',
  },
  'Filter / Technik': {
    image: assets.extraBrunnenFilter,
    lead: 'Technische Komponenten fuer sauberes Wasser und zuverlaessigen Betrieb.',
    sub: 'Filteranlage · Pumpe · Wartungszugang',
  },
};

/** Texte & Medien pro Extra (Schluessel = Eintrag in `featureConfigs.gartenweg.extras`) */
export const gartenwegExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraGartenwegBeleuchtung,
    lead: 'Funktionale und stimmungsvolle Beleuchtung fuer sichere und gut sichtbare Wege.',
    sub: 'Wegeleuchten · Bodenspots · Orientierungslicht',
  },
  'Stufen / Hoehenunterschiede': {
    image: assets.extraGartenwegStufen,
    lead: 'Saubere Ausfuehrung von Niveauwechseln fuer Komfort und Sicherheit.',
    sub: 'Stufenanlagen · Podeste · Ausgleich von Gefaelle',
  },
  'Einfassung / Randsteine': {
    image: assets.extraGartenwegEinfassung,
    lead: 'Stabile Abgrenzung zur dauerhaften Fixierung der Pflasterflaechen.',
    sub: 'Randsteine · Einfassungen · Saubere Kantenfuehrung',
  },
};

/** Bild-Zuordnung fuer Terrassen-Material (inkl. Legacy "WPC" -> Kies-Bild) */
export const terrasseMaterialImages: Record<string, string> = {
  Holz: assets.materialTerrasseHolz,
  Keramik: assets.materialTerrasseKeramik,
  Kies: assets.materialTerrasseKies,
  Naturstein: assets.materialTerrasseNaturstein,
  WPC: assets.materialTerrasseKies,
  'Egal, ueberrasche mich': assets.materialTerrasseSurprise,
};

/** Bild-Zuordnung fuer Rollrasen-Material */
export const rollrasenMaterialImages: Record<string, string> = {
  Hydrorasen: assets.materialRollrasenHydrorasen,
  Kunstrasen: assets.materialRollrasenKunstrasen,
  Naturrasen: assets.materialRollrasenNaturrasen,
  'Egal, ueberrasche mich': assets.materialRollrasenSurprise,
};

/** Bild-Zuordnung fuer Gartenhaus-Material */
export const gartenhausMaterialImages: Record<string, string> = {
  'Holz-Gartenhaus': assets.materialGartenhausHolz,
  'Metall-Gartenhaus': assets.materialGartenhausMetall,
  'WPC-Gartenhaus': assets.materialGartenhausWpc,
  'Egal, ueberrasche mich': assets.materialGartenhausSurprise,
};

/** Bild-Zuordnung fuer Brunnen-Material */
export const brunnenMaterialImages: Record<string, string> = {
  'Naturstein Brunnen': assets.materialBrunnenNaturstein,
  'Beton Brunnen': assets.materialBrunnenBeton,
  'Metall Brunnen': assets.materialBrunnenMetall,
  'Kunststoff Brunnen': assets.materialBrunnenKunststoff,
  'Egal, ueberrasche mich': assets.materialBrunnenSurprise,
};

/** Bild-Zuordnung fuer Gartenweg-Material */
export const gartenwegMaterialImages: Record<string, string> = {
  'Beton Gartenweg': assets.materialGartenwegBeton,
  'Pflaster Gartenweg': assets.materialGartenwegPflaster,
  'Kies Gartenweg': assets.materialGartenwegKies,
  'Egal, ueberrasche mich': assets.materialGartenwegSurprise,
};

/** Thumbnails pro Element - gleiche Reihenfolge wie `featureOrder` */
export const featureListThumbs: Record<FeatureKey, string> = {
  brunnen: assets.featureThumbBrunnen,
  gartenhaus: assets.featureThumbGartenhaus,
  gartenweg: assets.featureThumbGartenweg,
  rollrasen: assets.featureThumbRollrasen,
  terrasse: assets.featureThumbTerrasse,
};

export const projectTypeThumbs: Record<
  | 'Privatgarten'
  | 'Gewerbegarten'
  | 'Hotelgarten'
  | 'Schrebergarten / Kleingarten'
  | 'Terrasse / Dachterrasse'
  | 'Balkon',
  string
> = {
  Privatgarten: assets.projectTypePrivatgarten,
  Gewerbegarten: assets.projectTypeGewerbegarten,
  Hotelgarten: assets.projectTypeHotelgarten,
  'Schrebergarten / Kleingarten': assets.projectTypeSchrebergarten,
  'Terrasse / Dachterrasse': assets.projectTypeTerrasse,
  Balkon: assets.projectTypeBalkon,
};

export const routes = [
  { path: '/', label: 'Rollenauswahl' },
  { path: '/landing', label: 'Startseite' },
  { path: '/handwerker-login', label: 'Handwerker Login' },
  { path: '/handwerker-anfrage-detail', label: 'Handwerker Anfrage-Detail' },
  { path: '/login', label: 'Login' },
  { path: '/projekt-auswahl', label: 'Projektauswahl' },
  { path: '/flaeche-erfassen', label: 'Fotos hinzufuegen' },
  { path: '/analyse', label: 'Analyse' },
  { path: '/feature-auswahl', label: 'Element auswaehlen' },
  { path: '/gestaltung-material', label: 'Material auswaehlen' },
  { path: '/gestaltung-extras', label: 'Extras auswaehlen' },
  { path: '/auswahl-zusammenfassung', label: 'Zusammenfassung' },
  { path: '/paket-auswahl', label: 'Paketpreise' },
  { path: '/visualisierung-vorschau', label: 'Gartenvorschau' },
  { path: '/qualitaetsstufe', label: 'Qualitaetsstufe' },
  { path: '/termin-datum', label: 'Termin Datum' },
  { path: '/termin-uhrzeit', label: 'Termin Uhrzeit' },
  { path: '/investitionsuebersicht', label: 'Investitionsuebersicht' },
  { path: '/projektfreischaltung', label: 'Projektfreischaltung' },
  { path: '/dashboard-aktualisiert', label: 'Dashboard' },
  { path: '/vorarbeiten', label: 'Vorarbeiten' },
  { path: '/handwerker-projekte', label: 'Handwerker Projekte' },
  { path: '/handwerker-anfragen', label: 'Handwerker Anfragen' },
  { path: '/handwerker-dashboard', label: 'Handwerker Dashboard' },
  { path: '/handwerker-projekt-annehmen', label: 'Handwerker Projekt Annehmen' },
  { path: '/chat-kunde-handwerker', label: 'Chat Greenline Build' },
  { path: '/chat-handwerker-kunde', label: 'Chat Handwerker Kunde' },
  { path: '/projekt-details', label: 'Projekt Details' },
  { path: '/handwerker-projekt-details', label: 'Handwerker Projekt Details' },
  { path: '/termin-bestaetigung', label: 'Termin Bestaetigung' },
] as const;
