import { createElement, forwardRef } from "react";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { same } from "@/components/industries/registry";
import { Vessel } from "./pid-symbols";
import * as Cset from "./cset-glyphs";
import * as Water from "./pid-hand-drawn";
import * as Electrical from "./electrical-hand-drawn";
import * as ElectricalInstruments from "./electrical-instruments-hand-drawn";
import * as ElectricalMachines from "./electrical-machines-hand-drawn";
import * as Thermal from "./thermal-hand-drawn";
import {
  BUBBLE_CELL,
  InstrumentBubbleGlyph,
  type InstrumentDevice,
  type InstrumentLocation
} from "./instrument-bubble";
import type { SystemAsset, SystemAssetType, AssetCriticality } from "./types";

/**
 * NINE ASSET TYPES, NINE SILHOUETTES.
 *
 * `docs/OXOT-DIAGRAMMING-SPEC.md` §3 assigns colour to `SystemPath.status` on
 * `PathEdge`, not to asset type — so `AssetNode` never reaches for colour to
 * tell types apart. A generic rounded rect with nine different fills is
 * exactly the "random node graph" the mapping table forbids: it reads as
 * decoration, and it is invisible to a colour-blind viewer or a screen reader.
 * Shape is the only channel doing that job here, drawn in a P&ID-adjacent
 * vocabulary (vessel, instrument bubble, control valve) matching the notation
 * `PidGlyph` already established in ./platform/how-it-works/view-glyphs.tsx —
 * not a Lucide-style rounded icon pack, per the Foundation Spec's guardrail
 * against "one accent color for all controls, panels, icons, warnings."
 *
 * SOURCING. Every glyph here is derived from a real published symbol set, with
 * one flagged exception. An earlier revision of this file recorded that eight
 * of the nine "stay hand-drawn on purpose, not by omission", because draw.io's
 * process-engineering stencils have no correspondent for IT/OT hardware
 * classes. That premise was right; the conclusion drawn from it was not —
 * draw.io is not the only source. Two others were checked directly:
 *
 *   Equinor `engineering-symbols` (github.com/equinor/engineering-symbols,
 *   MIT, Copyright (c) 2020 Equinor ASA) — INSPECTED, NOT USED. Read in full:
 *   55 symbols, every one a process/piping family (PP
 *   pumps, PV valves, PT tanks, IM/ND instruments, PA/PD/PS/LZ/STPL), and the
 *   published metadata carries no human-readable name for any of them
 *   (`description: "None"` on every record). Zero IT/OT hardware. It confirms
 *   the old comment's premise about process stencils, and supplies nothing the
 *   eight IT/OT glyphs need.
 *
 *   Siemens Industrial Experience icons (`@iconify-json/ix`, 1,490 icons; MIT
 *   License, Copyright (c) 2022 Siemens AG — github.com/siemens/ix-icons) — an
 *   industrial-automation set rather than a process-engineering one, and it
 *   does carry exact correspondents for the classes draw.io lacks. It is a
 *   devDependency only: path geometry is read out of it here, at authoring
 *   time, and the package never reaches the browser. Six icons are used, each
 *   named in the glyph that derives from it. MIT permits the extraction,
 *   modification and commercial use done here without restriction; its one
 *   condition is that the copyright and permission notice travel with copies
 *   or substantial portions, which this notice discharges — the same
 *   source-comment convention ./pid-symbols.tsx uses for draw.io's Apache-2.0
 *   stencils.
 *
 * WHY THE iX GLYPHS ARE REDRAWN, NOT DROPPED IN. iX icons are solid-fill on a
 * 512x512 grid; this file's vocabulary — shared with view-glyphs.tsx and the
 * topology diagram — is stroke-only on a 32x32 grid. Pasting a 512 solid path
 * in would sit a filled icon next to seven stroked ones and break the shared
 * language. So each was converted the way ./pid-symbols.tsx documents for
 * draw.io: read the source geometry, fit its content box into this file's
 * 22-unit live area (x/y 5..27, the box `Vessel` already occupies), and re-lay
 * it as MUTED strokes. Where the source encodes what is really a stroke as the
 * fill BETWEEN two outlines, the redraw takes that band's centreline. Details
 * finer than ~2 units are dropped, exactly as pid-symbols.tsx drops the
 * stencils' "LI"/"PI" text tags — below icon scale they are noise, not
 * information.
 *
 * iX's grid is mixed: 1,351 icons are 512x512 and 139 are 24x24, and every
 * `*-safety` variant except `helmet-safety` sits in the 24x24 group. Each icon
 * used below was checked individually and is 512x512; no `*-safety` icon is
 * used.
 *
 * TWO GLYPHS ARE NOT iX-SOURCED. `process-equipment` keeps draw.io's
 * "Container, Tank, Cistern" stencil (./pid-symbols.tsx, and see its own
 * comment below for why Equinor's tanks lost the comparison).
 * `safety-function` stays hand-drawn — unresolved rather than settled, see its
 * own comment below.
 *
 * The component contract (props, ARIA, criticality marking) does not change
 * with how a glyph is sourced.
 */

