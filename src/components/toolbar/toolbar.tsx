"use client";

import { ColorPicker } from "@/components/color-picker/color-picker";
import { ThemingDrawer } from "@/features/theming/components/theming-drawer";
import { deriveShadcnTokens } from "@/features/theming/lib/derive-shadcn";
import { useThemingStore } from "@/features/theming/store";
import type { ShadcnToken, SimpleTokens } from "@/features/theming/types";
import { cn } from "@/lib/utils";
import { toolbarItems } from "@/utils/toolbar-items";
import { Paintbrush, Palette } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ColorPickerItem } from "./color-picker-item";
import { FontPicker } from "./font-picker";
import { PaletteExport } from "./palette-export";
import { PresetPicker } from "./preset-picker";

export function Toolbar() {
  const [isThemingOpen, setIsThemingOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-xl shadow-black/10 dark:shadow-black/40">
        {/* Desktop: inline color pickers */}
        <div className="hidden md:flex items-center gap-1.5">
          {toolbarItems.colors.map((item) => (
            <ColorPickerItem
              key={item.name}
              color={item.color}
              name={item.name}
              shortcut={item.shortcut}
            />
          ))}
        </div>

        {/* Mobile: collapsed colors dropdown */}
        <div className="flex md:hidden">
          <ColorsDropdown />
        </div>

        <div className="w-px h-6 bg-border mx-0.5" />
        <FontPicker />
        <PresetPicker />
        <PaletteExport />
        <div className="sm:flex hidden">
          <ThemeToggle />
        </div>

        <div className="w-px h-6 bg-border mx-0.5" />
        <button
          onClick={() => setIsThemingOpen((prev) => !prev)}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60",
            isThemingOpen && "bg-muted ring-1 ring-border",
          )}
          aria-label="Open theme editor"
        >
          <Paintbrush className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            Theme
          </span>
        </button>
      </div>

      <ThemingDrawer
        open={isThemingOpen}
        onClose={() => setIsThemingOpen(false)}
      />
    </div>
  );
}

function ColorsDropdown() {
  const { state, dispatch } = useThemingStore();
  const modeTokens = state.activeMode === "light" ? state.light : state.dark;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60"
          aria-label="Open color pickers"
        >
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            Colors
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        className="w-auto p-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-xl"
      >
        <div className="flex flex-col gap-2">
          {toolbarItems.colors.map((item) => {
            const committedOklch = modeTokens[item.color as ShadcnToken]?.value ?? "";
            return (
              <div key={item.color} className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-muted-foreground w-20 shrink-0">
                  {item.name}
                </span>
                <ColorPicker
                  value={committedOklch}
                  onCommit={(oklch) =>
                    dispatch({
                      type: "SET_SIMPLE",
                      key: item.color as keyof SimpleTokens,
                      value: oklch,
                    })
                  }
                  onPreview={(oklch) => {
                    const freshTokens = deriveShadcnTokens(
                      { ...state.simple, [item.color]: oklch },
                      state.activeMode,
                    );
                    const root = document.documentElement;
                    for (const t of Object.keys(freshTokens) as ShadcnToken[]) {
                      root.style.setProperty(`--${t}`, freshTokens[t].value);
                    }
                  }}
                  showTailwindPalette={false}
                />
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
