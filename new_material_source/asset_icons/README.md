# CSET OT/ICS Asset Icons, Threat Modeling Primitives & Diagram Rule Engine

## Overview & Reference Library Purpose

This directory serves as the **authoritative OT/ICS asset symbol and threat modeling reference library**, extracted directly from the **CISA / DHS Cyber Security Evaluation Tool (CSET)** ecosystem.

It provides:
1. **95 High-Resolution OT/ICS Component Symbols** (520x520 transparent PNGs and clean SVG wrappers) spanning Purdue Levels 0 through 4, industrial networking, cybersecurity perimeters, and critical healthcare systems.
2. **Threat Modeling & Attack Tree Primitives** (DFD entities, unidirectional/bidirectional data flows, trust boundaries, AND/OR logic gates, and structured asset/threat tokens).
3. **CSET Architectural & Threat Rules Engine Specification (Rules 1–9)** mapping CSET/CISA automated network diagram validation rules to **IEC 62443 System Requirements (SRs)** and **Purdue Model Zones & Conduits**.

---

## Directory Structure

```
new_material_source/asset_icons/
├── README.md                          # This master specification & catalog
├── cset_components_manifest.json       # JSON metadata catalog of all 95 components
├── components_png/                    # 95 High-res (520x520) transparent PNG icons
│   ├── plc.png
│   ├── rtu.png
│   ├── dcs.png
│   ├── safety_instrumented_system.png
│   ├── unidirectional_device.png
│   ├── firewall.png
│   ├── historian.png
│   └── ... (88 more)
├── components_svg/                    # 95 Vector SVG wrappers for crisp web rendering
│   ├── plc.svg
│   ├── rtu.svg
│   └── ...
├── threat_modeling/                   # DFD, Trust Boundary & Attack Tree Primitives
│   ├── threat_modeling_primitives.json
│   ├── External_Entity.svg
│   ├── Process.svg
│   ├── Multi_Process.svg
│   ├── Data_Store.svg
│   ├── Data_Flow_Unidirectional.svg
│   ├── Data_Flow_Bidirectional.svg
│   ├── Trust_Boundary_Box.svg
│   ├── AND_Gate.svg
│   ├── OR_Gate.svg
│   ├── Leaf_Node.svg
│   ├── Asset_Label_A01.svg
│   ├── Security_Control_Label_C01.svg
│   └── Threat_Actor_Label_TA01.svg
└── rules_logic/                       # CSET Diagram Threat Rules & Validation Engine
    └── cset_diagram_rules.json        # Structured specification of Rules 1 through 9
```

---

## 1. CSET OT/ICS Component Catalog (95 Core Assets)

The table below catalogs all 95 components extracted from `cset-stencils.xml`, classified by **Purdue Level** and **Asset Category**:

