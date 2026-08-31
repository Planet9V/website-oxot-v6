import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { DECISIONS } from "./content";

/**
 * "What the Twin provides" is identical across both tracks in the source
 * table — the old layout duplicated it into two separate cards to keep
 * two independent columns. Restructured as one full-width row per
 * decision: the shared name/number/provides statement runs once, with
 * the passenger and freight questions sitting side by side inside the
 * same row as the only place the two tracks actually diverge.
 *
 * "Can we change safely?" (index 2) breaks from the other three rows —
 * it's the one decision with a real, content-accurate illustration
 * already in the codebase (whatif-control-stack.png, used on /cdt-2,
 * literally depicts a what-if control experiment against a baseline
 * digital twin). Featuring it here is a content-driven asymmetry, not
 * decoration: the other three decisions don't have an equivalent asset,
 * so they don't get the same treatment.
 */
export function RailDecisions({ locale }: { locale: Locale }) {
  const t = DECISIONS;
  return (
    <section aria-labelledby="decisions" className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="decisions" className="h-sub">{pick(t.h2, locale)}</h2>
        <Link
          href={`${localePath(locale, PATHS.cdt2)}#decide`}
          className="mono-label border-b border-primary/45 font-bold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
        >
          How the four decisions work <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <ol className="mt-10 flex list-none flex-col gap-5 border-t border-primary/40 p-0 pt-8">
        {t.items.map((d, i) => (
          <li key={i}>
            <BlurFade inView direction="up" duration={0.4} delay={i * 0.08}>
              {i === 2 ? (
                <div className="overflow-hidden rounded-2xl border border-primary/40 bg-card transition-colors duration-150 ease-brand hover:border-primary/70">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center">
                    <div className="p-6 sm:p-8">
                      <span className="font-display text-3xl font-bold leading-none text-primary-ink">0{i + 1}</span>
                      <h3 className="mt-3 h-card text-xl">{pick(d.name, locale)}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
                      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
                        <div>
                          <Badge className="mono-label">Passenger</Badge>
                          <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                            &ldquo;{pick(d.passengerQuestion, locale)}&rdquo;
                          </p>
                        </div>
                        <div>
                          <Badge variant="outline" className="mono-label">Freight</Badge>
                          <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                            &ldquo;{pick(d.freightQuestion, locale)}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-black/40 p-4 lg:p-6">
                      <Image
                        src="/images/cdt2/whatif-control-stack.png"
                        alt="A what-if control experiment: threats simulated against a baseline digital twin, then neutralized on a simulated control layer with zero production interference"
                        width={1600}
                        height={1600}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="h-auto w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-6 transition-colors duration-150 ease-brand hover:border-primary/50 sm:p-7 lg:grid-cols-[3.5rem_minmax(0,16rem)_1fr]">
                  <span className="font-display text-3xl font-bold leading-none text-primary-ink lg:pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="h-card text-base">{pick(d.name, locale)}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <div>
                      <Badge className="mono-label">Passenger</Badge>
                      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                        &ldquo;{pick(d.passengerQuestion, locale)}&rdquo;
                      </p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mono-label">Freight</Badge>
                      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                        &ldquo;{pick(d.freightQuestion, locale)}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
