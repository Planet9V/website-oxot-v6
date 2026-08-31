# Cyber Resilience Act Assurance Page

**URL:** `/assurance/cyber-resilience-act`  
**Navigation label:** `Cyber Resilience Act`  
**Primary CTA:** `Discuss CRA product evidence`  
**Secondary CTA:** `Request the Technical Specification`

***

## Hero

### Build CRA evidence from the product you actually ship.

The Cyber Resilience Act requires manufacturers of covered products with digital elements to address cybersecurity throughout the product lifecycle: from planning and design through vulnerability handling, security updates, technical documentation, and post-market activity.

OXOT’s Cyber Digital Twin connects the product, its software, hardware, interfaces, certificates, suppliers, support workflows, deployment pathways, and vulnerability context in one traceable model.

**CTA:** `Discuss CRA product evidence`  
**Secondary CTA:** `Explore the Cyber Digital Twin`

```text
Product boundary
        ↓
Components and dependencies
        ↓
Cybersecurity risk and exploitability
        ↓
Secure design and vulnerability handling
        ↓
Technical documentation and lifecycle evidence
```

The Cyber Resilience Act is Regulation (EU) 2024/2847. Its main obligations apply from 11 December 2027, while reporting obligations under Article 14 apply from 11 September 2026. [digital-strategy.ec.europa](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

***

## Scope statement

### The CRA applies to products placed on the market—not simply to organizations that operate technology.

This is the most important distinction on the page.

The Cyber Resilience Act concerns covered **products with digital elements** made available on the EU market. Its main obligations are directed at manufacturers, with specific obligations also applying to importers and distributors in defined circumstances. [digital-strategy.ec.europa](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

A company does **not** become subject to the CRA merely because it operates:

- A factory, utility, water-treatment plant, railway, port, or data center.
- An OT network or industrial control system.
- A government or defense facility.
- A software platform or internal tool that is not placed on the EU market as a product with digital elements.

However, CRA obligations can be relevant when an organization:

- Manufactures an industrial controller, sensor, gateway, network appliance, HMI, SCADA component, safety-related product, IoT device, embedded system, or software product.
- Develops and sells a digital platform, component, library, firmware package, appliance, or connected service falling within scope.
- Integrates or substantially modifies a product and places it on the EU market under its own name or trademark.
- Imports or distributes a covered product.
- Supplies digital elements into a product ecosystem where the manufacturer needs product, component, vulnerability, or technical-documentation evidence.

> **OXOT supports product-security evidence and technical documentation workflows. It does not determine legal scope, product classification, exemption status, conformity route, or regulatory responsibility.**

Those questions must be resolved by the manufacturer and, where necessary, qualified legal, regulatory, conformity-assessment, and notified-body advisers.

***

## The CRA challenge

### Product security evidence is often scattered across engineering, supply chain, and operations.

A connected product may contain:

- Custom application software and firmware.
- Commercial and open-source libraries.
- Operating systems, containers, drivers, and development tools.
- PLC, MCU, FPGA, ASIC, SoC, or secure-element hardware.
- Certificates, cryptographic libraries, keys, and remote-update mechanisms.
- Cloud APIs, mobile applications, vendor portals, remote support, and telemetry services.
- Manufacturing, commissioning, maintenance, repair, support, and end-of-life workflows.
- Third-party modules, OEM components, suppliers, and subcontractors.

Yet the evidence that describes these dependencies is usually fragmented:

| Information type | Often held by |
|---|---|
| Product architecture | Product engineering, system architects, R&D |
| Software and open-source components | Development, DevSecOps, release engineering |
| Firmware and embedded dependencies | Firmware teams, suppliers, manufacturing engineering |
| Hardware provenance | Procurement, component engineering, contract manufacturers |
| Certificates and crypto | Security engineering, PKI, platform teams |
| Cloud/API dependencies | Platform engineering, SaaS teams, operations |
| Vulnerability handling | PSIRT, security, product support |
| Support and maintenance processes | Field service, customer support, systems integrators |
| Product technical documentation | Quality, regulatory, product management, compliance |
| Supplier dependency | Procurement, legal, product engineering |

The risk is not just an incomplete spreadsheet. It is an inability to answer:

- Which product version contains the affected component?
- Which deployed products inherit the vulnerability?
- Is the component reachable through a product interface?
- What customer function could be affected?
- Which supplier, firmware, certificate, cloud API, or maintenance path is involved?
- Which corrective measure works, and what does it change?
- Can the manufacturer produce the underlying evidence quickly if authorities request it?

The CRA requires manufacturers to maintain technical documentation and make it available to market-surveillance authorities upon request. [digital-strategy.ec.europa](https://digital-strategy.ec.europa.eu/en/policies/cra-summary)

***

## The OXOT approach

### One product model. Five dependency views.

OXOT builds a product-security model that treats the product as a cyber-physical and operational system—not merely a software bill of materials.

```text
Product architecture and interfaces
Software • firmware • hardware • crypto • cloud • support
                         ↓
OXOT Cyber Digital Twin
Components • dependencies • pathways • versions • suppliers
vulnerabilities • controls • lifecycle and operational context
                         ↓
CRA-oriented evidence
Technical documentation • vulnerability context • BOM outputs
risk treatment • update evidence • supplier and lifecycle traceability
```

### Five Bills of Materials

| OXOT view | What it captures | CRA value |
|---|---|---|
| **SBOM** | Software and firmware components, including transitive dependencies where source information is available | Identifies affected components, versions, libraries, packages, operating systems, and firmware dependencies |
| **HBOM** | Microcontrollers, ASICs, PLC backplanes, hardware components, origin, and physical supply dependencies | Supports hardware traceability, supplier analysis, replacement planning, and hardware-origin context |
| **CBOM** | Key lengths, certificate expiry, ciphers, cryptographic dependencies, and post-quantum readiness context | Supports evidence for cryptographic design, certificate lifecycle, secure communication, and update/identity dependencies |
| **SaaS-BOM** | Cloud APIs, hosted services, external platforms, vendor portals, remote-maintenance tunnels, and third-party digital dependencies | Shows dependencies outside the product boundary that can affect product security or lifecycle support |
| **Ops-BOM** | Human access roles, maintenance procedures, commissioning workflows, service schedules, and support operations | Captures the operational reality of how products are configured, updated, maintained, repaired, and remotely supported |

The OXOT product specification identifies SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM as distinct views of product and operational dependency. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYE4XK5VNOY&Signature=ALK7buHkgYD%2BBhS8mWIcnqIZFBU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIA2cuJrbdyHyYiOC4JuYguIVO7Eh%2FBzFAKRtR%2FETuQNaAiA1xLiOl1ygj%2BPkg%2FjA45c2hT7O0xVApXsjsjVSx71ysSr8BAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMGgJ9tBdlzykDJA78KtAEqWpw4t%2FYWWKb3qzjlzjsunDsIh0saZOQ2couYCYQ5%2BigDjFp5heN7TTPID1k0Qu93bkk0GFSVjnnvIMV0BxZD0icjQk%2B6Tx3r9LBYpQrl1SC01%2FtACRU0RG%2FVIjiRLQLHkJB63CxlHiq83sQqdgm%2FYE9S79QV1F7Qba8hrBnyKMdofEs5EGSDvdXv6IW9CnKUdsrDz0e2Yi3%2F9Wx2BA%2B%2FyzchdI%2BKxBTy%2B4ntztFI%2BdaOBIMEBmJ7mobLi7uhIVmQdnknmHRVXOZHj3wEETz0l0KYM7Cn7EEHp4oNcchdrVLz7MHGU1VbcElzPOxh4cwDrO8WIzhsTdnl7p6Rr%2FcU0ii%2Fs15WhQjx%2FqcN7diAAogSuF0evNnsOAbXlzSRl8bAjOhSvPuJ%2FE7PjA89U2ZzsPiejXdLISGmF35xjnV7MWhnh6y%2BYkX4XybCx4Nyq7JfoVKJjq%2BLNFwtRN4xXqLW2pntKIi03cG%2BpqHA87scYTVOfODgyCasfpkwS2%2F3nWVtmNRlfCB1NF7pPog0Na%2FkjFCxQCw5zYvixroLmXoB1Exw2q3j0Yk9WP02jfQD%2FBoNmwdAbeS6hrU1xOPH5E25l4HZwBHzJQcxq6asvFAFg16OMqS7p3o3eS1Z065u0RQ9EW8IUlOeFJ%2F9fowkY3N3r2k7fy5CfMf4nr3bj7LU%2BC9ExwYLKZLWvE%2FdiDDUeIus4k4jrEcNR6tIEDh26j%2FmMCGNGO8ZpgK%2F3s124w3dSU7mn9slNiwnrpw%2Ffd73MYEZnmrqBmbrZdXAEUK48A9fjCfxafUBjqZAdhiyASrR%2BzKB0T4fYbUlCL6xaT%2BOwGh82fbVX0abla3QxFLyYrbbBuLl%2BpZWUYywCdPc4Szgb647Vqh%2F3u9ZkrXa7dYH%2FJV0BAfMjpi%2Fd6asDyLZZn304Dur2QutdYkEEDXIbh4UrnCydK2bghLsWmskxikL0Pc%2BuTvFSKhm7MR0Gkr0B%2BnjvKOf8Q8Uq2BL2sgk0yZKCChyA%3D%3D&Expires=1787424882)

### Product security is not only a BOM

> A component inventory tells you what exists. A dependency model tells you what can reach it, what it supports, and what happens when it fails.

For example, a vulnerable library may exist in a product but be unreachable in the deployed configuration. Conversely, a remotely accessible maintenance interface with a modest vulnerability may create a high-consequence pathway into a safety-related controller, critical operational function, or regulated customer environment.

OXOT links:

```text
Component or vulnerability
        ↓
Product version and interface
        ↓
Deployment / network / remote-support path
        ↓
Customer function or physical process
        ↓
Security and operational consequence
        ↓
Candidate treatment and evidence record
```

***

## Product boundary

### Define what you place on the market before you try to document it.

The first practical CRA task is to create a disciplined product boundary. That boundary should distinguish the product itself from its interfaces, external dependencies, optional modules, deployment environment, and supporting services.

### OXOT helps structure evidence for:

| Product evidence area | Example questions |
|---|---|
| Product identity | What is the product name, model, hardware revision, firmware/software release, and supported lifecycle? |
| Product architecture | What are the main functions, modules, interfaces, data flows, and trust boundaries? |
| Intended purpose | What is the product designed to do, where is it intended to operate, and what operational or safety constraints apply? |
| Deployment context | Does it operate in an industrial network, data center, railway, utility, building, cloud, edge, or consumer environment? |
| Interfaces | Which physical, wireless, network, serial, API, management, diagnostic, USB, maintenance, cloud, and user interfaces exist? |
| Security functions | What authentication, authorization, encryption, update, logging, secure boot, identity, and configuration controls are provided? |
| External dependencies | Which cloud services, mobile apps, APIs, certificate authorities, vendor portals, remote-support paths, and third-party platforms are required? |
| Lifecycle scope | How is the product commissioned, configured, updated, monitored, maintained, repaired, and decommissioned? |
| Supplier boundaries | Which components, software, firmware, services, and support activities are supplied by third parties? |

### Product boundary visual

```text
Product
Embedded software • firmware • hardware • security functions
         │
         ├─ User / operator interfaces
         ├─ OT / IT protocols and network interfaces
         ├─ Configuration and diagnostics
         ├─ Update and recovery interfaces
         ├─ Certificates and cryptography
         ├─ Cloud / API / mobile application services
         └─ Vendor / integrator / field-service support
```

***

## Security by design and by default

### Make product security a design decision, not a release-stage patch.

The CRA requires manufacturers to account for cybersecurity in planning, design, development, production, delivery, and maintenance. It also requires vulnerabilities to be addressed across the expected product lifetime. [digital-strategy.ec.europa](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

OXOT can help teams make security-by-design evidence more concrete by connecting security requirements to actual product functions, interfaces, components, and deployment contexts.

### Product-security questions OXOT supports

| Product-security question | What the model can show |
|---|---|
| Which interfaces are necessary? | Physical, network, remote-management, cloud, local, service, diagnostic, and user interfaces |
| Which interfaces are exposed? | Reachable services, protocols, remote paths, communication routes, and trust boundaries |
| Who can configure or update the product? | Identity, role, certificate, account, service-tool, vendor, and approval dependencies |
| What happens if an interface is misused? | Pathway from interface to component, function, process, service, or customer consequence |
| What needs to be protected by default? | Default configuration, least privilege, limited services, separation, authentication, encryption, and secure update decisions |
| What shared dependency can create a common-mode risk? | Shared cloud service, certificate authority, firmware image, library, maintenance tool, identity system, or supplier |
| Can a security change break an intended function? | Required flows, supported protocols, customer deployment patterns, recovery logic, and operational constraints |
| What evidence supports the design decision? | Architecture documents, source artifacts, test records, configuration records, supplier data, and approved assumptions |

### Example: a secure remote-maintenance decision

```text
Baseline
A field-service tool can connect persistently to a product's management interface.

        ↓

Question
Can the manufacturer remove broad persistent access while retaining safe,
supportable diagnosis and update capability?

        ↓

Twin analysis
Vendor portal → support identity → remote gateway → management interface
→ firmware update / configuration function → customer operational effect

        ↓

Candidate treatment
Named accounts • MFA • time-limited access • session recording
asset-specific permissions • signed update packages • local approval

        ↓

Evidence
Interface model • access architecture • support workflow
update sequence • residual pathway • approved security decision
```

***

## Vulnerability management

### Know what is affected, what is reachable, and what customers need to do.

The CRA requires manufacturers to handle vulnerabilities over the product lifecycle. This includes identifying, documenting, addressing, and reporting actively exploited vulnerabilities and severe incidents in accordance with the Regulation. [digital-strategy.ec.europa](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

OXOT helps product-security, PSIRT, engineering, and support teams bring evidence together around a vulnerability.

```text
Vulnerability advisory / CVE / exploit intelligence
        ↓
Affected software, firmware, hardware, or service component
        ↓
Product versions and customer deployment context
        ↓
Reachability through product interfaces and configuration
        ↓
Operational, customer, or physical consequence
        ↓
Mitigation, update, workaround, notification, and closure evidence
```

### Vulnerability-management evidence

| Evidence area | OXOT support |
|---|---|
| Affected component | Maps vulnerability identifiers to software, firmware, hardware, crypto, SaaS, or operational dependencies |
| Product version | Connects the component to affected models, firmware/software releases, configurations, and lifecycle status |
| Exploitability | Uses product interfaces, deployed topology, exposed services, access paths, and configuration context to assess reachable pathways |
| Threat context | Supports KEV, EPSS, CVSS, CWE, CAPEC, MITRE ATT&CK, supplier history, and relevant threat intelligence as approved inputs |
| Consequence | Connects component compromise to product function, customer service, operational process, safety/reliability impact, or downstream dependency |
| Mitigation options | Compares patch, configuration change, disabled service, access restriction, certificate rotation, compensating control, replacement, or recall/escalation path |
| Customer action | Records workaround, update, configuration, or operational guidance required for customers or integrators |
| Evidence trail | Retains source, decision owner, release, remediation status, known limitations, and review date |

OXOT’s specification supports enrichment using known-exploited vulnerabilities, exploit probability, CVSS, CAPEC, CWE, and MITRE ATT&CK, while assessing exploitability through modeled topology rather than severity alone. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYE4XK5VNOY&Signature=ALK7buHkgYD%2BBhS8mWIcnqIZFBU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIA2cuJrbdyHyYiOC4JuYguIVO7Eh%2FBzFAKRtR%2FETuQNaAiA1xLiOl1ygj%2BPkg%2FjA45c2hT7O0xVApXsjsjVSx71ysSr8BAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMGgJ9tBdlzykDJA78KtAEqWpw4t%2FYWWKb3qzjlzjsunDsIh0saZOQ2couYCYQ5%2BigDjFp5heN7TTPID1k0Qu93bkk0GFSVjnnvIMV0BxZD0icjQk%2B6Tx3r9LBYpQrl1SC01%2FtACRU0RG%2FVIjiRLQLHkJB63CxlHiq83sQqdgm%2FYE9S79QV1F7Qba8hrBnyKMdofEs5EGSDvdXv6IW9CnKUdsrDz0e2Yi3%2F9Wx2BA%2B%2FyzchdI%2BKxBTy%2B4ntztFI%2BdaOBIMEBmJ7mobLi7uhIVmQdnknmHRVXOZHj3wEETz0l0KYM7Cn7EEHp4oNcchdrVLz7MHGU1VbcElzPOxh4cwDrO8WIzhsTdnl7p6Rr%2FcU0ii%2Fs15WhQjx%2FqcN7diAAogSuF0evNnsOAbXlzSRl8bAjOhSvPuJ%2FE7PjA89U2ZzsPiejXdLISGmF35xjnV7MWhnh6y%2BYkX4XybCx4Nyq7JfoVKJjq%2BLNFwtRN4xXqLW2pntKIi03cG%2BpqHA87scYTVOfODgyCasfpkwS2%2F3nWVtmNRlfCB1NF7pPog0Na%2FkjFCxQCw5zYvixroLmXoB1Exw2q3j0Yk9WP02jfQD%2FBoNmwdAbeS6hrU1xOPH5E25l4HZwBHzJQcxq6asvFAFg16OMqS7p3o3eS1Z065u0RQ9EW8IUlOeFJ%2F9fowkY3N3r2k7fy5CfMf4nr3bj7LU%2BC9ExwYLKZLWvE%2FdiDDUeIus4k4jrEcNR6tIEDh26j%2FmMCGNGO8ZpgK%2F3s124w3dSU7mn9slNiwnrpw%2Ffd73MYEZnmrqBmbrZdXAEUK48A9fjCfxafUBjqZAdhiyASrR%2BzKB0T4fYbUlCL6xaT%2BOwGh82fbVX0abla3QxFLyYrbbBuLl%2BpZWUYywCdPc4Szgb647Vqh%2F3u9ZkrXa7dYH%2FJV0BAfMjpi%2Fd6asDyLZZn304Dur2QutdYkEEDXIbh4UrnCydK2bghLsWmskxikL0Pc%2BuTvFSKhm7MR0Gkr0B%2BnjvKOf8Q8Uq2BL2sgk0yZKCChyA%3D%3D&Expires=1787424882)

### Reporting timeline callout

For active exploitation, CRA Article 14 establishes staged notifications:

```text
Within 24 hours
Early warning of an actively exploited vulnerability

Within 72 hours
Vulnerability notification with available information,
including the nature of the vulnerability and corrective or mitigating measures

Within 14 days after a corrective or mitigating measure is available
Final report
```

The exact reporting obligations, thresholds, data fields, and secure reporting process must be managed by the manufacturer’s designated legal, regulatory, PSIRT, and incident-response functions. [eur-lex.europa](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R2847-20241120)

***

## Technical documentation

### Technical documentation should show the reasoning, not just the result.

CRA technical documentation must contain the information required by the Regulation and be available to market-surveillance authorities. OXOT can support the evidence-gathering and traceability behind that documentation; it does not replace the manufacturer’s responsibility to create, maintain, review, sign, and retain the required technical file. [eur-lex.europa](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R2847-20241120)

### OXOT can support documentation workflows for:

| Documentation area | Model-backed evidence |
|---|---|
| Product description | Product scope, intended purpose, architecture, interfaces, models, versions, and deployment context |
| System and interface architecture | Components, trust boundaries, protocols, data flows, cloud/API dependencies, management interfaces, and remote-access paths |
| Component inventory | SBOM, HBOM, CBOM, SaaS-BOM, and Ops-BOM outputs |
| Risk assessment | Threats, vulnerabilities, interfaces, pathways, consequences, mitigation options, and residual risks |
| Security-by-design decisions | Chosen controls, rationale, relevant requirements, alternatives considered, and evidence of treatment |
| Vulnerability handling | Detection, triage, affected versions, exploitability, mitigation, customer communication, and closure history |
| Update and maintenance evidence | Update mechanism, version history, signing/verification dependencies, rollout constraints, rollback, and support lifecycle |
| Supplier and third-party evidence | Component origin, supplier role, support dependencies, contracts, version obligations, and replacement options |
| Change history | Changed component, firmware, dependency, certificate, interface, configuration, supplier, or treatment decision |
| Evidence provenance | Links from each claim to source artifacts, test records, approved assumptions, and accountable review |

### Evidence chain

```text
Technical-file statement
“The product restricts administrative access to authorized users.”

        ↓

Architecture evidence
Administrative interface → identity service → authorization model
→ management function → audit trail

        ↓

Supporting artifacts
Interface specification • configuration baseline • test evidence
certificate / credential design • role model • maintenance procedure

        ↓

Lifecycle evidence
Version history • vulnerability records • update path
support process • change approval • review date
```

***

## Supply chain and lifecycle

### A product’s security depends on more than its code.

Product security often fails at the boundary between manufacturer, component supplier, firmware provider, contract manufacturer, cloud provider, systems integrator, field-service organization, and customer environment.

OXOT can model these dependencies as a product-lifecycle system.

### Supply-chain questions

| Question | Why it matters |
|---|---|
| Which supplier provides the component, firmware, service, or support capability? | Supplier concentration, discontinuation, compromise, sanctions, quality, and lifecycle risk |
| Which product versions inherit a component dependency? | Enables impact assessment when a vulnerability, support issue, or end-of-life notice emerges |
| Which certificate or key dependencies exist? | Certificate expiration, revoked trust, cryptographic transition, and secure-update continuity can affect whole fleets |
| Which cloud or API services are necessary? | A supplier outage, API change, compromised service, or data-residency issue can affect product operation or support |
| Which field-service tools can access the product? | Maintenance laptops, vendor portals, remote support, commissioning tools, and integrator accounts can create high-consequence pathways |
| Which parts are difficult to replace? | Hardware lead time, certification, compatibility, customer qualification, safety impact, and repair capacity affect remediation strategy |
| Which customer environments are affected? | The same product issue may have different consequences in a factory, railway, utility, hospital, defense facility, or data center |

### Key message

> A supplier list is not supply-chain security. Supply-chain security begins when the organization can see which product function, customer deployment, update path, support process, and remediation option depends on that supplier.

The OXOT product model includes hardware-origin risk, external service dependencies, vendor maintenance tunnels, human roles, maintenance schedules, and operational workflows in its BOM and data-fusion structure. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYE4XK5VNOY&Signature=ALK7buHkgYD%2BBhS8mWIcnqIZFBU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIA2cuJrbdyHyYiOC4JuYguIVO7Eh%2FBzFAKRtR%2FETuQNaAiA1xLiOl1ygj%2BPkg%2FjA45c2hT7O0xVApXsjsjVSx71ysSr8BAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMGgJ9tBdlzykDJA78KtAEqWpw4t%2FYWWKb3qzjlzjsunDsIh0saZOQ2couYCYQ5%2BigDjFp5heN7TTPID1k0Qu93bkk0GFSVjnnvIMV0BxZD0icjQk%2B6Tx3r9LBYpQrl1SC01%2FtACRU0RG%2FVIjiRLQLHkJB63CxlHiq83sQqdgm%2FYE9S79QV1F7Qba8hrBnyKMdofEs5EGSDvdXv6IW9CnKUdsrDz0e2Yi3%2F9Wx2BA%2B%2FyzchdI%2BKxBTy%2B4ntztFI%2BdaOBIMEBmJ7mobLi7uhIVmQdnknmHRVXOZHj3wEETz0l0KYM7Cn7EEHp4oNcchdrVLz7MHGU1VbcElzPOxh4cwDrO8WIzhsTdnl7p6Rr%2FcU0ii%2Fs15WhQjx%2FqcN7diAAogSuF0evNnsOAbXlzSRl8bAjOhSvPuJ%2FE7PjA89U2ZzsPiejXdLISGmF35xjnV7MWhnh6y%2BYkX4XybCx4Nyq7JfoVKJjq%2BLNFwtRN4xXqLW2pntKIi03cG%2BpqHA87scYTVOfODgyCasfpkwS2%2F3nWVtmNRlfCB1NF7pPog0Na%2FkjFCxQCw5zYvixroLmXoB1Exw2q3j0Yk9WP02jfQD%2FBoNmwdAbeS6hrU1xOPH5E25l4HZwBHzJQcxq6asvFAFg16OMqS7p3o3eS1Z065u0RQ9EW8IUlOeFJ%2F9fowkY3N3r2k7fy5CfMf4nr3bj7LU%2BC9ExwYLKZLWvE%2FdiDDUeIus4k4jrEcNR6tIEDh26j%2FmMCGNGO8ZpgK%2F3s124w3dSU7mn9slNiwnrpw%2Ffd73MYEZnmrqBmbrZdXAEUK48A9fjCfxafUBjqZAdhiyASrR%2BzKB0T4fYbUlCL6xaT%2BOwGh82fbVX0abla3QxFLyYrbbBuLl%2BpZWUYywCdPc4Szgb647Vqh%2F3u9ZkrXa7dYH%2FJV0BAfMjpi%2Fd6asDyLZZn304Dur2QutdYkEEDXIbh4UrnCydK2bghLsWmskxikL0Pc%2BuTvFSKhm7MR0Gkr0B%2BnjvKOf8Q8Uq2BL2sgk0yZKCChyA%3D%3D&Expires=1787424882)

***

## Change management

### Product change should produce a visible security delta.

Every release can alter the product’s security posture:

- A new library, compiler, firmware package, operating system, or container image.
- A changed protocol, API, default configuration, or remote-management function.
- A newly supported cloud service or third-party integration.
- A rotated certificate, changed cipher suite, or cryptographic migration.
- A new component supplier, hardware revision, or manufacturing location.
- A product lifecycle extension or end-of-support decision.
- A new vulnerability, exploitation report, or supplier advisory.
- A change in customer deployment architecture or field-service workflow.

OXOT can show the difference between the earlier and later model state.

```text
Previous product version
        ↓
Changed component, interface, supplier, control, or workflow
        ↓
New reachable pathways, dependencies, or mitigations
        ↓
Updated risk and treatment decision
        ↓
Updated documentation and evidence package
```

This is more valuable than version tracking alone. It answers:

> **What changed in the security story of the product—and what evidence shows that the change was assessed?**

***

## Product-security roles

### One model for engineering, PSIRT, product, quality, and compliance.

| Role | What they need | What OXOT supports |
|---|---|---|
| Product manager | Product boundary, intended purpose, supported lifecycle, customer impact, and prioritization | Product/system model, dependency view, evidence roadmap, change and investment context |
| Product-security lead | Threat modeling, attack surface, vulnerability impact, security requirements, and mitigation rationale | Interface/pathway model, component context, control simulation, evidence links |
| Firmware / software engineering | Component dependencies, release impact, update decisions, configuration and interface security | SBOM, version/dependency graph, vulnerability context, release delta |
| Hardware engineering | Component provenance, secure element/MCU/ASIC dependencies, lifecycle and replacement context | HBOM, hardware dependency model, supplier and update relationships |
| Cryptography / PKI | Certificates, keys, cipher suites, secure update, trust roots, and expiry dependency | CBOM, certificate lifecycle, crypto interface/dependency view |
| PSIRT | Affected versions, exploitability, mitigation, customer action, reporting, and closure | Vulnerability-to-product mapping, decision trail, customer/environment impact |
| Procurement / supply chain | Supplier risk, component concentration, alternate sources, support dependence, and lifecycle exposure | Supplier, BOM, support, spare, and provenance view |
| Quality / regulatory | Technical documentation, traceability, change evidence, and review readiness | Source-linked evidence outputs and product-lifecycle delta history |
| Customer support / field service | Safe diagnosis, maintenance, update, recovery, and customer communication | Ops-BOM, maintenance/access model, customer-facing remediation context |
| Leadership | Product exposure, investment priority, customer impact, and remediation status | Consequence-led summaries, dependencies, trend, and treatment options |

***

## Evidence and data provenance

### Every CRA claim should lead back to an artifact, version, source, or approved decision.

```text
Claim
“The product has a secure update mechanism.”

        ↓

Product model
Update service → signing key / certificate → firmware package
→ product boot / verification function → rollback / recovery process

        ↓

Evidence
Architecture specification • firmware release record • signing procedure
certificate lifecycle • secure-boot design • test evidence • support procedure

        ↓

Lifecycle record
Affected versions • supplier dependencies • known limitations
vulnerability history • approved changes • review date
```

### Evidence principles

- **Grounding first:** Start with actual product architecture, source, component, firmware, hardware, interface, supplier, and lifecycle evidence.
- **No fabrication:** Do not invent component relationships, customer deployment assumptions, security controls, or product claims.
- **Null over zero:** Unknown component, supplier, certificate, interface, or lifecycle information remains visibly incomplete.
- **Citations retained:** Vulnerability, exploit, supplier, standard, and external-reference information retains its source.
- **Version-aware:** Every claim should connect to the relevant product model, hardware revision, software/firmware release, and supported lifecycle state.
- **Change-aware:** New releases, components, suppliers, certificates, vulnerabilities, or remote-service dependencies generate visible deltas.
- **Decision-aware:** A treatment choice records its rationale, owner, implementation status, residual risk, and review trigger.

**Link CTA:** `Explore Evidence & Data Provenance`

OXOT’s documentation describes grounding-first modeling, no-fabrication rules, explicit nulls for unsourced fields, retained citations, and the ability to regenerate BOMs, risk deltas, and technical-file sections as differences. [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/12239403/a7425b07-2cea-47fa-b15b-36eb18941064/OXOT-CDT-Product-Specification-V2.pdf?AWSAccessKeyId=ASIA2F3EMEYE4XK5VNOY&Signature=ALK7buHkgYD%2BBhS8mWIcnqIZFBU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIA2cuJrbdyHyYiOC4JuYguIVO7Eh%2FBzFAKRtR%2FETuQNaAiA1xLiOl1ygj%2BPkg%2FjA45c2hT7O0xVApXsjsjVSx71ysSr8BAjD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMGgJ9tBdlzykDJA78KtAEqWpw4t%2FYWWKb3qzjlzjsunDsIh0saZOQ2couYCYQ5%2BigDjFp5heN7TTPID1k0Qu93bkk0GFSVjnnvIMV0BxZD0icjQk%2B6Tx3r9LBYpQrl1SC01%2FtACRU0RG%2FVIjiRLQLHkJB63CxlHiq83sQqdgm%2FYE9S79QV1F7Qba8hrBnyKMdofEs5EGSDvdXv6IW9CnKUdsrDz0e2Yi3%2F9Wx2BA%2B%2FyzchdI%2BKxBTy%2B4ntztFI%2BdaOBIMEBmJ7mobLi7uhIVmQdnknmHRVXOZHj3wEETz0l0KYM7Cn7EEHp4oNcchdrVLz7MHGU1VbcElzPOxh4cwDrO8WIzhsTdnl7p6Rr%2FcU0ii%2Fs15WhQjx%2FqcN7diAAogSuF0evNnsOAbXlzSRl8bAjOhSvPuJ%2FE7PjA89U2ZzsPiejXdLISGmF35xjnV7MWhnh6y%2BYkX4XybCx4Nyq7JfoVKJjq%2BLNFwtRN4xXqLW2pntKIi03cG%2BpqHA87scYTVOfODgyCasfpkwS2%2F3nWVtmNRlfCB1NF7pPog0Na%2FkjFCxQCw5zYvixroLmXoB1Exw2q3j0Yk9WP02jfQD%2FBoNmwdAbeS6hrU1xOPH5E25l4HZwBHzJQcxq6asvFAFg16OMqS7p3o3eS1Z065u0RQ9EW8IUlOeFJ%2F9fowkY3N3r2k7fy5CfMf4nr3bj7LU%2BC9ExwYLKZLWvE%2FdiDDUeIus4k4jrEcNR6tIEDh26j%2FmMCGNGO8ZpgK%2F3s124w3dSU7mn9slNiwnrpw%2Ffd73MYEZnmrqBmbrZdXAEUK48A9fjCfxafUBjqZAdhiyASrR%2BzKB0T4fYbUlCL6xaT%2BOwGh82fbVX0abla3QxFLyYrbbBuLl%2BpZWUYywCdPc4Szgb647Vqh%2F3u9ZkrXa7dYH%2FJV0BAfMjpi%2Fd6asDyLZZn304Dur2QutdYkEEDXIbh4UrnCydK2bghLsWmskxikL0Pc%2BuTvFSKhm7MR0Gkr0B%2BnjvKOf8Q8Uq2BL2sgk0yZKCChyA%3D%3D&Expires=1787424882)

***

## What OXOT does—and does not do

### OXOT supports CRA evidence. It does not replace product accountability.

OXOT can help product manufacturers and their teams model dependencies, structure product-security evidence, connect vulnerabilities to product context, assess reachable pathways, compare treatment options, and support technical-documentation workflows.

However:

- OXOT does **not** determine whether a product is in CRA scope.
- OXOT does **not** determine whether a product is a default, important, or critical product category under the Regulation.
- OXOT does **not** select the appropriate conformity-assessment route.
- OXOT does **not** issue an EU declaration of conformity, CE marking, or certification.
- OXOT does **not** act as a notified body, market-surveillance authority, regulator, or legal adviser.
- OXOT does **not** guarantee CRA conformity.
- The manufacturer remains responsible for product cybersecurity, technical documentation, vulnerability handling, reporting, lifecycle support, and legal/regulatory obligations.

This distinction should appear clearly on the page. It strengthens OXOT’s credibility with serious manufacturers.

***

## Closing CTA

### Start with one product, one interface, or one dependency chain.

Bring a product architecture, system diagram, SBOM, firmware inventory, interface specification, support model, supplier list, vulnerability question, or technical-documentation challenge. OXOT will show how the Cyber Digital Twin can connect the component, the pathway, the customer consequence, and the evidence needed to support a defensible product-security decision.

**Primary CTA:** `Discuss CRA product evidence`  
**Secondary CTA:** `Request the Technical Specification`

***

## Metadata

**SEO title**  
Cyber Resilience Act Product Security Evidence & Technical Documentation | OXOT

**Meta description**  
Build CRA-oriented product-security evidence from the product you actually ship. OXOT’s Cyber Digital Twin connects SBOMs, hardware, cryptography, SaaS, operational dependencies, vulnerabilities, suppliers, and technical-documentation workflows.

**H1**  
Build CRA evidence from the product you actually ship.

**Suggested internal links**

- `/assurance`
- `/assurance/iec-62443`
- `/assurance/ts-50701`
- `/assurance/evidence-data-provenance`
- `/platform/cyber-digital-twin`
- `/platform/decisions/fix-first`
- `/platform/decisions/change-safely`
- `/resources/technical-specification`
- `/resources/insights/cyber-resilience-act`
- `/contact`