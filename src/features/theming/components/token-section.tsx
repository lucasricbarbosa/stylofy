"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TokenSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function TokenSection({ title, defaultOpen = true, children }: TokenSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <ChevronRight
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </button>

      {/* CSS grid-rows trick for smooth height animation without JS measurement */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
