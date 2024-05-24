"use client"
import { signIn, signOut } from "next-auth/react";
export async function Appbar() {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/signin';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-black text-stone-100 mx-3">
          <button onClick={() => signIn()}>Sign in</button>
        </div>
        <div className="bg-black text-stone-100 mx-3">
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

//navigation is only used in client-side components
//router is only used in Server components

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