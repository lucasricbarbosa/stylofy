# Stylofy

**A visual theme editor for [shadcn/ui](https://ui.shadcn.com/) — build, preview, and export production-ready themes in seconds.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## The Problem

shadcn/ui themes require 34 CSS custom properties across two color modes. Writing them by hand is tedious, getting light/dark parity right is error-prone, and verifying WCAG contrast compliance means leaving your editor. Stylofy eliminates all of that.

---

## Features

- **5-color design system** — Set `foreground`, `background`, `primary`, `secondary`, and `accent`; all 34 shadcn tokens are derived automatically.
- **Per-token overrides** — Any token can be overridden independently. Overrides survive simple-color changes; derived tokens update automatically.
- **30+ built-in presets** — From `Default` and `Caffeine Pro` to `Cyberpunk`, `macOS`, and `Midnight Studio`.
- **Undo / Redo** — Full snapshot history (50 steps) at the reducer level.
- **Light & Dark mode** — Edit both modes independently with live preview.
- **WCAG contrast checker** — Real-time AA / AAA / AA-Large compliance report for 12 critical color pairs.
- **Multi-format export** — CSS variables in `oklch`, `hsl`, `rgb`, or `hex`, for Tailwind v3 (`@layer base`) or Tailwind v4 (`@theme inline`).
- **Import CSS** — Paste any existing shadcn/ui CSS block to load it into the editor.
- **Saved themes** — Name and persist themes to `localStorage`; export/import as JSON.
- **Border radius & fonts** — Edit `--radius` and font families directly.
- **Live injection** — Every change is reflected on the page instantly via CSS custom properties on `documentElement`.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm, npm, or yarn

### Installation

```bash
git clone https://github.com/your-username/stylofy.git
cd stylofy
npm install   # or pnpm install / yarn
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

---

## How It Works

### Token derivation

Stylofy's theming engine starts from five **simple tokens** and derives all 34 shadcn tokens automatically:

```
foreground  ──► foreground, card-foreground, popover-foreground,
                muted-foreground, sidebar-foreground

background  ──► background, card, popover, border, input,
                sidebar, sidebar-border

primary     ──► primary, primary-foreground, ring,
                sidebar-primary, sidebar-primary-foreground, sidebar-ring

secondary   ──► secondary, secondary-foreground, muted

accent      ──► accent, accent-foreground, chart-1…5,
                sidebar-accent, sidebar-accent-foreground
```

`primary-foreground`, `secondary-foreground`, and `accent-foreground` are computed automatically via WCAG luminance contrast (`autoContrast`). Chart colors are derived by hue-rotating `accent` by 30° increments. Borders and muted tones use lightness shifts in OKLCH space.

### Derived vs. Override

Every token carries a `source` flag — `"derived"` or `"override"`. When you change a simple color, only tokens marked `derived` in that color's group are recalculated. Manual overrides are preserved unless you explicitly reset them.

```
simple color changed → only "derived" tokens in that group recalculate
manual override      → survives simple-color changes until explicitly reset
```

### State management

The editor uses a `useReducer`-based store wrapped in React Context. Ten action types cover every use case:

| Action | Effect |
|---|---|
| `SET_SIMPLE` | Update a base color; re-derive dependent tokens in the active mode |
| `SET_SHADCN_TOKEN` | Override one token in the active mode |
| `RESET_TOKEN_TO_DERIVED` | Revert a single token to its derived value |
| `RESET_ALL_TO_DERIVED` | Reset all overrides in the active mode |
| `SET_ACTIVE_MODE` | Switch between `light` and `dark` |
| `APPLY_PRESET` | Load a full preset; clears undo history |
| `UNDO` / `REDO` | Navigate 50-step snapshot history |
| `SET_RADIUS` | Update `--radius` in both modes simultaneously |
| `SET_FONT_FAMILY` | Update `font-sans` and `font-mono` |

State is persisted to `localStorage` with a 400 ms debounce under the key `stylofy:theming:v3:working`.

---

## Hooks

### `useThemingStore()`

Direct access to state, dispatch, and undo/redo flags. Use this for any custom component that needs to read or mutate theme state.

```tsx
import { useThemingStore } from "@/features/theming/store";

function MyComponent() {
  const { state, dispatch, canUndo, canRedo } = useThemingStore();

  return (
    <button
      onClick={() =>
        dispatch({ type: "SET_SIMPLE", key: "primary", value: "oklch(0.55 0.2 260)" })
      }
    >
      Set primary to blue
    </button>
  );
}
```

### `useStore()` — legacy helper

A higher-level wrapper that exposes ergonomic helpers:

```tsx
import { useStore } from "@/features/theming/store";

function MyComponent() {
  const { state, setToken, setMode, applyTheme, undo, redo, canUndo, reset } = useStore();

  // Override a specific token in the active mode
  setToken("primary", "oklch(0.6 0.22 30)"); // coral red

  // Switch modes
  setMode("dark");

  // Apply a full theme programmatically (clears history)
  applyTheme(lightTokenValues, darkTokenValues);
}
```

### `useLocalThemes()`

Manage user-saved themes from `localStorage`:

```tsx
import { useLocalThemes } from "@/features/theming/hooks/useLocalThemes";

function SavePanel() {
  const { themes, addTheme, deleteTheme, exportThemeJson } = useLocalThemes();

  return (
    <>
      <button onClick={() => addTheme("My Theme", lightTokens, darkTokens)}>
        Save current
      </button>
      {themes.map((t) => (
        <div key={t.id}>
          <span>{t.name}</span>
          <button onClick={() => deleteTheme(t.id)}>Delete</button>
          <button onClick={() => console.log(exportThemeJson(t.id))}>Export JSON</button>
        </div>
      ))}
    </>
  );
}
```

### `useContrastReport()`

Real-time WCAG contrast compliance for the active mode:

```tsx
import { useContrastReport } from "@/features/theming/hooks/useContrastReport";

function ContrastBadge() {
  const { results, failCount } = useContrastReport();

  return (
    <span style={{ color: failCount > 0 ? "red" : "green" }}>
      {failCount === 0 ? "All pairs pass AA" : `${failCount} pairs fail AA`}
    </span>
  );
}
```

Each result contains:

```ts
interface ContrastResult {
  fg: ShadcnToken;      // e.g. "foreground"
  bg: ShadcnToken;      // e.g. "background"
  label: string;        // e.g. "Page text"
  ratio: number;        // e.g. 8.34
  passAA: boolean;      // ratio ≥ 4.5 : 1
  passAAA: boolean;     // ratio ≥ 7.0 : 1
  passAALarge: boolean; // ratio ≥ 3.0 : 1 (large text / UI components)
}
```

### `useDeferredCommit<T>()`

Draft → commit pattern for inputs that should not dispatch on every keystroke:

```tsx
import { useDeferredCommit } from "@/features/theming/hooks/useDeferredCommit";

function RadiusInput({ value, onChange }) {
  const [draft, setDraft, flush] = useDeferredCommit(value, onChange);

  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={flush}
      onKeyDown={(e) => e.key === "Enter" && flush()}
    />
  );
}
```

---

## Built-in Presets

Stylofy ships with **30+ presets** across several aesthetics:

| Preset | Style |
|---|---|
| **Default** | Clean blue/purple — the shadcn baseline |
| **Caffeine Pro** | Warm coffee-cream editorial |
| **Forest Ink** | Deep evergreen with ink accents |
| **Art Deco Pro** | Geometric gold on near-black |
| **Claude** | Geist-inspired neutral + lavender |
| **macOS** | Apple-like grays with blue accent |
| **Cyberpunk** | High-contrast neon on dark |
| **Midnight Studio** | Deep navy with amber highlights |
| **Spotify** | Dark surface with vibrant green |
| **Terminal** | Monospace green-on-black |
| **Newsprint** | Sepia tones with serif feel |
| **Ocean Depth** | Desaturated teals and deep blue |
| **Solar Flare** | Warm orange and burnt amber |
| **Notebook** | Off-white paper with soft blue |
| **Brutalist** | High-contrast black and white |
| **Pastel Dream** | Soft pinks and lavenders |
| **Vault** | Dark olive with muted gold |
| **Concrete** | Cool grays, industrial texture |
| **Blue / Coral / Amber / Sunset / Sand / Vintage / Mint / Editorial / Zen / Deep Purple** | Single-hue accent families |

Each preset defines all 34 tokens for both `light` and `dark` in OKLCH, with `simple` tokens extracted for re-derivation.

---

## Export

The export system generates production-ready CSS from the active theme.

### Tailwind v4 (`index.css`)

```css
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.488 0.243 264.376);
  /* …34 tokens total */
}

