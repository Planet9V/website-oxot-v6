/**
 * MANUFACTURING & PROCESS — ITERATION 2 (`/industries/manufacturing-process-2`).
 *
 * A fresh, parallel build standing beside `/industries/manufacturing-process`
 * (live, in nav). NOTHING in this folder imports from that folder, and it was
 * neither read nor referenced while this file was written — every string here
 * is transcribed from the brief, not carried across from the shipped page.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_manu-process.md. Every value below carries the source line number it
 * came from. Nothing is invented. Where the source is silent on something this
 * file would otherwise have to guess, there is a comment saying so instead of a
 * filled-in guess. The one export whose sourcing works differently is
 * ENGAGEMENT — see its own docblock.
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
 *      Source L173 names "a spend ceiling" and "an indication of diminishing
 *      returns"; both are transcribed as the CAPABILITIES they are, and not one
 *      numeric figure appears anywhere on this page.
 *   2. OXOT_Visual_Foundation_Spec.md L354 — "NOW / NEXT / NEVER" is permitted
 *      publicly (owner reversal, 2026-08-24), so source L172's status
 *      vocabulary is carried across intact rather than softened.
 *
 * `Bilingual`-typed throughout via `same()` (../registry). Both locales render;
 * `nl` is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. See registry.ts's own doc comment.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Meta ───────────────────────────────────────────────────────────────── */

export const META = {
  /** Source L331. */
  title: "Manufacturing OT Cybersecurity Digital Twin",
  /** Source L334. */
  description:
    "Test OT security changes before production. OXOT's Cyber Digital Twin connects process engineering, OT networks, cyber pathways, and operational consequence for manufacturing and process facilities.",
  /** Source L337. Identical to the hero H1 at L32, as the brief intends. */
  h1: "Make cyber decisions without gambling with production.",
  /* The brief's own URL at L11 is `/industries/manufacturing-process`, which is
     the LIVE page's route. This is iteration 2 and therefore takes the `-2`
     route; the `-2` suffix is the only departure from the brief's stated URL. */
  route: "/industries/manufacturing-process-2"
};

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  /** Source L5, the brief's own bolded name for this vertical. */
  eyebrow: same("Manufacturing & Process"),
  /** Source L32, repeated verbatim as the page H1 at L337. */
  h1: same("Make cyber decisions without gambling with production."),
  /** Source L34. */
  lead: same(
    "OXOT builds a Cyber Digital Twin from your process engineering, control environment, and network evidence—so you can test cyber changes, prioritize work, and justify investment before touching the plant."
  ),
  /** Source L38 → the real `/contact` route (brief's suggested link, L346). */
  ctaPrimary: same("Discuss a facility or scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L39 → `/platform/cyber-digital-twin` (L341) maps to PATHS.cdt2. */
  ctaSecondary: same("See how the Twin works"),
  ctaSecondaryHref: PATHS.cdt2,
  /* The brief's stated SECONDARY CONVERSION, source L28 — a page-level ask, not
     a button. Carried here so the hero can state it beside the two CTAs. */
  note: same("Bring one P&ID and asset list."),

  /* THE FOUR SYNCHRONIZED VIEWS, source L58. Verbatim.

     PAIRED WITH THE FOUR-STAGE CHAIN BY ORDER, WHICH IS AN INFERENCE: the
     source prints the four view labels (L58) and the four cascade stages
     (L46–52) as two separate code blocks and never states a mapping between
     them. Their orderings do correspond — the process itself, then the control
     and safety layer, then the zone/remote-access route, then the operational
     and business outcome — so they are zipped here. The source does not say so
     in words; a component needing them decoupled should read `view` and
     `elements` separately rather than treat this pairing as sourced. */
  viewsLabel: same("View"),
  strata: [
    {
      view: same("Process"),
      /** Source L46. */
      elements: same("P&ID / process equipment")
    },
    {
      view: same("Network"),
      /** Source L48. */
      elements: same("PLC / DCS / SIS / HMI / historian")
    },
    {
      view: same("Attack path"),
      /** Source L50. */
      elements: same("Purdue zones and remote-access pathways")
    },
    {
      view: same("Decision impact"),
      /** Source L52. */
      elements: same("Physical consequence and business-loss view")
    }
  ],

  /* Source L61 — the brief's stated PURPOSE for the hero visual, which is what
     stops the cascade being read as one more network map. Split into its two
     clauses at the colon boundary the source itself writes; no word changed. */
  purpose: same("That interaction expresses the central differentiator:"),
  purposeTwo: same(
    "a cyber issue becomes meaningful when its actual reachability is joined to the physical consequence defined by the plant's own engineering evidence."
  )

  /* GAP, FLAGGED NOT FILLED: the source calls for "an interactive, stylized
     process line—not a stock factory image" (L43) with "four synchronized
     views" a visitor can toggle (L55), but never specifies the interaction —
     what selecting a view does, whether the stages are individually selectable,
     or what a hover reveals. No interaction state is invented here. Per the
     owner's standing rule an unbuilt interactive feature is placeholdered
     visibly rather than omitted; the component owner decides that placeholder's
     wording, since this file states no behaviour it cannot source. */
};

