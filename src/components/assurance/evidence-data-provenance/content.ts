/**
 * EVIDENCE & DATA PROVENANCE — narrative content, transcribed from
 * new_material_source/1_website_layout_v4/4_assurance/
 * assurance_evidence_data_provenance.md, which is finished copy rather
 * than an outline. The source file's own ASCII `text` blocks are NOT
 * reprinted as preformatted text: each one is a chain, ladder or tree,
 * and is carried here as structured data so the page can render it as a
 * real diagram (EvidenceChain.tsx, DecisionRecordTree.tsx).
 *
 * The tabular material lives in ./content-tables.ts — seven tables of ten
 * rows apiece would push this file past the 500-line limit on its own.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English
 * placeholder pending translation, not a claim that it is correct Dutch.
 *
 * NOT A REGULATION PAGE. The other four /assurance children each describe
 * one external regime (IEC 62443, CRA, TS 50701, IEC 62278-2). This one
 * describes a cross-cutting OXOT capability — how any of those four gets
 * its evidence — so it carries no obligation dates, no scope tests and no
 * conformity language, and the framework table near the end points AT the
 * other four rather than competing with them.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "Evidence & Data Provenance for OT, Product and Railway Assurance",
  description:
    "Every OXOT Cyber Digital Twin output is traceable to evidence, assumptions, sources, and model logic. Connect engineering data, asset records, safety evidence, product BOMs, suppliers, cyber pathways, decisions, and change history."
};

export const HERO = {
  kicker: same("Assurance / Cross-cutting capability"),
  h1: same("Every number should be traceable to its source — or visibly absent."),
  lead: same(
    "OXOT's Cyber Digital Twin is not a black box that converts incomplete data into confident-looking answers."
  ),
  body: same(
    "It is an evidence model: each asset, dependency, pathway, risk scenario, safety assumption, supplier relationship, control decision, and calculation can be connected to its source, method, owner, and review state. Where evidence is absent, the gap should remain visible."
  ),
  ctaPrimary: same("Discuss an evidence model"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  /* The source file's opening `text` block, six rungs top to bottom. */
  chain: [
    same("Source evidence"),
    same("Modelled system, product, or railway environment"),
    same("Pathway, dependency, consequence, or safety analysis"),
    same("Control and decision rationale"),
    same("Framework-oriented evidence output"),
    same("Change history, review, and accountability")
  ],
  pullQuote: same(
    "No fabricated certainty. No unexplained score. No evidence detached from the system it describes."
  )
};

export const WHY = {
  h2: same("Why provenance matters"),
  sub: same("The problem is not a lack of documents. It is a lack of connection."),
  intro: same("Critical environments typically have extensive documentation:"),
  documents: [
    same("P&IDs, single-line diagrams, interlocking diagrams, system descriptions, drawings, and architecture records."),
    same("PLC, SCADA, HMI, RTU, relay, controller, firmware, and configuration exports."),
    same("Asset registers, network diagrams, firewall rules, packet captures, and remote-access procedures."),
    same("FMECA, hazard logs, HAZOP material, RAMS records, safety requirements, and degraded-mode procedures."),
    same("Product architecture, SBOMs, HBOMs, certificate records, software-release data, and vulnerability records."),
    same("Supplier contracts, service agreements, maintenance procedures, support obligations, and spare-part information."),
    same("Incident reports, threat intelligence, public advisories, geopolitical context, and external risk data."),
    same("Audit reports, compliance evidence, risk registers, test reports, approvals, and change records.")
  ],
  questionIntro: same("But when a decision is needed, organizations often cannot answer:"),
  questions: [
    same("Which version of this document applies to the live system?"),
    same("Which asset, product release, interface, or operating assumption does it describe?"),
    same("What evidence supports this risk conclusion?"),
    same("Which control was selected, and what pathway does it actually close?"),
    same("What changed since the last assessment?"),
    same("Which values are sourced facts, which are assumptions, and which are model calculations?"),
    same("What evidence is missing?")
  ],
  close: same(
    "The Cyber Digital Twin is designed to turn a document estate into a traceable decision model."
  )
};

