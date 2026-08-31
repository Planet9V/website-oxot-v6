# Hyperscaler DC — DETAILED DESIGN PLAN (for sign-off)

> Full-fidelity rebuild of the OXOT Example Facility from HLD.md + DLD.md + DLD-support.md.
> Replaces the rejected v1 surface cut (11 systems / 52 assets). **NOT YET BUILT — awaiting Jim's approval.**

## Scope delivered by this plan
- **31 systems** (was 11) · **163 assets** (was 52)
- Every make/model in the docs is a DISTINCT asset (all UPS/chiller/spine/firewall variants kept).
- P&ID instrumentation included (valves, transmitters, pumps, VFDs, leak cable, BPHE, manifolds, cold plates, QDs).
- Internet/WAN/DMZ + OT/IT conduit boundary present.
- 51 firmware-bearing assets → real CVE matches at adopt (the 7 named CVEs are the docs' explicit ones).

## Attribute coverage (honest — nulls only where no doc supplies a value)
| Attribute | Populated / 163 | Note |
|---|---|---|
| criticality | 163 |  |
| fmeca_category | 163 |  |
| purdue_level | 163 |  |
| iec62443_zone | 156 |  |
| protocols | 150 |  |
| mor | 141 |  |
| sl_target | 141 | 22 nulls = passive perimeter/instrumentation |
| redundancy_topology | 138 |  |
| hazard_log | 122 |  |
| downtime_cost_per_hour_usd | 98 | DLD-support gives $ for core cyber-physical systems |
| mtbf_hours | 90 | DLD gives MTBF for active mechanical/electrical |
| sil_rating | 46 | only safety/fire/power items are SIL-rated (correct) |
| cve_refs | 7 | docs name 7; the 51 firmware assets get matched CVEs at adopt |

## Systems & equipment (the detailed design)

### MV Grid Substation & Protection  ·  7 assets  ·  Purdue 2 · Catastrophic
_Utility power intake at 11 kV–138 kV, stepped down to MV for site distribution. Includes gas-insulated and air-insulated MV switchgear, protection relays, and associated SCADA interfaces. Loss of both utility feeds causes total site power loss._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| MV-SWG-HITACHI-01 | Hitachi Energy ZX2 Series | QNX Neutrino RTOS | 4 | SIL 3 | Category I — Catastrophic |
| MV-SWG-ABB-PASS-01 | ABB PASS M0 | — | 2 | SIL 1 | Category I — Catastrophic |
| MV-SWG-SE-SM6-01 | Schneider Electric SM6 / RM6 | — | 2 | SIL 1 | Category I — Catastrophic |
| MV-SWG-ABB-UNIGEAR-01 | ABB UniGear ZS1 | — | 2 | SIL 1 | Category I — Catastrophic |
| PRO-RLY-SEL-01 | Schweitzer Engineering Laboratories (SEL) SEL-751A | Proprietary Bare-Metal | 4 | SIL 3 | Category I — Catastrophic |
| PRO-RLY-SE-P3-01 | Schneider Electric Easergy P3 | — | 3 | SIL 1 to SIL 2 | Category I — Catastrophic |
| PRO-RLY-ABB-REF615-01 | ABB REF615 | — | 3 | SIL 1 to SIL 2 | Category I — Catastrophic |

### Power Transformers  ·  3 assets  ·  Purdue 1 · Catastrophic
_Dry-type cast-resin and cast-resin transformers stepping MV (11 kV) to LV (415 V) for data hall pods. Typically 2.5–3 MVA, one per pod pair, N+1 arrangement._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| XFMR-ABB-RESIBLOC-01 | ABB RESIBLOC 2.5–3 MVA 11 kV / 415 V | — | 2 | SIL 1 (associated protection — thermal imaging, protection relay) | Category I — Catastrophic |
| XFMR-SE-TRIHAL-01 | Schneider Electric Trihal 2.5–3 MVA 11 kV / 415 V | — | 2 | SIL 1 (associated protection) | Category I — Catastrophic |
| XFMR-ABB-TRIDRY-01 | ABB TriDry series | Bare-Metal Firmware | 2 | — | Category I — Catastrophic |

### UPS Chain  ·  6 assets  ·  Purdue 2 · Catastrophic
_Double-conversion online UPS systems providing clean power conditioning and battery ride-through (5–15 minutes). Bridges generator start time. Includes NMC cards for SNMP/Modbus integration to DCIM._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| UPS-VERTIV-EXL-01 | Vertiv Liebert EXL S1 (250–1000 kW) | — | 3 | SIL 1 (output protection relay, bypass switch logic) | Category I — Catastrophic (all modules fail) / Category II — Critical (single module in N+1) |
| UPS-EATON-9395XR-01 | Eaton 9395XR (1500–2500 kVA) | — | 3 | SIL 1 (bypass switch logic) | Category I — Catastrophic (all fail) / Category II — Critical (single in N+1) |
| UPS-SE-GALAXY-VXL-01 | Schneider Electric Galaxy VXL (100–1250 kW, Li-ion) | — | 3 | SIL 1 (bypass, Li-ion BMS requires functional safety plan) | Category I — Catastrophic (all fail) / Category II — Critical (single in N+1) |
| UPS-ABB-MEGAFLEX-01 | ABB MegaFlex UL 415V | — | 3 | SIL 1 (bypass switch logic) | Category I — Catastrophic (all fail) / Category II — Critical (single in N+1) |
| UPS-SE-GALAXY-VX-01 | Schneider Electric Galaxy VX 1250 kW | VxWorks RTOS | 3 | SIL 2 | Category I — Catastrophic |
| UPS-NMC-SE-01 | Schneider Electric AP9641 (NMC3) | Embedded Linux (Kernel 5.10) | 3 | — | Category I — Catastrophic |

### Transfer Switches — ATS  ·  3 assets  ·  Purdue 2 · Catastrophic
_Automatic Transfer Switches transferring load between utility and generator (mechanical ATS). One per distribution circuit. Misoperation during transfer causes momentary or sustained power loss._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| ATS-EATON-MAGNUM-01 | Eaton MAGNUM DS ATS | — | 3 | SIL 1 | Category I — Catastrophic |
| ATS-SE-ATYS-01 | Schneider Electric ATyS series | — | 3 | SIL 1 | Category I — Catastrophic |
| ATS-ASCO-7000-01 | ASCO (Schneider Electric) 7000 Series | FreeRTOS | 3 | SIL 2 | Category I — Catastrophic |

### Transfer Switches — STS  ·  1 assets  ·  Purdue 2 · Catastrophic
_Static Transfer Switches (solid-state, <4 ms transfer) switching between two UPS feeds for critical IT loads. Sub-cycle transfer protects against brief power interruptions between redundant UPS paths._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| STS-VERTIV-STS2-01 | Vertiv Liebert STS2 | — | 3 | SIL 1 | Category I — Catastrophic |

### Diesel & Gas Backup Generators  ·  5 assets  ·  Purdue 2 · Catastrophic
_Emergency power generation. Large-frame diesel generators (1500–3500 kW each), N+1 minimum, 2N for Tier IV. Includes paralleling controls and governor ECUs. Last line of power protection when utility and UPS exhaust._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| GEN-CAT-3516C-01 | Caterpillar Cat 3516C-HD (2000–3500 kW) | Proprietary (EMCP 4.2) | 2 | — | Category I — Catastrophic (all fail) / Category II — Critical (single unit, N+1 maintained) |
| GEN-CUMMINS-QSK60G-01 | Cummins QSK60G (1750–2500 kW) | — | 2 | SIL 1 | Category I — Catastrophic (all fail) / Category II — Critical (single, N+1 maintained) |
| GEN-CUMMINS-QSK95-01 | Cummins QSK95 (up to 3500 kW) | — | 2 | SIL 1 | Category I — Catastrophic (all fail) / Category II — Critical (single, N+1 maintained) |
| GEN-KOHLER-KD-01 | Kohler KD Series (600–4000 kW) | — | 2 | SIL 1 | Category I — Catastrophic (all fail) / Category II — Critical (single, N+1 maintained) |
| GEN-CTL-WOODWARD-01 | Woodward easYgen-3500XT | VxWorks RTOS | 3 | — | Category I — Catastrophic |

### LV Distribution & EPMS  ·  5 assets  ·  Purdue 2 · Critical
_Low-voltage switchgear (415 V / 480 V) distributing power from transformers to UPS and data hall loads. Includes electrical power monitoring servers (EPMS) and metering for power quality telemetry._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| LV-SWG-EATON-01 | Eaton Pow-R-Line | Bare-Metal Firmware | 2 | — | Category II — Critical |
| EPMS-SE-ION9000-01 | Schneider Electric PowerLogic ION9000 | Embedded Linux | 3 | — | Category II — Critical |
| EPMS-SE-PME-01 | Schneider Electric PowerLogic PME | — | 3 | — | Category II — Critical |
| DCIM-VERTIV-ENV-01 | Vertiv Environet Enterprise | — | — | — | Category II — Critical |
| BMS-HONEYWELL-01 | Honeywell Niagara Framework / EBI (Enterprise Buildings Integrator) | Windows Server / Linux | 3 | — | Category I — Catastrophic |

### Battery Energy Storage (BESS)  ·  3 assets  ·  Purdue 2 · Catastrophic
_Grid-forming or grid-following BESS providing extended backup (1–4+ hours), demand response, and power quality stabilization. Li-ion at medium voltage alongside UPS at LV. BMS controls thermal runaway protection._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| BESS-VERTIV-01 | Vertiv Vertiv BESS (Li-ion, utility and C&I scale) | — | 3 | SIL 1 to SIL 2 | Category I — Catastrophic |
| BESS-FLEXGEN-01 | FlexGen HybridOS-managed BESS | — | 3 | SIL 1 to SIL 2 | Category I — Catastrophic (fire) / Category II — Critical (BMS malfunction) |
| BESS-TESLA-MEGAPACK-01 | Tesla Megapack (3.9 MWh per unit) | Hardened Linux Kernel | 3 | SIL 2 | Category I — Catastrophic |

### DC & HVDC Power Distribution  ·  3 assets  ·  Purdue 1 · Critical
_High-voltage DC distribution (380–400 V DC) for modern AI server power supplies and 48 V DC bus for open-compute racks. Includes busbar systems, HVDC power shelves, and DC PDUs. Used in high-efficiency AI pod designs._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| DC-VERTIV-BUSBAR-01 | Vertiv Geist DC busbar systems | — | — | — | Category II — Critical |
| DC-DELTA-HVDC-01 | Delta Electronics HVDC power shelf | — | — | — | Category II — Critical |
| DC-SE-PDU-01 | Schneider Electric DC PDU | — | — | — | Category II — Critical |

### Rack PDUs  ·  4 assets  ·  Purdue 1 · Critical
_Rack-level and row-level intelligent PDUs distributing power from UPS to individual server outlets. Includes metered, switched, and 0U form factors. SNMP-managed with per-outlet monitoring._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| PDU-VERTIV-GEIST-01 | Vertiv Geist rPDU (metered) | — | — | — | Category II — Critical |
| PDU-SE-APC-AP8941-01 | Schneider Electric APC AP8941 (Metered, 0U) | — | — | — | Category II — Critical |
| PDU-RARITAN-PX3-01 | Raritan PX3 iPDU (per-outlet switching, SNMP) | — | — | — | Category II — Critical |
| PDU-RARITAN-PX4-01 | Raritan (Legrand) PX4 Switched Series | — | 3 | — | Category II — Critical |

### Chiller Plant  ·  11 assets  ·  Purdue 2 · catastrophic
_Centrifugal and magnetic-bearing chillers producing chilled water (7-14°C supply) for CRAH units, CDUs, and rear-door heat exchangers. N+1 or 2N arrangement. Loss of all chilling causes IT thermal shutdown within 5-30 minutes._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| CHL-CARR-01 | Carrier AquaForce 30XW | — | 2 | SIL 1 | Category I — Catastrophic |
| CHL-TRANE-01 | Trane CenTraVac CVHF | — | 2 | SIL 1 | Category I — Catastrophic |
| CHL-JCI-YZ-01 | Johnson Controls YORK YZ Centrifugal Chiller | Proprietary RTOS | 2 | SIL 1 | Category I — Catastrophic |
| CHL-CTL-OPTV-01 | Johnson Controls OptiView Controller | Proprietary RTOS | 2 | SIL 1 | Category I — Catastrophic |
| FCV-FWS-BELIMO-01 | Belimo EV Series | — | 2 | — | Category II — Critical |
| TT-FWS-EMR-3144-01 | Emerson (Rosemount) 3144P | — | 2 | — | Category II — Critical |
| FT-FWS-VORTEX-01 | None Vortex Flow Transmitter | — | 2 | — | Category II — Critical |
| CHW-PMP-GRUNDFOS-01 | Grundfos Hydro MPC | — | 2 | — | Category II — Critical |
| CHW-VFD-ABB-01 | ABB ACQ580 | CODESYS on Linux | 2 | — | Category II — Critical |
| MFD-FWS-SUPPLY-01 | None CHW Supply Manifold | — | — | — | Category I — Catastrophic |
| MFD-FWS-RETURN-01 | None CHW Return Manifold | — | — | — | Category I — Catastrophic |

### Heat Rejection  ·  5 assets  ·  Purdue 2 · catastrophic
_Cooling towers and adiabatic dry coolers rejecting condenser heat to atmosphere. Paired with chiller plant. Loss of condensing capacity causes chiller high-pressure trip and cascading IT thermal load shedding. N+1 cell arrangement._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| CTW-BAC-01 | Baltimore Aircoil Series 3000 | Bare-Metal Firmware | 2 | — | Category I — Catastrophic (all cells); Category III — Marginal (single fan/cell in N+1) |
| CTW-EVAPCO-01 | Evapco AT Series | — | 2 | — | Category I — Catastrophic (all cells); Category III — Marginal (single fan/cell in N+1) |
| CTW-ENEXIO-01 | ENEXIO Adiabatic Dry Cooler | — | 2 | — | Category I — Catastrophic (all cells fail); Category III — Marginal (single cell in N+1) |
| CTW-VFD-ABB-01 | ABB ACQ580 | CODESYS on Linux | 2 | — | Category II — Critical |
| WTS-PLC-SIEM-S71200-01 | Siemens SIMATIC S7-1200 | Siemens SIMATIC firmware | 2 | — | Category II — Critical |

### CRAH / Room Air Handlers  ·  3 assets  ·  Purdue 2 · critical
_Room-level chilled water air handlers supplying cold air to data hall hot/cold aisles. N+1 per data hall row. Supply air ≤18°C to maintain ASHRAE A1 server inlet ≤27°C. Loss causes row temperature rise and IT throttling._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| CRAH-VTR-CW-01 | Vertiv Liebert CW | — | 2 | — | Category II — Critical |
| CRAH-SE-ACRD-01 | Schneider Electric ACRD | — | 2 | — | Category II — Critical |
| CRAH-STULZ-CA3-01 | Stulz CyberAir 3PRO | — | 2 | — | Category II — Critical |

### In-Row Cooling  ·  3 assets  ·  Purdue 2 · marginal
_Row-based supplemental precision cooling units delivering cooling directly adjacent to high-density racks. Reduces heat-source-to-cooler distance. Category III (Marginal) in hybrid designs alongside CRAH._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| IRC-VTR-CRV-01 | Vertiv Liebert CRV | — | 2 | — | Category III — Marginal (alongside CRAH); Category II if primary cooling path |
| IRC-SE-ACRC-01 | Schneider Electric APC ACRC | — | 2 | — | Category III — Marginal (alongside CRAH); Category II if primary cooling path |
| IRC-RITTAL-LCP-01 | Rittal LCP (Liquid Cooling Package) | — | 2 | — | Category III — Marginal (alongside CRAH); Category II if primary cooling path |

### CDU / Liquid Cooling (TCS)  ·  17 assets  ·  Purdue 2 · catastrophic
_Liquid-to-liquid coolant distribution units with integral pumps. Primary FWS loop enters BPHE; isolated secondary TCS loop (DI water + PG25 glycol, 32°C supply, 40°C return) serves GPU/CPU cold plates via rack manifolds. CDU failure causes GPU emergency shutdown within 45-120 s._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| CDU-VTR-ECONO-01 | Vertiv CoolChip Econophase CDU | — | 3 | — | Category I — Catastrophic |
| CDU-MOTV-CD-01 | Motivair CoolDoor CDU | — | 3 | — | Category I — Catastrophic |
| CDU-COOLIT-CHX2K-01 | CoolIT Systems CHx2000 Platform | Hardened Linux | 3 | SIL 2 | Category I — Catastrophic |
| CDU-COOLIT-RACKC-01 | CoolIT Systems Rack CDU | Hardened Linux | 3 | — | Category I — Catastrophic |
| CDU-SE-ECOBRZ-01 | Schneider Electric EcoBreeze CDU | — | 3 | — | Category I — Catastrophic |
| CDU-PLC-EMR-RX3I-01 | Emerson RX3i PACSystems PLC | VxWorks RTOS | 3 | SIL 2 | Category I — Catastrophic |
| TCS-PMP-XYLEM-01 | Xylem (Bell & Gossett) e-1510 Series | — | 2 | — | Category I — Catastrophic |
| TCS-VFD-DANFOSS-01 | Danfoss VLT Flow Drive | — | 3 | — | Category I — Catastrophic |
| DPT-TCS-YOKO-01 | Yokogawa EJX110A | — | 2 | — | Category II — Critical |
| LEK-DET-TT1000-01 | TraceTek TT1000 Series | — | 2 | — | Category II — Critical |
| LEK-CTL-RLE-01 | RLE Technologies SeaHawk LD1500 | — | 2 | — | Category II — Critical |
| BPHE-CDU-01 | None Brazed Plate Heat Exchanger (BPHE) | — | — | — | Category II — Critical |
| MFD-TCS-SUPPLY-01 | None TCS Vertical Supply Manifold | — | — | — | Category I — Catastrophic |
| MFD-TCS-RETURN-01 | None TCS Vertical Return Manifold | — | — | — | Category I — Catastrophic |
| GPU-CLDPLT-COOLIT-01 | CoolIT Systems Split-Flow D2C Cold Plate | — | — | — | Category II — Critical |
| CPU-CLDPLT-COOLIT-01 | CoolIT Systems Split-Flow D2C Cold Plate | — | — | — | Category II — Critical |
| QD-CPC-OCP-01 | CPC (Colder Products Company) OCP UQD v2.0 | — | — | — | Category II — Critical |

### Rear-Door Heat Exchangers (RDHx)  ·  3 assets  ·  Purdue 2 · marginal
_Passive or active heat exchangers mounted on rack rear doors, intercepting server exhaust and transferring heat to facility chilled water. Enables room-neutral thermal design for high-density racks. Category III in hybrid designs._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| RDHX-MOTV-CD-01 | Motivair ChilledDoor | — | — | — | Category III — Marginal (hybrid design); Category II (exclusively RDHx-cooled row) |
| RDHX-SE-ACDC-01 | Schneider Electric ACDC | — | 2 | — | Category III — Marginal (hybrid); Category II (exclusively RDHx-cooled row) |
| RDHX-VTR-01 | Vertiv RDHx | — | 2 | — | Category III — Marginal (hybrid design); Category II (exclusively RDHx-cooled row) |

### IT Compute  ·  10 assets  ·  Purdue 0 · Critical
_CPU and GPU compute servers, OCP rack nodes, BMCs, rack enclosures, and 48V DC power shelves supporting hyperscaler workloads. Includes AI/ML GPU clusters (DGX H100/B200) and general-purpose x86 server fleets._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| COMP-CPU-DELL-01 | Dell Technologies PowerEdge R760 | iDRAC9 | 2 | — | Category II |
| COMP-CPU-HPE-01 | Hewlett Packard Enterprise ProLiant DL380 Gen11 | iLO 6 | 2 | — | Category II |
| COMP-GPU-DGX-H100 | NVIDIA DGX H100 | BMC/iDRAC variant | 2 | — | Category I |
| COMP-GPU-DGX-B200 | NVIDIA DGX B200 | BMC/iDRAC variant | 2 | — | Category I |
| COMP-BMC-AST2600 | ASPEED Technology AST2600 | ASPEED SDK (OpenBMC-based) | 3 | — | Category II |
| COMP-OCP-ORV3 | Supermicro OCP ORv3 Server Node | OpenBMC / ASPEED AST2600 | 2 | — | Category II |
| RACK-VERTIV-VR42U | Vertiv VR Rack 42U (600x1200mm) | — | — | — | Category II |
| RACK-SCHNEIDER-SX48U | Schneider Electric NetShelter SX 48U | — | — | — | Category II |
| RACK-RITTAL-TS8 | Rittal TS 8 42U | — | — | — | Category II |
| PWR-SHELF-DELTA-48V | Delta Electronics Delta 48V Power Shelf (HVDC) | — | 2 | — | Category II |

### IT Storage & HSM  ·  4 assets  ·  Purdue 0 · Critical
_All-flash NVMe storage arrays and hardware security modules providing persistent storage and cryptographic key management for compute workloads and PKI infrastructure._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| STOR-PURE-XL-01 | Pure Storage FlashArray//XL | — | 2 | — | Category II |
| STOR-NETAPP-AFF-01 | NetApp AFF A-series (all-NVMe) | — | 2 | — | Category II |
| STOR-IBM-FS9500 | IBM FlashSystem 9500 | — | 2 | — | Category II |
| STOR-HSM-THALES | Thales Luna Network HSM | — | 4 | — | Category II |

### Spine-Leaf-ToR Network Fabric  ·  7 assets  ·  Purdue 3 · Catastrophic
_Three-tier spine-leaf-top-of-rack switching fabric supporting east-west AI training traffic, EVPN/VXLAN overlay, and 25/100/400G server connectivity._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| NET-SPINE-ARISTA-7800R4 | Arista Networks 7800R4 | EOS (Arista Extensible Operating System) | 2 | — | Category I |
| NET-SPINE-CISCO-NEXUS9K | Cisco Nexus 9000 N9K-X9624D-R2 | NX-OS | 2 | — | Category I |
| NET-SPINE-JUNIPER-QFX10008 | Juniper Networks QFX10008 | Junos OS | 2 | — | Category I |
| NET-LEAF-ARISTA-7050X4 | Arista Networks 7050X4 (48x25GbE + 8x100GbE) | EOS | 2 | — | Category II |
| NET-LEAF-CISCO-93180YC | Cisco Nexus 93180YC-FX3 (48x25G + 6x100G) | NX-OS | 2 | — | Category II |
| NET-TOR-ARISTA-7060X5 | Arista Networks 7060X5 (64x100G) | EOS | 2 | — | Category II |
| NET-TOR-CISCO-9336CFX2 | Cisco Nexus 9336C-FX2 | NX-OS | 2 | — | Category II |

### Border & Perimeter Security  ·  5 assets  ·  Purdue 3 · Catastrophic
_Next-generation firewalls, internet/WAN ingress points, and DMZ network segments providing north-south traffic inspection, network segmentation, and perimeter defense._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| FW-PALOALTO-PA7000 | Palo Alto Networks PA-7000 Series (1.44 Tbps) | PAN-OS | 3 | — | Category I |
| FW-CISCO-FP4140 | Cisco Firepower 4140 / FTD | Firepower Threat Defense (FTD) | 3 | — | Category I |
| FW-FORTINET-FG7060F | Fortinet FortiGate 7060F | FortiOS | 3 | — | Category I |
| NET-WAN-INTERNET-INGRESS | None Internet WAN Ingress (ISP Border) | — | 3 | — | Category I |
| NET-DMZ-ZONE | None DMZ Network Segment (Between Perimeter and Internal FW) | — | 3 | — | Category I |

### OT Network Core  ·  4 assets  ·  Purdue 2 · Critical
_Industrial Ethernet switches, OT firewalls, protocol gateways, and unidirectional security gateways interconnecting BMS field devices with supervisory systems. Provides IT/OT boundary enforcement._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| OTSW-MOXA-TN4900 | Moxa TN-4900 Series | Moxa Industrial OS | 3 | — | Category II |
| OTFW-MOXA-EDR9010 | Moxa EDR-G9010 Series | Moxa Industrial OS | 3 | — | Category I |
| OTGW-LOYTEC-LGATE | Loytec L-GATE Series | Loytec L-GATE Firmware | 2 | — | Category II |
| OTDIO-UNIDIRECTIONAL-GW | None Unidirectional Gateway / Data Diode | — | 3 | — | Category II |

### Out-of-Band Management  ·  5 assets  ·  Purdue 3 · Critical
_Serial console servers, KVM-over-IP switches, and OOB gateways on an isolated management network providing out-of-band access to all compute, network, and power infrastructure independent of the production network._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| OOB-AVOCENT-ACS8000 | Vertiv Avocent ACS 8000 (48-port) | Avocent ACS Firmware | 2 | — | Category II |
| OOB-ZPE-NODEGRID | ZPE Systems Nodegrid (multi-port, SD-WAN/cellular) | Nodegrid OS | 2 | — | Category II |
| OOB-RARITAN-KX4-101 | Raritan Dominion KX IV-101 (4K, NIAP PP 4.0 CC-certified) | Raritan Dominion Firmware | 2 | — | Category II |
| OOB-VERTIV-MPU8032 | Vertiv Avocent MPU8032 (32-port KVM) | Avocent MPU Firmware | 2 | — | Category II |
| OOB-LANTRONIX-SLC8000 | Lantronix SLC 8000 (Advanced Console Manager) | Lantronix SLC Firmware | 2 | — | Category II |

### DCIM & Monitoring  ·  3 assets  ·  Purdue 3 · Critical
_Data center infrastructure management platform, predictive maintenance analytics, and OT intrusion detection providing real-time visibility into power, thermal, environmental, and security events across the facility._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| DCIM-VERTIV-ENVIRONET | Vertiv/Geist Environet Enterprise | — | 2 | — | Category II |
| DCIM-VERTIV-NEXTPREDICT | Vertiv Next Predict (SaaS, launched January 2026) | — | 2 | — | Category III |
| DCIM-OT-IDS-NOZOMI | Nozomi Networks Guardian (OT/ICS Intrusion Detection) | — | 3 | — | Category II |

### Building Management System (BMS/BAS)  ·  7 assets  ·  Purdue 2 · Catastrophic
_Supervisory BMS/BAS layer unifying HVAC, power, fire safety, and access control. Includes Honeywell Niagara/EBI, JCI Metasys, Schneider EcoStruxure Building, Siemens Desigo CC as supervisory servers; Saia-Burgess PCD3 DDC field controllers; Loytec L-GATE protocol gateways; Siemens S7-1200 water-treatment PLC. Protocols: BACnet/IP, Modbus TCP, OPC-UA. Loss of BMS = loss of automated cooling, fire damper control, power management, and alarm management across the facility._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| BMS-SRV-HONEYWELL-01 | Honeywell Niagara Framework / EBI (Enterprise Buildings Integrator) | Windows Server / Linux (Niagara 4 / JACE platform) | 3 | — | Category I — Catastrophic |
| BMS-SRV-JCI-01 | Johnson Controls Metasys | — | 3 | — | Category I — Catastrophic |
| BMS-SRV-SCHNEIDER-01 | Schneider Electric EcoStruxure Building | — | 3 | — | Category I — Catastrophic |
| BMS-SRV-SIEMENS-01 | Siemens Desigo CC | — | 3 | — | Category I — Catastrophic |
| DDC-SAIA-01 | Saia-Burgess PCD3.M6893 QronoX | — | 3 | — | Category II — Critical |
| GTW-LOYTEC-01 | Loytec L-GATE Series | — | 3 | — | Category II — Critical |
| WTS-PLC-SIEMENS-01 | Siemens SIMATIC S7-1200 | — | 2 | — | Category II — Critical |

### Fire Detection — Aspirating (VESDA)  ·  4 assets  ·  Purdue 2 · Catastrophic
_Very Early Warning Aspirating Smoke Detection providing incipient fire detection before visible smoke. Models: Xtralis VESDA-E VEA and VEP (with Li-ion off-gas detection), Securiton ASD535, Hochiki FIRElink. SIL 1–2. Minimum 1 aspirating detector per data hall zone; cross-zone confirmation before suppression discharge. RS-485/LON to FACP._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| VESDA-XTRALIS-VEA-01 | Xtralis VESDA-E VEA | — | 3 | SIL 1–2 | Category I — Catastrophic |
| VESDA-XTRALIS-VEP-01 | Xtralis VESDA-E VEP | — | 3 | SIL 1–2 | Category I — Catastrophic |
| VESDA-SECURITON-ASD535-01 | Securiton ASD535 | — | 3 | SIL 1–2 | Category I — Catastrophic |
| VESDA-HOCHIKI-FIRELINK-01 | Hochiki FIRElink | — | 3 | SIL 1–2 | Category I — Catastrophic |

### Fire Alarm Control Panels (FACP)  ·  4 assets  ·  Purdue 2 · Catastrophic
_Addressable fire alarm control panels receiving inputs from VESDA detectors and initiating suppression. Models: Siemens Sinteso FC2080, Notifier NFS2-3030, Edwards EST3, Honeywell Notifier XLS3000. SIL 2 for detection; SIL 2–3 for suppression release. Redundant loop cards, 24-hour battery backup. Failure suppresses all alarms and disables suppression._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| FACP-SIEMENS-FC2080-01 | Siemens Sinteso FC2080 | — | 3 | SIL 2 (detection); SIL 2–3 (suppression release) | Category I — Catastrophic |
| FACP-NOTIFIER-NFS2-01 | Notifier (Honeywell) NFS2-3030 | — | 3 | SIL 2 (detection); SIL 2–3 (suppression release) | Category I — Catastrophic |
| FACP-EST3-EDWARDS-01 | Edwards (Carrier Global) EST3 | — | 3 | SIL 2 (detection); SIL 2–3 (suppression release) | Category I — Catastrophic |
| FACP-HONEYWELL-XLS3000-01 | Honeywell / Notifier XLS3000 | Proprietary Certified RTOS | 3 | SIL 3 | Category I — Catastrophic |

### Fire Suppression — Clean Agent  ·  5 assets  ·  Purdue 1 · Catastrophic
_Gaseous clean-agent fire suppression discharging within 10 s without damaging IT equipment or leaving residue. Includes Kidde Sapphire (Novec 1230), Fike FE-227 / Cheetah Xi controller, Ansul INERGEN (IG-541), and Schneider Harmony XB5 EPO buttons. Hardwired to FACP; BMS receives status only. SIL 1–2 on suppression release circuit._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| FSC-FIKE-CHEETAH-01 | Fike Cheetah Xi | Proprietary SLC firmware | 3 | SIL 1–2 | Category I — Catastrophic |
| SUP-KIDDE-SAPPHIRE-01 | Kidde Sapphire (Novec 1230 / FK-5-1-12) | — | 3 | SIL 1–2 | Category I — Catastrophic |
| SUP-FIKE-FE227-01 | Fike FE-227 (FM-200 / HFC-227ea) | — | 3 | SIL 1–2 | Category I — Catastrophic |
| SUP-ANSUL-INERGEN-01 | Ansul (Johnson Controls) INERGEN (IG-541) | — | 3 | SIL 1–2 | Category I — Catastrophic |
| EPO-BTN-SCHNEIDER-01 | Schneider Electric Harmony XB5 | — | 4 | SIL 2–3 | Category I — Catastrophic |

### HVAC — Battery, Generator & Electrical Rooms  ·  4 assets  ·  Purdue 1 · Critical
_Site-level HVAC for battery rooms (hydrogen off-gas ventilation SIL 1), generator rooms (exhaust ventilation SIL 1), electrical rooms, and general office areas — distinct from precision cooling for data halls. Equipment: Daikin VRV/VRF, Carrier AHU, Johnson Controls HVAC controls, Siemens BT300 VFDs on AHU fans._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| HVAC-DAIKIN-VRV-01 | Daikin VRV / VRF Series | — | 2 | SIL 1 | Category II — Critical |
| HVAC-CARRIER-AHU-01 | Carrier Carrier AHU (series unspecified) | — | 2 | SIL 1 | Category II — Critical |
| HVAC-JCI-CTRL-01 | Johnson Controls Johnson Controls HVAC Controls (model unspecified) | — | 2 | — | Category III — Marginal (office); Category II — Critical (electrical room) |
| HVAC-VFD-SIEMENS-BT300-01 | Siemens BT300 | — | 2 | SIL 1 (when controlling battery room or generator room fans) | Category II — Critical |

### CCTV & Video Surveillance  ·  8 assets  ·  Purdue 2 · Critical
_IP-based video surveillance covering perimeter, entrances, server halls, and critical equipment areas with AI analytics. Cameras: Avigilon H6A PTZ, Hanwha Vision QNV-8080R, Axis Q6135-LE PTZ and Q-Series domes. VMS platforms: Genetec Security Center, Milestone XProtect Corporate, Avigilon Control Center (ACC). ONVIF Profile S/G; PoE to VMS; 30-day minimum retention._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| CCTV-CAM-AVIGILON-H6A-PTZ-01 | Avigilon (Motorola Solutions) H6A PTZ | — | 2 | — | Category II — Critical |
| CCTV-CAM-AVIGILON-H6A-FIXED-01 | Avigilon (Motorola Solutions) H6A Fixed | — | 2 | — | Category II — Critical |
| CCTV-CAM-HANWHA-QNV8080R-01 | Hanwha Vision QNV-8080R | — | 2 | — | Category II — Critical |
| CCTV-CAM-AXIS-Q6135-PTZ-01 | Axis Communications Q6135-LE PTZ | Axis OS (Embedded Linux) | 2 | — | Category II — Critical |
| CCTV-CAM-AXIS-QSERIES-DOME-01 | Axis Communications Q-Series Dome | Axis OS (Embedded Linux) | 2 | — | Category II — Critical |
| VMS-GENETEC-SC-01 | Genetec Security Center | — | 3 | — | Category II — Critical |
| VMS-MILESTONE-XP-01 | Milestone Systems XProtect Corporate | — | 3 | — | Category II — Critical |
| VMS-AVIGILON-ACC-01 | Avigilon (Motorola Solutions) Avigilon Control Center (ACC) | — | 3 | — | Category II — Critical |

### Access Control & Biometrics  ·  8 assets  ·  Purdue 2 · Critical
_Multi-layer physical access control with head-end servers, door controllers, smart-card/OSDP readers, and biometric stations. Platforms: LenelS2 OnGuard, Honeywell ProWatch, Genetec Synergis, Lenel S2 NetBox. Controllers: HID Mercury LP1502. Readers: HID iCLASS SE, HID Signo. Biometric: Suprema FaceStation 2. Emergency egress fail-safe; data hall ingress fail-secure; UPS-backed panels._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| ACS-LENELS2-ONGUARD-01 | LenelS2 (Carrier Global) OnGuard | — | 3 | — | Category II — Critical |
| ACS-HONEYWELL-PROWATCH-01 | Honeywell ProWatch | — | 3 | — | Category II — Critical |
| ACS-GENETEC-SYNERGIS-01 | Genetec Synergis | — | 3 | — | Category II — Critical |
| ACS-LENELS2-NETBOX-01 | LenelS2 S2 NetBox | — | 3 | — | Category II — Critical |
| DOOR-CTL-HID-LP1502-01 | HID Global (ASSA ABLOY) Mercury LP1502 | Embedded Linux | 3 | — | Category II — Critical |
| RDR-HID-ICLASS-SE-01 | HID Global iCLASS SE | — | 3 | — | Category II — Critical |
| RDR-HID-SIGNO-01 | HID Global Signo | — | 3 | — | Category II — Critical |
| BIO-SUPREMA-FACESTATION2-01 | Suprema FaceStation 2 | — | 3 | — | Category II — Critical |

### Perimeter Security  ·  3 assets  ·  Purdue 1 · Critical
_Physical perimeter integrity layer including hostile vehicle mitigation (HVM) bollards (ATG Access shallow-foundation), perimeter intrusion detection (Fiber Patrol or Optex PIDS fence sensing), and integrated CCTV pole lighting. Perimeter breach enables direct physical attack on critical power/cooling infrastructure._

| Tag | Make / Model | OS/Firmware | SL-T | SIL | FMECA |
|---|---|---|---|---|---|
| PERI-HVM-ATG-BOLLARD-01 | ATG Access Shallow Foundation Bollards (type unspecified) | — | — | — | Category II — Critical |
| PERI-PIDS-FIBERPATROL-01 | Fiber Patrol (AFL / Optex) Fiber Patrol (model unspecified) | — | — | — | Category II — Critical |
| PERI-PIDS-OPTEX-01 | Optex Optex PIDS (model unspecified) | — | — | — | Category II — Critical |

## Build approach (after your sign-off — repeatable, single-tenant)
1. Codegen migration 136 from hyperscaler-register-v2.json → replace golden template systems_data + equipment_data (all 163).
2. Wipe current 52-asset facility, re-adopt → 31 systems + 163 assets, firmware/criticality/SL-T/component_class set.
3. On-adopt engine auto-computes FMECA/RAMS/hazard/SIL/system_scvs/actuarial + runTieredMatch CVE + SL-T for all 31 systems.
4. Verify per-system populate + real ALE; browser-verify; commit + push.

## Decisions for you
- **31 systems** keeps each subsystem distinct (your '16 systems' intent, expanded with cooling/IT/safety subsystems). Want them grouped into fewer top-level systems, or keep 31?
- The app's engine catalog (migration 132) is keyed by ~11 system types; 31 new systems need catalog entries mapped (by class) so FMECA/SIL generate per system. I'll extend the catalog mapping in the build.