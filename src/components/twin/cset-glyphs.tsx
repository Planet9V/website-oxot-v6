/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 * Regenerate:  node scripts/vectorize-cset.mjs
 *
 * 45 control-system asset marks for architecture, Purdue and IEC 62443 zone
 * drawings — the CSET asset vocabulary, DRAWN AS LINE ART.
 *
 * ATTRIBUTION — REQUIRED, DO NOT REMOVE. The asset TAXONOMY below — which asset
 * classes an OT drawing needs, and the slug naming each — is from CSET, the
 * Cyber Security Evaluation Tool published by CISA and built by Idaho National
 * Laboratory, at cisagov/cset commit fa40407. The generator verifies every
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
 * 0.100 for `drawio-glyphs.tsx`. These are drawn from primitives instead, to
 * standard notation where one exists. Mean ink 0.118, worst 0.147, gated at 0.15.
 *
 * EACH EXPORT IS A FRAGMENT, NOT A STANDALONE <svg> — a `<g>` whose coordinates
 * are already in the 32-unit cell `pid-symbols.tsx` and `AssetNode.tsx` compose
 * in, occupying the same 22-unit live area (x/y 5..27):
 *
 *   <svg viewBox="0 0 32 32" className="h-6 w-6"><Plc /></svg>
 *
 * Every glyph strokes `currentColor` and fills nothing, so it inherits whatever
 * token the caller sets. `strokeWidth` is a literal 1.3 in cell units on each
 * path: there is no scale transform to undo, and a presentation attribute beats
 * an inherited one, so callers must not set stroke weight from outside.
 *
 * KNOWN LIMITATIONS.
 * 1. SCHEMATIC, NOT PICTORIAL. These name an asset class; they do not portray a
 *    product. `Server` is a slotted tower, not anyone's 2U chassis.
 * 2. NOT ISA-5.1 OR IEC 62424. Use them in architecture, Purdue and zone
 *    drawings; on a P&ID an ISA bubble is what an engineer expects, see
 *    `instrument-bubble.tsx`.
 * 3. LABEL THE VARIANTS. `Router`/`VlanRouter`, `Switch`/`VlanSwitch` and
 *    `Modem`/`WirelessModem` are one family each, separated by a single mark.
 *    The generator proves no two share geometry; a reader still needs the label.
 */

