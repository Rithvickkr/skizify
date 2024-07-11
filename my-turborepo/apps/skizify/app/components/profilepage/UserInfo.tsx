import React from 'react';
import { Avatar } from "@repo/ui/avatar";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  givento: string;
  givenby: string;
}

interface UserInfoProps {
  userImage: string | null;
  name: string;
  reviewsReceived: Review[];
  bio: string;
  education: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ userImage, name, reviewsReceived, bio, education }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <Avatar name={name} photo={userImage} classname="size-24 text-5xl self-center" />
        <h1 className="text-2xl font-bold mt-4">{name}</h1>
        <p className="mt-2 text-gray-600">{bio}</p>
        <p className="mt-2 text-gray-600">{education}</p>
      </div>
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <ul className="mt-4 space-y-4">
          {reviewsReceived.map(review => (
            <li key={review.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold">{review.rating} ⭐</span>
                <span className="ml-2 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
