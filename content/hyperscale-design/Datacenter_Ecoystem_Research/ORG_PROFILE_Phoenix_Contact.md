# ORGANIZATIONAL INTELLIGENCE PROFILE
## Phoenix Contact GmbH & Co. KG — Prospect Research Dossier

**Profile Version:** 1.0 | **Research Date:** 2026-06-07 | **Next Review:** 2026-09-01
**Profile Pages:** 6 | **Analyst:** AI Research Engine v1.0 (Valyu + CISA registries)
Services Applicable:** CRA Readiness Assessment · NIS2 Supply Chain Compliance Audit · SBOM Program Development

---

## PAGE 1 OF 6: COMPANY OVERVIEW & CORPORATE STRUCTURE

### 1.1 Legal Identity

| Field | Data | Source |
|---|---|---|
| **Full Legal Name** | Phoenix Contact GmbH & Co. KG | Lemgo Local Court (HRA 3746) |
| **Legal Form** | Limited partnership (GmbH & Co. KG) | German corporate registry |
| **Headquarters Address** | Flachsmarktstraße 8, 32825 Blomberg, North Rhine-Westphalia, Germany | Corporate headquarters |
| **US Headquarters** | Harrisburg / Middletown, Pennsylvania, USA (established 1981) | U.S. operations |
| **Founded** | July 1, 1923 (Hugo Knümann) | History registry |
| **CEO** | Dirk Görlitzer (CEO since January 2025, former COO) | Board announcement |
| **Employees (Global)** | ~21,000 | Corporate profile |
| **Website** | https://www.phoenixcontact.com | — |
| **Product Security (PSIRT)** | https://www.phoenixcontact.com/en-pc/service-and-support/psirt | Verified portal |

### 1.2 Financial Performance (FY2024 Estimates)

| Metric | FY2024 | FY2023 | FY2022 |
|---|---|---|---|
| **Total Revenue** | €3.0B ($3.25B CAD equivalent) | €3.4B | €3.6B |
| **Year-over-Year Growth** | -11.8% | -5.6% | +21.2% |
| **Equity Ratio** | >60% (strong balance sheet) | — | — |
| **Capital Expenditures** | €300M (in 2023 alone) | — | — |

*Source: Corporate communications. Specific EBITDA margins, net income, free cash flow, and debt levels are not publicly disclosed due to the company's private, family-owned status.*

### 1.3 Business Ownership & Segments
Phoenix Contact is 100% family-owned, with the Eisert family retaining voting control. Operations are grouped into six product segments:
1.  **Control & Automation Systems (Automate):** PLCnext controllers, industrial PCs (IPCs), and HMIs.
2.  **Connectors & Terminal Blocks (Connect):** Standard terminal blocks (MKDS, UT, PT series), M12 circular connectors, and fiber-optic cables.
3.  **Tools & Assembly Systems (Mark/Assemble/Install):** Hand tools, wire marking printers, and cabinet assembly components.
4.  **Power Supplies & Circuit Protection (Power Distribution):** Quint UPS systems, Trio power supplies, and surge protection devices.
5.  **Relays & Monitoring (Switch/Measure/Monitor):** Safety relays (PSR series) and EMpro energy monitors.
6.  **EV Charging Infrastructure (E-Mobility):** CHARX charging controllers.

---

## PAGE 2 OF 6: FULL PRODUCT PORTFOLIO — DATA CENTER DIVISION

### 2.1 PLCnext Control & Edge Automation

| Product Family | Model Range | Networking Interface | Protocol Support | Target Market |
|---|---|---|---|---|
| **PLCnext Control**| AXC F 1152 to 3152 | Dual Ethernet | EtherNet/IP, Modbus TCP, OPC UA, REST | Modular data center controls, edge gateways |
| **Industrial PCs** | VL3 line / blind node | Gigabit Ethernet | TCP/IP, OPC UA, HTTP/REST | Edge data processing, SCADA nodes |

*   **PLCnext Technology:** Open Linux-based platform enabling execution of real-time C++, C#, Python, and standard IEC 61131-3 languages.

