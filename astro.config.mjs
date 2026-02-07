// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // For new client: set site to your domain (e.g. https://client.com or https://username.github.io)
  // For GitHub Pages with repo path, set base to '/REPO_NAME'; for root or custom domain use base: '/'
  site: 'https://your-domain.com',
  base: '/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  output: 'static'
});