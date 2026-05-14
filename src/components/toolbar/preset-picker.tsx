"use client";

import {
  PALETTE_PRESETS,
  type PalettePreset,
  useThemeColors,
} from "@/components/theme/theme-context";
import { useTheme } from "next-themes";
import { Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function PresetSwatch({ preset, isDark }: { preset: PalettePreset; isDark: boolean }) {
  const palette = isDark ? preset.dark : preset.light;
  const bars = [
    palette.background,
    palette.foreground,
    palette.primary,
    palette.secondary,
    palette.accent,
  ];

  return (
    <div className="flex h-4 w-16 overflow-hidden rounded border border-border/60 shrink-0">
      {bars.map((color, i) => (
        <div key={i} className="flex-1" style={{ background: color }} />
      ))}
    </div>
  );
}

export function PresetPicker() {
  const { applyPreset } = useThemeColors();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60"
          aria-label="Apply preset palette"
        >
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            Presets
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={8} className="min-w-[200px]">
        {PALETTE_PRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <span className="text-sm">{preset.name}</span>
            <PresetSwatch preset={preset} isDark={isDark} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
