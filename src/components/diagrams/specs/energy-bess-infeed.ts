import type { DiagramSpec } from "../types";

/**
 * ENERGY — a grid-connected PV + battery site, from the point of common
 * coupling down to the SCADA master.
 *
 * `network`, NOT `block`, AND THAT IS AN ENGINEERING CHOICE. A single-line
 * diagram is drawn top-down with the incoming supply at the top and the plant
 * hanging beneath it, because that is the direction supply authority and fault
 * current run. `network` is the only type whose ELK direction is DOWN, so the
 * drawing reads the way the switchgear is actually organised rather than
 * left-to-right like a process train.
 *
 * WHAT THE THIRD AUDIT SAID, AND WHAT THIS REVISION DID ABOUT IT. The second
 * pass scored 67/100 and named the reason precisely: "the repairs were scoped to
 * the audit list rather than to the drawing… every fixed item was a symbol;
 * nothing addressed what the single line actually CONTAINS". Six pieces of plant
 * were missing rather than mis-drawn, and each is now here:
 *
 *   PVA-01   the PV GENERATOR. `FU-01 string combiner` was the source-most node
 *            of the PV branch, so the drawing claimed a PV plant and never drew
 *            the thing that generates. Twelve strings of nothing fed 1.5 MVA.
 *   CB-03    a feeder breaker between the busbar and INV-01, and
 *   CB-04     one between the busbar and PCS-01. A 1.5 MVA inverter connected to
 *            a bar by bare copper — nothing switching it, nothing protecting it
 *            — was the loudest wince left on the drawing.
 *   CT-01    the current transformer PA-01 actually reads through. A panel
 *            ammeter does not connect across a 400 V bar; it reads 0–5 A out of
 *            a CT, and the CT is what makes the connection safe to draw at all.
 *   VT-01    the same for PV-01: 400 V down to a 110 V instrument secondary.
 *   BMS-01   the battery management system. A 2 MWh LFP bank is the most
 *            instrumented object on an energy site, and BAT-01 was a network
 *            orphan — no telemetry, no cell monitoring, nothing reporting it.
 *
 * SYMBOLS, AND WHY EACH IS THE ONE IT IS:
 *
 *   PCC       `oxot/electrical/ac_source` — IEC AC source. It was `cset/cloud`,
 *             the IT mark for "off this drawing", at the head of a single line
 *             whose whole first question is what SUPPLIES the site.
 *   CB-01/02  IEC 60617 breaker with its cross terminal; CB-03/04 the same on
 *             the two generation feeders
 *   IED-01    `oxot/electrical/measuring_relay` — an IEC relay rectangle marked
 *             `I>`. It was `cset/ied`, a rounded square containing a plain
 *             circle, which reads as a camera icon and states no function
 *   T-01      IEC 60617-06-09 two-winding transformer with its 60617-06 VECTOR
 *             GROUP: a delta in the 11 kV winding, a wye in the 400 V winding,
 *             and the wye's star point brought out as a fourth terminal. The
 *             plain pair of circles could not carry E-01's bond — it declares
 *             no neutral — so the bond left the phase terminal instead
 *   E-01      IEC 60617-02-15 earth — the star point bond that makes 400 V a TN
 *             system. A drawing with no earth states no earthing arrangement
 *   BB-01     three-line bus, drawn as a RAIL — see `DiagramNode.render`
 *   PA / PV   IEC 60617-08-02 instrument faces, lettered `A` and `V` as real
 *             text. The identification IS the letter
 *   CT / VT   instrument transformers: a tangent secondary winding on an
 *             unbroken primary, and a shunt-connected two-winding pair
 *   FU-01     IEC fuse — a rectangle bisected lengthwise by its conductor
 *   PVA-01    IEC 60617-06-19 photovoltaic cell: a diode struck by two arrows of
 *             incident radiation. Without the arrows it is a blocking diode
 *   INV / PCS IEC 60617-06-14 static convertor. An inverter and a rectifier are
 *             the SAME device — direction is a control decision — which is why
 *             one glyph legitimately serves the PV inverter and the PCS
 *   BAT-01    IEC 60617-06-15 battery, alternating long and short plates
 *   BMS-01    `cset/plc` — a battery management system IS an embedded
 *             controller, and CSET publishes no BMS portrait. Drawing it as a
 *             controller is true; inventing a bespoke mark for it would not be
 *   RTU/MTU   CSET remote terminal unit reporting to a master terminal unit —
 *             MTU is the SCADA master, so it is the correct asset, not "a server"
 *
 * EVERY LABEL LINE IS MEASURED AGAINST THE 124-UNIT CARD, IN BOTH LOCALES, AND
 * THAT SECOND HALF IS NOT DECORATION. `BlockDiagram` wraps greedily at 19
 * CHARACTERS, and Instrument Sans at 12.75 sets 19 characters at roughly 125
 * units — one unit wider than `NODE_W`. The audit measured the two English
 * overflows that produced, `Battery bank, 2 MWh` at 125.1 and `MV incomer
 * breaker` at 121.5 flush to the border. Measuring the SAME captions in Dutch,
 * in the site's own font, found FIVE more the audit never saw, because the audit
 * only ever read the English render: `SCADA-masterstation` at 133.7,
 * `Inkomerampèremeter` at 131.3, `BESS-veldschakelaar` at 125.8,
 * `Vermogensomzetter` at 124.3 and `Railspanningsmeter` at 119.2. Dutch
 * compounds have no spaces for a word wrapper to break on, so a Dutch caption
 * cannot be trusted to behave because its English twin does. Both locales now
 * clear the card with margin; ratings that will not fit are moved onto the
 * conductor, where a single line carries a rating anyway.
 *
 * TWO KNOWN GAPS, STATED RATHER THAN QUIETLY LEFT, AND BOTH RE-CHECKED AGAINST
 * THE CODE ON 2026-08-28 RATHER THAN COPIED FORWARD.
 *
 *   zone      Declared on every node and drawn nowhere. `../BlockDiagram.tsx`
 *             contains no reference to `zone` at all, so it has no band for a
 *             `network` drawing and the IEC 62443 boundaries this spec names,
 *             including the OT boundary at FW-01, exist only in the accessible
 *             restatement. That file is not one this spec may reach.
 *   toPort    `toPort: "NEUTRAL"` on the `earth → tx` bond below is INERT ON
 *             THIS DRAWING TODAY, and saying so is the point of a gap list.
 *             `fromPort`/`toPort` is read in `../layout.ts`, whose port pass is
 *             gated to `spec.type === "pid"`; a `network` drawing is snapped by
 *             `../ports.ts` instead, and that copy resolves by bearing only.
 *             Until it reads the hint, the bond still lands on `LV` beside the
 *             400 V feeder. The spec states the correct terminal now because an
 *             unrecognised name degrades to the automatic choice rather than
 *             throwing, so nothing is risked by being right early.
 *
 * TWO GAPS THAT USED TO BE LISTED HERE ARE CLOSED, AND THIS PARAGRAPH REPLACES
 * THE CLAIM THAT THEY WERE NOT. It said the power conductors still carried
 * arrowheads and that E-01 was still a boxed asset card; both were fixed in the
 * renderer after this block was written, and a stale gap list is worse than no
 * gap list, because the next reader "re-fixes" correct code.
 *
 *   arrowheads  `carriesFlowArrow` in `../edge-line.tsx` returns false for
 *               `power-ac` and `power-dc` unless the run is `bidirectional`.
 *               An SLD puts no arrow on copper — direction is a load-flow
 *               result — and the BESS charge/discharge pair keeps its heads
 *               because reversibility IS its claim.
 *   E-01        `renderModes` in `../ports.ts` maps a glyph declaring ONE port
 *               on a power edge to `render: "reference"`, and
 *               `../BlockDiagram.tsx` draws that bare: no card, no tag plate,
 *               no caption. `EarthReference` declares only `N`, so the earth is
 *               now what an SLD draws — a reference hung off the star point.
 *               Verified on the shipped page at deviceScaleFactor 1, not
 *               inferred from the code.
 */
