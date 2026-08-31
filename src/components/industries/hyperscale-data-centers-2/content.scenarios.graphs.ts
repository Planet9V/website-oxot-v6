/**
 * S07 · HYPERSCALE RISK SCENARIOS — the DERIVED half: typed graph geometry for
 * the five register rows whose source sentence states a relation.
 *
 * SPLIT OUT OF `content.scenarios.ts` rather than nested inside it. That file
 * holds twelve rows of four verbatim source cells each and would cross this
 * repository's 500-line cap (CLAUDE.md) once geometry was added; the boundary
 * chosen is the one the data itself already has — transcribed prose on one side,
 * derived structure on the other — so nothing is separated that belongs
 * together. Same technique `content.workedExample.canvas.ts` uses on the rail
 * page.
 *
 * ── THE RULE FOR WHETHER A ROW GETS A GRAPH AT ALL ─────────────────────────
 * A graph is drawn ONLY where the source states a RELATION between the assets
 * its pathway sentence names. Two forms qualify:
 *
 *   · an explicit REACH — "…reaches BMS server, engineering workstation, or
 *     controller network" (L296), "…reaches generator controllers…" (L298),
 *     "…bridges new build and live operational systems" (L305), "…crosses into
 *     a sovereign/defense-restricted environment" (L307);
 *   · an explicit DEPENDENCY DIRECTION with no attacker entry — "Shared
 *     firmware… affects redundant equipment trains" (L299), which names what
 *     depends on what without naming a route. That row's edge is
 *     `required-flow`, not `attack-path`, for exactly that reason.
 *
 * SEVEN OF THE TWELVE ROWS GET NO GRAPH and say why in place of one — see
 * `noGraphReason` in `content.scenarios.ts`. Do not "fix" them by adding nodes.
 *
 * ── WHAT IS DERIVED, AND ITS LIMITS ────────────────────────────────────────
 * Every node label below is the source row's own asset words. No vendor,
 * product, model number, protocol, site, hall, tier or capacity figure is
 * invented anywhere, and no node exists that the row does not name.
 *
 * AN "or" LIST IN THE SUBJECT POSITION IS ONE NODE, NOT SEVERAL. "Vendor
 * credential or maintenance gateway" (L296) is a single entry phrase naming
 * alternative ways in, so it is one entry node carrying the phrase, exactly as
 * `rail-transportation-2` draws "Vendor laptop or maintenance network". An "or"
 * list in the OBJECT position fans out from the entry instead of chaining
 * through, because the row lists those items side by side and a chain would
 * claim one sits behind another.
 *
 * EVERY EDGE IS `status: "open"`. The register shows modelled exposure BEFORE
 * controls are tested, and each row's fourth column is what the Twin would let
 * an operator test NEXT. An edge rendered `controlled` or `closed` would claim a
 * control already holds.
 *
 * `SystemAsset.label`/`.description` are already-localized plain strings by
 * contract (`@/components/twin/types`), so they are not `Bilingual`-typed here.
 * `diagramTitle` is prose and is.
 */
import type { Bilingual } from "@/i18n/bilingual";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import { same } from "../registry";

export interface ScenarioGraph {
  /** Already-localized `TwinExplorer` accessible name for the drawing. */
  diagramTitle: Bilingual;
  assets: SystemAsset[];
  paths: SystemPath[];
}

/**
 * Keyed by the scenario `id` in `content.scenarios.ts`. A record rather than a
 * field on each row so that a row without geometry costs nothing here and the
 * seven undrawn rows are visible by their absence.
 *
 * `satisfies` RATHER THAN AN ANNOTATION, deliberately: annotating this
 * `Record<string, ScenarioGraph>` would widen the keys to `string`, and a
 * mistyped lookup in `content.scenarios.ts` would then typecheck and resolve to
 * `undefined` at runtime — a scenario silently losing its drawing and falling
 * through to the no-graph branch with no reason printed. `satisfies` keeps the
 * five literal keys while still checking each value against the interface.
 */
