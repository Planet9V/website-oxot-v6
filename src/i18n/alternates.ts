import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_HREFLANG, type Locale } from "./config";

/**
 * The canonical URL and the hreflang set for one page, in one language.
 *
 * WHY THIS IS NOT IN THE LAYOUT, WHICH IS WHERE IT STARTED. Metadata inherits,
 * so `alternates` declared once in the locale layout applied to every route
 * underneath it — and it was written for the layout's own segment. Measured on
 * /nl/cra: canonical said https://oxot.nl/nl and the hreflang pair pointed at
 * /en and /nl. Every page on the site was declaring itself a duplicate of the
 * homepage and offering the homepage as its own translation.
 *
 * That is worse than emitting nothing. Absent hreflang means a crawler works it
 * out; wrong hreflang means a crawler believes us.
 *
 * So it is per-page and takes the path explicitly. A page that forgets to call
 * this emits no alternates at all — a gap, not a lie.
 *
 * `path` is the LOCALE-FREE path from `PATHS` ("" for home, "/cra", …), so the
 * locale prefix is applied in exactly one place.
 */
export function localeAlternates(
  locale: Locale,
  path: string
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [LOCALE_HREFLANG[l], `/${l}${path}`])
      ),
      /* x-default is English because that is what the proxy negotiates an
         unknown visitor into. The pair has to agree with what the server
         actually does, or it is a promise the site does not keep. */
      "x-default": `/${DEFAULT_LOCALE}${path}`
    }
  };
}
