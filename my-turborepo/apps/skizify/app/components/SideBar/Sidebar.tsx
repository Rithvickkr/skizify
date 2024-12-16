import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { SidebarItem } from "./SidebarItem";
import { JSX, SVGProps } from "react";
import { UserRole } from "@repo/store/types";
import { SquareCheckBig } from "lucide-react";
export async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Loading .... </div>;
  }
  return (
    <div className="z-2 flex min-h-screen flex-col border-r bg-[#fafbfb] dark:border-slate-700 dark:bg-gray-900">
      <div className="flex items-center">
        <div className="m-2 flex size-10 items-center justify-center rounded-full border border-white bg-[black] text-white focus:outline-0 dark:border-gray-900 dark:bg-white dark:text-black">
          <div>S</div>
        </div>
        <div className="m-4 cursor-pointer font-display text-3xl font-bold">
         SkFy
        </div>
      </div>
      <div className="pt-24">
        {session.user.role === UserRole.USER ? (
          <SidebarItem 
            href={"/postgig"}
            title={"Post a Gig"}
            icon={<PlusIcon />}
          />
        ) : (
          ""
        )}

        <SidebarItem
          href={"/mygigs"}
          title={
            session.user.role === UserRole.USER ? "My Gigs" : "Accepted Gigs"
          }
          icon={
            session.user.role === UserRole.USER ? (
              <BriefcaseIcon />
            ) : (
              <SquareCheckBig />
            )
          }
        />
        <SidebarItem
          href={"/explore"}
          title={"Explore"}
          icon={<Grid3x3Icon />}
        />
        <SidebarItem
          href={"/schedule"}
          title={
            session.user.role === UserRole.USER ? "Appointments" : "Calendar"
          }
          icon={<CalendarIcon />}
        />
        <SidebarItem
          href={"/profile"}
          title={"Profile"}
          icon={session.user.role === UserRole.SKIZZER ? <UserIcon /> : ""}
        />
      </div>
    </div>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 22 22" // Adjusted the viewBox to match the BriefcaseIcon
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
    >
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
  );
}

function BriefcaseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function Grid3x3Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
