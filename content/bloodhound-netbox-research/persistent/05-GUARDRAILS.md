# GUARDRAILS.md — Drift prevention rules

Rules every Phase A contributor (human or agent) reads BEFORE writing code. Violations block PRs.

## The North Star

> **If it already exists, USE it. If you're tempted to build a new component, library, helper, abstraction, or pattern, STOP and check `LIBRARY-AND-CODEBASE-REUSE-MAP.md` first.**

Phase A succeeds when the *connective tissue* is built and the *one new product surface* (attack-path) ships. It does NOT succeed by rebuilding things we already have.

## Karpathy Core Discipline (apply every commit)

### R1 — Build from scratch, then use the library

Before adding any new library: write what it does in plain English in the PR description. If you can't explain it, don't merge.

**Phase A applications:**
- Sigma.js for A3 → must explain WebGL graph layout + node rendering before adding.
- `graphology` for A3 → must explain in-memory graph manipulation before adding.
- HMAC signature in A4 → use `node:crypto` (already vanilla); no `crypto-js` or fancy lib.
- Cypher templates in A3 → hand-write them, don't pull a "BloodHound CE SDK" wrapper.

### R2 — Start simple. Add complexity only when forced

**Phase A applications:**
- A3 ships ONE template (L4→L1-SIS) end-to-end before adding the other 2.
- A2 collector starts with ONE organization end-to-end before scaling.
- A6 wires `extract_fmeca` stage first; HAZOP/RAMS/MOR/RR/CIL follow as separate commits.
- A8 route-mount smoke uses ONE retry, ONE viewport size. No matrix.

### R3 — Know your data before you touch the code

**Phase A applications:**
- A0 OBSERVES Neo4j state BEFORE running BH. `db.constraints()`, `db.indexes()`, `db.labels()`.
- A2 collector reads REAL `ot_inventory` rows + REAL CDT edges. No mock data shaping the schema decisions.
- A6 sample documents are REAL FMECA/HAZOP/RAMS PDFs uploaded to dev environment, not synthetic JSON.

### R4 — Overfit a tiny batch first

**Phase A applications:**
- A2: ingest ONE facility, prove BH queries return expected paths, scale up.
- A3: render ONE path on a sample graph, then tackle production scale.
- A6: extract ONE FMECA document, verify all fields populated, then enable for HAZOP/RAMS.

### R5 — Vanilla over clever

**Phase A applications:**
- BH deployment via SpecterOps' published Docker Compose, NOT a custom build.
- Sigma.js used per its standard examples, NOT shimmed inside a custom abstraction layer.
- BH HMAC client uses `node:crypto.createHmac`, NOT a custom signature scheme.
- Existing `connections.ts` pool pattern stays; NO new ORM, NO new query builder.

## Karpathy Honesty Rules

### R6 — Say "I don't know" out loud

**Phase A applications:**
- A0 report: explicit list of every migration BH ran. No editorial — just facts.
- progress.md: every entry says what was OBSERVED, not assumed.
- A9 manual smoke: write "I verified X" only if you actually verified X.

### R7 — Empirical vs theoretical

**Phase A applications:**
- "BH responded with HTTP 200" (empirical) vs "BH should work" (theoretical) — distinguish in PR descriptions.
- Test results: include the actual command + output, not summary claims.

### R8 — No marketing language

**Phase A applications:**
- Forbidden in PR titles, commit messages, code comments: "comprehensive", "robust", "seamless", "world-class", "production-ready", "next-generation", "best-in-class".
- Allowed: factual descriptions ("adds X", "wires Y", "fixes Z").

## Karpathy Vibe-Coding Boundary

### R9 — Vibe-coding permitted

- Stale-audit script (A5)
- Playwright route-mount spec (A8)
- BH deployment Compose/Dockerfile (A1)
- GitHub Actions workflows
- Manual smoke checklist (A9)
- ATTACK-PATH-USE-CASES.md draft (A10)

### R10 — Vibe-coding FORBIDDEN — every line read and reviewed

