import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { TwinExplorer } from "@/components/twin/TwinExplorer";
import { same } from "../registry";
import type { RailScenario } from "./content.scenarios.passenger";

/**
 * S05's DETAIL PANE — the selected scenario's pathway, drawn where the source
 * states a structure and written where it does not.
 *
 * ONE CALLER TODAY, AND NOT ACCIDENTALLY SO. S06 immediately below on the page
 * renders the freight table as a banded register with every field inline, not
 * as a second master/detail, so it has no detail pane to fill and does not
 * consume this one — see the note above `FreightScenario` in
 * `content.scenarios.ts`. `balanceGroup` is nonetheless a prop rather than a
 * hard-coded string: it is the one value that would differ if a second
 * master/detail section ever did appear, and a pane that hard-codes another
 * section's balance group is the exact bug the mark exists to catch.
 *
 * THE SPLIT — GRAPH ABOVE, CAPTIONS BELOW — IS THE DATA CONTRACT'S OWN. The
 * stages that are real assets go into a real `TwinExplorer` topology (typed
 * `SystemAsset[]`/`SystemPath[]`, the shared industry-agnostic contract); the
 * operational impact and the Twin-supported decision render as TEXT captions
 * beneath it. An impact is a separate field from `SystemAsset`/`SystemPath` in
 * `OXOT_content-to-visual-mapping-table.md`, so forcing it into the node graph
 * as a terminal node would draw an asset that does not exist.
 *
 * `TwinExplorer` IS USED DIRECTLY HERE, and that is a real difference from this
 * page's `HeroCanvas.tsx`, not an inconsistency. The hero needs a readable
 * first paint, which `TwinExplorer` cannot give it — ELK lays out in a
 * `useEffect`, so the hero would paint "Loading diagram…" above the fold. The
 * scenario sections are ordinary below-the-fold body sections with no
 * first-paint constraint, so the shared component is the right answer and
 * hand-authored geometry would be a second, weaker copy of it.
 *
 * TWO PASSENGER SCENARIOS RENDER NO GRAPH AT ALL and say why in place of one —
 * see the `noGraphReason` rule in `content.scenarios.ts`. A visible stated gap,
 * which is this site's rule wherever the source does not supply what a
 * treatment needs.
 *
 * TOKEN DISCIPLINE. Amber is spent on the IMPACT caption's rule and nowhere
 * else in this file — it is a border, never text: the six signal tokens clear
 * WCAG 1.4.11's 3:1 non-text floor, which is their whole budget, and would fail
 * 1.4.3's 4.5:1 as text. The decision caption takes a neutral border, because a
 * decision the Twin supports is a capability available, not a modelled state,
 * and spending a second signal token on it would drain the meaning out of the
 * one that carries it. No other `--signal-*` token appears here.
 */

const T = {
  pathwayLabel: same("Cyber / OT pathway"),
  impactLabel: same("Operational impact"),
  decisionLabel: same("Twin-supported decision"),
  noGraphLabel: same("No route drawn"),
  /* The claim boundary, printed rather than implied — the literal
     `OXOT_Layout_Styles.md` binds to illustrative Twin scenarios. */
  claim: same("Illustrative scenario — no customer data")
};

export function ScenarioTrace({
  scenario,
  balanceGroup,
  locale
}: {
  scenario: RailScenario;
  balanceGroup: string;
  locale: Locale;
}) {
  const hasGraph = scenario.assets.length > 0;

  return (
    /* THE MARK GOES ON THIS CONTENT WRAPPER, never on the grid cell holding it:
       that row is `items-stretch`, so the CELLS are equal by construction and
       measuring them would let a nearly-empty pane pass the ratio floor. */
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

      {hasGraph ? (
        /* `data-gfx-meaning` opts the diagram into the harness's WCAG 1.4.11
           pass, which only checks graphics that opt in.

           `max-h` caps the SVG, which `TwinExplorer` sizes `h-auto w-full`. A
           portrait graph (the 1→4 station cascade lays out tall and narrow)
           would otherwise upscale to fill the column and strand several hundred
           px of empty pane against the register beside it. The SVG's default
           `preserveAspectRatio` scales the graph down to meet the cap and
           centres it, so nothing distorts, and a short two-hop chain stays under
           the cap untouched. The cap lives here and not in `TwinExplorer` —
           other pages consume that component too. */
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

      {/* Columns three and four. Text, not nodes — see the docblock. */}
      <div data-balance-item className="mt-6 border-l-2 border-signal-amber pl-4">
        <p className="mono-label text-primary-ink">{pick(T.impactLabel, locale)}</p>
        <p className="mt-2 body-copy leading-relaxed text-foreground">{pick(scenario.impact, locale)}</p>
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
