/**
 * WATER & WASTEWATER — ITERATION 3, S02. Architecture data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * in the oxot_website_public_sept repo; every `L<n>` below is a line number
 * there. Nothing is invented: a stage exists because the brief's architecture
 * blocks (L106-123, L127-146) name it, an overlay term exists because the
 * brief's overlay list (L54-57) or the architecture block names it at that
 * stage, and a consequence exists because the brief attaches it to that stage.
 * Where the brief attaches none, `impact` is `null` and the section says so in
 * words rather than filling the hole.
 *
 * THIS SECTION CARRIES BOTH SELECTORS, and the hero carries neither.
 *   · the four-view switcher — L62 "Water process / OT / SCADA paths / Cyber
 *     route / Public-health / compliance impact"
 *   · the drinking-water / wastewater system selector — L102
 * The hero is a strict single-path Pattern 1 view of `DOSING_SCENARIO`. Putting
 * a four-way switcher there would give a reader two different interactive
 * diagrams of the same subject before they have read a sentence.
 *
 * ONE SHARED LAYER, DRAWN ONCE. L102 requires the two diagrams to "share common
 * SCADA layers". They are literally shared here: `SHARED_LAYERS` is one record,
 * rendered identically under both stacks, and the fact that it does not change
 * when the system changes is a thing the drawing is meant to show. `ownControl`
 * carries the small remainder each block adds on top of it —
 *   L119 drinking:   PLCs · RTUs · VFDs · HMIs · SCADA · historian · lab systems
 *   L145 wastewater: PLCs · RTUs · SCADA · HMI · historian · alarms · telemetry
 * whose intersection is `SHARED_LAYERS.control` and whose differences are the
 * two `ownControl` strings. The split is arithmetic on the brief's own lists,
 * not an editorial judgement.
 *
 * `grade` IS SCHEMATIC AND SAYS SO ON THE PAGE. It is a relative hydraulic
 * position on a 1-6 scale so the section can fall through a treatment barrier
 * and be lifted again at a pump — it is not an elevation, and no elevation
 * exists in the source. `ProcessCanvas` prints that caveat as visible text.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export type SystemId = "drinking" | "wastewater";
export type ViewId = "process" | "ot" | "cyber" | "impact";

export interface ArchStage {
  id: string;
  name: Bilingual;
  /** Relative hydraulic position, 1 (lowest) to 6 (highest). Schematic. */
  grade: number;
  /** Marks a riser that is a pumped lift rather than a fall through a barrier. */
  lift?: boolean;
  /** VIEW `process` — the brief's own equipment list for this stage. */
  equipment: Bilingual;
  /** VIEW `ot` — the overlay controls (L54-57) the brief places at this stage. */
  ot: Bilingual;
  /** VIEW `impact` — `null` where the brief traces no consequence to the stage.
   *  See the header: an untraced stage is reported, never filled. */
  impact: Bilingual | null;
}

/** One marker on the cyber route. `anchor` is where it is drawn. */
export interface RouteStep {
  id: string;
  anchor: { kind: "band"; band: "comms" | "control" } | { kind: "stage"; stageId: string };
  label: Bilingual;
}

export interface ArchSystem {
  id: SystemId;
  label: Bilingual;
  /** L45-46 and L48-49, verbatim — the brief's own path line for this system. */
  path: Bilingual;
  stages: ArchStage[];
  /** What this system's control block adds on top of `SHARED_LAYERS.control`. */
  ownControl: Bilingual;
  route: {
    title: Bilingual;
    /** The brief row this route is transcribed from. */
    provenance: Bilingual;
    steps: RouteStep[];
    /** The brief's own "Decision the Twin supports" for that row. */
    decision: Bilingual;
  };
}

/* ── The layers both stacks share, defined once ──────────────────────────── */

