import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { StaticTable } from "@/components/ui/static-table";
import { COMPARISON } from "./content.reality";
import { SEGMENTS } from "./content";
import { SectionA } from "./Rule";

/**
 * S02 · PASSENGER TRANSIT VS US FREIGHT RAIL — header recipe H-A.
 *
 * H-A, NOT H-B. S01 above it takes H-B because its claim stands on outside
 * instruments; this section cites nothing, because it IS the comparison rather
 * than evidence for a claim about it. Giving it an evidence panel would mean
 * inventing a citation for a table the brief simply states.
 *
 * NO LEAD. The brief writes L93 as a bare `###` heading followed straight by
 * the matrix — no introductory sentence anywhere. `SectionA`'s `lead` is
 * optional precisely so a section like this can decline it rather than be
 * padded with a sentence introducing a table that introduces itself.
 *
 * A REAL `<table>`, VIA `ui/static-table.tsx`, NOT `ui/data-table.tsx`. The
 * source is a genuine seven-row matrix and every cell is prose. There is no
 * column anyone would sort by — no criticality, no count, no clause number —
 * and the rows are read across, not ranked down. `data-table.tsx` is a TanStack
 * table with a sort/filter bar; rendering that control over fourteen sentences
 * would offer an interaction that answers no question. `StaticTable` also gives
 * `<th scope="row">` on the dimension column, which is what lets a screen
 * reader announce "Change constraint — timetable windows, overnight
 * possessions…" instead of reading a disembodied clause.
 *
 * THE COLUMN HEADERS COME FROM `SEGMENTS`, NOT FROM THIS FILE. `content.ts`
 * holds the page's single definition of the two rail segments, including the
 * longer `tableLabel` form the brief uses for column headers (L96: "US freight
 * rail", not the toggle's "Freight Rail"). The body cells are looked up by
 * segment `id`, so the header row and the body are generated from one list and
 * cannot fall out of order — which matters on a page whose whole thesis (L3,
 * L169) is that these two segments must stay distinct.
 *
 * SIDEWAYS SCROLL, WITH BOTH THINGS THAT MAKE IT ACCEPTABLE. Three prose
 * columns cannot collapse to 390px without shredding the cells, so the table
 * scrolls inside its own `overflow-x-auto` wrapper — the wrapper scrolls, never
 * the page body, which is what `StaticTable`'s `min-w-0` guarantees. A wide
 * table is only permitted here with BOTH:
 *   · A VISIBLE AFFORDANCE — a stated line above the table saying it scrolls
 *     sideways. Stated, not implied by a fade or an icon: a gradient edge is
 *     invisible to anyone who has already scrolled, and it says nothing at all
 *     to a screen reader.
 *   · AN ALTERNATE SUMMARY — the two segments' core missions, readable without
 *     any horizontal scrolling at all. It is LIFTED FROM THE TABLE'S OWN FIRST
 *     ROW by id rather than written as a paraphrase, so it cannot drift from
 *     the matrix and adds no claim the matrix does not already make.
 * Both are `lg:hidden`: above `lg` the table fits, and a scroll hint over a
 * table that does not scroll is a false statement about the page.
 *
 * THE SUMMARY IS TWO BLOCKS, WHICH IS UNDER THE THREE-CARD CEILING
 * (OXOT_Visual_Rules.md L13) — and two is not a stylistic choice here, it is
 * how many rail segments there are.
 */
export function SegmentComparison({ locale }: { locale: Locale }) {
  const head = [
    pick(COMPARISON.dimensionHead, locale),
    ...SEGMENTS.map((segment) => pick(segment.tableLabel, locale))
  ];

  const rows = COMPARISON.rows.map((row) => [
    pick(row.dimension, locale),
    ...SEGMENTS.map((segment) => pick(row.cells[segment.id], locale))
  ]);

  const summaryRow = COMPARISON.rows.find((row) => row.id === COMPARISON.summaryRowId);

  return (
    <SectionA
      id="segment-comparison"
      index="02"
      datumLabel={COMPARISON.datumLabel}
      heading={COMPARISON.h2}
      locale={locale}
    >
      {summaryRow && (
        <div className="lg:hidden">
          <p className="mono-label text-muted-foreground">
            {pick(COMPARISON.summaryLabel, locale)}
          </p>
          <dl className="mt-3">
            {SEGMENTS.map((segment, i) => (
              <div
                key={segment.id}
                className={i > 0 ? "mt-3 border-t border-dashed border-border pt-3" : undefined}
              >
                <dt className="body-copy font-semibold leading-snug text-foreground">
                  {pick(segment.tableLabel, locale)}
                </dt>
                {/* ml-0 kills the UA's 40px indent. */}
                <dd className="ml-0 mt-1 body-copy leading-relaxed text-muted-foreground">
                  {pick(summaryRow.cells[segment.id], locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* The affordance sits immediately above the thing it describes, and is
          real text rather than an icon so it is announced as well as seen. */}
      <p className="mono-label mt-8 text-muted-foreground lg:hidden">
        {pick(COMPARISON.scrollAffordance, locale)}
      </p>

      <StaticTable
        className="mt-4 lg:mt-0"
        head={head}
        rows={rows}
        caption={pick(COMPARISON.caption, locale)}
        /* Three prose columns. Below this the segment columns crush to two or
           three words a line and the matrix stops being readable across. */
        minWidth="52rem"
      />
    </SectionA>
  );
}
