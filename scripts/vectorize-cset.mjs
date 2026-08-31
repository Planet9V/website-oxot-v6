/**
 * DRAW THE CISA CSET CONTROL-SYSTEM ASSET VOCABULARY AS LINE ART.
 *
 * WHY THIS SCRIPT NO LONGER TRACES OR OUTLINES ANYTHING. The previous generator
 * recovered upstream CSET's real vector geometry and re-expressed each FILLED
 * region as its outline. That was faithful and it was wrong. CSET's art is
 * gradient-shaded 3D clipart — a "PLC" is a rendered rack, a "clock" is a face
 * with twelve outlined numerals — and outlining a filled region gives TWO strokes
 * 0.5-1.5 units apart, which at a 1.3 stroke close into a solid. Measured on the
 * shipped result: mean ink fraction 0.200 against 0.100 for `drawio-glyphs.tsx`,
 * peaking at 0.371 (`Mtu`) and 0.321 (`Ied`) — black blobs beside 1.3 hairlines,
 * in a drawing meant to speak one visual language. Three independent diagram
 * audits each docked the same points for it. No parameter fixes that: the input
 * is the wrong KIND of picture. Two further defects live in the art itself, so no
 * conversion could ever have fixed them — CSET draws `sis` with the same panel as
 * `hmi` (a safety system rendering as the operator's HMI), and `ews`
 * byte-identically to `pc`.
 *
 * SO THE MARKS ARE DRAWN HERE, from primitives, in cell coordinates. They are
 * ASSET LABELS in an architecture drawing, not portraits: a schematic mark that
 * resolves at 32px beats a detailed one that fills in. Where a convention exists
 * it is used — a brick wall for a firewall, crossed arrows on a flat chassis for
 * a switch, a puck for a router, a diode triangle and bar for a unidirectional
 * gateway, a cylinder for a store, an ISA diamond for a safety function.
 *
 * WHAT IS STILL CSET, AND WHY THE LICENCE NOTICE STAYS. The TAXONOMY is CSET's:
 * which 45 asset classes an OT-security drawing needs, and the slug for each.
 * `assertProvenance` re-checks every slug against the vendored upstream set on
 * each run, so the claim stays true rather than becoming folklore. The
 * attribution block in the output is a LICENCE CONDITION and is not to be
 * stripped; its KNOWN LIMITATIONS say plainly which part is CSET's and which is
 * ours, so nobody credits Battelle for geometry it did not draw — or drops the
 * notice believing nothing is owed.
 *
 * THE CONTRACT, unchanged: every export is a `<g>` FRAGMENT — never a standalone
 * `<svg>` — in the 32-unit cell, inside the 22-unit live area (x/y 5..27),
 * `stroke="currentColor"`, `fill="none"`, a literal 1.3 cell stroke weight. The
 * fit is baked into the coordinates, so stroke weight needs no per-glyph
 * division and rounding means the same 1/100th of a cell everywhere.
 *
 * GATES, all mechanical, all fatal: bounds inside the live area; long axis >= 18
 * so the set is one optical size; estimated ink fraction <= 0.15; no two glyphs
 * sharing geometry; no paint value but `none`.
 *
 * Run:   node scripts/vectorize-cset.mjs [--fetch]
 * Out:   src/components/twin/cset-glyphs.tsx  (generated — do not hand-edit)
 */
import { writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VENDOR_DIR = join(ROOT, "new_material_source/asset_icons_drawio/libraries/cset-cisa-vector");
const OUT = join(ROOT, "src/components/twin/cset-glyphs.tsx");

/** Pinned upstream. The icon directory's last commit; unchanged since 2021. */
const UPSTREAM_SHA = "fa40407f360fe40f8b18f6f0e69ef14e7563cf2a";
const UPSTREAM_DIR = "CSETWebApi/CSETWeb_Api/CSETWeb_ApiCore/Diagram/src/main/webapp/img/cset";

const CELL = 32;
const LIVE_MIN = 5;
const LIVE_MAX = 27;
/** Visual stroke weight in cell units — `pid-symbols.tsx`'s STROKE. */
const STROKE = 1.3;
/** Ink ceiling. `drawio-glyphs.tsx` measures 0.033-0.234, mean 0.100. */
const INK_MAX = 0.15;
/** Optical-size floor for the long axis, against the 22-unit live area. */
const MIN_SPAN = 18;

/* ── Primitives. Every helper returns SVG path data in cell coordinates. ──── */
const n = (v) => Number(v.toFixed(2));
const m = (x, y) => `M${n(x)} ${n(y)}`;
const l = (x, y) => `L${n(x)} ${n(y)}`;
const ln = (x1, y1, x2, y2) => m(x1, y1) + l(x2, y2);
const poly = (pts, close = false) =>
  m(pts[0][0], pts[0][1]) + pts.slice(1).map((p) => l(p[0], p[1])).join("") + (close ? "Z" : "");
const a = (rx, ry, sweep, x, y) => `A${n(rx)} ${n(ry)} 0 0 ${sweep} ${n(x)} ${n(y)}`;
/** Circular arc between two explicit endpoints — used for waves and shackles. */
const arc = (x1, y1, x2, y2, r, sweep = 1) => m(x1, y1) + a(r, r, sweep, x2, y2);
const box = (x, y, w, h) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true);
const rbox = (x, y, w, h, r = 1) =>
  m(x + r, y) + l(x + w - r, y) + a(r, r, 1, x + w, y + r) +
  l(x + w, y + h - r) + a(r, r, 1, x + w - r, y + h) +
  l(x + r, y + h) + a(r, r, 1, x, y + h - r) +
  l(x, y + r) + a(r, r, 1, x + r, y) + "Z";
/** Four quarter-arcs, so all four extremes are explicit endpoints. */
const ell = (cx, cy, rx, ry) =>
  m(cx - rx, cy) + a(rx, ry, 1, cx, cy - ry) + a(rx, ry, 1, cx + rx, cy) +
  a(rx, ry, 1, cx, cy + ry) + a(rx, ry, 1, cx - rx, cy) + "Z";
const circle = (cx, cy, r) => ell(cx, cy, r, r);
/** Open cylinder: full top ellipse, two sides, and the visible bottom half. */
const cyl = (cx, top, bottom, rx, ry) =>
  ell(cx, top, rx, ry) + ln(cx - rx, top, cx - rx, bottom) + ln(cx + rx, top, cx + rx, bottom) +
  m(cx - rx, bottom) + a(rx, ry, 0, cx + rx, bottom);
const head = (x1, y1, x2, y2, h) => {
  const t = Math.atan2(y2 - y1, x2 - x1);
  return m(x2 - h * Math.cos(t - 0.45), y2 - h * Math.sin(t - 0.45)) + l(x2, y2) +
    l(x2 - h * Math.cos(t + 0.45), y2 - h * Math.sin(t + 0.45));
};
const arrow = (x1, y1, x2, y2, h = 1.9) => ln(x1, y1, x2, y2) + head(x1, y1, x2, y2, h);
const biarrow = (x1, y1, x2, y2, h = 1.9) =>
  ln(x1, y1, x2, y2) + head(x1, y1, x2, y2, h) + head(x2, y2, x1, y1, h);
const comb = (x, y, count, pitch, len) =>
  Array.from({ length: count }, (_, i) => ln(x + i * pitch, y, x + i * pitch, y + len)).join("");
/**
 * Nested broadcast arcs about (cx,cy) between two bearings, degrees, y-down.
 * FOUND BY RENDERING IT: two wide arcs over a mast do not read as radio, they
 * read as an UMBRELLA — the mast becomes the handle and the outer arc the
 * canopy. Five glyphs had it. A narrow nested fan (~100 deg) reads correctly and
 * costs a third of the ink.
 */
