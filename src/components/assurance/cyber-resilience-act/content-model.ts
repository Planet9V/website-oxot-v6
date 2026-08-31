/**
 * CYBER RESILIENCE ACT — sections 04–12: the OXOT model half.
 *
 * Split out of `content.ts` purely for size (CLAUDE.md keeps files under 500
 * lines; the two halves were 583 together). The seam is the page's own: this
 * file holds everything about what OXOT models and produces, `content.ts`
 * holds the masthead and everything about the Regulation itself — scope, the
 * date calendar and Article 14. Same split precedent as cdt2/content-1.ts
 * and content-2.ts.
 *
 * `same()` is imported rather than redeclared, so there is exactly one
 * definition of the not-yet-translated marker to grep for when the real
 * translation pass starts. See content.ts's header for provenance and for
 * the two places this page deliberately departs from the source spec.
 */
import { same } from "./content";

/* ── 04 · Evidence gap ──────────────────────────────────────────────────── */

export const EVIDENCE_GAP = {
  title: same("Product-security evidence is scattered across engineering, supply chain and operations."),
  dek: same(
    "A connected product carries custom application software and firmware, commercial and open-source libraries, operating systems and containers, silicon, certificates and cryptographic libraries, remote-update mechanisms, cloud APIs and vendor portals, and the commissioning, maintenance, repair and end-of-life workflows around all of it. The evidence describing those dependencies is rarely in one place."
  ),
  tableHead: [same("Information type"), same("Usually held by")],
  rows: [
    [same("Product architecture"), same("Product engineering, system architects, R&D")],
    [same("Software and open-source components"), same("Development, DevSecOps, release engineering")],
    [same("Firmware and embedded dependencies"), same("Firmware teams, suppliers, manufacturing engineering")],
    [same("Hardware provenance"), same("Procurement, component engineering, contract manufacturers")],
    [same("Certificates and cryptography"), same("Security engineering, PKI, platform teams")],
    [same("Cloud and API dependencies"), same("Platform engineering, SaaS teams, operations")],
    [same("Vulnerability handling"), same("PSIRT, security, product support")],
    [same("Support and maintenance processes"), same("Field service, customer support, systems integrators")],
    [same("Product technical documentation"), same("Quality, regulatory, product management, compliance")],
    [same("Supplier dependency"), same("Procurement, legal, product engineering")]
  ],
  questionsHead: same("The cost is not an incomplete spreadsheet. It is an inability to answer"),
  questions: [
    same("Which product version contains the affected component?"),
    same("Which deployed products inherit the vulnerability?"),
    same("Is the component reachable through a product interface?"),
    same("What customer function could be affected?"),
    same("Which supplier, firmware, certificate, cloud API or maintenance path is involved?"),
    same("Which corrective measure works, and what does it change?"),
    same("Can the evidence be produced quickly if a market-surveillance authority asks?")
  ]
};

/* ── 05 · BOM views ─────────────────────────────────────────────────────── */

export const BOM_VIEWS = {
  title: same("One product model. Five dependency views."),
  dek: same(
    "OXOT models the product as a cyber-physical and operational system rather than as a software bill of materials with hardware appended. The five views below are distinct projections of one model, not five separate inventories to reconcile."
  ),
  tableHead: [same("View"), same("What it captures"), same("Where it lands in a technical file")],
  rows: [
    [
      same("SBOM"),
      same("Software and firmware components, including transitive dependencies where source information is available"),
      same("Identifies affected components, versions, libraries, packages, operating systems and firmware dependencies")
    ],
    [
      same("HBOM"),
      same("Microcontrollers, ASICs, PLC backplanes, hardware components, origin and physical supply dependencies"),
      same("Supports hardware traceability, supplier analysis, replacement planning and hardware-origin context")
    ],
    [
      same("CBOM"),
      same("Key lengths, certificate expiry, ciphers, cryptographic dependencies and post-quantum readiness context"),
      same("Supports evidence for cryptographic design, certificate lifecycle, secure communication, and update or identity dependencies")
    ],
    [
      same("SaaS-BOM"),
      same("Cloud APIs, hosted services, external platforms, vendor portals, remote-maintenance tunnels and third-party digital dependencies"),
      same("Shows dependencies outside the product boundary that can affect product security or lifecycle support")
    ],
    [
      same("Ops-BOM"),
      same("Human access roles, maintenance procedures, commissioning workflows, service schedules and support operations"),
      same("Captures how products are actually configured, updated, maintained, repaired and remotely supported")
    ]
  ],
  pullQuote: same(
    "A component inventory tells you what exists. A dependency model tells you what can reach it, what it supports, and what happens when it fails."
  ),
  pullBody: same(
    "A vulnerable library may exist in a product and be unreachable in the deployed configuration. A remotely accessible maintenance interface with a modest vulnerability may create a high-consequence pathway into a safety-related controller. Severity alone separates neither case from the other."
  ),
  exports: same(
    "The model supports machine-readable CycloneDX BOM exports and DEXPI 2.0 exports alongside the engineering views, so a BOM leaving the model stays something a supplier or an authority can ingest."
  )
};

