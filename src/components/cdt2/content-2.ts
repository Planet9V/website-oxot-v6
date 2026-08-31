/**
 * CDT-2 COPY, PART 2 — sections 10 through 17. See content-1.ts's header
 * for sourcing (verbatim from the HTML reference, not the summarized spec)
 * and the EN-only decision.
 */

export const EXTERNAL_PRESSURE = {
  eyebrow: "External pressure",
  h2: "Risk does not stop at the fence line.",
  /* Reframe added 2026-08-22 (owner request, via platform_critique_review.md
     item 5): the section named WorldMonitor/ATQ/TACAM before explaining what
     they're for, which could read as a second product bolted onto the twin.
     This states the actual relationship — external intelligence moves
     likelihood, your own engineering still owns consequence — before any of
     the named sub-concepts appear, not only in the closing line as before. */
  reframe: "External conditions change likelihood — not engineering consequence. Your engineering evidence still defines what a failure costs; external intelligence only updates how likely a given pathway is to be used.",
  paragraphs: [
    "Every facility sits somewhere, and where it sits changes what can happen to it. WorldMonitor tracks real-time geopolitical, economic, military and environmental pressure across nine specialised domains and binds it to each site's actual location — so the model's answer moves when the world moves, before any incident occurs.",
    "This is an input to the simulation, not a separate report on a different desk. The number moves on a Tuesday when nothing inside the fence was touched."
  ],
  image: "/images/cdt2/worldmonitor.png",
  domains: [
    "News & geopolitics",
    "Military & security",
    "Maritime & aviation",
    "Cyber & infrastructure",
    "Climate & disasters",
    "Energy & commodities",
    "Finance & economy",
    "Government & supply chain",
    "Nuclear & strategic facilities"
  ],
  panels: [
    {
      heading: "Country and knock-on effects",
      items: [
        { name: "31-Country Instability Index", body: "governance, stability and conflict signals per country" },
        { name: "Knock-on failure analysis", body: "how an infrastructure failure elsewhere propagates into your operation" },
        { name: "Value chain", body: "upstream and downstream partners assessed continuously" },
        { name: "Supplier rating", body: "vendors and products scored on track record" }
      ]
    },
    {
      heading: "Who is coming, and with what",
      items: [
        {
          name: "Attacker profiles (ATQ)",
          body: "attacker behavioural profiles: capability, motivation, and how dangerous each actor is to this facility"
        },
        {
          name: "Threat fingerprints (TACAM)",
          body: "cyber threats, vulnerabilities, TTPs and KEV-enriched exposure, fingerprinted across seven dimensions"
        }
      ],
      dimensions: "Techniques, sector, geography, OT protocol, tempo, vendor products and weakness families"
    }
  ],
  closing: "External pressure supplies the likelihood. Your own engineering supplies the loss. The twin is where the two meet."
};

export const ENGINE_INTRO = {
  eyebrow: "How this is possible · the engine",
  h2: "You cannot defend what you have never modelled.",
  lead: "Everything above rests on one thing: a living, queryable model of your plant — every asset, every flow, every dependency — built from documents you already hold and kept in step with the plant as it changes.",
  sub: "Four engineering disciplines meet in it.",
  disciplines: [
    { n: "01", title: "Engineering-accurate facility model", body: "Equipment, wiring, piping, signals and Purdue L0–L5 zones, from your P&IDs and DEXPI standards." },
    { n: "02", title: "What-if scenario simulation", body: "Test a firmware update, a re-zoning or a failure mode before it touches live production." },
    { n: "03", title: "Safety, reliability and cyber convergence", body: "SIL (IEC 61508), FMECA (IEC 60812) and RAMS metrics joined to live CVE and KEV exploit data." },
    { n: "04", title: "Capital investment prioritisation", body: "Loss exposure in euros, so remediation is ranked by what the next euro actually buys." }
  ]
};