| ID | Component Name | Purdue Model Level | Asset Category | PNG Icon | SVG Asset |
|---|---|---|---|---|---|
| 01 | **Connector** | Networking & Industrial Telecommunications | Network & Telecommunications | [`connector.png`](./components_png/connector.png) | [`connector.svg`](./components_svg/connector.svg) |
| 02 | **CT Scanner** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`ct_scanner.png`](./components_png/ct_scanner.png) | [`ct_scanner.svg`](./components_svg/ct_scanner.svg) |
| 03 | **Database Server** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`database_server.png`](./components_png/database_server.png) | [`database_server.svg`](./components_svg/database_server.svg) |
| 04 | **DCS** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`dcs.png`](./components_png/dcs.png) | [`dcs.svg`](./components_svg/dcs.svg) |
| 05 | **Dispatch Console** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`dispatch_console.png`](./components_png/dispatch_console.png) | [`dispatch_console.svg`](./components_svg/dispatch_console.svg) |
| 06 | **DNS Server** | Cross-Layer / General Asset | General Architecture | [`dns_server.png`](./components_png/dns_server.png) | [`dns_server.svg`](./components_svg/dns_server.svg) |
| 07 | **Door Access Door Control Unit** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`door_access_door_control_unit.png`](./components_png/door_access_door_control_unit.png) | [`door_access_door_control_unit.svg`](./components_svg/door_access_door_control_unit.svg) |
| 08 | **ECG** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`ecg.png`](./components_png/ecg.png) | [`ecg.svg`](./components_svg/ecg.svg) |
| 09 | **EEG** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`eeg.png`](./components_png/eeg.png) | [`eeg.svg`](./components_svg/eeg.svg) |
| 10 | **Electronic Security System** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`electronic_security_system.png`](./components_png/electronic_security_system.png) | [`electronic_security_system.svg`](./components_svg/electronic_security_system.svg) |
| 11 | **Emergency Medical Service Communications Hardware** | Cross-Layer / General Asset | General Architecture | [`emergency_medical_service_communications_hardware.png`](./components_png/emergency_medical_service_communications_hardware.png) | [`emergency_medical_service_communications_hardware.svg`](./components_svg/emergency_medical_service_communications_hardware.svg) |
| 12 | **EMG** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`emg.png`](./components_png/emg.png) | [`emg.svg`](./components_svg/emg.svg) |
| 13 | **Endoscopy System** | Cross-Layer / General Asset | General Architecture | [`endoscopy_system.png`](./components_png/endoscopy_system.png) | [`endoscopy_system.svg`](./components_svg/endoscopy_system.svg) |
| 14 | **Engineering Workstation** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`engineering_workstation.png`](./components_png/engineering_workstation.png) | [`engineering_workstation.svg`](./components_svg/engineering_workstation.svg) |
| 15 | **Ethernet Backhaul** | Networking & Industrial Telecommunications | Network & Telecommunications | [`ethernet_backhaul.png`](./components_png/ethernet_backhaul.png) | [`ethernet_backhaul.svg`](./components_svg/ethernet_backhaul.svg) |
| 16 | **Firewall** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`firewall.png`](./components_png/firewall.png) | [`firewall.svg`](./components_svg/firewall.svg) |
| 17 | **Front End Processor** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`front_end_processor.png`](./components_png/front_end_processor.png) | [`front_end_processor.svg`](./components_svg/front_end_processor.svg) |
| 18 | **Handheld Wireless Device** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`handheld_wireless_device.png`](./components_png/handheld_wireless_device.png) | [`handheld_wireless_device.svg`](./components_svg/handheld_wireless_device.svg) |
| 19 | **Historian** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`historian.png`](./components_png/historian.png) | [`historian.svg`](./components_svg/historian.svg) |
| 20 | **HMI** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`hmi.png`](./components_png/hmi.png) | [`hmi.svg`](./components_svg/hmi.svg) |
| 21 | **Hub** | Networking & Industrial Telecommunications | Network & Telecommunications | [`hub.png`](./components_png/hub.png) | [`hub.svg`](./components_svg/hub.svg) |
| 22 | **IDS** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`ids.png`](./components_png/ids.png) | [`ids.svg`](./components_svg/ids.svg) |
| 23 | **IED** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`ied.png`](./components_png/ied.png) | [`ied.svg`](./components_svg/ied.svg) |
| 24 | **Imaging Modalities and Equipment** | Cross-Layer / General Asset | General Architecture | [`imaging_modalities_and_equipment.png`](./components_png/imaging_modalities_and_equipment.png) | [`imaging_modalities_and_equipment.svg`](./components_svg/imaging_modalities_and_equipment.svg) |
| 25 | **Imaging Server** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`imaging_server.png`](./components_png/imaging_server.png) | [`imaging_server.svg`](./components_svg/imaging_server.svg) |
| 26 | **Infant Protection Remote Display Unit** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`infant_protection_remote_display_unit.png`](./components_png/infant_protection_remote_display_unit.png) | [`infant_protection_remote_display_unit.svg`](./components_svg/infant_protection_remote_display_unit.svg) |
| 27 | **Infusion Pump** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`infusion_pump.png`](./components_png/infusion_pump.png) | [`infusion_pump.svg`](./components_svg/infusion_pump.svg) |
| 28 | **Interactive Television System** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`interactive_television_system.png`](./components_png/interactive_television_system.png) | [`interactive_television_system.svg`](./components_svg/interactive_television_system.svg) |
| 29 | **IP Camera** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`ip_camera.png`](./components_png/ip_camera.png) | [`ip_camera.svg`](./components_svg/ip_camera.svg) |
| 30 | **IP Phone** | Cross-Layer / General Asset | General Architecture | [`ip_phone.png`](./components_png/ip_phone.png) | [`ip_phone.svg`](./components_svg/ip_phone.svg) |
| 31 | **IPS** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`ips.png`](./components_png/ips.png) | [`ips.svg`](./components_svg/ips.svg) |
| 32 | **Linear Partical Accelerator** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`linear_partical_accelerator.png`](./components_png/linear_partical_accelerator.png) | [`linear_partical_accelerator.svg`](./components_svg/linear_partical_accelerator.svg) |
| 33 | **Link Encryption** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`link_encryption.png`](./components_png/link_encryption.png) | [`link_encryption.svg`](./components_svg/link_encryption.svg) |
| 34 | **Link** | Networking & Industrial Telecommunications | Network & Telecommunications | [`link.png`](./components_png/link.png) | [`link.svg`](./components_svg/link.svg) |
| 35 | **Magnetic Resonance Imaging** | Cross-Layer / General Asset | General Architecture | [`magnetic_resonance_imaging.png`](./components_png/magnetic_resonance_imaging.png) | [`magnetic_resonance_imaging.svg`](./components_svg/magnetic_resonance_imaging.svg) |
| 36 | **Mail Server** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`mail_server.png`](./components_png/mail_server.png) | [`mail_server.svg`](./components_svg/mail_server.svg) |
| 37 | **Master Site** | Cross-Layer / General Asset | General Architecture | [`master_site.png`](./components_png/master_site.png) | [`master_site.svg`](./components_svg/master_site.svg) |
| 38 | **Medical Gas System** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`medical_gas_system.png`](./components_png/medical_gas_system.png) | [`medical_gas_system.svg`](./components_svg/medical_gas_system.svg) |
| 39 | **Microwave Backhaul** | Networking & Industrial Telecommunications | Network & Telecommunications | [`microwave_backhaul.png`](./components_png/microwave_backhaul.png) | [`microwave_backhaul.svg`](./components_svg/microwave_backhaul.svg) |
| 40 | **Modem** | Networking & Industrial Telecommunications | Network & Telecommunications | [`modem.png`](./components_png/modem.png) | [`modem.svg`](./components_svg/modem.svg) |
| 41 | **MTU** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`mtu.png`](./components_png/mtu.png) | [`mtu.svg`](./components_svg/mtu.svg) |
| 42 | **Multi Protocol Label Switching** | Networking & Industrial Telecommunications | Network & Telecommunications | [`multi_protocol_label_switching.png`](./components_png/multi_protocol_label_switching.png) | [`multi_protocol_label_switching.svg`](./components_svg/multi_protocol_label_switching.svg) |
| 43 | **Multiple Services Component** | Cross-Layer / General Asset | General Architecture | [`multiple_services_component.png`](./components_png/multiple_services_component.png) | [`multiple_services_component.svg`](./components_svg/multiple_services_component.svg) |
| 44 | **Network Printer** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`network_printer.png`](./components_png/network_printer.png) | [`network_printer.svg`](./components_svg/network_printer.svg) |
| 45 | **Network Scanner And Copier** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`network_scanner_and_copier.png`](./components_png/network_scanner_and_copier.png) | [`network_scanner_and_copier.svg`](./components_svg/network_scanner_and_copier.svg) |
| 46 | **Optical Ring System** | Networking & Industrial Telecommunications | Network & Telecommunications | [`optical_ring_system.png`](./components_png/optical_ring_system.png) | [`optical_ring_system.svg`](./components_svg/optical_ring_system.svg) |
| 47 | **Partner** | External Untrusted Zone | Third-Party & External Partners | [`partner.png`](./components_png/partner.png) | [`partner.svg`](./components_svg/partner.svg) |
| 48 | **PC** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`pc.png`](./components_png/pc.png) | [`pc.svg`](./components_svg/pc.svg) |
| 49 | **Physiological Monitoring System** | Cross-Layer / General Asset | General Architecture | [`physiological_monitoring_system.png`](./components_png/physiological_monitoring_system.png) | [`physiological_monitoring_system.svg`](./components_svg/physiological_monitoring_system.svg) |
| 50 | **PLC** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`plc.png`](./components_png/plc.png) | [`plc.svg`](./components_svg/plc.svg) |
| 51 | **Power Over Ethernet** | Networking & Industrial Telecommunications | Network & Telecommunications | [`power_over_ethernet.png`](./components_png/power_over_ethernet.png) | [`power_over_ethernet.svg`](./components_svg/power_over_ethernet.svg) |
| 52 | **Public Kiosk** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`public_kiosk.png`](./components_png/public_kiosk.png) | [`public_kiosk.svg`](./components_svg/public_kiosk.svg) |
| 53 | **Radio Site** | Cross-Layer / General Asset | General Architecture | [`radio_site.png`](./components_png/radio_site.png) | [`radio_site.svg`](./components_svg/radio_site.svg) |
| 54 | **Real Time Location System** | Cross-Layer / General Asset | General Architecture | [`real_time_location_system.png`](./components_png/real_time_location_system.png) | [`real_time_location_system.svg`](./components_svg/real_time_location_system.svg) |
| 55 | **Relay Panel** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`relay_panel.png`](./components_png/relay_panel.png) | [`relay_panel.svg`](./components_svg/relay_panel.svg) |
| 56 | **Remote Access Server** | Cross-Layer / General Asset | General Architecture | [`remote_access_server.png`](./components_png/remote_access_server.png) | [`remote_access_server.svg`](./components_svg/remote_access_server.svg) |
| 57 | **RFID Transmitter** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`rfid_transmitter.png`](./components_png/rfid_transmitter.png) | [`rfid_transmitter.svg`](./components_svg/rfid_transmitter.svg) |
| 58 | **Router** | Networking & Industrial Telecommunications | Network & Telecommunications | [`router.png`](./components_png/router.png) | [`router.svg`](./components_svg/router.svg) |
| 59 | **RTU** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`rtu.png`](./components_png/rtu.png) | [`rtu.svg`](./components_svg/rtu.svg) |
| 60 | **Safety Instrumented System** | Cross-Layer / General Asset | General Architecture | [`safety_instrumented_system.png`](./components_png/safety_instrumented_system.png) | [`safety_instrumented_system.svg`](./components_svg/safety_instrumented_system.svg) |
| 61 | **Security Information And Event Management System** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`security_information_and_event_management_system.png`](./components_png/security_information_and_event_management_system.png) | [`security_information_and_event_management_system.svg`](./components_svg/security_information_and_event_management_system.svg) |
| 62 | **Serial Radio** | Networking & Industrial Telecommunications | Network & Telecommunications | [`serial_radio.png`](./components_png/serial_radio.png) | [`serial_radio.svg`](./components_svg/serial_radio.svg) |
| 63 | **Serial Switch** | Networking & Industrial Telecommunications | Network & Telecommunications | [`serial_switch.png`](./components_png/serial_switch.png) | [`serial_switch.svg`](./components_svg/serial_switch.svg) |
| 64 | **Server** | Cross-Layer / General Asset | General Architecture | [`server.png`](./components_png/server.png) | [`server.svg`](./components_svg/server.svg) |
| 65 | **Subscriber Radio** | Networking & Industrial Telecommunications | Network & Telecommunications | [`subscriber_radio.png`](./components_png/subscriber_radio.png) | [`subscriber_radio.svg`](./components_svg/subscriber_radio.svg) |
| 66 | **Switch** | Networking & Industrial Telecommunications | Network & Telecommunications | [`switch.png`](./components_png/switch.png) | [`switch.svg`](./components_svg/switch.svg) |
| 67 | **T1 Backhaul** | Networking & Industrial Telecommunications | Network & Telecommunications | [`t1_backhaul.png`](./components_png/t1_backhaul.png) | [`t1_backhaul.svg`](./components_svg/t1_backhaul.svg) |
| 68 | **TDM Backhaul** | Networking & Industrial Telecommunications | Network & Telecommunications | [`tdm_backhaul.png`](./components_png/tdm_backhaul.png) | [`tdm_backhaul.svg`](./components_svg/tdm_backhaul.svg) |
| 69 | **Terminal Server** | Networking & Industrial Telecommunications | Network & Telecommunications | [`terminal_server.png`](./components_png/terminal_server.png) | [`terminal_server.svg`](./components_svg/terminal_server.svg) |
| 70 | **Ultrasound** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`ultrasound.png`](./components_png/ultrasound.png) | [`ultrasound.svg`](./components_svg/ultrasound.svg) |
| 71 | **Unidirectional Device** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`unidirectional_device.png`](./components_png/unidirectional_device.png) | [`unidirectional_device.svg`](./components_svg/unidirectional_device.svg) |
| 72 | **Uninterruptible Power Supply** | Level 0 / Infrastructure (Critical Power) | Power Infrastructure | [`uninterruptible_power_supply.png`](./components_png/uninterruptible_power_supply.png) | [`uninterruptible_power_supply.svg`](./components_svg/uninterruptible_power_supply.svg) |
| 73 | **Unknown** | Cross-Layer / General Asset | General Architecture | [`unknown.png`](./components_png/unknown.png) | [`unknown.svg`](./components_svg/unknown.svg) |
| 74 | **Urodynamic Diagnostic Equipment** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`urodynamic_diagnostic_equipment.png`](./components_png/urodynamic_diagnostic_equipment.png) | [`urodynamic_diagnostic_equipment.svg`](./components_svg/urodynamic_diagnostic_equipment.svg) |
| 75 | **Vendor** | External Untrusted Zone | Third-Party & External Partners | [`vendor.png`](./components_png/vendor.png) | [`vendor.svg`](./components_svg/vendor.svg) |
| 76 | **Video Teleconferencing Equipment** | Cross-Layer / General Asset | General Architecture | [`video_teleconferencing_equipment.png`](./components_png/video_teleconferencing_equipment.png) | [`video_teleconferencing_equipment.svg`](./components_svg/video_teleconferencing_equipment.svg) |
| 77 | **Virtual Machine Server** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`virtual_machine_server.png`](./components_png/virtual_machine_server.png) | [`virtual_machine_server.svg`](./components_svg/virtual_machine_server.svg) |
| 78 | **VLAN Router** | Networking & Industrial Telecommunications | Network & Telecommunications | [`vlan_router.png`](./components_png/vlan_router.png) | [`vlan_router.svg`](./components_svg/vlan_router.svg) |
| 79 | **VLAN Switch** | Networking & Industrial Telecommunications | Network & Telecommunications | [`vlan_switch.png`](./components_png/vlan_switch.png) | [`vlan_switch.svg`](./components_svg/vlan_switch.svg) |
| 80 | **VPN** | Security & Boundary Enforcement | Cybersecurity & Physical Security | [`vpn.png`](./components_png/vpn.png) | [`vpn.svg`](./components_svg/vpn.svg) |
| 81 | **Web Server** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`web_server.png`](./components_png/web_server.png) | [`web_server.svg`](./components_svg/web_server.svg) |
| 82 | **Web** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`web.png`](./components_png/web.png) | [`web.svg`](./components_svg/web.svg) |
| 83 | **Windows Update Server** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`windows_update_server.png`](./components_png/windows_update_server.png) | [`windows_update_server.svg`](./components_svg/windows_update_server.svg) |
| 84 | **Wireless Modem** | Networking & Industrial Telecommunications | Network & Telecommunications | [`wireless_modem.png`](./components_png/wireless_modem.png) | [`wireless_modem.svg`](./components_svg/wireless_modem.svg) |
| 85 | **Wireless Network** | Networking & Industrial Telecommunications | Network & Telecommunications | [`wireless_network.png`](./components_png/wireless_network.png) | [`wireless_network.svg`](./components_svg/wireless_network.svg) |
| 86 | **Wireless Router** | Networking & Industrial Telecommunications | Network & Telecommunications | [`wireless_router.png`](./components_png/wireless_router.png) | [`wireless_router.svg`](./components_svg/wireless_router.svg) |
| 87 | **XRay Generator** | Level 1 / Level 0 (Field Control & Process Assets) | Controllers & Physical Devices | [`xray_generator.png`](./components_png/xray_generator.png) | [`xray_generator.svg`](./components_svg/xray_generator.svg) |
| 88 | **Zone** | Cross-Layer / General Asset | General Architecture | [`zone.png`](./components_png/zone.png) | [`zone.svg`](./components_svg/zone.svg) |
| 89 | **** | Cross-Layer / General Asset | General Architecture | [`cset_component.png`](./components_png/cset_component.png) | [`cset_component.svg`](./components_svg/cset_component.svg) |
| 90 | **Active Directory** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`active_directory.png`](./components_png/active_directory.png) | [`active_directory.svg`](./components_svg/active_directory.svg) |
| 91 | **Application Server** | Level 4 (Enterprise & Corporate IT) | Enterprise & IT Infrastructure | [`application_server.png`](./components_png/application_server.png) | [`application_server.svg`](./components_svg/application_server.svg) |
| 92 | **Audio Switch** | Networking & Industrial Telecommunications | Network & Telecommunications | [`audio_switch.png`](./components_png/audio_switch.png) | [`audio_switch.svg`](./components_svg/audio_switch.svg) |
| 93 | **Building Automation Management Systems** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`building_automation_management_systems.png`](./components_png/building_automation_management_systems.png) | [`building_automation_management_systems.svg`](./components_svg/building_automation_management_systems.svg) |
| 94 | **Clock** | Level 2 (Supervisory Control & Local HMI) | Supervisory & Operations | [`clock.png`](./components_png/clock.png) | [`clock.svg`](./components_svg/clock.svg) |
| 95 | **Configuration Server** | Level 3 (Site Operations & Control Center) | Site Operations & Data Servers | [`configuration_server.png`](./components_png/configuration_server.png) | [`configuration_server.svg`](./components_svg/configuration_server.svg) |

