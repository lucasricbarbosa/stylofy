"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  Dices,
  Redo2,
  RotateCcw,
  Undo2,
  Upload,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useContrastReport } from "../hooks/useContrastReport";
import { useLocalThemes } from "../hooks/useLocalThemes";
import { buildCssExport } from "../lib/export";
import { generateRandomTheme } from "../lib/presets";
import { useThemingStore } from "../store";
import type { ModeTheme, TokenValues } from "../types";
import { ContrastModal } from "./contrast-modal";
import { ExportModal } from "./export-modal";
import { HoldToSaveButton } from "./hold-to-save-button";
import { ImportModal } from "./import-modal";
import { ModeToggle } from "./mode-toggle";
import { ThemeSelector } from "./theme-selector";

function modeThemeToTokenValues(mt: ModeTheme): TokenValues {
  const result: Record<string, string> = {};
  for (const k of Object.keys(mt)) {
    result[k] = mt[k as keyof ModeTheme].value;
  }
  return result as TokenValues;
}

export function ActionBar() {
  const { state, dispatch, canUndo, canRedo } = useThemingStore();
  const { failCount } = useContrastReport();
  const { addTheme } = useLocalThemes();

  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showContrast, setShowContrast] = useState(false);

  const handleSaveTheme = useCallback(
    (name: string) => {
      addTheme(
        name,
        modeThemeToTokenValues(state.light),
        modeThemeToTokenValues(state.dark),
      );
    },
    [addTheme, state.light, state.dark],
  );

  const handleCopy = useCallback(() => {
    const light = modeThemeToTokenValues(state.light);
    const dark = modeThemeToTokenValues(state.dark);
    const css = buildCssExport(light, dark, "oklch");
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [state.light, state.dark]);

  const handleRandom = useCallback(() => {
    const { light, dark } = generateRandomTheme();
    const toLegacyModeTheme = (tv: TokenValues): ModeTheme => {
      const result: Record<string, { value: string; source: "override" }> = {};
      for (const k of Object.keys(tv)) {
        result[k] = { value: tv[k as keyof TokenValues], source: "override" };
      }
      return result as ModeTheme;
    };
    dispatch({
      type: "APPLY_PRESET",
      preset: {
        name: "Random",
        description: "",
        level: "advanced",
        simple: {
          foreground: light.foreground,
          background: light.background,
          primary: light.primary,
          secondary: light.secondary,
          accent: light.accent,
        },
        light: toLegacyModeTheme(light),
        dark: toLegacyModeTheme(dark),
      },
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 p-3 border-b border-border/60">
      {/* Primary row: copy + undo/redo + reset */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleCopy}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all",
            "bg-primary text-primary-foreground hover:opacity-90",
            copied && "bg-emerald-500 text-white",
          )}
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copied!" : "Copy CSS"}
        </button>

        <IconBtn
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo2 className="size-3.5" />
        </IconBtn>
        <IconBtn
          onClick={() => dispatch({ type: "REDO" })}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo2 className="size-3.5" />
        </IconBtn>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <IconBtn title="Reset to derived">
              <RotateCcw className="size-3.5" />
            </IconBtn>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset theme?</AlertDialogTitle>
              <AlertDialogDescription>
                This resets all manually-overridden tokens in the active mode
                back to auto-derived values.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => dispatch({ type: "RESET_ALL_TO_DERIVED" })}
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Mode toggle */}
      <ModeToggle />

      {/* Secondary row: themes, import, random, contrast, export */}
      <div className="flex flex-wrap items-center gap-1.5">
        <ThemeSelector onExportTheme={() => {}} />

        <IconTextBtn
          onClick={() => setShowImport(true)}
          icon={<Upload className="size-3" />}
        >
          Import
        </IconTextBtn>

        <IconTextBtn onClick={handleRandom} icon={<Dices className="size-3" />}>
          Random
        </IconTextBtn>

        <button
          onClick={() => setShowContrast(true)}
          className="relative flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Contrast
          {failCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-destructive text-[9px] font-bold text-white">
              {failCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setShowExport(true)}
          className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Export
        </button>
      </div>

      {/* Save row */}
      <HoldToSaveButton onSave={handleSaveTheme} />

      <ExportModal open={showExport} onClose={() => setShowExport(false)} />
      <ImportModal open={showImport} onClose={() => setShowImport(false)} />
      <ContrastModal
        open={showContrast}
        onClose={() => setShowContrast(false)}
      />
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-lg border border-border transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "disabled:opacity-40 disabled:pointer-events-none",
      )}
    >
      {children}
    </button>
  );
}

function IconTextBtn({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      {icon}
      {children}
    </button>
  );
}
