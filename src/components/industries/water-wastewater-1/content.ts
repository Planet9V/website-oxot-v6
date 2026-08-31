/**
 * WATER & WASTEWATER — ITERATION 1 (`/industries/water-wastewater-1`).
 *
 * A fresh, parallel build. It shares no file with the existing
 * `/industries/water-wastewater` page and imports nothing from it; the two are
 * independent iterations of the same brief, kept separate on purpose so either
 * can be judged on its own.
 *
 * EVERY STRING BELOW IS TRANSCRIBED FROM new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md — hero copy, sector
 * reality, both process architectures, all 10 risk scenarios, the four
 * decisions, the worked dosing example, product capabilities, the 9-row
 * regulatory table, engagement tiers, final CTA and metadata. Where the source
 * is a table, the table's cells are carried across intact rather than
 * paraphrased. Nothing here is invented: no scenario, no regulatory citation,
 * no asset name, no metric.
 *
 * TWO DELIBERATE, DOCUMENTED DEPARTURES FROM VERBATIM:
 *  1. Bullet runs inside a source table cell are joined into one sentence with
 *     semicolons so they render as prose (e.g. WORKED_EXAMPLE.output.evidence).
 *  2. `PROFILE` below adds one thing the source does not state literally —
 *     which stages of each chain sit at a *lower* hydraulic grade than the one
 *     before, and which are lifted by pumping. That is real hydraulics, not
 *     invented data (a lift station lifts; a high-service pump restores head),
 *     and it carries no numbers. No elevations, chainages, flows or set points
 *     appear anywhere on this page, because the source states none and
 *     inventing them would be fake data.
 *
 * `Bilingual`-typed throughout via `same()`. Both locales render; `nl` is a
 * same-as-English placeholder pending translation, per registry.ts.
 */
import { same } from "../registry";
import type { SystemAsset, SystemPath } from "@/components/twin/types";

export const META = {
  title: "Water & Wastewater OT Cybersecurity Digital Twin",
  description:
    "Protect drinking water, wastewater treatment, and remote field assets. OXOT's Cyber Digital Twin connects process controls, SCADA pathways, cyber risk, and public-health or environmental consequences."
};

export const CLAIM_BOUNDARY = same("Illustrative scenario — no customer data");

/* ── Hero ───────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: same("Water & Wastewater"),
  h1: same("Protect safe water and sanitation—before a cyber incident becomes a public-health event."),
  lead: same(
    "OXOT's Cyber Digital Twin connects treatment processes, field automation, SCADA pathways, and operational consequences. Test a change, prioritize the risks that can affect water quality or environmental compliance, and improve resilience without touching the live process."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("See how the Twin works"),
  note: same(
    "A cyber route into a water system can alter dosing, disable monitoring, cause a pump overflow, prevent treatment, or obscure an out-of-spec condition — not merely stop a production line."
  ),
  systemLabel: same("System"),
  viewLabel: same("View"),
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
      "The same route with its control and communications layers surfaced: plant LAN, radio, cellular, private WAN, fiber, leased lines and VPN carrying PLC, RTU, VFD, HMI, SCADA and historian traffic across every stage at once."
    ),
    same("One credible route, traced stage by stage from the entry point to the process function it reaches."),
    same("What is actually at stake if that route resolves badly — not a generic outage, a water-quality or environmental one.")
  ],
  impactTags: [
    same("Altered dosing"),
    same("Disabled monitoring"),
    same("Pump overflow"),
    same("Treatment prevented"),
    same("Out-of-spec condition obscured")
  ]
};

/* ── The hydraulic profile: both chains, both shared layers ─────────────── */

export interface ProfileStage {
  id: string;
  name: ReturnType<typeof same>;
  /** Relative hydraulic grade, 1 (lowest) to 6 (highest). Real hydraulics, no
   *  numbers claimed: gravity falls through treatment, pumping lifts. */
  grade: number;
  /** True where the stage is where head is added rather than lost. */
  lift?: boolean;
}

export interface ProfileSystem {
  id: "drinking" | "wastewater";
  label: ReturnType<typeof same>;
  stages: ProfileStage[];
  /** The two shared layers the source's architecture blocks list beneath both
   *  physical chains. Rendered as bands spanning every stage, never assigned
   *  stage-by-stage — the source assigns no control to any single stage, and
   *  guessing one would be fabricated. */
  controlLayer: ReturnType<typeof same>;
  commsLayer: ReturnType<typeof same>;
  /** The real cyber route this system carries, from the source's own scenario
   *  table. `targetStageId` names the stage the route reaches. */
  route: {
    title: ReturnType<typeof same>;
    entry: ReturnType<typeof same>;
    targetStageId: string;
    consequence: ReturnType<typeof same>;
    impact: ReturnType<typeof same>;
  };
}

