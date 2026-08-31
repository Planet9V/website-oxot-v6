---
author: Jim McKenney
date: 2026-06-04
type: outreach-strategy
status: draft
tags: [tetrel, gtm, outreach, funnel, prospects, datacenters, iec62443, ocp-safe, cra]
---

#  Security: Outreach Strategy & Actionable Prospect Funnel (2026)

*Silicon-to-Facility OT Cybersecurity Practice — Organized by Technology Category*

---

## How to Use This Document

This is a living sales funnel reference. Each category section below follows a consistent structure:

1. **Market Context** — why this category is addressable now
2. **OXOT Service Play** — which service lines apply (code tags match Productive flags)
3. **Prospect Table** — ranked organizations with contact strategy and value prop
4. **Outreach Templates** — the opening angle for cold and warm outreach

**Prospect Tier Definitions**
- **Tier 1** — Upsell/warm: understands IEC 62443, holds partial certifications, needs expansion
- **Tier 2** — Maturity gap: high revenue, zero certifications, near-term regulatory forcing function (CRA 2027/NIS2)
- **Tier 3** — Emerging/specialized: newer technologies in scope, zero certifications, often faster sales cycle due to urgency

---

## Category 1: DCIM / ICS Software & Building Management

### Market Context

DCIM and BMS platforms sit at the intersection of every physical system in a facility — power, cooling, access, fire. They are the highest-risk attack surface in a datacenter: a single compromised DCIM can provide read-write access to every connected UPS, chiller, and PDU. Three of the largest BMS vendors suffered enterprise-class breaches or CVSS 10.0 CVEs in the past 24 months.

**Regulatory Driver:** NIS2 Article 21 mandates that operators of essential facilities implement security measures for OT systems. DCIM/BMS systems that manage critical infrastructure components (power, cooling) fall squarely in scope. CRA 2027 requires CE-marked products to meet cybersecurity requirements at point of sale — BMS controllers sold in the EU after August 2027 must demonstrate conformity.

**Certification Gap:** Of 9 major DCIM/BMS vendors surveyed:
- Schneider Electric: IEC 62443-4-2 SL-2 (NMC3 card only — not the platform)
- Siemens: ISASecure SDLA (process, not product certification)
- All others: **zero** product-level certification

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `supplier_product_review` | IEC 62443-4-1/4-2 gap analysis for DCIM software platforms |
| `iec62443_4_1_assessment` | Secure development lifecycle assessment |
| `iec62443_site_assessment` | Zone/conduit mapping of BMS network topologies |
| `cra_consulting` | EU CRA conformity readiness for European DCIM product divisions |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Johnson Controls** | Tier 2 | USD 24B | VP Product Security, Metasys BMS | Dark Angels breach ($27M cost) — rebuild market trust via IEC 62443-4-1 SDL assessment | LinkedIn → Engineering VP; reference Dark Angels breach | Ransomware recovery + trust rebuild |
| 2 | **Honeywell / Tridium** | Tier 2 | USD 37B | Director of Cybersecurity, Building Technologies | 13 CVEs in Niagara Framework (Jul 2025) — 1M+ installations exposed; needs product-level 62443-4-2 | LinkedIn → CISO; reference Niagara CVE cluster | CVE cluster in flagship product |
| 3 | **Schneider Electric** | Tier 1 | USD 47B | Global VP Cybersecurity, Building/IT Division | NMC3 SL-2 certified — upsell to EcoStruxure Building Operation platform-level 62443-3-3 assessment | OCP Summit / ISA conference warm intro | CVSS 10.0 CVE in EcoStruxure DCE (2025) |
| 4 | **Siemens AG** | Tier 1 | USD 87B | Head of Security, Desigo CC | SDLA-certified process — bridge to product-level 62443-4-2 for Desigo CC and Cerberus PRO | ISA/IEC standards board relationship | NIS2 compliance for EU DC operators |
| 5 | **ABB / Cylon BMS** | Tier 2 | USD 33B | Product Security Lead, Building Ecosystem | ASPECT/NEXUS CVEs (CVSS 9.3/9.8) in 2024-25; zero BMS product certs | LinkedIn outreach to Product Security | CVE-2025-53187 auth bypass |
| 6 | **Sunbird dcTrack** | Tier 2 | ~USD 50M | CTO / VP Engineering | DCIM API has read-write access to physical endpoints; zero IEC 62443-4-2 cert | Direct email + LinkedIn | Hyperscaler procurement mandates |
| 7 | **Nlyte Software** | Tier 2 | ~USD 40M | VP Product Management | Same as Sunbird — DCIM integration API is uncertified | Direct email | CRA 2027 EU market access |
| 8 | **Delta Electronics (InfraSuite)** | Tier 2 | USD 15B | Security Architecture Lead | CISA advisories on Delta products; InfraSuite has zero IEC 62443 cert | Trade show + LinkedIn | CISA advisory exposure |
| 9 | **PassiveLogic** | Tier 3 | Pre-rev | CTO / Co-founder | AI-native BMS — opportunity to embed security by design before product launch | Founder LinkedIn / YC network | CRA applies to new products |

### Outreach Template: Cold (Tier 2 — Johnson Controls)

**Subject:** Metasys Security Posture — IEC 62443 and the CRA

> Hi [Name], following the 2023 Dark Angels incident and now with CRA implementation deadlines confirmed for August 2027, we're seeing procurement teams at hyperscalers begin requiring IEC 62443-4-1 development lifecycle attestation from BMS suppliers. Tetrel conducts formal gap assessments and remediation roadmaps against IEC 62443-4-1 ML3/ML4 for building automation platforms. Would it make sense to spend 30 minutes reviewing where Metasys sits today? We've recently completed a similar program for a major power distribution OEM.

---

## Category 2: Power Systems (PLCs, PDUs, UPS, Generators, Substation)

### Market Context

Power systems are the most consequential OT attack surface in a datacenter: a successful compromise of a UPS network management card (TLStorm, 2022) can cause physical equipment damage. Three zero-days against APC Smart-UPS units (CVSS 9.8) demonstrated that millions of networked power devices are running uncertified firmware on default credentials.

**Critical Finding:** Across every PDU, UPS, generator, and automatic transfer switch (ATS) vendor in the database — **zero hold IEC 62443-4-2 product certification**, despite all shipping network management interfaces. This is the most concentrated certification gap in the datacenter supply chain.

