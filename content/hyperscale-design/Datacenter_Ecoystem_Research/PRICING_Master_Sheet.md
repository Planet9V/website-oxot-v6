# Tetrel — Master Pricing Sheet

**Version:** June 2026
**Currency:** All prices in EUROS
**Blended hourly rate basis:** EURO 1200-1500 Day (senior consultant + associate blend)
**Fixed-scope engagements:** Preferred for all first engagements. No open-ended T&M on initial SOWs.

---

## How to Use This Sheet

1. Identify the service line the prospect needs (use campaign tag or discovery call output)
2. Select the T-shirt size based on product family scope or facility size
3. Use the price range as your starting point in the proposal
4. Never quote below the floor of any range without written approval
5. For multi-service engagements, calculate each service separately then apply a 10–15% bundle discount

---

## SERVICE 1 — CRA Readiness Assessment

**Service tag:** `service_cra_readiness`
**Applicable campaign:** CRA Sprint (Campaign 01)
**Trigger:** EU Cyber Resilience Act Articles 13/14 obligations activating September 11, 2026
**Deliverable:** Gap report against CRA Annex I requirements + Article 13 attestation document + SBOM process assessment

| Size                         | Scope                                                                                                                                                                                                                                          | Hours         | Price (EUROS) |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------ |
| **S — Single Product**       | One networked product or product variant (e.g., single UPS model, single PDU SKU). Desktop review of documentation, network interface architecture, and current security controls.                                                             | 40–80 hours   |               |
| **M — Product Family**       | One product family with 3–8 SKU variants sharing a common platform architecture. Includes architecture interview with engineering team, SBOM process review, and vulnerability disclosure workflow assessment.                                 | 120–220 hours |               |
| **L — Platform / Major OEM** | Complete product line across multiple product families. Covers all networked products sold into EU markets. Includes multi-session architecture review, SBOM toolchain assessment, and draft Article 13 attestation document for legal review. | 300–500 hours |               |

**Delivery timeline:** 6–8 weeks (S/M), 10–14 weeks (L)
**Post-delivery:** Optional 30-day follow-on for remediation guidance (T&M at CAD 325/hour)

---

## SERVICE 2 — IEC 62443-4-2 Supplier Component Gap Assessment

**Service tag:** `service_iec62443_supplier_gap`
**Applicable campaign:** CRA Sprint (Campaign 01), Whitepaper inbound (Campaign 03)
**Trigger:** Customer audit requirement, hyperscaler procurement mandate, NIS2 supply chain screening, or CRA product conformity
**Deliverable:** FR1–FR7 security requirement posture mapping, SL-2 gap report, remediation roadmap formatted for certification body submission

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Single Component** | Single network interface card, management module, or embedded controller. Desktop review of firmware architecture and technical security controls against 62443-4-2 SL-2 FR1–FR7. | 40–80 hours | **CAD 11,000–30,000** |
| **M — Product Family** | Product family sharing a common firmware architecture. Includes hands-on testing against documented security requirements, interview with firmware development team. | 120–220 hours | **CAD 33,000–82,500** |
| **L — Full Platform** | Major OEM platform review: multiple firmware stacks, network interfaces, and management software. Includes development lifecycle review (62443-4-1 bridge) and CB-submission-ready gap report. | 300–500 hours | **CAD 82,500–187,500** |

**Delivery timeline:** 6–10 weeks (S/M), 12–16 weeks (L)
**CB submission support:** CAD 8,000–15,000 flat to support certification body intake (additional SOW)

---

## SERVICE 3 — OCP S.A.F.E. Firmware Security Review

**Service tag:** `service_ocp_safe_review`
**Applicable campaign:** Whitepaper inbound, direct ODM outreach
**Trigger:** Microsoft SSPA mandate, hyperscaler procurement requirement, OCP Foundation membership obligation
**Deliverable:** OCP S.A.F.E.-aligned firmware assessment: SBOM completeness, firmware integrity verification, CVE inventory, secure boot chain-of-trust review, vulnerability disclosure readiness

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Single Component** | Single firmware component: SSD controller, smart eFuse, BMC silicon assessment. SBOM review and CVE inventory mapping. | 60–100 hours | **CAD 16,500–37,500** |
| **M — Mainboard Platform** | Full server platform: BIOS/UEFI review, BMC firmware interface threat model, hardware Root of Trust integration assessment (Caliptra/OpenTitan), signed update mechanism verification. | 150–250 hours | **CAD 41,250–93,750** |
| **L — Rack-Scale System** | Complete rack-scale compute: end-to-end trust chain from silicon boot to network management, all firmware components, supply chain provenance review. | 300–500 hours | **CAD 82,500–187,500** |

**Delivery timeline:** 6–8 weeks (S/M), 10–14 weeks (L)
**Integrated engagement discount (OCP S.A.F.E. + IEC 62443-4-2):** 15% off combined price when both are run concurrently under a single SOW

