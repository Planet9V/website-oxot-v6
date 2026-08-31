import { createElement, type ComponentType } from "react";
import type { Bilingual } from "@/i18n/bilingual";
import * as DrawioGlyphs from "@/components/twin/drawio-glyphs";
import * as Electrical from "@/components/twin/electrical-hand-drawn";
import * as ElectricalInstruments from "@/components/twin/electrical-instruments-hand-drawn";
import * as ElectricalContacts from "@/components/twin/electrical-contacts-hand-drawn";
import * as PidActuatedValves from "@/components/twin/pid-actuated-valves-hand-drawn";
import * as ElectricalMachines from "@/components/twin/electrical-machines-hand-drawn";
import * as Thermal from "@/components/twin/thermal-hand-drawn";
import * as Cset from "@/components/twin/cset-glyphs";
import * as Ot from "@/components/twin/ot-notation";
import { MANIFEST_SLUG_COUNT, manifestSlugs, manifestSymbol } from "@/components/twin/drawio-glyph";
import {
  BUBBLE_CELL,
  InstrumentBubbleGlyph,
  type InstrumentDevice,
  type InstrumentLocation
} from "@/components/twin/instrument-bubble";

/**
 * THE DIAGRAM CONTRACT — `docs/diagram-system/task_plan.md` Phase 4.1.
 *
 * A page specification says WHAT it wants drawn. It never says where anything
 * goes, what colour it is, or which SVG element carries it. That division is
 * the whole point: every diagram on this site was previously hand-authored
 * bespoke SVG per page, which is how `ThreeGateLedger.tsx` came to exist in
 * five near-identical copies totalling 2,436 lines.
 *
 * THIS FILE ALSO OWNS SYMBOL RESOLUTION, and that is deliberate rather than
 * convenient. A `DiagramSpec` is only well-formed if every `symbol` slug in it
 * names a real glyph; a slug that resolves to nothing is a malformed spec, not
 * a rendering accident. So the thing that decides whether a slug is valid lives
 * next to the type that declares it, and `assertSpecResolves` is that type's
 * runtime half.
 *
 * GATE 3 / GATE 4: an unresolvable slug is a BUILD ERROR NAMING THE GAP, never
 * a silent fallback box. `Diagram` is an async Server Component, so the throw
 * happens inside `next build` and fails it. That single rule converts every
 * future gap from an invisible visual compromise into a tracked work item —
 * which is exactly what a fallback box destroys, because a grey rectangle
 * labelled "Programmable logic controller" looks intentional in a screenshot.
 */

export type DiagramType = "pid" | "purdue" | "network" | "block" | "process" | "c4";

export type Sector = "water" | "energy" | "manufacturing" | "datacenter";

/**
 * Purdue Enterprise Reference Architecture levels. 0 = process, 5 = enterprise.
 *
 * 3.5 IS A REAL LEVEL, not a rounding artefact. The industrial DMZ is where
 * ISA-99/IEC 62443 puts the broker between site operations and the enterprise —
 * the unidirectional gateway, the replicated historian, the vendor jump host —
 * and a drawing that folds it into L3 or L4 asserts that those assets sit in a
 * zone they do not sit in. `twin/ot-notation` already types it this way; this
 * declaration matches it rather than forcing every caller to choose a side.
 */
export type PurdueLevel = 0 | 1 | 2 | 3 | 3.5 | 4 | 5;

/**
 * ISA-5.1 signal-line kinds. These map to STROKE TREATMENTS, never to colours —
 * see `edge-line.tsx`. A reader who cannot separate cyan from amber must still
 * be able to tell a pneumatic run from a data link, and an OT engineer reading
 * the drawing expects the line itself to say which it is.
 *
 * `power-ac` AND `power-dc` EXIST BECAUSE DASHED MEANS SIGNAL. The first energy
 * drawing ran every conductor — the 11 kV incomer, the 800 V DC battery string
 * and the Modbus telemetry alike — as one dashed `electrical`, and the audit
 * named the consequence precisely: in drafting convention dashed means signal
 * and solid means power, so a megawatt and a measurement read the same. Power
 * is therefore solid; DC carries the IEC 60617 double-bar cadence that
 * distinguishes it from AC; and dashing is left to say what dashing says.
 */
export type EdgeKind =
  | "process"
  | "power-ac"
  | "power-dc"
  | "pneumatic"
  | "electrical"
  | "data-link"
  | "capillary";

/** How a node is presented. Declared here because `ports.ts` decides terminal
 *  geometry from it and `BlockDiagram` imports `ports.ts` — the shared
 *  vocabulary has to sit under both. */
export type RenderMode = "card" | "bus" | "inline" | "reference";

