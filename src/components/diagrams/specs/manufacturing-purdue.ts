import type { DiagramSpec } from "../types";

/**
 * MANUFACTURING — an automotive body-shop line mapped onto the Purdue model.
 *
 * THE VOCABULARY IS CHOSEN BY WHAT A THING IS, AND L0 CONTAINS THREE KINDS OF
 * THING. This comment used to state a two-vocabulary rule — ISA bubbles below
 * L1, CSET portraits above — and the drawing has broken it since the L0 final
 * elements were corrected. The drawing is right and the rule was too coarse, so
 * the rule is restated rather than the drawing bent back to it.
 *
 * From L1 UPWARD every asset is a COMPUTER and carries a CSET OT asset
 * portrait. That half is unchanged and is not a stylistic preference: a PLC
 * drawn as an ISA bubble says "instrument loop" when it is a rack.
 *
 * At L0 the split is by DEVICE CLASS, because a process level holds three:
 *
 *   measuring / controlling functions — ISA-5.1 BUBBLES with real
 *     identification letters. `ZSH-201` is a position switch, high; `TT-204` a
 *     temperature transmitter; `SE-208` a speed element. A bubble is a TAG for
 *     a function, which is why it is right for all three and wrong for the two
 *     below it
 *   a final element in a pipe — an ISA-5.1 VALVE, body plus actuator. `XV-306`
 *     is a valve; a bubble lettered XV would say only that a tag by that name
 *     exists somewhere
 *   a final element in a circuit — an IEC 60617 CONTACT. `KM-207` breaks the
 *     cell's supply, and ISA publishes no symbol for a switching contact at all;
 *     IEC is the standard that does
 *
 * Three vocabularies at one level is not a mix, it is three device classes each
 * drawn in the notation its own discipline publishes. What would be a mix is
 * drawing a contactor as a bubble because the bubbles are nearby.
 *
 * THE SAFETY SYSTEM IS SEGREGATED, WHICH IS WHY IT IS DRAWN SEPARATELY. `SIS-01`
 * takes its own interlock input straight from the cell guard switches rather
 * than through `PLC-01`, and drives its own final element — `KM-207`, the cell
 * power isolation contactor — without passing through the basic process control
 * system either. Sensor, logic solver, final element: that is IEC 61511's own
 * decomposition of a safety instrumented function, and until 2026-08-28 this
 * drawing carried only the first two, which made the loop a monitoring
 * arrangement rather than a SIF. A safety function that depends on the BPCS is
 * not an independent protection layer; §11.2.4 is the clause, and the geometry
 * is how it is stated here. The single link back to `PLC-01` is a status report,
 * and it is drawn as a data link rather than as a wire for that reason.
 *
 * L3.5 IS DRAWN AS ITS OWN BAND. The industrial DMZ is where IEC 62443 puts the
 * broker between site operations and the enterprise, and folding it into L3 or
 * L4 is the single most common misdrawing on an OT architecture chart. Three
 * assets sit in it and each is a distinct control: a boundary FIREWALL for
 * bidirectional traffic that has to be inspected, a UNIDIRECTIONAL GATEWAY for
 * historian replication that must not be able to come back, and a vendor jump
 * host so remote support terminates in the DMZ instead of on the plant floor.
 *
 * THREE LEVEL-SKIPPING EDGES, ALL DELIBERATE, ALL DRAWN AS EXCEPTIONS.
 * `HIST-01` (L2) replicates through the unidirectional gateway (L3.5), crossing
 * L3 without stopping; `EWS-01` (L3) downloads logic to `PLC-01` (L1),
 * crossing L2 without stopping; and `EXT-01` (L5) reaches the jump host (L3.5)
 * without transiting the site's own business systems at L4, which is precisely
 * what a brokered vendor session does. `layoutPurdue` routes them out into the
 * right-hand riser corridor rather than straight through the intervening band,
 * so a connection that bypasses a level looks like one — and the engineering
 * download genuinely does bypass area supervisory control, which is the single
 * most consequential path on a security drawing and was absent from this one
 * until 2026-08-28. Every other edge crosses exactly one gutter, which is what a
 * conduit does.
 *
 * `zone` on every node names its IEC 62443 zone, and it is restated in the
 * accessible text. THREE of them are drawn, and the DMZ band is a fourth
 * boundary in its own right — a double, broken rule with a conduit mark where
 * each route pierces it — because that band IS a 62443 zone, and the drawing
 * otherwise asserted equivalent levels with nothing but a caption to tell one of
 * them apart.
 *
 * The SAFETY INSTRUMENTED zone is outlined in ISO 128's limited-area chain
 * because it is the one grouping this drawing argues for in prose and the one
 * that CROSSES a band boundary, spanning `ZSH-201` and `KM-207` at L0 and
 * `SIS-01` at L1 — which is the thing the banding alone cannot say, that a zone
 * is not a level. IT IS A STAIRCASE RATHER THAN A RECTANGLE, and that is not
 * decoration: left-packed rows put `SIS-01` at L1 column 0 and the two L0
 * members at columns 0 and 1, so any rectangle enclosing all three also enclosed
 * L1 column 1 — `PLC-01` — and the heaviest mark on the sheet asserted that the
 * basic process control system is inside the safety instrumented zone, which is
 * the exact claim §11.2.4 and the rest of this drawing exist to deny. The
 * perimeter now follows the members band by band. `SIS-01 → PLC-01` carries the
 * conduit tick where it leaves that perimeter, and it is the only crossing of it
 * — the trip conductor and the interlock stay inside, as a SIF must.
 *
 * The remaining zones are still not outlined, and that is a rule rather than an
 * omission: a dashed rectangle around an arbitrary group of nodes is inventing
 * security notation, and five overlapping rectangles on six bands is a plaid.
 */
