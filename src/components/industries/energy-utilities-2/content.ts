/**
 * ENERGY & UTILITIES — ITERATION 2 (`/industries/energy-utilities-2`).
 *
 * A fresh, parallel build standing beside `/industries/energy-utilities`
 * (live, in nav). NOTHING in this folder imports from that folder, and it was
 * neither read nor referenced while this file was written — every string here
 * is transcribed from the brief, not carried across from the shipped page.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_energy.md. Every value below carries the source line number it came
 * from. Nothing is invented. Where the source is silent on something this file
 * would otherwise have to guess, there is a comment saying so instead of a
 * filled-in guess.
 *
 * THIS FILE IS THE SHARED/TOP-LEVEL SLICE ONLY — meta, hero, the four
 * decisions, product capabilities, engagement, and the closing CTA with its
 * intake form. Operational reality, the OT architecture, the asset/data-source
 * tables, the scenario library, the worked example and the regulatory table
 * live in sibling `content.<section>.ts` files, split along section boundaries
 * because this repository caps a file at 500 lines.
 *
 * TWO STANDING CLAIM RULES APPLY TO THIS PAGE'S COPY:
 *   1. OXOT_Visual_Foundation_Spec.md L401 — no percentages, money values,
 *      annual-loss figures or "verified" language without approved inputs.
 *      Source L166 and L170 name annual-loss modeling and a point of
 *      diminishing returns; both are transcribed as the CAPABILITIES they are,
 *      and not one numeric figure is added anywhere on this page.
 *   2. OXOT_Visual_Foundation_Spec.md L354 — "NOW / NEXT / NEVER" is permitted
 *      publicly (owner reversal, 2026-08-24), so source L165's status
 *      vocabulary is carried across intact rather than softened.
 *
 * THE SOURCE'S TWO DANGLING REFERENCE MARKERS (a trailing citation space at
 * L170 and at L258, where the brief cites "the OXOT specification" without
 * naming a document) resolve to `PATHS.technicalSpecification` — the real,
 * live `/technical-specification` route — not to a raw PDF path.
 *
 * `Bilingual`-typed throughout via `same()` (../registry). Both locales render;
 * `nl` is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. See registry.ts's own doc comment.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Meta ───────────────────────────────────────────────────────────────── */

export const META = {
  /** Source L338. */
  title: "Energy & Utilities OT Cybersecurity Digital Twin",
  /** Source L341. */
  description:
    "Test OT-security changes before live operations. OXOT's Cyber Digital Twin connects physical assets, grid and plant controls, network pathways, and operational consequence for energy and utility operators.",
  /** Source L344. Identical to the hero H1 at L30, as the brief intends. */
  h1: "Make energy-security decisions without compromising reliability.",
  /* The brief's own URL at L9 is `/industries/energy-utilities`, which is the
     LIVE page's route. This is iteration 2 and therefore takes the `-2` route;
     the `-2` suffix is the only departure from the brief's stated URL. */
  route: "/industries/energy-utilities-2"
};

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  /** Source L3, the brief's own bolded name for this vertical. */
  eyebrow: same("Energy & Utilities"),
  /** Source L30. */
  h1: same("Make energy-security decisions without compromising reliability."),
  /** Source L32. */
  lead: same(
    "OXOT's Cyber Digital Twin connects physical assets, OT topology, control dependencies, and threat context—so you can test changes, prioritize risk, and justify investment before touching live operations."
  ),
  /** Source L36 → the real `/contact` route (brief's suggested link, L354). */
  ctaPrimary: same("Discuss an energy scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L37 → `/platform/cyber-digital-twin` (L348) maps to PATHS.cdt2. */
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  ctaSecondaryHref: PATHS.cdt2,
  /* The brief's stated SECONDARY CONVERSION, source L26 — a page-level ask,
     not a button. Carried here so the hero can state it beside the two CTAs. */
  note: same("Bring one single-line diagram, P&ID, or asset list."),

  /* THE FOUR SYNCHRONIZED VIEWS, source L41–45. Verbatim, including the
     source's own "OT / protection network" spacing.

     PAIRED WITH THE FOUR-STAGE CHAIN BY ORDER, WHICH IS AN INFERENCE: the
     source prints the four view labels (L44) and the four cascade stages
     (L50–56) as two separate code blocks and never states a mapping between
     them. Their orderings do correspond — physical asset, then control and
     protection, then the communications/remote-access route, then the
     operational outcome — so they are zipped here. The source does not say so
     in words; a component needing them decoupled should read `view` and
     `elements` separately rather than treat this pairing as sourced. */
  viewsLabel: same("View"),
  strata: [
    {
      view: same("Physical system"),
      /** Source L50. */
      elements: same("Generation unit / substation / battery / gas compressor")
    },
    {
      view: same("OT / protection network"),
      /** Source L52. */
      elements: same("Protection relays, RTUs, PLCs, DCS, SCADA, HMIs")
    },
    {
      view: same("Attack pathway"),
      /** Source L54. */
      elements: same("Communications, remote access, operational DMZ, dispatch links")
    },
    {
      view: same("Operational consequence"),
      /** Source L56. */
      elements: same("Trip, loss of telemetry, loss of control, outage propagation, safety event")
    }
  ],

  /* Source L59 — the brief's stated PURPOSE for the hero visual, which is what
     stops the cascade being read as one more network map. Split into its two
     sentences at a boundary the source itself writes; no word changed. */
  purpose: same(
    "The purpose is to show that OXOT can move from cyber route to operational outcome—not merely list CVEs or show a network map."
  ),
  purposeTwo: same(
    "The product's seven-layer model includes facility physics, OT assets, network/Purdue state, engineering evidence, external threat intelligence, simulation, and governance outputs."
  )

  /* GAP, FLAGGED NOT FILLED: the source calls this an "interactive energy-system
     model with four synchronized views" (L41) but never specifies the
     interaction — what selecting a view does, whether the stages are
     individually selectable, or what a hover reveals. No interaction state is
     invented here. Per the owner's standing rule an unbuilt interactive feature
     is placeholdered visibly rather than omitted; the component owner decides
     that placeholder's wording, since this file states no behaviour it cannot
     source. */
};

