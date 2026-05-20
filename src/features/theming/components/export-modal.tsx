"use client";

import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
  generateV3IndexCss,
  generateV3TailwindConfig,
  generateV4IndexCss,
} from "../lib/tailwind-export";
import { useThemingStore } from "../store";
import type { ExportFormat, ModeTheme, TokenValues } from "../types";
import { SHADCN_TOKENS } from "../types";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

type TailwindVersion = "v3" | "v4";

const VERSIONS: { value: TailwindVersion; label: string }[] = [
  { value: "v4", label: "Tailwind v4" },
  { value: "v3", label: "Tailwind v3" },
];

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

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="flex w-fit items-center gap-0.5 p-1 rounded-lg bg-muted"
      role="tablist"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-3 py-1 rounded-md text-xs font-medium transition-colors select-none",
            value === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ExportModal({ open, onClose }: ExportModalProps) {
  const { state } = useThemingStore();
  const [version, setVersion] = useState<TailwindVersion>("v4");
  const [format, setFormat] = useState<ExportFormat>("oklch");
  const [activeFile, setActiveFile] = useState("index.css");

  const files =
    version === "v4" ? ["index.css"] : ["index.css", "tailwind.config.ts"];

  const availableFormats =
    version === "v3" ? FORMATS.filter((f) => f.value !== "oklch") : FORMATS;

  function handleVersionChange(v: TailwindVersion) {
    setVersion(v);
    setActiveFile("index.css");
    if (v === "v3" && format === "oklch") setFormat("hsl");
  }

  const light = useMemo(
    () => modeThemeToTokenValues(state.light),
    [state.light],
  );
  const dark = useMemo(() => modeThemeToTokenValues(state.dark), [state.dark]);

  const code = useMemo(() => {
    if (version === "v4") return generateV4IndexCss(light, dark, format);
    if (activeFile === "tailwind.config.ts")
      return generateV3TailwindConfig(format);
    return generateV3IndexCss(light, dark, format);
  }, [version, format, activeFile, light, dark]);

  const language: "css" | "typescript" =
    activeFile === "tailwind.config.ts" ? "typescript" : "css";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-3xl sm:w-full p-0 gap-0 overflow-hidden">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-4 pr-7 mb-4">
            <div>
              <DialogTitle className="text-base">Export Theme CSS</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Copy these files into your project to apply your theme.
              </p>
            </div>
          </div>

          {/* ── Selectors row ──────────────────────────────────────────── */}
          <div className="flex sm:items-center gap-2.5 sm:flex-row flex-col">
            <PillGroup
              options={VERSIONS}
              value={version}
              onChange={handleVersionChange}
            />
            <div className="w-px sm:block hidden h-5 bg-border" />
            <PillGroup
              options={availableFormats}
              value={format}
              onChange={setFormat}
            />
          </div>
        </div>

        {/* ── File tabs ──────────────────────────────────────────────────── */}
        <div className="flex items-end gap-0 px-6 pt-0 border-b border-border bg-muted/30">
          {files.map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={cn(
                "px-3 py-2.5 text-[11.5px] font-mono transition-colors border-b-2 -mb-px",
                activeFile === file
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground",
              )}
            >
              {file}
            </button>
          ))}
        </div>

        {/* ── Code block ─────────────────────────────────────────────────── */}
        <div className="p-5">
          <CodeBlock code={code} language={language}>
            <CodeBlockCopyButton />
          </CodeBlock>
        </div>
      </DialogContent>
    </Dialog>
  );
}
