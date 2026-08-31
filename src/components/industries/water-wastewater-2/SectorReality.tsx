import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "../registry";
import { StaticTable } from "@/components/ui/static-table";
import { CISA_URL, SECTOR_REALITY } from "./content";
import { SectionB } from "./Rule";

/**
 * S01 · SECTOR REALITY — header recipe H-B, and the only section on the page
 * that gets it. H-B puts the h2 in a 7-col beside a cited-evidence panel in a
 * 5-col, and it belongs here because this section's load-bearing claim IS an
 * external cited finding: the CISA advisory. That is falsifiable — any other
 * section on this page with that shape would get H-B too, and none has it.
 *
 * THE SIBLING-BALANCE FLOOR, AND THE RULE'S OWN INSTRUCTION DEMONSTRATED.
 * `data-balance-group="sector-reality-head"` marks both inner wrappers, and the
 * governing threshold is the site-wide 2x floor: shorter ≥ 50% of taller.
 *
 *   · WITHOUT the CISA remedies the evidence panel is a source label and a
 *     four-line finding — roughly 150px against the measured 510px of
 *     narrative, which is 0.29 and a clear FAIL.
 *   · WITH them (source L184's five concrete recommendations, from the SAME
 *     advisory and the same URL as the finding they sit beside) the harness
 *     reads narrative 510px · evidence 359px · h = 0.70, at both 1440×900 and
 *     2560×1440.
 *
 * That is the fix the rule actually asks for: fixed BY INFORMATION, not by
 * filler and not by `items-stretch`. `-1` had those five recommendations
 * nowhere near here — it buried them as a trailing note under its scenarios
 * section, where nothing needed the height.
 *
 * SECOND MEASURE — CONTENT-ELEMENT COUNT, worse governs. Narrative pane: h2 +
 * four paragraphs = 5. Evidence panel: source label + finding + remedies label
 * + five remedies = 8. 5/8 = 0.63, measured, and it is the governing measure
 * here — worse than the 0.70 height ratio, and still comfortably over 0.50.
 *
 * THE TEN ROWS ARE A REAL `<table>`, not ten cards and not a numbered list. The
 * source is literally a two-column matrix (Challenge | Why it is different in
 * water and wastewater), and rendering a matrix as a matrix is correct rather
 * than a dodge. Ten visually equal cards would break the Visual Rules cap on
 * more than three, and a mono-indexed list would be `-1`'s repeated motif
 * arriving a sixth time.
 */
export function SectorReality({ locale }: { locale: Locale }) {
  return (
    <SectionB
      id="sector-reality"
      index="01"
      datumLabel={same("Sector reality")}
      heading={SECTOR_REALITY.h2}
      balanceGroup="sector-reality-head"
      locale={locale}
      narrative={
        <div className="space-y-4">
          {SECTOR_REALITY.narrative.map((paragraph, i) => (
            <p key={i} data-balance-item className="prose-measure body-lead leading-relaxed text-muted-foreground">
              {pick(paragraph, locale)}
            </p>
          ))}
        </div>
      }
      evidence={
        <>
          <p data-balance-item className="mono-label text-primary-ink">
            <a
              href={CISA_URL}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline"
            >
              {pick(SECTOR_REALITY.sourceLabel, locale)}
            </a>
          </p>
          <p data-balance-item className="prose-measure mt-3 body-copy leading-relaxed text-foreground">
            {pick(SECTOR_REALITY.finding, locale)}
          </p>

          <p data-balance-item className="mono-label mt-6">
            {pick(SECTOR_REALITY.remediesLabel, locale)}
          </p>
          <ul className="mt-3 space-y-2">
            {SECTOR_REALITY.remedies.map((remedy, i) => (
              <li
                key={i}
                data-balance-item
                className="border-l-2 border-border pl-3 body-copy leading-relaxed text-muted-foreground"
              >
                {pick(remedy, locale)}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <p className="mono-label text-primary-ink">{pick(SECTOR_REALITY.tableCaption, locale)}</p>
      {/* A numbered brand-orange index badge per row (added 2026-08-25, real
          color, not decoration for its own sake) — this stays a real
          `<table>`, per this file's own docblock reasoning above; only the
          first cell's CONTENT changes, via `StaticTable`'s existing
          `ReactNode` cell support, not the shared component itself. One
          consistent brand accent, not a different colour per row — the six
          `--signal-*` tokens mean model state, and none of these ten rows
          differ in state from each other. */}
      <StaticTable
        className="mt-4"
        minWidth="46rem"
        head={[pick(SECTOR_REALITY.tableHead.challenge, locale), pick(SECTOR_REALITY.tableHead.why, locale)]}
        rows={SECTOR_REALITY.challenges.map((row, i) => [
          <span key="term" className="flex items-baseline gap-2.5">
            <span aria-hidden="true" className="mono-label shrink-0 text-primary-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{pick(row.term, locale)}</span>
          </span>,
          pick(row.body, locale)
        ])}
      />
    </SectionB>
  );
}
