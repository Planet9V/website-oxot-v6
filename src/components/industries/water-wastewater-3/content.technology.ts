/**
 * WATER & WASTEWATER — ITERATION 3, S04. Technology index, data only.
 *
 * TERMS: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * L150-159, the brief's eight-row technology table. All 77 terms, in the
 * brief's own order. None added, none dropped.
 *
 * GLOSSES: not from the brief. The brief prints these as bare enumerations, and
 * a bare enumeration is the thing this section exists to stop being — a chip
 * reading "DNP3" carries exactly the information already in the word "DNP3".
 * Each term therefore carries a short clause on what the Twin does with it, and
 * every clause is CONSTRAINED TO RESTATE A CLAIM THIS PAGE ALREADY MAKES
 * SOMEWHERE ELSE. The anchors, all of which render on /industries/
 * water-wastewater-3:
 *
 *   A1  content.ts ASSET_CLASSES.intro — what the Twin combines: P&IDs, process
 *       and equipment data, PLC/SCADA/RTU/HMI configurations, network topology,
 *       passive traffic evidence, industrial protocol information, and
 *       operational safety/reliability inputs.
 *   A2  content.ts HERO.lead — connects treatment processes, field automation,
 *       SCADA pathways and operational consequences.
 *   A3  content.ts HERO.lead — test a change without touching the live process.
 *   A4  content.ts HERO.lead — prioritize the risks that can affect water
 *       quality or environmental compliance.
 *   A5  content.assets.ts — each asset's own description and its criticality,
 *       argued from what a compromise of it costs the process.
 *   A6  content.scenario.ts — paths, their status, and controls that close,
 *       preserve or leave residual reachability.
 *   A7  content.scenario.ts DOSING_EVIDENCE — the named records the Twin takes
 *       in for this scenario.
 *   A8  content.architecture.ts — the shared SCADA/telemetry and communications
 *       layers, and the per-stage consequence the section draws.
 *
 * TWO AREAS ARE DELIBERATELY MODEST, and that is a decision, not an oversight.
 * Nothing on this page claims a capability against a NAMED PROTOCOL, and
 * nothing claims one against a NAMED OPERATIONS SYSTEM (CMMS, LIMS, GIS,
 * hydraulic-modeling tools). A1 does say the Twin ingests "industrial protocol
 * information" and "operational safety/reliability inputs", so those two areas
 * are glossed at exactly that level — recorded, ingested — and stop short of
 * anything implying register-level polling, packet inspection or a live
 * integration. If a capability claim is later approved for this page that earns
 * more, strengthen them then. Do not strengthen them ahead of the claim.
 *
 * ONE GLOSS REPORTS A GAP RATHER THAN FILLING IT. Biogas methane/H₂S is real
 * wastewater instrumentation the brief lists, sitting on a stage that
 * content.architecture.ts marks `impact: null` because the source traces no
 * consequence to it. Its gloss says so.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/** The term is equipment vocabulary and is not translated; the clause is prose
 *  and is. Same split `ArchStage.equipment` already makes. */
export interface TechTerm {
  term: string;
  gloss: Bilingual;
}

export interface TechArea {
  area: Bilingual;
  terms: TechTerm[];
}

