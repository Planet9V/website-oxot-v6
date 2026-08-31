import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { SEGMENTS } from "./content";
import { CAPABILITIES, CAPABILITIES_SECTION } from "./content.capabilities";
import { SectionA } from "./Rule";

/**
 * S10 · PRODUCT CAPABILITIES — source L347–L361, header recipe H-A.
 *
 * H-A because `Rule.tsx`'s own recipe table assigns it: a section whose body is
 * a matrix takes the block run, a full-width h2 and no evidence panel. No lead —
 * the source writes none (see `content.capabilities.ts`).
 *
 * A SCHEDULE, NOT A THIRD TABLE, AND NOT THE DECISION REGISTER AGAIN. This page
 * already carries two matrices and this section must not become a copy of
 * either:
 *   · S02 `SegmentComparison` is a real three-column `StaticTable` — Dimension |
 *     Passenger | Freight, seven rows. Rendering S10 that way would put the
 *     SAME seven-row, three-prose-column table on the page twice, and would also
 *     inherit that table's sideways scroll and its two pieces of small-screen
 *     chrome for content that does not need them.
 *   · S07 `DecisionLedger` is a 4/4/4 twelve-column register with a sticky
 *     column header and a per-row disclosure. A seven-row 4/4/4 grid here would
 *     be that component with the interaction stripped out.
 *
 * THE SHAPE FOLLOWS THE SECTION'S OWN HEADLINE. L351 claims "One rail model
 * spanning operations, signaling, OT, and service consequence." A three-column
 * table draws two parallel columns of equal weight, which reads as two things
 * standing side by side; this section's claim is the opposite — ONE capability,
 * spanning both segments. So the capability name spans the FULL WIDTH as the
 * entry's own title, and the two segment readings sit beneath it as a 6/6 split.
 * The structure says what the sentence says: one thing across the top, read two
 * ways underneath.
 *
 * WHICH ALSO REMOVES THE SIDEWAYS SCROLL. Three prose columns cannot survive
 * 390px, which is why S02 has to scroll and has to carry both a stated scroll
 * affordance and an alternate summary to be permitted at all. Two columns
 * stacking to one at `md` need none of that: every cell is readable at every
 * width, with no horizontal scroll anywhere and no chrome apologising for one.
 *
 * `<dl>`, NOT A TABLE AND NOT NESTED HEADINGS. Each entry is a name (`<h3>`)
 * over two label/value pairs, which is exactly a description list: `<dt>` is the
 * segment, `<dd>` is that segment's value for this capability. A screen reader
 * announces "Passenger transit value — links train control, OCC, signaling…"
 * instead of reading a disembodied clause. Nesting two more `<h4>`s per entry
 * would put fourteen extra headings into the document outline for what are
 * labels, not sections.
 *
 * THE SEGMENT COLUMNS COME FROM `SEGMENTS`, NOT FROM THIS FILE. `content.ts`
 * holds the page's single definition of the two rail segments; this component
 * walks that array and looks each value up by segment `id`, so the two columns
 * here cannot fall out of order with the hero toggle, the architecture toggle or
 * the S02 matrix. The HEAD TEXT is this table's own (L353: "Passenger transit
 * value" / "Freight rail value"), which is why it is read from
 * `CAPABILITIES.valueHead` by the same id rather than from `tableLabel`.
 *
 * BOTH LABELS STAY VISIBLE AT EVERY WIDTH. S07 hides its inline labels at `lg`
 * because a sticky column header takes over the naming; there is no column
 * header here to take over, since the capability title occupies the top of each
 * entry. The label belongs with its own value, always.
 *
 * NO MARKERS, NO COLOUR-CODING. The source states no order for the seven, so no
 * numeral, letter or step marker is printed — either would assert a sequence
 * that is not in the brief. And no `--signal-*` token separates passenger from
 * freight: the six signals encode model/decision STATE, and passenger vs freight
 * is an audience split. The same reasoning `Rule.tsx` and `DecisionLedger.tsx`
 * both record. The two tracks are told apart by their labels and by one rule
 * between them.
 */
export function Capabilities({ locale }: { locale: Locale }) {
  return (
    <SectionA
      id={CAPABILITIES_SECTION.id}
      index={CAPABILITIES_SECTION.index}
      datumLabel={CAPABILITIES_SECTION.datumLabel}
      heading={CAPABILITIES_SECTION.heading}
      locale={locale}
    >
      <ul className="list-none border-t border-border">
        {CAPABILITIES.items.map((item) => (
          <li key={item.id} className="border-b border-border py-7">
            <h3 className="body-lead font-semibold leading-snug text-foreground">
              {pick(item.name, locale)}
            </h3>

            <dl className="mt-5 grid gap-6 md:grid-cols-2 md:gap-10">
              {SEGMENTS.map((segment, i) => (
                <div
                  key={segment.id}
                  className={cn(
                    /* One rule between the two tracks, on the second pane only —
                       a divider, not an indent applied to both. Below `md` the
                       panes stack, so the rule is dropped rather than left
                       hanging above an item it no longer separates. */
                    i > 0 && "md:border-l md:border-border md:pl-10"
                  )}
                >
                  <dt className="mono-label text-primary-ink">
                    {pick(CAPABILITIES.valueHead[segment.id], locale)}
                  </dt>
                  {/* ml-0 kills the UA's 40px indent. */}
                  <dd className="ml-0 mt-2 body-copy leading-relaxed text-muted-foreground">
                    {pick(item.values[segment.id], locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}
