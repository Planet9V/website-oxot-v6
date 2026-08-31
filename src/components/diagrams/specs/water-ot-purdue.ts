import type { DiagramEdge, DiagramNode, DiagramSpec } from "../types";

/**
 * WATER & WASTEWATER — THE OT ESTATE, ON THE PURDUE MODEL. Two specs, one for
 * each system the S02 selector offers.
 *
 * WHY THIS REPLACED A HAND-DRAWN VIEW. The "OT / SCADA paths" view of
 * `ProcessCanvas` drew the whole OT argument as two captioned rectangles —
 * `SCADA AND CONTROL, SHARED` and `TELEMETRY, COMMUNICATIONS AND REMOTE ACCESS`
 * — one dashed stub per process stage and a rotated square under each. That is
 * the entire OT content of a page whose thesis is that OXOT models an OT estate.
 * Nothing in it named an asset, a level, a zone, a protocol or a direction, so a
 * reader could not tell a PLC from a historian, could not see where the DMZ was,
 * and could not see which path a remote vendor actually takes. The other three
 * views of that canvas are NOT converted and must not be: the process view is a
 * hydraulic long-section encoding `grade: 1..6` and `lift`, and `DiagramSpec`
 * has no elevation concept at all, so converting it would delete the one idea
 * that drawing carries.
 *
 * THE TOP FOUR BANDS ARE LITERALLY THE SAME OBJECTS IN BOTH SPECS, and that is
 * the point rather than a saving. `industry_water.md` L102 requires the two
 * system diagrams to "share common SCADA layers"; the canvas this replaces
 * satisfied that by drawing one `SHARED_LAYERS` record twice. `SHARED_UPPER` and
 * `SHARED_UPPER_EDGES` below keep it true the same way — L5 down to L2 is one
 * declaration spread into both specs, so the shared half cannot drift apart in a
 * later edit without the drift being visible in one place. What differs is L1
 * and L0, which is exactly what the source says differs: a treatment plant's
 * controllers and instruments are not a collection system's.
 *
 * EVERY L0/L1 TAG, LABEL AND ZONE IN THE DRINKING-WATER SPEC NAMES THE SAME LOOP
 * AS `water-treatment-train.ts`. FT-101 is the raw-water flow in "Raw water
 * intake"; AIT-601 is the free-chlorine residual and LT-601 the clearwell level,
 * both in "Chlorine contact and storage"; P-501 is the chlorine metering pump in
 * "Chlorine dosing"; PLC-01 is the treatment PLC in "Basic control". Those are
 * copied from that file rather than invented, so the two drawings describe one
 * plant and a reader moving between them meets one loop numbering. The starting
 * brief for this work guessed LT-601 for the clearwell and was right; it was
 * still checked, because T-501 is the chemical day tank and LT-501 would have
 * been the plausible wrong answer.
 *
 * THREE DEPARTURES FROM THE BRIEFED STARTING SPEC, each because the briefed
 * version stated something an OT engineer would read as a defect:
 *
 *   · `hist → biz` labelled "one-way replication" ran the historian straight to
 *     the enterprise, SKIPPING L3.5. Replication that bypasses the industrial
 *     DMZ is the precise security claim the DMZ exists to deny, and drawing it
 *     as a level-skipping riser would have said it out loud. It is now
 *     `hist → fw`: the replication is enforced at the boundary it crosses.
 *   · `radio → rtu` pointed the telemetry link INTO the RTU and stopped, leaving
 *     the radio a dead-end stub with nothing downstream — the reverse of what a
 *     remote site does. It is now `rtu → radio → scada`, so the radio is a hop
 *     on a path rather than an ornament.
 *   · `scada → plc` labelled `IEC 60870-5-104` put a telecontrol protocol on a
 *     plant-floor supervisory link. 60870-5-104 is what a REMOTE site speaks to
 *     a SCADA master over a wide-area bearer, so it has moved to `radio → scada`
 *     where it belongs, and the in-plant link now carries Modbus TCP.
 *
 * TWO RISERS, AND TWO IS THE BUDGET. `layoutPurdue` routes a level-skipping edge
 * out into a right-hand corridor, which is the correct treatment — a connection
 * that bypasses a level should look like one — but the corridor allows only one
 * `RISER_LANE` (22 units) of canvas outboard of the outermost conduit, and a
 * riser's label sits out there at its route's arc-length midpoint. Any label
 * longer than about four characters is therefore cut by the sheet's own viewBox,
 * which is a real weakness of the engine and not something a spec can style
 * around. So a riser is spent only where the bypass IS the point:
 *
 *   · `ext → ras` — a vendor reaching the DMZ without transiting the utility's
 *     own business systems, which is what a brokered session does. Its label
 *     falls on the horizontal run rather than in the corridor and renders whole.
 *     It does sweep most of the sheet height; `MANUFACTURING_PURDUE` ships the
 *     identical geometry for the identical vendor topology.
 *   · `ews → plc` — an engineering workstation writing logic into a controller,
 *     bypassing area supervisory control. The most consequential path on a
 *     security drawing, and the one worth the corridor.
 *
 * A third, `hist → fw` at L2, was removed rather than accepted: see the `hist`
 * node for the measurement that killed it.
 */

