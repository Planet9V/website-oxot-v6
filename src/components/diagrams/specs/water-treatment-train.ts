import type { DiagramSpec } from "../types";

/**
 * WATER — a conventional surface-water treatment train, drawn as a P&ID.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * REPAIR WAVE R4 — THE PLANT CLARIFIED BEFORE IT COAGULATED. The audit's ranked
 * defect #2 was a PROCESS defect the drawing faithfully reproduced: the edge
 * list ran `CL-201 → MX-301 → F-401`, settling the raw water and then dosing
 * coagulant into it. Coagulation is what MAKES clarification work — it
 * destabilises the colloid, the rapid mix disperses it in seconds, and the
 * clarifier settles the floc. Downstream, the chemical has nothing left to do.
 *
 * The train is therefore now, in order:
 *
 *   T-101 intake  →  S-101 screen  →  P-101 lift pump   (FT-101 metering it)
 *     →  MX-201 rapid mix (coagulant from T-201 / P-201)
 *     →  CL-301 clarifier (sludge via P-301 to TK-301)
 *     →  F-401 dual-media filter  →  FCV-401 rate-of-flow control
 *     →  UV-501 UV reactor  (RIT-501 on its intensity)
 *     →  T-601 clearwell, chlorinated from T-501 / P-501
 *        (LT-601 on its level, AIT-601 on its outlet residual)
 *     →  V-601 outlet isolation  →  P-701 distribution pump
 *     →  CV-701 check valve  →  V-701 discharge isolation  (FT-701 metering it)
 *     →  DIST-01 distribution
 *
 * ────────────────────────────────────────────────────────────────────────────
 * REPAIR WAVE R6 — THE RESIDUALS, THE BACKWASH AND THE VALVES.
 *
 * THE SLUDGE TANK WAS A TERMINAL SINK — sludge in, nothing out, so every
 * kilogram the clarifier removed stayed on the page forever. `TK-301` now
 * decants supernatant back to the rapid mix and draws thickened sludge to
 * `SL-01`, off-drawing in the same sense `DIST-01` is: a works this size
 * thickens and tankers out, and a belt press it does not own would be the
 * invented unit operation wave R3 removed. The draw-off is also PUMPED now —
 * `CL-301 → TK-301` ran 244 units UP the page with nothing in the line, and
 * `P-301` is the rotary positive-displacement machine that moves 2-4% solids.
 *
 * BACKWASH, BECAUSE A FILTER THAT NEVER BACKWASHES BLINDS. Treated water goes
 * back through `V-402` into `F-401` and the spent washwater joins the residuals
 * stream, which is why `TK-301` is captioned for both duties: one residuals tank
 * is what a works this size has.
 *
 * FOUR VALVES FOR NAMED DUTIES, against the ONE this drawing carried in 22
 * elements — `V-601` the clearwell outlet, `V-701` the pump discharge beyond its
 * non-return, `V-402` the backwash supply, and `FCV-401` the filter's
 * rate-of-flow control, a GLOBE body because throttling a gate destroys its
 * seat. STILL ABSENT ON PURPOSE: suction isolation, underdrain and air-scour,
 * vessel drains — every valve a reader asks about while following the route, not
 * every valve the plant owns.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * CHLORINE IS DOSED TO THE CLEARWELL, NOT TO A SEPARATE INJECTION VESSEL, and
 * that is a decision rather than an omission: the clearwell IS the chlorine
 * contact tank, covered precisely so it can hold a residual, and the CT credit a
 * surface-water plant claims is earned in its volume. A distinct "injection
 * point" would be a symbol for a tapping on the clearwell inlet.
 *
 * TAGS ASCEND ALONG THE TRAIN, which they did not before: the old drawing
 * numbered the rapid mix MX-301 and the clarifier CL-201 while drawing the mixer
 * downstream, so the tag block and the pipe disagreed about the order of the
 * plant. Areas are 100 intake, 200 coagulation, 300 clarification, 400
 * filtration, 500 disinfection, 600 contact and storage, 700 distribution.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * WHY EACH SYMBOL IS THE ONE IT IS. Eight were `pid/…` stencils borrowed from a
 * neighbouring unit operation until an audit scored symbol correctness 17/30 and
 * named each one; they resolve now to `twin/pid-hand-drawn.tsx` under
 * `oxot/water/…`, because ISA-5.1 and ISO 10628 publish no stencil for several.
 * ONE LINE EACH: every mark carries its own measured doc comment beside its
 * geometry, and restating those paragraphs here would be a second copy to drift.
 *
 *   intake        cistern — an intake wet well IS a cistern (unchanged)
 *   screening     bar screen — a channel rack inclined against the flow, not an
 *                 inline basket strainer
 *   lift / dist.  centrifugal pump — the circle-and-vane form (unchanged)
 *   clarifier     CIRCULAR clarifier IN PLAN — roundness is the defining
 *                 property, and a section cannot show it
 *   residuals     conical-bottom vessel — a cone is for solids that bridge, and
 *                 settled sludge and washwater are exactly that
 *   sludge pump   gear pump — a ROTARY POSITIVE-DISPLACEMENT machine, the right
 *                 family for 2-4% solids
 *   flow control  globe valve — the plug at the seat is ISA's throttling mark
 *   isolation     gate valve — ISA's plain on/off block body, at V-402, V-601
 *                 and V-701
 *   day tank      closed vented day tank — hypochlorite off-gasses, so it is
 *                 sealed and vented, not an open dry-solids bunker. The same
 *                 mark serves T-201, a different chemical in the same vessel
 *   dosing pump   ISO metering pump — the diagonal ADJUSTMENT ARROW says the
 *                 displacement is settable, which is what a dose is
 *   flash mixer   rapid-mix chamber — the bare agitator had no basin, so the
 *                 impeller hung off the pipe in mid-air
 *   filtration    liquid filter — dashed media bed inside the shell (unchanged)
 *   clearwell     covered basin — the roof is the engineering claim. An open
 *                 basin cannot hold a free chlorine residual
 *   UV            UV reactor — lamp sleeves crossing a flow-through chamber
 *   discharge     inline swing check — the seat at the UPSTREAM face and the
 *                 flapper leaning downstream say the direction by where the ink
 *                 is, which the previous centre-stem mark did not say at all
 *
 * INSTRUMENTATION IS REAL ISA, NOT DECORATION. Each bubble carries its own
 * identification letters and loop number as text — `FT-101` a flow transmitter,
 * `AIT-601` an analysis indicating transmitter, `LT-601` a level transmitter,
 * `RIT-501` a radiation indicating transmitter — and `AIC-601` is drawn as a
 * SHARED display/control function (circle in square, solid location line)
 * because a dosing controller lives in the DCS, not in a field bubble. The
 * outputs to the PLC are electrical signal lines, which is why `EdgeKind` exists.
 *
 * `AIC-601`, NOT `FIC-601`, AND THE LETTER IS NOT COSMETIC. ISA-5.1's first
 * letter names the MEASURED VARIABLE, and this loop's process variable is
 * chlorine residual, read by `AIT-601`. There is no flow element anywhere in
 * the dosing line, so an `F` claimed a measurement the plant does not take.
 *
 * `RIT-501` IS THE INSTRUMENT A UV REACTOR CANNOT BE DRAWN WITHOUT, and `UV-501`
 * had none at all. A reactor claiming disinfection credit is dose-validated, and
 * dose is not measurable directly — it is inferred continuously from measured
 * INTENSITY, with flow and transmittance. Intensity is what the reactor's
 * control and its off-specification alarm both run on, so a UV reactor with no
 * bubble says the plant takes credit it cannot demonstrate.
 *
 * `R`, NOT `A`, AND THE FIRST LETTER IS THE WHOLE CLAIM. ISA-5.1's `R` is
 * RADIATION, which is what a UV intensity sensor reads; `A` is ANALYSIS, a
 * composition measurement, which is what `AIT-601` correctly is for free
 * chlorine. Tagging this `AIT` would assert an analysis the plant never takes.
 * `RIT` reads radiation, indicates at the reactor's own panel and transmits,
 * which is why it is not the bare `RT` the flow and level tags carry.
 *
 * THE PIPE DOES NOT RUN THROUGH THE BALLOONS, AND THIS IS THE SECOND ATTEMPT AT
 * IT. An earlier revision drew `FT-101`, `AIT-601` and `FT-701` on dead-end
 * stubs — an arrow ran into the analyser and nothing left it. The repair for
 * that spliced all three INTO the pipe run, which traded one error for another:
 * ISA-5.1 puts the PRIMARY ELEMENT in the line and connects its BALLOON by a
 * thin instrument line, because the balloon is a TAG, not a fitting. A process
 * line entering and leaving a circle says the water is routed through the tag.
 *
 * So the process runs equipment to equipment and every one of the five bubbles
 * hangs off the run it belongs to by an instrument connection, with its signal
 * to the PLC or the controller out the other side. Nothing flows along a
 * `capillary` and no bubble is a dead end.
 *
 * THE TRAIN ENDS SOMEWHERE. `DIST-01` is the distribution network itself, drawn
 * as the network cloud this component set already uses for the utility grid on
 * the energy single-line — an off-drawing destination, not a vessel this plant
 * owns. It carries NO edge label: the audit's defect #10 was that the "to
 * distribution" knock-out ate most of the 157-unit edge it sat on, and the
 * destination node is already tagged and captioned, so the label was restating
 * the thing it was obscuring.
 */

