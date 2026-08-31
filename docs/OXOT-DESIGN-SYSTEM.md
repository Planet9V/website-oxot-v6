# OXOT Design System — THE SOURCE OF TRUTH

**Source:** the owner's spec *"OXOT Conformity — Design System Spec"*
(claude.ai artifact `d295f1e5-f9bf-4f89-bd89-436a66e31829`), fetched in full
2026-08-07, plus the owner's three mandatory setup requirements (§0). Every
value in that spec is stated to come **directly from `artifacts/conformity/src`**
with real file:line citations and no invented defaults.

> **THIS FILE IS CANONICAL AND BINDING.** Every page, component and application
> that renders an OXOT surface takes its colours, typefaces, heading roles,
> radii, shadows, motion and interaction states from here. If a component needs
> a value that is not in this document, **the value is wrong — not the
> document.**
>
> **Machine-readable companion:** `docs/OXOT-DESIGN-SYSTEM.css` — the same
> system as literal tokens, ready to paste into a project's CSS entry point.
>
> Referenced by `CLAUDE.md` (project law) and `web/BUILD-LAW.md` (standing law
> for every page builder). Both require compliance 100% of the time.

**Provenance note.** An earlier paste of this spec arrived clipped at a fixed
column and was reconstructed. The artifact fetch replaced every reconstruction
with the real value. Where this document *derives* a value the spec does not
state literally (the mid-steps of the shadow scale, three dark `reg-*` colours),
it is marked **[DERIVED]** — everything else is verbatim.

---

## 0. Three mandatory requirements (owner, 2026-08-07)

**The CSS alone does not produce the look. These three are not optional.**

### 0.1 shadcn/ui — `new-york`, `neutral`, CSS variables ON

```bash
npx shadcn@latest init      # style: new-york · baseColor: neutral · cssVariables: true
npx shadcn@latest add card button badge dialog dropdown-menu tabs input select
```

The components read the tokens in §2 automatically. Choosing a different style
or base colour silently breaks the system.

### 0.2 Default theme = **dark**

Whatever theme provider is in use (`next-themes` or hand-rolled), set
`defaultTheme="dark"`.

> This is a **config choice, not something in the CSS file** — and per the
> owner it is **the single change that made the biggest visual difference** in
> the earlier comparison.

### 0.3 Every default `<Card>` lifts on hover

Add to the root `className` of `components/ui/card.tsx`:

```
transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0
```

Base-component behaviour, applied once. **Never re-implemented per card.**

---

## 1. Why this system reads as "more professional"

Straight from the spec, because it names what actually creates the quality
difference:

> It isn't one thing — it's the accumulation of a fuller shadow system
> (warm-tinted, two-layer, theme-aware), a restrained heading scale used
> consistently per content-type, a token-based translucent card recipe repeated
> 10+ times verbatim, and genuinely purposeful motion (data-viz gauges, staged
> reveals) rather than motion for its own sake.

And the diagnosis of the public site's specific failure:

> Was 25+ files each choosing its own size (`text-2xl` → `text-7xl`) — now
> getting a shared scale.

**Oversized, per-file-improvised headings were a real, measurable piece of the
gap.** That is the mistake this document exists to prevent.

---

## 2. Design tokens

### 2.1 Colour — HSL triplets, Tailwind v4 `@theme inline`

Colours are stored as raw HSL triplets (`H S% L%`, no wrapping function) and
consumed through `@theme inline`, so any utility (`bg-primary`,
`text-muted-foreground`) resolves correctly in both themes.

**Light (`:root`)**

