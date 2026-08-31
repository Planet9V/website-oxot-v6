import type { MetadataRoute } from "next";
import { IS_PUBLIC_SITE } from "@/lib/site-visibility";

/**
 * There was no robots.txt at all — `/robots.txt` on the Railway host returned
 * the 404 page. A missing robots.txt is not a closed door; it is an open one.
 *
 * Belt and braces with the `robots` meta in the locale layout: the meta stops a
 * crawler that has already fetched a page, this stops it fetching them.
 */
/**
 * READ AT REQUEST TIME, NOT AT BUILD TIME — and this line was earned.
 *
 * Next prerenders this route as STATIC by default, which bakes whatever
 * `OXOT_PUBLIC_SITE` happened to be during `next build` into the file. On the
 * 2026-08-09 cutover the build began about twenty-five seconds before the
 * variable was set, so the deployed robots.txt said `Disallow: /` while every
 * page — dynamic, and so reading the variable per request — correctly said it
 * was indexable. The site looked live and was invisible to search.
 *
 * A Railway *redeploy* does not fix it either: it reuses the built image, so
 * the stale file comes back with it. Only a rebuild would have.
 *
 * Forcing dynamic makes this route read the environment the same way the pages
 * do, so the two can no longer disagree and the failure cannot recur.
 */
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PUBLIC_SITE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  /* No `sitemap:` line. There is no sitemap route yet, and pointing a crawler
     at a 404 is worse than pointing it at nothing. When one is built, it goes
     here. */
  return { rules: [{ userAgent: "*", allow: "/" }] };
}
