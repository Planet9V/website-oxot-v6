/**
 * S10 · PRODUCT CAPABILITIES — content slice for `/industries/rail-transportation-2`.
 *
 * SOURCE OF TRUTH: new_material_source/1_website_layout_v4/3_industries/
 * industry_rail-transportation.md, L347–L361. Every string below carries the
 * source line it was transcribed from. Nothing is invented, shortened,
 * reordered or summarised — all seven rows and both of each row's values are
 * verbatim.
 *
 * ONE MODEL, READ TWICE — WHICH IS WHAT THE SECTION'S OWN HEADLINE SAYS. L351
 * is "One rail model spanning operations, signaling, OT, and service
 * consequence." The seven rows are therefore facets of a SINGLE model, each
 * stated once for passenger transit and once for US freight rail. That is why
 * `passenger` and `freight` live as two cells on ONE record rather than as two
 * arrays of capabilities: splitting them would assert that the two segments get
 * two different products, when both the headline and the page's thesis (L3,
 * L169) say they get one model described in two operating languages. Same
 * record shape, and same reasoning, as `content.decisions.ts`.
 *
 * CELLS ARE KEYED BY SEGMENT ID, NOT BY COLUMN POSITION — the precedent set by
 * `content.reality.ts`'s `COMPARISON`. `content.ts`'s `SEGMENTS` is the page's
 * single definition of the two rail segments; the renderer walks that array and
 * looks each cell up by `id`, so the segment order here can never fall out of
 * step with the hero toggle, the architecture toggle or the S02 matrix.
 *
 * THE COLUMN HEADS ARE THIS TABLE'S OWN, AND THEY ARE NOT `SEGMENTS.tableLabel`.
 * L353 heads the two value columns "Passenger transit value" and "Freight rail
 * value" — different wording from L96's "Passenger rail / transit" / "US freight
 * rail", which `tableLabel` carries. The word "value" is load-bearing: it states
 * that these cells are what the capability is WORTH to that segment, not what
 * the segment is. So the heads are transcribed verbatim here, keyed by the same
 * segment ids, while `SEGMENTS` still governs which segments exist and in what
 * order. Copy comes from the source row; identity and ordering come from
 * `SEGMENTS`.
 *
 * NO ORDERING CLAIM IS ATTACHED TO THE SEVEN. The source prints them as table
 * rows and states no sequence, no ranking and no maturity ladder. They are
 * therefore rendered without ordinals, letters or step markers — a numeral or an
 * "A–G" set would each imply an order the source does not assert, and this page
 * already spends mono numerals on section ordinals (`Rule.tsx`) and on the
 * decision register's row indices (`content.decisions.ts`).
 *
 * CLAIM RULE IN FORCE: `OXOT_Visual_Foundation_Spec.md` L401 — no percentages,
 * money values, annual-loss figures or "verified" language. Nothing here carries
 * a numeric figure. The source's own standing instruction at L369 also binds
 * this section: the row 7 values say the model SUPPORTS the named frameworks'
 * workflows, and that verb is the source's — it is not a claim that using the
 * Twin certifies a railway or guarantees compliance.
 *
 * NO LINK OR CTA IS SOURCED FOR THIS SECTION, SO NONE IS EMITTED. L347–L361 is a
 * headline and a table with no call to action and no internal link, and the
 * brief's link list (L470–L480) attaches nothing to it. Row 7 names TS 50701 and
 * IEC 62443, both of which have real assurance routes in `content.ts`'s `LINKS`,
 * but they appear there as prose inside a verbatim cell rather than as offers to
 * navigate — linking mid-cell would edit transcribed source text. The regulatory
 * section (S11) is where those frameworks are the subject.
 *
 * `Bilingual`-typed via `same()` (../registry); `nl` is a same-as-English
 * placeholder pending translation, not a claim the text is correct Dutch.
 */
import type { Bilingual } from "@/i18n/bilingual";
import { same } from "../registry";

export interface RailCapability {
  id: string;
  /** Source column 1 — the capability's own name. */
  name: Bilingual;
  /** Source columns 2 and 3, keyed by `SEGMENTS[n].id`. */
  values: Record<string, Bilingual>;
}