export const SHARED_LAYERS = {
  control: {
    caption: same("SCADA and control, shared"),
    /* The intersection of L119 and L145 — every term both architecture blocks
       list. This band does not change when the system selector changes. */
    text: same("PLCs · RTUs · SCADA · HMIs · historian"),
    note: same(
      "Identical under both stacks. These five appear in the source's drinking-water control block and in its wastewater control block, which is what makes the layer shared rather than merely similar."
    )
  },
  comms: {
    caption: same("Telemetry, communications and remote access"),
    /* L122's communications list, plus the two overlay terms L57 names for the
       sector as a whole. */
    text: same(
      "Plant LAN · radio · cellular · private WAN · fiber · leased lines · VPN · remote engineering access"
    ),
    /* Stated rather than assumed: L122 sits under the drinking-water block, and
       it is generalised to both here on the strength of L85 (remote assets
       across the sector communicate by radio, cellular, leased line, satellite
       or internet-connected remote access) and L93 (integrators and OEMs
       remotely support field equipment sector-wide). */
    note: same(
      "The source writes this list under drinking water. It is drawn under both because the source also states, of the sector as a whole, that remote assets communicate over radio, cellular, leased-line, satellite or internet-connected remote access, and that integrators and vendors support that equipment remotely."
    )
  }
};

/* ── The four views ──────────────────────────────────────────────────────── */

export const VIEWS: { id: ViewId; label: Bilingual; summary: Bilingual }[] = [
  {
    id: "process",
    label: same("Water process"),
    summary: same("The physical stages and the equipment the source places at each one.")
  },
  {
    id: "ot",
    label: same("OT / SCADA paths"),
    summary: same(
      "The same section with the control layer reaching every stage, and the overlay controls the source places at each one."
    )
  },
  {
    id: "cyber",
    label: same("Cyber route"),
    summary: same(
      "One sector route, transcribed from the source's own scenario register, traced from the remote-access layer to the stage it reaches."
    )
  },
  {
    id: "impact",
    label: same("Public-health / compliance impact"),
    summary: same(
      "What the source says a compromise at each stage costs the water, the environment or the permit — and which stages it traces nothing to."
    )
  }
];

/* ── The two stacks ──────────────────────────────────────────────────────── */