.dark {
  --background: oklch(0.145 0 0);
  /* … */
}

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* … */
  --font-sans: var(--font-sans);
  --radius-lg: var(--radius);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

### Tailwind v3 (`index.css` + `tailwind.config.ts`)

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --primary: 229 65% 47%;
    /* … */
  }
  .dark { /* … */ }
}
```

```ts
// tailwind.config.ts (auto-generated)
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // …full token map
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
```

Supported output formats: `oklch` · `hsl` · `rgb` · `hex`

---

## Color Utilities

Located in `src/features/theming/lib/oklch.ts`:

```ts
import { toOklch, toHsl, toRgb, toHex, isValidColor } from "@/features/theming/lib/oklch";

toOklch("#3b82f6");            // "oklch(0.6228 0.1884 263.83)"
toHsl("oklch(0.6 0.2 260)");   // "hsl(229 65% 47%)"
toHex("oklch(0.55 0.22 142)"); // "#22c55e"
isValidColor("not-a-color");   // false
```

---

## Adding a Preset

Create a new entry in `src/features/theming/lib/presets.ts` and add it to `BUILT_IN_PRESETS`:

```ts
// src/features/theming/lib/presets.ts

export const BUILT_IN_PRESETS: BuiltInPreset[] = [
  // …existing presets…

  advancedPreset(
    "My Brand",
    "Company brand palette",
    // Light mode overrides — unspecified tokens fall back to SHADCN_LIGHT_DEFAULTS
    {
      background: "oklch(0.98 0.005 90)",
      foreground: "oklch(0.15 0.01 260)",
      primary: "oklch(0.55 0.22 142)",  // brand green
      secondary: "oklch(0.92 0.01 90)",
      accent: "oklch(0.65 0.18 50)",    // warm amber
    },
    // Dark mode overrides
    {
      background: "oklch(0.12 0.01 260)",
      foreground: "oklch(0.95 0 0)",
      primary: "oklch(0.65 0.22 142)",
      secondary: "oklch(0.22 0.01 260)",
      accent: "oklch(0.70 0.18 50)",
    },
  ),
];
```

The preset appears immediately in the theme selector — no other changes needed.

---

## Project Structure

```
src/features/theming/
├── types.ts                   # All TypeScript types and the SHADCN_TOKENS const
├── store.ts                   # ThemingStoreProvider, useThemingStore, useStore
├── hooks/
│   ├── useContrastReport.ts   # WCAG compliance hook
│   ├── useDeferredCommit.ts   # Draft → commit pattern
│   └── useLocalThemes.ts      # localStorage saved themes
├── lib/
│   ├── presets.ts             # 30+ BuiltInPreset definitions
│   ├── defaults.ts            # SHADCN_LIGHT_DEFAULTS / SHADCN_DARK_DEFAULTS
│   ├── derive-shadcn.ts       # deriveShadcnTokens() — core derivation engine
│   ├── oklch.ts               # Color conversion utilities (culori)
│   ├── contrast.ts            # WCAG contrast ratio computation
│   ├── export.ts              # buildCssExport, parseCssImport, highlightCss
│   └── tailwind-export.ts     # generateV4IndexCss, generateV3IndexCss, generateV3TailwindConfig
└── components/
    ├── theming-drawer.tsx      # Responsive drawer shell
    ├── editor-panel.tsx        # Main editing UI (base, brand, chart, sidebar, shape)
    ├── action-bar.tsx          # Undo/redo, mode toggle, export, import, save
    ├── color-row.tsx           # Single token row with picker + override badge
    ├── theme-selector.tsx      # Preset + saved theme picker
    ├── export-modal.tsx        # Tabbed export (v3/v4, format selector)
    ├── import-modal.tsx        # CSS / JSON import
    ├── contrast-modal.tsx      # WCAG report table
    ├── mode-toggle.tsx         # Light / dark switcher
    ├── radius-row.tsx          # Border radius editor
    ├── tailwind-picker.tsx     # Tailwind palette picker
    └── hold-to-save-button.tsx # Press-and-hold save interaction
```

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Color science | [culori](https://culorijs.org) |
| System theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Components | [Radix UI](https://www.radix-ui.com), [shadcn/ui](https://ui.shadcn.com) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| Icons | [Lucide React](https://lucide.dev) |
| URL compression | [lz-string](https://github.com/pieroxy/lz-string) |

---

## Contributing

Contributions are welcome. Please open an issue before submitting a large PR.

```bash
# Fork → clone → create a branch
git checkout -b feat/my-feature

# Make changes, then verify
npm run lint
npm run build

# Open a pull request
```

**Reporting bugs:** open an issue with a description of the theme or export that produced unexpected output, and paste the CSS or JSON if relevant.

---

## License

MIT © Lucas Ricardo
