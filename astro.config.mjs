// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  // Update site with your GitHub Pages URL (e.g., https://username.github.io/repository-name)
  // For custom domains, use your domain instead
  site: 'https://robertgjoshevski.github.io',
  base: '/WebTemplate',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  output: 'static'
});