**Microsoft Mandate:** Microsoft's Supplier Security & Privacy Assurance (SSPA) program now includes requirements for UPS and power infrastructure firmware. This creates a direct commercial forcing function for Tier 1/2 power vendors.

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `supplier_product_review` | IEC 62443-4-2 component gap analysis for NMC/power firmware |
| `ocp_safe_review` | OCP S.A.F.E. firmware security review for rack power shelves |
| `iec62443_4_1_assessment` | Secure SDL assessment for UPS/PDU firmware development teams |
| `cra_consulting` | EU CRA product conformity for European-market power equipment |
| `facility_uplift` | Compensating architecture design around unpatchable Siemens S7-1500 |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Schneider Electric (APC)** | Tier 1 | USD 47B | Global VP Product Security | TLStorm recovery — NMC3 SL-2 achieved; upsell to Galaxy UPS system-level 62443-3-3 + uncertified PDU lines | Warm via OCP WG / ISA board | TLStorm follow-up + Modbus CVE (CVSS 9.8) |
| 2 | **Vertiv** | Tier 1 | USD 10B | Director of Cybersecurity, Power | Liebert IntelliSlot RDU120 SL-2 — upsell to Liebert DSE/Trinergy Cube cooling/UPS platform certs | LinkedIn → CISO, reference Liebert cert gap | Zero certs on major product lines |
| 3 | **Eaton** | Tier 1 | USD 27B | VP Product Security | NETWORK-M3 SL-2 — upsell Boyd Thermal acquisition: secure-by-design liquid cooling firmware | LinkedIn + engineering conference | CVE-2025-67450/59887 (RCE in UPS companion) |
| 4 | **Legrand / Raritan / Server Technology** | Tier 2 | USD 9.5B | Product Security Director | Zero IEC 62443 certs across Raritan PX4, Server Tech PRO3X, Starline Busway | LinkedIn direct to Raritan CTO | CRA 2027 + Starline has networked monitoring |
| 5 | **ABB (UPS + Distribution)** | Tier 2 | USD 33B | Head of Cybersecurity, Electrification | MegaFlex UPS / Emax 2 breakers — zero UPS/distribution certs despite AC500 PLC being certified | ISA/OCP warm intro from existing Tetrel relationship | ASPECT/NEXUS CVEs (CVSS 9.8) |
| 6 | **Caterpillar** | Tier 2 | USD 68B | Director, Generator Control Systems | Cat C175 generator controllers are networked, zero IEC 62443 certs | Trade show (Data Center World) | DC microgrid connectivity mandates |
| 7 | **Cummins** | Tier 2 | USD 34B | VP Engineering, Power Systems | QSK95 generator controller firmware — zero cert; Microsoft SSPA pressure | LinkedIn → Engineering VP, reference SSPA | Hyperscaler procurement requirement |
| 8 | **Siemens Energy** | Tier 2 | USD 39B | Head of Product Cybersecurity | SIPROTEC relays per 62443-4-1 (process) — but SICAM and switchgear uncertified at product level | ISA standards board relationship | GIS substation digital integration for DC |
| 9 | **Hitachi Energy** | Tier 2 | (Hitachi ~USD 80B) | Cybersecurity Program Manager | MicroSCADA CVEs; Relion per 62443-4-1 — bridge to product-level 62443-4-2 | OCP / IEEE PES conference | DC substation digital transformation |
| 10 | **Delta Electronics (Power)** | Tier 2 | USD 15B | Product Security Lead | 72kW/108kW HVDC power shelves for hyperscalers — CISA advisories, zero IEC 62443 | OCP Summit + LinkedIn | OCP ORv3 firmware in scope for S.A.F.E. |
| 11 | **Artesyn / Advanced Energy** | Tier 3 | USD 1.8B | CTO, Data Center Computing | Designed first OCP ORv3 48V power shelf — DC Computing revenue +113% YoY; zero certs | OCP Summit direct contact | OCP S.A.F.E. mandate for rack components |
| 12 | **Vicor** | Tier 3 | USD 460M | VP Engineering / CTO | 48V power-on-package (NVIDIA/AMD) — no firmware CVEs but zero certs; rapid revenue growth | LinkedIn → CISO/CTO | Hyperscaler mandate on rack power firmware |
| 13 | **nVent (Enlogic)** | Tier 3 | USD 3.1B | Product Security Director | "Cyber secure iPDU" marketing claim with zero 62443 cert backing | Direct email — point out certification gap vs. claim | CRA 2027 product liability risk |
| 14 | **GE Vernova (Grid Solutions)** | Tier 2 | USD 38B | Cybersecurity Lead, Grid | Multilin relay CISA advisories; GIS for DC substation — 62443-4-1 SDL process only | IEEE PES conference | DC power infrastructure regulatory push |

### Outreach Template: Cold (Tier 2 — Legrand/Raritan)

**Subject:** Rack PDU IEC 62443 Certification — CRA 2027 Timeline

> Hi [Name], with the EU Cyber Resilience Act entering enforcement in August 2027, intelligent rack PDUs sold into European datacenters will require documented conformity against cybersecurity requirements — including those in IEC 62443-4-2. Raritan PX4 and Server Technology PRO3X both ship network management cards that manage power at the outlet level, but neither carries a product-level certification today. Tetrel conducts IEC 62443-4-2 component gap analyses and remediation roadmaps for power infrastructure OEMs. Would a 30-minute conversation be worthwhile?

---

## Category 3: Cooling, HVAC & Liquid Cooling

### Market Context

Liquid cooling has moved from edge-of-portfolio to center-of-revenue for every major thermal vendor. CDU controllers managing coolant flow rates and temperatures for NVIDIA GB200 clusters are essentially safety systems — remote manipulation of flow rates can cause GPU damage. Despite this, **not a single liquid cooling vendor holds IEC 62443-4-2 certification** for CDU or cold plate controllers.

M&A consolidation (Schneider/Motivair $850M, Trane/LiquidStack, Eaton/Boyd) creates two opportunities: (1) post-merger security integration assessments, and (2) new product development security by design before the acquired product line goes to market under the new parent's brand.