export const SYSTEMS: ArchSystem[] = [
  {
    id: "drinking",
    label: same("Drinking water"),
    /* L45-46, verbatim. */
    path: same("Source → intake → treatment → clearwell → pumping → distribution → customers"),
    stages: [
      {
        id: "source",
        name: same("Source / raw water"),
        grade: 6,
        /* L107 */
        equipment: same("Rivers · reservoirs · groundwater wells · intakes"),
        /* L55 pump controls and analysers, L57 telemetry, L152 RTUs — placed
           here because L77 names loss of SOURCE monitoring as a distinct
           drinking-water consequence, so source monitoring exists. */
        ot: same("Intake pump controls · source analysers · RTUs · telemetry"),
        /* L77 */
        impact: same("Loss of source monitoring")
      },
      {
        id: "treatment",
        name: same("Treatment"),
        grade: 3,
        /* L111-112 */
        equipment: same(
          "Screens · coagulation · flocculation · sedimentation · filtration · disinfection · pH adjustment · fluoridation · clearwell"
        ),
        /* L55 chemical dosing skids and analysers, L119 PLCs and HMIs, L211's
           PLC-controlled dosing skid and local HMI. */
        ot: same("Chemical dosing skids · analysers · PLCs · local HMIs"),
        /* L77 */
        impact: same(
          "Inadequate disinfection · excessive chemical dosing · inability to confirm water quality"
        )
      },
      {
        id: "distribution",
        name: same("Storage and distribution"),
        grade: 6,
        lift: true,
        /* L115-116 */
        equipment: same(
          "High-service pumps · reservoirs · tanks · pressure zones · PRVs · booster stations · meters · pressure / chlorine residual monitoring"
        ),
        /* L55 pump controls, L119 VFDs, L115-116 PRVs and the monitoring pair,
           L152 RTUs. */
        ot: same("Pump controls · VFDs · PRVs · pressure and chlorine-residual monitoring · RTUs"),
        /* L77 loss of pressure; L178 adds the rest of this row. */
        impact: same(
          "Loss of pressure · tank overflow · pressure transient · possible contamination ingress risk"
        )
      }
    ],
    /* L119 minus the shared five. */
    ownControl: same("Adds VFDs and laboratory systems"),
    route: {
      /* L174, the brief's own scenario row, and the same chain the worked
         example at S07 renders in full — this page tells one drinking-water
         story, not two. */
      title: same("Drinking-water chemical dosing manipulation"),
      provenance: same("Source scenario register, chemical-dosing row; modelled chain."),
      steps: [
        {
          id: "d1",
          anchor: { kind: "band", band: "comms" },
          /* L243 */
          label: same("Compromised vendor credentials / remote-support endpoint")
        },
        {
          id: "d2",
          anchor: { kind: "band", band: "comms" },
          /* L245 */
          label: same("Maintenance network route")
        },
        {
          id: "d3",
          anchor: { kind: "band", band: "control" },
          /* L247 */
          label: same("Chemical-dosing PLC or engineering workstation becomes reachable")
        },
        {
          id: "d4",
          anchor: { kind: "band", band: "control" },
          /* L249 */
          label: same("Setpoint, logic, mode, or pump-state manipulation becomes possible")
        },
        {
          id: "d5",
          anchor: { kind: "stage", stageId: "treatment" },
          /* L251 */
          label: same("Inadequate or excessive disinfection / loss of treatment verification")
        },
        {
          id: "d6",
          anchor: { kind: "stage", stageId: "treatment" },
          /* L253 */
          label: same("Water-quality event, emergency response, service disruption, public-health risk")
        }
      ],
      /* L174, decision column. */
      decision: same(
        "Map control points and safety barriers; test restricted engineering access and segment chemical systems."
      )
    }
  },
  {
    id: "wastewater",
    label: same("Wastewater"),
    /* L48-49, verbatim. */
    path: same(
      "Collection → lift station → headworks → biological treatment → disinfection → effluent / reuse → receiving water"
    ),
    stages: [
      {
        id: "collection",
        name: same("Collection system"),
        grade: 2,
        /* L129 */
        equipment: same("Gravity sewer · force main · lift station · wet well · level instrumentation"),
        /* L176 names the remote RTU, VFD, level sensor and communications path
           of a lift station; L57 radio/cellular links. */
        ot: same("Lift-station RTUs · level instrumentation · VFDs · radio / cellular links"),
        /* L77 sewer overflow and pump-station failure; L176 adds the release. */
        impact: same("Sewer overflow · pump-station failure · sewage release · property damage")
      },
      {
        id: "headworks",
        name: same("Headworks and primary treatment"),
        grade: 6,
        lift: true,
        /* L132 */
        equipment: same("Screens · grit removal · primary clarifiers · pumps"),
        /* L55 pump controls applied to L132's equipment; L145 PLCs. */
        ot: same("Screen, grit and pump controls · PLCs"),
        /* HONEST GAP. L77's wastewater consequence list is: untreated
           discharge, sewer overflow, pump-station failure, aeration disruption,
           permit exceedance, damage to biological treatment, inability to
           maintain compliant effluent. Every one of those is claimed by the
           collection, biological or tertiary stage on the brief's own wording.
           Nothing in the source attaches a consequence to headworks. Assigning
           "untreated discharge" here would be a plausible inference and an
           unsourced one, so the section reports the gap instead. */
        impact: null
      },
      {
        id: "biological",
        name: same("Biological treatment"),
        grade: 5,
        /* L135-136 */
        equipment: same(
          "Aeration blowers · basins · DO / ammonia / nitrate analysers · RAS / WAS pumps · clarifiers · nutrient removal controls"
        ),
        /* L177 PLC / VFD / blower control and the dissolved-oxygen loop; L135
           analysers; L157 blowers. */
        ot: same("Blower and RAS / WAS pump VFDs · DO / ammonia / nitrate analysers · PLCs"),
        /* L77 aeration disruption and damage to biological treatment; L177 adds
           nitrification failure, elevated ammonia and permit exceedance. */
        impact: same(
          "Aeration disruption · nitrification failure · elevated ammonia · permit exceedance · prolonged recovery"
        )
      },
      {
        id: "tertiary",
        name: same("Tertiary treatment and disinfection"),
        grade: 4,
        /* L139 */
        equipment: same("Filtration · UV · chlorine / dechlorination · reuse systems"),
        /* L157 UV banks and chlorinators; L145 PLCs. */
        ot: same("UV bank and chlorinator controls · dechlorination dosing · PLCs"),
        /* L77 untreated discharge and inability to maintain compliant effluent;
           L302 ties effluent quality to the environmental duty. */
        impact: same("Untreated discharge · inability to maintain compliant effluent")
      },
      {
        id: "solids",
        name: same("Solids and biosolids"),
        grade: 2,
        /* L142 */
        equipment: same("Thickening · digestion · dewatering · biogas · storage / disposal"),
        /* L142's equipment with L156's biogas instrumentation. */
        ot: same("Thickening, dewatering and digester controls · biogas methane / H₂S analysers"),
        /* HONEST GAP, same rule as headworks. The source lists the solids train
           in the architecture block and lists biogas methane/H₂S among
           wastewater instrumentation, and traces no cyber consequence to
           either. Reported, not filled. */
        impact: null
      }
    ],
    /* L145 minus the shared five. */
    ownControl: same("Adds alarms and remote telemetry"),
    route: {
      /* L176, the brief's own scenario row. */
      title: same("Wastewater lift-station outage"),
      provenance: same("Source scenario register, lift-station row."),
      steps: [
        {
          id: "w1",
          anchor: { kind: "band", band: "comms" },
          /* L176, pathway column, verbatim. */
          label: same(
            "Remote RTU, VFD, level sensor, or communications path is unavailable or manipulated"
          )
        },
        {
          id: "w2",
          anchor: { kind: "band", band: "control" },
          /* Placement, not a new claim: L145 puts RTUs and remote telemetry in
             the wastewater control block, so that is where the path above
             lands. */
          label: same("The remote RTU and its telemetry are the reachable control point")
        },
        {
          id: "w3",
          anchor: { kind: "stage", stageId: "collection" },
          /* L176, impact column, verbatim. */
          label: same(
            "Wet-well overflow, sewage release, property damage, emergency callout, environmental reporting"
          )
        }
      ],
      /* L176, decision column. */
      decision: same(
        "Identify reachable field assets, power and telemetry dependencies, and safe fallback controls."
      )
    }
  }
];

