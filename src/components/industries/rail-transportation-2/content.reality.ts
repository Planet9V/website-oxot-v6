/**
 * RAIL & TRANSPORTATION 2 — S01 SECTOR REALITY and S02 PASSENGER-VS-FREIGHT
 * COMPARISON.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md. Every value below carries the source line it
 * came from. Nothing is invented; where the source is silent, there is a
 * flagged gap rather than a filled-in guess.
 *
 * WHY BOTH SECTIONS SHARE ONE FILE. In the source these are not two sections —
 * S02 is a `###` subheading (L93) INSIDE the `## Sector reality` block (L75),
 * and its table is the passenger/freight split that the S01 register's last two
 * outcomes (L90, L91) already point at. They are rendered as two sections
 * because the comparison is a matrix and the reality is a narrative, but their
 * copy is one continuous passage of the brief and is kept in one file so an
 * edit to the split cannot land in one and not the other.
 *
 * `Bilingual` throughout via `same()` (../registry): both locales render, `nl`
 * is a same-as-English placeholder pending translation, not a claim that this
 * text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── S01 · Sector reality ───────────────────────────────────────────────── */

/**
 * NIS2 — Directive (EU) 2022/2555, the consolidated EUR-Lex text.
 *
 * THE BRIEF SUPPLIES NO LINK FOR THIS CLAIM. L9 states that rail infrastructure
 * managers and railway undertakings are listed in NIS2 Annex I as
 * high-criticality entities, and L375 restates it, but neither carries a source
 * marker the way the TSA sentences at L345 and L384 do. The URL is therefore
 * supplied here rather than transcribed, and it is the value this repository
 * already uses for NIS2 elsewhere rather than a second, differently-shaped ELI
 * link — one instrument, one canonical URL across the site.
 *
 * VERIFIED AGAINST THE INSTRUMENT, NOT ASSUMED: Annex I of 32022L2555 is titled
 * "SECTORS OF HIGH CRITICALITY", and its Transport sector, subsector "(b) Rail",
 * lists "Infrastructure managers as defined in Article 3, point (2), of
 * Directive 2012/34/EU" and "Railway undertakings as defined in Article 3,
 * point (1), of Directive 2012/34/EU, including operators of service
 * facilities". The brief's sentence is accurate as written.
 */
export const NIS2_EUR_LEX_URL = "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng";

/**
 * TSA — the brief's own link, transcribed verbatim from L345 and L384, where it
 * appears twice under the same `[tsa]` label against the same URL.
 */
export const TSA_DIRECTIVES_URL =
  "https://www.tsa.gov/news/press/releases/2022/10/18/tsa-issues-new-cybersecurity-requirements-for-passenger-and-freight";

