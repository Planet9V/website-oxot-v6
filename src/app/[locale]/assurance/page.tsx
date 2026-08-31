import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import {
  Ask,
  BoundaryList,
  Cascade,
  ConnectList,
  DataTable,
  FlowChain,
  InventoryList,
  LayerStack,
  Onward,
  Pull,
  SectionHead,
  SpecRow,
  StepLadder,
  TermStrip
} from "@/components/assurance/overview/page-kit";
import {
  CLOSING,
  CRA,
  FRAMEWORKS,
  HERO,
  IEC_62278,
  IEC_62443,
  LIFECYCLE,
  NOT_CLAIMED,
  ONE_MODEL,
  PRODUCE,
  PROBLEM,
  PROVENANCE,
  RAIL_CONNECTION,
  TEST_FIRST,
  TS_50701
} from "@/components/assurance/overview/content";
import {
  CHANGE_HEAD,
  CHANGE_ROWS,
  FRAGMENTED_HEAD,
  FRAGMENTED_ROWS,
  FRAMEWORK_HEAD,
  FRAMEWORK_ROWS,
  PRINCIPLE_HEAD,
  PRINCIPLE_ROWS
} from "@/components/assurance/overview/content-tables";

export async function generateMetadata(props: PageProps<"/[locale]/assurance">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") return {};
  return {
    title: "Cybersecurity, Product & Railway Safety Assurance Evidence | OXOT",
    description:
      "Build assurance evidence from the system you actually operate. OXOT’s Cyber Digital Twin connects IEC 62443, Cyber Resilience Act, TS 50701, IEC 62278-2:2025, product dependencies, hazards, cyber pathways, and traceable decisions.",
    alternates: localeAlternates(locale, PATHS.assurance)
  };
}

/**
 * /assurance — the section index, rebuilt 2026-08-23 from
 * `new_material_source/1_website_layout_v4/4_assurance/assurance_overview_2.md`.
 *
 * WHAT CHANGED AND WHY. The first version of this page (2026-08-22) reused
 * ENGINE_IEC_NATIVE and DECISION_01.compliance from `src/components/cdt2/` —
 * the detailed IEC 62443 material that used to crowd /cdt-2. That was the
 * right move for /cdt-2 but it left the index carrying a fraction of its own
 * spec: no assurance-problem table, no evidence lifecycle, no provenance
 * principles, no scope boundary. It now renders the overview's actual section
 * list from its own content module and no longer imports from cdt2/ at all.
 *
 * `assurance_overview_2.md` is authoritative over the earlier
 * `assurance_overview.md`: it adds IEC 62278-2:2025 as a fifth framework and
 * carries the fuller tables.
 *
 * SLUGS ARE THE BUILT ONES, NOT THE SPEC'S SUGGESTIONS. The source's
 * "suggested internal links" name `/assurance/iec-62278-2-railway-safety`,
 * `/platform/cyber-digital-twin` and `/resources/technical-specification`;
 * the routes that actually exist here are `/assurance/iec-62278-2`, `/cdt-2`
 * and `/technical-specification`. PATHS is the authority, not the draft.
 * (Corrected 2026-08-23 — this page briefly shipped at `/assurance/
 * iec-62278-1`, a mislabelling; see that page's own doc comment.)
 *
 * EN-ONLY, deliberately — the same guard the page has carried since it was
 * created, and the precedent nav.ts records for /assurance and
 * /technical-specification specifically. The five framework sub-pages below
 * it render both locales; that difference is intentional and documented
 * there.
 */