**Certification Gap:** Among 10 precision cooling vendors and 11 liquid cooling vendors surveyed: **zero IEC 62443-4-2 product certifications** except Schneider's NMC3 (which manages InRow cooling, not the chillers themselves).

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `supplier_product_review` | IEC 62443-4-2 component gap analysis for CDU/CRAC/chiller controllers |
| `cra_consulting` | EU CRA product conformity for European cooling OEM divisions |
| `ot_it_convergence` | Security architecture for liquid cooling integration into hyperscale OT networks |
| `facility_uplift` | Zone/conduit design for separated cooling control networks |
| `ma_due_diligence` | Post-merger OT security integration assessment (Schneider/Motivair, Eaton/Boyd, Trane/LiquidStack) |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Vertiv (Liebert Cooling)** | Tier 2 | USD 10B | VP Engineering, Thermal | Liebert DSE / CoolChip CDU — zero IEC 62443 cert on cooling systems; upsell from IntelliSlot SL-2 | LinkedIn → thermal engineering VP | No certs on DSE/CDU despite massive DC presence |
| 2 | **Carrier Global** | Tier 2 | USD 22B | Director of Cybersecurity, Applied HVAC | AquaForce chiller controllers — zero 62443 cert; $1B DC revenue growing to $1.5B in 2026 | Trade show (AHR Expo, Data Center World) | CRA 2027 — European chiller product line |
| 3 | **Daikin Industries** | Tier 2 | USD 30B | Head of Product Security (APAC/EU) | Largest HVAC OEM globally; zero certs; European CRA requires conformity on CRAC/CRAH controllers | OCP/ASHRAE conference + LinkedIn | EU market access risk from CRA |
| 4 | **Trane Technologies** | Tier 2 | USD 21B | CISO / VP Product Security | Acquired LiquidStack (immersion) + BrainBox AI — post-merger OT security integration is complex | LinkedIn → integration/post-merger team | 3 major acquisitions requiring security unification |
| 5 | **Stulz GmbH** | Tier 2 | EUR 1.7B | Director of Engineering, Precision Cooling | Precision cooling specialist since 1974 — zero certs; CyberAir/CyberCool controllers uncertified | CRAC/CRAH trade events + German CRA outreach | European HQ — CRA first-mover pressure |
| 6 | **Modine / Airedale** | Tier 3 | USD 2.6B | VP, Data Center Products | 60% DC revenue growth; $180M in orders — EdgeDX/EdgeAire controllers uncertified | Direct LinkedIn outreach | Rapid growth means security debt is accumulating |
| 7 | **Munters Group** | Tier 2 | 16.4B SEK | Head of Cybersecurity | DCT CRAH + LCX CDU — record 2.1B SEK order from colocation; zero certs | Nordic OT security channel | Record orders from hyperscalers — procurement security reqs incoming |
| 8 | **CoolIT Systems** | Tier 3 | ~USD 150M | CTO / VP Engineering | Deep OEM (Dell, HPE, Lenovo) DLC integration — CDU controllers uncertified; OCP S.A.F.E. indirect scope | Direct outreach — Calgary-based | OCP S.A.F.E. mandate flows to OEM integrators |
| 9 | **Asetek** | Tier 3 | USD 42M | CTO | Patented DLC; InRackCDU for AI/HPC — small team, zero certs; CRA exposure | LinkedIn direct to CTO | CRA applies to EU product sales |
| 10 | **Schneider (Motivair)** | Tier 1 | (Schneider USD 47B) | Product Security Lead, Liquid Cooling | $850M acquisition (Oct 2024) — security integration of Motivair ChilledDoor into EcoStruxure | Schneider warm relationship + post-merger angle | Post-merger security harmonization |
| 11 | **Eaton (Boyd Thermal)** | Tier 1 | (Eaton USD 27B) | VP Engineering, Boyd Thermal | Acquired early 2026 — 5M+ cold plates to hyperscalers; zero certs; OCP S.A.F.E. indirect scope | Eaton warm relationship + Boyd-specific outreach | Post-acquisition OCP mandate |
| 12 | **Alfa Laval** | Tier 2 | USD 7.1B | Product Security Director | 2.5MW CDU-grade heat exchangers — zero certs; European HQ; CRA timing | Swedish industrial channel + LinkedIn | CRA + EU DC thermal infrastructure build-out |

### Outreach Template: Cold (Tier 2 — Carrier)

**Subject:** AquaForce Controller Security — IEC 62443 and CRA Readiness

> Hi [Name], with Carrier's datacenter cooling revenue now tracking toward $1.5B in 2026, the AquaForce product line is increasingly deployed in hyperscale facilities that operate under rigorous supply chain security mandates. The EU Cyber Resilience Act requires that HVAC controllers sold into EU markets demonstrate conformity against cybersecurity requirements — and Microsoft's SSPA already references IEC 62443-4-2 for facility OT components. Tetrel performs IEC 62443-4-2 component gap analyses specifically for chiller and CRAC/CRAH controller platforms. Can we find 30 minutes to walk through Carrier's current posture?

---

## Category 4: Physical Security (EPACS, CCTV, Fire, Credentials)

### Market Context

Physical security systems are increasingly converged with network infrastructure — IP cameras, access controllers, and fire panel network interfaces all present lateral movement risks. The Verkada breach (150,000 cameras, $2.95M FTC penalty) and HID legacy credential cloning vulnerabilities demonstrate that physical security is an active OT attack surface.

**Critical Outreach Angle (Credentials):** Any datacenter still using HID 125 kHz Prox cards or MIFARE Classic cards has a credential that can be cloned in seconds with a $20 tool. Tetrel can position the credential migration assessment as the entry-point engagement that expands into a full EPACS zone/conduit review.

