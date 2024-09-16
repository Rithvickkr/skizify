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

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
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

  interface Attendee {
    avatar: string;
  }

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
    <div className="group relative pb-12">
      <div className="absolute left-0 h-full w-px bg-gradient-to-b from-purple-500 to-transparent">
        <div className="shadow-glow-purple absolute left-0 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-purple-500"></div>
        <div
          className="absolute left-0 top-0 h-full w-px"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(139, 92, 246, 0.5) 50%, transparent 50%)",
            backgroundSize: "1px 10px",
          }}
        ></div>
      </div>
      <div className="relative pl-8">
        <div className="mb-2">
          <div className="text-lg font-semibold text-purple-300">
            {date} <span className="text-purple-400">{day}</span>
          </div>
        </div>
        <div className="group-hover:shadow-glow-purple rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
          <div className="flex items-stretch">
            <div
              // src={image}
              // alt="Event"
              className="-ml-4 -mt-4 mb-4 h-24 w-24 dark:bg-white rounded-l-lg object-cover"
            />
            <div className="flex-grow space-y-2 pl-4">
              <div className="text-xl text-purple-300">{time}</div>
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <div className="flex items-center text-purple-400">
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
              <div className="flex items-center text-purple-400">
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
            </div>
          </div>
          {price && (
            <div className="mt-2 font-semibold text-green-400">{price}</div>
          )}
          {attendees && (
            <div className="mt-2 flex items-center">
              {attendees.slice(0, 4).map((attendee, index) => (
                <img
                  key={index}
                  src={attendee.avatar}
                  alt="Attendee"
                  className="-ml-2 h-8 w-8 rounded-full border-2 border-purple-500 first:ml-0"
                />
              ))}
              {attendees.length > 4 && (
                <span className="ml-2 text-purple-400">
                  +{attendees.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Timeline: React.FC = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
        <TimelineEvent
          date="18 Sept"
          day="Wednesday"
          time="18:00"
          title="TurnUP! CPG & ECOMM Celebration"
          organizer="Bill Murphy & Marc Nathan"
          location="Inn Cahoots"
          price="US$25"
          attendees={[
            { avatar: "/api/placeholder/32/32" },
            { avatar: "/api/placeholder/32/32" },
            { avatar: "/api/placeholder/32/32" },
            { avatar: "/api/placeholder/32/32" },
            { avatar: "/api/placeholder/32/32" },
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
          attendees={[
            { avatar: "/api/placeholder/32/32" },
            { avatar: "/api/placeholder/32/32" },
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
        />
      </div>
    );
  };

  return (
    <div className="flex h-full w-full justify-center bg-gradient-to-br dark:from-neutral-800/45 dark:via-black dark:to-neutral-800/45">
      <div className="relative grid h-full w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-7 lg:gap-9">
        {/* <div className="mb-4 flex-1 rounded border border-black p-3 pl-2 pt-10 dark:border-neutral-600 md:mb-0 md:mt-0 md:pl-3 md:pt-0 lg:pl-5">
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
          </div> */}

        <div className="mb-4 flex-1 rounded border border-black p-5 pl-2 pt-10 dark:border-neutral-600 md:col-span-2 md:mb-0 md:mt-0 md:pl-3 md:pt-0 lg:pl-5">
          <Timeline />
        </div>

        <div className="mb-3 h-2/4 rounded-md border border-black pl-2 pr-3 pt-5 dark:border-neutral-600 dark:bg-transparent md:mb-0 md:w-[97%] md:pl-3 lg:w-[94%]">
          <div className="flex items-center">
            <div className="ml-0 mt-4 flex-auto text-2xl font-semibold text-neutral-900 dark:text-white md:ml-3">
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
                      "flex h-12 w-full items-center justify-center rounded ring-1 ring-black transition-all duration-150 hover:scale-[1.03]",
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
