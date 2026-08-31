/**
 * S09 · HYPERSCALE & DATA CENTERS — the worked example's DERIVED layer: the
 * scenario's typed assets, its routes, the canvas geometry that places them, and
 * the six candidate controls with their insertion points.
 *
 * SOURCE: `new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md` L324–L395. Every visitor-facing string carries its
 * `L<n>`. The narrative half of this section lives in `content.workedExample.ts`;
 * the split is not cosmetic — both sibling pages' equivalent single files landed
 * at 499 and 500 lines against this repository's 500-line cap, so this one is
 * split at the seam between prose and topology from the start.
 *
 * THE SAME SCENARIO APPEARS ON THIS PAGE AT THREE DEPTHS, AND THAT IS THE
 * SOURCE'S OWN STRUCTURE RATHER THAN A DUPLICATION BUG:
 *   L65   S01's interactive model lists "BMS vendor remote access" as one of
 *         nine selectable scenarios — a single line.
 *   L296  S07's risk-scenario register carries "BMS vendor remote-access" as one
 *         row of twelve, with its own stated outcome.
 *   L324  this section develops it in full: narrative, evidence, modelled chain,
 *         six candidate controls and a result.
 * The brief states no mapping between the three, and their wordings differ. So
 * NOTHING here imports from `content.ts`'s `MODEL.scenarios` or from
 * `content.scenarios.ts`, and no runtime join is performed. Each list is
 * transcribed from its own source rows, exactly as `content.ts` L155–L164 already
 * records for the nine-versus-twelve overlap. A shared constant would assert a
 * correspondence the source does not make, and would couple three sections whose
 * copy is deliberately different.
 *
 * THE TEN CANVAS ASSETS ARE SCENARIO INSTANCES, NOT THE NINE ASSET CLASSES of
 * `content.assets.ts`: the specific systems L334, L336, L350–L354 and L367–L377
 * name in *this* scenario, typed against the same nine-member union so the shared
 * glyph set draws them. Their `type` values follow `content.assets.ts`'s own
 * class map for this page rather than a second private one — which is why the
 * BMS supervisory server and the DCIM / EPMS platform share the `hmi` class:
 * L334 names both as platforms the mechanical estate reports into, and that file
 * puts BMS, EPMS and DCIM together in one supervisory class.
 *
 * SHARING A CLASS IS RIGHT; SHARING A SILHOUETTE WAS NOT. This header used to
 * argue that "shape carries type, not identity, so two nodes of one type sharing
 * a silhouette is correct", and that reasoning is withdrawn as of 2026-08-29
 * after `docs/diagram-system/using-the-library.md` §10.2 was run against this
 * canvas. It is sound for a taxonomy and wrong for a drawing whose ARGUMENT is
 * the distinction: ten assets drew from seven silhouettes, leaving four
 * colliding pairs, and in three of them the two nodes are the subject of
 * different candidate controls. L387's candidate proposes isolating DCIM/EPMS
 * reporting from configuration and command paths — a reader who cannot tell the
 * reporting platform from the command platform cannot see what it acts on.
 *
 * Three records therefore carry a published `symbol` override, each documented
 * on itself: `vendor-vpn-gateway`, `bms-supervisory-server` and `data-hall`.
 * The `type` values are UNCHANGED — the class map above still holds, and the
 * accessible restatement still speaks the type. What changed is only the mark.
 * `cooling-plant` keeps a silhouette this file knows to be false because the
 * library publishes nothing honest for a chiller plant; that is recorded on the
 * record rather than papered over. `oem-remote-support` and
 * `bms-integrator-access` keep ONE shared mark deliberately: two vendor
 * remote-access routes really are the same kind of thing, and only the label
 * distinguishes an OEM from an integrator.
 *
 * NO VENDOR, PRODUCT, SITE, HALL NAME, TIER RATING, CAPACITY OR TEMPERATURE IS
 * INVENTED. The source states none, and an authentic-looking annotation would be
 * a fabricated engineering fact. No numeric figure appears in this file.
 *
 * EVERY ROUTE IS A RELATION THE SOURCE STATES, cited on the route itself. Where
 * the source describes a system without stating what it connects to, no route is
 * drawn — the chain is not completed by inference.
 *
 * WHERE THE CROSSHAIR GOES IS DECLARED, NOT DERIVED FROM GEOMETRY. THREE of the
 * six candidates close no route at all — "Separate monitoring from control"
 * (L387), "Stage controller/firmware hardening" (L388) and "Add independent
 * operational safeguards" (L389), whose own decision insights are about
 * consequence and common-mode update risk rather than reachability. Inferring
 * insertion points from closed routes would leave half this table marking
 * nothing and reporting no discrepancy, reading as "these controls do nothing"
 * rather than as the source's actual finding. `insertAt` therefore states the
 * insertion point from the source text for every candidate.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

/* ── The scenario's assets ───────────────────────────────────────────────── */

