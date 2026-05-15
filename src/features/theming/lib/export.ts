import type { ExportFormat, ShadcnToken, TokenValues } from "../types";
import { SHADCN_TOKENS } from "../types";
import { convertColor, toOklch } from "./oklch";

// Radius is a length value, not a color — never convert it.
const RADIUS_TOKEN: ShadcnToken = "radius";

function formatValue(value: string, format: ExportFormat, token: ShadcnToken): string {
  if (token === RADIUS_TOKEN) return value;
  if (!value || value.trim() === "") return value;
  return convertColor(value, format);
}

function buildBlock(label: string, values: TokenValues, format: ExportFormat): string {
  const lines = SHADCN_TOKENS.map((token) => {
    const value = formatValue(values[token], format, token);
    return `  --${token}: ${value};`;
  });
  return `${label} {\n${lines.join("\n")}\n}`;
}

export function buildCssExport(light: TokenValues, dark: TokenValues, format: ExportFormat): string {
  const rootBlock = buildBlock(":root", light, format);
  const darkBlock = buildBlock(".dark", dark, format);
  return `${rootBlock}\n\n${darkBlock}`;
}

export function parseCssImport(css: string): { light: Partial<TokenValues>; dark: Partial<TokenValues> } {
  const light: Partial<TokenValues> = {};
  const dark: Partial<TokenValues> = {};

  // Matches CSS blocks: :root { ... } or .dark { ... }
  const blockRe = /(?::root|\.dark)\s*\{([^}]*)\}/g;
  const propRe = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;

  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(css)) !== null) {
    const isDark = css.slice(0, match.index).includes(".dark") ||
      match[0].trimStart().startsWith(".dark");
    const block = match[1];
    const target = isDark ? dark : light;

    let prop: RegExpExecArray | null;
    propRe.lastIndex = 0;
    while ((prop = propRe.exec(block)) !== null) {
      const token = prop[1] as ShadcnToken;
      const value = prop[2].trim();
      if (SHADCN_TOKENS.includes(token as ShadcnToken)) {
        (target as Record<string, string>)[token] = toOklch(value) !== "oklch(1 0 0)" ? toOklch(value) : value;
      }
    }
  }

  return { light, dark };
}

// Simple CSS syntax highlighter — returns HTML string with spans.
export function highlightCss(css: string): string {
  return css
    .replace(/\/\*[^*]*\*\//g, (m) => `<span class="token-comment">${m}</span>`)
    .replace(/(--[\w-]+)/g, `<span class="token-prop">$1</span>`)
    .replace(/(:root|\.dark)/g, `<span class="token-selector">$1</span>`)
    .replace(/:\s*(oklch|hsl|rgb|#[\da-fA-F]{3,8}|[\d.]+rem)/g, (m, val) =>
      m.replace(val, `<span class="token-value">${val}</span>`)
    );
}
