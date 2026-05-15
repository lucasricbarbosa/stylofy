import { formatHex, parse } from "culori";

export function oklchToHex(oklchColor: string): string {
  const parsed = parse(oklchColor);
  if (!parsed) return "#ffffff";
  return formatHex(parsed);
}

/**
 * Derives an equivalent color for the target theme by adjusting OKLCH lightness.
 * Background/foreground/secondary are aggressively inverted; primary/accent are
 * clamped to stay accessible without dramatically changing the chosen hue.
 */
