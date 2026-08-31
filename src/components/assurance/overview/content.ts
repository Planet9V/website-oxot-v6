/**
 * /assurance index copy, transcribed from
 * `new_material_source/1_website_layout_v4/4_assurance/assurance_overview_2.md`
 * — the authoritative overview draft (it supersedes assurance_overview.md,
 * which predates the IEC 62278-2:2025 framework entry and the richer tables).
 *
 * Content lives here rather than inline in page.tsx for the same reason every
 * other page in this section does it: a fifteen-section reference page whose
 * copy is interleaved with JSX exceeds the 500-line rule and makes a copy edit
 * a layout risk.
 *
 * TRANSCRIBED, NOT INVENTED. Every table row, list item, and diagram stage
 * below appears in the source. Where the source's `text` blocks used ASCII
 * arrows, the structure is preserved as data and drawn by page-kit.tsx; the
 * words are unchanged.
 */

export const HERO = {
  kicker: "Assurance",
  h1: "Assurance built from the system you actually operate.",
  lede: "OXOT does not create a second checklist universe.",
  body:
    "The Cyber Digital Twin connects engineering evidence, OT assets, product components, railway functions, network pathways, safety context, suppliers, cyber-risk decisions, and operational dependencies in one evolving model. From that model, teams can generate the framework-aligned views, evidence, rationale, and traceability needed to support assurance work.",
  flow: [
    "Engineering, operational, product, and safety evidence",
    "OXOT Cyber Digital Twin",
    "Risk, safety, cyber, lifecycle, and dependency decisions",
    "Traceable assurance evidence"
  ],
  frameworks: [
    "IEC 62443",
    "Cyber Resilience Act",
    "TS 50701",
    "IEC 62278-2:2025",
    "Evidence & Data Provenance"
  ]
} as const;

export const PROBLEM = {
  heading: "Compliance documents often drift away from the operating system.",
  intro:
    "In complex industrial, product, railway, and critical-infrastructure environments, assurance evidence is usually distributed across teams and tools:",
  sources: [
    "Engineering drawings and P&IDs.",
    "System descriptions, architecture records, and interface specifications.",
    "OT asset inventories and configuration records.",
    "Network diagrams, firewall rules, and remote-access procedures.",
    "FMECA, hazard logs, RAMS records, safety requirements, and degraded-mode procedures.",
    "Software, firmware, hardware, cryptographic, cloud, and operational dependency data.",
    "Supplier records, service contracts, maintenance documentation, and support workflows.",
    "Risk registers, audit reports, vulnerability advisories, and change approvals."
  ],
  bridge:
    "The result is often a stack of technically valid documents that cannot answer a simple operational question:",
  pull: "What evidence supports this decision in the system as it operates today?",
  tableHeading: "Common failure modes",
  tableHead: ["Fragmented approach", "Assurance consequence"],
  tableRows: [
    ["Asset register and engineering drawings disagree", "Scope and criticality are uncertain"],
    ["Zone diagrams do not reflect actual communication routes", "Segmentation claims cannot be validated"],
    ["Safety records are separate from cyber analysis", "Cybersecurity assumptions beneath safety barriers remain hidden"],
    ["SBOMs are not linked to product interfaces or deployment context", "Vulnerability impact cannot be assessed efficiently"],
    ["Supplier information sits outside the technical model", "Support, firmware, cloud, spare, and lifecycle dependencies are overlooked"],
    ["Risk treatment is documented without a modeled control effect", "Teams cannot show what route was closed or what residual risk remains"],
    ["Change control is document-based only", "Configuration drift, new suppliers, and new pathways silently invalidate old evidence"],
    ["Reporting is manually assembled", "Evidence becomes stale between audits, projects, releases, or reviews"]
  ],
  close:
    "OXOT turns assurance into a living evidence model rather than a point-in-time documentation exercise."
} as const;

