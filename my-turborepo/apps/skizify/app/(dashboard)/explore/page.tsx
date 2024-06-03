import { getServerSession } from "next-auth/next";
import GigStructure from "../../components/mygigs/Gig";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export default async function Page() {
  const  image = await getImage();
  return (
    <div>
      <GigStructure image={image}/>
    </div>
  )
}
export const getImage = async () => {
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
  return userimage;
};