---

## SERVICE 4 — IEC 62443 Brownfield Facility Assessment (DC)

**Service tag:** `service_iec62443_dc_brownfield`
**Applicable campaign:** Scoping Clinic (Campaign 02), CRA Sprint (Campaign 01 operator-side)
**Trigger:** Customer audit, NIS2 supply chain screening, internal baseline requirement, insurer requirement
**Deliverable:** Zone and conduit map per IEC 62443-3-2, SL-2 gap report per 62443-3-3, prioritized remediation roadmap

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Single Facility Zone** | Single facility subsystem (e.g., chiller plant network, PDU management VLAN, BMS integration layer). Limited scope — partial zone/conduit map. | 80–160 hours | **CAD 22,000–60,000** |
| **M — Full Facility** | Single datacenter or industrial facility. Complete zone/conduit map, SL-2 gap assessment for all OT systems, threat model summary, remediation roadmap. | 200–400 hours | **CAD 55,000–150,000** |
| **L — Multi-Site / Campus** | Enterprise-wide multi-site program (3–8 campuses or facilities). Governance alignment, zone/conduit design, physical inspection, supplier procurement framework integration. | 500–900 hours | **CAD 137,500–337,500** |

**Delivery timeline:** 6–8 weeks (S), 10–14 weeks (M), 16–24 weeks (L)
**Annual retainer (post-assessment):** CAD 24,000–60,000/year for quarterly compliance review and CVE monitoring

---

## SERVICE 5 — IEC 62443 Brownfield Assessment (Manufacturing)

**Service tag:** `service_iec62443_mf_brownfield`
**Applicable campaign:** Scoping Clinic (Campaign 02), NIS2 outreach (manufacturing operators)
**Trigger:** NIS2 Article 21 compliance, CRA supplier screening, customer audit
**Deliverable:** Zone/conduit map for manufacturing OT network, SL-2 gap report, supplier risk register

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Single Production Line** | Single manufacturing cell or production line OT network. | 80–160 hours | **CAD 22,000–60,000** |
| **M — Single Facility** | Full manufacturing facility: all PLCs, SCADA, HMI, and industrial networking. Zone/conduit map + SL-2 gap + supplier risk register. | 200–400 hours | **CAD 55,000–150,000** |
| **L — Multi-Site Enterprise** | Enterprise manufacturing: multiple facilities, governance alignment, supply chain risk. | 500–900 hours | **CAD 137,500–337,500** |

**Delivery timeline:** Same as Service 4

---

## SERVICE 6 — IEC 62443 Brownfield Assessment (Energy)

**Service tag:** `service_iec62443_en_brownfield`
**Applicable campaign:** Scoping Clinic (Campaign 02), NERC CIP / NIS2 energy outreach
**Trigger:** NERC CIP compliance, NIS2 essential services obligation, DER integration project
**Deliverable:** Zone/conduit model for energy OT network, NERC CIP / NIS2 crosswalk, remediation roadmap

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Single DER / Substation** | Single DER integration, substation, or microgrid OT network. | 80–160 hours | **CAD 22,000–60,000** |
| **M — Facility + Grid Integration** | Full DC facility + grid-connected energy assets: substation, BESS, DER management. | 200–400 hours | **CAD 55,000–150,000** |
| **L — Multi-Site Energy Program** | Multi-site energy portfolio: generation, storage, transmission. | 500–900 hours | **CAD 137,500–337,500** |

**Delivery timeline:** Same as Service 4

---

## SERVICE 7 — SMR / Nuclear Digital I&C Security

**Service tag:** `service_smr_nuclear_ics`
**Applicable campaign:** CRA Sprint (nuclear cohort), direct SMR outreach
**Trigger:** NRC 10 CFR 73.54 cyber plan requirement, CNSC cybersecurity regulatory approval
**Deliverable:** CDA (Critical Digital Asset) classification, IEC 62443-4-2 / NRC 73.54 crosswalk, zone/conduit design for safety-critical digital I&C boundary

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — CDA Scoping** | Preliminary CDA boundary definition and 73.54 / 62443 crosswalk. Entry-point engagement — leads to M or L. | 80–160 hours | **CAD 22,000–60,000** |
| **M — Cyber Plan Support** | Full 73.54 cyber plan element development: CDA classification, security controls, boundary documentation. | 300–500 hours | **CAD 82,500–187,500** |
| **L — Full Program** | Complete cybersecurity program for construction permit or operating license: all 73.54 elements, defense-in-depth documentation, IEC 62443-4-2 component assessments for digital I&C systems. | 700–1,200 hours | **CAD 192,500–450,000** |

**Note:** SMR engagements require NRC nuclear facility security clearance coordination. Add 4–8 weeks for regulatory access setup on first SMR engagement.

---

## SERVICE 8 — Scoping Clinic (Entry-Point / Standalone)

