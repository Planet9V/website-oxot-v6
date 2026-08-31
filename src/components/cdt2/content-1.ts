/**
 * CDT-2 COPY, PART 1 — sections 1 through 9.
 *
 * VERBATIM from new_material_source/redesign_cdt_page/handoff/OXOT CDT
 * Pillar Page v2.dc.html — the HTML reference, not the summarized spec.
 * The spec doc (CDT-Pillar-Page-Spec.md) is accurate for section order and
 * palette but drops or paraphrases significant body copy throughout (card
 * descriptions, intro paragraphs, list items) — confirmed by a full line-
 * by-line reconciliation against the HTML on 2026-08-21 after an initial
 * build relied on the spec alone and shipped noticeably thinner/paraphrased
 * copy in several sections. Every string below was checked against the
 * source HTML, not re-derived or guessed.
 *
 * EN only for now — this is a comparison build, not a launch; NL is a
 * deferred follow-up pass (owner decision, 2026-08-21).
 */

export const HERO = {
  eyebrow: "OXOT Cyber Digital Twin",
  h1: "Before you change and spend, replicate your plant.",
  subline: "OXOT powers better OT security decisions.",
  lead: [
    "We build a working replica of your plant from the engineering documents you already hold, then test attacks and changes against the replica instead of the real thing.",
    "What you buy is not the model. What you buy is the ability to decide — with evidence — what to fix, what to spend and what to leave alone."
  ],
  /* Both CTAs pointed at #top until 2026-08-22 (owner, via platform_critique_
     review.md) — neither went anywhere. Primary now anchors to the page's
     own closing CTA (Cdt2ClosingCta, id="contact-band" — same anchor-id
     convention Home-2's hero already uses for the same purpose). Secondary
     goes to /technical-specification.
     ctaSecondary CARRIES NO href, 2026-08-31 — this page (now the site's
     homepage, promoted from /cdt-2, owner request) threads a real `locale`
     prop through Cdt2Hero, which builds the href with `localePath()`
     instead. The prior hardcoded `/en/technical-specification` was a
     deliberate, explicitly-scoped EN-only exception while this was a
     comparison build; on the homepage it silently sent NL visitors to the
     English page on every click — the exact "Dutch bug" this file's own
     PATHS convention exists to prevent. */
  ctaPrimary: { label: "Talk to OX", href: "#contact-band" },
  ctaSecondary: { label: "Read the Technical Specification" },
  decisionsEyebrow: "Four decisions this makes answerable",
  decisions: [
    { title: "What do we fix first?", body: "Findings ranked by what they would actually cost you, not by severity score." },
    { title: "What should we spend?", body: "A figure with a ceiling on it, and the point past which more money buys little." },
    { title: "Can we change this safely?", body: "Test the firewall, the re-zoning or the patch in the replica before the plant." },
    { title: "What can we ignore?", accent: true, body: "A written, defensible decision to leave alone what cannot reach anything that matters." }
  ]
};

export const WHY_IT_EXISTS = {
  eyebrow: "Why it exists",
  h2: "Industrial environments were not built for today's cyber reality.",
  body: [
    "Legacy technology, fragmented asset information and growing IT/OT connectivity make it increasingly difficult to understand where the real risk sits. Remote access, supply-chain dependencies and an evolving threat landscape keep expanding the attack surface, while governance and regulation demand greater control.",
    "And unlike in IT, change itself carries risk: security improvements often have to be made in live, safety- and availability-critical environments where downtime is not an option."
  ],
  callout: {
    lead: "The challenge is therefore not simply finding security issues.",
    body: "It is knowing what matters most, what can safely be changed, and what to do first."
  },
  cardIntro: "That is what the OXOT Cyber Digital Twin is built for. It creates a living model of your environment that we use to:",
  cardItems: [
    "identify and assess cyber risk",
    "test scenarios before making changes in the live environment",
    "understand which systems and dependencies matter most",
    "recommend and prioritise security controls",
    "compare investment options based on risk reduction",
    "support compliance with IEC 62443, NIS2, the Cyber Resilience Act, AI Act, Machine Act and other relevant frameworks"
  ],
  closing: "The result is a model you can keep using to understand what changes, what matters and where your next euro reduces risk most."
};

