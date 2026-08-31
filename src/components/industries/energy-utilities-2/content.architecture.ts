/**
 * S02 · TYPICAL OT ARCHITECTURE — source L90–L129 of
 * new_material_source/1_website_layout_v4/3_industries/industry_energy.md.
 *
 * Split out of `content.ts` along the section boundary, the same way the water
 * page splits its own architecture slice: `content.ts` is already near this
 * repository's 500-line cap and a reader looking for the architecture section
 * should have one file to open.
 *
 * WHAT THE SOURCE ACTUALLY SUPPLIES, AND WHAT IT DOES NOT.
 * L96 asks for five selectable segments — Generation, Transmission &
 * Distribution, Renewables & Storage, Gas / Hydrogen, District Energy — but
 * L100–116 supplies exactly ONE architecture stack, not five. There is no
 * second stack anywhere in the brief. So the honest construction is:
 *
 *   • The upper four tiers (L101–111) are drawn once and do not change with the
 *     selection, because the source states one set of them for the whole
 *     sector. `COMMON_TIER_NOTE` says so on the page rather than leaving the
 *     visitor to discover that four fifths of the diagram is inert.
 *   • Only the field tier (L113–115) is partitioned per segment, and that is a
 *     GROUPING of the source's own thirteen equipment terms — not a new list.
 *     Every term at L114–115 appears under at least one segment, no term
 *     appears that is not at L114–115, and a term that genuinely belongs to
 *     more than one segment is shown under each rather than arbitrarily
 *     assigned to one.
 *
 * TWO TERMS THAT LOOK LIKE THEY BELONG HERE AND DO NOT. "Boilers" appears
 * nowhere in L100–116, and "inverters" appears only at L111 as part of
 * "turbine/inverter controls" — a CONTROL system in the fourth tier, not a
 * field asset in the fifth. Neither is added to the field tier; putting them
 * there would be an invented asset inventory dressed as a transcription.
 *
 * L129's integration-model sentence ends with an unresolved citation marker in
 * the source. It is transcribed WITHOUT a citation link, because the document
 * it points at is not named. The two markers that DO resolve (L170, L258) are
 * handled in `content.ts` and have nothing to do with this section.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const ARCH_SECTION = {
  id: "architecture",
  /** The section's ordinal on the page — a fact about the page, not the grid. */
  index: "02",
  /** Source L90, the brief's own section name. */
  datumLabel: same("Typical OT architecture"),
  /** Source L94. */
  heading: same("See the energy system, its controls, and its dependencies in one model.")
};

/* ── The five segments (source L96) ─────────────────────────────────────── */

export interface Segment {
  id: string;
  label: Bilingual;
}

export const SEGMENTS: readonly Segment[] = [
  { id: "generation", label: same("Generation") },
  { id: "transmission", label: same("Transmission & Distribution") },
  { id: "renewables", label: same("Renewables & Storage") },
  { id: "gas", label: same("Gas / Hydrogen") },
  { id: "district", label: same("District Energy") }
];

export const DEFAULT_SEGMENT = SEGMENTS[0].id;

/* ── The stack (source L100–116) ────────────────────────────────────────── */

/**
 * One tier of the stack. `items` are equipment and system names, so they are
 * plain strings rather than `Bilingual` — the same split the water page's
 * architecture content makes. Tier NAMES are prose and are translated.
 */
export interface Tier {
  id: string;
  name: Bilingual;
  items: readonly string[];
}

/** L101–111. Drawn once; identical under every segment selection. */
export const COMMON_TIERS: readonly Tier[] = [
  {
    id: "enterprise",
    name: same("Enterprise and market systems"),
    items: ["ERP", "identity", "procurement", "trading", "billing", "analytics"]
  },
  {
    id: "dmz",
    name: same("Operational DMZ"),
    items: ["Jump hosts", "data brokers", "patching", "remote-support gateways", "SOC tooling"]
  },
  {
    id: "control-center",
    name: same("Control center / plant operations"),
    items: ["EMS", "ADMS", "DMS", "SCADA", "historians", "outage management", "engineering tools"]
  },
  {
    id: "control-protection",
    name: same("Control and protection"),
    items: ["DCS", "PLCs", "RTUs", "IEDs", "relays", "HMIs", "turbine/inverter controls"]
  }
];

/** L113 — the tier name the segment selection acts on. */
export const FIELD_TIER_NAME = same("Field / physical assets");

