import type { FeatureKey } from './customerFlow';

export const assets = {
  analysisAvatar:
    'https://www.figma.com/api/mcp/asset/3930529a-863f-48b5-af12-5b1567c5ab22',
  analysisHero:
    'https://www.figma.com/api/mcp/asset/5aab9714-fee2-4406-8341-08d1b8ed8407',
  chatbotCard:
    'https://www.figma.com/api/mcp/asset/1e5d3bb4-3ad2-49ac-82e8-6ecdb1edd633',
  checkoutStrip:
    'https://www.figma.com/api/mcp/asset/bb9a6705-3441-451f-9245-119d5f538752',
  /** `/paket-auswahl` – Hero & Zahlungsmethoden (Figma Frame 50, node 377:1676) */
  packageSelectionHero:
    'https://www.figma.com/api/mcp/asset/05397b14-b2d0-43b2-a328-48ef4d0aa18e',
  packagePaymentMethodsStrip:
    'https://www.figma.com/api/mcp/asset/2e2f0582-2f02-4df4-9504-02b45dd6ec49',
  profileAvatar:
    'https://www.figma.com/api/mcp/asset/8b3a5351-8640-422b-a428-71bb04cd60dc',
  brandLogo:
    'https://www.figma.com/api/mcp/asset/65a9fecd-56f7-44e0-a741-18738c6b34b0',
  brandLogoAlt:
    'https://www.figma.com/api/mcp/asset/5fd68891-d1a1-415a-b366-5447524a7998',
  brainIcon:
    'https://www.figma.com/api/mcp/asset/6233e630-1d29-4d48-9693-951c21dbc831',
  landingAfter:
    'https://www.figma.com/api/mcp/asset/f729b160-7463-4f6b-8e81-7e4f5f9e67ba',
  landingBefore:
    'https://www.figma.com/api/mcp/asset/8967bd2d-3a9f-476b-bdb4-7e6297407d45',
  splitTransfer:
    'https://www.figma.com/api/mcp/asset/6f91ae47-bf97-4f3b-b7f9-a557379880ce',
  /** `/visualisierung-vorschau` Vorher & KI-Varianten (Figma Frame 51, node 377:1678) */
  visualVorher:
    'https://www.figma.com/api/mcp/asset/1b85d2df-8890-45bf-8254-9d9024438ef3',
  visualVariant1:
    'https://www.figma.com/api/mcp/asset/30372ccb-7243-4693-94bc-3cd950f01b50',
  visualVariant2:
    'https://www.figma.com/api/mcp/asset/dabe7e85-4025-4736-a9ff-bd26aeb9ed9a',
  /** `/qualitaetsstufe` – Handwerker-Avatare „Passende Handwerker“ (Figma node 377:1680) */
  handwerkerReboGarden:
    'https://www.figma.com/api/mcp/asset/25eca729-2ae8-4b03-8f47-a6bcd264aee4',
  handwerkerMuellerSohn:
    'https://www.figma.com/api/mcp/asset/25e97e50-bcf1-4138-82f4-ef10a8a376ac',
  handwerkerReboGala:
    'https://www.figma.com/api/mcp/asset/c0280a06-1ca0-4605-9237-5adc6b89016e',
  /** `/investitionsuebersicht` – Hero-Visualisierung (Figma Frame 53, node 377:1682) */
  investmentOverviewHero:
    'https://www.figma.com/api/mcp/asset/029b4aad-9ec1-4307-ab29-51a1ba27285a',
  /** Projektauswahl – Kategorie-Thumbnails aus Figma Frame „Section frame 60“ (node 419:279) */
  projectTypePrivatgarten:
    'https://www.figma.com/api/mcp/asset/aa35411e-aeba-4c19-b6bd-9099e3c79637',
  projectTypeGewerbegarten:
    'https://www.figma.com/api/mcp/asset/ba809f3e-dcef-4c0f-b901-1276a41cda84',
  projectTypeHotelgarten:
    'https://www.figma.com/api/mcp/asset/25aa6fce-1f28-4c49-aa24-aec7b17f69c1',
  projectTypeSchrebergarten:
    'https://www.figma.com/api/mcp/asset/0fabb784-06d5-479c-bbb6-41c99fe1a64f',
  projectTypeTerrasse:
    'https://www.figma.com/api/mcp/asset/5a100cb9-8c37-4fb6-981a-287d3858b1ef',
  projectTypeBalkon:
    'https://www.figma.com/api/mcp/asset/68563c7c-69cb-4203-adfa-9e00987e62b7',
  /** `/flaeche-erfassen` – AR-Karte & Fotos (Figma „📸 SCHRITT 4“, node 419:277 / Frame 59) */
  captureArIllustration:
    'https://www.figma.com/api/mcp/asset/1e4a2970-ee7c-45aa-8e43-8d2973c0ce39',
  captureArCheckmark:
    'https://www.figma.com/api/mcp/asset/795ab029-34cf-4134-97ed-d3f2efcd7ac8',
  captureCloudUpload:
    'https://www.figma.com/api/mcp/asset/88160c81-dc5d-4e63-a3d4-fbb60de7d45a',
  /** `/feature-auswahl` – Hero & Karten-Thumbnails (Figma Frame 38, node 377:1649) */
  featureHeroAusgang:
    'https://www.figma.com/api/mcp/asset/edb16a0e-6ae1-4c25-8585-b1d3516390e6',
  featureThumbTerrasse:
    'https://www.figma.com/api/mcp/asset/e615be71-4c4a-4b52-886d-5167f88f79a5',
  featureThumbRollrasen:
    'https://www.figma.com/api/mcp/asset/d508019d-def0-4f74-ab06-d4baa1f5e7a3',
  featureThumbGartenhaus:
    'https://www.figma.com/api/mcp/asset/94a95a66-1b27-46c5-918a-6eee53bbb1ef',
  featureThumbBrunnen:
    'https://www.figma.com/api/mcp/asset/c260225d-803a-4b5a-8b84-35ff68574ae0',
  featureThumbGartenweg:
    'https://www.figma.com/api/mcp/asset/51961738-1603-4270-9ae8-734b40d8dbc0',
  featureSelectionCheck:
    'https://www.figma.com/api/mcp/asset/73a8b881-466d-4346-86b3-66b95cc056ad',
  /** `/gestaltung-material` Terrasse – Kacheln (Figma Frame 39, node 377:1652) */
  materialTerrasseHolz:
    'https://www.figma.com/api/mcp/asset/e98bacfe-d73f-4cfe-9840-71e178127205',
  materialTerrasseNaturstein:
    'https://www.figma.com/api/mcp/asset/4e0d39fb-8203-4a58-8097-89106d4df69e',
  materialTerrasseKies:
    'https://www.figma.com/api/mcp/asset/c17bf68f-c519-4679-b844-624d2aa577e6',
  materialTerrasseKeramik:
    'https://www.figma.com/api/mcp/asset/d858b416-c77d-473b-9efa-f617a9ace4e7',
  materialTerrasseSurprise:
    'https://www.figma.com/api/mcp/asset/fa99b8df-b1b3-4ec8-b484-5bfd03d91267',
  materialTerrasseCheck:
    'https://www.figma.com/api/mcp/asset/3e6d8c9f-a5c9-453f-8dff-4ee1513c5a1c',
  /** `/gestaltung-extras` Terrasse – Karten (Figma Frame 44, node 377:1664) */
  extraTerrasseBeleuchtung:
    'https://www.figma.com/api/mcp/asset/e163ea07-5d4d-4229-a8ba-8be88f3df8ab',
  extraTerrasseStufen:
    'https://www.figma.com/api/mcp/asset/c6292bf2-4031-4dad-a81b-551e3c55d110',
  extraTerrasseUberdachung:
    'https://www.figma.com/api/mcp/asset/44995693-0930-4481-9f94-87dca73996dd',
  extraTerrasseFeuerstelle:
    'https://www.figma.com/api/mcp/asset/7d76b664-8b23-4d96-9363-629164974c82',
  /** `/gestaltung-extras` Rollrasen – Karten (Figma Frame 45, node 377:1666) */
  extraRollrasenPflegekonzept:
    'https://www.figma.com/api/mcp/asset/70c4432a-108a-4c99-9728-d1022dd79cdf',
  extraRollrasenBewaesserung:
    'https://www.figma.com/api/mcp/asset/49d757b9-4c38-4ae2-bafb-7402d2b76fd2',
  extraRollrasenBepflanzung:
    'https://www.figma.com/api/mcp/asset/1774e6de-54b6-4af9-8061-3fd9736ba97b',
  /** `/gestaltung-extras` Gartenhaus – Karten (Figma Frame 46, node 377:1668) */
  extraGartenhausStromanschluss:
    'https://www.figma.com/api/mcp/asset/dd91f382-8688-4967-90b4-7e741edc6826',
  extraGartenhausRegenrinne:
    'https://www.figma.com/api/mcp/asset/76fd2eda-33ce-4bf1-a689-32368332302c',
  extraGartenhausUeberdachung:
    'https://www.figma.com/api/mcp/asset/f578253f-f2eb-4521-a7ca-692ec127584f',
  extraGartenhausBeleuchtung:
    'https://www.figma.com/api/mcp/asset/3c7a46ca-7817-445c-bc2e-6203acb218f6',
  /** `/gestaltung-extras` Brunnen – Karten (Figma Frame 47, node 377:1670) */
  extraBrunnenBeleuchtung:
    'https://www.figma.com/api/mcp/asset/4621ec00-52dc-4ad2-9c22-d008dc1b618c',
  extraBrunnenWasserspiel:
    'https://www.figma.com/api/mcp/asset/f0bbd349-5c52-414d-ae1a-e3adfca6b6d7',
  extraBrunnenStromanschluss:
    'https://www.figma.com/api/mcp/asset/45a82a87-9b3e-4554-8f02-0b6ecf7cdccd',
  extraBrunnenFilter:
    'https://www.figma.com/api/mcp/asset/4c3933e6-7920-4f99-85a9-e3e9804cc413',
  /** `/gestaltung-extras` Gartenweg – Karten (Figma Frame 48, node 377:1672) */
  extraGartenwegBeleuchtung:
    'https://www.figma.com/api/mcp/asset/263acd92-f0e8-42b6-9379-ea4fe784cec4',
  extraGartenwegStufen:
    'https://www.figma.com/api/mcp/asset/e6eb45e6-0657-48d6-aadb-acff2ce2bf56',
  extraGartenwegEinfassung:
    'https://www.figma.com/api/mcp/asset/8c44fb2c-7753-4a75-8f74-cb1caff0a178',
  /** `/gestaltung-material` Rollrasen – Kacheln (Figma node 377:1655) */
  materialRollrasenNaturrasen:
    'https://www.figma.com/api/mcp/asset/08fea125-3baf-489f-af23-b30a0005b8f6',
  materialRollrasenHydrorasen:
    'https://www.figma.com/api/mcp/asset/e4b1c90d-c20c-4d7b-8f61-34a70233217e',
  materialRollrasenKunstrasen:
    'https://www.figma.com/api/mcp/asset/71df3857-0c49-49b2-8f30-839c5457b084',
  materialRollrasenSurprise:
    'https://www.figma.com/api/mcp/asset/f4d08266-14cd-4efe-94a2-c4967831c250',
  /** `/gestaltung-material` Gartenhaus – Kacheln (Figma Frame 41, node 377:1658) */
  materialGartenhausHolz:
    'https://www.figma.com/api/mcp/asset/85bb52cf-c606-4b9b-894a-4964973e94bf',
  materialGartenhausMetall:
    'https://www.figma.com/api/mcp/asset/97ae7890-dc48-4501-9bf7-60decef423e5',
  materialGartenhausWpc:
    'https://www.figma.com/api/mcp/asset/3caebcb1-d41c-4e85-9600-19acf55b1fdf',
  materialGartenhausSurprise:
    'https://www.figma.com/api/mcp/asset/cc6c42c7-9837-4954-8056-2725de6ff5a5',
  /** `/gestaltung-material` Brunnen – Kacheln (Figma node 377:1660) */
  materialBrunnenNaturstein:
    'https://www.figma.com/api/mcp/asset/0413cd4a-e7f7-4873-8132-9e1d9b0095de',
  materialBrunnenBeton:
    'https://www.figma.com/api/mcp/asset/35041646-2cc6-4702-947d-ffb2ee6eb690',
  materialBrunnenMetall:
    'https://www.figma.com/api/mcp/asset/2703de09-2efe-4c8b-ac9a-b39e8ee7006c',
  materialBrunnenKunststoff:
    'https://www.figma.com/api/mcp/asset/023c3f3d-1bfa-4c3b-8f4c-5b5ea49bf0aa',
  materialBrunnenSurprise:
    'https://www.figma.com/api/mcp/asset/0413b1ca-3daf-49d8-bee9-c30eb021697a',
  /** `/gestaltung-material` Gartenweg – Kacheln (Figma Frame 43, node 377:1662) */
  materialGartenwegBeton:
    'https://www.figma.com/api/mcp/asset/23537c6c-f0c9-48b3-8f24-f290b6095dca',
  materialGartenwegPflaster:
    'https://www.figma.com/api/mcp/asset/f5efeb23-beb8-4221-a127-f27a95c3df82',
  materialGartenwegKies:
    'https://www.figma.com/api/mcp/asset/52575d41-3b51-4501-bed7-9a08e09db43d',
  materialGartenwegSurprise:
    'https://www.figma.com/api/mcp/asset/adbd7f8d-5c73-4cdb-beed-00402ac30249',
} as const;

