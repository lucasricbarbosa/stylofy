"use client";

import type { PaletteKey } from "@/components/theme/theme-context";
import { useThemeColors } from "@/components/theme/theme-context";
import { ColorPickerPopover } from "@/features/theming/components/color-picker-popover";
import { ThemingDrawer } from "@/features/theming/components/theming-drawer";
import { useThemingStore } from "@/features/theming/store";
import type { ShadcnToken, SimpleTokens } from "@/features/theming/types";
import { cn } from "@/lib/utils";
import { oklchToHex } from "@/utils/colors";
import { toolbarItems } from "@/utils/toolbar-items";
import { Paintbrush, Palette } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ColorPickerItem } from "./color-picker-item";
import { FontPicker } from "./font-picker";
import { PaletteExport } from "./palette-export";
import { PresetPicker } from "./preset-picker";

const SHORTCUT_MAP: Record<string, string> = {
  t: "foreground",
  b: "background",
  p: "primary",
  s: "secondary",
  a: "accent",
};

export function Toolbar() {
  const { setActiveToken } = useThemeColors();
  const [isThemingOpen, setIsThemingOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const token = SHORTCUT_MAP[e.key.toLowerCase()];
      if (token) {
        setActiveToken(token as Parameters<typeof setActiveToken>[0]);
      }
      if (e.key === "Escape") {
        setActiveToken(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setActiveToken]);

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
  const [openToken, setOpenToken] = useState<PaletteKey | null>(null);

  const modeTokens = state.activeMode === "light" ? state.light : state.dark;

  const commit = useCallback(
    (oklch: string) => {
      if (!openToken) return;
      dispatch({
        type: "SET_SIMPLE",
        key: openToken as keyof SimpleTokens,
        value: oklch,
      });
    },
    [openToken, dispatch],
  );

  const committedOklch = modeTokens[openToken as ShadcnToken]?.value ?? "";

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
        className="w-auto p-2 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-xl"
      >
        <div className="flex items-center gap-1.5">
          {toolbarItems.colors.map((item) => {
            const hex = oklchToHex(
              modeTokens[item.color as ShadcnToken]?.value ?? "",
            );
            const isActive = openToken === item.color;
            return (
              <button
                key={item.color}
                onClick={() =>
                  setOpenToken(isActive ? null : (item.color as PaletteKey))
                }
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60",
                  isActive && "bg-muted ring-1 ring-border",
                )}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[10px] font-medium text-muted-foreground leading-none">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {openToken && (
          <div className="mt-2">
            <ColorPickerPopover value={committedOklch} onCommit={commit} />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
