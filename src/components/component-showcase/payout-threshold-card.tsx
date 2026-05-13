"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import { ShowcaseCard } from "./showcase-card";

export function PayoutThresholdCard() {
  return (
    <ShowcaseCard title="Payout Threshold">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">
            Set the minimum balance required before a payout is triggered.
          </p>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Currency</label>
          <Select defaultValue="usd">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD - United States Dollar</SelectItem>
              <SelectItem value="eur">EUR - Euro</SelectItem>
              <SelectItem value="gbp">GBP - British Pound</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Minimum Payout Amount</label>
            <span className="text-xl font-bold">$2500.00</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$50 (MIN)</span>
            <span>$10,000 (MAX)</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea
            placeholder="Add any notes for this payout configuration..."
            className="resize-none"
            rows={3}
          />
        </div>

        <Button className="w-full">Save Threshold</Button>
      </div>
    </ShowcaseCard>
  );
}
