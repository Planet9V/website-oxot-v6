/**
 * The registers behind the briefing: invariants, the mode matrix, the
 * mandatory-elements register, accepted inputs, intelligence-refresh
 * options, the pathway list and the onward document links.
 *
 * Split from ./content.ts to keep both files well under the 500-line limit,
 * the same split assurance/iec-62443 makes with content-tables.ts.
 *
 * WHY THE MODE COMPARISON IS A MATRIX AND NOT THREE CARDS. The three modes
 * differ in exactly one respect — what crosses the boundary — and a reader
 * evaluating approvability is checking one attribute at a time across all
 * three ("is there an outbound path in any of these?"). Three cards force
 * that reader to hold three separate descriptions in their head and diff
 * them. Rows keyed by attribute answer the question by being read across.
 * /deployment-sovereignty deliberately does the opposite, drawing each mode
 * as its own trust-boundary figure, because a reader being persuaded needs
 * the shape rather than the comparison. Same three modes, two genuinely
 * different artefacts.
 *
 * `Bilingual` via `same()` — both locales render, `nl` is a same-as-English
 * placeholder pending translation.
 */
import { same } from "@/components/industries/registry";
import type { Bilingual } from "@/i18n/bilingual";

export interface RegisterRow {
  /** The register ID. Stable, and quotable in an email back to us. */
  id: string;
  term: Bilingual;
  body: Bilingual;
}

/** §02 — what holds in every mode. */
export const INVARIANT_ROWS: readonly RegisterRow[] = [
  {
    id: "INV-01",
    term: same("No agents"),
    body: same(
      "Nothing is installed on a PLC, RTU, safety controller, HMI or engineering workstation. There is no OXOT software on the process network in any mode."
    )
  },
  {
    id: "INV-02",
    term: same("No active scanning"),
    body: same(
      "No discovery sweep, port scan, protocol probe or credentialed check is run against production. Network evidence is customer-supplied passive capture, never traffic OXOT generated."
    )
  },
  {
    id: "INV-03",
    term: same("No control actions"),
    body: same(
      "No set point, configuration write or command is issued to an operational system. The Twin models the environment; it does not operate it, and no mode adds a path that would let it."
    )
  },
  {
    id: "INV-04",
    term: same("No vendor telemetry"),
    body: same(
      "No usage, model content or operational data is returned to OXOT by default, and no remote administration channel is opened. Where an outbound path exists at all, the customer has approved it explicitly."
    )
  },
  {
    id: "INV-05",
    term: same("Customer-held control"),
    body: same(
      "Identity, roles, privileged access, audit logging and update approval sit with the customer in every mode, on customer-owned or accredited infrastructure."
    )
  }
];

/** §03 — the matrix column heads: the three modes, with their reference. */
export const MODE_HEADS: readonly { ref: string; name: Bilingual }[] = [
  { ref: "M1", name: same("Island Mode") },
  { ref: "M2", name: same("Inbound Intelligence Mode") },
  { ref: "M3", name: same("Dedicated Sovereign Instance") }
];

export interface MatrixRow {
  attribute: Bilingual;
  /** One cell per mode, in MODE_HEADS order. */
  cells: readonly [Bilingual, Bilingual, Bilingual];
}

/**
 * §03 — the mode matrix. Read down a column for one mode; read across a row
 * to compare one attribute. The rows an evaluator checks first — inbound,
 * outbound, internet route, contact with the process network — come before
 * the rows about what each mode is for.
 */
