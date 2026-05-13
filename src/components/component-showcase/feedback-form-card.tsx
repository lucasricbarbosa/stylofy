"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShowcaseCard } from "./showcase-card"

export function FeedbackFormCard() {
  return (
    <ShowcaseCard title="Feedback">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Topic</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="general">General Feedback</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Feedback</label>
          <Textarea placeholder="Your feedback helps us improve..." className="resize-none" rows={3} />
        </div>

        <Button className="w-full">Submit</Button>
      </div>
    </ShowcaseCard>
  )
}
