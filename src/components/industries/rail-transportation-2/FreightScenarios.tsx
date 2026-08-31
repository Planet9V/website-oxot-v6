import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { STACK_BY_SEGMENT } from "./content.architecture";
import {
  FREIGHT_BAND_CAPTION,
  FREIGHT_BAND_GAP_NOTE,
  FREIGHT_SCENARIOS,
  FREIGHT_SCENARIOS_CLOSING,
  FREIGHT_SCENARIOS_SECTION,
  FREIGHT_SCENARIO_FIELD_LABELS
} from "./content.scenarios.freight";
import { SectionA } from "./Rule";

/**
 * S06 · FREIGHT-RAIL CYBER SCENARIOS — header recipe H-A, body treatment: a
 * BANDED REGISTER filed into the freight OT stack's own tiers. All eight
 * scenarios are on the page at once, and all four of each scenario's fields
 * render inline and unclamped.
 *
 * WHY THIS IS NOT A SECOND MASTER/DETAIL. S05 immediately above renders the
 * passenger scenario table as a master/detail interactive with a trace pane.
 * Running the same mechanism again here would put two identical machines back
 * to back and make the page's two halves indistinguishable — the
 * one-template-per-page failure `OXOT_Layout_Styles.md` names, and in content
 * terms the exact thing source L169 forbids when it insists freight must be "a
 * dedicated subpage or major tab, not a paragraph under passenger rail". Two
 * sections that look identical ARE the same paragraph twice, whatever the words
 * say.
 *
 * AND THE TWO TABLES ARE NOT THE SAME SHAPE, so the same treatment would be
 * wrong even without S05 next door. The passenger table has seven rows whose
 * subjects are seven different systems. The freight table has EIGHT rows that
 * fall into a depth order — dispatch, back office, wayside, onboard, yard —
 * because freight's defining property in this brief is that it is distributed
 * across a stack (L169, which is this section's lead). A master/detail hides
 * seven of eight rows behind a click and flattens exactly the structure that
 * makes freight freight. The register shows the stack.
 *
 * THE BANDS ARE READ FROM THE ARCHITECTURE SECTION, NOT RESTATED HERE.
 * `STACK_BY_SEGMENT.freight.tiers` (content.architecture.ts, source L173–L194)
 * supplies both the band ORDER and the band NAMES; this file only filters the
 * scenarios into them. S03's freight stack and S06's bands therefore cannot
 * drift apart, and a reader who passed that stack three sections ago meets the
 * same tier names in the same order — which is what lets the banding read as a
 * location rather than as a taxonomy invented for this section. The `tier`
 * placements themselves, and the source evidence for each, are argued in
 * content.scenarios.ts; they are editorial, and `FREIGHT_BAND_CAPTION` says so
 * on the page.
 *
 * A TIER WITH NO SCENARIOS DROPS OUT AND IS NAMED. The enterprise tier carries
 * no row in the brief's table, so it renders no band — and
 * `FREIGHT_BAND_GAP_NOTE` states that on the page. An empty band would be dead
 * space; a silently missing one would let the reader assume the register covers
 * the whole stack when it does not.
 *
 * NO ACCENT COLOUR IN THIS SECTION'S BODY, DELIBERATELY. Brand orange marks one
 * thing per section, and the candidates here would all be false: the eight
 * scenarios are peers (the source ranks nothing), the bands are locations
 * rather than priorities, and no outbound link asks the reader to leave.
 * Painting one row or one tier would print a priority the source does not
 * state. The one accented element is the caption, which is the section's
 * instruction for how to read the bands — not a claim about the railway. The
 * structure below it is carried by rule weight alone: a SOLID rule opens each
 * band, a DASHED rule separates scenarios inside one, which is this page's own
 * block-joint grammar from Rule.tsx used as structure rather than ornament. No
 * `--signal-*` token is touched, for the reason Rule.tsx gives at length.
 *
 * NOT CARDS AND NOT A `<table>`. Eight equal filled tiles would break
 * `OXOT_Visual_Rules.md` L13 (no more than three visually-equal cards) five
 * times over, and would assert the eight are unrelated peers, which the banding
 * denies. A `<table>` would force four prose columns into ~230px tracks at this
 * container width — clamping by column width the very fields this section
 * exists to show whole — and would make S06 the page's third reference matrix.
 * A `<dl>` is what a labelled field set actually is.
 *
 * NO `data-balance-group` ON THIS SECTION, AND HERE IS WHY A SECTION MAY OMIT
 * ONE. Sibling balance exists to stop one pane of a TWO-PANE SPLIT sitting
 * nearly empty beside a full one; `scripts/measure.mjs` compares marked
 * siblings within a group. This section has no split. The bands are a single
 * full-width column run, and a band's left track is a fixed tier label rather
 * than a content pane, so there is no pair of siblings whose heights could fall
 * out of proportion and nothing for a floor to protect. The band lengths are
 * unequal BY THE SOURCE — wayside holds three scenarios, yard-OT two, the rest
 * one each — so marking them would measure the wrong thing entirely: it would
 * report the brief's own row distribution as a layout defect, and the only way
 * to "pass" would be filler invented to satisfy a check that does not apply.
 */

