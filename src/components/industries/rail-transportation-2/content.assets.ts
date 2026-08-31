/**
 * S04 · THE NINE ASSET CLASSES, RAIL & TRANSPORTATION — data only. The renderer
 * is the real, shared `src/components/twin/AssetClassBento.tsx`, which is not
 * rebuilt here.
 *
 * SOURCE. `new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md`. The section is not in that brief's own
 * page-structure list — it is added because the brief supplies TWO complete
 * architecture stacks (passenger L113–136, freight L171–194, both transcribed
 * verbatim in the sibling `content.architecture.ts`) whose elements map cleanly
 * onto the nine `SystemAsset.type` values, plus scenario rows at L151–161 and
 * L211–222 that name the engineering and remote-access tooling the stacks
 * themselves do not. Every record below cites its source lines inline. No
 * vendor, product or named railway is invented; labels are type-representative
 * names assembled from the source's own element strings.
 *
 * ONE COMBINED INVENTORY, NOT A THIRD TOGGLE. Building the mapping surfaced the
 * reason: all nine classes appear in BOTH stacks. Not one class is unique to a
 * segment. A second segment selector on this section would therefore make the
 * reader operate a control that changes almost nothing, on a page that already
 * carries one segment toggle for the architecture — where the segments really
 * do change the whole canvas. What differs between segments is not WHICH class
 * exists but WHERE it sits and WHAT it is called, so that is what `zone` and the
 * descriptions carry, per class, in one list.
 *
 * `zone` NAMES BOTH SEGMENTS' ARCHITECTURE TIERS. `SystemAsset.zone` is a real
 * contract field ("Purdue/network zone"), and every value below is a tier name
 * lifted from `content.architecture.ts` — the class's home in the passenger
 * stack and its home in the freight stack, separated by `·`. KNOWN FRICTION:
 * `AssetClassBento` does not currently render `zone` (it reads `type`, `label`,
 * `description` and `criticality` only), so this is correct data that is
 * presently invisible. The shared component is out of this slice's scope and is
 * not edited to suit one page, so each description also states its segment
 * context in prose — the reader gets it either way, and `zone` is already right
 * for whichever surface renders it next.
 *
 * CRITICALITY DERIVATION — A DOCUMENTED GAP FILL. The rail brief assigns no
 * criticality tiers, so this tiering is derived, not transcribed. The rule is
 * THE BRIEF'S OWN DIRECT-SAFETY SENTENCE AT L81, which exists precisely to draw
 * this line: a rail system that fails safe produces an operational consequence,
 * "conversely, a cyber route affecting an interlocking, wayside controller,
 * movement-authority system, protection function, dispatcher environment, or
 * traction-power control can create a more direct safety concern." That named
 * list is the critical band, item for item:
 *
 *   - `controller`         ← "interlocking", "wayside controller" (L81)
 *   - `safety-function`    ← "protection function" (L81)
 *   - `hmi`                ← "dispatcher environment" (L81)
 *   - `process-equipment`  ← "traction-power control" (L81)
 *
 * Extended by exactly one class, on the brief's only other explicit safety
 * label outside L81: `field-device`, because L219 scores a grade-crossing
 * compromise as "Public safety risk" in its own impact column. Everything else
 * that is real OT infrastructure or a real access path is `important`;
 * back-office systems that record, route and schedule operations rather than
 * execute movement are `context`.
 *
 * COUNTS: 5 critical / 3 important / 1 context. That is a heavier critical band
 * than Energy's 3 or Manufacturing's 4, and it is the honest result of applying
 * a safety-worded rule to a safety-regulated sector: L81 names six things, and
 * five of the nine classes are among them.
 *
 * THREE FRICTIONS, RECORDED RATHER THAN HAND-CORRECTED. A rule overridden
 * wherever it is inconvenient stops being a derivation and becomes a guess with
 * a docblock, so none of these are patched:
 *   1. `service` lands in `context`, yet L216 gives a PTC back-office or
 *      key-management disruption "Large-scale PTC degradation, movement
 *      restrictions… cross-network effects" — a wider blast radius than
 *      "context" suggests. L81 does not name it, so the rule holds.
 *   2. `service` also carries passenger information, and L160 ties a
 *      passenger-information outage to "unsafe passenger flow". Same answer:
 *      not on L81's list.
 *   3. `process-equipment` is critical on traction power (L81), but the same
 *      record also holds the freight inverters and battery systems (L192–193),
 *      whose own scenario at L222 is scored only "Availability loss or
 *      safety/recovery complication in support infrastructure". The class takes
 *      the tier of its strongest member; the weaker one rides along.
 *
 * The middle tier is spelled `"important"` because that is the value in the
 * `AssetCriticality` union in `@/components/twin/types.ts`. That union is shared
 * with the Twin diagram and is not widened for one page.
 */