| Token | Value | Note |
|---|---|---|
| `--background` | `24 10% 98%` | warm off-white |
| `--foreground` | `220 10% 15%` | |
| `--border` | `24 10% 90%` | |
| `--input` | `24 10% 86%` | **darker than `--border`** |
| `--ring` | `28 90% 55%` | |
| `--card` | `0 0% 100%` | pure white |
| `--card-foreground` | `220 10% 15%` | |
| `--card-border` | `24 10% 90%` | |
| `--popover` | `0 0% 100%` | |
| `--popover-foreground` | `220 10% 15%` | |
| `--primary` | `28 90% 55%` | **"Dutch Orange"** |
| `--primary-ink` | `28 100% 33%` | AA text-contrast orange, light surfaces |
| `--primary-foreground` | `210 50% 12%` | **dark navy — the ink that sits ON orange fills.** Not white. |
| `--secondary` | `215 30% 40%` | **"Steel blue"** |
| `--secondary-foreground` | `0 0% 100%` | |
| `--muted` | `24 10% 94%` | |
| `--muted-foreground` | `220 10% 40%` | |
| `--accent` | `24 10% 92%` | |
| `--accent-foreground` | `220 10% 15%` | |
| `--destructive` | `0 84% 60%` | |
| `--destructive-foreground` | `0 0% 100%` | |

**Dark (`.dark`)** — only what changes:

| Token | Value |
|---|---|
| `--background` | `220 15% 6%` |
| `--foreground` | `220 10% 96%` |
| `--border` | `220 15% 15%` |
| `--input` | `220 15% 20%` |
| `--card` | `220 15% 8%` |
| `--card-border` | `220 15% 15%` |
| `--primary` | `28 90% 55%` — **same orange, both themes** |
| `--primary-ink` | `28 100% 62%` — brighter, for dark surfaces |
| `--secondary` | `215 30% 45%` |
| `--muted` | `220 15% 12%` |
| `--muted-foreground` | `220 10% 65%` |
| `--accent` | `220 15% 15%` |
| `--destructive` | `0 62% 45%` |

**Rule of thumb.** The orange hue (`28`) never changes between themes and
`--primary` holds at `55%` lightness in both. Only `--primary-ink` moves —
`33%` in light, `62%` in dark — because it must clear a background running the
opposite direction.

### 2.2 Per-regulation accent colours

The spec calls these **"a signature device, reuse for any multi-category
product."**

| Token | Light | Dark |
|---|---|---|
| `--reg-cra` | `28 88% 48%` | `28 90% 58%` |
| `--reg-aia` | `275 55% 52%` | `275 60% 68%` |
| `--reg-machinery` | `12 78% 50%` | `12 82% 62%` **[DERIVED]** |
| `--reg-iec` | `190 70% 36%` | `190 75% 50%` **[DERIVED]** |
| `--reg-nis2` | `158 62% 36%` | `158 60% 50%` **[DERIVED]** |

The spec gives dark values for `reg-cra` and `reg-aia` explicitly and says
"etc." for the rest; the three derived values follow the same lift.

### 2.3 Radius

| Token | Value |
|---|---|
| `--radius` | `0.75rem` |
| `--radius-sm` | `calc(var(--radius) - 4px)` → 8px |
| `--radius-md` | `calc(var(--radius) - 2px)` → 10px |
| `--radius-lg` | `var(--radius)` → 12px |
| `--radius-xl` | `calc(var(--radius) + 4px)` → 16px |

**Radius in practice is not perfectly uniform, and the spec says so plainly:**

- `rounded-md` — **369 uses**, the shadcn default, dominates buttons and inputs
- `rounded-2xl` (16px, **used as a literal, not token-derived**) — the
  **signature radius for "elevated surface" cards**
- `rounded-3xl` — hero / prominent cards only (auth panel, floating assistant)

### 2.4 Shadows — the real signature, not default Tailwind

A full **8-step Tailwind v4 `--shadow-*` scale**. Every shadow except `2xl` is
**two layers**: a flat 2px "shelf" at 2–3% opacity plus a soft blur — not a
single blurred shadow.

- **Light mode is warm-tinted** — `hsl(28 20% 15% / …)`, not neutral black.
- **Dark mode swaps to near-opaque black *plus an inset top highlight*** for a
  subtle bevel. That rim-light is what stops dark cards reading flat.

Verbatim from the spec:

