"use client";

import { useThemeColors } from "@/components/theme/theme-context";
import { FONTS, injectFont } from "@/utils/fonts";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function FontPicker() {
  const { font, updateFont } = useThemeColors();
  const hasPreloadedRef = useRef(false);
  const currentFont = FONTS.find((f) => f.slug === font) ?? FONTS[0];

  const handleOpenChange = (open: boolean) => {
    if (open && !hasPreloadedRef.current) {
      // Inject all picker fonts once so each option renders in its own face.
      FONTS.forEach(injectFont);
      hasPreloadedRef.current = true;
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60"
          aria-label="Change font"
        >
          <span
            className="text-base font-medium text-foreground  leading-none"
            style={{ fontFamily: currentFont.family }}
          >
            Aa
          </span>
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            Font
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="min-w-[200px]"
      >
        {FONTS.map((f) => (
          <DropdownMenuItem
            key={f.slug}
            onClick={() => updateFont(f.slug)}
            className="flex group items-center justify-between gap-3 cursor-pointer"
          >
            <span
              style={{ fontFamily: f.family }}
              className="text-sm group-hover:text-foreground"
            >
              {f.label}
            </span>
            <span className="text-xs text-muted-foreground/70 capitalize shrink-0">
              {f.category}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
