"use client"

import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

export function ContributionHistoryCard() {
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"]
  const values = [40, 55, 65, 90, 75, 85]

  return (
    <ShowcaseCard title="Contribution History">
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">Last 6 months of activity</div>

        <div className="flex items-end justify-between gap-2 h-28">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full bg-foreground rounded-t"
                style={{ height: `${value}%` }}
              />
              <span className="text-xs text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div>
            <div className="text-xs text-muted-foreground uppercase">Upcoming</div>
            <div className="font-semibold">May 25, 2024</div>
            <div className="text-xs text-muted-foreground">$1,000 scheduled</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase">Auto-Save Plan</div>
            <div className="font-semibold">Accelerated</div>
            <div className="text-xs text-muted-foreground">Recurring weekly</div>
          </div>
        </div>

        <Button className="w-full">View Full Report</Button>
      </div>
    </ShowcaseCard>
  )
}
