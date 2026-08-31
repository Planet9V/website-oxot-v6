import { TwinExplorer } from "@/components/twin/TwinExplorer";
import type { SystemAsset, SystemPath } from "@/components/twin/types";
import type { Locale } from "@/i18n/config";

/**
 * A REAL interactive diagram, not another text chain. `RailWorkedExamples`'
 * passenger track already states its modelled chain as six plain bullet
 * points ("Compromised vendor credential…" → "Capacity loss, passenger
 * disruption…") — this renders the same real chain (content.ts,
 * `WORKED_EXAMPLES.passenger.chain`) as an actual `TwinExplorer` topology
 * instead, using `TwinExplorer`'s own general contract (`assets`/`paths`
 * props, industry-agnostic) rather than a rail-specific diagram component.
 * Any industry page can do the same thing with its own chain data — this
 * file is the pattern, not a one-off.
 *
 * The chain's first four steps are real assets (vendor credential → gateway
 * → engineering workstation → interlocking); the last two are consequence
 * text, not assets, and render as a caption beneath the diagram rather than
 * forced into the node graph — matching how `Consequence` stays a separate
 * field from `SystemAsset`/`SystemPath` in the real data contract
 * (OXOT_content-to-visual-mapping-table.md).
 */

const PASSENGER_ASSETS: SystemAsset[] = [
  {
    id: "vendor-credential",
    type: "remote-access",
    label: "Vendor remote-support credential",
    description: "Compromised vendor credential or remote-support endpoint."
  },
  {
    id: "jump-host",
    type: "network-device",
    label: "Maintenance jump host",
    description: "Remote-access gateway / maintenance jump host."
  },
  {
    id: "signaling-ews",
    type: "engineering-workstation",
    label: "Signaling engineering workstation",
    description: "Reachable signaling engineering workstation or configuration environment."
  },
  {
    id: "interlocking",
    type: "safety-function",
    label: "CBTC / interlocking configuration",
    description: "Potential impact on CBTC / interlocking / wayside configuration pathway.",
    criticality: "critical"
  }
];

const PASSENGER_PATHS: SystemPath[] = [
  { id: "p1", from: "vendor-credential", to: "jump-host", role: "vendor-access", status: "open" },
  { id: "p2", from: "jump-host", to: "signaling-ews", role: "attack-path", status: "open" },
  { id: "p3", from: "signaling-ews", to: "interlocking", role: "attack-path", status: "open" }
];

const PASSENGER_CONSEQUENCE =
  "Degraded train-control operation, service restriction, or recovery complication — capacity loss, passenger disruption, safety-management burden, and restoration cost.";

/**
 * Freight track, same source: content.ts `WORKED_EXAMPLES.freight.chain`.
 * "Reachable wayside equipment, PTC-support component, or field network" is
 * the controller-class asset; "Movement restriction, signal/interlocking
 * degradation, or PTC availability impact" names PTC — a specific, real
 * safety system — as the thing degraded, so it's the target safety-function
 * asset here, same treatment as the passenger chain's interlocking step.
 */
const FREIGHT_ASSETS: SystemAsset[] = [
  {
    id: "remote-support-path",
    type: "remote-access",
    label: "Remote-support path",
    description: "Compromised remote-support path."
  },
  {
    id: "maintenance-env",
    type: "network-device",
    label: "Signal / comms maintenance environment",
    description: "Signal / communications maintenance environment."
  },
  {
    id: "wayside-equipment",
    type: "controller",
    label: "Wayside / PTC-support equipment",
    description: "Reachable wayside equipment, PTC-support component, or field network."
  },
  {
    id: "ptc-availability",
    type: "safety-function",
    label: "PTC availability",
    description: "Movement restriction, signal/interlocking degradation, or PTC availability impact.",
    criticality: "critical"
  }
];

const FREIGHT_PATHS: SystemPath[] = [
  { id: "f1", from: "remote-support-path", to: "maintenance-env", role: "vendor-access", status: "open" },
  { id: "f2", from: "maintenance-env", to: "wayside-equipment", role: "attack-path", status: "open" },
  { id: "f3", from: "wayside-equipment", to: "ptc-availability", role: "attack-path", status: "open" }
];

const FREIGHT_CONSEQUENCE =
  "Train delays, congestion, dispatch workload, customer impact, and field recovery needs.";

const VARIANTS = {
  passenger: {
    assets: PASSENGER_ASSETS,
    paths: PASSENGER_PATHS,
    consequence: PASSENGER_CONSEQUENCE,
    title: "Vendor remote-access route to interlocking configuration"
  },
  freight: {
    assets: FREIGHT_ASSETS,
    paths: FREIGHT_PATHS,
    consequence: FREIGHT_CONSEQUENCE,
    title: "Remote-support route to PTC-support equipment"
  }
} as const;

export function RailScenarioDiagram({
  locale,
  variant = "passenger"
}: {
  locale: Locale;
  variant?: keyof typeof VARIANTS;
}) {
  const t = VARIANTS[variant];
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
      <p className="mono-label mb-5 text-muted-foreground">Modelled chain</p>
      <TwinExplorer assets={t.assets} paths={t.paths} locale={locale} title={t.title} />
      <p className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed text-muted-foreground">
        {t.consequence}
      </p>
    </div>
  );
}
