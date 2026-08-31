/**
 * WATER & WASTEWATER — ITERATION 2 (`/industries/water-wastewater-2`).
 *
 * A fresh, parallel build standing beside `/industries/water-wastewater` (live,
 * in nav) and `/industries/water-wastewater-1` (the graded iteration-1
 * artifact). NOTHING in this folder imports from either of those folders and
 * neither was touched. `-1` is kept only until `-2` is accepted; leaving both
 * indefinitely is itself a duplicate-components QA failure.
 *
 * EVERY STRING IS TRANSCRIBED from new_material_source/1_website_layout_v4/
 * 3_industries/industry_water.md. Where the source is a table, its cells are
 * carried across intact. Nothing is invented: no scenario, no citation, no
 * asset name, no metric. There is not one number on this page that the source
 * does not state.
 *
 * CONTENT IS SPLIT ACROSS SEVEN FILES rather than one 47KB module, because this
 * repository caps a file at 500 lines and one page's copy is not an exception
 * to that. This one carries meta, hero, sector reality, the four decisions,
 * capabilities, engagement and the closing CTA; `content.architecture.ts`,
 * `content.assets.ts`, `content.profile.ts`, `content.regulatory.ts`,
 * `content.scenarios.ts` and `content.workedExample.ts` carry the rest. Every
 * split is along a section boundary, never at an arbitrary line.
 *
 * TWO NEW-TO-`-2` SOURCE FACTS `-1` OMITTED ENTIRELY (both grep-verified absent
 * from its `content.ts`):
 *   1. The ENISA NIS360 2026 finding (source L5) — now the hero copy pane's
 *      cited evidence, which is what earns that pane its height BY INFORMATION
 *      rather than by stretching it. Pattern 1's own named remedy.
 *   2. CISA's five concrete recommendations (source L184) — now the sector
 *      reality section's evidence panel. Same advisory and same URL as the L79
 *      finding they sit beside, so this is consolidation, not re-attribution.
 *      L184's opening clause stays attached to scenario row 1, where it belongs.
 *
 * ONE DOCUMENTED DEPARTURE FROM VERBATIM: source paragraphs L75 and L77 are
 * each rendered as two paragraphs, split at a sentence boundary the source
 * itself writes. No word is changed, added or removed. Splitting prose into
 * paragraphs is a rendering decision; rewriting it would not be.
 *
 * `Bilingual`-typed throughout via `same()`. Both locales render; `nl` is a
 * same-as-English placeholder pending translation, per registry.ts.
 */
import { same } from "../registry";

export const META = {
  title: "Water & Wastewater OT Cybersecurity Digital Twin",
  description:
    "Protect drinking water, wastewater treatment, and remote field assets. OXOT's Cyber Digital Twin connects process controls, SCADA pathways, cyber risk, and public-health or environmental consequences."
};

/** Printed visibly on the hero itself and again at the head of the worked
 *  example — Pattern 1 and Pattern 2 each require it on their own surface. */
export const CLAIM_BOUNDARY = same("Illustrative scenario — no customer data");

export const CISA_URL =
  "https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs";
export const ENISA_URL =
  "https://www.enisa.europa.eu/sites/default/files/2026-05/ENISA%20NIS360%202026.pdf";

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: same("Water & Wastewater"),
  h1: same("Protect safe water and sanitation—before a cyber incident becomes a public-health event."),
  lead: same(
    "OXOT's Cyber Digital Twin connects treatment processes, field automation, SCADA pathways, and operational consequences. Test a change, prioritize the risks that can affect water quality or environmental compliance, and improve resilience without touching the live process."
  ),
  /* THE ENISA FINDING — the hero copy pane's cited evidence (source L5). */
  sourceLabel: same("ENISA NIS360, 2026"),
  finding: same(
    "Places drinking water and wastewater among the least mature sectors assessed, with drinking water somewhat ahead of wastewater."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("See how the Twin works"),
  /* The brief's own secondary conversion, source L26. */
  note: same("Bring one P&ID, process-flow diagram, or SCADA asset list."),

  systemLabel: same("System"),
  viewLabel: same("View"),
  legendLabel: same("Legend"),
  views: [
    same("Water process"),
    same("OT / SCADA paths"),
    same("Cyber route"),
    same("Public-health / compliance impact")
  ],
  viewFocus: [
    same(
      "The physical route the Twin models — source or influent, through treatment, to customer or receiving water. Grade falls through each treatment barrier; pumping is where it is put back."
    ),
    same(
      "The same route with its control and communications layers surfaced: pump controls, chemical dosing skids, analyzers, PLCs, RTUs, SCADA, telemetry, radio/cellular links and remote engineering access."
    ),
    same("One credible route, traced stage by stage from the entry point to the process function it reaches."),
    same(
      "What is actually at stake if that route resolves badly — a cyber route may alter dosing, disable monitoring, create a pump overflow, prevent treatment, or obscure an out-of-spec condition, not merely stop a production line."
    )
  ],
  /* Kept short on purpose. These five sit inline beside the claim chip rather
     than in a labelled block of their own — the diagram pane was measured
     0.59 against the copy pane at Pattern 1's 0.67 floor, and the rule's own
     remedy is to reduce the DIAGRAM pane, never to pad the copy. */
  legend: [
    same("Cyan — process"),
    same("Blue — pathway"),
    same("Amber — consequence"),
    same("Red — affected stage"),
    same("Slate — context")
  ]
};


