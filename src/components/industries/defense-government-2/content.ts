/**
 * DEFENSE & GOVERNMENT — ITERATION 2 (`/industries/defense-government-2`).
 *
 * A fresh, parallel build standing beside `/industries/defense-government`
 * (live, in nav). NOTHING in this folder imports from that folder and nothing
 * in that folder is modified by this build.
 *
 * ─── READ THIS BEFORE EDITING ANY COPY IN THIS FOLDER ────────────────────────
 *
 * THE SOURCING HERE IS UNUSUAL, AND KNOWING WHY IS WHAT KEEPS THE COPY SAFE.
 *
 * The obvious spec file for this vertical — `new_material_source/
 * 1_website_layout_v4/3_industries/industry_defense_airgap.md` (124 lines,
 * cited below as BRIEF) — is NOT the main content source. Its "Brief content of
 * each section" table (L42–L53) gives one sentence *describing* each section
 * rather than the section's copy. It is a brief, not a draft.
 *
 * The finished copy lived in `3_industries/industry_defence.md`. THAT FILE IS
 * NOW EMPTY — 1 byte on disk, never committed with content, unrecoverable. The
 * only surviving record of that approved prose is the live page's own content
 * module, `src/components/industries/defense-government/content.ts`, whose
 * docblock states it was transcribed from that file as "finished, ready-to-use
 * copy, not an outline."
 *
 * SO THAT MODULE IS TREATED HERE AS A PRIMARY SOURCE, cited below as CORPUS
 * with its own line numbers. Every prose string in this folder is carried from
 * it VERBATIM — not paraphrased, not shortened, not "improved." There is no
 * upstream to re-derive a better wording from; an edit here is a permanent
 * change to approved copy with no source left to check it against.
 *
 * WHAT THE BRIEF ADDS, and it is the only material the CORPUS does not carry:
 * the interactive Sovereign System Model's two selector axes (6 missions, 7
 * pressures) and its 6-layer chain — BRIEF L60–L91. Those live in
 * `content.sovereignModel.ts` with the gap they carry flagged in full.
 *
 * TWO STRINGS ARE LOAD-BEARING AND MUST SURVIVE ANY EDIT INTACT:
 *   1. `SCOPE.boundary` (`content.scope.ts`) — the sentence stating OXOT does
 *      NOT model weapons systems, classified battle-management systems, or
 *      intelligence operations. The CORPUS marks it load-bearing at its own
 *      L16–L20 and instructs future edits to keep it; that instruction is
 *      carried forward, not restated as a preference.
 *   (A second guard formerly listed here — an enquiry warning telling readers not
 *   to send classified or operationally sensitive material — was REMOVED on
 *   2026-08-27 by owner decision. The P&ID, single-line drawing and BMS/EPMS map
 *   ARE the artifacts OXOT builds a Twin from, so warning against sending
 *   technical material argued directly against the page's own conversion. The
 *   scope boundary above is unaffected and remains load-bearing.)
 *
 * ─── WHERE EACH EXPORT LIVES ─────────────────────────────────────────────────
 *
 * This repository caps a file at 500 lines and the CORPUS alone is 319, so the
 * content is split along section boundaries. There is no barrel re-export —
 * import from the specific file, the same way `manufacturing-process-2` does:
 *
 *   content.ts                 META · HERO · DECISIONS · CAPABILITIES ·
 *                              ENGAGEMENT · FINAL_CTA        (this file)
 *   content.sovereignModel.ts  SOVEREIGN_CHAIN · MISSIONS · PRESSURES
 *   content.scope.ts           SOVEREIGNTY · SCOPE
 *   content.architecture.ts    ARCHITECTURE
 *   content.scenarios.ts       SCENARIOS
 *   content.workedExample.ts   WORKED_EXAMPLE
 *   content.airgap.ts          AIR_GAP · CASE_STUDIES
 *   content.regulatory.ts      REGULATORY
 *
 * NO INTAKE FORM IS DEFINED ANYWHERE IN THIS FOLDER, deliberately. The CORPUS
 * records (its L12–L14) that the original source's lead-form field list was
 * dropped because this site has one shared contact mechanism (ContactBand +
 * ThreeDoors), not a per-page form. That decision is carried, not revisited —
 * and on this page in particular a bespoke form would invite exactly the
 * enquiry content `FINAL_CTA.body` tells the visitor not to send.
 *
 * `Bilingual`-typed throughout via `same()` (../registry). Both locales render;
 * `nl` is a same-as-English placeholder pending translation, not a claim that
 * this text is correct Dutch. See registry.ts's own doc comment.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

/* ── Meta ───────────────────────────────────────────────────────────────── */

