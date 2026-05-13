import { formatHex, oklch, parse } from "culori";

export function oklchToHex(oklchColor: string): string {
  const parsed = parse(oklchColor);
  if (!parsed) return "#ffffff";
  return formatHex(parsed);
}

type PaletteRole = "foreground" | "background" | "primary" | "secondary" | "accent";

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/**
 * Derives an equivalent color for the target theme by adjusting OKLCH lightness.
 * Background/foreground/secondary are aggressively inverted; primary/accent are
 * clamped to stay accessible without dramatically changing the chosen hue.
 */
export function adaptColorForTheme(
  colorStr: string,
  targetIsDark: boolean,
  role: PaletteRole,
): string {
  const parsed = parse(colorStr);
  if (!parsed) return colorStr;

  const ok = oklch(parsed);
  if (!ok || ok.l === undefined) return colorStr;

  const l = ok.l;
  const c = ok.c ?? 0;
  const h = ok.h != null && !isNaN(ok.h) ? ok.h : 0;

  let newL: number;

  switch (role) {
    case "background":
      newL = targetIsDark ? clamp(1 - l, 0.05, 0.20) : clamp(1 - l, 0.85, 0.99);
      break;
    case "foreground":
      newL = targetIsDark ? clamp(1 - l, 0.85, 0.97) : clamp(1 - l, 0.05, 0.20);
      break;
    case "secondary":
      newL = targetIsDark ? clamp(1 - l, 0.10, 0.25) : clamp(1 - l, 0.85, 0.97);
      break;
    case "primary":
    case "accent":
      // Keep hue and chroma; clamp lightness to an accessible range per theme.
      newL = targetIsDark ? clamp(l, 0.42, 0.80) : clamp(l, 0.30, 0.75);
      break;
    default:
      newL = l;
  }

  return `oklch(${newL.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}
