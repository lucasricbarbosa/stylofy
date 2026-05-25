import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockAbout } from "../../../components/blocks/block-about";
import { BlockCards } from "../../../components/blocks/block-card";
import { BlockColorPalette } from "../../../components/blocks/block-color-palette";
import { BlockDashboard } from "../../../components/blocks/block-dashboard";
import { BlockPricing } from "../../../components/blocks/block-pricing";
import { BlockTypography } from "../../../components/blocks/block-typography";

const Playground = () => {
  return (
    <section className="max-md:px-6 mx-auto max-w-[1200px] items-center px-10">
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="mt-3 mb-2 bg-transparent">
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="cards"
          >
            Cards
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="dashboard"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="pricing"
          >
            Pricing
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="about"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="colors"
          >
            Colors
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-secondary px-2.5 rounded-full cursor-pointer data-[state=active]:text-foreground"
            value="typography"
          >
            Typography
          </TabsTrigger>
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