export type TerrasseExtraCardCopy = {
  image: string;
  lead: string;
  sub: string;
};

/** Texte & Medien pro Extra (Schlüssel = Eintrag in `featureConfigs.terrasse.extras`) */
export const terrasseExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraTerrasseBeleuchtung,
    lead: 'Atmosphärische und funktionale Lichtlösungen für die Terrasse.',
    sub: 'Spots · Stufen-/Wegebeleuchtung · Wand-/Akzentlicht',
  },
  'Stufen / Höhenunterschiede': {
    image: assets.extraTerrasseStufen,
    lead: 'Sichere und saubere Lösungen für Niveauwechsel im Terrassenbereich.',
    sub: 'Stufen · Podeste · Ausgleich von Gefälle',
  },
  Überdachung: {
    image: assets.extraTerrasseUberdachung,
    lead: 'Schutz vor Sonne und Wetter – für mehr Komfort und Nutzungszeit.',
    sub: 'Pergola · Terrassendach · Markise',
  },
  Feuerstelle: {
    image: assets.extraTerrasseFeuerstelle,
    lead: 'Gemütlicher Treffpunkt mit Wärme – passend zur Umgebung geplant.',
    sub: 'Feuerschale · Außenkamin · Gas-/Bioethanol-Optionen',
  },
};

