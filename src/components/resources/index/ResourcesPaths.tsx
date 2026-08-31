import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { PATH_CARDS, PATHS_SECTION, resourceHref } from "./content";

/**
 * CHOOSE YOUR PATH — the routing layer, and the one section on this page
 * where four IDENTICAL cards are the correct answer.
 *
 * Everywhere else here the frame follows the content, because the sections
 * below are different KINDS of thing (an article library, a proof library,
 * a set of documents). These four are not: they are four parallel choices
 * offered at the same moment, and drawing one of them larger or differently
 * would be the design telling the reader which question they should have
 * arrived with. Equal weight is the message.
 *
 * The fourth card has three destinations rather than one, so it links to
 * the Technical Documents section of this page instead of picking one on
 * the reader's behalf — a real in-page anchor, not a dead chip.
 */
export function ResourcesPaths({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="paths" className="mt-14 border-t border-border pt-10">
      <h2 id="paths" className="h-sub">
        {pick(PATHS_SECTION.h2, locale)}
      </h2>
      <p className="prose-measure mt-3 body-lead leading-relaxed text-muted-foreground">
        {pick(PATHS_SECTION.lead, locale)}
      </p>

      <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {PATH_CARDS.map((card) => (
          <li key={card.n}>
            <Link
              href={card.href.startsWith("#") ? card.href : resourceHref(locale, card.href, card.enOnly)}
              hrefLang={card.enOnly ? "en" : undefined}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 outline-ring transition-[transform,border-color] duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary/60 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="mono-label text-primary-ink" aria-hidden="true">
                {card.n}
              </span>
              <h3 className="h-card mt-3 text-foreground">{pick(card.title, locale)}</h3>
              <p className="mt-3 font-display body-copy leading-snug text-muted-foreground">
                &ldquo;{pick(card.question, locale)}&rdquo;
              </p>
              <span className="mono-label mt-auto flex items-start gap-2 pt-6 text-muted-foreground transition-colors duration-200 ease-brand group-hover:text-primary-ink group-focus-visible:text-primary-ink motion-reduce:transition-none">
                {pick(card.destination, locale)}
                <span aria-hidden="true">&#8594;</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
