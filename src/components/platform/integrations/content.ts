import { same } from "@/components/industries/registry";
import type { Bilingual } from "@/i18n/bilingual";

/**
 * /integrations — "Integrations & Data Inputs", the platform sub-page that
 * catalogues what the Cyber Digital Twin ingests and what it connects to.
 *
 * WHERE THE FACTS COME FROM. Nothing here is newly invented about the
 * product. The four integration categories (asset management, historians,
 * network monitoring, service management) are DEPLOYMENT.integrations in
 * src/components/cdt2/content-2.ts; the FMECA / RCIL / SCIL / MOR / Hazlog
 * definitions and the five CycloneDX bills of materials are
 * WHY_ANSWERS_HOLD in content-1.ts; the passive-first constraints and the
 * "your drawings are out of date" answer are FAQ in content-2.ts. Those
 * files belong to the protected /cdt-2 page and are READ, never imported —
 * this module restates the same facts in its own words so the two pages can
 * never contradict each other on terminology.
 *
 * The engineering-input list (P&IDs and DEXPI 2.0, control logic, network
 * topology, OT protocol captures) is from new_material_source/
 * 1_website_layout_v4/2_platform/platform.md, §"Technical credibility
 * layer".
 *
 * SCOPE. This page is the concrete "what connects to what" catalogue only.
 * The mechanism (how the twin reasons from these inputs) is /how-it-works;
 * the regulatory treatment is the /assurance pages. Neither is re-explained
 * here beyond the one sentence needed to say what an input becomes.
 *
 * `Bilingual` throughout via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, the convention
 * documented in components/industries/registry.ts.
 */

/** Locale-free route. Not in PATHS: nav.ts is the integration owner's file. */
export const INTEGRATIONS_PATH = "/integrations";

export const META = {
  title: "Integrations & Data Inputs | OXOT Cyber Digital Twin",
  description:
    "What the OXOT Cyber Digital Twin ingests: P&IDs and DEXPI 2.0, control logic, FMECA, SCIL, RCIL, MOR and hazard logs, network topology and OT protocol captures — plus asset management, historian, network monitoring and service management systems, and five CycloneDX bills of materials."
};

export const BREADCRUMB = {
  here: same("Integrations & Data Inputs")
};

export const HERO = {
  kicker: same("Integrations & data inputs"),
  h1: same("Bring what you already have."),
  lead: same(
    "The Cyber Digital Twin is built from engineering records your organisation already holds — drawings, control logic, reliability and safety analyses, topology — and from the systems of record you already run. Nothing is installed on the process network to make it work."
  ),
  body: same(
    "This page is the catalogue. Every class of input the model accepts, every system it reads from, which direction each connection runs in, and what each one becomes once it is inside the twin."
  ),
  ctaPrimary: same("Talk to an OT engineer"),
  ctaSecondary: same("See the platform")
};

/* ── The intake map ──────────────────────────────────────────────────────
   Four lanes of customer-held evidence converging on one ingestion stage,
   plus one lane that is OXOT's rather than yours. Rendered by IntakeMap.tsx
   as a real drawn convergence — see that file for why it is marked static. */

export interface IntakeLane {
  n: string;
  label: Bilingual;
  items: readonly Bilingual[];
}

export const INTAKE = {
  n: "01",
  id: "intake",
  title: same("Everything that goes in, and where it comes from."),
  dek: same(
    "Four bodies of evidence, all of them already in your organisation, and one external feed that is ours. They converge on a single reconciliation stage before anything becomes part of the model."
  ),
  lanes: [
    {
      n: "A",
      label: same("Process & engineering"),
      items: [
        same("P&IDs"),
        same("Process flow diagrams"),
        same("Equipment lists"),
        same("Control narratives"),
        same("Control logic")
      ]
    },
    {
      n: "B",
      label: same("Reliability & safety"),
      items: [same("FMECA"), same("RCIL"), same("SCIL"), same("MOR"), same("Hazard log")]
    },
    {
      n: "C",
      label: same("Network & protocol"),
      items: [
        same("Topology diagrams"),
        same("Firewall rule sets"),
        same("Switch & device configs"),
        same("OT protocol captures")
      ]
    },
    {
      n: "D",
      label: same("Systems of record"),
      items: [same("Asset management"), same("Historians"), same("Network monitoring"), same("Service management")]
    }
  ] satisfies readonly IntakeLane[],
  ingest: {
    role: same("Reconciliation"),
    label: same("Extraction, normalisation and gap analysis"),
    items: [
      same("P&ID extraction to DEXPI 2.0"),
      same("Asset identity resolution"),
      same("Purdue level assignment"),
      same("Zone & conduit derivation"),
      same("Record-versus-reality gap list")
    ]
  },
  external: {
    role: same("Ours, not yours"),
    label: same("External pressure"),
    items: [same("KEV"), same("EPSS"), same("CVSS"), same("MITRE ATT&CK"), same("Vendor advisories")],
    note: same(
      "The only input on this page that does not come from your organisation. It is applied after reachability, not before — a critical flaw on an asset nobody can reach is not a critical risk."
    )
  },
  model: {
    role: same("The twin"),
    label: same("One model of one facility"),
    items: [
      same("Process graph"),
      same("Zone & conduit model"),
      same("Five bills of materials"),
      same("Consequence chain"),
      same("Reachable pathways")
    ]
  },
  figureNote: same(
    "Static reference drawing. It shows the classes of input the twin accepts and the order they are reconciled in — not a view of any particular estate, and not a live connection status board."
  )
};

