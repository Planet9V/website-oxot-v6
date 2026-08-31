/**
 * S06 · DEPENDENCY MAP, COMMERCIAL AND MISSION HALF — source L249–L284 of
 * new_material_source/1_website_layout_v4/3_industries/industry_hyperscale.md.
 *
 * THE SECOND HALF OF ONE SECTION, NOT A SECTION OF ITS OWN. `content.dependency.ts`
 * holds the section frame, the topology (L201–L213) and the three external-
 * infrastructure records; this file holds the three records about who and what
 * the campus is committed to — Commercial (L249–L258), Defense and sovereign
 * (L260–L271), and Manufacturing and supply chain (L273–L284). The seam is the
 * brief's own divide between the services a campus draws on and the obligations
 * it carries; the split exists because this repository caps a file at 500 lines.
 *
 * THE IMPORT RUNS ONE WAY. `RECORD_IDS` and the `DependencyRecord` type are
 * declared in `content.dependency.ts` and imported here. This file exports no id
 * of its own and imports nothing back, so the two modules cannot form a cycle.
 *
 * THE DEFENSE RECORD CARRIES A CLAIM BOUNDARY, AND IT IS THE MOST CONSTRAINED
 * MATERIAL ON THIS PAGE. L262 is an instruction to whoever writes this record,
 * not copy for a visitor: "Do not market this as an intelligence or classified-
 * system tool unless OXOT has authority to do so. Instead state:" — and what
 * follows the colon at L264 is the brief's OWN APPROVED WORDING, supplied
 * precisely because the unbounded version of the claim is not permitted. So L264
 * is transcribed verbatim and rendered as a real, visible quotation at the head
 * of the record, and L262 is carried below as `CLAIM_BOUNDARY`, never printed.
 * Paraphrasing L264, softening it, or burying it under the record's list would
 * put the record back outside the boundary the brief drew — the wording IS the
 * permission.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401): not one numeric
 * figure, percentage, money value, annual-loss figure, "verified" wording or
 * certification claim appears in this file. L458's page-wide instruction applies
 * here too — nothing below promises a compliance, certification or assurance
 * outcome, and the sovereign/residency material at L268–L271 is transcribed as
 * the source's list of scenarios the Twin can help MODEL, not as a guarantee.
 *
 * `Bilingual` via `same()` (../registry): `nl` renders as English pending the
 * translation pass.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "../registry";
import { RECORD_IDS, type DependencyRecord } from "./content.dependency";

/**
 * NOT VISITOR COPY — A CLAIM BOUNDARY, source L262, transcribed as the standing
 * instruction it is. It must never be printed on the page. It is held in data
 * rather than left in a comment so that a later editor changing this record has
 * to read the constraint the record was written under, and so a review can check
 * the rendered record against it. `content.ts` states the same boundary at page
 * level; this is its point of application.
 */
export const CLAIM_BOUNDARY = same(
  "Do not market this as an intelligence or classified-system tool unless OXOT has authority to do so."
);

/* ── Record 4 · Commercial (source L249–L258) ───────────────────────────── */

/**
 * Six items, L253–L258, verbatim and in the source's own order.
 *
 * THE LIST IS OF CONSEQUENCES, NOT OF PROMISES, and L251's lead is what makes
 * that plain — the Twin "should connect physical-facility events to
 * customer/business consequences". Each item names something that can happen to
 * a business when a facility event lands. Not one carries a figure: the source
 * attaches no percentage, credit value or duration to any of them, and none is
 * added. "SLA credits and contract escalation" (L255) is the source's own phrase
 * and stays a category, never a quantity.
 */
const COMMERCIAL: DependencyRecord = {
  id: RECORD_IDS.commercial,
  /** Source L249. */
  heading: same("Commercial dependency"),
  /** Source L251. */
  lead: same(
    "The digital twin should connect physical-facility events to customer/business consequences:"
  ),
  items: [
    /** Source L253. */
    same("Availability-zone capacity loss."),
    /** Source L254. */
    same("Inability to place new customer load or AI/GPU clusters."),
    /** Source L255. */
    same("SLA credits and contract escalation."),
    /** Source L256. */
    same("Service-provider dependency and tenant concentration."),
    /** Source L257. */
    same("Financial-services, telecom, healthcare, SaaS, or public-sector critical workloads."),
    /** Source L258. */
    same("Customer notification, incident communications, and recovery priorities.")
  ]
};

/* ── Record 5 · Defense and sovereign (source L260–L271) ────────────────── */

/**
 * THE ONLY RECORD ON THIS PAGE WHOSE CENTRAL SENTENCE IS SUPPLIED RATHER THAN
 * TRANSCRIBED FROM PROSE. L262 forbids the unbounded claim and then writes the
 * permitted one out in full at L264. That sentence is therefore not a pull quote
 * chosen for emphasis — it is the record's own statement of what may be said,
 * and it is rendered as a real quotation so it reads as the bounded, quoted
 * claim it is rather than dissolving into surrounding page voice.
 *
 * NOTE WHAT L264 ACTUALLY CLAIMS: the Twin "can help model" isolation
 * boundaries, residency constraints, shared-facility dependencies, privileged-
 * access paths, support-vendor exposure and recovery priorities. It does not
 * claim to enforce, certify, guarantee or clear any of them. The verb is kept.
 *
 * `lead` IS DELIBERATELY ABSENT AND `listLead` USED INSTEAD. The four scenarios
 * at L268–L271 are introduced by L266, "Relevant scenarios include:", which the
 * source places AFTER the quoted statement, not before it. Rendering order
 * follows the source: quotation, then that line, then the four scenarios.
 *
 * Four items, L268–L271, verbatim and in the source's own order.
 */