---

## 2. Threat Modeling & Attack Tree Primitives

Extracted from CSET's `Sidebar-ThreatModeling` library, these primitives support Data Flow Diagrams (DFD), Attack Tree graph structures, and IEC 62443 Conduit Security Level evaluations:

| Primitive Name | Type | Purpose & Description | Vector File |
|---|---|---|---|
| **External Entity (Interacting System / Actor)** | Vector Graphic | Represents external systems, third parties, or users that send/receive data across system perimeters. | [`External_Entity.svg`](./threat_modeling/External_Entity.svg) |
| **Process / Execution Task** | Vector Graphic | Represents a single computation, application, microservice, or OT control loop process. | [`Process.svg`](./threat_modeling/Process.svg) |
| **Multi-Process / Subsystem** | Vector Graphic | Represents complex distributed processes or multi-threaded service subsystems. | [`Multi_Process.svg`](./threat_modeling/Multi_Process.svg) |
| **Data Store / Historian / DB** | Vector Graphic | Represents at-rest data storage (Historian DB, configuration repository, event log). | [`Data_Store.svg`](./threat_modeling/Data_Store.svg) |
| **Data Flow (Unidirectional)** | Vector Graphic | Represents single-direction data flow (e.g. telemetry egress via Data Diode). | [`Data_Flow_Unidirectional.svg`](./threat_modeling/Data_Flow_Unidirectional.svg) |
| **Data Flow (Bidirectional)** | Vector Graphic | Represents two-way interactive protocol communication (Modbus TCP, BACnet, HTTP/REST). | [`Data_Flow_Bidirectional.svg`](./threat_modeling/Data_Flow_Bidirectional.svg) |
| **Trust Boundary Zone Perimeter** | Vector Graphic | Represents a security perimeter / IEC 62443 security zone boundary. | [`Trust_Boundary_Box.svg`](./threat_modeling/Trust_Boundary_Box.svg) |
| **Attack Tree AND Gate** | Vector Graphic | Indicates that all child attack conditions must be fulfilled for node compromise. | [`AND_Gate.svg`](./threat_modeling/AND_Gate.svg) |
| **Attack Tree OR Gate** | Vector Graphic | Indicates that any child attack condition is sufficient for node compromise. | [`OR_Gate.svg`](./threat_modeling/OR_Gate.svg) |
| **Attack Tree Leaf Node (Exploit Action)** | Vector Graphic | Atomic attacker action or specific vulnerability exploit vector. | [`Leaf_Node.svg`](./threat_modeling/Leaf_Node.svg) |
| **Asset Token Label (A01)** | Vector Graphic | Standardized token identifier for tracked assets. | [`Asset_Label_A01.svg`](./threat_modeling/Asset_Label_A01.svg) |
| **Security Control Token Label (C01)** | Vector Graphic | Standardized token identifier for compensating security controls. | [`Security_Control_Label_C01.svg`](./threat_modeling/Security_Control_Label_C01.svg) |
| **Threat Actor Token Label (TA01)** | Vector Graphic | Standardized token identifier for threat actor profiles. | [`Threat_Actor_Label_TA01.svg`](./threat_modeling/Threat_Actor_Label_TA01.svg) |