const MUTED = "hsl(var(--muted-foreground))";
const ACCENT_INK = "hsl(var(--primary-ink))";
const CARD = "hsl(var(--card))";

/** Same measurement-forced token choice as view-glyphs.tsx: --border is a
 * hairline and cannot carry a shape at 3:1, --primary is a fill orange that
 * fails at small sizes, so every stroke here is MUTED or ACCENT_INK. */
const STROKE = 1.5;

export const TYPE_LABEL: Record<SystemAssetType, ReturnType<typeof same>> = {
  "process-equipment": same("Process equipment"),
  "field-device": same("Field device"),
  controller: same("Controller"),
  hmi: same("HMI"),
  "engineering-workstation": same("Engineering workstation"),
  "network-device": same("Network device"),
  "remote-access": same("Remote access"),
  "safety-function": same("Safety function"),
  service: same("Service")
};

/**
 * Each glyph draws inside a 32×32 unit cell, stroke-only where a fill isn't
 * load-bearing, so it composes cleanly as a `<g>` inside a parent canvas
 * (`TwinExplorer`) rather than owning its own `<svg>`/viewBox the way the
 * larger illustrative notations in view-glyphs.tsx do.
 */
/**
 * draw.io's "Container, Tank, Cistern" stencil, converted per
 * docs/OXOT-DIAGRAMMING-SPEC.md §2.1 — see ./pid-symbols.tsx. Kept over
 * Equinor's tank symbols after comparing them directly: PT002A is a
 * dished-head pressure vessel and PT005A/PT006A are cone-roof silos, while
 * every asset this draws is an atmospheric, vented chemical dosing tank (see
 * the water-wastewater content modules). The open-top cistern is the correct
 * equipment class for that, so switching would trade a right symbol for a
 * wrong one with worse provenance — Equinor ships no name or description for
 * any of its 55 symbols, draw.io names this one.
 */
function ProcessEquipmentGlyph() {
  /* THE TOKEN IS STATED HERE, not inside the symbol. `Vessel` now comes from the
     generated stencil set and strokes `currentColor`, so it paints whatever
     `color` it inherits. Every sibling glyph in this file strokes MUTED
     explicitly, so this wrapper says MUTED too and the nine stay one vocabulary.
     Weight belongs to the generator — do not set stroke-width here; inside the
     stencil's scaled `<g>` it would be read in local units, not the 32-cell's. */
  return (
    <g className="text-muted-foreground">
      <Vessel />
    </g>
  );
}

function FieldDeviceGlyph() {
  // Siemens iX `sensor`, redrawn. The ISA instrument bubble the old hand-drawn
  // version aimed at, but with the measurement trace the ISA circle-plus-bar
  // only implies. Source is a full circle whose signal line is the fill band
  // between two waveform outlines; the band's centreline is what's stroked
  // here, and the circle is fitted to the same 22-unit box as `Vessel`.
  return (
    <>
      <circle cx={16} cy={16} r={11} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <path
        d="M7.3,16 H11.6 L13.8,11.6 L18.2,20.4 L20.4,16 H24.7"
        fill="none"
        stroke={MUTED}
        strokeWidth={1.25}
      />
    </>
  );
}

