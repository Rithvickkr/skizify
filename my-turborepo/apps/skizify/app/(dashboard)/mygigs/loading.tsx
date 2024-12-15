import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { UserRole } from "@repo/store/types";
import { Card, CardContent, CardHeader } from "../../../@/components/ui/card";
import { Separator } from "../../../@/components/ui/separator";

export default async function loader() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === UserRole.USER) {
    return (
      <div className="flex w-full flex-col items-center space-y-4 pl-3 transition duration-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="group relative max-w-7xl animate-pulse overflow-hidden bg-neutral-300 text-white dark:bg-neutral-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 opacity-50 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-neutral-700" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative z-10 p-2 sm:p-3 md:p-4">
              <div className="mb-3 flex flex-col items-center justify-between space-y-4 sm:mb-5 sm:flex-row sm:items-center sm:space-y-0">
                <div className="flex flex-col items-center space-y-1 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <div className="relative">
                    <div className="size-14 rounded-lg border-4 border-neutral-300 bg-neutral-300 shadow-xl transition-all duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-105 dark:border-neutral-800 dark:bg-neutral-700 sm:size-16 sm:rounded-xl" />
                  </div>
                  <div>
                    <div className="mb-1 h-6 w-24 rounded bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                </div>
                <div className="absolute right-4 top-2 flex items-center space-x-2 sm:top-6">
                  <div className="h-6 w-6 rounded bg-neutral-300 dark:bg-neutral-700" />
                </div>
              </div>

              <div className="relative mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-neutral-100/40 px-3 pb-2 pt-3 shadow-md backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:shadow-lg dark:from-neutral-900/80 dark:to-neutral-800/40 sm:px-6 sm:pt-6">
                <div className="mb-2 h-6 w-48 rounded bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-12 w-full rounded-md bg-neutral-300 dark:bg-neutral-700" />
              </div>

              <div className="mb-3 grid grid-cols-1 gap-4 p-1 duration-400 sm:grid-cols-2">
                <div className="mx-1 transform cursor-pointer rounded-lg border bg-neutral-300 p-2 shadow-sm backdrop-filter transition-transform duration-300 hover:scale-105 dark:border-0 dark:bg-neutral-700 sm:p-4">
                  <div className="mb-2 h-4 w-24 rounded bg-neutral-300 dark:bg-neutral-800" />
                  <div className="h-4 w-32 rounded bg-neutral-300 dark:bg-neutral-800" />
                </div>
                <div className="mx-1 transform cursor-pointer rounded-lg border bg-neutral-300 p-2 shadow-sm backdrop-filter transition-transform duration-300 hover:scale-105 dark:border-0 dark:bg-neutral-700 sm:p-4">
                  <div className="mb-2 h-4 w-24 rounded bg-neutral-300 dark:bg-neutral-800" />
                  <div className="h-4 w-32 rounded bg-neutral-300 dark:bg-neutral-800" />
                </div>
              </div>

              <div className="mb-3 transform cursor-pointer rounded-lg bg-neutral-300 p-2 shadow-md transition-all duration-300 hover:scale-100 hover:shadow-lg dark:bg-neutral-700">
                <div className="flex flex-col flex-wrap items-center gap-1 text-xs sm:flex-row sm:justify-around sm:gap-2">
                  <div className="h-4 w-24 rounded bg-neutral-300 dark:bg-neutral-800" />
                  <div className="h-4 w-32 rounded bg-neutral-300 dark:bg-neutral-800" />
                  <div className="h-4 w-32 rounded bg-neutral-300 dark:bg-neutral-800" />
                </div>
              </div>

              <div className="relative w-full">
                <div className="h-6 w-48 rounded bg-neutral-300 dark:bg-neutral-700" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-300 text-neutral-800 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out dark:border-neutral-800/50 dark:bg-neutral-800 dark:text-neutral-200 dark:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/60 via-transparent to-neutral-300/60 opacity-0 transition-opacity duration-500 ease-in-out dark:from-neutral-800/10 dark:to-neutral-700/10" />
              <CardHeader className="relative p-3">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 animate-pulse rounded-xl bg-neutral-300 dark:bg-neutral-700" />
                  <div className="flex-grow space-y-1">
                    <div className="h-6 w-32 animate-pulse bg-neutral-300 dark:bg-neutral-700" />
                    <div className="h-4 w-24 animate-pulse bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </div>
              </CardHeader>
              <Separator className="mx-4 my-2 bg-neutral-200 dark:bg-neutral-800" />
              <CardContent className="relative space-y-4 p-3">
                <div className="relative animate-pulse overflow-hidden rounded-lg bg-neutral-300 p-6 shadow-md dark:bg-neutral-700" />
                <Separator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
                <div className="grid grid-cols-2 gap-1 p-1 text-sm font-medium">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-center space-x-2 rounded-md bg-neutral-300 p-2 dark:bg-neutral-700"
                    />
                  ))}
                </div>
              </CardContent>
              <div className="flex items-center justify-between border-t border-neutral-200 p-6 dark:border-neutral-800/50">
                <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
