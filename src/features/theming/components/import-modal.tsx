"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { parseCssImport } from "../lib/export";
import { SHADCN_DARK_DEFAULTS, SHADCN_LIGHT_DEFAULTS } from "../lib/defaults";
import { useThemingStore } from "../store";
import type { ModeTheme, TokenValues } from "../types";
import { SHADCN_TOKENS } from "../types";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
}

function tokenValuesToModeTheme(tv: TokenValues): ModeTheme {
  const result: Partial<ModeTheme> = {};
  for (const t of SHADCN_TOKENS) {
    result[t] = { value: tv[t], source: "override" as const };
  }
  return result as ModeTheme;
}

export function ImportModal({ open, onClose }: ImportModalProps) {
  const { dispatch } = useThemingStore();
  const [css, setCss] = useState("");
  const [error, setError] = useState("");

  function handleImport() {
    setError("");
    try {
      const { light, dark } = parseCssImport(css);
      if (!Object.keys(light).length && !Object.keys(dark).length) {
        setError("No valid shadcn tokens found. Paste a :root { } and/or .dark { } block.");
        return;
      }
      const mergedLight = { ...SHADCN_LIGHT_DEFAULTS, ...light } as TokenValues;
      const mergedDark = { ...SHADCN_DARK_DEFAULTS, ...dark } as TokenValues;
      dispatch({
        type: "APPLY_PRESET",
        preset: {
          name: "Imported",
          description: "",
          level: "advanced",
          simple: {
            foreground: mergedLight.foreground,
            background: mergedLight.background,
            primary: mergedLight.primary,
            secondary: mergedLight.secondary,
            accent: mergedLight.accent,
          },
          light: tokenValuesToModeTheme(mergedLight),
          dark: tokenValuesToModeTheme(mergedDark),
        },
      });
      setCss("");
      onClose();
    } catch {
      setError("Failed to parse CSS. Make sure it contains valid custom property declarations.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Theme CSS</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Paste a shadcn CSS block with :root and/or .dark declarations.
          </p>
        </DialogHeader>

        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          placeholder={`:root {\n  --background: oklch(1 0 0);\n  --primary: oklch(0.205 0 0);\n  /* ... */\n}\n\n.dark {\n  --background: oklch(0.145 0 0);\n  /* ... */\n}`}
          rows={12}
          className="w-full rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />

        {error && <p className="text-xs text-destructive">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!css.trim()}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Import
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
