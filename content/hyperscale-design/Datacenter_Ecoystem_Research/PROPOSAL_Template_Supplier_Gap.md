# Proposal Template — IEC 62443-4-2 Supplier Component Gap Assessment

**Fill in all [BRACKETS] before sending. Remove all instructional text in italics before sending.**
**Version:** June 2026
**Template reference:** Service 2 — `service_iec62443_supplier_gap`

---

# Proposal: IEC 62443-4-2 Supplier Component Gap Assessment
## [CLIENT COMPANY NAME]
### Prepared by  | [DATE]

---

## Proposed Engagement

**Client:** [CLIENT COMPANY NAME]
**Products in scope:** [PRODUCT FAMILY — e.g., "Vertiv Liebert EXL S1 UPS product family, all models with IntelliSlot management interface"]
**Security Level Target (SL-T):** SL-2 [Confirm or adjust based on customer requirement]
**Engagement size:** [S / M / L]
**Proposed start date:** [DATE — within 2 weeks of SOW signature]
**Estimated delivery:** [DATE — start date + timeline]
**Total fee:**  [AMOUNT] (fixed-scope, fixed-price)

---

## Background

*[Write 2–3 sentences specific to this company. Reference the customer requirement or regulatory driver — do not use generic language. Choose the applicable background below and edit.]*

**For customer mandate (hyperscaler SSPA or procurement requirement):**
[COMPANY] supplies [PRODUCT LINE] to [Microsoft / Meta / Google / AWS / named hyperscaler] through an active procurement relationship. [HYPERSCALER]'s supply chain security requirements now reference IEC 62443-4-2 component security levels as a supplier qualification condition. [COMPANY]'s [PRODUCT LINE] does not currently hold an IEC 62443-4-2 certification at any Security Level. This gap assessment identifies what is needed to achieve SL-2, in a format the supplier qualification team can use directly.

**For EU Cyber Resilience Act (CRA) alignment:**
[COMPANY]'s [PRODUCT LINE] is sold into EU markets and is subject to the EU Cyber Resilience Act (CRA) as a "product with digital elements." CRA Annex I requires product-level technical security requirements equivalent to IEC 62443-4-2 at SL-2 for most networked industrial hardware. This gap assessment maps current product architecture against FR1–FR7 requirements and produces both a CRA Annex I gap report and a certification body (CB)-ready gap summary, covering both obligations in a single engagement.

**For certification body intake (direct path to IEC 62443-4-2 certification):**
[COMPANY] is working toward IEC 62443-4-2 SL-2 certification for [PRODUCT LINE] through [CB name / unnamed CB]. Before CB intake, an independent gap assessment documents the current security posture against FR1–FR7 at SL-2 and identifies the specific remediation actions required before certification will succeed. This proposal covers that pre-certification gap assessment.

---

## Scope of Work

### 1. FR1–FR7 Security Requirement Posture Assessment (SL-2)

Review [PRODUCT LINE] against all Foundational Requirements (FR1–FR7) at Security Level 2, covering all Component Requirements (CRs) within each FR:

**FR1 — Identification and Authentication Control (IAC)**
Assess CRs 1.1–1.14: credential management, authentication mechanisms, account management, MFA applicability, strength of authentication, and untrusted network access controls.

**FR2 — Use Control (UC)**
Assess CRs 2.1–2.12: authorization enforcement, session management, audit logging, timestamps, and non-repudiation.

**FR3 — System Integrity (SI)**
Assess CRs 3.1–3.10: firmware integrity verification, secure boot chain, TLS enforcement, input validation, and communication integrity.

**FR4 — Data Confidentiality (DC)**
Assess CRs 4.1–4.3: encryption of data in transit and at rest, credential storage, cryptographic controls.

**FR5 — Restricted Data Flow (RDF)**
Assess CRs 5.1–5.4: network segmentation capability, zone boundary protection, least-functionality configuration.

**FR6 — Timely Response to Events (TRE)**
Assess CRs 6.1–6.2: syslog support, security event monitoring, SIEM integration capability.

**FR7 — Resource Availability (RA)**
Assess CRs 7.1–7.8: DoS protection, configuration backup/restore, firmware update robustness, component inventory.

### 2. Security Level Assessment (SL-A vs. SL-T)

For each FR: document the current Security Level Achieved (SL-A) versus the Security Level Target (SL-T = SL-2). Produce an FR-by-FR summary table with gap severity ratings.

### 3. SBOM Assessment

Review the current SBOM state against IEC 62443-4-2 requirements and CRA Annex I Part II:
- SBOM completeness and third-party component coverage
- SBOM generation method (automated vs. manual)
- CVE monitoring process against SBOM components
- Recommended toolchain if SBOM is absent or incomplete

### 4. Gap Report — Certification Body Submission Format

Produce a gap summary document formatted for certification body intake:
- Organized by FR and CR number
- Current state per CR, with evidence type cited
- Gap description (specific, named, not generic)
- Remediation action (specific engineering action, not a category)
- Priority rating (Critical / High / Medium / Low)
- Compatible with [TÜV Rheinland / ISASecure / Bureau Veritas — select one] intake format

### 5. Remediation Roadmap

Prioritized by SL-2 gap impact:
- Critical gaps (SL-A = 0 for a key FR): must be closed before CB submission
- High gaps (SL-A below SL-2 threshold for secondary CRs): close before CB assessment
- Medium / Low gaps: best-practice improvements, can be addressed post-CB intake