export const ENGINE_IEC_NATIVE = {
  eyebrow: "The architecture underneath",
  h2: "Everything we build is IEC 62443 native.",
  intro:
    "The standard is not an appendix to the model — it is how the model is partitioned. Zones and conduits are the structure the twin is assembled in, so target and achieved security levels are properties of the model itself, and every finding, every simulated pathway and every euro of exposure can be attributed to a zone. TS 50701 sits alongside it for rail.",
  cards: [
    { title: "Zones and conduits", body: "How the plant is divided, in the model and on the ground" },
    { title: "Security levels", body: "Target against achieved, per zone, computed not asserted" },
    { title: "Attribution", body: "Every pathway and every euro traceable to a zone" }
  ]
};

export const ENGINE_WHAT_IT_IS = {
  eyebrow: "What it is",
  h2: "A plant you can attack without consequences.",
  paragraphs: [
    "A digital twin is a computable replica of a physical thing — accurate enough that you can run experiments on the replica instead of the plant. Aerospace and process engineering have worked this way for decades.",
    "A Cyber Digital Twin is that replica carrying its security state alongside its engineering state: the firmware each controller is actually running, the pathways between them, the vulnerabilities on those pathways, and the adversaries who use them.",
    'That pairing is what makes the real question answerable. Not "is this vulnerable" but "if this is exploited, what stops running, and who gets hurt."'
  ],
  isNot: {
    heading: "It is not",
    items: [
      "A dashboard over your existing tools",
      "A scanner or an agent on your controllers",
      "A diagram that ages the day it is drawn",
      "A maturity score out of five",
      "A one-off assessment report"
    ]
  },
  is: {
    heading: "It is",
    items: [
      "A model that computes — you ask it questions and it answers",
      "Passive: built from your engineering record, not from probing the plant",
      "Living: change a component and the BOMs and risk deltas regenerate",
      "A probability landscape in euros, with confidence intervals",
      "A standing capability your team can run and interrogate"
    ]
  }
};

export const ENGINE_DIFFERENT = {
  eyebrow: "What makes it different",
  h2: "Most twins are built to make a plant faster. Ours is built to keep it running.",
  compare: [
    {
      label: "Traditional digital twin",
      title: "Optimises operations",
      body: "Throughput, yield, energy, maintenance windows. It models the plant working well, and it assumes the plant is intact."
    },
    {
      label: "OXOT Cyber Digital Twin",
      accent: true,
      title: "Identifies risk to minimum operations and crown jewels",
      body: "It models the plant under attack, under drift and under external pressure — and tells you what threatens the assets and the output you cannot lose."
    }
  ],
  panels: [
    {
      heading: "Built for OT, not adapted from IT.",
      body: "Industrial security starts with the process, the machines and the operational reality around them. Availability, safety, lifecycle, legacy technology and production constraints all matter — which is why our work starts with your environment, not with a checklist."
    },
    {
      heading: "Safety and reliability are in the model, not the appendix.",
      body: "Safety, reliability and minimum operating requirements are integrated from the start. A cyber finding inherits the consequence your own engineers already assessed and signed off."
    }
  ]
};