```css
/* light */
--shadow-sm: 0px 2px 0px 0px hsl(28 20% 15% / 0.02), 0px 1px 2px -1px hsl(28 20% 15% / 0.06);
--shadow-lg: 0px 2px 0px 0px hsl(28 20% 15% / 0.03), 0px 10px 15px -3px hsl(28 20% 15% / 0.1);

/* dark — near-opaque + inset rim light */
--shadow-sm: 0px 2px 0px 0px hsl(0 0% 0% / 0.5), 0px 1px 2px -1px hsl(0 0% 0% / 0.8),
             inset 0 1px 0 0 hsl(220 10% 96% / 0.05);
--shadow-lg: 0px 2px 0px 0px hsl(0 0% 0% / 0.5), 0px 4px 6px -1px hsl(0 0% 0% / 0.8),
             inset 0 1px 0 0 hsl(220 10% 96% / 0.08);
```

The intermediate steps of the 8-step scale are **[DERIVED]** in the CSS
companion by holding the shelf constant and interpolating the blur — the spec
quotes `sm` and `lg` literally.

> **If you take one thing from this section:** do not use Tailwind's default
> `shadow-md`. Build the two-layer, theme-tinted version.

---

## 3. Typography

```css
--app-font-sans:    'Instrument Sans', system-ui, sans-serif;  /* body / UI                */
--app-font-display: 'Newsreader', Georgia, serif;              /* headings, = --font-serif */
--app-font-mono:    'IBM Plex Mono', monospace;                /* badges, kickers, times   */
```

Base layer, verbatim:

```css
body { @apply font-sans antialiased bg-background text-foreground
              selection:bg-primary/20 selection:text-primary; }
h1,h2,h3,h4,h5,h6 { @apply font-display tracking-tight; }
```

`tracking-tight` applies to **all** headings globally, and the selection colours
are part of the base — both are easy to miss.

> **The one deviation this project makes, deliberately.** The spec loads all
> three faces from a single Google Fonts `@import`. **We self-host with
> `next/font`.** `OXOT-STYLEGUIDE.md` §3.1 requires it: the browser contacting
> Google is a GDPR problem for EU/NL visitors, not a performance preference.
> Same families, same weights, same roles — only delivery changes.

### Two heading conventions, used contextually, **not interchangeably**

| Convention | className | Where |
|---|---|---|
| **Editorial serif (normal weight)** | `font-serif text-3xl sm:text-4xl font-normal tracking-tight` | Primary page titles (Regulations, Products, PSIRT) |
| **Bold display (still serif, bold weight)** | `text-3xl font-display font-bold tracking-tight` | Dashboard / section headings; card titles at `text-xl` |

**Decide the handful of sizes you will actually use and apply them by *role* —
page title vs. section head vs. card title — not by whatever felt right on that
one page.** 25+ files each picking their own size between `text-2xl` and
`text-7xl` is the documented failure mode.

### Micro-typography

- **`.oxot-kicker`** — `font-size: 0.75rem; font-weight: 600; text-transform:
  uppercase; letter-spacing: 0.18em; color: hsl(var(--primary-ink))`. Small
  orange eyebrow labels.
- **Mono face** for badges, usernames, timestamps and table headers:
  `font-mono text-[11px] uppercase tracking-wider`.

---

## 4. Glassmorphism — two real recipes

### Recipe A — token-based, theme-safe. **Reuse this one.**

```
rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-md
hover:border-primary/50 hover:bg-card hover:shadow-xl hover:-translate-y-1
```

Used 10+ times verbatim across portfolio / command-center widgets. Translucent
card + soft blur + reduced-opacity border + generous 16px radius + a hover state
that both raises elevation **and** lifts position.

### Recipe B — legacy raw "cyber-ops" glass. **Do not propagate.**

Dark-only, bypasses the tokens entirely:

```
bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl
bg-gradient-to-r from-cyan-950/50 via-slate-900/60 to-indigo-950/50
shadow-[0_0_30px_rgba(34,211,238,0.08)] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]
```

Only if you deliberately want that specific dark-SOC look. **This project does
not.** It is raw-colour, single-theme, and violates the tokens-only rule.

---

## 5. Motion — what is actually implemented, not aspirational