/**
 * WHY THE FEEDBACK AND RECYCLE EDGES ARE `rankReversed`, AND WHY IT IS NOT A
 * LAYOUT HACK.
 *
 * ELK layers a node AFTER every node with an edge into it. That is right for
 * pipe and WRONG for a control loop, which runs the other way by definition: the
 * measurement goes BACK to the controller and the command BACK to the final
 * element. Ranked forward, `AIT-601 → AIC-601 → P-501` made the dosing pump
 * out-rank the analyser trimming it, and since P-501 doses the clearwell the
 * clearwell out-ranked its own outlet — a cycle, which ELK broke by reversing an
 * arbitrary edge. The audit measured the result as defect #1: "the end of the
 * plant sits above its own beginning".
 *
 * Two classes of edge are therefore ranked in reverse and drawn unchanged: the
 * SIGNAL feedback paths, and — added in R6 — the two RECYCLE streams, the
 * clarifier's supernatant return and the backwash supply, which are physically
 * pipe flowing back against the train. Measured by running the real ELK over
 * this graph with the shipped `ELK_OPTIONS.pid`, changing nothing but the flags:
 *
 *                        routed pipe   bends   bends/edge   worst detour
 *   ranked forward          16,577      50        2.00         4.6x
 *   feedback reversed       11,311      42        1.68         4.5x
 *
 * A THIRD OF THE PIPE STILL WRAPS, AND THAT LEVER IS NOT IN THIS FILE.
 * `ELK_OPTIONS.pid` in ../layout.ts folds the train into rows at
 * `elk.aspectRatio: 0.6`, and every row break emits one full-canvas return line.
 * Reported to that file's owner rather than edited here.
 *
 * `FT-101 → PLC-01` is deliberately NOT reversed. It is the one signal edge that
 * ANCHORS the control cluster to the train's rank — without it the PLC has only
 * outgoing edges and ELK floats it to a margin, further from every instrument it
 * serves than the middle is.
 */
