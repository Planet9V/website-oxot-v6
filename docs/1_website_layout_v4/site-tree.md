**New to this system? Start with [`OXOT_README.md`](./OXOT_README.md).** This file is the nav-menu tree (below) plus, as of 2026-08-24, a full real-route site map (further down) listing every live route with its spec source and build status. For file-by-file detail see [`OXOT_FILE_INDEX.md`](./OXOT_FILE_INDEX.md); for the fullest pattern/status detail see [`OXOT_Master_Record.md`](./OXOT_Master_Record.md)'s alignment matrix — this file is the flatter, faster-to-scan version of that same mapping.

Home
│
├─ /en
|  ├─ cdt-2
|  |
|  -- Platform
│  │  ├─ Cyber Digital Twin
│  │  ├─ How It Works
│  ├─ Decisions
│  │  ├─ What Do We Fix First?
│  │  ├─ What Should We Spend?
│  │  ├─ Can We Change Safely?
│  │  └─ What Can We Leave Alone?
│  ├─ Deployment & Data Sovereignty
│  ├─ Integrations & Data Inputs
│  └─ Work With OXOT
├─ Industries
│  ├─ Energy & Utilities
│  ├─ Water & Wastewater
│  ├─ Rail & Transportation
│  ├─ Manufacturing & Process Industry
│  ├─ Hyperscale & Datacentre
│  └─ Defense & Government  
├─ Assurance
│  ├─ IEC 62443
│  ├─ Cyber Resilience Act
│  ├─ TS 50701
│  ├─ IEC 62278-2:2025 
│  └─ Evidence & Data Provenance
│
├─ Consulting 
│
├─ Resources
│  ├─ Explore Resources               
│  ├─ Learn
│  │  ├─ Insights                   
│  │  ├─ Guides & Briefings           
│  │  └─ Glossary                    
│  ├─ Proof
│  │  ─ Case Studies                 
│  └─ Technical Documents
│     ├─ Product Sheet                
│     ├─ Technical Specification     
│     └─ Air-Gapped Deployments       
│
├─ Company
│  ├─ About OXOTrem
│  └─ Contact
│
└─ Request a Technical Briefing

## Sections - mapping to URLs

Resources ▼
├─ Explore Resources              → /resources
│
├─ Learn
│  ├─ Insights                    → /resources/insights
│  ├─ Guides & Briefings          → /resources/guides-briefings
│  └─ Glossary                    → /resources/glossary
│
├─ Proof
│  └─ Case Studies                → /resources/case-studies
│
├─ Technical Documents
│  ├─ Product Sheet               → /resources/product-sheet
│  ├─ Technical Specification     → /resources/technical-specification
│  └─ Air-Gapped Deployments      → /resources/air-gapped-deployments

---

## Full real-route site map (verified directly against the live repo, 2026-08-24)

Every `page.tsx` under `src/app/[locale]/` in the real repo, confirmed to exist and checked for real content via line count (none are stubs — the shortest, the 3 legal pages, are 41 lines each, appropriate for that content type). This is the complete, current site — 34 routes, both locales (`en`/`nl`, `nl` currently a same-as-English placeholder pending translation). Status detail (pattern, components, open items) lives in `OXOT_Master_Record.md`'s alignment matrix — this table is the quick-reference version.