---

## Exclusions

This engagement does not include:

- **IEC 62443-4-2 formal certification:** This engagement identifies gaps and formats findings for CB intake. The CB conducts its own independent assessment. Tetrel's report is not the certificate.
- **Source code review:** Default scope is architecture review, documentation review, and binary-level analysis. Source code review requires a change order. Binary analysis produces sufficient evidence for most CBs at initial intake.
- **Hardware penetration testing or fuzzing:** Physical testing and active fuzzing are separate scoped engagements.
- **IEC 62443-4-1 secure development lifecycle assessment:** The SDL process is assessed as background context but is not the primary deliverable (a 4-1 assessment is a separate SOW).
- **CRA Annex I attestation document (Article 13):** If CRA attestation is also required, the CRA Readiness Assessment (Service 1) covers this. A combined engagement (Service 1 + Service 2) qualifies for a 15% bundle discount — see Optional Extensions below.
- **Products not listed in Schedule A.**

---

## Deliverables

| Deliverable | Format | Delivery |
|:--|:--|:--|
| FR1–FR7 Posture Map | PDF table — SL-A vs SL-T per FR | Final report delivery date |
| IEC 62443-4-2 Gap Report | PDF, 30–60 pages | Final report delivery date |
| CB-Submission-Ready Gap Summary | PDF, 5–10 pages | Final report delivery date |
| SBOM Assessment | PDF, 5–10 pages | Final report delivery date |
| CVE Inventory Against SBOM | Excel — third-party components mapped to NVD | Final report delivery date |
| Remediation Roadmap | Excel + PDF | Final report delivery date |
| Executive Summary | PDF, 2 pages | Final report delivery date |

All deliverables are delivered electronically. A 30-minute walkthrough call is included at delivery.

---

## Timeline

| Milestone | Week | Description |
|:--|:--|:--|
| Kickoff | Week 1 | Project kickoff; documentation access confirmed; engineering contact identified |
| Documentation Review | Weeks 1–2 | Review firmware documentation, architecture diagrams, CVE history |
| Architecture Interviews | Weeks [2–3 (S) / 2–5 (M) / 2–8 (L)] | Structured interviews with firmware and product security teams |
| Analysis | Weeks [3–5 (S) / 6–8 (M) / 9–13 (L)] | FR1–FR7 gap analysis; SBOM assessment; SL-A scoring |
| Draft Report | Weeks [6 (S) / 9–10 (M) / 14–15 (L)] | Draft gap report and CB summary for [COMPANY] review |
| Final Report | Weeks [8 (S) / 11–12 (M) / 16–18 (L)] | Final report and deliverable package |

*[Select timeline bracket based on engagement size; delete unused options.]*

---

## Team

**Jim McKenney** — Lead assessor. [Brief 1-sentence credential relevant to IEC 62443-4-2 and this product type. E.g., "Has conducted IEC 62443-4-2 FR1–FR7 gap assessments for networked power management, precision cooling, and building management platforms. Authorized OCP S.A.F.E. Security Review Provider."]

*[Add second team member if applicable.]*

---

## Fees and Terms

| Item | Amount |
|:--|:--|
| Fixed engagement fee | CAD [AMOUNT] |
| HST (13%, if applicable) | CAD [AMOUNT] |
| Total | CAD [AMOUNT] |

**Payment schedule:**
- 30% upon SOW signature: CAD [AMOUNT]
- 35% at project midpoint (architecture interviews complete): CAD [AMOUNT]
- 35% upon final report delivery: CAD [AMOUNT]

**Payment terms:** Net 30 from invoice date.
**Currency:** CAD. USD or EUR available at Bank of Canada rate on invoice date.

---

## Optional Extensions

| Extension | Description | Indicative cost (CAD) |
|:--|:--|:--|
| CRA Readiness Assessment | Adds CRA Annex I gap report + Article 13 attestation draft (Service 1). Combined with this engagement at 15% bundle discount. | 22,000–82,500 (dependent on scope) |
| OCP S.A.F.E. Firmware Review | If product is also in hyperscaler supply chain — combined review saves approximately 30% vs. two separate engagements. | 25,000–93,750 |
| CB Submission Support | Tetrel attends CB intake call and provides written responses to CB questions. | 8,000–15,000 flat |
| Hardware penetration test | Active firmware fuzzing and physical interface testing. | 15,000–40,000 |
| Post-delivery remediation advisory | After report delivery, Tetrel available for engineering team Q&A and remediation guidance. | CAD 325/hour |

---

## Next Steps

To proceed:
1. Review and sign the Statement of Work
2. Return executed SOW to Jim McKenney
3. Remit 30% deposit invoice within 5 business days of SOW signature
4. Provide documentation access and engineering contact per the kickoff checklist (sent on SOW execution)

Questions: contact Jim McKenney at [email] | [phone]

---

## Schedule A — Products in Scope

| Product Family | SKUs / Models in Scope | Firmware Stacks | Notes |
|:--|:--|:--|:--|
| [PRODUCT FAMILY 1] | [MODEL LIST or "All models in product family"] | [Number and name if known] | [Notes] |
| [PRODUCT FAMILY 2] | [MODEL LIST] | [Firmware stacks] | [Notes] |

---

*Proposal prepared by Tetrel Security | [DATE]*
*This proposal is valid for 30 days from the date above.*
*Pricing and scope are subject to a signed Statement of Work.*
