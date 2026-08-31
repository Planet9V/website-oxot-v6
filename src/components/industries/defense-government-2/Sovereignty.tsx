import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { SectionA } from "./Rule";
import { SOVEREIGNTY } from "./content.scope";

/**
 * S01 · WHAT SOVEREIGNTY MEANS — header recipe H-A.
 *
 * THE CONTENT SHAPE IS A DEFINITIONAL PAIR, SIX TIMES OVER. Every row in
 * `SOVEREIGNTY.rows` carries exactly three cells and two of them are of the
 * SAME KIND: `practice` is what the dimension means for the organization, and
 * `models` is what the Twin holds for it. One is the claim; the other is the
 * evidence that makes the claim checkable. `dimension` is the row's NAME, not a
 * third clause. So the layout is a name beside a pair — never three equal
 * columns, which would assert that the dimension's name is the same kind of
 * thing as the two sentences after it.
 *
 * WHY THIS IS NOT THE SCENARIO REGISTER'S SHAPE, three sections down. That
 * section also lays prose in columns, and the two must not read as one
 * component with different words in it:
 *   · Here the name sits IN the row, at its head, in the left quarter, and the
 *     two clauses that follow are a PAIR — unordered, mutually explanatory.
 *   · There the title sits ABOVE its row on its own full-width line, and the
 *     three cells under it are a SEQUENCE — event, then cascade, then decision
 *     — read strictly left to right, which is why that section carries a
 *     directional divider between cells and this one carries one divider, in
 *     one place, meaning one thing.
 * The distinction is in the content, not in the styling: a pair has no
 * direction and a cascade does.
 *
 * THE DASHED RULE BETWEEN THE PAIR IS THE PAGE'S OWN PERIMETER, turned
 * vertical — the same idiom `Rule.tsx` draws at the head of every section,
 * restated at the one place on this page where a sentence about the
 * organization meets a sentence about the model. `--border` only. No
 * `--signal-*` token appears in this file: the six signals mean model and
 * decision state, and a definition is neither.
 *
 * THE INTRO IS NOT OPTIONAL AND IS RENDERED AS THE LEAD. `content.scope.ts`
 * states that the refusal of the data-residency shorthand is the section's
 * whole reason to exist and that a renderer must not cut it and leave the six
 * rows to speak for themselves. It therefore takes H-A's lead slot — full body
 * size, directly under the h2, above the first row.
 *
 * COLUMN HEADERS RENDER ONCE AT `lg`, AND PER-CELL BELOW IT. At desktop the two
 * clause columns hold their positions down the whole section, so one header row
 * names them and the rows stay clean. Once the grid stacks there are no columns
 * left to head, so each cell carries its own label instead — the same two
 * strings from the content module either way, never a paraphrase.
 *
 * SIBLING BALANCE: `data-balance-group="sovereignty-<id>"`, one group per row,
 * on the two clause panes' INNER wrappers — never on the grid cells, which an
 * equal-height row makes equal by construction. The groups are per row because
 * the harness pools every member sharing a name: one page-wide group would
 * compare the shortest clause in row six against the longest in row one, which
 * is not a layout fact about anything. The name rail is deliberately OUTSIDE
 * the group — it is a row label, not a sibling pane, and measuring a three-word
 * heading against a four-line sentence would produce a ratio that describes
 * nothing. `practice` takes the wider column (5 of 12) and `models` the
 * narrower (4 of 12): the practice clause is the longer of the two in five of
 * six rows, so the wider track is where the extra text belongs.
 *
 * MOBILE (OXOT_Mobile_Rules.md): one column, DOM order is reading order —
 * name, then practice, then models — `min-w-0` on every grid child so a long
 * clause wraps instead of widening the page. Nothing is behind a hover, a
 * click, or a disclosure; every string is present at first paint.
 */

/* Section chrome, not copy: `content.scope.ts` carries no datum labels. The
   run's label is the section's own subject, in the same locally-stated-label
   convention the rest of this page uses. */
const DATUM_LABEL = same("Sovereignty");

export function Sovereignty({ locale }: { locale: Locale }) {
  const practiceLabel = pick(SOVEREIGNTY.practiceLabel, locale);
  const modelsLabel = pick(SOVEREIGNTY.modelsLabel, locale);

  return (
    <SectionA
      id="sovereignty"
      index="01"
      datumLabel={DATUM_LABEL}
      heading={SOVEREIGNTY.h2}
      lead={SOVEREIGNTY.intro}
      locale={locale}
    >
      {/* The header row. `lg` and up only — below that there are no columns to
          head, and each cell carries its own label instead. */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-3">
        <p className="mono-label col-span-5 col-start-4 text-primary-ink">{practiceLabel}</p>
        <p className="mono-label col-span-4 text-primary-ink">{modelsLabel}</p>
      </div>

      <ol className="list-none p-0">
        {SOVEREIGNTY.rows.map((row) => (
          <li
            key={row.id}
            className="grid gap-x-8 gap-y-4 border-t border-border py-8 lg:grid-cols-12"
          >
            <div className="min-w-0 lg:col-span-3">
              <h3 className="font-display text-[1.125rem] font-bold leading-snug text-foreground">
                {pick(row.dimension, locale)}
              </h3>
            </div>

            <div data-balance-group={`sovereignty-${row.id}`} className="min-w-0 lg:col-span-5">
              <p className="mono-label text-muted-foreground lg:hidden">{practiceLabel}</p>
              <p
                data-balance-item
                className="body-copy leading-relaxed text-foreground max-lg:mt-2"
              >
                {pick(row.practice, locale)}
              </p>
            </div>

            {/* The perimeter, vertical: the line between what the organization
                does and what the model holds. Dashed at `lg` only — once the
                grid stacks the two clauses sit above and below each other, and
                a left rule there would read as an indent, not a boundary. */}
            <div
              data-balance-group={`sovereignty-${row.id}`}
              className="min-w-0 lg:col-span-4 lg:border-l lg:border-dashed lg:border-border lg:pl-8"
            >
              <p className="mono-label text-muted-foreground lg:hidden">{modelsLabel}</p>
              <p
                data-balance-item
                className="body-copy leading-relaxed text-muted-foreground max-lg:mt-2"
              >
                {pick(row.models, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionA>
  );
}
