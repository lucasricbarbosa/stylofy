"use client";

import { type Palette, type PaletteKey, useThemeColors } from "@/components/theme/theme-context";
import { useState } from "react";

type Fmt = "css" | "tailwind" | "json";

const TOKENS: { key: PaletteKey; label: string }[] = [
  { key: "background", label: "--background" },
  { key: "foreground", label: "--foreground " },
  { key: "primary",    label: "--primary    " },
  { key: "secondary",  label: "--secondary  " },
  { key: "accent",     label: "--accent     " },
];

function buildText(fmt: Fmt, colors: Palette): string {
  if (fmt === "css") {
    const lines = TOKENS.map(({ key, label }) => `  ${label}: ${colors[key]};`);
    return `:root {\n${lines.join("\n")}\n}`;
  }
  if (fmt === "tailwind") {
    const lines = TOKENS.map(({ key }) => `    ${key}: "${colors[key]}",`);
    return `theme: {\n  colors: {\n${lines.join("\n")}\n  }\n}`;
  }
  const lines = TOKENS.map(({ key }, i) => `  "${key}": "${colors[key]}"${i < TOKENS.length - 1 ? "," : ""}`);
  return `{\n${lines.join("\n")}\n}`;
}

export function BentoExport() {
  const [fmt, setFmt] = useState<Fmt>("css");
  const [copied, setCopied] = useState(false);
  const { colors } = useThemeColors();

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildText(fmt, colors));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <article className="bento-card col-span-6" id="export">
      {/* Header */}
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">04 · Export</span>
        <div className="flex gap-1">
          {(["css", "tailwind", "json"] as Fmt[]).map((f) => (
            <button
              key={f}
              onClick={() => setFmt(f)}
              className={`rounded-md border px-2 py-1 font-mono text-[11px] transition-colors ${
                fmt === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Code block */}
      <pre className="overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-[12px] leading-[1.7] text-muted-foreground">
        <CodeView fmt={fmt} colors={colors} />
      </pre>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground/60">
          5 tokens · {buildText(fmt, colors).length} bytes
        </span>
        <button
          onClick={copy}
          className="rounded-[7px] border border-border bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </article>
  );
}

function CodeView({ fmt, colors }: { fmt: Fmt; colors: Palette }) {
  if (fmt === "css") {
    return (
      <>
        <span className="text-muted-foreground/50">:root</span>
        {" {\n"}
        {TOKENS.map(({ key, label }) => (
          <span key={key}>
            {"  "}
            <span className="text-foreground">{label}</span>
            {": "}
            <span style={{ color: `var(--${key})` }}>{colors[key]}</span>
            {";\n"}
          </span>
        ))}
        {"}"}
      </>
    );
  }

  if (fmt === "tailwind") {
    return (
      <>
        <span className="text-muted-foreground/50">theme</span>
        {": {\n  "}
        <span className="text-foreground">colors</span>
        {": {\n"}
        {TOKENS.map(({ key }) => (
          <span key={key}>
            {"    "}
            <span className="text-foreground">{key}</span>
            {': "'}
            <span style={{ color: `var(--${key})` }}>{colors[key]}</span>
            {'",\n'}
          </span>
        ))}
        {"  }\n}"}
      </>
    );
  }

  return (
    <>
      {"{\n"}
      {TOKENS.map(({ key }, i) => (
        <span key={key}>
          {"  "}
          <span className="text-foreground">{`"${key}"`}</span>
          {': "'}
          <span style={{ color: `var(--${key})` }}>{colors[key]}</span>
          {`"${i < TOKENS.length - 1 ? "," : ""}\n`}
        </span>
      ))}
      {"}"}
    </>
  );
}