---

## 3. CSET Architectural & Threat Rule Engine (Rules 1–9)

CSET includes a rule validation engine (`CSETWebCore.Business.Diagram.analysis.rules`) that evaluates industrial network topologies against cybersecurity principles and IEC 62443 / NIST SP 800-82 standards:

### Rule Matrix

### `CSET-RULE-01`: Subnet Ingress IDS/IPS Inspection
- **Severity**: `High`
- **IEC 62443 Reference**: `SR 5.1, SR 5.2 (Network Segmentation & Monitoring)`
- **Summary**: Validates that all external ingress paths and perimeter subnet boundaries pass through an active IDS/IPS or DPI sensor to monitor for lateral penetration.
- **Violation Condition**: A firewall or boundary routing node connects into a zone/subnet without an inline IDS/IPS or SPAN-monitored sensor in the same zone.
- **Remediation Action**: Deploy inline IPS or tap the firewall interior interface to an IDS / Zeek network security monitor.

### `CSET-RULE-02`: Firewall Lateral Inspection Validation
- **Severity**: `High`
- **IEC 62443 Reference**: `SR 5.3 (General Purpose Person-to-Person Communication)`
- **Summary**: Validates that firewall configurations are audited with inline traffic inspection to confirm malware has not bypassed firewall rule sets.
- **Violation Condition**: A firewall node connects directly to downstream operational assets without an IDS/IPS in its broadcast or conduit path.
- **Remediation Action**: Add an inline IPS or deep-packet inspection proxy (DPI) immediately downstream of the firewall.

