# PRD-ENHANCEMENT.md — OXOT Customer Operations Console v0.1 (Phase A)

Product Requirements Document for Phase A — the "Upgrade" phase preceding the customer-onboarding hub.

> **Honest framing:** this is an *enhancement* PRD, not a greenfield PRD. Most product surface already exists (per `LIBRARY-AND-CODEBASE-REUSE-MAP.md`). What this enhances is the *connective tissue* and *one new product surface* (attack-path analysis via BloodHound).

## Problem statement

OXOT users today can:
- Browse facilities + assets via PID canvas
- Upload documents and have them classified
- See per-asset details across 10 tabs in AssetProfilePanel

OXOT users today CANNOT:
- Run attack-path queries showing how a compromised IT asset could reach safety-critical OT (the kind of question CISOs ask insurance underwriters at renewal time).
- See FMECA/HAZOP/RAMS data extracted from their own uploaded documents (extraction code exists but is not wired; data comes from manual curation today).
- See node centrality / community data in the UI (computed nightly, never read).
- Navigate a customer-level dashboard (only per-facility FacilityHub exists).
- Run BH-style "what's reachable from here" queries.

## Target users

Single-tenant per OXOT deployment, so "user" = "Jim's organization" today, but the design serves these personas:

| Persona | Job-to-be-done | Phase A delivery |
|---|---|---|
| OT security lead | "Show me which OT assets a compromised engineering workstation can reach" | A3 attack-path viewer (3 templates), A2 ingested OT graph |
| CISO | "Quantify the worst-case blast radius of an IT-side compromise" | A3 blast-radius template, A7 centrality-informed criticality |
| Insurance underwriter | "Tell me the realistic worst-case loss path for premium calculation" | A3 + A6 (extracted FMECA economic data) + existing reliability-assessment page |
| OT engineer (document author) | "Upload my FMECA doc and have its rows extracted into the database" | A6 register-extractor wiring |

(Phase B serves additional personas — bulk facility onboarding, customer setup. Not in this PRD.)

## Why now

- BloodHound CE v9.2.2 (June 2026 release) shipped expanded OpenGraph support → custom domains get full pathfinding. v8 had this for simple graphs; v9 enables structured graphs with extension schemas.
- The 2026-05 audit campaign (Cluster A/A2/B/C/D/E/F) is closed; codebase is stable enough to layer new features.
- Phase B (customer hub) cannot proceed efficiently on a stale codebase (A5 audit + A6 wiring + A7 graph_metrics consumption clear runway).
- User has explicit business pull for attack-path UX — wants integration, not "concepts only" review (per 2026-06-03 push-back).

## Goals

### Primary (must)

- **G1: Run 3 attack-path templates** against shared Neo4j (via BH CE) and render results in OXOT-native Sigma.js viewer integrated as a mode toggle in the existing PID canvas.
- **G2: Auto-extract FMECA/HAZOP/RAMS/MOR/RR/CIL data** from uploaded documents into `seldon.*` tables. Today this is manual.
- **G3: Surface node centrality + community** in AssetProfilePanel Network tab and PID canvas hover. Today this data is computed nightly and read by nothing.
- **G4: Clean up the codebase** — delete ~150 unreachable pages, add auto route-mount smoke, run a written 30-min end-to-end walkthrough.

### Secondary (should)

- **G5: Document a customer-value hypothesis** for attack-path analysis — who runs queries, on what data, producing what report. Adversarial-reviewer gate.
- **G6: Make the BH integration reversible** via `source:'bloodhound-derived'` kill-switch (DA12) and `OT*` namespacing (DA13).

### Non-goals

- Customer-onboarding hub UI (Phase B).
- Customer self-serve registration.
- BH-side UI changes (BH CE used as backend engine only, DA10).
- Networkx path-finding (Neo4j handles paths; networkx stays batch-only).
- Repairing legacy 50-node-truncated facilities (audited but not fixed).
- Fixing `db/migrations/*` split-brain (Phase B entry gate).

## User stories

### US1 — Attack-path mode (G1)

> As an OT security lead, I open the PID canvas for a facility, toggle "Attack Path" mode, pick "External Internet" as source and a critical SIS as target, and see the top-3 shortest paths rendered with risk-weighted edges, so I can identify the most exploitable lateral-movement chains.

Acceptance:
- Toggle button present in PID canvas Panel (existing component, mode added).
- Source dropdown includes virtual "External Internet" node.
- Target dropdown shows assets with `criticality='critical'` OR `sil_level >= 2`.
- Top-3 paths render via Sigma.js (or in-process BFS for ≤1k nodes per Frontend reviewer + Karpathy R13).
- Click any path node → opens existing AssetProfilePanel.

### US2 — FMECA from documents (G2)

> As an OT engineer, I upload my facility's FMECA document, and within minutes I can see all extracted failure modes (component, failure mode, effect, severity, RPN) in the system's Reliability tab, so I don't have to manually re-enter the data.

Acceptance:
- Document uploaded to existing `/api/pipeline/upload` (no new endpoint).
- Document classified as FMECA-01 by existing classifier.
- New `extract_fmeca` stage runs after classify (A6).
- `seldon.fmeca_full` has new rows linked to the document.
- Reliability page (or AssetProfilePanel Reliability tab in B5) surfaces the new rows.

### US3 — Centrality awareness (G3)

> As an OT security lead, I hover over a node in the PID canvas, and a small chip shows me its centrality rank (e.g. "centrality #3 in this facility") and community group, so I can quickly identify network choke-points and clusters.

Acceptance:
- Hover tooltip in PID canvas shows centrality chip.
- AssetProfilePanel Network tab displays full centrality breakdown.
- "Last computed at" badge shown — honest about nightly-stale data.

