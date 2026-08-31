import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * Same pattern as rail-transportation's `RailScenarioDiagram` — built from
 * this page's own real content (content.ts, `WORKED_EXAMPLE.chain`). Only
 * three of the six real chain steps are discrete assets here (the source's
 * own text is leaner than rail/energy's chains) — kept at three rather
 * than padding to a fourth node the source doesn't support. Step 2,
 * "Engineering workstation / control-zone reachability," names the
 * workstation as the concrete asset; "reachability" is a state, not a
 * second node. Step 3, "Reachable controller function or tag," is the
 * target — a specific addressable point within a controller (an I/O tag),
 * not the controller as a whole, so it renders as the controller-class
 * asset with that more precise label.
 *
 * No wrapping panel here (unlike rail/energy/hyperscale) — the caller
 * already wraps this section in `ManuCornerFrame` + a bordered panel, and
 * duplicating that chrome would double it up. `MANU_SCENARIO_CONSEQUENCE`
 * is exported for the caller to render as its own caption inside that
 * existing wrapper.
 */

const ASSETS: SystemAsset[] = [
  {
    id: "vendor-route",
    type: "remote-access",
    label: "Vendor remote-access route",
    description: "Vendor remote-access route."
  },
  {
    id: "engineering-workstation",
    type: "engineering-workstation",
    label: "Engineering workstation (control zone)",
    description: "Engineering workstation / control-zone reachability."
  },
  {
    id: "controller-tag",
    type: "controller",
    label: "Controller function or tag",
    description: "Reachable controller function or tag.",
    criticality: "critical"
  }
];

const PATHS: SystemPath[] = [
  { id: "p1", from: "vendor-route", to: "engineering-workstation", role: "vendor-access", status: "open" },
  { id: "p2", from: "engineering-workstation", to: "controller-tag", role: "attack-path", status: "open" }
];

export const MANU_SCENARIO_CONSEQUENCE =
  "Process deviation or loss of availability — production interruption, quality hold, repair, restart, and safety review — financial exposure and decision priority.";

export function ManuScenarioDiagram({ locale }: { locale: Locale }) {
  return (
    <TwinExplorer
      assets={ASSETS}
      paths={PATHS}
      locale={locale}
      title="Vendor remote-access route to a controller function"
    />
  );
}