**FM-200 Phase-Out:** The AIM Act mandates HFC reduction, directly threatening FM-200 (HFC-227ea) installations. Datacenters must plan migration to Novec 1230 or inert gas — creating a consulting opportunity: fire suppression migration assessment bundled with IEC 62443 zone/conduit review of the fire suppression control network.

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `supplier_product_review` | IEC 62443-4-2 gap analysis for access control hardware |
| `facility_physical_security` | Credential migration assessment + reader deployment review |
| `iec62443_site_assessment` | Zone/conduit design for physical security network integration |
| `cra_consulting` | EU CRA conformity for European EPACS and camera vendors |
| `facility_uplift` | Fire suppression migration assessment (FM-200 to Novec/inert gas) |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Johnson Controls (C-CURE/iSTAR)** | Tier 2 | USD 24B | VP, Physical Security Products | C-CURE/iSTAR — 62443-4-1 process cert only; no product cert. Dark Angels breach increases urgency | LinkedIn → product security, reference Dark Angels | Ransomware breach in parent company |
| 2 | **Honeywell (LenelS2)** | Tier 2 | USD 37B | Director, Security Portfolio | LenelS2 $4.95B acquisition — SDLC cert but zero product-level 62443-4-2 for Pro-Watch/WIN-PAK | LinkedIn → building security division | Integration of major acquisition; NIS2 scope |
| 3 | **Genetec** | Tier 2 | ~USD 450M | CTO / VP Engineering | Security Center + Synergis — #2 global access control software, zero IEC 62443 cert | Direct LinkedIn + Canadian company network | CRA 2027 EU market exposure |
| 4 | **HID Global / ASSA ABLOY** | Tier 2 | USD 559M (HID) | Head of Product Security | Legacy credential migration (iCLASS → SEOS) + reader deployment for datacenters | LinkedIn → product security; reference Prox cloning risk | $20 cloning attack on deployed cards |
| 5 | **Axis Communications** | Tier 2 | USD 1.6B | VP Security / CISO | References IEC 62443 in SDLC but no formal 4-2 product cert for cameras/VMS | LinkedIn / OCP camera security angle | NIS2 operator requirements for CCTV suppliers |
| 6 | **Hanwha Vision** | Tier 2 | USD 721M | VP Engineering | Full NDAA compliance, own SoC — zero IEC 62443 cert despite being primary beneficiary of Hikvision/Dahua bans | Trade show (ISC West) + LinkedIn | Hikvision/Dahua ban creates market window |
| 7 | **Verkada** | Tier 2 | USD 350M ARR | Head of Security / CISO | 150K camera breach + $2.95M FTC penalty (2024); zero IEC 62443 cert; cloud-native VMS | LinkedIn → CISO; reference FTC consent order | FTC consent order + NIS2 compliance |
| 8 | **Kidde/Edwards (Lone Star)** | Tier 3 | Private ~USD 3B | VP Engineering, Fire Systems | FM-200 phase-out under AIM Act — migration assessment + IEC 62443 zone review of fire control network | Direct email + NFPA conference | AIM Act regulatory deadline for HFC reduction |
| 9 | **Fike Corporation** | Tier 3 | ~USD 400M | Director of Engineering | Novec 1230 / high-pressure ECS-500 — no security certs; fire control network integration | NFPA/FM conference outreach | FM-200 migration consulting opportunity |
| 10 | **Suprema** | Tier 3 | ~USD 150M | CTO | Biometric access control (BioStation 3) — BioStar 2 breach (1M+ biometrics, 2019); zero IEC 62443 cert | LinkedIn direct outreach | Historical biometric breach + EU biometric regulations |
| 11 | **NXP Semiconductors** | Tier 1 | USD 12B | Head of Smart Card Security | SE050 holds IEC 62443-4-2 SL-3 — upsell to MIFARE DESFire EV3 ecosystem security assessment | Industry conference + LinkedIn | MIFARE Classic deprecation driving EV3 migration |
| 12 | **Siemens (SiPass / Cerberus)** | Tier 1 | USD 87B | Head of Security Portfolio | First IEC 62443-2-4 for system integration — build on this to expand SiPass and Cerberus product-level assessment | ISA/IEC standards board warm relationship | NIS2 + DC buildout drive integrated security demand |

### Outreach Template: Cold (Tier 2 — Genetec)

**Subject:** Security Center IEC 62443 — EU Market Position

> Hi [Name], Genetec is well-positioned as the NDAA-compliant alternative to Hikvision/Dahua in the European market, but CRA 2027 will require that access control and VMS software sold in the EU demonstrate conformity against cybersecurity requirements. Security Center and Synergis Cloud Link both process physical access events for critical infrastructure facilities — the kind of software that will be in scope for CRA requirements. Tetrel helps software-defined security platforms conduct IEC 62443-4-2 component gap analyses to position themselves ahead of the CRA enforcement deadline. Can we find 30 minutes to map out the gap?

---

## Category 5: OT / IT Networking (Switches, Firewalls, Data Diodes)

### Market Context

The datacenter OT network is the zone-and-conduit boundary between trusted BMS/PLC systems and untrusted IT infrastructure. Every certified OT networking product in the database (Moxa, Belden, Phoenix Contact, Westermo) was designed for industrial environments — not for the IT-grade switching that hyperscalers and colocation operators deploy.

**Critical Gap:** No IT datacenter switch (Arista, Cisco, NVIDIA Spectrum) holds IEC 62443-4-2 certification. When a hyperscaler operator is asked to demonstrate IEC 62443-3-3 system-level compliance, the absence of certified IT switches forces a compensating architecture discussion — which is a direct Tetrel consulting entry point.

**OT Security Platform Opportunity:** OT security visibility platforms (Claroty, Nozomi, Dragos) are growing rapidly in datacenter deployments. Tetrel can position as the architecture and remediation partner alongside these tools.

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `ot_it_convergence` | Architecture design for OT/IT network boundary in datacenters |
| `iec62443_site_assessment` | Zone/conduit assessment across OT network fabric |
| `supplier_product_review` | IEC 62443-4-2 gap analysis for OT-adjacent IT networking products |
| `consulting_implementation` | Compensating architecture for uncertified IT switch deployments |
| `cra_consulting` | CRA conformity for European network equipment OEMs |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Cisco Systems** | Tier 2 | USD 57B | Director, Industrial Networking | Catalyst IE switches used in DC OT fabric — ArcaneDoor APT, CISA Emergency Directive; zero IEC 62443-4-2 | LinkedIn + ISA conference | CISA Emergency Directive ED 25-03 |
| 2 | **Moxa** | Tier 1 | USD 272M | Product Security Manager | EDS-4000 SL-2, EDR-G9010 SL-2 — upsell to system-level assessments (62443-3-3) for DC deployments | ISA/Moxa partner channel | CVE-2024-9140 (CVSS 9.3 RCE) in certified product |
| 3 | **Belden / Hirschmann** | Tier 1 | USD 2.7B | Head of Industrial Networking Security | BOBCAT/HiOS SL-2 — upsell to zone/conduit architecture consulting for DC operators | ISA conference + LinkedIn | EAGLE data diode expansion opportunity |
| 4 | **Palo Alto Networks** | Tier 2 | USD 9.2B | Director, Industrial OT Security | PA-7500 for DC perimeter — CVE-2024-3400 (CVSS 10.0, actively exploited); no IEC 62443-4-2 | LinkedIn → OT security lead | GlobalProtect RCE zero-day (CVSS 10.0) |
| 5 | **Fortinet** | Tier 2 | USD 6.8B | VP, OT Security | FortiGate in DC perimeters — 4 critical auth bypass zero-days in 14 months; no IEC 62443-4-2 | LinkedIn → OT security team | 4 critical zero-days in 14 months |
| 6 | **TXOne Networks** | Tier 1 | ~USD 75M | CTO / VP Engineering | EdgeFire (OT NGFW) + 62443-4-1 certified — natural partner; joint go-to-market for DC OT assessments | Partner / joint GTM proposal | Siemens partnership creates warm channel |
| 7 | **Claroty** | Tier 3 | ~USD 175M | VP of Engineering | xDome in hyperscale DC — Tetrel as architecture + remediation partner for their customers | Partner / MSP channel approach | #1 Gartner MQ CPS Protection — customers need remediation partner |
| 8 | **Nozomi Networks** | Tier 3 | ~USD 100M | CTO | Guardian for DC OT visibility — Mitsubishi acquisition (2025) creates enterprise channel | OT conference + LinkedIn | Mitsubishi acquisition opens new partner channels |
| 9 | **Waterfall Security** | Tier 3 | ~USD 40M | VP Sales | Data diodes for OT/IT boundary — Tetrel designs the architecture, Waterfall provides the hardware | Partner / referral arrangement | Nuclear/DC OT boundary is core use case |
| 10 | **Phoenix Contact (mGuard)** | Tier 1 | ~USD 3.5B | Head of Industrial Security | FL mGuard SL-2, PLCnext SL-2 — upsell to architecture consulting for mGuard deployments in DC | ISA/German industrial channel | Double-digit certified products = trusted relationship |
| 11 | **Westermo** | Tier 1 | (Beijer ~USD 500M) | Product Security Lead | Viper-3000 SL-2 (Jan 2026) — newest certification; help them market the cert to DC operators | LinkedIn direct outreach — Sweden | Very recent certification = marketing support opportunity |
| 12 | **Arista Networks** | Tier 2 | USD 9B | Director, Cloud/DC Security | CVE-2024-11186 (CVSS 10.0, CloudVision Portal); zero IEC 62443 cert despite dominant DC switch position | LinkedIn → CISO; reference CloudVision RCE | CVSS 10.0 in cloud management platform |