**Service tag:** `service_scoping_clinic`
**Applicable campaign:** Scoping Clinic (Campaign 02)
**Deliverable:** 1-page OT zone heat map + top 3 gap findings + recommended next steps (3 options)

| Format | Scope | Price (CAD) |
|:--|:--|:--|
| **Remote (2 hours)** | Single facility or product architecture. Virtual whiteboard. | **CAD 3,500** |
| **On-site (2 hours)** | Single facility or product architecture. On-site visit within 3 hours of Toronto. Travel not included. | **CAD 6,000** |
| **On-site (full day, 6 hours)** | Multiple facilities or complex architecture. On-site visit. Travel not included. | **CAD 12,000** |

**Deposit:** 100% due on booking. Non-refundable within 48 hours of session.
**Conversion:** 30–40% convert to Service 4, 5, or 6 full assessments within 30 days.

---

## SERVICE 9 — NIS2 Supply-Chain Screening

**Service tag:** `service_nis2_supply_chain`
**Applicable campaign:** Operator-side outreach
**Trigger:** NIS2 Article 21(d) supply chain security obligations for essential service operators
**Deliverable:** Supplier security risk register, NIS2 Article 21 compliance mapping, recommended contract clauses for supplier agreements

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Tier 1 Suppliers** | Risk assessment of top 10–15 critical OT suppliers. | 80–120 hours | **CAD 22,000–45,000** |
| **M — Full Supply Chain** | Risk register for complete OT supply chain (20–50 suppliers). Includes attestation requests and risk scoring. | 200–350 hours | **CAD 55,000–131,000** |

---

## SERVICE 10 — OT M&A Due Diligence

**Service tag:** `service_ma_due_diligence`
**Applicable campaign:** PE operating partner channel / corporate development
**Trigger:** M&A transaction with manufacturing, energy, or industrial technology target
**Deliverable:** OT cybersecurity due diligence report: asset inventory, known vulnerabilities, regulatory exposure, remediation cost estimate, deal risk rating

| Size | Scope | Hours | Price (CAD) |
|:--|:--|:--|:--|
| **S — Small Target** | Single-site industrial company. Remote review of publicly available information + management interview. | 60–100 hours | **CAD 16,500–37,500** |
| **M — Mid-Market Target** | Multi-site target. Site visit + deep technical review + regulatory crosswalk. | 150–300 hours | **CAD 41,250–112,500** |
| **L — Enterprise Target** | Enterprise target: multiple countries, complex OT estate. Full on-site assessment + supplier review. | 400–800 hours | **CAD 110,000–300,000** |

---

## Bundle Pricing

| Bundle | Services | Individual Total | Bundle Price | Discount |
|:--|:--|:--|:--|:--|
| **CRA + IEC 62443-4-2 (Supplier)** | Service 1 (M) + Service 2 (M) | CAD 66,000–165,000 | **CAD 56,000–140,000** | ~15% |
| **OCP S.A.F.E. + IEC 62443-4-2** | Service 3 (M) + Service 2 (M) | CAD 74,250–176,250 | **CAD 63,000–150,000** | ~15% |
| **Clinic + Full Brownfield** | Service 8 (remote) + Service 4 (M) | CAD 58,500–153,500 | **CAD 52,000–130,000** | ~10% (clinic fee applied as credit) |
| **CRA + NIS2 Supply Chain** | Service 1 (M) + Service 9 (S) | CAD 55,000–127,500 | **CAD 47,000–108,000** | ~15% |

---

## Billing Terms (All Engagements)

| Term | Detail |
|:--|:--|
| **Deposit** | 30% upon SOW signature |
| **Milestone 1** | 35% at project midpoint (kickoff + documentation review complete) |
| **Final payment** | 35% upon delivery of final report |
| **Payment terms** | Net 30 from invoice date |
| **Currency** | CAD default; USD or EUR available (use Bank of Canada rate on invoice date) |
| **T&M rate** | CAD 325/hour blended (senior + associate) for out-of-scope work |
| **Travel** | Economy airfare + accommodation at cost; no markup. Required for on-site work outside Ontario. |
| **Expenses** | Standard business expenses billed at cost |

---

## Pricing Authority

| Situation | Authority |
|:--|:--|
| Standard pricing within ranges above | Jim McKenney — no approval required |
| Below floor of any range | Requires written discussion — do not discount without documentation |
| Bundle not listed above | Construct manually: each service at standard price, apply 10–15% bundle |
| Multi-year retainer (>CAD 100K/year) | Founder discussion required before quoting |

---

*Master Pricing Sheet | Tetrel Security | June 2026*
*Cross-reference: [Market_Sizing_Pricing_and_Prospect_Analysis_2026.md](file:///Users/jimmcknney/jim_private/9_prospects/Market_Sizing_Pricing_and_Prospect_Analysis_2026.md)*
