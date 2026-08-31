import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { SectionA } from "./Rule";
import { ENGAGEMENT, type HyperscaleEngagement } from "./content.engagement";

/**
 * S13 · ENGAGEMENT APPROACH — source L475–L486, header recipe H-A.
 *
 * AN OPEN SCOPE LADDER: four entries hung off one continuous rail, read top to
 * bottom, nothing behind a click. The approved treatment was Pattern 6's Zone
 * Sequencer in its Scope Rail variant; the test it had to pass first was the one
 * `rail-transportation-2/Engagement.tsx` records, applied to THIS table. It
 * passes that test and fails a second one, so the disclosure is dropped and the
 * ladder kept.
 *
 * THE COLUMN TEST DOES NOT DISQUALIFY A SEQUENCER HERE, and saying so plainly
 * matters because rail's file rejected one on exactly that ground. Rail's table
 * carries FOUR columns — the same engagement stated twice, in passenger and in
 * freight operating language — so a selector showing one row at a time would
 * destroy a side-by-side pairing that is that page's whole thesis. L481 here is
 * three columns, `Engagement | Best starting point | Example output`: ONE
 * description column, one audience. That is the energy brief's shape, and
 * `energy-utilities-2/Engagement.tsx` legitimately runs a Scope Rail over it.
 * Nothing about hyperscale's table forbids the same.
 *
 * WHAT FORBIDS IT IS THIS PAGE, NOT THIS TABLE — twice over.
 *
 * First, saturation. Five sections above already put their content behind a
 * control: S01's two-axis canvas (scenario × view), S03's layer radios drawn
 * onto the architecture itself, S04's eight-domain Radix tab index, S07's
 * twelve-scenario radiogroup register, and the three-gate ledger's per-gate
 * `<details>`. A sixth selection mechanism is the template sameness
 * `OXOT_Composition_Rules.md` exists to prevent.
 *
 * Second, load. S04 hides seventy-nine terms behind its tabs and S07
 * forty-eight cells behind its register; this section is EIGHT cells in total,
 * two per engagement, each one clause long. A control that conceals two clauses
 * is machinery with no load on it, and it would cost a client boundary to
 * install. So there is no `"use client"` here: no state, no handler, no effect,
 * and this renders on the server as markup. The Scope Rail is not being retired
 * as a pattern — energy-utilities-2, water-wastewater-2 and water-wastewater-3
 * all ship it and all keep it — it is being declined on the one page whose other
 * sections have already spent that budget.
 *
 * NO CARD FRAMES, AND THE COUNT IS WHY. `OXOT_Visual_Rules.md` bars more than
 * three visually equal cards without a hierarchy break. There are four
 * engagements. The available escape — promoting one entry to a larger, filled
 * block and demoting the other three — would manufacture exactly the claim this
 * section must not make: these four are a menu an operator CHOOSES BETWEEN, and
 * extra visual weight on any one of them reads as a recommendation the source
 * never writes. L479's headline points at narrow scope in general ("one hall,
 * one utility dependency, or one critical-facilities change"), and its three
 * examples do not all land on the same row. So the frames go instead of the
 * fourth engagement, and all four entries are drawn identically.
 *
 * NO ORDINALS EITHER. `CaseProgramme` (S10) prints 01–09 down a numbered spine
 * and states in its own docblock that it is "the one numbered list on this
 * page"; `Capabilities` (S11) prints 01–09 down its index rail. A third numbered
 * run three sections later would flatten all three into one house style. It
 * would also be the wrong semantic: S10's order IS its content — swap step 7 and
 * step 9 and the method stops being a method — whereas these four are a menu,
 * and a number on a menu rates what it only counts. The source's row order is
 * kept verbatim in `content.engagement.ts` and is left to speak for itself.
 *
 * THE RAIL IS THE PAGE'S OWN LINE-WORK, TURNED NINETY DEGREES. `Rule.tsx` draws
 * two horizontal runs bridged by a cross-tie; this is one vertical run with the
 * four entries attached to it — the same drawing vocabulary, not a second copy
 * of the same drawing. NOTHING ABOUT IT GROWS: the rail does not thicken, fill,
 * step or lengthen across the four, and no bar, meter, duration or price sits
 * beside them, because the source states no magnitude for any engagement and a
 * widening rail would assert one nobody wrote. The node is identical on every
 * entry — it marks where an engagement attaches to the run, and a mark that
 * appears on all four cannot be read as a selection, a status or a
 * recommendation. The rail terminates at the last entry's final line rather than
 * running on past it, so it reads as a bounded set and not as a sequence
 * continuing off the section.
 *
 * THE PAIR IS A `<dl>`, NOT A TABLE. Each entry is one engagement's own two
 * labelled values, not a row that has to align cell-for-cell with its
 * neighbours, and the labels are L481's own column headers — so the reader gets
 * what a header row would have told them without a grid that would then have to
 * survive a 390px viewport. Starting point sits left of output at `sm` and above
 * it below, which is the source's own column order either way, and reads as what
 * an operator brings and what comes back.
 *
 * THE LIST IS A `<ul>`. An `<ol>` would announce "1 of 4" to a screen reader and
 * put back in speech the ranking the visible design just spent two paragraphs
 * removing.
 *
 * NO `data-narrow-ok` ANYWHERE, unlike rail's equivalent file. Its `<h3>` sits
 * in a `flex items-baseline` row beside an ordinal marker, so it shrinks to the
 * width of its own few words and trips `scripts/measure.mjs`'s narrow-text walk
 * legitimately. This one is a block-level child of its entry with no marker
 * inline beside it, so it already fills the entry's full width and needs no
 * exemption. The two `<dd>` values are not in that walk's `p, h2, h3` selector
 * at all, and sit inside a two-column grid besides.
 *
 * TOKEN DISCIPLINE: `--border`, `--primary-ink` and the baseline text tokens
 * only. No `--signal-*` token appears in this file. The six signals carry model
 * and decision state on this page; an engagement is neither a model state nor a
 * decision, and spending a semantic colour on section chrome would drain the
 * meaning out of the tokens that carry it — the rule `Rule.tsx` states as
 * binding for this page.
 */

/** One labelled value: the source's column header, then that engagement's cell. */
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

function Entry({ item, locale }: { item: HyperscaleEngagement; locale: Locale }) {
  return (
    <li className="relative pb-12 pl-6 last:pb-0 sm:pl-8">
      {/* The attachment point, centred on the rail rather than beside it. Same
          on all four entries: position, never status. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 size-1.5 -translate-x-1/2 rounded-full bg-primary-ink"
      />
      <h3 className="h-card text-balance text-foreground">{pick(item.name, locale)}</h3>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-8">
        <Cell label={ENGAGEMENT.columns.startingPoint} value={item.startingPoint} locale={locale} />
        <Cell
          label={ENGAGEMENT.columns.output}
          value={item.output}
          locale={locale}
          className="sm:border-l sm:border-border sm:pl-8"
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
      <ul className="border-l border-border">
        {ENGAGEMENT.items.map((item) => (
          <Entry key={item.id} item={item} locale={locale} />
        ))}
      </ul>
    </SectionA>
  );
}
