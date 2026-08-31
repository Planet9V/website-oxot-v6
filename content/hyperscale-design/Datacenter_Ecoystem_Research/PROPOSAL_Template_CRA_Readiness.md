# Proposal Template — CRA Readiness Assessment

**Fill in all [BRACKETS] before sending. Remove all instructional text in italics before sending.**
**Version:** June 2026
**Template reference:** Service 1 — `service_cra_readiness`

---

# Proposal: CRA Readiness Assessment
## [CLIENT COMPANY NAME]
### Prepared by  | [DATE]

---

## Proposed Engagement

**Client:** [CLIENT COMPANY NAME]
**Products in scope:** [PRODUCT FAMILY / SKU LIST — e.g., "Raritan PX4 rack PDU product family, all SKUs with embedded PXEM network management interface"]
**Engagement size:** [S / M / L]
**Proposed start date:** [DATE — aim for within 2 weeks of SOW signature]
**Estimated delivery:** [DATE — calculated from start date + timeline]
**Total fee:** EURO [AMOUNT] (fixed-scope, fixed-price)

---

## Background

*[Write 2–3 sentences specific to this company and their CRA exposure. Reference their product type, EU market presence, and the specific CRA article(s) that apply. Do NOT use generic language. Paste no filler. Examples below — pick the right one and edit.]*

**For PDU/UPS vendor:**
The EU Cyber Resilience Act creates binding cybersecurity obligations for [COMPANY]'s [PRODUCT LINE] product family. Network management cards embedded in intelligent UPS and PDU products are "products with digital elements" under CRA Article 3(1). The Article 13 vulnerability handling and SBOM requirements activate September 11, 2026 — 14 weeks from the date of this proposal. The Article 7 classification determination for [PRODUCT LINE] will determine whether [COMPANY] can self-declare conformity (Class I) or requires a third-party conformity assessment (Class II).

**For cooling OEM:**
[COMPANY]'s [PRODUCT LINE] CRAC/CRAH cooling controllers are networked embedded systems sold into EU market datacenters. Under CRA Article 3(1), they qualify as "products with digital elements" subject to Annex I conformity requirements. As a [COUNTRY]-headquartered manufacturer, [COMPANY]'s market surveillance authority for CRA enforcement is [BNetzA / ANSSI / OFCOM / other — look up by country]. The September 11, 2026 deadline covers Article 13 vulnerability handling and ENISA notification obligations — the first compliance milestone before full product conformity in December 2027.

**For DCIM/BMS vendor:**
The EU Cyber Resilience Act's scope covers software platforms that process, store, or transmit data connected to infrastructure networks. [COMPANY]'s [PRODUCT LINE] platform, which provides read/write management access to [power / cooling / access control / facility monitoring] systems in critical infrastructure facilities, falls within Article 3(1) scope. The Article 7 classification is significant: BMS and DCIM platforms managing critical infrastructure facilities are likely to be classified as Class II products requiring third-party conformity assessment rather than self-declaration.

---

## Scope of Work

This engagement covers the following five assessment areas:

### 1. CRA Article Scope and Classification
- Confirm which [COMPANY] products are "products with digital elements" under Article 3(1)
- Classify each in-scope product as Class I or Class II under Article 7 + Annex III
- Document the regulatory rationale for the classification decision
- Identify the applicable market surveillance authority (MSA) for [COMPANY]'s EU market(s)

### 2. CRA Annex I Part I — Essential Cybersecurity Requirements
Review [PRODUCT LINE] architecture against all 13 essential requirements in Annex I Part I:
- Default configuration security
- Absence of known exploitable vulnerabilities at point of market placement
- Confidentiality and integrity of data
- Access control and authentication
- Attack surface minimization
- Security event monitoring and audit logging
- Cryptographically verified firmware update mechanism
- SBOM availability on request

### 3. CRA Annex I Part II — Vulnerability Handling Requirements
- Vulnerability disclosure policy review (VDP)
- Coordinated vulnerability disclosure process
- SBOM completeness and third-party component tracking
- Article 14 ENISA early warning notification process readiness

### 4. Article 13 Attestation Document
- Draft an Article 13 attestation statement for [COMPANY]'s legal team
- Maps current state to each Annex I requirement
- Documents identified gaps and remediation commitments with proposed timelines
- Formatted for market surveillance authority review

