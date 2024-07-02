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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../../../@/components/ui/scroll-area";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 10,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 11,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 12,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 13,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 14,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 15,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-11T13:00",
    endDatetime: "2024-07-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-20T09:00",
    endDatetime: "2024-07-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-20T17:00",
    endDatetime: "2024-07-20T18:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-13T14:00",
    endDatetime: "2024-07-13T14:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-07-09T13:00",
    endDatetime: "2024-07-09T14:30",
  },
];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
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
    isSameDay(parseISO(meeting.startDatetime), selectedDay),
  );

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-3xl pl-1 pr-3 md:max-w-6xl md:px-6">
        <div className="md:grid md:grid-cols-2 ">
          <div className="w-full rounded-md borderpt-5 pl-2 md:pl-3 pr-5 dark:bg-gray-900 md:w-[97%] lg:w-[94%] h-400 border border-black mb-3 md:mb-0">
            <div className="flex items-center">
              <div className="ml-0 flex-auto font-semibold text-gray-900 dark:text-white md:ml-3 text-2xl mt-4">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </div>
              <button
                type="button"
                onClick={previousMonth}
                className=" flex flex-none items-center justify-center p-1.5 mt-3 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="size-6" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className=" -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 mt-3 text-gray-400 hover:text-gray-500"
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
                          "text-red-500 dark:bg-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400 dark:text-white",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500 dark:bg-red-500 dark:text-white",
                        !isEqual(day, selectedDay) &&
                          "hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "flex h-12 w-full items-center justify-center rounded ring-1 ring-black",
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </Button>

                    <div className="mx-auto mb-1 h-1 w-1">
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day),
                      ) && (
                        <div className="mt-1 h-1 w-1 rounded-full bg-sky-500"></div> //Display dot below calendar
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="md:mt-0 pl-2 md:pl-3 lg:pl-5 rounded pt-10 md:pt-0 md:mb-0 mb-4 border border-black">
            <div className="font-semibold text-gray-900 dark:text-white text-2xl mt-3 truncate">
              Meetings for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </div>
            <div className="mt-4 cursor-pointer space-y-1 text-sm leading-6 text-gray-500 ">
              {selectedDayMeetings.length > 0 ? (
                <div className=" overflow-y-auto h-[450px] rounded-md  ">
                  {/* <ScrollArea className="rounded"> */}
                  {selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))}
                  {/* <ScrollBar orientation="vertical" />
                  </ScrollArea> */}
                </div>
              ) : (
                <p>No meetings for today.</p>
              )}
            </div>
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
