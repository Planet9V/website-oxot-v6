/**
 * S12 · REGULATORY, ASSURANCE AND SUSTAINABILITY CONTEXT — copy slice for
 * `/industries/hyperscale-data-centers-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, section "Regulatory and assurance context",
 * L452–L473. Every value below carries the source line it came from. Nothing is
 * invented. The live page at `/industries/hyperscale-data-centers` was neither
 * read nor referenced.
 *
 * THE SECTION NAME IS L546'S, NOT L452'S, AND THE DIFFERENCE IS DELIBERATE. The
 * source names this section twice and not identically: its own `##` heading at
 * L452 is "Regulatory and assurance context", while the page-structure list at
 * L546 — the brief's own outline of this page — calls it "Regulatory,
 * assurance, and sustainability context". Both are source; the longer one is
 * used because sustainability is not incidental here. Two of the eight rows
 * (L464, L465) are purely energy/water reporting obligations, one of the two
 * cited notes (L471) is entirely about the data-centre reporting database, and
 * the section headline at L456 names sustainability reporting outright. Dropping
 * the word would leave a third of the section unnamed by its own label.
 *
 * L458 IS PAGE COPY, NOT A NOTE TO THE BUILDER — BOTH SENTENCES. The source
 * writes the first as a directive to whoever writes the section ("Do not
 * promise…"); the second is already in OXOT's own third-person voice and needs
 * nothing done to it. Rendering sentence one at a visitor as an imperative would
 * be incoherent, so its subject is transposed and NOTHING else changes — no noun
 * added, dropped, hedged or softened. This is the same transposition
 * `energy-utilities-2` and `rail-transportation-2` each make for their own
 * guardrail line:
 *   L458 "Do not promise automatic regulatory compliance, certification, or
 *        assurance outcomes."
 *        → "OXOT does not promise automatic regulatory compliance,
 *           certification, or assurance outcomes."
 *   L458 "The Twin supports traceable risk management, control decisions,
 *        system/dependency evidence, scenario testing, supply-chain analysis,
 *        and technical documentation."
 *        → carried verbatim.
 * It is the section LEAD — the first prose under the h2, above the caption and
 * above the matrix — because a matrix of eight named instruments is exactly the
 * layout from which a reader infers "they get us these", and the guardrail has
 * to arrive before the table rather than as small print under it. A reader who
 * reads only the headline and the first paragraph still meets it.
 *
 * TWO ROWS LINK OUT, SIX DO NOT, AND THE ASYMMETRY IS THE POINT. `content.ts`'s
 * LINKS map is this page's only sanctioned source of internal hrefs, and it
 * resolves exactly two of these eight instruments: IEC 62443 to its own
 * assurance page, and NIS2 to the `/assurance` index per gap resolution G5
 * (nav.ts has no NIS2 route; that substitution is recorded in LINKS' own
 * docblock and is a ROUTING decision only — nothing here claims `/assurance` is
 * a NIS2 page). The remaining six have no page on this site. Two of them —
 * ISO 27001 / NIST CSF 2.0 and the sovereign/defense row — have plausible-
 * looking neighbours in LINKS (`assurance`, `deploymentSovereignty`) and are
 * still left unlinked: pointing a regulatory row at a deployment page would
 * assert that the page answers that obligation, which is a claim the source
 * does not make and which the guardrail above forbids.
 *
 * `englishOnly` IS SCOPED TO THE NIS2 ROW ALONE. `content.ts` exports
 * `ASSURANCE_IS_ENGLISH_ONLY` because `src/app/[locale]/assurance/page.tsx`
 * calls `notFound()` for any locale but `en`, so an ungated `/assurance` href
 * would 404 a Dutch visitor. That is true of the `/assurance` INDEX only. The
 * five framework pages beneath it — `PATHS.assuranceIec62443` among them —
 * render both locales, so the IEC 62443 row carries no flag and must not be
 * gated. Over-applying the gate would send Dutch readers away from a page that
 * works for them.
 *
 * CLAIM RULE IN FORCE: OXOT_Visual_Foundation_Spec.md L401 — no percentages,
 * money values, annual-loss figures, or "verified"/certification language. This
 * section is where that rule bites hardest, since it is the one place the page
 * discusses regulation directly. The only numerals below are the source's own
 * instrument designations (2024/2690, 2024/1364, 62443, 27001, 22301, CSF 2.0)
 * and the 500 kW reporting threshold, which appears at L464 and again at L471
 * and is carried in the source's own framing both times — a statutory scope
 * boundary stated about operators, never an OXOT claim about outcomes.
 *
 * BOTH URLS ARE THE BRIEF'S OWN LINK TARGETS and both source labels are the
 * brief's own visible link text (`[energy.ec.europa](…)`, `[enisa.europa](…)`)
 * rather than re-titled into something tidier. Both were verified live (HTTP
 * 200) on 2026-08-26; the Commission one resolves through a redirect to the
 * document store, which is expected for that host.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation, not
 * a claim that this text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { LINKS } from "./content";

/** Source L471, verbatim from the markdown link target. */
export const EU_DATA_CENTRE_DATABASE_FAQ_URL =
  "https://energy.ec.europa.eu/document/download/2597a32b-c791-4d87-a9da-57b64a3c4d7d_en?filename=2026_07_03%20FAQ%20on%20European%20database%20on%20data%20centres%201v7-AA(1).pdf&prefLang=lt";