const fan = (cx, cy, radii, a0, a1) => {
  const at = (r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
  return radii.map((r) => arc(...at(r, a0), ...at(r, a1), r, 1)).join("");
};
const FAN_UP = [-140, -40];
const FAN_LEFT = [130, 230];
const FAN_RIGHT = [-50, 50];

/** The routing "puck". A full top ellipse plus a visible bottom costs ~74 units
    of the ~115 an ink-legal glyph has, so the arrows on it are kept short. */
const puck = (top = 13.8, bottom = 19.8) => cyl(16, top, bottom, 9.5, 2.8);
const eye = () => arc(9.8, 16, 22.2, 16, 8.4) + arc(22.2, 16, 9.8, 16, 8.4);

/*
 * THE SET. `[Name, slug, label, draw]`. `Name` and the 45-symbol export surface
 * are fixed by `src/components/diagrams/types.ts`; `slug` is the upstream CSET
 * filename and is verified to exist. `draw` returns path data, or `{ d, dash }`
 * parts when a mark needs a dashed stroke.
 */
const GLYPHS = [
  /* ── Controllers. One DIN chassis family; each differs by what it does. ─── */
  ["Plc", "plc", "Programmable logic controller", () =>
    rbox(5, 11, 22, 11) + ln(11, 11, 11, 22) + ln(6.6, 14, 9.4, 14) + ln(6.6, 16.4, 9.4, 16.4) + comb(14, 22, 4, 3.2, 2.6)],
  ["Rtu", "rtu", "Remote terminal unit", () =>
    rbox(8, 15, 16, 9) + ln(16, 15, 16, 10.5) + fan(16, 10.5, [3, 5.4], ...FAN_UP) + comb(11, 24, 3, 4.5, 2.4)],
  ["Dcs", "dcs", "Distributed control system", () =>
    ln(5.5, 11, 26.5, 11) + ln(9, 11, 9, 14) + ln(16, 11, 16, 14) + ln(23, 11, 23, 14) +
    rbox(6.5, 14, 5, 9, 0.8) + rbox(13.5, 14, 5, 9, 0.8) + rbox(20.5, 14, 5, 9, 0.8)],
  ["Ied", "ied", "Intelligent electronic device", () =>
    rbox(8, 8, 16, 16) + circle(16, 16, 4) + ln(16, 5, 16, 8) + ln(16, 24, 16, 27)],
  ["Mtu", "mtu", "Master terminal unit", () =>
    rbox(9, 10, 14, 12) + ln(9, 13.6, 23, 13.6) + arrow(9, 17.8, 5, 17.8) + arrow(23, 17.8, 27, 17.8)],
  ["FrontEndProcessor", "front_end_processor", "SCADA front-end processor", () =>
    rbox(12, 9, 14, 14) + ln(5, 11, 9, 11) + ln(5, 16, 9, 16) + ln(5, 21, 9, 21) +
    ln(9, 11, 12, 16) + ln(9, 16, 12, 16) + ln(9, 21, 12, 16) +
    ln(15, 12.5, 23, 12.5) + ln(15, 15.5, 23, 15.5)],
  /* ISA draws a safety function as a diamond, not a panel. CSET's `sis` is its
     `hmi` panel recoloured; that is the defect this replaces. */
  ["SafetyInstrumentedSystem", "sis", "Safety instrumented system", () =>
    poly([[16, 5], [27, 16], [16, 27], [5, 16]], true) + box(10.5, 10.5, 11, 11)],
  ["UnidirectionalDevice", "unidirectional_device", "Unidirectional gateway / data diode", () =>
    rbox(7, 10, 18, 12) + poly([[12, 12], [20, 16], [12, 20]], true) + ln(21, 12.5, 21, 19.5) + ln(5, 16, 7, 16) + ln(25, 16, 27, 16)],

  /* ── Operator and engineering stations. Three different silhouettes. ────── */
  ["Hmi", "hmi", "Human-machine interface", () =>
    rbox(5, 9, 22, 14, 1.5) + poly([[9, 19], [13, 13.5], [17, 16], [23, 11.5]])],
  ["Pc", "pc", "Workstation", () =>
    rbox(11, 8, 15, 11) + ln(18.5, 19, 18.5, 22) + ln(14, 22, 23, 22) +
    box(5, 8, 4.6, 14) + ln(6.1, 10.6, 8.5, 10.6)],
  ["EngineeringWorkstation", "ews", "Engineering workstation", () =>
    rbox(7.5, 5.5, 17, 11.5) + ln(10, 9, 17, 9) + ln(10, 12, 15, 12) + ln(16, 17, 16, 19.5) +
    poly([[9, 19.5], [23, 19.5], [26, 23.5], [6, 23.5]], true)],
  /* A control building AND a comms tower: a "site", not another boxed unit. */
  ["MasterSite", "master_site", "SCADA master site", () =>
    box(5, 17, 13, 9) + ln(20.5, 26, 22, 12.5) + ln(23.5, 26, 22, 12.5) +
    ln(21.1, 17, 22.9, 17) + ln(20.8, 21.5, 23.2, 21.5) + fan(22, 12.5, [2.8, 5], ...FAN_UP)],

  /* ── Radio and serial telemetry. ─────────────────────────────────────────── */
  /* Whip and a D-sub tail — the radio HARDWARE. `Rtu` owns the broadcast fan. */
  ["SerialRadio", "serial_radio", "Serial radio", () =>
    rbox(8, 14, 14, 10) + ln(20, 14, 20, 7.2) + circle(20, 6.2, 1) +
    poly([[11, 24], [15, 24], [14.2, 25.8], [11.8, 25.8]], true)],
  ["SubscriberRadio", "subscriber_radio", "Subscriber radio", () =>
    rbox(12, 7, 8, 7, 0.8) + ln(16, 14, 16, 27) + ln(12, 27, 20, 27) + fan(12, 10.5, [2.6, 4.6], ...FAN_LEFT)],
  ["SerialSwitch", "serial_switch", "Serial switch", () =>
    rbox(6, 10, 20, 9) + biarrow(10, 14.5, 22, 14.5) + comb(9, 19, 5, 3.2, 2.6)],
  ["HandheldWirelessDevice", "handheld_wireless_device", "Handheld wireless device", () =>
    rbox(11, 6, 10, 20, 1.5) + ln(12.5, 18, 19.5, 18) + fan(21.4, 10, [2.6, 4.6], ...FAN_RIGHT)],

  /* ── Network and boundary. ───────────────────────────────────────────────── */
  /* Running bond: two courses, joints staggered. One course, not three — a
     third line of bricks puts this over the ink ceiling on its own. */
  ["Firewall", "firewall", "Firewall", () =>
    box(5.5, 9.5, 21, 13) + ln(5.5, 16, 26.5, 16) + ln(16, 9.5, 16, 16) +
    ln(10.75, 16, 10.75, 22.5) + ln(21.25, 16, 21.25, 22.5)],
  ["Router", "router", "Router", () =>
    puck() + biarrow(11.5, 15.4, 20.5, 15.4) + biarrow(11.5, 18.2, 20.5, 18.2)],
  ["VlanRouter", "vlan_router", "VLAN router", () => [
    puck() + biarrow(11.5, 15.4, 20.5, 15.4) + biarrow(11.5, 18.2, 20.5, 18.2),
    { d: ln(16, 13.8, 16, 19.8), dash: "1.8 1.5" }
  ]],
  ["Switch", "switch", "Network switch", () =>
    rbox(5, 11, 22, 10) + biarrow(9, 14.2, 23, 14.2) + biarrow(23, 17.8, 9, 17.8)],
  ["VlanSwitch", "vlan_switch", "VLAN switch", () => [
    rbox(5, 11, 22, 10) + biarrow(9, 14.2, 23, 14.2) + biarrow(23, 17.8, 9, 17.8),
    { d: ln(16, 11, 16, 21), dash: "1.9 1.7" }
  ]],
  ["Hub", "hub", "Network hub", () =>
    rbox(6, 11, 20, 10) + arrow(16, 16, 10, 13) + arrow(16, 16, 22, 13) +
    arrow(16, 16, 10, 19) + arrow(16, 16, 22, 19)],
  ["Ids", "ids", "Intrusion detection system", () =>
    rbox(6, 9, 20, 14) + eye() + circle(16, 16, 1.8)],
  ["Ips", "ips", "Intrusion prevention system", () =>
    rbox(6, 9, 20, 14) + eye() + ln(9.8, 21, 22.2, 11)],
  ["LinkEncryption", "link_encryption", "Link encryption device", () =>
    rbox(10, 13, 12, 9, 1) + arc(13, 13, 19, 13, 3) + circle(16, 17, 1.2) +
    ln(5, 17.5, 10, 17.5) + ln(22, 17.5, 27, 17.5)],
  ["Modem", "modem", "Modem", () =>
    rbox(5, 12, 22, 8) + m(9, 16) + `C11 12.4 13 12.4 15 16C17 19.6 19 19.6 23 16`],
  ["WirelessModem", "wireless_modem", "Wireless modem", () =>
    rbox(5, 14, 22, 8) + m(9, 18) + `C11 14.4 13 14.4 15 18C17 21.6 19 21.6 23 18` +
    ln(22, 14, 22, 10) + fan(22, 10, [2.6, 4.6], ...FAN_UP)],
  ["WirelessRouter", "wireless_router", "Wireless router", () =>
    puck(17.4, 23.4) + ln(21, 15.8, 21, 11) + fan(21, 11, [2.8, 4.8], ...FAN_UP)],
  ["RemoteAccessServer", "remote_access_server", "Remote access server", () => [
    rbox(13, 7, 11, 18, 1) + ln(14.5, 10, 22.5, 10) + ln(14.5, 12.6, 22.5, 12.6) +
    arrow(5.4, 16, 13, 16),
    { d: ln(8.6, 7, 8.6, 25), dash: "1.9 1.7" }
  ]],
  ["TerminalServer", "terminal_server", "Terminal server", () =>
    rbox(9, 7, 11, 18, 1) + ln(10.5, 10, 18.5, 10) + ln(23.4, 12, 23.4, 21) +
    ln(20, 12, 23.4, 12) + ln(20, 15, 23.4, 15) + ln(20, 18, 23.4, 18) + ln(20, 21, 23.4, 21)],
  ["PowerOverEthernet", "power_over_ethernet", "Power over Ethernet injector", () =>
    rbox(9, 12, 14, 9) + ln(5, 16.5, 9, 16.5) + ln(23, 16.5, 27, 16.5) +
    poly([[17.4, 13.6], [13.6, 17.2], [16.2, 17.2], [14.4, 19.8]])],

  /* ── Hosts. The audit's "seven racks and a badge" — now seven silhouettes. ─ */
  ["Server", "server", "Server", () =>
    rbox(11, 6, 11, 20, 1) + ln(12.5, 9.4, 19.5, 9.4) + ln(12.5, 12.4, 19.5, 12.4) + ln(12.5, 15.4, 19.5, 15.4)],
  ["ApplicationServer", "application_server", "Application server", () =>
    rbox(11, 6, 11, 20, 1) + box(12.6, 14, 6.8, 7) + ln(12.6, 16.2, 19.4, 16.2) + ln(12.5, 9.4, 19.5, 9.4)],
  ["DatabaseServer", "database_server", "Database server", () =>
    cyl(16, 8, 23.2, 7.5, 2.8) + m(8.5, 15.6) + a(7.5, 2.8, 0, 23.5, 15.6)],
  /* The gear breaks the tower's outline rather than sitting inside it as a
     badge — the audit's "seven racks differing only by a badge" complaint. */
  ["ConfigurationServer", "configuration_server", "Configuration server", () =>
    rbox(8, 6, 11, 17, 1) + ln(9.5, 9.4, 17.5, 9.4) + ln(9.5, 12.4, 17.5, 12.4) +
    circle(22, 20, 3.4) + ln(22, 14.6, 22, 16.6) + ln(22, 23.4, 22, 25.4) +
    ln(16.6, 20, 18.6, 20) + ln(25.4, 20, 27, 20)],
  ["VirtualMachineServer", "virtual_machine_server", "Virtual machine server", () =>
    box(6, 13, 15, 11) + ln(8.5, 10.5, 23.5, 10.5) + ln(23.5, 10.5, 23.5, 21.5) + ln(11, 8, 26, 8) + ln(26, 8, 26, 19)],
  /* Terminals and a bolt. Four stacked bars in a box read as a DOCUMENT. */
  ["Ups", "uninterruptible_power_supply", "Uninterruptible power supply", () =>
    box(9, 8, 14, 17) + poly([[11.5, 8], [11.5, 6], [14, 6], [14, 8]]) + poly([[18, 8], [18, 6], [20.5, 6], [20.5, 8]]) +
    poly([[17.5, 12], [13, 17.5], [16, 17.5], [14, 22]])],
  ["Siem", "security_information_and_event_management_system", "SIEM", () =>
    poly([[16, 5], [25, 8.6], [25, 15.4]]) + `C25 21 21 24.6 16 26.4` +
    `C11 24.6 7 21 7 15.4` + l(7, 8.6) + "Z" +
    ln(11, 19.6, 21, 19.6) + ln(12.4, 19.6, 12.4, 15.6) + ln(16, 19.6, 16, 13) + ln(19.6, 19.6, 19.6, 16.4)],

  /* ── Facility and edge. ──────────────────────────────────────────────────── */
  ["IpCamera", "ip_camera", "IP camera", () =>
    rbox(6, 10, 14, 9) + poly([[20, 11], [26, 8.5], [26, 20.5], [20, 18]], true) + ln(13, 19, 13, 24) + ln(9, 24, 17, 24)],
  ["DoorControlUnit", "door_access_door_control_unit", "Door access control unit", () =>
    box(6, 6, 13, 20) + ln(16.6, 15, 16.6, 17) + ln(19, 15.5, 21, 15.5) +
    rbox(21, 12, 5, 7, 0.8) + ln(22.2, 14.2, 24.8, 14.2) + ln(22.2, 16.4, 24.8, 16.4)],
  ["BuildingAutomation", "building_automation_management_systems", "Building automation system", () =>
    box(6, 8, 12, 18) + ln(12, 8, 12, 26) + ln(6, 17, 18, 17) + circle(22.5, 20, 3.4) + ln(22.5, 20, 22.5, 17.2)],
  ["NetworkPrinter", "network_printer", "Network printer", () =>
    rbox(6, 13, 20, 8) + poly([[10, 13], [10, 8], [22, 8], [22, 13]]) + poly([[10, 21], [10, 25], [22, 25], [22, 21]]) + ln(23, 15.6, 25, 15.6)],
  ["Historian", "historian", "Process historian", () =>
    cyl(16, 7.8, 23.2, 7.5, 2.8) + poly([[11.5, 18.6], [14.5, 15.4], [17.5, 17], [20.5, 13.6]])],
  ["Clock", "clock", "Time source", () =>
    circle(16, 16, 10) + ln(16, 6, 16, 7.6) + ln(26, 16, 24.4, 16) + ln(16, 26, 16, 24.4) +
    ln(6, 16, 7.6, 16) + ln(16, 16, 16, 9.6) + ln(16, 16, 20.6, 18.2)],
  ["Cloud", "cloud", "Cloud / external network", () =>
    m(8.5, 22) + a(4.6, 4.6, 1, 9.6, 13.2) + a(6.2, 6.2, 1, 20.4, 11) + a(5, 5, 1, 25, 16.4) + a(3, 3, 1, 24.2, 22) + "Z"]
];

/* ── Geometry. Sampling, so arcs and cubics are measured, not eyeballed. ──── */

const angle = (ux, uy, vx, vy) =>
  (Math.sign(ux * vy - uy * vx) || 1) *
  Math.acos(Math.min(1, Math.max(-1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)))));