/* ── 06 · Product boundary ──────────────────────────────────────────────── */

export const PRODUCT_BOUNDARY = {
  title: same("Define what you place on the market before you try to document it."),
  dek: same(
    "The first practical CRA task is a disciplined product boundary: what the product is, as distinct from its interfaces, external dependencies, optional modules, deployment environment and supporting services. The diagram below is the shape that boundary takes for a connected industrial product."
  ),
  figCaption: same(
    "Static diagram — the product core and the seven dependency classes that cross its boundary. Not a live view of a modelled product."
  ),
  core: same("Product"),
  coreSub: same("Embedded software · firmware · hardware · security functions"),
  edges: [
    same("User and operator interfaces"),
    same("OT and IT protocols, network interfaces"),
    same("Configuration and diagnostics"),
    same("Update and recovery interfaces"),
    same("Certificates and cryptography"),
    same("Cloud, API and mobile services"),
    same("Vendor, integrator and field-service support")
  ],
  tableHead: [same("Evidence area"), same("The question it has to answer")],
  rows: [
    [same("Product identity"), same("What is the product name, model, hardware revision, firmware and software release, and supported lifecycle?")],
    [same("Product architecture"), same("What are the main functions, modules, interfaces, data flows and trust boundaries?")],
    [same("Intended purpose"), same("What is the product designed to do, where is it intended to operate, and what operational or safety constraints apply?")],
    [same("Deployment context"), same("Does it operate in an industrial network, data centre, railway, utility, building, cloud, edge or consumer environment?")],
    [same("Interfaces"), same("Which physical, wireless, network, serial, API, management, diagnostic, USB, maintenance, cloud and user interfaces exist?")],
    [same("Security functions"), same("What authentication, authorisation, encryption, update, logging, secure-boot, identity and configuration controls are provided?")],
    [same("External dependencies"), same("Which cloud services, mobile apps, APIs, certificate authorities, vendor portals, remote-support paths and third-party platforms are required?")],
    [same("Lifecycle scope"), same("How is the product commissioned, configured, updated, monitored, maintained, repaired and decommissioned?")],
    [same("Supplier boundaries"), same("Which components, software, firmware, services and support activities are supplied by third parties?")]
  ]
};

/* ── 07 · By design ─────────────────────────────────────────────────────── */

export const BY_DESIGN = {
  title: same("Make product security a design decision, not a release-stage patch."),
  dek: same(
    "The CRA requires cybersecurity to be accounted for in planning, design, development, production, delivery and maintenance, and vulnerabilities to be addressed across the expected product lifetime. Security-by-design evidence becomes concrete when a security requirement is connected to an actual product function, interface, component and deployment context."
  ),
  tableHead: [same("Design question"), same("What the model can show")],
  rows: [
    [same("Which interfaces are necessary?"), same("Physical, network, remote-management, cloud, local, service, diagnostic and user interfaces")],
    [same("Which interfaces are exposed?"), same("Reachable services, protocols, remote paths, communication routes and trust boundaries")],
    [same("Who can configure or update the product?"), same("Identity, role, certificate, account, service-tool, vendor and approval dependencies")],
    [same("What happens if an interface is misused?"), same("Pathway from interface to component, function, process, service or customer consequence")],
    [same("What must be protected by default?"), same("Default configuration, least privilege, limited services, separation, authentication, encryption and secure-update decisions")],
    [same("What shared dependency creates common-mode risk?"), same("Shared cloud service, certificate authority, firmware image, library, maintenance tool, identity system or supplier")],
    [same("Can a security change break an intended function?"), same("Required flows, supported protocols, customer deployment patterns, recovery logic and operational constraints")],
    [same("What evidence supports the decision?"), same("Architecture documents, source artefacts, test records, configuration records, supplier data and approved assumptions")]
  ],
  worked: {
    label: same("Worked example — a secure remote-maintenance decision"),
    steps: [
      { k: same("Baseline"), v: same("A field-service tool can connect persistently to a product's management interface.") },
      { k: same("Question"), v: same("Can broad persistent access be removed while retaining safe, supportable diagnosis and update capability?") },
      { k: same("Twin analysis"), v: same("Vendor portal → support identity → remote gateway → management interface → firmware update and configuration function → customer operational effect") },
      { k: same("Treatment"), v: same("Named accounts, MFA, time-limited access, session recording, asset-specific permissions, signed update packages, local approval") },
      { k: same("Evidence"), v: same("Interface model, access architecture, support workflow, update sequence, residual pathway, approved security decision") }
    ]
  }
};

