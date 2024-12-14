import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { Skeleton } from "../../../@/components/ui/skeleton";

const CalendarSkeleton = () => {
  return (
    <div className="flex h-full w-full justify-center dark:bg-black">
      <div className="relative grid h-full w-full grid-cols-1 gap-2 md:gap-3 lg:gap-5 xl:grid-cols-3">
        <ScrollArea className="col-start-0 mb-4 flex-1 rounded-xl border border-black px-0 pl-2 pt-5 dark:border-neutral-600 sm:pt-10 md:mb-0 md:mt-0 md:p-4 md:pl-2 md:pt-0 xl:col-span-2">
          <Skeleton className="mb-6 ml-6 mt-3 h-8 w-1/2 bg-neutral-300 dark:bg-neutral-700 sm:mb-10 sm:ml-5 sm:mt-5 sm:h-12" />
          <div className="mx-0 my-1 rounded-lg dark:bg-transparent sm:m-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="relative mb-4">
                <div className="absolute bottom-[-48px] left-[30px] top-0 z-0 w-[2px] border-l-2 border-dashed border-neutral-300 dark:border-neutral-600 sm:left-[60px]"></div>
                <div className="relative z-20 flex items-center">
                  <div className="flex min-w-[80px] flex-col bg-white text-center dark:bg-black sm:min-w-[120px]">
                    <Skeleton className="h-6 w-full bg-neutral-300 dark:bg-neutral-700 sm:h-8" />
                    <Skeleton className="mt-1 h-4 w-full bg-neutral-300 dark:bg-neutral-700 sm:h-6" />
                  </div>
                  <div className="mx-2 h-[1px] flex-grow bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 sm:mx-4"></div>
                </div>
                <div className="ml-[50px] mt-3 sm:ml-[100px]">
                  <div className="mr-2 rounded-lg border border-neutral-200 bg-gradient-to-tr from-white to-neutral-50 p-2 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-black sm:mr-0 sm:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                      <Skeleton className="h-20 w-20 bg-neutral-300 dark:bg-neutral-700 sm:h-24 sm:w-24" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 bg-neutral-300 dark:bg-neutral-700 sm:h-8" />
                        <Skeleton className="mt-2 h-4 w-1/2 bg-neutral-300 dark:bg-neutral-700 sm:h-6" />
                        <Skeleton className="mt-2 h-4 w-1/3 bg-neutral-300 dark:bg-neutral-700 sm:h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mb-3 h-2/4 rounded-md border-black pl-2 pr-3 pt-5 dark:border-neutral-600 dark:bg-transparent md:mb-0 md:w-[97%] md:pl-3 lg:w-[94%]">
          <div className="flex items-center">
            <Skeleton className="ml-0 mt-4 h-8 w-1/2 bg-neutral-300 dark:bg-neutral-700 md:ml-3" />
            <Skeleton className="ml-2 mt-3 h-8 w-8 bg-neutral-300 dark:bg-neutral-700" />
            <Skeleton className="ml-2 mt-3 h-8 w-8 bg-neutral-300 dark:bg-neutral-700" />
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
            {[...Array(30)].map((_, dayIdx) => (
              <div key={dayIdx} className="">
                <Skeleton className="flex h-12 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700" />
                <div className="mx-auto mb-1 h-1 w-1">
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSkeleton;