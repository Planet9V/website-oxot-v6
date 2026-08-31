import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * Same pattern as rail-transportation's `RailScenarioDiagram` — a real
 * `TwinExplorer` topology in place of a plain-text chain list, built from
 * this page's own real content (content.ts, `WORKED_EXAMPLE.chain`), not
 * invented. `TwinExplorer` itself carries no energy-specific coupling.
 *
 * Chain steps 1-3 are concrete assets (vendor credential → DMZ/remote-
 * access route → engineering workstation). Step 4, "Reachable control,
 * protection, or unit-support component," names an asset *category* rather
 * than one specific device — the source text is deliberately generalized,
 * so the node renders with that same generalized label rather than
 * inventing a specific system (e.g. "PLC") the source never names. Steps 5
 * and 6 are consequence text, not assets, and render as the caption below —
 * same asset/consequence split rail's chain used.
 */

const ASSETS: SystemAsset[] = [
  {
    id: "vendor-credential",
    type: "remote-access",
    label: "Vendor / remote-support credential",
    description: "Vendor credentials or remote-support endpoint compromised."
  },
  {
    id: "dmz-route",
    type: "network-device",
    label: "Operational DMZ / remote-access route",
    description: "Operational DMZ / remote-access route."
  },
  {
    id: "engineering-workstation",
    type: "engineering-workstation",
    label: "Engineering workstation (OT zone)",
    description: "Engineering workstation in an OT zone."
  },
  {
    id: "control-component",
    type: "controller",
    label: "Control / protection / unit-support component",
    description: "Reachable control, protection, or unit-support component.",
    criticality: "critical"
  }
];

const PATHS: SystemPath[] = [
  { id: "p1", from: "vendor-credential", to: "dmz-route", role: "vendor-access", status: "open" },
  { id: "p2", from: "dmz-route", to: "engineering-workstation", role: "attack-path", status: "open" },
  { id: "p3", from: "engineering-workstation", to: "control-component", role: "attack-path", status: "open" }
];

const CONSEQUENCE =
  "Loss of view/control, unsafe configuration possibility, trip, or delayed recovery — lost generation, reliability impact, and outage and restoration cost.";

export function EnergyScenarioDiagram({ locale }: { locale: Locale }) {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="mono-label mb-5 text-muted-foreground">Modelled chain</p>
      <TwinExplorer
        assets={ASSETS}
        paths={PATHS}
        locale={locale}
        title="Vendor remote-access route to a control/protection component"
      />
      <p className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-muted-foreground">
        {CONSEQUENCE}
      </p>
    </div>
  );
}
