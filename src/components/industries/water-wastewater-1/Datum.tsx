import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { cn } from "@/lib/utils";

/**
 * THE PAGE'S RECURRING SIGNATURE — a survey datum rule.
 *
 * Where the existing `/industries/water-wastewater` page runs a vertical spine
 * with wave dividers, and the sibling verticals use a single-line diagram
 * (energy), a dual track (rail), a status dot (hyperscale) and a classification
 * stamp (defense), this iteration's shape language is the **hydraulic profile**
 * — the long-section drawing every water-treatment design set carries, where
 * water falls through each treatment barrier and is lifted again by pumping.
 * This component is that drawing's datum line: the ticked reference rule a
 * profile is measured against, reused as the divider above every section so the
 * page reads as one continuous long-section.
 *
 * TOKEN DISCIPLINE, DELIBERATE: the rule and its ticks use `--border`, and the
 * stage index uses `--primary-ink` (the same colour `.oxot-kicker` already uses
 * site-wide). No `--signal-*` token appears here. The six signals mean model
 * state — modelled, pathway, proposed, consequence, validated, inactive — and
 * spending one on a page divider would repurpose a semantic token as
 * decoration, which `OXOT_Visual_Foundation_Spec.md` §3.1 forbids and
 * `OXOT_Visual_Rules.md` counts as a competing accent. Signals appear on this
 * page only inside diagrams, where they carry their defined meaning.
 *
 * No elevations, chainages or station numbers are printed. The source brief
 * states none, and inventing them would be the fake-data failure the same spec
 * bans. The index is the section's ordinal on the page, which is a real fact
 * about the page rather than a survey measurement.
 */

export interface DatumProps {
  /** Section ordinal, e.g. "02". A real fact about the page, not survey data. */
  index: string;
  /** Short section name sitting on the rule. */
  label: Bilingual;
  locale: Locale;
  className?: string;
}

export function Datum({ index, label, locale, className }: DatumProps) {
  return (
    <div className={cn("relative select-none", className)} aria-hidden="true">
      {/* Ticks are a repeating gradient rather than 30 DOM nodes — same
          crispness, one element. */}
      <div className="flex items-end gap-3">
        <span className="mono-label shrink-0 text-primary-ink">{index}</span>
        <span className="mono-label shrink-0 text-muted-foreground">{pick(label, locale)}</span>
        <span
          className="h-2.5 min-w-0 flex-1 border-b border-border"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, hsl(var(--border)) 0 1px, transparent 1px 32px)",
            backgroundPosition: "bottom",
            backgroundSize: "100% 5px",
            backgroundRepeat: "repeat-x"
          }}
        />
      </div>
    </div>
  );
}

/**
 * The section wrapper that pairs the datum rule with the heading block. Every
 * section on the page uses it, which is what makes the vertical rhythm uniform:
 * rule → h2 → lead → content, with one spacing scale rather than eleven
 * improvised ones.
 */
export interface ProfileSectionProps {
  id: string;
  index: string;
  datumLabel: Bilingual;
  heading: Bilingual;
  lead?: Bilingual;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}

export function ProfileSection({
  id,
  index,
  datumLabel,
  heading,
  lead,
  locale,
  children,
  className
}: ProfileSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={cn("pt-16 sm:pt-24", className)}>
      <Datum index={index} label={datumLabel} locale={locale} />
      <h2 id={`${id}-h`} className="h-section mt-10 text-balance">
        {pick(heading, locale)}
      </h2>
      {lead && (
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">
          {pick(lead, locale)}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </section>
  );
}
