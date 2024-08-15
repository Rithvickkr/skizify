import getInfos from "../../../lib/actions/getinfos";

import UserInfo from "../../../components/profilepage/UserInfo";

export default async function about({ params }: { params: any }) {
    
  const infos = await getInfos(params.UserId);
  console.log(infos);
   
  if (!infos) {
    return <div>User doesn't exist</div>;
  }
  
  
  return (
    <div className="min-h-screen  p-4">
      
      
      <UserInfo
        name={infos.name ?? ''}
        username={infos.username ?? ''}
        bio={infos.bio ?? ''}
        education={infos.education ?? ''}
        userImage={infos.userImage}
        reviewsReceived={infos.reviewsReceived  }
       
      />
    </div>
  );
}
