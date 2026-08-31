# ORGANIZATIONAL INTELLIGENCE PROFILE
## STULZ GmbH — el Prospect Research Dossier

**Profile Version:** 1.1 | **Research Date:** 2026-06-07 | **Updated:** 2026-06-07 | **Next Review:** 2026-09-01
**Analyst:** AI Research Engine v1.1 (Valyu + Valyu Deep Research [STULZ SCC Technical, 42K chars, 50 sources] + NVD + BSI)
**OXOT Services Applicable:** CRA Readiness Assessment · IEC 62443 Gap Assessment · SBOM Program Initiation

---

## PAGE 1 OF 6: COMPANY OVERVIEW

### 1.1 Legal Identity

| Field | Data | Source |
|---|---|---|
| **Full Legal Name** | STULZ GmbH | German commercial register (Handelsregister) |
| **Legal Form** | GmbH (Gesellschaft mit beschränkter Haftung) — private | German law |
| **Ownership** | Private — family-owned; STULZ family | No public filings |
| **Headquarters** | Am Luftschiffhafen 1, 20536 Hamburg, Germany | stulz.com |
| **Founded** | 1947 | Corporate history |
| **CEO/Managing Director** | Frank Stulz (family ownership/management) | Company website (est.) |
| **Employees (Global)** | ~2,500+ (est.) | LeadIQ company intelligence |
| **Countries** | 19 direct; 140+ via distribution partnerships | LeadIQ / stulz.com |
| **Website** | https://www.stulz.com | — |
| **Product Lines** | Precision cooling (CRAC/CRAH), free cooling, adiabatic cooling, humidification | — |
| **US Subsidiary** | STULZ USA, Inc. — 1572 Tilco Drive, Frederick, Maryland 21704 | stulz.com/en-us |
| **Key Markets** | Data centers, IT, industrial, healthcare, science/research, telecom | Catalog |

### 1.2 Business Overview

STULZ is a specialized, premium precision cooling manufacturer with over 40 years of data center focus. Unlike Vertiv or Schneider (which are conglomerates), STULZ is a **pure-play precision cooling company** — its entire business is temperature and humidity control for critical applications.

This focus creates a specific CRA exposure: **STULZ's network management interfaces on cooling equipment** are CRA-scope, and STULZ is a mid-size private company potentially less equipped for CRA compliance than its larger publicly-traded competitors.

*Source: LeadIQ. (2026). *STULZ GmbH company overview*. https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1*
*Source: STULZ. (2026). *Regions — ONE STULZ. ONE NETWORK*. https://www.stulz.com/en-it/regions/*

### 1.3 Financial Profile (Private Company — Estimated)

| Metric | Estimate | Basis |
|---|---|---|
| **Annual Revenue** | €300M–€500M (est.) | Industry comps; employee count; market position |
| **Operating Margin** | 8–14% (est.) | Private precision cooling benchmark |
| **R&D Spend** | Unknown; significant (product innovation is core) | New product line cadence |
| **Ownership** | Family; no external investment known | — |

*Note: STULZ is a private GmbH. No public financial disclosures are available. All revenue estimates are based on employee count, market position, and industry comparables.*

### 1.4 Global Footprint

- **Manufacturing:** Hamburg, Germany (HQ + primary production); additional sites in Austria; China JV
- **US Operations:** Frederick, MD (STULZ USA — sales, service, limited assembly); distributor network across US
- **APAC:** STULZ Asia Pacific — Singapore regional hub
- **Distribution:** 140+ national sales/service agencies across Africa, Middle East, Latin America, Eastern Europe
- **Service Centers:** 19 countries with direct presence including Germany, US, UK, France, Italy, Australia, Singapore, Japan

---

## PAGE 2 OF 6: COMPLETE PRODUCT CATALOG

### 2.1 CRAC/CRAH — Precision Air Conditioning (Data Center Primary Line)

| Product | Type | Capacity Range | Delivery | CRA Network Scope |
|---|---|---|---|---|
| **CyberRow CW** | Row-based in-row CRAC | 10–30kW | Chilled water (CW) | YES — controller has network |
| **CyberRow DX** | Row-based in-row CRAC | 10–30kW | Direct expansion (DX) | YES — controller has network |
| **ADIABATIC CW** | High-efficiency adiabatic CRAC | 30–100kW | Chilled water | YES |
| **CyberAir 3 CW** | Perimeter precision AC | 8–80kW | Chilled water | YES |
| **CyberAir 3 DX** | Perimeter precision AC | 8–80kW | Direct expansion | YES |
| **IDAC** | In-Rack direct liquid cooling | Per rack | Direct liquid | YES |
| **CyberAir 4** | Next-gen precision AC | TBD | CW and DX | YES |

