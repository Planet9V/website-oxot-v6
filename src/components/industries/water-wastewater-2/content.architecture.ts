/**
 * S02 · TYPICAL WATER OT ARCHITECTURE — source L96–L161.
 *
 * Split out of `content.ts` for one hard reason: that file crossed 500 lines,
 * and this repository caps files there. Nothing else moved with it — the
 * strings are the same strings, transcribed from new_material_source/
 * 1_website_layout_v4/3_industries/industry_water.md, and the split is along a
 * section boundary rather than an arbitrary line count, so a reader looking for
 * the architecture section has one file to open.
 */
import { same } from "../registry";

/* ── S02 · Architecture ─────────────────────────────────────────────────── */

export interface ArchStage {
  id: string;
  name: ReturnType<typeof same>;
  /** Relative hydraulic grade, 1 (lowest) to 6 (highest). */
  grade: number;
  lift?: boolean;
  /** The source's own equipment list for the stage, as a callout. */
  equipment: ReturnType<typeof same>;
}

export interface ArchSystem {
  id: "drinking" | "wastewater";
  label: ReturnType<typeof same>;
  stages: ArchStage[];
  controlBand: { caption: ReturnType<typeof same>; text: ReturnType<typeof same> };
  commsBand: { caption: ReturnType<typeof same>; text: ReturnType<typeof same> } | null;
}

/**
 * One row of the technology index: the source's equipment term, and what this
 * page has already said the Twin does with it. The gloss is prose and so is
 * `Bilingual`; the term is an equipment name and is not translated, the same
 * split `ArchStage.equipment` already makes.
 */
export interface TechTerm {
  term: string;
  gloss: ReturnType<typeof same>;
}

export interface TechArea {
  area: ReturnType<typeof same>;
  terms: TechTerm[];
}

/**
 * THE ARCHITECTURE, READ AS A LONG SECTION.
 *
 * The source's two architecture blocks (L106–123, L127–146) each end with one
 * or two blocks that are NOT process stages — "Control and operations",
 * "Communications", "Control and monitoring". Drawing those as stages on a
 * grade line would put a radio link at an elevation, which is nonsense. They
 * are rendered as the bands beneath the section, exactly as the source lays
 * them out beneath the physical chain. Everything above the bands is a real
 * physical stage with a real hydraulic position.
 */
