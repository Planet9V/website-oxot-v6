/**
 * S13 · ENGAGEMENT APPROACH — content slice for
 * `/industries/hyperscale-data-centers-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, L475–L486. Every string below carries the source line
 * it was transcribed from. Nothing is invented.
 *
 * THREE COLUMNS, FOUR ROWS. L481's header row is `Engagement | Best starting
 * point | Example output`, and L483–L486 are the four engagements. There is ONE
 * description column, not two: unlike the rail brief's equivalent table, which
 * states each engagement twice in passenger and freight operating language, this
 * one states each engagement once. So each record carries exactly two fields
 * beside its name, and `columns` holds the source's own three header words —
 * used below as the labels that name each cell, since the body renders no header
 * row of its own.
 *
 * THE ORDER IS THE SOURCE'S, VERBATIM, AND NOTHING IS REORDERED. L483–L486 run
 * one critical-facilities change → one campus or hall cluster → a new building,
 * feed or plant → a multi-site estate, which already widens row by row. Nothing
 * here records position: `Capabilities` (S11) and `CaseProgramme` (S10) already
 * print ordinals on this page, and unlike S10's nine-step method — where the
 * order IS the content and shuffling two steps breaks the method — these four
 * are a menu an operator chooses between. A visible 01–04 would be the third
 * numbered run on one page and would rate what it only counts.
 *
 * NO DURATION, PRICE, TEAM SHAPE, PREREQUISITE OR RELATIVE SIZE is stated,
 * because the source states none for any of the four — and a scope figure or bar
 * length implying one would be a fabricated engineering fact.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export interface HyperscaleEngagement {
  /** DOM identity, not copy. Anything wiring an id off these must never derive
   *  it from array position. */
  id: string;
  /** Source column 1 — the engagement's name. */
  name: Bilingual;
  /** Source column 2 — what an operator brings to it. */
  startingPoint: Bilingual;
  /** Source column 3 — what the engagement returns. */
  output: Bilingual;
}

export const ENGAGEMENT = {
  /** The section's ordinal on the page's running block rule. */
  index: "13",
  /** Section anchor. */
  sectionId: "engagement-approach",
  /** Source L475 — the source's own name for this section. */
  datumLabel: same("Engagement approach"),
  /** Source L479, the section headline the brief prints as a blockquote h2. */
  h2: same("Start with one hall, one utility dependency, or one critical-facilities change."),

  /** Source L481, the brief's own column headers. Transcribed exactly, including
   *  its sentence-case for the two value columns. */
  columns: {
    engagement: same("Engagement"),
    startingPoint: same("Best starting point"),
    output: same("Example output")
  },

  items: [
    {
      id: "critical-facilities-decision-sprint",
      /** Source L483, all three cells. */
      name: same("Critical-Facilities Decision Sprint"),
      startingPoint: same(
        "Vendor access, BMS/EPMS segmentation, UPS/generator update, cooling-control change, power-path concern, or commissioning boundary"
      ),
      output: same(
        "Modelled dependency/cyber pathway, capacity consequence, controls comparison, implementation sequence"
      )
    },
    {
      id: "hyperscale-campus-twin-build",
      /** Source L484, all three cells. "Validated" and "assurance evidence" are
       *  the source's own words for what the engagement returns, transcribed
       *  rather than paraphrased; S12's lead already carries L458's guardrail
       *  that no compliance, certification or assurance OUTCOME is promised. */
      name: same("Hyperscale Campus Twin Build"),
      startingPoint: same(
        "One campus, data hall cluster, electrical system, cooling plant, or critical-facilities management environment"
      ),
      output: same(
        "Validated Cyber Digital Twin, A/B common-mode analysis, priority queue, interactive system views, assurance evidence"
      )
    },
    {
      id: "expansion-and-commissioning-assurance",
      /** Source L485, all three cells. */
      name: same("Expansion and Commissioning Assurance"),
      startingPoint: same(
        "New building/hall, new utility feed, cooling plant, substation, liquid-cooling deployment, or major modernization"
      ),
      output: same(
        "Temporary-to-live trust-boundary analysis, design/commissioning evidence, change scenarios, acceptance criteria"
      )
    },
    {
      id: "continuous-twin-operations",
      /** Source L486, all three cells. */
      name: same("Continuous Twin Operations"),
      startingPoint: same(
        "Multi-site estate with ongoing expansion, firmware change, supplier exposure, energy/water constraints, and evolving customer commitments"
      ),
      output: same(
        "Risk deltas, scenario testing, supplier/BOM change impact, capacity/resilience reporting, decision support"
      )
    }
  ] satisfies readonly HyperscaleEngagement[]

  /* GAP, FLAGGED NOT FILLED: the source gives no duration, price, team shape,
     prerequisite or deliverable format for any of the four engagements, and no
     statement of which one a given operator should pick. None is invented, and
     no empty slot is drawn for one — an unbuilt INTERACTION gets a visible
     placeholder; absent FACTS get silence. */
};
