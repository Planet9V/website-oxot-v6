---
tags: [CYDTT-1, architecture, private-llm, knowledge-base]
cssclass: wide-page
---

# CYDTT-1 — Private AI Knowledge Platform

> **One-liner:** A fully on-premises, air-gap-capable private LLM knowledge platform running on the DGX SPARK, with voice I/O, hot-swappable models, hybrid vector+graph search, and Tailscale-tunnelled anonymous egress — zero cloud dependency.

---

## 🧱 Hardware Foundation

| Component | Spec |
|---|---|
| Platform | NVIDIA DGX SPARK |
| Memory | 128 GB unified LPDDR5x |
| Storage | 2 TB NVMe |
| AI Compute | 1 PFLOP INT8 |
| Deployment | On-premises, customer-site |
| Network | Tailscale mesh (WireGuard) |

---

## 🧠 LLM Layer — Hot-Swap Stack

All models run **locally** on the DGX SPARK. No API keys. No cloud calls.

```
User Request
    │
    ▼
LiteLLM  ←── model name routing (e.g. "qwen3-30b", "qwen3-8b")
    │
    ▼
llama-swap (Go binary)  ←── YAML config, swaps model processes on demand
    │
    ├── llama.cpp  (GGUF Q4_K_M — CPU+GPU unified memory)
    └── vLLM       (full-precision — when max throughput needed)
```

**Loaded Models:**

| Model | Role | Memory |
|---|---|---|
| Qwen3-30B-A3B | Primary reasoning, research, drafting | ~20 GB |
| Qwen3-8B | Fast inference, chat, search | ~6 GB |
| Qwen3-Embedding | 4096d semantic embeddings | ~2 GB |
| Qwen3.5-27B | Deep analysis, long context | ~18 GB |
| DeepSeek-R1 Distilled | Compliance, structured reasoning | ~12 GB |

Hot-swap means only one large model is loaded at a time. The llama-swap binary signals the active backend to unload and loads the next on first request — **no restart required**.

---

## 🎙️ Voice Layer

```
Microphone → whisper.cpp (STT) → text → FastAPI → LLM → text → kokoro-onnx (TTS) → Speaker
```

- **STT:** `whisper.cpp` — runs on-device, Whisper Large-v3, real-time streaming via WebSocket
- **TTS:** `kokoro-onnx` — lightweight, natural-sounding, ONNX runtime, ~300ms latency
- Both exposed via Docker containers on the internal bridge network
- React frontend microphone widget streams audio chunks over WebSocket to `/api/voice`

---

## 📄 Document Ingestion Pipeline

```
File Upload (PDF / DOCX / PPTX / HTML / Markdown)
    │
    ▼
Docling (IBM)  ←── layout-aware extraction, table/figure parsing
    │
    ├── Chunks → Qwen3-Embedding → pgvector (PostgreSQL)
    └── Full text → GLiNER NER → Neo4j entity nodes
```

- **Docling** preserves document structure — headings, tables, figures are extracted semantically, not as raw text dumps
- Each chunk is ~512 tokens with 64-token overlap
- Embeddings are 4096-dimensional, stored in **pgvector** for cosine similarity search
- Named entities extracted by **GLiNER** (zero-shot NER) are written as nodes to Neo4j

---

## 🔢 Embedding & Re-ranking

| Stage | Tool | Notes |
|---|---|---|
| Embedding | Qwen3-Embedding | 4096d vectors, stored in pgvector |
| Sparse retrieval | BM25 (pg_search) | Keyword-based first pass |
| Vector retrieval | pgvector cosine | Semantic similarity |
| Re-ranking | BGE-Reranker-v2-M3 | Cross-encoder, re-scores top-50 candidates |
| Final result | Top-K chunks | Passed to LLM as context (RAG) |

Hybrid search = BM25 **union** vector search → de-duplicate → cross-encoder re-rank → top 8 chunks → LLM prompt.

---

## 🐘 PostgreSQL 16 + pgvector

**Schema layout (internal only):**

```sql
knowledge.documents    -- ingested file metadata
knowledge.chunks       -- text chunks (512 tok) with source ref
knowledge.embeddings   -- 4096d vectors (pgvector) + chunk_id FK
auth.users             -- internal user accounts (bcrypt)
auth.sessions          -- JWT session store
api.rate_limits        -- per-user request throttling
canvas.diagrams        -- (OT-DiagramStudio) diagram layout state
```

Connection via **psycopg3** (async). All queries use parameterised statements. No ORM — raw SQL for performance on vector operations.

---

## 🕸️ Neo4j 5.x — Knowledge Graph

Graph layer stores **relationships between entities** extracted from documents — things pgvector cannot represent.

```
(:Document)-[:MENTIONS]->(:Entity)
(:Entity)-[:RELATES_TO]->(:Concept)
(:Regulation)-[:APPLIES_TO]->(:Technology)
(:Document)-[:CITES]->(:Document)
(:Person)-[:AUTHORED]->(:Document)
(:Standard)-[:SUPERSEDES]->(:Standard)
```

**Plugins:** APOC (bulk import, graph refactor) + GDS (community detection, PageRank for document importance scoring).

Graph RAG: LLM queries Neo4j for entity-centric context (e.g. "what regulations mention this vendor?") before assembling the final prompt.

