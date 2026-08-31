import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import {
  FREIGHT_CHAIN,
  FREIGHT_CITATION,
  FREIGHT_CLAIM_BOUNDARY,
  FREIGHT_CONTROLS,
  FREIGHT_EXAMPLE_SECTION,
  FREIGHT_RESULT,
  FREIGHT_SCENARIO,
  FREIGHT_STAGE_LABELS
} from "./content.workedExample.freight";
import { SectionA } from "./Rule";
import { ModelledChain, Stage } from "./WorkedExampleKit";

/**
 * S09 · WORKED USE CASE, US FREIGHT RAIL — header recipe H-A, body treatment: a
 * THREE-STAGE RUN, deliberately more compact than S08's five. Source L310–L345.
 *
 * HOW L312's "SEPARATE TAB OR LINKED PAGE" INSTRUCTION IS HONOURED. The source
 * says the freight version "should be a separate tab or linked page titled
 * 'Secure PTC and dispatching dependencies across the operating territory'".
 * That is answered here by giving freight its OWN numbered section — its own
 * block run, its own ordinal, its own h2 carrying exactly that title — rather
 * than by putting it behind a tab beside the passenger example. A tab would
 * make freight the passenger example's alternate STATE: one panel, two
 * contents, only ever one visible. That is precisely "a paragraph under
 * passenger rail" (L169) with a control bolted on, and the page's own structure
 * diagram (L451–L452) already lists the two as consecutive entries rather than
 * as one entry with a switch. The instruction asks for freight to be
 * independently addressable and independently titled; a section with its own id
 * (`#worked-example-freight`) and its own heading is both, on a page that has
 * no route of its own to split into yet.
 *
 * AND THE SEGMENT TOGGLE IS NOT REUSED HERE, THOUGH THE PAGE HAS ONE.
 * `SegmentSelector.tsx` drives S00's hero model and S03's architecture stack,
 * where the SAME artifact is drawn twice with different contents — which is
 * what a toggle is for. These are not one artifact drawn twice: S08 has an
 * evidence list and a controls matrix that this section's source simply does
 * not have. Putting two differently-shaped bodies behind one switch would make
 * the control's meaning inconsistent with the two places it already means
 * something specific.
 *
 * THIS SECTION IS SHORTER THAN S08 BECAUSE THE SOURCE IS. Freight gets no
 * `### Section headline`, no "Inputs to the Twin" block and no controls matrix
 * — its candidate controls are six flat sentences (L336–L341) with no
 * per-control "what the Twin tests" or "decision insight". The three missing
 * stages are NOT reconstructed to make the two sections set symmetrically; that
 * would be inventing the brief's own analysis under the brief's name. The
 * asymmetry is argued at length in `content.workedExample.freight.ts`.
 *
 * WHAT THIS SECTION HAS THAT S08 DOES NOT, and why it therefore needs no
 * borrowed mechanism to feel substantial: a stated closing RESULT (L343) and a
 * live outside CITATION (L345). Those are the section's own ending, and they
 * are the reason its accent budget differs from S08's — see TOKENS below.
 *
 * SHARED WITH S08, ON PURPOSE: `Stage` and `ModelledChain`. The chain is the
 * one artifact both worked examples genuinely have in common, and drawing it
 * two different ways would be variation with nothing under it. Everything else
 * about the two sections differs, because their sources differ.
 *
 * NO `data-balance-group`. No two-pane split exists in this section at any
 * breakpoint — it is one full-width column run — so there is no pair of
 * siblings whose heights could fall out of proportion and nothing for a floor
 * to protect. Same reasoning `FreightScenarios.tsx` and S08 both record.
 *
 * TOKENS. The one accent is `--primary-ink`, spent once, on the tsa.gov
 * citation link — the section's single outbound ask, and the same treatment
 * `SectorReality.tsx` gives its two citations, so a source link looks like a
 * source link wherever it appears on this page. S08 spends its accent on the
 * controls table's column heads instead, because S08 has a table and no
 * citation; neither section wears the brand colour twice. The single
 * `--signal-*` token is the amber outline on the chain's terminal step, argued
 * in `WorkedExampleKit.tsx`.
 */
export function WorkedExampleFreight({ locale }: { locale: Locale }) {
  return (
    <SectionA
      id={FREIGHT_EXAMPLE_SECTION.id}
      index={FREIGHT_EXAMPLE_SECTION.index}
      datumLabel={FREIGHT_EXAMPLE_SECTION.datumLabel}
      heading={FREIGHT_EXAMPLE_SECTION.heading}
      locale={locale}
    >
      {/* Same claim-boundary pill S08 and `ScenarioTrace.tsx` carry. Why it is
          applied here when the source states it only under the passenger
          example is argued in `content.workedExample.freight.ts`. */}
      <p className="mono-label inline-block rounded-full border border-border px-2.5 py-1 text-muted-foreground">
        {pick(FREIGHT_CLAIM_BOUNDARY, locale)}
      </p>

      <div className="mt-8 min-w-0">
        <Stage first label={FREIGHT_STAGE_LABELS.scenario} locale={locale}>
          {FREIGHT_SCENARIO.map((paragraph, i) => (
            <p
              key={i}
              className={`body-lead leading-relaxed text-muted-foreground${i > 0 ? " mt-5" : ""}`}
            >
              {pick(paragraph, locale)}
            </p>
          ))}
        </Stage>

        <Stage label={FREIGHT_STAGE_LABELS.chain} locale={locale}>
          <ModelledChain steps={FREIGHT_CHAIN} locale={locale} />
        </Stage>

        <Stage label={FREIGHT_STAGE_LABELS.controls} locale={locale}>
          {/* Six peers, set as a plain run separated by dashed rules — this
              page's own item grammar. NOT six cards: `OXOT_Visual_Rules.md` L13
              caps visually-equal cards at three, and six filled tiles would
              additionally assert these are six independent offers rather than
              six candidates for one territory decision. NOT ordinals either:
              `ModelledChain` numbers its steps because a chain has an order,
              and the source gives this list none. */}
          <ul className="min-w-0 list-none">
            {FREIGHT_CONTROLS.map((control, i) => (
              <li
                key={i}
                className={`prose-measure body-copy leading-relaxed text-foreground${
                  i > 0 ? " mt-3 border-t border-dashed border-border pt-3" : ""
                }`}
              >
                {pick(control, locale)}
              </li>
            ))}
          </ul>

          {/* L343 closes the list rather than opening a stage of its own: the
              source writes it as the paragraph directly under the bullets, and
              it is what the six add up to. Framed the way S08 frames its result
              message, so the page's two worked examples end the same way. */}
          <blockquote className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
            <p className="body-lead leading-relaxed text-foreground">
              {pick(FREIGHT_RESULT, locale)}
            </p>
          </blockquote>

          {/* L345. Sits below the result because it is the outside instrument
              the whole freight picture is bounded by, not evidence for any one
              control above it. The link rides at the end of its own sentence
              for the same reason `SectorReality.tsx` keeps each citation inside
              the claim it supports rather than in a shared footer. */}
          <p className="mt-8 body-copy leading-relaxed text-muted-foreground">
            {pick(FREIGHT_CITATION.text, locale)}
            <a
              href={FREIGHT_CITATION.href}
              target="_blank"
              rel="noreferrer"
              className="mono-label mt-3 block text-primary-ink underline-offset-4 hover:underline focus-visible:underline"
            >
              {pick(FREIGHT_CITATION.sourceLabel, locale)}
            </a>
          </p>
        </Stage>
      </div>
    </SectionA>
  );
}
