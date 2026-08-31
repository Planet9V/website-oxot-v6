import { same } from "@/components/industries/registry";
import type { Bilingual } from "@/i18n/bilingual";

/**
 * The structured data behind the three trust-boundary diagrams, plus the
 * page's three tables.
 *
 * Split from ./content.ts to keep both files under the 500-line limit —
 * the same split assurance/iec-62443 makes with content-tables.ts.
 *
 * WHY THIS IS DATA AND NOT MARKUP: OXOT_Visual_Foundation_Spec.md's
 * "Deliverable 6" table specifies, per mode, what the diagram MUST show —
 * and the three requirements differ in exactly one respect, the crossing.
 * Island Mode: "no external arrow". Inbound Intelligence Mode: "one-way
 * data-diode arrow pointing into the Twin; no outbound arrow". Dedicated
 * Sovereign Instance: "single-tenant boundary, customer-approved
 * region/control plane, defined integrations". Modelling that as a
 * discriminated union means the difference between the three diagrams is
 * declared once, here, and cannot drift out of step with the prose beside
 * it — where three separately hand-drawn figures would.
 *
 * Every mode carries the same mandatory common elements the same spec
 * requires: passive-first, the approved-export list, and customer-held
 * identity/audit/governance. Those are properties of the deployment, not
 * of the mode, so they are repeated on all three diagrams rather than
 * stated once and assumed.
 *
 * SYNTHETIC AND NOTIONAL, per the same spec's instruction that "defense/
 * government examples must be notional and synthetic". Nothing here names
 * or describes a real site, network, programme or classified system.
 */

/** What the boundary lets through. The only thing that differs per mode. */
export type Crossing =
  | {
      /* Island Mode: nothing crosses. No inbound feed, no outbound
         telemetry, no arrow on the diagram at all. */
      kind: "sealed";
      outsideLabel: Bilingual;
      outsideItems: readonly Bilingual[];
      barLabel: Bilingual;
      barBody: Bilingual;
    }
  | {
      /* Inbound Intelligence Mode: exactly one arrow, pointing in, through
         a one-way data diode. The return direction is drawn and explicitly
         barred, because an absent arrow and a blocked arrow are different
         claims and only the second one is being made here. */
      kind: "diode";
      outsideLabel: Bilingual;
      outsideItems: readonly Bilingual[];
      inLabel: Bilingual;
      inBody: Bilingual;
      outLabel: Bilingual;
      outBody: Bilingual;
    }
  | {
      /* Dedicated Sovereign Instance: no air gap to draw, so the diagram's
         subject is the tenancy boundary instead — a single-tenant instance
         inside a customer-approved region, with named integrations that
         read inward only. */
      kind: "tenant";
      regionLabel: Bilingual;
      regionBody: Bilingual;
      neighbours: Bilingual;
      conduitsLabel: Bilingual;
      conduits: readonly Bilingual[];
      conduitNote: Bilingual;
    };

export type ModeSpec = {
  id: string;
  n: string;
  name: Bilingual;
  /** The one-line claim from the Deliverable 6 table. */
  statement: Bilingual;
  body: Bilingual;
  approvable: Bilingual;
  crossing: Crossing;
  /** The Twin's own box, inside the customer boundary. */
  twinLabel: Bilingual;
  twinItems: readonly Bilingual[];
  /**
   * The plain-language equivalent of the drawing, required by the spec's
   * acceptance criteria ("All diagrams have plain-language text
   * equivalents"). Rendered as visible text under each figure rather than
   * as a hidden alt string — a sighted reader checking which way an arrow
   * points benefits from it too.
   */
  textEquivalent: Bilingual;
};

/** Inside the boundary in every mode: the enclave and the untouched plant. */
export const ENCLAVE = {
  label: same("Customer-controlled environment"),
  note: same(
    "Customer-owned or accredited infrastructure. Customer-held identity, roles, audit logging and update approval."
  ),
  importsLabel: same("Approved engineering and OT data exports"),
  /* The spec's mandatory list, in the source document's own order. */
  imports: [
    same("P&IDs and single-line diagrams"),
    same("Asset lists and records"),
    same("PLC / SCADA / RTU / HMI configuration exports"),
    same("Network topology"),
    same("Approved PCAP / flow evidence"),
    same("Safety and reliability records — FMECA, hazards, procedures"),
    same("Firmware, SBOM / HBOM / CBOM, maintenance records")
  ],
  /* The row every diagram ends on. Same text in all three, because it is
     the same commitment in all three. */
  untouchedLabel: same("Live process network — not touched, in any mode"),
  untouched: [
    same("PLCs"),
    same("RTUs"),
    same("Safety controllers"),
    same("HMIs"),
    same("Engineering workstations")
  ],
  untouchedNote: same("No agent installed. No active scan. No control action. No configuration write.")
};

