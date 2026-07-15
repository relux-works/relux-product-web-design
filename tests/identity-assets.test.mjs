import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const RED_PATH = 'M48 10L88 50L48 90L38 80L68 50L38 20Z';
const ARROW_PATH = 'M15 63L32 46L26 40L48 40L48 62L42 56L25 73Z';
const BANNED_FEATURES = [
  '<text', '<image', '<linearGradient', '<radialGradient', '<filter', '<mask',
  '<clipPath', '<title', ' id=', ' role=', ' aria-', ' stroke=',
];

const variants = [
  { file: 'assets/relux-symbol.svg', viewBox: '0 0 100 100', ink: '#181A18' },
  { file: 'assets/relux-symbol-dark.svg', viewBox: '0 0 100 100', ink: '#FFFFFF' },
  {
    file: 'assets/relux-lockup-horizontal.svg',
    viewBox: '0 0 450 100',
    ink: '#181A18',
    wordmark: true,
  },
  {
    file: 'assets/relux-lockup-horizontal-dark.svg',
    viewBox: '0 0 450 100',
    ink: '#FFFFFF',
    wordmark: true,
  },
  {
    file: 'assets/relux-avatar-light.svg',
    viewBox: '0 0 100 100',
    ink: '#181A18',
    avatar: true,
  },
  {
    file: 'assets/relux-avatar-dark.svg',
    viewBox: '0 0 100 100',
    ink: '#FFFFFF',
    avatar: true,
  },
  {
    file: 'assets/relux-symbol-one-color.svg',
    viewBox: '0 0 100 100',
    chevron: '#181A18',
    ink: '#181A18',
  },
  {
    file: 'assets/relux-lockup-horizontal-one-color.svg',
    viewBox: '0 0 450 100',
    chevron: '#181A18',
    ink: '#181A18',
    wordmark: true,
  },
];

// Pin the metadata-free web copies so extra elements or attributes cannot drift in.
const approvedHashes = new Map([
  [
    'assets/relux-symbol.svg',
    '791e7d02cb7ea545fe395e3cd148e5beb0fd293038bdeaaa95d14978ad801777',
  ],
  [
    'assets/relux-symbol-dark.svg',
    'db37d85902caa3d2cc7885f00637c5ff0fca9464e14aa4cd84cef37cdc45863c',
  ],
  [
    'assets/relux-lockup-horizontal.svg',
    '87574b39b2331951366ad8196853ca31f096de7189410dbfcc250a189883197c',
  ],
  [
    'assets/relux-lockup-horizontal-dark.svg',
    '771773cd15ca0e58d5da662939c15d5f280e3ca5a624033c3d9813c0cb905a92',
  ],
  [
    'assets/relux-avatar-light.svg',
    '7b4e5afcaa7a6a16c9396109c61c96454edde0208929497f27312260d2e6a28a',
  ],
  [
    'assets/relux-avatar-dark.svg',
    '522c1ce05f94c7961ae0eec5318356d728fefbe7a19b4c3595a9deeaa55cf005',
  ],
  [
    'assets/relux-symbol-one-color.svg',
    '4b89bda63373c31b308dc771de42909353bb63fbfbe4796cf6e778a4b40d945c',
  ],
  [
    'assets/relux-lockup-horizontal-one-color.svg',
    'f913a2f14719706200012e983122abff3b99e94b6430a388dd977293c5a0ed9a',
  ],
]);

function luminance(hex) {
  const channels = hex
    .match(/[0-9a-f]{2}/gi)
    .map((value) => Number.parseInt(value, 16) / 255);
  return channels
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(foreground, background) {
  const luminances = [luminance(foreground), luminance(background)];
  const [light, dark] = luminances.sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

function tokensBetween(source, start, end) {
  const section = source.slice(source.indexOf(start), source.indexOf(end));
  return Object.fromEntries(
    [...section.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6});/gi)]
      .map((match) => [match[1], match[2]]),
  );
}

