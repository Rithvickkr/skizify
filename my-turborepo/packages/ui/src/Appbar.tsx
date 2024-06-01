import { Avatar } from "./Avatar";
import {
    BookmarkIcon,
    HistoryIcon,
    LogOutIcon,
    Settings,
    User2Icon,
    Bird,
    MoonIcon
  } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../../apps/skizify/@/components/ui/dropdown-menu"

  import SwitchTheme from "../../../apps/skizify/app/components/SwitchTheme"
interface AppbarProps {
    user?: {
        name?: string | null;
        photo? : any ;
        email? : string | null;
    },
    onSignin: any,
    onSignout: any,
    altname : string
}

export const Appbar = ({
    user,
    onSignout,
    onSignin,
    altname
} : AppbarProps) => {

    const name = user?.name || "User";
    return (
            <div className="flex justify-end items-center p-3">
                
                <DropdownMenu>
                    <DropdownMenuTrigger><Avatar photo={user?.photo} name={name} altname={altname}/></DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-3 mt-2 shadow-2xl bg-white dark:bg-[#020817] dark:border-gray-700 p-3">
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="focus:outline-0 x">
                            <div className="flex flex-col dark:text-slate-50 py-2">
                                <div className="my-1 font-semibold">{user?.name}</div>
                                <div className="text-xs truncate">{user?.email}</div>
                            </div>
                        </DropdownMenuItem>
                        <hr className="dark:border-gray-700"/>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-1 mb-2 focus:outline-0 hover:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-md shadow-md  cursor-pointer ">
                            <MoonIcon className="mr-2 size-4 m-2" />
                            <SwitchTheme />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-1 focus:outline-0 hover:text-gray-500 cursor-pointer rounded-md shadow-md dark:bg-gray-800 dark:hover:bg-gray-900">
                            <Settings className="mr-2 size-4 m-2"/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <hr className="dark:border-gray-700"/>
                        <DropdownMenuItem onClick={user ? onSignout : onSignin} className="p-1 my-2 focus:outline-0 hover:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-md shadow-md  cursor-pointer ">
                            <LogOutIcon className="mr-2 size-4 m-2"/>
                            <span className=" p-1 ">{user ? "Logout" : "Login"}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
    )
}

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