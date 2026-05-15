"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex rounded flex-col items-center gap-1 px-2 sm:px-3 py-2 transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Moon className="w-4 h-4 text-muted-foreground" />
      )}
      <span className="text-[10px] sm:block hidden font-medium text-muted-foreground leading-none">
        {resolvedTheme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
