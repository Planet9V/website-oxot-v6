/**
 * S08 · REGULATORY AND STANDARDS CONTEXT — copy slice for
 * `/industries/manufacturing-process-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_manu-process.md, section "Regulatory and standards context",
 * L263–L282. Every value below carries the source line it came from. Nothing is
 * invented; where the source is silent, there is a comment saying so instead of
 * a guess.
 *
 * INDEPENDENT OF S01, DELIBERATELY. `content.reality.ts` also names IEC 62443
 * and IEC 61511, but from L87 — a different sentence, cited to a different
 * source (dragos), rendered for a different purpose (that section's
 * cited-evidence panel). The two rows below are transcribed in full from L273
 * and L275, which give each instrument a scope clause and a support clause that
 * L87 does not carry. Neither file is the other's summary, and neither may be
 * trimmed on the grounds that the other "already covers" the standard.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation,
 * not a claim that this text is correct Dutch.
 */
import { same } from "../registry";

/**
 * Source L280 and L282, verbatim from the markdown link targets. Both verified
 * live (HTTP 200, no redirect) on 2026-08-26. Exported separately so each note
 * links the same URL its citation names rather than carrying a second copy.
 */
export const NIS2_EUR_LEX_URL = "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng";
export const CRA_EUR_LEX_URL = "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202402847";

/** Keys into the two `/assurance` destinations that actually exist. See
 *  Regulatory.tsx for why only two of the six rows carry one. */
export type RegulatoryHref = "iec62443" | "cra";

