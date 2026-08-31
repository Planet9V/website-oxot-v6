/**
 * GLOSSARY — the site's technical reference layer.
 *
 * THE TERM LIST IS NOT OURS TO CHOOSE. Every term below comes from
 * new_material_source/1_website_layout_v4/6_resources/glossary.md, which
 * is a bare list of terms with no definitions — authoritative on WHICH
 * terms exist, silent on what they say. Nothing has been added to that
 * list and nothing dropped from it. If a term seems missing, it is
 * missing from the source file, and the source file is where to add it.
 *
 * (The source lists 35 terms, not the 34 sometimes quoted — the two IEC
 * 62278 parts are separate entries and are easy to miscount as one.)
 *
 * The ENTRY STRUCTURE comes from a different file: resources-purpose.md's
 * Glossary section (term, plain-English definition, why it matters, OXOT
 * context, related standards, example, related resources, last reviewed).
 * The dedicated resources-format-glossary.md is empty, so the worked
 * "Cyber Digital Twin" example inside resources-purpose.md is the format
 * of record; that entry is reproduced verbatim, including its "Related
 * standards" line — "IEC 62278-2:2025" — unchanged. An earlier pass here
 * "corrected" it to IEC 62278-1:2025 on the (wrong) claim that the site's
 * IEC 62278 page was genuinely about Part 1; that page is genuinely about
 * Part 2 (corrected 2026-08-23, see its own doc comment), so the source's
 * original citation was right and is restored.
 *
 * IEC 62278-1 AND -2 ARE BOTH REAL, AND BOTH HAVE ENTRIES. Part 1 is the
 * generic RAMS process; Part 2 is the systems approach to safety. They are
 * distinct parts of one series, not a typo of each other. Only Part 2 has
 * a dedicated page on this site — the Part 1 entry's `related` link points
 * there too, honestly labelled by what it actually is, since no Part 1
 * page exists.
 *
 * DEFINITIONS ARE WRITTEN FROM THIS SITE'S OWN USAGE, so a reader who
 * arrives from a page and goes back to it finds the same idea:
 *   - zones, conduits, DMZ, Purdue, system under consideration
 *       → src/components/assurance/iec-62443/
 *   - attack path, EPSS-as-input, consequence-first ranking
 *       → src/components/decisions/fix-first/
 *   - risk acceptance as a recorded object
 *       → src/components/decisions/risk-acceptance/
 *   - data diode, the five BOMs, cloud dependencies
 *       → src/components/platform/deployment-sovereignty/, .../integrations/
 *   - FMECA, SCIL, RCIL, MOR as the consequence anchor
 *       → src/components/platform/how-it-works/
 *   - RAMS, SIL, interlocking, CBTC/ETCS/PTC
 *       → src/components/assurance/ts-50701/, .../iec-62278-2/
 *   - SBOM/HBOM/CBOM, DEXPI, provenance
 *       → src/components/assurance/evidence-data-provenance/
 *
 * `Bilingual`-typed via `same()` — both locales render, `nl` is a
 * same-as-English placeholder pending translation, not a claim that this
 * text is correct Dutch. Same convention as every page shipped this batch.
 *
 * Standards names and route paths are NOT bilingual: a standard number
 * reads the same in both languages, and a path is not copy.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { PATHS } from "@/components/shell/nav";

export const META = {
  title: "OT Cybersecurity Glossary | Cyber Digital Twin Terms",
  description:
    "Plain-English definitions of the terms OXOT uses across the site — Cyber Digital Twin, attack path, zones and conduits, ALE, Consequence Index, SBOM, FMECA, SCIL, TS 50701 — each with why it matters and how OXOT applies it."
};

/** One entry. Definition and `why` are required; everything else is
 *  optional, because forcing a field produces filler rather than
 *  reference material. */
export interface GlossaryEntry {
  /** Anchor id. Stable — these are linkable from anywhere on the site. */
  id: string;
  term: Bilingual;
  /** What the acronym stands for, or an alternate name a reader might
   *  arrive searching for. Rendered under the term so the page answers
   *  "is this the same thing as X" without a second lookup. */
  aka?: readonly string[];
  definition: Bilingual;
  why: Bilingual;
  oxot?: Bilingual;
  /** Standard designations, verbatim. Not translated, not linked — the
   *  link belongs in `related`, where it can carry a real page. */
  standards?: readonly string[];
  example?: Bilingual;
  related?: readonly { label: Bilingual; path: string }[];
  /** ISO. Rendered per-locale by formatDate. */
  reviewed: string;
}

const REVIEWED = "2026-08-23";

const RAIL = `${PATHS.industries}/rail-transportation`;

/**
 * The two Resources routes this page needs, declared here rather than
 * imported from the /resources index's content module.
 *
 * They lived there briefly (as RESOURCE_PATHS) and that export was
 * removed while the index was rewritten, which broke this page's build —
 * a route constant is not the sort of thing one page should be able to
 * delete out from under another. They are also deliberately not in
 * components/shell/nav.ts, which is the site-wide destination registry
 * and is owned elsewhere.
 */
export const GLOSSARY_PATHS = {
  root: "/resources",
  self: "/resources/glossary"
} as const;

