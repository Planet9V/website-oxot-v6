/**
 * AIR-GAPPED DEPLOYMENT · CASE-STUDY PUBLICATION MODEL — CORPUS L219–L266,
 * verbatim.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * THESE TWO SECTIONS SHARE A FILE BECAUSE THEY SHARE A SUBJECT: what leaves the
 * customer's boundary. AIR_GAP governs what leaves it during an engagement
 * (nothing, in Island Mode); CASE_STUDIES governs what leaves it afterwards, in
 * public. Reading either alone makes the other look like boilerplate.
 *
 * AIR_GAP IS THE ONE SECTION THE BRIEF TREATS AS FIRST-CLASS. BRIEF L3 states
 * this page exists "to support and enhance the 'Air Gap' portion" of the
 * vertical, and BRIEF L96–L115 gives it its own headline, body and three modes
 * — the only section where the BRIEF and the CORPUS carry the same finished
 * copy. The CORPUS's fuller mode descriptions are what ship (its own docblock
 * records that they were cross-checked against `6_resources/
 * air-gapped_deployment.md`); the BRIEF's L115 adds one fact the CORPUS does
 * not carry, and it is kept below as `defaultPosture`.
 *
 * `caveat` IS NOT OPTIONAL AND IS NOT A DISCLAIMER TO SET IN SMALL PRINT. It
 * tells a defense buyer that an air gap is not automatically risk-free, on the
 * page selling air-gapped deployment. That is the sentence that makes the rest
 * of the section credible rather than a brochure claim. Render it in the
 * section, at body size, below the modes it qualifies.
 */
import { same } from "../registry";

/* ── Air-gapped deployment ──────────────────────────────────────────────── */

export const AIR_GAP = {
  /** CORPUS L220 = BRIEF L100. */
  h2: same("Air-gapped by design. Sovereign by operation."),
  /** CORPUS L221–L223 = BRIEF L102, identical wording. */
  body: same(
    "Deploy the Cyber Digital Twin inside your controlled environment. Build the model from approved engineering exports and evidence — without connecting to live controllers, actively scanning operational networks, or exporting sensitive operational data."
  ),
  /* CORPUS L224–L228, all three modes, both cells each. The BRIEF's L105–L113
     one-liners are the short forms of the same three.
     `id` is DOM identity, not copy — and these three ids match the deployment
     modes named in Visual Foundation Spec L520–L524, which is the Foundation
     Deliverable this section serves. */
  modes: [
    {
      id: "island",
      /** CORPUS L225. */
      name: same("Island Mode"),
      body: same(
        "Fully isolated deployment on customer-controlled infrastructure. No internet connection, no outbound telemetry, no direct access to PLCs, RTUs, controllers, or live OT networks."
      )
    },
    {
      id: "inbound-intelligence",
      /** CORPUS L226. */
      name: same("Inbound Intelligence Mode"),
      body: same(
        "Approved threat or vulnerability updates delivered through a one-way data diode — intelligence flows in; nothing customer-related flows out."
      )
    },
    {
      id: "dedicated-sovereign",
      /** CORPUS L227. */
      name: same("Dedicated Sovereign Instance"),
      body: same(
        "Single-tenant deployment within a customer-approved sovereign environment, aligned to classification and sovereignty requirements."
      )
    }
  ],
  /**
   * BRIEF L115, verbatim — THE ONE FACT THE BRIEF ADDS TO THIS SECTION and the
   * CORPUS does not carry: Island Mode is the default, not one option of three
   * presented neutrally. That is a real positioning statement for this
   * audience, so it is carried rather than dropped as redundant.
   *
   * A renderer that shows the three modes as equal peers is not wrong, but it
   * is losing this. Pairing it with the Island Mode entry is the intended use.
   */
  defaultPosture: same(
    "Island Mode is the default defense position: it is isolated, runs on customer-controlled ground, has no external dependency, and does not access the live control system."
  ),
  /* CORPUS L229–L235, all five steps, in source order — what the Twin does
     inside the boundary, once the model is built from approved exports. This is
     an ordered method, not a feature list: the model comes before the pathway
     trace, which comes before the change test, which comes before the
     prioritization, which comes before the evidence. */
  offline: [
    same(
      "Model the environment: facility/process model, assets, control logic, PLC/SCADA/HMI configurations, Purdue zones, OT topology, dependencies, safety/reliability context."
    ),
    same(
      "Trace cyber pathways through the imported topology, routes, segmentation rules, and observed/passively captured network flows."
    ),
    same(
      "Test a change — firewall, segmentation, patch, vendor-access, control-system, or procurement — virtually, before it touches the live environment."
    ),
    same("Prioritize decisions: NOW / NEXT / NEVER, based on consequence and reachability."),
    same(
      "Generate evidence: engineering views, risk decisions, BOMs, dependency maps, technical documentation, and traceable rationale for assurance or leadership review."
    )
  ],
  /**
   * CORPUS L236–L238, verbatim, including its own typographic quotes around
   * "Air-gapped". Mandatory on render — see this file's docblock.
   *
   * Its closing clause is also the principle this whole build runs on: OXOT
   * models pathways and consequences while "retaining source provenance and
   * showing unsourced fields as empty rather than invented." That is cited by
   * `content.sovereignModel.ts` as the reason its 42 combinations render empty.
   */
  caveat: same(
    "“Air-gapped” is not presented as automatically risk-free. Its effectiveness depends on the full operational boundary — removable media, contractor laptops, maintenance tooling, temporary connections, engineering workstations, supply-chain updates, and authorized cross-domain processes can all create pathways. OXOT's role is to model those pathways and their consequences, retaining source provenance and showing unsourced fields as empty rather than invented."
  )
};

