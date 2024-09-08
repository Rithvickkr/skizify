"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { setRole } from "../lib/actions/setRole";

import { useRecoilState, RecoilState } from "recoil";
import { userRoleState } from "@repo/store";

import { Bell } from "lucide-react";
import WarningPage from "./ui/WarningPage";
import getInfos from "../lib/actions/getinfos";
import { ToolTip } from "@repo/ui/tooltip";
export function AppbarClient() {
  const session = useSession();
  // const [roly, setRoly] = useRecoilState(userRoleState);
  const name = session.data?.user?.name || "User";
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const changeRoles = async () => {
    const role = await setRole();
    // const info = await getInfos(session.data?.user?.id || "");

    window.location.reload(); // This will hard reload the page
    // if (role === "SKIZZER" && info?.bio != "") {
    //   window.location.href = "/profile";
    // }
  };
  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={handleSignOut}
        altname={name}
        fn={changeRoles}
      >
        <ToolTip name={"Notification"} className="p-2">
        <div className="cursor-pointer rounded-full p-2 hover:bg-neutral-100 dark:bg-black hover:dark:bg-[#212125] dark:hover:bg-opacity-75">
          <Bell className="size-5 md:size-6" strokeWidth={1.8} />
        </div>
        </ToolTip>
        <WarningPage />
      </Appbar>
    </div>
  );
}

//navigation is only used in client-side components
//router is only used in Server components

//That's HOW IT LOOKS IN useSession
// {
//   data: {
//     user: {
//       name: 'name',
//       email: 'email@gmail.com',
//       id: 'd3f9bpwoejfpowejfpowweoifjo'
//     },
//     expires: '2024-06-29T13:03:47.970Z'
//   },
//   status: 'authenticated'
// }
