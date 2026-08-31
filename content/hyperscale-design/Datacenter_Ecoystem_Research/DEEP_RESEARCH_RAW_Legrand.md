# Deep Research Output: Legrand

# Legrand SA (EPA:LR): Comprehensive Organizational Intelligence Report — OT/IoT Cybersecurity and EU CRA Compliance

---

## Executive Summary

**Legrand SA is the world's second-largest intelligent rack PDU supplier by revenue, commands ~25% of that market, and is growing its data center division at +15% organically in FY2024 — yet it holds zero publicly documented IEC 62443-4-2 certifications, has published no SBOM for any product, and faces a 90-day window before CRA Article 14 mandatory 24-hour vulnerability reporting obligations commence on September 11, 2026.** These gaps, alongside a recently disclosed CVSS 9.8 critical RCE vulnerability in Minkels Varicontrol DCIM (CVE-2025-28008) and an EOL Raritan serial console product with no future patches, represent the primary sales entry points for OT/IoT cybersecurity engagements.

Key findings at a glance:
- **Revenue:** €8,648.9M (FY2024, +2.8% YoY); €9,480.6M (FY2025, +9.6% total growth); data center now **26% of FY2025 sales (~€2.46B)**
- **Security posture:** ISO/IEC 27001:2013 certified (DPC division, April 2024); SNMP v1/v2c still enabled by default; no IEC 62443-4-2 certifications; no SBOM published
- **Critical CVE open risk:** CVE-2025-28008 (Minkels Varicontrol, CVSS 9.8, unauthenticated RCE) — all versions prior to 406g vulnerable
- **OCP Platinum Member** (April 2026); ORv3-compliant portfolio for AI-scale hyperscale workloads
- **CRA compliance burden estimated:** €435–940K upfront + €85–210K/year ongoing

---

## 1. Company Overview

### Identity and Legal Structure

