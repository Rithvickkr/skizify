"use client";
import React, { ReactNode } from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import DisplayCardsDemo from "./DisplayCardBento";
import { useTheme } from "next-themes";
import { MagicCard } from "../../../@repo/store/components/ui/magic-card";
import { Card } from "../../../@repo/store/components/ui/card";
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
