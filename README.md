# OXOT — the website

The bilingual (Dutch + English) marketing site for **OXOT**, a Dutch OT
security engineering firm. Eleven pages, twenty-two URLs, one ask.

> **This is not the only app in this repository.** The repository root holds a
> **different, older application** — a Next 15 CMS with an admin studio, a
> Postgres content store and an AI visitor agent. It runs on `:3000`. This one
> runs on `:3100`. Root-level `docs/`, `content/`, `data/`, `db/` and the root
> `README.md` describe **that** app. Everything under `web/` describes this one.
> Mixing them up costs an hour every time.

---

## What the site argues

The firm sells three things — **CRA Readiness**, the **Cyber Digital Twin**,
and **Consulting** — into a market with a hard regulatory deadline and a
capacity shortage in front of it.

The positioning, in one line:

> **OXOT is not queuing for conformity assessment capacity. OXOT is building it.**

And the discipline the whole site is built on:

> Every page carries one checkable number with its source one click away —
> **including the part that is unflattering.** Not an adjective.

That is why the homepage prints *"six of those thirteen scored higher than
ours"* next to the grant it won, and why `/check` says out loud that it reads
3 of the 21 Annex I obligations and the written review reads all 21.

---

## Run it

The site is developed against the repo's Docker stack, **not** a standalone dev
server.

```bash
docker compose up -d web        # from the repository root
# → http://localhost:3100/en   ·   http://localhost:3100/nl
```

**The four URLs, because two of them are the other app:**

| | URL | Which |
|---|---|---|
| New site, local | `http://127.0.0.1:3100` | **this app** — hot reload |
| New site, live | `oxot-web-production.up.railway.app` | **this app** — auto-deploys from `straight-a` |
| Old site, local | `http://127.0.0.1:3000` | the CMS app |
| Old site, live | `oxot-website-july2026-production.up.railway.app` | the CMS app, from `main` |

Both local containers mount the working tree, so an edit here shows on both
ports within seconds.

The container mounts the working tree, so edits are live. **One trap:**
Turbopack caches the dictionary modules, so edits to `src/i18n/en.ts` or
`nl.ts` will not appear on reload even though `.tsx` edits do — which looks
exactly like a change that didn't apply.

```bash
docker restart oxot_website_july2026-web-1
```

Do that before believing any copy verification. It has caused three false
diagnoses.

## Check it

```bash
npm test          # tsc --noEmit && vitest run && content-guards --self-test
npm run verify    # measure + content-guards + chrome-guards   (needs the site running)
```

| Gate | Covers |
|---|---|
| `tsc --noEmit` | types, and the EN/NL dictionary parity that `satisfies Dictionary` enforces |
| `vitest` | 33 tests — Annex tier routing, the FOSS carve-out, the consulting derivation table |
| `scripts/measure.mjs` | 11 routes: one `h1`, composited contrast in both themes, WCAG 1.4.11, overflow at 4 viewports, console errors, dead links, pseudo-element text |
| `scripts/content-guards.mjs` | 22 routes: five pinned content defects, checked against the rendered DOM, each with a self-test red case |
| `scripts/chrome-guards.mjs` | the header language switch on all 16 route/locale pairs, and the theme surviving a language switch — the two things that only break *between* pages |

Neither harness can see a wrong fact. That is what the tests and a careful
reader are for — five wrong article numbers passed every gate for weeks.

---

## The stack

| Layer | What |
|---|---|
| Framework | **Next 16.3** (App Router, Turbopack), React 19.2 |
| Styling | Tailwind v4 (`@theme inline`), design tokens in `src/app/globals.css` |
| Components | shadcn/ui — `new-york`, `neutral`, CSS variables |
| i18n | Locale-prefixed routing, `en.ts` defines the type, `nl.ts` satisfies it |
| PDF | `@react-pdf/renderer` with embedded TTFs |
| Data | Postgres — one table, `cra_readiness_leads`, one writer |
| Motion | framer-motion with a global reduced-motion guard |
| Tests | Vitest |

**Next 16 is not the Next you know.** `proxy.ts` replaces `middleware.ts` (the
old name silently never runs), and route props use the global `PageProps<'/route'>`
helper. See `AGENTS.md`.

---

## Documentation

| Document | Answers |
|---|---|
| [`docs/SITE-MAP.md`](./docs/SITE-MAP.md) | What pages exist, what each is for, where it sends the reader, the API routes, the funnel |
| [`docs/FILE-MAP.md`](./docs/FILE-MAP.md) | "I need to change X — which file?" Plus the traps and the known dead code |
| [`docs/CONTENT-SOURCES.md`](./docs/CONTENT-SOURCES.md) | Where the words come from, what a claim is, what may and may not be said |
| [`docs/PAGE-COPY.md`](./docs/PAGE-COPY.md) | **Every string on every page, both languages.** Generated — see below |
| [`docs/DIRECTIVES.md`](./docs/DIRECTIVES.md) | The binding rules, one line each, with the authority for each |
| [`PROGRESS.md`](./PROGRESS.md) | **The state of record** — the queue, the grades, the log. Update after every batch |

The copy deck is generated, never hand-edited:

```bash
node scripts/copy-inventory.mjs      # rewrites docs/PAGE-COPY.md from the running site
```

It reads the rendered DOM rather than the dictionaries, because copy comes from
four different places and a key that no component renders is invisible in the
file and absent from the page.

---

## Before you change anything

Read [`docs/DIRECTIVES.md`](./docs/DIRECTIVES.md). The four that catch people
out most often:

1. **Both languages, same commit.** No user-facing string ships in one language.
2. **Tokens only — never a raw colour**, and never a raw `text-{size}` on a heading.
3. **Cite dates, never recall them.** There is no single "CRA deadline"; name the obligation, then the date. [`docs/reference/CRA-DATES.md`](../docs/reference/CRA-DATES.md) is the only source.
4. **Verify against the rendered DOM**, in a browser, in both themes. A passing test is not a look.

And the failure this project keeps repeating: **the half-applied fix**, where
part of a correction lands and the comment describing it makes the rest
invisible. Before calling a fix done, search for every other place the same
fact is stated.
