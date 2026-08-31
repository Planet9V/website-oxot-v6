import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TwinExplorer } from "@/components/twin/TwinExplorer";
import { same } from "../registry";
import type { ManufacturingScenario } from "./content.scenarios";

/**
 * S04's DETAIL PANE — the selected scenario's chain, drawn.
 *
 * THE STAGES THAT ARE ASSETS GO INTO A REAL `TwinExplorer` TOPOLOGY (typed
 * `SystemAsset[]`/`SystemPath[]`, the shared industry-agnostic contract), and
 * the stages that are NOT assets — the process consequence and the candidate
 * decision — render as text captions beneath the graph. The split is the one
 * `content.scenarios.ts` records against the source's own column boundaries: a
 * consequence is a separate field from `SystemAsset`/`SystemPath` in the real
 * data contract (`OXOT_content-to-visual-mapping-table.md`), so forcing "trip"
 * or "off-spec product" into the node graph as a terminal node would draw an
 * asset that does not exist.
 *
 * `TwinExplorer` IS USED DIRECTLY HERE, and that is a real difference from this
 * page's `ProcessLineCanvas.tsx`, not an inconsistency. `ProcessLineCanvas` is
 * the hero's canvas and needs a readable first paint, which `TwinExplorer`
 * cannot give it — ELK lays out in a `useEffect`, so the hero would paint
 * "Loading diagram…" above the fold. S04 is a normal below-the-fold body
 * section with no first-paint constraint, so the shared component is the right
 * answer and hand-authored geometry would be a second, weaker copy of it.
 *
 * THE TERMINAL-TEXT CONVENTION IS THIS PAGE'S OWN. `ProcessLineCanvas.tsx`
 * marks the consequence with AMBER as an OUTLINE and keeps every word in a
 * foreground colour; both rules are honoured below. Amber is a border only —
 * the signal tokens clear WCAG 1.4.11's 3:1 non-text floor, which is their
 * whole budget, and would fail 1.4.3's 4.5:1 as text. The decision caption
 * takes a neutral border: a decision the Twin supports is a capability
 * available, not a modelled state, and spending a signal token on it would
 * drain the meaning out of the one that carries it.
 *
 * FOUR SCENARIOS RENDER NO GRAPH AT ALL and say why in place of it — see
 * `noGraphReason` in `content.scenarios.ts`. A visible stated gap, which is
 * this site's rule wherever the spec does not supply what a treatment needs.
 */

const T = {
  /** Source L149's own column headers, verbatim. */
  pathwayLabel: same("Example pathway"),
  consequenceLabel: same("Potential process consequence"),
  decisionLabel: same("Candidate decision"),
  noGraphLabel: same("No route drawn"),
  /* The claim boundary, printed rather than implied — the same literal
     `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios, and the same
     one `ProcessLineCanvas.tsx` prints on this page's hero. */
  claim: same("Illustrative scenario — no customer data")
};

export function ScenarioTrace({ scenario, locale }: { scenario: ManufacturingScenario; locale: Locale }) {
  const hasGraph = scenario.assets.length > 0;

  return (
    /* THE MARK GOES ON THIS CONTENT WRAPPER, never on the grid cell holding it:
       marking the cell would measure the column rather than the pane, and let a
       nearly-empty pane pass the ratio floor on its neighbour's height. */
    <div data-balance-group="scenario-register" className="rounded-2xl border border-border bg-card p-5 sm:p-6">
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

      {hasGraph ? (
        /* `data-gfx-meaning` opts the diagram into the harness's WCAG 1.4.11
           pass, which only checks graphics that opt in.

           `max-h` caps the SVG, which `TwinExplorer` sizes `h-auto w-full`. A
           portrait graph would otherwise upscale ~3x to fill the column and
           strand hundreds of px of empty pane against the scenario list — the
           exact defect measured and fixed on the Energy sibling, where a 4-node
           fan rendered 822px tall and pinned that page's balance ratio to
           precisely the 0.5 floor. The SVG's default `preserveAspectRatio`
           scales the graph down to meet the cap and centres it, so nothing
           distorts, and a wide multi-layer chain stays under the cap untouched.
           The cap lives here and not in `TwinExplorer` — nine other pages
           consume that component. */
        <div data-balance-item data-gfx-meaning className="mt-6 [&_svg]:max-h-[26rem]">
          <TwinExplorer
            assets={scenario.assets}
            paths={scenario.paths}
            locale={locale}
            title={pick(scenario.diagramTitle, locale)}
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

      {/* The chain's last stages. Text, not nodes — see the docblock. */}
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
