# ORGANIZATIONAL INTELLIGENCE PROFILE
## Johnson Controls International plc —   Prospect Research Dossier
 
**Profile Version:** 1.0 | **Research Date:** 2026-06-07 | **Next Review:** 2026-09-01
**Profile Pages:** 6 | **Analyst:** AI Research Engine v1.0 (Valyu + SEC filings + NVD + CISA)
**OXOT Services Applicable:** CRA Readiness Assessment · NIS2 Supply Chain Compliance Audit · SBOM Program Development

---

## PAGE 1 OF 6: COMPANY OVERVIEW & CORPORATE STRUCTURE

### 1.1 Legal Identity

| Field | Data | Source |
|---|---|---|
| **Full Legal Name** | Johnson Controls International plc | SEC Form 10-K |
| **Legal Form** | Public Limited Company (plc) — Irish domicile | SEC Form 10-K |
| **Stock Exchange** | NYSE | Ticker: JCI |
| **Registered Office** | One Albert Quay, Cork, T12 X8N6, Ireland | SEC filings |
| **Operational HQ** | 5757 N Green Bay Ave, Glendale, Wisconsin 53209, USA | Corporate website |
| **Founded** | January 1, 1885 (Warren S. Johnson) | History registry |
| **CEO** | Joakim Weidemanis (since March 2025) | Press release |
| **Employees (Global)** | ~87,000 | FY2025 10-K |
| **Website** | https://www.johnsoncontrols.com | — |
| **Data Center Division** | https://www.johnsoncontrols.com/industries/data-centers | — |
| **PSIRT / Security Advisories** | https://www.johnsoncontrols.com/trust-center/cybersecurity/security-advisories | Verified |

### 1.2 Financial Performance (FY2025)

| Metric | Value | Notes |
|---|---|---|
| **Total Revenue** | $23.6B | Fiscal year ended September 30, 2025 |
| **Operating Income** | $2.28B | 9.7% operating margin |
| **Net Income** | $3.29B | 13.9% net margin |
| **Total Assets** | $37.9B | Per balance sheet |
| **Total Equity** | $12.9B | Shareholders' equity |
| **Market Capitalization** | $87.64B | As of June 5, 2026 ($143.65 per share) |
| **Debt-to-Equity Ratio** | 2.94x | Leveraged structure following Tyco merger |

*Source: Johnson Controls International plc. (2025). SEC Form 10-K for the fiscal year ended September 30, 2025.*

### 1.3 Business Segments

| Segment | Focus | Data Center Relevance |
|---|---|---|
| **Building Solutions North America** | System installation, service, and integration in NA | Primary (Metasys, fire, security deployment) |
| **Building Solutions EMEA/LA** | System installation and service in Europe/Latin America | High (EU CRA and NIS2 regulatory exposure) |
| **Building Solutions Asia Pacific** | Installation and service across APAC markets | Medium (regional data center growth) |
| **Global Products** | HVAC equipment, industrial refrigeration, fire, security | Primary (York, Silent-Aire, Simplex, C•CURE) |

### 1.4 Global Footprint & Acquisitions

*   **Manufacturing and Operations:** Approximately 2,000 locations across more than 150 countries.
*   **Data Center Manufacturing:** Wuxi, China (York centrifugal chiller manufacturing); Norman, Oklahoma (Rooftop HVAC units); Edmonton, Alberta (Silent-Aire modular data center cooling).
*   **Key Acquisitions (Data Center Focus):**
    *   2016: Tyco International (merger resulting in JCI tax domicile in Ireland).
    *   2021: Silent-Aire (acquired for $800M plus milestone payments) to expand modular data center cooling and power infrastructure.

---

## PAGE 2 OF 6: FULL PRODUCT PORTFOLIO — DATA CENTER DIVISION

### 2.1 Building Automation & Control Systems (BAS)

| Product Family | Version / Model | Network Interface | Supported Protocols | Target Market |
|---|---|---|---|---|
| **Metasys BAS** | Version 15.0 | Ethernet | BACnet/IP, BACnet/SC, Modbus TCP, N2, LonWorks | Enterprise data centers, healthcare, campuses |
| **Metasys BAS** | Version 14.x | Ethernet | BACnet/IP, Modbus TCP, LonWorks, N2 | Mid-market facilities, regional portfolios |
| **Facility Explorer** | FX90, F4-CGE09090-0, F4-CGE04060-0 | Ethernet / RS-485 | BACnet/IP, Modbus TCP, BACnet MS/TP | Configurable mid-market commercial buildings |
| **EasyIO** | FC-20, FS-32, FW-8V, FW-VAV | Ethernet / Wi-Fi | BACnet/IP, Modbus TCP, MQTT, REST | IoT-native commercial buildings, retrofits |

### 2.2 Physical Security & Video Management