| Route | In nav tree above? | Spec source (`new_material_source/`) | Built? |
|---|---|---|---|
| `/` | Yes — Home | `1_home/` | Protected, reference only |
| `/cdt-2` | Yes — under Platform | `2_platform/` | Protected, reference only |
| `/how-it-works` | Yes — Platform → How It Works | `2_platform/` | Built |
| `/decisions/fix-first` | Yes — What Do We Fix First? | `OXOT_Visual_Foundation_Spec.md` §6 (no dedicated spec folder — Decisions isn't a `new_material_source/` menu folder) | Built |
| `/decisions/investment` | Yes — What Should We Spend? | same as above | Built |
| `/decisions/change-safely` | Yes — Can We Change Safely? | same as above | Built |
| `/decisions/risk-acceptance` | Yes — What Can We Leave Alone? | same as above | Built |
| `/deployment-sovereignty` | Yes — Deployment & Data Sovereignty | `6_resources/air-gapped_deployment.md` (shared source) | Built |
| `/integrations` | Yes — Integrations & Data Inputs | No dedicated spec folder | Built, no pattern ever specced |
| `/work-with-oxot` | Yes — Work With OXOT (and possibly "Request a Technical Briefing," unconfirmed as a separate route) | No dedicated spec folder | Built |
| `/industries` | Yes — Industries (index) | `3_industries/industries-map.md` | Built |
| `/industries/energy-utilities` | Yes | `3_industries/industry_energy.md` | Built, incl. worked-scenario diagram |
| `/industries/water-wastewater` | Yes | `3_industries/industry_water.md` | Built, incl. worked-scenario diagram |
| `/industries/rail-transportation` | Yes | `3_industries/industry_rail-transportation.md` | Built, incl. worked-scenario diagram |
| `/industries/manufacturing-process` | Yes | `3_industries/industry_manu-process.md` | Built, incl. worked-scenario diagram |
| `/industries/hyperscale-data-centers` | Yes — "Hyperscale & Datacentre" | `3_industries/industry_hyperscale.md` | Built, incl. worked-scenario diagram |
| `/industries/defense-government` | Yes | `3_industries/industry_defence.md` + `industry_defense_airgap.md` | Built, incl. worked-scenario diagram |
| `/assurance` | Implied (parent of the 5 below) | `4_assurance/assurance_overview.md` + `_2.md` | Built |
| `/assurance/iec-62443` | Yes | `4_assurance/assurance_IEC62443.md` | Built |
| `/assurance/cyber-resilience-act` | Yes | `4_assurance/assurance_cra.md` | Built |
| `/assurance/ts-50701` | Yes | `4_assurance/assurance_TS50701.md` | Built |
| `/assurance/iec-62278-2` | Yes — "IEC 62278-2:2025" | `4_assurance/assurance_62278-2:2025.md` | Built |
| `/assurance/evidence-data-provenance` | Yes | `4_assurance/assurance_evidence_data_provenance.md` | Built |
| `/consulting` | Yes | `6_consulting/consulting.md` | Built |
| `/resources` | Yes — Explore Resources | `6_resources/resources_overview.md` | Built |
| `/resources/insights` | Yes — Learn → Insights | `6_resources/resources-format-insights.md` | Built |
| `/resources/insights/[slug]` | Implied (detail pages) | same | Built |
| `/resources/guides-briefings` | Yes — Learn → Guides & Briefings | `6_resources/resources-format-guides-briefings.md` | Built |
| `/resources/guides-briefings/[slug]` | Implied (detail pages) | same | Built |
| `/resources/glossary` | Yes — Learn → Glossary | `6_resources/glossary.md` (terms only, no definitions in source) | Built |
| `/case-studies` | Yes — Proof → Case Studies | `6_resources/resources-case-studies.md` | Built |
| `/case-studies/[slug]` | Implied (detail pages) | same | Built |
| `/resources/product-sheet` | Yes — Technical Documents → Product Sheet | No dedicated spec folder (uses real PDF source at repo root) | Built |
| `/technical-specification` | Yes — Technical Documents → Technical Specification | No dedicated spec folder | Built |
| `/resources/air-gapped-deployments` | Yes — Technical Documents → Air-Gapped Deployments | `6_resources/air-gapped_deployment.md` | Built |
| `/company` | Yes — About OXOT | `7_company/company.md` | Built (rebuilt twice — first pass caught running on pre-spec content) |
| `/contact` | Yes | `7_company/contact.md` | Built |
| `/cookies` | **No — missing from nav tree above** | `7_company/cookie_policy.md` | Built, deliberately minimal (legal) |
| `/privacy` | **No — missing from nav tree above** | `7_company/privacy_policy.md` | Built, deliberately minimal (legal) |
| `/terms` | **No — missing from nav tree above** | `7_company/toc.md` (misleadingly named — holds Terms of Use text) | Built, deliberately minimal (legal) |
| `/facility-due-diligence` | **No — missing from nav tree above** | None — no spec-folder brief exists; confirmed a deliberate owner decision, still linked from Home | Built |
| `/reference` | **No — missing from nav tree above** | None | Built (index) |
| `/reference/[slug]` | **No — missing from nav tree above** | None — the 3 real docs behind this route (nis2/ai-act/machine-act) have no defined spec home, confirmed in an earlier pass | Built (detail route), content unspecced |

**Gaps this table surfaces that the nav tree above doesn't show:** 6 real, live routes have no entry anywhere in the nav-menu tree at the top of this file (`/cookies`, `/privacy`, `/terms`, `/facility-due-diligence`, `/reference`, `/reference/[slug]`). The 3 legal pages are expected to sit outside primary nav (typically footer-linked) — not a defect. `/facility-due-diligence` and `/reference` being absent from both the nav tree and any spec folder is a genuine, standing gap worth a decision, not something this correction pass resolves on its own.
