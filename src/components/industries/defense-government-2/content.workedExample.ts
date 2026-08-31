/**
 * WORKED EXAMPLE — CORPUS L187–L217, verbatim.
 *
 * See `content.ts`'s docblock for the sourcing account (CORPUS = the live
 * page's own content module, the only surviving record of the lost
 * `industry_defence.md`; BRIEF = `industry_defense_airgap.md`).
 *
 * `tag` IS A CLAIM BOUNDARY AND IS MANDATORY ON RENDER. "Illustrative scenario
 * — no operational, customer, or classified data" is the site-wide rule (Visual
 * Foundation Spec L402: "Every scenario must state: Illustrative scenario — no
 * customer data") carrying this page's own two extra exclusions. It must be
 * visible beside the scenario, not buried, not `sr-only`, not deferred to a
 * page footer. A worked example on a defense and government page without its
 * claim boundary on screen is the single worst failure available on this page.
 *
 * THE SCENARIO IS SYNTHETIC BY CONSTRUCTION and must stay that way. It names no
 * country, no service, no base, no agency, no vendor, and no product. Anything
 * a later builder adds to "make it concrete" — a nation, a real OEM, a site
 * name, a plausible-looking asset tag — converts an illustration into a claim
 * about a real facility. Visual Foundation Spec L531 bars exactly this for
 * defense material.
 *
 * NO FIGURE APPEARS ANYWHERE IN THIS FILE, and none may be added: no hours of
 * autonomy, no litres of fuel, no kW, no percentage, no cost, no restoration
 * time. Visual Foundation Spec L403 bars them without approved inputs, and
 * neither source states one. The endurance question here is answered with a
 * decision, not a number — which is the point `result` is making.
 *
 * SHAPE: `scenario` sets the situation, `inputs` are the three evidence
 * categories a real engagement would need, `chain` is the six-step cascade,
 * `controls` are six candidate options each with what it evaluates and what it
 * costs or gains, and `result` states what the engagement actually produces.
 * `controls` is the shape Pattern 2 (Three-Gate Ledger) reads as its Proposed
 * control column; note that no control is marked recommended or default in the
 * source, and marking one would be OXOT choosing the customer's control for
 * them on a sovereignty page.
 */
import { same } from "../registry";

