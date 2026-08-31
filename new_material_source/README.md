# new_material_source

Raw inputs to the glyph/diagram library build pipeline (`scripts/compile-stencils.mjs`, `scripts/build-drawio-glyphs.mjs`) — draw.io stencils and CSET raster originals. Not needed to build or run the site; only needed to add or regenerate symbols in `src/components/twin/drawio-manifest.ts`.

**Not here:** the broader design-source material (raw hero/product images, marketing videos, the `1_website_layout_v4` composition-rules spec set) that existed alongside this folder in the original working session. Those were promoted directly into the site's servable/reference locations instead of duplicated here:

- Images → `public/images/` (and `public/images/reference-library/` for the few whose filename collides with an existing asset)
- Videos → `public/videos/` (and `public/videos/reference-library/`, same reasoning)
- `1_website_layout_v4/` design spec → `docs/1_website_layout_v4/`
- Hero-background HTML prototypes → `content/hero-backgrounds/`