export const CAPABILITIES_SECTION = {
  id: "product-capabilities",
  /** The section's ordinal on the page — a fact about the page, not the railway. */
  index: "10",
  /** Short section name at the head of the block run. Source L347. */
  datumLabel: same("Product capabilities"),
  /** Source L351, the section's own headline, verbatim. */
  heading: same(
    "One rail model spanning operations, signaling, OT, and service consequence."
  )
  /* GAP, FLAGGED NOT FILLED: the source gives this section NO lead — L349's
     `### Section headline` is followed by the blockquote and then straight into
     the table. `SectionA`'s `lead` is optional precisely so a section like this
     can decline it rather than be padded with an invented sentence. */
};

export const CAPABILITIES = {
  /* L353's FIRST column head, "Capability", is deliberately not carried here.
     It heads a column of row names, and this section does not render one — each
     capability is its own entry title spanning the full width, with the two
     segment readings beneath it, so there is no column for that word to head.
     Transcribing it anyway would leave an export nothing renders. The other two
     heads below are carried because they DO head real columns. */

  /** Source L353, this table's own value-column heads, keyed by segment id. */
  valueHead: {
    passenger: same("Passenger transit value"),
    freight: same("Freight rail value")
  } as Record<string, Bilingual>,

  items: [
    {
      id: "operational-system-model",
      /** Source L355. */
      name: same("Operational-system model"),
      values: {
        passenger: same(
          "Links train control, OCC, signaling, stations, traction power, depots, and passenger operations"
        ),
        freight: same(
          "Links PTC, dispatch, CTC/interlockings, wayside systems, locomotives, yards, terminals, and corridors"
        )
      }
    },
    {
      id: "safety-rams-context",
      /** Source L356. */
      name: same("Safety and RAMS context"),
      values: {
        passenger: same(
          "Connects cyber pathways to hazard logs, degraded modes, emergency procedures, and service-capacity consequences"
        ),
        freight: same(
          "Connects cyber pathways to safe train movement, territory operations, hazardous-material considerations, and dispatch recovery"
        )
      }
    },
    {
      id: "network-and-zone-model",
      /** Source L357. */
      name: same("Network and zone model"),
      values: {
        passenger: same(
          "Maps vendor access, signaling networks, radio, control centers, stations, depot boundaries, and corporate interfaces"
        ),
        freight: same(
          "Maps PTC support, field communications, signal houses, dispatch/operations systems, maintenance networks, and vendor paths"
        )
      }
    },
    {
      id: "asset-and-configuration-mapping",
      /** Source L358. */
      name: same("Asset and configuration mapping"),
      values: {
        passenger: same(
          "Covers CBTC, ATS/ATO, interlockings, wayside controllers, onboard systems, and infrastructure OT"
        ),
        /* "inverters" is the source's own word (L358) and is kept as written. It
           reads oddly in a freight-rail asset list, but altering or dropping a
           term because it looks wrong would be an unsourced edit to a
           transcribed cell. Flagged for the owner rather than silently fixed. */
        freight: same(
          "Covers PTC elements, WIUs, interlockings, crossings, locomotive systems, communication sites, yard OT, and inverters"
        )
      }
    },
    {
      id: "change-simulation",
      /** Source L359. */
      name: same("Change simulation"),
      values: {
        passenger: same(
          "Tests signaling/maintenance segmentation, secure access, OCC boundaries, and infrastructure-control changes"
        ),
        freight: same(
          "Tests PTC/dispatch dependencies, territory segmentation, field-access redesign, and recovery changes"
        )
      }
    },
    {
      id: "supply-chain-and-lifecycle-view",
      /** Source L360. */
      name: same("Supply-chain and lifecycle view"),
      values: {
        passenger: same(
          "Maps OEMs for signaling, rolling stock, CBTC, telecoms, fare systems, station systems, and maintenance tooling"
        ),
        freight: same(
          "Maps PTC suppliers, locomotive/wayside OEMs, telecoms, vendors, repair networks, parts, and interoperability dependencies"
        )
      }
    },
    {
      id: "evidence-output",
      /** Source L361. */
      name: same("Evidence output"),
      values: {
        passenger: same(
          "Supports TS 50701, IEC 62443, NIS2, safety-assurance, and board reporting workflows"
        ),
        freight: same(
          "Supports TSA cyber program evidence, FRA/rail safety context, IEC 62443/NIST alignment, risk decisions, and supply-chain analysis"
        )
      }
    }
    /* `as RailCapability[]`, matching `content.reality.ts`'s `as ComparisonRow[]`.
       It widens each record's `values` to `Record<string, Bilingual>` so the
       renderer can look a cell up by `SEGMENTS[n].id`; `satisfies` would keep
       the narrow literal type and make that lookup a type error. */
  ] as RailCapability[]
};