export const REALITY = {
  /** Section name at the head of the block run. Source L75. */
  datumLabel: same("Sector reality"),
  /** Source L79, verbatim. A three-clause sentence — see Rule.tsx on why H-B's
   *  h2 must not be balanced. */
  h2: same(
    "A cyber issue in rail becomes an operational decision: move safely, stop safely, or restore safely."
  ),

  /* THE NARRATIVE PANE — source L81, split at the source's own sentence
     boundaries into three paragraphs, no word changed:
       P1  the thesis, plus the fail-safe mechanism it rests on;
       P2  the pivot — failing safe is not the same as failing harmlessly;
       P3  the converse case, where the pathway reaches a safety function.
     The paragraphing is this file's; the sentences and their order are the
     brief's. */
  narrative: [
    same(
      "Rail cybersecurity must respect the railway's safety architecture. A train-control environment often fails safe: an unavailable system may slow, stop, or restrict train movement rather than allow unsafe movement."
    ),
    same(
      "That can still create major passenger, capacity, freight-flow, and recovery consequences."
    ),
    same(
      "Conversely, a cyber route affecting an interlocking, wayside controller, movement-authority system, protection function, dispatcher environment, or traction-power control can create a more direct safety concern."
    )
  ],

  /**
   * THE CITED-EVIDENCE PANEL — two outside instruments, from source L9.
   *
   * These are why S01 takes header recipe H-B and no other section on this page
   * does: the section's load-bearing claim — that rail's cyber obligations are
   * externally imposed rather than an OXOT framing — stands on two real
   * instruments in two jurisdictions. L9 states both in one sentence pair, and
   * both are restated later in the brief's own regulatory matrix (L375 for
   * NIS2, L379 and L384 for TSA).
   *
   * EACH INSTRUMENT CARRIES ITS OWN SOURCE, unlike the single shared link the
   * manufacturing page's equivalent panel uses. Two jurisdictions, two
   * publishers, two URLs: collapsing them under one link would attach the TSA
   * citation to the EU claim or vice versa.
   *
   * `jurisdiction` is the brief's own scoping words at L9 — "For the European
   * market" and "In the United States" — reduced to the phrase, not rewritten
   * into a tidier label like "EU" or "US federal".
   *
   * NO INVENTED REGULATORY FACT. No edition, transposition deadline, directive
   * number, security-directive series number or effective date appears here.
   * The brief states none, and a date printed on a page a buyer may act on is
   * an engineering fact rather than copy. Neither row tells any reader whether
   * they are in scope — both keep the brief's own hedging.
   */
  citation: {
    instruments: [
      {
        /** Source L9. */
        jurisdiction: same("For the European market"),
        name: same("NIS2 Annex I"),
        role: same(
          "Rail infrastructure managers and railway undertakings are explicitly listed in NIS2 Annex I as high-criticality entities."
        ),
        sourceLabel: same("eur-lex.europa.eu"),
        href: NIS2_EUR_LEX_URL
      },
      {
        /** Source L9; link from L345 / L384. */
        jurisdiction: same("In the United States"),
        name: same("TSA directives and proposed rules"),
        role: same(
          "TSA directives and proposed rules target higher-risk passenger rail, rail transit, and freight operators with cybersecurity risk-management, reporting, segmentation, access-control, monitoring, patching, and testing expectations."
        ),
        sourceLabel: same("tsa.gov"),
        href: TSA_DIRECTIVES_URL
      }
    ]
  },

  /** Source L83, verbatim, including its own quotation marks and its trailing
   *  colon — it is the sentence that introduces the register below it, so it
   *  sits with the register rather than in the narrative pane. */
  registerLead: same(
    "The relevant outcome is therefore not simply “system uptime.” It may be:"
  ),

  /**
   * THE CONSEQUENCE REGISTER — the seven outcomes at L85–L91, verbatim,
   * GROUPED BY SUBJECT.
   *
   * GROUPING IS THE POINT OF THIS SECTION'S TREATMENT. Rendered flat, the seven
   * read as an undifferentiated bullet list and the reader has to notice for
   * themselves that four different things are being talked about — the service
   * the railway sells, the authority to move a train, the estate the railway
   * runs through, and a freight network that reaches past the operator. Each
   * group's label is the subject the source's own sentences name; the label is
   * editorial STRUCTURE, and it states nothing the items do not already say.
   *
   * GROUP SIZES ARE UNEVEN (2 / 3 / 1 / 1) AND ARE LEFT THAT WAY. Padding a
   * group to make the four look alike would mean inventing an outcome; moving
   * an item to even them out would mean filing it under a subject it does not
   * name. The single freight row is the most load-bearing imbalance on the page
   * and it is real: the brief gives freight exactly one line here and then
   * insists at L169 that freight must not be "a paragraph under passenger
   * rail", which is what S02 and the segment sections exist to fix.
   *
   * NO ORDINALS, NO RANKING, NO SEVERITY. The source prints the seven as a
   * plain list with no score, no order of precedence and no "most likely"
   * marker, so none is rendered.
   *
   * GAP, FLAGGED NOT FILLED: the h2's trichotomy — move safely / stop safely /
   * restore safely (L79) — is NOT mapped onto individual outcomes. It is the
   * section's framing sentence and the brief never assigns any of the seven to
   * one of the three. Tagging each row "MOVE" / "STOP" / "RESTORE" would look
   * rigorous and would be a fabricated rail-operations classification.
   */
  registerGroups: [
    {
      id: "service",
      label: same("Service"),
      outcomes: [
        /** Source L85. */
        same("An enforced service slowdown or line suspension."),
        /** Source L89. */
        same(
          "A passenger-information, station, fare, or emergency-communications failure."
        )
      ]
    },
    {
      id: "movement-authority",
      label: same("Movement authority"),
      outcomes: [
        /** Source L86. */
        same("Loss of movement authority or degraded signaling mode."),
        /** Source L87. */
        same("An inability to route trains through a junction, terminal, or yard."),
        /** Source L88. */
        same("A dispatching or crew-management disruption.")
      ]
    },
    {
      id: "infrastructure",
      label: same("Infrastructure"),
      outcomes: [
        /** Source L90. */
        same("A power, ventilation, tunnel, crossing, or platform-safety impact.")
      ]
    },
    {
      id: "freight-network",
      label: same("Freight network"),
      outcomes: [
        /** Source L91. */
        same(
          "A freight-network bottleneck, missed interchange, commodity delay, or hazardous-material response complication."
        )
      ]
    }
  ]
};

/* ── S02 · Passenger transit vs US freight rail ─────────────────────────── */

