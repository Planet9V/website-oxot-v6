 
# PROPOSAL — CRA READINESS ASSESSMENT  
## Legrand SA / Raritan — CVE-Driven Urgency Engagement
**Prepared by:** 
**Prepared for:** Joe DeLong, VP & GM Data Power & Control, Legrand / Raritan
**Date:** June 7, 2026
**Validity:** 30 days
**Reference:** CVE-2023-29585 (CVSS 9.8) + CRA Article 7 December 2027 deadline

---

## EXECUTIVE SUMMARY

CVE-2023-29585 (an authentication bypass in the Raritan PX3 Smart PDU with CVSS 9.8) is patched. The response time was good. The problem is what comes next.

The EU Cyber Resilience Act (CRA, Regulation 2024/2847) establishes a December 11, 2027 certification deadline for every network-connected product sold in the EU. The Raritan PX3 and PX4 are Class I products under Article 7. Legrand's data center portfolio (PX3, PX4, KX4, SX2, CommandCenter, and Server Technology PRO3X) has **zero IEC 62443-4-2 certifications** across all product lines.

The combination of:
- A documented critical CVE: an authentication bypass leading to administrative access without credentials
- A 50+ product CRA compliance surface (largest of any EU DC hardware vendor)
- Zero IEC 62443 certifications anywhere in the group

...creates the most urgent CRA compliance gap in the EU data center infrastructure market.

Tetrel Security proposes a phased CRA Readiness program starting with the Raritan data center division: PX4 as the certification pilot, software bill of materials (SBOM) reconstruction for PX3 legacy estate, and a group-level roadmap covering all Legrand brands.

---

## THE CVE PROBLEM AND WHAT CRA CHANGES

### CVE-2023-29585 — What It Tells Us About Architecture

The PX3 authentication bypass was not a coding error. It was an architectural assumption: that the management web interface would be accessed by authenticated administrators on a trusted network.

CRA Article 10 explicitly removes that assumption. It requires products to be secure **without relying on network perimeter controls as the primary defense**. The Article 10 requirement reads:

> "Products with digital elements shall be designed, developed and produced to ensure an appropriate level of cybersecurity... [including protection against] network exploitation through unsolicited messages."

IEC 62443-4-2 (the technical standard that CRA maps to for Class I products) has specific Security Requirements (SRs) that the PX3 architecture failed:

- **SR 1.1 (Human user identification and authentication):** Authentication must work even when the network is compromised
- **SR 1.2 (Software process and device identification):** API sessions require validated identity  
- **SR 2.1 (Authorization enforcement):** Admin functions must require verified authorization

PX4, the next-generation product, is architecturally closer to meeting these requirements. But it has not been tested or certified to IEC 62443-4-2. The certification gap is now a commercial liability in the EU market.

### What Buyers Are Starting to Ask

EU data center operators (including colocation, healthcare, and financial services) are beginning to include CRA compliance evidence requests in procurement. By December 2027, they will be required to (NIS2 Article 21 supply chain obligations). By September 2026 (CRA Article 14), Legrand must have an ENISA notification process for actively exploited vulnerabilities.

The first operator to ask Legrand for a Raritan PX4 IEC 62443-4-2 certificate is the signal moment. That question is coming.

---

## LEGRAND CRA EXPOSURE — FULL SCOPE

### Raritan Data Center Portfolio

| Product | CRA Scope? | Article 7 Class | Certification | Priority |
|---|---|---|---|---|
| **Raritan PX3 Smart PDU** | YES | Class I | None | CRITICAL (CVE-2023-29585) |
| **Raritan PX4 Smart PDU** | YES | Class I | None | HIGH (next-gen; sell now) |
| **Raritan KX4 KVM over IP** | YES | Class I | None | HIGH |
| **Raritan SX2 Serial Console** | YES | Class I | None | HIGH |
| **Server Technology PRO3X** | YES | Class I | None | HIGH (acquired 2019) |
| **Raritan CommandCenter** | YES | Class I (software) | None | HIGH |
| **Raritan Power IQ** | YES | Class I (software) | None | HIGH |

### Building Automation Portfolio (Legrand Group)

50+ smart wiring devices, connected building automation controllers, and building management gateways, which are all CRA Class I. A group-level program is required.

---

## PROPOSED WORK PROGRAM

### Phase 1 — Raritan PX4: IEC 62443-4-2 Certification Readiness Assessment (Weeks 1–8)

PX4 is the strategic product: current, actively sold in the EU, architecturally better than PX3.

**Deliverable:** PX4 IEC 62443-4-2 Gap Report

Assessment covers all 7 IEC 62443-4-2 Foundational Requirement (FR) groups:

