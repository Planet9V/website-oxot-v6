/**
 * S06 · DEPENDENCY MAP — source L193–L284 of
 * new_material_source/1_website_layout_v4/3_industries/industry_hyperscale.md.
 *
 * THIS FILE OWNS THE SECTION FRAME, THE TOPOLOGY (L201–L213), AND THE THREE
 * EXTERNAL-INFRASTRUCTURE RECORDS — Energy (L215–L225), Water (L227–L237) and
 * Communications (L239–L247). The other three records — Commercial (L249–L258),
 * Defense and sovereign (L260–L271) and Manufacturing and supply chain
 * (L273–L284) — live in `content.dependency.commercial.ts`. The seam is the
 * source's own divide: the first three are the physical services a campus draws
 * from outside its fence, the second three are who and what the campus is
 * committed to. Split because this repository caps a file at 500 lines, along
 * the boundary the brief itself writes.
 *
 * `RECORD_IDS` AND `DependencyRecord` LIVE HERE AND THE SIBLING IMPORTS THEM,
 * never the reverse. The dependency runs one way so there is no module cycle:
 * the topology below points at all six records by id, including the three it
 * does not define, so the ids for all six must be declared in one place — this
 * one. A component composes the six in source order.
 *
 * THE SIX RECORDS KEEP SIX DIFFERENT SHAPES, DELIBERATELY. Energy is a
 * seven-item list. Water is a FIVE-ROW TABLE of cooling architectures with its
 * own two column headers. Communications is a five-item list. Commercial is a
 * six-item list. Defense carries an approved statement rendered as a quotation
 * above a four-item list. Manufacturing is a six-item list closing on a cited
 * BOM paragraph. Flattening all six into one uniform matrix would destroy the
 * asymmetry that carries the argument — Water is a COMPARISON of five cooling
 * architectures, and squeezing it into "one bullet cell" would delete the
 * comparison. `DependencyRecord` therefore has optional parts rather than one
 * fixed body, and each record fills exactly the parts the source gives it.
 *
 * NOTHING IS HIDDEN BEHIND A CLICK. The six records ARE this section's argument
 * — L197's headline is "The risk is often outside the data hall", and a tab
 * strip or accordion showing one record at a time would make the section assert
 * less than its own headline. L199's "clickable dependency map" is honoured
 * literally instead: the topology is a real in-page index whose node labels are
 * anchors down to the records, and every record renders in full at all times.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401, restated at page
 * level in `content.ts`): no percentage, money value, annual-loss figure,
 * numeric figure, "verified" wording or certification claim appears in this file
 * or its sibling. L262's own standing instruction is stricter still and is
 * carried in data — see `CLAIM_BOUNDARY` in `content.dependency.commercial.ts`.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass. See registry.ts's own doc comment.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── Section frame ──────────────────────────────────────────────────────── */

export const DEPENDENCY_SECTION = {
  id: "dependency-map",
  index: "06",
  /** The brief's own name for this section, L193. */
  datumLabel: same("Dependency map"),
  /** Source L197, the section headline, verbatim. */
  heading: same("The risk is often outside the data hall.")

  /* NO `lead`. L199 — "This section must explicitly connect data-center cyber
     risk to energy, water, communications, commercial customers, defense, and
     manufacturing/supply chain. It should be a clickable dependency map." — is a
     BUILD INSTRUCTION addressed to whoever builds the section, not a sentence
     for a visitor to read. It is carried below as `BUILD_NOTE` and must never be
     printed, the same treatment `content.ts` gives L46. Writing a lead sentence
     the brief does not state would be inventing page copy. */
};

/**
 * NOT VISITOR COPY — A BUILD INSTRUCTION, source L199, transcribed as the
 * instruction it is so that it can be checked against what was built rather than
 * paraphrased from memory. It must never be printed on the page.
 *
 * Both of its demands are met: the six domains it names each get a record
 * rendered in full, and the topology is genuinely clickable — its node labels
 * are in-page anchors, not decoration.
 */
export const BUILD_NOTE = same(
  "This section must explicitly connect data-center cyber risk to energy, water, communications, commercial customers, defense, and manufacturing/supply chain. It should be a clickable dependency map."
);

