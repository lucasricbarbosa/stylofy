"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { buildCssExport } from "../lib/export";
import { useThemingStore } from "../store";
import type { ExportFormat, ModeTheme, TokenValues } from "../types";
import { SHADCN_TOKENS } from "../types";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

const FORMATS: { value: ExportFormat; label: string }[] = [
  { value: "oklch", label: "OKLCH" },
  { value: "hsl", label: "HSL" },
  { value: "rgb", label: "RGB" },
  { value: "hex", label: "HEX" },
];

function modeThemeToTokenValues(mt: ModeTheme): TokenValues {
  const result: Partial<TokenValues> = {};
  for (const t of SHADCN_TOKENS) {
    result[t] = mt[t]?.value ?? "";
  }
  return result as TokenValues;
}

// Lightweight CSS syntax highlighting — ES2017 safe: no lookbehind, no /s flag.
function highlight(css: string): string {
  return css
    .replace(
      /(:root|\.dark)/g,
      '<span style="color:var(--foreground)">$1</span>',
    )
    .replace(
      /(--[\w-]+)(?=\s*:)/g,
      '<span style="color:var(--foreground)">$1</span>',
    )
    .replace(
      /(:\s*)((?:oklch|hsl|rgb)[^;]+)/g,
      '$1<span style="color:var(--foreground)">$2</span>',
    )
    .replace(
      /(:\s*)(#[\da-fA-F]{3,8})/g,
      '$1<span style="color:var(--foreground)">$2</span>',
    )
    .replace(
      /(:\s*)([\d.]+rem)/g,
      '$1<span style="color:var(--foreground)">$2</span>',
    );
}

export function ExportModal({ open, onClose }: ExportModalProps) {
  const { state } = useThemingStore();
  const [format, setFormat] = useState<ExportFormat>("oklch");
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () =>
      buildCssExport(
        modeThemeToTokenValues(state.light),
        modeThemeToTokenValues(state.dark),
        format,
      ),
    [state.light, state.dark, format],
  );

  function handleCopy() {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle>Export Theme CSS</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy and paste into your project&apos;s globals.css
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                    format === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="relative">
          <button
            onClick={handleCopy}
            className={cn(
              "absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              "bg-card border border-border hover:bg-muted",
              copied && "text-emerald-600",
            )}
          >
            {copied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre
            className="overflow-auto max-h-[420px] rounded-lg bg-muted/50 border border-border p-4 text-[11px] font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlight(css) }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
