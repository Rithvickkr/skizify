import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { UserRole, GigStatus } from "@prisma/client";
import Userrequests from "../../components/mygigspage/UserRequests";
import SkizzerrequestPage from "../../components/skizzermygigspage/SkizzerrequestPage";



export default async function Page() {
  // Delete expired gigs from the database
  // await deleteExpiredGigs();
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen">
      {session?.user.role === UserRole.USER ? (
        <Userrequests />
      ) : (
        <SkizzerrequestPage />
      )}
    </div>
  );
}
