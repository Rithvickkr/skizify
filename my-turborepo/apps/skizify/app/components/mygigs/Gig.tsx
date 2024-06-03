import { useSession } from "next-auth/react";
import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
import { getServerSession } from "next-auth";

import prisma from "@repo/db/client";
// import {getUserImage} from "../../lib/actions/getImage";
import { authOptions } from "../../lib/auth";

//This will fetch Data from DB

export default async function GigStructure({image}:{image : string}) {
  // const image = await getUserImage();
  console.log(image)
  return (
    <div>
      <BentoGrid>
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"Guser"} photo={image}/>}
        />
      </BentoGrid>
    </div>
  );
}
//TASK FOR LATER IS TO IMPORT THE AVATAR FROM THE DB

//getServerSideProps :-

// it runs on the server.
// it can only be exported from a page.
// it returns JSON.