/** Source L473, verbatim from the markdown link target. */
export const ENISA_NIS2_URL =
  "https://www.enisa.europa.eu/topics/state-of-cybersecurity-in-the-eu/cybersecurity-policies/nis-directive-2";

export interface RegulatoryRow {
  /** Source column 1 — the framework or requirement. */
  framework: Bilingual;
  /** Source column 2 — why it reaches a hyperscale operator. */
  relevance: Bilingual;
  /** Source column 3 — what the Cyber Digital Twin contributes to the work. */
  support: Bilingual;
  /** A verified route from `content.ts`'s LINKS map, or absent. Absent means
   *  this site has no page for the instrument — never a dead or invented href. */
  href?: string;
  /** Set only where `href` resolves to the `/assurance` INDEX, which 404s
   *  outside `en`. See this file's header; do not set it on any other row. */
  englishOnly?: true;
}

export const REGULATORY = {
  /** Short mono-label, NOT L546's full section name — `Datum`'s label span is
   *  `shrink-0` and does not wrap, so the full six-word name overflowed the
   *  section's own width at 390px (caught by `measure.mjs`'s overflow check).
   *  Every sibling section's `datumLabel` is similarly short (e.g.
   *  "Product capabilities", "Case studies"); the FULL name still governs the
   *  h2 (`REGULATORY.h2` below) and the choice of which source heading to use
   *  there is unaffected — see this file's header for that reasoning. */
  datumLabel: same("Regulatory & assurance"),

  /** Source L456. */
  h2: same(
    "Build one evidence model for cyber resilience, operational assurance, and sustainability reporting."
  ),

  /** Source L458, both sentences — see this file's header for the exact
   *  before/after on the first one. */
  guardrail: same(
    "OXOT does not promise automatic regulatory compliance, certification, or assurance outcomes. The Twin supports traceable risk management, control decisions, system/dependency evidence, scenario testing, supply-chain analysis, and technical documentation."
  ),

  /* Names the matrix and what its three columns mean, which the lead above it
     does not: each row is one instrument, why it reaches a hyperscale operator,
     and what the Twin contributes — three different kinds of statement, only the
     third of which is about OXOT. The count is a fact about the table
     (L462–L469). */
  caption: same(
    "Eight frameworks and requirements — what each one means for a hyperscale operator, and what the Cyber Digital Twin contributes to the work."
  ),

  /** Source L460, verbatim. */
  head: [
    same("Framework / requirement"),
    same("Hyperscale relevance"),
    same("How the Cyber Digital Twin supports the work")
  ],

  /* Source L462–L469 — all eight rows, all three cells, verbatim. The source's
     own em dash inside row 8's third cell ("recovery options—subject to") and
     its curly apostrophe in "operator’s" are kept exactly as written. */
  rows: [
    {
      /** Source L462. */
      framework: same("NIS2"),
      relevance: same(
        "Data-centre service providers are in scope; applicable entities must implement cyber risk-management measures and incident handling under the Directive and, for specified digital-infrastructure entities, the Implementing Regulation"
      ),
      support: same(
        "Supports asset management, risk assessment, access-path modeling, business continuity/crisis scenarios, supply-chain evidence, incident impact analysis, and governance reporting"
      ),
      href: LINKS.assurance,
      englishOnly: true
    },
    {
      /** Source L463. */
      framework: same("Commission Implementing Regulation (EU) 2024/2690"),
      relevance: same(
        "Specifies technical and methodological requirements and significant-incident criteria for data-centre service providers and other named digital-infrastructure entities"
      ),
      support: same(
        "Produces facility/OT dependency evidence that can feed policies, risk treatment, access control, asset management, continuity, incident and supplier-security workflows"
      )
    },
    {
      /** Source L464. The 500 kW figure is the source's own statutory scope
       *  boundary, stated about operators — not an OXOT claim. */
      framework: same("EU Energy Efficiency Directive"),
      relevance: same(
        "Operators of sites with installed IT power demand of 500 kW or more must annually report specified energy-performance information"
      ),
      support: same(
        "Connects meters, power/cooling assets, water data, controls, site boundaries, and calculation provenance to reporting workflows"
      )
    },
    {
      /** Source L465. */
      framework: same("Commission Delegated Regulation (EU) 2024/1364"),
      relevance: same(
        "Establishes harmonized reporting elements and the first phase of an EU data-center rating scheme"
      ),
      support: same(
        "Supports traceability for energy, IT load, cooling, water, heat-reuse, renewables, capacity, and related evidence inputs"
      )
    },
    {
      /** Source L466. Links to its own assurance page, which renders in both
       *  locales and therefore takes no `englishOnly` flag. */
      framework: same("IEC 62443"),
      relevance: same(
        "Relevant to BMS, EPMS, electrical and mechanical control environments, industrial network segmentation, and lifecycle security for IACS components/systems"
      ),
      support: same(
        "Supports system boundaries, zones/conduits, control-path visibility, risk analysis, technical evidence, and change decisions"
      ),
      href: LINKS.iec62443
    },
    {
      /** Source L467. */
      framework: same("ISO 27001 / NIST CSF 2.0"),
      relevance: same(
        "Common enterprise governance frameworks for cloud and data-center organizations"
      ),
      support: same(
        "Provides the facility/OT component of wider risk, asset, supplier, incident, and continuity programs"
      )
    },
    {
      /** Source L468. */
      framework: same("ISO 22301 / operational-resilience programs"),
      relevance: same(
        "Supports business-continuity, recovery, and customer-commitment planning"
      ),
      support: same(
        "Models dependencies, recovery sequence, external constraints, and consequences of simultaneous failures"
      )
    },
    {
      /** Source L469. */
      framework: same("Customer / sovereign / defense requirements"),
      relevance: same(
        "May impose heightened access, residency, supply-chain provenance, auditing, separation, and continuity obligations"
      ),
      support: same(
        "Helps document isolation boundaries, access routes, supplier dependencies, data/control flows, and recovery options—subject to the operator’s applicable requirements"
      )
    }
  ] as readonly RegulatoryRow[],

  /* THE TWO CITED NOTES SIT BELOW THE TABLE, NOT INSIDE IT. L471 is the EU
     reporting database; L473 is ENISA on NIS2 scope. Folding them into the EED
     and NIS2 rows would give two of eight rows a citation the other six lack,
     implying the rest are unsourced, and would bury a paragraph of prose inside
     an already-dense matrix cell. They are a paired closing block instead, each
     label naming which body is speaking. */
  notes: [
    {
      /** Source L471, verbatim, less its trailing citation marker. The 500 kW
       *  threshold recurs here in the source's own framing, as at L464. */
      subject: same("European Commission"),
      body: same(
        "The EU’s data-centre reporting framework requires operators of sites with installed IT power demand of at least 500 kW to report annual information and specified KPIs to the European database; the Commission identifies energy use, water footprint, and sustainability metrics among the transparency objectives."
      ),
      sourceLabel: same("energy.ec.europa"),
      href: EU_DATA_CENTRE_DATABASE_FAQ_URL
    },
    {
      /** Source L473, verbatim, less its trailing citation marker. */
      subject: same("ENISA"),
      body: same(
        "ENISA’s NIS2 material identifies data-centre service providers as in scope and highlights requirements spanning risk management, incident handling, business continuity and crisis management, supply-chain security, access control, asset management, and environmental/physical security."
      ),
      sourceLabel: same("enisa.europa"),
      href: ENISA_NIS2_URL
    }
  ]
} as const;
