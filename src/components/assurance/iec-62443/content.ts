/**
 * IEC 62443 — narrative content, transcribed from new_material_source/
 * 1_website_layout_v4/4_assurance/assurance_IEC62443.md, which is finished
 * copy rather than an outline.
 *
 * The source file's own ASCII `text` blocks are NOT reprinted as
 * preformatted text. Each one is a chain, a stack or a vector, and is
 * carried here as structured data so the page can render it as a real
 * diagram (IecTrace.tsx, IecZoneStack.tsx, IecFrVector.tsx,
 * IecEvidencePipeline.tsx).
 *
 * The tabular material lives in ./content-tables.ts — six tables, one of
 * them thirteen rows, would push this file past the 500-line limit on its
 * own. Same split as the sibling evidence-data-provenance page.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — both locales render, `nl` is a same-as-English placeholder
 * pending translation, not a claim that it is correct Dutch.
 *
 * OXOT_Composition_Rules.md governs the shape: "Assurance pages —
 * editorial/technical reading experience. Diagrams, tables, requirements
 * traces. No sales-style dashboard blocks." So the source's tables stay
 * tables, its chains become drawn traces, and nothing is restructured into
 * a card grid or a metric tile.
 */
import { same } from "@/components/industries/registry";

export const META = {
  title: "IEC 62443 Cybersecurity Evidence & Zones and Conduits",
  description:
    "Build IEC 62443-aligned evidence from the industrial system you operate. OXOT's Cyber Digital Twin models systems under consideration, zones, conduits, cyber pathways, consequences, controls, and traceable risk-treatment decisions."
};

/**
 * The crumbs. Local rather than in the shared dictionary because `nav` has
 * no `assurance` key and adding one would mean editing en.ts and nl.ts,
 * which this task does not own.
 */
export const BREADCRUMB = {
  section: same("Assurance"),
  here: same("IEC 62443")
};

/** The left rail. Mirrors the section order across the three body components. */
export const HEADINGS = [
  { id: "challenge", text: "The challenge", level: 2 },
  { id: "requirements", text: "What IEC 62443 requires", level: 2 },
  { id: "approach", text: "The OXOT approach", level: 2 },
  { id: "system-under-consideration", text: "System under consideration", level: 2 },
  { id: "zones-conduits", text: "Zones and conduits", level: 2 },
  { id: "risk-assessment", text: "Risk assessment", level: 2 },
  { id: "target-security-levels", text: "Target security levels", level: 2 },
  { id: "risk-treatment", text: "Risk treatment", level: 2 },
  { id: "evidence-outputs", text: "Evidence outputs", level: 2 },
  { id: "roles", text: "How OXOT fits roles", level: 2 },
  { id: "provenance", text: "Evidence and provenance", level: 2 },
  { id: "scope", text: "Scope statement", level: 2 }
] as const satisfies readonly { id: string; text: string; level: 2 | 3 }[];

export const HERO = {
  kicker: same("Assurance / IEC 62443"),
  h1: same("Make IEC 62443 evidence part of the system model."),
  lead: same(
    "IEC 62443 is not a diagram exercise, a vulnerability register, or a document produced at the end of a project. It is a risk-based approach to securing industrial automation and control systems throughout their lifecycle."
  ),
  body: same(
    "OXOT's Cyber Digital Twin connects the system under consideration, its assets, zones, conduits, operational constraints, cyber pathways, consequences, and risk-treatment decisions in one evolving model."
  ),
  ctaPrimary: same("Discuss an IEC 62443 system model"),
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  /* The source file's opening `text` block, five rungs top to bottom. */
  spine: [
    same("System under consideration"),
    same("Zones and conduits"),
    same("Risk and target security levels"),
    same("Security requirements and controls"),
    same("Traceable evidence and change history")
  ],
  citation: same(
    "IEC 62443-3-2 establishes requirements to define the system under consideration, partition it into zones and conduits, assess risk for each, establish target security levels, and document security requirements."
  ),
  citationHref: "https://webstore.iec.ch/en/publication/30727",
  citationSource: same("IEC 62443-3-2, IEC webstore")
};