export const ONE_MODEL = {
  heading: "Build the system once. Use its evidence across disciplines.",
  stack: [
    {
      name: "Customer source evidence",
      terms: [
        "P&IDs",
        "system diagrams",
        "asset data",
        "PLC / SCADA / HMI configuration",
        "network topology",
        "FMECA",
        "hazard logs",
        "RAMS evidence",
        "BOMs",
        "supplier records",
        "operating procedures",
        "test records",
        "maintenance data",
        "vulnerabilities",
        "approved external intelligence"
      ]
    },
    {
      name: "OXOT Cyber Digital Twin",
      terms: [
        "facilities",
        "systems",
        "assets",
        "components",
        "functions",
        "interfaces",
        "zones",
        "conduits",
        "dependencies",
        "pathways",
        "hazards",
        "controls",
        "product versions",
        "suppliers",
        "operating modes",
        "change history"
      ]
    },
    {
      name: "Framework and assurance views",
      terms: [
        "IEC 62443",
        "Cyber Resilience Act",
        "TS 50701",
        "IEC 62278-2:2025",
        "technical documentation",
        "safety evidence support",
        "governance reporting",
        "risk treatment",
        "lifecycle traceability",
        "audit and review evidence"
      ]
    }
  ],
  lenses:
    "The same model can be viewed as a P&ID, process/system diagram, Purdue view, OT network view, dependency graph, product/BOM view, hazard/safety view, or 3D site representation. This lets engineering, security, safety, product, operations, procurement, assurance, and leadership teams examine the same underlying environment through the lens relevant to their responsibility.",
  changeHeading: "What changes",
  changeHead: ["Traditional approach", "OXOT assurance model"],
  changeRows: [
    ["Documents created separately for each framework", "One grounded model produces framework-specific views"],
    ["Asset inventory, risk register, network diagram, safety evidence, and supplier records managed independently", "Assets, requirements, hazards, pathways, dependencies, controls, and evidence are connected"],
    ["Vulnerability severity used as a proxy for risk", "Reachability and operational, product, or safety consequence are modeled explicitly"],
    ["Security controls recorded as implemented", "The model shows what pathway a control closes, what it preserves, and what residual route remains"],
    ["Safety and cybersecurity managed in parallel", "Cyber pathways are linked to safety assumptions, functions, barriers, and degraded modes"],
    ["Product documentation is rebuilt around each release", "Version, component, supplier, interface, and vulnerability changes produce documentation deltas"],
    ["Risk acceptance becomes forgotten technical debt", "Deferrals have owner, rationale, compensating controls, review trigger, and expiry"],
    ["Audit preparation is a project", "Evidence is maintained as the model evolves"]
  ]
} as const;

export const FRAMEWORKS = {
  heading: "Different frameworks. One evidence foundation.",
  intro:
    "Each assurance area has a distinct purpose. OXOT does not treat IEC 62443, CRA, TS 50701, and IEC 62278-2:2025 as interchangeable checklists. Instead, it uses a shared model to support the specific evidence and decision logic each framework requires.",
  head: ["Framework", "Primary focus", "What OXOT helps connect"],
  rows: [
    ["IEC 62443", "Industrial automation and control system cybersecurity", "Systems under consideration, zones, conduits, target-security-level reasoning, asset and network context, risk treatment, and control evidence"],
    ["Cyber Resilience Act", "Cybersecurity of covered products with digital elements placed on the EU market", "Product architecture, component and supplier dependencies, BOMs, vulnerabilities, secure lifecycle evidence, and technical-documentation workflows"],
    ["TS 50701", "Railway cybersecurity across the application lifecycle", "Railway assets, operational and cyber pathways, safety/RAMS context, security engineering, supplier dependencies, and lifecycle evidence"],
    ["IEC 62278-2:2025", "Railway systems approach to safety", "System definition, hazards, safety objectives, requirements, safety assumptions, allocation, validation, safety argument, and change impact"],
    ["Evidence & Data Provenance", "Trustworthiness of every framework output", "Source grounding, citations, transparent assumptions, drillable calculation paths, evidence ownership, change history, and visible gaps"]
  ]
} as const;

