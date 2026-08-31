# OXOT WorldMonitor & External Pressures Engine

> **Module:** External Pressures & Geopolitical Intelligence  
> **Integration:** Seldon Engine Level 05 Data Fusion Layer  
> **Purpose:** Real-time correlation of geopolitical, economic, military, and environmental signals to OT facility risk.

---

## 01 :: Overview & Critical Infrastructure Relevance

For an OT/critical-infrastructure workflow, the most relevant parts are the fixed infrastructure registries, outage and disaster layers, GDELT/ACLED event context, maritime/aviation movement signals, and the project’s dependency/cascade and geographic-correlation logic.

It also produces higher-level derived signals, including:
- **Country Instability Index** scoring for 31 Tier-1 countries.
- **Cross-stream correlation** among military, economic, disaster, escalation, and infrastructure signals.
- **News clustering**, event velocity/sentiment analysis, entity extraction, geographic convergence, and infrastructure-cascade analysis.

---

## 02 :: External Intelligence Domains

| Domain | Data Signals & Registries Provided |
| :--- | :--- |
| **News & Geopolitics** | More than 500 curated RSS/news feeds across 15 categories, GDELT topic and geolocated event data, conflict/protest data from ACLED, and news-derived tension signals. |
| **Military & Security** | Military aircraft tracking through OpenSky, aircraft owner/operator/type enrichment via Wingbits, naval/vessel identification, military-base registry, Pentagon-area "PizzINT" activity metrics, and military-surge/correlation indicators. |
| **Maritime & Aviation** | Live AIS vessel positions and density analysis, strategic ports and waterways, aircraft positions/enrichment, and FAA airport-delay status. |
| **Cyber & Internet Infrastructure** | Cyber-focused intelligence feeds, Cloudflare Radar internet-outage data, critical infrastructure layers, and correlations between reported events and nearby assets. |
| **Climate & Disasters** | USGS earthquakes; NASA EONET events such as fires, storms, volcanoes, and floods; UN GDACS disaster alerts; and official weather alerts from NWS, ECCC, and WMO SWIC. |
| **Energy & Commodities** | EIA oil prices, production, and inventories; oil-and-gas pipeline registries; commodity pricing; and energy-focused dashboard variants. |
| **Finance & Economy** | Equity/market data via Finnhub and Yahoo Finance, crypto prices via CoinGecko, FRED macroeconomic indicators, stock exchanges and commodity data, plus prediction-market data from Polymarket. |
| **Government & Supply-Chain-Relevant Signals** | USASpending federal awards/contracts, strategic ports, pipelines, airports, submarine-cable-related geography, critical mineral sites, and other fixed infrastructure layers. |
| **Nuclear & Strategic Facilities** | Global nuclear-infrastructure records, IAEA gamma-irradiator locations, spaceports, military bases, and other strategic geographic assets. |

---

## 03 :: TACAM & ATQ Integration

External pressures directly feed into **TACAM** (7-dimensional Threat Actor Capability & Motivation Matrix) and **ATQ** (12-factor Threat Actor Profiling):

- **TACAM Cross-Queries:** Evaluates how external geopolitical tension accelerates specific threat actor campaign recency and sector targeting.
- **Dynamic Risk Deltas:** Updates facility ALE (Annualized Loss Expectancy) when regional tension or supply chain outages converge on customer assets.