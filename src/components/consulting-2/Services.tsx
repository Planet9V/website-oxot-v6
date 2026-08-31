/**
 * The six consulting services, for `/consulting`.
 *
 * ANCHORS, NOT ACCORDIONS (owner decision 2026-08-30, recorded in ./content).
 * Each service is a full, always-open section whose heading carries the id the
 * page's nav links to — `assessments`, `programmes`, `architecture`,
 * `remote-access`, `baseline`, `capability-transfer`. There is no disclosure
 * widget here and no `"use client"`: everything on this page stays
 * server-rendered.
 *
 * The id lives on the <h3>, not on the wrapping <section>, so following a deep
 * link puts the service's own title at the top of the viewport (globals.css
 * gives `main [id]` a 6rem scroll margin to clear the sticky header). The
 * section then points `aria-labelledby` back at that heading.
 *
 * ONE SHAPE, SIX TIMES. The brief writes all six services to an identical
 * skeleton and draws no line between 01–03 and 04–06, so they render through
 * one loop in one running order. Varying the treatment per service would
 * assert a difference in kind the source does not have.
 *
 * "WHAT YOU RECEIVE" IS A LIST. The source fences those blocks but they carry
 * no arrows, no numbering and no stated order — they are deliverable
 * inventories. They render as a plain <ul> in a side panel. No flow, no
 * funnel, no timeline, and specifically no diagram of "Implementation and
 * validation sequence" (03) or "Implementation roadmap" (04), each of which
 * NAMES a sequence as a deliverable without supplying one.
 *
 * NOW / NEXT / ACCEPTED appears here only as the source words it, inside its
 * own bullet. The source supplies no example item for any of the three states
 * and none is invented.
 */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick, type Bilingual } from "@/i18n/bilingual";
import { localePath } from "@/components/shell/nav";
import { SERVICES_A, SERVICES_INTRO, type ConsultingService } from "./content.services.a";
import { SERVICES_B } from "./content.services.b";

/** The six, in the brief's running order. The split across two content files
 *  is an authoring boundary only. */
const SERVICES: readonly ConsultingService[] = [...SERVICES_A, ...SERVICES_B];

/** An action or a recognition bullet: a rule marker, then the sentence. */
function RuleItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
      <span>{children}</span>
    </li>
  );
}

/** A deliverable. Square marker, deliberately unlike the rule markers above —
 *  an inventory item, not a step. */
function InventoryItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-foreground">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-xs bg-primary" />
      <span>{children}</span>
    </li>
  );
}

function BulletBlock({
  label,
  items,
  locale
}: {
  label: string;
  items: readonly Bilingual[];
  locale: Locale;
}) {
  return (
    <div>
      <h4 className="h-micro text-foreground">{label}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <RuleItem key={i}>{pick(item, locale)}</RuleItem>
        ))}
      </ul>
    </div>
  );
}

function Service({ service, locale }: { service: ConsultingService; locale: Locale }) {
  return (
    <section
      aria-labelledby={service.id}
      className="border-t border-border pt-10 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
        <div>
          <p className="mono-label">{service.index}</p>
          <h3 id={service.id} className="h-sub mt-2 text-foreground">
            {pick(service.title, locale)}
          </h3>

          <blockquote className="mt-5 border-l-2 border-primary pl-5">
            <p className="font-display text-lg font-semibold leading-snug text-foreground">
              {pick(service.buyerQuote, locale)}
            </p>
          </blockquote>

          <p className="prose-measure mt-5 text-base leading-relaxed text-muted-foreground">
            {pick(service.lead, locale)}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <BulletBlock label="What we do" items={service.whatWeDo} locale={locale} />
            <BulletBlock label="Best for" items={service.bestFor} locale={locale} />
          </div>

          {service.standardsNote ? (
            <p className="prose-measure mt-8 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
              {pick(service.standardsNote.text, locale)}{" "}
              <a
                href={service.standardsNote.href}
                rel="noreferrer"
                className="border-b border-primary/45 font-semibold text-primary-ink no-underline transition-colors duration-150 ease-brand hover:border-primary"
              >
                {pick(service.standardsNote.linkLabel, locale)}
              </a>
            </p>
          ) : null}

          <p className="mt-8">
            <Link
              href={localePath(locale, service.ctaHref)}
              className="cta-lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline"
            >
              {pick(service.cta, locale)}
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </p>
        </div>

        {/* Deliverables. A panel, because an inventory reads better set apart
            from the narrative than buried as a third bullet list — and a panel
            cannot be mistaken for the next step in a sequence. */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-xs">
          <p className="mono-label">What you receive</p>
          <ul className="mt-4 space-y-3">
            {service.whatYouReceive.map((item, i) => (
              <InventoryItem key={i}>{pick(item, locale)}</InventoryItem>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function Services({ locale }: { locale: Locale }) {
  /* The six full sections. The group heading and the card index live in
     ServiceCards, rendered near the top of the page, so "six services" is
     stated once and the reader meets the set before the detail. */
  return (
    <section aria-label={pick(SERVICES_INTRO.h2, locale)} className="mt-14">
      <div className="space-y-12">
        {SERVICES.map((service) => (
          <Service key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </section>
  );
}
