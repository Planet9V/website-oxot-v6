/**
 * S05 · THE TEN RISK SCENARIOS — data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * in the oxot_website_public_sept repo, the risk-scenario table at L171-182.
 * Every `L<n>` below is a line number in that file. The table has exactly ten
 * rows and all ten are here: none was dropped, and none was padded in to reach a
 * round number. Each row carries four source cells — the scenario, the cyber/OT
 * pathway, the water or wastewater impact, and the decision the Twin supports —
 * transcribed, not paraphrased.
 *
 * DISTINCT FROM `content.scenario.ts`, WHICH IS A DIFFERENT FILE AND A DIFFERENT
 * THING. That one (singular) is Wave 0's `DOSING_SCENARIO`: the single worked
 * example the hero and S07 both render, from the brief's L205-270 use case. This
 * one (plural) is the ten-row register. They overlap in subject at exactly one
 * point — row `dosing-manipulation` below is the register's one-line version of
 * the story S07 tells in full — and that overlap is the brief's own, not a
 * duplication introduced here.
 *
 * ── THE ONE PIECE OF DERIVED CONTENT IN THIS FILE, AND ITS FULL ARGUMENT ─────
 *
 * `consequence` is NOT in the brief's table. It is a five-value class derived
 * from the ten impact cells, and because it is derived it is held to a higher
 * standard than the transcribed cells: every assignment below quotes the phrase
 * in its own impact cell that carries it, and the two rows where the call was
 * genuinely arguable say so rather than presenting a clean answer.
 *
 * WHY DERIVE ANYTHING AT ALL. L169 is a constraint, not decoration: "Unlike the
 * manufacturing page, do not use generic 'production outage' examples. These
 * scenarios should be visually tied to water chemistry, hydraulics, treatment
 * barriers, and environmental compliance." A register that renders ten
 * interchangeable rows satisfies that sentence in the copy and defeats it in the
 * layout. The consequence class is what makes the KIND of harm visible per row.
 *
 * WHY NOT THE HEADLINE'S OWN TRIPLE. L167's headline names "a water-quality,
 * flooding, or permit consequence", and a four-value scheme along those lines
 * (water-quality / hydraulic / environmental-permit / availability) was the
 * obvious candidate. It was tried and REJECTED, because it does not partition
 * the brief's actual rows:
 *   · `undocumented-drift` (L181) has no physical consequence at all — its
 *     impact cell is "Security model and operating assumptions become
 *     inaccurate". It belongs to none of the four, and forcing it into
 *     "availability" would invent a consequence the brief does not state.
 *   · `lift-station` (L175) and `pressure-zone` (L177) are each genuinely two
 *     of the four at once. A tiebreak on the decision column was tested and
 *     failed: L175's decision ("Identify reachable field assets, power/telemetry
 *     dependencies, and safe fallback controls") points at availability and
 *     would discard the sewage release, which is the consequence that actually
 *     matters in that row.
 * So the taxonomy below was derived UPWARD from the ten impact cells instead of
 * imposed downward from the headline. It has five values, and every row lands in
 * exactly one.
 *
 * WHY IT IS A FACET AND NOT AN INDEX PARTITION. The register could have been
 * grouped by class, with each class a subheading. It is not, for two reasons.
 * Five subheadings over ten rows is a heading for every two rows, which reads as
 * chrome and makes the master column measurably taller for no added information.
 * And a grouped index implies a ranking the brief never states: the classes are
 * different KINDS of harm, not ordered severities, and stacking them would
 * invite the reader to take the top group as the worst. So the class rides on
 * each row as a tag, and in the detail pane as a chip on the trace's IMPACT beat
 * — the beat it actually classifies — plus a one-line gloss beneath the drawing,
 * because a derived taxonomy owes the reader its definitions on the page and not
 * only in this comment.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/**
 * The five classes, derived from the impact cells at L172-181. Membership counts
 * are 4 / 2 / 2 / 1 / 1 — deliberately not balanced, because the brief's rows
 * are not balanced. Four of the ten scenarios end in the utility losing sight or
 * command of its own process, and that concentration is a finding about the
 * sector, not a flaw in the taxonomy to be smoothed away.
 */
export type ConsequenceClass = "barrier" | "release" | "hydraulic" | "command" | "model";

export const CONSEQUENCE_CLASSES: Record<ConsequenceClass, { label: Bilingual; gloss: Bilingual }> = {
  barrier: {
    label: same("Treatment barrier"),
    gloss: same("The disinfection barrier is deviated, or can no longer be confirmed to be working.")
  },
  release: {
    label: same("Containment and permit"),
    gloss: same("Material leaves the plant or the collection system, and a reporting obligation follows it.")
  },
  hydraulic: {
    label: same("Hydraulic integrity"),
    gloss: same("Pressure, flow and storage stop behaving the way the network is operated to assume.")
  },
  command: {
    label: same("View and control"),
    gloss: same("The first loss is the utility's ability to see or drive its own process.")
  },
  model: {
    label: same("Model integrity"),
    gloss: same("Nothing physical happens yet. What breaks is the accuracy of the assumptions everything else rests on.")
  }
};

