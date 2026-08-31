/**
 * REGULATORY AND ASSURANCE CONTEXT — CORPUS L283–L299, verbatim.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * `intro` IS A GUARDRAIL, NOT A PREAMBLE, AND IT GOVERNS HOW THE WHOLE MATRIX
 * MUST BE READ. It states plainly that OXOT does NOT claim NIS2, IEC 62443, or
 * any civilian framework automatically applies to military systems, or
 * substitutes for national-security controls. Every row below is qualified by
 * it. A renderer that prints the nine rows above the fold and defers the intro
 * — or drops it as throat-clearing — turns a carefully hedged reference table
 * into nine implied compliance claims about defense systems. Render it at body
 * size, above the matrix, always.
 *
 * NOTE HOW HEDGED THE ROWS THEMSELVES ARE, and preserve it exactly: "may
 * apply", "typically operate under", "scope determined by national
 * implementation", "exemptions/scopes must be assessed legally", "often
 * relevant". Not one row says a framework does apply. Tightening any of that
 * language into something more confident would be inventing a legal position,
 * which is the most consequential class of error available in this file.
 *
 * HREFS ARE A ROUTING DECISION, NOT COPY — see the comment on `rows`.
 *
 * BRIEF L52 summarises this section in one line ("Support for national
 * security/accreditation processes, NATO resilience, IEC 62443, relevant
 * NIS2/CER contexts, and supply-chain/technology-sovereignty decisions"). The
 * CORPUS's nine rows are the finished copy.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";

export const REGULATORY = {
  /** CORPUS L284. */
  h2: same("Support assurance without reducing sovereignty to a checkbox."),
  /** CORPUS L285–L287. Mandatory on render — see this file's docblock. */
  intro: same(
    "Most national-defense organizations operate separate security, classification, procurement, export-control, safety, and assurance regimes. OXOT does not claim that NIS2, IEC 62443, or any civilian framework automatically applies to military systems, or substitutes for national-security controls. OXOT provides an evidence model that can support the organization's applicable national security, defense assurance, OT-security, resilience, supplier-security, and continuity requirements."
  ),
  /* The CORPUS's own three column headers, as the live page renders them (its
     DefenseRegulatory.tsx table head). Carried as data rather than hardcoded in
     a component so the NL pass has one place to translate. */
  frameworkLabel: same("Framework / context"),
  relevanceLabel: same("Relevance"),
  supportLabel: same("How OXOT supports the work"),
  /**
   * CORPUS L288–L298, all nine rows, all three cells each, in source order.
   *
   * HREFS, AND WHY THEY DIFFER FROM THE CORPUS'S. The CORPUS carries an opaque
   * token — `href: "assurance" as const` — on two rows, which its renderer maps
   * to `/assurance` (EN) or `/consulting` (NL). Since that was written, five
   * standalone framework pages have shipped (nav.ts: assuranceIec62443,
   * assuranceCra, assuranceTs50701, assuranceIec62278,
   * assuranceEvidenceProvenance), and two of them are the exact frameworks two
   * of these rows name. So the rows carry REAL paths here instead of a token:
   *   · IEC 62443            → /assurance/iec-62443            (bilingual)
   *   · Cyber Resilience Act → /assurance/cyber-resilience-act (bilingual)
   *   · NIS2                 → /assurance                      (EN-ONLY)
   * `/assurance` itself is English-only on this site — every page linking to it
   * gates the link (`locale === "en" ? PATHS.assurance : PATHS.consulting`).
   * `englishOnly` states that requirement in data so a renderer cannot ship an
   * `nl` link into an EN-only page by omission.
   * No row gains a link the CORPUS did not justify by naming its framework, and
   * no row's COPY comes from anywhere but its own CORPUS line.
   *
   * `id` is DOM identity, not copy.
   */
  rows: [
    {
      id: "national-defense",
      /** CORPUS L289, all three cells. */
      framework: same("National-defense security requirements"),
      relevance: same(
        "Defense organizations typically operate under national classification, security-accreditation, operational-security, procurement, and assurance regimes."
      ),
      support: same(
        "Supports controlled, source-traceable infrastructure, dependency, access-path, and recovery evidence; deployment must align to the organization's security authority."
      )
    },
    {
      id: "nato-cyber-defense",
      /** CORPUS L290, all three cells. */
      framework: same("NATO cyber defense and resilience"),
      relevance: same(
        "NATO emphasizes cyber resilience, freedom of action in cyberspace, protection of networks, interoperability, and national resilience."
      ),
      support: same(
        "Supports cross-domain dependencies, resilience scenarios, operational continuity, risk prioritization, and exercise planning."
      )
    },
    {
      id: "nato-public-private",
      /** CORPUS L291, all three cells. */
      framework: same("NATO public-private resilience guidance"),
      relevance: same(
        "Encourages whole-of-government coordination, critical-supplier visibility, civil-military collaboration, cross-sector dependency analysis, continuity and crisis exercises."
      ),
      support: same(
        "Models dependencies among government, military, utilities, telecoms, logistics, suppliers, and civilian services."
      )
    },
    {
      id: "nis2",
      /** CORPUS L292, all three cells. */
      framework: same("NIS2 and national implementation"),
      relevance: same(
        "May apply to government-linked entities, digital infrastructure providers, civil critical-infrastructure operators, and suppliers; national-security exclusions and national law matter."
      ),
      support: same(
        "Supports risk-management, asset, supply-chain, continuity, access-control, incident, and governance evidence where applicable."
      ),
      href: PATHS.assurance,
      /** `/assurance` is EN-only. NL must fall back rather than 404. */
      englishOnly: true
    },
    {
      id: "cer-directive",
      /** CORPUS L293, all three cells. */
      framework: same("CER Directive and national resilience regimes"),
      relevance: same(
        "Focuses on critical-entity resilience against natural and human-made risks, with security/national-defense scope determined by national implementation."
      ),
      support: same(
        "Supports cross-sector consequence and dependency mapping, resilience scenarios, and continuity planning."
      )
    },
    {
      id: "iec-62443",
      /** CORPUS L294, all three cells. */
      framework: same("IEC 62443"),
      relevance: same(
        "Useful technical basis for OT, IACS, BMS/EPMS, utilities, industrial facilities, and supplier/system lifecycle practices."
      ),
      support: same(
        "Supports zones/conduits, system modeling, risk analysis, control evidence, and cyber change decisions."
      ),
      href: PATHS.assuranceIec62443
    },
    {
      id: "nist-800-82",
      /** CORPUS L295, all three cells. */
      framework: same("NIST SP 800-82 / NIST CSF"),
      relevance: same(
        "Often relevant for government/defense-adjacent OT programs, especially in US-aligned contexts."
      ),
      support: same(
        "Supplies OT-specific system, dependency, and risk evidence that can feed broader cybersecurity governance."
      )
    },
    {
      id: "supply-chain-sovereignty-policy",
      /** CORPUS L296, all three cells. */
      framework: same("Supply-chain and technology-sovereignty policy"),
      relevance: same(
        "Increasingly central to procurement, high-risk supplier management, secure-by-design requirements, and sustaining capability through crisis."
      ),
      support: same(
        "Maps vendor concentration, BOMs, certificate/firmware dependencies, spares, support routes, migration options, and mission consequence."
      )
    },
    {
      id: "cyber-resilience-act",
      /** CORPUS L297, all three cells. */
      framework: same("Cyber Resilience Act"),
      relevance: same(
        "Relevant primarily to covered products with digital elements placed on the EU market; not a substitute for defense accreditation, and exemptions/scopes must be assessed legally."
      ),
      support: same(
        "Supports product and component evidence, BOM traceability, vulnerability/change context, and technical-documentation workflows where applicable."
      ),
      href: PATHS.assuranceCra
    }
  ]
  /* GAP, FLAGGED NOT FILLED: no source names a clause, a security level, a
     conformity route, or an applicability determination for any of the nine.
     None is invented — a fabricated applicability statement here would be a
     legal claim, not a content gap. The rows say what each framework is about
     and what evidence OXOT can supply, and stop there, exactly as sourced. */
};
