import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { StaticTable } from "@/components/ui/static-table";
import { same } from "../registry";
import {
  CONTROL_FIELD_LABELS,
  PASSENGER_CHAIN,
  PASSENGER_CLAIM_BOUNDARY,
  PASSENGER_CONTROLS,
  PASSENGER_CONTROLS_CAPTION,
  PASSENGER_EXAMPLE_SECTION,
  PASSENGER_INPUTS,
  PASSENGER_RESULT,
  PASSENGER_SCENARIO,
  STAGE_LABELS
} from "./content.workedExample.passenger";
import { SectionA } from "./Rule";
import { ModelledChain, Stage } from "./WorkedExampleKit";

/**
 * S08 · WORKED USE CASE, PASSENGER TRANSIT — header recipe H-A, body treatment:
 * a FIVE-STAGE RUN, in the source's own order. Source L241–L308.
 *
 * H-A, PER `Rule.tsx`'s OWN ASSIGNMENT: its docblock files "both worked
 * examples (passenger signalling-vendor access and freight PTC/dispatch)" under
 * `SectionA`, because both bodies are diagrams and matrices rather than a claim
 * standing on an outside instrument (H-B) or a reference matrix needing a
 * column caption (H-C). This section cites nothing and its table's columns name
 * themselves, so neither of the other two recipes has anything to do here.
 *
 * THE FIVE STAGES ARE THE SOURCE'S OWN `###` HEADINGS AND ITS OWN ORDER —
 * Scenario, Inputs to the Twin, Modelled chain, Controls tested, Result message
 * — not a machine invented to make the section look like a process. Read down,
 * they already are one: what evidence goes in, what the model traces, what is
 * tested against the trace, what comes out. Reordering them or collapsing two
 * would break an argument the brief has already sequenced.
 *
 * NOT A THREE-GATE LEDGER, WHICH IS THE NEAREST TEMPTATION. The energy page
 * builds its worked example as an interactive: pick a candidate control, watch
 * an SVG attack-path canvas repaint each route's state. That mechanism fits
 * THERE — a forking topology, and five candidates whose whole point is what
 * each one closes. It is a bad fit here for two independent reasons. The chain
 * does not fork (argued in `WorkedExampleKit.tsx`). And this source's third
 * column is "Decision insight", not a route state: L300's insight is that
 * eliminating vendor access "may reduce cyber exposure while increasing
 * operational recovery risk", which is a trade-off a reader compares ACROSS
 * candidates rather than a change to a picture. Hiding four of five insights
 * behind a selection would remove the comparison the column exists to support.
 *
 * A REAL `<table>` FOR THE CONTROLS, VIA `ui/static-table.tsx`. The source is a
 * genuine five-row, three-column matrix and every cell is prose; there is no
 * column anyone would sort by, so `ui/data-table.tsx`'s sort/filter bar would
 * offer an interaction answering no question. `SegmentComparison.tsx` made the
 * same call for S02 and states the rule a wide table must meet on this page — a
 * VISIBLE scroll affordance and an ALTERNATE SUMMARY, both `lg:hidden`. Both
 * are below. The alternate is lifted from the table's own first column rather
 * than paraphrased, so it cannot drift from the matrix and adds no claim of its
 * own; it names the five options, and the two prose columns are what the scroll
 * is for.
 *
 * NO `data-balance-group` ANYWHERE IN THIS SECTION. Sibling balance exists to
 * stop one pane of a TWO-PANE SPLIT sitting nearly empty beside a full one, and
 * `scripts/measure.mjs` compares marked siblings within a group. This section
 * is a single full-width column run with no split at any breakpoint. The three
 * evidence groups are the only side-by-side thing on it, and their lengths are
 * unequal BY THE SOURCE — six items, then five, then four (L259–L277) — so
 * marking them would report the brief's own distribution as a layout defect,
 * and the only way to pass would be filler. `FreightScenarios.tsx` records the
 * same reasoning for the same reason.
 *
 * TOKENS. The one accent in this section is `--primary-ink`, and it is spent
 * where `StaticTable` already spends it: the controls table's column heads.
 * Stage labels, the claim-boundary pill and the evidence-group labels are all
 * neutral, so the table stays the one thing wearing the brand colour. The
 * single `--signal-*` token on the section is the amber outline on the chain's
 * terminal step, argued in `WorkedExampleKit.tsx`; nothing else here touches a
 * signal.
 */

const T = {
  /** Same wording pattern as `COMPARISON.scrollAffordance` (S02): a stated
   *  line, not a fade or an icon — a gradient edge is invisible to anyone who
   *  has already scrolled and says nothing at all to a screen reader. */
  scrollAffordance: same("The full three-column table scrolls sideways."),
  /** Names what the small-screen list is, so it does not read as the table. */
  summaryLabel: same("The five candidates, in short")
};

