import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: netlify(),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'), // ✅ let Vite/Rollup know about "@"
      },
    },
  },
});