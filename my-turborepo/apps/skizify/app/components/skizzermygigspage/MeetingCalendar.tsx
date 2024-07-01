import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import {
  format, //give shape to the Date&Time by getting month, year and many more //https://date-fns.org/v3.6.0/docs/format
  parseISO, // Bottom of the page, convert String into Dateobject
} from "date-fns";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Meeting({ meeting }: any) {
  let startDateTime = parseISO(meeting.startDatetime); // convert String into Actual Date object watch bottom of the page
  let endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className="group flex items-center space-x-4 rounded-md px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-200 dark:bg-gray-100 my-2 mx-1">
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
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-600">
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
