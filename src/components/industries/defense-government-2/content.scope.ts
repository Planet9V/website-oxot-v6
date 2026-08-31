/**
 * WHAT SOVEREIGNTY MEANS · WHAT OXOT MODELS — CORPUS L62–L116, verbatim.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * These two sections are the page's definitional pair and belong in one file:
 * SOVEREIGNTY says what the word means and refuses the data-residency
 * shorthand; SCOPE says what OXOT will and will not model in service of it.
 * The second is only defensible because the first is stated — which is also
 * why `SCOPE.boundary` sits here rather than in a component.
 *
 * BRIEF L45 and L46 are one-sentence descriptions of these two sections. They
 * are the brief's summary of copy that already exists in full below; the full
 * wording is what ships.
 */
import { same } from "../registry";

/* ── What sovereignty means ─────────────────────────────────────────────── */

export const SOVEREIGNTY = {
  /** CORPUS L63. */
  h2: same(
    "Sovereignty is the ability to decide, operate, recover, and sustain — without an unexamined dependency."
  ),
  /* CORPUS L64–L66. The sentence it answers is BRIEF L45's: sovereignty "is not
     just 'data stays in-country'." That refusal is the section's whole reason
     to exist — a renderer must not cut the intro and leave the six rows to
     speak for themselves. */
  intro: same(
    "This distinguishes digital sovereignty from a simplistic data-residency claim. Six dimensions, each with its own evidence."
  ),
  /* Column headers for the three cells each row carries. The CORPUS states the
     three cells but no header text, so these name what is already in the data
     rather than adding a claim: the dimension, what it means in practice, and
     what the Twin models for it. */
  practiceLabel: same("What it means in practice"),
  modelsLabel: same("What OXOT models"),
  /* `id` is DOM identity, not copy — anything wiring aria-controls off these
     must not derive them from array position. */
  rows: [
    {
      id: "operational",
      /** CORPUS L69–L71, all three cells. */
      dimension: same("Operational sovereignty"),
      practice: same(
        "The organization can operate essential functions under degraded conditions, rather than depending on a single vendor, remote-support route, or cloud service."
      ),
      models: same(
        "Local control, manual fallback, failover, restoration sequence, operator knowledge, and command dependencies."
      )
    },
    {
      id: "data",
      /** CORPUS L74–L76, all three cells. */
      dimension: same("Data sovereignty"),
      practice: same(
        "Sensitive data, telemetry, model data, and evidence remain under appropriate jurisdictional, access, classification, and handling controls."
      ),
      models: same(
        "Data flows, storage/processing boundary, access roles, outbound connections, and evidence provenance."
      )
    },
    {
      id: "technology",
      /** CORPUS L79–L81, all three cells. */
      dimension: same("Technology sovereignty"),
      practice: same(
        "Critical functions are not silently dependent on untrusted, unsupported, unpatchable, or nonreplaceable technology."
      ),
      models: same("Hardware, firmware, software, cryptographic, SaaS, and support dependencies.")
    },
    {
      id: "supply",
      /** CORPUS L84–L86, all three cells. */
      dimension: same("Supply sovereignty"),
      practice: same(
        "Essential spares, fuel, parts, maintenance expertise, connectivity, and logistics remain available during crisis or conflict."
      ),
      models: same(
        "Supplier tiers, lead times, alternatives, stock, repair capacity, routes, and contractual obligations."
      )
    },
    {
      id: "decision",
      /** CORPUS L89–L91, all three cells. */
      dimension: same("Decision sovereignty"),
      practice: same(
        "Leaders can justify which risks to accept, which investments to make, and what to restore first, using transparent evidence."
      ),
      models: same(
        "Consequence model, priority queue, simulations, source-linked assumptions, and recovery choices."
      )
    },
    {
      id: "alliance",
      /** CORPUS L94–L96, all three cells. */
      dimension: same("Alliance interoperability"),
      practice: same(
        "Sovereign systems can still exchange the right information and operate with trusted partners when authorized."
      ),
      models: same(
        "Interfaces, information-sharing boundaries, federation points, shared services, and controlled cross-domain dependencies."
      )
    }
  ]
};

