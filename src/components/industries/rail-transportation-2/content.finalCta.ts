/**
 * FINAL CTA AND INTAKE — content slice for `/industries/rail-transportation-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md, L398–L440. Every string below carries the
 * source line it was transcribed from. Nothing is invented, except the strings
 * explicitly marked NOT FROM THE SOURCE, which are honesty disclosures about an
 * unwired form and control affordance text rather than copy.
 *
 * THE PRIMARY CTA IS NOT RETRANSCRIBED. L404's "Discuss a rail scenario" is the
 * same string as the hero's primary CTA (L40), already transcribed in
 * `content.ts` as `HERO.ctaPrimary`. It is re-exported from there rather than
 * typed a second time — two independent transcriptions of one source string is
 * exactly how the top and the bottom of a page drift apart. Its destination
 * comes from `LINKS.contact`, the verified route map, not the brief's raw path.
 *
 * THE SECONDARY CTA IS GATED, AND THE GATE IS READ RATHER THAN ASSUMED.
 * `/technical-specification` renders EN only, so `/nl/technical-specification`
 * is a real 404. `content.ts` states that in data as
 * `TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY`, with the site's established
 * substitution: `locale === "en" ? PATHS.technicalSpecification : PATHS.cdt2`.
 * That flag is re-exported below as `ctaSecondaryEnglishOnly` so the renderer
 * consults it; clearing it in `content.ts` the day that page renders `nl`
 * retires the gate without this file or the component being touched.
 *
 * "NAME AND WORK EMAIL" IS ONE SOURCE BULLET (L409) RENDERED AS TWO INPUTS.
 * They are two values, and `type="email"` gives the second real browser
 * validation. Splitting an input is a rendering decision — no field was added
 * and none dropped.
 *
 * OPTION LISTS ARE VERBATIM AND COMPLETE: 8 rail segments (L413–L420), 10
 * system scopes (L422–L431), 8 decisions (L433–L440) — 26 options, none
 * merged, reworded, reordered or dropped. The source's own spacing around
 * slashes is preserved ("Metro / light rail / tram", but "Rolling-stock,
 * signaling, or rail technology supplier"); do not "regularise" it here.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import { same } from "../registry";
import { HERO, LINKS, TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY } from "./content";

export const FINAL_CTA = {
  /** Closing block anchor. */
  sectionId: "start",
  /* Section chrome, not sourced copy. The source's own heading for this block,
     "Final CTA" (L398), is production vocabulary rather than something to print
     at a visitor, so the block rule carries what the block is FOR — the same
     locally-stated-label convention the other sections in this folder use. */
  datumLabel: same("Start here"),
  /* H-D is the closing run and is explicitly not a numbered section (Rule.tsx
     L62–L67), but `Datum` still takes an index. It carries the next ordinal
     after S12 so the run reads continuously with every block above it. */
  index: "13",

  /** Source L400. */
  h2: same("Start with one line, one territory, or one operational decision."),
  /** Source L402. */
  body: same(
    "Bring a signaling architecture, interlocking diagram, PTC map, SCADA topology, or asset list. OXOT will show how the Cyber Digital Twin can trace the pathway, test the control, and support a defensible rail-security decision before the live railway is changed."
  ),

  /** Source L404 — the hero's own string, reused rather than retranscribed. */
  ctaPrimary: HERO.ctaPrimary,
  ctaPrimaryHref: LINKS.contact,
  /** Source L405 → the brief's `/resources/technical-specification` (L479),
   *  resolved through `LINKS` to the real `/technical-specification` route. */
  ctaSecondary: same("Request the Technical Specification"),
  ctaSecondaryHref: LINKS.technicalSpecification,
  /** Read from `content.ts`, not restated. See this file's doc comment. */
  ctaSecondaryEnglishOnly: TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY,

  /** Source L407, the brief's own heading for the block of fields. */
  formLabel: same("Form fields"),
  /* NOT FROM THE SOURCE — a required honesty disclosure. The brief specifies
     the fields (L407–L440) but no submission endpoint exists in this
     repository. Per the owner's standing rule an unbuilt interactive feature is
     built complete and visibly placeholdered rather than omitted. */
  formNote: same(
    "This intake is not yet wired to a submission endpoint. Fill it in to see what OXOT asks for, then send the same details through Contact — nothing entered here leaves your browser."
  ),

  fields: {
    /** Source L409, first half. */
    name: same("Name"),
    /** Source L409, second half. */
    email: same("Work email"),
    /** Source L410. */
    organization: same("Organization"),
    /** Source L411. */
    role: same("Role"),
    /** Source L412. */
    railSegment: same("Rail segment"),
    /** Source L421. */
    systemScope: same("System scope"),
    /** Source L432. */
    decision: same("Decision to evaluate"),
    /* NOT FROM THE SOURCE — control affordance text, not copy. A select needs
       an empty-state placeholder and a multi-select needs a stated cardinality;
       the brief specifies neither, so both are said plainly rather than left to
       the visitor to infer from the control's behaviour. */
    choose: same("Choose one"),
    chooseAny: same("Select all that apply")
  },

  /** Source L413–L420, all eight options, verbatim. */
  railSegmentOptions: [
    same("Metro / light rail / tram"),
    same("Commuter rail"),
    same("Intercity passenger rail"),
    same("Rail infrastructure manager"),
    same("Freight railroad"),
    same("Short line / regional freight"),
    same("Rolling-stock, signaling, or rail technology supplier"),
    same("Other")
  ],

  /** Source L422–L431, all ten options, verbatim. */
  systemScopeOptions: [
    same("CBTC / ETCS / ATP / ATS"),
    same("Interlocking / wayside signaling"),
    same("PTC"),
    same("Dispatch / CAD / traffic management"),
    same("Traction-power SCADA"),
    same("Station / tunnel / depot OT"),
    same("Grade crossings"),
    same("Locomotive or rolling-stock maintenance"),
    same("Yard / terminal systems"),
    same("Remote vendor access")
  ],

  /** Source L433–L440, all eight options, verbatim. The sixth names three
   *  instruments in one option — NIS2, TS 50701 and TSA — and must NOT be split
   *  into three: the source asks one question about evidence for whichever of
   *  them binds the visitor's jurisdiction, and this page's regulatory material
   *  (L371–L384) is itself split EU-passenger vs US-freight along those lines. */
  decisionOptions: [
    same("Remediation prioritization"),
    same("Segmentation / access redesign"),
    same("Patching or legacy-asset replacement"),
    same("Signaling / PTC / dispatch change"),
    same("Supply-chain or procurement decision"),
    same("NIS2 / TS 50701 / TSA evidence"),
    same("Incident recovery exercise"),
    same("Other")
  ]

  /* GAP, FLAGGED NOT FILLED: the source marks no field as required or optional,
     states no submission destination, and gives no confirmation, privacy or
     retention wording for the intake. None is invented. */
};