/* ── L5 → L2. One declaration, spread into both specs. ────────────────────── */

const SHARED_UPPER: DiagramNode[] = [
  {
    id: "ext",
    symbol: "cset/cloud",
    tag: "EXT-01",
    purdue: 5,
    zone: "External",
    /* A NODE CAPTION WRAPS TO TWO LINES AND DROPS THE REST, so both locales
       have to FIT rather than merely be correct. "Ondersteuning op afstand door
       de systeemintegrator" rendered as "Ondersteuning op afstand door de" and
       silently lost the noun the caption is about — caught in a light-theme
       Dutch screenshot, not by the type checker. */
    label: {
      en: "System-integrator remote support",
      nl: "Systeemintegrator op afstand"
    }
  },
  {
    id: "biz",
    symbol: "cset/server",
    tag: "BIZ-01",
    purdue: 4,
    zone: "Enterprise",
    /* Shortened for the same reason as EXT-01 above: the full
       "Bedrijfssystemen van het waterbedrijf" rendered as "Bedrijfssystemen van
       het" and lost its subject. */
    label: { en: "Utility business systems", nl: "Bedrijfssystemen waterbedrijf" }
  },
  {
    id: "fw",
    symbol: "cset/firewall",
    tag: "FW-01",
    purdue: 3.5,
    zone: "Industrial DMZ",
    label: { en: "Maintenance-network firewall", nl: "Firewall van het onderhoudsnetwerk" }
  },
  {
    id: "ras",
    symbol: "cset/remote-access-server",
    tag: "RAS-01",
    purdue: 3.5,
    zone: "Industrial DMZ",
    label: { en: "Vendor access broker", nl: "Toegangsbemiddelaar voor leveranciers" }
  },
  {
    id: "ews",
    symbol: "cset/ews",
    tag: "EWS-01",
    purdue: 3,
    zone: "Site operations",
    label: { en: "Plant engineering workstation", nl: "Engineeringwerkstation van de zuivering" }
  },
  {
    id: "scada",
    symbol: "cset/mtu",
    tag: "SCADA-01",
    purdue: 2,
    zone: "Control room",
    label: { en: "SCADA and alarm server", nl: "SCADA- en alarmserver" }
  },
  /**
   * L3, WHICH IS BOTH ISA-95's PLACEMENT AND THE ONE THAT DRAWS. It was banded
   * at 2 first, to agree with `MANUFACTURING_PURDUE`, and the Dutch render
   * showed the cost: at L2 the replication edge `hist → fw` skips L3, so
   * `layoutPurdue` routes it out into the right-hand corridor, and a corridor
   * label sits at its route's arc-length midpoint with only one `RISER_LANE`
   * (22 units) of canvas outboard of it. "eenrichtingsreplicatie" needs about
   * four times that, so the sheet's own viewBox cut it to
   * "eenrichtingsreplicati". English fitted and Dutch did not, which is exactly
   * the class of defect a single-locale screenshot never finds.
   *
   * Moving the historian to L3 removes the riser rather than shortening the
   * word: site operations sits directly under the industrial DMZ, so the
   * replication now crosses one gutter and its label sits in that gutter, which
   * is sized from what crosses it. The data path is also more accurate for it —
   * the historian subscribes to the SCADA server rather than polling the
   * controller directly, so `plc → hist` became `scada → hist`.
   */
  {
    id: "hist",
    symbol: "cset/historian",
    tag: "HIST-01",
    purdue: 3,
    zone: "Site operations",
    label: { en: "Process historian", nl: "Proceshistorian" }
  }
];

