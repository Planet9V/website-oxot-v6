# OXOT Cyber Digital Twin — Pillar Page

**Build spec for developers.** Content, order and behaviour. Visual design is defined by the working reference file, not by this document.

| | |
|---|---|
| Replaces | the current Cyber Digital Twin page |
| Suggested route | `/cyber-digital-twin` |
| Design width | 1440px desktop reference; responsive down to mobile |
| Reference file | `OXOT CDT Pillar Page v2.dc.html` — **build from this one** (open in a browser, renders standalone) |
| Superseded | `OXOT CDT Pillar Page.dc.html` — the earlier model-first order, kept for comparison only |
| Images | `images/` in this folder, renamed for clarity |
| Primary CTA | **Talk to OX** — one wording everywhere on the page |
| Secondary CTA | `info@oxot.nl` (mailto) and *Read the product sheet* |

## Palette and type

| Token | Value | Use |
|---|---|---|
| Background | `#060708` | page base |
| Surface | `#0a0c0e` | alternating section bands and cards |
| Accent | `#ff7a1a` | eyebrows, CTA, rules, numerals |
| Text primary | `#ffffff` | headings |
| Text body | `rgba(242,244,247,.62–.74)` | paragraphs |
| Hairline | `rgba(255,255,255,.07–.10)` | section dividers, card borders |
| Display face | Archivo 600 | headings, card titles, numerals |
| Text face | Instrument Sans 400/500 | body, eyebrows, labels |

Section rhythm: bands alternate `#060708` and `#0a0c0e`, separated by a 1px hairline. Card grids are built as a 1px-gap grid over a hairline background so the gaps read as rules.

## The narrative order matters

This page was deliberately reordered. An earlier version opened with the model and reached the decisions near the end; that follows how the capability was built, not how a buyer thinks. The order below runs: **the decisions you can make → what they change → how they are tested → why the answers hold → and only then the engine that makes it possible.** The Cyber Digital Twin is the engine, not the product; what is being sold is better OT security decision-making.

Do not restore the old order, and do not promote the seven-layer model above the decision sections.

**Every section carries a small uppercase accent eyebrow above its heading.** These are load-bearing — they give a skimming reader the plain name of the section while the heading carries the argument. Do not drop them.

## Page order

Sections in sequence. Anchor ids are used by the nav.

### 1 — Sticky nav

Logo (`images/OXOT_Logo_Dark.png`, ~22px tall) · vertical rule · "Cyber Digital Twin" label.

Links, in this order: Decisions `#decide` · Investment `#invest` · Test first `#test` · Risk `#risk` · The engine `#engine` · Services `#services` · FAQ `#faq`. Then the **Talk to OX** button.

Sticky at top, background `rgba(6,7,8,.94)`, bottom hairline. **Repoint these at real routes if the sections become separate pages.**

### 2 — Hero

Eyebrow: OXOT Cyber Digital Twin

**Before you change and spend, replicate your plant.**

Sub-line, accent colour: *OXOT powers better OT security decisions.*

> We build a working replica of your plant from the engineering documents you already hold, then test attacks and changes against the replica instead of the real thing.
>
> What you buy is not the model. What you buy is the ability to decide — with evidence — what to fix, what to spend and what to leave alone.

Buttons: **Talk to OX** (solid accent) · Read the product sheet (outlined).

Image right: `images/hero-two-pane.png`.

Below, eyebrow *Four decisions this makes answerable*, then four cards:

| Card | Body |
|---|---|
| What do we fix first? | Findings ranked by what they would actually cost you, not by severity score. |
| What should we spend? | A figure with a ceiling on it, and the point past which more money buys little. |
| Can we change this safely? | Test the firewall, the re-zoning or the patch in the replica before the plant. |
| What can we ignore? *(accent title)* | A written, defensible decision to leave alone what cannot reach anything that matters. |

### 3 — Why it exists

Eyebrow: Why it exists · band `#060708`

**Industrial environments were not built for today's cyber reality.**

Legacy technology, fragmented asset information and growing IT/OT connectivity make it increasingly difficult to understand where the real risk sits. Remote access, supply-chain dependencies and an evolving threat landscape keep expanding the attack surface, while governance and regulation demand greater control.

