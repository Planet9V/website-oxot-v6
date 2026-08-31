/**
 * THE OXOT METHOD — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L93–L129. Every string below carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * ONE SECTION, TWO DIFFERENT SHAPES, AND THEY MUST NOT BE MERGED. L99–L103 is
 * a two-column table of three PRINCIPLES — simultaneous, unordered, each true
 * at all times. L107–L127 is an ASCII block of five STEPS — sequential, each
 * consuming what the one before it produced. Flattening both into one list of
 * cards would assert that the principles happen in order, or that the steps
 * hold simultaneously; either is a fabricated claim. So `principles` and
 * `steps` are separate arrays with separate record types.
 *
 * EACH STEP HAS A TITLE AND A BODY, AND BOTH SURVIVE. L108/L109–110,
 * L112/L113–114, L116/L117–118, L120/L121–122, L124/L125–126 each pair a short
 * imperative with an indented sentence saying what it means. The body is not a
 * subtitle a tight layout may drop: it carries the substance ("approved
 * engineering, operational, asset… records"), while the title alone
 * ("Establish the evidence") says almost nothing. `title` and `body` are
 * therefore both required fields, and a renderer must print both.
 *
 * NOTHING DOWNSTREAM MAY RENDER A TIME AXIS. NO DURATION, PRICE, TEAM SIZE,
 * EFFORT SPLIT, PREREQUISITE OR RELATIVE SCOPE is stated for any of the five
 * steps, because the source states none. `index` records position in the
 * source's numbered list, which is a real fact about the source; it is not a
 * schedule, a weighting or a rating. A Gantt bar, a week marker, a percentage
 * complete, or steps drawn at unequal length would each be an invented
 * engineering fact. Equal, unlabelled stages are the only honest drawing.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency figure, duration, count,
 * customer name or certification appears in L93–L129. The section's hedges are
 * the source's own and are transcribed unstrengthened: "where appropriate"
 * (L103), "should be able to begin on Monday" (L103), and "can model … without
 * actively scanning" (L129) — that last is a capability hedged with "can", not
 * a guarantee, and must not be rendered as one.
 *
 * CITATION EXCLUDED ON PURPOSE. L129's sentence ends with a link to a
 * presigned Amazon S3 URL carrying `AWSAccessKeyId`, `Signature`,
 * `x-amz-security-token` and `Expires=` query parameters. It is a temporary,
 * credentialed, expiring link to an internal upload — not a citable public
 * source. Shipping it would publish credential material and would rot into a
 * dead link. The sentence is transcribed; the URL is deliberately dropped, and
 * no `citationUrl` field exists rather than one holding a broken value.
 *
 * `Bilingual`-typed via `same()` (./content); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "./content";

/** One row of the principle table (L101–L103). Unordered — all hold at once. */
export interface MethodPrinciple {
  /** DOM identity, not copy. Never derive it from array position. */
  id: string;
  /** Source column 1 — the principle's name. */
  name: Bilingual;
  /** Source column 2 — what the principle means. */
  meaning: Bilingual;
}

/** One step of the engagement sequence (L107–L127). Ordered. */
export interface EngagementStep {
  /** DOM identity, not copy. Never derive it from array position. */
  id: string;
  /**
   * The step's number in the source's own numbered block. A fact about the
   * source's ordering — NOT a duration, weight, difficulty or price band.
   */
  index: string;
  /** The step's short imperative. Meaningless without `body`. */
  title: Bilingual;
  /** The step's substance. Required; never dropped for layout. */
  body: Bilingual;
}

export const METHOD = {
  /** Section anchor — matches the `method` entry in ANCHORS (./content). */
  sectionId: "method",

  /** Source L93 — the source's own name for this section. */
  datumLabel: same("The OXOT method"),

  /** Source L95. */
  heading: same("Collaborative, controlled, and built for action."),

  /* LAYOUT DIRECTIVE, NOT COPY. L97 reads "Use this as a three-column principle
     section." That is an instruction addressed to whoever builds the page, not
     a sentence any visitor should ever read. It is recorded here as guidance —
     render `principles` as three columns — and is deliberately absent from
     every exported string below. Any similar directive found elsewhere in the
     spec gets the same treatment. */

  /** Source L99 — the table's own column headers, used to label each cell. */
  principleColumns: {
    principle: same("Principle"),
    meaning: same("What it means"),
  },

  /**
   * Source L101–L103, in the source's row order. That order is presentational:
   * these three hold simultaneously, and none is a stage, a prerequisite, or a
   * ranking of the others.
   */
  principles: [
    {
      id: "client-centric",
      /** Source L101, both cells. */
      name: same("Client-centric"),
      meaning: same(
        "Plant engineers and operators are measured on reliability and safety, not control coverage. OXOT works collaboratively with the people who understand the system, its constraints, and its recovery requirements."
      ),
    },
    {
      id: "controlled-execution",
      /** Source L102, both cells. */
      name: same("Controlled execution"),
      meaning: same(
        "Safety comes first. A named delivery lead sits between the customer, OXOT consultants, specialist teams, and any test activity. Scope, methods, evidence handling, stop conditions, and escalation routes are agreed before work begins."
      ),
    },
    {
      id: "actionable-outcomes",
      /** Source L103, both cells. */
      name: same("Actionable outcomes"),
      meaning: same(
        "The outcome is a prioritized, evidence-backed action plan: quick wins, scheduled work, strategic architecture decisions, and documented risk acceptance where appropriate. Engineering should be able to begin on Monday."
      ),
    },
  ] satisfies readonly MethodPrinciple[],

  /** Source L105 — the sub-heading introducing the sequence below. */
  sequenceHeading: same("The engagement sequence"),

  /**
   * Source L107–L127, the five numbered steps, in the source's order. Each
   * source step wraps its body across indented lines; the wrapping is
   * typography, not content, so those lines are rejoined into one sentence and
   * nothing is added, cut or reordered.
   */
  steps: [
    {
      id: "define-the-decision",
      index: "1",
      /** Source L108. */
      title: same("Define the decision"),
      /** Source L109–L110. */
      body: same(
        "What risk, change, investment, supplier, system, or assurance question needs an answer?"
      ),
    },
    {
      id: "establish-the-evidence",
      index: "2",
      /** Source L112. */
      title: same("Establish the evidence"),
      /** Source L113–L114. */
      body: same(
        "Gather approved engineering, operational, asset, topology, configuration, safety, reliability, supplier, and lifecycle records."
      ),
    },
    {
      id: "build-the-working-model",
      index: "3",
      /** Source L116. */
      title: same("Build the working model"),
      /** Source L117–L118. */
      body: same(
        "Connect the facility, assets, control systems, network pathways, dependencies, operational consequence, and existing controls."
      ),
    },
    {
      id: "test-options",
      index: "4",
      /** Source L120. */
      title: same("Test options"),
      /** Source L121–L122. */
      body: same(
        "Compare remediation, segmentation, access, patch, replacement, supplier, modernization, or acceptance options in the Twin."
      ),
    },
    {
      id: "deliver-a-decision-that-holds",
      index: "5",
      /** Source L124. */
      title: same("Deliver a decision that holds"),
      /** Source L125–L126. */
      body: same(
        "Provide the rationale, evidence, actions, accountable owners, sequencing, residual risk, and review triggers."
      ),
    },
  ] satisfies readonly EngagementStep[],

  /**
   * Source L129, sentence only. Its trailing citation link is excluded — see
   * the file header: it is an expiring presigned S3 URL carrying AWS
   * credentials. The hedge "can model" is the source's and stays a hedge.
   */
  footnote: same(
    "The Cyber Digital Twin can model system assets, control configuration, network topology, segmentation, pathways, engineering consequence, external context, and candidate controls without actively scanning the process network or deploying agents on controllers."
  ),

  /* GAP, FLAGGED NOT FILLED: the source gives this section no CTA, no figure,
     no definition of the named delivery-lead role beyond L102, and no statement
     of which step a given engagement starts at. None is invented, and no empty
     slot is drawn for one. */
};
