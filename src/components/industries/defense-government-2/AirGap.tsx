import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { same } from "../registry";
import { SectionB } from "./Rule";
import { AIR_GAP } from "./content.airgap";

/**
 * S07 · AIR-GAPPED DEPLOYMENT — header recipe H-B.
 *
 * ─── NO DIAGRAM IS DRAWN HERE, AND THAT IS THE DECISION, NOT AN OMISSION ─────
 *
 * `src/components/platform/deployment-sovereignty/mode-diagram.tsx` is real,
 * shipped, and IS Foundation Deliverable 6 — three trust-boundary figures, one
 * per mode, each drawing the crossing the Visual Foundation Spec's Deliverable
 * 6 table requires of it (Island: no arrow at all; Inbound Intelligence: one
 * inbound arrow through a diode with the return direction drawn AND barred;
 * Dedicated: a single-tenant boundary inside an approved region). It was read
 * in full before this file was written. It is NOT rendered here, for two
 * reasons, and neither is aesthetic:
 *
 *   1. IT IS BOUND TO ANOTHER PAGE'S COPY. `ModeDiagram` takes a `ModeSpec` and
 *      reads `ENCLAVE` from `deployment-sovereignty/content-modes.ts` directly.
 *      Rendering it here would print that page's approved wording — its enclave
 *      note, its import list, its per-mode `crossing` prose — inside a section
 *      whose own copy is carried verbatim from this vertical's CORPUS. Two
 *      approved wordings for the same three modes on one screen is not reuse.
 *   2. CONSTRUCTING `ModeSpec` RECORDS FROM `AIR_GAP` WOULD MEAN INVENTING
 *      SECURITY FACTS. The type requires `outsideItems`, `barLabel`, `barBody`,
 *      `inLabel`/`inBody`, `outLabel`/`outBody`, `regionLabel`, `conduits`,
 *      `twinItems` and a `textEquivalent` per mode. `AIR_GAP` carries a name
 *      and one sentence per mode and nothing else. Every remaining field would
 *      have to be written here, on the page where a fabricated boundary claim
 *      is most costly. `content.airgap.ts`'s own caveat names the principle:
 *      show unsourced fields as empty rather than invented.
 *
 * AND NO COMPETING DIAGRAM IS DRAWN EITHER — a second, thinner trust-boundary
 * figure standing beside a better one already live on the site is precisely
 * what "do not fabricate a competing diagram" rules out. The section LINKS to
 * the real one instead. `/deployment-sovereignty` is a real, live, bilingual
 * route (nav.ts), so the link needs no locale gate and dead-ends nowhere.
 *
 * WHAT THIS SECTION DOES INSTEAD IS THE INDUSTRY-PAGE JOB: the three modes in
 * this page's own copy, the ordered five-step offline method, and the caveat —
 * which is the only part of this material a defense buyer cannot read anywhere
 * else on the site in this form.
 *
 * ─── THE CAVEAT ─────────────────────────────────────────────────────────────
 *
 * `AIR_GAP.caveat` IS THE SECTION'S CLAIM BOUNDARY AND TAKES H-B's STRIP. It
 * says that "air-gapped" is not presented as automatically risk-free — that
 * removable media, contractor laptops, maintenance tooling, temporary
 * connections, engineering workstations, supply-chain updates and authorized
 * cross-domain processes can all create pathways. On the section selling
 * air-gapped deployment, that sentence is the one that makes the rest of it
 * credible, and `content.airgap.ts` states it is "not a disclaimer to set in
 * small print."
 *
 * IT RENDERS ABOVE THE MODES, NOT BELOW THEM, AND THAT DEPARTS FROM ONE LINE OF
 * THE CONTENT MODULE'S OWN GUIDANCE — recorded here rather than done quietly.
 * `content.airgap.ts` asks for it "below the modes it qualifies"; `Rule.tsx`,
 * written later and naming `AIR_GAP.caveat` in its docblock as one of the
 * page's five guards, places every such strip ABOVE the body it conditions, on
 * the stated ground that a condition printed after the thing it conditions has
 * already been read is a footnote. The two agree on everything that matters —
 * body size, `text-foreground`, its own line, visibly marked — and disagree
 * only on order. The later, page-wide decision governs, so all five guards on
 * this page sit in the same place and a reader learns where to look for them.
 * Nothing is shrunk, boxed as an alert, or moved out of sight.
 *
 * ─── THE THREE MODES ────────────────────────────────────────────────────────
 *
 * `AIR_GAP.defaultPosture` is the one fact the BRIEF adds and the CORPUS does
 * not carry: Island Mode is the default defense position, not one option of
 * three presented neutrally. `content.airgap.ts` notes that showing the three
 * as equal peers "is not wrong, but it is losing this."
 *
 * It renders as a full-width statement ABOVE the three plates rather than
 * tucked inside the Island plate, and that placement is a balance decision made
 * on content grounds: inside the plate it would add four lines to one of three
 * equal-width cells and push that group outside the site-wide sibling ratio,
 * for a sentence that is a positioning claim about the whole section rather
 * than a property of one mode's description. Above the plates it names Island
 * Mode in its own first clause, so nothing is lost.
 *
 * ─── THE FIVE OFFLINE STEPS ─────────────────────────────────────────────────
 *
 * AN ORDERED METHOD, AND THE ORDER IS MEANING. `content.airgap.ts`: the model
 * comes before the pathway trace, which comes before the change test, which
 * comes before the prioritization, which comes before the evidence. A real
 * `<ol>` with visible ordinals, never a bulleted feature list. No rail, no
 * connector line and no completion state: nobody has walked these five, and a
 * progress mark on this page would read as assurance evidence.
 *
 * TOKEN DISCIPLINE: `--border`, `--card`, `--foreground`, `--muted-foreground`
 * and `--primary-ink` only. No `--signal-*` token appears in this file — the
 * six signals mean model and decision state, and a deployment mode is neither.
 * There is no classification marking, caveat label or handling banner anywhere,
 * and none may be added: inventing a real-looking marking on a public page
 * would be a fabricated security fact, the rule `Rule.tsx` states at length for
 * its own drawing and which applies with more force to a section about
 * isolation.
 *
 * SIBLING BALANCE: `data-balance-group="airgap-modes"` on the three plates'
 * INNER wrappers, never the grid cells, with `data-balance-item` on each
 * plate's name and body. The offline list carries no group — it is one
 * full-width ordered list with no sibling pane to be measured against — and
 * that is stated here rather than left as an unmarked gap.
 *
 * MOBILE (OXOT_Mobile_Rules.md): the plates stack in source order with Island
 * first, the list keeps its ordinal gutter, and the link is a full 44px-high
 * target. No horizontal scroll, `min-w-0` throughout.
 */