And unlike in IT, change itself carries risk: security improvements often have to be made in live, safety- and availability-critical environments where downtime is not an option.

Callout with a 2px accent left rule:
> **The challenge is therefore not simply finding security issues.**
> It is knowing what matters most, what can safely be changed, and what to do first.

Right column, bordered card on surface tone. Intro: *That is what the OXOT Cyber Digital Twin is built for. It creates a living model of your environment that we use to:*

- identify and assess cyber risk
- test scenarios before making changes in the live environment
- understand which systems and dependencies matter most
- recommend and prioritise security controls
- compare investment options based on risk reduction
- support compliance with IEC 62443, NIS2, the Cyber Resilience Act, AI Act, Machine Act and other relevant frameworks

Closing line: *The result is a model you can keep using to understand what changes, what matters and where your next euro reduces risk most.*

### 4 — Decision 01 · Know what matters `#decide`

Eyebrow: Decision 01 · Know what matters · band `#0a0c0e`

**Three answers, and the discipline to use the third.**

Two paragraphs side by side: every operator has a backlog too long to finish and no defensible way to order it, so findings are sorted by what would physically happen weighed against whether anyone could reach them; and the consequence comes from the customer's own safety and reliability studies with reachability from a model of their real network — *neither is our opinion, which is what makes NEVER survive an auditor.*

Three cards with secondary labels: **NOW** (Tail exposure) · **NEXT** (Return on spend) · **NEVER** (Documented decline).

Then two columns: **What it produces** — The Consequence Index, Annual loss expectancy, Glass box — and **Compliance is a by-product** with four cards: IEC 62443 · TS 50701, NIS2, Cyber Resilience Act, AI Act · Machine Act.

### 5 — What changes, and for whom

Eyebrow: What changes, and for whom · band `#060708`

**Four people stop arguing about the same document.**

| Role | Body |
|---|---|
| The board | Stops being asked to trust a maturity score, and starts seeing one figure that moves. |
| Engineering | Gets a queue for Monday that survives a challenge from the plant manager. |
| Procurement | Buys against a number, and can compare two proposals on the same basis. |
| Audit and insurers *(accent title)* | See the reasoning, not just the conclusion — including what was deliberately not done, and why. |

### 6 — Decision 02 · Investment `#invest`

Eyebrow: Decision 02 · Investment · band `#0a0c0e`

**Spend does not buy risk reduction in a straight line.**

The response-surface and ROI-ridge argument, then a two-column block: *The tail is priced separately* with a **Survive first. Optimise second.** callout, beside `images/investment-s-curves.png`.

Then three cards: **A bounded number** · **Comparable options** · **A roadmap that orders itself**.

### 7 — Decision 03 · Test before you change `#test`

Eyebrow: Decision 03 · Test before you change · band `#060708`

**Buy the control after you have watched it work.**

Copy on changing the model before the plant, plus alternate histories. Three cards: **Capital purchases** · **Configuration changes** · **Drift and accidents**. Closing line: *Quantified before procurement, tested without touching production. This is the difference between a business case and a hope.*

Image: `images/whatif-control-stack.png`

### 8 — Why the answers hold `#risk`

Eyebrow: Why the answers hold · band `#0a0c0e`

**Consequence, then probability, then price.**

Four-step chain across the width: **Step 01 Consequence** (what physically happens, and what stops running) · **Step 02 Pathway** (whether anyone can actually get there from outside) · **Step 03 Probability** (how likely, with confidence intervals) · **Step 04 Financial impact** (consequence times probability, in euros).

Then two columns.

*Loss is engineered, not estimated* — **Your own engineers already quantified it.** Four rows: **FMECA** · **RCIL** · **SCIL** · **MOR**.

*Exploitability* — **A pathway, not a severity number.** Four cards, each leading with the plain-language name and keeping the acronym in brackets: **Known to be exploited** (KEV) · **Likelihood of exploitation** (EPSS) · **Technical severity** (CVSS) · **Attacker methods** (MITRE ATT&CK).

