import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { SCENARIOS } from "./content.scenarios";

/**
 * S04 · DEFENSE AND GOVERNMENT SCENARIOS — header recipe H-A.
 *
 * TEN ROWS, EACH A THREE-BEAT SEQUENCE, AND THE SEQUENCE IS THE SECTION'S
 * ARGUMENT. `content.scenarios.ts` states it outright: the event is
 * deliberately modest, the cascade is the second- and third-order effect, and
 * the decision is what OXOT is actually for. It also names the failure — "a
 * renderer that shows only the title and the event turns the section into a
 * threat list, which is the exact register the intro line rejects." So all
 * three beats of all ten rows render, in full, at first paint. Nothing sits
 * behind a disclosure, a tab, or a hover.
 *
 * NOT AN INTERACTIVE MASTER-DETAIL, AND THE REASON IS THIS PAGE'S CONTENT
 * RATHER THAN A PREFERENCE. A rail of ten titles beside a panel showing one
 * scenario is a real, proven shape on sibling pages, and it was considered
 * first. It fails here on two counts: it puts nine of ten cascades behind a
 * click, on the section whose whole point is that the cascade is the part
 * people miss; and the Foundation Spec bars making complex technical content
 * disappear behind an interaction only to make a page shorter. The register
 * stays open.
 *
 * WHY THIS IS NOT S01's SHAPE. Both sections lay prose in columns and they must
 * not read as one component. The distinction is in the content, not the paint:
 *   · S01 is a PAIR — a dimension's meaning beside the evidence for it,
 *     unordered, mutually explanatory. Its name sits IN the row, at its head,
 *     and one dashed rule divides the two clauses.
 *   · This is a SEQUENCE — event, then cascade, then decision, read strictly
 *     left to right, with a directional mark between beats and an ordinal
 *     stamped on every row. Its title sits ABOVE the row on its own full-width
 *     line, because a title is not one of the three beats.
 * A pair has no direction. A cascade does. That is why one carries arrows and
 * an ordinal and the other carries neither.
 *
 * THE ARROWS ARE `aria-hidden` AND CARRY NO INFORMATION OF THEIR OWN. Direction
 * is already in the DOM order and in the three column labels, which are real
 * strings from the content module. A screen-reader user gets "Event … Cascade …
 * What the Twin tests" in that order whether or not any glyph renders. They are
 * drawn at `lg` only: once the grid stacks, the beats sit above one another and
 * a rightward arrow between them would point the wrong way.
 *
 * COLUMN HEADERS RENDER ONCE, AT `lg`, ABOVE THE REGISTER — not repeated on
 * each of the ten rows, which would put thirty mono labels on one screen. Below
 * `lg` there are no columns to head, so each beat carries its own label
 * instead. The same three strings either way, never a paraphrase.
 *
 * NO RANKING, NO SEVERITY, NO STATUS, NO ATTRIBUTION. `content.scenarios.ts`
 * flags that no source gives any of the ten a likelihood, a severity band, a
 * NOW/NEXT/NEVER status, a duration, or a named threat actor, and that on this
 * page a fabricated attribution would be a security claim rather than a
 * presentational flourish. The ordinals `S01`–`S10` are the source's own order
 * and nothing more — positions in a list, not a priority queue, which is why
 * they are set in muted mono rather than as a stamp or a chip. The decision
 * ledger immediately below is where NOW / NEXT / NEVER belongs.
 *
 * TOKEN DISCIPLINE: `--border`, `--foreground`, `--muted-foreground` and
 * `--primary-ink` only. No `--signal-*` token appears in this file.
 * `--signal-red` means a critical consequence, and painting ten scenario
 * cascades red would assert a severity none of them has been given.
 *
 * SIBLING BALANCE: `data-balance-group="scenario-<id>"`, one group per row,
 * across that row's three beat panes — on the INNER wrappers, never the grid
 * cells, which an equal-height row makes equal by construction. Per row rather
 * than one page-wide group because the harness pools every member sharing a
 * name: a single group would measure row ten's shortest beat against row one's
 * longest, which is not a layout fact about anything. The title line sits
 * outside every group — it spans the full row and has no sibling to be balanced
 * against. Each beat's own paragraph carries `data-balance-item`.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column, DOM order is reading order,
 * `min-w-0` on every grid child, no horizontal scroll and no side-scrolled
 * columns. The register is long by construction — ten scenarios is what the
 * source carries — and length is the honest cost of not hiding nine of them.
 */

/* Section chrome, not copy: `content.scenarios.ts` carries no datum label. */
const DATUM_LABEL = same("Scenarios");

/** The directional mark between beats. Decorative: see the docblock. */
function BeatArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="absolute -left-4 top-1 hidden h-4 w-4 text-border lg:block"
    >
      <path d="M2,8 H11" stroke="currentColor" strokeWidth={1.5} fill="none" />
      <path d="M8,4 L13,8 L8,12" stroke="currentColor" strokeWidth={1.5} fill="none" />
    </svg>
  );
}

export function Scenarios({ locale }: { locale: Locale }) {
  const labels = [
    pick(SCENARIOS.eventLabel, locale),
    pick(SCENARIOS.cascadeLabel, locale),
    pick(SCENARIOS.decisionLabel, locale)
  ] as const;

  return (
    <SectionA
      id="scenarios"
      index="04"
      datumLabel={DATUM_LABEL}
      heading={SCENARIOS.h2}
      lead={SCENARIOS.intro}
      locale={locale}
    >
      {/* Headed once. See the docblock. */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-10 lg:pb-3">
        {labels.map((label) => (
          <p key={label} className="mono-label text-primary-ink">
            {label}
          </p>
        ))}
      </div>

      <ol className="list-none p-0">
        {SCENARIOS.items.map((scenario, index) => {
          const beats = [scenario.event, scenario.cascade, scenario.decision] as const;
          return (
            <li key={scenario.id} className="border-t border-border py-8">
              <div className="flex items-baseline gap-5">
                <span className="mono-label shrink-0 text-muted-foreground">
                  {`S${String(index + 1).padStart(2, "0")}`}
                </span>
                <h3 className="min-w-0 flex-1 font-display text-[1.125rem] font-bold leading-snug text-foreground">
                  {pick(scenario.title, locale)}
                </h3>
              </div>

              <div className="mt-5 grid gap-x-10 gap-y-5 lg:grid-cols-3">
                {beats.map((beat, beatIndex) => (
                  <div
                    key={labels[beatIndex]}
                    data-balance-group={`scenario-${scenario.id}`}
                    className="relative min-w-0"
                  >
                    {beatIndex > 0 && <BeatArrow />}
                    <p className="mono-label text-muted-foreground lg:hidden">{labels[beatIndex]}</p>
                    <p
                      data-balance-item
                      className={
                        beatIndex === 2
                          ? "body-copy leading-relaxed text-foreground max-lg:mt-2"
                          : "body-copy leading-relaxed text-muted-foreground max-lg:mt-2"
                      }
                    >
                      {pick(beat, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </SectionA>
  );
}
