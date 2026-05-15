"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toHex } from "../lib/oklch";
import { useContrastReport } from "../hooks/useContrastReport";
import { useThemingStore } from "../store";

interface ContrastModalProps {
  open: boolean;
  onClose: () => void;
}

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold",
        pass
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      )}
    >
      {label}
    </span>
  );
}

export function ContrastModal({ open, onClose }: ContrastModalProps) {
  const { state } = useThemingStore();
  const { results } = useContrastReport();
  const modeTokens = state.activeMode === "light" ? state.light : state.dark;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Contrast Report</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Editing: {state.activeMode} mode · WCAG 2.1 relative luminance
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
          {results.map((r) => {
            const bgHex = toHex(modeTokens[r.bg].value);
            const fgHex = toHex(modeTokens[r.fg].value);
            return (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
              >
                <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-border">
                  <div className="absolute inset-0" style={{ backgroundColor: bgHex }} />
                  <div className="absolute inset-[30%] rounded-sm" style={{ backgroundColor: fgHex }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{r.label}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    --{r.fg} / --{r.bg}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs font-mono font-semibold w-10 text-right">
                    {r.ratio.toFixed(2)}
                  </span>
                  <Badge pass={r.passAA} label="AA" />
                  <Badge pass={r.passAAA} label="AAA" />
                  <Badge pass={r.passAALarge} label="AALg" />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground border-t border-border pt-2 mt-1">
          AA requires ≥4.5:1 · AAA requires ≥7:1 · AA Large (text ≥18pt/14pt bold) requires ≥3:1
        </p>
      </DialogContent>
    </Dialog>
  );
}
