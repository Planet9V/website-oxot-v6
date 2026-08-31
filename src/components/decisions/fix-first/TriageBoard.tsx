import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { BlurFade } from "@/components/ui/blur-fade";
import { BOARD } from "./content";

/**
 * THE BOARD. OXOT_content-to-visual-mapping-table.md maps "Risk
 * prioritization" to a "NOW / NEXT / deferred board" and names "Traffic-
 * light score alone" as the thing to avoid, so this is deliberately not a
 * severity widget and deliberately not red/amber/green: the three bands
 * are told apart by the weight of the rule above them, by their heading
 * colour, and by the third band's dashed frame — never by a colour that
 * would be read as "danger / caution / safe".
 *
 * Each finding prints the two fields a severity score does not carry: the
 * traced route that makes it reachable, and the consequence that ranks
 * it. The decision line is the one field with an accent rule beside it,
 * because a board that shows analysis without a committed action is the
 * same unranked backlog in a nicer frame.
 *
 * NOTHING HERE IS INTERACTIVE and nothing pretends to be — no filter
 * controls, no drag targets, no hover-reveal state. It is a composed
 * static board, and the claim-boundary strip above it says in as many
 * words that the findings are illustrative.
 */

/** Band styling, by position. Hierarchy through weight, not through a
 *  traffic light — see this file's header. */
const BANDS = [
  {
    rule: "bg-primary",
    ruleHeight: "h-1.5",
    heading: "text-primary-ink",
    frame: "border-primary/40",
    ordinal: "text-primary-ink"
  },
  {
    rule: "bg-foreground/40",
    ruleHeight: "h-1",
    heading: "text-foreground",
    frame: "border-border",
    ordinal: "text-muted-foreground"
  },
  {
    rule: "bg-border",
    ruleHeight: "h-px",
    heading: "text-muted-foreground",
    frame: "border-dashed border-border",
    ordinal: "text-muted-foreground"
  }
] as const;

export function TriageBoard({ locale }: { locale: Locale }) {
  const t = BOARD;
  return (
    <section aria-labelledby="board" className="mt-20 border-t border-border pt-12">
      <h2 id="board" className="h-section">
        {pick(t.h2, locale)}
      </h2>
      <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      {/* Claim boundary, verbatim and adjacent to the thing it bounds. */}
      <div className="mt-8 flex flex-col gap-2 rounded-xl border border-primary/40 bg-primary/5 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-5">
        <p className="mono-label shrink-0 font-bold text-primary-ink">{pick(t.claimBoundary, locale)}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{pick(t.claimNote, locale)}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
        {t.columns.map((column, ci) => {
          const band = BANDS[ci] ?? BANDS[BANDS.length - 1];
          return (
            <BlurFade key={ci} inView direction="up" duration={0.45} delay={ci * 0.08}>
              <article className={`flex h-full flex-col rounded-2xl border bg-card ${band.frame}`}>
                <div aria-hidden="true" className={`${band.rule} ${band.ruleHeight} rounded-t-2xl`} />

                <header className="border-b border-border px-5 py-5 sm:px-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className={`font-mono text-2xl font-bold tracking-[0.12em] ${band.heading}`}>
                      {pick(column.label, locale)}
                    </h3>
                    <span className={`mono-label ${band.ordinal}`}>{`0${ci + 1}`}</span>
                  </div>
                  <p className="mt-1 font-serif text-lg leading-snug text-foreground">{pick(column.sub, locale)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(column.body, locale)}</p>
                  <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-foreground">
                    <span className="mono-label mr-2">Commits to</span>
                    {pick(column.commitment, locale)}
                  </p>
                </header>

                <ol className="flex list-none flex-col gap-0 p-0">
                  {column.findings.map((finding, fi) => (
                    <li key={fi} className={`px-5 py-5 sm:px-6 ${fi > 0 ? "border-t border-border" : ""}`}>
                      <h4 className="h-micro text-foreground">{pick(finding.title, locale)}</h4>

                      <dl className="mt-4 flex flex-col gap-3">
                        <div>
                          <dt className="mono-label">{pick(t.columnHeadings.reachability, locale)}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {pick(finding.reachability, locale)}
                          </dd>
                        </div>
                        <div>
                          <dt className="mono-label">{pick(t.columnHeadings.consequence, locale)}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {pick(finding.consequence, locale)}
                          </dd>
                        </div>
                        <div className={`border-l-2 pl-3 ${ci === 0 ? "border-primary" : "border-border"}`}>
                          <dt className="mono-label">{pick(t.columnHeadings.decision, locale)}</dt>
                          <dd className="mt-1 text-sm font-medium leading-relaxed text-foreground">
                            {pick(finding.decision, locale)}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ol>
              </article>
            </BlurFade>
          );
        })}
      </div>

      <p className="prose-measure mt-8 border-l-2 border-primary pl-5 font-serif text-lg leading-relaxed text-foreground">
        {pick(t.closing, locale)}
      </p>
    </section>
  );
}
