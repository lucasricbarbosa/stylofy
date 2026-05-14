import { BentoAccessibility } from "./bento-accessibility";
import { BentoExport } from "./bento-export";
import { BentoLivePreview } from "./bento-live-preview";
import { BentoPlayground } from "./bento-playground";

export function BentoGrid() {
  return (
    <section className="relative z-[2] mx-auto mt-14 max-w-[1200px] px-10 max-md:px-6">
      <div className="grid grid-cols-6 gap-4 [grid-auto-rows:minmax(160px,auto)]">
        <BentoLivePreview />
        <BentoPlayground />
        <BentoAccessibility />
        <BentoExport />
      </div>
    </section>
  );
}
