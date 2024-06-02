
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if(session?.user){
    redirect('/explore');
  }else{
    redirect('/api/auth/signin');
  }
}

//Big task was to import the recoil from packages folder

//We are using redirect for redirecting
//we could have also use router.push

//That's how session looks in getServerSession
// {
//   user: {
//     name: 'yash',
//     email: '09438509345',
//     image: undefined,
//     id: 'c60a7ce3-4969-4021-9496-ae9fb98eff8a'
//   }
// }