"use client";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import DisplayCardsDemo from "../DisplayCardBento";
import { HoverCard } from "../HoverCard";
import { Icons } from "../../footer/Footer";
import WorldMap from "../../../../components/ui/world-map";

export default function BentoGridLandingDemo() {
  return (
    <BentoGrid className="mx-auto max-w-5xl">
      <BentoGridItem
        header={
          <HoverCard>
            <div className="bg-zinc-500">
              
            OINOWIENWEIJBGEIWJBG
            <br />
            lkneelkwjng
            </div>
          </HoverCard>
        }
        title="Title"
        description="Description"
        icon={<Icons.x />}
        className="md:col-span-5 md:row-span-5"
      />
      <BentoGridItem
        header={
          <HoverCard>
            <div className="absolute left-0 top-0 z-0 h-full w-full">
              <WorldMap
                dots={[
                  {
                    start: { lat: 64.2008, lng: -149.4937 },
                    end: { lat: 34.0522, lng: -118.2437 },
                  },
                  {
                    start: { lat: 64.2008, lng: -149.4937 },
                    end: { lat: -15.7975, lng: -47.8919 },
                  },
                  {
                    start: { lat: -15.7975, lng: -47.8919 },
                    end: { lat: 38.7223, lng: -9.1393 },
                  },
                  {
                    start: { lat: 51.5074, lng: -0.1278 },
                    end: { lat: 28.6139, lng: 77.209 },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: 43.1332, lng: 131.9113 },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: -1.2921, lng: 36.8219 },
                  },
                ]}
              />
            </div>

            {/* Black Overlay */}
            {/* <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-black/80 from-20% to-black/50"></div> */}
          </HoverCard>
        }
        className="md:col-span-7 md:row-span-5"
        // title="Title"
        // description="Description"
        // icon={<Icons.x />}
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