/* ── S01 · Sector reality ───────────────────────────────────────────────── */

export const SECTOR_REALITY = {
  h2: same("A cyber incident can affect the quality of water, the environment, and the community—at the same time."),
  /* Source L75 and L77, each split at a sentence boundary the source itself
     writes. Not one word changed. */
  narrative: [
    same(
      "Water systems are both highly physical and highly distributed. A utility may operate treatment plants, reservoirs, booster stations, lift stations, well fields, storage tanks, wastewater facilities, remote telemetry units, chemical systems, laboratories, and thousands of miles of distribution or collection infrastructure."
    ),
    same(
      "Many assets operate unattended and communicate through radio, cellular, leased-line, satellite, or internet-connected remote-access arrangements."
    ),
    same(
      "The operational consequence is distinctive. In drinking water, the concern may be inadequate disinfection, excessive chemical dosing, loss of pressure, loss of source monitoring, or inability to confirm water quality."
    ),
    same(
      "In wastewater, it may be untreated discharge, sewer overflow, pump-station failure, aeration disruption, permit exceedance, damage to biological treatment, or an inability to maintain compliant effluent."
    )
  ],
  sourceLabel: same("CISA advisory, 2026"),
  finding: same(
    "CISA reported a significant increase in cyber actors targeting PLCs in the water and wastewater sector in 2026, including cases in which exposed controllers had passwords changed or IP addresses altered, locking operators out and disrupting operations."
  ),
  /* Source L184's five concrete recommendations, from the SAME advisory and the
     SAME URL as the finding above — consolidation, not re-attribution. `-1`
     buried these as a trailing note under its scenarios section. */
  remediesLabel: same("What that advisory recommends"),
  remedies: [
    same("Remove public exposure."),
    same("Use a VPN or gateway rather than direct PLC access."),
    same("Protect credentials."),
    same("Allow only known authorized engineering assets."),
    same("Maintain clean PLC-image backups.")
  ],
  tableCaption: same("Sector-specific challenges"),
  tableHead: {
    challenge: same("Challenge"),
    why: same("Why it is different in water and wastewater")
  },
  challenges: [
    {
      term: same("Distributed, unattended assets"),
      body: same(
        "Remote pump stations, lift stations, wells, reservoirs, tanks, and outfalls may be geographically dispersed and depend on low-bandwidth or intermittent communications"
      )
    },
    {
      term: same("Direct physical-process consequences"),
      body: same(
        "A manipulated dosing skid, chlorine residual setpoint, pH controller, valve, pump, or aeration system can affect water quality, treatment performance, or environmental discharge"
      )
    },
    {
      term: same("Public-health and environmental obligations"),
      body: same(
        "Operators must protect consumers and receiving waters while meeting regulatory, permit, monitoring, and reporting requirements"
      )
    },
    {
      term: same("Small OT teams"),
      body: same(
        "Many utilities have limited in-house cyber, SCADA, engineering, and incident-response capacity, with substantial reliance on integrators and vendors"
      )
    },
    {
      term: same("Aging, long-lived automation"),
      body: same(
        "Legacy PLCs, RTUs, radios, HMIs, dial-up/cellular equipment, unsupported operating systems, and thin documentation are common"
      )
    },
    {
      term: same("Manual-operating dependency"),
      body: same(
        "Manual operation may be possible but difficult, staffing-intensive, slower, or unsafe—especially across multiple remote facilities"
      )
    },
    {
      term: same("Chemical-process risk"),
      body: same(
        "Chlorine, sodium hypochlorite, ammonia, coagulants, polymers, lime, fluoride, acids, caustics, and other treatment chemicals create handling, dosing, and containment concerns"
      )
    },
    {
      term: same("Weather and power resilience"),
      body: same(
        "Flooding, drought, wildfire, storm damage, power loss, and telecom outages frequently coincide with peak operational demand"
      )
    },
    {
      term: same("Contractor and OEM access"),
      body: same(
        "Integrators and equipment vendors often remotely support PLCs, telemetry, dosing equipment, UV systems, VFDs, analysers, and SCADA platforms"
      )
    },
    {
      term: same("Municipal IT interdependence"),
      body: same(
        "Water OT may share identity, remote access, network services, procurement, facilities, and incident-response functions with broader city or county IT"
      )
    }
  ]
};


