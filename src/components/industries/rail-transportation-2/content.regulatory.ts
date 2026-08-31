/**
 * S11 · REGULATORY AND STANDARDS CONTEXT — copy slice for
 * `/industries/rail-transportation-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md, section "Regulatory and standards context",
 * L363–L384. Every value below carries the source line it came from. Nothing is
 * invented.
 *
 * L369 IS PAGE COPY, NOT A NOTE TO THE BUILDER — BOTH SENTENCES. The source
 * writes the first sentence as a directive to whoever writes the section ("Do
 * not state that…"); the second is already in OXOT's own third-person voice and
 * needs nothing done to it. Rendering sentence one at a visitor as an imperative
 * would be incoherent, so its subject is transposed and NOTHING else changes —
 * no noun added, dropped, hedged or softened. This is the same transposition
 * `energy-utilities-2/content.regulatory.ts` makes for its own L265 guardrail:
 *   L369 "Do not state that the Cyber Digital Twin automatically certifies a
 *        railway or guarantees regulatory compliance."
 *        → "The Cyber Digital Twin does not automatically certify a railway or
 *           guarantee regulatory compliance."
 *   L369 "It supports asset and dependency visibility, risk assessment,
 *        scenario testing, evidence traceability, change decisions, and
 *        documentation workflows."
 *        → carried verbatim; "It" still resolves to the Twin named in the
 *           sentence before it.
 * It is the section LEAD — the first prose under the h2, above the caption and
 * above the matrix — because a matrix of eight named frameworks is exactly the
 * layout from which a reader infers "they certify you against these", and the
 * guardrail has to arrive before the table rather than as small print under it.
 * A reader who reads only the headline and the first paragraph still meets it.
 *
 * EIGHT ROWS, FOUR COLUMNS. `Rule.tsx`'s H-C docblock describes this matrix as
 * "seven-framework" while citing L371–L380; L371 is the header row and
 * L373–L380 is eight framework rows. The source is authoritative over the
 * docblock's count, so the table has eight rows and the caption says eight. The
 * miscount is left in Rule.tsx rather than corrected here — that file belongs to
 * another builder.
 *
 * NIS2 RENDERS UNLINKED, on `content.ts`'s own instruction. Its LINKS docblock
 * records that the brief suggests `/assurance/nis2` (L478) but nav.ts has no
 * NIS2 key, and states that whoever builds this section should render that row
 * unlinked rather than invent a target or emit a dead href. Honoured: `href` is
 * absent on that row, as it is on every row with no verified destination.
 *
 * CLAIM RULE IN FORCE: OXOT_Visual_Foundation_Spec.md L401 — no percentages,
 * money values, annual-loss figures, or "verified"/certification language. This
 * section is where that rule bites hardest, since it is the one place the page
 * discusses regulation directly. Nothing below carries a numeric figure except
 * the source's own standard designations (50701:2023, 62443, 800-82, CSF 2.0,
 * EN 50126/50128/50129) and the year of the TSA measures at L384, all of which
 * are the names of instruments rather than claims about outcomes.
 *
 * BOTH URLS ARE THE BRIEF'S OWN LINK TARGETS and both source labels are the
 * brief's own visible link text (`[ictsecuritymagazine](…)`, `[tsa](…)`) rather
 * than re-titled into something tidier. Both were verified live (HTTP 200, no
 * redirect) on 2026-08-26.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation, not
 * a claim that this text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { LINKS } from "./content";

/** Source L382, verbatim from the markdown link target. */
export const TS_50701_ARTICLE_URL = "https://www.ictsecuritymagazine.com/articoli/ertms/";

/** Source L384, verbatim from the markdown link target. */
export const TSA_DIRECTIVE_URL =
  "https://www.tsa.gov/news/press/releases/2022/10/18/tsa-issues-new-cybersecurity-requirements-for-passenger-and-freight";

export interface RegulatoryRow {
  /** Source column 1 — the framework or obligation. */
  framework: Bilingual;
  /** Source column 2 — passenger transit and European rail. */
  passenger: Bilingual;
  /** Source column 3 — US freight rail. */
  freight: Bilingual;
  /** Source column 4 — how OXOT supports the work. */
  support: Bilingual;
  /** A verified route from `content.ts`'s LINKS map, or absent. Absent means
   *  this site has no page for the framework — never a dead or invented href. */
  href?: string;
}