export const CANVAS_ASSETS: SystemAsset[] = [
  {
    /* L334 ("An OEM remotely supports critical chiller controls") and L367, the
       chain's first step. */
    id: "oem-remote-support",
    type: "remote-access",
    label: "OEM remote-support endpoint",
    criticality: "important",
    description:
      "The OEM's own remote-support endpoint and the credentials behind it. The OEM remotely supports critical chiller controls, and a compromised credential or endpoint is where the modelled chain begins."
  },
  {
    /* L334, second vendor party: "the BMS integrator maintains supervisory
       control logic". A separate discipline on a separate scope — and the reason
       an OEM-only control leaves something standing. */
    id: "bms-integrator-access",
    type: "remote-access",
    label: "BMS integrator access",
    criticality: "important",
    description:
      "The BMS integrator's own route in. The integrator maintains supervisory control logic, which is a different scope from the OEM's chiller controls and is not addressed by a candidate written against OEM access."
  },
  {
    /* L351 names it verbatim as evidence; L336 states the route runs over a
       persistent VPN path. */
    id: "vendor-vpn-gateway",
    type: "network-device",
    /* COLLIDED WITH `facility-management-network`, AND ONLY ONE OF THE TWO WAS
       WRONG. `ASSET_GLYPHS["network-device"]` is Siemens iX `network-wired`: an
       uplink, a trunk and two attached devices — a TOPOLOGY. That is exactly
       right for a shared facility-management network and exactly wrong for a
       single gateway appliance, yet both drew it, so the canvas said "these are
       the same kind of thing" about the boundary and the network behind it.
       Moving the gateway off the type leaves the topology mark correct, alone,
       and now actually meaningful.

       `cset/remote-access-server` draws a chassis with an inbound arrow
       crossing a DASHED VERTICAL PERIMETER — the boundary traversal is the
       mark's own subject, which is the finding this record carries ("this path
       is persistent rather than raised per session"). */
    symbol: "cset/remote-access-server",
    label: "Vendor VPN gateway",
    criticality: "important",
    description:
      "The vendor VPN and remote-access gateway, with the jump hosts, identity, MFA and approval process behind it. The review's finding is that this path is persistent rather than raised per session."
  },
  {
    /* L336 ("a shared facility-management network") and L369, the chain's second
       step. */
    id: "facility-management-network",
    type: "network-device",
    label: "Facility-management network",
    criticality: "critical",
    description:
      "The shared facility-management network the vendor path crosses, and the VLANs, firewalls and routing that define what it can reach from there. Shared is the operative word: it is one network standing between a vendor route and the facility's own systems."
  },
  {
    /* L336 ("can reach an engineering workstation"), L350 (engineering
       workstations as evidence), L371, the chain's third step. */
    id: "bms-engineering-workstation",
    type: "engineering-workstation",
    label: "BMS engineering workstation",
    criticality: "critical",
    description:
      "The engineering workstation the vendor route reaches, which itself has pathways toward BMS servers and selected mechanical-control zones. This is the route into the control tier rather than the tier itself."
  },
  {
    /* L334 (BMS platforms), L350 (BMS servers), L371 (supervisory-control
       layer). Typed `hmi` per content.assets.ts's supervisory-platform class. */
    id: "bms-supervisory-server",
    type: "hmi",
    /* THE COLLISION THIS FILE'S HEADER USED TO DEFEND — see the correction
       there. Sharing the `hmi` CLASS with the DCIM/EPMS platform is right and
       stays; sharing a SILHOUETTE on a canvas whose argument turns on telling
       the command platform from the reporting platform is not. L387's own
       candidate control proposes isolating DCIM/EPMS reporting FROM
       configuration and command paths, so a reader who cannot see which node is
       which cannot see what that control acts on.

       `cset/building-automation` is CSET's own taxonomy term for a BMS head-end
       and draws a building elevation with a control dial. It is also what
       `content.assets.ts` gives the supervisory-platforms class, so the same
       real system draws the same mark in both sections of this page. The type
       silhouette it replaces is Siemens iX `panel-ipc`, a panel-mounted HMI
       bolted to a switchboard, which a BMS server is not. */
    symbol: "cset/building-automation",
    label: "BMS supervisory server",
    criticality: "critical",
    description:
      "The BMS servers and the supervisory-control layer above the mechanical estate — where sequences are held and the facility's mechanical state is presented as one picture."
  },
  {
    /* L350 (controllers, field panels), L336 (selected mechanical-control
       zones), L373, the chain's fourth step. */
    id: "mechanical-zone-controller",
    type: "controller",
    label: "Mechanical-zone controller",
    criticality: "critical",
    description:
      "The controllers and field panels holding the mechanical sequences for a control zone, and the chiller, pump, tower, VFD and valve control pathways that run from them."
  },
  {
    /* L334's own equipment list. */
    id: "cooling-plant",
    type: "process-equipment",
    /* ISO 10628-2 X8114, wet induced-draught. Was a water cistern - the one
       mark on this page known to be false and left tracked until now. */
    symbol: "oxot/thermal/cooling_tower",
    label: "Chiller, tower and pump plant",
    criticality: "critical",
    description:
      "Chillers, cooling towers, condenser-water pumps, chilled-water pumps, CRAHs, VFDs and water-treatment systems — the physical cooling chain carrying heat out of the halls."
  },
  {
    /* L334 (DCIM platforms), L350 (DCIM links), L387 (EPMS/DCIM/BMS reporting
       feeds). Same supervisory class as the BMS server — see this file's
       header. */
    id: "dcim-epms-platform",
    type: "hmi",
    label: "DCIM / EPMS platform",
    criticality: "important",
    description:
      "The DCIM and EPMS platforms the mechanical and electrical estate reports into — the reporting side of the supervisory tier, which L387's candidate control proposes isolating from configuration and command paths."
  },
  {
    /* L334 ("multiple data halls with N+1 cooling") and L377, where the chain
       stops being a network finding and becomes lost capacity. */
    id: "data-hall",
    type: "process-equipment",
    /* HALF OF THE WORST COLLISION ON THIS CANVAS, AND THE HALF THAT COULD BE
       FIXED HONESTLY. `ASSET_GLYPHS["process-equipment"]` is draw.io's
       `container_tank_cistern`, an OPEN-TOPPED WATER VESSEL. Both this node and
       `cooling-plant` drew it, so a data hall and a chiller plant were the same
       open tank — false twice over, and identical, on the two nodes the chain's
       last step runs between.

       `cset/server` is the compute a hall IS, and this record's own claim is
       about capacity ("the customer capacity it carries... reduced available
       capacity, a load shed"). Naming the hall by its racks is synecdoche, not
       a borrowed neighbouring unit operation — the distinction the library doc
       draws when it forbids the second. A true white-space / hall mark does not
       exist in the curated set and is reported as a gap rather than faked.

       `cooling-plant` KEEPS THE WRONG MARK ON PURPOSE, because there is no
       right one: no chiller, cooling tower, CRAH, condenser-water pump or
       rotating-machine glyph exists in ./cset-glyphs, ./pid-hand-drawn or
       ./ot-notation, and the manifest marks that would serve are unreachable
       from a client boundary. Substituting a vessel-shaped near-miss there
       would repeat the error this whole effort began with, so it stays visibly
       wrong and tracked instead of quietly plausible. */
    symbol: "cset/server",
    label: "Data hall",
    criticality: "critical",
    description:
      "A data hall on N+1 cooling, and the customer capacity it carries. This is where consumed redundancy turns into reduced available capacity, a load shed, or service impact."
  }
];