const SHARED_UPPER_EDGES: DiagramEdge[] = [
  {
    from: "ext",
    to: "ras",
    kind: "data-link",
    label: { en: "VPN / remote engineering access", nl: "VPN / engineeringtoegang op afstand" }
  },
  { from: "ras", to: "fw", kind: "data-link" },
  { from: "fw", to: "biz", kind: "data-link" },
  /* EDGE ORDER IS LANE ORDER in the gutter, top to bottom, and here it is load
     bearing. Declared after `fw → ews` this edge took the LOWER lane of the
     L3.5/L3 gutter, and its label — set at the route's arc-length midpoint —
     landed below the L3 band's top rule, where the rule and both card tops
     struck through `eenrichtingsreplicatie`. Declared first it takes the upper
     lane and the label sits in the gutter's clear space. */
  {
    from: "hist",
    to: "fw",
    kind: "data-link",
    label: { en: "one-way replication", nl: "eenrichtingsreplicatie" }
  },
  {
    from: "fw",
    to: "ews",
    kind: "data-link",
    label: { en: "maintenance network", nl: "onderhoudsnetwerk" }
  }
];

/** The engineering pivot and the supervisory links, identical in both estates. */
function controlEdges(): DiagramEdge[] {
  return [
    {
      from: "scada",
      to: "plc",
      kind: "data-link",
      label: { en: "Modbus TCP", nl: "Modbus TCP" },
      bidirectional: true,
      // ISA-5.1 Table 5.3.2 open circles: the SCADA server and the plant
      // controllers are functions of ONE basic process control system. Every
      // other data link on these sheets crosses a trust boundary and keeps the
      // filled mark.
      sharedSystem: true
    },
    { from: "hmi", to: "plc", kind: "data-link", sharedSystem: true },
    // The historian subscribes to the SCADA server, not to the controller. See
    // the `hist` node for why this changed from `plc → hist`.
    { from: "scada", to: "hist", kind: "data-link" },
    {
      from: "ews",
      to: "plc",
      kind: "data-link",
      label: { en: "logic download", nl: "logica-download" }
    },
    /**
     * THE ONE SAME-BAND EDGE, AND IT CARRIES NO LABEL.
     *
     * It was authored as `radio / cellular` and rendered wrong, which is only
     * visible in a screenshot: a within-band edge's label lands in the gap
     * BETWEEN the two node cards, and the cards are painted after it, so the
     * render read `RTU-01 Booster-station RTU  o / ce  RAD-01`. The word was
     * also redundant — the node it points at is captioned "Radio / cellular
     * link" — so the label says nothing the reader does not already have, and
     * removing it costs no meaning. `MANUFACTURING_PURDUE` leaves its own
     * same-band edge (`sis → plc`) bare for the same reason.
     */
    { from: "rtu", to: "radio", kind: "data-link" },
    {
      from: "radio",
      to: "scada",
      kind: "data-link",
      label: { en: "IEC 60870-5-104", nl: "IEC 60870-5-104" }
    }
  ];
}

const MA = { en: "4-20 mA", nl: "4-20 mA" };

