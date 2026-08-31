/**
 * S01 · OPERATIONAL REALITY — copy slice for `/industries/manufacturing-process-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_manu-process.md, section "Operational reality", L80–L100. Every
 * value below carries the source line it came from. Nothing is invented; where
 * the source is silent, there is a comment saying so instead of a guess.
 *
 * THE CONCERNS TABLE IS PRINTED TWICE IN THE SOURCE AND RENDERED ONCE HERE.
 * L64–L73 carries the eight rows under no heading at all, mid-way through the
 * hero/interaction discussion; L91–L100 carries the SAME eight rows verbatim
 * under "Operational concerns: use as cards" (L89). The values below cite
 * L93–L100 — the occurrence that comes with the authoring instruction, and so
 * the one the brief actually means to be rendered. The earlier block is a
 * duplicate in the source document, not a second content requirement, and a
 * builder who renders both has shipped the same table twice.
 *
 * NOTHING IS LIFTED FROM THE REGULATORY SECTION. L273 and L275 also name IEC
 * 62443 and IEC 61511, with fuller scope statements, and they belong to S08.
 * No lift was needed: unlike the Energy build — whose L74 cited an instrument
 * by informal name only, forcing a narrow lift of its designation from L277 —
 * this page's L87 gives each of its two instruments its own scope clause in the
 * cited sentence itself. The citation panel is built from that sentence alone.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation,
 * not a claim that this text is correct Dutch.
 */
import { same } from "../registry";

/**
 * Source L87, verbatim from the markdown link target. Verified live (HTTP 200,
 * no redirect) on 2026-08-26. Exported separately so the component links the
 * same URL the citation names rather than carrying a second copy of it. The
 * source cites this identical URL again at L7, in the positioning preamble —
 * that occurrence belongs to no rendered section and is not carried anywhere.
 */
export const DRAGOS_IEC_62443_URL = "https://www.dragos.com/insights/iec-62443";

