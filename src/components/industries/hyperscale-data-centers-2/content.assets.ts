/**
 * S05 · THE NINE ASSET CLASSES, HYPERSCALE & DATA CENTERS — data only. The
 * renderer is the real, shared `src/components/twin/AssetClassBento.tsx`, which
 * is not rebuilt here.
 *
 * DERIVED, NOT TRANSCRIBED — AND DERIVED FROM CODE, NOT FROM THE SPEC AGAIN.
 * The source (`new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md`) has no asset-classes section of its own; this one
 * exists because the seven-tier stack it DOES supply maps cleanly onto the nine
 * `SystemAsset.type` values. That stack was already transcribed and verified in
 * the sibling `content.architecture.ts` (source L138–L191), so it is NOT
 * transcribed a second time here. Every element string below is pulled out of
 * that file's own `ELEMENTS_BY_TIER` at module load, by `Tier.id`, through
 * `element()` — which throws rather than return a string the drawing does not
 * contain. A rename in the architecture file therefore fails loudly instead of
 * quietly leaving this page citing equipment the drawing above it no longer
 * shows. That guard is the whole reason this file imports rather than copies.
 * The same reason keys `zone` off `Tier.id` and never off array position:
 * reordering the drawing must not silently re-point a citation.
 *
 * No vendor, product or named facility is invented. Labels are
 * type-representative names assembled from the architecture's own element
 * strings and nothing else. Descriptions cite the same elements plus already-
 * transcribed claims from the sibling `content.reality.ts`, each cited inline by
 * source line.
 *
 * `zone` NAMES THE ARCHITECTURE TIERS A CLASS DRAWS FROM. `SystemAsset.zone` is
 * a real contract field ("Purdue/network zone"), and every value below is built
 * from `TIERS`'s own tier names. KNOWN FRICTION, the same one
 * rail-transportation-2/content.assets.ts records: `AssetClassBento` does not
 * currently render `zone` — it reads `type`, `label`, `description` and
 * `criticality` only — so this is correct data that is presently invisible. The
 * shared component is out of this slice's scope and is not edited to suit one
 * page, so each description also places its class in the stack in prose.
 *
 * CRITICALITY DERIVATION — A DOCUMENTED GAP FILL, BY THE ESTABLISHED METHOD.
 * The hyperscale source assigns no criticality tiers, so this tiering is
 * derived. The method is rail-transportation-2's: find the source's OWN
 * sentence that draws the line between a consequence the site absorbs and a
 * consequence it does not, and band by the list that sentence names. Rail's
 * sentence is safety-worded (its L81). Hyperscale's equivalent is
 * availability-worded, and it is source L126 — already transcribed and verified
 * in `content.reality.ts` as the `electrical-cooling-inseparable` challenge:
 *
 *   "Electrical and cooling systems are inseparable from compute availability"
 *   / "A cyber issue affecting switchgear, generator controls, UPS monitoring,
 *   cooling plant, or BMS can consume redundancy and turn a minor physical
 *   event into a capacity event"
 *
 * That is the same shape as rail's rule sentence — a cyber issue affecting a
 * NAMED LIST produces the sector's defining severe outcome — so the named list
 * is the critical band, item for item:
 *
 *   - `process-equipment` ← "switchgear", "cooling plant"
 *   - `controller`        ← "generator controls"
 *   - `field-device`      ← "UPS monitoring"
 *   - `hmi`               ← "BMS"
 *
 * "UPS monitoring" IS READ AS REACHING TWO CLASSES, AND BOTH ARE ALREADY IN.
 * The phrase names a monitoring function that in this stack exists as an
 * instrument ("branch circuit monitoring", "meters", "sensors") and as a
 * platform ("EPMS"). Both readings land inside the critical band — `field-device`
 * by the instrument, `hmi` by the platform, which is already critical on "BMS" —
 * so the ambiguity changes no record's tier. It is recorded rather than silently
 * resolved.
 *
 * COUNTS: 4 critical / 4 important / 1 context. Everything else that is real
 * facility infrastructure or a real access path is `important`; the layer that
 * records, hosts and accounts for capacity rather than producing or protecting
 * it is `context`.
 *
 * ONE FRICTION, RECORDED RATHER THAN HAND-CORRECTED, and it is the interesting
 * one: `safety-function` lands in `important` here, where rail's identical
 * method put it in `critical`. That difference is the sources', not this
 * builder's. Rail's rule sentence names "protection function" outright because
 * rail's defining consequence is a safety concern; hyperscale's names no
 * protective element at all because its defining consequence is a capacity
 * event. The nearest counter-argument is source L128 (`content.reality.ts`'s
 * `commissioning-change-risk`), where a control change "can interrupt
 * monitoring, failover, protection coordination, sequencing, or emergency
 * operating procedures" — which does name protection. It is not used to promote
 * the class, for two reasons: it lists what a bad CHANGE can interrupt rather
 * than which systems carry the severe outcome, and every other item on it
 * ("monitoring", "sequencing") already resolves to a class L126 has covered, so
 * treating it as a second rule would promote exactly one class and nothing else
 * — which is choosing the answer first. A rule overridden wherever it is
 * inconvenient stops being a derivation and becomes a guess with a docblock.
 *
 * TWO ARCHITECTURE ELEMENTS ARE DELIBERATELY UNPLACED: "transmission/
 * distribution operator" and "road and logistics", both from the external
 * dependencies tier. They are counterparties and a logistics chain, not
 * equipment or software, and the nine-type taxonomy in
 * `@/components/twin/types.ts` has no slot for an outside organisation. Forcing
 * them into `service` to reach a tidy total would assert a classification the
 * taxonomy does not make. The tier itself is still cited — by
 * `process-equipment` and `network-device` — so no tier goes unrepresented.
 *
 * CLAIM RULE IN FORCE (`content.ts`): not one numeric figure, percentage, money
 * value, annual-loss figure, "verified" wording or certification claim appears
 * in this file. Neither of the page's two permitted figures belongs here.
 *
 * The middle tier is spelled `"important"` because that is the value in the
 * `AssetCriticality` union in `@/components/twin/types.ts`. That union is shared
 * with the Twin diagram and is not widened for one page.
 */
