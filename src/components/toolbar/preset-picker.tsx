"use client";

import { PALETTE_PRESETS, useThemeColors } from "@/components/theme/theme-context";
import { Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function PresetPicker() {
  const { applyPreset } = useThemeColors();

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
      <DropdownMenuContent align="center" sideOffset={8}>
        {PALETTE_PRESETS.map((preset) => (
          <DropdownMenuItem key={preset.name} onClick={() => applyPreset(preset)}>
            {preset.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
