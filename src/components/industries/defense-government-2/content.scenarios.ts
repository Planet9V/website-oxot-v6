/**
 * DEFENSE AND GOVERNMENT SCENARIOS — CORPUS L158–L175, verbatim. Ten rows.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * EVERY ROW HAS THE SAME THREE-BEAT SHAPE, and it is the section's argument
 * rather than a table convention: `event` → `cascade` → `decision`. The event
 * is deliberately modest, the cascade is the second- and third-order effect,
 * and the decision is what OXOT is actually for. A renderer that shows only the
 * title and the event turns the section into a threat list, which is the exact
 * register the intro line rejects.
 *
 * THESE TEN ARE NOT THE MISSION × PRESSURE GRID, and must not be presented as
 * results for it. `content.sovereignModel.ts` carries a 6 × 7 selector whose 42
 * outcomes no source supplies; re-keying these ten narrative rows onto that
 * grid would require deciding, unsourced, which mission and which pressure each
 * belongs to — and would then leave 32 combinations still empty. See that
 * file's docblock.
 *
 * BRIEF L47 summarises this section in one line ("Power/generator disruption;
 * airfield or port operations; secure data-center resilience; telecom loss;
 * fuel/logistics delay; high-risk supplier withdrawal; cyber-plus-weather or
 * physical disruption") — seven of the ten. The CORPUS's ten are the finished
 * set; the BRIEF names no scenario the CORPUS lacks.
 *
 * `id` is DOM identity, not copy — anything wiring aria-controls or a URL
 * fragment off these must not derive them from array position.
 */
import { same } from "../registry";