### `CSET-RULE-03`: Multi-SAL Shared Physical Interface Violation
- **Severity**: `Critical`
- **IEC 62443 Reference**: `SR 5.1 (Network Segmentation) / IEC 62443-3-2 Target SALs`
- **Summary**: Detects single physical components (e.g., non-isolated switches or routers) bridging distinct Security Assurance Levels (e.g. SAL-1 Enterprise and SAL-3 Safety).
- **Violation Condition**: A network component has multiple subnets/interfaces whose connected zones have distinct SAL levels, creating a single point of failure where compromise exposes critical traffic.
- **Remediation Action**: Physically separate the networks onto dedicated hardware or deploy an intervening firewall / unidirectional security gateway.

### `CSET-RULE-04`: Multi-SAL VLAN Shared Switch Exposure
- **Severity**: `Critical`
- **IEC 62443 Reference**: `SR 5.1 (Network Segmentation - Logical vs. Physical)`
- **Summary**: Detects multi-tenant VLAN switches carrying different SAL levels without physical isolation or Layer 7 boundary filtering.
- **Violation Condition**: A VLAN-enabled switch handles subnets with differing SAL levels without intermediate cryptographic or physical boundary enforcement.
- **Remediation Action**: Migrate high-SAL (SAL-3/SAL-4) control networks to dedicated physical switching hardware and conduits.