/* ── Drinking water ───────────────────────────────────────────────────────── */

export const WATER_DRINKING_OT_PURDUE: DiagramSpec = {
  type: "purdue",
  sector: "water",
  title: {
    en: "Drinking water — OT and SCADA paths on the Purdue model",
    nl: "Drinkwater — OT- en SCADA-paden op het Purdue-model"
  },
  nodes: [
    ...SHARED_UPPER,
    /* L2 — the one supervisory asset that is NOT shared between the systems.
       L211 of the source names a PLC-controlled dosing skid with its own local
       HMI, and it is that panel the page's cyber route reaches, so it is drawn
       in the dosing zone rather than in the control room. */
    {
      id: "hmi",
      symbol: "cset/hmi",
      tag: "HMI-01",
      purdue: 2,
      zone: "Chlorine dosing",
      label: { en: "Local dosing HMI", nl: "Lokaal doseerpaneel" }
    },
    /* ── L1 · basic control ────────────────────────────────────────────── */
    {
      id: "plc",
      symbol: "cset/plc",
      tag: "PLC-01",
      purdue: 1,
      zone: "Basic control",
      label: { en: "Treatment PLC", nl: "Zuiverings-PLC" }
    },
    {
      id: "rtu",
      symbol: "cset/rtu",
      tag: "RTU-01",
      purdue: 1,
      zone: "Remote field sites",
      label: { en: "Booster-station RTU", nl: "RTU van het boosterstation" }
    },
    {
      id: "radio",
      symbol: "cset/serial-radio",
      tag: "RAD-01",
      purdue: 1,
      zone: "Remote field sites",
      label: { en: "Radio / cellular link", nl: "Radio- / mobiele verbinding" }
    },
    /* ── L0 · process. Every tag here is a loop `water-treatment-train.ts`
          already draws, except PIT-701, which continues that file's 700-series
          distribution numbering for the one remote asset it does not cover. ── */
    {
      id: "ft",
      symbol: "isa/discrete/field/FT-101",
      purdue: 0,
      zone: "Raw water intake",
      label: { en: "Raw water flow", nl: "Ruwwaterdebiet" }
    },
    {
      id: "ait",
      symbol: "isa/discrete/field/AIT-601",
      purdue: 0,
      zone: "Chlorine contact and storage",
      label: { en: "Free chlorine residual", nl: "Vrij chloorrestgehalte" }
    },
    {
      id: "lt",
      symbol: "isa/discrete/field/LT-601",
      purdue: 0,
      zone: "Chlorine contact and storage",
      label: { en: "Clearwell level", nl: "Niveau reinwaterkelder" }
    },
    {
      id: "pump",
      symbol: "oxot/water/metering_pump",
      tag: "P-501",
      purdue: 0,
      zone: "Chlorine dosing",
      label: { en: "Chlorine metering pump", nl: "Chloor-doseerpomp" }
    },
    {
      id: "pit",
      symbol: "isa/discrete/field/PIT-701",
      purdue: 0,
      zone: "Remote field sites",
      label: { en: "Distribution pressure", nl: "Distributiedruk" }
    }
  ],
  edges: [
    /* L0 → L1 — hardwired field I/O. The remote instrument reports to the RTU,
       not to the plant PLC: that separation is the whole reason the remote
       field sites are a zone of their own. */
    { from: "ft", to: "plc", kind: "electrical", label: MA },
    { from: "ait", to: "plc", kind: "electrical", label: MA },
    { from: "lt", to: "plc", kind: "electrical", label: MA },
    {
      from: "plc",
      to: "pump",
      kind: "electrical",
      label: { en: "pump speed", nl: "pomptoerental" }
    },
    { from: "pit", to: "rtu", kind: "electrical", label: MA },
    ...controlEdges(),
    ...SHARED_UPPER_EDGES
  ]
};

/* ── Wastewater ───────────────────────────────────────────────────────────── */

