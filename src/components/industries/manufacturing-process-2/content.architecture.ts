/**
 * S02 · TYPICAL OT ENVIRONMENT — source L102–L140 of
 * new_material_source/1_website_layout_v4/3_industries/industry_manu-process.md.
 *
 * Split out of `content.ts` along the section boundary, the same way the water
 * and energy pages split theirs: `content.ts` is already near this repository's
 * 500-line cap, and a reader looking for the architecture section should have
 * one file to open. Every string below carries the source line it came from.
 *
 * ONE STACK, NOT A SEGMENTED ONE. The energy brief asks for five selectable
 * segments and supplies one stack, which forces that page to say out loud which
 * tiers are inert. This brief asks for no segmentation at all: L112 heads the
 * block "Common architecture" and L114–132 supplies exactly six tiers for the
 * whole sector. So the stack here is static. Adding a selector that redrew the
 * same six tiers would be the animated-skeleton failure — a control that looks
 * like it did something — with no source behind it.
 *
 * NO PURDUE LEVEL NUMBERS ARE PRINTED. The six tier names at L115/118/121/124/
 * 127/130 are the source's own; it assigns none of them a Purdue level, and
 * "Purdue/zone definitions" appears at L138 only as an ingested DATA SOURCE.
 * Numbering the tiers L4…L0 on the drawing would print an engineering fact this
 * brief does not state.
 *
 * NO TIER IS GIVEN VISUAL PRECEDENCE OVER THE OTHERS, including "Safety and
 * critical control". The page's Operational reality section does cite IEC 61511
 * (source L87), but that is a statement about safety-instrumented systems'
 * lifecycle, not a statement that this tier outranks the other five in this
 * drawing. The source draws six equal blocks; so does the page.
 *
 * WHY THE TECHNOLOGY INDEX CARRIES NO PER-TERM GLOSS. The water page's
 * equivalent index writes a short clause beside every term, because a bare chip
 * reading "DNP3" carries exactly the information already in the word "DNP3".
 * That reasoning does not transfer here, and copying it would have cost 42
 * invented clauses: this brief states no per-term consequence anywhere, and the
 * capability rows it does state (L255–L260) are written at CATEGORY level —
 * "Engineering consequence fusion", "OT asset and logic mapping", "Purdue and
 * network-state model". So the grounded unit is the category, and each of the
 * five carries one sourced `note` naming the capability that consumes it, above
 * a plain list of the source's own terms. Protocols gets the source's own
 * caveat instead, because no capability on this page is stated at protocol
 * level — the same finding the water page reached about its own protocol area.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass, and is not a claim that this text is correct Dutch.
 * Equipment and product names — "DCS", "OPC UA", "FMECA" — are not prose and
 * are typed as plain strings, the same split the water page's architecture
 * content already makes.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const ARCH_SECTION = {
  id: "architecture",
  /** The section's ordinal on the page — a fact about the page, not the plant. */
  index: "02",
  /** Source L102, the brief's own section name. */
  datumLabel: same("Typical OT environment"),
  /** Source L106. */
  heading: same("Model the plant as it operates—not as a flat asset inventory."),
  /** Source L110, transcribed whole. */
  lead: same(
    "A manufacturing site normally contains several overlapping realities: the process itself; automation and safety systems; OT networks; production and quality data; engineering change records; and business systems that schedule, support, or maintain the plant. The Cyber Digital Twin combines those realities into one environment so teams can see whether a cyber pathway can actually reach an outcome that matters."
  )
};

/* ── The stack (source L112–L132) ───────────────────────────────────────── */

export interface Tier {
  id: string;
  /** The source's own tier name. */
  name: Bilingual;
  /** The source's own element list for that tier, in the source's own order. */
  elements: readonly string[];
}

/** Source L112, the brief's own name for the drawing below. */
export const STACK_CAPTION = same("Common architecture");

/**
 * Six tiers, top to bottom, exactly as the source's code block draws them. No
 * element is added, dropped, reordered or re-spelled; the `•` separators in the
 * source become array boundaries and nothing else.
 */
