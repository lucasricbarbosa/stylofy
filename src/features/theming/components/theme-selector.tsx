"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Copy, Download, Trash2 } from "lucide-react";
import { useLocalThemes } from "../hooks/useLocalThemes";
import { BUILT_IN_PRESETS } from "../lib/presets";
import { useThemingStore, useStore } from "../store";

interface ThemeSelectorProps {
  onExportTheme: (id: string) => void;
}

export function ThemeSelector({ onExportTheme }: ThemeSelectorProps) {
  const { dispatch } = useThemingStore();
  const { applyTheme } = useStore();
  const { themes, deleteTheme, duplicateTheme } = useLocalThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          Themes
          <ChevronDown className="size-3" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto">
        {themes.length > 0 && (
          <>
            <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">
              My Themes
            </DropdownMenuLabel>
            {themes.map((t) => (
              <div key={t.id} className="flex items-center group">
                <DropdownMenuItem
                  className="flex-1 cursor-pointer"
                  onClick={() => applyTheme(t.light, t.dark, true)}
                >
                  {t.name}
                </DropdownMenuItem>
                <div className={cn(
                  "flex items-center gap-0.5 pr-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                )}>
                  <button
                    onClick={(e) => { e.stopPropagation(); duplicateTheme(t.id); }}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Duplicate"
                  >
                    <Copy className="size-3" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onExportTheme(t.id); }}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                    title="Export JSON"
                  >
                    <Download className="size-3" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteTheme(t.id); }}
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">
          Simple
        </DropdownMenuLabel>
        {BUILT_IN_PRESETS.filter((p) => p.level === "simple").map((p) => (
          <DropdownMenuItem
            key={p.name}
            className="flex flex-col items-start gap-0.5 cursor-pointer"
            onClick={() => dispatch({ type: "APPLY_PRESET", preset: p })}
          >
            <span className="text-xs font-medium">{p.name}</span>
            <span className="text-[10px] text-muted-foreground">{p.description}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">
          Advanced
        </DropdownMenuLabel>
        {BUILT_IN_PRESETS.filter((p) => p.level === "advanced").map((p) => (
          <DropdownMenuItem
            key={p.name}
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => dispatch({ type: "APPLY_PRESET", preset: p })}
          >
            <div className="flex items-center gap-0.5 shrink-0">
              {([p.light?.primary.value, p.light?.accent.value, p.light?.["chart-1"].value, p.light?.background.value] as string[]).map((color, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-sm border border-border/50"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-xs font-medium">{p.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{p.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
