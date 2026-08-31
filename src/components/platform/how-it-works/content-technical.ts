/**
 * THE TECHNICAL CREDIBILITY LAYER — eight modules, disclosed one at a time.
 *
 * Split out of ./content.ts for two reasons. The 500-line limit is the
 * mechanical one; the real one is that this material has a different job from
 * the rest of the page. The chain sections are an argument a CISO reads
 * straight through. This is the answer to "prove it" from a chief architect,
 * a controls engineer or an M&A technical diligence lead — a specification,
 * read out of order, one module at a time.
 *
 * platform.md is explicit that it must stay collapsed: "keep these as
 * progressive disclosure — accordions, tabs, or a downloadable specification —
 * so the primary product story stays buyer-readable." Rendered open, eight
 * modules of this density would be longer than the entire narrative above it
 * and would bury it.
 *
 * The module list is platform.md's own, minus the compliance-outputs entry —
 * that one has five real pages of its own under /assurance and is routed to
 * from the page's ONWARD section rather than summarised in a drawer.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";

export interface TechModule {
  id: string;
  name: Bilingual;
  /** One line, visible on the closed trigger — enough to decide whether to open it. */
  summary: Bilingual;
  body: Bilingual;
  detail: readonly Bilingual[];
}

export const TECHNICAL = {
  kicker: same("Technical detail"),
  h2: same("The parts, for the people who will be asked to defend them."),
  intro: same(
    "Eight modules, collapsed by default so the argument above stays readable. Open the ones that matter to your discipline; the full treatment is in the technical specification."
  ),
  modules: [
    {
      id: "physics",
      name: same("Facility physics and process constraints"),
      summary: same("Why the bottom layer is thermodynamics rather than a firewall."),
      body: same(
        "The lowest layer of the model is the physical behaviour of the plant — the process, its energy and material flows, and the tolerances the equipment was specified against. Everything above it inherits consequence from here, which is why a finding is expressed in production, safety and euros rather than in severity."
      ),
      detail: [
        same("Thermodynamic and fluid-dynamic behaviour of the modelled process"),
        same("Kinetics, residence times and the rate at which a deviation becomes a loss"),
        same("Design tolerances, trip settings and the margin between them"),
        same("Minimum operating requirements as a hard boundary in the model, not an annotation")
      ]
    },
    {
      id: "assets",
      name: same("OT assets and control-system mapping"),
      summary: same("PLC, SCADA, RTU and HMI configuration bound to the function each one performs."),
      body: same(
        "Every controller in the model is bound to what it actually does. An asset inventory that stops at make, model and firmware cannot tell you what a compromise of that asset stops; one bound to control logic and interlock schedules can."
      ),
      detail: [
        same("PLC programs and control logic, mapped to the loops and interlocks they execute"),
        same("SCADA and HMI project configuration, including alarm and set-point handling"),
        same("RTU and gateway configuration at remote and unmanned sites"),
        same("Firmware and version state per device, carried through into the bills of materials"),
        same("Safety instrumented functions and their SIL determination, kept distinct from basic process control")
      ]
    },
    {
      id: "purdue",
      name: same("Purdue Level 0–4 modelling and segmentation verification"),
      summary: same("Zones, conduits, and what actually crosses them — checked against configuration."),
      body: same(
        "The estate is partitioned the way IEC 62443 partitions it, into zones and conduits, and the partition is verified against configuration rather than accepted from a drawing. A conduit that a firewall rule quietly bypasses is among the most common findings, and it is invisible on an architecture diagram."
      ),
      detail: [
        same("Purdue Level 0 to Level 4 assignment for every modelled asset"),
        same("Zone and conduit definition, with target and achieved security levels per zone"),
        same("Segmentation verified against VLAN, routing and firewall configuration as deployed"),
        same("Virtual firewall placement tested inside the model before it is proposed for the plant"),
        same("Topology and PCAP analysis, to establish flows that exist but are not documented"),
        same("Remote-access routes — vendor, OEM and internal — enumerated as first-class pathways")
      ]
    },
    {
      id: "pid",
      name: same("P&ID extraction and DEXPI 2.0"),
      summary: same("Drawings turned into a queryable graph rather than an attached image."),
      body: same(
        "A P&ID as a PDF is a picture of a plant. Extracted into DEXPI 2.0 it becomes equipment, instruments, lines and their connectivity — a graph the model can traverse, and the reason a cyber finding can be traced to a physical line rather than to an IP address."
      ),
      detail: [
        same("Equipment, instrument, line and valve extraction with tag preservation"),
        same("DEXPI 2.0 as the interchange representation, not a proprietary schema"),
        same("Connectivity retained, so upstream and downstream effects stay traversable"),
        same("Reconciliation against the asset register, producing an explicit discrepancy list")
      ]
    },
    {
      id: "protocols",
      name: same("Protocols and integrations"),
      summary: same("Industrial and IT protocols understood, and the systems of record already in place."),
      body: same(
        "The model reads the systems the business already runs rather than asking for a parallel inventory. Protocol behaviour matters because reachability depends on what a protocol permits, not only on whether a port is open."
      ),
      detail: [
        same("Industrial protocols including OPC UA, MQTT, Modbus and vendor-specific control traffic"),
        same("IT and transport protocols, where they carry OT traffic across a conduit"),
        same("Integration with asset management systems, historians and network monitoring platforms"),
        same("Integration with service management, so remediation lands in the queue engineering already uses"),
        same("Existing OT monitoring inventories consumed as an input rather than displaced")
      ]
    },
    {
      id: "boms",
      name: same("CycloneDX bills of materials"),
      summary: same("Five dependency views, versioned and diffable."),
      body: same(
        "Dependency state is held as CycloneDX bills of materials rather than as a spreadsheet, which is what makes change reportable. Two versions of a BOM produce a diff; two spreadsheets produce a meeting."
      ),
      detail: [
        same("Software bill of materials for control-system and platform software"),
        same("Hardware bill of materials, down to component and firmware level"),
        same("Cryptographic bill of materials, for algorithm and certificate exposure"),
        same("SaaS bill of materials, covering externally hosted dependencies"),
        same("Operational bill of materials — the people, procedures and suppliers a function depends on"),
        same("Versioned and diffable, so a firmware change regenerates the affected risk deltas")
      ]
    },
    {
      id: "threat",
      name: same("Threat, vulnerability and external-pressure intelligence"),
      summary: same("Likelihood inputs, scored against this facility rather than in general."),
      body: same(
        "External intelligence enters the model as likelihood and nothing else. It is fingerprinted against the facility, so an advisory about a product nobody has installed does not move a number, and one about a product sitting on a reachable pathway does."
      ),
      detail: [
        same("Adversary profiles: capability, motivation and demonstrated interest in the sector"),
        same("Technique and TTP fit against the protocols and products actually present"),
        same("Vulnerability data enriched with known-exploited status rather than severity alone"),
        same("Geopolitical, economic and infrastructure pressure bound to the site's real location"),
        same("Supplier and value-chain exposure, including knock-on failure elsewhere in the chain"),
        same("Every input dated and cited beside the value it moved")
      ]
    },
    {
      id: "loss",
      name: same("Loss modelling and provenance"),
      summary: same("Monte Carlo over the pathway set, with every figure traceable to its inputs."),
      body: same(
        "The financial layer is a simulation with stated uncertainty, not a rating. Its credibility rests entirely on provenance: a distribution nobody can trace back to its inputs is no more defensible than a score out of five."
      ),
      detail: [
        same("Monte Carlo simulation across pathways, consequences and likelihood inputs"),
        same("Annualised loss expectancy, tail exposure and confidence intervals reported together"),
        same("Exposure delta per candidate control, computed against the same pathway set"),
        same("Bounded investment recommendation, with an explicit diminishing-return ceiling"),
        same("Full provenance: every value traceable to the input, source and retrieval date behind it"),
        same("Drill from an organisational index down to a single component, and roll the result back up")
      ]
    }
  ] satisfies readonly TechModule[]
};
