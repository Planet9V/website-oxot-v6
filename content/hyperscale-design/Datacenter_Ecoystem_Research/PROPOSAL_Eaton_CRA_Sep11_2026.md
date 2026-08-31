 

# PROPOSAL — CRA READINESS ASSESSMENT
## Eaton Corporation plc — Priority One Engagement
**Prepared by:** J
**Prepared for:** Max Wandera, Director, Product Cybersecurity Center of Excellence, Eaton Corporation plc
**Date:** June 7, 2026
**Validity:** 30 days
**Reference:** CRA Article 14 deadline September 11, 2026

---

## EXECUTIVE SUMMARY

Eaton holds one of three IEC 62443-4-2 certifications in the entire EU data center UPS/PDU vendor set: the **NETWORKM2 Cybersecure Network Card** (dual certified: IEC 62443-4-2 + UL 2900-1). This is genuine competitive differentiation.

The gap is everything else.

Fifteen additional network-connected products (from the ePDU G3 managed PDU and the 93PM 3-phase UPS control system, to the Tripp Lite SNMPWEBCARD acquired in 2021 for $1.65B) are CRA-scope and uncertified. The September 11, 2026 CRA Article 14 notification obligation is Eaton's first compliance milestone. The December 11, 2027 full certification deadline closes the gap.

Tetrel Security proposes a phased CRA Readiness Assessment to:
1. Map all CRA-scope Eaton and Tripp Lite products against Article 7 classification
2. Gap-assess the three highest-risk products against IEC 62443-4-2 technical requirements
3. Design an SBOM program to satisfy CRA Annex I firmware transparency obligations
4. Prepare the September 11, 2026 ENISA notification readiness documentation

---

## THE SITUATION

### CRA Article 14 — September 11, 2026

CRA Article 14 requires manufacturers of products with digital elements to:

> "Notify ENISA ... without undue delay, and in any event within 24 hours of becoming aware of it, of any actively exploited vulnerability contained in the product."

This obligation takes effect **September 11, 2026** for any product currently sold or installed in the EU.

**For Eaton, this means:**

- The Tripp Lite SNMPWEBCARD estate (CVE-2023-43090, CVSS 9.8 with remote code execution, patched). Deployed units still in the field constitute a notification-relevant installed base.
- The ePDU G3 managed PDU fleet that is SNMP-accessible by customers across EU data centers.
- The 93PM 3-phase UPS control systems installed in EU hospitals, financial institutions, and critical digital infrastructure.

Eaton's product security team needs a classification of each product, a process to identify exploited vulnerabilities in deployed units, and a 24-hour notification workflow — all by September 11.

### The Tripp Lite Integration Challenge

The 2021 Tripp Lite acquisition ($1.65B) brought a large portfolio of network-connected products — SNMPWEBCARD, SmartOnline cards, rack PDU management — that were designed to North American market standards, not EU regulatory frameworks. These products now carry Eaton's name in the EU market and fall under Eaton's CRA obligations.

**CRA Annex I, Section 2, Paragraph 1(d):** Manufacturers must "identify and document vulnerabilities and components contained in the product, including by drawing up a software bill of materials."

The Tripp Lite product line has unknown SBOM status. This is the highest-risk element of Eaton's CRA portfolio.

---

## PROPOSED WORK PROGRAM

### Phase 1 — CRA Product Portfolio Classification (Weeks 1–3)

**Deliverable:** CRA Product Scope Register

For each of Eaton's 16+ network-connected products, classify:
- Is the product a "product with digital elements" under CRA Article 3(1)?
- What is the Article 7 classification (Class I or Class II)?
- Is the product currently sold in the EU? (determines whether CRA applies)
- Is there an existing IEC 62443-4-2 or equivalent certification?
- What is the current ENISA notification readiness level?

**Output format:** Product Scope Register (Excel + PDF) — one row per product, classification, gap rating (Red/Amber/Green), and recommended next action.

**Inputs needed from Eaton:**
- Product list with model numbers and EU sales confirmation
- Existing certification documentation (if any beyond NETWORKM2)
- Current PSIRT process documentation (if exists)

**Price:** CAD 27,000 (fixed fee)
**Timeline:** 3 weeks

---

### Phase 2 — IEC 62443-4-2 Gap Assessment: Three Highest-Risk Products (Weeks 4–9)

**Deliverable:** IEC 62443-4-2 Technical Gap Reports × 3

Based on Phase 1 findings, assess the three products rated Red (highest risk). Likely candidates:
1. **ePDU G3 Managed PDU** — highest deployed volume; SNMPv3 optional not default
2. **93PM 3-phase UPS Control System** — critical infrastructure installations; no certification
3. **Tripp Lite SNMPWEBCARD** — known CVE history; acquired product; no certification

For each product, the assessment covers:

