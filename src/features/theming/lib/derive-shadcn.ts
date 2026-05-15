import { oklch, parse } from "culori";
import type {
  ModeTheme,
  ShadcnToken,
  SimpleTokens,
  ThemeMode,
  TokenValue,
} from "../types";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function autoContrast(bgColor: string): string {
  const parsed = parse(bgColor);
  if (!parsed) return "oklch(0.985 0 0)";
  const ok = oklch(parsed);
  if (!ok) return "oklch(0.985 0 0)";
  return (ok.l ?? 0.5) < 0.5 ? "oklch(0.985 0 0)" : "oklch(0.145 0 0)";
}

function shiftLightness(color: string, delta: number): string {
  const parsed = parse(color);
  if (!parsed) return color;
  const ok = oklch(parsed);
  if (!ok) return color;
  const l = clamp((ok.l ?? 0) + delta, 0, 1);
  const c = ok.c ?? 0;
  const h = ok.h != null && !isNaN(ok.h) ? ok.h : 0;
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}

function oklchBlend(from: string, to: string, t: number): string {
  const fp = parse(from);
  const tp = parse(to);
  if (!fp || !tp) return from;
  const f = oklch(fp);
  const tr = oklch(tp);
  if (!f || !tr) return from;
  const fl = f.l ?? 0;
  const tl = tr.l ?? 1;
  const fc = f.c ?? 0;
  const tc = tr.c ?? 0;
  const fh = f.h != null && !isNaN(f.h) ? f.h : 0;
  const th = tr.h != null && !isNaN(tr.h) ? tr.h : 0;
  let dh = th - fh;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const l = fl + t * (tl - fl);
  const c = fc + t * (tc - fc);
  const h = (fh + t * dh + 360) % 360;
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}

function hueRotate(color: string, degrees: number): string {
  const parsed = parse(color);
  if (!parsed) return color;
  const ok = oklch(parsed);
  if (!ok) return color;
  const l = ok.l ?? 0.5;
  const c = ok.c ?? 0;
  const h = ((ok.h ?? 0) + degrees + 360) % 360;
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(2)})`;
}

function d(value: string): TokenValue {
  return { value, source: "derived" };
}

const DEFAULT_RADIUS = "0.625rem";
const DESTRUCTIVE = "oklch(0.577 0.245 27.325)";

export function deriveShadcnTokens(
  simple: SimpleTokens,
  mode: ThemeMode,
  existing?: ModeTheme,
): ModeTheme {
  const s = simple;

  // Border is slightly darker in light mode, slightly lighter in dark mode
  const borderDelta = mode === "dark" ? 0.08 : -0.08;
  const border = shiftLightness(s.background, borderDelta);
  const chart1 = s.accent;

  const result: Record<string, TokenValue> = {
    background: d(s.background),
    foreground: d(s.foreground),
    card: d(s.background),
    "card-foreground": d(s.foreground),
    popover: d(s.background),
    "popover-foreground": d(s.foreground),
    primary: d(s.primary),
    "primary-foreground": d(autoContrast(s.primary)),
    secondary: d(s.secondary),
    "secondary-foreground": d(autoContrast(s.secondary)),
    muted: d(s.secondary),
    "muted-foreground": d(oklchBlend(s.foreground, s.background, 0.45)),
    accent: d(s.accent),
    "accent-foreground": d(autoContrast(s.accent)),
    destructive: d(DESTRUCTIVE),
    border: d(border),
    input: d(border),
    ring: d(s.primary),
    "chart-1": d(chart1),
    "chart-2": d(hueRotate(chart1, 30)),
    "chart-3": d(hueRotate(chart1, 60)),
    "chart-4": d(hueRotate(chart1, 90)),
    "chart-5": d(hueRotate(chart1, 120)),
    radius: d(existing?.radius?.value ?? DEFAULT_RADIUS),
    sidebar: d(s.background),
    "sidebar-foreground": d(s.foreground),
    "sidebar-primary": d(s.primary),
    "sidebar-primary-foreground": d(autoContrast(s.primary)),
    "sidebar-accent": d(s.accent),
    "sidebar-accent-foreground": d(autoContrast(s.accent)),
    "sidebar-border": d(border),
    "sidebar-ring": d(s.primary),
  };

  // Preserve any existing overrides
  if (existing) {
    for (const token of Object.keys(existing) as ShadcnToken[]) {
      if (existing[token]?.source === "override") {
        result[token] = existing[token];
      }
    }
  }

  return result as ModeTheme;
}
