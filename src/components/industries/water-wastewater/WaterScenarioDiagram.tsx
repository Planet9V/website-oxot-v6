import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * Same pattern as rail-transportation's `RailScenarioDiagram` — built from
 * this page's own real content (content.ts, `WORKED_EXAMPLE.chain`).
 *
 * Water's real chain is leaner on discrete assets than rail/energy's: of
 * its six steps, only step 3 ("Chemical-dosing PLC or engineering
 * workstation becomes reachable") unambiguously names equipment. Rather
 * than force a fourth node the source doesn't clearly support, this uses
 * exactly the three real assets the chain supports — remote-support
 * endpoint (step 1), the maintenance network route (step 2), and the
 * dosing PLC (step 3, taking the PLC over "engineering workstation" since
 * this project's own OXOT_content-to-visual-mapping-table.md cites this
 * exact scenario as its canonical water example: "vendor route → dosing
 * PLC → disinfection consequence"). Steps 4-6 are consequence text.
 */

const ASSETS: SystemAsset[] = [
  {
    id: "remote-support-endpoint",
    type: "remote-access",
    label: "Vendor remote-support endpoint",
    description: "Compromised vendor credentials / remote-support endpoint."
  },
  {
    id: "maintenance-network-route",
    type: "network-device",
    label: "Maintenance network route",
    description: "Maintenance network route."
  },
  {
    id: "dosing-plc",
    type: "controller",
    label: "Chemical-dosing PLC",
    description: "Chemical-dosing PLC or engineering workstation becomes reachable.",
    criticality: "critical"
  }
];

const PATHS: SystemPath[] = [
  { id: "p1", from: "remote-support-endpoint", to: "maintenance-network-route", role: "vendor-access", status: "open" },
  { id: "p2", from: "maintenance-network-route", to: "dosing-plc", role: "attack-path", status: "open" }
];

const CONSEQUENCE =
  "Setpoint, logic, mode, or pump-state manipulation becomes possible — inadequate or excessive disinfection, loss of treatment verification — water-quality event, emergency response, service disruption, public-health risk.";

export function WaterScenarioDiagram({ locale }: { locale: Locale }) {
  return (
    <div className="mt-10 max-w-xl rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="mono-label mb-5 text-muted-foreground">Modelled chain</p>
      <TwinExplorer
        assets={ASSETS}
        paths={PATHS}
        locale={locale}
        title="Vendor remote-access route to chemical-dosing PLC"
      />
      <p className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-muted-foreground">
        {CONSEQUENCE}
      </p>
    </div>
  );
}
