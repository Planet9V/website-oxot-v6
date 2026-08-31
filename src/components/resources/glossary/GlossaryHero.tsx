import type { Locale } from "@/i18n/config";
import { formatDate, pick } from "@/i18n/bilingual";
import { ENTRIES, HERO } from "./content";

/**
 * Reference-page masthead, not a marketing hero: the claim, then the two
 * facts that tell a reader whether to trust the page — how many entries,
 * when it was last reviewed — then the scope note.
 *
 * The scope note sits above the entries rather than in a footnote below
 * them. A reader who takes a working definition here for the formal one
 * in the standard does so in the first thirty seconds, which is a long
 * way before the bottom of a page this length.
 */
export function GlossaryHero({ locale }: { locale: Locale }) {
  const t = HERO;
  /* Read off the entries rather than hardcoded, so the masthead cannot
     drift out of step once entries start being reviewed separately. */
  const lastReviewed = ENTRIES.reduce((latest, e) => (e.reviewed > latest ? e.reviewed : latest), ENTRIES[0].reviewed);

  return (
    <header className="mt-10">
      <p className="oxot-kicker">{pick(t.eyebrow, locale)}</p>
      <h1 className="h-page mt-4">{pick(t.h1, locale)}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-14">
        <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{pick(t.lead, locale)}</p>

        <aside className="border-l-2 border-primary/40 pl-5">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="mono-label">{pick(t.countLabel, locale)}</dt>
              <dd className="mt-1 font-mono text-2xl leading-none text-foreground">{ENTRIES.length}</dd>
            </div>
            <div>
              <dt className="mono-label">{pick(t.reviewedLabel, locale)}</dt>
              <dd className="mt-1 font-mono text-sm leading-none text-foreground">{formatDate(lastReviewed, locale)}</dd>
            </div>
          </dl>

          <p className="mono-label mt-6">{pick(t.scopeHead, locale)}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(t.scope, locale)}</p>
        </aside>
      </div>
    </header>
  );
}