function ControllerGlyph() {
  // Siemens iX `controller-device`, redrawn: a portrait control module with a
  // faceplate window and a single status LED. Chosen over iX `plc` and
  // `plc-device`, both of which were drawn and looked at — `plc`'s four-LED
  // diamond reads as a games-console D-pad at this size, and `plc-device`'s
  // three card slots collapse into hatching at 32px.
  return (
    <>
      <rect x={8.3} y={5} width={15.4} height={22} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={11.6} y={8.3} width={8.8} height={9.9} fill="none" stroke={MUTED} strokeWidth={1} />
      <rect x={14.9} y={20.4} width={2.2} height={2.2} fill={MUTED} />
    </>
  );
}

function HmiGlyph() {
  // Siemens iX `panel-ipc`, redrawn — a panel-mounted industrial HMI, which is
  // what an OT operator interface actually is, rather than the desk monitor on
  // a stand this used to draw. Landscape bezel plus screen; the source's small
  // branding plate on the bezel is below icon scale and is dropped. The screen
  // inset is opened from the source's 2.2 units to 3.0 so the two strokes stay
  // separate at 32px.
  return (
    <>
      <rect x={5} y={8.3} width={22} height={15.4} rx={1.5} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={8} y={11.5} width={16} height={9} fill="none" stroke={MUTED} strokeWidth={1} />
    </>
  );
}

function EngineeringWorkstationGlyph() {
  // Siemens iX `screen-pc-tower`, redrawn: monitor on a pedestal plus a tower
  // with two drive bays. The tower is the element that separates this from
  // HmiGlyph's panel — a general-purpose PC, not a fixed operator panel. The
  // tower is drawn after the monitor and filled CARD so it occludes the
  // monitor's right edge, which is how the source composes the two.
  return (
    <>
      <rect x={5} y={6.65} width={16.5} height={12.1} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <line x1={13.25} y1={18.75} x2={13.25} y2={22.05} stroke={MUTED} strokeWidth={1.25} />
      <line x1={10.5} y1={22.05} x2={16} y2={22.05} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={18.2} y={11.05} width={8.8} height={14.3} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={20.4} y={13.25} width={4.4} height={2.2} fill="none" stroke={MUTED} strokeWidth={1} />
      <rect x={20.4} y={16.55} width={4.4} height={6.6} fill="none" stroke={MUTED} strokeWidth={1} />
    </>
  );
}

function NetworkDeviceGlyph() {
  // Siemens iX `network-wired`, redrawn: an uplink device, a trunk, and two
  // attached devices — a topology, not a box. Chosen over iX `network-device`,
  // which was drawn and rejected: a single chassis with a stem down to a
  // horizontal bar reads as a monitor on a stand at stroke weight, colliding
  // with HmiGlyph. The source's inner faceplate rects are ~2 units and dropped.
  return (
    <>
      <rect x={11.6} y={5} width={8.8} height={6.6} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <line x1={16} y1={11.6} x2={16} y2={18.2} stroke={MUTED} strokeWidth={1.25} />
      <line x1={5} y1={18.2} x2={27} y2={18.2} stroke={MUTED} strokeWidth={STROKE} />
      <line x1={10.5} y1={18.2} x2={10.5} y2={20.4} stroke={MUTED} strokeWidth={1.25} />
      <line x1={22.6} y1={18.2} x2={22.6} y2={20.4} stroke={MUTED} strokeWidth={1.25} />
      <rect x={5} y={20.4} width={8.8} height={6.6} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={18.2} y={20.4} width={8.8} height={6.6} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
    </>
  );
}