export const SCENARIOS = {
  /** CORPUS L159. */
  h2: same("Rehearse the cascade, not just the cyber event."),
  /** CORPUS L160–L162. */
  intro: same(
    "Every scenario begins with a modest cyber or physical disruption and reveals the second- and third-order dependency effects."
  ),
  /* Column headers for the three cells each row carries. The CORPUS states the
     cells but no header text; these name what is already in the data. */
  eventLabel: same("Event"),
  cascadeLabel: same("Cascade"),
  decisionLabel: same("What the Twin tests"),
  items: [
    {
      id: "base-power-generator",
      /** CORPUS L164, all four cells. */
      title: same("Base power and generator-control disruption"),
      event: same(
        "A remote-support route, maintenance laptop, or exposed controller reaches generator, switchgear, BMS, or EPMS management systems."
      ),
      cascade: same(
        "Grid loss occurs; standby generation is delayed, unavailable, or poorly visible; secure services, fuel operations, communications, and operations-center capacity degrade."
      ),
      decision: same(
        "Test vendor access, segmentation, manual fallback, clean backups, generator-start dependencies, fuel prioritization, and recovery sequence."
      )
    },
    {
      id: "airfield-support-outage",
      /** CORPUS L165, all four cells. */
      title: same("Airfield support-system outage"),
      event: same(
        "Cyber disruption affects airfield lighting control, fuel-system automation, hangar power, weather/communications support, or facilities controls."
      ),
      cascade: same(
        "Flight operations are restricted; maintenance and turnaround slow; ground support, safety, and operational readiness are affected."
      ),
      decision: same(
        "Identify safe operating modes, isolate support systems, and prioritize restoration by mission effect."
      )
    },
    {
      id: "port-maritime-logistics",
      /** CORPUS L166, all four cells. */
      title: same("Port / maritime logistics disruption"),
      event: same(
        "A pathway reaches crane controls, shore power, gate systems, fuel/warehouse automation, perimeter systems, or logistics data exchange."
      ),
      cascade: same(
        "Cargo and military mobility slow; vessel support and loadout are delayed; alternate routes and assets become constrained."
      ),
      decision: same(
        "Model OT and commercial dependencies, recovery order, alternatives, and supplier/logistics bottlenecks."
      )
    },
    {
      id: "sovereign-data-center-common-mode",
      /** CORPUS L167, all four cells. */
      title: same("Sovereign data-center common-mode event"),
      event: same(
        "BMS, EPMS, cooling, UPS, or remote-access dependency is compromised during a power or thermal incident."
      ),
      cascade: same(
        "A shared dependency consumes redundancy; mission workloads, public services, or restricted enclaves lose capacity or must shift under constraints."
      ),
      decision: same(
        "Test isolation, independent monitoring, capacity preservation, controlled support, and workload-recovery priorities."
      )
    },
    {
      id: "telecom-timing-degradation",
      /** CORPUS L168, all four cells. */
      title: same("Telecom and timing degradation"),
      event: same(
        "Carrier route, time service, radio/satellite link, network-management plane, or telecom power system is disrupted."
      ),
      cascade: same(
        "Remote sites lose telemetry/support; secure coordination, incident response, or field operations are impaired."
      ),
      decision: same(
        "Identify common routes, independent local operation, alternative communications, and recovery triggers."
      )
    },
    {
      id: "fuel-logistics-disruption",
      /** CORPUS L169, all four cells. */
      title: same("Fuel and logistics disruption"),
      event: same(
        "Supplier system, route, fleet management, depot OT, port/rail interface, or contractor access is disrupted."
      ),
      cascade: same(
        "Generators, vehicles, aircraft, ships, or emergency systems face delayed refueling/maintenance; crisis endurance falls."
      ),
      decision: same(
        "Model stock, consumption, route alternatives, criticality, supplier concentration, and replenishment sequence."
      )
    },
    {
      id: "maintenance-munitions-support",
      /** CORPUS L170, all four cells. */
      title: same("Maintenance and munitions-support disruption"),
      event: same(
        "Compromise reaches industrial process controls, test equipment, warehouse automation, quality/traceability systems, or engineering tooling."
      ),
      cascade: same(
        "Maintenance cycle slows; safety/quality assurance is impaired; readiness and replenishment are affected."
      ),
      decision: same(
        "Test segmentation, engineering access, update paths, recovery evidence, and process-specific priorities."
      )
    },
    {
      id: "vendor-withdrawal-high-risk-component",
      /** CORPUS L171, all four cells. */
      title: same("Vendor withdrawal / high-risk component exposure"),
      event: same("A supplier is sanctioned, unavailable, compromised, or classified as high risk."),
      cascade: same(
        "Remote support, firmware updates, spares, certificates, and replacement components become unavailable at once."
      ),
      decision: same(
        "Identify inherited exposure, substitutes, stockpile needs, migration sequence, and mission impact."
      )
    },
    {
      id: "hybrid-cyber-plus-physical",
      /** CORPUS L172, all four cells. */
      title: same("Hybrid event: cyber plus physical disruption"),
      event: same(
        "Cyber incident coincides with storm, sabotage, utility outage, flood, civil disturbance, or communications failure."
      ),
      cascade: same(
        "Staffing, access, power, logistics, sensor data, and command coordination are simultaneously constrained."
      ),
      decision: same(
        "Simulate the combined event, define minimum operating requirements, and validate the cross-sector recovery plan."
      )
    },
    {
      id: "cross-domain-access-failure",
      /** CORPUS L173, all four cells. */
      title: same("Cross-domain access failure"),
      event: same(
        "Privileged or vendor access crosses a boundary between general administration and restricted/sovereign services."
      ),
      cascade: same(
        "Sensitive-system exposure, policy breach, constrained incident response, or loss of trust in the isolation boundary."
      ),
      decision: same(
        "Test access architecture, logging, session restrictions, support procedures, and evidence of separation."
      )
    }
  ]
  /* GAP, FLAGGED NOT FILLED: no source gives any of the ten a likelihood, a
     severity band, a NOW/NEXT/NEVER status, a duration, or a named threat
     actor. None is invented — and on this page a fabricated attribution would
     be a security claim, not a presentational flourish. If a builder needs the
     rows ranked, the only honest ordering is the source's own. */
};
