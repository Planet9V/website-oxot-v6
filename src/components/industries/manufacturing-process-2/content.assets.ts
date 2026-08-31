/**
 * S03 · THE NINE ASSET CLASSES, MANUFACTURING & PROCESS — data only. The
 * renderer is the real, shared `src/components/twin/AssetClassBento.tsx`, which
 * is not rebuilt here.
 *
 * EVERY ASSET IS TRANSCRIBED FROM A REAL LINE OF
 * `new_material_source/1_website_layout_v4/3_industries/industry_manu-process.md`.
 * The section is not in that spec's own page-structure list — it is added
 * because the spec's "Common architecture" stack (L114–132) and its
 * technology/data-source list (L136–140) map cleanly onto the nine
 * `SystemAsset.type` values. Each record below carries its source line inline.
 * No vendor, product or named site is invented; labels are type-representative
 * names only.
 *
 * CRITICALITY DERIVATION — A DOCUMENTED GAP FILL. The manufacturing spec
 * assigns no criticality tiers, so this tiering is derived, not transcribed,
 * and the derivation is stated here rather than left implicit. The rule is
 * TIER POSITION IN THE SPEC'S OWN SIX-TIER STACK (L115–131), read top to
 * bottom — the spec orders those tiers itself, so the ordering is the spec's,
 * not this file's:
 *
 *   - critical: `Safety and critical control` (L127–128 → `safety-function`)
 *     and `Control` (L124–125 → `controller`, `hmi`, `network-device`).
 *   - important: `Operations management` (L121–122 →
 *     `engineering-workstation`, `service`) and `Field and process`
 *     (L130–131 → `process-equipment`, `field-device`).
 *   - context: `Enterprise / IT` (L115–116) and `Industrial DMZ` (L118–119 →
 *     `remote-access`).
 *
 * ONE KNOWN FRICTION, DOCUMENTED RATHER THAN SILENTLY OVERRIDDEN. L66–69 names
 * process equipment — line, reactor, furnace, kiln, compressor — as a top
 * consequence driver, which argues for `critical`. The tier-position rule above
 * nonetheless yields `important` for `process-equipment`, because the spec
 * places that equipment in the `Field and process` tier (L130–131). The rule is
 * applied as written and the tension is recorded here; it is not hand-corrected
 * for one record, because a rule that is overridden wherever it is inconvenient
 * stops being a derivation and becomes a guess with a docblock.
 *
 * COUNTS: 4 critical / 4 important / 1 context. Note this differs from the
 * 3 / 4 / 2 split anticipated when this slice was scoped: applying the stated
 * rule strictly puts `network-device` in `critical` (its stack position is
 * `Control`, L125 "industrial switches" — L138 is a data-source list, not a
 * stack tier) and `service` in `important` (`Operations management`, L122 —
 * L139 is likewise a data-source list). Manufacturing's stack has six tiers to
 * Energy's five, so its split is expected to differ from Energy's 3 / 5 / 1
 * either way.
 *
 * The middle tier is spelled `"important"` because that is the value in the
 * `AssetCriticality` union in `@/components/twin/types.ts`. That union is
 * shared with the Twin diagram and is not widened for one page.
 */
import { same } from "../registry";
import type { SystemAsset } from "@/components/twin/types";

export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes, from the business systems down to the furnace floor."),
  intro: same(
    "OXOT models the plant as it operates, not as a flat asset inventory. The Twin recognises nine asset classes across the six layers a process site actually runs on, banded here by where the plant's own architecture puts them — safety and control first, the enterprise edge last."
  ),
  assets: [
    {
      id: "safety-instrumented-systems",
      type: "safety-function",
      label: "SIS, safety PLCs and critical interlocks",
      /* L127–128: the "Safety and critical control" tier. */
      description:
        "Safety-instrumented systems, safety PLCs, critical interlocks and burner/furnace protection — the tier that sits above control, and the barrier that has to hold when control does not.",
      criticality: "critical"
    },
    {
      id: "control-system-controllers",
      type: "controller",
      label: "DCS, PLCs and remote I/O",
      /* L124–125: the controller half of the "Control" tier. */
      description:
        "The DCS, PLCs and remote I/O that hold the process. Their logic, configuration and setpoints are what stand between a reachable pathway and a loss of control.",
      criticality: "critical"
    },
    {
      id: "scada-and-hmi",
      type: "hmi",
      label: "SCADA and HMIs",
      /* L124–125: the operator-interface half of the "Control" tier. */
      description:
        "SCADA and the HMIs on the plant floor, sitting on the same control tier as the DCS, PLCs and remote I/O they display and command.",
      criticality: "critical"
    },
    {
      id: "ot-network-devices",
      type: "network-device",
      label: "Industrial switches, firewalls and VLANs",
      /* L125 (industrial switches, inside the "Control" tier) read together
         with L138 (firewalls, VLANs, routing, topology exports and Purdue/zone
         definitions in the OT-network data sources). */
      description:
        "Industrial switches sitting inside the control tier itself, plus the firewalls, VLANs, routing and zone definitions around it — the topology that decides which of these assets can actually reach which.",
      criticality: "critical"
    },
    {
      id: "engineering-workstations",
      type: "engineering-workstation",
      label: "Engineering workstations",
      /* L121–122: the "Operations management" tier. */
      description:
        "The workstations in the operations-management tier where ladder logic, DCS configuration, SCADA/HMI projects and alarm and interlock logic are authored and loaded down into control.",
      criticality: "important"
    },
    {
      id: "operations-management-services",
      type: "service",
      label: "MES, batch systems, historians and CMMS/EAM",
      /* L121–122 (MES, batch systems and historians in the
         "Operations management" tier) read together with L139 (CMMS/EAM and
         asset management in the operations-and-enterprise data sources). */
      description:
        "MES, batch systems and historians in the operations-management tier, alongside the CMMS/EAM and asset-management records that schedule and document the plant rather than run it.",
      criticality: "important"
    },
    {
      id: "process-equipment",
      type: "process-equipment",
      label: "Furnaces, reactors, kilns and packaging lines",
      /* L130–131: the equipment half of the "Field and process" tier, with
         consequence framing from L66. */
      description:
        "Furnaces, reactors, kilns and packaging lines. Stopping a line, reactor, furnace, kiln, compressor or utility system creates quality loss, restart risk, lost production and safety exposure — which is why this tier is where a cyber pathway stops being theoretical.",
      criticality: "important"
    },
    {
      id: "field-instrumentation",
      type: "field-device",
      label: "Sensors, valves, drives, motors and pumps",
      /* L130–131: the instrumentation half of the "Field and process" tier. */
      description:
        "Sensors, valves, drives, motors and pumps across the process — the measurement and actuation the control tier reads and drives, and the point where a manipulated setpoint becomes physical movement.",
      criticality: "important"
    },
    {
      id: "dmz-remote-access",
      type: "remote-access",
      label: "Jump hosts and vendor remote-access routes",
      /* L118–119 (jump hosts, patch repositories, data transfer and security
         services in the "Industrial DMZ" tier) read together with L151 (the
         vendor remote-access scenario). */
      description:
        "Jump hosts, patch repositories and data-transfer services in the industrial DMZ. A compromised vendor account or an unmanaged remote route through this tier is the first risk scenario in the register below.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};