function RemoteAccessGlyph() {
  // Siemens iX `remote-access`, redrawn: two overlapping screens with an
  // outbound arrow — one session driving another, which is what a vendor
  // support connection is. The near screen is filled CARD so it occludes the
  // far one, as in the source. The source's inner screen rect and its elbowed
  // connector are dropped: both fall under ~2 units and turn to mush at 32px,
  // and the arrow alone already carries the "outbound" reading.
  return (
    <>
      <rect x={5} y={6.65} width={13.2} height={9.9} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <rect x={13.8} y={14.35} width={13.2} height={9.9} rx={1} fill={CARD} stroke={MUTED} strokeWidth={STROKE} />
      <path
        d="M22.6,13.2 L26.4,9.4 M26.4,9.4 H23.3 M26.4,9.4 V12.5"
        fill="none"
        stroke={MUTED}
        strokeWidth={1.25}
      />
    </>
  );
}

function SafetyFunctionGlyph() {
  // STILL HAND-DRAWN, AND FLAGGED — not settled. Every other glyph in this
  // file was re-sourced; this one could not be, cleanly. iX's natural
  // correspondent is `emergency-stop`, and it is literally a stop-sign
  // silhouette, which the rule below explicitly forbids. Resolving that means
  // either overturning the rule or accepting a weaker match, and neither is
  // this file's call to make unilaterally. Raised for a human decision; until
  // then the existing geometry stands unchanged.
  //
  // An octagon — the one glyph deliberately given a different silhouette
  // family from every other type (all rects/circles), per the spec's
  // requirement that safety-function assets be unmistakable. No shield, no
  // literal stop sign — a plain geometric octagon with an internal bar.
  const r = 11;
  const cx = 16;
  const cy = 16;
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <>
      <polygon points={pts} fill={CARD} stroke={ACCENT_INK} strokeWidth={STROKE} />
      <line x1={16} y1={10} x2={16} y2={22} stroke={ACCENT_INK} strokeWidth={2} />
    </>
  );
}

function ServiceGlyph() {
  // Siemens iX `applications`, redrawn: four tiles, i.e. a tier of software
  // systems rather than one machine. That matches what this type actually
  // holds on every page that uses it — "Historian, alongside alarm-management,
  // CMMS/EAM and laboratory information systems" — better than iX `cloud` or
  // `database`, which would each name one system and mis-scope the other
  // three. Each tile is the centreline of the source's filled border band, so
  // the tiles sit 5.5 units apart rather than the 2.4 the raw outlines give.
  return (
    <>
      {[
        [5, 5],
        [18.75, 5],
        [5, 18.75],
        [18.75, 18.75]
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={8.25}
          height={8.25}
          rx={0.75}
          fill={CARD}
          stroke={MUTED}
          strokeWidth={STROKE}
        />
      ))}
    </>
  );
}

/** Exported so components outside the Twin canvas (e.g. `AssetClassBento`)
 *  can render the same 9 real glyphs standalone, each inside its own
 *  `<svg viewBox="0 0 32 32">` — these fragments were authored to compose as
 *  a `<g>` inside a parent canvas, so a standalone consumer supplies the
 *  `<svg>` wrapper itself; the glyphs are the single source of truth either
 *  way, not redrawn per consumer. */
export const ASSET_GLYPHS: Record<SystemAssetType, () => React.JSX.Element> = {
  "process-equipment": ProcessEquipmentGlyph,
  "field-device": FieldDeviceGlyph,
  controller: ControllerGlyph,
  hmi: HmiGlyph,
  "engineering-workstation": EngineeringWorkstationGlyph,
  "network-device": NetworkDeviceGlyph,
  "remote-access": RemoteAccessGlyph,
  "safety-function": SafetyFunctionGlyph,
  service: ServiceGlyph
};

/**
 * Non-colour criticality marker, per docs/OXOT-DIAGRAMMING-SPEC.md §3.
 * `context` renders nothing. `important` is a hollow chevron; `critical` is
 * the same chevron filled solid — solid-vs-hollow again, not opacity, for the
 * same WCAG 1.4.11 reason PurdueGlyph documents in view-glyphs.tsx.
 */
