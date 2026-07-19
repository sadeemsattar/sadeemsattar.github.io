// @ts-check
import { defineConfig } from 'astro/config';

// User site (sadeemsattar.github.io) is served from the domain root,
// so `base` stays '/'. `site` powers canonical + OG absolute URLs and sitemaps.
export default defineConfig({
  site: 'https://sadeemsattar.github.io',
  build: {
    // Emit /projects/foo/index.html so links work without a server rewrite.
    format: 'directory',
  },
});
