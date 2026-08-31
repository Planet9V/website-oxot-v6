"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localePath, primaryNav, PATHS } from "./nav";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * The site header — four destinations and one ask.
 *
 * Every top-level item navigates. That is the fix for the single worst defect
 * in the previous site's chrome: two of its three top-level entries were
 * dropdown triggers with no href, so the reader who clicked "CRA Readiness"
 * — the thing they arrived for — got a panel instead of a page.
 *
 * This is a client component for exactly two reasons: `usePathname` drives the
 * active-state underline, and the mobile disclosure has to close itself after a
 * client-side navigation. Everything it renders is still in the server HTML, so
 * the chrome is correct at first paint with JS disabled. Nothing here is hidden
 * behind hydration.
 *
 * It takes the `nav` and `theme` SLICES rather than the whole dictionary. Props
 * to a client component are serialized into the RSC payload, and the dictionary
 * grows to hold every page's body copy — handing all of it to the header would
 * ship the entire site's text on every route to render six labels.
 */
export function SiteHeader({
  locale,
  nav,
  theme,
  language
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
  language: Dictionary["language"];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  /* Which top-level item has its children showing, by href. One at a time. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const items = primaryNav(locale, nav);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      {/* h-16 — the fixed header height from design system §7. */}
      <div className="oxot-canvas relative flex h-16 items-center justify-between gap-3">
        <Wordmark place="header" locale={locale} label={nav.home} />

        {/* Sans, 14px, sentence case, weight 400. Never uppercase, never
            letter-spaced — the wordmark owns that signature.

            xl:block, not lg:block (fixed 2026-08-25, superseding the prior
            2026-08-21 note below which was itself wrong at the low end of its
            own range): five items plus two dropdown chevrons plus the CTA
            button plus the theme toggle plus the language switch does NOT fit
            at 1024px, the old lg: breakpoint. A dense Playwright sweep across
            20 widths (not just this repo's own 4 fixed regression widths)
            found the whole document overflowing horizontally by 232px at
            1024px and 104px at 1152px — the desktop nav switching on exactly
            where it didn't yet fit — while 1280px (xl:) measured a clean 0px.
            That confirms the OTHER comment on this file, on the CTA label
            below, which already said "the nav is tight between about 1100 and
            1280px" — two contradictory claims were left standing in the same
            file until this measurement resolved which one was true. Original
            2026-08-21 context, still accurate as history: Insights and
            Frameworks joined the bar as two more flat top-level items,
            wrapping the row and pushing the CTA off-screen at 834px under the
            even older md: breakpoint (768px). */}
        <nav aria-label={nav.primary} className="hidden xl:block">
          <ul className="flex items-center gap-x-1">
            {items.map((item) => {
              /* A parent is active when one of its children is: a reader on
                 /retainer should still see where they are in the bar. */
              const active =
                isActive(item.href) || !!item.children?.some((c) => isActive(c.href));
              const expanded = openMenu === item.href;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={item.children ? () => setOpenMenu(item.href) : undefined}
                  onMouseLeave={item.children ? () => setOpenMenu(null) : undefined}
                  onKeyDown={
                    item.children
                      ? (event) => {
                          if (event.key === "Escape") setOpenMenu(null);
                        }
                      : undefined
                  }
                  /* Focus leaving the whole item closes it — otherwise tabbing
                     past the last child leaves a panel open behind you. */
                  onBlur={
                    item.children
                      ? (event) => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                            setOpenMenu(null);
                          }
                        }
                      : undefined
                  }
                >
                  <span className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onFocus={item.children ? () => setOpenMenu(item.href) : undefined}
                      className={[
                        "relative block rounded-md py-1.5 text-base",
                        item.children ? "pl-3 pr-1" : "px-3",
                        "transition-colors duration-150 ease-brand",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        active
                          ? "text-primary-ink"
                          : "text-foreground/70 hover:text-foreground"
                      ].join(" ")}
                    >
                      {item.label}
                      {/* The active indicator is a 2px bar inset 12px each side,
                          not a filled background (§7). inset-x-3 IS that 12px. */}
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full bg-primary",
                          "transition-transform duration-150 ease-brand",
                          active ? "scale-x-100" : "scale-x-0"
                        ].join(" ")}
                      />
                    </Link>

                    {/* A SEPARATE CONTROL, and that is the whole point. The
                        label above navigates; this opens the list. The old
                        site made the label itself a trigger, so a reader who
                        clicked "CRA Readiness" got a panel instead of the page
                        they came for. */}
                    {item.children ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`nav-sub-${item.href}`}
                        aria-label={`${item.label} — ${expanded ? nav.closeMenu : nav.openMenu}`}
                        onClick={() => setOpenMenu(expanded ? null : item.href)}
                        className={[
                          "mr-1 flex size-11 items-center justify-center rounded",
                          "text-foreground/60 transition-colors duration-150 ease-brand hover:text-foreground",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        ].join(" ")}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                          className={[
                            "size-3.5 transition-transform duration-200 ease-brand",
                            "motion-reduce:transition-none",
                            expanded ? "rotate-180" : ""
                          ].join(" ")}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    ) : null}
                  </span>

                  {item.children ? (
                    <ul
                      id={`nav-sub-${item.href}`}
                      hidden={!expanded}
                      className="absolute left-0 top-full z-50 min-w-[15rem] rounded-lg border border-border bg-background p-1.5 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            aria-current={isActive(child.href) ? "page" : undefined}
                            className={[
                              "block rounded-md px-3 py-2 text-base",
                              "transition-colors duration-150 ease-brand hover:bg-accent",
                              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                              isActive(child.href) ? "text-primary-ink" : "text-foreground/80"
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* THE LANGUAGE SWITCH BELONGS UP HERE. It shipped in the footer
              only, so on a site whose first rule is that nothing exists in one
              language, a Dutch reader had to scroll a whole page to find out
              Dutch was on offer. Hidden below `sm` because at 390px the bar
              already carries wordmark + theme + CTA + menu; the same switch is
              in the disclosure panel below for those widths. */}
          <ThemeToggle label={theme.toggle} />

          {/* A HEADER CTA AGAIN — but a different one, and the difference is
              the point. The old one was "Get your CRA class" pointing at
              /check: an OFFER, and it competed with whatever offer the page
              was already making, which is why it was removed.

              This is a ROUTE, not an offer. Every page ends by asking the
              reader to talk to us and /contact was reachable only from a
              dropdown; this makes the funnel reachable from anywhere without
              arguing with the page's own ask.

              "Talk to us" and not "Start a conversation" (10 characters
              against 20): the full nav only appears at xl: (1280px, see that
              breakpoint's own comment above — moved from lg: 2026-08-25 after
              it measured 232px of real overflow at 1024px), and even there a
              long label is what would break the row. Dutch runs longer still,
              so it is icon-free and hidden below `sm`, where the bar already
              carries wordmark + theme + menu. */}
          <Link
            href={localePath(locale, PATHS.contact)}
            className={[
              "hidden sm:inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md",
              "bg-primary px-4 text-base font-medium text-on-accent",
              "transition-[background-color,transform] duration-200 ease-brand",
              "hover:bg-primary/90 active:scale-[0.98]",
              "motion-reduce:transition-none motion-reduce:active:scale-100",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            ].join(" ")}
          >
            {nav.headerCta}
          </Link>

          <div className="hidden sm:block">
            <LanguageSwitch locale={locale} label={language.label} compact />
          </div>

          {/* The mobile disclosure. A real <details>, so the menu opens with
              JavaScript switched off; controlled only so a client-side
              navigation can close it again. xl:hidden, matching the desktop
              nav's own xl:block above (moved from lg:hidden 2026-08-25, same
              fix, same reason) — this and the full nav are an exclusive
              either/or, so both switch on the same breakpoint or the header
              can show neither (a gap) or both (the overflow this fixed). */}
          <details
            open={menuOpen}
            onToggle={(event) => setMenuOpen(event.currentTarget.open)}
            className="xl:hidden"
          >
            <summary
              aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
              className={[
                "flex size-9 cursor-pointer list-none items-center justify-center rounded-md",
                "border border-border text-muted-foreground marker:content-none",
                "transition-colors duration-150 ease-brand hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "[&::-webkit-details-marker]:hidden"
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
                )}
              </svg>
            </summary>

            <div className="absolute inset-x-0 top-full border-b border-border bg-background p-3 shadow-lg">
              {/* NO DROPDOWN AT THIS WIDTH. A hover-or-tap disclosure inside an
                  already-open panel is the other half of the old site's
                  navigation problem: on touch there is no hover, so the first
                  tap opens and the second navigates, and readers learn to
                  distrust the control. The children are simply indented items,
                  visible the moment the menu is. */}
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={[
                        "block rounded-md px-3 py-2.5 text-base",
                        "transition-colors duration-150 ease-brand hover:bg-accent",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        isActive(item.href)
                          ? "bg-accent text-primary-ink"
                          : "text-foreground/80"
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>

                    {item.children ? (
                      <ul className="ml-3 flex flex-col gap-0.5 border-l border-border pl-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={isActive(child.href) ? "page" : undefined}
                              className={[
                                "block rounded-md px-3 py-2 text-base",
                                "transition-colors duration-150 ease-brand hover:bg-accent",
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                                isActive(child.href)
                                  ? "bg-accent text-primary-ink"
                                  : "text-foreground/70"
                              ].join(" ")}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 sm:hidden">
                <span className="mono-label text-muted-foreground">{language.label}</span>
                <LanguageSwitch locale={locale} label={language.label} compact />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
