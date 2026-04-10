import assetFiles from './assetFiles.json';

export const minioAssetCatalog = Object.keys(assetFiles) as Array<keyof typeof assetFiles>;

export type AssetKey = keyof typeof assetFiles;

export function getMinioAssetUrl(assetKey: AssetKey): string {
  return `/app-assets/${assetFiles[assetKey]}`;
}