/* ── The OT view's own two notes ──────────────────────────────────────────────
 *
 * REAL DUTCH, NOT `same()`. Every other string in this file is an English
 * placeholder wrapped in `same()` pending translation, and copying that pattern
 * for new strings would deepen a debt rather than pay it. These two are written
 * in Dutch because they are new and there is no reason for them to arrive
 * already owing a translation.
 */

/** Above the Purdue frame, where the long-section's scroll note goes. */
export const OT_FRAME_NOTE = {
  en: "The drawing scrolls sideways on a narrow screen. Every element, level, zone and connection in it is also listed as text for screen readers, and the controls at each process stage are listed below.",
  nl: "De tekening schuift zijwaarts op een smal scherm. Elk element, elk niveau, elke zone en elke verbinding erin staat ook als tekst voor schermlezers, en de besturing per processtap staat hieronder."
};

/** Under the Purdue frame. States what the drawing asserts, and what it does not. */
export const PURDUE_NOTE = {
  en: "Purdue reference architecture, L5 down to L0, with the industrial DMZ drawn as its own level 3.5 rather than folded into the levels either side of it. Every asset states its IEC 62443 zone. Levels 5 to 2 are the same assets in both systems — that is the shared SCADA layer, drawn rather than asserted; levels 1 and 0 are what differs. Tags, labels and process zones below level 2 name the same loops as the treatment P&ID, so the two drawings describe one plant.",
  nl: "Purdue-referentiearchitectuur, van L5 tot L0, met de industriële DMZ als eigen niveau 3.5 in plaats van opgenomen in de niveaus eromheen. Elk asset noemt zijn IEC 62443-zone. De niveaus 5 tot en met 2 zijn in beide systemen dezelfde assets — dat is de gedeelde SCADA-laag, getekend in plaats van beweerd; de niveaus 1 en 0 zijn wat verschilt. Tags, labels en proceszones onder niveau 2 noemen dezelfde regelkringen als het P&ID van de zuivering, zodat beide tekeningen één installatie beschrijven."
};

/** Printed under the drawing, because a schematic grade must not read as data. */
export const SCHEMATIC_NOTE = same(
  "Relative hydraulic position, schematic and not to scale. The source gives no elevations; the fall and the lift are drawn to show which stages are gravity-fed and which are pumped."
);

/** L161, verbatim — what the Twin combines, printed once beneath the section. */
export const TWIN_NOTE = same(
  "The OXOT Twin can combine P&IDs, process and equipment data, PLC/SCADA/RTU/HMI configurations, network topology, passive traffic evidence, industrial protocol information, and operational safety/reliability inputs."
);

/** Shown where a stage has no `impact`. Named here so the wording is one
 *  string rather than two components' worth of near-identical prose. */
export const UNTRACED_IMPACT = same(
  "The source traces no water-quality or permit consequence to this stage. It carries the shared control-layer dependency only."
);