export const REGULATORY = {
  /** Source L263, the section's own name in the brief. */
  datumLabel: same("Regulatory and standards context"),

  /** Source L267. */
  h2: same("Build evidence from the operating model—not a separate spreadsheet universe."),

  /* THE GUARDRAIL — source L269, and the one string in this section written to
     the BUILDER rather than to the reader: "Do not frame this as a claim of
     automatic compliance or certification. Frame it as support for structured
     evidence, risk decisions, technical documentation, and control
     implementation."

     It is transposed out of the imperative into a statement OXOT makes about
     itself, because printing the instruction verbatim would address the visitor
     as the person being told how to frame the section. The transposition is
     VOICE ONLY and is falsifiable clause by clause:
       · "automatic compliance or certification"                      — L269 verbatim
       · "structured evidence, risk decisions, technical documentation,
          and control implementation"                                 — L269 verbatim
       · subject and verb "The Cyber Digital Twin … supports"         — L271, the
         source's own third column header, not a phrase invented here.
     No qualifier, scope limit or hedge is added, and none is removed: the
     rendered sentence denies exactly what L269 says to deny and claims exactly
     what L269 says to claim.

     IT RENDERS AS THE SECTION'S LEAD, NOT AS A FOOTNOTE. Regulatory copy that
     disclaims compliance below the matrix has already let the matrix be read as
     a compliance claim first. This sits under the h2 and above the table, in
     the same slot every other section on this page gives its lead. */
  lead: same(
    "OXOT does not claim automatic compliance or certification. The Cyber Digital Twin supports structured evidence, risk decisions, technical documentation, and control implementation."
  ),

  /** Names the matrix below it. Built from the source's own first column header
   *  (L271, "Framework / requirement"); the brief supplies no caption of its
   *  own, and the section has no other title for the table. */
  tableCaption: same("Frameworks and requirements"),

  /** Source L271 — the brief's own three column headers, verbatim. */
  headings: {
    framework: same("Framework / requirement"),
    relevance: same("Why it matters in manufacturing"),
    support: same("How the Cyber Digital Twin supports the work")
  },

  /* Source L273–L278, all six rows, all three cells verbatim. Framework names
     drop the markdown bold and are otherwise untouched — including the two that
     name a pair ("IEC 61511 / functional safety", "ISO 27001 / NIST CSF 2.0"),
     which are NOT split into separate rows: the source pairs them because it is
     making one point about each pair, and splitting would invent a second
     support clause out of one. */
  rows: [
    {
      /** Source L273. */
      framework: "IEC 62443",
      relevance: same(
        "Core IACS cybersecurity standard across asset-owner, integrator/service-provider, system, and component contexts; supports zoning, conduits, risk assessment, and security levels"
      ),
      support: same(
        "Models the system under consideration, network zones/conduits, pathways, relevant assets, and evidence for risk and control decisions"
      ),
      href: "iec62443" as RegulatoryHref | null
    },
    {
      /** Source L274. */
      framework: "NIST SP 800-82 Rev. 3",
      relevance: same(
        "Widely used OT/ICS security guidance, particularly relevant to US-oriented organizations and multinational programs"
      ),
      support: same(
        "Helps ground the OT asset baseline, architecture, risk prioritization, segmentation, remote access, and lifecycle improvement plan"
      ),
      href: null
    },
    {
      /** Source L275. */
      framework: "IEC 61511 / functional safety",
      relevance: same(
        "Central for process-industry safety-instrumented systems and their ability to achieve or maintain a safe process state"
      ),
      support: same(
        "Connects cybersecurity pathways to the engineered safety and process-consequence context; does not replace functional-safety lifecycle work"
      ),
      href: null
    },
    {
      /** Source L276. */
      framework: "NIS2",
      relevance: same(
        "Applies to defined medium and large EU entities in Annex I/II sectors, subject to national transposition and scope; several manufacturing categories appear in Annex II"
      ),
      support: same(
        "Supports risk-management evidence, supply-chain/dependency analysis, architecture visibility, and board-level risk reporting"
      ),
      href: null
    },
    {
      /** Source L277. */
      framework: "Cyber Resilience Act",
      relevance: same(
        "Relevant when an organization manufactures, imports, or distributes in-scope products with digital elements—not simply because it operates a factory"
      ),
      support: same(
        "Supports product/supply-chain evidence, component/BOM context, vulnerability traceability, and technical-file workflows where applicable"
      ),
      href: "cra" as RegulatoryHref | null
    },
    {
      /** Source L278. */
      framework: "ISO 27001 / NIST CSF 2.0",
      relevance: same("Governance and enterprise-risk frameworks often used alongside OT-specific methods"),
      support: same(
        "Provides an evidence-rich OT model that can feed broader risk, governance, and assurance processes"
      ),
      href: null
    }
  ],

  /* THE TWO CITED NOTES — source L280 and L282, verbatim, each keeping the link
     label the brief's author chose (`[eur-lex.europa](…)`) rather than being
     re-titled into something tidier.

     THE DATES ARE THE SOURCE'S OWN AND ARE PRINTED AS WRITTEN: 11 December 2027
     for the CRA's general application and 11 September 2026 for the Article 14
     vulnerability-reporting obligations. Neither is rounded, reformatted or
     relativised ("next year", "already in force") — a regulatory date on a page
     a buyer may act on is an engineering fact, not copy.

     NOTHING IS ADDED ABOUT SCOPE. Both notes already say applicability depends
     on the entity — thresholds, national implementation and Member State
     designation for NIS2; whether covered products are placed on the EU market
     for the CRA — and no reader is told here whether they are in scope. */
  notes: [
    {
      /** Source L280. */
      text: same(
        "NIS2 applies to qualifying medium and large entities in Annex I and II, and Annex II includes defined manufacturing categories such as medical devices, electronics, electrical equipment, machinery, motor vehicles, and other transport equipment; chemical manufacturing and food industrial processing appear separately in Annex II. The exact applicability depends on the entity, thresholds, national implementation, and any Member State designation."
      ),
      sourceLabel: same("eur-lex.europa"),
      href: NIS2_EUR_LEX_URL
    },
    {
      /** Source L282. */
      text: same(
        "The CRA is a directly applicable EU regulation that generally applies from 11 December 2027, with some provisions—including vulnerability-reporting obligations in Article 14—applying earlier, from 11 September 2026. Its relevance depends on whether the organization places covered products with digital elements on the EU market."
      ),
      sourceLabel: same("eur-lex.europa"),
      href: CRA_EUR_LEX_URL
    }
  ]

  /* GAP, FLAGGED NOT FILLED: the source ranks nothing here. The six rows carry
     no priority, no applicability score and no "start here" marker, and they
     render in source order with no ordinal, because an ordering printed on a
     regulatory matrix reads as advice about which obligation to meet first. */
};
