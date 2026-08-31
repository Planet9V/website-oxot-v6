import os
import base64
import json

base_svg_dir = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/asset_icons/components_svg"
drawio_lib_dir = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/asset_icons_drawio/libraries"

def get_svg_uri(path):
    if not os.path.exists(path):
        print(f"Warning: path not found: {path}")
        return ""
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"

# Collect icons
icon_meter = get_svg_uri(os.path.join(base_svg_dir, "ied.svg"))
icon_inverter = get_svg_uri(os.path.join(drawio_lib_dir, "electrical/inductors/outdoor_metering_device.svg"))
if not icon_inverter:
    icon_inverter = get_svg_uri(os.path.join(base_svg_dir, "plc.svg"))

icon_cell_tower = get_svg_uri(os.path.join(base_svg_dir, "wireless_network.svg"))
icon_rf_mesh = get_svg_uri(os.path.join(base_svg_dir, "wireless_modem.svg"))
icon_firewall = get_svg_uri(os.path.join(base_svg_dir, "firewall.svg"))
icon_vpn = get_svg_uri(os.path.join(base_svg_dir, "vpn.svg"))
icon_switch = get_svg_uri(os.path.join(base_svg_dir, "vlan_switch.svg"))
icon_fep = get_svg_uri(os.path.join(base_svg_dir, "front_end_processor.svg"))
icon_server = get_svg_uri(os.path.join(base_svg_dir, "server.svg"))
icon_database = get_svg_uri(os.path.join(base_svg_dir, "database_server.svg"))
icon_derms = get_svg_uri(os.path.join(base_svg_dir, "dcs.svg"))
icon_oms = get_svg_uri(os.path.join(base_svg_dir, "application_server.svg"))
icon_market = get_svg_uri(os.path.join(base_svg_dir, "web_server.svg"))
icon_portal = get_svg_uri(os.path.join(base_svg_dir, "handheld_wireless_device.svg"))
icon_diode = get_svg_uri(os.path.join(base_svg_dir, "unidirectional_device.svg"))
icon_siem = get_svg_uri(os.path.join(base_svg_dir, "security_information_and_event_management_system.svg"))

output_drawio = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/CDT_BESS_Power_Designs/Smart Meters/smart_meter_ami_architecture.drawio"