export const REGULATORY = {
  /** Source L363, the section's own name in the brief. */
  datumLabel: same("Regulatory and standards context"),

  /** Source L367. */
  h2: same("Build cyber evidence alongside safety, RAMS, and operational assurance."),

  /** Source L369, both sentences — see this file's header for the exact
   *  before/after on the first one. */
  guardrail: same(
    "The Cyber Digital Twin does not automatically certify a railway or guarantee regulatory compliance. It supports asset and dependency visibility, risk assessment, scenario testing, evidence traceability, change decisions, and documentation workflows."
  ),

  /* Names the matrix and what its columns mean, which the lead above it does
     not: the two middle columns are the same framework read twice, in two
     operating contexts. The count is a fact about the table (L373–L380). */
  caption: same(
    "Eight frameworks and obligations — each read twice, once for passenger transit and European rail and once for US freight rail, alongside what the Twin contributes to the work."
  ),

  /** Source L371, verbatim. */
  head: [
    same("Framework / obligation"),
    same("Passenger transit and European rail"),
    same("US freight rail"),
    same("How OXOT supports the work")
  ],

  /* Source L373–L380 — all eight rows, all four cells, verbatim. The source's
     own em dash inside row 6's fourth cell ("consequence—not a substitute") is
     kept as written. */
  rows: [
    {
      /** Source L373. */
      framework: same("CLC/TS 50701:2023"),
      passenger: same(
        "Rail-specific cybersecurity technical specification, aligned to railway lifecycle and safety/RAMS realities"
      ),
      freight: same("Useful reference for multinationals or rail suppliers, but not a US mandate"),
      support: same(
        "Maps systems, assets, zones/conduits, cyber pathways, risk decisions, and traceable evidence"
      ),
      href: LINKS.ts50701
    },
    {
      /** Source L374. */
      framework: same("IEC 62443"),
      passenger: same(
        "Applicable IACS cybersecurity principles for signaling-adjacent OT, station systems, traction power, depots, and other industrial control environments"
      ),
      freight: same(
        "Useful for segmentation, access control, risk assessment, and system lifecycle engineering across rail OT"
      ),
      support: same("Supports zones, conduits, target controls, reachability modeling, and evidence outputs"),
      href: LINKS.iec62443
    },
    {
      /** Source L375. Unlinked — see this file's header. */
      framework: same("NIS2"),
      passenger: same(
        "Rail infrastructure managers and railway undertakings are named in Annex I; scope, enforcement, and national implementation still matter"
      ),
      freight: same("Not applicable as a US regulatory obligation"),
      support: same(
        "Supports risk management, supply-chain view, incident/resilience evidence, and governance reporting"
      )
    },
    {
      /** Source L376. */
      framework: same("CER Directive"),
      passenger: same(
        "Relevant to resilience of designated critical entities, including rail, across natural and human-made risk"
      ),
      freight: same("Not applicable as an EU directive"),
      support: same(
        "Models cyber, power, telecoms, vendor, weather, physical-access, and recovery dependencies"
      )
    },
    {
      /** Source L377. */
      framework: same("TSA rail cybersecurity directives"),
      passenger: same("Not applicable outside covered US operations"),
      freight: same(
        "Covered passenger and freight carriers have requirements addressing incident reporting, response planning, vulnerability assessment, segmentation, access controls, monitoring, risk-based patching, and recurring testing/assessment"
      ),
      support: same(
        "Supports implementation-plan evidence, asset/dependency views, assessment scenarios, control validation, and incident/recovery exercises"
      )
    },
    {
      /** Source L378. */
      framework: same("FRA PTC regulations and safety oversight"),
      passenger: same("Not directly applicable"),
      freight: same(
        "PTC systems and changes are subject to FRA safety oversight; cyber actions must be compatible with certified/approved PTC safety and operational requirements"
      ),
      support: same(
        "Connects proposed cyber changes to PTC architecture, field assets, operating procedures, and consequence—not a substitute for FRA approvals"
      )
    },
    {
      /** Source L379. */
      framework: same("NIST SP 800-82 / NIST CSF 2.0"),
      passenger: same("Often useful as supporting OT security/governance references"),
      freight: same("Commonly used US OT-security guidance"),
      support: same("Supplies rail-specific evidence for broader program and governance frameworks")
    },
    {
      /** Source L380. */
      framework: same("Safety and RAMS standards"),
      passenger: same(
        "EN 50126 / EN 50128 / EN 50129 and associated safety assurance remain central; cyber changes must be evaluated in safety context"
      ),
      freight: same(
        "FRA regulations, railroad safety processes, PTC certification, and operating rules govern key safety outcomes"
      ),
      support: same(
        "Makes cyber-pathway decisions understandable alongside existing safety/RAMS and operating evidence"
      )
    }
  ] as readonly RegulatoryRow[],

  /* The section's two cited closing paragraphs. Each is labelled with what it
     speaks about rather than with a jurisdiction, taken from the source's own
     opening clauses ("CLC/TS 50701 is…", "For the United States…"). Labelling
     the first one "European Union" would over-assert: the matrix's own row 1
     records TS 50701 as a useful reference for US multinationals and suppliers
     too, so it is not an EU-only note. */
  notes: [
    {
      /** Source L382, verbatim, less its trailing citation marker. */
      subject: same("CLC/TS 50701"),
      body: same(
        "CLC/TS 50701 is a railway-focused cybersecurity specification built around railway lifecycles and concepts such as zones, conduits, security levels, risk assessment, vulnerability management, and links to IEC 62443. It remains a technical specification rather than a blanket claim that every operator is automatically certified by using it."
      ),
      sourceLabel: same("ictsecuritymagazine"),
      href: TS_50701_ARTICLE_URL
    },
    {
      /** Source L384, verbatim, less its trailing citation marker. The same
       *  citation also appears at L345 inside the freight worked example, which
       *  is a different builder's section; it is transcribed here from the
       *  source independently rather than imported across a section boundary. */
      subject: same("United States"),
      body: same(
        "For the United States, TSA’s directives explicitly cover designated passenger and freight railroad carriers; the 2022 measures require segmentation between IT and OT, access controls, monitoring/detection, risk-based patching, a TSA-approved cybersecurity implementation plan, and a recurring assessment program."
      ),
      sourceLabel: same("tsa"),
      href: TSA_DIRECTIVE_URL
    }
  ]
} as const;