import { same } from "../registry";
import type { SystemAsset } from "@/components/twin/types";

export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes — and both segments run all nine."),
  intro: same(
    "Passenger transit and freight rail are different railways, and this page keeps them apart everywhere the architecture actually diverges. Here it does not: every one of the nine classes the Twin models turns up in both stacks. What changes between segments is where a class sits and what the railway calls it, so the inventory is read once, banded by the brief's own line between a system that fails safe and a route to a more direct safety concern."
  ),
  assets: [
    {
      id: "interlockings-and-wayside-controllers",
      type: "controller",
      label: "Interlockings, wayside controllers, CBTC zone controllers and CTC",
      zone: "Train control and signaling (passenger) · Wayside and territory systems (freight)",
      /* Passenger L126: "CBTC zone controllers", "wayside controllers",
         "interlockings". Freight L184: "CTC", "interlockings", "signal houses".
         Critical per L81 ("interlocking", "wayside controller"). */
      description:
        "CBTC zone controllers, wayside controllers and interlockings on the passenger side; CTC, interlockings and signal houses across freight territory. This is the equipment route setting and train separation actually run on, and the brief names a cyber route to it as a direct safety concern rather than an availability problem.",
      criticality: "critical"
    },
    {
      id: "protection-and-train-protection",
      type: "safety-function",
      label: "ETCS/ATP, ATO/ATP onboard equipment, PTC onboard and fire/life safety",
      zone: "Train control and signaling, Station and infrastructure OT (passenger) · Rolling-stock systems (freight)",
      /* Passenger L126 ("ETCS / ATP"), L134 ("ATO/ATP equipment"), L131
         ("fire/life safety"). Freight L188 ("PTC onboard equipment").
         Critical per L81 ("protection function"); PTC integrity framing L200. */
      description:
        "ETCS and ATP wayside and onboard equipment, ATO/ATP on the train, PTC onboard equipment on the locomotive, and the fire and life-safety systems in stations and tunnels. These are the functions that are supposed to hold when control does not — the brief notes that degraded PTC availability restricts movement, while an integrity failure may have safety implications.",
      criticality: "critical"
    },
    {
      id: "control-centre-and-dispatch",
      type: "hmi",
      label: "ATS, OCC systems and CAD / dispatch",
      zone: "Rail operations control center (passenger) · Dispatch and railroad operations (freight)",
      /* Passenger L123: "ATS", "OCC systems", "CAD / dispatch". Freight L178:
         "CAD / dispatch", "traffic management". Critical per L81 ("dispatcher
         environment"); dispatch centrality L204. */
      description:
        "The ATS and OCC systems a transit control centre works from, and the CAD, dispatch and traffic-management environment a freight railroad authorises movement from. The brief puts the dispatcher environment on its short list of places where a cyber route becomes a safety concern, and separately notes that dispatching outages produce immediate service and safety-management consequences.",
      criticality: "critical"
    },
    {
      id: "traction-power-and-inverters",
      type: "process-equipment",
      /* Substations, inverters and batteries - NOT generation, so the IEC
         transformer rather than a rotating machine. Was a water cistern. */
      symbol: "oxot/electrical/transformer",
      label: "Traction power SCADA, substations, power inverters and battery systems",
      zone: "Station and infrastructure OT (passenger) · Yard, terminal, and infrastructure OT (freight)",
      /* Passenger L130: "Traction power SCADA". Freight L192–193: "Power
         inverters", "battery systems", "facility SCADA". Critical per L81
         ("traction-power control"); inverter/battery framing L209 (FRA 2026
         safety alert), scenario L157. */
      description:
        "SCADA control of traction-power substations, switchgear and third-rail or overhead line equipment, plus the networked power inverters and battery systems the FRA's 2026 safety alert says should be treated as OT in their own right. Losing power to a section suspends service, strands trains and reaches straight into tunnel and station operations.",
      criticality: "critical"
    },
    {
      id: "wayside-detection-and-crossings",
      type: "field-device",
      label: "Axle counters, track circuits, WIUs, grade crossings and defect detectors",
      zone: "Train control and signaling (passenger) · Wayside and territory systems (freight)",
      /* Passenger L127: "axle counters", "track circuits". Freight L184:
         "WIUs", "grade crossings", "defect detectors". Critical on L219, the
         brief's own "Public safety risk" scoring for a grade-crossing
         compromise; occupancy detection framing L143; WIU scenario L215. */
      description:
        "Track occupancy detection — axle counters and track circuits — alongside the wayside interface units, grade-crossing systems and defect detectors spread across a freight network. Grade crossings are the one field class the brief scores as a public-safety risk outright, not just a road and rail disruption.",
      criticality: "critical"
    },
    {
      id: "train-ground-and-field-communications",
      type: "network-device",
      label: "Train-ground radio, communications towers and fiber / microwave / cellular links",
      zone: "Train control and signaling (passenger) · PTC and train-control services, Wayside and territory systems (freight)",
      /* Passenger L127: "Radio / wireless train-ground communications". Freight
         L181 ("radio networks") and L185 ("Communications towers", "base
         stations", "fiber / microwave / cellular links"). Important, not
         critical: not on L81's list, and the CBTC-comms scenario at L155 is
         scored as degraded mode, reduced headways and line suspension —
         operational. Distribution framing L208. */
      description:
        "Radio and wireless train-ground communications on a metro line, and the towers, base stations and fiber, microwave and cellular links a freight railroad's PTC, dispatch and wayside control depend on across thousands of route miles. Losing a communications path drops trains into degraded mode and costs headway rather than safety margin.",
      criticality: "important"
    },
    {
      id: "signalling-engineering-tooling",
      type: "engineering-workstation",
      label: "Interlocking configuration tools, signal maintenance network and maintenance laptops",
      zone: "Rolling stock and depots (passenger) · Signal maintenance network (freight, named by scenario)",
      /* Passenger L134 ("maintenance laptops") and the interlocking-engineering
         scenario at L156 ("interlocking configuration tools", "route-setting
         environment"). Freight L218 ("signal maintenance network, interlocking
         tooling"). Important: this is the path to the critical assets, not the
         function itself. */
      description:
        "The interlocking configuration tools and route-setting environment on the passenger side, the signal maintenance network and interlocking tooling on the freight side, and the maintenance laptops that reach both. This is where signalling configuration is authored and loaded — a pathway into the critical band rather than a part of it.",
      criticality: "important"
    },
    {
      id: "vendor-and-remote-maintenance-access",
      type: "remote-access",
      label: "Remote access, jump hosts and the operational DMZ",
      zone: "Operations and security boundary (passenger) · No equivalent tier named (freight)",
      /* Passenger L120: "remote access", "jump hosts", "operational DMZ", in
         the brief's only named security-boundary tier. Freight names no
         equivalent tier — its remote paths appear in scenarios instead: L218
         (signal-house remote access) and L220 (locomotive maintenance vendor
         tool). Passenger scenarios L156, L159. Important: an access route, not
         an L81 safety function. */
      description:
        "Vendor and maintenance access into the railway: the remote-access services, jump hosts and operational DMZ the passenger architecture names as a tier of its own, and the remote maintenance paths that reach freight signal houses and locomotive diagnostics without any equivalent tier being drawn around them.",
      criticality: "important"
    },
    {
      id: "back-office-and-passenger-services",
      type: "service",
      label: "PTC back-office server, key management, timetable and passenger information",
      zone: "Rail operations control center (passenger) · PTC and train-control services (freight)",
      /* Freight L181: "Back office server", "key management", "PTC message
         routing". Passenger L123 ("timetable", "incident management") and L117
         ("customer information"). Context: not on L81's list. Frictions 1 and 2
         in this file's docblock (L216, L160) are recorded there, not corrected
         here. */
      description:
        "The PTC back-office server, key management and message routing behind freight train control, and the timetable, incident-management and passenger-information services behind a transit operation. They authorise, record and communicate movement rather than execute it in the field.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};