/**
 * Eleven routes. `role` carries stroke geometry and `status` carries colour, per
 * the shared `PathEdge` contract — this file never paints an edge itself, which
 * keeps the token rule enforceable by the renderer rather than by convention.
 * Every route is `open` at baseline: that is what "as documented" means here, and
 * a route drawn `unknown` would assert an uncertainty the source does not state.
 */
export const SCENARIO_PATHS: SystemPath[] = [
  /* L334 + L336: the OEM supports chiller controls over a persistent VPN path. */
  { id: "p-oem-to-vpn", from: "oem-remote-support", to: "vendor-vpn-gateway", role: "vendor-access", status: "open" },
  /* L336 + L369: that VPN path runs through the shared facility-management
     network. */
  { id: "p-vpn-to-fmn", from: "vendor-vpn-gateway", to: "facility-management-network", role: "vendor-access", status: "open" },
  /* L336 + L371: "The route can reach an engineering workstation". */
  { id: "p-fmn-to-ews", from: "facility-management-network", to: "bms-engineering-workstation", role: "attack-path", status: "open" },
  /* L336: the workstation "has pathways toward BMS servers". */
  { id: "p-ews-to-bms", from: "bms-engineering-workstation", to: "bms-supervisory-server", role: "management", status: "open" },
  /* L336: "and selected mechanical-control zones" — a second, separate pathway,
     stated in the same sentence and therefore drawn as its own route. */
  { id: "p-ews-to-mech", from: "bms-engineering-workstation", to: "mechanical-zone-controller", role: "management", status: "open" },
  /* L334: "the BMS integrator maintains supervisory control logic". */
  { id: "p-integrator-to-bms", from: "bms-integrator-access", to: "bms-supervisory-server", role: "vendor-access", status: "open" },
  /* L352 (required BACnet/Modbus/OPC/control flows) read with L373: the
     supervisory layer's command path down into the zone controllers. */
  { id: "p-bms-to-mech", from: "bms-supervisory-server", to: "mechanical-zone-controller", role: "required-flow", status: "open" },
  /* L373: chiller, pump, tower, VFD and valve control pathways. */
  { id: "p-mech-to-plant", from: "mechanical-zone-controller", to: "cooling-plant", role: "required-flow", status: "open" },
  /* L334 ("multiple data halls with N+1 cooling") + L377: the cooling the hall's
     capacity actually rests on. */
  { id: "p-plant-to-hall", from: "cooling-plant", to: "data-hall", role: "required-flow", status: "open" },
  /* L334: the mechanical estate "report[s] into BMS and DCIM platforms". This is
     the feed whose loss L375 calls loss of cooling visibility. */
  { id: "p-plant-to-bms", from: "cooling-plant", to: "bms-supervisory-server", role: "required-flow", status: "open" },
  /* L334 (DCIM platforms) + L350 (DCIM links) + L387 (reporting feeds). */
  { id: "p-bms-to-dcim", from: "bms-supervisory-server", to: "dcim-epms-platform", role: "required-flow", status: "open" }
];

