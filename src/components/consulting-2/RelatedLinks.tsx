/**
 * The page's outbound link set, for `/consulting`.
 *
 * A SIMPLE LIST, ON PURPOSE. Ten links, in the source's own print order. That
 * order is not a ranking and not a recommended reading sequence, so nothing
 * here numbers them, ranks them or draws them as a path — and no link gets a
 * larger card, a badge or a "start here" treatment.
 *
 * NO DESCRIPTIONS. `RelatedLink` deliberately carries only a label and an
 * href: the brief supplies no per-link summary, and a one-liner written to
 * fill a card would be this page's least grounded copy sitting in its most
 * clickable position. The empty slot is not drawn either.
 *
 * HREFS ARE NOT TOUCHED. Every destination in ./content.relatedLinks was
 * already resolved against the real route table — four as the brief proposed,
 * six re-pointed away from a `/platform` scheme this application does not
 * have. This component only prefixes the active locale, exactly as every other
 * `PATHS` consumer does; it never edits, appends to or reorders a path.
 *
 * THE HEADING IS THIS COMPONENT'S. The content module says so explicitly: the
 * brief's own heading, "Suggested internal links", is production vocabulary
 * addressed to whoever builds the section, and must never be printed at a
 * visitor.
 */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { RELATED_LINKS } from "./content.relatedLinks";

export function RelatedLinks({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="related-links"
      className="mt-20 border-t border-border pt-12"
    >
      <h2 id="related-links" className="h-sub text-foreground">
        Related pages
      </h2>

      <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
        {RELATED_LINKS.map((link) => (
          <li key={link.id} className="border-b border-dashed border-border">
            <Link
              href={localePath(locale, link.href)}
              className="flex items-center justify-between gap-4 py-3 text-sm font-medium text-foreground no-underline transition-colors duration-150 ease-brand hover:text-primary-ink"
            >
              <span>{pick(link.label, locale)}</span>
              <span aria-hidden="true" className="text-primary">
                &#8594;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
