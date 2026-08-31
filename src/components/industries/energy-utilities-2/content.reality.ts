/**
 * S01 · OPERATIONAL REALITY — copy slice for `/industries/energy-utilities-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_energy.md, section "Operational reality", L62–88. Every value below
 * carries the source line it came from. Nothing is invented; where the source
 * is silent, there is a comment saying so instead of a filled-in guess.
 *
 * ONE VALUE REACHES OUTSIDE L62–88, DELIBERATELY AND NARROWLY. The instrument
 * cited at L74 is named there only as "the Electricity Cybersecurity Network
 * Code". Its formal designation — Commission Delegated Regulation (EU)
 * 2024/1366 — and the fact that it is binding and directly applicable are
 * stated at L277, in the regulatory section, against THE SAME URL. Naming a
 * cited legal instrument by its actual designation is not a claim beyond the
 * source; suppressing it would leave a citation panel that cannot be looked up.
 * NOTE FOR THE S08 (regulatory) BUILDER: L277 is yours. The two values lifted
 * here are the designation and the binding/directly-applicable status only —
 * L277's scope sentence and its recurrent-risk-assessment clause are untouched
 * and remain S08's to render.
 *
 * `Bilingual`-typed via `same()` (../registry), matching `content.ts`. Both
 * locales render; `nl` is a same-as-English placeholder pending translation,
 * not a claim that this text is correct Dutch.
 */
import { same } from "../registry";

/**
 * Source L74, verbatim from the markdown link target. Verified live (HTTP 200,
 * no redirect) on 2026-08-26. Exported separately so the component links the
 * same URL the citation text names, rather than carrying two copies of it.
 */
export const EU_NETWORK_CODE_URL =
  "https://energy.ec.europa.eu/topics/energy-security/critical-infrastructure-and-cybersecurity_en";

export const REALITY = {
  /** Source L62, the section's own name in the brief. */
  datumLabel: same("Operational reality"),

  /** Source L66. */
  h2: same("In energy, a cyber change can become a reliability event."),

  /* Source L70 and L72, verbatim — split into four paragraphs at the sentence
     boundaries the SOURCE ITSELF writes (two sentences per source paragraph).
     Splitting at an authored boundary is a rendering decision, the same one
     `content.ts` makes for L170 and L258; no word is changed, added or
     dropped, and the source's own curly quotes around "best practice" are kept
     as written. */
  narrative: [
    /** Source L70, first sentence. */
    same(
      "Energy operators manage assets that must remain safe and available through changing load, weather, market conditions, maintenance activity, and external threat pressure."
    ),
    /** Source L70, second sentence. */
    same(
      "Control environments are distributed, long-lived, and highly interconnected: substations, generation units, control centers, field communications, protection systems, remote operations, OEM support, market interfaces, and enterprise systems all create dependencies."
    ),
    /** Source L72, first sentence. */
    same(
      "A security control that looks straightforward in IT—an access change, firewall rule, software update, certificate rollover, segmentation redesign, or vendor connection restriction—can affect telemetry, protection coordination, dispatch, plant control, remote diagnostics, alarm visibility, or recovery procedures."
    ),
    /** Source L72, second sentence. */
    same(
      "The correct question is therefore not simply whether a control is “best practice,” but whether it reduces real exposure while preserving the required operating function."
    )
  ],

  /* THE CITED EVIDENCE PANEL. This section's load-bearing claim is a genuine
     external instrument, which is why S01 — and only S01 — takes the H-B header
     recipe (see Rule.tsx). Four content elements, all transcribed: designation,
     status, the L74 finding, and the source link. No summary, paraphrase or
     "what this means for you" gloss is added: a citation panel that restates
     its own citation in the site's voice is no longer evidence. */
  citation: {
    /** Source L74 names the code; L277 gives its formal designation. */
    instrument: same("EU Electricity Cybersecurity Network Code"),
    designation: same("Commission Delegated Regulation (EU) 2024/1366"),
    /* Source L277's predicate — "is binding and directly applicable" — lifted
       as a standalone status line. The only edit is dropping the leading
       subject, which the line above already names. */
    status: same("Binding and directly applicable."),
    /** Source L74, verbatim, less its trailing citation marker. */
    finding: same(
      "For EU electricity entities with high or critical impact on cross-border flows, the Electricity Cybersecurity Network Code establishes sector-specific requirements for cybersecurity planning, risk assessment, monitoring, reporting, and crisis management."
    ),
    /* Source L74's own link text, verbatim. The brief writes the citation as
       `[energy.ec.europa](…)`; the label is not re-titled into something
       tidier, because a citation's visible source label should be the one the
       brief's author chose. */
    sourceLabel: same("energy.ec.europa"),
    href: EU_NETWORK_CODE_URL
  },

  /** Source L78 — the brief's own two column headers for the concerns matrix. */
  concernLabel: same("Concern"),
  whyLabel: same("Why it matters"),

  /* Source L80–88, all nine rows, both cells verbatim. The brief's heading at
     L76 suggests rendering these "as cards"; they are NOT cards here. See the
     component's docblock for why — nine visually equal cards is barred by
     OXOT_Visual_Rules.md L13, which is site-wide and binding. */
  concerns: [
    {
      /** Source L80. */
      name: same("Reliability and continuity"),
      whyItMatters: same(
        "A loss of visibility, control, protection, dispatch capability, or communications can propagate beyond one asset or site"
      )
    },
    {
      /** Source L81. */
      name: same("Safety and environmental exposure"),
      whyItMatters: same(
        "Generation, gas, hydrogen, thermal, hydro, storage, and district-energy assets can involve pressure, temperature, combustion, chemical, electrical, and containment hazards"
      )
    },
    {
      /** Source L82. */
      name: same("Protection-system integrity"),
      whyItMatters: same(
        "Incorrect relay settings, time synchronization, communications, or engineering access can affect fault detection, isolation, and restoration"
      )
    },
    {
      /** Source L83. */
      name: same("Distributed operations"),
      whyItMatters: same(
        "Utilities may operate thousands of field devices, substations, renewable sites, DERs, meters, and remote communications paths"
      )
    },
    {
      /** Source L84. */
      name: same("Interdependence"),
      whyItMatters: same(
        "Electricity, gas, water, telecoms, transport, and data systems can depend on each other during a disruption"
      )
    },
    {
      /** Source L85. */
      name: same("High-consequence change windows"),
      whyItMatters: same(
        "Maintenance outages, switching windows, grid conditions, generation schedules, and seasonal demand restrict when changes can safely occur"
      )
    },
    {
      /** Source L86. */
      name: same("Remote vendor access"),
      whyItMatters: same(
        "OEMs and service providers often require access to turbines, inverters, protection relays, DCS, PLCs, and monitoring platforms"
      )
    },
    {
      /** Source L87. */
      name: same("Legacy and multi-vendor estates"),
      whyItMatters: same(
        "Assets may remain operational for decades, often with inconsistent records, unsupported components, and differing network/security designs"
      )
    },
    {
      /** Source L88. */
      name: same("External pressure"),
      whyItMatters: same(
        "Geopolitics, severe weather, supply-chain disruption, fuel constraints, commodity conditions, and active threat campaigns can change exposure even when the physical environment is unchanged"
      )
    }
  ]

  /* GAP, FLAGGED NOT FILLED: the source gives the nine concerns no ordering,
     ranking, severity or grouping. The ordinals the component prints are list
     positions in the source table and nothing more — they are not a priority
     order, and no row is styled as more severe than another. */
};