/** The analogue field signal, written once because four transmitters carry it
 *  and four copies of one bilingual literal are four chances to mistype one. */
const MA = { en: "4-20 mA", nl: "4-20 mA" };

export const WATER_TREATMENT_TRAIN: DiagramSpec = {
  type: "pid",
  sector: "water",
  title: {
    en: "Surface water treatment train",
    nl: "Zuiveringsstraat voor oppervlaktewater"
  },
  nodes: [
    {
      id: "intake",
      symbol: "pid/vessels/container_tank_cistern",
      tag: "T-101",
      zone: "Raw water intake",
      label: { en: "Raw water intake wet well", nl: "Ruwwaterinlaat, natte put" }
    },
    {
      id: "screen",
      symbol: "oxot/water/bar_screen",
      tag: "S-101",
      zone: "Raw water intake",
      label: { en: "Coarse bar screen", nl: "Grofrooster" }
    },
    {
      id: "lift-pump",
      symbol: "pid/pumps/centrifugal_pump_1",
      tag: "P-101",
      zone: "Raw water intake",
      label: { en: "Raw water lift pump", nl: "Ruwwater-opvoerpomp" }
    },
    {
      id: "ft-101",
      symbol: "isa/discrete/field/FT-101",
      zone: "Raw water intake",
      label: { en: "Raw water flow", nl: "Ruwwaterdebiet" }
    },
    {
      id: "coag-tank",
      symbol: "oxot/water/chemical_day_tank",
      tag: "T-201",
      zone: "Coagulant dosing",
      label: { en: "Coagulant day tank", nl: "Coagulant-dagtank" }
    },
    {
      id: "coag-pump",
      symbol: "oxot/water/metering_pump",
      tag: "P-201",
      zone: "Coagulant dosing",
      label: { en: "Coagulant metering pump", nl: "Coagulant-doseerpomp" }
    },
    {
      id: "mixer",
      symbol: "oxot/water/coagulant_mixer",
      tag: "MX-201",
      zone: "Coagulation",
      label: { en: "Rapid mix chamber", nl: "Snelmengkamer" }
    },
    {
      id: "clarifier",
      symbol: "oxot/water/clarifier",
      tag: "CL-301",
      zone: "Clarification",
      label: { en: "Circular clarifier", nl: "Ronde bezinktank" }
    },
    {
      id: "sludge-pump",
      symbol: "pid/pumps/gear_pump",
      tag: "P-301",
      zone: "Sludge handling",
      label: { en: "Sludge transfer pump", nl: "Slibtransportpomp" }
    },
    {
      id: "sludge",
      symbol: "pid/vessels/bunker_conical_bottom",
      tag: "TK-301",
      zone: "Sludge handling",
      label: { en: "Sludge and washwater tank", nl: "Slib- en spoelwatertank" }
    },
    {
      id: "sludge-out",
      symbol: "cset/cloud",
      tag: "SL-01",
      zone: "Sludge handling",
      label: { en: "Off-site sludge dewatering", nl: "Slibontwatering elders" }
    },
    {
      id: "filter",
      symbol: "pid/filters/liquid_filter",
      tag: "F-401",
      zone: "Filtration",
      label: { en: "Dual-media filter", nl: "Tweelaags filter" }
    },
    {
      id: "fcv-401",
      symbol: "pid/valves/globe_valve",
      tag: "FCV-401",
      zone: "Filtration",
      label: { en: "Filter rate-of-flow control", nl: "Filterdebietregelklep" }
    },
    // ONE LINE IN BOTH LOCALES, AND IT WAS MEASURED. "Backwash supply
    // isolation" wrapped to two lines and set "isolation" hard against the
    // `NaOCl` plate on the dosing run beside it — the render read "isolation
    // NaOCl" as one phrase. The short caption is what buys that space back.
    {
      id: "bw-valve",
      symbol: "pid/valves/gate_valve",
      tag: "V-402",
      zone: "Filtration",
      label: { en: "Backwash isolation", nl: "Spoelwaterafsluiter" }
    },
    {
      id: "uv",
      symbol: "oxot/water/uv_reactor",
      tag: "UV-501",
      zone: "Disinfection",
      label: { en: "UV disinfection reactor", nl: "UV-desinfectiereactor" }
    },
    {
      id: "rit-501",
      symbol: "isa/discrete/field/RIT-501",
      zone: "Disinfection",
      label: { en: "UV intensity", nl: "UV-intensiteit" }
    },
    {
      id: "dose-tank",
      symbol: "oxot/water/chemical_day_tank",
      tag: "T-501",
      zone: "Chlorine dosing",
      label: { en: "Hypochlorite day tank", nl: "Hypochloriet dagtank" }
    },
    {
      id: "dose-pump",
      symbol: "oxot/water/metering_pump",
      tag: "P-501",
      zone: "Chlorine dosing",
      label: { en: "Chlorine metering pump", nl: "Chloor-doseerpomp" }
    },
    {
      id: "clearwell",
      symbol: "oxot/water/clearwell",
      tag: "T-601",
      zone: "Chlorine contact and storage",
      label: { en: "Clearwell, chlorine contact", nl: "Reinwaterkelder, chloorcontact" }
    },
    {
      id: "lt-601",
      symbol: "isa/discrete/field/LT-601",
      zone: "Chlorine contact and storage",
      label: { en: "Clearwell level", nl: "Niveau reinwaterkelder" }
    },
    {
      id: "ait-601",
      symbol: "isa/discrete/field/AIT-601",
      zone: "Chlorine contact and storage",
      label: { en: "Free chlorine residual", nl: "Vrij chloorrestgehalte" }
    },
    {
      id: "aic-601",
      symbol: "isa/shared/panel/AIC-601",
      zone: "Control room",
      label: { en: "Chlorine residual controller", nl: "Chloorrestgehalte-regelaar" }
    },
    {
      id: "v-601",
      symbol: "pid/valves/gate_valve",
      tag: "V-601",
      zone: "Chlorine contact and storage",
      label: { en: "Clearwell outlet isolation", nl: "Afsluiter uitlaat reinwaterkelder" }
    },
    {
      id: "dist-pump",
      symbol: "pid/pumps/centrifugal_pump_1",
      tag: "P-701",
      zone: "Distribution",
      label: { en: "Distribution pump", nl: "Distributiepomp" }
    },
    {
      id: "cv-701",
      symbol: "oxot/water/check_valve_inline",
      tag: "CV-701",
      zone: "Distribution",
      label: { en: "Discharge check valve", nl: "Terugslagklep persleiding" }
    },
    // DOWNSTREAM OF THE NON-RETURN, so the check valve can come out dry.
    {
      id: "v-701",
      symbol: "pid/valves/gate_valve",
      tag: "V-701",
      zone: "Distribution",
      label: { en: "Pump discharge isolation", nl: "Afsluiter persleiding" }
    },
    {
      id: "ft-701",
      symbol: "isa/discrete/field/FT-701",
      zone: "Distribution",
      label: { en: "Distribution flow", nl: "Distributiedebiet" }
    },
    {
      id: "plc",
      symbol: "cset/plc",
      tag: "PLC-01",
      zone: "Basic control",
      label: { en: "Treatment PLC", nl: "Zuiverings-PLC" }
    },
    {
      id: "distribution",
      symbol: "cset/cloud",
      tag: "DIST-01",
      zone: "Distribution",
      label: { en: "Distribution network", nl: "Distributienet" }
    }
  ],
  edges: [
    /* ── THE TRAIN, IN THE ORDER THE WATER TAKES IT ──────────────────────── */
    { from: "intake", to: "screen", kind: "process" },
    { from: "screen", to: "lift-pump", kind: "process" },
    // THE PIPE RUNS PUMP -> RAPID MIX, AND THE BUBBLE HANGS OFF IT. FT-101's
    // primary element is installed in this length of pipe; the balloon is the
    // TAG for that element, reached by an instrument connection, and process
    // water does not flow through a tag. See the note above the spec.
    { from: "lift-pump", to: "mixer", kind: "process" },
    { from: "lift-pump", to: "ft-101", kind: "capillary" },
    // COAGULATION COMES FIRST. The coagulant is dosed into the rapid mix and
    // the floc it forms is what the clarifier then settles.
    { from: "coag-tank", to: "coag-pump", kind: "process" },
    {
      from: "coag-pump",
      to: "mixer",
      kind: "process",
      label: { en: "coagulant", nl: "coagulant" }
    },
    { from: "mixer", to: "clarifier", kind: "process" },
    // SLUDGE WITHDRAWAL IS THE UNIT OPERATION AND IT IS PUMPED — wave R6 above:
    // a hopper with nothing leaving it, and a draw-off running 244 units uphill.
    // `fromPort: "S"` because settled solids leave the FLOOR HOPPER, and the
    // sludge tank is laid out up and to the right — so bearing alone scored the
    // 3 o'clock effluent nozzle higher for this line as well as for the
    // clarified overflow, and the audit measured both leaving one point.
    // Separating those two streams is what a clarifier DOES.
    {
      from: "clarifier",
      to: "sludge-pump",
      kind: "process",
      fromPort: "S",
      label: { en: "sludge", nl: "slib" }
    },
    { from: "sludge-pump", to: "sludge", kind: "process" },
    // BOTH WAYS THE RESIDUALS STREAM CAN LEAVE: thickened solids to dewatering,
    // decanted supernatant back to the head, reverse-ranked as the recycle it is.
    {
      from: "sludge",
      to: "sludge-out",
      kind: "process",
      label: { en: "thickened sludge", nl: "ingedikt slib" }
    },
    {
      from: "sludge",
      to: "mixer",
      kind: "process",
      label: { en: "supernatant return", nl: "decantaatretour" },
      rankReversed: true
    },
    { from: "clarifier", to: "filter", kind: "process" },
    // RATE-OF-FLOW CONTROL GOES ON THE FILTER'S OUTLET: throttling the inlet
    // would drop the bed's pressure and pull air into the media.
    { from: "filter", to: "fcv-401", kind: "process" },
    { from: "fcv-401", to: "uv", kind: "process" },
    // BACKWASH — treated water driven back up through the bed, spent washwater
    // to the residuals tank. The supply legs run against the train, so reversed.
    // NO LABEL ON THE SUPPLY LEG: `V-402` is tagged and captioned "Backwash
    // isolation" at the end of it, so a "backwash supply" plate would restate
    // the thing it obscures — the same call the `DIST-01` note above records.
    { from: "clearwell", to: "bw-valve", kind: "process", rankReversed: true },
    { from: "bw-valve", to: "filter", kind: "process", rankReversed: true },
    {
      from: "filter",
      to: "sludge",
      kind: "process",
      label: { en: "backwash waste", nl: "spoelwaterafvoer" }
    },
    { from: "uv", to: "clearwell", kind: "process" },
    // Intensity is what the UV dose is computed from — the disinfection claim.
    { from: "uv", to: "rit-501", kind: "capillary" },
    // THE CLEARWELL IS THE CONTACT TANK, so the hypochlorite is dosed into it
    // rather than into a separate injection vessel upstream.
    { from: "dose-tank", to: "dose-pump", kind: "process" },
    { from: "dose-pump", to: "clearwell", kind: "process", label: { en: "NaOCl", nl: "NaOCl" } },
    // THE RESIDUAL IS READ ON THE CLEARWELL OUTLET. The analyser element sits in
    // that outlet; AIT-601 is its bubble, tapped off the vessel as LT-601 is,
    // with no treated water passing through either.
    { from: "clearwell", to: "v-601", kind: "process" },
    { from: "v-601", to: "dist-pump", kind: "process" },
    { from: "clearwell", to: "ait-601", kind: "capillary" },
    // THE DISCHARGE RUN, IN ORDER: pump, non-return, isolation, network — one
    // length of pipe, FT-701's element in it and its bubble hung off, not spliced.
    { from: "dist-pump", to: "cv-701", kind: "process" },
    { from: "cv-701", to: "v-701", kind: "process" },
    { from: "v-701", to: "distribution", kind: "process" },
    { from: "cv-701", to: "ft-701", kind: "capillary" },

    /* ── INSTRUMENT CONNECTIONS AND SIGNALS ─────────────────────────────── */
    // AN INSTRUMENT CONNECTION, NOT A PIPE. Nothing flows from the clearwell into
    // its level transmitter; `capillary` is this set's process-to-instrument line.
    { from: "clearwell", to: "lt-601", kind: "capillary" },
    // The one signal edge ranked forward — see the note above this spec.
    { from: "ft-101", to: "plc", kind: "electrical", label: MA },
    { from: "lt-601", to: "plc", kind: "electrical", label: MA, rankReversed: true },
    { from: "ft-701", to: "plc", kind: "electrical", label: MA, rankReversed: true },
    { from: "rit-501", to: "plc", kind: "electrical", label: MA, rankReversed: true },
    // OPEN circles, not filled: PLC-01 and the chlorine residual controller are
    // functions of ONE control system, which is the ISA distinction between a
    // shared-system link and a link crossing independent systems.
    { from: "plc", to: "aic-601", kind: "data-link", sharedSystem: true },
    {
      from: "ait-601",
      to: "aic-601",
      kind: "electrical",
      label: { en: "residual", nl: "restgehalte" },
      rankReversed: true
    },
    // NO LABEL, AND IT LOST ONE IN R6. It carried "stroke cmd"; the R6 nodes
    // moved AIC-601 nearer the pump it trims and the plate landed ON `P-501`'s
    // tag. A conduit running from a residual controller INTO a metering pump,
    // both ends captioned, already says the controller sets the dose.
    { from: "aic-601", to: "dose-pump", kind: "electrical", rankReversed: true }
  ]
};
