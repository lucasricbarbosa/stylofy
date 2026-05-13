"use client"

import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShowcaseCard } from "./showcase-card"

const transactions = [
  { name: "Blue Bottle Coffee", category: "Food & Drink", date: "Today, 10:24 AM", amount: "-$6.50", icon: "coffee" },
  { name: "Whole Foods Market", category: "Groceries", date: "Yesterday", amount: "-$142.30", icon: "cart" },
  { name: "Stripe Payout", category: "Income", date: "Oct 12", amount: "+$4,200.00", positive: true, icon: "dollar" },
  { name: "Uber Technologies", category: "Transport", date: "Oct 11", amount: "-$24.10", icon: "car" },
  { name: "Netflix Subscription", category: "Entertainment", date: "Oct 10", amount: "-$19.99", icon: "tv" },
]

export function RecentTransactionsCard() {
  return (
    <ShowcaseCard title="Recent Transactions">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Your latest account activity.</span>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="space-y-1">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-2 hover:bg-muted/50 -mx-2 px-2 rounded-md">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {tx.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium">{tx.name}</div>
                  <div className="text-xs text-muted-foreground">{tx.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-sm font-medium ${tx.positive ? "text-emerald-600" : ""}`}>
                    {tx.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">{tx.date}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseCard>
  )
}
