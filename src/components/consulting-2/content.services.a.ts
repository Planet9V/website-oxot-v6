/**
 * CONSULTING SERVICES — section intro plus services 01–03, for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md — section intro L179–L185, service 01 L187–L221, service 02
 * L225–L258, service 03 L262–L298. Every exported string carries the source
 * line it was transcribed from. Nothing is invented.
 *
 * ONE SHAPE FOR ALL SIX SERVICES. The brief writes each of its six services to
 * an identical skeleton — buyer quote, lead paragraph, "What we do" bullets,
 * "What you receive" list, "Best for" bullets, CTA — so `ConsultingService` is
 * exported as the single record type for the whole set. Services 04–06 live in
 * a sibling file and import this interface; the six are one list rendered by
 * one component, not six bespoke blocks.
 *
 * "WHAT YOU RECEIVE" IS A LIST, NOT A FLOW. L204, L242 and L279 are fenced
 * `text` blocks in the source, but they contain no arrows, no numbering and no
 * stated order — they are deliverable inventories. They are modelled as plain
 * string arrays precisely so nothing downstream mistakes a code fence for a
 * pipeline and renders a diagram of it.
 *
 * NOW / NEXT / ACCEPTED IS A CLASSIFICATION WITH NO EXAMPLES. L200 and L244
 * name the three states and the source supplies ZERO example items for any of
 * them. The states ship exactly as the source words them, inside their own
 * bullets. No populated NOW/NEXT/ACCEPTED list is invented here, and none may
 * be invented downstream — a fabricated risk classification would read as this
 * page's most concrete engineering claim while being its least grounded one.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency, duration, count, headcount,
 * customer name or certification appears in this section of the brief. The only
 * numerals below are the service indices ("01"–"03") and the standard
 * designation IEC 62443-3-2 (L298) — both the source's own. The word "Six" in
 * the section heading (L181) is likewise the source's own, and counts the cards
 * on this page rather than asserting anything about delivery.
 *
 * The only citation in this range is L298's link to webstore.iec.ch, a stable
 * publisher URL, so it ships. (Expiring citation URLs elsewhere in the brief are
 * outside this file's range.)
 */
import type { Bilingual } from "@/i18n/bilingual";
import { PATHS } from "@/components/shell/nav";
import { same } from "./content";

/**
 * One consulting service card. Shared by services 01–06 across both content
 * slices — do not fork it per service.
 */
export interface ConsultingService {
  /** DOM identity and anchor target, not copy. Never derive from array
   *  position, never translate. */
  id: string;
  /** The source's own service number. A fact about the brief's running order,
   *  not a rating or a sequence the buyer must follow. */
  index: string;
  /** The service name, with the index stripped off the source's heading. */
  title: Bilingual;
  /** The buyer's line, printed by the source as a bold blockquote directly
   *  under the heading. Curly quotation marks are the source's. */
  buyerQuote: Bilingual;
  /** The single paragraph under the quote. */
  lead: Bilingual;
  /** "What we do" — the source's bullet list, in source order. */
  whatWeDo: readonly Bilingual[];
  /** "What you receive" — a deliverables LIST. Unordered and unconnected in the
   *  source; must not be rendered as a flow, funnel or timeline. */
  whatYouReceive: readonly Bilingual[];
  /** "Best for" — buyer-recognition bullets. Descriptions of who is reading,
   *  not deliverables and not instructions. */
  bestFor: readonly Bilingual[];
  /** The service's own CTA label. */
  cta: Bilingual;
  /**
   * Where that CTA goes.
   *
   * A RESOLVED ROUTING DECISION, NOT A TRANSCRIPTION. The brief gives each of
   * the six services a CTA label (L221, L258, L296, L336, L374, L411) and names
   * no destination for any of them — there is no href in L187–L411 to
   * transcribe. All six labels are "Discuss …" asks, so all six resolve to
   * `PATHS.contact`, the site's one verified place a conversation can start.
   * That is a decision made here on the site's behalf, and it is recorded as
   * one; if the brief is ever revised to name per-service destinations, this
   * field is where they land and this comment is what they replace.
   *
   * Locale-free, per `shell/nav.ts`: the locale is prefixed at render, never
   * stored. Never write `/en/...` here.
   */
  ctaHref: string;
  /** An optional standards note the source prints after the CTA. Present only
   *  where the brief supplies one. */
  standardsNote?: {
    text: Bilingual;
    /** Link label and href exactly as the source gives them. */
    linkLabel: Bilingual;
    href: string;
  };
}