### Outreach Template: Cold (Tier 2 — Fortinet, OT Division)

**Subject:** FortiGate OT/ICS Deployments — IEC 62443 Architecture Support

> Hi [Name], datacenters deploying FortiGate at the OT/IT boundary frequently ask whether the firewall constitutes an IEC 62443-compliant conduit controller for zone separation purposes. FortiGate doesn't hold IEC 62443-4-2 product certification, which creates a documentation gap for operators trying to demonstrate 62443-3-3 system-level compliance. Tetrel designs compensating architectures and produces the system-level security assessment documentation that allows operators to maintain 62443 compliance even with uncertified boundary devices. Would a discussion with your OT/ICS customers be useful?

---

## Category 6: Compute, Storage & HSMs

### Market Context

The OCP S.A.F.E. (Security Appraisal Framework and Evaluation) program is the primary certification mechanism for datacenter server firmware. As of April 2026, **fewer than 10 vendors hold any S.A.F.E. certification** — and Tetrel is one of fewer than 10 authorized Security Review Providers. This creates a near-exclusive position in a market that is about to become mandatory.

Microsoft's 2025 supply chain security mandate for server vendors explicitly references OCP S.A.F.E. BMC and BIOS firmware review as a requirement. This cascades from hyperscalers to ODMs to component suppliers (BMC vendors, BIOS IBVs).

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `ocp_safe_review` | OCP S.A.F.E. firmware security review (BMC, BIOS, secure boot) |
| `supplier_product_review` | IEC 62443-4-2 gap analysis for server platform components |
| `iec62443_4_1_assessment` | Secure development lifecycle for firmware teams |
| `consulting_implementation` | Caliptra/OpenTitan Root of Trust integration architecture |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Wiwynn** | Tier 2 | USD 20B+ | VP of Engineering / CTO | OCP Platinum Member — 169% YoY revenue growth; zero OCP S.A.F.E. cert; Microsoft primary customer | OCP Summit direct + LinkedIn | Microsoft SSPA mandate requires S.A.F.E. |
| 2 | **Quanta Cloud Technology (QCT)** | Tier 2 | ~USD 65B parent | Head of Platform Security | Most extensive OCP product line; first OCP certification holder — zero S.A.F.E. cert | OCP Summit + LinkedIn | Microsoft mandate; largest OCP footprint |
| 3 | **Supermicro** | Tier 2 | USD 25B | VP, Firmware/Security Engineering | 6+ critical BMC CVEs (2024-2025) including RoT bypass; zero OCP S.A.F.E. | Direct LinkedIn → CISO; reference CVE-2025-7937 | RoT bypass CVE in production servers |
| 4 | **Foxconn / Hon Hai** | Tier 2 | USD 262B | Director, Server Product Security | Largest EMS/ODM; AI server >50% of revenue; supply chain opacity; zero S.A.F.E. | OCP Summit + Taiwan trade channel | Microsoft mandate cascades to EMS suppliers |
| 5 | **Inventec** | Tier 2 | USD 22B | Head of BMC Engineering | World's largest server ODM by share (~30%); zero S.A.F.E. cert | OCP conference + LinkedIn | HP/Dell/Lenovo procurement requirements |
| 6 | **Dell Technologies** | Tier 2 | USD 114B | Director, Security Engineering (iDRAC) | iDRAC BMC historical vulns; #1 branded server vendor; zero OCP S.A.F.E. cert | LinkedIn → CISO / iDRAC team | Enterprise customers requiring S.A.F.E. attestation |
| 7 | **HPE** | Tier 2 | USD 30B | Head of Server Security (iLO) | iLO BMC historical CVEs; GreenLake requires supplier security attestation | LinkedIn + HPE partner channel | GreenLake supplier security program |
| 8 | **ASPEED Technology** | Tier 3 | USD 290M | VP Engineering | Near-monopoly on BMC silicon — one ASPEED CVE cascades to all downstream OEMs; zero S.A.F.E. | OCP Summit + LinkedIn | Single point of failure for entire server industry |
| 9 | **Insyde Software** | Tier 3 | ~USD 100M | Head of Security, UEFI | LogoFAIL and PixieFail affected Insyde firmware; zero OCP S.A.F.E. | LinkedIn direct → CISO; reference LogoFAIL | High-profile public UEFI vulnerabilities |
| 10 | **Thales (Luna HSM)** | Tier 2 | USD 20B | Head of Product Security, HSM | #1 HSM vendor; FIPS 140-2 L3 — OCP S.A.F.E. is adjacent; HSM integration with Caliptra is emerging | LinkedIn + HSM industry conference | Caliptra integration requires HSM interoperability |
| 11 | **Lattice Semiconductor** | Tier 3 | USD 523M | VP, Secure Systems | MachXO3D (PFR for Platform Firmware Resiliency) — zero certs; +85% server revenue | OCP Summit + LinkedIn | Rapid growth in platform security silicon |
| 12 | **Oxide Computer** | Tier 3 | Pre-rev | CTO / Co-founder | Security-first on-prem cloud; open-source firmware — no CVEs but no formal certs; enterprise customers require attestation | LinkedIn + HN/YC community | Enterprise procurement requires formal cert |

### Outreach Template: Cold (Tier 2 — Wiwynn)

**Subject:** OCP S.A.F.E. Review — Microsoft SSPA Requirement

