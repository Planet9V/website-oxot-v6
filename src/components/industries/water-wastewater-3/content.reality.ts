/**
 * WATER & WASTEWATER — ITERATION 3. S01 Sector reality, plus the two external
 * citations S00 and S01 share. Data only.
 *
 * SOURCE: new_material_source/1_website_layout_v4/3_industries/industry_water.md
 * in the oxot_website_public_sept repo; every `L<n>` below is a line number in
 * that file. Nothing here is written for effect: each string is either the
 * brief's own sentence or a transcription of one of its table cells.
 *
 * WHY THE HERO'S CITATION LIVES IN A FILE NAMED `.reality`. Wave 1-A owns four
 * files and `content.ts` (Wave 0's, shared) is read-only, so the hero's ENISA
 * line had nowhere else to go that is not a fifth file. Putting it here is the
 * better outcome anyway rather than a workaround: BOTH external claims on this
 * half of the page now sit in one record with one URL each, so the hero and the
 * problem statement cannot end up citing the same body with two different
 * wordings or two different links.
 *
 * THE TWO CITATIONS DO DIFFERENT JOBS, and that is why the page carries both
 * without repeating itself:
 *   · ENISA NIS360 2026 (L5) — sector MATURITY. Why this sector needs the
 *     unusually direct messaging the brief opens by asking for. Rendered in the
 *     hero, as the evidence under the positioning claim.
 *   · CISA 2026 PLC advisory (L79) — sector ACTIVITY. What is actually
 *     happening to water-sector controllers right now. Rendered in S01, as the
 *     evidence under the problem statement.
 * Neither claim appears in the other section. If a later edit makes them
 * overlap, one of them is redundant and should be cut, not reworded.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

/* ── External sources ────────────────────────────────────────────────────── */

/**
 * L5's own link target. The brief cites the PDF directly rather than a landing
 * page, and it is left exactly as the brief has it — a citation that silently
 * retargets is no longer the source that was read.
 */
export const ENISA_NIS360_URL =
  "https://www.enisa.europa.eu/sites/default/files/2026-05/ENISA%20NIS360%202026.pdf";

/** L79 and L184 both cite this same advisory; one URL, cited once per claim. */
export const CISA_PLC_ADVISORY_URL =
  "https://www.cisa.gov/news-events/alerts/2026/07/30/cisa-urges-water-and-wastewater-systems-sector-protect-ot-against-activity-targeting-plcs";

/**
 * S00's evidence line.
 *
 * L5, TRANSCRIBED — and taken from the brief's PREAMBLE, not from its "Hero"
 * block (L28-37), which supplies a headline, a lead and two CTAs and no
 * citation at all. Flagged rather than smoothed over: this is a real editorial
 * decision, not a transcription. The sentence is the brief's own justification
 * for why this sector's page reads differently from Manufacturing's or
 * Energy's, which makes the hero the one place on the page where it is
 * load-bearing rather than decorative. Nothing about the claim is altered by
 * the move — same body, same finding, same link.
 */
export const ENISA_FINDING = {
  sourceLabel: same("ENISA NIS360, 2026"),
  finding: same(
    "ENISA's 2026 NIS360 assessment places drinking water and wastewater among the least mature sectors assessed, with drinking water somewhat ahead of wastewater."
  )
};

/* ── S01 · Sector reality ────────────────────────────────────────────────── */

/** L75-77, the brief's two body paragraphs, verbatim and in its own order. */
export const REALITY_BODY: Bilingual[] = [
  same(
    "Water systems are both highly physical and highly distributed. A utility may operate treatment plants, reservoirs, booster stations, lift stations, well fields, storage tanks, wastewater facilities, remote telemetry units, chemical systems, laboratories, and thousands of miles of distribution or collection infrastructure. Many assets operate unattended and communicate through radio, cellular, leased-line, satellite, or internet-connected remote-access arrangements."
  ),
  same(
    "The operational consequence is distinctive. In drinking water, the concern may be inadequate disinfection, excessive chemical dosing, loss of pressure, loss of source monitoring, or inability to confirm water quality. In wastewater, it may be untreated discharge, sewer overflow, pump-station failure, aeration disruption, permit exceedance, damage to biological treatment, or an inability to maintain compliant effluent."
  )
];

/** L79, verbatim. The section's one external claim. */
export const CISA_FINDING = {
  sourceLabel: same("CISA advisory, 30 July 2026"),
  finding: same(
    "CISA reported a significant increase in cyber actors targeting PLCs in the water and wastewater sector in 2026, including cases in which exposed controllers had passwords changed or IP addresses altered, locking operators out and disrupting operations."
  )
};

/**
 * L83-94 — the brief's ten-row challenge matrix, both columns transcribed.
 *
 * TEN ROWS, NOT A SELECTION. The brief writes ten and the page renders ten:
 * dropping the four that read least dramatically would leave a table that looks
 * like the brief's and is not, and a reader comparing the two would have no way
 * to tell which four were cut or why.
 */
export const CHALLENGE_HEAD: readonly Bilingual[] = [
  same("Challenge"),
  same("Why it is different in water and wastewater")
];

export const CHALLENGE_ROWS: readonly (readonly [Bilingual, Bilingual])[] = [
  [
    same("Distributed, unattended assets"),
    same(
      "Remote pump stations, lift stations, wells, reservoirs, tanks, and outfalls may be geographically dispersed and depend on low-bandwidth or intermittent communications"
    )
  ],
  [
    same("Direct physical-process consequences"),
    same(
      "A manipulated dosing skid, chlorine residual setpoint, pH controller, valve, pump, or aeration system can affect water quality, treatment performance, or environmental discharge"
    )
  ],
  [
    same("Public-health and environmental obligations"),
    same(
      "Operators must protect consumers and receiving waters while meeting regulatory, permit, monitoring, and reporting requirements"
    )
  ],
  [
    same("Small OT teams"),
    same(
      "Many utilities have limited in-house cyber, SCADA, engineering, and incident-response capacity, with substantial reliance on integrators and vendors"
    )
  ],
  [
    same("Aging, long-lived automation"),
    same(
      "Legacy PLCs, RTUs, radios, HMIs, dial-up/cellular equipment, unsupported operating systems, and thin documentation are common"
    )
  ],
  [
    same("Manual-operating dependency"),
    same(
      "Manual operation may be possible but difficult, staffing-intensive, slower, or unsafe—especially across multiple remote facilities"
    )
  ],
  [
    same("Chemical-process risk"),
    same(
      "Chlorine, sodium hypochlorite, ammonia, coagulants, polymers, lime, fluoride, acids, caustics, and other treatment chemicals create handling, dosing, and containment concerns"
    )
  ],
  [
    same("Weather and power resilience"),
    same(
      "Flooding, drought, wildfire, storm damage, power loss, and telecom outages frequently coincide with peak operational demand"
    )
  ],
  [
    same("Contractor and OEM access"),
    same(
      "Integrators and equipment vendors often remotely support PLCs, telemetry, dosing equipment, UV systems, VFDs, analysers, and SCADA platforms"
    )
  ],
  [
    same("Municipal IT interdependence"),
    same(
      "Water OT may share identity, remote access, network services, procurement, facilities, and incident-response functions with broader city or county IT"
    )
  ]
];

/**
 * The table's `<caption>`. It states what the rows are, because a ten-row
 * matrix of sector assertions with no framing reads as OXOT's own market
 * research rather than as the sector conditions the Twin has to model around.
 */
export const CHALLENGE_CAPTION = same(
  "Sector-specific challenges — the operational conditions a water or wastewater Twin has to model around."
);
