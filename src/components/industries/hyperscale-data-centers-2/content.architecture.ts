/**
 * S03 · TYPICAL HYPERSCALE ARCHITECTURE — source L138–L191 of
 * new_material_source/1_website_layout_v4/3_industries/industry_hyperscale.md.
 *
 * Split out of `content.ts` along the section boundary, the way that file's own
 * head comment says every body section on this page is split: `content.ts` is
 * the shared/top-level slice, and each section owns a sibling
 * `content.<section>.ts` because this repository caps a file at 500 lines.
 *
 * WHAT THIS FILE OWNS, AND WHAT IT DELIBERATELY DOES NOT. The source's
 * `## Typical hyperscale architecture` block runs L138–L191 and contains three
 * things: the section headline (L142), the seven-tier physical and operational
 * stack (L146–L176), and the closing passive-first paragraph (L191). All three
 * are here. The `### Key technology domains` matrix at L178–L189 sits inside the
 * same `##` block but is a SEPARATE SECTION on this page — `Rule.tsx` lists
 * "the technology index" and "the facility architecture" as two distinct H-A
 * bodies — so its eight rows are not transcribed here and must not be duplicated
 * into this file.
 *
 * WHAT "SELECTABLE LAYERS" MEANS HERE, RESOLVED. L144 asks for "a large
 * interactive architecture graphic with selectable layers". The source supplies
 * ONE stack of seven tiers (L149–L175) — not two alternative stacks. So this is
 * not the rail page's shape, where a two-way segment toggle swaps one complete
 * six-tier architecture for a different complete six-tier architecture. Here the
 * selection moves WITHIN one stack: exactly one of the seven layers is in force
 * at a time, and the drawing marks it and the joins either side of it.
 *
 * AND THE SELECTION EMPHASISES RATHER THAN REVEALS, WHICH IS THE HONEST
 * BEHAVIOUR GIVEN WHAT THE SOURCE SUPPLIES. The source states no per-layer
 * consequence, no per-layer narrative, and no per-layer figure — a tier is a
 * name and an element list, and nothing else. A control that hid six layers'
 * contents so the seventh could "expand" would put the source's own material
 * behind an interaction and give the visitor less than the plain drawing does;
 * a control that swapped in per-layer prose would have to invent that prose.
 * Every layer's full element list is therefore rendered at all times, and what
 * the selection changes is emphasis and the stated position in the run. Nothing
 * on this diagram is behind hover.
 *
 * SEVEN TIERS, IN THE SOURCE'S OWN ORDER, AND THE ORDER IS ITSELF THE SOURCE'S
 * CLAIM. L142 frames the whole section as "from utility interconnect to workload
 * consequence", and the code fence draws the seven tiers joined top to bottom by
 * its own vertical runs. `above` / `below` language on the page therefore
 * describes the drawing, which is a real fact about the source. No directed
 * dependency semantics are asserted beyond that adjacency, no Purdue level
 * number is printed against any tier, and no tier is called more critical than
 * another — the source ranks none of them.
 *
 * TRANSCRIPTION RULE: every tier name and every element below is the source's
 * own string. `rows` preserves the source's own line breaks inside a tier —
 * each of the seven tiers prints its elements across exactly two lines
 * (L150–151, L154–155, L158–159, L162–163, L166–167, L170–171, L174–175), and
 * in every case the second line is a coherent group rather than an arbitrary
 * wrap: water and telecom beside the grid; generation and storage beside the
 * intake; rack-level distribution beside the UPS plant; liquid cooling beside
 * the chiller plant; the historian and workstation platforms beside the
 * controllers; compute and transport beside the networks; commitments and
 * workloads beside the zones. That grouping is kept rather than flattened. This
 * is the same convention rail-transportation-2/content.architecture.ts
 * documents. Nothing is added, reordered within a line, or renamed; the bullet
 * separators in the source become array boundaries and nothing else.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401, and `content.ts`'s
 * own page-level restatement): NOT ONE NUMERIC FIGURE APPEARS IN THIS FILE. The
 * 500 kW EU reporting threshold and the 48 MW illustrative campus belong to
 * other sections of this page and are absent here. No percentage, money value,
 * annual-loss figure, "verified" wording or certification claim appears either.
 * L191's paragraph is transcribed in the source's own framing and is NOT
 * generalised into a broader OXOT capability claim.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass, and is not a claim that this text is correct Dutch. Tier
 * NAMES are prose and are translated. Equipment, platform and protocol names —
 * "BESS", "CRAH/CRAC", "EPMS", "AI/GPU clusters" — are not prose and are typed
 * as plain strings, the same split every other industry architecture file makes.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Section header ─────────────────────────────────────────────────────── */

