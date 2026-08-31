/**
 * S08 · REGULATORY AND STANDARDS CONTEXT — copy slice for
 * `/industries/energy-utilities-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_energy.md, section "Regulatory and standards context", L259–279.
 * Every value below carries the source line it came from. Nothing is invented.
 *
 * THE GUARDRAIL AT L265 IS PAGE COPY HERE, NOT A NOTE TO THE BUILDER. The
 * source writes it as a directive to whoever writes the section ("Do not claim
 * automatic compliance…"). Rendering that sentence at a visitor in the second
 * person would be incoherent, so it is transposed into OXOT's own voice — the
 * subject changes and nothing else. No noun is added, dropped or softened:
 *   L265 "Do not claim automatic compliance, certification, or audit approval."
 *        → "OXOT does not claim automatic compliance, certification, or audit
 *           approval."
 *   L265 "Position the Twin as a source of evidence, risk context,
 *        traceability, scenario analysis, and documentation support."
 *        → "The Twin is a source of evidence, risk context, traceability,
 *           scenario analysis, and documentation support."
 * It is the section LEAD — the first prose under the h2 and above the matrix —
 * because a table of seven regulatory instruments is exactly the place a reader
 * infers a compliance claim, and the disclaimer has to arrive before the table
 * rather than after it.
 *
 * L277 IS SPLIT ACROSS TWO SECTIONS, AND THIS FILE HOLDS THE HALF S01 DOES NOT.
 * `content.reality.ts` already carries the instrument's formal designation
 * (Commission Delegated Regulation (EU) 2024/1366) and its binding /
 * directly-applicable status, lifted from L277 because S01's citation panel
 * stands on the same instrument and L74 names it only informally. Repeating
 * those two values here would present them twice on one page as though each
 * were their first statement. What remains — L277's scope sentence, the one
 * naming what the code actually establishes — is transcribed below with "It"
 * resolved to the instrument's name, since it no longer follows the sentence it
 * originally referred back to.
 *
 * BOTH URLS ARE THE BRIEF'S OWN LINK TARGETS, and both source labels are the
 * brief's own visible link text (`[energy.ec.europa](…)`, `[nerc](…)`) rather
 * than re-titled into something tidier. The EU URL is imported from
 * `content.reality.ts` instead of retyped, so the page cannot end up linking two
 * different strings for one citation. The NERC URL was verified live (HTTP 200,
 * no redirect) on 2026-08-26.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation,
 * not a claim that this text is correct Dutch.
 */
import { same } from "../registry";
import { EU_NETWORK_CODE_URL } from "./content.reality";

/** Source L279, verbatim from the markdown link target. */
export const NERC_CIP_013_URL = "https://www.nerc.com/standards/reliability-standards/cip/cip-013-3";

export const REGULATORY = {
  /** Source L259, the section's own name in the brief. */
  datumLabel: same("Regulatory and standards context"),

  /** Source L263. */
  h2: same("Use one model to support reliability, security, and assurance work."),

  /** Source L265, both sentences, transposed out of the second person — see
   *  this file's header for the exact before/after. */
  guardrail: same(
    "OXOT does not claim automatic compliance, certification, or audit approval. The Twin is a source of evidence, risk context, traceability, scenario analysis, and documentation support."
  ),

  /* Names the matrix and what its columns mean, which the lead above it does
     not. The count is a fact about the table (L269–L275), not a claim. */
  caption: same(
    "Seven frameworks and requirements — what each covers in energy and utilities, and what the Twin contributes to the work."
  ),

  /** Source L267, verbatim. */
  head: [
    same("Framework / requirement"),
    same("Relevance to energy and utilities"),
    same("How OXOT supports the work")
  ],

  /* Source L269–L275 — all seven rows, all three cells, verbatim. The source's
     own curly quotes around "highly critical" (L272) are kept as written. */
  rows: [
    {
      /** Source L269. */
      framework: same("IEC 62443"),
      relevance: same(
        "Core cybersecurity framework for industrial automation and control systems; useful across generation, substations, control centers, and utility process environments"
      ),
      support: same(
        "Supports system definition, zones/conduits, reachability, asset context, risk decisions, and security-evidence workflows"
      )
    },
    {
      /** Source L270. */
      framework: same("NIST SP 800-82 Rev. 3"),
      relevance: same(
        "US-oriented and multinational OT/ICS guidance for SCADA, PLC, DCS, and operational environments"
      ),
      support: same(
        "Helps establish OT architecture, critical dependencies, segmentation/risk decisions, and safe lifecycle improvement planning"
      )
    },
    {
      /** Source L271. */
      framework: same("NERC CIP"),
      relevance: same(
        "Mandatory reliability and cybersecurity standards for registered North American BES entities; includes supply-chain risk management and remote-access controls"
      ),
      support: same(
        "Supports asset/dependency mapping, evidence traceability, supplier and remote-access analysis, change scenarios, and defensible risk decisions"
      )
    },
    {
      /** Source L272. */
      framework: same("EU NIS2"),
      relevance: same(
        "Energy is an Annex I “highly critical” sector; applicability and enforcement depend on entity scope and national implementation"
      ),
      support: same(
        "Supports risk-management evidence, supply-chain visibility, incident/resilience context, governance reporting, and risk treatment"
      )
    },
    {
      /** Source L273. */
      framework: same("EU Electricity Cybersecurity Network Code"),
      relevance: same(
        "Directly applicable EU regulation for entities identified as high- or critical-impact in relation to cross-border electricity flows"
      ),
      support: same(
        "Supports recurring risk assessment, identification of critical digital processes and dependencies, mitigation analysis, monitoring, reporting, and crisis-planning evidence"
      )
    },
    {
      /** Source L274. */
      framework: same("ISO 27001 / NIST CSF 2.0"),
      relevance: same(
        "Enterprise governance and risk frameworks often operate alongside OT-specific requirements"
      ),
      support: same("Supplies a plant/site-specific OT evidence layer for broader governance and assurance")
    },
    {
      /** Source L275. */
      framework: same("Functional safety standards"),
      relevance: same(
        "Depending on facility type, safety lifecycle standards remain central to protection and safe-operation requirements"
      ),
      support: same(
        "Connects cyber pathways to physical and safety-engineering context; it does not replace safety studies or safety-lifecycle responsibilities"
      )
    }
  ],

  /* The section's two cited closing paragraphs. Each is labelled with the
     jurisdiction it speaks for, because neither applies to every reader of this
     page — which the source's own opening clauses ("The EU…", "For North
     American BES organizations…") already say in prose. */
  notes: [
    {
      /** Source L277 — the scope sentence only; see this file's header for why
       *  the designation and status clauses are not repeated here. */
      jurisdiction: same("European Union"),
      body: same(
        "The EU Electricity Cybersecurity Network Code establishes sector-specific rules for cybersecurity aspects of cross-border electricity flows, including minimum requirements, planning, monitoring, reporting, crisis management, and recurrent risk assessments."
      ),
      sourceLabel: same("energy.ec.europa"),
      href: EU_NETWORK_CODE_URL
    },
    {
      /** Source L279, verbatim, less its trailing citation marker. */
      jurisdiction: same("North America"),
      body: same(
        "For North American BES organizations, NERC CIP-013’s stated purpose is to mitigate supply-chain cybersecurity risks to reliable operation of the Bulk Electric System; NERC is currently progressing a CIP-013-4 supply-chain risk-management project."
      ),
      sourceLabel: same("nerc"),
      href: NERC_CIP_013_URL
    }
  ]
} as const;
