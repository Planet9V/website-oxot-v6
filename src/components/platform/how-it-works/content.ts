/**
 * /how-it-works — the mechanical explanation of the Cyber Digital Twin.
 *
 * SOURCE. The page's backbone is the scrollytelling chain recommended in
 * new_material_source/1_website_layout_v4/2_platform/platform.md ("engineering
 * evidence -> physical consequence -> actual cyber pathway -> threat and
 * likelihood -> financial exposure and control options -> traceable, drillable
 * decision"), plus that document's four-step build sequence and its list of
 * technical-credibility modules.
 *
 * RELATIONSHIP TO /cdt-2. The same product story is told on /cdt-2, whose copy
 * (components/cdt2/content-2.ts) was read for facts, tone and vocabulary so the
 * two pages cannot contradict each other on what the model is or what it
 * inherits. Nothing is imported from it and nothing is reprinted: /cdt-2 argues
 * that the twin is worth having, this page explains how it arrives at an
 * answer. Where both pages must state the same fact — consequence is inherited
 * from the customer's own engineering, external intelligence moves likelihood
 * and never consequence — the fact is the same and the sentences are not.
 *
 * SHAPE. OXOT_Composition_Rules.md, Platform: "long-form product narrative …
 * technical architecture as progressive disclosure … one strong final CTA." So
 * the chain is six long-form sections rather than six cards, and the technical
 * detail is behind an accordion (./content-technical.ts) rather than printed
 * as a wall.
 *
 * `Bilingual` via `same()` — both locales render, `nl` is a placeholder
 * pending translation, not a claim of correct Dutch. Same convention as the
 * industry and assurance pages; grep `same(` for the translation pass.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { PATHS } from "@/components/shell/nav";

export const META = {
  title: "How the Cyber Digital Twin Works",
  description:
    "From P&IDs and safety studies to a reachable cyber pathway, a physical consequence, a loss distribution and a decision that takes apart. The mechanics of OXOT's Seldon Engine, step by step."
};

export const BREADCRUMB = {
  here: same("How it works")
};

export const HERO = {
  kicker: same("Platform / How it works"),
  h1: same("The chain from a drawing to a decision."),
  lead: same(
    "Every figure this platform produces can be walked backwards — to a control option, to a loss distribution, to a reachable pathway, to a consequence your own engineers already assessed, to a line on a drawing you already hold."
  ),
  body: same(
    "This page walks it forwards, once, in order. Nothing in it is inferred from a severity score, and nothing about it is a black box."
  ),
  /* The passive-first position, stated before the mechanics rather than in a
     footnote — it is the first question every OT engineer asks. */
  guarantees: [
    same("No agents on controllers"),
    same("No active scanning of the process network"),
    same("Built from records you already hold"),
    same("Island, data-diode or single-tenant deployment")
  ]
};

/** One link in the reasoning chain — the page's six body sections. */
export interface ChainLink {
  id: string;
  n: string;
  /** The short form, for the chain map at the top of the page. */
  short: Bilingual;
  title: Bilingual;
  dek: Bilingual;
  body: readonly Bilingual[];
}

export const CHAIN_MAP = {
  kicker: same("The chain"),
  caption: same(
    "Six links, in order. Each is a section below and each node here jumps to it — a static map of this page, not a view of a model."
  )
};

/** Alt text for the CDT architecture figure that rides beside the chain. */
export const CHAIN_FIGURE_ALT = same(
  "Layered architecture of the Cyber Digital Twin: engineering evidence and control logic at the base, resolving upward through the physics and reachability model to the decision layer"
);

