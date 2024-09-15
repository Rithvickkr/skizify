"use client";
import { useRouter } from "next/navigation";
import { Button as ButtonE } from "../ui/button";
import { cn } from "../../utils/cn";
import { ArrowRightIcon, ChevronRight,  } from "lucide-react";
export default  function ViewProfile({id , classname}: {id : string , classname? : string}) {
    const router = useRouter();
  return (
    <div>
    <ButtonE
      className={cn("group relative overflow-hidden bg-neutral-900 text-white shadow-md transition-all duration-500 ease-in-out hover:bg-neutral-800 hover:shadow-lg dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",classname)}
      Icon={ChevronRight}
      iconPlacement="right"
      variant="expandIcon"
      onClick={() => {      
        router.push(`/About/${id}`);
      }
        }
    >
<span className="relative z-10 group">
  View Profile
</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-50 dark:from-neutral-200 dark:via-neutral-300 dark:to-neutral-400" />
    </ButtonE>
    </div>
  );
}