export interface DiagramNode {
  id: string;
  /** Glyph slug — `GLYPH_REGISTRY`, then the `isa/` grammar, then the compiled
   *  stencil manifest. Unresolvable by all three = build error. See `resolveSymbol`. */
  symbol: string;
  label: Bilingual;
  /** ISA loop/instrument tag, e.g. `FT-101`. Drawn under the glyph when present. */
  tag?: string;
  /** IEC 62443 zone name. Restated in the accessible text; not yet drawn as a boundary. */
  zone?: string;
  /** Purdue level. REQUIRED for `type: "purdue"` — a node without one cannot be banded. */
  purdue?: PurdueLevel;
  /**
   * HOW THE NODE IS PRESENTED. Omitted, `BlockDiagram` DERIVES it — see
   * `renderModes` there — so this field is an override, not a requirement.
   *
   * `"bus"` draws the node as a WIDE HORIZONTAL RAIL with taps rather than as a
   * boxed symbol, and widens the box handed to ELK to match. A busbar is a
   * length of conductor other things connect to, not a device; boxed at normal
   * node width its three-conductor stencil reads as a hamburger icon, which is
   * what the audit found. `symbol` is still required and still validated —
   * the rail is a presentation of the bus, not a licence to omit one.
   *
   * `"inline"` DROPS THE CARD AND PUTS THE SYMBOL IN THE CONDUCTOR — the fix
   * for the defect a fourth audit summarised as "this is not yet a single-line
   * diagram": every mark but the busbar sat in a rounded rectangle and every
   * conductor stopped on its border, 44 units short of the terminal the symbol
   * draws. The line runs THROUGH the apparatus, so the edge snaps to the
   * glyph's declared port and the caption moves BESIDE it — centred underneath
   * it is struck through by the node's own downward run.
   *
   * `"reference"` is `"inline"` for a ONE-TERMINAL mark: bare glyph, no card,
   * no caption, no arrowhead. Earth is not a load you feed, it is the end of a
   * bond; its name stays in the accessible restatement.
   */
  render?: Exclude<RenderMode, "card">;
}

export interface DiagramEdge {
  from: string;
  to: string;
  kind: EdgeKind;
  label?: Bilingual;
  /**
   * NAME THE NOZZLE, for the case bearing cannot decide.
   *
   * The snapper picks a terminal by which declared port points closest to where
   * the line is going. That is right almost everywhere and wrong on a settling
   * tank: CL-301's sludge line has to leave the floor hopper at 6 o'clock even
   * though the sludge tank is laid out up and to the RIGHT of it, so bearing
   * scores the 3 o'clock effluent nozzle higher for BOTH outlets. The audit
   * measured the result — sludge and clarified water leaving one point — and
   * read it correctly: separating those two streams IS the unit operation, so
   * one nozzle says nothing separates.
   *
   * A hint of last resort, not a layout escape hatch. Reach for it only when the
   * correct nozzle is a fact about the EQUIPMENT that geometry cannot infer. An
   * unknown name is ignored rather than thrown on: a port table is free to be
   * rewritten, and a stale hint should degrade to the automatic choice rather
   * than take a whole page down.
   */
  fromPort?: string;
  toPort?: string;
  /**
   * OPEN CIRCLES INSTEAD OF FILLED ONES, and the difference is normative.
   *
   * ISA-5.1 Table 5.3.2 separates a link between functions of ONE shared
   * control system (solid line, OPEN circles) from a link between INDEPENDENT
   * systems (solid line, FILLED circles). That distinction is exactly what an
   * OT reader looks for, because it says where a trust boundary is.
   *
   * Filled is the default, because an independent link drawn open HIDES a
   * boundary while a shared link drawn filled merely invents one — the first
   * costs a misreading, the second costs a question. Set this true only where
   * both ends genuinely belong to the same control system.
   */
  sharedSystem?: boolean;
  /**
   * Draw an arrowhead at BOTH ends. For a genuinely two-way interface — a
   * battery charges as well as discharges, so `bess ↔ pcs ↔ bus` carries power
   * in both directions — a single head is a claim about flow direction that the
   * plant does not make.
   */
  bidirectional?: boolean;
  /**
   * REVERSE THIS EDGE FOR RANKING ONLY. The drawn arrow, the accessible
   * restatement and the edge's meaning are unchanged; only ELK's layering sees
   * the flip.
   *
   * This exists for one real drawing convention, not as a layout escape hatch.
   * On a single-line diagram generation feeds the busbar FROM BELOW: the grid
   * is at the top, the switchgear beneath it, and the PV array and the battery
   * hang off the bus as feeders. Power flows up; the drawing ranks down. Left
   * to ELK the source-most nodes are the sources of power, so the battery and
   * the PV string combiner out-ranked the switchgear they connect to — which
   * the audit read, correctly, as the drawing asserting that the battery
   * supplies the site.
   */
  rankReversed?: boolean;
}

