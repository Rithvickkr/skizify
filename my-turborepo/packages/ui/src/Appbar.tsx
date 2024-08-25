import { Avatar } from "./Avatar";
import {
  BookmarkIcon,
  HistoryIcon,
  LogOutIcon,
  Settings,
  MoonIcon,
  WandSparkles,
  Search,
  Nut,
  Cog,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../apps/skizify/@/components/ui/dropdown-menu";

import SwitchTheme from "../../../apps/skizify/app/components/SwitchTheme";
import { Button } from "../../../apps/skizify/@/components/ui/button";
import { AppbarProps } from "@repo/store/types";
import { GigStatus, UserRole } from "@prisma/client";

export const Appbar = ({ user, onSignout, onSignin, fn }: AppbarProps) => {
  const name = user?.name || "User";
  return (
    <div className="flex items-center justify-end">
      {/* {(window.location.href=="http://localhost:3000/explore"?<div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>:<div>{window.location.href}</div>)} */}

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              photo={user?.photo}
              name={name}
              classname="ring-2 ring-black dark:ring-slate-50 "
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 mt-2 z-30 w-60 bg-white p-3 shadow-2xl dark:border-neutral-700 dark:bg-black">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="x focus:outline-0">
              <div className="flex flex-col dark:text-slate-50">
                <div className="my-1 font-semibold break-all break-words">{user?.name}</div>
                <div className="truncate text-xs break-all break-words">{user?.email}</div>
              </div>
            </DropdownMenuItem>
            <hr className="dark:border-neutral-700" />
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mb-2 cursor-pointer rounded-md p-1 shadow-md focus:outline-0 hover:dark:bg-lightdark dark:bg-neutral-900">
              {/* <MoonIcon className="m-2 mr-2 size-4" /> */}
              <SwitchTheme />
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-md p-1 shadow-md focus:outline-0 hover:dark:bg-lightdark dark:bg-neutral-900">
              <Cog className="m-2 mr-2 size-5" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <hr className="dark:border-neutral-700 mb-2" />
            <DropdownMenuItem
              onClick={fn}
              className="cursor-pointer rounded-md p-1 shadow-md focus:outline-0 hover:dark:bg-lightdark dark:bg-neutral-900"
            >
              <WandSparkles className="m-2 mr-2 size-4" />
              <span>
                Become a {user?.role === UserRole.SKIZZER ? "User" : "Skizzer"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <hr className="dark:border-neutral-700" />
            <DropdownMenuItem
              onClick={user ? onSignout : onSignin}
              className="my-2 cursor-pointer rounded-md p-1 shadow-md focus:outline-0 hover:dark:bg-lightdark dark:bg-neutral-900"
            >
              <LogOutIcon className="m-2 mr-2 size-4" />
              <span className="p-1">{user ? "Logout" : "Login"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

//Introduced Sleek lines by just using border; This helps to set the Boundary
// {
//     data: {
//       user: {
//         name: 'yash',
//         email: '09438509345',
//         id: 'c60a7ce3-4969-4021-9496-ae9fb98eff8a'
//       },
//       expires: '2024-06-23T10:19:53.640Z'
//     },
//     status: 'authenticated'
//   }
