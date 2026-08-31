/**
 * IEC 62278-2:2025 — "Railway applications. Specification and demonstration
 * of reliability, availability, maintainability and safety (RAMS). Part 2:
 * Systems approach to safety."
 *
 * NAMING, CORRECTED 2026-08-23: this file previously labelled itself
 * "62278-1" on the claim that the source file's own "62278-2" designation
 * was a typo. It was not — `site-tree.md` (the owner's corrected sitemap)
 * lists "IEC 62278-2:2025", and the source file's body content is
 * unambiguously Part 2 subject matter (hazard analysis, safety
 * requirements, requirement allocation, safety-integrity context — not
 * Part 1's lifecycle/management process). Every "62278-1" occurrence below
 * has been corrected to "62278-2" to match. IEC 62278-1:2025 is a real,
 * separate standard (the generic RAMS process this page's POSITION section
 * now correctly distinguishes from) — it just isn't what this page is
 * about, and no dedicated page exists for it.
 *
 * `Bilingual`-typed throughout via `same()` (src/components/industries/
 * registry.ts) — BOTH LOCALES RENDER, no `locale !== "en"` gate. `nl` holds
 * the English text as an honest placeholder pending translation, not a
 * claim that this is correct Dutch. Grep `same(` when the translation pass
 * starts. This follows the industry pages rather than /assurance's own
 * EN-only gate, which predates the owner's both-locales correction.
 *
 * COMPOSITION: OXOT_Composition_Rules.md gives assurance pages one rule —
 * "editorial/technical reading experience. Diagrams, tables, requirements
 * traces. No sales-style dashboard blocks." The section shapes below are
 * therefore tables, ordered chains and one full requirement trace, not
 * feature cards or metric tiles. Where the source material offered a
 * marketing framing, it was dropped rather than restyled.
 *
 * ONE STRUCTURAL DEPARTURE FROM THE SOURCE: the source opened with a
 * part-1-versus-part-2 comparison, which cannot survive the naming
 * correction without becoming self-referential. It is replaced by
 * POSITION — where the generic RAMS process sits relative to TS 50701 and
 * IEC 62443 — which carries the same "these are different questions"
 * argument and gives the railway sibling page a natural link.
 */
import { same } from "@/components/industries/registry";

/* NO "| OXOT" SUFFIX. The locale layout sets `title.template`, which appends
   it already — pages that carry the suffix in their own META render as
   "… | OXOT | OXOT". Several existing pages do exactly that; this one does
   not, and fixing theirs is not this page's change to make. */
export const META = {
  title: "IEC 62278-2:2025 Railway Systems Approach to Safety",
  description:
    "Support IEC 62278-2:2025 railway safety evidence with a Cyber Digital Twin that connects hazards, safety objectives, requirements, cyber pathways, dependencies, controls, verification, validation and change impacts."
};

/** The clause register printed under the masthead. Section ids match the
 *  `aria-labelledby` targets in each section component — one list, so a
 *  renamed section cannot leave a dead anchor behind. */
export const CLAUSES = [
  { id: "challenge", n: "01", title: same("The safety challenge") },
  { id: "position", n: "02", title: same("Where the process sits") },
  { id: "system-definition", n: "03", title: same("System definition") },
  { id: "hazard", n: "04", title: same("Hazard and risk analysis") },
  { id: "objectives", n: "05", title: same("Safety objectives") },
  { id: "trace", n: "06", title: same("Requirements and allocation") },
  { id: "integrity", n: "07", title: same("Safety-integrity context") },
  { id: "verification", n: "08", title: same("Verification and validation") },
  { id: "evidence", n: "09", title: same("Safety argument and evidence") },
  { id: "worked", n: "10", title: same("Worked example") },
  { id: "limits", n: "11", title: same("Scope and boundaries") }
] as const;

type Clause = (typeof CLAUSES)[number];

/**
 * Read one clause by id, so a section heading and the register entry that
 * links to it are the same record. The throw is the narrowing mechanism, not
 * defensive coding: `id` is the literal union of the ids above, so a miss is
 * unreachable — but TypeScript cannot see that through `Array.find`.
 */