*Source: STULZ. (2026). *CyberRow CW and DX* [Product page]. https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/*

### 2.2 Free Cooling / Economizer Systems

| Product | Type | Feature |
|---|---|---|
| **STULZ FREECOOL** | Air-side economizer | Direct free cooling for temperate climates |
| **STULZ CyberCool** | Water-side free cooling | Chiller integration with free-cooling plate |
| **STULZ Adiabatic Cooling** | Evaporative pre-cooling | Low water consumption vs. traditional CW |
| **STULZ EH Series** | Humidifier systems | Electrode steam / evaporative — data center humidity control |

### 2.3 Industrial and Specialty Cooling

| Market | Product | Feature |
|---|---|---|
| **Industrial** | STULZ Industrial Precision AC | Process cooling for manufacturing, labs, cleanrooms |
| **Healthcare** | STULZ Medical-Grade AC | ISO 14644 cleanroom compatible |
| **Railway/Transportation** | STULZ Rail-grade cooling | IEC 60571 standard, shock/vibration rated |
| **Science/Research** | STULZ Lab Precision AC | Tight temperature/humidity control for scientific instruments |

### 2.4 Software & Management

| Product | Function | Network Protocols | CRA Status |
|---|---|---|---|
| **STULZ SMART COOLING SOLUTIONS** | Intelligent cooling management | TCP/IP, BACnet/IP, Modbus TCP | CRA-scope — Class I |
| **STULZ Navigator** | Fleet monitoring and analytics | Web UI, cloud connectivity | CRA-scope |
| **STULZ SCC (Cooling Center)** | Central cooling controller | BACnet/IP, Modbus TCP, SNMP | CRA-scope |
| **Third-party DCIM integration** | Via SNMP/BACnet to Schneider EcoStruxure IT, Vertiv Trellis, etc. | Standard protocols | CRA-scope |

---

## PAGE 3 OF 6: OT SECURITY & REGULATORY EXPOSURE

### 3.1 Network-Connected Cooling Controllers — THE CRA SURFACE

STULZ cooling units are controlled by embedded microcontroller-based systems with network interfaces. The primary attack surface for CRA assessment:

| Controller / Interface | Protocols | Connectivity | Known Vulns | Cert Status |
|---|---|---|---|---|
| **STULZ SCC (Smart Cooling Controller)** | BACnet/IP, BACnet MS/TP, Modbus TCP, Modbus RTU, SNMP v1/v2c | Ethernet + serial RS-485 | None on NVD 2020–2026 | **None** |
| **STULZ E2 Series Controller** | BACnet IP/MS/TP, Modbus TCP/RTU (Functions 01/02/03/04/05/08/16), SNMP v1/v2c, HTTP web UI | Ethernet | None on NVD | **None** |
| **STULZ Navigator portal** | Web (HTTPS claimed), cloud (CyberHub ECO.DC) | Cloud-connected | None on NVD | **None** |
| **STULZ CyberHub ECO.DC** | Cloud gateway — TLS for cloud comms (claimed); TLS version not documented publicly | Cloud API | None | **None** |
| **STULZ CyberRow controller** | BACnet or Modbus to BMS | Ethernet gateway | None on NVD | **None** |

**Security Assessment (UPDATED 2026-06-07 from Valyu Deep Research):**
- SNMP v1/v2c is the primary network management protocol. SNMPv3 is **not mentioned in any public STULZ documentation** — no v3 requirement documented
- STULZ E2 Series uses four security levels with 5-minute session timeouts — access control exists but is password-only
- HTTP web interface on E2 Series: **no TLS version documented** in any public STULZ specification
- CyberHub ECO.DC uses encrypted cloud communications but no TLS version is published
- Modbus TCP/RTU implementations: Functions 01/02/03/04/05/08/16 confirmed; no authentication at the protocol level (standard Modbus limitation)
- Zero CVEs in NVD, CISA KEV, or major vulnerability databases 2020–2026 — whether this reflects security quality or research obscurity is unknown; no PSIRT page or vulnerability disclosure policy visible on stulz.com
- IEC 62443-4-2: **no certifications for any STULZ product in ISASecure or equivalent registries as of 2026-06-07**

**CRA Exposure:** Every STULZ product with a BACnet/IP or Modbus TCP interface is a "product with digital elements" under CRA Article 3(1). STULZ cooling systems are installed in:
- EU data centers (essential entity infrastructure)
- EU hospitals (critical facilities)
- EU industrial sites (NIS2 operational technology)

### 3.2 EU Cyber Resilience Act Analysis

| Product | CRA PDE? | Est. Article 7 Class | Conformity Requirement |
|---|---|---|---|
| **CyberRow CW/DX (with controller)** | YES | Class I | Self-assessment + DoC |
| **CyberAir 3 (with controller)** | YES | Class I | Self-assessment + DoC |
| **STULZ SCC Controller** | YES | Class I | Self-assessment + DoC |
| **STULZ Navigator (cloud)** | YES | Class I | Manufacturer attestation |
| **STULZ IDAC** | YES | Class I | Self-assessment |
| **Free cooling systems (with automation)** | YES | Class I | Self-assessment |

**STULZ-Specific CRA Risk:** As a **German private company with significant EU sales**, STULZ faces BSI as a local enforcement authority alongside EU-wide CRA. Germany's IT-Sicherheitsgesetz 2.0 applies independently. EU Implementing Regulation (EU) 2025/2392 (published December 1, 2025) provides binding Class I technical descriptions — network management systems and controllers with IP interfaces are explicitly in scope. STULZ cooling controllers with Ethernet/BACnet/Modbus interfaces qualify.

### 3.3 IEC 62443 Status

- **IEC 62443-4-2:** No public certifications found for any STULZ product (2026-06-07)
- **IEC 62443-4-1 SDL:** No public claim found
- **SBOM:** No public program
- **ISO 27001:** Unknown — not publicly disclosed for STULZ GmbH

### 3.4 Known CVEs and Vulnerability Posture

- **CVE record:** Zero CVEs in NVD for "STULZ" (2020–2026). Zero in CISA KEV. Zero in major security databases.
- **Zero-CVE interpretation:** Two possible explanations — (1) robust internal security practices with no exploitable flaws discovered; or (2) minimal security research community focus on STULZ products due to lower market profile vs. Schneider/Vertiv/Eaton. Research cannot distinguish between these without access to device hardware.
- **SNMP v1/v2c posture:** E2 Series and SCC controllers use SNMP v1/v2c. SNMPv1/v2c sends community strings in plaintext — any network-positioned attacker can read SNMP traffic. Standard risk in industrial deployments but a gap against IEC 62443-4-2 FR4 (Data Confidentiality).
- **TLS posture:** No TLS version documented for the E2 Series HTTP web UI. STULZ should be asked: does the web interface enforce TLS 1.2 or higher? Does it accept SSLv3 or TLS 1.0?
- **PSIRT:** No PSIRT page, no security advisory page, no responsible disclosure page visible on stulz.com or stulz-usa.com as of 2026-06-07.
- **CRA Article 14 implication:** Starting September 11, 2026, STULZ must notify ENISA within 24 hours of a confirmed active exploit. Today there is no visible intake mechanism.

*Source: Valyu Deep Research. (2026, June 7). STULZ SCC Technical: 42,602 chars, 50 sources [Task: 3902f8d5-9359-4c42-b091-ac70a50043da].*

---

## PAGE 4 OF 6: ORGANIZATIONAL STRUCTURE

### 4.1 Leadership

| Role | Status | Source |
|---|---|---|
| **Managing Director/CEO** | Family-controlled; Frank Stulz (est.) | Industry sources |
| **Sales Director DACH** | Unknown | LinkedIn search needed |
| **Technical Director / CTO** | Unknown | LinkedIn search needed |
| **CISO / Security** | **Likely does not exist as dedicated role** | Private company of this size; gap |
| **Product Security** | **Likely does not exist as dedicated function** | Same |
| **US President (STULZ USA)** | Unknown; Frederick MD office | LinkedIn search needed |

**Tetrel Note:** STULZ is likely operating **without a dedicated product security function** — this is consistent with a private, engineering-focused manufacturing company of this scale and age. This makes Tetrel's proposition extremely valuable: we can *be* their product security function for CRA compliance.

### 4.2 Geographic Security Considerations

- **Germany (Primary):** BSI oversight + CRA enforcement — dual pressure
- **US (Secondary):** NIST frameworks; less regulatory pressure but hyperscaler customers demand compliance
- **EU (Everywhere):** NIS2 supply chain — STULZ's customers (hospitals, utilities) will demand compliance evidence

---

## PAGE 5 OF 6: CUSTOMERS, COMPETITION & VALUE CHAIN

### 5.1 Primary Customer Segments

| Segment | Notes | Cooling Products Used |
|---|---|---|
| **Data Centers** | Primary revenue driver — colocation, hyperscale, enterprise | CyberRow, CyberAir, IDAC |
| **Telecom** | Outdoor cabinets, central offices | STULZ specialty telecom cooling |
| **Healthcare** | Hospital IT rooms, MRI cooling, OR HVAC | Medical-grade precision AC |
| **Industrial / Manufacturing** | Cleanrooms, labs, process equipment | Industrial precision AC |
| **Science / Research** | Universities, national labs, particle accelerators | High-precision humidity/temp |
| **Military / Defense** | (Limited public info) | Ruggedized versions |

### 5.2 Competitive Position

| Segment | STULZ Rank | Key Competitors |
|---|---|---|
| **Data Center CRAC/CRAH** | Top 5 globally; #1–2 in precision segment | Vertiv (Liebert), Schneider (APC InRow), Airedale, Emerson (legacy) |
| **Free Cooling** | Strong in EMEA | Same competitors |
| **In-Row Cooling** | Strong | Same |
| **Industrial Precision** | Strong in DACH | Rittal, Stego, Pentair |

### 5.3 Value Chain

| Tier | Details |
|---|---|
| **Component Suppliers** | Compressors (Copeland/Emerson), heat exchangers, fans (ebm-papst, Ziehl-Abegg), controls (Siemens, Schneider components) |
| **Manufacturing** | Hamburg (primary), limited subcontracting |
| **Distribution** | Direct in 19 countries; agent/rep in 140+ countries |
| **Channel** | Data center consultants (Uptime, Tier specialists), MEP engineers, data center integrators |
| **Service** | In-house service network in 19 countries; certified service partners globally |

---

## PAGE 6 OF 6: TETREL ENGAGEMENT PLAN

### 6.1 Tetrel Engagement Strategy

#### Priority Score: ★★★★☆ (4/5) — High Priority Prospect

**Why STULZ is a Strong Tetrel Target:**
1. **Zero IEC 62443 certifications** — all products CRA-scope; no path to compliance evident
2. **No product security function** — Tetrel can fill the entire gap as a service
3. **BSI pressure (German company)** — BSI's enforcement of German IT security law + CRA creates urgency that France/US-based competitors don't face as immediately
4. **Private family company** — decision-making is simpler (no board approval cycles); owner/MD can say yes faster
5. **Premium position** — STULZ sells on quality; they will invest to maintain quality/compliance positioning vs. competitors

**Challenge:** Private company — harder to find financial contacts; decision-making process less transparent than public companies.

#### Recommended Outreach Sequence

| Week | Action | Contact | Channel | Message Angle |
|---|---|---|---|---|
| **Week 1** | LinkedIn search — find Hamburg technical leadership | CTO / VP Engineering / MD | LinkedIn | "German CRA enforcement — is your product portfolio ready for BSI?" |
| **Week 1** | US approach — STULZ USA | VP Sales or Technical Director (Frederick, MD) | LinkedIn + cold email | "Your hyperscaler customers are starting to ask about IEC 62443 and CRA" |
| **Week 2** | Send brief | Technical Director | Email | "CRA scope for STULZ product portfolio — 1-page analysis" |
| **Week 3** | Scoping call | MD or CTO | Video call | "German company first-mover advantage: CRA certification before Vertiv/Schneider" |
| **Week 4** | Proposal | MD + Finance | Email | SBOM program + IEC 62443-4-2 for SCC controller as first milestone |

#### Proposed Service Packages

| Service | Scope | Est. Price | Timeline |
|---|---|---|---|
| **CRA Portfolio Mapping (STULZ)** | All networked products; Article 7 classification | CAD 42,000 | 4 weeks |
| **SCC Controller IEC 62443-4-2 Readiness** | Gap assessment for primary controller | CAD 52,500 | 5 weeks |
| **SBOM Program for STULZ** | Process + CycloneDX pilot on SCC firmware | CAD 45,000 | 6 weeks |
| **Full CRA Compliance Program** | All products; IEC 62443 + SBOM + DoC preparation | CAD 135,000–CAD 180,000 | 16 weeks |

---

### 6.2 Citations (APA 7th Edition)

LeadIQ. (2026). *STULZ GmbH company overview, contact details & competitors* [Company intelligence]. https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1

STULZ. (2026). *Regions — ONE STULZ. ONE NETWORK* [Company page]. https://www.stulz.com/en-it/regions/

STULZ USA. (2026). *CyberRow CW and DX* [Product page]. https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/

NVD / NIST. (2026). *Vendor search: STULZ* [CVE database]. https://nvd.nist.gov/vuln/search

STULZ. (2026). *E2 Controller Operation Manual* [Product specification]. https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf

EU Commission. (2025, December 1). *Commission Implementing Regulation (EU) 2025/2392 — CRA Class I technical descriptions*. https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng

Valyu Deep Research. (2026, June 7). *STULZ GmbH Smart Cooling Controller: Technical Security Analysis* [Task: 3902f8d5-9359-4c42-b091-ac70a50043da]. 42,602 chars, 50 sources.

---
*END OF PROFILE — STULZ GmbH — 6 PAGES (v1.1)*
*Total Sources: 7 verified citations | Last Updated: 2026-06-07*
*Updated: Added STULZ E2/SCC technical protocol details from Valyu deep research integration (AGENT-FORGE)*
*Note: STULZ is a private company. All financial estimates modeled from public proxies.*