/* ── Case-study publication model ───────────────────────────────────────── */

/**
 * NOTE WHAT THIS SECTION IS AND IS NOT. It is not a case-study index and it
 * contains no case studies. It is the publication RULES this vertical operates
 * under, plus ten candidate QUESTIONS a future study could answer. Nothing here
 * claims work was done for anyone.
 *
 * That distinction matters at render time: Pattern 8 (Case File Index,
 * OXOT_Layout_Styles.md) exists for real published studies and carries a
 * `PublicationStatus` per card. These ten are not studies and must never be
 * given a publication status, a customer, a date, or a result. If a builder
 * reaches for a card grid here, the cards are questions.
 */
export const CASE_STUDIES = {
  /** CORPUS L242. */
  h2: same("A stricter publication model for defense and government evidence."),
  /** CORPUS L243–L245. */
  intro: same(
    "The goal is to demonstrate realism without exposing sensitive architecture, operations, or customer identity."
  ),
  /* CORPUS L246–L253, all six rules, verbatim including the typographic quotes
     in the fifth. These are commitments about OXOT's own conduct, not
     aspirations — a renderer must not soften "Default to" or "No detailed" into
     marketing phrasing. BRIEF L51 is the one-line summary of this section. */
  rules: [
    same("Customer approval and classification/security review before publication."),
    same("Default to anonymized capability cases, not named systems."),
    same(
      "No detailed network topology, facility layouts, access-control rules, operating schedules, locations, vendor accounts, or recovery thresholds."
    ),
    same("Describe the decision, modeling method, and outcome — not sensitive system design."),
    same(
      "State scale only when approved, using bounded descriptors such as “multi-site estate” or “high-availability sovereign facility.”"
    ),
    same("Use synthetic diagrams and modified data values while preserving the logic of the decision.")
  ],
  /* CORPUS L254–L265, all ten categories, both cells each. Each is a QUESTION a
     study could answer — see this export's docblock.
     `id` is DOM identity, not copy. */
  categories: [
    {
      id: "sovereign-data-center-continuity",
      /** CORPUS L255. */
      name: same("Sovereign data-center continuity"),
      question: same(
        "Can a common BMS/EPMS, vendor, or cooling dependency compromise multiple resilient power/cooling paths?"
      )
    },
    {
      id: "base-energy-resilience",
      /** CORPUS L256. */
      name: same("Base energy resilience"),
      question: same("Which cyber, fuel, generator, and utility dependencies limit endurance during crisis?")
    },
    {
      id: "airfield-operational-support",
      /** CORPUS L257. */
      name: same("Airfield operational support"),
      question: same(
        "Which control, power, fuel, communications, and facility dependencies limit safe airfield operations?"
      )
    },
    {
      id: "port-military-mobility",
      /** CORPUS L258. */
      name: same("Port and military-mobility resilience"),
      question: same("What cyber and supply dependencies delay force movement through a port or logistics hub?")
    },
    {
      id: "secure-vendor-access-redesign",
      /** CORPUS L259. */
      name: same("Secure vendor-access redesign"),
      question: same(
        "How can OEM support remain available without persistent reachability to sensitive facilities OT?"
      )
    },
    {
      id: "high-risk-technology-transition",
      /** CORPUS L260. */
      name: same("High-risk technology transition"),
      question: same(
        "Which systems, spares, certificates, vendor tools, and support dependencies must be replaced or isolated first?"
      )
    },
    {
      id: "crisis-communications-continuity",
      /** CORPUS L261. */
      name: same("Crisis communications continuity"),
      question: same(
        "What happens when a telecom disruption coincides with a facility or identity-service issue?"
      )
    },
    {
      id: "defense-industrial-maintenance",
      /** CORPUS L262. */
      name: same("Defense industrial maintenance resilience"),
      question: same(
        "Which process, tooling, quality, supplier, and energy dependencies can interrupt readiness or replenishment?"
      )
    },
    {
      id: "civil-military-dependency-exercise",
      /** CORPUS L263. */
      name: same("Civil-military dependency exercise"),
      question: same(
        "What competing priorities emerge for fuel, power, water, roads, telecoms, and skilled personnel in a national crisis?"
      )
    },
    {
      id: "sovereign-cloud-isolation-boundary",
      /** CORPUS L264. */
      name: same("Sovereign cloud isolation boundary"),
      question: same(
        "Can facility support, identity, monitoring, or vendor operations cross a restricted workload boundary?"
      )
    }
  ]
};