/** Texte & Medien pro Extra (Schlüssel = Eintrag in `featureConfigs.rollrasen.extras`) – Figma 377:1666 */
export const rollrasenExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Pflegekonzept: {
    image: assets.extraRollrasenPflegekonzept,
    lead: 'Abgestimmte Pflege für einen dauerhaft gesunden und belastbaren Rasen.',
    sub: 'Mähintervalle · Düngung · Pflegeempfehlungen',
  },
  'Automatische Bewässerung': {
    image: assets.extraRollrasenBewaesserung,
    lead: 'Effiziente und gleichmäßige Wasserversorgung des Rollrasens.',
    sub: 'Sprinklersysteme · Zeitschalt- / Sensorsteuerung',
  },
  'Saisonale Bepflanzung': {
    image: assets.extraRollrasenBepflanzung,
    lead: 'Ergänzende Pflanzkonzepte passend zur Jahreszeit und Umgebung.',
    sub: 'Stauden · Zierpflanzen · Akzentbepflanzung',
  },
};

/** Texte & Medien pro Extra (Schlüssel = Eintrag in `featureConfigs.gartenhaus.extras`) – Figma 377:1668 */
export const gartenhausExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Stromanschluss: {
    image: assets.extraGartenhausStromanschluss,
    lead: 'Elektrische Anbindung für Licht, Steckdosen und Geräte im Gartenhaus.',
    sub: 'Innen-/Außensteckdosen · Beleuchtung · Geräteanschlüsse',
  },
  'Regenrinne / Entwässerung': {
    image: assets.extraGartenhausRegenrinne,
    lead: 'Kontrollierte Ableitung von Regenwasser zum Schutz der Bausubstanz.',
    sub: 'Regenrinne · Fallrohr · Anschluss an Versickerung',
  },
  'Überdachung / Vordach': {
    image: assets.extraGartenhausUeberdachung,
    lead: 'Zusätzlicher Schutz vor Witterung im Eingangs- oder Terrassenbereich.',
    sub: 'Vordach · Überstand · Erweiterter Wetterschutz',
  },
  Beleuchtung: {
    image: assets.extraGartenhausBeleuchtung,
    lead: 'Funktionale und stimmungsvolle Lichtlösungen für Innen- und Außenbereiche.',
    sub: 'Innenbeleuchtung · Außenleuchten · Akzentlicht',
  },
};