export const META = {
  /** CORPUS L37. */
  title: "Sovereign Defense & Government Cyber Digital Twin",
  /** CORPUS L38–L39. */
  description:
    "Model the infrastructure and dependencies that sustain sovereign defense and government operations. OXOT's Cyber Digital Twin tests cyber, supply-chain, power, communications, and hybrid-disruption decisions before they constrain the mission.",
  /* BRIEF L11 states the URL as `/industries/defense-government`, which is the
     LIVE page's route. This is iteration 2 and takes the `-2` route; that
     suffix is the only departure from the brief's stated URL. */
  route: "/industries/defense-government-2"
};

/* ── S00 · Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  /** BRIEF L1, the brief's own bolded name for this vertical. */
  eyebrow: same("Defense & Government"),
  /** CORPUS L43. BRIEF L15 carries the identical headline. */
  h1: same("Preserve sovereign operational freedom under cyber and physical pressure."),
  /* CORPUS L44–L46. The BRIEF's L19 variant is a shorter earlier draft of the
     same sentence ("facilities, OT, communications, suppliers, and recovery
     pathways"); the CORPUS wording is the finished one and is what ships. */
  lead: same(
    "OXOT's Cyber Digital Twin models the infrastructure, controls, communications, dependencies, and recovery pathways that enable government and defense operations — so teams can test decisions before a real incident constrains their options."
  ),
  /** CORPUS L47 = BRIEF L21 → the real `/contact` route. */
  ctaPrimary: same("Discuss a sovereign resilience scenario"),
  ctaPrimaryHref: PATHS.contact,
  /* CORPUS L48 = BRIEF L22. The string names THIS PAGE'S OWN main visual (BRIEF
     L57, the interactive Sovereign System Model), but a content module cannot
     name a section id it does not own. `/cdt-2` is a real, live destination and
     the live page's own choice for this button; a later builder that gives the
     model section an id may retarget this to that anchor. It must not be left
     as a placeholder — no page on this site ships a dead CTA. */
  ctaSecondary: same("Explore the sovereign-system model"),
  ctaSecondaryHref: PATHS.cdt2,

  /* CORPUS L53–L59, verbatim — the five-node chain the LIVE page renders as a
     static vertical illustration.
     KEPT ALONGSIDE the BRIEF's own six-layer chain (`SOVEREIGN_CHAIN` in
     content.sovereignModel.ts) RATHER THAN MERGED WITH IT, because they are two
     different drawings of the same territory and neither is a superset: the
     CORPUS chain ends on "Cyber pathway → disruption → recovery decision" — a
     decision — where the BRIEF's ends on "Cyber or hybrid-event consequence" —
     an outcome — and the BRIEF splits infrastructure into a resource layer and
     a control layer where the CORPUS runs them together. Collapsing them would
     mean inventing a seventh reading neither source states. The hero builder
     picks one for the visual and should say in code which, and why. */
  chain: [
    same("Mission / essential public service"),
    same("Government and defense operations"),
    same("Secure facilities & critical infrastructure"),
    same("OT, communications, identity, suppliers, personnel"),
    same("Cyber pathway → disruption → recovery decision")
  ]
};

/* ── Four decisions ─────────────────────────────────────────────────────── */

