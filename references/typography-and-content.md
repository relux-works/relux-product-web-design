# Typography and Content

## Type roles

Use a small, explicit family of roles:

| Role | Preferred family | Use |
| --- | --- | --- |
| Display | Inter Tight | Product statements, page and section headings |
| Interface | Inter | Body copy, navigation, controls, labels, data |
| Technical | Roboto Mono | Eyebrows, code, identifiers, compact metadata |

Use `font-optical-sizing: auto` where supported and `font-synthesis: none`. Do not
simulate missing bold or italic faces.

This skill does not bundle font binaries. Before implementation, verify the project's
licensed or open-source font files, package source, weights, subsets, preload strategy,
and fallback behavior. Record any unavailable family in the design contract; do not
silently fetch a font or rebuild the outlined corporate wordmark with a fallback.

Recommended fallback groups:

```css
--font-display: "Inter Tight", "Inter", system-ui, sans-serif;
--font-ui: "Inter", system-ui, sans-serif;
--font-mono: "Roboto Mono", ui-monospace, monospace;
--font-arabic: "Noto Sans Arabic", "Inter", sans-serif;
--font-hebrew: "Noto Sans Hebrew", "Inter", sans-serif;
--font-armenian: "Noto Sans Armenian", "Inter", sans-serif;
--font-georgian: "Noto Sans Georgian", "Inter", sans-serif;
```

Apply script-specific fallbacks through `:lang()` rather than forcing one universal
font file to cover every writing system.

## Relux Works wordmark

Treat the `Relux Works` wordmark as approved artwork, not a live type role. Use the
outlined Inter Bold 700 lockup from [brand-identity.md](brand-identity.md) with its exact
capitalization, kerning, and word spacing. Production SVGs use filled paths and contain
no `<text>` element. Never recreate the wordmark with CSS, a system fallback, or Inter
Tight. Keep licensed live type only as an editable source; use outlines wherever
rendering must be deterministic.

## Fixed responsive scale

Font sizes change at deliberate breakpoints. Do not scale font size continuously
with viewport width.

| Role | Desktop | Mobile | Line height |
| --- | --- | --- | --- |
| Product statement | 4.5rem | 2.75rem | 1.02-1.06 |
| Page heading | 3.5rem | 2.5rem | 1.06-1.10 |
| Section heading | 2.75rem | 2rem | 1.10-1.16 |
| Subsection heading | 1.25rem | 1.125rem | 1.30-1.38 |
| Lead | 1.25rem | 1.125rem | 1.50-1.60 |
| Body | 1rem | 1rem | 1.55-1.65 |
| Compact interface | 0.8125rem | 0.8125rem | 1.35-1.45 |
| Technical eyebrow | 0.75rem | 0.75rem | 1.35-1.45 |

Use smaller headings inside compact panels, cards, sidebars, and tools. Hero-scale
type belongs only to a true first-viewport statement.

## Spacing and line measure

- Keep `letter-spacing: 0` across interface and display roles. This is intentional for
  consistent multilingual rendering.
- Set reading content to a maximum of `45rem` or roughly 55-75 characters per line.
- Let headings use `text-wrap: balance` when it does not create unstable reflow.
- Let prose use `text-wrap: pretty` as progressive enhancement.
- Use `overflow-wrap: anywhere` for URLs and untrusted identifiers, not for ordinary
  words.
- Scale text-related spacing in `rem` so browser font-size preferences remain useful.
- Increase line height for Arabic and scripts with taller vertical forms when visual
  inspection shows crowding.

## Hierarchy

Construct hierarchy using size, weight, line height, position, and whitespace as one
system. Do not solve hierarchy by adding more colors or uppercase text.

- Product statement: weight 600-700, one concrete idea, normally no more than three
  lines on desktop.
- Section heading: weight 600-700, aligned to the section grid.
- Body and lead: weight 400-500, neutral text token, comfortable measure.
- Technical label: mono, weight 600, short, and optional uppercase only where the
  script and language support it naturally.
- Interface label: sentence case and specific to the action or destination.

Do not repeat the same statement in the eyebrow, heading, paragraph, and button.

## Writing standard

Write as an engineer explaining a product to another capable person:

- Name what the product does, for whom, under which constraints, and what happens
  next.
- Prefer observable nouns and verbs: `indexes releases`, `records an audio stream`,
  `returns a fixed quote`, `supports 14 markets`.
- Attach quantities to a date, method, or scope. Avoid universal claims such as
  `always`, `fully`, `best`, or `100%` unless they are contractual and verifiable.
- Replace generic AI language with the actual agent, model, harness, evaluation,
  approval, or failure mode involved.
- Do not create ornamental antithesis such as `not software, but magic` or
  `less process, more progress`.
- Avoid feature narration in the interface. Labels should name destinations and
  actions, not explain that the interface has features.
- Keep calls to action concrete: `Open workspace`, `Connect Spotify`, `Read API`,
  `Review request`, `Send approved brief`.

## Russian copy

- Use professional Russian terms where they remain precise. Keep established names,
  protocols, code identifiers, and abbreviations such as API, MCP, CI, Go, and MVP.
- Avoid guillemets and long dashes in interface copy. Rewrite the sentence with a
  colon, comma, period, or parentheses.
- Do not transliterate an English term when a natural Russian technical term exists.
- Keep adopted domain terms such as `вайбкод` only when they name the actual audience
  or market category.
- Check case, agreement, punctuation, and natural word order after localization.

## Claims and evidence

Every important claim should map to at least one inspectable item:

| Claim | Useful evidence |
| --- | --- |
| Product capability | Live state, screenshot, demo, or documented interface |
| Scale | Dated measurement, scope, and methodology |
| Integration | Supported provider, permission scope, and current status |
| Reliability | Service objective, incident history, or test method |
| Security | Concrete control, policy, audit, or threat model |
| Open source | Repository, release, license, and maintainer identity |
| Client result | Approved case study, attributable quote, or anonymized metric |

Do not fill a missing proof section with decorative statistics.
