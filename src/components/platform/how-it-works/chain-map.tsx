import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { CHAIN, CHAIN_MAP } from "./content";

/**
 * THE CHAIN MAP — the page's contents, drawn as the thing it describes.
 *
 * The assurance pages solve the same problem with a sticky left rail
 * (components/longform/table-of-contents.tsx). That is the right answer for a
 * twelve-section specification read out of order. It is the wrong one here:
 * this page is a chain, the chain's ORDER is the argument, and a vertical list
 * parked in a margin does not show an order. So the contents runs inline and
 * horizontally, with the links drawn between the nodes.
 *
 * IT IS REAL NAVIGATION AND NOTHING MORE. Every node is a link to a real `id`
 * on this page; `main [id] { scroll-margin-top: 6rem }` in globals.css already
 * keeps the target clear of the sticky header, so no JavaScript is needed and
 * none is used. There is no position tracking, no hover reveal and no state —
 * and the caption says it is a static map rather than implying it is a view of
 * a model.
 *
 * The connectors are `aria-hidden` glyphs BETWEEN list items rather than
 * pseudo-elements, so they reflow with the list when it wraps at narrow widths
 * instead of pointing at nothing.
 */
export function ChainMap({ locale }: { locale: Locale }) {
  return (
    <figure className="mt-12 rounded-2xl border border-border bg-muted/40 p-5 sm:p-7">
      <p className="oxot-kicker">{pick(CHAIN_MAP.kicker, locale)}</p>

      <ol className="mt-5 flex list-none flex-wrap items-stretch gap-x-2 gap-y-2.5 p-0">
        {CHAIN.map((link, i) => (
          <li key={link.id} className="flex items-stretch gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="flex items-center font-mono text-sm text-primary">
                &#8594;
              </span>
            ) : null}
            <Link
              href={`#${link.id}`}
              className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2 no-underline transition-colors duration-150 ease-brand hover:border-primary/50 focus-visible:border-primary"
            >
              <span className="mono-label font-bold text-primary-ink">{link.n}</span>
              <span className="body-copy font-medium leading-snug text-foreground group-hover:text-primary-ink">
                {pick(link.short, locale)}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <figcaption className="mt-5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        {pick(CHAIN_MAP.caption, locale)}
      </figcaption>
    </figure>
  );
}
