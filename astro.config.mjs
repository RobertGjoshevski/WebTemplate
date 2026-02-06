// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  // Update site with your GitHub Pages URL (e.g., https://username.github.io/repository-name)
  // For custom domains, use your domain instead
  site: 'https://YOUR_USERNAME.github.io',
  base: '/YOUR_REPO_NAME', // Update this with your repository name, or remove for root domain

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  output: 'static'
});