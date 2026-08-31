# Content and sources

Where every word on the site comes from, how a claim earns the right to ship,
and what to change when you want to change the copy.

---

## The one rule everything here serves

> **Every page carries one checkable number with its source one click away —
> including the part that is unflattering.** Not an adjective.

Two corollaries the site is built around:

- **Quote the EU's urgency; never assert OXOT's.** The legislator's words come first, the firm's position second. On the homepage that order is literal: the Article 35(2) quote sits above the positioning line.
- **Cite dates, never recall them.** There is no single "CRA deadline". Name the obligation, then the date. [`docs/reference/CRA-DATES.md`](../../docs/reference/CRA-DATES.md) is the only source.

---

## The four places copy lives

| Kind | File | Notes |
|---|---|---|
| UI labels, headings, section prose | `src/i18n/en.ts`, `src/i18n/nl.ts` | `en.ts` defines the `Dictionary` type; `nl.ts` must `satisfies Dictionary`. A missing Dutch key fails the build. |
| Checkable claims | `src/content/claims.ts` + per-area `claims.*.ts` | Carry provenance. See below. |
| Regulation facts | `src/content/cra-reference.ts` | Annex categories, tiers, the Article 14 steps, EUR-Lex deep links. Pages **derive** prose from these rather than restating them. |
| Structured page data | `src/components/*/…` | Wizard questions and verdicts, Conformity modules, personas, the six consulting zones. |

Because copy is spread across all four, **[`PAGE-COPY.md`](./PAGE-COPY.md) is
generated from the rendered page**, not read out of the dictionaries. Reading
only `en.ts` would miss most of what a reader sees.

---

## What a claim is

```ts
export interface Claim {
  en: string;       // the exact words that may ship, in English
  nl: string;       // the exact words that may ship, in Dutch — required
  source: string;   // file and section in this repo that cleared it
  cleared: string;  // ISO date a human cleared it
  recheck?: string; // ISO date this must be re-verified, for facts the world can change
  proof?: string;   // a URL the reader can open to check it themselves
  note?: string;    // why this wording and not another — the trap, where there is one
}
```

**98 claims** carry `source` + `cleared`. **36** carry a `proof` URL. **9**
carry a `recheck` date.

`AS_OF` in `claims.ts` is the site-wide freshness stamp; the content guards fail
if it drifts too far from today.

### Where the claims are

| File | Claims | Proof URLs | Area |
|---|---:|---:|---|
| `src/content/claims.ts` | 27 | 15 | The wedge, the CRA, the grant, OXOT itself |
| `src/components/twin/twin-claims.ts` | 23 | 10 | `/twin` |
| `src/components/consulting/claims.consulting.ts` | 15 | 0 | `/consulting` + the derivation table |
| `src/components/company/claims.company.ts` | 15 | 0 | `/company` |
| `src/components/check/claims.ts` | 13 | 11 | `/check` |
| `src/components/contact/claims.ts` | 5 | 0 | `/contact` |

`src/components/conformity/product.ts` is the exception: it is structural data
(nine modules, five clocks, six sources) under a **file-level** source comment
rather than per-item `Claim` objects. That is why its five article numbers were
wrong for weeks — nothing per-item was carrying provenance to check against.
Treat it with more suspicion than the others.

---

## What the site cites externally

| Host | Cites | What |
|---|---:|---|
| `eur-lex.europa.eu` | 14 | Regulation (EU) 2024/2847, deep-linked per article (`#art_13`, `#art_14`, `#art_32`, `#art_69`, annexes) |
| `english.rvo.nl` | 10 | The CIF-NL 2025 grant register — the one externally adjudicated credential |
| `www.linkedin.com` | 4 | Founder profiles |
| `securitydelta.nl` | 1 | The CIF-NL award announcement |
| `webgate.ec.europa.eu` | 1 | NANDO, the notified-body register |
| `oxot.nl` | 1 | The firm |

---

## Where the words were harvested from

The new site's copy was largely **carried across from the older application**
at the repo root and from cleared source documents. `source:` values point at
those originals:

| Origin | Used by |
|---|---|
| `content/pages/en/company.md` | 15 claims — `/company`, the mission |
| `content/pages/en/cyber-digital-twin-grant.md` | 14 claims — most of `/twin` |
| `data/cra_selfcheck_{en,nl}.json` | 10 claims — `/check` |
| `db/migrations/135_services_to_a.sql` | 8 claims — the engagements |
| `docs/reference/CRA-DATES.md` | 8 claims — **every dated regulatory statement** |
| `docs/plans/2026-08-06-option-b/**` | 11 claims — the wedge and the capacity play |
| `docs/reference/OXOT-CIF-NL-GRANT.md` | the grant figures |

Deeper reference material, not directly cited but underlying the argument:

- `knowledge-source/` — the OXOT platform docs and CRA research. **Never delete this directory or the CRA / IEC 62443 reference docs.**
- `content-source/` — IEC 62443, TS 50701, OCP SAFE, CDT background, market research.
- `source-material/` — founder essays, market analyses, the funnel copy, the classification matrix.
- `website_strategy/` — the permanent strategy corpus. `08-source-documents.md` indexes the originals.

---

## Changing copy

1. **Find the source.** Search [`PAGE-COPY.md`](./PAGE-COPY.md) for the string; the route tells you the page, and [`FILE-MAP.md`](./FILE-MAP.md) tells you which of the four places it lives in.
2. **Change both languages in the same commit.** Non-negotiable — CLAUDE.md §3. English-only fails review, and `nl.ts` will not typecheck without the key.
3. **If it is checkable, it is a claim.** Give it `source` and `cleared`, and a `proof` URL if a reader could open one. If the world can change it, give it `recheck`.
4. **Restart the container.** Turbopack caches dictionary modules — your change will not appear until you do, and this has produced three false "it didn't work" diagnoses.
5. **Verify against the rendered DOM**, never by grepping HTML.
6. **Regenerate the deck:** `node scripts/copy-inventory.mjs`.
7. **Run the gates:** `npm test`, then `npm run verify`.

---

## Standing constraints on what may be said

These come from the owner and are not stylistic preferences.

**Never write** — "RVO awarded €100,000" · "top rated" · "award-winning" · "one of the top 13". The grant letter is private. The permitted forms are on the page today: *the maximum grant available under CIF-NL 2025*, *one of 13 projects selected from 95 applications*, *17 of a possible 20 points*, and the unflattering half — *six of those thirteen scored higher than ours*.

**Never** invent a KvK number or a registered address. **Never** name a client without written consent — a name is the client's to give, not ours to spend.

**Never** say a future obligation is "already" or "since" in force. A content guard (`no-premature-obligation`) fails the build on this.

**Do not** describe reserved capacity at a conformity assessment body. Nobody can honestly sell that. The retainer holds a place in *OXOT's* programme, which OXOT can actually give.

### On the word lists

`BANNED` and `BANNED_NL` in `claims.ts` list marketing words the site avoids
("industry-leading", "seamless", "robust", "toonaangevend"…). **They are
enforced by nothing** — no guard, no test reads them. They are an advisory
style list.

That is deliberate. An earlier attempt to hard-block *descriptive* phrases was
rescinded by the owner: a description of what a product does is not a claim
requiring external proof, and blocking it wasted time without improving the
writing. A proposed provenance guard and per-page word budgets were withdrawn
for the same reason. **Word counts in the specs are a direction — reduce
density, lighten the language — not a specification to enforce.**
