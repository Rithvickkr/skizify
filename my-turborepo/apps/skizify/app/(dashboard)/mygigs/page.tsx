import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import getgigs from "../../lib/actions/getgigs";

export default async function () {
  const gigs: any = await getgigs();
  console.log(gigs);

  const formatTimeInterval = (hours: number, minutes: number) => {
    const totalMinutes = Math.floor(hours * 60 + minutes); // Convert hours to minutes and add the extra minutes
    const formattedHours = Math.floor(totalMinutes / 60); // Calculate total hours
    const formattedMinutes = totalMinutes % 60; // Get the remainder for minutes
    const paddedMinutes = String(formattedMinutes).padStart(2, "0");
    return `${formattedHours}:${paddedMinutes}`;
  };

  return (
    <div>
      {gigs.map((gig: any) => (
        <div className="p-5" key={gig.id}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{gig.title}</CardTitle>
            </CardHeader>
            <CardContent>{gig.content}</CardContent>
            <CardContent>
              {formatTimeInterval(gig.Interval.hours, gig.Interval.minutes)}
            </CardContent>
            <CardContent>Accepted by - {gig.acceptedbyId}</CardContent>
            <CardFooter>{new Date(gig.startDateTime).toLocaleString()}</CardFooter>
            <CardFooter>{new Date(gig.endDateTime).toLocaleString()}</CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