import { same } from "../registry";
import type { AssetCriticality, SystemAsset, SystemAssetType } from "@/components/twin/types";
import { ELEMENTS_BY_TIER, TIERS } from "./content.architecture";

/* ── Pulling real strings out of the architecture ───────────────────────── */

/**
 * Throws rather than returning an element the drawing does not contain. This
 * file and `content.architecture.ts` cover different source ranges and have
 * different owners, so an element rename there would otherwise leave this page
 * quietly citing equipment that is no longer drawn above it.
 */
function element(tierId: string, name: string): string {
  const found = ELEMENTS_BY_TIER[tierId]?.find((candidate) => candidate === name);
  if (!found) {
    throw new Error(`content.assets: "${name}" is not an element of architecture tier "${tierId}"`);
  }
  return found;
}

function tierName(tierId: string): string {
  const tier = TIERS.find((candidate) => candidate.id === tierId);
  if (!tier) {
    throw new Error(`content.assets: no architecture tier "${tierId}"`);
  }
  return tier.name.en;
}

/**
 * The architecture's element strings are sentence-cased wherever they open one
 * of the source's own lines, so a mid-label "Chillers" would read as a typo and
 * a label opening on "branch circuit monitoring" as a dropped capital. Only a
 * leading capital followed by a lowercase letter is lowered, which leaves every
 * acronym intact — "BMS", "MV/LV switchgear", "DDoS / edge services", "AI/GPU
 * clusters". Casing is the only thing this touches; no word is changed, added or
 * reordered.
 */