/* ── 08 · Vulnerability ─────────────────────────────────────────────────── */

export const VULNERABILITY = {
  title: same("Know what is affected, what is reachable, and what customers have to do."),
  dek: same(
    "The Regulation requires vulnerabilities to be handled across the product lifecycle: identified, documented, addressed, and — for actively exploited vulnerabilities and severe incidents — reported. The chain below is the path a product-security team has to walk under time pressure."
  ),
  chain: [
    same("Vulnerability advisory, CVE or exploit intelligence"),
    same("Affected software, firmware, hardware or service component"),
    same("Product versions and customer deployment context"),
    same("Reachability through product interfaces and configuration"),
    same("Operational, customer or physical consequence"),
    same("Mitigation, update, workaround, notification and closure evidence")
  ],
  chainNote: same(
    "Reachability is assessed through modelled topology rather than severity alone. Enrichment from known-exploited-vulnerability catalogues, exploit probability, CVSS, CWE, CAPEC and MITRE ATT&CK enters as an approved input, not as the decision."
  ),
  tableHead: [same("Evidence area"), same("What the model carries")],
  rows: [
    [same("Affected component"), same("Maps vulnerability identifiers to software, firmware, hardware, cryptographic, SaaS or operational dependencies")],
    [same("Product version"), same("Connects the component to affected models, firmware and software releases, configurations and lifecycle status")],
    [same("Exploitability"), same("Uses product interfaces, deployed topology, exposed services, access paths and configuration context to assess reachable pathways")],
    [same("Consequence"), same("Connects component compromise to product function, customer service, operational process, safety or reliability impact, and downstream dependency")],
    [same("Mitigation options"), same("Compares patch, configuration change, disabled service, access restriction, certificate rotation, compensating control, replacement, and escalation path")],
    [same("Customer action"), same("Records the workaround, update, configuration or operational guidance required of customers and integrators")],
    [same("Evidence trail"), same("Retains source, decision owner, release, remediation status, known limitations and review date")]
  ],
  example: {
    label: same("Worked example — a web-server library in a connected controller"),
    intro: same(
      "A connected industrial controller with an Ethernet management interface, an embedded web server, OPC UA and Modbus TCP communications, signed firmware updates, a vendor cloud support portal, a field-service laptop workflow, and a third-party cryptographic library on an embedded operating system. A newly disclosed vulnerability affects the web-server library."
    ),
    steps: [
      same("Web-server library version identified in the SBOM view"),
      same("Affected controller firmware releases resolved from the version graph"),
      same("Management interface enabled in the shipped product configuration"),
      same("Reachable from the customer maintenance network"),
      same("Potential pathway to the configuration and control function"),
      same("Mitigations compared: firmware update, disable web management, restrict management-network access, require brokered service access, publish a customer advisory")
    ],
    close: same(
      "What the technical file then retains is the affected versions, the reachability analysis, the consequence reasoning, the mitigation selected, the release record, the customer instruction, and the evidence sources with their review and approval record. That is a materially stronger record than a line reading: CVE reviewed, patch issued."
    )
  }
};

/* ── 09 · Technical file ────────────────────────────────────────────────── */

