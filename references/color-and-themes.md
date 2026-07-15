# Color and Themes

## Contents

1. [Semantic model](#semantic-model)
2. [Relux Works identity](#relux-works-identity)
3. [Product palette workflow](#product-palette-workflow)
4. [Theme requirements](#theme-requirements)
5. [Contrast targets](#contrast-targets)
6. [Dark mode](#dark-mode)
7. [Materials and gradients](#materials-and-gradients)
8. [Implementation rules](#implementation-rules)

## Semantic model

Components consume semantic roles rather than palette names. The baseline contract
in `assets/tokens.css` includes:

- Canvas and surfaces: `--color-bg`, `--color-surface`, `--color-surface-raised`,
  `--color-surface-subtle`.
- Text: `--color-text`, `--color-text-muted`, `--color-text-faint`.
- Structure: `--color-border`, `--color-border-strong`, `--color-divider`.
- Controls: `--color-control`, `--color-control-hover`, `--color-control-pressed`,
  `--color-control-text`, `--color-focus`.
- Fixed identity: `--color-brand-red`, `--color-brand-ink`, and
  `--color-brand-white`.
- Product actions and navigation: `--color-accent`, accent state variants,
  `--color-link`, and `--color-link-hover`.
- Feedback: success, warning, error, and information roles.
- Overlays: scrim, selection, material, and shadow roles.

The semantic role must remain stable when its underlying color changes. A red product
accent does not turn every validation error into a brand action.

## Relux Works identity

Keep the production identity separate from product expression:

```css
--color-brand-red: #F60D10;
--color-brand-ink: #181A18;
--color-brand-white: #FFFFFF;
```

These three values belong to the supplied Relux Works artwork and do not change per
product. Brand white is an intentional knockout color, not a general interface
surface. Product themes consume the semantic action, link, focus, and state tokens;
they may replace those tokens only as a complete tested set and must never recolor the
Relux Works mark.

The baseline Relux semantic red ramp is:

| Appearance | Accent | Hover / pressed | Link | Link hover | Focus |
| --- | --- | --- | --- | --- | --- |
| Light | `#C20A0C` | `#A80608` | `#A80608` | `#810406` | `#C20A0C` |
| Dark | `#FF6961` | `#FF817B` | `#FF817B` | `#FF9A94` | `#FF817B` |
| Light, more contrast | `#8F0406` | `#700204` | `#8F0406` | `#700204` | `#8F0406` |
| Dark, more contrast | `#FFA29C` | `#FFB5B0` | `#FF9A92` | `#FFB5B0` | `#FF9A92` |

Use matching soft and on-accent pairs: light `rgba(246, 13, 16, 0.09)` with
`#F7F9F7`; dark `rgba(255, 105, 97, 0.15)` with `#151815`; light increased contrast
`rgba(143, 4, 6, 0.14)` with `#F7F9F7`; and dark increased contrast
`rgba(255, 162, 156, 0.20)` with `#111411`.

Exact Relux red is not a text token. Its contrast is 3.88:1 on the light canvas and
4.21:1 on white, below the 4.5:1 target for ordinary text. Reserve it for the logo and
tested non-text geometry. The semantic accents remain at least 5.13:1 on baseline
surfaces; increased-contrast variants remain at least 7.09:1 on their supported
surfaces. Keep success green and warning and information colors functional rather
than forcing every state into the brand ramp.

## Product palette workflow

1. Choose a low-chroma neutral family for large surfaces. It may lean warm, cool, or
   toward the product accent without becoming monochromatic.
2. Choose one accent that represents product identity and primary actions.
3. Add one supporting hue only when the domain needs it, such as live status, media
   categorization, or a secondary data series.
4. Derive hover, pressed, selected, and focus values independently for light and dark
   themes. Do not use a generic percentage darken function.
5. Keep links distinguishable from body text and actions. Link color may be different
   from the product accent.
6. Define feedback colors independently from brand colors.
7. Validate all required foreground/background and non-text pairs before use.

Apple's semantic color approach is a useful model: name roles by function and adapt
each role to appearance and contrast settings. Do not copy platform RGB values without
testing them in the web product's typography, surfaces, and browser rendering.

### Example expression directions

- **Relux Works studio:** neutral cool canvas with the accessible semantic red ramp.
- **Pulsar:** neutral canvas with a slight blue-violet tint, violet accent, optional
  warm gold for a specific media or live state.
- **Developer infrastructure:** neutral or slightly cool canvas, blue or green accent,
  with code and status colors kept functionally distinct.

These are directions, not complete palettes. Each requires the full theme and state
set before implementation.

## Theme requirements

Every product supports all of these:

1. Light appearance from `prefers-color-scheme: light`.
2. Dark appearance from `prefers-color-scheme: dark`.
3. Increased contrast in both appearances from `prefers-contrast: more`.
4. Reduced transparency from `prefers-reduced-transparency: reduce` where supported.
5. Forced colors with system color keywords and visible native focus.

A user-controlled theme switch is optional. When present, `system` is the default and
the explicit choice is persisted without a flash of the wrong appearance.

## Contrast targets

- Body and compact text: at least 4.5:1 against its actual surface.
- Large text: at least 3:1, but prefer 4.5:1 for durable readability.
- Focus indicators, input outlines, icons, and meaningful component boundaries: at
  least 3:1 against adjacent colors.
- Increased-contrast body text: target 7:1.
- Disabled controls remain legible and are not distinguished by opacity alone.
- Charts and states use labels, patterns, or shapes in addition to color.

Test real combinations. A token can pass on the page canvas and fail inside a raised
surface or selected control.

## Dark mode

Dark mode is separately art-directed:

- Avoid pure black backgrounds and pure white text. They cause glare and erase depth.
- Keep the page canvas darker than surfaces. Raised surfaces need a small luminance
  step, not a strong border or glow.
- Reduce accent saturation or raise luminance as needed. A light-theme accent rarely
  transfers unchanged.
- Use softer shadows and rely more on surface separation. Do not surround every object
  with a bright stroke.
- Check imagery, logos, screenshots, syntax colors, focus, selection, and browser form
  controls independently.
- Use the approved red-and-white logo variant on dark surfaces. Relux ink has only
  about 1.06:1 contrast on the dark canvas and must not be used there.
- Use `color-scheme: light dark` so native controls match the active system appearance.

## Materials and gradients

Translucency communicates a floating layer, not general polish.

- Allow backdrop blur for sticky navigation, a popover, or a non-blocking overlay when
  content visibly passes underneath.
- Do not stack translucent surfaces. Use an opaque or near-opaque fallback for reduced
  transparency, unsupported browsers, and busy content.
- Keep material text high contrast and test it over representative underlying content.
- Use solid action controls. Do not use gradients to make an ordinary button feel more
  important.
- Do not use gradient page backgrounds, decorative color orbs, bokeh, glow fields, or
  a one-hue wash as the product identity.
- Gradients inside real media, data visualizations, or domain imagery are acceptable
  when they encode information or belong to the artifact itself.

## Implementation rules

- Put literal colors only in the theme token layer, illustrations, and data-series
  definitions. Component styles reference semantic tokens.
- Keep fixed brand tokens outside product override boundaries. Under forced colors,
  map all three to `CanvasText` so the separated mark remains recognizable.
- Use product overrides at a theme boundary such as `[data-product="pulsar"]`, not in
  individual button or card selectors.
- Change a palette as a complete tested set. Never override only `--color-accent` and
  assume hover, focus, selected, dark, and high-contrast states remain coherent.
- Prefer borders over shadows for operational density. Prefer spacing over either when
  hierarchy can be expressed structurally.
- Keep browser selection, focus, autofill, validation, and visited-link behavior in
  the color review.
- Record contrast results with the foreground token, background token, appearance,
  ratio, and tool used.
