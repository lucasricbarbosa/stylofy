"use client";

import { useThemeColors } from "@/components/theme/theme-context";
import { oklchToHex } from "@/utils/colors";
import { Check, Download } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function PaletteExport() {
  const { colors } = useThemeColors();
  const [copied, setCopied] = useState(false);

  const toHex = (v: string) => oklchToHex(v);

  const getCSSVars = () =>
    `:root {\n  --color-text: ${toHex(colors.foreground)};\n  --color-background: ${toHex(colors.background)};\n  --color-primary: ${toHex(colors.primary)};\n  --color-secondary: ${toHex(colors.secondary)};\n  --color-accent: ${toHex(colors.accent)};\n}`;

  const getTailwindConfig = () =>
    `colors: {\n  text: "${toHex(colors.foreground)}",\n  background: "${toHex(colors.background)}",\n  primary: "${toHex(colors.primary)}",\n  secondary: "${toHex(colors.secondary)}",\n  accent: "${toHex(colors.accent)}",\n}`;

  const getJSON = () =>
    JSON.stringify(
      {
        text: toHex(colors.foreground),
        background: toHex(colors.background),
        primary: toHex(colors.primary),
        secondary: toHex(colors.secondary),
        accent: toHex(colors.accent),
      },
      null,
      2,
    );

  const copy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer outline-none hover:bg-muted/60"
          aria-label="Export palette"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Download className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-[10px] font-medium text-muted-foreground leading-none">
            Export
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={8}>
        <DropdownMenuItem onClick={() => copy(getCSSVars())}>
          CSS Variables
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copy(getTailwindConfig())}>
          Tailwind Config
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copy(getJSON())}>
          JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
