import { useSession } from "next-auth/react";
import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
import { getServerSession } from "next-auth";

import prisma from "@repo/db/client";
// import {getUserImage} from "../../lib/actions/getImage";
import { authOptions } from "../../lib/auth";

//This will fetch Data from DB
export const getServerSideProps = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  let userimage = "";
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
      select: {
        userImage: true,
      },
    });
    if (user) {
      userimage = user.userImage || "";
    }
  } catch (err) {
    console.log("Unable to fetch Data from the Server", err);
  }
  return {
    props: {
      image: userimage,
      
    },
  };
};

//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return null;
//   }
//   try {
//     if (session.user?.email) {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: session.user?.email,
//         },
//         select: {
//           userImage: true,
//         },
//       });
//       return user?.userImage;
//     }
//   } catch (error) {
//     console.error("Error fetching user image:", error);
//   }
//   return "";

export default async function GigStructure() {
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
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
        <BentoGridItem
          title="This is a Gig"
          description="This is the constent which I want to Store"
          header="Gig"
          icon={<Avatar name={"user"} />}
        />
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

//getServerSideProps :-

// it runs on the server.
// it can only be exported from a page.
// it returns JSON.