### 5. SBOM Process Assessment
- Evaluate current SBOM generation process against Article 13 / Annex I Part II requirements
- Recommend SBOM toolchain and format (SPDX 2.3 or CycloneDX 1.5) if not in place
- Assess third-party component inventory completeness

---

## Exclusions

This engagement does not include:

- **IEC 62443-4-2 product certification:** The gap report identifies what is required for certification. Formal certification requires a separate engagement with an accredited certification body. Tetrel can recommend and support CB intake; see optional extension below.
- **Hardware penetration testing or binary fuzzing:** This engagement is a documentation and architecture review. Physical testing is a separate scoped engagement.
- **Remediation implementation:** [COMPANY]'s engineering team implements all remediation actions. Optional remediation advisory support is available at CAD 325/hour.
- **Legal advice:** The Article 13 attestation document is a technical document. [COMPANY]'s legal counsel must review before use.
- **Products not listed in Schedule A**

---

## Deliverables

| Deliverable | Format | Delivery |
|:--|:--|:--|
| CRA Annex I Gap Report | PDF, 20–50 pages | Final report delivery date |
| Article 13 Attestation Draft | PDF, 2–4 pages | Final report delivery date |
| SBOM Process Assessment | PDF, 5–10 pages | Final report delivery date |
| Remediation Roadmap | Excel + PDF | Final report delivery date |
| Executive Summary | PDF, 2 pages | Final report delivery date |

All deliverables are delivered electronically. A 30-minute walkthrough call is included at delivery.

---

## Timeline

| Milestone | Week | Description |
|:--|:--|:--|
| Kickoff | Week 1 | Project kickoff call; documentation access confirmed; engineering contact identified |
| Documentation Review | Weeks 1–2 | Tetrel reviews all provided documentation |
| Architecture Interviews | Weeks [2–3 (S) / 2–4 (M) / 2–6 (L)] | Structured interviews with firmware / product security team |
| Analysis | Weeks [3–4 (S) / 5–6 (M) / 7–9 (L)] | Gap analysis against Annex I requirements |
| Draft Report | Weeks [5 (S) / 7 (M) / 10–11 (L)] | Draft delivered for [COMPANY] review and comment |
| Final Report | Weeks [6 (S) / 8 (M) / 12–14 (L)] | Final report and deliverable package |

*[Select the timeline bracket based on engagement size and delete the others.]*

---

## Team

**Jim McKenney** — Lead assessor. [Brief sentence on relevant experience — e.g., "Has conducted IEC 62443-4-2 gap assessments for networked power infrastructure and computing platforms. Authorized OCP S.A.F.E. Security Review Provider."]

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

The following services are not included in the base scope but can be added by change order during the engagement:

| Extension | Description | Indicative cost (CAD) |
|:--|:--|:--|
| IEC 62443-4-2 Gap Assessment | Extends CRA findings into a full FR1–FR7 component gap report for CB submission | 22,000–82,500 (dependent on scope) |
| CB Submission Support | Tetrel attends CB intake call and provides clarification responses | 8,000–15,000 flat |
| Hardware pen test | Physical firmware extraction and interface testing | 15,000–40,000 (dependent on product) |
| Remediation advisory | Post-delivery consulting support for [COMPANY] engineering team | CAD 325/hour |

---

## Next Steps

To proceed:
1. Review and sign the Statement of Work (separate document from this proposal)
2. Return executed SOW to Jim McKenney
3. Remit 30% deposit invoice within 5 business days
4. Provide documentation access and engineering contact per the kickoff checklist (to be sent on SOW execution)

Questions: contact Jim McKenney at [email] | [phone]

---

## Schedule A — Products in Scope

*[List specific product families and SKUs agreed during discovery call. Be specific — this is the scope boundary.]*

| Product Family | SKUs in Scope | Notes |
|:--|:--|:--|
| [PRODUCT FAMILY 1] | [SKU LIST or "All SKUs in product family"] | [Any specific notes] |
| [PRODUCT FAMILY 2] | [SKU LIST] | [Notes] |

---

*Proposal prepared by Tetrel Security | [DATE]*
*This proposal is valid for 30 days from the date above.*
*Pricing and scope are subject to a signed Statement of Work.*
