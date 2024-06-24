import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { UserRole, GigStatus } from "@prisma/client";
import Userrequests from "../../components/mygigspage/UserRequests";
import SkizzerrequestPage from "../../components/skizzermygigspage/SkizzerrequestPage";

export interface GigsInterface {
  id: string;
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  Interval: any; // as it is a JSON value
  status: GigStatus;
  timeneeded: number;
}

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
