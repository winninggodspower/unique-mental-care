import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import path from 'path';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'), // ✅ let Vite/Rollup know about "@"
      },
    },
  },
});