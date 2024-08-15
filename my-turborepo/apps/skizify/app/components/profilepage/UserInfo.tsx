"use client";
import { Avatar } from "@repo/ui/avatar";

import { Separator } from "../../../@/components/ui/separator";
import { Button } from "../../../@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import React from "react";
interface Review {
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
}

export default function UserInfo({
  username,
  userImage,
  name,
  reviewsReceived,
  bio,
  education,
}: UserInfoProps) {
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 ">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 ">
          <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-6">
              <div className="flex-col items-center gap-6">
                <Avatar name={name} photo={userImage} classname="size-48 text-8xl mb-5  "/>
                <div className="grid gap-1">
                  <h1 className="text-3xl font-bold">{name}</h1>
                  <p className="text-muted-foreground">@{username}</p>
                </div>
              </div>
              <div className="prose text-muted-foreground max-w-[600px]">
                <p>
                  {bio}
                </p>
                <p>
                  {education}
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Programming</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>JavaScript</li>
                      <li>React</li>
                      <li>Node.js</li>
                      <li>TypeScript</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Design</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>Figma</li>
                      <li>Sketch</li>
                      <li>Adobe Creative Suite</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">DevOps</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>AWS</li>
                      <li>Docker</li>
                      <li>Kubernetes</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>AWS Certified Solutions Architect</li>
                      <li>Scrum Master Certified</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">Achievements</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Awards</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>Employee of the Year 2022</li>
                      <li>Hackathon Winner 2021</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Publications</h3>
                    <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                      <li>
                        <a href="#" className="font-medium hover:underline">
                          Building Scalable React Applications
                        </a>
                      </li>
                      <li>
                        <a href="#" className="font-medium hover:underline">
                          Optimizing Web Performance
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted w-full  py-12 md:py-24 lg:py-32">
          <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 ">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {reviewsReceived.length === 0 ? (
                <div className="text-muted-foreground">No reviews yet.</div>
              ) : (
                reviewsReceived.map((review) => (
                  <div key={review.id} className="grid gap-6">
                    <div className="flex gap-4">
                      <Avatar name={review.givenbyUser.name} photo={review.givenbyUser.userImage} classname="size-16 text-2xl  "/>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {review.givenbyUser.name}
                          <div className="text-muted-foreground flex items-center gap-1 text-xs font-semibold">
                            {[...Array(review.rating)].map((_, index) => ( 
                              <StarIcon key={index} className="h-4 w-4 fill-yellow-300" />
                            ))}
                            {[...Array(5 - review.rating)].map((_, index) => (
                              <StarIcon key={index} className="fill-muted h-4 w-4" />
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
                
            <Button onClick={() => setShowMoreReviews(!showMoreReviews)} variant="outline" >
                  {showMoreReviews ? "Show Less" : "Show More"}
                </Button>
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