/* ── The six records: ids, declared once ────────────────────────────────── */

/**
 * Ids are page-global DOM identity AND the topology's anchor targets, so they
 * are prefixed and declared in one object rather than written twice as literals.
 * `content.dependency.commercial.ts` imports these; it does not redeclare them.
 */
export const RECORD_IDS = {
  energy: "dependency-energy",
  water: "dependency-water",
  communications: "dependency-communications",
  commercial: "dependency-commercial",
  defense: "dependency-defense",
  manufacturing: "dependency-manufacturing"
} as const;

export interface DependencyRecord {
  /** DOM id and anchor target. One of `RECORD_IDS`. */
  id: string;
  /** The source's own `###` heading for this record. */
  heading: Bilingual;
  /** The source's own sentence introducing whatever body follows. */
  lead?: Bilingual;
  /** An approved statement rendered verbatim as a real quotation. Defense only
   *  — see `content.dependency.commercial.ts` for why it is load-bearing. */
  quote?: Bilingual;
  /** A second lead sitting BELOW the quote, introducing the list. */
  listLead?: Bilingual;
  /** A comparison table. Water only. */
  table?: {
    head: readonly [Bilingual, Bilingual];
    rows: readonly (readonly [Bilingual, Bilingual])[];
  };
  items?: readonly Bilingual[];
  /** A closing paragraph carrying a citation. Manufacturing only. */
  closing?: {
    text: Bilingual;
    citation: { label: Bilingual; href: string };
  };
}

/* ── The topology (source L201–L213) ────────────────────────────────────── */

/**
 * THE SOURCE DRAWS A TRUNK, NOT A WHEEL, AND THE DRAWING IS REPRODUCED RATHER
 * THAN REGULARISED. L201–L213 is a fenced ASCII figure: one vertical run with
 * `Campus` near its top, lateral pairs hanging off it at three levels, and two
 * further nodes strung along the run below. It is not a symmetric ring of nine
 * spokes around a hub, and rearranging it into one would silently redraw the
 * brief's own picture. `RUNGS` below is that figure, rung by rung, in order.
 *
 * `tied` IS A REAL DISTINCTION IN THE SOURCE, NOT A STYLE CHOICE. The source
 * connects two of its lateral pairs to the trunk with its own rule characters —
 * `Water source ── Campus ── Telecom / carrier ecosystem` (L204) and
 * `Equipment manufacturers ──┼── Customer workload / service commitments`
 * (L208) — and leaves the third pair, `Fuel / generator supply` and `Cloud and
 * customer networks` (L206), floating either side of the run with no rule drawn
 * to it. That difference is preserved rather than tidied away.
 *
 * NINE NODES, SIX RECORDS — AND THE MAPPING IS THE BRIEF'S OWN, NOT INVENTED.
 * L199 states the six domains this section must connect risk to; every node
 * below is filed under the one of those six that develops it. Seven of the nine
 * are unambiguous. TWO ARE JUDGMENT CALLS AND ARE FLAGGED AS SUCH at the node:
 * `Cloud and customer networks` and `Construction / commissioning / maintenance
 * vendors`. The reasoning for each is stated where it is made.
 *
 * NO NODE IS RANKED, WEIGHTED, OR CALLED MORE CRITICAL THAN ANOTHER. The source
 * ranks none of them, states no direction of causation along its own rules, and
 * attaches no figure to any node. The drawing says adjacency and nothing more.
 */

/** The hub the source names at L204. */
export const CAMPUS = same("Campus");

export interface Spoke {
  /** The node's label, verbatim from the source's figure. */
  label: Bilingual;
  /** The record that develops this node, per L199's own six domains. */
  target: string;
}

export interface Rung {
  left?: Spoke;
  center?: Spoke;
  right?: Spoke;
  /** The `Campus` block itself stands on this rung. */
  hub?: boolean;
  /** The source draws its own rule from the lateral nodes into the trunk. */
  tied?: boolean;
}