export const SERVICES_INTRO = {
  /** Section anchor, matching ANCHORS in ./content. */
  sectionId: "services",
  /** Source L179 — the source's own section title. */
  datumLabel: same("Consulting services"),
  /** Source L181. */
  h2: same("Six services. One operating model."),
  /** Source L183, the section's blockquote lead. */
  lead: same(
    "Each service can stand alone. Together, they form a long-term OT cybersecurity and resilience programme. Every engagement can feed the Cyber Digital Twin, increasing the quality, efficiency, and long-term value of the work."
  )

  /* BUILDER INSTRUCTION, NOT BODY COPY — source L185: "Use six service cards,
     each opening an accordion or linking to an on-page anchor at launch." That
     is direction to whoever builds the section and must never ship as text on
     the page. The page-level choice between the two options is recorded in
     ./content (anchors, not accordions). */
};

export const SERVICES_A = [
  {
    id: "assessments",
    /** Source L187 — "### 01 — OT Security Assessments". */
    index: "01",
    title: same("OT Security Assessments"),
    /** Source L189. */
    buyerQuote: same("“Tell me where we actually stand.”"),
    /** Source L191. */
    lead: same(
      "A measured answer for one facility, process line, zone, railway system, product environment, or critical operational service—not a scored questionnaire."
    ),
    /** Source L195–L200. The last bullet names the NOW / NEXT / ACCEPTED
     *  classification; the source gives no example item for any of the three
     *  states, and none is supplied. */
    whatWeDo: [
      same("Define the system under consideration."),
      same(
        "Review engineering, OT, asset, configuration, topology, and operational evidence."
      ),
      same(
        "Identify relevant assets, interfaces, dependencies, and cyber pathways."
      ),
      same(
        "Assess vulnerabilities, exposure, remote access, segmentation, supplier, and lifecycle conditions."
      ),
      same(
        "Connect findings to safety, reliability, availability, quality, service, environmental, or mission consequence."
      ),
      same("Produce prioritized NOW / NEXT / ACCEPTED decisions.")
    ],
    /** Source L205–L210. A list, not a flow. */
    whatYouReceive: [
      same("System and asset view"),
      same("Cyber pathway and consequence analysis"),
      same("Prioritized action queue"),
      same("Quick wins and strategic recommendations"),
      same("Risk-treatment rationale"),
      same("Evidence and decision record")
    ],
    /** Source L215–L219. */
    bestFor: [
      same("A new facility or system scope."),
      same("Pre-acquisition or technical due diligence."),
      same(
        "A high-priority plant, line, zone, route, data hall, or product environment."
      ),
      same(
        "An operator who needs an accurate baseline before funding a programme."
      ),
      same("A team with a large vulnerability backlog and no defensible order.")
    ],
    /** Source L221. */
    cta: same("Discuss an OT security assessment"),
    /** Resolved, not transcribed — L221 states no destination. See
     *  `ConsultingService.ctaHref`. */
    ctaHref: PATHS.contact
  },
  {
    id: "programmes",
    /** Source L225 — "### 02 — OT Security Programmes". */
    index: "02",
    title: same("OT Security Programmes"),
    /** Source L227. */
    buyerQuote: same("“Give engineering a queue for Monday.”"),
    /** Source L229. */
    lead: same(
      "A multi-year programme that turns a register of findings into scheduled, accountable engineering work."
    ),
    /** Source L233–L238. */
    whatWeDo: [
      same("Turn assessment findings into a risk-based roadmap."),
      same(
        "Prioritize actions by consequence, reachability, cost, operational constraints, and lifecycle opportunity."
      ),
      same(
        "Align work with shutdowns, possessions, maintenance windows, capital programmes, modernization plans, and supplier lifecycles."
      ),
      same(
        "Define ownership across operations, controls, IT, security, safety, maintenance, procurement, and leadership."
      ),
      same(
        "Maintain risk, supplier, evidence, and change deltas through the Cyber Digital Twin."
      ),
      same(
        "Support governance reporting without separating it from engineering work."
      )
    ],
    /** Source L243–L248. A list, not a flow. Its second entry names the
     *  NOW / NEXT / ACCEPTED states and, as at L200, the source populates none
     *  of them — the backlog is named, never exemplified. */
    whatYouReceive: [
      same("Multi-year OT cybersecurity roadmap"),
      same("NOW / NEXT / ACCEPTED backlog"),
      same("Programme governance and ownership model"),
      same("Investment and sequencing rationale"),
      same("Change and evidence review cycle"),
      same("Executive and engineering reporting views")
    ],
    /** Source L253–L256. */
    bestFor: [
      same("Multi-site operators."),
      same("Organizations moving from assessment to implementation."),
      same(
        "Operators with aging OT, deferred maintenance, inconsistent site practices, or major modernization programmes."
      ),
      same("Teams that need to align security work with operational planning.")
    ],
    /** Source L258. */
    cta: same("Discuss an OT security programme"),
    /** Resolved, not transcribed — L258 states no destination. See
     *  `ConsultingService.ctaHref`. */
    ctaHref: PATHS.contact
  },
  {
    id: "architecture",
    /** Source L262 — "### 03 — Architecture & Segmentation". Ampersand is the
     *  source's. */
    index: "03",
    title: same("Architecture & Segmentation"),
    /** Source L264. */
    buyerQuote: same("“Design it so it survives production.”"),
    /** Source L266. */
    lead: same(
      "Zones and conduits that operators can run, maintainers can work in, and security teams can explain."
    ),
    /** Source L270–L275. */
    whatWeDo: [
      same(
        "Define the system boundary, zones, conduits, and required communication flows."
      ),
      same(
        "Model Purdue context, VLANs, subnets, firewall rules, routing, engineering paths, vendor access, historians, and data flows."
      ),
      same(
        "Identify uncontrolled pathways, shared services, weak boundaries, and common-mode dependencies."
      ),
      same(
        "Test segmentation, virtual firewalls, DMZ changes, access restrictions, and migration sequences in the Twin."
      ),
      same(
        "Preserve required operational, diagnostic, safety, maintenance, and recovery flows."
      ),
      same(
        "Create a design that can be implemented and validated in planned operational windows."
      )
    ],
    /** Source L280–L286. A list, not a flow — note especially that
     *  "Implementation and validation sequence" NAMES a sequence as a
     *  deliverable; it does not supply one, and no step order may be drawn. */
    whatYouReceive: [
      same("Zones and conduits model"),
      same("Required-flow and prohibited-flow analysis"),
      same("Target security-level support material"),
      same("Segmentation architecture"),
      same("Candidate firewall and access-control strategy"),
      same("Implementation and validation sequence"),
      same("Residual-risk and exception record")
    ],
    /** Source L291–L294. The last bullet (L294) is buyer-recognition copy —
     *  it describes a reader whose segmentation work has stalled. It is NOT a
     *  deliverable and NOT an instruction to draw a future-state diagram. */
    bestFor: [
      same("An OT/IT convergence project."),
      same("A plant, utility, rail, data-center, or facility network redesign."),
      same("A new build, expansion, modernization, or control-system refresh."),
      same(
        "A security programme where network segmentation has become a stalled “future state” diagram."
      )
    ],
    /** Source L296. */
    cta: same("Discuss architecture and segmentation"),
    /** Resolved, not transcribed — L296 states no destination. See
     *  `ConsultingService.ctaHref`. Distinct from `standardsNote.href` below,
     *  which IS a transcription: L298 prints that URL. */
    ctaHref: PATHS.contact,
    /** Source L298. The only citation in this range, and a stable publisher
     *  URL, so it ships as given. */
    standardsNote: {
      text: same(
        "IEC 62443-3-2 establishes a risk-based process for defining the system under consideration, partitioning it into zones and conduits, assessing risk, setting target security levels, and documenting security requirements."
      ),
      linkLabel: same("webstore.iec"),
      href: "https://webstore.iec.ch/en/publication/30727"
    }
  }
] satisfies readonly ConsultingService[];