export const MODEL = {
  h2: same("The OXOT evidence model"),
  sub: same("From source record to accountable decision."),
  stages: [
    {
      title: same("Source evidence"),
      terms: ["Engineering record", "Configuration export", "Product release", "Safety record", "Supplier document", "Approved intelligence source"]
    },
    {
      title: same("Model object"),
      terms: ["Asset", "Component", "Function", "Interface", "Zone", "Conduit", "Hazard", "Requirement", "Supplier", "Procedure", "Control"]
    },
    {
      title: same("Relationship"),
      terms: ["Depends on", "Communicates with", "Implements", "Supports", "Reaches", "Mitigates", "Verifies", "Validates", "Supersedes"]
    },
    {
      title: same("Analysis"),
      terms: ["Attack path", "Dependency cascade", "Hazard scenario", "Product vulnerability impact", "Control simulation", "Investment comparison"]
    },
    {
      title: same("Decision"),
      terms: ["Implement", "Validate", "Phase", "Defer", "Accept", "Replace", "Monitor"]
    },
    {
      title: same("Evidence output"),
      terms: ["System view", "BOM", "Risk record", "Safety trace", "Technical-file section", "Framework evidence", "Engineering report", "Executive decision brief"]
    },
    {
      title: same("Change and review"),
      terms: ["New version", "Configuration drift", "Supplier change", "New vulnerability", "Altered route", "Changed safety assumption", "Evidence expiry"]
    }
  ],
  reverseHead: same("Each conclusion should be navigable in reverse"),
  reverse: [
    same("Board-level output"),
    same("Risk or safety decision"),
    same("Control rationale"),
    same("Pathway / dependency / consequence"),
    same("Model objects and assumptions"),
    same("Original evidence artifacts")
  ],
  glassBox: same(
    "The OXOT specification describes this as a glass-box approach: outputs drill back to the component and relevant source, while evidence is grounded in customer engineering data and cited external information."
  )
};

export const PRINCIPLES = {
  h2: same("Evidence principles"),
  sub: same("The rules that keep the model honest."),
  footnote: same(
    "These principles reflect OXOT's documented data discipline: grounding first, no fabrication, null over zero, and citations stored with external values."
  )
};

export const SOURCES = {
  h2: same("Evidence sources"),
  sub: same("OXOT starts with the records that already describe the real environment."),
  intro: same(
    "The Cyber Digital Twin can ingest or link to approved source evidence across multiple domains."
  ),
  footnote: same(
    "OXOT's documented ingestion model includes P&ID extraction, DEXPI 2.0, control-system configuration, topology and passive flow evidence, industrial protocols, CycloneDX, FMECA, hazard records, SCIL/RCIL, RAMS, BOMs, and external intelligence."
  )
};

export const CONFIDENCE = {
  h2: same("Source confidence and quality"),
  sub: same("Not all evidence has the same authority."),
  intro: same(
    "A mature evidence model should retain not only a document link, but the quality and status of the source. Each evidence item can be assessed using a practical hierarchy."
  ),
  gapHead: same("Evidence gap model"),
  /* Five descending rungs. The last is rendered as an empty, dashed slot
     rather than a filled one — "null over zero" made literal rather than
     asserted in prose. */
  gap: [
    same("Known and verified"),
    same("Known but awaiting validation"),
    same("Sourced external context"),
    same("Approved assumption"),
    same("Unknown / missing")
  ],
  gapIntro: same("The model should make evidence gaps actionable:"),
  gapQuestions: [
    same("Which high-consequence assets lack a current configuration baseline?"),
    same("Which safety-relevant interfaces have no verified network evidence?"),
    same("Which product releases lack a complete SBOM?"),
    same("Which critical suppliers have no documented support, spares, or lifecycle information?"),
    same("Which recovery steps depend on an unvalidated procedure?"),
    same("Which risk assumptions have expired or need a new owner review?")
  ],
  pullQuote: same(
    "The absence of evidence is not evidence of safety. It is a decision-relevant gap."
  )
};

