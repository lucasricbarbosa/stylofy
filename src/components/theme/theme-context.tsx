"use client";

import { applyFont } from "@/utils/fonts";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type PaletteKey =
  | "foreground"
  | "background"
  | "primary"
  | "secondary"
  | "accent";

interface ThemeUIContextProps {
  activeToken: PaletteKey | null;
  setActiveToken: (token: PaletteKey | null) => void;
  font: string;
  updateFont: (slug: string) => void;
}

const ThemeContext = createContext<ThemeUIContextProps | undefined>(undefined);

export function ThemeColorsProvider({ children }: { children: React.ReactNode }) {
  const [activeToken, setActiveToken] = useState<PaletteKey | null>(null);
  const [font, setFont] = useState<string>("Inter");

  useEffect(() => {
    try {
      const savedFont = localStorage.getItem("stylofy-font");
      if (savedFont) {
        applyFont(savedFont);
        setFont(savedFont);
      }
    } catch {}
  }, []);

  const updateFont = useCallback((slug: string) => {
    applyFont(slug);
    setFont(slug);
    try {
      localStorage.setItem("stylofy-font", slug);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ activeToken, setActiveToken, font, updateFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeColors() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeColors must be used within ThemeColorsProvider");
  return ctx;
}
