import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TwinExplorer } from "@/components/twin/TwinExplorer";
import { same } from "../registry";
import type { EnergyScenario } from "./content.scenarios";

/**
 * S04's DETAIL PANE — the selected scenario's chain, drawn.
 *
 * THE TECHNIQUE IS `rail-transportation/RailScenarioDiagram.tsx`'s, reused
 * rather than re-invented: the stages that are real assets go into a real
 * `TwinExplorer` topology (typed `SystemAsset[]`/`SystemPath[]`, the shared
 * industry-agnostic contract), and the stages that are NOT assets — the
 * consequence and the decision — render as text captions beneath the graph.
 * The split is the same one `content.scenarios.ts` records: a consequence is a
 * separate field from `SystemAsset`/`SystemPath` in the real data contract
 * (`OXOT_content-to-visual-mapping-table.md`), so forcing it into the node
 * graph as a terminal node would draw an asset that does not exist.
 *
 * `TwinExplorer` IS USED DIRECTLY HERE, and that is a real difference from
 * this page's `CascadeCanvas.tsx`, not an inconsistency. `CascadeCanvas` is
 * S00's Pattern 1 hero and needs a readable first paint, which `TwinExplorer`
 * cannot give it — ELK lays out in a `useEffect`, so the hero would paint
 * "Loading diagram…" above the fold. S04 is a normal below-the-fold body
 * section with no first-paint constraint, so the shared component is the right
 * answer and hand-authored geometry would be a second, weaker copy of it.
 *
 * THE TERMINAL-TEXT CONVENTION IS THIS PAGE'S OWN. `CascadeCanvas.tsx` puts
 * the consequence in an AMBER-OUTLINED chip and keeps every word in a
 * foreground colour; both rules are honoured below. Amber is a border only —
 * the six signal tokens clear WCAG 1.4.11's 3:1 non-text floor, which is their
 * whole budget, and would fail 1.4.3's 4.5:1 as text. The decision caption
 * takes a neutral border: a decision the Twin supports is a capability
 * available, not a modelled state, and spending a signal token on it would
 * drain the meaning out of the one that carries it.
 *
 * TWO SCENARIOS RENDER NO GRAPH AT ALL and say why in place of it — see
 * `noGraphReason` in `content.scenarios.ts`. A visible stated gap, which is
 * this site's rule wherever the spec does not supply what a treatment needs.
 */

const T = {
  pathwayLabel: same("Example pathway"),
  consequenceLabel: same("Potential consequence"),
  decisionLabel: same("Decision the Twin supports"),
  noGraphLabel: same("No route drawn"),
  /* The claim boundary, printed rather than implied — the same literal
     `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios, and the same
     one `CascadeCanvas.tsx` prints on this page's hero. */
  claim: same("Illustrative scenario — no customer data")
};

export function ScenarioTrace({ scenario, locale }: { scenario: EnergyScenario; locale: Locale }) {
  const hasGraph = scenario.assets.length > 0;

  return (
    /* THE MARK GOES ON THIS CONTENT WRAPPER, never on the grid cell holding it:
       that row is `items-stretch`, so the CELLS are equal by construction and
       measuring them would let a nearly-empty pane pass the ratio floor. */
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
           portrait graph (the 1→3 fan-outs lay out ~216×276) would otherwise
           upscale ~3× to fill the column and strand 400+px of empty pane
           against the scenario list. The SVG's default `preserveAspectRatio`
           scales the graph down to meet the cap and centres it, so nothing
           distorts, and a wide multi-layer chain (the 5-node ransomware trace
           lays out ~492×92) stays under the cap untouched. The cap lives here
           and not in `TwinExplorer` — nine other pages consume that. */
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
        <p className="mt-2 body-copy leading-relaxed text-foreground">
          {pick(scenario.consequence, locale)}
        </p>
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
