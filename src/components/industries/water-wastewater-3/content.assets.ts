/**
 * WATER & WASTEWATER — ITERATION 3. Asset inventory, data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * in the oxot_website_public_sept repo. Every `L<n>` in the comments below is a
 * line number in that file. Nothing here is invented: an asset exists in this
 * list only because the brief names it, and every `criticality` tier is argued
 * from what the brief says a compromise of that asset does to the process — not
 * from how much prose the brief spends on it.
 *
 * FALSIFICATION CHECK (the gate this file had to pass): all NINE
 * `SystemAssetType` values are sourceable from the brief without fabricating an
 * asset. Result 9/9, so the asset-class section stays in the page plan. The
 * check is recorded here because a later reader deserves the count, not the
 * conclusion alone:
 *   process-equipment       L211 dosing skid, L157 chemical metering pumps
 *   field-device            L211 flow / residual / tank-level inputs, L155
 *   controller              L211 + L228 chemical-dosing PLC
 *   hmi                     L211 + L228 local HMI
 *   engineering-workstation L229 + L247
 *   network-device          L230 firewall / VLAN / gateway, L245
 *   remote-access           L211 integrator connection, L243
 *   safety-function         L211 high/low alarms, L219 interlocks, L264
 *   service                 L229 SCADA alarm dependencies, L152, L145 historian
 *
 * NO ASSET IN THE DOSING CHAIN IS `context`-TIER, and none was demoted to make
 * a third band render. The one `context` asset here — the historian — earns the
 * tier honestly: the brief lists it in both architecture stacks (L119, L145)
 * and in the capability table (L282), and gives it no control or consequence
 * role anywhere in the worked example. A renderer that needs three populated
 * bands gets three; it did not get them by reclassification.
 *
 * ZONES are the brief's own layers: "Treatment" (L110), "Control and
 * operations" (L118), "Plant LAN" (L122), the maintenance network (L211) and
 * the integrator's remote-support path (L211, L229).
 *
 * SYMBOLS, ADDED 2026-08-29. Twelve of these thirteen records now name a
 * specific published engineering mark in `symbol`, resolved by `assetGlyph` in
 * twin/AssetNode.tsx. `type` is untouched and still carries the asset CLASS;
 * what changed is that the class is no longer the only thing a reader sees.
 *
 * The reason is a defect an independent audit measured on the rendered page,
 * not a preference. Nine silhouettes were serving twelve nodes, so:
 *   · `chemical-metering-pump` and `hypochlorite-dosing-skid` are both
 *     `process-equipment` and drew the SAME open-topped cistern. A metering
 *     pump drawn as an open tank is a false statement about the plant.
 *   · `raw-water-flow-meter`, `chlorine-residual-analyser` and
 *     `chemical-tank-level-transmitter` are all `field-device` and drew the
 *     SAME circle-plus-waveform — three instrument loops, one mark, no tags.
 *
 * THREE NAMESPACES, AND EACH IS SOMEONE ELSE'S PUBLISHED WORK: `oxot/water/…`
 * for the two process marks (ISO 10628 forms drawn in twin/pid-hand-drawn.tsx
 * where no stencil exists), `isa/…` for the three instruments (ISA-5.1 bubbles
 * with real identification letters), `cset/…` for the seven IT/OT assets
 * (CISA/INL's CSET taxonomy, MIT). Nothing here is drawn for this page.
 *
 * EVERY ISA TAG IS READ OFF THIS SITE'S OWN WATER P&ID —
 * src/components/diagrams/specs/water-treatment-train.ts — so the worked
 * example and the P&ID name the same loops. That check is not ceremonial: it
 * is what caught `LT-601`, which tags the CLEARWELL, being proposed for the
 * chemical day tank. See that record.
 */
import type { SystemAsset } from "@/components/twin/types";