export const TIERS: readonly Tier[] = [
  {
    id: "enterprise",
    /** Source L115–116. */
    name: same("Enterprise / IT"),
    elements: ["ERP", "Procurement", "Corporate identity", "Remote-access governance"]
  },
  {
    id: "dmz",
    /** Source L118–119. */
    name: same("Industrial DMZ"),
    elements: ["Jump hosts", "Patch repositories", "Data transfer", "Security services"]
  },
  {
    id: "operations",
    /** Source L121–122. */
    name: same("Operations management"),
    elements: ["MES", "Batch systems", "Historians", "Engineering workstations"]
  },
  {
    id: "control",
    /** Source L124–125. */
    name: same("Control"),
    elements: ["DCS", "PLCs", "SCADA", "HMIs", "Remote I/O", "Industrial switches"]
  },
  {
    id: "safety",
    /** Source L127–128. */
    name: same("Safety and critical control"),
    elements: ["SIS", "Safety PLCs", "Critical interlocks", "Burner/furnace protection"]
  },
  {
    id: "field",
    /** Source L130–131. */
    name: same("Field and process"),
    elements: [
      "Sensors",
      "Valves",
      "Drives",
      "Motors",
      "Pumps",
      "Furnaces",
      "Reactors",
      "Packaging"
    ]
  }
];

/* ── Technology and data sources (source L134–L140) ─────────────────────── */

export interface TechCategory {
  id: string;
  /** The source's own category name, as the bullet bolds it. */
  name: Bilingual;
  /**
   * One sourced sentence naming what this category feeds. Every one of the five
   * paraphrases a capability row the page already states at L255–L260, or — for
   * protocols — the source's own trailing caveat at L140. None introduces a
   * claim that is not already on this page.
   */
  note: Bilingual;
  /** The source's own terms, in the source's own order. */
  terms: readonly string[];
}

/** Source L134, the brief's own heading for this list. */
export const TECH_CAPTION = same("Typical technology and data sources");

export const TECH_CATEGORIES: readonly TechCategory[] = [
  {
    id: "engineering",
    /** Source L136. */
    name: same("Engineering"),
    /** Paraphrases the "Engineering consequence fusion" capability, L258. */
    note: same(
      "Feeds engineering consequence fusion: hazard, safety, reliability and operational evidence, rather than an invented security-layer impact estimate."
    ),
    terms: [
      "P&IDs",
      "Line lists",
      "Equipment data",
      "FMECA",
      "HAZOP/hazard logs",
      "SIL/SCIL information",
      "Reliability-critical lists",
      "Operating envelopes",
      "Minimum-operating requirements",
      "Downtime curves"
    ]
  },
  {
    id: "automation",
    /** Source L137. */
    name: same("Automation"),
    /** Paraphrases the "OT asset and logic mapping" capability, L256. */
    note: same(
      "Feeds OT asset and logic mapping: controllers, HMI/SCADA/DCS assets, configuration and relevant control logic, connected to the process functions they serve."
    ),
    terms: [
      "PLC ladder logic and structured text",
      "DCS configuration",
      "SCADA/HMI projects",
      "RTU configuration",
      "Alarm/interlock logic",
      "Safety-system information",
      "Engineering-workstation exports"
    ]
  },
  {
    id: "ot-network",
    /** Source L138. */
    name: same("OT network"),
    /** Paraphrases the "Purdue and network-state model" capability, L257. */
    note: same(
      "Feeds the Purdue and network-state model: zones, conduits, remote access, VLANs, subnets, virtual firewalls and actual reachability."
    ),
    terms: [
      "Switches",
      "Firewalls",
      "VLANs",
      "Routing",
      "Remote-access paths",
      "Topology exports",
      "Passive packet captures",
      "Purdue/zone definitions"
    ]
  },
  {
    id: "operations-enterprise",
    /** Source L139. */
    name: same("Operations and enterprise"),
    /** Paraphrases the supplier/external-pressure capability, L259, together
     *  with the facility and process model's operational boundaries, L255. */
    note: same(
      "Supplies the operational and supplier context decisions are enriched with — the production, maintenance, identity and supply records that say how the plant is actually run, and by whom."
    ),
    terms: [
      "Historians",
      "MES",
      "CMMS/EAM",
      "Asset management",
      "Service management",
      "Identity",
      "Supplier records",
      "BOMs",
      "Maintenance workflows"
    ]
  },
  {
    id: "protocols",
    /** Source L140. */
    name: same("Protocols"),
    /* No capability row at L255–L260 names a protocol, so this note is the
       source's own trailing qualifier at L140 rather than a manufactured
       consequence claim. */
    note: same("Which of these appear depends on the process and the vendor environment."),
    terms: [
      "OPC UA",
      "Modbus TCP",
      "EtherNet/IP",
      "PROFINET",
      "DNP3",
      "BACnet",
      "MQTT",
      "TCP/IP"
    ]
  }
];
