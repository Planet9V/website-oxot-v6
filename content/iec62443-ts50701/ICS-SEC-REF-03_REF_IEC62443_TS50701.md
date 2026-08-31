---
tags: [iec62443, workpaper, iec62443, ts50701, mapping]
type: reference
status: converted
---

canvas:

- "[[ICS-SEC-REF-Comentary-14MAR2026.canvas]]" ICS-SEC-REF-Comentary-14MAR2026: []

# Reference: REF 62443 TS50701 Rail Assurance

## IEC 62443-3-2 / TS 50701 Cybersecurity Case

| Field | Value |
| --- | --- |
| Project | [Project Name] — Cybersecurity Case Dossier |
| Document ID | [[ICS-SEC-REF-03_REF_IEC62443_TS50701]] |
| Version | 1.0 FINAL |
| Date | 2026-03-02 |
| Author | Jim McKenney, [Firm] |
| Reviewer | — |
| Status | COMPILED |
| Dossier Section | References |
| Dossier Position | Document 86 of 101 |
| Classification | CONFIDENTIAL — [Project Name] Use Only |

# REF 62443 TS50701 Rail Assurance

# **1. Executive Summary**

The modernization of the global railway sector has precipitated a fundamental shift in the operational risk landscape. As railway systems migrate from bespoke, isolated electro-mechanical controls to interconnected, digitalized architectures utilizing Commercial Off-The-Shelf (COTS) components, they inherit the vulnerability profiles of the broader Information Technology (IT) ecosystem. However, unlike standard enterprise IT, the railway domain is governed by strict safety regulations where system failure can result in loss of life or catastrophic infrastructure damage. Consequently, the cybersecurity assurance process for rail projects—specifically the mechanism for sign-off and Practical Completion (PC)—must reconcile the dynamic nature of cyber threats with the deterministic requirements of functional safety.

**Cybersecurity Case** as the primary vehicle for system acceptance and sign-off in railway engineering. It establishes the "Minimum Cybersecurity Requirements" by synthesizing the horizontal industrial standard **IEC 62443** with its vertical railway adaptation, **CENELEC CLC/TS 50701:2023**. The analysis moves beyond high-level principles to identify the precise clauses, artifacts, and evidentiary standards required to achieve engineering compliance.

## The central thesis of this report is that the **Cybersecurity Cas**e is not merely a retrospective compliance checklist but a structured, evidence-based argument that demonstrates the system's security posture is commensurate with its risk appetite and safety obligations. This document delineates the critical dependency between the Cybersecurity Case and the Safety Case, mediated through **Security-Related Application Conditions (SecRACs)**. It further provides a granular template for the Cybersecurity Case and a detailed schedule of artifacts required for Practical Completion, serving as a definitive reference for System Integrators (SIs), Asset Owners, and Independent Safety Assessors (ISAs) navigating the complex "System of Systems" environment of modern rail.

The following sections will deconstruct the regulatory framework, define the exact content requirements for sign-off, and provide actionable templates and schedules to ensure project delivery aligns with the rigorous demands of IEC 62443 and TS 50701.

# **2. Regulatory Framework and Standards Architecture**

To construct a compliant Cybersecurity Case, engineering teams must navigate a hierarchy of standards that bridge generic industrial security with specific railway constraints. The alignment between these standards is not incidental but structural; understanding this architecture is a prerequisite for successful system validation.

### **2.1 The Foundational Standard: IEC 62443 Series**

The **ISA/IEC 62443** series serves as the foundational horizontal standard for Industrial Automation and Control Systems (IACS). It provides the technical and procedural baseline upon which rail-specific requirements are built. For the purpose of system sign-off and the Cybersecurity Case, four specific parts of this series are critical:

#### * **IEC 62443-2-4 (Requirements for IACS Service Providers):** This standard is pivotal for the engineering and integration teams. It specifies the *process* capabilities required of the System Integrator. It dictates that security is not just a product feature but a result of a secure engineering lifecycle, including staffing, architecture selection, and configuration management.1

