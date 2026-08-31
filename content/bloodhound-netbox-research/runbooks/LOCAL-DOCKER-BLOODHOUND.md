# LOCAL-DOCKER-BLOODHOUND.md — runbook

**Purpose:** stand up BloodHound CE v9.2.2 stack locally for Phase A development per DA9 (reversed) + DA14 (local Docker).

**Audience:** developer executing A1 of Phase A.

**Expected time:** 30 min first run; <5 min subsequent.

## Prerequisites

- `docker` and `docker compose` (or `docker-compose`) on local machine.
- ~6 GB disk for BH images + initial data.
- Available local ports: 8080 (BH UI/API), 7474 (Neo4j browser), 7687 (Neo4j bolt), 5432 (BH Postgres — use 5433 if local Postgres conflict).
- `bloodhound-cli` is NOT required for this workflow. We use `docker compose` directly to keep the setup vanilla per Karpathy R5.

## Initial setup

### Step 1 — Create local working directory

```bash
mkdir -p ~/bloodhound-local && cd ~/bloodhound-local
```

This directory is OUTSIDE the OXOT repo. Per `05-GUARDRAILS.md` G-A6 we don't add docker-compose churn to `oxot-admin`.

### Step 2 — Pull SpecterOps' canonical docker-compose template

```bash
curl -fsSL \
  -o docker-compose.yml \
  https://raw.githubusercontent.com/SpecterOps/BloodHound/main/examples/docker-compose/docker-compose.yml

curl -fsSL \
  -o bloodhound.config.json \
  https://raw.githubusercontent.com/SpecterOps/BloodHound/main/examples/docker-compose/bloodhound.config.json
```

> If these URLs return 404, check the BloodHound repo `examples/docker-compose/` directory directly and pin a working commit hash.

### Step 3 — Edit `bloodhound.config.json`

Confirm `graph_driver.driver` is `"neo4j"` (the default). Default URI `bolt://neo4j:7687` will hit the BH-bundled Neo4j container.

### Step 4 — Pin BH version

In `docker-compose.yml`, change any `:latest` to `:9.2.2` for the `bloodhound` service. This freezes our integration against a known release; we re-evaluate on upgrade per `05-GUARDRAILS.md` G-A7.

### Step 5 — First boot

```bash
docker compose up -d
```

Wait ~60 seconds for BH to initialize Postgres + Neo4j + run migrations.

### Step 6 — Capture initial admin password

```bash
docker compose logs bloodhound | grep -i 'admin password'
```

The password is generated on first boot. **Save it immediately** in your password manager. It will NOT be re-shown.

### Step 7 — Verify

```bash
# UI reachable
curl -sf http://localhost:8080 -o /dev/null && echo "UI: OK" || echo "UI: FAIL"

# API healthy
curl -sf http://localhost:8080/api/version | jq

# Neo4j browser
curl -sf http://localhost:7474 -o /dev/null && echo "Neo4j: OK" || echo "Neo4j: FAIL"
```

Expected:
- UI loads at http://localhost:8080
- `/api/version` returns JSON with version `"9.2.2"`
- Neo4j browser loads at http://localhost:7474

### Step 8 — Log in + generate HMAC API key (needed for A4)

1. Open http://localhost:8080 in browser.
2. Log in as `admin` with the password from Step 6.
3. Navigate to **My Profile → API Key Management**.
4. Click **Generate New Key**.
5. Save the `Token ID` and `Token Key` **immediately** — Token Key is shown ONCE.

Store both in your shell env (NOT in any committed file):

```bash
export BLOODHOUND_BASE_URL="http://localhost:8080"
export BLOODHOUND_TOKEN_ID="<from step 5>"
export BLOODHOUND_TOKEN_KEY="<from step 5>"
```

For persistent use in OXOT dev, add to `oxot-admin/.env.local` (which is in `.gitignore`).

## Smoke test — empty graph

After Step 7 + 8, run:

```bash
# Using HMAC client (server/lib/bloodhound-client.ts from A4)
# Or via cypher-shell directly:

docker compose exec neo4j cypher-shell -u neo4j -p bloodhoundcommunityedition \
  "MATCH (n) RETURN count(n) AS total_nodes"
```

Expected: `total_nodes: 0` (no data ingested yet).

A2 ETL collector will populate this. See `03-SPECIFICATIONS.md` §A2.

## Daily operations

### Start

```bash
cd ~/bloodhound-local
docker compose up -d
```

### Stop

```bash
docker compose down
```

This preserves the Postgres + Neo4j volumes (data survives stop/start).

### Wipe and restart

```bash
docker compose down -v   # -v drops volumes
docker compose up -d
# repeat Step 6 + Step 8 (new admin password + new API keys)
```

Use this when:
- Testing A2 collector idempotency from scratch
- After breaking changes to OpenGraph schema
- BH version bump where data isn't auto-migrated

### View logs

```bash
docker compose logs -f bloodhound
docker compose logs -f neo4j
```

### Drop ingested OT data only (without full wipe)

```bash
docker compose exec neo4j cypher-shell -u neo4j -p bloodhoundcommunityedition \
  "MATCH (n) WHERE any(l IN labels(n) WHERE l STARTS WITH 'OT') DETACH DELETE n"
```

This deletes all `OT*`-prefixed nodes (per DA13). Used during A2 collector iteration.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `docker compose up` fails with port conflict | Local service on 5432 or 7687 | Edit `docker-compose.yml` to remap (e.g. `"5433:5432"`); update `BLOODHOUND_BASE_URL` env |
| BH UI shows "Cannot connect to graph database" | Neo4j container slow to boot | Wait 30s, refresh. Check `docker compose logs neo4j` for `Remote interface available at...` |
| `/api/version` returns 401 | JWT expired (UI auth) or wrong HMAC | Re-log-in via UI for JWT; regenerate API key if HMAC is wrong |
| OpenGraph upload returns 400 | Malformed JSON, missing `graph` top-level, missing `nodes`/`edges` arrays | Validate payload locally with `jq .` first; see `research/BLOODHOUND-DEEP-RESEARCH.md` for schema |
| Neo4j container OOM | Default heap too small for ingest at scale | Add `NEO4J_dbms_memory_heap_max__size=2G` to neo4j service env |
| BH consumes >5GB after week of ETL | OpenGraph payload archive accumulating | Routine `docker compose exec bloodhound rm /tmp/uploads/*` or set retention policy |

## When this runbook is wrong

If commands here diverge from observed behavior:

1. Log the discrepancy in `session/findings.md` as a new F-number.
2. Reproduce per Karpathy R12.
3. Update this file with the correct command in a new section dated.
4. Preserve the old version as a comment block.

## Pinned references

- SpecterOps BloodHound CE GitHub: https://github.com/SpecterOps/BloodHound
- BH CE Quickstart: https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart
- BH API docs: https://bloodhound.specterops.io/integrations/bloodhound-api/working-with-api
- OpenGraph overview: https://bloodhound.specterops.io/opengraph/overview
- More research in `research/BLOODHOUND-DEEP-RESEARCH.md`
