The Cyber Digital Twin supports CRA technical documentation by creating a **traceable evidence model** behind the technical file. It does not create legal conformity by itself; it organizes and links the product, its dependencies, risk decisions, changes, and source artifacts so the manufacturer can produce, maintain, and defend the documentation.

## The simple version

```text
Product architecture + components + interfaces + suppliers
                         ↓
Cyber Digital Twin
                         ↓
Risk analysis + vulnerability context + treatment decisions
                         ↓
CRA technical-documentation evidence
```

Instead of collecting documents manually every time a product changes, the Twin connects the information to product versions, components, interfaces, and decisions.

## Documentation support

| CRA documentation need | How the Twin supports it |
|---|---|
| Product description | Models product identity, version, hardware/firmware/software configuration, intended use, deployment context, and interfaces |
| Product architecture | Connects assets, components, protocols, APIs, remote-management paths, trust boundaries, and external dependencies |
| Software and firmware inventory | Produces an SBOM view, including transitive software/firmware relationships where source data is available |
| Hardware inventory | Produces an HBOM view for controllers, microcontrollers, ASICs, backplanes, hardware origin, and physical supply dependencies |
| Cryptographic evidence | Produces a CBOM view for certificates, key length, cipher suites, certificate expiry, and cryptographic dependencies |
| Cloud and service dependencies | Produces a SaaS-BOM view for cloud APIs, hosted services, vendor portals, and remote-maintenance tunnels |
| Operations and support evidence | Produces an Ops-BOM view for maintenance workflows, human access roles, service activities, support tools, and update procedures |
| Cybersecurity risk assessment | Maps a vulnerability or threat to the affected component, interface, reachable pathway, product function, and potential customer or operational consequence |
| Security controls | Records the control chosen—such as authentication, access restriction, segmentation, secure update, hardening, or disabled service—and the route or risk it addresses |
| Vulnerability handling | Links CVEs, KEV, EPSS, CVSS, CWE, CAPEC, and threat context to affected product versions, mitigation decisions, customer actions, and status |
| Supplier evidence | Connects components, firmware, certificates, cloud services, support routes, and maintenance tooling to their suppliers and dependencies |
| Change history | Shows the difference when a firmware release, component, certificate, API, supplier, configuration, or mitigation changes |
| Evidence provenance | Links conclusions to the architecture record, SBOM/HBOM/CBOM, test artifact, supplier record, vulnerability source, or approved assumption that supports it |

OXOT’s specification explicitly identifies five BOM views—software/firmware, hardware, cryptographic, SaaS, and operational workflows—and states that technical-file sections, BOMs, and risk deltas can regenerate as the underlying model changes. 
## How it works in practice

### 1. Establish the product model

OXOT starts by modeling the product as more than a software package:

```text
Product
├─ Hardware revision
├─ Firmware and operating system
├─ Application software and libraries
├─ Cryptographic functions and certificates
├─ Protocols and physical/network interfaces
├─ Cloud APIs and external services
├─ Update and recovery mechanisms
├─ Vendor support and remote-maintenance routes
└─ Customer deployment and operational context
```

That creates a clear product boundary and architecture evidence base.

### 2. Link components to product versions

A component is useful only if you know where it is used.

```text
Vulnerability
        ↓
Affected library / firmware / controller / cloud service
        ↓
Product model and software version
        ↓
Hardware revision and supported configuration
        ↓
Customer-facing function or interface
        ↓
Risk decision and remediation status
```

This makes it possible to answer, for example:

> “Which product releases contain this vulnerable component, which interfaces make it reachable, and what corrective action applies?”

### 3. Connect risk to the actual interface

The Twin avoids treating a CVE as the complete risk decision.

```text
CVE or supplier advisory
        ↓
Affected component
        ↓
Product interface or maintenance pathway
        ↓
Actual reachability
        ↓
Product function / customer process affected
        ↓
Security consequence
        ↓
Patch, workaround, configuration control, or replacement decision
```

This is especially valuable for industrial products. A vulnerability in an embedded component may matter very differently depending on whether it is reachable through OPC UA, Modbus TCP, a web interface, USB service port, maintenance laptop, cloud API, or a vendor remote-support tunnel. 

### 4. Produce a documentation pack

The manufacturer can then generate or assemble an evidence pack containing:

- Product and system description.
- Architecture and interface diagrams.
- Component inventories.
- SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM outputs.
- Product-version and dependency history.
- Threat and vulnerability evidence.
- Risk-assessment records.
- Security design and treatment rationale.
- Update, maintenance, recovery, and support dependencies.
- Supplier and third-party service relationships.
- Change history and version deltas.
- Evidence links to source artifacts and accountable decisions.

The OXOT model supports machine-readable CycloneDX BOM exports, DEXPI 2.0 exports, interactive engineering views, and framework-oriented technical files with evidence links.
## Example

Consider a connected industrial controller with:

- Ethernet management interface.
- Embedded web server.
- OPC UA and Modbus TCP communications.
- Signed firmware updates.
- Vendor cloud support portal.
- Field-service laptop workflow.
- Third-party crypto library and embedded operating system.

A newly disclosed vulnerability affects the web-server library.

```text
Vulnerability advisory
        ↓
Web-server library version
        ↓
Affected controller firmware releases
        ↓
Management interface enabled on product configuration
        ↓
Reachable from customer maintenance network
        ↓
Potential pathway to configuration / control function
        ↓
Mitigation options:
- Firmware update
- Disable web management interface
- Restrict management-network access
- Require brokered service access
- Provide customer workaround and advisory
```

The CRA documentation can then retain:

- The affected versions.
- The interface and reachability analysis.
- The risk and consequence reasoning.
- The mitigation selected.
- The release/update record.
- Customer instructions.
- The evidence sources and review/approval record.

That is much stronger than simply recording: “CVE reviewed; patch issued.”

## Change control

Every significant product change can generate a documentation delta:

```text
New firmware release
        ↓
Updated library, certificate, interface, API, supplier, or feature
        ↓
Updated SBOM / HBOM / CBOM / SaaS-BOM / Ops-BOM
        ↓
Changed pathway or dependency
        ↓
Reassessed risk and treatment decision
        ↓
Updated CRA technical-file evidence
```

The important output is not just a new component list. It is a clear answer to:

> **What changed in the product-security story, and what evidence supports the manufacturer’s decision?**

## Evidence discipline

For CRA documentation, the Twin should retain a source trail:

```text
Technical-file claim
        ↓
Product model object
        ↓
Version / component / interface
        ↓
Supporting artifact
        ↓
Source, owner, date, approval, and review trigger
```

OXOT’s stated principles are:

- Grounding first.
- No fabricated values.
- Null over zero for unsourced fields.
- Citations retained for external inputs.
- Drill-down from output to component and source.
- Continuous regeneration of BOMs, risk deltas, and framework-file sections as differences occur. 

## Important boundary

The appropriate website wording is:

> **OXOT supports the evidence behind CRA technical documentation. Manufacturers remain responsible for defining scope, meeting the applicable CRA requirements, completing the technical file, issuing declarations, applying CE marking where required, managing vulnerability reporting, and selecting any required conformity-assessment route.**

This avoids implying that the Cyber Digital Twin is a legal, notified-body, or automatic-conformity solution.