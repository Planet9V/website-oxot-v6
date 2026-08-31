"use client";

import { usePathname } from "next/navigation";
import { ContactBand } from "./contact-band";
import { SUPPRESS_CONTACT_BAND } from "./nav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * Wraps ContactBand with the one thing it doesn't do itself: not rendering
 * on the handful of routes in SUPPRESS_CONTACT_BAND that carry their own,
 * more specific closing CTA. A client component for the same single reason
 * SiteHeader is one — `usePathname()` — and for no other; ContactBand itself
 * stays a plain server component, still correct as the default for every
 * route not in the suppression list.
 */
export function ConditionalContactBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  const pathname = usePathname();
  const path = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  if (SUPPRESS_CONTACT_BAND.has(path)) return null;

  return <ContactBand locale={locale} t={t} />;
}