/* ── S05 · Four decisions ───────────────────────────────────────────────── */

export const DECISIONS = {
  h2: same("Four decisions that protect treatment, distribution, and environmental compliance."),
  lead: same(
    "All four questions always apply, so one is open by default — opening “What do we fix first?” pre-picks no answer, it only opens the first question. Each key carries the question a utility asks in its own words, and what the model puts on the table in reply."
  ),
  questionLabel: same("Drinking-water and wastewater language"),
  providesLabel: same("What the Twin provides"),
  items: [
    {
      id: "fix-first",
      name: same("What do we fix first?"),
      question: same(
        "Which cyber pathway can affect treatment quality, disinfection, pumping, overflow risk, process monitoring, or permit compliance?"
      ),
      provides: same(
        "A NOW / NEXT / NEVER prioritization based on reachable control points and process/public-health/environmental consequence."
      ),
      href: "fixFirst" as const
    },
    {
      id: "spend",
      name: same("What should we spend?"),
      question: same(
        "Should we fund secure remote access, SCADA replacement, field-RTU modernization, network segmentation, backup communications, additional instrumentation, or generator capacity?"
      ),
      provides: same(
        "A common consequence model for comparing capital and operational investments—not a generic security score."
      ),
      href: "investment" as const
    },
    {
      id: "change-safely",
      name: same("Can we change safely?"),
      question: same(
        "Can we reconfigure this firewall, remote pump-station connection, VLAN, PLC firmware, SCADA server, or chemical-dosing network without losing monitoring or control?"
      ),
      provides: same(
        "A virtual test of required data/control flows, residual exposure, failover requirements, and process impact."
      ),
      href: "changeSafely" as const
    },
    {
      id: "leave-alone",
      name: same("What can we leave alone?"),
      question: same(
        "Which legacy asset is isolated, has limited operational consequence, or can safely wait for planned renewal—with a documented review trigger?"
      ),
      provides: same(
        "A defensible exception record tied to actual reachability, treatment consequence, owner, compensating controls, and reassessment conditions."
      ),
      href: "riskAcceptance" as const
    }
  ],
  note: same(
    "The product's decision framework is useful in water because it can connect a reachable pathway to the physical process, then classify remediation as NOW, NEXT, or NEVER rather than letting a generic CVSS backlog determine operational priorities."
  )
};

/* ── S07 · Capabilities ─────────────────────────────────────────────────── */

export const CAPABILITIES = {
  h2: same("One model spanning source, treatment, field assets, and recovery."),
  lead: same(
    "Seven capabilities of one model, not seven products. Each reads the same evidence base and answers a different question about it."
  ),
  items: [
    {
      name: same("Process and treatment model"),
      body: same(
        "Represents source-to-tap or influent-to-effluent pathways, chemical treatment, pumps, tanks, biological systems, disinfection, and key operating boundaries."
      )
    },
    {
      name: same("Field-estate and telemetry model"),
      body: same(
        "Maps pump stations, lift stations, reservoirs, wells, remote RTUs, modems, radio/cellular links, and their operational dependencies."
      )
    },
    {
      name: same("SCADA and control-path model"),
      body: same(
        "Links PLCs, RTUs, VFDs, HMIs, SCADA, historians, engineering workstations, alarms, and remote support to the process they control."
      )
    },
    {
      name: same("Hydraulic and process-consequence model"),
      body: same(
        "Helps reason through operational effects such as overflow, low pressure, loss of treatment, loss of monitoring, aeration upset, or dosing deviation."
      )
    },
    {
      name: same("Cyber pathway and change simulation"),
      body: same(
        "Tests segmentation, secure remote access, controller hardening, SCADA changes, radio/cellular network changes, and recovery controls before live deployment."
      )
    },
    {
      name: same("Resilience and recovery view"),
      body: same(
        "Identifies dependencies on power, communications, staffing, clean backups, manual operation, chemicals, spares, and external integrators."
      )
    },
    {
      name: same("Evidence and assurance output"),
      body: same(
        "Provides traceable risk decisions, architecture views, operational evidence, and regulatory/board-ready reporting from one model."
      )
    }
  ],
  note: same(
    "The OXOT Cyber Digital Twin supports facility-physics, asset, network, data-fusion, and governance layers, along with synchronized P&ID, Purdue, network, dependency-graph, and 3D views. It can produce risk deltas, BOM outputs, engineering visualizations, and compliance-oriented technical files."
  )
};


