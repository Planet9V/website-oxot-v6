# Directives — the rules that bind work on this site

An index, not a fifth copy. Each rule is stated in one line with a link to the
document that owns it. **Where anything conflicts, the Karpathy rules in
`CLAUDE.md` §1 win.**

The authorities, in order:

| Document | Owns |
|---|---|
| [`CLAUDE.md`](../../CLAUDE.md) | Project law. Read §1 first, every session. |
| [`website_strategy/`](../../website_strategy/) | Strategy, messaging, claims, grading. Changes rarely. Start at `00-START-HERE.md`. |
| [`docs/OXOT-DESIGN-SYSTEM.md`](../../docs/OXOT-DESIGN-SYSTEM.md) | Every colour, face, size, radius, shadow, timing and state. Machine-readable twin: `.css`. |
| [`docs/reference/CRA-DATES.md`](../../docs/reference/CRA-DATES.md) | Every date claim on the site. |
| [`web/PROGRESS.md`](../PROGRESS.md) | Current state, the queue, the log. Changes often. |

**Strategy lives in `website_strategy/` and should not change weekly. Current
state lives in `PROGRESS.md` and should.**

---

## 1. How to work — the Karpathy rules (`CLAUDE.md` §1)

The upstream four, verbatim in intent:

1. **Think before coding.** Don't assume, don't hide confusion, surface trade-offs. If something is unclear — stop, name it, ask.
2. **Simplicity first.** Minimum code that solves the problem. Nothing speculative. *"If you write 200 lines and it could be 50, rewrite it."*
3. **Surgical changes.** Touch only what you must. Don't improve adjacent code. *"If you notice unrelated dead code, mention it — don't delete it."* Every changed line traces to the request.
4. **Goal-driven execution.** Define success criteria, then loop until verified.

Rules 5–10 are **this project's own**, not upstream — the attribution was
corrected on 2026-08-07 after claiming otherwise:

5. Verify before claiming done — show evidence, not assertions.
6. Report uncertainty; don't bluff.
7. Stop when confused. Looped twice with no progress? Halt and re-plan.
8. Keep a running assumptions list in the PR.
9. Prefer evidence over confidence. "It should work" is not acceptance.
10. Leave the tree greener — no new lint or type regressions.

---

## 2. Language (`CLAUDE.md` §3)

- **No user-facing string ships in only one language.** Both `nl` and `en`, in the same commit.
- Dutch is the market's language, not a translation layer. `nl.ts` `satisfies Dictionary`, so a missing key fails the build.
- Watch for the failure the build *cannot* see: a Dutch string that is present but is English, a calque, or has quietly dropped a qualifier the English carries. All four have shipped.

## 3. Claims and provenance (`website_strategy/03`)

- One checkable number per page, its source one click away, **including the unflattering part**.
- Quote the EU's urgency; never assert OXOT's.
- Cite dates, never recall them — name the obligation, then the date.
- Never say a future obligation is already in force. Guarded.
- Full constraints, including the grant wording and the never-write list: [`CONTENT-SOURCES.md`](./CONTENT-SOURCES.md).

## 4. Design system (`CLAUDE.md` §7e)

- **Tokens only. Never a raw colour.** One hard-coded hex once produced 41 contrast failures on a single page.
- **Three oranges, three jobs.** `--primary` is an accent *fill* (~3.0:1, fails AA under 24px). Small orange **text** uses `text-primary-ink`. Text **on** orange uses `text-primary-foreground` — dark navy, *not* white.
- **Headings by role, never by page.** `.h-page` · `.h-section` · `.h-sub` · `.h-card` · `.h-micro`. Never a raw `text-{size}` on a heading.
- Two-layer theme-tinted shadows; never Tailwind's default `shadow-md`.
- Motion: buttons 200ms · cards 300ms · `.cta-lift` 150ms, `cubic-bezier(0.22, 1, 0.36, 1)`, transform and opacity only. Every hover has a `:focus-visible` twin.
- `defaultTheme="dark"`. shadcn `new-york` / `neutral` / CSS variables. Every default `<Card>` lifts on hover.
- **No italics.** Owner instruction; there are currently zero on the site and the italic face is not loaded.

## 5. Layout (`CLAUDE.md` §7b)

- All page content sits in **`.oxot-canvas`** — full width, capped 1600px, 24px gutter (32px from `lg`). Header, footer and pages share it, so a page's left edge always lands under the "O" of OXOT.
- **Never** a bespoke `mx-auto max-w-*` page wrapper. Reading measure goes on an inner element.
- Verify by measurement at 390 / 834 / 1440 / 2560, not by eye.

## 6. How we develop (`CLAUDE.md` §7c)

- **Develop against the running Docker stack.** This app is `:3100`; the older CMS is `:3000`. Never spin up a parallel dev server.
- **Confirm every UI change in a browser.** A passing test is not a look.
- **Verify against the rendered DOM, never grep the HTML.** The RSC payload contains raw source and produces false positives.
- **No sandboxed iframes.** Rejected outright — they get no theme, no dark mode, no canvas.

## 7. Process (`CLAUDE.md` §5)

- `main` is protected. All changes by PR off `feature/*`, `fix/*` or `chore/*`.
- Fill in the PR template including the assumptions list.
- **Secrets never in code.** `.env.local` and GitHub Actions secrets only. **The repo is public** — treat every commit as world-readable.
- **Never delete `knowledge-source/`** or the CRA / IEC 62443 reference docs.

## 8. Definition of done (`CLAUDE.md` §8)

- [ ] Tests written and passing
- [ ] Both `nl` and `en` present
- [ ] No new lint or type errors; no secrets
- [ ] Design system complied with — zero raw colours, zero raw `text-{size}` on headings
- [ ] Dark and light both verified
- [ ] PR lists assumptions and shows evidence

---

## What is deliberately *not* a rule

Recorded because each was tried, cost time, and was rescinded by the owner.
Do not reintroduce them without asking.

- **No provenance guard.** A proposed gate blocking any claim without a `proof` URL was withdrawn.
- **No word budgets.** Line and word counts in the specs are a *direction* — reduce density, lighten the language — **not a specification to enforce**. Do not assert against them.
- **No blocking of descriptive language.** A description of what a product does is not a claim about the world. Blocking phrases like "one living model" was explicitly reversed; the entry has been removed from `BANNED` and should not return.
- **`BANNED` / `BANNED_NL` are advisory.** Nothing reads them. Do not wire them to a gate.

The standing instruction behind all four: **improve the writing rather than
police it.**

---

## The failure mode this project keeps hitting

**The half-applied fix.** A defect is found, the fix is written, part of it
lands — and the comment describing it makes the remainder invisible, because
the comment reads as done.

Real instances, all found later by reading rather than by any gate:

- `FOSS_EXCEPTION` written to fix a Class II overreach, then imported nowhere. The constant existed; the fix did not.
- The `/company` capability band removed for naming an uncleared fourth sector — and the sentence replacing it still named it.
- Two of three Annex hints derived from the data, the third left hand-typed at 8 of 19 categories.
- Article 14 rewired in one file while a second hand-typed copy kept the old three-clock version, with a page-scoped guard too coarse to see it.

**Before claiming a fix is complete, search for every other place the same fact
is stated.** And prefer deriving a value over typing it: three of those four
would have been impossible if the data had one home.