const DEFENSE: DependencyRecord = {
  id: RECORD_IDS.defense,
  /** Source L260. */
  heading: same("Defense and sovereign dependency"),
  /** Source L264 — the brief's own approved wording. Verbatim, and rendered
   *  visibly as a real `<blockquote>` at the head of this record. See the
   *  claim-boundary note in this file's head comment before editing this
   *  string: it may not be paraphrased, shortened or softened. */
  quote: same(
    "For operators supporting sovereign, defense, public-safety, or other regulated workloads, the Twin can help model isolation boundaries, residency constraints, shared-facility dependencies, privileged-access paths, support-vendor exposure, and recovery priorities."
  ),
  /** Source L266. */
  listLead: same("Relevant scenarios include:"),
  items: [
    /** Source L268. */
    same("A shared BMS/EPMS or remote-access component crossing from general-facility administration toward a restricted zone."),
    /** Source L269. */
    same("Data-residency or operational-access constraints that limit who can diagnose a facility incident."),
    /** Source L270. */
    same("Supply-chain provenance requirements for firmware, controllers, hardware, and maintenance access."),
    /** Source L271. */
    same("Continuity requirements where load relocation is constrained by geography, latency, or sovereignty.")
  ]
};

/* ── Record 6 · Manufacturing and supply chain (source L273–L284) ───────── */

/**
 * Six items, L277–L282, verbatim and in the source's own order, followed by
 * L284's closing paragraph — the only record in this section that carries one.
 *
 * L284 IS TRANSCRIBED IN THE SOURCE'S OWN FRAMING AND EXTENDED IN NO DIRECTION.
 * It states that the OXOT specification SUPPORTS separate software, hardware,
 * cryptographic, SaaS and operations BOMs, and why that suits a hyperscale
 * vertical. It is not turned into a claim that those BOMs are populated for any
 * customer, complete, audited, or certified, and no figure is attached to it.
 *
 * THE SOURCE'S OWN LINK IS NOT EMITTED. L284 closes on a bracketed
 * `ppl-ai-file-upload.s3.amazonaws` URL — an expiring pre-signed S3 link to
 * `OXOT-CDT-Product-Specification-V2.pdf`, carrying an `Expires` parameter and a
 * scoped security token. Shipping it would put a link on the site that dies. The
 * document it names is OXOT's own CDT product specification and this site's real
 * page for that material is `/technical-specification`, so the citation resolves
 * there. Identical resolution to `content.architecture.ts`'s `PASSIVE_FIRST`,
 * which handles the same dangling marker at L191.
 *
 * `/technical-specification` RENDERS ENGLISH ONLY — `content.ts` states this in
 * data as `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY`. The consuming component
 * must apply the site's established gate, `locale === "en" ? href : PATHS.cdt2`,
 * rather than shipping an `nl` link into an EN-only page.
 */
const MANUFACTURING: DependencyRecord = {
  id: RECORD_IDS.manufacturing,
  /** Source L273. */
  heading: same("Manufacturing and supply-chain dependency"),
  /** Source L275. */
  lead: same("This is especially important for hyperscale expansion:"),
  items: [
    /** Source L277. */
    same("Long-lead MV transformers, switchgear, breakers, generators, UPS, batteries, chillers, cooling towers, and CDUs."),
    /** Source L278. */
    same("Concentration risk in specific controller, PLC, relay, BMS, UPS, and generator OEMs."),
    /** Source L279. */
    same("Firmware and software bill-of-material risk."),
    /** Source L280. */
    same("Field-service access, commissioning tools, contractor laptops, and maintenance contractors."),
    /** Source L281. */
    same("Spares inventory, repair capacity, warranty terms, and emergency replacement logistics."),
    /** Source L282. */
    same("Fabrication, shipping, customs, port, rail, trucking, and construction-schedule dependencies.")
  ],
  closing: {
    /** Source L284, both sentences, verbatim. */
    text: same(
      "The OXOT specification supports separate software, hardware, cryptographic, SaaS, and operations BOMs. This is a powerful fit for a hyperscale vertical because it lets the site model relate control-system dependencies to supplier, firmware, certificate, operational-role, and lifecycle exposure."
    ),
    citation: {
      label: same("See the Technical Specification"),
      href: PATHS.technicalSpecification
    }
  }
};

/** The three commercial-and-mission records, in the source's own order. A
 *  consumer renders `EXTERNAL_RECORDS` then these to get the source's six. */
export const COMMERCIAL_RECORDS: readonly DependencyRecord[] = [
  COMMERCIAL,
  DEFENSE,
  MANUFACTURING
];