> **Key finding, quoted from the spec.** The styleguide doc describes
> `--ease-brand` / `--dur-1/2/3` CSS tokens and a global `MotionConfig` wrapper.
> **Neither exists in conformity's own code** — only the literal curve hardcoded
> inside `.cta-lift`, and per-component `useReducedMotion()` calls instead of one
> global guard. If replicating "the conformity look", replicate what is below —
> the actually-shipped pattern, not the aspirational doc.

**Three different durations. They are not interchangeable.**

```css
/* the one real named motion utility — 150ms */
.cta-lift {
  transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 150ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.cta-lift:hover, .cta-lift:focus-visible { transform: translateY(-2px); }
@media (prefers-reduced-motion: reduce) {
  .cta-lift, .cta-lift:hover, .cta-lift:focus-visible { transition-duration: 0.01ms; transform: none; }
}

/* every shadcn Card lifts on hover by default — a BASE-component behaviour, 300ms */
.card { transition: all 300ms; }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md), 0 0 0 var(--primary)/5%; }

/* button press/hover: a flat 200ms transition-all, NOT a 150/250 split */
button { transition: all 200ms; }
button:active { transform: scale(0.98); }
@media (prefers-reduced-motion: reduce) { button { transition: none; } button:active { transform: none; } }
```

The Card behaviour above ships as the §0.3 className, which is the same thing
expressed the way shadcn expects it.

Signature ease: `cubic-bezier(0.22, 1, 0.36, 1)` — decelerates hard, so motion
feels like it *arrives* rather than stops. Transform and shadow only: **never
animate layout properties.**

Framer Motion appears in **14+ files** for real component animation — floating
assistant launch/close (spring, no explicit easing), staged list reveals, a
readiness-ring SVG gauge (`transition-[stroke-dashoffset] duration-1000
ease-out`). `tw-animate-css` supplies every Radix primitive's
`animate-in`/`animate-out` (dialogs, dropdowns, popovers, sheets) — no
hand-written keyframes needed for those.

### The honest gap — do not repeat it

Conformity has **no global reduced-motion guard.** The spec's own checklist
says: add `<MotionConfig reducedMotion="user">` at the app root **from day one**
— *"conformity itself lacks this — don't repeat that gap in a new app."* We also
add the CSS-level `@media (prefers-reduced-motion: reduce)` guard, so
non-Framer transitions are covered too.

---

## 6. Component library and exact dependency manifest

```jsonc
{
  "tailwindcss": "^4.1.14",        // Tailwind v4, CSS-first — no tailwind.config.js
  "framer-motion": "^12.23.24",
  "tw-animate-css": "^1.4.0",
  "lucide-react": "^0.545.0",
  "@tailwindcss/typography": "^0.5.15",
  "cmdk": "^1.1.1",                // ⌘K command palette
  "recharts": "^2.15.2",           // charts (via ui/chart.tsx wrapper)
  "driver.js": "^1.7.0",           // guided product tour, custom-restyled
  "vaul": "^1.1.2",                // drawer primitive
  "sonner": "^2.0.7",              // toasts
  "embla-carousel-react": "...",   // carousel
  "react-hook-form": "...", "zod": "...",
  "react-markdown": "...", "remark-gfm": "..."
  // + 19 @radix-ui/react-* packages underlying components/ui/*
}
```

`components.json`: `"style": "new-york"`, `"baseColor": "neutral"`,
`"cssVariables": true` — 47 components in `components/ui/`, plus two custom
additions: **`oxot-wordmark.tsx`** and **`kbd.tsx`** (⌘K-style shortcut chip).

---

## 7. Layout

```html
<!-- App shell — flex-column, NOT a sidebar (ui/sidebar.tsx exists but is unused) -->
<div class="flex min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex-col bg-background">
  <Header />                       <!-- sticky top-0 z-50 bg-background/80 backdrop-blur-md, h-16 -->
  <main class="flex-1">...</main>  <!-- max-w-7xl px-4 sm:px-6 lg:px-8 -->
  <Footer />
  <FloatingAiAssistant />          <!-- persistent, every page -->
</div>
```

**Nav active-state indicator is a thin underline bar, not a filled background** —
and note the 12px inset on each side:

