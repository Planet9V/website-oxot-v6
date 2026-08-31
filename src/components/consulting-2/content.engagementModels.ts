/**
 * ENGAGEMENT MODELS — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L415–L433. Every string below carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * ⛔ NO TIME AXIS. EVER. READ THIS BEFORE RENDERING ANYTHING FROM THIS FILE.
 *
 *   The source table's third column is headed "Typical duration and outcome"
 *   (L421) — and NOT ONE of its five rows states a duration. L423–L427 give
 *   outcomes only: "a focused model, scenario analysis, options comparison, and
 *   evidence-backed recommendation", "system model, prioritized actions…", and
 *   so on. No weeks, no months, no sprint length, no start or end date, no
 *   phase boundary, nothing.
 *
 *   So this file models OUTCOME ONLY, and its shipped column label is
 *   `columns.outcome` — the trailing half of the source heading. The heading's
 *   full text is preserved in `SOURCE_COLUMN_HEADING_NOT_FOR_RENDER` below as
 *   provenance, and must never be printed: printing "Typical duration…" over a
 *   column that contains no duration promises the reader a fact the business
 *   has not stated.
 *
 *   Nothing downstream may render a timeline, Gantt bar, swimlane, week or
 *   month scale, calendar, progress track, "typically N weeks" chip, bar
 *   length, or any other mark whose position or extent encodes elapsed time.
 *   There is no data here to derive one from; any such mark would be a
 *   fabricated commercial commitment.
 *
 * `index` IS AN ORDINAL, NOT A SIZE. The five rows are a real ascending
 * commitment order in the source, and that ordering is the section's whole
 * argument: L417 heads it "Start small. Keep the model if it proves useful.",
 * and L431 closes it "You do not need to commit to a multi-year programme to
 * start… If the model proves its value, it becomes the foundation for the next
 * decision." Row 1 is one decision; row 5 is a sustained internal-capability
 * programme. `index` records that position because it is a fact about the
 * table. It is NOT a size, price, scope, effort, seniority or value rating, and
 * must not be rendered as a bar, a score, a tier badge, a price ladder or a
 * "recommended" marker — the source ranks nothing and recommends nothing.
 *
 * ZERO NUMERIC CLAIMS. L415–L433 states no percentage, currency, count, rate or
 * date. The one duration-shaped phrase in the range is "multi-year programme"
 * (L431), which is the source NEGATING a commitment requirement — not a claim
 * about the length of anything OXOT sells. It ships verbatim as body copy and
 * is not a licence to draw a scale.
 *
 * CITATION DELIBERATELY NOT SHIPPED. L433's sentence carries a source link to a
 * `ppl-ai-file-upload.s3.amazonaws.com` presigned S3 URL containing
 * `AWSAccessKeyId`, `Signature`, `x-amz-security-token` and `Expires=`. It is a
 * time-limited credentialed URL to an internal upload, not a citable public
 * reference: it carries request-signing material and stops resolving once it
 * expires. The sentence is transcribed; the href is dropped and no substitute
 * is invented.
 *
 * BUILDER INSTRUCTION, NOT COPY. L419 ("This section makes clear that OXOT can
 * deliver short engagements and long-term support without making the buyer
 * choose a large programme upfront.") is direction to whoever builds this
 * section, addressed to the builder in the third person. It is recorded here as
 * a comment and MUST NOT ship as body text.
 *
 * `Bilingual`-typed via `same()` (./content); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/**
 * The source's verbatim third-column heading (L421), kept for provenance only.
 *
 * NOT FOR RENDER. See the file header: no row beneath this heading states a
 * duration, so printing it would promise a fact the source does not supply.
 * The renderable label is `ENGAGEMENT_MODELS.columns.outcome`.
 */
export const SOURCE_COLUMN_HEADING_NOT_FOR_RENDER =
  "Typical duration and outcome";

/** One row of the L421–L427 engagement-model table. */
export interface EngagementModel {
  /** DOM identity, not copy. Never derive a wired id from array position. */
  id: string;
  /**
   * Position in the source table's ascending commitment order (L417, L431).
   * A real fact about the table — never a size, price, scope or effort rating.
   */
  index: string;
  /** Source column 1 — the engagement model's name. */
  name: Bilingual;
  /** Source column 2 — where a customer would begin with it. */
  startingPoint: Bilingual;
  /**
   * Source column 3, OUTCOME HALF ONLY. Every value here describes what the
   * engagement returns. None states, or may be rendered as, a duration.
   */
  outcome: Bilingual;
}

