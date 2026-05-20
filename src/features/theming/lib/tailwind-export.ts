import type { ExportFormat, TokenValues } from "../types";
import { SHADCN_TOKENS } from "../types";
import { convertColor } from "./oklch";

type Token = (typeof SHADCN_TOKENS)[number];

const NON_COLOR = new Set<Token>(["radius", "font-sans", "font-mono"]);
const COLOR_TOKENS = SHADCN_TOKENS.filter((t) => !NON_COLOR.has(t));

function getConverted(value: string, format: ExportFormat): string {
  if (!value?.trim()) return value ?? "";
  return convertColor(value, format);
}

// Strips the color function wrapper: oklch(L C H) → L C H, hsl(H S% L%) → H S% L%, etc.
// Used for v3 index.css where the value goes raw into --token: value;
function stripFn(value: string): string {
  const m = value.match(/^(?:oklch|hsl|rgb)\((.+)\)$/);
  return m ? m[1].trim() : value;
}

function buildLine(token: Token, values: TokenValues, format: ExportFormat, indent: number, raw: boolean): string {
  const pad = "  ".repeat(indent);
  let v: string;
  if (NON_COLOR.has(token)) {
    v = values[token] ?? "";
  } else {
    const converted = getConverted(values[token], format);
    // raw=true → strip function wrapper (v3 index.css style)
    // hex values keep their full form even in raw mode
    v = raw && format !== "hex" ? stripFn(converted) : converted;
  }
  return `${pad}--${token}: ${v};`;
}

// ── Tailwind v4 → index.css ──────────────────────────────────────────────────

export function generateV4IndexCss(light: TokenValues, dark: TokenValues, format: ExportFormat): string {
  const rootLines = SHADCN_TOKENS.map((t) => buildLine(t, light, format, 1, false)).join("\n");
  const darkLines = SHADCN_TOKENS.map((t) => buildLine(t, dark, format, 1, false)).join("\n");

  const colorMappings = COLOR_TOKENS.map((t) => `  --color-${t}: var(--${t});`).join("\n");

  return `@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

:root {
${rootLines}
}

.dark {
${darkLines}
}

@theme inline {
${colorMappings}
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

// ── Tailwind v3 → index.css ──────────────────────────────────────────────────

export function generateV3IndexCss(light: TokenValues, dark: TokenValues, format: ExportFormat): string {
  const rootLines = SHADCN_TOKENS.map((t) => buildLine(t, light, format, 2, true)).join("\n");
  const darkLines = SHADCN_TOKENS.map((t) => buildLine(t, dark, format, 2, true)).join("\n");

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${rootLines}
  }

  .dark {
${darkLines}
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

// ── Tailwind v3 → tailwind.config.ts ────────────────────────────────────────

export function generateV3TailwindConfig(format: ExportFormat): string {
  // For hex: no wrapper function → var(--token). Otherwise: format(var(--token))
  const fn = format === "hex" ? "" : format;
  const w = (token: string) => (fn ? `${fn}(var(--${token}))` : `var(--${token})`);
  const q = (v: string) => `"${v}"`;

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: ${q(w("background"))},
        foreground: ${q(w("foreground"))},
        card: {
          DEFAULT: ${q(w("card"))},
          foreground: ${q(w("card-foreground"))},
        },
        popover: {
          DEFAULT: ${q(w("popover"))},
          foreground: ${q(w("popover-foreground"))},
        },
        primary: {
          DEFAULT: ${q(w("primary"))},
          foreground: ${q(w("primary-foreground"))},
        },
        secondary: {
          DEFAULT: ${q(w("secondary"))},
          foreground: ${q(w("secondary-foreground"))},
        },
        muted: {
          DEFAULT: ${q(w("muted"))},
          foreground: ${q(w("muted-foreground"))},
        },
        accent: {
          DEFAULT: ${q(w("accent"))},
          foreground: ${q(w("accent-foreground"))},
        },
        destructive: {
          DEFAULT: ${q(w("destructive"))},
        },
        border: ${q(w("border"))},
        input: ${q(w("input"))},
        ring: ${q(w("ring"))},
        "chart-1": ${q(w("chart-1"))},
        "chart-2": ${q(w("chart-2"))},
        "chart-3": ${q(w("chart-3"))},
        "chart-4": ${q(w("chart-4"))},
        "chart-5": ${q(w("chart-5"))},
        sidebar: {
          DEFAULT: ${q(w("sidebar"))},
          foreground: ${q(w("sidebar-foreground"))},
          primary: ${q(w("sidebar-primary"))},
          "primary-foreground": ${q(w("sidebar-primary-foreground"))},
          accent: ${q(w("sidebar-accent"))},
          "accent-foreground": ${q(w("sidebar-accent-foreground"))},
          border: ${q(w("sidebar-border"))},
          ring: ${q(w("sidebar-ring"))},
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
};`;
}