export const MODE_MATRIX: readonly MatrixRow[] = [
  {
    attribute: same("In one line"),
    cells: [
      same("Fully isolated deployment on customer-controlled infrastructure."),
      same("One-way data diode admits approved threat and vulnerability updates."),
      same("Single-tenant deployment in a customer-approved sovereign environment.")
    ]
  },
  {
    attribute: same("Boundary"),
    cells: [
      same("Sealed enclave. Nothing crosses in either direction."),
      same("Sealed enclave with exactly one permitted crossing."),
      same("Tenancy boundary inside a customer-approved region and control plane.")
    ]
  },
  {
    attribute: same("Inbound path"),
    cells: [
      same("None. Curated intelligence packages are carried in by your own authorised team."),
      same("One-way data diode. Signed, versioned packages only; each clears an approval gate."),
      same("Named integrations, defined in the deployment agreement, reading inward only.")
    ]
  },
  {
    attribute: same("Outbound path"),
    cells: [
      same("None."),
      same("None. Blocked by construction — the diode is one-way hardware, not a firewall rule."),
      same("None to OXOT. Evidence outputs go to your own people and your own systems.")
    ]
  },
  {
    attribute: same("Internet route"),
    cells: [
      same("No internet connection at all."),
      same("No routable connection. A diode admits data; it is not a route."),
      same("Customer-approved and region-bound, fixed in the deployment agreement.")
    ]
  },
  {
    attribute: same("Contact with process network"),
    cells: [
      same("None — see INV-01 to INV-03."),
      same("None — see INV-01 to INV-03."),
      same("None — see INV-01 to INV-03.")
    ]
  },
  {
    attribute: same("Intelligence currency"),
    cells: [
      same("On your import schedule. Approved local data and curated packages."),
      same("Periodic refresh of vulnerability, advisory and supplier data through the diode."),
      same("Continuous within the approved region, subject to the same approval gates.")
    ]
  },
  {
    attribute: same("Systems of record"),
    cells: [
      same("File exports carried through the approved import workflow."),
      same("File exports, as Island Mode. The diode carries intelligence, not integrations."),
      same("Asset management, historians, network monitoring, service management — read conduits.")
    ]
  },
  {
    attribute: same("Tenancy"),
    cells: [
      same("Wholly within your enclave. No tenancy question arises."),
      same("Wholly within your enclave. No tenancy question arises."),
      same("Single-tenant. No shared infrastructure, storage, model content, key material or identity.")
    ]
  },
  {
    attribute: same("Additional element to evidence"),
    cells: [
      same("Media handling and import workflow for the offline package chain."),
      same("Diode acceptance test, plus the package signing and rollback chain."),
      same("Tenancy separation evidence and region or jurisdiction attestation.")
    ]
  },
  {
    attribute: same("Typically approvable for"),
    cells: [
      same("Highly classified or tightly controlled systems, where no outbound path is approvable."),
      same("Sensitive systems where policy permits inbound-only transfer and a periodic refresh."),
      same("Data-residency and sovereignty requirements a shared service cannot meet.")
    ]
  }
];

/** §04 — the mandatory technical elements, with the party that holds each. */
export type ElementOwner = "C" | "O" | "J";

/** What each owner code expands to. The chip in the register is one letter,
 *  which is meaningless read aloud — this is its accessible name, not
 *  decoration, so it is content and lives here rather than in the kit. */
export const OWNER_NAMES: Record<ElementOwner, Bilingual> = {
  C: same("Customer-held"),
  O: same("OXOT product commitment"),
  J: same("Agreed jointly before deployment")
};

export interface ElementRow extends RegisterRow {
  owner: ElementOwner;
}

export const ELEMENT_ROWS: readonly ElementRow[] = [
  {
    id: "MTE-01",
    owner: "C",
    term: same("Infrastructure"),
    body: same("Deployment on customer-owned or accredited infrastructure. No third-party hosting by default.")
  },
  {
    id: "MTE-02",
    owner: "O",
    term: same("Vendor dependency"),
    body: same("No SaaS dependency, no external telemetry and no vendor remote administration unless you have asked for it.")
  },
  {
    id: "MTE-03",
    owner: "C",
    term: same("Identity and access"),
    body: same("Local identity, RBAC, a privileged-access workflow and audit logging, all under your own administration.")
  },
  {
    id: "MTE-04",
    owner: "J",
    term: same("Import workflow"),
    body: same(
      "Approved data schema, media handling, malware scanning, signing and provenance checks, agreed before the first import."
    )
  },
  {
    id: "MTE-05",
    owner: "J",
    term: same("Update packages"),
    body: same("Cryptographically signed offline update packages, under version control, with a tested rollback.")
  },
  {
    id: "MTE-06",
    owner: "C",
    term: same("Handling domains"),
    body: same("Separate handling domains for unclassified, sensitive and classified model data, with no mixing in storage.")
  },
  {
    id: "MTE-07",
    owner: "C",
    term: same("Approval gates"),
    body: same("A gate on every external intelligence feed and every model update, reviewable before it applies.")
  },
  {
    id: "MTE-08",
    owner: "C",
    term: same("Continuity"),
    body: same("Local backup, recovery and disaster-recovery procedures held inside the boundary, not by the vendor.")
  },
  {
    id: "MTE-09",
    owner: "O",
    term: same("Control boundary"),
    body: same(
      "A stated separation between the Twin, which models the environment, and the operational systems, which it does not control."
    )
  },
  {
    id: "MTE-10",
    owner: "O",
    term: same("Passive posture"),
    body: same("The INV-01 to INV-03 invariants, carried as a product commitment rather than a deployment setting.")
  }
];