export const REALITY = {
  /** Source L80, the section's own name in the brief. */
  datumLabel: same("Operational reality"),

  /** Source L81. */
  h2: same("The plant cannot stop just because security needs to change."),

  /* Source L85 (both sentences) and L87 (FIRST sentence only) — verbatim,
     split into paragraphs at the sentence boundaries the SOURCE ITSELF writes.
     Splitting at an authored boundary is a rendering decision, the same one
     `content.ts` makes elsewhere on this page; no word is changed, added or
     dropped, and the source's own em dash in the second paragraph is kept.

     L87'S SECOND SENTENCE IS DELIBERATELY ABSENT FROM THIS ARRAY. That
     sentence is the one carrying the citation marker, and it is rendered in
     the evidence panel below instead. Keeping it here as well would print the
     page's one cited claim twice, once as prose and once as evidence. */
  narrative: [
    /** Source L85, first sentence. */
    same(
      "Manufacturers manage long-lived automation, partial asset records, production pressures, contractor access, and incremental changes made over years."
    ),
    /** Source L85, second sentence. */
    same(
      "A vulnerability, firewall rule, remote-access pathway, or control-system replacement is not only a cyber decision—it can affect quality, throughput, equipment integrity, safety barriers, environmental containment, and restart risk."
    ),
    /** Source L87, first sentence. */
    same(
      "In a process environment, cyber controls must be designed around operational constraints: deterministic or time-sensitive communications, continuous-process behavior, legacy controllers, vendor dependencies, scheduled shutdown windows, and safety-instrumented functions."
    )
  ],

  /* THE CITED EVIDENCE PANEL — source L87's second sentence, which is the one
     external citation this page's copy rests on, and the reason S01 alone takes
     the H-B header recipe (see Rule.tsx).

     TWO INSTRUMENTS, NOT ONE, so the sentence is rendered as two rows split at
     its own "…, while …" conjunction. Each half already names its instrument
     and states what that instrument does, so the split is a rendering decision
     of the same class as the paragraph splits above — no clause is rewritten,
     and the two halves recombine into the source sentence word for word.

     NO OFFICIAL STANDARD TITLES ARE ADDED. "IEC 62443" and "IEC 61511" appear
     here exactly as the source writes them. Supplying the published titles of
     either standard would be an engineering fact sourced from outside this
     brief, and the scope clauses below already tell a reader what each one
     covers. No date, edition, part number or in-scope/out-of-scope gloss is
     added for the same reason. */
  citation: {
    instruments: [
      {
        /** Source L87, second sentence, first clause. */
        name: same("IEC 62443"),
        /* "these" refers to the operational constraints listed in the third
           narrative paragraph, which precedes this panel in DOM order at every
           width — beside it at `lg`, above it when stacked. The pronoun
           resolves as the source wrote it, so it is not rewritten. */
        role: same("Recognizes these IACS-specific constraints.")
      },
      {
        /** Source L87, second sentence, second clause. */
        name: same("IEC 61511"),
        role: same(
          "Addresses the lifecycle requirements for safety-instrumented systems used to bring or maintain processes in a safe state."
        )
      }
    ],
    /* Source L87's own link text, verbatim. The brief writes the citation as
       `[dragos](…)`; the label is not re-titled into something tidier, because
       a citation's visible source label should be the one the brief's author
       chose. */
    sourceLabel: same("dragos"),
    href: DRAGOS_IEC_62443_URL
  },

  /** Source L91 — the brief's own two column headers for the concerns matrix.
   *  "…to the buyer" is the brief's wording and is kept. */
  concernLabel: same("Concern"),
  whyLabel: same("Why it matters to the buyer"),

  /* Source L93–L100, all eight rows, both cells verbatim. The brief's heading
     at L89 says to render these "as cards"; they are NOT cards here. See the
     component's docblock for why — eight visually equal cards is barred by
     OXOT_Visual_Rules.md L13, which is site-wide and binding. */
  concerns: [
    {
      /** Source L93. */
      name: same("Continuous production"),
      whyItMatters: same(
        "Stopping a line, reactor, furnace, kiln, compressor, or utility system can create quality loss, restart risk, lost production, and safety exposure"
      )
    },
    {
      /** Source L94. */
      name: same("Process safety"),
      whyItMatters: same(
        "Manipulation of a setpoint, interlock, valve, controller, or alarm can create loss-of-containment, thermal, pressure, chemical, or mechanical consequences"
      )
    },
    {
      /** Source L95. */
      name: same("Product quality"),
      whyItMatters: same(
        "Cyber-caused recipe, batch, dosing, temperature, pressure, timing, or traceability changes may result in scrap, quarantine, rework, recall, or customer nonconformance"
      )
    },
    {
      /** Source L96. */
      name: same("Asset integrity"),
      whyItMatters: same(
        "Equipment can be damaged by abnormal starts/stops, vibration, temperature excursions, cavitation, pressure excursions, or operation outside design limits"
      )
    },
    {
      /** Source L97. */
      name: same("Brownfield complexity"),
      whyItMatters: same(
        "Asset records, drawings, firmware versions, network diagrams, and installed configurations often diverge over time"
      )
    },
    {
      /** Source L98. */
      name: same("Shutdown constraints"),
      whyItMatters: same(
        "Patching, segmentation, upgrades, and replacements may require outages that are rare, costly, and operationally risky"
      )
    },
    {
      /** Source L99. */
      name: same("Remote support"),
      whyItMatters: same(
        "OEMs, systems integrators, and contractors need access, but unmanaged or persistent access paths increase exposure"
      )
    },
    {
      /** Source L100. */
      name: same("Multi-site variation"),
      whyItMatters: same(
        "Sites using similar equipment often have different network states, safety studies, process constraints, suppliers, and local threat context"
      )
    }
  ]

  /* GAP, FLAGGED NOT FILLED: the source gives the eight concerns no ordering,
     ranking, severity or grouping — in either of the two places it prints them.
     They render in source order with no ordinal, index or severity styling, so
     the list makes no claim the brief does not. */
};
