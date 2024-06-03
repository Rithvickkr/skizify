import Image from "next/image";
import { ReactNode } from "react";

interface AvatarProps {
  name: string | null | undefined;
  photo?: any;
}

export const Avatar = ({ name, photo }: AvatarProps) => {
  const fallbackChar = "U"; //for User
  const char = name ? name.charAt(0) : fallbackChar;

  return (
    <div className="cursor-pointer self-center focus:outline-0">
      {typeof photo === "string" && photo.trim() !== "" ? (
        <Image
          src={photo}
          alt={name ? name : "user"}
          height={20}
          width={20}
          className="rounded-full"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-[#d1d5d8] border border-gray-400 dark:border-gray-800 text-gray-50 flex justify-center items-center focus:outline-0">
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
