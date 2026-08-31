/**
 * S09 · HYPERSCALE & DATA CENTERS — the Three-Gate Ledger's NARRATIVE layer: the
 * section shell, the scenario prose, the evidence groups, the modelled chain, the
 * gate copy and the result.
 *
 * SOURCE, line for line: `new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md` L324–L395, the brief's own "Worked use case" section.
 * Every heading, claim-boundary string, narrative paragraph, Twin input, chain
 * step, gate label, result clause and closing sentence below carries its `L<n>`
 * inline. Spec citations are to `OXOT_Layout_Styles.md` Pattern 2 and
 * `OXOT_Visual_Foundation_Spec.md` §7.
 *
 * THE SPLIT INTO TWO CONTENT FILES IS DELIBERATE AND PRE-AGREED. This file holds
 * what a reader reads; `content.workedExample.canvas.ts` holds the typed assets,
 * routes, geometry and candidate-control insertion points the canvas is drawn
 * from. Both sibling pages' equivalent single files landed at 499 and 500 lines
 * against this repository's 500-line cap, so the seam is cut before it is needed
 * rather than after.
 *
 * THIS SCENARIO IS DEVELOPED AT THREE DEPTHS ON THIS PAGE — the one-line model
 * entry at L65, the register row at L296, and this full walkthrough at L324. See
 * `content.workedExample.canvas.ts`'s header for the full note. Nothing here
 * imports from `content.ts`'s `MODEL` or from `content.scenarios.ts`; each list
 * is transcribed from its own source rows.
 *
 * CLAIM RULE IN FORCE: `OXOT_Visual_Foundation_Spec.md` L401 — no percentages,
 * money values, annual-loss figures or "verified" language. Not one numeric
 * figure appears in either of this section's two content files. L458's standing
 * page instruction also applies: no promise of automatic regulatory compliance,
 * certification, or assurance outcome.
 *
 * ONE HONEST GAP, DECLARED RATHER THAN FILLED. §7's Decision-output panel asks
 * for five things. Four are in the source: the recommended sequence (L393), the
 * implementation window (L388's own staging instruction, read with L346's
 * maintenance windows), the evidence needed (L341–L361), and the validation
 * condition inside L393's own "prove that segmentation preserves the required
 * control flows". The fifth, a responsible role, is assigned nowhere in
 * L324–L395 and is printed as NOT ASSERTED. Inventing an owner on a page whose
 * argument is that evidence is traceable would be the one claim in this section a
 * reader could catch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Section shell ───────────────────────────────────────────────────────── */

export const SECTION = {
  id: "worked-example",
  /* Ninth section on the page: hero 00, interactive model 01, sector reality 02,
     facility architecture 03, technology index 04, asset classes 05, dependency
     map 06, scenario register 07, the four decisions 08. */
  index: "09",
  /** L324, the brief's own H2 for this block. */
  datumLabel: same("Worked use case"),
  /** L328, verbatim. */
  heading: same(
    "Worked example: secure BMS vendor access without turning a maintenance change into a capacity event."
  ),
  /* L330, verbatim, em dash normalised to spaced — the site-wide contract string.
     Pattern 2's guardrail: this renders directly under the heading and is never
     conditional on state. */
  claimBoundary: same("Illustrative scenario — no customer data.")
};

/* L334 and L336, verbatim. The second paragraph carries Critical Facilities'
   objection, which is the reason this ledger holds six candidate controls rather
   than one recommendation. */
export const SCENARIO_PROSE: Bilingual[] = [
  same(
    "A hyperscale campus runs multiple data halls with N+1 cooling. Chillers, cooling towers, condenser-water pumps, chilled-water pumps, CRAHs, VFDs, and water-treatment systems report into BMS and DCIM platforms. An OEM remotely supports critical chiller controls and the BMS integrator maintains supervisory control logic."
  ),
  same(
    "A review finds that vendor remote access uses a persistent VPN path through a shared facility-management network. The route can reach an engineering workstation that has pathways toward BMS servers and selected mechanical-control zones. Security proposes removing vendor access. Critical Facilities objects: the vendor may be needed during a chiller fault, a controls instability event, or an overnight maintenance activity."
  )
];