> Hi [Name], with Wiwynn's position as an OCP Platinum Member and primary server ODM for Microsoft, the OCP S.A.F.E. firmware security review is becoming a supply chain requirement rather than an optional certification. Microsoft's SSPA program now references OCP S.A.F.E. for server platform firmware — which means BMC and BIOS firmware on Wiwynn platforms will need to go through a formal Security Review Provider assessment. Tetrel is one of fewer than 10 authorized OCP S.A.F.E. Security Review Providers. Can we schedule a call to discuss the review scope?

---

## Category 7: ODMs & Emerging Technologies (SMR, 48V DC, Optical)

### Market Context

This category captures the fastest-growing and highest-urgency segments for Tetrel:

- **SMR Nuclear:** TerraPower NRC construction permit approved; Oklo, X-energy, and Kairos all progressing. Every SMR developer must satisfy NRC 10 CFR 73.54 cybersecurity requirements for digital I&C systems. The overlap between 73.54 and IEC 62443 zone/conduit architecture is the technical bridge Tetrel can uniquely provide.
- **48V DC / OCP ORv3:** Power shelf firmware (Artesyn, Delta) is now explicitly in scope for OCP S.A.F.E. review as hyperscalers mandate secure firmware across all rack components.
- **Optical Interconnects:** Switch ASICs (Broadcom Tomahawk) and SmartNICs (NVIDIA BlueField-4) contain firmware that manages rack-scale traffic — an emerging area of OCP S.A.F.E. interest.

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `ocp_safe_review` | OCP S.A.F.E. review for ODM server platforms and 48V power shelves |
| `smr_nuclear_ics` | IEC 62443 / NRC 73.54 cybersecurity bridge for SMR digital I&C |
| `supplier_product_review` | IEC 62443-4-2 component gap analysis for 48V firmware |
| `iec62443_site_assessment` | Zone/conduit architecture for SMR facility OT networks |
| `program_management` | Ongoing compliance program management for SMR cybersecurity lifecycle |

### Prospect Table — SMR / Nuclear

| # | Organization | Tier | Funding/Rev | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **TerraPower** | Tier 3 | Private (Gates-backed, $650M raise Jun 2025) | Director of Digital I&C Security | NRC construction permit approved — 73.54 cybersecurity plan must cover all digital I&C; IEC 62443 bridge | LinkedIn → engineering leadership; nuclear conference | NRC CP approved; construction imminent |
| 2 | **X-energy** | Tier 3 | $9.1B valuation; Amazon $500M | VP Engineering, Digital Systems | NRC CPA accepted May 2025; Amazon partnership — 73.54 compliance required before first criticality | LinkedIn → CISO; nuclear security conference | NRC CPA accepted; formal cyber plan required |
| 3 | **Oklo** | Tier 3 | $6.5-8.7B market cap; $1.23B cash | Head of Cyber / Regulatory Affairs | First reactor at INL by 2027; Switch 12 GW framework — 73.54 + IEC 62443 planning phase | LinkedIn + NRC conference | First reactor 2027; cyber plan urgently needed |
| 4 | **Kairos Power** | Tier 3 | DOE $303M milestone | Director, I&C Engineering | First non-LWR NRC construction permit in 50+ years; Hermes demo reactor — 73.54 scoping | NRC conference + DOE channels | First non-LWR permit — security architecture is novel |
| 5 | **GE Vernova Hitachi Nuclear** | Tier 2 | (GEV ~$115B) | Cybersecurity Program Manager | BWRX-300; CNSC construction license (Canada, Apr 2025); OPG Darlington — 73.54 + CNSC cybersecurity | IEEE Nuclear + direct outreach | Canadian CNSC license issued; Canadian market |
| 6 | **Rolls-Royce SMR** | Tier 3 | GBP 2.6B UK government funding | Head of Cyber, SMR Programme | UK GDA final stage (expected Dec 2026) — NIS2 + UK NCSC cybersecurity requirements | UK industrial channel + LinkedIn | UK GDA milestone Dec 2026 |

### Prospect Table — 48V DC / OCP ORv3

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 7 | **Artesyn / Advanced Energy** | Tier 3 | USD 1.8B | CTO, Data Center Computing | Designed first OCP ORv3 48V power shelf; DC Computing +113% YoY — zero OCP S.A.F.E. cert | OCP Summit + LinkedIn | OCP S.A.F.E. mandate for ORv3 components |
| 8 | **Delta Electronics (Power)** | Tier 2 | USD 15B | Product Security Lead | 72kW/108kW HVDC power shelves; CISA advisories; OCP Summit presenter — zero certs | OCP Summit contact + LinkedIn | CISA advisories + OCP ORv3 scope |
| 9 | **Vicor** | Tier 3 | USD 460M | VP Engineering / CTO | 48V power-on-package for NVIDIA/AMD — rapid growth; zero firmware certs | LinkedIn → engineering leadership | Hyperscaler firmware mandates |

### Prospect Table — Optical / Switch ASIC

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 10 | **Arista Networks** | Tier 2 | USD 9B | Director, Product Security | CVE-2024-11186 (CVSS 10.0, CloudVision) — zero IEC 62443 certs despite dominant DC switch position | LinkedIn → CISO | CVSS 10.0 in CloudVision Portal |
| 11 | **Celestica** | Tier 3 | USD 12B | VP, Product Security | 800G+ AI networking leader — no OCP S.A.F.E., no IEC 62443; ODM switch firmware is uncertified | OCP Summit + LinkedIn | Growing 28% YoY with uncertified firmware |
| 12 | **Edgecore Networks (Accton)** | Tier 3 | (Parent USD 8B) | Head of Security Engineering | World's first 102.4T open networking switch (Feb 2026) — zero certs; SONiC firmware | OCP Summit + LinkedIn | First-mover position with zero cert documentation |

### Outreach Template: Cold (Tier 3 — TerraPower)

**Subject:** IEC 62443 and NRC 10 CFR 73.54 — Digital I&C Cybersecurity for Natrium

> Hi [Name], with TerraPower's NRC construction permit now approved and the Natrium reactor construction phase beginning, the cybersecurity requirements in 10 CFR 73.54 move from planning to active implementation. The zone-and-conduit architecture specified in IEC 62443-3-2 shares substantial structural overlap with NRC digital I&C cybersecurity requirements — but the crosswalk between the two standards requires specific expertise that nuclear safety integrators don't typically carry. Tetrel provides IEC 62443 zone/conduit design and security assessment services for digital infrastructure adjacent to critical safety systems. Can we discuss how this maps to the Natrium I&C architecture?

---

## Category 8: Energy Distribution (DER, Microgrid, Substation)

### Market Context

Distributed Energy Resources (DER) — solar inverters, battery storage, EV charging infrastructure, and microgrids — are rapidly being integrated with datacenter power supply chains as hyperscalers pursue 100% renewable energy goals and energy independence. Every DER integration creates new OT attack surface: a solar inverter SCADA system connected to a datacenter MV substation is functionally equivalent to a BMS from an IEC 62443 zone/conduit perspective.

