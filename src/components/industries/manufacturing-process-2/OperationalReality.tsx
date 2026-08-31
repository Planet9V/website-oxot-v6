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
 * load-bearing claim IS an external citation — IEC 62443 for IACS-specific
 * constraints and IEC 61511 for safety-instrumented systems, cited together at
 * source L87 — and no other section of `industry_manu-process.md` stands on an
 * outside instrument that way. The test is falsifiable: any other section with
 * that shape would take H-B too, and none has it.
 *
 * THE CITED SENTENCE IS RENDERED ONCE, IN THE PANEL. L87's first sentence is
 * narrative and stays in the 7-col; its second sentence carries the citation
 * marker and is rendered ONLY as the panel's two instrument rows. The
 * alternative — prose in the narrative with the panel restating it — would
 * print this page's single cited claim twice and leave the panel summarising
 * itself. See content.reality.ts for the clause-level split.
 *
 * THE SECTION'S ONE FOCAL ELEMENT (OXOT_Visual_Rules.md L3) IS THE EVIDENCE
 * PANEL: the only bordered, filled surface here, and the only place brand
 * orange appears. The concerns list below it is the secondary explanatory
 * layer and is deliberately quiet — including its column headers, which are
 * muted rather than accented. A second orange on a pair of column labels would
 * be the competing-accent case OXOT_Visual_Rules.md L14 names, and it would
 * spend the section's one accent on the layer that matters least.
 *
 * THE EIGHT CONCERNS ARE AN ANNOTATED `<dl>`, NOT EIGHT CARDS. The brief's own
 * heading at L89 says "use as cards". That suggestion is overridden by
 * OXOT_Visual_Rules.md L13, which bars more than three visually-equal cards in
 * a section and is site-wide and binding. This is a known, approved deviation
 * from the brief, not an oversight — do not "restore" the cards.
 *   · The source shape is a two-column matrix (L91: Concern | Why it matters to
 *     the buyer), and term-plus-definition is exactly what a `<dl>` is for.
 *   · The markup convention is the one already established on this site — a
 *     term rail beside the clause, dashed row rules at `lg` only
 *     (water-wastewater-2's TechnologyIndex.tsx, itself following
 *     resources/glossary). Structure borrowed; nothing else.
 *   · A `<table>` was the other candidate and is NOT used: this page's own S08
 *     renders a genuine reference matrix, and spending S01 on a second table
 *     would make the page's two most different sections look alike.
 *
 * NO ORDINALS ON THE ROWS. The source prints these eight concerns twice
 * (L64–L73 and L93–L100) and orders them identically both times, but never
 * ranks, scores or groups them. A printed 01–08 rail would read as a priority
 * order the brief does not state, so the rows carry no index at all.
 *
 * SIBLING BALANCE, `data-balance-group="reality-head"`, floor 0.5 (the
 * site-wide 2x floor; `scripts/measure.mjs` takes the WORSE of height ratio and
 * marked-element count). Both panes are fixed BY INFORMATION, not by filler:
 *   · NARRATIVE — 3 marked paragraphs: L85's two sentences and L87's first,
 *     split at the source's own sentence boundaries.
 *   · EVIDENCE — 3 marked elements: the IEC 62443 row, the IEC 61511 row, and
 *     the source link. Every one is transcribed from L87. Nothing was added to
 *     this panel to make a count pass.
 * Count ratio 3/3, so rendered height is the governing measure. The marks sit
 * on the inner content, never on the stretched grid cell.
 *
 * NO INVENTED ENGINEERING FACT. The panel names two standards and states what
 * the source says each one does. It supplies no published title, edition, part
 * number or date, and tells no reader whether they are in scope.
 */

/** Shared by the aria-hidden column header and the `<dl>` beneath it, so the
 *  two line up on ONE track definition rather than two kept in step by hand.
 *  The rail is narrower than the Energy page's because these terms are short —
 *  "Brownfield complexity" is the longest of the eight. */
const CONCERN_GRID = "lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-x-10";

export function OperationalReality({ locale }: { locale: Locale }) {
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
          {/* A `<div>` wrapping each dt/dd pair is valid inside `<dl>` (HTML5
              grouping), and it is what carries the balance mark: marking the
              dt and the dd separately would count one instrument twice. */}
          <dl>
            {citation.instruments.map((instrument, i) => (
              <div
                key={instrument.name.en}
                data-balance-item
                className={i > 0 ? "mt-4 border-t border-border pt-4" : undefined}
              >
                {/* Not orange. The source link below is this panel's one
                    accent; the instrument names are the panel's subject and
                    carry weight instead of colour. */}
                <dt className="body-copy font-semibold leading-snug text-foreground">
                  {pick(instrument.name, locale)}
                </dt>
                {/* ml-0 kills the UA's 40px indent. */}
                <dd className="ml-0 mt-1.5 body-copy leading-relaxed text-muted-foreground">
                  {pick(instrument.role, locale)}
                </dd>
              </div>
            ))}
          </dl>

          <p data-balance-item className="mono-label mt-5 border-t border-border pt-4 text-primary-ink">
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
      {/* The source's own column headers (L91), shown at `lg` where the list
          actually has two columns to head. `aria-hidden`: a `<dl>` has no
          header semantics for these to attach to, so a screen reader would
          otherwise meet two loose phrases before the pairs — and dt/dd already
          announce the relationship these labels draw visually. */}
      <div aria-hidden="true" className={`mono-label hidden text-muted-foreground lg:grid ${CONCERN_GRID}`}>
        <span>{pick(REALITY.concernLabel, locale)}</span>
        <span>{pick(REALITY.whyLabel, locale)}</span>
      </div>

      {/* min-w-0 on the grid child: without it the track sizes to the longest
          unbreakable term and pushes the page sideways at 390px. */}
      <dl className={`mt-3 grid min-w-0 ${CONCERN_GRID}`}>
        {REALITY.concerns.map((concern) => (
          <Fragment key={concern.name.en}>
            <dt className="border-t border-dashed border-border pt-3 body-copy font-semibold leading-snug text-foreground">
              {pick(concern.name, locale)}
            </dt>
            {/* ml-0 kills the UA's 40px indent. The row rule is at `lg` only,
                where dt and dd share it — stacked, a rule between a term and
                its own definition would read as a break between two rows. The
                measure cap is on a clause that has a dt beside it in a real
                two-track grid, so it is a reading width INSIDE a column, not
                the orphaned-narrow-text defect measure.mjs checks for. */}
            <dd className="ml-0 mt-1 max-w-[72ch] pb-3 body-copy leading-relaxed text-muted-foreground lg:mt-0 lg:border-t lg:border-dashed lg:border-border lg:pb-3 lg:pt-3">
              {pick(concern.whyItMatters, locale)}
            </dd>
          </Fragment>
        ))}
      </dl>
    </SectionB>
  );
}