/** Texte & Medien pro Extra (Schlüssel = Eintrag in `featureConfigs.brunnen.extras`) – Figma 377:1670 */
export const brunnenExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraBrunnenBeleuchtung,
    lead: 'Gezielte Lichtakzente zur Inszenierung des Brunnens bei Tag und Nacht.',
    sub: 'Unterwasserleuchten · Spots · Akzentbeleuchtung',
  },
  'Wasserspiel / Geräusch': {
    image: assets.extraBrunnenWasserspiel,
    lead: 'Art und Intensität des Wasserlaufs zur gewünschten Atmosphäre.',
    sub: 'Ruhiges Plätschern · Belebtes Wasserspiel · Geräuschintensität wählbar',
  },
  Stromanschluss: {
    image: assets.extraBrunnenStromanschluss,
    lead: 'Elektrische Versorgung für Pumpe, Beleuchtung und Steuerung.',
    sub: 'Anschlussart · Kabelführung · Absicherung',
  },
  'Filter / Technik': {
    image: assets.extraBrunnenFilter,
    lead: 'Technische Komponenten für sauberes Wasser und zuverlässigen Betrieb.',
    sub: 'Filteranlage · Pumpe · Wartungszugang',
  },
};

/** Texte & Medien pro Extra (Schlüssel = Eintrag in `featureConfigs.gartenweg.extras`) – Figma 377:1672 */
export const gartenwegExtraCards: Record<string, TerrasseExtraCardCopy> = {
  Beleuchtung: {
    image: assets.extraGartenwegBeleuchtung,
    lead: 'Funktionale und stimmungsvolle Beleuchtung für sichere und gut sichtbare Wege.',
    sub: 'Wegeleuchten · Bodenspots · Orientierungslicht',
  },
  'Stufen / Höhenunterschiede': {
    image: assets.extraGartenwegStufen,
    lead: 'Saubere Ausführung von Niveauwechseln für Komfort und Sicherheit.',
    sub: 'Stufenanlagen · Podeste · Ausgleich von Gefälle',
  },
  'Einfassung / Randsteine': {
    image: assets.extraGartenwegEinfassung,
    lead: 'Stabile Abgrenzung zur dauerhaften Fixierung der Pflasterflächen.',
    sub: 'Randsteine · Einfassungen · Saubere Kantenführung',
  },
};

