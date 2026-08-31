# Recovery plan — from six failing pages to a site worth shipping

**Written 2026-08-08, after grading all seven routes with independent adversarial
reviewers. Every page failed. This is the honest state and the way out.**

---

## 0. Why it failed. My diagnosis, not an excuse.

1. **I built a measuring apparatus instead of a website.** The harness work was
   real — the contrast gate genuinely was measuring 4 of 58 nodes — but it is
   infrastructure. I let `14/14 green` stand in for quality on a site whose copy
   is thin.
2. **I never opened the material.** `OXOT_Website_Conformity_Application/` holds
   a product spec, app slicks, customer journeys, market research, a CRA/NIS2
   class-designation interlock and four persona action briefs. The live apps run
   at `:8088` and `:4000`. I wrote from `website_strategy/` instead. That is why
   the copy argues *about* the CRA rather than showing the product.
3. **I never applied the heading roles.** §7e rule 3 requires `.h-page` /
   `.h-section` / `.h-sub` / `.h-card` / `.h-micro`. I sized base `h1`/`h2` in
   `globals.css`, which the rule explicitly forbids. That is the oversized
   headings and the broken spacing.
4. **My Chrome check was one hero screenshot.** I never scrolled a full page.

---

## 1. The material I should have started from

`/Users/jimmcknney/Downloads/OXOT_Website_Conformity_Application/`

| source | what it gives the site |
|---|---|
| `artifacts/source_material/CRA_Conformance_Spec_Sheet.pdf` | **OXOT Conformity** — 9 named modules, statutory clocks, ENISA Single Reporting Platform filing, xBOM, CISA KEV, VEX, ISO/IEC 29147 + 30111, 6 named measures, 12-section report |
| `attached_assets/OXOT_Sentyron_Sell_Sheet_4_Personas*.pdf` | Four persona action briefs with real quotes, real numbers, and a repeatable page structure |
| `attached_assets/CRA_Customer_Journeys*.pdf` | The journeys the site should route |
| `attached_assets/OXOT_CRA-NIS2_Class-Designation-Interlock*.pdf` | The CRA/NIS2 interlock — nowhere on the site |
| `attached_assets/OXOT_CRA_Market_Research*.pdf` | Market framing |
| `artifacts/source_material/CRA_PCIRT_Process.html` | The PSIRT process |
| `artifacts/source_material/OXOTSTYLEGUIDE.md` | The visual language the PDFs already demonstrate |
| `:8088`, `:4000` | Running products to screenshot and describe truthfully |

**The persona brief is the page template.** Each runs: the reader's own words →
CRA criteria that applies to you → milestones → where you likely stand today
(traffic light) → impact if you wait → potential issues → the six things we run
with you → start where it hurts. That is a better page than anything I wrote.

Real numbers I never used: €15M / 2.5% top penalty tier · 8–16 month Notified
Body designation lead time · 5-year support period · 10-year retention ·
"40 product families, 3 people".

---

## 2. Stop-ship list. Nothing else matters until these are done.

| # | defect | why it is stop-ship |
|---|---|---|
| S1 | `/consulting` cites **IEC 62443-3-2:2020 §8.4.3**, a clause that does not exist, and attributes `SL-T = IC + AC − 1` to the standard | The audience buys the standard. The page dares them to check. Also correct the source workpaper or it re-enters |
| S2 | `/contact` promises a two-working-day engineer reply; `/api/contact` persists nothing and notifies nobody | The page's job is trust. The transaction is false |
| S3 | **No privacy notice** on an EU page collecting name, work email, employer — and the route logs PII to stdout | GDPR Art. 13. CLAUDE.md §4 |
| S4 | `/check` routes PLC/RTU/DCS to Class II (they are default), HSM/secure element/smart-meter gateway to Class II (Annex IV) | The product gives wrong answers to the core audience. **Fixed 2026-08-08; needs a test** |
| ~~S5~~ | ~~"held as one living graph"~~ — **WITHDRAWN.** It is a description, and an accurate one: the spec sheet confirms the twin holds seven layers as a single graph. The ban was aimed at "one living model" as a marketing overclaim; a substring matcher cannot tell a claim from a noun. **The lesson is about the guard, not the copy** — a banned-word list that fires on vocabulary rather than on assertions will keep flagging true sentences and get switched off. | not a defect |

---

## 3. Then, in order

**A. Typography and spacing (one pass, whole site).**
Apply the heading role classes. Remove sizes from base elements. Fold the ~9
arbitrary body sizes on `/consulting` into the scale. Re-check every page
full-length in Chrome at 390 and 1440, both themes, both locales — scrolled, not
just the hero.

**B. Put the product on the site.**
`/twin` never names or defines the Cyber Digital Twin in prose. There is no page
for **OXOT Conformity** at all. Build it from the spec sheet: the nine modules,
the live Article 14(1) countdown, the ENISA filing interface, xBOM, the six
measures. Screenshot the running app at `:8088`.

**C. Rebuild the pages on the persona structure.**
Four briefs, four readers: Head of Product Security, Head of Regulatory
Compliance, and the two in the `M_personas` sheet. Their own words as the hook.

**D. Close the provenance hole.**
Four pages render from shadow claim sheets (`claims.company.ts`,
`claims.consulting.ts`, `claims.ts` under `contact/`, `twin-claims.ts`) that were
never promoted into `src/content/claims.ts`, so `ALL_CLAIMS` sees none of them.
Add a **provenance guard** that fails when a page imports a `Claim`-shaped
export from outside `claims.ts`.

Do NOT add a naive banned-substring guard. The banned list exists to stop
specific overclaims ("award-winning", "RVO awarded EUR100,000", "top rated of
the 13") — assertions with a truth value. Matching vocabulary instead flags
accurate description, as it just did on "one living graph", and a guard that
cries wolf on correct copy is worse than no guard: the next person weakens it.
Guard the assertions, by name, with their reason.

**E. Give `web/` a test framework.**
`npm test` is `tsc` plus guard self-tests. `classify.ts` — the product — has no
test, which is why S4 shipped green.

---

## 4. What I need from you

1. **S1** — someone must open the purchased IEC 62443-3-2:2020 and CLC/TS
   50701:2021 and give me the real clause numbers. I can cite 4.6.7 and Annex A
   from the public table of contents; I cannot verify 50701 §6.3.2 from any
   public source, and its only provenance is the same workpaper that invented
   §8.4.3.
2. **S2** — decide: wire a store and a notifier, or drop the form for the mailto
   that already works. I will not leave the page promising a reply it cannot make.
3. **Sentyron** — the sell sheets are branded "OXOT × SENTYRON" and Sentyron runs
   V&V testing. Is that a partner to name on the site, or not for publication?
4. The **€100,000** grant figure: the reference doc clears it as OXOT's own
   statement. Do you want it on the page, or kept off?