/** The band's two tracks: a tier-name rail, then the scenarios filed under it.
 *  The rail is wide enough for "Yard, terminal, and infrastructure OT" to set on
 *  two lines rather than five. */
const BAND_GRID = "lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-x-10";

export function FreightScenarios({ locale }: { locale: Locale }) {
  /* Order and names come from the freight stack; only the filtering happens
     here. A tier the brief files no scenario into yields an empty band and is
     dropped — see the head comment. */
  const bands = STACK_BY_SEGMENT.freight.tiers
    .map((tier) => ({
      tier,
      scenarios: FREIGHT_SCENARIOS.filter((scenario) => scenario.tier === tier.id)
    }))
    .filter((band) => band.scenarios.length > 0);

  return (
    <SectionA
      id={FREIGHT_SCENARIOS_SECTION.id}
      index={FREIGHT_SCENARIOS_SECTION.index}
      datumLabel={FREIGHT_SCENARIOS_SECTION.datumLabel}
      heading={FREIGHT_SCENARIOS_SECTION.heading}
      lead={FREIGHT_SCENARIOS_SECTION.lead}
      locale={locale}
    >
      <p className="mono-label text-primary-ink">{pick(FREIGHT_BAND_CAPTION, locale)}</p>

      {/* min-w-0 throughout: without it the tier track sizes to its longest
          unbreakable word and pushes the page sideways at 390px. */}
      <div className="mt-6 min-w-0">
        {bands.map((band) => (
          <div
            key={band.tier.id}
            className={`grid min-w-0 border-t border-border pt-5 ${BAND_GRID}`}
          >
            {/* The tier rail. Weight, not colour. Stacked below lg it reads as
                the heading of the scenarios beneath it; at lg it becomes the
                left rail and the group reads as one horizontal band of the
                stack. */}
            <p className="mono-label pb-4 text-foreground lg:pb-8">
              {pick(band.tier.name, locale)}
            </p>

            <div className="min-w-0 pb-8">
              {band.scenarios.map((scenario, i) => (
                <article
                  key={scenario.id}
                  /* Dashed = a scenario boundary INSIDE a band; the solid rule
                     above the band is the band boundary. The first scenario
                     takes no rule, so it reads as belonging to the solid rule
                     that opened the band rather than starting a run of its own. */
                  className={i > 0 ? "mt-7 border-t border-dashed border-border pt-7" : undefined}
                >
                  <h3 className="body-lead font-semibold leading-snug text-foreground">
                    {pick(scenario.name, locale)}
                  </h3>

                  {/* The three remaining source columns, left to right in the
                      source's own order — which is also the chain they form:
                      how the pathway reaches, what it does to the railroad,
                      what the Twin lets an operator decide about it. Three
                      tracks only at md and up; below that they stack, because
                      three prose columns inside a narrow viewport is a clamp by
                      another name, and this section exists to show these fields
                      whole. */}
                  <dl className="mt-4 grid min-w-0 gap-x-8 gap-y-4 md:grid-cols-3">
                    {(
                      [
                        [FREIGHT_SCENARIO_FIELD_LABELS.pathway, scenario.pathway],
                        [FREIGHT_SCENARIO_FIELD_LABELS.impact, scenario.impact],
                        [FREIGHT_SCENARIO_FIELD_LABELS.decision, scenario.decision]
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label.en} className="min-w-0">
                        <dt className="mono-label text-muted-foreground">{pick(label, locale)}</dt>
                        {/* ml-0 kills the UA's 40px indent. No line-clamp, no
                            truncation and no max-height anywhere in this
                            subtree. */}
                        <dd className="ml-0 mt-2 body-copy leading-relaxed text-foreground">
                          {pick(value, locale)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Closes the run of bands. The gap note sits first because it is about
          the register directly above it; the source's paragraph is about the
          whole freight picture and so reads last. */}
      <div className="border-t border-border pt-6">
        <p className="body-copy leading-relaxed text-muted-foreground">
          {pick(FREIGHT_BAND_GAP_NOTE, locale)}
        </p>
        <p className="mt-6 body-lead leading-relaxed text-muted-foreground">
          {pick(FREIGHT_SCENARIOS_CLOSING, locale)}
        </p>
      </div>
    </SectionA>
  );
}