export function CriticalityMark({ tier }: { tier: AssetCriticality }) {
  if (tier === "context") return null;
  const filled = tier === "critical";
  return (
    <path
      d="M25,4 L29,4 L29,8 L26.5,5.5 z"
      fill={filled ? ACCENT_INK : CARD}
      stroke={ACCENT_INK}
      strokeWidth={1.25}
      strokeLinejoin="round"
    />
  );
}

/** Every glyph draws inside this fixed cell — `TwinExplorer` needs it to center a node within ELK's (larger, padded) allocated footprint. */
export const ASSET_NODE_SIZE = 32;

/* ═══ SystemAsset.symbol — THE PER-ASSET OVERRIDE ══════════════════════════
 *
 * WHAT THIS FIXES, stated as the two false claims the nine silhouettes make on
 * a real dosing drawing:
 *
 *   · "Chemical metering pump and VFD" and "Sodium-hypochlorite dosing skid"
 *     are both `process-equipment`, so both drew the SAME open-topped cistern.
 *     A metering pump drawn as an open tank is not imprecise, it is wrong.
 *   · "Incoming-flow meter", "Chlorine-residual analyser" and "Chemical-tank
 *     level transmitter" are all `field-device`, so all three drew the SAME
 *     circle-plus-waveform. Three instrument loops, one mark, no tag letters.
 *
 * `ASSET_GLYPHS` is not at fault: it answers "what class of thing is this",
 * and nine silhouettes is the correct resolution for that question. So the
 * type table is untouched, and `symbol` sits BESIDE it — absent, an asset
 * draws exactly what it drew before, which is why adding this regressed no
 * consumer.
 *
 * WHY THIS RESOLVER AND NOT `../diagrams/types.ts::resolveSymbol`, which
 * already resolves every slug below. That function's third path falls through
 * to `drawio-manifest.ts` — 462,361 bytes of source. The diagram subsystem can
 * afford it because every module there is a server component and the manifest
 * never reaches the browser. THESE consumers cannot: `AssetClassBento` is a
 * server component but the worked-example canvases that share this file are
 * `"use client"`, so importing `resolveSymbol` here would put a half-megabyte
 * stencil table into the client bundle of a marketing page. The curated
 * modules are therefore imported DIRECTLY, and this file must never import
 * `../diagrams/types` or `./drawio-glyph`.
 *
 * THE TABLE IS THE USED SET, NOT THE PUBLISHED SET, deliberately. `cset-glyphs`
 * publishes 45 marks and `pid-hand-drawn` nine; enumerating all 54 here would
 * pin every one of them into the client bundle to serve the nine an asset
 * inventory actually names. Extending it is one line, and an unregistered slug
 * warns (see `assetGlyph`) instead of degrading in silence.
 */
type GlyphFragment = () => React.JSX.Element;

