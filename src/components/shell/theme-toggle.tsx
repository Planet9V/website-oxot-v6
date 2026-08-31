"use client";

import { useRouter } from "next/navigation";

/**
 * The theme toggle.
 *
 * `layout.tsx` renders `data-theme` on <html> from the `oxot-theme` COOKIE —
 * DARK IS THE DEFAULT (design system §0.2), so it is `dark` unless the visitor
 * has explicitly chosen light. The OS preference is deliberately not consulted.
 * This component's only job is to flip that attribute and write the cookie
 * back. It does NOT own the theme in React state.
 *
 * WHY NO STATE. The current theme is unknowable during server rendering, so a
 * component that renders "Sun" or "Moon" from state would either mismatch on
 * hydration or have to render nothing until an effect ran — which is the same
 * flash the pre-paint script exists to prevent. Instead BOTH glyphs are in the
 * server HTML and CSS picks one (`dark:hidden` / `hidden dark:block`). The
 * button is correct in the markup, correct at first paint, and correct after a
 * click, with no effect and no hydration boundary to get wrong.
 *
 * The accessible name is therefore static too — "Toggle light or dark theme" is
 * true in both states, where "Switch to dark" would be a lie half the time and
 * cannot be derived at render. It arrives as a prop because it is a sentence,
 * and sentences on this site exist in two languages.
 */
export function ThemeToggle({ label }: { label: string }) {
  const router = useRouter();

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";

    /* Flip the DOM first so the change is instant — the cookie round-trip
       below must never be something the reader waits to see. */
    root.dataset.theme = next;

    /* A COOKIE, NOT localStorage. The server renders `data-theme` on <html>,
       because React remounts <html> on a cross-locale navigation and wipes
       anything it did not render itself. The server can read a cookie; it
       cannot read localStorage. */
    document.cookie = `oxot-theme=${next};path=/;max-age=31536000;SameSite=Lax`;

    /* Re-fetch the RSC payload so the cached server output carries the new
       value. Without this a later navigation can restore a payload rendered
       under the old cookie and silently flip the theme back. */
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      /* A stable hook for the chrome guards. They used to find this button as
         `header button[aria-label]` — the only labelled button in the header.
         The CRA submenu's chevron is also a labelled header button and sits
         earlier in the DOM, so that selector silently started toggling a menu
         instead of the theme, and two theme guards failed on a theme that was
         never broken. The label is a translated string, so it cannot be the
         hook either. */
      data-theme-toggle=""
      className={[
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md",
        "border border-border text-muted-foreground",
        "transition-[color,background-color,transform] duration-150 ease-brand",
        "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      ].join(" ")}
    >
      {/* Moon: shown on the light surface, because it is what a click gets you. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="size-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
      </svg>
      {/* Sun: shown on the dark surface. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="hidden size-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </svg>
    </button>
  );
}