test('approved identity assets use exact path-only production geometry', () => {
  for (const {
    file, viewBox, chevron = '#F60D10', ink, wordmark = false, avatar = false,
  } of variants) {
    const source = read(file);
    assert.match(source, new RegExp(`viewBox="${viewBox}"`));
    assert.ok(source.includes(RED_PATH), `${file} is missing the approved chevron`);
    assert.ok(source.includes(ARROW_PATH), `${file} is missing the approved arrow`);
    assert.ok(source.includes(`fill="${chevron}"`), `${file} has the wrong chevron color`);
    assert.ok(source.includes(`fill="${ink}"`), `${file} has the wrong ink color`);
    assert.equal(source.match(/<path\b/g)?.length, wordmark ? 3 : 2);
    assert.equal(
      source.includes('<rect'),
      avatar,
      `${file} has the wrong background treatment`,
    );
    const elements = new Set(
      [...source.matchAll(/<([a-z][\w:-]*)\b/gi)].map((match) => match[1]),
    );
    assert.deepEqual(elements, new Set(['svg', ...(avatar ? ['rect'] : []), 'path']));
    for (const feature of BANNED_FEATURES) {
      assert.ok(!source.includes(feature), `${file}: ${feature}`);
    }
    const canonicalSource = source.replaceAll('\r\n', '\n');
    const actualHash = crypto
      .createHash('sha256')
      .update(canonicalSource)
      .digest('hex');
    assert.equal(
      actualHash,
      approvedHashes.get(file),
      `${file} differs from the approved source`,
    );
  }
});

test('type tokens keep script-specific fonts out of the universal stack', () => {
  const source = read('assets/tokens.css');
  const defaultTypography = source.slice(0, source.indexOf('/* Spacing */'));
  const defaultStacks = defaultTypography
    .match(/--font-(?:display|ui):[^;]+;/g)
    .join('\n');
  assert.doesNotMatch(defaultStacks, /Noto Sans/);
  for (const token of ['arabic', 'hebrew', 'armenian', 'georgian']) {
    assert.match(source, new RegExp(`--font-${token}:`));
  }
});

test('baseline tokens separate immutable identity colors from accessible UI roles', () => {
  const source = read('assets/tokens.css');
  assert.match(source, /--color-brand-red:\s*#F60D10;/);
  assert.match(source, /--color-brand-ink:\s*#181A18;/);
  assert.match(source, /--color-brand-white:\s*#FFFFFF;/);
  assert.doesNotMatch(source, /--color-accent:\s*#F60D10;/);
  assert.doesNotMatch(
    source,
    /#b7352b/i,
    'deprecated studio red remains in the palette',
  );

  const palettes = [
    tokensBetween(source, 'palette:light:start', 'palette:light:end'),
    tokensBetween(source, 'palette:dark:start', 'palette:dark:end'),
    tokensBetween(source, 'palette:light-contrast:start', 'palette:light-contrast:end'),
    tokensBetween(source, 'palette:dark-contrast:start', 'palette:dark-contrast:end'),
  ];
  const identityRoles = [
    {
      accent: '#c20a0c', link: '#a80608', linkHover: '#810406',
      focus: '#c20a0c', selection: '#f3d1d0',
    },
    {
      accent: '#ff6961', link: '#ff817b', linkHover: '#ff9a94',
      focus: '#ff817b', selection: '#742c29',
    },
    {
      accent: '#8f0406', link: '#8f0406', linkHover: '#700204',
      focus: '#8f0406', selection: '#f1c5c4',
    },
    {
      accent: '#ffa29c', link: '#ff9a92', linkHover: '#ffb5b0',
      focus: '#ff9a92', selection: '#742c29',
    },
  ];

  palettes.forEach((palette, index) => {
    const { accent, link, linkHover, focus, selection } = identityRoles[index];
    assert.equal(palette['--color-accent'].toLowerCase(), accent);
    assert.equal(palette['--color-link'].toLowerCase(), link);
    assert.equal(palette['--color-link-hover'].toLowerCase(), linkHover);
    assert.equal(palette['--color-focus'].toLowerCase(), focus);
    assert.equal(palette['--color-selection-bg'].toLowerCase(), selection);
  });

  const minimumAccentContrast = [5.31, 5.13, 7.82, 7.51];
  const minimumNavigationContrast = [4.5, 4.5, 7.09, 7.09];

  palettes.forEach((palette, index) => {
    const surfaces = [
      palette['--color-bg'], palette['--color-surface-subtle'],
      palette['--color-surface'], palette['--color-surface-raised'],
    ];
    for (const surface of surfaces) {
      assert.ok(
        contrast(palette['--color-accent'], surface) >= minimumAccentContrast[index],
      );
      assert.ok(
        contrast(palette['--color-link'], surface) >= minimumNavigationContrast[index],
      );
      assert.ok(
        contrast(palette['--color-focus'], surface) >= minimumNavigationContrast[index],
      );
    }
    assert.ok(
      contrast(palette['--color-on-accent'], palette['--color-accent']) >= 4.5,
    );
  });

  assert.match(source, /--color-brand-red:\s*CanvasText;/);
  assert.match(source, /--color-brand-ink:\s*CanvasText;/);
  assert.match(source, /--color-brand-white:\s*CanvasText;/);
});
