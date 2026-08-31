import type { Locale } from "./config";

/**
 * A string that exists in both languages, for copy that belongs NEXT TO ITS
 * DATA rather than in the shared dictionary.
 *
 * The timeline rows are the case this exists for. Each row's label, obligation
 * and description are meaningless apart from its ISO date and its claim — move
 * them into `en.ts`/`nl.ts` and you get a dictionary key and a date in
 * different files that must be kept in step by hand, which is how a row ends up
 * captioned with the wrong obligation. Keeping them adjacent means one edit
 * changes the date, the label and both translations together.
 *
 * Deliberately NOT `server-only`: client components render bilingual data too,
 * and unlike a dictionary this holds a handful of strings rather than a site's
 * worth of copy.
 */
export interface Bilingual {
  en: string;
  nl: string;
}

/** Read a bilingual value in the active language. */
export function pick(value: Bilingual, locale: Locale): string {
  return locale === "nl" ? value.nl : value.en;
}

/**
 * Fill `{name}` placeholders in a dictionary string.
 *
 * Concatenating fragments — `count + " " + t.days` — bakes English word order
 * into the markup, and Dutch does not always agree with it. A whole sentence
 * with a hole in it lets the translator put the number where the sentence
 * needs it, which is the only way "35 days to the reporting clock" and
 * "nog 35 dagen tot de meldplicht" can both be natural.
 *
 * An unmatched placeholder is left visible rather than blanked: a stray
 * "{count}" on the page is obvious in review, where an empty gap is not.
 */
export function fmt(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in vars ? String(vars[key]) : whole
  );
}

/**
 * Format an ISO date the way each language writes dates.
 *
 * `nl-NL` gives "11 december 2027" — lowercase month, no comma — where `en-GB`
 * gives "11 December 2027". Getting this wrong is a small thing that reads as
 * a translated site rather than a Dutch one. UTC throughout, so a reader in
 * another timezone never sees a date shift by one day.
 */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    locale === "nl" ? "nl-NL" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
}