const CURATED_SYMBOLS: Record<string, GlyphFragment> = {
  /* `oxot/…` — marks ISA-5.1 and ISO 10628 publish no stencil for, drawn in
     ./pid-hand-drawn.tsx to those standards' own conventions. */
  "oxot/water/metering_pump": Water.MeteringPump,
  "oxot/water/chemical_day_tank": Water.ChemicalDayTank,
  /* `cset/…` — CISA/INL's CSET asset taxonomy, drawn as line art in
     ./cset-glyphs.tsx. See that file's MIT attribution block. */
  "cset/plc": Cset.Plc,
  "cset/hmi": Cset.Hmi,
  "cset/ews": Cset.EngineeringWorkstation,
  "cset/firewall": Cset.Firewall,
  "cset/remote-access-server": Cset.RemoteAccessServer,
  "cset/mtu": Cset.Mtu,
  "cset/historian": Cset.Historian,
  /* ADDED 2026-08-29. Every one closes a measured COLLISION — two assets of
     different meaning drawing one silhouette — found by four agents applying
     the library decision procedure to the published industry pages
     independently. This table is the client bundle's USED set, so each entry
     has a real cost and none of these is speculative inventory.

       cset/rtu     energy: "RTUs and IEDs" and "Field automation" were one
                    circle-plus-waveform, separated only by the criticality
                    chevron, which means something else entirely.
       cset/dcs     energy: a distributed control system drawn as the generic
                    controller it sits beside.
       cset/server  manufacturing: MES and domain/file services each drew
                    ServiceGlyph's "tier of software systems" tiles for one
                    named system.
       cset/clock   rail: time distribution, indistinguishable from the
                    monitoring node next to it.
       cset/siem    rail: "event correlation and security monitoring" is
                    literally a SIEM.
       cset/building-automation
                    defense: CSET's own taxonomy term for a BMS/EPMS head-end. */
  "cset/rtu": Cset.Rtu,
  "cset/dcs": Cset.Dcs,
  "cset/server": Cset.Server,
  "cset/clock": Cset.Clock,
  "cset/siem": Cset.Siem,
  "cset/building-automation": Cset.BuildingAutomation,
  /* IEC 60617 marks. The measuring relay's `I>` rectangle serves the
     protection relay three energy sections draw as a generic octagon that
     this file itself flags as "unresolved rather than settled". The
     transformer replaces an open-topped water cistern standing in for rail
     traction-power plant — the same false mark as the metering-pump-as-tank
     this whole effort started from. */
  "oxot/electrical/measuring_relay": ElectricalInstruments.MeasuringRelay,
  "oxot/electrical/transformer": Electrical.Transformer,
  /* Drawn 2026-08-29 to ISO 10628-2, measured off the standard's own sheet,
     because three records across two sectors were rendering plant as an
     open-topped WATER CISTERN — the same false mark as the metering pump this
     effort began with. `generator` closes energy's generating unit,
     `cooling_tower` hyperscale's chiller plant, `ventilation_fan` rail's
     station ventilation. */
  "oxot/electrical/generator": ElectricalMachines.Generator,
  "oxot/thermal/cooling_tower": Thermal.CoolingTowerInducedDraught,
  "oxot/thermal/ventilation_fan": Thermal.VentilationFan
};

/**
 * The `isa/` instrument grammar, matched rather than looked up — the same
 * production `../diagrams/types.ts` documents at length, because `FT-101` and
 * `AIT-601` are ONE component with different arguments and a fixed table would
 * grow with the content instead of with the library.
 *
 *   isa/<device>/<location>/<2-5 UPPERCASE ISA LETTERS>[-<loop>]
 *
 * `local-panel-rear` precedes `local-panel` for the same first-match reason it
 * does there: listed the other way, the shorter branch wins and leaves
 * `-rear/` to fail against the tag group.
 */
const ISA_SLUG =
  /^isa\/(discrete|shared|computer|plc|sis)\/(field|panel|rear|local-panel-rear|local-panel)\/([A-Z]{2,5})(?:-([A-Za-z0-9]{1,6}))?$/;

/**
 * THE BUBBLE IS FITTED BY ITS OUTLINE, NOT BY ITS CELL, and the difference is
 * whether the tag letters survive.
 *
 * `instrument-bubble.tsx` draws in a 44-unit cell whose circle spans 34 (INSET
 * 5 either side), and states a 44-RENDERED-PIXEL floor below which the letters
 * — the only thing telling one bubble from another — stop being readable.
 * Measured on this page at 1440: an S03 card icon renders 32 css px and an S07
 * canvas glyph box 27.1 (900-unit viewBox at 1110 px = 1.2333). Both are under
 * that floor, so scaling the whole 44-unit cell into the 32-unit one — which
 * is what the diagram subsystem does, where cells are far larger — would take
 * an 11-unit tag to 8 units and hand back the interchangeable circle this
 * whole change exists to remove.
 *
 * So the OUTLINE is fitted instead: 34 → 28 of the 32-unit cell, and the whole
 * 44-unit cell lands at 36.24 with a negative inset. Nothing is clipped by
 * that overhang, because for the `discrete`/`field` instruments an asset
 * inventory names, the circle IS the entire mark — `Outline` draws only the
 * circle and `LocationLine` draws nothing for `field`. Two numbers fall out
 * and both are wanted: the 1.5 stroke becomes 1.24, near the 1.3 every glyph
 * in ./cset-glyphs.tsx uses, and the tag reaches 9.06 cell units against the
 * 8.0 a whole-cell fit would give — 21% of the letter height back.
 *
 * 28 RATHER THAN THE LARGEST THAT FITS, because `CriticalityMark` occupies
 * x 25..29, y 4..8 of the same cell. Its nearest corner is 14.8 units from the
 * centre, so an outline at half-span 15 or more would have the chevron sitting
 * well inside the bubble's rim; at 14 it only grazes it.
 */