export const ENGINE_MODEL = {
  eyebrow: "The model",
  h2: "Seven layers, built from the ground up.",
  paragraphs: [
    "A plant is not a network diagram. It is mass, pressure, heat and time, held inside tolerances engineers set decades before anything in the building was addressable. Model it as IT infrastructure and you discard the property that makes it dangerous.",
    "So the model is built the way the plant was built: from the ground up, one layer at a time, each carrying what the layer below cannot explain about itself."
  ],
  image: "/images/cdt2/model-architecture.png",
  io: [
    {
      label: "Engineering data in",
      body: "P&IDs, DEXPI 2.0, equipment specs, network topology and CycloneDX inventories — your own record, not a reference architecture."
    },
    {
      label: "One unified BOM out",
      body: "Continuously synchronised across all seven layers, so full-stack simulation runs against the plant as it is today."
    }
  ],
  layersHeading: "The seven layers",
  layersSub: "Read from the bottom up",
  layersIntro: "Four movements: what is physically true, how it connects, what it means, and what you do about it.",
  movements: [
    {
      movement: "Decide",
      movementSub: "What you do about it",
      layers: [{ code: "L7", name: "Governance", sub: "Strategy & compliance", contents: "Risk and consequence management · what-if scenarios · compliance frameworks · reporting" }]
    },
    {
      movement: "Interpret",
      movementSub: "What it means",
      layers: [
        { code: "L6", name: "Service", sub: "Business logic & applications", contents: "AI/ML services · user apps · process optimization" },
        { code: "L5", name: "Data", sub: "Fusion & analytics", contents: "Unified data model · threats · geopolitical data" }
      ]
    },
    {
      movement: "Connect",
      movementSub: "How it communicates",
      layers: [
        { code: "L4", name: "Networks", sub: "Topology & communications", contents: "Network state · virtual networks · flow data" },
        { code: "L3", name: "Interoperation", sub: "Asset models & protocols", contents: "MQTT · OPC UA · TCP/IP · DEXPI 2.0 · CycloneDX data integration" }
      ]
    },
    {
      movement: "Ground",
      movementSub: "What is physically true",
      layers: [
        { code: "L2", name: "Assets", sub: "Physical systems & deployment", contents: "PLC programs · SCADA config · virtualized elements" },
        { code: "L1", name: "Facility Physics", sub: "Environmental & kinetics", contents: "Physics-based simulation · thermodynamics · fluid dynamics" }
      ]
    }
  ],
  closing:
    "Layer one is not a firewall. Everything above it inherits its consequences from the physics — which is why a finding here is measured in production, safety and euros rather than severity."
};

export const ENGINE_LENSES = {
  eyebrow: "One model, many lenses",
  h2: "Every group reads the plant in its own language.",
  intro:
    "OT security stalls when the process engineer, the network architect, the safety authority and the board are reading four different documents and arguing about which is current. The twin is one object with several projections — change it once and every view is correct.",
  lenses: [
    { name: "P&ID", body: "The plant as drawn, now carrying cyber state on every instrument." },
    { name: "Purdue", body: "Levels, zones and conduits with target and achieved security levels." },
    { name: "Network", body: "Real topology and flow — the routes an adversary would use." },
    { name: "Graph", body: "Interconnections and transitive dependencies, five libraries deep." },
    { name: "3D", body: "Spatial context for the people who have to walk to it." }
  ],
  drillHeading: "Drill down, roll up",
  drillPath: ["component", "equipment", "line", "facility", "organization"],
  drillBody:
    "Five levels, both directions. From the organizational Index down to a firmware version, or from one component up to what it costs the group."
};

export interface ServiceAtAGlance {
  scope: string;
  runsFor: string;
  basis: string;
  howWeWork: string;
  whatYouGet: string;
}

export interface Service {
  n: string;
  name: string;
  quote: string;
  route: string;
  atAGlance: ServiceAtAGlance;
  body: string[];
}

export const SERVICES_INTRO = {
  eyebrow: "OXOT Consulting Services",
  h2: "Six consulting services.",
  intro:
    "Each stands alone or combines into a programme, and each one can feed the Cyber Digital Twin — our fit-for-purpose model, which increases efficiency and effectiveness dramatically. Open any card for what the work involves, how it runs, and what you are left holding."
};

