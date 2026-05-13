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

export function SetMilestoneCard() {
  return (
    <ShowcaseCard title="Set a new milestone">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {"Define your financial target and we'll help you pace your savings."}
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium">Goal Name</label>
          <Input placeholder="e.g. New Car, Home Downpayment" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Amount</label>
            <Input placeholder="$15,000" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Date</label>
            <Select defaultValue="dec2025">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec2025">Dec 2025</SelectItem>
                <SelectItem value="jun2026">Jun 2026</SelectItem>
                <SelectItem value="dec2026">Dec 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full">Create Goal</Button>

        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <div className="flex gap-1 ml-4">
            <div className="h-2 w-2 rounded-full bg-foreground" />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </ShowcaseCard>
  )
}