export const ENGAGEMENT_MODELS = {
  /** Section anchor — matches `"engagement-models"` in ANCHORS (./content). */
  sectionId: "engagement-models",
  /** Source L415 — the source's own name for this section. */
  datumLabel: same("Engagement models"),
  /** Source L417 — the section headline, printed as an h2 in the brief. */
  h2: same("Start small. Keep the model if it proves useful."),

  /**
   * Column labels. `engagementModel` and `bestStartingPoint` are L421 verbatim.
   * `outcome` is L421's third heading with its unsupported "Typical duration
   * and" prefix removed — see the file header and
   * `SOURCE_COLUMN_HEADING_NOT_FOR_RENDER`.
   */
  columns: {
    engagementModel: same("Engagement model"),
    bestStartingPoint: same("Best starting point"),
    outcome: same("Outcome")
  },

  items: [
    {
      id: "decision-sprint",
      index: "01",
      /** Source L423, all three cells. */
      name: same("Decision Sprint"),
      startingPoint: same(
        "One difficult decision: remote access, segmentation, vulnerability backlog, patch, supplier, capex, acquisition, or high-priority system"
      ),
      outcome: same(
        "A focused model, scenario analysis, options comparison, and evidence-backed recommendation"
      )
    },
    {
      id: "assessment-or-design-engagement",
      index: "02",
      /** Source L424, all three cells. */
      name: same("Assessment or Design Engagement"),
      startingPoint: same(
        "One facility, line, zone, railway application, product, data-center environment, or critical operational system"
      ),
      outcome: same(
        "System model, prioritized actions, architecture/treatment design, and implementation roadmap"
      )
    },
    {
      id: "cyber-digital-twin-build",
      index: "03",
      /** Source L425, all three cells. */
      name: same("Cyber Digital Twin Build"),
      startingPoint: same(
        "A strategic facility, site portfolio, estate, product family, railway environment, or critical operational domain"
      ),
      outcome: same(
        "A validated model that supports recurring decisions, evidence, and change analysis"
      )
    },
    {
      id: "continuous-twin-operations",
      index: "04",
      /** Source L426, all three cells. */
      name: same("Continuous Twin Operations"),
      startingPoint: same(
        "An evolving environment with recurring changes, suppliers, vulnerabilities, operational constraints, and assurance needs"
      ),
      outcome: same(
        "Ongoing model updates, risk deltas, scenario testing, governance views, and expert support"
      )
    },
    {
      id: "capability-transfer-programme",
      index: "05",
      /** Source L427, all three cells. */
      name: same("Capability Transfer Programme"),
      startingPoint: same(
        "A customer that needs sustained internal expertise and ownership"
      ),
      outcome: same(
        "Training, joint modeling, decision templates, evidence governance, and planned handover"
      )
    }
  ] satisfies readonly EngagementModel[],

  /** Source L429 — the subhead the brief prints over the closing blockquote. */
  keyMessageHeading: same("Key message"),

  /**
   * Source L431, printed as a blockquote. "multi-year programme" is the
   * source's own negation of a commitment requirement — see the file header. It
   * is not a duration claim and licenses no time scale.
   */
  keyMessage: same(
    "You do not need to commit to a multi-year programme to start. Begin with the system, change, or decision that matters now. If the model proves its value, it becomes the foundation for the next decision."
  ),

  /**
   * Source L433, sentence only. Its trailing citation link is an EXPIRING
   * presigned S3 URL (`Expires=`, `AWSAccessKeyId`, `Signature`,
   * `x-amz-security-token`) and is deliberately NOT shipped — see the file
   * header. No replacement reference is invented; render this as plain
   * supporting text with no source link attached.
   */
  supportingNote: same(
    "The documented OXOT engagement model supports both a transient engagement, where a model is built and deliverables are generated, and a long-term model operated alongside the customer estate."
  )

  /* GAP, FLAGGED NOT FILLED: the source gives no duration, price, team shape,
     deliverable format, prerequisite or entry criteria for any of the five
     models, names no recommended default, and supplies no CTA for this section.
     None is invented, and no empty slot is drawn for one — an unbuilt
     INTERACTION gets a visible placeholder; absent FACTS get silence. */
};