/* ── The shared canvas: copy ─────────────────────────────────────────────── */

export const CANVAS = {
  title: same(
    "The vendor route into the facility-management network, the supervisory and mechanical-control paths beyond it, the reporting feeds beside them, and the selected candidate control's effect on each route."
  ),
  /* The legend is load-bearing, not decoration: colour on this canvas carries
     `SystemPath.status` and nothing else, and an unlabelled colour is precisely
     what `OXOT_content-to-visual-mapping-table.md` exists to keep off this site. */
  legendLabel: same("Route state"),
  legend: [
    { status: "open" as const, text: same("As documented — route open") },
    { status: "controlled" as const, text: same("Brought under the candidate control") },
    { status: "closed" as const, text: same("Closed by the modelled result") }
  ],
  discrepancyLabel: same("Nodes whose state differs from the baseline"),
  discrepancyHint: same(
    "Each entry moves the highlight to its node on the canvas above. Select a candidate control to repopulate this list."
  ),
  discrepancyEmpty: same(
    "No candidate is selected, so nothing differs from the baseline yet. The canvas above shows every route as documented."
  ),
  noteClosed: same("route closed"),
  noteControlled: same("required flow preserved"),
  noteInsertion: same("control inserted here")
};

/* ── Gate 1 · Baseline ───────────────────────────────────────────────────── */

export const BASELINE = {
  label: same("Baseline"),
  caption: same("As documented, before any control"),
  entryLabel: same("Entry point"),
  intermediateLabel: same("Intermediate systems"),
  targetLabel: same("Target asset"),
  chainLabel: same("Modelled chain"),
  /* L367–L377, the brief's own six-step chain, transcribed step for step. */
  chain: [
    same("Compromised vendor credential or remote-support endpoint"),
    same("Shared facility-management access path"),
    same("BMS engineering workstation / supervisory-control layer becomes reachable"),
    same("Chiller / pump / tower / VFD / valve control pathways potentially affected"),
    same("Loss of cooling visibility or impaired control during a physical cooling event"),
    same("Redundancy consumed → hall capacity reduced → load shed or service-impact risk")
  ],
  exceptionLabel: same("Why the route looks like this"),
  /* L336's own account of the route's present state, read with L334's two vendor
     disciplines. */
  exception: same(
    "Vendor remote access uses a persistent VPN path through a shared facility-management network — persistent rather than raised per session, and shared rather than dedicated to one discipline. Two vendor parties work over it on different scopes: the OEM on critical chiller controls, the integrator on supervisory control logic."
  ),
  findingLabel: same("What the review found"),
  /* L336, second and third sentences. */
  finding: same(
    "The route can reach an engineering workstation that has pathways toward BMS servers and selected mechanical-control zones. Security proposes removing vendor access."
  ),
  constraintLabel: same("Known constraints"),
  /* L336's objection — the reason "remove vendor access" is not an available
     answer on its own, and the constraint every candidate below is scored
     against. */
  constraint: same(
    "Critical Facilities objects: the vendor may be needed during a chiller fault, a controls instability event, or an overnight maintenance activity. Any answer is bounded by those moments, not only by the exposure it removes."
  )
};

/* ── Gate 2 · Proposed control ───────────────────────────────────────────── */

