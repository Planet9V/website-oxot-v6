/**
 * S09 · REGULATORY AND STANDARDS CONTEXT — source new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md, the "Regulatory and
 * standards context" section (L293–L317 in that file). Nine rows, three
 * closing notes, transcribed.
 *
 * NINE ROWS, NOT EIGHT. The wave brief for this section says eight; the source
 * table has nine, and the source wins. Counted: NIS2, CER Directive, EU
 * Drinking Water Directive, Urban Wastewater Treatment Directive, IEC 62443,
 * NIST SP 800-82 Rev. 3, US SDWA / AWIA Section 1433, state drinking-water
 * sanitary surveys, EPA cyber guidance and response planning. Dropping one to
 * hit a count would delete a real obligation from a regulatory table.
 *
 * THE CLAIM BOUNDARY IS THE POINT OF THIS SECTION, not a disclaimer attached to
 * it. The brief states it as an instruction to whoever builds the page — "Do
 * not promise automatic compliance. The Twin supports risk assessment, evidence
 * creation, traceability, scenario testing, recovery planning, and decision
 * documentation." `lead` below carries that boundary in the site's own voice
 * rather than reprinting the instruction, which on a public page reads as a
 * note to the author. Every `support` string is a verb the brief itself uses —
 * supports, connects, helps create, provides. None of them is "ensures" or
 * "guarantees", and none may become one.
 *
 * `kind` IS A REAL DISTINCTION, NOT DECORATION. Whether a row is binding law, a
 * consensus standard, or an agency recommendation changes what a reader has to
 * do about it, and the source states it row by row ("the Directive's ...
 * scope", "the primary IACS cybersecurity standard", "EPA recommends", "must
 * conduct"). Printing it beside the name is the one thing a nine-row wall of
 * prose otherwise makes the reader infer sentence by sentence.
 *
 * LINK DESTINATIONS, RESOLVED AGAINST REAL ROUTES. Only two of the nine have a
 * page on this site: NIS2 → `/assurance` (the index; `/assurance/nis2` does not
 * exist — the assurance set is IEC 62443, Cyber Resilience Act, TS 50701, IEC
 * 62278-2 and evidence/data provenance) and IEC 62443 → `/assurance/iec-62443`.
 * The other seven link nowhere. That asymmetry is honest; placeholder links are
 * forbidden outright by the Foundation Spec's acceptance criteria.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/** The two assurance destinations that actually exist. See the file header. */
export type RegulatoryHref = "assurance" | "iec62443";

export interface RegulatoryRow {
  /** Untranslated: framework names are proper nouns in both locales. */
  framework: string;
  /** Binding law, consensus standard, or agency recommendation. */
  kind: Bilingual;
  relevance: Bilingual;
  support: Bilingual;
  href: RegulatoryHref | null;
}

export const REGULATORY_SECTION = {
  lead: same(
    "Compliance belongs to the operator, not to a model — OXOT does not promise automatic compliance. What the Twin contributes is the work behind each obligation below: risk assessment, evidence creation, traceability, scenario testing, recovery planning, and decision documentation."
  ),
  caption: same(
    "Nine frameworks and obligations across EU law, international standards, and US federal and state programmes."
  ),
  headings: {
    framework: same("Framework / obligation"),
    relevance: same("Sector relevance"),
    support: same("How OXOT supports the work")
  },
  rows: [
    {
      framework: "NIS2",
      kind: same("EU directive"),
      relevance: same(
        "Drinking water and wastewater are included in the Directive's high-criticality scope, subject to entity thresholds, national transposition, and Member State implementation."
      ),
      support: same(
        "Supports cyber risk-management evidence, asset and dependency visibility, supply-chain analysis, governance reporting, and resilience-oriented risk treatment."
      ),
      href: "assurance"
    },
    {
      framework: "CER Directive",
      kind: same("EU directive"),
      relevance: same(
        "Drinking water and wastewater are within the Critical Entities Resilience scope; it focuses on resilience to relevant natural and human-made risks."
      ),
      support: same(
        "Supports a joined-up view of cyber, power, telecoms, weather, supplier, operational, and physical dependencies."
      ),
      href: null
    },
    {
      framework: "EU Drinking Water Directive",
      kind: same("EU directive"),
      relevance: same(
        "Focuses on water quality, risk-based safety, monitoring, and consumer protection; it does not itself create a standalone cybersecurity regime."
      ),
      support: same(
        "Connects OT and cyber scenarios to treatment and water-quality operational evidence."
      ),
      href: null
    },
    {
      framework: "Urban Wastewater Treatment Directive",
      kind: same("EU directive"),
      relevance: same(
        "Drives treatment, collection, discharge, monitoring, and environmental requirements; cybersecurity implications arise when OT disruption affects these duties."
      ),
      support: same(
        "Connects cyber pathways to process performance, effluent quality, pumping, overflow, and reporting consequences."
      ),
      href: null
    },
    {
      framework: "IEC 62443",
      kind: same("International standard"),
      relevance: same(
        "The primary IACS cybersecurity standard for treatment facilities, SCADA systems, remote telemetry, and system-integration work."
      ),
      support: same(
        "Supports system definition, zones and conduits, reachability, risk decisions, and traceable security evidence."
      ),
      href: "iec62443"
    },
    {
      framework: "NIST SP 800-82 Rev. 3",
      kind: same("US guidance"),
      relevance: same(
        "Widely used OT/ICS guidance, especially for US utilities and multinational programs."
      ),
      support: same(
        "Supports architecture, asset context, segmentation, access control, recovery, and safe implementation planning."
      ),
      href: null
    },
    {
      framework: "US SDWA / AWIA Section 1433",
      kind: same("US statute"),
      relevance: same(
        "Community water systems serving more than 3,300 people must conduct risk and resilience assessments that include automated-system cybersecurity, develop emergency response plans, and review and certify them at least every five years."
      ),
      support: same(
        "Helps create a facility-specific evidence base for the cyber portion of risk and resilience assessment and emergency-response planning."
      ),
      href: null
    },
    {
      framework: "State drinking-water sanitary surveys",
      kind: same("US state programme"),
      relevance: same(
        "US states must evaluate the adequacy of OT cybersecurity where it is part of a required public-water-system sanitary survey component."
      ),
      support: same(
        "Provides OT architecture, control-path, asset, process, and documented risk-treatment evidence."
      ),
      href: null
    },
    {
      framework: "EPA cyber guidance and response planning",
      kind: same("US guidance"),
      relevance: same(
        "EPA recommends IT/OT risk and resilience evaluation, mitigation planning, and response preparation across water-system types."
      ),
      support: same(
        "Supports incident scenarios, recovery dependencies, critical-asset prioritization, and decision documentation."
      ),
      href: null
    }
  ] satisfies readonly RegulatoryRow[],
  /* The brief's three closing paragraphs (L309-L317), each of which cites a
     primary source in the brief itself: EUR-Lex for NIS2 scope, and two EPA
     documents for the SDWA and guidance rows. */
  notes: [
    same(
      "NIS2 explicitly includes drinking water and wastewater entities, and ENISA notes that both sectors are subject to NIS2 baseline cybersecurity objectives."
    ),
    same(
      "In the United States, SDWA Section 1433 requires community water systems serving more than 3,300 people to include cybersecurity in their risk and resilience assessments, and to certify completion of the assessment and of emergency-response planning; reassessment and ERP review are required every five years."
    ),
    same(
      "EPA also recommends that all water and wastewater operators assess the resilience of their IT and OT systems, develop a mitigation plan for critical operations, and address cybersecurity in risk, resilience, and emergency-response work."
    )
  ]
};