| Product Family | Type | Network Interface | Integration Capabilities | Market Positioning |
|---|---|---|---|---|
| **C•CURE IQ** | Access Control (v3.2) | IP Controller | Microsoft Entra ID, Okta, API-first | Enterprise identity-centric access control |
| **Kantech EntraPass** | Access Control (v9.10) | IP Controller | Microsoft Entra ID, Okta | Mid-to-large commercial access security |
| **exacqVision** | Video Management (v26.0) | IP Video Server | Illustra cameras, AI analytics | Enterprise video surveillance |
| **Illustra Cameras** | Multisensor, Panoramic, Varifocal | IP Camera | ONVIF, RTSP, exacqVision | High-definition perimeter monitoring |
| **DSC PowerSeries Neo** | Intrusion Detection (v5.0) | Wireless (PowerG+) | DSC ecosystem integration | Light commercial intrusion security |

### 2.3 Thermal Management & Industrial HVAC

| Brand / Product | Function | Deployment Model | Data Center Capacity |
|---|---|---|---|
| **York Centrifugal Chillers** | Large-scale chiller cooling | Centrifugal water-cooled | 1 MW to 10 MW+ data centers |
| **Silent-Aire Cooling Systems** | Modular cooling and air handlers | Direct expansion / chilled water | 500 kW to 10 MW custom hyperscale |
| **York CRAC / CRAH Units** | Precision computer room cooling | Row / perimeter containment | Mid-to-large enterprise data centers |
| **York Absorption Chillers** | Low-electrical input chillers | Thermal waste-heat driven | 2 MW cooling per 20 kW electrical |
| **Frick Industrial Chillers** | Heavy refrigeration and cooling | Industrial ammonia / halocarbon | Industrial process and large facilities |

### 2.4 Fire Protection & Life Safety

*   **Simplex:** IP-connected fire alarm control panels and addressable notification systems.
*   **Zettler / FireClass:** Commercial fire detection and alarming systems for international markets.
*   **Aquamist:** Water mist fire suppression systems (designed for low water consumption in critical equipment spaces).

---

## PAGE 3 OF 6: OT SECURITY ANALYSIS & REGULATORY EXPOSURE

### 3.1 Cybersecurity Certification Status

| Product Line | ISO 27001 | SOC 2 Type II | ISASecure SDLA / CSA | IEC 62443-4-2 |
|---|---|---|---|---|
| **Metasys BAS** | Claimed | No | SDLA (Development Process) | No confirmed product cert |
| **Facility Explorer** | No | No | No | No confirmed product cert |
| **EasyIO Controllers** | No | No | No | No |
| **C•CURE IQ** | Yes | Yes | Yes (Access Control Core) | Generic claims only |
| **exacqVision VMS** | Yes | Yes | Yes | Generic claims only |
| **Simplex Fire Panels** | No | No | No | No |

**Security Program Gap:** While Johnson Controls holds organizational certifications (ISO 27001, SOC 2 for cloud systems, and ISASecure SDLA for development lifecycles), individual product certifications to IEC 62443-4-2 remain unpublished. This creates a supply chain validation gap for customers in regulated sectors.

### 3.2 EU Cyber Resilience Act (CRA) Exposure

Under CRA Article 3(1), the following Johnson Controls systems qualify as products with digital elements:

1.  **Metasys Network Engines (SNE/SNC):** Class II status likely due to operational control of critical building functions.
2.  **C•CURE Access Controllers:** Class II status due to physical access control and identity integration.
3.  **exacqVision Video Servers:** Class I status.
4.  **EasyIO IoT Controllers:** Class I/II status depending on deployment environment.

**turnover Penalty Risk:** Failure to comply with CRA vulnerability disclosure or safety-by-design requirements carries a maximum penalty of 2.5% of global annual turnover, amounting to approximately $590 million based on FY2025 revenue.

### 3.3 NIS2 supply Chain Obligations

Johnson Controls operates as a critical supplier to organizations in essential sectors (healthcare, energy, transport, and drinking water). Under the NIS2 Directive (effective October 2024 with full enforcement by November 2026), these customers must audit their supply chains. Johnson Controls must provide:

*   Verified Software Bill of Materials (SBOM) for all firmware.
*   Documented vulnerability handling policies.
*   IEC 62443-4-1 compliant secure software development evidence.

### 3.4 Publicly Disclosed Vulnerabilities (Last 36 Months)

*   **Metasys BAS Critical Vulnerability (2024):** A remote code execution vulnerability (CVSS 10.0) allowed unauthorized network-based attackers to compromise Metasys application servers. Patches were released in Metasys 15.0 and late 14.x updates.
*   **C•CURE 9000 Access Control Vulnerability (2023):** Authentication bypass vulnerability allowing unauthorized users to modify reader configurations.
*   **Tripp Lite SNMPWEBCARD (2023):** Remote code execution vulnerability (CVSS 9.8) affecting legacy card models (CVE-2023-43090).