export const TECHNICAL_FILE = {
  title: same("Technical documentation should show the reasoning, not just the result."),
  dek: same(
    "CRA technical documentation must contain the information the Regulation requires and be available to market-surveillance authorities on request. The Cyber Digital Twin supports the evidence-gathering and traceability behind that documentation. It does not create, sign, maintain or retain the technical file — that stays with the manufacturer."
  ),
  tableHead: [same("Documentation area"), same("Model-backed evidence")],
  rows: [
    [same("Product description"), same("Product scope, intended purpose, architecture, interfaces, models, versions and deployment context")],
    [same("System and interface architecture"), same("Components, trust boundaries, protocols, data flows, cloud and API dependencies, management interfaces, remote-access paths")],
    [same("Component inventory"), same("SBOM, HBOM, CBOM, SaaS-BOM and Ops-BOM outputs")],
    [same("Risk assessment"), same("Threats, vulnerabilities, interfaces, pathways, consequences, mitigation options and residual risks")],
    [same("Security-by-design decisions"), same("Chosen controls, rationale, relevant requirements, alternatives considered, evidence of treatment")],
    [same("Vulnerability handling"), same("Detection, triage, affected versions, exploitability, mitigation, customer communication and closure history")],
    [same("Update and maintenance evidence"), same("Update mechanism, version history, signing and verification dependencies, rollout constraints, rollback, support lifecycle")],
    [same("Supplier and third-party evidence"), same("Component origin, supplier role, support dependencies, contracts, version obligations and replacement options")],
    [same("Change history"), same("Changed component, firmware, dependency, certificate, interface, configuration, supplier or treatment decision")],
    [same("Evidence provenance"), same("Links from each claim to source artefacts, test records, approved assumptions and accountable review")]
  ],
  traceLabel: same("Requirements trace — one technical-file statement, followed down to its sources"),
  trace: [
    { k: same("Statement"), v: same("The product restricts administrative access to authorised users.") },
    { k: same("Architecture"), v: same("Administrative interface → identity service → authorisation model → management function → audit trail") },
    { k: same("Artefacts"), v: same("Interface specification, configuration baseline, test evidence, certificate and credential design, role model, maintenance procedure") },
    { k: same("Lifecycle"), v: same("Version history, vulnerability records, update path, support process, change approval, review date") }
  ],
  principlesHead: same("Evidence principles"),
  principles: [
    [same("Grounding first"), same("Start from actual product architecture, source, component, firmware, hardware, interface, supplier and lifecycle evidence.")],
    [same("No fabrication"), same("Component relationships, deployment assumptions, security controls and product claims are not invented to fill a gap.")],
    [same("Null over zero"), same("Unknown component, supplier, certificate, interface or lifecycle information stays visibly incomplete rather than defaulting to a number.")],
    [same("Citations retained"), same("Vulnerability, exploit, supplier and standard references keep their source.")],
    [same("Version-aware"), same("Every claim connects to a product model, hardware revision, software or firmware release, and supported lifecycle state.")],
    [same("Change-aware"), same("New releases, components, suppliers, certificates, vulnerabilities or remote-service dependencies generate a visible delta.")],
    [same("Decision-aware"), same("A treatment choice records its rationale, owner, implementation status, residual risk and review trigger.")]
  ]
};

/* ── 10 · Support period and retention ──────────────────────────────────── */

export const SUPPORT_PERIOD = {
  title: same("The support period and the retention clock are linked, not parallel."),
  dek: same(
    "These two are routinely listed as siblings on compliance pages. They are not siblings: one sets the length of the other, and that dependency is what a manufacturer actually has to plan around."
  ),
  rows: [
    {
      k: same("Art 13(8)"),
      title: same("Support period"),
      v: same("The support period shall be at least five years. Where the product is expected to be in use for less than five years, the support period shall correspond to the expected use time. Five years is a floor a genuinely short-lived product can fall below — not a flat five-year rule.")
    },
    {
      k: same("Art 13(13)"),
      title: same("Retention"),
      v: same("Manufacturers shall keep the technical documentation and the EU declaration of conformity at the disposal of market-surveillance authorities for at least 10 years after the product has been placed on the market, or for the support period, whichever is longer.")
    }
  ],
  consequence: same(
    "A support period longer than ten years extends the retention obligation past ten years. Ten years is a floor, not the answer. Any statement listing ten years and the support period as two separate items hides the one relationship that determines how long the evidence has to stay reproducible."
  ),
  modelPoint: same(
    "Which is a modelling requirement before it is a records-management one. The evidence has to remain reconstructible against a product revision that may have been out of production for a decade, including the supplier, certificate and cloud dependencies that have since been discontinued."
  )
};

