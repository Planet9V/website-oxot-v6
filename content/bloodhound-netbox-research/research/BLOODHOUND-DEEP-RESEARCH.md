# BloodHound CE Deep-Research

Conducted 2026-06-03 via Perplexity Deep Research + WebFetch + WebSearch. Refutes the adversarial reviewer's "BloodHound is AD-only, wrong tool for OT" position by surfacing OpenGraph and v9 extension definition schemas.

## Executive summary

**BloodHound CE v9.2.2 (released June 1, 2026) is a general-purpose identity-and-privilege graph engine.** Originally built for Active Directory, it now ingests arbitrary domains (Kubernetes, SaaS, CI/CD, OT) via **OpenGraph** — a documented JSON ingestion format with extension schemas. Apache 2.0 licensed. Go backend + React/Sigma.js frontend + PostgreSQL (app state) + Neo4j (graph). Docker Compose deployment.

The "API-first" design philosophy means external apps integrate via REST API, not by mounting BH React components. `/api/v2/file-upload/` is the canonical ingestion endpoint; supports HMAC-signed API keys for server-to-server.

## Architecture

| Component | Tech | Role |
|---|---|---|
| Frontend | React SPA + Sigma.js (WebGL) + graphology | Graph viewer, Cypher editor, saved queries, Explore page |
| Backend | Go REST API (single binary, serves SPA assets) | All UI operations → API calls; canonical integration boundary |
| App DB | PostgreSQL | Users, API tokens, saved-query metadata |
| Graph DB | Neo4j (default; graph_driver supports alternatives) | Graph data, attack-path computation |
| CLI | `bloodhound-cli` (Go binary) | Wraps `docker compose` for install/manage |

Deployment is **monolithic** but split into 3 containers (app, Postgres, Neo4j) via Docker Compose. The Go backend embeds the React SPA as static assets and serves the API.

## Why integration via API, not component embed