export const SERVICES: Service[] = [
  {
    n: "01",
    name: "OT Security Assessments",
    quote: "“Tell me where we actually stand.” A measured answer for one site, line or zone — not a scored questionnaire.",
    route: "/services/ot-security-assessments",
    atAGlance: {
      scope: "a site, a line or a defined zone",
      runsFor: "typically 2–6 weeks",
      basis: "IEC 62443-3-2 + your operational risk",
      howWeWork: "passive-first, no production impact",
      whatYouGet: "a prioritised risk register + roadmap"
    },
    body: [
      "An assessment establishes what is installed, how it is connected, who can reach it, and what happens to production if any of that fails. It is scoped to a site, a line or a defined zone rather than to an entire estate, because a finding you cannot act on is not worth the disruption of collecting it.",
      "The work is passive-first: we build the picture from documents you already hold — P&IDs, asset registers, network drawings — and observe rather than probe. No active scanning, and no agent on a PLC. Where something can only be established by testing, it happens in an agreed window with a named person who can stop it.",
      "You end with a prioritised risk register and a roadmap ordered by what reduces risk most per euro, in the vocabulary of the plant rather than of a control framework."
    ]
  },
  {
    n: "02",
    name: "OT Security Programmes",
    quote: "“Give engineering a queue for Monday.” The multi-year programme that turns a register of findings into scheduled work.",
    route: "/services/ot-security-programmes",
    atAGlance: {
      scope: "sites, business units or regions",
      runsFor: "typically 12–36 months, in waves",
      basis: "risk-based, IEC 62443 lifecycle",
      howWeWork: "a steering model with clear KPIs",
      whatYouGet: "measurable, reportable risk reduction"
    },
    body: [
      "An assessment tells you what is wrong. A programme is what fixes it across sites, business units or regions, in waves, over a horizon that is usually measured in years rather than months.",
      "It runs on a steering model with KPIs the board can read and engineering can act on, sequenced by risk rather than by whichever finding is easiest to close. The IEC 62443 lifecycle is the spine, so the same evidence serves the regulator, the insurer and the internal audit that follows.",
      "The measure of success is risk reduction you can report, not controls implemented."
    ]
  },
  {
    n: "03",
    name: "Architecture & Segmentation",
    quote: "“Design it so it survives production.” Zones and conduits an operator can still run and a maintenance team can still work in.",
    route: "/services/architecture-and-segmentation",
    atAGlance: {
      scope: "safety isolation, OT/IT boundary, DMZ",
      runsFor: "design, then a staged rollout",
      basis: "IEC 62443-3-2 zones & conduits",
      howWeWork: "designed against real maintenance tasks",
      whatYouGet: "target architecture + staged plan"
    },
    body: [
      "Segmentation is where most OT security programmes are won or quietly lost. A design that isolates safety correctly but makes a routine maintenance task impossible will be worked around within a month, and the workaround becomes the new architecture.",
      "We work from IEC 62443-3-2 zones and conduits, concentrating on the three boundaries that carry the most consequence: safety isolation, the OT/IT boundary, and the DMZ between them. The target architecture comes with a staged plan, because a plant cannot be re-segmented in one outage."
    ]
  },
  {
    n: "04",
    name: "Secure Remote Access",
    quote: "“Stop the risk in vendor access.” The OEM still gets in — through a route you can watch, revoke and prove.",
    route: "/services/secure-remote-access",
    atAGlance: {
      scope: "employees, vendors and OEMs",
      runsFor: "design and rollout per site",
      basis: "IEC 62443, NIS2 supply-chain",
      howWeWork: "least privilege, brokered, monitored",
      whatYouGet: "fully auditable remote access"
    },
    body: [
      "Vendor and OEM access is the most common way into an OT estate and the least often documented. The answer is not to remove it — the plant needs it — but to broker it, so every session is least-privilege, time-bound and attributable to a person.",
      "The controls are MFA, just-in-time grants and session recording, applied to employees, vendors and OEMs alike, against IEC 62443 and the NIS2 supply-chain obligations rather than an internal policy that a supplier has never read.",
      "The outcome is remote access that can be audited after an incident, not reconstructed from memory."
    ]
  },
  {
    n: "05",
    name: "OT Security Baseline",
    quote: "“Set a floor every site can meet.” One minimum standard, written so the smallest site can actually reach it.",
    route: "/services/ot-security-baseline",
    atAGlance: {
      scope: "per zone and asset class",
      runsFor: "set once, then applied per site",
      basis: "IEC 62443 SL-1 / SL-2",
      howWeWork: "a floor set where sites can reach it",
      whatYouGet: "control checklist + evidence"
    },
    body: [
      "A baseline is the minimum every site has to meet, expressed per zone and per asset class rather than as one number for the whole company. It exists so a group with twenty plants stops having twenty different answers to the same question.",
      "We set it at IEC 62443 SL-1 or SL-2 — deliberately reachable, because a floor nobody can meet is a floor nobody uses. It ships as a control checklist with the evidence each control requires, so a site can demonstrate compliance rather than assert it.",
      "The result is OT security that is consistent across the estate and auditable at each site."
    ]
  },
  {
    n: "06",
    name: "Capability Transfer",
    quote: "“Make us able to run it ourselves.” An engagement designed to end, because scarce OT expertise should stay in your team.",
    route: "/services/capability-transfer",
    atAGlance: {
      scope: "OT engineering, IT security, operations",
      runsFor: "until your team owns it",
      basis: "your own live work, not a course",
      howWeWork: "coaching + working side by side",
      whatYouGet: "operating model, RACI, runbooks"
    },
    body: [
      "OT security expertise is scarce, and buying it indefinitely is not a strategy. This engagement exists to make itself unnecessary: your OT engineering, IT security and operations people end up running the work that a consultant was running.",
      "The format is coaching and working side by side on live work rather than a training course, because the difficulty in OT security is judgement under plant constraints and judgement does not transfer from slides.",
      "What stays behind is an operating model, a RACI and the runbooks, so the capability survives the people who happened to be in the room."
    ]
  }
];

