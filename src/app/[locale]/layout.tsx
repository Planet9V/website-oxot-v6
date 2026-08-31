import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Instrument_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { CookieConsent } from "@/components/shell/cookie-consent";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { ConditionalContactBand } from "@/components/shell/conditional-contact-band";
import { MotionProvider } from "@/components/shell/motion-provider";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, LOCALE_HREFLANG, hasLocale } from "@/i18n/config";
import { ROBOTS_DIRECTIVE } from "@/lib/site-visibility";
import "../globals.css";

/**
 * Three typefaces, three jobs, no overlap (design system §3).
 *
 * next/font downloads the WOFF2 at build time and serves it from our own
 * origin, so the browser never contacts Google. That is a GDPR requirement for
 * EU/NL visitors, not a performance preference — and it is the one deliberate
 * deviation from the design-system spec, which uses a Google Fonts @import.
 */
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap"
});

/**
 * 700 is not optional. The heading scale uses TWO conventions: page titles are
 * serif at NORMAL weight (400), every other heading role is the same serif at
 * BOLD (700). Without a real 700 face the browser synthesises one by smearing
 * the 400 outlines, which reads as slightly muddy rather than obviously
 * broken — the worst kind of wrong. 600 is here for the same reason.
 */
const display = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  /* The italic face was dropped with the last italic in the app. */
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap"
});

/** Both languages are prerendered. Neither is a second-class build target. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL("https://oxot.nl"),
    title: { default: t.meta.title, template: t.meta.titleTemplate },
    description: t.meta.description,
    /* Noindex unless this deploy is explicitly the real site. Metadata
       inherits, so one line here covers every route beneath it — see
       `lib/site-visibility.ts` for why the default is "not the real site". */
    robots: ROBOTS_DIRECTIVE,

    /* THE SHARE CARD. There was none, so a pasted link previewed with the
       Next.js default — a framework's logo on a page selling engineering
       credibility. `opengraph-image.tsx` at the app root generates the image;
       these declare it, and give each locale its own language and URL so a
       Dutch link shared in a Dutch channel previews in Dutch.

       THE IMAGE FILE LIVES IN THIS SEGMENT, not at the app root. It was at
       `src/app/opengraph-image.tsx` and produced NO og:image tag at all:
       declaring an explicit `openGraph` object in a child segment replaces the
       inherited one, file-based image included. Colocating it with the layout
       that declares openGraph is what makes Next attach it. Verified by
       grepping the rendered head for og:image — absent before, present now. */
    applicationName: "OXOT",
    /* NO `title` OR `description` HERE, AND THAT ABSENCE IS THE POINT.
       Next merges metadata per KEY: a layout that sets `openGraph.title` beats
       every descendant page that never sets one, and this is the ONLY file in
       `src/app` declaring `openGraph` at all. So all 52 routes shared a single
       og:title — every shared link to a sector, decision or assurance page
       previewed with the HOME page's headline, even though 53 files set their
       own `title`. Leaving both keys unset lets Next back-fill them from each
       page's own `title`/`description`, which is what makes a shared link
       describe the page behind it. The image is unaffected: it is file-based,
       colocated with this layout, and inherits normally. */
    openGraph: {
      type: "website",
      siteName: "OXOT",
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "nl" ? "en_GB" : "nl_NL",
      url: `https://oxot.nl/${locale}`
    },
    twitter: {
      card: "summary_large_image"
    },

    /* The organisation behind the site, for crawlers that read it. */
    authors: [{ name: "Oxot B.V.", url: "https://oxot.nl" }],
    creator: "Oxot B.V.",
    publisher: "Oxot B.V.",
    category: "OT security engineering",
    formatDetection: { telephone: false, address: false, email: false }
    /* NO `alternates` HERE. Metadata inherits, so a canonical declared at the
       layout applies to every route beneath it — and /nl/cra was shipping
       canonical=/nl with hreflang pointing at the homepage. Each page declares
       its own via localeAlternates(locale, path). */
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  /*
    404 rather than fall back to English. A URL like /de/cra that quietly
    renders English is a page that looks translated to a crawler and lies to a
    reader; `notFound()` is the honest answer to "we do not have that language".
  */
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary(locale);

  /* Dark unless the visitor has explicitly chosen light — the same rule the
     pre-paint script used to enforce, now readable on the server. */
  const theme = (await cookies()).get("oxot-theme")?.value === "light" ? "light" : "dark";

  return (
    /*
      The font variables go on <html>, not <body>.

      Tailwind 4 resolves @theme at :root. `--font-sans` is defined there as
      `var(--font-instrument-sans), …`, so if next/font's variable is only
      declared on <body> it is out of scope at the point the theme resolves, and
      every typeface silently falls back to -apple-system. Measured: h1 rendered
      -apple-system at the correct 40px, so it looked almost right and was wrong.
    */
    <html
      lang={LOCALE_HREFLANG[locale]}
      data-theme={theme}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      {/*
        NO PRE-PAINT THEME SCRIPT. There was one, and it could not work here.

        DEFAULT THEME IS DARK — design system §0.2. Not "follow the OS", and not
        light-with-a-dark-option: dark unless the visitor has explicitly chosen
        light. Per the owner it is the single change that made the biggest
        visual difference, and honouring the OS preference would hand half of
        all visitors the theme this design was not tuned for.

        The script set the theme imperatively on <html> before first paint,
        which is the standard no-flash trick and is correct for a full page
        load. It is silently wrong here. `[locale]` is the ROOT segment, so
        going from /en/x to /nl/x changes the root layout's identity and React
        REMOUNTS <html> — measured: a class, `data-theme` and an unrelated
        `data-foo` are all wiped, while a same-locale navigation keeps all
        three. Every reader who pressed EN or NL was therefore dropped into
        light mode, and the remount re-encountered the script element, logging
        "Encountered a script tag while rendering React component".

        So the theme is a COOKIE and React renders `data-theme` itself. It
        survives the remount because it is React's own output, there is no
        flash on first paint because it is in the server HTML, and there is no
        script to warn about.

        THE TRADE: reading a cookie opts this layout out of static rendering.
        Worth it — the pages are cheap to render and a visibly broken theme is
        not a performance problem worth having.
      */}
      {/*
        Shell per design system §7: flex column, never a sidebar. The
        max-w-[100vw] + overflow-x-hidden pair is load-bearing — it is what
        stops a single over-wide child scrolling the whole page sideways at
        390px, which is the failure the measure harness exists to catch.
      */}
      <body className="flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-x-hidden bg-background">
        {/*
          The skip link. Off-screen until focused, then it snaps into the
          top-left corner on the accent fill. `sr-only` + `focus:not-sr-only`
          keeps it out of the visual design without keeping it out of the
          accessibility tree.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          {t.nav.skipToContent}
        </a>
        <MotionProvider>
          <SiteHeader locale={locale} nav={t.nav} theme={t.theme} language={t.language} />
          {/*
            THE PAGE'S MAIN LANDMARK LIVES HERE, NOT IN THE PAGE.
            Every route gets exactly one <main> by construction, and the skip
            link always has a target. Pages render sections; a page that renders
            its own <main> nests two landmarks and breaks both.
          */}
          <main id="main" className="flex-1">
            {props.children}
          </main>
          <ConditionalContactBand locale={locale} t={t} />
          <SiteFooter locale={locale} t={t} />
          <CookieConsent locale={locale} t={t.cookieBanner} />
        </MotionProvider>
      </body>
    </html>
  );
}
