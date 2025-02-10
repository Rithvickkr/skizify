"use client";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import DisplayCardsDemo from "../DisplayCardBento";
import { HoverCard } from "../HoverCard";
import { Icons } from "../../footer/Footer";
import WorldMap from "../../../../components/ui/world-map";
import SocialRings from "./SocialRings";
import SocialRingBento from "./SocialRingBento";
import BentoMap from "./BentoMap";
import BentoIcon from "./BentoIcon";

export default function BentoGridLandingDemo() {
  return (
    <BentoGrid className="mx-auto max-w-5xl">
      <BentoGridItem
        header={<SocialRings />}
        title="Title"
        description="Description"
        icon={<Icons.x />}
        className="md:col-span-5 md:row-span-5"
      />
      <BentoGridItem
        header={
<BentoMap />
        }
        className="md:col-span-7 md:row-span-5"
        // title="Title"
        // description="Description"
        // icon={<Icons.x />}
      />
      <BentoGridItem
        header={<SocialRingBento />}
        className="md:col-span-7 md:row-span-5"
        title="Title"
        description="Description"
        icon={<Icons.x />}
      />
      <BentoGridItem
        header={<BentoIcon />}
        className="md:col-span-5 md:row-span-5"
        title="Title"
        description="Description"
        icon={<Icons.x />}
      />
    </BentoGrid>
  );
}
