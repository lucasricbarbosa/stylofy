"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlockAbout } from "../../../components/blocks/block-about";
import { BlockCards } from "../../../components/blocks/block-card";
import { BlockColorPalette } from "../../../components/blocks/block-color-palette";
import { BlockDashboard } from "../../../components/blocks/block-dashboard";
import { BlockPricing } from "../../../components/blocks/block-pricing";
import { BlockTypography } from "../../../components/blocks/block-typography";

const tabs = [
  { value: "cards", label: "Cards" },
  { value: "dashboard", label: "Dashboard" },
  { value: "pricing", label: "Pricing" },
  { value: "about", label: "About" },
  { value: "colors", label: "Colors" },
  { value: "typography", label: "Typography" },
];

const triggerClass =
  "data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground";

const Playground = () => {
  const [activeTab, setActiveTab] = useState("cards");

  return (
    <section className="max-md:px-6 mx-auto max-w-[1200px] items-center px-10">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile: dropdown */}
        <div className="mt-3 mb-2 md:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-40 rounded-full border-none bg-secondary text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: full tab list */}
        <TabsList className="mt-3 mb-2 bg-transparent hidden md:flex">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className={triggerClass}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent className="border-none" value="cards">
          <BlockCards />
        </TabsContent>
        <TabsContent className="border-none" value="dashboard">
          <BlockDashboard />
        </TabsContent>
        <TabsContent className="border-none" value="pricing">
          <BlockPricing />
        </TabsContent>
        <TabsContent className="border-none" value="about">
          <BlockAbout />
        </TabsContent>
        <TabsContent className="border-none" value="typography">
          <BlockTypography />
        </TabsContent>
        <TabsContent className="border-none" value="colors">
          <BlockColorPalette />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Playground;
