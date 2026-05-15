import { formatHex, hsl, oklch, parse, rgb } from "culori";

export function toHex(color: string): string {
  const parsed = parse(color);
  if (!parsed) return "#ffffff";
  return formatHex(parsed) ?? "#ffffff";
}

export function toOklch(color: string): string {
  const parsed = parse(color);
  if (!parsed) return "oklch(1 0 0)";
  const ok = oklch(parsed);
  if (!ok) return "oklch(1 0 0)";
  const l = ok.l ?? 1;
  const c = ok.c ?? 0;
  const h = ok.h != null && !isNaN(ok.h) ? ok.h : 0;
  const alpha = ok.alpha != null && ok.alpha < 1 ? ` / ${(ok.alpha * 100).toFixed(0)}%` : "";
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)}${alpha})`;
}

export function toHsl(color: string): string {
  const parsed = parse(color);
  if (!parsed) return "hsl(0 0% 100%)";
  const h = hsl(parsed);
  if (!h) return "hsl(0 0% 100%)";
  const hue = Math.round(h.h ?? 0);
  const sat = (h.s * 100).toFixed(1);
  const light = (h.l * 100).toFixed(1);
  const alpha = h.alpha != null && h.alpha < 1 ? ` / ${(h.alpha * 100).toFixed(0)}%` : "";
  return `hsl(${hue} ${sat}% ${light}%${alpha})`;
}

export function toRgb(color: string): string {
  const parsed = parse(color);
  if (!parsed) return "rgb(255 255 255)";
  const r = rgb(parsed);
  if (!r) return "rgb(255 255 255)";
  const rv = Math.round((r.r ?? 1) * 255);
  const gv = Math.round((r.g ?? 1) * 255);
  const bv = Math.round((r.b ?? 1) * 255);
  const alpha = r.alpha != null && r.alpha < 1 ? ` / ${(r.alpha * 100).toFixed(0)}%` : "";
  return `rgb(${rv} ${gv} ${bv}${alpha})`;
}

export type ColorFormat = "oklch" | "hsl" | "rgb" | "hex";

export function convertColor(color: string, format: ColorFormat): string {
  if (format === "oklch") return toOklch(color);
  if (format === "hsl") return toHsl(color);
  if (format === "rgb") return toRgb(color);
  return toHex(color);
}

export function isValidColor(color: string): boolean {
  return parse(color) != null;
}

export function getOklchComponents(color: string): { l: number; c: number; h: number; alpha: number } {
  const parsed = parse(color);
  if (!parsed) return { l: 1, c: 0, h: 0, alpha: 1 };
  const ok = oklch(parsed);
  if (!ok) return { l: 1, c: 0, h: 0, alpha: 1 };
  return {
    l: ok.l ?? 1,
    c: ok.c ?? 0,
    h: ok.h != null && !isNaN(ok.h) ? ok.h : 0,
    alpha: ok.alpha ?? 1,
  };
}
