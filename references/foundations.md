# Product-Family Foundations

## Contents

1. [Purpose](#purpose)
2. [Family invariants](#family-invariants)
3. [Product expression slots](#product-expression-slots)
4. [Page archetypes](#page-archetypes)
5. [Composition rules](#composition-rules)
6. [Barycenter and Pulsar migration](#barycenter-and-pulsar-migration)
7. [Decision record](#decision-record)

## Purpose

Relux Works products should look related, not duplicated. A user moving between
products should recognize the same standards of typography, geometry, feedback,
accessibility, and factual communication. The individual product must still express
its own domain, audience, accent, imagery, and operational density.

The family system is a contract rather than a page template. Copying the studio
landing page section for section is a failure if the product needs a tool, a data
surface, documentation, or a media experience as its first screen.

## Family invariants

Keep these consistent across all internal product websites:

1. **Type roles.** Inter Tight for display, Inter for body and interface text, and
   Roboto Mono for technical labels and code, with script-appropriate fallbacks.
2. **Semantic color architecture.** Components consume role tokens such as text,
   surface, control, border, accent, link, success, warning, and error. They do not
   own arbitrary color literals.
3. **Complete system states.** Light, dark, increased-contrast, reduced-motion,
   reduced-transparency, and forced-colors behavior are designed together.
4. **Restrained geometry.** Clear bands, aligned grids, radii no larger than 8px by
   default, stable controls, and no cards nested inside cards.
5. **Immediate interaction feedback.** Press states begin on pointer-down; ordinary
   transitions are short, reversible, and never block input.
6. **Editorial discipline.** Product statements are specific, technically accurate,
   and backed by real interfaces, artifacts, measurements, or provenance.
7. **International structure.** Logical properties, script-aware typography, and
   independent RTL verification are part of the component model.
8. **Measured quality.** Every release is checked across the shared viewport, theme,
   input, language, and direction matrix.

These invariants create family resemblance more reliably than a shared hero shape or
the same accent color.

## Product expression slots

Choose these per product and record them in the repository:

| Slot | Allowed variation | Constraint |
| --- | --- | --- |
| Accent | One primary hue and tested state variants | Must work in every theme and meet contrast targets |
| Neutral tint | Slight warm, cool, or chromatic bias | Large surfaces stay low-chroma and readable |
| Supporting color | One optional secondary functional or editorial hue | Never competes with the primary action |
| Media | Product UI, data, photography, illustration, or domain object | Must reveal the actual product or subject |
| Iconography | Existing library plus a product mark | Controls use familiar symbols and accessible names |
| Density | Editorial, standard, or operational | Spacing scale and alignment contract remain shared |
| Domain motion | Playback, synchronization, spatial movement, live state | Motion communicates state; idle decoration stays still |
| Voice | Vocabulary appropriate to the audience and domain | Tone remains direct, factual, and free of inflated claims |

Do not change all expression slots at once. A product generally needs one dominant
identity signal: its real interface, its domain imagery, or its accent. More signals
create noise rather than distinction.

## Page archetypes

Choose the archetype before choosing the hero.

| Archetype | First screen | Primary evidence | Typical density |
| --- | --- | --- | --- |
| Operational tool | The usable workflow and current state | Real data, controls, status, and history | High |
| Consumer product | Product name, core action, and actual product state | Screens, media, output, or live preview | Standard |
| Product landing | Literal product offer and inspectable product media | Workflow, compatibility, results, and provenance | Standard |
| Documentation | Navigation, search, version, and readable content | Runnable examples and reference material | High |
| Open-source project | What it does, install path, and repository status | Code, releases, support matrix, and license | Standard |
| Editorial publication | Article or issue hierarchy and reading path | Authorship, dates, sources, and archive | Editorial |
| Studio or service | Positioning and actions, then service formats | Work, process, prices, and legal identity | Standard |

An internal product website may combine archetypes, but one must dominate the first
viewport. Do not use a marketing hero to delay entry into an operational tool.

## Composition rules

- Make the product name, literal category, or usable product unmistakable in the
  first viewport. A tiny brand label in navigation is insufficient.
- Leave a visible continuation into the next section on common mobile and desktop
  viewports. The first screen should not become an isolated poster.
- Use actual product media at a stable aspect ratio. Prefer an unframed or full-width
  presentation when inspection is important.
- Build sections as full-width bands with a constrained inner grid. Cards represent
  repeated objects, tools, or dialogs; they are not generic wrappers for sections.
- Keep one dominant visual axis. Centered product media can coexist with left-aligned
  reading content, but unrelated centered stacks should not drift independently.
- Treat the shared header and footer as relationship signals. State the product's
  connection to Relux Works without making the studio brand louder than the product.

## Barycenter and Pulsar migration

Use Barycenter/Pulsar as the worked example for bringing a distinct product into the
family without flattening it.

### Preserve

- The Pulsar name and actual product icon.
- The astronomy and music vocabulary where it describes the product truthfully.
- Violet as a recognizable accent and warm gold as an optional supporting signal.
- Real Spotify and Telegram integrations, provenance, and working product states.
- Motion that communicates playback, synchronization, connection, or a live event.

### Replace or constrain

- Replace the single-hue purple gradient page with low-chroma semantic surfaces and
  tested violet accents in complete light and dark themes.
- Remove decorative glass-card stacking. Reserve translucency for genuinely floating
  navigation or overlays and provide an opaque fallback.
- Bring radii into the shared 0-8px range except for circular media or controls whose
  shape has a functional meaning.
- Replace negative display tracking with the shared type scale and optical sizing.
- Stop perpetual icon pulsing when the product is idle. Pulse only while an operation
  is live and provide a reduced-motion equivalent.
- Introduce the shared header geometry, keyboard behavior, focus treatment, footer
  relationship, and visual QA matrix.

### Suggested composition

1. Show Pulsar as the first-viewport signal, paired with the real current listening
   or recommendation state rather than an abstract decorative hero.
2. Put the primary action adjacent to the state it affects.
3. Follow with a concise workflow band: source, analysis, recommendation, delivery.
4. Show supported services and limitations as factual compatibility data.
5. Add privacy, data handling, product provenance, and the Relux Works relationship.

This composition is a starting point, not a required section template. The product
experience should determine the final order.

## Decision record

Before implementation, add a short design record to the product repository:

```md
## Product web design contract

- Archetype:
- Primary audience:
- First-viewport product signal:
- Real evidence shown:
- Accent and neutral tint:
- Density:
- Domain motion and its state meaning:
- Supported themes, locales, and directions:
- Intentional deviations from the family system:
```

An intentional deviation is acceptable when it serves the product and remains
accessible. An undocumented deviation tends to become accidental design debt.