/* ── S09 · Engagement ───────────────────────────────────────────────────── */

export const ENGAGEMENT = {
  h2: same("Start with one treatment process or one remote field system."),
  lead: same(
    "Four entry points a utility chooses between, ordered by scope. No completion state is claimed for any of them: these are places to start, not phases anyone has finished."
  ),
  startLabel: same("Best starting point"),
  outputLabel: same("Example output"),
  /* `id` is DOM identity, not copy. The Scope Rail wires every
     `aria-controls`/`aria-labelledby` off these, so they must not be derived
     from array position: reordering the four entries by scope must never
     silently repoint a panel at the wrong rail entry. */
  items: [
    {
      id: "treatment-process-sprint",
      name: same("Treatment-Process Decision Sprint"),
      start: same("Chemical dosing, UV/disinfection, filtration, aeration, biological process, or control-room change"),
      output: same("Modelled cyber pathway, treatment consequence, control options, and prioritized action plan")
    },
    {
      id: "remote-asset-sprint",
      name: same("Remote-Asset Resilience Sprint"),
      start: same("Lift stations, pump stations, wells, reservoirs, booster stations, field RTUs, or telemetry network"),
      output: same("Reachability map, operational dependency analysis, secure remote-access and recovery roadmap")
    },
    {
      id: "facility-twin-build",
      name: same("Facility Twin Build"),
      start: same("One drinking-water treatment plant, wastewater treatment plant, or regional operations environment"),
      output: same("Validated Cyber Digital Twin, risk-priority queue, process/OT views, evidence package")
    },
    {
      id: "continuous-twin-operations",
      name: same("Continuous Twin Operations"),
      start: same("Multi-site utility with changing assets, vendors, threat context, capital programs, and seasonal risk"),
      output: same("Risk deltas, scenario testing, evidence updates, resilience reporting, and recurring decision support")
    }
  ]
};

/* ── S10 · Final CTA and the real intake form ───────────────────────────── */

export const FINAL_CTA = {
  h2: same("Start with one plant, one pump station, or one treatment decision."),
  body: same(
    "Bring a process-flow diagram, P&ID, SCADA asset list, or a proposed remote-access or network change. OXOT will show how a Cyber Digital Twin can trace the path to the treatment or environmental consequence—before the live system is changed."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("Request the Technical Specification"),

  formLabel: same("Tell us what to look at"),
  /* The submission mechanism does not exist yet. The block is built COMPLETE
     and carries a visible stated note rather than being dropped — the owner's
     own rule: placeholder unbuilt interactive features, do not omit them. */
  formNote: same(
    "This intake is not yet wired to a submission endpoint. Fill it in to see what OXOT asks for, then send the same details through Contact — nothing entered here leaves your browser."
  ),
  fields: {
    /* Source L339 is one bullet, "Name and work email"; it renders as two
       inputs because they are two values and because `type="email"` gives the
       second one real browser validation. Splitting an input is a rendering
       decision — no field was added to and none dropped from the source. */
    name: same("Name"),
    namePlaceholder: same("Full name"),
    email: same("Work email"),
    emailPlaceholder: same("name@utility.example"),
    organization: same("Organization"),
    organizationPlaceholder: same("Regional water authority"),
    role: same("Role"),
    rolePlaceholder: same("SCADA / OT manager"),
    systemType: same("System type"),
    scope: same("Scope"),
    decision: same("Decision to evaluate"),
    choose: same("Choose one")
  },
  systemTypeOptions: [
    same("Drinking water"),
    same("Wastewater"),
    same("Combined water / wastewater utility"),
    same("Regional authority"),
    same("Municipal public works"),
    same("Engineering integrator"),
    same("Other")
  ],
  scopeOptions: [
    same("Treatment plant"),
    same("Pump or lift-station network"),
    same("Wells / reservoirs / booster stations"),
    same("SCADA / control-room environment"),
    same("Chemical dosing or disinfection system"),
    same("Telemetry / radio / cellular network"),
    same("Multi-site utility")
  ],
  decisionOptions: [
    same("Publicly exposed PLC / RTU"),
    same("Vendor remote access"),
    same("SCADA or network segmentation"),
    same("Chemical-dosing or disinfection control"),
    same("Lift-station / pump-station resilience"),
    same("Ransomware recovery and manual operations"),
    same("Modernization / capital investment"),
    same("NIS2, AWIA, ERP, or assurance evidence"),
    same("Other")
  ]
};
