/**
 * WATER & WASTEWATER — ITERATION 3, S06. The four decisions, data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * ("The four water decisions", L186-199); the panel's six-step shape is
 * `OXOT_Visual_Foundation_Spec.md` §6's own flow diagram, not a layout pattern:
 *
 *     question → evidence required → model action → output → roles → CTA
 *
 * WHERE EACH STEP COMES FROM, because only two of the six are handed over
 * whole and the other four are decomposed:
 *
 *   `question`  — L194-197's "Drinking-water and wastewater language" column,
 *                 transcribed verbatim.
 *   `output`    — L194-197's "What the Twin provides" column. Transcribed where
 *                 the column is already an output sentence; where it is a
 *                 compound (D4 names its evidence and its output in one
 *                 clause) it is split, never rewritten.
 *   `evidence`  — the inputs each row's own two columns name. D1's provides
 *                 column says the prioritization is "based on reachable
 *                 control points and process/public-health/environmental
 *                 consequence" — that phrase IS the evidence list. D2's
 *                 evidence is the seven funding candidates its own question
 *                 enumerates. D4's is "actual reachability, treatment
 *                 consequence, owner, compensating controls, and reassessment
 *                 conditions", verbatim. D3's is L196's own constraint
 *                 ("without losing monitoring or control") plus §6's worked
 *                 flow for this exact decision ("Baseline route → …").
 *   `modelAction` — L199 for D1 ("connect a reachable pathway to the physical
 *                 process, then classify remediation as NOW, NEXT, or NEVER"),
 *                 and §7's purpose statement for D3 ("The model changes; the
 *                 plant does not."). D2 and D4 restate their own provides
 *                 column as the action it implies, adding no new claim.
 *
 * ROLES ARE THE ONE DERIVED FIELD, AND IT IS FLAGGED RATHER THAN SMOOTHED
 * OVER. The four-decision table names a role for exactly one row — D4's
 * "owner", inside its exception record. The other three draw from the brief's
 * OWN "Primary audiences" list (L14-20), which is a page-level source, not a
 * per-decision one: allocating a listed audience to a decision is this file's
 * judgement about which listed audience the decision's own question is written
 * for, not something the brief states. No job title appears here that the
 * brief does not list. That provenance stays in THIS comment and is not
 * printed on the page — a note explaining how a page sourced its own copy is
 * written for a reviewer, not for a customer.
 *
 * DESTINATIONS ARE REAL `PATHS` CONSTANTS, NOT THE BRIEF'S URLS. The brief's
 * suggested-links list is stale (see the `LINKS` comment in content.ts); §6's
 * own destination column happens to be correct for all four, and each was
 * checked against the live route directory rather than assumed:
 * src/app/[locale]/decisions/{fix-first,investment,change-safely,risk-acceptance}
 * all exist.
 *
 * "NEVER" IS USED, NOT SOFTENED. `OXOT_Visual_Foundation_Spec.md` §6's
 * public-label restriction was reversed by the owner on 2026-08-24, and the
 * brief itself writes NOW / NEXT / NEVER at L194 and L199.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/** Which `PATHS` key a decision's CTA resolves to. A key rather than a string
 *  so a route rename breaks the build instead of the page. */
export type DecisionDestination =
  | "decisionFixFirst"
  | "decisionInvestment"
  | "decisionChangeSafely"
  | "decisionRiskAcceptance";

export interface DecisionEntry {
  id: string;
  /** The OXOT decision name — L192's left column. */
  name: Bilingual;
  /** The buyer's question in this sector's own words — L194-197, verbatim. */
  question: Bilingual;
  /** What the Twin needs before it can answer. */
  evidence: Bilingual;
  /** What the model does with it. */
  modelAction: Bilingual;
  /** What comes back out. */
  output: Bilingual;
  /** Who the answer is for. See the ROLES note in this file's header. */
  roles: Bilingual;
  destination: DecisionDestination;
}

export const DECISION_DESTINATIONS: Record<DecisionDestination, string> = {
  decisionFixFirst: PATHS.decisionFixFirst,
  decisionInvestment: PATHS.decisionInvestment,
  decisionChangeSafely: PATHS.decisionChangeSafely,
  decisionRiskAcceptance: PATHS.decisionRiskAcceptance
};

export const DECISION_PANEL_LABELS = {
  /** The switchboard's key column heading. */
  keys: same("Select a decision"),
  question: same("Buyer question"),
  evidence: same("Evidence required"),
  modelAction: same("OXOT model action"),
  output: same("Output"),
  roles: same("Relevant roles"),
  cta: same("Open the decision page")
};

