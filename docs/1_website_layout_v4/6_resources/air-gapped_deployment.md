OXOT can handle air-gapped defense environments through **Island Mode**: the Cyber Digital Twin runs inside the customer’s own controlled environment, has no external dependency, and does not connect to control systems. It is passive-first—no agents on controllers and no active scanning of the process network.

## Core deployment model

```text
Classified / air-gapped defense environment
│
├─ Approved engineering and OT data exports
│  ├─ P&IDs, single-line diagrams, asset records
│  ├─ PLC / SCADA / RTU / HMI configuration exports
│  ├─ Network topology and approved PCAP / flow exports
│  ├─ FMECA, hazard records, operating procedures
│  ├─ Firmware, SBOM / HBOM / CBOM, and maintenance records
│  └─ Approved local threat and vulnerability data
│
└─ OXOT Cyber Digital Twin — Island Mode
   ├─ Runs on customer-controlled infrastructure
   ├─ No internet connection
   ├─ No outbound telemetry or customer-data export
   ├─ No direct access to PLCs, RTUs, controllers, or live OT networks
   ├─ Customer-controlled users, roles, and access
   └─ Local model, analysis, simulation, and evidence outputs
```

The model is built from approved exports and engineering evidence, rather than by connecting a cloud service or active scanner to operational technology. 

## What works offline

Island Mode can still support the core decision model:

- **Model the environment:** Facility/process model, assets, control logic, PLC/SCADA/HMI configurations, Purdue zones, OT topology, dependencies, and safety/reliability context.
- **Trace cyber pathways:** Determine reachability through the imported topology, routes, segmentation rules, and observed/passively captured network flows.
- **Test a change:** Model a firewall, segmentation, patch, vendor-access, control-system, or procurement change virtually—without applying it to the live environment.
- **Prioritize decisions:** Produce NOW / NEXT / NEVER priorities based on consequence and reachability.
- **Generate evidence:** Create engineering views, risk decisions, BOMs, dependency maps, technical documentation, and traceable rationale for assurance or leadership review.
- **Run local simulations:** Model attack paths, operational cascades, control options, and recovery implications within the isolated environment. 

## Intelligence updates

An air gap does mean the Twin cannot automatically pull live external threat, geopolitical, CVE, supplier, or intelligence feeds. For defense use, this is generally a governance decision—not a functional limitation.

You have three practical options:

| Option | How it works | Best for |
|---|---|---|
| **Fully isolated** | The Twin receives only approved local data and curated intelligence packages | Highly classified or tightly controlled systems |
| **Controlled media import** | An authorized team validates and imports signed update bundles on an approved schedule | Disconnected environments needing periodic vulnerability/threat refresh |
| **One-way data diode** | Approved intelligence can flow **into** the Twin while no customer data leaves the enclave | Sensitive systems where policy permits inbound-only transfer |

OXOT’s documented data-diode option allows intelligence to enter the Cyber Digital Twin while nothing exits; its Island Mode is explicitly isolated, on the customer’s own ground, with no external dependencies. 
## Defense-specific controls

For a real sovereign or classified deployment, I would position these as design requirements to agree with the customer’s security authority:

- Deployment on customer-owned or accredited infrastructure.
- No SaaS dependency, external telemetry, or vendor remote administration by default.
- Local identity, RBAC, privileged-access workflow, and audit logging.
- Customer-approved data schema, import workflow, media handling, malware scanning, signing, and provenance checks.
- Cryptographically signed offline update packages, with version control and rollback.
- Separate handling domains for unclassified, sensitive, and classified model data.
- Approval gates for every external intelligence feed and model update.
- Local backup, recovery, and disaster-recovery procedures.
- A clear boundary between the **Twin**, which models the environment, and the **operational systems**, which it does not control.

## The important caveat

“Air-gapped” should not be presented as automatically risk-free. Its effectiveness depends on the full operational boundary: removable media, contractor laptops, maintenance tooling, temporary connections, engineering workstations, supply-chain updates, and authorized cross-domain processes can all create pathways.

OXOT’s role is to model those pathways and their consequences—not to imply that the site is safe merely because it has no ordinary internet route. The product’s evidence model supports this by retaining source provenance, showing unsourced fields as empty rather than invented, and tracing conclusions back to underlying engineering or external sources. 

## Website wording

For the Defense & Government page, use:

> **Air-gapped by design, sovereign by operation.**  
> Deploy the Cyber Digital Twin inside your controlled environment. Model infrastructure, OT, dependencies, and recovery choices without connecting to live control systems or exporting sensitive operational data.

Then offer three selectable deployment cards:

```text
Island Mode
Fully isolated deployment on customer-controlled infrastructure.

Inbound Intelligence Mode
One-way data diode for approved threat or vulnerability updates.

Dedicated Sovereign Instance
Single-tenant deployment in a customer-approved sovereign environment.
```
