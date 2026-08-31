# Site map

Every route the new site serves, what each page is *for*, and where it sends
the reader next. **Eleven pages, two languages, twenty-two URLs.**

The route list has one source in code — [`src/components/shell/nav.ts`](../src/components/shell/nav.ts)
(`PATHS`). The header and the footer both read it, so they cannot disagree
about what the site contains. If you add a page, add it there, and add it to
both gate scripts (see [Gates](#gates-and-what-they-cover) below) — a route on
neither list is never checked, which is exactly how `/conformity` shipped
carrying the worst factual error on the site.

---

## Routing

| Rule | Behaviour |
|---|---|
| Locale prefix | Every page is `/{locale}/…`. There is no unprefixed route. |
| Locales | `en`, `nl`. English is the **fallback**, not the preference. |
| Unprefixed request | `307` redirect to the negotiated locale — *not* `308`. `/cra` has no single permanent destination: the right answer differs for a Dutch and an English reader, and a permanent redirect invites every cache in between to pin whichever it saw first. |
| Negotiation | Hand-rolled `Accept-Language` q-weight parse in [`src/proxy.ts`](../src/proxy.ts). `nl-BE` matches `nl` — deliberate, the firm sells into Flanders. |
| Filename | `proxy.ts`, **not** `middleware.ts`. In Next 16 a file named `middleware.ts` silently never runs. |
| Matcher | `/((?!_next|api|.*\..*).*)` — API routes and static files bypass it. |
| `hreflang` | `en` / `nl`, no region tags, emitted per page from [`src/i18n/alternates.ts`](../src/i18n/alternates.ts). Declared per *page*, never at the layout — doing it at the layout once made every page claim to be the homepage. |

---

## Navigation

Five destinations plus one ask. **Every top-level item navigates**: there are
no dropdown triggers and no parent items without a page of their own. The
previous site had "Cyber Digital Twin" and "CRA Readiness" as triggers with
children and no destination, so a reader who clicked the thing they came for
got a panel instead of a page.

**Primary nav**, in the argument's order — the urgency, the product, the
destination, the revenue that bills today, then who we are:

`The CRA` → `Conformity` → `The Twin` → `Consulting` → `Company`

**The one ask**, styled as the site's single CTA wherever it appears:
`Get your CRA class` → `/{locale}/check`

**The language switch keeps your place twice over.** It swaps only the first
path segment, so `/en/cra` goes to `/nl/cra` rather than the Dutch homepage —
and it carries `scroll={false}`, so a reader three screens down stays three
screens down instead of being thrown to the top. Next's `<Link>` resets scroll
by default, which is right when you change page and wrong when you change
language: the reader has not gone anywhere. Ordinary navigation between pages
still starts at the top. Both behaviours are pinned in `chrome-guards.mjs`.

**The language switch is in the header and the footer**, from one component
(`LanguageSwitch`, `compact` for the header form). It shipped footer-only,
which meant a Dutch reader had to scroll a whole page to discover the site
existed in Dutch. Both copies swap only the first path segment, so `/en/cra`
goes to `/nl/cra` rather than to the Dutch homepage. Below `sm` the header copy
is hidden and the same switch appears inside the mobile disclosure, so the
390px bar does not overflow.

---

## The pages

| Route | Job | Primary ask |
|---|---|---|
| `/` | The argument in one screen: the constraint, the four readers, the wedge, the one externally adjudicated credential. | `/check` |
| `/cra` | What the Regulation requires and by when — five dates, each governing something different. | `/check` |
| `/conformity` | The product OXOT ships: nine modules, five statutory clocks, six external sources it reads. | `/check` |
| `/twin` | What the Cyber Digital Twin is, the seven layers, what it is built from and what it is not. | `/contact#walkthrough` |
| `/consulting` | The engagements, the published SL-T derivation, and the bench. | `/check` · `/contact` for partners |
| `/company` | Who OXOT is, the founders, and the CIF-NL grant with its unflattering half. | `/contact` |
| `/check` | The 2-minute wizard: six questions, a cited verdict, the evidence gaps, an optional PDF. | itself → `/api/intake` |
| `/contact` | The free written review, and — since the twin CTAs land here — the walkthrough. | the form |
| `/privacy` | GDPR privacy policy, accurate to what this app actually processes. | **none — deliberate** |
| `/cookies` | What is stored on the device. One strictly-necessary cookie, no analytics, no tracking. | **none — deliberate** |
| `/terms` | Terms of use. The check is indicative, not a determination. | **none — deliberate** |

### Notes that matter per page

- **`/` (home)** carries **seven** ask-shaped links, more than any other page. That is deliberate for a homepage but it is the number to watch: the persona cards sit above the CTA and were trimmed (194px → 156px) precisely because they were out-sizing it.
- **`/cra`** is the longest route (433 lines) and the only one with six `data-gfx-meaning` figures, so it is the only page where WCAG 1.4.11 non-text contrast is actually measured.
- **`/twin`**'s two CTAs both point at `/contact#walkthrough`. Before that anchor existed they promised a walkthrough and landed on a page that never mentioned the twin.
- **`/consulting`** solicits testing organisations and prospective conformity assessment bodies in the bench panel. That reader needs `/contact`, not `/check` — `/check` is a *manufacturer's* wizard and is useless to a laboratory.
- **`/check`** is the only stateful page. Its questions, options, hints, five verdicts and the Article 69 reading live in [`classify.ts`](../src/components/check/classify.ts), not in the dictionaries.
- **The three legal pages carry NO ask.** That is the only page class on the site with zero CTAs, and it is deliberate: a call to action beside a privacy policy tells the reader what the policy is for. `measure.mjs` records `asks=0` on all three.
- **`/contact`** keeps **one** ask on purpose. The walkthrough line names the twin reader without turning the page into two offers.

---

## API routes

Three endpoints. The split between them is a deliberate ordering constraint,
not an accident of organisation.

| Route | Method | Does | Writes? |
|---|---|---|---|
| [`/api/intake`](../src/app/api/intake/route.ts) | POST | Rung 2 of the ladder: name + work email in exchange for the PDF becoming downloadable. | **Yes** — one row in `cra_readiness_leads`. |
| [`/api/check/report`](../src/app/api/check/report/route.tsx) | POST | Renders the PDF and hands it back. | **No.** |
| [`/api/contact`](../src/app/api/contact/route.ts) | POST | The written-review request. Rate-limited 5/min per IP, honeypot field, optional `CONTACT_WEBHOOK_URL` notify. | **Yes** — same table, different `cta_type`. |

**Why the report endpoint writes nothing:** the lead was already captured by
`/api/intake` before the download button existed. A reader who downloads the
report three times produces one prospect, not three — and a database problem
can never stop them getting the file they earned.

`cra_readiness_leads` has exactly one writer, [`src/lib/leads.ts`](../src/lib/leads.ts).
Its row count is the project's tracked outcome metric.

---

## The funnel

Three rungs, and the reader can stop at any of them:

1. **Free, ungated, on screen.** The verdict, the route, the gaps, the Annex reference under each. No email.
2. **Name + work email → the PDF.** `/api/intake`, `cta_type` distinguishing this rung.
3. **The written review.** `/contact`, an engineer's reply in two working days.

---

## Gates, and what they cover

Two harnesses. Neither can see a wrong fact; that is what the tests are for.

| Script | Covers | Asserts |
|---|---|---|
| [`scripts/measure.mjs`](../scripts/measure.mjs) | 11 routes (EN) | one `h1`; composited text contrast in **both** themes; WCAG 1.4.11 inside `data-gfx-meaning` figures; overflow at 390/834/1440/2560; console errors; ghosted content; dead internal links; `::before`/`::after`/`::placeholder` text |
| [`scripts/content-guards.mjs`](../scripts/content-guards.mjs) | 22 routes (EN + NL) | five pinned content defects, each with a `--self-test` red case, checked against the **rendered DOM** |
| `vitest` | `check/classify`, `consulting/claims.consulting` | 33 tests — Annex tier routing, the FOSS carve-out, bilingual parity, the Δ legend vs its own table |
| [`scripts/chrome-guards.mjs`](../scripts/chrome-guards.mjs) | 16 routes + 5 journeys | the header language switch on every route in both languages; the theme surviving a language switch in both directions and both themes; dark as the default; the 390px menu |
| [`scripts/copy-inventory.mjs`](../scripts/copy-inventory.mjs) | 22 routes | regenerates [`PAGE-COPY.md`](./PAGE-COPY.md) |

```bash
npm test      # tsc --noEmit && vitest run && content-guards --self-test
npm run verify   # measure + content-guards + chrome-guards  (needs the site running)
```

**`measure.mjs` sweeps English by default.** Its default route list is
unprefixed (`/`, `/cra`, …), so the proxy negotiates each one and Playwright's
`Accept-Language` lands it on `/en`. Dutch is covered by the content guards and
by the bilingual assertions in the suite, but Dutch **contrast** and Dutch
**overflow** are not measured unless you ask for them:

```bash
node scripts/measure.mjs /nl /nl/cra /nl/twin /nl/conformity \
                         /nl/consulting /nl/company /nl/check /nl/contact
```

This is worth doing before any release. The harness exists partly because
**11 of 11 Dutch pages once scrolled sideways at 834px while 0 of 11 English
pages did** — Dutch is the longer language, and nobody had looked. Leaving the
longer language out of the default sweep is a known gap, not a decision.
