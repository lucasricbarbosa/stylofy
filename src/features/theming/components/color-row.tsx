"use client";

import { ColorPicker } from "@/components/color-picker/color-picker";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useThemingStore } from "../store";
import type { ShadcnToken } from "../types";

interface ColorRowProps {
  token: ShadcnToken;
  label: string;
}

export function ColorRow({ token, label }: ColorRowProps) {
  const { state, dispatch } = useThemingStore();

  const modeTokens = state.activeMode === "light" ? state.light : state.dark;
  const tokenValue = modeTokens[token];
  const isOverride = tokenValue.source === "override";
  const rawValue = tokenValue.value;

  const commit = useCallback(
    (value: string) => dispatch({ type: "SET_SHADCN_TOKEN", token, value }),
    [dispatch, token],
  );

  const preview = useCallback(
    (oklch: string | null) => {
      document.documentElement.style.setProperty(`--${token}`, oklch ?? rawValue);
    },
    [token, rawValue],
  );

  const handleResetToDerived = useCallback(() => {
    dispatch({ type: "RESET_TOKEN_TO_DERIVED", token });
  }, [dispatch, token]);

  return (
    <div
      className={cn(
        "group flex items-center gap-2.5 px-4 py-2 min-h-[52px] transition-colors hover:bg-muted/40",
        "rounded-lg",
      )}
    >
      <ColorPicker value={rawValue} onCommit={commit} onPreview={preview} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-muted-foreground truncate">
            {label}
          </span>
          {isOverride && (
            <button
              onClick={handleResetToDerived}
              title="Reset to auto-derived value"
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              override
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
