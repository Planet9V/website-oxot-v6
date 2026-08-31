import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { same } from "../registry";

/**
 * THE TWO PIECES S08 AND S09 GENUINELY SHARE — the stage run both worked
 * examples are built out of, and the modelled-chain drawing both of them print.
 *
 * WHY A THIRD FILE RATHER THAN ONE COMPONENT FOR BOTH SECTIONS, OR A COPY IN
 * EACH. One component serving both sections would have to branch on segment
 * throughout — five stages here, three there, a matrix here, a flat list there,
 * a citation there and not here — and a component that is mostly
 * `segment === "passenger" ? … : …` is the two segments sharing a mechanism
 * again, which is the shape source L3 and L169 spend their words rejecting.
 * Copying these two pieces into each section instead would let the two chains
 * drift into two different drawings of the same kind of object, which is the
 * ungrounded variation `OXOT_Layout_Styles.md` names as the opposite failure.
 * So the sections are two files and the shared drawing is one, which is exactly
 * the arrangement S05 already uses with `ScenarioTrace.tsx`.
 *
 * NOTHING IN HERE IS SECTION-SPECIFIC: no scenario text, no stage label, no
 * source line. Both exports are pure shape, fed entirely by their callers.
 */

/* ── Stage ──────────────────────────────────────────────────────────────── */

/**
 * One stage of a worked example: a mono label over its body, opened by a solid
 * rule.
 *
 * THE RULE GRAMMAR IS THIS PAGE'S OWN, reused rather than reinvented — SOLID
 * opens a group, DASHED separates items inside one, exactly as
 * `FreightScenarios.tsx` uses them for bands and for the scenarios filed into
 * them. A stage boundary is a group boundary, so it takes the solid rule.
 *
 * THE LABEL IS NOT ORANGE. `text-primary-ink` on five stage headings would
 * spend the section's accent five times over — and in S08 that accent is
 * already spent, because `StaticTable` paints its own column heads
 * `--primary-ink`. Weight and rule carry the run instead.
 */
export function Stage({
  label,
  locale,
  first,
  children
}: {
  label: Bilingual;
  locale: Locale;
  /** The first stage takes no rule: `SectionA` has already opened the section. */
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", first ? undefined : "mt-10 border-t border-border pt-8")}>
      <h3 className="mono-label text-foreground">{pick(label, locale)}</h3>
      <div className="mt-5 min-w-0">{children}</div>
    </div>
  );
}

/* ── ModelledChain ──────────────────────────────────────────────────────── */

const T = {
  /**
   * The name for a modelled chain's terminal stage, and the legend for the
   * amber outline below.
   *
   * SOURCE L56 — the final stage of the brief's own railway operating model,
   * "Cyber pathway → operational or safety consequence". Taken from the hero's
   * block because it is the page's own name for this exact thing, and because
   * `HeroCanvas.tsx` already prints it as `legendConsequence` against the same
   * amber outline; a second wording invented here would give the page two names
   * for one mark. Both chains this component draws terminate the same way, so
   * the label describes them rather than being stretched over them.
   */
  terminus: same("Operational or safety consequence")
};

/**
 * A MODELLED CHAIN, DRAWN AS A LINEAR STEP RUN — not as an SVG node graph.
 *
 * THE SHAPE OF THE DATA DECIDES THIS, AND IT IS CHECKABLE. Both source chains
 * (L283–L293 and L323–L331) draw ONE arrow between each adjacent pair and
 * nothing else: no branch, no fan-out, no rejoin, no node reached from two
 * places. `energy-utilities-2/ThreeGateLedger.tsx` reaches for a hand-laid SVG
 * canvas with `PathEdge` routes because its scenario genuinely forks — eight
 * routes over eight nodes, where one engineering workstation feeds both a
 * controller and a protection relay and two routes rejoin at the unit. That
 * machinery exists to show a topology. Running it over a strictly linear
 * six-step list would spend a viewbox, hand-authored geometry and orthogonal
 * route points to draw a straight line, and would additionally assert a
 * topology — nodes at positions, routes between them — where the source states
 * only a sequence. An ordered list IS the data.
 *
 * AND THIS PAGE HAS ALREADY SPENT ITS CANVASES. `HeroCanvas.tsx` draws the
 * five-stage operating model as a full SVG figure above the fold, and
 * `ScenarioTrace.tsx` draws S05's scenario topologies through `TwinExplorer`. A
 * third canvas two sections later, for a chain that does not branch, would make
 * the page's mechanisms indistinguishable from one another.
 *
 * THE ORDINALS ARE REAL. A step's position in the chain is a fact about the
 * chain, the same way `Rule.tsx`'s section index is a fact about the page. They
 * are not rail data: no aspect, headway figure, train number, subdivision name
 * or territory ID appears anywhere here, per the prohibition `Rule.tsx` states
 * for this page.
 *
 * THE TERMINAL STEP IS OUTLINED IN AMBER, and that mark is the hero's rather
 * than a new one. Every chain here crosses one boundary: the steps up to the
 * last name systems and system states, and the last names service consequence
 * and cost. `HeroCanvas.tsx` draws that same boundary by putting its fifth
 * stage in an amber-outlined chip instead of making it a fifth graph node — "a
 * consequence is not an asset" — and `ScenarioTrace.tsx` marks its
 * operational-impact caption with an amber rule. Amber therefore already means
 * *consequence* twice on this page before this component uses it a third time,
 * and the mark carries a printed legend rather than asking anyone to infer it.
 *
 * TOKENS. The connector and the ordinals are `--muted-foreground`, NOT
 * `--border`: they carry model meaning and must clear WCAG 1.4.11's 3:1
 * non-text floor, which a hairline tuned to separate text blocks does not —
 * `HeroCanvas.tsx` records the same distinction for its rails. Amber appears
 * only as a border and never as text: the signal tokens are budgeted against
 * 1.4.11's 3:1 and would fail 1.4.3's 4.5:1 if a word were painted in one.
 */
export function ModelledChain({ steps, locale }: { steps: readonly Bilingual[]; locale: Locale }) {
  return (
    <ol className="min-w-0 list-none">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4">
            {/* The ordinal track. The connector is absolutely placed so it runs
                from under this ordinal down to the next one however many lines
                the step's text takes; the last step draws none, because a
                connector leaving the final step would point at nothing. */}
            <div className="relative">
              <span className="mono-label block text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[0.4rem] top-6 w-px bg-muted-foreground"
                />
              )}
            </div>

            <div className={cn("min-w-0", isLast ? "pb-0" : "pb-7")}>
              {isLast && (
                <p className="mono-label mb-2 text-muted-foreground">{pick(T.terminus, locale)}</p>
              )}
              <p
                className={cn(
                  "min-w-0 body-copy leading-relaxed text-foreground",
                  isLast && "rounded-md border border-signal-amber px-4 py-3"
                )}
              >
                {pick(step, locale)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
