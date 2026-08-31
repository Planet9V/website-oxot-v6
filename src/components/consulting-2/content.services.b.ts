/**
 * CONSULTING SERVICES — services 04–06, for `/consulting`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/6_consulting/
 * consulting.md — service 04 L302–L336, service 05 L340–L374, service 06
 * L378–L411. Every exported string carries the source line it was transcribed
 * from. Nothing is invented.
 *
 * ONE SHAPE, ONE LIST. `ConsultingService` is imported from
 * `./content.services.a` rather than redeclared: the brief writes all six
 * services to one identical skeleton — buyer quote, lead paragraph, "What we
 * do" bullets, "What you receive" list, "Best for" bullets, CTA — and the split
 * across two files is an authoring boundary only. Nothing may present 04–06 as
 * a second tier, a later phase or an upsell; the source draws no such line, and
 * the six render through one component in one running order.
 *
 * "WHAT YOU RECEIVE" IS A LIST, NOT A FLOW. L319, L357 and L395 are fenced
 * `text` blocks, but they carry no arrows, no numbering and no stated order —
 * they are deliverable inventories. Modelled as plain string arrays so nothing
 * downstream mistakes a code fence for a pipeline and draws a diagram of it.
 * The same warning applies with force to L325's "Implementation roadmap and
 * evidence pack" and L363's "Improvement maturity path": each NAMES a sequence
 * as a deliverable, and neither supplies one. No steps, stages or maturity
 * levels exist to be drawn.
 *
 * ZERO NUMERIC CLAIMS. No percentage, currency, duration, headcount, count of
 * sites, customer name or certification appears in L302–L411. The only numerals
 * below are the service indices ("04"–"06") and the standard designations the
 * source itself names — IEC 62443 (L351) and NIS2 (L372). Nothing here supports
 * a timeline, a bar length, a score or a comparison between the three services.
 *
 * NOT CLAIMED: that any sector listed under "Best for" (L330–L334, L369–L372,
 * L406–L409) is an existing OXOT customer. Those bullets describe the reader,
 * not a reference list, and the brief names no customer anywhere on the page.
 * L344's hedge ("written so that the smallest, oldest, or most constrained site
 * can actually implement it") and L401's ("Optional ongoing support
 * arrangement") ship exactly as written.
 *
 * NO CITATIONS IN THIS RANGE. Services 04–06 carry none. The nearby citations at
 * L433 and L498 belong to other sections, are expiring presigned S3 URLs, and
 * are excluded from the site entirely — see ./content.iec and
 * ./content.commitments. None is borrowed to decorate a service here.
 */
import { PATHS } from "@/components/shell/nav";
import { same } from "./content";
import type { ConsultingService } from "./content.services.a";