### 3.5 Software Bill of Materials (SBOM) Status

*   **Current Status:** No public SBOM repository or portal is available.
*   **Access Protocol:** Customers must submit individual requests to productsecurity@jci.com to obtain SBOMs for specific hardware/firmware versions. This manual process slows down sales qualification for regulated accounts.

---

## PAGE 4 OF 6: STRATEGIC CONTEXT & GROWTH SIGNALS

### 4.1 Data Center Market Expansion

Data centers are the fastest-growing sector for Johnson Controls:

*   **Dedicated Division:** In June 2024, the company established the Global Data Center Solutions organization to combine HVAC, fire, security, and building controls into a single sales motion.
*   **Order Backlog:** Order volume in the data center division grew significantly in H1 FY2024, exceeding the total volume of FY2023. This growth was driven by the deployment of AI computing clusters.
*   **Modular Infrastructure:** The integration of Silent-Aire allows Johnson Controls to sell pre-packaged modular units to hyperscalers, bypassing traditional onsite construction timelines.

### 4.2 Competitive Position

| Product Segment | Market Position | Key Competitors | Strategic Advantage |
|---|---|---|---|
| **Building Automation** | Tier 1 (Global) | Schneider Electric, Siemens, Honeywell | Large installed base in healthcare and corporate campuses |
| **Data Center Cooling** | Tier 2 | Vertiv, Stulz, Munters | Silent-Aire modular packaging and York absorption chillers |
| **Physical Security** | Tier 1 | HID Global, Bosch Security, Genetec | Enterprise scale of C•CURE and exacqVision |
| **Fire Protection** | Tier 1 | Honeywell, Carrier, Siemens | Simplex brand dominance in North American markets |

### 4.3 R&D & Innovation Initiatives

*   **AI Cooling Architecture:** Developing liquid-to-air cooling systems and absorption chillers that use waste heat to run chillers, reducing energy draw.
*   **BACnet Secure Connect:** Standardizing BACnet/SC across the Metasys 15.0 line to encrypt internal building communications.
*   **OpenBlue Cloud Integration:** Connecting building systems to Azure/GCP/AWS clouds for predictive maintenance, requiring cybersecurity boundary validations.

---

## PAGE 5 OF 6: KEY PERSONNEL & ORGANIZATIONAL STRUCTURE

### 5.1 Executive Leadership

| Name | Title | Operational Focus | LinkedIn Profile |
|---|---|---|---|
| **Joakim Weidemanis** | Chairman & CEO | Global strategy, digital services, public market relations | https://www.linkedin.com/in/joakim-weidemanis-30a4986 |
| **Marc Vandiepenbeeck** | EVP & CFO | Finance, capital allocation, investor relations | — |
| **John Donofrio** | EVP, General Counsel | Legal affairs, corporate compliance, risk management | — |
| **Vijay Sankaran** | VP, Chief Digital & Info Officer | IT infrastructure, cloud operations, business systems | — |
| **Todd Grabowski** | VP, President Global Data Center Solutions | Dedicated business unit for hyperscale and colocation accounts | — |
| **Aaron Lewis** | CCO, Global Data Center Solutions | Commercial and sales lead for data center clients | — |

### 5.2 Cybersecurity & Product Security Leadership

| Name | Title | Scope of Responsibility | Location |
|---|---|---|---|
| **David Ginn** | Global CISO | Enterprise IT security, corporate network defense | Keller, Texas, USA |
| **Jason Christman** | VP, Chief Product Security Officer | Product security, PSIRT, IEC 62443 compliance | Philadelphia, Pennsylvania, USA |

*Note: The CISO handles enterprise networks, while the CPSO leads product security and coordinates vulnerability disclosures via productsecurity@jci.com.*

### 5.3 Industry Memberships & Partnerships

*   **ISA Security Compliance Institute (ISCI):** Active member participating in ISASecure certification updates.
*   **Nozomi Networks Partnership:** JCI holds an investment in Nozomi Networks. The company integrates Nozomi OT security tools with building automation systems to monitor operational networks.
*   **Open Compute Project (OCP):** Participates in power and cooling subgroups for standardized data center server architectures.

---

## PAGE 6 OF 6: CUSTOMERS, VALUE CHAIN & TETREL ENGAGEMENT PLAN

### 6.1 Primary Customer Segments

*   **Hyperscale Cloud Operators:** AWS, Microsoft Azure, Google Cloud (packaged Silent-Aire modular cooling and York chillers).
*   **Colocation Providers:** Equinix, Digital Realty, QTS, Vantage Data Centers (York centrifugal chillers, Metasys BAS, C•CURE access control).
*   **Healthcare Systems:** University medical centers and regional hospitals (Simplex fire systems and Metasys BAS).
*   **Federal Government:** US Department of Defense, General Services Administration (Nozomi-integrated facility control systems).

