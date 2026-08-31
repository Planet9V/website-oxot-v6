# ORGANIZATIONAL INTELLIGENCE PROFILE
## Rockwell Automation, Inc. — Prospect Research Dossier

**Profile Version:** 1.0 | **Research Date:** 2026-06-07 | **Next Review:** 2026-09-01
**Profile Pages:** 6 | **Analyst:** AI Research Engine v1.0 (Valyu + SEC filings + CISA)
**OXOT Services Applicable:** CRA Readiness Assessment · NIS2 Supply Chain Compliance Audit · SBOM Program Development

---

## PAGE 1 OF 6: COMPANY OVERVIEW & CORPORATE STRUCTURE

### 1.1 Legal Identity

| Field | Data | Source |
|---|---|---|
| **Full Legal Name** | Rockwell Automation, Inc. | SEC Form 10-K |
| **Legal Form** | Corporation | Delaware General Corporation Law |
| **Stock Exchange** | NYSE | Ticker: ROK |
| **Primary Business HQ** | 1201 South Second Street, Milwaukee, Wisconsin 53204, USA | Corporate headquarters |
| **Founded** | December 1903 (Dr. Stanton Allen and Lynde Bradley) | Historical registry |
| **CEO & Chairman** | Blake D. Moret (CEO since 2016, Chairman since 2018) | Board announcement |
| **Employees (Global)** | ~26,500 | FY2025 SEC filings |
| **Website** | https://www.rockwellautomation.com | — |
| **Product Security (PSIRT)** | https://www.rockwellautomation.com/en-us/trust-center/product-security.html | Verified portal |

### 1.2 Financial Performance (FY2025)

| Metric | Value | Growth / Margin | Notes |
|---|---|---|---|
| **Total Revenue** | $8.34B | +1.1% YoY | Recovering from FY2024 contraction |
| **Operating Income**| $1.19B | 14.3% operating margin | Per financial statements |
| **Net Income** | $930M | 11.2% net profit margin | Per financial statements |
| **Free Cash Flow** | $1.358B | 16.3% cash flow yield | Driven by working capital improvements |
| **Total Debt** | $2.616B | — | Reduced by $252M from FY2024 |
| **Market Capitalization**| $45.12B | — | As of November 2025 |

*Source: Rockwell Automation, Inc. (2025). SEC Form 10-K for the fiscal year ended September 30, 2025. Operating margin expanded to 22.5% in Q2 FY2026.*

### 1.3 Business Segments

| Segment | Revenue Share | Focus | Data Center Relevance |
|---|---|---|---|
| **Intelligent Devices** | 45% | ControlLogix PLCs, PowerFlex drives, GuardLogix safety controllers | Primary (facility automation, power monitoring) |
| **Software & Control** | 29% | Studio 5000, FactoryTalk SCADA, Plex MES cloud services | Primary (supervisory software, data logging) |
| **Lifecycle Services** | 26% | System integration, OT security consulting, 24/7 monitoring | High (consulting, remote incident response) |

### 1.4 Global Footprint & Operations
Rockwell operates in over 100 countries across North America, Europe, Asia-Pacific, and Latin America.
*   **Manufacturing Expansion:** Announced a $2.0 billion US manufacturing expansion in November 2025, including a 1.0 million square foot greenfield facility in New Berlin, Wisconsin.
*   **Acquisitions:** Acquired Clearpath Robotics and OTTO Motors in 2023 for $600 million to expand its autonomous mobile robot division.

---

## PAGE 2 OF 6: FULL PRODUCT PORTFOLIO — DATA CENTER DIVISION

### 2.1 ControlLogix PLC Platforms

| Product Family | Model Range | RAM Capacity | Networking Interface | Security Profile |
|---|---|---|---|---|
| **ControlLogix 5580**| 1756-L81E to L85E | 3 MB to 40 MB | EtherNet/IP (built-in) | IEC 62443-4-2 SL1 Capable |
| **ControlLogix 5590**| 1756-L902TS to L980TS| Up to 80 MB | EtherNet/IP (600+ nodes) | IEC 62443-4-2 Certified |