const ISA_OUTLINE_SPAN = 34;
const ISA_TARGET_SPAN = 28;
const ISA_SCALE = ISA_TARGET_SPAN / ISA_OUTLINE_SPAN;
const ISA_INSET = (ASSET_NODE_SIZE - BUBBLE_CELL * ISA_SCALE) / 2;

/**
 * COLOUR IS SET HERE AND WEIGHT IS NOT, the same split `ProcessEquipmentGlyph`
 * documents above. Every curated mark strokes `currentColor` and fills nothing,
 * so this wrapper names the token and the nine type silhouettes' MUTED ink
 * stays one vocabulary across both sets. Stroke weight belongs to the glyph:
 * these are literal cell-unit widths on each path, and a caller overriding one
 * from outside would be writing in the wrong coordinate space.
 */
function inMutedInk(slug: string, body: React.JSX.Element): GlyphFragment {
  const Wrapped = () => <g className="text-muted-foreground">{body}</g>;
  Wrapped.displayName = `AssetSymbol(${slug})`;
  return Wrapped;
}

function buildSymbol(slug: string): GlyphFragment | undefined {
  const curated = CURATED_SYMBOLS[slug];
  if (curated) {
    const Curated = curated;
    return inMutedInk(slug, <Curated />);
  }
  const m = ISA_SLUG.exec(slug);
  if (!m) return undefined;
  const [, device, location, letters, loop] = m;
  return inMutedInk(
    slug,
    <g transform={`translate(${ISA_INSET.toFixed(4)} ${ISA_INSET.toFixed(4)}) scale(${ISA_SCALE.toFixed(5)})`}>
      <InstrumentBubbleGlyph
        tag={letters}
        loop={loop}
        device={device as InstrumentDevice}
        location={location as InstrumentLocation}
      />
    </g>
  );
}

/** Memoised per slug, so one slug is always the SAME component: React remounts
 *  a subtree whose element type changed identity, and a canvas that remounts
 *  its instruments on every render is a reconciliation bug in waiting. */
const symbolCache = new Map<string, GlyphFragment>();
const warnedSlugs = new Set<string>();

/**
 * The component an asset draws with: its `symbol` override if it names one this
 * resolver can build, otherwise its type silhouette.
 *
 * AN UNRESOLVABLE SLUG FALLS BACK **AND SAYS SO**. The diagram subsystem throws
 * for one, which is right there — a gallery route exists to render symbols, so a
 * missing one is a broken page. Here the symbol is an improvement on a silhouette
 * that is already correct at type resolution, and taking down an industry page
 * over it would be the wrong trade. Silence would be worse than either: it is
 * how a typo'd slug ships as "the generic icon is back and nobody knows why".
 */
