import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

/**
 * Locale routing.
 *
 * NOTE THE FILENAME. In Next 16 this file is `proxy.ts`; `middleware.ts` is the
 * deprecated convention (AGENTS.md, and the bundled docs). A file named
 * middleware.ts here would simply never run, which is the kind of failure that
 * looks like a routing bug for an hour.
 *
 * Every page lives under `/{locale}/`. A request without one is redirected to
 * the best language we can offer, so there is exactly one canonical URL per
 * page per language — which is what makes the hreflang pair in the layout an
 * honest statement rather than a guess.
 *
 * WHY 307 AND NOT 308. The negotiated target depends on the visitor's
 * Accept-Language header, so `/cra` does not have one permanent destination —
 * it has a different correct answer for a Dutch reader and an English one. A
 * 308 invites every cache between here and the reader to pin whichever answer
 * it saw first and serve it to everyone.
 */

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Accept-Language negotiation, hand-rolled.
 *
 * Two locales and no region variants do not justify @formatjs/intl-localematcher
 * plus negotiator in the edge bundle. This reads the q-weighted list, takes the
 * highest-weighted entry whose primary subtag we actually serve, and otherwise
 * falls through to English. `nl-BE` matches `nl`, which is intended: this firm
 * sells into Flanders too.
 */
function negotiate(header: string | null): string {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q === undefined ? 1 : Number(q) };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    const hit = LOCALES.find((locale) => locale === primary);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = negotiate(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  /* THE METADATA ROUTES MUST NOT BE LOCALE-REDIRECTED.
     The exclusion list used to be `_next`, `api`, and anything containing a
     dot. `/icon` and `/opengraph-image` contain no dot, so both matched and
     were 307'd to `/en/icon` — which does not exist. The browser tab fell back
     to the Next default and no `og:image` was ever served, so a pasted link
     previewed as a framework logo. Measured: both returned 307 with an 8- and
     19-byte body.

     They are single, language-neutral assets by design — the wordmark does not
     translate — so they are excluded rather than localised. `robots.txt` and
     `sitemap.xml` already fall out via the dot rule. */
  matcher: ["/((?!_next|api|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)"]
};
