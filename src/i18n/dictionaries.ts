import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./en";

/**
 * Dictionary loading, per the bundled Next 16 guide
 * (node_modules/next/dist/docs/01-app/02-guides/internationalization.md).
 *
 * `server-only` is the important import. Every dictionary is loaded in a Server
 * Component and only the rendered HTML reaches the browser, so adding a third
 * language never costs the visitor a byte of JavaScript. The import here makes
 * that a build error if someone later pulls this into a client component,
 * instead of a silent bundle-size regression nobody notices.
 *
 * Dynamic imports rather than a static object: only the requested language's
 * strings are ever loaded on a given request.
 */
const dictionaries = {
  en: () => import("./en").then((m) => m.en),
  nl: () => import("./nl").then((m) => m.nl)
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