export const RUNGS: readonly Rung[] = [
  {
    /** Source L202, standing on the trunk above the campus. */
    center: { label: same("Grid / utility operator"), target: RECORD_IDS.energy }
  },
  {
    /** Source L204, the campus rung, both laterals ruled into the trunk. */
    left: { label: same("Water source"), target: RECORD_IDS.water },
    hub: true,
    right: {
      label: same("Telecom / carrier ecosystem"),
      target: RECORD_IDS.communications
    },
    tied: true
  },
  {
    /** Source L206. Neither node is ruled to the trunk in the source. */
    left: { label: same("Fuel / generator supply"), target: RECORD_IDS.energy },
    right: {
      label: same("Cloud and customer networks"),
      /* JUDGMENT CALL, STATED RATHER THAN MADE SILENTLY. This node could be
         filed under commercial — L257 names "SaaS" and L256 "Service-provider
         dependency" — or under communications. It goes to communications
         because the node's own noun is NETWORKS, and the communications record
         is the one that develops network dependency: L244 names "cloud logging,
         remote-access brokers, and management platforms" and L247 "cross-
         connects, meet-me rooms, and optical transport equipment". The
         commercial record develops customer CONSEQUENCE, not the network, and
         the customer-commitment node on the next rung carries that side. */
      target: RECORD_IDS.communications
    }
  },
  {
    /** Source L208, the source's own cross — both laterals meet the trunk. */
    left: {
      label: same("Equipment manufacturers"),
      target: RECORD_IDS.manufacturing
    },
    right: {
      label: same("Customer workload / service commitments"),
      target: RECORD_IDS.commercial
    },
    tied: true
  },
  {
    /** Source L210, standing on the trunk. */
    center: {
      label: same("Construction / commissioning / maintenance vendors"),
      /* JUDGMENT CALL, STATED. Filed under manufacturing and supply chain
         because that record is where the source itself develops these vendors:
         L280 names "Field-service access, commissioning tools, contractor
         laptops, and maintenance contractors" and L282 "construction-schedule
         dependencies". No other record mentions them. */
      target: RECORD_IDS.manufacturing
    }
  },
  {
    /** Source L212, the foot of the trunk. */
    center: {
      label: same("Government / defense / sovereign workloads"),
      target: RECORD_IDS.defense
    }
  }
];

/**
 * CONTROL AFFORDANCES THE SOURCE DOES NOT STATE, WRITTEN HERE RATHER THAN
 * INLINE IN THE COMPONENT. The brief supplies a figure and an instruction to
 * make it clickable; it names no landmark, no caption and no hint. These four
 * strings are the minimum needed for the figure to be usable and announceable,
 * and each says only what is verifiably true of the drawing. None of them makes
 * a claim about a facility, and none invents a dependency the figure does not
 * draw. Same treatment `content.architecture.ts` gives its own selector label.
 */
export const HUB_CAPTION = same("Campus dependency map");
export const HUB_NAV_LABEL = same("Dependency map");
export const HUB_HINT = same(
  "Each node links to the dependency it belongs to. Every dependency is set out in full beneath the map."
);
/** Prefixed to each node link's accessible name so a screen-reader user hears
 *  where the link goes rather than a bare node name. The visible label is
 *  contained in the accessible name, per WCAG 2.5.3 Label in Name. */
export const HUB_LINK_SUFFIX = same("— go to");

/* ── Record 1 · Energy (source L215–L225) ───────────────────────────────── */

/**
 * Seven items, L219–L225, verbatim and in the source's own order. The last of
 * them, L225, is the sentence this whole page is built around — "Shared
 * electrical-control platforms that may create common-mode failure across A/B
 * paths" — and `Rule.tsx` cites it as one of the eight places the brief names
 * the A/B common-mode idea. It is not moved, promoted, or reworded.
 */