export const CONTROLS = {
  label: same("Proposed control"),
  caption: same("One candidate at a time, tested against the model"),
  chooseLabel: same("Candidate controls"),
  /**
   * PATTERN 2'S REMEDY (b), MANDATORY. Present at first paint, independent of the
   * selection, and sized to hold the column on its own — because a
   * Proposed-control column that is bare chrome until a user acts fails this
   * pattern regardless of its width. Each entry is sourced rather than written to
   * fill space: (1) is §7's definition of the Proposed-control panel read with
   * L382's own column header, (2) is L386's "which required protocols/flows
   * remain and which attack routes close" read against L336's objection, (3) is
   * Pattern 2's crosshair-reticle idiom in its own words, stating the fact that
   * half this table closes no route.
   *
   * REMEDY (a), PRE-SELECTING A CANDIDATE, IS DECLINED — on a content ground, not
   * an ergonomic one. L393 concludes in the source's own words that the answer is
   * four things done together rather than any one row, so a checked-by-default
   * radio would print a recommendation this scenario never makes.
   */
  fixed: [
    {
      term: same("What a candidate control is"),
      body: same(
        "A control inserted in the model, not in the facility: the routes it affects, the required flows it preserves, and the residual exposure it leaves. Selecting one re-evaluates every route on the canvas above. The model changes; the campus does not."
      )
    },
    {
      term: same("How residual exposure is read"),
      body: same(
        "Residual exposure is every route still reachable once the candidate is applied. A route can be preserved and residual at once — an emergency-support or reporting flow the site must keep that still carries exposure — and that overlap is the finding, not a modelling error."
      )
    },
    {
      term: same("The crosshair marker"),
      body: same(
        "A circled cross, drawn in P&ID convention, marks where the selected candidate is inserted on the shared canvas. Every node whose state differs from the baseline keeps a persistent amber outline for as long as that candidate is selected — including the three candidates here that close no route at all, because their stated value is consequence and common-mode update risk rather than reachability."
      )
    }
  ],
  evaluatesLabel: same("What the Twin tests"),
  outcomeLabel: same("Decision insight"),
  insertionLabel: same("Inserted at"),
  closesLabel: same("Routes closed"),
  preservesLabel: same("Required flows preserved"),
  residualLabel: same("Residual exposure"),
  noneClosedLabel: same("None — this candidate closes no route."),
  nonePreservedLabel: same("None — this candidate keeps no support or reporting flow open.")
};

/* ── Gate 3 · Decision output ────────────────────────────────────────────── */

/** L341–L361's three input blocks, in the brief's own grouping, order and
 *  wording. */
export const EVIDENCE_GROUPS: Array<{ group: Bilingual; items: string[] }> = [
  {
    group: same("Facility engineering evidence"),
    items: [
      "Mechanical P&IDs and sequence-of-operations narratives",
      "Chiller, tower, pump, valve, CRAH, CDU, and VFD relationships",
      "N+1 / 2N redundancy design and current capacity state",
      "Thermal limits, load profile, alarm thresholds, and escalation procedures",
      "MOPs, SOPs, EOPs, commissioning scripts, and maintenance windows",
      "Water-treatment and makeup-water dependencies"
    ]
  },
  {
    group: same("OT, BMS, and network evidence"),
    items: [
      "BMS servers, engineering workstations, controllers, field panels, and DCIM links",
      "Vendor VPN / remote-access gateway, jump hosts, identity, MFA, approval process",
      "VLANs, firewalls, routing, required BACnet/Modbus/OPC/control flows",
      "Controller firmware, configuration, backups, and support-tool dependencies",
      "Historian, alarms, SIEM, and out-of-band management connections"
    ]
  },
  {
    group: same("External and commercial evidence"),
    items: [
      "Utility-power and water-service dependencies",
      "OEM support contract and escalation time",
      "Spare controllers and lead times",
      "Customer capacity commitments and load-shed/relocation constraints",
      "Site-level energy and water reporting obligations"
    ]
  }
];