/** SVG endpoint parameterisation -> centre, then 24 points along the sweep. */
function sampleArc(x1, y1, rx, ry, laf, sf, x2, y2) {
  const [dx, dy] = [(x1 - x2) / 2, (y1 - y2) / 2];
  let [rX, rY] = [Math.abs(rx), Math.abs(ry)];
  const lam = (dx * dx) / (rX * rX) + (dy * dy) / (rY * rY);
  if (lam > 1) { const s = Math.sqrt(lam); rX *= s; rY *= s; }
  const den = rX * rX * dy * dy + rY * rY * dx * dx;
  let co = Math.sqrt(Math.max(0, (rX * rX * rY * rY - den) / den));
  if (laf === sf) co = -co;
  const [cxp, cyp] = [(co * rX * dy) / rY, (-co * rY * dx) / rX];
  const [cx, cy] = [cxp + (x1 + x2) / 2, cyp + (y1 + y2) / 2];
  const [ux, uy] = [(dx - cxp) / rX, (dy - cyp) / rY];
  const t1 = angle(1, 0, ux, uy);
  let dt = angle(ux, uy, (-dx - cxp) / rX, (-dy - cyp) / rY);
  if (!sf && dt > 0) dt -= 2 * Math.PI;
  if (sf && dt < 0) dt += 2 * Math.PI;
  return Array.from({ length: 24 }, (_, k) => {
    const t = t1 + (dt * (k + 1)) / 24;
    return [cx + rX * Math.cos(t), cy + rY * Math.sin(t)];
  });
}