/**
 * IN THE SOURCE FILE'S OWN ORDER, which is alphabetical apart from the two
 * IEC entries (62443 before 62278) — kept as the source has them, since
 * both file under "I" and the letter grouping is unaffected.
 *
 * The letter index above the entries is generated from this array, and
 * grouping.ts groups consecutive runs rather than sorting: a term dropped
 * in the wrong place shows up as a duplicated letter heading, which is
 * visible in review. Keep same-letter terms adjacent.
 */
export const ENTRIES: readonly GlossaryEntry[] = [
  {
    id: "ale",
    term: same("ALE"),
    aka: ["Annual loss expectancy", "Expected annual loss"],
    definition: same(
      "The expected cost of a risk across a year: what one occurrence would cost, multiplied by how often it is expected to occur. It converts a technical exposure into a currency figure that a budget process can actually use."
    ),
    why: same(
      "A security lead asking for money and a finance officer deciding whether to release it are not speaking the same language until the risk carries a number and a unit. ALE is that translation — and it is only ever as good as the two inputs behind it, which is why both need to be visible."
    ),
    oxot: same(
      "OXOT takes the loss side from your own downtime and consequence evidence — minimum operating requirements, FMECA, the RAMS cascade — and the frequency side from what is reachable in the modelled network combined with external threat and exploitation data. Both halves drill back to a source record. These are OXOT's own transparent, drillable calculations, directionally validated on real engagements, not rating-agency or actuarial marks."
    ),
    example: same(
      "A pump-control failure takes its single-loss cost from the site's own downtime thresholds and its rate from how reachable the pathway is. The product of the two is what reaches the investment board — beside the route and the records it came from."
    ),
    related: [
      { label: same("Where do we invest?"), path: PATHS.decisionInvestment },
      { label: same("How it works"), path: PATHS.howItWorks }
    ],
    reviewed: REVIEWED
  },
  {
    id: "attack-path",
    term: same("Attack path"),
    definition: same(
      "A traced route from an entry point to an asset that matters, through the network as it is actually configured rather than as it is drawn — each hop named. Where no route survives the segmentation, access controls and services in place, there is no attack path."
    ),
    why: same(
      "A severity score is a property of a vulnerability. An attack path is a property of your plant. It is the difference between a finding somebody could act on and one that would need a different network before it mattered."
    ),
    oxot: same(
      "OXOT traces routes from every entry point through a model of the network you actually run to the assets your own safety and reliability studies already rate as critical, then keeps only what is genuinely reachable. Propose a control and the same computation runs in reverse, reporting which paths survive it."
    ),
    standards: ["IEC 62443-3-2"],
    example: same(
      "Two identical unpatched HMIs. One sits on a path that continues to a controller behind a safety function; the other has no route past the line it serves. Same CVE, different placement on the board."
    ),
    related: [
      { label: same("What do we fix first?"), path: PATHS.decisionFixFirst },
      { label: same("How it works"), path: PATHS.howItWorks }
    ],
    reviewed: REVIEWED
  },
  {
    id: "cbom",
    term: same("CBOM"),
    aka: ["Cryptographic bill of materials"],
    definition: same(
      "A structured inventory of the cryptography a product depends on — algorithms, protocols, key lengths, certificates and key material — as distinct from the software or hardware that implements it."
    ),
    why: same(
      "Cryptographic agility is the practical question sitting behind both post-quantum readiness and certificate lifecycle management. Neither can be planned from a list of products; both need a list of the algorithms inside them."
    ),
    oxot: same(
      "One of the five bills of materials OXOT tracks, expressed in CycloneDX and feeding the technical file. The CBOM is where post-quantum readiness is assessed rather than asserted."
    ),
    standards: ["CRA"],
    related: [
      { label: same("Cyber Resilience Act"), path: PATHS.assuranceCra },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "cbtc",
    term: same("CBTC"),
    aka: ["Communications-based train control"],
    definition: same(
      "A signalling architecture in which trains and wayside equipment exchange position and movement-authority data continuously over a radio link, allowing far closer headways than fixed-block signalling. Common on metro and urban transit."
    ),
    why: same(
      "CBTC makes safe train separation depend on a communications network, which places a cybersecurity question directly inside a safety function. Interference usually expresses itself as a fail-safe restriction — trains slow or stop — which is safe, and still a major service event."
    ),
    oxot: same(
      "OXOT models CBTC alongside interlockings, zone controllers, radios and traction-power SCADA as part of a rail system under consideration, connecting a cyber pathway to the movement-authority or service consequence at the end of it."
    ),
    standards: ["TS 50701", "IEC 62443", "IEC 62278-1:2025"],
    related: [
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 },
      { label: same("Rail & Transportation"), path: RAIL }
    ],
    reviewed: REVIEWED
  },
  {
    id: "conduit",
    term: same("Conduit"),
    definition: same(
      "In IEC 62443, the communication channel connecting two zones. A conduit carries a defined set of services, and it is the boundary at which traffic between those zones is controlled and inspected."
    ),
    why: same(
      "A conduit is not secure because it exists on an architecture slide. It is secure when its permitted services, routes, access controls and operational dependencies are understood — and when the exposure that remains is acceptable."
    ),
    oxot: same(
      "OXOT draws conduits from topology exports, firewall configuration and asset records rather than from the drawing, so what a conduit actually carries can be compared against what it is documented to carry."
    ),
    standards: ["IEC 62443-3-2", "IEC 62443-3-3", "TS 50701"],
    example: same(
      "A conduit between the operations DMZ and the control zone is documented as carrying replicated historian data. The model shows it also carries a brokered service session landing on a jump host inside the control zone."
    ),
    related: [{ label: same("IEC 62443"), path: PATHS.assuranceIec62443 }],
    reviewed: REVIEWED
  },
  {
    id: "consequence-index",
    term: same("Consequence Index"),
    definition: same(
      "OXOT's single organizational rating for consequence exposure — priced in currency, reported as a 90-day trend, and drillable from the board-level number back down to the component tag that moved it."
    ),
    why: same(
      "A board needs one number it can follow between meetings; an engineer needs to know which component changed it. A rating that cannot be drilled is just a score to argue about, and a component list is not a board report. The Index is built to be both ends of the same object."
    ),
    oxot: same(
      "The Index rolls up from component-tag consequence to enterprise exposure using your own FMECA, criticality lists and minimum operating requirements. Like the ALE figures beside it, it is OXOT's own transparent, drillable calculation, directionally validated on real engagements — not a rating-agency or actuarial mark. Any sample figure shown on this site is illustrative, not customer data."
    ),
    related: [
      { label: same("The Cyber Digital Twin"), path: PATHS.cdt2 },
      { label: same("Where do we invest?"), path: PATHS.decisionInvestment }
    ],
    reviewed: REVIEWED
  },
  {
    id: "cra",
    term: same("CRA"),
    aka: ["Cyber Resilience Act"],
    definition: same(
      "The EU regulation setting cybersecurity requirements for products with digital elements placed on the EU market: secure development, vulnerability handling, a technical file evidencing both, and reporting obligations for actively exploited vulnerabilities."
    ),
    why: same(
      "It moves product cybersecurity from a commercial expectation to a condition of market access. The practical burden is evidentiary — the obligations run continuously across the support period, and answering them one product at a time does not scale."
    ),
    oxot: same(
      "OXOT supports the technical-file side: product architecture, bills of materials, vulnerability status, test evidence, update procedures, and the decision record behind each — with machine-readable CycloneDX export and a link from every claim back to its source record. OXOT does not guarantee conformity."
    ),
    standards: ["CRA"],
    related: [
      { label: same("Cyber Resilience Act"), path: PATHS.assuranceCra },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "cyber-digital-twin",
    term: same("Cyber Digital Twin"),
    aka: ["CDT"],
    definition: same(
      "A Cyber Digital Twin is a model that connects physical systems, assets, control technologies, network pathways, operational dependencies, threat context, and potential consequences so an organization can test cybersecurity decisions without changing the live environment."
    ),
    why: same(
      "An asset inventory can show what exists. A Cyber Digital Twin can show what is reachable, what it controls, what depends on it, and what consequence can follow from compromise or failure."
    ),
    oxot: same(
      "OXOT uses plant engineering, Purdue/network topology, control configuration, safety/reliability evidence, supplier data, and external intelligence to model cyber pathways and support decisions about remediation, investment, change, and risk acceptance."
    ),
    standards: ["IEC 62443", "TS 50701", "IEC 62278-1:2025", "CRA"],
    example: same(
      "A remote vendor route reaches an engineering workstation. The Twin shows whether that workstation can reach a controller, whether the controller affects a critical function, and whether segmentation or brokered access changes the outcome."
    ),
    related: [
      { label: same("The Cyber Digital Twin"), path: PATHS.cdt2 },
      { label: same("How it works"), path: PATHS.howItWorks }
    ],
    reviewed: REVIEWED
  },
  {
    id: "data-diode",
    term: same("Data diode"),
    aka: ["One-way gateway"],
    definition: same(
      "A device that enforces one-way data flow in hardware, so information can cross a boundary in a single direction and nothing can travel back the other way. The direction is a physical property of the device, not a firewall rule somebody can edit."
    ),
    why: same(
      "Some environments need outside information — advisories, threat context, supplier data — without accepting any route inward from the network delivering it. A diode turns one-direction-only into something an approver can inspect, rather than something a configuration asserts."
    ),
    oxot: same(
      "One-way inbound intelligence is one of OXOT's three deployment modes. Curated external intelligence crosses into the customer-controlled enclave through the diode; no telemetry, model data or session traffic returns across it."
    ),
    example: same(
      "A site accepts a curated advisory package across the diode into its Twin enclave. The Twin recomputes which of its modelled pathways those advisories touch, and nothing about the plant leaves the boundary."
    ),
    related: [
      { label: same("Deployment and sovereignty"), path: PATHS.deploymentSovereignty },
      { label: same("Integrations"), path: PATHS.integrations }
    ],
    reviewed: REVIEWED
  },
  {
    id: "dexpi",
    term: same("DEXPI"),
    aka: ["Data Exchange in the Process Industry"],
    definition: same(
      "An open data-exchange standard for process-engineering information — the machine-readable form of a P&ID, carrying equipment, instrumentation, lines and their connections as structured data rather than as a drawing."
    ),
    why: same(
      "A P&ID as a PDF is a picture of the plant that a person has to read. As DEXPI it is a graph a model can traverse, which is what makes automated reasoning from process engineering to consequence possible at all."
    ),
    oxot: same(
      "DEXPI 2.0 is one of the schemas OXOT's ingestion model is built on, alongside P&ID extraction, control-system configuration, topology evidence and CycloneDX. It is also an export format, so the model's process view can leave in a form other engineering tools read."
    ),
    related: [
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance },
      { label: same("How it works"), path: PATHS.howItWorks }
    ],
    reviewed: REVIEWED
  },
  {
    id: "dmz",
    term: same("DMZ"),
    aka: ["Demilitarized zone", "Operational DMZ"],
    definition: same(
      "An intermediate network between two zones of differing trust — classically between enterprise IT and the control network — holding the systems both sides need to reach, so that neither reaches the other directly."
    ),
    why: same(
      "The operational DMZ is where most real IT-to-OT traffic actually lives: historian replication, remote-access brokering, patch distribution, jump hosts. It is therefore where a segmentation claim is most often true on the diagram and untrue in the configuration."
    ),
    oxot: same(
      "OXOT models the DMZ as a zone like any other, with its conduits drawn from firewall configuration and flow evidence — so “nothing crosses from enterprise to control” can be checked as a statement about routes rather than accepted as a statement about intent."
    ),
    standards: ["IEC 62443-3-2"],
    related: [{ label: same("IEC 62443"), path: PATHS.assuranceIec62443 }],
    reviewed: REVIEWED
  },
  {
    id: "epss",
    term: same("EPSS"),
    aka: ["Exploit Prediction Scoring System"],
    definition: same(
      "A scoring system estimating the probability that a given vulnerability will be exploited in the wild in the near term, published and refreshed daily. It answers a different question from CVSS, which scores how bad exploitation would be rather than how likely it is."
    ),
    why: same(
      "A backlog ranked on severity alone treats a theoretically severe, never-exploited vulnerability the same as one under active attack. EPSS is one of the inputs that separates them — though on its own it still says nothing about whether the thing is reachable in your plant."
    ),
    oxot: same(
      "EPSS sits alongside CVE records, known-exploited-vulnerability catalogues and threat-actor intelligence as an external input to the likelihood side of the model. It informs the ranking and never is the ranking: a high-probability exploit on an unreachable asset with no consequence is still not the thing to fix first."
    ),
    related: [{ label: same("What do we fix first?"), path: PATHS.decisionFixFirst }],
    reviewed: REVIEWED
  },
  {
    id: "etcs",
    term: same("ETCS"),
    aka: ["European Train Control System", "ERTMS"],
    definition: same(
      "The train-control component of ERTMS, the European standard for signalling and train protection. It supervises train speed and movement authority, with trackside and onboard equipment exchanging data at defined application levels."
    ),
    why: same(
      "ETCS is a safety-related system with an interoperability and assurance regime already built around it. A cybersecurity change touching it is therefore also a change inside a safety argument, which is why it cannot be assessed as a network question alone."
    ),
    oxot: same(
      "OXOT models ETCS and ERTMS segments as part of a rail system under consideration and traces the cyber pathway to its movement-authority, service or safety consequence. It supports the analysis; it does not assign the safety integrity level or replace the assessment."
    ),
    standards: ["TS 50701", "IEC 62278-1:2025"],
    related: [
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 },
      { label: same("Rail & Transportation"), path: RAIL }
    ],
    reviewed: REVIEWED
  },
  {
    id: "fmeca",
    term: same("FMECA"),
    aka: ["Failure Modes, Effects and Criticality Analysis"],
    definition: same(
      "A systematic engineering study recording, for each component, the ways it can fail, what happens when it does, and how critical that outcome is."
    ),
    why: same(
      "It is the plant's own answer to the question of what matters here — written by engineers who were not thinking about cyber at the time. That is precisely why it holds up when a cyber finding is attached to it: the consequence is not the security team's opinion."
    ),
    oxot: same(
      "FMECA is one of the anchor inputs at the consequence end of OXOT's model, with hazard logs, SCIL, RCIL, RAMS records and minimum operating requirements. Disputing a modelled loss figure means disputing your own FMECA — which is a productive argument, because it ends with a better record either way."
    ),
    standards: ["IEC 60812"],
    related: [
      { label: same("How it works"), path: PATHS.howItWorks },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "hbom",
    term: same("HBOM"),
    aka: ["Hardware bill of materials"],
    definition: same(
      "The structured inventory of the physical components inside a product, down to the parts carrying their own firmware, identity or supply-chain exposure."
    ),
    why: same(
      "Hardware is where end-of-life, counterfeit-part and supplier-dependency questions live, and none of them are answerable from a software inventory. An HBOM is also what makes a support notice actionable across an estate rather than device by device."
    ),
    oxot: same(
      "One of the five bills of materials OXOT tracks. Supplier change and end-of-life notices are assessed against HBOM and SBOM together, with support dependency, spare availability and replacement plan recorded alongside."
    ),
    standards: ["CRA", "IEC 62443"],
    related: [
      { label: same("Cyber Resilience Act"), path: PATHS.assuranceCra },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "iec-62443",
    term: same("IEC 62443"),
    definition: same(
      "The international series for security of industrial automation and control systems. Within it, IEC 62443-3-2 covers defining the system under consideration, partitioning it into zones and conduits, assessing risk, and establishing target security levels; IEC 62443-3-3 then defines the system security requirements and levels that meet them."
    ),
    why: same(
      "It is the reference most OT security programmes are argued against, and the part that bites is 3-2: the standard asks for a partitioned system with risk assessed per zone and conduit, which is a modelling exercise before it is a control-selection exercise."
    ),
    oxot: same(
      "OXOT supports IEC 62443-aligned system modelling, zones and conduits, risk assessment, risk-treatment reasoning, control simulation and lifecycle traceability. It does not certify and does not guarantee conformity — it produces the evidence and the decision record an assessment runs on."
    ),
    standards: ["IEC 62443-3-2", "IEC 62443-3-3"],
    related: [{ label: same("IEC 62443"), path: PATHS.assuranceIec62443 }],
    reviewed: REVIEWED
  },
  {
    id: "iec-62278-1",
    term: same("IEC 62278-1"),
    aka: ["Part 1: Generic RAMS process"],
    definition: same(
      "“Railway applications — Specification and demonstration of reliability, availability, maintainability and safety (RAMS) — Part 1: Generic RAMS process.” The 2025 edition structures how a railway system is defined, hazards identified, safety objectives established, requirements derived and apportioned, and the safety argument demonstrated and kept current."
    ),
    why: same(
      "It governs the lifecycle a railway safety argument lives inside, and it is deliberately independent of the technology used in the systems it covers. A cybersecurity question therefore has to be brought into that lifecycle rather than answered beside it."
    ),
    oxot: same(
      "OXOT supports IEC 62278-1 evidence by connecting hazards, safety objectives, requirements, cyber pathways, dependencies, controls, verification and change impact in one model. It does not assign SIL, determine safety acceptance, authorize a railway system, or replace the hazard-log owner."
    ),
    standards: ["IEC 62278-1:2025", "TS 50701"],
    /* No dedicated Part 1 page exists — the site's one IEC 62278 page is
       genuinely about Part 2 (corrected 2026-08-23). Pointing this entry's
       related link at it, honestly labelled by what it actually is, beats
       a dead link or a self-contradicting "IEC 62278-1" label on a Part-2
       page. */
    related: [{ label: same("IEC 62278-2:2025 (OXOT's page)"), path: PATHS.assuranceIec62278 }],
    reviewed: REVIEWED
  },
  {
    id: "iec-62278-2",
    term: same("IEC 62278-2"),
    aka: ["Part 2: Systems approach to safety"],
    definition: same(
      "Part 2 of the same railway RAMS series, covering the systems approach to safety. It is a distinct part of the standard from Part 1, not an alternative numbering of it: Part 1 is the generic RAMS process, Part 2 the systems approach to safety."
    ),
    why: same(
      "The two parts are easy to confuse and the confusion matters in a document that has to cite the correct one. The former EN 50126 / IEC 62278:2002 was replaced at IEC level by these two parts, which is where much of the mixed referencing comes from."
    ),
    oxot: same(
      "OXOT lists both parts among the railway frameworks its model produces evidence for. As with Part 1, it supports the analysis and the traceable record; safety acceptance and the safety argument itself stay with the accountable railway process."
    ),
    standards: ["IEC 62278-2:2025", "IEC 62278-1:2025"],
    related: [
      { label: same("IEC 62278-2:2025"), path: PATHS.assuranceIec62278 },
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 }
    ],
    reviewed: REVIEWED
  },
  {
    id: "interlocking",
    term: same("Interlocking"),
    definition: same(
      "The safety-critical system preventing conflicting train movements, by ensuring signals, points and routes can only be set in combinations that are safe. Implemented in relays historically and in computers today, it is the classic railway fail-safe function."
    ),
    why: same(
      "An interlocking is where a rail cybersecurity question becomes a rail safety question. A cyber route reaching an interlocking, or the engineering workstation that configures one, is a materially different finding from a route reaching a passenger-information display."
    ),
    oxot: same(
      "Interlockings, wayside controllers, zone controllers and the engineering environments that maintain them are modelled as assets inside a rail system under consideration, with the conduits reaching them and the safety consequence behind them made explicit."
    ),
    standards: ["TS 50701", "IEC 62278-1:2025"],
    related: [
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 },
      { label: same("Rail & Transportation"), path: RAIL }
    ],
    reviewed: REVIEWED
  },
  {
    id: "mor",
    term: same("MOR"),
    aka: ["Minimum operating requirements"],
    definition: same(
      "The statement of what a site cannot run without — the threshold between a degraded plant and a stopped one, expressed as the systems, redundancy and capacities that have to remain available."
    ),
    why: same(
      "An availability target describes an aspiration; minimum operating requirements describe a cliff. They are what turns “this system is important” into a number, and they are usually already written down for reasons that have nothing to do with cybersecurity."
    ),
    oxot: same(
      "OXOT carries minimum operating requirements as a hard boundary in the model rather than as an annotation, and they are one of the two inputs to the loss side of an ALE calculation, the other being the RAMS cascade. With SCIL and RCIL, they are among the documents that matter more than their profile suggests."
    ),
    related: [
      { label: same("How it works"), path: PATHS.howItWorks },
      { label: same("Where do we invest?"), path: PATHS.decisionInvestment }
    ],
    reviewed: REVIEWED
  },
  {
    id: "nis2",
    term: same("NIS2"),
    definition: same(
      "The EU directive on measures for a high common level of cybersecurity across the Union, placing risk-management, governance and incident-reporting obligations on entities in essential and important sectors, with accountability resting on management bodies."
    ),
    why: same(
      "Unlike a product regulation, NIS2 reaches the operator, and its reporting clock is short. The practical question becomes evidence readiness — whether the organization can describe its risk position and its incident quickly enough — rather than whether it holds a certificate."
    ),
    oxot: same(
      "OXOT's contribution is the record underneath: what the environment is, what is reachable, what the consequence would be, and what was decided about it and by whom. OXOT does not guarantee conformance with NIS2 or any other framework."
    ),
    standards: ["NIS2"],
    related: [{ label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }],
    reviewed: REVIEWED
  },
  {
    id: "ops-bom",
    term: same("Ops-BOM"),
    aka: ["Operations bill of materials"],
    definition: same(
      "An inventory of the workflows, maintenance schedules and human access roles around a system, rather than the components inside it. The fifth of OXOT's five bills of materials."
    ),
    why: same(
      "Most of what actually changes an environment's exposure is operational: who holds access, when a maintenance window opens, which procedure permits a temporary connection. None of that appears in a software or hardware inventory, and all of it is what an attacker and an auditor both ask about."
    ),
    oxot: same(
      "Ops-BOM sits with SBOM, HBOM, CBOM and SaaS-BOM in OXOT's bill-of-materials tracking, giving the model the human and procedural layer the other four do not carry."
    ),
    related: [
      { label: same("Integrations"), path: PATHS.integrations },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "p-and-id",
    term: same("P&ID"),
    aka: ["Piping and Instrumentation Diagram"],
    definition: same(
      "The process-engineering drawing showing equipment, piping, instrumentation and control loops and how they connect. It is the authoritative description of what a process plant physically is and does."
    ),
    why: same(
      "It is the document that says what a controller actually controls. Without it, a cyber finding on a PLC is a finding on a network node; with it, the same finding attaches to a named process function and a physical consequence."
    ),
    oxot: same(
      "P&ID extraction is one of OXOT's core ingestion paths, with DEXPI 2.0 as the structured form. The Twin can then project the environment as a P&ID view alongside network, Purdue, dependency-graph and site views."
    ),
    related: [
      { label: same("How it works"), path: PATHS.howItWorks },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "purdue-model",
    term: same("Purdue Model"),
    aka: ["Purdue Enterprise Reference Architecture", "PERA"],
    definition: same(
      "The conventional layered reference model for industrial control architecture, running from enterprise systems at the top, through a demilitarized zone, down to supervisory, control and field levels. It gives a shared vocabulary for where a system sits and which boundary a given flow crosses."
    ),
    why: same(
      "Purdue describes intended structure. It is the starting point for a conversation about segmentation, not evidence of it — a level boundary on a drawing tells you where a flow ought to stop, not whether it does."
    ),
    oxot: same(
      "OXOT can project an environment as a Purdue view alongside P&ID, network, dependency-graph and site views. The projection is a way of reading the same model, not a separate model; the routes drawn on it come from topology exports, firewall configuration and flow evidence."
    ),
    standards: ["IEC 62443-3-2"],
    related: [
      { label: same("IEC 62443"), path: PATHS.assuranceIec62443 },
      { label: same("How it works"), path: PATHS.howItWorks }
    ],
    reviewed: REVIEWED
  },
  {
    id: "ptc",
    term: same("PTC"),
    aka: ["Positive Train Control"],
    definition: same(
      "The US train-control regime that enforces speed restrictions and movement authority, intervening automatically to stop a train where the crew does not act. It depends on onboard, wayside and back-office systems exchanging data."
    ),
    why: same(
      "PTC ties a safety enforcement function to a distributed communications and back-office architecture, so a cyber event can express itself as an enforced service restriction across a network rather than as a failure at one location."
    ),
    oxot: same(
      "OXOT models PTC-supporting components with dispatch, wayside interface units and yard systems in freight-rail environments, tracing the pathway through to the operational consequence — restriction, dispatching delay, mainline congestion, missed interchange."
    ),
    standards: ["TS 50701", "IEC 62443"],
    related: [
      { label: same("Rail & Transportation"), path: RAIL },
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 }
    ],
    reviewed: REVIEWED
  },
  {
    id: "rams",
    term: same("RAMS"),
    aka: ["Reliability, Availability, Maintainability and Safety"],
    definition: same(
      "The four properties the railway sector manages together across a system's lifecycle, and the process producing the evidence a safety case rests on. At IEC level the process is now set out in IEC 62278-1:2025, which with IEC 62278-2:2025 replaced the former EN 50126 / IEC 62278:2002."
    ),
    why: same(
      "In rail, a cybersecurity argument that ignores the RAMS record is not an argument the responsible engineering authority can use. The safety consequence of a cyber pathway becomes meaningful only when expressed against hazards and functions the RAMS process has already identified."
    ),
    oxot: same(
      "OXOT does not replace a safety case, hazard analysis, independent safety assessment, RAMS process or responsible engineering authority. It makes the relationship between a cyber pathway and its possible safety or operational consequence explicit, using the existing RAMS evidence as the anchor at the consequence end."
    ),
    standards: ["IEC 62278-1:2025", "TS 50701", "IEC 62443"],
    related: [
      { label: same("IEC 62278-2:2025"), path: PATHS.assuranceIec62278 },
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 },
      { label: same("Rail & Transportation"), path: RAIL }
    ],
    reviewed: REVIEWED
  },
  {
    id: "rcil",
    term: same("RCIL"),
    aka: ["Reliability-Critical Items List"],
    definition: same(
      "The list, derived from FMECA, of the items whose failure most affects reliability and availability — the plant's own ranking of what has to keep working, as distinct from what has to fail safe."
    ),
    why: same(
      "Safety criticality and reliability criticality are not the same ordering. A programme reading only the safety list will under-rate the things that stop production without endangering anybody, and both lists are needed to rank a cyber finding honestly."
    ),
    oxot: same(
      "RCIL is ingested with SCIL, FMECA and hazard records as part of the consequence anchor in OXOT's model. In rail engagement work these lists were mapped bidirectionally to MITRE ATT&CK for ICS techniques, connecting the reliability ranking to the cyber technique that could trigger it."
    ),
    related: [
      { label: same("How it works"), path: PATHS.howItWorks },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "risk-acceptance",
    term: same("Risk acceptance"),
    definition: same(
      "A recorded decision not to treat a risk, carrying the reasoning behind it, the accountable role, any conditions attached, and the date it expires. It is a decision, not the absence of one."
    ),
    why: same(
      "Most things in a backlog will not be fixed, and that is legitimate. What fails an audit and a staff change is not the acceptance itself but an acceptance with no reasoning behind it, no name against it, and no expiry on it."
    ),
    oxot: same(
      "OXOT records an accepted risk as a first-class object — status, accountable role, expiry date, attached evidence — with the route and the consequence it was accepted against preserved beside it. Revisiting it later means re-reading a decision rather than reconstructing one."
    ),
    standards: ["IEC 62443-3-2", "ISO 31000"],
    example: same(
      "An unreachable device carrying a high-severity CVE is accepted, with review triggered at the next firmware change — because what would invalidate the acceptance is a change in reachability, not the passage of time."
    ),
    related: [{ label: same("What can we accept?"), path: PATHS.decisionRiskAcceptance }],
    reviewed: REVIEWED
  },
  {
    id: "saas-bom",
    term: same("SaaS-BOM"),
    aka: ["Software-as-a-service bill of materials"],
    definition: same(
      "A bill of materials for the cloud and software-as-a-service dependencies an organization actually relies on — the services in the estate, rather than the code or hardware inside a product."
    ),
    why: same(
      "Cloud services are the dependency class least likely to appear on an OT architecture drawing and most likely to change without a change request. A remote-access broker, a licence server or a telemetry endpoint can carry real operational dependency while never being inventoried."
    ),
    oxot: same(
      "One of OXOT's five bills of materials, tracking the cloud services in the estate so an external dependency appears in the model as a dependency rather than as an assumption."
    ),
    related: [
      { label: same("Integrations"), path: PATHS.integrations },
      { label: same("Deployment and sovereignty"), path: PATHS.deploymentSovereignty }
    ],
    reviewed: REVIEWED
  },
  {
    id: "sbom",
    term: same("SBOM"),
    aka: ["Software bill of materials"],
    definition: same(
      "The structured, machine-readable inventory of the software components and versions inside a product, including transitive dependencies."
    ),
    why: same(
      "Without one, an advisory can only be answered by inspection, one device at a time. With one, asking which of your products contain a given component becomes a query — and therefore something answerable inside a regulator's reporting clock."
    ),
    oxot: same(
      "SBOMs are both an input to OXOT's model and an artifact it holds provenance for: which release a given SBOM belongs to, where it came from, and how far it can be relied on. Expressed in CycloneDX and feeding the CRA technical file."
    ),
    standards: ["CRA", "IEC 62443"],
    related: [
      { label: same("Cyber Resilience Act"), path: PATHS.assuranceCra },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "scil",
    term: same("SCIL"),
    aka: ["Safety-Critical Items List"],
    definition: same(
      "The list, derived from FMECA and the hazard log, mapping specific controllers, valves and sensors to the safety instrumented functions they serve and the safety integrity levels those functions carry."
    ),
    why: same(
      "It is the shortest available answer to which of these devices is actually protecting somebody. A cyber route terminating on a SCIL item is a different class of finding from one that does not — and the distinction was drawn by the safety process, not by the security team."
    ),
    oxot: same(
      "SCIL is ingested with RCIL, FMECA, hazard logs and RAMS records as the safety anchor at the consequence end of the model."
    ),
    standards: ["IEC 60812", "IEC 61508"],
    related: [
      { label: same("How it works"), path: PATHS.howItWorks },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "sil",
    term: same("SIL"),
    aka: ["Safety Integrity Level"],
    definition: same(
      "A rating, SIL 1 to SIL 4, for the reliability required of a safety instrumented function — how dependably it must perform when called upon. It is a property of a function, not of a device."
    ),
    why: same(
      "SIL is the language in which how-much-protection-is-enough has already been settled in a plant. Borrowing it loosely for cybersecurity is tempting and wrong: a security control is not a safety function, and a SIL rating is not a security rating."
    ),
    oxot: same(
      "OXOT does not calculate or assign SIL — that stays inside the accountable safety process. What the model does is make explicit which cyber pathways reach the functions already carrying a SIL rating, so the safety process has the cyber input it needs."
    ),
    standards: ["IEC 61508", "IEC 62278-1:2025"],
    related: [
      { label: same("IEC 62278-2:2025"), path: PATHS.assuranceIec62278 },
      { label: same("Evidence and data provenance"), path: PATHS.assuranceEvidenceProvenance }
    ],
    reviewed: REVIEWED
  },
  {
    id: "system-under-consideration",
    term: same("System under consideration"),
    aka: ["SuC"],
    definition: same(
      "The part of an industrial automation and control system a given assessment covers: the assets inside it, the boundary around it, and the interfaces crossing that boundary. IEC 62443-3-2 requires it to be defined before any partitioning or risk assessment begins."
    ),
    why: same(
      "Almost every argument about an assessment's conclusion is really an argument about its scope. Fixing the system under consideration first means a later finding can be checked against what was actually examined — and an absence of findings outside the boundary is not mistaken for a clean result."
    ),
    oxot: same(
      "OXOT holds the system under consideration as part of the model rather than as a line in a report, so the boundary, the assets inside it and the interfaces crossing it stay traceable back to the records they were drawn from. A change of scope becomes a change in the model, with a date on it."
    ),
    standards: ["IEC 62443-3-2"],
    example: same(
      "An assessment covers one production line's control system. The engineering workstation serving it sits outside the drawn boundary but has an interface across it — so it is in scope as an interface even though it is not in scope as an asset."
    ),
    related: [{ label: same("IEC 62443"), path: PATHS.assuranceIec62443 }],
    reviewed: REVIEWED
  },
  {
    id: "ts-50701",
    term: same("TS 50701"),
    definition: same(
      "The railway cybersecurity technical specification, built on IEC 62443 cybersecurity concepts and EN 50126 RAMS lifecycle thinking, applying security engineering to railway systems specifically."
    ),
    why: same(
      "Rail needed a specification that does not treat a signalling environment as a generic industrial network. TS 50701 is where the IEC 62443 partitioning vocabulary meets the railway's own safety lifecycle — which is the combination a rail cyber argument actually needs."
    ),
    oxot: same(
      "OXOT supports TS 50701 work by connecting the railway system, its operational dependencies, cyber pathways, safety and RAMS context and candidate controls in one model, and by preserving the assurance evidence behind each treatment decision. It does not guarantee conformance."
    ),
    standards: ["TS 50701", "IEC 62443", "IEC 62278-1:2025"],
    related: [
      { label: same("TS 50701"), path: PATHS.assuranceTs50701 },
      { label: same("Rail & Transportation"), path: RAIL }
    ],
    reviewed: REVIEWED
  },
  {
    id: "zone",
    term: same("Zone"),
    definition: same(
      "In IEC 62443, a grouping of assets sharing common security requirements. Zones can be defined by criticality, operational function, location, required access, responsible organization, or other relevant risk criteria."
    ),
    why: same(
      "Partitioning is what makes risk assessment tractable — you assess a zone and its conduits rather than an undifferentiated network. The common failure is that the zone model exists on a drawing while nobody can show which routes between zones are actually permitted."
    ),
    oxot: same(
      "OXOT turns the zone model from a static architecture diagram into a navigable one, with each zone's assets, dependencies and reachable pathways drawn from your own source records. A zone-and-conduit diagram is useful; a model that proves what can traverse it is more useful."
    ),
    standards: ["IEC 62443-3-2", "IEC 62443-3-3", "TS 50701"],
    related: [{ label: same("IEC 62443"), path: PATHS.assuranceIec62443 }],
    reviewed: REVIEWED
  }
];

/** Field labels, in one place — every entry renders the same words for the
 *  same field, and the translation pass changes eight strings, not eighty. */
export const FIELD_LABELS = {
  definition: same("Definition"),
  why: same("Why it matters"),
  oxot: same("OXOT context"),
  standards: same("Related standards"),
  example: same("Example"),
  related: same("Related resources"),
  reviewed: same("Last reviewed"),
  alsoKnownAs: same("Also"),
  /* Screen-reader-only, completing the bare letter mark on each group
     heading — "B" alone announces as a heading called "B". */
  termsBeginning: same("Terms beginning with"),
  backToIndex: same("Back to index")
};

export const HERO = {
  eyebrow: same("Resources · Glossary"),
  h1: same("The terms this site uses, defined once."),
  lead: same(
    "A technical reference layer for the vocabulary running through the product pages, standards pages, case studies and guides. Each entry says what the term means in plain English, why it changes a decision, and how OXOT applies it — so an unfamiliar word on another page costs you one lookup rather than an afternoon."
  ),
  /* The scope note matters more here than on most pages: a glossary that
     reads as a standards authority is a liability. */
  scopeHead: same("What this is, and is not"),
  scope: same(
    "These are working definitions as OXOT uses them, written to be consistent with the standards they reference. They are not a substitute for the standards themselves, and where a definition here is narrower than the formal one, the formal one governs."
  ),
  countLabel: same("Entries"),
  reviewedLabel: same("Reviewed"),
  indexHead: same("Jump to a term"),
  indexNote: same("Every entry, alphabetically.")
};

export const CLOSING = {
  h2: same("A term you needed and did not find?"),
  body: same(
    "This page grows from what buyers actually get stuck on. If a term on another page sent you here and this page did not answer it, that gap is worth telling us about — and it is usually a sign the other page should have explained itself."
  ),
  cta: same("Tell us what was missing"),
  ctaPath: PATHS.contact
};