export const CHALLENGE = {
  n: "01",
  title: same("Most IEC 62443 evidence is fragmented before the work even begins."),
  dek: same(
    "An industrial environment is rarely documented in one place. Engineering drawings, P&IDs, control logic, SCADA projects, asset registers, VLAN diagrams, firewall rules, maintenance procedures, safety studies, and supplier records commonly sit in different repositories and are maintained by different teams."
  ),
  intro: same("This creates a familiar problem:"),
  symptoms: [
    same("The asset register does not match the engineering drawings."),
    same("The network diagram does not reflect the actual segmentation."),
    same("The zone model exists, but no one can show which routes are actually permitted."),
    same("Risk treatment is recorded, but the physical or operational consequence is not connected to it."),
    same("A control is implemented, but no evidence shows what it closes or what it must preserve."),
    same("A project delivers an assurance package that drifts out of date as the plant changes.")
  ],
  pullQuote: same("A zone-and-conduit diagram is useful. A model that proves what can traverse it is more useful."),
  close: same(
    "OXOT builds the assurance view from the operational environment: facility and process evidence, OT assets, control-system configuration, network state, dependencies, and engineering consequence."
  )
};

export const REQUIREMENTS = {
  n: "02",
  title: same("A structured path from system boundary to security requirements."),
  dek: same(
    "IEC 62443 is a family of standards for industrial automation and control system security. It includes different requirements for asset owners, service providers, system integrators, and component or product suppliers. The series addresses security across the IACS lifecycle rather than treating cyber risk as an IT-only activity."
  ),
  intro: same("For an asset owner or system-design engagement, the central logic is:"),
  close: same(
    "IEC 62443-3-2 is specifically centered on security risk assessment, system partitioning, zones, conduits, and target security levels. IEC 62443-3-3 then defines system-security requirements and security levels for the defined zones and conduits."
  ),
  closeHref: "https://webstore.iec.ch/en/publication/30727",
  closeSource: same("IEC 62443-3-2, IEC webstore")
};

export const APPROACH = {
  n: "03",
  title: same("Model the system you operate — not the diagram you wish you had."),
  dek: same(
    "OXOT begins with approved customer evidence and builds a working Cyber Digital Twin of the system under consideration."
  ),
  /* The bands themselves are PIPELINE_BANDS in ./content-figures.ts. */
  pipelineNote: same(
    "The Twin can represent an environment through P&ID, Purdue, network, dependency-graph, and site views. It supports facility physics, controller and configuration mapping, virtual network state, VLAN/subnet/firewall modeling, industrial protocol context, and engineering-grounded consequence analysis."
  ),
  principleHead: same("The design principle"),
  principle: same("Consequence first. Reachability second. Control decision third."),
  principleBody: same(
    "A critical vulnerability on an isolated asset may not be a critical operational risk. A moderate issue on a reachable engineering workstation, safety-related controller, or critical operational dependency may require immediate attention."
  ),
  principleIntro: same("The Twin evaluates risk in context:"),
  principleTrace: [
    { title: same("Engineering consequence"), body: same("What physically, operationally, or financially happens?") },
    { title: same("Cyber pathway"), body: same("Can a credible route reach the asset or function?") },
    {
      title: same("Threat and vulnerability context"),
      body: same("What exploit, actor capability, configuration, or supplier exposure applies?")
    },
    { title: same("Control effect"), body: same("What route does a candidate control close, and what does it leave open?") }
  ],
  close: same(
    "OXOT's product model uses customer safety, reliability, operational, and engineering evidence to establish consequence, then evaluates cyber reachability using the modelled network and system topology."
  )
};

