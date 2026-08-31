import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { REALITY } from "./content.reality";
import { SectionB } from "./Rule";

/**
 * S02 · SECTOR REALITY — header recipe H-B, and the only section on this page
 * that takes it.
 *
 * WHY H-B HERE AND NOWHERE ELSE. H-B puts the section's prose in a 7-col beside
 * a cited-evidence panel in a 5-col, and it belongs here because this section's
 * load-bearing claim rests on a genuine outside instrument rather than on OXOT's
 * own framing: the EU Energy Efficiency Directive's annual energy-performance
 * reporting duty for sites at or above 500 kW installed IT power demand (L119),
 * which is also the only sentence in the brief's body sections that arrives
 * carrying its own publisher link. The test is falsifiable rather than
 * decorative — any other section standing on an outside instrument that way
 * would take H-B too, and none does.
 *
 * THE CITED CLAIM IS RENDERED ONCE, IN THE PANEL. L112's three sentences are
 * narrative and stay in the 7-col; L119's two clauses are rendered ONLY as the
 * panel's two rows. Restating either in the narrative would print this section's
 * evidence twice and leave the panel summarising itself.
 *
 * THE 500 kW FIGURE STAYS THE SOURCE'S REGULATORY FRAMING. It appears exactly
 * once on this page, inside the evidence panel, attached to the instrument that
 * sets it and to that instrument's own link — never in the narrative, never in
 * the register, never beside anything OXOT does. See content.reality.ts.
 *
 * THE SECTION'S ONE FOCAL ELEMENT (OXOT_Visual_Rules.md L3) IS THE EVIDENCE
 * PANEL: the only bordered, filled surface in the section, and the only place
 * brand orange appears — on the source link, which is the one place a reader is
 * being invited to leave the page. Everything below the split is the secondary
 * layer and is deliberately quiet: rules and weight, no fill, no accent. A
 * second orange on the availability-claim labels or the register terms would be
 * the competing-accent case OXOT_Visual_Rules.md L14 names.
 *
 * BELOW THE SPLIT, TWO BLOCKS, IN THE SOURCE'S OWN ORDER.
 *
 *   1. THE AVAILABILITY-CLAIM PAIR (L114–L117) IS THE PAGE'S DATUM IN WORDS.
 *      Rule.tsx's signature is two parallel runs bridged by one cross-tie, and
 *      L116/L117 are literally the two runs and the elements that bridge them —
 *      so the pair renders as two panes side by side, each opened by one solid
 *      rule, which is the same drawing one level larger. Not cards, not a filled
 *      surface: the evidence panel above is this section's one focal element,
 *      and a second bordered box beneath it would compete with the citation the
 *      whole recipe exists to carry.
 *      The two panes are DELIBERATELY UNEQUAL in depth — five things redundant,
 *      twelve things shared — and no `data-balance-group` is put on them. They
 *      are not a balance pair: their inequality is the section's argument (P2 of
 *      the narrative, "redundancy does not eliminate dependency"), so a floor
 *      that forced them toward parity would suppress the one thing they exist to
 *      show.
 *
 *   2. THE TWELVE-ROW CHALLENGE REGISTER (L123–L136) STACKS, IT DOES NOT RAIL.
 *      Each entry puts its challenge above its clause, and the twelve entries
 *      flow through two equal tracks at `lg`. That is deliberately NOT
 *      manufacturing-process-2's shape for the same kind of source table, and
 *      the reason is the content rather than a wish to look different: that
 *      page's eight terms are short noun phrases ("Vendor density", "Brownfield
 *      complexity") that sit comfortably in a 15rem rail, whereas several of
 *      these twelve are full clauses — "Electrical and cooling systems are
 *      inseparable from compute availability" is nine words, and a rail wide
 *      enough to hold it would starve the clause beside it. Stacking gives every
 *      term its own full line; two tracks give each clause a reading width
 *      without a cap; twelve entries read as a register rather than as a page of
 *      table.
 *      NO `prose-measure` ANYWHERE BELOW THE SPLIT. `scripts/measure.mjs`'s
 *      orphaned-narrow-text check flags a reading-width cap on a text block with
 *      no real column sibling, and it exists because exactly that defect shipped
 *      twice. The lead sentence and both panes' bodies are therefore uncapped,
 *      and the register earns its narrower measure from a real two-track grid
 *      rather than from a cap.
 *      NO ORDINALS, NO GROUPING, NO SEVERITY on the rows — see
 *      content.reality.ts: the source ranks nothing and groups nothing, and a
 *      printed 01–12 rail would read as a priority order the brief never states.
 *
 * SIBLING BALANCE, `data-balance-group="reality-head"`, floor 0.5 (the site-wide
 * 2x floor; `scripts/measure.mjs` takes the WORSE of height ratio and marked
 * element count). Both panes are fixed BY INFORMATION, not by filler:
 *   · NARRATIVE — 3 marked paragraphs, split at L112's own sentence boundaries.
 *   · EVIDENCE — 3 marked elements: the reporting duty, what the scheme covers,
 *     and the source link. All three are transcribed from L119; nothing was
 *     added to this panel to make a count pass.
 * Count ratio 3/3, so rendered height governs. The marks sit on the inner
 * content, never on the stretched grid cell.
 */

