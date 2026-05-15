"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SavedTheme, TokenValues } from "../types";

const STORAGE_KEY = "stylofy:shadcn-themes:v1:saved";

function load(): SavedTheme[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedTheme[]) : [];
  } catch {
    return [];
  }
}

function persist(themes: SavedTheme[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
  } catch {}
}

interface LocalThemesContextValue {
  themes: SavedTheme[];
  addTheme: (name: string, light: TokenValues, dark: TokenValues) => void;
  deleteTheme: (id: string) => void;
  duplicateTheme: (id: string) => void;
  exportThemeJson: (id: string) => string;
  importThemeJson: (json: string) => boolean;
}

export const LocalThemesContext = createContext<LocalThemesContextValue | undefined>(undefined);

export function useLocalThemes(): LocalThemesContextValue {
  const ctx = useContext(LocalThemesContext);
  if (!ctx) throw new Error("useLocalThemes must be used inside LocalThemesProvider");
  return ctx;
}

export function LocalThemesProvider({ children }: { children: React.ReactNode }) {
  const [themes, setThemes] = useState<SavedTheme[]>([]);

  useEffect(() => {
    setThemes(load());
  }, []);

  const addTheme = useCallback((name: string, light: TokenValues, dark: TokenValues) => {
    setThemes((prev) => {
      const next: SavedTheme[] = [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name,
          light,
          dark,
          createdAt: Date.now(),
        },
        ...prev,
      ];
      persist(next);
      return next;
    });
  }, []);

  const deleteTheme = useCallback((id: string) => {
    setThemes((prev) => {
      const next = prev.filter((t) => t.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const duplicateTheme = useCallback((id: string) => {
    setThemes((prev) => {
      const original = prev.find((t) => t.id === id);
      if (!original) return prev;
      const copy: SavedTheme = {
        ...original,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: `${original.name} Copy`,
        createdAt: Date.now(),
      };
      const next = [copy, ...prev];
      persist(next);
      return next;
    });
  }, []);

  const exportThemeJson = useCallback((id: string): string => {
    const theme = themes.find((t) => t.id === id);
    return theme ? JSON.stringify(theme, null, 2) : "";
  }, [themes]);

  const importThemeJson = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as SavedTheme;
      if (!parsed.light || !parsed.dark) return false;
      setThemes((prev) => {
        const next: SavedTheme[] = [
          {
            ...parsed,
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            createdAt: Date.now(),
          },
          ...prev,
        ];
        persist(next);
        return next;
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  return React.createElement(
    LocalThemesContext.Provider,
    { value: { themes, addTheme, deleteTheme, duplicateTheme, exportThemeJson, importThemeJson } },
    children,
  );
}
