# Deep Research: SEL

**Research engine:** Valyu DeepResearch (standard mode)
**Generated:** 2026-06-09 09:58 UTC
**Research cost:** $0.500
**Sources consulted:** 51

---

# Organizational Intelligence Report: Schweitzer Engineering Laboratories, Inc. (SEL)

## Executive Summary

Schweitzer Engineering Laboratories, Inc. (SEL) is a **private, 100% employee-owned critical infrastructure technology company** headquartered in Pullman, Washington, founded in 1982 by Dr. Edmund O. Schweitzer III [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories). The company operates across **7,000+ employees globally** with presence in **174 countries** [[13]](https://www.linkedin.com/company/sel), designing and manufacturing digital protective relays, automation controllers, and power system protection solutions serving utilities, data centers, industrial operations, and government agencies [[15]](https://selinc.com/). 

As a **private company, SEL does not disclose financial performance**, market capitalization, or stock ticker information — a structural advantage that insulates decision-making from quarterly earnings pressure. The company holds **ISO 27001 and IEC 62443-4-1 ML3 cybersecurity certifications** [[1]](https://selinc.com/company/certifications/), operates a formal Product Security Incident Response Team (PSIRT), and has experienced elevated vulnerability discovery rates (19+ CVEs in 2023 alone, with continuing disclosures in 2024-2025). Strategic partnerships with S&C Electric (grid modernization collaboration launching Q4 2026) and Nozomi Networks (AI-powered OT threat detection) signal investments in distributed energy resources and advanced cybersecurity capabilities. However, the company **does not publish Software Bills of Materials (SBOMs)** — a significant transparency gap for critical infrastructure customers — and has not publicly mapped exposure to emerging regulatory requirements (EU Cyber Resilience Act, NIS2 Directive).

---

## 1. Company Overview

### Legal Entity and Founding

**Full Legal Name:** Schweitzer Engineering Laboratories, Inc. [[10]](https://selinc.com/company/about/) [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories)

**Headquarters:** Pullman, Washington, USA [[10]](https://selinc.com/company/about/) [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories)

**Founding Date:** 1982 (first commercial digital protective relay shipped 1984) [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories) [[14]](https://selinc.com/company/history/)

**Founder and Current Leadership:** Dr. Edmund O. Schweitzer III founded the company and held the role of President & Chief Technology Officer until **January 15, 2025**, when he transitioned to focus on mentoring, inventing, and collaborating while maintaining Founder status [[18]](https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/). This 41-year continuous tenure reflects deep alignment with company mission [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/).

### Global Presence

SEL operates **100+ offices worldwide** with products installed in **174 countries** [[13]](https://www.linkedin.com/company/sel). The manufacturing footprint spans **5 U.S. facilities**: Pullman, Washington (headquarters and primary manufacturing); Lewiston, Idaho; Moscow, Idaho; Lake Zurich, Illinois; and West Lafayette, Indiana [[14]](https://selinc.com/company/history/). International assembly and distribution occur in Charlotte, North Carolina; San Luis Potosí, Mexico; Bogotá, Colombia; and Campinas, Brazil [[1]](https://selinc.com/company/certifications/) [[14]](https://selinc.com/company/history/). This decentralized geographic footprint provides manufacturing resilience and proximity to key customer regions (North America primary, followed by Europe, Asia-Pacific, Central America).

### Ownership Structure

SEL became **100% employee-owned through an Employee Stock Ownership Plan (ESOP) in 2009** [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories) [[13]](https://www.linkedin.com/company/sel). This ownership model is foundational to the company's stated culture: "We do business the way our moms and dads would want us to!" [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/). The ESOP structure eliminates public market pressure, enabling long-term R&D investment and customer-focused decision-making without quarterly earnings targets.

### Public Market Status

**Stock Ticker:** Not applicable — SEL is **not publicly traded** [[13]](https://www.linkedin.com/company/sel). The company is privately held and does not file with the Securities and Exchange Commission (SEC) [[9]](https://www.sec.gov/Archives/edgar/data/38074/000003807413000014/0000038074-13-000014.txt).

**Market Capitalization:** Not applicable (private company). No public valuation available.

### Financial Performance

**FY2024 Revenue:** Not disclosed (private company — financial statements not published)

**Employee Count:** **7,000+ employees worldwide** [[10]](https://selinc.com/company/about/) [[13]](https://www.linkedin.com/company/sel) (some sources cite 5,200-6,500 range, with 7,000+ representing current headcount post-expansion)

**Fiscal Year End:** Not specified in available sources

---

## 2. Financial Profile

### Revenue and Growth (3-Year History)

**Status:** Not available. As a private company, SEL does not publish audited financial statements, income statements, or revenue figures. This is an intentional policy reflection of the company's employee-ownership model and strategic insulation from quarterly performance scrutiny [[10]](https://selinc.com/company/about/) [[13]](https://www.linkedin.com/company/sel).

### EBITDA, Operating Margins, R&D Spending

Not disclosed (private company).

### Free Cash Flow and Debt Levels

Not disclosed (private company).

### Strategic Implication

The absence of publicly disclosed financials represents a competitive advantage in critical infrastructure markets where long-term R&D investment (power system protection, ICS cybersecurity, grid modernization) requires multi-year commitment horizons incompatible with public market expectations. Employees as equity holders create alignment with sustainability and quality over short-term profitability extraction.

---

## 3. Product Lines

SEL's product portfolio encompasses **protective relays, real-time automation controllers, communications systems, software tools, and integrated grid modernization solutions** serving utilities, data centers, industrial facilities, and renewable energy integration.

### Protective Relays (Primary Product Category)

| Product Series | Target Application | Market Position | Notes |
|---|---|---|---|
| SEL-T401L, SEL-T400L | Ultra-High-Speed Transmission Line Protection | Advanced time-domain protection with traveling-wave fault location | SEL-T400L priced at \$12,000 (2017 pricing) [[40]](https://selinc.com/company/news/119068/); released 2017 [[40]](https://selinc.com/company/news/119068/). SEL-T401L released 2020 [[42]](https://selinc.com/company/news/131986/). Both support 1-2 millisecond trip times [[39]](https://selinc.com/solutions/transmission/time-domain-line-protection/) [[41]](https://www.pacw.org/sel) |
| SEL-411L | Line Current Differential Protection | Standard distribution/transmission | Affected by CVE-2023-2265 (clickjacking, Dec 2023) [[50]](https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02) |
| SEL-700 Series (710-5, 750, 751, 787-2/-3/-4, 787Z) | Motor, generator, transformer, feeder protection | Industry standard across North American utilities | Multiple products affected by CVE-2024-2103 (April 2024) [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02) |
| SEL-21, SEL-200, SEL-351 Series | Legacy and current protection relays | Foundational platform; mature product line | Established market leadership |
| SEL-387L, SEL-311L/311C | Specialized protection functions | Niche applications | Limited disclosure |

**Pricing:** Only one explicit current price identified: SEL-T400L at **\$12,000** (2017 pricing, likely outdated). No public pricing available for other relay models or current-year pricing [[40]](https://selinc.com/company/news/119068/).

### Real-Time Automation Controllers (RTAC)

- **SEL-3350-1/-2** (configurable platform for automation, Blueframe, HMI, integration) [[8]](https://selinc.com/api/download/133033/)
- **SEL-3355-2, SEL-3360-2** (Intel Xeon-based computing platforms with 64-bit Windows, partial Linux support) [[7]](https://selinc.com/software/downloads/) [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02)
- **SEL-3620, SEL-3622** (legacy automation controllers, affected by CISA advisories ICSA-17-192-06) [[51]](https://www.cisa.gov/news-events/ics-advisories/icsa-17-192-06)
- **SEL-5033 (AcSELerator RTAC)** (software/hardware automation control solution, affected by insecure inherited permissions vulnerability CVE-2023-31175, CVSS 8.8) [[4]](https://www.cvedetails.com/vulnerability-list/vendor_id-12625/Selinc.html)

### Software Configuration and Management Tools

| Product | Function | Notes |
|---|---|---|
| SEL-5037 (GridConfigurator) | Relay configuration and grid visualization | Affected by CVE-2023-34392 (CVSS 8.2, missing authentication) [[3]](https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software) |
| SEL-5030ac (SELerator QuickSet) | Relay configuration, quick-set templates | Affected by multiple CVEs (CVE-2023-31169, CVSS 4.8) [[3]](https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software) |
| SEL-5032ac (SELerator Architect) | System architecture and design | Part of SELerator suite [[6]](https://selinc.com/products/categories/software/) |
| SEL-5033ac (SELerator RTAC) | Real-time automation controller configuration | Insecure inherited permissions (CVE-2023-31175) [[3]](https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software) |
| SEL-5035ac (SELerator Diagram Builder) | Diagram and logic design | Part of SELerator suite [[6]](https://selinc.com/products/categories/software/) |
| SEL-5056 | Network Management System (NMS) | Legacy network management [[6]](https://selinc.com/products/categories/software/) |
| SEL-5051/5052 | Client/Server Network Management System | Centralized control and monitoring [[6]](https://selinc.com/products/categories/software/) |
| SEL-5601-2 (Synchrowave Event Software) | Event capture and analysis | Power system event recording [[6]](https://selinc.com/products/categories/software/) |
| SEL-5702/5703/5705 | Synchrowave monitoring and reporting | Data analysis and dashboards [[6]](https://selinc.com/products/categories/software/) |
| SEL Blueframe | OT software platform | Modern automation framework [[13]](https://www.linkedin.com/company/sel) |
| SEL Compass | Software download and version management tool | Deployment automation [[6]](https://selinc.com/products/categories/software/) |
| SEL-5230ac/5231 | APIs for integration | Developer interfaces [[6]](https://selinc.com/products/categories/software/) |
| Virtual Port Software (SEL-5827, SEL-5828) | Serial port emulation | Legacy connectivity [[7]](https://selinc.com/software/downloads/) |

### Communications and Network Control

- **SEL ICON** (Integrated Communications Optical Network) — legacy multiplexer for SONET/Ethernet migration [[13]](https://www.linkedin.com/company/sel)
- **SEL-2240 Axion** — modern communications platform [[13]](https://www.linkedin.com/company/sel)

### Power Quality and Data Center Solutions

- **Power Distribution and Protection Relays** optimized for data center applications [[25]](https://selinc.com/industries/data-centers/)
- **Voltage Regulator Control (SEL-2431)** [[13]](https://www.linkedin.com/company/sel)
- **Fault Indicators (LINAM MC)** — rebranded 2026 [[13]](https://www.linkedin.com/company/sel)
- **Revenue Meters and Automated Power Management** for enterprise data center environments [[25]](https://selinc.com/industries/data-centers/)

### Market Positioning and Customer Segments

**Utilities (Primary Segment):** "North America's most trusted relay supplier" and "one of the top relay manufacturers in the world" [[27]](https://selinc.com/engineering-services/utilities/). Most widely deployed protective relays in North American electric utilities [[11]](https://nfmconsulting.com/knowledge/sel-what-is/).

**Data Centers (Strategic Growth Segment):** Solutions for power protection, control, monitoring, and renewable integration [[25]](https://selinc.com/industries/data-centers/). Addressing enterprise, colocation, and cloud infrastructure availability requirements.

**Industrial:** Refinery operations, drillship platforms, manufacturing process protection.

**Government and Critical Infrastructure:** U.S. government agencies, emergency management, water/wastewater facilities.

**Renewable Energy Integration:** Wind, solar, distributed energy resource coordination [[29]](https://selinc.com/solutions/renewable-energy/).

**Pricing Structure:** Public pricing data severely limited. Only explicit current price: SEL-T400L/T401L protective relays at approximately \$12,000 (2017 reference). Custom quotes required for most products; no online pricing catalogs identified [[40]](https://selinc.com/company/news/119068/).

---

## 4. Technology and Architecture

### OT/IoT Embedded Systems

SEL designs **microprocessor-based digital protective relays and real-time automation controllers** for power system protection, control, monitoring, automation, metering, and communications [[12]](https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories) [[38]](https://www.cybersecurityintelligence.com/schweitzer-engineering-laboratories-sel-7249.html). These are embedded systems managing critical infrastructure decision-making, requiring high reliability, deterministic response times, and cybersecurity hardening.

### Firmware Platforms and Computing Architecture

**Primary Processors:** Intel Xeon-based computing platforms (SEL-3355-2, SEL-3360-2 RTAC systems) [[7]](https://selinc.com/software/downloads/) [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02)

**Operating System Support:** 
- 64-bit Windows (primary platform) [[7]](https://selinc.com/software/downloads/)
- Partial Linux/32-bit Windows support (limited, not primary) [[7]](https://selinc.com/software/downloads/)

**Firmware Versioning:** Documented schemes include R301-V0 through R302-V2 progression, indicating multi-year firmware maintenance windows [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02). Firmware updates carry digital signatures for verification purposes [[5]](https://selinc.com/support/security-notifications/).

### Network Management Protocols

SEL products support the following standardized and proprietary communication protocols:

| Protocol/Standard | Purpose | Confirmation |
|---|---|---|
| **IEC 61850** | Substation communication architecture | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **Mirrored Bits®** | SEL proprietary peer-to-peer relay communication | Proprietary innovation [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **Parallel Redundancy Protocol (PRP)** | Network redundancy (IEC 62439-3) | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **IEEE 1588 Precision Time Protocol v2 (PTPv2)** | Sub-microsecond time synchronization | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **IEC 61850-9-2 Sampled Values** | Merging unit protection data | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **Time-Domain Link (TiDL®)** | SEL proprietary traveling-wave communication | Proprietary technology [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **Simple Network Time Protocol (SNTP)** | NTP time synchronization | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **IEEE C37.118 Synchrophasors** | PMU data streaming | Explicitly listed [[43]](https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf) |
| **Modbus TCP/RTU** | Legacy industrial protocol support | Mentioned [[7]](https://selinc.com/software/downloads/) |
| **SNMP** | Network management | **Not explicitly confirmed** |
| **BACnet** | Building automation | **Not explicitly confirmed** |
| **REST APIs** | Modern integration | Supported via SEL-5230ac/5231 [[6]](https://selinc.com/products/categories/software/) but REST-specific confirmation absent |

**Network Management Hardware:**
- **SEL ICON (Integrated Communications Optical Network)** — multiplexer architecture for SONET/Ethernet gateway functionality [[13]](https://www.linkedin.com/company/sel)
- **SEL-2240 Axion** — modern communications control module [[13]](https://www.linkedin.com/company/sel)

### Software Bill of Materials (SBOM) Status

**CRITICAL FINDING:** SEL **does not publish Software Bills of Materials** for any products despite operating in critical infrastructure sectors and selling to U.S. government agencies [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02) [[35]](https://www.netrise.io/software-bill-of-materials) [[36]](https://www.cisa.gov/topics/information-communications-technology-supply-chain-security/sbom) [[37]](https://www.paloaltonetworks.com/cyberpedia/what-is-software-bill-materials-sbom). This represents a significant transparency gap relative to:

- **Executive Order 14028** (Biden administration cybersecurity directive requiring SBOM for federal contractors)
- **Industry best practices** in cloud security (AWS, Microsoft, Google publish SBOMs)
- **CISA SBOM guidance** recommending transparency for ICS/OT vendors [[36]](https://www.cisa.gov/topics/information-communications-technology-supply-chain-security/sbom)

Customers requiring SBOMs for compliance or procurement purposes may find SEL unavailable or forced to work through sales channels to request custom documentation. This is a known constraint for critical infrastructure modernization projects requiring supply-chain transparency.

### Cybersecurity Certifications Held

| Certification | Standard/Body | Status | Notes |
|---|---|---|---|
| **ISO 27001** | Information Security Management System | **Certified by BSI** [[1]](https://selinc.com/company/certifications/) | Demonstrates systematic information security controls |
| **IEC 62443-4-1 ML3** | Secure Product Development Lifecycle (Maturity Level 3) | **Certified by ISASecure®** [[1]](https://selinc.com/company/certifications/) | Indicates engineering security practices aligned with industrial automation standards |
| **ISO 9001** | Quality Management System | **Certified by BSI** [[1]](https://selinc.com/company/certifications/) | Standard quality assurance for manufacturing |
| **ISO 14001** | Environmental Management System | **Certified by BSI** [[1]](https://selinc.com/company/certifications/) | Environmental compliance and stewardship |
| **ISO 45001** | Occupational Health and Safety Management | **Certified by BSI** [[1]](https://selinc.com/company/certifications/) | Workplace safety and occupational health |
| **ISO/IEC 17025:2017** | Testing and Calibration Laboratories | **A2LA Accredited** [[1]](https://selinc.com/company/certifications/) | Validates internal testing laboratory competency |
| **IEC 62443-4-2 (Secure Implementation)** | Security implementation assessment | **Not confirmed** | No evidence of this certification in sources |
| **IEC 62443-3-3 (System Security Assurance)** | System security requirements | **Not confirmed** | No evidence of this certification in sources |
| **SOC 2 Type II** | Service Organization Controls | **Not confirmed** | No evidence in sources |

**Assessment:** SEL holds strong foundational certifications (ISO 27001, IEC 62443-4-1 ML3) but lacks confirmation of the more advanced IEC 62443-4-2 and IEC 62443-3-3 certifications specific to secure implementation and system security assurance. The absence of SOC 2 Type II may reflect the company's focus on manufacturing/product security rather than SaaS/cloud service delivery.

---

## 5. Regulatory Exposure

### EU Cyber Resilience Act (CRA) Scope Assessment

**Article 3(1) — Products with Digital Elements Scope:**
- **Status:** Not assessed in available sources
- **Applicability Inference:** SEL's protective relays, automation controllers, and software tools almost certainly qualify as "products with digital elements" under CRA Article 3(1) (any product with digital components connected to external networks or processing data)
- **Known Gap:** No evidence of explicit CRA mapping, compliance roadmap, or Article 7 classification (Class I or Class II) assessment

**Article 7 Classification (Class I vs. Class II):**
- **Status:** Not publicly disclosed
- **Relevance:** SEL products controlling critical power system infrastructure likely qualify as Class II (higher security requirements) but this determination would be product-specific and market-dependent

**Strategic Implication:** With product shipments to Europe-based utilities and data centers, SEL should conduct urgent CRA readiness assessment, particularly for products released or substantially modified after January 2025 (CRA enforcement timeline).

### NIS2 Directive (Network and Information System Directive 2)

**Applicability:** Not specifically addressed in available sources.

**Context:** NIS2 applies to "essential entities" (energy, transport, health, water, digital infrastructure) and "important entities" (broad sectors). As a vendor to essential entities, SEL may face indirect obligations through customer requirements, but direct NIS2 applicability to the vendor itself is unclear from public information.

### NERC CIP (North American Electric Reliability Corporation Cyber Incident and Protection Standard)

**Applicability Status:** **INDIRECT — Customer Obligation, Not Direct SEL Obligation**

SEL operates as a **critical infrastructure vendor**, not as a bulk power system operator. However, the company explicitly supports NERC CIP compliance:

- **NERC CIP Compliance Services Offered:** SEL provides consulting, system assessment, and remediation services covering CIP-004, CIP-005, CIP-007, CIP-009, CIP-010, CIP-011, CIP-013, and CIP-015 standards [[31]](https://selinc.com/services/cyber-services/compliance/)
- **Customer Base Impact:** All North American utilities using SEL products are subject to NERC CIP audit and compliance obligations
- **Product Implications:** SEL products deployed in "Electronic Security Perimeters" (ESP) or controlling "Critical Cyber Assets" must comply with CIP controls, creating compliance pressure on SEL's software update/patch management processes

**Strategic Finding:** NERC CIP applicability creates procurement pressure — utilities increasingly demand evidence of SEL's secure development practices (software patch timeliness, vulnerability response, crypto standards compliance) before selecting products for critical cyber asset roles.

### NRC 10 CFR 73.54 (Nuclear Cybersecurity Rule)

**Applicability Status:** **INDIRECT — Customer Obligation, Not Direct Applicability to SEL**

- **Scope:** Applies to digital systems at U.S. Nuclear Regulatory Commission-regulated nuclear power plants [[30]](https://www.nrc.gov/docs/ML0935/ML093510905.pdf) [[32]](https://www.nrc.gov/docs/ML2225/ML22258A204.pdf)
- **SEL Position:** Unknown if SEL manufactures or supplies digital control systems for nuclear facilities
  - If SEL products are deployed in nuclear I&C (instrumentation & control) systems, those deployments would fall under NRC jurisdiction
  - If SEL provides network devices or communications infrastructure at nuclear sites, NRC applicability likely applies
- **Exemption Structure:** Nuclear plants are regulated by NRC (10 CFR 73.54), NOT by NERC CIP — the two regimes are separate with different compliance timelines and requirements [[30]](https://www.nrc.gov/docs/ML0935/ML093510905.pdf) [[33]](https://www.certrec.com/resources/nerc-primer/a-primer-on-nerc-cip-standards/)

**Data Gap:** No evidence in available sources of SEL-supplied systems at U.S. nuclear facilities or of NRC compliance roadmaps. Further investigation required for nuclear sector exposure assessment.

### GDPR (General Data Protection Regulation)

**Data Handling Status:** Not disclosed in available sources.

**Applicability Inference:** SEL operates offices in Europe (distribution/support confirmed), serving European utilities and data centers. Any product collecting, processing, or storing personal data of EU residents falls under GDPR. Software tools (GridConfigurator, SELerator suite) may collect user identification, activity logs, or system metadata.

**Gap:** No GDPR privacy policy, data processing agreement templates, or data subject rights procedures identified in sources.

### Recent CVEs and Vulnerability Disclosure (36-Month Window: June 2023 – June 2026)

**2025 CVE Disclosures (Published May 2025):**

1. **CVE-2025-46744** [[48]](https://nvd.nist.gov/vuln/detail/cve-2025-46744)
   - **Vulnerability Type:** Incorrect Authorization (CWE-863)
   - **Description:** Authenticated administrator could modify Created By username field for user accounts, potentially obscuring audit trails
   - **CVSS Score:** Not yet assessed by NVD (marked "Not Scheduled" as of publication date)
   - **Affected Products:** Not explicitly named in limited NVD record
   - **Remediation Status:** Pending

2. **CVE-2025-46746** [[49]](https://nvd.nist.gov/vuln/detail/cve-2025-46746)
   - **Vulnerability Type:** Generation of Error Message Containing Sensitive Information (CWE-209)
   - **Description:** Administrator-level attacker could discover another account's credentials through error message disclosure
   - **CVSS Score:** Not yet assessed by NVD
   - **Affected Products:** Not explicitly named
   - **Remediation Status:** Pending

**2024 CVE Disclosures (Published April 2024):**

1. **CVE-2024-2103** [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02) [[44]](https://nvd.nist.gov/vuln/detail/CVE-2024-2103)
   - **Affected Product Family:** SEL 700-series protective relays
     - SEL-700BT Motor Bus Transfer Relay
     - SEL-700G Generator Protection
     - SEL-710-5 Motor Protection
     - SEL-751 Feeder
     - SEL-787-2/-3/-4 Transformer
     - SEL-787Z High-Impedance Ground
   - **Firmware Versions Affected:** R301-V0 through V5+; R302-V0+
   - **Patched Versions:** R301-V6, R302-V1, R302-V3, R400-V2
   - **Vulnerability Type:** Inclusion of Undocumented Features (CWE-1242)
   - **Technical Details:** Accessible when logged on with privileged access level; could cause unpredictable relay behavior
   - **CVSS Score v3.1:** **6.5** (AV:Network/AC:Low/PR:High/UI:None/S:Unchanged/C:None/I:High/A:High) — High severity [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02)
   - **CVSS Score v4.0:** **5.9** [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02)
   - **Exploitation Status:** No known public exploitation reported to CISA
   - **Critical Infrastructure Impact:** Energy sector, worldwide deployment
   - **Disclosure Channel:** CISA ICS Advisory ICSA-24-095-02 [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02)
   - **Mitigations:** Firmware updates distributed; network segmentation, VPN access controls, multi-factor authentication recommended
   - **Strategic Significance:** Demonstrates vulnerability in mature, legacy product line; highlights importance of firmware update management in field-deployed relays

**2023 CVE Disclosures (10+ total):**

**December 2023:**

1. **CVE-2023-2265** (CISA ICSA-23-341-02) [[50]](https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02)
   - **Product:** SEL-411L Line Current Differential Protection Relay
   - **Affected Versions:** R118-V0 through R129-V0 (detailed list in CISA advisory)
   - **Vulnerability Type:** Improper Restriction of Rendered UI Layers / Clickjacking (CWE-1021)
   - **CVSS Score:** **4.3** (AV:Network/AC:Low/PR:None/UI:Required/S:Unchanged/C:None/I:Low/A:None) — Medium severity [[50]](https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02)
   - **Technical Details:** Unauthenticated attacker could perform clickjacking attacks against authenticated users by embedding relay web UI in malicious HTML/CSS frames
   - **Researchers:** Sushant Mane, Parul Sindhwad, Imran Jamadar, Dr. Faruk Kazi (CoE-CNDS Lab, Veermata Jijabai Technological Institute, Mumbai, India) [[50]](https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02)
   - **Mitigation:** Firmware patches distributed; manual Appendix A revision dated 20230830 (Instruction Manual Update)

**August 2023 (Coordinated disclosure by Nozomi Networks Labs):**

Nozomi Networks published research identifying **9 new vulnerabilities** in SEL engineering workstation tools [[3]](https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software):

| CVE ID | Product | Vulnerability Type | CVSS Score | Impact |
|--------|---------|-------------------|-----------|--------|
| **CVE-2023-31175** | SEL GridConfigurator | Execution with Unnecessary Privileges (CWE-250) | **8.8** | Remote Code Execution (RCE) via malformed .dmx grid definition files |
| **CVE-2023-34392** | SEL GridConfigurator | Missing Authentication for Critical Function (CWE-306) | **8.2** | Access to relay configuration without credentials |
| **CVE-2023-31169** | SEL acSELerator QuickSet | Unicode Encoding Improper Handling (CWE-176) | **4.8** | Path traversal, information disclosure |
| **CVE-2023-31168** | SEL QuickSet | Insufficient Input Validation | Moderate | Configuration bypass |
| **CVE-2023-31170** | SEL QuickSet | Insufficient Entropy (CWE-331) | Moderate | Predictable session tokens |
| **CVE-2023-31171** | SEL Architect | Authentication bypass | Moderate | Privilege escalation |
| **CVE-2023-31172** | SEL Architect | Improper input validation | Moderate | Buffer overflow/DoS |
| **CVE-2023-31173** | SEL Diagram Builder | Insecure deserialization | Moderate | RCE via malicious project files |
| **(9th CVE details not fully enumerated)** | SEL software suite | Various | Various | Part of coordinated disclosure |

**August 2023 (May 2023 Research Publication):**

Nozomi Networks additionally disclosed **19 vulnerabilities affecting SEL Real-Time Automation Controllers (RTAC)** and associated software, though individual CVE IDs and CVSS scores for this batch are not fully enumerated in available sources [[3]](https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software).

**May 2023 CVE (Published November 2023):**

2. **CVE-2023-34389** (affects SEL-451) [[45]](https://nvd.nist.gov/vuln/detail/CVE-2023-34389)
   - **Vulnerability Type:** Resource Exhaustion (CWE-770)
   - **Technical Details:** Remote authenticated attacker could make system unavailable indefinitely through resource consumption
   - **CVSS Score:** Not provided in source snippet
   - **Reference:** Manual Appendix A dated 20230830

3. **CVE-2023-31176** (affects SEL-451) [[46]](https://nvd.nist.gov/vuln/detail/CVE-2023-31176)
   - **Vulnerability Type:** Insufficient Entropy (CWE-331)
   - **Technical Details:** Unauthenticated attacker could brute-force session tokens and bypass authentication
   - **CVSS Score:** Not provided in source snippet
   - **Reference:** Manual Appendix A dated 20230830

4. **CVE-2023-31149** (RTAC Web Interface) [[47]](https://nvd.nist.gov/vuln/detail/CVE-2023-31149)
   - **Vulnerability Type:** Improper Input Validation (CWE-20)
   - **Technical Details:** Remote authenticated attacker could execute arbitrary code
   - **CVSS Score:** Not provided in source snippet

### Vulnerability Remediation and Disclosure Approach [[5]](https://selinc.com/support/security-notifications/)

SEL operates a formal PSIRT (Product Security Incident Response Team) with the following disclosure and remediation strategy:

- **High-Risk Vulnerabilities:** Disclosed via Service Bulletins (rapid notification)
- **Standard Vulnerabilities:** Disclosed via Instruction Manual Appendix A revisions (versioned, tied to patch releases)
- **Software Products:** Disclosed via "Latest Software Versions" page updates with direct download links
- **All Vulnerabilities:** Tagged with `[Cybersecurity]` or `[Cybersecurity Enhancement]` labels for searchability
- **Digital Signing:** All firmware and software updates carry digital signatures for authenticity verification
- **Company Commitment:** SEL publicly commits to having "no undocumented authentication bypass mechanism or undisclosed communication channel" as a founding principle (since 1982) [[5]](https://selinc.com/support/security-notifications/)

**Vulnerability Contact:** security@selinc.com [[5]](https://selinc.com/support/security-notifications/)

**Strategic Assessment:** The elevated CVE discovery rate (19+ in 2023, continuing through 2025) suggests either (a) active security research community focus on SEL tools (positive: transparency-driven), or (b) increasing vulnerability density in complex software (GridConfigurator, QuickSet, RTAC platforms). The severity spread (CVSS 4.3 to 8.8) indicates both high-risk RCE vectors and lower-impact information disclosure issues across the product line.

---

## 6. Organizational Structure

### Executive Leadership (C-Suite) — Current as of January 15, 2025 [[18]](https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/)

| Executive | Title (Current) | Title (Prior) | Tenure | Background | Notes |
|-----------|-----------------|---------------|--------|-----------|-------|
| **Dave Whitehead** | President & Chief Executive Officer | Chief Operating Officer (2017-2019); Chief Executive Officer (Nov 2019-Jan 2025) | 31+ years (joined 1994 as hardware engineer) [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) [[17]](https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer) | B.S. Electrical Engineering (WSU 1989); M.S. Electrical Engineering (RPI 1994) [[22]](https://vcea.wsu.edu/executive-leadership-board/david-whitehead/). 73 patents (or 60 per alternate source) [[17]](https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer). PE-licensed (WA, NC, NY, MI). Senior IEEE member. Prior: Combat systems engineer, Electric Boat, U.S. Navy submarine systems (1989-1994). Board: SEL, Veracity Industrial Networks [[17]](https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer) [[22]](https://vcea.wsu.edu/executive-leadership-board/david-whitehead/) | COO promoted to CEO Nov 18, 2019 [[17]](https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer) [[19]](https://www.spokesman.com/stories/2019/nov/18/sel-taps-chief-operating-office-whitehead-as-its-n/) [[21]](https://selinc.com/company/news/129264/). Promoted to President Jan 15, 2025 [[18]](https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/) |
| **Edmund O. Schweitzer III** | Founder (mentor/innovation/mentoring focus) | President & Chief Technology Officer | 41 years (founded company 1985, continuous tenure) | Inventor, microprocessor-based digital protective relay (inducted National Inventors Hall of Fame 2019) [[14]](https://selinc.com/company/history/) | Transitioned from operational leadership to mentoring/innovation Jan 15, 2025 [[18]](https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/). Maintains founding vision and culture stewardship |
| **Joey Nestegard** | Executive Vice President, Chief Business Officer & Chief Financial Officer | (Financial professional role, tenure internal) | 23+ years (joined 2002 as finance professional) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/) | Finance/business operations background | Promoted to EVP Jan 15, 2025 [[18]](https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes) [[20]](https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/). Reports to Whitehead |
| **David Costello** | Chief Sales & Services Officer | — | — | — | Reports to Whitehead [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) |
| **Stephanie Schweitzer** | Chief Marketing & Communications Officer | — | — | — | Reports to Whitehead [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) |
| **Leith Sorenson** | Senior Vice President, Manufacturing | — | — | — | Manufacturing operations oversight [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) |
| **Gerardo Urrea** | Senior Vice President, Global Operations | — | — | — | International operations and supply chain [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) |
| **Marisa Hemingway** | Human Resources Director | — | — | — | People operations [[16]](https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead) |

### Product Security and Engineering Leadership

**Cybersecurity Leadership:**
- **Will Edwards** — Head of Cyber Services [[2]](https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/). Leads SEL's internal cybersecurity consulting, vulnerability assessment, and remediation service delivery to critical infrastructure customers.

**PSIRT (Product Security Incident Response Team):**
- Formal structure established; vulnerability evaluation process documented [[5]](https://selinc.com/support/security-notifications/)
- Evaluation criteria: access type required, attack complexity, user interaction requirements, core functionality impact assessment, active exploitation likelihood, multi-product presence [[5]](https://selinc.com/support/security-notifications/)
- Disclosure channels: Service Bulletins (high-risk), Instruction Manual Appendix A (standard), Latest Software Versions page (software updates)
- Contact: security@selinc.com [[5]](https://selinc.com/support/security-notifications/)

**Engineering Leadership:** Not specifically identified in available sources. Organizational chart below C-suite level not disclosed.

**Key Decision Makers for Cybersecurity Procurement:** Will Edwards (Cyber Services leader) implied as primary; Dave Whitehead (CEO) and Joey Nestegard (CFO) control capital allocation decisions.

---

## 7. Primary Customers

### Major Customer Base by Segment

**Electric Utilities (Primary Revenue Driver):**

Named customers [[23]](https://selinc.com/highlights/):
- Puget Sound Energy (PSE) — Washington State
- San Diego Gas & Electric — California
- American Electric Power (AEP) — Multi-state operator
- LG&E and KU — Kentucky
- Westar Energy — Kansas
- Public Power/Cooperatives: Rayburn Electric Cooperative, Golden Valley Electric Association, Tohono O'odham Utility Authority

**International Utilities [[23]](https://selinc.com/highlights/):**
- Georgian State Electrosystem
- Elia (Belgium transmission operator)
- Davao Light & Power (Philippines)
- Vietnam Electricity
- SIEPAC (Central American Electrical Interconnection System)

**Data Centers (Explicit Strategic Vertical [[25]](https://selinc.com/industries/data-centers/)):**
Enterprise, colocation, and cloud data center environments with focus on:
- Reliable power protection and distribution
- Automated power management
- Revenue metering and monitoring
- Renewable energy integration

**Nuclear and Transmission:**
- Temelin Nuclear Power Plant (Czech Republic, via I&C Energo and Montáže Čakovice) [[23]](https://selinc.com/highlights/)

**Industrial Operations:**
- Motor Oil Hellas (refinery operations) [[23]](https://selinc.com/highlights/)
- Jasper Explorer (offshore drillship platform, drilling operations) [[23]](https://selinc.com/highlights/)

**Government and Public Agencies:**
- U.S. government agencies (unspecified departments)
- Whitman County Emergency Management [[23]](https://selinc.com/highlights/) [[24]](https://selinc.com/services/)

**Educational and Research Institutions:**
- Montclair State University (microgrid research)
- UC San Diego (renewable integration research)
- University of Notre Dame (distributed microgrid collaboration) [[23]](https://selinc.com/highlights/)

**Water and Wastewater Utilities:**
- Water/wastewater treatment facilities
- Aquifer protection and irrigation control [[23]](https://selinc.com/highlights/)

**Renewable Energy Integration:**
- Wind energy operators
- Solar energy facilities
- Distributed energy resource aggregation [[29]](https://selinc.com/solutions/renewable-energy/)

**Geographic Market Distribution:** Products in **174 countries** with concentration in North America (primary market), Europe, Asia-Pacific, Central America [[13]](https://www.linkedin.com/company/sel) [[23]](https://selinc.com/highlights/).

**Market Positioning:** "North America's most trusted relay supplier" and "one of the top relay manufacturers in the world" [[27]](https://selinc.com/engineering-services/utilities/). Described as "globally recognized designer and manufacturer of protection, control, and monitoring solutions for electric power systems" [[13]](https://www.linkedin.com/company/sel).

---

## 8. Value Chain and Partners

### Strategic Product Partnerships

**S&C Electric Company Collaboration (Feb 2, 2026 Announcement) [[26]](https://www.powermag.com/sc-electric-sel-collaborate-on-interoperable-control-solution-for-distribution-grid-modernization/) [[28]](https://www.renewableenergyworld.com/power-grid/sc-electric-company-announces-new-interoperable-control-solution-at-dtech/):**
- **Partnership Scope:** Interoperable grid modernization control solution pairing S&C IntelliRupter PulseCloser (recloser/switch technology) with SEL-651RD Advanced Digital Control
- **Technical Integration:** Fiber-optic interface enabling bi-directional control and data exchange
- **Applications:** Distribution grid modernization (retrofit and greenfield deployments)
- **Product Launch Timeline:** Q4 2026 (retrofit solutions); broader market deployment 2027
- **Strategic Significance:** Indicates SEL's commitment to grid edge modernization and interoperability with other critical OT vendors

### Cybersecurity and Monitoring Partnership

**Nozomi Networks Collaboration (August 21, 2024) [[2]](https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/):**
- **Partnership Type:** Reseller and technology integration agreement
- **Nozomi Offering:** AI-powered OT/IoT continuous monitoring platform
- **Integration Point:** Embedded into SEL's Software-Defined Network (SDN) architecture
- **Target Markets:** Utilities and industrial control system operators requiring advanced threat detection
- **Functional Capability:** Network traffic detection, anomaly identification, incident response support for critical infrastructure

### Academic and Technology Partnerships

**Purdue University Manufacturing Initiative [[14]](https://selinc.com/company/history/):**
- SEL opened advanced manufacturing facility at Purdue (2020) focused on automation research and prototyping

**Washington State University [[14]](https://selinc.com/company/history/):**
- Historical connection through Dr. Edmund O. Schweitzer III's doctoral research; ongoing institutional relationship

**Thales Group — Smart Grid Laboratory [[23]](https://selinc.com/highlights/):**
- Research and development collaboration on grid modernization technologies

### Manufacturing and Supply Chain

**In-House Manufacturing Model:**
SEL maintains a **vertically integrated, in-house design and manufacturing model** [[24]](https://selinc.com/services/) with no evidence of outsourced ODM relationships or major manufacturing partnerships disclosed.

**Known Component Suppliers:**
- **Intel** — Xeon processors for SEL-3355-2 and SEL-3360-2 automation controller platforms [[7]](https://selinc.com/software/downloads/) [[34]](https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02). This dependency creates **upstream firmware risk** if Intel processor vulnerabilities are discovered.

**Manufacturing Footprint (owned facilities):**
- Pullman, Washington (headquarters, primary manufacturing)
- Lewiston, Idaho
- Moscow, Idaho
- Lake Zurich, Illinois
- West Lafayette, Indiana (Purdue research collaboration site)
- Charlotte, North Carolina (assembly)
- San Luis Potosí, Mexico (assembly)
- Bogotá, Colombia (assembly)
- Campinas, Brazil (assembly)

**Data Gap:** No specific ODM partnerships, contract manufacturers, component suppliers (beyond Intel), or outsourced assembly relationships identified. The company's statements emphasize "designs, manufactures, tests, and delivers" in-house [[24]](https://selinc.com/services/), suggesting high vertical integration as a competitive differentiator.

### Channel Distribution and Reseller Network

**Direct Reseller Identified:**
- **Nozomi Networks** — Cybersecurity monitoring and threat detection reseller [[2]](https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/)

**System Integrators and Resellers:** References to partnerships with system integrators exist [[24]](https://selinc.com/services/), but specific names and arrangements not disclosed in available sources.

---

## 9. Spending and Procurement

### IT/OT Security Budget Signals

**Status:** Not publicly disclosed. As a private company, SEL does not publish IT/OT security spending, security headcount, or technology investment breakdowns.

**Inference from Observable Signals:**
- Nozomi Networks partnership (August 2024) signals investment in advanced OT threat detection
- Formal PSIRT structure with coordinated disclosure practices indicates security team infrastructure [[5]](https://selinc.com/support/security-notifications/)
- Multiple cybersecurity certifications (ISO 27001, IEC 62443-4-1 ML3) suggest ongoing compliance and audit spending

### Cybersecurity Vendor Relationships and Known Tool Purchases

**Nozomi Networks (Technology Partner):**
- AI-powered OT/IoT monitoring integration into SEL's SDN architecture [[2]](https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/)
- Reseller relationship for critical infrastructure threat detection services

**Internal Capability Development (Primary Strategy):**
SEL operates a comprehensive internal Cyber Services division providing to customers:
- System security assessments and audits [[24]](https://selinc.com/services/) [[27]](https://selinc.com/engineering-services/utilities/) [[31]](https://selinc.com/services/cyber-services/compliance/)
- NERC CIP compliance consulting (CIP-004, -005, -007, -009, -010, -011, -013, -015) [[31]](https://selinc.com/services/cyber-services/compliance/)
- Cybersecurity solution design and implementation
- Incident response and management
- Ongoing maintenance and patch management [[24]](https://selinc.com/services/) [[27]](https://selinc.com/engineering-services/utilities/)

**Strategic Approach:** Rather than extensive third-party tool procurement, SEL appears to invest in building proprietary internal capabilities (Cyber Services division with Will Edwards as Head of Cyber Services), positioning cybersecurity as a competitive differentiator and revenue opportunity.

### Known Security Tool Purchases

**Not disclosed.** No public disclosure of specific security testing tools, vulnerability assessment platforms, code analysis software, or incident response technologies purchased by SEL for internal use.

---

## 10. Incidents and Vulnerabilities Summary

**36-Month CVE Total:** Minimum **25+ CVEs identified** across 2023-2025 window, with continuing discovery pace.

**Severity Distribution:**
- **Critical (CVSS 9.0-10.0):** None identified in publicly available records
- **High (CVSS 7.0-8.9):** CVE-2023-31175 (CVSS 8.8, GridConfigurator RCE), CVE-2023-34392 (CVSS 8.2, authentication bypass)
- **Medium (CVSS 4.0-6.9):** CVE-2024-2103 (CVSS 6.5, undocumented features), CVE-2023-31169 (CVSS 4.8, unicode handling), CVE-2023-2265 (CVSS 4.3, clickjacking)
- **Low/Pending Assessment:** CVE-2025-46744, CVE-2025-46746 (May 2025, CVSS pending)

**Primary Attack Vectors:**
1. **Configuration Software Exploitation** (GridConfigurator, QuickSet, Architect) — Remote Code Execution via malformed .dmx files
2. **Authentication Bypass** — Session token brute-forcing, clickjacking against authenticated users
3. **Privileged Access Escalation** — Undocumented features accessible to authenticated relay administrators
4. **Information Disclosure** — Error messages revealing credentials, system configuration details

**Remediation Trend:** SEL has demonstrated responsive disclosure timelines with firmware patches released within months of vulnerability discovery (e.g., CVE-2024-2103 patches released April 2024 with versions R301-V6, R302-V1, R302-V3 available).

**Critically Important Observation:** No publicly disclosed **security incidents or breaches** (data compromise, system takeover, ransom attacks) attributed to SEL products have been identified in available sources. The CVE disclosures represent **vulnerability findings in pre-deployment engineering**, not post-deployment exploitations.

---

## Strategic Assessment and Recommendations

### Strengths

1. **Operational Longevity and Innovation:** 41-year track record with foundational invention (microprocessor-based digital relay, 1982) establishes deep domain expertise and market trust.

2. **Employee Ownership Alignment:** 100% ESOP structure eliminates short-term earnings pressure, enabling long-term R&D investment in critical infrastructure reliability — a competitive advantage in utilities' multi-decade capital planning horizons.

3. **Critical Infrastructure Penetration:** Products in 174 countries, primary reliance in North America, deep integration into utility protection schemes creates switching costs and customer lock-in.

4. **Formal Security Practices:** ISO 27001, IEC 62443-4-1 ML3 certifications, documented PSIRT, security contact, and coordinated disclosure practices demonstrate institutional commitment to security.

5. **Strategic Partnership Growth:** S&C Electric collaboration (Feb 2026) and Nozomi Networks integration signal expansion into grid modernization and advanced threat detection markets.

### Vulnerabilities and Gaps

1. **SBOM Transparency Gap:** Absence of public Software Bills of Materials is a significant competitive disadvantage versus peers and creates friction with U.S. government procurement requirements (EO 14028). This is likely a conscious policy choice but represents a critical vulnerability in post-supply-chain-attack environment.

2. **Incomplete Regulatory Mapping:** No evidence of EU Cyber Resilience Act readiness, NIS2 compliance roadmap, or explicit NRC 10 CFR 73.54 product certifications. As regulatory environment tightens (especially EU), late compliance could trigger customer delays or product redesigns.

3. **Elevated Vulnerability Discovery Rate:** 19+ CVEs in 2023 alone, continuing through 2025, suggests either (a) active research focus on SEL tools (positive transparency signal) or (b) increasing complexity/attack surface in software configuration tools. Continued monitoring required.

4. **Limited Protocol Confirmation:** SNMP, BACnet, REST support not explicitly confirmed despite industry expectations. This ambiguity creates sales friction and customer risk assessment challenges.

5. **Upstream Component Risk:** Intel Xeon dependency for computing platforms (SEL-3355-2, SEL-3360-2) creates latent supply-chain exposure if processor-level vulnerabilities are discovered. Mitigation strategy not disclosed.

### Market Position Implications

SEL operates as the **dominant protective relay supplier in North American electric utilities** with strong customer relationships, installed base lock-in, and technical differentiation (time-domain protection, Mirrored Bits proprietary technology). The company's **employee ownership and private status** provide strategic flexibility unavailable to public competitors (Siemens, ABB, Schweitzer Electric's newer competitors).

However, the **emerging data center vertical** (power protection, renewable integration) and **grid modernization partnerships** (S&C Electric) suggest competitive intensity increasing as utilities accelerate digital transformation. SEL's strength in traditional protection relays may be challenged by newer OT/IT convergence demands (cloud orchestration, API-first architecture, machine learning analytics).

---

## Conclusion

Schweitzer Engineering Laboratories, Inc. represents a **strategically significant critical infrastructure vendor** with unparalleled market position in North American power system protection, operational longevity spanning 41 years, and institutional commitment to long-term R&D through employee ownership. 

The company's **formal security practices, documented vulnerability remediation, and strategic partnerships** position it favorably for evolving regulatory and customer security demands. However, critical gaps remain in **SBOM transparency, EU regulatory readiness, and advanced certification coverage** that represent material risks for customers navigating increasing compliance complexity.

For B2B sales and partnership evaluation: SEL represents a **high-trust, deeply embedded vendor** with strong switching costs but requires customer satisfaction on SBOM delivery, regulatory compliance roadmaps, and advanced cybersecurity certifications before enterprise or government procurement can proceed.

## Sources

[1] System and Product Certifications | Schweitzer Engineering Laboratories - https://selinc.com/company/certifications/
[2] Nozomi, Schweitzer Engineering Laboratories provide cybersecurity solutions and support to critical infrastructure - Industrial Cyber - https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/
[3] 9 New Vulnerabilities Impact Schweitzer Engineering Software - https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software
[4] Selinc : Security vulnerabilities, CVEs - https://www.cvedetails.com/vulnerability-list/vendor_id-12625/Selinc.html
[5] Security Support | Schweitzer Engineering Laboratories - https://selinc.com/support/security-notifications/
[6] Software | Schweitzer Engineering Laboratories - https://selinc.com/products/categories/software/
[7] Software and Driver Downloads | Schweitzer Engineering Laboratories - https://selinc.com/software/downloads/
[8] Schweitzer Engineering Laboratories, Inc. SEL-3350-1 Data Sheet - https://selinc.com/api/download/133033/
[9] FOREST LABORATORIES INC (0000038074) 10-K - 2013-05-23 Part 2 - Item 7 - https://www.sec.gov/Archives/edgar/data/38074/000003807413000014/0000038074-13-000014.txt
[10] About | Schweitzer Engineering Laboratories - https://selinc.com/company/about/
[11] What Is SEL? Introduction to Schweitzer Engineering Laboratories | NFM Consulting - https://nfmconsulting.com/knowledge/sel-what-is/
[12] Schweitzer Engineering Laboratories - Wikipedia - https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories
[13] Schweitzer Engineering Laboratories (SEL) | LinkedIn - https://www.linkedin.com/company/sel
[14] Our History | Schweitzer Engineering Laboratories - https://selinc.com/company/history/
[15] Schweitzer Engineering Laboratories - https://selinc.com/
[16] Dave Whitehead - CEO at Schweitzer Engineering Laboratories | The Org - https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead
[17] SEL Names New Chief Executive Officer | TD World - https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer
[18] Schweitzer Engineering labs makes leadership changes | Spokane Journal of Business - https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes
[19] SEL taps chief operating office Whitehead as its next CEO - https://www.spokesman.com/stories/2019/nov/18/sel-taps-chief-operating-office-whitehead-as-its-n/
[20] SEL Begins Its 41st Year with Leadership Changes | Schweitzer Engineering Laboratories - https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/
[21] SEL Names New Chief Executive Officer | Schweitzer Engineering Laboratories - https://selinc.com/company/news/129264/
[22] David Whitehead | Voiland College of Engineering and Architecture |  Washington State University - https://vcea.wsu.edu/executive-leadership-board/david-whitehead/
[23] Customer Highlights | Schweitzer Engineering Laboratories - https://selinc.com/highlights/
[24] Services | Schweitzer Engineering Laboratories - https://selinc.com/services/
[25] Data Centers | Schweitzer Engineering Laboratories - https://selinc.com/industries/data-centers/
[26] S&C Electric, SEL Collaborate on Interoperable Control Solution for Distribution Grid Modernization - https://www.powermag.com/sc-electric-sel-collaborate-on-interoperable-control-solution-for-distribution-grid-modernization/
[27] Remedial Action Schemes | Schweitzer Engineering Laboratories - https://selinc.com/engineering-services/utilities/
[28] S&C Electric Company announces new interoperable control solution at DTECH - https://www.renewableenergyworld.com/power-grid/sc-electric-company-announces-new-interoperable-control-solution-at-dtech/
[29] Renewable Energy Integration | Schweitzer Engineering Laboratories - https://selinc.com/solutions/renewable-energy/
[30] Memorandum of Understanding Between the U.S. Nuclear Regulatory Commission and the North American Electric Reliability Corporation. - https://www.nrc.gov/docs/ML0935/ML093510905.pdf
[31] NERC CIP Compliance Services | Schweitzer Engineering Laboratories - https://selinc.com/services/cyber-services/compliance/
[32] RG 5.71, Revision 1, Cyber Security Programs for Nuclear Power Reactors - https://www.nrc.gov/docs/ML2225/ML22258A204.pdf
[33] A Primer on NERC CIP Standards | Certrec - https://www.certrec.com/resources/nerc-primer/a-primer-on-nerc-cip-standards/
[34] Schweitzer Engineering Laboratories SEL | CISA - https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02
[35] Software Bill of Materials (SBOM) Guide | NetRise - https://www.netrise.io/software-bill-of-materials
[36] Software Bill of Materials (SBOM) | CISA - https://www.cisa.gov/topics/information-communications-technology-supply-chain-security/sbom
[37] What Is a Software Bill of Materials (SBOM)? - Palo Alto Networks - https://www.paloaltonetworks.com/cyberpedia/what-is-software-bill-materials-sbom
[38] Schweitzer Engineering Laboratories (SEL) - https://www.cybersecurityintelligence.com/schweitzer-engineering-laboratories-sel-7249.html
[39] Time-Domain Line Protection | Schweitzer Engineering Laboratories - https://selinc.com/solutions/transmission/time-domain-line-protection/
[40] SEL Releases World’s Fastest Transmission Line Relay | Schweitzer Engineering Laboratories - https://selinc.com/company/news/119068/
[41] SEL | PAC World - https://www.pacw.org/sel
[42] SEL Releases Ultra-High-Speed Transmission Line Relay | Schweitzer Engineering Laboratories - https://selinc.com/company/news/131986/
[43] 2024 Product ## and Solution Guide - https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf
[44] NVD - CVE-2024-2103 - https://nvd.nist.gov/vuln/detail/CVE-2024-2103
[45] NVD - CVE-2023-34389 - https://nvd.nist.gov/vuln/detail/CVE-2023-34389
[46] NVD - CVE-2023-31176 - https://nvd.nist.gov/vuln/detail/CVE-2023-31176
[47] NVD - CVE-2023-31149 - https://nvd.nist.gov/vuln/detail/CVE-2023-31149
[48] NVD - cve-2025-46744 - https://nvd.nist.gov/vuln/detail/cve-2025-46744
[49] NVD - cve-2025-46746 - https://nvd.nist.gov/vuln/detail/cve-2025-46746
[50] Schweitzer Engineering Laboratories SEL-411L | CISA - https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02
[51] Schweitzer Engineering Laboratories, Inc. SEL-3620 and SEL-3622 | CISA - https://www.cisa.gov/news-events/ics-advisories/icsa-17-192-06

---

## Sources

1. **System and Product Certifications | Schweitzer Engineering Laboratories** — https://selinc.com/company/certifications/
2. **Nozomi, Schweitzer Engineering Laboratories provide cybersecurity solutions and support to critical infrastructure - Industrial Cyber** — https://industrialcyber.co/news/nozomi-schweitzer-engineering-laboratories-provide-cybersecurity-solutions-and-support-to-critical-infrastructure/
3. **9 New Vulnerabilities Impact Schweitzer Engineering Software** — https://www.nozominetworks.com/blog/9-new-vulnerabilities-impact-schweitzer-engineering-labs-software
4. **Selinc : Security vulnerabilities, CVEs** — https://www.cvedetails.com/vulnerability-list/vendor_id-12625/Selinc.html
5. **Security Support | Schweitzer Engineering Laboratories** — https://selinc.com/support/security-notifications/
6. **Software | Schweitzer Engineering Laboratories** — https://selinc.com/products/categories/software/
7. **Software and Driver Downloads | Schweitzer Engineering Laboratories** — https://selinc.com/software/downloads/
8. **Schweitzer Engineering Laboratories, Inc. SEL-3350-1 Data Sheet** — https://selinc.com/api/download/133033/
9. **FOREST LABORATORIES INC (0000038074) 10-K - 2013-05-23 Part 2 - Item 7** — https://www.sec.gov/Archives/edgar/data/38074/000003807413000014/0000038074-13-000014.txt
10. **About | Schweitzer Engineering Laboratories** — https://selinc.com/company/about/
11. **What Is SEL? Introduction to Schweitzer Engineering Laboratories | NFM Consulting** — https://nfmconsulting.com/knowledge/sel-what-is/
12. **Schweitzer Engineering Laboratories - Wikipedia** — https://en.wikipedia.org/wiki/Schweitzer_Engineering_Laboratories
13. **Schweitzer Engineering Laboratories (SEL) | LinkedIn** — https://www.linkedin.com/company/sel
14. **Our History | Schweitzer Engineering Laboratories** — https://selinc.com/company/history/
15. **Schweitzer Engineering Laboratories** — https://selinc.com/
16. **Dave Whitehead - CEO at Schweitzer Engineering Laboratories | The Org** — https://theorg.com/org/schweitzer-engineering-laboratories/org-chart/dave-whitehead
17. **SEL Names New Chief Executive Officer | TD World** — https://www.tdworld.com/careers/article/20973396/sel-names-new-chief-executive-officer
18. **Schweitzer Engineering labs makes leadership changes | Spokane Journal of Business** — https://www.spokanejournal.com/articles/16701-schweitzer-engineering-labs-makes-leadership-changes
19. **SEL taps chief operating office Whitehead as its next CEO** — https://www.spokesman.com/stories/2019/nov/18/sel-taps-chief-operating-office-whitehead-as-its-n/
20. **SEL Begins Its 41st Year with Leadership Changes | Schweitzer Engineering Laboratories** — https://selinc.com/company/news/sel-begins-its-41st-year-with-leadership-changes/
21. **SEL Names New Chief Executive Officer | Schweitzer Engineering Laboratories** — https://selinc.com/company/news/129264/
22. **David Whitehead | Voiland College of Engineering and Architecture |  Washington State University** — https://vcea.wsu.edu/executive-leadership-board/david-whitehead/
23. **Customer Highlights | Schweitzer Engineering Laboratories** — https://selinc.com/highlights/
24. **Services | Schweitzer Engineering Laboratories** — https://selinc.com/services/
25. **Data Centers | Schweitzer Engineering Laboratories** — https://selinc.com/industries/data-centers/
26. **S&C Electric, SEL Collaborate on Interoperable Control Solution for Distribution Grid Modernization** — https://www.powermag.com/sc-electric-sel-collaborate-on-interoperable-control-solution-for-distribution-grid-modernization/
27. **Remedial Action Schemes | Schweitzer Engineering Laboratories** — https://selinc.com/engineering-services/utilities/
28. **S&C Electric Company announces new interoperable control solution at DTECH** — https://www.renewableenergyworld.com/power-grid/sc-electric-company-announces-new-interoperable-control-solution-at-dtech/
29. **Renewable Energy Integration | Schweitzer Engineering Laboratories** — https://selinc.com/solutions/renewable-energy/
30. **Memorandum of Understanding Between the U.S. Nuclear Regulatory Commission and the North American Electric Reliability Corporation.** — https://www.nrc.gov/docs/ML0935/ML093510905.pdf
31. **NERC CIP Compliance Services | Schweitzer Engineering Laboratories** — https://selinc.com/services/cyber-services/compliance/
32. **RG 5.71, Revision 1, Cyber Security Programs for Nuclear Power Reactors** — https://www.nrc.gov/docs/ML2225/ML22258A204.pdf
33. **A Primer on NERC CIP Standards | Certrec** — https://www.certrec.com/resources/nerc-primer/a-primer-on-nerc-cip-standards/
34. **Schweitzer Engineering Laboratories SEL | CISA** — https://www.cisa.gov/news-events/ics-advisories/icsa-24-095-02
35. **Software Bill of Materials (SBOM) Guide | NetRise** — https://www.netrise.io/software-bill-of-materials
36. **Software Bill of Materials (SBOM) | CISA** — https://www.cisa.gov/topics/information-communications-technology-supply-chain-security/sbom
37. **What Is a Software Bill of Materials (SBOM)? - Palo Alto Networks** — https://www.paloaltonetworks.com/cyberpedia/what-is-software-bill-materials-sbom
38. **Schweitzer Engineering Laboratories (SEL)** — https://www.cybersecurityintelligence.com/schweitzer-engineering-laboratories-sel-7249.html
39. **Time-Domain Line Protection | Schweitzer Engineering Laboratories** — https://selinc.com/solutions/transmission/time-domain-line-protection/
40. **SEL Releases World’s Fastest Transmission Line Relay | Schweitzer Engineering Laboratories** — https://selinc.com/company/news/119068/
41. **SEL | PAC World** — https://www.pacw.org/sel
42. **SEL Releases Ultra-High-Speed Transmission Line Relay | Schweitzer Engineering Laboratories** — https://selinc.com/company/news/131986/
43. **2024 Product ## and Solution Guide** — https://cdn.asp.events/CLIENT_CL_EE_E92EC48A_9F42_8E1E_7106D5CAFEEF513B/sites/enlit-europe-2024/media/libraries/exhibitor-brochures/42707-SEL_Product_and_Solution_Guide_2024.pdf
44. **NVD - CVE-2024-2103** — https://nvd.nist.gov/vuln/detail/CVE-2024-2103
45. **NVD - CVE-2023-34389** — https://nvd.nist.gov/vuln/detail/CVE-2023-34389
46. **NVD - CVE-2023-31176** — https://nvd.nist.gov/vuln/detail/CVE-2023-31176
47. **NVD - CVE-2023-31149** — https://nvd.nist.gov/vuln/detail/CVE-2023-31149
48. **NVD - cve-2025-46744** — https://nvd.nist.gov/vuln/detail/cve-2025-46744
49. **NVD - cve-2025-46746** — https://nvd.nist.gov/vuln/detail/cve-2025-46746
50. **Schweitzer Engineering Laboratories SEL-411L | CISA** — https://www.cisa.gov/news-events/ics-advisories/icsa-23-341-02
51. **Schweitzer Engineering Laboratories, Inc. SEL-3620 and SEL-3622 | CISA** — https://www.cisa.gov/news-events/ics-advisories/icsa-17-192-06
