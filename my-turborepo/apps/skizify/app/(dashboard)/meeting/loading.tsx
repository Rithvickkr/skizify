import { Skeleton } from "../../../@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../../../@/components/ui/card";
import { ScrollArea } from "../../../@/components/ui/scroll-area";

export default function Loading(){
    return (

        <div className="min-h-screen p-0 sm:p-6 transition-colors duration-300">
          <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-48 sm:h-12 sm:w-64 bg-neutral-300 dark:bg-neutral-700" />
            </div>
        
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <Card className="from-card/50 to-card bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader className="p-1 sm:p-4">
              <Skeleton className="h-6 w-32 sm:h-8 sm:w-40 bg-neutral-300 dark:bg-neutral-700" />
            </CardHeader>
            <CardContent className="grid h-auto min-h-[6rem] md:h-32 grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-3 md:p-4">
              <Skeleton className="h-full w-full bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-full w-full bg-neutral-300 dark:bg-neutral-700" />
            </CardContent>
              </Card>
        
              <Card className="from-card/50 to-card bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader className="p-1 sm:p-4">
              <Skeleton className="h-6 w-32 sm:h-8 sm:w-40 bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-4 w-24 sm:h-5 sm:w-32 mt-2 bg-neutral-300 dark:bg-neutral-700" />
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
              <Skeleton className="h-16 w-full bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-10 w-full bg-neutral-300 dark:bg-neutral-700" />
            </CardContent>
              </Card>
            </div>
        
            <Card className="from-card/50 to-card bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
              <CardHeader className="p-3 sm:p-4">
            <Skeleton className="h-6 w-32 sm:h-8 sm:w-40 bg-neutral-300 dark:bg-neutral-700" />
            <Skeleton className="h-4 w-24 sm:h-5 sm:w-32 mt-2 bg-neutral-300 dark:bg-neutral-700" />
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-2 sm:p-4">
            <ScrollArea className="no-scrollbar max-h-72 sm:max-h-96 w-full space-y-2 sm:space-y-3 overflow-auto">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-24 my-2 w-full bg-neutral-300 dark:bg-neutral-700" />
              ))}
            </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      );
}