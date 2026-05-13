"use client"

import { XIcon } from "lucide-react"
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

export function TransferFundsCard() {
  return (
    <ShowcaseCard title="Transfer Funds">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">
            Move money between your connected accounts.
          </p>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount to Transfer</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">$</span>
            <Input defaultValue="1,200.00" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">From Account</label>
          <Select defaultValue="checking">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checking">Main Checking (--8402) - $12,450.00</SelectItem>
              <SelectItem value="savings">High Yield Savings (--1192) - $42,100.00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To Account</label>
          <Select defaultValue="savings">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checking">Main Checking (--8402) - $12,450.00</SelectItem>
              <SelectItem value="savings">High Yield Savings (--1192) - $42,100.00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Transfer</Button>
      </div>
    </ShowcaseCard>
  )
}
