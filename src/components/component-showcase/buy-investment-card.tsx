"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShowcaseCard } from "./showcase-card"

export function BuyInvestmentCard() {
  return (
    <ShowcaseCard title="Buy Investment">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Amount to Invest</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">$</span>
            <Input defaultValue="1,000.00" className="font-medium" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Order Type</label>
          <Select defaultValue="market">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Order</SelectItem>
              <SelectItem value="limit">Limit Order</SelectItem>
              <SelectItem value="stop">Stop Order</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Market orders execute at the current price.</p>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Shares</span>
          <span className="font-medium">1.95</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Buying Power</span>
          <span className="font-medium">$12,450.00</span>
        </div>

        <Button className="w-full">Review Order</Button>

        <p className="text-xs text-muted-foreground text-center">
          Trades are typically executed within minutes during market hours.
        </p>
      </div>
    </ShowcaseCard>
  )
}
