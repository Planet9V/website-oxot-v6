/**
 * S08 · REGULATORY AND STANDARDS CONTEXT — source L289–L313.
 *
 * Split out of `content.ts` for one hard reason: that file crossed 500 lines,
 * and this repository caps files there. Nothing else moved with it — the
 * strings are the same strings, transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md, and the split is along a
 * section boundary rather than an arbitrary line count, so a reader looking for
 * the regulatory matrix has one file to open.
 */
import { same } from "../registry";

/* ── S08 · Regulatory ───────────────────────────────────────────────────── */

/**
 * LINK HONESTY, VERIFIED AGAINST LIVE ROUTES. `/assurance/nis2` does not
 * exist — the real assurance routes are `iec-62443`, `cyber-resilience-act`,
 * `iec-62278-2`, `ts-50701`, `evidence-data-provenance` and the `/assurance`
 * index. So NIS2 links to `/assurance` and IEC 62443 to `/assurance/iec-62443`;
 * the other seven rows link nowhere. Two of nine is an honest asymmetry and is
 * NOT evened out with placeholder links, which the Foundation Spec's acceptance
 * criteria forbid outright.
 */
export const REGULATORY = {
  h2: same("Support safe-water and environmental-resilience evidence from the same operating model."),
  lead: same(
    "OXOT does not promise automatic compliance. The Twin supports risk assessment, evidence creation, traceability, scenario testing, recovery planning, and decision documentation."
  ),
  tableCaption: same("Frameworks and obligations"),
  headings: {
    framework: same("Framework / obligation"),
    relevance: same("Sector relevance"),
    support: same("How OXOT supports the work")
  },
  rows: [
    {
      framework: "NIS2",
      relevance: same(
        "Drinking water and wastewater are included in the Directive's high-criticality scope, subject to entity thresholds, national transposition, and Member State implementation."
      ),
      support: same(
        "Supports cyber risk-management evidence, asset/dependency visibility, supply-chain analysis, governance reporting, and resilience-oriented risk treatment."
      ),
      href: "assurance" as const
    },
    {
      framework: "CER Directive",
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
      relevance: same(
        "Focuses on water quality, risk-based safety, monitoring, and consumer protection; it does not itself create a standalone cybersecurity regime."
      ),
      support: same("Connects OT and cyber scenarios to treatment and water-quality operational evidence."),
      href: null
    },
    {
      framework: "Urban Wastewater Treatment Directive",
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
      relevance: same(
        "The primary IACS cybersecurity standard for treatment facilities, SCADA systems, remote telemetry, and system-integration work."
      ),
      support: same(
        "Supports system definition, zones/conduits, reachability, risk decisions, and traceable security evidence."
      ),
      href: "iec62443" as const
    },
    {
      framework: "NIST SP 800-82 Rev. 3",
      relevance: same("Widely used OT/ICS guidance, especially for US utilities and multinational programs."),
      support: same(
        "Supports architecture, asset context, segmentation, access control, recovery, and safe implementation planning."
      ),
      href: null
    },
    {
      framework: "US SDWA / AWIA Section 1433",
      relevance: same(
        "Community water systems serving more than 3,300 people must conduct risk and resilience assessments that include automated-system cybersecurity, develop ERPs, and review/certify them at least every five years."
      ),
      support: same(
        "Helps create a facility-specific evidence base for the cyber portion of risk/resilience assessment and emergency-response planning."
      ),
      href: null
    },
    {
      framework: "State drinking-water sanitary surveys",
      relevance: same(
        "US states must evaluate the adequacy of OT cybersecurity where it is part of a required public-water-system sanitary survey component."
      ),
      support: same("Provides OT architecture, control-path, asset, process, and documented risk-treatment evidence."),
      href: null
    },
    {
      framework: "EPA cyber guidance and response planning",
      relevance: same(
        "EPA recommends IT/OT risk and resilience evaluation, mitigation planning, and response preparation across water-system types."
      ),
      support: same(
        "Supports incident scenarios, recovery dependencies, critical-asset prioritization, and decision documentation."
      ),
      href: null
    }
  ],
  notes: [
    same(
      "NIS2 explicitly includes drinking water and wastewater entities, while ENISA notes that both sectors are subject to NIS2 baseline cybersecurity objectives."
    ),
    same(
      "In the United States, SDWA Section 1433 requires community water systems serving more than 3,300 people to include cybersecurity in their risk and resilience assessments and certify completion of the assessment and emergency-response planning; reassessment and ERP review are required every five years."
    ),
    same(
      "EPA also recommends all water and wastewater operators assess the resilience of their IT and OT systems, develop a mitigation plan for critical operations, and address cybersecurity in risk/resilience and emergency-response work."
    )
  ]
};