/** Bild-Zuordnung für Terrassen-Material (inkl. Legacy „WPC“ → Kies-Bild) */
export const terrasseMaterialImages: Record<string, string> = {
  Holz: assets.materialTerrasseHolz,
  Keramik: assets.materialTerrasseKeramik,
  Kies: assets.materialTerrasseKies,
  Naturstein: assets.materialTerrasseNaturstein,
  WPC: assets.materialTerrasseKies,
  'Egal, überrasche mich': assets.materialTerrasseSurprise,
};

/** Bild-Zuordnung für Rollrasen-Material (Figma 377:1655) */
export const rollrasenMaterialImages: Record<string, string> = {
  Hydrorasen: assets.materialRollrasenHydrorasen,
  Kunstrasen: assets.materialRollrasenKunstrasen,
  Naturrasen: assets.materialRollrasenNaturrasen,
  'Egal, überrasche mich': assets.materialRollrasenSurprise,
};

/** Bild-Zuordnung für Gartenhaus-Material (Figma 377:1658) */
export const gartenhausMaterialImages: Record<string, string> = {
  'Holz-Gartenhaus': assets.materialGartenhausHolz,
  'Metall-Gartenhaus': assets.materialGartenhausMetall,
  'WPC-Gartenhaus': assets.materialGartenhausWpc,
  'Egal, überrasche mich': assets.materialGartenhausSurprise,
};