export interface ScenarioRow {
  id: string;
  title: Bilingual;
  pathway: Bilingual;
  impact: Bilingual;
  decision: Bilingual;
  consequence: ConsequenceClass;
  citation: Bilingual | null;
}

const ITEMS: ScenarioRow[] = [
  {
    id: "exposed-controller",
    /* L172 */
    title: same("Publicly exposed PLC or RTU"),
    pathway: same(
      "Internet-exposed controller, weak remote-access path, default/shared credentials, or insecure cellular/radio gateway."
    ),
    impact: same(
      "Operator lockout, altered setpoints, stopped pump, unavailable telemetry, inability to manage a remote facility."
    ),
    decision: same("Remove direct exposure; model secure gateway/VPN, allowlists, backup and recovery requirements."),
    /* COMMAND — "Operator lockout ... unavailable telemetry, inability to
       manage a remote facility". The cell names a stopped pump too, but every
       other consequence in it is about the operator being shut out of their own
       plant, and that is what the decision column acts on. */
    consequence: "command",
    /* L184, first clause only. The five concrete CISA recommendations that
       follow it in the source are NOT carried here: they are remediation
       guidance for the sector, not a property of this one row, and pasting them
       under a single scenario would misattribute their scope. */
    citation: same("EPA and CISA guidance emphasizes direct PLC internet exposure as a concrete sector risk.")
  },
  {
    id: "dosing-manipulation",
    /* L173 */
    title: same("Drinking-water chemical dosing manipulation"),
    pathway: same(
      "Path reaches chlorine, hypochlorite, fluoride, coagulant, pH, caustic, acid, or chemical-feed PLC/HMI."
    ),
    impact: same(
      "Under- or over-dosing; inadequate residual; corrosion-control deviation; water-quality event; possible consumer risk."
    ),
    decision: same(
      "Map control points and safety barriers; test restricted engineering access and segment chemical systems."
    ),
    /* BARRIER — "inadequate residual ... water-quality event". The disinfection
       barrier itself is deviated; the unambiguous case the class is named for. */
    consequence: "barrier",
    citation: null
  },
  {
    id: "disinfection-visibility",
    /* L174 */
    title: same("Loss of disinfection visibility"),
    pathway: same("Compromise disrupts analyser data, SCADA alarms, historian, PLC/HMI, or communications."),
    impact: same(
      "Utility cannot confirm residual, turbidity, UV performance, or treatment state; may need boil-water or operational response."
    ),
    decision: same(
      "Identify required telemetry paths, fail-safe conditions, backup measurement and manual-operating actions."
    ),
    /* BARRIER, not COMMAND, and the distinction is the point of having both
       classes. The pathway here is a visibility pathway, so COMMAND is the
       tempting read — but the impact cell is explicit that the harm lands on the
       barrier: the utility "cannot confirm residual ... may need boil-water".
       Treatment may be perfectly intact and the utility must still act as though
       it is not, because an unverifiable barrier is not a barrier. The class
       follows the consequence, never the pathway. */
    consequence: "barrier",
    citation: null
  },
  {
    id: "lift-station",
    /* L175 */
    title: same("Wastewater lift-station outage"),
    pathway: same("Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated."),
    impact: same("Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting."),
    decision: same("Identify reachable field assets, power/telemetry dependencies, and safe fallback controls."),
    /* RELEASE — one of the two genuinely arguable calls, recorded as arguable
       rather than presented as clean. "Wet-well overflow" is a hydraulic event
       and would justify HYDRAULIC on its own. The class is assigned on what the
       same cell says happens next — "sewage release ... environmental
       reporting" — because the overflow is the mechanism and the release is the
       consequence, and a register of consequences should be indexed on the
       second. A reader who expects this row under hydraulic integrity is not
       wrong about the physics. */
    consequence: "release",
    citation: null
  },
  {
    id: "aeration",
    /* L176 */
    title: same("Aeration-process disruption"),
    pathway: same("PLC/VFD/blower control, dissolved-oxygen loop, or plant HMI is altered."),
    impact: same(
      "Nitrification failure, elevated ammonia, biological-process upset, permit exceedance, prolonged recovery."
    ),
    decision: same("Test segmentation, control-lockdown, and fallback operating strategies."),
    /* RELEASE — "elevated ammonia ... permit exceedance". Effluent that fails
       its consent leaves the works and is reportable, the same class of harm as
       the lift station even though the mechanism is biological, not hydraulic. */
    consequence: "release",
    citation: null
  },
  {
    id: "pressure-zone",
    /* L177 */
    title: same("Pump / pressure-zone manipulation"),
    pathway: same("Remote pump, VFD, PRV, valve, or pressure controller is affected."),
    impact: same(
      "Low pressure, tank overflow, pressure transient, service disruption, possible contamination ingress risk."
    ),
    decision: same("Model hydraulic and operational implications of control changes before implementation."),
    /* HYDRAULIC — the second arguable call. "possible contamination ingress
       risk" reaches toward BARRIER, and in a distribution system a sustained
       low-pressure event genuinely is a water-quality event. HYDRAULIC wins on
       two grounds: the brief hedges that clause ("possible ... risk") while
       stating the pressure effects flatly, and the decision column is explicitly
       hydraulic — "Model hydraulic and operational implications". Both the
       stated consequence and the stated decision point the same way, which is
       the tiebreak that failed on the lift-station row. */
    consequence: "hydraulic",
    citation: null
  },
  {
    id: "scada-ransomware",
    /* L178 */
    title: same("Ransomware in the SCADA/utility environment"),
    pathway: same(
      "Enterprise compromise reaches SCADA servers, historian, domain services, engineering workstations, file shares, or remote-access infrastructure."
    ),
    impact: same(
      "Loss of view/control, manual operation, delayed response, degraded coordination across multiple facilities."
    ),
    decision: same("Prioritize recovery dependencies and safe isolation steps."),
    /* COMMAND — "Loss of view/control, manual operation". The brief states the
       class almost verbatim. */
    consequence: "command",
    citation: null
  },
  {
    id: "vendor-compromise",
    /* L179 */
    title: same("Vendor / integrator compromise"),
    pathway: same(
      "Vendor laptop, support portal, remote-maintenance tunnel, or system-integrator account reaches plant or field controls."
    ),
    impact: same(
      "Persistent unauthorized path, configuration changes, disrupted support, fleet-wide exposure across standardized assets."
    ),
    decision: same("Compare vendor-access architectures and contract/control requirements."),
    /* COMMAND — "Persistent unauthorized path, configuration changes, disrupted
       support". Nothing in this cell reaches the process; what the utility loses
       is exclusive command of its own controls, across the whole standardised
       fleet at once. */
    consequence: "command",
    citation: null
  },
  {
    id: "storm-plus-cyber",
    /* L180 */
    title: same("Storm, flood, or power outage plus cyber disruption"),
    pathway: same(
      "Weather event reduces staffing, power, fuel, and telecom reliability while a cyber incident affects OT visibility or control."
    ),
    impact: same("Compounded inability to pump, treat, monitor, communicate, or recover."),
    decision: same(
      "Model combined failure paths, manual workarounds, backup power, communications, and restoration priorities."
    ),
    /* COMMAND — "Compounded inability to pump, treat, monitor, communicate, or
       recover". The cell lists treating and pumping alongside monitoring, so
       BARRIER and HYDRAULIC are both latent here; the organising noun is
       "inability", and what the compounding destroys is the utility's capacity
       to act on any of them. */
    consequence: "command",
    citation: null
  },
  {
    id: "undocumented-drift",
    /* L181 */
    title: same("Undocumented field-asset drift"),
    pathway: same(
      "Replacement RTU, modem, PLC, VFD, or radio configuration is changed during field maintenance without full documentation."
    ),
    impact: same(
      "Security model and operating assumptions become inaccurate; new remote route or unsafe configuration persists."
    ),
    decision: same("Detect model deltas and re-evaluate reachability and operational impact."),
    /* MODEL — "Security model and operating assumptions become inaccurate".
       This is the row that broke the headline's four-class scheme and forced the
       taxonomy to be derived from the cells instead. No water moves, no permit
       is breached and no operator is locked out; what degrades is the
       truthfulness of the model every other row is reasoned about with. Giving
       it its own class is the honest option — the alternative was to file a
       documentation failure under "availability" and invent an outage the brief
       never claims. It is also the one row whose consequence is specifically a
       Twin consequence, which is why its decision column asks for model deltas
       rather than for a control. */
    consequence: "model",
    citation: null
  }
];

export const SCENARIOS = {
  listLabel: same("Water and wastewater risk scenarios"),
  detailLabel: same("Selected scenario"),
  classLabel: same("Consequence class"),
  /* The three beat labels are the brief's own column headers (L171), kept as the
     column headers rather than restyled into friendlier words: the register is a
     transcription of a table and should read as one. */
  beat: {
    pathway: same("Cyber / OT pathway"),
    impact: same("Water or wastewater impact"),
    decision: same("Decision the Twin supports")
  },
  items: ITEMS
};