### `CSET-RULE-05`: Unfiltered External/Partner/Vendor Ingress
- **Severity**: `Critical`
- **IEC 62443 Reference**: `SR 1.13 (Access via Untrusted Networks), SR 3.8 (Session Integrity)`
- **Summary**: Flags direct connections between internal OT assets and external endpoints (Web, Vendor, Partner, single-connection Modems) lacking firewall filtering.
- **Violation Condition**: A direct link exists from a Web, Vendor, Partner, or Modem component into the internal OT network without a filtering firewall.
- **Remediation Action**: Place an industrial DMZ firewall and VPN concentrator with MFA between external entities and internal zones.

### `CSET-RULE-06`: Untrusted Link / Lack of Transit Cryptography
- **Severity**: `High`
- **IEC 62443 Reference**: `SR 4.1 (Information Protection in Transit)`
- **Summary**: Flags communication paths traversing untrusted media (e.g., leased lines, public microwave, campus serial backhauls) without link encryption or dual-sided firewalls.
- **Violation Condition**: A path between two operational nodes is marked untrusted and lacks link encryption or firewalls on both endpoints.
- **Remediation Action**: Deploy MACsec / IPsec link encryption hardware or install firewalls at both endpoints of the transit path.

### `CSET-RULE-07`: Unidirectional Data Diode Flow Direction Enforcement
- **Severity**: `Critical`
- **IEC 62443 Reference**: `SR 5.1 (Boundary Protection - Unidirectional Control)`
- **Summary**: Enforces that physical hardware Data Diodes only permit traffic flowing from High SAL (e.g. Purdue L2/L3) to Low SAL (e.g. Purdue L4/Cloud), never in reverse (except for classified zones).
- **Violation Condition**: A unidirectional device is oriented such that data flows from a low SAL zone into a higher SAL zone.
- **Remediation Action**: Reverse the optical transmitter/receiver orientation so data strictly egresses from higher to lower SAL.