export function SectorReality({ locale }: { locale: Locale }) {
  const { citation } = REALITY;

  return (
    <SectionB
      id="sector-reality"
      index="02"
      datumLabel={REALITY.datumLabel}
      heading={REALITY.h2}
      balanceGroup="reality-head"
      locale={locale}
      narrative={
        <div className="space-y-4">
          {REALITY.narrative.map((paragraph, i) => (
            <p
              key={i}
              data-balance-item
              className="prose-measure body-lead leading-relaxed text-muted-foreground"
            >
              {pick(paragraph, locale)}
            </p>
          ))}
        </div>
      }
      evidence={
        <>
          {/* The brief's own scoping phrase. Muted, not orange — it says WHERE
              the instrument bites, which is context for the name below it
              rather than the panel's accent. */}
          <p className="mono-label text-muted-foreground">
            {pick(citation.jurisdiction, locale)}
          </p>
          {/* One term, two definitions: a single instrument stating a duty, then
              what its reporting scheme covers. Unlike the Rail page's panel
              there is no per-instrument grouping wrapper to add, because there
              is only one instrument to group. */}
          <dl className="mt-2">
            <dt className="body-copy font-semibold leading-snug text-foreground">
              {pick(citation.name, locale)}
            </dt>
            {/* ml-0 kills the UA's 40px indent. */}
            <dd
              data-balance-item
              className="ml-0 mt-1.5 body-copy leading-relaxed text-muted-foreground"
            >
              {pick(citation.duty, locale)}
            </dd>
            <dd
              data-balance-item
              className="ml-0 mt-4 border-t border-border pt-4 body-copy leading-relaxed text-muted-foreground"
            >
              {pick(citation.scope, locale)}
            </dd>
          </dl>
          {/* One instrument, one publisher, one URL — so the link sits under the
              panel as its footer. The Rail page does the opposite because it
              carries two instruments from two publishers, where a shared footer
              would misattribute one of them. */}
          <p
            data-balance-item
            className="mono-label mt-5 border-t border-border pt-4 text-primary-ink"
          >
            <a
              href={citation.href}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline"
            >
              {pick(citation.sourceLabel, locale)}
            </a>
          </p>
        </>
      }
    >
      {/* L114, the source's own lead-in. It sits with the pair rather than in
          the narrative pane because it ends in a colon and its sentence is only
          finished by the two panes beneath it. */}
      <p className="body-lead leading-relaxed text-muted-foreground">
        {pick(REALITY.claimLead, locale)}
      </p>

      {/* min-w-0 on the grid children: without it a track sizes to its longest
          unbreakable string and pushes the page sideways at 390px. */}
      <dl className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
        {REALITY.sides.map((side) => (
          <div key={side.id} className="min-w-0 border-t border-border pt-4">
            {/* Weight and rule, not colour: the evidence panel above holds this
                section's only accent. */}
            <dt className="mono-label text-foreground">{pick(side.label, locale)}</dt>
            {/* ml-0 kills the UA's 40px indent. */}
            <dd className="ml-0 mt-2 body-copy leading-relaxed text-muted-foreground">
              {pick(side.body, locale)}
            </dd>
          </div>
        ))}
      </dl>

      {/* Two tracks at `lg` only. Below it the twelve entries run as one
          full-width column, which is the same register read in a single pass —
          these clauses cannot survive a 390px half-track. Grid items stretch by
          default, so each row's opening rules line up across both tracks and the
          register reads as ruled rather than as two unrelated lists. */}
      <dl className="mt-12 grid min-w-0 lg:grid-cols-2 lg:gap-x-12">
        {REALITY.challenges.map((entry) => (
          <div key={entry.id} className="min-w-0 border-t border-border pb-5 pt-4">
            <dt className="body-copy font-semibold leading-snug text-foreground">
              {pick(entry.challenge, locale)}
            </dt>
            {/* ml-0 kills the UA's 40px indent. */}
            <dd className="ml-0 mt-2 body-copy leading-relaxed text-muted-foreground">
              {pick(entry.why, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </SectionB>
  );
}
