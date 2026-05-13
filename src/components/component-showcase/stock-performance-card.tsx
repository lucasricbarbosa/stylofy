"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShowcaseCard } from "./showcase-card"

export function StockPerformanceCard() {
  return (
    <ShowcaseCard title="Stock Performance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">6-month price history.</span>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Ticker</label>
            <Select defaultValue="voo">
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voo">VOO</SelectItem>
                <SelectItem value="spy">SPY</SelectItem>
                <SelectItem value="qqq">QQQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-24 flex items-end">
          <svg viewBox="0 0 200 60" className="w-full h-full text-muted-foreground/30">
            <path
              d="M0,45 Q20,50 40,40 T80,35 T120,30 T160,25 T200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </ShowcaseCard>
  )
}