/* ── S05 · Four manufacturing decisions ─────────────────────────────────── */

export const DECISIONS = {
  /** Source L166. */
  h2: same("Four decisions every plant must make."),
  /** Source L170, the brief's own column headers. */
  questionLabel: same("Manufacturing language"),
  providesLabel: same("What the Twin provides"),
  /* HREFS: the brief's suggested-links list names only
     `/platform/decisions/change-safely` (L342). The other three decision pages
     are real, live routes verified in src/components/shell/nav.ts
     (decisionFixFirst / decisionInvestment / decisionRiskAcceptance), so all
     four link out rather than three of four dead-ending for no stated reason.
     Linking is a routing decision; no decision's COPY comes from anywhere but
     the source row it belongs to. */
  items: [
    {
      id: "fix-first",
      /** Source L172, all three cells. NOW / NEXT / NEVER carried verbatim per
       *  the owner's 2026-08-24 reversal (see this file's docblock). */
      name: same("What do we fix first?"),
      question: same(
        "Which changes reduce the greatest production, quality, safety, or equipment risk first?"
      ),
      provides: same(
        "A consequence- and reachability-led priority queue: NOW, NEXT, and NEVER"
      ),
      href: PATHS.decisionFixFirst
    },
    {
      id: "spend",
      /** Source L173, all three cells. "A spend ceiling" and "an indication of
       *  diminishing returns" are transcribed as the capabilities the source
       *  states; no figure is shown for either, per Visual Foundation Spec
       *  L401. */
      name: same("What should we spend?"),
      question: same(
        "Should we fund segmentation, secure remote access, replacement, patching, monitoring, or a shutdown?"
      ),
      provides: same(
        "Comparable options, modeled risk reduction, a spend ceiling, and an indication of diminishing returns"
      ),
      href: PATHS.decisionInvestment
    },
    {
      id: "change-safely",
      /** Source L174, all three cells. The one decision the brief itself links
       *  out to (L342). */
      name: same("Can we change safely?"),
      question: same(
        "Can we implement this firewall rule, re-zone a line, patch an HMI, or replace a controller without destabilizing production?"
      ),
      provides: same(
        "A virtual experiment: baseline, proposed control, remaining pathways, operational effect, and expected reduction"
      ),
      href: PATHS.decisionChangeSafely
    },
    {
      id: "leave-alone",
      /** Source L175, all three cells. */
      name: same("What can we leave alone?"),
      question: same(
        "Which backlog items can be documented as low consequence or unreachable until conditions change?"
      ),
      provides: same(
        "An evidence-backed exception decision with assumptions, source data, review conditions, and a traceable rationale"
      ),
      href: PATHS.decisionRiskAcceptance
    }
  ],
  /* Source L177, verbatim, split into its two sentences at the boundary the
     source writes. No numeric value appears — "severity score" is named only to
     be rejected as a proxy for plant risk. */
  note: same(
    "The underlying OXOT approach is especially useful for manufacturing because it does not treat a severity score alone as plant risk."
  ),
  noteTwo: same(
    "It combines a modeled pathway with the consequence embodied in the facility's safety, reliability, and operational records."
  ),
  /* L177's trailing citation marker, resolved. The source ends the line with a
     dangling reference space, citing "the underlying OXOT approach" without
     naming a document; `/technical-specification` is the real page carrying
     this material. Same resolution the Energy build applied to its L170. */
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};