- **IEC 62443-3-2 (Security Risk Assessment for System Design):** This part governs the methodology for partitioning the system into Zones and Conduits and performing the risk assessment. It creates the "Zone and Conduit Diagram," which is the architectural skeleton of the Cybersecurity Case.3
- **IEC 62443-3-3 (System Security Requirements and Security Levels):** This document defines the technical "Minimum Cybersecurity Requirements." It lists the functional capabilities (e.g., access control, encryption strength) that the system must technically achieve to meet a target Security Level (SL-T).5
- **IEC 62443-4-1 and 4-2 (Product Development and Components):** While primarily for product suppliers, the Cybersecurity Case must reference these standards to demonstrate that the constituent components (e.g., PLCs, HMIs, Network Switches) are secure by design.1
### **2.2 The Sector-Specific Adaptation: CLC/TS 50701**

**CLC/TS 50701:2023 "Railway applications - Cybersecurity"** is the European technical specification that translates the IEC 62443 series into the railway context. It does not replace IEC 62443; rather, it provides the necessary context to apply it within the **EN 50126** (RAMS - Reliability, Availability, Maintainability, and Safety) lifecycle.

**Key Divergences and Additions:**

- **The Cybersecurity Case Concept:** Unlike IEC 62443, which focuses on a "Cybersecurity Management System" (CSMS), TS 50701 explicitly introduces the **Cybersecurity Case**. This concept is imported directly from the railway safety domain (Safety Case) to provide a familiar assurance structure for rail authorities.7
- **Scope Expansion:** TS 50701 expands the scope beyond "Automation" to cover the entire Railway System, including Rolling Stock, Fixed Installations, Signalling, and Telecommunications.8
- **Safety-Security Interface:** TS 50701 explicitly mandates the management of the interface between safety and cybersecurity, requiring synchronization points where security risks that could impact safety are identified and mitigated.10
# **3. Minimum Cybersecurity Requirements for Sign-Off**

The term "Minimum Cybersecurity Requirements" is often used contractually to define the threshold for acceptance. In the context of IEC 62443 and TS 50701, this threshold is defined by a specific set of clauses that must be satisfied. Failure to meet these requirements constitutes a non-conformance that can block Practical Completion.

## **3.1 TS 50701 Minimum Cybersecurity Requirements**

The **TS 50701 Minimum Cybersecurity Requirements** focus on the *process* of assurance. The standard dictates that a specific methodology must be followed to derive and validate technical controls. The following clauses constitute the mandatory baseline for sign-off.

### **Requirement 1: Formal System Definition and Zoning (Clause 6)**

- **Citation:** **CLC/TS 50701:2023, Clause 6.3 "System Definition" and Clause 6.4 "Zone and Conduit Model"**.8
- **Detail:** The engineering team must produce a formal document defining the System Under Consideration (SuC). This document must partition the system into Zones (groups of assets with similar security requirements) and Conduits (communication paths).
- **Sign-Off Evidence:** A "System Architecture and Zoning Report" that identifies every physical and logical asset and maps them to a specific Security Zone. This zoning must explicitly consider the "Reference Architecture" defined in the standard.5
### **Requirement 2: Detailed Risk Assessment (Clause 7)**

- **Citation:** **CLC/TS 50701:2023, Clause 7 "Detailed Risk Assessment"**.8
- **Detail:** A generic "best practice" approach is insufficient. The standard mandates a Detailed Risk Assessment (DRA) that evaluates threats against the specific architecture. This can be achieved via:
  - **Explicit Risk Evaluation:** A detailed threat modeling exercise (e.g., STRIDE) assessing likelihood and impact.10
  - **Code of Practice (CoP):** Applying a pre-validated set of security controls for standard architectures.
  - **Reference System:** Demonstrating equivalence to a previously certified system.
- **Sign-Off Evidence:** A "Cybersecurity Risk Assessment Report" (CRAR) that documents the methodology used, the threats identified, and the resulting Security Level Target (SL-T) for each zone.
#### **Requirement 3: The Cybersecurity Case (Clause 9)**

- **Citation:** **CLC/TS 50701:2023, Clause 9.2 "Cybersecurity Case"**.10
- **Detail:** This is the most critical sign-off requirement. The standard states: "The cybersecurity case provides the evidence and argumentation, that the system as designed and developed can be operated to the expected security confidence level." It is the container for all assurance evidence.
- **Sign-Off Evidence:** The delivery of the **Cybersecurity Case** document itself, structured according to Annex G (see Section 4 of this report).
#### **Requirement 4: Security-Related Application Conditions (SecRACs) (Clause 9 & Annex G)**