export const CHAIN: readonly ChainLink[] = [
  {
    id: "evidence",
    n: "01",
    short: same("Engineering evidence"),
    title: same("Start from the record the plant was built to."),
    dek: same(
      "A scan tells you what answered. An engineering record tells you what the equipment is for, what it is holding back, and who signed off on what happens when it stops."
    ),
    body: [
      same(
        "The model is assembled from documents that already exist inside the business and are already owned by the people who carry the consequence. P&IDs and their DEXPI 2.0 representation give the process and its instrumentation. Control logic, SCADA projects and PLC programs give what each machine is actually told to do. FMECA studies, hazard logs and SIL determinations give what fails, how it fails, and how badly."
      ),
      same(
        "Two documents matter more than their profile suggests. Minimum operating requirements state what a site cannot run without — the boundary between a degraded plant and a stopped one. SCIL and RCIL, the safety and reliability criticality rankings, are the plant's own ordering of which functions carry the weight. They were written by engineers who were not thinking about cyber at the time, which is precisely why they hold up when a cyber finding is attached to them."
      ),
      same(
        "Where the record and the plant disagree, the gap is an output rather than a blocker. Reconciliation is part of the build, and the discrepancy list that falls out of it is usually the first thing a customer finds valuable — because until then nobody had it written down."
      )
    ]
  },
  {
    id: "consequence",
    n: "02",
    short: same("Physical consequence"),
    title: same("Consequence is inherited, never invented."),
    dek: same(
      "OXOT does not decide what a failure costs. The plant's own engineering already did, and the model's job is to attach that answer to the assets capable of causing it."
    ),
    body: [
      same(
        "The bottom layer of the model is physics — thermodynamics, fluid dynamics, kinetics, and the tolerances the equipment was specified against decades before anything in the building was addressable. Model an industrial site as IT infrastructure and you discard the one property that makes it dangerous: mass, pressure, heat and time are indifferent to a severity score."
      ),
      same(
        "So the path from a component to a consequence runs through the engineering rather than around it. A controller is not critical because it is old and reachable from the office network. It is critical because the interlock it executes is the last thing between a dosing set point and a public water supply, and a document in the customer's own safety file says so."
      ),
      same(
        "This is also why the numbers survive an argument. Disputing a loss figure means disputing your own FMECA and your own minimum operating requirements — which is a productive argument to have, because it ends with a better record either way."
      )
    ]
  },
  {
    id: "pathway",
    n: "03",
    short: same("Cyber pathway"),
    title: same("Present is not the same as reachable."),
    dek: same(
      "Most OT risk registers are lists of things that are present. The expensive question is which of them can actually be got at, from where, and through what."
    ),
    body: [
      same(
        "Reachability is computed against the topology as configured rather than as drawn: real network state, VLAN and firewall configuration, routing, the conduits between Purdue zones, and the remote-access routes that exist because a vendor needed one at three in the morning in 2019 and nobody removed it."
      ),
      same(
        "A vulnerability with no path to it from any origin an adversary can occupy does not enter the loss calculation. A modest one sitting on a live path from a vendor session into a Level 1 controller does, and it outranks a critical CVE on an isolated asset. That inversion is the whole reason a reachability model is worth building — it is also the reason the platform can tell you what to leave alone."
      ),
      same(
        "The same computation runs in reverse. Propose a segmentation boundary, a brokered access route or a firewall rule and the model recomputes which paths survive it, so a control is reported by the pathways it actually removes rather than by the controls it claims to satisfy."
      )
    ]
  },
  {
    id: "likelihood",
    n: "04",
    short: same("Threat & likelihood"),
    title: same("External conditions move likelihood. They never move consequence."),
    dek: same(
      "What a failure costs belongs to the plant and does not change because the world did. How likely a pathway is to be used belongs to the outside, and changes constantly."
    ),
    body: [
      same(
        "Threat inputs are scored against this facility rather than in general: the protocols it actually runs, the vendor products actually installed in it, the sector it operates in and the geography it sits in. Adversary capability and motivation, technique fit, known-exploited status and operational tempo each move likelihood on a stated axis."
      ),
      same(
        "Keeping likelihood and consequence apart is deliberate and load-bearing. Blend them and you get one opaque score that moves for reasons nobody can attribute. Keep them separate and a figure that changed on a Tuesday, when nothing inside the fence was touched, has a cause — and the cause is citable, dated, and attached to the value it produced."
      )
    ]
  },
  {
    id: "exposure",
    n: "05",
    short: same("Financial exposure"),
    title: same("A distribution, not a number."),
    dek: same(
      "One figure invites an argument about the figure. A distribution with a stated confidence interval invites an argument about which input is wrong — and that argument ends."
    ),
    body: [
      same(
        "Loss is simulated rather than asserted. Monte Carlo runs over the pathway set, the inherited consequence chain and the likelihood inputs, and produces a probability landscape in euros: an annualised loss expectancy for planning, and a tail for the events that decide whether a site comes back from them."
      ),
      same(
        "Candidate controls are then evaluated inside the same model. Each one is priced, simulated and reported by the exposure it removes, so segmentation, a brokered access route, a patch window and a vendor change are compared on the one axis a capital committee can act on."
      ),
      same(
        "What comes out is a bounded recommendation with a ceiling — a stated point past which the next euro buys materially less. That is a different instrument from an open-ended security ask, and it is usually the thing that unlocks a budget rather than competing for one."
      )
    ]
  },
  {
    id: "decision",
    n: "06",
    short: same("Traceable decision"),
    title: same("Every figure takes apart."),
    dek: same(
      "A model nobody can disassemble is a black box with a logo on it. This one drills in both directions, and cites everything it borrowed."
    ),
    body: [
      same(
        "Any value on the platform can be opened: from an organisation-level index down through a site, a line, a piece of equipment, a component, the pathway that reaches it and the specific safety function at the far end — then back up, so a component-level change reports what it did to the group figure."
      ),
      same(
        "Bills of materials are versioned and diffable across software, hardware, cryptographic, SaaS and operational dependencies. Change a firmware version and the delta is a document rather than somebody's recollection."
      ),
      same(
        "Every external input is cited beside the value it produced, with the date it was retrieved. That is what lets a decision hold up eighteen months later, in front of an auditor, after the person who made it has left the company."
      )
    ]
  }
];

