import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        '@/': `${process.cwd()}/src/`,
        '@containers': `${process.cwd()}/src/containers/`,
        '@pages': `${process.cwd()}/src/pages/`,
        '@services': `${process.cwd()}/src/services/`,
      },
    },
    plugins: [react()],
    define: {
      'process.env': env,
    },
  };
});