/* ── S05 · Four energy decisions ────────────────────────────────────────── */

export const DECISIONS = {
  /** Source L161. */
  h2: same("Four decisions that preserve reliability while reducing cyber risk."),
  /** Source L163, the brief's own column headers. */
  questionLabel: same("Energy and utilities language"),
  providesLabel: same("What the Twin provides"),
  /* HREFS: the brief's suggested-links list names only
     `/platform/decisions/change-safely` (L349). The other three decision pages
     are real, live routes verified in src/components/shell/nav.ts
     (decisionFixFirst / decisionInvestment / decisionRiskAcceptance), so all
     four link out rather than three of four dead-ending for no stated reason.
     Linking is a routing decision; no decision's COPY comes from anywhere but
     the source row it belongs to. */
  items: [
    {
      id: "fix-first",
      /** Source L165, all three cells. */
      name: same("What do we fix first?"),
      question: same(
        "Which exposure can disrupt generation, grid operations, field control, safety, or restoration—and is actually reachable?"
      ),
      provides: same(
        "A NOW / NEXT / NEVER priority queue grounded in asset criticality, pathways, and operational consequence"
      ),
      href: PATHS.decisionFixFirst
    },
    {
      id: "spend",
      /** Source L166, all three cells. "A point of diminishing returns" is
       *  transcribed as the capability the source states; no figure is shown
       *  for it, per Visual Foundation Spec L401. */
      name: same("What should we spend?"),
      question: same(
        "Do we fund secure vendor access, segmentation, relay modernization, a new monitoring platform, spares, or a replacement program?"
      ),
      provides: same(
        "Comparable investment cases, modeled reduction, sequencing, and a point of diminishing returns"
      ),
      href: PATHS.decisionInvestment
    },
    {
      id: "change-safely",
      /** Source L167, all three cells. The one decision the brief itself links
       *  out to (L349). */
      name: same("Can we change safely?"),
      question: same(
        "Can we alter this firewall, remote-access route, protection environment, firmware baseline, or communications path without impairing control or restoration?"
      ),
      provides: same(
        "A virtual change test showing required flows, routes closed, residual exposure, and potential operational impacts"
      ),
      href: PATHS.decisionChangeSafely
    },
    {
      id: "leave-alone",
      /** Source L168, all three cells. */
      name: same("What can we leave alone?"),
      question: same(
        "Which legacy issue is isolated, low consequence, or can wait until the next outage—with documented conditions?"
      ),
      provides: same(
        "A formal risk-acceptance record tied to actual reachability, consequence, assumptions, owner, and review trigger"
      ),
      href: PATHS.decisionRiskAcceptance
    }
  ],
  /* Source L170, verbatim, split into its two sentences at the boundary the
     source writes. "Annual-loss modeling" and the "Consequence Index" are
     named as OUTPUTS THE PLATFORM PRODUCES — no loss figure, index value or
     percentage appears anywhere on this page (Visual Foundation Spec L401). */
  note: same(
    "The core OXOT distinction is that risk is based on consequence first, then reachability, then likelihood and financial exposure."
  ),
  noteTwo: same(
    "Its outputs include drillable prioritization, a Consequence Index, annual-loss modeling, and evidence links back to the relevant component and data sources."
  ),
  /* L170's trailing citation marker, resolved. The source cites a document it
     never names; `/technical-specification` is the real page carrying this
     material. */
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};

