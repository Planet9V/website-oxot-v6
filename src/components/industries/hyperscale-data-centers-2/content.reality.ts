/**
 * HYPERSCALE & DATA CENTERS 2 — S02 SECTOR REALITY.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md, L104–L136. Every value below carries the source line
 * it came from. Nothing is invented; where the source is silent there is a
 * flagged gap rather than a filled-in guess. The live page at
 * `/industries/hyperscale-data-centers` was neither read nor referenced.
 *
 * THE 500 kW FIGURE IS THE SOURCE'S OWN REGULATORY FRAMING, NOT AN OXOT CLAIM.
 * content.ts's claim rule bars percentages, money values, annual-loss figures
 * and "verified" language, and permits exactly two figures on this page. This
 * file carries one of them: the EU Energy Efficiency Directive's reporting
 * threshold at L119. It is stated here as what the source states it to be — the
 * installed IT power demand at or above which an EU operator owes an annual
 * energy-performance report — and never as a capability, coverage, capacity or
 * performance figure belonging to OXOT or to the Cyber Digital Twin. Source
 * L458's standing instruction applies to it as it does to the rest of the page:
 * nothing here promises a compliance, certification or assurance outcome, and
 * nothing here tells any reader whether they are in scope.
 *
 * `Bilingual` throughout via `same()` (../registry): both locales render, `nl`
 * is a same-as-English placeholder pending translation, not a claim that this
 * text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/**
 * The brief's own link, transcribed verbatim from L119 — the European
 * Commission's energy-performance-of-data-centres page, which is the publisher
 * of the reporting scheme the sentence describes. Unlike the Rail page's NIS2
 * row, no URL had to be supplied here: this claim arrives with its source
 * attached.
 */
export const EED_DATA_CENTRES_URL =
  "https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive/energy-performance-data-centres_en";

export interface Challenge {
  id: string;
  /** Source column 1, "Challenge". */
  challenge: Bilingual;
  /** Source column 2, "Why it matters in hyperscale data centers". */
  why: Bilingual;
}

