# Layout and Components

## Contents

1. [Shared geometry](#shared-geometry)
2. [Relux Works identity assets](#relux-works-identity-assets)
3. [Header](#header)
4. [First viewport](#first-viewport)
5. [Sections and repeated rows](#sections-and-repeated-rows)
6. [Cards and surfaces](#cards-and-surfaces)
7. [Controls](#controls)
8. [Product media and data](#product-media-and-data)
9. [Responsive behavior](#responsive-behavior)
10. [Footer](#footer)

## Shared geometry

Use these defaults unless the product design record explains a functional reason to
deviate:

```css
--layout-max: 73.75rem;      /* 1180px */
--layout-reading: 45rem;     /* 720px */
--layout-header-height: 4.25rem;
--layout-gutter: 1.5rem;
--layout-section: 6rem;
--layout-section-mobile: 4rem;
--radius-control: 0.25rem;
--radius-surface: 0.5rem;
```

- Center the main container and keep equal logical inline gutters.
- Use a spacing scale rather than local arbitrary gaps.
- Set `min-width: 0` on grid and flex children that may contain text.
- Define grids with `minmax(0, 1fr)` so content cannot silently expand a track.
- Use `scrollbar-gutter: stable` where page width changes would move a centered header
  or dialog.
- Never use `overflow-x: hidden` to conceal a broken grid.

## Relux Works identity assets

Use the supplied production SVGs without redrawing their geometry:

- `assets/relux-symbol.svg` and `assets/relux-symbol-dark.svg` for compact identity and
  light/dark browser icons.
- `assets/relux-lockup-horizontal.svg` and `assets/relux-lockup-horizontal-dark.svg`
  for shared site chrome.
- `assets/relux-symbol-one-color.svg` and
  `assets/relux-lockup-horizontal-one-color.svg` for monochrome and forced colors.
- `assets/relux-avatar-light.svg` and `assets/relux-avatar-dark.svg` only where an
  opaque square avatar tile is required.

The symbol uses the normalized `0 0 100 100` viewBox; the horizontal lockup uses
`0 0 450 100`. Runtime wordmarks use the supplied outlined path, not live SVG text or
a locally substituted font. Inter Bold 700 is retained only for an editable source.
Do not stretch, rotate, rearrange, recolor, outline, round, shadow, or close the gap
between the arrow and chevron.

- Keep clear space of at least one red-arm thickness (`1T`) on every side. Here,
  `T = 10√2 ≈ 14.14` normalized units, or `14.14%` of the 100-unit SVG viewport.
- Minimum screen sizes are 16px for the symbol and 160px for the horizontal lockup.
  At 24px and below use the symbol as the favicon treatment; no micro redraw is needed.
- Use red plus ink on white or a quiet light neutral. Use red plus knockout white on
  Relux ink or another approved solid dark surface. Avoid busy or low-contrast media.
- Keep the artwork LTR-isolated with `direction: ltr` and `unicode-bidi: isolate`.
  Logical page layout may mirror in RTL; the chevron, arrow, and wordmark never do.
- Give a linked mark the accessible name `Relux Works`; hide the nested SVG. For an
  informative `<img>`, use the alt text `Relux Works`. Add instance-level ARIA only
  when an informative SVG is inline; bundled sources are deliberately metadata-free.

## Header

The family header uses three stable zones: brand at the inline start, navigation on
the page axis, and locale plus primary action at the inline end.

```css
.site-header__inner {
  min-height: var(--layout-header-height);
  display: grid;
  grid-template-columns: minmax(0, 13.75rem) minmax(0, 1fr) minmax(0, 13.75rem);
  align-items: center;
  gap: 1rem;
}

.site-header__nav { justify-self: center; }
.site-header__actions { justify-self: end; }
```

Equal wing tracks keep navigation centered independently of label width. If the
product requires different wings, verify the navigation center mathematically at all
desktop widths instead of centering the middle track by assumption.

- Use the outlined horizontal lockup at approximately 168px wide in the standard
  header, never below its 160px minimum. Use the symbol alone only when available
  width cannot support the lockup and preserve the accessible brand name.
- Keep the header height stable across routes, locales, and active states.
- Use a translucent material only when content scrolls under the header. Otherwise a
  solid semantic surface is clearer.
- At approximately 1100px or when translated labels no longer fit, replace desktop
  navigation with one menu control. Do not compress it until labels collide.
- The mobile panel opens from the logical inline end, which mirrors in RTL.
- Preserve focus, return focus to the trigger, close on `Escape` and outside press,
  and lock background scrolling while the modal drawer is open.
- Use `aria-current="page"` without changing the link's dimensions.

## First viewport

Match composition to the chosen archetype:

- **Operational tool:** render the real workflow, status, and primary controls. Avoid
  an introductory marketing block above it.
- **Consumer product:** show the product name and a real current state, output, or
  inspectable screen. The primary action belongs near the state it changes.
- **Product landing:** use a literal product statement and actual product media. Avoid
  split layouts where both halves read as separate cards.
- **Documentation:** show navigation, search, version context, and content immediately.
- **Service page:** positioning and actions first; service formats form the second
  section; evidence follows the offer.

Do not force the first viewport to fill the entire screen. Keep enough of the next
section visible to communicate continuity on mobile and wide desktop.

## Sections and repeated rows

Build sections as full-width bands with a constrained inner grid. A standard section
heading uses aligned title and summary columns:

```css
.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(16rem, 0.75fr);
  gap: 3rem;
  align-items: end;
}
```

Stack this grid at the content breakpoint and keep both columns on the same logical
start edge.

For service lists, feature comparisons, or operational rows, define explicit tracks
that repeat identically:

```css
.structured-row {
  display: grid;
  grid-template-columns: 3rem minmax(13rem, 0.8fr) minmax(0, 1.6fr) 15rem;
  gap: 2rem;
  align-items: start;
}
```

The action column must not move according to description length. Change the complete
grid at a breakpoint rather than letting individual rows wrap differently.

## Cards and surfaces

- Use cards for repeated independent objects, framed tools, dialogs, and media that
  needs a stable boundary.
- Do not wrap a whole section in a floating card and do not put cards inside cards.
- Default surface radius is 8px or less. Pills are reserved for binary state, compact
  filters, or genuinely circular identity, not ordinary navigation and buttons.
- Prefer a border, surface step, or whitespace hierarchy over a large shadow.
- Keep padding consistent for cards of the same type. Dynamic status, loading, or
  localization must not change outer dimensions unexpectedly.

## Controls

- Use familiar icons for icon actions, segmented controls for modes, switches or
  checkboxes for binary settings, and menus for bounded option sets.
- Use text or icon plus text for clear commands such as `Publish`, `Run`, or `Connect`.
- Give touch targets a minimum 44px dimension even when the visible icon is smaller.
- Keep icon boxes, counters, and toolbar controls on stable grid tracks.
- Provide an accessible name for every icon-only control and a tooltip for unfamiliar
  symbols.
- Show focus visibly, independently of hover. Do not remove native outlines without a
  tested replacement.
- Reserve confirmation dialogs for destructive, irreversible actions. Prefer undo for
  reversible actions.
- Validate near the affected field and preserve the form layout when feedback appears.

## Product media and data

- Show the real product, object, state, gameplay, person, or data when users need to
  inspect it. Avoid generic stock imagery and abstract mock interfaces.
- Declare `width`, `height`, or `aspect-ratio` before media loads.
- Keep critical content inside a predictable safe region across crops.
- Do not place a primary screenshot inside multiple decorative frames.
- Tables keep native table semantics. On narrow screens, use a deliberate compact
  representation or a labeled scroll region, not clipped columns.
- Charts require textual labels and non-color distinctions. Document data date and
  source near the visualization.
- Code blocks expose copy affordance without resizing when the label changes to a
  completed state.

## Responsive behavior

Use content-driven breakpoints near these shared reference widths:

| Range | Expected behavior |
| --- | --- |
| Below 640px | Single-column content, mobile navigation, 1.5rem gutters |
| 640-1099px | Compact grids, reduced section spacing, mobile or compact navigation |
| 1100px and above | Three-zone header and full structured rows |

Rules:

- Reflow instead of hiding essential information.
- Test long words, long localized labels, 200% browser zoom, and browser default font
  size changes.
- Use logical margins, padding, borders, and inset properties for LTR and RTL.
- Do not use viewport-width font sizing to make text fit.
- Keep order in the DOM meaningful. CSS reordering must not create a different keyboard
  or screen-reader sequence.

## Footer

Use the footer for product provenance and wayfinding, not a second sitemap dump.

- State the product name and its relationship to Relux Works.
- Link to the relevant product, documentation, status, privacy, terms, support, and
  source surfaces only when they exist.
- Keep legal identity and dates accurate and localized where necessary.
- Use the same constrained grid and logical alignment as the page.
- Keep language selection labels in their native language and expose the current value
  programmatically.