const cubicAt = ([ax, ay], [bx, by], [cx, cy], [dx, dy], t, u = 1 - t) => [
  u * u * u * ax + 3 * u * u * t * bx + 3 * u * t * t * cx + t * t * t * dx,
  u * u * u * ay + 3 * u * u * t * by + 3 * u * t * t * cy + t * t * t * dy
];

/**
 * Walk path data, sampling arcs and cubics, for true bounds and centreline
 * length. Sampled rather than read off the literal coordinates because an arc's
 * extreme is usually not one of its endpoints — and "measure the geometry
 * numerically, never eyeball it at render size" is a rule this project paid for.
 */
function measure(d) {
  const toks = d.match(/[A-Za-z]|-?\d*\.?\d+/g) ?? [];
  let [cx, cy, sx, sy, length] = [0, 0, 0, 0, 0];
  let [x0, x1, y0, y1] = [Infinity, -Infinity, Infinity, -Infinity];
  let pen = null;
  const see = ([x, y]) => {
    [x0, x1, y0, y1] = [Math.min(x0, x), Math.max(x1, x), Math.min(y0, y), Math.max(y1, y)];
    if (pen) length += Math.hypot(x - pen[0], y - pen[1]);
    pen = [x, y];
  };
  let i = 0;
  const num = () => Number(toks[i++]);
  while (i < toks.length) {
    const c = toks[i++];
    if (c === "M") { [cx, cy] = [num(), num()]; [sx, sy] = [cx, cy]; pen = null; see([cx, cy]); }
    else if (c === "L") { [cx, cy] = [num(), num()]; see([cx, cy]); }
    else if (c === "A") {
      const [rx, ry] = [num(), num()];
      num();
      const [laf, sf, x, y] = [num(), num(), num(), num()];
      sampleArc(cx, cy, rx, ry, laf, sf, x, y).forEach(see);
      [cx, cy] = [x, y];
    } else if (c === "C") {
      const [p0, p1, p2, p3] = [[cx, cy], [num(), num()], [num(), num()], [num(), num()]];
      for (let k = 1; k <= 16; k += 1) see(cubicAt(p0, p1, p2, p3, k / 16));
      [cx, cy] = p3;
    } else if (c === "Z") { see([sx, sy]); [cx, cy] = [sx, sy]; }
    else throw new Error(`unsupported path command "${c}"`);
  }
  return { length, x0, x1, y0, y1 };
}

