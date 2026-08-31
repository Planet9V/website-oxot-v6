import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { ENGAGEMENT } from "./content";

/**
 * S11 · ENGAGEMENT APPROACH — header recipe H-A.
 *
 * FIVE TIERS, NOT THREE, AND THAT IS A REAL SECTOR DIFFERENCE. `content.ts`'s
 * `ENGAGEMENT` docblock is explicit: unlike the sibling manufacturing page,
 * which had no engagement copy of its own and reused Energy's three-tier shape
 * by owner approval, this vertical's source carries a complete five-tier model
 * with a use case and an output per tier — and two of the five (Hybrid
 * Resilience Exercise, Technology Sovereignty Assessment) have no equivalent in
 * the standard three-tier shape. "Do not 'align' this to three tiers." Nothing
 * here merges, drops or reorders one.
 *
 * NOT PATTERN 6 (ZONE SEQUENCER), AND NOT ITS SCOPE-RAIL VARIANT. Both are the
 * natural reach for an engagement section and both are unavailable: this page's
 * budget of named patterns is already spent on the hero, the worked example,
 * the decision ledger and the case-file index, and a page composes two to four
 * of them, never more. Everything here is an editorial treatment.
 *
 * IT IS ALSO THE WRONG SHAPE FOR THIS CONTENT REGARDLESS. A sequencer draws a
 * SEQUENCE — numbered markers on a rail, each step reached after the one before
 * it. These five are a MENU: a Sovereign Resilience Decision Sprint and a
 * Technology Sovereignty Assessment are alternatives chosen between, not stages
 * walked through, and no source states an order among them. Drawing them on a
 * rail would assert a progression nobody has claimed, on a page where an
 * implied maturity ladder reads as a sales funnel.
 *
 * SO: FIVE BANDS. Each tier's name spans the full width on its own line with a
 * muted ordinal beside it, and beneath it the two cells split — use case left,
 * output right, divided by the page's dashed perimeter. The rhythm is
 * name-across-then-split, deliberately none of this page's other multi-column
 * rhythms:
 *   · S01 puts the name IN the row, in a left rail, beside one pair.
 *   · S04 puts the title above a THREE-cell directional sequence with arrows.
 *   · This puts the name above a TWO-cell pair with no direction at all,
 *     because a use case and its output are not a sequence — the output is what
 *     the use case yields, stated at the same time, not a later step.
 *
 * THE ORDINALS ARE POSITIONS, NOT RANKS. `01`–`05` are the content module's own
 * order and nothing more, set in muted mono rather than as a stamp, chip or
 * filled marker. No tier is marked recommended, typical, entry-level or
 * complete. NO COMPLETION STATE APPEARS ANYWHERE IN THE RENDERED OUTPUT — the
 * words "complete", "done" and "finished" and every check-mark glyph are barred
 * from this file, and this docblock is the only place they appear at all.
 * Nobody has walked these five, and this section sits between a regulatory
 * reference matrix and a final CTA, where a fabricated progress mark would read
 * as assurance evidence.
 *
 * NOTHING IS PRICED, TIMED, STAFFED OR CLEARED. `content.ts` flags that no
 * source gives a duration, price, team shape, clearance requirement or
 * prerequisite for any of the five, and that a clearance or accreditation
 * prerequisite in particular would be a fabricated security fact rather than a
 * marketing omission. None is invented. The section carries no CTA of its own
 * either: the page's conversion is the closing block immediately below it, and
 * five repeated buttons here would compete with it.
 *
 * TOKEN DISCIPLINE: `--border`, `--foreground`, `--muted-foreground` and
 * `--primary-ink` only. No `--signal-*` token appears in this file — the six
 * signals mean model and decision state, and an engagement tier is neither.
 *
 * SIBLING BALANCE: `data-balance-group="engagement-<id>"`, one group per band,
 * on the two cells' INNER wrappers — never the grid cells, which an
 * equal-height row makes equal by construction. Per band rather than one
 * page-wide group because the harness pools every member sharing a name: a
 * single group would measure tier five's shorter output against tier two's
 * longer use case, which is not a layout fact about anything. The name line
 * sits outside every group — it spans the full band and has no sibling to be
 * measured against. Each cell's own paragraph carries `data-balance-item`; the
 * per-cell mono label is not marked, because it is the same short string in
 * every band and counting it would inflate both sides equally without
 * describing anything.
 *
 * THE PER-CELL LABELS REPEAT IN EVERY BAND, AND THAT IS THE RIGHT CALL HERE
 * rather than one header row at the top as S01 and S04 use. Those two are dense
 * registers a reader scans down a column of; these five bands are tall and read
 * one at a time, so a header row five bands up is out of sight by the third.
 * Two mono labels per band is ten in total — small enough to carry, unlike the
 * thirty a per-row header would put on the scenario register.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column, DOM order is reading order — name,
 * then use case, then output — `min-w-0` throughout, no horizontal scroll,
 * nothing behind a hover or a disclosure.
 */

/* Section chrome, not copy: `content.ts` carries no datum labels. */
const DATUM_LABEL = same("Engagement");

export function Engagement({ locale }: { locale: Locale }) {
  const useCaseLabel = pick(ENGAGEMENT.useCaseLabel, locale);
  const outputLabel = pick(ENGAGEMENT.outputLabel, locale);

  return (
    <SectionA
      id="engagement"
      index="11"
      datumLabel={DATUM_LABEL}
      heading={ENGAGEMENT.h2}
      locale={locale}
    >
      <ol className="list-none p-0">
        {ENGAGEMENT.items.map((tier, index) => (
          <li key={tier.id} className="border-t border-border py-10">
            <div className="flex items-baseline gap-5">
              <span className="mono-label shrink-0 text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="min-w-0 flex-1 font-display text-[1.25rem] font-bold leading-snug text-foreground">
                {pick(tier.name, locale)}
              </h3>
            </div>

            <div className="mt-6 grid gap-x-12 gap-y-6 lg:grid-cols-2">
              <div data-balance-group={`engagement-${tier.id}`} className="min-w-0">
                <p className="mono-label text-primary-ink">{useCaseLabel}</p>
                <p
                  data-balance-item
                  className="mt-2 body-copy leading-relaxed text-foreground"
                >
                  {pick(tier.useCase, locale)}
                </p>
              </div>

              {/* The perimeter, vertical, at `lg` only — once the grid stacks
                  the two cells sit above and below each other, and a left rule
                  there would read as an indent rather than a boundary. */}
              <div
                data-balance-group={`engagement-${tier.id}`}
                className="min-w-0 lg:border-l lg:border-dashed lg:border-border lg:pl-12"
              >
                <p className="mono-label text-primary-ink">{outputLabel}</p>
                <p
                  data-balance-item
                  className="mt-2 body-copy leading-relaxed text-muted-foreground"
                >
                  {pick(tier.output, locale)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionA>
  );
}
