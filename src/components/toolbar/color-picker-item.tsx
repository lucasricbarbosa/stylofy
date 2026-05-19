"use client";

import { ColorPicker } from "@/components/color-picker/color-picker";
import { deriveShadcnTokens } from "@/features/theming/lib/derive-shadcn";
import { useThemingStore } from "@/features/theming/store";
import type { ShadcnToken, SimpleTokens } from "@/features/theming/types";
import { useCallback } from "react";

interface ColorPickerItemProps {
  name: string;
  color: string;
  shortcut?: string;
}

export function ColorPickerItem({ color, name, shortcut }: ColorPickerItemProps) {
  const { state, dispatch } = useThemingStore();

  const modeTokens = state.activeMode === "light" ? state.light : state.dark;
  const committedOklch = modeTokens[color as ShadcnToken]?.value ?? "";

  const commit = useCallback(
    (oklch: string) =>
      dispatch({
        type: "SET_SIMPLE",
        key: color as keyof SimpleTokens,
        value: oklch,
      }),
    [dispatch, color],
  );

  const preview = useCallback(
    (oklch: string | null) => {
      const root = document.documentElement;
      if (oklch === null) {
        // Revert all tokens to committed values
        for (const t of Object.keys(modeTokens) as ShadcnToken[]) {
          root.style.setProperty(`--${t}`, modeTokens[t].value);
        }
        return;
      }
      const freshTokens = deriveShadcnTokens(
        { ...state.simple, [color]: oklch },
        state.activeMode,
      );
      for (const t of Object.keys(freshTokens) as ShadcnToken[]) {
        root.style.setProperty(`--${t}`, freshTokens[t].value);
      }
    },
    [color, state.simple, state.activeMode, modeTokens],
  );

  return (
    <div className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl hover:bg-muted/60 transition-all duration-150">
      <ColorPicker
        value={committedOklch}
        onCommit={commit}
        onPreview={preview}
        showTailwindPalette={false}
      />
      <span className="text-[10px] font-medium text-muted-foreground leading-none">
        {name}
      </span>
      {shortcut && (
        <span className="text-[9px] text-muted-foreground/60 leading-none">{shortcut}</span>
      )}
    </div>
  );
}
