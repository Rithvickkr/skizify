import { Card, CardContent, CardFooter, CardHeader } from "../../../@/components/ui/card";
import { Skeleton } from "../../../@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="group/bento min-w-xl shadow-input row-span-1 flex w-full flex-1 cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white from-black from-90% to-[#191919] p-3 transition duration-200 hover:shadow-lg dark:border-neutral-700 dark:bg-gradient-to-br dark:shadow-none">
      <div className="w-[95%] flex-1 transition duration-200 group-hover/bento:translate-x-2">
        <Card className="group relative w-full overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-100 p-3 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl dark:from-black dark:to-v0dark/70">
          <CardHeader className="relative z-10 pb-0">
            <div className="absolute right-4 top-2">
              <Skeleton className="h-6 w-20 bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <Skeleton className="h-20 w-20 rounded-xl border-4 bg-neutral-200 dark:bg-neutral-700 border-white dark:border-neutral-800 shadow-xl" />
              <div className="text-center sm:text-right">
                <Skeleton className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700" />
                <Skeleton className="mt-2 h-4 w-24 bg-neutral-200 dark:bg-neutral-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 mt-6 grid gap-6">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-neutral-100/40 p-2 shadow-md backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:shadow-lg dark:from-neutral-900/80 dark:to-neutral-800/40">
              <Skeleton className="h-6 w-48 bg-neutral-200 dark:bg-neutral-700" />
              <Skeleton className="mt-4 h-12 w-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-2 transition-all duration-500 ease-in-out group-hover:translate-x-2">
                  {/* <Skeleton className="h-8 w-8 rounded-md bg-neutral-500 dark:bg-neutral-500" /> */}
                  <Skeleton className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="relative z-10 mt-2 flex items-center justify-between rounded-lg bg-white p-5 backdrop-blur-sm dark:bg-neutral-900 ">
            <Skeleton className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700" />
            <Skeleton className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const SkeletonCardPage = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-2 pl-1 pr-3 md:grid-cols-2 md:pl-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5">
      {Array(10).fill(0).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCardPage;