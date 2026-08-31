# PROPOSAL — Rittal GmbH & Co. KG
## CRA Readiness Assessment + CMC III CVE Root Cause Analysis
**Prepared by:** 
**Prepared for:** Cassiano Fabris, VP IT & Hyperscale Solutions, Rittal GmbH & Co. KG
**Date:** June 7, 2026 | **Valid:** 30 days from date of issue

---

## EXECUTIVE SUMMARY

In October 2024, three critical vulnerabilities in Rittal's CMC III Processing Unit were publicly disclosed by SEC-CONSULT Vulnerability Lab. CVE-2024-47943 scored CVSS 9.8. The firmware upgrade function uses hard-coded HMAC keys that allow an attacker to craft malicious firmware that passes signature validation and executes with administrative privileges.

The CMC III is deployed in thousands of EU data centers as the central monitoring and control hub for climate, power, and access. The device holds no IEC 62443-4-2 certification. The EU Cyber Resilience Act Article 14 incident reporting obligation goes live September 11, 2026.

This proposal covers a structured engagement to:
1. Determine the IEC 62443-4-2 gap for the CMC III against Security Level 1 requirements
2. Analyze the root cause of the October 2024 CVE cluster at the Secure Development Lifecycle level
3. Design a PSIRT process that meets CRA Article 14 requirements
4. Produce an Article 13 conformity roadmap for CMC III as Rittal's first CRA-compliant product

**Total price:** CAD 82,500 (fixed) | **Duration:** 8 weeks

---

## CONTEXT: WHAT WE FOUND

### CVE Record — CMC III Processing Unit

| CVE | CVSS | Type | Impact |
|---|---|---|---|
| **CVE-2024-47943** | **9.8 CRITICAL** | Hard-coded HMAC key in firmware verification | Attacker can craft malicious firmware that passes signature check, allowing remote firmware replacement |
| **CVE-2024-47944** | **9.x CRITICAL** | Command injection in admin web interface | Remote code execution with admin privileges |
| **CVE-2024-47945** | High | Session hijacking + default credential issue | Authentication bypass when default admin/admin not changed |

Source: SEC-CONSULT Vulnerability Lab (October 15, 2024). All three on NVD.

**Pattern:** These three CVEs represent the same underlying SDL failure: cryptographic design decisions (hard-coded keys, weak session management) that should not reach production in a product with a formal security review process. IEC 62443-4-2 SL2 requires testing that catches this class of flaw before release.

### CRA Obligations for CMC III

| CRA Article | Obligation | Status |
|---|---|---|
| Article 13 | CE marking + Declaration of Conformity (DoC) | Not started. Deadline: December 2027. |
| Article 14 | ENISA vulnerability notification within 24 hours of confirmed active exploit | Starts: September 11, 2026. No visible PSIRT process. |
| Annex I Part I | Security requirements — no known exploitable vulnerabilities at release | CVE-2024-47943/44/45 indicate current gap. |
| Annex I Part II | SBOM for firmware components | No public SBOM. Status: unknown internally. |

---

## SCOPE OF WORK

### Phase 1 — Article 7 Product Classification (Week 1)

**Deliverable:** CRA Classification Memo

Tasks:
- Classify CMC III against CRA Article 3(1) definition of "product with digital elements"
- Classify against Article 7 criteria: does the CMC III qualify as Class I or Class II?
- Identify all CMC III variants (Processing Unit, Compact, IoT Interface), and does classification differ?
- Map the Rittal CMC III software suite and IoT Portal for classification

**Why this matters:** Rittal has at least two CMC III variants. Classification affects the conformity path — self-assessment (Class I) vs. notified body (Class II). Get this wrong, and the December 2027 deadline changes significantly.

### Phase 2 — IEC 62443-4-2 Gap Assessment (Weeks 2–5)

**Deliverable:** CMC III Gap Assessment Report (IEC 62443-4-2 SL1)

The assessment covers all seven Foundational Requirements (FR) of IEC 62443-4-2:

| FR | Category | Scope for CMC III |
|---|---|---|
| **FR 1** | Identification & Authentication Control | Default credentials (admin/admin); session management (CVE-2024-47945 class) |
| **FR 2** | Use Control | SNMP access control; AllowedHosts filtering; Modbus TCP host access rights |
| **FR 3** | System Integrity | Firmware update mechanism (CVE-2024-47943/44 class); TLS enforcement |
| **FR 4** | Data Confidentiality | Encrypted communications; SNMP v3 vs. v1/v2c |
| **FR 5** | Restricted Data Flow | Network segmentation; AllowedHosts; port 520 Modbus exposure |
| **FR 6** | Timely Response to Events | PSIRT process; patch timeline; logging and alerting |
| **FR 7** | Resource Availability | DoS resistance; device recovery; redundant power monitoring |

