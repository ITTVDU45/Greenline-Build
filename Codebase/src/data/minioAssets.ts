import assetCatalog from './assetCatalog.json';

declare const __GLB_MINIO_PUBLIC_URL__: string;
declare const __GLB_MINIO_ENDPOINT__: string;
declare const __GLB_MINIO_BUCKET__: string;
declare const __GLB_MINIO_USE_SSL__: boolean;
declare const __GLB_MINIO_PATH_STYLE__: boolean;

const ASSET_PREFIX = 'app-assets';

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function buildAssetBaseUrl(): string {
  const fallbackBaseUrl = `${__GLB_MINIO_USE_SSL__ ? 'https' : 'http'}://${trimTrailingSlash(
    __GLB_MINIO_ENDPOINT__
  )}`;
  const configuredBaseUrl =
    __GLB_MINIO_PUBLIC_URL__ && __GLB_MINIO_PUBLIC_URL__.includes(__GLB_MINIO_ENDPOINT__)
      ? trimTrailingSlash(__GLB_MINIO_PUBLIC_URL__)
      : fallbackBaseUrl;
  return __GLB_MINIO_PATH_STYLE__
    ? `${configuredBaseUrl}/${__GLB_MINIO_BUCKET__}`
    : configuredBaseUrl;
}

export const minioAssetCatalog = assetCatalog;

export type AssetKey = (typeof assetCatalog)[number];

export function getMinioAssetUrl(assetKey: AssetKey): string {
  return `${buildAssetBaseUrl()}/${ASSET_PREFIX}/${assetKey}`;
}