export default async function AssurancePage(props: PageProps<"/[locale]/assurance">) {
  const { locale } = await props.params;
  if (!hasLocale(locale) || locale !== "en") notFound();
  const d = await getDictionary(locale);

  const contact = localePath(locale, PATHS.contact);
  const spec = localePath(locale, PATHS.technicalSpecification);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Assurance"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.company), label: d.nav.company }]}
      />

      <header className="pt-10 lg:pt-14">
        <p className="oxot-kicker">{HERO.kicker}</p>
        <h1 className="mt-4">{HERO.h1}</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
          <div>
            <p className="max-w-[62ch] font-display text-lg font-bold leading-snug text-foreground">{HERO.lede}</p>
            <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">{HERO.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Ask href={contact}>Discuss an assurance use case</Ask>
              <Onward href={localePath(locale, PATHS.cdt2)}>Explore the Cyber Digital Twin</Onward>
            </div>
            <div className="mt-10">
              <TermStrip label="Frameworks supported" terms={HERO.frameworks} />
            </div>
          </div>
          <FlowChain items={HERO.flow} label="Evidence flow" />
        </div>
      </header>

      <section aria-labelledby="problem" className="mt-16 border-t border-border pt-10">
        <SectionHead id="problem" n="01" label="The assurance problem" heading={PROBLEM.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{PROBLEM.intro}</p>
          <div className="mt-6 max-w-3xl">
            <ConnectList items={PROBLEM.sources} />
          </div>
          <p className="prose-measure mt-8 body-lead leading-relaxed text-muted-foreground">{PROBLEM.bridge}</p>
          <div className="mt-5">
            <Pull>{PROBLEM.pull}</Pull>
          </div>
          <h3 className="h-micro mt-10">{PROBLEM.tableHeading}</h3>
          <div className="mt-4">
            <DataTable
              caption="Fragmented assurance approaches and their consequences"
              head={FRAGMENTED_HEAD}
              rows={FRAGMENTED_ROWS}
            />
          </div>
          <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">{PROBLEM.close}</p>
        </div>
      </section>

      <section aria-labelledby="one-model" className="mt-16 border-t border-border pt-10">
        <SectionHead id="one-model" n="02" label="One model, many assurance views" heading={ONE_MODEL.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <LayerStack layers={ONE_MODEL.stack} label="From source evidence to framework view" />
          <p className="prose-measure mt-8 body-lead leading-relaxed text-muted-foreground">
            {ONE_MODEL.lenses}
          </p>
          <h3 className="h-micro mt-10">{ONE_MODEL.changeHeading}</h3>
          <div className="mt-4">
            <DataTable
              caption="Traditional assurance approach compared with the OXOT assurance model"
              head={CHANGE_HEAD}
              rows={CHANGE_ROWS}
              minWidth="46rem"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="frameworks" className="mt-16 border-t border-border pt-10">
        <SectionHead id="frameworks" n="03" label="Assurance frameworks" heading={FRAMEWORKS.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{FRAMEWORKS.intro}</p>
          <div className="mt-6">
            <DataTable
              caption="The five assurance areas, their primary focus, and what OXOT helps connect"
              head={FRAMEWORK_HEAD}
              rows={FRAMEWORK_ROWS}
              minWidth="52rem"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="iec-62443" className="mt-16 border-t border-border pt-10">
        <SectionHead id="iec-62443" n="04" label="IEC 62443" heading={IEC_62443.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{IEC_62443.intro}</p>
          <h3 className="mono-label mt-8">OXOT connects</h3>
          <div className="mt-4 max-w-3xl">
            <ConnectList items={IEC_62443.connects} />
          </div>
          <div className="mt-8">
            <Pull>{IEC_62443.pull}</Pull>
          </div>
          <div className="mt-7">
            <Onward href={localePath(locale, PATHS.assuranceIec62443)}>{IEC_62443.cta}</Onward>
          </div>
        </div>
      </section>

      <section aria-labelledby="cra" className="mt-16 border-t border-border pt-10">
        <SectionHead id="cra" n="05" label="Cyber Resilience Act" heading={CRA.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{CRA.intro}</p>
          <p className="prose-measure mt-5 rounded-2xl border border-border bg-muted p-5 body-copy leading-relaxed text-foreground">
            {CRA.scope}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h3 className="mono-label">{CRA.bomsLabel}</h3>
              {/* The five BOM views are a key/value register, not prose — the
                  one place on this page where SpecRow is the honest shape. */}
              <dl className="mt-4">
                {CRA.boms.map((b) => (
                  <SpecRow key={b.k} k={b.k}>
                    {b.v}
                  </SpecRow>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mono-label">OXOT also connects</h3>
              <div className="mt-4">
                <ConnectList items={CRA.connects} />
              </div>
            </div>
          </div>
          <div className="mt-9">
            <Pull>{CRA.pull}</Pull>
          </div>
          <div className="mt-7">
            <Onward href={localePath(locale, PATHS.assuranceCra)}>{CRA.cta}</Onward>
          </div>
        </div>
      </section>

      <section aria-labelledby="ts-50701" className="mt-16 border-t border-border pt-10">
        <SectionHead id="ts-50701" n="06" label="TS 50701" heading={TS_50701.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{TS_50701.intro}</p>
          <h3 className="mono-label mt-8">OXOT connects</h3>
          <div className="mt-4 max-w-3xl">
            <ConnectList items={TS_50701.connects} />
          </div>
          <div className="mt-8">
            <Pull>{TS_50701.pull}</Pull>
          </div>
          <div className="mt-7">
            <Onward href={localePath(locale, PATHS.assuranceTs50701)}>{TS_50701.cta}</Onward>
          </div>
        </div>
      </section>

      <section aria-labelledby="iec-62278" className="mt-16 border-t border-border pt-10">
        <SectionHead id="iec-62278" n="07" label="IEC 62278-2:2025" heading={IEC_62278.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{IEC_62278.intro}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <LayerStack layers={IEC_62278.complement} label={IEC_62278.complementLabel} />
            <FlowChain items={IEC_62278.chain} label={IEC_62278.chainLabel} />
          </div>
          <h3 className="mono-label mt-9">OXOT connects</h3>
          <div className="mt-4 max-w-3xl">
            <ConnectList items={IEC_62278.connects} />
          </div>
          <div className="mt-8">
            <Pull>{IEC_62278.pull}</Pull>
          </div>
          <p className="prose-measure mt-7 body-copy leading-relaxed text-muted-foreground">
            {IEC_62278.disclaimer}
          </p>
          <div className="mt-7">
            <Onward href={localePath(locale, PATHS.assuranceIec62278)}>{IEC_62278.cta}</Onward>
          </div>
        </div>
      </section>

      <section aria-labelledby="rail" className="mt-16 border-t border-border pt-10">
        <SectionHead
          id="rail"
          n="08"
          label="The connection across rail assurance"
          heading={RAIL_CONNECTION.heading}
        />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">
            {RAIL_CONNECTION.intro}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <LayerStack layers={RAIL_CONNECTION.stack} label="One system story, four registers" />
            <div>
              <h3 className="h-micro mb-4">{RAIL_CONNECTION.exampleHeading}</h3>
              <Cascade items={RAIL_CONNECTION.example} />
            </div>
          </div>
          <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
            {RAIL_CONNECTION.close}
          </p>
        </div>
      </section>

      <section aria-labelledby="lifecycle" className="mt-16 border-t border-border pt-10">
        <SectionHead id="lifecycle" n="09" label="The evidence lifecycle" heading={LIFECYCLE.heading} />
        <div className="mt-8 sm:ml-[3.75rem]">
          <StepLadder steps={LIFECYCLE.steps} />
          <p className="prose-measure mt-9 body-lead leading-relaxed text-muted-foreground">
            {LIFECYCLE.close}
          </p>
        </div>
      </section>

      <section aria-labelledby="produce" className="mt-16 border-t border-border pt-10">
        <SectionHead id="produce" n="10" label="What OXOT can produce" heading={PRODUCE.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{PRODUCE.intro}</p>
          <div className="mt-6">
            <InventoryList items={PRODUCE.items} />
          </div>
          <p className="prose-measure mt-8 body-copy leading-relaxed text-muted-foreground">{PRODUCE.close}</p>
        </div>
      </section>

      <section aria-labelledby="provenance" className="mt-16 border-t border-border pt-10">
        <SectionHead id="provenance" n="11" label="Evidence and data provenance" heading={PROVENANCE.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{PROVENANCE.intro}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="max-w-3xl">
              <ConnectList items={PROVENANCE.sources} />
            </div>
            <Cascade items={PROVENANCE.drill} label={PROVENANCE.drillLabel} />
          </div>
          <h3 className="h-micro mt-10">{PROVENANCE.principlesHeading}</h3>
          <div className="mt-4">
            <DataTable
              caption="The evidence principles every OXOT output is held to"
              head={PRINCIPLE_HEAD}
              rows={PRINCIPLE_ROWS}
              minWidth="46rem"
            />
          </div>
          <p className="prose-measure mt-8 body-copy leading-relaxed text-muted-foreground">
            {PROVENANCE.close}
          </p>
          <div className="mt-7">
            <Onward href={localePath(locale, PATHS.assuranceEvidenceProvenance)}>{PROVENANCE.cta}</Onward>
          </div>
        </div>
      </section>

      <section aria-labelledby="test-first" className="mt-16 border-t border-border pt-10">
        <SectionHead id="test-first" n="12" label="Test before you claim" heading={TEST_FIRST.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
            <div>
              <p className="prose-measure body-lead leading-relaxed text-muted-foreground">
                {TEST_FIRST.intro}
              </p>
              <p className="prose-measure mt-6 body-copy leading-relaxed text-muted-foreground">
                {TEST_FIRST.close}
              </p>
              <div className="mt-7">
                <Onward href={localePath(locale, PATHS.decisionChangeSafely)}>How a change is tested</Onward>
              </div>
            </div>
            <Cascade items={TEST_FIRST.stages} label="Baseline to decision" />
          </div>
        </div>
      </section>

      <section aria-labelledby="not-claimed" className="mt-16 border-t border-border pt-10">
        <SectionHead id="not-claimed" n="13" label="What OXOT does not claim" heading={NOT_CLAIMED.heading} />
        <div className="mt-7 sm:ml-[3.75rem]">
          <p className="prose-measure body-lead leading-relaxed text-muted-foreground">{NOT_CLAIMED.intro}</p>
          <div className="mt-6 max-w-3xl">
            <BoundaryList items={NOT_CLAIMED.items} />
          </div>
          <p className="prose-measure mt-7 body-copy leading-relaxed text-muted-foreground">
            {NOT_CLAIMED.close}
          </p>
        </div>
      </section>

      <section aria-labelledby="start" className="mt-16 border-t border-border pt-10">
        <h2 id="start" className="h-section">
          {CLOSING.heading}
        </h2>
        <p className="prose-measure mt-5 body-lead leading-relaxed text-muted-foreground">{CLOSING.body}</p>
        <p className="prose-measure mt-4 body-lead leading-relaxed text-foreground">{CLOSING.body2}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Ask href={contact}>{CLOSING.primary}</Ask>
          <Onward href={spec}>{CLOSING.secondary}</Onward>
        </div>
      </section>

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
