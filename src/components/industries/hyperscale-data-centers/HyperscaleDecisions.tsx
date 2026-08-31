import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { Badge } from "@/components/ui/badge";
import { DECISIONS } from "./content";
import { StatusDot } from "./StatusDot";

/** A four-panel "decision console" — each panel carries a mono D-code, a
 *  status dot, and a short dashboard tag (PRIORITIZE / INVEST / TEST /
 *  ACCEPT) instead of energy-utilities' big serif numerals on a line. */
export function HyperscaleDecisions({ locale }: { locale: Locale }) {
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

      <ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((d, i) => (
          <li key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                <StatusDot />
                D{String(i + 1).padStart(2, "0")}
              </span>
              <Badge variant="outline" className="font-mono text-[0.625rem] text-primary-ink">{pick(d.tag, locale)}</Badge>
            </div>
            <h3 className="mt-3 h-card text-base">{pick(d.name, locale)}</h3>
            <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">&ldquo;{pick(d.question, locale)}&rdquo;</p>
            <p className="mt-3 text-xs leading-relaxed text-foreground">{pick(d.provides, locale)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