export interface DiagramSpec {
  type: DiagramType;
  sector?: Sector;
  title: Bilingual;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

/** Bilingual names for the ISA line kinds, for the accessible restatement. */
export const EDGE_KIND_LABEL: Record<EdgeKind, Bilingual> = {
  process: { en: "process line", nl: "processleiding" },
  "power-ac": { en: "AC power conductor", nl: "AC-vermogensgeleider" },
  "power-dc": { en: "DC power conductor", nl: "DC-vermogensgeleider" },
  pneumatic: { en: "pneumatic signal", nl: "pneumatisch signaal" },
  electrical: { en: "electrical signal", nl: "elektrisch signaal" },
  "data-link": { en: "data link", nl: "dataverbinding" },
  // "instrument connection", not "capillary tube". This kind draws the fine
  // double line that hangs a bubble off the run it measures, and since the
  // 2026-08-28 spec repair it carries three plain process-to-instrument
  // connections (FT-101, AIT-601, FT-701) that are not filled capillary
  // systems. A screen reader announcing "capillary tube" on a mag-meter lead
  // states a fill the drawing never claimed.
  capillary: { en: "instrument connection", nl: "instrumentaansluiting" }
};

/**
 * BILINGUAL NAMES FOR THE IEC 62443 ZONES.
 *
 * A `zone` is authored as a plain English key in the spec, because it is also an
 * identity the renderer matches on (`DRAWN_ZONES` in `PurdueDiagram`), and a
 * bilingual object is a poor map key. But the accessible restatement SPEAKS the
 * zone, and until 2026-08-29 it spoke the raw key — so a Dutch screen-reader
 * user heard "zone Raw water intake" and "zone Sludge handling" across all three
 * drawings, on a site where every user-facing string is bilingual by rule. The
 * External zone made it obvious: the perimeter was drawn "Externe zone" while
 * the restatement two elements away still said "External".
 *
 * An unmapped zone falls back to its key rather than throwing — a spec is free
 * to name a new zone, and an English word in the Dutch text is a smaller failure
 * than a page that will not render. `zoneLabel` warns once so it stays visible.
 */
export const ZONE_LABEL: Record<string, Bilingual> = {
  "Basic control": { en: "Basic control", nl: "Basisregeling" },
  "Battery storage": { en: "Battery storage", nl: "Batterijopslag" },
  "Biological treatment": { en: "Biological treatment", nl: "Biologische zuivering" },
  "Body shop cell": { en: "Body shop cell", nl: "Carrosseriecel" },
  "Chlorine contact and storage": {
    en: "Chlorine contact and storage",
    nl: "Chloorcontact en -opslag"
  },
  "Chlorine dosing": { en: "Chlorine dosing", nl: "Chloordosering" },
  Clarification: { en: "Clarification", nl: "Bezinking" },
  "Coagulant dosing": { en: "Coagulant dosing", nl: "Coagulantdosering" },
  Coagulation: { en: "Coagulation", nl: "Coagulatie" },
  "Control centre": { en: "Control centre", nl: "Regelcentrum" },
  "Control conduit": { en: "Control conduit", nl: "Regelconduit" },
  "Control room": { en: "Control room", nl: "Controlekamer" },
  Disinfection: { en: "Disinfection", nl: "Desinfectie" },
  Distribution: { en: "Distribution", nl: "Distributie" },
  Enterprise: { en: "Enterprise", nl: "Bedrijfsnetwerk" },
  External: { en: "External", nl: "Extern" },
  Filtration: { en: "Filtration", nl: "Filtratie" },
  "Industrial DMZ": { en: "Industrial DMZ", nl: "Industriële DMZ" },
  "LV distribution": { en: "LV distribution", nl: "Laagspanningsdistributie" },
  "MV switchgear": { en: "MV switchgear", nl: "Middenspanningsschakelinstallatie" },
  "PV array": { en: "PV array", nl: "PV-veld" },
  "Paint shop": { en: "Paint shop", nl: "Spuiterij" },
  "Raw water intake": { en: "Raw water intake", nl: "Ruwwaterinname" },
  // An unstaffed lift station, booster station or reservoir reached only over a
  // radio or cellular bearer. Its own 62443 zone rather than part of the plant's
  // — reaching it does not cross the plant's boundary, which is the point the
  // water Purdue sheets are making about remote assets.
  "Remote field sites": { en: "Remote field sites", nl: "Externe veldlocaties" },
  "Safety instrumented": { en: "Safety instrumented", nl: "Veiligheidsinstrumenteel" },
  "Site control": { en: "Site control", nl: "Locatiebesturing" },
  "Site operations": { en: "Site operations", nl: "Locatiebedrijfsvoering" },
  "Sludge handling": { en: "Sludge handling", nl: "Slibverwerking" },
  "Utility interface": { en: "Utility interface", nl: "Netkoppeling" }
};

const warnedZones = new Set<string>();

/** The zone's bilingual name, or the key itself with a one-time warning. */
export function zoneLabel(zone: string): Bilingual {
  const known = ZONE_LABEL[zone];
  if (known) return known;
  if (!warnedZones.has(zone)) {
    warnedZones.add(zone);
    console.warn(`[diagrams] zone "${zone}" has no ZONE_LABEL entry — spoken in English on every locale.`);
  }
  return { en: zone, nl: zone };
}

/** Bilingual names for the Purdue levels, for band captions and the restatement. */
export const PURDUE_LEVEL_LABEL: Record<PurdueLevel, Bilingual> = {
  5: { en: "L5 · Enterprise network", nl: "L5 · Bedrijfsnetwerk" },
  4: { en: "L4 · Site business systems", nl: "L4 · Bedrijfssystemen locatie" },
  3.5: { en: "L3.5 · Industrial DMZ", nl: "L3.5 · Industriële DMZ" },
  3: { en: "L3 · Site operations", nl: "L3 · Locatiebedrijfsvoering" },
  2: { en: "L2 · Area supervisory control", nl: "L2 · Toezichthoudende besturing" },
  1: { en: "L1 · Basic control", nl: "L1 · Basisbesturing" },
  0: { en: "L0 · Process", nl: "L0 · Proces" }
};

/** A glyph is a `<g>` fragment already fitted to the 32-unit cell — never a standalone `<svg>`. */
export type GlyphComponent = ComponentType;

/**
 * THE RESOLUTION TABLE IS DATA, NOT CODE, so wiring a new glyph module in later
 * is one spread rather than a rewrite. Slugs are draw.io's own stencil paths,
 * taken verbatim from the doc comment above each export in `drawio-glyphs.tsx`
 * — which is why Phase 3.2's build-time stencil manifest sits UNDER this table
 * without renaming anything: same namespace, same spelling, tried second.
 *
 * WHAT IS LEFT IN HERE NOW THAT THE MANIFEST RESOLVES ALL 1,007 STENCILS. These
 * 43 entries are no longer coverage — the manifest covers every one of these
 * slugs too. They are the entries whose GEOMETRY must differ from the stencil's:
 * four `electrical/…` slugs resolve to `twin/electrical-hand-drawn` because
 * draw.io draws that device wrong at this size, and the rest hold their curated
 * React exports so that `GLYPH_PORTS`, `EXPECTED_DUPLICATES` and every existing
 * spec keep the exact components they were audited with. Deleting a line here
 * would not break resolution; it would silently swap an audited mark for an
 * unaudited one, which is worse than a build error.
 */
const DRAWIO_SLUGS: Record<string, GlyphComponent> = {
  "pid/valves/gate_valve": DrawioGlyphs.GateValve,
  "pid/valves/globe_valve": DrawioGlyphs.GlobeValve,
  "pid/valves/ball_valve": DrawioGlyphs.BallValve,
  "pid/valves/check_valve_1": DrawioGlyphs.CheckValve,
  "pid/valves/butterfly_valve_1": DrawioGlyphs.ButterflyValve,
  "pid/valves/angle": DrawioGlyphs.AngleValve,
  "pid/instruments/level_indicator": DrawioGlyphs.InstrumentBubble,
  "pid/instruments/flow_indicator": DrawioGlyphs.FlowIndicator,
  "pid/instruments/flow_transmitter": DrawioGlyphs.FlowTransmitter,
  "pid/instruments/level_controller_1": DrawioGlyphs.LevelController,
  "pid/instruments/analyzer_transmitter": DrawioGlyphs.AnalyzerTransmitter,
  "pid/instruments/flow_element": DrawioGlyphs.FlowElement,
  "pid/vessels/container_tank_cistern": DrawioGlyphs.Vessel,
  "pid/vessels/bunker_conical_bottom": DrawioGlyphs.ConicalBunker,
  "pid/vessels/barrel_drum": DrawioGlyphs.BarrelDrum,
  "pid/pumps/centrifugal_pump_1": DrawioGlyphs.CentrifugalPump,
  "pid/pumps/gear_pump": DrawioGlyphs.GearPump,
  "pid/pumps/gas_compressor": DrawioGlyphs.GasCompressor,
  "pid/compressors/centrifugal_compressor": DrawioGlyphs.CentrifugalCompressor,
  "pid/compressors/reciprocating_compressor": DrawioGlyphs.ReciprocatingCompressor,
  "pid/heat_exchangers/heat_exchanger_coil_tubes": DrawioGlyphs.HeatExchanger,
  "pid/heat_exchangers/heat_exchanger_plate": DrawioGlyphs.PlateHeatExchanger,
  "pid/heat_exchangers/condenser": DrawioGlyphs.Condenser,
  "pid/heat_exchangers/electric_heater": DrawioGlyphs.ElectricHeater,
  "pid/filters/liquid_filter": DrawioGlyphs.LiquidFilter,
  "pid/filters/gas_filter": DrawioGlyphs.GasFilter,
  "pid/separators/separator_cyclone": DrawioGlyphs.CycloneSeparator,
  "pid/separators/gravity_separator_settling_chamber": DrawioGlyphs.GravitySeparator,
  "pid/agitators/agitator_propeller": DrawioGlyphs.PropellerAgitator,
  "pid/agitators/agitator_impeller": DrawioGlyphs.ImpellerAgitator,
  "pid/piping/basket_strainer": DrawioGlyphs.BasketStrainer,
  "pid/fittings/flame_arrestor": DrawioGlyphs.FlameArrestor,
  // Hand-drawn rather than the draw.io stencil since 2026-08-28. The stencil is
  // drawn HORIZONTALLY in a drawing that flows down, and at the 27px it renders
  // at, its `x` collapsed into an arrowhead-shaped blob sitting off the blade's
  // contact rather than on it — the independent audit read it as "a switch with
  // an arrow", four times over (CB-01..04). The replacement puts a 5.6-unit
  // cross ON the fixed contact with 1.51 units still clear of the blade.
  "electrical/electro-mechanical/circuit_breaker": Electrical.CircuitBreaker,
  "electrical/electro-mechanical/fuse": Electrical.Fuse,
  "electrical/electro-mechanical/2_position_switch": DrawioGlyphs.TwoPositionSwitch,
  "electrical/electro-mechanical/changeover_contact": DrawioGlyphs.ChangeoverContact,
  "electrical/transmission/3_line_bus": DrawioGlyphs.ThreeLineBus,
  "electrical/transmission/cable_group": DrawioGlyphs.CableGroup,
  "electrical/transmission/optical_fiber": DrawioGlyphs.OpticalFiber,
  "electrical/transmission/terminal_3_phase": DrawioGlyphs.TerminalThreePhase,
  "electrical/power_semiconductors/bridge_rectifier_1": Electrical.InverterBridge,
  // The IEC 60617-08 lettered instrument faces moved to their own module on
  // 2026-08-28 when `electrical-hand-drawn.tsx` passed the 500-line ceiling.
  "electrical/instruments/ampermeter": ElectricalInstruments.Ammeter,
  "electrical/instruments/voltmeter": ElectricalInstruments.Voltmeter
};

/** `oxot/…` — marks this project drew because no stencil library publishes them.
 *  Never `pid/`/`electrical/`: Phase 3 claims draw.io's namespace, and a
 *  transformer addressed as a terminal strip is a lie in the address itself. */
const OXOT_SLUGS: Record<string, GlyphComponent> = {
  // A MAKE CONTACT, DRAWN OPEN, AND BOTH HALVES OF THAT ARE THE POINT. KM-207
  // is the de-energise-to-trip final element of a safety function; it was drawn
  // with draw.io's rotary selector (a knob a human turns) and then with an SPDT
  // changeover. A changeover has two energised positions and no reference state,
  // so drawing it thrown asserted one at random — and it asserted the tripped
  // one. IEC draws every contact de-energised, and on a de-energise-to-trip
  // element the de-energised state IS the safe state, so an open make contact
  // states the failure mode instead of guessing at a moment.
  "oxot/electrical/make_contact": ElectricalContacts.MakeContact,
  // Legend/detail only. Measured, not assumed: the semicircular contact-piece
  // needs ~70px before its aperture opens, and this cell renders at 37 — below
  // that it closes into a hook and reads as a bent blade. Registered, correct,
  // and too detailed for this scale.
  "oxot/electrical/contactor": ElectricalContacts.Contactor,
  // An XV is DEFINED by being actuated, and a bare bowtie is the P&ID symbol
  // for a HAND valve — so XV-306, fed by an edge labelled "24 V DO", was
  // contradicting its own conductor on the same sheet.
  "oxot/pid/solenoid_valve": PidActuatedValves.SolenoidValve,
  /* ISO 10628-2 `C0079` / IEC 60617-06 — a circle carrying its letter. Drawn
     2026-08-29 because TWO sectors were rendering generation plant as draw.io's
     open-topped WATER CISTERN: energy's "Generating unit" and hyperscale's
     thermal plant. That is the metering-pump-as-tank defect, twice over.
     The letter is a parameter on a private helper and `Generator` is the only
     export, because both registries map a slug to a ZERO-ARG component — a
     public parametric export cannot be registered. `M` for a motor is one line
     away and needs no new geometry. */
  "oxot/electrical/generator": ElectricalMachines.Generator,
  /* ISO 10628-2 `X8114`, wet induced-draught — the standard open-circuit
     counterflow form for a chiller plant, confirmed against HVAC sources
     rather than assumed. Proportions measured off the ISO sheet at 400 dpi
     (basin 0.206 of height, bottom width 0.790, top 0.406); four features were
     opened up to clear the derived 2.755-unit legibility pitch. */
  "oxot/thermal/cooling_tower": Thermal.CoolingTowerInducedDraught,
  /* ISO 10628-2 `X8164`. Blades are single swept strokes, not the standard's
     outlined leaves: six lines converging on a hub render as a solid disc at
     the sizes this library actually draws. */
  "oxot/thermal/ventilation_fan": Thermal.VentilationFan,
  "oxot/electrical/transformer": Electrical.Transformer,
  "oxot/electrical/transformer_dyn": Electrical.TransformerDyn,
  "oxot/electrical/battery": Electrical.Battery,
  "oxot/electrical/disconnector": Electrical.Disconnector,
  "oxot/electrical/earth_reference": Electrical.EarthReference,
  /* Added 2026-08-28 to clear a build-breaking gap. The agent drawing these
     five marks crashed mid-task after authoring the glyphs but before wiring
     them, so the energy spec named slugs the registry did not hold and
     `assertSpecResolves` threw — taking the whole gallery to HTTP 500 for every
     diagram, not just its own. That is GATE 3 behaving exactly as designed: an
     unresolvable slug is a loud build error, never a silent placeholder box.
     Note the export is `PhotovoltaicArray`, not the `pv_array` the spec's slug
     suggests — slug and component name are deliberately allowed to differ. */
  "oxot/electrical/ac_source": Electrical.AcSource,
  "oxot/electrical/pv_array": Electrical.PhotovoltaicArray,
  "oxot/electrical/current_transformer": ElectricalInstruments.CurrentTransformer,
  "oxot/electrical/voltage_transformer": ElectricalInstruments.VoltageTransformer,
  "oxot/electrical/measuring_relay": ElectricalInstruments.MeasuringRelay,
  "oxot/water/uv_reactor": DrawioGlyphs.UvReactor,
  "oxot/water/bar_screen": DrawioGlyphs.BarScreen,
  "oxot/water/chemical_day_tank": DrawioGlyphs.ChemicalDayTank,
  "oxot/water/metering_pump": DrawioGlyphs.MeteringPump,
  "oxot/water/clearwell": DrawioGlyphs.Clearwell,
  "oxot/water/check_valve_inline": DrawioGlyphs.CheckValveInline,
  "oxot/water/clarifier": DrawioGlyphs.Clarifier,
  "oxot/water/coagulant_mixer": DrawioGlyphs.CoagulantMixer
};

/**
 * Phase 1.1–1.4 — the notation that does not exist in any stencil library,
 * from `twin/ot-notation`. Only the FIXED-GEOMETRY marks are slugs: a Purdue
 * band, a SIL band and a security-level tag all need an argument to mean
 * anything, and a symbol whose meaning depends on a prop it cannot receive
 * through this table would draw a confident, wrong number.
 */
const OT_SLUGS: Record<string, GlyphComponent> = {
  "ot/person": Ot.Person,
  "ot/software-system": Ot.SoftwareSystem,
  "ot/container": Ot.Container,
  "ot/component": Ot.Component,
  "ot/data-diode": Ot.DataDiode,
  "ot/air-gap": Ot.AirGap,
  "ot/safety-instrumented-system": Ot.SafetyInstrumentedSystem,
  "ot/zone-perimeter": Ot.ZonePerimeter,
  "ot/conduit": Ot.Conduit
};

/**
 * Phase 1.5 — CISA's CSET OT asset set, vectorised in `twin/cset-glyphs`.
 *
 * LICENCE, AND IT IS NOT WHAT PEOPLE ASSUME. CSET is contractor-produced, so it
 * is MIT-licensed, © Battelle Energy Alliance — NOT US-government public
 * domain. Any surfaced provenance must say so.
 *
 * These are equipment PORTRAITS, not ISA-5.1 schematic symbols. That is why
 * they carry the whole architecture/zone vocabulary here and none of the P&ID
 * one: a CSET PLC is a recognisable rack, which is right in a Purdue drawing
 * and wrong on a piping diagram, where the ISA logic-solver bubble is the
 * symbol an engineer expects.
 */
const CSET_SLUGS: Record<string, GlyphComponent> = {
  "cset/plc": Cset.Plc,
  "cset/rtu": Cset.Rtu,
  "cset/dcs": Cset.Dcs,
  "cset/ied": Cset.Ied,
  "cset/mtu": Cset.Mtu,
  "cset/hmi": Cset.Hmi,
  "cset/historian": Cset.Historian,
  "cset/ews": Cset.EngineeringWorkstation,
  "cset/sis": Cset.SafetyInstrumentedSystem,
  "cset/unidirectional-device": Cset.UnidirectionalDevice,
  "cset/front-end-processor": Cset.FrontEndProcessor,
  "cset/master-site": Cset.MasterSite,
  "cset/serial-radio": Cset.SerialRadio,
  "cset/subscriber-radio": Cset.SubscriberRadio,
  "cset/serial-switch": Cset.SerialSwitch,
  "cset/handheld-wireless-device": Cset.HandheldWirelessDevice,
  "cset/firewall": Cset.Firewall,
  "cset/router": Cset.Router,
  "cset/vlan-router": Cset.VlanRouter,
  "cset/switch": Cset.Switch,
  "cset/vlan-switch": Cset.VlanSwitch,
  "cset/hub": Cset.Hub,
  "cset/ids": Cset.Ids,
  "cset/ips": Cset.Ips,
  "cset/link-encryption": Cset.LinkEncryption,
  "cset/modem": Cset.Modem,
  "cset/wireless-modem": Cset.WirelessModem,
  "cset/wireless-router": Cset.WirelessRouter,
  "cset/remote-access-server": Cset.RemoteAccessServer,
  "cset/terminal-server": Cset.TerminalServer,
  "cset/power-over-ethernet": Cset.PowerOverEthernet,
  "cset/server": Cset.Server,
  "cset/application-server": Cset.ApplicationServer,
  "cset/database-server": Cset.DatabaseServer,
  "cset/configuration-server": Cset.ConfigurationServer,
  "cset/virtual-machine-server": Cset.VirtualMachineServer,
  "cset/pc": Cset.Pc,
  "cset/ups": Cset.Ups,
  "cset/siem": Cset.Siem,
  "cset/ip-camera": Cset.IpCamera,
  "cset/door-control-unit": Cset.DoorControlUnit,
  "cset/building-automation": Cset.BuildingAutomation,
  "cset/network-printer": Cset.NetworkPrinter,
  "cset/clock": Cset.Clock,
  "cset/cloud": Cset.Cloud
};

/** Slug → glyph. One spread per source module; that is the whole wiring cost. */
export const GLYPH_REGISTRY: Record<string, GlyphComponent> = {
  ...DRAWIO_SLUGS,
  ...OXOT_SLUGS,
  ...OT_SLUGS,
  ...CSET_SLUGS
};

const REGISTRY_SIZE = Object.keys(GLYPH_REGISTRY).length;

/* ── isa/ — THE ONE PARAMETRIC FAMILY ─────────────────────────────────────
 *
 * Phase 1.6 replaced 24 interchangeable stencil circles with ONE component
 * that draws its ISA-5.1 identification letters as real text. That component
 * takes arguments, so it cannot be a row in a fixed table: `FT-101` and
 * `AIT-301` are the same component with different meanings, and enumerating
 * every tag a site might ever use would be a table that grows with the content.
 *
 * So `isa/` slugs are MATCHED, not looked up:
 *
 *   isa/<device>/<location>/<LETTERS>[-<loop>]
 *   isa/discrete/field/FT-101      a field-mounted flow transmitter
 *   isa/shared/panel/FIC-301       a DCS shared-display flow controller
 *   isa/plc/panel/UY-901           a PLC-resident computing function
 *   isa/sis/panel/ZSH-201          a SAFETY INSTRUMENTED guard-position switch
 *   isa/computer/rear/KQI-410      a software totaliser, rear of the main panel
 *   isa/discrete/local-panel-rear/PT-115   rear of a field cabinet
 *
 * BOTH AXES CARRY THE WHOLE OF TABLE 5.1.1 SINCE 2026-08-28, and the gap that
 * closed was a CORRECTNESS gap rather than a coverage one. The grammar admitted
 * four device classes and four locations; the table defines five of each, and
 * the two that were missing are the two a security drawing cannot afford to
 * lose — the safety instrumented system (circle in a diamond in a square) and
 * the rear of a secondary panel (double DASHED line). Without `sis` a safety
 * function had no shape but a plain circle or a plain circle-in-square, and a
 * reader who knows the standard reads that as ordinary basic control.
 *
 * The extension is purely ADDITIVE: every slug an existing spec names still
 * matches. That matters more here than elsewhere, because an unresolvable slug
 * throws for the WHOLE gallery route rather than for its own diagram.
 *
 * GATE 3 SURVIVES THIS INTACT, and that was the constraint the pattern had to
 * meet. The grammar is closed: an unknown device class, an unknown location, a
 * lowercase tag or a six-letter tag matches nothing, `resolveSymbol` returns
 * `undefined`, and the build fails naming the gap exactly as it does for a
 * missing stencil. What is open is the TAG SPACE, which is content, not
 * library coverage — and `parseIsaTag` is the thing that judges whether the
 * letters mean anything, at the point where it can say so.
 *
 * The bubble's own cell is 44 units, not 32, because below ~44 rendered pixels
 * the letters — the only thing telling one bubble from another — stop being
 * readable. Scaling it into the 32-unit diagram cell keeps its centre on the
 * cell centre, so a routed line still lands on the middle of the bubble, and
 * takes its 1.8 stroke to 1.31, which is the 1.3 every other glyph here uses.
 */
/** `local-panel-rear` precedes `local-panel` in the alternation on purpose:
 *  regex alternation is first-match, so the shorter branch listed first would
 *  match `local-panel` and leave `-rear/` to fail against the tag group — a
 *  valid slug rejected as malformed, which here is a build error. */
const ISA_SLUG =
  /^isa\/(discrete|shared|computer|plc|sis)\/(field|panel|rear|local-panel-rear|local-panel)\/([A-Z]{2,5})(?:-([A-Za-z0-9]{1,6}))?$/;

/**
 * THE BUBBLE IS DRAWN AT 42 UNITS IN A 32-UNIT CELL, DELIBERATELY OVERSIZE.
 *
 * Its lettering is the only thing distinguishing one bubble from another, and
 * that lettering is sized inside `twin/instrument-bubble` — a file this
 * subsystem reads and does not own. So the only levers available on bubble type
 * are this transform and the canvas width, and BOTH had to move: at the
 * original 32/44 in a 1,282-unit canvas the loop numerals rendered at 7.9 css
 * px. 42/44 here, and 1,282 → 948 in `layout.ts`, together put them at 11.7.
 *
 * 42 rather than 44 because the overflow has to stay inside the structures the
 * cell sits in: 5 units past the cell on every side puts the bubble at y 1..43
 * of the 44-unit P&ID box, and clear of the label baseline at y 56 in the
 * 82-unit boxed node. Centring is explicit — the scale alone would grow the
 * bubble down and to the right and take its centre off the point every route
 * aims at.
 */
const ISA_CELL = 42;
const ISA_SCALE = ISA_CELL / BUBBLE_CELL;
const ISA_INSET = (32 - ISA_CELL) / 2;

/** Memoised, so a slug resolves to the SAME component every render — React
 *  remounts a subtree whose element type changed identity, and a diagram that
 *  remounts its instruments on every pass is a reconciliation bug waiting. */
const isaCache = new Map<string, GlyphComponent>();

function isaBubble(slug: string, device: InstrumentDevice, location: InstrumentLocation, letters: string, loop?: string): GlyphComponent {
  const cached = isaCache.get(slug);
  if (cached) return cached;
  const Bubble = () =>
    createElement(
      "g",
      { transform: `translate(${ISA_INSET} ${ISA_INSET}) scale(${ISA_SCALE.toFixed(5)})` },
      createElement(InstrumentBubbleGlyph, { tag: letters, loop, device, location })
    );
  Bubble.displayName = `IsaBubble(${letters}${loop ? `-${loop}` : ""})`;
  isaCache.set(slug, Bubble);
  return Bubble;
}

/**
 * THREE RESOLUTION PATHS, TRIED IN THIS ORDER, AND THE ORDER IS THE DESIGN.
 *
 *  1. `GLYPH_REGISTRY` — the curated table above. It wins outright, because
 *     five of its entries are deliberate CORRECTIONS of stencils draw.io ships
 *     wrong (`pid/valves/globe_valve`, which its own `valves.xml` makes
 *     byte-identical to `ball_valve`, and four `electrical/…` marks that
 *     collapse into blobs at this drawing size), and every `oxot/`, `ot/` and
 *     `cset/` slug has no draw.io equivalent at all.
 *  2. The `isa/` instrument grammar — parametric, matched rather than looked up.
 *  3. THE PHASE 3.2 MANIFEST — all 1,007 compiled `pid`/`electrical` stencils,
 *     as data. This is the path that ends hand-wiring: before it, a symbol had
 *     to be given a React export in `drawio-glyphs.tsx` AND a line in the table
 *     above before a spec could name it, which is why a 1,007-shape library
 *     exposed 118 slugs. It is a FALL-THROUGH, deliberately last, so adding
 *     coverage can never silently override a correction.
 *
 * GATE 3 IS UNCHANGED BY THE ADDITION. A slug that matches none of the three
 * still returns `undefined`, and `assertSpecResolves` still throws naming it.
 * What moved is the size of the set that resolves, not what happens when one
 * does not.
 */
export function resolveSymbol(slug: string): GlyphComponent | undefined {
  const direct = GLYPH_REGISTRY[slug];
  if (direct) return direct;
  const m = ISA_SLUG.exec(slug);
  if (m) return isaBubble(slug, m[1] as InstrumentDevice, m[2] as InstrumentLocation, m[3], m[4]);
  return manifestSymbol(slug);
}

/** Thrown when a spec names slugs the glyph library cannot resolve. */
export class DiagramSymbolError extends Error {
  readonly unresolved: readonly string[];