/** §05 — accepted engineering exports, with the form each arrives in. */
export const INPUT_ROWS: readonly { term: Bilingual; body: Bilingual; form: Bilingual }[] = [
  {
    term: same("Process and instrumentation"),
    body: same("P&IDs and single-line diagrams for the facility in scope."),
    form: same("PDF / CAD export")
  },
  {
    term: same("Asset records"),
    body: same("Equipment registers and asset lists as maintained, not as originally designed."),
    form: same("CSV / register export")
  },
  {
    term: same("Control system configuration"),
    body: same("PLC, SCADA, RTU and HMI configuration exports for the control logic being modelled."),
    form: same("Vendor project export")
  },
  {
    term: same("Network topology"),
    body: same("Zone and conduit layout, routes, segmentation rules and firewall configuration."),
    form: same("Diagram + config export")
  },
  {
    term: same("Observed traffic"),
    body: same("Approved passive capture. Captured by you, on your schedule, from your own monitoring."),
    form: same("PCAP / flow records")
  },
  {
    term: same("Safety and reliability"),
    body: same("FMECA, hazard records and operating procedures, so consequence comes from your engineering."),
    form: same("Document set")
  },
  {
    term: same("Product and supply chain"),
    body: same("Firmware inventory, SBOM / HBOM / CBOM and maintenance records."),
    form: same("SPDX / CycloneDX / documents")
  },
  {
    term: same("Local threat data"),
    body: same("Approved vulnerability and advisory material already held inside the boundary."),
    form: same("Curated package")
  }
];

/** §06 — the three intelligence-refresh options. */
export const INTEL_ROWS: readonly {
  option: Bilingual;
  mechanism: Bilingual;
  cadence: Bilingual;
  record: Bilingual;
}[] = [
  {
    option: same("Fully isolated"),
    mechanism: same("Approved local data and curated intelligence packages only."),
    cadence: same("Whenever your team prepares one."),
    record: same("Package manifest and local approval record.")
  },
  {
    option: same("Controlled media import"),
    mechanism: same("An authorised team validates and imports signed update bundles."),
    cadence: same("On an agreed schedule."),
    record: same("Media handling log, signature check, version and rollback point.")
  },
  {
    option: same("One-way data diode"),
    mechanism: same("Approved intelligence flows in through one-way hardware; nothing flows out."),
    cadence: same("Per feed, within the diode's approved window."),
    record: same("Feed approval gate, package signature and diode transfer log.")
  }
];

/** §07 — pathways an air gap does not close. Short by design: this is a
 *  caution list an evaluator scans, not an argument. */
export const PATHWAY_ROWS: readonly Bilingual[] = [
  same("Removable media, and the workflow that authorises it."),
  same("Contractor laptops and maintenance tooling brought on site."),
  same("Temporary connections opened for a commissioning or outage window."),
  same("Engineering workstations that touch both sides of a segmentation boundary."),
  same("Supply-chain and firmware updates arriving through an approved channel."),
  same("Authorised cross-domain processes, and the people who operate them.")
];

/**
 * §08 — where to go next. `path` is locale-free; the component prefixes it.
 *
 * `enOnly` is load-bearing, not metadata. /technical-specification calls
 * `notFound()` on any locale other than "en" (see its page.tsx), so an
 * unguarded link to it from the Dutch render of this page is a link to a
 * 404. The component filters on this flag rather than the reader finding
 * out. Every other destination here renders both locales.
 */
export const RELATED_LINKS: readonly {
  path: string;
  label: Bilingual;
  body: Bilingual;
  enOnly?: true;
}[] = [
  {
    path: "/deployment-sovereignty",
    label: same("Deployment & data sovereignty"),
    body: same(
      "The full narrative treatment: each boundary drawn as a trust-boundary diagram with a plain-language equivalent, plus the governance argument behind this register."
    )
  },
  {
    path: "/technical-specification",
    label: same("Technical specification"),
    body: same("The engine these modes host — what the model is made of and what it produces."),
    enOnly: true
  },
  {
    path: "/resources/product-sheet",
    label: same("Product sheet"),
    body: same("Two minutes on what the Cyber Digital Twin is and which decisions it makes answerable.")
  },
  {
    path: "/assurance/iec-62443",
    label: same("IEC 62443"),
    body: same(
      "Zones, conduits and traceable risk-treatment decisions — the regime most sovereign OT deployments are assessed against."
    )
  },
  {
    path: "/assurance/evidence-data-provenance",
    label: same("Evidence & data provenance"),
    body: same("How a figure traces back to the engineering document behind it, and what the model does when nothing does.")
  }
];
