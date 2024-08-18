import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { UserRole, GigStatus } from "@prisma/client";
import Userrequests from "../../components/mygigspage/UserRequests";
import SkizzerrequestPage from "../../components/skizzermygigspage/SkizzerrequestPage";
import { Toaster } from "react-hot-toast";



export default async function Page() {
  // Delete expired gigs from the database
  // await deleteExpiredGigs();
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen">
      <Toaster />
      {session?.user.role === UserRole.USER ? (
        <Userrequests />
      ) : (
        <SkizzerrequestPage />
      )}
    </div>
  );
}
