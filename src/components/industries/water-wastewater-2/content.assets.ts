/**
 * S03 · THE NINE ASSET CLASSES — data only. The renderer is the real, shared
 * `src/components/twin/AssetClassBento.tsx`, which is not rebuilt here.
 *
 * One asset per `SystemAsset.type`, all nine, each named by the source brief
 * itself: the dosing skid, chlorine-residual analyzer, chemical-dosing PLC,
 * local HMI, engineering workstation, SCADA server, vendor remote-support
 * endpoint, high/low dosing alarm interlock and historian all appear in the
 * worked example's evidence lists, its control table, or the technology table.
 * Criticality follows the source's own language about consequence, never copy
 * length.
 *
 * TIER ENCODING, POST-REBUILD (2026-08-25). The renderer no longer sizes any
 * cell by criticality — area was found to be an unreliable channel for a
 * 3-tier ordinal value, especially across similarly-shaped rectangles. Tier
 * is now carried by which of three horizontal bands (Critical / Important /
 * Context) an asset renders in, plus a visible band label and a single-hue
 * rail-intensity step. Every card within a band is uniform size, and every
 * card's full description renders unclamped — the earlier hero-cell
 * line-clamp arithmetic this comment used to document (a 378-vs-130-character
 * hero-to-2x1 ratio, a required 1.5x visible-prose floor) described machinery
 * that no longer exists and has been removed rather than left to go stale.
 *
 * THE BENTO IS NOT A HEIGHT-RATIO GROUP, by construction: bands render at
 * different natural heights because criticality tiers hold different numbers
 * of assets (3 critical / 5 important / 1 context here), not because of a
 * layout defect. Marking it as a `data-balance-group` would fail on every
 * page for a reason that isn't a real imbalance. This section's floor is
 * still a CONTENT floor: every asset's description renders in full, never
 * routed to `sr-only` to save space.
 */
import { same } from "../registry";
import type { SystemAsset } from "@/components/twin/types";

export const SYSTEM_ASSETS = {
  h2: same("Nine asset classes, grouped by what a compromise costs the process."),
  intro: same(
    "The Twin's inventory is a taxonomy, not a catalogue. Each band below groups the nine asset classes the model recognises by process consequence — not by how much was written about each one."
  ),
  assets: [
    {
      id: "chemical-dosing-skid",
      type: "process-equipment",
      label: "Chemical dosing skid",
      /* 378 characters. Sourced from L86 (a manipulated dosing skid reaching
         water quality), L174 (the chemical-feed path and its impact) and L91
         (the chemical inventory and its handling, dosing and containment
         concerns). Real, brief-derived prose — nothing invented to reach a
         length. */
      description:
        "Chlorine, hypochlorite, fluoride, coagulant, pH, caustic and acid feed equipment — the metering pumps a dosing PLC drives. A manipulated skid produces under- or over-dosing, inadequate residual, or a corrosion-control deviation: a water-quality event that can reach consumers, alongside a chemical inventory that still has to be handled, dosed and contained safely.",
      criticality: "critical"
    },
    {
      id: "dosing-plc",
      type: "controller",
      label: "Chemical-dosing PLC",
      description: "Runs the dosing sequence from incoming flow, residual feedback, pump status, tank level and alarms.",
      criticality: "critical"
    },
    {
      id: "dosing-alarm-interlock",
      type: "safety-function",
      label: "High/low dosing alarm interlock",
      description:
        "Independent alarming and chemical-tank high/low conditions — the barrier that holds if digital control does not.",
      criticality: "critical"
    },
    {
      id: "chlorine-residual-analyzer",
      type: "field-device",
      label: "Chlorine residual analyzer",
      description:
        "Residual, turbidity, pH, ORP and UV-transmittance instrumentation — the measurement that confirms disinfection is holding.",
      criticality: "important"
    },
    {
      id: "local-hmi",
      type: "hmi",
      label: "Local HMI",
      description: "The operator interface beside the dosing PLC, reachable through the same maintenance network.",
      criticality: "important"
    },
    {
      id: "engineering-workstation",
      type: "engineering-workstation",
      label: "Engineering workstation",
      description:
        "PLC programming, configuration and project files — and the vendor-support entry point into plant control.",
      criticality: "important"
    },
    {
      id: "scada-server",
      type: "network-device",
      label: "SCADA server",
      description:
        "SCADA data flow and alarm dependencies: historian, alarm management and remote telemetry all pass through here.",
      criticality: "important"
    },
    {
      id: "remote-support-endpoint",
      type: "remote-access",
      label: "Vendor remote-support endpoint",
      description:
        "The system integrator's remote troubleshooting connection into the maintenance network. Persistent, broad, and operationally relied upon.",
      criticality: "important"
    },
    {
      id: "historian",
      type: "service",
      label: "Historian",
      description: "Operations record-keeping, alongside alarm-management, CMMS/EAM and laboratory information systems.",
      criticality: "context"
    }
  ] satisfies SystemAsset[]
};