- **Citation:** **CLC/TS 50701:2023, Clause 9 and Annex G.2**.10
- **Detail:** It is rarely possible to mitigate all risks technically within the system boundaries. Conditions that must be handled by the operator (e.g., "physically secure the server room," "revoke access for terminated employees") must be formally "exported."
- **Sign-Off Evidence:** A signed "List of Exported SecRACs." The Asset Owner must formally accept these conditions. This is a critical liability transfer mechanism at Practical Completion.11
## **3.2 IEC 62443 Minimum Cybersecurity Requirements**

While TS 50701 defines the *process*, **IEC 62443-3-3** defines the *technical substance*. The "Minimum Cybersecurity Requirements" technically refer to meeting the Foundational Requirements (FRs) at the assigned Security Level (SL). For most critical railway systems (signalling, traction power), **Security Level 2 (SL-2)** is the industry-standard minimum, defined as protection against "intentional violation using simple means with low resources, generic skills, and low motivation".6

### **Requirement 1: Foundational Requirements Compliance (IEC 62443-3-3)**

- **Citation:** **IEC 62443-3-3:2019, Clauses 5 through 11**.5
- **Detail:** The system must demonstrate compliance with the seven foundational requirements. A detailed breakdown of what this entails for sign-off follows:
  - **FR 1: Identification and Authentication Control (Clause 5):**
    - *Minimum Requirement (SL-2):* The system must identify and authenticate all human users and software processes. It implies the prohibition of shared generic accounts (e.g., "Admin"/"1234") and often requires Multi-Factor Authentication (MFA) for remote or critical access.
  - **FR 2: Use Control (Clause 6):**
    - *Minimum Requirement (SL-2):* Enforcement of Least Privilege. Users must only have the permissions necessary for their role.
  - **FR 3: System Integrity (Clause 7):**
    - *Minimum Requirement (SL-2):* Mechanisms to protect the integrity of the application (e.g., firmware signing) and detect unauthorized changes (e.g., Integrity Monitoring).
  - **FR 4: Data Confidentiality (Clause 8):**
    - *Minimum Requirement (SL-2):* Encryption of data at rest and in transit, particularly across untrusted networks (conduits).
  - **FR 5: Restricted Data Flow (Clause 9):**
    - *Minimum Requirement (SL-2):* Network segmentation. The system must be partitioned into zones, with traffic flow controlled by firewalls or gateways (e.g., Data Diodes for high-criticality zones).
  - **FR 6: Timely Response to Events (Clause 10):**
    - *Minimum Requirement (SL-2):* Security audit logging. The system must generate logs for security-relevant events (logins, failures, errors) and alert operators to potential incidents.
  - **FR 7: Resource Availability (Clause 11):**
    - *Minimum Requirement (SL-2):* Protection against Denial of Service (DoS) conditions and provisions for backup and recovery.
- **Sign-Off Evidence:** A "Requirements Traceability Matrix" (RTM) linking every IEC 62443-3-3 requirement (e.g., SR 1.1, SR 1.2) to a specific design feature or test result.
### **Requirement 2: System Integrator Maturity (IEC 62443-2-4)**

- **Citation:** **IEC 62443-2-4, Clause 5**.2
- **Detail:** The sign-off process also validates the *provider*. The System Integrator must demonstrate they followed a secure architecture and staffing plan.
- **Sign-Off Evidence:** Evidence of "Solution Staffing" (competent personnel) and "Assurance" (testing methodologies used during integration).
# **4. The IEC 62443 / TS 50701 Cybersecurity Case Template**

This section provides a detailed structure for the **Cybersecurity Case**, the definitive deliverable for system acceptance. This template is engineered to satisfy the content requirements of **TS 50701 Annex G** while ensuring all evidentiary needs of **IEC 62443** are met.

**Usage:** This template serves as a structure for drafting the document. Each section description explains the content that must be generated by the engineering team.

**Document Meta-Data:**