export const SERVICES_B = [
  {
    id: "remote-access",
    /** Source L302 — "### 04 — Secure Remote Access". */
    index: "04",
    title: same("Secure Remote Access"),
    /** Source L304. Curly quotation marks are the source's. */
    buyerQuote: same("“Stop the risk in vendor access.”"),
    /** Source L306. Em dash is the source's. */
    lead: same(
      "The OEM, integrator, maintainer, or specialist still gets the access they need—through a route you can approve, observe, revoke, and defend."
    ),
    whatWeDo: [
      /** Source L310. */
      same(
        "Map every remote-support route: vendor portals, VPNs, jump hosts, cellular gateways, maintenance laptops, cloud tools, OEM tunnels, and engineering paths."
      ),
      /** Source L311. */
      same(
        "Identify which routes can reach control systems, safety-related functions, critical equipment, configuration tools, or sensitive operational data."
      ),
      /** Source L312. */
      same(
        "Separate required support access from persistent or unnecessary exposure."
      ),
      /** Source L313. */
      same(
        "Design brokered, named-user, MFA-protected, approved, time-limited, recorded, asset-specific access."
      ),
      /** Source L314. */
      same(
        "Test controls against maintenance, diagnostic, update, emergency-recovery, and vendor-support workflows."
      ),
      /** Source L315. */
      same(
        "Define accountabilities, approvals, logging, access expiry, emergency paths, and evidence requirements."
      )
    ],
    whatYouReceive: [
      /** Source L320. */
      same("Remote-access inventory and pathway map"),
      /** Source L321. */
      same("Vendor and integrator access-risk assessment"),
      /** Source L322. */
      same("Future-state access architecture"),
      /** Source L323. */
      same("Required operational-support flow model"),
      /** Source L324. */
      same("Session approval and accountability design"),
      /** Source L325. Names a roadmap; supplies no steps. */
      same("Implementation roadmap and evidence pack")
    ],
    bestFor: [
      /** Source L330. */
      same("Plants with legacy vendor VPNs or persistent support connections."),
      /** Source L331. */
      same(
        "Rail signaling, CBTC, PTC, depot, or traction-power support environments."
      ),
      /** Source L332. */
      same("Water and wastewater remote telemetry or integrator access."),
      /** Source L333. */
      same("Data-center BMS/EPMS, generator, cooling, or OEM support."),
      /** Source L334. */
      same(
        "Defense/government facilities requiring sovereign or air-gapped access patterns."
      )
    ],
    /** Source L336. */
    cta: same("Discuss secure remote access"),
    /** Resolved, not transcribed — L336 states no destination. See
     *  `ConsultingService.ctaHref` (./content.services.a). */
    ctaHref: PATHS.contact
  },
  {
    id: "baseline",
    /** Source L340 — "### 05 — OT Security Baseline". */
    index: "05",
    title: same("OT Security Baseline"),
    /** Source L342. Curly quotation marks are the source's. */
    buyerQuote: same("“Set a floor every site can meet.”"),
    /** Source L344. The hedge is the source's and ships intact. */
    lead: same(
      "One minimum OT-security standard, written so that the smallest, oldest, or most constrained site can actually implement it."
    ),
    whatWeDo: [
      /** Source L348. */
      same(
        "Establish the minimum technical, operational, governance, access, asset, backup, monitoring, and supplier controls expected across the estate."
      ),
      /** Source L349. */
      same(
        "Define what is mandatory, what is conditional, and what must be documented as an exception."
      ),
      /** Source L350. */
      same(
        "Create maturity steps that do not punish sites for genuine operational or lifecycle constraints."
      ),
      /** Source L351. IEC 62443 is the source's own standard designation. */
      same(
        "Align the baseline to IEC 62443 concepts, relevant sector obligations, and customer risk appetite."
      ),
      /** Source L352. */
      same(
        "Translate policy language into checkable engineering and operating practices."
      ),
      /** Source L353. */
      same(
        "Build a repeatable evidence model so the baseline is not only self-attested."
      )
    ],
    whatYouReceive: [
      /** Source L358. */
      same("Estate-wide OT security baseline"),
      /** Source L359. */
      same("Minimum-control catalogue"),
      /** Source L360. */
      same("Site applicability and exception model"),
      /** Source L361. */
      same("Evidence requirements"),
      /** Source L362. */
      same("Assessment and review criteria"),
      /** Source L363. Names a maturity path; supplies no levels. */
      same("Improvement maturity path"),
      /** Source L364. */
      same("Governance and ownership structure")
    ],
    bestFor: [
      /** Source L369. */
      same(
        "Multi-site industrial, utility, water, transportation, or government estates."
      ),
      /** Source L370. */
      same("Organizations that have policy but no practical OT baseline."),
      /** Source L371. */
      same(
        "Acquirers integrating multiple sites or inherited control environments."
      ),
      /** Source L372. NIS2 and IEC 62443 are the source's own designations. */
      same(
        "Operators preparing for NIS2, IEC 62443, customer, insurer, or board scrutiny."
      )
    ],
    /** Source L374. */
    cta: same("Discuss an OT security baseline"),
    /** Resolved, not transcribed — L374 states no destination. See
     *  `ConsultingService.ctaHref` (./content.services.a). */
    ctaHref: PATHS.contact
  },
  {
    id: "capability-transfer",
    /** Source L378 — "### 06 — Capability Transfer". */
    index: "06",
    title: same("Capability Transfer"),
    /** Source L380. Curly quotation marks are the source's. */
    buyerQuote: same("“Make us able to run it ourselves.”"),
    /** Source L382. */
    lead: same(
      "An engagement designed to end, because scarce OT expertise should remain in your team."
    ),
    whatWeDo: [
      /** Source L386. */
      same(
        "Build the Twin collaboratively with customer engineering, operations, security, safety, product, procurement, and assurance teams."
      ),
      /** Source L387. */
      same(
        "Explain the reasoning behind prioritization, controls, pathways, and risk decisions."
      ),
      /** Source L388. */
      same(
        "Create practical working methods for reviewing changes, suppliers, vulnerabilities, access, and exceptions."
      ),
      /** Source L389. */
      same(
        "Develop decision templates, evidence standards, and repeatable governance routines."
      ),
      /** Source L390. Curly apostrophe is the source's. */
      same(
        "Run scenario workshops and tabletop exercises using the customer’s own modeled environment."
      ),
      /** Source L391. Em dash is the source's. */
      same(
        "Hand over the model, evidence structure, and decision logic—not only a report."
      )
    ],
    whatYouReceive: [
      /** Source L396. */
      same("Customer-owned model and evidence structure"),
      /** Source L397. */
      same("Working procedures and decision templates"),
      /** Source L398. */
      same("Scenario and change-review workshops"),
      /** Source L399. */
      same(
        "Training for engineering, security, operations, and governance teams"
      ),
      /** Source L400. */
      same("Defined handover and operating model"),
      /** Source L401. The source's hedge "Optional" is load-bearing and ships. */
      same("Optional ongoing support arrangement")
    ],
    bestFor: [
      /** Source L406. */
      same("Teams building internal OT-security ownership."),
      /** Source L407. */
      same(
        "Organizations with a small central security team and distributed operational assets."
      ),
      /** Source L408. */
      same(
        "Customers who want an external assessment to become internal capability."
      ),
      /** Source L409. */
      same(
        "Sovereign, defense, and government environments where long-term operational control is essential."
      )
    ],
    /** Source L411. */
    cta: same("Discuss capability transfer"),
    /** Resolved, not transcribed — L411 states no destination. See
     *  `ConsultingService.ctaHref` (./content.services.a). */
    ctaHref: PATHS.contact
  }
] satisfies readonly ConsultingService[];

/* GAP, FLAGGED NOT FILLED: the source states no duration, price, team shape,
   prerequisite or entry condition for any of these three services, and gives no
   rule for choosing between them. None is invented, and no empty slot is drawn
   for one — an unbuilt INTERACTION earns a visible placeholder; absent FACTS
   earn silence. */