```css
.nav-active {
  color: hsl(var(--primary-ink));
  &::after { content:''; position:absolute; bottom:0; left:12px; right:12px;
             height:2px; border-radius:9999px; background:hsl(var(--primary)); }
}
```

Spacing rhythm: card padding `p-5`; header height a fixed `h-16` (64px);
container `max-w-7xl` with `px-4` → `sm:px-6` → `lg:px-8`.

**Do not reach for a sidebar layout** unless navigation genuinely needs the
vertical real estate.

---

## 8. Icons and interactive states

**lucide-react**, sized:

- `w-4 h-4` — dominant, **~245 uses** — nav, buttons, list rows
- `h-3.5 w-3.5` — compact badges and chips
- `w-5 h-5` — feature and empty-state icons

Icon-in-chip pattern:
`grid place-items-center w-9 h-9 rounded-lg bg-primary/15 text-primary`

```
/* Button base */
transition-all duration-200 focus-visible:ring-1 focus-visible:ring-ring
disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]
motion-reduce:transition-none motion-reduce:active:scale-100

/* default variant */
bg-primary text-primary-foreground shadow hover:bg-primary/90
```

**Focus rings are 1px** (`ring-1`), not the thicker default. **Disabled is
`opacity-50` + `pointer-events-none`,** everywhere. Every hover effect has a
keyboard equivalent — `.cta-lift` fires on `:focus-visible` as well as `:hover`.

**Status / severity colour triad**, reused identically across PSIRT severity,
next-action urgency and provenance confidence:

```
bg-{color}-500/10  text-{color}-600  border-{color}-500/30
```

Reuse this triad wherever colour communicates state. Do not invent a new scheme
per feature.

---

## 9. Distinctive devices worth deliberately reusing

1. **Split-screen auth gate** — fixed navy panel (`#0F1F2E`), CSS grid-line
   background masked with a radial gradient, orange radial glow blob, serif hero
   headline + icon-chip feature list. Fully custom, not shadcn.
2. **Wordmark lockup** — `O` + orange `X` + `OT` at `tracking-[0.28em]`,
   rendered as **real text, not an image**, repeated identically across header /
   auth / onboarding.
3. **Readiness-ring gauge** — bespoke SVG circular progress, grade-letter →
   colour mapping (A green → F red), animated stroke sweep.
4. **Floating AI assistant** — persistent bottom-right chat widget, gradient
   launcher pill, animated "online" dot, glass panel with tinted header gradient.
5. **⌘K command palette** via `cmdk`, with a real `Kbd` chip component in the
   header.

---

## 10. Quick-start checklist for a new application

1. **§0.1** — shadcn init: `new-york` · `neutral` · `cssVariables: true`.
2. Copy the colour / shadow / radius token block from §2 into `:root` / `.dark`.
3. Load the three fonts from §3; apply `font-display` to headings, decide
   serif-normal vs. bold-display **per content type — don't mix arbitrarily**.
4. **§0.2** — `defaultTheme="dark"`.
5. **§0.3** — the Card hover-lift className in `components/ui/card.tsx`.
6. Use **Recipe A** from §4 for any translucent surface — skip Recipe B unless
   deliberately building a dark ops/security aesthetic.
7. Motion: the flat **200ms button / 300ms card** pattern from §5 is the
   default; add **`<MotionConfig reducedMotion="user">` at the app root from day
   one** (conformity itself lacks this — don't repeat that gap).
8. Build the **flex-column shell** from §7, not a sidebar, unless the new app
   genuinely needs sidebar navigation.

---

## 11. How this document is enforced in this repository

- `docs/OXOT-DESIGN-SYSTEM.css` carries the same system as literal tokens.
- `web/src/app/globals.css` implements it. It is the **only** place tokens are
  declared; components consume them and never restate a colour.
- `web/scripts/measure.mjs` fails any route with a contrast failure in either
  theme, content left at `opacity: 0`, horizontal overflow at
  390 / 834 / 1440 / 2560, a console error, or a dead internal link.
- **What the gate cannot see, and you must check by hand:** `::before`,
  `::after` and `::placeholder`. Two real AA failures hid there on the previous
  site.
