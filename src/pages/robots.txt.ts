import type { APIRoute } from 'astro';

// Generated rather than kept as a static file in public/. The sitemap URL has
// to match `site` in astro.config.mjs, and a hardcoded copy silently kept
// pointing at the old domain after the move to ntcharters.com — telling every
// crawler to look for our sitemap on a site we no longer control. Deriving it
// from `site` means the two can never disagree again.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