/* ── S07 · Product capabilities ─────────────────────────────────────────── */

export const CAPABILITIES = {
  /** Source L246. */
  h2: same("One energy-system model for cyber, reliability, and capital decisions."),
  /** Source L248, the brief's own column header for the second cell. */
  valueLabel: same("Energy and utility value"),
  /* IMAGERY REVERSAL, 2026-08-26 (owner instruction). The build's original
     no-imagery call was scoped to energy-SECTOR equipment specifically — no
     real depictive asset exists in this repository for generation plant,
     substations, or field devices, and fabricating one would still break the
     no-fabrication rule. That reasoning never covered the OXOT product's OWN
     architecture: `/images/cdt-architecture-dark.png` /
     `-light.png` are real, already-shipped assets (built 2026-08-25 for
     `water-wastewater-3`'s identical Capabilities section — see that file's
     docblock for full sourcing/trim history), depicting OXOT's own 7-layer
     model, not energy-specific equipment. Reusing them here is the same
     sanctioned "generic brand asset, used compositionally" pattern
     `OXOT_Component_Inventory.md` documents for `RailHero.tsx`'s reuse of the
     same non-sector-specific engine imagery — not a new fabrication. */
  figureAlt: same(
    "The OXOT Cyber Digital Twin's seven-layer architecture: facility physics, OT assets, network and Purdue state, engineering evidence, external threat intelligence, simulation, and governance outputs."
  ),
  items: [
    {
      /** Source L250. */
      name: same("Physical asset and consequence model"),
      body: same(
        "Connects generation, transmission, distribution, storage, gas, or utility-process assets to operating limits, criticality, and failure propagation"
      )
    },
    {
      /** Source L251. */
      name: same("Protection and control mapping"),
      body: same(
        "Represents IEDs, relays, RTUs, PLCs, DCS, SCADA, HMIs, engineering workstations, and relevant logic/configuration relationships"
      )
    },
    {
      /** Source L252. */
      name: same("Network and communications model"),
      body: same(
        "Maps IT/OT boundaries, operational DMZs, field communications, zones, conduits, routing, VLANs, firewalls, and remote-access paths"
      )
    },
    {
      /** Source L253. */
      name: same("Dependency and interdependency graph"),
      body: same(
        "Shows dependencies among plant/site controls, field assets, telecoms, remote support, market/dispatch systems, suppliers, and adjacent services"
      )
    },
    {
      /** Source L254. */
      name: same("Threat and external-pressure model"),
      body: same(
        "Incorporates vulnerabilities, threat actors, supplier risk, geopolitical context, climate/disaster data, and location-specific pressure"
      )
    },
    {
      /** Source L255. */
      name: same("Simulation and investment analysis"),
      body: same(
        "Tests candidate controls before production implementation and compares changes by risk reduction, cost, residual exposure, and operational consequence"
      )
    },
    {
      /** Source L256. */
      name: same("Evidence and assurance outputs"),
      body: same(
        "Produces board, engineering, compliance, and technical views from the same traceable model"
      )
    }
  ],
  /* Source L258, verbatim, split at the em-dash clause boundary the source
     writes. */
  note: same(
    "The OXOT specification includes five projections of the same object—P&ID, Purdue, network, dependency graph, and 3D site view—"
  ),
  noteTwo: same(
    "and supports ongoing regeneration of BOMs, risk deltas, and technical-file sections as the environment changes."
  ),
  /** L258's trailing citation marker, resolved the same way L170's is. */
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};

/* ── S09 · Engagement approach ──────────────────────────────────────────── */