export const DECISION_01 = {
  eyebrow: "Decision 01 · Know what matters",
  h2: "Three answers, and the discipline to use the third.",
  paragraphs: [
    "Every operator has a backlog too long to finish and no defensible way to order it. We sort findings by what would physically happen if they were used against you, weighed against whether anyone could actually reach them.",
    "The consequence comes from your own safety and reliability studies, and reachability from a model of your real network. Neither is our opinion — which is what makes the third answer survive an auditor."
  ],
  cards: [
    {
      label: "NOW",
      sub: "Tail exposure",
      body: "Reachable pathways to safety-critical systems and crown jewels. These are the ruin scenarios, and they are not a budget question."
    },
    {
      label: "NEXT",
      sub: "Return on spend",
      body: "Real exposure, survivable, worth fixing on merit — sequenced by how much of the distribution each euro removes."
    },
    /* Label was "NEVER" until 2026-08-22 (owner, via platform_critique_
       review.md) — flagged there as a genuine judgment call, not a clear-cut
       fix: "NEVER" reads as decisive, consistent with this page's own blunt
       voice elsewhere, but risks sounding absolute to a regulated/safety-
       conscious buyer reading a public page rather than an internal memo.
       Renamed for that audience; "sub" and "body" already described the
       actual, more nuanced decision this label stands for. */
    {
      label: "ACCEPTED",
      sub: "Deferred, under controlled conditions",
      body: "Unreachable, or reachable with no consequence — written down with the reasoning, so the decision survives an auditor and a staff change."
    }
  ],
  produces: {
    heading: "What it produces",
    items: [
      {
        name: "The Consequence Index",
        body: "One organizational rating, rolled up from equipment to enterprise and priced in euros on a 90-day trend."
      },
      {
        name: "Annual loss expectancy",
        body: "Grounded in published breach frequency, claims severity and disclosed losses — defensible to an underwriter."
      },
      {
        name: "Glass box",
        body: "Never underwrite a number you cannot take apart. Every figure drills to the evidence that produced it."
      }
    ]
  },
  compliance: {
    heading: "Compliance is a by-product",
    intro:
      "Because IEC 62443 zones and conduits are the model's own structure rather than an appendix to it, compliance output is a generated view of work you were already doing. Nobody should be running a compliance programme and a risk programme as two projects.",
    items: [
      { name: "IEC 62443 · TS 50701", body: "Zones, conduits, target and achieved security levels" },
      { name: "NIS2", body: "Risk picture and supplier dependency view" },
      { name: "Cyber Resilience Act", body: "Annex VII technical file at portfolio scale" },
      { name: "AI Act · Machine Act", body: "From the same asset and service model" }
    ]
  }
};

export const WHAT_CHANGES = {
  eyebrow: "What changes, and for whom",
  h2: "Four people stop arguing about the same document.",
  rows: [
    { role: "The board", body: "Stops being asked to trust a maturity score, and starts seeing one figure that moves." },
    { role: "Engineering", body: "Gets a queue for Monday that survives a challenge from the plant manager." },
    { role: "Procurement", body: "Buys against a number, and can compare two proposals on the same basis." },
    { role: "Audit and insurers", accent: true, body: "See the reasoning, not just the conclusion — including what was deliberately not done, and why." }
  ]
};

export const DECISION_02_INVESTMENT = {
  eyebrow: "Decision 02 · Investment",
  h2: "Spend does not buy risk reduction in a straight line.",
  intro:
    "Early investment compounds; then the curve flattens, and past a point more money buys almost nothing. The engine maps that response surface for your estate and finds the ridge — where the return on each additional euro is highest, and where it stops paying. That is what turns a quantified risk into an actionable one: a bounded recommendation rather than an open-ended ask.",
  tailHeading: "The tail is priced separately",
  tailBody:
    "Industrial cyber loss is fat-tailed: one adversary reaching one safety-critical system produces a loss far beyond the mean, and averaging never surfaces it. Monte Carlo simulation returns a full loss distribution with confidence intervals, and the conditional value at risk of the tail is stated apart from the central estimate.",
  callout: {
    lead: "Survive first. Optimise second.",
    body: "A programme that lowers average risk while leaving ruin risk intact has spent money and bought nothing."
  },
  image: "/images/cdt2/investment-s-curves.png",
  cards: [
    { title: "A bounded number", body: "A spend recommendation with a stated ceiling, and the point beyond which more money stops paying." },
    { title: "Comparable options", body: "Competing controls, vendors and sequencing scored against the same distribution." },
    { title: "A roadmap that orders itself", body: "Every finding carries the risk it removes per euro, so the sequence falls out of the model." }
  ]
};

