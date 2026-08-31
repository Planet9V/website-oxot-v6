# OXOT Cyber Digital Twin — Service Description

4 May 2026
j.mckenney

### Key Takeaway

***OXOT Cyber Digital Twin (CDT)** is a SaaS-delivered operational technology (OT) cybersecurity intelligence platform that creates a living digital replica of a customer's industrial infrastructure — facilities, equipment, network zones, and software supply chain — and continuously maps it against the global threat landscape.*

*Unlike traditional vulnerability scanners or compliance checkers, OXOT CDT synthesizes **equipment-level asset intelligence**, **real-time threat data**, **geopolitical risk correlation**, and **actuarial loss modeling** into a single, executive-ready platform. The result is a continuously updated risk posture that answers the question: "What is the probability and financial impact of a cyber attack on my specific OT infrastructure — today, and 90 days from now?"*

### 1 . Key Differentiators

| Differentiator                      | Description                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Asset-Centric Intelligence**      | Begins with the customer's actual equipment (DEXPI/ISO 15926), not generic network scans                       |
| **Predictive Risk Engine (SELDON)** | Proprietary AI that forecasts threat actor behaviour, exploit surge trajectories, and financial exposure       |
| **Dual-Database Architecture**      | Relational (PostgreSQL) + Knowledge Graph (Neo4j) enabling attack path traversal across 20+ relationship types |
| **Insurance-Grade Quantification**  | Monte Carlo loss simulation with geopolitical risk cascade (GPR) correlation — directly usable by underwriters |
| **Full-Stack Digital Twin**         | From P&ID diagrams to financial exposure in one platform — no integration tax                                  |

---

## 2. Service Modules

OXOT CDT is delivered through **8 integrated service modules**, accessible via a glassmorphic web portal organized into 9 customer-facing navigation groups.

### 2.1 My Infrastructure — Asset Digital Twin

**Purpose:** Create and maintain a faithful digital replica of the customer's OT/ICS environment.

| Capability                                        | Description                                                                                | Data Source                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| **Facility Registry**                             | Physical sites with geolocation, sector classification, and organizational hierarchy       | Customer input + deep research                                  |
| **Equipment Catalog**                             | DEXPI 2.0 / ISO 15926 compliant equipment inventory with JSONB specifications              | DEXPI XML import, manual entry, templates                       |
| **P&ID Builder**                                  | Interactive Piping & Instrumentation Diagram canvas with drag-and-drop equipment placement | Customer engineering data                                       |
| **3D Facility Builder**                           | AI-generated 3D equipment models (Tripo AI) with Babylon.js rendering                      | Automated from equipment specs                                  |
| **SBOM Registry** and Confguration and Full Stack | Software Bill of Materials per equipment item — CycloneDX and SPDX format import           | Customer software inventory, Confifugrations and Software Stack |
| **Organizational Map**                            | Visual hierarchy of divisions, facilities, systems, and security personnel                 | Customer input                                                  |

**Business Value:** Eliminates the "unknown unknowns" gap. Most industrial organizations cannot answer *"What software runs on that PLC?"* — this module ensures they can, and links every answer to the threat landscape.

---

### 2.2 Risk Posture — Security Assessment

**Purpose:** Structured IEC 62443 zone-based security assessment with automated compliance gap analysis.

| Capability                       | Standard                                                      | Output                                                                                       |
| -------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Zone & Conduit Mapping**       | IEC 62443-3-2                                                 | Purdue Model visualization with security level assignments                                   |
| **Security Assessment Workflow** | IEC 62443-3-3                                                 | Zone-by-zone capability assessment against SL-T requirements                                 |
| **FMECA Register**               | IEC 60812                                                     | Failure Mode, Effects & Criticality Analysis per equipment                                   |
| **Hazard Log**                   | ISO 31000                                                     | Centralized hazard tracking with 5×5 risk matrix scoring                                     |
| **RAMS Analysis**                | EN 50126                                                      | Reliability, Availability, Maintainability & Safety assessments                              |
| Minimium Operating Requirements  |                                                               | Minimal capability to maintain operations                                                    |
| Critical Items List              | IEC62443, IEC60812                                            | Critical Assets and their dependencies, and impact to Safety, Production, "Crown Jewel" Loss |
| Threat & Vulneabiilty Assessment | TS50701 - Maps Worst Case Scenario, Safety and Cyber security | Worst Case Scenario, with SIL and HAZOPS to Cyber Threat Modeling                            |

