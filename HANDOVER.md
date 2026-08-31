# HANDOVER — read this before you touch anything

**Rewritten 2026-08-09, the day this repository was created.** Every fact below
was measured on that date, not recalled. Where this disagrees with the working
tree, the working tree wins — and fix this file.

> **If you have read the previous version of this document, discard it.** It was
> written for `Planet9V/OXOT-Website-JULY2026`, where this site lived in a `web/`
> subdirectory next to a CMS application, on a branch called `straight-a`. All
> five of its "things that would lose the work" warnings are false here. A
> handover that is confidently and specifically wrong is worse than none.

This repository is **only the website**. Its root is the app. There is no CMS,
no second application, no `web/` subdirectory and no long-lived feature branch.

---

## 1. What changed, and what it means for you

| | Old repo | **This repo** |
|---|---|---|
| Repository | `Planet9V/OXOT-Website-JULY2026` | **`Planet9V/oxot-website`** (private) |
| The site lives in | `web/` | **the root** |
| Trunk | `straight-a` (88+ commits ahead of `main`) | **`main`** |
| Also in the repo | a CMS app, Postgres migrations, 89 MB of harvest | **nothing else** |
| CI | none — nothing could fail a push | **CI runs on every push and must be green** |
| Railway service | `oxot-web`, branch `straight-a`, root `web` | **`oxot-web`, branch `main`, root `/`** |

**The old repository still exists and is untouched.** It keeps the CMS app,
`knowledge-source/`, `content-source/` and the full history. Nothing was
deleted. If you need a harvest source or an old plan document, it is there.

### The one rule that still bites

**Pushing `main` deploys.** Railway builds this repo on every push to `main`.
There is no staging environment. CI is green-or-red on the push, but it does not
block the deploy — so run the gates in §4 *before* you push, not after.

---

## 2. The goal

Replace the old CMS site with a fast, bilingual, provably-correct marketing site
that **sells**, then point the real domain (`oxot.nl`) at it.

> **`oxot.nl` is not attached to anything yet.** Neither Railway service has a
> custom domain. The site is reachable only at
> `oxot-web-production.up.railway.app`.

The argument the site makes, in one line:

> **OXOT is not queuing for conformity assessment capacity. OXOT is building it.**

Three house rules that govern every page:

1. **Quote the EU's urgency; never assert OXOT's.**
2. **Every page carries one checkable number with its source one click away —
   including the part that is unflattering.** Not an adjective.
3. **Cite dates, never recall them.** There is no single "CRA deadline"; name the
   obligation, then the date.

And the non-negotiable: **no user-facing string ships in one language.** `en.ts`
defines the shape, `nl.ts` must satisfy it, so a missing Dutch string is a
**build error** rather than something a customer finds. CI builds, so this is
enforced on every push.

---

## 3. Where everything is

### 3.1 Read in this order

| # | File | Why |
|---|---|---|
| 0 | `PROGRESS.md` | **State of record.** The queue, the grades, the log. |
| 1 | `website_strategy/00-START-HERE.md` | Ten minutes; the difference between building the right thing and a defensible version of the wrong one |
| 2 | `website_strategy/01-positioning-and-messaging.md` | Before writing any page. §1b is the product naming rule. |
| 3 | `website_strategy/02-the-reader-and-the-voice.md` | Before writing any sentence |
| 4 | `website_strategy/03-claims-and-provenance.md` | Before writing any fact |
| 5 | `docs/OXOT-DESIGN-SYSTEM.md` + `.css` | **Binding** before any visual work |
| 6 | `docs/reference/CRA-DATES.md` | Cite, never recall |
| 7 | `BUILD-LAW.md` | Standing rules for building a page here |
| 8 | `CLAUDE.md` | Project law. Karpathy rules win every conflict. |

### 3.2 Code map (`src/`, 21 routes)

```
app/[locale]/          cra check retainer conformity twin consulting company
                       facility-due-diligence iec-62443 insights track-record
                       frameworks reference contact privacy cookies terms
app/robots.ts          indexing is OPT-IN — see lib/site-visibility.ts
app/api/               intake (leads), check/report (PDF)

components/shell/      header, footer, nav.ts, breadcrumb, theme toggle,
                       language switch, page-rail  ← chrome shared by every page
components/cra/        roads map, timeline, evidence console, reference tables
components/check/      the wizard: check-client, classify.ts, annex-ledger,
                       report-gate  ← the lead capture
components/twin/       the Cyber Digital Twin page + the 3D stage
components/twin/scenes VERBATIM ports — see §6
components/longform/   the reading layout for Insights / Reference / Track Record
components/ui/         shadcn (new-york, neutral, CSS variables)

content/claims.ts      EVERY checkable fact, with source + clearance date
i18n/en.ts             defines the dictionary SHAPE
i18n/nl.ts             must satisfy it — enforced by the compiler
lib/site-visibility.ts noindex unless OXOT_PUBLIC_SITE=true
```

**Facts never live in `i18n/`.** Anything checkable — a date, a price, an
Article number — comes from `content/claims.ts`, which carries the source and
the clearance date. The dictionaries hold the sentences around them.

### 3.3 What is NOT in this repo

Left behind in `Planet9V/OXOT-Website-JULY2026`, deliberately, and still there:

- the old CMS application and its Postgres migrations
- `knowledge-source/` — CRA and IEC 62443 reference documents. **Never delete.**
- `content-source/` — 89 MB of harvested source content
- `docs/plans/**` — mostly describes the old app

---

## 4. The gates — run these before you push

```bash
npm install
npm run build          # also the bilingual gate: missing Dutch = type error
npm test               # tsc --noEmit && vitest && content-guards --self-test
npm run verify         # the three harnesses below
```