- **Title:** [Project Name] – Cybersecurity Case
- **Document ID:**
- **Standard:** CENELEC CLC/TS 50701:2023 / IEC 62443
## **H1: 1. Executive Summary**

- **Content Description:** Provide a high-level executive overview of the cybersecurity posture of the System Under Consideration (SuC). This section must summarize the scope of the system, the target Security Level (SL-T) achieved, and the final conclusion regarding the system's readiness for operation. It should explicitly state whether the system is recommended for acceptance, acceptance with conditions, or rejection, minimizing technical jargon for senior management stakeholders.
## **H1: 2. Introduction and Scope**

- **Content Description:** Define the specific purpose of the Cybersecurity Case document in the context of the engineering project. Identify the "System Under Consideration" (SuC) and the regulatory framework (TS 50701 / IEC 62443) governing the assessment.
  - **H2: 2.1 System Description:** Provide a functional description of the railway system (e.g., CBTC signalling, Traction Power SCADA, Passenger Information System). This section should reference high-level architectural drawings to provide context.
  - **H2: 2.2 Scope of Certification:** Explicitly define the boundaries of the Cybersecurity Case—what is *in* scope and what is *out* of scope. Reference the "Zone and Conduit Diagram" here to delineate the assessment boundary clearly.
  - **H2: 2.3 Normative References:** List all standards and regulations used as the basis for compliance (e.g., CLC/TS 50701:2023, IEC 62443-3-3:2019, IEC 62443-2-4:2018, National Railway Security Regulations).
## **H1: 3. Cybersecurity Management**

- **Content Description:** Describe the organizational structure and processes used to manage cybersecurity throughout the project lifecycle.
  - **H2: 3.1 Roles and Responsibilities:** Detail the cybersecurity organization for the project. Identify key roles such as the Cybersecurity Manager, the System Integrator, and the Validator, referencing the "Cybersecurity Management System" (CSMS).11
  - **H2: 3.2 Supplier Management:** Describe the methodology used to manage supply chain security. Detail how COTS products were vetted and if suppliers were required to meet IEC 62443-4-1 (Secure Development Lifecycle) standards. Reference "Supplier Security Conformity Reports."
## **H1: 4. Risk Assessment (The "Argument")**

- **Content Description:** This section forms the core "argument" of the case, summarizing the results of the risk assessment to justify the selected security measures.
  - **H2: 4.1 Threat Landscape:** Describe the specific threat environment considered for this system (e.g., "State-sponsored actors targeting safety," "Criminal ransomware," "Insider threats"). Reference the "Threat Analysis Report" and alignment with industry threat intel.4
  - **H2: 4.2 Risk Assessment Methodology:** Briefly explain the risk assessment method used (e.g., Explicit Risk Assessment per TS 50701 Clause 7, or adherence to a specific Code of Practice).
  - **H2: 4.3 Risk Results & Security Level Targets (SL-T):** Present the results of the risk assessment, specifically the Target Security Level (SL-T) determined for each Zone. Use a table to show SL-T per Zone (e.g., Zone A: SL-2, Zone B: SL-1) and reference the detailed "Cybersecurity Risk Analysis Report."
## **H1: 5. Cybersecurity Requirements Specification (CRS)**

- **Content Description:** Detail the specific technical and procedural requirements that were derived from the risk assessment to meet the SL-T.
  - **H2: 5.1 Technical Requirements (IEC 62443-3-3):** Summarize how the system meets the 7 Foundational Requirements (FRs). Do not list every single requirement but summarize the approach (e.g., "Access Control is achieved via Centralized Active Directory," "Network segmentation is enforced via Industrial Firewalls"). Reference the full "Cybersecurity Requirements Specification" document.
  - **H2: 5.2 Compensating Countermeasures:** Describe any alternative measures used where a standard requirement could not be technically met (e.g., "Physical locks and CCTV used instead of digital authentication for legacy controllers"). This is critical for justifying deviations from the standard.
## **H1: 6. Verification and Validation (The "Evidence")**