export const ARCH_SECTION = {
  id: "architecture",
  /** The section's ordinal on the page — a fact about the page, not the campus. */
  index: "03",
  /** Source L138, the brief's own name for this section. */
  datumLabel: same("Typical hyperscale architecture"),
  /** Source L142, verbatim. */
  heading: same("Model the facility from utility interconnect to workload consequence.")

  /* NO `lead` ON THIS SECTION, AND THE SLOT IS EMPTY ON PURPOSE. The only prose
     the source places between the headline and the stack is L144 — "Use a large
     interactive architecture graphic with selectable layers. This is where the
     website can be much more sophisticated than the other industry pages." That
     is a BUILD INSTRUCTION addressed to whoever builds this page, not copy
     addressed to a visitor, and printing it would tell a reader how the page was
     commissioned. It is honoured as the section's shape (see `BUILD_NOTE`
     below) rather than rendered. Writing a lead sentence the source does not
     contain purely to fill `SectionA`'s optional slot would be an invented
     claim. */
};

/**
 * NOT VISITOR COPY — A BUILD INSTRUCTION, source L144, transcribed as the
 * instruction it is so the requirement is legible to whoever maintains this
 * section rather than living only in a commit message. It must never be printed
 * on the page. Same treatment `content.ts` gives `MODEL.buildNote` (source L46).
 */
export const BUILD_NOTE = same(
  "Use a large interactive architecture graphic with selectable layers. This is where the website can be much more sophisticated than the other industry pages."
);

/* ── The layer control ──────────────────────────────────────────────────── */

/** The radiogroup's accessible name. The source specifies no wording for the
 *  control, so this names the control's function rather than borrowing prose
 *  that means something else. */
export const LAYER_SELECTOR_LABEL = same("Facility layer");

/**
 * Sits under the drawing. States what the control actually does, so a visitor is
 * not left to infer that six layers are being withheld — see this file's head
 * comment on emphasis-not-reveal.
 */
export const LAYER_NOTE = same(
  "Seven layers, drawn in the source's own order and joined the way the source joins them. Selecting a layer marks it and the joins either side of it; every layer's contents stay on the page."
);

/** Precedes the live-region line naming the layer currently in force. */
export const SELECTED_LAYER_CAPTION = same("Layer selected:");
/** Names the neighbouring layers in the drawing. Positional, not causal. */
export const ABOVE_LABEL = same("Above in the run:");
export const BELOW_LABEL = same("Below in the run:");
export const TOP_OF_RUN = same("Top of the run.");
export const BOTTOM_OF_RUN = same("Bottom of the run.");

/* ── The stack (source L146–L176) ───────────────────────────────────────── */

/** Source L146, the brief's own name for the drawing below. */
export const STACK_CAPTION = same("Physical and operational stack");

/**
 * One layer of the stack.
 *
 * `rows` is the source's own two-line grouping (see the transcription rule in
 * this file's head comment). `ELEMENTS_BY_TIER` below derives the flat element
 * list per layer for any sibling section that needs to cite these names without
 * re-parsing the grouping — it is derived, never hand-maintained, so the two
 * cannot drift apart.
 */
export interface Tier {
  id: string;
  /** The source's own tier name. */
  name: Bilingual;
  /** The source's own element lines for that tier, in the source's own order. */
  rows: readonly (readonly string[])[];
}