export const IEC_62443 = {
  heading: "Model the industrial system. Then test the boundary.",
  intro:
    "IEC 62443 provides the lifecycle security framework for industrial automation and control systems. For system-design work, it focuses on defining the system under consideration, partitioning it into zones and conduits, assessing risk, establishing target security levels, and defining security requirements.",
  connects: [
    "The facility, line, site, control environment, or service boundary.",
    "Controllers, PLCs, DCS, RTUs, HMIs, SCADA, engineering workstations, network infrastructure, field assets, sensors, and actuators.",
    "Purdue context, zones, conduits, VLANs, subnets, firewall controls, remote access, and communication flows.",
    "Actual reachability from an entry point to a critical operational, reliability, or safety-related function.",
    "Engineering consequence, operational constraints, risk-treatment rationale, and residual exposure.",
    "Candidate controls such as segmentation, virtual firewalls, access redesign, patching, monitoring, or modernization.",
    "Source-linked architecture, risk, control, and evidence outputs."
  ],
  pull:
    "A zone diagram is not enough. The assurance question is whether the conduit permits a route to an asset or function that matters — and whether the selected control closes that route without breaking required operations.",
  cta: "Explore IEC 62443"
} as const;

export const CRA = {
  heading: "Build evidence from the product you actually ship.",
  intro:
    "The Cyber Resilience Act establishes mandatory cybersecurity requirements for covered products with digital elements placed on the EU market. Its principal obligations are directed at manufacturers and span planning, design, development, production, delivery, maintenance, vulnerability handling, and technical documentation. Full application begins on 11 December 2027; reporting obligations apply earlier.",
  scope:
    "The CRA is not an operator-compliance regime. It does not apply merely because an organization runs an industrial site, railway, utility, data center, or government facility. Scope, exclusions, product category, conformity-assessment route, and legal obligations require a product-specific determination.",
  bomsLabel: "The dependency views CRA work draws on",
  boms: [
    { k: "SBOM", v: "Software and firmware components." },
    { k: "HBOM", v: "Hardware components, origin, and physical supply dependencies." },
    { k: "CBOM", v: "Certificates, ciphers, cryptographic dependencies, and key lifecycle." },
    { k: "SaaS-BOM", v: "Cloud APIs, service platforms, vendor portals, and remote-maintenance paths." },
    { k: "Ops-BOM", v: "Human access, maintenance, update, field-service, and support workflows." }
  ],
  connects: [
    "Product identity, intended purpose, architecture, interfaces, and supported lifecycle.",
    "Vulnerabilities, affected versions, reachability, product function, customer consequence, mitigation, and change records.",
    "Source-linked evidence to support technical-documentation workflows."
  ],
  pull:
    "A component inventory identifies what exists. A dependency model shows what is reachable, what it supports, which customers or functions are affected, and what treatment is defensible.",
  cta: "Explore the Cyber Resilience Act"
} as const;

export const TS_50701 = {
  heading: "Connect railway cybersecurity to safe, recoverable railway operations.",
  intro:
    "TS 50701 provides railway-specific cybersecurity guidance across the lifecycle of railway applications. It aligns cybersecurity work with railway system definition, risk analysis, requirements, implementation, validation, acceptance, operation, maintenance, vulnerability management, and decommissioning. It draws on IEC 62443 cybersecurity concepts and EN 50126 / IEC 62278 lifecycle thinking.",
  connects: [
    "Signaling, interlocking, CBTC, ETCS, PTC, SCADA, traction power, station, tunnel, depot, wayside, control-center, and rolling-stock maintenance environments.",
    "Railway OT, telecommunications, engineering, vendor-access, configuration, and supplier pathways.",
    "Cyber scenarios to train movement, route setting, headway, safe degraded modes, passenger service, freight flow, field response, and recovery consequences.",
    "Safety/RAMS records, hazard assumptions, operational procedures, availability requirements, and maintenance dependencies.",
    "Candidate security treatments that preserve required diagnostic, maintenance, operational, and recovery flows.",
    "Traceable security-engineering, risk-treatment, and lifecycle evidence."
  ],
  pull:
    "In rail, a secure system must not only resist attack. It must fail safely, operate in a defined degraded mode, and recover through controlled procedures.",
  cta: "Explore TS 50701"
} as const;

