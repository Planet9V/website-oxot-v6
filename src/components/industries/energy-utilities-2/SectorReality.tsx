import { Fragment } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { REALITY } from "./content.reality";
import { SectionB } from "./Rule";

/**
 * S01 · OPERATIONAL REALITY — header recipe H-B, and the only section on this
 * page that takes it.
 *
 * WHY H-B HERE AND NOWHERE ELSE. H-B puts the section's prose in a 7-col beside
 * a cited-evidence panel in a 5-col. It belongs here because this section's
 * load-bearing claim IS an external cited instrument — the EU Electricity
 * Cybersecurity Network Code, Commission Delegated Regulation (EU) 2024/1366,
 * cited at source L74 — and no other section of `industry_energy.md` stands on
 * an outside instrument that way. That test is falsifiable: any other section
 * with that shape would get H-B too, and none has it.
 *
 * THE SECTION'S ONE FOCAL ELEMENT (OXOT_Visual_Rules.md L3) IS THE EVIDENCE
 * PANEL. It is the only bordered, filled surface in the section, and the only
 * place brand orange carries a link. Everything below it — the nine concerns —
 * is the secondary explanatory layer, and is deliberately quiet.
 *
 * THE NINE CONCERNS ARE AN ANNOTATED `<dl>`, NOT NINE CARDS. The brief's own
 * heading at L76 says "use as cards". That suggestion is overridden by
 * OXOT_Visual_Rules.md L13, which bars more than three visually-equal cards in
 * a section and is site-wide and binding. This is a known, approved deviation
 * from the brief, not an oversight — do not "restore" the cards.
 *   · The source shape is a two-column matrix (L78: Concern | Why it matters),
 *     and term-plus-definition is what a `<dl>` is for. The markup convention
 *     is the one already established on this site — a term rail beside the
 *     clause, dashed row rules at `lg` only (water-wastewater-2's
 *     TechnologyIndex.tsx, itself following resources/glossary).
 *   · A `<table>` was the other candidate and is NOT used, for a page-level
 *     reason: this page's own S08 renders a genuine reference matrix, and
 *     water-wastewater-2 already spends its S01 on a ten-row table. Reaching
 *     for the same treatment a third time is the repeated-template failure the
 *     owner's standing rule names.
 *
 * SIBLING BALANCE, `data-balance-group="reality-head"`, floor 0.5 (the
 * site-wide 2x floor; `scripts/measure.mjs` takes the WORSE of height ratio and
 * marked-element count). Both panes are fixed BY INFORMATION rather than by
 * filler:
 *   · NARRATIVE — 4 marked paragraphs. Source L70 and L72 are two paragraphs of
 *     two sentences each; they render as four at the source's own sentence
 *     boundaries, which is a rendering split, not added copy.
 *   · EVIDENCE — 4 marked elements: source link, instrument + designation,
 *     status, finding. Every one is transcribed from L74/L277. Nothing was
 *     added to this panel to make a number pass.
 * Count ratio 4/4, so height is the governing measure here. The marks sit on
 * the inner content, never on the stretched grid cell.
 *
 * NO INVENTED ENGINEERING OR LEGAL FACT. The panel names the regulation, says
 * it is binding, and quotes what it requires — it does not tell a reader
 * whether they are in scope, does not date it, and adds no "what this means for
 * you" gloss. The nine ordinals are list positions in the source table and
 * carry no ranking; see content.reality.ts's closing note.
 */

/** Shared by the aria-hidden column header and the `<dl>` beneath it, so the
 *  two line up on ONE track definition rather than two kept in step by hand. */
const CONCERN_GRID = "lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-12";

export function SectorReality({ locale }: { locale: Locale }) {
  const { citation } = REALITY;

  return (
    <SectionB
      id="operational-reality"
      index="01"
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
          <p data-balance-item className="mono-label text-primary-ink">
            <a
              href={citation.href}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline"
            >
              {pick(citation.sourceLabel, locale)}
            </a>
          </p>

          {/* Instrument above its formal designation: the name a reader
              recognises, then the reference they would search on. */}
          <p data-balance-item className="mt-3 body-copy font-semibold leading-snug text-foreground">
            {pick(citation.instrument, locale)}
            <span className="mt-1 block font-normal text-muted-foreground">
              {pick(citation.designation, locale)}
            </span>
          </p>

          {/* Not orange. The source link above is this panel's one accent, and a
              second one here would be the competing-accent case
              OXOT_Visual_Rules.md L14 names. */}
          <p data-balance-item className="mono-label mt-4 text-muted-foreground">
            {pick(citation.status, locale)}
          </p>

          <p
            data-balance-item
            className="mt-3 border-t border-border pt-4 body-copy leading-relaxed text-foreground"
          >
            {pick(citation.finding, locale)}
          </p>
        </>
      }
    >
      {/* The source's own column headers (L78), shown at `lg` where the list
          actually has two columns to head. `aria-hidden`: a `<dl>` has no header
          semantics for these to attach to, so a screen reader would otherwise
          meet two loose words before the pairs — and dt/dd already announce the
          relationship these labels draw visually. */}
      <div aria-hidden="true" className={`mono-label hidden text-primary-ink lg:grid ${CONCERN_GRID}`}>
        <span>{pick(REALITY.concernLabel, locale)}</span>
        <span className="text-muted-foreground">{pick(REALITY.whyLabel, locale)}</span>
      </div>

      {/* min-w-0 on the grid child: without it the track sizes to the longest
          unbreakable term and pushes the page sideways at 390px. */}
      <dl className={`mt-3 grid min-w-0 ${CONCERN_GRID}`}>
        {REALITY.concerns.map((concern, i) => (
          <Fragment key={concern.name.en}>
            <dt className="flex items-baseline gap-3 border-t border-dashed border-border pt-3 body-copy font-semibold leading-snug text-foreground">
              {/* List position, not a priority rank — see content.reality.ts. */}
              <span aria-hidden="true" className="mono-label shrink-0 text-primary-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">{pick(concern.name, locale)}</span>
            </dt>
            {/* ml-0 kills the UA's 40px indent. The row rule is at `lg` only,
                where dt and dd share it — stacked, a rule between a term and its
                own definition would read as a break between two rows. The
                measure cap is on a clause that has dt beside it in a real
                two-track grid, so it is a reading width INSIDE a column, not the
                orphaned-narrow-text defect measure.mjs checks for. */}
            <dd className="ml-0 mt-1 max-w-[70ch] pb-3 body-copy leading-relaxed text-muted-foreground lg:mt-0 lg:border-t lg:border-dashed lg:border-border lg:pb-3 lg:pt-3">
              {pick(concern.whyItMatters, locale)}
            </dd>
          </Fragment>
        ))}
      </dl>
    </SectionB>
  );
}