/**
 * The seven-dimension comparison at L95–L103, verbatim.
 *
 * CELLS ARE KEYED BY SEGMENT ID, NOT BY COLUMN POSITION. `content.ts`'s
 * `SEGMENTS` is the page's single definition of the two rail segments and it
 * carries the column headers this table uses (`tableLabel`, source L96). The
 * renderer walks `SEGMENTS` and looks each row's cell up by `id`, so the header
 * row and the body can never fall out of step, and reordering the segments in
 * one place reorders both. A `passenger`/`freight` tuple would have re-encoded
 * the column order here as a second, silent source of truth.
 *
 * GAP, FLAGGED NOT FILLED: the brief gives this table NO section lead and no
 * caption of its own — L93 is a bare `###` heading followed straight by the
 * matrix. `SectionA`'s `lead` is therefore omitted rather than filled with a
 * sentence introducing a table that introduces itself.
 */
export interface ComparisonRow {
  id: string;
  /** The row's own name, source column 1. */
  dimension: Bilingual;
  /** Keyed by `SEGMENTS[n].id`. */
  cells: Record<string, Bilingual>;
}

export const COMPARISON = {
  /** Section name at the head of the block run. Source L93. */
  datumLabel: same("Segment comparison"),
  /** Source L93, the brief's own subheading, verbatim. */
  h2: same("Passenger transit vs freight rail"),
  /** Source L95, the matrix's own first column header. */
  dimensionHead: same("Dimension"),

  /* A real `<caption>`, describing the table's structure rather than adding a
     claim to it: the matrix is read once down each segment column. The brief
     writes no caption, so this states only what is visibly true of the table. */
  caption: same(
    "Seven dimensions, read once for passenger rail and transit and once for US freight rail."
  ),

  /* SMALL-SCREEN CHROME. The matrix is three prose columns and cannot collapse
     to a phone width without shredding its cells, so it scrolls sideways inside
     its own container — which is permitted only with a visible affordance AND
     an alternate summary, both of which are below and both of which are
     `lg:hidden`. Neither string is a claim about rail; they are labels for the
     page's own furniture, and the summary they head is the table's OWN first
     row rather than a paraphrase of it. */
  summaryLabel: same("Core mission, both segments"),
  scrollAffordance: same("The full seven-dimension table scrolls sideways."),
  /** Which row the small-screen summary lifts. Reading the row rather than
   *  restating it means the summary cannot drift from the table. */
  summaryRowId: "core-mission",

  rows: [
    {
      id: "core-mission",
      /** Source L97. */
      dimension: same("Core mission"),
      cells: {
        passenger: same(
          "Safe, predictable, high-frequency passenger movement and station access"
        ),
        freight: same(
          "Safe, efficient movement of long trains across large networks, yards, corridors, and interchanges"
        )
      }
    },
    {
      id: "operational-rhythm",
      /** Source L98. */
      dimension: same("Operational rhythm"),
      cells: {
        passenger: same(
          "Dense peak periods, headway management, high passenger visibility, constrained recovery time"
        ),
        freight: same(
          "Network fluidity, dispatching, crew/locomotive availability, terminal dwell, interchange performance, commodity commitments"
        )
      }
    },
    {
      id: "control-systems",
      /** Source L99. */
      dimension: same("Dominant safety/control systems"),
      cells: {
        passenger: same(
          "CBTC, ATS/ATO, ETCS where applicable, interlocking, platform systems, traction power, tunnel/ventilation control"
        ),
        freight: same(
          "PTC, dispatch/CAD, interlocking, CTC, wayside interface units, grade-crossing systems, locomotive systems, yard automation"
        )
      }
    },
    {
      id: "cyber-impact",
      /** Source L100. */
      dimension: same("Main cyber impact"),
      cells: {
        passenger: same(
          "Passenger safety, service suspension, crowding, station/tunnel operations, emergency response, reputation"
        ),
        freight: same(
          "Train movement restrictions, mainline congestion, hazardous-material implications, yard disruption, customer supply-chain impact"
        )
      }
    },
    {
      id: "asset-distribution",
      /** Source L101. */
      dimension: same("Asset distribution"),
      cells: {
        passenger: same(
          "Stations, depots, tunnels, substations, trackside signaling, control centers, onboard train systems"
        ),
        freight: same(
          "Thousands of route miles, wayside devices, communications towers, locomotives, yards, terminals, grade crossings, dispatch centers"
        )
      }
    },
    {
      id: "change-constraint",
      /** Source L102. */
      dimension: same("Change constraint"),
      cells: {
        passenger: same(
          "Timetable windows, overnight possessions, safety-case impact, passenger service continuity"
        ),
        freight: same(
          "Network-wide operating plan, dispatch windows, PTC interoperability, locomotives in service, maintenance blocks, interchange coordination"
        )
      }
    },
    {
      id: "external-interfaces",
      /** Source L103. */
      dimension: same("Typical external interfaces"),
      cells: {
        passenger: same(
          "Municipal IT, police/emergency services, ticketing, passenger apps, rolling-stock and signaling vendors"
        ),
        freight: same(
          "Customers, ports, terminals, short lines, Class I/II/III railroads, PTC interoperability partners, equipment OEMs, fuel/energy providers"
        )
      }
    }
  ] as ComparisonRow[]
};
