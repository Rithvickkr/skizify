import { meetingsInfo_interface } from "@repo/store/types";
import { Avatar, AvatarImage, AvatarFallback } from "../../../@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar, ChevronRight, Clock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
// import AvatarUploader from "../AvatarUploader";
import JoinMeetingCredenza from "./JoinMeetingDialog";
import NewMeetingLinkButton from "./NewMeetingLinkButton";
import PushtoExplore from "./PushtoExplore";
import PushtoProfileButton from "./PushtoProfileButton";

export default function MeetingDashboard({
  meetings,
}: {
  meetings: meetingsInfo_interface[];
}) {
  console.log("meetings: ", meetings);
  return (
    <div className={`min-h-screen p-0 sm:p-6 transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-2xl sm:text-4xl font-bold text-transparent dark:from-white dark:to-white/15">
            Meeting Dashboard
          </h1>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="from-card/50 to-card  bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader className="p-1 sm:p-4">
              <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-xl sm:text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid h-auto min-h-[6rem] md:h-32 grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-3 md:p-4">
              <div className="w-full">
                <JoinMeetingCredenza />
              </div>
              <div className="w-full">
                <NewMeetingLinkButton />
              </div>
            </CardContent>
          </Card>

          {meetings.length > 0 ? (
            <Card className="from-card/50 to-card bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
              <CardHeader className="p-1 sm:p-4">
                <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-xl sm:text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
                  Upcoming Meeting
                </CardTitle>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Your next scheduled meeting
                </p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                <div className="flex items-center justify-start gap-3 sm:gap-4 rounded-lg bg-neutral-200/40 p-3 sm:p-4 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-white" />
                  <div className="space-y-1 text-neutral-700 dark:text-neutral-300">
                    <h3 className="font-semibold"></h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {meetings[0]?.finalDateTime
                        ? format(
                            new Date(meetings[0].finalDateTime),
                            "dd MMM yyyy, hh:mm a",
                          )
                        : "Date not available"}
                    </p>
                  </div>
                </div>
                <div className="group flex cursor-pointer items-center space-x-2 sm:space-x-3 rounded-lg bg-neutral-200/40 p-2 sm:p-3 text-neutral-500 hover:bg-black/5 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-400">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 rounded-md border-1 ring-2 ring-neutral-500">
                    <AvatarImage src={meetings[0]?.user.userImage || ""} alt={meetings[0]?.Skizzer.name || "User"} />
                    <AvatarFallback>{(meetings[0]?.Skizzer.name || "User").charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm sm:text-base">
                      {meetings[0]?.Skizzer.name}
                    </span>
                    <PushtoProfileButton meeting={meetings[0]}>
                      <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {meetings[0]?.Skizzer.email}
                      </span>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 transition-transform duration-300 group-hover:translate-x-2" />
                    </PushtoProfileButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="flex flex-col items-center justify-center px-3 py-8 sm:px-4 sm:py-16">
                <div className="mb-4 sm:mb-6 rounded-full bg-zinc-200 p-3 sm:p-4 dark:bg-zinc-800">
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-500 dark:text-zinc-400" />
                </div>

                <div className="mb-4 sm:mb-6 space-y-2 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-white">
                    No Meetings Scheduled
                  </h3>
                  <p className="max-w-sm text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    You don't have any meetings scheduled yet. Create your first
                    meeting to get started.
                  </p>
                </div>

                <PushtoExplore />
              </CardContent>
            </Card>
          )}
        </div>

        {meetings.length > 0 ? (
          <Card className="from-card/50 to-card bg-gradient-to-br p-3 sm:p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-lg sm:text-xl font-semibold text-transparent dark:from-white dark:to-white/15">
                Upcoming Meetings
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your schedule for the next few days
              </p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-2 sm:p-4">
              <ScrollArea className="no-scrollbar max-h-72 sm:max-h-96 w-full space-y-2 sm:space-y-3 overflow-auto">
                {meetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="hover:black-10 group my-1 sm:my-2 flex cursor-pointer items-center justify-between rounded-lg bg-neutral-200/40 p-3 sm:p-4 transition-all duration-300 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-white" />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{meeting.gig.title}</h3>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>
                            {format(
                              new Date(meeting.finalDateTime),
                              "dd MMM yyyy",
                            )}
                          </span>
                          <span>•</span>
                          <span>
                            {format(new Date(meeting.finalDateTime), "hh:mm a")}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-black dark:text-white" />
                          <span className="text-muted-foreground text-xs sm:text-sm">
                            {meeting.user.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-black text-black/50 transition-colors duration-300 dark:text-white group-hover:dark:text-white" />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div>
            <Card className="w-full rounded-lg border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="flex flex-col items-center justify-center px-3 py-8 sm:px-4 sm:py-16">
                <div className="mb-4 sm:mb-6 rounded-full bg-zinc-200 p-3 sm:p-4 dark:bg-zinc-800">
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-500 dark:text-zinc-400" />
                </div>

                <div className="mb-4 sm:mb-6 space-y-2 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-white">
                    No Meetings Scheduled
                  </h3>
                  <p className="max-w-sm text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    You don't have any meetings scheduled yet. Create your first
                    meeting to get started.
                  </p>
                </div>

                <PushtoExplore />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
