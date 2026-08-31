# File map — where everything lives

For the question "I need to change X, which file?". Line counts are from
2026-08-08 and are there to tell you how big a thing you are opening, not to be
kept exact.

> **First, the repo-level fork in the road.** This directory (`web/`) is the
> **new** site. The repository root is a **different, older application** — the
> Next 15 CMS with an admin studio, a Postgres content store and an AI visitor
> agent. Root-level `docs/`, `content/`, `data/`, `db/` and the root `README.md`
> describe **that** app, not this one. See the root [`README.md`](../../README.md).

---

## Top level of `web/`

| Path | What |
|---|---|
| `src/` | The application. Everything below. |
| `scripts/` | The four harnesses: `measure.mjs`, `content-guards.mjs`, `chrome-guards.mjs`, `copy-inventory.mjs`. Plain Node + Playwright, run by hand. |
| `docs/` | This documentation set. |
| `PROGRESS.md` | **The state of record.** The queue, the grades, the decisions and the log. Update it after every batch — CLAUDE.md §7f. |
| `AGENTS.md` | Auto-written by `next dev`. Warns that this is Next 16 and the bundled docs, not your training data, are authoritative. |
| `railway.json`, `Dockerfile` | Deploy config for this app specifically — the **root** `railway.json` runs the old app's migrations and will fail here. |
| `vitest.config.ts` | Test config, including the `@/` alias. |

---

## Routes — `src/app/`

```
src/app/
├── [locale]/
│   ├── layout.tsx      157  fonts, theme provider, MotionConfig, hreflang
│   ├── page.tsx        258  /            home
│   ├── cra/            433  /cra         the Regulation  ← largest route
│   ├── conformity/     257  /conformity  the product
│   ├── twin/           172  /twin        the Cyber Digital Twin
│   ├── consulting/     194  /consulting  engagements + derivation + bench
│   ├── company/        167  /company     who OXOT is
│   ├── check/          174  /check       the 2-minute wizard (shell only)
│   └── contact/        238  /contact     the written review
├── api/
│   ├── intake/          88  POST — captures the lead, unlocks the PDF
│   ├── check/report/    87  POST — renders the PDF, writes nothing
│   └── contact/        160  POST — written-review request, rate-limited
└── globals.css         448  the design system as CSS custom properties
```

`src/proxy.ts` (83) sits beside `app/` and does locale negotiation. **Not**
`middleware.ts` — that name silently never runs in Next 16.

---

## Where the words live

Copy comes from **four** places. This is the single most useful thing to know
about the codebase, and the reason [`PAGE-COPY.md`](./PAGE-COPY.md) is generated
from the rendered page rather than read out of any one file.

| Kind | Lives in | Shape |
|---|---|---|
| UI labels, headings, section copy | `src/i18n/en.ts` (645) · `src/i18n/nl.ts` (593) | Plain nested objects. `en.ts` defines the type; `nl.ts` must `satisfies Dictionary`, so a missing Dutch key fails the build. |
| **Claims** — anything checkable | `src/content/claims.ts` and the per-area `claims.*.ts` | `Claim` objects carrying `en`, `nl`, `source`, `cleared`, and optionally `proof`, `recheck`, `note`. See [`CONTENT-SOURCES.md`](./CONTENT-SOURCES.md). |
| Regulation facts | `src/content/cra-reference.ts` (500) | Annex categories, tiers, Article 14 steps, EUR-Lex deep links. Not prose — data the pages derive prose from. |
| Structured page data | `src/components/*/…` | The wizard's questions and verdicts, the nine Conformity modules, the four personas, the six zones. |

### The claim files

| File | Claims | With proof URL | Area |
|---|---:|---:|---|
| `src/content/claims.ts` | 27 | 15 | Site-wide: the wedge, the CRA, the grant, OXOT itself |
| `src/components/twin/twin-claims.ts` | 23 | 10 | `/twin` |
| `src/components/consulting/claims.consulting.ts` | 15 | 0 | `/consulting`, plus the six-zone derivation table |
| `src/components/company/claims.company.ts` | 15 | 0 | `/company` |
| `src/components/check/claims.ts` | 13 | 11 | `/check` |
| `src/components/contact/claims.ts` | 5 | 0 | `/contact` |
| | **98** | **36** | |

---

## Components — `src/components/`