- BH's React app is bundled as a single SPA; **no npm package exposes individual components as a library**.
- Graph viewer is built on Sigma.js + graphology internally; not exposed as a reusable widget with documented props.
- Three viable integration approaches per the research:
  1. **Iframe embed** of full BH UI (preserves BH's routing + security model; minimal coupling).
  2. **Fork + selective component reuse** (maintenance burden tracking upstream).
  3. **Functional reimplementation** using Sigma.js directly + BH REST API for data (full control).

OXOT picked approach 3 per DA10.

## OpenGraph — the key for OT

Introduced in BH v8, expanded in v9 with **extension definition schemas**. OpenGraph allows custom node + edge types via standardized JSON:

```json
{
  "graph": {
    "nodes": [
      {
        "id": "ot-asset-123",
        "labels": ["OTAsset"],
        "properties": {
          "name": "PLC-1",
          "zone": "ZoneA",
          "criticality": "high",
          "highvalue": true,
          "source": "bloodhound-derived"
        }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "type": "OT_CAN_REACH",
        "source": "ot-asset-123",
        "target": "ot-asset-456",
        "properties": {
          "protocol": "Modbus/TCP",
          "source": "bloodhound-derived"
        }
      }
    ]
  }
}
```

BH validates: UTF-8 JSON, top-level `graph` object, `nodes` + `edges` arrays satisfy minimal schema. Beyond that, label and property naming are open.

**Extension definition schemas** (v9): define expected labels, properties, relationships for a domain. When installed alongside conformant payloads, BH treats the result as a **structured graph** — enabling pathfinding, node search, and (in Enterprise) risk metrics on the custom domain.

**OT integration plan (DA13):** define `OTAsset, OTArea, OTSystem, OTFacility, OTDivision, OTOrganization` labels + `OT_BELONGS_TO, OT_CAN_REACH, OT_CAN_CONFIGURE, OT_IN_ZONE` edges in our extension schema. High-value tagging via `highvalue:true` property + `system_tags` containing `admin_tier_0` (consistent with BH community query conventions).

## Data model mapping (BH → OT)

| BH (AD-origin) | OT analog (OXOT) | Notes |
|---|---|---|
| `Computer` | `OTAsset` | Per-asset granularity |
| `Group` | `OTArea` | IEC62443 zones (we call them areas) |
| `Domain` | `OTFacility` | Site/plant boundary |
| `HighValueTarget` (boolean) | `highvalue:true` on `OTAsset` where `criticality='critical' OR sil_level >= 2` | Property flag |
| `admin_tier_0` tag | Same convention | Reuse BH's community query patterns |
| `MemberOf` | `OT_IN_ZONE` | Zone membership |
| `AdminTo` | `OT_CAN_CONFIGURE` | Configure access |
| `HasSession` | `OT_HAS_ACTIVE_SESSION` (ephemeral) | If we collect session data |
| `CanRDP` | `OT_CAN_REACH {protocol, port}` | Network reachability per protocol |

## API surface

- **Auth:** JWT (browser) or HMAC-signed API keys (server-to-server). API keys have Token ID + Token Key; HMAC signature over `(API key, HTTP method + URI, request time, body)`. Per BH docs.
- **Ingestion:** `POST /api/v2/file-upload/` accepts classic JSON (SharpHound/AzureHound shape with `meta` + `data`) or OpenGraph payloads. Single upload can include multiple files in a zip.
- **Cypher execution:** documented in BH API reference (path not enumerated in research). POST with `{cypher, parameters}` body, JWT or HMAC auth, returns JSON node/edge results.
- **Pathfinding:** UI calls a dedicated endpoint with source/target node IDs, returns paths. Same endpoint reusable by integrators.
- **Saved queries:** list / create / update / delete / share endpoints back the community Query Library + Explore → Cypher saved queries UI.

## Canonical Cypher patterns for OT

Per the deep-research, these BH patterns adapt cleanly to OT (substituting `OTAsset` for `Computer`, `OTArea` for `Group`, `OT_CAN_REACH|OT_CAN_CONFIGURE|OT_IN_ZONE` for AD edges):

### 1. Shortest path from compromised IT to safety-critical OT

```cypher
MATCH p = shortestPath(
  (a:OTAsset {purdue_level:4})
   -[:OT_CAN_REACH|OT_CAN_CONFIGURE|OT_IN_ZONE*..8]->
  (b:OTAsset)
)
WHERE b.sil_level >= 2 OR b.criticality = 'critical'
RETURN p
```

### 2. Conduit-bypass detection (paths NOT traversing firewalls/diodes)

```cypher
MATCH p = allShortestPaths(
  (a:OTArea)-[*..6]->(b:OTArea)
)
WHERE NONE(n IN nodes(p) WHERE n.type IN ['firewall','data_diode'])
  AND a <> b
RETURN p
LIMIT 100
```

### 3. Blast radius from compromised L4 asset

```cypher
MATCH (compromised:OTAsset {purdue_level:4, source:'bloodhound-derived'})
-[*..6]->(downstream)
RETURN downstream.name, downstream.purdue_level, count(*) AS reach_count
ORDER BY reach_count DESC
LIMIT 25
```

### 4. Tier-0 OT reachability from external network

```cypher
MATCH p = allShortestPaths(
  (e:OTAsset {name:'External-Internet-Phantom'})-[*..10]->(b:OTAsset)
)
WHERE 'admin_tier_0' IN split(b.system_tags, ' ')
RETURN p
LIMIT 100
```

These are the 3-4 templates DA10 will lock for the A3 viewer.

## Coexistence with our existing Neo4j (the contentious finding)

The research is explicit:

> **BloodHound does not describe or support scenarios where it is pointed at a shared, multi-tenant Neo4j instance.** [...] **The safest and most robust approach is to treat BloodHound's graph database as dedicated to BloodHound.**

This is in tension with DA9 (single shared Neo4j). The mitigations:

1. **A0 compatibility test (gate)** — observe BH's migrations against an isolated copy of our Neo4j BEFORE production deploy.
2. **`OT*` label namespacing (DA13)** — collision avoidance.
3. **`source:'bloodhound-derived'` property (DA12)** — kill-switch + droppability as a set.
4. **Pinned BH version** — review every upgrade for migration safety.

If A0 fails, fall back to Option A (separate BH Neo4j with ETL between them). See PHASE-A-UPGRADE.md A0.

## License

Apache 2.0. Permissive — modify, fork, embed in proprietary products. Obligations: preserve LICENSE + NOTICE, mark modified files. Trademark restriction: cannot use "BloodHound" name as our product branding.

## Sources

- [BloodHound CE Quickstart](https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart)
- [BloodHound API documentation](https://bloodhound.specterops.io/integrations/bloodhound-api/working-with-api)
- [BloodHound API reference overview](https://bloodhound.specterops.io/reference/overview)
- [OpenGraph overview](https://bloodhound.specterops.io/opengraph/overview)
- [OpenGraph developer guide — graph data format](https://bloodhound.specterops.io/opengraph/developer/graph-data)
- [BloodHound JSON formats (classic SharpHound/AzureHound)](https://bloodhound.specterops.io/integrations/bloodhound-api/json-formats)
- [Custom installation + graph_driver config](https://bloodhound.specterops.io/get-started/custom-installation)
- [BloodHound CE GitHub repository](https://github.com/SpecterOps/BloodHound)
- [BloodHound CE Sample Data — m4lwhere](https://github.com/m4lwhere/Bloodhound-CE-Sample-Data)
- [BloodHound Unleashed — OpenGraph + custom data ingestion](https://undercodetesting.com/bloodhound-unleashed-how-custom-data-ingestion-is-revolutionizing-attack-path-analysis/)
- [BloodHound Query Library — SpecterOps](https://github.com/SpecterOps/BloodHoundQueryLibrary)
- [Compass Security custom queries](https://github.com/CompassSecurity/bloodhoundce-resources/blob/main/custom_queries/BloodHound_CE_Custom_Queries.md)
- [Fantastic BloodHound Queries — luemmelsec](https://luemmelsec.github.io/Fantastic-BloodHound-Queries-and-Where-to-Find-Them/)
- [BloodHound Cypher Cheatsheet — hausec](https://hausec.com/2019/09/09/bloodhound-cypher-cheatsheet/)
- [Cypher primer for BloodHound — Cyber Advisors](https://blog.cyberadvisors.com/technical-blog/blog/cypher-query-primer-bloodhound)
- [Sigma.js](https://www.sigmajs.org)
- [Enriching BloodHound Data — spookysec](https://blog.spookysec.net/Enriching-BloodHound-Data/)
- [ADCS Attack Paths in BloodHound Part 2 — SpecterOps](https://posts.specterops.io/adcs-attack-paths-in-bloodhound-part-2-ac7f925d1547)
- [Apache 2.0 License text](https://www.apache.org/licenses/LICENSE-2.0)
