import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TwinExplorer } from "@/components/twin/TwinExplorer";
import { same } from "../registry";
import type { HyperscaleScenario } from "./content.scenarios";

/**
 * S07's DETAIL PANE — the selected scenario's pathway, drawn where the source
 * states a structure and written where it does not.
 *
 * ONE CALLER, `ScenarioRegister.tsx`, and it is still a separate file rather
 * than a nested function: the register holds twelve rows of selection and
 * keyboard logic and this pane holds the whole detail treatment, so keeping
 * them in one file would put two unrelated concerns under one 500-line cap for
 * no gain. `balanceGroup` is a prop for the same reason it is on the rail
 * page's pane — it is the one value that would differ if a second master/detail
 * section appeared, and a pane hard-coding another section's group is exactly
 * the bug the mark exists to catch.
 *
 * THE SPLIT — GRAPH ABOVE, CAPTIONS BELOW — IS THE DATA CONTRACT'S OWN. The
 * pathway's assets go into a real `TwinExplorer` topology (typed
 * `SystemAsset[]`/`SystemPath[]`, the shared industry-agnostic contract); the
 * hyperscale consequence and the Twin-supported decision render as TEXT
 * captions beneath it. A consequence is a separate field from
 * `SystemAsset`/`SystemPath` in `OXOT_content-to-visual-mapping-table.md`, so
 * forcing it into the node graph as a terminal node would draw an asset that
 * does not exist.
 *
 * `TwinExplorer` IS USED DIRECTLY, and that is a real difference from this
 * page's `HeroCascade.tsx` and `ScenarioModelCanvas.tsx` rather than an
 * inconsistency. Both of those need a readable first paint or a specific
 * authored motion, which `TwinExplorer` cannot give them — ELK lays out in a
 * `useEffect`, so an above-the-fold consumer would paint "Loading diagram…".
 * S07 is an ordinary below-the-fold body section with no first-paint
 * constraint, so the shared component is the right answer and hand-authored
 * geometry would be a second, weaker copy of it.
 *
 * SEVEN OF THE TWELVE SCENARIOS RENDER NO GRAPH AT ALL and say why in place of
 * one — see the `noGraphReason` rule in `content.scenarios.graphs.ts`. A
 * visible stated gap, which is this site's rule wherever the source does not
 * supply what a treatment needs. Every one of those seven still prints its
 * pathway, consequence and decision in full.
 *
 * TOKEN DISCIPLINE. Amber is spent on the CONSEQUENCE caption's rule and
 * nowhere else in this file, and it is a border, never text: the six signal
 * tokens clear WCAG 1.4.11's 3:1 non-text floor, which is their whole budget,
 * and would fail 1.4.3's 4.5:1 as text. It is the same token `HeroCascade.tsx`
 * spends on this page for the consequence end of a cascade, so the page reads
 * consistently. The decision caption takes a neutral border, because a decision
 * the Twin supports is a capability available, not a modelled state, and
 * spending a second signal token on it would drain the meaning out of the one
 * that carries it.
 */

const T = {
  pathwayLabel: same("Cyber / OT pathway"),
  consequenceLabel: same("Hyperscale consequence"),
  decisionLabel: same("Twin-supported decision"),
  noGraphLabel: same("No route drawn"),
  /* The claim boundary, printed rather than implied — the literal string
     `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data")
};

export function ScenarioTrace({
  scenario,
  balanceGroup,
  locale
}: {
  scenario: HyperscaleScenario;
  balanceGroup: string;
  locale: Locale;
}) {
  const graph = scenario.graph;

  return (
    /* THE MARK GOES ON THIS CONTENT WRAPPER, never on the grid cell holding it:
       measuring the cell would let a nearly-empty pane pass the ratio floor,
       because the cell sizes to the column rather than to what is in it. */
    <div data-balance-group={balanceGroup} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 data-balance-item className="text-lg font-medium leading-snug text-foreground">
          {pick(scenario.name, locale)}
        </h3>
        <p data-balance-item className="mono-label rounded-full border border-border px-2.5 py-1">
          {pick(T.claim, locale)}
        </p>
      </div>

      <div data-balance-item className="mt-5">
        <p className="mono-label text-primary-ink">{pick(T.pathwayLabel, locale)}</p>
        <p className="mt-2 body-copy leading-relaxed text-foreground">{pick(scenario.pathway, locale)}</p>
      </div>

      {graph ? (
        /* `data-gfx-meaning` opts the diagram into the harness's WCAG 1.4.11
           pass, which only checks graphics that opt in.

           `max-h` caps the SVG, which `TwinExplorer` sizes `h-auto w-full`. The
           two-node graphs in this register lay out short and wide and stay well
           under the cap; a four-node fan-out laid out tall would otherwise
           upscale to fill the column and strand empty pane against the register
           beside it. The SVG's default `preserveAspectRatio` scales down to
           meet the cap and centres it, so nothing distorts. The cap lives here
           and not in `TwinExplorer` — other pages consume that component too. */
        <div data-balance-item data-gfx-meaning className="mt-6 [&_svg]:max-h-[26rem]">
          <TwinExplorer
            assets={graph.assets}
            paths={graph.paths}
            locale={locale}
            title={pick(graph.diagramTitle, locale)}
          />
        </div>
      ) : (
        <div data-balance-item className="mt-6 rounded-xl border border-dashed border-border p-4">
          <p className="mono-label text-muted-foreground">{pick(T.noGraphLabel, locale)}</p>
          {scenario.noGraphReason && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pick(scenario.noGraphReason, locale)}
            </p>
          )}
        </div>
      )}

      {/* Columns three and four. Text, not nodes — see the docblock. */}
      <div data-balance-item className="mt-6 border-l-2 border-signal-amber pl-4">
        <p className="mono-label text-primary-ink">{pick(T.consequenceLabel, locale)}</p>
        <p className="mt-2 body-copy leading-relaxed text-foreground">{pick(scenario.consequence, locale)}</p>
      </div>

      <div data-balance-item className="mt-5 border-l-2 border-border pl-4">
        <p className="mono-label text-primary-ink">{pick(T.decisionLabel, locale)}</p>
        <p className="mt-2 body-copy leading-relaxed text-muted-foreground">
          {pick(scenario.decision, locale)}
        </p>
      </div>
    </div>
  );
}