| Requirement Category | IEC 62443-4-2 Reference | Method |
|---|---|---|
| Authentication & Identity | SR 1.1–1.11 | Protocol analysis, config review |
| Use Control & Authorization | SR 2.1–2.13 | Privilege model review, API audit |
| System Integrity | SR 3.1–3.14 | Firmware analysis, signing verification |
| Confidentiality | SR 4.1–4.2 | TLS configuration, cipher audit |
| Restricted Data Flow | SR 5.1–5.4 | Network interface review, firewall analysis |
| Timely Response | SR 6.1–6.2 | Patch process, PSIRT documentation |
| Resource Availability | SR 7.1–7.8 | DoS resilience, backup/recovery |

**Output format:** Gap Report per product (30–50 pages) with:
- Requirement-by-requirement pass/fail table
- Finding description and evidence
- Remediation recommendation and priority
- Estimated remediation effort per finding
- Certification readiness score (0–100) with target SL level

**Price:** CAD 40,500 per product × 3 = **CAD 121,500**
**Timeline:** 6 weeks (products run in parallel)

---

### Phase 3 — SBOM Program Design (Weeks 8–14)

**Deliverable:** SBOM Program Blueprint + CycloneDX Pilot

Design and pilot the SBOM program required by CRA Annex I:

1. **Tool selection:** Syft, Grype, Trivy evaluation for Eaton/Tripp Lite firmware environments
2. **Build system integration:** How SBOM generation integrates with Eaton's existing firmware build pipeline
3. **CycloneDX format:** Component format, VEX document integration, attestation workflow
4. **Tripp Lite pilot:** Apply SBOM extraction to one Tripp Lite product firmware image (binary analysis if build system not accessible)
5. **Publication process:** Where and how SBOMs are published to satisfy CRA transparency requirements
6. **Update cadence:** Process for updating SBOM on firmware releases

**Output:** SBOM Program Blueprint document + one pilot CycloneDX SBOM (Tripp Lite SNMPWEBCARD firmware)

**Price:** CAD 33,000 (fixed fee)
**Timeline:** 6 weeks (overlaps Phase 2 weeks 8–14)

---

### Phase 4 — September 11, 2026 Readiness Documentation (Weeks 13–16)

**Deliverable:** ENISA Notification Readiness Package

1. CRA Article 14 notification procedure document (who, what, when, how to notify ENISA)
2. Vulnerability classification procedure (what constitutes "actively exploited" for Eaton's product set)
3. Internal escalation matrix (product security → legal → executive → ENISA)
4. Dry-run of notification scenario (tabletop: "CVE found tomorrow — walk through the process")
5. Published PSIRT contact page — meets CRA Article 13 requirement (can use existing if updated)

**Price:** CAD 18,000 (fixed fee)
**Timeline:** 3 weeks (Weeks 13–16, targeting completion by August 15, 2026)

---

## SUMMARY PRICING

| Phase | Deliverable | Price | Timeline |
|---|---|---|---|
| **Phase 1** | CRA Portfolio Classification — 16+ products | CAD 27,000 | Weeks 1–3 |
| **Phase 2** | IEC 62443-4-2 Gap Reports × 3 products | CAD 121,500 | Weeks 4–9 |
| **Phase 3** | SBOM Program Design + CycloneDX pilot | CAD 33,000 | Weeks 8–14 |
| **Phase 4** | Article 14 Readiness Documentation | CAD 18,000 | Weeks 13–16 |
| **Total** | **Full CRA Readiness Program — Eaton** | **CAD 199,500** | **16 weeks** |

**Payment terms:** 30% on engagement start; 40% at Phase 2 delivery; 30% at Phase 4 completion.
**Expenses:** Travel not included; all work conducted remotely unless site access required for Phase 2.

**Early start option:** Phase 1 can begin immediately at CAD 27,000 to meet the September 11 timeline. Phases 2–4 follow after Phase 1 deliverable acceptance.

---

## ABOUT TETREL SECURITY

Tetrel Security provides OT product security assessment and compliance services for EU data center infrastructure manufacturers. We specialize in:

- IEC 62443-4-2 gap assessments for UPS, PDU, cooling controller, and BMS products
- CRA Article 7 classification and self-assessment support
- SBOM program design and firmware SBOM extraction
- EU regulatory compliance for EU-based and US-headquartered manufacturers with EU sales

We are independent of the Big 4 / Big SI consulting stack. We work directly with product engineering teams. Our deliverables are technical documents, not management presentations.

**Jim McKenney** | Founder, Tetrel Security
jim@tetrel.io | tetrel.io | LinkedIn: /in/jimmckenney

---

## NEXT STEPS

**To accept Phase 1 immediately:**
1. Reply to confirm scope and start date
2. Tetrel sends engagement letter + invoice for CAD 8,100 (30% of Phase 1)
3. Kick-off call within 5 business days — 60 minutes, no prep required
4. Product list and any existing documentation shared via secure file transfer

**Questions welcome:** Happy to do a 30-minute call to walk through the proposal before commitment.

---
*Proposal Reference: TETREL-2026-EATON-001*
*Prepared: 2026-06-07 | Valid: 30 days | Confidential*
