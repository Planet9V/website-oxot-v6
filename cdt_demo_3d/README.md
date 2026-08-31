# OXOT Cyber Digital Twin (CDT) — 3D Hyperscale Facility & Decision Sprint Suite

Welcome to the **OXOT Cyber Digital Twin (CDT) 3D Demo Suite** (`cdt_demo_3d`).

This standalone web application provides interactive 3D physics-informed digital twin exploration, 21-day decision sprint methodologies, regulatory compliance dossiers (EU CRA Annex VII, IEC 62443, CycloneDX 5-BOMs), and OT due diligence tooling for industrial critical infrastructure and AI hyperscale data centers.

---

## 🌟 Key Application Entry Points

| Page / Route | Description | Primary Use Case |
| :--- | :--- | :--- |
| **[`index.html`](index.html)** | **Platform Overview & Architecture** | Executive platform landing page featuring the 6 capability cards and Purdue Level architecture. |
| **[`services.html`](services.html)** | **Decision Sprint & Services Suite** | Unified master page with sticky sub-navigation bookmarks covering the 7-Stage Briefing Suite, 21-Day Timeline, 2-Workshop Roadmap, M&A Due Diligence, and Evidence Trail. |
| **[`master-explorer.html`](master-explorer.html)** | **3D Babylon Facility Twin Explorer** | Full-screen interactive 3D twin with click-to-fly camera, BFS blast-radius analysis, conduit route tracing, and kinetic hazard simulation. |
| **[`explorer-3d.html`](explorer-3d.html)** | **Standard 3D Explorer & HUD** | 3D visualizer with HUD diagnostics and Purdue Level filtering. |
| **[`pages/industries/`](pages/industries/)** | **Sector Deep Dives** | Specialized threat models for Hyperscale, Energy, Defense, Rail, Water, and Manufacturing. |

---

## 🚀 Quick Start & Local Execution

Because Babylon.js loads 3D scene meshes (`.glb`) and JSON graph files asynchronously via `fetch`, the application must be served over an HTTP/HTTPS server (not directly opened via `file://`).

### Option 1: Python HTTP Server (Recommended)
From inside this directory (`cdt_demo_3d`):
```bash
python3 -m http.server 8124
```
Then open your browser to: **`http://localhost:8124/index.html`** or **`http://localhost:8124/master-explorer.html`**.

---

### Option 2: Node.js / NPX Serve
```bash
npx serve -p 8124 .
```
Or run the embedded Node static server:
```bash
node server.js
```

---

### Option 3: Shell Script
Run the automated launcher:
```bash
./start.sh
```

---

## 📁 Directory Structure

```
cdt_demo_3d/
├── index.html                    # Platform Architecture & 6 Capability Cards
├── services.html                 # Unified Decision Sprint & Services Master Page
├── master-explorer.html          # Full-screen 3D Babylon Twin Explorer
├── explorer-3d.html              # Standard 3D Explorer with Diagnostics HUD
├── hyperscale_campus.glb         # 3D GLTF/GLB Campus Scene (Purdue Z0–Z5)
├── hyperscale-campus.html        # Campus Overview
├── hyperscale-hall.html          # Server Hall Level 1 Detail
├── plc.html                      # Programmable Logic Controller Interface
├── server.js                     # Lightweight Node.js local HTTP server
├── start.sh                      # Quick start script
├── shared/
│   ├── oxot-theme.css            # Dark mode glassmorphic design tokens
│   ├── oxot-nav.js               # Global responsive header navigation
│   └── nav.js                    # Mobile navigation drawer & footer
├── graph/
│   ├── facility-graph.json       # 449-Node facility topology
│   ├── routes.json               # 1,155 Conduits & Lateral Routes
│   ├── hazard-log.json           # FMECA kinetic failure modes
│   └── routing.js                # BFS blast radius & route calculation engine
├── images/                       # High-resolution architectural diagrams & videos
├── shots/                        # Facility P&ID and screenshot assets
├── screenshots/                  # Sample audit report visual exports
├── vendor/                       # Self-hosted web fonts (Woff2)
└── pages/
    └── industries/               # Sector verticals (Hyperscale, Energy, Rail, etc.)
```

---

## 🎮 3D Camera Controls & Keyboard Shortcuts

When exploring the 3D Twin (`master-explorer.html` or `explorer-3d.html`):
- **Left Click + Drag**: Rotate camera orbit around the facility.
- **Right Click + Drag / Two-Finger Drag**: Pan camera position.
- **Scroll Wheel / Pinch**: Zoom in / out.
- **Left Click on Any Equipment Mesh**: Highlights the asset, opens telemetry HUD, and calculates real-time blast radius upstream and downstream.
- **Reset Camera**: Click the **Reset View** button in the HUD or press `R`.

---

## 🔒 Security & Privacy Architecture
- **Passive Ingestion**: Zero active packets or network scans are sent to physical PLCs or field controllers.
- **Standalone Runtime**: All assets, scripts, and 3D scenes run entirely client-side with no mandatory external cloud dependencies.

---

© 2026 OXOT Cyber Digital Twin. All Rights Reserved.