/* ── The shared canvas: geometry ─────────────────────────────────────────── */

/**
 * WHY LAYOUT DATA SITS IN A CONTENT FILE. These tables place *this* scenario's
 * ten nodes and eleven routes and are useless to any other scenario, so they
 * travel with its record rather than with the renderer — and keeping them here is
 * what holds `ThreeGateLedger.tsx` under the project's 500-line limit.
 *
 * HAND-AUTHORED RATHER THAN LAID OUT BY ELK, the same decision the sibling pages'
 * canvases record: the canvas re-renders on every control selection, and
 * re-running a layout each time would make the nodes jump, which reads as a live
 * simulation running in the browser — a claim OXOT does not make. Fixed geometry
 * holds the nodes still so the only thing that moves is the only thing that
 * changed, each route's state.
 *
 * THE SHAPE IS THREE BANDS, WHICH IS THIS SCENARIO'S OWN ARGUMENT. The middle
 * band is the access spine, left to right from the OEM endpoint to the
 * supervisory layer. Below it sits the control-and-physical band the chain
 * descends into: zone controller, cooling plant, data hall. Above it sits the
 * management-and-reporting band: the integrator's route in, and the DCIM / EPMS
 * platform the estate reports to. The split is not decoration — it is exactly the
 * boundary L387's candidate control proposes drawing, so the geometry has to show
 * command and reporting as different runs before that candidate can be read.
 */