export const SCENARIO_GRAPHS = {
  /* Source L296. REACH — "Vendor credential or maintenance gateway REACHES BMS
     server, engineering workstation, or controller network". Three reached
     items in an "or" list, so a FAN-OUT from the single entry phrase.
     `BMS server` is typed `service` and not `controller` or `hmi`: the row
     calls it a server, and typing it as control hardware would name a device
     class the source does not. The engineering workstation carries the
     `critical` mark because this row's own decision column asks to "restrict
     engineering functions" — the source names that as what is at stake. */
  "bms-vendor-remote-access": {
    diagramTitle: same(
      "Vendor credential or maintenance gateway reaching the BMS server, engineering workstation and controller network"
    ),
    assets: [
      {
        id: "bms-entry",
        type: "remote-access",
        label: "Vendor credential or maintenance gateway",
        description: "The vendor credential or maintenance gateway the row names as the way in."
      },
      {
        id: "bms-server",
        type: "service",
        label: "BMS server",
        description: "The building-management server named as reached on that pathway."
      },
      {
        id: "bms-ews",
        type: "engineering-workstation",
        label: "Engineering workstation",
        description: "The engineering workstation named as reached on the same pathway.",
        criticality: "critical"
      },
      {
        id: "bms-controller-net",
        type: "network-device",
        label: "Controller network",
        description: "The controller network named as reached on the same pathway.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "bms1", from: "bms-entry", to: "bms-server", role: "vendor-access", status: "open" },
      { id: "bms2", from: "bms-entry", to: "bms-ews", role: "vendor-access", status: "open" },
      { id: "bms3", from: "bms-entry", to: "bms-controller-net", role: "vendor-access", status: "open" }
    ]
  },

  /* Source L298. REACH — "Vendor tool or maintenance route REACHES generator
     controllers, synchronizing/paralleling switchgear, or fuel-management
     interface". Fan-out again, same grounds as L296.
     The fuel-management INTERFACE is typed `service`: the row calls it an
     interface and states no device behind it. The generator controllers carry
     `critical` because this row's impact column names failure to start and loss
     of standby resilience as the consequence. */
  "generator-paralleling": {
    diagramTitle: same(
      "Vendor tool or maintenance route reaching generator controllers, paralleling switchgear and the fuel-management interface"
    ),
    assets: [
      {
        id: "gen-entry",
        type: "remote-access",
        label: "Vendor tool or maintenance route",
        description: "The vendor tool or maintenance route the row names as the way in."
      },
      {
        id: "gen-controllers",
        type: "controller",
        label: "Generator controllers",
        description: "The generator controllers named as reached on that route.",
        criticality: "critical"
      },
      {
        id: "gen-switchgear",
        type: "process-equipment",
        label: "Synchronizing/paralleling switchgear",
        description: "The synchronizing and paralleling switchgear named as reached on the same route.",
        criticality: "critical"
      },
      {
        id: "gen-fuel",
        type: "service",
        label: "Fuel-management interface",
        description: "The fuel-management interface named as reached on the same route."
      }
    ],
    paths: [
      { id: "gen1", from: "gen-entry", to: "gen-controllers", role: "vendor-access", status: "open" },
      { id: "gen2", from: "gen-entry", to: "gen-switchgear", role: "vendor-access", status: "open" },
      { id: "gen3", from: "gen-entry", to: "gen-fuel", role: "vendor-access", status: "open" }
    ]
  },

  /* Source L299. DEPENDENCY DIRECTION, NO ATTACKER ENTRY — "Shared firmware,
     controller model, software update, or monitoring integration AFFECTS
     redundant equipment trains". Unlike the "Compromise affects <flat list>"
     rows, this sentence has a distinct subject and a distinct object, so the
     direction between them is stated rather than inferred.

     TWO NODES, AND THAT IS THE POINT. The shared element is ONE node carrying
     the row's own four-way "or" phrase, because the four are alternatives —
     drawing them as four parallel dependencies would claim all four hold at
     once. The redundant trains are ONE node too: the row writes "redundant
     equipment trains" and names no letters, so splitting them into an A train
     and a B train would print an annotation the source does not make, even
     though this row's own impact column says "A/B common-mode exposure".
     What remains is exactly the shape this page's section rule draws — one
     shared element standing across redundant paths.

     `required-flow`, NOT `attack-path`: the row states a dependency, and no
     route, entry or attacker appears anywhere in its pathway sentence. */
  "ups-bms-firmware": {
    diagramTitle: same("The shared element this row names, and the redundant equipment trains it affects"),
    assets: [
      {
        id: "fw-shared",
        type: "service",
        label: "Shared firmware, controller model, software update, or monitoring integration",
        description: "The shared element the row names as common to both equipment trains."
      },
      {
        id: "fw-trains",
        type: "process-equipment",
        label: "Redundant equipment trains",
        description: "The redundant equipment trains the row names as what the shared element affects.",
        criticality: "critical"
      }
    ],
    paths: [{ id: "fw1", from: "fw-shared", to: "fw-trains", role: "required-flow", status: "open" }]
  },

  /* Source L305. REACH, IN THE FORM OF A BRIDGE — "Temporary commissioning
     network, contractor device, or unsegmented tool BRIDGES new build and live
     operational systems". The row names both sides of the bridge and the thing
     standing across them, which is a relation stated three ways over.

     DIRECTION COMES FROM THE ROW'S OWN IMPACT COLUMN, not from an assumption:
     it names "disruption to existing live halls" as the consequence, so the
     drawing runs from the new build, through the bridging element, into live
     operational systems. Both environments are typed `service` because the row
     names them as environments and not as devices — the same refusal
     `rail-transportation-2` records for its "route-setting environment".
     `attack-path` is used here and nowhere else in this file: this is the one
     row whose impact column names malware. */
  "commissioning-laptop": {
    diagramTitle: same("A temporary commissioning element bridging the new build into live operational systems"),
    assets: [
      {
        id: "cx-newbuild",
        type: "service",
        label: "New build",
        description: "The new build the row names as one side of the bridge."
      },
      {
        id: "cx-bridge",
        type: "remote-access",
        label: "Temporary commissioning network, contractor device, or unsegmented tool",
        description: "The temporary element the row names as bridging the new build and live operations."
      },
      {
        id: "cx-live",
        type: "service",
        label: "Live operational systems",
        description: "The live operational systems the row names as the other side of the bridge.",
        criticality: "critical"
      }
    ],
    paths: [
      { id: "cx1", from: "cx-newbuild", to: "cx-bridge", role: "attack-path", status: "open" },
      { id: "cx2", from: "cx-bridge", to: "cx-live", role: "attack-path", status: "open" }
    ]
  },

  /* Source L307. REACH — "…pathway CROSSES INTO a sovereign/defense-restricted
     environment". One entry phrase, one environment behind it, one edge.

     THE EDGE IS `management`, NOT `attack-path`, and the distinction is the
     row's own: what crosses is a shared privileged-access, monitoring or
     facility-management pathway, and the row names no attacker and no
     compromise. Its consequence is a policy, contract or regulatory breach —
     the pathway existing across the boundary IS the finding. Drawing it as an
     attack path would add an adversary the source does not put there.

     Source L262 is in force on this page: nothing here markets the Twin as an
     intelligence or classified-system tool, and the environment is named in the
     row's own words with no capability claimed about it. */
  "restricted-workload-boundary": {
    diagramTitle: same("A shared support pathway crossing into the restricted environment"),
    assets: [
      {
        id: "rw-pathway",
        type: "remote-access",
        label: "Shared privileged-access, monitoring, or facility-management pathway",
        description: "The shared support pathway the row names as crossing the boundary."
      },
      {
        id: "rw-environment",
        type: "service",
        label: "Sovereign/defense-restricted environment",
        description: "The restricted environment the row names as what the pathway crosses into.",
        criticality: "critical"
      }
    ],
    paths: [{ id: "rw1", from: "rw-pathway", to: "rw-environment", role: "management", status: "open" }]
  }
} satisfies Record<string, ScenarioGraph>;
