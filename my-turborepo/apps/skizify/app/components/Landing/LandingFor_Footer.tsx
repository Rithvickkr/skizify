"use client"

import { Button } from "../ui/button"


export default function Landing() {
  return (
    <div 
      className='relative h-[100vh]'
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className='fixed bottom-0 h-full w-full'>
        wepgfmowkeng
        <Button
         className="px-2 py-2">Click me</Button>
      </div>
    </div>
  )
}