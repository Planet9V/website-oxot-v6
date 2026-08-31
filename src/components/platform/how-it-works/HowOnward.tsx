import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { ONWARD } from "./content";
import { SectionOpener } from "./page-kit";

/**
 * WHERE THE EVIDENCE LANDS — the routing out to the four assurance regimes.
 *
 * Deliberately NOT a card grid. Every other "explore more" block on this site
 * is cards, and four cards here would read as a related-content shelf bolted
 * to the end of the page. This is a rail: four rows on one set of rules, each
 * row a full link, which reads as a routing table — which is what it is. The
 * page has just spent six sections claiming the model produces evidence, and
 * these are the four places that claim gets tested.
 *
 * NO LOCALE GUARD ON THESE FOUR. All four regime pages under /assurance render
 * both locales (Bilingual content, `nl` a same-as-English placeholder), per the
 * note in nav.ts. The EN-only destinations are /assurance itself and
 * /technical-specification, and neither is linked here — the specification link
 * lives in the page's closing CTA, where it is guarded.
 *
 * Paths come from PATHS via ./content and are prefixed with `localePath` at
 * render time, so a Dutch reader stays in Dutch.
 */
export function HowOnward({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="onward" className="mt-24 border-t border-border pt-14">
      <SectionOpener
        id="onward"
        kicker={pick(ONWARD.kicker, locale)}
        title={pick(ONWARD.h2, locale)}
        intro={pick(ONWARD.intro, locale)}
      />

      <ul className="mt-9 list-none border-t border-border p-0">
        {ONWARD.links.map((item) => (
          <li key={item.path} className="border-b border-border">
            <Link
              href={localePath(locale, item.path)}
              className="group grid grid-cols-1 gap-1.5 py-5 no-underline sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-baseline sm:gap-8"
            >
              <span className="h-card text-foreground transition-colors duration-150 ease-brand group-hover:text-primary-ink">
                {pick(item.label, locale)}
                <span aria-hidden="true" className="ml-2 font-mono text-sm text-primary">
                  &#8594;
                </span>
              </span>
              <span className="body-copy leading-relaxed text-muted-foreground">{pick(item.body, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