export const NODE_W = 150;
export const NODE_H = 42;
/** Label text runs from the glyph's right edge to the node's inner right edge. */
export const NODE_TEXT_W = NODE_W - 36 - 8;
export const VIEWBOX = { w: 1080, h: 320 };

export const NODE_POS: Record<string, { x: number; y: number }> = {
  /* Band A — management in, reporting out. */
  "bms-integrator-access": { x: 726, y: 62 },
  "dcim-epms-platform": { x: 906, y: 62 },
  /* Band B — the access spine. */
  "oem-remote-support": { x: 6, y: 160 },
  "vendor-vpn-gateway": { x: 186, y: 160 },
  "facility-management-network": { x: 366, y: 160 },
  "bms-engineering-workstation": { x: 546, y: 160 },
  "bms-supervisory-server": { x: 726, y: 160 },
  /* Band C — control and physical consequence. */
  "mechanical-zone-controller": { x: 546, y: 258 },
  "cooling-plant": { x: 726, y: 258 },
  "data-hall": { x: 906, y: 258 }
};

/** Orthogonal routes in the same point-sequence shape `PathEdge` already consumes
 *  from ELK, so the shared renderer is untouched. */
export const ROUTE_POINTS: Record<string, Array<{ x: number; y: number }>> = {
  "p-oem-to-vpn": [{ x: 156, y: 181 }, { x: 186, y: 181 }],
  "p-vpn-to-fmn": [{ x: 336, y: 181 }, { x: 366, y: 181 }],
  "p-fmn-to-ews": [{ x: 516, y: 181 }, { x: 546, y: 181 }],
  "p-ews-to-bms": [{ x: 696, y: 181 }, { x: 726, y: 181 }],
  /* Down the left half of the workstation so it clears `p-bms-to-mech`, which
     arrives on the same node's top edge from the right. */
  "p-ews-to-mech": [{ x: 591, y: 202 }, { x: 591, y: 258 }],
  "p-integrator-to-bms": [{ x: 801, y: 104 }, { x: 801, y: 160 }],
  "p-bms-to-mech": [{ x: 741, y: 202 }, { x: 741, y: 230 }, { x: 651, y: 230 }, { x: 651, y: 258 }],
  "p-mech-to-plant": [{ x: 696, y: 279 }, { x: 726, y: 279 }],
  "p-plant-to-hall": [{ x: 876, y: 279 }, { x: 906, y: 279 }],
  /* Straight up the plant's own right half — the reporting feed rising back to
     the supervisory layer, clear of `p-bms-to-mech`'s bends at x=741. */
  "p-plant-to-bms": [{ x: 831, y: 258 }, { x: 831, y: 202 }],
  /* Out to the right and up, rather than straight up: a vertical from the
     supervisory server's top edge would collide with the integrator's route
     arriving there. */
  "p-bms-to-dcim": [{ x: 876, y: 181 }, { x: 996, y: 181 }, { x: 996, y: 104 }]
};

