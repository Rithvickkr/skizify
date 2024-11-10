"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { GigStatus } from "@repo/store/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { CalendarRange, Clock7 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Meeting from "./MeetingCalendar";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../../@/components/ui/sheet";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Attendee {
  name: string;
  image: string;
}

interface MeetingDetailsProps {
  meeting: meetingsInfo_interface;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ meeting }) => {
  const meetingDate = new Date(meeting.finalDateTime);
  
  return (
    <SheetContent side="right" className="w-[400px] bg-gradient-to-b from-neutral-900 to-black">
      <div className="flex flex-col h-full p-6">
        <div className="relative w-full h-48 mb-6 rounded-lg bg-neutral-300 dark:bg-neutral-900 animate-pulse overflow-hidden">
          <img 
            src={"https://skizify-bucket.s3.ap-south-1.amazonaws.com/Screenshot+2024-11-09+at+10.53.03%E2%80%AFPM.png"}
            alt={meeting.gig.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <h2 className="absolute bottom-4 left-4 text-2xl font-serif text-white">
            {meeting.gig.title}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-neutral-700">
                <AvatarImage src={meeting.user.userImage || "/api/placeholder/96/96"} />
                <AvatarFallback className="bg-neutral-800 text-neutral-200">
                  {meeting.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-neutral-200">Hosted by {meeting.user.name}</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-neutral-300 bg-neutral-800 rounded-full">
              US${meeting.budget}
            </span>
          </div>

          <div className="space-y-4 p-4 rounded-lg bg-neutral-800/50">
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-center">
                <CalendarRange className="mr-2 h-4 w-4" />
                <span>{format(meetingDate, "EEEE, MMMM d")}</span>
              </div>
              <div className="flex items-center">
                <Clock7 className="mr-2 h-4 w-4" />
                <span>{format(meetingDate, "h:mm a")}</span>
              </div>
              <div className="flex items-center">
                <Clock7 className="mr-2 h-4 w-4" />
                <span>Duration: {meeting.gig.timeneeded == 60 ? "1 hour" : `${meeting.gig.timeneeded} minutes`}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-400">Location</h3>
            <p className="text-neutral-300">{meeting.gig.content}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-400">Attendees</h3>
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-neutral-800">
                <AvatarImage src={meeting.user.userImage || "/api/placeholder/96/96"} />
                <AvatarFallback className="bg-neutral-800 text-neutral-200">
                  {meeting.user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-neutral-800">
                <AvatarImage src={meeting.Skizzer.userImage || "/api/placeholder/96/96"} />
                <AvatarFallback className="bg-neutral-800 text-neutral-200">
                  {meeting.Skizzer.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

//Data from the GigUser table
export interface meetingsInfo_interface {
  id: string;
  gigId: string;
  skizzerId: string;
  UserId: string;
  status: GigStatus;
  budget: number;
  finalDateTime: Date;
  user: {
    id: string;
    name: string | null;
    userImage: string | null;
    email: string | null;
  };
  Skizzer: {
    id: string;
    name: string | null;
    userImage: string | null;
    email: string | null;
  };
  gig: {
    title: string;
    content: string;
    timeneeded: number;
  };
}

export default function Calendar({
  meetings,
}: {
  meetings: meetingsInfo_interface[];
}) {
  const router = useRouter();
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState<Date>(today);
  let [showAllMeetings, setShowAllMeetings] = useState(true);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let [selectedMeeting, setSelectedMeeting] = useState<meetingsInfo_interface | null>(null);

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const handleDayClick = (day: Date) => {
    if (isSameDay(selectedDay, day) && !showAllMeetings) {
      setShowAllMeetings(true);
    } else {
      setSelectedDay(day);
      setShowAllMeetings(false);
    }
  };

  const handleMeetingClick = (meeting: meetingsInfo_interface) => {
    setSelectedMeeting(meeting);
  };

  let displayedMeetings = showAllMeetings
    ? meetings
    : meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.finalDateTime.toISOString()), selectedDay),
      );

  const EmptyTimelineState = () => (
    <div className="flex h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 h-48 w-48">
        <CalendarRange className="h-full w-full animate-pulse text-neutral-300 dark:text-neutral-600" />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-neutral-700 dark:text-neutral-300">
        No Meetings Scheduled for this Day
      </h3>
      <p className="max-w-md text-neutral-500 dark:text-neutral-400">
        There are no meetings scheduled for{" "}
        {showAllMeetings ? "any date" : format(selectedDay, "MMMM d, yyyy")}.
        When you schedule meetings, they will appear here.
      </p>
      <div className="mt-6">
        <Button
          variant="outline"
          className="px-6 py-2 border-neutral-400/45"
          onClick={() => router.push("/explore")}
        >
          Schedule a Meeting
        </Button>
      </div>
    </div>
  );

  const TimelineEvent: React.FC<TimelineEventProps> = ({
    date,
    day,
    time,
    duration,
    title,
    organizer,
    location,
    price,
    attendees,
    image,
    meeting
  }) => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative mb-4 cursor-pointer">
            <div className="absolute bottom-[-48px] left-[60px] top-0 z-0 w-[2px] border-l-2 border-dashed border-neutral-300 dark:border-neutral-600"></div>
            <div className="relative z-20 flex items-center">
              <div className="flex min-w-[120px] flex-col bg-white text-center dark:bg-black">
                <span className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {time}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {date} • {day}
                </span>
              </div>
              <div className="mx-4 h-[1px] flex-grow bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600"></div>
            </div>
            <div className="ml-[100px] mt-3">
              <div className="rounded-lg border border-neutral-200 bg-gradient-to-tr from-white to-neutral-50 p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-neutral-700 dark:from-neutral-900 dark:to-black">
                <div className="flex gap-4">
                  <div className="h-24 w-24 overflow-hidden animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-900">
                  <img 
            src={"https://skizify-bucket.s3.ap-south-1.amazonaws.com/Screenshot+2024-11-09+at+10.53.03%E2%80%AFPM.png"}
                    alt={title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
                      {price && (
                        <span className="rounded-full bg-gradient-to-r from-green-100 to-green-200 px-3 py-1 text-sm font-medium text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-100">
                          {price}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {organizer}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {location}
                      </div>
                      <div className="flex items-center">
                          <Clock7 className="mr-2 h-4 w-4" />
                        {duration == "60" ? "1 Hr" : `${duration.slice(0, 2)} min`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetTrigger>
        <MeetingDetails meeting={meeting} />
      </Sheet>
    );
  };

  return (
    <div className="flex h-full w-full justify-center dark:bg-black">
      <div className="relative grid h-full w-full grid-cols-1 gap-2 md:gap-3 lg:gap-5 xl:grid-cols-3">
        <ScrollArea className="col-start-0 mb-4 flex-1 rounded-xl border border-black px-0 pl-2 pt-5 dark:border-neutral-600 sm:pt-10 md:mb-0 md:mt-0 md:p-4 md:pl-3 md:pt-0 lg:pl-5 xl:col-span-2">
          <div className="mx-0 my-2 min-h-screen rounded-lg p-3 dark:bg-transparent sm:m-3 md:p-5">
            {displayedMeetings.length > 0 ? (
              displayedMeetings.map((meeting) => {
                const meetingDate = new Date(meeting.finalDateTime);
                return (
                  <TimelineEvent
                    key={meeting.id}
                    date={format(meetingDate, "dd MMM")}
                    day={format(meetingDate, "EEEE")}
                    duration={meeting.gig.timeneeded.toString()}
                    time={format(meetingDate, "HH:mm")}
                    title={meeting.gig.title}
                    organizer={meeting.user.name || "Unknown"}
                    location={meeting.gig.content}
                    price={`US$${meeting.budget}`}
                    attendees={[
                      {
                        name: meeting.user.name || "Unknown",
                        image: meeting.user.userImage || "",
                      },
                      {
                        name: meeting.Skizzer.name || "Unknown",
                        image: meeting.Skizzer.userImage || "",
                      },
                    ]}
                    image={meeting.user.userImage || "/api/placeholder/96/96"}
                    meeting={meeting}
                  />
                );
              })
            ) : (
              <EmptyTimelineState />
            )}
          </div>
        </ScrollArea>

        <div className="mb-3 h-2/4 rounded-md border-black pl-2 pr-3 pt-5 dark:border-neutral-600 dark:bg-transparent md:mb-0 md:w-[97%] md:pl-3 lg:w-[94%]">
          <div className="flex items-center">
            <div className="text-neutral-90 ml-0 mt-4 flex-auto text-2xl font-semibold dark:text-white md:ml-3">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </div>
            <button
              type="button"
              onClick={previousMonth}
              className="mt-3 flex flex-none items-center justify-center p-1.5 text-neutral-400 hover:text-neutral-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-mr-1.5 ml-2 mt-3 flex flex-none items-center justify-center p-1.5 text-neutral-400 hover:text-neutral-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-7 text-center text-xs font-semibold leading-6 dark:text-white">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="mt-2 grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "",
                )}
              >
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={classNames(
                    isEqual(day, selectedDay) &&
                      "text-white dark:bg-white dark:text-black",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-black dark:bg-white dark:text-black",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500 dark:bg-red-800",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-neutral-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-neutral-400 dark:text-white",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-red-700 dark:bg-red-800 dark:text-white",
                    !isEqual(day, selectedDay) &&
                      "hover:bg-neutral-100 dark:text-white dark:hover:bg-lightdark",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "flex h-12 w-full items-center justify-center rounded ring-1 ring-black transition-all duration-500 hover:scale-[1.03]",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </Button>

                <div className="mx-auto mb-1 h-1 w-1">
                  {meetings.some((meeting) =>
                    isSameDay(
                      parseISO(meeting.finalDateTime.toISOString()),
                      day,
                    ),
                  ) && (
                    <div className="mt-1 h-1 w-1 rounded-full bg-sky-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

interface TimelineEventProps {
  date: string;
  day: string;
  time: string;
  title: string;
  organizer: string;
  location: string;
  price?: string;
  attendees?: Attendee[];
  image: string;
  duration: string;
  meeting: meetingsInfo_interface;
}