export const SYSTEM = {
  n: "04",
  title: same("Define the boundary before defining the controls."),
  dek: same(
    "A system under consideration is not necessarily an entire enterprise, plant, campus, or railway. It is the specific IACS environment to be assessed and secured."
  ),
  examplesHead: same("What one can be"),
  examples: [
    same("One manufacturing process line or cell."),
    same("A water-treatment process and its chemical-dosing controls."),
    same("A generating unit, substation, or utility control environment."),
    same("A rail signaling zone, depot, traction-power system, or operations-control interface."),
    same("A hyperscale data-center cooling plant, BMS/EPMS environment, or power path."),
    same("A defense base facility-control environment, sovereign data center, or logistics site."),
    same("A specific product, system integration, or remote-maintenance service boundary.")
  ],
  outputsHead: same("OXOT system-boundary outputs"),
  /* Key/value rather than a two-column table: these are the attributes of a
     single object, which is what a definition list is for. */
  outputs: [
    {
      k: same("Scope"),
      v: same("Defined facility, process, system, service, site, line, control environment, or operational capability.")
    },
    {
      k: same("Assets"),
      v: same(
        "Controllers, PLCs, DCS, RTUs, HMIs, SCADA, engineering workstations, switches, firewalls, field devices, sensors, actuators, and virtualized elements."
      )
    },
    {
      k: same("Process"),
      v: same(
        "P&IDs, equipment relationships, control functions, safety and reliability context, operating constraints, minimum operating requirements."
      )
    },
    {
      k: same("Interfaces"),
      v: same(
        "Connections to enterprise IT, operational DMZs, vendors, cloud services, remote support, historians, asset management, and other OT systems."
      )
    },
    {
      k: same("Dependencies"),
      v: same(
        "Internal dependencies, supplier dependencies, critical shared services, external data and control paths, and recovery requirements."
      )
    },
    {
      k: same("Evidence links"),
      v: same(
        "Source document, configuration export, topology record, asset record, operational procedure, or approved assumption associated with a model object."
      )
    }
  ]
};

export const ZONES = {
  n: "05",
  title: same("Show the boundaries. Then test the routes."),
  dek: same(
    "IEC 62443 uses zones to group logical or physical assets that share common security requirements, and conduits to represent the communication channels connecting zones. Zones can be defined by criticality, operational function, location, required access, responsible organization, or other relevant risk criteria."
  ),
  citationHref: "https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf",
  citationSource: same("ISA, ISASecure certifications guide"),
  intro: same("OXOT turns zones and conduits from a static architecture diagram into a navigable model."),
  diagramHead: same("The reference zone stack"),
  diagramLabel: same("Six zones from enterprise down to field devices, with the conduit between each adjacent pair"),
  diagramNote: same(
    "This is a static reference drawing of the stack IEC 62443 partitions an IACS into — not a rendering of your environment, and not a live view. In an engagement the zones, the conduits between them, and the services each conduit actually carries are drawn from your topology exports, firewall configuration and asset records."
  ),
  /* The stack itself is ZONE_STACK in ./content-figures.ts. */
  modelsHead: same("What OXOT models"),
  pullQuote: same(
    "A conduit is not secure because it exists on an architecture slide. It is secure when its permitted services, routes, access controls, and operational dependencies are understood — and when its remaining exposure is acceptable."
  ),
  close: same(
    "The technical model supports network-state representation, VLAN/subnet and virtual-firewall modeling, Purdue segmentation, DMZ verification, and PCAP flow analysis."
  )
};

export const RISK = {
  n: "06",
  title: same("Risk should reflect the consequence that the system can actually produce."),
  dek: same(
    "IEC 62443-3-2 treats IACS cybersecurity as a risk-management problem. The relevant risk depends on the threats, likelihood, vulnerabilities, and consequences associated with a specific environment."
  ),
  citationHref:
    "https://www.isa.org/intech-home/2019/january-february/departments/united-nations-commission-to-integrate-isa-iec-624",
  citationSource: same("ISA, InTech"),
  intro: same(
    "In an OT environment, consequence should not be guessed from a vulnerability score. It should be grounded in engineering and operational reality."
  ),
  evidenceHead: same("Evidence OXOT can use"),
  chainHead: same("The risk chain"),
  chain: [
    {
      title: same("Asset or function identified"),
      body: same(
        "A PLC, HMI, SIS-related controller, engineering workstation, server, switch, remote-access gateway, sensor, actuator, or supporting service."
      )
    },
    {
      title: same("Cyber pathway established"),
      body: same("The model determines whether a route can reach that asset or function.")
    },
    {
      title: same("Operational consequence traced"),
      body: same(
        "Device cascade, process dependency, safety and reliability evidence, or service impact establishes what could happen if that function is affected."
      )
    },
    {
      title: same("Risk treatment evaluated"),
      body: same(
        "The Twin compares candidate controls and shows the remaining pathway, residual exposure, and operational impact."
      )
    }
  ],
  close: same(
    "OXOT's specification describes this as a consequence chain: a reachable path terminates at a controller tag or field device, a device cascade is traced, facility and process physics determines the result, and safety, reliability, operational, and downtime inputs establish the resulting impact."
  )
};