function assembleLabel(cited: readonly string[]): string {
  const parts = cited.map((raw, i) =>
    i === 0
      ? raw.replace(/^[a-z]/, (c) => c.toUpperCase())
      : raw.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())
  );
  const last = parts[parts.length - 1];
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${last}` : last;
}

/* ── The nine classes ───────────────────────────────────────────────────── */

interface AssetSpec {
  id: string;
  type: SystemAssetType;
  /**
   * OPTIONAL published-symbol override, resolved by `AssetNode.tsx::assetGlyph`
   * and drawn by `AssetClassBento`. Present only where the TYPE SILHOUETTE IS
   * FALSE for this particular class — never as decoration, and never where the
   * generic mark is merely coarse. Each of the two entries below states which
   * of those two it is closing.
   *
   * Slugs must exist in `CURATED_SYMBOLS` (AssetNode.tsx). An unresolvable one
   * falls back to the silhouette and `console.warn`s rather than throwing, so a
   * typo degrades quietly instead of 500ing the route — which is exactly why
   * both were checked against that table rather than trusted.
   */
  symbol?: string;
  /** Architecture tier ids this class draws from — `zone` is built from these. */
  tiers: readonly string[];
  /** `[tierId, element]` pairs. The label is assembled from exactly these. */
  cited: readonly (readonly [string, string])[];
  description: string;
  criticality: AssetCriticality;
}

const SPECS: readonly AssetSpec[] = [
  {
    id: "power-and-thermal-plant",
    type: "process-equipment",
    /* THE SILHOUETTE WAS FALSE, NOT COARSE. `ASSET_GLYPHS["process-equipment"]`
       is draw.io's `container_tank_cistern` — an OPEN-TOPPED VESSEL, correct for
       the vented chemical dosing tanks the water pages use it for and wrong for
       every one of the five things this class actually cites. An open water tank
       standing in for MV/LV switchgear and generator plant is the same class of
       error as the metering pump once drawn as a tank: a false statement made by
       a renderer, not a shortfall in detail.

       THE TRANSFORMER IS WHAT THE CONTENT ITSELF NAMES. This description's own
       first clause is "utility grid and substation supply into HV/MV intake,
       TRANSFORMERS AND MV/LV SWITCHGEAR", and the IEC 60617 two-winding
       transformer is the standard single-line mark for exactly that MV/LV
       boundary — the head of the chain this class is assembled around. Nothing
       is invented: the mark names a component the source text states.

       WHAT WAS DELIBERATELY NOT DONE. Generator plant is the strongest single
       candidate and there is NO ROTATING-MACHINE GLYPH anywhere in the curated
       set — checked against every export of ./cset-glyphs, ./pid-hand-drawn and
       ./ot-notation. `pid/…` alternator marks exist in the compiled manifest but
       are unreachable from a client boundary (types.ts §3.1), and borrowing an
       `ac_source` or a water cistern for a genset is precisely the mistake this
       whole effort started from. Reported as a library gap instead of faked. */
    symbol: "oxot/electrical/transformer",
    tiers: ["external-dependencies", "campus-utility", "critical-power", "thermal-management"],
    cited: [
      ["campus-utility", "MV/LV switchgear"],
      ["campus-utility", "Generator plant"],
      ["critical-power", "UPS systems"],
      ["thermal-management", "Chillers"],
      ["thermal-management", "CRAH/CRAC"]
    ],
    /* Critical: source L126 names both "switchgear" and "cooling plant". Spans
       four tiers because the physical chain itself does. */
    description:
      "The physical chain carrying power in and heat out: utility grid and substation supply into HV/MV intake, transformers and MV/LV switchgear; generator plant, fuel storage / delivery and BESS standing behind them; UPS systems, batteries, PDUs, RPPs, busway and rack PDUs down to the IT load; chillers, cooling towers, dry coolers, pumps, valves, CRAH/CRAC and liquid cooling / CDUs carrying the heat back out through heat exchangers and water-treatment systems. A cyber issue reaching switchgear or cooling plant does not stay a component fault — it consumes redundancy and turns a minor physical event into a capacity event.",
    criticality: "critical"
  },
  {
    id: "facility-instrumentation",
    type: "field-device",
    tiers: ["critical-power", "facility-control"],
    cited: [
      ["critical-power", "branch circuit monitoring"],
      ["facility-control", "meters"],
      ["facility-control", "sensors"]
    ],
    /* Critical: source L126's "UPS monitoring", read as the instrument. See the
       two-readings note in this file's docblock. */
    description:
      "Branch circuit monitoring on the power path, and the meters and sensors the facility's own state is read from. Monitoring is on the short list of systems where a cyber issue consumes redundancy rather than degrading a component, and the reason is specific to a redundant design: an instrument still reporting a healthy path leaves the redundancy claim standing after the redundancy has already gone.",
    criticality: "critical"
  },
  {
    id: "facility-controllers",
    type: "controller",
    tiers: ["facility-control"],
    cited: [
      ["facility-control", "PLCs"],
      ["facility-control", "RTUs"],
      ["facility-control", "controllers"]
    ],
    /* Critical: source L126's "generator controls". Change risk from L128. */
    description:
      "The PLCs, RTUs and controllers holding the facility's electrical and mechanical sequences. Generator controls sit among the systems where a cyber issue consumes redundancy and turns a minor physical event into a capacity event, and a control change that looks correct on a diagram can still interrupt sequencing, failover or emergency operating procedures.",
    criticality: "critical"
  },
  {
    id: "supervisory-platforms",
    type: "hmi",
    /* CLOSES A MEASURED COLLISION AND A WRONG PORTRAIT AT THE SAME TIME.
       `ASSET_GLYPHS["hmi"]` is Siemens iX `panel-ipc` — a landscape bezel with
       an inset screen, i.e. a PANEL-MOUNTED industrial HMI bolted to a
       switchboard. `ASSET_GLYPHS["engineering-workstation"]` is a monitor of
       almost the same proportions plus a tower, and at the 22px cell
       `AssetClassBento` renders the two read as one rectangle-with-inner-
       rectangle; AssetNode.tsx's own source records rejecting a third glyph for
       "colliding with HmiGlyph", so the collision is acknowledged upstream. This
       class and `engineering-and-maintenance-tooling` sit two cards apart.

       BMS, EPMS and DCIM are not panel IPCs either — they are server-hosted
       supervisory platforms. `cset/building-automation` is CISA/INL's CSET
       taxonomy term for precisely a BMS/EPMS head-end, and it draws a building
       elevation with a control dial: unmistakably a facility supervisory system
       and unmistakably not the workstation two cards over. It was added to
       CURATED_SYMBOLS on 2026-08-29 partly for this sector. */
    symbol: "cset/building-automation",
    tiers: ["facility-control"],
    cited: [
      ["facility-control", "BMS"],
      ["facility-control", "EPMS"],
      ["facility-control", "DCIM"]
    ],
    /* Critical: source L126 names "BMS" outright. Shared-BMS framing L117. */
    description:
      "BMS, EPMS and DCIM — the supervisory platforms a critical facility is operated and watched from, and where electrical and mechanical state is presented as one picture. A cyber issue reaching BMS consumes redundancy and turns a minor physical event into a capacity event, and BMS servers sit on the facility's own list of what is shared across otherwise redundant paths.",
    criticality: "critical"
  },
  {
    id: "protection-and-transfer",
    type: "safety-function",
    tiers: ["campus-utility", "critical-power"],
    cited: [
      ["campus-utility", "protection relays"],
      ["critical-power", "static transfer switches"]
    ],
    /* Important, NOT critical — source L126 names no protective element, and
       this is the friction the docblock records rather than corrects. L128
       supplies "protection coordination" and "failover". */
    description:
      "Protection relays coordinating the electrical fault response, and static transfer switches moving load between paths without an operator in the loop. These are the functions expected to act when the primary path does not, which is also what makes them fragile to change: a control change that looks correct on a diagram can interrupt protection coordination or failover without interrupting anything a visitor to the hall would notice.",
    criticality: "important"
  },
  {
    id: "engineering-and-maintenance-tooling",
    type: "engineering-workstation",
    tiers: ["facility-control"],
    cited: [
      ["facility-control", "engineering workstations"],
      ["facility-control", "maintenance platforms"]
    ],
    /* Important: the path into the critical band, not a member of it. Shared
       management workstations L117; vendor tooling and firmware L129. */
    description:
      "Engineering workstations and maintenance platforms — where controller logic, sequences and firmware are authored, staged and loaded, and where vendor support tooling lands. This is the route into the control tier rather than the tier itself, and management workstations, firmware and vendor tooling are all on the facility's own list of what is shared across otherwise redundant paths.",
    criticality: "important"
  },
  {
    id: "estate-and-carrier-networks",
    type: "network-device",
    tiers: ["digital-infrastructure", "external-dependencies"],
    cited: [
      ["digital-infrastructure", "Management networks"],
      ["digital-infrastructure", "production networks"],
      ["digital-infrastructure", "switching"],
      ["digital-infrastructure", "optical transport"],
      ["external-dependencies", "telecom carriers"]
    ],
    /* Important: real infrastructure, not on L126's list. Cross-connect /
       network dependency incident is one of the model's own scenarios (L72). */
    description:
      "Management networks, production networks, switching, optical transport and DDoS / edge services across the estate, and the telecom carriers and cloud / internet exchange the campus reaches the outside world through. A cross-connect or network dependency incident reaches customer capacity without touching a single piece of plant, which is why the network sits inside the same model as the switchgear rather than beside it.",
    criticality: "important"
  },
  {
    id: "out-of-band-and-cloud-control",
    type: "remote-access",
    tiers: ["digital-infrastructure"],
    cited: [
      ["digital-infrastructure", "OOB networks"],
      ["digital-infrastructure", "cloud control plane"]
    ],
    /* Important: an access route, not an L126 system. Shared remote-access
       gateways L117; vendor remote-access workflows L129. */
    description:
      "OOB networks and the cloud control plane — the paths that still reach facility and network equipment when the production path is unavailable or nobody is on site. Remote-access gateways are on the facility's own list of what is shared across otherwise redundant paths, and every vendor discipline on the campus brings its own remote-access workflows, support tools, firmware and maintenance dependencies along the same route.",
    criticality: "important"
  },
  {
    id: "records-hosting-and-commitments",
    type: "service",
    tiers: ["facility-control", "digital-infrastructure", "business-mission"],
    cited: [
      ["facility-control", "Historians"],
      ["facility-control", "alarming"],
      ["business-mission", "Availability zones"],
      ["business-mission", "SLAs"],
      ["business-mission", "service operations"]
    ],
    /* Context: not on L126's list. Records, hosts and accounts for capacity
       rather than producing or protecting it. */
    description:
      "Historians and alarming behind facility control; storage and compute behind the halls; and the availability zones, customer workloads, SLAs, capacity commitments, AI/GPU clusters, regulated data, sovereign/defense enclaves and service operations the campus exists to deliver. They record, host and account for capacity rather than producing or protecting it — which is also the layer a capacity event is finally measured in.",
    criticality: "context"
  }
];

/* NO `datumLabel` OR `index` ON THIS EXPORT, unlike every other section's
   content file on this page. Those two fields exist to feed `Rule.tsx`'s
   `Datum`, and this section does not draw one: `AssetClassBento` brings its own
   `<section>` and `<h2>`, and no shipped page's `SystemAssets` draws the path
   pair above it. Carrying a label and an ordinal that nothing renders would be
   dead data inviting a future reader to wire it up. See SystemAssets.tsx. */
export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes, from the utility interconnect down to the workload."),
  intro: same(
    "The seven-layer stack above is the facility as it is drawn. This is the same facility as the Twin models it: nine asset classes, assembled from that stack's own elements, banded by the site's own line between a component failure it can absorb and a cyber issue that consumes redundancy and turns a minor physical event into a capacity event."
  ),
  assets: SPECS.map<SystemAsset>((spec) => ({
    id: spec.id,
    type: spec.type,
    /* Undefined on seven of the nine, which is the point: `assetGlyph` falls
       back to `ASSET_GLYPHS[type]` and those seven keep the silhouette that was
       already correct for them. Only the two classes whose silhouette was FALSE
       carry a slug — see each spec's own note. */
    symbol: spec.symbol,
    label: assembleLabel(spec.cited.map(([tierId, name]) => element(tierId, name))),
    zone: spec.tiers.map(tierName).join(" · "),
    description: spec.description,
    criticality: spec.criticality
  }))
};
