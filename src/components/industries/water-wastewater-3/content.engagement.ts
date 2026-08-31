/**
 * S10 · ENGAGEMENT APPROACH — the brief's four entry points, transcribed.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * L321-326, a four-row table with the columns `Engagement | Best starting point
 * | Example output`. Four rows are in the brief and four are here; the count was
 * read off the source, not carried over from another iteration of this page.
 *
 * `id` IS DERIVED FROM THE ENGAGEMENT NAME, NEVER FROM ARRAY POSITION, because
 * every `aria-controls` and `aria-labelledby` in Engagement.tsx is built from
 * it. Reordering these four by scope must move a panel with its entry, not
 * repoint an entry at the panel next door.
 *
 * THESE FOUR ARE CHOSEN BETWEEN, NOT WORKED THROUGH. Nothing in this file
 * records or implies a completion, progress or "current phase" state, and
 * nothing may be added that does — a utility picks the one entry whose scope
 * matches the decision in front of them.
 *
 * `Bilingual` via `same()`, per registry.ts: both locales render and `nl` is a
 * marked placeholder pending translation, not a claim of correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export type EngagementEntry = {
  id: string;
  name: Bilingual;
  /** The brief's "Best starting point" column. */
  start: Bilingual;
  /** The brief's "Example output" column. */
  output: Bilingual;
};

/* The two column headers of L321, carried as run-in labels rather than as a
   header row: the panel reads the pair as one thought, not as two cells. */
export const ENGAGEMENT_LABELS = {
  start: same("Best starting point"),
  output: same("Example output")
};

/* L323-326, verbatim. */
export const ENGAGEMENT_ENTRIES: EngagementEntry[] = [
  {
    id: "treatment-process-decision-sprint",
    name: same("Treatment-Process Decision Sprint"),
    start: same(
      "Chemical dosing, UV/disinfection, filtration, aeration, biological process, or control-room change"
    ),
    output: same(
      "Modelled cyber pathway, treatment consequence, control options, and prioritized action plan"
    )
  },
  {
    id: "remote-asset-resilience-sprint",
    name: same("Remote-Asset Resilience Sprint"),
    start: same(
      "Lift stations, pump stations, wells, reservoirs, booster stations, field RTUs, or telemetry network"
    ),
    output: same(
      "Reachability map, operational dependency analysis, secure remote-access and recovery roadmap"
    )
  },
  {
    id: "facility-twin-build",
    name: same("Facility Twin Build"),
    start: same(
      "One drinking-water treatment plant, wastewater treatment plant, or regional operations environment"
    ),
    output: same(
      "Validated Cyber Digital Twin, risk-priority queue, process/OT views, evidence package"
    )
  },
  {
    id: "continuous-twin-operations",
    name: same("Continuous Twin Operations"),
    start: same(
      "Multi-site utility with changing assets, vendors, threat context, capital programs, and seasonal risk"
    ),
    output: same(
      "Risk deltas, scenario testing, evidence updates, resilience reporting, and recurring decision support"
    )
  }
];