/** The legend's swatch colours — deliberately the same four tokens `PathEdge`
 *  paints the edges with. A legend fed from a second table is a legend that can
 *  silently stop matching the thing it explains. */
export const STATUS_SWATCH: Record<SystemPath["status"], string> = {
  open: "hsl(var(--signal-blue))",
  controlled: "hsl(var(--signal-amber))",
  closed: "hsl(var(--signal-green))",
  unknown: "hsl(var(--signal-slate))"
};

/* ── Lookups derived from the record above ───────────────────────────────── */

const BY_ID = new Map(CANVAS_ASSETS.map((a) => [a.id, a]));

export const assetLabel = (id: string) => BY_ID.get(id)?.label ?? id;

/** A route named end to end, so the reader never meets a raw path id. */
export const routeLabel = (id: string) => {
  const edge = SCENARIO_PATHS.find((p) => p.id === id);
  return edge ? `${assetLabel(edge.from)} → ${assetLabel(edge.to)}` : id;
};

export const ENTRY_ASSET_ID = "oem-remote-support";
/** L373, the chain's fourth step — the point at which a management finding
 *  becomes a control-pathway finding. */
export const TARGET_ASSET_ID = "mechanical-zone-controller";
/** The systems the chain passes through between entry and target — L369 and
 *  L371's two steps, in order, with the two systems L336 names inside them. */
export const INTERMEDIATE_IDS = [
  "vendor-vpn-gateway",
  "facility-management-network",
  "bms-engineering-workstation",
  "bms-supervisory-server"
];

/** Split a node label into two balanced lines at a word boundary. Part of the
 *  canvas contract rather than of the renderer: it exists because these specific
 *  labels run longer than `NODE_TEXT_W` at the 11px technical-label floor. */
