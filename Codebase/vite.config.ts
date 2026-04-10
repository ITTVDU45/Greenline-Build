import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const minioPublicDefaults = {
  publicUrl: 'https://api.storage.hostiteasy.com',
  endpoint: 'api.storage.hostiteasy.com',
  bucket: 'mvp.greenlinbuild',
  useSsl: true,
  pathStyle: true,
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      __GLB_MINIO_PUBLIC_URL__: JSON.stringify(
        env.MINIO_PUBLIC_URL ?? minioPublicDefaults.publicUrl
      ),
      __GLB_MINIO_ENDPOINT__: JSON.stringify(env.MINIO_ENDPOINT ?? minioPublicDefaults.endpoint),
      __GLB_MINIO_BUCKET__: JSON.stringify(env.MINIO_BUCKET ?? minioPublicDefaults.bucket),
      __GLB_MINIO_USE_SSL__:
        (env.MINIO_USE_SSL ?? String(minioPublicDefaults.useSsl)) === 'true',
      __GLB_MINIO_PATH_STYLE__:
        (env.MINIO_PATH_STYLE ?? String(minioPublicDefaults.pathStyle)) === 'true',
    },
  };
});