async function fetchUpstream() {
  mkdirSync(VENDOR_DIR, { recursive: true });
  const url = `https://api.github.com/repos/cisagov/cset/contents/${UPSTREAM_DIR}?ref=${UPSTREAM_SHA}`;
  const listing = await fetch(url, { headers: { accept: "application/vnd.github+json" } });
  if (!listing.ok) throw new Error(`upstream listing failed: ${listing.status}`);
  const files = (await listing.json()).filter((f) => f.name.endsWith(".svg"));
  for (const f of files) {
    const res = await fetch(f.download_url);
    if (!res.ok) throw new Error(`${f.name}: ${res.status}`);
    writeFileSync(join(VENDOR_DIR, f.name), await res.text());
  }
  console.log(`fetched ${files.length} upstream SVGs -> ${VENDOR_DIR}`);
}

/**
 * The taxonomy claim, checked rather than asserted. The drawings are ours; the
 * question "which 45 asset classes, called what" is CSET's answer, and this is
 * what keeps the attribution in the output honest as the set is edited.
 */
function assertProvenance() {
  const svgs = existsSync(VENDOR_DIR) ? readdirSync(VENDOR_DIR).filter((f) => f.endsWith(".svg")) : [];
  if (!svgs.length) {
    console.error(`No vendored CSET sources in ${VENDOR_DIR}.\nRun once with --fetch to download them.`);
    process.exit(1);
  }
  const have = new Set(svgs.map((f) => f.slice(0, -4)));
  const gone = GLYPHS.filter(([, slug]) => !have.has(slug)).map(([, slug]) => slug);
  if (gone.length) throw new Error(`slug not in the CSET set — provenance claim is false for:\n  ${gone.join("\n  ")}`);
}

