import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Separator } from "@/components/ui/separator";
import { CASE_STUDIES } from "./content";
import { StatusDot } from "./StatusDot";

/** A "case log" — mono CS-codes on a divided list, not a card grid, so the
 *  ten categories read like an operations register rather than a repeat of
 *  the scenario-library card wall above it. */
export function HyperscaleCaseStudies({ locale }: { locale: Locale }) {
  const t = CASE_STUDIES;
  return (
    <section aria-labelledby="case-studies" className="mt-16 border-t border-border pt-10">
      <h2 id="case-studies" className="h-sub">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{pick(t.intro, locale)}</p>

      <div className="mt-8 rounded-2xl border border-border bg-card">
        {t.items.map((c, i) => (
          <div key={i}>
            <div className="grid grid-cols-[4.5rem_1fr] items-start gap-3 px-5 py-4 sm:grid-cols-[5.5rem_1fr]">
              <span className="flex items-center gap-1.5 pt-0.5 font-mono text-xs font-semibold tabular-nums text-primary-ink">
                <StatusDot />
                CS-{String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{pick(c.name, locale)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pick(c.question, locale)}</p>
              </div>
            </div>
            {i < t.items.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </section>
  );
}