/** Seven layers, top to bottom, exactly as the source's code fence draws them. */
export const TIERS: readonly Tier[] = [
  {
    id: "external-dependencies",
    /** Source L149. */
    name: same("External dependencies"),
    /** Source L150–151. */
    rows: [
      ["Utility grid", "substation", "transmission/distribution operator", "gas/fuel"],
      ["Water utility", "telecom carriers", "cloud / internet exchange", "road and logistics"]
    ]
  },
  {
    id: "campus-utility",
    /** Source L153. */
    name: same("Campus utility and resilience layer"),
    /** Source L154–155. */
    rows: [
      ["HV/MV intake", "transformers", "MV/LV switchgear", "protection relays"],
      ["Generator plant", "fuel storage / delivery", "BESS", "power-quality systems"]
    ]
  },
  {
    id: "critical-power",
    /** Source L157. */
    name: same("Critical power path"),
    /** Source L158–159. */
    rows: [
      ["UPS systems", "batteries", "static transfer switches", "PDUs", "RPPs"],
      ["Busway", "rack PDUs", "branch circuit monitoring", "IT load"]
    ]
  },
  {
    id: "thermal-management",
    /** Source L161. */
    name: same("Thermal-management path"),
    /** Source L162–163. */
    rows: [
      ["Chillers", "cooling towers", "dry coolers", "pumps", "valves", "CRAH/CRAC"],
      ["Liquid cooling / CDUs", "heat exchangers", "water-treatment systems"]
    ]
  },
  {
    id: "facility-control",
    /** Source L165. */
    name: same("Facility control and operations"),
    /** Source L166–167. */
    rows: [
      ["BMS", "EPMS", "DCIM", "PLCs", "RTUs", "controllers", "meters", "sensors"],
      ["Historians", "alarming", "engineering workstations", "maintenance platforms"]
    ]
  },
  {
    id: "digital-infrastructure",
    /** Source L169. */
    name: same("Digital infrastructure"),
    /** Source L170–171. */
    rows: [
      ["Management networks", "OOB networks", "production networks", "cloud control plane"],
      ["Storage", "compute", "switching", "optical transport", "DDoS / edge services"]
    ]
  },
  {
    id: "business-mission",
    /** Source L173. */
    name: same("Business, customer, and mission layer"),
    /** Source L174–175. */
    rows: [
      ["Availability zones", "customer workloads", "SLAs", "sovereign/defense enclaves"],
      ["Capacity commitments", "AI/GPU clusters", "regulated data", "service operations"]
    ]
  }
];

/**
 * The flat element list per layer, keyed by `Tier.id` — derived from `TIERS`, so
 * a sibling section citing these names cites exactly what the drawing prints.
 * Provided because the asset-classes section downstream of this one draws on
 * this stack's element lists; it must key by `Tier.id` and never by array
 * position, so reordering the drawing cannot silently re-point a citation.
 */
export const ELEMENTS_BY_TIER: Readonly<Record<string, readonly string[]>> = Object.fromEntries(
  TIERS.map((tier) => [tier.id, tier.rows.flatMap((row) => row)])
);

/* ── The section's closing paragraph (source L191) ──────────────────────── */

/**
 * Source L191, transcribed whole and split at the sentence boundary the source
 * itself writes.
 *
 * TRANSCRIBED IN THE SOURCE'S OWN FRAMING, NOT GENERALISED. The second sentence
 * is a statement about what OXOT's deployments SUPPORT and DO NOT REQUIRE. It is
 * not a claim that OXOT is agentless, not a claim that no active scanning occurs
 * anywhere, and not a performance, certification or assurance claim. It is
 * printed as the source writes it and extended in no direction.
 *
 * THE SOURCE'S OWN LINK IS NOT EMITTED. L191 closes on a bracketed reference to
 * a `ppl-ai-file-upload.s3.amazonaws` URL — an expiring pre-signed S3 link to
 * `OXOT-CDT-Product-Specification-V2.pdf`. That is a transient artifact of how
 * the brief was assembled, not a public address: it carries an `Expires`
 * parameter and a scoped security token, so shipping it would put a link on the
 * site that dies. The document it names is OXOT's own CDT product specification,
 * and this site's real page for that material is `/technical-specification`, so
 * the citation resolves there. Same resolution manufacturing-process-2 applied
 * to its own dangling specification markers (its content.ts L208–L215 and
 * L286–L295).
 *
 * `/technical-specification` RENDERS ENGLISH ONLY — `content.ts` states this in
 * data as `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY`. The consuming component
 * must apply the site's established gate, `locale === "en" ? href : PATHS.cdt2`,
 * rather than shipping an `nl` link into an EN-only page.
 */
export const PASSIVE_FIRST = {
  /** Source L191, first sentence. */
  fusion: same(
    "OXOT’s technical model is designed to fuse facility physics, asset and control-system data, Purdue/network state, external intelligence, supply-chain BOMs, and financial consequence."
  ),
  /** Source L191, second sentence. */
  deployment: same(
    "It supports passive-first deployments and does not require agents on controllers or active production-network scanning."
  ),
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};