export const SLT = {
  n: "07",
  title: same("Support SL-T reasoning with the actual risk context."),
  dek: same(
    "IEC 62443-3-2 requires the establishment of a target security level — SL-T — for each relevant zone and conduit. A security level is not intended to be a generic maturity score. It is a risk-informed target for the security capability required to reduce risk to a tolerable level."
  ),
  vectorIntro: same("The security level may be represented as a vector across the IEC 62443 foundational requirements:"),
  vectorLabel: same("The seven foundational requirements, in vector order, with each element left unset"),
  /* The elements themselves are FR_VECTOR in ./content-figures.ts. */
  vectorNote: same(
    "Every element is drawn empty on purpose. IEC guidance describes the target security level as a vector with one element per foundational requirement, so that different targets can be set where risk differs by security objective — but the value in each position is the accountable party's decision, not something this model fills in."
  ),
  citationHref: "https://syc-se.iec.ch/deliveries/cybersecurity-guidelines/security-standards-and-best-practices/iec-62443/",
  citationSource: same("IEC SyC SE, cybersecurity guidelines"),
  supportHead: same("How OXOT supports SL-T work"),
  supportIntro: same(
    "OXOT does not automatically assign an authoritative target security level. The responsible asset owner, integrator, engineering authority, and assurance process retain that responsibility. OXOT supports the reasoning by making visible:"
  ),
  visible: [
    same("The zone's operational function and criticality."),
    same("The assets and safety or reliability dependencies within the zone."),
    same("The conduits and communication services entering or leaving the zone."),
    same("Credible pathways that reach the zone or traverse its conduits."),
    same("Vulnerability and threat context relevant to those pathways."),
    same("Existing controls and their modeled effect."),
    same("Residual routes that remain after a candidate control is applied."),
    same("The evidence, assumptions, and accountable decision behind the target.")
  ]
};

export const TREATMENT = {
  n: "08",
  title: same("Test the control before changing the plant."),
  dek: same(
    "A security design is only useful if it reduces the intended risk without creating an unacceptable operational, safety, reliability, or recovery problem. OXOT lets teams model candidate controls in the Twin first."
  ),
  flowHead: same("Baseline to decision"),
  flow: [
    { title: same("Baseline"), body: same("Current zones, conduits, dependencies, and reachable pathways.") },
    {
      title: same("Candidate control"),
      body: same(
        "Firewall rule, segmentation boundary, vendor-access redesign, patch campaign, system replacement, monitoring control, or process change."
      )
    },
    { title: same("Simulation"), body: same("Routes closed, routes preserved, residual routes, operational impact.") },
    {
      title: same("Decision"),
      body: same("Implement now, sequence during outage, add compensating controls, defer with evidence, or redesign the option.")
    }
  ],
  tableHead: same("Common IEC 62443 treatment decisions"),
  close: same(
    "The OXOT product sheet describes this explicitly: the organization can add a virtual firewall, redraw segmentation, or apply a patch campaign in the model, rerun attack paths, and compare the outcome without touching production."
  )
};

export const OUTPUTS = {
  n: "09",
  title: same("Produce evidence that keeps its connection to the system."),
  dek: same(
    "An IEC 62443 engagement can use the Twin to create structured, source-linked outputs for engineering, security, operations, procurement, and assurance stakeholders."
  ),
  close: same(
    "OXOT supports outputs including machine-readable CycloneDX and DEXPI exports, interactive P&ID, network, Purdue, graph, and site views, plus generated technical-file sections with evidence links."
  )
};