const ENERGY: DependencyRecord = {
  id: RECORD_IDS.energy,
  /** Source L215. */
  heading: same("Energy dependency"),
  /** Source L217. */
  lead: same(
    "A data center’s redundancy may protect against a localized power event, but a complete model must include:"
  ),
  items: [
    /** Source L219. */
    same("Utility feeder and substation dependency."),
    /** Source L220. */
    same("Transmission/distribution constraints and power-quality events."),
    /** Source L221. */
    same("Generator availability, fuel contracts, delivery routes, and refueling procedures."),
    /** Source L222. */
    same("Battery/UPS autonomy and controller dependencies."),
    /** Source L223. */
    same("Demand-response, curtailment, or grid-service commitments."),
    /** Source L224. */
    same("New-capacity interconnection timing."),
    /** Source L225. */
    same("Shared electrical-control platforms that may create common-mode failure across A/B paths.")
  ]
};

/* ── Record 2 · Water (source L227–L237) ────────────────────────────────── */

/**
 * THIS RECORD IS A TABLE BECAUSE THE SOURCE WROTE A TABLE, and what it holds is
 * a COMPARISON: five cooling architectures set against the dependency each one
 * creates. L229 states the point of it — "The model should distinguish cooling
 * architecture" — so the whole record turns on being able to read one row
 * against another. Collapsed into a bullet list, the five architectures would
 * still be present and the comparison would be gone; that is the one
 * transformation this record cannot survive, so it renders as real `<table>`
 * markup with the source's own two column headers.
 *
 * FIVE ROWS, L233–L237, verbatim in both columns, in the source's own order. No
 * row is marked preferred, cheaper, safer or more common than another — the
 * source ranks none of them and attaches no figure to any.
 */
const WATER: DependencyRecord = {
  id: RECORD_IDS.water,
  /** Source L227. */
  heading: same("Water dependency"),
  /** Source L229. */
  lead: same("The model should distinguish cooling architecture:"),
  table: {
    /** Source L231, the source's own two column headers. */
    head: [same("Cooling model"), same("Key dependency / cyber concern")],
    rows: [
      [
        /** Source L233. */
        same("Air-cooled / dry cooling"),
        same("Ambient-temperature exposure, fan/VFD controls, electrical consumption, capacity derating")
      ],
      [
        /** Source L234. */
        same("Evaporative cooling"),
        same("Water availability, treatment, water-quality sensors, valves, pumps, local water restrictions")
      ],
      [
        /** Source L235. */
        same("Water-cooled chiller plant"),
        same("Chilled/condenser-water control loops, cooling towers, makeup water, treatment chemistry, pump/VFD controls")
      ],
      [
        /** Source L236. */
        same("Direct-to-chip liquid cooling"),
        same("CDUs, leak detection, flow/temperature sensing, distribution manifolds, equipment compatibility, high-density load concentration")
      ],
      [
        /** Source L237. */
        same("District cooling / heat reuse"),
        same("Third-party thermal network, contracted service levels, pumps/heat exchangers, control interfaces, seasonal operation")
      ]
    ]
  }
};

/* ── Record 3 · Communications (source L239–L247) ───────────────────────── */

/**
 * Five items, L243–L247, verbatim and in the source's own order. L241's lead is
 * the record's whole argument — redundant carriers, shared dependency — and is
 * transcribed rather than summarised into the heading.
 */
const COMMUNICATIONS: DependencyRecord = {
  id: RECORD_IDS.communications,
  /** Source L239. */
  heading: same("Communications dependency"),
  /** Source L241. */
  lead: same("A hyperscale campus may have redundant carriers yet share dependency on:"),
  items: [
    /** Source L243. */
    same("Common physical routes, conduits, landing stations, metro rings, power feeds, or building entry points."),
    /** Source L244. */
    same("DNS, identity, NTP/PTP, cloud logging, remote-access brokers, and management platforms."),
    /** Source L245. */
    same("BMS/EPMS/DCIM telemetry links and OT jump hosts."),
    /** Source L246. */
    same("Network-device firmware, controller APIs, and automation pipelines."),
    /** Source L247. */
    same("Cross-connects, meet-me rooms, and optical transport equipment.")
  ]
};

/** The three external-infrastructure records, in the source's own order. The
 *  three commercial-and-mission records follow them from the sibling file; a
 *  consumer concatenates the two in that order to get the source's six. */
export const EXTERNAL_RECORDS: readonly DependencyRecord[] = [
  ENERGY,
  WATER,
  COMMUNICATIONS
];
