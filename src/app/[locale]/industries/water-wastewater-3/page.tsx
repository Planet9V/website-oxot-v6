import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { Diagram } from "@/components/diagrams/Diagram";
import {
  WATER_DRINKING_OT_PURDUE,
  WATER_WASTEWATER_OT_PURDUE
} from "@/components/diagrams/specs/water-ot-purdue";
import { META } from "@/components/industries/water-wastewater-3/content";
import { Capabilities } from "@/components/industries/water-wastewater-3/Capabilities";
import { IntakeCta } from "@/components/industries/water-wastewater-3/IntakeCta";
import { ProcessArchitecture } from "@/components/industries/water-wastewater-3/ProcessArchitecture";
import { Regulatory } from "@/components/industries/water-wastewater-3/Regulatory";
import { ScenarioRegister } from "@/components/industries/water-wastewater-3/ScenarioRegister";
import { SectorReality } from "@/components/industries/water-wastewater-3/SectorReality";
import { DecisionSwitchboard } from "@/components/industries/water-wastewater-3/DecisionSwitchboard";
import { Engagement } from "@/components/industries/water-wastewater-3/Engagement";
import { SystemAssets } from "@/components/industries/water-wastewater-3/SystemAssets";
import { TechnologyIndex } from "@/components/industries/water-wastewater-3/TechnologyIndex";
import { ThreeGateLedger } from "@/components/industries/water-wastewater-3/ThreeGateLedger";
import { WaterHero } from "@/components/industries/water-wastewater-3/WaterHero";

/**
 * /industries/water-wastewater-3 — ITERATION 3, a process-repeatability test.
 *
 * A from-scratch parallel build standing beside `/industries/water-wastewater`
 * (live), `-1` and `-2`. It imports NOTHING from any of them and none was
 * touched. Deliberately not in `primaryNav` — this is a review URL, same
 * precedent as `-1` and `-2`.
 *
 * BUILT IN WAVES, NOW COMPLETE. Wave 0 derived the shared asset/scenario data
 * and scaffolded this route with a local `SectionStub` per section — a visible
 * TODO naming the wave and component file that owned it, so an unbuilt section
 * was unmistakable in the browser rather than only in a comment. Waves 1 and 2
 * (4 parallel builders each, this project's real concurrency ceiling) then
 * replaced every stub with its real component. The stub function itself and
 * its now-dead imports were removed here at integration once zero `<SectionStub`
 * usages remained (verified, not assumed) — nothing left to clean up.
 *
 * SECTION ORDER is the ratified plan, which is the brief's own "Page structure"
 * (industry_water.md L371-382) with two additions and one relocation:
 *   · S03 Asset classes — added. `content.assets.ts` PASSED its falsification
 *     check 9/9 (all nine `SystemAssetType` values sourceable from the brief
 *     without fabricating an asset), which is the condition the plan set for
 *     this section existing at all. Had it failed, this stub would be absent.
 *   · S04 Technology index — promoted out of the architecture section, where
 *     the brief nests it (L149), because its table is a different content
 *     shape from the two process diagrams above it.
 *   · The four-view switcher (L62) and the drinking-water/wastewater selector
 *     (L102) live in S02 Architecture, NOT in the hero. The hero is Pattern 1
 *     and shows ONE strict path — the same `DOSING_SCENARIO` the worked
 *     example at S07 renders in full, shrunk, never a second illustration.
 *
 * REGULATORY LINKING, S09: the NIS2 row links to `PATHS.assurance`
 * (`/assurance`). `/assurance/nis2` does not exist on this site — see the
 * `LINKS` comment in content.ts for the full list of the brief's five other
 * stale suggested URLs and their real replacements.
 *
 * BOTH LOCALES RENDER — no `locale !== "en"` guard. Content is `Bilingual`
 * with `nl` a same-as-English placeholder pending translation, per registry.ts.
 */

