"use client";
import { UserRole } from "@repo/store/types";
import { motion } from "framer-motion";
import {
  CalendarRange,
  Codesandbox,
  LayoutGrid,
  SquareCheckBig,
  SquareUserRound,
  Video,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { SVGProps, useState } from "react";
import { cn } from "../../utils/cn";
import { AppbarClient } from "../AppbarClient";
import Footer from "../footer/Footer";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const links = [
    {
      label: session.data?.user.role === UserRole.USER ? "Post a Gig" : "",
      href: "/postgig",
      icon:
        session.data?.user.role === UserRole.USER ? (
          <PlusIcon
            className={`size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200 ${session.data?.user.role === UserRole.USER ? "" : "hidden"} `}
          />
        ) : (
          ""
        ),
    },
    {
      label: session.data?.user.role === UserRole.USER ? "My Gigs" : "Requests",
      href: "/mygigs",
      icon:
        session.data?.user.role === UserRole.USER ? (
          <LayoutGrid className="size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        ) : (
          <SquareCheckBig className="size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: (
        <Codesandbox className="size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Calendar",
      href: "/schedule",
      icon: (
        <CalendarRange className="size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Meeting",
      href: "/meeting",
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 my-0.5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
</svg>

      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <SquareUserRound
          className="size-6 my-0.5 flex-shrink-0 text-neutral-700 dark:text-neutral-200"
        />
      ),
    },
  ];
  const filteredLinks =
    session.data?.user.role === UserRole.USER ? links : links.slice(1);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-black md:flex-row",
        "h-full",
        // for your use case, use `h-screen` instead of `h-[60vh]`❌
        //we should Use h-full here , as h-screen was causing issues
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-20 dark:bg-black">
          <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar">{/*no-scrollbar => scroll bar was coming, Removed it*/}
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {filteredLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Skizify
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-black/5 p-2 dark:border-neutral-700 dark:bg-black ">
      {/* AppBar at the top */}
      <AppbarClient />

      {/* Main content */}
      <div className="no-scrollbar flex-1 rounded-xl overflow-y-auto p-2 bg-white dark:bg-black">{children}</div>

      {/* Footer */}
      <hr className="dark:opacity-30 " />
      <Footer />
    </div>
  );
};

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