**Business Value:** Transforms compliance from a periodic, consultancy-driven audit into a living, continuously updated assessment that tracks actual security posture over time.

---

### 2.3 Threat Intelligence — Real-Time Landscape

**Purpose:** Continuous multi-source threat intelligence aggregation, correlated to the customer's specific equipment and sector.

| Feed | Records | Update Frequency | Coverage |
|------|---------|-------------------|----------|
| **NVD (CVEs)** | 331,000+ | Daily | All published vulnerabilities |
| **EPSS Scores** | 331,000+ | Daily | Exploit probability (0–1.0) per CVE |
| **CISA KEV** | 1,200+ | As published | Actively exploited vulnerabilities |
| **MITRE ATT&CK for ICS** | 8,900+ objects | Quarterly | Tactics, techniques, groups, software, campaigns |
| **Threat Actors** | 8,900+ | Continuous | Nation-state and criminal groups with sector targeting |
| **ICS Incidents** | 5,000+ curated | Continuous | Historical OT cybersecurity incidents |
| **SEC 8-K Disclosures** | 500+ | As filed | Public company cybersecurity incident filings |
| **GPR Index** | Continuous | Monthly | Geopolitical Risk index events |

**Business Value:** Customers see only threats relevant to *their* equipment, *their* sector, and *their* geography — not a firehose of irrelevant CVEs.

---

### 2.4 My Risk — Financial Exposure Quantification

**Purpose:** Translate cyber risk into financial language that boards, CFOs, and insurance underwriters understand.

| Analysis Method | Output | Confidence |
|----------------|--------|-----------|
| **Annual Loss Expectancy (ALE)** | Per-facility and aggregate ALE | Deterministic |
| **Monte Carlo Simulation** | Loss distribution curves with VaR at 95th/99th percentile | Probabilistic |
| **GPR Cascade Analysis** | Geopolitical tension → cyber incident probability correlation | Actuarial |
| **SEC Disclosure Benchmarks** | Peer-reported financial impacts by sector and incident type | Regulatory precedent |
| **Sector Benchmarks** | Your posture vs. industry averages across 16 CI sectors | Comparative |

**Outputs Include:**
- Executive Risk Story — scrollable narrative briefing for board presentations
- Executive Briefing — automated summary with key metrics and trend indicators
- Failure Scenarios — industrial failure cascade modeling
- FMECA Tree — interactive failure mode visualization

**Business Value:** The CFO can answer *"What is our expected annual cyber loss?"* with a statistically defensible number, not a traffic-light heatmap.

---

### 2.5 My Future — SELDON Predictive Intelligence

**Purpose:** Forward-looking threat intelligence powered by the proprietary SELDON AI engine.

| Capability | Horizon | Method |
|-----------|---------|--------|
| **SELDON Atlas** | Real-time → 90 days | Unified predictive intelligence hub combining all SELDON outputs |
| **Threat Horizon** | 90-day forward look | Trend extrapolation of threat actor activity targeting the customer's sector |
| **TACAM Scoring** | Real-time | Threat Actor Capability & Motivation quantification (0–100 per actor) |
| **EPSS Surge Tracker** | 30-day exploit probability | CVE exploitation velocity monitoring with acceleration detection |
| **TTP Cluster Analysis** | Historical → Trend | MITRE ATT&CK technique co-occurrence and evolution analysis |
| **Actor Timeline** | Historical | Threat actor campaign chronology with sector correlation |

**Business Value:** Shifts cybersecurity from reactive incident response to proactive risk management. Customers can see *which CVEs are surging* toward exploitation before they're weaponized.