*   **EtherNet/IP with CIP Security:** Native support for encryption and device-level authentication.
*   **Zero Trust Support:** Designed to enforce mutual authentication and continuous authorization.

### 2.2 PowerFlex Variable Frequency Drives (VFDs)

| Product Series | Voltage Class | Interface | Certification | Target Market |
|---|---|---|---|---|
| **PowerFlex 755T** | Low Voltage (<600V) | Dual EtherNet/IP | IEC 62443-4-2 SL1 | Datacenter HVAC and pump systems |
| **PowerFlex 6000T** | Medium Voltage (>600V)| EtherNet/IP | IEC 62443-4-2 SL1 | Large-scale chiller compressors |

*   **Security Validation:** Industry-first achievement of component-level security certification for VFDs.

### 2.3 FactoryTalk Industrial Software Suite
*   **FactoryTalk Optix:** Cloud-native SCADA and HMI visualization platform.
*   **FactoryTalk Historian:** Data logging and time-series telemetry storage for facility sensors.
*   **FactoryTalk Design Studio:** Automation engineering environment featuring AI-assisted code generation.
*   **FactoryTalk AssetCentre:** Device inventory management and backup repository.

### 2.4 Plex Cloud MES Platform
*   **Plex Elastic MES:** Cloud-native manufacturing execution system utilizing a microservices architecture.
*   **Plex Asset Performance Management:** Predictive maintenance and equipment health tracking.
*   **Plex Quality Management:** Quality control tracking, compliance logging, and non-conformance audits.

---

## PAGE 3 OF 6: OT SECURITY ANALYSIS & REGULATORY EXPOSURE

### 3.1 Cybersecurity Certification Status

| Product Line / Service | IEC 62443-4-1 | IEC 62443-4-2 | ISO 27001 | SOC 2 Type II |
|---|---|---|---|---|
| **ControlLogix 5590** | Maturity Level 4 | Certified (SL1) | Yes (CoE) | Yes (Cloud) |
| **PowerFlex Drives** | Maturity Level 4 | Certified (SL1) | Yes (CoE) | No |
| **FactoryTalk Optix** | Maturity Level 4 | No | Yes | Yes |
| **SecureOT Services** | Maturity Level 4 | No | Yes | Yes |

**Security Program Profile:** Rockwell maintains a leading security posture. Its product development lifecycle holds the highest maturity rating (IEC 62443-4-1 Maturity Level 4) from TÜV Rheinland. However, a public Software Bill of Materials (SBOM) repository is not currently maintained, representing a minor documentation gap.

### 3.2 EU Cyber Resilience Act (CRA) Exposure
Under CRA Article 3(1), Rockwell's products qualify as products with digital elements:
*   **ControlLogix 5590 Controllers:** Class II products due to operational control of critical infrastructure.
*   **FactoryTalk Software Suite:** Class I/II software products.
*   **Stratix Network Switches:** Class II network components.

**Penalty Exposure:** Violations of CRA compliance rules expose Rockwell to penalties up to 2.5% of global annual turnover, representing a maximum potential fine of $208 million based on FY2025 revenue.

### 3.3 NIS2 supply Chain Obligations
The NIS2 Directive (effective October 2024, enforcement beginning November 2026) impacts Rockwell on two fronts:
*   **As a Supplier:** EU customers require Rockwell to provide secure development lifecycle documentation (IEC 62443-4-1) and vulnerability tracking.
*   **As an MSSP:** Rockwell's 24/7 OT threat detection and incident response services must comply with NIS2 security and incident reporting standards.

### 3.4 Publicly Disclosed Vulnerabilities (Last 24 Months)
Rockwell coordinates vulnerability disclosures through its active PSIRT and CISA ICS advisories:
*   **CVE-2026-0220 / CVE-2026-0222 (CVSS: 8.6 / 7.5):** Vulnerabilities in CompactLogix and ControlLogix communication modules. Rockwell issued firmware patches via its PCDC portal.
*   **FactoryTalk AssetCentre Vulnerabilities (2025):** Remote code execution vulnerabilities in backup agents. Remedied through software updates.

