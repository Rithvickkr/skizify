"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../../../@/components/ui/avatar";

import { Separator } from "../../../@/components/ui/separator";
import { Button } from "../../../@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Progress } from "../../../@/components/ui/progress";
import { CalendarCheckIcon, ChevronRightIcon } from "lucide-react";
import NumberTicker from "../../../@/components/magicui/number-ticker";
export interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  givento: string;
  givenby: string;
  givenbyUser: {
    name: string;
    userImage: string;
    username: string;
  };
}
interface UserInfoProps {
  username: string;
  userImage: string | null;
  name: string;
  reviewsReceived: Review[];
  bio: string;
  education: string;
  skills: string[];
}

export default function UserInfo({
  username,
  userImage,
  name,
  reviewsReceived,
  bio,
  education,
  skills,
}: UserInfoProps) {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(4);

  const loadMoreReviews = () => {
    setVisibleReviewsCount((prevCount) =>
      Math.min(prevCount + 4, reviewsReceived.length),
    );
  };

  const reviewsToShow = reviewsReceived.slice(0, visibleReviewsCount);

  function calculateRatingsSummary(reviewsReceived: Review[]) {
    if (reviewsReceived.length === 0) {
      return {
        averageRating: 0,
        starPercentages: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    }

    const totalReviews = reviewsReceived.length;
    const ratingCounts: { [key: number]: number } = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    let totalRating = 0;

    // Count each star rating and calculate the total rating
    reviewsReceived.forEach((review) => {
      const rating = review.rating;
      if (ratingCounts[rating] !== undefined) {
        ratingCounts[rating]++;
        totalRating += rating;
      }
    });

    // Calculate average rating
    const averageRating = Math.round((totalRating / totalReviews) * 10) / 10;

    // Calculate percentage for each star rating
    const starPercentages = {
      5: ratingCounts[5]
        ? Math.round((ratingCounts[5] / totalReviews) * 1000) / 10
        : 0,
      4: ratingCounts[4]
        ? Math.round((ratingCounts[4] / totalReviews) * 1000) / 10
        : 0,
      3: ratingCounts[3]
        ? Math.round((ratingCounts[3] / totalReviews) * 1000) / 10
        : 0,
      2: ratingCounts[2]
        ? Math.round((ratingCounts[2] / totalReviews) * 1000) / 10
        : 0,
      1: ratingCounts[1]
        ? Math.round((ratingCounts[1] / totalReviews) * 1000) / 10
        : 0,
    };

    return {
      averageRating,
      starPercentages,
    };
  }
  const averageRating = calculateRatingsSummary(reviewsReceived).averageRating;
  const starPercentages =
    calculateRatingsSummary(reviewsReceived).starPercentages;
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-6">
              <div className="flex-col items-center gap-6">
                <Avatar className="size-48 text-8xl mb-5">
                  <AvatarImage src={userImage || undefined} alt={name} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <p className="text-muted-foreground">@{username}</p>
                </div>
              </div>
              <div className="prose text-muted-foreground max-w-[600px]">
                <p>{bio}</p>
                <p>{education}</p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Skills</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {   skills.length!=0?skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-lg p-4 bg-stone-400  dark:bg-slate-800 text-center"
                    >
                      <h3 className="text-lg font-semibold">{skill}</h3>
                    </div>
                  )):<div className=" bg-muted rounded-lg p-4 text-muted-foreground  bg-stone-400 dark:bg-slate-800 text-center  "> <h3 className="text-lg font-semibold">No Skill yet</h3></div>}
                </div>
              </div>

              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-muted-foreground  bg-stone-400 dark:bg-slate-800 text-center">
                    <h3 className="text-lg font-semibold">Eductaion</h3>
                    <p>{education}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-muted-foreground  bg-stone-400 dark:bg-slate-800 text-center">
                    <h3 className="text-lg font-semibold">Qualification</h3>
                    <p>Undergraduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
          <div className="container row gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 ">
          <div className="flex items-center justify-center">
              <Card className="w-full max-w-2xl">
                <CardHeader className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl font-bold text-primary-foreground dark:bg-white dark:text-black">
                    {averageRating}
                  </div>
                  <div className="grid gap-1 text-center">
                    <CardTitle className="text-2xl font-semibold">
                      Customer Reviews
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Based on {reviewsReceived.length} reviews
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-amber-400" />
                      <span className="font-medium">5 stars</span>
                    </div>
                    <Progress value={starPercentages[5]} className="w-32" />
                    <span className="text-muted-foreground">
                      {starPercentages[5]}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-amber-400" />
                      <span className="font-medium">4 stars</span>
                    </div>
                    <Progress value={starPercentages[4]} className="w-32" />
                    <span className="text-muted-foreground">
                      {starPercentages[4]}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-amber-400" />
                      <span className="font-medium">3 stars</span>
                    </div>
                    <Progress value={starPercentages[3]} className="w-32" />
                    <span className="text-muted-foreground">
                      {starPercentages[3]}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-amber-400" />
                      <span className="font-medium">2 stars</span>
                    </div>
                    <Progress value={starPercentages[2]} className="w-32" />

                    <span className="text-muted-foreground">
                      {starPercentages[2]}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 fill-amber-400" />
                      <span className="font-medium">1 star</span>
                    </div>
                    <Progress value={starPercentages[1]} className="w-32" />
                    <span className="text-muted-foreground">
                      {starPercentages[1]}%
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center p-6">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="h-10 w-10 dark:fill-black" />
                    <div>
                      <div className="p-1 text-5xl font-bold">
                        <NumberTicker value={100} />
                      </div>
                      <div className="text-muted-foreground">
                        Meetings Completed
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-6 pb-4">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {reviewsToShow.length === 0 ? (
                <div className="text-muted-foreground">No reviews yet.</div>
              ) : (
                reviewsToShow.map((review) => (
                  <div key={review.id} className="grid gap-6">
                    <div className="flex gap-4 p-2 ">
                      <Avatar className="size-16 text-2xl">
                        <AvatarImage src={review.givenbyUser.userImage || undefined} alt={review.givenbyUser.name} />
                        <AvatarFallback>{review.givenbyUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1  ">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {review.givenbyUser.name}
                          <div className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                            {[...Array(review.rating)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className="h-4 w-4 fill-yellow-300"
                              />
                            ))}
                            {[...Array(5 - review.rating)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className="fill-muted h-4 w-4"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          "{review.content}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {visibleReviewsCount < reviewsReceived.length && (
                <Button onClick={loadMoreReviews} variant="outline">
                  Show More
                </Button>
              )}
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
