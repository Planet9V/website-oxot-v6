/**
 * S14 · FINAL CTA AND INTAKE — content slice for
 * `/industries/hyperscale-data-centers-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, L488–L532. Every string below carries the source line
 * it was transcribed from. Nothing is invented, except the strings explicitly
 * marked NOT FROM THE SOURCE, which are honesty disclosures about an unwired
 * form and control-affordance text rather than copy.
 *
 * THE PRIMARY CTA IS ITS OWN STRING HERE, AND THAT IS A DIFFERENCE FROM THE
 * SIBLING -2 PAGES WORTH NAMING. On rail, the closing primary CTA repeats the
 * hero's word for word, so that file re-exports `HERO.ctaPrimary` rather than
 * transcribing it twice. This brief does NOT repeat itself: the hero asks
 * "Discuss a critical-facilities scenario" (L42) and the close asks "Discuss a
 * hyperscale scenario" (L494). Two different sentences in the source stay two
 * different strings here. `HERO.ctaPrimary` was checked before this was written,
 * not assumed to differ.
 *
 * THE SECONDARY CTA IS REUSED, NOT RETRANSCRIBED — the opposite call, for the
 * opposite reason. L495's "Explore the interactive hyperscale model" is the same
 * sentence as L31, already transcribed in `content.ts` as
 * `CONVERSIONS.secondary`. It is re-exported from there, because two independent
 * transcriptions of one source string is exactly how the top and the bottom of a
 * page drift apart.
 *
 * NO LOCALE GATE APPLIES TO THIS SECTION, AND THAT WAS ESTABLISHED BY READING
 * THE SOURCE RATHER THAN BY DEFAULT. `content.ts` ships two English-only flags,
 * `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY` and `ASSURANCE_IS_ENGLISH_ONLY`, and
 * any section linking to either route must gate its href on locale. This section
 * links to NEITHER: the source's close offers exactly two destinations,
 * `/contact` (L494, via `LINKS.contact`) and this page's own interactive model
 * (L495), and both render in every locale. The model link is an in-page fragment
 * rather than a route, so it carries no href here at all — the component
 * composes `#${MODEL.id}` from the same constant S01 renders as its section id,
 * the way `Hero.tsx` already does for the identical anchor. Applying a gate
 * anyway would be cargo-culting one from a sibling page.
 *
 * "NAME AND WORK EMAIL" IS ONE SOURCE BULLET (L499) RENDERED AS TWO INPUTS. They
 * are two values, and `type="email"` gives the second real browser validation.
 * Splitting an input is a rendering decision — no field was added and none
 * dropped.
 *
 * OPTION LISTS ARE VERBATIM AND COMPLETE: 8 organization types (L503–L510), 10
 * facility scopes (L512–L521), 10 decisions (L523–L532) — 28 options, none
 * merged, reworded, reordered or dropped. These counts are this page's own and
 * do NOT match rail's 8/10/8; the third list is two options longer here. The
 * source's own spacing around slashes and its own compound wordings are
 * preserved exactly as written — "Developer / design-build / EPC" spaced, but
 * "BMS/EPMS segmentation" unspaced, and "Grid, fuel, water, or telecom
 * dependency" left as one option rather than split into four. Do not
 * "regularise" any of it.
 *
 * NO FIGURE APPEARS IN THIS SLICE. The 500 kW reporting threshold and the 48 MW
 * illustrative campus belong to the regulatory and worked-example sections; the
 * source's closing ask (L490–L495) restates neither, so neither is imported here
 * as a closing claim.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import { same } from "../registry";
import { CONVERSIONS, LINKS } from "./content";

export const FINAL_CTA = {
  /** Closing block anchor. */
  sectionId: "start",
  /* Section chrome, not sourced copy. The source's own heading for this block,
     "Final CTA" (L488), is production vocabulary rather than something to print
     at a visitor, so the block rule carries what the block is FOR — the same
     locally-stated-label convention the other sections in this folder use. */
  datumLabel: same("Start here"),
  /* H-D is the closing run and is explicitly not a numbered section (Rule.tsx
     L71–L76), but `Datum` still takes an index. It carries the next ordinal
     after S13 so the run reads continuously with every block above it. */
  index: "14",

  /** Source L490. */
  h2: same("Start with one power path, one cooling train, or one control-system change."),
  /** Source L492. */
  body: same(
    "Bring a one-line diagram, P&ID, BMS/EPMS architecture, equipment list, or a proposed vendor-access, firmware, or segmentation change. OXOT will show how the Cyber Digital Twin can trace the route, test the control, and expose the capacity consequence before the live facility is changed."
  ),

  /** Source L494. NOT the hero's string — see this file's doc comment. */
  ctaPrimary: same("Discuss a hyperscale scenario"),
  ctaPrimaryHref: LINKS.contact,
  /** Source L495 — identical to L31, so `content.ts`'s own transcription is
   *  reused. No href field: the component composes the in-page `#${MODEL.id}`
   *  fragment, as `Hero.tsx` does for the same anchor. */
  ctaSecondary: CONVERSIONS.secondary,

  /** Source L497, the brief's own heading for the block of fields. */
  formLabel: same("Form fields"),
  /* NOT FROM THE SOURCE — a required honesty disclosure. The brief specifies
     the fields (L497–L532) but no submission endpoint exists in this
     repository. Per the owner's standing rule an unbuilt interactive feature is
     built complete and visibly placeholdered rather than omitted. */
  formNote: same(
    "This intake is not yet wired to a submission endpoint. Fill it in to see what OXOT asks for, then send the same details through Contact — nothing entered here leaves your browser."
  ),

  fields: {
    /** Source L499, first half. */
    name: same("Name"),
    /** Source L499, second half. */
    email: same("Work email"),
    /** Source L500. */
    organization: same("Organization"),
    /** Source L501. */
    role: same("Role"),
    /** Source L502. */
    organizationType: same("Organization type"),
    /** Source L511. */
    facilityScope: same("Facility scope"),
    /** Source L522. */
    decision: same("Decision to evaluate"),
    /* NOT FROM THE SOURCE — control affordance text, not copy. A select needs
       an empty-state placeholder and a multi-select needs a stated cardinality;
       the brief specifies neither, so both are said plainly rather than left to
       the visitor to infer from the control's behaviour. */
    choose: same("Choose one"),
    chooseAny: same("Select all that apply")
  },

  /** Source L503–L510, all eight options, verbatim. */
  organizationTypeOptions: [
    same("Hyperscaler"),
    same("Colocation provider"),
    same("Enterprise data-center operator"),
    same("Developer / design-build / EPC"),
    same("Critical-facilities OEM or integrator"),
    same("Telecom / cloud / managed-service provider"),
    same("Government / sovereign / defense-adjacent operator"),
    same("Other")
  ],

  /** Source L512–L521, all ten options, verbatim. */
  facilityScopeOptions: [
    same("Campus / availability zone"),
    same("Data hall"),
    same("Electrical power path"),
    same("Generator / UPS / BESS"),
    same("Chiller / cooling-water plant"),
    same("Liquid-cooling / AI hall"),
    same("BMS / EPMS / DCIM environment"),
    same("Vendor remote access"),
    same("New build / commissioning / expansion"),
    same("Multi-site estate")
  ],

  /** Source L523–L532, all ten options, verbatim. The sixth names four external
   *  dependencies in one option — grid, fuel, water and telecom — and must NOT
   *  be split into four: the source asks one question about whichever external
   *  dependency concerns the visitor, and this page's dependency map treats
   *  those four as one class of external exposure. */
  decisionOptions: [
    same("Common-mode dependency analysis"),
    same("BMS/EPMS segmentation"),
    same("Vendor/OEM access"),
    same("Controller/firmware lifecycle"),
    same("Electrical or cooling change"),
    same("Grid, fuel, water, or telecom dependency"),
    same("Supply-chain / BOM / procurement risk"),
    same("Sovereign or regulated-workload boundary"),
    same("NIS2 / sustainability reporting evidence"),
    same("Other")
  ]

  /* GAP, FLAGGED NOT FILLED: the source marks no field as required or optional,
     states no submission destination, and gives no confirmation, privacy or
     retention wording for the intake. None is invented. */
};