export const DECISION_ITEMS: DecisionEntry[] = [
  {
    id: "fix-first",
    name: same("What do we fix first?"),
    /* L194, verbatim. */
    question: same(
      "Which cyber pathway can affect treatment quality, disinfection, pumping, overflow risk, process monitoring, or permit compliance?"
    ),
    /* L194's provides column states what the prioritization is "based on". */
    evidence: same(
      "Reachable control points, and the process, public-health or environmental consequence each one can reach."
    ),
    /* L199's stated mechanism. */
    modelAction: same(
      "Connect a reachable pathway to the physical process, then classify remediation — rather than letting a generic CVSS backlog set operational priorities."
    ),
    /* L194's provides column. */
    output: same("A NOW / NEXT / NEVER prioritization, ordered by consequence rather than by score."),
    /* Two entries from the brief's own Primary audiences list. */
    roles: same(
      "SCADA / OT manager, automation engineer, electrical and instrumentation team; treatment-plant manager and chief operator."
    ),
    destination: "decisionFixFirst"
  },
  {
    id: "investment",
    name: same("What should we spend?"),
    /* L195, verbatim. */
    question: same(
      "Should we fund secure remote access, SCADA replacement, field-RTU modernization, network segmentation, backup communications, additional instrumentation, or generator capacity?"
    ),
    /* The seven candidates L195's own question enumerates. */
    evidence: same(
      "Each funding candidate on the table, and the consequence the utility is trying to remove with it — not a security score per option."
    ),
    modelAction: same(
      "Compare capital and operational options against one shared consequence model, so two unlike investments can be argued in the same terms."
    ),
    /* L195's provides column, verbatim. */
    output: same(
      "A common consequence model for comparing capital and operational investments—not a generic security score."
    ),
    /* Two entries from the brief's own Primary audiences list. */
    roles: same(
      "Water-utility general manager, operations director or superintendent; CISO, IT manager or municipal technology leader."
    ),
    destination: "decisionInvestment"
  },
  {
    id: "change-safely",
    name: same("Can we change safely?"),
    /* L196, verbatim. */
    question: same(
      "Can we reconfigure this firewall, remote pump-station connection, VLAN, PLC firmware, SCADA server, or chemical-dosing network without losing monitoring or control?"
    ),
    /* §6's own example flow for this decision opens on the baseline route;
       L196's own clause names the monitoring and control that must survive. */
    evidence: same(
      "The baseline route as documented, and the data and control flows the change is not allowed to lose — monitoring, alarms, and control."
    ),
    /* §7's purpose statement and its closing line. */
    modelAction: same(
      "Insert the firewall, brokered access, patch, re-zoning or replacement in the model and re-evaluate every route. The model changes; the plant does not."
    ),
    /* L196's provides column, verbatim. */
    output: same(
      "A virtual test of required data/control flows, residual exposure, failover requirements, and process impact."
    ),
    /* One entry from the brief's own Primary audiences list. */
    roles: same("SCADA / OT manager, automation engineer, electrical and instrumentation team."),
    destination: "decisionChangeSafely"
  },
  {
    id: "risk-acceptance",
    name: same("What can we leave alone?"),
    /* L197, verbatim. */
    question: same(
      "Which legacy asset is isolated, has limited operational consequence, or can safely wait for planned renewal—with a documented review trigger?"
    ),
    /* L197's provides column names its own evidence list, verbatim. */
    evidence: same(
      "Actual reachability, treatment consequence, owner, compensating controls, and reassessment conditions."
    ),
    modelAction: same(
      "Test whether the asset is genuinely isolated and its operational consequence genuinely limited, and record the condition that would reopen the question."
    ),
    output: same(
      "A defensible exception record — a documented NEVER carrying a review trigger, not an untracked backlog item."
    ),
    /* The one role the source names directly, at L197. */
    roles: same("The named owner recorded on the exception, and the reviewer its reassessment condition falls to."),
    destination: "decisionRiskAcceptance"
  }
];

/** L199, verbatim — the paragraph that closes the section and states why this
 *  framework is worth anything in this sector specifically. */
export const DECISIONS_NOTE = same(
  "The product's decision framework is useful in water because it can connect a reachable pathway to the physical process, then classify remediation as NOW, NEXT, or NEVER rather than letting a generic CVSS backlog determine operational priorities."
);