- **Content Description:** Present the *proof* that the requirements defined in Section 5 have been implemented and function as intended.
  - **H2: 6.1 Verification Activities:** Describe the review activities performed, such as reviews of design documents, architecture diagrams, and code reviews. Reference "Design Review Reports."
  - **H2: 6.2 Validation Activities (Testing):** Describe the dynamic testing performed on the system (e.g., Penetration Testing, Fuzz Testing, Vulnerability Scanning, Factory Acceptance Testing (FAT) for security).
  - **H2: 6.3 Test Results Summary:** Summarize the outcome of the testing. Explicitly mention if critical failures were found and remediated. Reference the "Cybersecurity Validation Report".10
## **H1: 7. Security Related Application Conditions (SecRACs)**

- **Content Description:** List the specific conditions and procedures that the *operator* or *maintainer* must fulfill to maintain the system's security during operation. This is the most critical section for the "Handover" process.## * **H2: 7.1 Exported Conditions:** List every SecRAC in detail. Examples include: "The Operator must revoke access rights within 24 hours of employee termination," or "Physical keys to roadside cabinets must be logged and audited."
  - **H2: 7.2 Safety Interface:** Identify which SecRACs have potential safety implications. Reference the "Safety Case" to demonstrate alignment and ensure that security measures do not compromise safety integrity.11
## **H1: 8. Residual Risk Statement**

- **Content Description:** Declare the final risk posture of the system. Identify any risks that remain "untreated" but have been formally accepted.
  - **H2: 8.1 Risk Acceptance:** Provide the formal "Risk Acceptance Statement" signed by the Asset Owner, acknowledging any residual risks that exceed the standard risk appetite.
## **H1: 9. Conclusion**

- **Content Description:** Provide the final assertion of the Cybersecurity Case. State clearly: "Based on the evidence and argumentation presented, the system is fit for service regarding cybersecurity," subject to the maintenance of the SecRACs.
# **Appendix**

- **Content Description:** List all referenced external documents (e.g., "Appendix A: Vulnerability Scan Report," "Appendix B: Penetration Test Report," "Appendix C: Zone and Conduit Diagram"). This ensures the Cybersecurity Case remains a readable summary while pointing to the detailed evidence.
# **5. Artifacts for Practical Completion (PC)**

Practical Completion (PC) is the contractual milestone where the engineering project is deemed "complete" and responsibility is handed over to the operator. For cybersecurity, this is a critical gate; if artifacts are missing, the system cannot be securely operated, and PC should theoretically be denied.

The research identifies specific artifacts mandated by **IEC 62443-2-4** (Integration) and **TS 50701** (Rail System Assurance) that must be delivered *before* PC.

## **5.1 Table of Required Cybersecurity Artifacts**

The following table lists the mandatory artifacts, their regulatory basis, dependencies, and delivery timing relative to PC.

| ID | Artifact Name | Source Citation | Description | Precursors (Dependencies) | Due Date | Example References |
| --- | --- | --- | --- | --- | --- | --- |
| PC-01 | Final Cybersecurity Case | TS 50701 Cl. 9.2 10; Annex G 11 | The comprehensive argument and evidence dossier demonstrating security. Must include the "Declaration of Conformity." | Risk Assessment (PC-02), Validation Report (PC-03), SecRACs (PC-04) | 4 Weeks Before PC | Example 1 |
| PC-02 | Cybersecurity Risk Assessment Report (Final) | IEC 62443-3-2 3; TS 50701 Cl. 7 8 | Document detailing all identified threats, vulnerabilities, and the final risk treatment plan (mitigated/accepted). | Initial Risk Assessment, Asset Inventory | 8 Weeks Before PC | Example 2 |
| PC-03 | Cybersecurity Validation Report | IEC 62443-2-4 2; TS 50701 Cl. 9.4 10 | Evidence of testing (Penetration Test, FAT/SAT). Must show that all "Open" vulnerabilities are closed or managed. | System Integration, Verification Reports | 4 Weeks Before PC | Example 3 |
| PC-04 | List of Exported SecRACs | TS 50701 Annex G.2 11; EN 50129 11 | Formal list of security conditions theAsset Owner must fulfill (e.g., patch cycles, physical access). Handover document. | Cybersecurity Case, Safety Case Interface | At PC Handover | Example 4 |
| PC-05 | Asset Inventory & Zone Diagram (As-Built) | IEC 62443-2-1 1; IEC 62443-3-2 4 | Detailed inventory of all hardware/software (SBOM) and the final network topology map (Zones/Conduits). | System Design, Installation | At PC Handover | Example 5 |
| PC-06 | Patch Management & Vulnerability Handling Plan | IEC 62443-2-4 2; TS 50701 Clause 10 8 | Manuals and procedures for how the system will be patched during Operation & Maintenance (O&M). | Maintenance Plan, Vendor Agreements | At PC Handover | N/A |
| PC-07 | Backup & Restore / Disaster Recovery Plan | IEC 62443-3-3 (FR7) 6 | Tested procedures for restoring the system after a cyber-incident (Ransomware/Wiper). | System Configuration, Backup Testing | At PC Handover | N/A |

