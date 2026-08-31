/**
 * Deployment & Data Sovereignty — narrative content.
 *
 * Transcribed and expanded from new_material_source/1_website_layout_v4/
 * 6_resources/air-gapped_deployment.md (the primary spec for this exact
 * material) and the three-mode structure in OXOT_Visual_Foundation_Spec.md
 * "Deliverable 6 — Air-Gapped Deployment Visual".
 *
 * REUSES THE SITE'S EXISTING DEPLOYMENT COPY rather than reinventing it.
 * components/cdt2/content-2.ts's DEPLOYMENT export already states the same
 * three modes ("Island mode", "One-way data diode", "Dedicated instance")
 * and the integrations list in the house voice, and that copy is protected
 * and read-only. The facts, the mode names and the passive-first framing
 * here are carried over from it deliberately so the two pages agree; this
 * page is the fuller treatment the source spec asks for — per-mode
 * boundaries, drawn data-flow diagrams, the intelligence-update options,
 * and the caveat section — not a second, divergent account.
 *
 * The source file's ASCII `text` blocks are NOT reprinted as preformatted
 * text. Each one is a boundary with flows crossing it, so it is carried as
 * structured data in ./content-modes.ts and drawn as a real diagram
 * (mode-diagram.tsx), per OXOT_content-to-visual-mapping-table.md, which
 * maps "Deployment boundary" to a "Data-flow and trust-boundary diagram"
 * and names "Cloud icon cards" as the thing to avoid.
 *
 * `Bilingual`-typed throughout via `same()` — both locales render, `nl` is
 * a same-as-English placeholder pending translation, not a claim that it is
 * correct Dutch. Grep `same(` when the translation pass starts.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "Deployment & Data Sovereignty | Air-Gapped Cyber Digital Twin",
  description:
    "Three deployment modes for the OXOT Cyber Digital Twin: fully isolated Island Mode, one-way data-diode Inbound Intelligence Mode, and a dedicated single-tenant sovereign instance. Passive-first in every configuration — no agents on controllers, no active scanning of the process network."
};

export const BREADCRUMB = {
  section: same("Platform"),
  here: same("Deployment & Data Sovereignty")
};

/** The left rail. Mirrors the section order across the body components. */
export const HEADINGS = [
  { id: "question", text: "The deployment question", level: 2 },
  { id: "passive-first", text: "Passive-first, in every mode", level: 2 },
  { id: "inputs", text: "What the model is built from", level: 2 },
  { id: "modes", text: "Three deployment modes", level: 2 },
  { id: "island-mode", text: "Island Mode", level: 3 },
  { id: "inbound-intelligence-mode", text: "Inbound Intelligence Mode", level: 3 },
  { id: "dedicated-sovereign-instance", text: "Dedicated Sovereign Instance", level: 3 },
  { id: "intelligence", text: "Keeping intelligence current", level: 2 },
  { id: "offline", text: "What still works disconnected", level: 2 },
  { id: "governance", text: "Governance you hold", level: 2 },
  { id: "integrations", text: "Systems of record", level: 2 },
  { id: "caveat", text: "Air-gapped is not a safety claim", level: 2 },
  { id: "routing", text: "Where this goes next", level: 2 }
] as const satisfies readonly { id: string; text: string; level: 2 | 3 }[];