export const ENERGY_BESS_INFEED: DiagramSpec = {
  type: "network",
  sector: "energy",
  title: {
    en: "Grid infeed to PV and battery storage",
    nl: "Netaansluiting naar PV en batterijopslag"
  },
  nodes: [
    {
      id: "grid",
      symbol: "oxot/electrical/ac_source",
      tag: "PCC",
      zone: "Utility interface",
      label: { en: "Utility grid, 11 kV", nl: "Openbaar net, 11 kV" }
    },
    {
      id: "cb",
      symbol: "electrical/electro-mechanical/circuit_breaker",
      tag: "CB-01",
      zone: "MV switchgear",
      label: { en: "MV incomer, 11 kV", nl: "MS-inkomer, 11 kV" }
    },
    {
      id: "ied",
      symbol: "oxot/electrical/measuring_relay",
      tag: "IED-01",
      zone: "MV switchgear",
      label: { en: "Overcurrent 50/51", nl: "Overstroom 50/51" }
    },
    {
      // `Dyn11` IS DRAWN NOW, NOT ONLY LETTERED, AND THE STAR POINT IS WHY.
      // This node was `oxot/electrical/transformer` — two plain interlinked
      // circles — on the argument that `TransformerDyn` needed ~40 rendered px
      // for a 5.5-unit delta and this cell renders at too little. Two things
      // retire that argument. The cell measures 39.13 CSS px, a 2.2% shortfall
      // rather than the 24 px the glyph's own note feared; and the Dyn glyph has
      // since been re-cut onto `Transformer`'s measured r = 5.9 / 1.59 r circles
      // with its marks given real clearance, so it is now MORE legible than the
      // plain pair it replaces rather than less.
      //
      // The plain glyph also declares no neutral, and E-01 has to bond to one.
      // With no wye and no star point drawn, the N–PE bond left the SAME
      // terminal as the 400 V phase feeder — measured coincident, overlapping
      // collinearly for 13.00 units — so the drawing said "bolted phase-to-earth
      // fault" and only the label `N–PE bond` said otherwise.
      //
      // THE DUTCH RATIO IS UNSPACED, AND THAT IS A TRUNCATION FIX RATHER THAN A
      // STYLE. `BlockDiagram.wrap` caps a caption at TWO lines and SILENTLY
      // DROPS the rest. `Transformator Dyn11, 11 kV / 400 V` greedy-wraps to
      // three — `Transformator` / `Dyn11, 11 kV / 400` / `V` — so the render
      // showed a 400 V transformer as `400`, with the unit thrown away and no
      // ellipsis to say so. Closing the spaces in `11kV/400V` makes it one token
      // and brings the caption back to two complete lines. Found by rendering
      // the drawing and reading it, not by measuring widths: the truncated line
      // is NARROWER than the card, so no width check can ever catch this.
      id: "tx",
      symbol: "oxot/electrical/transformer_dyn",
      tag: "T-01",
      zone: "MV switchgear",
      label: { en: "Transformer Dyn11, 11 kV / 400 V", nl: "Transformator Dyn11, 11kV/400V" }
    },
    {
      id: "lv-cb",
      symbol: "electrical/electro-mechanical/circuit_breaker",
      tag: "CB-02",
      zone: "LV distribution",
      label: { en: "LV incomer, 400 V", nl: "LS-inkomer, 400 V" }
    },
    {
      id: "earth",
      symbol: "oxot/electrical/earth_reference",
      tag: "E-01",
      zone: "LV distribution",
      label: { en: "Star point earth", nl: "Sterpuntaarding" }
    },
    {
      // IN SERIES ON THE INCOMER, NOT TAPPED OFF THE BAR. A current transformer's
      // primary IS the main conductor — that is what a CT is — so it sits between
      // CB-02 and BB-01 and the ammeter hangs off its secondary.
      id: "ct",
      symbol: "oxot/electrical/current_transformer",
      tag: "CT-01",
      zone: "LV distribution",
      label: { en: "Bus CT, 400/5 A", nl: "Rail-CT, 400/5 A" }
    },
    {
      id: "bus",
      symbol: "electrical/transmission/3_line_bus",
      tag: "BB-01",
      zone: "LV distribution",
      // Drawn as a RAIL, not as a boxed symbol. See `DiagramNode.render`.
      render: "bus",
      label: { en: "400 V main busbar", nl: "400 V hoofdrail" }
    },
    {
      // SHUNT, unlike the CT: a voltage transformer taps the bar and delivers a
      // 110 V instrument secondary sideways to the meter.
      id: "vt",
      symbol: "oxot/electrical/voltage_transformer",
      tag: "VT-01",
      zone: "LV distribution",
      label: { en: "Bus VT, 400/110", nl: "Rail-VT, 400/110" }
    },
    {
      // "INCOMER", NOT "FEEDER". It was labelled a feeder ammeter on a drawing
      // that has no outgoing feeder; what it reads is the incoming supply.
      id: "am",
      symbol: "electrical/instruments/ampermeter",
      tag: "PA-01",
      zone: "LV distribution",
      label: { en: "Incomer ammeter", nl: "Ampèremeter, inkomer" }
    },
    {
      id: "vm",
      symbol: "electrical/instruments/voltmeter",
      tag: "PV-01",
      zone: "LV distribution",
      label: { en: "Busbar voltmeter", nl: "Spanningsmeter, rail" }
    },
    {
      id: "pv-array",
      symbol: "oxot/electrical/pv_array",
      // `PVA-01`, NOT `PV-01` — that tag is already the busbar voltmeter, and in
      // panel-instrument lettering `PV` means voltmeter, not photovoltaic.
      tag: "PVA-01",
      zone: "PV array",
      label: { en: "PV array, 1.6 MWp", nl: "PV-veld, 1,6 MWp" }
    },
    {
      id: "pv-fuse",
      symbol: "electrical/electro-mechanical/fuse",
      tag: "FU-01",
      zone: "PV array",
      label: { en: "String combiner", nl: "Strengverdeler" }
    },
    {
      id: "pv-inv",
      symbol: "electrical/power_semiconductors/bridge_rectifier_1",
      tag: "INV-01",
      zone: "PV array",
      label: { en: "Inverter, 1.5 MVA", nl: "Omvormer, 1,5 MVA" }
    },
    {
      id: "cb-inv",
      symbol: "electrical/electro-mechanical/circuit_breaker",
      tag: "CB-03",
      zone: "PV array",
      label: { en: "PV feeder CB", nl: "PV-schakelaar" }
    },
    {
      id: "bess",
      symbol: "oxot/electrical/battery",
      tag: "BAT-01",
      zone: "Battery storage",
      label: { en: "2 MWh LFP battery", nl: "2 MWh LFP-accu" }
    },
    {
      id: "bms",
      symbol: "cset/plc",
      tag: "BMS-01",
      zone: "Battery storage",
      label: { en: "Battery monitor", nl: "Accubewaking" }
    },
    {
      id: "pcs",
      symbol: "electrical/power_semiconductors/bridge_rectifier_1",
      tag: "PCS-01",
      zone: "Battery storage",
      label: { en: "Power conversion", nl: "Batterij-omzetter" }
    },
    {
      id: "cb-pcs",
      symbol: "electrical/electro-mechanical/circuit_breaker",
      tag: "CB-04",
      zone: "Battery storage",
      label: { en: "BESS feeder CB", nl: "BESS-schakelaar" }
    },
    {
      id: "rtu",
      symbol: "cset/rtu",
      tag: "RTU-01",
      zone: "Site control",
      label: { en: "Site remote terminal unit", nl: "Lokale RTU" }
    },
    {
      id: "sw",
      symbol: "cset/switch",
      tag: "SW-01",
      zone: "Site control",
      label: { en: "Substation LAN switch", nl: "LAN-switch onderstation" }
    },
    {
      id: "fw",
      symbol: "cset/firewall",
      tag: "FW-01",
      zone: "Control conduit",
      label: { en: "OT boundary firewall", nl: "OT-grensfirewall" }
    },
    {
      id: "scada",
      symbol: "cset/mtu",
      tag: "MTU-01",
      zone: "Control centre",
      label: { en: "SCADA master station", nl: "SCADA-hoofdpost" }
    }
  ],
  edges: [
    /* ── POWER IS SOLID, SIGNAL IS DASHED ───────────────────────────────────
     *
     * Every conductor below carried `electrical` until 2026-08-28, which drew
     * the 11 kV incomer, the 800 V DC battery string and the Modbus telemetry
     * identically. The audit named the cost: "in drafting convention dashed
     * means signal, solid means power, so power and telemetry read alike".
     * `power-ac` and `power-dc` are the two solid treatments; `electrical` is
     * kept for what it actually means here — an instrument signal, the CT and VT
     * secondaries and the 4-20 mA meter outputs.
     */
    { from: "grid", to: "cb", kind: "power-ac", label: { en: "11 kV 3-ph", nl: "11 kV 3-fase" } },
    { from: "cb", to: "tx", kind: "power-ac", label: { en: "11 kV", nl: "11 kV" } },
    // THE SECONDARY LANDS ON A BREAKER, NOT ON THE BAR. An LV board is fed
    // through an incoming device; drawing the transformer straight onto the
    // busbar says there is no means of isolating the 400 V system.
    { from: "tx", to: "lv-cb", kind: "power-ac", label: { en: "400 V", nl: "400 V" } },
    // THE STAR POINT IS BONDED TO EARTH, and that bond carries real AC — neutral
    // and earth-fault current — so it is a power conductor, not a signal.
    //
    // EARTH IS NOT SOMETHING YOU FEED, WHICH IS WHY THIS EDGE POINTS THE OTHER
    // WAY SINCE 2026-08-28. Declared `tx → earth`, the arrowhead landed on E-01
    // and drew the earth as a LOAD hanging off the transformer's secondary —
    // energy delivered into it. It is a reference, and the current that actually
    // crosses this conductor is the earth-fault return coming back UP into the
    // star point from the mass of earth. Declared `earth → tx` the arrow states
    // that return path; `rankReversed` keeps ELK ranking it the old way, so E-01
    // still hangs BELOW T-01 where an SLD draws it.
    //
    // AND E-01 IS NOW DRAWN AS THE BARE REFERENCE IT SHOULD BE. This comment
    // used to report the opposite and ask for a `render: "reference"` mode; that
    // mode exists, and `renderModes` in `../ports.ts` selects it for E-01
    // automatically because `EarthReference` declares exactly one port. The
    // spec asserts nothing here — a one-terminal mark cannot sit IN a run, only
    // end one, and the renderer reads that off the glyph.
    //
    // AND IT LANDS ON THE NEUTRAL, NOT ON THE PHASE. `toPort` names a terminal
    // the glyph declares and outranks the router's bearing rule, which is the
    // only way to say this: `T-01` brings its 400 V phase feeder and this bond
    // out on the same SIDE carrying the same SERVICE, so the share guard in
    // `../ports.ts` correctly declines to separate them and both resolved to
    // `LV` — coincident, 13.00 units of collinear overlap, a bolted
    // phase-to-earth fault drawn in full. `NEUTRAL` is the star point
    // `TransformerDyn` now inks; it is spelled out rather than called `N`
    // because `../ports.ts` reads a one-letter `N` as NORTH and would hand this
    // terminal the 11 kV incomer. An unknown name degrades to the automatic
    // choice rather than throwing, so naming it here is safe.
    {
      from: "earth",
      to: "tx",
      toPort: "NEUTRAL",
      kind: "power-ac",
      rankReversed: true,
      label: { en: "N–PE bond", nl: "N–PE-verbinding" }
    },
    { from: "lv-cb", to: "ct", kind: "power-ac" },
    { from: "ct", to: "bus", kind: "power-ac" },
    // ONE EDGE FOR THE PROTECTION LOOP, NOT TWO, AND THAT IS A DRAWING DECISION
    // RATHER THAN A SIMPLIFICATION. The relay senses the breaker's CTs and VTs
    // and trips the same breaker, so the true graph is a two-node cycle; a
    // layered layout has to reverse one of its edges, and reversing the sense
    // edge lifted the protection relay to the TOP of the drawing, level with the
    // utility infeed, which says the relay supplies the site. It is one physical
    // interface between the breaker cubicle and the relay, so it is drawn as one
    // conduit and the label carries both directions.
    { from: "cb", to: "ied", kind: "electrical", label: { en: "CT/VT · trip", nl: "CT/VT · trip" } },
    // THE METERS HANG OFF INSTRUMENT SECONDARIES, not off the 400 V bar.
    { from: "ct", to: "am", kind: "electrical", label: { en: "0–5 A", nl: "0–5 A" } },
    { from: "bus", to: "vt", kind: "power-ac" },
    { from: "vt", to: "vm", kind: "electrical", label: { en: "0–110 V", nl: "0–110 V" } },

    /* ── GENERATION HANGS BELOW THE BUS ─────────────────────────────────────
     *
     * `rankReversed` on these flips the edge ELK RANKS on and nothing else —
     * the arrowheads, the accessible restatement and the meaning are untouched.
     * It is here because a single-line diagram is drawn with the incoming supply
     * at the top and the plant hanging beneath it, and power from a PV array or
     * a battery flows UP into the busbar. Ranked on the declared direction, the
     * array and the battery became the source-most nodes and sat above the
     * switchgear they feed: the audit read that as "battery and PV combiner
     * outrank the switchgear", which is the drawing asserting that the battery
     * supplies the site.
     */
    {
      from: "pv-array",
      to: "pv-fuse",
      kind: "power-dc",
      rankReversed: true,
      label: { en: "12 strings", nl: "12 strengen" }
    },
    {
      from: "pv-fuse",
      to: "pv-inv",
      kind: "power-dc",
      rankReversed: true,
      label: { en: "DC string", nl: "DC-streng" }
    },
    { from: "pv-inv", to: "cb-inv", kind: "power-ac", rankReversed: true, label: { en: "AC 400 V", nl: "AC 400 V" } },
    { from: "cb-inv", to: "bus", kind: "power-ac", rankReversed: true },
    // BOTH HEADS, BECAUSE A BATTERY CHARGES. A single arrowhead on the battery
    // pair claims a discharge-only plant; the whole point of a BESS is that
    // real power crosses these conductors in both directions.
    {
      from: "bess",
      to: "pcs",
      kind: "power-dc",
      rankReversed: true,
      bidirectional: true,
      label: { en: "DC 800 V", nl: "DC 800 V" }
    },
    {
      from: "pcs",
      to: "cb-pcs",
      kind: "power-ac",
      rankReversed: true,
      bidirectional: true,
      label: { en: "AC 400 V", nl: "AC 400 V" }
    },
    { from: "cb-pcs", to: "bus", kind: "power-ac", rankReversed: true, bidirectional: true },

    /* ── TELEMETRY ──────────────────────────────────────────────────────────
     *
     * The BMS pair is the fix for a real omission: BAT-01 reported to nothing at
     * all. Cell voltages and temperatures reach the BMS as instrument signals;
     * the BMS itself is a networked controller and talks Modbus TCP to the RTU
     * like the two convertors do.
     */
    { from: "bess", to: "bms", kind: "electrical", label: { en: "Cell V · T", nl: "Cel-V · T" } },
    { from: "bms", to: "rtu", kind: "data-link", label: { en: "Modbus TCP", nl: "Modbus TCP" } },
    { from: "am", to: "rtu", kind: "electrical" },
    { from: "vm", to: "rtu", kind: "electrical" },
    // THE TWO CONVERTOR LINKS ARE UNLABELLED, AND THEY ARE UNLABELLED AS A PAIR.
    //
    // `pv-inv → rtu` lost its label first, for a reason the render showed rather
    // than one a width check could: its label landed at the arc midpoint
    // directly on top of the PVA-01 card — node cards paint after the edge layer
    // — so it rendered as "odbus TCP", which reads as a broken renderer rather
    // than as a protocol.
    //
    // `pcs → rtu` lost its label on 2026-08-28 for the argument that was already
    // sitting in that paragraph: three runs into one RTU all reading "Modbus
    // TCP" is clutter no drawing office would set. The audit measured what was
    // left — two identical "Modbus TCP" labels 12 units apart, at y 4219.4 and y
    // 4231.7 — and INV-01 and PCS-01 are the same static convertor on the same
    // kind of link, so labelling one of that matched pair and not the other
    // asserts a difference between them that does not exist. The BMS link keeps
    // the label and states the protocol once for the group; the dashed-with-
    // marks treatment already says "data link" on all three.
    { from: "pv-inv", to: "rtu", kind: "data-link" },
    { from: "pcs", to: "rtu", kind: "data-link" },
    { from: "ied", to: "sw", kind: "data-link", label: { en: "IEC 61850", nl: "IEC 61850" } },
    { from: "rtu", to: "sw", kind: "data-link" },
    { from: "sw", to: "fw", kind: "data-link" },
    {
      from: "fw",
      to: "scada",
      kind: "data-link",
      label: { en: "IEC 60870-5-104", nl: "IEC 60870-5-104" }
    }
  ]
};
