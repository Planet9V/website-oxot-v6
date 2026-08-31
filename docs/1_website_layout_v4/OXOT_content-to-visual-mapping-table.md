6. Add a content-to-visual mapping table
This will keep pages from becoming content-only.

Content type	Best OXOT visual treatment	Avoid
Operational consequence	Process-chain diagram	Generic warning card
Network path	Topology/pathway overlay	Random node graph
Risk prioritization	NOW / NEXT / deferred board	Traffic-light score alone
Investment decision	Risk-reduction curve	Generic ROI icon
Proposed control	Before/after route comparison	Checkmark list
Evidence provenance	Drill-down evidence chain	“Trusted” badge
Safety linkage	Hazard → barrier → consequence trace	Generic shield visual
Deployment boundary	Data-flow and trust-boundary diagram	Cloud icon cards
Product dependencies	BOM/dependency graph	Generic feature list
Industry relevance	Simplified sector system model	Stock photo and paragraph
7. Make the scenario data model explicit
The visual system will collapse if every industry page hard-codes diagrams differently.

Add a reusable TypeScript data contract:

ts
export type TwinView =
  | "process"
  | "purdue"
  | "network"
  | "attackPath"
  | "consequence";

export type SystemAsset = {
  id: string;
  label: string;
  type:
    | "process-equipment"
    | "field-device"
    | "controller"
    | "hmi"
    | "engineering-workstation"
    | "network-device"
    | "remote-access"
    | "safety-function"
    | "service";
  zone?: string;
  criticality?: "context" | "important" | "critical";
  description: string;
};

export type SystemPath = {
  id: string;
  from: string;
  to: string;
  protocol?: string;
  role: "required-flow" | "attack-path" | "management" | "vendor-access";
  status: "open" | "controlled" | "closed" | "unknown";
};

export type Consequence = {
  title: string;
  operationalEffect: string;
  safetyOrReliabilityContext?: string;
  businessImpact?: string;
  evidenceIds: string[];
};

export type ProposedControl = {
  id: string;
  title: string;
  type: "segmentation" | "brokered-access" | "patch" | "replacement";
  closesPathIds: string[];
  preservesPathIds: string[];
  residualPathIds: string[];
  implementationConstraint: string;
};

export type TwinScenario = {
  id: string;
  title: string;
  label: "Illustrative scenario — no customer data";
  industry: string;
  entryAssetId: string;
  targetAssetId: string;
  attackPathIds: string[];
  consequence: Consequence;
  controls: ProposedControl[];
};
This allows the same Twin Explorer to show:

text
Water:
Vendor route → dosing PLC → disinfection consequence

Rail:
Vendor route → engineering workstation → interlocking consequence

Hyperscale:
BMS access route → cooling plant controller → capacity consequence

Defense:
Support route → facilities engineering system → mission-support consequence