/* Section chrome, not copy: `content.airgap.ts` carries no datum label, no
   captions and no link label. The caption names what is already in the data
   (five ordered steps, run inside the customer's boundary); the link label
   names its real destination, the site's own Deployment & Sovereignty page.
   Neither adds a claim. */
const DATUM_LABEL = same("Air gap");
const METHOD_CAPTION = same("What the Twin does inside the boundary — five steps, in order");
const DEPLOYMENT_LINK = same("See the three deployment modes drawn in full");

export function AirGap({ locale }: { locale: Locale }) {
  return (
    <SectionB
      id="air-gap"
      index="07"
      datumLabel={DATUM_LABEL}
      heading={AIR_GAP.h2}
      lead={AIR_GAP.body}
      guard={AIR_GAP.caveat}
      locale={locale}
    >
      {/* The default posture, full width, at reading size and full strength.
          See the docblock on why it is here and not inside the Island plate. */}
      <p className="body-lead leading-relaxed text-foreground">
        {pick(AIR_GAP.defaultPosture, locale)}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {AIR_GAP.modes.map((mode) => (
          <div key={mode.id} className="border border-border bg-card p-6">
            <div data-balance-group="airgap-modes" className="min-w-0">
              <h3
                data-balance-item
                className="font-display body-lead font-bold leading-snug text-foreground"
              >
                {pick(mode.name, locale)}
              </h3>
              <p
                data-balance-item
                className="mt-3 body-copy leading-relaxed text-muted-foreground"
              >
                {pick(mode.body, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <p className="mono-label text-primary-ink">{pick(METHOD_CAPTION, locale)}</p>
        <ol className="mt-6 list-none p-0">
          {AIR_GAP.offline.map((step, index) => (
            <li
              key={step.en}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-border py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6"
            >
              <span className="mono-label pt-0.5 text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 body-copy leading-relaxed text-foreground">
                {pick(step, locale)}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* The real Foundation Deliverable 6 visual lives here. See the docblock
          for why this section links to it rather than redrawing it. */}
      <p className="mt-10">
        <Link
          href={localePath(locale, PATHS.deploymentSovereignty)}
          className="mono-label inline-flex min-h-[44px] items-center text-primary-ink underline-offset-4 hover:underline focus-visible:underline"
        >
          {pick(DEPLOYMENT_LINK, locale)}
        </Link>
      </p>
    </SectionB>
  );
}