### 6.2 Value Chain & Distribution Channels

*   **Component Suppliers:** Semiconductor manufacturers (Infineon, ON Semi), copper and raw metal suppliers, industrial valve manufacturers.
*   **System Integrators:** Mechanical contractors and building controls integrators (deploying Metasys and Facility Explorer).
*   **Distribution Partners:** Electrical and IT distributors (Anixter, Graybar, WESCO) handling security hardware and low-voltage cabling.
*   **Certification Bodies:** Underwriters Laboratories (UL) and TÜV Rheinland for product testing and compliance validation.

### 6.3 Tetrel Engagement Strategy

#### Priority Score: ★★★★★ (5/5) — High Priority Target

**Targeting Rationale:**
1.  **Massive Regulatory Exposure:** Johnson Controls has thousands of connected products in scope for EU CRA (effective 2026) and NIS2 (effective November 2026), but lacks public IEC 62443-4-2 product certifications.
2.  **No Public SBOM Portal:** Manual processing of SBOM requests (via productsecurity@jci.com) delays sales qualification for government and regulated accounts.
3.  **Active Security Risks:** Recent CVSS 10.0 vulnerabilities in Metasys show that building automation systems are primary targets, increasing buyer urgency.
4.  **Nozomi Partnership Validation:** The Nozomi relationship proves JCI is willing to invest in external security partnerships to satisfy enterprise clients.

#### Recommended Outreach Sequence

*   **Week 1:** Initial contact with Jason Christman (CPSO) via LinkedIn. Focus on the lack of public SBOM portals and the impact on sales cycles in regulated markets.
*   **Week 2:** Send a technical brief to the Global Data Center Solutions team (Todd Grabowski and Aaron Lewis) detailing NIS2 supply chain compliance gaps for hyperscale clients.
*   **Week 3:** Offer a 2-hour paid Scoping Clinic to map the CRA classification (Class I vs Class II) for the Metasys and EasyIO controller portfolios.
*   **Week 4:** Present a proposal for a complete SBOM Program and firmware pipeline integration.

#### Proposed Service Packages

| Service Package | Scope | Price (CAD) | Timeline |
|---|---|---|---|
| **CRA Portfolio Classification** | Map Metasys, Facility Explorer, and EasyIO to CRA classes | $65,000 | 4 weeks |
| **NIS2 Supply Chain Audit Prep** | Create compliance documentation package for JCI sales reps | $75,000 | 6 weeks |
| **Firmware SBOM Pipeline Integration** | Automate CycloneDX SBOM generation for Global Products division | $120,000 | 8 weeks |
| **IEC 62443-4-2 Gap Assessment** | Pre-certification review of EasyIO IoT controllers | $85,000 | 6 weeks |
| **Full Compliance Package** | CRA, NIS2, and SBOM integration across three divisions | $295,000 | 18 weeks |

---

### 6.4 Sources & Citations

1.  Johnson Controls International plc. (2025). *Form 10-K for the Fiscal Year Ended September 30, 2025*. SEC EDGAR. https://www.sec.gov
2.  Johnson Controls. (2024, June 5). *Johnson Controls forms Data Center Solutions organization to meet growing demand* [Press release]. https://www.johnsoncontrols.com/media-center/news/press-releases/2024/06/05/johnson-controls-forms-data-center-solutions-organization-to-meet-growing-demand
3.  ISA Security Compliance Institute. (2022). *Johnson Controls joins ISA Security Compliance Institute* [Press release]. https://isasecure.org/news-events/johnson-controls-joins-isa-security-compliance-ins
4.  Johnson Controls. (2026, March 23). *Next-generation enterprise and commercial access control and video solutions at ISC West 2026* [Press release]. https://www.johnsoncontrols.com/media-center/news/press-releases/2026/03/23/next-generation-access-control-video-solutions-at-isc-west-2026
5.  CISA. (2024). *ICS Advisories — Johnson Controls* [Vulnerability database]. Cybersecurity and Infrastructure Security Agency. https://www.cisa.gov/ics-advisories
6.  Forbes. (2026). *Johnson Controls (JCI) Company Profile*. Forbes Global 2000. https://www.forbes.com/companies/johnson-controls/
7.  Nozomi Networks. (2021). *Nozomi Networks announces investment from Johnson Controls to expand OT cybersecurity* [Press release]. https://www.nozominetworks.com

---
*END OF PROFILE — JOHNSON CONTROLS INTERNATIONAL PLC — 6 PAGES*
*Total Sources: 7 verified citations | Last Updated: 2026-06-07*
*Profile generated using Valyu Search API, JCI public press releases, product catalog, SEC EDGAR, and CISA ICS Advisory Database.*
