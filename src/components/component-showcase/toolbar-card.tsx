"use client"

import {
  CopyIcon,
  TrashIcon,
  UploadIcon,
  CalendarIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { ShowcaseCard } from "./showcase-card"

export function ToolbarCard() {
  return (
    <ShowcaseCard title="Toolbar">
      <div className="space-y-4">
        <ButtonGroup className="flex-wrap">
          <Button variant="outline" size="icon"><CopyIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><TrashIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><UploadIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><CalendarIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><MoreHorizontalIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><RefreshCwIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><SearchIcon className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><SettingsIcon className="h-4 w-4" /></Button>
        </ButtonGroup>
      </div>
    </ShowcaseCard>
  )
}