export const TYPES = {
  h2: same("Evidence types in the model"),
  sub: same("Fact, assumption, analysis, and decision must remain separate."),
  intro: same(
    "One of the most important design rules is to prevent derived statements from looking like facts. One worked situation, read one layer at a time — each statement carries its own type, and the types do not merge:"
  ),
  strip: [
    { tag: same("Fact"), body: same("A signed PLC configuration identifies firmware version X.") },
    { tag: same("External fact"), body: same("A published advisory identifies CVE-Y as affecting version X.") },
    { tag: same("Model relationship"), body: same("The PLC supports this process function and is reachable through this route.") },
    { tag: same("Assumption"), body: same("The maintenance route is assumed active until confirmed by network evidence.") },
    { tag: same("Calculation"), body: same("The modeled pathway produces a defined risk or loss range.") },
    { tag: same("Decision"), body: same("Broker vendor access now; reassess after the planned shutdown.") }
  ],
  close: same(
    "This separation is essential for credible IEC 62443, CRA, TS 50701, and IEC 62278-2:2025 evidence."
  )
};

export const DRILL = {
  h2: same("Drillable calculations"),
  sub: same("A board figure should lead back to the component and source."),
  intro: same(
    "OXOT can produce summarized outputs for leadership, but they should remain explainable. Every summary is the top of a chain that runs down to an artifact:"
  ),
  chain: [
    same("Consequence Index, risk trend, or investment decision"),
    same("System, site, product, or railway function"),
    same("Relevant scenario or pathway"),
    same("Assets, components, interfaces, and dependencies"),
    same("Engineering / safety / product / supplier context"),
    same("Source artifacts, citations, assumptions, and calculation method")
  ],
  examplesHead: same("Two worked drill-downs"),
  examplesNote: same(
    "Illustrative decisions — no customer data. Each opens to its own trace, top decision down to the evidence behind it."
  ),
  examples: [
    {
      id: "rail",
      label: same("Rail safety and cybersecurity decision"),
      summary: same("Redesign remote signaling-vendor access."),
      steps: [
        { label: same("Decision"), body: same("Redesign remote signaling-vendor access.") },
        { label: same("Why"), body: same("The access route can reach a signaling engineering workstation.") },
        { label: same("Operational and safety context"), body: same("The workstation supports configuration and recovery for an interlocking zone.") },
        { label: same("Safety assumption"), body: same("Only authorized, validated, and traceable changes can affect route setting.") },
        { label: same("Control"), body: same("MFA, named accounts, approval, time-limited access, recording, segmentation, and configuration validation.") },
        { label: same("Evidence"), body: same("System description · topology export · access procedure · hazard/RAMS record · vendor support contract · test/validation record") }
      ]
    },
    {
      id: "cra",
      label: same("CRA product decision"),
      summary: same("Issue a firmware update and disable a legacy management service by default."),
      steps: [
        { label: same("Decision"), body: same("Issue a firmware update and disable a legacy management service by default.") },
        { label: same("Why"), body: same("A disclosed component vulnerability affects selected firmware releases.") },
        { label: same("Product context"), body: same("The service is reachable through a management interface in common deployments.") },
        { label: same("Treatment"), body: same("Update affected component, change default configuration, publish customer guidance, track affected versions.") },
        { label: same("Evidence"), body: same("SBOM · firmware manifest · architecture · advisory · test record · release note · update procedure · PSIRT decision record") }
      ]
    }
  ],
  footnote: same(
    "The OXOT specification states that its financial and risk outputs can drill from an organizational result down to the component and source filing behind it."
  )
};

export const CHANGE = {
  h2: same("Change history and evidence deltas"),
  sub: same("Assurance begins to fail when the system changes faster than the documentation."),
  intro: same("The Cyber Digital Twin should treat each relevant change as a new evidence event."),
  pipeline: [
    same("Changed asset, component, firmware, supplier, configuration, network route, certificate, procedure, operating mode, or external condition"),
    same("Updated model state"),
    same("Affected pathways, dependencies, hazards, controls, requirements, or evidence"),
    same("Visible risk and documentation delta"),
    same("Review, approval, validation, or remediation trigger")
  ],
  triggersHead: same("Common change triggers"),
  reasonsHead: same("The three reasons an output changes"),
  reasons: [
    { title: same("You changed something"), body: same("A control, configuration, component, supplier, or operating procedure changed.") },
    { title: same("The environment changed"), body: same("A new asset, undocumented drift, lifecycle change, dependency, or configuration difference appeared.") },
    { title: same("The world changed"), body: same("A vulnerability, exploited threat, supplier event, geopolitical condition, market condition, or external disruption changed the context.") }
  ],
  footnote: same(
    "The Twin is designed to regenerate BOMs, risk deltas, and technical-file sections as differences in the underlying model occur."
  )
};

