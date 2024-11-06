import MyProfileSection from "../../components/Myprofilepage";
import Newprofile from "../../components/Profile2new";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getInfos from "../../lib/actions/getinfos";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const datauser = session?.user.id ? await getInfos(session.user.id) : null;
  return (
    <div>
      <MyProfileSection datauser={datauser}/>
    </div>
  );
}