// ─────────────────────────────────────────────────────────────────────────────

if (process.argv.includes("--fetch")) await fetchUpstream();
assertProvenance();

const stats = [];
const parts = [];
const geometry = new Map();
/* Collected, not thrown one at a time: a first-failure abort hides how much of
   the set a change broke, and these are tuned as a set. */
const violations = [];

for (const [name, slug, label, draw] of GLYPHS) {
  const raw = draw();
  const pieces = (Array.isArray(raw) ? raw : [raw]).map((p) => (typeof p === "string" ? { d: p } : p));
  const all = pieces.map((p) => p.d).join("");
  const { length, x0, x1, y0, y1 } = measure(all);
  const span = Math.max(x1 - x0, y1 - y0);
  /* Stroke width times centreline length over the cell. Overlaps and joins make
     this a slight OVERSTATEMENT, so passing here cannot mask a raster failure. */
  const ink = (length * STROKE) / (CELL * CELL);

  if (x0 < LIVE_MIN - 0.005 || x1 > LIVE_MAX + 0.005 || y0 < LIVE_MIN - 0.005 || y1 > LIVE_MAX + 0.005) {
    violations.push(`${name}: outside the live area — x ${x0.toFixed(2)}..${x1.toFixed(2)}, y ${y0.toFixed(2)}..${y1.toFixed(2)}`);
  }
  if (span < MIN_SPAN) violations.push(`${name}: long axis ${span.toFixed(2)} < ${MIN_SPAN} — reads smaller than the set`);
  if (ink > INK_MAX) violations.push(`${name}: estimated ink ${ink.toFixed(3)} > ${INK_MAX}`);
  if (/fill="(?!none)/.test(all)) violations.push(`${name}: a paint value other than none`);

  const hash = createHash("sha256").update(all).digest("hex").slice(0, 12);
  if (geometry.has(hash)) violations.push(`${name} and ${geometry.get(hash)} draw the same mark`);
  geometry.set(hash, name);

  stats.push({ name, ink: +ink.toFixed(3), span: +span.toFixed(1), len: Math.round(length), hash });
  const svg = pieces
    .map((p) => `<path d="${p.d}" fill="none" stroke="currentColor" strokeWidth={${STROKE}}` +
      (p.dash ? ` strokeDasharray="${p.dash}"` : "") + ` strokeLinejoin="round" strokeLinecap="round" />`)
    .join("");
  parts.push(
    `/** CSET \`${slug}\` — ${label}. Ink ${ink.toFixed(3)}, span ${span.toFixed(1)}. */\n` +
    `export function ${name}() {\n` +
    `  // prettier-ignore\n` +
    `  return <g>${svg}</g>;\n` +
    `}`
  );
}

if (violations.length) {
  console.table(stats);
  console.error(`\n${violations.length} gate violation(s):\n  ${violations.join("\n  ")}`);
  process.exit(1);
}

const meanInk = stats.reduce((s, r) => s + r.ink, 0) / stats.length;
const maxInk = Math.max(...stats.map((r) => r.ink));

const header = `/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 * Regenerate:  node scripts/vectorize-cset.mjs
 *
 * ${parts.length} control-system asset marks for architecture, Purdue and IEC 62443 zone
 * drawings — the CSET asset vocabulary, DRAWN AS LINE ART.
 *
 * ATTRIBUTION — REQUIRED, DO NOT REMOVE. The asset TAXONOMY below — which asset
 * classes an OT drawing needs, and the slug naming each — is from CSET, the
 * Cyber Security Evaluation Tool published by CISA and built by Idaho National
 * Laboratory, at cisagov/cset commit ${UPSTREAM_SHA.slice(0, 7)}. The generator verifies every
 * slug against the vendored upstream set on each run.
 *
 *   The MIT License (MIT)
 *   Copyright 2025 Battelle Energy Alliance, LLC
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to
 *   deal in the Software without restriction, including without limitation the
 *   rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *   sell copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 *
 * CSET is contractor-produced, so it is MIT-licensed, NOT public domain. Any
 * public claim must say "CISA's CSET symbol set, (c) Battelle Energy Alliance,
 * MIT" — never "US-government public domain".
 *
 * WHAT IS NOT CSET: none of the GEOMETRY. Upstream art is gradient-shaded 3D
 * clipart, and outlining its fills shipped a set with mean ink 0.200 against
 * 0.100 for \`drawio-glyphs.tsx\`. These are drawn from primitives instead, to
 * standard notation where one exists. Mean ink ${meanInk.toFixed(3)}, worst ${maxInk.toFixed(3)}, gated at ${INK_MAX}.
 *
 * EACH EXPORT IS A FRAGMENT, NOT A STANDALONE <svg> — a \`<g>\` whose coordinates
 * are already in the 32-unit cell \`pid-symbols.tsx\` and \`AssetNode.tsx\` compose
 * in, occupying the same 22-unit live area (x/y 5..27):
 *
 *   <svg viewBox="0 0 32 32" className="h-6 w-6"><Plc /></svg>
 *
 * Every glyph strokes \`currentColor\` and fills nothing, so it inherits whatever
 * token the caller sets. \`strokeWidth\` is a literal ${STROKE} in cell units on each
 * path: there is no scale transform to undo, and a presentation attribute beats
 * an inherited one, so callers must not set stroke weight from outside.
 *
 * KNOWN LIMITATIONS.
 * 1. SCHEMATIC, NOT PICTORIAL. These name an asset class; they do not portray a
 *    product. \`Server\` is a slotted tower, not anyone's 2U chassis.
 * 2. NOT ISA-5.1 OR IEC 62424. Use them in architecture, Purdue and zone
 *    drawings; on a P&ID an ISA bubble is what an engineer expects, see
 *    \`instrument-bubble.tsx\`.
 * 3. LABEL THE VARIANTS. \`Router\`/\`VlanRouter\`, \`Switch\`/\`VlanSwitch\` and
 *    \`Modem\`/\`WirelessModem\` are one family each, separated by a single mark.
 *    The generator proves no two share geometry; a reader still needs the label.
 */
`;

writeFileSync(OUT, `${header}\n${parts.join("\n\n")}\n`);

console.table(stats);
console.log(`wrote ${OUT} — ${parts.length} glyphs, mean ink ${meanInk.toFixed(3)}, worst ${maxInk.toFixed(3)}`);
