import os
import base64

base_svg_dir = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/asset_icons/components_svg"
drawio_lib_dir = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/asset_icons_drawio/libraries"

def get_svg_uri(path):
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"

icon_meter = get_svg_uri(os.path.join(base_svg_dir, "ied.svg"))
icon_inverter = get_svg_uri(os.path.join(drawio_lib_dir, "electrical/inductors/outdoor_metering_device.svg"))
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
icon_siem = get_svg_uri(os.path.join(base_svg_dir, "security_information_and_event_management_system.svg"))

output_drawio = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/CDT_BESS_Power_Designs/Smart Meters/smart_meter_ami_architecture.drawio"

# Engineering Palette: Dark Charcoal Background, White & Muted Slate Grey, Minimal Strategic Accents
BG_DARK = "#0d1117"
PANEL_BG = "rgba(22, 27, 34, 0.85)"
CARD_BG = "#161b22"
CARD_STROKE = "#30363d"
SUB_CARD_BG = "#0d1117"
SUB_CARD_STROKE = "#21262d"

TEXT_PRIMARY = "#f0f6fc"
TEXT_SECONDARY = "#8b949e"
TEXT_MUTED = "#6e7681"

# Limited Engineering Accents
ACCENT_GREEN = "#3fb950"     # Cryptographic / Security / Closed state
ACCENT_AMBER = "#d29922"     # Power Flow & DERMS