/* ── S07 · Product capabilities ─────────────────────────────────────────── */

export const CAPABILITIES = {
  /* Source L249. This headline sits under a bare `### Section headline` with no
     `##` parent in the brief — it belongs to the Product capabilities section
     named in the page structure at L322, and follows immediately after the
     Worked Use Case's Result Message (L243). */
  h2: same("One evolving model for security, operations, and investment decisions."),
  /* Source L251 is "Use a six-module layout:" — a LAYOUT DIRECTIVE to the
     designer, not page copy. It is honoured as the six-item shape of `items`
     below and deliberately not exposed as a rendered string. */
  /** Source L253, the brief's own column header for the second cell. */
  valueLabel: same("Manufacturing value"),
  /* NO IMAGE REFERENCE IS CARRIED IN THIS EXPORT, deliberately. The imagery
     decision for this section is a REUSE call made in the component file, not
     data this content module needs to hold. */
  items: [
    {
      /** Source L255. */
      name: same("Facility and process model"),
      body: same(
        "Represents equipment, process constraints, potential failure propagation, containment limits, and operational boundaries"
      )
    },
    {
      /** Source L256. */
      name: same("OT asset and logic mapping"),
      body: same(
        "Connects controllers, HMI/SCADA/DCS assets, configuration, and relevant control logic to process functions"
      )
    },
    {
      /** Source L257. */
      name: same("Purdue and network-state model"),
      body: same(
        "Represents zones, conduits, remote access, VLANs, subnets, virtual firewalls, and actual reachability"
      )
    },
    {
      /** Source L258. */
      name: same("Engineering consequence fusion"),
      body: same(
        "Uses FMECA, hazard, safety, reliability, and operational evidence rather than invented security-layer impact estimates"
      )
    },
    {
      /** Source L259. */
      name: same("Threat, supplier, and external-pressure context"),
      body: same(
        "Enriches decisions with vulnerability, threat-actor, supplier, geopolitical, and disruption signals"
      )
    },
    {
      /** Source L260. NOW/NEXT/NEVER carried verbatim, as at L172. */
      name: same("Simulation, prioritization, and evidence"),
      body: same(
        "Supports control experiments, NOW/NEXT/NEVER prioritization, financial exposure, technical outputs, and traceable evidence"
      )
    }
  ],
  /* Source L262, verbatim, split at the em-dash clause boundary the source
     writes. */
  note: same(
    "The OXOT specification describes a seven-layer stack spanning facility physics, assets, interoperation, networks, data fusion, services, and governance—"
  ),
  noteTwo: same(
    "along with views across P&ID, Purdue, network, dependency graph, and 3D site representation."
  ),
  /* L262's trailing citation marker, resolved the same way L177's is.
     VERIFIED AGAINST THE RAW FILE, AND IT CONTRADICTS THE BUILD BRIEF: L262
     DOES end in the same dangling reference space as L160, L177 and L245, and
     cites "the OXOT specification" without naming a document — identical to
     Energy's L258. Resolved to the real `/technical-specification` route rather
     than left dangling. Flagged to the integration owner. */
  citation: {
    label: same("See the Technical Specification"),
    href: PATHS.technicalSpecification
  }
};

/* ── S09 · Engagement approach ──────────────────────────────────────────── */

/**
 * THIS EXPORT'S SOURCING WORKS DIFFERENTLY FROM THE OTHER FIVE. READ THIS
 * BEFORE EDITING IT.
 *
 * "Engagement approach" is NAMED in the Manufacturing brief's page structure
 * (L324) but the brief carries NO BODY COPY for it anywhere — no headline, no
 * tiers, no table. Verified twice against the full file and confirmed with the
 * owner; this is a genuine hole in the source, not a section this build missed.
 *
 * OWNER-APPROVED RESOLUTION (2026-08-26): reuse the STRUCTURAL FRAMEWORK from
 * industry_energy.md's own Engagement section (L285–291) — the three tiers
 * Decision Sprint / Site or system Twin Build / Continuous Twin Operations,
 * plus its "Engagement / use case / Output" column shape. That three-tier shape
 * is OXOT's standard cross-sector engagement methodology, not Energy-specific
 * content: the Rail brief carries the identical three tiers.
 *
 * THE FRAMEWORK IS BORROWED; THE LANGUAGE IS NOT. Every use case and output
 * string below is written from facts ALREADY SOURCED ELSEWHERE IN
 * MANUFACTURING'S OWN BRIEF, cited per tier. No Energy-specific wording
 * (generating stations, substation fleets, relays, dispatch) is carried across.
 *
 * The h2 is anchored to Manufacturing's own Final CTA headline at L288.
 */
export const ENGAGEMENT = {
  /* Structural echo of Energy's "Start with one operational decision." (energy
     L284), written in Manufacturing's own register from this brief's Final CTA
     headline at L288 ("Start with one line, one facility, or one decision.")
     and its stated primary conversion at L24 ("Discuss one facility or proposed
     change"). */
  h2: same("Start with one line, one facility, or one decision."),
  /* Column headers: Energy's "Energy use case" / "Output" shape (energy L286),
     with the first re-registered to this vertical. */
  useCaseLabel: same("Manufacturing use case"),
  outputLabel: same("Output"),
  /* `id` is DOM identity, not copy — anything wiring aria-controls off these
     must not derive them from array position. */
  items: [
    {
      id: "decision-sprint",
      /* Tier name: Energy L288 (standard cross-sector tier).
         USE CASE grounded in Manufacturing's own material — the vendor
         remote-access scenario at L151, the segmentation/remote-access and
         patch/replacement decisions at L173, and the "high-risk line" framing
         of the four decisions at L172–174.
         OUTPUT grounded in this brief's own Worked Use Case, which states
         exactly what a single-scenario engagement returns: candidate controls
         tested (L233–239) and "a defensible sequence ... retain the evidence"
         (L243). */
      name: same("Decision Sprint"),
      useCase: same(
        "Vendor-access redesign, a segmentation or firewall change, a patch, replacement, or modernization question, or one high-risk line"
      ),
      output: same(
        "Modelled scenario, candidate-control comparison, and a defensible, evidence-backed sequence"
      )
    },
    {
      id: "site-or-system-twin-build",
      /* Tier name: Energy L289 (standard cross-sector tier).
         USE CASE grounded in Manufacturing's own scope language — the intake
         form's "Approximate facility or estate scope" (L302), the multi-site
         variation concern (L73 / L100), and the brief's own "one line, one
         facility" framing (L288).
         OUTPUT grounded in what this brief says the model itself produces: the
         common architecture and Purdue/network views (L114–132, L257), the
         NOW/NEXT/NEVER priority queue (L172), and structured evidence for risk
         and control decisions (L269, L273). */
      name: same("Site or system Twin Build"),
      useCase: same(
        "One production line, one facility, or a multi-site estate running similar equipment under different local conditions"
      ),
      output: same(
        "Validated Cyber Digital Twin, a NOW / NEXT / NEVER decision backlog, process and Purdue architecture views, and structured assurance evidence"
      )
    },
    {
      id: "continuous-twin-operations",
      /* Tier name: Energy L290 (standard cross-sector tier).
         USE CASE grounded in Manufacturing's own two standing-change scenarios:
         "Undocumented drift" (L157) and "External pressure" (L158), plus the
         brownfield-divergence concern at L70 / L97.
         OUTPUT grounded in the candidate decisions those same two rows state —
         "Detect model deltas and evaluate changed reachability" (L157) and
         "Recalculate exposure and refresh decision priorities" (L158) — and the
         board/engineering reporting the brief names at L278. */
      name: same("Continuous Twin Operations"),
      useCase: same(
        "A changing plant where undocumented drift accumulates across maintenance cycles, or where threat, supplier, and external conditions shift while the plant stays technically unchanged"
      ),
      output: same(
        "Model deltas and changed reachability, recalculated exposure and refreshed decision priorities, scenario testing, and recurring plant-management and engineering evidence"
      )
    }
  ]
  /* GAP, FLAGGED NOT FILLED: neither brief gives a duration, price, team shape
     or prerequisite for any of the three tiers. None is invented here. */
};