## **5.2 Detailed Artifact Descriptions and Dependencies**

### **PC-01: Final Cybersecurity Case**

The **Final Cybersecurity Case** is the "Master Document" that aggregates all assurance activities. It is not merely a compilation of test reports but a structured *argument* that demonstrates the system's security. It serves as the bridge between the technical engineering work and the safety certification process. Critically, it must reference the **Safety Case** to prove that the implemented security measures (e.g., encryption latency, firewall filtering) do not negatively impact the safety integrity or timing requirements of the railway system.11

- **Dependency:** This document cannot be finalized until **PC-03 (Validation Report)** is complete because the case must rely on the *results* of testing, not just the plan.
### **PC-03: Cybersecurity Validation Report**

This report contains the raw, unvarnished output of security testing. For Practical Completion, it is insufficient to simply present a list of bugs. The report must include a **Remediation Section** showing that all high-severity vulnerabilities identified during testing (e.g., during Factory Acceptance Testing (FAT) or Site Acceptance Testing (SAT)) have been remediated or mitigated. If critical vulnerabilities remain open without a signed risk acceptance, Practical Completion should be blocked.

- **Precursor:** The Factory Acceptance Test (FAT) and Site Acceptance Test (SAT) plans must be approved by the Asset Owner prior to execution to ensure the testing scope is adequate.
### **PC-04: List of Exported SecRACs**

Engineering projects often fail to adequately hand over "residual risk," leading to operational insecurity. The **List of Exported SecRACs** acts as a formal contract between the System Integrator and the Operator. It explicitly states: "We built a secure wall, but YOU must lock the door." Conditions might include requirements for the operator to review logs weekly, manage physical keys, or apply patches within 30 days. If the Operator does not sign this document, they are accepting a system they do not know how to maintain securely.11

- **Dependency:** This feed directly into the **Safety Case** as Safety-Related Application Conditions (SRACs) if the security failure could lead to a safety hazard.
# **6. Detailed Analysis of Foundational Requirements (Evidence for Sign-Off)**

To satisfy the request for "actual real details," this section expands on **IEC 62443-3-3** requirements. The text lists FRs and SLs, but it is crucial to understand the *increasing density* of requirements as one moves from SL-1 to SL-2 (the Rail standard). A visual representation or detailed matrix is often used in engineering reports to show this "step up."

Data indicates that **SL-1** offers protection against "casual or coincidental violation," often achieved through basic hygiene (e.g., standard passwords). However, **SL-2**, which protects against "intentional violation using simple means," requires a significant jump in technical capability. Specifically, for **FR1 (Identification and Authentication)**, SL-2 mandates unique user identification (no shared accounts) and often introduces requirements for multifactor authentication for untrusted networks. For **FR3 (System Integrity)**, SL-2 moves beyond simple antivirus to require mechanisms that verify the integrity of the software (e.g., hash checks, signed firmware). This "step up" in requirement density means that a system compliant with SL-1 may be wholly insufficient for SL-2 without significant re-engineering, a common pitfall in rail projects.

## **6.1 FR 1: Identification and Authentication Control**

- **Sign-Off Check:** Does the system support unique accounts for *every* user? Are shared accounts (e.g., "MaintenanceUser") eliminated?
- **Evidence:** User account list configuration export.
## **6.2 FR 2: Use Control**

- **Sign-Off Check:** Is Role-Based Access Control (RBAC) enforced? Can the system restrict a user to *only* viewing data without control capabilities?
- **Evidence:** RBAC matrix design document and test screenshot evidence.
## **6.3 FR 3: System Integrity**