---

### 2.6 Threat Visualization — Geospatial & Graph Intelligence

**Purpose:** Make complex threat relationships intuitively understandable through multi-modal visualization.

| Visualization | Technology | Shows |
|--------------|-----------|-------|
| **Threat Globe** | 3D WebGL globe | Animated attack arcs from threat actor origins to customer facilities |
| **Threat Radar** | Radial proximity chart | Near-term threats ranked by relevance to customer's infrastructure |
| **Kill Chain Viewer** | Multi-stage flow | Lockheed Martin Kill Chain mapped to customer-specific attack scenarios |
| **Graph Explorer** | Neo4j-backed force graph | Interactive knowledge graph with 20+ relationship types |
| **Incident Analytics** | Recharts temporal | Historical incident trends with quarterly bucketing and drill-down |
| **Supply Chain Graph** | Dependency visualization | Software supply chain risk from SBOM → CVE → Threat Actor |

**Business Value:** A CISO can walk into a board meeting and *show* — not tell — where the threats are coming from, how they arrive, and what they target.

---

### 2.7 Research & Analysis Notebook

**Purpose:** AI-powered research workspace for deep-dive analysis, report generation, and knowledge synthesis.

| Feature | Description |
|---------|-------------|
| **Research Notebooks** | Multi-session AI chat with model selection (OpenRouter) |
| **Source Library** | Upload and process documents, reports, and intelligence briefs |
| **Podcast Studio** | Auto-generate audio briefings from text content (ElevenLabs) |
| **Web Intelligence** | Live web research via Perplexity API for equipment and threat enrichment |
| **Red Squadron AI** | Adversary emulation — AI-generated attack scenarios against customer infrastructure |

**Business Value:** Analysts spend time *thinking* about risk, not *searching* for data. The notebook brings research, AI analysis, and content creation into one workflow.

---

### 2.8 Compliance & Standards

**Purpose:** Maintain continuous alignment with OT/ICS cybersecurity standards and sector-specific regulations.

| Standard/Framework | Coverage |
|--------------------|----------|
| **IEC 62443** | Zone/conduit mapping, security level assessment |
| **NIST CSF 2.0** | Mapping of platform capabilities to CSF functions |
| **MITRE ATT&CK for ICS** | Full technique coverage with detection gap analysis |
| **Purdue Enterprise Reference Architecture** | Visual network segmentation by Purdue level |
| **16 CI Sector Frameworks** | Sector-specific regulatory mapping (NERC CIP, TSA SD, etc.) |

**Business Value:** Compliance becomes a *byproduct* of using the platform, not a separate workstream.

---

## 3. Data Architecture

### Quantitative Summary


| **CVE Records**           | 331,000+                                                  |
| ------------------------- | --------------------------------------------------------- |
| **Threat Actor Profiles** | 8,900+                                                    |
| **MITRE ATT&CK Objects**  | 8,900+ (tactics, techniques, groups, software, campaigns) |
| **Curated ICS Incidents** | 5,000+                                                    |
| **EPSS Scores**           | 331,000+ (daily refresh)                                  |
| **API Endpoints**         | 200+ RESTful routes                                       |
| **Wiki Documentation**    | 168 articles across 10 sections                           |

### Data Flow Architecture

```
Customer Data ──→ Asset Digital Twin ──→ SBOM Registry ──→ CVE Correlation
                                                              │
Threat Feeds ──→ NVD/EPSS/KEV/MITRE ──→ Knowledge Graph ←────┘
                                              │
                                     Attack Path Analysis
                                              │
                           ┌──────────────────┼──────────────────┐
                     SELDON Predictive    Financial Exposure    Executive Briefing
                      Intelligence         (Monte Carlo)         (Risk Story)
```

---

## 4. Deployment & Operations