**Regulatory Driver:** NERC CIP (North America) and NIS2 Article 21 (EU) both apply to entities operating critical energy infrastructure connected to the grid. Hyperscalers operating behind-the-meter generation and storage increasingly fall under these requirements.

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `iec62443_site_assessment` | Zone/conduit design for DER integration into DC power infrastructure |
| `supplier_product_review` | IEC 62443-4-2 gap analysis for inverter and BESS controllers |
| `ot_it_convergence` | Security architecture for DER management systems (DERMS) |
| `cra_consulting` | EU CRA conformity for European inverter and EV charging OEMs |
| `program_management` | NERC CIP compliance program for utility-connected DC operators |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Bloom Energy** | Tier 3 | USD 2B | VP Engineering / CTO | Fuel cell alternative to diesel backup — $5B Brookfield deal; Equinix/Oracle customer; zero IEC 62443 certs | LinkedIn + energy conference | Rapid DC market penetration with uncertified control software |
| 2 | **Wartsila** | Tier 2 | USD 6.5B | Head of Cybersecurity, Energy Storage | 507MW US hyperscaler gas engine order (Nov 2025) — SCADA integration with DC power management | Energy storage conference + LinkedIn | Largest US hyperscaler gas engine order to date |
| 3 | **Hitachi Energy (Substation)** | Tier 2 | (Hitachi ~USD 80B) | Cybersecurity Program Manager | MicroSCADA CVEs; purpose-built DC substations (2025); Relion relays per 62443-4-1 — gap to 4-2 product cert | IEEE PES + LinkedIn | DC-specific substations now a product line |
| 4 | **ABB (Grid/Electrification)** | Tier 2 | USD 33B | Head of Grid Cybersecurity | Purpose-built DC substations (2025); REF/RET relays per 62443-4-1 — zero 4-2 product cert | ISA/IEEE PES warm intro | DC substation and BESS integration |
| 5 | **GE Vernova (Grid Solutions)** | Tier 2 | USD 38B | Director, Grid Cybersecurity | SF6-free GIS + Multilin relays — CISA advisories on Multilin; 62443-4-1 process only | IEEE PES conference | CISA advisories on deployed relays |
| 6 | **SEL (Schweitzer)** | Tier 1 | ~USD 1B | Director of Cybersecurity | US protection relay leader with strong security posture — positioning for DC microgrid standard | ISA/IEEE direct relationship | DC microgrid cybersecurity standard development |
| 7 | **Generac** | Tier 3 | USD 4.2B | VP, Connected Products | Sub-1MW modular DC products — zero certs; DC product line growing; EV charging + BESS integration | Trade show + LinkedIn | New DC product line with no security certification |

### Outreach Template: Cold (Tier 2 — Wartsila)

**Subject:** Hyperscale Power Integration — IEC 62443 Architecture for Gas Engine SCADA

> Hi [Name], with Wartsila's 507MW gas engine order for US hyperscalers announced in November 2025, the integration of gas engine SCADA systems into datacenter power management networks creates a zone/conduit boundary that operators will need to formally document under IEC 62443-3-2. The OT networks managing gas engine controls need to be separated from IT facility management systems with defined security levels and conduit controls. Tetrel designs these zone/conduit architectures and provides the system-level security assessment documentation that hyperscaler operators require. Can we walk through the network topology considerations for these deployments?

---

## Category 9: Manufacturing OT (Industry 4.0 / ICS)

### Market Context

While the core Tetrel practice is datacenter-focused, the manufacturing sector represents the broadest market for IEC 62443 compliance services. NIS2 and CRA create compliance urgency for any manufacturer shipping connected products to EU markets. Manufacturing customers also provide the "volume" end of the sales funnel — smaller assessments at higher frequency, compared to the larger complex assessments at hyperscalers.

**Strategic Note:** Manufacturing OT engagements often originate from the same IEC 62443-4-1 supplier review conversation — a manufacturer building PLCs or sensors for the datacenter supply chain is simultaneously a supplier prospect (Category 1/2) and an operator prospect (Category 9).

### Tetrel Service Play

| Productive Service Flag | Description |
|:---|:---|
| `iec62443_site_assessment` | Zone/conduit assessment for manufacturing OT networks |
| `supplier_product_review` | IEC 62443-4-1/4-2 gap analysis for ICS/PLC product lines |
| `cra_consulting` | EU CRA product conformity for connected manufacturing equipment |
| `facility_due_diligence` | OT security due diligence for manufacturing M&A transactions |
| `program_management` | Ongoing compliance program management for NIS2/CRA |

### Prospect Table

| # | Organization | Tier | Revenue | Key Contact Role | Primary Value Prop | Outreach Channel | Urgency Driver |
|:--|:---|:---|:---|:---|:---|:---|:---|
| 1 | **Rockwell Automation** | Tier 1 | USD 8.3B | Director, Product Cybersecurity | ControlLogix 5580 SL-2 + 62443-4-1 ML4 (highest maturity) — upsell to system-level assessments for their customers | ISA conference + warm relationship | Nation-state CVE-2023-3595 (CVSS 9.8) in certified product |
| 2 | **Phoenix Contact** | Tier 1 | ~USD 3.5B | Head of Product Security | First SL-2 PLC on market; double-digit certified products — upsell to architecture consulting for their customers | ISA/German industrial + LinkedIn | Broadest certified portfolio = trusted baseline |
| 3 | **Beckhoff Automation** | Tier 2 | USD 1.25B | Head of Industrial Security | TwinCAT PC-based control — 62443-4-1 by process; zero product-level certs; Industry 4.0 pioneer | German industrial conference + LinkedIn | CRA applies to German-market products |
| 4 | **WAGO** | Tier 2 | USD 1.2B | Product Security Lead | PFC200/BACnet controllers — 62443-4-1 process only; CVEs on PFC200 series; building automation | German industrial channel | CRA 2027 enforcement for EU-market controllers |
| 5 | **Yokogawa Electric** | Tier 2 | USD 3.7B | Head of Product Cybersecurity | CENTUM VP ISASecure SDLA + SSA certified — bridge to IEC 62443-4-2 product-level assessment | ISA/process industry conference | Hardcoded password CVE in CENTUM VP |
| 6 | **Emerson (DeltaV)** | Tier 2 | USD 18B | Director, Cybersecurity Services | DeltaV ISASecure SSA + SDLA certified — upsell to system-level IEC 62443-3-3 for manufacturing DCS | ISA conference + process industry | Historical DeltaV CVEs + NIS2 compliance |
| 7 | **Mitsubishi Electric** | Tier 2 | USD 38B | Cybersecurity Director | MELSEC iQ-R safety controller — CVE-2023-1424 (CVSS 10.0); acquired Nozomi Networks (2025) | OT conference + LinkedIn | CVSS 10.0 in flagship PLC product |
| 8 | **ABB (Industrial Automation)** | Tier 1 | USD 33B | Head of Industrial Cybersecurity | AC500 SL-2 + 62443-4-1 ML (TUV SUD) — upsell to system-level and facility assessments | ISA + warm relationship opportunity | ASPECT/NEXUS CVEs (CVSS 9.8) in broader portfolio |