export async function generateMetadata(
  props: PageProps<"/[locale]/industries/water-wastewater-3">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, `${PATHS.industries}/water-wastewater-3`)
  };
}

export default async function WaterWastewaterIterationThreePage(
  props: PageProps<"/[locale]/industries/water-wastewater-3">
) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-20">
      <Breadcrumb
        here="Water & Wastewater"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
        trail={[{ href: localePath(locale, PATHS.industries), label: "Industries" }]}
      />

      {/* S00 — Pattern 1 hero. ONE strict path from DOSING_SCENARIO, shrunk.
          No view switcher here; that is S02's. */}
      <WaterHero locale={locale} />

      {/* S01 — problem statement. Not a named pattern; see the component. */}
      <SectorReality locale={locale} />

      {/* S02 — the two selectable process diagrams AND the four-view switcher.
          Brings its own section shell, datum and h2, same convention as
          SystemAssets and DecisionSwitchboard below.

          THE OT VIEW IS RENDERED HERE, NOT IN THE SECTION, and the boundary is
          the reason. `ProcessArchitecture` is `"use client"` — it holds the two
          selectors in `useState` — while `Diagram` is an ASYNC SERVER COMPONENT
          that awaits ELK so the layout runs once in Node at build time and the
          page ships finished SVG. A client component cannot call one, and must
          not: `Diagram` reaches `resolveSymbol`, which pulls the 462 KB
          `drawio-manifest.ts` in behind it, and importing that from the client
          side would drop a whole stencil library into a marketing page's bundle.

          So both variants are rendered here as Server Components and passed down
          as ready-made elements. The client component only chooses which of the
          two to mount. The layout engine, the glyph registry and the manifest
          all stay in Node — verified with `next build`, not assumed. */}
      <ProcessArchitecture
        locale={locale}
        otDiagrams={{
          drinking: (
            <Diagram id="ww3-ot-drinking" locale={locale} spec={WATER_DRINKING_OT_PURDUE} />
          ),
          wastewater: (
            <Diagram id="ww3-ot-wastewater" locale={locale} spec={WATER_WASTEWATER_OT_PURDUE} />
          )
        }}
      />

      {/* S03 — exists because content.assets.ts passed its check 9/9. Pattern 3
          via the shared `components/twin/AssetClassBento`; the component brings
          its own section, datum rule and heading. */}
      <SystemAssets locale={locale} />

      {/* S04 — the brief's eight-row technology table as eight real definition
          lists. Owns its own section shell, datum and h2. */}
      <TechnologyIndex locale={locale} />

      {/* S05 — the ten-row risk-scenario register. No named pattern covers a
          scenario matrix; see the component for why Pattern 7 is a trap here. */}
      <ScenarioRegister locale={locale} />

      {/* S06 — Foundation Deliverable 2. Owns its own section shell, datum and
          h2, same convention as SystemAssets above. */}
      <DecisionSwitchboard locale={locale} />

      {/* S07 — Pattern 2, the SAME DOSING_SCENARIO the hero shows, in full */}
      <ThreeGateLedger locale={locale} />

      {/* S08 — the page's ONE editorial schedule. Owns its own section shell,
          datum and h2, same convention as SystemAssets above. */}
      <Capabilities locale={locale} />

      {/* S09 — nine-row obligation matrix. NIS2 links to PATHS.assurance (there
          is no /assurance/nis2) and only in English, since /nl/assurance 404s.
          Owns its own section shell, datum and h2. */}
      <Regulatory locale={locale} />

      {/* S10 — Pattern 6's Scope Rail variant: the brief's four entry points are
          CHOSEN BETWEEN, so the rail selects rather than steps. Owns its own
          section shell, datum and h2. */}
      <Engagement locale={locale} />

      {/* S11 — sector-specific CTA plus the brief's seven-control qualification
          intake. Owns its own section shell, datum and h2. */}
      <IntakeCta locale={locale} />

      <div className="mt-20">
        <ThreeDoors locale={locale} t={d.doors} />
      </div>
    </div>
  );
}
