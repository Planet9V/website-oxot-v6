# Review Panel Findings

4-reviewer adversarial design review run 2026-06-03 per the `multi-agent-brainstorming` handoff. Reviewers: Architecture, Frontend, Data-flow, Adversarial (devil's advocate). All Opus models, run in parallel against the same context.

## Convergence (3+ of 4 agreed)

| Topic | Position | Implication |
|---|---|---|
| Stale-page audit | Real work, small scope (1 PR not dossier) | A5 — single script + single deletion PR |
| BH binary integration (separate Neo4j) | Inferior to user's "single Neo4j" intent OR adversarial position | Rejected after deep-research v9 OpenGraph finding |
| Working-code verification | Should be tight-scoped, not a campaign | A8 (auto smoke) + A9 (30-min manual checklist) |
| Wire `register-extractor.ts` | Closes "validate document workflow" + feeds attack-path risk scoring | A6 |
| Frontend `graph_metrics` consumption | Closes networkx scope honestly | A7 |
| Customer-onboarding hub deferral risk | Real cost | Phase B preview documented; Phase A bounded |

## Divergence

| Topic | Architecture | Frontend | Data-flow | Adversarial |
|---|---|---|---|---|
| BH integration approach | Option 3 (native CDT-resident queries) | "Mode toggle in PID canvas" | Option 1 (extend existing Neo4j namespaced) | "wrong tool, skip entirely" |
| Phase A timing | 4-6 weeks reasonable | 2-3 weeks if scoped | 3-4 weeks with discipline | 3 days alternative ("skip BH") |

## Reviewer-by-reviewer summary

### Architecture reviewer (Opus)

- **Recommendation:** Option 3 (native CDT-resident attack-path queries) + Option 2 light borrowing.
- **Key finding:** `server/routes/graph-explore.ts:184` already runs `shortestPath((a)-[*..${depth}]-(b))` — the architecturally interesting BH primitive is already there.
- **Sequencing:** Stale-page audit FIRST (read-only, low risk) → working-verify → BloodHound concepts.
- **Top risk:** Dual canvas representation re-emerging (the 2026-05-28 root cause). Mitigation: reuse `GraphUniverse.tsx`, don't fork.
- **Non-goals:** federated Neo4j, SharpHound/AzureHound ingestors, new canvas page.

### Frontend reviewer (Opus)

- **Empirical baseline:** 207 page files in `src/pages/`, ~189 `<Route>` declarations in `App.tsx` (lines 1148+), `NAV_GROUPS` array at lines 440-486.
- **Stale-page methodology:** filesystem glob vs `App.tsx` route extraction vs `NAV_GROUPS` items vs `<Link>` occurrences. 3-tier orphan classification (dead file / mounted but unlinked / linked but unmounted).
- **Protected subtrees:** `demo/`, `sales/`, `Prospect_*` — intentionally deep-link only.
- **BH viz integration:** mode toggle in existing PID canvas Panel (not new tab). React Flow already in use. Sigma.js can be added as additional viz for cross-facility BH paths.
- **In-process BFS (60-100 LOC)** at `src/lib/attack-paths.ts` for small per-facility graphs before importing heavier viz libraries (per Karpathy rule 13).
- **Working-verify strategy:** auto-generated route-mount smoke spec (loop over App.tsx routes, assert no ErrorBoundary fallback). Single spec, ~30s. NOT 189 separate smokes.
- **Top risk:** deleting a stale page that turns out to be deep-linkable from email/n8n. Mitigation: protected-subtree whitelist + git rollback (Adversarial reviewer said this is fine; Frontend reviewer wanted 30-day soft-disable; we sided with Adversarial).

### Data-flow reviewer (Opus)

- **BH → OT mapping table** (adopted in BLOODHOUND-DEEP-RESEARCH.md and DA13):
  - Computer → :Asset (existing `asset_nodes.node_id`)
  - Group → :Area (IEC62443 zones)
  - Domain → :Site (facilities)
  - HighValueTarget → property `:Asset {criticality:'critical' OR sil_level >= 2}`
  - AdminTo → `:CAN_CONFIGURE` (new edge)
  - CanRDP → `:CAN_REACH {protocol, port}` (new edge)
- **Schema strategy:** Option 1 (extend existing Neo4j with namespaced verbs + `source` property). Option 2 (separate instance) and Option 3 (ETL mirror) rejected.
- **Three OT query patterns to adopt** (locked into DA10 / A3):
  - Shortest path L4 → L1 SIS
  - Conduit bypass detection
  - Blast radius from compromised IT asset
- **Pipeline gap verdict:**
  - `register-extractor.ts` orphan → IN scope (A6) — feeds risk scoring
  - `seldon.vendor_cve_exposure` missing → IN scope as verification gate (Phase A schema parity test)
  - `seldon.geopolitical_events` → OUT of scope this phase
  - `threat_incidents` drift → partly fixed (line 484 of railway-schema.sql); verify
  - `db/migrations/` split-brain → OUT of Phase A; BLOCK Phase B start on it
- **NetworkX scope:** wire frontend to `graph_metrics`, declare path-finding closed via Neo4j (A7).

### Adversarial reviewer (Opus)

- **Position:** "BloodHound is the wrong tool" — based on AD-only assumption. **Refuted by deep-research v9 OpenGraph finding.**
- **Stale-page reality check:** 207 files / ~54 routed = 3:1 dead-to-live ratio. Real signal but small scope (1 PR, not dossier). **Adopted into A5.**
- **Working-verify pushback:** "Vitest is green. Playwright runs nightly. What more is manual verification going to find?" Mitigation: A9 has explicit 30-min exit criterion, not perpetual audit.
- **Customer-onboarding hub deferral:** "Don't defer. None of {BloodHound, stale-audit, working-verify} is a prerequisite." Partially adopted: A5/A6/A7 don't gate Phase B; A1-A4 (BH integration) does because user prioritized.
- **Scope spiral warning:** "facility wizard test → onboarding hub → ops console → upgrade phase with BloodHound. Ship something next week." Partially mitigated: Phase A is one phase (~4.5-6 weeks), not split; Phase B preview keeps it visible.
- **Minimum-viable alternative offered:** Day 1 stale audit + Day 2 register-extractor wire + Day 3 manual smoke = 3 days. **Rejected** because user wants BH integration and full Phase A.

## How the panel changed the design

| Change | Source reviewer |
|---|---|
| Stale-page audit = 1 script + 1 PR + 1-page rationale (NOT dossier) | Adversarial |
| Protected-subtree whitelist (`demo/`, `sales/`, `Prospect_*`) | Frontend |
| In-process BFS first, Sigma.js only when needed | Frontend |
| Working-verify = auto route-mount + 30-min manual checklist with hard exit | Adversarial |
| `register-extractor.ts` wiring is the document-validation close-out | Data-flow |
| Networkx scope closes via graph_metrics consumption + declaring path-finding "Neo4j-native, intentional" | Data-flow |
| Customer-value hypothesis doc (A10) gates A3 viz | Adversarial |
| Top-3 attack-path templates lock as v1 scope (no parity chase) | Architecture |
| `source:'bloodhound-derived'` kill-switch on every BH-ingested node/edge | Data-flow |
| `OT*` label namespacing | Data-flow + Architecture |

## What was REJECTED from panel

- Adversarial reviewer's "skip BloodHound entirely" — overruled by deep-research finding that BH v9 OpenGraph makes the AD-only critique obsolete.
- Frontend reviewer's 30-day soft-disable for stale pages — overruled by Adversarial reviewer's "just delete, git is backup."
- Architecture reviewer's strict Option 3 (no BH at all, only borrow concepts) — overruled by user's explicit "fully integrated."

## Honest acknowledgment

The Adversarial reviewer made the strongest case at the time it was run, because the deep-research hadn't happened yet. After OpenGraph was surfaced, much of the Adversarial position weakened. **This is exactly why we ran deep-research between brainstorming rounds.** Karpathy rule 11 (visualize before debugging) and rule 6 (say "I don't know") in action.

The Adversarial reviewer's other positions (stale-audit scope, working-verify gold-plating, customer-hub deferral risk) all held up post-research and shaped the final plan.
