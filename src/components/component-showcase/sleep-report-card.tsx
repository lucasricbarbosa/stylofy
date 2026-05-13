"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function SleepReportCard() {
  const sleepData = [
    { label: "Deep", hours: 2, color: "bg-foreground" },
    { label: "Light", hours: 3, color: "bg-muted-foreground/60" },
    { label: "REM", hours: 1, color: "bg-muted-foreground/40" },
  ]

  return (
    <ShowcaseCard title="Sleep Report">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last night - 7h 24m</span>
        </div>

        <div className="flex items-end justify-between gap-1 h-24">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-foreground/80 rounded-t min-h-[8px]"
              style={{
                height: `${Math.random() * 60 + 30}%`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t">
          <div>
            <div className="font-semibold">2h 10m</div>
            <div className="text-[10px] text-muted-foreground">Deep</div>
          </div>
          <div>
            <div className="font-semibold">3h 48m</div>
            <div className="text-[10px] text-muted-foreground">Light</div>
          </div>
          <div>
            <div className="font-semibold">1h 26m</div>
            <div className="text-[10px] text-muted-foreground">REM</div>
          </div>
          <div>
            <div className="font-semibold">84</div>
            <div className="text-[10px] text-muted-foreground">Score</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Good</Badge>
          <Button variant="link" size="sm" className="text-xs">Details</Button>
        </div>
      </div>
    </ShowcaseCard>
  )
}
