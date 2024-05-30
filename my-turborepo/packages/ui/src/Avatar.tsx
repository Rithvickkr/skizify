import Image from "next/image";
import { ReactNode } from "react";

interface AvatarProps {
    name : string
    photo? : any,
    altname : string,
}

export const Avatar = ({
    name,
    photo,
    altname
} : AvatarProps )=> {
    return (
        <div className="cursor-pointer self-center focus:outline-0">
                    {photo ? <Image src={photo} alt={altname} height ={20} width={20} className="rounded-full"/> :
                    <div className="h-10 w-10 rounded-full bg-[#d1d5d8] text-gray-50 flex justify-center items-center">
                        <div>
                        {name.charAt(0)}
                        </div>
                    </div>}
                </div>
    )
}