export const DECISIONS = {
  /** CORPUS L178. */
  h2: same("Four decisions that preserve mission and national continuity."),
  /* Column headers. BRIEF L118 names its own two columns "OXOT question" /
     "Defense & government wording"; the CORPUS carries a third cell per row
     (what the Twin provides) that the BRIEF's table has no column for, so the
     headers are registered to the three cells that actually exist. */
  questionLabel: same("Defense & government wording"),
  providesLabel: same("What the Twin provides"),
  /* HREFS ARE A ROUTING DECISION, NOT COPY. Neither source names a destination
     for these four rows. All four decision pages are real, live routes
     (verified in src/components/shell/nav.ts: decisionFixFirst /
     decisionInvestment / decisionChangeSafely / decisionRiskAcceptance), so all
     four link out rather than some subset dead-ending for no stated reason. No
     decision's copy comes from anywhere but its own CORPUS row.
     `id` is DOM identity, not copy — anything wiring aria-controls off these
     must not derive them from array position. */
  items: [
    {
      id: "fix-first",
      /** CORPUS L180, all three cells. BRIEF L120 is the shorter draft. */
      name: same("What do we fix first?"),
      question: same(
        "Which reachable pathway can degrade a mission-enabling function, essential public service, base, logistics route, secure facility, or continuity capability?"
      ),
      provides: same(
        "NOW / NEXT / NEVER priority based on mission effect, physical consequence, reachability, recovery constraints, and dependency cascade."
      ),
      href: PATHS.decisionFixFirst
    },
    {
      id: "spend",
      /* CORPUS L181, all three cells. BRIEF L121 is the shorter draft. No
         figure, percentage or money value appears — Visual Foundation Spec
         L403 bars them without approved inputs, and neither source states one. */
      name: same("What should we spend?"),
      question: same(
        "Should we fund isolation, resilient power, alternate communications, secure remote maintenance, sovereign hosting, spare parts, alternative suppliers, fuel reserve, or redundancy?"
      ),
      provides: same(
        "Comparable options that show which investment reduces mission risk most, and where additional spend stops materially improving resilience."
      ),
      href: PATHS.decisionInvestment
    },
    {
      id: "change-safely",
      /** CORPUS L182, all three cells. BRIEF L122 is the shorter draft. */
      name: same("Can we change safely?"),
      question: same(
        "Can we change a firewall, remote-support architecture, generator-control configuration, identity boundary, carrier route, or controller firmware without reducing readiness or continuity?"
      ),
      provides: same(
        "A virtual experiment showing operating flows preserved, routes closed, residual dependencies, rollback needs, and recovery consequences."
      ),
      href: PATHS.decisionChangeSafely
    },
    {
      id: "leave-alone",
      /** CORPUS L183, all three cells. BRIEF L123 is the shorter draft. */
      name: same("What can we leave alone?"),
      question: same(
        "Which legacy system, supplier dependency, or constrained asset can stay in service under compensating controls until replacement — without silently creating an operational gap?"
      ),
      provides: same(
        "A traceable risk-acceptance record with owner, mission rationale, compensating controls, supply assumptions, review trigger, and sunset date."
      ),
      href: PATHS.decisionRiskAcceptance
    }
  ],
  /* BRIEF L125, AND THE SOURCE FILE ENDS MID-SENTENCE THERE. Its last line
     reads "...transparent decisions about mission effect, resilience
     investment," and stops; there is no L126. The two clauses the source does
     complete are carried; the truncated tail is NOT completed here, because
     finishing someone else's sentence is writing copy, not transcribing it. */
  note: same("The page should emphasize that OXOT does not just identify vulnerabilities;"),
  noteTwo: same(
    "it helps leadership make transparent decisions about mission effect and resilience investment."
  )
  /* GAP, FLAGGED NOT FILLED: BRIEF L125 is cut off in the source and names at
     least one further object of "decisions about" that no longer exists
     anywhere. `noteTwo` closes the clause on the two objects the source does
     state and adds nothing else. A renderer may legitimately drop this note
     rather than print a reconstructed sentence — that call belongs to the
     section owner, and either choice is defensible. */
};

/* ── Product capabilities ───────────────────────────────────────────────── */

export const CAPABILITIES = {
  /** CORPUS L269. */
  h2: same("A sovereign digital twin for capability, infrastructure, and recovery decisions."),
  /* NO IMAGE REFERENCE IS CARRIED IN THIS EXPORT, deliberately. Whether this
     section takes imagery is a reuse/generation call made in the component file
     (see OXOT_Component_Inventory.md's imagery-pipeline test), not data this
     content module holds. */
  items: [
    {
      /** CORPUS L271. */
      name: same("Mission-to-infrastructure mapping"),
      body: same(
        "Connects essential government functions and mission-enabling capabilities to facilities, OT, communications, suppliers, personnel, and recovery requirements."
      )
    },
    {
      /** CORPUS L272. */
      name: same("Facility and infrastructure model"),
      body: same(
        "Represents power, fuel, water, HVAC, BMS/EPMS, data centers, physical security, industrial systems, and site operating limits."
      )
    },
    {
      /** CORPUS L273. */
      name: same("Cyber-pathway and zone model"),
      body: same(
        "Maps OT/IT boundaries, remote support, privileged access, network segmentation, management paths, configuration relationships, and actual reachability."
      )
    },
    {
      /** CORPUS L274. */
      name: same("Dependency and mobilization model"),
      body: same(
        "Relates civil infrastructure, vendors, logistics, workforce, spares, fuel, communications, cloud, and allied interfaces to required capability."
      )
    },
    {
      /** CORPUS L275. */
      name: same("Supply-chain provenance model"),
      body: same(
        "Uses software, hardware, cryptographic, SaaS, and operations BOMs to identify inherited dependency, firmware, certificate, vendor, and human-workflow exposure."
      )
    },
    {
      /** CORPUS L276. */
      name: same("Hybrid-event simulation"),
      body: same(
        "Tests cyber plus power, weather, physical disruption, telecom loss, supply interruption, or personnel constraint — before a crisis."
      )
    },
    {
      /** CORPUS L277. */
      name: same("Investment and prioritization model"),
      body: same(
        "Compares resilient power, alternate communications, access redesign, local recovery, supplier diversification, spares, and modernization options."
      )
    },
    {
      /** CORPUS L278. */
      name: same("Evidence and decision provenance"),
      body: same(
        "Links each modelled value and recommendation to source engineering data, operating procedures, contracts, configuration evidence, and external intelligence."
      )
    },
    {
      /** CORPUS L279. */
      name: same("Sovereign deployment options"),
      body: same(
        "Supports isolated/on-premises operation, one-way intelligence ingestion via data diode, or dedicated customer-controlled deployment, aligned to classification and sovereignty requirements."
      )
    }
  ]
};

/* ── Engagement approach ────────────────────────────────────────────────── */

/**
 * UNLIKE `manufacturing-process-2`, THIS SECTION NEEDED NO BORROWED FRAMEWORK.
 * Manufacturing's brief carried no engagement copy at all and had to reuse
 * Energy's three-tier shape by owner approval. Defense's own source carries a
 * complete FIVE-tier model with per-tier use case and output (CORPUS L301–L310)
 * — a real sector difference, not an inconsistency to normalize: two of the
 * five tiers (Hybrid Resilience Exercise, Technology Sovereignty Assessment)
 * have no equivalent in the standard three-tier shape. Do not "align" this to
 * three tiers.
 */
export const ENGAGEMENT = {
  /** CORPUS L302. */
  h2: same("Start with one essential function, one operational site, or one dependency chain."),
  /* Column headers, registered to this vertical from the three cells each
     CORPUS row carries. */
  useCaseLabel: same("Defense & government use case"),
  outputLabel: same("Output"),
  items: [
    {
      id: "sovereign-resilience-decision-sprint",
      /** CORPUS L304, all three cells. */
      name: same("Sovereign Resilience Decision Sprint"),
      useCase: same(
        "A high-consequence facility, remote-access path, fuel/power dependency, data-center control environment, or continuity question"
      ),
      output: same(
        "Notional/approved model, dependency cascade, candidate controls, recovery sequence, leadership decision brief"
      )
    },
    {
      id: "mission-support-twin-build",
      /** CORPUS L305, all three cells. */
      name: same("Mission-Support Twin Build"),
      useCase: same(
        "Base, airfield-support environment, port/logistics site, sovereign data center, government operations center, depot, or industrial-support facility"
      ),
      output: same(
        "Validated Cyber Digital Twin, mission-to-infrastructure map, priority decisions, exercise-ready scenarios, evidence package"
      )
    },
    {
      id: "hybrid-resilience-exercise",
      /** CORPUS L306, all three cells. */
      name: same("Hybrid Resilience Exercise"),
      useCase: same(
        "Cyber plus utility outage, fuel/logistics disruption, telecom loss, weather event, supplier withdrawal, or physical-access incident"
      ),
      output: same(
        "Scenario playbook, decision points, minimum operating requirements, recovery sequence, gaps and investment roadmap"
      )
    },
    {
      id: "technology-sovereignty-assessment",
      /** CORPUS L307, all three cells. */
      name: same("Technology Sovereignty Assessment"),
      useCase: same(
        "High-risk components, supplier exit, cloud/remote-support reliance, firmware lifecycle, control-system modernization, or restricted-workload isolation"
      ),
      output: same(
        "Dependency/BOM analysis, replacement and compensating-control strategy, supplier-risk sequence"
      )
    },
    {
      id: "continuous-sovereign-twin-operations",
      /** CORPUS L308, all three cells. */
      name: same("Continuous Sovereign Twin Operations"),
      useCase: same(
        "Multi-site estate with evolving threat, supplier, infrastructure, operational, and geopolitical context"
      ),
      output: same(
        "Risk deltas, change testing, supply-chain monitoring, resilience reporting, exercise and investment support"
      )
    }
  ]
  /* GAP, FLAGGED NOT FILLED: neither source gives a duration, price, team shape,
     clearance requirement or prerequisite for any of the five tiers. None is
     invented here — and a clearance or accreditation prerequisite in particular
     would be a fabricated security fact, not a marketing omission. */
};

/* ── Final CTA ──────────────────────────────────────────────────────────── */

export const FINAL_CTA = {
  /** CORPUS L313. */
  h2: same("Start with one essential function and the infrastructure that makes it possible."),
  /**
   * CORPUS L314–L316, VERBATIM AND WHOLE.
   *
   * THE CLOSING ENQUIRY WARNING WAS REMOVED, 2026-08-27, OWNER DECISION. It read
   * "Do not include classified, operationally sensitive, or personally
   * identifiable information in any enquiry." An earlier review had called it
   * load-bearing; that was wrong on the business, and the owner reversed it.
   * The P&ID, single-line electrical drawing and BMS/EPMS map this very sentence
   * asks the reader to bring ARE the artifacts a Cyber Digital Twin is built
   * from — so a warning against sending technical material argued against the
   * page's own conversion. Do not reinstate it without asking. Data-handling is
   * covered where it belongs, by the contact form's GDPR privacy note.
   *
   * The first two sentences state the ask (BRIEF L53's "bring one site diagram,
   * electrical one-line, P&ID, BMS/EPMS map, dependency model, or proposed
   * change") in the CORPUS's fuller wording.
   */
  body: same(
    "Bring a site diagram, single-line electrical drawing, P&ID, BMS/EPMS architecture, dependency map, asset list, or a proposed change. OXOT will show how the Cyber Digital Twin can trace the pathway, rehearse the cascade, and support a sovereign resilience decision before the live environment is changed."
  ),
  /** CORPUS L317 = BRIEF L21 → `/contact`. */
  ctaPrimary: same("Discuss a sovereign resilience scenario"),
  ctaPrimaryHref: PATHS.contact,
  /** CORPUS L318 = BRIEF L22. Same destination note as `HERO.ctaSecondary`. */
  ctaSecondary: same("Explore the sovereign-system model"),
  ctaSecondaryHref: PATHS.cdt2
};