/** Bild-Zuordnung für Brunnen-Material (Figma 377:1660) */
export const brunnenMaterialImages: Record<string, string> = {
  'Naturstein Brunnen': assets.materialBrunnenNaturstein,
  'Beton Brunnen': assets.materialBrunnenBeton,
  'Metall Brunnen': assets.materialBrunnenMetall,
  'Kunststoff Brunnen': assets.materialBrunnenKunststoff,
  'Egal, überrasche mich': assets.materialBrunnenSurprise,
};

/** Bild-Zuordnung für Gartenweg-Material (Figma 377:1662) */
export const gartenwegMaterialImages: Record<string, string> = {
  'Beton Gartenweg': assets.materialGartenwegBeton,
  'Pflaster Gartenweg': assets.materialGartenwegPflaster,
  'Kies Gartenweg': assets.materialGartenwegKies,
  'Egal, überrasche mich': assets.materialGartenwegSurprise,
};

/** Thumbnails pro Element – gleiche Reihenfolge wie `featureOrder` */
export const featureListThumbs: Record<FeatureKey, string> = {
  brunnen: assets.featureThumbBrunnen,
  gartenhaus: assets.featureThumbGartenhaus,
  gartenweg: assets.featureThumbGartenweg,
  rollrasen: assets.featureThumbRollrasen,
  terrasse: assets.featureThumbTerrasse,
};

/**
 * Projektauswahl `/projekt-auswahl` – Thumbnails aus Figma (GreenLine-Build, node-id=419-279).
 * MCP-Asset-URLs können nach ca. 7 Tagen ablaufen; dann get_design_context erneut ausführen.
 */
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
  { path: '/', label: 'Startseite' },
  { path: '/login', label: 'Login' },
  { path: '/projekt-auswahl', label: 'Projektauswahl' },
  { path: '/flaeche-erfassen', label: 'Fotos hinzufügen' },
  { path: '/analyse', label: 'Analyse' },
  { path: '/feature-auswahl', label: 'Element auswählen' },
  { path: '/gestaltung-material', label: 'Material auswählen' },
  { path: '/gestaltung-extras', label: 'Extras auswählen' },
  { path: '/auswahl-zusammenfassung', label: 'Zusammenfassung' },
  { path: '/paket-auswahl', label: 'Paketpreise' },
  { path: '/visualisierung-vorschau', label: 'Gartenvorschau' },
  { path: '/qualitaetsstufe', label: 'Qualitätsstufe' },
  { path: '/termin-datum', label: 'Termin Datum' },
  { path: '/termin-uhrzeit', label: 'Termin Uhrzeit' },
  { path: '/investitionsuebersicht', label: 'Investitionsübersicht' },
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
  { path: '/termin-bestaetigung', label: 'Termin Bestätigung' },
] as const;
