"use client"

import { Progress } from "@/components/ui/progress"
import { ShowcaseCard } from "./showcase-card"

export function PowerUsageCard() {
  const hours = ["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"]
  const values = [30, 45, 55, 70, 85, 90, 60, 40]

  return (
    <ShowcaseCard title="Power Usage">
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">Whole Home</div>

        <div className="flex items-end justify-between gap-1 h-20">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full bg-muted-foreground/30 rounded-t"
                style={{ height: `${value}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{hours[i]}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="text-xs text-muted-foreground">Currently Using</div>
            <div className="text-xl font-bold">3.4 kW</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Solar Gen</div>
            <div className="text-xl font-bold text-emerald-600">+1.2 kW</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Battery Level</span>
            <span className="font-medium">85%</span>
          </div>
          <Progress value={85} className="h-1.5" />
        </div>
      </div>
    </ShowcaseCard>
  )
}
