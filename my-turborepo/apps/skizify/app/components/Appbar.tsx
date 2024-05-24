"use client"
import { signIn, signOut, useSession } from "next-auth/react"


export function Appbar() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <div className="flex">
        <div className="bg-black text-stone-100">
      <button onClick={() => signOut()}>Sign out</button>
        </div>
        <div className="bg-black text-stone-100">
      <button onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
    </div>
  )
}
