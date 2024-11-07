import { Avatar } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import AvatarUploader from "../../components/AvatarUploader";
import { authOptions } from "../../lib/auth";


export default async function AvatarPage() {
    const session = await getServerSession(authOptions);

  return (
    <div>
        {session && <AvatarUploader user={session.user} />}
    </div>
  );
}