export const WORKED_EXAMPLE = {
  /** CORPUS L188. */
  h2: same(
    "Worked example: preserve a sovereign operations center through a compound power and cyber event."
  ),
  /** CORPUS L189. Mandatory on render — see this file's docblock. */
  tag: same("Illustrative scenario — no operational, customer, or classified data"),
  /* CORPUS L190–L192, verbatim, including its own quotes around "insecure."
     The closing question is the whole example's hinge and must not be trimmed
     when a renderer wants a shorter intro. BRIEF L49 is the one-sentence
     version of this same scenario. */
  scenario: same(
    'A sovereign government operations center supports crisis coordination and hosts sensitive digital services. It has dual utility feeds, UPS systems, generators, fuel storage, BMS, EPMS, secure communications, and a controlled vendor-support arrangement for generator and electrical-management systems. The facility is designed for loss of a utility feed. However, the support vendor\'s remote connection reaches a facilities engineering workstation that has access paths toward BMS/EPMS management systems. At the same time, regional disruption creates a realistic risk of utility instability and delayed fuel deliveries. The question is not merely whether the vendor path is "insecure." It is: can the facility sustain essential operations through a grid event if the control and recovery pathway is compromised at the same time?'
  ),

  /* CORPUS L193–L197, all three categories, both cells each.
     `id` is DOM identity, not copy. */
  inputs: [
    {
      id: "mission-continuity",
      /** CORPUS L194. */
      category: same("Mission and continuity evidence"),
      items: same(
        "Essential-government functions supported, minimum operating requirements and prioritized service tiers, alternate-site and workload-transfer assumptions, crisis staffing and escalation authority, continuity plans and recovery objectives."
      )
    },
    {
      id: "facility-ot-engineering",
      /** CORPUS L195. */
      category: same("Facility and OT engineering evidence"),
      items: same(
        "Single-line electrical diagrams, utility-feed/generator/UPS/battery/transfer-switch dependencies, fuel storage and burn rate, BMS/EPMS architecture, HVAC/access-control/fire-life-safety dependencies, MOPs, SOPs, EOPs, maintenance records."
      )
    },
    {
      id: "cyber-access-path",
      /** CORPUS L196. */
      category: same("Cyber and access-path evidence"),
      items: same(
        "Vendor remote support, jump hosts, privileged accounts, MFA and session controls, engineering workstations, BMS/EPMS servers, controllers and relays, IT/OT segmentation, firmware, certificates, backups, recovery media."
      )
    }
  ],

  /* CORPUS L198–L205, all six steps, in source order. ORDER IS THE CONTENT: the
     chain runs from the compound trigger to the leadership decision it forces,
     and the point of steps 3–5 is that the failure is a cascade rather than an
     incident. Do not reorder, and do not drop the middle to shorten it. */
  chain: [
    same("Regional utility instability + compromised vendor remote-support endpoint"),
    same("Facilities engineering path becomes reachable"),
    same("BMS/EPMS visibility or generator-control-management functions are impaired"),
    same("Standby-power response and operator situational awareness are degraded"),
    same("Fuel, cooling, secure communications, and critical-service capacity become constrained"),
    same("Essential-government workload prioritization and alternate-site decisions are triggered")
  ],

  /* CORPUS L206–L213, all six options, all three cells each.
     NOTE THE FIRST OPTION'S OUTCOME: removing all remote vendor access is
     listed with a real downside ("may create recovery risk"). That is the
     section's honesty, not an editing slip — a renderer must not present these
     six as a menu of improvements, and must not sort them by apparent
     desirability. None is marked recommended in the source. */
  controls: [
    {
      id: "remove-remote-access",
      /** CORPUS L207, all three cells. */
      option: same("Remove all remote vendor access"),
      evaluates: same(
        "Impact on fault diagnosis, emergency generator support, and repair time during a prolonged disruption"
      ),
      outcome: same(
        "Reduces exposure but may create recovery risk if local expertise or spares are insufficient"
      )
    },
    {
      id: "sovereign-brokered-access",
      /** CORPUS L208, all three cells. */
      option: same("Introduce sovereign brokered access"),
      evaluates: same(
        "Named accounts, MFA, local authorization, just-in-time access, session recording, command restrictions, and access expiry"
      ),
      outcome: same("Retains controlled support without a persistent external pathway")
    },
    {
      id: "segment-facility-management",
      /** CORPUS L209, all three cells. */
      option: same("Segment facility-management systems"),
      evaluates: same(
        "Separate vendor access, engineering tools, BMS/EPMS, electrical-control management, monitoring, and protected operations networks"
      ),
      outcome: same(
        "Shows which control and monitoring flows must remain while closing high-consequence routes"
      )
    },
    {
      id: "local-recovery-independence",
      /** CORPUS L210, all three cells. */
      option: same("Create local recovery independence"),
      evaluates: same(
        "Tested clean backups, local configuration repositories, offline runbooks, break-glass procedures, manual control capability, and trained local staff"
      ),
      outcome: same("Reduces reliance on a network, vendor, or cloud service during crisis")
    },
    {
      id: "fuel-logistics-resilience",
      /** CORPUS L211, all three cells. */
      option: same("Improve fuel and logistics resilience"),
      evaluates: same(
        "Change fuel stock, delivery contracts, alternate suppliers, route assumptions, or generator priority policy"
      ),
      outcome: same(
        "Reveals whether the actual endurance constraint is cyber, fuel, staffing, cooling, or utility restoration"
      )
    },
    {
      id: "reprioritize-essential-services",
      /** CORPUS L212, all three cells. */
      option: same("Reprioritize essential services"),
      evaluates: same(
        "Service tiers, capacity constraints, alternate-site failover, and protected workloads"
      ),
      outcome: same(
        "Provides leadership with a transparent, pre-agreed restoration and load-priority decision"
      )
    }
  ],

  /* CORPUS L214–L216. The opening clause ("not a generic security
     recommendation") is doing real work — it is the sentence that distinguishes
     this section from a findings report — and must not be cut as throat-
     clearing. */
  result: same(
    "The result is not a generic security recommendation. It is a sovereign continuity plan: isolate the reachable management path, retain controlled support under national authority, prove local recovery can work without external access, and prioritize fuel, power, cooling, communications, and workloads according to mission effect."
  )
  /* GAP, FLAGGED NOT FILLED: neither source states a recommended sequence for
     the six controls, an implementation window, a validation condition, or a
     responsible role — the four fields Pattern 2's Decision output column
     expects (OXOT_Layout_Styles.md, Three-Gate Ledger). A builder using that
     pattern here must source those from `DECISIONS`/`ENGAGEMENT` or render the
     column with its fixed supporting copy only; it must not invent them. */
};