export const PROFILE: ProfileSystem[] = [
  {
    id: "drinking",
    label: same("Drinking water"),
    stages: [
      { id: "source", name: same("Source"), grade: 6 },
      { id: "intake", name: same("Intake"), grade: 5 },
      { id: "treatment", name: same("Treatment"), grade: 4 },
      { id: "clearwell", name: same("Clearwell"), grade: 3 },
      { id: "pumping", name: same("Pumping"), grade: 6, lift: true },
      { id: "distribution", name: same("Distribution"), grade: 4 },
      { id: "customers", name: same("Customers"), grade: 3 }
    ],
    controlLayer: same("PLCs · RTUs · VFDs · HMIs · SCADA · historian · laboratory systems"),
    commsLayer: same("Plant LAN · radio · cellular · private WAN · fiber · leased lines · VPN"),
    route: {
      title: same("Drinking-water chemical dosing manipulation"),
      entry: same("Remote engineering access"),
      targetStageId: "treatment",
      consequence: same("Inadequate residual"),
      impact: same(
        "Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."
      )
    }
  },
  {
    id: "wastewater",
    label: same("Wastewater"),
    stages: [
      { id: "collection", name: same("Collection"), grade: 3 },
      { id: "lift-station", name: same("Lift station"), grade: 6, lift: true },
      { id: "headworks", name: same("Headworks"), grade: 5 },
      { id: "biological", name: same("Biological treatment"), grade: 4 },
      { id: "disinfection", name: same("Disinfection"), grade: 3 },
      { id: "effluent", name: same("Effluent / reuse"), grade: 2 },
      { id: "receiving", name: same("Receiving water"), grade: 1 }
    ],
    controlLayer: same("PLCs · RTUs · SCADA · HMI · historian · alarms · remote telemetry"),
    commsLayer: same("Radio · cellular · satellite · serial telemetry · microwave · leased lines · VPN"),
    route: {
      title: same("Wastewater lift-station outage"),
      entry: same("Remote telemetry path"),
      targetStageId: "lift-station",
      consequence: same("Wet-well overflow"),
      impact: same(
        "Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting."
      )
    }
  }
];

/* ── Sector reality ─────────────────────────────────────────────────────── */

export const SECTOR_REALITY = {
  h2: same("A cyber incident can affect the quality of water, the environment, and the community—at the same time."),
  bodyOne: same(
    "Water systems are both highly physical and highly distributed. A utility may operate treatment plants, reservoirs, booster stations, lift stations, well fields, storage tanks, wastewater facilities, remote telemetry units, chemical systems, laboratories, and thousands of miles of distribution or collection infrastructure. Many assets operate unattended and communicate through radio, cellular, leased-line, satellite, or internet-connected remote-access arrangements."
  ),
  bodyTwo: same(
    "The operational consequence is distinctive. In drinking water, the concern may be inadequate disinfection, excessive chemical dosing, loss of pressure, loss of source monitoring, or inability to confirm water quality. In wastewater, it may be untreated discharge, sewer overflow, pump-station failure, aeration disruption, permit exceedance, damage to biological treatment, or an inability to maintain compliant effluent."
  ),
  finding: same(
    "CISA reported a significant increase in cyber actors targeting PLCs in the water and wastewater sector in 2026, including cases in which exposed controllers had passwords changed or IP addresses altered, locking operators out and disrupting operations."
  ),
  findingSource: same("CISA advisory, 2026"),
  challengesLabel: same("Why it is different in water and wastewater"),
  challenges: [
    { term: same("Distributed, unattended assets"), body: same("Remote pump stations, lift stations, wells, reservoirs, tanks, and outfalls may be geographically dispersed and depend on low-bandwidth or intermittent communications.") },
    { term: same("Direct physical-process consequences"), body: same("A manipulated dosing skid, chlorine residual setpoint, pH controller, valve, pump, or aeration system can affect water quality, treatment performance, or environmental discharge.") },
    { term: same("Public-health and environmental obligations"), body: same("Operators must protect consumers and receiving waters while meeting regulatory, permit, monitoring, and reporting requirements.") },
    { term: same("Small OT teams"), body: same("Many utilities have limited in-house cyber, SCADA, engineering, and incident-response capacity, with substantial reliance on integrators and vendors.") },
    { term: same("Aging, long-lived automation"), body: same("Legacy PLCs, RTUs, radios, HMIs, dial-up/cellular equipment, unsupported operating systems, and thin documentation are common.") },
    { term: same("Manual-operating dependency"), body: same("Manual operation may be possible but difficult, staffing-intensive, slower, or unsafe—especially across multiple remote facilities.") },
    { term: same("Chemical-process risk"), body: same("Chlorine, sodium hypochlorite, ammonia, coagulants, polymers, lime, fluoride, acids, caustics, and other treatment chemicals create handling, dosing, and containment concerns.") },
    { term: same("Weather and power resilience"), body: same("Flooding, drought, wildfire, storm damage, power loss, and telecom outages frequently coincide with peak operational demand.") },
    { term: same("Contractor and OEM access"), body: same("Integrators and equipment vendors often remotely support PLCs, telemetry, dosing equipment, UV systems, VFDs, analysers, and SCADA platforms.") },
    { term: same("Municipal IT interdependence"), body: same("Water OT may share identity, remote access, network services, procurement, facilities, and incident-response functions with broader city or county IT.") }
  ]
};

