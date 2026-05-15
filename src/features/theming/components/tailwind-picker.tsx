"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { useMemo, useState } from "react";
import { TAILWIND_COLORS, TAILWIND_FAMILIES, TAILWIND_SHADES } from "../lib/tailwind-colors";
import { toOklch } from "../lib/oklch";

interface TailwindPickerProps {
  onSelect: (value: string) => void;
}

export function TailwindPicker({ onSelect }: TailwindPickerProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const families = useMemo(() => {
    if (!search.trim()) return TAILWIND_FAMILIES;
    const q = search.toLowerCase();
    return TAILWIND_FAMILIES.filter((f) => f.includes(q));
  }, [search]);

  function handleSelect(hex: string) {
    onSelect(toOklch(hex));
    setOpen(false);
    setSearch("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Pick from Tailwind palette"
        >
          <Palette className="size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="end" sideOffset={6}>
        <div className="flex flex-col gap-2">
          <input
            autoFocus
            placeholder="Search colors…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="max-h-72 overflow-y-auto flex flex-col gap-1">
            {families.map((family) => (
              <div key={family} className="flex items-center gap-1.5">
                <span className="w-14 shrink-0 text-[10px] text-muted-foreground capitalize">{family}</span>
                <div className="flex gap-0.5">
                  {TAILWIND_SHADES.map((shade) => {
                    const hex = TAILWIND_COLORS[family][shade];
                    return (
                      <button
                        key={shade}
                        title={`${family}-${shade}: ${hex}`}
                        onClick={() => handleSelect(hex)}
                        className={cn(
                          "w-4 h-4 rounded-sm border border-border/40 transition-transform hover:scale-125 hover:z-10 hover:shadow-sm"
                        )}
                        style={{ backgroundColor: hex }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            {families.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No results</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