export const FRAMEWORKS = {
  h2: same("Provenance across assurance frameworks"),
  sub: same("One evidence foundation, different proof obligations."),
  footnote: same(
    "IEC 62443 system design centers on the system under consideration, zones and conduits, risk assessment, and target security levels; CRA manufacturers must maintain technical documentation; and railway safety work depends on structured system, hazard, requirement, and evidence traceability."
  )
};

export const ACCOUNTABILITY = {
  h2: same("Human accountability"),
  sub: same("The model supports judgment. It does not replace it."),
  intro: same(
    "A trustworthy evidence system makes responsible human decisions more visible — not less. Every significant modelled decision should be capable of carrying:"
  ),
  recordRoot: same("Decision"),
  record: [
    same("Decision owner"),
    same("Approver"),
    same("Engineering / security / safety reviewer"),
    same("Evidence sources"),
    same("Assumptions"),
    same("Applicable framework or requirement"),
    same("Selected treatment"),
    same("Residual risk or limitation"),
    same("Review date"),
    same("Expiry or reassessment trigger"),
    same("Change history")
  ],
  essentialIntro: same("This is essential for:"),
  essential: [
    same("Risk acceptance."),
    same("Deferred remediation."),
    same("Safety assumption management."),
    same("Cybersecurity exception decisions."),
    same("Supplier-risk treatment."),
    same("Product-release decisions."),
    same("CRA vulnerability handling."),
    same("Railway change and return-to-service decisions."),
    same("Engineering-control validation."),
    same("Audit, regulator, customer, or board review.")
  ],
  pullQuote: same("The Twin can show the reasoning. The accountable organization still owns the decision.")
};

export const SOVEREIGNTY = {
  h2: same("Data sovereignty and sensitive evidence"),
  sub: same("Evidence can be sensitive even when the model is not connected to the live system."),
  intro: same(
    "For defense, government, critical infrastructure, regulated products, and sensitive industrial environments, the Twin may contain:"
  ),
  sensitive: [
    same("Network topology and segmentation design."),
    same("Safety-related system and engineering information."),
    same("Vulnerability and configuration data."),
    same("Supplier, component, and support dependencies."),
    same("Operational procedures and recovery plans."),
    same("Critical infrastructure location or capacity information."),
    same("Product intellectual property."),
    same("Customer, operational, or restricted information.")
  ],
  modesIntro: same("OXOT supports deployment options designed for sensitive environments:"),
  footnote: same(
    "All documented options are passive-first: no agents on PLCs, RTUs, or controllers, and no active scanning of the process network."
  )
};

export const NOT_CLAIMED = {
  h2: same("What OXOT does not claim"),
  sub: same("Provenance is not automatic conformity."),
  intro: same(
    "OXOT supports source-grounded modeling, traceability, evidence organization, risk analysis, control simulation, documentation workflows, and accountable decision records. OXOT does not:"
  ),
  items: [
    same("Certify a system, product, railway application, organization, or evidence package."),
    same("Guarantee regulatory or framework conformity."),
    same("Act as a notified body, regulator, independent safety assessor, railway safety authority, legal adviser, insurer, or rating agency."),
    same("Determine CRA scope, legal applicability, product classification, CE-marking requirements, or conformity-assessment route."),
    same("Determine safety acceptance, assign SILs, authorize a railway system, or replace a hazard-log owner."),
    same("Convert incomplete evidence into a verified conclusion."),
    same("Treat an unverified source, external intelligence input, or model assumption as an observed fact.")
  ],
  close: same(
    "The model can show what is known, what is assumed, what is calculated, what is missing, and who approved the resulting decision. That is its value."
  )
};

export const FINAL_CTA = {
  h2: same("Start with one decision that needs stronger evidence."),
  body: same(
    "Bring a system description, P&ID, network topology, asset register, PLC or SCADA export, hazard-log extract, RAMS requirement, product architecture, SBOM, firmware inventory, supplier record, vulnerability question, or change proposal."
  ),
  bodyTwo: same(
    "OXOT will show how the Cyber Digital Twin can connect the source material, reveal dependencies, make evidence gaps visible, test the decision, and preserve a traceable rationale."
  ),
  ctaPrimary: same("Discuss an evidence model"),
  ctaSecondary: same("Request the Technical Specification")
};
