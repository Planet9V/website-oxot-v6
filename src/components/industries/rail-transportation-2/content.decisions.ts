/**
 * S07 · FOUR RAIL DECISIONS — content slice for `/industries/rail-transportation-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md, L226–239. Every string below carries the
 * source line it was transcribed from. Nothing is invented.
 *
 * THE SOURCE TABLE HAS FOUR COLUMNS AND EACH ROW USES ALL FOUR: the OXOT
 * decision, the passenger-transit phrasing of it, the freight-rail phrasing of
 * it, and what the Twin provides. THIS IS ONE DECISION SET READ TWICE, NOT TWO
 * DECISION SETS. That distinction is load-bearing for this page and is the
 * reason `passenger` and `freight` are two fields on ONE record rather than two
 * arrays of records: split them and the page would assert that passenger
 * transit and US freight rail face different decisions, when the brief's whole
 * claim (L3, L169) is that they face the same four decisions in different
 * operating language.
 *
 * NO PER-ROW STATUS IS SOURCED, SO NONE IS FABRICATED. `OXOT_Layout_Styles.md`
 * Pattern 7 describes a rubber-stamp status chip per register row, and the
 * NOW / NEXT / NEVER vocabulary is permitted publicly (owner reversal,
 * 2026-08-24). But the source uses that vocabulary in exactly ONE place — row
 * 1's Twin output, where NOW / NEXT / NEVER is the *result the model returns*
 * (L234), not a triage status assigned to the four decisions themselves. The
 * four rows are questions a rail operator is holding; "What should we spend?"
 * has no NOW/NEXT/NEVER state, and stamping one on it would be a fabricated
 * classification of the same kind `energy-utilities-2/DecisionSwitchboard.tsx`
 * refuses in its own doc comment. So the stamps render where the source
 * actually puts them — inside row 1's output — with their full Foundation Spec
 * treatment, and no row wears an invented one.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";
import { LINKS } from "./content";

/**
 * The three stamp states, in the Foundation Spec's own token mapping
 * (`OXOT_Visual_Foundation_Spec.md` §3.1, owner decision 2026-08-24):
 * NOW = `--signal-blue` (committed/active — blue's defined meaning already
 * covers active routes and communications; amber was rejected because it means
 * *proposed/pending*), NEXT = `--signal-amber`, NEVER = `--signal-slate`.
 */
export type StampTone = "now" | "next" | "never";

export interface RailDecision {
  id: string;
  /** The row's ordinal in the register. A real fact about the table. */
  index: string;
  /** Source column 1 — the OXOT decision. */
  name: Bilingual;
  /** Source column 2 — how a passenger-transit operator states it. */
  passenger: Bilingual;
  /** Source column 3 — how a US freight railroad states it. */
  freight: Bilingual;
  /** Source column 4 — what the Twin provides. */
  provides: Bilingual;
  /** Verified route from `content.ts`'s LINKS map, never a raw brief path. */
  href: string;
  /**
   * True only where the SOURCE's own output text is the NOW / NEXT / NEVER
   * triage. One row qualifies (L234). Not a styling flag — a fact about which
   * sentence in the brief names those three words.
   */
  outputIsTriage?: boolean;
}