export const WATER_WASTEWATER_OT_PURDUE: DiagramSpec = {
  type: "purdue",
  sector: "water",
  title: {
    en: "Wastewater — OT and SCADA paths on the Purdue model",
    nl: "Afvalwater — OT- en SCADA-paden op het Purdue-model"
  },
  nodes: [
    ...SHARED_UPPER,
    {
      id: "hmi",
      symbol: "cset/hmi",
      tag: "HMI-01",
      purdue: 2,
      zone: "Control room",
      label: { en: "Plant operator HMI", nl: "Bedieningspaneel van de operator" }
    },
    /* ── L1 · basic control ────────────────────────────────────────────── */
    {
      id: "plc",
      symbol: "cset/plc",
      tag: "PLC-01",
      purdue: 1,
      zone: "Basic control",
      label: { en: "Treatment PLC", nl: "Zuiverings-PLC" }
    },
    /* THE ASSET THE PAGE'S WASTEWATER SCENARIO IS ABOUT. The source's
       lift-station row names a remote RTU, a VFD, a level sensor and a
       communications path; all four are on this sheet, and none of them is
       reachable from the plant PLC. */
    {
      id: "rtu",
      symbol: "cset/rtu",
      tag: "RTU-01",
      purdue: 1,
      zone: "Remote field sites",
      label: { en: "Lift-station RTU", nl: "RTU van het rioolgemaal" }
    },
    {
      id: "radio",
      symbol: "cset/serial-radio",
      tag: "RAD-01",
      purdue: 1,
      zone: "Remote field sites",
      label: { en: "Radio / cellular link", nl: "Radio- / mobiele verbinding" }
    },
    /* ── L0 · process ──────────────────────────────────────────────────── */
    {
      id: "lt",
      symbol: "isa/discrete/field/LT-101",
      purdue: 0,
      zone: "Remote field sites",
      label: { en: "Wet-well level", nl: "Niveau natte put" }
    },
    {
      id: "pump",
      symbol: "pid/pumps/centrifugal_pump_1",
      tag: "P-101",
      purdue: 0,
      zone: "Remote field sites",
      label: { en: "Wet-well transfer pump", nl: "Opvoerpomp van de natte put" }
    },
    {
      id: "ait",
      symbol: "isa/discrete/field/AIT-301",
      purdue: 0,
      zone: "Biological treatment",
      label: { en: "Dissolved oxygen, aeration basin", nl: "Opgelost zuurstof, beluchtingstank" }
    },
    /* A BLOWER IS DRAWN AS A BLOWER. `pid/compressors_iso/blower_fan` is the
       ISO rotating-machine mark; a centrifugal pump body would have said the
       aeration train moves liquid. */
    {
      id: "blower",
      symbol: "pid/compressors_iso/blower_fan",
      tag: "B-301",
      purdue: 0,
      zone: "Biological treatment",
      label: { en: "Aeration blower", nl: "Beluchtingsblower" }
    },
    {
      id: "uv",
      symbol: "oxot/water/uv_reactor",
      tag: "UV-401",
      purdue: 0,
      zone: "Disinfection",
      label: { en: "UV disinfection reactor", nl: "UV-desinfectiereactor" }
    }
  ],
  edges: [
    /* L0 ↔ L1 — the lift station is a closed loop at the remote site: its own
       level transmitter in, its own pump out, and nothing from the plant. */
    { from: "lt", to: "rtu", kind: "electrical", label: MA },
    {
      from: "rtu",
      to: "pump",
      kind: "electrical",
      label: { en: "pump start / stop", nl: "pomp start / stop" }
    },
    { from: "ait", to: "plc", kind: "electrical", label: MA },
    {
      from: "plc",
      to: "blower",
      kind: "electrical",
      label: { en: "blower speed", nl: "blowertoerental" }
    },
    {
      from: "plc",
      to: "uv",
      kind: "electrical",
      label: { en: "UV dose control", nl: "UV-dosisregeling" }
    },
    ...controlEdges(),
    ...SHARED_UPPER_EDGES
  ]
};
