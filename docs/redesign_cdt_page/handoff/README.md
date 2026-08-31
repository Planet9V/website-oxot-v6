# Developer handoff — README

Everything needed to stand the new Cyber Digital Twin pillar page up beside the current one.

## What is in this folder

| File | What it is |
|---|---|
| `CDT-Pillar-Page-Spec.md` | The build spec — content, order, behaviour, palette, type, outstanding items |
| `OXOT CDT Pillar Page v2.dc.html` | **The reference page — build from this one.** Opens in any browser, renders standalone |
| `OXOT CDT Pillar Page.dc.html` | The earlier model-first version. Kept for comparison only — do not build from it |
| `support.js` | Runtime the reference page needs. Keep it beside the HTML file |
| `images/` | The six figures plus both logo variants, renamed for clarity |

## How to view the reference page

Serve this folder over HTTP and open the HTML file:

```bash
cd handoff
python3 -m http.server 8000
# then open http://localhost:8000/OXOT%20CDT%20Pillar%20Page%20v2.dc.html
```

Opening the file directly with `file://` also works in most browsers. Fonts (Archivo, Instrument Sans) load from Google Fonts, so the first view needs a connection.

Note the image paths inside the reference file point at `uploads/…` with the original filenames. The copies in `images/` are renamed for readability in the spec — either rewrite the paths or keep the original names when you port.

## Recommended approach

**For a side-by-side comparison,** serve the reference page locally and open it next to the live Cyber Digital Twin page. It is a faithful visual target at 1440px and needs no build step.

**For the actual build,** work from `CDT-Pillar-Page-Spec.md` for content and order, and treat the reference page as the visual answer key. Lift the exact hex values, spacing and type sizes from it rather than re-deriving them — the section rhythm, the 1px-gap card grids and the accent eyebrows are what make the page hold together.

**Do not port the reference file into production as-is.** It is a design artefact: a single 1440px-wide document with inline styles and no responsive breakpoints. Rebuild it in the site's own component system, then compare against the reference.

## Two versions, and which to use

There are two reference files in this folder. **Build from v2.** The earlier one is included only so you can see what changed and why.

The difference is narrative order, not styling. v1 opened with the model and reached the decisions near the end. v2 opens with the decisions the product makes answerable, then what they change, then how they are tested, then why the answers hold — and only then the engine underneath. The Cyber Digital Twin is the engine; what is being sold is better OT security decision-making. The spec's "Page order" section is authoritative.

## Build order suggestion

1. Nav, hero and the four-decision grid — establishes the palette, type scale and section rhythm.
2. The alternating band sections down to the worked example — mostly copy and card grids, no new patterns.
3. The seven-layer stack in section 11d — the most bespoke layout on the page.
4. The services accordion — the only interactive component. Keyboard support and `aria-expanded` are required.
5. Footer and legal strip.
6. Responsive pass. The 4-across card grids collapse to 2, then 1; the two-column comparison blocks stack; the seven-layer spine stays vertical throughout.

## Before it goes live

Six open items are listed at the end of the spec. Two are blocking: **real photography** and the **official reversed logo**. The rest — a contact form, resolving the content overlap with Home, and pointing the nav and CTAs at real routes — can follow the first deploy.

## Standing it up beside the live page

The route `/cyber-digital-twin-v2` is suggested in the spec so the new page can be deployed without touching the existing one. Once it is preferred, swap the route and retire the old page — the content differs enough that editing in place would be a rewrite with extra steps.
