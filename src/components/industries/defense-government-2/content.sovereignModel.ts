/**
 * THE SOVEREIGN SYSTEM MODEL — the page's main visual, and the ONE section
 * whose material comes from the BRIEF rather than the CORPUS.
 *
 * See `content.ts`'s docblock for the full sourcing account (BRIEF =
 * `new_material_source/1_website_layout_v4/3_industries/
 * industry_defense_airgap.md`; CORPUS = the live page's own content module,
 * which is the only surviving record of the lost `industry_defence.md`).
 *
 * EVERYTHING IN THIS FILE IS BRIEF L57–L94 AND EXISTS NOWHERE ELSE. The CORPUS
 * has no mission axis, no pressure axis, and a DIFFERENT chain (five nodes
 * ending on a decision — see `HERO.chain` and its comment on why the two are
 * kept apart rather than merged). If this file is ever "reconciled" against the
 * CORPUS, that is a mistake: there is nothing to reconcile.
 *
 * ─── THE 42-COMBINATION GAP. FLAGGED, NOT FILLED. READ BEFORE BUILDING ───────
 *
 * BRIEF L73–L92 gives the visitor two selectors: 6 missions and 7 pressures.
 * That is 42 combinations. BRIEF L94 then states what the model does with a
 * selection — "Then OXOT shows what fails, what remains available, which
 * dependency caused the limitation, and which intervention changes the
 * outcome" — and STOPS. It supplies not one per-combination result. Not an
 * example, not a representative pair, not a partial table. Forty-two of
 * forty-two are missing, and no other source in the set carries them: the
 * CORPUS's ten SCENARIOS (content.scenarios.ts) are narrative event → cascade →
 * decision rows, not indexed by this grid, and they cannot be re-keyed onto it
 * without deciding, unsourced, which mission and which pressure each one is.
 *
 * SO NO OUTCOME IS WRITTEN HERE, and none may be written by a later builder.
 * Forty-two invented mission-under-pressure results on a defense and government
 * page would be forty-two fabricated operational claims — the exact failure the
 * page's own AIR_GAP copy commits against, in its own words: OXOT models
 * pathways and consequences while "retaining source provenance and showing
 * unsourced fields as empty rather than invented" (CORPUS L237).
 *
 * WHAT THE BUILDER GETS INSTEAD, all of it sourced:
 *   · `SOVEREIGN_CHAIN`  — the six layers, the thing the visual actually draws.
 *   · `MISSIONS` / `PRESSURES` — both axes, complete, verbatim.
 *   · `OUTCOME_FIELDS`   — the four result fields BRIEF L94 names, as LABELS.
 *   · `OUTCOME_FALLBACK` — the honest disclosure that renders in those four
 *                          fields for every combination, because that is the
 *                          true state of the data.
 * A selector over a real chain, with four correctly-named but empty result
 * fields and a note saying why they are empty, is a truthful rendering of what
 * this source contains. Filling them is not.
 */
import { same } from "../registry";

/* ── The six-layer chain ────────────────────────────────────────────────── */

/**
 * BRIEF L60–L70, verbatim including its own `•` separators (the CORPUS's
 * ARCHITECTURE tiers use `·` — the difference is the sources', not a typo to
 * normalize).
 *
 * `id` is DOM identity, not copy. The chain is ordered top-to-bottom exactly as
 * the source's arrow diagram runs: a mission at the top, the consequence at the
 * bottom, each layer depending on the one below it.
 */
export const SOVEREIGN_CHAIN = [
  { id: "mission", label: same("Mission / essential-government function") },
  { id: "facility", label: same("Operational facility or service") },
  { id: "resources", label: same("Power • fuel • water • telecoms • data center • logistics") },
  { id: "controls", label: same("BMS • EPMS • PLCs • networks • identity • vendor access") },
  { id: "dependency", label: same("Supplier / civil infrastructure / external dependency") },
  { id: "consequence", label: same("Cyber or hybrid-event consequence") }
];

/* ── Axis 1 · Mission ───────────────────────────────────────────────────── */

/** BRIEF L76, the source's own name for this selector. */
export const MISSION_LABEL = same("Mission");

/** BRIEF L77–L82, all six options, verbatim and in source order. */
export const MISSIONS = [
  { id: "crisis-coordination", label: same("Crisis coordination") },
  { id: "base-operations", label: same("Base operations") },
  { id: "airfield-support", label: same("Airfield support") },
  { id: "sovereign-cloud-data-center", label: same("Sovereign cloud / data center") },
  { id: "port-and-logistics", label: same("Port and logistics") },
  { id: "government-continuity", label: same("Government continuity") }
];

/* ── Axis 2 · Pressure ──────────────────────────────────────────────────── */

/** BRIEF L84, the source's own name for this selector. */
export const PRESSURE_LABEL = same("Pressure");

/** BRIEF L85–L91, all seven options, verbatim and in source order. */
export const PRESSURES = [
  { id: "cyber-compromise", label: same("Cyber compromise") },
  { id: "power-loss", label: same("Power loss") },
  { id: "telecom-outage", label: same("Telecom outage") },
  { id: "fuel-delay", label: same("Fuel delay") },
  { id: "supplier-withdrawal", label: same("Supplier withdrawal") },
  { id: "weather-physical-disruption", label: same("Weather / physical disruption") },
  { id: "combined-hybrid-event", label: same("Combined hybrid event") }
];

/* ── The four result fields ─────────────────────────────────────────────── */

/**
 * BRIEF L94, split into the four things that sentence enumerates. These are
 * FIELD NAMES — what the model reports — and they are sourced. Their VALUES are
 * not, for any of the 42 combinations. See this file's docblock.
 */
export const OUTCOME_FIELDS = [
  { id: "fails", label: same("What fails") },
  { id: "remains", label: same("What remains available") },
  { id: "cause", label: same("Which dependency caused the limitation") },
  { id: "intervention", label: same("Which intervention changes the outcome") }
];

/**
 * NOT FROM EITHER SOURCE — a required honesty disclosure, and the defined
 * fallback for every one of the 42 combinations.
 *
 * The owner's standing rule is that an unbuilt or unsourced interactive feature
 * is built complete and VISIBLY placeholdered rather than quietly dropped, so
 * the selector ships working, the four fields ship named, and this states why
 * they are empty. It claims nothing about any mission or any pressure — which
 * is the point.
 *
 * Its wording is anchored to the page's own AIR_GAP copy (CORPUS L236–L238),
 * which already tells the reader that OXOT retains source provenance and shows
 * unsourced fields as empty rather than invented. This is that principle
 * applied to OXOT's own website, not a new claim.
 */
export const OUTCOME_FALLBACK = same(
  "No published result stands behind this combination. A real mission-under-pressure outcome is derived from the operator's own engineering evidence inside the operator's own environment — so these four fields are shown empty rather than filled with an illustrative answer OXOT has not modelled."
);

/**
 * BRIEF L57, the source's own name for this visual — carried so a builder can
 * label the section with the source's term rather than inventing one.
 */
export const MODEL_LABEL = same("Sovereign System Model");