/* ── Architecture ───────────────────────────────────────────────────────── */

export interface ArchStage {
  name: ReturnType<typeof same>;
  detail: ReturnType<typeof same>;
}

export const ARCHITECTURE = {
  h2: same("Model the treatment process and the remote field estate together."),
  lead: same(
    "Two selectable systems. They share a SCADA and telemetry layer and share almost nothing else — different physical processes, different assets, different consequences, different decision language."
  ),
  drinking: {
    label: same("Drinking water"),
    stages: [
      { name: same("Source / raw water"), detail: same("Rivers, reservoirs, groundwater wells, intakes.") },
      { name: same("Treatment"), detail: same("Screens, coagulation, flocculation, sedimentation, filtration. Disinfection, pH adjustment, fluoridation, clearwell.") },
      { name: same("Storage and distribution"), detail: same("High-service pumps, reservoirs, tanks, pressure zones, PRVs. Booster stations, meters, pressure / chlorine residual monitoring.") },
      { name: same("Control and operations"), detail: same("PLCs, RTUs, VFDs, HMIs, SCADA, historian, laboratory systems.") },
      { name: same("Communications"), detail: same("Plant LAN, radio, cellular, private WAN, fiber, leased lines, VPN.") }
    ] satisfies ArchStage[]
  },
  wastewater: {
    label: same("Wastewater"),
    stages: [
      { name: same("Collection system"), detail: same("Gravity sewer, force main, lift station, wet well, level instrumentation.") },
      { name: same("Headworks and primary treatment"), detail: same("Screens, grit removal, primary clarifiers, pumps.") },
      { name: same("Biological treatment"), detail: same("Aeration blowers, basins, DO / ammonia / nitrate analysers. RAS / WAS pumps, clarifiers, nutrient removal controls.") },
      { name: same("Tertiary treatment and disinfection"), detail: same("Filtration, UV, chlorine / dechlorination, reuse systems.") },
      { name: same("Solids and biosolids"), detail: same("Thickening, digestion, dewatering, biogas, storage / disposal.") },
      { name: same("Control and monitoring"), detail: same("PLCs, RTUs, SCADA, HMI, historian, alarms, remote telemetry.") }
    ] satisfies ArchStage[]
  },
  techLabel: same("Common OT, telemetry, and process technologies"),
  techHeadings: { area: same("Technology area"), examples: same("Water and wastewater examples") },
  tech: [
    { area: same("Plant control"), examples: same("PLCs, PACs, RTUs, VFDs, MCCs, HMIs, local panels, SCADA servers, engineering workstations") },
    { area: same("Remote telemetry"), examples: same("Radio, cellular, licensed/unlicensed spectrum, satellite, serial telemetry, microwave, leased lines, VPN-based remote sites") },
    { area: same("Common protocols"), examples: same("Modbus RTU/TCP, DNP3, OPC DA/UA, EtherNet/IP, PROFINET, BACnet, MQTT, serial-to-IP gateways, proprietary radio protocols") },
    { area: same("Water quality instrumentation"), examples: same("Turbidity, pH, conductivity, chlorine residual, ORP, fluoride, UV transmittance, flow, level, pressure, temperature, TOC") },
    { area: same("Wastewater instrumentation"), examples: same("Flow, level, dissolved oxygen, ammonia, nitrate/nitrite, pH, ORP, turbidity, MLSS, sludge blanket, biogas methane/H₂S") },
    { area: same("Critical actuation"), examples: same("Pumps, valves, gates, VFDs, chemical metering pumps, blowers, mixers, UV banks, chlorinators, polymer systems, belt presses") },
    { area: same("Operations systems"), examples: same("Historian, alarm-management platform, CMMS/EAM, laboratory information systems, GIS, hydraulic-modeling tools, work-order systems") },
    { area: same("Physical process evidence"), examples: same("P&IDs, process-flow diagrams, electrical single-lines, pump curves, chemical dosing calculations, control narratives, alarm rationalization, SOPs, maintenance history, permit limits") }
  ],
  twinNote: same(
    "The OXOT Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs."
  )
};

/* ── Asset inventory (Pattern 3 — Asset-Class Bento) ────────────────────── */

/**
 * One asset per `SystemAsset.type`, all nine, every one named by the source
 * brief itself: the dosing skid, chlorine-residual analyzer, chemical-dosing
 * PLC, local HMI, engineering workstation, SCADA server, vendor remote-support
 * endpoint, high/low dosing alarm interlock and historian all appear in the
 * worked example's own evidence lists, its control table, or the technology
 * table. Criticality follows the source's own language about consequence, not
 * copy length.
 */