### `CSET-RULE-08`: Malcolm / CISA Passive OT Sensor Placement
- **Severity**: `Medium`
- **IEC 62443 Reference**: `SR 6.1 (Audit Log Generation), SR 6.2 (Continuous Monitoring)`
- **Summary**: Validates that critical industrial control conduits are monitored by CISA Malcolm / Zeek / Arkime passive network sensors for continuous protocol baseline auditing.
- **Violation Condition**: High-criticality OT conduits (Purdue L1-L2 to L3) lack passive sensor taps.
- **Remediation Action**: Deploy network TAPs or SPAN mirror ports feeding a Malcolm / Zeek sensor instance.

### `CSET-RULE-09`: Malcolm Network Visibility & Protocol Dissection
- **Severity**: `Medium`
- **IEC 62443 Reference**: `SR 5.2 (Zone Boundary Traffic Filtering)`
- **Summary**: Ensures proprietary and industrial protocol streams (Modbus, DNP3, CIP, BACnet, S7comm) are actively parsed for anomaly detection.
- **Violation Condition**: Industrial communications cross zone boundaries without protocol-aware DPI parsers.
- **Remediation Action**: Configure Malcolm protocol analyzers for the specific ICS protocols in use.

---

## 4. Integration Guide

### A. Next.js / React Web Components
Use the extracted SVG or PNG icons directly in JSX/TSX:

```tsx
import Image from "next/image";

export function OTAssetBadge({ type }: { type: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-800 bg-slate-900/60">
      <Image 
        src={`/images/cset_icons/${type}.png`} 
        alt={type} 
        width={32} 
        height={32} 
        className="object-contain" 
      />
      <span className="text-sm font-semibold uppercase tracking-wider text-slate-200">{type}</span>
    </div>
  );
}
```

### B. Draw.io / MXGraph Custom Libraries
To import these shapes into any draw.io or mxGraph environment:
1. Open draw.io -> **File** -> **Open Library from** -> **Device**.
2. Select `new_material_source/asset_icons/cset_components_manifest.json` or original XML stencils.

### C. Digital Twin 3D Overlay Mapping
In Three.js / Babylon.js Cyber Digital Twin viewports:
- Use `cset_components_manifest.json` to map Purdue Levels (0–4) to 3D HTML billboard markers hovering over 3D racks, CDUs, PLCs, and generator sets.