export const REALITY = {
  /** Section name at the head of the path pair. Source L104. */
  datumLabel: same("Sector reality"),
  /** Source L108, verbatim, including its unspaced em-dash. A two-clause
   *  sentence carrying an em-dash correction — see Rule.tsx on why H-B's h2
   *  must not be balanced. */
  h2: same(
    "The data center is a cyber-physical availability system—not a collection of servers."
  ),

  /* THE NARRATIVE PANE — source L112, split at the source's own sentence
     boundaries into three paragraphs, no word changed:
       P1  what the design is built around;
       P2  the pivot — redundancy is not independence;
       P3  the inventory, and the small shared set that can still bridge it.
     The paragraphing is this file's; the sentences and their order are the
     brief's. */
  narrative: [
    same(
      "Hyperscale data centers are designed around redundancy, compartmentalization, maintenance without interruption, and rapid recovery."
    ),
    same("But redundancy does not eliminate dependency."),
    same(
      "A facility may have multiple utility feeds, generators, UPS strings, chilled-water loops, cooling towers, BMS controllers, EPMS meters, DCIM platforms, industrial networks, cloud management services, and specialist vendors—yet a small number of shared controls, communications paths, procedures, or supply-chain components can still create common-mode failure."
    )
  ],

  /**
   * THE CITED-EVIDENCE PANEL — one outside instrument, from source L119.
   *
   * This is why S02 takes header recipe H-B and no other section on this page
   * does: the section's load-bearing claim stands on a real instrument with a
   * real publisher rather than on OXOT's framing, and L119 is the only sentence
   * in the brief's body sections that arrives carrying its own source link.
   *
   * ONE INSTRUMENT, TWO CLAUSES, AND THE SOURCE'S OWN SEMICOLON IS THE SPLIT.
   * L119 is a single sentence in three parts: a scoping phrase, the reporting
   * DUTY and its threshold, then — after a semicolon — what the reporting
   * scheme COVERS. Those are two different assertions about the same
   * instrument, so they are two fields rather than one wall of text, and the
   * boundary between them is the source's own punctuation rather than an
   * editorial cut.
   *
   * THE ONLY EDITS ARE TWO CAPITALS. `jurisdiction` lifts the brief's own
   * scoping words "For EU operators" out of the sentence head, exactly as the
   * Rail page lifts "For the European market"; `duty` and `scope` therefore
   * begin at what were mid-sentence positions, and each has its leading "the"
   * capitalised. No other character differs from L119.
   *
   * `sourceLabel` IS THE BRIEF'S OWN LINK LABEL, verbatim — L119 writes
   * `[energy.ec.europa]`, which is not quite the host name in the URL beside
   * it. It is transcribed as written rather than tidied into
   * "energy.ec.europa.eu", because the label is source text and the href is the
   * thing that has to resolve.
   *
   * NO INVENTED REGULATORY FACT. No directive number, recast year,
   * transposition deadline, first-reporting date, delegated-regulation
   * reference or entity threshold beyond the one the source states appears
   * here.
   */
  citation: {
    /** Source L119, the brief's own scoping phrase. */
    jurisdiction: same("For EU operators"),
    /** Source L119. */
    name: same("Energy Efficiency Directive"),
    /** Source L119, first clause. */
    duty: same(
      "The Energy Efficiency Directive requires annual energy-performance reporting for sites with installed IT power demand of 500 kW or more."
    ),
    /** Source L119, second clause, after the source's own semicolon. */
    scope: same(
      "The reporting scheme covers energy use, water use, waste heat, grid-service participation, and related performance indicators."
    ),
    /** Source L119's own link label. */
    sourceLabel: same("energy.ec.europa"),
    href: EED_DATA_CENTRES_URL
  },

  /** Source L114, verbatim, including its trailing colon — the sentence is only
   *  finished by the two sides beneath it, so it sits with them rather than in
   *  the narrative pane. */
  claimLead: same(
    "The Cyber Digital Twin should expose both sides of the availability claim:"
  ),

  /**
   * THE TWO SIDES OF THE AVAILABILITY CLAIM — source L116 and L117, verbatim.
   *
   * THIS IS THE PAGE'S OWN IDIOM WRITTEN OUT IN WORDS, which is why it gets a
   * treatment of its own rather than being folded into the narrative: Rule.tsx's
   * datum is two parallel runs bridged by one cross-tie, and L116/L117 are
   * literally the two runs and the things that bridge them. Rendering them as
   * two side-by-side panes is the section reusing the page's argument, not
   * decorating it.
   *
   * THE ASYMMETRY IS THE ARGUMENT AND IS LEFT UNTOUCHED. The redundant side
   * names five things; the shared side names twelve. That imbalance is exactly
   * what P2 of the narrative asserts — redundancy does not eliminate dependency
   * — so neither side is padded, trimmed, or re-cut to make the two panes look
   * alike.
   *
   * EACH SIDE STAYS THE SOURCE'S OWN COMMA RUN, NOT A BULLET LIST. Splitting
   * the runs at their commas would show the 5-vs-12 count more bluntly, but it
   * would also strand the source's trailing period on a final fragment and
   * re-form a sentence the brief wrote as a sentence. The count is legible
   * enough from the two panes' rendered depth.
   *
   * `label` KEEPS THE SOURCE'S COLON. L116 and L117 write these as bolded
   * run-in labels ending in a colon, and each one introduces the run beside it
   * rather than standing as a heading over it.
   */
  sides: [
    {
      id: "redundant",
      /** Source L116. */
      label: same("What is redundant:"),
      body: same(
        "A/B power paths, N+1 cooling, multiple generators, spare capacity, multi-site failover."
      )
    },
    {
      id: "shared",
      /** Source L117. */
      label: same("What is shared:"),
      body: same(
        "BMS servers, identity systems, management workstations, remote-access gateways, time services, firmware, vendor tooling, switchgear-control networks, water source, utility substation, fuel logistics, and human procedures."
      )
    }
  ],

  /**
   * THE HYPERSCALE-SPECIFIC CHALLENGE REGISTER — all twelve rows at L125–L136,
   * verbatim, in the source's own order.
   *
   * NO GROUPING, NO ORDINALS, NO RANKING. The source prints these as a flat
   * twelve-row table with no score, no severity, no precedence and no stated
   * theme. Rail's equivalent register is grouped by subject because that page's
   * seven outcomes name four plainly different subjects; these twelve do not
   * partition that way — "Vendor density", "Supply-chain concentration" and
   * "Scale and repeatability" each reach into both the estate and the
   * procurement story — so an invented grouping would assert an analysis the
   * brief does not make. Twelve flat rows are what the source has.
   *
   * NO ROW IS DROPPED AND NONE IS MERGED, including the three (rows 8, 9, 12)
   * that the brief develops again later in its energy, water and sustainability
   * material. This register is their first statement and stands on its own.
   *
   * NO TRAILING PERIODS. The source's own table cells carry none, and adding
   * them would be twelve silent edits to visitor-facing text.
   */
  challenges: [
    {
      id: "layered-availability",
      /** Source L125. */
      challenge: same("Availability is engineered in layers"),
      why: same(
        "The site may tolerate a component failure but not a hidden common-mode dependency across redundant paths"
      )
    },
    {
      id: "electrical-cooling-inseparable",
      /** Source L126. */
      challenge: same(
        "Electrical and cooling systems are inseparable from compute availability"
      ),
      why: same(
        "A cyber issue affecting switchgear, generator controls, UPS monitoring, cooling plant, or BMS can consume redundancy and turn a minor physical event into a capacity event"
      )
    },
    {
      id: "continuous-expansion",
      /** Source L127. */
      challenge: same("Expansion is continuous"),
      why: same(
        "New halls, substations, chillers, generators, battery systems, liquid-cooling loops, interconnects, and tenants are introduced while existing operations remain live"
      )
    },
    {
      id: "commissioning-change-risk",
      /** Source L128. */
      challenge: same("Commissioning and change risk"),
      why: same(
        "A control change that looks correct on a diagram can interrupt monitoring, failover, protection coordination, sequencing, or emergency operating procedures"
      )
    },
    {
      id: "vendor-density",
      /** Source L129. */
      challenge: same("Vendor density"),
      why: same(
        "Electrical, mechanical, BMS, EPMS, DCIM, UPS, generator, cooling, fire/life-safety, and network vendors all bring support tools, remote-access workflows, firmware, and maintenance dependencies"
      )
    },
    {
      id: "it-ot-convergence",
      /** Source L130. */
      challenge: same("IT/OT convergence"),
      why: same(
        "Cloud management, DCIM, telemetry, APIs, virtualized controllers, identity, monitoring, and facility systems increasingly exchange data and operational dependencies"
      )
    },
    {
      id: "scale-repeatability",
      /** Source L131. */
      challenge: same("Scale and repeatability"),
      why: same(
        "Standardized designs create fleet efficiency, but a shared firmware image, BMS template, controller family, or supplier issue can propagate across campuses"
      )
    },
    {
      id: "power-scarcity",
      /** Source L132. */
      challenge: same("Power scarcity and grid dependency"),
      why: same(
        "Utility interconnection delays, curtailment, grid events, demand response, on-site generation, and power-quality issues can constrain expansion and availability"
      )
    },
    {
      id: "water-cooling-constraints",
      /** Source L133. */
      challenge: same("Water and cooling constraints"),
      why: same(
        "Cooling design may depend on water availability, treatment, discharge, heat-reuse commitments, ambient temperature, or local permitting"
      )
    },
    {
      id: "customer-sovereign-commitments",
      /** Source L134. */
      challenge: same("Customer and sovereign commitments"),
      why: same(
        "A facility can host commercial cloud, financial, healthcare, AI, telecommunications, government, or defense workloads with different isolation, residency, continuity, and incident-management obligations"
      )
    },
    {
      id: "supply-chain-concentration",
      /** Source L135. */
      challenge: same("Supply-chain concentration"),
      why: same(
        "Long lead times for transformers, switchgear, generators, UPS systems, batteries, chillers, controllers, optics, servers, and network gear make resilience a procurement and lifecycle problem"
      )
    },
    {
      id: "sustainability-evidence",
      /** Source L136. */
      challenge: same("Sustainability evidence"),
      why: same(
        "Energy, water, waste-heat, renewable-power, and capacity reporting increasingly become operating data that must be accurate, defensible, and linked to the real facility"
      )
    }
  ] as Challenge[]

  /* GAP, FLAGGED NOT FILLED: the register's own column headers at L123 —
     "Challenge" and "Why it matters in hyperscale data centers" — are NOT
     carried into this file, and the omission is deliberate rather than an
     oversight. They name the two columns of a source table; the rendered
     register stacks each challenge above its clause and flows the twelve
     entries through two equal tracks, so there is no term column and no clause
     column for those two words to head. Manufacturing's equivalent register
     does print its source headers, because there the layout really is a term
     rail beside a clause. Printing them here would label furniture that is not
     on the page. See SectorReality.tsx for why the register takes that shape. */
};
