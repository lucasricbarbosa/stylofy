"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import ZentoUiLink from "../zento-ui-link";

export function BlockPricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="w-full min-h-screen bg-background py-40 md:py-24 px-2 relative">
      <ZentoUiLink />

      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
            Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Check out our affordable pricing plans
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-medium ${
              !isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-medium ${
              isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Yearly
          </Label>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Plus Plan */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Plus
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                For personal use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-5xl font-bold text-foreground">
                  ${isYearly ? "19" : "29"}
                </span>
                <span className="text-muted-foreground">/month</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Billed ${isYearly ? "228" : "348"} annually
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <ul className="space-y-4">
                  <FeatureItem>Up to 5 team members</FeatureItem>
                  <FeatureItem>Basic components library</FeatureItem>
                  <FeatureItem>Community support</FeatureItem>
                  <FeatureItem>1GB storage space</FeatureItem>
                </ul>
              </div>
            </CardContent>
            <div className="mt-auto px-6">
              <Button className="w-full bg-primary text-primary-foreground">
                Purchase
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Pro
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                For professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-5xl font-bold text-foreground">
                  ${isYearly ? "49" : "69"}
                </span>
                <span className="text-muted-foreground">/month</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Billed ${isYearly ? "588" : "828"} annually
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <p className="font-semibold text-foreground mb-4">
                  Everything in Plus, and:
                </p>
                <ul className="space-y-4">
                  <FeatureItem>Unlimited team members</FeatureItem>
                  <FeatureItem>Advanced components</FeatureItem>
                  <FeatureItem>Priority support</FeatureItem>
                  <FeatureItem>Unlimited storage</FeatureItem>
                </ul>
              </div>

              <Button className="w-full bg-primary text-primary-foreground">
                Purchase
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
      <span className="text-foreground">{children}</span>
    </li>
  );
}
