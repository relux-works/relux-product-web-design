---
name: relux-product-web-design
description: >
  Design, build, migrate, or review websites and web interfaces for Relux Works
  products using the shared product-family system: typography, semantic color
  tokens, light/dark/high-contrast themes, responsive grids, navigation, motion,
  WCAG 2.2 AA accessibility, RTL, evidence-led copy, agent discoverability, and
  visual QA.
  Use for product sites, landing pages, dashboards, documentation, design-system
  work, visual consistency reviews, dark mode, responsive layout, or bringing an
  existing product such as barycenter.live back into the Relux family. Russian
  triggers include дизайн сайта, лендинг, единый стиль продуктов, типографика,
  палитра, темная тема, верстка, сетка, шапка, навигация, RTL and визуальная проверка.
---

# Relux Product Web Design

Build a recognizable product family without cloning one site. Preserve shared
typography, geometry, semantic behavior, accessibility, and editorial discipline;
let each product own its accent, neutral tint, media, and domain-specific character.

## Start with the repository

- Inspect the stack, existing tokens, components, routes, locales, design assets,
  tests, and project instructions before proposing visual changes.
- Identify the primary audience and choose a page archetype: product experience,
  product landing, operational tool, documentation, editorial content, or service
  page. Do not force every product into a marketing landing template.
- Preserve established product identity and useful behavior. Replace divergence
  only where it harms hierarchy, consistency, accessibility, or maintainability.
- Treat existing user changes as intentional. Do not overwrite unrelated work.

Read [foundations.md](references/foundations.md) before changing the visual direction.
It defines family invariants, product expression slots, page archetypes, and the
worked Barycenter/Pulsar migration example.

## Establish the design contract

Before implementation, state the contract in working notes:

- **Product promise:** the literal job the product performs.
- **Primary experience:** what must be visible or usable in the first viewport.
- **Family invariants:** typography, semantic token model, grid discipline,
  restrained geometry, theme behavior, accessibility, and factual writing.
- **Expression slots:** product accent, neutral background tint, media, iconography,
  density, and domain-specific motion.
- **Proof:** the real interface, artifact, result, provenance, or operational state
  that makes the page credible.
- **Validation matrix:** routes, widths, themes, languages, directions, and states.

If the product has no approved accent or media, choose a conservative starting point
and make the choice explicit. Do not invent a decorative identity to fill space.

## Apply the family system

### Typography and writing

- Use the shared type roles and fixed responsive scale from
  [typography-and-content.md](references/typography-and-content.md).
- Keep `letter-spacing: 0`. Use optical sizing and weight, not negative tracking, to
  create display presence across scripts.
- Make the product or literal offer the first-viewport signal. Put descriptive value
  in supporting copy.
- Write calm, direct, technically accurate copy. Remove inflated claims, generic AI
  phrasing, ornamental antithesis, and duplicated statements.
- In Russian UI copy, avoid long dashes and guillemets. Prefer Russian technical terms
  when they remain precise; keep protocols, product names, code identifiers, and
  established abbreviations in Latin script.

### Color and themes

- Implement semantic tokens, never component-local color piles. Start with
  [tokens.css](assets/tokens.css) or map its roles into the project's token system.
- Define complete light, dark, light-high-contrast, dark-high-contrast, and forced
  colors behavior. Dark mode is separately tuned, not an inversion.
- Let products vary accent and neutral tint as a tested set. Do not vary typography,
  layout mechanics, state semantics, or contrast requirements per product.
- Read [color-and-themes.md](references/color-and-themes.md) before choosing a palette
  or modifying dark mode.

### Layout and components

- Use the shared container, spacing, radii, stable header zones, and responsive grid
  rules from [layout-and-components.md](references/layout-and-components.md).
- Prefer full-width bands and unframed layouts. Use cards only for genuinely repeated
  framed items, tools, or modals. Never nest cards.
- Use `minmax(0, ...)`, `min-width: 0`, logical properties, stable media dimensions,
  and fixed service/control tracks where content alignment must not drift.
- Keep controls stable across active, loading, copied, expanded, localized, and error
  states. State changes must not resize surrounding layout.
- Use familiar icons from the repository's icon library. Icon-only controls need an
  accessible name and unfamiliar icons need a tooltip.

### Motion and interaction

- Use immediate press feedback and short, interruptible transitions. Animate only
  `transform` and `opacity` for ordinary menus and state changes.
- Keep decorative motion subordinate to product state. A continuous pulse is valid
  for live playback or synchronization, not as idle background decoration.
- Read [motion-and-interaction.md](references/motion-and-interaction.md) for timing,
  interruption, menu, gesture, and reduced-motion rules.

### Accessibility and internationalization

