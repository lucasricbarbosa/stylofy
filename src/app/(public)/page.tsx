import { Hero } from "@/components/home/hero";
import { HowDoesItWork } from "@/components/home/how-does-it-work";
import { SomeComponentsToTest } from "@/components/home/some-components-to-test";
import { WhyStylofy } from "@/components/home/why-stylofy";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyStylofy />
      <HowDoesItWork />
      <SomeComponentsToTest />
    </>
  );
}
