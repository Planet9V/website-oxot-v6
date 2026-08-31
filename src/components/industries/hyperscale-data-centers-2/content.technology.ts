/**
 * S04 · KEY TECHNOLOGY DOMAINS — source L178–L189 of
 * new_material_source/1_website_layout_v4/3_industries/industry_hyperscale.md.
 *
 * Split out of `content.ts` along the section boundary, the way that file's own
 * head comment says every body section on this page is split, because this
 * repository caps a file at 500 lines.
 *
 * THE SCOPE IS THE MATRIX AND NOTHING ELSE, AND THE BOUNDARY MATTERS BOTH WAYS.
 * `### Key technology domains` (L178) sits inside the same `##` block as the
 * facility architecture, but `Rule.tsx` lists "the facility architecture" and
 * "the technology index" as two distinct H-A bodies, so the eight rows below are
 * this section's and the seven-tier stack is not. The block's closing paragraph
 * at L191 — the passive-first fusion sentences and their citation — is likewise
 * NOT here: `content.architecture.ts` already transcribes it as `PASSIVE_FIRST`,
 * and taking it a second time would print it twice on one page.
 *
 * THE SECTION HEADER, AND WHY NEITHER STRING IS INVENTED. The source gives this
 * block no `### Section headline` of the kind sector reality and the scenario
 * register get — only the `###` title at L178 and the table's own column headers
 * at L180. So the h2 is L178 verbatim, and the datum label is the page's own
 * standing name for this body, "the technology index", which `Rule.tsx` L50
 * writes when it enumerates the H-A sections. Both are real strings; neither is
 * a sentence written to fill a slot. Same resolution rail-transportation-2's
 * architecture section records for its own missing headline.
 *
 * NO `lead`, AND THE SLOT IS EMPTY ON PURPOSE. Between L178 and the table the
 * source prints nothing at all — no framing sentence, no scope caveat, no
 * per-domain narrative. `SectionA`'s lead is optional and stays empty rather
 * than carrying prose this brief does not contain.
 *
 * AND NO PER-DOMAIN NOTE, WHICH IS THE ONE PLACE THIS DEPARTS FROM
 * manufacturing-process-2's version of this section. That page gives each of its
 * five categories a sentence naming the capability that consumes it, because its
 * own brief states those capabilities at L255–L260 and each note paraphrases a
 * row that is already on that page. This brief states no such per-domain
 * consequence anywhere: a row here is a domain name and a list of examples, and
 * nothing else. Writing eight notes would mean inventing eight engineering
 * claims and dressing them as transcription. What each panel gets instead is the
 * source's own column header, `EXAMPLES_CAPTION` below — which is load-bearing
 * rather than decorative, because "examples" is the source's own word and the
 * lists are therefore explicitly not an exhaustive inventory of any facility.
 *
 * TRANSCRIPTION RULE: every domain name and every term below is the source's own
 * string, in the source's own order, grouped exactly as the source's eight rows
 * group them. The comma separators inside a table cell become array boundaries
 * and nothing else. Nothing is added, reordered within a row, renamed, split or
 * merged — "condenser/chilled-water pumps", "CMMS/EAM", "Modbus TCP/RTU" and
 * "MOP/SOP/EOP documents" each stay the single term the source writes them as,
 * rather than being expanded into two.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401, and `content.ts`'s
 * page-level restatement): NOT ONE NUMERIC FIGURE APPEARS IN THIS FILE. No
 * percentage, money value, annual-loss figure, "verified" wording or
 * certification claim either. "PUE", "WUE", "IT load" and "total facility
 * energy" appear as the source's own metric NAMES in the sustainability row;
 * none carries a value, and none is presented as an outcome OXOT achieves.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass, and is not a claim that this text is correct Dutch. Domain
 * names are prose and are typed `Bilingual`. The terms are equipment, platform,
 * protocol, document and metric names — proper nouns and acronyms, not prose —
 * so they are plain strings, the same split `content.architecture.ts` makes for
 * its tier element lists and every other industry file makes for its own.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const TECH_SECTION = {
  id: "technology",
  /** The section's ordinal on the page — a fact about the page, not the campus. */
  index: "04",
  /** `Rule.tsx` L50's own name for this body. See this file's head comment. */
  datumLabel: same("Technology index"),
  /** Source L178, verbatim. */
  heading: same("Key technology domains")
};

/* ── The control ────────────────────────────────────────────────────────── */

