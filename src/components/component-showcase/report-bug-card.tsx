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

export function ReportBugCard() {
  return (
    <ShowcaseCard title="Report Bug">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Help us fix issues faster.
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input placeholder="Brief description of the issue" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Severity</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Component</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ui">UI</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full">Submit Report</Button>
      </div>
    </ShowcaseCard>
  )
}
