"use client";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import DisplayCardsDemo from "./DisplayCardBento";
import { HoverCard } from "./HoverCard";

export default function BentoGridLandingDemo() {
  return (
    <BentoGrid className="max-w-[80%] mx-auto">
      <BentoGridItem
      header={<HoverCard>
        OINOWIENWEIJBGEIWJBG
        KWEM KWEJ
        <br />
        lkneelkwjng 
      </HoverCard>}
      className="md:col-span-2 md:row-span-5"
      />
      <BentoGridItem
      header={<DisplayCardsDemo />}
      className="md:col-span-2 md:row-span-5"
      />
      <BentoGridItem
      header={<HoverCard children={undefined} />}
      className="md:col-span-2 md:row-span-5"
      />
      <BentoGridItem
      header={<HoverCard children={undefined} />}
      className="md:col-span-2 md:row-span-5"
      />
    </BentoGrid>
  );
}