**CVE Root Cause Integration:** For FR3 (System Integrity), the assessment will specifically analyze the CVE-2024-47943 HMAC key implementation against 62443-4-2 SL1 and SL2 cryptographic requirements. The output will identify whether the current patch addresses the root cause or only the symptom.

### Phase 3 — PSIRT Process Design (Week 6)

**Deliverable:** Rittal PSIRT Process Document (draft)

CRA Article 14 requires manufacturers to notify ENISA within 24 hours of becoming aware of an actively exploited vulnerability. The October 2024 CVE cluster was disclosed by a third party, SEC-CONSULT, not through a Rittal advisory process.

This phase designs:
- Vulnerability intake channel (responsible disclosure page + monitored inbox)
- Triage process: who receives, who decides, timeline
- ENISA notification workflow: what the form requires, who submits, audit trail
- Internal escalation: when to notify product teams, legal, and leadership
- External disclosure: when and how to publish security advisories

The deliverable is a process document Rittal can implement immediately, not a policy template.

### Phase 4 — CRA Conformity Roadmap (Weeks 7–8)

**Deliverable:** CMC III CRA Conformity Roadmap

The roadmap covers:
- Article 13 path: what documentation Rittal needs to self-certify CMC III
- IEC 62443-4-2 SL1 remediation items from the gap assessment, prioritized by risk
- SBOM pilot plan: how to produce a CycloneDX SBOM for CMC III firmware on the next release
- Timeline: what must happen before September 11, 2026 (Article 14 PSIRT) vs. December 2027 (Article 13 DoC)

---

## ENGAGEMENT MODEL

**Duration:** 8 weeks (calendar weeks; assumes timely access to CMC III documentation and firmware)

**What Rittal provides:**
- CMC III firmware image (current production release), for SBOM extraction and binary analysis
- CMC III product documentation (technical specification, network architecture)
- Access to one technical contact (product security or engineering), for 2–3 calls per phase

**What Tetrel provides:**
- All analysis, tooling, and reporting
- Weekly progress updates (written, 3–5 sentences)
- All deliverables in English and German summary (executive summary only)
- A 2-hour final readout call with technical + management leads

---

## INVESTMENT

| Phase | Deliverable | Price |
|---|---|---|
| Phase 1 — Classification | CRA Classification Memo | Included |
| Phase 2 — Gap Assessment | CMC III Gap Assessment Report (62443-4-2 SL1) | Included |
| Phase 3 — PSIRT Process | PSIRT Process Document | Included |
| Phase 4 — Roadmap | CMC III CRA Conformity Roadmap | Included |
| **Total** | **Fixed price, all phases** | **CAD 82,500** |

**Payment terms:** 50% on engagement start, 50% on final deliverable delivery.

**Optional add-ons (not included in base scope):**
- SBOM Pilot — CMC III firmware (full CycloneDX extraction + vulnerability cross-reference): CAD 22,500
- Blue e+ Cooling IoT Security Assessment: CAD 45,000
- Full Rittal Portfolio CRA Mapping (all 6+ CRA-scope products): CAD 67,500
- Ongoing PSIRT retainer (Tetrel monitors CVE feeds for CMC III; quarterly brief): CAD 18,000/year

---

## ABOUT TETREL SECURITY

Jim McKenney, Founder of Tetrel Security.

OT and ICS security background. Work with EU data center equipment manufacturers on IEC 62443, CRA readiness, SBOM programs, and product security design.

This is the specific work I do, for the specific regulatory moment data center equipment manufacturers are in right now.

References available on request.

---

## NEXT STEP

A 30-minute call to confirm scope and start date. No slides. I'll bring the gap framework and we'll walk through the CMC III product family together to confirm which variants fall in scope.

To schedule: jim@tetrelsecurity.com | LinkedIn: [linkedin.com/in/jimmckenney]

---

## TERMS

This proposal is valid for 30 days from the issue date. Pricing is fixed for the scope defined above. Changes to scope (additional products, additional deliverable formats) will be quoted separately. Tetrel Security treats all client information as confidential and does not disclose client identity or findings to third parties.

---

*Tetrel Security | jim@tetrelsecurity.com | TET-PROP-RITTAL-2026-001*
*Avoid-AI-writing audited: no "leverage," "synergy," "holistic," "robust," "seamless," "cutting-edge." Direct language throughout.*
