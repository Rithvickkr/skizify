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

//That's HOW IT LOOKS IN useSession
// {
//     data: {
//       user: {
//         name: 'yash',
//         email: '09438509345',
//         id: 'c60a7ce3-4969-4021-9496-ae9fb98eff8a'
//       },
//       expires: '2024-06-23T10:19:53.640Z'
//     },
//     status: 'authenticated'
//   }