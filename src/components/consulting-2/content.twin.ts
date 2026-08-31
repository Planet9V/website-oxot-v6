/**
 * THE CYBER DIGITAL TWIN IN CONSULTING — content slice for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md, L133–L175. Every string below carries the source line it was
 * transcribed from. Nothing is invented.
 *
 * TWO SHAPES IN ONE SECTION, AND THEY ARE NOT THE SAME KIND OF THING.
 *
 *   1. `outcomeChain` (L137–L159) is a COMPARISON DIAGRAM. The source prints
 *      two ```text blocks, each a four-node arrow chain: L139–L147 is what
 *      traditional consulting "commonly ends with", L151–L159 is "OXOT's
 *      model". They are isomorphic — same node count, same single-arrow
 *      descent — and their whole rhetorical force is that a reader can lay one
 *      over the other and read across at each depth. Emitting them as two
 *      unrelated string arrays would destroy exactly the thing the source is
 *      doing, so the pair is modelled as ONE list of PAIRED nodes: each record
 *      holds the traditional cell and the OXOT cell that sit at the same depth.
 *      A renderer that walks `outcomeChain.nodes` therefore gets node-for-node
 *      alignment on one canvas for free, in both a two-column layout and a
 *      stacked mobile one, and cannot drift the two chains out of register.
 *      The terminal pair (`terminal: true`) is where the argument actually
 *      lands — "Manual follow-up" against a model that can be handed over —
 *      and is flagged so a renderer may emphasise it without hard-coding an
 *      index.
 *
 *   2. `contributions` (L163–L171) is a SEVEN-ROW TABLE, not a diagram. It maps
 *      a consulting need to what the Twin contributes to that need. The rows
 *      have no order dependency, no flow between them and no arrows; they are
 *      not stages. It stays a table.
 *
 * NO STAGE NAMES ARE INVENTED. Neither chain labels its own nodes ("discover",
 * "model", "decide", …) and none is supplied here, because a stage vocabulary
 * the source does not use would be a fabricated method claim. The only naming
 * is `id`, which is DOM identity.
 *
 * NOT CLAIMED, BECAUSE THE SOURCE DOES NOT CLAIM IT: no duration, sequence
 * timing, effort, price, team shape or measured improvement for either chain,
 * and no assertion that the traditional chain is what any named firm does — the
 * source hedges it as what traditional consulting "commonly" ends with (L137),
 * and that hedge is transcribed intact.
 *
 * ZERO NUMERIC CLAIMS. L133–L175 contains no percentage, currency, count,
 * duration or date, and none is introduced.
 *
 * `Bilingual`-typed via `same()` (./content); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "./content";

/**
 * One depth in the matched before/after comparison — the traditional cell and
 * the OXOT cell that occupy the SAME position in their respective chains.
 *
 * The pairing is the data structure's whole job. `traditional` comes from
 * L139–L147, `oxot` from L151–L159, and a record's two fields are always drawn
 * from the same depth in each block.
 */
export interface OutcomeChainNode {
  /** DOM identity, not copy. Never derive a wired id from array position. */
  id: string;
  /** Depth in both chains. A real fact about the source blocks, not a rating. */
  index: string;
  /** Source L139–L147 — the traditional-consulting chain at this depth. */
  traditional: Bilingual;
  /** Source L151–L159 — the OXOT chain at this depth. */
  oxot: Bilingual;
  /**
   * True on the last pair only. Lets a renderer emphasise where the comparison
   * resolves without hard-coding `nodes.length - 1`.
   */
  terminal?: boolean;
}

/** One row of the L163–L171 need → contribution table. Not a diagram node. */
export interface TwinContribution {
  /** DOM identity, not copy. */
  id: string;
  /** Source column 1 — the consulting need. */
  need: Bilingual;
  /** Source column 2 — what the Cyber Digital Twin contributes to that need. */
  contribution: Bilingual;
}

