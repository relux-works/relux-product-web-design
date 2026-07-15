# Relux Works brand identity

Use this reference whenever a Relux product includes the corporate mark, wordmark,
favicon, social image, store image, or operator attribution. Treat the supplied SVGs
as production artwork, not as drawing references.

## Approved artwork

| Use | Light surface | Dark surface |
| --- | --- | --- |
| Horizontal header or footer lockup | `assets/relux-lockup-horizontal.svg` | `assets/relux-lockup-horizontal-dark.svg` |
| Standalone symbol | `assets/relux-symbol.svg` | `assets/relux-symbol-dark.svg` |
| Square avatar or plated fallback | `assets/relux-avatar-light.svg` | `assets/relux-avatar-dark.svg` |

Use `assets/relux-symbol-one-color.svg` and
`assets/relux-lockup-horizontal-one-color.svg` for one-color and forced-colors web
contexts. This skill does not bundle stacked or white-knockout masters. Obtain those
from the approved master-logo package when a delivery requires them. If that package
is unavailable, stop and request the asset; do not derive or improvise a new variant.

Resolve asset paths relative to the skill root when copying them into a product.
Keep the SVG source intact. Do not trace, simplify, redraw, retype, or pass the mark
through image generation.

The approved symbol uses a `0 0 100 100` view box. The horizontal lockup uses a
`0 0 450 100` view box. Both use filled paths only. The horizontal wordmark is the
approved outlined Inter Bold 700 artwork; it is not live type and must not fall back
to a system font.

## Fixed identity values

- Relux red: `#F60D10`
- Relux ink: `#181A18`
- Knockout white: `#FFFFFF`
- Symbol clear space: at least one red-arm thickness, `T`, on every side
- Symbol minimum: 16 CSS px on screen or 10 mm in print
- Horizontal lockup minimum: 160 CSS px on screen or 30 mm in print
- Stacked lockup minimum, when supplied by the production library: 120 CSS px on
  screen or 25 mm in print

In the normalized symbol, `T = 10√2`, approximately `14.14` view-box units, measured
perpendicular to either 45-degree red arm. For the symbol and horizontal lockup,
reserve at least `14.14%` of the rendered 100-unit SVG viewport height outside the
artwork on every side. Measure from the visible artwork bounds, not from a padded
image container.

Keep these colors and the mark geometry immutable across the product family.
Product expression colors may change semantic interface tokens, but they must not
recolor `--color-brand-*` or alter an approved SVG.

Exact Relux red is brand geometry, not the default semantic action color. It has
about 3.88:1 contrast on `#F4F6F4` and 4.21:1 on white, so it fails the 4.5:1 rule
for ordinary-sized text. Use the accessible semantic red ramps in
`assets/tokens.css` for links, controls, and focus indicators.

## Placement and hierarchy

Use the horizontal lockup in a normal site header when at least 160 CSS px is
available. Give it a stable intrinsic aspect ratio and preserve at least `T` clear
space from navigation, product marks, copy, and container edges. Keep the Relux
operator identity visible but subordinate when the product has its own name or
mark.

Use the standalone symbol when the complete name appears nearby or space cannot
support the lockup. At 24 px and below, prefer the symbol or plated avatar. The
approved master remains distinct at 16 px, so do not create a micro redraw.

Do not:

- stretch, crop, rotate, skew, mirror, rearrange, or re-space the artwork;
- round its corners or add a container unless using the supplied avatar;
- add gradients, shadows, glows, outlines, textures, depth, or motion;
- move, resize, or recolor one arrow independently;
- let a product logo replace or merge with the Relux Works lockup;
- rebuild the wordmark as HTML text or an SVG `<text>` element.

## Light, dark, and constrained color

On light neutral surfaces, use the full-color asset with red chevron and ink arrow
or wordmark. On dark neutral surfaces, use the dark asset with red chevron and white
arrow or wordmark. Do not use the ink artwork on a dark surface.

For one-color production, use a bundled one-color asset or an approved knockout export
from the master-logo package. Preserve the open separation between both arrows; do not
fuse them into a single silhouette.

For forced colors, inline the bundled one-color asset and apply the only sanctioned
runtime fill override:

```css
@media (forced-colors: active) {
  .relux-logo path { fill: CanvasText; }
}
```

Keep the source SVG unchanged and keep the inline copy hidden when its containing
link supplies the accessible name. Do not override fills in normal themes or derive a
one-color master from the full-color file.

`#FFFFFF` is allowed as the approved knockout identity value. It is an explicit
exception to the rule against pure-white semantic interface tokens.

## Accessibility and direction

Give a linked logo the accessible name `Relux Works` and hide its nested SVG with
`aria-hidden="true"`. For an `<img>`, set `alt="Relux Works"`. For an informative
inline SVG, add `role="img" aria-label="Relux Works"` to that instance. The bundled
SVG sources intentionally contain no title, ARIA attributes, or IDs, so multiple
inline copies cannot create duplicate references. Mark redundant artwork as hidden.

Keep the mark in left-to-right drawing order in every locale:

```css
.relux-logo {
  direction: ltr;
  unicode-bidi: isolate;
}
```

Never mirror the chevron or northeast arrow in right-to-left layouts. Verify the
asset remains visible in dark mode, high contrast, forced colors, browser zoom, and
Windows High Contrast Mode.

## Favicons, avatars, and social images

Use the light and dark standalone symbols as theme-aware SVG favicons when the
browser supports media-qualified icon links. Use the plated avatars when a platform
controls or unpredictably crops the background. Keep the symbol centered and do not
add a second border, badge, or shape.

Generate a conventional `.ico` at 16, 32, and 48 px and an Apple touch icon at
180 × 180 px from `assets/relux-avatar-light.svg`; the white plate keeps the ink arrow
visible when a single icon must span unknown themes. Use the light avatar as the
default single-image platform avatar. Select the dark avatar only when that platform
guarantees a dark presentation surface. Record any additional platform sizes in the
product design contract.

### LinkedIn Company Page cover

Use `assets/relux-linkedin-company-cover.jpg` as the upload-ready cover and
`assets/relux-linkedin-company-cover.svg` as its editable vector source. The artwork
is 4200 × 700 px, RGB, and centered within the crop-safe middle of the canvas. Keep
the flat Relux ink background and approved red-and-white outlined lockup unchanged.
Do not add a tagline, extra mark, effect, or edge-aligned detail to this master.

This is a LinkedIn Company Page cover, not the differently proportioned personal
profile background image. Recheck LinkedIn's current specifications before deriving
future platform assets.

Build social images from approved outlined artwork. Keep it within platform-safe
margins and render the exact text `Relux Works`; never ask image generation to
redraw the mark or lettering. Use the same approved asset for `Organization.logo`
and other operator metadata whenever the consuming format accepts SVG.

## Release checks

- Compare all shipped instances with the supplied SVG at 100% and small sizes.
- Confirm the horizontal wordmark contains paths and no live `<text>`.
- Confirm SVGs contain no raster images, strokes, gradients, filters, masks, clipping
  debris, embedded accessibility metadata, or duplicate IDs.
- Check full-color light and dark contexts; when supplied, also check one-color and
  forced-color variants.
- Check symbol rendering at 16, 24, and 32 CSS px.
- Check the header, footer, favicon, avatar, structured data, and social image.
- Check the LinkedIn Company Page cover at full resolution and at its rendered page
  size; keep the lockup inside the centered safe area after responsive cropping.
- Check left-to-right and right-to-left pages without mirroring the mark.