---

## ⚡ FastAPI Backend — Endpoint Map

```
POST /api/chat              → LiteLLM → active model
GET  /api/chat/stream       → streaming WebSocket
POST /api/ingest            → Docling pipeline (Celery task)
GET  /api/ingest/{task_id}  → ingestion status
POST /api/search            → hybrid BM25 + vector + rerank
GET  /api/graph/entity      → Neo4j entity lookup
GET  /api/graph/related     → Neo4j shortest path / related docs
POST /api/voice/stt         → Whisper transcription
POST /api/voice/tts         → Kokoro synthesis
GET  /api/models            → list available models
POST /api/models/load       → trigger llama-swap hot-load
GET  /api/health            → service health
```

All endpoints require JWT Bearer token. Role-based access: `admin`, `user`, `readonly`, `api` (for service-to-service).

---

## 🖥️ Frontend — Next.js

- **Chat interface** with streaming token display and voice toggle
- **Model selector** — one-click hot-swap via `/api/models/load`
- **Document upload** with ingestion progress bar
- **Knowledge graph explorer** — D3.js or React-Force-Graph for Neo4j visualisation
- **Hybrid search panel** — returns chunks with source document and score
- **User management** (admin role only)
- Built with **Next.js 15 App Router**, Tailwind CSS, shadcn/ui components

---

## 🔒 Network & Privacy Architecture

### Tailscale Mesh

```
DGX SPARK node  ──── Tailscale ────  Team laptop A
                         │           Team laptop B
                         │           Remote site node
                         │
                    [Exit Node]
                         │
                   External internet
                   (anonymous egress,
                    org IP masked)
```

- All inter-node traffic encrypted with WireGuard (Tailscale managed)
- **Exit node** routes all external browsing through the DGX SPARK — team members appear to originate from the exit node's IP, not their own
- MagicDNS provides internal hostname resolution (`cydtt1.internal`, `postgres.internal`, etc.)
- No port forwarding, no public IP exposure on any service

### Privacy Guarantees

| Property | Implementation |
|---|---|
| Zero cloud API calls | All LLM inference is local (llama.cpp / vLLM) |
| Zero telemetry | No NVIDIA, Meta, Alibaba, or HuggingFace callbacks |
| No training data leakage | Models are static GGUF files — no fine-tuning from queries |
| On-premises data | pgvector and Neo4j volumes are local Docker volumes |
| No public endpoints | All services on Docker bridge network; Tailscale is the only ingress |
| Internal auth only | JWT signed with local secret; no OAuth to external IdP |

---

## 🐳 Docker Compose Service Map

```yaml
services:
  nginx          # Reverse proxy + TLS termination (port 443)
  next-frontend  # Next.js UI (port 3000, internal only)
  fastapi        # Backend API (port 8000, internal only)
  celery-worker  # Async tasks (ingest, embedding, NER)
  postgres       # PostgreSQL 16 + pgvector (port 5432)
  neo4j          # Neo4j 5.18 Community (ports 7474, 7687)
  redis          # Redis 7 — Celery broker + cache (port 6379)
  llama-swap     # Model hot-swap manager (port 8080)
  whisper-server # STT server (port 9000)
  kokoro-tts     # TTS server (port 9001)
```

All on `cydtt1_bridge` Docker network. Only nginx exposes a port to the host (443). All other services communicate over the internal network by service name.

---

## 💼 Business Use Cases

The platform functions as a **shared organisational intelligence layer**:

| Use Case | How |
|---|---|
| Internal knowledge base | Ingest company documents → searchable by any team member |
| Client/prospect research | Upload reports, LinkedIn exports, news → graph-linked entities |
| Standards & compliance tracking | IEC 62443, CRA, NIS2 docs ingested → ask natural-language questions |
| Report & proposal drafting | Chat interface with full document context in RAG |
| Cross-team knowledge linking | Neo4j connects entities across documents from different departments |
| Anonymous external research | Tailscale exit node — browse competitor sites without attribution |
| API integration | Other internal tools call FastAPI endpoints for search/chat/graph |

---

## 🔗 API Integration Pattern

External tools connect via FastAPI with an `api`-role JWT:

```python
import httpx

headers = {"Authorization": f"Bearer {API_TOKEN}"}

# Search the knowledge base
r = httpx.post("https://cydtt1.internal/api/search",
               json={"query": "IEC 62443 zone conduit requirements", "top_k": 8},
               headers=headers)

# Chat with context
r = httpx.post("https://cydtt1.internal/api/chat",
               json={"messages": [{"role": "user", "content": "Summarise NIS2 obligations"}]},
               headers=headers)
```

Any internal tool — OT-DiagramStudio, a custom dashboard, an Obsidian plugin, a CI/CD pipeline — can query the knowledge base or invoke the LLM via REST without standing up its own model infrastructure.

---

## 📎 Related Notes

- [[CYDTT-1 DGX SPARK Hardware Spec]]
- [[OT-DiagramStudio Architecture]]
- [[IEC 62443 Reference Tables]]
- [[Tailscale Exit Node Setup]]
- [[Docker Compose Full Manifest]]
- [[Neo4j Schema — Stage 1-4]]

