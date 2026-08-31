/**
 * S11 · PRODUCT CAPABILITIES — content slice for
 * `/industries/hyperscale-data-centers-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_hyperscale.md L432–L450. The section is a headline (L436), a
 * two-column table nine rows deep (L438–L448), and one closing paragraph with a
 * citation (L450). Every string below carries the source line it came from.
 * Nothing is invented, nothing is summarised, and no tenth row exists.
 *
 * NOTHING HERE COMES FROM THE LIVE PAGE. `/industries/hyperscale-data-centers`
 * (iteration 1) was neither read nor imported while this file was written.
 *
 * THE TABLE'S TWO COLUMN HEADERS ARE NOT TRANSCRIBED AS DATA, and that is a
 * decision rather than an omission. The source's header row reads
 * "Capability | Hyperscale value" — labels for table CELLS. The consuming
 * component renders these nine rows as an index rail, not a table, so there are
 * no cells for those labels to name; printing them above a rail would caption a
 * structure that is not on the page. Both columns' CONTENT is transcribed in
 * full below, which is what the source actually carries.
 *
 * CLAIM RULE IN FORCE (OXOT_Visual_Foundation_Spec.md L401, and source L458's
 * own stricter standing instruction). Not one numeric figure, percentage, money
 * value or annual-loss figure appears in this file. The capacity row mentions
 * SLA/customer impact and the assurance row mentions NIS2-oriented requirements
 * because the source's own rows do — both stay in the source's framing of what
 * the model RELATES or what evidence it GENERATES, and neither is turned into a
 * compliance, certification or assurance outcome. The word "verified" appears
 * nowhere.
 *
 * `Bilingual`-typed via `same()` (../registry): `nl` is a same-as-English
 * placeholder pending translation, not a claim of correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { LINKS, TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY } from "./content";

/* ── Section header ─────────────────────────────────────────────────────── */

export const CAPABILITIES_SECTION = {
  id: "capabilities",
  /** The section's ordinal on the page — a fact about the page, not the campus. */
  index: "11",
  /** `Rule.tsx` L52's own name for this body. */
  datumLabel: same("Product capabilities"),
  /** Source L436, verbatim. */
  heading: same("One model from facility control to tenant-impact decision.")
};

/* ── The nine capabilities, source L440–L448 ────────────────────────────── */

export interface Capability {
  /** The source table's first column. Bold in the source; that emphasis is
   *  carried by the rendered heading level, not by markup transcribed as text. */
  name: Bilingual;
  /** The source table's second column, headed "Hyperscale value" at L439. */
  value: Bilingual;
}

/**
 * Nine rows, in the source's own order, both columns verbatim.
 *
 * SEVEN OF THE NINE NAME A MODEL and the remaining two name what the model is
 * exercised for — simulation and evidence. That is the whole reason this
 * section, alone on this page, carries a figure: the reader is being told nine
 * times that the product is one model, under a headline that says so in words,
 * so a render of that model's own layered architecture depicts the row content
 * rather than decorating it. See `Capabilities.tsx`.
 *
 * NO SECOND SENTENCE IS ADDED TO ANY ROW. The source's value column already
 * says what each capability is worth to a hyperscale operator; a component must
 * render these two fields and write nothing further.
 */
export const CAPABILITIES: readonly Capability[] = [
  {
    /** Source L440. */
    name: same("Electrical-system and power-path model"),
    value: same(
      "Connects utility feeds, switchgear, relays, generators, UPS, batteries, transfer equipment, PDUs, and IT load to redundancy and common-mode dependencies"
    )
  },
  {
    /** Source L441. */
    name: same("Mechanical and thermal model"),
    value: same(
      "Represents chiller plants, cooling towers, pumps, heat exchangers, CRAH/CRAC units, liquid cooling, CDUs, water treatment, and thermal operating limits"
    )
  },
  {
    /** Source L442. The source spaces the slashes in this row's NAME
     *  ("BMS / EPMS / DCIM") and leaves them unspaced inside the value clauses;
     *  both are kept as written rather than normalised to one house style. */
    name: same("BMS / EPMS / DCIM control model"),
    value: same(
      "Links supervisory platforms, controllers, field devices, configuration paths, alarm dependencies, engineering workstations, and command/monitoring flows"
    )
  },
  {
    /** Source L443. */
    name: same("Network and access-path model"),
    value: same(
      "Models IT/OT zones, vendor access, remote support, management/OOB networks, identity dependencies, virtual firewalls, and actual route reachability"
    )
  },
  {
    /** Source L444. */
    name: same("Capacity and consequence model"),
    value: same(
      "Translates facility/control disruptions into redundancy consumption, thermal exposure, hall capacity loss, load-shedding risk, SLA/customer impact, and recovery requirements"
    )
  },
  {
    /** Source L445. */
    name: same("External dependency model"),
    value: same(
      "Relates power, water, fuel, telecoms, cloud platforms, customers, vendors, construction, weather, and logistics to each campus/site"
    )
  },
  {
    /** Source L446. */
    name: same("Supply-chain and provenance model"),
    value: same(
      "Uses SBOM, HBOM, CBOM, SaaS-BOM, and operations BOM views for firmware, hardware, certificates, suppliers, support tools, roles, and maintenance workflows"
    )
  },
  {
    /** Source L447. */
    name: same("Change and recovery simulation"),
    value: same(
      "Tests access changes, segmentation, firmware rollouts, controller replacements, commissioning transitions, failover, and recovery before implementation"
    )
  },
  {
    /** Source L448. */
    name: same("Assurance and sustainability evidence"),
    value: same(
      "Generates evidence for cyber risk management, NIS2-oriented requirements, internal resilience governance, and data-center energy/water reporting workflows"
    )
  }
];

