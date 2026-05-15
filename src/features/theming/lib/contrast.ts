import type { ContrastPair, ContrastResult, TokenValues } from "../types";
import { toHex } from "./oklch";

function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const channels = [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(color1: string, color2: string): number {
  const hex1 = toHex(color1);
  const hex2 = toHex(color2);
  if (!hex1 || !hex2) return 1;
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function wcagResult(ratio: number) {
  return {
    passAA: ratio >= 4.5,
    passAAA: ratio >= 7.0,
    passAALarge: ratio >= 3.0,
  };
}

export const CONTRAST_PAIRS: ContrastPair[] = [
  { fg: "foreground", bg: "background", label: "Text on Background" },
  { fg: "primary-foreground", bg: "primary", label: "Primary Button" },
  { fg: "secondary-foreground", bg: "secondary", label: "Secondary" },
  { fg: "muted-foreground", bg: "muted", label: "Muted Text" },
  { fg: "accent-foreground", bg: "accent", label: "Accent" },
  { fg: "card-foreground", bg: "card", label: "Card" },
  { fg: "popover-foreground", bg: "popover", label: "Popover" },
  { fg: "foreground", bg: "muted", label: "Body on Muted" },
  { fg: "sidebar-foreground", bg: "sidebar", label: "Sidebar" },
  { fg: "sidebar-primary-foreground", bg: "sidebar-primary", label: "Sidebar Primary" },
  { fg: "sidebar-accent-foreground", bg: "sidebar-accent", label: "Sidebar Accent" },
  { fg: "foreground", bg: "card", label: "Text on Card" },
];

export function computeContrastReport(tokens: TokenValues): ContrastResult[] {
  return CONTRAST_PAIRS.map((pair) => {
    const ratio = contrastRatio(tokens[pair.fg], tokens[pair.bg]);
    return { ...pair, ratio, ...wcagResult(ratio) };
  });
}

export function countFailingAA(results: ContrastResult[]): number {
  return results.filter((r) => !r.passAA).length;
}
