"use client";

import { ColorPickerPopover } from "@/features/theming/components/color-picker-popover";
import { useThemingStore } from "@/features/theming/store";
import type { ShadcnToken, SimpleTokens } from "@/features/theming/types";
import { cn } from "@/lib/utils";
import { oklchToHex } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import type { PaletteKey } from "../theme/theme-context";
import { useThemeColors } from "../theme/theme-context";
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

export function ColorPickerItem({
  color,
  name,
  shortcut,
}: ColorPickerItemProps) {
  const { state, dispatch } = useThemingStore();
  const { activeToken, setActiveToken } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const modeTokens = state.activeMode === "light" ? state.light : state.dark;
  const committedOklch = modeTokens[color as ShadcnToken]?.value ?? "";
  const committedHex = committedOklch ? oklchToHex(committedOklch) : "#000000";

  const commit = useCallback(
    (oklch: string) =>
      dispatch({
        type: "SET_SIMPLE",
        key: color as keyof SimpleTokens,
        value: oklch,
      }),
    [dispatch, color],
  );

  useEffect(() => {
    if (activeToken === color && !isOpen) setIsOpen(true);
    else if (activeToken !== color && isOpen) setIsOpen(false);
  }, [activeToken, color, isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setActiveToken(color as PaletteKey);
    else setActiveToken(null);
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none",
            "hover:bg-muted/60",
            isOpen && "bg-muted ring-1 ring-border",
          )}
          aria-label={`${name} color picker${shortcut ? ` (${shortcut})` : ""}`}
        >
          <div
            className="w-6 h-6 rounded-full border-2 border-border shadow-sm transition-transform duration-150 hover:scale-110"
            style={{ backgroundColor: committedHex }}
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
      <DropdownMenuContent
        className="p-0 border-0 bg-transparent shadow-none"
        sideOffset={8}
      >
        <ColorPickerPopover value={committedOklch} onCommit={commit} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