export const ARCHITECTURE = {
  h2: same("Model the treatment process and the remote field estate together."),
  lead: same(
    "Two selectable systems, as the brief requires. They share a SCADA and telemetry layer and share almost nothing else — different physical processes, different assets, different consequences, different decision language."
  ),
  systems: [
    {
      id: "drinking",
      label: same("Drinking water"),
      stages: [
        {
          id: "source",
          name: same("Source / raw water"),
          grade: 6,
          equipment: same("Rivers · reservoirs · groundwater wells · intakes")
        },
        {
          id: "treatment",
          name: same("Treatment"),
          grade: 3,
          equipment: same(
            "Screens · coagulation · flocculation · sedimentation · filtration · disinfection · pH adjustment · fluoridation · clearwell"
          )
        },
        {
          id: "distribution",
          name: same("Storage and distribution"),
          grade: 6,
          lift: true,
          equipment: same(
            "High-service pumps · reservoirs · tanks · pressure zones · PRVs · booster stations · meters · pressure / chlorine residual monitoring"
          )
        }
      ],
      controlBand: {
        caption: same("Control and operations"),
        text: same("PLCs · RTUs · VFDs · HMIs · SCADA · historian · laboratory systems")
      },
      commsBand: {
        caption: same("Communications"),
        text: same("Plant LAN · radio · cellular · private WAN · fiber · leased lines · VPN")
      }
    },
    {
      id: "wastewater",
      label: same("Wastewater"),
      stages: [
        {
          id: "collection",
          name: same("Collection system"),
          grade: 2,
          equipment: same("Gravity sewer · force main · lift station · wet well · level instrumentation")
        },
        {
          id: "headworks",
          name: same("Headworks and primary treatment"),
          grade: 6,
          lift: true,
          equipment: same("Screens · grit removal · primary clarifiers · pumps")
        },
        {
          id: "biological",
          name: same("Biological treatment"),
          grade: 5,
          equipment: same(
            "Aeration blowers · basins · DO / ammonia / nitrate analysers · RAS / WAS pumps · clarifiers · nutrient removal controls"
          )
        },
        {
          id: "tertiary",
          name: same("Tertiary treatment and disinfection"),
          grade: 4,
          equipment: same("Filtration · UV · chlorine / dechlorination · reuse systems")
        },
        {
          id: "solids",
          name: same("Solids and biosolids"),
          grade: 2,
          equipment: same("Thickening · digestion · dewatering · biogas · storage / disposal")
        }
      ],
      controlBand: {
        caption: same("Control and monitoring"),
        text: same("PLCs · RTUs · SCADA · HMI · historian · alarms · remote telemetry")
      },
      commsBand: null
    }
  ] satisfies ArchSystem[],

  techLabel: same("Common OT, telemetry, and process technologies"),
  techLead: same(
    "Eight technology areas. The source lists each of them as a bare enumeration of equipment terms; every term here is paired with what the Twin does with it, so an area reads as a definition list rather than as a row of labels."
  ),

  /**
   * EVERY GLOSS TRACES TO A CLAIM THIS PAGE ALREADY MAKES.
   *
   * The terms are the source's own (industry_water.md L150–159) and none was
   * added or dropped. The glosses are not: they are new prose, and they are
   * therefore constrained to restate what `CAPABILITIES.items` in content.ts,
   * `CAPABILITIES.note`, `FINAL_CTA.body` and `twinNote` below already say —
   * all four of which render on this same page. Nothing here claims a
   * detection capability, a protocol-specific inspection, a certification or a
   * number, because this page claims none of those anywhere else.
   *
   * TWO AREAS ARE DELIBERATELY MODEST. No capability on this page names a
   * protocol (Modbus, DNP3, BACnet) or an operations system (CMMS, LIMS, GIS,
   * hydraulic-modeling tools). Their glosses are ingestion- and pathway-framed
   * for that reason — "a reachable route", "ingested as operational evidence" —
   * and stop short of anything implying register-level polling or packet
   * inspection. If a future capability claim earns more, strengthen them then;
   * do not strengthen them ahead of the claim.
   */
  tech: [
    {
      area: same("Plant control"),
      terms: [
        { term: "PLCs", gloss: same("Linked to the process it controls") },
        { term: "PACs", gloss: same("Modelled with the PLCs on one control path") },
        { term: "RTUs", gloss: same("Tied to the remote site it reports for") },
        { term: "VFDs", gloss: same("Linked to the pump or blower it drives") },
        { term: "MCCs", gloss: same("Carries the power dependency behind those drives") },
        { term: "HMIs", gloss: same("Operator control path into the modelled process") },
        { term: "Local panels", gloss: same("Local control point that manual operation depends on") },
        { term: "SCADA servers", gloss: same("Central control layer linked to the process") },
        { term: "Engineering workstations", gloss: same("Change path tested against segmentation and hardening") }
      ]
    },
    {
      area: same("Remote telemetry"),
      terms: [
        { term: "Radio", gloss: same("Mapped as a remote-site link and its dependency") },
        { term: "Cellular", gloss: same("Mapped with the field assets depending on it") },
        { term: "Licensed/unlicensed spectrum", gloss: same("The bearer beneath a mapped radio link") },
        { term: "Satellite", gloss: same("Remote-site link held as a communications dependency") },
        { term: "Serial telemetry", gloss: same("Legacy link from a mapped remote RTU") },
        { term: "Microwave", gloss: same("Backhaul link held as a communications dependency") },
        { term: "Leased lines", gloss: same("Carrier circuit held as a communications dependency") },
        { term: "VPN-based remote sites", gloss: same("Remote access tested before the change goes live") }
      ]
    },
    {
      area: same("Common protocols"),
      terms: [
        { term: "Modbus RTU/TCP", gloss: same("Control-path protocol modelled as a reachable route") },
        { term: "DNP3", gloss: same("Telemetry protocol modelled as a reachable route") },
        { term: "OPC DA/UA", gloss: same("Data path between SCADA and the plant systems") },
        { term: "EtherNet/IP", gloss: same("Control traffic carried on a modelled segment") },
        { term: "PROFINET", gloss: same("Controller-to-device traffic inside a modelled segment") },
        { term: "BACnet", gloss: same("Facility-systems protocol recorded in the network topology") },
        { term: "MQTT", gloss: same("Publish/subscribe path recorded in the network topology") },
        { term: "Serial-to-IP gateways", gloss: same("Modelled where a serial device becomes IP-reachable") },
        { term: "Proprietary radio protocols", gloss: same("Protocol information recorded with the radio link") }
      ]
    },
    {
      area: same("Water quality instrumentation"),
      terms: [
        { term: "Turbidity", gloss: same("Filtration signal behind a loss-of-treatment effect") },
        { term: "pH", gloss: same("Chemical-treatment signal bounding a dosing deviation") },
        { term: "Conductivity", gloss: same("Quality signal inside a modelled operating boundary") },
        { term: "Chlorine residual", gloss: same("Disinfection signal behind a loss-of-treatment effect") },
        { term: "ORP", gloss: same("Disinfection control signal within an operating boundary") },
        { term: "Fluoride", gloss: same("Dosing signal bounded by an operating limit") },
        { term: "UV transmittance", gloss: same("Disinfection input to a loss-of-treatment effect") },
        { term: "Flow", gloss: same("Hydraulic input to low-pressure and overflow reasoning") },
        { term: "Level", gloss: same("Tank and reservoir state in that hydraulic reasoning") },
        { term: "Pressure", gloss: same("Distribution signal behind a low-pressure effect") },
        { term: "Temperature", gloss: same("Process condition inside a modelled operating boundary") },
        { term: "TOC", gloss: same("Source-water signal ahead of the treatment step") }
      ]
    },
    {
      area: same("Wastewater instrumentation"),
      terms: [
        { term: "Flow", gloss: same("Influent-to-effluent input for overflow reasoning") },
        { term: "Level", gloss: same("Wet-well state behind an overflow effect") },
        { term: "Dissolved oxygen", gloss: same("Aeration signal behind an aeration-upset effect") },
        { term: "Ammonia", gloss: same("Biological-treatment signal in a treatment-loss effect") },
        { term: "Nitrate/nitrite", gloss: same("Nutrient-removal signal inside an operating boundary") },
        { term: "pH", gloss: same("Biological-process condition inside an operating boundary") },
        { term: "ORP", gloss: same("Process condition tracked across the biological stage") },
        { term: "Turbidity", gloss: same("Effluent-quality signal in a treatment-loss effect") },
        { term: "MLSS", gloss: same("Biological-system state the process model represents") },
        { term: "Sludge blanket", gloss: same("Clarifier state the process model represents") },
        { term: "Biogas methane/H₂S", gloss: same("Solids-stage input to safety and reliability") }
      ]
    },
    {
      area: same("Critical actuation"),
      terms: [
        { term: "Pumps", gloss: same("Modelled asset behind low-pressure and overflow effects") },
        { term: "Valves", gloss: same("Control element on a modelled hydraulic pathway") },
        { term: "Gates", gloss: same("Flow-control element on that same pathway") },
        { term: "VFDs", gloss: same("Drive linked to the pump it controls") },
        { term: "Chemical metering pumps", gloss: same("Dosing asset behind a dosing-deviation effect") },
        { term: "Blowers", gloss: same("Aeration asset behind an aeration-upset effect") },
        { term: "Mixers", gloss: same("Process asset represented in the treatment model") },
        { term: "UV banks", gloss: same("Disinfection asset behind a loss-of-treatment effect") },
        { term: "Chlorinators", gloss: same("Disinfection asset behind a dosing-deviation effect") },
        { term: "Polymer systems", gloss: same("Chemical asset carrying a supply dependency") },
        { term: "Belt presses", gloss: same("Dewatering asset represented in the process model") }
      ]
    },
    {
      area: same("Operations systems"),
      terms: [
        { term: "Historian", gloss: same("Operational record linked to the modelled process") },
        { term: "Alarm-management platform", gloss: same("Alarm layer linked to the process it watches") },
        { term: "CMMS/EAM", gloss: same("Maintenance records ingested as operational evidence") },
        { term: "Laboratory information systems", gloss: same("Laboratory data ingested as operational evidence") },
        { term: "GIS", gloss: same("Asset locations ingested alongside network topology") },
        { term: "Hydraulic-modeling tools", gloss: same("Existing hydraulic inputs ingested into the model") },
        { term: "Work-order systems", gloss: same("Work records ingested as operational evidence") }
      ]
    },
    {
      area: same("Physical process evidence"),
      terms: [
        { term: "P&IDs", gloss: same("Combined into the model as a synchronized view") },
        { term: "Process-flow diagrams", gloss: same("Accepted as a starting input for the model") },
        { term: "Electrical single-lines", gloss: same("Power-dependency evidence for the resilience view") },
        { term: "Pump curves", gloss: same("Equipment data combined into the process model") },
        { term: "Chemical dosing calculations", gloss: same("The basis for a modelled dosing deviation") },
        { term: "Control narratives", gloss: same("Control intent combined with PLC/SCADA configurations") },
        { term: "Alarm rationalization", gloss: same("Alarm intent linked to the modelled process") },
        { term: "SOPs", gloss: same("Manual-operation evidence for the recovery view") },
        { term: "Maintenance history", gloss: same("Reliability input combined into the model") },
        { term: "Permit limits", gloss: same("Operating boundary behind regulatory-ready reporting") }
      ]
    }
  ] satisfies TechArea[],
  twinNote: same(
    "The OXOT Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs."
  )
};
