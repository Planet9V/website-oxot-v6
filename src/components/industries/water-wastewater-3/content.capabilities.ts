/**
 * WATER & WASTEWATER — ITERATION 3, S08. Product capabilities, data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * L278-288, the brief's "Product capabilities" table plus its closing
 * paragraph. All SEVEN rows, in the brief's own order, both columns verbatim.
 * None added, none dropped, no clause rewritten or expanded.
 *
 * NOTHING HERE IS GLOSSED. Unlike `content.technology.ts`, whose source prints
 * bare term lists that needed a clause each, this table already carries its own
 * value column — the brief says what each capability does for a water utility.
 * Writing a second sentence beside it would be an unsourced claim about the
 * product, which is the one thing a capabilities section must not invent.
 *
 * `Bilingual` via `same()`, per registry.ts: both locales render and `nl` is a
 * marked placeholder pending translation, not a claim of correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export interface Capability {
  /** The brief's left column, L280-286. */
  name: Bilingual;
  /** The brief's right column, "Water and wastewater value", verbatim. */
  value: Bilingual;
}

export const CAPABILITY_ITEMS: Capability[] = [
  {
    name: same("Process and treatment model"),
    value: same(
      "Represents source-to-tap or influent-to-effluent pathways, chemical treatment, pumps, tanks, biological systems, disinfection, and key operating boundaries"
    )
  },
  {
    name: same("Field-estate and telemetry model"),
    value: same(
      "Maps pump stations, lift stations, reservoirs, wells, remote RTUs, modems, radio/cellular links, and their operational dependencies"
    )
  },
  {
    name: same("SCADA and control-path model"),
    value: same(
      "Links PLCs, RTUs, VFDs, HMIs, SCADA, historians, engineering workstations, alarms, and remote support to the process they control"
    )
  },
  {
    name: same("Hydraulic and process-consequence model"),
    value: same(
      "Helps reason through operational effects such as overflow, low pressure, loss of treatment, loss of monitoring, aeration upset, or dosing deviation"
    )
  },
  {
    name: same("Cyber pathway and change simulation"),
    value: same(
      "Tests segmentation, secure remote access, controller hardening, SCADA changes, radio/cellular network changes, and recovery controls before live deployment"
    )
  },
  {
    name: same("Resilience and recovery view"),
    value: same(
      "Identifies dependencies on power, communications, staffing, clean backups, manual operation, chemicals, spares, and external integrators"
    )
  },
  {
    name: same("Evidence and assurance output"),
    value: same(
      "Provides traceable risk decisions, architecture views, operational evidence, and regulatory/board-ready reporting from one model"
    )
  }
];

/* L288, verbatim — the brief's own closing paragraph for this section. */
export const CAPABILITIES_CLOSE = same(
  "The OXOT Cyber Digital Twin supports facility-physics, asset, network, data-fusion, and governance layers, along with synchronized P&ID, Purdue, network, dependency-graph, and 3D views. It can produce risk deltas, BOM outputs, engineering visualizations, and compliance-oriented technical files."
);
