/**
 * IEC 62443 — the data behind the drawn figures.
 *
 * The source document renders each of these as an ASCII `text` block. None
 * is reprinted as preformatted text: a fixed-width drawing does not reflow
 * on a phone, does not read in order to a screen reader, and cannot be
 * restyled by the theme. Carried as structured data instead, so
 * zone-stack.tsx and figures.tsx can build the same structure out of real
 * elements.
 *
 * Third of the three content modules — prose in ./content.ts, tables in
 * ./content-tables.ts, figures here — so none of them passes 500 lines.
 */
import { same } from "@/components/industries/registry";

/**
 * §3 — the evidence pipeline: what goes in, what it becomes, what comes
 * out. Three bands; the middle one is OXOT's, the outer two are the
 * customer's evidence arriving and leaving.
 */
export const PIPELINE_BANDS = [
  {
    role: same("Input"),
    label: same("Engineering and operational evidence"),
    items: [
      same("P&IDs"),
      same("Process diagrams"),
      same("FMECA"),
      same("SCIL / safety evidence"),
      same("Asset inventories"),
      same("PLC logic"),
      same("SCADA / HMI configuration"),
      same("Network diagrams"),
      same("Topology exports"),
      same("Firewall rules"),
      same("PCAP flows"),
      same("Maintenance records"),
      same("Supplier data"),
      same("Operating procedures")
    ]
  },
  {
    role: same("Model"),
    label: same("OXOT Cyber Digital Twin"),
    items: [
      same("Facility"),
      same("Assets"),
      same("Network state"),
      same("Dependencies"),
      same("Controls"),
      same("Zones"),
      same("Conduits"),
      same("Pathways"),
      same("Operational consequence")
    ]
  },
  {
    role: same("Output"),
    label: same("IEC 62443 assurance evidence"),
    items: [
      same("System definition"),
      same("Zone / conduit views"),
      same("Risk rationale"),
      same("SL-T support"),
      same("Treatment decisions"),
      same("Control validation"),
      same("Technical documentation"),
      same("Change history")
    ]
  }
] as const;

/**
 * §5 — the zone stack, read top to bottom.
 *
 * `purdue` is the level the zone conventionally maps to. `conduit` is the
 * channel to the zone BELOW it, so the last entry has none and the stack
 * terminates at the process rather than trailing off.
 */
export const ZONE_STACK = [
  {
    zone: same("Enterprise zone"),
    purdue: "L4",
    detail: same("Business systems, ERP, corporate identity, enterprise network"),
    conduit: same("Business data · identity · managed egress")
  },
  {
    zone: same("Operational DMZ"),
    purdue: "L3.5",
    detail: same("Brokered services, jump hosts, replicated historian, vendor access"),
    conduit: same("Brokered sessions · replicated historian data")
  },
  {
    zone: same("Operations management zone"),
    purdue: "L3",
    detail: same("Historian, engineering workstations, asset management, patch services"),
    conduit: same("Engineering access · configuration · supervisory data")
  },
  {
    zone: same("Control zone"),
    purdue: "L2 / L1",
    detail: same("SCADA, HMI, PLC, DCS, RTU, control networks"),
    conduit: same("Control and supervisory protocols · alarm and time services")
  },
  {
    zone: same("Safety or critical-control zone"),
    purdue: "L1",
    detail: same("Safety-instrumented systems, protection functions, critical controllers"),
    conduit: same("Read-only status · strictly controlled maintenance access")
  },
  {
    zone: same("Field-device zone"),
    purdue: "L0",
    detail: same("Sensors, actuators, valves, transmitters, field instrumentation"),
    conduit: null
  }
] as const;

/**
 * §7 — the seven foundational requirements, in vector order.
 *
 * `abbr` is the element label in the drawn vector and repeats as the row
 * marker in SLT_OBJECTIVE_ROWS, so a reader can carry a position from the
 * figure into the table.
 */
export const FR_VECTOR = [
  { abbr: "IAC", name: same("Identification and Authentication Control") },
  { abbr: "UC", name: same("Use Control") },
  { abbr: "SI", name: same("System Integrity") },
  { abbr: "DC", name: same("Data Confidentiality") },
  { abbr: "RDF", name: same("Restricted Data Flow") },
  { abbr: "TRE", name: same("Timely Response to Events") },
  { abbr: "RA", name: same("Resource Availability") }
] as const;
