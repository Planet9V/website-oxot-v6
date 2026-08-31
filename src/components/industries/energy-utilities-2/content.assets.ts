/**
 * S03 · THE NINE ASSET CLASSES, ENERGY & UTILITIES — data only. The renderer
 * is the real, shared `src/components/twin/AssetClassBento.tsx`, which is not
 * rebuilt here. This is Pattern 3's first Energy application; it was proven on
 * the water-sector pages first.
 *
 * EVERY ASSET IS TRANSCRIBED FROM A REAL LINE OF
 * `new_material_source/1_website_layout_v4/3_industries/industry_energy.md`.
 * The section is not in that spec's own page-structure list — it is added
 * because the spec's architecture stack (L100–116) and technology/data-source
 * table (L118–127) map cleanly onto the nine `SystemAsset.type` values. Each
 * record below carries its source line inline. No vendor, product or named
 * site is invented; labels are type-representative names only.
 *
 * CRITICALITY DERIVATION — A DOCUMENTED GAP FILL. The energy spec assigns no
 * criticality tiers, so this tiering is derived, not transcribed, and the
 * derivation is stated here rather than left implicit:
 *
 *   - critical: `process-equipment`, `controller`, `safety-function` — these
 *     are the assets whose compromise directly produces the consequence list
 *     at L56 (trip, loss of control, outage, safety event) and/or sit inside
 *     protection-system integrity (L82).
 *   - standard: `field-device`, `hmi`, `engineering-workstation`,
 *     `network-device`, `remote-access` — supporting OT infrastructure and
 *     access paths, not themselves the protection/control function.
 *   - context: `service` — enterprise/historian-type systems (EMS/ADMS/
 *     historian/outage-management), supporting but not operationally critical
 *     in the same sense.
 *
 * The middle tier is written above as "standard" because that is the reviewed
 * derivation's own word; the `AssetCriticality` union in
 * `@/components/twin/types.ts` spells that same tier `"important"`, and that
 * is the value the records use. Same tier, existing vocabulary — the union is
 * shared with the Twin diagram and is not widened for one page.
 *
 * Counts: 3 critical / 5 important / 1 context.
 *
 * ── SYMBOLS: NO SLUG IS SET HERE, AND THAT IS THE MEASURED ANSWER ─────────
 *
 * Checked 2026-08-29 against `docs/diagram-system/using-the-library.md` §10.2,
 * whose test is not "could a published mark be named" but "do two marks in this
 * drawing share a silhouette while carrying different meanings". They do not.
 * Nine assets, nine DISTINCT `SystemAssetType` values, one each — so
 * `AssetClassBento` draws nine different silhouettes, and the ww3 defect that
 * `symbol` exists to fix (twelve nodes sharing nine marks) has no instance on
 * this section. Naming slugs anyway would swap correct marks for different
 * correct marks and buy a reader nothing.
 *
 * TWO MARKS ARE NONETHELESS IMPERFECT, and they are recorded rather than
 * silently accepted. Both are blocked on `CURATED_SYMBOLS` in
 * twin/AssetNode.tsx, which this page does not own, and both are the SAME two
 * gaps `content.workedExample.ts` lists — one fix in that table serves both
 * sections, which is why neither is worked around locally:
 *
 *   generation-and-network-plant  `process-equipment` draws draw.io's open-
 *                                 topped water cistern. False for generators,
 *                                 transformers, switchgear and batteries.
 *                                 Needs an IEC 60617 rotating-machine mark,
 *                                 which no curated module publishes yet.
 *   protection-relay-ied          `safety-function` draws the hand-drawn
 *                                 octagon. `oxot/electrical/measuring_relay`
 *                                 (the IEC `I>` rectangle) is the right mark and
 *                                 already exists in
 *                                 twin/electrical-instruments-hand-drawn.tsx;
 *                                 it is simply not in the curated table.
 */
import { same } from "../registry";
import type { SystemAsset } from "@/components/twin/types";

