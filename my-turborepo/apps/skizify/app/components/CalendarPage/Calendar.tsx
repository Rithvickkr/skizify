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

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-06-11T13:00",
    endDatetime: "2024-06-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-06-20T09:00",
    endDatetime: "2024-06-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-06-20T17:00",
    endDatetime: "2024-06-20T18:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-06-13T14:00",
    endDatetime: "2024-06-13T14:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-06-09T13:00",
    endDatetime: "2024-06-09T14:30",
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
      <div className="mx-auto max-w-3xl px-4 sm:px-7 md:max-w-6xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 ">
          <div className=" py-5 pr-5 pl-3 w-full md:w-[97%] lg:w-[94%] bg-gray-50 rounded-md dark:bg-gray-900 border border-white">
            <div className="flex items-center ">
              <h2 className="flex-auto font-semibold text-gray-900 dark:text-white ml-0 md:ml-3">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span> 
                <ChevronLeftIcon className="size-7" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="size-7" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 font-semibold dark:text-white">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => ( //dayIdx is like start from 0 --> end of Monthnumber, watch this as I don't know where dayIdx came from ,as It is also not in array
                <div
                  key={day.toString()}
                  className={classNames(
                    //GREAT LOGIC :- at start dayIdx will be zero , thus we will change the starting of column
                    dayIdx === 0 && colStartClasses[getDay(day)], //means it will start from that column of the grid associated with week day
                  ""
                  )}
                >
                  <Button variant="outline" 
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames( //This is How to put conditions in Classname in tailwind
                      isEqual(day, selectedDay) && "bg-black text-white dark:text-black",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        " dark:bg-white dark:text-black",
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
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500 dark:text-white",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "flex h-12 w-full items-center justify-center rounded  ring-2 ring-black",
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </Button>

                  <div className="mx-auto h-1 w-1 mb-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day),
                    ) && (
                      <div className="h-1 w-1 rounded-full bg-sky-500 mt-1"></div> //Display dot below calendar
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-5 lg:pl-10">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 cursor-pointer">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Meeting({ meeting }: any) {
  let startDateTime = parseISO(meeting.startDatetime); // convert String into Actual Date object watch bottom of the page 
  let endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 dark:bg-gray-100 hover:bg-gray-300">
      <img
        src={meeting.imageUrl}
        alt=""
        className="h-10 w-10 flex-none rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5  text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment} //Fragment is just <></>
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }: any) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: any) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
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
