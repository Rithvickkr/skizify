import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  

  if (session?.user) {
    redirect("/explore"); // Redirect authenticated users to explore
  } else {
    redirect("/api/auth/signin?callckUrl=/explore"); // Redirect non-authenticated users with a proper callback URL
  }
}
