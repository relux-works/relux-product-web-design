# Quality Assurance

## Contents

1. [Preflight](#preflight)
2. [Required matrix](#required-matrix)
3. [Geometry checks](#geometry-checks)
4. [Interaction checks](#interaction-checks)
5. [Accessibility and localization](#accessibility-and-localization)
6. [Automated accessibility gate](#automated-accessibility-gate)
7. [Assistive-technology matrix](#assistive-technology-matrix)
8. [Discovery consistency](#discovery-consistency)
9. [Visual review](#visual-review)
10. [Completion gate](#completion-gate)

## Preflight

Before changing the design:

- Read repository instructions and the product design contract.
- Record the current routes, components, tokens, breakpoints, themes, languages,
  scripts, and directions.
- Run the existing build and test commands to distinguish prior failures from new
  regressions.
- Preserve representative before screenshots for a migration or visual review.
- Identify real media and data dependencies, including their loading and error states.

## Required matrix

Test representative public and application routes at these viewport widths:

- 390px: compact mobile.
- 768px: tablet and narrow desktop transition.
- 1440px: standard desktop.
- 1920px: wide desktop.

Cross the routes with the states they support:

- Light and dark appearance.
- Increased contrast in light and dark.
- Reduced motion and reduced transparency.
- Forced colors where the browser supports it.
- Default, hover, focus, pressed, loading, success, warning, and error states.
- Mobile navigation open and closed.
- Long content and empty content.
- Every script family and every RTL locale independently.

Do not generate every Cartesian combination when it adds no information. Cover every
dimension and add pairwise cases where interactions are risky, such as Arabic plus
dark mode plus an open mobile drawer.

## Geometry checks

Automate invariants and inspect failures visually.

### Horizontal overflow

```js
const overflow = await page.evaluate(() => {
  const root = document.documentElement;
  return {
    clientWidth: root.clientWidth,
    scrollWidth: root.scrollWidth,
    offenders: [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > root.clientWidth + 1;
      })
      .map((element) => element.outerHTML.slice(0, 180)),
  };
});
```

The root `scrollWidth` must be no more than one rounding pixel wider than
`clientWidth`. Diagnose the offending track; do not hide the overflow.

### Header axis

Measure the center of the desktop navigation against the viewport center. Keep the
difference within one CSS pixel unless the product contract intentionally defines a
different axis.

```js
const delta = await page.evaluate(() => {
  const nav = document.querySelector("[data-site-nav]").getBoundingClientRect();
  return Math.abs(nav.left + nav.width / 2 - innerWidth / 2);
});
```

### Stable dimensions

- Compare header and control boxes before and after route, locale, active, loading,
  copied, expanded, and error state changes.
- Confirm scrollbar appearance and scroll lock do not shift centered content.
- Verify media reserves its final aspect ratio before loading.
- Check that fixed and sticky elements do not cover anchors or focused controls.
- Confirm section columns share their intended baselines and repeated rows keep the
  same tracks.

## Interaction checks

- Navigate the complete primary flow by keyboard.
- Exercise trigger, focus entry, focus containment, `Escape`, outside press, route
  change, focus return, and background scroll lock for every overlay.
- Rapidly reverse open-close-open transitions and confirm no jump or invisible layer
  remains.
- Check press feedback begins immediately and does not move neighboring layout.
- Verify touch targets and adjacent spacing at mobile width.
- Test slow, failed, empty, offline, expired, and permission-denied states where they
  apply.
- Confirm destructive actions are recoverable or explicitly confirmed.
- Confirm a side-effecting agent action shows a final draft and requires consent.

## Accessibility and localization

- Apply the full WCAG 2.2 Level AA release profile in [wcag-2.2-aa.md](wcag-2.2-aa.md).
- Run the automated accessibility gate, then perform the required keyboard and
  screen-reader journeys. Automation does not validate task order, useful names,
  understandable errors, or correct live-region behavior.
- Validate text and non-text contrast for every palette and surface combination.
- Inspect 200% text zoom, 400% browser zoom, and increased browser default font size.
- Inspect reduced motion, reduced transparency, increased contrast, and forced colors.
- Check document language, mixed-language spans, labels, errors, status announcements,
  and alternative media.
- Verify logical alignment, drawer direction, icon mirroring, mixed-direction
  identifiers, punctuation, and line height separately in Arabic, Persian, and Hebrew.
- Use the longest real translations rather than artificial repeated characters.

## Automated accessibility gate

Use `axe-core` in the repository's real browser test runner. For Playwright, install
`@axe-core/playwright` as a development dependency and run it after the page reaches
each stable state.

```js
import AxeBuilder from "@axe-core/playwright";

const results = await new AxeBuilder({ page }).analyze();
const wcagTags = new Set([
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22a",
  "wcag22aa",
]);

const blocking = results.violations.filter((violation) =>
  violation.tags.some((tag) => wcagTags.has(tag)) ||
  violation.impact === "serious" ||
  violation.impact === "critical",
);

expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
```

The CI gate fails for:

- Every detected violation tagged to WCAG Level A or AA, regardless of impact label.
- Every other `serious` or `critical` violation.
- An accessibility scan that did not run, scanned the wrong document, or completed
  before the tested state became stable.

Scan representative routes and the open, error, validation, loading-complete, modal,
menu, authentication, and live states that change the accessibility tree. Include at
least one LTR and one RTL route when the product supports both.

Do not suppress a rule globally. A narrowly scoped exclusion requires a linked issue,
evidence that it is a false positive or inaccessible third-party boundary, an owner,
and an expiry date. Automated success is necessary but cannot establish conformance.

## Assistive-technology matrix

Run these tests with real operating-system accessibility APIs, not browser emulation:

| Platform | Browser and assistive technology | Minimum release coverage |
| --- | --- | --- |
| macOS | Safari + VoiceOver | Complete desktop critical journeys |
| Windows | Firefox or Chrome + NVDA | Complete desktop critical journeys |
| Android | Chrome + TalkBack | Complete mobile critical journeys |
| iOS, when mobile use is material | Safari + VoiceOver | Primary mobile journey and media controls |

If both Firefox and Chrome are listed as supported with NVDA, run the complete journey
in the primary combination and a navigation, form, dialog, error, and live-state smoke
test in the other. Record exact operating-system, browser, and assistive-technology
versions in the release evidence and public accessibility statement.

Each complete journey covers:

- Skip link, landmarks, headings, navigation, current page, and meaningful link names.
- Reading and focus order, visible focus, keyboard traps, and obscured focus.
- Labels, descriptions, autocomplete, errors, review, and completion status.
- Dialog and drawer entry, containment, closing, and focus return.
- Authentication, paste, password manager or passkey, one-time code, expiry, recovery,
  and lockout when present.
- Dynamic updates, live regions, streaming state, pause/stop/hide, and media controls.
- Zoom or text resizing, orientation, and a representative localized or RTL flow.

Run the complete matrix before the first public release and after material changes to
navigation, forms, authentication, media, the component system, or accessibility APIs.
For ordinary releases, rerun affected critical journeys and keep a periodic full-matrix
review. A checklist without observed output is not test evidence.

## Discovery consistency

- Compare visible product name, status, package, price, currency, language, and market
  claims with JSON-LD, metadata, sitemaps, feeds, MCP output, and public APIs.
- Validate canonical and reciprocal `hreflang` links.
- Confirm draft and preview routes are `noindex` and absent from public discovery files.
- Check social image crops and actual product representation.
- Check robots behavior for intended search and answer-system crawlers without broadly
  exposing private or low-quality routes.
- Confirm `lastmod` and release dates represent meaningful changes.
- Confirm the localized accessibility statement is linked consistently, names the
  actual assessment scope, and exposes a monitored feedback channel.

## Visual review

Open screenshots at full size and review them as a composition:

- Is the literal product or primary task obvious in the first viewport?
- Is part of the next section visible without creating an empty hero?
- Are the header, headings, summaries, rows, actions, and footer on coherent axes?
- Does the type hierarchy work without relying on accent color?
- Does dark mode preserve depth without glare, bright borders, or saturated large
  surfaces?
- Is product expression visible without turning the page into a one-hue theme?
- Are real interfaces and media legible rather than decorative?
- Do translated labels wrap intentionally and keep controls stable?
- Is motion quiet when the product is idle?

Inspect screenshots yourself. A nonblank image, a passing pixel threshold, or a clean
accessibility scan does not establish professional visual hierarchy.

## Completion gate

The change is complete only when:

- Build, lint, type, unit, accessibility, and repository validation commands pass.
- The `axe-core` gate has no blocking violations and the required screen-reader matrix
  has recorded results for all changed critical journeys.
- WCAG 2.2 Level AA exceptions, if any, have an accessible alternative, owner,
  remediation date, and matching public disclosure; the product is not described as
  fully conformant while an exception remains.
- Color tokens pass contrast validation and contain no pure black or pure white.
- Required viewport, appearance, direction, locale, and interaction coverage is done.
- Automated geometry checks and visual screenshot review both pass.
- Visible and machine-readable facts agree.
- The accessibility statement is current, reachable, localized with the product, and
  includes a monitored feedback and escalation path.
- Intentional family-system deviations are recorded.
- No unrelated files were reformatted, reverted, staged, or committed.
