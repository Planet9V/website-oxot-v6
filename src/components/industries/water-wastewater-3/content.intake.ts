/**
 * S11 · FINAL CTA — THE QUALIFICATION INTAKE FIELDS.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * L337-367 in the oxot_website_public_sept repo. Every option below is
 * transcribed from that list; none is paraphrased, reordered or dropped.
 *
 * SEVEN CONTROLS, FROM SIX SOURCE BULLETS. "Name and work email" (L339) is one
 * bullet naming two values, so it renders as two inputs — the second
 * `type="email"`, which buys real browser validation the source cannot state.
 * That gives four text inputs and three selects. The Component Inventory's
 * generic short-form archetype suggests fewer; this brief is the content
 * authority for THIS page and it specifies all three qualification selects with
 * their full option lists, so all three are built.
 *
 * The section's heading, lead and both CTA labels are NOT here — they are
 * `FINAL_CTA` in content.ts, which Wave 0 fixed as the contract for this
 * section. Restating them would create a second, divergent copy.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export const INTAKE = {
  /* Group A — L339-341. The three "who is asking" bullets. */
  groupA: same("A · Who is asking"),
  /* Group B — L342-367. The three qualification selects. */
  groupB: same("B · Which water system, and which decision"),

  fields: {
    name: same("Name"),
    namePlaceholder: same("Full name"),
    email: same("Work email"),
    emailPlaceholder: same("name@utility.example"),
    organization: same("Organization"),
    organizationPlaceholder: same("Utility, authority, or integrator"),
    role: same("Role"),
    rolePlaceholder: same("Operations, engineering, IT/OT, or executive"),
    systemType: same("System type"),
    scope: same("Scope"),
    decision: same("Decision to evaluate"),
    choose: same("Select one")
  },

  /* L342-349, verbatim. */
  systemTypeOptions: [
    same("Drinking water"),
    same("Wastewater"),
    same("Combined water / wastewater utility"),
    same("Regional authority"),
    same("Municipal public works"),
    same("Engineering integrator"),
    same("Other")
  ] satisfies Bilingual[],

  /* L350-357, verbatim. */
  scopeOptions: [
    same("Treatment plant"),
    same("Pump or lift-station network"),
    same("Wells / reservoirs / booster stations"),
    same("SCADA / control-room environment"),
    same("Chemical dosing or disinfection system"),
    same("Telemetry / radio / cellular network"),
    same("Multi-site utility")
  ] satisfies Bilingual[],

  /* L358-367, verbatim. */
  decisionOptions: [
    same("Publicly exposed PLC / RTU"),
    same("Vendor remote access"),
    same("SCADA or network segmentation"),
    same("Chemical-dosing or disinfection control"),
    same("Lift-station / pump-station resilience"),
    same("Ransomware recovery and manual operations"),
    same("Modernization / capital investment"),
    same("NIS2, AWIA, ERP, or assurance evidence"),
    same("Other")
  ] satisfies Bilingual[],

  /* The stated note. There is no submission endpoint in this repository, so the
     form says so on the page rather than pretending to post. Same convention as
     water-wastewater-2's intake. */
  formLabel: same("Qualification intake"),
  formNote: same(
    "This intake is illustrative and is not yet connected to a submission endpoint. To start the conversation now, use"
  )
};
