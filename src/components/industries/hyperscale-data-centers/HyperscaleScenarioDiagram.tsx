import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * Same pattern as rail-transportation's `RailScenarioDiagram` — built from
 * this page's own real content (content.ts, `WORKED_EXAMPLE.chain`).
 *
 * Step 1 names two nouns joined by "or" (compromised credential / remote-
 * support endpoint) — the endpoint is the discrete asset, the credential
 * compromise is the event on it, so the node represents the endpoint.
 * Step 2, "Shared facility-management access path," is a network segment,
 * not a single box — modelled the same way rail's "gateway" and energy's
 * "DMZ route" steps were: a network-device asset representing the path.
 * Step 4 names five specific control systems in one string (chiller, pump,
 * tower, VFD, valve) — kept as one controller-class asset carrying that
 * full list in its label, rather than inventing which single device the
 * source doesn't pick. Steps 5-6 are consequence text, not assets.
 */

const ASSETS: SystemAsset[] = [
  {
    id: "remote-support-endpoint",
    type: "remote-access",
    label: "Vendor remote-support endpoint",
    description: "Compromised vendor credential or remote-support endpoint."
  },
  {
    id: "facility-access-path",
    type: "network-device",
    label: "Shared facility-management access path",
    description: "Shared facility-management access path."
  },
  {
    id: "bms-workstation",
    type: "engineering-workstation",
    label: "BMS engineering workstation / supervisory control",
    description: "BMS engineering workstation / supervisory-control layer becomes reachable."
  },
  {
    id: "mechanical-controls",
    type: "controller",
    label: "Chiller / pump / tower / VFD / valve controls",
    description: "Chiller / pump / tower / VFD / valve control pathways potentially affected.",
    criticality: "critical"
  }
];

const PATHS: SystemPath[] = [
  { id: "p1", from: "remote-support-endpoint", to: "facility-access-path", role: "vendor-access", status: "open" },
  { id: "p2", from: "facility-access-path", to: "bms-workstation", role: "attack-path", status: "open" },
  { id: "p3", from: "bms-workstation", to: "mechanical-controls", role: "attack-path", status: "open" }
];

const CONSEQUENCE =
  "Loss of cooling visibility or impaired control during a physical event — redundancy consumed, hall capacity reduced, load shed or service-impact risk.";

export function HyperscaleScenarioDiagram({ locale }: { locale: Locale }) {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="mono-label mb-5 text-muted-foreground">Modelled chain</p>
      <TwinExplorer
        assets={ASSETS}
        paths={PATHS}
        locale={locale}
        title="Vendor remote-access route to mechanical cooling controls"
      />
      <p className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-muted-foreground">
        {CONSEQUENCE}
      </p>
    </div>
  );
}