| Aspect               | Specification                                                           |
| -------------------- | ----------------------------------------------------------------------- |
| **Delivery Model**   | SaaS (cloud-hosted) or on-premise deployment                            |
| **Primary Database** | PostgreSQL 16 (Railway-managed)                                         |
| **AI Services**      | Custom Local LLM                                                        |
| **Frontend**         | Customer Login                                                          |
| **Backend**          | Customer backend - all systems dedicated to customer                    |
| **Data Refresh**     | Daily automated feeds (NVD, EPSS, KEV); continuous threat actor updates |

---

## 5. Target Market & ICP

### Ideal Customer Profile

| Attribute | Specification |
|-----------|--------------|
| **Industry** | Critical Infrastructure — Energy, Water, Manufacturing, Transportation, Chemical, Food & Agriculture |
| **Size** | Mid-market to enterprise (50–10,000 OT assets) |
| **Maturity** | Organizations with existing OT infrastructure but limited cyber visibility |
| **Buyer** | CISO, VP Engineering, Head of OT Security, Risk Manager |
| **Budget Holder** | CFO (risk quantification), CTO (technical), Insurance (underwriting) |

### Addressable Market

| Segment | TAM | SAM | SOM |
|---------|-----|-----|-----|
| **Global OT Cybersecurity** | $21.6B (2026) | $4.2B (CI sectors, English-speaking) | $420M (mid-market, direct sales) |
| **Cyber Insurance Analytics** | $14.8B (2026) | $2.1B (OT-specific underwriting tools) | $210M (insurance partnership) |

---

## 6. Competitive Positioning

| Competitor | Strength | OXOT Advantage |
|-----------|----------|----------------|
| **Claroty / Dragos** | Network-level OT visibility | OXOT adds equipment-level asset twin + financial quantification |
| **SecurityScorecard** | External risk ratings | OXOT provides internal asset-specific correlation, not just exterior scanning |
| **Palantir** | Enterprise analytics | OXOT is purpose-built for OT/ICS with industry-specific ontology |
| **BitSight** | Third-party risk scores | OXOT delivers first-party, asset-correlated risk with predictive intelligence |
| **Axio / RiskLens** | Cyber risk quantification | OXOT integrates quantification *into* the operational platform — not a standalone tool |

### Moat Analysis

1. **Data Moat** — 90-table schema purpose-built for OT/ICS with DEXPI/ISO 15926 compliance
2. **Knowledge Graph** — Neo4j-backed attack path traversal that competitors cannot replicate with flat databases
3. **SELDON Engine** — Proprietary predictive scoring (TACAM, EPSS trajectory, Threat Horizon) not available elsewhere
4. **Insurance Nexus** — Financial quantification output format directly usable by cyber insurance underwriters

---

## 7. Key Metrics & KPIs

### Platform Metrics

| Metric | Current Value | Target (12mo) |
|--------|--------------|---------------|
| Total documented features | 168 | 200+ |
| CVE coverage | 331,000+ | 400,000+ |
| Threat actor profiles | 8,900+ | 12,000+ |
| Database tables | 90 | 100+ |
| API endpoints | 200+ | 250+ |

### Customer Success Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| **Time to First Twin** | Days from onboarding to complete digital twin | < 14 days |
| **Asset Coverage** | % of customer OT assets catalogued in the platform | > 90% within 30 days |
| **Threat Relevance Score** | % of alerts that are relevant to the customer's sector | > 85% |
| **Executive Briefing Cadence** | Automated briefing frequency to board stakeholders | Weekly |
| **Financial Quantification Accuracy** | ALE prediction vs. actual loss (actuarial validation) | ±20% |

---

## 8. Revenue Model

| Stream | Model | Price Point |
|--------|-------|-------------|
| **Platform License** | Per-organization annual subscription | $50K–$500K/yr based on facility count |
| **Onboarding & Digital Twin Build** | Professional services (one-time) | $15K–$75K per engagement |
| **SELDON Predictive Add-on** | Premium tier for predictive intelligence | +30% on base license |
| **Insurance Partner API** | Per-query actuarial data access for underwriters | Usage-based pricing |
| **Managed Intelligence** | Analyst-augmented threat briefings and reporting | $10K–$25K/month |

---