/* ── Engineering inputs ─────────────────────────────────────────────────── */

export const ENGINEERING = {
  n: "02",
  id: "engineering",
  title: same("Engineering evidence, and what each record becomes."),
  dek: same(
    "The severity of a failure is not something a security tool should be guessing at. Your engineers quantified it years ago, in documents that already exist. The twin inherits those figures rather than replacing them, which is why the euro number at the end rests on your own engineering judgement."
  ),
  subProcess: same("Process and control"),
  subAnalyses: same("Reliability and safety analyses"),
  subNetwork: same("Network and protocol evidence"),
  columns: [same("What you hold"), same("What it becomes in the model"), same("Formats we take")],
  process: [
    [
      same("P&IDs and process drawings"),
      same(
        "A machine-readable plant graph — equipment, instruments, lines and the safety functions that guard them — represented in DEXPI 2.0."
      ),
      same("PDF, DWG/DXF, native DEXPI/XML, scanned sheets")
    ],
    [
      same("Control narratives"),
      same(
        "What each loop is supposed to hold, and what it is supposed to prevent. The statement a modelled deviation is measured against."
      ),
      same("Documents, functional design specifications")
    ],
    [
      same("Control logic and configuration"),
      same(
        "The set points a safety function guards and the interlocks behind them, so a modelled excursion has a real stopping condition rather than an assumed one."
      ),
      same("Vendor project files, logic exports, configuration backups")
    ]
  ],
  analyses: [
    [
      same("FMECA"),
      same("Failure mode, effects and criticality per component — the severity the loss model inherits."),
      same("Spreadsheet, report, database export")
    ],
    [
      same("RCIL"),
      same("Reliability-critical items, and the loss of production or quality attached to each."),
      same("Spreadsheet, reliability database export")
    ],
    [
      same("SCIL"),
      same("Safety-critical items, mapped to the protecting functions that are supposed to catch them."),
      same("Spreadsheet, safety case documentation")
    ],
    [
      same("MOR"),
      same(
        "Minimum operating requirements and tolerable interruption — what a stop costs, and for how long it is survivable."
      ),
      same("Operating requirements documents, service definitions")
    ],
    [
      same("Hazard log"),
      same("Identified hazards to people, equipment and the environment, carried through to the consequence end of the chain."),
      same("Hazlog register, spreadsheet, report")
    ]
  ],
  network: [
    [
      same("Network topology"),
      same("Zones, conduits and Purdue levels — the graph a cyber pathway is actually traced across."),
      same("Diagrams, inventory exports, address plans")
    ],
    [
      same("Firewall and device configuration"),
      same("Which conduits are open in practice rather than on the drawing, and which rule would have to change to close one."),
      same("Rule set exports, running-configuration backups")
    ],
    [
      same("OT protocol captures"),
      same("What genuinely talks to what. Reconciled against what the topology diagram claims, and the difference is usually the finding."),
      same("PCAP from monitoring infrastructure you already operate")
    ]
  ],
  note: same(
    "Captures come from taps, spans or an OT monitoring platform already running in your estate. Building the twin never introduces a new collector onto the process network, and never generates traffic on it."
  )
};

/* ── Systems of record ──────────────────────────────────────────────────── */

export interface SystemCategory {
  n: string;
  name: Bilingual;
  contributes: Bilingual;
  answers: Bilingual;
  cadence: Bilingual;
}

export const SYSTEMS = {
  n: "03",
  id: "systems",
  title: same("The systems of record you already run."),
  dek: same(
    "The twin integrates with asset management, historians, network monitoring and service management applications, so the model draws on your systems of record instead of asking you to maintain a second inventory beside them."
  ),
  directionLabel: same("Direction"),
  direction: same("Inbound only"),
  cadenceLabel: same("Cadence"),
  answersLabel: same("Answers"),
  categories: [
    {
      n: "01",
      name: same("Asset management"),
      contributes: same(
        "The estate as your organisation records it: equipment identity, location, criticality, ownership and maintenance state."
      ),
      answers: same("Which physical thing is this, who owns it, and how important has the business already said it is?"),
      cadence: same("Periodic export or scheduled read")
    },
    {
      n: "02",
      name: same("Historians"),
      contributes: same(
        "Process values over time — the operating envelope the plant actually runs in, rather than the one the design case assumed."
      ),
      answers: same("What does normal look like here, and how far is it from the band a safety function is protecting?"),
      cadence: same("Scheduled read of a bounded tag set")
    },
    {
      n: "03",
      name: same("Network monitoring"),
      contributes: same(
        "The device inventory and communication baseline an OT monitoring platform has already discovered passively."
      ),
      answers: same(
        "What is on the network? Monitoring answers that well. It cannot tell you which finding to fund first, or what stops running if a specific controller is turned against you."
      ),
      cadence: same("Periodic inventory export")
    },
    {
      n: "04",
      name: same("Service management"),
      contributes: same(
        "Change, incident and work-order records, so a modelled configuration can be reconciled against what was actually changed and when."
      ),
      answers: same("Is the model still describing the plant as it stands today, or as it stood at the last drawing revision?"),
      cadence: same("Periodic read of change and incident records")
    }
  ] satisfies readonly SystemCategory[],
  note: same(
    "Every one of these is read. The twin is not a control plane and does not write into your systems of record, raise work orders in them or change their contents. In island and data-diode configurations that constraint is enforced by the architecture rather than by policy — nothing has a path out."
  )
};

