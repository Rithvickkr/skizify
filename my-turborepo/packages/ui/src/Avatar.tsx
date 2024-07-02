import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "../../../apps/skizify/app/utils/cn";
interface AvatarProps {
  name: string | null | undefined;
  photo?: any;
  classname? : string
}

export const Avatar = ({ name, photo ,classname }: AvatarProps) => {
  const fallbackChar = "U"; //for User
  const char = name ? name.charAt(0).toUpperCase() : fallbackChar;

  return (
    <div className="cursor-pointer self-center focus:outline-0">
      {typeof photo === "string" && photo.trim() !== "" ? (
        <Image
          src={photo}
          alt={name ? name : "user"}
          className="rounded-full size-10"
        />
      ) : (
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[black] text-white focus:outline-0 dark:border-gray-800 dark:bg-white dark:text-black",classname)}>
          <div>{char}</div>
        </div>
      )}
    </div>
  );
};
// photo = "image_url":  Renders the <Image> component with src="image_url".
// photo = null:         Renders nothing (null).
// photo = undefined:    Renders nothing (null).
// photo = "":           Renders nothing (null).
// photo = " ":          Renders nothing (null).
// photo = 0:            Renders nothing (null).
// photo = NaN:          Renders nothing (null).
// photo = {}:           Renders nothing (null).
// photo = []:           Renders nothing (null).