export const TECHNOLOGY = {
  lead: same(
    "Eight areas, seventy-seven terms. The source lists each area as a bare enumeration; every term here carries a short clause on what the Twin does with it, so an area reads as a definition list rather than as a row of labels. Where this page claims nothing more specific, the clause stays at ingestion and says no more than the page can support."
  ),
  areas: [
    {
      /* L152 */
      area: same("Plant control"),
      terms: [
        { term: "PLCs", gloss: same("Controller configuration combined into the model") },
        { term: "PACs", gloss: same("Modelled with the PLCs on one control layer") },
        { term: "RTUs", gloss: same("Remote-site controller on the shared telemetry layer") },
        { term: "VFDs", gloss: same("Drive tied to the pump it turns") },
        { term: "MCCs", gloss: same("Motor-control equipment recorded as equipment data") },
        { term: "HMIs", gloss: same("Operator control path into the modelled process") },
        { term: "Local panels", gloss: same("Local control point manual operation depends on") },
        { term: "SCADA servers", gloss: same("Carries dosing state and alarms to operators") },
        {
          term: "Engineering workstations",
          gloss: same("Programming path tested against hardening and allowlisting")
        }
      ]
    },
    {
      /* L153 */
      area: same("Remote telemetry"),
      terms: [
        { term: "Radio", gloss: same("Field link drawn on the communications layer") },
        { term: "Cellular", gloss: same("Recorded in the network topology as a bearer") },
        {
          term: "Licensed/unlicensed spectrum",
          gloss: same("The spectrum beneath a mapped radio link")
        },
        { term: "Satellite", gloss: same("Remote-site bearer held in the topology") },
        { term: "Serial telemetry", gloss: same("Legacy link from a mapped remote RTU") },
        { term: "Microwave", gloss: same("Backhaul bearer recorded in the topology") },
        { term: "Leased lines", gloss: same("Carrier circuit on the communications layer") },
        {
          term: "VPN-based remote sites",
          gloss: same("Remote-access route tested before the change")
        }
      ]
    },
    {
      /* L154. The modest area — see the file header. Every clause here is
         ingestion-framed because no capability claim on this page names a
         protocol. */
      area: same("Common protocols"),
      terms: [
        {
          term: "Modbus RTU/TCP",
          gloss: same("Protocol information recorded with the control path")
        },
        { term: "DNP3", gloss: same("Protocol information recorded with the telemetry path") },
        { term: "OPC DA/UA", gloss: same("Protocol information recorded with the SCADA path") },
        { term: "EtherNet/IP", gloss: same("Protocol information recorded against the segment") },
        { term: "PROFINET", gloss: same("Protocol information recorded against the segment") },
        { term: "BACnet", gloss: same("Protocol information recorded in the network topology") },
        { term: "MQTT", gloss: same("Protocol information recorded in the network topology") },
        {
          term: "Serial-to-IP gateways",
          gloss: same("Where a serial device becomes IP-reachable")
        },
        {
          term: "Proprietary radio protocols",
          gloss: same("Protocol information recorded with the radio link")
        }
      ]
    },
    {
      /* L155 */
      area: same("Water quality instrumentation"),
      terms: [
        { term: "Turbidity", gloss: same("Filtration signal behind loss of treatment confirmation") },
        { term: "pH", gloss: same("Chemical-treatment signal bounding a dosing deviation") },
        { term: "Conductivity", gloss: same("Water-quality signal carried on the treatment stage") },
        { term: "Chlorine residual", gloss: same("Closes the dosing loop and confirms the barrier") },
        { term: "ORP", gloss: same("Disinfection control signal at the treatment stage") },
        { term: "Fluoride", gloss: same("Dosing signal at the fluoridation step") },
        { term: "UV transmittance", gloss: same("Disinfection input behind inadequate disinfection") },
        { term: "Flow", gloss: same("Paces the dose against incoming flow") },
        { term: "Level", gloss: same("Reports chemical-tank inventory to the dosing sequence") },
        {
          term: "Pressure",
          gloss: same("Distribution signal behind the loss-of-pressure consequence")
        },
        { term: "Temperature", gloss: same("Process condition recorded as equipment data") },
        { term: "TOC", gloss: same("Source-water signal behind loss of source monitoring") }
      ]
    },
    {
      /* L156 */
      area: same("Wastewater instrumentation"),
      terms: [
        { term: "Flow", gloss: same("Hydraulic input to the overflow consequence") },
        { term: "Level", gloss: same("Wet-well state behind the sewer-overflow consequence") },
        {
          term: "Dissolved oxygen",
          gloss: same("Aeration loop behind the aeration-disruption consequence")
        },
        { term: "Ammonia", gloss: same("Elevated-ammonia signal in the biological consequence") },
        { term: "Nitrate/nitrite", gloss: same("Nutrient-removal signal at the biological stage") },
        { term: "pH", gloss: same("Biological-process condition at the biological stage") },
        { term: "ORP", gloss: same("Process condition tracked across the biological stage") },
        { term: "Turbidity", gloss: same("Effluent signal behind non-compliant effluent") },
        { term: "MLSS", gloss: same("Biological-system state on the modelled stage") },
        { term: "Sludge blanket", gloss: same("Clarifier state on the modelled stage") },
        /* The reported gap — see the file header. */
        {
          term: "Biogas methane/H₂S",
          gloss: same("Solids-stage signal; the source traces no consequence")
        }
      ]
    },
    {
      /* L157 */
      area: same("Critical actuation"),
      terms: [
        { term: "Pumps", gloss: same("Lift behind the pump-station-failure consequence") },
        { term: "Valves", gloss: same("Control element on a modelled hydraulic path") },
        { term: "Gates", gloss: same("Flow-control element on that same path") },
        { term: "VFDs", gloss: same("Drive on the lift-station and blower paths") },
        {
          term: "Chemical metering pumps",
          gloss: same("Executes the dose the controller calls for")
        },
        {
          term: "Blowers",
          gloss: same("Aeration asset behind the aeration-disruption consequence")
        },
        { term: "Mixers", gloss: same("Process asset recorded as equipment data") },
        { term: "UV banks", gloss: same("Disinfection asset at the tertiary stage") },
        { term: "Chlorinators", gloss: same("Disinfection asset behind a dosing deviation") },
        { term: "Polymer systems", gloss: same("Chemical asset recorded as equipment data") },
        { term: "Belt presses", gloss: same("Dewatering asset recorded as equipment data") }
      ]
    },
    {
      /* L158. The second modest area — see the file header. */
      area: same("Operations systems"),
      terms: [
        { term: "Historian", gloss: same("Retains the dosing and residual record") },
        {
          term: "Alarm-management platform",
          gloss: same("Alarm dependency carried with the SCADA path")
        },
        { term: "CMMS/EAM", gloss: same("Maintenance history ingested as a reliability input") },
        {
          term: "Laboratory information systems",
          gloss: same("Sampling records ingested as operational evidence")
        },
        { term: "GIS", gloss: same("One of the operations systems the inventory records") },
        {
          term: "Hydraulic-modeling tools",
          /* L161's exact phrase is "process and equipment data" — used here
             verbatim rather than the invented "process evidence" the first
             draft used, per the QA gate's 2026-08-25 content-honesty fix. */
          gloss: same("Existing hydraulic work ingested as process and equipment data")
        },
        {
          term: "Work-order systems",
          /* No L161 category maps cleanly to work orders — kept modest
             ("recorded", not "ingested as X") rather than inventing one,
             matching the same 2026-08-25 fix applied to GIS above. */
          gloss: same("One of the operations systems the inventory records")
        }
      ]
    },
    {
      /* L159 */
      area: same("Physical process evidence"),
      terms: [
        { term: "P&IDs", gloss: same("Combined into the model as process evidence") },
        {
          term: "Process-flow diagrams",
          gloss: same("Accepted as a starting input for the model")
        },
        {
          term: "Electrical single-lines",
          gloss: same("Power evidence recorded as equipment data")
        },
        { term: "Pump curves", gloss: same("Equipment data combined into the process model") },
        {
          term: "Chemical dosing calculations",
          gloss: same("The acceptable range a deviation is measured against")
        },
        {
          term: "Control narratives",
          gloss: same("Dosing narrative and interlocks, held with the controller")
        },
        {
          term: "Alarm rationalization",
          gloss: same("Alarm intent held with the alarm dependencies")
        },
        { term: "SOPs", gloss: same("Emergency procedures and manual-dosing capability") },
        { term: "Maintenance history", gloss: same("Reliability input combined into the model") },
        {
          term: "Permit limits",
          gloss: same("Compliance boundary the risk is prioritised against")
        }
      ]
    }
  ] satisfies TechArea[]
};