export const DECISIONS = {
  /** Source L230. */
  h2: same("Four rail decisions that connect cyber risk to safe movement and service."),

  /* Column headings. The source's table header row (L232) reads "Passenger
     transit language" / "Freight rail language" / "What the Twin provides";
     these are those headings, shortened only where the surrounding label
     already supplies the context. */
  passengerLabel: same("Passenger transit"),
  freightLabel: same("Freight rail"),
  providesLabel: same("What the Twin provides"),

  /** The disclosure affordance's accessible name, completed with the row name. */
  toggleLabel: same("Twin output for"),

  items: [
    {
      id: "fix-first",
      index: "01",
      /** Source L234. */
      name: same("What do we fix first?"),
      passenger: same(
        "“Which pathway can affect train separation, route setting, traction power, station safety, or passenger flow?”"
      ),
      freight: same(
        "“Which pathway can degrade PTC, dispatch, interlocking, grade-crossing, yard, or locomotive operations?”"
      ),
      provides: same(
        "NOW / NEXT / NEVER priorities based on actual reachability and safety/service consequence"
      ),
      href: LINKS.fixFirst,
      outputIsTriage: true
    },
    {
      id: "investment",
      index: "02",
      /** Source L235. */
      name: same("What should we spend?"),
      passenger: same(
        "“Should we fund CBTC segmentation, resilient OCC services, secure OEM access, traction-power isolation, or depot controls?”"
      ),
      freight: same(
        "“Should we fund PTC hardening, field-device segmentation, communications resilience, dispatch recovery, or locomotive access controls?”"
      ),
      provides: same(
        "A comparable investment case with modeled risk reduction, sequence, and diminishing-return point"
      ),
      href: LINKS.investment
    },
    {
      id: "change-safely",
      index: "03",
      /** Source L236. */
      name: same("Can we change safely?"),
      passenger: same(
        "“Can we change a signaling firewall, control-center route, remote-maintenance path, or station-system boundary without reducing service or impairing emergency operation?”"
      ),
      freight: same(
        "“Can we re-zone a signal network, change PTC communications, alter remote access, or patch a back-office dependency without restricting train movement?”"
      ),
      provides: same(
        "A virtual control experiment showing flows preserved, pathways closed, residual exposure, and operational impact"
      ),
      href: LINKS.changeSafely
    },
    {
      id: "risk-acceptance",
      index: "04",
      /** Source L237. */
      name: same("What can we leave alone?"),
      passenger: same(
        "“Which legacy station, depot, or onboard system is isolated enough to defer—with documented constraints?”"
      ),
      freight: same(
        "“Which long-lived wayside, locomotive, or yard asset can remain in service until scheduled renewal with compensating controls?”"
      ),
      provides: same(
        "A documented risk-acceptance decision, review trigger, owner, and evidence trail"
      ),
      href: LINKS.riskAcceptance
    }
  ] satisfies RailDecision[],

  /**
   * The three stamps, rendered only inside the row whose sourced output names
   * them (`outputIsTriage`). The words are the source's own (L234); the tones
   * are the Foundation Spec's §3.1 mapping.
   */
  stamps: [
    { tone: "now", word: same("NOW") },
    { tone: "next", word: same("NEXT") },
    { tone: "never", word: same("NEVER") }
  ] satisfies Array<{ tone: StampTone; word: Bilingual }>,

  /** Caption above the stamp trio, naming what the three words are. */
  stampsCaption: same("Priority stamp, per pathway"),

  /**
   * Source L239, split at its own sentence boundary. The first sentence is the
   * claim about the approach; the second is the standards/capability list it
   * rests on. Kept as two fields so the section can set the list on its own
   * line rather than burying six named capabilities mid-paragraph.
   */
  closing: same(
    "OXOT’s approach is particularly well suited to rail because its model can combine network reachability with engineering/safety/reliability evidence, then produce a drillable decision rather than a generic vulnerability priority list."
  ),
  closingBasis: same(
    "Its model supports IEC 62443 zones, TS 50701, asset/configuration mapping, device cascades, virtual-network state, and consequence-led prioritization."
  ),

  /**
   * THE LEDGER'S SINGLE PRIMARY CTA. Pattern 7's hard rule: exactly one for the
   * whole ledger, never one per row. The source's own CTA section (L392–402)
   * routes rail enquiries to contact, so that is where this points; the wording
   * is Pattern 7's stated label, not an invented offer.
   */
  cta: {
    label: same("Request the full decision register"),
    href: LINKS.contact
  },

  /**
   * The per-row destination's link text. Deliberately NOT a second primary CTA:
   * it is quiet inline navigation to the decision method's own page, sitting
   * inside an already-expanded row, and it competes with nothing. Pattern 7's
   * ban is on repeating the ledger's *primary* CTA per row — four "Request the
   * register" buttons — which this is not.
   */
  methodLabel: same("Read the decision method")
};