**Full legal name:** Legrand SA [[25]](https://stockanalysis.com/quote/epa/LR/company/) [[66]](https://www.legrand.com/en/group/our-history)
**Registered headquarters:** 128 Avenue du Maréchal de Lattre de Tassigny, 87045 Limoges, France [[25]](https://stockanalysis.com/quote/epa/LR/company/) [[26]](https://www.marketscreener.com/quote/stock/LEGRAND-16719/company/)
**Primary stock listing:** Euronext Paris; ticker EPA:LR (also LR.PA, OTC LGRDY); ISIN FR0010307819; CAC 40 constituent since December 2011 [[25]](https://stockanalysis.com/quote/epa/LR/company/) [[29]](https://finance.yahoo.com/quote/LR.PA/profile/) [[66]](https://www.legrand.com/en/group/our-history)
**SIC code:** 3640; Industry: Electrical Equipment & Parts; Sector: Industrials [[25]](https://stockanalysis.com/quote/epa/LR/company/)

**Founding chronology:** Origins trace to 1865 as a porcelain tableware workshop in Limoges; electrical wiring device manufacturing began 1919; Frédéric Legrand formally took over the business in 1904 [[66]](https://www.legrand.com/en/group/our-history). IPO on Paris Stock Exchange in 1970; delisted 2001 following blocked Schneider Electric merger (European Commission opposed); acquired by Wendel Investissement + KKR consortium; re-listed Euronext Paris April 2006; KKR/Wendel reduced holdings, enabling CAC 40 inclusion December 2011 [[66]](https://www.legrand.com/en/group/our-history).

### Ownership and Shareholding

As of March 31, 2026, the ownership structure is: institutional shareholders 46.9%, general public 52.2%, individual insiders 0.87% [[30]](https://simplywall.st/stocks/fr/capital-goods/epa-lr/legrand-shares/ownership). The Legrand Employee Stock Ownership Plan (FCPE) holds 1.38% [[26]](https://www.marketscreener.com/quote/stock/LEGRAND-16719/company/); notable insider Olivier Bazil holds 0.7623% (1,999,047 shares) [[26]](https://www.marketscreener.com/quote/stock/LEGRAND-16719/company/).

| Institutional Holder | Stake | Shares |
|---|---|---|
| Fidelity International Ltd | 5.00% | 13,074,375 |
| BlackRock, Inc. | 4.46% | 11,656,410 |
| Massachusetts Financial Services | 4.35% | 11,375,206 |
| Vanguard Capital Management | 2.91% | 7,594,674 |
| Flossbach von Storch SE | 2.74% | 7,155,898 |
| Norges Bank Investment Management | 2.56% | 6,694,864 |
| Amundi Asset Management SAS | 2.47% | 6,454,842 |
| JP Morgan Asset Management | 1.39% | 3,625,692 |
| Schroder Investment Management | 1.23% | 3,205,235 |
| First Eagle Investment Management | 1.12% | 2,931,338 |

*Source: [[30]](https://simplywall.st/stocks/fr/capital-goods/epa-lr/legrand-shares/ownership)*

### Global Footprint

Legrand operates in **90 countries** with direct operations and distributes products across **nearly 180 countries** through 110 office locations globally [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) [[25]](https://stockanalysis.com/quote/epa/LR/company/) [[29]](https://finance.yahoo.com/quote/LR.PA/profile/). International sales account for **85% of revenue** [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) [[8]](https://www.linkedin.com/company/legrand-north-america).

**Key regional operating structures:**
- **North and Central America (LNCA):** West Hartford, Connecticut (HQ); employs over 9,200 employees, the company's largest geographic segment [[8]](https://www.linkedin.com/company/legrand-north-america). President & CEO: Brian DiBella (assumed role March 1, 2024) [[20]](https://edisonreport.com/2024/02/20/legrand-announces-brian-dibella-as-president-ceo-for-north-central-america/).
- **Europe:** Multiple facilities in France, Germany, United Kingdom, Netherlands, Italy, Spain, Poland [[2]](https://stockanalysis.com/quote/epa/LR/employees/) [[5]](https://www.forbes.com/companies/legrand/). EVP: Frédéric Xerri.
- **Asia-Pacific, Middle East, Africa & South America:** Regional HQ in São Paulo, Brazil; office hub in Hong Kong. EVP: Jean-Luc Cartet [[29]](https://finance.yahoo.com/quote/LR.PA/profile/).

**Manufacturing sites of note:** 8 production sites near Limoges (France); Bibbiena, Italy (Borri UPS, 15,000+ m²); Veghel, Netherlands (Minkels, 200+ employees); Zwickau, Germany (R&D center, ISO 27001 covered); Somerset, NJ; Reno, NV; Canonsburg, PA; Shenzhen and Wuxi (China); India; Turkey; Australia; Poland; Czech Republic; Finland [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) [[66]](https://www.legrand.com/en/group/our-history) [[163]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html).

### Employee Count

As of FY2024: approximately **38,306 total employees** (per MacroTrends, +1.42% from 2023) [[3]](https://www.macrotrends.net/stocks/charts/LGRDY/legrand-sa/number-of-employees), comprising 33,959 full-time and 942 part-time as of December 31, 2024 [[2]](https://stockanalysis.com/quote/epa/LR/employees/). North America specifically employs 5,214 per Revelio Labs (December 2025) [[7]](https://www.reveliolabs.com/companies/legrand-north-america/employees/), though LNCA LinkedIn profiles indicate over 9,200 [[8]](https://www.linkedin.com/company/legrand-north-america). Cross-source variance (34,384–38,306) reflects differing methodologies and timing.

### Business Unit Structure and Subsidiary Brands

Legrand operates through a **geographic divisional structure** rather than product-focused business units. Key subsidiary brands by domain:

| Domain | Key Brands |
|---|---|
| Data center power | Raritan, Server Technology, Starline, Minkels, ZPE Systems, Voltadis, Borri, Power Control, USystems, Modulan, Geiger, Zucchini, Compose, Champion One, Cablofil |
| Building wiring | Pass & Seymour, BTicino, Arnould, Wiremold, On-Q |
| Home automation/IoT | BTicino MyHOME, Netatmo (Smarther), Luxul, Vantage Controls |
| Lighting controls | Wattstopper, Encelium, Vantage |
| Healthcare | Legrand Care (Tynetec, Intervox, Enovation Group) |
| AV/infrastructure | Middle Atlantic, Chief, Da-Lite, Vaddio, Sanus |
| UPS | KEOR (Metasystem), Borri UPSaver |
| EV charging | Ensto Building Systems, Ecotap |

*Sources: [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) [[2]](https://stockanalysis.com/quote/epa/LR/employees/) [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf)*

Listed subsidiary: DEBFLEX (France). Private subsidiaries include Enovation Group Holding BV (healthcare software) and Legrand France SA [[27]](https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/company-group/) [[28]](https://www.marketscreener.com/quote/stock/LEGRAND-120791315/company-group/).

---

## 2. Financial Profile

### Revenue and Growth (FY2022–FY2025)

| Fiscal Year | Revenue | Total YoY Growth | Organic Growth |
|---|---|---|---|
| FY2022 | €8,339M | +19.2% | N/A |
| FY2023 | €8,416.9M | +0.9% | N/A |
| FY2024 | €8,648.9M | +2.8% | +1.0% |
| FY2025 | €9,480.6M | +9.6% | +7.7% |

*Sources: [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13) [[33]](https://www.legrand.com/en/investors-and-shareholders) [[180]](https://www.legrand.com/en/news/2025-full-year-results)*

FY2024 included the contribution of nine acquisitions totaling +3.9% overall (organic +1.0%, acquisitions +2.9%) [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results). FY2025 recorded +5.1% from acquisitions in addition to the organic component [[180]](https://www.legrand.com/en/news/2025-full-year-results). **Data center activities grew to 26% of FY2025 sales** (approximately €2.46B), up from 20% in FY2024 [[180]](https://www.legrand.com/en/news/2025-full-year-results) [[145]](https://matrixbcg.com/blogs/competitors/legrand).

**FY2024 geographic revenue mix** [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results):
- Europe (39.6%): +2.1%
- North and Central America (37.8%): +4.0%; US specifically (33.6%) +4.3%
- Asia-Pacific (12.1%): -2.7%
- Africa and Middle East (3.7%): +6.9%
- South America (4.1%): +8.8%

### Profitability

| Metric | FY2023 | FY2024 | FY2025 |
|---|---|---|---|
| Adjusted operating profit | €1,770.2M (21.0%) | €1,776.0M (20.5%) | — |
| IFRS operating profit | €1,591.6M (18.9%) | €1,642.7M (19.0%) | 19.1% |
| EBITDA | €1,961.7M | €2,022.4M (23.4% implied) | — |
| Net profit (Group) | €1,148.5M (13.6%) | €1,166.4M (13.5%) | €1,244.6M |
| FCF (reported) | €1,584.8M (18.8%) | €1,290.5M (14.9%) | €1,330.8M (14.0%) |
| FCF (normalized) | €1,326.7M (15.8%) | €1,357.0M (15.7%) | — |

*Sources: [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13) [[33]](https://www.legrand.com/en/investors-and-shareholders) [[180]](https://www.legrand.com/en/news/2025-full-year-results)*

Q4 2024 FCF reached €541M, demonstrating solid second-half operational cash conversion [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results). The FY2024 FCF decline (-18.6%) reflects increased working capital for acquisitions; normalized FCF shows underlying strength.

### Balance Sheet and Capital Allocation

**Net financial debt FY2024:** €3,005.5M (+49.8% from €2,005.9M at December 31, 2023), driven by nine acquisitions during the year [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13). **Net debt/EBITDA: 1.5x** — within comfortable leverage parameters [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results).

**Dividend:** €2.20/share for FY2024 (+5% vs. €2.09 for FY2023); implied payout ratio ~50%; ex-dividend May 29, 2025; payable June 2, 2025 [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13).

**Buyback:** €100 million share buyback program approved [[63]](https://www.investing.com/news/stock-market-news/earnings-call-legrand-reports-robust-2023-results-targets-growth-in-2024-93CH-3306660).

**R&D spend:** Specific absolute figure or percentage of revenue for FY2022–FY2024 was not accessible in public databases. The 2024 Universal Registration Document (available at legrand.com investor relations) contains this data. Writer note: Legrand's innovation intensity is evidenced by over 300,000 product references, 100+ product families, and continuous new product launches — consistent with an estimated 4–5% of sales investment based on sector norms.

### 2030 Medium-Term Ambitions (Capital Markets Day, September 2024)

- Sales: €12–15B
- Adjusted operating margin: ~20%
- Cumulative FCF 2025–2030: ~€10B (13–15% of sales average)
- Capital allocation: ≥50% of average FCF to acquisitions; ~50% distribution ratio
- 80% of total sales qualifying as eco-responsible [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13)

### Analyst Coverage

**19 analysts** cover Legrand as of June 5, 2026; consensus rating: **OUTPERFORM**; average price target: **€160.21** (+11.26% vs. €144.00 closing price); range €114.00 (low) to €180.00 (high) [[62]](https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/consensus/). Redburn-Atlantic recently lowered its price target from €125 to **€115** while maintaining a **Buy rating** [[61]](https://www.tipranks.com/stocks/fr:lr/forecast).

**FY2025 guidance** (from FY2024 results announcement): organic growth +2–4%, acquisition contribution +3–6%, total sales growth target +6–10% [[59]](https://www.legrand.com/en/news/2024-full-year-results).

---

## 3. Product Portfolio (Complete Catalog)

### 3.1 Intelligent Rack Power Distribution Units

**Raritan PX Series (Xerus Technology Platform)**
The Raritan PX4 (launched May 2023, latest generation) and PX3 represent Legrand's flagship intelligent PDU line, serving enterprise and hyperscale data centers [[43]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/raritan-intelligent-pdus) [[114]](https://www.raritan.com/about-us/newsroom/detail/legrand-revitalizes-data-center-sector-with-two-revolutionary-intelligent-rack-pdus). Core specifications:
- Configurations: 1,700+ across 0U vertical and 1U–3U horizontal form factors [[48]](https://www.legrand.us/raritan) [[50]](https://raritan-authorized-partner.com/) [[53]](https://www.raritan.com/)
- Current range: 12A–125A input; 100V–480V single and three-phase [[43]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/raritan-intelligent-pdus)
- PX4-specific security hardware: **Secure Boot** (chain-of-trust from firmware through root filesystem; boot halts immediately on validation failure) and **Secure Element** (cryptographic coprocessor storing TLS keys in tamper-resistant hardware, guards against rootkits and supply chain attacks) [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf)
- Protocols: SNMP v1/v2c/v3, MODBUS RTU/TCP, REST API, Redfish API [[43]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/raritan-intelligent-pdus) [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf)
- SmartSensors DX2: Temperature, humidity, airflow, differential pressure, water leak, vibration, door access [[50]](https://raritan-authorized-partner.com/)
- SmartLock® door access control (networked) [[52]](https://www.raritan.com/eu/products)
- Current stable firmware: **Xerus v4.3.13** (released February 20, 2026) [[83]](https://www.raritan.com/support/product/pdu-g4)
- **PX3 does not have PX4's Secure Boot or Secure Element** — legacy products at elevated hardware security risk.

**Server Technology PRO4X/PRO3X (Xerus Platform)**
- PRO4X (latest): iX Controller (hot-swappable), industrial-grade reliability, per-outlet power sensing (POPS), ±0.5% metering accuracy, THD event monitoring, voltage dips/swells detection, crest factor measurement [[37]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/server-technology-intelligent-pdus) [[42]](https://www.legrand.com/datacenter/en/white-space/in-rack-power-management/power-distribution/server-technology-pro4x-rack-power-distribution-unit-pdu)
- HDOT Cx outlets: Patented C13+C19 combined outlet — 6 outlets where conventional designs fit 4; UL-tested [[37]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/server-technology-intelligent-pdus) [[38]](https://www.power-solutions.com/power-dstr/legrand-pdus/) [[39]](https://cc-techgroup.com/server-technology/) [[40]](https://www.legrand.us/server-technology)
- Input range: 16A–100A; 100V–415V single/three-phase; -48VDC telecommunications variants [[37]](https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/server-technology-intelligent-pdus) [[38]](https://www.power-solutions.com/power-dstr/legrand-pdus/) [[40]](https://www.legrand.us/server-technology)
- Up to 57.6 kW capacity, up to 54 outlets per unit [[46]](https://www.servertech.com/products/pro4x-pdu)
- Certifications: FCC Part 15 Class A, TUVus/cTUV, **IEC 62368** (product safety — NOT cybersecurity), CE, UKCA [[41]](https://www.servertech.com/tags/legrand)
- 12,000 PDU varieties; 3–5 day colocation delivery solutions [[39]](https://cc-techgroup.com/server-technology/)

**Starline Track Busway**
Founded 1924, acquired by Legrand 2019 [[70]](https://cc-techgroup.com/starline/). Continuous access overhead power distribution — no shutdown required for plug-in [[69]](https://www.legrand.us/critical-power-and-infrastructure/track-busway):

| Series | Amperage | Key Feature |
|---|---|---|
| T1 | 40–60A, 480V | Lightweight commercial |
| T2 | 60–100A, 600V AC/DC | UL/ETL tested to UL 857 |
| T3 | 100–225A, 600V | Mission-critical solid copper busbars |
| T5 | 250–1250A | 99.999% ("5 nines") availability, U-shape copper |
| Series-S | 100–1200A, 600Vac/600Vdc | IP54 ingress protection, IP44/NEMA 3R; for liquid cooling environments; launched Aug 2023 [[71]](https://www.newswire.ca/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-865060661.html) [[73]](https://www.prnewswire.com/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-301896525.html) |

Critical Power Monitor (CPM/M70): Revenue-grade metering via SNMP, Modbus TCP/IP, **BACnet TCP**, HTTP/HTTPS, Modbus RTU; optional 802.11n Wi-Fi [[70]](https://cc-techgroup.com/starline/) [[72]](https://starlinepower.com/sites/default/files/2025-01/starline_product_brochureMAY22_US-WEB.pdf). *BACnet TCP is a critical OT security consideration — unauthenticated by default in many deployments.*

**Minkels VariconPower™ / Linkeo DC PDU**
European market PDUs; NX1 Basic PDU (C13+C19, 0U/1U, 330° rotating inlet, color-coded circuits) [[5]](https://www.forbes.com/companies/legrand/). The Linkeo DC PDU supports **OTA firmware update** (confirmed via release notes v4.0.35) [[178]](https://assets.legrand.com/pim/AUTRE/PDU_LDC_040035-50602_ReleaseNotes.pdf).

### 3.2 KVM and Out-of-Band Management

| Product | Category | Key Spec |
|---|---|---|
| Dominion KX III | Enterprise KVM-over-IP | 8–64 server ports, 8 concurrent remote users |
| Dominion KX IV-101 | High-performance KVM | 4K video, 1080p@60fps [[48]](https://www.legrand.us/raritan) [[49]](https://cc-techgroup.com/raritan/) |
| Dominion LX II | SMB KVM-over-IP | Economical tier [[48]](https://www.legrand.us/raritan) |
| Dominion SX II | Serial-over-IP | **EOL June 12, 2025 — NO future security patches** [[52]](https://www.raritan.com/eu/products) |
| RSS4 SecureSwitch | Secure desktop KVM | **NIAP PP4.0 certified**, TAA-compliant, 2/4/8-port, DisplayPort [[50]](https://raritan-authorized-partner.com/) |
| CommandCenter Secure Gateway | Centralized management | WAN/LAN/Internet centralized server management [[48]](https://www.legrand.us/raritan) |
| ZPE Nodegrid Serial Console Plus | OOB management | 1U, up to 96 serial devices; TPM 2.0, UEFI Secure Boot, Signed OS, self-encrypted SSD [[182]](https://zpesystems.com/zpe-systems-announces-the-nodegrid-serial-console-plus/) [[183]](https://www.s-connect.dk/zeige_produkt.php?produkt_id=8420) |

*The Dominion SX II EOL is a critical sales trigger: customers running SX II now accumulate unpatched CVE risk indefinitely.*

### 3.3 DCIM Software

**Raritan Power IQ:** Web-based dashboard for centralized power management, environmental monitoring, and outlet control. Accessible via HTTPS web UI. Web application-based management — distinct from the firmware-level Xerus platform on PDUs. Note: The DCIM software business was spun off as Sunbird Software after the 2015 Raritan acquisition; Sunbird operates independently as a partner providing DCTrack integration [[51]](https://www.datacenterknowledge.com/data-center-infrastructure-management/legrand-acquires-raritan-dcim-business-spun-off).

**Minkels Varicontrol:** DCIM platform aggregating data from PDUs, chillers, CRAC units, UPS, coolers, cameras, and fire detectors — NOT a standalone cooling system [[177]](https://www.newswire.com/news/minkels-launches-varicontrol-1-0-data-centre-monitoring-management-with-59016). Product family: Varicontrol-L (RFID rack security), Varicontrol-C (energy monitoring), Varicontrol-P, Varicontrol-S [[186]](https://manualzz.com/doc/29981592/varicontrol-s). **CVE-2025-28008 (CVSS 9.8) affects all versions prior to 406g** — see Section 9.

### 3.4 UPS Systems

| Product | Configuration | Capacity |
|---|---|---|
| Borri UPSaver | Flagship modular, 333 kVA modules | Up to 2.67 MVA single unit; 12.8 MW parallel [[74]](https://www.borri.it/borri-legrand-join-forces/) [[75]](https://ups.legrand.com/en/products) |
| KEOR MOD | Modular, hot-swappable, 25–250 kVA | On-line double conversion VFI; launched Oct 2024 EU [[75]](https://ups.legrand.com/en/products) |
| KEOR HP | Three-phase VFI | 60–800 kVA [[75]](https://ups.legrand.com/en/products) |
| KEOR XPE | Scalable | 250/300 kVA units to 2.1 MVA [[75]](https://ups.legrand.com/en/products) |
| KEOR HPE | Premium three-phase | 60–600 kW (Borri-manufactured to Legrand spec) [[74]](https://www.borri.it/borri-legrand-join-forces/) |
| MEGALINE | Modular single-phase, N+X redundant | 1.25–10 kVA, VFI-111 on-line double conversion [[78]](https://ups.legrand.com/en/products/megaline) |
| Ingenio Plus/Max | Compact three-phase | 30–600 kW [[76]](https://www.borri.it/) |

Notable deployments documented: 44MW Borri UPSaver at Gemini Tier III Dublin; 10MW project for major e-commerce operator in Korea; 240 UPS units (30 MVA) at CERN Large Hadron Collider [[74]](https://www.borri.it/borri-legrand-join-forces/).

### 3.5 Rack Enclosures, Cooling, and Cabling

**Minkels Nexpand:** 42U/52U/62U modular cabinets; Cold Corridor® aisle containment (FM Global-certified Drop Away panels dropping at 65°C for sprinkler access); Varicondition H2O row-based chilled water cooling; Nexpand CW/DX row coolers; Free Air Cooling [[4]](https://leadiq.com/c/legrand/5a1d7e612400002400586c32) [[5]](https://www.forbes.com/companies/legrand/) [[6]](https://craft.co/legrand).

**OCP ORv3 Portfolio (2026, for AI-scale):** 33kW Power Shelf (Xerus firmware, 3Φ-Δ and 3Φ-Y inputs, N+1/N+N redundancy, 6 AC Cx outlets with branch protection); Vertical DC Busbar (400A/700A/1400A); ORv3 Rack (up to 5,000 lbs/2,300 kg, 52RU); 48VDC-ready Rear Door Heat Exchanger RDHx (up to 200kW/rack, eliminates conversion stages); Smart Rack Controller with Redfish API [[9]](https://www.legrand.us/about-us/newsroom/press/why-legrand-is-doubling-down-on-open-compute-project-innovations) [[10]](https://datacentrenews.uk/story/legrand-expands-ocp-data-centre-kit-for-ai-workloads) [[11]](https://www.prnewswire.com/news-releases/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations-302570756.html) [[12]](https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit).

**Ortronics LX Cabinet:** Up to 52U, passive/active cooling up to 30kW, front-to-rear cable managers [[80]](https://www.cablinginstall.com/data-center/article/16465179/equipment-enclosures-are-versatile-in-many-environments). **Ortronics Infinium HD-E Fiber:** 96 fibers per 1U; LED lighting, white tray for visibility [[79]](https://www.legrand.us/solutions/fiber-optic/infinium-hd-enclosure-enhanced). Cablofil wire mesh cable trays specified across global data center projects [[16]](https://www.qedelectric.com/brands/legrand).

### 3.6 Building Systems and IoT Products

**BTicino MyHOME:** Wired BUS/SCS home automation; 2-conductor twisted-pair with 27Vdc power; integrates Netatmo; Classe 300EOS video door entry; MyHomeServer1 REST API (relevant: LCA-2022-001 documented unauthenticated API access) [[22]](https://www.legrandintegratedsolutions.com/Solutions_for_home_automation_functions) [[23]](https://developer.legrand.com/solutions/myhome/) [[24]](https://blog.myombox.com/myhome-automation/the-myhome-automation-system-by-legrand-bticino-arnould).

**Smarther Thermostat:** Wi-Fi 802.11b/g/n at 2.4GHz (<20 dBm); short-range radio 868/915 MHz (<25mW e.r.p.); WEP/WPA/WPA2; IPv4; 5–30°C heating / 5–40°C cooling control; Alexa, Google, Apple HomeKit compatible [[85]](https://developer.legrand.com/solutions/smarther-with-netatmo/) [[87]](https://assets.legrand.com/pim/NP-FT-GT/RA00175AB_U_EN.pdf). Available in 26+ countries including major EU markets [[86]](https://developer.legrand.com/solutions/smarther/).

**ELIOT Program:** Legrand's strategic IoT initiative (launched 2015): over 1 million active devices deployed in 60+ countries [[123]](https://csa-iot.org/newsroom/building-a-sustainable-iot-with-zigbee-and-green-power-legrands-success-story/); contributed €819M revenue in 2019 [[122]](https://www.legrand.co.in/smart-spaces/eliot-%E2%80%93-everything-you-need-to-know-about-legrands-connected-objects-program). PKI infrastructure secured via Kyrio (CableLabs subsidiary) + Microchip Technology partnership (2020) — pre-provisioned keys in secure elements during manufacturing [[121]](https://kyrio.com/project/legrand-customer-case-study/). 90+ certified Zigbee products and 20+ certified Green Power devices [[123]](https://csa-iot.org/newsroom/building-a-sustainable-iot-with-zigbee-and-green-power-legrands-success-story/).

---

## 4. Embedded Technology and OT Security

### 4.1 Network Management Interfaces

| Protocol | Implementation | Security Notes |
|---|---|---|
| SNMP v3 | Authentication (MD5/SHA), privacy (DES/AES), IP-restricted trap reception | Recommended secure option |
| SNMP v1/v2c | Community strings, cleartext credentials; can be set blank for read-only | **Legacy risk; BSI TR-03183 §6 violation** |
| REST API | Open REST-based APIs on Xerus platform | Documented; Redfish full documentation available for PX4 [[83]](https://www.raritan.com/support/product/pdu-g4) |
| Redfish API | Full implementation on Xerus | Standards-compliant server management |
| MODBUS RTU | Serial (RS-485); configurable baudrate, parity, stop bits, readonly flag | OT integration standard [[44]](https://help.servertech.com/json-rpc/4.0.40/Modbus_8idl_source.html) |
| MODBUS TCP | Network-based; readonly access control option | OT integration standard |
| BACnet TCP | Starline CPM; referenced for DCIM SNMP gateway conversion | Unauthenticated by default in many building deployments |
| HTTPS (TLS 1.3) | Default on port 443; TLS 1.2 also supported; 3072-bit RSA default | TLS_AES_256_GCM_SHA384, CHACHA20_POLY1305, AES128_GCM_SHA256 [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf) |
| SSH | Key exchange: curve25519-sha256, ecdh-sha2-nistp521/384/256; Encryption: chacha20-poly1305 (firmware 4.0.0+), aes128/256-ctr | Strong cryptographic suite |
| Telnet/FTP | Available but disabled by default; enabling triggers system warning | Attack surface if re-enabled |
| HTTP | Available but insecure; disabling recommended | |

Password storage: PBKDF2 with SHA256 [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf). CSR supported using RSA or ECDSA; intermediate CA certificates and self-signed supported; TLS 1.3 per RFC 8446 [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf).

Dual Ethernet ports per PDU; RJ45 console; USB Type B (PX3: CLI access, PDView app); USB Type A x2 (PX4): PDView iPhone support [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf).

### 4.2 Firmware Update Mechanisms

**Raritan PX4:** Web UI update (Maintenance → Unit Reset), CLI update, mass deployment spreadsheet tool, PDU Recovery Tool (USB Type-B disaster recovery available at raritan.com/support → "Tools and Drivers") [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[82]](https://www.raritan.com/ap/landing/raritan-px4-frequently-asked-questions) [[83]](https://www.raritan.com/support/product/pdu-g4). **No explicit OTA push mechanism documented** — updates are currently pull-based via web UI or mass deployment tools. Current stable: Xerus v4.3.13 (February 20, 2026) [[83]](https://www.raritan.com/support/product/pdu-g4).

Security update Xerus 4.3.0 patched CVE-1999-0524 and CVE-2023-6039 [[81]](https://www.linkedin.com/posts/raritan_raritan-px4-firmwareupdate-activity-7300922952865206273-UNCM).

**Secure Boot (PX4 only):** Hardware-enforced chain-of-trust validates firmware, root file system, and kernel sequentially. Boot halts immediately if any stage fails. Secure Element (cryptographic coprocessor) stores keys in tamper-resistant hardware and prevents unauthorized firmware modifications, malware, and supply chain attacks [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf). **PX3 does not have these hardware security controls.**

**Minkels Linkeo DC PDU:** OTA firmware update confirmed via release notes (v4.0.35) [[178]](https://assets.legrand.com/pim/AUTRE/PDU_LDC_040035-50602_ReleaseNotes.pdf).

**ELIOT wireless devices (NLT/NLD switches):** OTA updates via Home + Control application; 24–48 hour automatic update cycles [[84]](https://developer.legrand.com/forums/topic/nlt-nld-ota-update-process/).

**Minkels Varicontrol:** Manual update per user manual. Version 406g is the patched release for CVE-2025-28008.

**ZPE Nodegrid:** Vendor claims 72-hour CVE patch turnaround with several major releases per year [[181]](https://zpesystems.com/products/data-center-solutions/serial-consoles/nodegrid-serial-console-core-edition/).

**OTA for PX4 rack PDUs:** Not explicitly documented as an OTA push mechanism in available sources. The Secure Boot/Secure Element hardware is present but OTA delivery procedures require clarification directly from Legrand.

### 4.3 IEC 62443 and Security Certifications

> **Critical finding for sales positioning:** Legrand holds **zero publicly documented IEC 62443-4-2 component security assurance (CSA) certifications** and **zero IEC 62443-4-1 SDLA certifications** for any product. This is a confirmed absence, not a research gap.

| Certification | Status | Notes |
|---|---|---|
| ISO/IEC 27001:2013 | **Achieved April 23, 2024** | DPC division; Somerset NJ, Reno NV, Canonsburg PA, Zwickau DE; all 114 controls; issued by Bureau Veritas; covers Raritan, Server Technology, Starline [[163]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html) |
| IEC 62443-4-2 | **NOT CERTIFIED** (any product) | No TÜV, UL, or Intertek certifications found |
| IEC 62443-4-1 | **NOT CERTIFIED** | Secure development practices evidenced but no formal SDLA certification |
| IPv6 Ready Logo | Certified | Raritan PXO/PX3/PX4 + Smart Rack Controllers; USGv6 compliant [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) |
| ioXt | Certified | Wattstopper DLM System (building lighting) [[161]](https://www.legrand.us/wattstopper/strategies-for-iot-security) |
| DLC NLC5 | Compliant | Wattstopper DLM commercial lighting [[161]](https://www.legrand.us/wattstopper/strategies-for-iot-security) |
| NIAP PP4.0 | Certified | Raritan RSS4 SecureSwitch (government KVM) [[50]](https://raritan-authorized-partner.com/) |
| IEC 62368 | Certified (PRO4X) | **Product safety standard, NOT cybersecurity** [[41]](https://www.servertech.com/tags/legrand) |

Additional security practices: Synopsys Coverity static code analysis [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf); Pivot Point Security (CREST-accredited) conducted VAPT of Raritan PDUs — determined PDUs "secured consistent with industry best practices, CA SB 327, NISTIR 8259" [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf).

**SBOM Status:** No publicly available Software Bill of Materials for any Legrand product. This is a documented gap with direct CRA Annex I and BSI TR-03183-2 compliance implications.

**OCP Platinum Membership:** Legrand achieved Platinum membership status in the Open Compute Project, announced April 2026 [[10]](https://datacentrenews.uk/story/legrand-expands-ocp-data-centre-kit-for-ai-workloads) [[12]](https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit). Calvin Nicholson (Sr. Director of Product Management) is Legrand's primary OCP spokesperson [[187]](https://www.raritan.com/about-us/newsroom/detail/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations).

---

## 5. Regulatory Exposure

### 5.1 EU Cyber Resilience Act (Regulation EU 2024/2847)

**Products with Digital Elements (Article 3(1)) — Legrand portfolio assessment:**

The CRA applies to hardware and software products that connect to other devices or networks, directly or indirectly, and whose remote data processing is essential to function [[115]](https://cyberstand.eu/cyber-resilience-act-overview) [[116]](https://eur-lex.europa.eu/EN/legal-content/summary/horizontal-cybersecurity-requirements-for-products-with-digital-elements.html) [[117]](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-1-scope-and-impact-102m2cz).

| Product Family | CRA Article 3(1) Qualification | Rationale |
|---|---|---|
| Raritan PX3/PX4 Intelligent PDUs | **YES — Qualifies** | Embedded software, SNMP/REST/Redfish network management, Xerus platform remote data processing |
| Server Technology PRO4X/PRO3X | **YES — Qualifies** | Same basis; outlet switching/metering via network APIs |
| Raritan KVM-over-IP (KX III, KX IV, LX II) | **YES — Qualifies** | Privileged remote console access |
| Raritan Serial Console Servers / ZPE Nodegrid | **YES — Qualifies** | Out-of-band network management |
| Starline Critical Power Monitor (CPM/M70) | **YES — Qualifies** | SNMP, BACnet TCP, Modbus, Wi-Fi interfaces |
| Minkels Varicontrol DCIM | **YES — Qualifies** | Networked multi-infrastructure management platform |
| BTicino MyHOME Server1 | **YES — Qualifies** | REST API, networked home automation controller |
| Legrand Smarther Thermostat | **YES — Qualifies** | Wi-Fi, 868/915 MHz radio, cloud-connected |
| ZPE Nodegrid OS | **YES — Qualifies** | Linux-based OS for OOB management |
| Basic (non-networked) PDUs | **NO** | No digital elements; no connectivity |

**Article 7 Classification (per Implementing Regulation EU 2025/2392, adopted November 28, 2025):**

- **Raritan/Server Technology Intelligent PDUs:** **Ambiguous** — "core functionality" determination drives class. If characterized as "network management systems" (Important Class I) → mandatory third-party assessment. If characterized as "power distribution units" (Default) → self-assessment under Module A. **This ambiguity is the primary classification risk** — notified body pre-assessment (estimated €5–10K) required before committing to conformity pathway [[105]](https://certitude.consulting/blog/en/cra-update-the-eu-commission-drafts-new-guidelines-for-important-and-critical-products-with-digital-elements/) [[106]](https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published) [[107]](https://www.periphery.security/blog/part-2-product-classification---the-hidden-complexity) [[118]](https://cyber-laws.com/en/regulations/cra/).
- **KVM switches and serial consoles:** Almost certainly **Important Class I** — qualify as "Privileged Access Management" or "Network Management Systems" per Annex III [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) [[2]](https://stockanalysis.com/quote/epa/LR/employees/).
- **Minkels Varicontrol DCIM:** Likely **Important Class I** — network management software category.
- **BTicino MyHOME Server, Smarther thermostats:** Likely Default or Important Class I (connected home/building devices).
- **None of Legrand's portfolio qualifies as Critical (Annex IV)** — Annex IV covers only hardware security boxes (HSMs), smart meter gateways, and smart cards/secure elements [[108]](https://goregulus.com/cra-basics/cra-annex-iv-critical-products-list/) [[109]](https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/).

**Key compliance timeline:**

| Deadline | Obligation | Legrand Action Required |
|---|---|---|
| **September 11, 2026** | CRA Article 14 vulnerability reporting (24-hour ENISA early warning for actively exploited vulnerabilities) | PSIRT infrastructure operational; ENISA portal integration |
| **October 2026** | NIS2 full member state compliance | Supply chain security policies finalized with essential entity customers |
| **October 2027** | Harmonized standards expected (CEN-CENELEC delivery) | Published standards may enable self-assessment for Important Class I |
| **December 11, 2027** | CRA full mandatory application — all new market placements must comply | CE marking affixed; conformity assessment complete |

**Critical standards gap:** IEC 62443 is NOT yet officially designated as a CRA harmonized standard. The amendment process (EN IEC 62443-4-1:2018/A11:2026, EN IEC 62443-4-2:2019/A11:2026) is underway, with official harmonized status expected by October 2027 [[151]](https://www.cencenelec.eu/news-events/events/2025/2025-09-09-en-iec-62443-to-cra/) [[153]](https://cyberstand.eu/events/cra-standards-unlocked-en-iec-62443-cra-ot-cybersecurity-important-products-class-i-ii) [[154]](https://machinerysafety101.com/2026/02/09/cyber-resilience-act-red-iec-62443/). Until harmonized standards publish, Important Class I manufacturers **cannot self-assess** — Module B+C or Module H third-party assessment with 4–6 month audit timelines is required, meaning Legrand must engage notified bodies by June 2027 at latest.

**Three CRA requirements NOT covered by IEC 62443 (even when harmonized)** [[150]](https://oringnet.com/en/knowledge-base/differences-between-cra-cyber-resilience-act-and-iec-62443) [[152]](https://honeytreelabs.com/posts/iec62443_vs_cra/):
1. **Machine-readable SBOM** (CycloneDX 1.6+ or SPDX 3.0.1+ format)
2. **Mandatory 24-hour ENISA incident reporting** — no IEC 62443 equivalent
3. **CE marking and formal conformity assessment** — IEC 62443 certification does not confer CE

### 5.2 NIS2 (EU 2022/2555) Supply Chain Obligations

Legrand is a **Tier 1 supplier** to NIS2 essential service operators across digital infrastructure (data centers), telecommunications, and energy sectors. NIS2 Article 21(2)(d) requires essential entities to assess and manage supply chain security risks [[92]](https://www.rockwellautomation.com/en-us/company/news/blogs/nis2-and-supply-chain.html) [[93]](https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/) [[94]](https://www.cybertrust365.com/en/supply-chain-security-nis2/).

**What Legrand's hyperscale and colocation customers will require from Legrand:**
- SBOM provision for all firmware and embedded software
- Documented 24-hour incident notification procedures
- Supplier security questionnaires or audit access
- Contractual security baselines (minimum ISO 27001, IEC 62443 alignment)
- Data Processing Agreements (GDPR Article 28) for personal data in PDU/DCIM platforms
- Evidence of continuous supplier posture monitoring, not one-time assessment [[95]](https://www.thingsrecon.com/blog/nis2-and-supply-chain-security-what-actual-compliance-looks-like)

**NIS2 non-compliance penalties:** For essential entities — up to €10M or **2% of worldwide annual turnover**; for important entities — €7M or **1.4% of worldwide annual turnover** [[93]](https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/) [[149]](https://hyperproof.io/understanding-the-relationship-between-nis2-and-the-eu-cyber-resilience-act/). Applied at national authority discretion based on severity, duration, and cooperation.

### 5.3 BSI TR-03183 (German Market)

German Federal Office for Information Security (BSI) technical guidelines directly implement CRA obligations:

- **Part 1** (v0.10.0, September 2025): 14 essential cybersecurity requirements for manufacturers [[159]](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v0_10_0.pdf?__blob=publicationFile&v=1)
- **Part 2** (v2.1.0, August 2025): SBOM specification requiring CycloneDX 1.6+/SPDX 3.0.1+ format with recursive dependency resolution, SHA-512 hashes, license metadata [[156]](https://sbomify.com/compliance/eu-cra/)
- **Part 3** (v1.0.0): Vulnerability reporting procedures for 24-hour ENISA/CSIRT notification [[155]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html)
- **Part H** (v1.0.0 community draft, comment period closed March 31, 2026): Module H conformity via ISO/IEC 27001 ISMS — **favorable path for Legrand**, which already holds ISO 27001:2013 across DPC division [[155]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html) [[157]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html)

**Legrand-specific compliance gaps under BSI TR-03183 Part 1:**
1. SNMP v1/v2c still supported → violates essential requirement 6 (confidentiality protection — state-of-the-art encryption)
2. No automatic update mechanism with opt-out for PDUs → essential requirement 4
3. SBOM not generated → essential requirement 14 (risk assessment) and Part 2 formal SBOM requirement
4. No documented PSIRT with 24-hour triage capacity → essential requirement (vulnerability handling)

**Legrand's Zwickau (Germany) R&D center is covered by existing ISO 27001 certification**, positioning the company for Module H pathway at lower cost than Module B+C [[163]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html).

### 5.4 GDPR Data Processing Scope

Legrand PDU and DCIM platforms process personal data including administrator credentials (usernames, password hashes, authentication tokens), IP addresses of management workstations, audit logs of operator actions, and facility contact information. Legrand acts as data controller where default configurations determine processing purposes, and as data processor where customer configuration drives processing [[119]](https://www.pillsburylaw.com/en/news-and-insights/eu-cyber-resilience-act-requirements-products-software.html).

Requirements: Data Processing Agreements with NIS2 essential entity customers [[94]](https://www.cybertrust365.com/en/supply-chain-security-nis2/); privacy notices; breach notification within 72 hours (GDPR Article 33); data minimization; encryption at rest and in transit. The 72-hour GDPR breach window overlaps with the 72-hour CRA full notification requirement, creating dual-track reporting obligations.

### 5.5 Estimated Total Compliance Burden

| Domain | Upfront Cost Estimate | Ongoing Annual Cost | Timeline |
|---|---|---|---|
| CRA Conformity Assessment | €250–550K | €50–150K/product (notified bodies) | 18–24 months |
| NIS2 Supply Chain | €65–145K | €10–20K/year | 12–18 months |
| BSI TR-03183 (German market) | €85–175K | €20–30K/year (PSIRT) | Integrated 18–24 months |
| GDPR Data Processing | €35–70K | €5–10K/year | 6–12 months |
| **TOTAL ESTIMATED** | **€435–940K** | **€85–210K/year** | **18–24 months** |

Primary cost drivers: notified body conformity assessment (€50–150K per Important Class I product), SBOM infrastructure and supply chain mapping (€100–200K), and PSIRT establishment (€20–30K/year ongoing) [[115]](https://cyberstand.eu/cyber-resilience-act-overview) [[118]](https://cyber-laws.com/en/regulations/cra/) [[155]](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html) [[158]](https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview) [[159]](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v0_10_0.pdf?__blob=publicationFile&v=1).

---

## 6. Organizational Structure and Leadership

### Executive Committee (10 members, 4 nationalities: French, American, Canadian, Spanish)

| Name | Title | Start Date | Key Background |
|---|---|---|---|
| **Benoît Coquart** | Chief Executive Officer | February 2018 | Joined Legrand 1997 (South Korea); Head of IR; Group VP M&A; Group VP Strategy; VP France; EC member from 2010; Sciences Po Paris, ESSEC. Born 1973. LinkedIn: linkedin.com/in/benoît-coquart/ [[19]](https://www.legrand.com/en/group/management) |
| **Franck Lemery** | EVP & Chief Financial Officer | January 1, 2019 | Ernst & Young auditor → joined Legrand 1994; Group Internal Auditor; CFO multiple entities; Head of Group Finance Control 2008; Group VP Operations Performance 2014. Born 1967. ESCP Europe, DESCF accounting/finance. [[19]](https://www.legrand.com/en/group/management) [[32]](https://www.legrand.com/sites/default/files/Documents_PDF_Legrand/Finance/2025/6m/Legrand_Half_year_financiel_report_2025_EN_1753889292.pdf) |
| **Blandine Antoine** | EVP Products and Technology | 2026 | Joined Legrand 2024 as Group VP Strategic Planning. Prior: McKinsey & Company (strategy), iRobot (sales strategy). Education: École Polytechnique, UC Berkeley, MIT doctorate in engineering. [[19]](https://www.legrand.com/en/group/management) |
| **Juan Moreno-Alamo** | EVP Strategy, Brands and Digital | 2023 | Joined Legrand 2000; global marketing/communications/strategy roles. INSEAD Executive MBA. [[19]](https://www.legrand.com/en/group/management) |
| **Antoine Burel** | Deputy CEO & EVP Operations | — | Born 1962. [[29]](https://finance.yahoo.com/quote/LR.PA/profile/) |
| **Bénédicte Bahier** | EVP Human Resources | — | 8.4 years tenure as of 2026. [[19]](https://www.legrand.com/en/group/management) |
| **Virginie Gatin** | EVP Corporate Social Responsibility | August 30, 2021 | Born 1977. [[29]](https://finance.yahoo.com/quote/LR.PA/profile/) |
| **Frédéric Xerri** | EVP Europe | — | Born 1969; 8.4 years tenure. [[29]](https://finance.yahoo.com/quote/LR.PA/profile/) |
| **Jean-Luc Cartet** | EVP Asia-Pacific, Middle East, Africa & South America | January 2019 (EC) | Born 1967. [[29]](https://finance.yahoo.com/quote/LR.PA/profile/) |
| **Delphine Bazaud** | EVP Operations | January 2026 | New in role. [[19]](https://www.legrand.com/en/group/management) |

**Group CIO: José Duarte** — Group CIO since January 2021; prior Regional IT Director at Walgreens Boots Alliance (February 2016–January 2021) and IS/IT Director R&D Global at Danone (December 2013–February 2016); based Le Vésinet, Île-de-France; LinkedIn: linkedin.com/in/josé-duarte-3aaa581/ [[67]](https://www.arounddeal.com/p/jose-duarte/d3umsotujd) [[68]](https://contactout.com/jose-duarte-94859).

**CTO ELIOT & VP R&D Building Systems: Marco Catuozzo** — in role since 2021; previously VP R&D Building Systems 2019–2021; BTicino roles 2005–2007; Electronic and Electrical Engineering degree (Politecnico di Milano, 1991–1996); based Erba, Italy [[64]](https://theorg.com/org/legrand/org-chart/marco-catuozzo) [[65]](https://theorg.com/org/legrand).

**North America Regional Leadership (LNCA):**
- President & CEO: Brian DiBella (March 1, 2024) [[20]](https://edisonreport.com/2024/02/20/legrand-announces-brian-dibella-as-president-ceo-for-north-central-america/)
- CMO: Laurie Englert
- CFO: Steve Schneider
- CHRO: Ken Brown
- SVP General Counsel: Hoyt Webb
- CIO: Julianne LeBlanc
- VP Strategic Sourcing & Purchasing: Steve Liu [[31]](https://www.legrand.us/about-us/leadership) [[124]](https://www.legrand.us/about-us/suppliers-and-partners)

### Security and Product Security Function

**VP Software Excellence (effective product security lead): Adam Murano** — VP of Software Excellence, Legrand North America; oversees cybersecurity for the DPC division R&D centers in Somerset NJ, Reno NV, Canonsburg PA, and Zwickau, Germany; quoted in the April 23, 2024 ISO 27001 certification announcement: "Cybersecurity issues are a key and growing area of concern for the markets we serve" [[163]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html) [[172]](https://ycharts.com/news/story/PRN-CL94327-20240423).

**CISO - ELIOT Program IoT: Alexandre Lauga** — product-level/BU CISO for the ELIOT connected devices program; NOT a corporate-level group CISO. No corporate-level CISO role is publicly documented [[64]](https://theorg.com/org/legrand/org-chart/marco-catuozzo) [[65]](https://theorg.com/org/legrand).

**Group CISO: NOT publicly documented** — Legrand has not disclosed a corporate Chief Information Security Officer role in any official public communication. This is a significant organizational gap for a company with CRA Article 14 obligations commencing in 3 months.

**PSIRT:** Formal PSIRT function exists as a contact function at legrand.com/cybersecurity/en. Contact: psirt@legrand.com (product vulnerabilities), cybersecurity@legrand.com (website vulnerabilities). GPG key: https://www.legrand.com/.well-known/psirt-pgpkey.txt. CVD policy based on ETSI TR 103 838; response within 5 working days; triage within 10 working days; no financial rewards [[55]](https://www.legrand.com/cybersecurity/en/cvd-policy). Six security advisories published from 2018 to 2025 [[57]](https://www.legrand.com/cybersecurity/en/security-advisories). **No formally staffed PSIRT team is publicly documented** — the function operates as a contact point rather than a dedicated 24/7 incident response capability.

**Product security team size:** Not publicly disclosed. The DPC division has three simultaneous cybersecurity internship postings (Summer 2025, Summer 2026, ASAP) at West Hartford CT — indicative of an early-stage, growing security program rather than a mature, fully staffed function [[88]](https://prosple.com/graduate-employers/legrand/jobs-internships/cyber-security-intern-summer-2025) [[89]](https://jobright.ai/jobs/info/69856985348f733a5c39ca1f) [[90]](https://prosple.com/graduate-employers/legrand/jobs-internships/cybersecurity-intern).

**ELIOT R&D leadership (product security-adjacent):** Saeed Choudhary (R&D Director Electronic and Digital), Ram Mishra (VP and Head of India R&D), Alex Shen (RD VP China), Claire des Champs de Verneix (Directrice R&D Building Systems) [[64]](https://theorg.com/org/legrand/org-chart/marco-catuozzo) [[65]](https://theorg.com/org/legrand).

---

## 7. Primary Customers and Named Deployments

### Confirmed Named Customer Case Studies

| Customer | Product Used | Key Outcome | Source |
|---|---|---|---|
| AOL (Manassas Tech Center, Dulles Tech Center) | Raritan PX PDUs + Power IQ DCIM | Outlet-level metering; thermal analytics vs. ASHRAE; stranded capacity identification | [[125]](https://www.raritan.com/ap/resources/case-studies/detail/aol) |
| Experian UK (Fairham House, £30M+, 5,000 servers) | Raritan Dominion KX + SX + CommandCenter | "Raritan offered a level of flexibility, scalability and security that its competitors could not match" | [[127]](https://www.raritan.com/assets/ram/case_studies/downloads/experian-raritan-case-study.pdf) |
| eBay | Raritan DCIM + environmental sensors | 4-year plan: cut power costs 50%, double compute performance | [[126]](https://www.raritan.com/resources/case-studies) |
| Taboola | Raritan PX PDUs | "Cut PDU failures to just one in five years" | [[126]](https://www.raritan.com/resources/case-studies) [[142]](https://www.legrand.us/markets/data-center/case-studies) |
| F5 Networks | Raritan DCIM + sensors | Reduced energy, increased capacity; 25 tech teams, 300+ developers | [[126]](https://www.raritan.com/resources/case-studies) |
| Choice Hotels International | Raritan iPDUs, sensors, DCIM, KVM | 'Lights out' colocation global reservation system | [[126]](https://www.raritan.com/resources/case-studies) |
| Commander (Australia, telecom) | Raritan Branch Circuit Monitors + Power IQ | Real-time energy usage reporting to business customers | [[126]](https://www.raritan.com/resources/case-studies) |
| Montana PBS | Raritan | Broadcast data center deployment | [[126]](https://www.raritan.com/resources/case-studies) |
| Fujitsu | Starline Track Busway (250A) | 3.2MW expansion deployed in months | [[142]](https://www.legrand.us/markets/data-center/case-studies) |
| University of Oxford | Starline hot-swappable busway | Eliminated electrical downtime | [[142]](https://www.legrand.us/markets/data-center/case-studies) |
| Princeton Plasma Physics Laboratory | 60 ft, 250A Starline busway | Dynamic plug-in at any location | [[142]](https://www.legrand.us/markets/data-center/case-studies) |
| Cisco | Legrand/Minkels containment + intelligent cabinets | Network Operations Center for largest annual event | [[142]](https://www.legrand.us/markets/data-center/case-studies) |
| Telehouse (European colocation, 4 facilities) | Minkels racks + Cold Corridor | 10+ year partnership; ~400 racks at Léon Frot Paris facility (52U, split into quarter/half rack) | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| TF1 Group (France) | 150 Minkels 42U racks | Deployed in under 2 weeks at Boulogne-Billancourt HQ | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| ESI Group (Paris) | Minkels VariCondition H2O + Legrand UPS | HPC center at 20kW/rack density | [[128]](https://www.minkels.com/cases/esi-group-deploys-hpc-center-in-paris-with-minkels-and-legrand) |
| MIND Park Data Center (Serbia) | Minkels racks + Archimod UPS + DX cooling | Modular "pay as you grow" | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| Belgian Ministry of Defense (HQ, Evere) | Legrand equipment | Cybersecurity tooling and HQ infrastructure | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| LU-CIX (Luxembourg Internet Exchange) | Minkels Nexpand cold-aisle infrastructure | Closed corridor for lower energy consumption | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| CERN Large Hadron Collider | 240 Borri UPS units (30 MVA) | Safety systems and cooling | [[74]](https://www.borri.it/borri-legrand-join-forces/) |
| Doha Metro (Qatar, 2016) | 650 Borri AC/DC UPS systems | 240 km, 106 stations safety/emergency | [[74]](https://www.borri.it/borri-legrand-join-forces/) |
| e-Quest (Netherlands, 2 facilities) | 60 Minkels server cabinets (Phase 1, Veghel) | 400 m² designed for growth to 240 total cabinets | [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |

### Hyperscaler Relationships

Legrand's product documentation markets Raritan as "trusted by 9 of the top 10 Fortune 500 technology companies" [[48]](https://www.legrand.us/raritan) and references deployments at "major social media platforms" and "leading technology companies" without naming them explicitly. An AI whitepaper visual claims "Trusted by 10 of top 10 hyperscale data centers" [[185]](https://www.raritan.com/landing/redesigning-data-center-for-ai-workloads-white-paper/thanks), but this text is a marketing image header without supporting named citations. **Treat as a market positioning claim rather than a verified customer roster.** Specific hyperscalers (AWS, Azure, Google, Meta, Oracle Cloud) are not publicly confirmed by name in available case studies — customer confidentiality agreements are the likely constraint.

Named Fortune 500 technology companies referenced as Raritan customers in historical press materials include Cisco, Dell, Google, HP, IBM, Intel, and Microsoft [[184]](https://www.prnewswire.com/news-releases/legrand-makes-451-researchs-list-of-largest-data-center-technology-suppliers-300641126.html), but these are marketing claims, not audited customer lists.

---

## 8. Value Chain and Partner Ecosystem

### Technology Alliances

| Partner | Alliance Nature | Confirmed Date |
|---|---|---|
| **Microsoft** | Azure OpenAI Service for internal AI tools (Gaia: 60% faster product data generation; Elia: customer support). Microsoft Cloud for Manufacturing. | November 2024 [[136]](https://www.microsoft.com/en/customers/story/19697-legrand-azure-cloud-services) |
| **Microsoft** | Signature Microsoft Teams Rooms showcase spaces; Middle Atlantic + Chief products | September 26, 2023 [[137]](https://www.prnewswire.com/news-releases/legrand-partners-with-microsoft-to-create-new-hybrid-conferencing-space-301938112.html) [[138]](https://www.legrand.us/about-us/newsroom/press/new-hybrid-conferencing-space) |
| **Cisco** | Ecosystem partner for Digital Building Solutions; ongoing new product development | February 20, 2017 [[140]](https://www.legrand.us/about-us/newsroom/press/cisco-building-solutions) |
| **Siemens** | Joint modular edge data center with Siemens Smart Infrastructure + Cadolto Datacenter (Baiersdorf, Germany) | June 4, 2025 [[139]](https://press.siemens.com/global/en/pressrelease/reinventing-edge-siemens-cadolto-and-legrand-introduce-new-modular-data-center) |
| **Schneider Electric** | Co-founding members, NR+ Building Interest Group (DECT Forum); world's first NR+ interoperability demo (~80 devices) at Light + Building Frankfurt | 2024 founding; demo March 10, 2026 [[166]](https://www.dect.org/news/legrand-and-schneider-electric-demonstrate-worlds-first-nr-interoperability-demo-for-smart-buildings/) [[167]](https://wirepas.com/news/nr-interest-group/) |
| **Kyrio (CableLabs)** | PKI infrastructure for ELIOT connected devices (Microchip secure elements, pre-provisioned manufacturing) | June 2020 [[121]](https://kyrio.com/project/legrand-customer-case-study/) |
| **Sunbird Software** | DCIM partner (spun off from Raritan post-2015 acquisition; DCTrack integrated with Legrand infrastructure) | Ongoing [[51]](https://www.datacenterknowledge.com/data-center-infrastructure-management/legrand-acquires-raritan-dcim-business-spun-off) |
| **Artefact** | Co-developer of Gaia and Elia AI tools | 2024 [[136]](https://www.microsoft.com/en/customers/story/19697-legrand-azure-cloud-services) |

**No Honeywell partnership found.** Despite Honeywell being a significant building automation competitor, no evidence of a formal Legrand-Honeywell technology alliance was identified.

### PRO Channel Partner Program

Legrand's **PRO Channel Partner Program** was substantially relaunched and expanded in 2026, unifying Raritan, Server Technology, ZPE Systems, and Legrand Cabinets & Containment under one framework [[111]](https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide) [[112]](https://tedmag.com/legrand-recognized-in-2026-crn-partner-program-guide/). CRN awarded it a **5-Star Partner Program designation** in the 2026 CRN® Partner Program Guide (announced March 10, 2026) [[111]](https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide).

VP of Channel Sales leading the program: **Mike Johnston**, Legrand North and Central America [[111]](https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide).

**Program benefits:** Opportunity registration (cornerstone element); tiered discounts; dedicated channel manager per partner; no-cost US-based technical support; customized partner portal (raritan.com/partnerportal for Americas; legrand.magentrixcloud.com for EMEA); free sales and technical training; pre-qualified sales leads; Market Development Funds (proposal-based); demo kit discounts. Annual tier requalification based on prior 12 months of revenue [[110]](https://www.raritan.com/partners) [[113]](https://www.channelfutures.com/channel-business/lg-unveils-expanded-partner-program-for-u-s-resellers).

**Partner PRM portal:** Deployed across 27 countries, 600-strong user community, supporting project registration, lead referral, real-time pipeline management, and training [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf).

**Data Center Academy and Busbar Academy:** Dedicated training programs; Busbar Academy established post-Voltadis acquisition (2022) [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf).

### Key Distributors (Selected)

| Region | Distributor | Products |
|---|---|---|
| North America | Standard Electric Supply Co. | Pass & Seymour (WI, IL, IN) [[132]](https://www.standardelectricsupply.com/Brands/Legrand-Pass-And-Seymour-Distributor) |
| North America | Anixter/WESCO | Legrand AV, full product range [[134]](https://www.anixter.com/en_us/manufacturers/l/legrandav.html) |
| North America | Border States, QED | Wiremold, Pass & Seymour, Cablofil [[15]](https://www.borderstates.com/brands/Legrand) [[16]](https://www.qedelectric.com/brands/legrand) |
| Europe (wholesale) | Bank of Lamps | 5,000 m² warehouse capacity, B2B wholesale [[133]](https://bankoflamps.com/legrand) |
| Multi-country EMEA | MUK Group | Armenia, Azerbaijan, Georgia, Mongolia, Turkmenistan, Ukraine [[131]](https://muk.group/en/vendor/legrand/) |
| APAC Hub | Legrand AV Asia Pacific | Hong Kong office, Fotan, Shatin [[135]](https://www.legrandav.com/contact_us/contact_apac) |
| Australia | Amber Technology | AV products [[130]](https://www.legrand.us/nuvo/international-distributors) |
| India | Eloka Enterprises, Ventura Inc. | Building systems [[130]](https://www.legrand.us/nuvo/international-distributors) |

### Manufacturing and Procurement

No specific EMS or ODM manufacturing partners are publicly disclosed — Legrand predominantly manufactures proprietary designs at acquired facilities. Group Chief Procurement Officer: **Gaspard De Monts** [[165]](https://www.legrand.com/en/supplier). Key procurement standards: ISO 9001-certified Purchasing; Supplier Code of Conduct; Responsible Minerals Initiative (RMI) participant for 3TG conflict minerals; REACH and RoHS compliance requirements in supplier evaluations [[164]](https://www.legrand.us/about-us/suppliers-and-partners/our-policy) [[165]](https://www.legrand.com/en/supplier).

### Named System Integrators

Technosector (Serbia, since 2010); e-Quest (Netherlands, 2 data center facilities); Telehouse (France/Europe, 10+ years, 4 facilities); Cap Ingelec (France/Minkels); Bouygues Energies & Services (TF1 project); CEL and Kannegieter (LU-CIX Luxembourg) [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf). Legrand maintains **over 120 customer-facing staff** in the data center market globally [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf).

---

## 9. Security Incidents — CVEs and Advisories (Last 36 Months)

**Official security advisories page:** https://www.legrand.com/cybersecurity/en/security-advisories [[57]](https://www.legrand.com/cybersecurity/en/security-advisories)
**PSIRT contact:** psirt@legrand.com
**CVD policy:** https://www.legrand.com/cybersecurity/en/cvd-policy (based on ETSI TR 103 838)

### CVEs Published in the 36-Month Window (June 2022 – June 2026)

**1. CVE-2025-28008 — CRITICAL (CVSS v3.1: 9.8)**

| Field | Detail |
|---|---|
| Advisory | LCA-2025-001, March 31, 2025 [[54]](https://assets.legrand.com/webf/cybersecurity/LCA-2025-001.pdf) |
| Product | Minkels Varicontrol (all versions prior to 406g) |
| CVSS vector | CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H |
| CWEs | CWE-78 (OS Command Injection), CWE-306 (Missing Authentication) |
| Description | Unauthenticated OS command injection via parameters to the product management web server → full remote code execution and system compromise |
| Patch | Version 406g and later |
| Researcher | Simon Tulling |
| Active exploitation | No evidence found |
| EPSS | Not specified in available sources |

Legrand recommends: immediate patch; physical access controls; firewall isolation; no direct internet exposure; VPN for remote access [[54]](https://assets.legrand.com/webf/cybersecurity/LCA-2025-001.pdf). *This vulnerability in a DCIM platform is the highest-impact Legrand security finding in the research window and represents a direct sales entry point for remediation assessments.*

**2. CVE-2025-2983 — MEDIUM (CVSS v4.0: 5.1)**

| Field | Detail |
|---|---|
| Advisory date | March 31, 2025 [[18]](https://github.com/advisories/GHSA-486q-q4pw-3v7c) |
| Product | Legrand SMS PowerView 1.x (power management software) |
| CVSS v4.0 vector | CVSS:4.0/AV:A/AC:L/AT:N/PR:L/UI:N |
| Type | OS command injection via improper argument validation in redirect parameter |
| Attack vector | Adjacent network; requires low privilege |
| Affected versions | Unknown |
| Patched versions | Unknown |
| Vendor response | Vendor did not respond to researcher disclosure |
| EPSS | 0.31% (54th percentile — low exploitation probability) |
| NVD status | Not scheduled for NVD enrichment efforts [[17]](https://nvd.nist.gov/vuln/detail/CVE-2025-2983) |

*Confidence: Medium only — affected and patched versions unknown; vendor non-responsive. Treat as informational pending vendor clarification.*

**3. CVE-2022-46496 — Severity: Medium (estimated)**

| Field | Detail |
|---|---|
| Advisory | LCA-2023-001, June 2, 2023 [[57]](https://www.legrand.com/cybersecurity/en/security-advisories) |
| Product | BTicino Door Entry for HOMETOUCH iOS application |
| Type | Improper certificate validation (CWE-295) |
| Impact | Potential MITM attacks on IoT door entry systems in residential/commercial settings |

**4. LCA-2022-001 — Severity: Medium/High (estimated; no CVSS published)**

| Field | Detail |
|---|---|
| Advisory date | October 20, 2022 [[57]](https://www.legrand.com/cybersecurity/en/security-advisories) |
| Product | BTicino MyHomeServer1 home automation controller |
| Type | Unauthenticated access to built-in REST API |
| Impact | Local network attacker can access and control home automation functions without credentials |

### Historical Advisories Outside 36-Month Window (Reference)

LCA-2020-002 (April 2020): CVE-2019-17101, local network RCE on BTicino Welcome camera. LCA-2020-001 (February 2020): CVE-2015-1600, Netatmo Indoor Module information disclosure. LCA-2019-001 (April 2019): Welcome camera hardware exploitation. LCA-2018-001: Welcome camera account linking [[57]](https://www.legrand.com/cybersecurity/en/security-advisories).

**CVE-2018-20687** (published November 2019, outside 36-month window): Raritan CommandCenter Secure Gateway — XML External Entity (XXE) vulnerability in WSDL; CVSS 9.8 [[34]](https://cve.report/vendor/raritan). No new Raritan-specific CVEs identified in the 2022–2026 window; per CVEFeed.io, Raritan published 0 vulnerabilities in 2024 [[36]](https://cvefeed.io/vuln/vendor/27871/o-raritan/).

### Additional Technical Advisories

**Server Technology flash wear issue:** PDU models DCPDU, PRO3X, PRO4X with Xerus firmware v4.0.0+ experienced flash wear potentially causing long-term reliability/performance degradation. Not CVE-classified; Server Technology recommends immediate firmware upgrade [[21]](https://www.servertech.com/support).

**Dominion SX II EOL:** End-of-life June 12, 2025 — no further security patches will be issued [[52]](https://www.raritan.com/eu/products). Customers running SX II serial consoles accumulate unpatched CVE risk indefinitely from this date.

**Server Technology Log4Shell (CVE-2021-44228):** Not affected — Server Technology products do not use Java or the Log4j library [[35]](https://www.linkedin.com/posts/rsuijkerbuijk_raritan-vulnerability-servertech-activity-6876825563768602624-MEB0?trk=public_profile_like_view).

**ZPE Nodegrid (Legrand brand, 2025):** No specific CVEs identified in research. Vendor claims 72-hour patch cycle but no dedicated PSIRT advisory page was found [[181]](https://zpesystems.com/products/data-center-solutions/serial-consoles/nodegrid-serial-console-core-edition/).

---

## 10. Publications and Industry Presence

### Security Resources (URLs)

| Resource | URL |
|---|---|
| Legrand Cybersecurity Hub | legrand.com/cybersecurity/en [[56]](https://www.legrand.com/cybersecurity/en) |
| Security Advisories | legrand.com/cybersecurity/en/security-advisories [[57]](https://www.legrand.com/cybersecurity/en/security-advisories) |
| CVD Policy | legrand.com/cybersecurity/en/cvd-policy [[55]](https://www.legrand.com/cybersecurity/en/cvd-policy) |
| PSIRT GPG Key | legrand.com/.well-known/psirt-pgpkey.txt [[55]](https://www.legrand.com/cybersecurity/en/cvd-policy) |
| Raritan Xerus Security Tech Note (May 2025 PDF) | legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) |
| PX4 Firmware + Support | raritan.com/support/product/pdu-g4 [[83]](https://www.raritan.com/support/product/pdu-g4) |
| Developer/API portal | developer.legrand.com [[84]](https://developer.legrand.com/forums/topic/nlt-nld-ota-update-process/) |

### Technical Whitepapers (Confirmed Published)

1. "Powering the Future: AI's Impact on Data Center Design" (October 2025, Legrand Data Center Solutions) [[176]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr1671/files/2025-10/Localized_AI_DataCenter_Whitepaper_R2_V2029.pdf) — covers power density evolution from 5kW/cabinet (late 2010s) to escalating AI workload requirements
2. "Powering the Future: Revolutionizing Data Center Design" (Raritan + Server Technology, 2024–2025) [[174]](https://www.raritan.com/landing/white-paper-powering-the-future-revolutionizing-data-center-design/thanks) [[175]](https://www.servertech.com/resources/white-paper/powering-the-future-revolutionizing-data-center-design-thanks/) — PRO4X and PX4 power quality monitoring; Uptime Institute outage data cited
3. "Redesigning the Data Center for AI Workloads" (Raritan, 2024–2025) [[185]](https://www.raritan.com/landing/redesigning-data-center-for-ai-workloads-white-paper/thanks) — AI infrastructure design; includes the "trusted by top hyperscale" marketing header
4. "A Definitive Guide to Intelligent Rack Power Distribution" (2024, per Data Center Dynamics database) [[162]](https://www.datacenterdynamics.com/en/whitepapers/?company=legrand)
5. "Data Centre UPS: The Essential Characteristics of an Optimised Solution" (Legrand, hosted by DATACENTRE.ME) [[173]](https://datacentre.me/white-papers/legrand-white-paper-data-centre-ups/)
6. "Understanding the Essential Strategies for IoT Security" (Wattstopper brand) [[161]](https://www.legrand.us/wattstopper/strategies-for-iot-security) — client questions on connected device security risks; addresses IoT attack surfaces
7. Raritan PX3 & PX4 Xerus Security Technical Note (V2050, March 13, 2025; May 2025 version) [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) [[47]](https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf) — most detailed product security disclosure
8. "Raritan/Server Technology Environmental Data Center Management and Monitoring" whitepaper [[179]](https://cdn10.servertech.com/assets/documents/documents/1033/original/PAC_RAM_Environmental-Data-Center-Management-and-Monitoring_WhitePaper_v3.pdf)
9. Minkels White Paper 10 on EN 50600 (European data center standard compliance) [[129]](https://hostingjournalist.com/news/minkels-releases-white-paper-on-european-data-center-standard-en-50600)
10. **Data Center Insights** magazine — professional publication twice yearly; customer case studies and product content [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf)
11. 56+ downloadable whitepapers available at legrand.us/resources/white-papers [[160]](https://www.legrand.us/resources/white%20papers)

### Industry Standards Body Memberships (Confirmed)

| Organization | Membership Status | Notes |
|---|---|---|
| Open Compute Project (OCP) | **Platinum Member** (April 2026) | Exhibited OCP Global Summit Oct 2025 (San Jose); OCP EMEA Summit April 2026 (Barcelona, Stand A34) [[10]](https://datacentrenews.uk/story/legrand-expands-ocp-data-centre-kit-for-ai-workloads) [[12]](https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit) [[9]](https://www.legrand.us/about-us/newsroom/press/why-legrand-is-doubling-down-on-open-compute-project-innovations) |
| Connectivity Standards Alliance (CSA/Zigbee Alliance) | **Board Member** since 2012 | Drove Zigbee 3.0 unification; 90+ certified Zigbee products; 20+ Green Power devices [[123]](https://csa-iot.org/newsroom/building-a-sustainable-iot-with-zigbee-and-green-power-legrands-success-story/) |
| NR+ Building Interest Group (DECT Forum) | **Founding Member** (2024) | Co-founded with Schneider Electric and Siemens; world's first interoperability demo March 2026 [[166]](https://www.dect.org/news/legrand-and-schneider-electric-demonstrate-worlds-first-nr-interoperability-demo-for-smart-buildings/) [[167]](https://wirepas.com/news/nr-interest-group/) |
| SDIA (Sustainable Digital Infrastructure Alliance) | Member | Steering group participation; R&D team in lab projects [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) |
| AIA CES Provider | Registered | "Security for Networked Lighting Controls" CEU course [[161]](https://www.legrand.us/wattstopper/strategies-for-iot-security) |

**Unconfirmed memberships (not found in research):** ASHRAE, Green Grid, Uptime Institute, ISA, CISA — Legrand extensively cites these organizations' standards and research in its whitepapers but specific formal membership was not confirmed. Legrand whitepapers reference ASHRAE TC9.9 guidelines and Uptime Institute Annual Outage Analysis but conference sponsorships or speaking slots at these events were not verified.

---

## 11. Competitive Position

### Intelligent Rack PDU Market

**Legrand's market position:** Following the Raritan (2015) and Server Technology (November 2017) acquisitions, IHS Technology analysis concluded Legrand "leaps from miniscule market involvement to owning almost one quarter of the rack PDU market in terms of revenue," positioning it as the **second-largest supplier globally** [[101]](https://technology.ihs.com/596098/legrand-leaps-to-the-second-largest-owner-of-rack-pdu-market-share). A 2025 industry ranking places Legrand #5 among top PDU companies, "standing out for its highly customizable PDUs" [[146]](https://www.newsunnpdu.com/news/top-10-pdu-companies-leading-the-market-this-year/).

| Competitor | Key PDU Brands | Differentiator |
|---|---|---|
| Schneider Electric | APC NetShelter; \$700M US investment plan [[103]](https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market) | Market leader; broadest portfolio; integrated EcoStruxure platform; IEC 62443-4-2 certifications for select products |
| Vertiv | Geist brand; 57% organic orders growth Q2 2024; "360AI architecture" [[103]](https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market) | AI workload optimization; hybrid CDU-PDU (CoolChip Max) |
| Eaton | Tripp Lite (acquired 2021); Fibrebond (\$1.4B acquisition 2021) [[102]](https://www.skyquestt.com/report/intelligent-pdu-market) [[103]](https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market) | Modular pre-integrated power rooms; competitive NA industrial pricing; Brightlayer platform |
| Legrand | Raritan PX4, Server Technology PRO4X; Xerus platform | **HDOT/HDOT Cx patents** (highest outlet density); Redfish/REST open APIs; OCP Platinum; customization depth |
| ABB | Modular power infrastructure | Build quality and ruggedness |
| CyberPower | Direct competitor | Cost-competitive tier |

**Intelligent PDU market sizing:**
- Mordor Intelligence (2025–2030): \$3.52B (2025) → \$5.53B (2030) at 3.52% CAGR [[103]](https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market)
- Future Market Report (2025–2033): \$1,300.45M (2025) → \$3,200.78M (2033) at 11.5% CAGR [[104]](https://www.futuremarketreport.com/industry-report/intelligent-pdu-market/)
- Rack PDU market (broader): \$3.01B (2026) → \$4.62B (2031) at 8.96% CAGR [[96]](https://www.mordorintelligence.com/industry-reports/data-center-rack-pdu-market)

### Data Center Rack Enclosure

Global tier-1 players: Schneider Electric, Vertiv, Rittal, Eaton, nVent, Legrand, HPE, IBM, Cisco [[98]](https://www.imarcgroup.com/data-center-rack-market) [[100]](https://finance.yahoo.com/news/top-20-global-data-center-084800748.html). Market: \$4.4B (2022) → \$6.6B (2027) at 8.7% CAGR [[99]](https://www.globenewswire.com/news-release/2023/01/09/2585330/0/en/Data-Center-Rack-Market-Size-Projected-to-Reach-6-6-Billion-by-2027-Growing-at-A-CAGR-Of-8-7-Report-by-MarketsandMarkets.html). Legrand's Minkels Nexpand (launched May 2022) is the specialist European brand. In the Wesco distribution catalog, Legrand (Middle Atlantic Products) lists only 2 cabinet SKUs versus nVent Hoffman's 429 SKUs and Panduit's 46 SKUs [[97]](https://buy.wesco.com/browse/json/search/PANDUIT/Cabinets/_/N-1v0x8iaZ10lyhvi) — suggesting Legrand's enclosure business is concentrated in direct/specialist channels rather than broad electrical distribution.

### Track Busway

Global busbar market: \$17.94B (2022) → \$26.15B (2031) at 4.42% CAGR [[143]](https://www.globenewswire.com/news-release/2023/08/24/2730877/0/en/Busbar-Market-Current-Trends-Investments-and-Untapped-Profit-Sources-Segments-Detailed-Analysis-Exclusive-InsightAce-Report.html); data center busway specifically: forecast \$6.8B [[144]](https://www.openpr.com/news/4216656/data-center-busway-market-valuation-expected-to-hit-usd-6-8). Competitors: Schneider Electric, Siemens, Eaton, ABB, Vertiv, Rittal, C&S Electric, GE, Mersen, Anord Mardix [[143]](https://www.globenewswire.com/news-release/2023/08/24/2730877/0/en/Busbar-Market-Current-Trends-Investments-and-Untapped-Profit-Sources-Segments-Detailed-Analysis-Exclusive-InsightAce-Report.html) [[144]](https://www.openpr.com/news/4216656/data-center-busway-market-valuation-expected-to-hit-usd-6-8). Starline (founded 1924, acquired 2019) is the established North American standard; first introduced in 1987 [[141]](https://www.legrand.com/datacenter/en/grey-space/busbar-busway/starline-track-busway); Series-S (IP54) addresses liquid cooling environments.

### UPS Market

Global data center UPS: \$3.9B (2024) → \$7.1B (2034) at 6.3% CAGR [[148]](https://www.gminsights.com/industry-analysis/data-center-UPS-market). Top 5 (holding ~60% collectively): Schneider Electric (24.3% share), Eaton, Vertiv, ABB, Delta Electronics [[148]](https://www.gminsights.com/industry-analysis/data-center-UPS-market). Legrand is identified as a "major player" but does not hold a top-5 position. Growing UPS portfolio through acquisitions: Borri (Italy, JV 2017, full acquisition), Power Control (UK, 2022), TEKNICA (Chile, 2023), UPSistemas (Colombia, 2024) [[120]](https://www.legrand.com/en/group/strategy/targeted-acquisitions) [[147]](https://www.businesswire.com/news/home/20181009005692/en/UPS---Worldwide-Market-Analysis-Forecast-2018-2022-ABB-Eaton-Legrand-Schneider-Electric-Toshiba-and-Vertiv-are-Leading-the-Competition---ResearchAndMarkets.com).

### Recent M&A (2020–2026)

Legrand monitors approximately 350 companies in its active acquisition pipeline and executes 3–6 deals per year [[120]](https://www.legrand.com/en/group/strategy/targeted-acquisitions). All acquisition valuations are undisclosed — only acquired company annual sales are reported.

**2025–2026 Strategic Acquisitions (by datacenter focus):**

| Company | Country | Sales | Domain | Announced |
|---|---|---|---|---|
| Avtron Power Solutions | US (Ohio) | ~€350M | Load banks, power quality for DC | October 2025 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| Linkk Busway Systems | Asia | ~€45M | DC grey space busbars | June 2025 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| Computer Room Solutions (CRS) | — | ~€30M | DC white space infrastructure | April 2025 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| Kratos Industries | US | ~\$100M | LV/MV power distribution for DC | February 2026 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| TES | Europe | ~€85M | Power distribution (>50% DC revenue) | April 2026 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| Keydak | China (Guangzhou) | >€60M | Rack manufacturing | April 2026 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| SRS Power Engineering | Malaysia (Selangor) | ~€90M | LV/MV power protection for DC/industrial | May 2026 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |
| Green4T | Brazil | ~€45M | DC installation, maintenance, operation | February 2026 [[1]](https://en.wikipedia.org/wiki/Legrand_(company)) |

**2024 notable acquisitions:** Netrack (India, racks, ~€10M); Enovation (Netherlands, healthcare software, ~€60M); Davenham (Ireland, LV power distribution, ~€120M); APP (Australia, cable management, >€100M); Power Bus Way (North America, cable bus for DC, ~€70M) [[58]](https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results) [[59]](https://www.legrand.com/en/news/2024-full-year-results) [[60]](https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13).

**2022 acquisitions:** USystems (UK, DC cooling/racks, ~€11M); Voltadis (France, DC busbar installation, ~€13M); Power Control (UK, UPS services, ~€15M); A&H Meyer (Germany, furniture power, >€20M); CLAMPER (Brazil, surge protection, ~€40M); ENCELIUM (US, lighting, >€20M) [[1]](https://en.wikipedia.org/wiki/Legrand_(company)).

**No divestitures and no joint ventures identified in the 2020–2026 period.**

---

## 12. GTM Intelligence and Spending Signals

### Open Cybersecurity and Product Security Roles

Three simultaneous cybersecurity internship postings observed at Legrand North America:

| Role | Location | Key JD Excerpts |
|---|---|---|
| Cyber Security Intern (Summer 2026) | West Hartford, CT (onsite) | "reviewing documentation for policies/procedures/standards, analyzing/tracking remediation of system and application vulnerabilities on critical business systems, compliance checking for security tools, research/evaluation of applications for security stack improvements, incident response triage" [[89]](https://jobright.ai/jobs/info/69856985348f733a5c39ca1f) |
| Cyber Security Intern (Summer 2025) | West Hartford, CT | "Potential for career advancement in cybersecurity roles" [[88]](https://prosple.com/graduate-employers/legrand/jobs-internships/cyber-security-intern-summer-2025) |
| Cybersecurity Intern (ASAP) | West Hartford, CT | "At least two years in Computer Science or Engineering with focus on Cybersecurity" [[90]](https://prosple.com/graduate-employers/legrand/jobs-internships/cybersecurity-intern) |

**Assessment:** Three concurrent internship-level hires with no senior specialist roles identified (no IEC 62443 engineer, no product security architect, no PSIRT lead). This indicates a security program in growth phase, not yet fully staffed at senior levels. The September 11, 2026 ENISA reporting deadline creates urgency the current team size may not accommodate.

### Conference Spend Signals (Confirmed Exhibits/Participation)

| Event | Date | Legrand Participation | Signal Type |
|---|---|---|---|
| OCP Global Summit 2025 | October 13–16, 2025, San Jose, CA | Exhibited; announced expanded OCP portfolio [[9]](https://www.legrand.us/about-us/newsroom/press/why-legrand-is-doubling-down-on-open-compute-project-innovations) [[14]](https://www.jsa.net/legrand-reinforces-commitment-to-open-compute-project-innovations/) | Confirmed marketing spend |
| OCP EMEA Summit 2026 | April 28–30, 2026, Barcelona | Exhibited (Stand A34); Platinum member; Marc Marazzi quoted [[12]](https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit) [[13]](https://www.intelligentdatacentres.com/2026/04/15/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit/) [[171]](https://datacentre.solutions/news/72143/legrand-expands-its-ocp-ready-data-centre-solutions) | Confirmed marketing spend |
| Light + Building Frankfurt 2026 | March 2026 | NR+ interoperability demo with Schneider Electric [[166]](https://www.dect.org/news/legrand-and-schneider-electric-demonstrate-worlds-first-nr-interoperability-demo-for-smart-buildings/) | Confirmed |
| Data Center World 2024 (Washington DC) | April 15–18, 2024 | NOT CONFIRMED — event information found; Legrand participation not verified | No confirmed spend |
| ASHRAE Annual 2024 (Indianapolis) | June 22–26, 2024 | NOT CONFIRMED — event attended by 2,040 professionals; Legrand not listed [[91]](https://www.ashrae.org/about/news/2024/ashrae-closes-out-successful-annual-conference-in-indianapolis) | Absent |
| ISC2 Security Congress 2024/2025 | Oct 2024 / Oct 2025 | NOT CONFIRMED — event information found; Legrand not listed [[168]](https://www.isc2.org/Insights/2024/07/ISC2-Announces-Keynote-Speakers-for-Security-Congress-2024-in-Las-Vegas) [[169]](https://www.isc2.org/Insights/2024/08/ISC2-Security-Congress-2024-Prepares-Cyber-Pros-to-Move-Boldly-Forward) [[170]](https://www.isc2.org/Insights/2025/02/ISC2-Security-Congress-2025-Accepting-Call-for-Presentations) | Absent |

### Known Vendor Technology Relationships (Implied Spend)

| Vendor | Relationship | Implied Spend Category |
|---|---|---|
| Microsoft (Azure OpenAI) | Co-development of Gaia and Elia tools within Microsoft Cloud for Manufacturing [[136]](https://www.microsoft.com/en/customers/story/19697-legrand-azure-cloud-services) | Cloud AI services, Microsoft enterprise licensing |
| Synopsys Coverity | Static code analysis for PDU firmware security [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) | DevSecOps tooling |
| Bureau Veritas | ISO 27001:2013 certification audit [[163]](https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html) | Third-party certification/compliance |
| Pivot Point Security (CREST) | IoT security VAPT for Raritan PDUs [[45]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf) | Third-party penetration testing |
| Kyrio (CableLabs) / Microchip | PKI infrastructure for ELIOT (secure element manufacturing) [[121]](https://kyrio.com/project/legrand-customer-case-study/) | IoT security infrastructure |

### Partner Ecosystem Investment

Legrand's partner ecosystem investments are substantial: the PRO Partner Program 5-Star CRN rating; 120+ customer-facing data center staff globally; PRM Portal across 27 countries with 600 users; Data Center Academy and Busbar Academy training programs; pre-qualified sales leads and MDF program [[77]](https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf) [[111]](https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide) [[110]](https://www.raritan.com/partners).

### Key OT/IoT Cybersecurity Sales Entry Points — Summary

| Entry Point | Urgency | Compliance Driver |
|---|---|---|
| IEC 62443-4-2 certification gap for PDUs/KVM | HIGH — procurement requires certifications | CRA Important Class I assessment; customer RFP requirements |
| SBOM absent across all products | HIGH — September 2026 CRA Article 14; October 2026 NIS2 | CRA Annex I; BSI TR-03183-2; NIS2 Article 21 supply chain |
| PSIRT insufficient for 24-hour ENISA reporting | **CRITICAL — deadline September 11, 2026** | CRA Article 14 (3 months away) |
| CVE-2025-28008 in Minkels Varicontrol (CVSS 9.8) | HIGH — unauthenticated RCE in DCIM | Customer remediation, risk assessment services |
| SNMP v1/v2c still supported | MEDIUM — configuration hardening needed | BSI TR-03183 essential requirement 6 (confidentiality) |
| Dominion SX II EOL (June 2025) | HIGH — no future patches | Customer migration to Nodegrid or KX IV serial alternatives |
| PX3 lacks PX4 Secure Boot/Secure Element | MEDIUM — hardware security risk | Customer upgrade path planning |
| ZPE Nodegrid PSIRT gap | MEDIUM — no public advisory page | Trust and transparency gap for OOB management tool |
| IEC 62443-4-1 SDL certification absent | MEDIUM | CRA harmonized standard pre-compliance |
| Product classification ambiguity (Default vs. Class I) | MEDIUM — notified body pre-assessment needed | CRA Article 7 conformity pathway selection |

---

## Analytical Synthesis: Implications for OT/IoT Cybersecurity Sales

**Legrand presents a paradoxical security posture for the market it serves.** The company supplies power management infrastructure to critical hyperscale and colocation operators, yet its product security maturity significantly lags its commercial growth. The data center division grew from €0.7B (2019) to €1.8B proforma (2024) to an estimated ~€2.46B (26% of FY2025 sales), driven by aggressive M&A — but security certifications, SBOM generation, and PSIRT infrastructure have not scaled proportionately.

The **three most actionable findings** for a cybersecurity sales professional engaging Legrand or its customers:

1. **The September 11, 2026 cliff.** CRA Article 14 mandatory 24-hour ENISA reporting for actively exploited vulnerabilities is 90 days away from the research date. Legrand has a contact email PSIRT but no confirmed staffed 24/7 incident response infrastructure. Building a compliant vulnerability triage and reporting system — including ENISA portal integration, triage playbooks, and round-the-clock escalation paths — cannot be accomplished in this window without external specialist support. This is an immediate, time-bounded engagement opportunity.

2. **The SBOM gap blocks hyperscale procurement.** Legrand's hyperscale and colocation customers are almost certainly NIS2 essential service operators who will impose Article 21(2)(d) supply chain security requirements including SBOM provision. Without SBOMs for Raritan PX4, Server Technology PRO4X, ZPE Nodegrid, and Minkels Varicontrol firmware, Legrand's products risk exclusion from procurement cycles at its most strategic accounts. SBOM infrastructure requires supply chain visibility into EMS partners, ODM component suppliers, and open-source dependencies across potentially 100+ transitive dependencies per firmware image — a 6–12 month build effort.

3. **The IEC 62443 certification gap differentiates against Schneider Electric.** In procurement RFPs for NIS2 essential entities and EU critical infrastructure, IEC 62443-4-2 component security assurance certificates are increasingly mandatory. Schneider Electric certifies select APC products to IEC 62443-4-2. Legrand's ISO 27001 certification (DPC division) is a creditable foundation but does not satisfy IEC 62443-4-2 CSA requirements. Third-party assessment via the Module H pathway (BSI TR-03183-H, leveraging the existing ISO 27001 ISMS at Zwickau) represents the most cost-efficient route — but still requires notified body engagement and 4–6 month audit timelines.

**Competitive positioning note:** Legrand's Xerus platform offers technically superior cryptographic implementation (TLS 1.3, ECDSA, ed25519, curve25519 key exchange, hardware Secure Element on PX4) compared to what most competitors publish in product security documentation. The security engineering is present; the certification, documentation, and regulatory infrastructure around it is the gap. This creates a genuinely winnable compliance advisory engagement rather than a product deficiency remediation.

## Sources

[1] Legrand (company) - Wikipedia - https://en.wikipedia.org/wiki/Legrand_(company)
[2] Legrand (EPA:LR) Number of Employees - https://stockanalysis.com/quote/epa/LR/employees/
[3] LeGrand SA: Number of Employees 2016-2026 | LGRDY | MacroTrends - https://www.macrotrends.net/stocks/charts/LGRDY/legrand-sa/number-of-employees
[4] Legrand Company Overview, Contact Details & Competitors | LeadIQ - https://leadiq.com/c/legrand/5a1d7e612400002400586c32
[5] Legrand | Company Overview & News - https://www.forbes.com/companies/legrand/
[6] Legrand Company Profile - Office Locations, Competitors, Revenue, Financials, Employees, Key People, Subsidiaries | Craft.co - https://craft.co/legrand
[7] How many employees work at Legrand North America? | Revelio Labs - https://www.reveliolabs.com/companies/legrand-north-america/employees/
[8] Legrand, North America | LinkedIn - https://www.linkedin.com/company/legrand-north-america
[9] Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations - https://www.legrand.us/about-us/newsroom/press/why-legrand-is-doubling-down-on-open-compute-project-innovations
[10] Legrand expands OCP data centre kit for AI workloads - https://datacentrenews.uk/story/legrand-expands-ocp-data-centre-kit-for-ai-workloads
[11] Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations - https://www.prnewswire.com/news-releases/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations-302570756.html
[12] Legrand Showcases End-to-End Open Compute Portfolio for AI-Scale Infrastructure at OCP EMEA Summit - Data Centre Trade Association News - The DCA Data Centre Alliance - https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit
[13] Legrand showcases End-to-End Open Compute Portfolio for AI-scale infrastructure at OCP EMEA Summit – Intelligent Data Centres - https://www.intelligentdatacentres.com/2026/04/15/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit/
[14] Legrand Reinforces Commitment To Open Compute Project Innovations - JSA - https://www.jsa.net/legrand-reinforces-commitment-to-open-compute-project-innovations/
[15] Legrand Electrical Solutions | Border States - https://www.borderstates.com/brands/Legrand
[16] Legrand |  Quality Electrical Distribution (QED) - https://www.qedelectric.com/brands/legrand
[17] NVD - CVE-2025-2983 - https://nvd.nist.gov/vuln/detail/CVE-2025-2983
[18] A vulnerability has been found in Legrand SMS PowerView 1... · CVE-2025-2983 · GitHub Advisory Database · GitHub - https://github.com/advisories/GHSA-486q-q4pw-3v7c
[19] Board of directors: the executive committee - Legrand - https://www.legrand.com/en/group/management
[20] Legrand Announces Brian DiBella as President & CEO for North & Central America - EdisonReport - https://edisonreport.com/2024/02/20/legrand-announces-brian-dibella-as-president-ceo-for-north-central-america/
[21] Server Technology Product Support | Server Technology - https://www.servertech.com/support
[22] MyHOME Integrated Solutions for home automation functions - Legrand Integrated Solutions - https://www.legrandintegratedsolutions.com/Solutions_for_home_automation_functions
[23] MyHOME - Works with Legrand - https://developer.legrand.com/solutions/myhome/
[24] The MyHome automation system by Legrand - Bticino - Arnould - MyOmBox - https://blog.myombox.com/myhome-automation/the-myhome-automation-system-by-legrand-bticino-arnould
[25] Legrand (EPA:LR) Company Profile & Description - https://stockanalysis.com/quote/epa/LR/company/
[26] Legrand: Shareholders Board Members Managers and Company Profile | FR0010307819 | MarketScreener - https://www.marketscreener.com/quote/stock/LEGRAND-16719/company/
[27] All subsidiary companies of the Legrand SA group (Wiener Boerse) - MarketScreener - https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/company-group/
[28] All subsidiary companies of the Legrand group (OTC Markets) - MarketScreener - https://www.marketscreener.com/quote/stock/LEGRAND-120791315/company-group/
[29] Legrand SA (LR.PA) Company Profile & Facts - Yahoo Finance - https://finance.yahoo.com/quote/LR.PA/profile/
[30] Legrand SA Insider Trading & Ownership Structure - Simply Wall St - https://simplywall.st/stocks/fr/capital-goods/epa-lr/legrand-shares/ownership
[31] Leadership | Legrand - https://www.legrand.us/about-us/leadership
[32]  Legrand_Half_year_financiel_report_2025_EN - https://www.legrand.com/sites/default/files/Documents_PDF_Legrand/Finance/2025/6m/Legrand_Half_year_financiel_report_2025_EN_1753889292.pdf
[33] Home - Investors & Shareholders - Legrand - https://www.legrand.com/en/investors-and-shareholders
[34] CVE.report - Raritan - https://cve.report/vendor/raritan
[35] #raritan #vulnerability #servertech | Rob S. - https://www.linkedin.com/posts/rsuijkerbuijk_raritan-vulnerability-servertech-activity-6876825563768602624-MEB0?trk=public_profile_like_view
[36] Vendor : RARITAN Vulnerability Security Posture - https://cvefeed.io/vuln/vendor/27871/o-raritan/
[37] Server Technology Rack Power Distribution Units | Legrand - https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/server-technology-intelligent-pdus
[38] Legrand PDUs - Power Solutions - https://www.power-solutions.com/power-dstr/legrand-pdus/
[39] Server Technology Bio | C&C Technology Group - https://cc-techgroup.com/server-technology/
[40] Server Technology - Rack PDUs for Data Centers | Legrand - https://www.legrand.us/server-technology
[41] Rack Power Distribution Unit (PDU) Blog | Tag: Legrand | Server Technology - https://www.servertech.com/tags/legrand
[42] Server Technology PRO4X Rack Power Distribution Unit (PDU) | Legrand Data Center Solutions English - https://www.legrand.com/datacenter/en/white-space/in-rack-power-management/power-distribution/server-technology-pro4x-rack-power-distribution-unit-pdu
[43] Rack Power Distribution Units | Raritan | Legrand - https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/raritan-intelligent-pdus
[44] Legrand / Raritan / Server Technology Xerus™ PDU JSON-RPC API: Modbus.idl Source File - https://help.servertech.com/json-rpc/4.0.40/Modbus_8idl_source.html
[45] Raritan PX3 & PX4 Rack PDUs # XERUS SECURITY - https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf
[46] PRO4X Rack PDU | Server Technology - https://www.servertech.com/products/pro4x-pdu
[47] Raritan PX3 & PX4 Rack PDUs # XERUS SECURITY - https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf
[48] Raritan – Intelligent PDU and KVM Solutions –Legrand - https://www.legrand.us/raritan
[49] Raritan By Legrand | C&C Technology Group - https://cc-techgroup.com/raritan/
[50] Raritan Authorized Partner - https://raritan-authorized-partner.com/
[51] Legrand Acquires Raritan, DCIM Business Spun Off - https://www.datacenterknowledge.com/data-center-infrastructure-management/legrand-acquires-raritan-dcim-business-spun-off
[52] Products - https://www.raritan.com/eu/products
[53] Data Center Power Management, DCIM Software, and KVM-over-IP - https://www.raritan.com/
[54] Legrand Cybersecurity Advisory - https://assets.legrand.com/webf/cybersecurity/LCA-2025-001.pdf
[55] CVD Policy | Legrand Cybersecurity France - https://www.legrand.com/cybersecurity/en/cvd-policy
[56] Cybersecurity | Legrand Cybersecurity - https://www.legrand.com/cybersecurity/en
[57] Security Advisories | Legrand Cybersecurity France - https://www.legrand.com/cybersecurity/en/security-advisories
[58] Legrand: 2024 Full-year Results - https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results
[59] 2024 full-year results - Legrand - https://www.legrand.com/en/news/2024-full-year-results
[60] Legrand: 2024 Full-year Results | Nasdaq - https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13
[61] LEGRAND (LR) Stock Forecast, Price Targets and Analysts Predictions - TipRanks.com - https://www.tipranks.com/stocks/fr:lr/forecast
[62] Legrand SA: Target Price Consensus and Analysts Recommendations | LR | FR0010307819 | MarketScreener - https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/consensus/
[63] Earnings call: Legrand reports robust 2023 results, targets growth in 2024 By Investing.com - https://www.investing.com/news/stock-market-news/earnings-call-legrand-reports-robust-2023-results-targets-growth-in-2024-93CH-3306660
[64] Marco Catuozzo - CTO ELIOT & VP R&D building system buisness unit at Legrand | The Org - https://theorg.com/org/legrand/org-chart/marco-catuozzo
[65] Legrand | The Org - https://theorg.com/org/legrand
[66] Our history - Legrand - https://www.legrand.com/en/group/our-history
[67] José Duarte Email & Phone | Group CIO at Legrand | AroundDeal - https://www.arounddeal.com/p/jose-duarte/d3umsotujd
[68] Jose Duarte Email & Phone Number | Group CIO at Legrand - ContactOut - https://contactout.com/jose-duarte-94859
[69] Track Busway Power Distribution from Starline - https://www.legrand.us/critical-power-and-infrastructure/track-busway
[70] Starline Power Solutions - C&C Technology Group - https://cc-techgroup.com/starline/
[71] Powering the Next Generation of Innovation: Legrand Unveils New Starline Series-S Track Busway - https://www.newswire.ca/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-865060661.html
[72] PRODUCT OFFERING BROCHURE - https://starlinepower.com/sites/default/files/2025-01/starline_product_brochureMAY22_US-WEB.pdf
[73] Powering the Next Generation of Innovation: Legrand Unveils New Starline Series-S Track Busway - https://www.prnewswire.com/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-301896525.html
[74] UPS: Borri and Legrand Group join forces - Borri - https://www.borri.it/borri-legrand-join-forces/
[75] Products - Legrand - https://ups.legrand.com/en/products
[76] Borri - Single phase and three phase UPS (Uninterruptible Power Supply) - https://www.borri.it/
[77] DATA # CENTER # INSIGHTS - https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf
[78] MEGALINE - Legrand - https://ups.legrand.com/en/products/megaline
[79] Ortronics Infinium™ HD Enhanced Fiber Enclosure | Legrand - https://www.legrand.us/solutions/fiber-optic/infinium-hd-enclosure-enhanced
[80] Equipment enclosures are versatile in many environments | Cabling Installation & Maintenance - https://www.cablinginstall.com/data-center/article/16465179/equipment-enclosures-are-versatile-in-many-environments
[81] Raritan PX4 Rack PDUs: New Firmware Update | Raritan, a brand of Legrand posted on the topic | LinkedIn - https://www.linkedin.com/posts/raritan_raritan-px4-firmwareupdate-activity-7300922952865206273-UNCM
[82] Raritan PX4 Frequently Asked Questions - https://www.raritan.com/ap/landing/raritan-px4-frequently-asked-questions
[83] PX4 - https://www.raritan.com/support/product/pdu-g4
[84] NLT / NLD OTA update process - Works with Legrand - https://developer.legrand.com/forums/topic/nlt-nld-ota-update-process/
[85] Smarther “… with Netatmo” - Works with Legrand - https://developer.legrand.com/solutions/smarther-with-netatmo/
[86] Smarther - Works with Legrand - https://developer.legrand.com/solutions/smarther/
[87] Smarther - https://assets.legrand.com/pim/NP-FT-GT/RA00175AB_U_EN.pdf
[88] Cyber Security Intern (Summer 2025) at Legrand | Prosple - https://prosple.com/graduate-employers/legrand/jobs-internships/cyber-security-intern-summer-2025
[89] Cyber Security Intern (Summer 2026) @ Legrand, North America | Jobright.ai - https://jobright.ai/jobs/info/69856985348f733a5c39ca1f
[90] Cybersecurity Intern (ASAP) at Legrand - Prosple - https://prosple.com/graduate-employers/legrand/jobs-internships/cybersecurity-intern
[91] ASHRAE Closes Out Successful Annual Conference in Indianapolis - https://www.ashrae.org/about/news/2024/ashrae-closes-out-successful-annual-conference-in-indianapolis
[92] NIS2 and Supply Chain: Bridging End Users and OEMs | Rockwell Automation | US - https://www.rockwellautomation.com/en-us/company/news/blogs/nis2-and-supply-chain.html
[93] NIS2 and OT Security: Compliance Guide for Industry | Opsio - https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/
[94] Supply Chain Security: what the NIS2 Directive requires - https://www.cybertrust365.com/en/supply-chain-security-nis2/
[95] NIS2 and Supply Chain Security: What Actual Compliance Looks Like - https://www.thingsrecon.com/blog/nis2-and-supply-chain-security-what-actual-compliance-looks-like
[96] Data Center Rack Power Distribution Unit (PDU) Market Size, Share, Trends - https://www.mordorintelligence.com/industry-reports/data-center-rack-pdu-market
[97] Racks & Cabinets - https://buy.wesco.com/browse/json/search/PANDUIT/Cabinets/_/N-1v0x8iaZ10lyhvi
[98] Data Center Rack Market Analysis, Size | Forecast, 2033 - https://www.imarcgroup.com/data-center-rack-market
[99] Data Center Rack Market Size Projected to Reach $6.6 - https://www.globenewswire.com/news-release/2023/01/09/2585330/0/en/Data-Center-Rack-Market-Size-Projected-to-Reach-6-6-Billion-by-2027-Growing-at-A-CAGR-Of-8-7-Report-by-MarketsandMarkets.html
[100] Top 20 Global Data Center Rack Companies Ranked in New 2025 Data Centre Rack Evaluation Report - https://finance.yahoo.com/news/top-20-global-data-center-084800748.html
[101] Legrand leaps to the second-largest owner of rack PDU market share - IHS Technology - https://technology.ihs.com/596098/legrand-leaps-to-the-second-largest-owner-of-rack-pdu-market-share
[102] Intelligent PDU Market Size, Share | Growth Analysis [2033] - https://www.skyquestt.com/report/intelligent-pdu-market
[103] Intelligent PDU Market Size, Share & 2030 Trends Report - https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market
[104] Intelligent PDU Market Size, Share, Growth | CAGR Forecast 2033 - https://www.futuremarketreport.com/industry-report/intelligent-pdu-market/
[105] CRA Update: The EU Commission drafts New Guidelines for “Important” and “Critical” Products with Digital Elements – Certitude Blog - https://certitude.consulting/blog/en/cra-update-the-eu-commission-drafts-new-guidelines-for-important-and-critical-products-with-digital-elements/
[106] CRA Gets Teeth: Technical Definitions for Product Classes Now Official | Secure-by-Design Handbook - https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published
[107] Part 2: Product Classification - The Hidden Complexity - Periphery - https://www.periphery.security/blog/part-2-product-classification---the-hidden-complexity
[108] Your Guide to the 2026 CRA Annex IV Critical Products List: 8 Key Areas - https://goregulus.com/cra-basics/cra-annex-iv-critical-products-list/
[109] Cyber Resilience Act: Technical Descriptions for Important and Critical Products Are Published - EU Digital Compliance Tracker (Snellman) - https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/
[110] Raritan Partners - https://www.raritan.com/partners
[111] Legrand Recognized as a 5-Star Program in the 2026 CRN® Partner Program Guide - https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide
[112] Legrand Recognized in 2026 CRN Partner Program Guide – tEDmag - https://tedmag.com/legrand-recognized-in-2026-crn-partner-program-guide/
[113] LG Unveils Expanded Partner Program for U.S. Resellers - https://www.channelfutures.com/channel-business/lg-unveils-expanded-partner-program-for-u-s-resellers
[114] Legrand Revitalizes Data Center Sector with Two Revolutionary Intelligent Rack PDUs - https://www.raritan.com/about-us/newsroom/detail/legrand-revitalizes-data-center-sector-with-two-revolutionary-intelligent-rack-pdus
[115] The Cyber Resilience Act: an overview | Cyberstand - https://cyberstand.eu/cyber-resilience-act-overview
[116] Horizontal cybersecurity requirements for products with digital elements | EUR-Lex - https://eur-lex.europa.eu/EN/legal-content/summary/horizontal-cybersecurity-requirements-for-products-with-digital-elements.html
[117] Decoding the Cyber Resilience Act – Part 1: Scope and Impact | Freshfields - https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-1-scope-and-impact-102m2cz
[118] Cyber Resilience Act (EU) 2024/2847 | Cyber Laws | Cyber Laws - https://cyber-laws.com/en/regulations/cra/
[119] The EU’s Cyber Resilience Act: New Cybersecurity Requirements for Connected Products and Software - https://www.pillsburylaw.com/en/news-and-insights/eu-cyber-resilience-act-requirements-products-software.html
[120] Acquisitions - Legrand - https://www.legrand.com/en/group/strategy/targeted-acquisitions
[121] Legrand Customer Case Study - Kyrio - https://kyrio.com/project/legrand-customer-case-study/
[122] Eliot – everything you need to know about legrand’s connected objects program - https://www.legrand.co.in/smart-spaces/eliot-%E2%80%93-everything-you-need-to-know-about-legrands-connected-objects-program
[123] Building a Sustainable IoT with Zigbee and Green Power Legrand’s Success Story - CSA-IOT - https://csa-iot.org/newsroom/building-a-sustainable-iot-with-zigbee-and-green-power-legrands-success-story/
[124] Legrand Supplier and Partner Relationship - https://www.legrand.us/about-us/suppliers-and-partners
[125] AOL | Case Studies | Resources - https://www.raritan.com/ap/resources/case-studies/detail/aol
[126] Case Studies | Resources - https://www.raritan.com/resources/case-studies
[127] CASE STUDY - https://www.raritan.com/assets/ram/case_studies/downloads/experian-raritan-case-study.pdf
[128] ESI Group deploys HPC Center in Paris with Minkels & Legrand - https://www.minkels.com/cases/esi-group-deploys-hpc-center-in-paris-with-minkels-and-legrand
[129] Minkels Releases White Paper on European Data Center Standard, EN 50600 - HostingJournalist.com - https://hostingjournalist.com/news/minkels-releases-white-paper-on-european-data-center-standard-en-50600
[130] Nuvo International Distributors | Legrand - https://www.legrand.us/nuvo/international-distributors
[131] MUK | Legrand  | AUTHORIZED DISTRIBUTOR - https://muk.group/en/vendor/legrand/
[132] Legrand-Pass & Seymour Distributor | Standard Electric Supply Co. - https://www.standardelectricsupply.com/Brands/Legrand-Pass-And-Seymour-Distributor
[133] Legrand Authorized Supplier & Distributor - https://bankoflamps.com/legrand
[134] Legrand AV Distributor | Anixter - https://www.anixter.com/en_us/manufacturers/l/legrandav.html
[135] Legrand AV | Contact Us - Asia Pacific - https://www.legrandav.com/contact_us/contact_apac
[136] Legrand and Azure OpenAI Service: Powering smarter solutions with AI-driven tools | Microsoft Customer Stories - https://www.microsoft.com/en/customers/story/19697-legrand-azure-cloud-services
[137] Legrand Partners with Microsoft to Create New Hybrid Conferencing Space - https://www.prnewswire.com/news-releases/legrand-partners-with-microsoft-to-create-new-hybrid-conferencing-space-301938112.html
[138] Legrand Partners with Microsoft to Create New Hybrid Conferencing Space - https://www.legrand.us/about-us/newsroom/press/new-hybrid-conferencing-space
[139] Reinventing the edge: Siemens, Cadolto and Legrand introduce new modular data center | Press | Company | Siemens - https://press.siemens.com/global/en/pressrelease/reinventing-edge-siemens-cadolto-and-legrand-introduce-new-modular-data-center
[140] Commitment to Cisco’s Building Solutions with New Product Development | Legrand - https://www.legrand.us/about-us/newsroom/press/cisco-building-solutions
[141] Starline Track Busway | Legrand Data Center Solutions - https://www.legrand.com/datacenter/en/grey-space/busbar-busway/starline-track-busway
[142] Data Center Case Studies - https://www.legrand.us/markets/data-center/case-studies
[143] Busbar Market - Current Trends, Investments and Untapped - https://www.globenewswire.com/news-release/2023/08/24/2730877/0/en/Busbar-Market-Current-Trends-Investments-and-Untapped-Profit-Sources-Segments-Detailed-Analysis-Exclusive-InsightAce-Report.html
[144] Data Center Busway Market Valuation Expected to Hit USD 6.8 - https://www.openpr.com/news/4216656/data-center-busway-market-valuation-expected-to-hit-usd-6-8
[145] What is Competitive Landscape of Legrand Electric Ltd. Company? – MatrixBCG.com - https://matrixbcg.com/blogs/competitors/legrand
[146] News - Top 10 PDU Companies Leading the Market This Year, - https://www.newsunnpdu.com/news/top-10-pdu-companies-leading-the-market-this-year/
[147] UPS - Worldwide Market Analysis & Forecast (2018-2022): ABB, Eaton, Legrand, Schneider Electric, Toshiba, and Vertiv are Leading the Competition - ResearchAndMarkets.com | Business Wire - https://www.businesswire.com/news/home/20181009005692/en/UPS---Worldwide-Market-Analysis-Forecast-2018-2022-ABB-Eaton-Legrand-Schneider-Electric-Toshiba-and-Vertiv-are-Leading-the-Competition---ResearchAndMarkets.com
[148] Data Center UPS Market Size, Share & Forecast Report, 2034 - https://www.gminsights.com/industry-analysis/data-center-UPS-market
[149] NIS2 and EU Cyber Resilience Act | Understand Their Relationship - https://hyperproof.io/understanding-the-relationship-between-nis2-and-the-eu-cyber-resilience-act/
[150] Differences Between CRA (Cyber Resilience Act) and IEC 62443 - https://oringnet.com/en/knowledge-base/differences-between-cra-cyber-resilience-act-and-iec-62443
[151] Webinar 'CRA Standards Unlocked: From EN IEC 62443 to CRA: OT Cybersecurity for Important products Class I & II' - CEN-CENELEC - https://www.cencenelec.eu/news-events/events/2025/2025-09-09-en-iec-62443-to-cra/
[152] IEC 62443 Standard GAP Analysis to the Cyber Resilience Act (CRA) - https://honeytreelabs.com/posts/iec62443_vs_cra/
[153] CRA Standards Unlocked: From EN IEC 62443 to CRA: OT Cybersecurity for Important products Class I & II | Cyberstand - https://cyberstand.eu/events/cra-standards-unlocked-en-iec-62443-cra-ot-cybersecurity-important-products-class-i-ii
[154] Cyber Resilience Act, RED, and IEC 62443 - https://machinerysafety101.com/2026/02/09/cyber-resilience-act-red-iec-62443/
[155] BSI  -  Technical Guideline TR-03183 - https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html
[156] EU Cyber Resilience Act (CRA) SBOM Requirements | Sbomify - https://sbomify.com/compliance/eu-cra/
[157] BSI  -  Technical Guideline TR-03183 - BSI TR-03183: Cyber Resilience Requirements for Manufacturers and Products - https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html
[158] Cyber-Resilience Act (CRA) | Secure-by-Design Handbook - https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview
[159] Technical Guideline TR-03183: Cyber Resilience Requirements for Manufacturers and Products - https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v0_10_0.pdf?__blob=publicationFile&v=1
[160] Resources - https://www.legrand.us/resources/white%20papers
[161] Whitepaper: IoT Security | Wattstopper | Legrand - https://www.legrand.us/wattstopper/strategies-for-iot-security
[162] Whitepapers & Reports Legrand - DCD - https://www.datacenterdynamics.com/en/whitepapers/?company=legrand
[163] Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications - https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html
[164] Legrand Supplier and Partner Relationship - https://www.legrand.us/about-us/suppliers-and-partners/our-policy
[165] Responsible purchasing: ensuring sustainable development ... - Legrand - https://www.legrand.com/en/supplier
[166] Legrand and Schneider Electric demonstrate world’s first NR+ interoperability demo for smart buildings – DECT Forum - https://www.dect.org/news/legrand-and-schneider-electric-demonstrate-worlds-first-nr-interoperability-demo-for-smart-buildings/
[167] Legrand, Schneider Electric & Siemens launch NR+ interest group - https://wirepas.com/news/nr-interest-group/
[168] ISC2 Announces Keynote Speakers for Security Congress 2024 in Las Vegas - https://www.isc2.org/Insights/2024/07/ISC2-Announces-Keynote-Speakers-for-Security-Congress-2024-in-Las-Vegas
[169] ISC2 Security Congress 2024 Prepares Cyber Pros to Move Boldly Forward to Prepare for Emerging Threats - https://www.isc2.org/Insights/2024/08/ISC2-Security-Congress-2024-Prepares-Cyber-Pros-to-Move-Boldly-Forward
[170] ISC2 Security Congress 2025 Accepting Call for Presentations - https://www.isc2.org/Insights/2025/02/ISC2-Security-Congress-2025-Accepting-Call-for-Presentations
[171] Legrand expands its OCP-ready data centre solutions | Data Centre Solutions - https://datacentre.solutions/news/72143/legrand-expands-its-ocp-ready-data-centre-solutions
[172] Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications - https://ycharts.com/news/story/PRN-CL94327-20240423
[173] Legrand White Paper - Data Centre UPS - DATACENTRE.ME - https://datacentre.me/white-papers/legrand-white-paper-data-centre-ups/
[174] White Paper: Powering the Future &mdash; Revolutionizing Data Center Design - https://www.raritan.com/landing/white-paper-powering-the-future-revolutionizing-data-center-design/thanks
[175] Powering the Future: Revolutionizing Data Center Design | Server Technology - https://www.servertech.com/resources/white-paper/powering-the-future-revolutionizing-data-center-design-thanks/
[176] Powering the Future: # AI’s Impact on Data Center Design - https://www.legrand.com/datacenter/sites/g/files/ocwmcr1671/files/2025-10/Localized_AI_DataCenter_Whitepaper_R2_V2029.pdf
[177] Minkels Launches Varicontrol 1.0: Data Centre Monitoring & Management With All KPIs |
                                    Newswire - https://www.newswire.com/news/minkels-launches-varicontrol-1-0-data-centre-monitoring-management-with-59016
[178] PDU_LDC_ReleaseNotes_4.0.35-50602 - https://assets.legrand.com/pim/AUTRE/PDU_LDC_040035-50602_ReleaseNotes.pdf
[179] Environmental Data Center Management # and Monitoring - https://cdn10.servertech.com/assets/documents/documents/1033/original/PAC_RAM_Environmental-Data-Center-Management-and-Monitoring_WhitePaper_v3.pdf
[180] 2025 full-year results - Legrand - https://www.legrand.com/en/news/2025-full-year-results
[181] Nodegrid Serial Console – Core Edition - ZPE Systems - https://zpesystems.com/products/data-center-solutions/serial-consoles/nodegrid-serial-console-core-edition/
[182] ZPE Systems Announces Nodegrid Serial Console Plus, a High-density, Cellular-enabled Serial Console for Datacenters and Critical Remote Locations - ZPE Systems - https://zpesystems.com/zpe-systems-announces-the-nodegrid-serial-console-plus/
[183] S-CONNECT - ZPE Systems Nodegrid Serial Console Plus - Core ... - https://www.s-connect.dk/zeige_produkt.php?produkt_id=8420
[184] Legrand Makes 451 Research's List of Largest Data Center Technology Suppliers - https://www.prnewswire.com/news-releases/legrand-makes-451-researchs-list-of-largest-data-center-technology-suppliers-300641126.html
[185] White Paper: Redesigning the Data Center for AI Workloads - https://www.raritan.com/landing/redesigning-data-center-for-ai-workloads-white-paper/thanks
[186] VariControl-S | Manualzz - https://manualzz.com/doc/29981592/varicontrol-s
[187] Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations - https://www.raritan.com/about-us/newsroom/detail/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations

## Sources

- Legrand (company) - Wikipedia — https://en.wikipedia.org/wiki/Legrand_(company)
- Legrand (EPA:LR) Number of Employees — https://stockanalysis.com/quote/epa/LR/employees/
- LeGrand SA: Number of Employees 2016-2026 | LGRDY | MacroTrends — https://www.macrotrends.net/stocks/charts/LGRDY/legrand-sa/number-of-employees
- Legrand Company Overview, Contact Details & Competitors | LeadIQ — https://leadiq.com/c/legrand/5a1d7e612400002400586c32
- Legrand | Company Overview & News — https://www.forbes.com/companies/legrand/
- Legrand Company Profile - Office Locations, Competitors, Revenue, Financials, Employees, Key People, Subsidiaries | Craft.co — https://craft.co/legrand
- How many employees work at Legrand North America? | Revelio Labs — https://www.reveliolabs.com/companies/legrand-north-america/employees/
- Legrand, North America | LinkedIn — https://www.linkedin.com/company/legrand-north-america
- Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations — https://www.legrand.us/about-us/newsroom/press/why-legrand-is-doubling-down-on-open-compute-project-innovations
- Legrand expands OCP data centre kit for AI workloads — https://datacentrenews.uk/story/legrand-expands-ocp-data-centre-kit-for-ai-workloads
- Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations — https://www.prnewswire.com/news-releases/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations-302570756.html
- Legrand Showcases End-to-End Open Compute Portfolio for AI-Scale Infrastructure at OCP EMEA Summit - Data Centre Trade Association News - The DCA Data Centre Alliance — https://www.dcauk.org/partner-news/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit
- Legrand showcases End-to-End Open Compute Portfolio for AI-scale infrastructure at OCP EMEA Summit – Intelligent Data Centres — https://www.intelligentdatacentres.com/2026/04/15/legrand-showcases-end-to-end-open-compute-portfolio-for-ai-scale-infrastructure-at-ocp-emea-summit/
- Legrand Reinforces Commitment To Open Compute Project Innovations - JSA — https://www.jsa.net/legrand-reinforces-commitment-to-open-compute-project-innovations/
- Legrand Electrical Solutions | Border States — https://www.borderstates.com/brands/Legrand
- Legrand |  Quality Electrical Distribution (QED) — https://www.qedelectric.com/brands/legrand
- NVD - CVE-2025-2983 — https://nvd.nist.gov/vuln/detail/CVE-2025-2983
- A vulnerability has been found in Legrand SMS PowerView 1... · CVE-2025-2983 · GitHub Advisory Database · GitHub — https://github.com/advisories/GHSA-486q-q4pw-3v7c
- Board of directors: the executive committee - Legrand — https://www.legrand.com/en/group/management
- Legrand Announces Brian DiBella as President & CEO for North & Central America - EdisonReport — https://edisonreport.com/2024/02/20/legrand-announces-brian-dibella-as-president-ceo-for-north-central-america/
- Server Technology Product Support | Server Technology — https://www.servertech.com/support
- MyHOME Integrated Solutions for home automation functions - Legrand Integrated Solutions — https://www.legrandintegratedsolutions.com/Solutions_for_home_automation_functions
- MyHOME - Works with Legrand — https://developer.legrand.com/solutions/myhome/
- The MyHome automation system by Legrand - Bticino - Arnould - MyOmBox — https://blog.myombox.com/myhome-automation/the-myhome-automation-system-by-legrand-bticino-arnould
- Legrand (EPA:LR) Company Profile & Description — https://stockanalysis.com/quote/epa/LR/company/
- Legrand: Shareholders Board Members Managers and Company Profile | FR0010307819 | MarketScreener — https://www.marketscreener.com/quote/stock/LEGRAND-16719/company/
- All subsidiary companies of the Legrand SA group (Wiener Boerse) - MarketScreener — https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/company-group/
- All subsidiary companies of the Legrand group (OTC Markets) - MarketScreener — https://www.marketscreener.com/quote/stock/LEGRAND-120791315/company-group/
- Legrand SA (LR.PA) Company Profile & Facts - Yahoo Finance — https://finance.yahoo.com/quote/LR.PA/profile/
- Legrand SA Insider Trading & Ownership Structure - Simply Wall St — https://simplywall.st/stocks/fr/capital-goods/epa-lr/legrand-shares/ownership
- Leadership | Legrand — https://www.legrand.us/about-us/leadership
-  Legrand_Half_year_financiel_report_2025_EN — https://www.legrand.com/sites/default/files/Documents_PDF_Legrand/Finance/2025/6m/Legrand_Half_year_financiel_report_2025_EN_1753889292.pdf
- Home - Investors & Shareholders - Legrand — https://www.legrand.com/en/investors-and-shareholders
- CVE.report - Raritan — https://cve.report/vendor/raritan
- #raritan #vulnerability #servertech | Rob S. — https://www.linkedin.com/posts/rsuijkerbuijk_raritan-vulnerability-servertech-activity-6876825563768602624-MEB0?trk=public_profile_like_view
- Vendor : RARITAN Vulnerability Security Posture — https://cvefeed.io/vuln/vendor/27871/o-raritan/
- Server Technology Rack Power Distribution Units | Legrand — https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/server-technology-intelligent-pdus
- Legrand PDUs - Power Solutions — https://www.power-solutions.com/power-dstr/legrand-pdus/
- Server Technology Bio | C&C Technology Group — https://cc-techgroup.com/server-technology/
- Server Technology - Rack PDUs for Data Centers | Legrand — https://www.legrand.us/server-technology
- Rack Power Distribution Unit (PDU) Blog | Tag: Legrand | Server Technology — https://www.servertech.com/tags/legrand
- Server Technology PRO4X Rack Power Distribution Unit (PDU) | Legrand Data Center Solutions English — https://www.legrand.com/datacenter/en/white-space/in-rack-power-management/power-distribution/server-technology-pro4x-rack-power-distribution-unit-pdu
- Rack Power Distribution Units | Raritan | Legrand — https://www.legrand.us/critical-power-and-infrastructure/rack-power-distribution/raritan-intelligent-pdus
- Legrand / Raritan / Server Technology Xerus™ PDU JSON-RPC API: Modbus.idl Source File — https://help.servertech.com/json-rpc/4.0.40/Modbus_8idl_source.html
- Raritan PX3 & PX4 Rack PDUs # XERUS SECURITY — https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2025-05/Localized_Raritan-Xerus-Security_Tech-Note_0.pdf
- PRO4X Rack PDU | Server Technology — https://www.servertech.com/products/pro4x-pdu
- Raritan PX3 & PX4 Rack PDUs # XERUS SECURITY — https://www.raritan.com/assets/ram/resources/data_sheets/Raritan-Xerus-Security_Tech-Note_V2050.pdf
- Raritan – Intelligent PDU and KVM Solutions –Legrand — https://www.legrand.us/raritan
- Raritan By Legrand | C&C Technology Group — https://cc-techgroup.com/raritan/
- Raritan Authorized Partner — https://raritan-authorized-partner.com/
- Legrand Acquires Raritan, DCIM Business Spun Off — https://www.datacenterknowledge.com/data-center-infrastructure-management/legrand-acquires-raritan-dcim-business-spun-off
- Products — https://www.raritan.com/eu/products
- Data Center Power Management, DCIM Software, and KVM-over-IP — https://www.raritan.com/
- Legrand Cybersecurity Advisory — https://assets.legrand.com/webf/cybersecurity/LCA-2025-001.pdf
- CVD Policy | Legrand Cybersecurity France — https://www.legrand.com/cybersecurity/en/cvd-policy
- Cybersecurity | Legrand Cybersecurity — https://www.legrand.com/cybersecurity/en
- Security Advisories | Legrand Cybersecurity France — https://www.legrand.com/cybersecurity/en/security-advisories
- Legrand: 2024 Full-year Results — https://live.euronext.com/en/products/equities/company-news/2025-02-13-legrand-2024-full-year-results
- 2024 full-year results - Legrand — https://www.legrand.com/en/news/2024-full-year-results
- Legrand: 2024 Full-year Results | Nasdaq — https://www.nasdaq.com/press-release/legrand-2024-full-year-results-2025-02-13
- LEGRAND (LR) Stock Forecast, Price Targets and Analysts Predictions - TipRanks.com — https://www.tipranks.com/stocks/fr:lr/forecast
- Legrand SA: Target Price Consensus and Analysts Recommendations | LR | FR0010307819 | MarketScreener — https://www.marketscreener.com/quote/stock/LEGRAND-SA-37958161/consensus/
- Earnings call: Legrand reports robust 2023 results, targets growth in 2024 By Investing.com — https://www.investing.com/news/stock-market-news/earnings-call-legrand-reports-robust-2023-results-targets-growth-in-2024-93CH-3306660
- Marco Catuozzo - CTO ELIOT & VP R&D building system buisness unit at Legrand | The Org — https://theorg.com/org/legrand/org-chart/marco-catuozzo
- Legrand | The Org — https://theorg.com/org/legrand
- Our history - Legrand — https://www.legrand.com/en/group/our-history
- José Duarte Email & Phone | Group CIO at Legrand | AroundDeal — https://www.arounddeal.com/p/jose-duarte/d3umsotujd
- Jose Duarte Email & Phone Number | Group CIO at Legrand - ContactOut — https://contactout.com/jose-duarte-94859
- Track Busway Power Distribution from Starline — https://www.legrand.us/critical-power-and-infrastructure/track-busway
- Starline Power Solutions - C&C Technology Group — https://cc-techgroup.com/starline/
- Powering the Next Generation of Innovation: Legrand Unveils New Starline Series-S Track Busway — https://www.newswire.ca/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-865060661.html
- PRODUCT OFFERING BROCHURE — https://starlinepower.com/sites/default/files/2025-01/starline_product_brochureMAY22_US-WEB.pdf
- Powering the Next Generation of Innovation: Legrand Unveils New Starline Series-S Track Busway — https://www.prnewswire.com/news-releases/powering-the-next-generation-of-innovation-legrand-unveils-new-starline-series-s-track-busway-301896525.html
- UPS: Borri and Legrand Group join forces - Borri — https://www.borri.it/borri-legrand-join-forces/
- Products - Legrand — https://ups.legrand.com/en/products
- Borri - Single phase and three phase UPS (Uninterruptible Power Supply) — https://www.borri.it/
- DATA # CENTER # INSIGHTS — https://www.legrand.com/datacenter/sites/g/files/ocwmcr716/files/2023-12/ldcs_magazine_2023-1_en_1_3.pdf
- MEGALINE - Legrand — https://ups.legrand.com/en/products/megaline
- Ortronics Infinium™ HD Enhanced Fiber Enclosure | Legrand — https://www.legrand.us/solutions/fiber-optic/infinium-hd-enclosure-enhanced
- Equipment enclosures are versatile in many environments | Cabling Installation & Maintenance — https://www.cablinginstall.com/data-center/article/16465179/equipment-enclosures-are-versatile-in-many-environments
- Raritan PX4 Rack PDUs: New Firmware Update | Raritan, a brand of Legrand posted on the topic | LinkedIn — https://www.linkedin.com/posts/raritan_raritan-px4-firmwareupdate-activity-7300922952865206273-UNCM
- Raritan PX4 Frequently Asked Questions — https://www.raritan.com/ap/landing/raritan-px4-frequently-asked-questions
- PX4 — https://www.raritan.com/support/product/pdu-g4
- NLT / NLD OTA update process - Works with Legrand — https://developer.legrand.com/forums/topic/nlt-nld-ota-update-process/
- Smarther “… with Netatmo” - Works with Legrand — https://developer.legrand.com/solutions/smarther-with-netatmo/
- Smarther - Works with Legrand — https://developer.legrand.com/solutions/smarther/
- Smarther — https://assets.legrand.com/pim/NP-FT-GT/RA00175AB_U_EN.pdf
- Cyber Security Intern (Summer 2025) at Legrand | Prosple — https://prosple.com/graduate-employers/legrand/jobs-internships/cyber-security-intern-summer-2025
- Cyber Security Intern (Summer 2026) @ Legrand, North America | Jobright.ai — https://jobright.ai/jobs/info/69856985348f733a5c39ca1f
- Cybersecurity Intern (ASAP) at Legrand - Prosple — https://prosple.com/graduate-employers/legrand/jobs-internships/cybersecurity-intern
- ASHRAE Closes Out Successful Annual Conference in Indianapolis — https://www.ashrae.org/about/news/2024/ashrae-closes-out-successful-annual-conference-in-indianapolis
- NIS2 and Supply Chain: Bridging End Users and OEMs | Rockwell Automation | US — https://www.rockwellautomation.com/en-us/company/news/blogs/nis2-and-supply-chain.html
- NIS2 and OT Security: Compliance Guide for Industry | Opsio — https://opsiocloud.com/blogs/nis2-ot-security-compliance-guide/
- Supply Chain Security: what the NIS2 Directive requires — https://www.cybertrust365.com/en/supply-chain-security-nis2/
- NIS2 and Supply Chain Security: What Actual Compliance Looks Like — https://www.thingsrecon.com/blog/nis2-and-supply-chain-security-what-actual-compliance-looks-like
- Data Center Rack Power Distribution Unit (PDU) Market Size, Share, Trends — https://www.mordorintelligence.com/industry-reports/data-center-rack-pdu-market
- Racks & Cabinets — https://buy.wesco.com/browse/json/search/PANDUIT/Cabinets/_/N-1v0x8iaZ10lyhvi
- Data Center Rack Market Analysis, Size | Forecast, 2033 — https://www.imarcgroup.com/data-center-rack-market
- Data Center Rack Market Size Projected to Reach $6.6 — https://www.globenewswire.com/news-release/2023/01/09/2585330/0/en/Data-Center-Rack-Market-Size-Projected-to-Reach-6-6-Billion-by-2027-Growing-at-A-CAGR-Of-8-7-Report-by-MarketsandMarkets.html
- Top 20 Global Data Center Rack Companies Ranked in New 2025 Data Centre Rack Evaluation Report — https://finance.yahoo.com/news/top-20-global-data-center-084800748.html
- Legrand leaps to the second-largest owner of rack PDU market share - IHS Technology — https://technology.ihs.com/596098/legrand-leaps-to-the-second-largest-owner-of-rack-pdu-market-share
- Intelligent PDU Market Size, Share | Growth Analysis [2033] — https://www.skyquestt.com/report/intelligent-pdu-market
- Intelligent PDU Market Size, Share & 2030 Trends Report — https://www.mordorintelligence.com/industry-reports/intelligent-pdu-market
- Intelligent PDU Market Size, Share, Growth | CAGR Forecast 2033 — https://www.futuremarketreport.com/industry-report/intelligent-pdu-market/
- CRA Update: The EU Commission drafts New Guidelines for “Important” and “Critical” Products with Digital Elements – Certitude Blog — https://certitude.consulting/blog/en/cra-update-the-eu-commission-drafts-new-guidelines-for-important-and-critical-products-with-digital-elements/
- CRA Gets Teeth: Technical Definitions for Product Classes Now Official | Secure-by-Design Handbook — https://www.securebydesignhandbook.com/blog/2025/11/28/cra-implementing-regulation-published
- Part 2: Product Classification - The Hidden Complexity - Periphery — https://www.periphery.security/blog/part-2-product-classification---the-hidden-complexity
- Your Guide to the 2026 CRA Annex IV Critical Products List: 8 Key Areas — https://goregulus.com/cra-basics/cra-annex-iv-critical-products-list/
- Cyber Resilience Act: Technical Descriptions for Important and Critical Products Are Published - EU Digital Compliance Tracker (Snellman) — https://digitalcompliance.snellman.com/technical-descriptions-for-important-and-critical-products-are-published/
- Raritan Partners — https://www.raritan.com/partners
- Legrand Recognized as a 5-Star Program in the 2026 CRN® Partner Program Guide — https://www.legrand.us/about-us/newsroom/press/legrand-recognized-as-a-five-star-program-in-the-2026-crn-partner-program-guide
- Legrand Recognized in 2026 CRN Partner Program Guide – tEDmag — https://tedmag.com/legrand-recognized-in-2026-crn-partner-program-guide/
- LG Unveils Expanded Partner Program for U.S. Resellers — https://www.channelfutures.com/channel-business/lg-unveils-expanded-partner-program-for-u-s-resellers
- Legrand Revitalizes Data Center Sector with Two Revolutionary Intelligent Rack PDUs — https://www.raritan.com/about-us/newsroom/detail/legrand-revitalizes-data-center-sector-with-two-revolutionary-intelligent-rack-pdus
- The Cyber Resilience Act: an overview | Cyberstand — https://cyberstand.eu/cyber-resilience-act-overview
- Horizontal cybersecurity requirements for products with digital elements | EUR-Lex — https://eur-lex.europa.eu/EN/legal-content/summary/horizontal-cybersecurity-requirements-for-products-with-digital-elements.html
- Decoding the Cyber Resilience Act – Part 1: Scope and Impact | Freshfields — https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/decoding-the-cyber-resilience-act-part-1-scope-and-impact-102m2cz
- Cyber Resilience Act (EU) 2024/2847 | Cyber Laws | Cyber Laws — https://cyber-laws.com/en/regulations/cra/
- The EU’s Cyber Resilience Act: New Cybersecurity Requirements for Connected Products and Software — https://www.pillsburylaw.com/en/news-and-insights/eu-cyber-resilience-act-requirements-products-software.html
- Acquisitions - Legrand — https://www.legrand.com/en/group/strategy/targeted-acquisitions
- Legrand Customer Case Study - Kyrio — https://kyrio.com/project/legrand-customer-case-study/
- Eliot – everything you need to know about legrand’s connected objects program — https://www.legrand.co.in/smart-spaces/eliot-%E2%80%93-everything-you-need-to-know-about-legrands-connected-objects-program
- Building a Sustainable IoT with Zigbee and Green Power Legrand’s Success Story - CSA-IOT — https://csa-iot.org/newsroom/building-a-sustainable-iot-with-zigbee-and-green-power-legrands-success-story/
- Legrand Supplier and Partner Relationship — https://www.legrand.us/about-us/suppliers-and-partners
- AOL | Case Studies | Resources — https://www.raritan.com/ap/resources/case-studies/detail/aol
- Case Studies | Resources — https://www.raritan.com/resources/case-studies
- CASE STUDY — https://www.raritan.com/assets/ram/case_studies/downloads/experian-raritan-case-study.pdf
- ESI Group deploys HPC Center in Paris with Minkels & Legrand — https://www.minkels.com/cases/esi-group-deploys-hpc-center-in-paris-with-minkels-and-legrand
- Minkels Releases White Paper on European Data Center Standard, EN 50600 - HostingJournalist.com — https://hostingjournalist.com/news/minkels-releases-white-paper-on-european-data-center-standard-en-50600
- Nuvo International Distributors | Legrand — https://www.legrand.us/nuvo/international-distributors
- MUK | Legrand  | AUTHORIZED DISTRIBUTOR — https://muk.group/en/vendor/legrand/
- Legrand-Pass & Seymour Distributor | Standard Electric Supply Co. — https://www.standardelectricsupply.com/Brands/Legrand-Pass-And-Seymour-Distributor
- Legrand Authorized Supplier & Distributor — https://bankoflamps.com/legrand
- Legrand AV Distributor | Anixter — https://www.anixter.com/en_us/manufacturers/l/legrandav.html
- Legrand AV | Contact Us - Asia Pacific — https://www.legrandav.com/contact_us/contact_apac
- Legrand and Azure OpenAI Service: Powering smarter solutions with AI-driven tools | Microsoft Customer Stories — https://www.microsoft.com/en/customers/story/19697-legrand-azure-cloud-services
- Legrand Partners with Microsoft to Create New Hybrid Conferencing Space — https://www.prnewswire.com/news-releases/legrand-partners-with-microsoft-to-create-new-hybrid-conferencing-space-301938112.html
- Legrand Partners with Microsoft to Create New Hybrid Conferencing Space — https://www.legrand.us/about-us/newsroom/press/new-hybrid-conferencing-space
- Reinventing the edge: Siemens, Cadolto and Legrand introduce new modular data center | Press | Company | Siemens — https://press.siemens.com/global/en/pressrelease/reinventing-edge-siemens-cadolto-and-legrand-introduce-new-modular-data-center
- Commitment to Cisco’s Building Solutions with New Product Development | Legrand — https://www.legrand.us/about-us/newsroom/press/cisco-building-solutions
- Starline Track Busway | Legrand Data Center Solutions — https://www.legrand.com/datacenter/en/grey-space/busbar-busway/starline-track-busway
- Data Center Case Studies — https://www.legrand.us/markets/data-center/case-studies
- Busbar Market - Current Trends, Investments and Untapped — https://www.globenewswire.com/news-release/2023/08/24/2730877/0/en/Busbar-Market-Current-Trends-Investments-and-Untapped-Profit-Sources-Segments-Detailed-Analysis-Exclusive-InsightAce-Report.html
- Data Center Busway Market Valuation Expected to Hit USD 6.8 — https://www.openpr.com/news/4216656/data-center-busway-market-valuation-expected-to-hit-usd-6-8
- What is Competitive Landscape of Legrand Electric Ltd. Company? – MatrixBCG.com — https://matrixbcg.com/blogs/competitors/legrand
- News - Top 10 PDU Companies Leading the Market This Year, — https://www.newsunnpdu.com/news/top-10-pdu-companies-leading-the-market-this-year/
- UPS - Worldwide Market Analysis & Forecast (2018-2022): ABB, Eaton, Legrand, Schneider Electric, Toshiba, and Vertiv are Leading the Competition - ResearchAndMarkets.com | Business Wire — https://www.businesswire.com/news/home/20181009005692/en/UPS---Worldwide-Market-Analysis-Forecast-2018-2022-ABB-Eaton-Legrand-Schneider-Electric-Toshiba-and-Vertiv-are-Leading-the-Competition---ResearchAndMarkets.com
- Data Center UPS Market Size, Share & Forecast Report, 2034 — https://www.gminsights.com/industry-analysis/data-center-UPS-market
- NIS2 and EU Cyber Resilience Act | Understand Their Relationship — https://hyperproof.io/understanding-the-relationship-between-nis2-and-the-eu-cyber-resilience-act/
- Differences Between CRA (Cyber Resilience Act) and IEC 62443 — https://oringnet.com/en/knowledge-base/differences-between-cra-cyber-resilience-act-and-iec-62443
- Webinar 'CRA Standards Unlocked: From EN IEC 62443 to CRA: OT Cybersecurity for Important products Class I & II' - CEN-CENELEC — https://www.cencenelec.eu/news-events/events/2025/2025-09-09-en-iec-62443-to-cra/
- IEC 62443 Standard GAP Analysis to the Cyber Resilience Act (CRA) — https://honeytreelabs.com/posts/iec62443_vs_cra/
- CRA Standards Unlocked: From EN IEC 62443 to CRA: OT Cybersecurity for Important products Class I & II | Cyberstand — https://cyberstand.eu/events/cra-standards-unlocked-en-iec-62443-cra-ot-cybersecurity-important-products-class-i-ii
- Cyber Resilience Act, RED, and IEC 62443 — https://machinerysafety101.com/2026/02/09/cyber-resilience-act-red-iec-62443/
- BSI  -  Technical Guideline TR-03183 — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/TR-03183_node.html
- EU Cyber Resilience Act (CRA) SBOM Requirements | Sbomify — https://sbomify.com/compliance/eu-cra/
- BSI  -  Technical Guideline TR-03183 - BSI TR-03183: Cyber Resilience Requirements for Manufacturers and Products — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03183/tr-03183.html
- Cyber-Resilience Act (CRA) | Secure-by-Design Handbook — https://www.securebydesignhandbook.com/docs/standards/eu/cra-overview
- Technical Guideline TR-03183: Cyber Resilience Requirements for Manufacturers and Products — https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-1_v0_10_0.pdf?__blob=publicationFile&v=1
- Resources — https://www.legrand.us/resources/white%20papers
- Whitepaper: IoT Security | Wattstopper | Legrand — https://www.legrand.us/wattstopper/strategies-for-iot-security
- Whitepapers & Reports Legrand - DCD — https://www.datacenterdynamics.com/en/whitepapers/?company=legrand
- Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications — https://www.prnewswire.com/news-releases/legrand-certifications-and-process-controls-provide-confidence-in-information-security-for-network-connected-devices-in-data-related-applications-302123948.html
- Legrand Supplier and Partner Relationship — https://www.legrand.us/about-us/suppliers-and-partners/our-policy
- Responsible purchasing: ensuring sustainable development ... - Legrand — https://www.legrand.com/en/supplier
- Legrand and Schneider Electric demonstrate world’s first NR+ interoperability demo for smart buildings – DECT Forum — https://www.dect.org/news/legrand-and-schneider-electric-demonstrate-worlds-first-nr-interoperability-demo-for-smart-buildings/
- Legrand, Schneider Electric & Siemens launch NR+ interest group — https://wirepas.com/news/nr-interest-group/
- ISC2 Announces Keynote Speakers for Security Congress 2024 in Las Vegas — https://www.isc2.org/Insights/2024/07/ISC2-Announces-Keynote-Speakers-for-Security-Congress-2024-in-Las-Vegas
- ISC2 Security Congress 2024 Prepares Cyber Pros to Move Boldly Forward to Prepare for Emerging Threats — https://www.isc2.org/Insights/2024/08/ISC2-Security-Congress-2024-Prepares-Cyber-Pros-to-Move-Boldly-Forward
- ISC2 Security Congress 2025 Accepting Call for Presentations — https://www.isc2.org/Insights/2025/02/ISC2-Security-Congress-2025-Accepting-Call-for-Presentations
- Legrand expands its OCP-ready data centre solutions | Data Centre Solutions — https://datacentre.solutions/news/72143/legrand-expands-its-ocp-ready-data-centre-solutions
- Legrand Certifications and Process Controls Provide Confidence in Information Security for Network-Connected Devices in Data-Related Applications — https://ycharts.com/news/story/PRN-CL94327-20240423
- Legrand White Paper - Data Centre UPS - DATACENTRE.ME — https://datacentre.me/white-papers/legrand-white-paper-data-centre-ups/
- White Paper: Powering the Future &mdash; Revolutionizing Data Center Design — https://www.raritan.com/landing/white-paper-powering-the-future-revolutionizing-data-center-design/thanks
- Powering the Future: Revolutionizing Data Center Design | Server Technology — https://www.servertech.com/resources/white-paper/powering-the-future-revolutionizing-data-center-design-thanks/
- Powering the Future: # AI’s Impact on Data Center Design — https://www.legrand.com/datacenter/sites/g/files/ocwmcr1671/files/2025-10/Localized_AI_DataCenter_Whitepaper_R2_V2029.pdf
- Minkels Launches Varicontrol 1.0: Data Centre Monitoring & Management With All KPIs |
                                    Newswire — https://www.newswire.com/news/minkels-launches-varicontrol-1-0-data-centre-monitoring-management-with-59016
- PDU_LDC_ReleaseNotes_4.0.35-50602 — https://assets.legrand.com/pim/AUTRE/PDU_LDC_040035-50602_ReleaseNotes.pdf
- Environmental Data Center Management # and Monitoring — https://cdn10.servertech.com/assets/documents/documents/1033/original/PAC_RAM_Environmental-Data-Center-Management-and-Monitoring_WhitePaper_v3.pdf
- 2025 full-year results - Legrand — https://www.legrand.com/en/news/2025-full-year-results
- Nodegrid Serial Console – Core Edition - ZPE Systems — https://zpesystems.com/products/data-center-solutions/serial-consoles/nodegrid-serial-console-core-edition/
- ZPE Systems Announces Nodegrid Serial Console Plus, a High-density, Cellular-enabled Serial Console for Datacenters and Critical Remote Locations - ZPE Systems — https://zpesystems.com/zpe-systems-announces-the-nodegrid-serial-console-plus/
- S-CONNECT - ZPE Systems Nodegrid Serial Console Plus - Core ... — https://www.s-connect.dk/zeige_produkt.php?produkt_id=8420
- Legrand Makes 451 Research's List of Largest Data Center Technology Suppliers — https://www.prnewswire.com/news-releases/legrand-makes-451-researchs-list-of-largest-data-center-technology-suppliers-300641126.html
- White Paper: Redesigning the Data Center for AI Workloads — https://www.raritan.com/landing/redesigning-data-center-for-ai-workloads-white-paper/thanks
- VariControl-S | Manualzz — https://manualzz.com/doc/29981592/varicontrol-s
- Greater Choice, Scalability, Speed: Why Legrand is Doubling Down on Open Compute Project Innovations — https://www.raritan.com/about-us/newsroom/detail/greater-choice-scalability-speed-why-legrand-is-doubling-down-on-open-compute-project-innovations
