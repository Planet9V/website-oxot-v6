# OXOT Product-Service-Launch Playbook — Master Index

**Run started:** 2026-08-21 · **Current phase:** Phase 1 — Discovery, complete, **awaiting your approval before Track 1/Track 2/Phase 3 begin.**

**Start here if you're new to this folder:** [`../02-discovery/phase-1-discovery.md`](../02-discovery/phase-1-discovery.md) — the converged Phase 1 deliverable, including the two urgent findings and the approval-gate questions.

---

## Folder structure

```
product-marketing-playbook/
├── 00-index/
│   └── INDEX.md                          ← you are here
├── 01-source-extraction/                 ← raw structured extraction, ~50 source docs, 4 files
│   ├── pdfs-oxot-product-cdt-sheets.md          (731 lines) — 4 product/sell-sheet PDFs
│   ├── public-documents-cdt-corpus.md           (354 lines) — 7 files in /public/documents (live site)
│   ├── cdt-methodology-and-brand.md             (376 lines) — 14 internal CDT papers + style guide
│   └── iec62443-ts50701-and-spec-sheets.md      (181 lines) — rail-engagement IEC 62443/TS 50701 corpus
├── 02-discovery/                         ← Phase 1 synthesis (this run's main deliverable)
│   ├── phase-1-discovery.md                     (104 lines) — ★ START HERE — converged doc + approval gate
│   ├── oxot-cheat-sheet.md                      (115 lines) — fast-reference: business/products/services/company
│   ├── product-marketing-context.md             (229 lines) — positioning, personas, objections, customer language
│   └── competitor-landscape.md                  (144 lines) — competitor profiles + positioning map
├── 03-copy/                              ← Track 1 (Copy) — not started, awaiting approval gate
├── 04-design-build/                      ← Track 2 (Design/Build) — not started, awaiting approval gate
└── 05-polish-sync/                       ← Phase 3 (Polish & Sync Check) — not started, awaiting approval gate
```

---

## Reading order

1. **[`02-discovery/phase-1-discovery.md`](../02-discovery/phase-1-discovery.md)** — the converged deliverable. Read this first; it links to everything else and states the two urgent findings up front.
2. **[`02-discovery/oxot-cheat-sheet.md`](../02-discovery/oxot-cheat-sheet.md)** — the condensed business/product/service/company reference, tagged LIVE vs. INTERNAL-only throughout.
3. **[`02-discovery/product-marketing-context.md`](../02-discovery/product-marketing-context.md)** — full positioning statement and both personas, plus objections, switching dynamics, and customer language.
4. **[`02-discovery/competitor-landscape.md`](../02-discovery/competitor-landscape.md)** — competitor profiles (Claroty, Dragos, Nozomi, Armis, Axio, RiskLens) and category positioning.
5. **The four `01-source-extraction/` files** — go here only when you need the full detail, exact quotes, or sourcing behind a claim in the documents above. Each one is self-contained and heavily cross-referenced.

---

## What's tracked where (for future search/reference)

| Looking for... | Go to |
|---|---|
| Two urgent, time-sensitive findings (live security exposure, unverified numbers) | `02-discovery/phase-1-discovery.md` §1 |
| What's live on the site today vs. internal-only | `02-discovery/oxot-cheat-sheet.md` §2–3 |
| Buyer personas, objections, customer language | `02-discovery/product-marketing-context.md` |
| Who OXOT competes with (and doesn't) | `02-discovery/competitor-landscape.md` |
| Exact quotes/numbers from the 2 product PDFs + internal sell sheet | `01-source-extraction/pdfs-oxot-product-cdt-sheets.md` |
| What's in the 7 public, downloadable `/public/documents` files today | `01-source-extraction/public-documents-cdt-corpus.md` |
| TACAM/ATQ/ALE/SLT methodology detail, the rail case study | `01-source-extraction/cdt-methodology-and-brand.md` |
| IEC 62443/TS 50701 depth, the anonymized rail-engagement numbers | `01-source-extraction/iec62443-ts50701-and-spec-sheets.md` |

---

## Status by phase

| Phase | Status |
|---|---|
| Phase 1 — Discovery (source extraction → cheat sheet → product-marketing → competitor-profiling → converged doc) | ✅ Complete |
| 🚦 Approval gate | **Awaiting your sign-off** |
| Track 1 — Copy (copywriting, competitors, sales-enablement, seo-audit, schema) | Not started |
| Track 2 — Design/Build (site-builder/frontend-design, motion-system, existing-page updates) | Not started |
| Phase 3 — Polish & Sync Check (polish-pass + cro) | Not started |
| Ship-it | Not started |

---

## Notes on tooling used this run

- `claude-flow`/`ruflo` mesh swarm (`swarm-1787327000685-9wqy7g`, max-agents 3) was initialized per your instruction; the actual extraction work was performed by 4 parallel background Agent tasks (Claude Code's own subagent tool), not by ruflo-coordinated agents — ruflo's swarm primitives don't currently drive Claude Code's Agent/Task tools directly.
- Competitor profiling ran at quick-scan/positioning depth via live web search — the skill's standard Firecrawl/DataForSEO tooling for SEO/traffic/backlink data isn't connected in this environment. Flagged explicitly in `competitor-landscape.md`.