### US4 — Clean codebase navigation (G4)

> As a developer working on Phase B, when I `Cmd+P` and type a page name, I see only pages that are actually reachable in the app, so I don't accidentally start editing a page that's been replaced or abandoned.

Acceptance:
- ~150 unreachable pages deleted in single PR.
- Protected subtrees preserved (`demo/`, `sales/`, `Prospect_*`, `reference-*`).
- Playwright route-mount smoke runs nightly and stays green.

### US5 — Customer-value clarity (G5)

> As the product owner, I can articulate in writing who runs each attack-path template, on what data, and what report they produce, so the engineering investment in attack-path UI is tied to a real use case rather than a tool looking for a problem.

Acceptance:
- `ATTACK-PATH-USE-CASES.md` written, reviewed, locked.
- Each of the 3 templates has a persona, query, and output artifact.

## Functional requirements (mapped to A-items)

| Req | Description | Maps to |
|---|---|---|
| FR1 | BH CE v9.2.2 deployed and reachable on Railway internal network | A1 |
| FR2 | OT data flows from `ot_inventory` + CDT Neo4j to BH via OpenGraph nightly | A2 |
| FR3 | OXOT-side API endpoint proxies authenticated Cypher to BH | A4 + A3 |
| FR4 | OXOT React component renders BH-returned paths via Sigma.js | A3 |
| FR5 | Uploading FMECA/HAZOP/RAMS docs auto-populates seldon.* tables | A6 |
| FR6 | AssetProfilePanel Network tab shows centrality | A7 |
| FR7 | PID canvas hover shows centrality chip | A7 |
| FR8 | `src/pages/*` count drops from 207 to ~57 | A5 |
| FR9 | Nightly Playwright run iterates over all `App.tsx` routes | A8 |

## Non-functional requirements

| NFR | Target | Validation |
|---|---|---|
| NFR1 — Performance: attack-path query <2s for 8-hop depth | p95 measured | A3 acceptance test |
| NFR2 — Auth: BH credentials never reach browser | Code review | A4 acceptance test |
| NFR3 — Reversibility: BH-ingested data droppable in <30s | Cypher `MATCH (n {source:'bloodhound-derived'}) DETACH DELETE n` runs cleanly | A0 + DA12 |
| NFR4 — Data freshness: OT graph in BH < 24h stale (nightly cron) | Cron timestamp visible | A2 |
| NFR5 — UI brand consistency: no BH branding visible to OXOT users | Visual inspection | A9 manual smoke |

## Success metrics (post-Phase A)

| Metric | Baseline | Target | Source |
|---|---|---|---|
| Attack-path templates available | 0 | 3 | Code count |
| FMECA rows auto-extracted per uploaded doc | 0 | ≥1 row per recognized doc | seldon.fmeca_full select |
| AssetProfilePanel Network tab populated | 0% | 100% | UI inspection |
| `src/pages/*` count | 207 | ~57 | `find` count |
| Nightly Playwright smoke green streak | n/a | 7 consecutive days | CI history |
| Phase B unblocked | NO | YES | Manual review |

## Out of scope (Phase A)

- Multi-tenant attack-path isolation (single-tenant OXOT per memory).
- Real-time BH ingestion (nightly OK).
- BH Cypher editor UI in OXOT (3 templates only, hardcoded; user-driven editor is Phase B+ candidate).
- LOPA / functional safety workflows beyond what HazopsTab already covers (Phase B B11).
- Per-equipment consequence rollup (Phase B B5; system-grain rollup is current).
- Critical Items List as queryable view (Phase B B6).

## Open product questions (Jim to answer during Phase A)

1. Should attack-path query results be exportable (CSV / PDF)? Defer to A10 doc.
2. Should saved attack-path queries be admin-only or user-visible? Defer to A10 doc.
3. Are insurance-underwriter-facing reports a Phase A.5 deliverable or Phase C? Defer.
4. Should the centrality chip in PID canvas link out to a dedicated centrality dashboard, or just inform inline? Phase A keeps inline; dashboard is future.

## Decision log reference

All implementation decisions in [DECISION-LOG.md](./DECISION-LOG.md). PRD-level decisions:

- **DP1**: Phase A is one phase, not split (4.5-6 weeks).
- **DP2**: Customer hub deferred to Phase B (adversarial reviewer's pushback accepted as trade).
- **DP3**: 3 saved attack-path templates lock as v1; no user-defined queries in Phase A.

## Risk reference

All risks in [RISK-REGISTER.md](./RISK-REGISTER.md). Top product risks:

- **R1**: BH migrations corrupt shared Neo4j → A0 gate.
- **R5**: Customer-value hypothesis can't be articulated → A10 doc gate.
- **R6**: Scope spiral into BH parity → 3-template lock.
- **R7**: Phase B delayed → preview doc keeps it visible.

## References

- [PHASE-A-UPGRADE.md](./PHASE-A-UPGRADE.md) — phase plan
- [SPECIFICATIONS.md](./SPECIFICATIONS.md) — per-phase specs
- [ARCHITECTURE.md](./ARCHITECTURE.md) — target system architecture
- [LIBRARY-AND-CODEBASE-REUSE-MAP.md](./LIBRARY-AND-CODEBASE-REUSE-MAP.md) — what NOT to rebuild
- [GUARDRAILS.md](./GUARDRAILS.md) — drift-prevention rules
- [BLOODHOUND-DEEP-RESEARCH.md](./BLOODHOUND-DEEP-RESEARCH.md) — BH CE architecture details
- [REVIEW-PANEL-FINDINGS.md](./REVIEW-PANEL-FINDINGS.md) — 4-reviewer findings
