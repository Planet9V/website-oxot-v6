import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";
import { localePath, PATHS } from "@/components/shell/nav";
import { TRIAGE_ORIGIN } from "./content";

/**
 * The three lanes, with the third one open and the other two closed —
 * this page is the deep-dive on one lane, so the other two are shown as
 * context at a smaller weight rather than as equal cards. The third
 * lane's public name is "Accepted or deferred"; the blunter internal
 * shorthand used on /cdt-2 is deliberately absent (Visual Foundation Spec
 * §6: do not use it publicly, state review conditions instead).
 */
export function TriageOrigin({ locale }: { locale: Locale }) {
  const t = TRIAGE_ORIGIN;
  return (
    <section className="mt-20 lg:mt-28">
      <p className="oxot-kicker">{pick(t.kicker, locale)}</p>
      <h2 className="mt-4">{pick(t.h2, locale)}</h2>
      <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
        {pick(t.intro, locale)}
      </p>

      <ol className="mt-10 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)]">
        {t.lanes.map((lane, i) => (
          <li
            key={lane.label.en}
            className={cn(
              "rounded-xl border p-5",
              lane.focus ? "border-primary bg-card shadow-sm" : "border-border bg-muted/40"
            )}
          >
            <div className="flex items-baseline gap-3">
              <span className={cn("mono-label tabular-nums", lane.focus && "text-primary-ink")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={cn(
                  "font-display text-lg font-bold leading-snug",
                  lane.focus ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {pick(lane.label, locale)}
              </h3>
            </div>
            <p className="mono-label mt-3">{pick(lane.sub, locale)}</p>
            <p className={cn("mt-2 text-sm leading-relaxed", lane.focus ? "text-foreground" : "text-muted-foreground")}>
              {pick(lane.body, locale)}
            </p>
            {lane.focus ? (
              <p className="mono-label mt-4 border-t border-border pt-3 text-primary-ink">This page</p>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="prose-measure mt-6 text-sm leading-relaxed text-muted-foreground">
        {pick(t.note, locale)}{" "}
        <Link
          href={localePath(locale, `${PATHS.cdt2}#decide`)}
          className="border-b border-border transition-colors duration-150 hover:border-primary-ink hover:text-primary-ink"
        >
          {pick(t.lanes[0].label, locale)} / {pick(t.lanes[1].label, locale)}
        </Link>
      </p>
    </section>
  );
}