export const MODE_SPECS: readonly ModeSpec[] = [
  {
    id: "island-mode",
    n: "4.1",
    name: same("Island Mode"),
    statement: same("Fully isolated deployment. No external dependency and no direct access to control systems."),
    body: same(
      "Isolated, on your own ground, with no external dependencies. The Twin receives only approved local data and curated intelligence packages, runs its model, analysis, simulation and evidence outputs locally, and has no internet connection and no outbound telemetry of any kind. Your own model, inside your own boundary."
    ),
    approvable: same(
      "Highly classified or tightly controlled systems, and any environment where an outbound path is not approvable at all."
    ),
    crossing: {
      kind: "sealed",
      outsideLabel: same("Outside the boundary"),
      outsideItems: [
        same("Public internet"),
        same("Vendor cloud / SaaS"),
        same("OXOT remote administration"),
        same("Live external threat and CVE feeds")
      ],
      barLabel: same("No crossing"),
      barBody: same(
        "Zero flows in either direction. No inbound feed, no outbound telemetry, no vendor remote administration, no customer-data export."
      )
    },
    twinLabel: same("OXOT Cyber Digital Twin — Island Mode"),
    twinItems: [
      same("Local model and analysis"),
      same("Local simulation"),
      same("Local evidence outputs"),
      same("Customer-controlled users and roles")
    ],
    textEquivalent: same(
      "Text equivalent: a single customer-controlled boundary contains the approved data exports and the Twin. Outside the boundary sit the public internet and vendor cloud services. No arrow crosses the boundary in either direction. Inside it, the approved exports feed the Twin; the Twin has no connection to the live process network, which is drawn separately and untouched."
    )
  },
  {
    id: "inbound-intelligence-mode",
    n: "4.2",
    name: same("Inbound Intelligence Mode"),
    statement: same("Approved intelligence can enter. Customer engineering and operational data does not leave."),
    body: same(
      "A data diode limits data to inbound only. Approved threat, vulnerability and supplier intelligence streams into the Cyber Digital Twin; nothing exits. The enclave is otherwise identical to Island Mode — same imports, same local analysis, same absence of any path to a controller — with exactly one permitted flow added, in one direction, through hardware that cannot pass traffic the other way."
    ),
    approvable: same(
      "Sensitive systems where policy permits inbound-only transfer, and disconnected environments needing a periodic vulnerability or threat refresh."
    ),
    crossing: {
      kind: "diode",
      outsideLabel: same("Outside the boundary"),
      outsideItems: [
        same("Curated threat and vulnerability packages"),
        same("CVE and advisory data"),
        same("Supplier and product security notices")
      ],
      inLabel: same("Inbound only — one-way data diode"),
      inBody: same(
        "Signed, versioned intelligence packages pass into the enclave through the diode. Each feed and each model update clears an approval gate before it lands, and can be rolled back."
      ),
      outLabel: same("Outbound"),
      outBody: same(
        "Blocked by construction. No customer engineering data, operational data, model content or vendor telemetry leaves the enclave. The diode is one-way hardware, not a firewall rule."
      )
    },
    twinLabel: same("OXOT Cyber Digital Twin — Inbound Intelligence Mode"),
    twinItems: [
      same("Local model and analysis"),
      same("Local simulation"),
      same("Local evidence outputs"),
      same("Refreshed vulnerability and threat context")
    ],
    textEquivalent: same(
      "Text equivalent: the same customer-controlled boundary as Island Mode, with exactly one arrow crossing it. That arrow points inward only — from curated intelligence packages, through a one-way data diode, into the Twin. The outbound direction is drawn and marked blocked; no arrow leaves the boundary. The Twin still has no connection to the live process network."
    )
  },
  {
    id: "dedicated-sovereign-instance",
    n: "4.3",
    name: same("Dedicated Sovereign Instance"),
    statement: same("Dedicated deployment aligned to sovereignty and access requirements."),
    body: same(
      "A single-tenant instance in a customer-approved region and control plane, aligned to your data sovereignty requirements. No infrastructure, storage, model content or identity is shared with another tenant. Integrations to your systems of record are defined explicitly, named in the deployment agreement, and read inward — there is still no path from the Twin to a controller."
    ),
    approvable: same(
      "Sovereignty and data-residency requirements a shared service cannot meet, where a connected deployment is nonetheless approvable."
    ),
    crossing: {
      kind: "tenant",
      regionLabel: same("Customer-approved region and control plane"),
      regionBody: same(
        "Region, jurisdiction and control plane are chosen by the customer and fixed in the deployment agreement. Identity, roles, audit logging and update approval remain customer-held, as in every other mode."
      ),
      neighbours: same("No shared infrastructure, storage, model content, key material or identity with any other tenant."),
      conduitsLabel: same("Defined integrations — inbound reads only"),
      conduits: [
        same("Asset management"),
        same("Historians"),
        same("Network monitoring"),
        same("Service management")
      ],
      conduitNote: same(
        "Each conduit is named, one-directional and agreed before deployment. An integration is a source the Twin reads, never a channel through which the Twin acts."
      )
    },
    twinLabel: same("OXOT Cyber Digital Twin — single-tenant instance"),
    twinItems: [
      same("Dedicated model and analysis"),
      same("Dedicated storage and key material"),
      same("Customer-held identity and audit"),
      same("Evidence outputs to your people")
    ],
    textEquivalent: same(
      "Text equivalent: an outer band marks the customer-approved region and control plane. Inside it, a single-tenant boundary contains the Twin and its dedicated storage; neighbouring tenants are drawn outside that boundary with no path across it. Four named integrations cross the tenant boundary inward only, each drawn as an arrow pointing at the Twin. The Twin still has no connection to the live process network."
    )
  }
];