export const ENGAGEMENT = {
  /** Source L285. */
  h2: same("Start with one operational decision."),
  /** Source L287, the brief's own column headers. */
  useCaseLabel: same("Energy use case"),
  outputLabel: same("Output"),
  /* `id` is DOM identity, not copy — anything wiring aria-controls off these
     must not derive them from array position. */
  items: [
    {
      id: "decision-sprint",
      /** Source L289, all three cells. */
      name: same("Decision Sprint"),
      useCase: same(
        "Vendor-access redesign, segmentation change, protection/relay engineering path, modernization, acquisition, or high-risk site"
      ),
      output: same("Modelled scenario, controls comparison, evidence-backed recommendation")
    },
    {
      id: "site-or-system-twin-build",
      /** Source L290, all three cells. */
      name: same("Site or system Twin Build"),
      useCase: same(
        "One generating station, substation fleet, regional control environment, renewable portfolio, or utility process site"
      ),
      output: same(
        "Validated Cyber Digital Twin, priority decision backlog, architecture views, assurance evidence"
      )
    },
    {
      id: "continuous-twin-operations",
      /** Source L291, all three cells. */
      name: same("Continuous Twin Operations"),
      useCase: same(
        "Dynamic estate with changing assets, vulnerabilities, threat activity, or external conditions"
      ),
      output: same(
        "Model updates, risk deltas, scenario testing, executive/engineering reporting, recurring evidence outputs"
      )
    }
  ]
  /* GAP, FLAGGED NOT FILLED: the source gives no duration, price, team shape or
     prerequisite for any of the three tiers. None is invented here. */
};

/* ── S10 · Final CTA and the intake form ────────────────────────────────── */

export const FINAL_CTA = {
  /** Source L295. */
  h2: same("Start with one site, one control environment, or one change."),
  /** Source L297. */
  body: same(
    "Bring a single-line diagram, P&ID, asset list, or a proposed access/segmentation change. OXOT will show how a Cyber Digital Twin can trace the pathway, test the control, and support a defensible decision before you touch live operations."
  ),
  /** Source L299 → `/contact` (L354). */
  ctaPrimary: same("Discuss an energy scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L300 → `/resources/technical-specification` (L353), which is the
   *  real `/technical-specification` route. */
  ctaSecondary: same("Request the Technical Specification"),
  ctaSecondaryHref: PATHS.technicalSpecification,
  /* `/technical-specification` IS ENGLISH-ONLY on this site. Every other page
     linking to it gates the link on locale — the established pattern is
     `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2` (see
     EnergyFinalCta.tsx, ManuFinalCta.tsx, HyperscaleFinalCta.tsx and
     RailFinalCta.tsx). The renderer must apply that gate rather than ship an
     `nl` link into an EN-only page; this flag states the requirement in data. */
  ctaSecondaryEnglishOnly: true,

  formLabel: same("Tell us what to look at"),
  /* NOT FROM THE SOURCE — a required honesty disclosure. The brief specifies
     the form's fields (L302–318) but no submission endpoint exists yet. Per the
     owner's standing rule, an unbuilt interactive feature is built complete and
     visibly placeholdered rather than dropped. */
  formNote: same(
    "This intake is not yet wired to a submission endpoint. Fill it in to see what OXOT asks for, then send the same details through Contact — nothing entered here leaves your browser."
  ),
  fields: {
    /* Source L304 is one bullet, "Name and work email". It renders as two
       inputs because they are two values and because `type="email"` gives the
       second real browser validation. Splitting an input is a rendering
       decision — no field was added and none dropped. */
    name: same("Name"),
    email: same("Work email"),
    /** Source L305. */
    company: same("Company"),
    /** Source L306. */
    role: same("Role"),
    /** Source L307. */
    energySegment: same("Energy segment"),
    /** Source L308. The source writes it "Country / region". */
    countryRegion: same("Country / region"),
    /** Source L309. */
    approximateScope: same("Approximate scope"),
    /** Source L311. */
    decision: same("Decision to evaluate"),
    choose: same("Choose one")
  },
  /* Source L307, all nine options, verbatim — INCLUDING the source's lowercase
     casing, which is how the brief writes this inline list. Not a typo; do not
     "correct" it here. A component wanting title case should do that in CSS. */
  energySegmentOptions: [
    same("generation"),
    same("transmission"),
    same("distribution"),
    same("renewables"),
    same("storage"),
    same("gas/hydrogen"),
    same("district energy"),
    same("multi-utility"),
    same("other")
  ],
  /** Source L309, all five options, verbatim, same lowercase note as above. */
  approximateScopeOptions: [
    same("one site"),
    same("portfolio"),
    same("control center"),
    same("grid region"),
    same("other")
  ],
  /** Source L311–318, all eight options, verbatim. */
  decisionOptions: [
    same("Remediation prioritization"),
    same("Vendor / OEM remote access"),
    same("Segmentation or firewall change"),
    same("Firmware / patch / replacement"),
    same("Protection or substation-control environment"),
    same("Supply-chain / procurement decision"),
    same("Compliance / assurance evidence"),
    same("Other")
  ]
};
