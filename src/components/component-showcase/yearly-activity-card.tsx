"use client"

import { Badge } from "@/components/ui/badge"
import { ShowcaseCard } from "./showcase-card"

export function YearlyActivityCard() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  const values = [30, 45, 60, 50, 75, 40, 55, 85, 65, 70, 80, 45]

  return (
    <ShowcaseCard title="Yearly Activity">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">2024</span>
          <Badge variant="secondary" className="text-xs">+US$0.25 Daily Cash</Badge>
        </div>

        <div className="flex items-end justify-between gap-1 h-16">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full bg-foreground rounded-t"
                style={{ height: `${value}%` }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-muted-foreground">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  )
}
