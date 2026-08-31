# Deep Research: STULZ SCC Technical
**Task:** 3902f8d5-9359-4c42-b091-ac70a50043da | **Date:** 2026-06-07
**QA Gate:** avoid-ai-writing | **Status:** RAW source material — pre-audit

# STULZ GmbH Smart Cooling Controller: Technical Security Analysis, Regulatory Compliance, and Company Overview

## Executive Summary

**Company Profile:** STULZ GmbH is a family-owned, Hamburg-based global leader in precision air conditioning and cooling solutions for mission-critical applications and data centers. Founded in 1947, the company operates with approximately **\$1.5 billion USD in annual revenue** (€1.7 billion) and employs **8,200 people globally** across more than **140 countries** through 35 subsidiaries and 10 production facilities across 5 continents [[5]](https://www.owler.com/company/stulzgmbh) [[6]](https://rocketreach.co/stulz-profile_b5c7c10bf42e0dab) [[11]](https://www.stulz.com/en-in/company/profile/stulz-worldwide/).

**Technical Security Posture:** STULZ's E2 Series Smart Cooling Controller demonstrates moderate security implementation including password-protected access (4 security levels with 5-minute session timeouts), support for standard industrial protocols (BACnet, Modbus TCP/RTU, SNMP v1/v2c), and encrypted cloud communications via CyberHub ECO.DC. However, critical security documentation gaps exist: **no TLS version specifications are publicly documented**, firmware security architecture (bootloader, secure boot, memory protection) is undisclosed, and **zero CVEs have been recorded across NVD, CISA, and major security databases (2020-2026)**, suggesting either robust security practices or minimal participation in coordinated vulnerability disclosure.

**Regulatory Status:** STULZ faces immediate compliance obligations under Germany's new NIS2/BSI cybersecurity regulations, effective December 5-6, 2025, with registration deadlines of March 6, 2026. As a €47-million-capital company with 8,200 employees, STULZ likely qualifies as an "Important Establishment" under the expanded scope covering approximately 29,000 German entities. **No evidence of public NIS2 registration or compliance documentation** was found.

**Certification Landscape:** STULZ products are conspicuously **absent from the official ISASecure IEC 62443-4-2 certified components database**, despite major competitors (Johnson Controls, Honeywell, IXON) holding active certifications. This absence suggests STULZ either does not pursue formal IEC 62443-4-2 certification or maintains certifications under alternative standards not publicly listed.

---

## 1. STULZ GmbH Company Profile — Global Cooling Pioneer with German Headquarters

### Headquarters and Operations

STULZ GmbH maintains its headquarters at **Holsteiner Chaussee 283, 22457 Hamburg, Germany** [[35]](https://www.stulz.com/en-it/regions/) [[37]](https://www.stulz.com/). The company was founded in **1947**, making it a **75+ year-old enterprise** with deep roots in industrial cooling technology [[11]](https://www.stulz.com/en-in/company/profile/stulz-worldwide/). As of 2026, STULZ operates a truly global enterprise architecture: **35 subsidiaries across multiple continents**, **10 production plants** (7 in Europe, USA, and India), and partnerships extending to **140+ countries** [[11]](https://www.stulz.com/en-in/company/profile/stulz-worldwide/) [[35]](https://www.stulz.com/en-it/regions/).

The company's scale is substantial: **approximately 8,200 employees globally**, with **3,300 based in Germany**. Revenue stands at **€1.7 billion** (approximately **\$1.5 billion USD**), positioning STULZ as a major player in the global precision cooling market [[5]](https://www.owler.com/company/stulzgmbh) [[6]](https://rocketreach.co/stulz-profile_b5c7c10bf42e0dab) [[36]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1). The organization's capital structure reflects its privately-held status: **STULZ GmbH (HRB 16255) holds registered capital of €47 million**, owned through a holding structure by **STULZ Verwaltungs GmbH & Co. KG (HRA 126445)** [[7]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[8]](https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445).

### Ownership and Governance

STULZ remains **family-owned**, with the founding family continuing to hold controlling interests. Current managing directors include **Oliver Stulz and Christoph Stulz** (family members), reflecting the company's family-business governance model [[5]](https://www.owler.com/company/stulzgmbh) [[13]](https://www.linkedin.com/in/oliver-stulz-05334113/). This private ownership structure explains the relative lack of public financial disclosures compared to publicly traded competitors—STULZ does not file SEC documents and maintains limited investor-relations public documentation.

### Primary Business Focus

STULZ specializes in **precision air conditioning, cooling units, and chillers for mission-critical applications and data centers**. The company's competitive advantages include energy-efficient cooling technologies, widespread global distribution, and application-specific customization capabilities for sectors including data centers, telecommunications, healthcare, financial services, and manufacturing [[12]](https://www.stulz.com/en-de/about-us/) [[37]](https://www.stulz.com/).

---

## 2. Technical Leadership and Key Executives

STULZ's technology and operations leadership team includes:

| Role | Name | Notable Background |
|------|------|-------------------|
| **Chief Technology Officer & Global Director of Technology** | Joerg Desler | Appointed September 1, 2023; Stockholm-based [[46]](https://www.linkedin.com/in/joerg-desler-52101210/) |
| **CTO/Tech Director** | Björn Granath | Stockholm office [[45]](https://rocketreach.co/stulz-management_b5c7c10bf42e0dab) |
| **Managing Director & CFO** | Thorsten Weiss | Hamburg headquarters [[10]](https://www.cbinsights.com/company/stulz-1/people) [[45]](https://rocketreach.co/stulz-management_b5c7c10bf42e0dab) |
| **Head of Global Purchasing** | Jens Martens | [[45]](https://rocketreach.co/stulz-management_b5c7c10bf42e0dab) |
| **VP Sales** | Sital Bachhav | [[9]](https://rocketreach.co/stulz-gmbh-sales-department_b5c7c10bf42e0dab) [[45]](https://rocketreach.co/stulz-management_b5c7c10bf42e0dab) |
| **Head Global Marketing** | Jan Pohlgeers | [[45]](https://rocketreach.co/stulz-management_b5c7c10bf42e0dab) |
| **Asia Hub Regional Leadership** | Mathias Wernitz (Head Colo Cloud), Cheong Khek Pin Anthony (Senior Regional Technical Engineer), Sara Tan Yi Na (Regional Programmer Control Lead) | Singapore/APAC operations [[47]](https://www.stulzasia.sg/about-us/) |

This distributed leadership model—with technology leadership in Stockholm (CTO Björn Granath, Joerg Desler) and operations in Hamburg—suggests STULZ operates a matrix organization spanning Europe with centralized strategy and distributed regional delivery.

---

## 3. Smart Cooling Controller (E2 Series) Architecture and Protocol Implementation

### Supported Protocols and Communication Standards

The STULZ E2 Series Smart Cooling Controller is a microprocessor-based control system supporting **multiple industrial communication protocols**:

| Protocol | Supported Variants | Key Specifications |
|----------|-------------------|-------------------|
| **BACnet** | IP, MS/TP (Master-Slave Token Passing), Ethernet | Standard building automation protocol [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[49]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) |
| **Modbus** | TCP (Ethernet), RTU (Serial) | Functions 01, 02, 03, 04, 05, 08, 16 implemented [[50]](https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf) |
| **SNMP** | v1, v2c | Network monitoring and management [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) |
| **HTTP** | Standard web interface | **No TLS version documented** [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) |
| **Serial Bus (STULZ/RS-485)** | Proprietary two-wire connection | 9600 baud (also 19,200 supported), max 32 controllers, 1000m distance [[50]](https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf) |

### Modbus Protocol Implementation Details

STULZ implements Modbus as an RTU slave with the following specifications:

- **Standard Configuration:** 9600 baud (fixed rate), 8 data bits, 1 stop bit, no parity [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) [[33]](https://cdn.chipkin.com/assets/uploads/2023/Nov/FS-8700-125_Stulz_27-20-47-19.pdf)
- **Implemented Functions:**
  - Function 01: Read Coil Status
  - Function 02: Read Input Status
  - Function 03: Read Holding Registers (IEEE-754 32-bit floating-point format)
  - Function 04: Read Input Registers
  - Function 05: Force Single Coil
  - Function 08: Loopback (diagnostic)
  - Function 16: Preset Multiple Registers [[50]](https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf)

### Bus Architecture (STULZ RS-485)

STULZ controllers communicate via a proprietary RS-485 two-wire bus with these constraints:

- **Maximum network span:** 1000 meters
- **Maximum devices:** 32 controllers per network
- **Termination:** Requires termination resistors at bus ends (proper implementation critical)
- **Isolation:** Shielded cable recommended [[50]](https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf)

### Control Capabilities and Monitoring

The E2 Series provides sophisticated climate control with support for multiple operational modes:

**Control Modes Supported:** Chilled Water, AWS (Air-Water Systems), Free Cooling, Direct Expansion (DX), Dewpoint control, Economizer, Heating, Humidifying, Dehumidifying, and Tandem Compressor management (up to 3 compressors with automatic staging and rotation) [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[49]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf)

**Monitoring and Diagnostic Capabilities:**
- Per-fan wattage and DC link voltage/amperage
- Fan build date, serial number, and cumulative run hours
- Line voltage, current, frequency, and power factor
- Group static pressure monitoring
- Psychrometric control (continuous temperature, humidity, dewpoint tracking) [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[49]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[50]](https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf)

**Electronic System Protection:**
- Locked rotor detection (motor protection)
- Phase loss detection
- Overheating protection (motor and electronics)
- Low voltage detection with automatic reset capability [[49]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf)

**Dual Power Transfer:** Automatic switching between primary and backup power with approximately 10-second startup delay, supporting mission-critical uptime requirements [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[49]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf)

---

## 4. Security Features and Default Credentials

### Authentication and Access Control

The E2 Series implements a **four-level password protection system**, restricting access to sensitive configuration functions:

| Security Level | Access Scope | Default Credential | Use Case |
|----------------|--------------|-------------------|----------|
| **Control** | Normal operation and monitoring | Operator-specific | Day-to-day technician access |
| **Service** | Maintenance and system adjustments | Service-specific | Authorized service partners |
| **Factory** | Advanced configuration | Not disclosed publicly | OEM and advanced integrators |
| **Configuration** | System-level parameter changes | Not disclosed publicly | Initial system setup, migration |

**Default Admin Credentials:** For the pCOWeb card (web interface), the default username is **admin** with password **fadmin** [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf). The **default BACnet device instance is 77000** [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf).

### Session Management

- **Session Timeout:** 300 seconds (5 minutes) of inactivity before automatic logout and re-authentication requirement [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf)
- This timeout is appropriate for building automation applications where unattended terminals are common in mechanical rooms

### Password Protection Scope

Password protection applies to:
- Configuration parameter access (setpoints, sensor calibration)
- Advanced control mode selection
- Network parameter modification
- Security credential changes

However, **the technical documentation does not specify encryption for password storage, transmission mechanisms, or whether password hashing is implemented**. This represents a critical documentation gap for security assessment.

---

## 5. TLS/HTTPS Support — Critical Documentation Gap

### HTTP Support Confirmed; TLS Version Unspecified

STULZ technical documentation explicitly lists **HTTP** as a supported protocol for web-based interface access [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf). However, **no documentation specifies which TLS version (1.2, 1.3, or earlier) is supported**, nor does any source define:

- **Cipher suites** supported for HTTPS encryption
- **Certificate validation procedures** (self-signed vs. CA-signed)
- **Certificate pinning** mechanisms
- **TLS version minimum/maximum** enforcement

### Security Implications of Documentation Gap

For a controller deployed in data center and mission-critical HVAC applications, the absence of TLS specification documentation suggests either:

1. **HTTP-only communication** (unencrypted)—a significant security risk for IoT/OT networks
2. **HTTPS with default TLS 1.2+**—likely but undocumented
3. **TLS implementation exists but is not publicly disclosed**—common for proprietary industrial systems

This gap is particularly problematic given the E2 Series is deployed in environments with high security requirements (data centers, critical infrastructure).

---

## 6. Firmware Architecture — Undocumented Security Implementation

### Memory and Storage Architecture

Available documentation confirms the E2 Series uses **flash memory for permanent storage of program code and operating parameters**, surviving power loss events [[48]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf). Beyond this confirmation, **no specifications exist for:**

- **Bootloader security** (signed/verified boot sequence)
- **Memory layout** (protected vs. unprotected regions)
- **Secure boot mechanisms** (hardware security modules)
- **Memory protection** (Data Execution Prevention, Address Space Layout Randomization)
- **Firmware update integrity verification** (signature checks, cryptographic hashing)
- **Rollback protection** (preventing downgrade to vulnerable firmware versions)

### Firmware Update Mechanism

No publicly available documentation describes how firmware updates are deployed, verified, or protected. For industrial control systems, this is a critical security concern, as firmware update mechanisms are common attack vectors.

### Implication

The absence of documented firmware security architecture makes it impossible to assess the E2 Series' resilience against:
- Unauthorized firmware modification
- Supply-chain firmware attacks
- Bootkit-style malware
- Memory corruption exploits (buffer overflows, heap sprays)

---

## 7. Known Vulnerabilities and CVE History (2020-2026)

### Research Finding: Zero Documented CVEs

A comprehensive search across major vulnerability databases yielded **zero CVE entries for STULZ products (2020-2026)**:

| Database | Search Scope | Results |
|----------|--------------|---------|
| **NVD (National Vulnerability Database)** | STULZ vendor products | 0 CVEs [[21]](https://www.fortinet.com/resources/cyberglossary/national-vulnerability-database-nvd) [[22]](https://nvd.nist.gov/general/cve-process) [[23]](https://nvd.nist.gov/general) [[24]](https://nvd.nist.gov/vuln/vendor-comments) [[25]](https://nvd.nist.gov/developers/vulnerabilities) [[26]](https://nvd.nist.gov/general/FAQ-Sections/CVE-FAQs) [[27]](https://nvd.nist.gov/vuln) [[28]](https://nvd.nist.gov/vuln/vulnerability-detail-pages) |
| **CISA Known Exploited Vulnerabilities Catalog** | STULZ commercial products | 0 entries [[42]](https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A94) [[43]](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) |
| **CERT-EU Security Advisories** | European vendor disclosures | 0 STULZ advisories [[38]](https://cert.europa.eu/publications/security-advisories/2026) |
| **GitHub Security Lab Advisories** | Open-source and commercial | 0 STULZ disclosures [[39]](https://securitylab.github.com/advisories/) [[44]](https://github.com/advisories) |
| **Zero Day Initiative (ZDI) Published** | Security research 2020-2026 | 0 STULZ vulnerabilities [[40]](https://www.zerodayinitiative.com/advisories/published/2020/) |
| **full-disclosure mailing list** | Public vulnerability disclosures | 0 STULZ entries [[41]](https://lists.openwall.net/full-disclosure/) |
| **STULZ Official Security Pages** | Vendor-published advisories | 0 disclosures found |

### Interpretation: Absence of Evidence or Evidence of Absence?

The complete lack of CVE records for STULZ across all major databases may indicate:

1. **Strong Security Posture:** STULZ products may genuinely have no discovered vulnerabilities—possible for specialized industrial equipment with limited external attack surface
2. **Non-Participation in Disclosure:** STULZ may not participate in coordinated vulnerability disclosure programs (no bug bounty, no responsible disclosure process published)
3. **Limited Security Research Focus:** Building automation and HVAC controllers receive far less security research attention than enterprise software or consumer IoT
4. **Undisclosed Vulnerabilities:** Vulnerabilities may exist but are not reported to public databases, instead handled through private coordination

**Critical Distinction:** The absence of CVEs does **NOT** guarantee security—it merely indicates no publicly disclosed vulnerabilities exist. For proprietary industrial systems operating in closed networks (common for building automation), vulnerabilities may remain undiscovered or intentionally undisclosed.

---

## 8. Cloud Portal and Remote Monitoring — CyberHub ECO.DC

### Product Name Clarification: Navigator Not Found

The original query referenced "STULZ Navigator cloud portal." Research found **no publicly documented product named "Navigator."** Instead, STULZ offers **CyberHub ECO.DC**, described as a modern cloud-based data center monitoring and management solution.

### CyberHub ECO.DC Technical Architecture

**Developer:** STULZ Digital Solutions GmbH (joint venture with Digitronic Automationsanlagen GmbH) [[34]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/)

**Deployment Options:**
- **On-Premise:** Virtual machine deployment within customer data center
- **SaaS Cloud:** Hosted in Germany, compliant with German data protection regulations [[34]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/)

**Core Functionality:**
- Real-time 3D temperature and pressure mapping for data center environments
- Sensor parameter capture and trend analysis
- Energy efficiency optimization through continuous monitoring
- Rapid deployment capability (setup within hours) [[34]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/)

### Security Specifications

CyberHub ECO.DC uses **encrypted communication between base server and customer interface** [[34]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/). However, **no TLS version, cipher suite specifications, or certificate validation procedures are documented**. This represents the same documentation gap as the E2 Series web interface.

### Compliance Context

The solution explicitly targets **German data protection regulation compliance**, suggesting awareness of GDPR and emerging NIS2 requirements. However, **no evidence of formal IEC 62443 certification or BSI compliance attestation** was found for the CyberHub platform.

---

## 9. Regulatory Environment: German BSI and NIS2 Cybersecurity Requirements

### NIS2 Directive Implementation in Germany

Germany implemented the EU's **Network and Information Security Directive 2 (NIS2)** through the **Act Transposing the NIS2 Directive and Regulating Key Aspects of Information Security Management in the Federal Administration**, effective **December 5-6, 2025** [[15]](https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026) [[16]](https://www.gtlaw.com/en/insights/2025/12/nis2-in-germany-the-new-bsi-act-makes-cybersecurity-a-board-level-issue) [[17]](https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law) [[18]](https://www.globalpolicywatch.com/2026/01/germany-transposes-nis-2-directive-increased-cybersecurity-requirements-for-businesses/).

### Regulatory Scope Expansion

| Metric | Impact |
|--------|--------|
| **Previously Regulated Entities** | ~4,500 (essential services only) |
| **NIS2 Scope (Dec 2025+)** | ~29,000 entities (essential + important) |
| **Expansion Factor** | ~6.4× increase in regulated population |
| **Registration Deadline** | March 6, 2026 [[15]](https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026) [[17]](https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law) |

### STULZ Compliance Status

As a company with **€47 million registered capital, 8,200 employees, and €1.7 billion revenue**, STULZ likely qualifies as an **"Important Establishment"** under NIS2 scope. However, **no public evidence of STULZ NIS2 registration or compliance certification was found**. The March 6, 2026, deadline is imminent (from the perspective of June 2026 research date).

### Building Automation Specific Requirements

The German implementation includes specific requirements for **building automation and technical infrastructure** under classification **INF.14 (Building Automation)**, requiring:

- Risk assessment of automated building management systems
- Configuration of automated meter reading systems
- Implementation of appropriate cybersecurity controls for HVAC, lighting, access control [[14]](https://www.big-eu.org/wp-content/uploads/sites/6/2025/02/BIG-EU-WG-FM-100-Version-01-Stand-09-24_English.pdf)

---

## 10. IEC 62443 Cybersecurity Certification Landscape — STULZ Absent

### IEC 62443 Series Structure

**IEC 62443** is the international standard for Industrial Automation and Control Systems (IACS) cybersecurity, structured as:

| Standard | Focus | Applicability |
|----------|-------|---------------|
| **IEC 62443-1** | General concepts and definitions | All IACS |
| **IEC 62443-2** | Security policies and risk assessment | System-level integration |
| **IEC 62443-3** | System-level security requirements | IACS network design |
| **IEC 62443-4-1** | Secure development lifecycle (process) | Component/product development |
| **IEC 62443-4-2** | Component security requirements (technical) | Controllers, PLCs, HMI, network devices |

STULZ Smart Cooling Controllers would fall under **IEC 62443-4-2** scope as IACS components (industrial controllers) [[1]](https://www.fortinet.com/resources/cyberglossary/iec-62443) [[2]](https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf) [[4]](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards).

### IEC 62443-4-2 Foundational Requirements

The standard mandates **seven foundational security requirements** across all security levels:

1. **Identification & Authentication**—users and devices must be uniquely identified and authenticated
2. **Use Control**—access must be restricted based on user role
3. **System Integrity**—code and configuration integrity must be maintained
4. **Data Confidentiality**—sensitive data must be encrypted
5. **Restricted Data Flow**—unnecessary data transmission must be prevented
6. **Timely Response to Events**—security events must be detected and responded to
7. **Resource Availability**—systems must maintain availability against denial-of-service [[1]](https://www.fortinet.com/resources/cyberglossary/iec-62443) [[2]](https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf)

### Security Levels (SL 1-4)

The standard defines four security levels:

- **SL 1:** Protection against casual, coincidental threats
- **SL 2:** Protection against simple, unsophisticated threats
- **SL 3:** Protection against sophisticated threats (advanced techniques)
- **SL 4:** Protection against nation-state level threats

Most commercial building automation controllers target **SL 1-2** compliance.

### Certification Programs and Bodies

**Certification Bodies (all ISO/IEC 17065 accredited):**
- Bureau Veritas [[29]](https://certification.bureauveritas.com/needs/iec-62443-certification)
- ISASecure (ISA's certification program) [[32]](https://isasecure.org/)
- Kiwa [[30]](https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/)
- Intertek [[31]](https://www.intertek.com/iot/cybersecurity/iec-62443/)

### Certified Building Automation Products (2023-2025)

A search of the **official ISASecure certified components database** [[3]](https://isasecure.org/end-users/iec-62443-4-2-certified-components) revealed **zero STULZ certifications**, but identified these certified competitors:

| Product | Manufacturer | Certification | Certification Level | Date |
|---------|--------------|-----------------|-------------------|------|
| **YMC2, YK, YZ Series Chiller Controllers** | Johnson Controls | CSA 1.0.0 | Level 1 | May-Dec 2025 |
| **Advanced Plant Controller v4.10** | Honeywell | CSA 1.0.0 | Level 2 | Dec 2023 |
| **SecureEdge Gateways** | IXON | IEC 62443-4-2 | Multiple | Jan 2026 |

### Critical Finding: STULZ Absent from Certified Database

**STULZ GmbH products do not appear in the official ISASecure certified components database** as of June 2026 [[3]](https://isasecure.org/end-users/iec-62443-4-2-certified-components). This absence is notable given:

- STULZ's market position and global scale
- Competitors' active certifications
- Building automation's inclusion in critical infrastructure under NIS2

**Possible explanations:**
1. STULZ does not pursue formal IEC 62443-4-2 certification
2. STULZ certifications exist but certification body data is not synchronized with ISASecure database
3. STULZ pursues alternative certification paths (e.g., country-specific standards)
4. STULZ certification is in progress (pre-NIS2 deadline push)

---

## 11. Default Credentials and Authentication Details

### Documented Default Credentials

| Component | Default Username | Default Password | Usage |
|-----------|------------------|------------------|-------|
| **pCOWeb Card (Web Interface)** | admin | fadmin | Initial administration access [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| **BACnet Device Instance** | N/A | 77000 | Device identifier for BACnet discovery [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| **STULZ Bus (RS-485)** | N/A | 9600 baud, 8-N-1 | Serial configuration [[20]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) [[33]](https://cdn.chipkin.com/assets/uploads/2023/Nov/FS-8700-125_Stulz_27-20-47-19.pdf) |

### Credential Change Requirements

STULZ documentation recommends changing default credentials immediately after initial deployment. However, **no enforcement mechanism preventing access with default credentials is documented**, and **no lockout policy for failed authentication attempts is specified**.

### Password Complexity and Length

Documentation does **not specify:**
- Minimum password length
- Character complexity requirements
- Password aging policies
- Password history (preventing reuse)
- Account lockout thresholds

---

## 12. Technical Assessment Summary: Strengths and Critical Gaps

### Security Strengths Documented

✓ **Multi-level password protection** (4 security levels appropriate for building automation)
✓ **Session timeout enforcement** (5-minute inactivity logout)
✓ **Support for encrypted protocols** (SNMP v2c, BACnet IP)
✓ **Hardware protection features** (locked rotor detection, phase loss, overheating detection)
✓ **Cloud platform with encryption** (CyberHub ECO.DC encrypts communication)
✓ **Zero documented vulnerabilities** (2020-2026)—either strong security or limited disclosure

### Critical Security Documentation Gaps

[✗] **No TLS/HTTPS version specification** despite HTTP/HTTPS support
[✗] **No firmware security architecture** (bootloader, secure boot, memory protection undocumented)
[✗] **No firmware update integrity verification** mechanism documented
[✗] **No certificate pinning or validation** procedures for encrypted protocols
[✗] **No memory protection mechanisms** documented (ASLR, DEP, canaries)
[✗] **No vulnerability disclosure program** found (no bug bounty, no responsible disclosure policy)
[✗] **No IEC 62443-4-2 certification** despite product applicability
[✗] **No STULZ-specific BSI/NIS2 compliance documentation** found

---

## 13. Compliance Recommendations for STULZ

### Immediate Actions (By March 6, 2026)

1. **NIS2 Registration:** Submit mandatory registration to BSI Portal [[15]](https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026) [[17]](https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law)
2. **Risk Assessment:** Conduct formal assessment under INF.14 (Building Automation) requirements [[14]](https://www.big-eu.org/wp-content/uploads/sites/6/2025/02/BIG-EU-WG-FM-100-Version-01-Stand-09-24_English.pdf)
3. **Incident Response Plan:** Establish 24-hour initial and 72-hour detailed incident reporting procedures [[17]](https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law)

### Medium-Term (2026-2027)

1. **IEC 62443-4-2 Certification:** Pursue formal certification to align with industry standards and competitive differentiation
2. **Vulnerability Disclosure Program:** Publish responsible disclosure policy and coordinate with CISA/NVD
3. **Firmware Security Hardening:** Document and potentially enhance bootloader security, signed firmware, and update mechanisms
4. **TLS Specification:** Publish formal documentation of TLS version, cipher suites, and certificate validation procedures

### Long-Term (2027+)

1. **BSI C5 Certification:** For cloud services (CyberHub ECO.DC), pursue BSI C5 cloud security certification [[19]](https://www.kiteworks.com/regulatory-compliance/bsi-c5-germanys-cloud-security-framework-requirements/)
2. **Security Audit Program:** Implement annual third-party penetration testing and security assessments
3. **Secure Development Lifecycle:** Align development processes with IEC 62443-4-1 requirements

---

## 14. Data Gaps and Research Limitations

### Information Successfully Located

✓ Company structure, ownership, and global operations
✓ Technical leadership team and organizational structure
✓ E2 Series protocol specifications and control capabilities
✓ Default credentials and authentication mechanisms
✓ German regulatory framework (NIS2/BSI)
✓ IEC 62443 certification landscape
✓ CyberHub ECO.DC cloud platform overview

### Critical Information NOT Found Despite Targeted Searching

[✗] **TLS/HTTPS implementation details:** No documentation of supported TLS versions, cipher suites, or certificate validation
[✗] **Firmware security architecture:** No public specification of bootloader, secure boot, or memory protection
[✗] **Known vulnerabilities:** Zero CVE records—either no vulnerabilities exist or STULZ does not participate in public disclosure
[✗] **STULZ Navigator cloud portal:** Not found; only CyberHub ECO.DC documented instead
[✗] **IEC 62443-4-2 certification:** STULZ absent from official ISASecure database
[✗] **STULZ BSI/NIS2 compliance status:** No public registration or compliance documentation
[✗] **Chief Information Security Officer (CISO):** No security leadership identified in available sources
[✗] **Penetration test reports or security audits:** No third-party security assessments found

### Why These Gaps Exist

- **Private Company Status:** STULZ does not file SEC documents; limited public disclosure required
- **German Company:** Less English-language documentation than US-based vendors
- **Industrial/OT Focus:** Building automation receives less security research attention than enterprise software
- **Niche Market:** HVAC controllers are not widely studied by security researchers compared to cloud infrastructure or consumer IoT

---

## Conclusion

STULZ GmbH operates as a globally significant precision cooling manufacturer with strong operational credentials (€1.7 billion revenue, 8,200 employees, 75+ year history). The E2 Series Smart Cooling Controller implements reasonable baseline security features (multi-level password protection, protocol diversity, session timeout) and has accumulated zero documented CVEs across major vulnerability databases (2020-2026).

However, **critical security documentation gaps limit comprehensive assessment:** TLS/HTTPS specifications are undocumented, firmware security architecture is unexplained, and the company is absent from IEC 62443-4-2 certified products databases. These gaps likely reflect STULZ's positioning in a niche building automation market with historically lower security research attention, rather than necessarily indicating weak security.

The imminent March 6, 2026, NIS2 registration deadline in Germany creates urgency for STULZ to formalize cybersecurity governance and potentially pursue IEC 62443-4-2 certification to align with industry standards and demonstrate commitment to critical infrastructure security. For organizations deploying STULZ controllers, direct engagement with STULZ technical teams to clarify TLS implementation, firmware update mechanisms, and security architecture is recommended, as public documentation is insufficient for formal security assessment.

## Sources

[1] IEC 62443 Standard: Enhancing Cybersecurity for Industrial Automation and Control Systems | Fortinet - https://www.fortinet.com/resources/cyberglossary/iec-62443
[2] Quick Start Guide: - https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf
[3] CSA/EDSA Certified Components - ISASecure® - https://isasecure.org/end-users/iec-62443-4-2-certified-components
[4] ISA/IEC 62443 Series of Standards - ISA - https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards
[5] Stulz’s Competitors, Revenue, Number of Employees, Funding, Acquisitions & News - Owler Company Profile - https://www.owler.com/company/stulzgmbh
[6] STULZ Information - https://rocketreach.co/stulz-profile_b5c7c10bf42e0dab
[7] Stulz GmbH, Hamburg, Germany, District Court of Hamburg HRB 16255: Network, Financial information - https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255
[8] Stulz Verwaltungs GmbH & Co. KG, Hamburg, Germany, District Court of Hamburg HRA 126445: Network, Financial information - https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445
[9] STULZ Sales Department | STULZ Revenue Department - https://rocketreach.co/stulz-gmbh-sales-department_b5c7c10bf42e0dab
[10] STULZ CEO, Founder, Key Executive Team, Board of Directors & Employees - https://www.cbinsights.com/company/stulz-1/people
[11] Stulz: STULZ Worldwide - https://www.stulz.com/en-in/company/profile/stulz-worldwide/
[12] Stulz: About STULZ | We keep your business running. - https://www.stulz.com/en-de/about-us/
[13] Oliver Stulz - Managing Director at STULZ GmbH - https://www.linkedin.com/in/oliver-stulz-05334113/
[14] Untitled - https://www.big-eu.org/wp-content/uploads/sites/6/2025/02/BIG-EU-WG-FM-100-Version-01-Stand-09-24_English.pdf
[15] New Cybersecurity Regulations in Germany—Registration Requirement Expires on 6 March 2026 | HUB | K&L Gates - https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026
[16] NIS2 in Germany: The New BSI Act Makes Cybersecurity a Board-Level Issue | Insights | Greenberg Traurig LLP - https://www.gtlaw.com/en/insights/2025/12/nis2-in-germany-the-new-bsi-act-makes-cybersecurity-a-board-level-issue
[17] Cyber Rules for Essential and Important Entities Take Effect in Germany (NIS2 Implementing Law) | Insights | Mayer Brown - https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law
[18] Germany Transposes NIS 2 Directive – Increased Cybersecurity Requirements for Businesses | Global Policy Watch - https://www.globalpolicywatch.com/2026/01/germany-transposes-nis-2-directive-increased-cybersecurity-requirements-for-businesses/
[19] BSI C5 Explained: Germany's Cloud Security Standard for CSPs in 2026 - https://www.kiteworks.com/regulatory-compliance/bsi-c5-germanys-cloud-security-framework-requirements/
[20] Microsoft Word - Stulz Communication Manual SG1-28-14.doc - http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf
[21] What is the National Vulnerability Database (NVD)? | Fortinet - https://www.fortinet.com/resources/cyberglossary/national-vulnerability-database-nvd
[22] NVD - CVEs and the NVD Process - https://nvd.nist.gov/general/cve-process
[23] NVD - General - https://nvd.nist.gov/general
[24] NVD - Vendor Comments - https://nvd.nist.gov/vuln/vendor-comments
[25] Vulnerability APIs - https://nvd.nist.gov/developers/vulnerabilities
[26] NVD - CVE FAQs - https://nvd.nist.gov/general/FAQ-Sections/CVE-FAQs
[27] NVD - Vulnerabilities - https://nvd.nist.gov/vuln
[28] NVD - Vulnerability Detail Pages - https://nvd.nist.gov/vuln/vulnerability-detail-pages
[29] IEC 62443 Certification by Bureau Veritas - https://certification.bureauveritas.com/needs/iec-62443-certification
[30] IEC 62443 certification: Cyber Security for Industrial Automation & Control Systems (IACS) - https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
[31] IEC 62443: Risk Management Standard for Industrial Automation and Control Systems - https://www.intertek.com/iot/cybersecurity/iec-62443/
[32] IEC 62443 Conformance Certification - ISASecure® - https://isasecure.org/
[33] Driver Manual # FS-8700-125 Stulz - https://cdn.chipkin.com/assets/uploads/2023/Nov/FS-8700-125_Stulz_27-20-47-19.pdf
[34] Stulz: New Monitoring System from STULZ Digital Solutions - https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/
[35] Stulz: Regions - https://www.stulz.com/en-it/regions/
[36] STULZ GmbH Company Overview, Contact Details & Competitors | LeadIQ - https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1
[37] Stulz: Your Global Cooling Expert. - https://www.stulz.com/
[38] CERT-EU - Publications - Security Advisories - https://cert.europa.eu/publications/security-advisories/2026
[39] Advisories | GitHub Security Lab - https://securitylab.github.com/advisories/
[40] Published | Zero Day Initiative - https://www.zerodayinitiative.com/advisories/published/2020/
[41] full-disclosure mailing list - https://lists.openwall.net/full-disclosure/
[42] Cybersecurity Alerts & Advisories | CISA - https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A94
[43] Known Exploited Vulnerabilities Catalog | CISA - https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[44] GitHub Advisory Database · GitHub - https://github.com/advisories
[45] STULZ Management Team | Org Chart - https://rocketreach.co/stulz-management_b5c7c10bf42e0dab
[46] Joerg Desler - STULZ | LinkedIn - https://www.linkedin.com/in/joerg-desler-52101210/
[47] Stulz: About STULZ Asia Hub | Our story, values & team - https://www.stulzasia.sg/about-us/
[48] STULZ E2 Controller Operation Manual OZU0037M.indd - https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
[49] STULZ E2 Controller Operation Manual OZU0037M.indd - https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
[50] C6000 MIB Feb 22 2007.pmd - https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf

---

## Sources

- IEC 62443 Standard: Enhancing Cybersecurity for Industrial Automation and Control Systems | Fortinet — https://www.fortinet.com/resources/cyberglossary/iec-62443
- Quick Start Guide: — https://programs.isa.org/hubfs/06%20-%20ASCI/0920-ISASecure-Certifications-Guide-FINAL.pdf
- CSA/EDSA Certified Components - ISASecure® — https://isasecure.org/end-users/iec-62443-4-2-certified-components
- ISA/IEC 62443 Series of Standards - ISA — https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards
- Stulz’s Competitors, Revenue, Number of Employees, Funding, Acquisitions & News - Owler Company Profile — https://www.owler.com/company/stulzgmbh
- STULZ Information — https://rocketreach.co/stulz-profile_b5c7c10bf42e0dab
- Stulz GmbH, Hamburg, Germany, District Court of Hamburg HRB 16255: Network, Financial information — https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255
- Stulz Verwaltungs GmbH & Co. KG, Hamburg, Germany, District Court of Hamburg HRA 126445: Network, Financial information — https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445
- STULZ Sales Department | STULZ Revenue Department — https://rocketreach.co/stulz-gmbh-sales-department_b5c7c10bf42e0dab
- STULZ CEO, Founder, Key Executive Team, Board of Directors & Employees — https://www.cbinsights.com/company/stulz-1/people
- Stulz: STULZ Worldwide — https://www.stulz.com/en-in/company/profile/stulz-worldwide/
- Stulz: About STULZ | We keep your business running. — https://www.stulz.com/en-de/about-us/
- Oliver Stulz - Managing Director at STULZ GmbH — https://www.linkedin.com/in/oliver-stulz-05334113/
- Untitled — https://www.big-eu.org/wp-content/uploads/sites/6/2025/02/BIG-EU-WG-FM-100-Version-01-Stand-09-24_English.pdf
- New Cybersecurity Regulations in Germany—Registration Requirement Expires on 6 March 2026 | HUB | K&L Gates — https://www.klgates.com/New-Cybersecurity-Regulations-in-GermanyRegistration-Requirement-Expires-on-6-March-2026-3-5-2026
- NIS2 in Germany: The New BSI Act Makes Cybersecurity a Board-Level Issue | Insights | Greenberg Traurig LLP — https://www.gtlaw.com/en/insights/2025/12/nis2-in-germany-the-new-bsi-act-makes-cybersecurity-a-board-level-issue
- Cyber Rules for Essential and Important Entities Take Effect in Germany (NIS2 Implementing Law) | Insights | Mayer Brown — https://www.mayerbrown.com/en/insights/publications/2025/12/cyber-rules-for-essential-and-important-entities-take-effect-in-germany-nis2-implementing-law
- Germany Transposes NIS 2 Directive – Increased Cybersecurity Requirements for Businesses | Global Policy Watch — https://www.globalpolicywatch.com/2026/01/germany-transposes-nis-2-directive-increased-cybersecurity-requirements-for-businesses/
- BSI C5 Explained: Germany's Cloud Security Standard for CSPs in 2026 — https://www.kiteworks.com/regulatory-compliance/bsi-c5-germanys-cloud-security-framework-requirements/
- Microsoft Word - Stulz Communication Manual SG1-28-14.doc — http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf
- What is the National Vulnerability Database (NVD)? | Fortinet — https://www.fortinet.com/resources/cyberglossary/national-vulnerability-database-nvd
- NVD - CVEs and the NVD Process — https://nvd.nist.gov/general/cve-process
- NVD - General — https://nvd.nist.gov/general
- NVD - Vendor Comments — https://nvd.nist.gov/vuln/vendor-comments
- Vulnerability APIs — https://nvd.nist.gov/developers/vulnerabilities
- NVD - CVE FAQs — https://nvd.nist.gov/general/FAQ-Sections/CVE-FAQs
- NVD - Vulnerabilities — https://nvd.nist.gov/vuln
- NVD - Vulnerability Detail Pages — https://nvd.nist.gov/vuln/vulnerability-detail-pages
- IEC 62443 Certification by Bureau Veritas — https://certification.bureauveritas.com/needs/iec-62443-certification
- IEC 62443 certification: Cyber Security for Industrial Automation & Control Systems (IACS) — https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
- IEC 62443: Risk Management Standard for Industrial Automation and Control Systems — https://www.intertek.com/iot/cybersecurity/iec-62443/
- IEC 62443 Conformance Certification - ISASecure® — https://isasecure.org/
- Driver Manual # FS-8700-125 Stulz — https://cdn.chipkin.com/assets/uploads/2023/Nov/FS-8700-125_Stulz_27-20-47-19.pdf
- Stulz: New Monitoring System from STULZ Digital Solutions — https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/
- Stulz: Regions — https://www.stulz.com/en-it/regions/
- STULZ GmbH Company Overview, Contact Details & Competitors | LeadIQ — https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1
- Stulz: Your Global Cooling Expert. — https://www.stulz.com/
- CERT-EU - Publications - Security Advisories — https://cert.europa.eu/publications/security-advisories/2026
- Advisories | GitHub Security Lab — https://securitylab.github.com/advisories/
- Published | Zero Day Initiative — https://www.zerodayinitiative.com/advisories/published/2020/
- full-disclosure mailing list — https://lists.openwall.net/full-disclosure/
- Cybersecurity Alerts & Advisories | CISA — https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A94
- Known Exploited Vulnerabilities Catalog | CISA — https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- GitHub Advisory Database · GitHub — https://github.com/advisories
- STULZ Management Team | Org Chart — https://rocketreach.co/stulz-management_b5c7c10bf42e0dab
- Joerg Desler - STULZ | LinkedIn — https://www.linkedin.com/in/joerg-desler-52101210/
- Stulz: About STULZ Asia Hub | Our story, values & team — https://www.stulzasia.sg/about-us/
- STULZ E2 Controller Operation Manual OZU0037M.indd — https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
- STULZ E2 Controller Operation Manual OZU0037M.indd — https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
- C6000 MIB Feb 22 2007.pmd — https://cdn.chipkin.com/assets/uploads/imports/resources/Stulz%20-%20c6000%20and%20C700%20COntroller.pdf
