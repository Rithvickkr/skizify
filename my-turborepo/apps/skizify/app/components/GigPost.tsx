// "use client";
// import React, { useState } from "react";
// import { useSession } from "next-auth/react";
// import { UserRole } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { Button } from "../../@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../@/components/ui/card";

// import { Input } from "../../@/components/ui/input";
// import { Label } from "../../@/components/ui/label";
// import { GigSet } from "../lib/actions/setgig";

// export function GigPost() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [title, setTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [date, setDate] = useState<string>("");
//   const [time, setTime] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [endTime, setEndTime] = useState<string>("");

//   function calculateTimeInterval(startTime: string, endTime: string) {
//     // Convert times to Date objects on the same arbitrary date
//     const date = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
//     const startDateTime1 = new Date(`${date}T${startTime}:00`);
//     const endDateTime1 = new Date(`${date}T${endTime}:00`);

//     // Calculate the difference in milliseconds
//     const differenceInMilliseconds = endDateTime1.getTime() - startDateTime1.getTime();

//     // Convert milliseconds to other units
//     const differenceInSeconds = differenceInMilliseconds / 1000;
//     const differenceInMinutes = differenceInSeconds / 60;
//     const differenceInHours = differenceInMinutes / 60;

//     return {
//       milliseconds: differenceInMilliseconds,
//       seconds: differenceInSeconds,
//       minutes: differenceInMinutes,
//       hours: differenceInHours,
//     };
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (session) {
//       // Only calculate interval between time and endTime
//       const interval = calculateTimeInterval(time, endTime);
//       const startDateTime = new Date(`${date}T${time}:00`).toISOString();
//       const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString();

//       await GigSet(title, description,startDateTime,endDateTime, session, interval);

//       setTitle("");
//       setDescription("");
//       setDate("");
//       setTime("");
//       setEndDate("");
//       setEndTime("");
//       window.alert("Gig posted successfully");
//     }

//     console.log({
//       title,
//       description,
//       date,
//       time,
//       endDate,
//       endTime,
//     });
//   };

//   if (session?.user.role === UserRole.SKIZZER) {
//     router.push('/explore');
//     return <div></div>;
//   }

//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Post your gig</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <div className="w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="title of project"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="description">Description</Label>
//               <Input
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="this is my description"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="date">Date</Label>
//               <Input
//                 id="date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 placeholder="date of event"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="time">Time</Label>
//               <Input
//                 id="time"
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 placeholder="time of event"
//               />
//             </div>
//             <div className="flex items-center justify-center">
//               <Label htmlFor="endTimeslot">To</Label>
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="endDate">End Date</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 placeholder="end date of event"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="endTime">End Time</Label>
//               <Input
//                 id="endTime"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 placeholder="end time of event"
//               />
//             </div>
//           </div>
//           <CardFooter className="flex justify-between mt-5">
//             <Button variant="outline">Cancel</Button>
//             <Button type="submit" onClick={handleSubmit}>Post</Button>
//           </CardFooter>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