/* ── S10 · Final CTA and the intake form ────────────────────────────────── */

export const FINAL_CTA = {
  /** Source L288. */
  h2: same("Start with one line, one facility, or one decision."),
  /** Source L290. */
  body: same(
    "Bring a P&ID, an asset list, and a change or investment question. OXOT will show how a Cyber Digital Twin can connect the route, the consequence, and the decision—before your team changes production."
  ),
  /** Source L292 → `/contact` (L346). */
  ctaPrimary: same("Discuss a manufacturing scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L293 → `/resources/technical-specification` (L345), which is the
   *  real `/technical-specification` route. */
  ctaSecondary: same("Request the Technical Specification"),
  ctaSecondaryHref: PATHS.technicalSpecification,
  /* `/technical-specification` IS ENGLISH-ONLY on this site. Every other page
     linking to it gates the link on locale — the established pattern is
     `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2`. The renderer
     must apply that gate rather than ship an `nl` link into an EN-only page;
     this flag states the requirement in data. */
  ctaSecondaryEnglishOnly: true,

  formLabel: same("Tell us what to look at"),
  /* NOT FROM THE SOURCE — a required honesty disclosure. The brief specifies
     the form's fields (L297–311) but no submission endpoint exists yet. Per the
     owner's standing rule, an unbuilt interactive feature is built complete and
     visibly placeholdered rather than dropped. */
  formNote: same(
    "This intake is not yet wired to a submission endpoint. Fill it in to see what OXOT asks for, then send the same details through Contact — nothing entered here leaves your browser."
  ),
  fields: {
    /* Source L297 is one bullet, "Name and work email". It renders as two
       inputs because they are two values and because `type="email"` gives the
       second real browser validation. Splitting an input is a rendering
       decision — no field was added and none dropped. */
    name: same("Name"),
    email: same("Work email"),
    /** Source L298. */
    company: same("Company"),
    /** Source L299. */
    role: same("Role"),
    /** Source L300. */
    manufacturingSubsector: same("Manufacturing subsector"),
    /** Source L301. The source writes it "Country / facility region". */
    countryFacilityRegion: same("Country / facility region"),
    /** Source L302. */
    approximateScope: same("Approximate facility or estate scope"),
    /** Source L303. */
    decision: same("Decision to evaluate"),
    choose: same("Choose one")
  },
  /* NO OPTION LIST IN THE SOURCE, FLAGGED NOT FILLED: unlike Energy's brief,
     which enumerates its segment and scope choices inline, this brief states
     "Manufacturing subsector" (L300) and "Approximate facility or estate scope"
     (L302) as bare fields with no options. No subsector taxonomy and no scope
     bands are invented here — both render as free text. */

  /** Source L304–310, all seven options, verbatim. */
  decisionOptions: [
    same("Remediation priority"),
    same("Segmentation or remote-access change"),
    same("Patch / replacement / modernization"),
    same("Investment or procurement decision"),
    same("M&A / diligence"),
    same("Regulatory / assurance evidence"),
    same("Other")
  ],

  /* Source L311, the brief's one OPTIONAL field, verbatim including its own
     question mark. The source marks it "Optional:" — that optionality is data,
     not styling, so it is carried as a flag rather than left to the renderer to
     infer. */
  optionalField: {
    label: same("Do you have a P&ID and asset list available?"),
    optional: true
  }
};