- Treat WCAG 2.2 Level AA as the minimum release target for every user-facing route,
  state, and required third-party step. Do not claim conformance until both automated
  and manual acceptance gates pass.
- Treat system theme, increased contrast, reduced motion, reduced transparency,
  forced colors, keyboard operation, zoom, and reflow as product states.
- Build one logical LTR/RTL component system. Isolate URLs, code, email addresses,
  currency codes, and other LTR identifiers inside RTL documents.
- Read [accessibility-and-i18n.md](references/accessibility-and-i18n.md) whenever the
  work touches navigation, forms, overlays, themes, localization, or RTL.
- Read and apply [wcag-2.2-aa.md](references/wcag-2.2-aa.md) for authentication,
  multi-step forms, timers, live updates, audio, video, orientation, or public release.

### Discovery and trust

- Keep visible facts, metadata, structured data, feeds, machine catalogs, and APIs in
  agreement. Do not publish claims that cannot be verified.
- Show product provenance, security, ownership, release status, or open-source evidence
  where it helps a user decide.
- Read [discovery-and-trust.md](references/discovery-and-trust.md) for public product
  pages, localized pages, case studies, drafts, and agent-facing surfaces.

## Build the real experience

- For an app or operational tool, make the working experience the first screen.
- For a product landing page, show the product name and actual product media or state
  in the first viewport. Do not hide the product behind an abstract hero.
- For a service or studio page, show positioning and actions first, services second,
  evidence after the offer, and contact near the end.
- For documentation, prioritize navigation, readable content width, code, version
  context, and search over promotional composition.
- For consumer or expressive products, allow stronger imagery and domain motion while
  retaining the family token, type, geometry, and accessibility contracts.

## Validate before declaring completion

Read and execute [quality-assurance.md](references/quality-assurance.md).

- Run the repository-defined build, lint, unit, accessibility, and visual checks.
- Run the `axe-core` release gate and the required browser/screen-reader matrix. An
  automated scan alone is not evidence of WCAG 2.2 AA conformance.
- Inspect representative routes at 390, 768, 1440, and 1920 CSS pixels.
- Check light, dark, increased-contrast, reduced-motion, and forced-colors behavior.
- Check every supported script family; inspect each RTL language independently.
- Verify header geometry, scrollbar stability, no horizontal overflow, no clipped
  controls, no text overlap, no layout shift, and no state-driven resizing.
- Exercise navigation with keyboard, pointer, `Escape`, outside click, and rapid
  reversal during transitions.
- Inspect screenshots visually. A clean automated report does not prove good hierarchy.

Do not publish a redesign that only passes at one viewport, one locale, or one theme.

## Reject these patterns

- One-note pages dominated by a single hue family.
- Pure black or pure white interface colors.
- Gradient orbs, bokeh, glow fields, or decorative glass as page structure.
- Large empty heroes, split hero cards, or centered stacks with unrelated visual axes.
- Rounded rectangles where a familiar icon is clearer; radii above 8px without a
  functional reason.
- Font size tied continuously to viewport width or negative letter spacing.
- Opaque theme inversion, hidden focus, hover-only information, or motion without a
  reduced-motion equivalent.
- `overflow-x: hidden` used to conceal broken geometry.
- Abstract stock imagery where the real product, object, data, or workflow should be
  shown.
- Generic claims about innovation, quality, scale, security, or AI capability without
  an observable artifact or result.

## Resource map

- [foundations.md](references/foundations.md): family identity, product freedom, page
  archetypes, Barycenter/Pulsar migration.
- [typography-and-content.md](references/typography-and-content.md): type scale,
  multilingual typography, labels, and editorial voice.
- [color-and-themes.md](references/color-and-themes.md): palette construction,
  semantic roles, dark mode, contrast, and materials.
- [layout-and-components.md](references/layout-and-components.md): containers, grids,
  header, sections, cards, controls, media, and responsive behavior.
- [motion-and-interaction.md](references/motion-and-interaction.md): feedback,
  interruption, transitions, gestures, and reduced motion.
- [accessibility-and-i18n.md](references/accessibility-and-i18n.md): semantics,
  keyboard, forms, themes, scripts, and RTL.
- [wcag-2.2-aa.md](references/wcag-2.2-aa.md): conformance target, authentication,
  input assistance, timing, live content, media, and public accountability.
- [discovery-and-trust.md](references/discovery-and-trust.md): evidence, metadata,
  localization, drafts, and machine-facing consistency.
- [quality-assurance.md](references/quality-assurance.md): required test matrix and
  geometry checks.
- [tokens.css](assets/tokens.css): framework-neutral baseline token contract.
- [accessibility-statement.md](templates/accessibility-statement.md): public statement
  template for each released product.
