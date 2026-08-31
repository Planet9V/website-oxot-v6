/**
 * The two languages, in one place.
 *
 * CLAUDE.md §3 is binding and blunt: no user-facing string ships in only one
 * language. Dutch is not a translation layer bolted onto an English site — it
 * is the language of the market this firm sells into, and an OT engineer in
 * Rotterdam reading half-Dutch chrome over English body copy learns something
 * true about how much care went into the rest.
 *
 * Routing is locale-prefixed (`/en/...`, `/nl/...`), per §3. There is no
 * unprefixed route: `/cra` redirects, it does not render. One canonical URL per
 * page per language, which is also what the hreflang pair in the layout needs
 * in order to be honest.
 */

export const LOCALES = ["en", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * English is the fallback, not the preference. The proxy negotiates against
 * Accept-Language first and only lands here when the visitor has expressed no
 * preference this code can honour.
 */
export const DEFAULT_LOCALE: Locale = "en";

/** Narrows an arbitrary path segment. Callers 404 on false rather than
 *  rendering a page in a language we do not have. */
export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** What the language switch shows. Endonyms — a Dutch reader looks for
 *  "Nederlands", not for "Dutch". */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands"
};

/** The short form, for the footer's two-up toggle. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  nl: "NL"
};

/** `lang` / `hreflang` values. `nl` rather than `nl-NL`: this firm sells to
 *  Flanders as well, and a region tag would claim a distinction we do not
 *  actually make in the copy. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: "en",
  nl: "nl"
};
