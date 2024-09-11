import { Bell, BellRing, Cog, LogOutIcon, WandSparkles } from "lucide-react";
import { Avatar } from "./Avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../apps/skizify/@/components/ui/dropdown-menu";

import { UserRole } from "@repo/store/types";
import { AppbarProps } from "@repo/store/types";
import SwitchTheme from "../../../apps/skizify/app/components/SwitchTheme";
import { ToolTip } from "./Tooltip";

export const Appbar = ({ user, onSignout, onSignin, fn, children }: AppbarProps) => {
  const name = user?.name || "User";
  return (
    <div className="flex items-center justify-end gap-2">
      {/* {(window.location.href=="http://localhost:3000/explore"?<div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>:<div>{window.location.href}</div>)} */}
      {children}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              photo={user?.photo}
              name={name}
              classname="ring-2 ring-black dark:ring-slate-50 "
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-30 mr-3 w-60 bg-white p-3 pt-1 shadow-2xl dark:border-neutral-700 dark:bg-black">
            <DropdownMenuItem className="focus:outline-0 p-2 pl-1">
              <div className="flex flex-col dark:text-slate-50">
                <div className="my-1 break-words break-all font-semibold text-base ">
                  {user?.name}
                </div>
                <div className="truncate break-words dark:text-neutral-300  break-all text-xs">
                  {user?.email}
                </div>
              </div>
            </DropdownMenuItem>
            <hr className="dark:border-neutral-700" />
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:dark:bg-lightdark mb-2 cursor-pointer rounded-md p-1 shadow-md focus:outline-0 dark:bg-neutral-900">
              {/* <MoonIcon className="m-2 mr-2 size-4" /> */}
              <SwitchTheme />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:dark:bg-lightdark cursor-pointer rounded-md p-1 shadow-md focus:outline-0 dark:bg-neutral-900">
              <Cog className="m-2 mr-2 size-5" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <hr className="mb-2 dark:border-neutral-700" />
            <DropdownMenuItem
              onClick={fn}
              className="hover:dark:bg-lightdark cursor-pointer rounded-md p-1 shadow-md focus:outline-0 dark:bg-neutral-900"
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
              className="hover:dark:bg-lightdark my-2 cursor-pointer rounded-md p-1 shadow-md focus:outline-0 dark:bg-neutral-900"
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
