import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { localePath, PATHS } from "@/components/shell/nav";
import { CAVEAT, GOVERNANCE, INTEGRATIONS, OFFLINE, ROUTING } from "./content";
import { INTEGRATION_ITEMS, LABELS, OFFLINE_ROWS } from "./content-modes";
import { SectionHead, SubHead, TraceList } from "./primitives";

/**
 * Sections 06–10: what still runs disconnected, the governance the
 * customer holds, the systems of record a connected mode can read, the
 * caveat, and the routing onward to assurance.
 *
 * SECTION 09 IS THE ONE THAT EARNS THE PAGE. A deployment page that only
 * listed reassurances would be marketing; the source document is explicit
 * that "air-gapped should not be presented as automatically risk-free" and
 * lists the pathways that survive an air gap. Printing that list on OXOT's
 * own deployment page, directly under three diagrams arguing for
 * isolation, is the difference between a boundary claim and a boundary
 * argument — and it is also the honest position, because modelling those
 * pathways is what the product does.
 *
 * Section 10 is the "Deployment and assurance routing" that
 * OXOT_Composition_Rules.md requires of a Platform page. It routes to
 * three assurance regime pages, all of which render both locales.
 * /assurance (the section index) and /technical-specification are EN-only
 * per nav.ts's own comments and are therefore NOT linked from here at all
 * — rather than linked behind a guard that would leave a Dutch reader with
 * a visibly shorter list and no stated reason for it.
 */
export function DeploySovereignty({ locale }: { locale: Locale }) {
  /* The three regime pages render both locales — nav.ts: "Unlike
     /assurance itself, these five render both locales (Bilingual, nl =
     same-as-English placeholder)". So no `locale === "en"` guard belongs
     on these three hrefs, and adding one would send an NL reader to a
     fallback for a page that exists in their locale. */
  const routes = [
    localePath(locale, PATHS.assuranceIec62443),
    localePath(locale, PATHS.assuranceEvidenceProvenance),
    localePath(locale, PATHS.assuranceCra)
  ];

  return (
    <>
      <section aria-labelledby="offline" className="mt-16 border-t border-border pt-12">
        <SectionHead n={OFFLINE.n} id="offline" title={pick(OFFLINE.title, locale)} dek={pick(OFFLINE.dek, locale)} />

        <div className="mt-7">
          <Table>
            <TableCaption className="text-left">{pick(LABELS.offline.caption, locale)}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.offline.capability, locale)}</TableHead>
                <TableHead className="mono-label text-primary-ink">{pick(LABELS.offline.detail, locale)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OFFLINE_ROWS.map((row) => (
                <TableRow key={row.capability.en}>
                  <TableCell className="min-w-[13rem] align-top font-medium text-foreground">
                    {pick(row.capability, locale)}
                  </TableCell>
                  <TableCell className="min-w-[24rem] align-top text-muted-foreground">
                    {pick(row.detail, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(OFFLINE.close, locale)}
        </p>
      </section>

      <section aria-labelledby="governance" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={GOVERNANCE.n}
          id="governance"
          title={pick(GOVERNANCE.title, locale)}
          dek={pick(GOVERNANCE.dek, locale)}
        />
        <TraceList items={GOVERNANCE.requirements.map((r) => pick(r, locale))} />
        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(GOVERNANCE.close, locale)}
        </p>
      </section>

      <section aria-labelledby="integrations" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={INTEGRATIONS.n}
          id="integrations"
          title={pick(INTEGRATIONS.title, locale)}
          dek={pick(INTEGRATIONS.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(INTEGRATIONS.intro, locale)}
        </p>

        {/* A definition list rather than four cards: these are four sources
            with different jobs, not four comparable options, and a table
            would invite a comparison that does not exist. */}
        <dl className="mt-7 border-t border-border">
          {INTEGRATION_ITEMS.map((item) => (
            <div
              key={item.name.en}
              className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-6"
            >
              <dt className="mono-label font-bold text-primary-ink">{pick(item.name, locale)}</dt>
              <dd className="body-copy leading-relaxed text-foreground">{pick(item.body, locale)}</dd>
            </div>
          ))}
        </dl>

        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(INTEGRATIONS.close, locale)}
        </p>
      </section>

      <section aria-labelledby="caveat" className="mt-16 border-t border-border pt-12">
        <SectionHead n={CAVEAT.n} id="caveat" title={pick(CAVEAT.title, locale)} dek={pick(CAVEAT.dek, locale)} />
        <SubHead>{pick(CAVEAT.pathwaysHead, locale)}</SubHead>
        <TraceList items={CAVEAT.pathways.map((p) => pick(p, locale))} />
        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(CAVEAT.close, locale)}
        </p>
      </section>

      <section aria-labelledby="routing" className="mt-16 border-t border-border pt-12">
        <SectionHead n={ROUTING.n} id="routing" title={pick(ROUTING.title, locale)} dek={pick(ROUTING.dek, locale)} />
        <ul className="mt-7 list-none border-t border-border p-0">
          {ROUTING.links.map((link, i) => (
            <li key={link.label.en} className="border-b border-border">
              <Link
                href={routes[i]}
                className="group grid grid-cols-1 gap-1 py-5 no-underline transition-colors duration-150 ease-brand sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6"
              >
                <span className="mono-label font-bold text-primary-ink">
                  {pick(link.label, locale)} <span aria-hidden="true">&#8594;</span>
                </span>
                <span className="body-copy leading-relaxed text-muted-foreground transition-colors duration-150 ease-brand group-hover:text-foreground">
                  {pick(link.body, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