`verify` takes `SITE_BASE`, and **all three harnesses honour it**:

```bash
SITE_BASE=http://localhost:3000 npm run verify                       # local
SITE_BASE=https://oxot-web-production.up.railway.app npm run verify  # live
```

| Harness | Checks |
|---|---|
| `measure.mjs` | 21 routes: exactly 1 h1 · text contrast in **both themes** · WCAG 1.4.11 · no overflow at 390/834/1440/2560 · no console errors · no ghosted text · every internal link 200 with no redirect hop |
| `content-guards.mjs` | 5 content rules across 36 routes, plus as-of freshness |
| `chrome-guards.mjs` | 52 checks: the language switch on every route in both languages, the theme surviving a language switch both ways in both themes |

**Green mechanical gates are not a grade.** A page is "done" only after the
two-reviewer editorial pass (decision D2, ≥90 on seven criteria). Never report
harness output as a grade.

### 4.1 A gate can lie, and both of these actually happened

- **A guard's selector can be wrong.** Two theme guards once failed on a theme
  that was never broken: they matched the theme toggle as
  `header button[aria-label]`, and a new labelled chevron sat earlier in the
  DOM. **When a guard fails, check whether the guard is lying before you change
  a page.**
- **A gate can pass while testing nothing you meant.** Until 2026-08-09 the
  three harnesses read three *different* environment variables
  (`MEASURE_BASE`, `CHROME_BASE`, `BASE`). Setting an unrecognised one does not
  error — it falls through to the localhost default and passes. Runs reported as
  "verified against production" had measured a local dev server, with identical
  output. They all take `SITE_BASE` now. **If you add a harness, make it read
  `SITE_BASE`.**

---

## 5. How to work here

1. **Read `PROGRESS.md` first.** It is the state of record.
2. **Branch off `main`**, PR back into it. Pushing `main` deploys.
3. **Verify against the rendered DOM, never `grep` on HTML** — Next's RSC
   payload contains raw source and produces false positives. Use Playwright and
   read `main.innerText`.
4. **Both languages, always.** English-only fails the build.
5. **Facts go in `claims.ts` with a source**, never inline in a component.
6. **Tokens only** — no hex, no raw `text-{size}` on a heading. See §7e of
   `CLAUDE.md`.
7. **Run the gates. Screenshot both themes and both locales.** Then commit.
8. **Update `PROGRESS.md`** in the same commit.

### 5.1 Commit style

Long, explanatory messages. They are the project's memory: what changed, what
was measured, what was wrong before, and what NOT to redo. Read
`git log --oneline -20` to see the register.

---

## 6. Two things you must not "tidy up"

### 6.1 `src/components/twin/scenes/*.ts` are VERBATIM ports

They are the owner's original 3D scene builders, carried across byte-for-byte
from `1_CRA_web_sources/3D PLC Design Review/*.html` in the old repo. That
property is not cosmetic: when the models rendered badly, diffing these files
against the originals is what proved the geometry was innocent and the renderer
was at fault.

They carry `@ts-nocheck`, and `eslint.config.mjs` disables `ban-ts-comment` for
that directory alone. **Do not annotate them to satisfy a linter** — it would
edit ~1,300 lines of working geometry and destroy the one property that makes
them auditable against the source.

### 6.2 `app/robots.ts` is `force-dynamic` on purpose

Next prerenders that route as static by default, which bakes
`OXOT_PUBLIC_SITE` in at build time. On the 2026-08-09 cutover the build began
~25 seconds before the variable was set, so the deployed `robots.txt` said
`Disallow: /` while every page correctly reported itself indexable. **The site
looked completely healthy and was closed to every crawler.** A Railway
*redeploy* does not fix it either — redeploy reuses the built image, so the
stale file returns. Only a rebuild does.

---

## 7. Pitfalls — the specific ones that have already cost time

| Pitfall | What happens | Do this instead |
|---|---|---|
| `127.0.0.1` instead of `localhost` | Next dev 403s its own chunks; the page renders, never hydrates, and every control looks broken | `localhost` |
| Editing `i18n/*.ts` and refreshing | Old strings persist — Turbopack caches them | Restart the dev server |
| Site-wide 500 with `JSON.parse` | Corrupted Turbopack cache | `rm -rf .next` **before** debugging |
| `grep` on the HTML to check copy | False positives from the RSC payload | Playwright + `main.innerText` |
| Trusting a failing guard | You "fix" a page that was correct | Check the guard's selector first |
| Trusting a *passing* gate | It may have tested localhost | Pass `SITE_BASE` explicitly |
| Small accent text on a tint | Fails contrast — measured 2.93:1 in dark | `--primary-ink`, or `--foreground` |
| A tall side panel beside short prose | A hole under the prose | `components/shell/page-rail.tsx` — let the rail span the section, not just the hero |
| `sticky` inside a grid child | Never sticks; the child stretches to the row height | add `self-start` |
| `npx tsc --noEmit` on a fresh checkout | Fails on every route: "Cannot find name 'PageProps'" | Build first — Next generates that global into `.next/types` |
| Copying the old site's components verbatim | Raw hex, emerald status colours | Port with tokens; status never by hue alone |

---

## 8. Where the work stands (2026-08-09)

Live at **`oxot-web-production.up.railway.app`**, indexable, CI green.

Verified against the live site, not locally: 21/21 routes clear every gate ·
5/5 content guards on 36 routes · 52/52 chrome guards · `robots.txt: Allow: /`
· `/en` and `/nl` both 200.

Open:

- **No custom domain.** `oxot.nl` is attached to nothing.
- **The repo is private.** One setting away from public if that is wanted.
- **No page has had the two-reviewer editorial pass (D2, ≥90).** The mechanical
  gates are green; the editorial grade has never been run on anything.