### Outreach Template: Cold (Tier 2 — Beckhoff)

**Subject:** TwinCAT Cybersecurity — IEC 62443-4-2 and CRA 2027

> Hi [Name], Beckhoff has led the Industry 4.0 conversation from the beginning, and TwinCAT's openness and EtherCAT integration are core strengths in modern industrial environments. With CRA enforcement approaching in August 2027, PC-based controllers shipping into EU markets will need to document conformity against cybersecurity requirements that align closely with IEC 62443-4-2 Component Security Requirements. Tetrel conducts formal gap analyses and remediation roadmaps to help ICS vendors position their products for CRA conformity. Would it make sense to discuss where TwinCAT and the CX series stand today?

---

## Consolidated Outreach Funnel

### Funnel Summary by Category

| Category | Total Prospects | Tier 1 | Tier 2 | Tier 3 | Avg Deal Size (CAD) | Prioritization |
|:---|:---|:---|:---|:---|:---|:---|
| 1. DCIM / BMS | 9 | 2 | 5 | 2 | CAD 55,000–150,000 | **High** — immediate regulatory pain |
| 2. Power Systems | 14 | 3 | 8 | 3 | CAD 33,000–187,500 | **Highest** — zero certs, MSFT mandate |
| 3. Cooling / HVAC | 12 | 3 | 7 | 2 | CAD 33,000–150,000 | **High** — liquid cooling urgency |
| 4. Physical Security | 12 | 3 | 6 | 3 | CAD 22,000–82,500 | **Medium-High** — credential risk entry point |
| 5. Networking | 12 | 4 | 6 | 2 | CAD 55,000–187,500 | **High** — firewall zero-day epidemic |
| 6. Compute / Storage / HSM | 12 | 1 | 7 | 4 | CAD 41,250–187,500 | **Highest** — OCP S.A.F.E. exclusivity |
| 7. ODMs & Emerging | 12 | 0 | 3 | 9 | CAD 82,500–337,500 | **High** — SMR urgency + OCP mandate |
| 8. Energy / DER | 7 | 1 | 4 | 2 | CAD 55,000–150,000 | **Medium** — growing but longer sales cycle |
| 9. Manufacturing OT | 8 | 3 | 5 | 0 | CAD 22,000–82,500 | **Medium** — volume plays, CRA timing |
| **TOTAL** | **98** | **20** | **51** | **27** | — | — |

### 90-Day Outreach Prioritization

**Week 1–2: Activate warm relationships (Tier 1)**
- Schneider Electric (OCP WG warm contact)
- Rockwell Automation (ISA conference relationship)
- Moxa (ISA conference)
- TXOne Networks (Siemens ecosystem)
- ABB (existing ICS security engagement)

**Week 3–4: Launch targeted cold outreach (Tier 2 — highest urgency)**
- Johnson Controls (Dark Angels breach — DCIM + fire)
- Legrand / Raritan (zero certs across $9.5B platform)
- Wiwynn (OCP Platinum, Microsoft SSPA)
- Supermicro (RoT bypass CVEs)
- Carrier Global (AquaForce, DC revenue $1B)

**Week 5–8: Extend to emerging categories (Tier 3)**
- TerraPower (NRC permit approved)
- Artesyn / Advanced Energy (OCP ORv3 first mover)
- CoolIT Systems (Dell/HPE liquid cooling OEM)
- Edgecore Networks (first 102.4T open switch)

**Week 9–12: European market outreach (CRA 2027)**
- Stulz GmbH (German precision cooling)
- Rittal (German enclosure + cooling)
- Alfa Laval (Swedish heat exchangers)
- Munters Group (Nordic evaporative cooling)
- Advenica (Swedish data diodes for EU critical infra)

### Account Tiering for Productive CRM Entry

When entering accounts into Productive, use the following categorization:

| Account | Category Tag | Service Flag Priority | Est. Year 1 Value (CAD) |
|:---|:---|:---|:---|
| Wiwynn | ODM, Compute | `ocp_safe_review` | CAD 82,500–187,500 |
| Supermicro | Compute | `ocp_safe_review`, `supplier_product_review` | CAD 41,250–187,500 |
| Johnson Controls | DCIM, Physical Security, BMS | `iec62443_4_1_assessment`, `facility_uplift` | CAD 55,000–150,000 |
| Legrand / Raritan | Power | `supplier_product_review`, `cra_consulting` | CAD 33,000–82,500 |
| Carrier Global | Cooling | `supplier_product_review`, `cra_consulting` | CAD 33,000–150,000 |
| TerraPower | SMR | `iec62443_site_assessment`, `program_management` | CAD 137,500–337,500 |
| Honeywell (Tridium) | DCIM, BMS | `supplier_product_review`, `cra_consulting` | CAD 33,000–150,000 |
| Moxa | Networking | `consulting_implementation`, `iec62443_site_assessment` | CAD 22,000–82,500 |
| Artesyn / AE | Power, ODM | `ocp_safe_review`, `supplier_product_review` | CAD 33,000–187,500 |
| Stulz GmbH | Cooling | `supplier_product_review`, `cra_consulting` | CAD 33,000–82,500 |

---

## Sources

- **ISASecure Certified Product Registry (July 2025):** SL-2/SL-3 component certifications
- **OCP S.A.F.E. Certification Registry (April 2026):** AMI MegaRAC, Nuvoton NPCM8mnx confirmed
- **Vendor Databases:** `21_Vendor_Database_Power_Systems.md`, `22_Vendor_Database_Cooling_HVAC.md`, `23_Vendor_Database_Physical_Security.md`, `24_Vendor_Database_Networking.md`, `25_Vendor_Database_Compute_Storage_HSM.md`, `26_Vendor_Database_ODMs_Emerging.md`
- **CISA Known Exploited Vulnerabilities (KEV) Catalog:** CVE cross-reference
- **NRC Docket Registry (2026):** SMR construction permit status
- **EU CRA (Regulation (EU) 2024/2847):** Enforcement timeline, August 2027

*Research compiled April–June 2026. All revenue/valuation figures reflect most recent publicly available data.*
