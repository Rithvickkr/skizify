"use client";
import { useRouter } from "next/navigation";
import { Button as ButtonE } from "../ui/button";
export default  function ViewProfile({id}: {id : string}) {
    const router = useRouter();
  return (
    <div>
    <ButtonE
      className="group relative overflow-hidden bg-neutral-900 text-white shadow-md transition-all duration-500 ease-in-out hover:bg-neutral-800 hover:shadow-lg dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      variant={"gooeyLeft"}
      onClick={() => {      
        router.push(`/About/${id}`);
      }
        }
    >
      <span className="relative z-10">View Profile</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-50 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-400" />
    </ButtonE>
    </div>
  );
}