export const WATER_ASSETS: SystemAsset[] = [
  /* ── process-equipment ──────────────────────────────────────────────── */
  {
    id: "hypochlorite-dosing-skid",
    type: "process-equipment",
    /* The skid's chemical inventory is a CLOSED, VENTED day tank, and that is
       the equipment class ISO 10628 draws for it. The vent stem and the liquid
       level line are what now separate this from the metering pump below,
       which drew the identical open cistern until 2026-08-29. */
    symbol: "oxot/water/chemical_day_tank",
    label: "Sodium-hypochlorite dosing skid",
    description:
      "The PLC-controlled dosing skid at the centre of the worked example. Its output is the disinfection barrier itself, so a deviation is a water-quality deviation rather than a throughput one.",
    zone: "Treatment",
    /* L211: "a PLC-controlled sodium-hypochlorite dosing skid". CRITICAL —
       L174 puts under- or over-dosing, inadequate residual and a consumer
       water-quality event directly downstream of this equipment. */
    criticality: "critical"
  },
  {
    id: "chemical-metering-pump",
    type: "process-equipment",
    /* THE DEFECT THIS FIXES, NAMED: a metering pump drawn as an open-topped
       cistern is not a coarse icon, it is a false statement about the plant.
       ISO 10628's positive-displacement pump in its diaphragm form, with the
       diagonal stroke-adjust arrow IEC 60617 uses for an adjustable machine —
       and stroke is exactly what a metering pump is specified by, so the mark
       and the label now say the same thing. */
    symbol: "oxot/water/metering_pump",
    label: "Chemical metering pump and VFD",
    description:
      "The metering pump and its drive execute the dose the controller calls for, and report the pump status the dosing sequence depends on.",
    zone: "Treatment",
    /* L157 "chemical metering pumps"; L228 "VFD / metering-pump controls";
       L211 names "pump status" as a dosing-sequence input. IMPORTANT — L249
       includes "pump-state manipulation" in the modelled chain, but the
       consequence the brief traces runs through the skid's dose, not through
       this device on its own. */
    criticality: "important"
  },

  /* ── field-device ───────────────────────────────────────────────────── */
  {
    id: "chlorine-residual-analyser",
    type: "field-device",
    /* THE TAGS ON THESE THREE INSTRUMENTS ARE NOT INVENTED, and that is what
       makes them worth having. This site already publishes a water P&ID —
       src/components/diagrams/specs/water-treatment-train.ts — and every tag
       used here is READ OFF IT, so the worked example and the P&ID name the
       same loops rather than telling two stories about one plant.
       `AIT-601` is that drawing's free chlorine residual (L338), the
       measurement `AIC-601` controls the dose from. */
    symbol: "isa/discrete/field/AIT-601",
    label: "Chlorine-residual analyser",
    description:
      "Closes the dosing loop and is the measurement an operator uses to confirm the disinfection barrier is working.",
    zone: "Treatment",
    /* L211 "chlorine-residual feedback"; L155 lists chlorine residual as water
       quality instrumentation; L221 "Residual-monitoring points and sampling
       requirements". CRITICAL — L175 makes loss of this reading its own
       scenario: the utility "cannot confirm residual" and may need a
       boil-water or operational response even with treatment intact. */
    criticality: "critical"
  },
  {
    id: "raw-water-flow-meter",
    type: "field-device",
    /* `FT-101` is the P&ID's raw-water flow transmitter at the intake (L218) —
       the feed-forward term L211 says the dosing sequence relies on. */
    symbol: "isa/discrete/field/FT-101",
    label: "Incoming-flow meter",
    description:
      "Paces the dose against incoming flow. Without it the control narrative loses its feed-forward term.",
    zone: "Treatment",
    /* L211 "The dosing sequence relies on incoming flow"; L155 lists flow.
       IMPORTANT — an input to the sequence, but the brief attaches no
       standalone consequence to its loss. */
    criticality: "important"
  },
  {
    id: "chemical-tank-level-transmitter",
    type: "field-device",
    /* `LT-501`, AND THE PROPOSAL THAT SAID `LT-601` WAS WRONG — checked against
       the P&ID rather than taken on trust. `LT-601` is that drawing's CLEARWELL
       level (L332, on `T-601`); this asset is the level of the hypochlorite day
       tank, which the same drawing tags `T-501` (L311), alongside the metering
       pump `P-501` (L318). Tagging it 601 would have put a loop number on the
       wrong vessel — the identical class of error as drawing a metering pump as
       a tank, committed while fixing it. The chlorine-dosing area is the 501
       series, so this transmitter is `LT-501`. */
    symbol: "isa/discrete/field/LT-501",
    label: "Chemical-tank level transmitter",
    description:
      "Reports available hypochlorite inventory to the dosing sequence and to the high/low alarm conditions.",
    zone: "Treatment",
    /* L211 "chemical-tank level"; L155 lists level. IMPORTANT — feeds both the
       sequence and the alarms (L211), so it is more than context, but the
       brief traces no consequence from it alone. */
    criticality: "important"
  },

  /* ── controller ─────────────────────────────────────────────────────── */
  {
    id: "chemical-dosing-plc",
    type: "controller",
    /* CSET's own `plc` mark. The seven IT/OT assets below take `cset/…` slugs
       for the reason ./AssetNode.tsx's table records: CSET is CISA and Idaho
       National Laboratory's asset taxonomy for exactly this kind of drawing,
       where ISA-5.1 and ISO 10628 publish nothing at all. */
    symbol: "cset/plc",
    label: "Chemical-dosing PLC",
    description:
      "Runs the dosing sequence from flow, residual, pump status, tank level and alarm state. The scenario's target asset.",
    zone: "Control and operations",
    /* L211 "The PLC and local HMI are accessible through a maintenance
       network"; L228 "Chemical PLC"; L247 names it as what becomes reachable.
       CRITICAL — L249 puts setpoint, logic and mode manipulation here, and
       L184 records CISA's finding that exposed water-sector controllers have
       had passwords changed and operators locked out. */
    criticality: "critical"
  },

  /* ── hmi ────────────────────────────────────────────────────────────── */
  {
    id: "dosing-local-hmi",
    type: "hmi",
    symbol: "cset/hmi",
    label: "Local dosing HMI",
    description:
      "The panel an operator uses at the skid to read dosing state and intervene locally.",
    zone: "Control and operations",
    /* L211 "The PLC and local HMI"; L228 "local HMI". IMPORTANT — shares the
       maintenance-network exposure, and L177 shows a plant HMI as an
       alteration point in its own right, but the brief routes the dosing
       consequence through the PLC. */
    criticality: "important"
  },

  /* ── engineering-workstation ────────────────────────────────────────── */
  {
    id: "plant-engineering-workstation",
    type: "engineering-workstation",
    symbol: "cset/ews",
    label: "Plant engineering workstation",
    description:
      "The programming path to the dosing controller, reachable through the maintenance network's vendor-access route.",
    zone: "Control and operations",
    /* L229 "Engineering workstation and vendor-access route"; L247 names it
       co-equal with the PLC as what becomes reachable. CRITICAL — L263's
       hardening control turns on a "restricted programming path" and
       allowlisting known engineering assets, which only means anything if this
       machine is itself a takeover target. L179 makes engineering workstations
       an explicit ransomware objective in the sector.
       QA fix (2026-08-25): the description previously said this workstation
       "holds the PLC project files" — L229 (workstation/vendor-access route)
       and L231 (PLC project files) are separate brief statements the original
       draft joined into one claim the source never makes. Removed. */
    criticality: "critical"
  },

  /* ── network-device ─────────────────────────────────────────────────── */
  {
    id: "maintenance-network-firewall",
    type: "network-device",
    /* `cset/firewall`, not `cset/router` or `cset/switch`. The label names all
       three, but the firewall is the element every control in the worked
       example acts ON — L262's segmentation option and L213's "broad access"
       finding are both statements about the boundary, not about routing. */
    symbol: "cset/firewall",
    label: "Maintenance-network firewall and gateway",
    description:
      "The boundary between the integrator's support path and the plant network. Today it passes broad access rather than a defined conduit.",
    zone: "Maintenance network",
    /* L230 "Firewall, VLAN, routing, remote gateway, and observed OT traffic";
       L245 "Maintenance network route"; L213 records that the remote
       connection "has broad access to the plant network". IMPORTANT — it is
       the control point the segmentation option (L262) acts on, not itself a
       process asset whose compromise reaches water quality. */
    criticality: "important"
  },

  /* ── remote-access ──────────────────────────────────────────────────── */
  {
    id: "integrator-remote-support",
    type: "remote-access",
    symbol: "cset/remote-access-server",
    label: "System-integrator remote-support endpoint",
    description:
      "The integrator's remote troubleshooting connection into the maintenance network. The scenario's entry point, and the support route operations refuses to give up.",
    zone: "Vendor remote support",
    /* L211 "a system integrator's remote troubleshooting connection"; L243
       "Compromised vendor credentials / remote-support endpoint". CRITICAL —
       L180 makes vendor/integrator compromise a fleet-wide exposure in this
       sector, and L213 records operations' objection that the integrator
       supports faults, calibration and emergency recovery. */
    criticality: "critical"
  },

  /* ── safety-function ────────────────────────────────────────────────── */
  {
    id: "dosing-high-low-alarm",
    type: "safety-function",
    /* THE ONE ASSET HERE WITH NO `symbol`, AND IT IS A DECISION, NOT A GAP.
       Two candidates were considered and both rejected:
         · `pid/instruments/level_alarm` — resolvable only through the compiled
           stencil MANIFEST, which `AssetNode` must never import: it is 462,361
           bytes and both of this page's consumers sit under a `"use client"`
           boundary. Half a megabyte of client bundle for one mark is not a
           trade; see the note above `CURATED_SYMBOLS` in ./AssetNode.tsx.
         · `isa/plc/panel/LAHL-501` — correct notation, and it would resolve
           through the grammar. But ISA draws the PLC device class as a circle
           inscribed in a DIAMOND on the full 44-unit cell, which is the one
           outline family that overflows the 32-unit cell these consumers clip
           at, and its corners would land under `CriticalityMark`.
       So it keeps its hand-drawn octagon, which is not a consolation prize:
       AssetNode.tsx gives `safety-function` the only non-rect/circle silhouette
       in the set precisely so a safety asset is unmistakable, and that argument
       survives every other type getting a real published mark. */
    label: "Dosing high/low alarm and interlock",
    description:
      "The alarm and interlock conditions that bound the dose, run inside the same PLC sequence the scenario compromises.",
    zone: "Control and operations",
    /* L211 "high/low alarm conditions"; L219 "Dosing-control narrative and
       interlocks"; L264's fifth control is independent alarming and separate
       measurement verification. CRITICAL — L264 is explicit that this class of
       control is what "reduce[s] consequence if cyber protections fail".
       QA fix (2026-08-25): the description previously called this "the last
       automatic check between a manipulated setpoint and the clearwell" —
       L211 places these alarm conditions INSIDE the same PLC sequence the
       scenario's attack chain compromises, and L264 proposes independent
       alarming as a control to ADD, which only makes sense if today's
       interlock is not already an independent last check. The claim
       overstated a safety barrier on a page whose own Regulatory section
       states OXOT "does not promise automatic compliance" — replaced with
       what L211/L219 actually support. */
    criticality: "critical"
  },

  /* ── service ────────────────────────────────────────────────────────── */
  {
    id: "scada-alarm-server",
    type: "service",
    /* `cset/mtu` — the master terminal unit, which is what a SCADA master IS in
       CSET's taxonomy. `cset/server` would draw the box and lose the claim that
       this machine polls the field. */
    symbol: "cset/mtu",
    label: "SCADA server and alarm service",
    description:
      "Carries dosing state and alarms to the control room. The result message makes its continued function part of the accepted outcome, not a side effect.",
    zone: "Plant LAN",
    /* L229 "SCADA data flow and alarm dependencies"; L152 "SCADA servers";
       L268 "verify that SCADA and alarms still function". IMPORTANT — L175
       shows that losing SCADA alarms costs the utility its ability to confirm
       treatment state, but the dose itself is set at the PLC. */
    criticality: "important"
  },
  {
    id: "process-historian",
    type: "service",
    symbol: "cset/historian",
    label: "Process historian",
    description:
      "Retains the dosing and residual record the plant reasons and reports from after the fact.",
    zone: "Plant LAN",
    /* L119 and L145 list a historian in both architecture stacks; L282 names
       historians in the SCADA and control-path capability. CONTEXT — the brief
       gives the historian no control point, no interlock and no role in the
       modelled chain (L243-253) or the control table (L258-264). It is real
       sector architecture with no traced consequence, which is exactly what
       the tier is for. */
    criticality: "context"
  }
];