Below: **Five bills of materials** — SBOM, HBOM, CBOM (including post-quantum exposure), SaaS-BOM, Ops-BOM, with the CycloneDX and transitive-dependency note.

### 9 — A worked example

Eyebrow: A worked example · band `#060708` · right-aligned *Illustrative* tag

**One controller, all the way through.**

*A dosing controller on a treatment line is running firmware with a flaw attackers are known to be using. Here is what the model says about it.*

| Stage | Body |
|---|---|
| CONSEQUENCE | The dose can be driven outside its safe band, with one safety system the only thing catching it. A lost shift and a reportable quality event — a figure your own engineers already signed off. |
| PATHWAY | The controller sits in a zone reachable from the maintenance network — which a vendor laptop dials into remotely. |
| PROBABILITY | With that route open and the flaw in active use, a successful reach sits high in the estate's range, stated with a confidence interval. |
| DECISION | **NOW** — and the what-if run shows brokering the vendor route closes it for a fraction of the cost of replacing the controller. |

Keep the *Illustrative* tag. This is a scenario, not customer data.

### 10 — External pressure

Eyebrow: External pressure · band `#0a0c0e`

**Risk does not stop at the fence line.**

Copy on tracking geopolitical, economic, military and environmental pressure across nine domains, bound to each site's real location, closing on *the number moves on a Tuesday when nothing inside the fence was touched.*

Image: `images/worldmonitor.jpg`

3×3 grid of the nine domains: News & geopolitics · Military & security · Maritime & aviation · Cyber & infrastructure · Climate & disasters · Energy & commodities · Finance & economy · Government & supply chain · Nuclear & strategic facilities.

Then two panels — **Country and knock-on effects** (31-Country Instability Index, knock-on failure analysis, value chain, supplier rating) and **Who is coming, and with what** (**Attacker profiles (ATQ)**, **Threat fingerprints (TACAM)**, the seven dimensions). Closing line: *External pressure supplies the likelihood. Your own engineering supplies the loss. The twin is where the two meet.*

### 11 — The engine `#engine`

Eyebrow: How this is possible · the engine · band `#060708`

**You cannot defend what you have never modelled.**

*Everything above rests on one thing: a living, queryable model of your plant — every asset, every flow, every dependency — built from documents you already hold and kept in step with the plant as it changes. Four engineering disciplines meet in it.*

| # | Title | Body |
|---|---|---|
| 01 | Engineering-accurate facility model | Equipment, wiring, piping, signals and Purdue L0–L5 zones, from your P&IDs and DEXPI standards. |
| 02 | What-if scenario simulation | Test a firmware update, a re-zoning or a failure mode before it touches live production. |
| 03 | Safety, reliability and cyber convergence | SIL (IEC 61508), FMECA (IEC 60812) and RAMS metrics joined to live CVE and KEV exploit data. |
| 04 | Capital investment prioritisation | Loss exposure in euros, so remediation is ranked by what the next euro actually buys. |

This section then continues through four sub-sections, all part of the engine argument:

**11a — IEC 62443 native** (band `#0a0c0e`) — **Everything we build is IEC 62443 native.** The standard as the structure the model is partitioned in, with three cards: Zones and conduits · Security levels · Attribution.

**11b — What it is** (band `#060708`) — **A plant you can attack without consequences.** The digital-twin definition and its precedent, then the *It is not* / *It is* column pair.

**11c — What makes it different** (band `#0a0c0e`) — **Most twins are built to make a plant faster. Ours is built to keep it running.** The traditional-versus-OXOT comparison, then **Built for OT, not adapted from IT.** and **Safety and reliability are in the model, not the appendix.**

**11d — The model** `#model` (band `#060708`) — **Seven layers, built from the ground up.** Left: the "a plant is not a network diagram" argument, `images/model-architecture.png`, then *Engineering data in* / *One unified BOM out*. Right: the seven layers as four movements.