export function WorkedExamplePassenger({ locale }: { locale: Locale }) {
  const head = [
    pick(CONTROL_FIELD_LABELS.candidate, locale),
    pick(CONTROL_FIELD_LABELS.tests, locale),
    pick(CONTROL_FIELD_LABELS.insight, locale)
  ];

  const rows = PASSENGER_CONTROLS.map((control) => [
    pick(control.candidate, locale),
    pick(control.tests, locale),
    pick(control.insight, locale)
  ]);

  return (
    <SectionA
      id={PASSENGER_EXAMPLE_SECTION.id}
      index={PASSENGER_EXAMPLE_SECTION.index}
      datumLabel={PASSENGER_EXAMPLE_SECTION.datumLabel}
      heading={PASSENGER_EXAMPLE_SECTION.heading}
      locale={locale}
    >
      {/* The claim boundary sits directly under the heading and is never
          conditional on anything — the guardrail `OXOT_Layout_Styles.md`
          Pattern 2 binds to illustrative Twin scenarios. Same pill treatment
          `ScenarioTrace.tsx` uses for S05's, so the page states its boundary
          one way. */}
      <p className="mono-label inline-block rounded-full border border-border px-2.5 py-1 text-muted-foreground">
        {pick(PASSENGER_CLAIM_BOUNDARY, locale)}
      </p>

      <div className="mt-8 min-w-0">
        <Stage first label={STAGE_LABELS.scenario} locale={locale}>
          {PASSENGER_SCENARIO.map((paragraph, i) => (
            <p
              key={i}
              className={`body-lead leading-relaxed text-muted-foreground${i > 0 ? " mt-5" : ""}`}
            >
              {pick(paragraph, locale)}
            </p>
          ))}
        </Stage>

        <Stage label={STAGE_LABELS.inputs} locale={locale}>
          {/* Three tracks at lg, stacked below it. min-w-0 throughout: without
              it a track sizes to its longest unbreakable word and pushes the
              page sideways at 390px. */}
          <div className="grid min-w-0 gap-x-10 gap-y-8 lg:grid-cols-3">
            {PASSENGER_INPUTS.map((group) => (
              <div key={group.id} className="min-w-0 border-t border-border pt-4">
                <p className="mono-label text-muted-foreground">{pick(group.name, locale)}</p>
                {/* Dashed between items, solid above the group: this page's own
                    rule grammar, the same one `FreightScenarios.tsx` uses for
                    scenarios inside a band. */}
                <ul className="mt-3 min-w-0 list-none">
                  {group.items.map((item, i) => (
                    <li
                      key={i}
                      className={`min-w-0 body-copy leading-relaxed text-foreground${
                        i > 0 ? " mt-2 border-t border-dashed border-border pt-2" : ""
                      }`}
                    >
                      {pick(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Stage>

        <Stage label={STAGE_LABELS.chain} locale={locale}>
          <ModelledChain steps={PASSENGER_CHAIN} locale={locale} />
        </Stage>

        <Stage label={STAGE_LABELS.controls} locale={locale}>
          {/* The alternate summary, readable with no horizontal scrolling at
              all. Lifted from the table's own first column, so it cannot drift
              from the matrix. */}
          <div className="lg:hidden">
            <p className="mono-label text-muted-foreground">{pick(T.summaryLabel, locale)}</p>
            <ul className="mt-3 min-w-0 list-none">
              {PASSENGER_CONTROLS.map((control, i) => (
                <li
                  key={control.id}
                  className={`min-w-0 body-copy font-semibold leading-snug text-foreground${
                    i > 0 ? " mt-2 border-t border-dashed border-border pt-2" : ""
                  }`}
                >
                  {pick(control.candidate, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* The affordance sits immediately above the thing it describes, and
              is real text rather than an icon so it is announced as well as
              seen. */}
          <p className="mono-label mt-8 text-muted-foreground lg:hidden">
            {pick(T.scrollAffordance, locale)}
          </p>

          <StaticTable
            className="mt-4 lg:mt-0"
            head={head}
            rows={rows}
            caption={pick(PASSENGER_CONTROLS_CAPTION, locale)}
            /* Two of the three columns are full sentences. Below this the
               matrix crushes to three or four words a line and stops being
               readable across, which is the only thing a matrix is for. */
            minWidth="50rem"
          />
        </Stage>

        <Stage label={STAGE_LABELS.result} locale={locale}>
          {/* A real `<blockquote>`: the source writes L308 as one, and it is the
              section's answer rather than another stage of working. The framed
              panel is `SectionB`'s evidence-panel treatment reused, so the page
              has one way of setting a block apart rather than two. */}
          <blockquote className="rounded-2xl border border-border bg-muted/40 p-6">
            <p className="body-lead leading-relaxed text-foreground">
              {pick(PASSENGER_RESULT, locale)}
            </p>
          </blockquote>
        </Stage>
      </div>
    </SectionA>
  );
}