export function wrapLabel(text: string, maxChars = 17): string[] {
  const words = text.split(" ");
  if (text.length <= maxChars || words.length === 1) return [text];
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/* ── The six candidate controls ──────────────────────────────────────────── */

export interface ControlCandidate {
  id: string;
  /** L384–L389's first column, "Candidate change", verbatim. */
  title: Bilingual;
  /** L384–L389's second column, "What the Twin tests", verbatim. */
  evaluates: Bilingual;
  /** L384–L389's third column, "Decision insight", verbatim. */
  outcome: Bilingual;
  /** Where the crosshair reticle is drawn — see this file's header. */
  insertAt: string[];
  closesPathIds: string[];
  preservesPathIds: string[];
  residualPathIds: string[];
}

/**
 * The six candidates of L384–L389, in the source's own order and wording. The
 * route sets are read from each row's stated test and decision insight rather
 * than invented: they are the reason the insight column says what it says.
 *
 * THE INTEGRATOR ROUTE IS RESIDUAL UNDER EVERY CANDIDATE THAT NAMES THE OEM.
 * L384 and L385 are both written against OEM access, while L334 states a second
 * vendor party with a different scope. That gap is the source's own, and it is
 * printed rather than quietly closed by treating "vendor" and "OEM" as the same
 * word.
 */
export const CONTROL_CANDIDATES: ControlCandidate[] = [
  {
    id: "ctl-remove-oem-access",
    title: same("Remove remote OEM access"),
    evaluates: same("Whether incident recovery depends on vendor support and creates unacceptable repair-time exposure"),
    outcome: same("Reduces cyber pathway but may impair restoration during a mechanical fault"),
    insertAt: ["oem-remote-support"],
    closesPathIds: ["p-oem-to-vpn", "p-vpn-to-fmn", "p-fmn-to-ews"],
    /* None. Removing the route is exactly what impairs the restoration the
       decision-insight column warns about — the row states no flow it keeps. */
    preservesPathIds: [],
    residualPathIds: ["p-integrator-to-bms", "p-ews-to-bms", "p-ews-to-mech"]
  },
  {
    id: "ctl-broker-oem-access",
    title: same("Broker OEM access"),
    evaluates: same("Named accounts, MFA, approval, just-in-time sessions, jump host, recording, per-system authorization, session expiry"),
    outcome: same("Preserves support while removing persistent broad access"),
    insertAt: ["vendor-vpn-gateway"],
    /* "Removing persistent broad access" is the reach inward; "preserves
       support" is the vendor route itself, kept under session control. That is
       the exact distinction the insight column draws. */
    closesPathIds: ["p-fmn-to-ews"],
    preservesPathIds: ["p-oem-to-vpn", "p-vpn-to-fmn"],
    residualPathIds: ["p-integrator-to-bms", "p-ews-to-bms", "p-ews-to-mech"]
  },
  {
    id: "ctl-segment-bms-zones",
    title: same("Segment BMS engineering zones"),
    evaluates: same("Virtual firewall rules between vendor path, supervisory BMS, data-hall controls, chiller plant, DCIM, and corporate systems"),
    outcome: same("Shows which required protocols/flows remain and which attack routes close"),
    insertAt: ["facility-management-network", "bms-engineering-workstation"],
    closesPathIds: ["p-fmn-to-ews", "p-ews-to-mech"],
    preservesPathIds: ["p-bms-to-mech", "p-mech-to-plant"],
    /* `p-ews-to-bms` STAYS RESIDUAL. The row names a boundary between the vendor
       path and supervisory BMS, but never states that engineering access to the
       supervisory layer is itself removed — and closing it here would assert a
       stronger result than the source supports. */
    residualPathIds: ["p-integrator-to-bms", "p-ews-to-bms"]
  },
  {
    id: "ctl-separate-monitoring",
    title: same("Separate monitoring from control"),
    evaluates: same("Isolate EPMS/DCIM/BMS reporting feeds from configuration and command paths"),
    outcome: same("Reduces impact of a monitoring-platform compromise; exposes remaining control dependencies"),
    insertAt: ["bms-supervisory-server", "dcim-epms-platform"],
    /* CLOSES NOTHING, by the row's own reading. Isolating a reporting feed from a
       command path changes what a monitoring compromise reaches; it does not
       remove a route from this chain. The insight column says so itself — its
       stated result is that the remaining control dependencies are exposed. */
    closesPathIds: [],
    preservesPathIds: ["p-plant-to-bms", "p-bms-to-dcim"],
    residualPathIds: ["p-fmn-to-ews", "p-ews-to-bms", "p-ews-to-mech", "p-bms-to-mech", "p-integrator-to-bms"]
  },
  {
    id: "ctl-stage-firmware",
    title: same("Stage controller/firmware hardening"),
    evaluates: same("Pilot update on one noncritical or isolated element, validate rollback, then sequence across redundancy trains"),
    outcome: same("Reduces common-mode update risk and preserves capacity"),
    /* Inserted at the controller while closing no route — the row is about how an
       update is sequenced, not about reachability. */
    insertAt: ["mechanical-zone-controller"],
    closesPathIds: [],
    preservesPathIds: ["p-mech-to-plant", "p-plant-to-hall"],
    residualPathIds: ["p-oem-to-vpn", "p-vpn-to-fmn", "p-fmn-to-ews", "p-ews-to-bms", "p-ews-to-mech", "p-integrator-to-bms"]
  },
  {
    id: "ctl-independent-safeguards",
    title: same("Add independent operational safeguards"),
    evaluates: same("Local control, alarm annunciation, tested manual sequences, independent thermal monitoring, clean backups"),
    outcome: same("Reduces consequence if supervisory access or BMS availability is lost"),
    /* Three insertion points, each named by the row: local control and tested
       manual sequences at the controller and the plant, independent thermal
       monitoring at the hall. */
    insertAt: ["mechanical-zone-controller", "cooling-plant", "data-hall"],
    closesPathIds: [],
    preservesPathIds: ["p-mech-to-plant", "p-plant-to-hall"],
    residualPathIds: ["p-fmn-to-ews", "p-ews-to-bms", "p-ews-to-mech", "p-integrator-to-bms"]
  }
];