/**
 * Sits with the tabs. States what the control does and what the visitor is
 * looking at, so the seven unopened domains read as available rather than
 * withheld — the same duty `content.architecture.ts`'s `LAYER_NOTE` discharges
 * for the layer selector one section above.
 *
 * It names the shape of the transcription (eight domains, one at a time, the
 * source's own grouping) and no engineering claim. Any count it implies is a
 * fact about this page's own content, not facility data.
 */
export const INDEX_NOTE = same(
  "Eight domains, named and grouped as the source groups them. One domain's examples are shown at a time; use the tabs or the arrow keys to move between them."
);

/** Source L180, the table's own second column header. Captions each panel's
 *  list — the source calls these examples, so the page must not present them as
 *  a complete inventory of any facility. */
export const EXAMPLES_CAPTION = same("Hyperscale examples");

/* ── The matrix (source L180–L189) ──────────────────────────────────────── */

/** One row of the source's table: a domain, and that domain's own examples. */
export interface TechDomain {
  id: string;
  /** The source's own domain name, from the table's first column. */
  name: Bilingual;
  /** The source's own examples, in the source's own order. */
  terms: readonly string[];
}

/** Eight domains, in the source's own row order. */
export const TECH_DOMAINS: readonly TechDomain[] = [
  {
    id: "electrical-ot",
    /** Source L182. */
    name: same("Electrical OT"),
    terms: [
      "Medium-voltage switchgear",
      "protection relays",
      "generator controllers",
      "paralleling switchgear",
      "automatic transfer switches",
      "UPS controllers",
      "battery-management systems",
      "PDUs",
      "intelligent rack PDUs",
      "branch-circuit monitoring"
    ]
  },
  {
    id: "mechanical-ot",
    /** Source L183. */
    name: same("Mechanical OT"),
    terms: [
      "Chiller controllers",
      "cooling-tower PLCs",
      "condenser/chilled-water pumps",
      "VFDs",
      "CRAH/CRAC controls",
      "CDU controls",
      "valve actuators",
      "leak detection",
      "water-treatment skids",
      "thermal sensors"
    ]
  },
  {
    id: "facility-platforms",
    /** Source L184. */
    name: same("Facility platforms"),
    terms: [
      "BMS/BAS",
      "EPMS",
      "DCIM",
      "electrical power-quality monitoring",
      "historian",
      "alarm management",
      "CMMS/EAM",
      "building analytics",
      "digital commissioning systems"
    ]
  },
  {
    id: "ot-communications",
    /** Source L185. */
    name: same("OT communications"),
    terms: [
      "BACnet/IP",
      "BACnet MS/TP",
      "Modbus TCP/RTU",
      "SNMP",
      "OPC UA",
      "MQTT",
      "EtherNet/IP",
      "PROFINET",
      "vendor fieldbus/serial protocols",
      "industrial Ethernet"
    ]
  },
  {
    id: "it-cloud-dependency",
    /** Source L186. */
    name: same("IT / cloud dependency"),
    terms: [
      "Corporate identity",
      "privileged access management",
      "remote-access brokers",
      "NTP/PTP",
      "SIEM/SOC",
      "cloud monitoring",
      "API gateways",
      "configuration management",
      "OOB management",
      "virtual desktops"
    ]
  },
  {
    id: "operational-evidence",
    /** Source L187. */
    name: same("Operational evidence"),
    terms: [
      "Single-line diagrams",
      "protection-coordination studies",
      "selectivity/arc-flash studies",
      "load flow",
      "generator/UPS autonomy calculations",
      "MOP/SOP/EOP documents",
      "sequence-of-operations narratives",
      "commissioning scripts",
      "maintenance records",
      "capacity and redundancy calculations"
    ]
  },
  {
    id: "supply-chain-evidence",
    /** Source L188. */
    name: same("Supply-chain evidence"),
    terms: [
      "SBOM",
      "HBOM",
      "CBOM",
      "firmware images",
      "controller/PLC models",
      "vendor support contracts",
      "spare inventory",
      "critical lead times",
      "maintenance windows",
      "field-service dependencies"
    ]
  },
  {
    id: "sustainability-evidence",
    /** Source L189. These are the source's own metric NAMES. Not one carries a
     *  value here, and none is presented as an outcome OXOT delivers. */
    name: same("Sustainability evidence"),
    terms: [
      "IT load",
      "total facility energy",
      "PUE",
      "WUE",
      "water source/use",
      "heat reuse",
      "renewable-energy factor",
      "grid-service participation",
      "cooling strategy",
      "capacity utilization"
    ]
  }
];
