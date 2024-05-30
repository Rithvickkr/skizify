"use client"
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({href , title , icon} :  { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname(); //THIS IS SMART 
    const selected = pathname === href;
    return (
        <div className={`flex ${selected ? "text-neutral-800 dark:text-white" : "text-[#a9aeb6] hover:text-gray-500"} cursor-pointer` }>
            <div className={`pl-8 px-6 py-3 m-1`} onClick={() => router.push(href)}>{icon}</div>
            <div className={`py-3 font-display text-lg m-1 truncate hidden sm:block`} onClick={() => router.push(href)}>{title}</div>
            <span className="sr-only">{title}</span>{/*This will not display to Users Visually but can be read by Blind Person Just like alt in the Img tag*/}
        </div>
    )
}
//after the Screen is Shrink is below sm , then the Text written with Icons Disappear