export const IEC_62278 = {
  heading: "Connect cyber pathways to the railway safety method.",
  intro:
    "IEC 62278-2:2025 provides the systems approach to safety for railway applications. It focuses on the safety-related generic aspects of the RAMS lifecycle and defines technology-independent methods and tools for system definition, hazard and risk analysis, safety requirements, allocation, verification, validation, and safety demonstration.",
  complementLabel: "It complements IEC 62278-1:2025",
  complement: [
    {
      name: "IEC 62278-1:2025 — Generic RAMS process",
      terms: ["lifecycle", "organization", "planning", "requirements", "safety case"]
    },
    {
      name: "IEC 62278-2:2025 — Systems approach to safety",
      terms: [
        "system definition",
        "hazards",
        "safety objectives",
        "requirements",
        "allocation",
        "safety assumptions",
        "verification",
        "validation"
      ]
    }
  ],
  connects: [
    "Railway operational capability to required functions, systems, subsystems, assets, interfaces, suppliers, people, and procedures.",
    "Hazards to initiating technical, human, environmental, supplier, configuration, or cyber events.",
    "Safety objectives to system-level requirements and allocated technical, operational, procedural, and security measures.",
    "Safety-related functions to the cybersecurity assumptions that support them: controlled access, configuration integrity, trusted update paths, segmentation, maintenance control, certificate lifecycle, and recovery capability.",
    "Verification and validation evidence to the exact requirement, control, asset, configuration, procedure, or scenario it supports.",
    "Proposed changes to the hazards, requirements, interfaces, safety assumptions, safety claims, and evidence that must be reassessed."
  ],
  chainLabel: "How a cyber pathway becomes safety evidence",
  chain: [
    "Cyber pathway",
    "Safety-related asset or function",
    "Safety assumption or barrier affected",
    "Hazardous condition or degraded mode",
    "Safety and operational consequence",
    "Requirement, control, verification, validation, and safety evidence"
  ],
  pull:
    "Cybersecurity becomes safety-relevant when it can defeat, bypass, alter, delay, or invalidate an assumption underneath a safety function or barrier.",
  disclaimer:
    "OXOT does not assign SILs, author a railway safety case, or act as an independent safety assessor. It provides the connected evidence and scenario model that allows safety, RAMS, cybersecurity, operations, and engineering teams to see those dependencies and manage changes responsibly.",
  cta: "Explore IEC 62278-2:2025"
} as const;

export const RAIL_CONNECTION = {
  heading: "Cybersecurity and safety should share the same system story.",
  intro: "For railway customers, TS 50701 and IEC 62278-2 should not become separate compliance silos.",
  stack: [
    {
      name: "Railway system definition",
      terms: ["assets", "functions", "interfaces", "operating modes", "suppliers"]
    },
    {
      name: "IEC 62278-2:2025",
      terms: ["hazards", "safety objectives", "safety requirements", "safety argument"]
    },
    {
      name: "TS 50701",
      terms: ["cybersecurity scenarios", "security requirements", "lifecycle controls"]
    },
    {
      name: "IEC 62443 concepts",
      terms: ["zones", "conduits", "access control", "system integrity", "restricted data flow"]
    },
    {
      name: "OXOT Cyber Digital Twin",
      terms: ["evidence", "pathways", "dependencies", "controls", "simulation", "change history"]
    }
  ],
  exampleHeading: "Example: remote signaling-engineering access",
  example: [
    {
      stage: "Safety objective",
      detail: "Prevent unauthorized configuration change from compromising safe route setting."
    },
    {
      stage: "Cybersecurity concern",
      detail: "A vendor remote-access route reaches a signaling engineering workstation."
    },
    {
      stage: "Safety assumption at risk",
      detail: "Only authorized, validated, traceable changes can affect the signaling environment."
    },
    {
      stage: "Candidate treatment",
      detail:
        "Brokered, MFA-protected, approved, time-limited, recorded remote access plus segmentation between vendor tooling and production signaling zones."
    },
    {
      stage: "Evidence",
      detail:
        "System boundary • hazard / safety requirement • network pathway • control design • configuration baseline • test results • maintenance procedure • validation evidence • approved decision record"
    }
  ],
  close:
    "This is the assurance value of the Twin: one model connects the cyber route to the safety objective, the operating constraint, the control decision, and the evidence."
} as const;

export const LIFECYCLE = {
  heading: "From source record to accountable decision.",
  steps: [
    {
      stage: "Source evidence",
      detail:
        "Engineering drawings • network exports • asset records • BOMs • hazard logs • configuration data • procedures • supplier evidence"
    },
    {
      stage: "Model grounding",
      detail:
        "Systems, assets, components, functions, interfaces, pathways, hazards, dependencies, operating modes, controls, and assumptions"
    },
    {
      stage: "Analysis",
      detail:
        "Threat, vulnerability, component change, supplier issue, hazard, safety concern, or proposed control evaluated against the model"
    },
    {
      stage: "Decision",
      detail:
        "Implement • sequence • validate • defer with compensating controls • accept residual risk • replace • redesign • monitor"
    },
    {
      stage: "Assurance output",
      detail:
        "Framework-oriented evidence, system views, BOMs, hazard/requirement traceability, technical-file support, risk-treatment records"
    },
    {
      stage: "Change and review",
      detail:
        "New asset, configuration, firmware, supplier, route, threat, safety finding, or procedure creates a visible evidence delta"
    }
  ],
  close:
    "OXOT can synchronize continuous BOMs, risk deltas, and framework technical-file sections as model differences occur."
} as const;

export const PRODUCE = {
  heading: "Evidence should be useful to the people responsible for the system.",
  intro: "Depending on the engagement and applicable framework, OXOT can support:",
  items: [
    "System-under-consideration and product-boundary definitions.",
    "Asset, component, version, configuration, interface, and dependency models.",
    "P&ID, system, Purdue, network, zone/conduit, graph, and site views.",
    "Railway operational-capability, system-function, degraded-mode, and recovery models.",
    "Hazard, safety-objective, safety-requirement, barrier, and safety-assumption traceability.",
    "SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM outputs.",
    "Supplier, support, firmware, certificate, cloud-service, and lifecycle dependency views.",
    "Cyber-pathway and consequence analysis.",
    "Vulnerability, exploitability, mitigation, and version-impact records.",
    "Candidate-control simulation for firewall, segmentation, remote access, patching, configuration, replacement, and investment decisions.",
    "Risk-treatment, residual-risk, risk-acceptance, compensating-control, and review records.",
    "Verification and validation evidence links.",
    "Framework-oriented technical documentation and engineering evidence.",
    "Executive, engineering, safety, product, procurement, and assurance reporting.",
    "Change history, configuration drift, risk deltas, and evidence-review triggers."
  ],
  close:
    "The OXOT specification supports machine-readable CycloneDX and DEXPI outputs, interactive P&ID/network/Purdue/dependency views, generated technical-file sections, and evidence-linked framework outputs."
} as const;

export const PROVENANCE = {
  heading: "Every number should be traceable to its source — or visibly absent.",
  intro:
    "This is not a secondary product feature. It is the trust foundation of the Assurance section. A framework claim, risk conclusion, safety statement, investment recommendation, supplier assessment, or vulnerability decision must be traceable to:",
  sources: [
    "Customer engineering or operational evidence.",
    "Product/component/version records.",
    "Network or configuration evidence.",
    "Safety, reliability, hazard, or RAMS material.",
    "Supplier or lifecycle evidence.",
    "An approved external source.",
    "A documented assumption.",
    "A transparent OXOT calculation."
  ],
  drillLabel: "One decision, drilled to its source",
  drill: [
    { stage: "Management-level decision", detail: "“Fund secure engineering access now.”" },
    { stage: "Risk-treatment rationale", detail: "The control closes a reachable vendor pathway." },
    {
      stage: "Affected system or product",
      detail: "Vendor route → engineering workstation → controller / configuration function."
    },
    {
      stage: "Operational or safety consequence",
      detail: "A compromised configuration route could affect a critical function."
    },
    {
      stage: "Source evidence",
      detail:
        "Network topology • access procedure • system architecture • configuration record • hazard/RAMS evidence • vulnerability source."
    }
  ],
  principlesHeading: "Evidence principles",
  close:
    "OXOT’s documented discipline is grounding first, no fabrication, null over zero, retained citations, and drillable calculations; the Twin’s financial and risk outputs are transparent OXOT calculations rather than actuarial or rating-agency marks.",
  cta: "Explore Evidence & Data Provenance"
} as const;

export const TEST_FIRST = {
  heading: "Assurance must survive the proposed change.",
  intro:
    "A control is not adequate merely because it is listed in a policy or architecture document. Teams need to know whether it closes the intended pathway, preserves required functions, and leaves an acceptable residual risk.",
  stages: [
    { stage: "Baseline", detail: "Current system, interfaces, dependencies, pathways, and evidence." },
    {
      stage: "Candidate change",
      detail:
        "Firewall • segmentation • access redesign • firmware update • product release • supplier replacement • operating procedure"
    },
    {
      stage: "Modelled result",
      detail:
        "Routes closed • required flows preserved • hazards affected • safety assumptions protected • residual pathways • recovery impact"
    },
    { stage: "Evidence-backed decision", detail: "Implement • validate • phase • defer • accept • redesign" }
  ],
  close:
    "The product is designed to model candidate controls — such as virtual firewalls, segmentation, patch campaigns, and procurement options — before changes are made to the operational environment."
} as const;

export const NOT_CLAIMED = {
  heading: "Assurance support is not automatic conformity.",
  intro:
    "OXOT supports evidence generation, engineering analysis, risk treatment, product/lifecycle documentation, safety-assumption modeling, and decision traceability. OXOT does not:",
  items: [
    "Automatically certify a system, product, organization, railway application, or operating environment.",
    "Guarantee conformity with IEC 62443, the CRA, TS 50701, IEC 62278-2:2025, NIS2, or any other framework.",
    "Act as a notified body, regulator, independent safety assessor, railway safety authority, legal adviser, insurer, or rating agency.",
    "Determine legal CRA scope, product classification, conformity-assessment route, CE-marking obligations, or reporting obligations.",
    "Determine a railway’s formal safety acceptance, assign SILs, own a hazard log, issue a safety case, or authorize return to service.",
    "Replace responsible engineering, product, safety, security, legal, compliance, operational, procurement, or executive decision makers."
  ],
  close:
    "The accountable organization and qualified authorities remain responsible for the final claim, decision, acceptance, and regulatory obligation. The Twin makes the underlying evidence, assumptions, pathways, controls, and change impacts visible."
} as const;

export const CLOSING = {
  heading: "Start with one system, product, railway function, or assurance question.",
  body:
    "Bring a P&ID, architecture diagram, system description, network topology, asset list, hazard-log extract, RAMS requirement, SBOM, firmware inventory, supplier list, technical-documentation challenge, or proposed control change.",
  body2:
    "OXOT will show how the Cyber Digital Twin can connect the evidence, model the dependency, test the decision, and produce a traceable assurance view.",
  primary: "Discuss an assurance use case",
  secondary: "Request the Technical Specification"
} as const;
