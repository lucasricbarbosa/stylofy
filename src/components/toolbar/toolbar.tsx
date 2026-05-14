"use client";

import ColorPicker from "@/components/color-picker/color-picker";
import { useThemeColors } from "@/components/theme/theme-context";
import type { PaletteKey } from "@/components/theme/theme-context";
import { cn } from "@/lib/utils";
import { oklchToHex } from "@/utils/colors";
import { toolbarItems } from "@/utils/toolbar-items";
import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
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
        <ThemeToggle />
      </div>
    </div>
  );
}

function ColorsDropdown() {
  const { colors, updateColor, isReady } = useThemeColors();
  const [openToken, setOpenToken] = useState<PaletteKey | null>(null);

  const currentHex = openToken ? oklchToHex(colors[openToken]) : "#000000";
  const contrastPartner =
    openToken === "foreground"
      ? colors["background"]
      : openToken === "background"
      ? colors["foreground"]
      : openToken === "primary"
      ? colors["background"]
      : null;
  const contrastHex = contrastPartner ? oklchToHex(contrastPartner) : undefined;

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
        {/* Swatch row — tapping a swatch expands the picker inline (no nested portal) */}
        <div className="flex items-center gap-1.5">
          {toolbarItems.colors.map((item) => {
            const hex = oklchToHex(colors[item.color as PaletteKey]);
            const isActive = openToken === item.color;
            return (
              <button
                key={item.color}
                onClick={() =>
                  setOpenToken(isActive ? null : (item.color as PaletteKey))
                }
                disabled={!isReady}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60",
                  isActive && "bg-muted ring-1 ring-border",
                  !isReady && "opacity-40 pointer-events-none",
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

        {/* Inline color picker — no portal, so the Popover never sees an outside click */}
        {openToken && isReady && (
          <div className="mt-2">
            <ColorPicker
              key={`mobile-${openToken}`}
              initialColor={currentHex}
              onColorChange={(val) => updateColor(openToken, val)}
              contrastWith={contrastHex}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
