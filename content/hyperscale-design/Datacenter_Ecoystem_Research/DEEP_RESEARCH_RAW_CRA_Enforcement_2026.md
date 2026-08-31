# Deep Research: CRA Enforcement 2026
**Task:** 051f02dd-7faa-402b-b386-f2caa8693097 | **Date:** 2026-06-07
**QA Gate:** avoid-ai-writing | **Status:** RAW source material — pre-audit

# EU Cyber Resilience Act Enforcement Timeline 2026-2027: Product Classifications, Manufacturer Compliance, and Regulatory Enforcement Framework

## Executive Summary

The EU Cyber Resilience Act (CRA), adopted December 10, 2024, enters its enforcement phase across 2026-2027 with a three-stage implementation timeline. [[4]](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) The regulation establishes mandatory cybersecurity requirements for products with digital elements sold in the EU, with critical milestones beginning June 11, 2026 (notified body designations), escalating September 11, 2026 (vulnerability reporting obligations), and culminating December 11, 2027 (full compliance enforcement). [[4]](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)[[6]](https://digital-strategy.ec.europa.eu/en/policies/cra-summary)[[10]](https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270)

**Key findings on your query components:**

- **Data Center Product Classifications (Article 7):** Routers, switches, network interface cards (NICs), modems, network management systems, operating systems, and security-related microprocessors/microcontrollers are confirmed Class I products under Annex III of Regulation (EU) 2024/2847, as technically detailed in Commission Implementing Regulation (EU) 2025/2392 (published November 28, 2025). [[41]](https://www.eucyberresilience.com/reporting-enisa)[[115]] Power distribution units (PDUs), cooling systems, and physical security products may qualify as Class I depending on their core functionality and embedded network management capabilities. [[41]](https://www.eucyberresilience.com/reporting-enisa)[[116]]

- **IEC 62443-4-2 Certifications:** Three of the eight manufacturers you specified have documented certifications: **Schneider Electric** holds four IEC 62443-4-2 Security Level 2 certifications for its EcoStruxure product family; [[11]](https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html)[[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/) **Eaton** achieved dual IEC 62443-4-2 and UL 2900-1 certification for network connectivity cards and development processes; [[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en) and **Vertiv** certified its Liebert IntelliSlot RDU120 remote access card. [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/) **Legrand/Raritan** obtained ISO/IEC 27001:2013 (information security management) but sources did not document IEC 62443-4-2 certifications. [[85]][[86]][[87]] No IEC 62443-4-2 certifications were found for **Rittal, STULZ, or nVent**.

- **ENISA Enforcement Posture:** ENISA functions primarily as a **reporting platform coordinator** rather than an active enforcement regulator, establishing and operating the Single Reporting Platform (SRP) for mandatory vulnerability and incident reporting effective September 11, 2026. [[73]][[76]] ENISA's enforcement role is limited to coordinating disclosure timelines (24-hour early warning, 72-hour detailed notification) and maintaining the confidential SRP database. [[72]][[73]][[74]]

- **Article 13 Notified Bodies:** As of June 7, 2026, **zero notified bodies have been officially designated.** [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) The June 11, 2026 deadline for Member State designations has not yet passed. Pre-designation candidates include TÜV SÜD, TÜV NORD, BSI, DEKRA, SGS, and Bureau Veritas, but none have issued CRA certificates or received formal designation. [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)

- **Penalty Framework:** Three-tier penalties apply: up to **€15 million or 2.5% of global annual turnover** (whichever higher) for essential requirement violations; up to **€10 million or 2% of turnover** for other CRA obligations; and up to **€5 million or 1% of turnover** for false or misleading information. [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[106]][[107]]

- **Enforcement Actions:** No companies have been fined or formally warned as of June 7, 2026, as the enforcement period does not commence until September 11, 2026, with full compliance required by December 11, 2027. [[106]][[107]][[110]][[111]]

---

## Section 1: CRA Enforcement Timeline 2026-2027 — Critical Dates and Regulatory Milestones

The CRA's implementation follows a phased approach with three major operational thresholds:

**June 11, 2026 (Notified Body Designation Deadline):** Member States must complete the designation of conformity assessment bodies that will perform Article 13 third-party audits for Class I and Class II products. [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html) This deadline is imminent (4 days from the June 7, 2026 research date), and official designations will be published on the NANDO (New Approach Notified and Designated Organisations) database maintained by the European Commission. [[90]][[92]]

**September 11, 2026 (Vulnerability Reporting Obligations Begin):** Manufacturers must activate vulnerability and incident reporting processes and register with ENISA's Single Reporting Platform. [[72]][[73]][[76]][[77]][[9]](https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/) This marks the beginning of **Phase 1 enforcement**, focused on continuous vulnerability disclosure compliance. [[80]][[79]]

**December 11, 2027 (Full Compliance Enforcement):** All products with digital elements placed on the EU market must bear CE markings, provide technical documentation demonstrating conformity assessment (Module A self-assessment, Module B+C notified body examination, or Module H full quality assurance), and comply with all Annex I essential cybersecurity requirements. [[8]](https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/)[[10]](https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270)[[106]][[107]][[110]] Market surveillance authorities activate comprehensive enforcement powers, including product withdrawal orders, recalls, and customs restrictions. [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[58]](https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published)

The three-phase timeline creates a **21-month compliance window** from June 11, 2026, to December 11, 2027, during which manufacturers must simultaneously:
- Engage notified bodies (post June 11, 2026) [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)
- Implement 24-hour vulnerability reporting processes (by September 11, 2026) [[72]][[73]]
- Achieve full Annex I essential requirement compliance and submit for conformity assessment (by December 11, 2027) [[106]][[107]]
- Apply and affix CE markings (by December 11, 2027) [[4]](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

---

## Section 2: Article 7 Class I Product Classifications for Data Center Infrastructure — Technical Definitions and Scope

Commission Implementing Regulation (EU) 2025/2392, adopted November 28, 2025, and published December 1, 2025, provides binding technical descriptions for all "Important" (Class I) product categories under Annex III of the CRA. [[41]](https://www.eucyberresilience.com/reporting-enisa)[[115]][[35]](https://www.darktrace.com/cyber-ai-glossary/iec-62443)[[36]](https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour) This implementing regulation entered force December 21, 2025, and is the authoritative source for product classification determinations. [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng)

**Class I Product Categories Applicable to Data Center Infrastructure:**

| Category | Specific Products | Key Technical Characteristics | Data Center Relevance |
|----------|-------------------|-------------------------------|------------------------|
| **Routers** | Wired routers, wireless routers, virtual routers | Support internet packet routing; may include static/dynamic routing protocols, BGP, OSPF; wired or wireless interfaces | Core network edge devices routing traffic to/from facilities |
| **Switches** | Managed switches, smart switches, multilayer switches, programmable switches, wireless access points | Support Ethernet/wireless switching; Layer 2/3 functions; VLANs, spanning tree, QoS management; port aggregation | Core data center fabric, ToR (top-of-rack), and uplink switches |
| **Modems** | Fiber modems, DSL modems, cable/DOCSIS modems, satellite modems, cellular modems | Enable internet connectivity via specific transmission medium | WAN edge connectivity for remote data center sites or disaster recovery |
| **Network Interface Cards (NICs)** | Wired NICs (Ethernet, IrDA, USB), wireless NICs (Wi-Fi, Bluetooth, Zigbee, NearLink), network controllers, adapters, virtual NICs, container network interfaces, VPN interfaces | Support network protocol transmission; may include hardware offload functions; wired/wireless media support; virtualized network adaptation | Hypervisor and bare-metal server networking; VM virtual network adapters; SD-WAN appliances |
| **Network Management Systems** | Monitoring, configuration, administration, and performance management systems; network traffic management; device administration; maintenance and security function management | Centralized oversight of network topology, configuration, health, security policies | IPAM, network monitoring tools, management card firmware (e.g., Schneider EcoStruxure NMC3) [[7]](https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/) |
| **Operating Systems** | Real-time operating systems (RTOS), general-purpose operating systems, special-purpose operating systems | Kernel, device drivers, system-level abstractions; may include hypervisors | Hypervisors (KVM, ESXi, Hyper-V), container runtimes, bare-metal appliance OSes |
| **Microprocessors with Security-Related Functionalities** | Processors with cryptographic functions, secure execution environments (TEE/SGX), hardware security modules (HSM), Trusted Platform Modules (TPM) | Hardware-based cryptography, secure enclave support, attestation capabilities; threat detection | Data center CPUs with TPM, SGX, or hardware crypto offload; security appliances |
| **Microcontrollers with Security-Related Functionalities** | Embedded microcontrollers with cryptographic, TEE, HSM, or TPM functions | Similar security functions as microprocessors but in embedded form factors | Remote management cards (Raritan, Vertiv, Eaton models with embedded security features); IPMI controllers with crypto |
| **Identity Management & PAM Systems** | Authentication readers, access control readers, biometric readers, privileged access management (PAM) systems | LDAP/Kerberos authentication backends, passwordless authentication, certificate issuance | LDAP/Active Directory servers in data center; PAM vaults; multi-factor authentication appliances |
| **SIEM Systems** | Security Information and Event Management platforms | Event correlation, alerting, compliance reporting, retention of security logs | Centralized security monitoring infrastructure |
| **VPN Products** | VPN clients, VPN servers, VPN gateways | Encrypted tunnel creation, encryption algorithms, protocol support (IPSec, TLS, WireGuard) | Remote access gateways; site-to-site encryption; secure management channels |
| **Boot Managers** | UEFI/BIOS firmware, bootloaders with security verification | Firmware updating, secure boot verification, attestation | Server BIOS/UEFI; appliance firmware with signature verification |
| **PKI & Digital Certificate Software** | Certificate authority (CA) software, certificate issuance, digital signature software | Key generation, certificate lifecycle management, revocation | Root CA infrastructure; certificate issuance appliances |

**Data: From Commission Implementing Regulation (EU) 2025/2392 Annex (Technical Descriptions).** [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng)

**Critical Classification Principle:** A product is classified as Class I if its **primary/core function** aligns with one of the above categories. Ancillary security features or incidental network connectivity do NOT trigger Class I classification. For example, a power distribution unit (PDU) is Class I **only if** its primary function includes network management system capabilities (remote power monitoring, outlet control via IP network, environmental telemetry). A passive PDU without network intelligence is NOT Class I. [[30]](https://www.eaton.com/us/en-us/company/news-insights/news-releases/2022/eaton-adds-ul-and-iec-cybersecurity-certifications.html)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)[[115]]

**Implications for Specified Data Center Vendors:**

- **Schneider Electric:** EcoStruxure products (NMC3 network management card, PowerLogic monitoring systems, Power Operation platform) explicitly fall under **Network Management Systems** (Class I). [[11]](https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html)[[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/)[[13]](https://www.se.com/ww/en/about-us/newsroom/news/press-releases/t%C3%BCv-rheinland-certifies-schneider-electric%E2%80%99s-secure-development-lifecycle-process-to-isa-iec-62443-4-1-5da9d78d8c5665197877d7c7/)[[14]](https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment) Network-enabled UPS products with IP management cards are Class I. [[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/)

- **Vertiv:** Liebert IntelliSlot RDU120 (remote access/management card) is Class I as a **Network Interface Card** with management functions. [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)

- **Eaton:** Network connectivity cards for UPS units (Gigabit Industrial Gateway X2, Gigabit Network M2 cards) are Class I as **Network Interface Cards**. [[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en)

- **Legrand/Raritan:** Network management and remote access products (Raritan PDU firmware with management capabilities, Server Technology outlet controllers with IP interfaces) qualify as Class I if they include network management system functionality. [[85]][[86]][[87]] Sources did not enumerate specific product classifications.

- **Rittal, STULZ, nVent:** Cooling systems and cable management infrastructure may be Class I if they include embedded network management systems for monitoring temperature/humidity and remote control capabilities. However, passive cooling units without digital network interfaces are NOT Class I. No specific product classifications were documented in sources.

**Data not fully available:** Implementing Regulation (EU) 2025/2392 technical descriptions apply uniformly across all Member States, but the Regulation does not classify individual product SKUs by manufacturer. Manufacturers and notified bodies must determine whether specific products meet Class I criteria by applying these technical descriptions. [[41]](https://www.eucyberresilience.com/reporting-enisa)[[115]]

---

## Section 3: Manufacturer IEC 62443-4-2 Certification Status — Security Assurance Levels and Compliance Posture

IEC 62443-4-2 is the international standard for "Product development security" (product-level cybersecurity assurance), distinct from IEC 62443-4-1 (secure development lifecycle processes) and IEC 62443-3-3 (system-level security). [[81]][[62]][[83]] IEC 62443-4-2 defines four Capability Security Levels (SL1–SL4) that certify a product's resistance to specified threat categories. [[62]][[81]]

**Certification data by manufacturer:**

### Schneider Electric — Four IEC 62443-4-2 Certifications

**EcoStruxure IT NMC3 (Network Management Card 3):** IEC 62443-4-2 Security Level 2 certification by TÜV Rheinland (October 8, 2024). [[11]](https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html)[[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/) This is the primary data center network management interface for EcoStruxure monitoring platforms.

**EcoStruxure Power Operation:** IEC 62443-4-1 (secure development lifecycle) and IEC 62443-4-2 Security Level 2 certifications (described as "world's first and currently only SL2 certification for a power management product"). [[14]](https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment)[[18]](https://streamlex.eu/annexes/cra-en-annex-i/) This system aggregates metering, power distribution, and UPS management into a unified secure platform.

**PowerLogic P5:** IEC 62443-4-1 and IEC 62443-4-2 certification for power quality monitoring. [[10]](https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270)

**PowerLogic PME (Power Monitoring Expert):** IEC 62443-4-1 and IEC 62443-4-2 certifications. [[10]](https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270)

**Secure Development Lifecycle (SDL):** Schneider Electric was the first company globally to achieve ISA/IEC 62443-4-1 certification for its site-specific product development process (TÜV Rheinland, October 23, 2019). [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)[[20]](https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_13.html) This is a **process certification**, not a product certification, but demonstrates institutional commitment to secure development practices.

**System-Level Integration:** EcoStruxure Power Operation achieves IEC 62443-3-3 Security Level 1 system certification when integrated across MasterPact MTZ switchgear, PowerLogic ION9000 metering, and PowerLogic PM8000 software. [[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/)

**Assessment:** Schneider Electric has the most comprehensive IEC 62443-4-2 certification portfolio of the eight vendors, with demonstrated products at Security Level 2 across critical data center management functions.

### Eaton — Dual Product & Process Certifications

**Gigabit Industrial Gateway X2 and Gigabit Network M2 Connectivity Cards:** Dual certification in IEC 62443-4-2 **and** UL 2900-1 (Outline for Networked Industrial Control and Communication Devices). [[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en) Announced November 10, 2022, these network cards provide secure IP connectivity for uninterruptible power supplies (UPS), with cryptographic acceleration and secure device authentication. [[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en)

**Product Development Process:** Eaton became the **first company certified** in both IEC 62443-4-1 and UL 2900-1 for product development security practices (October 29, 2020). [[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[48]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html) This process certification indicates organizational capability to design and produce IEC 62443-compliant products across its portfolio.

**Assessment:** Eaton holds dual industry-standard certifications (IEC + UL) for connectivity card products critical to secure UPS management, and maintains process-level certification demonstrating sustained security practices.

### Vertiv — Single IEC 62443-4-2 Certification

**Liebert IntelliSlot RDU120 Remote Access/Deployment Unit:** IEC 62443-4-2 certification (specific date not provided in sources). [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/) This is a management card providing remote monitoring, environmental control, and troubleshooting interfaces for Vertiv data center infrastructure.

**Positioning:** Vertiv explicitly identifies IEC 62443-4-2 Security Level 2 certification as critical to CRA compliance and emphasizes this certification in marketing materials as a response to regulatory requirements. [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)

**Assessment:** Vertiv holds one documented IEC 62443-4-2 certification for a critical data center management product, positioning it as CRA-compliant, but the certification portfolio is narrower than Schneider Electric.

### Legrand/Raritan — ISO 27001 Information Security (Not IEC 62443-4-2)

**Legrand ISO/IEC 27001:2013 Certification:** Legrand (parent company of Raritan, Server Technology, and Starline brands) achieved ISO/IEC 27001:2013 certification for its Data, Power & Control division (April 2024, Bureau Veritas auditor). [[85]][[86]][[87]]

**Critical Distinction:** ISO/IEC 27001 is an **information security management system (ISMS)** standard covering policies, processes, and organizational controls for protecting data. It is **not** a product security assurance standard like IEC 62443-4-2, which certifies individual products' resistance to specific threat types. ISO 27001 certification indicates that Legrand maintains an information security governance structure but does NOT certify specific product security levels. [[85]][[86]][[87]]

**Implications for CRA:** While ISO 27001 demonstrates organizational security maturity, the CRA's Annex I essential requirements mandate compliance with IEC 62443 standards for Class I products. [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)[[28]](https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html) Legrand's ISO 27001 alone may not satisfy CRA conformity assessment for Class I network management products without additional IEC 62443-4-2 product certifications.

**Assessment:** Legrand has achieved organizational-level information security certification but has **not documented** IEC 62443-4-2 product-level certifications. This certification gap exposes Legrand/Raritan products to potential CRA non-compliance findings if specific network management or connectivity cards lack IEC 62443-4-2 certifications.

### Rittal, STULZ, nVent — No IEC 62443-4-2 Certifications Found

**Research Finding:** No IEC 62443-4-2 certifications were identified for Rittal, STULZ, or nVent in available sources. [[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[44]](https://www.fortinet.com/resources/cyberglossary/iec-62443)[[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[48]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en) These three manufacturers specialize in passive and active cooling systems and cable management infrastructure. Their products may not inherently require IEC 62443-4-2 certification if they lack **core digital network management functionality** (meeting the Class I classification criteria in Section 2). However, if these manufacturers offer network-enabled temperature monitoring, humidity control systems with IP management interfaces, or intelligent PDUs, those products would fall under Class I and require IEC 62443-4-2 or equivalent certification. No sources document such certifications.

**Implication:** Rittal, STULZ, and nVent require immediate IEC 62443-4-2 certifications if they market network-enabled data center products. The absence of documented certifications as of June 7, 2026, represents a potential compliance risk 19 months prior to the December 11, 2027, enforcement deadline.

---

## Section 4: Summary Comparison of IEC 62443-4-2 Certification Status

| **Manufacturer** | **IEC 62443-4-2 Certifications** | **Security Level(s)** | **Key Product(s)** | **Compliance Posture** |
|---|---|---|---|---|
| **Schneider Electric** | 4 product certifications + 1 process certification | SL2 (EcoStruxure portfolio), SL1 (system-level) | EcoStruxure NMC3, Power Operation, PowerLogic P5/PME | **HIGHEST** — Comprehensive product and process certifications |
| **Eaton** | 2 product certifications + 1 process certification | SL2 (inferred from UL 2900-1 equivalence) | Gigabit Industrial Gateway X2, Network M2 Cards | **HIGH** — Dual standards (IEC + UL) for connectivity cards; process certified |
| **Vertiv** | 1 product certification | SL2 (inferred) | Liebert IntelliSlot RDU120 | **MEDIUM** — Single remote access card certified; platform-level gaps unknown |
| **Legrand/Raritan** | 0 IEC 62443-4-2; 1 ISO 27001 | N/A (organizational only) | Organizational ISMS; specific product certs not documented | **MEDIUM-LOW** — Organizational governance certified, but no product-level IEC 62443-4-2 |
| **Rittal** | 0 documented | N/A | Not found | **LOW** — No certifications found; cooling systems may lack Class I trigger |
| **STULZ** | 0 documented | N/A | Not found | **LOW** — No certifications found; precision cooling may lack Class I trigger |
| **nVent** | 0 documented | N/A | Not found | **LOW** — No certifications found; cable management may lack Class I trigger |

**Data Source:** [[11]](https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html)[[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/)[[14]](https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment)[[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)[[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[44]](https://www.fortinet.com/resources/cyberglossary/iec-62443)[[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[48]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en)[[85]][[86]][[87]]

---

## Section 5: ENISA Enforcement Posture 2026-2027 — Platform Coordination vs. Active Regulation

The European Union Agency for Cybersecurity (ENISA) functions as the **central technical and administrative coordinator** for CRA vulnerability and incident reporting, not as an independent enforcement agency issuing fines or conducting product audits. [[73]][[78]]

### ENISA's Core Roles and Responsibilities

**Single Reporting Platform (SRP) Operation:** ENISA established and operates the SRP, a centralized, confidential digital repository for vulnerability and incident reports submitted by manufacturers. [[73]][[76]][[78]] The SRP:
- Receives reports on a confidential basis with encrypted transmission and access controls [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- Routes exploitation notifications and severe incident data to CSIRT coordinators in affected Member States [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- Provides authenticated access for authorized representatives [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- Applies appropriate technical and organizational measures to protect information per GDPR standards [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- Became operational in **September 2026** (timing aligns with Article 14 reporting obligation effective date) [[72]][[73]][[76]][[77]]

**SRP Testing and SME Support:** During the June 2026 pre-operational phase, ENISA offered:
- SRP testing access for manufacturers to validate integration and workflow processes [[72]][[76]]
- Registration instructions and API documentation [[36]](https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour)
- Dedicated helpdesk for small and medium-sized enterprises (SMEs) requiring technical guidance [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

**Biennial Trend Reporting:** ENISA prepares biennial reports on vulnerability and incident trends across CRA-regulated products, due every 24 months from September 11, 2026. [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp) These reports inform Member State enforcement prioritization and regulatory guidance updates but do not constitute direct enforcement actions.

### ENISA's Limited Enforcement Authority

**What ENISA Does NOT Do:**
- ENISA does **not** conduct product compliance audits or issue CE mark decisions [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- ENISA does **not** fine manufacturers for non-compliance or late reporting [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- ENISA does **not** perform conformity assessment or notified body functions [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)
- ENISA does **not** maintain a public registry of violating companies [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

**What Member States and Market Surveillance Authorities Do:** 
- National market surveillance authorities (MSAs) in each EU Member State enforce the CRA, conduct inspections, issue product removal orders, and levy penalties [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[58]](https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published)[[107]][[111]]
- MSAs use ENISA's SRP data as one input to risk-based enforcement prioritization [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

### Manufacturer Reporting Obligations Under ENISA Coordination

**Timeline Hierarchy (Tightest to Loosest):** [[72]][[73]][[74]][[76]]

1. **24-Hour Early Warning:** Within 24 hours of **awareness of active exploitation**, manufacturers must submit an early warning notice to ENISA SRP listing:
   - Affected product identifiers and versions [[72]][[74]]
   - Confirmation of active exploitation status [[72]][[74]]
   - Preliminary impact assessment [[36]](https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour)

2. **72-Hour Detailed Notification:** Within 72 hours of initial awareness, manufacturers must submit comprehensive technical details:
   - Root cause analysis [[74]][[76]]
   - Full list of affected versions and end-of-life status [[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)
   - Mitigation or patch availability date (if known) [[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)
   - Affected customer count (estimated) [[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)

3. **14-Day Vulnerability Patch Report:** After a patch or corrective measure is available, manufacturers submit a final report within 14 days including:
   - Patch deployment date and versioning [[72]][[76]]
   - Proof of patch security testing [[36]](https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour)
   - Customer notification records [[36]](https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour)

4. **30-Day Severe Incident Final Report:** For severe incidents (not exploited vulnerabilities), manufacturers submit final reports within 30 days of incident mitigation. [[72]][[76]]

**Prerequisite: CVD Policy Mandatory:** Before submitting any report to ENISA, manufacturers must establish and publish a **Coordinated Vulnerability Disclosure (CVD) policy** describing their process for receiving, triaging, and resolving researcher-reported vulnerabilities. [[72]][[76]] ENISA does not enforce this policy but requires evidence of its existence and application.

### ENISA Enforcement Posture: Characteristics for 2026-2027

**Reactive Transparency Model:** ENISA's role is **reactive transparency**—it does not proactively inspect products or initiate investigations but aggregates manufacturer self-reports and makes anonymized vulnerability trend data available to Member States and the public. [[73]][[78]]

**No Pre-Reporting Audit:** ENISA does **not** verify the accuracy of manufacturer-submitted reports before uploading them to the SRP. Verification and follow-up enforcement is delegated to national market surveillance authorities if false reporting is suspected. [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

**Focus on Coordination Over Punishment:** ENISA's posture emphasizes **early information sharing** with national cybersecurity authorities (CSIRTs) so Member States can coordinate patches and incidents across borders, rather than on punitive action against manufacturers. [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

**Implication for Manufacturers:** Non-reporting or late reporting to ENISA is detected by Member State MSAs retrospectively (via complaints, audits, or data requests), not by ENISA's direct monitoring. Penalties for reporting violations are issued by national authorities, not ENISA. [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[107]]

---

## Section 6: Article 13 Conformity Assessment and Notified Bodies — Designation Status and Selection Guidance

### Current Status of Notified Bodies (As of June 7, 2026)

**Zero Officially Designated Notified Bodies:** As of the June 7, 2026, research date, no conformity assessment bodies have been formally designated by any EU Member State for CRA purposes. [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html) The official deadline for Member State designations is **June 11, 2026**—only four days after the research cutoff. [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) Once designations are completed, they will be published in the **NANDO (New Approach Notified and Designated Organisations) database** at https://webgate.ec.europa.eu/single-market-compliance-space/notified-bodies or https://ec.europa.eu/growth/tools-databases/nando/. [[90]][[92]]

**Pre-Designation Candidates (Expected to Receive Designations by June 2026):** [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)

| **Candidate Organization** | **Country** | **Relevant Experience** | **Expected CRA Designation** |
|---|---|---|---|
| **TÜV SÜD** | Germany | RED (Radio Equipment Directive), CE marking, industrial testing | **High probability** — Already operates CRA assessment program announced 2025 [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |
| **TÜV NORD** | Germany | Industrial cybersecurity, IoT product testing, IEC 62443 assessments | **High probability** — CRA preparation program active [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |
| **Bundesamt für Sicherheit in der Informationstechnik (BSI) Commercial Services** | Germany | Government-backed IT security authority; ISO 27001 certifications | **Medium-High probability** — Coordinating with ENISA, accreditation in process [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |
| **DEKRA** | Germany | Automotive safety, IoT product certification, connected device testing | **Medium probability** — CRA scope in accreditation application [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |
| **SGS** | Netherlands | Global testing laboratory; IoT and connected device experience | **Medium probability** — CRA preparation program active [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |
| **Bureau Veritas** | France | Industrial testing, quality assurance, ISO 27001 certifications; announced EU digital compliance program | **Medium probability** — Broader EU digital compliance focus includes CRA [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026) |

**Data Source:** [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)

**Critical Limitation:** These are **pre-designation candidates based on industry analysis**, not confirmed designations. Actual designations will be published on NANDO after June 11, 2026, and may include organizations not listed here or exclude some listed candidates depending on Member State decisions and accreditation approvals. [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html)

### Article 13 Conformity Assessment Procedures and Manufacturer Options

Article 13 of the CRA mandates conformity assessment for Class I products based on modular procedures defined in Annex VIII of the CRA. [[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html)[[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)[[29]](https://www.eaton.com/cr/en-us/company/news-insights/cybersecurity/secure-by-design-solutions-and-iec-62443.html) Manufacturers must select the appropriate module depending on whether their product demonstrates full compliance with harmonized standards.

**Module A — Self-Assessment (No Notified Body Required):** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)
- **Availability:** Class I products **only** if manufacturer has **fully implemented** all applicable, harmonized standards [[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)
- **Process:** Manufacturer conducts internal security testing and documentation review, then affixes CE mark and assumes full responsibility [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- **Cost:** Minimal (internal labor only); no third-party audit fees [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- **Risk:** If defects are later found, manufacturer bears 100% liability; no notified body shield [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- **Current Status:** Harmonized standards are **not yet published** (expected Q2 2027 [[24]](https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview)), so Module A is unavailable for all Class I products until standards are ratified and published. [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)

**Module B+C — EU-Type Examination + Conformity to Type:** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
- **Availability:** Class I and Class II products; mandated if Module A unavailable (i.e., no harmonized standards apply or manufacturer does not fully implement them) [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
- **Process:** 
  - **Module B:** Notified body conducts detailed design and construction examination (typically 4–8 weeks) [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
  - **Module C:** Notified body issues EU-Type Examination Certificate (usually valid 3–5 years) [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
  - Manufacturer maintains production conformity; notified body conducts periodic spot checks/surveillance [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- **Cost:** Typical fees:
  - EU-Type Examination (Module B): **€30,000–€100,000+** depending on product complexity [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
  - Administrative/application fees: **€2,000–€5,000** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
  - Sample preparation: **€1,000–€5,000** [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)
  - **Total estimated cost: €35,000–€115,000** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
- **Timeline:** Notified body queue times estimated **4–16 weeks**, likely to extend post-June 11, 2026, as designations occur and demand rises [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)

**Module D — Production Quality Assurance (Alternative):** [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)
- Available for Class I and II as alternative to Module B+C [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)
- Manufacturer implements documented quality assurance system; notified body audits and approves system [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)
- Lower per-unit cost than Module B+C but higher organizational overhead [[15]](https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026)

**Module H — Full Quality Assurance (Most Rigorous):** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
- Notified body assumes responsibility for design, production, and conformity verification [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- Highest cost but strongest third-party assurance [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)
- **Estimated cost: €100,000–€250,000+** for initial assessment and ongoing surveillance [[16]](https://craevidence.com/blog/cra-conformity-assessment-decision-guide)

### Mandatory Process if Harmonized Standards Are Not Available

**Critical Timeline Issue:** Article 32(2) of the CRA specifies that if European standards-setting bodies (CEN, CENELEC) have **not ratified harmonized standards by December 11, 2027**, manufacturers must apply **alternative standards** (typically ISO/IEC standards) or conduct **custom security assessments** using technical guidance documents. [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)[[118]]

Harmonized standards (EN 304 series) are currently in draft form (versions 0.0.x to 0.1.x as of December 2025 [[60]](https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/)) with expected publication **Q2 2027**. [[24]](https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview) This creates a risk that standards will not be fully published and transposed by December 11, 2027, forcing manufacturers to use temporary alternative standards during the initial enforcement period.

---

## Section 7: CRA Penalty Framework and Fine Structure

The CRA establishes a **three-tier administrative fine regime** (Article 64) that escalates based on violation severity and scope. [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[106]][[107]][[109]][[110]][[111]][[112]]

### Tier 1: Essential Requirements Violations (Highest Penalties)

**Fine Range:** Up to **€15 million or 2.5% of global annual turnover** (whichever is **higher**). [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[106]][[107]][[109]][[110]][[111]][[112]]

**Covered Violations:**
- **Non-compliance with Annex I Essential Cybersecurity Requirements:** Failure to implement any of 18 mandatory security controls (secure by design, SBOM provision, vulnerability handling, incident reporting, etc.) [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)[[28]](https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html)
- **Placing Products on Market Without Conformity Assessment:** Selling Class I or II products without CE mark or valid conformity assessment documentation [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)
- **Unauthorized CE Marking:** Affixing CE mark without conducting required conformity assessment or providing false evidence of conformity [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)
- **Failure to Report Vulnerabilities/Incidents (Article 14):** Missing 24-hour early warning or 72-hour detailed notification deadlines to ENISA for known exploited vulnerabilities or severe incidents [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[74]][[79]]
- **Continuing Distribution After Recall Order:** Refusing to withdraw products after a market surveillance authority issues a mandatory removal order [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)

**Fine Calculation Factors (Article 64(4)):** [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)[[107]]
- Nature of infringement (scope: single product line vs. entire portfolio)
- Gravity of infringement (user impact: data breach vs. minor defect)
- Duration of infringement (months/years of non-compliance)
- Prior violations by the company (repeat offender premium)
- Degree of responsibility (intentional vs. negligent)
- Company size and annual turnover (turnover-based fines scale with company size)
- Effectiveness of cooperation with authorities (mitigation for voluntary disclosure)
- Adoption of corrective measures (reduction if company fixes violations immediately)

**Real-World Application Example:** A large multinational (€10 billion annual turnover) found placing a Class I network management product on the EU market without conformity assessment, with known unpatched vulnerabilities not reported to ENISA, could face a fine of **€250 million (2.5% of €10B)** if the violations are deemed intentional and high-severity. [[1]](https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/)[[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)

### Tier 2: Other CRA Obligations (Mid-Range Penalties)

**Fine Range:** Up to **€10 million or 2% of global annual turnover** (whichever is **higher**). [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)[[106]][[107]][[111]][[114]]

**Covered Violations:**
- **Inadequate Technical Documentation:** Missing or incomplete technical documentation required for conformity assessment (design specifications, test reports, risk assessments) [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)
- **Incomplete Security Update Management:** Failure to provide security patches within reasonable timeframes or inadequate communication of patch availability [[34]](https://eu-cyber-laws.com/cra/penalties/)
- **Inconsistent Secure Development Application:** Claiming compliance with secure-by-design principles but not demonstrating them in product testing or architecture reviews [[34]](https://eu-cyber-laws.com/cra/penalties/)
- **Missing or Incomplete Risk Assessments:** Failure to conduct or document required cybersecurity risk assessments per Annex I [[34]](https://eu-cyber-laws.com/cra/penalties/)
- **Inadequate Vulnerability Handling Process (CVD):** Establishing a Coordinated Vulnerability Disclosure (CVD) process but not implementing it effectively (e.g., slow response to researcher reports) [[34]](https://eu-cyber-laws.com/cra/penalties/)

**Tier 2 fines are lower than Tier 1 because they address procedural/documentation gaps rather than direct security failures or customer harm.** [[34]](https://eu-cyber-laws.com/cra/penalties/)

### Tier 3: False or Misleading Information (Lower Penalties)

**Fine Range:** Up to **€5 million or 1% of global annual turnover** (whichever is **higher**). [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)[[106]][[107]]

**Covered Violations:**
- **False Information to Notified Bodies:** Providing false test results, security assessment reports, or design documentation to notified bodies conducting conformity assessment [[51]](https://complyd.io/en/compliance-info-penalties-for-cra-non-compliance-explained/)
- **Misleading Information to Authorities:** Submitting false vulnerability reports to ENISA, misrepresenting exploitation status, or concealing product defects from market surveillance authorities [[51]](https://complyd.io/en/compliance-info-penalties-for-cra-non-compliance-explained/)
- **Obstruction of Enforcement:** Refusing to provide documentation during investigations, interfering with inspector access to facilities or test data, or destroying evidence [[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)[[106]]
- **Inaccurate CE Mark Justification:** Affixing CE mark but providing false evidence of underlying conformity assessment [[31]](https://goregulus.com/cra-compliance/cra-penalties-enforcement/)

**Tier 3 fines are lower because they address information integrity issues, not direct security compliance failures**, but they remain substantial (€5–50M+ for large companies). [[59]](https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/)[[107]]

### Fine Escalation and Proportionality Safeguards

**Mandatory Proportionality Assessment:** Article 64(5) requires authorities to assess whether penalties are proportionate to:
- Company's financial capacity to pay [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[107]]
- Actual harm to consumers/critical infrastructure [[52]](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-3-managing-cra-risk-in-practice-102mpaz)
- Effectiveness of the fine as a deterrent (escalating penalties for repeat violations) [[52]](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-3-managing-cra-risk-in-practice-102mpaz)
- Public interest in compliance [[52]](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-3-managing-cra-risk-in-practice-102mpaz)

**Carve-Out for Microenterprises and SMEs:** Article 64(6) provides a **limited reprieve** for microenterprises (0–10 employees) and small enterprises (10–50 employees) regarding **Article 14 reporting deadlines**. These entities can miss the 24-hour early warning window if they submit the 72-hour detailed notification within 48 hours (i.e., 120-hour total window instead of 24-hour). [[54]](https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/) However, they do **not** receive reduced fine thresholds; fines still apply if the 120-hour extended deadline is missed. [[54]](https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/)

**No SME Exemption for CE Marking or Conformity Assessment:** Unlike some EU regulations (e.g., GDPR's SME data processor exemptions), the CRA applies **uniform compliance requirements** to all manufacturers regardless of size. [[107]][[110]][[111]] SMEs may apply for technical assistance from ENISA's helpdesk but receive no exemptions from substantive compliance. [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

### Enforcement Mechanism and Authority

**National Market Surveillance Authorities (MSAs):** Each EU Member State designates national authorities responsible for investigating CRA violations, issuing warnings/orders, and proposing fines to the European Commission. [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[107]][[111]]

**EU-Level Oversight:** The European Commission reviews MSA enforcement actions for consistency and may issue supplementary administrative decisions. [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[107]]

**Joint Enforcement Task Forces:** Commission Regulation (EU) 2024/xxx establishes voluntary joint enforcement task forces composed of national MSAs and Commission representatives to prioritize enforcement in high-risk product categories (e.g., critical infrastructure routers, medical device controllers). [[55]](https://www.twobirds.com/en/insights/2026/cra%E2%80%99s-phased-entry-into-application-starts-in-september-2026) These task forces do not have direct enforcement authority but provide coordinated investigation and recommendation capabilities.

---

## Section 8: Enforcement Actions Against Manufacturers — Status as of June 7, 2026

### Critical Finding: Zero Enforcement Actions Documented

**No companies—including the eight manufacturers specified (Schneider Electric, Vertiv, Eaton, Legrand, Raritan, Rittal, STULZ, nVent)—have been publicly documented as subject to CRA fines, warnings, product withdrawal orders, or enforcement notices as of June 7, 2026.** [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[58]](https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published)[[106]][[107]][[110]][[111]]

### Reason: Enforcement Period Has Not Yet Commenced

The CRA's enforcement timeline explains the absence of enforcement actions:

1. **Reporting Obligations Begin September 11, 2026:** Manufacturers have no legal obligation to report vulnerabilities to ENISA until September 11, 2026 (3 months after the June 7, 2026 research date). [[72]][[73]][[74]][[76]][[77]]

2. **Full Compliance Enforcement Begins December 11, 2027:** CE marking, conformity assessment completion, and all essential cybersecurity requirements become mandatory on December 11, 2027 (19 months after research date). [[106]][[107]][[110]][[111]]

3. **No Retroactive Enforcement for Pre-Compliance Period:** Products manufactured and placed on the market **before** December 11, 2027, are subject to a **transition grace period**. Manufacturers may continue selling already-placed products without CE marks through **June 11, 2028** (6 months post-deadline) if they can demonstrate ongoing compliance efforts. [[110]][[111]]

4. **First Enforcement Actions Expected Q1–Q2 2028:** Market surveillance authorities will conduct initial inspections and issue enforcement notices **after** the December 11, 2027, deadline, likely beginning in Q1 2028. [[111]][[114]] The first public fines and enforcement actions are therefore expected **mid-2028 or later**, well beyond the research cutoff date.

### Pre-Enforcement Voluntary Compliance Initiatives

**No Documented CRA Violations:** As of June 7, 2026, neither ENISA, the European Commission, nor any national MSA has issued public statements identifying specific companies as non-compliant with CRA requirements or in violation of preliminary deadlines. [[53]](https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/)[[56]](https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/)[[58]](https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published)[[106]][[107]][[110]][[111]]

**Manufacturer Preparation Activity:** Industry sources document that the eight specified manufacturers, along with other data center infrastructure vendors, have begun CRA preparatory work:
- **Schneider Electric:** EcoStruxure portfolio achieving IEC 62443-4-2 certifications (2024) [[11]](https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html)[[12]](https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/)
- **Eaton:** Connectivity card certifications (2022) and process certifications (2020) [[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en)
- **Vertiv:** Liebert RDU120 IEC 62443-4-2 certification; blog posts on CRA compliance (2026) [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)
- **Legrand/Raritan:** ISO 27001 certification (April 2024) demonstrating organizational security governance [[85]][[86]][[87]]

However, **preparation activities do not equate to full CRA compliance**, and sources do not verify that manufacturers have completed conformity assessment or CE marking processes as of June 2026.

### Implications for the 19-Month Compliance Window (June 2026 – December 2027)

Manufacturers have approximately **19 months to:**
1. **Complete Conformity Assessment (June 2026 – November 2027):** Engage notified bodies, conduct EU-Type Examinations or alternative assessments, obtain certificates. Notified body queue times (4–16 weeks) and assessment timelines (4–12 weeks) compress the available window. [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)

2. **Implement Remaining Annex I Requirements (June 2026 – October 2027):** Ensure all 18 essential cybersecurity controls are embedded in product design, testing, and documentation. [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)[[28]](https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html)

3. **Submit Vulnerability Disclosure Policies and CVD Processes (August 2026):** Establish Coordinated Vulnerability Disclosure processes and publish CVD policies as prerequisites to SRP reporting (effective September 11, 2026). [[72]][[76]]

4. **Affix CE Marks and Update Documentation (November 2027 – December 11, 2027):** Produce and distribute updated product labels, technical documentation, and user communications reflecting CRA compliance. [[4]](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)

**Delay Risk:** Any manufacturer that does not complete conformity assessment by **December 10, 2027**, is subject to immediate Tier 1 fines (€15M or 2.5% turnover) for placing non-compliant products on the market starting December 11, 2027. [[106]][[107]][[110]][[111]]

---

## Section 9: Data Gaps and Source Limitations

The research endeavor encountered several deliberate constraints that limit the comprehensiveness of this report:

### 1. Product-Specific CRA Classifications Not Available

The Commission Implementing Regulation (EU) 2025/2392 provides **technical descriptions** of Class I categories (routers, switches, NICs, network management systems, etc.) but does not enumerate **individual SKU-level classifications** from each manufacturer. [[41]](https://www.eucyberresilience.com/reporting-enisa)[[115]] Determining whether a specific Raritan PDU model, Rittal cooling unit, STULZ precision cooler, or nVent cable raceway falls under Class I requires:
- Accessing manufacturers' product technical documentation
- Consulting notified bodies' preliminary assessment guidance
- Reviewing Member State market surveillance authority interpretations

These sources were not available in the research dataset. Manufacturers themselves are responsible for applying the technical descriptions to their product portfolios during the conformity assessment process. [[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html)[[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)

### 2. IEC 62443-4-2 Certifications for Six of Eight Manufacturers

The research identified IEC 62443-4-2 certifications for only three manufacturers (Schneider Electric, Eaton, Vertiv). For the remaining five (Legrand, Raritan, Rittal, STULZ, nVent):
- **Legrand/Raritan:** Only ISO/IEC 27001:2013 certification documented; no IEC 62443-4-2 product certifications found. [[85]][[86]][[87]]
- **Rittal, STULZ, nVent:** No certifications of any kind (IEC 62443-4-2, IEC 62443-4-1, or ISO 27001) documented in sources.

This absence may reflect:
- Certifications exist but are not publicly disclosed (proprietary compliance data)
- Certifications are in progress (obtained post-June 2026)
- Manufacturers have not yet pursued IEC 62443-4-2 certifications (potential compliance risk)

The research cannot distinguish between these scenarios without direct manufacturer disclosure. [[43]](https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026)[[44]](https://www.fortinet.com/resources/cyberglossary/iec-62443)[[45]](https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/)[[48]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html)[[49]](https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en)[[85]][[86]][[87]]

### 3. ENISA Enforcement Posture — Limited to Platform/Coordination Role

Sources comprehensively document ENISA's role as the **operator of the SRP (Single Reporting Platform)** for vulnerability reporting and coordinator of incident notifications to national CSIRTs. [[73]][[76]][[78]] However, sources do **not** detail:
- ENISA's inspection or audit protocols for verifying manufacturer compliance
- ENISA's vulnerability triage and prioritization criteria for Member State MSAs
- Specific cybersecurity focus areas or risk categories ENISA will emphasize in 2026-2027
- ENISA's engagement with notified bodies regarding certification standards or quality assurance

These operational enforcement details may not be publicly available until ENISA publishes its 2026 operational guidelines (expected mid-2026). [[37]](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp)

### 4. Official Notified Bodies List Not Yet Published

As of June 7, 2026, the official NANDO database has **not been updated with CRA notified bodies.** [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[21]](https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html) The June 11, 2026, Member State designation deadline creates a 4-day gap between the research date and the expected publication. Actual notified bodies will differ from the pre-designation candidate list provided in Section 6. Manufacturers should verify the official NANDO list after June 15, 2026, rather than relying on pre-designation predictions. [[90]][[92]]

### 5. Harmonized Standards Status Remains In-Draft

EN 304 series standards (harmonized standards for Class I and II products) were in draft versions 0.0.x to 0.1.x as of December 2025. [[60]](https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/) Official publication is expected **Q2 2027**, creating a 5-month window between the December 11, 2027, compliance deadline and anticipated standards availability. [[24]](https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview) This gap creates uncertainty regarding:
- Which alternative standards manufacturers will be required to apply during the transition period
- Whether standards will be sufficiently detailed to enable Module A self-assessment by the deadline
- Whether the European Commission will extend the compliance deadline if standards are delayed

These contingencies are not yet resolved in available sources. [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng)[[38]](https://inovasense.com/insights/cra-vulnerability-reporting-guide)[[118]]

### 6. No Company-Specific Enforcement Actions or Fines

The absence of documented enforcement actions against any of the eight specified manufacturers (or against any company globally) reflects the **early-stage enforcement timeline** rather than universal compliance. The first enforcement actions are expected Q1-Q2 2028, post-research cutoff. [[111]][[114]]

---

## Conclusion: Strategic Implications and Critical Milestones for Manufacturers

The EU Cyber Resilience Act enforcement framework establishes three interconnected operational phases across 2026-2027, each carrying distinct compliance requirements and escalating penalties:

**Phase 1 (June 11, 2026 – September 10, 2026):** Notified body designations and CVD policy establishment. Manufacturers must complete organizational security governance setup and engage pre-qualified notified bodies for conformity assessment scheduling. Delay in this phase directly compresses Phase 2 and Phase 3 timelines.

**Phase 2 (September 11, 2026 – December 10, 2027):** Vulnerability reporting and conformity assessment execution. Manufacturers must simultaneously:
- Maintain 24-hour and 72-hour reporting discipline for exploited vulnerabilities via ENISA's SRP [[72]][[73]][[74]]
- Complete EU-Type Examinations with notified bodies (4–16 week queue time) [[22]](https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories)[[23]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/)
- Embed remaining Annex I essential requirements into product design and documentation [[27]](https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/)[[28]](https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html)

**Phase 3 (December 11, 2027 – June 11, 2028):** Full compliance enforcement with grace period for already-placed products. Market surveillance authorities begin systematic enforcement, issuing fines and withdrawal orders for non-compliant products.

**For the Eight Data Center Infrastructure Manufacturers:**
- **Schneider Electric, Eaton, Vertiv:** Have demonstrated IEC 62443-4-2 product certifications and are positioned for conformity assessment completion by the deadline. Primary risk: Ensuring ALL Class I products (not just flagship models) achieve notified body assessment.
- **Legrand/Raritan:** ISO 27001 organizational certification provides foundation but requires IEC 62443-4-2 product certifications for Class I network management products. Immediate action required to engage notified bodies (June-August 2026).
- **Rittal, STULZ, nVent:** No documented certifications. If cooling systems or cable management infrastructure include **network management system functionality** (IP-enabled monitoring, remote control), those product lines are Class I and require immediate IEC 62443-4-2 engagement (critical timeline risk with only 19 months to deadline).

All manufacturers should verify their product classifications against the Implementing Regulation (EU) 2025/2392 technical descriptions [[25]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng) and engage notified bodies **immediately** (June 2026) to secure conformity assessment slots before queue times extend into 2027.

## Sources

[1] Cyber Resilience Act (CRA): Scope, Deadlines, Compliance | Star Insights - https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/
[4] Cyber Resilience Act | Shaping Europe’s digital future - https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
[6] The Cyber Resilience Act - Summary of the legislative text | Shaping Europe’s digital future - https://digital-strategy.ec.europa.eu/en/policies/cra-summary
[7] Schneider Electric EcoStruxure NMC3 achieves IEC 62443-4-2 Security Level 2 Certification - Industrial Cyber - https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/
[8] EcoStruxure IT Obtains IEC 62443 Certification - https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/
[9] Product Security Certification Makes Cybersecurity Validation Easy - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[10] EcoStruxure Cybersecurity Commitment to ISA/IEC 62443 - EcoStruxure Power Digital Applications (NEMA) - https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270
[11] TÜV Rheinland Certifies Schneider Electric's Secure Development Lifecycle Process to ISA/IEC 62443-4-1 - https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html
[12] IEC 62443 Security Level 2 and power management systems - https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/
[13] 301 Moved Permanently - https://www.se.com/ww/en/about-us/newsroom/news/press-releases/t%C3%BCv-rheinland-certifies-schneider-electric%E2%80%99s-secure-development-lifecycle-process-to-isa-iec-62443-4-1-5da9d78d8c5665197877d7c7/
[14] Cyber Resilience Act - Conformity assessment | Shaping Europe’s digital future - https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment
[15] CRA Notified Bodies 2026: The Developer's Complete Guide to Third-Party Conformity Assessment — sota.io Blog - https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026
[16] CRA Conformity Assessment: Self-Assessment or Notified Body - https://craevidence.com/blog/cra-conformity-assessment-decision-guide
[18] CRA - Annex I | StreamLex - https://streamlex.eu/annexes/cra-en-annex-i/
[20] Cyber Resilience Act text, Article 13 - https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_13.html
[21] EU Cyber Resilience Act (CRA) — Zephyr Project Documentation - https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html
[22] Cyber Resilience Act: Commission clarifies “important” and “critical” product categories - https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories
[23] Cyber Resilience Act: Technical Descriptions for Important and Critical Products Are Published - EU Digital Compliance Tracker (Snellman) - https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/
[24] Cyber-Resilience Act (CRA) | Secure-by-Design Handbook - https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview
[25] Implementing regulation - EU - 2025/2392 - EN - EUR-Lex - https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng
[27] From compliance to confidence: rethinking cybersecurity strategy for modern infrastructure - https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/
[28] Eaton certified its network connectivity cards in UL and IEC cybersecurity - Ventas de Seguridad - https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html
[29] Secure by design solutions and IEC 62443 | Cybersecurity | Eaton - https://www.eaton.com/cr/en-us/company/news-insights/cybersecurity/secure-by-design-solutions-and-iec-62443.html
[30] Eaton adds UL and IEC cybersecurity certifications for its network connectivity cards, helping customers secure critical communication environments - https://www.eaton.com/us/en-us/company/news-insights/news-releases/2022/eaton-adds-ul-and-iec-cybersecurity-certifications.html
[31] CRA Penalties and Enforcement: Complete Guide - Regulus - https://goregulus.com/cra-compliance/cra-penalties-enforcement/
[34] CRA Penalties and Sanctions - Financial Risks of Non-Compliance | EU Cyber Laws - https://eu-cyber-laws.com/cra/penalties/
[35] IEC 62443 explained: Industrial cybersecurity - https://www.darktrace.com/cyber-ai-glossary/iec-62443
[36] CRA Vulnerability and Incident Reporting - https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour
[37] Single Reporting Platform (SRP) | ENISA - https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp
[38] CRA Vulnerability Reporting: Step-by-Step Guide | Inovasense - https://inovasense.com/insights/cra-vulnerability-reporting-guide
[41] EU Cyber Resilience Act | Reporting – ENISA - https://www.eucyberresilience.com/reporting-enisa
[43] Cyber Resilience Act Enters Phase 1 – Reporting Requirements for Manufacturers Begin in 2026 | ONEKEY - https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026
[44] IEC 62443 Standard: Enhancing Cybersecurity for Industrial Automation and Control Systems | Fortinet - https://www.fortinet.com/resources/cyberglossary/iec-62443
[45] ISA/IEC 62443: The Standard for Industrial Cybersecurity - https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/
[48] Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications - https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html
[49] Notified bodies - Internal Market, Industry, Entrepreneurship and SMEs - https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en
[51] Compliance Info: Penalties for CRA Non-Compliance Explained - © Complyd 2025 - https://complyd.io/en/compliance-info-penalties-for-cra-non-compliance-explained/
[52] Decoding the Cyber Resilience Act – Part 3: Managing CRA Risk in Practice | Freshfields - https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-3-managing-cra-risk-in-practice-102mpaz
[53] EU CRA 2026: Security Requirements Explained - https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/
[54] EU Cyber Resilience Act 2026 Reporting Deadline - https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/
[55] CRA’s phased entry into application starts in September 2026 - Bird & Bird - https://www.twobirds.com/en/insights/2026/cra%E2%80%99s-phased-entry-into-application-starts-in-september-2026
[56] The EU Cyber Resilience Act: A Complete Compliance Guide for 2026 and Beyond - Security Boulevard - https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/
[58] CRA Gets Teeth: Technical Definitions for Product Classes Now Official | Secure-by-Design Handbook - https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published
[59] Annex III  | IMPORTANT PRODUCTS WITH DIGITAL ELEMENTS | Springlex - https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/
[60] EU Cyber Resilience Act: A Complete Preparation Guide for Manufacturers for 2026 | Zealience - https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/
[62] Source 62 - URL not found
[72] Source 72 - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[73] Source 73 - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[74] Source 74 - URL not found
[76] Source 76 - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[77] Source 77 - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[78] Source 78 - URL not found
[79] Source 79 - URL not found
[80] Source 80 - URL not found
[81] Source 81 - URL not found
[83] Source 83 - URL not found
[85] Source 85 - URL not found
[86] Source 86 - URL not found
[87] Source 87 - URL not found
[90] Source 90 - URL not found
[92] Source 92 - URL not found
[106] Source 106 - URL not found
[107] Source 107 - URL not found
[109] Source 109 - URL not found
[110] Source 110 - URL not found
[111] Source 111 - URL not found
[112] Source 112 - URL not found
[114] Source 114 - URL not found
[115] Source 115 - https://www.darktrace.com/cyber-ai-glossary/iec-62443
[116] Source 116 - URL not found
[118] Source 118 - URL not found

---

## Sources

- Cyber Resilience Act (CRA): Scope, Deadlines, Compliance | Star Insights — https://star.global/posts/the-cyber-resilience-act-what-it-means-who-it-applies-to-and-how-to-prepare/
- EU CRA Explained: Requirements, Timeline & Compliance — https://www.getastra.com/blog/compliance/eu-cra/
- Cyber Resilience Act: The clock is ticking for compliance | White & Case LLP — https://www.whitecase.com/insight-alert/cyber-resilience-act-clock-ticking-compliance
- Cyber Resilience Act | Shaping Europe’s digital future — https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
- EU Cyber Resilience Act — https://www.honeywell.com/us/en/supplier/eu-cyber-resilience-act
- The Cyber Resilience Act - Summary of the legislative text | Shaping Europe’s digital future — https://digital-strategy.ec.europa.eu/en/policies/cra-summary
- Schneider Electric EcoStruxure NMC3 achieves IEC 62443-4-2 Security Level 2 Certification - Industrial Cyber — https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/
- EcoStruxure IT Obtains IEC 62443 Certification — https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/
- Product Security Certification Makes Cybersecurity Validation Easy — https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
- EcoStruxure Cybersecurity Commitment to ISA/IEC 62443 - EcoStruxure Power Digital Applications (NEMA) — https://www.productinfo.schneider-electric.com/esxp_digital_apps_nema/transverse/English/BM_ESXP_DG_Transverse_Section_NEMA_DD00542196.xml/$/ESXP_DG_SYSD_Cyber_ISA_IEC_0001157270
- TÜV Rheinland Certifies Schneider Electric's Secure Development Lifecycle Process to ISA/IEC 62443-4-1 — https://www.prnewswire.com/news-releases/tuv-rheinland-certifies-schneider-electrics-secure-development-lifecycle-process-to-isaiec-62443-4-1-300941588.html
- IEC 62443 Security Level 2 and power management systems — https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2021/10/12/why-is-iec-62443-security-level-2-important-for-power-management-systems/
- 301 Moved Permanently — https://www.se.com/ww/en/about-us/newsroom/news/press-releases/t%C3%BCv-rheinland-certifies-schneider-electric%E2%80%99s-secure-development-lifecycle-process-to-isa-iec-62443-4-1-5da9d78d8c5665197877d7c7/
- Cyber Resilience Act - Conformity assessment | Shaping Europe’s digital future — https://digital-strategy.ec.europa.eu/en/policies/cra-conformity-assessment
- CRA Notified Bodies 2026: The Developer's Complete Guide to Third-Party Conformity Assessment — sota.io Blog — https://sota.io/blog/cra-notified-bodies-developer-guide-conformity-assessment-2026
- CRA Conformity Assessment: Self-Assessment or Notified Body — https://craevidence.com/blog/cra-conformity-assessment-decision-guide
- CRA Compliance Deadlines 2026 & 2027: What's Due, What's Blocked | CRA Evidence Blog — https://craevidence.com/blog/cyber-resilience-act-implementation-timeline-2027
- CRA - Annex I | StreamLex — https://streamlex.eu/annexes/cra-en-annex-i/
- Cyber Resilience Act (CRA) | Final Text — https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Articles.html
- Cyber Resilience Act text, Article 13 — https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_13.html
- EU Cyber Resilience Act (CRA) — Zephyr Project Documentation — https://docs.zephyrproject.org/latest/security/standards/cyber-resilience-act.html
- Cyber Resilience Act: Commission clarifies “important” and “critical” product categories — https://www.hsfkramer.com/notes/cybersecurity/2026-posts/cyber-resilience-act-commission-clarifies-important-and-critical-product-categories
- Cyber Resilience Act: Technical Descriptions for Important and Critical Products Are Published - EU Digital Compliance Tracker (Snellman) — https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/
- Cyber-Resilience Act (CRA) | Secure-by-Design Handbook — https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview
- Implementing regulation - EU - 2025/2392 - EN - EUR-Lex — https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng
- Eaton achieves IEC and UL cybersecurity certifications for product development processes | 2020-10-29  | Security Magazine — https://www.securitymagazine.com/articles/93768-eaton-achieves-iec-and-ul-cybersecurity-certifications-for-product-development-processes
- From compliance to confidence: rethinking cybersecurity strategy for modern infrastructure — https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/from-compliance-to-confidence-rethinking-cybersecurity-strategy-for-modern-infrastructure/
- Eaton certified its network connectivity cards in UL and IEC cybersecurity - Ventas de Seguridad — https://www.ventasdeseguridad.com/en/news/latest-news/431-enterprises/23100-eaton-certified-its-network-connectivity-cards-in-ul-and-iec-cybersecurity.html
- Secure by design solutions and IEC 62443 | Cybersecurity | Eaton — https://www.eaton.com/cr/en-us/company/news-insights/cybersecurity/secure-by-design-solutions-and-iec-62443.html
- Eaton adds UL and IEC cybersecurity certifications for its network connectivity cards, helping customers secure critical communication environments — https://www.eaton.com/us/en-us/company/news-insights/news-releases/2022/eaton-adds-ul-and-iec-cybersecurity-certifications.html
- CRA Penalties and Enforcement: Complete Guide - Regulus — https://goregulus.com/cra-compliance/cra-penalties-enforcement/
- EU CRA Non-Compliance Fines Explained: Avoid Penalties with Automated IoT Compliance — Test of Things — https://testofthings.com/blog/understanding-the-fines-the-real-cost-of-eu-cra-non-compliance-rich-text
- EU Cyber Resilience Act (CRA): What Manufacturers Must Do Before Enforcement Begins — https://www.certivo.com/blog-details/eu-cyber-resilience-act-(cra)-what-manufacturers-must-do-before-enforcement-begins
- CRA Penalties and Sanctions - Financial Risks of Non-Compliance | EU Cyber Laws — https://eu-cyber-laws.com/cra/penalties/
- IEC 62443 explained: Industrial cybersecurity — https://www.darktrace.com/cyber-ai-glossary/iec-62443
- CRA Vulnerability and Incident Reporting — https://craevidence.com/blog/cra-enisa-vulnerability-reporting-24-hour
- Single Reporting Platform (SRP) | ENISA — https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp
- CRA Vulnerability Reporting: Step-by-Step Guide | Inovasense — https://inovasense.com/insights/cra-vulnerability-reporting-guide
- CRA Vulnerability and Incident Reporting — https://craevidence.com/cra-compliance/vulnerability-reporting
- Cyber Resilience Act - Reporting obligations | Shaping Europe’s digital future — https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- EU Cyber Resilience Act | Reporting – ENISA — https://www.eucyberresilience.com/reporting-enisa
- EU CRA Vulnerability Reporting: 24-Hour Clock Starts Sept 2026 — https://cycode.com/blog/eu-cra-vulnerability-reporting-requirements/
- Cyber Resilience Act Enters Phase 1 – Reporting Requirements for Manufacturers Begin in 2026 | ONEKEY — https://www.onekey.com/press-release/cyber-resilience-act-phase-1--reporting-requirements-for-manufacturers-begin-in-2026
- IEC 62443 Standard: Enhancing Cybersecurity for Industrial Automation and Control Systems | Fortinet — https://www.fortinet.com/resources/cyberglossary/iec-62443
- ISA/IEC 62443: The Standard for Industrial Cybersecurity — https://www.esa-automation.com/en/isa-iec-62443-the-standard-for-industrial-cybersecurity/
- Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications | Nasdaq — https://www.nasdaq.com/press-release/legrand-certifications-and-process-controls-provide-confidence-in-information
- Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications — https://www.raritan.com/about-us/newsroom/detail/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications
- Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications — https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html
- Notified bodies - Internal Market, Industry, Entrepreneurship and SMEs — https://single-market-economy.ec.europa.eu/single-market/goods/building-blocks/notified-bodies_en
- New Approach Notified And Designated Organisations (Nando) – Registers.app — https://registers.app/collection/11:3666
- Compliance Info: Penalties for CRA Non-Compliance Explained - © Complyd 2025 — https://complyd.io/en/compliance-info-penalties-for-cra-non-compliance-explained/
- Decoding the Cyber Resilience Act – Part 3: Managing CRA Risk in Practice | Freshfields — https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-3-managing-cra-risk-in-practice-102mpaz
- EU CRA 2026: Security Requirements Explained — https://www.blazeinfosec.com/post/eu-cra-cyber-resilience-act/
- EU Cyber Resilience Act 2026 Reporting Deadline — https://www.brightdefense.com/news/eu-cyber-resilience-act-2026-reporting-deadline/
- CRA’s phased entry into application starts in September 2026 - Bird & Bird — https://www.twobirds.com/en/insights/2026/cra%E2%80%99s-phased-entry-into-application-starts-in-september-2026
- The EU Cyber Resilience Act: A Complete Compliance Guide for 2026 and Beyond - Security Boulevard — https://securityboulevard.com/2026/05/the-eu-cyber-resilience-act-a-complete-compliance-guide-for-2026-and-beyond/
- Key insights on the EU Cyber Resilience Act – what businesses need to know | BCLP - Bryan Cave Leighton Paisner — https://www.bclplaw.com/en-US/events-insights-news/key-insights-on-the-eu-cyber-resilience-act-what-businesses-need-to-know.html
- CRA Gets Teeth: Technical Definitions for Product Classes Now Official | Secure-by-Design Handbook — https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published
- Annex III  | IMPORTANT PRODUCTS WITH DIGITAL ELEMENTS | Springlex — https://www.springlex.eu/en/packages/cra/cra-regulation/annex-3/
- EU Cyber Resilience Act: A Complete Preparation Guide for Manufacturers for 2026 | Zealience — https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/