/** Section 01's supporting figure: what actually goes in, by discipline. */
export const INPUTS = {
  heading: same("What the build consumes"),
  note: same("Documents, not telemetry. Every item below is something the business already holds."),
  groups: [
    {
      label: same("Process & instrumentation"),
      items: [same("P&IDs"), same("DEXPI 2.0"), same("Equipment specifications"), same("Line lists"), same("Instrument index")]
    },
    {
      label: same("Control & automation"),
      items: [same("PLC programs"), same("SCADA / HMI projects"), same("Control narratives"), same("Interlock schedules")]
    },
    {
      label: same("Safety & reliability"),
      items: [same("FMECA (IEC 60812)"), same("Hazard logs"), same("SIL determination (IEC 61508)"), same("RAMS records")]
    },
    {
      label: same("Operational limits"),
      items: [same("Minimum operating requirements"), same("SCIL"), same("RCIL"), same("Tolerable downtime")]
    },
    {
      label: same("Topology & inventory"),
      items: [same("Network drawings"), same("VLAN & firewall configuration"), same("Asset registers"), same("CycloneDX inventories")]
    }
  ]
};

/** Section 02's supporting figure: the ladder a consequence climbs. */
export const CONSEQUENCE_LADDER = {
  heading: same("How a component becomes a consequence"),
  rungs: [
    { k: same("Component"), v: same("A controller, a transmitter, a valve positioner, a firmware version.") },
    { k: same("Function"), v: same("The interlock, control loop or safety function that component executes.") },
    { k: same("Process unit"), v: same("What the function is protecting or regulating, and the tolerances it holds.") },
    { k: same("Site output"), v: same("Production, quality, and the minimum operating requirement it breaches.") },
    { k: same("Obligation"), v: same("Contractual supply, licence condition or public-safety duty at the end of it.") }
  ]
};

/**
 * Section 03's drawing. The note is not decoration — it is the sentence that
 * keeps an illustrative figure from being mistaken for a customer's own
 * environment, and it sits directly under the drawing for that reason.
 */
export const REACH = {
  heading: same("Reachable against present"),
  note: same(
    "A static reference drawing of an illustrative topology. It is not a view of a live model and it holds no customer data. Both columns carry comparable assets; only the routes between them differ, and that difference is the whole ranking."
  )
};

/** Section 04's supporting figure: the axes likelihood actually moves on. */
export const LIKELIHOOD_AXES = {
  heading: same("What moves likelihood"),
  rows: [
    { k: same("Adversary"), v: same("Capability, motivation and track record of the actors credibly interested in this sector.") },
    { k: same("Technique"), v: same("Whether an actor's known techniques fit the protocols and products this facility runs.") },
    { k: same("Product"), v: same("Installed vendor products and firmware, enriched with known-exploited status.") },
    { k: same("Geography"), v: same("Where the site sits, and the geopolitical and infrastructure pressure around it.") },
    { k: same("Tempo"), v: same("How active the relevant activity is right now, rather than across an average year.") }
  ]
};

/** Section 05's supporting figure: what the simulation actually reports. */
export const EXPOSURE_OUTPUTS = {
  heading: same("What the simulation reports"),
  rows: [
    { k: same("ALE"), v: same("Annualised loss expectancy, for planning and for the budget conversation.") },
    { k: same("Tail"), v: same("The low-probability, site-ending end of the distribution, reported separately.") },
    { k: same("Interval"), v: same("A confidence interval, so uncertainty is stated rather than hidden inside a point estimate.") },
    { k: same("Delta"), v: same("Exposure removed by each candidate control, computed on the same pathway set.") },
    { k: same("Ceiling"), v: same("The spend past which further control buys materially less risk reduction.") }
  ]
};

/** Section 06's supporting figure: the drill path, both directions. */
export const DRILL = {
  heading: same("Five levels, both directions"),
  levels: [same("Organisation"), same("Facility"), same("Line"), same("Equipment"), same("Component")],
  note: same(
    "Down from the organisational index to a firmware version and the safety function behind it; up from one component to what it costs the group."
  )
};

