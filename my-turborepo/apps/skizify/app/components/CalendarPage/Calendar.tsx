"use client";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add, //On Bottom of the page
  eachDayOfInterval, //Return the array of dates within the specified time interval
  endOfMonth, //     const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0)) //=> Tue Sep 30 2014 23:59:59.999
  format, //give shape to the Date&Time by getting month, year and many more //https://date-fns.org/v3.6.0/docs/format
  getDay, //Get the day of the week of the given date, 0,1,2
  isEqual, //Are the given dates equal? //T/F
  isSameDay, //Are the given dates in the same day (and year and month)? //return T/F
  isSameMonth, //Are the given dates in the same month (and year)? //T/F
  isToday, // Is the given date today? //T/F
  parse, //Converts a string into a JS Date object
  parseISO, // Bottom of the page, convert String into Dateobject
  startOfToday, //Return the start of today.
} from "date-fns";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import Meeting from "./MeetingCalendar";
import { meetingsInfo_interface } from "@repo/store/types";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { Avatar } from "@repo/ui/avatar";
import { CalendarRange } from "lucide-react";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Attendee {
  name: string;
  image: string;
}

export default function Calendar({
  meetings,
}: {
  meetings: meetingsInfo_interface[];
}) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  //for June Month , this is logging   new Date('2024-05-31T18:30:00.000Z') 🥶🥶🥶🥶// THIS IS DISPLAYING Time acc to UTC 🥶🥶🥶🥶
  //if you are in India, your time zone is UTC+5:30. This means your local time is 5 hours and 30 minutes ahead of UTC.

  // If your local time zone is ahead of UTC, midnight in your local time can appear as the previous day in UTC.

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

  //It will filter the Today meeetings
  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.finalDateTime.toISOString()), selectedDay),
  );


  const TimelineEvent: React.FC<TimelineEventProps> = ({
    date,
    day,
    time,
    title,
    organizer,
    location,
    price,
    attendees,
    image,
  }) => (
    <div className="group relative pb-8">
      <div className="absolute left-0 h-full w-px bg-neutral-700">
        <div className="shadow-glow-neutral absolute left-0 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-neutral-600 dark:bg-neutral-400"></div>
        <div
          className="absolute left-0 top-0 h-full w-px bg-white dark:bg-gray-500"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(25,25,25) 50%, transparent 50%)",
            backgroundSize: "1px 10px",
          }}
        ></div>
      </div>
      <div className="relative pl-8">
        <div className="mb-2">
          <div className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
            {date}{" "}
            <span className="bg-gradient-to-r from-black to-v0dark bg-clip-text text-transparent dark:from-neutral-200 dark:to-neutral-500">
              {day}
            </span>
          </div>
        </div>
        <div className="group-hover:shadow-glow-blue cursor-pointer rounded-2xl border-1 bg-gradient-to-br from-white to-neutral-100/40 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-neutral-700 dark:from-neutral-800/50 dark:to-neutral-800/60 hover:dark:border-neutral-500">
          <div className="ml-1 mt-1 flex items-stretch">
            <div
              className="-ml-4 -mt-4 mb-4 h-24 w-24 rounded-l-lg bg-neutral-800 bg-gradient-to-br object-cover dark:from-neutral-400 dark:to-neutral-600"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            />
            <div className="flex-grow space-y-2 pl-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="md:ext-2xl text-lg font-bold">{time}</p>
                </div>
                {price && (
                  <div className="rounded bg-green-400/10 px-2 py-1 text-xs font-semibold text-[#208645] dark:bg-[#1c1c1c] md:text-sm">
                    {price}
                  </div>
                )}
              </div>{" "}
              <h3 className="md::text-2xl text-lg font-bold text-black opacity-80 dark:text-white">
                {title}
              </h3>
              <div className="flex items-center text-xs text-neutral-400 md:text-base">
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
                <span>By {organizer}</span>
              </div>
              <div className="flex items-center text-xs text-neutral-400 md:text-base">
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
                <span>{location}</span>
              </div>
              <div className="flex items-center text-xs text-neutral-400 md:text-base">
                <CalendarRange className="mr-2 h-4 w-4" />
                <span>Sept 18, Wednesday</span>
              </div>
            </div>
          </div>
          {attendees && (
            <div className="mt-2 flex items-center">
              {attendees.slice(0, 4).map((attendee, index) => (
                <div
                  key={index}
                  className={`relative -ml-3 size-7 rounded-full first:ml-0 ${
                    index > 0 ? "z-[" + (4 - index) + "]" : ""
                  }`}
                >
                  <Avatar
                    name={attendee.name}
                    photo={attendee.image}
                    classname="h-full w-full border-2 bg-lumadark dark:bg-zinc-300 dark:border-black ring-2 ring-transparent rounded-full" // No need to change this
                  />
                </div>
              ))}
              {attendees.length > 4 && (
                <div className="relative z-[1] -ml-2 mt-2 flex size-7 items-center justify-center rounded-full border-2 bg-lumadark text-xs font-bold text-white dark:border-black dark:bg-zinc-300 dark:text-black">
                  +{attendees.length - 4}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  

  return (
    <div className="flex h-full w-full justify-center bg-gradient-to-br dark:from-neutral-800/45 dark:via-black dark:to-neutral-800/45">
      <div className="relative grid h-full w-full grid-cols-1 gap-2 md:gap-3 lg:gap-5 xl:grid-cols-3">
        <div className="mb-4 flex-1 rounded border border-black p-3 pl-2 pt-10 dark:border-neutral-600 md:col-span-2 md:mb-0 md:mt-0 md:pl-3 md:pt-0 lg:pl-5">
            <div className="mt-3 truncate text-2xl font-semibold text-neutral-900 dark:text-neutral-200">
              Meetings for
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </div>
            <div className="mt-4 cursor-pointer space-y-1 text-sm leading-6 text-neutral-500">
              {selectedDayMeetings.length > 0 ? (
                <div className="h-[330px] overflow-y-auto rounded-md">
                  {selectedDayMeetings.map((meeting) => (
                    <div key={meeting.id}>
                      <Meeting meeting={meeting} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No meetings for today.</p>
              )}
            </div>
          </div>

        {/* <ScrollArea className="col-start-0 mb-4 flex-1 rounded-xl border border-black px-0 pl-2 pt-5 dark:border-neutral-600 sm:pt-10 md:mb-0 md:mt-0 md:p-4 md:pl-3 md:pt-0 lg:pl-5 xl:col-span-2">
          <Timeline />
        </ScrollArea> */}

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
            {days.map(
              (
                day,
                dayIdx, //dayIdx is like start from 0 --> end of Monthnumber, watch this as I don't know where dayIdx came from ,as It is also not in array
              ) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    //GREAT LOGIC :- at start dayIdx will be zero , thus we will change the starting of column
                    dayIdx === 0 && colStartClasses[getDay(day)], //means it will start from that column of the grid associated with week day
                    "",
                  )}
                >
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      //This is How to put conditions in Classname in tailwind
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
                      <div className="mt-1 h-1 w-1 rounded-full bg-sky-500"></div> //Display dot below calendar
                    )}
                  </div>
                </div>
              ),
            )}
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

// const result = add(new Date(2014, 8, 1, 10, 19, 50), {
//   years: 2,
//   months: 9,
//   weeks: 1,
//   days: 7,
//   hours: 5,\\-7
//   minutes: 9,
//   seconds: 30,
// })
// //=> Thu Jun 15 2017 15:29:20

//new Date(2014, 8, 1, 10, 19, 50)
// Year: 2014
// Month: September
// Day: 1
// Hour: 10 AM
// Minutes: 19
// Seconds: 50

// parse is used to create a Date object from a string
// format is used to create a string from a Date object

//parseISO  => convert normal string into DateObject
// const result1 = parseISO('2023-06-23T18:45:00');
// //=> Fri Jun 23 2023 18:45:00



const Timeline: React.FC = () => {
  return (
    <div className="mx-0 my-2 min-h-screen rounded-lg p-3 dark:bg-transparent sm:m-3 md:p-5">
      <TimelineEvent
        date="18 Sept"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG & ECOMM Celebration"
        organizer="Bill Murphy & Marc Nathan"
        location="Inn Cahoots"
        price="US$25"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
        image="/api/placeholder/96/96"
      />
      <TimelineEvent
        date="16 Oct"
        day="Wednesday"
        time="17:30"
        title="TurnUp CPG Happy Hour"
        organizer="Bill Murphy"
        location="Hi Sign Brewing"
        price="US$25"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
        image="/api/placeholder/96/96"
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        image="/api/placeholder/96/96"
        price="US$25"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        price="US$25"
        image="/api/placeholder/96/96"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        price="US$25"
        image="/api/placeholder/96/96"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        price="US$25"
        image="/api/placeholder/96/96"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        price="US$25"
        image="/api/placeholder/96/96"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
      <TimelineEvent
        date="11 Dec"
        day="Wednesday"
        time="18:00"
        title="TurnUP! CPG X ECOMM Holiday Party"
        organizer="Bill Murphy"
        location="Location TBA"
        price="US$25"
        image="/api/placeholder/96/96"
        attendees={[
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
          { image: "", name: "YASH" },
        ]}
      />
    </div>
  );
};


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
}




const TimelineEvent: React.FC<TimelineEventProps> = ({
  date,
  day,
  time,
  title,
  organizer,
  location,
  price,
  attendees,
  image,
}) => (
  <div className="group relative pb-8">
    <div className="absolute left-0 h-full w-px bg-neutral-700">
      <div className="shadow-glow-neutral absolute left-0 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-neutral-600 dark:bg-neutral-400"></div>
      <div
        className="absolute left-0 top-0 h-full w-px bg-white dark:bg-gray-500"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(25,25,25) 50%, transparent 50%)",
          backgroundSize: "1px 10px",
        }}
      ></div>
    </div>
    <div className="relative pl-8">
      <div className="mb-2">
        <div className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
          {date}{" "}
          <span className="bg-gradient-to-r from-black to-v0dark bg-clip-text text-transparent dark:from-neutral-200 dark:to-neutral-500">
            {day}
          </span>
        </div>
      </div>
      <div className="group-hover:shadow-glow-blue cursor-pointer rounded-2xl border-1 bg-gradient-to-br from-white to-neutral-100/40 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 dark:border-neutral-700 dark:from-neutral-800/50 dark:to-neutral-800/60 hover:dark:border-neutral-500">
        <div className="ml-1 mt-1 flex items-stretch">
          <div
            className="-ml-4 -mt-4 mb-4 h-24 w-24 rounded-l-lg bg-neutral-800 bg-gradient-to-br object-cover dark:from-neutral-400 dark:to-neutral-600"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          />
          <div className="flex-grow space-y-2 pl-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="md:ext-2xl text-lg font-bold">{time}</p>
              </div>
              {price && (
                <div className="rounded bg-green-400/10 px-2 py-1 text-xs font-semibold text-[#208645] dark:bg-[#1c1c1c] md:text-sm">
                  {price}
                </div>
              )}
            </div>{" "}
            <h3 className="md::text-2xl text-lg font-bold text-black opacity-80 dark:text-white">
              {title}
            </h3>
            <div className="flex items-center text-xs text-neutral-400 md:text-base">
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
              <span>By {organizer}</span>
            </div>
            <div className="flex items-center text-xs text-neutral-400 md:text-base">
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
              <span>{location}</span>
            </div>
            <div className="flex items-center text-xs text-neutral-400 md:text-base">
              <CalendarRange className="mr-2 h-4 w-4" />
              <span>Sept 18, Wednesday</span>
            </div>
          </div>
        </div>
        {attendees && (
          <div className="mt-2 flex items-center">
            {attendees.slice(0, 4).map((attendee, index) => (
              <div
                key={index}
                className={`relative -ml-4 size-7 rounded-full first:ml-0 ${
                  index > 0 ? "z-[" + (4 - index) + "]" : ""
                }`}
              >
                <Avatar
                  name={attendee.name}
                  photo={attendee.image}
                  classname="h-full w-full border-2 bg-lumadark dark:bg-zinc-300 dark:border-black ring-2 ring-transparent rounded-full" // No need to change this
                />
              </div>
            ))}
            {attendees.length > 4 && (
              <div className="relative z-[1] -ml-2 mt-2 flex size-7 items-center justify-center rounded-full border-2 bg-lumadark text-xs font-bold text-white dark:border-black dark:bg-zinc-300 dark:text-black">
                +{attendees.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);