/* ── 11 · Supply chain and change ───────────────────────────────────────── */

export const SUPPLY_CHAIN = {
  title: same("A product's security depends on more than its code."),
  dek: same(
    "Product security tends to fail at the boundary between manufacturer, component supplier, firmware provider, contract manufacturer, cloud provider, systems integrator, field-service organisation and customer environment. Those boundaries are modelled as dependencies rather than described in a supplier register."
  ),
  tableHead: [same("Question"), same("Why it decides something")],
  rows: [
    [same("Which supplier provides the component, firmware, service or support capability?"), same("Supplier concentration, discontinuation, compromise, sanctions, quality and lifecycle risk")],
    [same("Which product versions inherit a component dependency?"), same("Impact assessment when a vulnerability, support issue or end-of-life notice emerges")],
    [same("Which certificate or key dependencies exist?"), same("Certificate expiry, revoked trust, cryptographic transition and secure-update continuity can affect whole fleets")],
    [same("Which cloud or API services are necessary?"), same("A supplier outage, API change, compromised service or data-residency issue can affect product operation or support")],
    [same("Which field-service tools can reach the product?"), same("Maintenance laptops, vendor portals, remote support, commissioning tools and integrator accounts create high-consequence pathways")],
    [same("Which parts are difficult to replace?"), same("Lead time, certification, compatibility, customer qualification, safety impact and repair capacity shape the remediation strategy")],
    [same("Which customer environments are affected?"), same("The same product issue has different consequences in a factory, railway, utility, hospital, defence facility or data centre")]
  ],
  pullQuote: same(
    "A supplier list is not supply-chain security. Supply-chain security begins when you can see which product function, customer deployment, update path, support process and remediation option depends on that supplier."
  ),
  changeHead: same("Change management"),
  changeDek: same(
    "Every release can alter the product's security posture: a new library, compiler, firmware package, operating system or container image; a changed protocol, API, default configuration or remote-management function; a rotated certificate or a cipher migration; a new component supplier, hardware revision or manufacturing location; an end-of-support decision. The useful output of a release is not a new component list — it is the delta."
  ),
  changeChain: [
    same("Previous product version"),
    same("Changed component, interface, supplier, control or workflow"),
    same("New reachable pathways, dependencies or mitigations"),
    same("Updated risk and treatment decision"),
    same("Updated documentation and evidence package")
  ],
  changeQuestion: same(
    "What changed in the security story of the product, and what evidence shows that the change was assessed?"
  )
};

/* ── 12 · Limits ────────────────────────────────────────────────────────── */

export const LIMITS = {
  title: same("OXOT supports CRA evidence. It does not replace product accountability."),
  dek: same(
    "OXOT can model dependencies, structure product-security evidence, connect vulnerabilities to product context, assess reachable pathways, compare treatment options and support technical-documentation workflows. The list below is the other half of that sentence, and it belongs on the page rather than in a footnote."
  ),
  items: [
    same("OXOT does not determine whether a product is in CRA scope."),
    same("OXOT does not determine whether a product falls in a default, important or critical product category under the Regulation."),
    same("OXOT does not select the conformity-assessment route."),
    same("OXOT does not issue an EU declaration of conformity, CE marking or certification."),
    same("OXOT does not act as a notified body, market-surveillance authority, regulator or legal adviser."),
    same("OXOT does not guarantee CRA conformity.")
  ],
  responsibility: same(
    "The manufacturer remains responsible for defining scope, meeting the applicable requirements, completing and retaining the technical file, issuing declarations, applying CE marking where required, managing vulnerability reporting, supporting the product across its support period, and selecting any required conformity-assessment route."
  )
};

export const CLOSE = {
  title: same("Start with one product, one interface, or one dependency chain."),
  body: same(
    "Bring a product architecture, a system diagram, an SBOM, a firmware inventory, an interface specification, a support model, a supplier list, a vulnerability question or a technical-documentation problem. The useful first session traces one component through to one customer consequence and shows what evidence the trace leaves behind."
  ),
  ctaPrimary: same("Discuss CRA product evidence"),
  fine: same("A working session, not a scoping call. Bring the awkward product."),
  onwardHead: same("Related reading")
};