/** Section 05 — the intelligence-update options, from the source document. */
export const INTEL_ROWS: readonly { option: Bilingual; how: Bilingual; best: Bilingual }[] = [
  {
    option: same("Fully isolated"),
    how: same("The Twin receives only approved local data and curated intelligence packages."),
    best: same("Highly classified or tightly controlled systems.")
  },
  {
    option: same("Controlled media import"),
    how: same("An authorised team validates and imports signed update bundles on an approved schedule."),
    best: same("Disconnected environments needing a periodic vulnerability or threat refresh.")
  },
  {
    option: same("One-way data diode"),
    how: same("Approved intelligence flows into the Twin while no customer data leaves the enclave."),
    best: same("Sensitive systems where policy permits inbound-only transfer.")
  }
];

/** Section 06 — what an isolated deployment can still do. */
export const OFFLINE_ROWS: readonly { capability: Bilingual; detail: Bilingual }[] = [
  {
    capability: same("Model the environment"),
    detail: same(
      "Facility and process model, assets, control logic, PLC/SCADA/HMI configurations, Purdue zones, OT topology, dependencies, and safety and reliability context."
    )
  },
  {
    capability: same("Trace cyber pathways"),
    detail: same(
      "Reachability through the imported topology, routes, segmentation rules and the passively captured network flows you supplied."
    )
  },
  {
    capability: same("Test a change"),
    detail: same(
      "Model a firewall, segmentation, patch, vendor-access, control-system or procurement change virtually — without applying it to the live environment."
    )
  },
  {
    capability: same("Prioritise decisions"),
    detail: same("Produce NOW / NEXT / NEVER priorities based on consequence and reachability.")
  },
  {
    capability: same("Generate evidence"),
    detail: same(
      "Engineering views, risk decisions, bills of materials, dependency maps, technical documentation and traceable rationale for assurance or leadership review."
    )
  },
  {
    capability: same("Run local simulations"),
    detail: same(
      "Attack paths, operational cascades, control options and recovery implications, modelled inside the isolated environment."
    )
  }
];

/** Section 08 — the systems of record, matching /cdt-2's own list. */
export const INTEGRATION_ITEMS: readonly { name: Bilingual; body: Bilingual }[] = [
  {
    name: same("Asset management"),
    body: same("The maintained equipment record — what exists, where it sits, and what it is for.")
  },
  {
    name: same("Historians"),
    body: same("Process history, which tells the model how the plant actually runs rather than how it was designed to.")
  },
  {
    name: same("Network monitoring"),
    body: same("Passive inventory and observed flows from the platform already on the network, as an input to the model.")
  },
  {
    name: same("Service management"),
    body: same("Change, incident and work-order records — the reason the record and reality diverged.")
  }
];

/** Table column headings, kept beside the rows they label. */
export const LABELS = {
  intel: {
    caption: same("Three ways to keep intelligence current across a controlled boundary."),
    option: same("Option"),
    how: same("How it works"),
    best: same("Best for")
  },
  offline: {
    caption: same("What the Cyber Digital Twin does with no external connection at all."),
    capability: same("Capability"),
    detail: same("What it covers")
  },
  modes: {
    statement: same("Key statement"),
    approvable: same("Approvable where")
  }
};
