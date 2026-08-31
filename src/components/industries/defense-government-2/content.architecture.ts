/**
 * MISSION-TO-INFRASTRUCTURE ARCHITECTURE — CORPUS L118–L156, verbatim.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * THREE DISTINCT DATA SHAPES LIVE IN ONE EXPORT, and they are not
 * interchangeable:
 *   · `tiers`   — a six-level DEPENDENCY STACK, ordered, each level depending
 *                 on the one below it. Order is meaning; do not sort it.
 *   · `domains` — a nine-entry EVIDENCE INDEX, a flat reference list of what
 *                 the Twin ingests. Order carries no dependency claim.
 *   · `views`   — seven MODELLING PERSPECTIVES over the same model.
 * A renderer that flattens all three into one card grid loses the only thing
 * `tiers` is saying.
 *
 * `tiers` VS THE BRIEF'S SIX-LAYER CHAIN (`SOVEREIGN_CHAIN`,
 * content.sovereignModel.ts): both are six levels from mission to
 * dependency/consequence, and they are still NOT the same list. The CORPUS
 * tiers run mission → operational systems → facilities → OT → networks →
 * external dependencies, ending on what the organization depends on; the BRIEF
 * chain ends on a consequence and has no separate networks level. Two sources,
 * two abstractions, both real. Neither replaces the other, and merging them
 * would produce a seventh list no source states.
 */
import { same } from "../registry";

export const ARCHITECTURE = {
  /** CORPUS L119. */
  h2: same("Trace a dependency from mission function to field device and supplier."),
  /** CORPUS L120. */
  intro: same("Mission-to-infrastructure, not IT-centric — six tiers, each depending on the one below it."),

  /* CORPUS L121–L128, all six tiers, both cells each, in source order. The `·`
     separators are the CORPUS's own (the BRIEF's chain uses `•` — the
     difference is the sources', not a typo to normalize).
     `id` is DOM identity, not copy. */
  tiers: [
    {
      id: "mission",
      /** CORPUS L122. */
      name: same("Mission / essential-government function"),
      body: same("Crisis coordination · sovereign cloud · logistics · force support · public warning")
    },
    {
      id: "operational-systems",
      /** CORPUS L123. */
      name: same("Operational systems and secure services"),
      body: same("C2 support · communications · identity · data platforms · SOC/NOC · operations centers")
    },
    {
      id: "facilities",
      /** CORPUS L124. */
      name: same("Secure facilities and critical infrastructure"),
      body: same("Bases · airfields · ports · depots · data centers · government buildings · alternate sites")
    },
    {
      id: "ot-physical",
      /** CORPUS L125. */
      name: same("OT and physical-support systems"),
      body: same(
        "Power · generators · UPS · fuel · HVAC · BMS · EPMS · water · access control · CCTV · fire/life safety · cranes · pumps · industrial processes"
      )
    },
    {
      id: "networks-access",
      /** CORPUS L126. */
      name: same("Networks and access pathways"),
      body: same(
        "IT/OT segmentation · management networks · radio · fiber · satellite · carrier services · remote support · privileged access · time services"
      )
    },
    {
      id: "external",
      /** CORPUS L127. */
      name: same("External dependencies"),
      body: same(
        "Utilities · telecoms · cloud providers · OEMs · logistics · spares · contractors · fuel · water · workforce · allied partners"
      )
    }
  ],

  /* CORPUS L129–L139, all nine domains, both cells each, in source order.
     The last two entries are evidence CLASSES rather than technology domains —
     "Engineering evidence" and "Supply-chain evidence" name what the Twin is
     built from, not what it controls. The CORPUS lists them in the same array;
     they are kept in it, in place, rather than split into a second export the
     source does not have. */
  domains: [
    {
      id: "facility-ot",
      /** CORPUS L130. */
      domain: same("Facility OT"),
      examples: same(
        "BMS/BAS, EPMS, switchgear, UPS, generators, batteries, HVAC/chillers, pumps, fuel systems, building controllers, fire/life-safety integration"
      )
    },
    {
      id: "operational-technology",
      /** CORPUS L131. */
      domain: same("Operational technology"),
      examples: same(
        "PLCs, RTUs, HMIs, SCADA, industrial gateways, remote telemetry, industrial Ethernet, fieldbus and serial devices"
      )
    },
    {
      id: "physical-security",
      /** CORPUS L132. */
      domain: same("Physical-security systems"),
      examples: same(
        "Access control, secure entry, perimeter intrusion detection, CCTV, vehicle barriers, alarm panels, visitor systems, security operations integration"
      )
    },
    {
      id: "communications",
      /** CORPUS L133. */
      domain: same("Communications"),
      examples: same(
        "Secure WAN, fiber, carrier networks, microwave, satellite, radio, tactical-support interfaces, time services, telecom power and environmental systems"
      )
    },
    {
      id: "government-digital",
      /** CORPUS L134. */
      domain: same("Government digital services"),
      examples: same(
        "Identity, PKI, privileged-access management, cloud/sovereign-cloud services, case-management systems, emergency notification, digital records, data exchange"
      )
    },
    {
      id: "defense-support",
      /** CORPUS L135. */
      domain: same("Defense support systems"),
      examples: same(
        "Maintenance, logistics, warehouse, fuel, transportation, depot, repair, operational-readiness, and supply-chain management systems"
      )
    },
    {
      id: "data-center",
      /** CORPUS L136. */
      domain: same("Data-center dependencies"),
      examples: same(
        "BMS, EPMS, DCIM, cooling, electrical control, carrier diversity, cloud management, identity, service-provider and workload boundaries"
      )
    },
    {
      id: "engineering-evidence",
      /** CORPUS L137. */
      domain: same("Engineering evidence"),
      examples: same(
        "Single-line diagrams, P&IDs, building and site drawings, sequence-of-operations narratives, asset records, hazard registers, MOP/SOP/EOPs, maintenance data, contingency plans"
      )
    },
    {
      id: "supply-chain-evidence",
      /** CORPUS L138. */
      domain: same("Supply-chain evidence"),
      examples: same(
        "Hardware/firmware inventories, SBOMs, certificates, vendor support contracts, supplier tiers, maintenance windows, spare parts, repair routes, personnel qualifications"
      )
    }
  ],

  /* CORPUS L144–L152. The CORPUS's own comment (its L140–L143) records why
     these seven live here rather than in a second interactive: the source's
     separate "Interactive sovereign-system model" section was folded into this
     export rather than built twice. That decision is carried forward — but note
     it was made against a page with no interactive model section. THIS build
     has one (`content.sovereignModel.ts`, from the BRIEF), so a builder may
     reasonably surface these seven perspectives there instead. Whichever
     section takes them, they must appear ONCE. */
  views: [
    same("Mission"),
    same("Infrastructure"),
    same("Control"),
    same("Network"),
    same("Dependency"),
    same("Consequence"),
    same("Evidence")
  ],
  /**
   * CORPUS L153–L155, verbatim — a CLAIM BOUNDARY, not a caption.
   *
   * It states that what the page shows is a synthetic, notional environment.
   * The Visual Foundation Spec requires exactly this of defense material (its
   * L531: "Defense/government examples must be notional and synthetic. Do not
   * depict actual sensitive sites, national infrastructure, classified systems,
   * or real topology"), and the site-wide rule is that a scenario's claim
   * boundary is visible, never buried. Render it beside the views it governs,
   * at readable size.
   */
  viewsNote: same(
    "A synthetic, notional environment — never actual national infrastructure, sensitive sites, force posture, or classified dependencies."
  )
};
