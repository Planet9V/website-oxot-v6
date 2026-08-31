import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { ENGAGEMENTS } from "./content";

/**
 * A GROUPED LEDGER, NOT A CARD GRID AND NOT A TABLE.
 *
 * The source is a four-row table; four cards in a 2x2 is the reflex, and it
 * is wrong twice over. It flattens the one real distinction in the set —
 * two engagements establish a model, two keep it true — and it repeats the
 * card-grid signature /consulting and the six industry pages already own.
 *
 * So: two labelled groups, each a stack of full-width rows sharing one
 * three-column grammar (name / what you are deciding / what OXOT delivers).
 * A row is a grid rather than a `<table>` because the middle and right
 * columns are prose and a list, not cells needing row-and-column navigation
 * semantics — and the reading order stacks correctly on a narrow viewport,
 * which a real table would not.
 *
 * The left rule on each group is the visual spine: `border-primary/40` for
 * the establishing pair, `border-border` for the sustaining pair, so the
 * entry points read as the louder half without a second colour entering the
 * palette. The `gap-px` over a `bg-border` parent is what draws the hairline
 * between rows — one rule per boundary, no double borders where rows meet.
 *
 * NO ENTRANCE ANIMATION ON THE ROWS, and this is the second attempt. They
 * were `BlurFade`-wrapped first, copying RailEngagement — which puts the
 * fade's `<div>` directly inside the `<ol>`, so the `<li>` stops being the
 * list's own child (invalid, and it drops list semantics for a screen
 * reader). Worse, it left every row painted at opacity 0 for any reader who
 * reached this section without a scroll event firing: the first screenshot
 * of this page showed two empty grey rectangles where the four engagements
 * should be. A ledger is read, not revealed; the fade bought nothing worth
 * that. The hero keeps its BlurFade — it wraps whole blocks, not list items.
 */
export function WorkEngagements({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="engagements" className="mt-16 border-t border-border pt-10">
      <h2 id="engagements" className="h-section">
        {pick(ENGAGEMENTS.h2, locale)}
      </h2>
      <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
        {pick(ENGAGEMENTS.lead, locale)}
      </p>

      <div className="mt-12 grid gap-12">
        {ENGAGEMENTS.groups.map((group, groupIndex) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 id={`group-${group.id}`} className="mono-label font-bold text-primary-ink">
                {pick(group.label, locale)}
              </h3>
              <p className="text-sm text-muted-foreground">{pick(group.note, locale)}</p>
            </div>

            <ol
              className={`mt-5 grid list-none gap-px border-l-2 bg-border p-0 ${
                groupIndex === 0 ? "border-primary/40" : "border-border"
              }`}
            >
              {group.items.map((item) => (
                <li
                  key={item.slug}
                  id={item.slug}
                  className="grid scroll-mt-24 gap-x-8 gap-y-5 bg-background p-6 sm:p-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1.05fr)]"
                >
                  <h4 className="h-card text-[1.125rem] text-foreground">{pick(item.name, locale)}</h4>

                  <div>
                    <p className="mono-label text-muted-foreground">{pick(ENGAGEMENTS.needLabel, locale)}</p>
                    <p className="mt-2 body-copy leading-relaxed text-foreground">
                      {pick(item.need, locale)}
                    </p>
                  </div>

                  <div>
                    <p className="mono-label text-muted-foreground">{pick(ENGAGEMENTS.deliversLabel, locale)}</p>
                    <ul className="mt-2 grid list-none gap-1.5 p-0">
                      {item.delivers.map((d) => (
                        <li
                          key={d.en}
                          className="flex gap-2.5 body-copy leading-relaxed text-muted-foreground"
                        >
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {pick(d, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}
