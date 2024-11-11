"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { GigStatus } from "@repo/store/types";
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
import {
  CalendarRange,
  Clock7,
  Copy,
  ExternalLink,
  Share2,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../@/components/ui/tooltip";

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
    <SheetContent
      side="right"
      className="animate-in slide-in-from-right fixed w-full translate-x-0 transform overflow-y-auto border-l bg-white p-0 text-neutral-900 transition-transform duration-1000 ease-in-out motion-reduce:transition-none dark:border-neutral-800 dark:bg-[#18181B] dark:text-white md:w-[600px]"
    >
      <div className="animate-in slide-in-from-right flex h-full flex-col duration-300">
        {/* Header Section */}
        <div className="sticky top-0 z-10 flex flex-col items-start justify-between border-b border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-[#18181B] sm:flex-row sm:items-center">
          <div className="flex w-full items-center space-x-3 sm:w-auto">
            <Avatar className="h-8 w-8 bg-neutral-100 dark:bg-neutral-800 sm:h-10 sm:w-10">
              <AvatarImage
                src={meeting.Skizzer.userImage || "/placeholder-logo.png"}
                alt="Skizzer Avatar"
              />
              <AvatarFallback>
                {meeting.Skizzer.name?.substring(0, 2).toUpperCase() || "SK"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-sm font-semibold sm:text-base">
                {meeting.Skizzer.name}
              </h2>
              <p className="max-w-[180px] truncate text-xs text-neutral-600 dark:text-neutral-400 sm:max-w-none sm:text-sm">
                {meeting.Skizzer.email}
              </p>
            </div>
          </div>
          <div className="absolute right-2 top-3 sm:static">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      const button = document.getElementById("copyButton");
                      if (button) {
                        button.innerHTML = "Copied!";
                        setTimeout(() => {
                          button.innerHTML = "Copy Link";
                        }, 2000);
                      }
                    }}
                    className="group relative text-neutral-600 transition-all duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <Copy className="h-4 w-4 transition-transform group-hover:scale-110 sm:h-5 sm:w-5" />
                    <span id="copyButton" className="sr-only">
                      Copy Link
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black px-2 text-white dark:bg-white dark:text-black">
                  <p>Copy meeting link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-3 sm:p-4">
            {/* Event Image */}
            <div className="aspect-video w-full overflow-hidden rounded-lg sm:aspect-square">
              <img
                src={
                  "https://skizify-bucket.s3.ap-south-1.amazonaws.com/Screenshot+2024-11-09+at+10.53.03%E2%80%AFPM.png"
                }
                alt="Meeting Cover"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Event Title */}
            <div className="text-left">
              <h1 className="text-lg font-bold sm:text-2xl">
                {meeting.gig.title}
              </h1>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {meeting.gig.category}
              </p>
            </div>

            {/* Date and Location */}
            <div className="space-y-3 rounded-lg dark:bg-neutral-900">
              <div className="flex items-center space-x-3 rounded-lg bg-neutral-200 p-3 dark:bg-neutral-800">
                <CalendarRange className="h-4 w-4 text-neutral-600 dark:text-neutral-400 sm:h-5 sm:w-5" />
                <div>
                  <p className="text-sm font-medium sm:text-base">
                    {format(meetingDate, "EEEE dd MMMM")}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {format(meetingDate, "h:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-neutral-200 p-3 dark:bg-neutral-800">
                <Clock7 className="h-4 w-4 text-neutral-600 dark:text-neutral-400 sm:h-5 sm:w-5" />
                <div>
                  <p className="text-sm font-medium sm:text-base">Duration</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {meeting.gig.timeneeded} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Registration */}
            <div className="space-y-3 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-900">
              <h3 className="text-sm font-medium sm:text-base">
                Meeting Details
              </h3>
              <p className="rounded-lg bg-gradient-to-r from-green-100 to-green-200 px-3 py-2 text-sm font-medium text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-100 sm:text-base">
                Budget: ${meeting.budget}
              </p>
              <div className="flex items-center space-x-3 rounded-lg bg-white p-3 dark:bg-neutral-800">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={meeting.user.userImage || "/placeholder-avatar.png"}
                  />
                  <AvatarFallback>
                    {meeting.user.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs sm:text-sm">
                  {meeting.user.name} <br /> {meeting.user.email}
                </p>
              </div>
              <Button
                variant={"gooeyLeft"}
                className="w-full bg-neutral-900 py-4 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:text-base"
              >
                Join Meeting
              </Button>
            </div>

            {/* About Meeting */}
            <div className="space-y-3 pb-4">
              <h3 className="text-sm font-medium sm:text-base">
                About Meeting
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-sm">
                {meeting.gig.content}
              </p>
            </div>
          </div>
        </ScrollArea>
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
    category: string;
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
  let [selectedMeeting, setSelectedMeeting] =
    useState<meetingsInfo_interface | null>(null);

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
          className="border-neutral-400/45 px-6 py-2"
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
    meeting,
  }) => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative mb-4 cursor-pointer">
            <div className="absolute bottom-[-48px] left-[30px] top-0 z-0 w-[2px] border-l-2 border-dashed border-neutral-300 dark:border-neutral-600 sm:left-[60px]"></div>
            <div className="relative z-20 flex items-center">
              <div className="flex min-w-[80px] flex-col bg-white text-center dark:bg-black sm:min-w-[120px]">
                <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200 sm:text-2xl">
                  {time}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                  {date} • {day}
                </span>
              </div>
              <div className="mx-2 h-[1px] flex-grow bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 sm:mx-4"></div>
            </div>
            <div className="ml-[50px] mt-3 sm:ml-[100px]">
              <div className="rounded-lg border border-neutral-200 bg-gradient-to-tr from-white to-neutral-50 p-2 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-neutral-700 dark:from-neutral-900 dark:to-black sm:p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <div className="h-20 w-20 animate-pulse overflow-hidden rounded-lg bg-neutral-300 dark:bg-neutral-900 sm:h-24 sm:w-24">
                    <img
                      src={
                        "https://skizify-bucket.s3.ap-south-1.amazonaws.com/Screenshot+2024-11-09+at+10.53.03%E2%80%AFPM.png"
                      }
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold dark:text-white sm:text-lg">
                        {title}
                      </h3>
                      {price && (
                        <span className="whitespace-nowrap rounded-full bg-gradient-to-r from-green-100 to-green-200 px-2 py-1 text-[10px] font-medium text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-100 sm:px-3 sm:text-sm">
                          {price}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-neutral-600 dark:text-neutral-300 sm:space-y-2 sm:text-sm">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="truncate">{organizer}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock7 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {duration == "60"
                            ? "1 Hr"
                            : `${duration.slice(0, 2)} min`}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <Tag className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate">{meeting.gig.category}</span>
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
        <ScrollArea className="col-start-0 mb-4 flex-1 rounded-xl border border-black px-0 pl-2 pt-5 dark:border-neutral-600 sm:pt-10 md:mb-0 md:mt-0 md:p-4 md:pl-2 md:pt-0 xl:col-span-2">
            <h1 className="bg-gradient-to-r from-neutral-900 mt-3 ml-3 via-neutral-600 to-neutral-400 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:via-neutral-300 dark:to-neutral-900 sm:text-4xl">
            Meeting Dashboard
            </h1>
          <div className="mx-0 my-1  rounded-lg dark:bg-transparent sm:m-3">
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
