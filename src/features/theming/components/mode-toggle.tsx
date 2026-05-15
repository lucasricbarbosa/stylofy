"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useThemingStore } from "../store";
import type { ThemeMode } from "../types";

export function ModeToggle() {
  const { state, dispatch } = useThemingStore();
  const { setTheme } = useTheme();

  function Option({
    mode,
    icon: Icon,
    label,
  }: {
    mode: ThemeMode;
    icon: typeof Sun;
    label: string;
  }) {
    const active = state.activeMode === mode;

    return (
      <button
        onClick={() => {
          dispatch({ type: "SET_ACTIVE_MODE", mode });
          setTheme(mode);
        }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
          active
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={active}
      >
        <Icon className="size-3.5" />
        {label}
      </button>
    );
  }

  return (
    <div className="inline-flex w-fit items-center gap-0.5 rounded-lg bg-muted p-1">
      <Option mode="light" icon={Sun} label="Light" />
      <Option mode="dark" icon={Moon} label="Dark" />
    </div>
  );
}
