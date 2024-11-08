import { Avatar } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import AvatarUploader from "../../components/AvatarUploader";
import { authOptions } from "../../lib/auth";


export default async function AvatarPage() {
    const session = await getServerSession(authOptions);

  return (
    <div>
      {session && (
        <AvatarUploader
          user={session.user}
          region={process.env.AWS_BUCKET_REGION || ""}
          secretAccessKey={process.env.AWS_SECRET_ACCESS_KEY || ""}
          accessKey={process.env.AWS_ACCESS_KEY || ""}
          bucketName={process.env.AWS_BUCKET_NAME || ""}
        />
      )}
    </div>
  );
}