export function clause(id: Clause["id"]): Clause {
  const found = CLAUSES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown clause id: ${id}`);
  return found;
}

export const HERO = {
  kicker: same("Assurance"),
  standard: same("IEC 62278-2:2025"),
  h1: same("Connect cyber pathways to railway safety evidence."),
  lead: same(
    "IEC 62278-2:2025 structures the systems approach to safety for railway applications. It helps organisations define the system, identify hazards, establish safety objectives, derive and allocate safety requirements, demonstrate evidence, and maintain the safety argument as the railway evolves."
  ),
  leadTwo: same(
    "OXOT's Cyber Digital Twin connects railway assets, functions, interfaces, cyber pathways, operating modes, safety barriers, dependencies, controls and evidence in one traceable model."
  ),
  /* The lifecycle spine, read top to bottom — the source's opening chain. */
  chain: [
    same("Railway system and operating context"),
    same("Hazards, barriers and safety objectives"),
    same("Safety and cybersecurity requirements"),
    same("Allocation to assets, systems, people and procedures"),
    same("Verification, validation, safety argument and change evidence")
  ],
  spec: [
    { k: same("Standard"), v: same("IEC 62278-2:2025") },
    {
      k: same("Title"),
      v: same(
        "Railway applications — Specification and demonstration of reliability, availability, maintainability and safety (RAMS) — Part 2: Systems approach to safety"
      )
    },
    { k: same("Domain"), v: same("Railway applications: signalling, train control, traction power, stations, depots, operations control") },
    { k: same("Related"), v: same("TS 50701 (railway cybersecurity), IEC 62443 (industrial automation security), EN 50126") },
    { k: same("OXOT role"), v: same("Evidence and scenario model supporting the accountable railway safety process — not a substitute for it") }
  ],
  ctaPrimary: same("Discuss a railway safety and cyber scenario"),
  ctaSecondary: same("Explore the Cyber Digital Twin")
};

export const CHALLENGE = {
  h2: same("A cyber event becomes a safety concern when it changes a safety assumption."),
  body: same(
    "Railways are designed to fail safely. A signalling, CBTC, ETCS, PTC, interlocking, traction-power or control-centre disruption may result in a safe state such as restricted movement, a train stop, a route lockout or degraded operation."
  ),
  bodyTwo: same("That safe state can still have serious consequences:"),
  consequences: [
    same("Trains cannot move through a junction, terminal, tunnel, depot or route section."),
    same("Headways fall and passenger platforms become crowded."),
    same("Dispatchers lose operational visibility or the ability to recover quickly."),
    same("Freight corridors become congested and interchanges are missed."),
    same("Traction power cannot be switched, isolated or restored as intended."),
    same("Field response, diagnosis, configuration recovery or return to service is delayed."),
    same("A cybersecurity weakness undermines an assumption beneath a safety barrier.")
  ],
  pull: same(
    "A vulnerability is not automatically a safety risk. It becomes safety-relevant when it can reach, alter, delay, bypass or invalidate a function or assumption that contributes to safe railway operation."
  )
};

export const POSITION = {
  h2: same("Four standards, four different questions."),
  intro: same(
    "IEC 62278-2:2025 separates the safety method from the generic RAMS process: Part 1 addresses the lifecycle and management process, Part 2 — this page — focuses on safety-related methods, system definition, hazard and risk analysis, safety requirements, allocation and safety demonstration. Both are deliberately independent of the technology used in the systems and subsystems they cover, which is why a cybersecurity question has to be brought into them rather than answered beside them."
  ),
  rows: [
    {
      name: same("IEC 62278-1:2025"),
      role: same("Asks whether RAMS is managed throughout the lifecycle — organisation, planning, requirements, assurance. A real, separate standard; no dedicated page on this site.")
    },
    {
      name: same("IEC 62278-2:2025"),
      role: same(
        "Asks whether the safety argument is structurally sound: the system is understood, hazards are identified, safety requirements are allocated, evidence supports the claims, and changes are assessed. This page."
      )
    },
    {
      name: same("TS 50701"),
      role: same("Adds the railway cybersecurity activities — zones and conduits, security requirements, and security assurance across the same lifecycle.")
    },
    {
      name: same("IEC 62443"),
      role: same("Supplies the underlying industrial automation and control system security requirements that TS 50701 adapts for railway use.")
    },
    {
      name: same("The Cyber Digital Twin"),
      role: same("Connects these domains in a single operational and evidence model, so a control, an assumption and a safety claim can be read against one another.")
    }
  ],
  note: same(
    "The practical failure this addresses is mundane and common: a safety requirement is stated in one document, a cyber control is implemented somewhere else, and no traceable link demonstrates that the control supports the requirement."
  )
};

export const SYSTEM_DEF = {
  h2: same("Define the railway system, its boundaries and its operating conditions."),
  body: same(
    "Safety analysis begins with the system under consideration. A railway system is not simply an asset list. It includes operational functions, people, procedures, physical environments, interfaces, external systems, operating modes, assumptions and constraints."
  ),
  bodyTwo: same(
    "IEC 62278-2:2025 requires the system under consideration — including its interfaces and interactions with other systems and subsystems — to be sufficiently defined to support risk analysis."
  ),
  scopeHead: same("Example railway scopes"),
  scopeCols: { system: same("System under consideration"), context: same("Typical safety and cyber context") },
  scopes: [
    {
      system: same("Interlocking and route-control environment"),
      context: same("Route setting, train detection, signal aspects, configuration control, field power, engineering access")
    },
    {
      system: same("CBTC corridor"),
      context: same("Zone controllers, train-ground radio, onboard interfaces, OCC, headway, degraded mode, maintenance tools")
    },
    {
      system: same("ETCS / ERTMS segment"),
      context: same("RBC, balises, GSM-R/FRMCS, onboard integration, route data, key and certificate dependencies")
    },
    {
      system: same("Freight PTC territory"),
      context: same("Back-office systems, wayside interface units, radio, dispatch interfaces, locomotive equipment, maintenance pathways")
    },
    {
      system: same("Traction-power SCADA"),
      context: same("Substations, RTUs, PLCs, protective devices, remote switching, isolation procedures, field safety")
    },
    {
      system: same("Station or tunnel environment"),
      context: same("Ventilation, emergency systems, platform screen doors, public address, CCTV, power, passenger flow, incident response")
    },
    {
      system: same("Depot and rolling-stock maintenance environment"),
      context: same("Software loading, diagnostic tools, maintenance laptops, test equipment, depot SCADA, fleet availability")
    },
    {
      system: same("Railway operations-control centre"),
      context: same("Dispatch, ATS, CAD, traffic management, telecoms, identities, time services, emergency and degraded operating procedures")
    }
  ],
  modelHead: same("The OXOT system-definition model"),
  model: [
    same("Operational capability"),
    same("Railway function"),
    same("System / subsystem"),
    same("Asset and configuration item"),
    same("Interface, dependency, person, procedure or supplier")
  ],
  directionsHead: same("The model is read from either end"),
  directions: [
    {
      q: same("What must remain available to move trains safely?"),
      a: same("Required functions, systems, assets, interfaces and dependencies.")
    },
    {
      q: same("If this asset, vendor pathway, network route or configuration changes, what is affected?"),
      a: same("The railway function, the safety barrier and the operational capability that depend on it.")
    }
  ]
};

export const HAZARD = {
  h2: same("Model the chain from initiating event to hazardous condition."),
  body: same(
    "The safety method begins with identifying hazards, their causes, the relevant barriers and their possible consequences."
  ),
  chain: [
    same("Initiating event"),
    same("Hazardous condition"),
    same("Potential accident or harm"),
    same("Safety barriers and operating controls"),
    same("Residual risk and acceptance decision")
  ],
  initiatorsHead: same("The initiating event may be"),
  initiators: [
    same("Hardware failure"),
    same("Software defect"),
    same("Configuration error"),
    same("Human error"),
    same("Maintenance error"),
    same("Communications or power failure"),
    same("Supplier defect or unavailable support"),
    same("Environmental condition"),
    same("Cyber compromise or unauthorised change")
  ],
  cyberHead: same("Cybersecurity is an initiating event — not a separate risk universe"),
  cascade: [
    {
      stage: same("Cyber entry point"),
      detail: same("Vendor access • engineering laptop • remote service • network route • supplier update • identity compromise • exposed interface")
    },
    {
      stage: same("Reachable asset or configuration"),
      detail: same("Interlocking • CBTC controller • PTC support service • traction-power RTU • maintenance system • field controller")
    },
    {
      stage: same("Affected railway function"),
      detail: same("Route setting • movement authority • train detection • power control • dispatch visibility • maintenance configuration")
    },
    {
      stage: same("Hazardous condition or degraded state"),
      detail: same("Incorrect, unavailable, delayed, untrusted or restricted function")
    },
    {
      stage: same("Safety and RAMS consequence"),
      detail: same("Safety barrier challenged • safe stop • capacity reduction • recovery delay")
    }
  ],
  evidenceHead: same("The hazard model in the Twin"),
  evidenceCols: { element: same("Hazard evidence element"), support: same("How OXOT supports it") },
  evidence: [
    { element: same("Hazard identity"), support: same("Links the hazard to the system, function, operating context and lifecycle state") },
    {
      element: same("Initiating event"),
      support: same("Maps technical failure, human error, configuration drift, supplier issue, cyber scenario or environmental pressure")
    },
    { element: same("Causal pathway"), support: same("Shows the physical, logical, operational and cyber route from cause to affected function") },
    {
      element: same("Affected assets"),
      support: same("Identifies controllers, wayside systems, engineering workstations, communications, interfaces and supporting services")
    },
    {
      element: same("Existing barriers"),
      support: same("Connects safety functions, technical controls, segregation, procedures, approvals, detection and recovery measures")
    },
    {
      element: same("Consequence"),
      support: same("Relates the hazard to safe operating state, degraded mode, passenger or freight service effect, field safety and restoration need")
    },
    {
      element: same("Risk decision"),
      support: same("Records treatment, residual risk, acceptance authority, compensating controls, review trigger and change condition")
    },
    {
      element: same("Evidence source"),
      support: same("Retains hazard-log entries, architecture, configuration, tests, RAMS evidence, operating procedures and approved assumptions")
    }
  ]
};

export const OBJECTIVES = {
  h2: same("Define what the railway must prevent, detect, control or recover from."),
  body: same(
    "Safety objectives describe the intended safe outcome of the system in its defined operating context. They should derive from hazards and risk analysis rather than from a generic checklist."
  ),
  cols: { env: same("Railway environment"), objective: same("Example safety objective") },
  rows: [
    { env: same("Interlocking"), objective: same("Prevent conflicting routes or unsafe route-setting behaviour") },
    {
      env: same("CBTC / ATP"),
      objective: same("Preserve train separation and ensure safe response when trusted movement data is unavailable")
    },
    { env: same("ETCS / PTC"), objective: same("Prevent unsafe movement authority while retaining defined degraded operating modes") },
    {
      env: same("Traction power"),
      objective: same("Prevent unsafe energisation, switching or isolation and support controlled restoration")
    },
    {
      env: same("Station / tunnel"),
      objective: same("Maintain safe emergency operation, ventilation, evacuation support and emergency communications")
    },
    { env: same("Depot"), objective: same("Prevent unsafe maintenance, software loading, energisation or train release to service") },
    {
      env: same("Freight operations"),
      objective: same("Maintain controlled train movement, crossing safety, dispatch awareness and safe recovery during PTC or communications degradation")
    }
  ],
  assumptionHead: same("The cybersecurity assumptions beneath an objective"),
  assumptionIntro: same("The Twin makes visible the security assumptions that support a safety objective."),
  objective: same("Prevent unauthorised alteration of route-setting behaviour."),
  assumptions: [
    same("Configuration is authenticated and integrity-protected."),
    same("Engineering access is restricted to authorised personnel."),
    same("Vendor sessions are approved, recorded and time-limited."),
    same("Production signalling zones are segregated."),
    same("Change packages are validated before release."),
    same("A trusted baseline is available for recovery.")
  ],
  question: same("Can a cyber pathway invalidate a safety assumption, or bypass a barrier on which the safety objective depends?")
};

export const TRACE = {
  h2: same("Turn safety objectives into specific, traceable requirements."),
  body: same(
    "Safety requirements define what the system, subsystem, component, procedure, operator or external barrier must provide in order to control the identified risk. The trace below runs the full chain once, with a worked configuration-integrity requirement filling each rung."
  ),
  ladderHead: same("One requirement, traced end to end"),
  ladder: [
    {
      stage: same("Hazard"),
      worked: same("Unauthorised configuration change affects signalling behaviour.")
    },
    {
      stage: same("Safety objective"),
      worked: same("Prevent configuration change from compromising safe train movement.")
    },
    {
      stage: same("System-level safety requirement"),
      worked: same("Only validated, authorised, traceable configuration changes may be applied to the signalling environment.")
    },
    {
      stage: same("Allocated requirements"),
      worked: same(
        "Engineering workstation: named-user authentication and least privilege. Network: restricted conduit to the signalling configuration environment. Vendor access: MFA, approval, time-limited and recorded sessions. Configuration package: integrity protection and version identification. Maintenance process: dual review and change authorisation. Operations: approved validation before return to service. Recovery: trusted configuration baseline and tested restore process."
      )
    },
    {
      stage: same("Cybersecurity assumption or control"),
      worked: same("Each allocated requirement names the security condition it depends on, so the condition can be reviewed when it changes.")
    },
    {
      stage: same("Verification and validation evidence"),
      worked: same("Architecture, configuration, firewall policy, access design, component versions, test records and review artefacts, linked to the requirement rather than filed beside it.")
    },
    {
      stage: same("Safety argument and acceptance status"),
      worked: same("The claim, the reasoning and the evidence remain connected, and the acceptance decision records who accepted what, and under which conditions.")
    }
  ],
  allocHead: same("Requirement allocation"),
  allocIntro: same(
    "IEC 62278-2:2025 uses a systems approach because risk reduction rarely belongs to one device alone. A safety requirement can be allocated across technical architecture, operating procedures, maintenance processes, human roles, training, supplier obligations and independent barriers."
  ),
  allocCols: { type: same("Requirement type"), allocation: same("Possible allocation") },
  alloc: [
    {
      type: same("Functional safety behaviour"),
      allocation: same("Interlocking, CBTC controller, ETCS/RBC, PTC subsystem, PLC, relay, onboard system")
    },
    {
      type: same("Security boundary"),
      allocation: same("Firewall, segmentation, jump host, identity, certificate, remote-access policy")
    },
    {
      type: same("Configuration integrity"),
      allocation: same("Engineering workstation, source and configuration repository, signing process, approval workflow")
    },
    {
      type: same("Recovery capability"),
      allocation: same("Backup, spare, diagnostic tool, tested procedure, trained maintainer, vendor escalation")
    },
    {
      type: same("Safe operation in degraded mode"),
      allocation: same("Operating rule, dispatcher procedure, driver instruction, route restriction, field intervention")
    },
    {
      type: same("Detection and response"),
      allocation: same("Alarm, event logger, SOC, OCC, operator dashboard, maintenance alert, incident procedure")
    },
    {
      type: same("Supplier control"),
      allocation: same("Contractual support requirement, secure-update obligation, firmware lifecycle, spare availability, field-service controls")
    },
    {
      type: same("Independent assurance"),
      allocation: same("Review activity, verification plan, validation test, independent safety assessment, acceptance authority")
    }
  ],
  key: same(
    "A cybersecurity control is part of the safety architecture when it protects an assumption, interface, configuration or barrier required for safe railway operation."
  )
};

export const INTEGRITY = {
  h2: same("Make cybersecurity assumptions visible beneath safety-related functions."),
  body: same(
    "Safety integrity concerns whether a safety-related function performs adequately under stated conditions. A Cyber Digital Twin should not calculate or assign SIL automatically. That remains within the accountable railway safety process."
  ),
  bodyTwo: same("The Twin can, however, expose the dependencies that may affect the safety-integrity argument:"),
  chain: [
    same("Safety-related function"),
    same("Required integrity / performance objective"),
    same("Allocated subsystem and implementation"),
    same("Technical and operational assumptions"),
    same("Cybersecurity dependencies"),
    same("Verification, validation and acceptance evidence")
  ],
  cols: { fn: same("Safety function"), assumptions: same("Cybersecurity assumptions that may matter") },
  rows: [
    {
      fn: same("Prevent conflicting routes"),
      assumptions: same("Configuration integrity, authorised engineering access, controlled remote maintenance, trusted update path")
    },
    {
      fn: same("Preserve movement-authority integrity"),
      assumptions: same("Authentication, secure communications, time integrity, certificate lifecycle, access control, software integrity")
    },
    {
      fn: same("Safely isolate traction power"),
      assumptions: same("Restricted SCADA/RTU access, command integrity, logging, validated configuration, secure remote support")
    },
    {
      fn: same("Maintain safe train separation"),
      assumptions: same("Reliable signalling/CBTC/ETCS/PTC interfaces, protected configuration, network segmentation, managed failure response")
    },
    {
      fn: same("Support emergency ventilation or station response"),
      assumptions: same("Integrity and availability of controllers, operator interfaces, command paths, power, monitoring and incident procedures")
    },
    {
      fn: same("Release rolling stock safely after maintenance"),
      assumptions: same("Controlled diagnostics, authenticated software loading, configuration management, test evidence, maintenance approval")
    }
  ],
  caveat: same(
    "The Twin's job is not to declare the integrity level. Its job is to ensure the dependencies and cyber assumptions supporting the safety claim are visible, reviewable and monitored for change."
  )
};

export const VERIFICATION = {
  h2: same("Show that the control is implemented correctly — and works in the real railway context."),
  body: same("A safety argument needs both verification and validation."),
  cols: { activity: same("Activity"), question: same("Core question"), support: same("OXOT support") },
  rows: [
    {
      activity: same("Verification"),
      question: same("Was the requirement implemented correctly?"),
      support: same(
        "Links requirements to architecture, configuration, test records, firewall rules, access design, component versions and review artefacts"
      )
    },
    {
      activity: same("Validation"),
      question: same("Does the integrated system achieve safe behaviour in the intended operating environment?"),
      support: same("Models operational scenarios, degraded modes, system dependencies, recovery paths, interface behaviour and change consequences")
    }
  ],
  changeHead: same("A cybersecurity change, checked both ways"),
  proposal: same("Add segmentation between the vendor-access network and the signalling engineering zone."),
  verificationHead: same("Verification"),
  verification: [
    same("Firewall policy permits only approved flows."),
    same("MFA and approval controls are configured."),
    same("Required protocol paths are documented."),
    same("Configuration and logging requirements are met.")
  ],
  validationHead: same("Validation"),
  validation: [
    same("Fault diagnosis remains possible."),
    same("The signalling recovery process remains viable."),
    same("Required maintenance activity can occur safely."),
    same("Degraded-mode procedures remain valid."),
    same("No unintended control-centre, field or train-control dependency breaks.")
  ],
  note: same(
    "This is where the Cyber Digital Twin provides distinctive value: the candidate control is tested against the modelled railway before the operational system changes."
  )
};

export const EVIDENCE = {
  h2: same("Build a safety argument that remains connected to the railway."),
  body: same(
    "The safety argument should link claims, reasoning and evidence rather than become a static set of disconnected reports."
  ),
  claimHead: same("Claim"),
  claim: same("The railway system is acceptably safe for its defined operation."),
  argumentHead: same("Argument"),
  argument: same(
    "Hazards identified → safety requirements defined → requirements allocated → controls implemented → behaviour verified → railway context validated → residual risks accepted → operation and maintenance controlled"
  ),
  evidenceHead: same("Evidence"),
  evidenceItems: [
    same("System definition"),
    same("Hazard log"),
    same("Requirements"),
    same("Architecture"),
    same("Asset and interface model"),
    same("Tests"),
    same("Procedures"),
    same("Configuration baseline"),
    same("Maintenance records"),
    same("Assessments"),
    same("Approvals"),
    same("Change history")
  ],
  outputsHead: same("OXOT evidence outputs"),
  outputCols: { output: same("Output"), use: same("Use in railway safety work") },
  outputs: [
    {
      output: same("System-under-consideration model"),
      use: same("Defines boundaries, functions, interfaces, dependencies and operating context")
    },
    {
      output: same("Asset and function map"),
      use: same("Links equipment to railway functions, safety relevance and operational consequences")
    },
    {
      output: same("Hazard and consequence chain"),
      use: same("Connects an initiating event — including a cyber event — to hazardous condition, barriers and outcome")
    },
    {
      output: same("Safety-requirement trace"),
      use: same("Links safety objectives to requirements, allocated controls, verification and validation evidence")
    },
    {
      output: same("Cyber-assumption view"),
      use: same("Shows the security conditions that support safety-related functions and barriers")
    },
    {
      output: same("Zone/conduit and pathway view"),
      use: same("Supports assessment of whether cyber routes can reach safety-relevant systems")
    },
    {
      output: same("Control simulation report"),
      use: same("Tests firewall, segmentation, remote-access, patching, configuration or supplier changes")
    },
    {
      output: same("Degraded-mode and recovery map"),
      use: same("Shows procedures, assets, people, telecoms, power, tooling, spares and vendor dependencies required for safe recovery")
    },
    {
      output: same("Change-impact delta"),
      use: same("Identifies hazards, requirements, assumptions, interfaces, evidence and safety claims affected by a modification")
    },
    {
      output: same("Risk-acceptance record"),
      use: same("Captures compensating controls, accountable owner, expiry or review condition and residual-risk rationale")
    },
    {
      output: same("Assurance evidence pack"),
      use: same("Provides source-linked material for RAMS, safety-case, TS 50701, engineering and independent-review workflows")
    }
  ]
};

export const WORKED = {
  h2: same("Test secure vendor access against the safety argument."),
  note: same("Illustrative scenario — no customer data."),
  body: same(
    "A rail operator allows a signalling vendor remote access to diagnose and support an interlocking and its associated engineering environment. The connection is operationally valuable, because vendor specialists may be needed during overnight possessions or urgent fault recovery. However, the current pathway includes persistent access and broad reachability toward engineering tools."
  ),
  chainHead: same("The safety and cybersecurity model"),
  chain: [
    { stage: same("Safety objective"), detail: same("Prevent unauthorised configuration changes from affecting safe route setting.") },
    {
      stage: same("Safety requirement"),
      detail: same("Signalling configuration changes must be authorised, validated, traceable, and applied only through controlled processes.")
    },
    { stage: same("Cybersecurity concern"), detail: same("A persistent vendor pathway can reach an engineering workstation.") },
    {
      stage: same("Safety assumption affected"),
      detail: same("Only authorised and validated engineering actions can affect the signalling configuration environment.")
    },
    {
      stage: same("Candidate control"),
      detail: same("Brokered, named-user, MFA-protected, approved, time-limited, recorded access through a segmented maintenance gateway.")
    },
    {
      stage: same("Twin test"),
      detail: same("Does the control remove persistent reachability while preserving the diagnostic, validation and recovery flows required for safe operation?")
    }
  ],
  resultHead: same("What the model shows"),
  results: [
    same("Which vendor pathway reaches which engineering and signalling assets."),
    same("Which access and communication flows are actually required for support."),
    same("Which segmentation or access controls close unnecessary routes."),
    same("What dependencies remain for fault recovery."),
    same("Whether a new control affects the operating, maintenance, validation or return-to-service process."),
    same("Which safety requirement, assumption, evidence artefact and accountable approval must be updated.")
  ],
  pull: same(
    "The result is not simply that remote access was secured. It is an evidence-backed statement that the change supports the safety objective while preserving the conditions required for safe recovery."
  )
};

export const LIMITS = {
  h2: same("OXOT supports safety evidence. It does not replace railway safety authority."),
  body: same(
    "OXOT can support IEC 62278-2:2025-oriented work by modelling system boundaries, hazards, dependencies, cyber assumptions, safety-requirement allocation, candidate controls, evidence links and change impacts. However:"
  ),
  items: [
    same("OXOT does not create or approve a formal railway safety case by itself."),
    same("OXOT does not assign Safety Integrity Levels or determine tolerable risk."),
    same("OXOT does not act as an independent safety assessor, notified body, railway safety authority, regulator or certification body."),
    same("OXOT does not issue authorisation to place a railway subsystem or system into service."),
    same("OXOT does not guarantee compliance with IEC 62278-2, EN 50126-2, TS 50701, IEC 62443 or national railway requirements."),
    same(
      "Safety decisions, hazard-log ownership, acceptance, operational authority and independent assessment remain the responsibility of the accountable railway organisation and qualified parties."
    )
  ],
  close: same(
    "OXOT provides the connected evidence and scenario model that supports safety, RAMS, cybersecurity, operations and engineering teams."
  )
};

export const CLOSING = {
  h2: same("Start with one safety-relevant system and its cyber assumptions."),
  body: same(
    "Bring a system description, a signalling or interlocking diagram, a CBTC/ETCS/PTC architecture, a hazard-log extract, a safety requirement, a network topology, a vendor-access design or a proposed change. OXOT will show how the Cyber Digital Twin connects the cyber pathway to the safety objective, tests the control, and preserves the evidence required for a defensible railway safety decision."
  ),
  ctaPrimary: same("Discuss a railway safety and cyber scenario"),
  fine: same("An engineering conversation, not a sales call — bring the system you are actually worried about."),
  onwardHead: same("Related reading")
};
