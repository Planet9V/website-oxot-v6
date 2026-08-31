/**
 * FINAL CTA — closing block content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L502–L511. Every exported string carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * NO FORM. Unlike the industry briefs, this page's closing block specifies no
 * intake form — no fields, no options, no submission. L506 is a single sentence
 * naming what to bring to a conversation. No form is invented here, and none may
 * be added downstream: an unbuilt INTERACTION earns a visible placeholder only
 * where the source asks for one, and this source asks for none.
 *
 * THE INTAKE LIST IS NINE ITEMS AND THEY ARE NOT ALL DOCUMENTS. Six are
 * artifacts a visitor could attach (P&ID, system diagram, asset list, topology
 * export, vendor-access route, product architecture); three are QUESTIONS a
 * visitor carries in their head — "supplier concern", "hazard/RAMS question",
 * "proposed change". They are one list in the source and stay one list here, as
 * PLAIN TEXT.
 *
 * NO ICONS, NO SYMBOL SLUGS, BINDING. `IntakeItem` is deliberately a bare
 * `Bilingual` and not a record with an icon field, so there is no slot into
 * which a glyph can be dropped later without a deliberate edit to this file. The
 * glyph library was checked and contains no honest document/artifact mark;
 * substituting a near-miss is forbidden, and a document icon beside "hazard/RAMS
 * question" would be a straightforward lie about what the visitor is being asked
 * for. Render these as text.
 *
 * TWO RENDERINGS, ONE OF THEM ONLY. `intakeSentence` is L506 whole, for a prose
 * treatment; `intakeLead` + `intakeItems` is the same sentence decomposed, for a
 * list treatment. They are the same content in two shapes — render exactly one.
 * If the list form is used, the items join with commas and a final "or", which
 * is how the source itself punctuates them.
 *
 * SECTION HEADING IS PRODUCTION VOCABULARY, NOT COPY. The source's own heading
 * for this block is "Final CTA" (L502). That names the block for whoever builds
 * it and must never be printed at a visitor, so `datumLabel` carries a stated
 * label for what the block is FOR, matching the locally-stated-label convention
 * the other closing blocks in this repository use.
 *
 * HREFS ARE RESOLVED AGAINST REAL ROUTES, NOT THE BRIEF'S PATHS. The brief's
 * suggested internal links (L528–L529) are `/platform/cyber-digital-twin` and
 * `/platform/decisions`; there is no `/platform` segment in this application and
 * both would 404. The Twin's real route is `/cdt-2`, and the secondary CTA
 * deep-links to its engine section, `/cdt-2#engine`. The primary CTA has no
 * destination stated anywhere in L502–L511, so `/contact` is used — a verified
 * existing route and the only place "discuss an engagement" can land.
 *
 * BOTH HREFS ARE THEREFORE DECISIONS, NOT TRANSCRIPTIONS, and each is annotated
 * as one at its own field below. Neither path is written literally: both come
 * from `PATHS` (`shell/nav.ts`), the single source for what pages exist, so a
 * future route rename moves this page with it rather than stranding it. The
 * full set of the brief's ten suggested links is resolved the same way in
 * ./content.relatedLinks.
 *
 * ZERO NUMERIC CLAIMS. L502–L511 contains no percentage, currency, duration,
 * count, headcount, customer name or certification — and no numeral of any kind.
 * "Bring one" (L506) is a scoping instruction to the visitor, not a quantity
 * OXOT claims about anything, and must not be rendered as a figure.
 *
 * NOT CLAIMED: that a next step is recommended, or that any of the three options
 * named at L508 is the right one. The source's verb is deliberately neutral —
 * OXOT "will help you determine" which — and that hedge ships exactly as
 * written.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "./content";

/**
 * One thing the visitor is invited to bring.
 *
 * Bare text by design. See the file header: no icon field exists here, and none
 * may be added — three of the nine are questions, not documents, and no glyph in
 * the library honestly marks either kind.
 */
export type IntakeItem = Bilingual;

export const FINAL_CTA = {
  /** Closing block anchor. Not in `ANCHORS` (./content) — that list is the
   *  in-page nav's targets, and the closing block is the page's end rather than
   *  a destination the reader jumps back to. */
  sectionId: "start",
  /* Section chrome, not sourced copy. The source's own heading for this block,
     "Final CTA" (L502), is production vocabulary and is not printed. */
  datumLabel: same("Start here"),

  /** Source L504. */
  h2: same("Start with the decision that is hardest to make."),

  /** Source L506, whole and verbatim — the prose rendering. */
  intakeSentence: same(
    "Bring one P&ID, system diagram, asset list, topology export, vendor-access route, product architecture, supplier concern, hazard/RAMS question, or proposed change."
  ),
  /** Source L506, the sentence's opening — the list rendering's lead-in. */
  intakeLead: same("Bring one"),
  /** Source L506, all nine items in source order. Six are artifacts, three are
   *  questions; all nine are plain text and none carries a mark. */
  intakeItems: [
    /** Source L506, item 1. */
    same("P&ID"),
    /** Source L506, item 2. */
    same("system diagram"),
    /** Source L506, item 3. */
    same("asset list"),
    /** Source L506, item 4. */
    same("topology export"),
    /** Source L506, item 5. */
    same("vendor-access route"),
    /** Source L506, item 6. */
    same("product architecture"),
    /** Source L506, item 7 — a question, not a document. */
    same("supplier concern"),
    /** Source L506, item 8 — a question, not a document. */
    same("hazard/RAMS question"),
    /** Source L506, item 9 — a question, not a document. */
    same("proposed change")
  ] satisfies readonly IntakeItem[],

  /** Source L508. The hedge "will help you determine whether" is the source's
   *  and is load-bearing — no next step is recommended here. */
  body: same(
    "OXOT will help you determine whether a focused consulting engagement, a Cyber Digital Twin build, or a longer-term operating model is the right next step."
  ),

  /** Source L510 — the label only. The destination is a RESOLVED ROUTING
   *  DECISION, not a transcription: the source states none anywhere in
   *  L502–L511, and `PATHS.contact` is the site's one verified place a
   *  conversation can start. */
  ctaPrimary: same("Discuss a consulting engagement"),
  ctaPrimaryHref: PATHS.contact,
  /** Source L511 — the label only. The destination is a RESOLVED ROUTING
   *  DECISION: the brief's suggested `/platform/cyber-digital-twin` (L528) has
   *  no `/platform` segment in this application and would 404, so it is not
   *  transcribed. `PATHS.cdt2` is the Twin's real and only route.
   *
   *  DEEP-LINKED TO `#engine`, not the bare page. /cdt-2 is long, and the label
   *  promises the Twin itself rather than the whole platform story; `#engine`
   *  is a real section id on that page (it is one of `primaryNav`'s own CDT-2
   *  children, "The engine"), so the reader lands on what was promised instead
   *  of the top of a scroll. The anchor is this file's decision, no more
   *  sourced than the path it hangs off. */
  ctaSecondary: same("Explore the Cyber Digital Twin"),
  ctaSecondaryHref: `${PATHS.cdt2}#engine`

  /* GAP, FLAGGED NOT FILLED: the source states no response time, no submission
     destination, no privacy or retention wording, and no NDA or confidentiality
     terms for material a visitor brings. None is invented. */
};
