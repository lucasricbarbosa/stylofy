"use client"

import { PlusIcon, CopyIcon } from "lucide-react"
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

export function InviteTeamCard() {
  return (
    <ShowcaseCard title="Invite Team">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add members to your workspace
        </p>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input placeholder="alex@example.com" className="flex-1" />
            <Select defaultValue="editor">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input placeholder="sam@example.com" className="flex-1" />
            <Select defaultValue="viewer">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add another
        </Button>

        <div className="space-y-2 pt-2 border-t">
          <div className="text-sm text-muted-foreground">Or share invite link</div>
          <div className="flex gap-2">
            <Input value="https://app.co/invite/x8f2k" readOnly className="text-xs" />
            <Button variant="outline" size="icon">
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ShowcaseCard>
  )
}