/**
 * L114–115, grouped by segment. Coverage is deliberate and checkable: the
 * source's thirteen terms are Generators, transformers, switchgear, feeders,
 * turbines, batteries, Pumps, compressors, valves, substations, meters,
 * sensors, actuators — and every one of them appears below.
 *
 * Sensors and actuators appear under all five because they are the field
 * instrumentation every segment carries; showing them under one segment only
 * would imply the other four have none.
 */
export const FIELD_ASSETS_BY_SEGMENT: Record<string, readonly string[]> = {
  generation: ["Generators", "turbines", "compressors", "valves", "sensors", "actuators"],
  transmission: ["transformers", "switchgear", "feeders", "substations", "meters", "sensors", "actuators"],
  renewables: ["batteries", "turbines", "sensors", "actuators"],
  gas: ["compressors", "valves", "meters", "sensors", "actuators"],
  district: ["Pumps", "valves", "meters", "sensors", "actuators"]
};

export const SELECTOR_LABEL = same("Select an energy segment");

/**
 * Stated on the page, not left implicit. The brief supplies one stack for five
 * segments; the visitor is told that directly rather than being shown four
 * tiers that silently ignore the control they just used.
 */
export const COMMON_TIER_NOTE = same(
  "The upper four tiers are common to all five segments. Selecting a segment changes the field tier only."
);

/** Rendered under the canvas as the selected-state summary. */
export const FIELD_SUMMARY_CAPTION = same("Field / physical assets shown for");

/* ── Typical technology and data sources (source L118–127) ──────────────── */

export interface TechRow {
  domain: Bilingual;
  examples: Bilingual;
}

export const TECH_TABLE = {
  /** Source L118, used as the block's own caption. */
  caption: same("Typical technology and data sources"),
  /** Source L120. */
  head: [same("Information domain"), same("Examples")] as const,
  /** Source L122–127, verbatim, in the source's own order. */
  rows: [
    {
      domain: same("Engineering and operational evidence"),
      examples: same(
        "Single-line diagrams, P&IDs, protection studies, load-flow studies, FMECA, HAZOP/hazard registers, criticality ratings, outage and restoration procedures"
      )
    },
    {
      domain: same("Control and automation"),
      examples: same(
        "SCADA configurations, EMS/DMS/ADMS data, DCS/PLC logic, RTU and IED configurations, relay settings, HMI projects, alarm and event records"
      )
    },
    {
      domain: same("OT network and communications"),
      examples: same(
        "Network diagrams, substation LAN/WAN paths, firewalls, VLANs, remote-access paths, serial/Ethernet gateways, topology exports, passive traffic data"
      )
    },
    {
      domain: same("Field and asset information"),
      examples: same(
        "Asset inventories, firmware and configuration versions, maintenance records, work orders, lifecycle data, spares and supplier dependencies"
      )
    },
    {
      domain: same("Business and market dependency"),
      examples: same(
        "Dispatch and balancing processes, market interfaces, vendor contracts, critical-service dependencies, outage-cost and restoration assumptions"
      )
    },
    {
      domain: same("Protocols"),
      examples: same(
        "IEC 61850, DNP3, IEC 60870-5-101/104, Modbus, OPC UA, ICCP/TASE.2, MQTT, PROFINET, EtherNet/IP, and TCP/IP, depending on the segment and asset class"
      )
    }
  ] as readonly TechRow[]
};

/**
 * Source L129, transcribed as written. The source's trailing citation marker
 * resolves the same way `content.ts`'s L170/L258 markers do — via
 * `PATHS.technicalSpecification`, the real live page carrying this material
 * (owner-confirmed source: "OXOT CDT Product Specification V2.pdf", which has
 * no public URL of its own). CORRECTION, same day: an earlier build-wave
 * instruction said only L170/L258 resolve and told this file to leave L129
 * uncited — that was inconsistent with the actual accepted gap-3 resolution,
 * which covers all four dangling markers (L129, L155, L170, L258) alike.
 * Fixed here rather than left standing.
 */
export const INTEGRATION_MODEL = same(
  "OXOT's stated integration model includes engineering drawings, asset and control-system data, topology and packet-flow information, industrial protocols, CycloneDX BOMs, asset management, historians, network monitoring, and service-management systems."
);

/** Same citation shape as `content.ts`'s `DECISIONS.citation`/`CAPABILITIES.citation`. */
export const INTEGRATION_MODEL_CITATION = same("See the Technical Specification");