export const TWIN = {
  /** Section anchor — matches the `"twin"` entry in ANCHORS (./content). */
  sectionId: "twin",
  /** Source L133 — the source's own name for this section. */
  datumLabel: same("The Cyber Digital Twin in consulting"),
  /** Source L135 — the section headline, printed as an h2 in the brief. */
  h2: same("The engagement delivers more than a report."),

  /**
   * The matched before/after comparison, L137–L159.
   *
   * `nodes` is the aligned pair list; the two `*Label` strings are the source's
   * own lead-in sentences for each side and are the only column headings the
   * source supplies for this diagram. The trailing colon is transcribed with
   * them because it is how the brief prints them.
   */
  outcomeChain: {
    /** Source L137. The hedge "commonly" is the source's and is preserved. */
    traditionalLabel: same("Traditional consulting commonly ends with:"),
    /** Source L149. Curly apostrophe as printed in the brief. */
    oxotLabel: same("OXOT’s model is:"),

    nodes: [
      {
        id: "twin-chain-1",
        index: "01",
        /** Source L140 / L152. */
        traditional: same("Assessment report"),
        oxot: same("Consulting engagement")
      },
      {
        id: "twin-chain-2",
        index: "02",
        /** Source L142 / L154. */
        traditional: same("Findings list"),
        oxot: same("Evidence-grounded Cyber Digital Twin")
      },
      {
        id: "twin-chain-3",
        index: "03",
        /** Source L144 / L156. */
        traditional: same("Remediation backlog"),
        oxot: same(
          "Priority decisions, tested options, and traceable rationale"
        )
      },
      {
        id: "twin-chain-4",
        index: "04",
        /** Source L146 / L158 — the terminal pair, where the chains resolve. */
        traditional: same("Manual follow-up"),
        oxot: same(
          "A model that can be handed over, extended, or operated alongside your team"
        ),
        terminal: true
      }
    ] satisfies readonly OutcomeChainNode[]
  },

  /** Source L161 — the subhead over the contribution table. */
  contributionsHeading: same("What the Twin contributes"),

  /** Source L163 — the table's own column headers, transcribed exactly. */
  contributionColumns: {
    need: same("Consulting need"),
    contribution: same("Cyber Digital Twin contribution")
  },

  contributions: [
    {
      id: "establish-scope",
      /** Source L165, both cells. */
      need: same("Establish scope"),
      contribution: same(
        "Models the site, facility, product, railway system, data center, operational service, or system under consideration"
      )
    },
    {
      id: "find-what-matters",
      /** Source L166, both cells. */
      need: same("Find what matters"),
      contribution: same(
        "Connects assets and vulnerabilities to actual pathways, safety/reliability context, dependencies, and operational consequence"
      )
    },
    {
      id: "design-architecture",
      /** Source L167, both cells. */
      need: same("Design architecture"),
      contribution: same(
        "Models zones, conduits, network state, remote access, required flows, and segmentation options"
      )
    },
    {
      id: "test-a-change",
      /** Source L168, both cells. */
      need: same("Test a change"),
      contribution: same(
        "Simulates firewall, routing, vendor-access, patch, replacement, or configuration changes before live deployment"
      )
    },
    {
      id: "compare-investments",
      /** Source L169, both cells. */
      need: same("Compare investments"),
      contribution: same(
        "Compares controls, supplier options, modernization paths, and sequencing against the same modeled outcomes"
      )
    },
    {
      id: "support-assurance",
      /** Source L170, both cells. */
      need: same("Support assurance"),
      contribution: same(
        "Links system, asset, risk, product, safety, supplier, and control evidence to applicable framework-oriented outputs"
      )
    },
    {
      id: "build-customer-capability",
      /** Source L171, both cells. */
      need: same("Build customer capability"),
      contribution: same(
        "Leaves the model, evidence, reasoning, and operating method with the customer rather than only a slide deck"
      )
    }
  ] satisfies readonly TwinContribution[],

  /** Source L173 — printed as an emphasised blockquote closing the section. */
  pullQuote: same(
    "If the estate is the problem, the Twin is the place to reason about it."
  ),

  /**
   * Source L175. The brief writes it as `**Inline CTA:** \`See how the Cyber
   * Digital Twin is built\``. Only the backticked label is customer copy; the
   * "Inline CTA:" prefix is an instruction to the builder and is recorded here
   * as a comment rather than shipped as body text.
   *
   * THE SOURCE SUPPLIES NO HREF, AND THAT HAS NOT CHANGED. L175 names a label
   * and no destination. The original note here said so and refused to invent
   * one, adding that "whatever wires this label is stating a routing fact the
   * source does not" — that is still exactly true, and `ctaHref` below is that
   * routing fact, now stated openly instead of left to a downstream component
   * to guess at.
   */
  ctaLabel: same("See how the Cyber Digital Twin is built"),
  /**
   * A RESOLVED ROUTING DECISION, NOT A TRANSCRIPTION FROM L175.
   *
   * The label promises to show how the Twin is built, so it goes to the Twin's
   * engine section: `PATHS.cdt2` + `#engine`. `/cdt-2` is the site's one Cyber
   * Digital Twin destination (see `shell/nav.ts` — `/twin` is retired and
   * 308-redirects there), and `#engine` is a real section id on that page,
   * carried in `primaryNav`'s own CDT-2 children as "The engine". Deep-linking
   * rather than pointing at `/cdt-2` bare means the reader lands on the
   * material the label promised instead of the top of a long page.
   *
   * Nothing about this is in the brief. If L175 is ever revised to name a
   * destination, that transcription replaces this decision and this comment.
   *
   * Locale-free, per `shell/nav.ts`: the locale is prefixed at render.
   */
  ctaHref: `${PATHS.cdt2}#engine`

  /* GAP, FLAGGED NOT FILLED: L133–L175 gives no example, customer, artefact
     screenshot, data-input list or evidence sample for the Twin. None is
     invented, and no empty slot is drawn for one — an unbuilt INTERACTION gets
     a visible placeholder; absent FACTS get silence. (The inline CTA's missing
     link target was on this list until it was resolved above — resolved
     against real routes, not filled in from the brief.) */
};