export const ROLES = {
  n: "10",
  title: same("The same model supports different accountable parties."),
  dek: same(
    "IEC 62443-2-1 is directed at asset owners responsible for establishing and implementing an IACS cybersecurity program, while other parts of the series address system design, system security requirements, components, and service-provider practices."
  ),
  citationHref: "https://www.isa.org/products/ansi-isa-62443-2-1-2024-security-industrial-automa",
  citationSource: same("ISA, ANSI/ISA 62443-2-1")
};

export const PROVENANCE = {
  n: "11",
  title: same("Every IEC 62443 claim should be traceable."),
  dek: same(
    "IEC 62443 evidence becomes more credible when the reader can move from a security requirement or decision back to the real environment and its source records."
  ),
  traceHead: same("One claim, followed to its review condition"),
  trace: [
    { title: same("Claim"), body: same("“This remote-access pathway requires stronger restriction.”") },
    { title: same("Modeled route"), body: same("Vendor connection → jump host → engineering workstation → control zone.") },
    {
      title: same("Asset and operational context"),
      body: same("The controller supports a safety-, reliability- or production-critical function.")
    },
    {
      title: same("Source evidence"),
      body: same("Network export, firewall configuration, control-system record, P&ID, FMECA and hazard evidence, access procedure.")
    },
    { title: same("Treatment decision"), body: same("Brokered access, plus segmentation, plus scheduled hardening.") },
    { title: same("Review condition"), body: same("Reassess after vendor-tool upgrade, firewall change, or planned outage.") }
  ],
  principlesHead: same("Evidence principles"),
  principles: [
    same("Grounding in customer engineering, operational, safety, reliability, asset, and network evidence."),
    same("Citations retained for approved external vulnerability, threat, supplier, and contextual inputs."),
    same("Clear distinction between customer facts, externally sourced information, assumptions, and OXOT calculations."),
    same("Visible gaps: unknown data remains unknown rather than becoming an invented value."),
    same("Drill-down from organizational outcome to zone, conduit, asset, component, pathway, source record, and decision."),
    same(
      "Change history that shows how new equipment, altered configurations, new network routes, supplier changes, or vulnerability intelligence changes the model."
    )
  ],
  linkCta: same("Explore Evidence & Data Provenance"),
  close: same(
    "OXOT's published data discipline states: grounding first; no fabricated values; null over zero for unsourced fields; source citations retained; and traceable, drillable outputs."
  )
};

export const SCOPE = {
  n: "12",
  title: same("OXOT supports IEC 62443 evidence. It does not certify compliance by itself."),
  dek: same(
    "OXOT can support IEC 62443-aligned system modeling, zones and conduits, risk assessment, risk-treatment reasoning, control simulation, technical evidence, and lifecycle traceability. However:"
  ),
  limits: [
    same("OXOT does not automatically certify a system, organization, product, or service."),
    same("OXOT does not determine a customer's official security-level target or accept residual risk on its behalf."),
    same(
      "OXOT does not replace the responsibilities of the asset owner, system integrator, product supplier, service provider, safety authority, assessor, auditor, or certification body."
    ),
    same("OXOT does not guarantee IEC 62443 conformity."),
    same("Security decisions and safety or operational approvals remain with the responsible customer and qualified authorities."),
    same("Model results depend on the completeness, quality, and approved interpretation of provided evidence.")
  ],
  close: same("This is why the Twin makes sources, assumptions, gaps, model calculations, and responsible decisions visible.")
};

export const CLOSING = {
  title: same("Start with one system under consideration."),
  body: same(
    "Bring a P&ID, network diagram, asset list, topology export, FMECA, control-system configuration, or a proposed segmentation or remote-access change. OXOT will show how the Cyber Digital Twin can define the system, map zones and conduits, test the pathway, and support a traceable IEC 62443 decision."
  ),
  ctaPrimary: same("Discuss an IEC 62443 system model"),
  ctaSecondary: same("Request the Technical Specification")
};