export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes, from the switchyard to the control room."),
  intro: same(
    "The Twin recognises nine asset classes across the energy estate. They are banded here by what a compromise costs the process — the trip, loss of control, outage or safety event the spec traces at the end of its own attack path — not by how much was written about each one."
  ),
  assets: [
    {
      id: "generation-and-network-plant",
      type: "process-equipment",
      /* ISO 10628-2 C0079. Was the generic process-equipment silhouette: an
         open-topped WATER CISTERN standing for generation and switchgear. */
      symbol: "oxot/electrical/generator",
      label: "Generation, switchgear and storage plant",
      /* L113–115: the "Field / physical assets" layer of the architecture
         stack. Consequence framing from L56. */
      description:
        "Generators, transformers, switchgear, feeders, turbines and batteries, alongside the pumps, compressors and valves at substations and plant. This is the layer where a cyber route becomes a trip, an outage that propagates, or a safety event.",
      criticality: "critical"
    },
    {
      id: "control-and-automation-controllers",
      type: "controller",
      label: "DCS, PLC, RTU and turbine/inverter controls",
      /* L111: the "Control and protection" layer, controller half. */
      description:
        "The DCS, PLCs, RTUs and turbine/inverter controls that hold the process. Their logic, configuration and setpoints are what stand between a compromised path and a loss of control.",
      criticality: "critical"
    },
    {
      id: "protection-relay-ied",
      type: "safety-function",
      label: "Protection relay / IED",
      /* L111 (IEDs, relays) read together with L82 (protection-system
         integrity). */
      description:
        "Relays and IEDs, and the settings, time synchronisation, communications and engineering access they depend on. Incorrect values here affect fault detection, isolation and restoration — the barrier that has to hold when control does not.",
      criticality: "critical"
    },
    {
      id: "field-instrumentation",
      type: "field-device",
      label: "Meters, sensors, actuators and valves",
      /* L115: the instrumentation half of the field/physical asset layer. */
      description:
        "Meters, sensors, actuators and valves distributed across substations, renewable sites and plant — the measurement and actuation the control layer reads and drives.",
      criticality: "important"
    },
    {
      id: "operator-hmi",
      type: "hmi",
      label: "Operator HMI",
      /* L111: HMIs, in the control-and-protection layer. */
      description:
        "The operator interface onto control and protection, sitting on the same layer as the DCS, PLCs and RTUs it displays.",
      criticality: "important"
    },
    {
      id: "engineering-workstation",
      type: "engineering-workstation",
      label: "Engineering workstation",
      /* L108: "engineering tools", in the control-centre / plant-operations
         layer. */
      description:
        "The engineering tools in the control centre and plant operations layer — where control and protection configuration is authored and loaded.",
      criticality: "important"
    },
    {
      id: "ot-network-and-communications",
      type: "network-device",
      label: "Substation LAN/WAN, firewalls and gateways",
      /* L124: the OT network and communications information domain. */
      description:
        "Substation LAN/WAN paths, firewalls, VLANs and serial/Ethernet gateways — the topology that decides which of these assets can actually reach which.",
      criticality: "important"
    },
    {
      id: "remote-support-gateway",
      type: "remote-access",
      label: "Remote-support gateway / jump host",
      /* L105 (jump hosts and remote-support gateways in the operational DMZ)
         read together with L86 (OEM and service-provider access). */
      description:
        "Jump hosts and remote-support gateways in the operational DMZ. OEMs and service providers often require access through them to turbines, inverters, protection relays, DCS, PLCs and monitoring platforms.",
      criticality: "important"
    },
    {
      id: "control-centre-services",
      type: "service",
      label: "EMS, ADMS/DMS, SCADA and historian",
      /* L108: the control-centre / plant-operations services layer. */
      description:
        "EMS, ADMS, DMS, SCADA, historians and outage management — the systems that record and dispatch operations rather than execute the protection or control function themselves.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};
