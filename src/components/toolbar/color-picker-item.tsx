"use client";

import { cn } from "@/lib/utils";
import { oklchToHex } from "@/utils/colors";
import { useEffect, useState } from "react";
import ColorPicker from "../color-picker/color-picker";
import { useThemeColors } from "../theme/theme-context";
import type { PaletteKey } from "../theme/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ColorPickerItemProps {
  name: string;
  color: string;
  shortcut?: string;
}

export function ColorPickerItem({ color, name, shortcut }: ColorPickerItemProps) {
  const { colors, updateColor, isReady, activeToken, setActiveToken } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);

  // Open when this token is activated via keyboard shortcut.
  useEffect(() => {
    if (activeToken === color && !isOpen) {
      setIsOpen(true);
      setPickerKey((prev) => prev + 1);
    } else if (activeToken !== color && isOpen) {
      setIsOpen(false);
    }
  }, [activeToken, color, isOpen]);

  const handleColorChange = (newColor: string) => {
    updateColor(color as PaletteKey, newColor);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setPickerKey((prev) => prev + 1);
      setActiveToken(color as PaletteKey);
    } else {
      setActiveToken(null);
    }
  };

  // Derive display color directly from context — no local state layer.
  const currentColor = colors[color as PaletteKey];
  const hexColor = currentColor ? oklchToHex(currentColor) : undefined;

  const contrastPartner =
    color === "foreground"
      ? colors["background"]
      : color === "background"
      ? colors["foreground"]
      : color === "primary"
      ? colors["background"]
      : undefined;

  const contrastHex = contrastPartner ? oklchToHex(contrastPartner) : undefined;

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none",
            "hover:bg-muted/60",
            isOpen && "bg-muted ring-1 ring-border",
            !isReady && "opacity-40 pointer-events-none",
          )}
          disabled={!isReady}
          aria-label={`${name} color picker${shortcut ? ` (${shortcut})` : ""}`}
        >
          <div
            className="w-6 h-6 rounded-full border-2 border-border shadow-sm transition-transform duration-150 hover:scale-110"
            style={{ backgroundColor: hexColor }}
          />
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            {name}
          </span>
          {shortcut && (
            <span className="text-[9px] text-muted-foreground/60 leading-none">
              {shortcut}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 bg-transparent shadow-none" sideOffset={8}>
        {isReady && hexColor ? (
          <ColorPicker
            key={`colorpicker-${color}-${pickerKey}`}
            initialColor={hexColor}
            onColorChange={handleColorChange}
            contrastWith={contrastHex}
          />
        ) : (
          <div className="p-4 text-sm text-center text-muted-foreground bg-card rounded-xl border border-border">
            Loading…
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