### 2.2 Critical Power & Uninterruptible Power Supplies (UPS)

| Product Family | Variant | Nominal Voltage | Interface Options | Security Certification |
|---|---|---|---|---|
| **Quint4-UPS** | Switched-mode UPS | 24 VDC / 120-230 VAC | EtherNet/IP, PROFINET, USB | Vulnerability flagged (No vendor patch) |
| **Trio Power** | AC/DC Power Supply | 12 VDC to 48 VDC | Diagnostic contacts | Basic electrical safety |
| **EMpro Monitors** | Panel / DIN-Rail | Up to 500 VAC | Modbus TCP, REST API, MQTT | Energy management systems |

### 2.3 E-Mobility & Fleet Charging (CHARX)

| Controller Family | Interface Type | Comm Protocols | Target Application | Status |
|---|---|---|---|---|
| **CHARX SEC-3xxx** | Ethernet, RS-485 | Modbus, MQTT, OCPP 1.6/2.0 | AC Level 2 / DC charging | Vulnerabilities flagged (Firmware v1.7.3) |

### 2.4 Connectivity & Grounding Systems
*   **PT Series Terminal Blocks:** Push-in wire connection blocks for cabinet power distribution.
*   **Heavycon Connectors:** Heavy-duty rectangular connectors designed for harsh environments.
*   **VeriSafe absence of voltage tester integration:** Installed in electrical control cabinets to verify absence of voltage prior to access.

---

## PAGE 3 OF 6: OT SECURITY ANALYSIS & REGULATORY EXPOSURE

### 3.1 Cybersecurity Certification Status

| Product Line / Division | IEC 62443-4-1 | IEC 62443-4-2 | ISO 27001 | SOC 2 Type II |
|---|---|---|---|---|
| **PLCnext Control** | Maturity Level 3 | Certified (SL2) | No | No |
| **Quint4-UPS** | Maturity Level 3 | No | No | No |
| **CHARX Controllers**| Maturity Level 3 | No | No | No |
| **Corporate Group** | Certified (2-1) | No | No | No |

**Security Program Profile:** Phoenix Contact holds comprehensive IEC 62443 process and product certifications verified by TÜV Rheinland and TÜV Süd. The PLCnext controller was the first automation hardware on the market to achieve IEC 62443-4-2 SL2 certification. However, the company has no public ISO 27001 or SOC 2 certifications, representing an information security governance gap.

### 3.2 EU Cyber Resilience Act (CRA) Exposure
Under CRA Article 3(1), Phoenix Contact's products qualify as products with digital elements:
*   **PLCnext Controllers:** Class II products due to programmable operational control functions.
*   **CHARX EV Controllers:** Class I/II depending on grid integration capabilities.
*   **Quint4-UPS Systems:** Class I products.

**Penalty Exposure:** Violations of CRA compliance rules expose Phoenix Contact to penalties up to 2.5% of global annual turnover, representing a maximum potential fine of €75 million (approximately $81 million CAD equivalent) based on estimated FY2024 revenue.

### 3.3 NIS2 supply Chain Obligations
The NIS2 Directive (effective October 2024, enforcement beginning November 2026) impacts Phoenix Contact's sales operations:
*   **Supply Chain Verification:** EU enterprise clients must audit Phoenix Contact's secure development lifecycle (IEC 62443-4-1 ML3) and vulnerability tracking.
*   **SBOM Demands:** European buyers must demand machine-readable SBOMs (SPDX/CycloneDX format) for PLCnext and CHARX firmware.

### 3.4 Publicly Disclosed Vulnerabilities (Last 24 Months)

#### CHARX EV Charging Controllers (July 2025)
*   **Vulnerability Cluster:** 9 CVEs discovered (CVE-2025-25268, CVE-2025-25269, CVE-2025-24002 through 24006).
*   **CVE-2025-25268 / CVE-2025-25271 (CVSS: 8.8):** Unauthenticated OCPP configuration modification.
*   **CVE-2025-24003 (CVSS: 8.2):** Remote command injection via MQTT.
*   **Patch Status:** Firmware v1.7.3 released, but does not remediate three critical vulnerabilities.

