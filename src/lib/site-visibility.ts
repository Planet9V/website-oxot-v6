/**
 * IS THIS THE REAL SITE, OR A COPY OF IT?
 *
 * The new site is reviewed on a Railway host (`oxot-web-production.up.railway.app`)
 * long before it is the real one. On 2026-08-08 that host was measured serving
 * `/en/cra` with NO robots directive, no robots.txt and no sitemap — a fully
 * crawlable staging copy of a site whose real domain is oxot.nl. A preview that
 * gets indexed competes with the domain it is a preview OF, and it does it with
 * whatever half-finished copy happened to be deployed that week.
 *
 * THE DEFAULT IS "NOT THE REAL SITE". Indexing is opt-in, by setting
 * `OXOT_PUBLIC_SITE=true` in the environment of the real production deploy and
 * nowhere else. A new preview host, a branch deploy, a colleague's laptop and a
 * container nobody remembers starting are all noindexed without anyone
 * remembering to do anything — which is the only way this stays true.
 *
 * It is deliberately NOT inferred from the request's Host header: that would
 * make the answer differ between a static render and a request, and half this
 * site is prerendered at build time.
 */
export const IS_PUBLIC_SITE = process.env.OXOT_PUBLIC_SITE === "true";

/** Metadata's `robots` field: absent on the real site, locked down everywhere else. */
export const ROBOTS_DIRECTIVE = IS_PUBLIC_SITE
  ? undefined
  : { index: false, follow: false, nocache: true };
