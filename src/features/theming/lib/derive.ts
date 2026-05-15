import { oklch, parse } from "culori";
import type { ShadcnToken } from "../types";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

// Tokens that are length values, not colors — copy as-is across modes.
const NON_COLOR_TOKENS = new Set<ShadcnToken>(["radius"]);

// Tokens that use alpha transparency in dark mode (border, input in dark).
// For these we handle the derivation specially.
const ALPHA_DARK_TOKENS = new Set<ShadcnToken>(["border", "input", "sidebar-border"]);

/**
 * Given a light-mode OKLCH color string, derive a sensible dark-mode counterpart.
 *
 * Strategy: flip lightness around 0.5 (1 - L), clamp to avoid pure black/white,
 * slightly damp chroma for near-achromatic values, preserve hue.
 *
 * This is a pure function with no side effects — it is testable in isolation.
 */
export function deriveDarkFromLight(lightColor: string, token?: ShadcnToken): string {
  if (token && NON_COLOR_TOKENS.has(token)) return lightColor;

  // Border/input in dark mode are conventionally semi-transparent white.
  if (token && ALPHA_DARK_TOKENS.has(token)) return "oklch(1 0 0 / 10%)";

  const parsed = parse(lightColor);
  if (!parsed) return lightColor;
  const ok = oklch(parsed);
  if (!ok || ok.l === undefined) return lightColor;

  const l = ok.l;
  const c = ok.c ?? 0;
  const h = ok.h != null && !isNaN(ok.h) ? ok.h : 0;
  const alpha = ok.alpha ?? 1;

  // Flip lightness and clamp to keep colors away from absolute extremes.
  const newL = clamp(1 - l, 0.05, 0.95);

  // Damp chroma slightly for colors that were very light (become dark) to
  // prevent garish saturation in dark surfaces.
  const dampFactor = l > 0.85 ? 0.75 : l < 0.15 ? 0.9 : 1.0;
  const newC = c * dampFactor;

  const alphaStr = alpha < 1 ? ` / ${(alpha * 100).toFixed(0)}%` : "";
  return `oklch(${newL.toFixed(4)} ${newC.toFixed(4)} ${h.toFixed(2)}${alphaStr})`;
}

/**
 * Inverse of deriveDarkFromLight — same operation since flipping is symmetric.
 */
export function deriveLightFromDark(darkColor: string, token?: ShadcnToken): string {
  if (token && NON_COLOR_TOKENS.has(token)) return darkColor;
  return deriveDarkFromLight(darkColor, token);
}
