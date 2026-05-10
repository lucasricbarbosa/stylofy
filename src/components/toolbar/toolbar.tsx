"use client";

import { useThemeColors } from "@/components/theme/theme-context";
import { toolbarItems } from "@/utils/toolbar-items";
import { useEffect } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { ColorPickerItem } from "./color-picker-item";
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
        {toolbarItems.colors.map((item) => (
          <ColorPickerItem key={item.name} color={item.color} name={item.name} shortcut={item.shortcut} />
        ))}
        <div className="w-px h-6 bg-border mx-0.5" />
        <PresetPicker />
        <PaletteExport />
        <ThemeToggle />
      </div>
    </div>
  );
}