| Movement | Layer | Contents |
|---|---|---|
| Decide — what you do about it | L7 Governance · Strategy & compliance | Risk and consequence management · what-if scenarios · compliance frameworks · reporting |
| Interpret — what it means | L6 Service · Business logic & applications | AI/ML services · user apps · process optimization |
| | L5 Data · Fusion & analytics | Unified data model · threats · geopolitical data |
| Connect — how it communicates | L4 Networks · Topology & communications | Network state · virtual networks · flow data |
| | L3 Interoperation · Asset models & protocols | MQTT · OPC UA · TCP/IP · DEXPI 2.0 · CycloneDX data integration |
| Ground — what is physically true | L2 Assets · Physical systems & deployment | PLC programs · SCADA config · virtualized elements |
| | L1 Facility Physics · Environmental & kinetics | Physics-based simulation · thermodynamics · fluid dynamics |

Closing line: *Layer one is not a firewall. Everything above it inherits its consequences from the physics — which is why a finding here is measured in production, safety and euros rather than severity.*

**11e — One model, many lenses** (band `#0a0c0e`) — **Every group reads the plant in its own language.** Five lens cards — P&ID, Purdue, Network, Graph, 3D — beside a **Drill down, roll up** panel carrying `component → equipment → line → facility → organization`.

### 12 — Services `#services`

Eyebrow: OXOT Consulting Services · band `#060708`

**Six consulting services.**

Intro: *Each stands alone or combines into a programme, and each one can feed the Cyber Digital Twin — our fit-for-purpose model, which increases efficiency and effectiveness dramatically. Open any card for what the work involves, how it runs, and what you are left holding.*

**Interaction — accordion.** Six full-width rows. Each closed row shows: number, service name, the one-line quote, and **What this involves →** right-aligned. The whole row is the click target. Opening a row reveals an *At a glance* spec table (left, ~1/3) and the body paragraphs (right, ~2/3). **Only one row open at a time.** Default state: all closed.

If services become their own pages, the routes are:

| # | Service | Route |
|---|---|---|
| 01 | OT Security Assessments | `/services/ot-security-assessments` |
| 02 | OT Security Programmes | `/services/ot-security-programmes` |
| 03 | Architecture & Segmentation | `/services/architecture-and-segmentation` |
| 04 | Secure Remote Access | `/services/secure-remote-access` |
| 05 | OT Security Baseline | `/services/ot-security-baseline` |
| 06 | Capability Transfer | `/services/capability-transfer` |

Full copy for all six — quote line, five At-a-glance rows and body paragraphs — is in the reference file.

### 13 — Deployment `#deploy`

Eyebrow: Deployment · band `#0a0c0e`

**Three ways to run it, all passive-first.**

*No agents on your controllers and no active scanning of the process network, in any configuration.*

| Option | Title | Body |
|---|---|---|
| 01 | Island mode | Isolated. On your own ground, no external dependencies. No access to control systems. Your own custom AI model. |
| 02 | One-way data diode | A data diode limits data to inbound only. This allows our intelligence to stream into the Cyber Digital Twin, but nothing exits. |
| 03 | Dedicated instance | A single-tenant instance located in an AWS service of your choice, aligned to your data sovereignty requirements. |

Then two columns: **Integrations** — asset management, historians, network monitoring, service management — and **Engagement**: *Transient* and *Long-term operations*. Both consulting-led.

### 14 — FAQ `#faq`

Eyebrow: Common questions · band `#060708`

**The questions engineers ask first.**

Eight question-and-answer cards in two columns:

1. Are you putting anything on our control network?
2. Our drawings are out of date. Does that break it?
3. How can you put a euro figure on a cyber event?
4. We already have an OT monitoring platform.
5. Isn't this just a black box with a number on the front?
6. We have no budget this cycle.
7. Do we keep the model afterwards?
8. Does it detect or respond to live attacks?

Closing line: *Something we have not answered? Talk to OX — info@oxot.nl*

Strong candidate for FAQPage structured data.

### 15 — Origin and who builds it

Band `#0a0c0e`. Two columns.

*Where it came from* — **Built under deal pressure, for industries that cannot afford to stop.** The M&A due-diligence origin and the OXOT Seldon Engine.

*Who builds it* — **A Dutch OT cybersecurity company.** The critical-infrastructure positioning, plus a bordered accent panel: **Co-invested by the Dutch government** — *The Dutch government and the European Cybersecurity Competence Centre co-invested in our Cyber Digital Twin under CIF-NL 2025.*

