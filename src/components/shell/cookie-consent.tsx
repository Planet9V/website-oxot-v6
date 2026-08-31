"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localePath, PATHS } from "./nav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * COOKIE CONSENT.
 *
 * Ported from the previous site, which handled this well, with two changes.
 *
 * CHANGE 1 — IT TELLS THE TRUTH ABOUT TODAY. This app currently sets exactly
 * one cookie, `oxot-theme`, which is strictly necessary for a preference the
 * visitor sets themselves. Under the GDPR and ePrivacy, consent is required for
 * cookies that are NOT strictly necessary. There are none, so there is nothing
 * to consent to, and `NON_ESSENTIAL_IN_USE` is `false` — the banner does not
 * appear. A banner demanding consent for cookies that do not exist is theatre,
 * and on the site of a firm that sells conformity it is the kind of thing a
 * prospect checks in ten seconds with devtools open.
 *
 * The machinery is built now rather than later so that the day analytics is
 * added, the gate already exists: flip `NON_ESSENTIAL_IN_USE`, and read
 * `hasAnalyticsConsent()` before loading anything. The failure mode this
 * prevents is the ordinary one — analytics ships first and consent is retrofitted
 * after it has already been collecting.
 *
 * CHANGE 2 — REFUSING IS EXACTLY AS EASY AS ACCEPTING. The old banner rendered
 * "Accept all" as the primary button and "Decline non-essential" as an outline.
 * EDPB guidance is explicit that the two choices must be equally prominent; an
 * accept button that is visually louder than reject is a recognised dark
 * pattern and has drawn enforcement across the EU. Both buttons here are the
 * same size, same weight and same visual prominence.
 *
 * Nothing here runs before a choice. There is no "continuing to browse means
 * you agree" — that is not consent under the GDPR.
 */

/**
 * Does this site currently set anything that needs consent?
 *
 * FALSE today: the only cookie is `oxot-theme`. Set to true in the same commit
 * that introduces analytics, a marketing pixel, an embedded third party, or
 * anything else non-essential — and gate that thing on `hasAnalyticsConsent()`.
 */
export const NON_ESSENTIAL_IN_USE = false;

const COOKIE = "oxot-consent";
const MAX_AGE = 60 * 60 * 24 * 180; // ~180 days, then we ask again
const OPEN_EVENT = "oxot:open-cookie-settings";

type Choice = "all" | "essential";

function read(): Choice | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)oxot-consent=([^;]+)/);
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === "all" || v === "essential" ? v : null;
}

/**
 * The gate. Anything non-essential must call this and get `true` before it
 * loads — not after, and not "unless the visitor objected".
 */
export function hasAnalyticsConsent(): boolean {
  return read() === "all";
}

/** Reopen the banner from the footer. Event-based so no context spans the boundary. */
export function openCookieSettings(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-muted-foreground underline underline-offset-4 transition-colors duration-150 ease-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {label}
    </button>
  );
}

const buttonBase = [
  "inline-flex h-10 min-w-[11rem] items-center justify-center rounded-md px-5",
  "text-sm font-medium",
  "transition-[background-color,transform] duration-200 ease-brand active:scale-[0.98]",
  "motion-reduce:transition-none motion-reduce:active:scale-100",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
].join(" ");

export function CookieConsent({
  locale,
  t
}: {
  locale: Locale;
  t: Dictionary["cookieBanner"];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only ever offered when there is something real to decide. Reopening from
    // the footer works either way, so a visitor can always see and change it.
    //
    // THE setState HERE IS DELIBERATE AND CANNOT MOVE INTO RENDER. `read()`
    // reads a cookie — a client-only external system. Deciding this during
    // render would make the server and the client disagree about whether the
    // banner exists, which is a hydration mismatch, and the banner would flash
    // for every visitor including those who already answered. Reading it in an
    // effect is the hydration-safe pattern, and it is precisely the
    // "subscribe to an external system" case the rule exempts in spirit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (NON_ESSENTIAL_IN_USE && !read()) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const choose = (value: Choice) => {
    document.cookie = `${COOKIE}=${value};path=/;max-age=${MAX_AGE};SameSite=Lax`;
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md"
    >
      <div className="oxot-canvas flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[46rem]">
          <p id="cookie-consent-title" className="text-sm font-semibold text-foreground">
            {t.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.body}{" "}
            <Link
              href={localePath(locale, PATHS.cookies)}
              className="text-primary-ink underline decoration-primary/40 underline-offset-4 hover:decoration-current"
            >
              {t.policyLink}
            </Link>
          </p>
        </div>

        {/* Equal prominence, deliberately. Decline comes FIRST in the DOM so it
            is also first for a keyboard and a screen reader. */}
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("essential")}
            className={`${buttonBase} border border-border bg-background text-foreground hover:bg-accent`}
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className={`${buttonBase} border border-border bg-background text-foreground hover:bg-accent`}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