---

## PAGE 4 OF 6: STRATEGIC CONTEXT & GROWTH SIGNALS

### 4.1 Transition to Recurring Revenue
Rockwell is shifting from transactional hardware sales to a software-as-a-service model:
*   **Annual Recurring Revenue (ARR):** Organic ARR grew 14% year-over-year, driven by cloud software (FactoryTalk Optix, Plex) and cybersecurity managed services.
*   **Higher Operating Margins:** Software and control segment operating margins reached approximately 30% to 35% in FY2025.

### 4.2 Competitive Position

| Product Segment | Market Position | Key Competitors | Strategic Advantage |
|---|---|---|---|
| **Programmable Logic Controllers**| #1 in North America (>50% share) | Siemens, Schneider Electric, Mitsubishi | Massive installed base and deep engineering integration |
| **Industrial Software (MES/SCADA)**| Tier 1 | Siemens, Aveva (Schneider), Emerson | Plex cloud integration and AI-assisted engineering tools |
| **OT Cybersecurity Services** | Tier 1 | Honeywell, Siemens, Nozomi Networks | Verve acquisition (SecureOT) and dedicated OT SOC |

### 4.3 Partnerships & Alliances
*   **Cisco Systems:** Co-developed the Converged Plantwide Ethernet (CPwE) network architecture and Stratix industrial switch family.
*   **Microsoft:** Integrated Azure OpenAI into FactoryTalk Design Studio to automate PLC code generation.
*   **NVIDIA:** Partnered in 2025 to develop physics-based digital twins and simulation models utilizing the Omniverse platform.
*   **PartnerNetwork Program:** Leverages a global network of 3,700 system integrators and 200 authorized distributors.

---

## PAGE 5 OF 6: KEY PERSONNEL & ORGANIZATIONAL STRUCTURE

### 5.1 Executive Leadership

| Name | Title | Scope of Responsibility | Prior Experience |
|---|---|---|---|
| **Blake D. Moret** | Chairman & CEO | Corporate strategy and investor relations | Rockwell COO (30-year veteran) |
| **Stephen W. Etzel** | VP & Chief Accounting Officer | Financial accounting and SEC compliance | Rockwell Corporate Controller |
| **Po Ven Yu** | CFO (effective 2026) | Global finance and capital allocation | Rockwell Finance Lead |
| **Rebecca W. House** | Senior VP, Chief People Officer | HR, legal affairs, and compliance | — |
| **Tessa Myers** | Senior VP, Intelligent Devices | Oversees PLC, VFD, and AMR product lines | — |
| **Brian Shepherd** | Senior VP, Software & Control | Leads FactoryTalk and Plex cloud software | PTC (Executive VP) |

*Note: Blake Moret has served as CEO since 2016 and Chairman since 2018. He holds a mechanical engineering degree from Georgia Tech.*

### 5.2 Cybersecurity & Product Security Leadership

| Name | Title | Scope of Responsibility | Location |
|---|---|---|---|
| **Nicole Darden Creamer**| VP & Chief Information Security Officer | Enterprise IT security and corporate networks | Cleveland, Ohio, USA |
| **Tony Baker** | VP & Chief Product Security Officer | Product security, PSIRT, and IEC 62443 compliance | Cleveland, Ohio, USA |

*Note: Tony Baker's product security organization is responsible for coordinating vulnerability disclosures and managing relations with CISA and external security researchers.*

---

## PAGE 6 OF 6: CUSTOMERS, VALUE CHAIN & TETREL ENGAGEMENT PLAN

### 6.1 Primary Customer Segments
*   **Hyperscale Data Center Operators:** AWS, Microsoft Azure, and Google Cloud Platform (HVAC controls, electrical distribution switchgear monitoring).
*   **Automotive OEMs:** Ford, General Motors, and Toyota (Plex MES, servo drives, and robotic cell control).
*   **Life Sciences & Pharmaceutical:** Pfizer and Eli Lilly (FactoryTalk PharmaSuite and pre-validated SCADA systems).
*   **Consumer Packaged Goods (CPG):** Procter & Gamble and Coca-Cola (Historian data logging, motor control).

