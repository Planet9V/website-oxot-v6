/**
 * PAGE-SCOPED CLAIMS for /contact.
 *
 * Same reasoning as `src/components/check/claims.ts`: BUILD-LAW §3 says add
 * new facts to `src/content/claims.ts`; the orchestration brief says write only
 * the listed files, and `claims.ts` is shared with three other builders. These
 * carry the same discipline — real source, clearance date, proof where a reader
 * can open it — and are listed in the report for promotion.
 *
 * THE KVK NUMBER AND REGISTERED ADDRESS WERE DELIBERATELY ABSENT UNTIL
 * 2026-08-22. Neither existed anywhere in this project, inventing one was
 * refused (a previous builder on this project refused the same thing and was
 * right to), and `address`/`kvk`/`vat` below did not exist. The owner has
 * since supplied both, sourced in `new_material_source/1_website_layout_v4/
 * 7_company/contact.md` — the same discipline applies now that real values
 * exist: cited, dated, nothing embellished.
 */
import type { Claim } from "@/content/claims";

export const CONTACT = {
  headline: {
    en: "Start with one system, one decision, or one dependency chain.",
    nl: "Begin met één systeem, één beslissing, of één afhankelijkheidsketen.",
    source: "new_material_source/1_website_layout_v4/7_company/contact.md — H1",
    cleared: "2026-08-22",
    note:
      'Supersedes the r1-review headline ("Send it in writing. An engineer answers in two working days.", cleared 2026-08-07) on the owner\'s explicit instruction to rebuild this page from contact.md. The r1 fix it replaces — an h1 that carries the argument, with "Contact" demoted to the breadcrumb — still holds; only the argument itself changed, from the reply-time promise to the low-data-bar this new h1 states instead.'
  },
  entity: {
    en: "Oxot B.V.",
    nl: "Oxot B.V.",
    source: "docs/plans/2026-08-06-option-b/START-HERE.md §4 — applicant of record",
    cleared: "2026-08-06",
    note:
      "The legal name, and until 2026-08-22 the only company-registry fact this project held. Casing (\"Oxot\", not \"OXOT\") is consistent with every other legal/metadata mention sitewide (layout.tsx authors/publisher, legal.ts, opengraph-image.tsx) — left unchanged rather than matched to contact.md's all-caps prose casing, so this claim doesn't drift from the rest of the site's legal-name references."
  },
  email: {
    en: "info@oxot.nl",
    nl: "info@oxot.nl",
    source: "docs/OXOT-STYLEGUIDE.md §8.1 — the footer brand column",
    cleared: "2026-08-06"
  },
  address: {
    en: "Tuinderslaan 11-A, 3641 PZ Mijdrecht, The Netherlands",
    nl: "Tuinderslaan 11-A, 3641 PZ Mijdrecht, Nederland",
    source: "new_material_source/1_website_layout_v4/7_company/contact.md — Company details",
    cleared: "2026-08-22"
  },
  kvk: {
    en: "95407089",
    nl: "95407089",
    source: "new_material_source/1_website_layout_v4/7_company/contact.md — Company details",
    cleared: "2026-08-22"
  },
  vat: {
    en: "NL865175992B01",
    nl: "NL865175992B01",
    source: "new_material_source/1_website_layout_v4/7_company/contact.md — Company details",
    cleared: "2026-08-22"
  },
  /* `ladder` removed 2026-08-23 — it backed the r1-review facts panel
     (reply ladder / who-replies / RVO credential), which was removed from
     the live page the same day for not tracing to contact.md. `whoReplies`
     below survives: contact-form.tsx's post-submission success state still
     renders it. */
  whoReplies: {
    en: "The reply comes from one of the two people below, or from an engineer they hand it to. There is no lead-routing tier in front of them.",
    nl: "Het antwoord komt van een van de twee mensen hieronder, of van een engineer aan wie zij het doorgeven. Er zit geen laag leadopvolging voor hen.",
    source:
      "docs/plans/2026-08-06-option-b/REVISION-01-cab-bench-and-twin.md §01b — the written review replaces the 45-minute call",
    cleared: "2026-08-07",
    note:
      "OXOT's own statement about its own process. It is on the page because 'we will get back to you' is the sentence every vendor writes, and this reader has read four of them today."
  }
} satisfies Record<string, Claim>;

/* `FOUNDERS` (the LinkedIn identity block) removed 2026-08-23 along with the
   r1-review facts panel it sat beside on /contact — see the note on
   `whoReplies` above. The founders themselves are named on /company as
   contact.md's own "Founded by former Fox-IT and NCC Group OT security
   leads" principle; no per-person bio/LinkedIn block is called for there
   either. */
