# Deep Research Output: Stulz GmbH

# Stulz GmbH: Comprehensive Organizational Intelligence Report for OT/IoT Cybersecurity Sales

**Prepared for:** OT/IoT Cybersecurity Sales Teams — EU Cyber Resilience Act Compliance & IEC 62443 Assessment Engagements
**Report Date:** June 6, 2026
**Classification:** Sales Intelligence — Internal Use

---

## Executive Summary

**Stulz GmbH is a €1.7 billion privately held precision cooling manufacturer with a documented, multi-year cybersecurity compliance deficit that creates high-value engagement opportunities for OT/IoT security advisory, IEC 62443 assessment, and EU CRA readiness services.**

Headquartered in Hamburg, Germany (Holsteiner Chaussee 283, 22457) and registered at Amtsgericht Hamburg HRB 16255, Stulz operates 10 production sites and 35 subsidiaries across 140+ countries [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[9]](https://www.stulz.com/). Its air-conditioning division generated approximately **€800 million in FY2024 revenue**, with the consolidated STULZ Group reaching **approximately €1,700 million** [[1]](https://www.linkedin.com/company/stulz-global?trk=ppro_cprof) [[6]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1). The company is 100% privately held by the Stulz family with no PE involvement and no public listing [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255).

Four findings define the cybersecurity sales posture:

- **Zero IEC 62443 certifications** exist for any Stulz product across ISASecure, exida, TÜV SÜD, TÜV Rheinland, or Kiwa databases, placing Stulz 2–5 years behind Schneider Electric (NMC3 at SL2 since December 2023) and Johnson Controls (YORK YK/YZ at CSA L1 since November 2021) [[110]](https://isasecure.org/end-users/iec-62443-4-2-certified-components) [[112]](https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations) [[86]](https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/) [[107]](https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification).
- **No PSIRT, no coordinated vulnerability disclosure policy, and no security advisory page** exist on any official Stulz domain — a hard blocker for EU CRA Article 14 compliance, which mandates a reporting capability by September 11, 2026 [[156]](https://www.encryptionconsulting.com/step-by-step-guide-to-cyber-resilience-act-cra-compliance/) [[126]](https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/).
- **Default credentials are documented** in Stulz's own technical manuals: pCOweb card (admin/"fadmin") and the legacy WIB 8000 (ganymed/kallisto/europa) [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/), and protocol stacks include HTTP without confirmed HTTPS enforcement across networked BACnet IP, SNMP, and Modbus TCP/IP interfaces [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) [[55]](https://www.stulz.com/integrated-liquid-cooling-system/).
- **No SBOM exists** for any product despite the Linux-based CyberHub ECO.DC DCIM platform and embedded firmware stack requiring full bill-of-materials disclosure under CRA and BSI TR-03183-2 by December 2027 [[157]](https://goregulus.com/cra-requirements/cra-sbom-requirements/) [[158]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html).

Stulz's **data center customers** — classified as Essential Entities under NIS2 — face NIS2 Article 21(3) supply chain obligations that will force them to audit Stulz's security posture within 12–18 months. This creates a dual-sided opportunity: direct engagement with Stulz on CRA remediation and indirect leverage through buyer-side supply chain risk assessments.

---

## 1. Company Overview

### Legal Identity and Corporate Structure

**Full Legal Name:** Stulz GmbH
**Registration:** District Court of Hamburg, HRB 16255 [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255)
**Parent/Holding Entity:** Stulz Verwaltungs GmbH & Co. KG, registered HRA 126445, Hamburg [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[5]](https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445)
**Registered Corporate Purpose:** "The manufacture and distribution of electronic equipment, air conditioning and ventilation technology" [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255)
**Registered Capital:** €47.1 million (updated December 19, 2024) [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255)
**Headquarters:** Holsteiner Chaussee 283, 22457 Hamburg, Germany [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[9]](https://www.stulz.com/)
**Founded:** 1947, Hamburg, as "Electro AS GmbH Hamburg" by Albert Stulz; first climate control product launched 1953; precision cooling specialization in data centers and telecoms began with international expansion from 1974 [[39]](https://www.stulz.com/en-us/about-stulz/our-history/) [[163]](https://www.stulz.com/en-mx/about-us/our-history/)
**Ownership:** 100% privately held, family-owned; third-generation family management confirmed; no PE investment, no public listing [[1]](https://www.linkedin.com/company/stulz-global?trk=ppro_cprof) [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255)

**Sister entities and subsidiaries of note:**
- **Montaplast GmbH:** Sister company in automotive technical solutions under STULZ Group ownership [[37]](https://www.montaplast.com/en/company/stulz-group)
- **ELIQUO STULZ GmbH** (Gräfenhausen, Germany): Water/wastewater treatment; CEO Martin Stulz; part of SKion Water GmbH / ELIQUO WATER GROUP (owned by Susanne Klatten); 501 employees; 19 patents; more than 1,500 reference installations; **NOTE — separate corporate structure from the precision cooling business** [[119]](https://www.chemeurope.com/en/companies/17965/eliquo-stulz-gmbh.html) [[120]](https://www.eliquowater.com/en/news-details/eliquo-water-group-enables-a-new-start-for-parts-of-the-shegroup.html) [[121]](https://discovery-patsnap-com.libproxy.mit.edu/company/eliquo-stulz/)
- **STULZ Modular Ltd** (UK): Modular and containerized data center design, build, and maintenance [[115]](https://www.stulz-modular.com/modular-data-centres/)
- **STULZ Digital Solutions GmbH:** Joint venture with Digitronic Automationsanlagen GmbH for DCIM software (CyberHub ECO.DC); established 2017 [[32]](https://www.datacenterdynamics.com/en/news/stulz-officially-launches-its-own-dcim-suite/) [[33]](https://www.fmindustry.com/en/2017/news/2737/New-DCIM-Software-for-Savings-and-Reduced-Risk-STULZ-CybeRack-Digitronic-Automationsanlagen-CyberHub-ECODC-product-launch-data-centre-infrastructure-management-facility-managers-HVAC-specialists-energy-optimisation-performance-Company-News-Data-Centres-Data-Centre-Infrastructure-Management-(DCIM).htm)
- **STULZ Air Technology Systems, Inc.** (Frederick, Maryland): North American headquarters and manufacturing; founded 2001; approximately 282 employees [[51]](https://craft.co/stulz-usa) [[142]](https://www.linkedin.com/company/stulz-usa/jobs)

### Global Footprint

| Region | Key Locations |
|---|---|
| **EMEA HQ** | Hamburg, Germany; Dubai (EMEA Center of Excellence) |
| **Europe** | Austria (Vienna), Belgium (Brussels), France (Rueil Malmaison), Ireland (Dublin), Italy (Valeggio sul Mincio), Netherlands (Hoofddorp), Poland (Warsaw), Spain (Alcorcón/Madrid; Esquivias/Toledo — production), Sweden (Stockholm), UK (Chessington, Surrey; STULZ Modular Ltd) |
| **Americas** | USA (Frederick, MD — North American HQ; Dayton, TN; Denton, TX — NEW May 2026), Brazil, Mexico (Mexico City — opened September 2022) |
| **Asia-Pacific** | China (Hangzhou; Shanghai), Hong Kong SAR, India (Mumbai — STULZ-CHSPL, founded 1999), Indonesia, Malaysia, Singapore, Thailand, Vietnam |
| **Oceania** | Australia (Sydney), New Zealand (Auckland) |
| **Africa** | South Africa (Gauteng) |

**Total network:** 35 subsidiaries, 10 production sites, over 150 exclusive sales and service partners in 140+ countries [[7]](https://www.stulz.com/en-in/company/profile/stulz-worldwide/) [[9]](https://www.stulz.com/) [[17]](https://www.stulz.com/en-de/about-us/our-network/)

The Esquivias (Toledo, Spain) facility is particularly noteworthy from an OT security standpoint: a **40,000 m² production site** representing approximately €50 million in capital investment, employing approximately 300 workers including 35+ specialized engineers, manufacturing air handling units, condensers, drycoolers, fancoils, air curtains, coils, and extractors [[170]](https://www.interempresas.net/Climatizacion/Articulos/463444-Visita-a-la-planta-de-Stulz-en-Esquivias.html) [[171]](https://www.stulz.com/en-es/about-us/production-plant/). This facility hosts the **Jürgen Stulz Test Center** — 1,100 m², testing capacity up to 1 MW IT power load, airflow up to 300,000 m³/h — described as one of Europe's most powerful HVAC test facilities, operational since 2022 [[172]](https://www.achrnews.com/articles/162881-stulzs-air-conditioning-test-center-is-one-of-europes-most-powerful) [[173]](https://www.stulz.com/en-mx/newsroom/detail/europes-largest-air-conditioning-test-center-means-stulz-can-offer-climate-control-excellence-1-1/).

**New facility signal:** STULZ USA announced a new Manufacturing and Innovation Facility in Denton, Texas on May 5, 2026, alongside STULZ USA President Brian Hatmaker's nomination for Maryland Tech Council ICON Awards in April 2026 [[40]](https://www.owler.com/company/stulzgmbh).

---

## 2. Financial Profile

Stulz GmbH is not required to publish full audited accounts under German private company law. No audited P&L, EBITDA, operating margin, R&D spend, capex, free cash flow, or net debt figures are publicly available. The following represents the best available estimates from company-disclosed sources.

| Metric | Figure | Source / Confidence |
|---|---|---|
| FY2024 Air-Conditioning Division Revenue | ~€800 million | Company self-disclosed (LinkedIn, official website) — Medium |
| FY2024 STULZ Group Total Revenue | ~€1,700 million | Company self-disclosed — Medium |
| FY2022 Air-Conditioning Division Revenue | ~€700 million | Single secondary source — Low-Medium |
| FY2020 Air-Conditioning Division Revenue | ~€750 million | Single secondary source — Low |
| India Subsidiary (FY2024, year-end March 31) | INR 100–500 crore (~€12–60M) | Tofler India filing — Medium |
| India Subsidiary EBITDA Growth YoY | +15.49% | Tofler India filing — Medium |
| Global Employees | ~8,200 | Company self-disclosed — Medium |
| Germany Employees | ~3,300 | Company self-disclosed — Medium |
| USA Employees (STULZ ATS) | ~282 | LinkedIn/Craft.co — Low-Medium |
| Spain (Esquivias) Employees | ~300 | Press interview — Medium |
| India (STULZ-CHSPL) Employees | ~196–300 | EasyLeadz / company data — Low |
| Registered Capital | €47.1 million (Dec 2024) | HRB 16255 German registry — High |
| RocketReach Revenue Estimate | \$1.5 billion | Third-party aggregator — Low |

**Revenue trend interpretation:** Growth from ~€700M (FY2022) to ~€800M (FY2024) in the air-conditioning division represents approximately 14% cumulative growth over two years, driven by accelerating data center construction and AI workload expansion. The Esquivias facility reported approximately **45% annual production growth** for the three years preceding 2023 [[170]](https://www.interempresas.net/Climatizacion/Articulos/463444-Visita-a-la-planta-de-Stulz-en-Esquivias.html), confirming demand acceleration.

**Data gap advisory:** No EBITDA, R&D spend, capex, FCF, or net debt/leverage figures are obtainable from public sources. Stulz publishes Sustainability Reports for 2022, 2023, and 2024 (available at stulz.com) [[143]](https://www.stulz.com/about-us/general-information/sustainability/); the 2022 report contains the most granular operational data (energy, waste, workforce) but does not disclose financial margins [[147]](https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf).

---

## 3. Complete Product Catalog

### 3.1 Precision Air Cooling (Core Revenue Driver)

**CyberAir Series — Flagship Perimeter Cooling:**
- **CyberAir CW (CRAH):** 60–1,080 kW; described as having the largest capacity perimeter chilled water air handlers in the industry; dual 2-way CW valves standard on CFD-510 and larger units [[20]](https://www.stulz.com/en-us/products/detail/cyberaircwanddx/) [[22]](https://www.hmcragg.com/product/stulz-cyberair-crah/)
- **CyberAir DX (CRAC):** 20–105 kW; high-efficiency scroll compressors; EC fan options [[20]](https://www.stulz.com/en-us/products/detail/cyberaircwanddx/) [[23]](https://www.hmcragg.com/product/stulz-cyberair-crac/)
- **CyberAir 3PRO DX:** Six sizes, 20–150 kW; refrigerants R407C, R410A, R134a; five cooling system types (A/AS air-cooled, G water-cooled, GE/GES hybrid free cooling, ACW air-cooled chilled water, GCW water-cooled chilled water); **Modbus protocol preinstalled out of box**; in-house controller managing up to 20 units; supports ASD (downflow), ASU (upflow), ASR (raised floor) configurations [[34]](https://www.laka.cz/wp-content/uploads/STULZ_CyberAir_3PRO_DX_ASR_brochure_1805_EN.pdf)
- **CyberAir 3PRO DX GE4(S):** Launched May 2025; **R454C refrigerant (GWP 148, A2L classification)**; 24–71 kW; F-Gas Regulation 2024/573 compliant [[145]](https://www.stulz.com/newsroom/detail/stulz-drives-down-greenhouse-gas-emissions-with-low-gwp-r454c-refrigerant/)
- **CyberAir ASD models:** Enhanced with low-GWP R513A refrigerant [[148]](https://www.stulz.com/newsroom/detail/stulz-enhances-sustainability-of-cyberair-3pro-dx-with-low-gwp-r513a-refrigerant/)
- **CyberAir 1 (2003):** Historical significance — world's first precision air-conditioning system with high-efficiency EC fans as standard [[144]](https://www.stulz.com/en-in/company/values/sustainability/)

**CyberRow Series — In-Row Cooling:**
- Capacity: 13–58 kW; six models; 300–600mm wide; 1,200–1,375mm deep
- Refrigerant: R410A (GWP 2,088); variable-speed compressor; water-side economizer; EC fans
- Five cooling system types: air-cooled, water-cooled, hybrid free cooling (GES), chilled water (CW/CW2) [[21]](https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/)

**CyberOne Series — Compact Precision:**
- COS-024, 042, 060: 7–19 kW; COS-096, 120: 26–35 kW; 100% front service access; direct drive (no belt); made in USA [[25]](https://www.stulz.com/en-us/products/detail/cyberone/?gad_campaignid=23514349369&hsa_cam=23514349369&cHash=da874fd3b81074d1d7385ea79344bdf4)

**CyberWall — Fan Wall AHU for Hyperscale:**
- Modular chilled water air handling unit; horizontal airflow technology; approximately 100 kW cooling per meter of wall length; optional STULZ E2 plus microprocessor controller with LCD display [[186]](https://www.globalsecuritymag.com/STULZ-offers-next-generation-data,20200701,100242.html) [[200]](https://www.stulz.com/en-us/products/detail/cyberwall-ahu/)

**Additional precision cooling platforms:** CeilAir (ceiling-mounted, DX/CW, ducted options), CyberHandler (pre-engineered outdoor AHU), WallAir-3 (outdoor, up to 16 kW, 5G applications), TelAir 3 (Edge/5G indoor, 4–16 kW, upflow/downflow/displacement), Mini-Space (3–25 kW), Compact-CWE (30–360 kW), CyberTWO EC (dual circuit DX, from 21 kW), CyberLab (labs/archives/museums precision climate), ShelterAir FC (free cooling, 4–15 kW, up to 96% energy savings) [[24]](https://hi-techenvironments.com/stulz-precision-cooling/) [[52]](https://www.stulz.com/en-at/products/detail/telair/) [[53]](https://www.stulz.com/en-de/products/detail/shelterair-fc/) [[199]](https://www.stulzoceania.com/products/detail/cyberlab/)

### 3.2 Liquid Cooling

**CyberCool CMU (Coolant Management Unit):**
- Launched at Data Centre World Frankfurt (May 22-23, 2024); manufactured at Hamburg HQ [[16]](https://www.stulz.com/newsroom/detail/stulz-on-producing-cybercool-cmu-at-its-hamburg-hq/) [[61]](https://www.stulz.com/newsroom/detail/stulz-launches-coolant-distribution-unit/)
- Central component for both direct liquid-to-chip cooling (DCLC) and immersion cooling
- Controls supply temperature (±0.5°C accuracy) and flow rate; isolates Facility Water System (FWS) from Technology Cooling System (TCS)
- Available up to 1,380 kW continuously variable output power [[177]](https://www.dutchdatacenters.nl/en/nieuws/stulz-invests-in-new-production-facility-for-liquid-cooling-solutions-at-hamburg-headquarters/)

**CyberCool CDU:** Isolates FWS from TCS; precisely controls coolant supply temperature and flow [[55]](https://www.stulz.com/integrated-liquid-cooling-system/)

**CyberCool Indoor:** Free cooling chiller; can function as CDU; integrated water circuit, heat exchanger, and pumps [[62]](https://www.stulz.com/en-fr/solutions/technologies/liquid-cooling/)

**Integrated Liquid Cooling System:**
- All-in-one; up to 100 kW per rack
- Architecture: 80% DCLC racks with manifolds + 20% CyberRack Active Rear Doors (air-cooled)
- Full protocol stack: RS485, RJ45, Modbus RTU, Modbus TCP/IP, BACnet IP, SNMP, HTTP
- Real-time monitoring: water flow, cooling capacity, power, pPUE; pH/conductivity/leak detection
- Sanitary-grade stainless steel pipes; 50 μm water filter (25 μm optional)
- Redundant CDU options; cold standby and hot standby modes [[55]](https://www.stulz.com/integrated-liquid-cooling-system/)

**Immersion Cooling:** Full submersion in dielectric liquid; Stulz Modular division partners with Asperitas (Amsterdam, Netherlands) — partnership announced February 26, 2024 at Kickstart Europe Conference, Amsterdam; EMEA-focused; deployed at Emmy supercomputer (University of Göttingen, announced July 2024) [[58]](https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-1/) [[59]](https://www.asperitas.com/news/stulz-modular-and-asperitas) [[60]](https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-2/) [[116]](https://www.stulz-modular.com/)

**Project Deschutes CDU (OCP-Aligned):** Data Center Dynamics reported in May 2026 that "Delta, nVent, and Stulz have also developed Deschutes-compliant CDUs" — confirming Stulz CDUs meet Google's Project Deschutes 5th-generation OCP specification [[168]](https://www.datacenterdynamics.com/en/news/companies-show-off-google-inspired-project-deschutes-cdus/).

**CyberRack Active Rear Door:** Updated January 23, 2026 with enhanced performance and integration options; rear-mounted liquid/air hybrid cooling [[6]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1) [[55]](https://www.stulz.com/integrated-liquid-cooling-system/)

### 3.3 Free Cooling and Adiabatic

**Indirect Dynamic Free Cooling:** Hybrid with dynamic switching; reduces total energy consumption by up to 60% vs. mechanical chilling; compressor running time minimized [[42]](https://www.stulz.com/indirect-dynamic-free-cooling/)

**Direct Free Cooling:** No hydraulics; outside air enters through filtration; up to 90% total energy savings; automatic 4-stage switching (free cooling → extended free cooling → mixed mode → compressor mode) [[44]](https://www.stulz.com/solutions/free-cooling/) [[46]](https://www.stulz.com/en-de/direct-free-cooling/)

**Adiabatic Cooling:** Integrated with air handling units; applied in Interconnect Eindhoven project using CAREL ChillBooster units achieving approximately 69 kW cooling at only 0.25 kW power absorption [[175]](https://www.stulz-benelux.com/en/projects/interconnect/)

### 3.4 Industrial Drycoolers (STULZ Tecnivel Brand, Esquivias Spain)

| Series | Fan Size | Models | Power Range | Air Flow |
|---|---|---|---|---|
| EVI8 | 800mm (1 row) | 10 models | 45–182 kW | 45,000–120,000 m³/h |
| EV8 | 800mm (2 rows) | — | 116–458 kW | 80,000–160,000 m³/h |
| EA6 | 630mm | 20 models | 11–230 kW | 9,000–132,000 m³/h |
| EA8 | 800mm | 18 models | 13–280 kW | up to 200,000 m³/h |

All constructed with Cu tubes and aluminum (or Cu) fins; motors AC/EC compatible; zero water consumption; Legionella-free [[43]](https://www.stulz.com/en-es/products/detail/industrial-drycoolers/)

### 3.5 DCIM Software — CyberHub ECO.DC

A joint venture product of STULZ Digital Solutions GmbH (with Digitronic Automationsanlagen GmbH), launched 2017 [[32]](https://www.datacenterdynamics.com/en/news/stulz-officially-launches-its-own-dcim-suite/):

**Deployment:** On-premises (Linux-based OS, browser interface, data stored locally — customer retains full control) or SaaS (hosted in Germany, end-to-end encrypted, GDPR-compliant) [[30]](https://www.stulz.com/en-de/products/detail/cyberhub-ecodc/) [[179]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/) [[180]](https://www.stulz.com/products/detail/cyberhub-ecodc/)

**Protocols:** Modbus, M-Bus, SNMP [[31]](https://datacenternews.asia/story/new-3d-dcim-software-reduces-risk-costs-data-centers)

**Capabilities:** 24/7 monitoring; custom heatmaps; 3D thermal imaging; energy consumption tracking (electricity, gas, heat/cold); infrastructure capacity management (names, serial numbers, rack height units); payback calculation for investments; DIN 50001 certification-ready [[30]](https://www.stulz.com/en-de/products/detail/cyberhub-ecodc/) [[31]](https://datacenternews.asia/story/new-3d-dcim-software-reduces-risk-costs-data-centers)

**Security relevance:** CyberHub ECO.DC is Linux-based with open-source dependencies; no SBOM is publicly available; SaaS version processes data center operational data — constitutes likely Important Class I product candidate under CRA due to its network management function over energy infrastructure [[155]](https://cvdportal.com/compliance/building-automation)

### 3.6 Micro Data Center, Shelter Cooling, Humidifiers, PDUs

**STULZ Micro DC (STULZ Modular division):** 4–20 kW/rack; 42U/45U/48U; smart PDUs with environmental probes; 7" touchscreen; UPS + batteries; fire suppression option; optional liquid cooling to 100 kW/rack [[19]](https://www.stulz-modular.com/micro-data-centres/)

**TelAir (Shelter Cooling):** 4–16 kW; free cooling modes; 48V DC or 230V/50Hz backup; web interface; Ethernet port; optional high-temperature operation to 55°C (R134a); winter kit to -40°C [[52]](https://www.stulz.com/en-at/products/detail/telair/)

**ShelterAir FC:** 4–15 kW; 5,400 m³/h airflow; up to 96% savings via direct free cooling; EC fan speed-controlled; WIB 1000 interface option [[53]](https://www.stulz.com/en-de/products/detail/shelterair-fc/)

**Humidifiers:** DAH Ducted Air Humidifier (ultrasonic, 2.4–18.0 kg/hr); DRH; Ultra Series Controller [[54]](https://www.stulz.com/en-us/products/detail/dah-ducted-humidification/) [[56]](https://www.stulz.com/en-at/products/humidifiers/)

**Power Distribution:** Smart PDUs integrated into Micro DC and Integrated Liquid Cooling System; not a standalone PDU business — Stulz integrates third-party and in-house PDUs into combined solutions [[19]](https://www.stulz-modular.com/micro-data-centres/) [[55]](https://www.stulz.com/integrated-liquid-cooling-system/)

**Emerging Product Brands (Trademark Signals):**
- **STULZ HydroCool:** Registered June 11, 2025 — imminent liquid cooling product line
- **CyberNight:** Registered October 2024 — likely night/off-peak free cooling optimization
- **CompCare:** Registered December 17, 2025 — comprehensive maintenance service brand
- **STULZ Cyber360:** Registered February 26, 2026 — monitoring/visibility platform; no product documentation yet publicly available [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255)

---

## 4. Embedded Technology and OT Security

This section constitutes the core intelligence for IEC 62443 and CRA sales positioning.

### 4.1 Network Management Interfaces

**E² Controller (6000/7000 MIB FieldServer — primary precision cooling controller):**

| Protocol | Implementation Details |
|---|---|
| BACnet IP | Ethernet-based; no username required for units using BACnet over IP [[152]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) |
| BACnet Ethernet | Native Ethernet; configuration via BMS menu [[152]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) |
| BACnet MS/TP | Serial (RS485); initialized via BACset software; 19,200 baud rate [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| HTTP | Web-based interface; accessible from any common browser; NO confirmed HTTPS-only enforcement [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| SNMP | Version NOT SPECIFIED in any available documentation — v1, v2c, or v3 unknown [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| Modbus RTU | RS485/RS232; 19,200 baud rate [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| Modbus TCP/IP | Ethernet-based Modbus [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) |
| Stulz Proprietary v1.7 | Read/write; float/binary/integer values; C6000 configurable as client or server [[47]](https://store.chipkin.com/products/stulz-to-modbus-rtutcp-quickserver-gateway) [[48]](https://store.chipkin.com/products/stulz-to-bacnet-mstp-quickserver-gateway) |

**SNMP version gap is critical:** SNMPv1 and v2c transmit community strings in cleartext and provide no per-message authentication. CRA Annex I requires encryption of data in transit using "state-of-the-art mechanisms." If Stulz currently uses SNMPv1/v2c, this is a direct CRA Annex I non-conformance.

**E² Controller access control:**
- Four-level password protection: Control (Level 1), Service (Level 2), Factory (Level 3), Configuration
- Factory-shipped with preset passwords for all levels
- Session timeout: 300 seconds (5 minutes) of inactivity
- pCOweb card default credentials: **username "admin", password "fadmin"** — documented in official controller communications manual; represents CWE-1393 (Use of Default Password) [[152]](https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf) [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf)

**Sec.Blue Controller (TelAir, WallAir, Chiller systems):**
- Integrated Ethernet interface
- Micro-SD port for firmware upgrades and data management
- Monitors outside and operating temperatures; regulates cooling capacity
- Three operational modes: free cooling, mixed mode, mechanical cooling [[193]](https://www.globalsecuritymag.com/STULZ-helps-data-centres-beat-the,20210720,114226.html) [[194]](https://www.coolingpost.com/products/stulz-booster-adds-free-cooling-functions/)

**CyberAir 3PRO DX Controller:**
- Modbus preinstalled (out of box)
- Data bus system; controls up to 20 units
- UPS operation with configurable power profiles [[34]](https://www.laka.cz/wp-content/uploads/STULZ_CyberAir_3PRO_DX_ASR_brochure_1805_EN.pdf)

**Integrated Liquid Cooling System protocols:** RS485, RJ45, Modbus RTU, Modbus TCP/IP, BACnet IP, SNMP, HTTP [[55]](https://www.stulz.com/integrated-liquid-cooling-system/)

**MQTT and REST API:** NOT documented in any available source for any Stulz product.

### 4.2 Firmware Update Mechanisms

**Status: Not publicly documented for any product line.** This is a first-order CRA compliance gap.

- **Sec.Blue controller:** Micro-SD port for firmware upgrades confirmed [[194]](https://www.coolingpost.com/products/stulz-booster-adds-free-cooling-functions/); this is a **manual, local, physical-media update mechanism** — no OTA (Over-the-Air) capability documented
- **E² Controller:** Flash memory used for parameter storage; software versions documented to v3.24 (July 2015) in available manuals [[153]](https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf); no current firmware version, no OTA documentation, no signed firmware documentation
- **CyberAir 3PRO:** Service interface referenced; no update mechanism detail available
- **Flash memory lifecycle note:** Controller documentation acknowledges "any flash memory has a limited number of write cycles before it fails," typical limit approximately 1 million cycles [[49]](http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf) — relevant to understanding firmware architecture but does not confirm secure update implementation

**Critical absences:** No documentation of signed firmware, firmware signature verification before installation, rollback protection, or secure boot exists in any publicly available Stulz technical documentation.

### 4.3 Known Vulnerabilities — Last 36 Months (June 2023 – June 2026)

**Result: ZERO CVEs identified in NVD or CISA ICS advisory database for any Stulz product during this period** [[13]](https://nvd.nist.gov/vuln) [[14]](https://nvd.nist.gov/vuln/vulnerability-status) [[15]](https://nvd.nist.gov/) [[197]](https://www.icsadvisoryproject.com/).

**Historical vulnerability of ongoing relevance:**

| Field | Detail |
|---|---|
| **Product** | WIB 8000 (Air Conditioning Web Interface Board) |
| **Firmware Version** | 1.18 |
| **ICS-CERT ID** | ICS-VU-614512 |
| **Published** | September 7, 2013 |
| **Vulnerability 1** | Admin email and password transmitted in cleartext HTML source code; client-side JavaScript masking only; no SSL/TLS [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) |
| **Vulnerability 2** | Default credentials with NO username: "ganymed" (full administrator), "kallisto" (read/write, Info/Operate levels), "europa" (read-only) [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) |
| **Vulnerable endpoint** | `/wibConf.htm?lang=en&id=...&page=6` [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) |
| **CVE Number** | Not confirmed from primary CISA source; ICS-CERT advisory predates modern NVD integration [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) |
| **CVSS Score** | Not confirmed; official CISA advisory not retrieved; secondary blog source only [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) |
| **Patch Status** | Unknown; no public patch notice found |
| **Persistence** | WIB 8000 firmware v1.37 confirmed in active Schneider Electric EcoStruxure IT (DCE 7.8) deployments in 2020 — 7 years post-vulnerability [[191]](https://community.se.com/t5/EcoStruxure-IT-forum/Stulz-WIB-8000-communication-with-DCE/td-p/237269) [[190]](https://community.se.com/t5/EcoStruxure-IT-forum/DDF-Stulz-WIB-8000/td-p/203406) |

**Interpretation for sales context:** The absence of CVEs post-2013 most likely reflects **absence of security research on Stulz products** rather than absence of vulnerabilities. The documented default credentials in the E² pCOweb card (admin/"fadmin") and the WIB 8000 pattern (ganymed/kallisto/europa) suggest a persistent organizational culture of shipping products with hardcoded default credentials. Without a PSIRT function, vulnerabilities found by researchers have no formal intake channel and would not result in public CVE disclosure.

### 4.4 IEC 62443 Certification Status

| Standard | Status | Source |
|---|---|---|
| IEC 62443-4-2 (CSA — Component Security Assurance) | **NOT LISTED** in ISASecure certified components database | [[110]](https://isasecure.org/end-users/iec-62443-4-2-certified-components) |
| IEC 62443-4-1 (SDLA — Secure Development Lifecycle Assurance) | **NOT LISTED** in ISASecure SDLA certified organizations | [[112]](https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations) |
| exida certification (any product) | **Not found** | [[103]](https://www.exida.com/Certification/Safety_Awards) [[104]](https://www.exida.com/certification) |
| TÜV SÜD certification (any product) | **Not found** | [[85]](https://www.tuvsud.com/-/jssmedia/global/pdf-files/brochures-and-infosheets/tuvsud-iec-62443-certification.pdf) |
| TÜV Rheinland certification (any product) | **Not found** | [[149]](https://www.certipedia.com/) [[150]](https://www.tuv.com/content-media-files/master-content/global-landingpages/images/functional-safety-meets-cybersecurity/tuv-rheinland-security-certification-according-to-iec-62443.pdf) |
| Kiwa certification (any product) | **Not found** | [[35]](https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/) [[36]](https://www.kiwa.com/nl/en-nl/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/) |

**Competitive gap is severe.** Johnson Controls YORK YK/YZ achieved the world's first ISASecure CSA Level 1 certification for smart buildings in November 2021 via exida [[107]](https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification) [[108]](https://www.achrnews.com/articles/145756-johnson-controls-earns-isasecure-component-security-assurance-certification-for-smart-buildings-product) [[109]](https://www.johnsoncontrols.com/media-center/news/press-releases/2021/11/09/isasecure-component-security-assurance-certification-for-a-smart-buildings-product). By 2024, Johnson Controls had expanded to six+ chiller models certified, including YVAA, YVFA, and YMC2 series [[106]](https://www.supplyht.com/articles/105807-johnson-controls-receives-cybersecurity-certification-for-three-chillers) [[107]](https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification) [[110]](https://isasecure.org/end-users/iec-62443-4-2-certified-components). Schneider Electric's NMC3 (embedded in EcoStruxure IT DCIM products) achieved IEC 62443-4-2 Security Level 2 from TÜV Rheinland in December 2023 and also holds ISASecure SDLA certification [[86]](https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/) [[132]](https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/) [[133]](https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/) [[111]](https://www.securityinfowatch.com/cybersecurity/press-release/55233674/schneider-electric-obtains-high-level-cybersecurity-certification-for-ecostruxure-it-dcim-solutions). Trane Technologies achieved ISASecure SDLA 3.0.0 for its Swords, Ireland development organization on April 9, 2026 [[112]](https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations). Stulz holds no certifications at any level.

### 4.5 SBOM Status

**No Software Bill of Materials has been publicly identified for any Stulz product.** Given that:
- CyberHub ECO.DC runs on Linux OS with Modbus, M-Bus, SNMP libraries and browser stack [[30]](https://www.stulz.com/en-de/products/detail/cyberhub-ecodc/) [[31]](https://datacenternews.asia/story/new-3d-dcim-software-reduces-risk-costs-data-centers)
- The E² controller runs embedded firmware with proprietary and potentially third-party components
- The Sec.Blue controller manages Ethernet communications and micro-SD file operations

...the CRA-mandated SBOM obligation (CycloneDX 1.6+ or SPDX 3.0.1+ in JSON/XML per BSI TR-03183-2 v2.1.0) will require significant engineering effort to produce and maintain [[157]](https://goregulus.com/cra-requirements/cra-sbom-requirements/) [[160]](https://sbomify.com/compliance/eu-cra/).

### 4.6 OCP Participation

**Indirect alignment confirmed; formal membership unconfirmed.** Data Center Dynamics (May 7, 2026) reported that "Delta, nVent, and Stulz have also developed Deschutes-compliant CDUs," referring to Google's Project Deschutes 5th-generation OCP specification [[168]](https://www.datacenterdynamics.com/en/news/companies-show-off-google-inspired-project-deschutes-cdus/). Formal OCP membership directory status is not confirmed from OCP.org [[166]](https://www.opencompute.org/membership) [[167]](https://www.opencompute.org/membership/membership-directory).

### 4.7 PSIRT Function

**No PSIRT exists.** No security advisory page, no coordinated vulnerability disclosure policy, no psirt@stulz.com or security@stulz.com address has been identified on any official Stulz domain [[76]](https://www.linkedin.com/pulse/what-product-security-incident-response-team-psirt-chris-pepin) [[77]](https://www.akamai.com/glossary/product-security-incident-response-team-psirt). This is in direct contrast with industry peers including Phoenix Contact, Cisco, Mitsubishi Electric, IBM, Nokia, Telit, and Ericsson, which all maintain public PSIRT pages [[63]](https://www.phoenixcontact.com/en-pc/service-and-support/psirt) [[64]](https://sec.cloudapps.cisco.com/security/center/resources/security_vulnerability_policy.html) [[65]](https://www.mitsubishielectric.com/psirt/disclosurepolicy/index.html) [[66]](https://www.ibm.com/trust/security-vulnerability-management) [[67]](https://www.nokia.com/we-are-nokia/security/product-security-advisory/) [[68]](https://www.telit.com/about/psirt/) [[69]](https://www.ericsson.com/en/about-us/security/ericsson-product-security-and-vulnerability-disclosure-policy).

CRA Article 14 reporting obligations commence September 11, 2026. Stulz has no disclosed capability to satisfy those obligations at present.

---

## 5. Regulatory Exposure Analysis

### 5.1 EU Cyber Resilience Act (Regulation (EU) 2024/2847)

**CRA in force:** December 10, 2024
**Reporting obligations start:** September 11, 2026 (actively exploited vulnerabilities within 24 hours; full incident reports within 72 hours; final reports within 14 days post-patch) [[122]](https://cyberstand.eu/cyber-resilience-act-overview) [[123]](https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/) [[126]](https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/)
**Full compliance deadline:** December 11, 2027 [[122]](https://cyberstand.eu/cyber-resilience-act-overview) [[123]](https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/)
**Maximum penalty:** Up to €15 million or 2.5% of global annual turnover (whichever higher) for essential requirement breaches [[123]](https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/). At ~€800M AC division revenue, 2.5% = **~€20 million**.

**Products qualifying as "products with digital elements" (Article 3(1)):**

Any product whose intended or foreseeable use includes direct or indirect logical or physical data connection to a network qualifies [[124]](https://compliancehub.wiki/eu-cyber-resilience-act-implementation-guide-building-secure-products-for-europes-digital-future/). The following Stulz product families qualify:

| Product Family | Network Connectivity Confirmed | CRA Scope |
|---|---|---|
| CyberAir / CyberRow / CyberOne with E² controller | BACnet IP, HTTP, SNMP, Modbus TCP/IP | In scope |
| CyberWall with E² plus controller | BACnet IP, Modbus, SNMP, HTTP | In scope |
| Integrated Liquid Cooling System | Modbus TCP/IP, BACnet IP, SNMP, HTTP, RS485/RJ45 | In scope |
| CyberCool CMU / CDU (networked versions) | Network-connected monitoring | In scope |
| CyberHub ECO.DC DCIM software | Modbus, M-Bus, SNMP; browser-based | In scope (SaaS and on-premises) |
| Sec.Blue controller (TelAir, WallAir, Chillers) | Ethernet, micro-SD, web interface | In scope |
| Micro DC (smart PDU, 7" monitoring display, remote access) | Network-connected monitoring | In scope |

**Article 7 Classification Assessment:**

| Product | Likely CRA Category | Rationale |
|---|---|---|
| CyberAir/CyberRow/CyberOne with E² | **Default Category** | Core function is cooling; no security-relevant core functionality; self-assessment sufficient |
| CyberHub ECO.DC DCIM (on-prem or SaaS) | **Important Class I candidate** | Core function = network management of energy data across facility; aligns with "network management systems" in CRA Annex III [[117]](https://cyber-resilience-act.com/cra/chapter-1/article-7/) [[118]](https://zealience.com/resource-hub/cyber-resilience-act-product-categories/) |
| Integrated Liquid Cooling System | **Default Category** | Core function is cooling; full protocol stack present but security function not primary |
| Micro DC (monitoring + PDU + UPS bundle) | **Default or Important Class I candidate** | Bundled critical infrastructure management; monitoring scope determines classification |
| Standalone Sec.Blue / E² controllers (sold as components) | **Default Category** | Component security assessment depends on integration context |

Important Category products require third-party conformity assessment — not self-assessment — raising the compliance cost and timeline significantly [[118]](https://zealience.com/resource-hub/cyber-resilience-act-product-categories/) [[123]](https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/).

**Documented CRA compliance gaps across all product families:**

1. **No CVD/PSIRT** — CRA Articles 13 and 14 require coordinated vulnerability disclosure and incident reporting capability; Stulz has none
2. **Default credentials** — pCOweb (admin/"fadmin"), WIB 8000 (ganymed/kallisto/europa); CRA Annex I explicitly prohibits default credentials that cannot be changed
3. **HTTP without HTTPS confirmation** — CRA Annex I requires encryption of data in transit; HTTP-only interfaces violate this
4. **SNMP version unspecified** — if SNMPv1/v2c, community strings transmitted in cleartext; violates data-in-transit encryption requirement
5. **No SBOM** — CRA mandates SBOM for every product with digital elements in machine-readable format
6. **No signed firmware documentation** — CRA requires integrity protection for software updates
7. **No documented secure boot** — CRA requires protection of device integrity at startup
8. **BACnet and Modbus without encryption** — BACnet/SC (Secure Connect) and Modbus/TLS (RFC 8966) exist as encrypted alternatives; neither is confirmed implemented by Stulz [[155]](https://cvdportal.com/compliance/building-automation) [[156]](https://www.encryptionconsulting.com/step-by-step-guide-to-cyber-resilience-act-cra-compliance/)

**Support and update obligations:** CRA requires minimum 5-year support period and security updates available for minimum 10 years [[125]](https://cloudsecurityalliance.org/blog/2025/11/18/an-overview-of-the-eu-cyber-resiliency-act-eu-cra). Stulz's own policy commits to spare parts availability for 10+ years post-discontinuation [[147]](https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf) — spare parts commitment aligns, but security patch obligation is architecturally separate and currently undocumented.

**BSI TR-03183 (German Federal Guidance — Directly Applicable):**
German-headquartered Stulz falls under BSI supervision. BSI TR-03183 comprises three parts plus Module H [[158]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html) [[159]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html):
- **Part 1:** General requirements (risk-based security measure selection, OSCAL format)
- **Part 2 (v2.1.0, August 2025):** SBOM — mandates CycloneDX 1.6+ or SPDX 3.0.1+ in JSON/XML [[160]](https://sbomify.com/compliance/eu-cra/)
- **Part 3 (v1.0.0, August 2025):** Vulnerability report handling
- **Module H (Community Draft, Feb 27, 2026):** ISO 27001-based conformity path — enables Stulz to leverage existing QMS toward CRA conformity [[161]](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.html) [[162]](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.pdf?__blob=publicationFile&v=4)

### 5.2 NIS2 Directive Obligations

**Stulz as manufacturer:** Classified as "important entity" under NIS2 manufacturing sector [[134]](https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/) [[135]](https://adrianstelmach.com/en/the-nis2-directive-in-the-manufacturing-sector-a-guide-for-companies/)
- Ex-post (reactive) supervision
- Fines up to **€7 million or 1.4% of global annual turnover** for non-compliance
- Germany transposed NIS2 via NIS2UmsuCG, effective December 6, 2025; BSI is supervising authority [[183]](https://www.aoshearman.com/en/insights/critical-infrastructure-new-legislation-in-germany-and-its-practical-impact) [[184]](https://www.openkritis.de/it-sicherheitsgesetz/german_cip_infrastructure_kritis.html)

**NIS2 Article 21 applicable requirements for Stulz:**
- Risk assessments and security policies for OT/IT systems [[136]](https://www.swidch.com/resources/blogs/a-comprehensive-guide-to-nis2-compliance-and-operational-technology-resilience)
- Cryptography and encryption policies [[137]](https://www.dataguard.com/nis2/requirements/)
- Incident handling plans
- Supply chain security assessments of Stulz's own component suppliers
- MFA for critical system access
- Business continuity planning [[136]](https://www.swidch.com/resources/blogs/a-comprehensive-guide-to-nis2-compliance-and-operational-technology-resilience) [[137]](https://www.dataguard.com/nis2/requirements/)

**Supply chain leverage:** Stulz's data center customers are "essential entities" under NIS2 (Digital Infrastructure sector, Annex I) [[189]](https://hyperproof.io/nis2/), subject to fines up to **€10 million or 2% of global annual revenue** [[189]](https://hyperproof.io/nis2/). These customers must assess their cooling infrastructure suppliers under NIS2 Article 21(3). ENISA's NIS2 Threat Landscape 2025 identifies supply-chain attacks as among the top NIS2 risks [[187]](https://diamatix.com/news-enisa-nis2-threat-landscape-2025/). This creates a direct procurement lever: data center operators will require Stulz to demonstrate IEC 62443 compliance or provide security attestations as a condition of contract renewal.

**IEC 62443 and NIS2 alignment:** ENISA has confirmed that IEC 62443 certification can serve as evidence of compliance with NIS2 Article 21 technical requirements for OT [[134]](https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/). Organizations implementing IEC 62443 security levels for zones and conduits satisfy a substantial portion of NIS2 obligations.

### 5.3 GDPR Data Processing Scope

Stulz GmbH is a **confirmed GDPR data controller** [[178]](https://www.stulz.com/about-stulz/data-protection-declaration/):
- **Data Protection Officer:** datenschutz@stulz.de
- **Data processed:** Server log files (retained maximum 30 days), contact form data (retained 6 months after last contact), direct marketing data (name, address, email, phone)
- **Legal bases:** Article 6(1)(f) GDPR (legitimate interest) for server logs; Article 6(1)(b) GDPR (contract) for customer communications [[178]](https://www.stulz.com/about-stulz/data-protection-declaration/)
- **Third-party processors:** Episerver/Optimizely Campaign (email, Berlin), Usercentrics (consent, Munich), Google Ireland Limited (Analytics, Tag Manager, Maps, YouTube), Vimeo LLC (USA — Standard Contractual Clauses applied) [[178]](https://www.stulz.com/about-stulz/data-protection-declaration/)
- **CyberHub ECO.DC GDPR exposure:** On-premises deployment stores all data locally (customer controlled, no Stulz access); SaaS deployment hosted in Germany, encrypted communication, GDPR-compliant per Stulz claims [[179]](https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/) [[180]](https://www.stulz.com/products/detail/cyberhub-ecodc/)

**Assessment:** The SaaS CyberHub ECO.DC represents the highest GDPR exposure surface if customer facility operational data (energy consumption patterns, asset locations, access logs) constitutes personal data or commercially sensitive data under GDPR Article 4(1).

### 5.4 German BSI / KRITIS Classification

Stulz GmbH is **not confirmed as a KRITIS operator** — the company manufactures cooling equipment; it does not operate critical infrastructure services for 500,000+ people [[181]](https://iot.telekom.com/en/blog/critical-infrastructures-protection-obligations-and-affected-companies) [[182]](https://www.logsign.com/blog/securing-critical-infrastructures-in-germany-navigating-kritis-regulation/). However, two frameworks create exposure:

- **IT Security Act 2.0:** Manufacturers of IT products used in critical infrastructures have obligations under BSI Act (BSIG) §9a [[185]](https://logpoint.com/en/blog/how-does-kritis-impact-cybersecurity). Stulz products are embedded in KRITIS-sector facilities (data centers, telecoms, hospitals, finance).
- **KRITIS-Dachgesetz (March 17, 2026):** New German critical entities law implementing CER Directive; registration deadline for entities in scope: **July 17, 2026** [[183]](https://www.aoshearman.com/en/insights/critical-infrastructure-new-legislation-in-germany-and-its-practical-impact). Cooling equipment manufacturers supplying KRITIS-classified facilities may face scrutiny as critical suppliers.

KRITIS sectors overlap almost entirely with Stulz's stated target verticals (energy, water, IT/telecom, health, food, transport, finance, government) [[181]](https://iot.telekom.com/en/blog/critical-infrastructures-protection-obligations-and-affected-companies).

### 5.5 ENISA Classification

Stulz is not independently named in ENISA critical infrastructure classifications. However, ENISA's NIS2 guidance expressly states that support infrastructure for data centers — including "HVAC/cooling systems, fire suppression equipment, UPS, and physical access security" — **will come under increased cybersecurity scrutiny** under NIS2 [[188]](https://www.lexology.com/library/detail.aspx?g=b3397ca3-9bbe-4008-b5ad-96c22a0e9d37). This places Stulz's networked products within ENISA's operational technology risk scope.

---

## 6. Organizational Structure and Security Leadership

### 6.1 Managing Directors and C-Suite

**Confirmed via Hamburg Commercial Registry HRB 16255:**

| Role | Name | LinkedIn | Prior Roles | Notes |
|---|---|---|---|---|
| Managing Director | **Christoph F. Stulz** | https://de.linkedin.com/in/christoph-stulz-03a33547 | Not disclosed in public sources | Family member; confirmed Feb 6, 2024 registry filing [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[75]](https://de.linkedin.com/in/christoph-stulz-03a33547) |
| Managing Director / CFO | **Thorsten Weiß** | https://www.linkedin.com/in/weissthorsten/ | STULZ USA; Neumann Kaffee Gruppe; Axel Springer | University of Kiel; Hamburg-based; confirmed Feb 6, 2024 [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) [[73]](https://www.linkedin.com/in/weissthorsten/) [[74]](https://rocketreach.co/thorsten-weiss-email_75203743) |

**Family leadership context:** Oliver Stulz (third-generation; University of Hamburg business degree; decade heading US production/manufacturing) was identified as Managing Director in October 2018 CEO Magazine interview [[2]](https://www.theceomagazine.com/executive-interviews/manufacturing/oliver-stulz/). Marc-Oliver Stulz referenced as President of STULZ ATS on XING [[174]](https://www.xing.com/profile/MarcOliver_Stulz). The family co-management model means the CEO designation may not exist as a formal title; current registry confirms Christoph F. Stulz and Thorsten Weiß as the operative leadership.

**Authorized Signatories (Prokurist, ppa):**

| Name | Status | Notes |
|---|---|---|
| **Karim Ait Younes** | Active (Dec 10, 2025) | [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) |
| **Thomas Steinberg** | Active (Dec 10, 2025) | Director Business Development; https://de.linkedin.com/in/thomas-steinberg-1072069 [[3]](https://www.linkedin.com/company/stulz-deutschland) [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) |
| **Antonius H. N. Fens** | Active (Apr 27, 2026) | [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) |
| Björn Kiffer | Former (replaced Dec 2025) | [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255) |

**Senior Management (third-party aggregator sources — unverified):**

| Role | Name | Location |
|---|---|---|
| CTO / Technical Director | Björn Granath | Stockholm, Sweden |
| Global Director of Technology | Joerg Desler | Assumed role September 1, 2023 [[4]](https://www.linkedin.com/in/joerg-desler-52101210/) |
| Head of Global Marketing | Jan Pohlgeers | Hamburg |
| Head of Global Purchasing | Jens Martens | Hamburg |
| VP Sales (India region) | Sital Bachhav | Mumbai |
| HR Manager | Nadia Perugini | Verona, Italy |

### 6.2 Security Leadership — Critical Gaps

| Security Role | Status |
|---|---|
| CISO | **Not identified** — role does not exist publicly |
| VP Product Security | **Not identified** — role does not exist publicly |
| PSIRT Lead | **Not identified** — no PSIRT function |
| Product Security Team | **No evidence** of dedicated function |
| Security Advisory Page | **Does not exist** |
| CVD Contact / Email | **Does not exist** (no psirt@stulz.com or security@stulz.com found) |

**Current hiring signal:** As of June 2026, Stulz lists 37 global positions on LinkedIn [[101]](https://www.linkedin.com/jobs/stulz-jobs-worldwide). **Zero of these roles are in cybersecurity, product security, firmware security, embedded security, or IEC 62443** [[99]](https://www.stulz.com/en-de/careers/) [[100]](https://www.stulz.com/en-de/careers/career-at-stulz/jobs/) [[101]](https://www.linkedin.com/jobs/stulz-jobs-worldwide). Current open roles include Product Manager – Sustaining & Compliance (STULZ USA — closest signal to compliance work), manufacturing engineers (Denton, TX), PLC engineers (India — requiring Siemens, ABB, Mitsubishi, CAREL ULC, Distech expertise), process engineers (Spain), and service technicians (Australia/USA) [[82]](https://careers-us.stulz.com/go/Frederick,-Maryland/9555200/) [[81]](https://www.stulz.com/en-in/careers/jobs/) [[102]](https://www.stulzoceania.com/careers/).

**Implication:** Zero internal cybersecurity headcount = zero in-house CRA compliance capability = maximum dependence on external advisory and assessment services.

### 6.3 Sustainability and Quality Governance

Stulz maintains formal sustainability governance [[147]](https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf):
- **Steering Committee:** Executive Management, Quality Management, Product Management
- **ISO 14001:** Hamburg production facility certified
- **ISO 9001:2015:** Group-wide quality management system certified
- **Works Council:** 13 members (5 women, 8 men)
- STULZ-CHSPL India: DIN EN ISO 9001:2008 TÜV NORD certified [[50]](https://www.easyleadz.com/company/stulz)
- **SDIA (Sustainable Digital Infrastructure Alliance):** Member; serves on steering committees for emissions/renewables [[146]](https://www.stulz.com/newsroom/detail/stulz-champions-digital-sustainability-2/)

---

## 7. Primary Customers

### 7.1 Named and Verified Customer Case Studies

| Customer | Location | Product Deployed | Key Metrics |
|---|---|---|---|
| **MyLoc Managed IT AG** | Utrecht, Netherlands (300+ colo customers) | 10× CyberAir 3 ALD 812 GE | 810 kW combined; trigeneration; 830 tonnes CO₂ reduced [[114]](https://www.stulz.co.uk/en/projects/myloc/) |
| **Interoute (Vtesse Cirrus)** | Hoddesdon, UK (Tier III+, 30,000 ft²) | CyberAir 3 DX + FreeCool Plenum | 1,400 kW total; PUE <1.4; up to 80% energy savings [[138]](https://www.stulz.com/projects/interoute/) |
| **3U TELECOM** | Hannover, Germany (600 m² colo) | 2× CyberCool 2 chillers + 4× CyberAir 3PRO CW | TIA-942 TIER-II; ~25% free cooling, 58% mixed mode, 17% compressor [[140]](https://www.stulz.com/projects/3u-telecom/) |
| **GESIS Leibniz Institute** | Cologne, Germany (75 m² DC) | 4× CyberAir 2 GE + 2× MiniSpace | 100,000 kWh/yr savings; 60 tonnes CO₂ reduction; pPUE 1.21; EER 8.1 [[139]](https://www.stulz.com/projects/gesis/) |
| **Vodacom Mozambique** | Maputo (disaster recovery DC) | CyberAir 3 (174 kW) via Flexenclosure eCentre | Built in 8 days; helipad rooftop installation [[141]](https://www.stulz.com/projects/vodacom/) |
| **Databarn** | Amsterdam, Netherlands | CyberCool 2 chiller (400 kW); free cooling | 5,100 kg unit crane-lifted to rooftop; Dutch fiber hub [[71]](https://www.stulz-benelux.com/en/projects/databarn-precision-cooling/) |
| **Interconnect** | Eindhoven, Netherlands | 6× CyberCool 2 (1,200 kW each) + CyberAir 3 + adiabatic CAREL | 69 kW cooling at 0.25 kW power absorption adiabatic [[175]](https://www.stulz-benelux.com/en/projects/interconnect/) |
| **Eurofiber** | Alblasserdam, Netherlands | Advanced cooling revamp | Disclosed project [[176]](https://www.stulz-benelux.com/en/projects/effective-cooling-and-service-for-a-datacenter-in-alblasserdam/) |
| **Emmy Supercomputer** | University of Göttingen, Germany | Immersion cooling (STULZ Modular + Asperitas) | 100 kW/rack; July 2024 announcement [[116]](https://www.stulz-modular.com/) [[131]](https://www.constructionhq.world/issue-sections/articles/power-generation/stulz-modular-configures-a-cutting-edge-hybrid-cooled-data-centre-for-the-university-of-goettingen-s-emmy-supercomputer/) |

Stulz's project portfolio (stulz.com/projects) lists 23 documented case studies globally, including **High-Speed Rail Milan-Venice, 1&1 Versatel, Deutsche Bahn charging substations, Data Vault, Stadium Galgenwaard** [[169]](https://www.stulz.com/projects). STULZ Benelux lists approximately 30 Benelux region projects [[196]](https://www.stulz-benelux.com/en/projects/).

### 7.2 Hyperscaler and Major Colocation Relationships

**Named hyperscalers (AWS, Azure, Google Cloud, Meta, Oracle Cloud):** NONE publicly confirmed. Market research (Grand View Research) states Stulz has "long-term hyperscaler partnerships" [[12]](https://www.grandviewresearch.com/industry-analysis/data-center-cooling-market), and Stulz's solutions pages explicitly address hyperscale and colocation markets [[45]](https://www.stulzoceania.com/solutions/colocation-and-cloud/) [[70]](https://www.stulz.com/solutions/colocation-and-cloud/), but no specific named relationships are disclosed in any public source. These relationships almost certainly exist under NDA.

**Named colocation providers (Equinix, Digital Realty, Iron Mountain, Vantage):** NONE confirmed. Documented case studies show European mid-tier colocation operators (MyLoc, Interoute, 3U Telecom, Databarn).

### 7.3 Vertical Markets Served

Data centers (hyperscale, colocation, enterprise), telecommunications (5G, shelter), government, healthcare, financial services, education, energy, manufacturing and industrial, broadcasting, retail, transportation, and HPC/supercomputing [[41]](https://www.stulz.com/solutions/industries/manufacturing/) [[72]](https://www.stulz.com/solutions/applications/). Healthcare, government, and finance are referenced in Stulz website navigation as solution verticals; no named customer case studies in defense or nuclear were identified.

---

## 8. Value Chain and Partners

### 8.1 Manufacturing Model

Stulz operates a **vertically integrated manufacturing model** for core precision cooling products — purchasing raw materials (copper, sheet metal) and transforming them through the full production chain, including painting lines, custom battery fabrication, and Industry 4.0 production methods at Esquivias [[170]](https://www.interempresas.net/Climatizacion/Articulos/463444-Visita-a-la-planta-de-Stulz-en-Esquivias.html).

**Supply sourcing (2022 Sustainability Report):** 54% Asia, 34% Europe, 12% Other; breakdown by type: 60% Commodities, 18% Mechanical components, 12% Electrical components, 1% Raw materials, 9% Other. Approximately 40% of purchase volume (excluding S-Klima) from German suppliers [[147]](https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf).

**No EMS (Electronic Manufacturing Services) or ODM partners are publicly disclosed.**

### 8.2 Technology Partnerships

| Partner | Type | Date | Details |
|---|---|---|---|
| **Asperitas** (Netherlands) | Immersion cooling | Feb 26, 2024 | STULZ Modular + Asperitas; Emmy supercomputer; EMEA-focused [[58]](https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-1/) [[59]](https://www.asperitas.com/news/stulz-modular-and-asperitas) |
| **CoolIT Systems** (Calgary, Canada) | Liquid cooling | 2016 | STULZ USA announced; server heat-at-source capture [[96]](https://www.hpcwire.com/off-the-wire/stulz-usa-announces-partnership-coolit-systems/) |
| **TSI** | Modular data center JV | 2016 | Modular data center kit design [[97]](https://www.datacenterdynamics.com/en/news/stulz-partners-with-tsi-to-design-modular-data-center-kit/) |
| **Digitronic Automationsanlagen GmbH** | DCIM JV | 2017 | STULZ Digital Solutions GmbH; CyberHub ECO.DC [[32]](https://www.datacenterdynamics.com/en/news/stulz-officially-launches-its-own-dcim-suite/) [[33]](https://www.fmindustry.com/en/2017/news/2737/New-DCIM-Software-for-Savings-and-Reduced-Risk-STULZ-CybeRack-Digitronic-Automationsanlagen-CyberHub-ECODC-product-launch-data-centre-infrastructure-management-facility-managers-HVAC-specialists-energy-optimisation-performance-Company-News-Data-Centres-Data-Centre-Infrastructure-Management-(DCIM).htm) |
| **Artus Air Limited** | Manufacturing | May 7, 2025 | Manufacturing partnership [[6]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1) |
| **Merford** | Acoustic testing | March 1, 2026 | Validated noise performance for data center cooling [[6]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1) |
| **CAREL** (Italy) | Components | Ongoing | ChillBooster adiabatic units (Interconnect project); likely broader component relationship [[175]](https://www.stulz-benelux.com/en/projects/interconnect/) |
| **Siemens** | PLCs | Ongoing | India manufacturing job spec requires Siemens PLC expertise [[81]](https://www.stulz.com/en-in/careers/jobs/) |

**Confirmed absence:** No formal technology partnerships with Cisco, Honeywell, or Microsoft identified for Stulz (in contrast to Honeywell-Cisco and Honeywell-Microsoft partnerships found in research) [[93]](https://www.cisco.com/site/us/en/solutions/global-partners/honeywell/index.html) [[94]](https://www.honeywell.com/us/en/company/partners/microsoft) [[95]](https://www.honeywell.com/us/en/company/partners).

### 8.3 Industry Memberships

- **German Datacenter Association (GDA):** Prime Partner, Technical Supplier category [[18]](https://www.germandatacenters.com/en/partner/stulz-gmbh/) [[87]](https://www.gdc-conference.com/en/partners-information/stulz/)
- **Eurovent:** Corresponding Member (joined March 30, 2026) [[6]](https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1)
- **SDIA (Sustainable Digital Infrastructure Alliance):** Member; steering committee [[146]](https://www.stulz.com/newsroom/detail/stulz-champions-digital-sustainability-2/)
- **ASHRAE:** Referenced for product design compliance (ASHRAE 2011 thermal guidelines; 7x24 ASHRAE operation design) [[92]](https://www.stulz.com/en-es/about-us/climate-customized/) [[91]](https://tpc.ashrae.org/Meetings?cmtKey=fd4a4ee6-96a3-4f61-8b85-43418dfa988d); sponsorship opportunities page accessed but confirmed sponsor tier not established [[90]](https://www.ashrae.org/conferences/conference-resources/sponsorship-opportunities)
- **ISA / ISAGCA:** Membership NOT confirmed [[198]](https://isagca.org/membership)
- **OCP:** Formal membership NOT confirmed; Deschutes CDU development indirectly suggests technical engagement [[168]](https://www.datacenterdynamics.com/en/news/companies-show-off-google-inspired-project-deschutes-cdus/)

### 8.4 Channel Program

**USA (STULZ Product Support Network — PSN):** Formal partner structure with certification requirements, factory-certified training classes, discounted pricing on software and communications tools; custom on-site or virtual owner training available [[113]](https://www.stulz.com/en-us/product-support/technician-training/).

**Global:** 150+ exclusive sales and service partners with exclusive agreements; partner network provides market intelligence and local technical support [[38]](https://www.stulz.com/about-stulz/our-network/). Individual European reseller names and certification tiers are not publicly documented.

---

## 9. Security Incidents — Full Record (Last 36 Months)

**Active period: June 2023 – June 2026**

| Date | Product | Advisory ID | Description | CVSS | Patch |
|---|---|---|---|---|---|
| — | — | — | **No CVEs found for any Stulz product** | — | — |

**Pre-period historical record (material for sales context):**

| Date | Product | Advisory ID | Vulnerability | CVSS | Patch Status |
|---|---|---|---|---|---|
| Sep 7, 2013 | WIB 8000 (fw 1.18) | ICS-VU-614512 | (1) Cleartext credential transmission in HTML; (2) Three default passwords without username requirement: "ganymed" (admin), "kallisto" (read/write), "europa" (read-only); (3) No SSL/TLS | **Not confirmed** from primary source | **Unknown**; WIB 8000 fw 1.37 seen in production in 2020 [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/) [[191]](https://community.se.com/t5/EcoStruxure-IT-forum/Stulz-WIB-8000-communication-with-DCE/td-p/237269) |

**Research limitations on CVE history:** The official CISA/ICS-CERT advisory document for ICS-VU-614512 was not retrieved; CVSS score and formal CVE number are unconfirmed from primary sources. All vulnerability detail is sourced from a security researcher blog post (Tier 5) [[151]](https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/). For authoritative data, consult CISA ICS advisory database directly.

**Persistence risk:** The WIB 8000 is integrated with Schneider Electric EcoStruxure IT (Data Center Expert) via SNMP discovery; customer community posts confirm WIB 8000 firmware v1.37 in DCE 7.8 deployments as late as September 2020 [[190]](https://community.se.com/t5/EcoStruxure-IT-forum/DDF-Stulz-WIB-8000/td-p/203406) [[191]](https://community.se.com/t5/EcoStruxure-IT-forum/Stulz-WIB-8000-communication-with-DCE/td-p/237269). The default credential pattern (hardcoded passwords at multiple access levels) mirrors the E² pCOweb default (admin/"fadmin"), suggesting systemic rather than isolated design decisions.

---

## 10. Publications and Industry Presence

### 10.1 Whitepapers and Technical Publications

| Title | Notes |
|---|---|
| "Liquid Cooling: When Performance Meets Sustainability" | stulz.com newsroom [[128]](https://www.stulz.com/newsroom/detail/liquid-cooling-performance-sustainability/) |
| "Liquid Cooling: Exponentially Increasing Power Density" | AI rack power density 70 kW → 600 kW+; stulz.com newsroom [[129]](https://www.stulz.com/newsroom/detail/liquid-cooling-exponentially-increasing-power-density/) |
| "Dynamic Free Cooling White Paper" | State-of-the-art energy-efficient data center AC [[127]](https://www.stulz.com/en-in/company/downloads/whitepapers/) |
| "Data Center Cooling Best Practice White Paper" | Industry best practices [[127]](https://www.stulz.com/en-in/company/downloads/whitepapers/) |
| "Stulz Article DC Power For Data Centers" | Power design considerations [[127]](https://www.stulz.com/en-in/company/downloads/whitepapers/) |
| "i-AHU Retrofitting Whitepaper" | Authored: Suresh Balakrishnan, Co-Founder and Joint MD of STULZ-CHSPL India (September 2018) [[127]](https://www.stulz.com/en-in/company/downloads/whitepapers/) |
| Emmy Supercomputer Case Study Whitepaper | Hybrid cooling; direct-to-chip + air; University of Göttingen cooperation [[131]](https://www.constructionhq.world/issue-sections/articles/power-generation/stulz-modular-configures-a-cutting-edge-hybrid-cooled-data-centre-for-the-university-of-goettingen-s-emmy-supercomputer/) |

**Technical Documentation Repository:** http://repository.stulz.com/ (accessible; contains Controller Communications Manual OCU0147, E² Operation Manual OZU0037M, CyberOne EC Engineering Manual, and additional product documentation) [[154]](https://repository.stulz.com/7F9B021F/) [[195]](http://repository.stulz.com/DD91A214/)

Full product engineering manuals available via stulz.com/en-us/documentation/ covering CyberAir CW/DX, CyberOne CW/DX, CyberRow CW/DX, CeilAir, heat rejection systems, glycol systems, and ultrasonic humidification [[130]](https://www.stulz.com/en-us/documentation/).

### 10.2 Conference Participation (2024–2026)

| Event | Date | Stulz Presence |
|---|---|---|
| **Kickstart Europe** | Feb 26-27, 2024, Amsterdam | STULZ Modular + Asperitas immersion cooling announcement [[58]](https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-1/) [[59]](https://www.asperitas.com/news/stulz-modular-and-asperitas) |
| **Data Centre World Frankfurt** | May 22-23, 2024, Hall 8 Stand B060 | CyberCool CMU launch; hands-on demonstrations [[61]](https://www.stulz.com/newsroom/detail/stulz-launches-coolant-distribution-unit/) |
| **SC24 (Supercomputing)** | Nov 17-22, 2024, Booth #1748 | Dave Meadows (STULZ USA Director of Technology) presented "Preventing accelerated degradation of liquid-cooled copper cold plates" (Nov 19, 2024) [[57]](https://www.einpresswire.com/article/760007750/stulz-to-exhibit-cutting-edge-liquid-cooling-solutions-at-sc24) |
| **Data Centre World Asia** | Oct 8-9, 2025, Booth E10, Marina Bay Sands, Singapore | Sai Suresh (Business Development Manager) presented "AI at Full Power – Cooling Smart and Future-Proof" [[88]](https://www.stulz.com/newsroom/detail/data-centre-world-asia-2025-10-08-09/) |
| **ISC 2026** | Jun 23-25, 2026, Booth E31, CCH Hamburg | **FIRST ISC participation**; focus on HPC liquid cooling [[89]](https://www.stulz.com/newsroom/detail/isc-2026-06-23-25/) |
| **GDC (German Datacenter Conference)** | Recurring | Platinum Partner [[87]](https://www.gdc-conference.com/en/partners-information/stulz/) |

**PSIRT / Security Advisory Page:** **Does not exist** on any stulz.com domain.

**STULZ USA Blog:** https://blog.stulz-usa.com/ (active; sustainability and product content)
**Global Newsroom:** https://www.stulz.com/newsroom/

---

## 11. Competitive Position

### 11.1 Market Standing

Stulz ranks as a **top-5 global data center cooling vendor** [[27]](https://www.prnewswire.com/news-releases/global-data-center-cooling-market-outlook--forecasts-2022-2027-major-vendors-are-airedale-international-air-conditioning-stulz-rittal-schneider-electric-and-vertiv-301541537.html) [[28]](https://siliconcanals.com/data-center-cooling-industry-assessment-2023-2028-landscape-dominated-by-airedale-international-air-conditioning-rittal-schneider-electric-stulz-and-vertiv-researchandmarkets-com/) [[29]](https://www.businesswire.com/news/home/20230823745108/en/Data-Center-Cooling-Industry-Assessment-2023-2028-Landscape-Dominated-by-Airedale-International-Air-Conditioning-Rittal-Schneider-Electric-STULZ-and-Vertiv---ResearchAndMarkets.com). In the broader data center air-cooling market (valued at USD 18.4 billion in 2024, growing at 10.2% CAGR through 2034), the top five competitors — Schneider Electric, Vertiv, Johnson Controls, Rittal, and Stulz — collectively hold approximately **25% global market share** [[10]](https://www.gminsights.com/industry-analysis/data-center-cooling-market). In the specialized liquid cooling segment (USD 4.8 billion in 2025, growing at 18.2% CAGR through 2035), Stulz ranks among the top seven alongside Vertiv (11.3% share leader), Schneider Electric, Rittal, Boyd, CoolIT, and Alfa Laval [[11]](https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market).

### 11.2 Named Competitors by Segment

| Competitor | Headquarters | Revenue / Share | IEC 62443 Status | Key Differentiator |
|---|---|---|---|---|
| **Schneider Electric** | France | 7.5% overall market share | **IEC 62443-4-2 SL2** (NMC3, TÜV Rheinland, Dec 2023); **SDLA** | EcoStruxure; Motivair acquisition (\$850M, Oct 2024) for liquid cooling [[10]](https://www.gminsights.com/industry-analysis/data-center-cooling-market) [[86]](https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/) [[133]](https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/) |
| **Vertiv Holdings** | USA | 11.3% liquid cooling market leader | Not documented in research | Liebert heritage; CoolTera acquisition (2023); full power+cooling portfolio [[11]](https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market) |
| **Johnson Controls** | Ireland (HQ) | Major smart buildings player | **ISASecure CSA L1** for YORK YK, YZ, YMC2, YVAA, YVFA (via exida) | World's first smart buildings CSA L1 (Nov 2021); 6+ certified models [[107]](https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification) [[108]](https://www.achrnews.com/articles/145756-johnson-controls-earns-isasecure-component-security-assurance-certification-for-smart-buildings-product) [[109]](https://www.johnsoncontrols.com/media-center/news/press-releases/2021/11/09/isasecure-component-security-assurance-certification-for-a-smart-buildings-product) |
| **Rittal GmbH & Co. KG** | Herborn, Germany | ~\$2.5 billion revenue | Not documented | Blue e+ rack cooling; Direct Liquid Cooling 70kW–1MW; strong European manufacturing [[26]](https://encoradvisors.com/data-center-cooling-companies/) |
| **Airedale International** | UK | — | Not documented | Engineering flexibility; free cooling with IoT connectivity |
| **Trane Technologies** | Ireland | — | **ISASecure SDLA 3.0.0** (April 9, 2026) | Process chiller expertise [[112]](https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations) |

**Competitive intelligence on IEC 62443:** Schneider Electric certified NMC3 at SL2 (December 2023) and holds SDLA certification; Johnson Controls has certified six+ chiller models at CSA L1 through exida since November 2021; Trane Technologies achieved organizational SDLA in April 2026. Stulz holds no certifications at any level, placing it at a significant competitive disadvantage as enterprise and government procurement increasingly requires IEC 62443 attestations.

**Note from exida:** exida has explicitly warned that "current IEC 62443 standard compliance alone will NOT be enough to guarantee legal entry" under EU CRA by December 2027 [[105]](https://www.linkedin.com/company/exida-com) — meaning IEC 62443 is a necessary but not sufficient condition for CRA compliance.

### 11.3 Recent M&A Activity (2021–2026)

**Stulz GmbH:** **Zero acquisitions or divestitures identified** for the 2021–2026 period. Growth has been entirely organic: Hamburg HQ liquid cooling production facility expansion (2025), Denton, Texas manufacturing facility (announced May 5, 2026) [[40]](https://www.owler.com/company/stulzgmbh).

**Competitive M&A context:**
- **October 2024:** Schneider Electric acquired 75% stake in Motivair Corporation for **\$850 million** — strengthened liquid cooling capabilities [[10]](https://www.gminsights.com/industry-analysis/data-center-cooling-market)
- **November 2024:** Flex acquired JetCool Technologies (Littleton, MA, founded 2019) for approximately **\$53 million** — microconvective direct liquid-to-chip cooling [[78]](https://www.prnewswire.com/news-releases/flex-acquires-jetcool-to-expand-data-center-and-power-portfolio-302306177.html) [[79]](https://investors.flex.com/news/news-details/2024/Flex-Acquires-JetCool-to-Expand-Data-Center-and-Power-Portfolio/default.aspx) [[80]](https://www.marketscreener.com/quote/stock/FLEX-LTD-4874/news/Flex-Ltd-acquired-JETCOOL-Technologies-Inc-for-approximately-53-million-48373196/)
- **October 2024:** Jabil acquired Mikros Technologies LLC — immersion cooling capabilities [[11]](https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market)
- **January 2024:** Modine acquired TMG Core IP/assets — immersion cooling [[11]](https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market)
- **2023:** Vertiv acquired CoolTera — CDU capabilities for AI/HPC [[11]](https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market)

The absence of Stulz M&A activity while every major competitor has made strategic liquid cooling acquisitions indicates Stulz is pursuing the liquid cooling pivot through organic engineering and partnerships (Asperitas, CoolIT Systems) rather than acquisition — a different capital allocation strategy that preserves family ownership control but may slow technological expansion compared to competitors backed by public-market capital.

---

## 12. GTM Signals and Spending Intelligence

### 12.1 Job Posting Analysis (June 2026)

37 active global openings across LinkedIn, Glassdoor (21-23 Hamburg positions), ZipRecruiter (9 positions), and official careers portal [[101]](https://www.linkedin.com/jobs/stulz-jobs-worldwide) [[98]](https://www.glassdoor.com/Jobs/STULZ-Hamburg-Jobs-EI_IE597319.0,5_IL.6,13_IM1059.htm) [[83]](https://www.glassdoor.com/Jobs/STULZ-Jobs-E597319.htm) [[84]](https://www.ziprecruiter.com/co/Stulz/Jobs).

**Functional distribution of open roles:**
- Manufacturing: Manufacturing Engineer (Denton TX), Ingeniero de Procesos (Spain), Production Engineer (India)
- Service and support: Service Technicians (USA multiple locations, Australia Melbourne/Sydney/Brisbane), Field Service Technician II (USA), Technical Support Technician I (USA)
- Engineering: Electrical Engineer (USA), Electrical Designer (Spain), Applications Engineer I/II/III (USA), PLC Engineer (India — Siemens, ABB, Mitsubishi, CAREL ULC, Distech expertise required)
- Management: Project Manager (USA), Technical Training and Enablement Manager (USA), Performance Test Lab Supervisor (USA)
- Compliance signal: **Product Manager – Sustaining & Compliance** (STULZ USA, Frederick MD) — closest indicator of regulatory compliance function
- Administrative: HR Assistant (Frederick MD), Front Desk Administrator (Denton TX)

**Cybersecurity hiring: ZERO.** No security engineer, firmware engineer, OT security specialist, IEC 62443 specialist, embedded security engineer, or CISO-level role is currently listed on any job platform [[99]](https://www.stulz.com/en-de/careers/) [[100]](https://www.stulz.com/en-de/careers/career-at-stulz/jobs/) [[101]](https://www.linkedin.com/jobs/stulz-jobs-worldwide) [[142]](https://www.linkedin.com/company/stulz-usa/jobs).

### 12.2 Conference Sponsorships as Spend Signals

| Conference | Tier / Position | Estimated Annual Commitment |
|---|---|---|
| GDC (German Datacenter Conference) | Platinum Partner | Estimated €30,000–75,000+ |
| ISC 2026 (Supercomputing, Hamburg) | Booth E31 | Moderate booth investment |
| Data Centre World Frankfurt | Hall 8 Stand B060 | Significant trade show spend |
| Data Centre World Asia | Booth E10 | APAC expansion investment |

### 12.3 Trademark / GTM Pipeline Signals

The German trademark registry reveals Stulz's near-term product roadmap [[8]](https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255):
- **STULZ HydroCool** (June 11, 2025): Dedicated liquid cooling brand; product launch expected imminently
- **CyberNight** (October 2024): Night/off-peak free cooling optimization — energy cost reduction product
- **CompCare** (December 17, 2025): Comprehensive maintenance/care service brand; aligns with Technical Facility Management upsell strategy
- **STULZ Cyber360** (February 26, 2026): 360° monitoring/visibility platform — name implies comprehensive infrastructure monitoring convergence; the "Cyber" prefix alongside "360" suggests possible security monitoring integration; **this is the highest-priority trademark to monitor for cybersecurity sales angle**

### 12.4 OT Security Sales Prioritization Framework

Based on the intelligence compiled in this report, engagement priority by service line:

| Service Line | Urgency | Revenue Potential | Entry Point |
|---|---|---|---|
| **CRA Gap Assessment** | Critical (Sept 2026 deadline) | High | BSI TR-03183 scoping; CVD/PSIRT design |
| **PSIRT Establishment** | Critical (Sept 2026 deadline) | Medium | Article 14 reporting architecture |
| **SBOM Generation** | High (Dec 2027 deadline) | High | CyberHub ECO.DC (Linux stack); E² firmware |
| **IEC 62443-4-1 SDL Assessment** | High (competitive parity) | High | Compete with Johnson Controls, Schneider, Trane |
| **IEC 62443-4-2 Component Certification** | High (buyer procurement pressure) | Very High | E² controller + CyberHub ECO.DC as first targets |
| **Protocol Security (SNMPv3, BACnet/SC, Modbus/TLS)** | High | Medium | Remediation engineering |
| **Default Credential Remediation** | High | Low-Medium | CRA Annex I non-conformance |
| **Firmware Signing / Secure Boot Architecture** | Medium | Medium | E², Sec.Blue, embedded stack |
| **NIS2 Supplier Attestation Package** | Medium | Medium | Data center customer supply chain audits |
| **ISO 27001 for CyberHub SaaS** | Medium | Medium | BSI TR-03183 Module H alignment |

**Buyer-side leverage:** The fastest path to an initial Stulz conversation may be through **Stulz's data center customers** — essential entities under NIS2 who must now audit their cooling infrastructure suppliers. An OT security firm that serves Equinix, Digital Realty, or comparable operators can create a top-down demand signal that accelerates Stulz's urgency to engage.

---

## Key Data Gaps and Confidence Caveats

The following intelligence could not be confirmed from publicly available sources and should be treated with explicit uncertainty:

| Gap | Reason | Alternative |
|---|---|---|
| FY2022/2023 audited revenue | Private company; no public accounts | Use FY2024 ~€800M (self-reported) with caveat |
| EBITDA, operating margins, R&D, capex, FCF, net debt | Not disclosed for private GmbH | Cannot estimate from available data |
| Named hyperscaler customers | Presumed NDA; not disclosed | Market research confirms hyperscale as primary target |
| Named colocation provider relationships | Not disclosed | Case studies show European mid-tier colos only |
| Official CVSS for ICS-VU-614512 | CISA advisory not retrieved; Tier 5 source only | Contact CISA directly at ics-cert.us-cert.gov [[192]](https://ics-cert.us-cert.gov/) |
| CVE number for WIB 8000 vulnerability | May not have been formally assigned | Query NVD and CERT/CC directly |
| SNMP version (v1/v2c/v3) in use | Not documented in any available technical manual | Requires device inspection or direct inquiry |
| Current firmware versions (Sec.Blue, E²) | E² manual reflects v3.24 (July 2015); current version unknown | Request from STULZ product support |
| STULZ Cyber360 product specifications | Trademark registered Feb 2026; no product documentation | Monitor stulz.com/newsroom for launch announcement |
| Formal OCP membership | Only Deschutes CDU alignment confirmed | Query OCP.org membership directory |
| Joerg Desler, Björn Granath details | Aggregator sources only; not verified via official Stulz sources | LinkedIn outreach; executive networking |

---

## Appendix: Key Contact and Registration References

| Item | Detail |
|---|---|
| Stulz GmbH Registry | Amtsgericht Hamburg HRB 16255 |
| Stulz Verwaltungs GmbH & Co. KG | Amtsgericht Hamburg HRA 126445 |
| Data Protection Officer | datenschutz@stulz.de |
| Technical Documentation Repository | http://repository.stulz.com/ |
| Official Newsroom | https://www.stulz.com/newsroom/ |
| Sustainability Reports (2022/2023/2024) | https://www.stulz.com/about-us/general-information/sustainability/ |
| USA Careers Portal | https://careers-us.stulz.com/ |
| Global Careers | https://www.stulz.com/en-de/careers/career-at-stulz/jobs/ |
| ISASecure Certified Products (negative check) | https://isasecure.org/end-users/iec-62443-4-2-certified-components [[110]](https://isasecure.org/end-users/iec-62443-4-2-certified-components) |
| ISASecure SDLA Certified Organizations (negative check) | https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations [[112]](https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations) |
| BSI TR-03183 Guidance | https://www.bsi.bund.de/EN/.../tr03183/ [[158]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html) [[159]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html) |
| EU CRA Official Text | Regulation (EU) 2024/2847 [[164]](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) |
| NIS2 Implementing Regulation | (EU) 2025/2392 [[165]](https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng) |

## Sources

[1] STULZ | LinkedIn - https://www.linkedin.com/company/stulz-global?trk=ppro_cprof
[2] Oliver Stulz Managing Director of STULZ GmbH - https://www.theceomagazine.com/executive-interviews/manufacturing/oliver-stulz/
[3] STULZ Deutschland | LinkedIn - https://www.linkedin.com/company/stulz-deutschland
[4] Joerg Desler - STULZ | LinkedIn - https://www.linkedin.com/in/joerg-desler-52101210/
[5] Stulz Verwaltungs GmbH & Co. KG, Hamburg, Germany, District Court of Hamburg HRA 126445: Network, Financial information - https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445
[6] STULZ GmbH Company Overview, Contact Details & Competitors | LeadIQ - https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1
[7] Stulz: STULZ Worldwide - https://www.stulz.com/en-in/company/profile/stulz-worldwide/
[8] Stulz GmbH, Hamburg, Germany, District Court of Hamburg HRB 16255: Network, Financial information - https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255
[9] Stulz: Your Global Cooling Expert. - https://www.stulz.com/
[10] Data Center Cooling Market Size, Share & Forecast Report, 2034 - https://www.gminsights.com/industry-analysis/data-center-cooling-market
[11] Data Center Liquid Cooling Market Size & Share Report, 2035 - https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market
[12] Data Center Cooling Market Size | Industry Report, 2033 - https://www.grandviewresearch.com/industry-analysis/data-center-cooling-market
[13] NVD - Vulnerabilities - https://nvd.nist.gov/vuln
[14] NVD - Vulnerability Status - https://nvd.nist.gov/vuln/vulnerability-status
[15] NVD - Home - https://nvd.nist.gov/
[16] Stulz: STULZ Produces CyberCool CMU at Hamburg HQ - https://www.stulz.com/newsroom/detail/stulz-on-producing-cybercool-cmu-at-its-hamburg-hq/
[17] Stulz: Global Network | Your Partner Worldwide - https://www.stulz.com/en-de/about-us/our-network/
[18] Partner | German Datacenter Association - https://www.germandatacenters.com/en/partner/stulz-gmbh/
[19] Stulz: Micro Data center Micro DC STULZ Modular - https://www.stulz-modular.com/micro-data-centres/
[20] Stulz: CyberAir Computer Room Air Handlers and Air Conditioners from STULZ USA - https://www.stulz.com/en-us/products/detail/cyberaircwanddx/
[21] Stulz: CyberRow Row-Based Precision Cooling CRAC & CRAH from STULZ USA - https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/
[22] Stulz CyberAir CRAH | HM Cragg - https://www.hmcragg.com/product/stulz-cyberair-crah/
[23] Stulz CyberAir CRAC | HM Cragg - https://www.hmcragg.com/product/stulz-cyberair-crac/
[24] Stulz Precision Cooling | Hi Tech Environments - https://hi-techenvironments.com/stulz-precision-cooling/
[25] Stulz: CyberOne precision air conditioners and air handlers for data centers - https://www.stulz.com/en-us/products/detail/cyberone/?gad_campaignid=23514349369&hsa_cam=23514349369&cHash=da874fd3b81074d1d7385ea79344bdf4
[26] Data Center Cooling Companies Revolutionizing the Industry - https://encoradvisors.com/data-center-cooling-companies/
[27] Global Data Center Cooling Market Outlook & Forecasts 2022-2027: Major Vendors are Airedale International Air Conditioning, STULZ, RITTAL, Schneider Electric, and Vertiv - https://www.prnewswire.com/news-releases/global-data-center-cooling-market-outlook--forecasts-2022-2027-major-vendors-are-airedale-international-air-conditioning-stulz-rittal-schneider-electric-and-vertiv-301541537.html
[28] Data Center Cooling Industry Assessment 2023-2028: Landscape Dominated by Airedale International Air Conditioning, Rittal, Schneider Electric, STULZ, and Vertiv - ResearchAndMarkets.com - Silicon Canals - https://siliconcanals.com/data-center-cooling-industry-assessment-2023-2028-landscape-dominated-by-airedale-international-air-conditioning-rittal-schneider-electric-stulz-and-vertiv-researchandmarkets-com/
[29] Data Center Cooling Industry Assessment 2023-2028: Landscape Dominated by Airedale International Air Conditioning, Rittal, Schneider Electric, STULZ, and Vertiv - ResearchAndMarkets.com - https://www.businesswire.com/news/home/20230823745108/en/Data-Center-Cooling-Industry-Assessment-2023-2028-Landscape-Dominated-by-Airedale-International-Air-Conditioning-Rittal-Schneider-Electric-STULZ-and-Vertiv---ResearchAndMarkets.com
[30] Stulz: CyberHub ECO.DC | DCIM Software Solution - https://www.stulz.com/en-de/products/detail/cyberhub-ecodc/
[31] New 3D DCIM software reduces risk & costs for data centers - https://datacenternews.asia/story/new-3d-dcim-software-reduces-risk-costs-data-centers
[32] Stulz officially launches its own DCIM suite - DCD - https://www.datacenterdynamics.com/en/news/stulz-officially-launches-its-own-dcim-suite/
[33] New DCIM Software for Savings and Reduced Risk | FM Industry | The Facilities Management Hub - https://www.fmindustry.com/en/2017/news/2737/New-DCIM-Software-for-Savings-and-Reduced-Risk-STULZ-CybeRack-Digitronic-Automationsanlagen-CyberHub-ECODC-product-launch-data-centre-infrastructure-management-facility-managers-HVAC-specialists-energy-optimisation-performance-Company-News-Data-Centres-Data-Centre-Infrastructure-Management-(DCIM).htm
[34] CyberAir 3PRO DX - https://www.laka.cz/wp-content/uploads/STULZ_CyberAir_3PRO_DX_ASR_brochure_1805_EN.pdf
[35] IEC 62443 certification: Cyber Security for Industrial Automation & Control Systems (IACS) - https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
[36] IEC 62443 certification, get the cyber security certificate for IACS - https://www.kiwa.com/nl/en-nl/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
[37] STULZ Group: Montaplast - https://www.montaplast.com/en/company/stulz-group
[38] Stulz: Global Network | Your Partner Worldwide - https://www.stulz.com/about-stulz/our-network/
[39] Stulz: Company History | STULZ USA - https://www.stulz.com/en-us/about-stulz/our-history/
[40] Stulz’s Competitors, Revenue, Number of Employees, Funding, Acquisitions & News - Owler Company Profile - https://www.owler.com/company/stulzgmbh
[41] Stulz: Cooling Solutions for Industrial & Manufacturing IT - https://www.stulz.com/solutions/industries/manufacturing/
[42] Stulz: Indirect Dynamic Free Cooling - https://www.stulz.com/indirect-dynamic-free-cooling/
[43] Stulz: Industrial Drycoolers - https://www.stulz.com/en-es/products/detail/industrial-drycoolers/
[44] Stulz: Free Cooling Solutions for Energy‑Efficient Data Centers - https://www.stulz.com/solutions/free-cooling/
[45] Stulz: High-Density Data Center Cooling | Colocation and Cloud - https://www.stulzoceania.com/solutions/colocation-and-cloud/
[46] Stulz: Direct Free Cooling - https://www.stulz.com/en-de/direct-free-cooling/
[47] Stulz to Modbus RTU/TCP QuickServer Gateway - https://store.chipkin.com/products/stulz-to-modbus-rtutcp-quickserver-gateway
[48] Stulz to BACnet MS/TP QuickServer Gateway - https://store.chipkin.com/products/stulz-to-bacnet-mstp-quickserver-gateway
[49] Microsoft Word - Stulz Communication Manual SG1-28-14.doc - http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf
[50] Stulz India - Employees, Business, Industry & CEO | EasyLeadz - https://www.easyleadz.com/company/stulz
[51] STULZ USA Company Profile - Office Locations, Competitors, Financials, Employees, Key People, News | Craft.co - https://craft.co/stulz-usa
[52] Stulz: TelAir | Container Cooling - https://www.stulz.com/en-at/products/detail/telair/
[53] Stulz: ShelterAir FC | Free Cooling - https://www.stulz.com/en-de/products/detail/shelterair-fc/
[54] Stulz: DAH Ducted Air Humidifiers from STULZ USA - https://www.stulz.com/en-us/products/detail/dah-ducted-humidification/
[55] Stulz: Integrated Liquid Cooling System - https://www.stulz.com/integrated-liquid-cooling-system/
[56] Stulz: Humidifiers - https://www.stulz.com/en-at/products/humidifiers/
[57] STULZ to Exhibit Cutting-Edge Liquid Cooling Solutions at SC24 - https://www.einpresswire.com/article/760007750/stulz-to-exhibit-cutting-edge-liquid-cooling-solutions-at-sc24
[58] Stulz: Immersion cooling: Cooperation of STULZ Modular & Asperitas - https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-1/
[59] STULZ Modular and Asperitas cooperate in the field of immersion cooling for efficient high-density data centers  | Asperitas - https://www.asperitas.com/news/stulz-modular-and-asperitas
[60] Stulz: Immersion Cooling for High-Density Data Centers - https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-2/
[61] Stulz: New Coolant Distribution Unit for Liquid Cooling - https://www.stulz.com/newsroom/detail/stulz-launches-coolant-distribution-unit/
[62] Stulz: Liquid Cooling - https://www.stulz.com/en-fr/solutions/technologies/liquid-cooling/
[63] Product Security Incident Response Team | Phoenix Contact - https://www.phoenixcontact.com/en-pc/service-and-support/psirt
[64] Security Vulnerability Policy - https://sec.cloudapps.cisco.com/security/center/resources/security_vulnerability_policy.html
[65] Vulnerability Disclosure Policy｜Initiatives Regarding Product Security｜MITSUBISHI ELECTRIC Global website - https://www.mitsubishielectric.com/psirt/disclosurepolicy/index.html
[66] IBM security vulnerability management - https://www.ibm.com/trust/security-vulnerability-management
[67] Product Security Advisory | Nokia.com - https://www.nokia.com/we-are-nokia/security/product-security-advisory/
[68] Product Security Incident Response Team (PSIRT) - https://www.telit.com/about/psirt/
[69] Ericsson Product and Vulnerability Disclosure Policy - https://www.ericsson.com/en/about-us/security/ericsson-product-security-and-vulnerability-disclosure-policy
[70] Stulz: High-Density Data Center Cooling | Colocation and Cloud - https://www.stulz.com/solutions/colocation-and-cloud/
[71] Stulz: Datacenter Cooling for Databarn - https://www.stulz-benelux.com/en/projects/databarn-precision-cooling/
[72] Stulz: Cooling for Mission‑Critical IT & Data Centers Applications - https://www.stulz.com/solutions/applications/
[73] Thorsten Weiss - STULZ GmbH | LinkedIn - https://www.linkedin.com/in/weissthorsten/
[74] Thorsten Weiss Email & Phone Number | STULZ GmbH Managing Director, CFO Contact Information - https://rocketreach.co/thorsten-weiss-email_75203743
[75] Christoph Stulz – Managing Director - https://de.linkedin.com/in/christoph-stulz-03a33547
[76] What is a Product Security Incident Response Team (PSIRT)? - https://www.linkedin.com/pulse/what-product-security-incident-response-team-psirt-chris-pepin
[77] What Is a Product Security Incident Response Team (PSIRT)? | Akamai - https://www.akamai.com/glossary/product-security-incident-response-team-psirt
[78] Flex Acquires JetCool to Expand Data Center and Power Portfolio - https://www.prnewswire.com/news-releases/flex-acquires-jetcool-to-expand-data-center-and-power-portfolio-302306177.html
[79] Flex - Flex Acquires JetCool to Expand Data Center and Power Portfolio - https://investors.flex.com/news/news-details/2024/Flex-Acquires-JetCool-to-Expand-Data-Center-and-Power-Portfolio/default.aspx
[80] Flex Ltd. acquired JETCOOL Technologies Inc. for approximately $53 million. | MarketScreener - https://www.marketscreener.com/quote/stock/FLEX-LTD-4874/news/Flex-Ltd-acquired-JETCOOL-Technologies-Inc-for-approximately-53-million-48373196/
[81] Stulz: Jobs - https://www.stulz.com/en-in/careers/jobs/
[82] Stulz - https://careers-us.stulz.com/go/Frederick,-Maryland/9555200/
[83] STULZ Jobs & Careers - 23 Open Positions | Glassdoor - https://www.glassdoor.com/Jobs/STULZ-Jobs-E597319.htm
[84] STULZ Jobs (Now Hiring) Near Me Jan 2026 - https://www.ziprecruiter.com/co/Stulz/Jobs
[85] TÜV SÜD - https://www.tuvsud.com/-/jssmedia/global/pdf-files/brochures-and-infosheets/tuvsud-iec-62443-certification.pdf
[86] EcoStruxure IT Obtains IEC 62443 Certification - https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/
[87] Partners Information | German Datacenter Conference - https://www.gdc-conference.com/en/partners-information/stulz/
[88] Stulz: DCW Asia 2025 Participation - https://www.stulz.com/newsroom/detail/data-centre-world-asia-2025-10-08-09/
[89] Stulz: Join Us at ISC 2025 - https://www.stulz.com/newsroom/detail/isc-2026-06-23-25/
[90] 2026 ASHRAE Annual Conference - https://www.ashrae.org/conferences/conference-resources/sponsorship-opportunities
[91] Meetings | ASHRAE 9.9 Mission Critical Facilities, Data Centers, Technology Spaces and Electronic Equipment - https://tpc.ashrae.org/Meetings?cmtKey=fd4a4ee6-96a3-4f61-8b85-43418dfa988d
[92] Stulz: Climate. Customized. - https://www.stulz.com/en-es/about-us/climate-customized/
[93] Honeywell and Cisco - Cisco - https://www.cisco.com/site/us/en/solutions/global-partners/honeywell/index.html
[94] Microsoft - https://www.honeywell.com/us/en/company/partners/microsoft
[95] Strategic Partners - https://www.honeywell.com/us/en/company/partners
[96] STULZ USA Announces Partnership With CoolIT Systems - https://www.hpcwire.com/off-the-wire/stulz-usa-announces-partnership-coolit-systems/
[97] Stulz partners with TSI to design modular data center kit - DCD - https://www.datacenterdynamics.com/en/news/stulz-partners-with-tsi-to-design-modular-data-center-kit/
[98] STULZ Jobs in Hamburg (2025) - https://www.glassdoor.com/Jobs/STULZ-Hamburg-Jobs-EI_IE597319.0,5_IL.6,13_IM1059.htm
[99] Stulz: Careers at STULZ - https://www.stulz.com/en-de/careers/
[100] Stulz: Explore Open Jobs and Start Your Career With Us - https://www.stulz.com/en-de/careers/career-at-stulz/jobs/
[101] 37 Stulz jobs in Worldwide - https://www.linkedin.com/jobs/stulz-jobs-worldwide
[102] Explore Career Opportunities at STULZ Oceania - https://www.stulzoceania.com/careers/
[103] exida Certification - IEC 61508, IEC 61511, IEC 62443, ISO 26262, CFSE - https://www.exida.com/Certification/Safety_Awards
[104] exida Certification - IEC 61508, IEC 61511, IEC 62443, ISO 26262, CFSE - https://www.exida.com/certification
[105] exida | LinkedIn - https://www.linkedin.com/company/exida-com
[106] Johnson Controls receives cybersecurity certification for three chillers | Supply House Times - https://www.supplyht.com/articles/105807-johnson-controls-receives-cybersecurity-certification-for-three-chillers
[107] Three YORK® Chiller Solutions Earn ISASecure® Certifications for Embedded Cybersecurity | Johnson Controls - https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification
[108] Johnson Controls Earns ISASecure® Component Security Assurance Certification for Smart Buildings Product | ACHR News - https://www.achrnews.com/articles/145756-johnson-controls-earns-isasecure-component-security-assurance-certification-for-smart-buildings-product
[109] Johnson Controls earns world’s first ISASecure® Component Security Assurance Certification for a Smart Buildings Product | Johnson Controls - https://www.johnsoncontrols.com/media-center/news/press-releases/2021/11/09/isasecure-component-security-assurance-certification-for-a-smart-buildings-product
[110] CSA/EDSA Certified Components - ISASecure® - https://isasecure.org/end-users/iec-62443-4-2-certified-components
[111] Schneider Electric obtains high-level cybersecurity certification for EcoStruxure IT DCIM solutions | Security Info Watch - https://www.securityinfowatch.com/cybersecurity/press-release/55233674/schneider-electric-obtains-high-level-cybersecurity-certification-for-ecostruxure-it-dcim-solutions
[112] SDLA Certified Development Organizations - ISASecure® - https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations
[113] Stulz: Product support HVAC technical training for CRACs and CRAHs - https://www.stulz.com/en-us/product-support/technician-training/
[114] Stulz: Data Centre Cooling for MyLoc - https://www.stulz.co.uk/en/projects/myloc/
[115] Stulz: Modular data center Stulz Modular - https://www.stulz-modular.com/modular-data-centres/
[116] Stulz: STULZ Modular Modular and micro data centers - https://www.stulz-modular.com/
[117] Article  7 - Cyber Resilience Act - https://cyber-resilience-act.com/cra/chapter-1/article-7/
[118] Cyber Resilience Act Product Categories: How to Classify Your Product as Default, Important, or
		Critical | Zealience - https://zealience.com/resource-hub/cyber-resilience-act-product-categories/
[119] ELIQUO-STULZ GmbH - Gräfenhausen, Germany - https://www.chemeurope.com/en/companies/17965/eliquo-stulz-gmbh.html
[120] ELIQUO WATER GROUP enables a new start for parts of the SH+E‐GROUP - ELIQUO WATER GROUP - https://www.eliquowater.com/en/news-details/eliquo-water-group-enables-a-new-start-for-parts-of-the-shegroup.html
[121] ELIQUO STULZ GmbH:Company Profile & Technical Research,Competitor Monitor,Market Trends - Discovery | PatSnap - https://discovery-patsnap-com.libproxy.mit.edu/company/eliquo-stulz/
[122] The Cyber Resilience Act: an overview | Cyberstand - https://cyberstand.eu/cyber-resilience-act-overview
[123] EU Cyber Resilience Act: 2026 Compliance Guide | Mend.io - https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/
[124] EU Cyber Resilience Act Implementation Guide: Building Secure Products for Europe's Digital Future | ComplianceHub.Wiki - https://compliancehub.wiki/eu-cyber-resilience-act-implementation-guide-building-secure-products-for-europes-digital-future/
[125] An Overview of the EU Cyber Resiliency Act (EU CRA) | CSA - https://cloudsecurityalliance.org/blog/2025/11/18/an-overview-of-the-eu-cyber-resiliency-act-eu-cra
[126] EU Cyber Resilience Act: A Complete Preparation Guide for Manufacturers for 2026 | Zealience - https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/
[127] Stulz: Whitepapers - https://www.stulz.com/en-in/company/downloads/whitepapers/
[128] Stulz: STULZ: Liquid Cooling – Boosting Data Center Efficiency - https://www.stulz.com/newsroom/detail/liquid-cooling-performance-sustainability/
[129] Stulz: Liquid Cooling: Exponentially increasing power density - https://www.stulz.com/newsroom/detail/liquid-cooling-exponentially-increasing-power-density/
[130] Stulz: Technical document downloads | STULZ USA - https://www.stulz.com/en-us/documentation/
[131] constructionHQ | STULZ Modular configures a cutting-edge hybrid cooled data centre for the University of Göttingen’s Emmy supercomputer - https://www.constructionhq.world/issue-sections/articles/power-generation/stulz-modular-configures-a-cutting-edge-hybrid-cooled-data-centre-for-the-university-of-goettingen-s-emmy-supercomputer/
[132] Product Security Certification Makes Cybersecurity Validation Easy - https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
[133] Schneider Electric EcoStruxure NMC3 achieves IEC 62443-4-2 Security Level 2 Certification - Industrial Cyber - https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/
[134] NIS2 and OT Security: Compliance Guide for Industry | Opsio - https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/
[135] The NIS2 directive in the manufacturing sector: a guide for companies - Adrian Stelmach - https://adrianstelmach.com/en/the-nis2-directive-in-the-manufacturing-sector-a-guide-for-companies/
[136] A Comprehensive Guide to NIS2 Compliance and OT Resilience - https://www.swidch.com/resources/blogs/a-comprehensive-guide-to-nis2-compliance-and-operational-technology-resilience
[137] NIS2 requirements: A complete guide to compliance & implementation - https://www.dataguard.com/nis2/requirements/
[138] Stulz: Interoute Project - Lowering Carbon Footprint with STULZ - https://www.stulz.com/projects/interoute/
[139] Stulz: Gesis Project - Energy-Efficient Cooling - https://www.stulz.com/projects/gesis/
[140] Stulz: 3U TELECOM Project - DC Upgrade to TIER-II Standard - https://www.stulz.com/projects/3u-telecom/
[141] Stulz: Vodacom Project - Disaster Recovery Data Center by STULZ - https://www.stulz.com/projects/vodacom/
[142] STULZ USA: Jobs | LinkedIn - https://www.linkedin.com/company/stulz-usa/jobs
[143] Stulz: Sustainability Report - https://www.stulz.com/about-us/general-information/sustainability/
[144] Stulz: Sustainability - https://www.stulz.com/en-in/company/values/sustainability/
[145] Stulz: Reducing Emissions with Low-GWP Refrigerant - https://www.stulz.com/newsroom/detail/stulz-drives-down-greenhouse-gas-emissions-with-low-gwp-r454c-refrigerant/
[146] Stulz: STULZ Champions Digital Sustainability - https://www.stulz.com/newsroom/detail/stulz-champions-digital-sustainability-2/
[147] SUSTAINABILITY REPORT - https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf
[148] Stulz: STULZ enhances sustainability of CyberAir 3PRO DX with low-GWP R513A refrigerant - https://www.stulz.com/newsroom/detail/stulz-enhances-sustainability-of-cyberair-3pro-dx-with-low-gwp-r513a-refrigerant/
[149] Certipedia - Certificate Database from TÜV Rheinland - https://www.certipedia.com/
[150] TUV Rheinland | Security Certification according to IEC 62443 - https://www.tuv.com/content-media-files/master-content/global-landingpages/images/functional-safety-meets-cybersecurity/tuv-rheinland-security-certification-according-to-iec-62443.pdf
[151] STULZ WIB 8000 Air Conditioning Web Interface Board – Multiple Vulnerabilities | The Darius Freamon Blog - https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/
[152] STULZ E2 Controller Operation Manual OZU0037M.indd - https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
[153] STULZ E2 Controller Operation Manual OZU0037M.indd - https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
[154] STULZ E2 Controller Operation Manual OZU0037M.indd - https://repository.stulz.com/7F9B021F/
[155] CRA Compliance Checklist for Building Automation System Manufacturers | CVD Portal - CVD Portal - https://cvdportal.com/compliance/building-automation
[156] Step-by-Step Guide to Cyber Resilience Act (CRA) Compliance | Encryption Consulting - https://www.encryptionconsulting.com/step-by-step-guide-to-cyber-resilience-act-cra-compliance/
[157] CRA SBOM Requirements: Complete Guide - Regulus - https://goregulus.com/cra-requirements/cra-sbom-requirements/
[158] BSI  -  Technical Guideline TR-03183 - https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html
[159] BSI  -  Technical Guideline TR-03183 - BSI TR-03183: Cyber Resilience Requirements for Manufacturers and Products - https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html
[160] EU Cyber Resilience Act (CRA) SBOM Requirements | Sbomify - https://sbomify.com/compliance/eu-cra/
[161] BSI  -  Bundesamt für Sicherheit in der Informationstechnik - BSI TR-03183-H: Cyber Resilience Requirements for Manufacturers and Products: Conformity based on full quality assurance (Module H) - https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.html
[162] Technical Guideline TR-03183-H - Conformity based on full quality assurance (Module H) - https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.pdf?__blob=publicationFile&v=4
[163] Stulz: Our history - https://www.stulz.com/en-mx/about-us/our-history/
[164] Regulation - 2024/2847 - EN - EUR-Lex - https://eur-lex.europa.eu/eli/reg/2024/2847/oj
[165] Implementing regulation - EU - 2025/2392 - EN - EUR-Lex - https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng
[166] Membership » Open Compute Project - https://www.opencompute.org/membership
[167] Membership Directory » Open Compute Project - https://www.opencompute.org/membership/membership-directory
[168] Companies show off Google-inspired Project Deschutes CDUs - DCD - https://www.datacenterdynamics.com/en/news/companies-show-off-google-inspired-project-deschutes-cdus/
[169] Stulz: STULZ Projects | Success Stories & Innovations - https://www.stulz.com/projects
[170] Visita a la planta de STULZ en Esquivias - Climatizaci�n e instalaciones - https://www.interempresas.net/Climatizacion/Articulos/463444-Visita-a-la-planta-de-Stulz-en-Esquivias.html
[171] Stulz: Production Plant - https://www.stulz.com/en-es/about-us/production-plant/
[172] Stulz’s Air Conditioning Test Center Is One of Europe’s Most Powerful | ACHR News - https://www.achrnews.com/articles/162881-stulzs-air-conditioning-test-center-is-one-of-europes-most-powerful
[173] Stulz: Jürgen Stulz Test Center - https://www.stulz.com/en-mx/newsroom/detail/europes-largest-air-conditioning-test-center-means-stulz-can-offer-climate-control-excellence-1-1/
[174] Marc-Oliver Stulz - President - Stulz ATS | XING - https://www.xing.com/profile/MarcOliver_Stulz
[175] Stulz: Datacenter Cooling for Interconnect Eindhoven - https://www.stulz-benelux.com/en/projects/interconnect/
[176] Stulz: Effective cooling and service for a datacenter in Alblasserdam - https://www.stulz-benelux.com/en/projects/effective-cooling-and-service-for-a-datacenter-in-alblasserdam/
[177] STULZ invests in new production facility for liquid cooling solutions at Hamburg headquarters - Dutch Data Center Association - https://www.dutchdatacenters.nl/en/nieuws/stulz-invests-in-new-production-facility-for-liquid-cooling-solutions-at-hamburg-headquarters/
[178] Stulz: Data Protection Declaration - https://www.stulz.com/about-stulz/data-protection-declaration/
[179] Stulz: New Monitoring System from STULZ Digital Solutions - https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/
[180] Stulz: CyberHub ECO.DC | DCIM Software Solution - https://www.stulz.com/products/detail/cyberhub-ecodc/
[181] Critical Infrastructure (KRITIS): Definition & Guidelines | IoT Telekom - https://iot.telekom.com/en/blog/critical-infrastructures-protection-obligations-and-affected-companies
[182] Complying with KRITIS: Securing German Infrastructure - https://www.logsign.com/blog/securing-critical-infrastructures-in-germany-navigating-kritis-regulation/
[183] New German critical infrastructure law: Practical impact - https://www.aoshearman.com/en/insights/critical-infrastructure-new-legislation-in-germany-and-its-practical-impact
[184] NIS2 Implementation in Germany (DE NIS2) – OpenKRITIS - https://www.openkritis.de/it-sicherheitsgesetz/german_cip_infrastructure_kritis.html
[185] Critical Infrastructure: KRITIS - How does the German IT Security Act (BSI) impact cybersecurity? - https://logpoint.com/en/blog/how-does-kritis-impact-cybersecurity
[186] Computer Security Global Security Mag Online anti virus spywares job oofers telecom and network security - https://www.globalsecuritymag.com/STULZ-offers-next-generation-data,20200701,100242.html
[187] ENISA Releases NIS2 Threat Landscape 2025: Key Cybersecurity Trends for Europe - https://diamatix.com/news-enisa-nis2-threat-landscape-2025/
[188] NIS2 is here - What data centre providers & customers need to know about Europe’s new cybersecurity regime - Lexology - https://www.lexology.com/library/detail.aspx?g=b3397ca3-9bbe-4008-b5ad-96c22a0e9d37
[189] NIS2 Compliance Guide: Requirements and Readiness - https://hyperproof.io/nis2/
[190] DDF Stulz WIB 8000 - Schneider Electric Community - https://community.se.com/t5/EcoStruxure-IT-forum/DDF-Stulz-WIB-8000/td-p/203406
[191] Stulz WIB 8000 communication with DCE - Schneider Electric Community - https://community.se.com/t5/EcoStruxure-IT-forum/Stulz-WIB-8000-communication-with-DCE/td-p/237269
[192] Industrial Control Systems | Cybersecurity and Infrastructure Security Agency CISA - https://ics-cert.us-cert.gov/
[193] Computer Security Global Security Mag Online anti virus spywares job oofers telecom and network security - https://www.globalsecuritymag.com/STULZ-helps-data-centres-beat-the,20210720,114226.html
[194] Stulz booster adds free-cooling functions - Cooling Post - https://www.coolingpost.com/products/stulz-booster-adds-free-cooling-functions/
[195] STULZ Controller ® Communications Manual Supplemental Instruction Manual IOM - http://repository.stulz.com/DD91A214/
[196] Stulz: Our Projects and references - https://www.stulz-benelux.com/en/projects/
[197] ICS Advisory Project - https://www.icsadvisoryproject.com/
[198] Membership | ISAGCA - https://isagca.org/membership
[199] Stulz: CyberLab | HVAC Lab airconditoner - https://www.stulzoceania.com/products/detail/cyberlab/
[200] Stulz: CyberWall Indoor Air Handling Unit from STULZ USA - https://www.stulz.com/en-us/products/detail/cyberwall-ahu/

## Sources

- STULZ | LinkedIn — https://www.linkedin.com/company/stulz-global?trk=ppro_cprof
- Oliver Stulz Managing Director of STULZ GmbH — https://www.theceomagazine.com/executive-interviews/manufacturing/oliver-stulz/
- STULZ Deutschland | LinkedIn — https://www.linkedin.com/company/stulz-deutschland
- Joerg Desler - STULZ | LinkedIn — https://www.linkedin.com/in/joerg-desler-52101210/
- Stulz Verwaltungs GmbH & Co. KG, Hamburg, Germany, District Court of Hamburg HRA 126445: Network, Financial information — https://www.northdata.com/Stulz+Verwaltungs+GmbH+&+Co.+KG,+Hamburg/HRA+126445
- STULZ GmbH Company Overview, Contact Details & Competitors | LeadIQ — https://leadiq.com/c/stulz-gmbh/5a1d9641230000590084e7b1
- Stulz: STULZ Worldwide — https://www.stulz.com/en-in/company/profile/stulz-worldwide/
- Stulz GmbH, Hamburg, Germany, District Court of Hamburg HRB 16255: Network, Financial information — https://www.northdata.com/Stulz%20GmbH,%20Hamburg/HRB%2016255
- Stulz: Your Global Cooling Expert. — https://www.stulz.com/
- Data Center Cooling Market Size, Share & Forecast Report, 2034 — https://www.gminsights.com/industry-analysis/data-center-cooling-market
- Data Center Liquid Cooling Market Size & Share Report, 2035 — https://www.gminsights.com/industry-analysis/data-center-liquid-cooling-market
- Data Center Cooling Market Size | Industry Report, 2033 — https://www.grandviewresearch.com/industry-analysis/data-center-cooling-market
- NVD - Vulnerabilities — https://nvd.nist.gov/vuln
- NVD - Vulnerability Status — https://nvd.nist.gov/vuln/vulnerability-status
- NVD - Home — https://nvd.nist.gov/
- Stulz: STULZ Produces CyberCool CMU at Hamburg HQ — https://www.stulz.com/newsroom/detail/stulz-on-producing-cybercool-cmu-at-its-hamburg-hq/
- Stulz: Global Network | Your Partner Worldwide — https://www.stulz.com/en-de/about-us/our-network/
- Partner | German Datacenter Association — https://www.germandatacenters.com/en/partner/stulz-gmbh/
- Stulz: Micro Data center Micro DC STULZ Modular — https://www.stulz-modular.com/micro-data-centres/
- Stulz: CyberAir Computer Room Air Handlers and Air Conditioners from STULZ USA — https://www.stulz.com/en-us/products/detail/cyberaircwanddx/
- Stulz: CyberRow Row-Based Precision Cooling CRAC & CRAH from STULZ USA — https://www.stulz.com/en-us/products/detail/cyberrow-cw-and-dx/
- Stulz CyberAir CRAH | HM Cragg — https://www.hmcragg.com/product/stulz-cyberair-crah/
- Stulz CyberAir CRAC | HM Cragg — https://www.hmcragg.com/product/stulz-cyberair-crac/
- Stulz Precision Cooling | Hi Tech Environments — https://hi-techenvironments.com/stulz-precision-cooling/
- Stulz: CyberOne precision air conditioners and air handlers for data centers — https://www.stulz.com/en-us/products/detail/cyberone/?gad_campaignid=23514349369&hsa_cam=23514349369&cHash=da874fd3b81074d1d7385ea79344bdf4
- Data Center Cooling Companies Revolutionizing the Industry — https://encoradvisors.com/data-center-cooling-companies/
- Global Data Center Cooling Market Outlook & Forecasts 2022-2027: Major Vendors are Airedale International Air Conditioning, STULZ, RITTAL, Schneider Electric, and Vertiv — https://www.prnewswire.com/news-releases/global-data-center-cooling-market-outlook--forecasts-2022-2027-major-vendors-are-airedale-international-air-conditioning-stulz-rittal-schneider-electric-and-vertiv-301541537.html
- Data Center Cooling Industry Assessment 2023-2028: Landscape Dominated by Airedale International Air Conditioning, Rittal, Schneider Electric, STULZ, and Vertiv - ResearchAndMarkets.com - Silicon Canals — https://siliconcanals.com/data-center-cooling-industry-assessment-2023-2028-landscape-dominated-by-airedale-international-air-conditioning-rittal-schneider-electric-stulz-and-vertiv-researchandmarkets-com/
- Data Center Cooling Industry Assessment 2023-2028: Landscape Dominated by Airedale International Air Conditioning, Rittal, Schneider Electric, STULZ, and Vertiv - ResearchAndMarkets.com — https://www.businesswire.com/news/home/20230823745108/en/Data-Center-Cooling-Industry-Assessment-2023-2028-Landscape-Dominated-by-Airedale-International-Air-Conditioning-Rittal-Schneider-Electric-STULZ-and-Vertiv---ResearchAndMarkets.com
- Stulz: CyberHub ECO.DC | DCIM Software Solution — https://www.stulz.com/en-de/products/detail/cyberhub-ecodc/
- New 3D DCIM software reduces risk & costs for data centers — https://datacenternews.asia/story/new-3d-dcim-software-reduces-risk-costs-data-centers
- Stulz officially launches its own DCIM suite - DCD — https://www.datacenterdynamics.com/en/news/stulz-officially-launches-its-own-dcim-suite/
- New DCIM Software for Savings and Reduced Risk | FM Industry | The Facilities Management Hub — https://www.fmindustry.com/en/2017/news/2737/New-DCIM-Software-for-Savings-and-Reduced-Risk-STULZ-CybeRack-Digitronic-Automationsanlagen-CyberHub-ECODC-product-launch-data-centre-infrastructure-management-facility-managers-HVAC-specialists-energy-optimisation-performance-Company-News-Data-Centres-Data-Centre-Infrastructure-Management-(DCIM).htm
- CyberAir 3PRO DX — https://www.laka.cz/wp-content/uploads/STULZ_CyberAir_3PRO_DX_ASR_brochure_1805_EN.pdf
- IEC 62443 certification: Cyber Security for Industrial Automation & Control Systems (IACS) — https://www.kiwa.com/en/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
- IEC 62443 certification, get the cyber security certificate for IACS — https://www.kiwa.com/nl/en-nl/services/certification/iec-62443-certification-cyber-security-for-industrial-automation-control-systems-iacs/
- STULZ Group: Montaplast — https://www.montaplast.com/en/company/stulz-group
- Stulz: Global Network | Your Partner Worldwide — https://www.stulz.com/about-stulz/our-network/
- Stulz: Company History | STULZ USA — https://www.stulz.com/en-us/about-stulz/our-history/
- Stulz’s Competitors, Revenue, Number of Employees, Funding, Acquisitions & News - Owler Company Profile — https://www.owler.com/company/stulzgmbh
- Stulz: Cooling Solutions for Industrial & Manufacturing IT — https://www.stulz.com/solutions/industries/manufacturing/
- Stulz: Indirect Dynamic Free Cooling — https://www.stulz.com/indirect-dynamic-free-cooling/
- Stulz: Industrial Drycoolers — https://www.stulz.com/en-es/products/detail/industrial-drycoolers/
- Stulz: Free Cooling Solutions for Energy‑Efficient Data Centers — https://www.stulz.com/solutions/free-cooling/
- Stulz: High-Density Data Center Cooling | Colocation and Cloud — https://www.stulzoceania.com/solutions/colocation-and-cloud/
- Stulz: Direct Free Cooling — https://www.stulz.com/en-de/direct-free-cooling/
- Stulz to Modbus RTU/TCP QuickServer Gateway — https://store.chipkin.com/products/stulz-to-modbus-rtutcp-quickserver-gateway
- Stulz to BACnet MS/TP QuickServer Gateway — https://store.chipkin.com/products/stulz-to-bacnet-mstp-quickserver-gateway
- Microsoft Word - Stulz Communication Manual SG1-28-14.doc — http://repository.stulz.com/DD91A214/b4623a2eaef47f9aad7a0b6ef18290fc/STULZ_Controller_Communication_Manual_OCU0147-.pdf
- Stulz India - Employees, Business, Industry & CEO | EasyLeadz — https://www.easyleadz.com/company/stulz
- STULZ USA Company Profile - Office Locations, Competitors, Financials, Employees, Key People, News | Craft.co — https://craft.co/stulz-usa
- Stulz: TelAir | Container Cooling — https://www.stulz.com/en-at/products/detail/telair/
- Stulz: ShelterAir FC | Free Cooling — https://www.stulz.com/en-de/products/detail/shelterair-fc/
- Stulz: DAH Ducted Air Humidifiers from STULZ USA — https://www.stulz.com/en-us/products/detail/dah-ducted-humidification/
- Stulz: Integrated Liquid Cooling System — https://www.stulz.com/integrated-liquid-cooling-system/
- Stulz: Humidifiers — https://www.stulz.com/en-at/products/humidifiers/
- STULZ to Exhibit Cutting-Edge Liquid Cooling Solutions at SC24 — https://www.einpresswire.com/article/760007750/stulz-to-exhibit-cutting-edge-liquid-cooling-solutions-at-sc24
- Stulz: Immersion cooling: Cooperation of STULZ Modular & Asperitas — https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-1/
- STULZ Modular and Asperitas cooperate in the field of immersion cooling for efficient high-density data centers  | Asperitas — https://www.asperitas.com/news/stulz-modular-and-asperitas
- Stulz: Immersion Cooling for High-Density Data Centers — https://www.stulz.com/newsroom/detail/stulz-modular-and-asperitas-cooperate-in-the-field-of-immersion-cooling-for-efficient-high-density-data-centers-1-2/
- Stulz: New Coolant Distribution Unit for Liquid Cooling — https://www.stulz.com/newsroom/detail/stulz-launches-coolant-distribution-unit/
- Stulz: Liquid Cooling — https://www.stulz.com/en-fr/solutions/technologies/liquid-cooling/
- Product Security Incident Response Team | Phoenix Contact — https://www.phoenixcontact.com/en-pc/service-and-support/psirt
- Security Vulnerability Policy — https://sec.cloudapps.cisco.com/security/center/resources/security_vulnerability_policy.html
- Vulnerability Disclosure Policy｜Initiatives Regarding Product Security｜MITSUBISHI ELECTRIC Global website — https://www.mitsubishielectric.com/psirt/disclosurepolicy/index.html
- IBM security vulnerability management — https://www.ibm.com/trust/security-vulnerability-management
- Product Security Advisory | Nokia.com — https://www.nokia.com/we-are-nokia/security/product-security-advisory/
- Product Security Incident Response Team (PSIRT) — https://www.telit.com/about/psirt/
- Ericsson Product and Vulnerability Disclosure Policy — https://www.ericsson.com/en/about-us/security/ericsson-product-security-and-vulnerability-disclosure-policy
- Stulz: High-Density Data Center Cooling | Colocation and Cloud — https://www.stulz.com/solutions/colocation-and-cloud/
- Stulz: Datacenter Cooling for Databarn — https://www.stulz-benelux.com/en/projects/databarn-precision-cooling/
- Stulz: Cooling for Mission‑Critical IT & Data Centers Applications — https://www.stulz.com/solutions/applications/
- Thorsten Weiss - STULZ GmbH | LinkedIn — https://www.linkedin.com/in/weissthorsten/
- Thorsten Weiss Email & Phone Number | STULZ GmbH Managing Director, CFO Contact Information — https://rocketreach.co/thorsten-weiss-email_75203743
- Christoph Stulz – Managing Director — https://de.linkedin.com/in/christoph-stulz-03a33547
- What is a Product Security Incident Response Team (PSIRT)? — https://www.linkedin.com/pulse/what-product-security-incident-response-team-psirt-chris-pepin
- What Is a Product Security Incident Response Team (PSIRT)? | Akamai — https://www.akamai.com/glossary/product-security-incident-response-team-psirt
- Flex Acquires JetCool to Expand Data Center and Power Portfolio — https://www.prnewswire.com/news-releases/flex-acquires-jetcool-to-expand-data-center-and-power-portfolio-302306177.html
- Flex - Flex Acquires JetCool to Expand Data Center and Power Portfolio — https://investors.flex.com/news/news-details/2024/Flex-Acquires-JetCool-to-Expand-Data-Center-and-Power-Portfolio/default.aspx
- Flex Ltd. acquired JETCOOL Technologies Inc. for approximately $53 million. | MarketScreener — https://www.marketscreener.com/quote/stock/FLEX-LTD-4874/news/Flex-Ltd-acquired-JETCOOL-Technologies-Inc-for-approximately-53-million-48373196/
- Stulz: Jobs — https://www.stulz.com/en-in/careers/jobs/
- Stulz — https://careers-us.stulz.com/go/Frederick,-Maryland/9555200/
- STULZ Jobs & Careers - 23 Open Positions | Glassdoor — https://www.glassdoor.com/Jobs/STULZ-Jobs-E597319.htm
- STULZ Jobs (Now Hiring) Near Me Jan 2026 — https://www.ziprecruiter.com/co/Stulz/Jobs
- TÜV SÜD — https://www.tuvsud.com/-/jssmedia/global/pdf-files/brochures-and-infosheets/tuvsud-iec-62443-certification.pdf
- EcoStruxure IT Obtains IEC 62443 Certification — https://blog.se.com/datacenter/2023/12/04/ecostruxure-it-obtains-iec-62443-certification-demonstrating-our-commitment-to-infrastructure-cybersecurity/
- Partners Information | German Datacenter Conference — https://www.gdc-conference.com/en/partners-information/stulz/
- Stulz: DCW Asia 2025 Participation — https://www.stulz.com/newsroom/detail/data-centre-world-asia-2025-10-08-09/
- Stulz: Join Us at ISC 2025 — https://www.stulz.com/newsroom/detail/isc-2026-06-23-25/
- 2026 ASHRAE Annual Conference — https://www.ashrae.org/conferences/conference-resources/sponsorship-opportunities
- Meetings | ASHRAE 9.9 Mission Critical Facilities, Data Centers, Technology Spaces and Electronic Equipment — https://tpc.ashrae.org/Meetings?cmtKey=fd4a4ee6-96a3-4f61-8b85-43418dfa988d
- Stulz: Climate. Customized. — https://www.stulz.com/en-es/about-us/climate-customized/
- Honeywell and Cisco - Cisco — https://www.cisco.com/site/us/en/solutions/global-partners/honeywell/index.html
- Microsoft — https://www.honeywell.com/us/en/company/partners/microsoft
- Strategic Partners — https://www.honeywell.com/us/en/company/partners
- STULZ USA Announces Partnership With CoolIT Systems — https://www.hpcwire.com/off-the-wire/stulz-usa-announces-partnership-coolit-systems/
- Stulz partners with TSI to design modular data center kit - DCD — https://www.datacenterdynamics.com/en/news/stulz-partners-with-tsi-to-design-modular-data-center-kit/
- STULZ Jobs in Hamburg (2025) — https://www.glassdoor.com/Jobs/STULZ-Hamburg-Jobs-EI_IE597319.0,5_IL.6,13_IM1059.htm
- Stulz: Careers at STULZ — https://www.stulz.com/en-de/careers/
- Stulz: Explore Open Jobs and Start Your Career With Us — https://www.stulz.com/en-de/careers/career-at-stulz/jobs/
- 37 Stulz jobs in Worldwide — https://www.linkedin.com/jobs/stulz-jobs-worldwide
- Explore Career Opportunities at STULZ Oceania — https://www.stulzoceania.com/careers/
- exida Certification - IEC 61508, IEC 61511, IEC 62443, ISO 26262, CFSE — https://www.exida.com/Certification/Safety_Awards
- exida Certification - IEC 61508, IEC 61511, IEC 62443, ISO 26262, CFSE — https://www.exida.com/certification
- exida | LinkedIn — https://www.linkedin.com/company/exida-com
- Johnson Controls receives cybersecurity certification for three chillers | Supply House Times — https://www.supplyht.com/articles/105807-johnson-controls-receives-cybersecurity-certification-for-three-chillers
- Three YORK® Chiller Solutions Earn ISASecure® Certifications for Embedded Cybersecurity | Johnson Controls — https://www.johnsoncontrols.com/media-center/news/press-releases/2024/03/12/york-chiller-solutions-earn-isasecure-certification
- Johnson Controls Earns ISASecure® Component Security Assurance Certification for Smart Buildings Product | ACHR News — https://www.achrnews.com/articles/145756-johnson-controls-earns-isasecure-component-security-assurance-certification-for-smart-buildings-product
- Johnson Controls earns world’s first ISASecure® Component Security Assurance Certification for a Smart Buildings Product | Johnson Controls — https://www.johnsoncontrols.com/media-center/news/press-releases/2021/11/09/isasecure-component-security-assurance-certification-for-a-smart-buildings-product
- CSA/EDSA Certified Components - ISASecure® — https://isasecure.org/end-users/iec-62443-4-2-certified-components
- Schneider Electric obtains high-level cybersecurity certification for EcoStruxure IT DCIM solutions | Security Info Watch — https://www.securityinfowatch.com/cybersecurity/press-release/55233674/schneider-electric-obtains-high-level-cybersecurity-certification-for-ecostruxure-it-dcim-solutions
- SDLA Certified Development Organizations - ISASecure® — https://isasecure.org/end-users/iec-62443-4-1-certified-development-organizations
- Stulz: Product support HVAC technical training for CRACs and CRAHs — https://www.stulz.com/en-us/product-support/technician-training/
- Stulz: Data Centre Cooling for MyLoc — https://www.stulz.co.uk/en/projects/myloc/
- Stulz: Modular data center Stulz Modular — https://www.stulz-modular.com/modular-data-centres/
- Stulz: STULZ Modular Modular and micro data centers — https://www.stulz-modular.com/
- Article  7 - Cyber Resilience Act — https://cyber-resilience-act.com/cra/chapter-1/article-7/
- Cyber Resilience Act Product Categories: How to Classify Your Product as Default, Important, or
		Critical | Zealience — https://zealience.com/resource-hub/cyber-resilience-act-product-categories/
- ELIQUO-STULZ GmbH - Gräfenhausen, Germany — https://www.chemeurope.com/en/companies/17965/eliquo-stulz-gmbh.html
- ELIQUO WATER GROUP enables a new start for parts of the SH+E‐GROUP - ELIQUO WATER GROUP — https://www.eliquowater.com/en/news-details/eliquo-water-group-enables-a-new-start-for-parts-of-the-shegroup.html
- ELIQUO STULZ GmbH:Company Profile & Technical Research,Competitor Monitor,Market Trends - Discovery | PatSnap — https://discovery-patsnap-com.libproxy.mit.edu/company/eliquo-stulz/
- The Cyber Resilience Act: an overview | Cyberstand — https://cyberstand.eu/cyber-resilience-act-overview
- EU Cyber Resilience Act: 2026 Compliance Guide | Mend.io — https://www.mend.io/blog/eu-cyber-resilience-act-compliance-guide/
- EU Cyber Resilience Act Implementation Guide: Building Secure Products for Europe's Digital Future | ComplianceHub.Wiki — https://compliancehub.wiki/eu-cyber-resilience-act-implementation-guide-building-secure-products-for-europes-digital-future/
- An Overview of the EU Cyber Resiliency Act (EU CRA) | CSA — https://cloudsecurityalliance.org/blog/2025/11/18/an-overview-of-the-eu-cyber-resiliency-act-eu-cra
- EU Cyber Resilience Act: A Complete Preparation Guide for Manufacturers for 2026 | Zealience — https://zealience.com/resource-hub/cyber-resilience-act-guide-manufacturers/
- Stulz: Whitepapers — https://www.stulz.com/en-in/company/downloads/whitepapers/
- Stulz: STULZ: Liquid Cooling – Boosting Data Center Efficiency — https://www.stulz.com/newsroom/detail/liquid-cooling-performance-sustainability/
- Stulz: Liquid Cooling: Exponentially increasing power density — https://www.stulz.com/newsroom/detail/liquid-cooling-exponentially-increasing-power-density/
- Stulz: Technical document downloads | STULZ USA — https://www.stulz.com/en-us/documentation/
- constructionHQ | STULZ Modular configures a cutting-edge hybrid cooled data centre for the University of Göttingen’s Emmy supercomputer — https://www.constructionhq.world/issue-sections/articles/power-generation/stulz-modular-configures-a-cutting-edge-hybrid-cooled-data-centre-for-the-university-of-goettingen-s-emmy-supercomputer/
- Product Security Certification Makes Cybersecurity Validation Easy — https://blog.se.com/datacenter/2023/11/08/schneider-electrics-new-product-security-certification-makes-cybersecurity-validation-easy/
- Schneider Electric EcoStruxure NMC3 achieves IEC 62443-4-2 Security Level 2 Certification - Industrial Cyber — https://industrialcyber.co/news/schneider-electric-ecostruxure-nmc3-achieves-iec-62443-4-2-security-level-2-certification/
- NIS2 and OT Security: Compliance Guide for Industry | Opsio — https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/
- The NIS2 directive in the manufacturing sector: a guide for companies - Adrian Stelmach — https://adrianstelmach.com/en/the-nis2-directive-in-the-manufacturing-sector-a-guide-for-companies/
- A Comprehensive Guide to NIS2 Compliance and OT Resilience — https://www.swidch.com/resources/blogs/a-comprehensive-guide-to-nis2-compliance-and-operational-technology-resilience
- NIS2 requirements: A complete guide to compliance & implementation — https://www.dataguard.com/nis2/requirements/
- Stulz: Interoute Project - Lowering Carbon Footprint with STULZ — https://www.stulz.com/projects/interoute/
- Stulz: Gesis Project - Energy-Efficient Cooling — https://www.stulz.com/projects/gesis/
- Stulz: 3U TELECOM Project - DC Upgrade to TIER-II Standard — https://www.stulz.com/projects/3u-telecom/
- Stulz: Vodacom Project - Disaster Recovery Data Center by STULZ — https://www.stulz.com/projects/vodacom/
- STULZ USA: Jobs | LinkedIn — https://www.linkedin.com/company/stulz-usa/jobs
- Stulz: Sustainability Report — https://www.stulz.com/about-us/general-information/sustainability/
- Stulz: Sustainability — https://www.stulz.com/en-in/company/values/sustainability/
- Stulz: Reducing Emissions with Low-GWP Refrigerant — https://www.stulz.com/newsroom/detail/stulz-drives-down-greenhouse-gas-emissions-with-low-gwp-r454c-refrigerant/
- Stulz: STULZ Champions Digital Sustainability — https://www.stulz.com/newsroom/detail/stulz-champions-digital-sustainability-2/
- SUSTAINABILITY REPORT — https://www.stulz.com/fileadmin/user_upload/Documents/Sustainability/STULZ_Sustainability-Report_2022.pdf
- Stulz: STULZ enhances sustainability of CyberAir 3PRO DX with low-GWP R513A refrigerant — https://www.stulz.com/newsroom/detail/stulz-enhances-sustainability-of-cyberair-3pro-dx-with-low-gwp-r513a-refrigerant/
- Certipedia - Certificate Database from TÜV Rheinland — https://www.certipedia.com/
- TUV Rheinland | Security Certification according to IEC 62443 — https://www.tuv.com/content-media-files/master-content/global-landingpages/images/functional-safety-meets-cybersecurity/tuv-rheinland-security-certification-according-to-iec-62443.pdf
- STULZ WIB 8000 Air Conditioning Web Interface Board – Multiple Vulnerabilities | The Darius Freamon Blog — https://dariusfreamon.wordpress.com/2013/09/07/stulz-wib-8000-air-conditioning-web-interface-board-multiple-vulnerabilities/
- STULZ E2 Controller Operation Manual OZU0037M.indd — https://www.hts.com/wp-content/uploads/2019/03/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
- STULZ E2 Controller Operation Manual OZU0037M.indd — https://www.stulz-usa.com/fileadmin/user_upload/STULZ_USA/Products/Controller/STULZ_E2_Controller_Operation_Manual_OZU0037M.pdf
- STULZ E2 Controller Operation Manual OZU0037M.indd — https://repository.stulz.com/7F9B021F/
- CRA Compliance Checklist for Building Automation System Manufacturers | CVD Portal - CVD Portal — https://cvdportal.com/compliance/building-automation
- Step-by-Step Guide to Cyber Resilience Act (CRA) Compliance | Encryption Consulting — https://www.encryptionconsulting.com/step-by-step-guide-to-cyber-resilience-act-cra-compliance/
- CRA SBOM Requirements: Complete Guide - Regulus — https://goregulus.com/cra-requirements/cra-sbom-requirements/
- BSI  -  Technical Guideline TR-03183 — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html
- BSI  -  Technical Guideline TR-03183 - BSI TR-03183: Cyber Resilience Requirements for Manufacturers and Products — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html
- EU Cyber Resilience Act (CRA) SBOM Requirements | Sbomify — https://sbomify.com/compliance/eu-cra/
- BSI  -  Bundesamt für Sicherheit in der Informationstechnik - BSI TR-03183-H: Cyber Resilience Requirements for Manufacturers and Products: Conformity based on full quality assurance (Module H) — https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.html
- Technical Guideline TR-03183-H - Conformity based on full quality assurance (Module H) — https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-H_v1_0_0.pdf?__blob=publicationFile&v=4
- Stulz: Our history — https://www.stulz.com/en-mx/about-us/our-history/
- Regulation - 2024/2847 - EN - EUR-Lex — https://eur-lex.europa.eu/eli/reg/2024/2847/oj
- Implementing regulation - EU - 2025/2392 - EN - EUR-Lex — https://eur-lex.europa.eu/eli/reg_impl/2025/2392/oj/eng
- Membership » Open Compute Project — https://www.opencompute.org/membership
- Membership Directory » Open Compute Project — https://www.opencompute.org/membership/membership-directory
- Companies show off Google-inspired Project Deschutes CDUs - DCD — https://www.datacenterdynamics.com/en/news/companies-show-off-google-inspired-project-deschutes-cdus/
- Stulz: STULZ Projects | Success Stories & Innovations — https://www.stulz.com/projects
- Visita a la planta de STULZ en Esquivias - Climatizaci�n e instalaciones — https://www.interempresas.net/Climatizacion/Articulos/463444-Visita-a-la-planta-de-Stulz-en-Esquivias.html
- Stulz: Production Plant — https://www.stulz.com/en-es/about-us/production-plant/
- Stulz’s Air Conditioning Test Center Is One of Europe’s Most Powerful | ACHR News — https://www.achrnews.com/articles/162881-stulzs-air-conditioning-test-center-is-one-of-europes-most-powerful
- Stulz: Jürgen Stulz Test Center — https://www.stulz.com/en-mx/newsroom/detail/europes-largest-air-conditioning-test-center-means-stulz-can-offer-climate-control-excellence-1-1/
- Marc-Oliver Stulz - President - Stulz ATS | XING — https://www.xing.com/profile/MarcOliver_Stulz
- Stulz: Datacenter Cooling for Interconnect Eindhoven — https://www.stulz-benelux.com/en/projects/interconnect/
- Stulz: Effective cooling and service for a datacenter in Alblasserdam — https://www.stulz-benelux.com/en/projects/effective-cooling-and-service-for-a-datacenter-in-alblasserdam/
- STULZ invests in new production facility for liquid cooling solutions at Hamburg headquarters - Dutch Data Center Association — https://www.dutchdatacenters.nl/en/nieuws/stulz-invests-in-new-production-facility-for-liquid-cooling-solutions-at-hamburg-headquarters/
- Stulz: Data Protection Declaration — https://www.stulz.com/about-stulz/data-protection-declaration/
- Stulz: New Monitoring System from STULZ Digital Solutions — https://www.stulz.com/newsroom/detail/stulz-digital-solutions-gmbh-introduces-system-for-monitoring-data-centers-1/
- Stulz: CyberHub ECO.DC | DCIM Software Solution — https://www.stulz.com/products/detail/cyberhub-ecodc/
- Critical Infrastructure (KRITIS): Definition & Guidelines | IoT Telekom — https://iot.telekom.com/en/blog/critical-infrastructures-protection-obligations-and-affected-companies
- Complying with KRITIS: Securing German Infrastructure — https://www.logsign.com/blog/securing-critical-infrastructures-in-germany-navigating-kritis-regulation/
- New German critical infrastructure law: Practical impact — https://www.aoshearman.com/en/insights/critical-infrastructure-new-legislation-in-germany-and-its-practical-impact
- NIS2 Implementation in Germany (DE NIS2) – OpenKRITIS — https://www.openkritis.de/it-sicherheitsgesetz/german_cip_infrastructure_kritis.html
- Critical Infrastructure: KRITIS - How does the German IT Security Act (BSI) impact cybersecurity? — https://logpoint.com/en/blog/how-does-kritis-impact-cybersecurity
- Computer Security Global Security Mag Online anti virus spywares job oofers telecom and network security — https://www.globalsecuritymag.com/STULZ-offers-next-generation-data,20200701,100242.html
- ENISA Releases NIS2 Threat Landscape 2025: Key Cybersecurity Trends for Europe — https://diamatix.com/news-enisa-nis2-threat-landscape-2025/
- NIS2 is here - What data centre providers & customers need to know about Europe’s new cybersecurity regime - Lexology — https://www.lexology.com/library/detail.aspx?g=b3397ca3-9bbe-4008-b5ad-96c22a0e9d37
- NIS2 Compliance Guide: Requirements and Readiness — https://hyperproof.io/nis2/
- DDF Stulz WIB 8000 - Schneider Electric Community — https://community.se.com/t5/EcoStruxure-IT-forum/DDF-Stulz-WIB-8000/td-p/203406
- Stulz WIB 8000 communication with DCE - Schneider Electric Community — https://community.se.com/t5/EcoStruxure-IT-forum/Stulz-WIB-8000-communication-with-DCE/td-p/237269
- Industrial Control Systems | Cybersecurity and Infrastructure Security Agency CISA — https://ics-cert.us-cert.gov/
- Computer Security Global Security Mag Online anti virus spywares job oofers telecom and network security — https://www.globalsecuritymag.com/STULZ-helps-data-centres-beat-the,20210720,114226.html
- Stulz booster adds free-cooling functions - Cooling Post — https://www.coolingpost.com/products/stulz-booster-adds-free-cooling-functions/
- STULZ Controller ® Communications Manual Supplemental Instruction Manual IOM — http://repository.stulz.com/DD91A214/
- Stulz: Our Projects and references — https://www.stulz-benelux.com/en/projects/
- ICS Advisory Project — https://www.icsadvisoryproject.com/
- Membership | ISAGCA — https://isagca.org/membership
- Stulz: CyberLab | HVAC Lab airconditoner — https://www.stulzoceania.com/products/detail/cyberlab/
- Stulz: CyberWall Indoor Air Handling Unit from STULZ USA — https://www.stulz.com/en-us/products/detail/cyberwall-ahu/