- **A0 compat-test execution + report** (data integrity decision).
- **A1 BH deploy config** (it's the production graph DB).
- **A2 OT collector OpenGraph schema + ETL code** (writes to shared Neo4j).
- **A4 BH HMAC client** (auth boundary).
- **A6 register-extract stage + DB persistence** (writes to `seldon.*` tables).
- **Any DB migration** added by Phase A (e.g., `critical_items_list` table if A6 needs it).

If a PR touches anything in R10 and the description includes "should work" or "I think this is fine" — block the merge until someone reads every line.

## Karpathy Process Rules

### R11 — Visualize before debugging

**Phase A applications:**
- A0: capture Neo4j constraints + indexes BEFORE BH boots. No "let me deploy and see what happens."
- A2: print a sample OpenGraph payload locally and inspect by hand before POSTing.
- A3: render a static path on a sample graph (mocked data) before connecting BH.

### R12 — Reproduce before fixing

**Phase A applications:**
- A0 collision found? Document Cypher reproduction case BEFORE patching the OT* taxonomy.
- A3 path doesn't render? Capture the BH API response JSON BEFORE changing Sigma config.
- A6 extraction returns empty rows? Save the input document + LLM response + database query result BEFORE tweaking the prompt.

### R13 — Implement before importing

**Phase A applications:**
- A3: write `src/lib/attack-paths.ts` (in-process BFS) for ≤1k node graphs BEFORE reaching for Sigma WebGL.
- A2: write a Python OpenGraph builder loop before adopting an opengraph helper lib (if one exists).
- A4: write HMAC signer with `node:crypto` directly before installing any `hmac-bloodhound-client` package.

### R14 — One change per commit

**Phase A applications:**
- A0 = 1 PR (compat-test report).
- A1 = 1 PR (BH Railway service).
- A2 = 1+ PRs (ETL collector, cron wiring as separate commits).
- A3 = ≥3 PRs (template 1, template 2, template 3 — separate).
- A5 = 1 PR (audit script in one commit, deletion in another, both within same PR is OK).

## Codebase Intelligence (CLAUDE.md inherited)

### R15-R22 — Graphify before grep

Before grep across `server/lib/` or `src/`, query graphify:

```bash
graphify query "<question>" --graph /Users/jimmcknney/Documents/ot_frontend/.graphify/oxot-admin/graph.json
```

Phase A: every "does X exist?" question goes to graphify FIRST. If not in graph, fall back to grep.

## Phase-A-specific guardrails

### G-A1 — No new auth provider

Existing `server/auth.ts` + session middleware handles all OXOT user auth. A4 adds a BH client, NOT a new identity provider.

### G-A2 — No new graph database

`oxot-neo4j` + `oxot-postgres` only. No DuckDB, no SQLite caches, no Memgraph, no Cassandra. BH brings its own Postgres for app state (separate from oxot-postgres) — that's the only new DB.

### G-A3 — No new viz library beyond Sigma + graphology

React Flow stays. Three.js / react-three-fiber stay where they're used today. Cytoscape stays where used. **No NEW viz library added in Phase A beyond Sigma + graphology.**

### G-A4 — No new pipeline framework

Existing `server/processes/stages/*` system. A6 adds one new stage file. Does NOT introduce a new task queue, no Celery, no BullMQ rewrite.

### G-A5 — No fork of BloodHound

Apache 2.0 allows it. We don't do it. Use BH CE upstream as a Docker image, integrate via REST API (DA10). If we ever need a fork, that's its own brainstorming session.

### G-A6 — No NPM packages added without justification

For every new dep added to `package.json` in Phase A, the PR description must:
1. State why the existing dep set is insufficient.
2. Show the alternative (use existing or vanilla node:crypto/fs/etc.).
3. Confirm the dep is actively maintained (last release < 12 months).

Allowed Phase A deps (no further justification needed):
- `sigma` + `graphology` (A3)
- `@playwright/test` already in deps (A8 reuse)
- Standard `glob`, `fs`, `child_process` (A5)

### G-A7 — No drift on Neo4j label naming

Existing CDT labels: `Asset`, `Area`, `Facility`, `System`, `Equipment`, `Customer`, `Organization`, `Division`. Hands off.

BH-derived labels MUST be prefixed `OT*`: `OTAsset`, `OTArea`, `OTFacility`, `OTSystem`, `OTEquipment`, `OTOrganization`, `OTDivision`.

BH-derived edges MUST be prefixed `OT_*`: `OT_BELONGS_TO`, `OT_CAN_REACH`, `OT_CAN_CONFIGURE`, `OT_IN_ZONE`.

Every BH-derived node + edge MUST carry `source: 'bloodhound-derived'` property. This is the kill-switch (DA12).

### G-A8 — No reaching into BH internals

OXOT calls BH via REST API only. No direct Cypher to BH's Neo4j shadow tables. No reading BH's Postgres directly. BH is a service; integrate via documented endpoints.

### G-A9 — Reuse-map referenced in every PR

Every Phase A PR description must include the line:

> Reuse map referenced: [LIBRARY-AND-CODEBASE-REUSE-MAP.md](../../update_2/LIBRARY-AND-CODEBASE-REUSE-MAP.md). Confirmed no rebuild of: [list components/libs you considered and ruled out].

If the list is empty, the PR is suspect — almost every Phase A item could rebuild something. Sigma.js component COULD reuse AssetProfilePanel for drill-down. Register-extract stage COULD reuse pipeline-stage.ts. Etc.

### G-A10 — Stage gating

A1 cannot start until A0 PASSES.
A2/A3/A4 cannot start until A1 ships.
A8 cannot start until A5 ships.
A9 + A10 last.

Don't run them in parallel just because you want speed. Wait.

## When in doubt — checklist

Before any code change in Phase A, ask yourself:

- [ ] Did I read the relevant SPEC section in [SPECIFICATIONS.md](./SPECIFICATIONS.md)?
- [ ] Did I check [LIBRARY-AND-CODEBASE-REUSE-MAP.md](./LIBRARY-AND-CODEBASE-REUSE-MAP.md) for existing surface?
- [ ] Am I within the Karpathy boundaries (R1-R14)?
- [ ] Am I in R10 territory? If yes, this needs every-line review.
- [ ] Is my commit one logical change (R14)?
- [ ] Did I add empirical evidence to `progress.md`?

If any answer is "no" or "I don't know" — pause and re-orient.

## Escalation

If you hit a guardrail and think it should be relaxed for a specific case:
1. Document the case in `findings.md`.
2. Stop coding.
3. Ask Jim (the user) to confirm the exception.
4. Update this file if the exception becomes general.

NEVER silently violate. Drift comes from "just this once" decisions.
