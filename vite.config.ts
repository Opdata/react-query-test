import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        '@/': `${process.cwd()}/src/`,
        '@components': `${process.cwd()}/src/components/`,
        '@services': `${process.cwd()}/src/services/`,
      },
    },
    plugins: [react()],
    define: {
      'process.env': env,
    },
  };
});