- **Sign-Off Check:** Does the system protect against malware? If antivirus cannot be installed (e.g., on a PLC), are there compensating controls like "Application Whitelisting" or "Firmware Signing"?
- **Evidence:** Antivirus logs or manufacturer declarations of firmware security.
## **6.4 FR 4: Data Confidentiality**

- **Sign-Off Check:** Is data encrypted? Note that in Rail signalling (e.g., ETCS), safety protocols often provide integrity but *not* confidentiality. If confidentiality is required, is it implemented at the network layer (VPN/MacSec)?
- **Evidence:** Wireshark captures showing encrypted payloads.
### **6.5 FR 5: Restricted Data Flow**

- **Sign-Off Check:** Is the network flat? If yes, it fails. Are critical assets (Signalling) segmented from non-critical (Passenger Wi-Fi)?
- **Evidence:** Firewall rule-sets and VLAN configurations.
## **6.6 FR 6: Timely Response to Events**

- **Sign-Off Check:** Is logging enabled? Where do the logs go? A local log file that is overwritten every 24 hours is often insufficient. Centralized logging is usually required for SL-2.
- **Evidence:** Syslog configuration and example audit trail reports.
## **6.7 FR 7: Resource Availability**

- **Sign-Off Check:** Can the system survive a broadcast storm or DoS attack?
- **Evidence:** Robustness testing reports (e.g., Achilles test results).
## **7. Strategic Conclusions for the Assurance Team**

The successful sign-off of a Cybersecurity Case under TS 50701 is less about "perfect security" and more about **transparent, managed risk**.

- **The "Safety-Security" Interface is the Critical Path:** The research consistently highlights the friction between Safety (which favors static, certified configurations) and Security (which requires dynamic patching and updates). The **Cybersecurity Case** must decouple these where possible, using **SecRACs** to bridge the gap without forcing a full Safety Case recertification for every security patch.10
- **Traceability is Mandatory:** Every entry in the Asset Inventory (PC-05) must trace to a Zone (PC-02), which traces to a Requirement (CRS), which traces to a Test Result (PC-03). A break in this chain is grounds for rejecting the Cybersecurity Case.
- **TS 50701 is the "Rosetta Stone":** While IEC 62443 provides the technical "what," TS 50701 provides the railway "how." The template provided in Section 4 is the structural embodiment of this translation, ensuring that industrial security practices satisfy the rigorous documentation standards of railway safety authorities.

By adhering to the structured template in Section 4 and enforcing the artifact delivery schedule in Section 5, engineering teams can navigate the complex compliance landscape of IEC 62443 and TS 50701, ensuring a secure and compliant railway system delivery.

# **Works cited**

- IEC 62443 Industrial Security Standards - TÜV SÜD, accessed February 14, 2026,
- Security of Industrial Automation and Control Systems - ISAGCA, accessed February 14, 2026,
- IEC 62443-3-2 - INTERNATIONAL STANDARD NORME INTERNATIONALE, accessed February 14, 2026,
- ZONING AND CONDUITS FOR RAILWAYS - ENISA, accessed February 14, 2026,
- Effective ICS Cybersecurity Using the IEC 62443 Standard - Fortinet, accessed February 14, 2026,
- IEC 62443: Ultimate OT Security Guide | Rockwell Automation | UK, accessed February 14, 2026,
- Hands-On CLC/TS 50701 (Railway applications – CyberSecurity) - ENISA, accessed February 14, 2026,
- Navigating TS 50701: Unpacking the Impact of the Cybersecurity Standard for Rail - Cylus, accessed February 14, 2026,
- Railway cybersecurity - ENISA, accessed February 14, 2026,
- PD CLC-TS 50701-2021 (Clean) | PDF | Vulnerability (Computing) - Scribd, accessed February 14, 2026,
- CLC TS50701 (2021) e | PDF | Security - Scribd, accessed February 14, 2026,
- ENISA Report - Railway Cybersecurity - Good Practices in Cyber Risk Management - Scribd, accessed February 14, 2026,
- The Case for ISA/IEC 62443 Security Level 2 as a Minimum for COTS Components - ISASecure, accessed February 14, 2026,
- IEC 62443 - Wikipedia, accessed February 14, 2026,
