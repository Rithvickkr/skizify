import getInfos from "../../../lib/actions/getinfos";
import UserInfo from "../../../components/profilepage/UserInfo";
import { Review } from "../../../components/profilepage/UserInfo";
interface AboutParams {
  UserId: string;
}

export default async function about({ params }: { params: AboutParams }) {
  const infos = await getInfos(params.UserId);

  if (!infos) {
    return <div>User doesn't exist</div>;
  }

  const reviewsReceived: Review[] = infos.reviewsReceived.map(
    (review: any) => ({
      id: review.id,
      content: review.content,
      rating: review.rating,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      givento: review.givento,
      givenby: review.givenby,
      givenbyUser: {
        name: review.givenbyUser.name,
        userImage: review.givenbyUser.userImage,
        username: review.givenbyUser.username,
      },
    }),
  );

  return (
    <div className="min-h-screen p-4">
      <UserInfo
        name={infos.name ?? ""}
        username={infos.username ?? ""}
        bio={infos.bio ?? ""}
        education={infos.education ?? ""}
        userImage={infos.userImage}
        reviewsReceived={reviewsReceived}
        skills={infos.skills}
      />
    </div>
  );
}