| FR | Requirements | PX4 Assessment Focus |
|---|---|---|
| **FR1 Identification & Auth** | SR 1.1–1.11 | API auth, session mgmt, default credentials |
| **FR2 Use Control** | SR 2.1–2.13 | Role-based access, audit logging |
| **FR3 System Integrity** | SR 3.1–3.14 | Firmware signing, boot security, TLS |
| **FR4 Confidentiality** | SR 4.1–4.2 | Data in transit, credentials at rest |
| **FR5 Restricted Data Flow** | SR 5.1–5.4 | Network interface exposure, segmentation |
| **FR6 Timely Response** | SR 6.1–6.2 | Patching process, PSIRT documentation |
| **FR7 Resource Availability** | SR 7.1–7.8 | DoS resilience, recovery |

**Methodology:**
- Documentation review: product spec, network architecture, firmware release notes
- Configuration analysis: default and hardened config comparison
- Protocol analysis: HTTPS, SNMP v3, REST API, SSH testing
- Firmware SBOM extraction: binary analysis of PX4 firmware for component mapping
- Requirements mapping: SR-by-SR gap rating (Compliant / Partial / Non-Compliant)

**Output:** 40–60 page technical gap report with:
- SR-by-SR finding table with evidence
- Remediation recommendations prioritized by CRA deadline relevance
- Certification readiness score for SL1 and SL2 targets
- Estimated engineering effort to close each gap

**Price:** CAD 67,500 (fixed)
**Timeline:** 8 weeks

---

### Phase 2 — PX3 Legacy Estate SBOM Reconstruction (Weeks 6–10)

PX3 is the installed base. CVE-2023-29585 is patched, but the patch history, component inventory, and current firmware composition are not publicly documented.

CRA Annex I requires SBOM for all products sold in the EU. For legacy products still installed at EU customers, the SBOM obligation is a manufacturer responsibility.

**Deliverable:** PX3 Firmware SBOM (CycloneDX) + Legacy Estate CRA Guidance Document

Work:
1. Binary analysis of PX3 firmware (latest patched release + 1 legacy version)
2. Component extraction: open-source libraries, versions, license identification
3. CVE mapping against extracted components (Grype scan)
4. CycloneDX SBOM document generation
5. Guidance document: what Legrand/Raritan should communicate to EU PX3 customers about firmware currency

**Price:** CAD 42,000 (fixed)
**Timeline:** 5 weeks (overlapping Phase 1, Weeks 6–10)

---

### Phase 3 — Raritan Group CRA Roadmap (Weeks 9–12)

**Deliverable:** Raritan Data Center Division CRA Compliance Roadmap

Covers: PX4 (post Phase 1 findings), KX4, SX2, CommandCenter, Server Technology PRO3X, Power IQ

For each product:
- Article 7 classification confirmation
- Gap to certification (based on PX4 findings, extrapolated with product-specific analysis)
- Recommended certification order (PX4 → KX4 → SX2 → Server Tech)
- Estimated cost and timeline to certification per product
- Interim risk mitigation steps for products not yet certified

**Output:** Executive roadmap (10–15 pages) + Technical appendix per product

**Price:** CAD 33,000 (fixed)
**Timeline:** 4 weeks

---

### Phase 4 — September 11 ENISA Readiness (Weeks 11–14)

**Deliverable:** CRA Article 14 Notification Readiness Package

Raritan PSIRT exists but the group-level Article 14 notification process for EU obligations needs formalization. Deliverables:

1. Vulnerability identification procedure (what triggers Article 14 for Legrand/Raritan)
2. ENISA notification template and process documentation
3. Internal escalation matrix (PSIRT → Legal → Executive → ENISA)
4. Third-party component monitoring process (SBOM feeds into CVE alerting)
5. Published PSIRT contact update (CRA Article 13 requirement)

**Price:** CAD 21,000 (fixed)
**Timeline:** 3 weeks

---

## SUMMARY PRICING

| Phase | Deliverable | Price | Timeline |
|---|---|---|---|
| **Phase 1** | PX4 IEC 62443-4-2 Gap Report | CAD 67,500 | Weeks 1–8 |
| **Phase 2** | PX3 Legacy SBOM Reconstruction | CAD 42,000 | Weeks 6–10 |
| **Phase 3** | Raritan Group CRA Roadmap | CAD 33,000 | Weeks 9–12 |
| **Phase 4** | Article 14 ENISA Readiness | CAD 21,000 | Weeks 11–14 |
| **Total** | **Full Raritan Data Center CRA Program** | **CAD 163,500** | **14 weeks** |

**Optional add-on:** Legrand building automation group CRA mapping: CAD 97,500 additional, taking 8 weeks, running independently of the above.

**Payment:** 30% on start; 40% at Phase 1 delivery; 30% at Phase 4 completion.

---

## ABOUT TETREL SECURITY

Tetrel Security provides IEC 62443-4-2 gap assessments and CRA readiness programs for EU data center infrastructure manufacturers. We work directly with product engineering teams, not through management consulting intermediaries.

**Jim McKenney** | Founder, Tetrel Security  
jim@tetrel.io | tetrel.io

---
*Proposal Reference: TETREL-2026-LEGRAND-001*
*Prepared: 2026-06-07 | Valid: 30 days | Confidential*
