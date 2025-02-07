"use client";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import DisplayCardsDemo from "../DisplayCardBento";
import { HoverCard } from "../HoverCard";
import { Icons } from "../../footer/Footer";

export default function BentoGridLandingDemo() {
  return (
    <BentoGrid className="max-w-5xl mx-auto">
      <BentoGridItem
      header={<HoverCard>
        OINOWIENWEIJBGEIWJBG

        <br />
        lkneelkwjng 
      </HoverCard>}
      title="Title"
      description="Description"
      icon={<Icons.x />}
      
      
      className="md:col-span-5 md:row-span-5"
      />
      <BentoGridItem
      header={<HoverCard children={undefined} />}
      className="md:col-span-7 md:row-span-5"
      title="Title"
      description="Description"
      icon={<Icons.x />}
      />
      <BentoGridItem
      header={<HoverCard children={undefined} />}
      className="md:col-span-7 md:row-span-5"
      title="Title"
      description="Description"
      icon={<Icons.x />}
      />
      <BentoGridItem
      header={<HoverCard children={undefined} />}
      className="md:col-span-5 md:row-span-5"
      title="Title"
      description="Description"
      icon={<Icons.x />}
      />
    </BentoGrid>
  );
}