/** CSET `plc` — Programmable logic controller. Ink 0.116, span 22.0. */
export function Plc() {
  // prettier-ignore
  return <g><path d="M6 11L26 11A1 1 0 0 1 27 12L27 21A1 1 0 0 1 26 22L6 22A1 1 0 0 1 5 21L5 12A1 1 0 0 1 6 11ZM11 11L11 22M6.6 14L9.4 14M6.6 16.4L9.4 16.4M14 22L14 24.6M17.2 22L17.2 24.6M20.4 22L20.4 24.6M23.6 22L23.6 24.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `rtu` — Remote terminal unit. Ink 0.095, span 21.3. */
export function Rtu() {
  // prettier-ignore
  return <g><path d="M9 15L23 15A1 1 0 0 1 24 16L24 23A1 1 0 0 1 23 24L9 24A1 1 0 0 1 8 23L8 16A1 1 0 0 1 9 15ZM16 15L16 10.5M13.7 8.57A3 3 0 0 1 18.3 8.57M11.86 7.03A5.4 5.4 0 0 1 20.14 7.03M11 24L11 26.4M15.5 24L15.5 26.4M20 24L20 26.4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `dcs` — Distributed control system. Ink 0.139, span 21.0. */
export function Dcs() {
  // prettier-ignore
  return <g><path d="M5.5 11L26.5 11M9 11L9 14M16 11L16 14M23 11L23 14M7.3 14L10.7 14A0.8 0.8 0 0 1 11.5 14.8L11.5 22.2A0.8 0.8 0 0 1 10.7 23L7.3 23A0.8 0.8 0 0 1 6.5 22.2L6.5 14.8A0.8 0.8 0 0 1 7.3 14ZM14.3 14L17.7 14A0.8 0.8 0 0 1 18.5 14.8L18.5 22.2A0.8 0.8 0 0 1 17.7 23L14.3 23A0.8 0.8 0 0 1 13.5 22.2L13.5 14.8A0.8 0.8 0 0 1 14.3 14ZM21.3 14L24.7 14A0.8 0.8 0 0 1 25.5 14.8L25.5 22.2A0.8 0.8 0 0 1 24.7 23L21.3 23A0.8 0.8 0 0 1 20.5 22.2L20.5 14.8A0.8 0.8 0 0 1 21.3 14Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `ied` — Intelligent electronic device. Ink 0.119, span 22.0. */
export function Ied() {
  // prettier-ignore
  return <g><path d="M9 8L23 8A1 1 0 0 1 24 9L24 23A1 1 0 0 1 23 24L9 24A1 1 0 0 1 8 23L8 9A1 1 0 0 1 9 8ZM12 16A4 4 0 0 1 16 12A4 4 0 0 1 20 16A4 4 0 0 1 16 20A4 4 0 0 1 12 16ZM16 5L16 8M16 24L16 27" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `mtu` — Master terminal unit. Ink 0.101, span 22.0. */
export function Mtu() {
  // prettier-ignore
  return <g><path d="M10 10L22 10A1 1 0 0 1 23 11L23 21A1 1 0 0 1 22 22L10 22A1 1 0 0 1 9 21L9 11A1 1 0 0 1 10 10ZM9 13.6L23 13.6M9 17.8L5 17.8M6.71 16.97L5 17.8L6.71 18.63M23 17.8L27 17.8M25.29 18.63L27 17.8L25.29 16.97" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `front_end_processor` — SCADA front-end processor. Ink 0.123, span 21.0. */
export function FrontEndProcessor() {
  // prettier-ignore
  return <g><path d="M13 9L25 9A1 1 0 0 1 26 10L26 22A1 1 0 0 1 25 23L13 23A1 1 0 0 1 12 22L12 10A1 1 0 0 1 13 9ZM5 11L9 11M5 16L9 16M5 21L9 21M9 11L12 16M9 16L12 16M9 21L12 16M15 12.5L23 12.5M15 15.5L23 15.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `sis` — Safety instrumented system. Ink 0.135, span 22.0. */
export function SafetyInstrumentedSystem() {
  // prettier-ignore
  return <g><path d="M16 5L27 16L16 27L5 16ZM10.5 10.5L21.5 10.5L21.5 21.5L10.5 21.5Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `unidirectional_device` — Unidirectional gateway / data diode. Ink 0.121, span 22.0. */
export function UnidirectionalDevice() {
  // prettier-ignore
  return <g><path d="M8 10L24 10A1 1 0 0 1 25 11L25 21A1 1 0 0 1 24 22L8 22A1 1 0 0 1 7 21L7 11A1 1 0 0 1 8 10ZM12 12L20 16L12 20ZM21 12.5L21 19.5M5 16L7 16M25 16L27 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `hmi` — Human-machine interface. Ink 0.112, span 22.0. */
export function Hmi() {
  // prettier-ignore
  return <g><path d="M6.5 9L25.5 9A1.5 1.5 0 0 1 27 10.5L27 21.5A1.5 1.5 0 0 1 25.5 23L6.5 23A1.5 1.5 0 0 1 5 21.5L5 10.5A1.5 1.5 0 0 1 6.5 9ZM9 19L13 13.5L17 16L23 11.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `pc` — Workstation. Ink 0.129, span 21.0. */
export function Pc() {
  // prettier-ignore
  return <g><path d="M12 8L25 8A1 1 0 0 1 26 9L26 18A1 1 0 0 1 25 19L12 19A1 1 0 0 1 11 18L11 9A1 1 0 0 1 12 8ZM18.5 19L18.5 22M14 22L23 22M5 8L9.6 8L9.6 22L5 22ZM6.1 10.6L8.5 10.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `ews` — Engineering workstation. Ink 0.144, span 20.0. */
export function EngineeringWorkstation() {
  // prettier-ignore
  return <g><path d="M8.5 5.5L23.5 5.5A1 1 0 0 1 24.5 6.5L24.5 16A1 1 0 0 1 23.5 17L8.5 17A1 1 0 0 1 7.5 16L7.5 6.5A1 1 0 0 1 8.5 5.5ZM10 9L17 9M10 12L15 12M16 17L16 19.5M9 19.5L23 19.5L26 23.5L6 23.5Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `master_site` — SCADA master site. Ink 0.113, span 20.8. */
export function MasterSite() {
  // prettier-ignore
  return <g><path d="M5 17L18 17L18 26L5 26ZM20.5 26L22 12.5M23.5 26L22 12.5M21.1 17L22.9 17M20.8 21.5L23.2 21.5M19.86 10.7A2.8 2.8 0 0 1 24.14 10.7M18.17 9.29A5 5 0 0 1 25.83 9.29" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `serial_radio` — Serial radio. Ink 0.088, span 20.6. */
export function SerialRadio() {
  // prettier-ignore
  return <g><path d="M9 14L21 14A1 1 0 0 1 22 15L22 23A1 1 0 0 1 21 24L9 24A1 1 0 0 1 8 23L8 15A1 1 0 0 1 9 14ZM20 14L20 7.2M19 6.2A1 1 0 0 1 20 5.2A1 1 0 0 1 21 6.2A1 1 0 0 1 20 7.2A1 1 0 0 1 19 6.2ZM11 24L15 24L14.2 25.8L11.8 25.8Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `subscriber_radio` — Subscriber radio. Ink 0.079, span 20.0. */
export function SubscriberRadio() {
  // prettier-ignore
  return <g><path d="M12.8 7L19.2 7A0.8 0.8 0 0 1 20 7.8L20 13.2A0.8 0.8 0 0 1 19.2 14L12.8 14A0.8 0.8 0 0 1 12 13.2L12 7.8A0.8 0.8 0 0 1 12.8 7ZM16 14L16 27M12 27L20 27M10.33 12.49A2.6 2.6 0 0 1 10.33 8.51M9.04 14.02A4.6 4.6 0 0 1 9.04 6.98" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `serial_switch` — Serial switch. Ink 0.113, span 20.0. */
export function SerialSwitch() {
  // prettier-ignore
  return <g><path d="M7 10L25 10A1 1 0 0 1 26 11L26 18A1 1 0 0 1 25 19L7 19A1 1 0 0 1 6 18L6 11A1 1 0 0 1 7 10ZM10 14.5L22 14.5M20.29 15.33L22 14.5L20.29 13.67M11.71 13.67L10 14.5L11.71 15.33M9 19L9 21.6M12.2 19L12.2 21.6M15.4 19L15.4 21.6M18.6 19L18.6 21.6M21.8 19L21.8 21.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `handheld_wireless_device` — Handheld wireless device. Ink 0.098, span 20.0. */
export function HandheldWirelessDevice() {
  // prettier-ignore
  return <g><path d="M12.5 6L19.5 6A1.5 1.5 0 0 1 21 7.5L21 24.5A1.5 1.5 0 0 1 19.5 26L12.5 26A1.5 1.5 0 0 1 11 24.5L11 7.5A1.5 1.5 0 0 1 12.5 6ZM12.5 18L19.5 18M23.07 8.01A2.6 2.6 0 0 1 23.07 11.99M24.36 6.48A4.6 4.6 0 0 1 24.36 13.52" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `firewall` — Firewall. Ink 0.138, span 21.0. */
export function Firewall() {
  // prettier-ignore
  return <g><path d="M5.5 9.5L26.5 9.5L26.5 22.5L5.5 22.5ZM5.5 16L26.5 16M16 9.5L16 16M10.75 16L10.75 22.5M21.25 16L21.25 22.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `router` — Router. Ink 0.137, span 19.0. */
export function Router() {
  // prettier-ignore
  return <g><path d="M6.5 13.8A9.5 2.8 0 0 1 16 11A9.5 2.8 0 0 1 25.5 13.8A9.5 2.8 0 0 1 16 16.6A9.5 2.8 0 0 1 6.5 13.8ZM6.5 13.8L6.5 19.8M25.5 13.8L25.5 19.8M6.5 19.8A9.5 2.8 0 0 0 25.5 19.8M11.5 15.4L20.5 15.4M18.79 16.23L20.5 15.4L18.79 14.57M13.21 14.57L11.5 15.4L13.21 16.23M11.5 18.2L20.5 18.2M18.79 19.03L20.5 18.2L18.79 17.37M13.21 17.37L11.5 18.2L13.21 19.03" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `vlan_router` — VLAN router. Ink 0.144, span 19.0. */
export function VlanRouter() {
  // prettier-ignore
  return <g><path d="M6.5 13.8A9.5 2.8 0 0 1 16 11A9.5 2.8 0 0 1 25.5 13.8A9.5 2.8 0 0 1 16 16.6A9.5 2.8 0 0 1 6.5 13.8ZM6.5 13.8L6.5 19.8M25.5 13.8L25.5 19.8M6.5 19.8A9.5 2.8 0 0 0 25.5 19.8M11.5 15.4L20.5 15.4M18.79 16.23L20.5 15.4L18.79 14.57M13.21 14.57L11.5 15.4L13.21 16.23M11.5 18.2L20.5 18.2M18.79 19.03L20.5 18.2L18.79 17.37M13.21 17.37L11.5 18.2L13.21 19.03" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /><path d="M16 13.8L16 19.8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeDasharray="1.8 1.5" strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `switch` — Network switch. Ink 0.134, span 22.0. */
export function Switch() {
  // prettier-ignore
  return <g><path d="M6 11L26 11A1 1 0 0 1 27 12L27 20A1 1 0 0 1 26 21L6 21A1 1 0 0 1 5 20L5 12A1 1 0 0 1 6 11ZM9 14.2L23 14.2M21.29 15.03L23 14.2L21.29 13.37M10.71 13.37L9 14.2L10.71 15.03M23 17.8L9 17.8M10.71 16.97L9 17.8L10.71 18.63M21.29 18.63L23 17.8L21.29 16.97" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `vlan_switch` — VLAN switch. Ink 0.147, span 22.0. */
export function VlanSwitch() {
  // prettier-ignore
  return <g><path d="M6 11L26 11A1 1 0 0 1 27 12L27 20A1 1 0 0 1 26 21L6 21A1 1 0 0 1 5 20L5 12A1 1 0 0 1 6 11ZM9 14.2L23 14.2M21.29 15.03L23 14.2L21.29 13.37M10.71 13.37L9 14.2L10.71 15.03M23 17.8L9 17.8M10.71 16.97L9 17.8L10.71 18.63M21.29 18.63L23 17.8L21.29 16.97" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /><path d="M16 11L16 21" fill="none" stroke="currentColor" strokeWidth={1.3} strokeDasharray="1.9 1.7" strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `hub` — Network hub. Ink 0.127, span 20.0. */
export function Hub() {
  // prettier-ignore
  return <g><path d="M7 11L25 11A1 1 0 0 1 26 12L26 20A1 1 0 0 1 25 21L7 21A1 1 0 0 1 6 20L6 12A1 1 0 0 1 7 11ZM16 16L10 13M11.9 13.03L10 13L11.16 14.5M16 16L22 13M20.84 14.5L22 13L20.1 13.03M16 16L10 19M11.16 17.5L10 19L11.9 18.97M16 16L22 19M20.1 18.97L22 19L20.84 17.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `ids` — Intrusion detection system. Ink 0.134, span 20.0. */
export function Ids() {
  // prettier-ignore
  return <g><path d="M7 9L25 9A1 1 0 0 1 26 10L26 22A1 1 0 0 1 25 23L7 23A1 1 0 0 1 6 22L6 10A1 1 0 0 1 7 9ZM9.8 16A8.4 8.4 0 0 1 22.2 16M22.2 16A8.4 8.4 0 0 1 9.8 16M14.2 16A1.8 1.8 0 0 1 16 14.2A1.8 1.8 0 0 1 17.8 16A1.8 1.8 0 0 1 16 17.8A1.8 1.8 0 0 1 14.2 16Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `ips` — Intrusion prevention system. Ink 0.140, span 20.0. */
export function Ips() {
  // prettier-ignore
  return <g><path d="M7 9L25 9A1 1 0 0 1 26 10L26 22A1 1 0 0 1 25 23L7 23A1 1 0 0 1 6 22L6 10A1 1 0 0 1 7 9ZM9.8 16A8.4 8.4 0 0 1 22.2 16M22.2 16A8.4 8.4 0 0 1 9.8 16M9.8 21L22.2 11" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `link_encryption` — Link encryption device. Ink 0.085, span 22.0. */
export function LinkEncryption() {
  // prettier-ignore
  return <g><path d="M11 13L21 13A1 1 0 0 1 22 14L22 21A1 1 0 0 1 21 22L11 22A1 1 0 0 1 10 21L10 14A1 1 0 0 1 11 13ZM13 13A3 3 0 0 1 19 13M14.8 17A1.2 1.2 0 0 1 16 15.8A1.2 1.2 0 0 1 17.2 17A1.2 1.2 0 0 1 16 18.2A1.2 1.2 0 0 1 14.8 17ZM5 17.5L10 17.5M22 17.5L27 17.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `modem` — Modem. Ink 0.097, span 22.0. */
export function Modem() {
  // prettier-ignore
  return <g><path d="M6 12L26 12A1 1 0 0 1 27 13L27 19A1 1 0 0 1 26 20L6 20A1 1 0 0 1 5 19L5 13A1 1 0 0 1 6 12ZM9 16C11 12.4 13 12.4 15 16C17 19.6 19 19.6 23 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `wireless_modem` — Wireless modem. Ink 0.118, span 22.0. */
export function WirelessModem() {
  // prettier-ignore
  return <g><path d="M6 14L26 14A1 1 0 0 1 27 15L27 21A1 1 0 0 1 26 22L6 22A1 1 0 0 1 5 21L5 15A1 1 0 0 1 6 14ZM9 18C11 14.4 13 14.4 15 18C17 21.6 19 21.6 23 18M22 14L22 10M20.01 8.33A2.6 2.6 0 0 1 23.99 8.33M18.48 7.04A4.6 4.6 0 0 1 25.52 7.04" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `wireless_router` — Wireless router. Ink 0.117, span 20.0. */
export function WirelessRouter() {
  // prettier-ignore
  return <g><path d="M6.5 17.4A9.5 2.8 0 0 1 16 14.6A9.5 2.8 0 0 1 25.5 17.4A9.5 2.8 0 0 1 16 20.2A9.5 2.8 0 0 1 6.5 17.4ZM6.5 17.4L6.5 23.4M25.5 17.4L25.5 23.4M6.5 23.4A9.5 2.8 0 0 0 25.5 23.4M21 15.8L21 11M18.86 9.2A2.8 2.8 0 0 1 23.14 9.2M17.32 7.91A4.8 4.8 0 0 1 24.68 7.91" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `remote_access_server` — Remote access server. Ink 0.129, span 18.6. */
export function RemoteAccessServer() {
  // prettier-ignore
  return <g><path d="M14 7L23 7A1 1 0 0 1 24 8L24 24A1 1 0 0 1 23 25L14 25A1 1 0 0 1 13 24L13 8A1 1 0 0 1 14 7ZM14.5 10L22.5 10M14.5 12.6L22.5 12.6M5.4 16L13 16M11.29 16.83L13 16L11.29 15.17" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /><path d="M8.6 7L8.6 25" fill="none" stroke="currentColor" strokeWidth={1.3} strokeDasharray="1.9 1.7" strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `terminal_server` — Terminal server. Ink 0.110, span 18.0. */
export function TerminalServer() {
  // prettier-ignore
  return <g><path d="M10 7L19 7A1 1 0 0 1 20 8L20 24A1 1 0 0 1 19 25L10 25A1 1 0 0 1 9 24L9 8A1 1 0 0 1 10 7ZM10.5 10L18.5 10M23.4 12L23.4 21M20 12L23.4 12M20 15L23.4 15M20 18L23.4 18M20 21L23.4 21" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `power_over_ethernet` — Power over Ethernet injector. Ink 0.080, span 22.0. */
export function PowerOverEthernet() {
  // prettier-ignore
  return <g><path d="M10 12L22 12A1 1 0 0 1 23 13L23 20A1 1 0 0 1 22 21L10 21A1 1 0 0 1 9 20L9 13A1 1 0 0 1 10 12ZM5 16.5L9 16.5M23 16.5L27 16.5M17.4 13.6L13.6 17.2L16.2 17.2L14.4 19.8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `server` — Server. Ink 0.103, span 20.0. */
export function Server() {
  // prettier-ignore
  return <g><path d="M12 6L21 6A1 1 0 0 1 22 7L22 25A1 1 0 0 1 21 26L12 26A1 1 0 0 1 11 25L11 7A1 1 0 0 1 12 6ZM12.5 9.4L19.5 9.4M12.5 12.4L19.5 12.4M12.5 15.4L19.5 15.4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `application_server` — Application server. Ink 0.129, span 20.0. */
export function ApplicationServer() {
  // prettier-ignore
  return <g><path d="M12 6L21 6A1 1 0 0 1 22 7L22 25A1 1 0 0 1 21 26L12 26A1 1 0 0 1 11 25L11 7A1 1 0 0 1 12 6ZM12.6 14L19.4 14L19.4 21L12.6 21ZM12.6 16.2L19.4 16.2M12.5 9.4L19.5 9.4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `database_server` — Database server. Ink 0.125, span 20.8. */
export function DatabaseServer() {
  // prettier-ignore
  return <g><path d="M8.5 8A7.5 2.8 0 0 1 16 5.2A7.5 2.8 0 0 1 23.5 8A7.5 2.8 0 0 1 16 10.8A7.5 2.8 0 0 1 8.5 8ZM8.5 8L8.5 23.2M23.5 8L23.5 23.2M8.5 23.2A7.5 2.8 0 0 0 23.5 23.2M8.5 15.6A7.5 2.8 0 0 0 23.5 15.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `configuration_server` — Configuration server. Ink 0.126, span 19.4. */
export function ConfigurationServer() {
  // prettier-ignore
  return <g><path d="M9 6L18 6A1 1 0 0 1 19 7L19 22A1 1 0 0 1 18 23L9 23A1 1 0 0 1 8 22L8 7A1 1 0 0 1 9 6ZM9.5 9.4L17.5 9.4M9.5 12.4L17.5 12.4M18.6 20A3.4 3.4 0 0 1 22 16.6A3.4 3.4 0 0 1 25.4 20A3.4 3.4 0 0 1 22 23.4A3.4 3.4 0 0 1 18.6 20ZM22 14.6L22 16.6M22 23.4L22 25.4M16.6 20L18.6 20M25.4 20L27 20" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `virtual_machine_server` — Virtual machine server. Ink 0.132, span 20.0. */
export function VirtualMachineServer() {
  // prettier-ignore
  return <g><path d="M6 13L21 13L21 24L6 24ZM8.5 10.5L23.5 10.5M23.5 10.5L23.5 21.5M11 8L26 8M26 8L26 19" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `uninterruptible_power_supply` — Uninterruptible power supply. Ink 0.114, span 19.0. */
export function Ups() {
  // prettier-ignore
  return <g><path d="M9 8L23 8L23 25L9 25ZM11.5 8L11.5 6L14 6L14 8M18 8L18 6L20.5 6L20.5 8M17.5 12L13 17.5L16 17.5L14 22" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `security_information_and_event_management_system` — SIEM. Ink 0.111, span 21.4. */
export function Siem() {
  // prettier-ignore
  return <g><path d="M16 5L25 8.6L25 15.4C25 21 21 24.6 16 26.4C11 24.6 7 21 7 15.4L7 8.6ZM11 19.6L21 19.6M12.4 19.6L12.4 15.6M16 19.6L16 13M19.6 19.6L19.6 16.4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `ip_camera` — IP camera. Ink 0.113, span 20.0. */
export function IpCamera() {
  // prettier-ignore
  return <g><path d="M7 10L19 10A1 1 0 0 1 20 11L20 18A1 1 0 0 1 19 19L7 19A1 1 0 0 1 6 18L6 11A1 1 0 0 1 7 10ZM20 11L26 8.5L26 20.5L20 18ZM13 19L13 24M9 24L17 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `door_access_door_control_unit` — Door access control unit. Ink 0.124, span 20.0. */
export function DoorControlUnit() {
  // prettier-ignore
  return <g><path d="M6 6L19 6L19 26L6 26ZM16.6 15L16.6 17M19 15.5L21 15.5M21.8 12L25.2 12A0.8 0.8 0 0 1 26 12.8L26 18.2A0.8 0.8 0 0 1 25.2 19L21.8 19A0.8 0.8 0 0 1 21 18.2L21 12.8A0.8 0.8 0 0 1 21.8 12ZM22.2 14.2L24.8 14.2M22.2 16.4L24.8 16.4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `building_automation_management_systems` — Building automation system. Ink 0.145, span 19.9. */
export function BuildingAutomation() {
  // prettier-ignore
  return <g><path d="M6 8L18 8L18 26L6 26ZM12 8L12 26M6 17L18 17M19.1 20A3.4 3.4 0 0 1 22.5 16.6A3.4 3.4 0 0 1 25.9 20A3.4 3.4 0 0 1 22.5 23.4A3.4 3.4 0 0 1 19.1 20ZM22.5 20L22.5 17.2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `network_printer` — Network printer. Ink 0.125, span 20.0. */
export function NetworkPrinter() {
  // prettier-ignore
  return <g><path d="M7 13L25 13A1 1 0 0 1 26 14L26 20A1 1 0 0 1 25 21L7 21A1 1 0 0 1 6 20L6 14A1 1 0 0 1 7 13ZM10 13L10 8L22 8L22 13M10 21L10 25L22 25L22 21M23 15.6L25 15.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `historian` — Process historian. Ink 0.120, span 21.0. */
export function Historian() {
  // prettier-ignore
  return <g><path d="M8.5 7.8A7.5 2.8 0 0 1 16 5A7.5 2.8 0 0 1 23.5 7.8A7.5 2.8 0 0 1 16 10.6A7.5 2.8 0 0 1 8.5 7.8ZM8.5 7.8L8.5 23.2M23.5 7.8L23.5 23.2M8.5 23.2A7.5 2.8 0 0 0 23.5 23.2M11.5 18.6L14.5 15.4L17.5 17L20.5 13.6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `clock` — Time source. Ink 0.102, span 20.0. */
export function Clock() {
  // prettier-ignore
  return <g><path d="M6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16A10 10 0 0 1 16 26A10 10 0 0 1 6 16ZM16 6L16 7.6M26 16L24.4 16M16 26L16 24.4M6 16L7.6 16M16 16L16 9.6M16 16L20.6 18.2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}

/** CSET `cloud` — Cloud / external network. Ink 0.072, span 20.9. */
export function Cloud() {
  // prettier-ignore
  return <g><path d="M8.5 22A4.6 4.6 0 0 1 9.6 13.2A6.2 6.2 0 0 1 20.4 11A5 5 0 0 1 25 16.4A3 3 0 0 1 24.2 22Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" /></g>;
}
