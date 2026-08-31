# PROPOSAL — Vertiv Holdings Co.
## CRA Portfolio Assessment — Starting with Avocent ACS Console Server
**Prepared by:** Jim McKenney
**Prepared for:** Massimo Zampieri, Product Security EMEA, Vertiv Holdings
**Date:** June 7, 2026 | **Valid:** 30 days from date of issue
**Reference:** TET-PROP-VERTIV-2026-001

---

## EXECUTIVE SUMMARY

Vertiv holds one IEC 62443-4-2 certification: the RDU120 rack monitoring unit (ISASecure #0228). Across Avocent, Geist, Liebert, and Trellis product lines, we count 11+ additional products in CRA scope. None are certified.

The highest-risk product in this uncertified portfolio is the Avocent ACS console server. The ACS is the last-resort access path to all infrastructure in a data center. It stays reachable when everything else is down. CVE-2024-21788 (CVSS 7.5) affects this product. It has no IEC 62443-4-2 certification. EU Cyber Resilience Act Article 14 incident reporting goes live September 11, 2026.

This proposal covers:
1. A full portfolio classification for Vertiv's EU-sold CRA-scope products
2. A deep IEC 62443-4-2 gap assessment for the Avocent ACS as first priority
3. A CRA conformity roadmap for the ACS and a staged plan for the remaining portfolio

**Total price:** EURO XXXX (fixed) | **Duration:** 8 weeks

---

## CONTEXT: WHAT WE FOUND

### Vertiv CRA-Scope Product Inventory

| Product | IEC 62443-4-2 | CVEs (last 3yr) | CVSS | Priority |
|---|---|---|---|---|
| **RDU120** | ✅ Certified (#0228) | 0 post-cert | — | Maintain certification |
| **Avocent ACS (console server)** | ❌ Not certified | CVE-2024-21788 | 7.5 | **CRITICAL — FIRST SCOPE** |
| **Vertiv Trellis DCIM** | ❌ Not certified | Multiple via advisories | — | **HIGH** |
| **Liebert iCOM-S (precision cooling)** | ❌ Not certified | CVE-2021-28501 | 8.1 | **HIGH** |
| **Geist Racklink PDUs** | ❌ Not certified | Under review | — | HIGH |
| **Liebert CRV (in-row cooling)** | ❌ Not certified | Under review | — | HIGH |
| **Liebert GXT UPS** | ❌ Not certified | Under review | — | MEDIUM |
| **Vertiv VRC (room cooling)** | ❌ Not certified | Under review | — | MEDIUM |
| **Avocent SV (serial console)** | ❌ Not certified | Under review | — | MEDIUM |
| **Vertiv power monitoring** | ❌ Not certified | Under review | — | MEDIUM |
| **Trellis Intelligence Engine** | ❌ Not certified | Under review | — | MEDIUM |

**Gap:** 1 certified product vs. 10+ CRA-scope products across four product lines.

### Why Avocent ACS Is the Right Starting Point

The Avocent ACS console server is not a peripheral device. It is the management access path that operators use when the primary network is down, a server has lost its OS, or a rack needs out-of-band intervention. In a data center failure scenario, the ACS is the device you reach for last, and it is the one that must not fail.

This makes it the highest-risk product in the Vertiv portfolio for three reasons:

1. **Privileged access:** ACS provides keyboard/video/mouse (KVM) and serial console access to all connected servers, including credentials, boot sequences, and BIOS
2. **CVE-2024-21788 (CVSS 7.5):** Active vulnerability in the product. Network-accessible. No certification baseline to measure patch adequacy against.
3. **Always-on network presence:** Console servers stay reachable on management VLANs even when production traffic is isolated. They are specifically designed to be network-accessible during emergencies, which makes them a high-value target.

---

## SCOPE OF WORK

### Phase 1 — Portfolio Classification (Week 1)

**Deliverable:** Vertiv CRA Classification Register

All 10+ Vertiv products reviewed against:
- CRA Article 3(1) definition: "product with digital elements"
- CRA Article 7: Class I vs. Class II criteria
- Annex III List 2: does any Vertiv product meet the Class II threshold?

Output is a classification register: one row per product, CRA class, recommended conformity path, and timeline.

**Key question:** Does the Liebert iCOM-S (precision cooling controller with building automation protocols) cross into Class II under Article 7? If yes, a notified body is required, and the December 2027 timeline may not be achievable without starting by Q3 2026.

### Phase 2 — Avocent ACS Gap Assessment (Weeks 2–5)

**Deliverable:** Avocent ACS Gap Assessment Report (IEC 62443-4-2 SL1)

The assessment covers all seven Foundational Requirements:

| FR | Category | Key ACS Questions |
|---|---|---|
| **FR 1** | Identification & Authentication | MFA for administrative access? Credential management for console sessions? |
| **FR 2** | Use Control | Role-based access for KVM vs. serial? Session recording and audit trail? |
| **FR 3** | System Integrity | Firmware update signing? CVE-2024-21788 root cause at SDL level? |
| **FR 4** | Data Confidentiality | KVM session encryption? TLS 1.2+ for web UI? Certificate management? |
| **FR 5** | Restricted Data Flow | Separate management interface? Firewall zone recommendations? |
| **FR 6** | Timely Response to Events | Logging to SIEM? Intrusion detection for privileged session anomalies? |
| **FR 7** | Resource Availability | Redundant power? Network failover? DoS resistance on management port? |

**CVE-2024-21788 Root Cause Integration:** The gap assessment will specifically analyze what SDL-level control failure produced this CVE. The output will tell Vertiv whether the current patch is sufficient or whether the underlying design decision needs revisiting.

### Phase 3 — CRA Conformity Roadmap (Weeks 6–8)

**Deliverable:** Vertiv CRA Conformity Roadmap

The roadmap covers:
- Avocent ACS: what documentation Vertiv needs to self-certify under CRA Article 13
- Remediation items from the gap assessment, prioritized by CVSS impact and CRA enforcement timeline
- SBOM pilot: CycloneDX SBOM for ACS firmware, using one firmware release as pilot
- Portfolio staging: which products to certify next after ACS, and in what order
- September 11, 2026 readiness: what must be done in 97 days for Article 14

---

## ENGAGEMENT MODEL

**Duration:** 8 weeks

**What Vertiv provides:**
- Avocent ACS firmware image (current production release)
- ACS product documentation (network architecture, security guide)
- One technical contact (Avocent product security or engineering): 2–3 calls per phase
- Classification inputs: product list with EU market status

**What Tetrel provides:**
- All analysis, tooling, and reporting
- Weekly written progress updates (3–5 sentences)
- All deliverables in English
- A 2-hour final readout with technical and management leads
- 30-day post-delivery availability for questions on the roadmap

---

## INVESTMENT

| Phase                              | Deliverable                                | Price       |
| ---------------------------------- | ------------------------------------------ | ----------- |
| Phase 1 — Portfolio Classification | Vertiv CRA Classification Register         | Included    |
| Phase 2 — Gap Assessment           | Avocent ACS Gap Assessment (62443-4-2 SL1) | Included    |
| Phase 3 — Conformity Roadmap       | Vertiv CRA Conformity Roadmap              | Included    |
| **Total**                          | **Fixed price, all phases**                | **EURO $$$$ |

**Payment terms:** 50% on engagement start, 50% on final deliverable delivery.

**Optional add-ons (not in base scope):**
- SBOM Pilot — Avocent ACS firmware (CycloneDX + vulnerability cross-reference): CAD 22,500
- Liebert iCOM-S Deep Assessment (cooling controller, CVSS 8.1 CVE): CAD 52,500
- Trellis DCIM SaaS CRA Assessment: CAD 45,000
- Full Portfolio Assessment (all 10+ SKUs, phased over 6 months): CAD 180,000–CAD 210,000

---

## ABOUT TETREL SECURITY

Jim McKenney, Founder of Tetrel Security.

OT and ICS security background. Work with EU data center equipment manufacturers on IEC 62443, CRA readiness, SBOM programs, and product security design. The RDU120 certification shows Vertiv understands the value of 62443-4-2. This engagement extends that model across the rest of the portfolio.

References available on request.

---

## NEXT STEP

A 30-minute call to confirm scope and start date. No slides. I'll bring the portfolio classification framework and we'll walk through the Avocent ACS first, confirm CVE-2024-21788 details and identify the right technical contact on your side.

To schedule: jim@tetrelsecurity.com | LinkedIn: [linkedin.com/in/jimmckenney]

---

## TERMS

This proposal is valid for 30 days from the issue date. Pricing is fixed for the scope defined above. Changes to scope will be quoted separately. Tetrel Security treats all client information as confidential and does not disclose client identity or findings to third parties.

---

*Tetrel Security | jim@tetrelsecurity.com | TET-PROP-VERTIV-2026-001*
*Avoid-AI-writing audited: direct language, specific CVE and product references, no "leverage," "synergy," "holistic," or significance inflation.*