/* ── What OXOT models ───────────────────────────────────────────────────── */

export const SCOPE = {
  /** CORPUS L102. */
  h2: same(
    "One model for the facilities and dependencies that sustain mission and government continuity."
  ),
  /**
   * ─── LOAD-BEARING. DO NOT EDIT, SHORTEN, SOFTEN, OR MOVE OUT OF SIGHT. ─────
   *
   * CORPUS L103–L105, verbatim. The CORPUS marks it load-bearing in its own
   * docblock (its L16–L20) and instructs every future edit to keep it intact;
   * that instruction is carried here, not restated as a preference.
   *
   * WHY IT IS LOAD-BEARING, in plain terms: the second sentence is a limit on
   * what OXOT claims to do. A defense and government buyer reading a page about
   * modelling missions, bases, airfields and ports will otherwise reasonably
   * infer that OXOT models weapons systems, classified battle-management
   * systems, or intelligence operations. It does not. Dropping this sentence
   * does not make the page vaguer — it makes the page assert something untrue
   * by omission, on the one page where that error is most consequential.
   *
   * It is also what makes everything else on the page sayable: the scope
   * boundary is why a public page can describe this work at all.
   *
   * A renderer must give it visible standing — its own line above or beside the
   * environment list, at body size. It is not a footnote, not a tooltip, not
   * `sr-only`, and not something to fold into an accordion to shorten the page.
   */
  boundary: same(
    "OXOT models the supporting cyber-physical infrastructure and operational dependencies that enable sovereign missions and essential public functions. It does not model weapons systems, classified battle-management systems, or intelligence operations."
  ),
  /* CORPUS L106–L115, all eight environments, both cells each. BRIEF L46 lists
     the same territory as one run-on sentence; the CORPUS's per-environment
     wording is the finished copy.
     `id` is DOM identity, not copy. */
  environments: [
    {
      id: "bases-estates",
      /** CORPUS L107. */
      name: same("Defense bases and estates"),
      body: same(
        "Power, water, fuel, heating/cooling, perimeter systems, communications, facilities control, maintenance, accommodation, and operational support must work under disruption."
      )
    },
    {
      id: "airfields",
      /** CORPUS L108. */
      name: same("Airfields and aviation-support infrastructure"),
      body: same(
        "Airfield lighting, fueling, hangars, weather systems, ground support, power, communications, maintenance, and secure operational facilities depend on coordinated OT and logistics."
      )
    },
    {
      id: "ports-maritime",
      /** CORPUS L109. */
      name: same("Ports, naval support, and maritime logistics"),
      body: same(
        "Shore power, cranes, fuel, security, access, ship support, warehouses, communications, and transportation links affect force movement and sustainment."
      )
    },
    {
      id: "data-centers",
      /** CORPUS L110. */
      name: same("Military and government data centers"),
      body: same(
        "Critical facilities, power/cooling, sovereign cloud, secure operations, data residency, identity, carrier dependencies, and mission workload continuity."
      )
    },
    {
      id: "command-facilities",
      /** CORPUS L111. */
      name: same("Command and operational-support facilities"),
      body: same(
        "Secure communications, power, HVAC, access control, situational-awareness platforms, alternate sites, and continuity capabilities."
      )
    },
    {
      id: "munitions-maintenance",
      /** CORPUS L112. */
      name: same("Munitions, maintenance, and industrial support sites"),
      body: same(
        "Process systems, storage, machinery, quality controls, energy, safety systems, controlled access, and supplier dependence."
      )
    },
    {
      id: "government-continuity",
      /** CORPUS L113. */
      name: same("Government continuity facilities"),
      body: same(
        "Emergency coordination, public warning, identity and citizen services, crisis communications, emergency operations, and backup sites."
      )
    },
    {
      id: "dual-use-civil",
      /** CORPUS L114. */
      name: same("Dual-use civil infrastructure"),
      body: same(
        "Ports, airports, rail, energy, water, telecoms, logistics hubs, and data centers that must support both civilian continuity and defense mobilization."
      )
    }
  ]
};