| Directory | Notable files |
|---|---|
| `shell/` | `nav.ts` (65) — **`PATHS`, the single source for "what pages exist"**. Plus header, footer, wordmark, theme toggle, language switch, motion provider. |
| `check/` | `classify.ts` (889) — the classifier: six questions, five verdicts, the FOSS carve-out, Article 69. `check-client.tsx` (550) is the stateful UI. `report-gate.tsx` is the email gate. **`classify.test.ts` (225)**. |
| `cra/` | `timeline.tsx`, `roads-map.tsx`, `timeline-dates.ts`, `annex-one-grid.tsx`, `cite.tsx`. |
| `twin/` | `twin-claims.ts` (367), `seven-layers.tsx`, `decision-distribution.tsx`, `credential.tsx`. |
| `consulting/` | `claims.consulting.ts` (365) with the zone table, `zone-conduit-diagram.tsx`, `derivation.tsx`, `engagements.tsx`, **`claims.consulting.test.ts`**. |
| `conformity/` | `product.ts` (228) — nine modules, five clocks, six measures, six sources. |
| `company/` | `claims.company.ts`, `founders.tsx`, `sample-paths.tsx`. |
| `personas/` | `personas.ts` (160) — the four readers. `persona-picker.tsx` is the client disclosure. |
| `contact/` | `contact-form.tsx` (386). |
| `ui/` | shadcn primitives (`new-york`, `neutral`, CSS variables). `card.tsx` carries the mandatory hover-lift. |

---

## Library — `src/lib/`

| File | What |
|---|---|
| `leads.ts` (99) | **The single writer** for `cra_readiness_leads`. Row count is the tracked outcome metric. |
| `db.ts` (34) | `pg` pool. |
| `rate-limit.ts` (41) | In-memory limiter. `/api/contact` uses 5/min per IP. |
| `report-pdf.tsx` (662) | The PDF, in `@react-pdf/renderer` primitives with embedded TTFs. |
| `report-payload.ts` (145) | Sanitises and length-caps everything before it reaches the PDF. |
| `pdf-fonts/` | The embedded faces. |

---

## i18n — `src/i18n/`

| File | What |
|---|---|
| `en.ts` / `nl.ts` | The dictionaries. `en.ts` exports the `Dictionary` type. |
| `config.ts` (52) | `LOCALES`, `DEFAULT_LOCALE`, `hasLocale`, endonyms, hreflang values. |
| `bilingual.ts` (62) | The `Bilingual` type and `pick()` / `say()`. |
| `dictionaries.ts` (25) | Async loader. |
| `alternates.ts` (39) | Per-page `hreflang`. Never at the layout. |

---

## Traps

Things that have cost real time here.

- **The dictionary cache.** Turbopack caches dictionary modules. Editing `en.ts`/`nl.ts` and reloading shows the *old* strings while `.tsx` edits render fine — so a change looks half-applied. `docker restart oxot_website_july2026-web-1` before believing any copy verification. This has bitten three times.
- **`proxy.ts`, not `middleware.ts`.** The deprecated name fails silently.
- **A cross-locale navigation REMOUNTS `<html>`.** `[locale]` is the root segment, so `/en/x → /nl/x` changes the root layout's identity and React rebuilds the whole tree. Measured: a class, `data-theme` and an unrelated `data-foo` set imperatively are all wiped; a *same-locale* nav keeps all three. Anything that must survive a language switch has to be **rendered by React**, which is why the theme is a cookie read on the server rather than localStorage plus a pre-paint script. The same remount is why a bare `<script>` in the layout logged *"Encountered a script tag while rendering React component"*.
- **The theme is a cookie (`oxot-theme`), not localStorage.** Anything that sets the theme — including a test harness — must set the cookie. `measure.mjs` uses `ctx.addCookies`.
- **`innerText` applies `text-transform`.** `.mono-label` uppercases, so `innerText` returns `ARTIKEL 14` where the copy is `Artikel 14`. Use `textContent` for copy, and case-insensitive matching in any DOM assertion. A case-sensitive `indexOf` once made a `/twin` link vanish silently.
- **A route on neither gate list is unchecked.** `/conformity` shipped that way and carried the worst factual error on the site for weeks.
- **Answered-question chips in the wizard are `<button>`s that navigate backward**, labelled with a two-digit index. A script that clicks the first available button ping-pongs forever.
- **Root `railway.json` is the old app's.** It runs `db:migrate` against the CMS schema.

### Known dead code

Mentioned rather than deleted, per the surgical-changes rule — these are not
orphans any recent change created.

- `SECTORS` in `src/components/company/claims.company.ts` — exported, imported nowhere.
- `BANNED` / `BANNED_NL` in `src/content/claims.ts` — exported, enforced by nothing. An advisory word list, not a gate.
