import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { LegalPage } from "@/components/legal/legal-page";
import { TERMS } from "@/content/legal";

export async function generateMetadata(
  props: PageProps<"/[locale]/terms">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: `${pick(TERMS.title, locale)} — OXOT`,
    description: pick(TERMS.lede, locale),
    alternates: localeAlternates(locale, PATHS.terms)
  };
}

export default async function TermsPage(props: PageProps<"/[locale]/terms">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      doc={TERMS}
      breadcrumb={t.nav.breadcrumb}
      updatedLabel={t.legal.updated}
      otherLinks={[
        { href: localePath(locale, PATHS.privacy), label: t.legal.privacyLink },
        { href: localePath(locale, PATHS.cookies), label: t.legal.cookiesLink }
      ]}
    />
  );
}