  constructor(message: string, unresolved: readonly string[]) {
    super(message);
    this.name = "DiagramSymbolError";
    this.unresolved = unresolved;
  }
}

/**
 * Resolvable slugs sharing the most leading path segments with `slug`.
 *
 * SEARCHES THE MANIFEST TOO, and that is what makes the error useful now. The
 * curated table holds 118 slugs; the manifest holds 1,007. A typo in
 * `pid/vessels/…` previously suggested only the three vessels somebody had
 * happened to hand-wire, so the message read as "this equipment does not exist"
 * when the honest answer is nearly always "you spelled draw.io's name for it
 * differently". The gap the error names has to be the real one.
 */
function nearest(slug: string, limit = 3): string[] {
  const want = slug.split("/");
  const wantTail = want[want.length - 1];
  return [...new Set([...Object.keys(GLYPH_REGISTRY), ...manifestSlugs()])]
    .map((candidate) => {
      const have = candidate.split("/");
      let shared = 0;
      while (shared < want.length && shared < have.length && want[shared] === have[shared]) shared++;
      const tail = have[have.length - 1];
      const overlap = tail.includes(wantTail) || wantTail.includes(tail) ? 1 : 0;
      return { candidate, score: shared * 2 + overlap };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.localeCompare(b.candidate))
    .slice(0, limit)
    .map((c) => c.candidate);
}

function explain(slug: string): string {
  if (slug.startsWith("isa/")) {
    return (
      `  • "${slug}" — an isa/ slug that does not match the instrument grammar.\n` +
      `    Expected isa/<device>/<location>/<2-5 UPPERCASE ISA letters>[-<loop>],\n` +
      `    e.g. "isa/discrete/field/FT-101" or "isa/sis/panel/ZSH-201".\n` +
      `    device   (ISA-5.1 Table 5.1.1, what performs the function):\n` +
      `      discrete | shared | computer | plc | sis\n` +
      `    location (same table, where the function lives):\n` +
      `      field | panel | rear | local-panel | local-panel-rear`
    );
  }
  const near = nearest(slug);
  return (
    `  • "${slug}" — not in the curated registry and not in the stencil manifest.` +
    (near.length ? `\n    Nearest resolvable: ${near.join(", ")}.` : "") +
    `\n    Either correct the slug, or draw the symbol (Phase 1/2) — every` +
    `\n    pid/ and electrical/ shape draw.io ships already resolves.`
  );
}

/**
 * Validates the WHOLE spec and reports EVERY gap in one throw.
 *
 * Failing on the first bad slug would make a spec with six missing symbols take
 * six build/fix cycles to clear. The gaps are a work list, so the error hands
 * over the entire list at once.
 *
 * Also enforces the two structural invariants a layout cannot recover from: an
 * edge pointing at an id that does not exist, and a `purdue` diagram whose
 * nodes carry no level. Guessing a level would put an asset in the wrong Purdue
 * zone, which is the single worst thing an OT security drawing can do.
 */
export function assertSpecResolves(spec: DiagramSpec): void {
  const unique = [...new Set(spec.nodes.map((n) => n.symbol).filter((slug) => !resolveSymbol(slug)))];

  if (unique.length > 0) {
    throw new DiagramSymbolError(
      `DiagramSpec "${spec.title.en}" (type=${spec.type}) names ${unique.length} symbol ` +
        `slug${unique.length === 1 ? "" : "s"} the glyph library cannot resolve. This is a ` +
        `BUILD ERROR BY DESIGN (docs/diagram-system/task_plan.md, GATE 3): a diagram never ` +
        `falls back to a silent placeholder box. ${REGISTRY_SIZE} curated slugs and ` +
        `${MANIFEST_SLUG_COUNT} compiled stencil slugs resolve, plus the open isa/ grammar.\n\n` +
        unique.map(explain).join("\n"),
      unique
    );
  }

  const ids = new Set(spec.nodes.map((n) => n.id));
  const dangling = [...new Set(spec.edges.flatMap((e) => [e.from, e.to]).filter((id) => !ids.has(id)))];
  if (dangling.length > 0) {
    throw new DiagramSymbolError(
      `DiagramSpec "${spec.title.en}" has edges referencing node ids that do not exist: ` +
        `${dangling.join(", ")}.`,
      []
    );
  }

  if (spec.type === "purdue") {
    const unbanded = spec.nodes.filter((n) => n.purdue === undefined).map((n) => n.id);
    if (unbanded.length > 0) {
      throw new DiagramSymbolError(
        `DiagramSpec "${spec.title.en}" is type="purdue" but ${unbanded.length} node` +
          `${unbanded.length === 1 ? "" : "s"} carr${unbanded.length === 1 ? "ies" : "y"} no ` +
          `\`purdue\` level: ${unbanded.join(", ")}. Purdue banding is not inferable, and an ` +
          `asset drawn at the wrong level is a false security claim — so the spec must state ` +
          `it rather than let the layout guess.`,
        []
      );
    }
  }
}
