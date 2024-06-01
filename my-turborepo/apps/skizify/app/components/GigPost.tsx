import { Button } from "@repo/ui/button"
import { SVGProps } from "react"
import SwitchTheme from "./SwitchTheme"
export default function GigPost(){
    return (
        <div>
        <header className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold font-display">Post a Tutoring Gig</h1>
          <button type="button">
            <XIcon className="h-6 w-6 cursor-pointer" />
            <span className="sr-only">Close</span>
          </button>
        </header>
        <div className="flex flex-col">
          <div></div>
        </div>
        </div>
    )
}
//Defined a Header
function XIcon(props : JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }