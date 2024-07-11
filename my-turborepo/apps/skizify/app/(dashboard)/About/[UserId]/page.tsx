import getInfos from "../../../lib/actions/getinfos";

import UserInfo from "../../../components/profilepage/UserInfo";
export default async function about({ params }: { params: any }) {
    
  const infos = await getInfos(params.UserId);
  if (!infos) {
    return <div>User doesn't exist</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <UserInfo
        name={infos.name ?? ""}
        userImage={infos.userImage}
        reviewsReceived={infos.reviewsReceived}
        bio={infos.bio ?? ""}
        education={infos.education ?? ""}
      />
    </div>
  );
}