/** The four-step build sequence — how the model comes into existence. */
export const BUILD = {
  kicker: same("How the twin is built"),
  h2: same("Four steps, run with your engineers rather than shipped to them."),
  intro: same(
    "The chain above is what the model reasons over. This is how it comes into existence. It is a consulting-led build: OXOT OT engineers assemble and validate it alongside your team, because the hard part is judgement under plant constraints and that does not transfer from a licence key."
  ),
  /* The two ledger labels every step prints. Bilingual like everything else,
     rather than literals in the component — a two-word label is exactly the
     kind of string that gets left in English through a translation pass. */
  labelTakes: same("Takes"),
  labelMakes: same("Makes"),
  steps: [
    {
      n: "01",
      title: same("Build from engineering truth"),
      body: same(
        "Ingest the engineering record and reconcile it against the plant as it stands, resolving what the drawings and the asset registers disagree about."
      ),
      takes: same("P&IDs, control logic, safety studies, asset registers, network drawings"),
      makes: same("A reconciled facility model, and a documented list of every gap found")
    },
    {
      n: "02",
      title: same("Model actual cyber reachability"),
      body: same(
        "Compute what can be reached from where, over the topology as configured — zones, conduits, routing, remote access and protocol behaviour."
      ),
      takes: same("Topology, VLAN and firewall configuration, remote-access routes, protocol behaviour"),
      makes: same("The computed pathway set between zones and into each critical function")
    },
    {
      n: "03",
      title: same("Simulate pathway and consequence"),
      body: same(
        "Run the pathways against the inherited consequence chain and the likelihood inputs, then run them again under each candidate control."
      ),
      takes: same("Pathway set, consequence chain, threat and likelihood inputs, control costs"),
      makes: same("Loss distributions per pathway, and the same distributions under each proposed change")
    },
    {
      n: "04",
      title: same("Prioritise and generate evidence"),
      body: same(
        "Rank the work by exposure removed per euro, and emit what the relevant regime asks for from the same model rather than from a parallel document set."
      ),
      takes: same("Loss deltas, control costs, standard and regulatory requirements"),
      makes: same("A ranked queue, a bounded spend recommendation, and regime-mapped evidence")
    }
  ]
};

/** One model, several projections. */
export const VIEWS = {
  kicker: same("One model, many views"),
  h2: same("Four groups have to agree. They do not read the same document."),
  intro: same(
    "OT security stalls when the process engineer, the network architect, the reliability engineer and the person who has to physically walk to the cabinet are each reading a different document and arguing about which one is current. These are four projections of a single model: change it once and all four are correct."
  ),
  note: same(
    "The four drawings below are illustrative notations, drawn here to show what each projection looks like. They are static reference figures — not views of a live model, and they carry no customer data."
  ),
  items: [
    {
      key: "pid" as const,
      name: same("P&ID"),
      body: same("The plant as drawn, with every instrument now carrying its cyber state alongside its process tag.")
    },
    {
      key: "purdue" as const,
      name: same("Purdue & network"),
      body: same("Levels, zones and conduits with real topology on them — the routes an adversary would actually take.")
    },
    {
      key: "graph" as const,
      name: same("Dependency graph"),
      body: same("Interconnections and transitive dependencies, so a change reports everything downstream of it.")
    },
    {
      key: "site" as const,
      name: same("Site & spatial"),
      body: same("Physical context, for the people who have to find the cabinet and get to it during an outage.")
    }
  ]
};

/** Where this page hands off. Every destination is a real, bilingual page. */
export const ONWARD = {
  kicker: same("Where the evidence lands"),
  h2: same("The same model, read by a regime."),
  intro: same(
    "Evidence is generated from the model rather than assembled beside it, so the artefacts a standard asks for are projections of the work rather than a second job."
  ),
  /* Locale-free paths from PATHS, never hard-coded — a literal "/en/…"
     anywhere in a component is the Dutch bug nav.ts's own header warns
     about. All four of these regime pages render both locales, so unlike
     /technical-specification they need no `locale === "en"` guard. */
  links: [
    {
      path: PATHS.assuranceIec62443,
      label: same("IEC 62443"),
      body: same("System under consideration, zones and conduits, target security levels, risk treatment.")
    },
    {
      path: PATHS.assuranceTs50701,
      label: same("TS 50701"),
      body: same("The railway application of the same partitioning, sitting alongside IEC 62443.")
    },
    {
      path: PATHS.assuranceCra,
      label: same("Cyber Resilience Act"),
      body: same("Product-side obligations, and the technical documentation that has to stand behind them.")
    },
    {
      path: PATHS.assuranceEvidenceProvenance,
      label: same("Evidence & provenance"),
      body: same("How a figure is traced back to the input, the source and the date that produced it.")
    }
  ]
};

export const CLOSING = {
  h2: same("Bring one P&ID and an asset list for a single facility."),
  body: same(
    "That is the whole ask. It is enough to show how a record you already hold becomes a reachable pathway, a consequence with a euro figure attached, and a decision that still takes apart in front of an auditor eighteen months from now."
  ),
  ctaPrimary: same("Request a technical briefing"),
  ctaSecondary: same("Read the technical specification"),
  /* Shown to NL readers instead of the specification link, which is EN-only. */
  ctaSecondaryNl: same("Explore the Cyber Digital Twin")
};
