import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { say } from "@/content/claims";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT } from "@/components/contact/claims";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { hasLocale } from "@/i18n/config";
import { localePath, PATHS } from "@/components/shell/nav";
import { Breadcrumb } from "@/components/shell/breadcrumb";

export async function generateMetadata(
  props: PageProps<"/[locale]/contact">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    alternates: localeAlternates(locale, PATHS.contact)
  };
}

/**
 * /contact — where three site-wide CTAs land.
 *
 * REBUILT 2026-08-23 to match new_material_source/1_website_layout_v4/
 * 7_company/contact.md's own defined layout exactly: Hero, What to bring,
 * Select your decision, Contact form, Company details, Sensitive-information
 * notice. The h1, "what to bring" lede, decision selector (inside
 * ContactForm), extra form fields, company-details facts, and security note
 * were already spec-sourced (added 2026-08-22) and are unchanged.
 *
 * REMOVED: four "what to bring" bullets, a "twinAsk" aside, an r1-review
 * facts panel (reply ladder, who-replies, the RVO grant credential and its
 * announced date), and a founders/LinkedIn identity block — none of these
 * are in contact.md, and all of them predate it (the bullets and twinAsk are
 * 2026-08-21 CRA-era copy; the facts panel and founders block trace to an r1
 * review from 2026-08-07/09). Found via the same sweep that caught /company
 * and /consulting running on pre-spec content — see those pages' doc
 * comments. The company-details panel now states the company name and email
 * directly, since removing the old identity block also removed the only
 * place those two facts appeared.
 */
export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <div className="oxot-canvas pb-20">
      <Breadcrumb
        here={t.contact.breadcrumb}
        homeHref={localePath(locale, PATHS.home)}
        label={t.nav.breadcrumb}
      />

      <header className="mt-10 max-w-2xl">
        <p className="oxot-kicker">{t.contact.breadcrumb}</p>
        <h1 className="mt-4">{say(CONTACT.headline, locale)}</h1>
        <p className="prose-measure mt-6 text-lg leading-relaxed">{t.contact.whatToBringP1}</p>
        <p className="prose-measure mt-4 text-muted-foreground">{t.contact.whatToBringP2}</p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <section>
          <h2>{t.contact.sendHeading}</h2>
          <p className="prose-measure mt-3 text-muted-foreground">{t.contact.sendBody}</p>
          <div className="mt-8">
            <ContactForm locale={locale} t={t.form} />
          </div>
          {/* The "Before you submit" security note was REMOVED on 2026-08-27 by
              owner decision. It told visitors not to send classified,
              operationally sensitive or security-sensitive material — on the very
              form that exists to receive P&IDs, single-line electrical drawings,
              asset lists and BMS/EPMS maps, which are precisely the artifacts a
              Cyber Digital Twin is built from. It argued against the site's own
              primary conversion. Data handling is still disclosed where it
              belongs: the form's GDPR privacy note (`t.form.privacyNote`,
              rendered by contact-form.tsx). Do not reinstate without asking. */}
        </section>

        <section className="lg:pt-2">
          <h2 className="h-sub">{t.contact.companyDetailsHeading}</h2>
          <dl className="mt-6">
            <Fact term={t.contact.termCompany}>{say(CONTACT.entity, locale)}</Fact>
            <Fact term={t.contact.termAddress}>{say(CONTACT.address, locale)}</Fact>
            <Fact term={t.contact.termKvk}>{say(CONTACT.kvk, locale)}</Fact>
            <Fact term={t.contact.termVat}>{say(CONTACT.vat, locale)}</Fact>
            <Fact term={t.contact.termEmail}>
              <a className="text-primary-ink underline underline-offset-4" href={`mailto:${CONTACT.email.en}`}>
                {CONTACT.email.en}
              </a>
            </Fact>
          </dl>
        </section>
      </div>
    </div>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 border-t border-dashed border-border py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-5">
      <dt className="mono-label pt-0.5 font-bold text-foreground">{term}</dt>
      <dd className="min-w-0 body-copy leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  );
}
