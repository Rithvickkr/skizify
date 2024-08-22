import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import {
  format, //give shape to the Date&Time by getting month, year and many more //https://date-fns.org/v3.6.0/docs/format
  parseISO, // Bottom of the page, convert String into Dateobject
} from "date-fns";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { meetingsInfo_interface } from "@repo/store/types";
import { Avatar } from "@repo/ui/avatar";
import { ToolTip } from "../ui/Tooltip";
import JoinMeetingPage from "./JoinMeetingPage";


function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default  function Meeting({
  meeting,
}: {
  meeting: meetingsInfo_interface;
}) {
  let finalDateTime = parseISO(meeting.finalDateTime.toISOString()); // convert String into Actual Date object watch bottom of the page

  return (
    <div className=" group mx-1 my-3 grid min-h-20 grid-cols-[auto_1fr_auto] items-center gap-1 space-x-4 rounded-md bg-transparent border py-2 pl-4 pr-1 shadow-md transition-shadow duration-300 focus-within:bg-neutral-50 hover:shadow-xl dark:border dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-900">
      <div className="font-time text-shadow-sm rounded border dark:bg-black  p-2 text-xl md:text-2xl font-medium text-black dark:border-neutral-600 dark:text-gray-100">
        <time dateTime={meeting.finalDateTime.toISOString()}>
          {format(finalDateTime, "h:mm a")}
        </time>
      </div>
      <div className="truncate">
        <ToolTip name={meeting.gig.title}>
          <div className="flex items-center">
            <div className="font-time truncate font-medium dark:text-gray-200 text-sm ">
              {meeting.gig.title}
            </div>
          </div>
        </ToolTip>
      </div>
      <div className="p-2">
      <JoinMeetingPage meeting={meeting}/>
      </div>
      {/* <Menu
        as="div"
        className="relative bg-transparent focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-600 dark:text-white">
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md border border-black bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:border-neutral-600 dark:bg-[#020817]">
            <div className="p-2">
              <Menu.Item>
                {(
                  { active }: any, //active for the Clicked event
                ) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-black",
                      "mb-1 block rounded-md border border-black px-4 py-2 text-center text-sm font-medium shadow-sm hover:bg-black hover:text-white dark:border-neutral-600 dark:bg-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black",
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
                      "block rounded-md border border-black px-4 py-2 text-center text-sm font-medium text-red-600 shadow-sm hover:bg-red-500 hover:text-white dark:border-neutral-600 dark:bg-gray-800 dark:text-white dark:hover:bg-red-500",
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </div>
  );
}
