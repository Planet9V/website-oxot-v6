/**
 * S04 · THE TEN RISK SCENARIOS — source L171–L182, cells carried across intact.
 *
 * Each row is four source cells: the scenario, the cyber/OT pathway, the water
 * or wastewater impact, and the decision the Twin supports. Those last three are
 * the three beats the register's detail panel draws as a trace —
 * `--signal-blue` pathway, `--signal-red` consequence, `--signal-amber`
 * decision. Three tokens in one panel is not three competing accents: each is
 * carrying the meaning it is defined to carry.
 *
 * ROW 1 CARRIES L184's OPENING CLAUSE and nothing else from that line. The five
 * concrete CISA recommendations that follow it moved up to the sector-reality
 * evidence panel, where the same advisory's finding already sits — see
 * `content.ts`. The clause stays here because it is about this scenario.
 */
import { same } from "../registry";

export const SCENARIOS = {
  h2: same("Trace a cyber route to a water-quality, flooding, or permit consequence."),
  lead: same(
    "These are not production-outage examples with the nouns swapped. Every route below ends in water chemistry, hydraulics, a treatment barrier, or an environmental permit."
  ),
  listLabel: same("Water and wastewater risk scenarios"),
  detailLabel: same("Selected scenario"),
  beat: {
    pathway: same("Cyber / OT pathway"),
    impact: same("Water or wastewater impact"),
    decision: same("Decision the Twin supports")
  },
  items: [
    {
      id: "exposed-plc",
      title: same("Publicly exposed PLC or RTU"),
      pathway: same(
        "Internet-exposed controller, weak remote-access path, default/shared credentials, or insecure cellular/radio gateway."
      ),
      impact: same(
        "Operator lockout, altered setpoints, stopped pump, unavailable telemetry, inability to manage a remote facility."
      ),
      decision: same("Remove direct exposure; model secure gateway/VPN, allowlists, backup and recovery requirements."),
      /* Source L184, first clause only. */
      citation: same("EPA and CISA guidance emphasizes direct PLC internet exposure as a concrete sector risk.")
    },
    {
      id: "dosing",
      title: same("Drinking-water chemical dosing manipulation"),
      pathway: same(
        "Path reaches chlorine, hypochlorite, fluoride, coagulant, pH, caustic, acid, or chemical-feed PLC/HMI."
      ),
      impact: same(
        "Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."
      ),
      decision: same(
        "Map control points and safety barriers; test restricted engineering access and segment chemical systems."
      ),
      citation: null
    },
    {
      id: "disinfection-visibility",
      title: same("Loss of disinfection visibility"),
      pathway: same("Compromise disrupts analyser data, SCADA alarms, historian, PLC/HMI, or communications."),
      impact: same(
        "Utility cannot confirm residual, turbidity, UV performance, or treatment state; may need boil-water or operational response."
      ),
      decision: same(
        "Identify required telemetry paths, fail-safe conditions, backup measurement and manual-operating actions."
      ),
      citation: null
    },
    {
      id: "lift-station",
      title: same("Wastewater lift-station outage"),
      pathway: same("Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated."),
      impact: same("Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting."),
      decision: same("Identify reachable field assets, power/telemetry dependencies, and safe fallback controls."),
      citation: null
    },
    {
      id: "aeration",
      title: same("Aeration-process disruption"),
      pathway: same("PLC/VFD/blower control, dissolved-oxygen loop, or plant HMI is altered."),
      impact: same(
        "Nitrification failure, elevated ammonia, biological-process upset, permit exceedance, prolonged recovery."
      ),
      decision: same("Test segmentation, control-lockdown, and fallback operating strategies."),
      citation: null
    },
    {
      id: "pressure-zone",
      title: same("Pump / pressure-zone manipulation"),
      pathway: same("Remote pump, VFD, PRV, valve, or pressure controller is affected."),
      impact: same(
        "Low pressure, tank overflow, pressure transient, service disruption, possible contamination ingress risk."
      ),
      decision: same("Model hydraulic and operational implications of control changes before implementation."),
      citation: null
    },
    {
      id: "ransomware",
      title: same("Ransomware in the SCADA/utility environment"),
      pathway: same(
        "Enterprise compromise reaches SCADA servers, historian, domain services, engineering workstations, file shares, or remote-access infrastructure."
      ),
      impact: same(
        "Loss of view/control, manual operation, delayed response, degraded coordination across multiple facilities."
      ),
      decision: same("Prioritize recovery dependencies and safe isolation steps."),
      citation: null
    },
    {
      id: "vendor",
      title: same("Vendor / integrator compromise"),
      pathway: same(
        "Vendor laptop, support portal, remote-maintenance tunnel, or system-integrator account reaches plant or field controls."
      ),
      impact: same(
        "Persistent unauthorized path, configuration changes, disrupted support, fleet-wide exposure across standardized assets."
      ),
      decision: same("Compare vendor-access architectures and contract/control requirements."),
      citation: null
    },
    {
      id: "storm",
      title: same("Storm, flood, or power outage plus cyber disruption"),
      pathway: same(
        "Weather event reduces staffing, power, fuel, and telecom reliability while a cyber incident affects OT visibility or control."
      ),
      impact: same("Compounded inability to pump, treat, monitor, communicate, or recover."),
      decision: same(
        "Model combined failure paths, manual workarounds, backup power, communications, and restoration priorities."
      ),
      citation: null
    },
    {
      id: "drift",
      title: same("Undocumented field-asset drift"),
      pathway: same(
        "Replacement RTU, modem, PLC, VFD, or radio configuration is changed during field maintenance without full documentation."
      ),
      impact: same(
        "Security model and operating assumptions become inaccurate; new remote route or unsafe configuration persists."
      ),
      decision: same("Detect model deltas and re-evaluate reachability and operational impact."),
      citation: null
    }
  ]
};
