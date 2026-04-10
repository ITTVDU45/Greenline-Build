import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      __GLB_MINIO_PUBLIC_URL__: JSON.stringify(env.MINIO_PUBLIC_URL ?? ''),
      __GLB_MINIO_ENDPOINT__: JSON.stringify(env.MINIO_ENDPOINT ?? ''),
      __GLB_MINIO_BUCKET__: JSON.stringify(env.MINIO_BUCKET ?? ''),
      __GLB_MINIO_USE_SSL__: (env.MINIO_USE_SSL ?? 'true') === 'true',
      __GLB_MINIO_PATH_STYLE__: (env.MINIO_PATH_STYLE ?? 'true') === 'true',
    },
  };
});