/* ── The figure beside the rail ─────────────────────────────────────────── */

/**
 * ALT TEXT DESCRIBES THE RENDER, NOT THE SECTION. Restating the headline here
 * would leave a non-sighted reader knowing only that a picture exists; what the
 * picture actually shows is a specific seven-layer stack with named inputs and
 * named outputs, and every one of those names is legible in the file. Written
 * against the render itself (`public/images/cdt-architecture-light.png`,
 * inspected before this string was written), not against the section it sits in.
 */
export const FIGURE_ALT = same(
  "The OXOT Cyber Digital Twin's architecture drawn as seven stacked layers — facility physics, assets, interoperation, networks, data, service, and governance at the top — with DEXPI 2.0, P&ID and CycloneDX feeding equipment specs, facility physics and network topology into the lower layers, geo-political and threat intelligence entering at the service layer, continuous synchronization and data flow running vertically through the stack, and full-stack simulation and network topology resolving into a unified bill of materials at the right."
);

/* ── Closing paragraph, source L450 ─────────────────────────────────────── */

/**
 * THE SOURCE'S OWN LINK IS NOT EMITTED. L450 closes on a bracketed
 * `ppl-ai-file-upload.s3.amazonaws` URL — an expiring pre-signed S3 link to
 * `OXOT-CDT-Product-Specification-V2.pdf`, carrying an `Expires` parameter and a
 * scoped security token. Shipping it would put a link on the site that dies. The
 * document it names is OXOT's own CDT product specification and this site's real
 * page for that material is `/technical-specification`, so the citation resolves
 * there. Identical resolution to `content.architecture.ts`'s `PASSIVE_FIRST`
 * (L191) and `content.dependency.commercial.ts` (L284), which handle the same
 * dangling marker in their own sections.
 *
 * THE HREF IS READ FROM `LINKS`, NOT FROM `PATHS` DIRECTLY, so this page's one
 * verified route map stays the single place a route is decided.
 * `englishOnly` re-exports `content.ts`'s flag rather than restating the rule:
 * the consuming component must apply the site's established gate,
 * `englishOnly && locale !== "en" ? fallbackHref : href`, and clearing the flag
 * in `content.ts` the day that page renders `nl` retires the gate without this
 * file or the component being touched.
 *
 * THE SENTENCE IS TRANSCRIBED IN THE SOURCE'S OWN FRAMING AND EXTENDED IN NO
 * DIRECTION. It states what the OXOT specification IDENTIFIES and what it
 * SUPPORTS. It is not a claim that any BOM is populated, complete, audited or
 * certified for any customer, and no figure is attached to it. "Five BOM
 * categories" is the source's own count of a taxonomy it then names in full, not
 * a performance figure.
 */
export const CAPABILITIES_CLOSE = {
  /** Source L450, verbatim, including its unspaced em-dashes. */
  text: same(
    "The OXOT specification identifies five BOM categories—software/firmware, hardware, cryptographic, SaaS, and operational workflows—plus support for generated technical files, board reporting, interactive engineering views, and passive-first island, data-diode, or dedicated-instance deployments."
  ),
  citation: {
    label: same("See the Technical Specification"),
    href: LINKS.technicalSpecification,
    /** `/cyber-digital-twin` renders both locales — the site's established
     *  substitute wherever an EN-only page is linked from a bilingual one. */
    fallbackHref: LINKS.cyberDigitalTwin,
    englishOnly: TECHNICAL_SPECIFICATION_IS_ENGLISH_ONLY
  }
};
