import os, xml.etree.ElementTree as ET

output_dir = "/Users/jimmcknney/oxot_website_public_sept/new_material_source/CDT_BESS_Power_Designs/Smart Meters"
os.makedirs(output_dir, exist_ok=True)
drawio_file = os.path.join(output_dir, "smart_meter_ami_architecture.drawio")
svg_file = os.path.join(output_dir, "smart_meter_ami_architecture.svg")

# Draw.io XML definition with modern industrial dark-mode styling
drawio_xml = """<mxfile host="app.diagrams.net" modified="2026-08-26T17:00:00.000Z" agent="OXOT AI Engine" version="24.7.5" type="device">
  <diagram id="smart_meter_ami_arch" name="Endeavour Energy Smart Meter & AMI Architecture">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1700" pageHeight="1100" background="#090d16" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Title Banner -->
        <mxCell id="title_banner" value="&lt;b style='font-size:18px; color:#f8fafc;'&gt;ENDEAVOUR ENERGY — ADVANCED METERING INFRASTRUCTURE (AMI) &amp; SMART METER TOPOLOGY&lt;/b&gt;&lt;br&gt;&lt;span style='color:#94a3b8; font-size:12px;'&gt;IEC 62443 Zone Segmentation • DLMS/COSEM (IEC 62056) • NER Rule 7.3 Compliance • DERMS &amp; Flexible Exports Integration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#334155;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="30" width="1620" height="70" as="geometry" />
        </mxCell>

        <!-- ZONE 1: Customer Premises / Field Layer (Purdue Level 0/1) -->
        <mxCell id="zone_field" value="&lt;b style='color:#38bdf8;'&gt;ZONE 1: FIELD LAYER / CUSTOMER PREMISES (PURDUE L0/L1)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:10px;'&gt;700,000 Monitoring Points • NMI Addressing • Physical Security &amp; Tamper Detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.6);strokeColor=#0284c7;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="130" width="460" height="880" as="geometry" />
        </mxCell>

        <!-- Customer Solar / Inverter -->
        <mxCell id="solar_pv" value="&lt;b&gt;Residential Solar PV / Inverter&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;5kW Base / Up to 10kW Flexible Export&lt;br&gt;Dynamic Curtailment via Smart Meter&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;strokeWidth=2;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="70" y="190" width="400" height="70" as="geometry" />
        </mxCell>

        <!-- Smart Meter Enclosure (Type 4 Intellihub) -->
        <mxCell id="smart_meter" value="&lt;b style='font-size:14px;'&gt;Type 4 Smart Meter (Intellihub Modular)&lt;/b&gt;&lt;br&gt;&lt;font color='#38bdf8'&gt;NMI: 10-11 Digit Unique Connection ID&lt;/font&gt;&lt;br&gt;&lt;font color='#cbd5e1'&gt;NER Rule 7.3 Compliant • Sub-second sampling • 30-min Interval Aggregation&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0f172a;strokeColor=#0284c7;strokeWidth=2;align=center;verticalAlign=top;spacingTop=10;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="70" y="300" width="400" height="520" as="geometry" />
        </mxCell>

        <!-- Metering Element -->
        <mxCell id="metering_elem" value="&lt;b&gt;Primary Metering Element&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Active Power (kW) • Reactive (kVAr)&lt;br&gt;Voltage (V) • Current (A) • Frequency (Hz)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="95" y="370" width="350" height="65" as="geometry" />
        </mxCell>

        <!-- Metering Module / NVRAM Storage -->
        <mxCell id="metering_module" value="&lt;b&gt;Metering Module (Registers &amp; NVRAM)&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;90-Day Local Interval Data Buffer&lt;br&gt;Event &amp; Tamper Logs • Power Quality History&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="95" y="455" width="350" height="65" as="geometry" />
        </mxCell>

        <!-- Meter Controller & Crypto Core -->
        <mxCell id="meter_controller" value="&lt;b&gt;Meter Controller &amp; Security Engine&lt;/b&gt;&lt;br&gt;&lt;font color='#4ade80'&gt;DLMS/COSEM (IEC 62056) • AES-128 Encryption&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Session Auth • Key Management • Command Execution&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#22c55e;strokeWidth=2;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="95" y="540" width="350" height="75" as="geometry" />
        </mxCell>

        <!-- Remote Service Switch -->
        <mxCell id="service_switch" value="&lt;b&gt;Remote Service Disconnect Switch&lt;/b&gt;&lt;br&gt;&lt;font color='#f43f5e'&gt;Remotely Operable Service Switch (Connect/Disconnect)&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Safety Interlocks: Wiring Fault &amp; Voltage Verification&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f43f5e;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="95" y="635" width="350" height="65" as="geometry" />
        </mxCell>

        <!-- Modular Comms Swappable Card -->
        <mxCell id="comms_card" value="&lt;b&gt;Modular Swappable Comms Card&lt;/b&gt;&lt;br&gt;&lt;font color='#a855f7'&gt;LTE Cat-M1 • Wi-SUN Mesh (802.15.4g) • Wi-Fi&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Hardware Upgradable (e.g. 3G -&gt; Cat-M1)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="95" y="720" width="350" height="70" as="geometry" />
        </mxCell>

        <!-- Customer Home Load -->
        <mxCell id="customer_load" value="&lt;b&gt;Customer Load &amp; Sub-Circuits&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Residential / Commercial Consumption (230V/400V)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#475569;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="70" y="850" width="400" height="55" as="geometry" />
        </mxCell>

        <!-- ZONE 2: Field Communication & Carrier Network -->
        <mxCell id="zone_telecom" value="&lt;b style='color:#a855f7;'&gt;ZONE 2: FIELD TELECOM &amp; CARRIER TRANSIT (PURDUE L2/L3)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:10px;'&gt;Multi-Bearer Redundancy • Encrypted WAN • Daily Bulk Uploads &amp; Real-time Alarms&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.6);strokeColor=#9333ea;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="540" y="130" width="360" height="880" as="geometry" />
        </mxCell>

        <!-- Cellular Gateway (LTE Cat-M1) -->
        <mxCell id="lte_gateway" value="&lt;b&gt;LTE Cat-M1 Cellular Carrier APN&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Direct Carrier Private APN • IPsec Tunnel&lt;br&gt;Used for Rural / Suburban Point-to-Point&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="570" y="240" width="300" height="80" as="geometry" />
        </mxCell>

        <!-- Wi-SUN Mesh Field Area Network (FAN) -->
        <mxCell id="wisun_mesh" value="&lt;b&gt;Wi-SUN Mesh RF Collector Gateway&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;IEEE 802.15.4g Sub-GHz Mesh • Dense Urban&lt;br&gt;Pole-top Collector Gateway -&gt; Fiber Backhaul&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="570" y="440" width="300" height="80" as="geometry" />
        </mxCell>

        <!-- Event & Alarm Engine -->
        <mxCell id="event_stream" value="&lt;b&gt;Real-time Event &amp; Alarm Handler&lt;/b&gt;&lt;br&gt;&lt;font color='#ef4444'&gt;Last-Gasp Outage Alarms • Tamper Alerts&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Over/Under-Voltage &amp; Power Quality Alarms&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#ef4444;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="570" y="640" width="300" height="80" as="geometry" />
        </mxCell>

        <!-- Scheduled Interval Ingestion Queue -->
        <mxCell id="ingest_queue" value="&lt;b&gt;Bulk 30-Min Interval Ingestion Queue&lt;/b&gt;&lt;br&gt;&lt;font color='#38bdf8'&gt;DLMS/COSEM Push Messages • Nightly Polling&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;High-Throughput Message Broker (Kafka/RabbitMQ)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="570" y="800" width="300" height="80" as="geometry" />
        </mxCell>

        <!-- ZONE 3: Metering Coordinator & Head-End Operations (Purdue Level 3/3.5 DMZ) -->
        <mxCell id="zone_headend" value="&lt;b style='color:#10b981;'&gt;ZONE 3: AMI HEAD-END &amp; METERING COORDINATOR (NER RULE 7.3)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:10px;'&gt;Intellihub Managed Platform • VEE Engine • Service Order Management&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.6);strokeColor=#059669;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="940" y="130" width="340" height="880" as="geometry" />
        </mxCell>

        <!-- AMI Head-End Server -->
        <mxCell id="ami_headend" value="&lt;b style='font-size:13px;'&gt;AMI Head-End System (HES)&lt;/b&gt;&lt;br&gt;&lt;font color='#10b981'&gt;Device Discovery • Firmware Management&lt;br&gt;Key Vault • AES-128 Session Broker&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;strokeWidth=2;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="965" y="240" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- Validation, Editing, and Estimation (VEE) -->
        <mxCell id="vee_engine" value="&lt;b&gt;VEE Engine (Validation, Editing &amp; Est.)&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Gap Detection • Suspect Data Flagging&lt;br&gt;Time-sync Clock Drift Correction&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="965" y="440" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- Meter Data Management System (MDMS) -->
        <mxCell id="mdms_core" value="&lt;b&gt;MDMS (Meter Data Management)&lt;/b&gt;&lt;br&gt;&lt;font color='#38bdf8'&gt;NMI Historical Master Database&lt;br&gt;Billing Load Profiles • Aggregation Engine&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#38bdf8;strokeWidth=2;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="965" y="640" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- Remote Service Order Dispatcher -->
        <mxCell id="service_dispatcher" value="&lt;b&gt;Service Order Queue Dispatcher&lt;/b&gt;&lt;br&gt;&lt;font color='#f43f5e'&gt;Connect / Disconnect Command Queue&lt;/font&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Execution Verification &amp; Audit Logging&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f43f5e;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="965" y="800" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- ZONE 4: Enterprise, DERMS & Market Interfaces (Purdue Level 4) -->
        <mxCell id="zone_enterprise" value="&lt;b style='color:#f59e0b;'&gt;ZONE 4: ENTERPRISE, DERMS &amp; MARKET INTERFACES (PURDUE L4)&lt;/b&gt;&lt;br&gt;&lt;span style='color:#64748b; font-size:10px;'&gt;Endeavour Energy Distribution Network • AEMO B2B • Retailer &amp; Customer Portals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=rgba(15, 23, 42, 0.6);strokeColor=#d97706;strokeWidth=2;strokeDasharray=4 4;align=left;verticalAlign=top;spacingLeft=15;spacingTop=10;" vertex="1" parent="1">
          <mxGeometry x="1320" y="130" width="340" height="880" as="geometry" />
        </mxCell>

        <!-- DERMS & Flexible Exports -->
        <mxCell id="derms_sys" value="&lt;b style='font-size:13px;'&gt;DERMS &amp; Flexible Exports Controller&lt;/b&gt;&lt;br&gt;&lt;font color='#f59e0b'&gt;Dynamic Solar Export Calculations (5-10kW)&lt;br&gt;Substation Transformer Capacity Balancing&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#f59e0b;strokeWidth=2;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="1345" y="240" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- ADMS / Network Operations (Outage Management) -->
        <mxCell id="adms_ops" value="&lt;b&gt;ADMS / Outage Management (OMS)&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;Low-Voltage (LV) Visibility • Phase Balancing&lt;br&gt;Automated Fault &amp; Outage Pinpointing&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#0284c7;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="1345" y="440" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- AEMO B2B / Retailer Market Portal -->
        <mxCell id="market_b2b" value="&lt;b&gt;AEMO Market B2B Gateway&lt;/b&gt;&lt;br&gt;&lt;font color='#94a3b8'&gt;National Electricity Market (NEM) Settlements&lt;br&gt;Retailer Billing &amp; Disconnect Requests&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#a855f7;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="1345" y="640" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- Customer Web Portal & App -->
        <mxCell id="customer_app" value="&lt;b&gt;Customer Energy Portal &amp; App&lt;/b&gt;&lt;br&gt;&lt;font color='#10b981'&gt;Daily Interval Consumption Graphs&lt;br&gt;Time-of-Use Signals &amp; Solar Export Data&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1e293b;strokeColor=#10b981;fontColor=#f8fafc;" vertex="1" parent="1">
          <mxGeometry x="1345" y="800" width="290" height="80" as="geometry" />
        </mxCell>

        <!-- CONNECTORS & DATA FLOWS -->
        
        <!-- Solar to Meter -->
        <mxCell id="flow_solar_meter" value="Bidirectional Power Flow (kW/kVAr)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2;fontColor=#f59e0b;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="solar_pv" target="smart_meter">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Comms Card to LTE -->
        <mxCell id="flow_meter_lte" value="DLMS/COSEM over Cat-M1 (Encrypted)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;fontColor=#c084fc;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="comms_card" target="lte_gateway">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Comms Card to Wi-SUN -->
        <mxCell id="flow_meter_wisun" value="RF Mesh 802.15.4g" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#a855f7;strokeWidth=2;fontColor=#c084fc;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="comms_card" target="wisun_mesh">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Telecom to AMI Head-End -->
        <mxCell id="flow_lte_hes" value="Secure IPsec WAN Tunnel" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;fontColor=#34d399;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="lte_gateway" target="ami_headend">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="flow_wisun_hes" value="Backhaul Transit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;fontColor=#34d399;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="wisun_mesh" target="vee_engine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- HES to VEE -->
        <mxCell id="flow_hes_vee" value="Raw 30-Min Records" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;fontColor=#34d399;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="ami_headend" target="vee_engine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- VEE to MDMS -->
        <mxCell id="flow_vee_mdms" value="Validated Interval Data" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38bdf8;strokeWidth=2;fontColor=#38bdf8;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="vee_engine" target="mdms_core">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- MDMS to DERMS -->
        <mxCell id="flow_mdms_derms" value="Export Aggregation &amp; Volt/Var Data" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f59e0b;strokeWidth=2;fontColor=#fbbf24;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="mdms_core" target="derms_sys">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Event Stream to ADMS -->
        <mxCell id="flow_event_adms" value="Last-Gasp &amp; Power Quality Alarms" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#ef4444;strokeWidth=2;fontColor=#f87171;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="event_stream" target="adms_ops">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Market B2B to Service Dispatcher -->
        <mxCell id="flow_b2b_service" value="Retailer Disconnect Order" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f43f5e;strokeWidth=2;fontColor=#fb7185;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="market_b2b" target="service_dispatcher">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Service Dispatcher to Meter Switch -->
        <mxCell id="flow_dispatch_switch" value="Remote Trip/Close Command (AES-128 Auth)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#f43f5e;strokeWidth=2;fontColor=#fb7185;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="service_dispatcher" target="service_switch">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- MDMS to Customer Portal -->
        <mxCell id="flow_mdms_customer" value="Daily Billing &amp; Usage Publish" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;strokeWidth=2;fontColor=#34d399;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="mdms_core" target="customer_app">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

with open(drawio_file, "w", encoding="utf-8") as f:
    f.write(drawio_xml)

print(f"Generated Draw.io XML file: {drawio_file}")