function resolveAssetGlyph(asset: SystemAsset): GlyphFragment {
  const slug = asset.symbol;
  if (!slug) return ASSET_GLYPHS[asset.type];
  const cached = symbolCache.get(slug);
  if (cached) return cached;
  const built = buildSymbol(slug);
  if (!built) {
    if (!warnedSlugs.has(slug)) {
      warnedSlugs.add(slug);
      console.warn(
        `[AssetNode] asset "${asset.id}" names symbol "${slug}", which is not in ` +
          `CURATED_SYMBOLS and does not match the isa/ grammar. Falling back to the ` +
          `"${asset.type}" silhouette. Add the slug to CURATED_SYMBOLS in AssetNode.tsx ` +
          `(importing from ./cset-glyphs, ./pid-hand-drawn or ./ot-notation — never from ` +
          `../diagrams/types, which pulls the 462 KB stencil manifest into the client bundle).`
      );
    }
    return ASSET_GLYPHS[asset.type];
  }
  symbolCache.set(slug, built);
  return built;
}

/**
 * An asset's glyph AS A RENDERED FRAGMENT — `{assetGlyph(asset)}`, never
 * `const G = assetGlyph(asset); <G />`.
 *
 * THE ELEMENT, NOT THE COMPONENT, AND THE LINTER IS RIGHT TO INSIST. React
 * Compiler's `react-hooks/static-components` rejects binding a component to a
 * local from a CALL, because in general a call returns a fresh component every
 * render and React remounts the whole subtree when an element's type identity
 * changes. `ASSET_GLYPHS[asset.type]` was exempt only because a member
 * expression on a module constant is visibly stable; a resolver is not, on
 * inspection. `symbolCache` does make it stable — one slug is always one
 * component — but that is a runtime guarantee the rule cannot see, and
 * suppressing the rule to assert it would leave the next reader with a comment
 * where they wanted a check. Returning the element keeps the caching, keeps
 * type identity stable, and leaves nothing to suppress.
 */
export function assetGlyph(asset: SystemAsset): React.JSX.Element {
  return createElement(resolveAssetGlyph(asset));
}

export interface AssetNodeProps {
  asset: SystemAsset;
  locale: Locale;
  /** Position within the parent canvas, in the parent's own coordinate space (typically ELK's computed layout). */
  x?: number;
  y?: number;
  /** Scales the glyph's 32×32 native cell; defaults to 1 (32×32 rendered). */
  scale?: number;
  /** Roving-tabindex slot: -1 unless this node currently owns focus within the parent `TwinExplorer`. */
  tabIndex?: number;
  /** Roving-tabindex needs both a DOM node to move real focus to and a keydown handler to move it — both owned and driven by the parent, this component just exposes the hooks. */
  onFocus?: React.FocusEventHandler<SVGGElement>;
  onKeyDown?: React.KeyboardEventHandler<SVGGElement>;
}

/**
 * A single asset in a Twin diagram, rendered as a `<g>` so it composes inside
 * a parent canvas rather than owning its own `<svg>`. Renders one of the nine
 * glyphs above by `asset.type`, with an optional criticality mark layered on
 * top, and the WAI-ARIA Graphics Module roles `TwinExplorer` needs to carry
 * per-node semantics through to assistive tech
 * (docs/OXOT-DIAGRAMMING-SPEC.md §1.3): `role="graphics-symbol img"`,
 * `aria-roledescription` naming the asset type, `aria-label` naming the
 * specific asset. `tabIndex` is owned by the parent — this component never
 * decides its own place in the roving-tabindex ring. Forwards a ref to the
 * `<g>` itself so the parent can imperatively move real DOM focus when arrow
 * keys change which node is active — React state alone doesn't move focus.
 */
export const AssetNode = forwardRef<SVGGElement, AssetNodeProps>(function AssetNode(
  { asset, locale, x = 0, y = 0, scale = 1, tabIndex = -1, onFocus, onKeyDown },
  ref
) {
  const typeLabel = pick(TYPE_LABEL[asset.type], locale);
  return (
    <g
      ref={ref}
      role="graphics-symbol img"
      aria-roledescription={typeLabel}
      aria-label={asset.label}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      data-gfx-meaning={`${typeLabel}: ${asset.label}`}
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      <title>
        {typeLabel} — {asset.label}
      </title>
      {assetGlyph(asset)}
      {asset.criticality && <CriticalityMark tier={asset.criticality} />}
    </g>
  );
});