export const DECISION_03_TEST = {
  eyebrow: "Decision 03 · Test before you change",
  h2: "Buy the control after you have watched it work.",
  paragraphs: [
    "Because the twin is a model, you change it before you change the plant. Add the firewall virtually, redraw the segmentation, apply the patch campaign — then re-run the simulation and compare the distributions. The difference between them is the risk that control actually buys.",
    "The same random walks explore alternate histories: the accidental change nobody logged, the configuration drift accumulated over three quiet years, the equipment investment you are considering."
  ],
  cards: [
    { title: "Capital purchases", body: "Score competing products and vendors before the order is placed." },
    { title: "Configuration changes", body: "Segmentation, rules and patch campaigns rehearsed in the model." },
    { title: "Drift and accidents", body: "The change nobody logged, and three quiet years of it." }
  ],
  closing: "Quantified before procurement, tested without touching production. This is the difference between a business case and a hope.",
  image: "/images/cdt2/whatif-control-stack.png"
};

export const WHY_ANSWERS_HOLD = {
  eyebrow: "Why the answers hold",
  h2: "Consequence, then probability, then price.",
  intro:
    "Most of the industry runs this backwards, starting from a vulnerability score and working towards a guess about impact. Consequence has to come first, because it is the part that is genuinely knowable: the engineering tells you what happens when a specific thing fails, and which safety function is supposed to catch it. Probability is then a question about pathways. Price is arithmetic.",
  steps: [
    { n: "01", title: "Consequence", body: "What physically happens, and what stops running." },
    { n: "02", title: "Pathway", body: "Whether anyone can actually get there from outside." },
    { n: "03", title: "Probability", body: "How likely that is, stated with confidence intervals." },
    { n: "04", title: "Financial impact", body: "Consequence times probability, in euros." }
  ],
  engineered: {
    eyebrow: "Loss is engineered, not estimated",
    h3: "Your own engineers already quantified it.",
    intro:
      "The severity of a failure is not something a security tool should be guessing at. The twin integrates that work rather than replacing it, so the euro figure rests on the organisation's own engineering judgement.",
    rows: [
      { acronym: "FMECA", body: "failure mode, effects and criticality per component" },
      { acronym: "RCIL", body: "reliability-critical items, and loss of production or quality" },
      { acronym: "SCIL", body: "safety-critical items, mapped to their protecting functions" },
      { acronym: "MOR", body: "minimum operating requirements and scheduling interruption" },
      { acronym: "Hazlog", body: "the hazard log tracking identified hazards to people, equipment and the environment" }
    ]
  },
  exploitability: {
    eyebrow: "Exploitability",
    h3: "A pathway, not a severity number.",
    intro:
      "Every asset is enriched with known-exploited status, exploit probability, severity and adversary technique — then scored by whether an attacker can actually reach it through your topology. A critical CVE on an unreachable asset is not a critical risk, and saying so in writing is how a backlog becomes a plan.",
    cards: [
      { name: "Known to be exploited", acronym: "KEV", body: "Flaws attackers are using right now" },
      { name: "Likelihood of exploitation", acronym: "EPSS", body: "How probable an attempt is" },
      { name: "Technical severity", acronym: "CVSS", body: "How bad it is if used, in context" },
      { name: "Attacker methods", acronym: "MITRE ATT&CK", body: "The techniques that fit that route" }
    ]
  },
  bomsHeading: "Five bills of materials",
  boms: [
    { name: "SBOM", body: "Software, down to the library" },
    { name: "HBOM", body: "Hardware and firmware" },
    { name: "CBOM", body: "Cryptography, including post-quantum exposure" },
    { name: "SaaS-BOM", body: "Cloud services in the estate" },
    { name: "Ops-BOM", body: "How the plant is actually operated" }
  ],
  bomsClosing:
    "Machine-readable in CycloneDX, versioned and diffable, with transitive dependencies traced — so a vulnerability five libraries deep still surfaces, and the CRA technical file is generated rather than written."
};

export const WORKED_EXAMPLE = {
  eyebrow: "A worked example",
  tag: "Illustrative",
  h2: "One controller, all the way through.",
  intro:
    "A dosing controller on a treatment line is running firmware with a flaw attackers are known to be using. Here is what the model says about it.",
  stages: [
    {
      stage: "CONSEQUENCE",
      body: "The dose can be driven outside its safe band, with one safety system the only thing catching it. A lost shift and a reportable quality event — a figure your own engineers already signed off."
    },
    {
      stage: "PATHWAY",
      body: "The controller sits in a zone reachable from the maintenance network — which a vendor laptop dials into remotely."
    },
    {
      stage: "PROBABILITY",
      body: "With that route open and the flaw in active use, a successful reach sits high in the estate's range, stated with a confidence interval."
    },
    {
      stage: "DECISION",
      accent: true,
      body: "NOW — and the what-if run shows brokering the vendor route closes it for a fraction of the cost of replacing the controller."
    }
  ]
};