export const DEPLOYMENT = {
  eyebrow: "Deployment",
  h2: "Three ways to run it, all passive-first.",
  intro: "No agents on your controllers and no active scanning of the process network, in any configuration.",
  options: [
    { n: "01", title: "Island mode", body: "Isolated. On your own ground, no external dependencies. No access to control systems. Your own custom AI model." },
    { n: "02", title: "One-way data diode", body: "A data diode limits data to inbound only. This allows our intelligence to stream into the Cyber Digital Twin, but nothing exits." },
    { n: "03", title: "Dedicated instance", body: "A single-tenant instance located in an AWS service of your choice, aligned to your data sovereignty requirements." }
  ],
  integrations: {
    heading: "Integrations",
    intro:
      "We integrate with asset management, historians, network monitoring and service management applications — so the model draws on the systems of record you already run.",
    items: ["Asset management", "Historians", "Network monitoring", "Service management"]
  },
  engagement: {
    heading: "Engagement",
    intro: "OXOT OT engineering consultants build and deploy the Cyber Digital Twin. Both models are consulting-led — we are not selling software you install alone.",
    items: [
      { name: "Transient", body: "one-time consulting services, built and handed over" },
      { name: "Long-term operations", body: "the twin sustained alongside the estate as it changes" }
    ]
  }
};

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ = {
  eyebrow: "Common questions",
  h2: "The questions engineers ask first.",
  intro:
    "These come up in every first conversation, usually within ten minutes. They are fair questions, and the answers are the reason the model is built the way it is.",
  items: [
    {
      q: "Are you putting anything on our control network?",
      a: "No. The twin is built from documents you send us — no agents on controllers, no active scanning of the process network. In island mode it runs on your own ground with no external dependencies and no access to control systems at all."
    },
    {
      q: "Our drawings are out of date. Does that break it?",
      a: "Everyone's are. Reconciling the record against reality is part of the engagement, not a prerequisite for it — and the gap list that comes out of reconciliation is usually the first thing customers find valuable, because nobody had it before."
    },
    {
      q: "How can you put a euro figure on a cyber event?",
      a: "We don't — your engineers already did. The severity sits in your FMEA, the production and quality loss in your reliability work, and the tolerable downtime in your minimum operating requirements. We inherit those figures and attach them to reachable pathways. Nothing is invented at the security layer."
    },
    {
      q: "We already have an OT monitoring platform.",
      a: "Good — its inventory is an input to the model. Monitoring answers what is on the network. It cannot tell you which finding to fund first, what the alternative would have bought, or what stops running if a specific controller is used against you."
    },
    {
      q: "Isn't this just a black box with a number on the front?",
      a: "Then take it apart. Every figure drills from the organizational Index down through the facility, the equipment, the pathway and the specific safety function at the end of it. The bills of materials are versioned and diffable, and every external source is cited beside the value it produced."
    },
    {
      q: "We have no budget this cycle.",
      a: "Then start with one facility. The output is a bounded spend recommendation with a stated ceiling, which is usually the instrument that unlocks the next budget rather than something competing for it."
    },
    {
      q: "Do we keep the model afterwards?",
      a: "Yes. Capability transfers to your team and the twin stays yours to run and interrogate. We would rather your organisation became stronger than dependent on ours."
    },
    {
      q: "Does it detect or respond to live attacks?",
      a: "No, and it is not meant to. Detection and response tell you what is happening now. The twin tells you what would happen, what it would cost, and which change removes the most of it — before anything happens at all."
    }
  ] satisfies FaqItem[],
  closing: "Something we have not answered? Talk to OX — info@oxot.nl"
};

