"use client"

import { ShowcaseCard } from "./showcase-card"

export function TypographyCard() {
  const colors = [
    { name: "--background", color: "bg-background" },
    { name: "--foreground", color: "bg-foreground" },
    { name: "--primary", color: "bg-primary" },
    { name: "--secondary", color: "bg-secondary" },
    { name: "--muted", color: "bg-muted" },
    { name: "--accent", color: "bg-accent" },
  ]

  const chartColors = [
    { name: "--border", color: "bg-border" },
    { name: "--chart-1", color: "bg-[hsl(var(--chart-1))]" },
    { name: "--chart-2", color: "bg-[hsl(var(--chart-2))]" },
    { name: "--chart-3", color: "bg-[hsl(var(--chart-3))]" },
    { name: "--chart-4", color: "bg-[hsl(var(--chart-4))]" },
    { name: "--chart-5", color: "bg-[hsl(var(--chart-5))]" },
  ]

  return (
    <ShowcaseCard title="Nova - Inter">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Designers love packing quirky glyphs into test phrases. This is a preview of the...
        </p>

        <div className="flex flex-wrap gap-2">
          {colors.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded border ${item.color}`}
              />
              <span className="text-[10px] text-muted-foreground truncate max-w-[50px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {chartColors.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <div
                className={`h-8 w-8 rounded border ${item.color}`}
              />
              <span className="text-[10px] text-muted-foreground truncate max-w-[50px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  )
}
