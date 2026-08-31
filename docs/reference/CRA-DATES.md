# CRA dates — the definitive reference

**Regulation (EU) 2024/2847. Compiled 2026-08-06 from Articles 69 and 71 and the
Commission's own summary. Cite this file; do not re-derive dates from memory.**

There is no single "CRA deadline". There are five dates and they govern
different obligations. Copy that names the wrong one is not urgent — it is
imprecise, which this audience notices faster.

---

## The five dates

| Date | What actually happens | Status today |
|---|---|---|
| **10 Dec 2024** | Regulation enters into force. No obligations bite. | past |
| **11 Jun 2026** | **Chapter IV (Arts 35–51)** applies. Member States designate notifying authorities; conformity assessment bodies may be notified and listed in NANDO. | **applied** — register still filling |
| **30 Aug 2026** | Target for the horizontal Type A standard and the Type B vulnerability-management standard. | imminent |
| **11 Sep 2026** | **Article 14 reporting applies.** Actively exploited vulnerabilities and severe incidents, to ENISA and the national CSIRT via the Single Reporting Platform. **Two tracks, four notifications — see below.** | **five weeks out** |
| **30 Oct 2026** | Target for Type C standards (individual product categories). | — |
| **11 Dec 2026** | Member States shall **"strive to ensure … a sufficient number of notified bodies … in order to avoid bottlenecks and hindrances to market entry."** | see below |
| **11 Dec 2027** | **Full application.** CE marking, Annex I essential requirements, Annex VII technical file, Annex V DoC, conformity assessment. | the CE-marking deadline |

## Article 14 — TWO TRACKS, FOUR NOTIFICATIONS, AND THE DEADLINES RUN FROM DIFFERENT EVENTS

**Corrected 2026-08-09 against the regulation text after this table was found to
be wrong.** It previously read "24h early warning, 72h notification, 14-day
final report" as if Article 14 were a single sequence. It is not. Article 14
carries **two separate tracks with different final reports**, and — the part
that is easiest to get wrong — **the two final-report deadlines do not even run
from the same kind of event.**

| Track | Trigger | Early warning | Notification | Final report |
|---|---|---|---|---|
| **Art 14(2)** | An **actively exploited vulnerability** | 24h of becoming aware | 72h of becoming aware | **14 days after a corrective or mitigating measure is available** |
| **Art 14(4)** | A **severe incident** affecting product security | 24h of becoming aware | 72h of becoming aware | **one month after the incident notification was submitted** |

Verbatim, Art 14(2)(c): *"no later than 14 days after a corrective or mitigating
measure is available"*. Verbatim, Art 14(4)(c): *"within one month after the
submission of the incident notification"*.

**THE TRAP.** The 24h and 72h clocks run from **awareness**. The 14-day clock
does **not** — it runs from **a fix being available**, which may be months after
awareness and is an event the manufacturer partly controls. The one-month clock
runs from **your own 72h filing**, not from awareness either. Any copy that
presents "24h / 72h / 14 days" as one countdown from a single starting gun is
wrong twice over: it drops the severe-incident track, and it misstates what
starts the third clock.

`scripts/content-guards.mjs` enforces the four-notification form and was
**right** while this file was wrong — it fails any sentence naming 24h/72h/14
days without also naming 30 days. Do not weaken that guard to match a document.

Sources (external, 2026-08-09): [Article 14 text](https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_14.html)
· [Element, Article 14 reporting guide](https://www.element.com/resources/articles/cyber-resilience-act-article-14-reporting-obligations-guide)

## Article 13 — the support period and the retention clock are LINKED, not parallel

**Added 2026-08-09, externally verified.** These two are routinely listed as
siblings. They are not: one sets the length of the other.

- **Art 13(8) — the support period.** *"the support period shall be at least
  five years. Where the product with digital elements is expected to be in use
  for less than five years, the support period shall correspond to the expected
  use time."* So five years is a floor that a genuinely short-lived product can
  fall below — it is not a flat five-year rule.
- **Art 13(13) — retention.** *"Manufacturers shall keep the technical
  documentation and the EU declaration of conformity at the disposal of the
  market surveillance authorities for at least 10 years after the product with
  digital elements has been placed on the market **or for the support period,
  whichever is longer**."*

**The dependency is the point:** a support period longer than ten years
**extends the retention obligation past ten years**. Ten years is a floor, not
the answer. Copy that lists "10 years" and "support period" as two separate
items hides the one relationship a manufacturer actually needs to plan around.

Note the paragraph number: retention is **13(13)**, not a bare "Article 13".

Sources (external, 2026-08-09): [Article 13 text](https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_13.html)

## Article 69 — what happens to products already on the market

- Products placed on the market **before 11 Dec 2027** are **exempt from most CRA
  requirements**, unless they undergo a **substantial modification** after that
  date. Grandfathering applies **per unit**, not per product line.
- **Derogation, and it is the important one:** the obligations in **Article 14
  apply to ALL in-scope products placed on the market before 11 Dec 2027.**
  Reporting is not grandfathered.

---

## Which date to use, for what

| If the copy is about… | Anchor to | Not |
|---|---|---|
| CE marking, technical file, conformity assessment, effort/timeline planning | **11 Dec 2027** | Sept 2026 |
| Reporting, PSIRT, the 24h clock, products already shipped | **11 Sep 2026** | Dec 2027 |
| Notified-body availability, queue and capacity | **11 Jun 2026** (rules live) and **11 Dec 2026** (sufficiency target) | either of the above |
| Standards availability | 30 Aug / 30 Oct 2026 | Oct 2027 |

**Correcting my own earlier note:** I flagged the site's "effort and timeline
estimate against 11 December 2027" as anchored to the wrong date. It is not.
For CE-marking effort, 11 Dec 2027 is correct. Article 14 is a separate and
narrower obligation. Both statements can be true on the same page, and the site
was right. Recorded here so it is not re-raised.

---

## The 11 December 2026 clause is a gift to the capacity positioning

The regulation itself asks Member States to ensure enough notified bodies
**"in order to avoid bottlenecks and hindrances to market entry."**

The legislator wrote the bottleneck risk into the law. That means OXOT's
capacity work is not a speculative commercial bet — it is aimed at a problem the
Regulation names in its own text, with a date attached.

Usable, precise, and checkable:

> *The Regulation asks Member States to ensure enough notified bodies by
> 11 December 2026 — specifically, in its own words, "to avoid bottlenecks and
> hindrances to market entry." That is the problem OXOT has been working on.*

This is stronger than any capacity claim OXOT could assert on its own, because
the urgency is the EU's, quoted, not OXOT's.

## Rules for writing dates
1. Name the obligation, then the date. "Article 14 reporting, from 11 September
   2026" — never a bare "the deadline".
2. Every dated regulatory claim carries a **re-check interval**. The standards
   dates and the notified-body register are the two most likely to move.
3. Do not describe the register as empty in a way that reads as permanent — it is
   filling. Prefer future or progressive tense.

## Sources
- Commission summary of the legislative text: https://digital-strategy.ec.europa.eu/en/policies/cra-summary
- Article 71 (entry into force and application): https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_71.html
- Article 69 (transitional provisions): https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_69.html
- Chapter IV, Arts 35–51: https://digitalcompliance.snellman.com/regulation/cyber-resilience-act-proposal/chapter-iv-notification-of-conformity-assessment-bodies-art-35-51/
- Notified bodies status, 11 June 2026: https://www.cyberresilienceact.eu/news/cra-notified-bodies-rules-apply-11-june-2026.html
- Reporting deadlines: https://www.cyberresilienceact.eu/reporting.html