export const ORIGIN = {
  origin: {
    eyebrow: "Where it came from",
    h3: "Built under deal pressure, for industries that cannot afford to stop.",
    paragraphs: [
      "The Cyber Digital Twin was born from the necessity of delivering high-quality M&A due diligence in compressed timeframes: whole industrial estates assessed properly, on a deal clock, without walking every site. That constraint forced a different kind of engine.",
      "What came out of it is the OXOT Seldon Engine — a physics-based Cyber Digital Twin. It is now the foundation of everything we do, on deal timelines and on operating ones."
    ]
  },
  who: {
    eyebrow: "Who builds it",
    h3: "A Dutch OT cybersecurity company.",
    body: "We help protect the critical infrastructure that sustains society and powers progress — reliable energy, clean water, healthy food and the industrial systems behind them. Our people come from process and control engineering, industrial networks and safety.",
    grant: {
      heading: "Co-invested by the Dutch government",
      body: "The Dutch government and the European Cybersecurity Competence Centre co-invested in our Cyber Digital Twin under CIF-NL 2025."
    }
  }
};

export const WHERE_WE_WORK = {
  eyebrow: "Where we work",
  h2: "The industries that cannot afford to stop.",
  /* Expanded 4 -> 6, 2026-08-22 (owner) — same six industries as home2's
     SECTORS (home2/content.ts), which duplicates this block deliberately. */
  intro:
    "Six sectors where a cyber event is not an IT incident but a physical one, and where the consequence is measured in production, safety and public service.",
  industries: [
    { name: "Manufacturing & Process", body: "Discrete and process lines where an unplanned stop is measured in shifts, and a quality excursion in recalls." },
    { name: "Energy & Utilities", body: "Generation, grid and fuels, where minimum operating requirements are a licence condition rather than a preference." },
    { name: "Water & Wastewater", body: "Treatment and distribution, where the safety function protecting a dosing set point is the last line before the public." },
    { name: "Rail & Transportation", body: "Rail, ports and logistics, where TS 50701 sits alongside IEC 62443 and an outage propagates down the chain." },
    { name: "Hyperscale & Data Centers", body: "Cooling, power and physical-security systems where uptime is the product itself, and a control-plane compromise is a headline before it is a ticket." },
    { name: "Defense & Government", body: "Programmes where a supply-chain or product-security gap is a sovereignty question, not only an operational one, and evidence has to survive an adversarial audit." }
  ]
};