### 6.2 Value Chain & Distribution Channels
*   **Authorized Distributor Program:** Exclusively routes hardware sales through regional authorized distributors (such as Werner Electric, Graybar, and WESCO).
*   **OEM Partner Program:** Bundles Rockwell controllers and drives into third-party machinery.
*   **System Integrator Network:** Certifies external engineering firms to deploy FactoryTalk and ControlLogix systems.

### 6.3 Tetrel Engagement Strategy

#### Priority Score: ★★★☆☆ (3/5) — Medium Priority Target

**Targeting Rationale:**
1.  **Mature Security Baseline:** Rockwell already holds comprehensive IEC 62443 certifications, making standard secure development consulting less urgent.
2.  **Product Security Leadership:** The Verve acquisition (SecureOT) and dedicated OT SOC mean Rockwell competes in the OT security services market, rather than just procuring security services.
3.  **SBOM & Supply Chain Opportunity:** A key entry point is helping Rockwell automate machine-readable SBOM generation and compliance verification under emerging EU CRA rules.

#### Recommended Outreach Sequence
*   **Week 1:** Contact Tony Baker (CPSO) via LinkedIn. Reference Rockwell's IEC 62443-4-1 ML4 status and propose an automated SBOM generation program to streamline compliance for the ControlLogix 5590 platform.
*   **Week 2:** Send a technical brief to the Software & Control business unit (Brian Shepherd) outlining EU CRA requirements for automated vulnerability disclosure.
*   **Week 3:** Offer a scoping session on integrating CycloneDX SBOM formats into the FactoryTalk Optix design workspace.
*   **Week 4:** Present a proposal for a customized SBOM supply chain audit system.

#### Proposed Service Packages

| Service Package | Scope | Price (CAD) | Timeline |
|---|---|---|---|
| **CRA Supply Chain Classification** | Map third-party libraries in FactoryTalk Optix to CRA requirements | $75,000 | 4 weeks |
| **SBOM Pipeline Automation** | Integrate automated CycloneDX SBOM generation into Plex platforms | $115,000 | 8 weeks |
| **Regulatory Advisory Services** | Advise product teams on CRA compliance deadlines and ENISA reporting | $60,000 | 4 weeks |

---

### 6.4 Sources & Citations
1.  Rockwell Automation, Inc. (2025). *Form 10-K for the Fiscal Year Ended September 30, 2025*. SEC EDGAR. https://www.sec.gov
2.  Rockwell Automation. (2025, February 27). *Rockwell Automation obtains cybersecurity certifications for low and medium voltage VFDs* [Press release]. https://www.rockwellautomation.com/en-us/company/news/press-releases/cybersecurity-certs-VFDs.html
3.  TÜV Rheinland. (2023, June 12). *TÜV Rheinland certifies Rockwell Automation to IEC 62443-4-1 Maturity Level 4* [Certificate database]. https://www.certipedia.com
4.  CISA. (2026). *ICS Advisories — Rockwell Automation* [Vulnerability database]. Cybersecurity and Infrastructure Security Agency. https://www.cisa.gov/ics-advisories
5.  ABI Research. (2025). *SCADA/HMI Competitive Assessment: Vendor Rankings*. https://www.abiresearch.com
6.  Rockwell Automation. (2026, May 5). *Rockwell Automation reports second quarter fiscal 2026 results* [Press release]. https://www.rockwellautomation.com/en-us/company/news/press-releases/Rockwell-Automation-Reports-Second-Quarter-2026-Results.html

---
*END OF PROFILE — ROCKWELL AUTOMATION, INC. — 6 PAGES*
*Total Sources: 6 verified citations | Last Updated: 2026-06-07*
*Profile generated using Valyu Search API, SEC filings, CISA ICS Advisory Database, and partner press releases.*
