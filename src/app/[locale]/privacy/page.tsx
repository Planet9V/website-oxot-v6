import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { LegalPage } from "@/components/legal/legal-page";
import { PRIVACY } from "@/content/legal";

export async function generateMetadata(
  props: PageProps<"/[locale]/privacy">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: `${pick(PRIVACY.title, locale)} — OXOT`,
    description: pick(PRIVACY.lede, locale),
    alternates: localeAlternates(locale, PATHS.privacy)
  };
}

export default async function PrivacyPage(props: PageProps<"/[locale]/privacy">) {
  const { locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      doc={PRIVACY}
      breadcrumb={t.nav.breadcrumb}
      updatedLabel={t.legal.updated}
      otherLinks={[
        { href: localePath(locale, PATHS.cookies), label: t.legal.cookiesLink },
        { href: localePath(locale, PATHS.terms), label: t.legal.termsLink }
      ]}
    />
  );
}
