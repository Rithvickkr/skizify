import { useSession } from "next-auth/react";
import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
import { getServerSession } from "next-auth";

import prisma from "@repo/db/client";
// import {getUserImage} from "../../lib/actions/getImage";
import { authOptions } from "../../lib/auth";
export default async function GigStructure() {
  const session = getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return <div>loading...</div>;
  }
  
  // const image = await getUserImage();

  return (
    <div>
      <BentoGrid>
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
      </BentoGrid>
    </div>
  );
}
//TASK FOR LATER IS TO IMPORT THE AVATAR FROM THE DB
