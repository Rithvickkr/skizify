"use client";
import { UserRole } from "@prisma/client";
import { motion } from "framer-motion";
import {
  CalendarRange,
  Codesandbox,
  LayoutGrid,
  SquareCheckBig,
  SquareUserRound,
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
            className={`size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200 ${session.data?.user.role === UserRole.USER ? "" : "hidden"} `}
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
          <LayoutGrid className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        ) : (
          <SquareCheckBig className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: (
        <Codesandbox className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Calendar",
      href: "/schedule",
      icon: (
        <CalendarRange className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <SquareUserRound
          strokeWidth={1.5}
          className="size-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200"
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
          <div className="flex flex-1 flex-col overflow-y-auto">
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
    <div className="flex min-h-screen w-full flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
      {/* AppBar at the top */}
      <AppbarClient />

      {/* Main content */}
      <div className="no-scrollbar flex-1 overflow-y-auto p-4">{children}</div>

      {/* Footer */}
      <hr className="opacity-50 " />
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