export const MANUFACTURING_PURDUE: DiagramSpec = {
  type: "purdue",
  sector: "manufacturing",
  title: {
    en: "Body shop line — Purdue reference architecture",
    nl: "Carrosseriebouwlijn — Purdue-referentiearchitectuur"
  },
  nodes: [
    /* ── L4 · site business systems, and L5 above it ──────────────────────── */
    {
      id: "erp",
      symbol: "cset/server",
      tag: "ERP-01",
      purdue: 4,
      zone: "Enterprise",
      label: { en: "ERP production planning", nl: "ERP-productieplanning" }
    },
    {
      id: "siem",
      symbol: "cset/siem",
      tag: "SIEM-01",
      purdue: 4,
      zone: "Enterprise",
      label: { en: "Enterprise SIEM", nl: "Bedrijfsbrede SIEM" }
    },
    /**
     * WHERE THE VENDOR ACTUALLY COMES FROM. Until 2026-08-28 `RAS-01` carried a
     * single conduit, downward to the engineering workstation, and the drawing's
     * own caption claimed remote support "terminates in the DMZ" — a claim about
     * an arrival nothing on the page arrived from. A jump host with no inbound
     * side is a jump host in name only. This is the far end of that hop: the
     * vendor reaching the site over the enterprise WAN, so the brokered session
     * is drawn stopping at the DMZ instead of starting there.
     *
     * AND IT SITS ABOVE THE SITE, NOT IN IT — nor, since 2026-08-28, IN A LEVEL
     * AT ALL. This node was banded `purdue: 4` until then, which drew a third
     * party inside "L4 · Site business systems" alongside the site's own ERP and
     * SIEM. Moving it to 5 only moved the false statement: the band it landed in
     * is captioned "L5 · Enterprise network", and a vendor is not on the site's
     * enterprise network either.
     *
     * WHICH LEVEL WAS NEVER THE QUESTION. Checked against Rockwell's published
     * Converged Plantwide Ethernet material, the Enterprise Zone does span
     * Levels 4 and 5, so L5 is a real level and banding was not the error — but
     * Rockwell draws the partner as a separate "Remote site" compartment facing
     * the plantwide systems across a remote-access server, and puts remote
     * engineers and partners in the OUTERMOST ring of its defence-in-depth
     * figure, outside the enterprise entirely. A third party is not an asset of
     * this site's reference architecture at any level of it.
     *
     * So `PurdueDiagram` no longer draws this row as a level: a band whose every
     * occupant is in the External zone loses its plate, its caption and its
     * divider, and becomes a compartment above the stack. The level stack a
     * reader scans runs L4 to L0. What remains round this node is its 62443 zone
     * perimeter — every asset still belongs to a zone — and the TLS VPN riser
     * down into `RAS-01`, so the brokered session still arrives through the IDMZ
     * rather than onto the plant floor, crossing L4 without stopping in it.
     *
     * `purdue: 5` STAYS HERE BECAUSE THE TYPE LEAVES NO ALTERNATIVE, and this is
     * the honest statement of what is still wrong. `PurdueLevel` is
     * `0 | 1 | 2 | 3 | 3.5 | 4 | 5` with no tier for somebody else's network, and
     * `assertSpecResolves` throws for a purdue-spec node carrying no level at
     * all — so 5 is what places this card above L4, and `Diagram`'s
     * screen-reader list still reads that number back as "L5 · Enterprise
     * network". The DRAWING no longer says the vendor is an L5 asset; the
     * ACCESSIBLE TEXT still does. Closing that needs a `types.ts` change this
     * spec may not make: either an `external` tier on `PurdueLevel`, or an
     * exemption in `assertSpecResolves` for a node whose zone puts it off-site.
     */
    {
      id: "vendor",
      symbol: "cset/cloud",
      tag: "EXT-01",
      purdue: 5,
      zone: "External",
      label: { en: "Vendor remote support", nl: "Externe leveranciersondersteuning" }
    },
    /* ── L3.5 · industrial DMZ ─────────────────────────────────────────── */
    {
      id: "fw",
      symbol: "cset/firewall",
      tag: "FW-01",
      purdue: 3.5,
      zone: "Industrial DMZ",
      label: { en: "Boundary firewall", nl: "Grensfirewall" }
    },
    {
      id: "udg",
      symbol: "cset/unidirectional-device",
      tag: "UDG-01",
      purdue: 3.5,
      zone: "Industrial DMZ",
      label: { en: "Unidirectional gateway", nl: "Unidirectionele gateway" }
    },
    {
      id: "jump",
      symbol: "cset/remote-access-server",
      tag: "RAS-01",
      purdue: 3.5,
      zone: "Industrial DMZ",
      label: { en: "Vendor jump host", nl: "Leveranciers-jumphost" }
    },
    /* ── L3 · site operations ──────────────────────────────────────────── */
    {
      id: "ews",
      symbol: "cset/ews",
      tag: "EWS-01",
      purdue: 3,
      zone: "Site operations",
      label: { en: "Engineering workstation", nl: "Engineeringwerkstation" }
    },
    {
      id: "mes",
      symbol: "cset/application-server",
      tag: "MES-01",
      purdue: 3,
      zone: "Site operations",
      label: { en: "MES application server", nl: "MES-applicatieserver" }
    },
    {
      id: "patch",
      symbol: "cset/configuration-server",
      tag: "CFG-01",
      purdue: 3,
      zone: "Site operations",
      label: { en: "Patch and config server", nl: "Patch- en configuratieserver" }
    },
    /* ── L2 · area supervisory control ─────────────────────────────────── */
    {
      id: "hmi",
      symbol: "cset/hmi",
      tag: "HMI-01",
      purdue: 2,
      zone: "Body shop cell",
      label: { en: "Line operator HMI", nl: "Bedieningspaneel lijn" }
    },
    {
      id: "hist",
      symbol: "cset/historian",
      tag: "HIST-01",
      purdue: 2,
      zone: "Body shop cell",
      label: { en: "Process historian", nl: "Proceshistorian" }
    },
    {
      id: "cellsw",
      symbol: "cset/switch",
      tag: "SW-02",
      purdue: 2,
      zone: "Body shop cell",
      label: { en: "Cell network switch", nl: "Celnetwerkswitch" }
    },
    /* ── L1 · basic control ────────────────────────────────────────────── */
    {
      id: "plc",
      symbol: "cset/plc",
      tag: "PLC-01",
      purdue: 1,
      zone: "Body shop cell",
      label: { en: "Line control PLC", nl: "Lijnbesturings-PLC" }
    },
    /**
     * `ot/safety-instrumented-system`, NOT `cset/sis`, AND THE DIFFERENCE IS THE
     * DEFECT. CSET's SIS mark is a diamond with a square inscribed IN it — the
     * exact inverse of ISA-5.1's logic-solver symbol, which is a diamond inside
     * a square. On a drawing that spends two bands teaching ISA vocabulary, one
     * grid cell from the real PLC, an inverted logic-solver symbol is not a
     * neutral alternative: it reads as a deliberate distinction that means
     * nothing, and nothing about the mark says "safety".
     *
     * `twin/ot-notation`'s version composes the two conventions that do exist —
     * the ISA logic-solver form, correctly oriented, inside an outer segregation
     * boundary. The boundary is the part that says safety, because segregation
     * is how a safety system is identified on a drawing; ISA-5.1 defines no
     * dedicated SIS outline, and that file says so in its own header rather than
     * inventing one.
     */
    {
      id: "sis",
      symbol: "ot/safety-instrumented-system",
      tag: "SIS-01",
      purdue: 1,
      zone: "Safety instrumented",
      label: { en: "Safety PLC, SIL 2", nl: "Veiligheids-PLC, SIL 2" }
    },
    {
      id: "dcs",
      symbol: "cset/dcs",
      tag: "DCS-01",
      purdue: 1,
      zone: "Paint shop",
      label: { en: "Paint shop DCS", nl: "Lakstraat-DCS" }
    },
    /* ── L0 · process ──────────────────────────────────────────────────── */
    {
      id: "zsh",
      // SIS SHAPE, NOT A PLAIN CIRCLE. ISA-5.1 Table 5.1.1 makes the OUTLINE
      // carry which kind of system performs the function: plain circle =
      // discrete, circle-in-square = shared/basic control, hexagon = computer,
      // circle-in-diamond-in-square = safety instrumented. ZSH-201 is the
      // SENSOR of this sheet's safety function — its interlock runs to SIS-01
      // and closes through KM-207 — so drawn as a plain circle it was typed as
      // ordinary basic control. A reader who knows the standard reads the shape
      // before the letters, which made this a silent mis-type on the one loop
      // the drawing exists to argue is independent. Six rounds of visual audit
      // never raised it; reading the standard did.
      symbol: "isa/sis/field/ZSH-201",
      purdue: 0,
      zone: "Safety instrumented",
      label: { en: "Cell guard position switches", nl: "Positieschakelaars celafscherming" }
    },
    {
      id: "tt",
      symbol: "isa/discrete/field/TT-204",
      purdue: 0,
      zone: "Body shop cell",
      label: { en: "Weld tip temperature", nl: "Lasnaadtemperatuur" }
    },
    /**
     * A VALVE IS DRAWN AS A VALVE. `XV-306` used to carry
     * `isa/discrete/field/XV-306` and rendered as an instrument bubble, which in
     * ISA-5.1 is a MEASURING or CONTROLLING function — never a final element. A
     * bubble lettered XV says "there is a tag called XV-306 somewhere"; it does
     * not say a valve exists, and on a drawing whose whole argument is that the
     * symbol vocabulary is real that is the most expensive kind of error.
     *
     * NOW DRAWN WITH ITS ACTUATOR. ISA-5.1 draws a final element as a valve
     * BODY plus its ACTUATOR, and until the solenoid glyph was drawn this was
     * the body alone — a bare bowtie, which is the P&ID symbol for a HAND
     * valve, fed by a conductor labelled "24 V DO". That is not a true
     * statement missing a detail, it is a false one: the sheet contradicted
     * itself. `oxot/pid/solenoid_valve` is body, stem and actuator as one mark.
     */
    {
      id: "xv",
      symbol: "oxot/pid/solenoid_valve",
      tag: "XV-306",
      purdue: 0,
      zone: "Paint shop",
      label: { en: "Booth purge valve", nl: "Spuitcabine-spoelklep" }
    },
    {
      id: "se",
      symbol: "isa/discrete/field/SE-208",
      purdue: 0,
      zone: "Body shop cell",
      label: { en: "Conveyor speed element", nl: "Snelheidsopnemer transportband" }
    },
    /**
     * THE FINAL ELEMENT THAT MAKES THE SAFETY LOOP A SIF. Until 2026-08-28 the
     * safety path ran `ZSH-201 → SIS-01 → (status to PLC-01)` and stopped. That
     * is a sensor, a logic solver and a report — it is not a safety instrumented
     * function, because nothing on the drawing did anything to the plant. On a
     * chart citing IEC 61511 the missing third element is the one the standard
     * is about.
     *
     * A CONTACT, NOT A KNOB, AND THAT WAS THE DEFECT. Until 2026-08-28 this node
     * carried `electrical/electro-mechanical/2_position_switch`, which is
     * draw.io's ROTARY CHANGEOVER SELECTOR: four terminals with contact dots, a
     * diagonal blade, two r=19.5 position arcs and a two-headed rotation-
     * direction arrow. That mark depicts a human turning a knob. `KM` in IEC
     * 81346 is a contactor, and this node's entire job on the drawing is to be
     * the AUTOMATIC de-energise-to-trip final element of a safety instrumented
     * function — so the symbol said the opposite of the caption beside it, and
     * it was also the densest, least legible mark on the page at reading size.
     *
     * NOW A MAKE CONTACT, DRAWN OPEN. The rotary selector this started as
     * showed a knob a human turns; the SPDT changeover that replaced it was
     * better but still wrong in topology — a changeover has two energised
     * positions and no reference state, so drawing it thrown asserted one at
     * random, and the one it asserted was the tripped state.
     *
     * A de-energise-to-trip element is a MAKE contact held closed by its coil
     * and opening on power loss. IEC draws every contact de-energised, and here
     * the de-energised state IS the safe state — so an open make contact states
     * the failure mode rather than picking a moment. The operating coil and the
     * semicircular contact-piece are still absent, and that is now a measured
     * decision rather than a missing capability: `oxot/electrical/contactor`
     * exists and carries the piece, but its aperture needs ~70px to stay open
     * and this cell renders at 37, below which it closes into a hook.
     */
    {
      id: "trip",
      symbol: "oxot/electrical/make_contact",
      tag: "KM-207",
      purdue: 0,
      zone: "Safety instrumented",
      label: { en: "Cell power isolation", nl: "Vermogensafschakeling cel" }
    }
  ],
  edges: [
    /* L0 → L1 — hardwired field I/O, and the safety path is its own. */
    // EVERY L1 CONTROLLER OWNS ITS OWN FIELD DEVICES, and none is shared. Two
    // controllers wired to one valve is not a redundancy claim, it is a command
    // conflict, and the first draft of this drawing had the line PLC and the
    // paint DCS both driving XV — which an engineer reads as either a mistake or
    // a very bad design. It also produced the only long horizontal run in the
    // L0/L1 gutter, which struck straight through a neighbouring signal label.
    //
    // EDGE ORDER IS LANE ORDER — it decides which conduit takes which lane in
    // the gutter, top to bottom, and nothing else.
    //
    // It used also to be PAINT order, and a comment here instructed the next
    // author to declare an unlabelled edge first so its dogleg would not paint
    // over a neighbour's label plate. That workaround is gone with the thing it
    // worked around: labels no longer carry plates, `KnockoutMask` cuts the
    // clear space in one layer, and mark suppression is computed against every
    // label on the drawing rather than against each edge's own. Ordering is
    // free to say what it should say.
    { from: "se", to: "plc", kind: "electrical" },
    { from: "tt", to: "plc", kind: "electrical", label: { en: "4-20 mA", nl: "4-20 mA" } },
    { from: "zsh", to: "sis", kind: "electrical", label: { en: "interlock", nl: "vergrendeling" } },
    { from: "dcs", to: "xv", kind: "electrical", label: { en: "24 V DO", nl: "24 V DO" } },
    // THE THIRD ELEMENT OF THE SAFETY INSTRUMENTED FUNCTION. Sensor, logic
    // solver, final element — IEC 61511's own decomposition, and the drawing
    // carried only the first two until 2026-08-28. De-energise to trip: the
    // conductor is what holds the contactor in, so losing it IS the safe state.
    {
      from: "sis",
      to: "trip",
      kind: "electrical",
      label: { en: "de-energise to trip", nl: "stroomloos bij trip" }
    },

    /* L1 internal — the safety trip reported into the basic control system. */
    { from: "sis", to: "plc", kind: "data-link" },

    /* L1 → L2 */
    // OPEN circles: PLC-01 and its own operator HMI are functions of one
    // control system. Every other data link on this sheet crosses a trust
    // boundary and keeps the filled mark — `sis -> plc` most of all, since
    // IEC 61511 makes the safety system independent of the BPCS by design.
    {
      from: "plc",
      to: "hmi",
      kind: "data-link",
      sharedSystem: true,
      label: { en: "PROFINET", nl: "PROFINET" }
    },
    { from: "plc", to: "cellsw", kind: "data-link" },
    { from: "dcs", to: "cellsw", kind: "data-link" },
    { from: "cellsw", to: "hist", kind: "data-link" },

    /* L2 → L3 */
    { from: "hist", to: "mes", kind: "data-link", label: { en: "OPC UA", nl: "OPC UA" } },
    { from: "hmi", to: "ews", kind: "data-link" },
    { from: "patch", to: "ews", kind: "data-link" },

    /* L3 → L1 — THE ENGINEERING PIVOT, AND IT IS DRAWN AS AN EXCEPTION.
     *
     * Until 2026-08-28 `EWS-01` had no conduit to any controller at all, which
     * made the whole L3 engineering chain a dead end: `CFG-01 → EWS-01 →`
     * nothing. An engineering workstation that cannot reach a PLC is not an
     * engineering workstation, and on a security drawing the omission hides the
     * single most consequential path on the page — the one a compromised
     * workstation uses to write logic into the plant.
     *
     * It skips L2, so `layoutPurdue` routes it out into the riser corridor
     * beside the historian replication. That is the correct treatment and not a
     * side effect: programming a controller from site operations DOES bypass
     * area supervisory control, and the drawing should say so out loud. */
    {
      from: "ews",
      to: "plc",
      kind: "data-link",
      label: { en: "logic download", nl: "logica-download" }
    },

    /* L2 → L3.5 — replication that skips a level, drawn as an exception. */
    {
      from: "hist",
      to: "udg",
      kind: "data-link",
      label: { en: "one-way replication", nl: "eenrichtingsreplicatie" }
    },

    /* L3 → L3.5 */
    { from: "mes", to: "fw", kind: "data-link" },
    { from: "jump", to: "ews", kind: "data-link", label: { en: "brokered RDP", nl: "bemiddelde RDP" } },

    /* L4 → L3.5 — the vendor session arriving, so the jump host has an inbound side. */
    { from: "vendor", to: "jump", kind: "data-link", label: { en: "TLS VPN", nl: "TLS-VPN" } },

    /* L3.5 → L4 */
    { from: "udg", to: "erp", kind: "data-link" },
    { from: "fw", to: "erp", kind: "data-link" },
    { from: "fw", to: "siem", kind: "data-link", label: { en: "syslog", nl: "syslog" } }
  ]
};