xml = f"""<mxfile host="app.diagrams.net" modified="2026-08-26T17:45:00.000Z" agent="OXOT Generic Reference Architecture Engine" version="24.7.5" type="device">
  <diagram id="ami_net_topology_ref" name="Smart Meter &amp; AMI Reference Architecture">
    <mxGraphModel dx="2000" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2200" pageHeight="1300" background="{BG_DARK}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="net_header" value="&lt;b style='font-size:18px; color:{TEXT_PRIMARY}; letter-spacing:1px;'&gt;ADVANCED METERING INFRASTRUCTURE (AMI) &amp; SMART GRID DISTRIBUTION — REFERENCE ARCHITECTURE&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:11px; font-family:monospace;'&gt;STANDARDS: IEC 62443 (ZONES &amp; CONDUITS) • IEC 62056 (DLMS/COSEM) • IEEE 2030.5 • PURDUE L0-L4 SEGMENTATION • DERMS INTEGRATION&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="30" width="2120" height="75" as="geometry" />
        </mxCell>

        <!-- ==================== ZONE 1: FIELD LAYER (PURDUE L0/L1) ==================== -->
        <mxCell id="zone_field" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:13px; font-family:monospace;'&gt;[ZONE 1] FIELD EDGE &amp; PREMISES (PURDUE L0/L1)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;GRID CONNECTION POINTS • SUB-SECOND SAMPLING • 30-MIN INTERVAL NVRAM LOGGING • BIDIRECTIONAL METROLOGY&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={PANEL_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="40" y="130" width="480" height="1120" as="geometry" />
        </mxCell>

        <!-- Solar Inverter -->
        <mxCell id="node_solar" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Distributed Energy Resource (DER) / Solar Inverter&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Protocol: Modbus-TCP / SunSpec • Port: 502&lt;br&gt;Profile: Base Allocation / Dynamic Operating Envelope (DOE)&lt;br&gt;&lt;font color='{ACCENT_AMBER}'&gt;Dynamic Curtailment &amp; Volt/Var Support Active&lt;/font&gt;&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_inverter};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="70" y="200" width="420" height="120" as="geometry" />
        </mxCell>

        <!-- Smart Meter Chassis -->
        <mxCell id="node_meter_box" value="&lt;b style='font-size:13px; color:{TEXT_PRIMARY}; font-family:monospace;'&gt;Modular Type 4 Advanced Smart Meter&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;Unique Connection Identifier • IEC 62056-5-3 Compliant • Class 0.5 Metrology&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={SUB_CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="70" y="355" width="420" height="690" as="geometry" />
        </mxCell>

        <!-- Metrology Core -->
        <mxCell id="node_meter_elem" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;Primary Metrology Core&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Voltage (V), Current (A), Power Factor (PF), Frequency (Hz)&lt;br&gt;True RMS Sampling @ 4 kHz • 4-Quadrant (kW / kVAr)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="420" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Controller & Security Engine -->
        <mxCell id="node_meter_controller" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;Meter Controller &amp; Cryptographic Core&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;DLMS/COSEM Object Dictionary • &lt;font color='{ACCENT_GREEN}'&gt;AES-128-GCM Session Auth&lt;/font&gt;&lt;br&gt;90-Day Non-Volatile Memory (NVRAM) Storage Ring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;imageAlign=left;imageVerticalAlign=middle;imageWidth=32;imageHeight=32;image={icon_meter};spacingLeft=40;" vertex="1" parent="1">
          <mxGeometry x="95" y="520" width="370" height="90" as="geometry" />
        </mxCell>

        <!-- Motorized Service Switch -->
        <mxCell id="node_meter_switch" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;Remote Service Disconnect Contactor (UC3)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Motorized Breaking Contactor • State: &lt;font color='{ACCENT_GREEN}'&gt;CLOSED&lt;/font&gt;&lt;br&gt;Safety Interlocks: Neutral Continuity &amp; Downstream Voltage Check&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="635" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Modular Comms Card -->
        <mxCell id="node_meter_comms" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;Modular Swappable Transceiver Card&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Dual Path: Cellular LTE Cat-M1 eSIM + Sub-GHz RF Mesh&lt;br&gt;Transit IP: Private APN Subnet / IPv6 6LoWPAN Mesh&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="735" width="370" height="75" as="geometry" />
        </mxCell>

        <!-- Local Maintenance Optical Port -->
        <mxCell id="node_meter_optical" value="&lt;b style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;ANSI/IEC Optical Maintenance Port (Protected Field Calibration)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={SUB_CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="835" width="370" height="45" as="geometry" />
        </mxCell>

        <!-- Customer Load Board -->
        <mxCell id="node_load" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;Facility Electrical Service &amp; Distribution Board&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;Grid Connection: Low-Voltage 1-Phase / 3-Phase Main Switchboard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="70" y="1075" width="420" height="60" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 2: TELECOM TRANSIT (PURDUE L2) ==================== -->
        <mxCell id="zone_telecom" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:13px; font-family:monospace;'&gt;[ZONE 2] FIELD TELECOM &amp; CARRIER WAN (PURDUE L2)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;CARRIER VRF • ENCRYPTED IPSEC BACKHAUL • MULTI-BEARER REDUNDANCY&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={PANEL_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="560" y="130" width="480" height="1120" as="geometry" />
        </mxCell>

        <!-- LTE APN Gateway -->
        <mxCell id="node_cell_tower" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Cellular LTE Cat-M1 Private APN Gateway&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Private APN Gateway • Dedicated Carrier VRF&lt;br&gt;Zero Public Internet Exposure • QoS Priority Class 1&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_cell_tower};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="590" y="210" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- Wi-SUN Mesh Gateway -->
        <mxCell id="node_wisun_router" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Wi-SUN Mesh Field Area Network (FAN)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;IEEE 802.15.4g Sub-GHz RF Mesh Collector Gateway&lt;br&gt;Pole-Top Border Router -&gt; High-Speed Fiber / WAN Backhaul&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_rf_mesh};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="590" y="410" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- IPsec VPN Gateway -->
        <mxCell id="node_vpn_concentrator" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Carrier Interconnect IPsec Concentrator&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Tunnel: IKEv2 / IPsec ESP (&lt;font color='{ACCENT_GREEN}'&gt;AES-256-GCM / SHA-384&lt;/font&gt;)&lt;br&gt;BGP Peering • Dual Redundant Cryptographic Endpoints&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_vpn};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="590" y="615" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- Real-time Outage Queue -->
        <mxCell id="node_event_queue" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Real-Time High-Priority Event Bus (Distributed)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Last-Gasp Outage Alarms (&amp;lt;2 sec SLA) • Tamper Alarms&lt;br&gt;High-Throughput Message Queue Partitioned by Endpoint ID&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="810" width="420" height="85" as="geometry" />
        </mxCell>

        <!-- Scheduled Interval Queue -->
        <mxCell id="node_batch_queue" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Bulk Interval Telemetry Ingestion Buffer&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;DLMS/COSEM Push Messages &amp; Scheduled Sweeps&lt;br&gt;Scalable Clustered Ingestion Buffer Architecture&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="950" width="420" height="85" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 3: HEAD-END & IDMZ (PURDUE L3/L3.5) ==================== -->
        <mxCell id="zone_headend" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:13px; font-family:monospace;'&gt;[ZONE 3] AMI HEAD-END OPERATIONS &amp; IDMZ (PURDUE L3/L3.5)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;METERING COORDINATION • NEXT-GEN FW • VEE ENGINE • MDMS VAULT&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={PANEL_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1080" y="130" width="500" height="1120" as="geometry" />
        </mxCell>

        <!-- Perimeter Firewall Pair -->
        <mxCell id="node_idmz_fw" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;IDMZ Next-Gen Perimeter Firewalls (HA Pair)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Stateful Inspection • DLMS Protocol Deep Packet Inspection&lt;br&gt;Port 4059 Ingress Only • Zero Trust Network Access (ZTNA)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_firewall};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1120" y="200" width="420" height="130" as="geometry" />
        </mxCell>

        <!-- AMI HES FEP Cluster -->
        <mxCell id="node_hes_fep" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;AMI Head-End System (HES) FEP Cluster&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Centralized AMI Head-End • Device Lifecycle &amp; Discovery&lt;br&gt;HSM Key Management Vault • AES-128 GCM Session Broker&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_fep};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1120" y="370" width="420" height="130" as="geometry" />
        </mxCell>

        <!-- VEE Engine -->
        <mxCell id="node_vee_engine" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:11px;'&gt;VEE Engine (Validation, Editing &amp; Estimation)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Metrology Compliance Procedures • Gap Detection &amp; Interpolation&lt;br&gt;Suspect Data Flagging • High-Precision Clock Drift Synchronization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;imageAlign=left;imageVerticalAlign=middle;imageWidth=32;imageHeight=32;image={icon_server};spacingLeft=40;" vertex="1" parent="1">
          <mxGeometry x="1120" y="540" width="420" height="90" as="geometry" />
        </mxCell>

        <!-- MDMS Database -->
        <mxCell id="node_mdms_db" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;MDMS Historical Master Database Cluster&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;High-Performance Timescale/Relational Database Cluster&lt;br&gt;Master Meter Records • Multi-Year Interval Profiles • Market Aggregator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_database};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1120" y="670" width="420" height="135" as="geometry" />
        </mxCell>

        <!-- Service Order Dispatcher -->
        <mxCell id="node_service_dispatcher" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Remote Service Order Command Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Cryptographically Signed Command Queue • Audit Trail Engine&lt;br&gt;Automated Interlock Safety Proof Verification before Switching&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1120" y="845" width="420" height="85" as="geometry" />
        </mxCell>

        <!-- Core L3 Switch Fabric -->
        <mxCell id="node_headend_switch" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;AMI Core L3 10GbE Switch Fabric (VLAN Segmentation)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;VLAN 100 (Ingress) • VLAN 200 (MDMS DB) • VLAN 300 (DERMS) • VLAN 400 (B2B)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=bottom;spacingBottom=8;imageAlign=center;imageVerticalAlign=top;imageWidth=36;imageHeight=36;image={icon_switch};spacingTop=40;" vertex="1" parent="1">
          <mxGeometry x="1120" y="970" width="420" height="110" as="geometry" />
        </mxCell>


        <!-- ==================== ZONE 4: ENTERPRISE & DERMS (PURDUE L4) ==================== -->
        <mxCell id="zone_enterprise" value="&lt;b style='color:{TEXT_PRIMARY}; font-size:13px; font-family:monospace;'&gt;[ZONE 4] ENTERPRISE, DERMS &amp; MARKET INTERFACES (PURDUE L4)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;DISTRIBUTION GRID OPERATIONS • DYNAMIC DER MANAGEMENT • WHOLESALE MARKET • CONSUMER PORTAL&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={PANEL_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=20;spacingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1620" y="130" width="540" height="1120" as="geometry" />
        </mxCell>

        <!-- DERMS -->
        <mxCell id="node_derms" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;DERMS &amp; Dynamic Grid Export Controller&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Distributed Energy Resource Management System&lt;br&gt;Dynamic Operating Envelopes (DOE) • Transformer Thermal Limits&lt;br&gt;Low-Voltage Reverse Power Flow Mitigation Algorithms&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_derms};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1660" y="200" width="460" height="135" as="geometry" />
        </mxCell>

        <!-- ADMS / OMS -->
        <mxCell id="node_adms_oms" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;ADMS / Outage Management System (OMS)&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Advanced Distribution Management System&lt;br&gt;Low-Voltage (LV) Topology Visibility &amp; Phase Load Balancing&lt;br&gt;Automated Fault Scope Pinpointing via Last-Gasp Telemetry&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_oms};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1660" y="400" width="460" height="135" as="geometry" />
        </mxCell>

        <!-- Market Gateway -->
        <mxCell id="node_market_b2b" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Energy Market Operator (EMO) B2B Gateway&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Wholesale Market Settlement Interface (Standard XML Schemas)&lt;br&gt;Retailer B2B Service Orders: Remote Disconnect / Reconnect&lt;br&gt;Standard Transaction Data Feeds &amp; Market Participant Gateway&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_market};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1660" y="600" width="460" height="135" as="geometry" />
        </mxCell>

        <!-- Customer Mobile App -->
        <mxCell id="node_customer_portal" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;Consumer Web Portal &amp; Mobile App Gateway&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_SECONDARY}; font-size:10px; font-family:monospace;'&gt;Consumer Interval Consumption &amp; Solar Export Visualizer&lt;br&gt;Dynamic Time-of-Use Signals • Outage &amp; Restoration Tracker&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=10;imageAlign=center;imageVerticalAlign=top;imageWidth=40;imageHeight=40;image={icon_portal};spacingTop=45;" vertex="1" parent="1">
          <mxGeometry x="1660" y="800" width="460" height="135" as="geometry" />
        </mxCell>

        <!-- OT SOC SIEM -->
        <mxCell id="node_soc_siem" value="&lt;b style='font-size:12px; color:{TEXT_PRIMARY};'&gt;OT Security Operations Center (SOC) &amp; SIEM&lt;/b&gt;&lt;br&gt;&lt;span style='color:{TEXT_MUTED}; font-size:10px; font-family:monospace;'&gt;Enterprise OT SIEM Platform • Tamper Anomaly Alarms&lt;br&gt;NetFlow, Syslog &amp; TLS Handshake Telemetry Ingestion&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor={CARD_BG};strokeColor={CARD_STROKE};strokeWidth=1;align=center;verticalAlign=bottom;spacingBottom=8;imageAlign=center;imageVerticalAlign=top;imageWidth=36;imageHeight=36;image={icon_siem};spacingTop=40;" vertex="1" parent="1">
          <mxGeometry x="1660" y="975" width="460" height="105" as="geometry" />
        </mxCell>


        <!-- ==================== NETWORK CONNECTIONS & CONDUITS ==================== -->

        <!-- Solar to Meter (Power Feed) -->
        <mxCell id="wire_solar_meter" value="&lt;font color='{TEXT_PRIMARY}'&gt;AC Power Feed (kW/kVAr)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=2;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_solar" target="node_meter_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Metrology to Controller -->
        <mxCell id="wire_elem_controller" value="&lt;font color='{TEXT_MUTED}'&gt;Internal SPI Bus&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_meter_elem" target="node_meter_controller">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Controller to Comms -->
        <mxCell id="wire_controller_comms" value="&lt;font color='{TEXT_MUTED}'&gt;Internal UART Bus&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_meter_controller" target="node_meter_comms">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Comms to LTE -->
        <mxCell id="wire_comms_lte" value="&lt;font color='{TEXT_PRIMARY}'&gt;Cellular LTE Cat-M1 RF&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.3;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_meter_comms" target="node_cell_tower">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Comms to Wi-SUN -->
        <mxCell id="wire_comms_wisun" value="&lt;font color='{TEXT_PRIMARY}'&gt;Wi-SUN Sub-GHz RF Mesh&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.7;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_meter_comms" target="node_wisun_router">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- LTE to VPN -->
        <mxCell id="wire_cell_vpn" value="&lt;font color='{TEXT_MUTED}'&gt;Private VRF APN Transit&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_cell_tower" target="node_vpn_concentrator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Wi-SUN to VPN -->
        <mxCell id="wire_wisun_vpn" value="&lt;font color='{TEXT_MUTED}'&gt;Substation WAN Backhaul&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_wisun_router" target="node_vpn_concentrator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- VPN to IDMZ Firewall -->
        <mxCell id="wire_vpn_fw" value="&lt;font color='{TEXT_PRIMARY}'&gt;Dual IPsec ESP Tunnel (AES-256)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_PRIMARY};strokeWidth=2;fontColor={TEXT_PRIMARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_vpn_concentrator" target="node_idmz_fw">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Firewall to HES FEP -->
        <mxCell id="wire_fw_hes" value="&lt;font color='{TEXT_SECONDARY}'&gt;Port 4059 DLMS Ingress (VLAN 100)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_idmz_fw" target="node_hes_fep">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- HES to VEE -->
        <mxCell id="wire_hes_vee" value="&lt;font color='{TEXT_MUTED}'&gt;High-Speed Telemetry Stream&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_hes_fep" target="node_vee_engine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- VEE to MDMS -->
        <mxCell id="wire_vee_mdms" value="&lt;font color='{TEXT_SECONDARY}'&gt;Validated Interval Records (VLAN 200)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_vee_engine" target="node_mdms_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Real-time Event to OMS -->
        <mxCell id="wire_event_adms" value="&lt;font color='{TEXT_PRIMARY}'&gt;Last-Gasp Outage Stream (&amp;lt;2s)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_PRIMARY};strokeWidth=1.5;fontColor={TEXT_PRIMARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_event_queue" target="node_adms_oms">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1050" y="852" />
              <mxPoint x="1050" y="467" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- MDMS to DERMS -->
        <mxCell id="wire_mdms_derms" value="&lt;font color='{TEXT_PRIMARY}'&gt;Export Telemetry &amp; Transformer Load&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.3;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_derms">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- DERMS Dynamic Export Loop Back -->
        <mxCell id="wire_derms_solar" value="&lt;font color='{TEXT_SECONDARY}'&gt;Dynamic Curtailment Broadcast (DOE Curve)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;strokeDasharray=4 4;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=0.5;exitY=0;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_derms" target="node_solar">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1890" y="170" />
              <mxPoint x="530" y="170" />
              <mxPoint x="530" y="260" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- MDMS to Market Gateway -->
        <mxCell id="wire_mdms_market" value="&lt;font color='{TEXT_PRIMARY}'&gt;Market Settlement Data Feed&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_SECONDARY};strokeWidth=1.5;fontColor={TEXT_SECONDARY};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.6;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_market_b2b">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Retailer Order to Service Dispatcher -->
        <mxCell id="wire_market_dispatcher" value="&lt;font color='{TEXT_PRIMARY}'&gt;Retailer Disconnect/Reconnect Order&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_PRIMARY};strokeWidth=1.5;fontColor={TEXT_PRIMARY};fontSize=9;fontFamily=monospace;exitX=0;exitY=0.8;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_market_b2b" target="node_service_dispatcher">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Service Dispatcher to Switch -->
        <mxCell id="wire_dispatcher_switch" value="&lt;font color='{TEXT_PRIMARY}'&gt;Signed Trip/Close Command (Cross-Zone)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={TEXT_PRIMARY};strokeWidth=2;strokeDasharray=4 2;fontColor={TEXT_PRIMARY};fontSize=9;fontFamily=monospace;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="node_service_dispatcher" target="node_meter_switch">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1060" y="887" />
              <mxPoint x="1060" y="672" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- MDMS to Customer Portal -->
        <mxCell id="wire_mdms_customer" value="&lt;font color='{TEXT_MUTED}'&gt;Consumer Portal Feed (mTLS)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1.5;fontColor={TEXT_MUTED};fontSize=9;fontFamily=monospace;exitX=1;exitY=0.9;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_mdms_db" target="node_customer_portal">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Switch Fabric to SIEM -->
        <mxCell id="wire_headend_soc" value="&lt;font color='{TEXT_MUTED}'&gt;Syslog &amp; NetFlow Mirror&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor={CARD_STROKE};strokeWidth=1;strokeDasharray=2 2;fontColor={TEXT_MUTED};fontSize=8;fontFamily=monospace;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_headend_switch" target="node_soc_siem">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

with open(output_drawio, "w", encoding="utf-8") as f:
    f.write(xml)

print(f"Generated generic reference architecture Draw.io XML: {output_drawio}")
