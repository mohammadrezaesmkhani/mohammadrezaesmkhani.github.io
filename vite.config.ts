import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * PORTRAIT DETECTION
 * ------------------------------------------------------------------
 * Drop your photo into `public/images/` as one of the file names below
 * and rebuild. The site picks it up automatically — no code changes.
 * If no file exists, an editorial fallback is rendered instead
 * (and no 404 request is ever made).
 */
const PORTRAIT_CANDIDATES = ['m.rezz.jpg', 'profile.jpg', 'profile.jpeg', 'profile.webp', 'profile.png'];
const portrait =
  PORTRAIT_CANDIDATES.map((f) => `images/${f}`).find((p) =>
    existsSync(resolve(__dirname, 'public', p)),
  ) ?? null;

/**
 * BASE PATH
 * ------------------------------------------------------------------
 * `./` (relative) works for BOTH GitHub Pages setups without changes:
 *   • https://<username>.github.io/              (user/organization site)
 *   • https://<username>.github.io/<repository>/ (project site)
 * The site is a single page with hash navigation, so relative asset
 * URLs are always resolved against index.html.
 * Override with BASE_PATH=/my-repo/ if you ever need an absolute base.
 */
export default defineConfig({
  base: process.env.BASE_PATH || './',
  server: {
    // Allow the Arena preview proxy host so the live preview can load.
    allowedHosts: true,
  },
  plugins: [react()],
  define: {
    __PORTRAIT__: JSON.stringify(portrait),
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
});