#### Quint4-UPS Power Systems (April 2025)
*   **CVE-2025-41703 (CVSS: High):** Unauthenticated Modbus manipulation.
*   **Patch Status:** No vendor fix available. Phoenix Contact recommends network isolation.

---

## PAGE 4 OF 6: STRATEGIC CONTEXT & GROWTH SIGNALS

### 4.1 Post-Pandemic Normalization & Investments
Phoenix Contact experienced a revenue contraction of -16.7% from its peak in FY2022 (€3.6B) to FY2024 (€3.0B), reflecting post-pandemic customer destocking and industrial headwinds in Europe.
*   **Financial Resilience:** Despite revenue declines, the company maintains a strong capital structure with an equity ratio exceeding 60%.
*   **Capital Investment:** Invested over €1.0 billion in capital expenditures over the past three years, focusing on manufacturing automation and digital business models.

### 4.2 Competitive Position

| Product Segment | Market Position | Key Competitors | Strategic Advantage |
|---|---|---|---|
| **Terminal Blocks & Connectors**| Tier 1 (Global) | Wago, Weidmüller, Legrand | Wiring duct brand heritage and push-in technology |
| **PLC Automation** | Tier 2 | Siemens, Rockwell, Beckhoff | Open source PLCnext environment and IEC 62443 SL2 cert |
| **EV Charging Controllers** | Tier 2 | Keba, ABB, Delta Electronics | High-power charging hardware |

### 4.3 Partnerships & Alliances
*   **Distributor Channel:** Partners with over 30 global authorized electronics distributors (including DigiKey, Mouser, Newark, and Wesco) to manage transaction volume.
*   **PLCnext Community:** Operates the PLCnext Store, an open app store for industrial automation software components.
*   **Strategic System Integrators:** Collaborates with process automation partners (such as AWC and Blue Sky Reps) to deploy custom hardware packages.

---

## PAGE 5 OF 6: KEY PERSONNEL & ORGANIZATIONAL STRUCTURE

### 5.1 Executive Leadership (Blomberg HQ)

| Name | Title | Scope of Responsibility | Location |
|---|---|---|---|
| **Dirk Görlitzer** | CEO | China division, corporate strategy, transformation | Blomberg, Germany |
| **Ulrich Leidecker** | COO / Spokesman | Purchasing, logistics, US division, communications | Blomberg, Germany |
| **Torsten Janwlecke** | COO | Quality, product compliance, sustainability | Blomberg, Germany |
| **Frank Possel-Dölken** | Chief Digital Officer | IT, OT, innovations, digital business | Blomberg, Germany |
| **Axel Wachholz** | CFO | Finance, human resources, ESG | Blomberg, Germany |

*Note: Dirk Görlitzer was promoted to CEO in January 2025 after serving as COO since 2020. He has been with the company since 1994.*

### 5.2 Product Security & Vulnerability Response Leadership
*   **PSIRT Governance:** Vulnerability response is managed by the corporate Product Security Incident Response Team (PSIRT), reachable at psirt@phoenixcontact.com.
*   **Technical Authority:** The CDO (Frank Possel-Dölken) oversees the innovation and IP divisions, which include secure software development (IEC 62443-4-1) frameworks.
*   **Organizational Gap:** No designated Chief Information Security Officer (CISO) or Chief Product Security Officer (CPSO) is publicly named. This lack of centralized security leadership complicates coordinate audits for multinational customers.

---

## PAGE 6 OF 6: CUSTOMERS, VALUE CHAIN & TETREL ENGAGEMENT PLAN

### 6.1 Primary Customer Segments
*   **Data Center Operators:** NOVVA Data Centers (water-free cooling systems and power protection monitoring).
*   **Automotive Manufacturers:** AUDI (energy meters and IoT energy management).
*   **Cabinet Builders & OEMs:** Tobol GmbH (custom control cabinets).
*   **EV Infrastructure Operators:** Municipal charging network operators and commercial fleet managers.