/* ── Bills of materials ─────────────────────────────────────────────────── */

export const BOMS = {
  n: "04",
  id: "boms",
  title: same("Five bills of materials, one dependency graph."),
  dek: same(
    "An asset is not one thing. It is a hardware revision running a firmware image built from libraries, speaking a cipher suite, reached by a service, operated a particular way. Each of those is a dependency, and each is a place a flaw can sit. The twin resolves all five views into a single graph, so a vulnerability five libraries deep still surfaces against the controller that carries it."
  ),
  columns: [same("View"), same("Covers"), same("What it answers")],
  rows: [
    [
      same("SBOM"),
      same("Software, down to the library"),
      same("Which component of this firmware carries the flaw, and how deep in the tree is it?")
    ],
    [
      same("HBOM"),
      same("Hardware and firmware"),
      same("Which revision of which module is actually installed, and is it still supported?")
    ],
    [
      same("CBOM"),
      same("Cryptography, including post-quantum exposure"),
      same("What is this device trusting to keep a session private, and how long does that hold?")
    ],
    [
      same("SaaS-BOM"),
      same("Cloud services in the estate"),
      same("Which external service does an operational function now depend on to keep working?")
    ],
    [
      same("Ops-BOM"),
      same("How the plant is actually operated"),
      same("Who reaches this, how often, and through which route — including the vendor session nobody drew.")
    ]
  ],
  closing: same(
    "Machine-readable in CycloneDX, versioned and diffable, with transitive dependencies traced — so the technical file a regulator asks for is generated from the model rather than written from memory."
  ),
  graphLabel: same("One asset, resolved"),
  graphNote: same(
    "Illustrative structure with synthetic values, drawn as static markup. It shows how the five views nest under a single asset and how depth is recorded — not the contents of any real estate."
  ),
  specCta: same("Read the technical specification")
};

/* ── The boundary ───────────────────────────────────────────────────────── */

export const BOUNDARY = {
  n: "05",
  id: "boundary",
  title: same("What is never installed."),
  dek: same(
    "Passive-first is a constraint on the architecture, not a marketing position, and it holds in every deployment configuration. It is worth stating as a list of absences, because absences are what an OT engineer is actually asking about."
  ),
  items: [
    same("No agent on a PLC, RTU, controller, HMI or engineering workstation."),
    same("No active scanning of the process network, and no probe traffic generated on it."),
    same("No new collector placed on the process network in order to build the model."),
    same(
      "No path from the twin into a control system — island mode has no external dependency at all, and the one-way data diode makes inbound-only a property of the wiring rather than a setting."
    ),
    same("No writes back into the systems of record the model reads from.")
  ],
  closing: same(
    "There are three ways to run it: isolated island mode, a one-way data diode, and a single-tenant instance in the region your data sovereignty requirements name. All three are passive-first — the choice is about where the model sits, not about what it is allowed to touch."
  ),
  cta: same("Deployment configurations")
};

/* ── The gap ────────────────────────────────────────────────────────────── */

export const RECORDS = {
  n: "06",
  id: "records",
  title: same("Your drawings are out of date. Everyone's are."),
  dek: same(
    "The record never matches the plant exactly, and a model that required it to would never be built anywhere. Reconciling the two is part of the engagement rather than a prerequisite for starting one."
  ),
  steps: [
    {
      title: same("Send what exists"),
      body: same("Whatever revision you have. An old P&ID and a partial asset list is a starting position, not a blocker.")
    },
    {
      title: same("Reconcile against observation"),
      body: same(
        "The drawing is compared against captures, configuration exports and the inventory your monitoring platform already holds."
      )
    },
    {
      title: same("Take the gap list"),
      body: same(
        "Everything the record and the estate disagree about, written down. Customers usually find this the first valuable output, because nobody had it before."
      )
    },
    {
      title: same("Model on what is known"),
      body: same(
        "Assumptions are recorded as assumptions and cited beside the values they produced, so a reader can see which figures rest on them."
      )
    }
  ],
  minimumLabel: same("The minimum to start"),
  minimum: same("One P&ID and an asset list, for a single facility.")
};

export const CLOSING = {
  title: same("Start with one facility."),
  body: same(
    "Bring one P&ID and an asset list. That is enough to build the first model, produce the gap list, and show what the reconciliation is worth before anything larger is scoped."
  ),
  ctaPrimary: same("Request a technical briefing"),
  ctaSecondary: same("See the platform")
};