export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes, grouped by what a compromise costs the process."),
  intro: same(
    "The Twin's inventory is a taxonomy, not a catalogue. Each band below groups the nine asset classes the model recognises by process consequence — not by how much was written about each one."
  ),
  assets: [
    {
      id: "chemical-dosing-skid",
      type: "process-equipment",
      label: "Chemical dosing skid",
      description:
        "Chlorine, hypochlorite, fluoride, coagulant, pH, caustic or acid feed equipment. A manipulated skid affects water quality directly, not a production count.",
      criticality: "critical"
    },
    {
      id: "chlorine-residual-analyzer",
      type: "field-device",
      label: "Chlorine residual analyzer",
      description:
        "Residual, turbidity, pH, ORP and UV-transmittance instrumentation — the measurement that confirms disinfection is holding.",
      criticality: "important"
    },
    {
      id: "dosing-plc",
      type: "controller",
      label: "Chemical-dosing PLC",
      description:
        "Runs the dosing sequence from incoming flow, chlorine-residual feedback, pump status, chemical-tank level and high/low alarm conditions.",
      criticality: "critical"
    },
    {
      id: "local-hmi",
      type: "hmi",
      label: "Local HMI",
      description: "The operator interface beside the dosing PLC, reachable through the same maintenance network.",
      criticality: "important"
    },
    {
      id: "engineering-workstation",
      type: "engineering-workstation",
      label: "Engineering workstation",
      description:
        "PLC programming, configuration and project files — and the vendor-support entry point into plant control.",
      criticality: "important"
    },
    {
      id: "scada-server",
      type: "network-device",
      label: "SCADA server",
      description:
        "SCADA data flow and alarm dependencies: historian, alarm management and remote telemetry all pass through here.",
      criticality: "important"
    },
    {
      id: "remote-support-endpoint",
      type: "remote-access",
      label: "Vendor remote-support endpoint",
      description:
        "The system integrator's remote troubleshooting connection into the maintenance network. Persistent, broad, and operationally relied upon.",
      criticality: "important"
    },
    {
      id: "dosing-alarm-interlock",
      type: "safety-function",
      label: "High/low dosing alarm interlock",
      description:
        "Independent alarming and chemical-tank high/low conditions — the barrier that still holds if digital dosing control does not.",
      criticality: "critical"
    },
    {
      id: "historian",
      type: "service",
      label: "Historian",
      description:
        "Operations record-keeping, alongside alarm-management, CMMS/EAM and laboratory information systems.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};

/* ── Risk scenarios ─────────────────────────────────────────────────────── */

export const SCENARIOS = {
  h2: same("Trace a cyber route to a water-quality, flooding, or permit consequence."),
  lead: same(
    "These are not production-outage examples with the nouns swapped. Every route below ends in water chemistry, hydraulics, a treatment barrier, or an environmental permit."
  ),
  listLabel: same("Water and wastewater risk scenarios"),
  beat: {
    pathway: same("Cyber / OT pathway"),
    impact: same("Water or wastewater impact"),
    decision: same("Decision the Twin supports")
  },
  items: [
    { id: "exposed-plc", title: same("Publicly exposed PLC or RTU"), pathway: same("Internet-exposed controller, weak remote-access path, default/shared credentials, or insecure cellular/radio gateway."), impact: same("Operator lockout, altered setpoints, stopped pump, unavailable telemetry, inability to manage a remote facility."), decision: same("Remove direct exposure; model secure gateway/VPN, allowlists, backup and recovery requirements.") },
    { id: "dosing", title: same("Drinking-water chemical dosing manipulation"), pathway: same("Path reaches chlorine, hypochlorite, fluoride, coagulant, pH, caustic, acid, or chemical-feed PLC/HMI."), impact: same("Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."), decision: same("Map control points and safety barriers; test restricted engineering access and segment chemical systems.") },
    { id: "disinfection-visibility", title: same("Loss of disinfection visibility"), pathway: same("Compromise disrupts analyser data, SCADA alarms, historian, PLC/HMI, or communications."), impact: same("Utility cannot confirm residual, turbidity, UV performance, or treatment state; may need boil-water or operational response."), decision: same("Identify required telemetry paths, fail-safe conditions, backup measurement and manual-operating actions.") },
    { id: "lift-station", title: same("Wastewater lift-station outage"), pathway: same("Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated."), impact: same("Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting."), decision: same("Identify reachable field assets, power/telemetry dependencies, and safe fallback controls.") },
    { id: "aeration", title: same("Aeration-process disruption"), pathway: same("PLC/VFD/blower control, dissolved-oxygen loop, or plant HMI is altered."), impact: same("Nitrification failure, elevated ammonia, biological-process upset, permit exceedance, prolonged recovery."), decision: same("Test segmentation, control-lockdown, and fallback operating strategies.") },
    { id: "pressure-zone", title: same("Pump / pressure-zone manipulation"), pathway: same("Remote pump, VFD, PRV, valve, or pressure controller is affected."), impact: same("Low pressure, tank overflow, pressure transient, service disruption, possible contamination ingress risk."), decision: same("Model hydraulic and operational implications of control changes before implementation.") },
    { id: "ransomware", title: same("Ransomware in the SCADA/utility environment"), pathway: same("Enterprise compromise reaches SCADA servers, historian, domain services, engineering workstations, file shares, or remote-access infrastructure."), impact: same("Loss of view/control, manual operation, delayed response, degraded coordination across multiple facilities."), decision: same("Prioritize recovery dependencies and safe isolation steps.") },
    { id: "vendor", title: same("Vendor / integrator compromise"), pathway: same("Vendor laptop, support portal, remote-maintenance tunnel, or system-integrator account reaches plant or field controls."), impact: same("Persistent unauthorized path, configuration changes, disrupted support, fleet-wide exposure across standardized assets."), decision: same("Compare vendor-access architectures and contract/control requirements.") },
    { id: "storm", title: same("Storm, flood, or power outage plus cyber disruption"), pathway: same("Weather event reduces staffing, power, fuel, and telecom reliability while a cyber incident affects OT visibility or control."), impact: same("Compounded inability to pump, treat, monitor, communicate, or recover."), decision: same("Model combined failure paths, manual workarounds, backup power, communications, and restoration priorities.") },
    { id: "drift", title: same("Undocumented field-asset drift"), pathway: same("Replacement RTU, modem, PLC, VFD, or radio configuration is changed during field maintenance without full documentation."), impact: same("Security model and operating assumptions become inaccurate; new remote route or unsafe configuration persists."), decision: same("Detect model deltas and re-evaluate reachability and operational impact.") }
  ],
  citation: same(
    "EPA and CISA guidance emphasizes direct PLC internet exposure as a concrete sector risk. CISA recommends removing public exposure, using a VPN or gateway rather than direct PLC access, protecting credentials, allowing only known authorized engineering assets, and maintaining clean PLC-image backups."
  )
};

/* ── Four decisions ─────────────────────────────────────────────────────── */

export const DECISIONS = {
  h2: same("Four decisions that protect treatment, distribution, and environmental compliance."),
  lead: same(
    "One decision is open at a time, because that is how they are actually taken. Each carries the question a utility asks in its own words, and what the model puts on the table in answer."
  ),
  questionLabel: same("Drinking-water and wastewater language"),
  providesLabel: same("What the Twin provides"),
  items: [
    { id: "fix-first", name: same("What do we fix first?"), question: same("Which cyber pathway can affect treatment quality, disinfection, pumping, overflow risk, process monitoring, or permit compliance?"), provides: same("A NOW / NEXT / NEVER prioritization based on reachable control points and process/public-health/environmental consequence."), href: "fixFirst" as const },
    { id: "spend", name: same("What should we spend?"), question: same("Should we fund secure remote access, SCADA replacement, field-RTU modernization, network segmentation, backup communications, additional instrumentation, or generator capacity?"), provides: same("A common consequence model for comparing capital and operational investments—not a generic security score."), href: "investment" as const },
    { id: "change-safely", name: same("Can we change safely?"), question: same("Can we reconfigure this firewall, remote pump-station connection, VLAN, PLC firmware, SCADA server, or chemical-dosing network without losing monitoring or control?"), provides: same("A virtual test of required data/control flows, residual exposure, failover requirements, and process impact."), href: "changeSafely" as const },
    { id: "leave-alone", name: same("What can we leave alone?"), question: same("Which legacy asset is isolated, has limited operational consequence, or can safely wait for planned renewal—with a documented review trigger?"), provides: same("A defensible exception record tied to actual reachability, treatment consequence, owner, compensating controls, and reassessment conditions."), href: "riskAcceptance" as const }
  ],
  note: same(
    "The product's decision framework is useful in water because it can connect a reachable pathway to the physical process, then classify remediation as NOW, NEXT, or NEVER rather than letting a generic CVSS backlog determine operational priorities."
  )
};

/* ── Worked example (Pattern 2 — Three-Gate Ledger) ─────────────────────── */

/**
 * Canvas data for the shared dosing diagram. Assets and paths are typed to the
 * real `SystemAsset` / `SystemPath` contract. Every node is named by the
 * source's own evidence list; every edge is a relationship the source states.
 */
export const DOSING_ASSETS: SystemAsset[] = [
  { id: "vendor", type: "remote-access", label: "Vendor remote-support endpoint", description: "The system integrator's remote troubleshooting connection.", zone: "external" },
  { id: "maintenance-net", type: "network-device", label: "Maintenance network", description: "The plant maintenance network the remote connection lands on.", zone: "plant" },
  { id: "ews", type: "engineering-workstation", label: "Engineering workstation", description: "PLC programming and configuration access.", zone: "plant" },
  { id: "scada", type: "network-device", label: "SCADA / historian", description: "SCADA data flow and alarm dependencies.", zone: "plant" },
  { id: "plc", type: "controller", label: "Chemical-dosing PLC", description: "Runs the dosing sequence and its interlocks.", zone: "process", criticality: "critical" },
  { id: "analyzer", type: "field-device", label: "Chlorine residual analyzer", description: "Residual feedback into the dosing sequence.", zone: "process", criticality: "important" },
  { id: "skid", type: "process-equipment", label: "Sodium-hypochlorite dosing skid", description: "The metering pumps the PLC drives.", zone: "process", criticality: "critical" },
  { id: "interlock", type: "safety-function", label: "High/low dosing alarm interlock", description: "Independent alarming and tank high/low conditions.", zone: "process", criticality: "critical" }
];

export const DOSING_PATHS: SystemPath[] = [
  { id: "e-vendor", from: "vendor", to: "maintenance-net", role: "vendor-access", status: "open" },
  { id: "e-maint-ews", from: "maintenance-net", to: "ews", role: "management", status: "open" },
  { id: "e-maint-plc", from: "maintenance-net", to: "plc", role: "attack-path", status: "open" },
  { id: "e-ews-plc", from: "ews", to: "plc", role: "management", status: "open" },
  { id: "e-scada-plc", from: "scada", to: "plc", role: "required-flow", status: "open" },
  { id: "e-analyzer-plc", from: "analyzer", to: "plc", role: "required-flow", status: "open" },
  { id: "e-plc-skid", from: "plc", to: "skid", role: "required-flow", status: "open" },
  { id: "e-interlock-skid", from: "interlock", to: "skid", role: "required-flow", status: "open" }
];

export const WORKED_EXAMPLE = {
  h2: same("Worked example: secure chemical-dosing control without compromising water quality."),
  scenarioOne: same(
    "A drinking-water treatment plant uses a PLC-controlled sodium-hypochlorite dosing skid. The dosing sequence relies on incoming flow, chlorine-residual feedback, pump status, chemical-tank level, and high/low alarm conditions. The PLC and local HMI are accessible through a maintenance network that also supports a system integrator's remote troubleshooting connection."
  ),
  scenarioTwo: same(
    "A cybersecurity review finds that the remote connection has broad access to the plant network and that the chemical-dosing PLC is reachable through an outdated pathway. The simple recommendation is “disconnect the access.” Operations objects: the integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
  ),
  canvasTitle: same("Vendor remote-access route to the chemical-dosing PLC"),

  baseline: {
    label: same("Baseline"),
    caption: same("As documented, before anything is proposed."),
    entryLabel: same("Entry point"),
    entry: same("Compromised vendor credentials / remote-support endpoint."),
    intermediateLabel: same("Intermediate systems"),
    intermediate: same("Maintenance network route; chemical-dosing PLC or engineering workstation becomes reachable."),
    targetLabel: same("Target asset"),
    target: same("Chemical-dosing PLC — setpoint, logic, mode, or pump-state manipulation becomes possible."),
    chainLabel: same("Consequence chain"),
    chain: [
      same("Compromised vendor credentials / remote-support endpoint"),
      same("Maintenance network route"),
      same("Chemical-dosing PLC or engineering workstation becomes reachable"),
      same("Setpoint, logic, mode, or pump-state manipulation becomes possible"),
      same("Inadequate or excessive disinfection / loss of treatment verification"),
      same("Water-quality event, emergency response, service disruption, public-health risk")
    ],
    constraintLabel: same("Known constraints"),
    constraint: same(
      "The integrator supports faults, calibration issues, and emergency recovery, and the plant must maintain treatment continuously."
    )
  },

  controls: {
    label: same("Proposed control"),
    caption: same("Five candidates, tested in the model. Select one to place it on the canvas above."),
    testsLabel: same("What the Twin tests"),
    insightLabel: same("Decision insight"),
    closesLabel: same("Routes closed"),
    preservesLabel: same("Required flows preserved"),
    residualLabel: same("Residual exposure"),
    noneLabel: same("None in this option"),
    items: [
      {
        id: "disconnect",
        option: same("Disconnect remote support"),
        tests: same("Whether fault recovery, calibration, or emergency assistance becomes operationally unacceptable."),
        insight: same("May lower cyber exposure but increase recovery and continuity risk."),
        closes: ["e-vendor"],
        preserves: [] as string[],
        residual: ["e-maint-ews", "e-maint-plc"],
        marks: ["vendor"]
      },
      {
        id: "broker",
        option: same("Broker vendor access"),
        tests: same("MFA, approval, time-limited sessions, jump host, recording, per-asset access, and removal of persistent connectivity."),
        insight: same("Preserves necessary support while removing uncontrolled reachability."),
        closes: [] as string[],
        preserves: ["e-maint-ews"],
        residual: ["e-maint-plc"],
        marks: ["vendor"]
      },
      {
        id: "segment",
        option: same("Segment the chemical skid"),
        tests: same("Virtual firewall rules and conduit design between vendor path, engineering workstation, SCADA, and dosing PLC."),
        insight: same("Shows required process/monitoring flows and the routes that can be safely closed."),
        closes: ["e-maint-plc"],
        preserves: ["e-scada-plc", "e-analyzer-plc"],
        residual: ["e-ews-plc"],
        marks: ["maintenance-net"]
      },
      {
        id: "harden",
        option: same("Harden the controller"),
        tests: same("Password protection, clean PLC-image backup, restricted programming path, allowlisting, and change-control workflow."),
        insight: same("Reduces takeover/lockout risk and improves recovery readiness."),
        closes: [] as string[],
        preserves: ["e-scada-plc"],
        residual: ["e-ews-plc"],
        marks: ["plc"]
      },
      {
        id: "safeguards",
        option: same("Add process safeguards"),
        tests: same("Independent alarming, local/manual fallback, separate measurement verification, or operating procedure changes."),
        insight: same("Shows which controls reduce consequence if cyber protections fail."),
        closes: [] as string[],
        preserves: ["e-interlock-skid", "e-analyzer-plc"],
        residual: [] as string[],
        marks: ["interlock", "analyzer"]
      }
    ]
  },

  output: {
    label: same("Decision output"),
    caption: same("What the model actually recommends."),
    recommendedLabel: same("Recommended sequence"),
    recommended: same(
      "The recommendation is not merely “secure the PLC.” It is a water-quality decision: reduce unauthorized reachability, preserve controlled technical support, verify that SCADA and alarms still function, and ensure operators can maintain compliant disinfection if digital control is unavailable."
    ),
    evidenceLabel: same("Evidence needed"),
    evidence: [
      { category: same("Treatment-process evidence"), items: same("Process-flow diagram and P&IDs; dosing-control narrative and interlocks; chemical dosing calculations and acceptable operating range; residual-monitoring points and sampling requirements; clearwell, contact-time and treatment operating constraints; emergency operating procedures and manual-dosing capability.") },
      { category: same("OT and network evidence"), items: same("Chemical PLC, local HMI, VFD / metering-pump controls; SCADA data flow and alarm dependencies; engineering workstation and vendor-access route; firewall, VLAN, routing, remote gateway and observed OT traffic; existing backups, PLC project files and recovery procedure.") },
      { category: same("Operational-consequence evidence"), items: same("Water-quality escalation thresholds; loss-of-treatment and service-impact assumptions; staff response time, operator coverage and manual operating limitations; relevant regulatory and notification obligations.") }
    ],
    validationLabel: same("Validation condition"),
    validation: same(
      "SCADA and alarms still function, and operators can maintain compliant disinfection if digital control is unavailable."
    ),
    /* The Three-Gate Ledger's Decision-output panel also names an
       implementation window and a responsible role. The source brief states
       neither for this scenario, so neither is printed — an invented window or
       an invented owner would be fabricated evidence on a page whose whole
       argument is that evidence is traceable. */
    omissionLabel: same("Not asserted here"),
    omission: same(
      "Implementation window and responsible role are set with the utility during the engagement. This illustrative record does not claim them."
    ),
    citation: same(
      "This example closely reflects the sector threat pattern CISA has highlighted: internet-exposed PLCs can be used to lock operators out or change device configuration, while water utilities must preserve the ability to monitor and control treatment safely."
    )
  }
};

/* ── Capabilities ───────────────────────────────────────────────────────── */

export const CAPABILITIES = {
  h2: same("One model spanning source, treatment, field assets, and recovery."),
  lead: same(
    "Seven strata of one model, not seven products. Each reads the same evidence base and answers a different question about it."
  ),
  items: [
    { name: same("Process and treatment model"), body: same("Represents source-to-tap or influent-to-effluent pathways, chemical treatment, pumps, tanks, biological systems, disinfection, and key operating boundaries.") },
    { name: same("Field-estate and telemetry model"), body: same("Maps pump stations, lift stations, reservoirs, wells, remote RTUs, modems, radio/cellular links, and their operational dependencies.") },
    { name: same("SCADA and control-path model"), body: same("Links PLCs, RTUs, VFDs, HMIs, SCADA, historians, engineering workstations, alarms, and remote support to the process they control.") },
    { name: same("Hydraulic and process-consequence model"), body: same("Helps reason through operational effects such as overflow, low pressure, loss of treatment, loss of monitoring, aeration upset, or dosing deviation.") },
    { name: same("Cyber pathway and change simulation"), body: same("Tests segmentation, secure remote access, controller hardening, SCADA changes, radio/cellular network changes, and recovery controls before live deployment.") },
    { name: same("Resilience and recovery view"), body: same("Identifies dependencies on power, communications, staffing, clean backups, manual operation, chemicals, spares, and external integrators.") },
    { name: same("Evidence and assurance output"), body: same("Provides traceable risk decisions, architecture views, operational evidence, and regulatory/board-ready reporting from one model.") }
  ],
  note: same(
    "The OXOT Cyber Digital Twin supports facility-physics, asset, network, data-fusion, and governance layers, along with synchronized P&ID, Purdue, network, dependency-graph, and 3D views. It can produce risk deltas, BOM outputs, engineering visualizations, and compliance-oriented technical files."
  )
};

/* ── Regulatory ─────────────────────────────────────────────────────────── */

export const REGULATORY = {
  h2: same("Support safe-water and environmental-resilience evidence from the same operating model."),
  lead: same(
    "OXOT does not promise automatic compliance. The Twin supports risk assessment, evidence creation, traceability, scenario testing, recovery planning, and decision documentation."
  ),
  headings: {
    framework: same("Framework / obligation"),
    relevance: same("Sector relevance"),
    support: same("How OXOT supports the work")
  },
  rows: [
    { framework: "NIS2", relevance: same("Drinking water and wastewater are included in the Directive's high-criticality scope, subject to entity thresholds, national transposition, and Member State implementation."), support: same("Supports cyber risk-management evidence, asset/dependency visibility, supply-chain analysis, governance reporting, and resilience-oriented risk treatment."), href: "assurance" as const },
    { framework: "CER Directive", relevance: same("Drinking water and wastewater are within the Critical Entities Resilience scope; it focuses on resilience to relevant natural and human-made risks."), support: same("Supports a joined-up view of cyber, power, telecoms, weather, supplier, operational, and physical dependencies."), href: null },
    { framework: "EU Drinking Water Directive", relevance: same("Focuses on water quality, risk-based safety, monitoring, and consumer protection; it does not itself create a standalone cybersecurity regime."), support: same("Connects OT and cyber scenarios to treatment and water-quality operational evidence."), href: null },
    { framework: "Urban Wastewater Treatment Directive", relevance: same("Drives treatment, collection, discharge, monitoring, and environmental requirements; cybersecurity implications arise when OT disruption affects these duties."), support: same("Connects cyber pathways to process performance, effluent quality, pumping, overflow, and reporting consequences."), href: null },
    { framework: "IEC 62443", relevance: same("The primary IACS cybersecurity standard for treatment facilities, SCADA systems, remote telemetry, and system-integration work."), support: same("Supports system definition, zones/conduits, reachability, risk decisions, and traceable security evidence."), href: "iec62443" as const },
    { framework: "NIST SP 800-82 Rev. 3", relevance: same("Widely used OT/ICS guidance, especially for US utilities and multinational programs."), support: same("Supports architecture, asset context, segmentation, access control, recovery, and safe implementation planning."), href: null },
    { framework: "US SDWA / AWIA Section 1433", relevance: same("Community water systems serving more than 3,300 people must conduct risk and resilience assessments that include automated-system cybersecurity, develop ERPs, and review/certify them at least every five years."), support: same("Helps create a facility-specific evidence base for the cyber portion of risk/resilience assessment and emergency-response planning."), href: null },
    { framework: "State drinking-water sanitary surveys", relevance: same("US states must evaluate the adequacy of OT cybersecurity where it is part of a required public-water-system sanitary survey component."), support: same("Provides OT architecture, control-path, asset, process, and documented risk-treatment evidence."), href: null },
    { framework: "EPA cyber guidance and response planning", relevance: same("EPA recommends IT/OT risk and resilience evaluation, mitigation planning, and response preparation across water-system types."), support: same("Supports incident scenarios, recovery dependencies, critical-asset prioritization, and decision documentation."), href: null }
  ],
  notes: [
    same("NIS2 explicitly includes drinking water and wastewater entities, while ENISA notes that both sectors are subject to NIS2 baseline cybersecurity objectives."),
    same("In the United States, SDWA Section 1433 requires community water systems serving more than 3,300 people to include cybersecurity in their risk and resilience assessments and certify completion of the assessment and emergency-response planning; reassessment and ERP review are required every five years."),
    same("EPA also recommends all water and wastewater operators assess the resilience of their IT and OT systems, develop a mitigation plan for critical operations, and address cybersecurity in risk/resilience and emergency-response work.")
  ]
};

/* ── Engagement ─────────────────────────────────────────────────────────── */

export const ENGAGEMENT = {
  h2: same("Start with one treatment process or one remote field system."),
  lead: same(
    "Four entry points, ordered by scope rather than by sequence — a utility starts wherever its real question sits, and each one produces a defined output."
  ),
  startLabel: same("Best starting point"),
  outputLabel: same("Example output"),
  items: [
    { name: same("Treatment-Process Decision Sprint"), start: same("Chemical dosing, UV/disinfection, filtration, aeration, biological process, or control-room change"), output: same("Modelled cyber pathway, treatment consequence, control options, and prioritized action plan") },
    { name: same("Remote-Asset Resilience Sprint"), start: same("Lift stations, pump stations, wells, reservoirs, booster stations, field RTUs, or telemetry network"), output: same("Reachability map, operational dependency analysis, secure remote-access and recovery roadmap") },
    { name: same("Facility Twin Build"), start: same("One drinking-water treatment plant, wastewater treatment plant, or regional operations environment"), output: same("Validated Cyber Digital Twin, risk-priority queue, process/OT views, evidence package") },
    { name: same("Continuous Twin Operations"), start: same("Multi-site utility with changing assets, vendors, threat context, capital programs, and seasonal risk"), output: same("Risk deltas, scenario testing, evidence updates, resilience reporting, and recurring decision support") }
  ]
};

/* ── Final CTA ──────────────────────────────────────────────────────────── */

export const FINAL_CTA = {
  h2: same("Start with one plant, one pump station, or one treatment decision."),
  body: same(
    "Bring a process-flow diagram, P&ID, SCADA asset list, or a proposed remote-access or network change. OXOT will show how a Cyber Digital Twin can trace the path to the treatment or environmental consequence—before the live system is changed."
  ),
  ctaPrimary: same("Discuss a water-system scenario"),
  ctaSecondary: same("Request the Technical Specification")
};
