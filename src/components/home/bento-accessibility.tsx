"use client";

import { useThemeColors } from "@/components/theme/theme-context";
import { oklchToHex } from "@/utils/colors";

function relLum(hex: string): number {
  const clean = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16));
  const lin = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function wcagContrast(a: string, b: string): number {
  const la = relLum(oklchToHex(a));
  const lb = relLum(oklchToHex(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function rating(ratio: number): { label: string; cls: string } {
  if (ratio >= 7) return { label: "AAA", cls: "bg-accent/20 text-accent-foreground" };
  if (ratio >= 4.5) return { label: "AA", cls: "bg-primary/15 text-primary" };
  if (ratio >= 3) return { label: "AA·LG", cls: "bg-primary/10 text-primary" };
  return { label: "FAIL", cls: "bg-destructive/10 text-destructive" };
}

export function BentoAccessibility() {
  const { colors } = useThemeColors();

  const pairs = [
    { id: "fg/bg", a: colors.foreground, b: colors.background },
    { id: "primary/bg", a: colors.primary, b: colors.background },
    { id: "accent/fg", a: colors.accent, b: colors.foreground },
  ];

  const overallRatio = wcagContrast(colors.foreground, colors.background);
  const overall = rating(overallRatio);

  return (
    <article className="bento-card col-span-6 md:col-span-2">
      {/* Header */}
      <div className="mb-3.5 flex items-center justify-between text-muted-foreground">
        <span className="font-mono text-xs">03 · Accessibility</span>
        <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${overall.cls}`}>
          {overall.label}
        </span>
      </div>

      {/* Color pair swatches */}
      <div className="mb-3 flex overflow-hidden rounded-xl border border-border">
        <div
          className="flex flex-1 items-center justify-center py-5 text-2xl font-medium tracking-[-0.02em]"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Aa
        </div>
        <div
          className="flex flex-1 items-center justify-center py-5 text-2xl font-medium tracking-[-0.02em]"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          Aa
        </div>
        <div
          className="flex flex-1 items-center justify-center py-5 text-2xl font-medium tracking-[-0.02em]"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Aa
        </div>
      </div>

      {/* Contrast grid */}
      <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
        {pairs.map(({ id, a, b }) => {
          const ratio = wcagContrast(a, b);
          const r = rating(ratio);
          return (
            <div
              key={id}
              className="flex flex-col gap-1 rounded-lg border border-border px-2.5 py-2"
            >
              <span className="text-[10px] text-muted-foreground">{id}</span>
              <span className="text-base font-sans font-medium tracking-[-0.01em] text-foreground">
                {ratio.toFixed(2)}
              </span>
              <span className={`self-start rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${r.cls}`}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}