### 6.2 Value Chain & Distribution Channels
*   **Sales Model:** Sells through 47 own sales companies and 30 sales partners worldwide.
*   **Distributor-First Hardware Sales:** Directs standard components (terminal blocks, relays, power supplies) through industrial distributors.
*   **Supplier Portal:** Manages supplier relationships via supplierportal.phoenixcontact.com.

### 6.3 Tetrel Engagement Strategy

#### Priority Score: ★★★★☆ (4/5) — High Priority Target

**Targeting Rationale:**
1.  **CRA & NIS2 supply Chain Gaps:** Phoenix Contact lacks a public Software Bill of Materials (SBOM) repository, which is a barrier for EU clients complying with NIS2 and preparing for CRA.
2.  **Information Security Governance Gap:** The lack of public ISO 27001 or SOC 2 certifications is an obstacle when bidding for enterprise data center projects.
3.  **Active Vulnerability Vulnerabilities:** The April 2025 Quint4-UPS unpatched vulnerabilities and July 2025 CHARX EV controller vulnerabilities create immediate demand for secure architecture consulting.

#### Recommended Outreach Sequence
*   **Week 1:** Contact Frank Possel-Dölken (CDO) via LinkedIn. Highlight the lack of public ISO 27001/SOC 2 certifications and how it affects supply chain qualification with enterprise data center operators.
*   **Week 2:** Send a technical brief to the PSIRT team (psirt@phoenixcontact.com) detailing the unpatched Modbus vulnerabilities in the Quint4-UPS line and offering a secure code review program.
*   **Week 3:** Offer a 2-hour paid Scoping Clinic to the e-mobility engineering team to evaluate secure development lifecycles (IEC 62443-4-1) and automated patch verification.
*   **Week 4:** Present a proposal for a complete SBOM Program and firmware security baseline.

#### Proposed Service Packages

| Service Package | Scope | Price (CAD) | Timeline |
|---|---|---|---|
| **CRA Portfolio Classification** | Map PLCnext and CHARX controllers to CRA class requirements | $60,000 | 4 weeks |
| **Secure SDLC GAP Analysis** | Assess R&D processes against IEC 62443-4-1 ML3 standards | $85,000 | 6 weeks |
| **Firmware SBOM Automation** | Automate CycloneDX SBOM generation for power and controller lines | $115,000 | 8 weeks |
| **HMI/SCADA Code Audit** | Secure code audit of PLCnext and web panels to prevent injection | $90,000 | 6 weeks |
| **Full Compliance Package** | Secure development, automated SBOM, and CRA readiness | $285,000 | 16 weeks |

---

### 6.4 Sources & Citations
1.  Phoenix Contact. (2025). *The Phoenix Contact Group: Company Profile and History*. Blomberg, Germany. https://www.phoenixcontact.com
2.  TÜV Rheinland. (2025, April 15). *TÜV Rheinland recertifies Phoenix Contact to IEC 62443-4-1 Maturity Level 3* [Certificate database]. https://www.certipedia.com
3.  CyberDanube. (2025, April 20). *Security Advisory: Multiple Vulnerabilities in Phoenix Contact USV QUINT4-UPS*. https://cyberdanube.com/security-research/multiple-vulnerabilities-in-phoenix-contact-usv-quint4-ups/
4.  CISA. (2025). *ICS Advisories — Phoenix Contact* [Vulnerability database]. Cybersecurity and Infrastructure Security Agency. https://www.cisa.gov/ics-advisories
5.  Phoenix Contact. (2025, July 10). *PCSA-2024-00018: Security Advisory for CHARX SEC-3xxx Controllers*. VDE-2025-054. https://assets.phoenixcontact.com
6.  European Commission. (2024). *Regulation on horizontal cybersecurity requirements for products with digital elements (Cyber Resilience Act)*. Official Journal of the European Union. https://eur-lex.europa.eu

---
*END OF PROFILE — PHOENIX CONTACT — 6 PAGES*
*Total Sources: 6 verified citations | Last Updated: 2026-06-07*
*Profile generated using Valyu Search API, corporate disclosures, CISA ICS Advisory Database, and partner press releases.*