### 16 — Where we work

Eyebrow: Where we work · band `#060708`

**The industries that cannot afford to stop.**

Four cards: **Manufacturing** · **Water** · **Energy** · **Transportation**.

### 17 — Closing CTA

Centred, radial accent glow from the bottom.

**One environment. One evolving model. Better security decisions.**

*Bring one P&ID and an asset list for a single facility, and we will build the model and show you what it finds.*

Buttons: **Talk to OX** · `info@oxot.nl`

### 18 — Footer

Two-part footer.

Upper: logo, the OXOT positioning paragraph, then legal identity — **OXOT B.V.**, Tuinderslaan 11-A, 3641 PZ Mijdrecht, Netherlands, `info@oxot.nl`. Right side, two link columns: *Cyber Digital Twin* (Know what matters, Investment decisions, Test before you change, Understanding risk, The engine, Common questions) and *Consulting* (the six service routes).

Lower legal strip: Privacy statement · Cookie policy · Terms · `© 2026 OXOT B.V. All rights reserved.` Then the GDPR paragraph and the calculations disclaimer:

> The Consequence Index, ALE and simulations are OXOT's own transparent, drillable calculations, directionally validated on real engagements — not rating-agency or actuarial marks. Sample figures shown are illustrative, not customer data.

Both paragraphs are compliance-relevant. Keep them.

## Images

| File | Section | Notes |
|---|---|---|
| `OXOT_Logo_Dark.png` | nav, footer | White wordmark with orange X, for dark backgrounds. Derived from `OXOT_Logo_Light.png` by inverting the dark letterforms and preserving the orange X. **Swap in the official reversed asset when you have it — same dimensions, same placement, no layout change required.** |
| `OXOT_Logo_Light.png` | — | The original, for light backgrounds. |
| `hero-two-pane.png` | hero | Engineering wireframe and cyber analytics |
| `model-architecture.png` | the model | Seven-layer architecture. Needs to run at least 600px wide or the labels stop being legible. |
| `worldmonitor.jpg` | external pressure | World map with event nodes and site pins |
| `whatif-control-stack.png` | test before you change | Layered control experiment |
| `worked-example-sim.png` | optional | Light-background version of the control experiment, if the worked example needs a figure |
| `investment-s-curves.png` | investment decisions | Spend response surface and ROI ridge |

All sit on `#000` inside a hairline border with a small radius. The model, what-if and investment figures carry a soft accent-tinted drop shadow.

## Outstanding before launch

1. **Photography.** The page is entirely schematic. It needs one or two real photographs — a plant, a control room, an operator on site, or water and open sky. This is the single biggest gap in the current build.
2. **Official reversed logo.** The nav and footer currently use a derived white wordmark. Dropping the official reversed asset in at `images/OXOT_Logo_Dark.png` requires no other change.
3. **Contact form.** The page only has a mailto. A generic enquiry form is needed, not a CRA-specific one.
4. **Overlap with Home.** The problem opening, the six-bullet list, the positioning line and the services also appear on Home. Decide what each page owns before building both — recommendation: Home carries the short version and links here; this page owns the depth.
5. **Nav and CTA destinations.** All nav links are in-page anchors and the CTA buttons are unlinked. Point them at real routes and the form endpoint.
6. **Photography for the worked example.** The walk-through is written but unillustrated. A photograph of a real controller or panel would land it harder than any diagram.

## Accessibility and SEO notes

- Headings are a clean `h1 → h2 → h3` outline; keep it that way when porting.
- Every image already has descriptive alt text in the reference file — carry it across rather than rewriting.
- The accordion needs keyboard support: focusable rows, Enter and Space to toggle, `aria-expanded` and `aria-controls`.
- The sticky nav needs a skip link.
- Body copy runs 13–17px on a 1440px canvas. Do not go below 13px on mobile.
- `#faq` suits FAQPage structured data; the service routes suit Service schema.
- Contrast: body text sits at 62–74% white on near-black, which passes AA at these sizes. Do not lighten the background or drop the opacity further.