export const HERO = {
  kicker: same("Platform / Deployment & Data Sovereignty"),
  h1: same("Air-gapped by design, sovereign by operation."),
  lead: same(
    "Deploy the Cyber Digital Twin inside your controlled environment. Model infrastructure, OT, dependencies and recovery choices without connecting to live control systems or exporting sensitive operational data."
  ),
  body: same(
    "Three deployment modes, one boundary rule. The Twin is built from approved engineering exports rather than by pointing a cloud service or an active scanner at operational technology — so the question is never whether the model can reach your plant, only which data you have approved to reach the model."
  ),
  ctaPrimary: same("Discuss a sovereign deployment"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  /* Read left to right in the header: the boundary the rest of the page
     argues about, before the argument starts. */
  spine: [
    same("Approved exports in"),
    same("Model built on your ground"),
    same("Analysis and simulation local"),
    same("Evidence out to your people"),
    same("Nothing back to the vendor")
  ]
};

export const QUESTION = {
  n: "01",
  title: same("For a sensitive environment, deployment is the first question, not the last."),
  dek: same(
    "Defense programmes, national infrastructure operators and regulated utilities do not evaluate a modelling tool on its features first. They ask what crosses the boundary, in which direction, under whose authority — and they stop the conversation there if the answer is a vendor cloud."
  ),
  intro: same(
    "OXOT is built for that conversation to end differently. The Cyber Digital Twin runs inside the customer's own controlled environment, has no external dependency in its isolated configuration, and does not connect to control systems in any configuration."
  ),
  concerns: [
    same(
      "Does any agent, collector or scanner touch a PLC, RTU, controller or the live process network? No, in every mode."
    ),
    same(
      "Does operational or engineering data leave the enclave? Only where the customer has explicitly approved an outbound path, and never as vendor telemetry."
    ),
    same("Who holds identity, roles, audit logging and update approval? The customer, in every mode."),
    same(
      "Can the deployment run with no internet route at all? Yes — that is Island Mode, and the core decision model still works."
    )
  ],
  pullQuote: same(
    "The model is built from approved exports and engineering evidence, not by connecting a cloud service or an active scanner to operational technology."
  ),
  close: same(
    "That single design decision is what makes the three modes below variations of one architecture rather than three different products. What changes between them is the boundary and the flows crossing it. What does not change is that the Twin models the environment and does not operate it."
  )
};

export const PASSIVE = {
  n: "02",
  title: same("Passive-first is a property of the product, not a deployment option."),
  dek: same(
    "No agents on your controllers and no active scanning of the process network, in any configuration. It is the same sentence on every mode diagram on this page because it is the same commitment in every mode."
  ),
  intro: same(
    "A tool that has to sit on the process network to be useful cannot be deployed into a classified enclave, and cannot be deployed into a running plant without a change-control argument nobody wants to have. OXOT avoids both by not needing the network at all."
  ),
  rules: [
    same("No software agent is installed on a PLC, RTU, safety controller, HMI or engineering workstation."),
    same("No active discovery, port scan, protocol probe or credentialed sweep is run against the production network."),
    same("No control action, set point, configuration write or command is issued to any operational system, in any mode."),
    same(
      "Where network evidence is used it is customer-supplied passive capture — approved PCAP or flow exports — not traffic OXOT generated."
    ),
    same(
      "The boundary between the Twin, which models the environment, and the operational systems, which it does not control, is a design requirement and is drawn on every mode diagram below."
    )
  ],
  close: same(
    "The consequence is worth stating plainly: nothing on this page is a risk trade against capability. Choosing the most isolated mode does not cost you an analysis that a connected mode would have bought back by touching the plant, because no mode touches the plant."
  )
};

export const INPUTS = {
  n: "03",
  title: same("The model is built from engineering evidence you already own."),
  dek: same(
    "Every mode below imports the same class of material through the same approval workflow. The list is deliberately explicit — it is what a security authority reviews before the first import, and it is short enough to review."
  ),
  intro: same(
    "These are exports produced by engineering, not by a security product. They are reviewable, they can be malware-scanned and signed on the way in, and their provenance is retained so any conclusion the Twin reaches can be traced back to the document that supports it."
  ),
  note: same(
    "Where a field has no source, the model shows it as empty rather than inventing a plausible value. An unsourced field is a gap in the record, and a gap the customer can see is worth more than a number nobody can defend."
  ),
  close: same(
    "Reconciling that record against reality is part of the engagement rather than a prerequisite for it. The gap list that comes out of reconciliation is usually the first thing a customer finds valuable, because nobody had it before."
  )
};

export const MODES = {
  n: "04",
  title: same("Three deployment modes, drawn as boundaries rather than described as tiers."),
  dek: same(
    "Each diagram below shows the same four things: what sits inside the customer-controlled boundary, what sits outside it, which flows cross it and in which direction, and what the Twin does not touch. The modes differ in exactly one of those — the crossing."
  ),
  intro: same(
    "They are not a good/better/best ladder and they are not priced against each other. They are three answers to one governance question, and the right answer is whichever one your security authority will approve."
  ),
  figureNote: same(
    "Notional deployment topology, drawn for this page. No customer site, national infrastructure, classified system or real network topology is depicted. The diagrams are static reference drawings, not a view of any live environment."
  )
};

export const INTELLIGENCE = {
  n: "05",
  title: same("An air gap does not stop intelligence reaching the model. It decides who carries it."),
  dek: same(
    "A disconnected Twin cannot automatically pull live threat, geopolitical, CVE or supplier feeds. For defense and sovereign use this is generally a governance decision rather than a functional limitation, and there are three practical answers."
  ),
  close: same(
    "In every option the update path is a controlled one: cryptographically signed offline packages, version control, rollback, and an approval gate for each feed and each model update. An update that cannot be reviewed before it lands is not an update an accredited environment will accept."
  )
};

export const OFFLINE = {
  n: "06",
  title: same("With no external connection at all, the core decision model still runs."),
  dek: same(
    "This is the part buyers expect to be a stripped-down version, and it is not. The Twin reasons over the imported model, so isolation removes external feeds — it does not remove the analysis."
  ),
  close: same(
    "What isolation genuinely costs is currency of external data: newly published vulnerabilities, supplier events and threat reporting arrive on the schedule your import workflow allows rather than continuously. That is a real trade, and it is the one the intelligence options above exist to size."
  )
};

export const GOVERNANCE = {
  n: "07",
  title: same("Every control that matters in a sovereign deployment is held by the customer."),
  dek: same(
    "For a real sovereign or classified deployment these are positioned as design requirements to agree with the customer's security authority before anything is built, not as configuration discovered during rollout."
  ),
  requirements: [
    same("Deployment on customer-owned or accredited infrastructure."),
    same("No SaaS dependency, external telemetry or vendor remote administration by default."),
    same("Local identity, RBAC, privileged-access workflow and audit logging."),
    same(
      "Customer-approved data schema, import workflow, media handling, malware scanning, signing and provenance checks."
    ),
    same("Cryptographically signed offline update packages, with version control and rollback."),
    same("Separate handling domains for unclassified, sensitive and classified model data."),
    same("Approval gates for every external intelligence feed and model update."),
    same("Local backup, recovery and disaster-recovery procedures."),
    same(
      "A clear boundary between the Twin, which models the environment, and the operational systems, which it does not control."
    )
  ],
  close: same(
    "OXOT OT engineering consultants build and deploy the Twin against these requirements. Both engagement models are consulting-led — a transient build handed over, or long-term operations sustaining the model as the estate changes. This is not software you are left to install alone inside an enclave."
  )
};

export const INTEGRATIONS = {
  n: "08",
  title: same("Where a mode permits it, the model draws on the systems of record you already run."),
  dek: same(
    "Integrations are a property of the deployment mode, not a separate product decision. In Island Mode they are file exports carried through the approved import workflow. In a dedicated instance they can be defined, one-directional read conduits."
  ),
  intro: same(
    "We integrate with asset management, historians, network monitoring and service management applications — so the model draws on the systems of record you already run rather than asking your engineers to retype them."
  ),
  close: same(
    "In every case the direction is inward. An integration is a source the Twin reads, not a channel through which the Twin acts, and none of them constitutes a path to a controller."
  )
};

export const CAVEAT = {
  n: "09",
  title: same("Air-gapped should not be presented as automatically risk-free."),
  dek: same(
    "Its effectiveness depends on the full operational boundary, and the full operational boundary is wider than the network diagram."
  ),
  pathwaysHead: same("Pathways an air gap does not close"),
  pathways: [
    same("Removable media, and the workflow that authorises it."),
    same("Contractor laptops and maintenance tooling brought on site."),
    same("Temporary connections opened for a commissioning or outage window."),
    same("Engineering workstations that touch both sides of a segmentation boundary."),
    same("Supply-chain and firmware updates arriving through an approved channel."),
    same("Authorised cross-domain processes, and the people who operate them.")
  ],
  close: same(
    "OXOT's role is to model those pathways and their consequences — not to imply that a site is safe merely because it has no ordinary internet route. The evidence model supports that honestly: source provenance is retained, unsourced fields are shown empty rather than invented, and conclusions trace back to the underlying engineering document or external source."
  )
};

export const ROUTING = {
  n: "10",
  title: same("Deployment is one half of the answer. Assurance is the other."),
  dek: same(
    "A security authority approving a deployment mode asks the next question immediately: what evidence does the thing inside the boundary produce, and does it stand up to an adversarial audit."
  ),
  links: [
    {
      label: same("IEC 62443"),
      body: same(
        "Zones, conduits, the system under consideration, and traceable risk-treatment decisions — the regime most sovereign OT deployments are assessed against."
      )
    },
    {
      label: same("Evidence & data provenance"),
      body: same(
        "How a figure in the model traces back to the engineering document or external source that produced it, and what the model does when nothing does."
      )
    },
    {
      label: same("Cyber Resilience Act"),
      body: same(
        "Product-security obligations, where a supply-chain or product gap becomes a sovereignty question rather than only an operational one."
      )
    }
  ]
};

export const CLOSING = {
  title: same("Start with the boundary your security authority will approve."),
  body: same(
    "The productive first conversation is not a demonstration. It is an hour with your security authority and your OT engineering lead, agreeing which of the three modes is approvable, what the import workflow looks like, and which single facility the first model covers."
  ),
  ctaPrimary: same("Talk to OXOT about a sovereign deployment"),
  ctaSecondary: same("See the Cyber Digital Twin")
};
