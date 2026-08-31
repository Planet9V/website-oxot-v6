import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { SectionA } from "./Rule";
import { ENGAGEMENT, type RailEngagement } from "./content.engagement";

/**
 * S12 · ENGAGEMENT APPROACH — source L386–L396, header recipe H-A.
 *
 * A SCOPE LADDER: three open blocks, read top to bottom, nothing behind a
 * click. This is deliberately NOT the energy page's Zone Sequencer (Pattern 6,
 * `energy-utilities-2/Engagement.tsx`), even though the two sections carry the
 * same three engagements in the same smallest-to-largest order, because rail's
 * table has a fourth column energy's does not:
 *
 *   · Energy: Engagement | Energy use case | Output — three cells per row, one
 *     audience. A vertical tab rail that opens one entry at a time costs that
 *     page nothing, because whichever entry is closed holds only a use case
 *     already scoped to the single reader.
 *   · Rail:   Engagement | Passenger / transit use case | Freight-rail use case
 *     | Output (L392) — the same engagement stated twice, in two operating
 *     languages. Putting that behind a selector would mean a transit operator
 *     and a freight railroad each see, at any moment, one row of a table whose
 *     whole point is the pairing.
 *
 * THE DUAL-TRACK CLAIM IS THIS PAGE'S THESIS AND IS NEVER CONDITIONAL ON
 * INTERACTION. L3 insists passenger transit and US freight "should not read as
 * one generic 'transport' offering" and L169 that freight be "a dedicated
 * subpage or major tab, not a paragraph under passenger rail". `DecisionLedger`
 * (S07) reached the same conclusion for the same reason and keeps both
 * phrasings permanently visible; this section keeps that promise consistent
 * rather than letting the page argue its thesis in one place and hide it in
 * another five sections later.
 *
 * NOR IS IT S07's REGISTER, which is the other multi-column dual-track section
 * here. That one is a ruled table with a sticky column header, per-row
 * disclosure, an inline route link per row and the NOW/NEXT/NEVER stamps inside
 * row 1. This has no table rules, no disclosure, no stamps, no per-item link
 * and no selection state at all — three framed blocks with an interior split,
 * all static markup. Two adjacent multi-column sections that read alike is the
 * template sameness `OXOT_Composition_Rules.md` exists to prevent; the
 * separation here is structural, not a restyle.
 *
 * NO SERVER/CLIENT BOUNDARY IS SPENT ON IT. There is no state, no handler and
 * no effect, so there is no `"use client"` directive: this renders on the
 * server as markup. A section that hydrates for nothing is a cost with no
 * behaviour to pay for it.
 *
 * THE 01–03 MARKERS COUNT ENTRIES, THEY DO NOT RATE THEM. They are the rows'
 * positions in the source table (L394–L396), which is a real fact about the
 * source. NOTHING DRAWS RELATIVE SIZE — no widening bar, no scope meter, no
 * duration, price, team shape or prerequisite — because the source states none
 * of those, and a bar that grew across the three would assert a magnitude
 * nobody wrote. Nothing marks an engagement as completed, current or
 * recommended either: these are three engagements an operator CHOOSES BETWEEN,
 * so a progress or status mark would be a fabricated classification, and on a
 * page whose neighbouring sections carry regulatory material it would read as
 * assurance evidence.
 *
 * OUTPUT SITS FULL-WIDTH UNDER THE SPLIT, not in a fourth column. Column four
 * is the one cell of the row that is NOT segment-specific — the source writes
 * one output per engagement, shared by both audiences — so it spans the block's
 * full width beneath the two, which is that fact drawn rather than described.
 * Four equal columns would state the opposite: that the output is a peer of the
 * two use cases and therefore also split by segment.
 *
 * TOKEN DISCIPLINE: `--border`, `--primary-ink`, `--muted` and the baseline text
 * tokens only. No `--signal-*` token appears in this file. The six signals mean
 * model and decision state; an engagement tier is neither, and passenger vs
 * freight is an audience split rather than a state — spending semantic colour on
 * either would drain the meaning out of the tokens that carry it, which is the
 * rule both `DecisionLedger.tsx` and `Rule.tsx` state for this page.
 *
 * THE SPLIT IS A `<dl>`, NOT A TABLE. Each block is one engagement's own set of
 * labelled values, not a row that has to align with its neighbours cell for
 * cell — and the labels are the source's own column headers (L392), so the
 * reader gets what a header row would have told them without a grid that would
 * then have to survive a 390px viewport.
 */

/** One labelled cell: the source's column header, then that row's value. */
function Cell({
  label,
  value,
  locale,
  className
}: {
  label: Bilingual;
  value: Bilingual;
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="mono-label text-primary-ink">{pick(label, locale)}</dt>
      <dd className="mt-2 body-lead leading-relaxed text-foreground">{pick(value, locale)}</dd>
    </div>
  );
}

function EngagementBlock({ item, locale }: { item: RailEngagement; locale: Locale }) {
  return (
    <li className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
      {/* data-narrow-ok on the row: the h3 below is a short engagement TITLE
          (e.g. "System Twin Build"), not a reading-width paragraph — its
          narrow rendered width is the natural width of a few words, not a
          measure class capping a paragraph that should otherwise fill the
          row. `scripts/measure.mjs`'s narrow-text walk starts at the text
          node's PARENT, so the exemption has to sit on this row, not on the
          `<h3>` itself. */}
      <div data-narrow-ok className="flex items-baseline gap-3">
        <span aria-hidden="true" className="mono-label text-primary-ink">
          {item.index}
        </span>
        <h3 className="h-card text-balance text-foreground">{pick(item.name, locale)}</h3>
      </div>

      <dl className="mt-6">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <Cell label={ENGAGEMENT.columns.passenger} value={item.passenger} locale={locale} />
          <Cell
            label={ENGAGEMENT.columns.freight}
            value={item.freight}
            locale={locale}
            className="sm:border-l sm:border-border sm:pl-8"
          />
        </div>
        <Cell
          label={ENGAGEMENT.columns.output}
          value={item.output}
          locale={locale}
          className="mt-6 border-t border-border pt-6"
        />
      </dl>
    </li>
  );
}

export function Engagement({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <SectionA
      id={ENGAGEMENT.sectionId}
      index={ENGAGEMENT.index}
      datumLabel={ENGAGEMENT.datumLabel}
      heading={ENGAGEMENT.h2}
      locale={locale}
      className={className}
    >
      <ol className="grid gap-5 sm:gap-6">
        {ENGAGEMENT.items.map((item) => (
          <EngagementBlock key={item.id} item={item} locale={locale} />
        ))}
      </ol>
    </SectionA>
  );
}
