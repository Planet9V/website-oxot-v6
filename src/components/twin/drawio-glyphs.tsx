/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 * Regenerate:  node scripts/build-drawio-glyphs.mjs
 *
 * 42 tokenized engineering glyphs compiled from draw.io 31.3.2's own
 * mxGraph stencil XML (2605 shapes available across the 17 notation
 * families in `compile-stencils.mjs`'s `GROUPS`), plus 9 re-exported
 * from `./pid-hand-drawn.tsx` — 51 symbols in all. Real ISO/DIN geometry
 * INCLUDING ARCS AND CURVES — not the converted SVG library, whose converter
 * dropped every `<arc>` and `<curve>` it ever saw.
 *
 * EACH EXPORT IS A FRAGMENT, NOT A STANDALONE <svg> — a `<g>` already fitted to
 * the 32-unit cell that `pid-symbols.tsx` and `AssetNode.tsx` compose in. Drop
 * one inside a `<svg viewBox="0 0 32 32">` exactly like the hand-drawn set:
 *
 *   <svg viewBox="0 0 32 32" className="h-6 w-6"><GateValve /></svg>
 *
 * Every glyph strokes `currentColor` and fills nothing, so it inherits whatever
 * token the caller sets — the Visual Foundation Spec's requirement, and ISA-5.1's
 * own outline convention. Do NOT set `stroke-width` on the wrapper: each child
 * carries its own, pre-divided by that glyph's scale, and a presentation
 * attribute on the child beats anything inherited from an ancestor.
 *
 * KNOWN LIMITATION: ISA identifies an instrument by the letter code inside its
 * bubble, and stencil `<text>` is deliberately not emitted — a baked letter
 * cannot be themed, translated or re-tagged. 7 of these 42 stencils carry text
 * in source, so plain instrument bubbles are interchangeable circles; render tag
 * letters over them if a reader must tell one from another. 2 group(s) of
 * exports below therefore draw the SAME mark on purpose, each flagged in situ
 * and enumerated in the generator's `EXPECTED_DUPLICATES`. Any collision NOT on
 * that list fails this build — see `assertNoUnintendedDuplicates`.
 */

/**
 * 9 symbol(s) draw.io's stencil source cannot supply, drawn by hand in
 * `./pid-hand-drawn.tsx` and re-exported here so the module's export surface is
 * one set:
 *
 *   GlobeValve — registered as `pid/valves/globe_valve`
 *   UvReactor — registered as `oxot/water/uv_reactor`
 *   BarScreen — registered as `oxot/water/bar_screen`
 *   ChemicalDayTank — registered as `oxot/water/chemical_day_tank`
 *   MeteringPump — registered as `oxot/water/metering_pump`
 *   Clearwell — registered as `oxot/water/clearwell`
 *   CheckValveInline — registered as `oxot/water/check_valve_inline`
 *   Clarifier — registered as `oxot/water/clarifier`
 *   CoagulantMixer — registered as `oxot/water/coagulant_mixer`
 *
 * They honour this file's contract exactly: a `<g>` fragment in the same 32-unit
 * cell, `currentColor`, 1.3 cell stroke weight. See that file for why each one
 * could not be compiled.
 */
import { HAND_DRAWN_PORTS } from "./pid-hand-drawn";
export { GlobeValve, UvReactor, BarScreen, ChemicalDayTank, MeteringPump, Clearwell, CheckValveInline, Clarifier, CoagulantMixer } from "./pid-hand-drawn";

/**
 * 197 connection ports harvested from the stencil XML, in 32-unit cell space,
 * plus the hand-drawn set's own. The SVG conversion discarded every stencil port;
 * they are what lets a router attach a pipe to a pump's suction rather than to
 * the middle of its bounding box.
 */
export const GLYPH_PORTS: Record<string, ReadonlyArray<{ name: string; x: number; y: number }>> = {
  ...HAND_DRAWN_PORTS,
  GateValve: [{ name: "center", x: 16, y: 16 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  BallValve: [{ name: "N", x: 16, y: 11.4878 }, { name: "S", x: 16, y: 20.5122 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  CheckValve: [{ name: "center", x: 16, y: 16 }, { name: "W", x: 5.66, y: 16 }, { name: "E", x: 27, y: 16 }],
  ButterflyValve: [{ name: "N", x: 16, y: 14.8551 }, { name: "S", x: 16, y: 17.1449 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  AngleValve: [{ name: "center", x: 13.36, y: 13.36 }, { name: "S", x: 13.36, y: 27 }, { name: "E", x: 27, y: 13.36 }],
  InstrumentBubble: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  FlowIndicator: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  FlowTransmitter: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  LevelController: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  AnalyzerTransmitter: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  FlowElement: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  Vessel: [],
  ConicalBunker: [{ name: "N", x: 16, y: 5 }, { name: "W", x: 5, y: 7.2 }, { name: "S", x: 16, y: 27 }],
  BarrelDrum: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 9.18, y: 16 }, { name: "E", x: 22.82, y: 16 }],
  CentrifugalPump: [{ name: "N", x: 14.46, y: 5.4714 }, { name: "S", x: 14.46, y: 26.5286 }, { name: "W", x: 5.22, y: 16 }, { name: "E", x: 23.92, y: 16 }, { name: "NW", x: 7.75, y: 8.1036 }, { name: "SW", x: 5, y: 26.5286 }, { name: "NE", x: 27, y: 5.4714 }, { name: "SE", x: 23.81, y: 26.5286 }],
  GearPump: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 9.1099, y: 16 }, { name: "E", x: 22.8901, y: 16 }, { name: "NW", x: 12.0726, y: 7.2 }, { name: "SW", x: 11.8659, y: 27 }, { name: "NE", x: 19.9274, y: 7.2 }, { name: "SE", x: 20.1341, y: 27 }],
  GasCompressor: [{ name: "S", x: 17.1, y: 22.05 }],
  CentrifugalCompressor: [{ name: "N", x: 14.46, y: 5.4714 }, { name: "S", x: 14.46, y: 26.5286 }, { name: "W", x: 5.22, y: 16 }, { name: "E", x: 23.92, y: 16 }, { name: "NW", x: 7.75, y: 8.1036 }, { name: "SW", x: 5, y: 26.5286 }, { name: "NE", x: 27, y: 5.4714 }, { name: "SE", x: 23.81, y: 26.5286 }],
  ReciprocatingCompressor: [{ name: "N", x: 16, y: 14.3837 }, { name: "S", x: 16, y: 20.4898 }, { name: "W", x: 5, y: 17.1224 }, { name: "E", x: 27, y: 17.1224 }, { name: "NW", x: 8.19, y: 11.5102 }, { name: "SW", x: 8.19, y: 20.4898 }, { name: "NE", x: 21.72, y: 14.3837 }, { name: "SE", x: 21.72, y: 20.4898 }],
  HeatExchanger: [{ name: "NW", x: 6.54, y: 12.7 }, { name: "NE", x: 21.5, y: 12.7 }, { name: "SW", x: 10.5, y: 19.3 }, { name: "SE", x: 25.46, y: 19.3 }],
  PlateHeatExchanger: [{ name: "NW", x: 6.54, y: 12.7 }, { name: "NE", x: 25.46, y: 12.7 }, { name: "SW", x: 6.54, y: 19.3 }, { name: "SE", x: 25.46, y: 19.3 }],
  Condenser: [{ name: "N", x: 16, y: 7.728 }, { name: "S", x: 16, y: 24.272 }, { name: "W", x: 7.728, y: 16 }, { name: "E", x: 24.272, y: 16 }, { name: "NW", x: 10.17, y: 10.17 }, { name: "SW", x: 10.17, y: 21.83 }, { name: "NE", x: 21.83, y: 10.17 }, { name: "SE", x: 21.83, y: 21.83 }],
  ElectricHeater: [],
  LiquidFilter: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }],
  GasFilter: [{ name: "N", x: 16, y: 5 }, { name: "W", x: 10.5, y: 16 }, { name: "S", x: 16, y: 27 }],
  CycloneSeparator: [{ name: "N", x: 16, y: 5 }, { name: "W", x: 8.6667, y: 7.2 }, { name: "S", x: 16, y: 27 }],
  GravitySeparator: [{ name: "W", x: 8.6667, y: 7.2 }, { name: "E", x: 23.3333, y: 7.2 }, { name: "S", x: 16, y: 27 }],
  PropellerAgitator: [{ name: "N", x: 16, y: 5 }],
  ImpellerAgitator: [{ name: "N", x: 16, y: 5 }],
  BasketStrainer: [{ name: "W", x: 5, y: 17.089 }, { name: "E", x: 27, y: 17.089 }],
  FlameArrestor: [{ name: "W", x: 10.5, y: 16 }, { name: "E", x: 21.5, y: 16 }],
  CircuitBreaker: [{ name: "W", x: 5, y: 17.76 }, { name: "E", x: 27, y: 17.76 }],
  Fuse: [{ name: "W", x: 5, y: 18.3467 }, { name: "E", x: 27, y: 18.3467 }],
  TwoPositionSwitch: [{ name: "N", x: 16, y: 5.7333 }, { name: "S", x: 16, y: 26.2667 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  ChangeoverContact: [{ name: "W", x: 5, y: 18.9333 }, { name: "NE", x: 27, y: 13.0667 }, { name: "SE", x: 27, y: 18.9333 }],
  ThreeLineBus: [{ name: "NW", x: 5, y: 13.4615 }, { name: "NE", x: 27, y: 13.4615 }, { name: "SE", x: 27, y: 18.5385 }, { name: "SW", x: 5, y: 18.5385 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  CableGroup: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W1", x: 5, y: 8.5539 }, { name: "W2", x: 5, y: 12.2776 }, { name: "W3", x: 5, y: 16 }, { name: "W4", x: 5, y: 19.7224 }, { name: "W5", x: 5, y: 23.4461 }, { name: "E1", x: 27, y: 8.5539 }, { name: "E2", x: 27, y: 12.2776 }, { name: "E3", x: 27, y: 16 }, { name: "E4", x: 27, y: 19.7224 }, { name: "E5", x: 27, y: 23.4461 }],
  OpticalFiber: [{ name: "N", x: 16, y: 9.2308 }, { name: "S", x: 16, y: 22.7692 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }],
  TerminalThreePhase: [{ name: "N", x: 16, y: 13.4615 }, { name: "S", x: 16, y: 18.5385 }, { name: "NW", x: 7.64, y: 13.4615 }, { name: "NE", x: 24.36, y: 13.4615 }, { name: "SW", x: 7.64, y: 18.5385 }, { name: "SE", x: 24.36, y: 18.5385 }],
  BridgeRectifier: [{ name: "+", x: 5, y: 16 }, { name: "-", x: 27, y: 16 }, { name: "out1", x: 16, y: 5 }, { name: "out2", x: 16, y: 27 }],
  Ammeter: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }],
  Voltmeter: [{ name: "N", x: 16, y: 5 }, { name: "S", x: 16, y: 27 }, { name: "W", x: 5, y: 16 }, { name: "E", x: 27, y: 16 }, { name: "NW", x: 8.19, y: 8.19 }, { name: "SW", x: 8.19, y: 23.81 }, { name: "NE", x: 23.81, y: 8.19 }, { name: "SE", x: 23.81, y: 23.81 }]
};

/** draw.io `pid/valves/gate_valve` — 1 subpath(s), fitted to the 32-unit cell. */
export function GateValve() {
  return (
    <g transform="translate(5.000 9.265) scale(0.22449)">
      <path d="M 0 60 L 0 0 L 98 60 L 98 0 Z" fill="none" stroke="currentColor" strokeWidth={5.7909} />
    </g>
  );
}
/** draw.io `pid/valves/ball_valve` — 2 subpath(s), fitted to the 32-unit cell. */
export function BallValve() {
  return (
    <g transform="translate(5.000 9.265) scale(0.22449)">
      <path d="M 0 0 L 31.9 19.7 A 20 20 0 0 1 66.2 19.7 L 98 0 L 98 60 L 66.2 40.5 A 20 20 0 0 1 31.9 40.5 L 0 60 Z" fill="none" stroke="currentColor" strokeWidth={5.7909} />
      <path d="M 31.9 40.5 A 20 20 0 0 1 31.9 19.7 M 66.2 19.7 A 20 20 0 0 1 66.2 40.5" fill="none" stroke="currentColor" strokeWidth={5.7909} />
    </g>
  );
}
/** draw.io `pid/valves/check_valve_1` — 3 subpath(s), fitted to the 32-unit cell. */
export function CheckValve() {
  return (
    <g transform="translate(5.000 9.076) scale(0.22335)">
      <path d="M 3 62 L 3 2 L 98.5 62 L 98.5 2" fill="none" stroke="currentColor" strokeWidth={5.8205} strokeLinejoin="round" />
      <ellipse cx={3} cy={3} rx={3} ry={3} fill="none" stroke="currentColor" strokeWidth={5.8205} strokeLinejoin="round" />
      <path d="M 89.5 50 L 98.5 62 L 84 59.5 L 89.5 56.5 Z" fill="none" stroke="currentColor" strokeWidth={5.8205} strokeLinejoin="round" />
    </g>
  );
}
/** draw.io `pid/valves/butterfly_valve_1` — 2 subpath(s), fitted to the 32-unit cell. */
export function ButterflyValve() {
  return (
    <g transform="translate(5.000 9.265) scale(0.22449)">
      <ellipse cx={49} cy={30} rx={5} ry={5} fill="none" stroke="currentColor" strokeWidth={5.7909} />
      <path d="M 0 60 L 0 0 L 45 27.5 M 53 32.5 L 98 60 L 98 0" fill="none" stroke="currentColor" strokeWidth={5.7909} />
    </g>
  );
}
/** draw.io `pid/valves/angle` — 1 subpath(s), fitted to the 32-unit cell. */
export function AngleValve() {
  return (
    <g transform="translate(5.000 5.000) scale(0.27848)">
      <path d="M 0 79 L 30 30 L 79 0 L 79 60 L 30 30 L 60 79 Z" fill="none" stroke="currentColor" strokeWidth={4.6682} />
    </g>
  );
}
/** draw.io `pid/instruments/level_indicator` — 1 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to FlowIndicator, FlowTransmitter, LevelController, Voltmeter — bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble. */
export function InstrumentBubble() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/instruments/flow_indicator` — 1 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to InstrumentBubble, FlowTransmitter, LevelController, Voltmeter — bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble. */
export function FlowIndicator() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/instruments/flow_transmitter` — 1 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to InstrumentBubble, FlowIndicator, LevelController, Voltmeter — bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble. */
export function FlowTransmitter() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/instruments/level_controller_1` — 1 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to InstrumentBubble, FlowIndicator, FlowTransmitter, Voltmeter — bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble. */
export function LevelController() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/instruments/analyzer_transmitter` — 2 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to FlowElement — ISA-5.1 instrument bubble with the primary-location line — same letter-code caveat as the bare bubble. */
export function AnalyzerTransmitter() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
      <path d="M 0 48 L 96 48" fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/instruments/flow_element` — 2 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to AnalyzerTransmitter — ISA-5.1 instrument bubble with the primary-location line — same letter-code caveat as the bare bubble. */
export function FlowElement() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22917)">
      <ellipse cx={48} cy={48} rx={48} ry={48} fill="none" stroke="currentColor" strokeWidth={5.6727} />
      <path d="M 0 48 L 96 48" fill="none" stroke="currentColor" strokeWidth={5.6727} />
    </g>
  );
}
/** draw.io `pid/vessels/container_tank_cistern` — 1 subpath(s), fitted to the 32-unit cell. */
export function Vessel() {
  return (
    <g transform="translate(5.000 8.300) scale(0.22000)">
      <path d="M 0 0 L 0 70 L 100 70 L 100 0" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/vessels/bunker_conical_bottom` — 1 subpath(s), fitted to the 32-unit cell. */
export function ConicalBunker() {
  return (
    <g transform="translate(5.000 5.000) scale(0.22000)">
      <path d="M 0 0 L 0 70 L 50 100 L 100 70 L 100 0" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/vessels/barrel_drum` — 5 subpath(s), fitted to the 32-unit cell. */
export function BarrelDrum() {
  return (
    <g transform="translate(9.180 5.000) scale(0.22000)">
      <rect x={1} y={0} width={60} height={100} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <rect x={0} y={0} width={62} height={2} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <rect x={0} y={32} width={62} height={2} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <rect x={0} y={66} width={62} height={2} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <rect x={0} y={98} width={62} height={2} fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/pumps/centrifugal_pump_1` — 3 subpath(s), fitted to the 32-unit cell. */
export function CentrifugalPump() {
  return (
    <g transform="translate(5.000 5.471) scale(0.31429)">
      <path d="M 12 54 L 0 67 L 60 67 L 48 54" fill="none" stroke="currentColor" strokeWidth={4.1364} />
      <path d="M 0.6 25 A 30 30 0 0 1 30 0 L 70 0 L 70 20 L 58.45 20 A 30 30 0 1 1 0.6 35" fill="none" stroke="currentColor" strokeWidth={4.1364} />
      <path d="M 21.4 25 A 10 10 0 1 1 21.4 35" fill="none" stroke="currentColor" strokeWidth={4.1364} />
    </g>
  );
}
/** draw.io `pid/pumps/gear_pump` — 5 subpath(s), fitted to the 32-unit cell. */
export function GearPump() {
  return (
    <g transform="translate(9.110 5.000) scale(0.24176)">
      <path d="M 15 82 L 7.5 91 L 49.5 91 L 41.9 82" fill="none" stroke="currentColor" strokeWidth={5.3773} />
      <path d="M 48.5 10 L 48.5 75 A 20 10 0 0 1 8.5 75 L 8.5 10 A 20 10 0 0 1 48.5 10 Z" fill="none" stroke="currentColor" strokeWidth={5.3773} />
      <ellipse cx={28.5} cy={23} rx={16} ry={16} fill="none" stroke="currentColor" strokeWidth={5.3773} />
      <ellipse cx={28.5} cy={60} rx={16} ry={16} fill="none" stroke="currentColor" strokeWidth={5.3773} />
      <path d="M 57 31.5 L 57 51.5 M 48.5 41.5 L 57 41.5 M 0 32 L 0 52 M 0 41.5 L 8.5 41.5" fill="none" stroke="currentColor" strokeWidth={5.3773} />
    </g>
  );
}
/** draw.io `pid/pumps/gas_compressor` — 1 subpath(s), fitted to the 32-unit cell. */
export function GasCompressor() {
  return (
    <g transform="translate(5.000 9.950) scale(0.22000)">
      <path d="M 0 30 L 100 0 L 100 55 L 0 55 Z" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/compressors/centrifugal_compressor` — 2 subpath(s), fitted to the 32-unit cell. */
export function CentrifugalCompressor() {
  return (
    <g transform="translate(5.000 5.471) scale(0.31429)">
      <path d="M 12 54 L 0 67 L 60 67 L 48 54" fill="none" stroke="currentColor" strokeWidth={4.1364} />
      <path d="M 0.6 25 A 30 30 0 0 1 30 0 L 70 0 L 70 20 L 58.45 20 A 30 30 0 1 1 0.6 35" fill="none" stroke="currentColor" strokeWidth={4.1364} />
    </g>
  );
}
/** draw.io `pid/compressors/reciprocating_compressor` — 3 subpath(s), fitted to the 32-unit cell. */
export function ReciprocatingCompressor() {
  return (
    <g transform="translate(5.000 11.510) scale(0.22449)">
      <path d="M 14.5 40 L 14.5 0 L 34.5 0 L 34.5 13 L 74.5 13 L 74.5 40 Z" fill="none" stroke="currentColor" strokeWidth={5.7909} />
      <rect x={0} y={23} width={14} height={4} fill="none" stroke="currentColor" strokeWidth={5.7909} />
      <path d="M 74.5 23 L 87.5 23 L 87.5 21.5 L 98 25 L 87.5 28.5 L 87.5 27 L 74.5 27 Z" fill="none" stroke="currentColor" strokeWidth={5.7909} />
    </g>
  );
}
/** draw.io `pid/heat_exchangers/heat_exchanger_coil_tubes` — 2 subpath(s), fitted to the 32-unit cell. */
export function HeatExchanger() {
  return (
    <g transform="translate(5.000 12.700) scale(0.22000)">
      <rect x={0} y={0} width={100} height={30} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <path d="M 15 0 L 15 30 M 85 0 L 85 30 M 15 15 L 26 15 L 29 7.5 L 35 22.5 L 41 7.5 L 47 22.5 L 53 7.5 L 58 22.5 L 65 7.5 L 71 22.5 L 74 15 L 85 15" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/heat_exchangers/heat_exchanger_plate` — 2 subpath(s), fitted to the 32-unit cell. */
export function PlateHeatExchanger() {
  return (
    <g transform="translate(5.000 12.700) scale(0.22000)">
      <rect x={0} y={0} width={100} height={30} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <path d="M 50 0 L 50 30 M 73 0 L 73.2 30 M 25 0 L 25 30 M 10 0 L 90 30 M 10 30 L 90 0" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `pid/heat_exchangers/condenser` — 2 subpath(s), fitted to the 32-unit cell. */
export function Condenser() {
  return (
    <g transform="translate(5.000 5.000) scale(0.27500)">
      <ellipse cx={40} cy={40} rx={30} ry={30} fill="none" stroke="currentColor" strokeWidth={4.7273} />
      <path d="M 10 40 L 20 40 L 30 25 L 50 55 L 60 40 L 70 40 M 80 0 L 0 80 M 70 4.5 L 80 0 L 75.5 10 L 75 5 Z" fill="none" stroke="currentColor" strokeWidth={4.7273} />
    </g>
  );
}
/** draw.io `pid/heat_exchangers/electric_heater` — 6 subpath(s), fitted to the 32-unit cell. */
export function ElectricHeater() {
  return (
    <g transform="translate(5.000 8.143) scale(0.15714)">
      <rect x={60} y={0} width={80} height={100} fill="none" stroke="currentColor" strokeWidth={8.2727} />
      <rect x={0} y={15} width={40} height={70} fill="none" stroke="currentColor" strokeWidth={8.2727} />
      <rect x={70} y={17.5} width={60} height={15} fill="none" stroke="currentColor" strokeWidth={8.2727} />
      <rect x={70} y={42.5} width={60} height={15} fill="none" stroke="currentColor" strokeWidth={8.2727} />
      <rect x={70} y={67.5} width={60} height={15} fill="none" stroke="currentColor" strokeWidth={8.2727} />
      <path d="M 40 25 L 70 25 M 40 50 L 70 50 M 40 75 L 70 75 M 85 17.5 L 85 32.5 M 100 17.5 L 100 32.5 M 115 17.5 L 115 32.5 M 85 42.5 L 85 57.5 M 100 42.5 L 100 57.5 M 115 42.5 L 115 57.5 M 85 67.5 L 85 82.5 M 100 67.5 L 100 82.5 M 115 67.5 L 115 82.5 M 25 40 L 15 40 L 15 60 L 25 60 M 15 50 L 22 50" fill="none" stroke="currentColor" strokeWidth={8.2727} />
    </g>
  );
}
/** draw.io `pid/filters/liquid_filter` — 2 subpath(s), fitted to the 32-unit cell. */
export function LiquidFilter() {
  return (
    <g transform="translate(10.500 5.000) scale(0.22000)">
      <rect x={0} y={0} width={50} height={100} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <path d="M 0 50 L 50 50" fill="none" stroke="currentColor" strokeWidth={5.9091} strokeDasharray="2 2" />
    </g>
  );
}
/** draw.io `pid/filters/gas_filter` — 2 subpath(s), fitted to the 32-unit cell. */
export function GasFilter() {
  return (
    <g transform="translate(10.500 5.000) scale(0.22000)">
      <rect x={0} y={0} width={50} height={100} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <path d="M 0 20 L 50 20 M 0 70 L 25 99.5 L 50 70" fill="none" stroke="currentColor" strokeWidth={5.9091} strokeDasharray="2 2" />
    </g>
  );
}
/** draw.io `pid/separators/separator_cyclone` — 3 subpath(s), fitted to the 32-unit cell. */
export function CycloneSeparator() {
  return (
    <g transform="translate(8.667 5.000) scale(0.18333)">
      <path d="M 0 0 L 80 0 L 80 80 L 40 120 L 0 80 Z" fill="none" stroke="currentColor" strokeWidth={7.0909} />
      <path d="M 35 15 A 30 15 0 0 1 35 45 A 10 5 0 1 1 35 35.01 A 30 15 0 1 1 35 65" fill="none" stroke="currentColor" strokeWidth={7.0909} />
      <path d="M 35 63 L 35 67 L 30 65 Z" fill="none" stroke="currentColor" strokeWidth={7.0909} />
    </g>
  );
}
/** draw.io `pid/separators/gravity_separator_settling_chamber` — 2 subpath(s), fitted to the 32-unit cell. */
export function GravitySeparator() {
  return (
    <g transform="translate(8.667 5.000) scale(0.18333)">
      <path d="M 0 0 L 80 0 L 80 80 L 40 120 L 0 80 Z M 40 10 L 40 65" fill="none" stroke="currentColor" strokeWidth={7.0909} />
      <path d="M 38 65 L 42 65 L 40 70 Z" fill="none" stroke="currentColor" strokeWidth={7.0909} />
    </g>
  );
}
/** draw.io `pid/agitators/agitator_propeller` — 1 subpath(s), fitted to the 32-unit cell. */
export function PropellerAgitator() {
  return (
    <g transform="translate(8.279 5.000) scale(0.16652)">
      <path d="M 46.37 0 L 46.37 120 M 76.37 110 A 11 11 0 1 1 76.37 130 L 16.37 110 A 11 11 0 1 0 16.37 130 Z" fill="none" stroke="currentColor" strokeWidth={7.8071} />
    </g>
  );
}
/** draw.io `pid/agitators/agitator_impeller` — 1 subpath(s), fitted to the 32-unit cell. */
export function ImpellerAgitator() {
  return (
    <g transform="translate(9.231 5.000) scale(0.16923)">
      <path d="M 40 0 L 40 120 M 0 120 A 25 25 0 0 0 40 120 A 25 25 0 0 1 80 120" fill="none" stroke="currentColor" strokeWidth={7.6818} />
    </g>
  );
}
/** draw.io `pid/piping/basket_strainer` — 1 subpath(s), fitted to the 32-unit cell. */
export function BasketStrainer() {
  return (
    <g transform="translate(5.000 6.100) scale(0.44000)">
      <path d="M 40 0 L 40 30 A 15 15 0 1 1 10 30 L 10 0 Z M 50 15 L 50 35 M 0 15 L 0 35 M 0 25 L 10 25 M 40 25 L 50 25" fill="none" stroke="currentColor" strokeWidth={2.9545} />
    </g>
  );
}
/** draw.io `pid/fittings/flame_arrestor` — 2 subpath(s), fitted to the 32-unit cell. */
export function FlameArrestor() {
  return (
    <g transform="translate(10.500 5.000) scale(0.22000)">
      <rect x={0} y={0} width={50} height={100} fill="none" stroke="currentColor" strokeWidth={5.9091} />
      <path d="M 25 0 L 25 100 M 0 25 L 50 25 M 0 50 L 50 50 M 0 75 L 50 75" fill="none" stroke="currentColor" strokeWidth={5.9091} />
    </g>
  );
}
/** draw.io `electrical/electro-mechanical/circuit_breaker` — 1 subpath(s), fitted to the 32-unit cell. */
export function CircuitBreaker() {
  return (
    <g transform="translate(5.000 13.067) scale(0.29333)">
      <path d="M 60 16 L 75 16 M 56 12 L 64 20 M 64 12 L 56 20 M 0 16 L 18.5 16 L 57 0" fill="none" stroke="currentColor" strokeWidth={4.4318} />
    </g>
  );
}
/** draw.io `electrical/electro-mechanical/fuse` — 2 subpath(s), fitted to the 32-unit cell. */
export function Fuse() {
  return (
    <g transform="translate(5.000 13.653) scale(0.29333)">
      <path d="M 26 9 L 29 15.5 L 45.2 8.8 L 42.2 2.4 Z" fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <path d="M 60 16 L 75 16 M 0 16 L 18.5 16 L 57 0" fill="none" stroke="currentColor" strokeWidth={4.4318} />
    </g>
  );
}
/** draw.io `electrical/electro-mechanical/2_position_switch` — 7 subpath(s), fitted to the 32-unit cell. */
export function TwoPositionSwitch() {
  return (
    <g transform="translate(5.000 5.733) scale(0.29333)">
      <path d="M 0 35 L 15 35 M 60 35 L 75 35 M 37.5 0 L 37.5 12.5 M 37.5 57.5 L 37.5 70 M 33.5 43 L 45.5 31.2 M 29.5 38.8 L 41.5 26.8" fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <ellipse cx={57} cy={35} rx={3} ry={3} fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <ellipse cx={18} cy={35} rx={3} ry={3} fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <ellipse cx={37.5} cy={15.5} rx={3} ry={3} fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <ellipse cx={37.5} cy={54.5} rx={3} ry={3} fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <path d="M 18 35 A 19.5 19.5 0 0 1 37.5 54.5 M 37.5 15.5 A 19.5 19.5 0 0 0 57 35 M 47.5 10 A 15 15 0 0 1 62.5 25" fill="none" stroke="currentColor" strokeWidth={4.4318} />
      <path d="M 47.5 7 L 42 10 L 47.5 13 Z M 59.5 25 L 65.5 25 L 62.5 30.5 Z" fill="none" stroke="currentColor" strokeWidth={4.4318} />
    </g>
  );
}
/** draw.io `electrical/electro-mechanical/changeover_contact` — 1 subpath(s), fitted to the 32-unit cell. */
export function ChangeoverContact() {
  return (
    <g transform="translate(5.000 13.067) scale(0.29333)">
      <path d="M 60 20 L 75 20 M 0 20 L 18.5 20 L 57 4 M 75 0 L 50 0 L 50 10" fill="none" stroke="currentColor" strokeWidth={4.4318} />
    </g>
  );
}
/** draw.io `electrical/transmission/3_line_bus` — 1 subpath(s), fitted to the 32-unit cell. */
export function ThreeLineBus() {
  return (
    <g transform="translate(5.000 13.462) scale(0.16923)">
      <path d="M 0 0 L 130 0 M 0 30 L 130 30 M 0 15 L 130 15" fill="none" stroke="currentColor" strokeWidth={7.6818} />
    </g>
  );
}
/** draw.io `electrical/transmission/cable_group` — 2 subpath(s), fitted to the 32-unit cell. */
export function CableGroup() {
  return (
    <g transform="translate(5.000 5.000) scale(0.16923)">
      <path d="M 50 15 A 15 15 0 0 1 65 0 A 15 15 0 0 1 80 15 L 80 115 A 15 15 0 0 1 65 130 A 15 15 0 0 1 50 115 Z" fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <path d="M 0 21 L 50 21 M 0 43 L 50 43 M 0 65 L 50 65 M 0 87 L 50 87 M 0 109 L 50 109 M 80 21 L 130 21 M 80 43 L 130 43 M 80 65 L 130 65 M 80 87 L 130 87 M 80 109 L 130 109" fill="none" stroke="currentColor" strokeWidth={7.6818} />
    </g>
  );
}
/** draw.io `electrical/transmission/optical_fiber` — 4 subpath(s), fitted to the 32-unit cell. */
export function OpticalFiber() {
  return (
    <g transform="translate(5.000 9.231) scale(0.16923)">
      <path d="M 0 40 L 25 40 M 105 40 L 130 40" fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <ellipse cx={65} cy={40} rx={40} ry={40} fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <path d="M 35 50 L 65 20 M 55 68.88 L 85 38.88" fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <path d="M 59.5 15.5 L 76 9 L 70 25 Z M 79.5 34.38 L 96 27.88 L 90 43.88 Z" fill="none" stroke="currentColor" strokeWidth={7.6818} />
    </g>
  );
}
/** draw.io `electrical/transmission/terminal_3_phase` — 3 subpath(s), fitted to the 32-unit cell. */
export function TerminalThreePhase() {
  return (
    <g transform="translate(5.000 13.462) scale(0.16923)">
      <ellipse cx={15} cy={15} rx={15} ry={15} fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <ellipse cx={65} cy={15} rx={15} ry={15} fill="none" stroke="currentColor" strokeWidth={7.6818} />
      <ellipse cx={115} cy={15} rx={15} ry={15} fill="none" stroke="currentColor" strokeWidth={7.6818} />
    </g>
  );
}
/** draw.io `electrical/power_semiconductors/bridge_rectifier_1` — 2 subpath(s), fitted to the 32-unit cell. */
export function BridgeRectifier() {
  return (
    <g transform="translate(5.000 5.000) scale(0.24444)">
      <path d="M 45 0 L 90 45 L 45 90 L 0 45 Z" fill="none" stroke="currentColor" strokeWidth={5.3182} />
      <path d="M 40 10 A 3 3 0 0 1 45 10 A 3 3 0 0 0 50 10 M 40 80 A 3 3 0 0 1 45 80 A 3 3 0 0 0 50 80 M 7 45 L 13 45 M 10 42 L 10 48 M 83 45 L 77 45" fill="none" stroke="currentColor" strokeWidth={5.3182} />
    </g>
  );
}
/** draw.io `electrical/instruments/ampermeter` — 3 subpath(s), fitted to the 32-unit cell. */
export function Ammeter() {
  return (
    <g transform="translate(5.000 5.000) scale(0.24444)">
      <ellipse cx={45} cy={45} rx={45} ry={45} fill="none" stroke="currentColor" strokeWidth={5.3182} />
      <path d="M 25 75 L 65 15" fill="none" stroke="currentColor" strokeWidth={5.3182} />
      <path d="M 52 25 L 65 15 L 61.5 30.5 Z" fill="none" stroke="currentColor" strokeWidth={5.3182} />
    </g>
  );
}
/** draw.io `electrical/instruments/voltmeter` — 1 subpath(s), fitted to the 32-unit cell.
 *  IDENTICAL MARK to InstrumentBubble, FlowIndicator, FlowTransmitter, LevelController — bare instrument circle — ISA-5.1/IEC 60617 identity is the letter code inside it, which stencil <text> cannot carry; overlay a tag, or use InstrumentBubble from ./instrument-bubble. */
export function Voltmeter() {
  return (
    <g transform="translate(5.000 5.000) scale(0.24444)">
      <ellipse cx={45} cy={45} rx={45} ry={45} fill="none" stroke="currentColor" strokeWidth={5.3182} />
    </g>
  );
}