export const OUTPUT = {
  label: same("Decision output"),
  /* NOT "narrowest, densest" — that is the layout pattern describing itself, and
     an independent critique found build-spec narration leaking into
     customer-facing copy as its most damaging finding. */
  caption: same("What the model recommends, and what it does not claim"),
  /* L393's opening clause, which is this section's actual argument. */
  headlineLabel: same("Not “disconnect the vendor”, and not “trust the redundant chillers”"),
  recommendedLabel: same("Recommended sequence"),
  /**
   * L393's four instructions, split at its own clause boundaries. The sentence
   * renders whole beneath the gates as `RESULT`; this is the same four
   * instructions as a sequence, because the source states them in an order and
   * reading them as prose loses it. Nothing added, reworded or reordered.
   */
  recommended: [
    same("Remove persistent reachability"),
    same("Retain accountable emergency support"),
    same("Prove that segmentation preserves the required control flows"),
    same("Test updates so a shared maintenance action cannot consume cooling redundancy across the campus")
  ],
  evidenceLabel: same("Evidence needed"),
  windowLabel: same("Implementation window"),
  /* L388 states the staging itself — pilot, validate rollback, then sequence
     across redundancy trains — and L346 names the site's own MOPs, SOPs, EOPs,
     commissioning scripts and maintenance windows as the evidence that bounds
     when it can happen. */
  window: same(
    "Two windows, not one: the access redesign proceeds now, and controller and firmware work is piloted on one noncritical or isolated element, proved reversible, then sequenced across redundancy trains inside the maintenance windows the site already runs. The sequence is fixed; the date is not."
  ),
  validationLabel: same("Validation condition"),
  /* L393's own testable clauses — the two conditions deciding whether the
     modelled result held. */
  validation: same(
    "Segmentation is proved to preserve the required control flows, and a shared maintenance action is shown to be unable to consume cooling redundancy across the campus."
  ),
  notAssertedLabel: same("Not asserted by this scenario"),
  /* See the ONE HONEST GAP note in this file's header. */
  notAsserted: same(
    "A responsible role. This scenario assigns none, so none is printed here as though it had been decided."
  ),
  /* §7's claim-boundary rule for safety-sensitive contexts, applied in this
     sector's own words: L336 names Critical Facilities as the authority that
     objected, and L377 makes capacity the thing at stake. */
  approvalNote: same(
    "OXOT supports but does not replace engineering approval, safety assessment, Critical Facilities authority, or the site's own authority to return a train or a hall to service."
  )
};

/* L393, verbatim — the result message, rendered whole beneath the three gates. */
export const RESULT = same(
  "The decision is not “disconnect the vendor” or “trust the redundant chillers.” It is to remove persistent reachability, retain accountable emergency support, prove that segmentation preserves the required control flows, and test updates so a shared maintenance action cannot consume cooling redundancy across the campus."
);

/**
 * L395, verbatim.
 *
 * THE SOURCE'S OWN LINK IS NOT EMITTED. L395 closes on a bracketed reference to a
 * `ppl-ai-file-upload.s3.amazonaws` URL — an expiring pre-signed S3 link to
 * `OXOT-CDT-Product-Specification-V2.pdf`. That is a transient artifact of how the
 * brief was assembled, not a public address: it carries an `Expires` parameter and
 * a scoped security token, so shipping it would put a link on the site that dies.
 * The document it names is OXOT's own CDT product specification, and this site's
 * real page for that material is `/technical-specification`, so the citation
 * resolves there. Same resolution `content.architecture.ts` applied to the
 * identical marker at L191.
 *
 * `/technical-specification` RENDERS ENGLISH ONLY — `content.ts` states this in
 * data as `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY`. The consuming component must
 * apply the site's established gate, `locale === "en" ? href : PATHS.cdt2`, rather
 * than shipping an `nl` link into an EN-only page.
 */
export const CLOSING = {
  text: same(
    "This is exactly where a Cyber Digital Twin is stronger than a conventional asset inventory: it can represent the physical cooling chain, the management path, the actual network route, the redundancy model, the external water/power dependencies, and the customer-capacity consequence in one decision model."
  ),
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};