# Build complete XML network topology
xml = f"""<mxfile host="app.diagrams.net" modified="2026-08-26T17:30:00.000Z" agent="OXOT Network Architecture Synthesizer" version="24.7.5" type="device">
  <diagram id="ami_net_topology" name="Endeavour Energy Smart Meter Network Diagram">
    <mxGraphModel dx="2000" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2200" pageHeight="1300" background="#070b14" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="net_header" value="&lt;b style='font-size:20px; color:#f8fafc;'&gt;ENDEAVOUR ENERGY — SMART METER &amp; AMI OPERATIONAL NETWORK TOPOLOGY&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:12px;'&gt;IEC 62443 Industrial Network Zones • DLMS/COSEM (IEC 62056) • AES-128 Session Encryption • Dynamic DERMS Flexible Exports (5-10kW) • B2B Market Routing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#334155;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="30" width="2120" height="80" as="geometry" />
        </mxCell>

        <!-- ==================== ZONE 1: FIELD LAYER / CUSTOMER PREMISES (PURDUE L0/L1) ==================== -->
        <mxCell id="zone_field" value="&lt;b style='color:#38bdf8; font-size:14px;'&gt;ZONE 1: FIELD EDGE / CUSTOMER PREMISES (PURDUE L0/L1)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:11px;'&gt;700,000 Smart Monitoring Endpoints • Unique NMI (10-11 Digit) • Sub-second Sampling • 30-min Local NVRAM Buffer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.7);strokeColor=#0284c7;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="40" y="140" width="480" height="1100" as="geometry" />
        </mxCell>

        <!-- Node: Solar Inverter -->
        <mxCell id="node_solar" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;Solar PV Smart Inverter&lt;/b&gt;&lt;br&gt;&lt;span style='color:#fbbf24; font-size:10px; font-family:monospace;'&gt;[Modbus-TCP / SunSpec]&lt;br&gt;Alloc: 5kW Base / 10kW Max&lt;br&gt;Dynamic Curtailment Active&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_inverter};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="70" y="210" width="420" height="120" as="geometry" />
        </mxCell>

        <!-- Container: Intellihub Type 4 Meter -->
        <mxCell id="node_meter_box" value="&lt;b style='font-size:14px; color:#38bdf8;'&gt;Intellihub Modular Type 4 Smart Meter&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:11px;'&gt;NMI: 4102-983-1107 • NER Rule 7.3 Compliant • Active/Reactive 4-Quadrant&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#090d16;strokeColor=#0284c7;strokeWidth=2;align=center;verticalAlign=top;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="70" y="370" width="420" height="660" as="geometry" />
        </mxCell>

        <!-- Sub-Node: Metering Element -->
        <mxCell id="node_meter_elem" value="&lt;b style='color:#f8fafc;'&gt;Primary Metering Metrology Core&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;Voltage (230V), Current (60A), Frequency (50Hz)&lt;br&gt;&lt;font color='#38bdf8'&gt;True RMS Sampling @ 4 kHz • 4-Quadrant Measurement&lt;/font&gt;&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="440" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Sub-Node: Meter Controller & Cryptographic Core -->
        <mxCell id="node_meter_controller" value="&lt;b style='color:#4ade80;'&gt;Meter Controller &amp; Cryptographic Engine&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;DLMS/COSEM (IEC 62056) Object Dictionary&lt;br&gt;&lt;font color='#22c55e'&gt;AES-128 Galois/Counter Mode (GCM) Authentication&lt;/font&gt;&lt;br&gt;90-Day Non-Volatile Memory (NVRAM) Buffer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#22c55e;strokeWidth=2;align=center;verticalAlign=middle;imageAlign=left;imageVerticalAlign=middle;imageWidth=36;imageHeight=36;image={icon_meter};spacingLeft=45;" vertex="1" parent="1">
          <mxGeometry x="95" y="540" width="370" height="95" as="geometry" />
        </mxCell>

        <!-- Sub-Node: Remote Service Switch -->
        <mxCell id="node_meter_switch" value="&lt;b style='color:#fb7185;'&gt;Remote Service Disconnect Switch (UC3)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;Motorized 100A Service Contactor&lt;br&gt;&lt;font color='#f43f5e'&gt;Safety Interlocks: Neutral Fault &amp; Voltage Drift Lockout&lt;/font&gt;&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f43f5e;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="660" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Sub-Node: Modular Swappable Comms Card -->
        <mxCell id="node_meter_comms" value="&lt;b style='color:#c084fc;'&gt;Modular Swappable Comms Transceiver&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;&lt;font color='#a855f7'&gt;Dual Interface: LTE Cat-M1 eSIM + Wi-SUN 915MHz RF&lt;/font&gt;&lt;br&gt;IP Interface: 10.240.x.x (APN) / IPv6 Mesh Address&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="760" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Sub-Node: Local Optical Maintenance Port -->
        <mxCell id="node_meter_optical" value="&lt;b style='color:#e2e8f0;'&gt;ANSI/IEC Optical Probe Port&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:9px;'&gt;Field Tech Calibration &amp; Local Firmware Port (Protected)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#64748b;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="860" width="370" height="50" as="geometry" />
        </mxCell>

        <!-- Customer Main Switchboard Load -->
        <mxCell id="node_load" value="&lt;b style='color:#f8fafc;'&gt;Customer Main Switchboard &amp; Sub-Circuits&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;Single Phase 230V / Three Phase 400V Distribution&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="70" y="1060" width="420" height="60" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 2: FIELD TELECOM & CARRIER WAN (PURDUE L2) ==================== -->
        <mxCell id="zone_telecom" value="&lt;b style='color:#a855f7; font-size:14px;'&gt;ZONE 2: FIELD TELECOM &amp; CARRIER WAN CONDUIT (PURDUE L2)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:11px;'&gt;Multi-Bearer Redundancy • Telstra/Optus Private APN • Sub-GHz RF Mesh Collectors • Encrypted Backhaul&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.7);strokeColor=#9333ea;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="560" y="140" width="480" height="1100" as="geometry" />
        </mxCell>

        <!-- Cellular eNodeB / Private APN -->
        <mxCell id="node_cell_tower" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;Telco LTE Cat-M1 Private APN Gateway&lt;/b&gt;&lt;br&gt;&lt;span style='color:#c084fc; font-size:10px; font-family:monospace;'&gt;[APN: energy.private.net]&lt;br&gt;Subnet: 10.240.0.0/16 • Direct Carrier Interconnect&lt;br&gt;Dedicated Isolated VRF • Zero Public Internet Exposure&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_cell_tower};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="590" y="220" width="420" height="140" as="geometry" />
        </mxCell>

        <!-- Wi-SUN Field Area Network (FAN) Border Router -->
        <mxCell id="node_wisun_router" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;Wi-SUN Mesh Field Area Network (FAN)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#c084fc; font-size:10px; font-family:monospace;'&gt;[IEEE 802.15.4g Sub-GHz Mesh]&lt;br&gt;Pole-Top Collector Border Router (IPv6 6LoWPAN)&lt;br&gt;Gigabit Fiber / Microwave Substation Backhaul&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_rf_mesh};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="590" y="420" width="420" height="140" as="geometry" />
        </mxCell>

        <!-- Carrier IPsec Edge Concentrator -->
        <mxCell id="node_vpn_concentrator" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;Carrier Interconnect IPsec Concentrator&lt;/b&gt;&lt;br&gt;&lt;span style='color:#34d399; font-size:10px; font-family:monospace;'&gt;[IKEv2 / IPsec ESP (AES-256-GCM / SHA-384)]&lt;br&gt;Dual Redundant Cryptographic Tunnel Endpoints&lt;br&gt;BGP Peering: AS65010 &lt;-&gt; AS65020&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_vpn};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="590" y="630" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- Real-time Event Queue & Last-Gasp Buffer -->
        <mxCell id="node_event_queue" value="&lt;b style='font-size:13px; color:#ef4444;'&gt;Real-Time High-Priority Event Bus&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;Last-Gasp Power Outage Broadcasts (&amp;lt;2 sec SLA)&lt;br&gt;&lt;font color='#f87171'&gt;Under/Over-Voltage Alarms • Tamper Triggers&lt;/font&gt;&lt;br&gt;Message Queue: Apache Kafka Cluster (Partitioned by NMI)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#ef4444;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="820" width="420" height="90" as="geometry" />
        </mxCell>

        <!-- Scheduled Interval Ingestion Buffer -->
        <mxCell id="node_batch_queue" value="&lt;b style='font-size:13px; color:#38bdf8;'&gt;Scheduled Bulk 30-Min Ingestion Broker&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px;'&gt;DLMS/COSEM Push Messages &amp; Nightly Polling Sweeps&lt;br&gt;Daily Ingestion Throughput: 33.6 Million Interval Records/Day&lt;br&gt;Protocol: AMQP / RabbitMQ Clustered Ingress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="960" width="420" height="90" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 3: HEAD-END & IDMZ (PURDUE L3/L3.5) ==================== -->
        <mxCell id="zone_headend" value="&lt;b style='color:#10b981; font-size:14px;'&gt;ZONE 3: AMI HEAD-END OPERATIONS &amp; IDMZ (PURDUE L3/L3.5)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:11px;'&gt;NER Rule 7.3 Metering Coordinator • Next-Gen Firewalls • VEE Processing • MDMS Master Database&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.7);strokeColor=#059669;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1080" y="140" width="500" height="1100" as="geometry" />
        </mxCell>

        <!-- Next-Gen Perimeter Firewall Pair -->
        <mxCell id="node_idmz_fw" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;IDMZ Next-Gen Perimeter Firewalls (HA Pair)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#34d399; font-size:10px; font-family:monospace;'&gt;[Palo Alto / Fortinet Active-Passive Cluster]&lt;br&gt;Stateful Inspection • DLMS/COSEM Protocol Decoding&lt;br&gt;Intrusion Prevention (IPS) • Zero Trust Network Access&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_firewall};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1120" y="210" width="420" height="130" as="geometry" />
        </mxCell>

        <!-- AMI Head-End System (HES) Front-End Processors -->
        <mxCell id="node_hes_fep" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;AMI Head-End System (HES) FEP Cluster&lt;/b&gt;&lt;br&gt;&lt;span style='color:#10b981; font-size:10px; font-family:monospace;'&gt;[Intellihub HES Enterprise Platform]&lt;br&gt;Device Discovery • OTA Firmware Cryptographic Signing&lt;br&gt;HSM Key Vault • AES-128 GCM Session Termination (Port 4059)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_fep};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1120" y="380" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- VEE Engine (Validation, Editing, Estimation) -->
        <mxCell id="node_vee_engine" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;VEE Engine (Validation, Editing &amp; Estimation)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#38bdf8; font-size:10px;'&gt;AEMO Metrology Procedure Compliance Validation&lt;br&gt;&lt;font color='#94a3b8'&gt;Interval Gap Detection • Suspect Data Flagging (High/Low Check)&lt;br&gt;Clock Drift Correction (GPS Synchronized &amp;lt;100ms)&lt;/font&gt;&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;strokeWidth=2;align=center;verticalAlign=middle;imageAlign=left;imageVerticalAlign=middle;imageWidth=36;imageHeight=36;image={icon_server};spacingLeft=45;" vertex="1" parent="1">
          <mxGeometry x="1120" y="550" width="420" height="95" as="geometry" />
        </mxCell>

        <!-- MDMS Master Database & Aggregation Cluster -->
        <mxCell id="node_mdms_db" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;MDMS Historical Database &amp; Data Warehouse&lt;/b&gt;&lt;br&gt;&lt;span style='color:#38bdf8; font-size:10px; font-family:monospace;'&gt;[PostgreSQL TimescaleDB / Oracle RAC Cluster]&lt;br&gt;NMI Historical Master Records • 700k Multi-Year Profiles&lt;br&gt;Billing Aggregation Engine • 5-min/30-min NEM Settlement Vault&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_database};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1120" y="680" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- Remote Service Order Command Dispatcher -->
        <mxCell id="node_service_dispatcher" value="&lt;b style='font-size:13px; color:#fb7185;'&gt;Remote Service Order Command Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style='color:#f43f5e; font-size:10px; font-family:monospace;'&gt;[B2B Service Switch Order Management Engine]&lt;br&gt;Cryptographically Signed Connect/Disconnect Commands&lt;br&gt;Automated Execution Audit Log &amp; Safety Proof Verification&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f43f5e;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1120" y="850" width="420" height="90" as="geometry" />
        </mxCell>

        <!-- Core Layer 3 Switch Fabric -->
        <mxCell id="node_headend_switch" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;AMI Core L3 10GbE Switch Fabric (VLAN Trunks)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px; font-family:monospace;'&gt;VLAN 100 (Ingress) • VLAN 200 (MDMS DB) • VLAN 300 (DERMS) • VLAN 400 (B2B)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#64748b;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=8;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_switch};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1120" y="980" width="420" height="110" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 4: ENTERPRISE, DERMS & MARKET B2B (PURDUE L4) ==================== -->
        <mxCell id="zone_enterprise" value="&lt;b style='color:#f59e0b; font-size:14px;'&gt;ZONE 4: ENTERPRISE, DERMS &amp; AEMO MARKET (PURDUE L4)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:11px;'&gt;Endeavour Energy Distribution Network • Flexible Exports Coordination • AEMO NEM B2B • Customer Mobile Engagement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.7);strokeColor=#d97706;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1620" y="140" width="540" height="1100" as="geometry" />
        </mxCell>

        <!-- DERMS & Flexible Exports Controller -->
        <mxCell id="node_derms" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;DERMS &amp; Flexible Exports Grid Controller&lt;/b&gt;&lt;br&gt;&lt;span style='color:#fbbf24; font-size:10px; font-family:monospace;'&gt;[Distributed Energy Resource Management System]&lt;br&gt;Dynamic Solar Export Algorithms (5kW Base -&gt; 10kW Dynamic)&lt;br&gt;Distribution Substation Transformer Capacity Optimization&lt;br&gt;Real-Time Low Voltage (LV) Reverse Power Flow Mitigation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_derms};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1660" y="210" width="460" height="140" as="geometry" />
        </mxCell>

        <!-- ADMS / Outage Management System (OMS) -->
        <mxCell id="node_adms_oms" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;ADMS / Outage Management System (OMS)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#38bdf8; font-size:10px; font-family:monospace;'&gt;[Advanced Distribution Management System]&lt;br&gt;Low-Voltage (LV) Network Topology Visibility (700k Points)&lt;br&gt;Automated Fault &amp; Outage Scope Pinpointing via Last-Gasp&lt;br&gt;Phase Balancing &amp; Power Quality Analytics (Volt/Var Control)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#0284c7;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_oms};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1660" y="410" width="460" height="140" as="geometry" />
        </mxCell>

        <!-- AEMO Market B2B Interface & Retailer Gateway -->
        <mxCell id="node_market_b2b" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;AEMO Market B2B Gateway &amp; Retailer Portal&lt;/b&gt;&lt;br&gt;&lt;span style='color:#c084fc; font-size:10px; font-family:monospace;'&gt;[National Electricity Market (NEM) Settlement Gateway]&lt;br&gt;Retailer Interval Data Delivery (MSATS / aseXML standard)&lt;br&gt;B2B Service Orders: Remote Disconnect / Reconnect Requests&lt;br&gt;Customer Transfer &amp; Change of Retailer Processing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_market};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1660" y="610" width="460" height="140" as="geometry" />
        </mxCell>

        <!-- Customer Mobile Energy App & Portal -->
        <mxCell id="node_customer_portal" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;Customer Web Portal &amp; Mobile Energy App&lt;/b&gt;&lt;br&gt;&lt;span style='color:#34d399; font-size:10px; font-family:monospace;'&gt;[Endeavour Energy Customer Engagement Platform]&lt;br&gt;24-Hour Interval Consumption &amp; Solar Export Visualizer&lt;br&gt;Dynamic Time-of-Use Pricing &amp; Bill Forecasting Alerts&lt;br&gt;Neighborhood Grid Health &amp; Outage Restoration Tracker&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;strokeWidth=2;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=44;imageHeight=44;image={icon_portal};spacingTop=50;" vertex="1" parent="1">
          <mxGeometry x="1660" y="810" width="460" height="140" as="geometry" />
        </mxCell>

        <!-- Network Operations SIEM / SOC Center -->
        <mxCell id="node_soc_siem" value="&lt;b style='font-size:13px; color:#f8fafc;'&gt;OT Security Operations Center (SOC) &amp; SIEM&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:10px; font-family:monospace;'&gt;Splunk / Microsoft Sentinel OT Threat Monitoring&lt;br&gt;Real-Time Tamper Detection • Firmware Anomaly Alerts • IEC 62443 Compliance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#64748b;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=8;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_siem};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1660" y="990" width="460" height="100" as="geometry" />
        </mxCell>


        <!-- ==================== NETWORK CONNECTIONS & EXPLICIT CONDUITS ==================== -->

        <!-- 1. Solar Inverter to Smart Meter Metrology (Bidirectional Power Flow) -->
        <mxCell id="wire_solar_meter" value="&lt;b&gt;Bidirectional AC Feed (kW/kVAr)&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Physical Heavy Copper (230V)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=3;fontColor=#fbbf24;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_solar" target="node_meter_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 2. Meter Metrology to Controller -->
        <mxCell id="wire_elem_controller" value="&lt;b&gt;Internal SPI Bus (ADC Stream)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2;fontColor=#38bdf8;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_meter_elem" target="node_meter_controller">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 3. Meter Controller to Comms Card -->
        <mxCell id="wire_controller_comms" value="&lt;b&gt;UART / USB Internal Bus (DLMS/COSEM)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;fontColor=#c084fc;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_meter_controller" target="node_meter_comms">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. Meter Comms Card to LTE Cellular Tower -->
        <mxCell id="wire_comms_lte" value="&lt;b&gt;LTE Cat-M1 RF Carrier&lt;/b&gt;&lt;br&gt;&lt;font color='#c084fc'&gt;Band 28 (700MHz) • AES-128 DLMS&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2.5;fontColor=#c084fc;fontSize=10;exitX=1;exitY=0.3;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_meter_comms" target="node_cell_tower">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 5. Meter Comms Card to Wi-SUN Mesh Gateway -->
        <mxCell id="wire_comms_wisun" value="&lt;b&gt;Wi-SUN Sub-GHz RF Mesh&lt;/b&gt;&lt;br&gt;&lt;font color='#c084fc'&gt;915MHz Multi-Hop (IEEE 802.15.4g)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2.5;fontColor=#c084fc;fontSize=10;exitX=1;exitY=0.7;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_meter_comms" target="node_wisun_router">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 6. LTE Tower to IPsec VPN Concentrator -->
        <mxCell id="wire_cell_vpn" value="&lt;b&gt;Carrier Private VRF Interconnect&lt;/b&gt;&lt;br&gt;&lt;font color='#a855f7'&gt;10.240.0.0/16 Transit APN Trunk&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2.5;fontColor=#c084fc;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_cell_tower" target="node_vpn_concentrator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 7. Wi-SUN Router to IPsec VPN Concentrator -->
        <mxCell id="wire_wisun_vpn" value="&lt;b&gt;Substation Fiber Backhaul&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;fontColor=#c084fc;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_wisun_router" target="node_vpn_concentrator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 8. VPN Concentrator to IDMZ Firewalls (Encrypted Transit Channel) -->
        <mxCell id="wire_vpn_fw" value="&lt;b&gt;Dual Encrypted IPsec Tunnel (AES-256)&lt;/b&gt;&lt;br&gt;&lt;font color='#34d399'&gt;BGP Peered Transit Conduit (Ports 500/4500)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=3;fontColor=#34d399;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_vpn_concentrator" target="node_idmz_fw">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 9. IDMZ Firewall to HES FEP (Decrypted Ingestion) -->
        <mxCell id="wire_fw_hes" value="&lt;b&gt;DLMS/COSEM Port 4059 Ingress&lt;/b&gt;&lt;br&gt;&lt;font color='#10b981'&gt;VLAN 100 (HES Ingestion Trunk)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2.5;fontColor=#34d399;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_idmz_fw" target="node_hes_fep">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 10. HES FEP to VEE Engine (Raw 30-min Records) -->
        <mxCell id="wire_hes_vee" value="&lt;b&gt;Raw 30-Min Telemetry Stream&lt;/b&gt;&lt;br&gt;&lt;font color='#38bdf8'&gt;gRPC / TCP High-Speed Bus&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2.5;fontColor=#38bdf8;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_hes_fep" target="node_vee_engine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 11. VEE Engine to MDMS Database -->
        <mxCell id="wire_vee_mdms" value="&lt;b&gt;Validated Interval Records (Cleaned)&lt;/b&gt;&lt;br&gt;&lt;font color='#38bdf8'&gt;PostgreSQL Batch Ingest (VLAN 200)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2.5;fontColor=#38bdf8;fontSize=9;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_vee_engine" target="node_mdms_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 12. Real-time Event Queue to ADMS/OMS (Critical Last-Gasp Outage Path) -->
        <mxCell id="wire_event_adms" value="&lt;b&gt;Last-Gasp Outage Alarms (&amp;lt;2s)&lt;/b&gt;&lt;br&gt;&lt;font color='#f87171'&gt;Kafka Consumer Stream -&gt; OMS&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#ef4444;strokeWidth=2.5;fontColor=#f87171;fontSize=9;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_event_queue" target="node_adms_oms">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1050" y="865" />
              <mxPoint x="1050" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 13. MDMS to DERMS (Dynamic Export & Volt/Var Analytics) -->
        <mxCell id="wire_mdms_derms" value="&lt;b&gt;Aggregate Export Telemetry &amp; Transformer Load&lt;/b&gt;&lt;br&gt;&lt;font color='#fbbf24'&gt;Real-Time Rest API / Kafka Event Hub (VLAN 300)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2.5;fontColor=#fbbf24;fontSize=10;exitX=1;exitY=0.3;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_derms">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 14. DERMS Dynamic Export Command loop back to Field Inverter -->
        <mxCell id="wire_derms_solar" value="&lt;b&gt;Dynamic Solar Export Limit Control (5-10kW Curve)&lt;/b&gt;&lt;br&gt;&lt;font color='#fbbf24'&gt;Downlink Curtailment Broadcast via AMI HES Channel&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2;strokeDasharray=4 4;fontColor=#fbbf24;fontSize=9;exitX=0.5;exitY=0;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_derms" target="node_solar">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1890" y="180" />
              <mxPoint x="530" y="180" />
              <mxPoint x="530" y="270" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 15. MDMS to AEMO B2B Gateway (NEM Market Settlements) -->
        <mxCell id="wire_mdms_market" value="&lt;b&gt;Validated 30-min NEM Settlement Feed&lt;/b&gt;&lt;br&gt;&lt;font color='#c084fc'&gt;aseXML / MSATS Standard Transaction Delivery&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2.5;fontColor=#c084fc;fontSize=10;exitX=1;exitY=0.6;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_market_b2b">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 16. AEMO B2B / Retailer Order to Service Command Dispatcher -->
        <mxCell id="wire_market_dispatcher" value="&lt;b&gt;Retailer Remote Disconnect / Reconnect Service Order&lt;/b&gt;&lt;br&gt;&lt;font color='#fb7185'&gt;B2B Schema with NMI Target &amp; Reason Code&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f43f5e;strokeWidth=2.5;fontColor=#fb7185;fontSize=9;exitX=0;exitY=0.8;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_market_b2b" target="node_service_dispatcher">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 17. Service Command Dispatcher to Smart Meter Contactor Switch (High-Risk Cross-Zone Command) -->
        <mxCell id="wire_dispatcher_switch" value="&lt;b&gt;Cryptographically Signed Remote Trip/Close Command (AES-128 Auth)&lt;/b&gt;&lt;br&gt;&lt;font color='#fb7185'&gt;Downlink via HES FEP -&gt; IPsec Carrier -&gt; Meter Contactor&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f43f5e;strokeWidth=3;strokeDasharray=6 3;fontColor=#fb7185;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_service_dispatcher" target="node_meter_switch">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1060" y="895" />
              <mxPoint x="1060" y="697" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 18. MDMS to Customer Energy Portal -->
        <mxCell id="wire_mdms_customer" value="&lt;b&gt;24-Hour Consumer Usage Publish&lt;/b&gt;&lt;br&gt;&lt;font color='#34d399'&gt;REST API / GraphQL Feed (mTLS)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2.5;fontColor=#34d399;fontSize=10;exitX=1;exitY=0.9;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_customer_portal">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 19. All Systems to OT SOC SIEM (Syslog & NetFlow) -->
        <mxCell id="wire_headend_soc" value="&lt;b&gt;Syslog, NetFlow &amp; TLS Handshake Telemetry&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;strokeDasharray=2 2;fontColor=#94a3b8;fontSize=8;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_headend_switch" target="node_soc_siem">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

with open(output_drawio, "w", encoding="utf-8") as f:
    f.write(xml)

print(f"Successfully generated network diagram Draw.io XML: {output_drawio}")
