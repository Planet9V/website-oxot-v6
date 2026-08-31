/**
 * S12 · ENGAGEMENT APPROACH — content slice for `/industries/rail-transportation-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md, L386–L396. Every string below carries the
 * source line it was transcribed from. Nothing is invented.
 *
 * FOUR COLUMNS, NOT THREE. The energy brief's equivalent table has three
 * columns (engagement, use case, output); this one has four, because each
 * engagement is stated twice — once in passenger/transit operating language and
 * once in freight-rail operating language (L392). That is the same dual-track
 * demand the whole page rests on (L3: passenger transit and US freight "should
 * not read as one generic 'transport' offering"; L169: freight must be "a
 * dedicated subpage or major tab, not a paragraph under passenger rail"). So
 * `passenger` and `freight` are two fields on ONE engagement record rather than
 * two arrays: the source offers ONE set of three engagements, scoped for two
 * audiences, and splitting them would assert two different service lines.
 *
 * THE ORDER IS THE SOURCE'S, AND IT IS THE ONLY ORDERING CLAIM MADE HERE.
 * L394–L396 run Rail Decision Sprint → System Twin Build → Continuous Twin
 * Operations, and each row's own text describes a wider frame than the one
 * above it (a single change, then one line or territory, then a standing
 * program). `index` records position in that list, which is a real fact about
 * the source table. NO DURATION, PRICE, TEAM SHAPE, PREREQUISITE OR RELATIVE
 * SIZE is stated, because the source states none — and a "scope" figure or bar
 * length implying one would be a fabricated engineering fact.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export interface RailEngagement {
  /** DOM identity, not copy. Anything wiring an id off these must never derive
   *  it from array position. */
  id: string;
  /** Ordinal in the source table. A real fact about the table, not a rating. */
  index: string;
  /** Source column 1 — the engagement's name. */
  name: Bilingual;
  /** Source column 2 — the passenger / transit use case. */
  passenger: Bilingual;
  /** Source column 3 — the freight-rail use case. */
  freight: Bilingual;
  /** Source column 4 — what the engagement returns. */
  output: Bilingual;
}

export const ENGAGEMENT = {
  /** The section's ordinal on the page's running block rule. */
  index: "12",
  /** Section anchor. */
  sectionId: "engagement-approach",
  /** Source L386 — the source's own name for this section. */
  datumLabel: same("Engagement approach"),
  /** Source L390, the section headline the brief prints as a blockquote h2. */
  h2: same("Start with one route, one control environment, or one critical change."),

  /** Source L392, the brief's own column headers, used as the labels that name
   *  each cell in the body. Transcribed exactly, slashes and hyphen included. */
  columns: {
    engagement: same("Engagement"),
    passenger: same("Passenger / transit use case"),
    freight: same("Freight-rail use case"),
    output: same("Output")
  },

  items: [
    {
      id: "rail-decision-sprint",
      index: "01",
      /** Source L394, all four cells. */
      name: same("Rail Decision Sprint"),
      passenger: same(
        "CBTC vendor access, OCC dependency, traction-power SCADA, station/tunnel OT, depot network change"
      ),
      freight: same(
        "PTC support pathway, dispatch/CAD dependency, signal-house access, grade-crossing, yard/terminal OT"
      ),
      output: same(
        "Modelled pathway, safety/service consequence, control options, evidence-backed recommendation"
      )
    },
    {
      id: "system-twin-build",
      index: "02",
      /** Source L395, all four cells. */
      name: same("System Twin Build"),
      passenger: same(
        "One metro line, signaling zone, depot, control center, traction-power estate, or rolling-stock maintenance environment"
      ),
      freight: same(
        "One territory, PTC operational segment, dispatch environment, yard/terminal, locomotive maintenance domain, or communications estate"
      ),
      output: same(
        "Validated Cyber Digital Twin, priority queue, architecture views, evidence package"
      )
    },
    {
      id: "continuous-twin-operations",
      index: "03",
      /** Source L396, all four cells. */
      name: same("Continuous Twin Operations"),
      passenger: same(
        "Programs with rolling-stock upgrades, CBTC modernization, changing vendor access, and planned possessions"
      ),
      freight: same(
        "Network/territory changes, PTC upgrades, fleet and wayside refresh, supplier risk, and ongoing operating-model evolution"
      ),
      output: same(
        "Risk deltas, change testing, decision reporting, assurance evidence, and recurring scenario support"
      )
    }
  ] satisfies readonly RailEngagement[]

  /* GAP, FLAGGED NOT FILLED: the source gives no duration, price, team shape,
     prerequisite or deliverable format for any of the three engagements, and no
     statement of which one a given operator should pick. None is invented, and
     no empty slot is drawn for one — an unbuilt INTERACTION gets a visible
     placeholder; absent FACTS get silence. */
};
