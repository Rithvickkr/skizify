import EnhancedMyProfileSection from "../../components/Myprofilepage";
import Newprofile from "../../components/Profile2new";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getInfos from "../../lib/actions/getinfos";
import { DrawerDialogDemo } from "../../components/darwerform";

interface User {
  name?: string | null;
  userImage?: string | null;
}

export interface ProfilePageProps {
  user: User;
  region: string;
  accessKey: string;
  secretAccessKey: string;
  bucketName: string;
}


export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const datauser = session?.user.id ? await getInfos(session.user.id) : null;
  const info : ProfilePageProps = {
    user: session?.user || {},
    region: process.env.AWS_BUCKET_REGION || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    accessKey: process.env.AWS_ACCESS_KEY || "",
    bucketName: process.env.AWS_BUCKET_NAME || ""
  }

  return (
    <div>
      <EnhancedMyProfileSection datauser={datauser} info={info} />
      {/* <DrawerDialogDemo skills={[]} langs={[]} /> */}
    </div>
  );
}

