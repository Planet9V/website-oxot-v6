import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * Same pattern as rail-transportation's `RailScenarioDiagram` — but this
 * page's real `WORKED_EXAMPLE.chain` (content.ts) is written almost
 * entirely in consequence/state-change language, not named-asset language
 * — unlike rail/energy/hyperscale, only its first step names a concrete
 * asset ("vendor remote-support endpoint"). The two other real assets this
 * scenario needs — "a facilities engineering workstation," "BMS/EPMS
 * management systems" — are named in the scenario's own prose paragraph,
 * not the chain array. Synthesized from both rather than force a node the
 * chain array alone doesn't support. The remaining chain steps (BMS/EPMS
 * impairment through alternate-site decisions) stay consequence text.
 */

const ASSETS: SystemAsset[] = [
  {
    id: "vendor-remote-support",
    type: "remote-access",
    label: "Vendor remote-support endpoint",
    description: "Compromised vendor remote-support endpoint (regional utility instability as concurrent condition)."
  },
  {
    id: "facilities-ews",
    type: "engineering-workstation",
    label: "Facilities engineering workstation",
    description: "Facilities engineering workstation with access paths toward BMS/EPMS management systems."
  },
  {
    id: "bms-epms",
    type: "controller",
    label: "BMS / EPMS management systems",
    description: "BMS/EPMS visibility or generator-control-management functions.",
    criticality: "critical"
  }
];

const PATHS: SystemPath[] = [
  { id: "p1", from: "vendor-remote-support", to: "facilities-ews", role: "vendor-access", status: "open" },
  { id: "p2", from: "facilities-ews", to: "bms-epms", role: "attack-path", status: "open" }
];

const CONSEQUENCE =
  "Standby-power response and operator situational awareness degraded — fuel, cooling, secure communications, and critical-service capacity constrained — essential-government workload prioritization and alternate-site decisions triggered.";

export function DefenseScenarioDiagram({ locale }: { locale: Locale }) {
  return (
    <div className="mt-10 border border-border p-6 sm:p-8">
      <p className="mono-label mb-6 text-muted-foreground">Modelled cascade</p>
      <TwinExplorer
        assets={ASSETS}
        paths={PATHS}
        locale={locale}
        title="Vendor remote-access route to BMS/EPMS management systems"
      />
      <p className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-muted-foreground">
        {CONSEQUENCE}
      </p>
    </div>
  );
}
