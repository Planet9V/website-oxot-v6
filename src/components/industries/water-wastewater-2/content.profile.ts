/**
 * THE HYDRAULIC PROFILE — the two process chains the hero canvas draws, and
 * the control/comms overlays the source lists beneath both of them (L44–57).
 *
 * Split out of `content.ts` because that file crossed this repository's
 * 500-line cap. The split is along a section boundary, not an arbitrary line:
 * everything the hero diagram reads lives here, and nothing else does.
 *
 * ONE THING HERE IS NOT LITERALLY IN THE SOURCE and is called out rather than
 * buried: `grade`, which stage sits at a lower hydraulic grade than the one
 * before it, and `lift`, where head is put back. That is real hydraulics — a
 * lift station lifts; a high-service pump restores head — not invented data,
 * and it carries no numbers. No elevation, chainage, flow or set point appears
 * anywhere on this page, because the source states none and inventing one
 * would be fake data on a page whose argument is that evidence is traceable.
 */
import { same } from "../registry";

/* ── The hydraulic profile: both chains, both shared layers ─────────────── */

export interface ProfileStage {
  id: string;
  name: ReturnType<typeof same>;
  /** Relative hydraulic grade, 1 (lowest) to 6 (highest). Real hydraulics, no
   *  numbers claimed: gravity falls through treatment, pumping lifts. */
  grade: number;
  /** True where the stage is where head is added rather than lost. */
  lift?: boolean;
}

export interface ProfileSystem {
  id: "drinking" | "wastewater";
  label: ReturnType<typeof same>;
  stages: ProfileStage[];
  /** The control and communications overlays the source lists beneath BOTH
   *  chains (L52–57). Rendered as bands spanning every stage, never assigned
   *  stage-by-stage — the source assigns no control to any single stage, and
   *  guessing one would be fabricated. */
  controlLayer: ReturnType<typeof same>;
  commsLayer: ReturnType<typeof same>;
  /** The real cyber route this system carries, from the source's own scenario
   *  table. `targetStageId` names the stage the route reaches. */
  route: {
    title: ReturnType<typeof same>;
    entry: ReturnType<typeof same>;
    targetStageId: string;
    consequence: ReturnType<typeof same>;
    impact: ReturnType<typeof same>;
  };
}

export const PROFILE: ProfileSystem[] = [
  {
    id: "drinking",
    label: same("Drinking water"),
    stages: [
      { id: "source", name: same("Source"), grade: 6 },
      { id: "intake", name: same("Intake"), grade: 5 },
      { id: "treatment", name: same("Treatment"), grade: 4 },
      { id: "clearwell", name: same("Clearwell"), grade: 3 },
      { id: "pumping", name: same("Pumping"), grade: 6, lift: true },
      { id: "distribution", name: same("Distribution"), grade: 4 },
      { id: "customers", name: same("Customers"), grade: 3 }
    ],
    controlLayer: same("Pump controls · chemical dosing skids · analyzers · PLCs · RTUs · SCADA"),
    commsLayer: same("Telemetry · radio / cellular links · remote engineering access"),
    route: {
      title: same("Drinking-water chemical dosing manipulation"),
      entry: same("Remote engineering access"),
      targetStageId: "treatment",
      consequence: same("Inadequate residual"),
      impact: same(
        "Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."
      )
    }
  },
  {
    id: "wastewater",
    label: same("Wastewater"),
    stages: [
      { id: "collection", name: same("Collection"), grade: 3 },
      { id: "lift-station", name: same("Lift station"), grade: 6, lift: true },
      { id: "headworks", name: same("Headworks"), grade: 5 },
      { id: "biological", name: same("Biological treatment"), grade: 4 },
      { id: "disinfection", name: same("Disinfection"), grade: 3 },
      { id: "effluent", name: same("Effluent / reuse"), grade: 2 },
      { id: "receiving", name: same("Receiving water"), grade: 1 }
    ],
    controlLayer: same("Pump controls · level instrumentation · analyzers · PLCs · RTUs · SCADA"),
    commsLayer: same("Telemetry · radio / cellular links · remote engineering access"),
    route: {
      title: same("Wastewater lift-station outage"),
      entry: same("Remote telemetry path"),
      targetStageId: "lift-station",
      consequence: same("Wet-well overflow"),
      impact: same("Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting.")
    }
  }
];
