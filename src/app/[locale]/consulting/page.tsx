import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { ThreeDoors } from "@/components/shell/three-doors";
import { Hero } from "@/components/consulting-2/Hero";
import { HowWeWork } from "@/components/consulting-2/HowWeWork";
import { Method } from "@/components/consulting-2/Method";
import { TwinInConsulting } from "@/components/consulting-2/TwinInConsulting";
import { Services } from "@/components/consulting-2/Services";
import { EngagementModels } from "@/components/consulting-2/EngagementModels";
import { IecUnderneath } from "@/components/consulting-2/IecUnderneath";
import { Commitments } from "@/components/consulting-2/Commitments";
import { RelatedLinks } from "@/components/consulting-2/RelatedLinks";
import { FinalCta } from "@/components/consulting-2/FinalCta";

/**
 * SEO title and meta description, transcribed from the spec's own Metadata
 * block — `new_material_source/1_website_layout_v4/6_consulting/consulting.md`
 * L518 and L521 respectively. Neither is invented and neither is edited.
 *
 * THEY LIVE HERE RATHER THAN IN A `content.*.ts` FILE because the content
 * modules for this page were authored by another owner and are off-limits to
 * this build; adding a `META` export to one of them would be editing a file
 * this task does not own. If those files later grow a `META` block, this
 * constant is what it replaces.
 *
 * Not `Bilingual`: the spec supplies one English pair, and a `pick()` over a
 * same-as-English placeholder would dress a monolingual fact as a translated
 * one. Every other string on the page goes through `pick()` as the codebase
 * does.
 *
 * THE BRAND SUFFIX IS DROPPED FROM THE TITLE, DELIBERATELY. L518 reads
 * "…| Cyber Digital Twin | OXOT", but `[locale]/layout.tsx` already declares
 * `title.template` as `"%s | OXOT"` (`i18n/en.ts`, `i18n/nl.ts`), so shipping
 * the spec's trailing "| OXOT" renders "… | OXOT | OXOT" in the browser tab and
 * in the SERP. Measured on this route before the trim: the document title came
 * back as "OT Cybersecurity Consulting Services | Cyber Digital Twin | OXOT |
 * OXOT". Every other META.title in this codebase omits the suffix for the same
 * reason (`decisions/overview/content.ts`, `industries/rail-transportation-2/
 * content.ts`). The spec's words are otherwise transcribed unchanged; only the
 * duplicated brand token the template supplies is removed.
 */
const META = {
  /** Spec L518, less the trailing "| OXOT" the title template appends. */
  title: "OT Cybersecurity Consulting Services | Cyber Digital Twin",
  /** Spec L521. */
  description:
    "OXOT provides engineering-led OT cybersecurity consulting for critical systems. Use the Cyber Digital Twin to assess risk, design segmentation, secure vendor access, build programmes, establish baselines, and transfer capability."
};

export async function generateMetadata(
  props: PageProps<"/[locale]/consulting">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  return {
    title: META.title,
    description: META.description,
    alternates: localeAlternates(locale, PATHS.consulting)
  };
}

/**
 * /consulting — the Consulting page, rebuilt from scratch.
 *
 * BUILT WITH ZERO REFERENCE TO THE PAGE IT REPLACES (owner direction,
 * 2026-08-30). The former `/consulting` page and `src/components/consulting/**`
 * were not opened, read, diffed against or copied from. The single source is
 * `new_material_source/1_website_layout_v4/6_consulting/consulting.md`, via the
 * `content.*.ts` slices in `src/components/consulting-2/`, each of which carries
 * the source line for every string it ships.
 *
 * PROMOTED TO THE LIVE ROUTE, 2026-08-31 (owner). This build was constructed at
 * `/consulting-2` beside the then-live page; the owner promoted it to
 * `/consulting` and moved the page it replaces to `/consulting-2`, which is
 * preserved as legacy and deliberately not linked from the nav. `PATHS.consulting`
 * (`shell/nav.ts`) resolves here; there is no `PATHS` entry for the legacy route.
 *
 * COMPOSITION ONLY. Every section owns its own copy, its own markup and its own
 * reasoning; this file decides running order and nothing else. The order is the
 * spec's: the promise (Hero), how the work is done (HowWeWork, Method), what
 * carries it (TwinInConsulting), what is actually sold (Services), how to buy it
 * (EngagementModels), what it rests on (IecUnderneath), what is promised
 * (Commitments), where to go next (RelatedLinks).
 *
 * ANCHORS, NOT ACCORDIONS (owner decision, recorded in `consulting-2/
 * content.ts`). Every section is open and server-rendered, and the ids the page
 * exposes are `ANCHORS` in that file. No component in this tree carries a
 * client directive.
 *
 * NO PAGE-LOCAL CLOSING CTA. The global `ContactBand` renders for this route
 * from `[locale]/layout.tsx` — `/consulting` is deliberately NOT in
 * `SUPPRESS_CONTACT_BAND` (`shell/nav.ts`) — followed by `ThreeDoors`, the same
 * close `/assurance` and the decision pages carry.
 * `content.finalCta.ts` exists in the folder and is deliberately not rendered
 * here: a page-local final CTA above the global band would put two closing asks
 * back to back, which is the duplication the suppression list exists to avoid.
 *
 * THE BREADCRUMB CRUMB IS A LITERAL, matching `Hero.tsx`, which prints the same
 * word as its kicker for the same reason: "Consulting" is the spec's own name
 * for this destination — navigational identity rather than copy — and no
 * content slice ships a breadcrumb string. Both locales render; the `nl` side of
 * every `Bilingual` on this page is a same-as-English placeholder pending
 * translation, which the content files state plainly.
 */
export default async function ConsultingPage(props: PageProps<"/[locale]/consulting">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const d = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-16">
      <Breadcrumb
        here="Consulting"
        homeHref={localePath(locale, PATHS.home)}
        label={d.nav.breadcrumb}
      />

      <Hero locale={locale} />
      <HowWeWork locale={locale} />
      <Method locale={locale} />
      <TwinInConsulting locale={locale} />
      <Services locale={locale} />
      <EngagementModels locale={locale} />
      <IecUnderneath locale={locale} />
      <Commitments locale={locale} />
      <RelatedLinks locale={locale} />
      <FinalCta locale={locale} />

      <ThreeDoors locale={locale} t={d.doors} />
    </div>
  );
}
